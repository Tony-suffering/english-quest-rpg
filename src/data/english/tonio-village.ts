/**
 * とにお村 — 実在の100人の村
 *
 * ■ これは何か
 * 実在の人間100人から「英語の恥」を1体ずつもらい、村民として登録する。
 * 入場料は恥1体。統一原理(失った者が、報酬を受け取る)がそのまま入村規約である。
 *
 * ■ 世界での位置
 * 村民は実在の人間なので、創作の土地(Tonio Town / 居酒屋)には入れない(境界法則)。
 * 村は実録側の土地であり、寄贈された恥は英語動物園の該当館に収蔵される。
 * 村民は「寄贈者」として世界に名前が残る。これが報酬。
 *
 * ■ 運用ルール
 * - 定員100人。先着。10人で開村。
 * - 1人1ファイルではなく、この配列に1エントリ(データ量が小さいため)。
 * - ハンドル名可。掲載は本人の同意があるものだけ。削除依頼には即応じる。
 * - 悪意ある投稿(他人の恥の無断投稿など)は掲載しない。掲載判断は全件とにおが行う。
 * - 村民が増えるたび、noteで号外を出す(動物園の新種告知と同じエンジン)。
 *
 * ■ 収集
 * Googleフォーム5問(5分以内): ハンドル / 年齢帯・職業 / 英語で言った最悪の一言 /
 * 何が起きたか(2〜3行) / 英語との今の関係(1行)。
 * フォーム回答をこの配列に変換して掲載する。
 */

import type { Land } from './tonio-world';

/** 寄贈先の館(英語動物園)。tonio-world.ts の ZOO_HALLS に対応 */
export type DonatedHall = 'coinage' | 'slip' | 'direction' | 'attendance' | 'other';

export interface Villager {
    /** 村民番号。入村順の連番 */
    no: number;
    /** ハンドル名(実名不要) */
    handle: string;
    /** 年齢帯・職業(本人の申告のまま) */
    profile: string;
    /** 英語で言った最悪の一言(原文のまま。これが寄贈される恥) */
    worstLine: string;
    /** 何が起きたか(2〜3行) */
    story: string;
    /** 英語との今の関係(1行) */
    relation: string;
    /** 寄贈先の館 */
    hall: DonatedHall;
    /** 入村日 */
    joined: string;
    /** とにおからの一言(受領書。刃は本人に向けない — 村民は客であり、笑いの対象は状況のほう) */
    receipt: string;
}

export const VILLAGE_META = {
    name: 'とにお村',
    en: 'The Village of One Hundred',
    capacity: 100,
    openAt: 10, // この人数で開村
    law: '失った者が、報酬を受け取る。',
    entry: '入場料は、英語の恥1体。',
    note: '村民は実在の人間である。だから創作の町 Tonio Town には住めない。'
        + '代わりに、寄贈した恥が英語動物園に収蔵され、寄贈者として世界に名前が残る。',
    land: 'record' as Land,
} as const;

export const HALL_LABELS: Record<DonatedHall, string> = {
    coinage: '捏造館(存在しない単語)',
    slip: '訛り館(音が滑った)',
    direction: '方向館(向きが逆)',
    attendance: '勤怠舎(冠詞・三単現など)',
    other: '検討中(分類待ち)',
};

export const VILLAGERS: Villager[] = [
    {
        no: 1,
        handle: 'とにお',
        profile: '40代・ドライバー',
        worstLine: "I'm a somewhat more or less serious English.",
        story: '英会話で「俺はどちらかといえば真面目にやってる」と言おうとして、自分が英語そのものになった。'
            + '講師は動じなかった。プロである。',
        relation: '毎晩25分。5年聞いて、70夜喋っている。',
        hall: 'direction',
        joined: '2026-07-31',
        receipt: '村長自ら入場料を納めた。人間が言語になった標本は、方向館でも最大級である。'
            + 'この村の審査基準がこの水準だと思ってもらっていい。安心して恥を持ってきてほしい。',
    },
];

export function villageStatus() {
    const count = VILLAGERS.length;
    return {
        count,
        capacity: VILLAGE_META.capacity,
        remaining: VILLAGE_META.capacity - count,
        isOpen: count >= VILLAGE_META.openAt,
        phase: count >= VILLAGE_META.capacity ? '満村' : count >= VILLAGE_META.openAt ? '開村' : '開村準備中',
    };
}
