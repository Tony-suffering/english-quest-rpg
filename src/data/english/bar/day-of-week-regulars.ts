/**
 * Silent Bartender -- day-of-week regulars.
 *
 * Each weekday has 2-3 "regulars" who reliably appear. Adds texture
 * across a week of play, makes Monday feel different from Friday.
 *
 * Pure helper; not wired by default. Callers can merge the output
 * of `getDayOfWeekRegulars()` into the night roster.
 */

import type { Customer } from './types';

// day 0 = Sun, 1 = Mon, ... 6 = Sat
export const DOW_REGULARS: Record<number, Customer[]> = {
    // Sunday -- quiet, slow
    0: [
        {
            id: 'dow-sun-family-father',
            name: "FAMILY FATHER",
            mood: 'tired',
            tag: 'Sunday night, kids finally in bed',
            line: "Let me have thirty minutes before I go back upstairs. Quietly.",
            cards: [
                "Cold draft, nothing to think about, one glass",
                "A flight of five tasting sakes",
                "Our complex signature cocktail",
                "Triple espresso martini",
            ],
            reaction: {
                success: "...yes. Thirty minutes. Thank you.",
                failure: "...I do not have time for this.",
            },
            phase: 'peak',
            difficulty: 2,
        },
        {
            id: 'dow-sun-prep-for-monday',
            name: "PREPARING FOR MONDAY",
            mood: 'nervous',
            tag: 'dreading what is at his desk',
            line: "Tomorrow there is a meeting I cannot miss. One drink. Light.",
            cards: [
                "A single light beer, and water on the side",
                "A strong whiskey to forget",
                "A triple shot of espresso",
                "Three rounds of shots",
            ],
            reaction: {
                success: "Yes. Water is the actual medicine. Thank you.",
                failure: "...that will ruin Monday.",
            },
            phase: 'peak',
            difficulty: 2,
        },
    ],
    // Monday -- recovery
    1: [
        {
            id: 'dow-mon-recovery',
            name: "MONDAY AFTER",
            mood: 'tired',
            tag: 'survived the first meeting',
            line: "I survived Monday. The smallest drink you have.",
            cards: [
                "Half a beer. Small glass. Pretty.",
                "A full pint of strong lager",
                "A whiskey neat",
                "Triple espresso",
            ],
            reaction: {
                success: "...yes. That is the right size.",
                failure: "...too much.",
            },
            phase: 'peak',
            difficulty: 2,
        },
    ],
    // Tuesday -- the underrated night
    2: [
        {
            id: 'dow-tue-quiet-regular',
            name: "TUESDAY REGULAR",
            mood: 'regular',
            tag: 'comes every Tuesday, never says why',
            line: "Same as always. You know.",
            cards: [
                "The usual -- hot sake, edamame, the corner seat ready",
                "Something brand new for you tonight",
                "Our sparkling release this week",
                "A triple espresso martini",
            ],
            reaction: {
                success: "...good. Consistency is a gift.",
                failure: "...that is not what I order.",
            },
            phase: 'peak',
            difficulty: 3,
        },
        {
            id: 'dow-tue-widow',
            name: "TUESDAY WIDOW",
            mood: 'ghost',
            tag: 'Tuesday was their shared night',
            line: "Two cups, please. He cannot come, but still, two.",
            cards: [
                "[Pour two cups of hot sake. Place one in front of the empty stool.]",
                "One cup of her favorite",
                "A full bottle for the table",
                "The bathroom is on the left",
            ],
            reaction: {
                success: "...thank you for understanding without explaining.",
                failure: "...you do not understand, but that is okay.",
            },
            phase: 'late',
            difficulty: 5,
            beat: '財布は出さない。毎週、勘定は帰りに置いていく。',
        },
    ],
    // Wednesday -- the slump
    3: [
        {
            id: 'dow-wed-slump',
            name: "MIDWEEK SLUMP",
            mood: 'tired',
            tag: 'only halfway through',
            line: "Still two days until the weekend. Tell me something that helps.",
            cards: [
                "A warm cup of tea, honestly",
                "Our strongest whiskey to power through",
                "A triple espresso martini",
                "A full bottle of wine",
            ],
            reaction: {
                success: "...I needed that. Not alcohol. Just warm.",
                failure: "...you are not helping.",
            },
            phase: 'peak',
            difficulty: 3,
        },
    ],
    // Thursday -- almost there
    4: [
        {
            id: 'dow-thu-almost-there',
            name: "THURSDAY COUNT",
            mood: 'celebrating',
            tag: 'one day from the weekend',
            line: "Tomorrow is Friday. I can taste it. Give me something tomorrow-flavored.",
            cards: [
                "A light, sparkling thing with a slice of lemon",
                "Our sake flight for the weekend",
                "A strong whiskey neat",
                "A water with lime",
            ],
            reaction: {
                success: "Yes. That is tomorrow. Thank you.",
                failure: "...that does not taste like tomorrow.",
            },
            phase: 'peak',
            difficulty: 2,
        },
    ],
    // Friday -- explosion
    5: [
        {
            id: 'dow-fri-released',
            name: "RELEASED",
            mood: 'celebrating',
            tag: 'just walked out of the office',
            line: "I have no responsibilities until Monday. Give me what that feels like.",
            cards: [
                "Cold draft, two fingers of lime, and whatever snack is new",
                "Water, in case things get out of hand",
                "Our most expensive single malt",
                "A triple espresso martini",
            ],
            reaction: {
                success: "Yes. Exactly the shape of Friday.",
                failure: "...you do not get Fridays.",
            },
            phase: 'peak',
            difficulty: 2,
        },
    ],
    // Saturday -- overlap with weekend pool
    6: [
        {
            id: 'dow-sat-saturday-afternoon',
            name: "SATURDAY AFTERNOON",
            mood: 'regular',
            tag: 'bar opens early for him on Saturdays',
            line: "You open at five. It is five oh-one. Hello.",
            cards: [
                "Our Saturday special, the one we only pour today",
                "Our regular highball",
                "A triple espresso",
                "The bathroom is on the left",
            ],
            reaction: {
                success: "...you remember the Saturday special. Good.",
                failure: "...today is not just another Tuesday.",
            },
            phase: 'early',
            difficulty: 2,
        },
    ],
};

export function getDayOfWeekRegulars(date?: Date): Customer[] {
    const d = date ?? new Date();
    const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
    const dow = jst.getUTCDay();
    return DOW_REGULARS[dow] ?? [];
}
