import { NextResponse } from 'next/server';
import { getLifeDiary, listLifeDiaryDates, upsertLifeDiary, deleteLifeDiary, initLifeDiariesTable } from '@/lib/d1';

// GET /api/life-diary?date=YYYY-MM-DD -- single diary
// GET /api/life-diary?list=true -- list of dates with diaries
// GET /api/life-diary?init=true -- create table
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);

        if (url.searchParams.get('init') === 'true') {
            await initLifeDiariesTable();
            return NextResponse.json({ success: true, message: 'Table created' });
        }

        if (url.searchParams.get('list') === 'true') {
            const dates = await listLifeDiaryDates();
            return NextResponse.json({ success: true, dates });
        }

        const date = url.searchParams.get('date');
        if (!date) {
            return NextResponse.json({ success: false, error: 'date required' }, { status: 400 });
        }
        const diary = await getLifeDiary(date);
        return NextResponse.json({ success: true, diary });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

// POST /api/life-diary
// body: { date: 'YYYY-MM-DD', content: string, news?: string }
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { date, content, news } = body;
        if (!date || !content) {
            return NextResponse.json({ success: false, error: 'date and content required' }, { status: 400 });
        }
        const diary = await upsertLifeDiary(date, content, news || null);
        return NextResponse.json({ success: true, diary });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

// DELETE /api/life-diary?date=YYYY-MM-DD
export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const date = url.searchParams.get('date');
        if (!date) {
            return NextResponse.json({ success: false, error: 'date required' }, { status: 400 });
        }
        await deleteLifeDiary(date);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
