/**
 * Silent Bartender -- easter eggs.
 *
 * Special customer appearances gated on player history milestones.
 * Hook this into night-builder (separate wiring TBD) to splice a
 * special customer into the night when its gate is met.
 *
 * Not active by default. Opt-in wiring only.
 */

import type { Customer } from './types';
import type { PlayerStats } from '@/lib/english/bar/storage';

export interface EasterEgg {
    id: string;
    gate: (stats: PlayerStats) => boolean;
    customer: Customer;
    /** Once triggered, don't re-trigger within this many nights. */
    cooldownNights: number;
}

export const EASTER_EGGS: EasterEgg[] = [
    {
        id: 'egg-hundredth-night',
        gate: (s) => s.totalNights === 99, // triggers on night 100
        cooldownNights: 9999,
        customer: {
            id: 'egg-hundredth-celebrant',
            name: 'THE CELEBRANT',
            mood: 'celebrating',
            tag: 'this is your 100th night. they know.',
            line: "I heard about this place. The silent bartender. Pour yourself one first.",
            cards: [
                "Decline politely and pour them something instead",
                "Accept the drink and sit",
                "Ask who told them",
                "Check the bathroom first",
            ],
            reaction: {
                success: "That is what a pro does. Thank you for tonight.",
                failure: "...hm. Guess the stories exaggerated.",
            },
            phase: 'closing',
            difficulty: 3,
            beat: 'カウンターに100円玉を1枚置いた。飲み物代ではない、別の意味。',
        },
    },
    {
        id: 'egg-all-moods-served',
        gate: (s) => {
            const moodStats = s.moodStats ?? {};
            const served = Object.values(moodStats).filter((rec) => (rec?.success ?? 0) > 0);
            return served.length >= 10 && !s.unlockedAchievementIds.includes('egg-all-moods-seen');
        },
        cooldownNights: 9999,
        customer: {
            id: 'egg-mirror-customer',
            name: 'THE MIRROR',
            mood: 'existential',
            tag: 'they look exactly like you, tired the same way',
            line: "I have been everyone who sat here tonight. Pour me what you would pour yourself.",
            cards: [
                "Water. Honest answer.",
                "Our strongest whiskey, neat",
                "A flight of five sakes",
                "Something sweet and forgettable",
            ],
            reaction: {
                success: "...yes. You know yourself. Good.",
                failure: "...you lied. I will not hold it against you.",
            },
            phase: 'closing',
            difficulty: 5,
            beat: '同じ前掛けをしている。顔は鏡に映したように似ている。',
        },
    },
    {
        id: 'egg-after-bust-streak',
        // Trigger when the player has busted 5+ total times and is fresh off a bust
        // (no comeback streak yet). PlayerStats.consecutiveBusts resets on any non-bust.
        gate: (s) => (s.lifetimeBusts ?? 0) >= 5 && (s.consecutiveBusts ?? 0) >= 1,
        cooldownNights: 3,
        customer: {
            id: 'egg-second-chance-gondo',
            name: 'GONDO (not the ghost)',
            mood: 'regular',
            tag: 'he actually got up. walked out. came in.',
            line: "Heard you have been bad at this. Show me you can still shut up and pour.",
            cards: [
                "[Pour his usual hot sake, no words, eye contact.]",
                "Apologize and offer the house wine",
                "Ask what he wants",
                "Pour yourself one and slide it over",
            ],
            reaction: {
                success: "...good. Keep it that way. I am going back to bed.",
                failure: "...you still do not get it. Shut up. Pour. Watch.",
            },
            phase: 'late',
            difficulty: 4,
            beat: '奥の扉が開いた音がした。マスター本人が立っている。前掛けは外したまま。',
        },
    },
    {
        id: 'egg-perfect-week',
        gate: (s) => (s.perfectNights ?? 0) >= 7,
        cooldownNights: 9999,
        customer: {
            id: 'egg-weekly-regular',
            name: 'THE WEEKLY',
            mood: 'regular',
            tag: 'has been watching you, quietly, for a week',
            line: "Seven nights. I have been coming in seven nights. You never slipped once.",
            cards: [
                "Nod once. Pour what they had the first night.",
                "Ask them to elaborate",
                "Offer a brand new cocktail",
                "Smile and point to the menu",
            ],
            reaction: {
                success: "...thank you for being consistent. It is rare.",
                failure: "...then it was not as impressive as I thought.",
            },
            phase: 'peak',
            difficulty: 4,
            beat: '七夜続けて同じ席、同じ時間。名前はまだ知らない。',
        },
    },
    {
        id: 'egg-first-arigatou',
        gate: (s) => s.totalNights === 2 && s.lifetimeArigatou >= 1,
        cooldownNights: 9999,
        customer: {
            id: 'egg-first-regular-ever',
            name: 'THE ONE WHO THANKED YOU',
            mood: 'regular',
            tag: 'the first customer who ever said ありがとう to you',
            line: "You probably do not remember me. I was your first ありがとう. I came back.",
            cards: [
                "[Nod once. Do not smile. Pour the same drink you poured two nights ago.]",
                "Offer your signature cocktail",
                "Our best import whiskey",
                "The bathroom is on the left",
            ],
            reaction: {
                success: "...thank you for remembering the shape of me.",
                failure: "...maybe I got the wrong bartender.",
            },
            phase: 'peak',
            difficulty: 4,
            beat: 'マフラーを同じ結び方で。席も同じ。空気だけ少し柔らかい。',
        },
    },
    {
        id: 'egg-yakuzas-wife',
        gate: (s) => s.totalNights >= 15 && (s.moodStats.suspicious?.success ?? 0) >= 3,
        cooldownNights: 15,
        customer: {
            id: 'egg-nara-no-yome',
            name: 'THE WIFE',
            mood: 'suspicious',
            tag: 'high-collar, no smile, a name you do not want to know',
            line: "My husband will be here in ten minutes. He has rules. I need the glass ready.",
            cards: [
                "[Set out his usual. Do not look up when he enters.]",
                "Ask what he likes",
                "The bathroom is on the left",
                "Our house sake is popular",
            ],
            reaction: {
                success: "...you know the rules. That is good for everyone.",
                failure: "...find another shop by next week.",
            },
            phase: 'late',
            difficulty: 5,
            beat: '黒いコート。両手で財布だけ持っている。',
        },
    },
    {
        id: 'egg-returning-gondo-ghost',
        gate: (s) => s.totalNights >= 50 && (s.currentNoBustStreak ?? 0) >= 10,
        cooldownNights: 30,
        customer: {
            id: 'egg-the-real-gondo',
            name: 'MASTER GONDO',
            mood: 'regular',
            tag: 'he looks exactly like himself. not a ghost this time.',
            line: "I slept for fifty nights. I heard everything. You did not bury me yet.",
            cards: [
                "[Pour his hot sake. Do not say anything. Hand him the apron.]",
                "Apologize and explain everything",
                "Offer him your best whiskey",
                "Ask what he wants",
            ],
            reaction: {
                success: "...good. Tomorrow I open the shop. You come at six, not seven.",
                failure: "...go home. I will open alone.",
            },
            phase: 'closing',
            difficulty: 5,
            beat: '前掛けを腕にかけている。背筋は伸びている。',
        },
    },
    {
        id: 'egg-ownerless-dog',
        gate: (s) => (s.moodStats.dog?.success ?? 0) >= 3,
        cooldownNights: 7,
        customer: {
            id: 'egg-the-pack',
            name: 'THE PACK',
            mood: 'dog',
            tag: 'three dogs at the door. one has a tag with the previous owner\'s name.',
            line: "[Three dogs enter in single file. They sit at the counter in a row, looking at you.]",
            cards: [
                "[Three small bowls of water. Set them in a row. Do not speak.]",
                "One bowl for all three",
                "Three bourbons, neat",
                "Spicy chicken wings",
            ],
            reaction: {
                success: "[The three lap in unison. They leave in single file. The middle one looks back.]",
                failure: "[All three stare. They leave. The middle one stays for a second, then follows.]",
            },
            phase: 'closing',
            difficulty: 3,
            beat: '真ん中の犬は、以前来た犬と、少しだけ顔が似ている。',
        },
    },
];

