import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    // Supabaseクライアント作成（サーバーサイド用 - FINANCE環境）
    const supabase = createClient(
      process.env.NEXT_PUBLIC_FINANCE_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_FINANCE_SUPABASE_ANON_KEY!
    )

    // テスト用セッションID
    const testSessionId = `test-${crypto.randomUUID()}`

    // テストデータ
    const testData = {
      answers: {
        choices: {
          '1': 'A',
          '2': 'B',
          '3': 'A',
          '4': 'B',
          '5': 'A',
          '6': 'B',
          '7': 'A',
          '8': 'B',
          '9': 'A',
          '10': 'B'
        },
        free_texts: {
          '1': 'テスト用の自由入力です',
          '5': 'これもテスト'
        },
        version: '3.0'
      },
      result_type: 'ai_takumi_v3',
      result_content: 'これはテスト用の診断結果です。実際にはOpenAI APIが生成した詳細な分析結果が入ります。',
      session_id: testSessionId,
      user_agent: 'Test Browser/1.0'
    }

    // データ挿入
    const { data, error } = await supabase
      .from('diagnostic_results')
      .insert(testData)
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          error: 'データが返されませんでした'
        },
        { status: 500 }
      )
    }

    // 挿入したデータを確認
    const { data: confirmData, error: confirmError } = await supabase
      .from('diagnostic_results')
      .select('*')
      .eq('id', data.id)
      .single()

    return NextResponse.json({
      success: true,
      message: 'テストデータが正常に挿入されました',
      inserted_id: data.id,
      session_id: testSessionId,
      data: data,
      confirmed: confirmData
    })

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack
      },
      { status: 500 }
    )
  }
}
