/**
 * THEME 30 -- 集約。
 *
 * パッケージの全体像:
 *   MOVES (24)     eiken-moves.ts        磨き抜く言い回し。本当の暗記対象
 *   THEMES (30)    theme30-a..f          世界を30に割った担当区。全行にムーブタグ=覚える根拠
 *   COMBOS (5)     eiken-combos.ts       30に無いお題を在庫+新事実1つで組む実演
 *
 * 網羅の三重の根拠(画面はこれを表示する):
 *   1. owns   30テーマの担当宣言を並べると人間の世界が埋まる
 *   2. cards  各テーマ4枚 x 30 = 120枚の試験カード言い回しを吸収
 *   3. days   既存ライティング30本(write-eiken1.ts)を全テーマのどこかで素材化
 *
 * 検証: node scripts/verify-theme30.cjs (タグなし行ゼロ・欠番ゼロ・死にムーブゼロ)
 */

import type { Theme } from './eiken-theme30-types';
import { MOVES } from './eiken-moves';
import { THEMES_A } from './eiken-theme30-a';
import { THEMES_B } from './eiken-theme30-b';
import { THEMES_C } from './eiken-theme30-c';
import { THEMES_D } from './eiken-theme30-d';
import { THEMES_E } from './eiken-theme30-e';
import { THEMES_F } from './eiken-theme30-f';

export const THEMES: Theme[] = [
    ...THEMES_A, ...THEMES_B, ...THEMES_C, ...THEMES_D, ...THEMES_E, ...THEMES_F,
].sort((a, b) => a.no - b.no);

export const THEME_BY_NO: Record<number, Theme> =
    Object.fromEntries(THEMES.map((t) => [t.no, t]));

export const THEME_BY_ID: Record<string, Theme> =
    Object.fromEntries(THEMES.map((t) => [t.id, t]));

/** テーマの全行(origin/yes/no/deeper)を平らに並べる */
export function allLines(t: Theme) {
    return [
        ...t.origin.lines,
        ...t.yes.lines,
        ...t.no.lines,
        ...t.deeper.flatMap((d) => d.a),
    ];
}

/** ムーブID -> 全30テーマでの使用回数。「1本覚えると何回働くか」の根拠 */
export const MOVE_USAGE: Record<string, number> = (() => {
    const usage: Record<string, number> = Object.fromEntries(MOVES.map((m) => [m.id, 0]));
    for (const t of THEMES) {
        for (const line of allLines(t)) {
            for (const id of line.m) if (id in usage) usage[id]++;
        }
        for (const id of t.joke.m) if (id in usage) usage[id]++;
    }
    return usage;
})();

/** 吸収したカード総数(120が目標)。網羅の実体 */
export const TOTAL_CARDS = THEMES.reduce((n, t) => n + t.cards.length, 0);

/** 素材化した既存ライティングの回。30/30 が目標 */
export const DAYS_ABSORBED: number[] = (() => {
    const s = new Set<number>();
    for (const t of THEMES) {
        for (const d of t.sourceDays) if (d >= 1 && d <= 30) s.add(d);
        if (t.origin.day >= 1 && t.origin.day <= 30) s.add(t.origin.day);
    }
    return [...s].sort((a, b) => a - b);
})();

/** 参照切れ検出: 存在しないムーブIDを指す行(0件が正常) */
export function findBadMoveRefs(): { theme: number; en: string; id: string }[] {
    const valid = new Set(MOVES.map((m) => m.id));
    const bad: { theme: number; en: string; id: string }[] = [];
    for (const t of THEMES) {
        for (const line of allLines(t)) {
            for (const id of line.m) {
                if (!valid.has(id)) bad.push({ theme: t.no, en: line.en.slice(0, 40), id });
            }
        }
    }
    return bad;
}
