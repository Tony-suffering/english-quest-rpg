import { NextResponse } from 'next/server';

const CLOUDFLARE_ACCOUNT_ID = '7efac1047fba804c1b7ea5a10868dbfc';
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const DATABASE_ID = 'f4801cde-0f1d-4bc9-beec-5d8709813798';

async function queryD1(sql: string) {
    if (!CLOUDFLARE_API_TOKEN) throw new Error('No token');
    const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`,
        {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ sql }),
            cache: 'no-store',
        }
    );
    const data = await res.json();
    if (!data.success) throw new Error(data.errors?.[0]?.message || 'D1 error');
    return data.result[0]?.results || [];
}

export async function POST() {
    try {
        await queryD1(`
            CREATE TABLE IF NOT EXISTS study_log (
                id TEXT PRIMARY KEY,
                date TEXT NOT NULL,
                youtube_id TEXT NOT NULL,
                title TEXT NOT NULL,
                title_ja TEXT DEFAULT '',
                note TEXT DEFAULT '',
                tags TEXT DEFAULT '',
                duration INTEGER DEFAULT 0,
                created_at TEXT DEFAULT (datetime('now'))
            )
        `);
        await queryD1(`CREATE INDEX IF NOT EXISTS idx_study_log_date ON study_log(date)`);
        return NextResponse.json({ ok: true });
    } catch (e: any) {
        return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
    }
}
