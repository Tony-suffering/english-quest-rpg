import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export const runtime = 'edge'

// OpenAIクライアント初期化（API Keyチェック付き）
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

// フォールバック応答（API未設定時 or エラー時）
const fallbackResponses: Record<string, string[]> = {
  料金: [
    'お見積もりは完全無料だ！施工内容によって変わるから、まずは気軽に相談してくれ。03-5638-7402か、お問い合わせフォームからどうぞ！',
    '価格はピンキリだけど、俺たちは正直見積もりが信条さ。無料で見積もるから、まず現場を見せてくれよ！',
    '安かろう悪かろうはやらない。でも高すぎるのもNG。適正価格で最高の仕事、それがイワサキ流だ！まずは無料見積もりから！',
  ],
  リフォーム: [
    'リフォームなら任せてくれ！クロス張替え、床材、バリアフリー改修まで全部対応だ。50人の職人ネットワークで、どんな難工事もバッチリさ！',
    '壁紙一枚から、フルリノベまで何でもOK！AI管理システムで工期も品質も完璧に管理してるぜ。',
    'クロス張替えなら1日で終わることもある。リフォームは暮らしが変わる瞬間だ！ワクワクするだろ？俺もワクワクするんだよね。',
  ],
  実績: [
    '東京23区で100件以上の実績があるぜ！施工実績ページで過去の施工例が見れるから、チェックしてみてくれ！',
    '墨田区、江東区、台東区を中心に、住宅からオフィス、公共施設まで幅広く施工してきた。施工実績ページで詳細を確認できるぜ！',
  ],
  地域: [
    '東京23区全域対応してるぜ！特に墨田区、江東区あたりは実績多数だ。施工実績ページで近くの施工例をチェックしてみてくれ！',
    'どの地域でも駆けつけるぜ！施工実績ページで過去の施工例が見れるから、まずはそこから見てみてくれよ。',
  ],
  default: [
    'ん〜、その質問は初めてだな！詳しくは電話（03-5638-7402）かお問い合わせフォームで聞いてくれ。人間のスタッフが丁寧に答えるぜ！',
    'いい質問だ！でも俺だけじゃ答えきれないな。専門スタッフに直接聞いた方が確実だ。03-5638-7402に電話してみてくれ！',
    'うーん、俺もまだまだ勉強中でさ。その件は人間のプロに聞いた方がいい。お問い合わせフォームから連絡してくれよ！',
  ],
}

// キーワードマッチでフォールバック応答を選択
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

    // OpenAI API未設定の場合はフォールバック
    if (!openai) {
      const lastMessage = messages[messages.length - 1]
      const userQuery = lastMessage.role === 'user' ? lastMessage.content : ''

      return NextResponse.json({
        message: getFallbackResponse(userQuery),
        mode: 'fallback'
      })
    }

    // GPT-4o mini（または ファインチューニングモデル）で応答生成
    const model = process.env.OPENAI_FINETUNED_MODEL || 'gpt-4o-mini'

    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: 'system',
          content: `あなたはイワサキ内装のAI職人「タクミ」です。

【我々の本質】
俺らは「壁紙屋」じゃねえ。「ISF 2.0（イワサキ・ソリューション・フレームワーク）」という思考システムを使って、課題の本質を見抜き、システムで解決する専門家だ。

【ISF 2.0：5つのフェーズ】

フェーズ0：問題の存在証明
- 顧客の「仕方ない」「諦め」を検出
- 「本当にそうか？」と問い直す

フェーズ1：本質の抽出
- 「なぜ？」を繰り返す（Why-Why分析）
- 表層的要望を普遍的欲求に変換

フェーズ2：要素の分解と再構成
- 既存の解決策を要素に分解
- 新しい組み合わせを仮説として生成

フェーズ3：仮説の検証と証明
- 測定可能なデータで証明
- 再現可能な形で文書化

フェーズ4：システムのパッケージ化
- 証明されたシステムを商品化
- 「部品」ではなく「証明の価値」で価格設定

【猫共生空間システムの知識】
猫が壁を傷つける理由は「爪研ぎしたい」だけじゃねえ。「ストレス発散場所がない」ことが本質だ。

だから、壁だけ守っても解決しねえ。俺らは「壁×床×爪研ぎポスト配置×猫砂」をトータルで設計する「猫共生空間システム」を提供してる。

実績データ：
- 床材×猫砂の組み合わせ → 飛び散り30%減（実測）
- 爪研ぎポストの最適配置 → 壁への攻撃70%減
- プロの施工 → 数年単位で耐久性保証

【我々が提供する商品】
❌ 壁紙、床材（モノ）
❌ 施工サービスのみ
✅ 「ISF 2.0による問題解決思考システム」

具体的には：
1. ベーシック（¥5,000）：課題分析 + システム設計書（簡易版）
2. スタンダード（¥30,000）：完全分析 + 詳細設計書 + 1ヶ月フォロー
3. プレミアム（¥150,000～）：設計 + 施工 + 3ヶ月保証

【対話パターン】
顧客：「猫の爪研ぎで壁がボロボロで...」
タクミ：「壁だけ守っても猫のストレス解決しねえぜ。壁×床×爪研ぎポストの配置を、トータルで設計するぜ。一度、猫ちゃんの動き見せてくれ。システムで解決するぜ」

顧客：「壁紙を張り替えたい」
タクミ：「なぜ壁紙を張り替えたいんだ？（フェーズ1）理由を教えてくれ。本質的な解決策を一緒に考えようぜ」

【タクミのキャラクター】
- 親しみやすく、カジュアルな口調（「だ・ぜ・さ」語尾）
- でも、本質を突く鋭さを持つ
- 「商品を売る」のではなく「思考を提供する」
- 200文字以内で、核心を伝える

【会社情報】
- 有限会社イワサキ内装（創業30年以上、東京都墨田区）
- 東京23区全域対応
- 100件以上の施工実績
- 電話: 03-5638-7402

【応答ルール】
1. 200文字以内で簡潔に
2. まず「なぜ？」を問いかける（ISF思考）
3. 部品ではなく、システムを提案
4. 料金は3プランを紹介
5. 詳しくは人間のスタッフへ誘導`
        },
        ...messages
      ],
      temperature: 0.8,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0.3,
      presence_penalty: 0.3,
    })

    const aiMessage = completion.choices[0]?.message?.content || getFallbackResponse('')

    return NextResponse.json({
      message: aiMessage,
      mode: 'ai',
      usage: {
        prompt_tokens: completion.usage?.prompt_tokens || 0,
        completion_tokens: completion.usage?.completion_tokens || 0,
        total_tokens: completion.usage?.total_tokens || 0,
      }
    })

  } catch (error: any) {
    // エラー時はフォールバック応答
    return NextResponse.json({
      message: 'すまん、今ちょっと調子が悪いみたいだ。電話（03-5638-7402）で直接話そうぜ！',
      mode: 'error',
      error: error.message
    }, { status: 200 }) // ユーザー体験のため200を返す
  }
}
