/**
 * THE LIFELINE — TONIO TOWN の一生(正典・第3巻)
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │  生まれてから死ぬまでの経験を、全部英語で通す。               │
 * │  だから英語が全部揃う。それがこの教材の全部である。            │
 * └──────────────────────────────────────────────────────────┘
 *
 * ■ 物語である
 * これは表ではない。**Sota の一生**である。
 * Ken と Yuko の息子として TONIO TOWN で生まれ、この町で死ぬ。137の窓口は、
 * 彼が通る137の日である。147人の町民は彼の人生を横切っていく。
 * Marcus は彼が生まれた年に17歳で英雄になり、彼が32歳のとき隣で家を買っている。
 * 新キャラは1人も足していない。足りなかったのは人ではなく、彼らの別の日だった。
 *
 * ■ 視点が途中で移る(これが仕掛け)
 *   ACT I-II  英語を使っているのは Ken と Yuko。移民の親の英語。事故が多い
 *   ACT III-  Sota 本人。ネイティブの英語。親を追い越していく
 *   ACT VIII  Sota が Flo のダイナーで一番年上になっている
 * 読者は最初、親の側にいる。気がつくと子の側にいる。
 *
 * ■ なぜ「窓口」で切るのか
 * 場面(restaurant, shopping)で切ると、教材は一生ぶんにならない。場面は無限にある。
 * 窓口で切ると有限になる。分娩室・SSN・デイケア・キンダー・DMV・面接・賃貸・確定申告・
 * 住宅検査・自治会・レイオフ・帰化・介護施設・遺言。数えると137しかない。
 * そして窓口には必ず定型文がある。定型文があるから、教材になる。
 *
 * ■ 4つの規則
 *   1. 1窓口 = 6文。増やさない。通過に必要な最小構成が6文である。
 *   2. 抜けを作らない。ここに無い経験は、この教材をやっても英語にならない。
 *   3. 各窓口に bomb(実際に落ちた爆弾)を1つ。正解だけ並べると参考書になる。
 *      覚えるのは事故の方である。刃は必ず学習者側に向ける。
 *   4. 人物は町民147人 + 職能名簿38人。新しい町民は作らない。
 *
 * ■ requiem の23シナリオとの関係
 * 23本は全部このライフラインのどこかに載っている。載せた結果わかったのは、
 * 23本が人生の中期(28-55歳)に集中していて、両端 — 生まれる側と終わる側 — が
 * 完全に空いていたことである。地図の穴を見えるようにするのがこのファイルの仕事。
 *
 *   STATIONS               137窓口(配列順 = 人生の順。no は自動で振られる)
 *   ACTS                   8幕
 *   stationsInAct('born')  幕ごとの窓口
 *   coverage()             既存シナリオの被覆率
 *   allPhrases()           822文まとめて
 *   stationsFor('marcus')  その人物が出る窓口
 *   unknownCastIds()       名簿に無い id の検出(壊れ検知)
 */

import { PEOPLE, getPerson } from './requiem-world';
import { LIFELINE_PEOPLE, getLifelinePerson } from './lifeline-cast';
import { bankFor, bankTotal } from './lifeline/bank';
import { acousticsOf, acousticCoverage, ACOUSTICS, type Acoustic, type AcousticId } from './lifeline/acoustics';
import type { ActId, Station, StationDef, LifePhrase } from './lifeline-types';
import { ACT1_BORN } from './lifeline/act1-born';
import { ACT2_CHILD } from './lifeline/act2-child';
import { ACT3_HIGH } from './lifeline/act3-high';
import { ACT4_LEAVE } from './lifeline/act4-leave';
import { ACT5_WORK } from './lifeline/act5-work';
import { ACT6_SETTLE } from './lifeline/act6-settle';
import { ACT7_MIDDLE } from './lifeline/act7-middle';
import { ACT8_LAST } from './lifeline/act8-last';

export type { ActId, Station, StationDef, LifePhrase };
export type { Acoustic, AcousticId };
export { ACOUSTICS, acousticCoverage };

/**
 * その窓口の音響条件。
 * 聴解が本丸だと決めた以上、章より先にここが確定していないと音源が作れない。
 */
export function acousticsFor(station: Station): Acoustic[] {
    return acousticsOf(station.en);
}

