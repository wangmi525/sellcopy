import { createClient, CookieOptions } from '@supabase/supabase-js'

export function createClientForRequest(requestHeaders: Headers) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        flowType: 'pkce',
        persistSession: false,
      },
      cookies: {
        get(name: string) {
          const cookie = requestHeaders.get('cookie')
          if (!cookie) return undefined
          const match = cookie.match(new RegExp(`${name}=([^;]+)`))
          return match ? decodeURIComponent(match[1]) : undefined
        },
        set(name: string, value: string) {},
        remove(name: string) {},
      },
    }
  )
}
