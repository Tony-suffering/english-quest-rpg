import { NextResponse } from 'next/server';
import {
    listLifeDiaryReplies,
    listAllLifeDiaryReplyDates,
    listLatestMemberReplyByDate,
    createLifeDiaryReply,
    deleteLifeDiaryReply,
} from '@/lib/d1';

// GET /api/life-diary-replies?date=YYYY-MM-DD -- list replies for date
// GET /api/life-diary-replies?counts=true    -- map of date -> count
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);

        if (url.searchParams.get('counts') === 'true') {
            const [counts, memberLatest] = await Promise.all([
                listAllLifeDiaryReplyDates(),
                listLatestMemberReplyByDate(),
            ]);
            return NextResponse.json({ success: true, counts, memberLatest });
        }

        const date = url.searchParams.get('date');
        if (!date) {
            return NextResponse.json({ success: false, error: 'date required' }, { status: 400 });
        }
        const replies = await listLifeDiaryReplies(date);
        return NextResponse.json({ success: true, replies });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

// POST /api/life-diary-replies
// body: { date: 'YYYY-MM-DD', content: string, member_slug?: string, member_name?: string }
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { date, content, member_slug, member_name } = body;
        if (!date || !content || !String(content).trim()) {
            return NextResponse.json({ success: false, error: 'date and content required' }, { status: 400 });
        }
        const reply = await createLifeDiaryReply(
            date,
            String(content).trim(),
            member_slug || null,
            member_name || null
        );
        return NextResponse.json({ success: true, reply });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

// DELETE /api/life-diary-replies
// body: { id: number, member_slug?: string }  (null slug = admin)
export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        const { id, member_slug } = body;
        if (!id) {
            return NextResponse.json({ success: false, error: 'id required' }, { status: 400 });
        }
        await deleteLifeDiaryReply(Number(id), member_slug || null);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
