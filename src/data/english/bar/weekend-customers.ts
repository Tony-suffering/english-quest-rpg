/**
 * Silent Bartender -- weekend-only customers.
 *
 * These appear only when the player's current JST day is Friday
 * or Saturday. They add local texture to the roster and reward
 * coming back on a weekend specifically.
 *
 * Wire: `getWeekendCustomers()` returns the pool for today (empty
 * if not weekend). Callers may merge with the main roster.
 */

import type { Customer } from './types';

export const WEEKEND_CUSTOMERS: Customer[] = [
    {
        id: 'friday-stag',
        name: 'THE STAG',
        mood: 'celebrating',
        tag: '金曜の夜、袴姿に乱れ',
        line: "I am getting married in the morning. Tell me I have made the right choice.",
        cards: [
            "I cannot tell you. Only you can. But: this is a good drink for the question.",
            "Yes, obviously, congratulations",
            "Our signature bachelor party special",
            "The exit is to the left",
        ],
        reaction: {
            success: "...yeah. Pour it. I will decide on my own.",
            failure: "...you are not helping.",
        },
        phase: 'late',
        difficulty: 4,
        beat: 'ボウタイが曲がっている。友人たちは先に帰った。',
    },
    {
        id: 'friday-new-parent',
        name: 'THE NEW PARENT',
        mood: 'tired',
        tag: '金曜、一時間だけ外出許可',
        line: "One hour. I have one hour. Make this the best hour I have had in six months.",
        cards: [
            "Your favorite drink. Nothing too clever.",
            "Our rare tasting flight (takes 90 min)",
            "Water first, let us talk",
            "A cocktail you have never tried",
        ],
        reaction: {
            success: "Yes. Thank you for not being ambitious.",
            failure: "...I do not have time to explore.",
        },
        phase: 'peak',
        difficulty: 3,
    },
    {
        id: 'saturday-group-of-four',
        name: 'THE FOUR',
        mood: 'celebrating',
        tag: '土曜、明らかに独身最後の夜',
        line: "Four of us. Whoever is marrying on Monday needs to forget their name tonight.",
        cards: [
            "A round of strong shots, and water on the side",
            "Four glasses of water only",
            "Only champagne, no substitutes",
            "The bathroom is down the hall",
        ],
        reaction: {
            success: "That is the right balance. You read the room.",
            failure: "...you are no fun.",
        },
        phase: 'peak',
        difficulty: 3,
    },
    {
        id: 'saturday-alone-regular',
        name: 'THE SATURDAY GHOST',
        mood: 'regular',
        tag: '土曜の常連、毎週ひとり',
        line: "Same as last Saturday. Same seat. Same time. Same thing. Thank you.",
        cards: [
            "The usual, hot sake, quiet corner seat ready",
            "Something new to try tonight",
            "The most popular drink of the week",
            "A flight of samples",
        ],
        reaction: {
            success: "Yes. Some things should not change.",
            failure: "...next Saturday, then.",
        },
        phase: 'late',
        difficulty: 3,
        beat: 'コートは脱がない。毎回同じペースで飲む。',
    },
    {
        id: 'saturday-midnight-proposal',
        name: 'THE PROPOSER',
        mood: 'nervous',
        tag: '土曜深夜、ポケットに小箱',
        line: "I am going to ask her in an hour. I cannot remember if she drinks champagne or not.",
        cards: [
            "Start with water. Do not drink anything. You need to remember.",
            "Champagne, two glasses, now",
            "A strong cocktail for courage",
            "The bathroom to calm down",
        ],
        reaction: {
            success: "...yeah. You are right. Thank you.",
            failure: "...I will take my chances.",
        },
        phase: 'late',
        difficulty: 4,
        beat: 'ポケットから何度も小さな箱を出しては戻している。',
    },
];

/**
 * Returns weekend customers if today (JST) is Friday (5) or Saturday (6).
 * Otherwise returns an empty array.
 */
export function getWeekendCustomers(): Customer[] {
    const now = new Date();
    const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const day = jst.getUTCDay(); // 0 Sun ... 6 Sat
    if (day === 5 || day === 6) return WEEKEND_CUSTOMERS;
    return [];
}
