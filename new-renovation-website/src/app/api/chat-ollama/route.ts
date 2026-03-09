import { NextRequest, NextResponse } from 'next/server'

/**
 * Ollama ローカルLLM 統合版 API
 *
 * 使用方法:
 * 1. Ollama をインストール（setup_ollama.md 参照）
 * 2. ファインチューニング済み "takumi" モデルを登録
 * 3. ollama serve でサーバー起動
 * 4. .env.local に OLLAMA_API_URL を設定（デフォルト: http://localhost:11434）
 * 5. フロントエンドの fetch URL を /api/chat-ollama に変更
 */

// Ollama API URL（デフォルト: ローカル）
const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'takumi'

// フォールバック応答（Ollama未起動時）
const fallbackResponses: Record<string, string[]> = {
  料金: [
    'お見積もりは完全無料だ！施工内容によって変わるから、まずは気軽に相談してくれ。03-5638-7402か、お問い合わせフォームからどうぞ！',
    '価格はピンキリだけど、俺たちは正直見積もりが信条さ。無料で見積もるから、まず現場を見せてくれよ！',
  ],
  リフォーム: [
    'リフォームなら任せてくれ！クロス張替え、床材、バリアフリー改修まで全部対応だ。50人の職人ネットワークで、どんな難工事もバッチリさ！',
    'クロス張替えなら1日で終わることもある。リフォームは暮らしが変わる瞬間だ！ワクワクするだろ？',
  ],
  default: [
    'ん〜、その質問は初めてだな！詳しくは電話（03-5638-7402）かお問い合わせフォームで聞いてくれ。',
    'いい質問だ！でも俺だけじゃ答えきれないな。専門スタッフに直接聞いた方が確実だ。03-5638-7402に電話してみてくれ！',
  ],
}

function getFallbackResponse(query: string): string {
  const lowerQuery = query.toLowerCase()

  for (const [keyword, responses] of Object.entries(fallbackResponses)) {
    if (keyword !== 'default' && lowerQuery.includes(keyword.toLowerCase())) {
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }

  return fallbackResponses.default[Math.floor(Math.random() * fallbackResponses.default.length)]
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'メッセージが不正です' },
        { status: 400 }
      )
    }

    // Ollama API にリクエスト
    const ollamaResponse = await fetch(`${OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: messages,
        stream: false,  // ストリーミングなし（シンプル実装）
        options: {
          temperature: 0.8,
          top_p: 0.9,
          top_k: 40,
          num_predict: 200,  // 最大200トークン（タクミは簡潔）
        }
      }),
    })

    if (!ollamaResponse.ok) {
      throw new Error(`Ollama API Error: ${ollamaResponse.status} ${ollamaResponse.statusText}`)
    }

    const data = await ollamaResponse.json()
    const aiMessage = data.message?.content || getFallbackResponse('')

    return NextResponse.json({
      message: aiMessage,
      mode: 'ollama',
      model: OLLAMA_MODEL,
      usage: {
        prompt_tokens: data.prompt_eval_count || 0,
        completion_tokens: data.eval_count || 0,
        total_tokens: (data.prompt_eval_count || 0) + (data.eval_count || 0),
      }
    })

  } catch (error: any) {
    console.error('❌ Ollama API Error:', error.message)

    // Ollama 未起動時はフォールバック
    const lastMessage = body.messages?.[body.messages.length - 1]
    const userQuery = lastMessage?.role === 'user' ? lastMessage.content : ''

    return NextResponse.json({
      message: getFallbackResponse(userQuery),
      mode: 'fallback',
      error: error.message
    }, { status: 200 })
  }
}
