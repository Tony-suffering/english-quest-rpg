/**
 * 今日の練習 — 復習エンジン(公開版)
 *
 * 何をするか
 *   - 日本語を見て英語を思い出す練習の「どのカードを今日出すか」を決める
 *   - 自己評価(すぐ言えた / 少し迷った / 出てこなかった)を受けて次に出す日を決める
 *   - 端末内(localStorage)にだけ保存する。サーバには何も送らない
 *
 * 間隔の決め方
 *   src/lib/srs-engine.ts と同じ Leitner 5箱 + SM-2 の ease を使う。
 *   ただし srs-engine は日付を UTC で切る(日本では朝9時に日が変わる)ので、
 *   ここでは端末のローカル日付で切る。箱の間隔(1/3/7/14/30日)は types/review.ts から読む。
 *
 * 保存キー(すべて tonio-practice: で始まる。他アプリのキーには触らない)
 *   tonio-practice:cards  Record<cardKey, PracticeCard>
 *   tonio-practice:state  PracticeState (選んだ教材 / 進行中のセット / 今日の新規枚数)
 *   tonio-practice:log    Record<YYYY-MM-DD, DayLog>
 *
 * 例外として、百日課程のカードを「すぐ言えた」と評価したときだけ、
 * 百日課程ページが使う course:learned(言えた表現の集合)にも同じ表現を足す。
 * 足すだけで、消したり上書きしたりはしない。
 */

import { LEITNER_INTERVALS, type LeitnerBox } from '@/types/review';

export type Rating = 'again' | 'hard' | 'good';

export const RATING_LABEL: Record<Rating, string> = {
    good: 'すぐ言えた',
    hard: '少し迷った',
    again: '出てこなかった',
};

export interface PracticeCard {
    key: string;          // 教材ごとの安定した id(例: c1000:you know)
    deck: string;         // 教材 id
    box: LeitnerBox;      // 1(毎日) .. 5(30日)
    next: string;         // 次に出す日 YYYY-MM-DD(ローカル)
    last: string;         // 最後に評価した日
    added: string;        // 初めて評価した日
    reviews: number;
    good: number;
    hard: number;
    again: number;
    ease: number;         // SM-2 ease。2.5 から始まる
    lastRating?: Rating;
}

export interface DayLog {
    reviewed: number;     // 自己評価した枚数(新規も含む)
    good: number;
    hard: number;
    again: number;
    newCards: number;     // その日に初めて練習した枚数
    sets: number;         // 完了したセット数
}

export interface SessionState {
    date: string;                   // セットを作った日
    deck: string;                   // 新規カードを出した教材
    keys: string[];                 // 出す順番
    index: number;                  // 次に出すカードの位置
    results: Record<string, Rating>; // 評価済み
    newKeys: string[];              // keys のうち新規だったもの
    startedAt: string;
}

export interface PracticeState {
    v: 1;
    deck: string;
    firstDate?: string;
    lastDate?: string;
    dailyNew: { date: string; count: number };
    session: SessionState | null;
}

export const KEYS = {
    cards: 'tonio-practice:cards',
    state: 'tonio-practice:state',
    log: 'tonio-practice:log',
} as const;

export const DEFAULT_DECK = 'course';
/** 1セットで出す復習の上限 */
export const REVIEW_CAP = 10;
/** 1日の最初のセットで出す新しい表現の数 */
export const NEW_PER_DAY = 5;
/** 「もう1セット」を重ねた場合の、1日の新しい表現の上限 */
export const NEW_PER_DAY_MAX = 20;

// ───────────────────────── 日付(ローカル) ─────────────────────────

export function localToday(d: Date = new Date()): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

export function addDays(dateStr: string, n: number): string {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dt = new Date(y, m - 1, d);
    dt.setDate(dt.getDate() + n);
    return localToday(dt);
}

export function daysBetween(from: string, to: string): number {
    const [fy, fm, fd] = from.split('-').map(Number);
    const [ty, tm, td] = to.split('-').map(Number);
    const a = new Date(fy, fm - 1, fd).getTime();
    const b = new Date(ty, tm - 1, td).getTime();
    return Math.round((b - a) / 86400000);
}

