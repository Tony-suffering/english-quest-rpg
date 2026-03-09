import { NextResponse } from 'next/server'
import { redis, getDaysSinceFounding, getTodayKey, getYesterdayKey } from '@/lib/redis'

// キー名
const TOTAL_KEY = 'visitors:total'
const DAILY_PREFIX = 'visitors:daily:'

export async function GET() {
  try {
    // Redisが設定されていない場合はデモデータを返す
    if (!redis) {
      return NextResponse.json({
        daysSinceFounding: getDaysSinceFounding(),
        today: 2,
        yesterday: 3,
        total: 1247,
        isDemo: true,
      })
    }

    const todayKey = getTodayKey()
    const yesterdayKey = getYesterdayKey()

    // 並列でデータを取得
    const [today, yesterday, total] = await Promise.all([
      redis.get<number>(`${DAILY_PREFIX}${todayKey}`),
      redis.get<number>(`${DAILY_PREFIX}${yesterdayKey}`),
      redis.get<number>(TOTAL_KEY),
    ])

    return NextResponse.json({
      daysSinceFounding: getDaysSinceFounding(),
      today: today || 0,
      yesterday: yesterday || 0,
      total: total || 0,
      isDemo: false,
    })
  } catch (error) {
    console.error('Visitor count GET error:', error)
    return NextResponse.json({
      daysSinceFounding: getDaysSinceFounding(),
      today: 0,
      yesterday: 0,
      total: 0,
      isDemo: true,
    })
  }
}

export async function POST() {
  try {
    // Redisが設定されていない場合はスキップ
    if (!redis) {
      return NextResponse.json({ success: true, isDemo: true })
    }

    const todayKey = getTodayKey()
    const dailyKey = `${DAILY_PREFIX}${todayKey}`

    // 今日のカウントと総数をインクリメント
    await Promise.all([
      redis.incr(dailyKey),
      redis.incr(TOTAL_KEY),
      // 今日のキーは48時間後に自動削除（メモリ節約）
      redis.expire(dailyKey, 60 * 60 * 48),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Visitor count POST error:', error)
    return NextResponse.json({ success: false, error: 'Failed to count' }, { status: 500 })
  }
}
