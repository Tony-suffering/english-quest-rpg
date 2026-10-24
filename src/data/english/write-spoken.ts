// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/data/english/write-spoken.ts
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
/**
 * WRITE SPOKEN -- 集約。ライトパス30本の口語版(2次スピーキング用)。
 *
 * 同じお題・同じ立場を、書く形と喋る形の両方で持つ。1次と2次が同じ在庫で回る。
 * 論文体を短いSVO・反復・丸めた数字に置き換えたもので、原文の丸写しは禁止。
 *
 * 検証: node scripts/verify-write-spoken.cjs
 * (200-280語 / 平均文長16以下 / 論文語ゼロ / g-droppingゼロ / 表の文の流用ゼロ)
 */

import type { SpokenEssayDay } from './write-spoken-types';
import { SPOKEN_A } from './write-spoken-a';
import { SPOKEN_B } from './write-spoken-b';
import { SPOKEN_C } from './write-spoken-c';
import { SPOKEN_D } from './write-spoken-d';
import { SPOKEN_E } from './write-spoken-e';

export const SPOKEN_ESSAYS: SpokenEssayDay[] = [
    ...SPOKEN_A, ...SPOKEN_B, ...SPOKEN_C, ...SPOKEN_D, ...SPOKEN_E,
].sort((a, b) => a.day - b.day);

export const SPOKEN_BY_DAY: Record<number, SpokenEssayDay> =
    Object.fromEntries(SPOKEN_ESSAYS.map((s) => [s.day, s]));

export function getSpokenForDay(day: number): SpokenEssayDay | null {
    return SPOKEN_BY_DAY[day] ?? null;
}
