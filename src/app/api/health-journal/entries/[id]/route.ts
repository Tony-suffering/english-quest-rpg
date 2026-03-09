import { NextResponse } from 'next/server';
import { HealthJournalServerStorage } from '@/lib/server/health-journal';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const entry = HealthJournalServerStorage.getById(id);
        if (!entry) {
            return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
        }
        return NextResponse.json(entry);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get entry' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        HealthJournalServerStorage.delete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 });
    }
}
