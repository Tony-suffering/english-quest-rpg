import { Redis } from '@upstash/redis'

// Upstash Redis client
// 環境変数が設定されていない場合はnullを返す
export const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null

// 創業日: 1994年
export const FOUNDING_DATE = new Date('1994-01-01')

// 創業からの日数を計算
export function getDaysSinceFounding(): number {
  const now = new Date()
  const diffTime = now.getTime() - FOUNDING_DATE.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// 今日の日付キーを取得 (JST)
export function getTodayKey(): string {
  const now = new Date()
  // JSTに変換
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000)
  return jst.toISOString().split('T')[0]
}

// 昨日の日付キーを取得 (JST)
export function getYesterdayKey(): string {
  const now = new Date()
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000)
  jst.setDate(jst.getDate() - 1)
  return jst.toISOString().split('T')[0]
}
