import { NextResponse } from 'next/server';
import { getAllUserWords, addUserWord, getUserWordByEnglish, getUserWordMasteryMap } from '@/lib/d1';
import { nanoid } from 'nanoid';

// GET: Get all user words or mastery map
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const mastery = searchParams.get('mastery');

    try {
        if (mastery === 'true') {
            const data = await getUserWordMasteryMap();
            return NextResponse.json({ ...data, success: true });
        }

        const words = await getAllUserWords();
        return NextResponse.json({ words, success: true });
    } catch (error) {
        console.error('Error fetching user words:', error);
        return NextResponse.json(
            { error: 'Failed to fetch words', success: false },
            { status: 500 }
        );
    }
}

// POST: Register a word
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { english, pronunciation, japanese, note, category } = body;

        if (!english || !japanese) {
            return NextResponse.json(
                { error: 'Missing required fields (english, japanese)', success: false },
                { status: 400 }
            );
        }

        // Dedup check
        const existing = await getUserWordByEnglish(english);
        if (existing) {
            return NextResponse.json(
                { error: 'Word already registered', existing, success: false },
                { status: 409 }
            );
        }

        const word = await addUserWord({
            id: nanoid(8),
            english,
            pronunciation,
            japanese,
            note,
            category,
        });

        return NextResponse.json({ word, success: true }, { status: 201 });
    } catch (error) {
        console.error('Error adding user word:', error);
        return NextResponse.json(
            { error: 'Failed to add word', success: false },
            { status: 500 }
        );
    }
}
