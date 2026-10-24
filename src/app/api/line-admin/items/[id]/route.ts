import { NextResponse } from 'next/server';
import { updateLineAdminItem, deleteLineAdminItem } from '@/lib/d1';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const idNum = Number(id);
        if (!Number.isFinite(idNum)) {
            return NextResponse.json({ success: false, error: 'invalid id' }, { status: 400 });
        }
        const patch = await request.json();
        await updateLineAdminItem(idNum, patch);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const idNum = Number(id);
        if (!Number.isFinite(idNum)) {
            return NextResponse.json({ success: false, error: 'invalid id' }, { status: 400 });
        }
        await deleteLineAdminItem(idNum);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
