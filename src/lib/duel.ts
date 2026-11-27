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
}

export type Action =
    | { type: 'play'; idx: number }
    | { type: 'attack'; a: number; t: number | null }   // t = null はリーダーへ
    | { type: 'end' };

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
export function canAttack(g: Game, u: Unit): boolean {
    return g.winner === null && !u.attacked && (u.summonedTurn < g.turn || u.card.ability === 'RUSH');
}
/** いまの番の側が殴れる相手。WARD がいればそれだけ */
export function targetsFor(g: Game): { units: number[]; leader: boolean } {
    const foe = g.sides[1 - g.active].field;
    const wards = foe.filter(u => u.card.ability === 'WARD');
    if (wards.length) return { units: wards.map(u => u.uid), leader: false };
    return { units: foe.map(u => u.uid), leader: true };
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
        const legal = targetsFor(g0);
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

    const attackers = s.field.filter(u => canAttack(g, u)).sort((a, b) => a.atk - b.atk);
    if (!attackers.length) return { type: 'end' };
    const legal = targetsFor(g);

    // 2. このターンで倒しきれるなら全部リーダーへ
    if (legal.leader && attackers.reduce((n, u) => n + u.atk, 0) >= foe.hp) return { type: 'attack', a: attackers[0].uid, t: null };

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
    if (legal.leader) return { type: 'attack', a: attackers[0].uid, t: null };
    const strongest = attackers[attackers.length - 1];
    const ward = legal.units.map(id => foe.field.find(x => x.uid === id)!).sort((a, b) => a.hp - b.hp)[0];
    return { type: 'attack', a: strongest.uid, t: ward.uid };
}
