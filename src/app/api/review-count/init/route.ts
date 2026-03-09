import { NextResponse } from 'next/server';
import { initReviewCountsTable } from '@/lib/d1';

export async function POST() {
    try {
        await initReviewCountsTable();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error initializing review_counts table:', error);
        return NextResponse.json({ error: 'Failed to init', success: false }, { status: 500 });
    }
}