// ═══════════════════════════════════════════════════════════
// Extended eggs (batch 2)
// Some gates read signals that are approximated from existing PlayerStats:
// - "heartbroken streak" uses lastNight.moodOutcomes as a proxy
// - "midnight JST" / "new year" / "AFK 30d" use Date at evaluation time
// - "all seasonal served" uses seenCustomerIds convention (prefix 'season-')
// - "weather" and "speakeasy" approximated from lastNight.customerIdsSeen tags
// These gates are intentionally forgiving; wiring can tighten later.
// ═══════════════════════════════════════════════════════════

function jstNow(): Date {
    // JST = UTC+9. Build a Date whose components reflect JST wall time.
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
    return new Date(utcMs + 9 * 60 * 60_000);
}

function lastIds(stats: PlayerStats): string[] {
    return stats.lastNight?.customerIdsSeen ?? [];
}

EASTER_EGGS.push(
    {
        id: 'egg-heartbreak-triptych',
        // Three heartbroken served in a row -- approximated: last night had 3+ heartbroken successes.
        gate: (s) => (s.lastNight?.moodOutcomes?.heartbroken?.success ?? 0) >= 3,
        cooldownNights: 20,
        customer: {
            id: 'egg-widow-in-gray',
            name: 'THE WIDOW IN GRAY',
            mood: 'heartbroken',
            tag: 'heard you have been kind to the broken ones',
            line: "Word travels. Three before me tonight. You do not flinch. Why?",
            cards: [
                "[Pour a small plum wine. Set it down. Look at the counter, not her.]",
                "Offer your strongest drink",
                "Ask what happened",
                "Slide over the tissue box",
            ],
            reaction: {
                success: "...thank you. I did not want a word. I wanted a witness.",
                failure: "...I should not have come. You are not the one they meant.",
            },
            phase: 'late',
            difficulty: 4,
            beat: '指輪の跡だけが残った左手。グラスを両手で包む。',
        },
    },
    {
        id: 'egg-three-worlds-week',
        // Alien, ghost, AND edo served at least once each (cumulative proxy for "same week").
        gate: (s) =>
            (s.moodStats.alien?.success ?? 0) >= 1 &&
            (s.moodStats.ghost?.success ?? 0) >= 1 &&
            (s.moodStats.edo?.success ?? 0) >= 1,
        cooldownNights: 9999,
        customer: {
            id: 'egg-the-cartographer',
            name: 'THE CARTOGRAPHER',
            mood: 'existential',
            tag: 'draws maps of places that should not connect',
            line: "Alien. Ghost. Edo. Same week, same counter. You are a crossing. Pour me water.",
            cards: [
                "[Pour water. No ice. Plain glass.]",
                "Our house sake",
                "A cold beer",
                "Ask what he means",
            ],
            reaction: {
                success: "...good. A crossing should taste like nothing.",
                failure: "...then you did not notice. Which is also an answer.",
            },
            phase: 'closing',
            difficulty: 5,
            beat: 'コートの裏に古い地図が縫い込まれている。カウンターに一瞬だけ見えた。',
        },
    },
    {
        id: 'egg-five-hundred-no-bosses',
        // 500+ arigatou and never served a boss-type (approximated: no suspicious success logged).
        gate: (s) =>
            s.lifetimeArigatou >= 500 &&
            (s.moodStats.suspicious?.success ?? 0) === 0,
        cooldownNights: 9999,
        customer: {
            id: 'egg-the-quiet-accountant',
            name: 'THE QUIET ACCOUNTANT',
            mood: 'regular',
            tag: 'keeps a ledger of people who never became what was offered',
            line: "Five hundred thank-yous. Not a single man in a good suit. That is a choice.",
            cards: [
                "[Nod once. Pour the house sake, warm. Do not explain.]",
                "Our best whiskey, neat",
                "Ask what kind of book he keeps",
                "Offer the champagne flight",
            ],
            reaction: {
                success: "...good. Some counters stay clean only by refusing.",
                failure: "...a pity. The ledger was going to end on you.",
            },
            phase: 'closing',
            difficulty: 4,
            beat: '革装の薄い帳面。開かない。開けない約束のように。',
        },
    },
    {
        id: 'egg-afk-thirty-days',
        // Gate uses a stored "lastSeenAt" if present on stats (future-compatible).
        // Falls back to lastNight.timestamp being >= 30 days old.
        gate: (s) => {
            const ts = s.lastNight?.timestamp;
            if (!ts) return false;
            const days = (Date.now() - ts) / (1000 * 60 * 60 * 24);
            return days >= 30;
        },
        cooldownNights: 9999,
        customer: {
            id: 'egg-the-one-who-waited',
            name: 'THE ONE WHO WAITED',
            mood: 'regular',
            tag: 'thirty nights on the same stool, same coat, same silence',
            line: "You were gone. I came anyway. I did not order. I just waited.",
            cards: [
                "[Pour whatever you poured them the first time you remembered their face. No words.]",
                "Apologize for being away",
                "Offer a drink on the house",
                "Ask where they have been",
            ],
            reaction: {
                success: "...welcome back. The seat kept your shape.",
                failure: "...I will come again next month. Maybe you will be here.",
            },
            phase: 'early',
            difficulty: 5,
            beat: 'コースターが30枚、重ねて置いてある。濡れていない。',
        },
    },
    {
        id: 'egg-midnight-jst',
        gate: () => {
            const d = jstNow();
            return d.getHours() === 0 && d.getMinutes() <= 4;
        },
        cooldownNights: 1,
        customer: {
            id: 'egg-day-changer',
            name: 'THE DAY-CHANGER',
            mood: 'late-night',
            tag: 'arrived with the second hand on the twelve',
            line: "Midnight. Yesterday just closed. Today has not opened. Pour in the gap.",
            cards: [
                "[Pour a single finger of whiskey. Set it between two coasters.]",
                "Pour a full pint of beer",
                "Ask what day it is",
                "Turn the radio on",
            ],
            reaction: {
                success: "...exactly. You understand the gap.",
                failure: "...you poured on a day. I wanted neither.",
            },
            phase: 'closing',
            difficulty: 4,
            beat: '時計の針が重なる音がした気がした。気のせいかもしれない。',
        },
    },
    {
        id: 'egg-all-weather-served',
        // We approximate "6 weather categories served" via a naming convention:
        // any seenCustomerIds containing 'weather-<tag>' (rain/snow/fog/wind/clear/storm).
        gate: (s) => {
            const weathers = ['rain', 'snow', 'fog', 'wind', 'clear', 'storm'];
            const hit = new Set<string>();
            for (const id of s.seenCustomerIds) {
                for (const w of weathers) {
                    if (id.includes(`weather-${w}`)) hit.add(w);
                }
            }
            return hit.size >= 6;
        },
        cooldownNights: 9999,
        customer: {
            id: 'egg-the-forecaster',
            name: 'THE FORECASTER',
            mood: 'curious',
            tag: 'carries a barometer; it is pointing at you',
            line: "Rain. Snow. Fog. Wind. Clear. Storm. You served all six. Pour me the seventh.",
            cards: [
                "[Pour water. Drop one ice cube. Watch it crack.]",
                "Our signature cocktail",
                "Ask what the seventh is",
                "Offer a hot sake",
            ],
            reaction: {
                success: "...yes. The seventh is the sound of ice deciding.",
                failure: "...wrong weather. Try again next storm.",
            },
            phase: 'late',
            difficulty: 5,
            beat: '窓の外の空気が、一瞬だけ六種類の匂いを同時にした。',
        },
    },
    {
        id: 'egg-speakeasy-clean-night',
        // Proxy: last night was a 5/5 perfect no-bust night AND seenCustomerIds that night
        // include a speakeasy-tagged id. Gentle gate -- wiring can replace with real flag.
        gate: (s) => {
            const ln = s.lastNight;
            if (!ln) return false;
            if (ln.busted || ln.failed !== 0 || ln.success < 5) return false;
            return ln.customerIdsSeen.some((id) => id.includes('speakeasy'));
        },
        cooldownNights: 15,
        customer: {
            id: 'egg-the-password-keeper',
            name: 'THE PASSWORD KEEPER',
            mood: 'smug',
            tag: 'knocked three times, paused, knocked twice',
            line: "Silent night. Speakeasy rules. Not one slip. I keep a list of rooms like this.",
            cards: [
                "[Pour a dark rum. Do not write anything down. Do not ask his name.]",
                "Thank him for coming",
                "Our house whiskey",
                "Ask which list",
            ],
            reaction: {
                success: "...your room stays on the list. For now.",
                failure: "...your room comes off the list. Quietly.",
            },
            phase: 'late',
            difficulty: 5,
            beat: '名刺の裏だけ見せてきた。表は見せない。',
        },
    },
    {
        id: 'egg-bust-comeback',
        // Big bust streak (5+) then a perfect no-bust night immediately after.
        gate: (s) => {
            const ln = s.lastNight;
            if (!ln) return false;
            return s.lifetimeBusts >= 5 &&
                s.consecutiveBusts === 0 &&
                !ln.busted &&
                ln.failed === 0 &&
                ln.success >= 5;
        },
        cooldownNights: 30,
        customer: {
            id: 'egg-the-comeback-witness',
            name: 'THE COMEBACK WITNESS',
            mood: 'regular',
            tag: 'saw you on every bad night. came back for the good one.',
            line: "I watched you lose five. I came for the one that did not break. Pour accordingly.",
            cards: [
                "[Pour what Gondo drinks. Do not claim it. Do not explain.]",
                "Apologize for the bad nights",
                "Pour a celebration champagne",
                "Offer a drink on the house",
            ],
            reaction: {
                success: "...good. That one counts twice.",
                failure: "...and here I thought you had turned a corner.",
            },
            phase: 'closing',
            difficulty: 4,
            beat: '古いコースターを一枚だけ持っている。五つ折り目がついている。',
        },
    },
    {
        id: 'egg-new-year-first-night',
        gate: () => {
            const d = jstNow();
            return d.getMonth() === 0 && d.getDate() === 1;
        },
        cooldownNights: 2,
        customer: {
            id: 'egg-the-first-foot',
            name: 'THE FIRST FOOT',
            mood: 'celebrating',
            tag: 'first through the door on the first night of the year',
            line: "First night. First drink of the year. Set the tone for the next three hundred sixty four.",
            cards: [
                "[Pour a small cup of o-toso. Set it down without a word.]",
                "Our best champagne",
                "Ask what they want to drink",
                "A hot sake, large cup",
            ],
            reaction: {
                success: "...good tone. A quiet year, then.",
                failure: "...loud start. The year will match.",
            },
            phase: 'early',
            difficulty: 3,
            beat: '店の戸の向こうに、まだ薄く初詣の鐘が残っている。',
        },
    },
    {
        id: 'egg-all-seasons-served',
        // Proxy: seenCustomerIds contains at least one 'season-spring', -summer, -autumn, -winter.
        gate: (s) => {
            const seasons = ['spring', 'summer', 'autumn', 'winter'];
            return seasons.every((sn) =>
                s.seenCustomerIds.some((id) => id.includes(`season-${sn}`)),
            );
        },
        cooldownNights: 9999,
        customer: {
            id: 'egg-the-four-coats',
            name: 'THE FOUR COATS',
            mood: 'existential',
            tag: 'wears four coats, one inside the other',
            line: "Spring. Summer. Autumn. Winter. You met them all. Pour me the hinge between them.",
            cards: [
                "[Pour barley tea. Cold glass, warm hands. Do not explain.]",
                "Our house sake, warm",
                "Ask which hinge",
                "Serve a seasonal fruit",
            ],
            reaction: {
                success: "...yes. The hinge has no flavor of its own. You know.",
                failure: "...you poured a season. I wanted the seam.",
            },
            phase: 'late',
            difficulty: 5,
            beat: 'どの季節でもない匂い。店の空気がひと呼吸、止まった。',
        },
    },
);

/** Find eggs whose gate is met. Callers are responsible for cooldown enforcement. */
export function pendingEggs(stats: PlayerStats): EasterEgg[] {
    return EASTER_EGGS.filter(e => e.gate(stats));
}
