import { NextResponse } from 'next/server';
import { addForgeUsage } from '@/lib/d1';
import { FORGE_ENTRIES } from '@/data/english/forge-contents';
import { nanoid } from 'nanoid';

// Inline executeQuery for DROP (not exported from d1)
async function rawQuery(sql: string) {
    const token = process.env.CLOUDFLARE_API_TOKEN;
    if (!token) throw new Error('No token');
    const res = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID || '7efac1047fba804c1b7ea5a10868dbfc'}/d1/database/f4801cde-0f1d-4bc9-beec-5d8709813798/query`,
        {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ sql }),
            cache: 'no-store',
        }
    );
    return res.json();
}

// POST: Drop + recreate forge_card_usage with UNIQUE constraint, then seed
export async function POST() {
    try {
        await rawQuery('DROP TABLE IF EXISTS forge_card_usage');
        await rawQuery(`
            CREATE TABLE forge_card_usage (
                id TEXT PRIMARY KEY,
                card_english TEXT NOT NULL,
                card_japanese TEXT NOT NULL,
                forge_id TEXT NOT NULL,
                forge_title TEXT NOT NULL,
                forge_type TEXT NOT NULL,
                created_at TEXT NOT NULL,
                UNIQUE(forge_id, card_english)
            )
        `);

        let count = 0;
        for (const entry of FORGE_ENTRIES) {
            for (const card of entry.sourceCards) {
                await addForgeUsage({
                    id: nanoid(8),
                    card_english: card.english,
                    card_japanese: card.japanese,
                    forge_id: entry.id,
                    forge_title: entry.title,
                    forge_type: entry.type,
                });
                count++;
            }
        }

        return NextResponse.json({ success: true, count });
    } catch (error) {
        console.error('Error initializing forge usage:', error);
        return NextResponse.json(
            { error: 'Failed to initialize', success: false },
            { status: 500 }
        );
    }
}