// ───────────────────────── 保存(壊さない読み書き) ─────────────────────────

const corruptSeen = new Set<string>();

function readJSON<T>(key: string, fallback: T, validate?: (v: unknown) => boolean): T {
    if (typeof window === 'undefined') return fallback;
    let raw: string | null = null;
    try { raw = window.localStorage.getItem(key); } catch { return fallback; }
    if (!raw) return fallback;
    try {
        const v = JSON.parse(raw);
        if (validate && !validate(v)) throw new Error('shape');
        return v as T;
    } catch {
        // 読めない値は上書きする前に退避しておく(元データを失わない)
        corruptSeen.add(key);
        return fallback;
    }
}

/** 書けたかどうかを返す。プライベートモードや容量超過では false */
function writeJSON(key: string, value: unknown): boolean {
    if (typeof window === 'undefined') return false;
    try {
        if (corruptSeen.has(key)) {
            const old = window.localStorage.getItem(key);
            if (old) window.localStorage.setItem(`${key}.backup-${Date.now()}`, old);
            corruptSeen.delete(key);
        }
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
}

const isRecord = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);

export function loadCards(): Record<string, PracticeCard> {
    return readJSON<Record<string, PracticeCard>>(KEYS.cards, {}, isRecord);
}

export function saveCards(cards: Record<string, PracticeCard>): boolean {
    return writeJSON(KEYS.cards, cards);
}

export function loadLog(): Record<string, DayLog> {
    return readJSON<Record<string, DayLog>>(KEYS.log, {}, isRecord);
}

export function saveLog(log: Record<string, DayLog>): boolean {
    return writeJSON(KEYS.log, log);
}

export function defaultState(): PracticeState {
    return { v: 1, deck: DEFAULT_DECK, dailyNew: { date: '', count: 0 }, session: null };
}

export function loadState(): PracticeState {
    const s = readJSON<Partial<PracticeState>>(KEYS.state, {}, isRecord);
    const base = defaultState();
    return {
        ...base,
        ...s,
        v: 1,
        deck: typeof s.deck === 'string' && s.deck ? s.deck : base.deck,
        dailyNew: s.dailyNew && typeof s.dailyNew.date === 'string' ? s.dailyNew : base.dailyNew,
        session: s.session && Array.isArray(s.session.keys) ? s.session : null,
    };
}

export function saveState(state: PracticeState): boolean {
    return writeJSON(KEYS.state, state);
}

export function hasAnyPracticeData(): boolean {
    if (typeof window === 'undefined') return false;
    try { return !!window.localStorage.getItem(KEYS.state) || !!window.localStorage.getItem(KEYS.cards); } catch { return false; }
}

// ───────────────────────── 自己評価 → 次に出す日 ─────────────────────────

export function newCard(key: string, deck: string, today: string): PracticeCard {
    return {
        key, deck, box: 1, next: today, last: today, added: today,
        reviews: 0, good: 0, hard: 0, again: 0, ease: 2.5,
    };
}

function intervalDays(box: LeitnerBox, ease: number): number {
    return Math.max(1, Math.round(LEITNER_INTERVALS[box] * (ease / 2.5)));
}

export function rateCard(card: PracticeCard, rating: Rating, today: string): PracticeCard {
    let box: LeitnerBox = card.box;
    let ease = card.ease;
    switch (rating) {
        case 'again':
            box = 1;
            ease = Math.max(1.3, ease - 0.2);
            break;
        case 'hard':
            box = Math.max(1, card.box - 1) as LeitnerBox;
            ease = Math.max(1.3, ease - 0.15);
            break;
        case 'good':
            box = Math.min(5, card.box + 1) as LeitnerBox;
            break;
    }
    return {
        ...card,
        box,
        ease,
        next: addDays(today, intervalDays(box, ease)),
        last: today,
        reviews: card.reviews + 1,
        good: card.good + (rating === 'good' ? 1 : 0),
        hard: card.hard + (rating === 'hard' ? 1 : 0),
        again: card.again + (rating === 'again' ? 1 : 0),
        lastRating: rating,
    };
}

