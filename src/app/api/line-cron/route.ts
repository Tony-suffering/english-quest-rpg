import { NextResponse } from 'next/server';
import { buildDailyMessage, todayJstString } from '@/lib/line-message';

const LINE_BROADCAST_ENDPOINT = 'https://api.line.me/v2/bot/message/broadcast';
const IWASAKI_TEMPLATE_ENDPOINT = 'https://iwasaki-naisou.com/api/line-template-of-day';

export const runtime = 'nodejs';

type IwasakiTemplateResponse = {
    success: boolean;
    date?: string;
    dow?: string;
    id?: string;
    label?: string;
    messages?: unknown[];
    error?: string;
};

async function fetchIwasakiTemplate(dateStr: string): Promise<IwasakiTemplateResponse | null> {
    try {
        const url = new URL(IWASAKI_TEMPLATE_ENDPOINT);
        // No params = today JST per iwasaki contract; pass date for parity / dryRun overrides
        url.searchParams.set('date', dateStr);
        const res = await fetch(url.toString(), {
            method: 'GET',
            headers: { Accept: 'application/json' },
            // Don't let a slow iwasaki block the cron forever
            signal: AbortSignal.timeout(8000),
            cache: 'no-store',
        });
        if (!res.ok) return null;
        const data = (await res.json()) as IwasakiTemplateResponse;
        if (!data || data.success !== true || !Array.isArray(data.messages) || data.messages.length === 0) {
            return null;
        }
        return data;
    } catch {
        return null;
    }
}

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

    const friendKaiwaUrl = process.env.NEXT_PUBLIC_TONIOLAB_KAIWA_URL || 'https://toniolab.com/english/izakaya-toeic/kaiwa';
    const dateStr = url.searchParams.get('date') || todayJstString();
    const dryRun = url.searchParams.get('dry') === '1';
    const forceFallback = url.searchParams.get('fallback') === '1';

    // 1) Try iwasaki Flex template first
    const tpl = forceFallback ? null : await fetchIwasakiTemplate(dateStr);

    if (tpl && tpl.messages) {
        const messages = tpl.messages;
        if (dryRun) {
            return NextResponse.json({
                success: true,
                dryRun: true,
                date: dateStr,
                sent: 'flex',
                templateId: tpl.id,
                templateLabel: tpl.label,
                messageCount: messages.length,
                messages,
            });
        }

        const res = await fetch(LINE_BROADCAST_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ messages }),
        });

        if (!res.ok) {
            const errBody = await res.text();
            return NextResponse.json(
                {
                    success: false,
                    sent: 'flex',
                    status: res.status,
                    error: errBody,
                    date: dateStr,
                    templateId: tpl.id,
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            sent: 'flex',
            date: dateStr,
            templateId: tpl.id,
            templateLabel: tpl.label,
            messageCount: messages.length,
        });
    }

    // 2) Fallback to legacy text path (iwasaki down / no template / forced)
    const text = buildDailyMessage(dateStr, friendKaiwaUrl);

    if (dryRun) {
        return NextResponse.json({
            success: true,
            dryRun: true,
            date: dateStr,
            sent: 'text-fallback',
            text,
        });
    }

    const res = await fetch(LINE_BROADCAST_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ messages: [{ type: 'text', text }] }),
    });

    if (!res.ok) {
        const errBody = await res.text();
        return NextResponse.json(
            {
                success: false,
                sent: 'text-fallback',
                status: res.status,
                error: errBody,
                date: dateStr,
                text,
            },
            { status: 500 }
        );
    }

    return NextResponse.json({
        success: true,
        sent: 'text-fallback',
        date: dateStr,
        text,
    });
}
