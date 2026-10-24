// /api/dmm365  -- init + stats + 全体 GET
import { NextResponse } from 'next/server';
import {
    initDmm365Tables,
    listDmm365SessionsWithAmmo,
    getDmm365Stats,
    getNextDmm365SessionNumber,
} from '@/lib/d1';

export const runtime = 'nodejs';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        if (url.searchParams.get('init') === 'true') {
            await initDmm365Tables();
            return NextResponse.json({ success: true, message: 'Tables ready' });
        }
        if (url.searchParams.get('stats') === 'true') {
            const stats = await getDmm365Stats();
            return NextResponse.json({ success: true, stats });
        }
        if (url.searchParams.get('next_number') === 'true') {
            const next = await getNextDmm365SessionNumber();
            return NextResponse.json({ success: true, next_number: next });
        }
        const sessions = await listDmm365SessionsWithAmmo();
        const stats = await getDmm365Stats();
        return NextResponse.json({ success: true, sessions, stats });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
