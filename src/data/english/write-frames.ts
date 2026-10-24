// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/data/english/write-frames.ts
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
/**
 * WRITE FRAMES -- 集約。
 *
 * 30本の模範解答を1文残らず「役割ラベル + 型(X/Y/Zの穴)」に還元したもの。
 * 型に中身を代入すると原文に完全一致することを scripts/verify-write-frames.cjs が
 * 機械検査している。つまりこれは要約ではなく、原文と等価な分解。
 *
 * 覚えるのは型だけで、あとは単語を入れ替えるゲームになる。
 * 同じ型が何日で使い回されているかは FRAME_REUSE が数える。
 */

import type { EssayFrameDay, FrameRole } from './write-frames-types';
import { FRAMES_A } from './write-frames-a';
import { FRAMES_B } from './write-frames-b';
import { FRAMES_C } from './write-frames-c';
import { FRAMES_D } from './write-frames-d';
import { FRAMES_E } from './write-frames-e';
import { FRAMES_F } from './write-frames-f';

export const FRAME_DAYS: EssayFrameDay[] = [
    ...FRAMES_A, ...FRAMES_B, ...FRAMES_C, ...FRAMES_D, ...FRAMES_E, ...FRAMES_F,
].sort((a, b) => a.day - b.day);

export const FRAMES_BY_DAY: Record<number, EssayFrameDay> =
    Object.fromEntries(FRAME_DAYS.map((d) => [d.day, d]));

export const TOTAL_FRAMES = FRAME_DAYS.reduce((n, d) => n + d.frames.length, 0);

/** 役割ごとの本数。7つの役割で30日全部が塗れる = 型が普遍である証明 */
export const ROLE_COUNT: Record<FrameRole, number> = (() => {
    const c = {} as Record<FrameRole, number>;
    for (const d of FRAME_DAYS) for (const f of d.frames) c[f.role] = (c[f.role] ?? 0) + 1;
    return c;
})();

/** 型の本文(穴のまま) -> 使われた day の一覧。1本の型が何日で働くか */
export const FRAME_REUSE: { frame: string; role: FrameRole; days: number[] }[] = (() => {
    const map = new Map<string, { frame: string; role: FrameRole; days: number[] }>();
    for (const d of FRAME_DAYS) {
        for (const f of d.frames) {
            const key = f.frame.toLowerCase().replace(/\s+/g, ' ').trim();
            const hit = map.get(key);
            if (hit) { if (!hit.days.includes(d.day)) hit.days.push(d.day); }
            else map.set(key, { frame: f.frame, role: f.role, days: [d.day] });
        }
    }
    return [...map.values()].sort((a, b) => b.days.length - a.days.length || a.frame.localeCompare(b.frame));
})();

/** 2日以上で使い回されている型 */
export const SHARED_FRAMES = FRAME_REUSE.filter((f) => f.days.length >= 2);

/** 型の総数(重複を除いた在庫) */
export const UNIQUE_FRAMES = FRAME_REUSE.length;
