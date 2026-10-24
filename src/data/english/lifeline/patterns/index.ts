/**
 * THE PATTERN SPINE — 集約と進捗
 *
 * ■ この教材の進捗はここで測る
 * 「何文集めたか」ではなく **「何個の型が、何場面で発火したか」**。
 * 文は無限に足せてしまうので指標にならない。型は有限なので終わりが定義できる。
 *
 * ■ 目標
 *   型   約1,200(会話を回すのに要る構文の見積もり)
 *   充填 数万(lifeline/bank/。型のスロットに入る語彙と定型連鎖)
 *
 * ■ 型を足すときの規則
 *   1. trigger(いつ撃つか)が書けない型は入れない。frame だけの型は産出に効かない
 *   2. examples は最低3。実例は bank(層3)から引く。作文しない
 *   3. stations は最低1。物語のどこで発火するかを必ず結ぶ。宙に浮いた型を作らない
 *   4. 同じ意味でも frame が違えば別の型。逆に frame が同じなら1つにまとめる
 */

import type { Pattern, PatternFn, PatternFreq } from './types';
import { CORE_01 } from './core-01';
import { CORE_02 } from './core-02';
import { CORE_03 } from './core-03';

export type { Pattern, PatternFn, PatternFreq };

export const PATTERNS: Pattern[] = [...CORE_01, ...CORE_02, ...CORE_03];

/** 会話を回すのに要る型の見積もり。ここに到達したら層1は完成 */
export const PATTERN_GOAL = 1200;

export const FN_LABEL: Record<PatternFn, string> = {
    request: '頼む', offer: '申し出る', refuse: '断る', confirm: '確認する',
    opine: '意見を出す', disagree: '反対する', hedge: 'ぼかす', intensify: '強める',
    narrate: '語る', evaluate: '評価する', manage: '会話を運ぶ', commit: '引き受ける',
    quantify: '量と時間', suppose: '仮定する',
};

export function patternsByFn(fn: PatternFn): Pattern[] {
    return PATTERNS.filter(p => p.fn === fn);
}

export function patternsAtStation(stationEn: string): Pattern[] {
    return PATTERNS.filter(p => p.stations.includes(stationEn));
}

export interface PatternProgress {
    total: number;
    goal: number;
    pct: number;
    /** 型が1つ以上結びついている窓口の数 */
    stationsWired: number;
    /** 平均発火場面数。1に近いほど「宙に浮いた型」が多い */
    avgStationsPerPattern: number;
    byFn: Array<{ fn: PatternFn; label: string; count: number }>;
    byFreq: Record<PatternFreq, number>;
}

export function patternProgress(): PatternProgress {
    const stations = new Set(PATTERNS.flatMap(p => p.stations));
    const totalLinks = PATTERNS.reduce((n, p) => n + p.stations.length, 0);
    const byFreq = { core: 0, common: 0, edge: 0 } as Record<PatternFreq, number>;
    for (const p of PATTERNS) byFreq[p.freq]++;
    return {
        total: PATTERNS.length,
        goal: PATTERN_GOAL,
        pct: Math.round((PATTERNS.length / PATTERN_GOAL) * 1000) / 10,
        stationsWired: stations.size,
        avgStationsPerPattern: Math.round((totalLinks / PATTERNS.length) * 10) / 10,
        byFn: (Object.keys(FN_LABEL) as PatternFn[])
            .map(fn => ({ fn, label: FN_LABEL[fn], count: patternsByFn(fn).length }))
            .filter(x => x.count > 0),
    };
}

/**
 * stations に書いた窓口名が実在するかの検査。
 * 型と物語が切れていないことを保証する。壊れたら開発時に気づけるようにしておく。
 */
export function unknownStationRefs(validStationNames: string[]): string[] {
    const valid = new Set(validStationNames);
    const bad = new Set<string>();
    for (const p of PATTERNS) for (const s of p.stations) if (!valid.has(s)) bad.add(s);
    return [...bad].sort();
}
