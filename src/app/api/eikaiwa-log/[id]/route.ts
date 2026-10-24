import { NextResponse } from 'next/server';
import { updateEikaiwaLog, deleteEikaiwaLog } from '@/lib/d1';

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { session_id, session_date, highlights, struggle_points, flow_rating, note, goroku_ids } = body;

        await updateEikaiwaLog(id, { session_id, session_date, highlights, struggle_points, flow_rating, note, goroku_ids });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating eikaiwa log:', error);
        return NextResponse.json(
            { error: 'Failed to update eikaiwa log', success: false },
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
        await deleteEikaiwaLog(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting eikaiwa log:', error);
        return NextResponse.json(
            { error: 'Failed to delete eikaiwa log', success: false },
            { status: 500 }
        );
    }
}
