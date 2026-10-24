/**
 * Silent Bartender -- Gondo's letters.
 *
 * Short imagined voice-memos Gondo leaves behind, unlocked by
 * specific play milestones that feel earned. Separate from the
 * "fragments" system (which is pure history); letters are advice
 * to the apprentice, in his voice.
 *
 * Wire: show a single unlocked letter on the intro screen rarely
 * (e.g. 10% chance on return visits), or in a dedicated "手紙" panel.
 */

import type { PlayerStats } from '@/lib/english/bar/storage';

export interface GondoLetter {
    id: string;
    title: string;
    body: string;
    unlock: (stats: PlayerStats) => boolean;
}

export const GONDO_LETTERS: GondoLetter[] = [
    {
        id: 'letter-first-silence',
        title: '最初の静寂について',
        body:
            'お前が最初に黙ったのは、一番難しい客の時じゃない。\n' +
            '二番目の客の時だ。最初の客で緊張して、二番目で油断する。\n' +
            'そこが罠だ。毎夜、二番目の客に一番気を使え。',
        unlock: (s) => s.totalNights >= 3,
    },
    {
        id: 'letter-on-reading-moods',
        title: '気分の読み方',
        body:
            'カウンターの客の肘の位置を見ろ。\n' +
            '内側を向いていたら、一人で飲みたい。\n' +
            '外側を向いていたら、隣と話したがっている。\n' +
            'これは二十年かけて覚えた。お前は一夜で覚える必要はない。',
        unlock: (s) => s.totalNights >= 7,
    },
    {
        id: 'letter-on-returning-customers',
        title: '二度目の客',
        body:
            '二度目に来た客を、最初の客のように扱え。\n' +
            '「久しぶり」は俺が言う。お前は言うな。\n' +
            '客は、自分が覚えられていることを、気配だけで知る。',
        unlock: (s) => s.seenCustomerIds.length >= 20,
    },
    {
        id: 'letter-on-failure',
        title: '失敗について',
        body:
            '声を出した夜のことを、次の夜まで持ち越すな。\n' +
            '俺も最初の一年で三十回は失敗した。\n' +
            '失敗は酒と同じ。次の夜が来れば、薄まる。',
        unlock: (s) => s.lifetimeBusts >= 3,
    },
    {
        id: 'letter-on-closing',
        title: '閉店について',
        body:
            '五時に店を閉めるのは、客のためじゃない。\n' +
            '俺たちのためだ。\n' +
            '夜明けを待たない店は、結局どこかで折れる。',
        unlock: (s) => s.totalNights >= 15,
    },
    {
        id: 'letter-on-the-dog',
        title: '犬について',
        body:
            'あの犬は、前の常連のだった。\n' +
            '今もたまに来る。誰も飼い主の話はしない。\n' +
            '黙って水を出せば、それで足りる。',
        unlock: (s) => (s.moodStats.dog?.success ?? 0) >= 1,
    },
    {
        id: 'letter-on-the-ghost',
        title: '幽霊の常連',
        body:
            'あの席に誰もいないように見える夜がある。\n' +
            'それでも、グラスを置いてみろ。\n' +
            'もし氷が少し早く溶けたら、客はそこにいる。',
        unlock: (s) => (s.moodStats.ghost?.success ?? 0) >= 1,
    },
    {
        id: 'letter-on-the-edo',
        title: '時代をまたぐ客',
        body:
            '時代の違う客が来たら、驚くな。\n' +
            '全ての時代に、同じ酒がある。\n' +
            '熱燗を出せば、どの時代の客も、少し落ち着く。',
        unlock: (s) => (s.moodStats.edo?.success ?? 0) >= 1,
    },
    {
        id: 'letter-on-going-home',
        title: '家に帰ることについて',
        body:
            '店を閉めた後、すぐに家に帰れ。\n' +
            'カウンターに一人で残るな。\n' +
            'それは、客の仕事だ。',
        unlock: (s) => s.totalNights >= 30,
    },
    {
        id: 'letter-on-the-apron',
        title: '前掛けについて',
        body:
            'その前掛けは、俺の師匠から貰ったものだ。\n' +
            '師匠は、自分の師匠から貰った。\n' +
            'だから、お前もいつか、次に渡す。\n' +
            '今はまだ、それを考える必要はない。',
        unlock: (s) => s.totalNights >= 50,
    },
    {
        id: 'letter-on-one-year',
        title: '一年について',
        body:
            '365夜、立ち続けた。\n' +
            '俺が代打と呼んだ夜から、お前はもう代打じゃない。\n' +
            '暖簾は、お前のものでもある。',
        unlock: (s) => s.totalNights >= 365,
    },
    {
        id: 'letter-on-the-wife',
        title: '失恋の客について',
        body:
            '失恋したばかりの客には、何も言うな。\n' +
            '酒も、最初は水に薄めろ。\n' +
            '彼らは言葉じゃなく、時間を飲んでいる。',
        unlock: (s) => (s.moodStats.heartbroken?.success ?? 0) >= 3,
    },
    {
        id: 'letter-on-drunk-customers',
        title: '酔客について',
        body:
            '酔客が「もう一杯」と言った時、\n' +
            '出すか出さないかを決めるのは、お前じゃなくて客の顔だ。\n' +
            '目を見てから決めろ。',
        unlock: (s) => (s.moodStats.drunk?.success ?? 0) >= 3,
    },
    {
        id: 'letter-on-silent-mastery',
        title: '沈黙の熟練について',
        body:
            '100夜、声を出さなかった。\n' +
            'それは俺より上手い。\n' +
            '俺は昔、客に一度だけ本気で怒鳴った。後悔はしていない。だが、お前はそれをしなくていい。',
        unlock: (s) => s.totalNights >= 100 && s.lifetimeBusts === 0,
    },
    {
        id: 'letter-on-weather',
        title: '天気について',
        body:
            '雨の夜は、客が小さく見える。\n' +
            '晴れの夜は、客が大きく見える。\n' +
            'どちらの客も、同じ客だ。忘れるな。',
        unlock: (s) => s.totalNights >= 20,
    },
    {
        id: 'letter-on-the-regulars',
        title: '常連について',
        body:
            '常連は、新しい客より大変だ。\n' +
            '何も変わっていないふりをしながら、少しずつ変わっている客を見守れ。\n' +
            '去年の話を今夜する客は、多分、今夜の話ができない。',
        unlock: (s) => (s.moodStats.regular?.success ?? 0) >= 10,
    },
];

/** Return letters whose unlock condition is satisfied. */
export function getUnlockedLetters(stats: PlayerStats): GondoLetter[] {
    return GONDO_LETTERS.filter(l => l.unlock(stats));
}

/** Pick a random unlocked letter, or null if none unlocked. */
export function pickLetter(stats: PlayerStats, seed?: number): GondoLetter | null {
    const unlocked = getUnlockedLetters(stats);
    if (unlocked.length === 0) return null;
    const i = (seed ?? Date.now()) % unlocked.length;
    return unlocked[i];
}
