/**
 * とにお教材 — 読者側の積み上げエンジン。
 *
 * 芸指数(tonio-league)が「俺の失敗の相場」で毎晩乱高下するのに対し、
 * こちらは「読者が持ち帰れる表現の資産」= 絶対に減らない単調増加のカーブ。
 * 彼は上手くならない。だが読者は、夜を追うごとに確実に上手くなる。
 * それがこの番組を教材に変える唯一の軸。
 *
 * データ源は dmm-show.ts の実データのみ(捏造ゼロ):
 *  - takeaways = その夜の「持ち帰り英語」= 教材の本体
 *  - gags[].correct = 崩れた発話の正解形 = 対比で覚える素材
 *  - bestPlay = その夜の到達点 = 章の代表例文
 */

import { showEpisodes, type ShowEpisode } from './dmm-show';
import { STORY_ARCS } from './tonio-league';

// ============ 型 ============

export type LexKind = 'idiom' | 'phrasal' | 'word' | 'phrase';

/** 難易度(目安)。初心者が「自分が今日使える分」を取り出せるようにするためのもの。 */
export type LexLevel = 'basic' | 'mid' | 'hard';

export interface LexItem {
    en: string;
    ja: string;
    note: string;
    night: number;
    date: string;
    kind: LexKind;
    level: LexLevel;
    arcNo: number;      // 何章で手に入るか
}

// ============ 分類(表層特徴のみ。無理な意味推定はしない) ============

const PHRASAL_VERBS = /\b(up|down|off|out|in|into|over|through|around|away|back|on|apart|aside)\b\s*$/i;
const KNOWN_PARTICLES = /\b(up|down|off|out|into|over|through|around|away|back|apart)\b/i;

