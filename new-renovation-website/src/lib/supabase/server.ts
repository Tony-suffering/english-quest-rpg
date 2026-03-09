import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = async () => {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch (error) {
            // Cookieの設定に失敗した場合（Read-onlyの場合など）
            // サーバーコンポーネントやミドルウェアでの読み取り専用エラーを抑制
            if (process.env.NODE_ENV === 'development') {
              console.warn('Cookie設定失敗（Read-only context）:', error)
            }
          }
        },
      },
    }
  )
}
