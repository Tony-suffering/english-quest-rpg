import { NextResponse } from 'next/server';
import { initUserWordsTable } from '@/lib/d1';

// POST: Initialize user_words table
export async function POST() {
    try {
        await initUserWordsTable();
        return NextResponse.json({ success: true, message: 'user_words table initialized' });
    } catch (error) {
        console.error('Error initializing user_words table:', error);
        return NextResponse.json(
            { error: 'Failed to initialize table', success: false },
            { status: 500 }
        );
    }
}
