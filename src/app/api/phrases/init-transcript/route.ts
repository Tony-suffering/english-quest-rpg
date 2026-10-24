import { NextResponse } from 'next/server';
import { ensureTranscriptColumn } from '@/lib/d1';

// GET /api/phrases/init-transcript
// Idempotent: adds `transcript TEXT` column to phrases table.
// Re-runs are safe (ALTER エラーは catch で握る).
export async function GET() {
    try {
        await ensureTranscriptColumn();
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('init-transcript failed:', err);
        return NextResponse.json(
            { success: false, error: String(err) },
            { status: 500 }
        );
    }
}
