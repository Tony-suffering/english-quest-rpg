import { NextRequest, NextResponse } from 'next/server'
import { createFinanceClient } from '@/lib/supabase/finance-client'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { answers, user_name, user_phone, user_email, result_type, result_content } = body

    // バリデーション
    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { error: '診断回答が不正です' },
        { status: 400 }
      )
    }

    // FINANCE用Supabaseクライアント作成（診断データ保存用）
    const supabase = createFinanceClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
    }

    // セッションID生成（ブラウザのセッション識別用）
    const sessionId = crypto.randomUUID()

    // User-AgentとIPアドレス取得
    const userAgent = request.headers.get('user-agent') || undefined
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      undefined

    // Supabaseに保存
    const { data, error } = await supabase
      .from('diagnostic_results')
      .insert({
        answers: answers, // JSONB形式で保存
        result_type: result_type || 'ai_takumi',
        result_content: result_content || JSON.stringify(answers),
        session_id: sessionId,
        user_name: user_name || null,
        user_phone: user_phone || null,
        user_email: user_email || null,
        user_agent: userAgent,
        ip_address: ipAddress,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'データベース保存に失敗しました', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      id: data.id,
      message: '診断結果を保存しました'
    })

  } catch (error: any) {
    return NextResponse.json(
      { error: '予期しないエラーが発生しました', details: error.message },
      { status: 500 }
    )
  }
}