// ============================================================
// 主人公
// ============================================================

export const PROTAGONIST = {
    id: 'sota',
    name: 'Sota',
    line: 'Ken と Yuko の息子。TONIO TOWN で生まれ、この町で死ぬ。',
    note: '137の窓口は彼が通る137の日である。ACT I-II の英語は親のもの、ACT III から本人のものになる。',
} as const;

export const TOWN = 'TONIO TOWN';

// ============================================================
// 幕
// ============================================================

export interface Act {
    id: ActId;
    no: number;
    en: string;
    ja: string;
    age: string;
    /** その幕で英語に起きること。1行 */
    line: string;
    color: string;
}

export const ACTS: Act[] = [
    { id: 'born', no: 1, en: 'BORN', ja: '生まれる', age: '0-5歳', line: 'Sota はまだ喋らない。窓口に立っているのは Ken と Yuko で、英語は全部「書類」と「数字」でできている。', color: '#B8941E' },
    { id: 'child', no: 2, en: 'CHILD', ja: '育つ', age: '5-13歳', line: 'Sota の英語が親を追い越す。親が覚えるのは学校・近所・教会・当番表・病院の英語。', color: '#0E7490' },
    { id: 'high', no: 3, en: 'HIGH SCHOOL', ja: '高校', age: '14-18歳', line: '町の全員に見られる4年。英語は「頼む・断る・値段を聞く」に移る。子どもの英語から客の英語へ。', color: '#B45309' },
    { id: 'leave', no: 4, en: 'LEAVING', ja: '出ていく', age: '18-22歳', line: '交渉が始まる。部屋・金・断り方。全部を自分の口で決めることになる。', color: '#7C3AED' },
    { id: 'work', no: 5, en: 'WORK', ja: '働く', age: '22-30歳', line: '相手が制度の言葉で話し始める。聞き返せる人だけが損をしない。', color: '#065F46' },
    { id: 'settle', no: 6, en: 'SETTLING', ja: '定住する', age: '28-40歳', line: 'Sota が町に戻る。家と近所と行事。断り方が下手だと週末が全部なくなる。', color: '#BE123C' },
    { id: 'middle', no: 7, en: 'MIDDLE', ja: '中年', age: '40-65歳', line: '失う側に回る。英語は難しくならない。難しくなるのは、それを言うかどうかである。', color: '#475569' },
    { id: 'last', no: 8, en: 'LAST', ja: '最後', age: '65歳-', line: '励ましの言葉が効かなくなる。型の決まった短い文しか使えない。最後は月曜の卓に戻る。', color: '#334155' },
];

export function getAct(id: ActId): Act {
    return ACTS.find(a => a.id === id)!;
}

// ============================================================
// 窓口 — 幕ファイルの配列順に通し番号を振る
// ============================================================

const ACT_FILES: StationDef[][] = [
    ACT1_BORN, ACT2_CHILD, ACT3_HIGH, ACT4_LEAVE,
    ACT5_WORK, ACT6_SETTLE, ACT7_MIDDLE, ACT8_LAST,
];

export const STATIONS: Station[] = ACT_FILES.flat().map((s, i) => ({ ...s, no: i + 1 }));

export function stationsInAct(act: ActId): Station[] {
    return STATIONS.filter(s => s.act === act);
}

export function getStation(no: number): Station | undefined {
    return STATIONS.find(s => s.no === no);
}

/** 既に requiem のシナリオがある窓口 */
export function builtStations(): Station[] {
    return STATIONS.filter(s => s.built);
}

/** まだ書かれていない窓口。ここが次に書くものの一覧になる */
export function openStations(): Station[] {
    return STATIONS.filter(s => !s.built);
}

export interface Coverage {
    total: number;
    built: number;
    open: number;
    pct: number;
    byAct: Array<{ act: Act; total: number; built: number }>;
}

export function coverage(): Coverage {
    const built = builtStations().length;
    return {
        total: STATIONS.length,
        built,
        open: STATIONS.length - built,
        pct: Math.round((built / STATIONS.length) * 100),
        byAct: ACTS.map(act => {
            const list = stationsInAct(act.id);
            return { act, total: list.length, built: list.filter(s => s.built).length };
        }),
    };
}

// ============================================================
// 文
// ============================================================

