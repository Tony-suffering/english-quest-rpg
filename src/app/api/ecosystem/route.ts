import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sampleEcosystemThreads } from '@/data/ecosystem'

export const runtime = 'edge'

const supabase = createClient(
  process.env.NEXT_PUBLIC_FINANCE_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_FINANCE_SUPABASE_ANON_KEY!
)

// GET: 最新の会話を取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    const { data, error } = await supabase
      .from('ecosystem_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      // テーブルがない場合はサンプル
      return NextResponse.json({ success: true, data: sampleEcosystemThreads })
    }

    // 時間でグループ化（30秒以内のメッセージは同じスレッドとみなす）
    const threads = groupByTimeProximity(data || [])

    return NextResponse.json({ success: true, data: threads })
  } catch {
    return NextResponse.json({ success: true, data: sampleEcosystemThreads })
  }
}

// POST: n8nから一括保存
// Body: { jijii: "...", anya: "...", takumi: "...", trigger: "NHK" }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { jijii, anya, takumi, trigger } = body

    if (!jijii && !anya && !takumi) {
      return NextResponse.json(
        { success: false, error: 'At least one character message required' },
        { status: 400 }
      )
    }

    const threadId = crypto.randomUUID()
    const messages = []

    if (jijii) messages.push({ id: crypto.randomUUID(), thread_id: threadId, character: 'jijii', message: jijii, trigger })
    if (anya) messages.push({ id: crypto.randomUUID(), thread_id: threadId, character: 'anya', message: anya, trigger: null })
    if (takumi) messages.push({ id: crypto.randomUUID(), thread_id: threadId, character: 'takumi', message: takumi, trigger: null })

    const { error } = await supabase
      .from('ecosystem_messages')
      .insert(messages)

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, threadId, count: messages.length })
  } catch {
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}

// 時間の近いメッセージをグループ化（30秒以内）
function groupByTimeProximity(messages: any[]) {
  if (messages.length === 0) return []

  // 時間順にソート（古い順）
  const sorted = [...messages].sort((a, b) =>
    new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )

  const threads: any[] = []
  let currentThread: any = null
  let lastTime: number = 0
  const PROXIMITY_MS = 60000 // 60秒以内は同じスレッド

  for (const msg of sorted) {
    const msgTime = new Date(msg.created_at).getTime()

    // 新しいスレッドを開始する条件：前のメッセージから60秒以上経過
    if (!currentThread || (msgTime - lastTime) > PROXIMITY_MS) {
      currentThread = {
        id: msg.thread_id || msg.id,
        messages: [],
        createdAt: msg.created_at
      }
      threads.push(currentThread)
    }

    currentThread.messages.push({
      id: msg.id,
      threadId: currentThread.id,
      character: msg.character,
      message: msg.message,
      trigger: msg.trigger,
      createdAt: msg.created_at
    })

    lastTime = msgTime
  }

  // 新しいスレッドが先頭に来るように逆順
  return threads.reverse()
}
