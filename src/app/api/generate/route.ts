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

    let result;
    if (bulk && Array.isArray(bulk) && bulk.length <= 10) {
      result = await generateBulk(bulk);
    } else {
      result = await generateCopy({ mode: mode || 'product', input, platform, language: language || 'English', features, tone });
    }

    try {
      const supabase = createClientForRequest(req.headers);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('generations').insert({
          user_id: user.id,
          product_name: input.substring(0, 100),
          product_type: mode || 'product',
          platform: platform || 'general',
          language: language || 'English',
          features: features || '',
          result,
        });
      }
    } catch {}

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Generate error:', error);
    return NextResponse.json({ error: 'Failed to generate. Please try again.' }, { status: 500 });
  }
}
