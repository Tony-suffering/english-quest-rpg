import { NextResponse } from 'next/server';
import { initEwProgressTable } from '@/lib/d1';

// POST: Initialize ew_progress table
export async function POST() {
    try {
        await initEwProgressTable();
        return NextResponse.json({ success: true, message: 'ew_progress table initialized' });
    } catch (error) {
        console.error('Error initializing ew_progress table:', error);
        return NextResponse.json({ error: 'Failed to initialize table', success: false }, { status: 500 });
    }
}
