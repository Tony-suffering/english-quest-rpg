import { NextResponse } from 'next/server';
import {
    initLineAdminTable,
    listLineAdminItems,
    createLineAdminItem,
} from '@/lib/d1';

let tableInitialized = false;
async function ensureTable() {
    if (tableInitialized) return;
    await initLineAdminTable();
    tableInitialized = true;
}

export async function GET(request: Request) {
    try {
        await ensureTable();
        const url = new URL(request.url);
        const type = url.searchParams.get('type') || undefined;
        const items = await listLineAdminItems(type);
        return NextResponse.json({ success: true, items });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await ensureTable();
        const body = await request.json();
        if (!body.type || !body.title) {
            return NextResponse.json({ success: false, error: 'type and title required' }, { status: 400 });
        }
        const item = await createLineAdminItem(body);
        return NextResponse.json({ success: true, item });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
