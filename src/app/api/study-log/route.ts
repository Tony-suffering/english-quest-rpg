import { NextResponse } from 'next/server';

const CLOUDFLARE_ACCOUNT_ID = '7efac1047fba804c1b7ea5a10868dbfc';
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const DATABASE_ID = 'f4801cde-0f1d-4bc9-beec-5d8709813798';
const GRIND_ADMIN_TOKEN = process.env.GRIND_ADMIN_TOKEN || 'tonio-grind-2026';

function checkAdmin(request: Request): boolean {
    const token = request.headers.get('x-admin-token');
    return token === GRIND_ADMIN_TOKEN;
}

async function queryD1(sql: string, params: any[] = []) {
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
    return data.result[0]?.results || [];
}

async function ensureTable() {
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
}

// Extract YouTube ID from various URL formats or raw ID
function extractYouTubeId(input: string): string | null {
    if (!input) return null;
    const trimmed = input.trim();
    // Already a raw 11-char ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
    // youtu.be/<id>
    let m = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (m) return m[1];
    // youtube.com/watch?v=<id>
    m = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (m) return m[1];
    // youtube.com/embed/<id>
    m = trimmed.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
    if (m) return m[1];
    // youtube.com/shorts/<id>
    m = trimmed.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (m) return m[1];
    return null;
}

export async function GET() {
    try {
        await ensureTable();
        const rows = await queryD1('SELECT * FROM study_log ORDER BY date DESC, created_at DESC');
        return NextResponse.json({ entries: rows });
    } catch (e: any) {
        return NextResponse.json({ entries: [], error: e.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!checkAdmin(request)) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    try {
        await ensureTable();
        const body = await request.json();
        const { date, youtubeUrl, youtubeId: rawId, title, titleJa, note, tags, duration } = body;

        if (!date || !title) {
            return NextResponse.json({ error: 'date and title required' }, { status: 400 });
        }

        const youtubeId = rawId || extractYouTubeId(youtubeUrl || '');
        if (!youtubeId) {
            return NextResponse.json({ error: 'valid youtube url or id required' }, { status: 400 });
        }

        const id = `log-${date}-${Math.random().toString(36).slice(2, 8)}`;
        const safe = (s: string) => (s || '').replace(/'/g, "''");

        await queryD1(
            `INSERT INTO study_log (id, date, youtube_id, title, title_ja, note, tags, duration)
             VALUES ('${id}', '${safe(date)}', '${safe(youtubeId)}', '${safe(title)}', '${safe(titleJa || '')}', '${safe(note || '')}', '${safe(tags || '')}', ${Number(duration) || 0})`
        );

        const rows = await queryD1(`SELECT * FROM study_log WHERE id = '${id}'`);
        return NextResponse.json({ entry: rows[0] });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    if (!checkAdmin(request)) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
        const safe = id.replace(/'/g, "''");
        await queryD1(`DELETE FROM study_log WHERE id = '${safe}'`);
        return NextResponse.json({ ok: true });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    if (!checkAdmin(request)) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    try {
        const body = await request.json();
        const { id, title, titleJa, note, tags } = body;
        if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
        const safe = (s: string) => (s || '').replace(/'/g, "''");
        const sets: string[] = [];
        if (title !== undefined) sets.push(`title = '${safe(title)}'`);
        if (titleJa !== undefined) sets.push(`title_ja = '${safe(titleJa)}'`);
        if (note !== undefined) sets.push(`note = '${safe(note)}'`);
        if (tags !== undefined) sets.push(`tags = '${safe(tags)}'`);
        if (sets.length === 0) return NextResponse.json({ ok: true });
        await queryD1(`UPDATE study_log SET ${sets.join(', ')} WHERE id = '${safe(id)}'`);
        const rows = await queryD1(`SELECT * FROM study_log WHERE id = '${safe(id)}'`);
        return NextResponse.json({ entry: rows[0] });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
