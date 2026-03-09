import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { apiLimiter } from '@/lib/api-limiter'

/**
 * お問い合わせAPI - Resendでメール送信
 *
 * 【環境変数設定】
 * .env.local に以下を追加してください：
 *
 * RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
 * CONTACT_EMAIL_TO=kaz@iwasaki-naisou.jp
 * CONTACT_EMAIL_FROM=onboarding@resend.dev  # 後で独自ドメインに変更可能
 */

// Resendインスタンスを遅延初期化（ビルド時エラー回避）
let resend: Resend | null = null

function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

export async function POST(request: NextRequest) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  try {
    // 1. レート制限チェック（IPアドレスベース）
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const rateLimitKey = `contact-form-${ip}`

    if (!apiLimiter.canRequest(rateLimitKey, 'minute')) {
      return NextResponse.json(
        { error: 'リクエストが多すぎます。1分後に再試行してください。' },
        { status: 429 }
      )
    }

    if (!apiLimiter.canRequest(rateLimitKey, 'hour')) {
      return NextResponse.json(
        { error: '1時間あたりの制限に達しました。しばらくお待ちください。' },
        { status: 429 }
      )
    }

    if (!apiLimiter.canRequest(rateLimitKey, 'day')) {
      return NextResponse.json(
        { error: '1日あたりの制限に達しました。明日再試行してください。' },
        { status: 429 }
      )
    }

    // リクエストを記録
    apiLimiter.recordRequest(rateLimitKey)

    const body = await request.json()
    const { name, company, email, phone, subject, message } = body

    if (isDevelopment) {
      console.log('=== お問い合わせAPI 開始 ===')
      console.log('受信データ:', { name, email, subject })
    }

    // バリデーション
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      )
    }

    // メールアドレスの簡易バリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'メールアドレスの形式が正しくありません' },
        { status: 400 }
      )
    }

    // Resend API キーチェック
    if (!process.env.RESEND_API_KEY) {
      if (isDevelopment) {
        console.error('RESEND_API_KEY が設定されていません')
      }
      return NextResponse.json(
        { error: 'メール送信設定がされていません。管理者にお問い合わせください。' },
        { status: 500 }
      )
    }

    // メール送信先
    const toEmail = process.env.CONTACT_EMAIL_TO || 'kaz@iwasaki-naisou.jp'
    const fromEmail = process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev'

    // Resendクライアント取得
    const resendClient = getResendClient()
    if (!resendClient) {
      if (isDevelopment) {
        console.error('Resendクライアントの初期化に失敗')
      }
      return NextResponse.json(
        { error: 'メール送信設定がされていません。管理者にお問い合わせください。' },
        { status: 500 }
      )
    }

    // 管理者向けメール送信
    const { data, error } = await resendClient.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `【お問い合わせ】${subject} - ${name}様`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #252423; color: white; padding: 20px; border-bottom: 3px solid #D4AF37; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #252423; display: block; margin-bottom: 5px; }
            .value { background: white; padding: 10px; border-left: 3px solid #10B981; }
            .footer { margin-top: 20px; padding: 15px; background: #f0f0f0; text-align: center; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">📧 新規お問い合わせ</h2>
              <p style="margin: 5px 0 0 0; font-size: 14px;">イワサキ内装HPより</p>
            </div>

            <div class="content">
              <div class="field">
                <span class="label">📝 お問い合わせ種類</span>
                <div class="value">${subject}</div>
              </div>

              <div class="field">
                <span class="label">👤 お名前</span>
                <div class="value">${name}</div>
              </div>

              ${company ? `
              <div class="field">
                <span class="label">🏢 会社名・団体名</span>
                <div class="value">${company}</div>
              </div>
              ` : ''}

              <div class="field">
                <span class="label">📧 メールアドレス</span>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>

              ${phone ? `
              <div class="field">
                <span class="label">📞 電話番号</span>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              ` : ''}

              <div class="field">
                <span class="label">💬 お問い合わせ内容</span>
                <div class="value" style="white-space: pre-wrap;">${message}</div>
              </div>
            </div>

            <div class="footer">
              <p>このメールはイワサキ内装公式HPのお問い合わせフォームから自動送信されました。</p>
              <p>返信する場合は、上記のメールアドレスまたは電話番号にご連絡ください。</p>
            </div>
          </div>
        </body>
        </html>
      `,
      // プレーンテキスト版（HTMLメール非対応の場合）
      text: `
【お問い合わせ】${subject}

お名前: ${name}
${company ? `会社名: ${company}\n` : ''}メールアドレス: ${email}
${phone ? `電話番号: ${phone}\n` : ''}
お問い合わせ内容:
${message}

---
イワサキ内装HPより
      `
    })

    if (error) {
      if (isDevelopment) {
        console.error('❌ Resend送信エラー:', error)
      }
      return NextResponse.json(
        {
          error: 'メール送信に失敗しました',
          ...(isDevelopment && { details: error.message || JSON.stringify(error) })
        },
        { status: 500 }
      )
    }

    // 成功レスポンス
    if (isDevelopment) {
      console.log('✅ メール送信成功:', data?.id)
    }
    return NextResponse.json({
      success: true,
      message: 'お問い合わせを受け付けました',
      id: data?.id
    })

  } catch (error) {
    if (isDevelopment) {
      console.error('お問い合わせAPI エラー:', error)
    }
    return NextResponse.json(
      {
        error: 'サーバーエラーが発生しました',
        ...(isDevelopment && { details: error instanceof Error ? error.message : String(error) })
      },
      { status: 500 }
    )
  }
}

