import { NextRequest, NextResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

/**
 * テスト用エンドポイント：診断結果のテストデータを挿入
 *
 * アクセス方法:
 * GET http://localhost:3001/api/test-diagnostic
 */
export async function GET(request: NextRequest) {
  try {
    console.log('🧪 テストデータ挿入を開始...')

    // Supabaseクライアント作成（サーバーサイド用）
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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

    console.log('📤 挿入するテストデータ:', testData)

    // データ挿入
    const { data, error } = await supabase
      .from('diagnostic_results')
      .insert(testData)
      .select()
      .single()

    if (error) {
      console.error('❌ 挿入エラー:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })

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
      console.error('❌ データが返されませんでした')
      return NextResponse.json(
        {
          success: false,
          error: 'データが返されませんでした'
        },
        { status: 500 }
      )
    }

    console.log('✅ テストデータ挿入成功:', data.id)

    // 挿入したデータを確認
    const { data: confirmData, error: confirmError } = await supabase
      .from('diagnostic_results')
      .select('*')
      .eq('id', data.id)
      .single()

    if (confirmError) {
      console.error('⚠️ 確認クエリエラー:', confirmError)
    } else {
      console.log('✅ 挿入データ確認:', confirmData)
    }

    return NextResponse.json({
      success: true,
      message: 'テストデータが正常に挿入されました',
      inserted_id: data.id,
      session_id: testSessionId,
      data: data,
      confirmed: confirmData
    })

  } catch (error: any) {
    console.error('❌ 予期しないエラー:', error)
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
