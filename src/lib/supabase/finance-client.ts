import { createClient } from '@supabase/supabase-js'

// FINANCE用Supabase（施工記録・診断結果用）
export const createFinanceClient = () => {
  const url = process.env.NEXT_PUBLIC_FINANCE_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_FINANCE_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}
