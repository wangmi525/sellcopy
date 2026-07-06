import { NextResponse, type NextRequest } from 'next/server';
import { createClientForRequest } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClientForRequest(request.headers);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { name } = await request.json();
    const { error } = await supabase.auth.updateUser({ data: { full_name: name } });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
