import { NextResponse } from 'next/server';
import crypto from 'crypto';
import {
    findNode,
    pickEntryFromText,
    pickRandomEntry,
    nodeToLineMessage,
    parsePostback,
} from '@/lib/bot-engine';
import { CHARACTER_LABEL } from '@/data/bot/types';

export const runtime = 'nodejs';

const LINE_REPLY_ENDPOINT = 'https://api.line.me/v2/bot/message/reply';

interface LineEvent {
    type: string;
    replyToken?: string;
    source?: { type: string; userId?: string };
    message?: { type: string; text?: string };
    postback?: { data: string };
}

function verifySignature(rawBody: string, signature: string | null, secret: string): boolean {
    if (!signature) return false;
    const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('base64');
    return signature === expected;
}

async function reply(replyToken: string, messages: object[], token: string) {
    const res = await fetch(LINE_REPLY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ replyToken, messages }),
    });
    if (!res.ok) {
        const body = await res.text();
        console.error('LINE reply failed', res.status, body);
    }
}

export async function POST(request: Request) {
    const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    const secret = process.env.LINE_CHANNEL_SECRET;
    if (!token || !secret) {
        return NextResponse.json({ success: false, error: 'LINE env not configured' }, { status: 500 });
    }

    const rawBody = await request.text();
    const signature = request.headers.get('x-line-signature');
    if (!verifySignature(rawBody, signature, secret)) {
        return NextResponse.json({ success: false, error: 'invalid signature' }, { status: 401 });
    }

    let body: { events?: LineEvent[] };
    try {
        body = JSON.parse(rawBody);
    } catch {
        return NextResponse.json({ success: false, error: 'invalid json' }, { status: 400 });
    }

    const events = body.events ?? [];

    await Promise.all(
        events.map(async ev => {
            if (!ev.replyToken) return;

            // friend追加 / 復活: 唐突に1ネタ振る (welcome画面なし)
            if (ev.type === 'follow') {
                const greet = {
                    type: 'text',
                    text: 'よう。居酒屋だ。\n座れ。何か喋るやつが来る。',
                };
                const skit = pickRandomEntry(ev.source?.userId || 'anon');
                await reply(ev.replyToken, [greet, nodeToLineMessage(skit)], token);
                return;
            }

            // ボタンタップ
            if (ev.type === 'postback' && ev.postback?.data) {
                const { nextNodeId } = parsePostback(ev.postback.data);
                if (nextNodeId === 'random') {
                    const node = pickRandomEntry(`${ev.source?.userId}-${Date.now()}`);
                    await reply(ev.replyToken, [nodeToLineMessage(node)], token);
                    return;
                }
                const node = nextNodeId ? findNode(nextNodeId) : null;
                if (node) {
                    await reply(ev.replyToken, [nodeToLineMessage(node)], token);
                } else {
                    await reply(
                        ev.replyToken,
                        [nodeToLineMessage(findNode('fallback-1')!)],
                        token,
                    );
                }
                return;
            }

            // テキスト: キーワード→entry。マッチしなかったら fallback
            if (ev.type === 'message' && ev.message?.type === 'text' && ev.message.text) {
                const node = pickEntryFromText(ev.message.text);
                await reply(ev.replyToken, [nodeToLineMessage(node)], token);
                return;
            }
        }),
    );

    return NextResponse.json({ success: true });
}
