/**
 * Silent Bartender -- seasonal bosses.
 *
 * Closing-phase special bosses that only appear in specific seasons.
 * Thematic payoffs for players who return across the year.
 */

import type { Customer } from './types';

export interface SeasonalBoss {
    customer: Customer;
    /** Months (1-12) during which this boss can appear. */
    monthRange: [number, number];
    season: 'sakura' | 'tsuyu' | 'summer' | 'autumn' | 'first-snow' | 'new-year';
}

export const SEASONAL_BOSSES: SeasonalBoss[] = [
    {
        season: 'sakura',
        monthRange: [3, 4],
        customer: {
            id: 'seasonal-boss-last-hanami',
            name: 'THE LAST HANAMI',
            mood: 'existential',
            tag: '今年最後の花見の夜',
            line: "I sat under the trees for four hours. The petals are almost done. Pour me what the last petals taste like.",
            cards: [
                "[Sakura-infused warm sake, one cup, served in silence.]",
                "Our strongest cocktail",
                "A cold beer to contrast",
                "A champagne for celebration",
            ],
            reaction: {
                success: "...yes. The year has started. Thank you.",
                failure: "...I missed the moment, then.",
            },
            phase: 'closing',
            difficulty: 5,
            beat: '外套に桜の花びらが一枚だけ残っている。',
        },
    },
    {
        season: 'tsuyu',
        monthRange: [6, 7],
        customer: {
            id: 'seasonal-boss-rain-witness',
            name: 'THE RAIN WITNESS',
            mood: 'heartbroken',
            tag: '梅雨、傘を持たずに来た',
            line: "I have been in the rain for an hour. The person I was meeting did not come. Pour me something I can finish slowly.",
            cards: [
                "[A small glass of plum wine, warmed. Pair with a dry towel.]",
                "Our strongest whiskey",
                "A flight of cocktails",
                "A cold beer",
            ],
            reaction: {
                success: "...slow is right. Thank you for the towel.",
                failure: "...faster is easier, but not better.",
            },
            phase: 'closing',
            difficulty: 5,
            beat: 'コートから水滴がカウンターに小さく溜まっている。',
        },
    },
    {
        season: 'summer',
        monthRange: [7, 8],
        customer: {
            id: 'seasonal-boss-obon-visitor',
            name: 'THE OBON VISITOR',
            mood: 'ghost',
            tag: 'お盆、一年に一度だけ来る',
            line: "I come once a year. Always this week. My brother used to sit where you are standing.",
            cards: [
                "[Set his brother's usual: hot sake, across the counter facing the empty seat.]",
                "Our sparkling summer release",
                "A cold beer for the heat",
                "The bathroom is on the left",
            ],
            reaction: {
                success: "...you understood without asking. Thank you, until next year.",
                failure: "...I will come back next year anyway.",
            },
            phase: 'closing',
            difficulty: 5,
            beat: 'お焼香の匂いが、わずかに。',
        },
    },
    {
        season: 'autumn',
        monthRange: [10, 11],
        customer: {
            id: 'seasonal-boss-moon-viewer',
            name: 'THE MOON VIEWER',
            mood: 'regular',
            tag: '月見の夜、一人で',
            line: "The moon is full. I used to view it with someone. Tonight I view it alone, and tonight I drink alone.",
            cards: [
                "[Warm sake in a wide cup so the moon reflects. Two tsukimi dango on the side.]",
                "Our most expensive whiskey",
                "A champagne to toast",
                "A cold beer for the night",
            ],
            reaction: {
                success: "...the moon is in my cup. Thank you for noticing.",
                failure: "...the moon is still up there, I suppose.",
            },
            phase: 'closing',
            difficulty: 5,
            beat: '窓際の席を選んだ。月が見える角度。',
        },
    },
    {
        season: 'first-snow',
        monthRange: [12, 2],
        customer: {
            id: 'seasonal-boss-new-year-eve',
            name: "NEW YEAR'S EVE",
            mood: 'existential',
            tag: '大晦日、一人で年越し',
            line: "Fifteen minutes to the new year. I have nothing to toast with. Help me mark it.",
            cards: [
                "[Hot sake. One cup. Watch the clock with them in silence until midnight.]",
                "Champagne for the countdown",
                "Our most expensive whiskey",
                "A simple water",
            ],
            reaction: {
                success: "...that is the first minute of the new year. Thank you.",
                failure: "...the year changes whether I drink or not.",
            },
            phase: 'closing',
            difficulty: 5,
            beat: 'カウンターにはラジオが置いてある。年越しの番組を小さく流している。',
        },
    },
    {
        season: 'new-year',
        monthRange: [1, 1],
        customer: {
            id: 'seasonal-boss-first-customer-year',
            name: 'THE FIRST CUSTOMER OF THE YEAR',
            mood: 'regular',
            tag: '元日、あけましておめでとう',
            line: "Happy new year. First drink of my year here, same as twelve years in a row.",
            cards: [
                "[Warm sake, his usual, with a small plate of black beans.]",
                "Something new to start the year",
                "Our rarest bottle",
                "The bathroom is on the left",
            ],
            reaction: {
                success: "...thank you. Twelve years now, counting tonight.",
                failure: "...a different bar next year, maybe.",
            },
            phase: 'closing',
            difficulty: 4,
            beat: '年賀状のようなものを胸ポケットに。誰にも渡さないまま持っている。',
        },
    },
];

function jstMonth(): number {
    const d = new Date();
    const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
    return jst.getUTCMonth() + 1;
}

function monthInRange(month: number, range: [number, number]): boolean {
    const [start, end] = range;
    if (start <= end) return month >= start && month <= end;
    // Wraparound (e.g. Dec-Feb)
    return month >= start || month <= end;
}

export function getSeasonalBoss(): Customer | null {
    const m = jstMonth();
    const matching = SEASONAL_BOSSES.filter(sb => monthInRange(m, sb.monthRange));
    if (matching.length === 0) return null;
    return matching[Math.floor(Math.random() * matching.length)].customer;
}