// 主語(代名詞)始まりの完全文は、短くても「例文」扱いにする。
const SENTENCE_HEAD = /^(I|You|We|He|She|It|They|That|This|There)\b['’]?/i;

function classify(en: string): LexKind {
    const s = en.trim();
    const words = s.split(/\s+/);
    // 文(終止符 / 長い / 主語始まり)= 例文
    if (/[.!?]$/.test(s) || words.length >= 7) return 'phrase';
    if (words.length >= 3 && SENTENCE_HEAD.test(s)) return 'phrase';
    if (words.length === 1) return 'word';
    // 句動詞: 2-3語で副詞的小辞を含む
    if (words.length <= 3 && (PHRASAL_VERBS.test(s) || KNOWN_PARTICLES.test(s))) return 'phrasal';
    // それ以外の複数語 = イディオム/連語
    if (words.length >= 2) return 'idiom';
    return 'word';
}

export const KIND_LABEL: Record<LexKind, string> = {
    idiom: 'イディオム',
    phrasal: '句動詞',
    word: '単語',
    phrase: '例文・決まり文句',
};

export const LEVEL_LABEL: Record<LexLevel, string> = {
    basic: '初級',
    mid: '中級',
    hard: '上級',
};

// ラテン語系の抽象名詞・形容詞語尾。難語の目印になる。
const LATINATE = /(tion|sion|ity|ment|ous|ate|ism|ance|ence|able|ible|ive|ical)\b/i;

/**
 * 難易度の目安。厳密なCEFR判定ではなく「初心者が今日使えるか」の一次選別。
 *  - 長い語(9文字以上)やラテン語系語尾を含む → 上級
 *  - 3語以内で難語なし → 初級
 *  - それ以外 → 中級
 */
function levelOf(en: string): LexLevel {
    const s = en.trim();
    const words = s.split(/\s+/);
    const hasLongWord = /\b[A-Za-z]{9,}\b/.test(s);
    const hasLatinate = words.some((w) => w.length >= 7 && LATINATE.test(w));
    if (hasLongWord || hasLatinate) return 'hard';
    if (words.length <= 3) return 'basic';
    if (words.length <= 6) return 'mid';
    return 'hard';
}

function arcOf(night: number): number {
    const arc = STORY_ARCS.find((a) => night >= a.nights[0] && night <= a.nights[1]);
    return arc ? arc.no : STORY_ARCS.length;
}

// ============ 抽出 ============

let _cache: LexItem[] | null = null;

/** 全夜の持ち帰り表現を、夜順に並べた教材リスト。重複(同一英文)は初出のみ残す。 */
export function getLexicon(): LexItem[] {
    if (_cache) return _cache;
    const seen = new Set<string>();
    const out: LexItem[] = [];
    const eps = [...showEpisodes].sort((a, b) => a.night - b.night);
    for (const ep of eps) {
        for (const t of ep.takeaways ?? []) {
            const en = String(t.en || '').trim();
            if (!en) continue;
            const key = en.toLowerCase();
            if (seen.has(key)) continue;   // 初出の夜に帰属させる
            seen.add(key);
            out.push({
                en,
                ja: String(t.ja || '').trim(),
                note: String(t.note || '').trim(),
                night: ep.night,
                date: ep.date,
                kind: classify(en),
                level: levelOf(en),
                arcNo: arcOf(ep.night),
            });
        }
    }
    _cache = out;
    return out;
}

/** 第N夜までに手に入る表現(=その時点の教材範囲)。 */
export function getLexiconUpTo(night: number): LexItem[] {
    return getLexicon().filter((x) => x.night <= night);
}

/** 難易度で絞る。初心者に「今日使える分」だけ渡すため。 */
export function getLexiconByLevel(level: LexLevel): LexItem[] {
    return getLexicon().filter((x) => x.level === level);
}

/** その夜に新しく手に入る表現。 */
export function getLexiconOf(night: number): LexItem[] {
    return getLexicon().filter((x) => x.night === night);
}

// ============ 積み上げカーブ(読者側の成長) ============

export interface GrowthPoint {
    night: number;
    gained: number;   // その夜の新規
    total: number;    // 累計(単調増加)
}

/** 読者の語彙資産カーブ。芸指数と違い、絶対に減らない。 */
export function getGrowthCurve(): GrowthPoint[] {
    const byNight = new Map<number, number>();
    for (const x of getLexicon()) byNight.set(x.night, (byNight.get(x.night) ?? 0) + 1);
    const nights = [...showEpisodes].map((e) => e.night).sort((a, b) => a - b);
    let total = 0;
    return nights.map((n) => {
        const gained = byNight.get(n) ?? 0;
        total += gained;
        return { night: n, gained, total };
    });
}

// ============ 章ごとの単元(=教材の目次) ============

export interface CurriculumUnit {
    arcNo: number;
    title: string;
    nights: [number, number];
    items: LexItem[];
    /** その章の代表例文(最後の夜の bestPlay)。章のゴール文。 */
    goal: { en: string; ja: string; night: number } | null;
}

export function getUnits(): CurriculumUnit[] {
    const lex = getLexicon();
    return STORY_ARCS.map((arc) => {
        const items = lex.filter((x) => x.arcNo === arc.no);
        const peak = showEpisodes.find((e) => e.night === arc.peakNight);
        return {
            arcNo: arc.no,
            title: arc.title,
            nights: arc.nights,
            items,
            goal: peak?.bestPlay
                ? { en: peak.bestPlay.en, ja: peak.bestPlay.ja, night: peak.night }
                : null,
        };
    });
}

// ============ 対比ドリル(崩れた実発話 → 正解) ============

export interface ContrastDrill {
    night: number;
    broken: string;   // 実際に口から出た崩れた形
    correct: string;  // 正解形
    point: string;    // なぜ崩れたか
    scene: string;
}

/** 「言えなかった形 vs 正解」の対比ドリル。教材として一番効く部分。 */
export function getDrills(upTo?: number): ContrastDrill[] {
    const eps = [...showEpisodes]
        .filter((e) => (upTo == null ? true : e.night <= upTo))
        .sort((a, b) => b.night - a.night);
    const out: ContrastDrill[] = [];
    for (const ep of eps) {
        for (const g of ep.gags ?? []) {
            if (!g.boke || !g.correct) continue;
            out.push({ night: ep.night, broken: g.boke, correct: g.correct, point: g.point || '', scene: g.scene || '' });
        }
    }
    return out;
}

// ============ サマリ ============

export function getCurriculumStats() {
    const lex = getLexicon();
    const curve = getGrowthCurve();
    const nights = curve.length;
    const byKind: Record<LexKind, number> = { idiom: 0, phrasal: 0, word: 0, phrase: 0 };
    for (const x of lex) byKind[x.kind]++;
    const byLevel: Record<LexLevel, number> = { basic: 0, mid: 0, hard: 0 };
    for (const x of lex) byLevel[x.level]++;
    return {
        total: lex.length,
        nights,
        perNight: nights ? Math.round((lex.length / nights) * 10) / 10 : 0,
        drills: getDrills().length,
        byKind,
        byLevel,
        latestNight: nights ? curve[curve.length - 1].night : 0,
    };
}

export type { ShowEpisode };
