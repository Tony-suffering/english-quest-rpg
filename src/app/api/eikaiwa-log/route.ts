import { NextResponse } from 'next/server';
import { getAllEikaiwaLogs, addEikaiwaLog, getEikaiwaLogStats } from '@/lib/d1';
import { nanoid } from 'nanoid';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const stats = searchParams.get('stats');

    try {
        if (stats === 'true') {
            const data = await getEikaiwaLogStats();
            return NextResponse.json({ ...data, success: true });
        }

        const entries = await getAllEikaiwaLogs();
        return NextResponse.json({ entries, success: true });
    } catch (error) {
        console.error('Error fetching eikaiwa logs:', error);
        return NextResponse.json(
            { error: 'Failed to fetch eikaiwa logs', success: false },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { session_id, session_date, highlights, struggle_points, flow_rating, note, goroku_ids } = body;

        if (!session_id || !session_date) {
            return NextResponse.json(
                { error: 'Missing required fields: session_id, session_date', success: false },
                { status: 400 }
            );
        }

        if (session_id < 1 || session_id > 15) {
            return NextResponse.json(
                { error: 'session_id must be 1-15', success: false },
                { status: 400 }
            );
        }

        if (flow_rating !== undefined && flow_rating !== null && (flow_rating < 1 || flow_rating > 5)) {
            return NextResponse.json(
                { error: 'flow_rating must be 1-5', success: false },
                { status: 400 }
            );
        }

        const id = `el${nanoid(6)}`;

        const entry = await addEikaiwaLog({
            id,
            session_id,
            session_date,
            highlights: highlights || [],
            struggle_points: struggle_points || [],
            flow_rating: flow_rating || null,
            note: note || null,
            goroku_ids: goroku_ids || [],
        });

        return NextResponse.json({ entry, success: true }, { status: 201 });
    } catch (error) {
        console.error('Error adding eikaiwa log:', error);
        return NextResponse.json(
            { error: 'Failed to add eikaiwa log', success: false },
            { status: 500 }
        );
    }
}