/** 今日出すべき復習カード。箱が小さい順、期限が古い順 */
export function dueCards(cards: Record<string, PracticeCard>, today: string): PracticeCard[] {
    return Object.values(cards)
        .filter(c => c && typeof c.next === 'string' && c.next <= today)
        .sort((a, b) => (a.box - b.box) || a.next.localeCompare(b.next) || a.key.localeCompare(b.key));
}

export function newBudgetFor(state: PracticeState, today: string, extra: boolean): number {
    const used = state.dailyNew.date === today ? state.dailyNew.count : 0;
    const cap = extra ? NEW_PER_DAY_MAX : NEW_PER_DAY;
    return Math.max(0, cap - used);
}

export interface SessionPlan {
    reviewKeys: string[];
    newKeys: string[];
    /** 上限で今回に入らなかった復習の数 */
    remainingDue: number;
}

/**
 * セットの中身を決める。
 *   - 復習: 全教材の期限切れカードから REVIEW_CAP 枚
 *   - 新規: いま選んでいる教材の、まだ練習していない表現から順番に
 * skipNew に入っている key は新規として出さない(百日課程で既に「言えた」にした表現など)
 */
export function planSession(
    cards: Record<string, PracticeCard>,
    currentDeck: string,
    deckKeysInOrder: string[],
    state: PracticeState,
    today: string,
    opts: { extra?: boolean; skipNew?: Set<string>; availableKeys?: Set<string> } = {},
): SessionPlan {
    const due = dueCards(cards, today).filter(c => !opts.availableKeys || opts.availableKeys.has(c.key));
    const reviewKeys = due.slice(0, REVIEW_CAP).map(c => c.key);
    const budget = newBudgetFor(state, today, !!opts.extra);
    const newKeys: string[] = [];
    if (budget > 0) {
        for (const k of deckKeysInOrder) {
            if (cards[k]) continue;
            if (opts.skipNew?.has(k)) continue;
            newKeys.push(k);
            if (newKeys.length >= budget) break;
        }
    }
    return { reviewKeys, newKeys, remainingDue: Math.max(0, due.length - reviewKeys.length) };
}

export function startSession(state: PracticeState, plan: SessionPlan, today: string): PracticeState {
    const keys = [...plan.reviewKeys, ...plan.newKeys];
    const session: SessionState = {
        date: today,
        deck: state.deck,
        keys,
        index: 0,
        results: {},
        newKeys: plan.newKeys,
        startedAt: new Date().toISOString(),
    };
    return { ...state, session };
}

export interface ApplyResult {
    state: PracticeState;
    cards: Record<string, PracticeCard>;
    log: Record<string, DayLog>;
    saved: boolean;
    duplicate: boolean;
}

/**
 * 1枚の自己評価を保存する。二度押しは無視する(同じ key は一度しか数えない)。
 * courseEn を渡すと、百日課程の「言えた」集合にも足す(good のときだけ)。
 */
export function applyRating(
    state: PracticeState,
    key: string,
    deck: string,
    rating: Rating,
    opts: { courseEn?: string } = {},
): ApplyResult {
    const today = localToday();
    const cards = loadCards();
    const log = loadLog();
    const session = state.session;

    if (session && session.results[key]) {
        return { state, cards, log, saved: true, duplicate: true };
    }

    const existing = cards[key];
    const isNew = !existing;
    const base = existing ?? newCard(key, deck, today);
    cards[key] = rateCard(base, rating, today);

    const day: DayLog = log[today] ?? { reviewed: 0, good: 0, hard: 0, again: 0, newCards: 0, sets: 0 };
    day.reviewed += 1;
    day[rating] += 1;
    if (isNew) day.newCards += 1;
    log[today] = day;

    const dailyNew = state.dailyNew.date === today ? { ...state.dailyNew } : { date: today, count: 0 };
    if (isNew) dailyNew.count += 1;

    const nextState: PracticeState = {
        ...state,
        firstDate: state.firstDate ?? today,
        lastDate: today,
        dailyNew,
        session: session
            ? { ...session, results: { ...session.results, [key]: rating }, index: Math.max(session.index, session.keys.indexOf(key) + 1) }
            : null,
    };

    const ok1 = saveCards(cards);
    const ok2 = saveLog(log);
    const ok3 = saveState(nextState);

    if (deck === 'course' && rating === 'good' && opts.courseEn) {
        addCourseLearned(opts.courseEn);
    }

    return { state: nextState, cards, log, saved: ok1 && ok2 && ok3, duplicate: false };
}

