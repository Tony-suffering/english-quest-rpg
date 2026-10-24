import { NextRequest, NextResponse } from 'next/server';
import {
    initPhraseClipsTable, getAllPhraseClips, getPhraseClip,
    upsertPhraseClip, deletePhraseClip,
} from '@/lib/d1';

// R2 configuration using Cloudflare API (same bucket/pattern as voice-recordings)
const R2_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '7efac1047fba804c1b7ea5a10868dbfc';
const R2_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const R2_BUCKET = process.env.R2_BUCKET || 'podcast-audio';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || 'https://pub-628af24ae7da43ac93bbfb202b34b73e.r2.dev';

async function uploadToR2(key: string, buffer: Buffer, contentType: string): Promise<void> {
    if (!R2_API_TOKEN) throw new Error('CLOUDFLARE_API_TOKEN is not configured');
    const url = `https://api.cloudflare.com/client/v4/accounts/${R2_ACCOUNT_ID}/r2/buckets/${R2_BUCKET}/objects/${encodeURIComponent(key)}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${R2_API_TOKEN}`, 'Content-Type': contentType },
        body: buffer,
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`R2 upload failed: ${response.status} ${errorText}`);
    }
}

async function deleteFromR2(key: string): Promise<void> {
    const url = `https://api.cloudflare.com/client/v4/accounts/${R2_ACCOUNT_ID}/r2/buckets/${R2_BUCKET}/objects/${encodeURIComponent(key)}`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${R2_API_TOKEN}` },
    });
    if (!response.ok && response.status !== 404) {
        const errorText = await response.text();
        throw new Error(`R2 delete failed: ${response.status} ${errorText}`);
    }
}

function extFromType(type: string): string {
    if (type.includes('mpeg') || type.includes('mp3')) return 'mp3';
    if (type.includes('mp4') || type.includes('m4a') || type.includes('aac')) return 'm4a';
    if (type.includes('wav')) return 'wav';
    if (type.includes('ogg')) return 'ogg';
    if (type.includes('webm')) return 'webm';
    return 'bin';
}

// POST: upload a clip for a phrase (1 clip per phrase — overwrites existing)
export async function POST(request: NextRequest) {
    try {
        await initPhraseClipsTable();
        const formData = await request.formData();
        const audioFile = formData.get('audio') as File | null;
        const phraseId = formData.get('phraseId') as string | null;
        if (!audioFile || !phraseId) {
            return NextResponse.json({ error: 'Missing audio file or phraseId', success: false }, { status: 400 });
        }

        const english = (formData.get('english') as string) || '';
        const japanese = (formData.get('japanese') as string) || '';
        const date = (formData.get('date') as string) || '';
        const category = (formData.get('category') as string) || '';

        // Remove the previous clip for this phrase from R2 (if any)
        const existing = await getPhraseClip(phraseId);
        if (existing) {
            try { await deleteFromR2(existing.url.replace(`${R2_PUBLIC_URL}/`, '')); } catch { /* ignore */ }
        }

        const arrayBuffer = await audioFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const ext = extFromType(audioFile.type);
        const timestamp = Date.now();
        const key = `phrase-clips/${encodeURIComponent(phraseId)}/${timestamp}.${ext}`;
        const contentType = audioFile.type.startsWith('video/') ? audioFile.type : (audioFile.type || 'audio/mpeg');

        await uploadToR2(key, buffer, contentType);
        const publicUrl = `${R2_PUBLIC_URL}/${key}`;

        await upsertPhraseClip(phraseId, publicUrl, { english, japanese, date, category });

        return NextResponse.json({ success: true, phraseId, url: publicUrl });
    } catch (error) {
        console.error('Error uploading phrase clip:', error);
        return NextResponse.json({ error: 'Failed to upload clip', success: false }, { status: 500 });
    }
}

// GET: list all phrase clips
export async function GET() {
    try {
        await initPhraseClipsTable();
        const clips = await getAllPhraseClips();
        return NextResponse.json({ success: true, clips });
    } catch (error) {
        console.error('Error fetching phrase clips:', error);
        return NextResponse.json({ error: 'Failed to fetch clips', success: false, clips: [] }, { status: 500 });
    }
}

// DELETE: remove a phrase clip (?phraseId=...)
export async function DELETE(request: NextRequest) {
    try {
        await initPhraseClipsTable();
        const { searchParams } = new URL(request.url);
        const phraseId = searchParams.get('phraseId');
        if (!phraseId) {
            return NextResponse.json({ error: 'Missing phraseId', success: false }, { status: 400 });
        }
        const existing = await getPhraseClip(phraseId);
        if (existing) {
            try { await deleteFromR2(existing.url.replace(`${R2_PUBLIC_URL}/`, '')); } catch { /* ignore */ }
        }
        await deletePhraseClip(phraseId);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting phrase clip:', error);
        return NextResponse.json({ error: 'Failed to delete clip', success: false }, { status: 500 });
    }
}
