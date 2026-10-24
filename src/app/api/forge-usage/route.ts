import { NextResponse } from 'next/server';
import { getAllForgeUsage, addForgeUsage, initForgeUsageTable } from '@/lib/d1';
import { nanoid } from 'nanoid';

// GET: Fetch all forge card usage records
export async function GET() {
    try {
        const usage = await getAllForgeUsage();
        return NextResponse.json({ usage, success: true });
    } catch (error) {
        console.error('Error fetching forge usage:', error);
        return NextResponse.json(
            { error: 'Failed to fetch forge usage', success: false },
            { status: 500 }
        );
    }
}

// POST: Add forge card usage records (bulk)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { entries } = body;

        if (!entries || !Array.isArray(entries)) {
            return NextResponse.json(
                { error: 'Missing entries array', success: false },
                { status: 400 }
            );
        }

        for (const entry of entries) {
            await addForgeUsage({
                id: nanoid(8),
                card_english: entry.card_english,
                card_japanese: entry.card_japanese,
                forge_id: entry.forge_id,
                forge_title: entry.forge_title,
                forge_type: entry.forge_type,
            });
        }

        return NextResponse.json({ success: true, count: entries.length }, { status: 201 });
    } catch (error) {
        console.error('Error adding forge usage:', error);
        return NextResponse.json(
            { error: 'Failed to add forge usage', success: false },
            { status: 500 }
        );
    }
}