/** セットを閉じる。完了数を記録し、進行中セットを消す */
export function finishSession(state: PracticeState): PracticeState {
    const today = localToday();
    const log = loadLog();
    const day: DayLog = log[today] ?? { reviewed: 0, good: 0, hard: 0, again: 0, newCards: 0, sets: 0 };
    if (state.session && Object.keys(state.session.results).length > 0) {
        day.sets += 1;
        log[today] = day;
        saveLog(log);
    }
    const next = { ...state, session: null };
    saveState(next);
    return next;
}

export function abandonSession(state: PracticeState): PracticeState {
    const next = { ...state, session: null };
    saveState(next);
    return next;
}

export function setDeck(state: PracticeState, deck: string): PracticeState {
    const next: PracticeState = { ...state, deck, session: state.session && state.session.deck === deck ? state.session : null };
    saveState(next);
    return next;
}

// ───────────────────────── 百日課程との橋 ─────────────────────────

const COURSE_LEARNED_KEY = 'course:learned';

export function readCourseLearned(): Set<string> {
    if (typeof window === 'undefined') return new Set();
    try {
        const raw = window.localStorage.getItem(COURSE_LEARNED_KEY);
        if (!raw) return new Set();
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? new Set(arr.filter(x => typeof x === 'string')) : new Set();
    } catch {
        return new Set();
    }
}

/** 足すだけ。読めない値が入っていたら触らない */
export function addCourseLearned(en: string): void {
    if (typeof window === 'undefined') return;
    try {
        const raw = window.localStorage.getItem(COURSE_LEARNED_KEY);
        let arr: unknown = [];
        if (raw) {
            arr = JSON.parse(raw);
            if (!Array.isArray(arr)) return;
        }
        const set = new Set((arr as unknown[]).filter(x => typeof x === 'string') as string[]);
        if (set.has(en)) return;
        set.add(en);
        window.localStorage.setItem(COURSE_LEARNED_KEY, JSON.stringify([...set]));
    } catch {
        /* 書けない環境では何もしない */
    }
}

// ───────────────────────── 記録用の集計 ─────────────────────────

export interface PracticeSummary {
    today: DayLog;
    dueCount: number;
    totalCards: number;
    /** 直近7日。古い順。{date, reviewed} */
    last7: { date: string; reviewed: number }[];
    /** 今日を含めて、連続で練習した日数 */
    streak: number;
    lastDate: string | null;
    activeDays: number;
}

export function summarize(cards: Record<string, PracticeCard>, log: Record<string, DayLog>, today: string): PracticeSummary {
    const t = log[today] ?? { reviewed: 0, good: 0, hard: 0, again: 0, newCards: 0, sets: 0 };
    const last7: { date: string; reviewed: number }[] = [];
    for (let i = 6; i >= 0; i--) {
        const d = addDays(today, -i);
        last7.push({ date: d, reviewed: log[d]?.reviewed ?? 0 });
    }
    let streak = 0;
    let cursor = today;
    // 今日まだやっていなくても、昨日まで続いていれば連続は切れていないとみなす
    if (!(log[today]?.reviewed > 0)) cursor = addDays(today, -1);
    while (log[cursor]?.reviewed > 0) {
        streak += 1;
        cursor = addDays(cursor, -1);
    }
    const dates = Object.keys(log).filter(d => (log[d]?.reviewed ?? 0) > 0).sort();
    return {
        today: t,
        dueCount: dueCards(cards, today).length,
        totalCards: Object.keys(cards).length,
        last7,
        streak,
        lastDate: dates.length ? dates[dates.length - 1] : null,
        activeDays: dates.length,
    };
}
