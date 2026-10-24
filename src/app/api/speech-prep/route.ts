// /api/speech-prep — スピーチ暗記トピックの CRUD
import { NextResponse } from 'next/server';
import {
    initSpeechPrepTable,
    listSpeechPrep,
    createSpeechPrep,
    updateSpeechPrep,
    deleteSpeechPrep,
} from '@/lib/d1';

export const runtime = 'nodejs';

export async function GET() {
    try {
        await initSpeechPrepTable();
        const topics = await listSpeechPrep();
        return NextResponse.json({ success: true, topics });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await initSpeechPrepTable();
        const body = await request.json();
        if (!body.title || !Array.isArray(body.chunks)) {
            return NextResponse.json({ success: false, error: 'title and chunks required' }, { status: 400 });
        }
        const topic = await createSpeechPrep({ title: body.title, topic_ja: body.topic_ja, chunks: body.chunks });
        return NextResponse.json({ success: true, topic }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        if (!body.id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 });
        await updateSpeechPrep(body.id, { title: body.title, topic_ja: body.topic_ja, chunks: body.chunks });
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 });
        await deleteSpeechPrep(id);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
