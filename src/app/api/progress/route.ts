import { NextResponse } from 'next/server';
import { getAllProgress, updateProgress } from '@/lib/d1';

export async function GET() {
    try {
        const progress = await getAllProgress();
        return NextResponse.json({ progress, success: true });
    } catch (error) {
        console.error('Error fetching progress:', error);
        return NextResponse.json(
            { error: 'Failed to fetch progress', success: false },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { phraseId } = body;

        if (!phraseId) {
            return NextResponse.json(
                { error: 'Missing phraseId', success: false },
                { status: 400 }
            );
        }

        const progress = await updateProgress(phraseId);

        return NextResponse.json({ progress, success: true });
    } catch (error) {
        console.error('Error updating progress:', error);
        return NextResponse.json(
            { error: 'Failed to update progress', success: false },
            { status: 500 }
        );
    }
}
