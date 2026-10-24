// Grown-Up 1000: 教科書じゃ教えてくれない、できる大人の英語1000
// Native 1000 (スラング/Z世代寄り) の続編。スラングを使わず、
// 句動詞・コロケーション・大人の気配り・仕事の段取り・描写・場面定番を
// ミックスした「年齢不問で一生使える会話の土台」。
// 10 expressions/day, starting 2026-07-02 (Native 1000 終了の翌日)
// Day 1-91 = 7/2〜9/30、Day 92-122 = 10月ぶん、Day 123-152 = 11月ぶん。以後も月単位で足していく。

import { BATCH_001 } from './batch-001';
import { BATCH_002 } from './batch-002';
import { BATCH_003 } from './batch-003';
import { BATCH_004 } from './batch-004';
import { BATCH_005 } from './batch-005';
import { BATCH_006 } from './batch-006';
import { BATCH_007 } from './batch-007';
import { BATCH_008 } from './batch-008';
import { BATCH_009 } from './batch-009';
import { BATCH_010 } from './batch-010';
import { BATCH_011 } from './batch-011';
import { BATCH_012 } from './batch-012';
import { BATCH_013 } from './batch-013';
import { BATCH_014 } from './batch-014';
import { BATCH_015 } from './batch-015';
import { BATCH_016 } from './batch-016';

export interface GrownEntry {
    id: string;
    expression: string;
    meaning: string;
    level: 1 | 2 | 3;
    category: GrownCategory;
    why: string;
    example: {
        a: string;
        b: string;
    };
    note?: string;
}

export type GrownCategory =
    | 'phrasal'      // 句動詞
    | 'collocation'  // 自然な語の組み合わせ
    | 'diplomacy'    // 大人の気配り・やわらげ
    | 'work'         // 仕事・段取り
    | 'describe'     // 描写・言い回し
    | 'situational'; // 場面の定番

export const CATEGORY_META: Record<GrownCategory, {
    label: string;
    labelEn: string;
    color: string;
    bg: string;
}> = {
    phrasal:     { label: '句動詞', labelEn: 'Phrasal', color: '#2563EB', bg: '#EFF6FF' },
    collocation: { label: '組み合わせ', labelEn: 'Collocation', color: '#7C3AED', bg: '#F5F3FF' },
    diplomacy:   { label: '大人の気配り', labelEn: 'Diplomacy', color: '#DB2777', bg: '#FDF2F8' },
    work:        { label: '仕事・段取り', labelEn: 'Work', color: '#0D9488', bg: '#F0FDFA' },
    describe:    { label: '描写・言い回し', labelEn: 'Describe', color: '#D97706', bg: '#FFFBEB' },
    situational: { label: '場面の定番', labelEn: 'Situational', color: '#DC2626', bg: '#FEF2F2' },
};

export const LEVEL_META: Record<1 | 2 | 3, { label: string; labelEn: string; color: string; bg: string }> = {
    1: { label: '日常必須', labelEn: 'Daily', color: '#16A34A', bg: '#F0FDF4' },
    2: { label: 'ナチュラル', labelEn: 'Natural', color: '#D97706', bg: '#FFFBEB' },
    3: { label: '上級会話', labelEn: 'Advanced', color: '#DC2626', bg: '#FEF2F2' },
};

export const GROWN_1000: GrownEntry[] = [
    ...BATCH_001,
    ...BATCH_002,
    ...BATCH_003,
    ...BATCH_004,
    ...BATCH_005,
    ...BATCH_006,
    ...BATCH_007,
    ...BATCH_008,
    ...BATCH_009,
    ...BATCH_010,
    ...BATCH_011,
    ...BATCH_012,
    ...BATCH_013,
    ...BATCH_014,
    ...BATCH_015,
    ...BATCH_016,
];

export const TOTAL_DAYS = 152;
export const START_DATE = new Date(2026, 6, 2); // July 2, 2026 (Native 1000 終了の翌日)

export function getEntriesForDay(dayNum: number): GrownEntry[] {
    const start = (dayNum - 1) * 10;
    return GROWN_1000.slice(start, start + 10);
}

export function getCategoryStats(): Record<GrownCategory, number> {
    const stats = { phrasal: 0, collocation: 0, diplomacy: 0, work: 0, describe: 0, situational: 0 };
    for (const e of GROWN_1000) stats[e.category]++;
    return stats;
}

export function getLevelStats(): Record<1 | 2 | 3, number> {
    const stats = { 1: 0, 2: 0, 3: 0 };
    for (const e of GROWN_1000) stats[e.level]++;
    return stats;
}
