import { NextResponse } from 'next/server';
import { getAllLifeRecordings, addLifeRecording, initLifeRecordingsTable, getPendingLifeRecordings, convertLifeRecording, deleteLifeRecording, updateLifeRecordingPublicity, updateLifeRecording } from '@/lib/d1';

function nanoid(len: number) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < len; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
}

// GET /api/life-recordings
// ?pending=true -- only pending
// ?init=true -- create table
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);

        if (url.searchParams.get('init') === 'true') {
            await initLifeRecordingsTable();
            return NextResponse.json({ success: true, message: 'Table created' });
        }

        if (url.searchParams.get('pending') === 'true') {
            const recordings = await getPendingLifeRecordings();
            return NextResponse.json({ success: true, recordings });
        }

        const recordings = await getAllLifeRecordings();
        return NextResponse.json({ success: true, recordings });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

// POST /api/life-recordings
// body: { japanese: string }
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { japanese } = body;
        if (!japanese?.trim()) {
            return NextResponse.json({ success: false, error: 'japanese is required' }, { status: 400 });
        }
        const id = nanoid(10);
        const recording = await addLifeRecording(id, japanese.trim());
        return NextResponse.json({ success: true, recording }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

// PATCH /api/life-recordings
// Publicity toggle: { id, is_public: boolean }
// Conversion:      { id, english_short, english_attitude, english_full, english_monologue, context, literal?, category? }
// Partial edit:    { id, edit: true, japanese?, english_short?, english_attitude?, english_full?, english_monologue?, context?, literal?, category? }
export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id } = body;
        if (!id) {
            return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 });
        }

        if (typeof body.is_public === 'boolean') {
            await updateLifeRecordingPublicity(id, body.is_public);
            return NextResponse.json({ success: true });
        }

        // Partial edit: caller sets edit:true and sends only the fields they want to change.
        // Explicitly flagged so we don't accidentally collide with the conversion path below.
        if (body.edit === true) {
            const editableKeys = [
                'japanese', 'english_short', 'english_attitude', 'english_full',
                'english_monologue', 'context', 'literal', 'category',
            ] as const;
            const updates: Record<string, unknown> = {};
            for (const key of editableKeys) {
                if (Object.prototype.hasOwnProperty.call(body, key)) {
                    updates[key] = body[key];
                }
            }
            if (typeof updates.japanese === 'string' && !updates.japanese.trim()) {
                return NextResponse.json({ success: false, error: 'japanese cannot be empty' }, { status: 400 });
            }
            if (Object.keys(updates).length === 0) {
                return NextResponse.json({ success: false, error: 'no editable fields provided' }, { status: 400 });
            }
            await updateLifeRecording(id, updates);
            return NextResponse.json({ success: true });
        }

        const { english_short, english_attitude, english_full, english_monologue, context } = body;
        if (!english_attitude || !context) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }
        await convertLifeRecording(id, {
            english_short: english_short || '',
            english_attitude,
            english_full: english_full || '',
            english_monologue: english_monologue || '',
            context,
            literal: body.literal,
            category: body.category,
        });
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

// DELETE /api/life-recordings
// body: { id }
export async function DELETE(request: Request) {
    try {
        const body = await request.json();
        if (!body.id) {
            return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 });
        }
        await deleteLifeRecording(body.id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
