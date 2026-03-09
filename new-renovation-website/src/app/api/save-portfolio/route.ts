import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  try {
    // 1. 認証チェック
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: '認証が必要です。ログインしてください。' },
        { status: 401 }
      )
    }

    const {
      title,
      description,
      location,
      category,
      area,
      work_type,
      tags,
      images
    } = await req.json()

    // 2. バリデーション
    if (!title || !description || !location || !category) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      )
    }

    // 3. Supabaseに保存
    const newItem = {
      user_id: user.id,
      title,
      description,
      location,
      category,
      completion_date: new Date().toISOString().split('T')[0],
      image_url: images?.[0] || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      tags: tags || [],
      is_featured: false,
      area: area || '',
      work_type: work_type || ''
    }

    const { data, error } = await supabase
      .from('portfolios')
      .insert([newItem])
      .select()
      .single()

    if (error) {
      if (isDevelopment) {
        console.error('Supabase保存エラー:', error)
      }
      return NextResponse.json({
        error: 'データベース保存に失敗しました',
        ...(isDevelopment && { details: error.message })
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: '施工実績を追加しました',
      item: data
    })
  } catch (error) {
    if (isDevelopment) {
      console.error('保存エラー:', error)
    }
    return NextResponse.json({
      error: '保存に失敗しました',
      ...(isDevelopment && { details: error instanceof Error ? error.message : '不明なエラー' })
    }, { status: 500 })
  }
}
