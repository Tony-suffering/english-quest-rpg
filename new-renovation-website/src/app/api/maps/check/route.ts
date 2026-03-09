import { NextResponse } from 'next/server'
import { apiLimiter } from '@/lib/api-limiter'

/**
 * Google Maps API使用状況確認エンドポイント
 * GET /api/maps/check
 */
export async function GET() {
  try {
    const usage = apiLimiter.getUsage('google-maps')

    return NextResponse.json({
      success: true,
      usage: {
        daily: {
          used: usage.day.used,
          limit: usage.day.limit,
          remaining: usage.day.remaining,
          percentage: Math.round((usage.day.used / usage.day.limit) * 100)
        },
        hourly: {
          used: usage.hour.used,
          limit: usage.hour.limit,
          remaining: usage.hour.remaining,
          percentage: Math.round((usage.hour.used / usage.hour.limit) * 100)
        },
        perMinute: {
          used: usage.minute.used,
          limit: usage.minute.limit,
          remaining: usage.minute.remaining,
          percentage: Math.round((usage.minute.used / usage.minute.limit) * 100)
        }
      },
      canRequest: apiLimiter.canRequest('google-maps', 'day')
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get API usage' },
      { status: 500 }
    )
  }
}
