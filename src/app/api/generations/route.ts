import { NextResponse, type NextRequest } from 'next/server'
import { createClientForRequest } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const supabase = createClientForRequest(request.headers)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: generations, error } = await supabase
    .from('generations')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Fetch generations error:', error)
    return NextResponse.json({ generations: [] })
  }

  return NextResponse.json({ generations: generations || [] })
}
