import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * 個人コンテンツのパスワードゲート認証。
 * POST { password } → 一致すれば site_gate Cookie (sha256 トークン) を1年で発行。
 * パスワード本体は Cookie に載せず、middleware.ts の gateToken と同じ導出を使う。
 */

const GATE_COOKIE = 'site_gate'
const ONE_YEAR = 60 * 60 * 24 * 365

async function gateToken(password: string): Promise<string> {
  const data = new TextEncoder().encode('site-gate:' + password)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

// タイミング攻撃をわずかに緩和する定数時間比較
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function POST(req: NextRequest) {
  const expected = process.env.SITE_GATE_PASSWORD
  if (!expected) {
    // 未設定なら実質ゲート無効。誤って締め出さないよう素通しを許可。
    return NextResponse.json({ success: true, note: 'gate disabled (no password set)' })
  }

  let password = ''
  try {
    const body = await req.json()
    password = typeof body?.password === 'string' ? body.password : ''
  } catch {
    return NextResponse.json({ success: false, error: 'invalid body' }, { status: 400 })
  }

  if (!safeEqual(password, expected)) {
    return NextResponse.json({ success: false, error: 'wrong password' }, { status: 401 })
  }

  const token = await gateToken(expected)
  const res = NextResponse.json({ success: true })
  res.cookies.set(GATE_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: ONE_YEAR,
  })
  return res
}