export interface IndexedPhrase extends LifePhrase {
    stationNo: number;
    stationEn: string;
    stationJa: string;
    act: ActId;
}

/**
 * 全表現(必須6文 + バンク)。
 * **順番に意味は無い。** 学習者は既に大人で、習得順を再現する必要がない。
 * 網羅さえできていれば、ここからランダムに引いて覚えればいい。
 */
export function allPhrases(): IndexedPhrase[] {
    return STATIONS.flatMap(s =>
        [...s.phrases, ...bankFor(s.en)]
            .map(p => ({ ...p, stationNo: s.no, stationEn: s.en, stationJa: s.ja, act: s.act }))
    );
}

/** 必須6文だけ。窓口の骨格を見たいとき用 */
export function corePhrases(): IndexedPhrase[] {
    return STATIONS.flatMap(s =>
        s.phrases.map(p => ({ ...p, stationNo: s.no, stationEn: s.en, stationJa: s.ja, act: s.act }))
    );
}

/** ランダムに n 件引く。順番が無いことを実装で表明している */
export function drawRandom(n: number, pool: IndexedPhrase[] = allPhrases()): IndexedPhrase[] {
    const a = [...pool];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, n);
}

export function phrasesInAct(act: ActId): IndexedPhrase[] {
    return allPhrases().filter(p => p.act === act);
}

// ============================================================
// 表現バンク — 本体。目標2万。口語のみ。重心は0-30歳(窓口1-88)
// ============================================================

/** その窓口に積まれた表現(必須6文とは別)。まだ空なら [] */
export function bankOf(station: Station): LifePhrase[] {
    return bankFor(station.en);
}

/** 必須6文 + バンク。学習に使うのはこちら */
export function fullPhrases(station: Station): LifePhrase[] {
    return [...station.phrases, ...bankOf(station)];
}

export interface BankProgress {
    /** 積み上がった表現の総数(必須6文 + バンク) */
    total: number;
    /** 必須6文の合計 */
    core: number;
    /** バンクの合計 */
    banked: number;
    /** 目標。1窓口150 × 137窓口 */
    goal: number;
    pct: number;
    /** バンクに1件でも入っている窓口の数 */
    stationsStarted: number;
    stationsTotal: number;
}

export const BANK_GOAL_PER_STATION = 150;

export function bankProgress(): BankProgress {
    const core = STATIONS.reduce((n, s) => n + s.phrases.length, 0);
    const banked = bankTotal();
    const goal = STATIONS.length * BANK_GOAL_PER_STATION;
    return {
        total: core + banked,
        core,
        banked,
        goal,
        pct: Math.round(((core + banked) / goal) * 1000) / 10,
        stationsStarted: STATIONS.filter(s => bankOf(s).length > 0).length,
        stationsTotal: STATIONS.length,
    };
}

// ============================================================
// 人物 — 町民147人 と 職能38人 の両方から引く
// ============================================================

export interface CastMember {
    id: string;
    name: string;
    role: string;
    /** 町民か、窓口の向こう側か */
    kind: 'resident' | 'service';
}

export function castOf(station: Station): CastMember[] {
    return station.cast.map(id => {
        const p = getPerson(id);
        if (p) return { id, name: p.name, role: p.role, kind: 'resident' as const };
        const s = getLifelinePerson(id);
        if (s) return { id, name: s.name, role: s.role, kind: 'service' as const };
        return null;
    }).filter((c): c is CastMember => !!c);
}

/** その人物が通る窓口。一生のどこに配置されているかが見える */
export function stationsFor(personId: string): Station[] {
    return STATIONS.filter(s => s.cast.includes(personId));
}

/** どちらの名簿にも無い id を使っていたら壊れている。開発時の検知用 */
export function unknownCastIds(): string[] {
    const known = new Set([...PEOPLE.map(p => p.id), ...LIFELINE_PEOPLE.map(p => p.id)]);
    const bad = new Set<string>();
    for (const s of STATIONS) for (const id of s.cast) if (!known.has(id)) bad.add(id);
    return [...bad].sort();
}

/** ライフラインに1つも配置されていない町民。掘り残しの検出 */
export function unplacedResidents(): string[] {
    const placed = new Set(STATIONS.flatMap(s => s.cast));
    return PEOPLE.filter(p => !placed.has(p.id)).map(p => p.name);
}
