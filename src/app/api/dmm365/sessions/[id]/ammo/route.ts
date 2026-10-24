// /api/dmm365/sessions/[id]/ammo  -- list + add (single or bulk)
import { NextResponse } from 'next/server';
import {
    listDmm365AmmoBySession,
    createDmm365Ammo,
    getDmm365Session,
    type Dmm365Status,
} from '@/lib/d1';

export const runtime = 'nodejs';

function nano(len: number) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < len; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
}

const VALID_STATUSES: Dmm365Status[] = ['planned', 'used', 'landed', 'corrected', 'flat'];

export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const ammo = await listDmm365AmmoBySession(id);
        return NextResponse.json({ success: true, ammo });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

// body either:
//   { english, japanese?, source?, status?, correction?, reaction_note?, sort_order? }
//   { items: [...] }  -- bulk insert
export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id: sessionId } = await ctx.params;
        const session = await getDmm365Session(sessionId);
        if (!session) {
            return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 });
        }

        const body = await request.json();
        const isBulk = Array.isArray(body.items);
        const items: any[] = isBulk ? body.items : [body];

        const created = [];
        let nextOrder = session.ammo.length > 0
            ? Math.max(...session.ammo.map(a => a.sort_order)) + 1
            : 0;

        for (const item of items) {
            if (typeof item.english !== 'string' || !item.english.trim()) continue;
            const status: Dmm365Status = VALID_STATUSES.includes(item.status) ? item.status : 'planned';
            const ammo = await createDmm365Ammo({
                id: nano(10),
                session_id: sessionId,
                sort_order: typeof item.sort_order === 'number' ? item.sort_order : nextOrder++,
                english: item.english.trim(),
                japanese: item.japanese ?? null,
                source: item.source ?? null,
                status,
                correction: item.correction ?? null,
                reaction_note: item.reaction_note ?? null,
            });
            created.push(ammo);
        }

        return NextResponse.json({ success: true, ammo: created }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
