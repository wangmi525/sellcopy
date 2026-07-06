import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase-middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

// 只对 /dashboard 开头的路径应用中间件
export const config = {
  matcher: '/dashboard/:path*',
}
