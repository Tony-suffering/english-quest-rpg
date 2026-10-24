import { NextResponse } from 'next/server';
import { GOROKU_SEEDS } from '@/data/english/goroku-seed';

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '7efac1047fba804c1b7ea5a10868dbfc';
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const DATABASE_ID = 'f4801cde-0f1d-4bc9-beec-5d8709813798';

async function d1Query(sql: string, params: (string | number | null)[] = []) {
    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/d1/database/${DATABASE_ID}/query`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sql, params }),
        }
    );
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`D1 API error: ${error}`);
    }
    return response.json();
}

export async function POST() {
    try {
        if (!CLOUDFLARE_API_TOKEN) {
            throw new Error('CLOUDFLARE_API_TOKEN is not set');
        }

        // Drop and recreate
        await d1Query('DROP TABLE IF EXISTS goroku');
        await d1Query(`
            CREATE TABLE goroku (
                id TEXT PRIMARY KEY,
                day_slot INTEGER NOT NULL CHECK(day_slot >= 1 AND day_slot <= 31),
                japanese TEXT NOT NULL,
                english TEXT NOT NULL,
                literal TEXT,
                context TEXT NOT NULL,
                category TEXT NOT NULL,
                mastery_level INTEGER DEFAULT 0,
                slot TEXT,
                slot_hints TEXT,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Build all rows
        const slotCounters: Record<string, number> = {};
        const rows: string[] = [];
        const now = new Date().toISOString();

        for (const s of GOROKU_SEEDS) {
            const month = s.month || '2026-02';
            const key = `${month}_${s.daySlot}`;
            slotCounters[key] = (slotCounters[key] || 0);
            const idx = slotCounters[key]++;
            const monthSuffix = month === '2026-02' ? '' : `_${month.slice(5)}`;
            const id = `d${String(s.daySlot).padStart(2, '0')}_${idx}${monthSuffix}`;

            const englishJson = JSON.stringify(
                Array.isArray(s.english) ? s.english : [s.english, s.english, s.english, s.english]
            );
            const slotHintsJson = s.slotHints ? JSON.stringify(s.slotHints) : '';

            const esc = (v: string) => v.replace(/'/g, "''");
            rows.push(`('${esc(id)}', ${s.daySlot}, '${esc(s.japanese)}', '${esc(englishJson)}', '${esc(s.literal || '')}', '${esc(s.context)}', '${esc(s.category)}', 0, '${esc(s.slot || '')}', '${esc(slotHintsJson)}', '${esc(now)}')`);
        }

        // Batch insert in chunks of 50 to stay within query size limits
        const CHUNK = 50;
        for (let i = 0; i < rows.length; i += CHUNK) {
            const chunk = rows.slice(i, i + CHUNK);
            await d1Query(
                `INSERT INTO goroku (id, day_slot, japanese, english, literal, context, category, mastery_level, slot, slot_hints, created_at) VALUES ${chunk.join(',')}`
            );
        }

        return NextResponse.json({
            message: `Goroku table initialized with ${rows.length} expressions across 31 days`,
            count: rows.length,
            success: true,
        });
    } catch (error) {
        console.error('Error initializing goroku:', error);
        return NextResponse.json({
            error: 'Failed to initialize goroku table',
            message: error instanceof Error ? error.message : 'Unknown error',
            success: false,
        }, { status: 500 });
    }
}
