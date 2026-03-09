import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Vercel Cron: 毎朝5時 (JST) に実行
// vercel.json: { "crons": [{ "path": "/api/daily-wisdom-art", "schedule": "0 20 * * *" }] }
// Note: Vercel Cron uses UTC, so 20:00 UTC = 05:00 JST

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN

// wisdomsテーブルはFINANCE Supabaseにある
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_FINANCE_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_FINANCE_SUPABASE_ANON_KEY!
  )
}

// コルクじじいの口調で今日の悟りを生成
async function generateWisdom(): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set')
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `あなたは「コルクじじい」という78歳の床職人です。
60年間床を貼り続け、55歳で悟りを開きました。

特徴:
- 短く断言する（15文字以内が理想）
- 押し付けない穏やかさ
- 床や職人仕事を通じた人生哲学
- 口癖:「だって俺の床、コルクなんだもん」

今日の悟りを一言で述べてください。
「」は不要。悟りの言葉だけを出力。`
        },
        {
          role: 'user',
          content: '今日の悟りを一言。'
        }
      ],
      max_tokens: 50,
      temperature: 0.9
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`)
  }

  const data = await response.json()
  if (!data.choices?.[0]?.message?.content) {
    throw new Error(`OpenAI returned unexpected response: ${JSON.stringify(data)}`)
  }
  return data.choices[0].message.content.trim()
}

// 悟りを英語に翻訳
async function translateWisdom(wisdom: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a poetic translator. Translate the following Japanese zen wisdom into elegant, concise English. Keep it short and profound. Output only the translation, no quotes.`
        },
        {
          role: 'user',
          content: wisdom
        }
      ],
      max_tokens: 50,
      temperature: 0.7
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Translation API error (${response.status}): ${errorText}`)
  }

  const data = await response.json()
  return data.choices?.[0]?.message?.content?.trim() || wisdom
}

// 悟りから禅画を生成 (DALL-E 3)
async function generateZenArt(wisdom: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set')
  }

  const prompt = `Create a minimalist Japanese zen-style ink painting (sumi-e style) that visualizes this wisdom: "${wisdom}"

Style requirements:
- Black ink on cream/beige paper background
- Minimalist, lots of empty space (ma)
- Single focal element (could be: floor boards, craftsman hands, cork texture, simple landscape)
- Subtle gold accent (#D4AF37) as a small detail
- Meditative, peaceful atmosphere
- No text or characters in the image
- Square composition`

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
      response_format: 'url'
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`DALL-E API error (${response.status}): ${errorText}`)
  }

  const data = await response.json()

  if (!data.data?.[0]?.url) {
    throw new Error(`DALL-E returned no image URL: ${JSON.stringify(data)}`)
  }

  return data.data[0].url
}

// Cloudflare Imagesにアップロード
async function uploadToCloudflare(imageBuffer: Buffer, filename: string): Promise<string> {
  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    throw new Error('Cloudflare credentials not set (CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN)')
  }

  const formData = new FormData()
  const blob = new Blob([imageBuffer], { type: 'image/png' })
  formData.append('file', blob, filename)
  formData.append('requireSignedURLs', 'false')

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/images/v1`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`
      },
      body: formData
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Cloudflare API error (${response.status}): ${errorText}`)
  }

  const result = await response.json()

  if (!result.success) {
    throw new Error(`Cloudflare upload failed: ${JSON.stringify(result.errors)}`)
  }

  // 公開URLを返す
  return result.result.variants[0]
}

// Supabaseに保存
async function saveWisdom(content: string, contentEn: string, imageUrl: string): Promise<void> {
  const today = new Date().toISOString().split('T')[0]

  console.log('Saving wisdom for date:', today)

  try {
    const { error, data } = await getSupabase()
      .from('wisdoms')
      .upsert({
        date: today,
        content: content,
        content_en: contentEn,
        source: 'コルクじじい（AI生成）',
        image_url: imageUrl
      }, {
        onConflict: 'date'
      })
      .select()

    if (error) {
      console.error('Supabase save failed:', error)
      throw new Error(`Supabase error: ${error.message} (code: ${error.code})`)
    }

    console.log('Supabase save result:', data)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    const details = err instanceof Error ? err.stack : ''
    throw new Error(JSON.stringify({ message, details, hint: '', code: '' }))
  }
}

export async function GET(request: Request) {
  // Verify cron secret (optional security)
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  // In production, verify the cron secret
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    // Allow manual trigger in development
    const url = new URL(request.url)
    if (!url.searchParams.has('manual')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    console.log('Starting daily wisdom art generation...')

    // 1. 今日の悟りを生成
    console.log('Generating wisdom...')
    const wisdom = await generateWisdom()
    console.log('Wisdom:', wisdom)

    // 2. 英語翻訳を生成
    console.log('Translating to English...')
    const wisdomEn = await translateWisdom(wisdom)
    console.log('English:', wisdomEn)

    // 3. 禅画を生成 (DALL-E returns temporary URL)
    console.log('Generating zen art with DALL-E 3...')
    const dalleUrl = await generateZenArt(wisdom)
    console.log('DALL-E URL:', dalleUrl)

    // 4. DALL-E画像をダウンロード
    console.log('Downloading image...')
    const imageResponse = await fetch(dalleUrl)
    if (!imageResponse.ok) {
      throw new Error(`Failed to download DALL-E image: ${imageResponse.status}`)
    }
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer())
    console.log('Image downloaded, size:', imageBuffer.length)

    // 5. Cloudflareにアップロード（永続保存）
    console.log('Uploading to Cloudflare...')
    const today = new Date().toISOString().split('T')[0]
    const imageUrl = await uploadToCloudflare(imageBuffer, `wisdom-${today}.png`)
    console.log('Uploaded:', imageUrl)

    // 6. Supabaseに保存
    console.log('Saving to Supabase...')
    await saveWisdom(wisdom, wisdomEn, imageUrl)
    console.log('Saved!')

    return NextResponse.json({
      success: true,
      wisdom,
      wisdomEn,
      imageUrl,
      date: today
    })

  } catch (error) {
    console.error('Daily wisdom art generation failed:', error)
    const errorMessage = error instanceof Error
      ? error.message
      : typeof error === 'object'
        ? JSON.stringify(error)
        : String(error)
    return NextResponse.json(
      { error: 'Generation failed', details: errorMessage },
      { status: 500 }
    )
  }
}

// POST も許可（手動トリガー用）
export async function POST(request: Request) {
  return GET(request)
}
