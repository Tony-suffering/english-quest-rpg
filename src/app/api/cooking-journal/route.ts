/**
 * Cooking Journal CRUD API
 * 料理ジャーナルのCRUD操作
 */

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { CookingJournalEntry, CookingJournalInput } from '@/types/cooking-journal';

const DATA_PATH = path.join(process.cwd(), 'src', 'data', 'cooking-journal.json');

async function readData(): Promise<CookingJournalEntry[]> {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function writeData(entries: CookingJournalEntry[]): Promise<void> {
    await fs.writeFile(DATA_PATH, JSON.stringify(entries, null, 2), 'utf-8');
}

// GET - 全件取得 or ID指定取得
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const entries = await readData();

    if (id) {
        const entry = entries.find(e => e.id === id);
        if (!entry) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }
        return NextResponse.json(entry);
    }

    return NextResponse.json(entries);
}

// POST - 新規作成
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const input: CookingJournalInput = body.input;

        if (!input.dishName || !input.ingredients || !input.process) {
            return NextResponse.json(
                { error: 'dishName, ingredients, and process are required' },
                { status: 400 }
            );
        }

        const entries = await readData();
        const now = new Date();
        const id = now.getTime().toString();

        const newEntry: CookingJournalEntry = {
            id,
            date: now.toISOString().split('T')[0],
            title: `${now.getMonth() + 1}/${now.getDate()} - ${input.dishName}`,
            dishName: input.dishName,
            dishNameEn: input.dishNameEn,
            ingredients: input.ingredients,
            process: input.process,
            tasteRating: input.tasteRating || 3,
            presentationRating: input.presentationRating || 3,
            difficultyRating: input.difficultyRating || 3,
            notes: input.notes,
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
        };

        entries.unshift(newEntry);
        await writeData(entries);

        return NextResponse.json(newEntry, { status: 201 });
    } catch (error) {
        console.error('Cooking journal create error:', error);
        return NextResponse.json(
            { error: 'Failed to create entry' },
            { status: 500 }
        );
    }
}

// PUT - 更新
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, updates } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const entries = await readData();
        const index = entries.findIndex(e => e.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        entries[index] = {
            ...entries[index],
            ...updates,
            updatedAt: new Date().toISOString(),
        };

        await writeData(entries);

        return NextResponse.json(entries[index]);
    } catch (error) {
        console.error('Cooking journal update error:', error);
        return NextResponse.json(
            { error: 'Failed to update entry' },
            { status: 500 }
        );
    }
}

// DELETE - 削除
export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const entries = await readData();
    const filtered = entries.filter(e => e.id !== id);

    if (filtered.length === entries.length) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await writeData(filtered);

    return NextResponse.json({ success: true });
}
