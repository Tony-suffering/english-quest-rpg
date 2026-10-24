import { NextResponse } from 'next/server';
import { MemoriaServerStorage } from '@/lib/server/memoria';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        MemoriaServerStorage.delete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 });
    }
}
