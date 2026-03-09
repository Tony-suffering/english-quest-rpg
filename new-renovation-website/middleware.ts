import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Supabase SSR クライアント作成
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options))
        },
      },
    }
  )

  // セッション取得
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // 職人向けルートは認証必須（/craftsman/login と /craftsman/register 以外）
  if (req.nextUrl.pathname.startsWith('/craftsman')) {
    const isLoginPage = req.nextUrl.pathname === '/craftsman/login'
    const isRegisterPage = req.nextUrl.pathname === '/craftsman/register'

    // 未認証かつログイン/登録ページ以外 → ログインページへ
    if (!session && !isLoginPage && !isRegisterPage) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/craftsman/login'
      redirectUrl.searchParams.set('redirect', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // 認証済みかつログイン/登録ページ → ダッシュボードへ
    if (session && (isLoginPage || isRegisterPage)) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/craftsman/dashboard'
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}

export const config = {
  matcher: ['/craftsman/:path*'],
}
