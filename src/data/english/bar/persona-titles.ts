/**
 * Silent Bartender -- persona titles.
 *
 * Unlockable titles derived from the player's long-term pattern.
 * Shown on the profile / intro screen as a small tag under their
 * night count. Titles are earned, not chosen.
 */

import type { PlayerStats } from '@/lib/english/bar/storage';

export interface PersonaTitle {
    id: string;
    title: string;
    description: string;   // 1-line JP
    earns: (stats: PlayerStats) => boolean;
}

export const PERSONA_TITLES: PersonaTitle[] = [
    {
        id: 'persona-newcomer',
        title: '見習い',
        description: '暖簾をくぐったばかり',
        earns: (s) => s.totalNights < 10,
    },
    {
        id: 'persona-faithful',
        title: '常連の給仕',
        description: '10夜以上、同じ店に立った',
        earns: (s) => s.totalNights >= 10 && s.totalNights < 50,
    },
    {
        id: 'persona-veteran',
        title: '夜の番人',
        description: '50夜以上、暖簾を守っている',
        earns: (s) => s.totalNights >= 50 && s.totalNights < 200,
    },
    {
        id: 'persona-master-apprentice',
        title: '師匠代理',
        description: '200夜以上、この店の顔になった',
        earns: (s) => s.totalNights >= 200 && s.totalNights < 500,
    },
    {
        id: 'persona-second-master',
        title: '二代目',
        description: '500夜以上、この店は半分お前のものだ',
        earns: (s) => s.totalNights >= 500,
    },
    {
        id: 'persona-silent-one',
        title: '沈黙の人',
        description: '50夜以上、一度も声を出さなかった',
        earns: (s) => s.totalNights >= 50 && s.lifetimeBusts === 0,
    },
    {
        id: 'persona-heartmender',
        title: '失恋者の友',
        description: '失恋客を10人以上静かに見送った',
        earns: (s) => (s.moodStats.heartbroken?.success ?? 0) >= 10,
    },
    {
        id: 'persona-ghosttalker',
        title: '見えない客の給仕',
        description: '幽霊の常連を3人以上満足させた',
        earns: (s) => (s.moodStats.ghost?.success ?? 0) >= 3,
    },
    {
        id: 'persona-dogkeeper',
        title: '犬の友',
        description: '犬を5回以上静かに送った',
        earns: (s) => (s.moodStats.dog?.success ?? 0) >= 5,
    },
    {
        id: 'persona-cosmovoyager',
        title: '宇宙の給仕',
        description: '宇宙からの客を3人以上満足させた',
        earns: (s) => (s.moodStats.alien?.success ?? 0) >= 3,
    },
    {
        id: 'persona-diarist',
        title: '記録者',
        description: '100回以上のありがとうを集めた',
        earns: (s) => s.lifetimeArigatou >= 100,
    },
    {
        id: 'persona-living-legend',
        title: '生ける伝説',
        description: '1000夜を越えた。もう話の中の人だ',
        earns: (s) => s.totalNights >= 1000,
    },
];

/** Return the most specific title currently earned. */
export function getCurrentPersona(stats: PlayerStats): PersonaTitle | null {
    const earned = PERSONA_TITLES.filter(p => p.earns(stats));
    if (earned.length === 0) return null;
    // Favor more-specific (later) entries.
    return earned[earned.length - 1];
}

/** Return all earned titles (for a "titles earned" view). */
export function getEarnedPersonas(stats: PlayerStats): PersonaTitle[] {
    return PERSONA_TITLES.filter(p => p.earns(stats));
}
