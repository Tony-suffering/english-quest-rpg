import { NextResponse } from 'next/server';
import { initConsultTable, addConsultRequest, listConsultRequests } from '@/lib/d1';

/**
 * 相談が1件届いたら、自分の LINE に押す。
 * 届いたことに気づけないと、この窓口は「返さない窓口」になる。それが一番まずい。
 * 鍵(CONSULT_ADMIN_KEY)は本文に載せない。受信箱側が一度入れた鍵を覚える。
 * 通知に失敗しても保存は済んでいるので、送信者にはエラーを返さない。
 */
async function notifyLine(input: { id: string; name: string; contact: string; charCount: number; filled: number; goal: string }) {
    const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    const userId = process.env.LINE_TEST_USER_ID;
    if (!token || !userId) return;

    const goal = input.goal.replace(/\s+/g, ' ').slice(0, 60);
    const text = [
        '英語相談がきた',
        '',
        `呼び名: ${input.name}`,
        `連絡先: ${input.contact}`,
        `量: ${input.charCount}字 / 15問中 ${input.filled}問`,
        goal ? `やりたいこと: ${goal}` : '',
        '',
        'https://iwasaki-naisou.com/english/consult/inbox',
    ].filter(Boolean).join('\n');

    try {
        await fetch('https://api.line.me/v2/bot/message/push', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ to: userId, messages: [{ type: 'text', text }] }),
        });
    } catch {
        // 通知が落ちても回答は D1 に入っている。受信箱を開けば読める
    }
}

function makeId() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 10; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
}

// GET /api/consult?init=true  -- テーブル作成
// GET /api/consult?key=XXX    -- 一覧 (CONSULT_ADMIN_KEY と一致したときだけ)
// 回答には連絡先が入る。鍵が未設定なら一覧は返さない
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        if (url.searchParams.get('init') === 'true') {
            await initConsultTable();
            return NextResponse.json({ success: true, message: 'Table ready' });
        }
        const adminKey = process.env.CONSULT_ADMIN_KEY;
        if (!adminKey || url.searchParams.get('key') !== adminKey) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }
        const requests = await listConsultRequests();
        return NextResponse.json({ success: true, requests });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const name = String(body?.name || '').trim();
        const contact = String(body?.contact || '').trim();
        const answers = body?.answers && typeof body.answers === 'object' ? body.answers as Record<string, string> : null;

        if (!name || !contact || !answers) {
            return NextResponse.json({ success: false, error: '名前・連絡先・回答は必須です' }, { status: 400 });
        }
        const filled = Object.values(answers).filter(v => String(v).trim().length > 0).length;
        if (filled < 3) {
            return NextResponse.json({ success: false, error: '3問以上答えてください' }, { status: 400 });
        }

        await initConsultTable();
        const saved = await addConsultRequest({ id: makeId(), name, contact, answers });
        await notifyLine({
            id: saved.id, name, contact,
            charCount: saved.char_count, filled,
            goal: String(answers.goal || '').trim(),
        });
        return NextResponse.json({ success: true, id: saved.id, charCount: saved.char_count });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
