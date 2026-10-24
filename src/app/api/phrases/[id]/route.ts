import { NextResponse } from 'next/server';
import { deletePhrase, updatePhrase } from '@/lib/d1';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: 'Missing phrase ID', success: false },
                { status: 400 }
            );
        }

        const updates: Record<string, string | null> = {};
        if (body.english !== undefined) updates.english = body.english;
        if (body.japanese !== undefined) updates.japanese = body.japanese;
        if (body.category !== undefined) updates.category = body.category;
        if (body.date !== undefined) updates.date = body.date;
        if (body.transcript !== undefined) {
            updates.transcript = body.transcript === null ? null : String(body.transcript);
        }

        await updatePhrase(id, updates);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating phrase:', error);
        return NextResponse.json(
            { error: 'Failed to update phrase', success: false },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: 'Missing phrase ID', success: false },
                { status: 400 }
            );
        }

        await deletePhrase(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting phrase:', error);
        return NextResponse.json(
            { error: 'Failed to delete phrase', success: false },
            { status: 500 }
        );
    }
}
