/**
 * Silent Bartender -- returning-customer flavor beats.
 *
 * When a customer shows up again, the subtitle gets a tiny nod to the
 * last encounter. These beats are conservative -- short, in-character,
 * and they never step on the puzzle (cards[0] must stay correct).
 *
 * Shape:
 *   MEMORY_BEATS[mood].good -> prepended when player served them last time
 *   MEMORY_BEATS[mood].bad  -> prepended when player failed them last time
 *
 * The actual line from the customer is appended after the beat so the
 * player still reads the original puzzle prompt.
 */

import type { Mood } from './types';

export interface MemoryBeatTable {
    /** openers for "you served me well last time" */
    good: string[];
    /** openers for "you screwed it up last time" */
    bad: string[];
}

export const MEMORY_BEATS: Record<Mood, MemoryBeatTable> = {
    tired: {
        good: [
            "You remember. Same deal.",
            "Back again. You get it.",
            "Thank god it is you tonight.",
            "You. Good. I do not want to explain again.",
        ],
        bad: [
            "Hope you are sharper tonight.",
            "Different kid behind the bar?",
            "Try to keep up this time.",
            "Long week. Do not make it longer.",
        ],
    },
    'first-time': {
        good: [
            "Hi. I came back. You were nice last time.",
            "Hey. I remembered this place.",
            "You. Yeah. I trusted you and it worked out.",
            "I am less nervous this time. A little.",
        ],
        bad: [
            "I am going to try this again.",
            "Okay. Second attempt. Please.",
            "I almost did not come back, honestly.",
            "Um. Hi again. Let us start over.",
        ],
    },
    homesick: {
        good: [
            "You. You knew what I meant last time.",
            "Same feeling. You got it before.",
            "Back. Still far from home.",
            "I thought of that drink all week.",
        ],
        bad: [
            "I am not going to explain it twice.",
            "Last time was a miss. Try again.",
            "Home is even further tonight.",
            "Please. Just get it this time.",
        ],
    },
    drunk: {
        good: [
            "MY GUY. You are back. GOOD.",
            "YOU. YES. YOU KNOW WHAT I LIKE.",
            "HA. I REMEMBER YOU. GOOD KID.",
        ],
        bad: [
            "YOU AGAIN. DO NOT MESS IT UP.",
            "LAST TIME WAS A JOKE. FIX IT.",
            "OKAY. ONE MORE CHANCE, KID.",
        ],
    },
    heartbroken: {
        good: [
            "You. Yeah. You did right by me last time.",
            "Back. Same situation. You know.",
            "I ended up here again. Figures.",
        ],
        bad: [
            "Still sad. Worse, actually.",
            "Hope tonight is different.",
            "Just... please get it this time.",
        ],
    },
    alien: {
        good: [
            "The bartender who understood. I have returned.",
            "You. Your kind pours correctly. I remember.",
            "I have told others. They are curious about you.",
        ],
        bad: [
            "Your previous offering was incorrect. Retry.",
            "I have returned to test you again.",
            "My species does not forget a miscalibration.",
        ],
    },
    ghost: {
        good: [
            "...you remembered, last time. Good.",
            "...still here. Still the same stool.",
            "...you poured right. I noticed.",
        ],
        bad: [
            "...last time was not right.",
            "...I hoped you would have learned.",
            "...try again. I am patient.",
        ],
    },
    edo: {
        good: [
            "Thou hast served me true before. Again.",
            "The same hand that poured well. I return.",
            "I remember thy pour. Continue.",
        ],
        bad: [
            "Thy last pour was unworthy. Amend it.",
            "Do not shame me twice, barkeep.",
            "I grant thee one more attempt.",
        ],
    },
    dog: {
        good: [
            "[The dog wags once. Recognizes you.]",
            "[The dog sits straight. Waits, patient this time.]",
            "[Tail thump. The dog remembers.]",
        ],
        bad: [
            "[The dog tilts head, skeptical.]",
            "[The dog watches you carefully this time.]",
            "[Tail low. The dog is giving you a second try.]",
        ],
    },
    regular: {
        good: [
            "Evening again. You know the drill now.",
            "Back on the same stool. Same order.",
            "You did it right last time. Do it again.",
        ],
        bad: [
            "Evening. Let us hope tonight goes better.",
            "Back again. Gondo would not have missed it.",
            "Same seat. Try a sharper pour this time.",
        ],
    },
    celebrating: {
        good: [
            "You. You were here for the last one. Round two.",
            "Back. Still winning. Keep up.",
            "I told my friends about your pour.",
        ],
        bad: [
            "Last round fell flat. Save it tonight.",
            "Redemption time. Go.",
            "I am still in a good mood. Do not kill it.",
        ],
    },
    suspicious: {
        good: [
            "You. You kept it short last time. Good.",
            "Back. Same questions. Same answers, I trust.",
            "You know how this goes now.",
        ],
        bad: [
            "You talked too much last time. Less tonight.",
            "Back. See if you can keep your mouth shut now.",
            "I remember what you said. Do better.",
        ],
    },
    nervous: {
        good: [
            "Hi. Sorry. Back again. You were kind last time.",
            "You. Yes. You helped me out before.",
            "I came back because you got it.",
        ],
        bad: [
            "Okay. Trying again. Please.",
            "Hi. Um. It went badly last time. Try again?",
            "I almost did not come back. Please get it right.",
        ],
    },
    smug: {
        good: [
            "Ah. You again. You have taste. I approve.",
            "Back. You passed the first test. Let us see.",
            "I am pleased to see you still work here.",
        ],
        bad: [
            "You are still here. Hm. Surprising.",
            "I return to test whether you have improved.",
            "Let us see if your palate has developed.",
        ],
    },
    curious: {
        good: [
            "You again. Interesting. Let us see what you do now.",
            "Back. I have thought about that last pour.",
            "You remember me. Good. Continue.",
        ],
        bad: [
            "I am curious whether tonight will differ.",
            "Back. The question from last time stands.",
            "Let us try once more.",
        ],
    },
    angry: {
        good: [
            "Fine. You. At least you got it right last time.",
            "Back. Do not make me regret returning.",
            "You. Good. I do not have to explain again.",
        ],
        bad: [
            "You. Yeah. I remember. Do not repeat it.",
            "I came back because nowhere else is open. Get it right.",
            "Last time was unacceptable. Fix it now.",
        ],
    },
    'late-night': {
        good: [
            "Still you. Still the short one. You know.",
            "Back. Same hour. Same pour.",
            "You get it. Do not change anything.",
        ],
        bad: [
            "Back at this hour. Hope tonight is better.",
            "Same time. Different result, please.",
            "One more attempt, then I find another place.",
        ],
    },
    existential: {
        good: [
            "You understood, before. Without me saying.",
            "Back. You answered without answering last time.",
            "You. You did not fill the silence. I remember.",
        ],
        bad: [
            "I return, still unresolved. Perhaps tonight.",
            "The answer was wrong. Try it differently.",
            "We attempt the question again.",
        ],
    },
    romantic: {
        good: [
            "Hi. Yeah. You remember us. Same again.",
            "Back. You made it look nice last time.",
            "We came back. Your place. Obviously.",
        ],
        bad: [
            "Hi. We gave it another shot. You too.",
            "Back. Try to make it photogenic this time.",
            "Second date. Second chance for you too.",
        ],
    },
};
