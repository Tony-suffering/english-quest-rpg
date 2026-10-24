/**
 * Silent Bartender -- specific calendar days of interest.
 *
 * Real-world Japanese calendar dates that trigger special content.
 * Each has a flavor line + recommended mood boost.
 */

import type { Mood } from './types';

export interface SpecialDay {
    id: string;
    month: number;
    day: number;
    name: string;         // JP
    flavor: string;       // JP, 1 line
    moodBoost?: Mood[];
}

export const SPECIAL_DAYS: SpecialDay[] = [
    { id: 'sd-new-year', month: 1, day: 1, name: '元日', flavor: '元日の夜。店は開けているだけで意味がある。', moodBoost: ['regular', 'celebrating'] },
    { id: 'sd-setsubun', month: 2, day: 3, name: '節分', flavor: '節分。豆を撒く音が外から聞こえる。', moodBoost: ['tired'] },
    { id: 'sd-hinamatsuri', month: 3, day: 3, name: 'ひな祭り', flavor: 'ひな祭り。甘酒を出しておこう。', moodBoost: ['celebrating'] },
    { id: 'sd-hanami-start', month: 3, day: 25, name: '桜開花', flavor: '桜が咲き始めた。花びらが一枚、カウンターに迷い込んでくる。', moodBoost: ['nervous', 'celebrating'] },
    { id: 'sd-entrance-ceremony', month: 4, day: 1, name: '入学式', flavor: '新年度の夜。スーツの客が多い。', moodBoost: ['first-time', 'nervous'] },
    { id: 'sd-golden-week', month: 5, day: 3, name: 'ゴールデンウィーク', flavor: '連休の夜。観光客が混ざる。', moodBoost: ['first-time'] },
    { id: 'sd-tanabata', month: 7, day: 7, name: '七夕', flavor: '七夕。願いを書いた短冊を持った客がいる。', moodBoost: ['nervous', 'existential'] },
    { id: 'sd-obon', month: 8, day: 15, name: 'お盆', flavor: 'お盆の夜。亡くなった常連を思い出す客が多い。', moodBoost: ['ghost', 'homesick'] },
    { id: 'sd-tsukimi', month: 9, day: 15, name: '中秋の名月', flavor: '十五夜。月が大きい。', moodBoost: ['regular', 'existential'] },
    { id: 'sd-halloween', month: 10, day: 31, name: 'ハロウィン', flavor: 'ハロウィン。仮装の客が迷い込むかもしれない。', moodBoost: ['celebrating', 'suspicious'] },
    { id: 'sd-bunka-day', month: 11, day: 3, name: '文化の日', flavor: '文化の日。読書や芸術の話が増える。', moodBoost: ['existential', 'curious'] },
    { id: 'sd-christmas-eve', month: 12, day: 24, name: 'クリスマスイブ', flavor: 'クリスマスイブ。一人の客が多い、それが不思議。', moodBoost: ['heartbroken', 'homesick'] },
    { id: 'sd-toshikoshi', month: 12, day: 31, name: '大晦日', flavor: '大晦日。年越しそばの香りが漂う。', moodBoost: ['regular', 'existential'] },
];

function jstToday(): { month: number; day: number } {
    const d = new Date();
    const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
    return { month: jst.getUTCMonth() + 1, day: jst.getUTCDate() };
}

/** Return today's special day, or null. */
export function getTodaysSpecial(date?: Date): SpecialDay | null {
    const { month, day } = date
        ? { month: date.getMonth() + 1, day: date.getDate() }
        : jstToday();
    return SPECIAL_DAYS.find(s => s.month === month && s.day === day) ?? null;
}
