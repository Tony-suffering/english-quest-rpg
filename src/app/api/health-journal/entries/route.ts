import { NextResponse } from 'next/server';
import { HealthJournalServerStorage } from '@/lib/server/health-journal';

export async function GET() {
    try {
        const entries = HealthJournalServerStorage.getAll();
        return NextResponse.json(entries);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const entry = await request.json();
        HealthJournalServerStorage.save(entry);
        return NextResponse.json({ success: true, entry });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save entry' }, { status: 500 });
    }
}
