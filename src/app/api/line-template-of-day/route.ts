import { NextResponse } from 'next/server';
import { getRotationForDate, todayJstDateStr } from '@/lib/line-rotation';

export const runtime = 'nodejs';

// GET /api/line-template-of-day             → 今日 (JST) のローテ
// GET /api/line-template-of-day?date=YYYY-MM-DD → 指定日
//
// english-quest-rpg の cron が叩いて Flex を取得する想定。
export async function GET(request: Request) {
    const url = new URL(request.url);
    const dateParam = url.searchParams.get('date');
    const date = dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)
        ? dateParam
        : todayJstDateStr();

    const rotation = getRotationForDate(date);
    if (!rotation) {
        return NextResponse.json({ success: false, error: 'no rotation', date }, { status: 404 });
    }

    // 曜日 (0=Sun..6=Sat)
    const [y, m, d] = date.split('-').map(Number);
    const dow = new Date(Date.UTC(y, m - 1, d, 12, 0, 0)).getUTCDay();

    return NextResponse.json({
        success: true,
        date,
        dow,
        id: rotation.id,
        label: rotation.label,
        messages: rotation.messages,
    });
}
