import {
    SKIT_NODE_MAP,
    ENTRY_KEYWORDS,
    ENTRY_NODE_IDS,
    SKIT_NODES,
} from '@/data/bot/skits';
import { BotNode, CHARACTER_LABEL } from '@/data/bot/types';

export interface LineMessage {
    type: 'text';
    text: string;
    quickReply?: {
        items: {
            type: 'action';
            action: { type: 'postback'; label: string; data: string; displayText: string };
        }[];
    };
}

export function findNode(id: string): BotNode | undefined {
    return SKIT_NODE_MAP.get(id);
}

export function pickEntryFromText(text: string): BotNode {
    const trimmed = text.trim();
    for (const rule of ENTRY_KEYWORDS) {
        if (rule.keywords.some(re => re.test(trimmed))) {
            const node = SKIT_NODE_MAP.get(rule.entryNodeId);
            if (node) return node;
        }
    }
    // 何も match しなかったら fallback (権藤が酔ってる)
    return SKIT_NODE_MAP.get('fallback-1')!;
}

export function pickRandomEntry(seed?: string): BotNode {
    const hash = seed
        ? Array.from(seed).reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0)
        : Math.floor(Math.random() * 1e9);
    const id = ENTRY_NODE_IDS[hash % ENTRY_NODE_IDS.length];
    return SKIT_NODE_MAP.get(id)!;
}

export function nodeToLineMessage(node: BotNode): LineMessage {
    const charLabel = CHARACTER_LABEL[node.character];
    // 名前は先頭に1回だけ。lines は「...」で囲む。
    // character='system' の時は lines をそのまま (= 自分で「」付けたスクリプト想定)
    const body = charLabel
        ? [charLabel, ...node.lines.map(l => `「${l}」`)].join('\n')
        : node.lines.join('\n');

    const msg: LineMessage = { type: 'text', text: body };

    if (node.quickReplies && node.quickReplies.length > 0) {
        msg.quickReply = {
            items: node.quickReplies.slice(0, 13).map(qr => ({
                type: 'action',
                action: {
                    type: 'postback',
                    label: qr.label.slice(0, 20),
                    data: `next=${qr.nextNodeId}`,
                    displayText: qr.label.slice(0, 20),
                },
            })),
        };
    }

    return msg;
}

export function parsePostback(data: string): { nextNodeId: string | null } {
    const m = /^next=([a-zA-Z0-9_\-]+)$/.exec(data);
    if (!m) return { nextNodeId: null };
    return { nextNodeId: m[1] };
}

export const ALL_NODE_IDS = SKIT_NODES.map(n => n.id);
