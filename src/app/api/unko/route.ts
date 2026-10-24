import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const bookPath = path.join(process.cwd(), 'book', 'unko.md');
        const content = fs.readFileSync(bookPath, 'utf-8');

        return new NextResponse(content, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
            },
        });
    } catch (error) {
        console.error('Error reading book:', error);
        return new NextResponse('Book not found', { status: 404 });
    }
}
