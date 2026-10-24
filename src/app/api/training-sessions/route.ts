import { NextResponse } from 'next/server';
import { initTrainingSessionsTable, saveTrainingSession, getTrainingSessions, getTrainingSessionStats } from '@/lib/d1';

// GET: fetch session history + stats
//   ?stats=true → aggregate stats only
//   default → recent sessions list
export async function GET(request: Request) {
    try {
        await initTrainingSessionsTable();
        const { searchParams } = new URL(request.url);

        if (searchParams.get('stats') === 'true') {
            const stats = await getTrainingSessionStats();
            return NextResponse.json({ success: true, ...stats });
        }

        const limit = parseInt(searchParams.get('limit') || '50');
        const sessions = await getTrainingSessions(limit);
        return NextResponse.json({ success: true, sessions });
    } catch (error) {
        console.error('training-sessions GET error:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}

// POST: save a completed session
export async function POST(request: Request) {
    try {
        await initTrainingSessionsTable();
        const body = await request.json();

        const session = await saveTrainingSession({
            date: body.date || new Date().toISOString().split('T')[0],
            duration_preset: body.duration_preset,
            duration_actual: body.duration_actual,
            cards_reviewed: body.cards_reviewed || 0,
            xp_earned: body.xp_earned || 0,
            level_ups: body.level_ups || 0,
            max_chain: body.max_chain || 0,
            grade: body.grade || 'D',
            cards_per_minute: body.cards_per_minute || 0,
            completed: body.completed ? 1 : 0,
        });

        return NextResponse.json({ success: true, session });
    } catch (error) {
        console.error('training-sessions POST error:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
