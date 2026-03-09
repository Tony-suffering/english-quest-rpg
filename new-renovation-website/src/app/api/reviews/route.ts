import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// レビュー取得API
export async function GET() {
  const supabase = await createClient()

  const { data: reviews, error } = await supabase
    .from('customer_reviews')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) {
    return NextResponse.json({ reviews: [] })
  }

  return NextResponse.json({ reviews })
}

// レビュー投稿API（施工完了後のアンケート）
export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from('customer_reviews')
    .insert({
      project_id: body.project_id,
      customer_name: body.customer_name,
      work_type: body.work_type,
      rating: body.rating,
      comment: body.comment,
      location: body.location,
      is_approved: false // 管理者承認待ち
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
