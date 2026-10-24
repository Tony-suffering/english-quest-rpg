// /api/dmm365/sessions/[id]  -- GET (with ammo) / PUT (update) / DELETE
import { NextResponse } from 'next/server';
import {
    getDmm365Session,
    updateDmm365Session,
    deleteDmm365Session,
    syncDmm365SessionToPhrases,
} from '@/lib/d1';

export const runtime = 'nodejs';

export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const session = await getDmm365Session(id);
        if (!session) {
            return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, session });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

// body: { session_number?, date?, teacher?, title?, notes? } -- 渡された field だけ update
export async function PUT(request: Request, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const body = await request.json();
        await updateDmm365Session(id, body);
        const session = await getDmm365Session(id);
        return NextResponse.json({ success: true, session });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

export async function DELETE(_request: Request, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        await deleteDmm365Session(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

// POST sync action via query
// /api/dmm365/sessions/[id]?action=sync-to-phrases
export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const url = new URL(request.url);
        const action = url.searchParams.get('action');
        if (action === 'sync-to-phrases') {
            const body = await request.json().catch(() => ({}));
            const result = await syncDmm365SessionToPhrases(id, { category: body.category });
            return NextResponse.json({ success: true, ...result });
        }
        return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
