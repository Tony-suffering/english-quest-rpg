/**
 * Silent Bartender -- first-run tutorial data.
 *
 * A TUTORIAL NIGHT runs once, the very first time someone plays
 * (PlayerStats.totalNights === 0). Gondo speaks before each customer,
 * the customers are deliberately simple, and no voice bust is active.
 *
 * Each step: a Gondo line (JP, short) + a Customer with an obvious
 * correct card. Difficulty ramps gently: toweled-off easy, then
 * slightly harder, then a real-shaped one.
 *
 * Kept separate from CUSTOMERS so the real roster stays untouched.
 */

import type { Customer } from './types';

export interface TutorialStep {
    /** Gondo's short guidance line, shown BEFORE the customer appears. */
    gondoLine: string;
    /** The tutorial customer for this step. */
    customer: Customer;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
    // ─── 1. Obvious. Water-level easy. ───
    {
        gondoLine: '俺は奥で休む。お前が一夜やる。声を出すな。まずは、こいつだ。',
        customer: {
            id: 'tutorial-anything-cold',
            name: 'THE THIRSTY',
            mood: 'tired',
            tag: 'just wants something cold',
            line: "It's hot out there. Something cold, please. Anything cold.",
            cards: [
                'A cold beer',
                'A hot bowl of soup',
                'A warm cup of tea',
                'A plate of fried food',
            ],
            reaction: {
                success: "Yeah. That's it. Thanks.",
                failure: "...no, I said cold.",
            },
            phase: 'early',
            difficulty: 1,
        },
    },

    // ─── 2. Still obvious. Now the right answer isn't just the keyword. ───
    {
        gondoLine: '今のは簡単だ。次からは読め。客の言葉に、答えは大体ある。',
        customer: {
            id: 'tutorial-strong-quiet',
            name: 'THE QUIET ONE',
            mood: 'regular',
            tag: 'no fuss, no noise',
            line: "Long day. Something strong, no sweet stuff. Just a glass, no ceremony.",
            cards: [
                'A whiskey, neat',
                'A sweet strawberry cocktail',
                'A sparkling fruit punch',
                'Our dessert wine flight',
            ],
            reaction: {
                success: "...yeah. Perfect.",
                failure: "...no. Never mind.",
            },
            phase: 'early',
            difficulty: 1,
        },
    },

    // ─── 3. Slightly harder: you have to catch the mood, not just keywords. ───
    {
        gondoLine: 'いいぞ。最後にひとつ。言葉の裏を見ろ。',
        customer: {
            id: 'tutorial-celebrate',
            name: 'THE PROMOTED',
            mood: 'celebrating',
            tag: 'got the promotion today',
            line: "I got the promotion. First one in the family. Pour me something that feels like a win.",
            cards: [
                'A glass of champagne',
                'A plain glass of tap water',
                'A bitter black coffee',
                'A cold bowl of miso soup',
            ],
            reaction: {
                success: "Yes. Yes. That's exactly right. Cheers.",
                failure: "...oh. Well. Thanks, I guess.",
            },
            phase: 'early',
            difficulty: 2,
        },
    },
];
