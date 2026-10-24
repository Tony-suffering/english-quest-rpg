import { NextResponse } from 'next/server';
import { initLineAdminTable, createLineAdminItem } from '@/lib/d1';

const LINE_BROADCAST_ENDPOINT = 'https://api.line.me/v2/bot/message/broadcast';
const LINE_PUSH_ENDPOINT = 'https://api.line.me/v2/bot/message/push';

export const runtime = 'nodejs';

let tableInitialized = false;
async function ensureTable() {
    if (tableInitialized) return;
    await initLineAdminTable();
    tableInitialized = true;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { messages, dryRun = false, title, target = 'broadcast' } = body;

        if (!Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ success: false, error: 'messages must be a non-empty array' }, { status: 400 });
        }
        if (messages.length > 5) {
            return NextResponse.json({ success: false, error: 'LINE accepts max 5 messages per request' }, { status: 400 });
        }

        const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
        if (!token) {
            return NextResponse.json({ success: false, error: 'LINE_CHANNEL_ACCESS_TOKEN not set' }, { status: 500 });
        }

        if (dryRun) {
            return NextResponse.json({ success: true, dryRun: true, target, messages });
        }

        let endpoint: string;
        let payload: Record<string, unknown>;

        if (target === 'test') {
            const userId = process.env.LINE_TEST_USER_ID;
            if (!userId) {
                return NextResponse.json({ success: false, error: 'LINE_TEST_USER_ID not set' }, { status: 500 });
            }
            endpoint = LINE_PUSH_ENDPOINT;
            payload = { to: userId, messages };
        } else {
            endpoint = LINE_BROADCAST_ENDPOINT;
            payload = { messages };
        }

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errBody = await res.text();
            return NextResponse.json({ success: false, status: res.status, error: errBody, target }, { status: 500 });
        }

        // 履歴記録は本配信のみ (test push は記録しない)
        if (target === 'broadcast') {
            await ensureTable();
            const sentAt = new Date().toISOString().slice(0, 16);
            const recordTitle = (title && String(title).trim()) || `配信 ${sentAt}`;
            const item = await createLineAdminItem({
                type: 'broadcast',
                title: recordTitle,
                body: JSON.stringify(messages, null, 2),
                status: 'sent',
                priority: 2,
                sent_at: sentAt,
            });
            return NextResponse.json({ success: true, target, item });
        }

        return NextResponse.json({ success: true, target });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
