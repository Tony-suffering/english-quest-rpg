import { MASTER_EXPRESSIONS, type MasterExpression } from '@/data/english/365/master-expressions';

const CHARACTER_LABELS: Record<MasterExpression['character'], string> = {
    yuki: 'ユキ',
    master: '権藤',
    takeshi: 'タケシ',
    lisa: 'リサ',
    kenji: '健二',
    mina: 'ミナ',
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
