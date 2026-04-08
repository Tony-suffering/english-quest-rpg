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

export async function GET() {
    try {
        const [phrases, masteryRows, linkRows] = await Promise.all([
            queryD1('SELECT id, english, japanese, category, date FROM phrases ORDER BY date DESC, id ASC'),
            queryD1('SELECT phrase_id, mastery_level, last_leveled_at, card_points, card_name, retired FROM phrase_mastery'),
            queryD1('SELECT * FROM phrase_links ORDER BY created_at DESC').catch(() => []),
        ]);

        const mastery: Record<string, number> = {};
        const lastLeveled: Record<string, string> = {};
        const cardPoints: Record<string, number> = {};
        for (const r of masteryRows) {
            mastery[r.phrase_id] = r.mastery_level || 0;
            if (r.last_leveled_at) lastLeveled[r.phrase_id] = r.last_leveled_at.split('T')[0];
            if (r.card_points) cardPoints[r.phrase_id] = r.card_points;
        }

        const links: Record<string, any[]> = {};
        for (const l of linkRows) {
            if (!links[l.phrase_id]) links[l.phrase_id] = [];
            links[l.phrase_id].push(l);
        }

        return NextResponse.json({
            phrases,
            mastery,
            lastLeveled,
            cardPoints,
            recordings: {},
            links,
            success: true,
        });
    } catch (error) {
        console.error('training-init error:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
