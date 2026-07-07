import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  // 从请求cookie中提取session token
  const allCookies = request.cookies.getAll()
  const tokenKey = allCookies.find(c => c.name.includes('auth-token'))

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  // 通过cookie中的token手动验证session
  let isAuthenticated = false
  if (tokenKey) {
    const tokenValue = tokenKey.value
    const { data, error } = await supabase.auth.getUser(tokenValue)
    if (data?.user) {
      isAuthenticated = true
      // 设置cookie给后续请求
      supabaseResponse.cookies.set(tokenKey.name, tokenValue, {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      })
    }
  }

  const protectedPaths = ['/dashboard']
  const isProtected = protectedPaths.some(p => request.nextUrl.pathname.startsWith(p))

  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  if (isAuthenticated && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}
