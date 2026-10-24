/**
 * Gondo's roast lines -- shown when player speaks out loud
 * and the mic watchdog triggers.
 *
 * Tagged by context so the page can pick a line that matches
 * the moment of the bust.
 */

import type { GondoRoast } from './types';

export const GONDO_ROASTS: GondoRoast[] = [
    // Generic — useful for any bust
    { jp: '黙れと言ったろ', context: 'generic' },
    { jp: '声、出したな？', context: 'generic' },
    { jp: '今の、聞こえたぞ', context: 'generic' },
    { jp: 'ダメだ、また明日', context: 'generic' },
    { jp: '口じゃない、目で見ろ', context: 'generic' },
    { jp: '声は命だ。無駄にするな', context: 'generic' },
    { jp: '静かにやれと何度言わせる', context: 'generic' },
    { jp: '舌より耳だ', context: 'generic' },

    // First customer — mercy with edge
    { jp: 'お前、まだ早い', context: 'first-customer' },
    { jp: '客一人も見てないうちにか', context: 'first-customer' },
    { jp: '落ち着け。まだ暖簾も揺れてない', context: 'first-customer' },

    // Late-game — the punishing kind
    { jp: 'ここまで来て、その声か', context: 'late-game' },
    { jp: '閉店前に全部台無しだ', context: 'late-game' },
    { jp: 'あと一人だっただろうが', context: 'late-game' },

    // Repeat bust — when the player keeps coming back to fail
    { jp: 'また来たのか。また黙れなかったか', context: 'repeat-bust' },
    { jp: '何度目だ。俺の店は静かな店だ', context: 'repeat-bust' },
    { jp: '学ばん奴だな', context: 'repeat-bust' },

    // More generic — for variety
    { jp: '沈黙は営業の基本だ', context: 'generic' },
    { jp: 'カウンターは、声を置く場所じゃない', context: 'generic' },
    { jp: '客が先に話せ。お前は最後だ', context: 'generic' },
    { jp: '勿体ない。今の客、読めそうだったぞ', context: 'generic' },
    { jp: 'お前の声は、客の邪魔をする', context: 'generic' },
    { jp: '口を閉じる訓練、あるぞ。禅寺だ', context: 'generic' },
    { jp: '「静」を書いて貼っておけ、鏡に', context: 'generic' },

    // Late-game additions
    { jp: 'せっかく数えてたのにな、俺は', context: 'late-game' },
    { jp: '9割できた。10割ではない', context: 'late-game' },
    { jp: '暖簾下ろす前に壊すな', context: 'late-game' },

    // First-customer additions
    { jp: 'まだ扉を撫でただけだぞ', context: 'first-customer' },
    { jp: '一杯目で終わるのか', context: 'first-customer' },
];

/** Pick a roast, preferring the given context but falling back to generic. */
export function pickRoast(context: GondoRoast['context'] = 'generic'): GondoRoast {
    const primary = GONDO_ROASTS.filter(r => r.context === context);
    const pool = primary.length > 0
        ? [...primary, ...GONDO_ROASTS.filter(r => r.context === 'generic')]
        : GONDO_ROASTS.filter(r => r.context === 'generic');
    return pool[Math.floor(Math.random() * pool.length)];
}
