import { NextResponse, type NextRequest } from 'next/server'
import { createClientForRequest } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const supabase = createClientForRequest(request.headers)
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get today's usage count
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { count } = await supabase
    .from('generations')
    .select('*', { count: 'exact' })
    .eq('user_id', user.id)
    .gte('created_at', today.toISOString())

  // Get user subscription
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('plan')
    .eq('user_id', user.id)
    .single()

  const plan = sub?.plan || 'free'
  const dailyLimit = plan === 'free' ? 3 : -1 // -1 means unlimited

  return NextResponse.json({
    usage: count || 0,
    limit: dailyLimit,
    plan,
    remaining: dailyLimit === -1 ? -1 : dailyLimit - (count || 0),
  })
}
