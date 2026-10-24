import { NextRequest, NextResponse } from 'next/server';
import {
    initListeningClipsTable, insertListeningClip, getListeningClips,
    findExistingListeningSlugs, listListeningPacks, deleteListeningClip, getListeningStats, retagListeningClip,
} from '@/lib/d1';

// リスニング専用コーパスの入口。
// Excel を使わない: 音声ファイル名がそのまま英文なので、slug(=ファイル名) を正解として扱う。
// 音声は R2 (phrase-clips と同じバケツ、キーだけ listening-clips/ 配下)。
// 読み出しは必ず索引 + LIMIT (phrases の全表走査で D1 の行読み上限を焼いた前科があるため)。

const R2_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '7efac1047fba804c1b7ea5a10868dbfc';
const R2_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const R2_BUCKET = process.env.R2_BUCKET || 'podcast-audio';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || 'https://pub-628af24ae7da43ac93bbfb202b34b73e.r2.dev';

async function uploadToR2(key: string, buffer: Buffer, contentType: string): Promise<void> {
    if (!R2_API_TOKEN) throw new Error('CLOUDFLARE_API_TOKEN is not configured');
    const url = `https://api.cloudflare.com/client/v4/accounts/${R2_ACCOUNT_ID}/r2/buckets/${R2_BUCKET}/objects/${encodeURIComponent(key)}`;
    const res = await fetch(url, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${R2_API_TOKEN}`, 'Content-Type': contentType },
        body: buffer,
    });
    if (!res.ok) throw new Error(`R2 upload failed: ${res.status} ${await res.text()}`);
}

async function deleteFromR2(key: string): Promise<void> {
    if (!R2_API_TOKEN) throw new Error('CLOUDFLARE_API_TOKEN is not configured');
    const url = `https://api.cloudflare.com/client/v4/accounts/${R2_ACCOUNT_ID}/r2/buckets/${R2_BUCKET}/objects/${encodeURIComponent(key)}`;
    const res = await fetch(url, { method: 'DELETE', headers: { Authorization: `Bearer ${R2_API_TOKEN}` } });
    if (!res.ok && res.status !== 404) throw new Error(`R2 delete failed: ${res.status}`);
}

function extFromName(name: string): string {
    const m = name.toLowerCase().match(/\.([a-z0-9]+)$/);
    const e = m ? m[1] : 'mp3';
    return ['mp3', 'm4a', 'wav', 'ogg', 'webm', 'aac'].includes(e) ? e : 'mp3';
}

function typeForExt(ext: string): string {
    if (ext === 'mp3') return 'audio/mpeg';
    if (ext === 'm4a' || ext === 'aac') return 'audio/mp4';
    if (ext === 'wav') return 'audio/wav';
    if (ext === 'ogg') return 'audio/ogg';
    if (ext === 'webm') return 'audio/webm';
    return 'audio/mpeg';
}

// POST:
//   - multipart (audio, slug, text, pack) … 音声1本を取り込む
//   - application/json { have: [...slug] } … 既にあるものだけ返す (照合)
//     GET の ?have= は slug を数百並べると URL が長すぎて 431 になるので、照合はこちらを使う
export async function POST(request: NextRequest) {
    try {
        await initListeningClipsTable();

        if ((request.headers.get('content-type') || '').includes('application/json')) {
            const body = await request.json().catch(() => ({}));

            // { remove: [...slug] } … 取り違えて入れた行を消す (D1 の行 + R2 の音声)
            if (Array.isArray(body?.remove)) {
                const slugs: string[] = body.remove.slice(0, 500);
                let removed = 0;
                for (const s of slugs) {
                    const key = `listening-clips/${encodeURIComponent(s).slice(0, 180)}.mp3`;
                    try { await deleteFromR2(key); } catch { /* 音声が無くても行は消す */ }
                    if (await deleteListeningClip(s)) removed++;
                }
                return NextResponse.json({ success: true, removed });
            }

            // { retag: { slug, pack } } … 束の付け替え (落とした後にジャンル分けをやり直す)
            if (body?.retag?.slug && body?.retag?.pack) {
                const ok = await retagListeningClip(String(body.retag.slug), String(body.retag.pack).slice(0, 40));
                return NextResponse.json({ success: ok, slug: body.retag.slug, pack: body.retag.pack });
            }

            const slugs: string[] = Array.isArray(body?.have) ? body.have.slice(0, 1000) : [];
            return NextResponse.json({ success: true, existing: await findExistingListeningSlugs(slugs) });
        }

        const fd = await request.formData();
        const audio = fd.get('audio') as File | null;
        const slug = String(fd.get('slug') || '').trim();
        const text = String(fd.get('text') || '').trim();
        const pack = String(fd.get('pack') || '').trim() || new Date().toISOString().slice(0, 10);
        if (!audio || !slug || !text) {
            return NextResponse.json({ success: false, error: 'Missing audio, slug or text' }, { status: 400 });
        }

        // 既にある slug は音声を上げ直さない (R2 の無駄と二重課金を避ける)
        const existing = await findExistingListeningSlugs([slug]);
        if (existing.length) {
            return NextResponse.json({ success: true, slug, skipped: true });
        }

        const buffer = Buffer.from(await audio.arrayBuffer());
        const ext = extFromName(audio.name || 'a.mp3');
        const key = `listening-clips/${encodeURIComponent(slug).slice(0, 180)}.${ext}`;
        await uploadToR2(key, buffer, audio.type || typeForExt(ext));

        const inserted = await insertListeningClip({
            slug,
            text,
            url: `${R2_PUBLIC_URL}/${key}`,
            pack,
            words: text.split(/\s+/).filter(Boolean).length,
            bucket: Math.floor(Math.random() * 100),
        });

        return NextResponse.json({ success: true, slug, inserted, skipped: !inserted });
    } catch (error) {
        console.error('listening-clips POST failed:', error);
        return NextResponse.json({ success: false, error: 'Failed to store clip' }, { status: 500 });
    }
}

// GET: 出題用の取り出し。全件は返さない。
//   ?packs=1            束の一覧 (件数付き)
//   ?have=a,b,c         その slug のうち既にあるものだけ返す (取り込み前の照合)
//   ?bucket=7&pack=...&minWords=&maxWords=&limit=
export async function GET(request: NextRequest) {
    try {
        await initListeningClipsTable();
        const sp = request.nextUrl.searchParams;

        if (sp.get('packs')) {
            return NextResponse.json({ success: true, packs: await listListeningPacks() });
        }

        if (sp.get('stats')) {
            return NextResponse.json({ success: true, stats: await getListeningStats() });
        }

        const have = sp.get('have');
        if (have) {
            const slugs = have.split(',').map(s => s.trim()).filter(Boolean).slice(0, 500);
            return NextResponse.json({ success: true, existing: await findExistingListeningSlugs(slugs) });
        }

        const num = (k: string) => (sp.get(k) === null ? undefined : Number(sp.get(k)));
        const clips = await getListeningClips({
            pack: sp.get('pack') || undefined,
            bucket: num('bucket'),
            minWords: num('minWords'),
            maxWords: num('maxWords'),
            limit: num('limit'),
        });
        return NextResponse.json({ success: true, clips });
    } catch (error) {
        console.error('listening-clips GET failed:', error);
        return NextResponse.json({ success: false, clips: [] }, { status: 500 });
    }
}
