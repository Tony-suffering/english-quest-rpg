import { NextResponse } from 'next/server';
import { initEikaiwaLogTable } from '@/lib/d1';

export async function POST() {
    try {
        await initEikaiwaLogTable();

        return NextResponse.json({
            message: 'Eikaiwa log table initialized',
            success: true,
        });
    } catch (error) {
        console.error('Error initializing eikaiwa log table:', error);
        return NextResponse.json({
            error: 'Failed to initialize eikaiwa log table',
            message: error instanceof Error ? error.message : 'Unknown error',
            success: false,
        }, { status: 500 });
    }
}
