/**
 * Silent Bartender -- themed nights.
 *
 * Rare random themed nights that bias the customer pool toward a
 * specific emotional register. Decorates the intro screen and
 * subtly skews the roster.
 */

import type { Mood } from './types';

export type NightTheme =
    | 'goodbyes'       // heartbroken / nervous / regular (who won't return)
    | 'celebrations'   // celebrating / curious / first-time
    | 'regulars'       // regular / tired / homesick
    | 'strangers'      // first-time / suspicious / curious
    | 'deep-silence'   // ghost / dog / alien / existential
    | 'lively'         // drunk / celebrating / curious
    | 'melancholy'     // heartbroken / homesick / existential
    | 'plain';         // no theme (fallback)

export interface ThemedNight {
    id: NightTheme;
    label: string;
    flavor: string;
    favoredMoods: Mood[];
    chance: number;  // relative probability
}

export const THEMED_NIGHTS: ThemedNight[] = [
    {
        id: 'goodbyes',
        label: '別れの夜',
        flavor: '今夜は、別れを告げる客が集まる気配がある。',
        favoredMoods: ['heartbroken', 'nervous', 'regular'],
        chance: 1,
    },
    {
        id: 'celebrations',
        label: '祝いの夜',
        flavor: '今夜は、何かを祝う客が多い。',
        favoredMoods: ['celebrating', 'curious', 'first-time'],
        chance: 1,
    },
    {
        id: 'regulars',
        label: '常連の夜',
        flavor: '今夜は、顔馴染みが中心の夜。',
        favoredMoods: ['regular', 'tired', 'homesick'],
        chance: 2,
    },
    {
        id: 'strangers',
        label: '見知らぬ夜',
        flavor: '今夜は、初めて来る客ばかりだ。',
        favoredMoods: ['first-time', 'suspicious', 'curious'],
        chance: 1,
    },
    {
        id: 'deep-silence',
        label: '深い沈黙の夜',
        flavor: '今夜は、言葉を持たない客が多い。',
        favoredMoods: ['ghost', 'dog', 'alien', 'existential'],
        chance: 0.5,
    },
    {
        id: 'lively',
        label: '賑やかな夜',
        flavor: '今夜は、賑やかになりそうだ。',
        favoredMoods: ['drunk', 'celebrating', 'curious'],
        chance: 1.5,
    },
    {
        id: 'melancholy',
        label: '淋しい夜',
        flavor: '今夜は、客が少し影を背負っている。',
        favoredMoods: ['heartbroken', 'homesick', 'existential'],
        chance: 1,
    },
    {
        id: 'plain',
        label: 'いつもの夜',
        flavor: 'いつも通りの、普通の夜。',
        favoredMoods: [],
        chance: 4,
    },
];

/** Pick a theme weighted by chance. */
export function pickNightTheme(): ThemedNight {
    const totalWeight = THEMED_NIGHTS.reduce((s, t) => s + t.chance, 0);
    let r = Math.random() * totalWeight;
    for (const t of THEMED_NIGHTS) {
        r -= t.chance;
        if (r <= 0) return t;
    }
    return THEMED_NIGHTS[THEMED_NIGHTS.length - 1];
}
