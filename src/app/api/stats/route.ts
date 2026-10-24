import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

// リアルタイム統計データ取得API
export async function GET() {
  const supabase = createClient()

  // 職人数を集計
  const { count: craftsmenCount } = await supabase
    .from('craftsmen_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  // 完了プロジェクト数
  const { count: projectsCount } = await supabase
    .from('work_records')
    .select('*', { count: 'exact', head: true })

  // レビューから満足度を計算
  const { data: reviews } = await supabase
    .from('customer_reviews')
    .select('rating')
    .eq('is_approved', true)

  let satisfactionRate = 0
  if (reviews && reviews.length > 0) {
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    satisfactionRate = Math.round((avgRating / 5) * 100)
  }

  return NextResponse.json({
    craftsmenCount: craftsmenCount || 0,
    projectsCount: projectsCount || 0,
    satisfactionRate,
    reviewCount: reviews?.length || 0
  })
}
