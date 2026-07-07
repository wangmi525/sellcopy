import { NextResponse } from 'next/server';
import { generateCopy, generateBulk } from '@/lib/groq';
import { createClientForRequest } from '@/lib/supabase-server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mode, input, platform, language, features, tone, bulk } = body;

    if (!input) {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 });
    }

    const supabase = createClientForRequest(req.headers);
    const authHeader = req.headers.get('authorization');
    let user = null;

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '');
      const { data } = await supabase.auth.getUser(token);
      user = data.user;
    }

    // Check usage limits for free users
    if (user) {
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('plan')
        .eq('user_id', user.id)
        .single();

      const plan = sub?.plan || 'free';

      if (plan === 'free') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const { count } = await supabase
          .from('generations')
          .select('*', { count: 'exact' })
          .eq('user_id', user.id)
          .gte('created_at', today.toISOString());

        if ((count || 0) >= 3) {
          return NextResponse.json({ error: 'Daily free limit reached (3/day). Upgrade to Pro for unlimited generations.' }, { status: 429 });
        }
      }
    }

    let result;
    if (bulk && Array.isArray(bulk) && bulk.length <= 10) {
      result = await generateBulk(bulk);
    } else {
      result = await generateCopy({ mode: mode || 'product', input, platform, language: language || 'English', features, tone });
    }

    // Save to database
    if (user) {
      try {
        await supabase.from('generations').insert({
          user_id: user.id,
          product_name: input.substring(0, 100),
          product_type: mode || 'product',
          platform: platform || 'general',
          language: language || 'English',
          features: features || '',
          result,
        });
      } catch {}
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Generate error:', error);
    return NextResponse.json({ error: 'Failed to generate. Please try again.' }, { status: 500 });
  }
}
