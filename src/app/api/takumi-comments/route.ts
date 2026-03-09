import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'

// Supabaseクライアント（FINANCE用 = iwasaki-naisou）
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_FINANCE_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_FINANCE_SUPABASE_ANON_KEY || ''
  )
}

// GET: 最新のコメントを取得
export async function GET() {
  try {
    const { data, error } = await getSupabase()
      .from('takumi_comments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) {
      // テーブルがない場合はデフォルトデータを返す
      return NextResponse.json({
        success: true,
        data: [{
          id: 'default',
          jijiiTweet: 'おお、新潟県知事が原発の安全性を求めるとは...あの頃、壁を見つめていた日々が懐かしいのう。',
          takumiComment: 'お師匠、今はデータを駆使してリスク管理をする時代っすよ！',
          createdAt: new Date().toISOString()
        }]
      })
    }

    // データがない場合もデフォルト
    if (!data || data.length === 0) {
      return NextResponse.json({
        success: true,
        data: [{
          id: 'default',
          jijiiTweet: 'おお、新潟県知事が原発の安全性を求めるとは...あの頃、壁を見つめていた日々が懐かしいのう。',
          takumiComment: 'お師匠、今はデータを駆使してリスク管理をする時代っすよ！',
          createdAt: new Date().toISOString()
        }]
      })
    }

    // フロントエンド用にキー名を変換
    const formattedData = data.map(item => ({
      id: item.id,
      jijiiTweet: item.jijii_tweet,
      takumiComment: item.takumi_comment,
      createdAt: item.created_at
    }))

    return NextResponse.json({
      success: true,
      data: formattedData
    })
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

// POST: n8nから新しいコメントを追加
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { jijiiTweet, takumiComment } = body

    if (!jijiiTweet || !takumiComment) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await getSupabase()
      .from('takumi_comments')
      .insert({
        jijii_tweet: jijiiTweet,
        takumi_comment: takumiComment
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: data.id,
        jijiiTweet: data.jijii_tweet,
        takumiComment: data.takumi_comment,
        createdAt: data.created_at
      }
    })

  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
