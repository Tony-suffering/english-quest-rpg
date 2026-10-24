/**
 * Silent Bartender card game -- shared types
 */

export type Mood =
    | 'tired' | 'first-time' | 'homesick' | 'drunk' | 'heartbroken'
    | 'alien' | 'ghost' | 'edo' | 'dog'
    | 'regular' | 'celebrating' | 'suspicious' | 'nervous' | 'smug'
    | 'curious' | 'angry' | 'late-night' | 'existential' | 'romantic';

export type NightPhase = 'early' | 'peak' | 'late' | 'closing';

export interface Customer {
    id: string;
    name: string;          // short tag (e.g. "THE SUIT")
    mood: Mood;
    tag: string;           // flavor line under name
    line: string;          // English the customer says (subtitle)
    cards: string[];       // 4-5 options; [0] is always correct
    reaction: { success: string; failure: string };
    /** if set, this customer only appears during this phase */
    phase?: NightPhase;
    /** difficulty: 1 (intro) - 5 (brutal) */
    difficulty?: 1 | 2 | 3 | 4 | 5;
    /** optional flavor beat (e.g. what they wear, what the room feels) */
    beat?: string;
}

export interface GondoRoast {
    jp: string;
    /** timing: when Gondo says this, per the nature of the bust */
    context?: 'generic' | 'first-customer' | 'late-game' | 'repeat-bust';
}
