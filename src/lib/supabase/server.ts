import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export const createClient = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_FINANCE_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_FINANCE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
