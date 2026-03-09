import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@/lib/supabase/server'
import { apiLimiter } from '@/lib/api-limiter'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export async function POST(req: NextRequest) {
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

    // 2. レート制限チェック
    const userId = user.id
    const apiKey = `ai-analysis-${userId}`

    if (!apiLimiter.canRequest(apiKey, 'minute')) {
      return NextResponse.json(
        { error: 'リクエストが多すぎます。1分後に再試行してください。' },
        { status: 429 }
      )
    }

    if (!apiLimiter.canRequest(apiKey, 'hour')) {
      return NextResponse.json(
        { error: '1時間あたりの制限に達しました。しばらくお待ちください。' },
        { status: 429 }
      )
    }

    if (!apiLimiter.canRequest(apiKey, 'day')) {
      return NextResponse.json(
        { error: '1日あたりの制限に達しました。明日再試行してください。' },
        { status: 429 }
      )
    }

    // リクエストを記録
    apiLimiter.recordRequest(apiKey)

    const { images, voiceInput } = await req.json()

    if (!images || images.length === 0) {
      return NextResponse.json({ error: '画像が必要です' }, { status: 400 })
    }

    // GPT-4o Vision APIで画像解析
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `あなたは内装工事の施工実績を分析する専門家です。
画像と音声メモから、以下のJSON形式で施工実績データを生成してください:

{
  "title": "場所+工事内容の簡潔なタイトル(例: 江東区Mマンション クロス・CF張替)",
  "description": "現場の職人目線の説明文。下地の状態、使った材料のメーカー・品番、工期、苦労した点、お客様の反応など具体的に。150文字程度。",
  "location": "○○区△△(例: 江東区東陽町)",
  "category": "住宅・マンション | 店舗・オフィス | 公共施設 のいずれか",
  "area": "施工面積(例: 68㎡、約10㎡（6畳）)",
  "work_type": "工事の種類(例: クロス・CF張替、フルリフォーム)",
  "tags": ["タグ1", "タグ2", "タグ3"] (例: ["クロス", "CF", "下地補修"])
}

画像から以下を判断してください:
- ビフォー/アフター写真の有無
- 工事の種類(クロス、床材、塗装など)
- 空間の用途(住宅、店舗、オフィスなど)
- 施工の特徴(バリアフリー、デザイン性など)

音声メモがある場合は優先的に反映してください。
職人らしい、リアルで具体的な説明文を心がけてください。`
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: voiceInput
                ? `音声メモ: ${voiceInput}\n\nこの音声メモと画像から施工実績データを生成してください。`
                : '画像から施工実績データを生成してください。'
            },
            ...images.map((imageBase64: string) => ({
              type: 'image_url' as const,
              image_url: {
                url: imageBase64
              }
            }))
          ]
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    })

    const responseText = completion.choices[0]?.message?.content || '{}'

    // JSONパース(```json ``` で囲まれている場合に対応)
    let jsonText = responseText
    const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/)
    if (jsonMatch) {
      jsonText = jsonMatch[1]
    }

    const generatedData = JSON.parse(jsonText)

    return NextResponse.json(generatedData)
  } catch (error) {
    console.error('AI解析エラー:', error)

    // 本番環境では詳細なエラーを返さない
    const isDevelopment = process.env.NODE_ENV === 'development'

    return NextResponse.json({
      error: 'AI解析に失敗しました',
      ...(isDevelopment && { details: error instanceof Error ? error.message : '不明なエラー' })
    }, { status: 500 })
  }
}
