/**
 * Silent Bartender — Night-count milestones.
 *
 * Defines major anniversary beats keyed by total nights played.
 * Each milestone carries a short title + body shown on the night it fires.
 *
 * Integration note:
 *   - `getActiveMilestone(stats)` returns the milestone whose `nights` exactly
 *     matches `stats.totalNights` (fires once, on that specific night).
 *   - `getPastMilestones(stats)` returns all milestones the player has crossed,
 *     useful for retro lists / journal pages.
 *
 * Light theme. Japanese prose. No emoji.
 */

import type { PlayerStats } from '@/lib/english/bar/storage';

// ───────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────

export interface Milestone {
    /** The exact totalNights count on which this milestone fires. */
    nights: number;
    /** Short Japanese title. */
    title: string;
    /** 1-2 line body shown on the milestone overlay. */
    body: string;
    /** Visual weight. 'small' = subtle, 'big' = celebratory, 'legendary' = rare. */
    tier: 'small' | 'big' | 'legendary';
}

// ───────────────────────────────────────────────────────────
// Milestone table
// ───────────────────────────────────────────────────────────

export const MILESTONES: Milestone[] = [
    {
        nights: 7,
        title: '一週間の終わり',
        body: '七日。カウンターの木目が、少しだけ手に馴染んできた。それだけのことだ。',
        tier: 'small',
    },
    {
        nights: 30,
        title: '一月',
        body: 'ひと月が過ぎた。氷の砕き方が、先月の自分より静かになっている。マスターは奥で、何も言わない。',
        tier: 'small',
    },
    {
        nights: 77,
        title: '七十七夜',
        body: 'カウンターに一枚の葉書が置かれていた。消印は地方の町。「七十七夜、よくやった。だが俺の席はまだだ」と、いつもの筆跡で書いてある。',
        tier: 'big',
    },
    {
        nights: 100,
        title: '百夜',
        body: '百夜目。暖簾を上げた瞬間、誰かが小さく拍手をしたような気がした。気のせいだと思ったが、今夜の客はいつもと少し違うかもしれない。',
        tier: 'big',
    },
    {
        nights: 200,
        title: '二百夜',
        body: '二百夜。祝う相手はいない。カウンターを拭き、氷を砕き、暖簾を出す。この繰り返しが、自分の形になっている。',
        tier: 'small',
    },
    {
        nights: 365,
        title: '一年',
        body: '一年が経った。扉が開く音がして、見覚えのある影がカウンターの奥に座った。マスターは何も言わずに、お前の肩を一度だけ叩いて、また奥に戻っていった。',
        tier: 'legendary',
    },
    {
        nights: 500,
        title: '五百夜',
        body: '五百夜。この店は、もうマスターの店というより、お前の店かもしれない。そのことを、まだ誰にも言っていない。',
        tier: 'big',
    },
    {
        nights: 777,
        title: 'ラッキーセブン',
        body: '七百七十七夜。数字の並びに意味はない、はずだ。だが今夜だけは、氷が普段より綺麗に割れる気がした。',
        tier: 'big',
    },
    {
        nights: 1000,
        title: '千夜',
        body: '千夜。この数字を達成した人間が、この店の歴史にいたかどうかは誰も知らない。マスターは奥で、静かに笑っていた。',
        tier: 'legendary',
    },
];

// ───────────────────────────────────────────────────────────
// Lookups
// ───────────────────────────────────────────────────────────

/**
 * Returns the milestone that fires on this exact night, or null.
 * Uses `stats.totalNights` as the source of truth (post-increment value for
 * the night just completed).
 */
export function getActiveMilestone(stats: PlayerStats): Milestone | null {
    const n = stats.totalNights;
    return MILESTONES.find((m) => m.nights === n) ?? null;
}

/**
 * Returns every milestone the player has already reached (nights <= totalNights).
 * Sorted ascending by night count.
 */
export function getPastMilestones(stats: PlayerStats): Milestone[] {
    const n = stats.totalNights;
    return MILESTONES.filter((m) => m.nights <= n).sort(
        (a, b) => a.nights - b.nights,
    );
}
