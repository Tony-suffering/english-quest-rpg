// /api/dmm365/ammo/[id]  -- update + delete single ammo
import { NextResponse } from 'next/server';
import { updateDmm365Ammo, deleteDmm365Ammo, getDmm365Ammo, type Dmm365Status } from '@/lib/d1';

export const runtime = 'nodejs';

const VALID_STATUSES: Dmm365Status[] = ['planned', 'used', 'landed', 'corrected', 'flat'];

export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const ammo = await getDmm365Ammo(id);
        if (!ammo) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
        return NextResponse.json({ success: true, ammo });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

// body: { english?, japanese?, source?, status?, correction?, reaction_note?, sort_order? }
export async function PUT(request: Request, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const body = await request.json();
        const updates: any = {};
        if (typeof body.english === 'string') updates.english = body.english;
        if ('japanese' in body) updates.japanese = body.japanese;
        if ('source' in body) updates.source = body.source;
        if (typeof body.status === 'string' && VALID_STATUSES.includes(body.status as Dmm365Status)) {
            updates.status = body.status;
        }
        if ('correction' in body) updates.correction = body.correction;
        if ('reaction_note' in body) updates.reaction_note = body.reaction_note;
        if (typeof body.sort_order === 'number') updates.sort_order = body.sort_order;
        await updateDmm365Ammo(id, updates);
        const ammo = await getDmm365Ammo(id);
        return NextResponse.json({ success: true, ammo });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

export async function DELETE(_request: Request, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        await deleteDmm365Ammo(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
