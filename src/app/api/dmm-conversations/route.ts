import { NextResponse } from 'next/server';
import {
    initDmmConversationsTable,
    listDmmConversations,
    getDmmConversation,
    upsertDmmConversation,
    deleteDmmConversation,
    type DmmTurn,
} from '@/lib/d1';

function nanoid(len: number) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < len; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
}

// GET /api/dmm-conversations            -- list all
// GET /api/dmm-conversations?id=X       -- single
// GET /api/dmm-conversations?init=true  -- create table
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        if (url.searchParams.get('init') === 'true') {
            await initDmmConversationsTable();
            return NextResponse.json({ success: true, message: 'Table ready' });
        }
        const id = url.searchParams.get('id');
        if (id) {
            const conversation = await getDmmConversation(id);
            return NextResponse.json({ success: true, conversation });
        }
        const conversations = await listDmmConversations();
        return NextResponse.json({ success: true, conversations });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

// POST /api/dmm-conversations
// body: { id?, date, title, teacher_name?, duration_minutes?, turns: DmmTurn[], notes? }
// If id omitted, a new one is generated.
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { date, title, turns } = body as {
            date?: string; title?: string; turns?: DmmTurn[];
        };
        if (!date || !title || !Array.isArray(turns) || turns.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'date, title, and non-empty turns array are required',
            }, { status: 400 });
        }
        const id = (typeof body.id === 'string' && body.id.trim()) ? body.id.trim() : nanoid(12);
        const saved = await upsertDmmConversation({
            id,
            date,
            title,
            teacher_name: body.teacher_name ?? null,
            duration_minutes: body.duration_minutes ?? null,
            turns,
            notes: body.notes ?? null,
            // omit => leave existing untouched; explicit object/null sets or clears
            diagnosis: body.diagnosis,
        });
        return NextResponse.json({ success: true, conversation: saved }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

// DELETE /api/dmm-conversations    body: { id }
export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        if (!body.id) {
            return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 });
        }
        await deleteDmmConversation(body.id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
