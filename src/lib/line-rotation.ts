// LINE 7日ローテーション
// 朝7時 cron が日替わりで配信するテンプレを曜日にマッピング。
// claudedocs/line-7day-content-plan.md の決定をコード化したもの。
//
// 0=Sun, 1=Mon, ..., 6=Sat (JST 基準)

import { getTemplate } from '@/data/line-templates';

// ============================================================
// 曜日 → テンプレ id
// ============================================================
export const WEEKLY_ROTATION: Record<number, string> = {
    1: 'wanted-v2',          // 月: 警視庁指名手配
    2: 'syndromes',          // 火: 英会話症候群
    3: 'death-causes',       // 水: 5つの死因
    4: 'lies-five',          // 木: 英語の嘘
    5: 'insurance-five',     // 金: 英会話保険
    6: 'toeic-reality',      // 土: TOEIC × 現実
    0: 'motivation-zero',    // 日: やる気ゼロ診断 (note 138 reflect)
};

// ============================================================
// JST helpers
// ============================================================

// "YYYY-MM-DD" (JST) を 0=Sun..6=Sat に変換
function dowFromJstDateStr(jstDateStr: string): number {
    const [y, m, d] = jstDateStr.split('-').map(Number);
    if (!y || !m || !d) return -1;
    // JST 日付の 12:00 UTC で曜日判定 (TZ ずれ吸収)
    const utc = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
    return utc.getUTCDay();
}

// JST の今日を YYYY-MM-DD で取得
export function todayJstDateStr(): string {
    const fmt = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    const parts = fmt.formatToParts(new Date());
    const y = parts.find(p => p.type === 'year')?.value ?? '1970';
    const m = parts.find(p => p.type === 'month')?.value ?? '01';
    const d = parts.find(p => p.type === 'day')?.value ?? '01';
    return `${y}-${m}-${d}`;
}

// "YYYY-MM-DD" の翌日 (JST) を計算
function addDaysJst(jstDateStr: string, days: number): string {
    const [y, m, d] = jstDateStr.split('-').map(Number);
    const utc = new Date(Date.UTC(y, m - 1, d));
    utc.setUTCDate(utc.getUTCDate() + days);
    const yy = utc.getUTCFullYear();
    const mm = String(utc.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(utc.getUTCDate()).padStart(2, '0');
    return `${yy}-${mm}-${dd}`;
}

// ============================================================
// 公開 API
// ============================================================

export interface RotationEntry {
    id: string;
    label: string;
    // line-templates の messages は any[] 型なので踏襲
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: any[];
}

/**
 * 指定 JST 日付 (YYYY-MM-DD) のローテーション情報を返す。
 * 該当テンプレが存在しなければ null。
 */
export function getRotationForDate(jstDateStr: string): RotationEntry | null {
    const dow = dowFromJstDateStr(jstDateStr);
    if (dow < 0) return null;
    const id = WEEKLY_ROTATION[dow];
    if (!id) return null;
    const tpl = getTemplate(id);
    if (!tpl) return null;
    return {
        id: tpl.id,
        label: tpl.label,
        messages: tpl.messages,
    };
}

export interface NextDayEntry {
    date: string;
    dow: number;
    rotation: RotationEntry | null;
}

/**
 * 指定 JST 日付から数えて 7 日分 (起点日含む) を返す。
 */
export function getNext7Days(fromJstDate: string): NextDayEntry[] {
    const result: NextDayEntry[] = [];
    for (let i = 0; i < 7; i++) {
        const date = addDaysJst(fromJstDate, i);
        result.push({
            date,
            dow: dowFromJstDateStr(date),
            rotation: getRotationForDate(date),
        });
    }
    return result;
}
