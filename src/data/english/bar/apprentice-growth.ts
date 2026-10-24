/**
 * Silent Bartender -- apprentice growth.
 *
 * Tiny internal-monologue beats that mark the apprentice's slow, quiet
 * professional growth across many nights behind the counter. These are
 * not inspiring, not dramatic -- just small noticings: the bar becoming
 * more legible, the self becoming less loud.
 *
 * Each beat is keyed to a minimum `unlockAfterNights` threshold and fires
 * rarely, at the milestone night counts between 5 and 1000. The tone
 * sits closer to Murakami or Ogawa than to a coaching manual: literary,
 * observational, first-person only when unavoidable.
 *
 * Integration note:
 *   - `currentGrowthBeat(n)` returns the most recent beat at or before `n`.
 *   - `getUnlockedGrowth(n)` returns every beat unlocked so far.
 *
 * Japanese only. No emoji. No drama.
 */

// ───────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────

export interface ApprenticeGrowthBeat {
    /** Stable id in the form 'growth-<n>-<slug>'. */
    id: string;
    /** Minimum totalNights at which this beat becomes available. */
    unlockAfterNights: number;
    /** 1-3 line Japanese body, literary register. */
    body: string;
    /** What kind of noticing this beat records. */
    category: 'craft' | 'awareness' | 'relationship' | 'acceptance';
}

// ───────────────────────────────────────────────────────────
// Growth table (strictly ascending by unlockAfterNights)
// ───────────────────────────────────────────────────────────

export const APPRENTICE_GROWTH: ApprenticeGrowthBeat[] = [
    {
        id: 'growth-5-ice-sound',
        unlockAfterNights: 5,
        body: '氷の音が、昨日より少しだけ遠くに聞こえる。\n耳が慣れてきたのか、手が慣れてきたのか、まだ分からない。',
        category: 'craft',
    },
    {
        id: 'growth-10-door-weight',
        unlockAfterNights: 10,
        body: '扉の重さで、今夜来た客の肩の幅が、だいたい想像できるようになった。',
        category: 'awareness',
    },
    {
        id: 'growth-15-pour-angle',
        unlockAfterNights: 15,
        body: '瓶を傾ける角度を、考える前に手が決めている。\n考えていた頃の自分のことは、もうあまり覚えていない。',
        category: 'craft',
    },
    {
        id: 'growth-20-gondo-cough',
        unlockAfterNights: 20,
        body: '権藤の咳払いが、昨日より短い。\n意味があるのかないのか、訊くつもりはない。',
        category: 'relationship',
    },
    {
        id: 'growth-30-ice-time',
        unlockAfterNights: 30,
        body: '今夜は、氷の音だけで時間が分かった。\n時計を見る回数が、ひとつ減った。',
        category: 'craft',
    },
    {
        id: 'growth-30-silence-weight',
        unlockAfterNights: 30,
        body: '沈黙が重いと感じる夜と、軽いと感じる夜がある。\n今夜はどちらでもなかった。',
        category: 'awareness',
    },
    {
        id: 'growth-40-glass-choice',
        unlockAfterNights: 40,
        body: 'グラスを選ぶ手が、先に動く。\n客の顔を見るのは、その後になった。',
        category: 'craft',
    },
    {
        id: 'growth-50-order-shape',
        unlockAfterNights: 50,
        body: '注文される前に、何が注文されるか、輪郭だけが見えることがある。\n当たることも、外れることもある。',
        category: 'awareness',
    },
    {
        id: 'growth-50-less-wanting',
        unlockAfterNights: 50,
        body: '誉められたい気持ちが、少しだけ小さくなった。\n消えたわけではない。',
        category: 'acceptance',
    },
    {
        id: 'growth-70-gondo-back',
        unlockAfterNights: 70,
        body: '奥に戻る権藤の背中が、以前より近く見える。\n距離が縮まったのか、目が慣れただけなのか。',
        category: 'relationship',
    },
    {
        id: 'growth-100-bar-map',
        unlockAfterNights: 100,
        body: '目を閉じても、カウンターの上の物の位置が分かる。\nそれを誰かに話す相手もいない。',
        category: 'craft',
    },
    {
        id: 'growth-150-reading-quiet',
        unlockAfterNights: 150,
        body: '黙って座った客の、黙り方の種類が、少しずつ違って聞こえる。',
        category: 'awareness',
    },
    {
        id: 'growth-200-failure-size',
        unlockAfterNights: 200,
        body: '失敗した夜のことを、前より早く忘れられるようになった。\n覚えておくべきものは、別にあると分かってきた。',
        category: 'acceptance',
    },
    {
        id: 'growth-300-gondo-eyes',
        unlockAfterNights: 300,
        body: '権藤と目が合う回数が、少し増えた。\nどちらも、それについて何も言わない。',
        category: 'relationship',
    },
    {
        id: 'growth-300-hand-memory',
        unlockAfterNights: 300,
        body: '指先が、瓶の残量を重さで知っている。\nいつからそうだったか、思い出せない。',
        category: 'craft',
    },
    {
        id: 'growth-500-own-limit',
        unlockAfterNights: 500,
        body: 'できないことの輪郭が、前よりはっきりしてきた。\nそれは諦めではなく、ただの地図のようなものだ。',
        category: 'acceptance',
    },
    {
        id: 'growth-500-bar-breath',
        unlockAfterNights: 500,
        body: '店そのものが、息をしているように感じる夜がある。\n自分もその呼吸の一部だと、ようやく気づいた。',
        category: 'awareness',
    },
    {
        id: 'growth-700-gondo-silence',
        unlockAfterNights: 700,
        body: '権藤の沈黙が、以前ほど謎ではなくなった。\nただ、まだ全部は読めない。',
        category: 'relationship',
    },
    {
        id: 'growth-1000-nothing-special',
        unlockAfterNights: 1000,
        body: '特別なことは、何も起きなかった。\n氷を割り、暖簾を出し、客を迎え、見送った。\nそれで充分だった。',
        category: 'acceptance',
    },
    {
        id: 'growth-1000-small-bar',
        unlockAfterNights: 1000,
        body: 'この小さな店で、小さな手つきを重ねてきた。\nそれ以外のことは、最初から自分の仕事ではなかった。',
        category: 'acceptance',
    },
];

// ───────────────────────────────────────────────────────────
// Lookups
// ───────────────────────────────────────────────────────────

/**
 * Returns the most recent growth beat at or before the given night count,
 * or null if the player has not yet reached the first threshold.
 */
export function currentGrowthBeat(totalNights: number): ApprenticeGrowthBeat | null {
    let current: ApprenticeGrowthBeat | null = null;
    for (const beat of APPRENTICE_GROWTH) {
        if (beat.unlockAfterNights <= totalNights) {
            current = beat;
        } else {
            break;
        }
    }
    return current;
}

/**
 * Returns every growth beat unlocked so far, in ascending order.
 */
export function getUnlockedGrowth(totalNights: number): ApprenticeGrowthBeat[] {
    return APPRENTICE_GROWTH.filter((beat) => beat.unlockAfterNights <= totalNights);
}
