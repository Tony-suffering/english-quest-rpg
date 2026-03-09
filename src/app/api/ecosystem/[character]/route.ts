import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'

const supabase = createClient(
  process.env.NEXT_PUBLIC_FINANCE_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_FINANCE_SUPABASE_ANON_KEY!
)

// POST /api/ecosystem/jijii  { message: "...", trigger: "NHK" }
// POST /api/ecosystem/anya   { message: "..." }
// POST /api/ecosystem/takumi { message: "..." }
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ character: string }> }
) {
  try {
    const { character } = await params

    const body = await request.json()
    const { message, trigger, threadId } = body

    if (!['jijii', 'anya', 'takumi'].includes(character)) {
      return NextResponse.json({ success: false, error: 'Invalid character' }, { status: 400 })
    }

    if (!message) {
      return NextResponse.json({ success: false, error: 'message required', body }, { status: 400 })
    }

    const { error } = await supabase
      .from('ecosystem_messages')
      .insert({
        id: crypto.randomUUID(),
        thread_id: threadId || crypto.randomUUID(),
        character,
        message,
        trigger: trigger || null
      })

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}
