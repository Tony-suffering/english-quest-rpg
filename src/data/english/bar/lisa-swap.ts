/**
 * Silent Bartender — Lisa takeover night.
 *
 * On every 7th night (after the first), the player has the option to play as
 * リサ instead of the nameless apprentice. The bar is hers for the night:
 * 権藤 is away, she runs the counter her way. Warmer than Gondo, more
 * sarcastic, a little tired of being underestimated. Still takes the work
 * seriously — just wears it lightly.
 *
 * All Japanese. No emojis.
 */

import type { GondoRoast } from './types';
import type { Ending } from './narrative';
import type { PlayerStats } from '@/lib/english/bar/storage';

// ───────────────────────────────────────────────────────────
// Eligibility
// ───────────────────────────────────────────────────────────

/**
 * Lisa-night slots open every 7th completed night after the first.
 * (totalNights = 7, 14, 21, ...). Night 0 is ineligible.
 */
export function isLisaNightEligible(stats: PlayerStats): boolean {
    const n = stats?.totalNights ?? 0;
    return n > 0 && n % 7 === 0;
}

// ───────────────────────────────────────────────────────────
// Intro — Lisa's POV. Short flavor lines shown under the prologue title.
// ───────────────────────────────────────────────────────────

export const LISA_INTRO_BEATS: string[] = [
    '今夜は権藤さん、休み。「鍵、任せた」とだけ言って、裏口から出ていった。今夜はあたしの店。',
    '「あんたに任せる」って、あの人にしては長い台詞だった。前掛けを少しきつめに結び直す。',
    'カウンターの内側に立つと、世界の見え方が違う。権藤さんがいつも見てる景色、今夜はあたしの景色。',
    '権藤さん、たぶん今頃どこかで一人で飲んでる。こっちはこっちでやるから、心配しないで。',
    '「いつも通り」って言われたけど、いつも通りはあたしの流儀でやらせてもらう。氷、砕く音から変える。',
];

// ───────────────────────────────────────────────────────────
// Lisa's reactions when the player (=Lisa) speaks.
// Warmer, more sarcastic, less dismissive than Gondo.
// These are Lisa's internal voice / self-talk on a slip.
// ───────────────────────────────────────────────────────────

export const LISA_ROASTS: GondoRoast[] = [
    // Generic — Lisa catching herself
    { jp: 'あ、声出た。権藤さんに聞かれたら一週間無視されるやつ', context: 'generic' },
    { jp: 'しまった、口が先。いつもの癖', context: 'generic' },
    { jp: 'ほら、言わないって決めたのに', context: 'generic' },
    { jp: '舌の軽さは遺伝。ごめん、お父さん', context: 'generic' },
    { jp: '静かにやるって、自分に言い聞かせたばっかりでしょ', context: 'generic' },
    { jp: '権藤さん流じゃない。あたし流でもない、ただの雑音', context: 'generic' },

    // First customer — Lisa being a bit embarrassed early
    { jp: '一人目で？さすがに早いって、自分で', context: 'first-customer' },
    { jp: 'まだ暖簾も温まってないのに、声から入るんだ', context: 'first-customer' },

    // Late-game — Lisa when it hurts
    { jp: 'ここまで黙れてたのに。ほんと惜しい、あたし', context: 'late-game' },
    { jp: 'あと少しだったのに、口が裏切った', context: 'late-game' },
    { jp: '最後の一杯で崩すの、一番かっこ悪いやつ', context: 'late-game' },

    // Repeat bust — Lisa done with herself
    { jp: 'また？学習しないね、あたし', context: 'repeat-bust' },
    { jp: 'これ、権藤さんに絶対言えないやつ', context: 'repeat-bust' },
];

// ───────────────────────────────────────────────────────────
// Endings — Lisa's voice, one entry per tier.
// ───────────────────────────────────────────────────────────

export const LISA_ENDINGS: Ending[] = [
    {
        tier: 'master',
        title: '完全営業 — 5:00 AM(リサ)',
        body:
            '最後のグラスを磨き終えて、明け方の空を見る。権藤さんには今夜のこと、たぶん言わない。' +
            '言わなくても、カウンターの並びで分かる人だから。',
    },
    {
        tier: 'pro',
        title: '悪くない夜(リサ)',
        body:
            '空のグラスが並んでいる。八割は届いた。残りは、明日のあたしの宿題。' +
            '権藤さんの椅子に座って、一秒だけ休む。',
    },
    {
        tier: 'ok',
        title: 'まあまあ(リサ)',
        body:
            'カウンターを拭きながら、自分に点をつける。及第点、ぎりぎり。' +
            '権藤さんだったら何も言わないで湯呑みを置くやつ。',
    },
    {
        tier: 'rough',
        title: '悔しい夜(リサ)',
        body:
            '氷の溶けた音が、いつもより大きく聞こえる。' +
            '「女だから」じゃない。単に今夜のあたしが、足りなかっただけ。',
    },
    {
        tier: 'bust',
        title: 'ごめん、権藤さん(リサ)',
        body:
            'カウンターに肘をついて、一度だけ深く息を吐く。' +
            '鍵を閉めて、誰にも見られないように、裏の路地から帰る。',
    },
];
