// /api/dmm365/sessions  -- list + create
import { NextResponse } from 'next/server';
import {
    listDmm365SessionsWithAmmo,
    createDmm365Session,
    getNextDmm365SessionNumber,
    getDmm365SessionByDate,
} from '@/lib/d1';

export const runtime = 'nodejs';

function nano(len: number) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < len; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
}

export async function GET() {
    try {
        const sessions = await listDmm365SessionsWithAmmo();
        return NextResponse.json({ success: true, sessions });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

// body: { date: 'YYYY-MM-DD', session_number?, teacher?, title?, notes?, reuse_if_date_exists? }
// reuse_if_date_exists=true なら同じ日の既存 session を返す (新規作らない)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        if (!body.date || typeof body.date !== 'string') {
            return NextResponse.json({ success: false, error: 'date is required' }, { status: 400 });
        }

        // reuse mode: 同日の session があれば返す
        if (body.reuse_if_date_exists) {
            const existing = await getDmm365SessionByDate(body.date);
            if (existing) {
                return NextResponse.json({ success: true, session: existing, reused: true });
            }
        }

        const session_number = typeof body.session_number === 'number' && body.session_number > 0
            ? body.session_number
            : await getNextDmm365SessionNumber();

        const id = body.id || nano(10);
        const session = await createDmm365Session({
            id,
            session_number,
            date: body.date,
            teacher: body.teacher ?? null,
            title: body.title ?? null,
            notes: body.notes ?? null,
        });
        return NextResponse.json({ success: true, session }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
