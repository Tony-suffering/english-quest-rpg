import { NextResponse } from 'next/server';
import { getAllGorokuLog, addGorokuLog, deleteGorokuLog } from '@/lib/d1';
import { gorokuLog } from '@/data/english/goroku-log';
import { nanoid } from 'nanoid';

/**
 * 会話語録 API。
 *
 * 既存の /api/goroku (7本柱カリキュラム 631件) とは別系統。
 * こちらは会話のたびに拾った表現だけを積む。混ぜない理由は d1.ts の注記を参照。
 *
 * GET  一覧 (D1が空なら goroku-log.ts の既存セッションを種として返す)
 * POST 追加 { date, source?, ja, pattern?, english, note?, category? }
 * DELETE 削除 { id }
 */

/**
 * TS 側に既にある会話ログ (goroku-log.ts) を、行の形に伸ばす。
 *
 * D1 と「どちらか片方」にすると、1件でも登録した瞬間に既存の6件が画面から消える。
 * 常に併合して返し、TS 由来は seed:true にして UI 側で削除させない。
 */
function seedRows() {
    return gorokuLog.flatMap(s =>
        s.entries.map((e, i) => ({
            id: `seed-${s.date}-${i}`,
            date: s.date,
            source: s.source,
            ja: e.ja,
            pattern: e.pattern,
            english: e.english,
            note: e.note || '',
            category: 'opinion',
            created_at: s.date,
            seed: true,
        })),
    );
}

export async function GET() {
    try {
        const rows = await getAllGorokuLog();
        // 同じ日本語が D1 にも入っていたら、後から編集できる D1 側を優先する
        const inD1 = new Set(rows.map(r => (r.ja || '').trim()));
        const merged = [
            ...rows,
            ...seedRows().filter(s => !inD1.has(s.ja.trim())),
        ].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        return NextResponse.json({ entries: merged, stored: rows.length, success: true });
    } catch (error) {
        console.error('goroku-log GET failed:', error);
        // D1 が落ちていても、TS 側の既存ログだけは見せる
        return NextResponse.json({ entries: seedRows(), stored: 0, degraded: true, success: true });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { date, ja, english } = body as { date?: string; ja?: string; english?: string };
        if (!date || !ja || !english) {
            return NextResponse.json(
                { error: 'date, ja, english are required', success: false },
                { status: 400 },
            );
        }
        const entry = await addGorokuLog({
            id: `gl${nanoid(8)}`,
            date,
            source: body.source,
            ja,
            pattern: body.pattern,
            english,
            note: body.note,
            category: body.category,
        });
        return NextResponse.json({ entry, success: true }, { status: 201 });
    } catch (error) {
        console.error('goroku-log POST failed:', error);
        return NextResponse.json({ error: 'Failed to add', success: false }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        if (!id) return NextResponse.json({ error: 'id is required', success: false }, { status: 400 });
        await deleteGorokuLog(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('goroku-log DELETE failed:', error);
        return NextResponse.json({ error: 'Failed to delete', success: false }, { status: 500 });
    }
}
