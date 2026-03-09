import { createBrowserClient } from '@supabase/ssr'

// FINANCE用Supabase（施工記録・診断結果用）
const financeSupabaseUrl = process.env.NEXT_PUBLIC_FINANCE_SUPABASE_URL!
const financeSupabaseAnonKey = process.env.NEXT_PUBLIC_FINANCE_SUPABASE_ANON_KEY!

export const createFinanceClient = () => {
  return createBrowserClient(financeSupabaseUrl, financeSupabaseAnonKey)
}
