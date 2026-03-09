import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'

export const runtime = 'edge'

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const body = await request.json()

    const {
      question,
      response,
      rating,
      modelVersion = 'v1.0',
      sessionId,
      userId
    } = body

    // バリデーション
    if (!question || !response || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields: question, response, rating' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Supabaseに保存
    const { data, error } = await supabase
      .from('uchida_feedback')
      .insert({
        question,
        response,
        rating,
        model_version: modelVersion,
        session_id: sessionId || null,
        user_id: userId || null,
        created_at: new Date().toISOString()
      })
      .select()

    if (error) {
      return NextResponse.json(
        { error: 'Failed to save feedback', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Feedback saved successfully',
      data
    })

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * 週次集計API（管理者用）
 *
 * GET /api/uchida-feedback?period=week&version=v1.0
 */
export async function GET(request: Request) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)

    const period = searchParams.get('period') || 'week'
    const version = searchParams.get('version') || 'v1.0'

    // 期間計算
    const now = new Date()
    let startDate: Date

    switch (period) {
      case 'day':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        break
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    }

    // フィードバック取得
    const { data: feedback, error } = await supabase
      .from('uchida_feedback')
      .select('*')
      .eq('model_version', version)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch feedback', details: error.message },
        { status: 500 }
      )
    }

    // 集計
    const totalCount = feedback?.length || 0
    const ratings = feedback?.map(f => f.rating) || []
    const avgRating = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
      : 0

    const lowRatedCount = feedback?.filter(f => f.rating <= 2).length || 0
    const highRatedCount = feedback?.filter(f => f.rating >= 4).length || 0

    // 低評価ケース（改善候補）
    const improvementCandidates = feedback?.filter(f => f.rating <= 3) || []

    return NextResponse.json({
      success: true,
      summary: {
        version,
        period,
        totalCount,
        avgRating: Math.round(avgRating * 100) / 100,
        lowRatedCount,
        highRatedCount,
        improvementCandidatesCount: improvementCandidates.length
      },
      improvementCandidates: improvementCandidates.slice(0, 10), // Top 10
      allFeedback: feedback
    })

  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
