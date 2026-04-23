import type { Native365Day } from '@/types/native365';
import { DAY_01 } from './day-01';
import { DAY_02 } from './day-02';
import { DAY_03 } from './day-03';
import { DAY_04 } from './day-04';
import { DAY_05 } from './day-05';
import { DAY_06 } from './day-06';
import { DAY_07 } from './day-07';
import { DAY_08 } from './day-08';
import { DAY_09 } from './day-09';
import { DAY_10 } from './day-10';
import { DAY_11 } from './day-11';
import { DAY_12 } from './day-12';
import { DAY_13 } from './day-13';
import { DAY_14 } from './day-14';
import { DAY_15 } from './day-15';
import { DAY_16 } from './day-16';
import { DAY_17 } from './day-17';
import { DAY_18 } from './day-18';
import { DAY_19 } from './day-19';
import { DAY_20 } from './day-20';
import { DAY_21 } from './day-21';
import { DAY_22 } from './day-22';
import { DAY_23 } from './day-23';
import { DAY_24 } from './day-24';
import { DAY_25 } from './day-25';
import { DAY_26 } from './day-26';
import { DAY_27 } from './day-27';
import { DAY_28 } from './day-28';
import { DAY_29 } from './day-29';
import { DAY_30 } from './day-30';

/**
 * ネイティブ365 -- Month 1 index
 *
 * 各日 = 発音 1テーマ + 文法 1テーマ。組み合わせで英検1級前後の壁を30日で潰す。
 */

// Month 1 day plan (発音 + 文法 の両建て)
// 実データが未作成の日はタイトルだけ登録してプレースホルダにしとく
export interface Native365DayPlan {
    day: number;
    pronunciation: string;
    grammar: string;
}

export const NATIVE365_MONTH1_PLAN: Native365DayPlan[] = [
    { day: 1,  pronunciation: 'schwa /ə/',                           grammar: '現在完了 vs 過去形' },
    { day: 2,  pronunciation: '語強勢の山 (PRE-sent vs pre-SENT)',   grammar: 'will vs going to vs be -ing' },
    { day: 3,  pronunciation: '連結 (linking)',                      grammar: '仮定法過去 -- 形と時制のズレ' },
    { day: 4,  pronunciation: '縮約 (gonna / wanna / hafta / gotta)', grammar: '動名詞 vs to 不定詞 -- 動詞で分かれる' },
    { day: 5,  pronunciation: '/t/ flap (water / letter / butter)',   grammar: '冠詞 a / the / ゼロ の決定木' },
    { day: 6,  pronunciation: 'dark L (feel / milk / cold)',          grammar: 'in / on / at -- 空間' },
    { day: 7,  pronunciation: 'イントネーション (上がり下がりの意味)', grammar: 'in / on / at -- 時間' },
    { day: 8,  pronunciation: '-ed の3音 (/t/ /d/ /ɪd/)',              grammar: '受動態 -- 実際に使う場面だけ' },
    { day: 9,  pronunciation: '-s の3音 (/s/ /z/ /ɪz/)',               grammar: 'must / have to / should の住み分け' },
    { day: 10, pronunciation: 'th sound (θ / ð)',                     grammar: '現在完了進行形 vs 現在完了' },
    { day: 11, pronunciation: 'r と l の母音化',                       grammar: '関係代名詞 that / which / who' },
    { day: 12, pronunciation: '弱形 vs 強形 (can / at / for / and)',   grammar: 'used to vs would -- 過去の習慣' },
    { day: 13, pronunciation: '長母音 (beat / bit / bought / but)',    grammar: '仮定法過去完了 -- 後悔の型' },
    { day: 14, pronunciation: '二重母音 (day / my / boy / cow)',       grammar: '比較級 -- the + 比較級 の応用' },
    { day: 15, pronunciation: '連結 + flap の合わせ技 (lot of)',       grammar: 'tell / say / speak / talk の境界' },
    { day: 16, pronunciation: '文頭の弱化 (it\'s / there\'s / I\'ve)', grammar: 'make / do / have / get -- 使い分け' },
    { day: 17, pronunciation: '文中の強勢 (content vs function)',      grammar: '句動詞 get off / over / through' },
    { day: 18, pronunciation: 'Q&A の上げ下げ',                        grammar: 'for vs since vs during' },
    { day: 19, pronunciation: '頭子音の脱落 (I don\'t know -> I\'on\'no)', grammar: '倒置 (Had I known / Should you need)' },
    { day: 20, pronunciation: '母音同化',                              grammar: '動名詞を目的語に取る動詞 (enjoy / avoid / finish)' },
    { day: 21, pronunciation: 'want / what / that の強弱',             grammar: '仮主語 It is ... that / for ...' },
    { day: 22, pronunciation: 'well の発音と用法',                     grammar: '付加疑問文 (tag question)' },
    { day: 23, pronunciation: 'so の発音と用法',                       grammar: '強調構文 It is ... that' },
    { day: 24, pronunciation: 'like の発音と4用法',                    grammar: '条件文の時制調整' },
    { day: 25, pronunciation: 'actually の発音と機能',                 grammar: '依頼の丁寧度 (Can / Could / Would)' },
    { day: 26, pronunciation: 'you know の発音と用法',                 grammar: '分詞構文' },
    { day: 27, pronunciation: 'I mean の発音と用法',                   grammar: '関係副詞 where / when / why' },
    { day: 28, pronunciation: 'filler / hedging の発音',               grammar: '名詞を動詞化 (google it / DM me)' },
    { day: 29, pronunciation: '発音の総まとめ (1シーン統合)',          grammar: '文法の総まとめ (同シーン統合)' },
    { day: 30, pronunciation: '実戦パック -- 発音',                    grammar: '実戦パック -- 文法' },
];

// ─── Actual data (populated days) ───────────────────
export const NATIVE365_DAYS: Record<number, Native365Day> = {
    1: DAY_01,
    2: DAY_02,
    3: DAY_03,
    4: DAY_04,
    5: DAY_05,
    6: DAY_06,
    7: DAY_07,
    8: DAY_08,
    9: DAY_09,
    10: DAY_10,
    11: DAY_11,
    12: DAY_12,
    13: DAY_13,
    14: DAY_14,
    15: DAY_15,
    16: DAY_16,
    17: DAY_17,
    18: DAY_18,
    19: DAY_19,
    20: DAY_20,
    21: DAY_21,
    22: DAY_22,
    23: DAY_23,
    24: DAY_24,
    25: DAY_25,
    26: DAY_26,
    27: DAY_27,
    28: DAY_28,
    29: DAY_29,
    30: DAY_30,
};

export function getNative365Day(dayNum: number): Native365Day | null {
    return NATIVE365_DAYS[dayNum] ?? null;
}

export function isNative365DayReady(dayNum: number): boolean {
    return dayNum in NATIVE365_DAYS;
}
