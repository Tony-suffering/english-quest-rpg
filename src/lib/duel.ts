/**
 * カード対戦のルール(画面を持たない計算だけ)。第3版(2026-11-27)。
 *
 * 経緯: 第1版(言えた/言えなかったの自己申告)は「しょぼい」で却下。第2版(向き・伏せ札・バースト・エナジーを置く)は
 * 「もう少しルールを簡単に」で却下。この版は、数字2つで殴り合う形まで削った。画面の文字は全部英語、日本語は使わない。
 *
 * ルール(オリジナル):
 * - デッキ20枚。リーダーの体力 20。場はユニット5体まで。手札は8枚まで。
 * - エナジーは毎ターン自動で1つ増えて(最大8)、全部戻る。カードのコストを払って場に出す。
 * - ユニットは ATK と HP を持つ。攻撃すると、お互いの ATK の分だけ相手の HP が減る。0 になったら破壊。
 * - 出したターンは攻撃できない(RUSH は除く)。相手のユニットでもリーダーでも殴れる。
 *   ただし相手の場に WARD がいるあいだは、WARD しか殴れない。
 * - コスト = 種族値の合計の階級(F1 D2 C3 B4 A5 S6)。ATK と HP は「コスト×2+1」を、攻撃と防御の種族値の比で分ける。
 *   金以上の枠は HP +1。能力なしのカードは +1。
 * - 能力はいちばん高い種族値で1つ決まる: HEAL(リーダー +2) / STRIKE(相手の最強ユニットに2ダメージ) / WARD / INSIGHT(1枚引く) / RUSH / なし。
 * - 勝ち: 相手のリーダーの体力を0にする。山が無いのに引くことになった側は負け。
 *
 * 行動は Action の値1つ、盤面は Game の値1つ、乱数は seed 式。通信対戦は Action の列を送り合えば両方で同じ盤面になる。
 */

import { ELEMENTS, calcBstStats, calcBstTotal, getBstTier, type BstTier } from '@/data/english/elements';

export interface PoolCard {
    id: string;
    english: string;
    category: string;
    card_no: number | null;
    points: number;
    mastery: number;
}

export type Ability = 'HEAL' | 'STRIKE' | 'WARD' | 'INSIGHT' | 'NONE' | 'RUSH';
const ABILITY_BY_STAT: Ability[] = ['HEAL', 'STRIKE', 'WARD', 'INSIGHT', 'NONE', 'RUSH'];
export const ABILITY_TEXT: Record<Ability, string> = {
    HEAL: 'When played: restore 2 HP to your leader.',
    STRIKE: 'When played: deal 2 damage to the strongest enemy unit.',
    WARD: 'Enemies must attack this unit first.',
    INSIGHT: 'When played: draw a card.',
    RUSH: 'Can attack on the turn it is played.',
    NONE: '',
};

export const DECK_SIZE = 20;
export const START_HP = 20;
export const START_HAND = 4;
export const HAND_MAX = 8;
export const FIELD_SIZE = 5;
export const ENERGY_MAX = 8;
export const ELEMENT_NAMES: Record<string, string> = { flame: 'FLAME', aqua: 'AQUA', wind: 'WIND', earth: 'EARTH', thunder: 'THUNDER' };
export const RANK_LABELS = ['NORMAL', 'BRONZE', 'SILVER', 'GOLD', 'HOLO', 'LEGEND'];
const RANK_THRESHOLDS = [250, 100, 50, 20, 5];
const COST_BY_TIER: Record<BstTier, number> = { F: 1, D: 2, C: 3, B: 4, A: 5, S: 6 };

export interface CardSpec {
    id: string;
    text: string;
    element: string;
    cost: number;
    atk: number;
    hp: number;
    ability: Ability;
    rank: number;      // 0 = NORMAL … 5 = LEGEND
    tier: BstTier;
    no: number | null;
    gp: number;
    // 単語パックのカード(1枚が1語)だけが持つ。text には英文が入る
    word?: string;      // 覚える語
    ja?: string;        // 語の意味
    lineJa?: string;    // 英文の訳
    tone?: string;      // 英文の型(日本語の呼び名)
    style?: string;     // 絵の画風の名前
    band?: number;      // TOEIC の点数帯(500〜900)。章になる
}

