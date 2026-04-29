import { NextResponse } from 'next/server';
import { buildSkitFlexMessage, pickSkitForDate, todayJstString } from '@/lib/line-message';

const LINE_BROADCAST_ENDPOINT = 'https://api.line.me/v2/bot/message/broadcast';

export const runtime = 'nodejs';

export async function GET(request: Request) {
    const url = new URL(request.url);
    const cronSecret = process.env.CRON_SECRET;
    const auth = request.headers.get('authorization');
    if (cronSecret && auth !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ success: false, error: 'unauthorized' }, { status: 401 });
    }

    const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    if (!token) {
        return NextResponse.json({ success: false, error: 'LINE_CHANNEL_ACCESS_TOKEN not set' }, { status: 500 });
    }

    const dateStr = url.searchParams.get('date') || todayJstString();
    const dryRun = url.searchParams.get('dry') === '1';

    const skit = pickSkitForDate(dateStr);
    const flex = buildSkitFlexMessage(skit);

    if (dryRun) {
        return NextResponse.json({ success: true, dryRun: true, date: dateStr, nodeId: skit.id, character: skit.character, flex });
    }

    const res = await fetch(LINE_BROADCAST_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ messages: [flex] }),
    });

    if (!res.ok) {
        const errBody = await res.text();
        return NextResponse.json({ success: false, status: res.status, error: errBody, date: dateStr, nodeId: skit.id }, { status: 500 });
    }

    return NextResponse.json({ success: true, date: dateStr, nodeId: skit.id, character: skit.character });
}
