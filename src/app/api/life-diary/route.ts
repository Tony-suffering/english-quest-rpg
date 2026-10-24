import { NextResponse } from 'next/server';

const CLOUDFLARE_ACCOUNT_ID = '7efac1047fba804c1b7ea5a10868dbfc';
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const DATABASE_ID = 'f4801cde-0f1d-4bc9-beec-5d8709813798';

interface LifeDiary {
    date: string;
    content: string;
    news: string | null;
    created_at: string;
    updated_at: string;
}

async function queryD1<T = unknown>(sql: string, params: (string | number | null)[] = []): Promise<{ results: T[] }> {
    if (!CLOUDFLARE_API_TOKEN) throw new Error('No CLOUDFLARE_API_TOKEN');
    const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`,
        {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ sql, params }),
            cache: 'no-store',
        }
    );
    const data = await res.json();
    if (!data.success) throw new Error(data.errors?.[0]?.message || 'D1 error');
    return data.result[0];
}

function jstNowIso(): string {
    const now = new Date();
    const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    return jst.toISOString().replace('Z', '+09:00');
}

// GET /api/life-diary?date=YYYY-MM-DD -- single diary
// GET /api/life-diary?list=true -- list of dates with diaries
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);

        if (url.searchParams.get('list') === 'true') {
            const result = await queryD1<{ date: string }>(
                'SELECT date FROM life_diaries ORDER BY date DESC'
            );
            return NextResponse.json({ success: true, dates: result.results.map(r => r.date) });
        }

        const date = url.searchParams.get('date');
        if (!date) {
            return NextResponse.json({ success: false, error: 'date required' }, { status: 400 });
        }
        const result = await queryD1<LifeDiary>(
            'SELECT * FROM life_diaries WHERE date = ?',
            [date]
        );
        return NextResponse.json({ success: true, diary: result.results[0] || null });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

// POST /api/life-diary
// body: { date: 'YYYY-MM-DD', content: string, news?: string | null }
// upsert: updates if exists, inserts if not
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { date, content, news } = body;
        if (!date || !content || !String(content).trim()) {
            return NextResponse.json({ success: false, error: 'date and content required' }, { status: 400 });
        }
        const now = jstNowIso();
        const trimmedContent = String(content).trim();
        const trimmedNews = news ? String(news).trim() : null;

        const existing = await queryD1<LifeDiary>(
            'SELECT * FROM life_diaries WHERE date = ?',
            [date]
        );

        if (existing.results.length > 0) {
            await queryD1(
                'UPDATE life_diaries SET content = ?, news = ?, updated_at = ? WHERE date = ?',
                [trimmedContent, trimmedNews, now, date]
            );
            return NextResponse.json({
                success: true,
                diary: { date, content: trimmedContent, news: trimmedNews, created_at: existing.results[0].created_at, updated_at: now },
            });
        }

        await queryD1(
            'INSERT INTO life_diaries (date, content, news, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
            [date, trimmedContent, trimmedNews, now, now]
        );
        return NextResponse.json({
            success: true,
            diary: { date, content: trimmedContent, news: trimmedNews, created_at: now, updated_at: now },
        });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

// DELETE /api/life-diary?date=YYYY-MM-DD
export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const date = url.searchParams.get('date');
        if (!date) {
            return NextResponse.json({ success: false, error: 'date required' }, { status: 400 });
        }
        await queryD1('DELETE FROM life_diaries WHERE date = ?', [date]);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