/** 単語パックの1枚(src/data/english/duel-words-*.json の cards) */
export interface WordCard {
    id: string; word: string; pos: string; ja: string; level: number; ability: string; band?: number; cost?: number;
    tone: string; toneJa: string; style: string; line: string; lineJa: string;
}
export interface WordPack { id: string; title: string; titleJa: string; cards: WordCard[] }

const POS_ELEMENT: Record<string, string> = { verb: 'flame', noun: 'earth', adjective: 'wind', adverb: 'thunder', phrase: 'aqua' };
const TIER_BY_COST: BstTier[] = ['F', 'F', 'D', 'C', 'B', 'A', 'S'];

/** 単語カードを対戦のカードにする。点数帯(band)が章、コスト(cost)は語ごと。品詞が属性。攻撃と体力の割り方は id から決める。
 *  最初の20語は level をコストにも点数帯にも使っていた。64語に増やしたとき、章の中でコストがばらけるように2つに分けた */
export function wordSpec(c: WordCard, i: number): CardSpec {
    const cost = Math.max(1, Math.min(6, c.cost ?? c.level));
    const band = c.band ?? [500, 600, 700, 800, 900][Math.max(0, Math.min(4, c.level - 1))];
    const ability = (ABILITY_BY_STAT as string[]).includes(c.ability) ? c.ability as Ability : 'NONE';
    const budget = cost * 2 + 1 + (ability === 'NONE' ? 1 : 0);
    let h = 0;
    for (const ch of c.id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const atk = Math.max(1, Math.min(budget - 1, Math.round(budget * (0.4 + (h % 21) / 100))));
    return {
        id: c.id, text: c.line, element: POS_ELEMENT[c.pos] || 'earth', cost, atk, hp: budget - atk, ability,
        rank: Math.max(2, Math.min(5, band / 100 - 3)), tier: TIER_BY_COST[cost], no: i + 1, gp: 0, band,
        word: c.word, ja: c.ja, lineJa: c.lineJa, tone: c.toneJa, style: c.style,
    };
}

export function toSpec(c: PoolCard): CardSpec {
    const stats = calcBstStats(c.id);
    while (stats.length < 6) stats.push(60);
    const ri = RANK_THRESHOLDS.findIndex(t => c.points >= t);
    const rank = ri < 0 ? 0 : 5 - ri;
    const tier = getBstTier(calcBstTotal(c.id)).tier;
    let top = 0;
    stats.forEach((v, i) => { if (v > stats[top]) top = i; });
    const ability = ABILITY_BY_STAT[top];
    const cost = COST_BY_TIER[tier];
    const budget = cost * 2 + 1 + (ability === 'NONE' ? 1 : 0);
    const atk = Math.max(1, Math.min(budget - 1, Math.round(budget * stats[1] / (stats[1] + stats[2]))));
    return {
        id: c.id, text: c.english,
        element: (ELEMENTS as readonly string[]).includes(c.category) ? c.category : ELEMENTS[c.id.charCodeAt(0) % ELEMENTS.length],
        cost, atk, hp: budget - atk + (rank >= 3 ? 1 : 0),
        ability, rank, tier, no: c.card_no, gp: c.points,
    };
}

export function makeRng(seed: number): () => number {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6D2B79F5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function shuffle<T>(list: T[], rng: () => number): T[] {
    const a = [...list];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/** 山から20枚。軽いカードを多めに(コスト1-2を7、3を6、4を4、5以上を3)、足りない分は強い順で埋める */
export function autoDeck(pool: CardSpec[]): CardSpec[] {
    const byValue = [...pool].sort((a, b) => (b.atk + b.hp + b.rank) - (a.atk + a.hp + a.rank));
    const want: [(c: CardSpec) => boolean, number][] = [
        [c => c.cost <= 2, 7], [c => c.cost === 3, 6], [c => c.cost === 4, 4], [c => c.cost >= 5, 3],
    ];
    const out: CardSpec[] = [];
    for (const [test, n] of want) out.push(...byValue.filter(test).slice(0, n));
    for (const c of byValue) { if (out.length >= DECK_SIZE) break; if (!out.includes(c)) out.push(c); }
    return out.slice(0, DECK_SIZE);
}

// ── 盤面 ──

export interface Unit {
    uid: number;
    card: CardSpec;
    atk: number;
    hp: number;
    attacked: boolean;
    summonedTurn: number;
    evolved?: boolean;      // 読解モード: Part 6 で進化した(+2/+2)
}

// ── 読解モード(TOEIC Reading。2026-11-28)──
// 本人「Part 5 以降を速く読んでほぼ満点を取るのが目標。シャドバ形式は保守したい」。
// TOEIC の3つの Part を、カードゲームの3つの仕組みに1つずつ乗せる。対戦そのもの(出す・殴る・ターン)は変えない。
//  Part 5 = エナジー: 自分のターンの頭に1問。速く当てるほど、そのターンのエナジーが増える(read5)
//  Part 6 = 進化:     進化するとき長文の空所を1つ解く。当たれば +2/+2、外せば進化の権利だけ減る(evolve)
//  Part 7 = 文書:     相手が文書(メール・広告・通知)を場に置く。カウントが 0 になると自分のリーダーに大ダメージ。
//                     設問に当てるたびに封が1つ外れ、全部当てると文書が砕けて相手のリーダーに跳ね返る(readDoc)
// 問題の中身(本文・選択肢・正解)は画面側が持つ。ルールは「何問あって、どれが残っているか」だけを数える。

export interface DocAmulet {
    uid: number;
    key: string;          // 問題の在りか(画面側の問題集の鍵)
    total: number;        // 設問の数
    left: number[];       // まだ答えていない設問の番号(0 始まり)
    hit: number;          // 当てた数
    count: number;        // 爆発までのカウント。相手のターンの頭に1つ減る
}
export interface Reading {
    docs: DocAmulet[];                     // 相手(1)が置いた文書。自分(0)が読む
    queue: { key: string; total: number }[];   // これから置かれる文書の順番
    evo: [number, number];                 // 進化の残り回数
    evoTurn: [number, number];             // 最後に進化したターン(1ターンに1回まで)
    read5: number;                         // Part 5 を解いたターン(1ターンに1回)
    docTurns: number;                      // 相手のターンの数(文書を置く間隔を数える)
}
export const READ5_GAIN = { fast: 2, ok: 1 } as const;   // 速く当てた / 当てた
export const READ5_FAST_SEC = 12, READ5_LIMIT_SEC = 30;
export const EVO_POINTS: [number, number] = [2, 2];
export const EVO_FROM_TURN: [number, number] = [5, 6];   // 自分の3ターン目 / 相手の3ターン目から
export const EVO_BONUS = 2;
export const DOC_COUNT = 3, DOC_MAX = 2;
export const docDamage = (d: DocAmulet) => 2 + d.left.length * 2;   // 爆発したときの痛さ(読み残しが多いほど痛い)
export const docRecoil = (d: DocAmulet) => d.hit + 1;                // 読み切ったときに相手へ返す分(当てた数+1)

/** 対戦を読解モードにする(newGame のすぐあとに呼ぶ)。queue は置かれる順の文書 */
export function withReading(g: Game, queue: { key: string; total: number }[]): Game {
    return { ...g, reading: { docs: [], queue: [...queue], evo: [...EVO_POINTS], evoTurn: [0, 0], read5: 0, docTurns: 0 } };
}
export function canRead5(g: Game): boolean {
    return !!g.reading && g.winner === null && g.active === 0 && g.reading.read5 !== g.turn;
}
export function canEvolve(g: Game, u: Unit): boolean {
    const r = g.reading, p = g.active;
    return !!r && g.winner === null && !u.evolved && r.evo[p] > 0 && g.turn >= EVO_FROM_TURN[p] && r.evoTurn[p] !== g.turn
        && g.sides[p].field.some(x => x.uid === u.uid);
}
export interface Side {
    hp: number;
    deck: CardSpec[];
    hand: CardSpec[];
    energy: number;
    energyMax: number;
    field: Unit[];
    grave: CardSpec[];
}
export interface Game {
    seed: number;
    turn: number;
    active: 0 | 1;
    sides: [Side, Side];
    winner: 0 | 1 | null;
    log: string[];
    nextUid: number;
    reading?: Reading;
}

export type Action =
    | { type: 'play'; idx: number }
    | { type: 'attack'; a: number; t: number | null }   // t = null はリーダーへ
    | { type: 'end' }
    | { type: 'read5'; gain: number }                    // Part 5 の結果(0 / 1 / 2)
    | { type: 'evolve'; uid: number; ok: boolean }       // Part 6 の結果
    | { type: 'readDoc'; doc: number; q: number; ok: boolean };   // Part 7 の1問の結果

const NAMES = ['You', 'Rival'];
const short = (c: CardSpec) => `"${c.text.length > 26 ? c.text.slice(0, 24) + '…' : c.text}"`;

function draw(g: Game, p: 0 | 1, n = 1) {
    const s = g.sides[p];
    for (let i = 0; i < n; i++) {
        if (!s.deck.length) {
            if (g.winner === null) { g.winner = (1 - p) as 0 | 1; g.log.push(`${NAMES[p]} ran out of cards.`); }
            return;
        }
        const c = s.deck.shift()!;
        if (s.hand.length >= HAND_MAX) s.grave.push(c); else s.hand.push(c);
    }
}

function startTurn(g: Game) {
    const s = g.sides[g.active];
    s.energyMax = Math.min(ENERGY_MAX, s.energyMax + 1);
    s.energy = s.energyMax;
    s.field.forEach(u => { u.attacked = false; });
    draw(g, g.active);
    if (g.reading && g.active === 1 && g.winner === null) docsTick(g);
}

/** 読解モード: 相手のターンの頭。置いてある文書のカウントを減らし、0 になったものは爆発。そのあと、間隔が来ていれば次の文書を置く */
function docsTick(g: Game) {
    const r = g.reading!;
    r.docTurns += 1;
    for (const d of r.docs) d.count -= 1;
    const boom = r.docs.filter(d => d.count <= 0);
    for (const d of boom) {
        g.sides[0].hp -= docDamage(d);
        g.log.push(`A document exploded for ${docDamage(d)}.`);
    }
    r.docs = r.docs.filter(d => d.count > 0);
    if (g.sides[0].hp <= 0 && g.winner === null) { g.sides[0].hp = 0; g.winner = 1; return; }
    // 相手の1・3・5…ターン目に1枚ずつ(場には2枚まで)
    if (r.docTurns % 2 === 1 && r.docs.length < DOC_MAX && r.queue.length) {
        const next = r.queue.shift()!;
        r.docs.push({ uid: g.nextUid++, key: next.key, total: next.total, left: Array.from({ length: next.total }, (_, i) => i), hit: 0, count: DOC_COUNT + (next.total >= 5 ? 1 : 0) });
        g.log.push('The rival placed a document.');
    }
}

export function newGame(deckA: CardSpec[], deckB: CardSpec[], seed: number): Game {
    const rng = makeRng(seed);
    const side = (deck: CardSpec[]): Side => ({ hp: START_HP, deck: shuffle(deck, rng), hand: [], energy: 0, energyMax: 0, field: [], grave: [] });
    const g: Game = { seed, turn: 1, active: 0, sides: [side(deckA), side(deckB)], winner: null, log: ['Duel start.'], nextUid: 1 };
    draw(g, 0, START_HAND);
    draw(g, 1, START_HAND + 1);   // 後攻は1枚多い
    startTurn(g);
    return g;
}

export function canPlay(g: Game, idx: number): boolean {
    const s = g.sides[g.active], c = s.hand[idx];
    return g.winner === null && !!c && c.cost <= s.energy && s.field.length < FIELD_SIZE;
}
/** 出したターンに進化したユニットは、ユニットだけを殴れる(リーダーは殴れない) */
const freshEvolved = (g: Game, u: Unit) => !!u.evolved && u.summonedTurn >= g.turn && u.card.ability !== 'RUSH';
export function canAttack(g: Game, u: Unit): boolean {
    if (g.winner !== null || u.attacked) return false;
    if (u.summonedTurn < g.turn || u.card.ability === 'RUSH') return true;
    return freshEvolved(g, u) && g.sides[1 - g.active].field.length > 0;
}
/** いまの番の側が殴れる相手。WARD がいればそれだけ。attacker を渡すと、出したばかりの進化ユニットはリーダーを外す */
export function targetsFor(g: Game, attacker?: Unit): { units: number[]; leader: boolean } {
    const foe = g.sides[1 - g.active].field;
    const wards = foe.filter(u => u.card.ability === 'WARD');
    const leaderOk = !(attacker && freshEvolved(g, attacker));
    if (wards.length) return { units: wards.map(u => u.uid), leader: false };
    return { units: foe.map(u => u.uid), leader: leaderOk };
}

function bury(g: Game) {
    for (const s of g.sides) {
        const dead = s.field.filter(u => u.hp <= 0);
        if (!dead.length) continue;
        dead.forEach(u => { s.grave.push(u.card); g.log.push(`${short(u.card)} is destroyed.`); });
        s.field = s.field.filter(u => u.hp > 0);
    }
    for (const p of [0, 1] as const) {
        if (g.winner === null && g.sides[p].hp <= 0) { g.sides[p].hp = 0; g.winner = (1 - p) as 0 | 1; }
    }
}

/** 行動を1つ当てて、新しい盤面を返す。できない行動なら元の盤面をそのまま返す */
export function apply(g0: Game, a: Action): Game {
    if (g0.winner !== null) return g0;
    const p = g0.active, q = (1 - p) as 0 | 1;

    if (a.type === 'play') {
        if (!canPlay(g0, a.idx)) return g0;
        const g = structuredClone(g0), s = g.sides[p], foe = g.sides[q];
        const [c] = s.hand.splice(a.idx, 1);
        s.energy -= c.cost;
        s.field.push({ uid: g.nextUid++, card: c, atk: c.atk, hp: c.hp, attacked: false, summonedTurn: g.turn });
        g.log.push(`${NAMES[p]} played ${short(c)}.`);
        if (c.ability === 'HEAL') s.hp = Math.max(s.hp, Math.min(START_HP, s.hp + 2));   // 体力が 20 より多いボスを削らない
        if (c.ability === 'INSIGHT') draw(g, p);
        if (c.ability === 'STRIKE' && foe.field.length) {
            const t = foe.field.reduce((m, u) => u.atk > m.atk ? u : m);
            t.hp -= 2;
            g.log.push(`STRIKE hits ${short(t.card)} for 2.`);
        }
        bury(g);
        return g;
    }

    if (a.type === 'attack') {
        const u0 = g0.sides[p].field.find(u => u.uid === a.a);
        if (!u0 || !canAttack(g0, u0)) return g0;
        const legal = targetsFor(g0, u0);
        if (a.t === null ? !legal.leader : !legal.units.includes(a.t)) return g0;
        const g = structuredClone(g0), me = g.sides[p], foe = g.sides[q];
        const au = me.field.find(u => u.uid === a.a)!;
        au.attacked = true;
        if (a.t === null) {
            foe.hp -= au.atk;
            g.log.push(`${short(au.card)} hits the ${p === 0 ? 'rival' : 'your'} leader for ${au.atk}.`);
        } else {
            const tu = foe.field.find(u => u.uid === a.t)!;
            tu.hp -= au.atk;
            au.hp -= tu.atk;
            g.log.push(`${short(au.card)} attacks ${short(tu.card)}.`);
        }
        bury(g);
        return g;
    }

    if (a.type === 'read5') {
        if (!canRead5(g0)) return g0;
        const g = structuredClone(g0), s = g.sides[p];
        g.reading!.read5 = g.turn;
        const gain = Math.max(0, Math.min(READ5_GAIN.fast, Math.round(a.gain)));
        s.energy = Math.min(ENERGY_MAX + READ5_GAIN.fast, s.energy + gain);
        g.log.push(gain ? `Part 5: +${gain} energy.` : 'Part 5: no bonus.');
        return g;
    }

    if (a.type === 'evolve') {
        const u0 = g0.sides[p].field.find(u => u.uid === a.uid);
        if (!u0 || !canEvolve(g0, u0)) return g0;
        const g = structuredClone(g0), r = g.reading!;
        r.evo[p] -= 1;
        r.evoTurn[p] = g.turn;
        if (a.ok) {
            const u = g.sides[p].field.find(x => x.uid === a.uid)!;
            u.evolved = true; u.atk += EVO_BONUS; u.hp += EVO_BONUS;
            g.log.push(`${short(u.card)} evolved.`);
        } else g.log.push('The evolution failed.');
        return g;
    }

    if (a.type === 'readDoc') {
        const r0 = g0.reading, d0 = r0?.docs.find(d => d.uid === a.doc);
        if (!r0 || !d0 || p !== 0 || !d0.left.includes(a.q)) return g0;
        const g = structuredClone(g0), r = g.reading!, d = r.docs.find(x => x.uid === a.doc)!;
        // 答えた設問は外れても消える(同じ問題を消去法で当て直せないように)。外すとカウントが1つ進む
        d.left = d.left.filter(x => x !== a.q);
        if (a.ok) d.hit += 1;
        else d.count -= 1;
        if (!a.ok && d.count <= 0) {
            g.sides[0].hp -= docDamage(d);
            r.docs = r.docs.filter(x => x.uid !== d.uid);
            g.log.push(`A document exploded for ${docDamage(d)}.`);
        } else if (!d.left.length) {
            r.docs = r.docs.filter(x => x.uid !== d.uid);
            if (d.hit) { g.sides[1].hp -= docRecoil(d); g.log.push(`Document cleared. ${docRecoil(d)} damage back to the rival.`); }
            else g.log.push('The document crumbled.');
        }
        bury(g);
        return g;
    }

    const g = structuredClone(g0);
    g.active = q;
    g.turn += 1;
    startTurn(g);
    return g;
}

/** 相手(CPU)の次の一手。やることが無ければ { type: 'end' } */
export function aiAction(g: Game): Action {
    const p = g.active, q = (1 - p) as 0 | 1, s = g.sides[p], foe = g.sides[q];

    // 1. 払える中でいちばん重いカードを出す
    let idx = -1;
    s.hand.forEach((c, i) => { if (canPlay(g, i) && (idx < 0 || c.cost > s.hand[idx].cost)) idx = i; });
    if (idx >= 0) return { type: 'play', idx };

    // 1.5 読解モード: 進化できるなら、いちばん強いユニットを進化させる(相手は Part 6 を解かないので、必ず成功)
    if (g.reading) {
        const ev = s.field.filter(u => canEvolve(g, u)).sort((a, b) => (b.atk + b.hp) - (a.atk + a.hp))[0];
        if (ev) return { type: 'evolve', uid: ev.uid, ok: true };
    }

    const attackers = s.field.filter(u => canAttack(g, u)).sort((a, b) => a.atk - b.atk);
    if (!attackers.length) return { type: 'end' };
    const legal = targetsFor(g);

    // 出したばかりの進化ユニットはリーダーを殴れない。リーダーへ行けるのはこの中だけ
    const toFace = attackers.filter(u => targetsFor(g, u).leader);

    // 2. このターンで倒しきれるなら全部リーダーへ
    if (legal.leader && toFace.length && toFace.reduce((n, u) => n + u.atk, 0) >= foe.hp) return { type: 'attack', a: toFace[0].uid, t: null };

    // 3. 得な交換を探す
    for (const u of attackers) {
        let best: { t: number; score: number } | null = null;
        for (const tid of legal.units) {
            const t = foe.field.find(x => x.uid === tid)!;
            if (u.atk < t.hp) continue;
            const survive = t.atk < u.hp;
            const score = survive ? 10 + t.atk * 2 + t.card.cost : t.card.cost - u.card.cost + (t.atk >= u.atk ? 1 : 0);
            if (score > 0 && (!best || score > best.score)) best = { t: tid, score };
        }
        if (best) return { type: 'attack', a: u.uid, t: best.t };
    }

    // 4. 交換が無ければリーダーへ。WARD に塞がれていたら、いちばん強いのでいちばん減っている WARD を殴る
    if (legal.leader && toFace.length) return { type: 'attack', a: toFace[0].uid, t: null };
    if (!legal.units.length) return { type: 'end' };
    const strongest = attackers[attackers.length - 1];
    const ward = legal.units.map(id => foe.field.find(x => x.uid === id)!).sort((a, b) => a.hp - b.hp)[0];
    // ここに来るのは、WARD に塞がれている / 出したばかりの進化ユニットしか残っていない とき
    if (legal.leader) return { type: 'end' };   // 進化したての駒で損な交換はしない
    return { type: 'attack', a: strongest.uid, t: ward.uid };
}
