'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth as useAuthContext } from '@/contexts/AuthContext'
import { toast } from 'sonner'

/**
 * 認証フック
 * AuthContextを使いやすくラップ
 */
export const useAuth = () => {
  return useAuthContext()
}

/**
 * 認証が必要なページで使うフック
 * ログインしていない場合はリダイレクト
 */
export const useRequireAuth = (options?: { redirectTo?: string; silent?: boolean }) => {
  const router = useRouter()
  const auth = useAuthContext()
  const redirectTo = options?.redirectTo || '/craftsman/login'
  const silent = options?.silent || false

  useEffect(() => {
    // ローディング中は何もしない
    if (auth.loading) return

    // ログインしていない場合はリダイレクト
    if (!auth.user) {
      if (!silent) {
        toast.error('ログインが必要です')
      }
      router.push(redirectTo)
    }
  }, [auth.user, auth.loading, router, redirectTo, silent])

  return auth
}
