'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { getCraftsmanProfile } from '@/lib/auth'
import type { Database } from '@/types/supabase'

type CraftsmanProfile = Database['public']['Tables']['craftsmen_profiles']['Row']

// Create a client instance for this context
const supabase = createClient()

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: CraftsmanProfile | null
  loading: boolean
  error: string | null
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<CraftsmanProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // プロフィール取得
  const fetchProfile = async (userId: string) => {
    try {
      const profileData = await getCraftsmanProfile(userId)
      setProfile(profileData)
      setError(null)
    } catch (err) {
      // getCraftsmanProfile内で既にエラー処理済み、nullが返される
      setProfile(null)
      setError(null) // 公開ページではエラーとして扱わない
    }
  }

  // プロフィール再取得
  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }

  // サインアウト
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setSession(null)
      setProfile(null)
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'ログアウトに失敗しました'
      setError(errorMessage)
      throw err
    }
  }

  useEffect(() => {
    // 初回セッション取得
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session)
        setUser(session?.user ?? null)

        if (session?.user) {
          fetchProfile(session.user.id)
        }

        setLoading(false)
      })
      .catch((err) => {
        const errorMessage = err instanceof Error ? err.message : 'セッションの取得に失敗しました'
        setError(errorMessage)
        setLoading(false)
      })

    // 認証状態の変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    user,
    session,
    profile,
    loading,
    error,
    signOut: handleSignOut,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
