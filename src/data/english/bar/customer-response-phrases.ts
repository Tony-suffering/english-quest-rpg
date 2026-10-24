/**
 * Silent Bartender -- customer response phrases.
 *
 * Short reactive phrases customers might say RIGHT AFTER the
 * bartender serves them (between `success` reaction and exit).
 * For future use in a richer reaction sequence. Grouped by mood.
 */

import type { Mood } from './types';

export const RESPONSE_PHRASES: Partial<Record<Mood, string[]>> = {
    tired: [
        "Yeah. That's the one.",
        "Thank you. I needed that more than I knew.",
        "...I should come here more often.",
    ],
    'first-time': [
        "Oh wow. This place is great.",
        "I'll tell my friends about this.",
        "Can I get another? The same?",
    ],
    homesick: [
        "...that tastes like home. Thank you.",
        "I haven't had anything like this in years.",
        "...I'll come back next week.",
    ],
    drunk: [
        "YEAH! That's what I'M TALKING ABOUT!",
        "You're a real one, kid.",
        "One more after this, okay?",
    ],
    heartbroken: [
        "...yeah.",
        "That works. Thank you.",
        "I'll be okay. Eventually.",
    ],
    existential: [
        "I will think about that.",
        "...interesting choice.",
        "Thank you for taking it seriously.",
    ],
    regular: [
        "Same as always. You remembered.",
        "Good. I'll take it from here.",
        "Same spot as last week. Thanks.",
    ],
    celebrating: [
        "CHEERS! To tonight!",
        "We're doing this right.",
        "The next round is on me!",
    ],
    nervous: [
        "...okay. That's good.",
        "Thank you. That helps.",
        "I feel better now.",
    ],
    ghost: [
        "...you poured right.",
        "[The glass empties on its own.]",
        "[A soft sigh, then nothing.]",
    ],
    dog: [
        "[A small tail movement.]",
        "[The dog drinks, then looks up.]",
        "[A quiet exhale.]",
    ],
    edo: [
        "...this I recognize. Gratitude.",
        "You are not of my era, but you understand.",
        "My thanks, keeper of this strange place.",
    ],
    alien: [
        "...the liquid is acceptable.",
        "I will return to report.",
        "Your species understands the quiet.",
    ],
    curious: [
        "Interesting. What's the secret?",
        "Where did you learn this?",
        "You're paying attention. I like that.",
    ],
    suspicious: [
        "...not bad. Not what I expected.",
        "Okay. Now we can talk.",
        "You passed the test.",
    ],
};

/** Pick a response for a mood, or null if none defined. */
export function pickResponsePhrase(mood: Mood): string | null {
    const pool = RESPONSE_PHRASES[mood];
    if (!pool || pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
}
