// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/data/english/write-eiken1-counter.ts
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
/**
 * WRITE COUNTER -- 集約。ライトパス30本の逆の立場。
 *
 * 表(write-eiken1.ts)は全トピック片側だけで書かれている。裏はその反対側を、
 * 同じ普遍フレーム(write-eiken1-toolkit.ts の型)を使い回して書いたもの。
 * 同じ型に別の単語を入れると逆の意見が出てくる = 型が普遍である証明。
 *
 * 検証: node scripts/verify-write-counter.cjs
 * (5段落 / 190-250語 / 表と同じ stance でない / toolkit の型が4本以上ヒット)
 */

import type { CounterEssayDay } from './write-counter-types';
import { COUNTER_A } from './write-eiken1-counter-a';
import { COUNTER_B } from './write-eiken1-counter-b';
import { COUNTER_C } from './write-eiken1-counter-c';
import { COUNTER_D } from './write-eiken1-counter-d';
import { COUNTER_E } from './write-eiken1-counter-e';

export const COUNTER_ESSAYS: CounterEssayDay[] = [
    ...COUNTER_A, ...COUNTER_B, ...COUNTER_C, ...COUNTER_D, ...COUNTER_E,
].sort((a, b) => a.day - b.day);

export const COUNTER_BY_DAY: Record<number, CounterEssayDay> =
    Object.fromEntries(COUNTER_ESSAYS.map((c) => [c.day, c]));

export function getCounterForDay(day: number): CounterEssayDay | null {
    return COUNTER_BY_DAY[day] ?? null;
}
