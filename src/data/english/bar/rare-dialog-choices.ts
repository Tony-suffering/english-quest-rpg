/**
 * Silent Bartender -- rare "optional" cards.
 *
 * Extra card options (beyond the standard 4) that appear only when
 * specific conditions are met (e.g. returning customer, memory-
 * unlocked response). Gives veteran players hidden choices.
 */

import type { Customer } from './types';

export interface RareDialogChoice {
    id: string;
    customerId: string;          // which customer this adds a card to
    text: string;                 // the extra card's text
    unlock: (stats: {
        totalNights: number;
        customerIdsSeen: string[];
    }) => boolean;
    reaction: string;             // what the customer does if this rare card is picked (always positive)
}

export const RARE_DIALOG_CHOICES: RareDialogChoice[] = [
    {
        id: 'rare-the-dog-acknowledgment',
        customerId: 'the-dog',
        text: "[Look at the dog. Wait. Offer water. Nothing else.]",
        unlock: (s) => s.totalNights >= 5 && s.customerIdsSeen.includes('the-dog'),
        reaction: "[The dog nods, small and deliberate. A regular has been accepted.]",
    },
    {
        id: 'rare-ghost-remembers-you',
        customerId: 'ghost',
        text: "[Slide an empty cup over. Pretend you see him. Don't.]",
        unlock: (s) => s.totalNights >= 10 && s.customerIdsSeen.includes('ghost'),
        reaction: "...thank you. I am not always seen.",
    },
    {
        id: 'rare-edo-formal-farewell',
        customerId: 'edo-timer',
        text: "[Place a warm sake, bow slightly, do not meet his eyes. Pure tradition.]",
        unlock: (s) => s.totalNights >= 15 && s.customerIdsSeen.includes('edo-timer'),
        reaction: "I have traveled far. Your manners are unexpected and correct.",
    },
    {
        id: 'rare-alien-universal-gesture',
        customerId: 'alien',
        text: "[Point to the sake. Make no other sound. Nod once.]",
        unlock: (s) => s.totalNights >= 20 && s.customerIdsSeen.includes('alien'),
        reaction: "...your species knows the language of non-language. Impressive.",
    },
    {
        id: 'rare-heartbroken-silence',
        customerId: 'heartbroken',
        text: "[Pour whiskey neat. Don't look up. Let them drink first.]",
        unlock: (s) => s.totalNights >= 8 && s.customerIdsSeen.includes('heartbroken'),
        reaction: "...you handled that exactly right.",
    },
    {
        id: 'rare-regular-first-visit-back',
        customerId: 'regular-usual',
        text: "[Pour their old drink from memory. Don't mention the time apart.]",
        unlock: (s) => s.totalNights >= 30 && s.customerIdsSeen.includes('regular-usual'),
        reaction: "...you remembered. Like no time passed.",
    },
];

/** Find rare choices applicable to the given customer id. */
export function rareChoicesFor(
    customerId: string,
    stats: { totalNights: number; customerIdsSeen: string[] },
): RareDialogChoice[] {
    return RARE_DIALOG_CHOICES.filter(c =>
        c.customerId === customerId && c.unlock(stats)
    );
}
