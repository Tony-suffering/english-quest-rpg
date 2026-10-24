// /api/dmm365/ammo/reorder  -- bulk reorder
import { NextResponse } from 'next/server';
import { bulkReorderDmm365Ammo } from '@/lib/d1';

export const runtime = 'nodejs';

// body: { orders: [{ id, sort_order }] }
export async function POST(request: Request) {
    try {
        const body = await request.json();
        if (!Array.isArray(body.orders)) {
            return NextResponse.json({ success: false, error: 'orders array required' }, { status: 400 });
        }
        await bulkReorderDmm365Ammo(body.orders);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
