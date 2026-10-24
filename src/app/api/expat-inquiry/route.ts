import { NextResponse } from 'next/server'

// Expat Inquiry API
// In production: connect to email service (Resend) and CRM

interface InquiryPayload {
  name: string
  email: string
  propertyType?: string
  area?: string
  message: string
  source?: string // Lead source: ten, reddit, ref-edmund, organic, etc.
}

export async function POST(request: Request) {
  try {
    const payload: InquiryPayload = await request.json()

    // Validate required fields
    if (!payload.name || !payload.email || !payload.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 }
      )
    }

    // Log the inquiry (in production: save to database + send email)
    console.log('=== NEW EXPAT INQUIRY ===')
    console.log('Source:', payload.source || 'organic')
    console.log('Name:', payload.name)
    console.log('Email:', payload.email)
    console.log('Property Type:', payload.propertyType || 'Not specified')
    console.log('Area:', payload.area || 'Not specified')
    console.log('Message:', payload.message)
    console.log('Timestamp:', new Date().toISOString())
    console.log('========================')

    // In production:
    // 1. Save to Supabase
    // 2. Send notification email to iwasaki@... via Resend
    // 3. Send confirmation email to client
    // 4. Track lead source (TEN, japanlife, organic, etc.)

    return NextResponse.json({
      success: true,
      message: 'Inquiry received. We will respond within 24 hours.',
      data: {
        name: payload.name,
        timestamp: new Date().toISOString(),
      }
    })

  } catch (error) {
    console.error('Expat inquiry error:', error)
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    )
  }
}
