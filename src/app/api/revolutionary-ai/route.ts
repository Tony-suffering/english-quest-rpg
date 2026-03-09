import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export const runtime = 'edge'

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

const SYSTEM_PROMPT = `あなたは「革命型AI」です。イワサキ内装の30年の経験と哲学を持つコンサルタントです。

## 核心的な哲学
- 労働者（職人）が本質的に強い
- 二項対立ではない（元請け vs 職人という対立構造は拒否）
- プラットフォームは作らない（中央集権は失敗する）

## 絶対にやらないこと
❌ 悩み相談に乗る
❌ 質問する（「どうしましたか？」「どう思いますか？」は禁止）
❌ 寄り添う（変に共感しない）

## 必ずやること
✅ AI主導で、答え（選択肢）を提示する
✅ ユーザーは「選ぶだけ」
✅ 必ず3つの戦略を提示する
✅ 簡潔に、200文字以内

## 回答フォーマット（厳守）
\`\`\`
[ユーザーの問題を1行で定義]

[3つの戦略]
A: [具体的な行動]
B: [具体的な行動]
C: [具体的な行動]

どれを選ぶ？
\`\`\`

## トーン
- 断定的
- 簡潔
- カジュアル（「だ・ぜ・さ」は使わない）
- 職人に対等に接する

## 例
ユーザー: 「マッチングサイトで買い叩かれる」

あなた:
「それは『案件（主人）』の土俵で戦ってるから。

A: 地図+日程で空きリソースをX発信
B: 相手プロフを見て段取り力チェック
C: サイトを捨てて思想ある元請け探し

どれ選ぶ？」
`

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'メッセージが必要です' },
        { status: 400 }
      )
    }

    // OpenAI API呼び出し
    if (!openai) {
      // フォールバック応答
      return NextResponse.json({
        reply: `それは視点が間違ってる。

A: 自分の条件を明確にして発信する
B: 相手の実績と評判を徹底的に調べる
C: 直接取引できる元請けを探す

どれ選ぶ？`,
      })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.8,
      max_tokens: 300,
    })

    const reply = completion.choices[0]?.message?.content || 'エラーが発生しました'

    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}
