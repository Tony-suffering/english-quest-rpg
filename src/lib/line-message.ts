import { MASTER_EXPRESSIONS, type MasterExpression } from '@/data/english/365/master-expressions';
import { SKIT_NODES, ENTRY_NODE_IDS, SKIT_NODE_MAP } from '@/data/bot/skits';
import { CHARACTER_LABEL, type BotNode, type BotCharacter } from '@/data/bot/types';

const CHARACTER_LABELS: Record<MasterExpression['character'], string> = {
    yuki: 'ユキ',
    master: '権藤',
    takeshi: 'タケシ',
    lisa: 'リサ',
    kenji: '健二',
    mina: 'ミナ',
};

const SKIT_AVATAR_BASE = 'https://www.toniolab.com/characters';
const AVATAR_FILE: Record<BotCharacter, string> = {
    gondo: 'master.webp',
    yuki: 'yuki.webp',
    takeshi: 'takeshi.webp',
    lisa: 'lisa.webp',
    kenji: 'kenji.webp',
    mina: 'mina.webp',
    system: 'master.webp',
};

const MORNING_OPENERS = [
    'おはよう。',
    'おはよう。今日もやろう。',
    'おはよう。寝起きの一発。',
    'おはよう。一個だけ覚えて出勤しろ。',
    '朝だ。一個入れとけ。',
    'おはよう。今日のやつ。',
];

function dateSeed(dateStr: string): number {
    let h = 0;
    for (let i = 0; i < dateStr.length; i++) h = (h * 31 + dateStr.charCodeAt(i)) >>> 0;
    return h;
}

export function pickExpressionForDate(dateStr: string): MasterExpression {
    const seed = dateSeed(dateStr);
    return MASTER_EXPRESSIONS[seed % MASTER_EXPRESSIONS.length];
}

export function pickOpenerForDate(dateStr: string): string {
    const seed = dateSeed(dateStr);
    return MORNING_OPENERS[seed % MORNING_OPENERS.length];
}

export function buildDailyMessage(dateStr: string, friendKaiwaUrl: string): string {
    const expr = pickExpressionForDate(dateStr);
    const opener = pickOpenerForDate(dateStr);
    const charName = CHARACTER_LABELS[expr.character];
    const sceneEn = expr.english[2];
    const sceneJa = expr.jaTranslations?.[2] ?? expr.japanese;

    return [
        opener,
        '今日のひと言。',
        '',
        `「${sceneEn}」`,
        `-- ${sceneJa}`,
        '',
        `${charName}「${expr.japanese}」`,
        '',
        `→ 続きはアプリで: ${friendKaiwaUrl}`,
    ].join('\n');
}

export function todayJstString(now: Date = new Date()): string {
    const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    return jst.toISOString().slice(0, 10);
}

// === Evening skit (Flex Message with character avatar) ===

export function pickSkitForDate(dateStr: string): BotNode {
    const seed = dateSeed(dateStr);
    const id = ENTRY_NODE_IDS[seed % ENTRY_NODE_IDS.length];
    return SKIT_NODE_MAP.get(id)!;
}

export function buildSkitFlexMessage(node: BotNode): object {
    const charLabel = CHARACTER_LABEL[node.character] || '';
    const avatarFile = AVATAR_FILE[node.character];
    const avatarUrl = `${SKIT_AVATAR_BASE}/${avatarFile}`;
    const body = node.lines.join('\n');
    const altText = `${charLabel}「${node.lines[0].slice(0, 40)}…」`;

    return {
        type: 'flex',
        altText,
        contents: {
            type: 'bubble',
            size: 'kilo',
            hero: {
                type: 'image',
                url: avatarUrl,
                size: 'full',
                aspectRatio: '1:1',
                aspectMode: 'cover',
            },
            body: {
                type: 'box',
                layout: 'vertical',
                spacing: 'md',
                contents: [
                    {
                        type: 'text',
                        text: charLabel,
                        weight: 'bold',
                        size: 'md',
                        color: '#252423',
                    },
                    {
                        type: 'text',
                        text: body,
                        wrap: true,
                        size: 'sm',
                        color: '#444444',
                    },
                ],
            },
        },
    };
}
