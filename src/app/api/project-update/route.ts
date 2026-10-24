import { NextResponse } from 'next/server'

// Project Update API
// Receives progress updates and can trigger notifications

interface UpdatePayload {
  projectId: string
  date: string
  status: 'complete' | 'in-progress' | 'delayed'
  notes?: string
  photos?: string[]
  notifyClient?: boolean
}

// In production, this would connect to:
// - Database (Supabase/PostgreSQL)
// - Email service (Resend/SendGrid)
// - File storage (Cloudflare R2)

export async function POST(request: Request) {
  try {
    const payload: UpdatePayload = await request.json()

    // Validate required fields
    if (!payload.projectId || !payload.date || !payload.status) {
      return NextResponse.json(
        { error: 'Missing required fields: projectId, date, status' },
        { status: 400 }
      )
    }

    // Log the update (in production: save to database)
    console.log('Project Update:', {
      projectId: payload.projectId,
      date: payload.date,
      status: payload.status,
      notes: payload.notes,
      timestamp: new Date().toISOString(),
    })

    // If notifyClient is true, send email (in production)
    if (payload.notifyClient) {
      // In production:
      // await sendClientEmail(payload.projectId, {
      //   subject: `Project Update - ${payload.date}`,
      //   body: generateUpdateEmail(payload)
      // })
      console.log('Client notification queued for:', payload.projectId)
    }

    return NextResponse.json({
      success: true,
      message: 'Update recorded',
      data: {
        projectId: payload.projectId,
        date: payload.date,
        status: payload.status,
        notified: payload.notifyClient || false,
      }
    })

  } catch (error) {
    console.error('Project update error:', error)
    return NextResponse.json(
      { error: 'Failed to process update' },
      { status: 500 }
    )
  }
}

// GET: Retrieve project updates
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const projectId = searchParams.get('projectId')

  if (!projectId) {
    return NextResponse.json(
      { error: 'Missing projectId parameter' },
      { status: 400 }
    )
  }

  // In production: fetch from database
  // For now, return mock data for yakumo project
  if (projectId === 'yakumo') {
    return NextResponse.json({
      projectId: 'yakumo',
      clientName: 'Mr. Edmund Keith Henry',
      status: 'upcoming',
      startDate: '2026-02-10',
      endDate: '2026-02-26',
      progress: 0,
      updates: [],
      lastUpdated: new Date().toISOString(),
    })
  }

  return NextResponse.json(
    { error: 'Project not found' },
    { status: 404 }
  )
}
