/**
 * Silent Bartender -- content index.
 *
 * Aggregate summary of all content lengths in the game. Useful
 * for debug screens, CI checks, or future content dashboards.
 */

import { CUSTOMERS } from '@/data/english/bar/customers';
import { BOSS_CUSTOMERS } from '@/data/english/bar/boss-customers';
import { WEEKEND_CUSTOMERS } from '@/data/english/bar/weekend-customers';
import { SEASONAL_CUSTOMERS } from '@/data/english/bar/seasonal-customers';
import { SEASONAL_BOSSES } from '@/data/english/bar/seasonal-bosses';
import { EASTER_EGGS } from '@/data/english/bar/easter-eggs';
import { BOSS_AFTERMATHS } from '@/data/english/bar/boss-aftermath';
import { DOW_REGULARS } from '@/data/english/bar/day-of-week-regulars';
import { GONDO_ROASTS } from '@/data/english/bar/roasts';
import { GONDO_FRAGMENTS } from '@/data/english/bar/gondo-fragments';
import { GONDO_LETTERS } from '@/data/english/bar/gondo-letters';
import { BAR_FRAGMENTS } from '@/data/english/bar/bar-fragments';
import { ACHIEVEMENTS } from '@/data/english/bar/achievements';
import { DAILY_THEMES } from '@/data/english/bar/boss-aftermath'; // placeholder; we re-export below
import { MOOD_HINTS } from '@/data/english/bar/mood-hints';
import { NIGHT_MOMENTS } from '@/data/english/bar/night-moments';
import { RARE_EVENTS } from '@/data/english/bar/rare-events';
import { DREAM_FLICKERS } from '@/data/english/bar/dream-sequences';
import { MILESTONES } from '@/data/english/bar/milestones';
import { SERVICE_TIPS } from '@/data/english/bar/service-tips';
import { WEATHER_POOL } from '@/data/english/bar/weather';
import { SIGNATURE_DRINKS } from '@/data/english/bar/signature-drinks';
import { COUNTER_OBJECTS } from '@/data/english/bar/counter-objects';
import { NEIGHBORHOODS } from '@/data/english/bar/neighborhoods';
import { RIVAL_SHOPS } from '@/data/english/bar/rival-shops';
import { GONDO_TIMELINE } from '@/data/english/bar/gondo-timeline';
import { HOUSE_MENU } from '@/data/english/bar/menu';

export interface ContentCounts {
    customers: number;
    bosses: number;
    weekendCustomers: number;
    seasonalCustomers: number;
    seasonalBosses: number;
    easterEggs: number;
    bossAftermaths: number;
    dowRegulars: number;
    gondoRoasts: number;
    gondoFragments: number;
    gondoLetters: number;
    barFragments: number;
    achievements: number;
    moodHints: number;
    nightMoments: number;
    rareEvents: number;
    dreamFlickers: number;
    milestones: number;
    serviceTips: number;
    weatherVariants: number;
    signatureDrinks: number;
    counterObjects: number;
    neighborhoods: number;
    rivalShops: number;
    timelineEvents: number;
    menuItems: number;
    /** Total unique characters reachable in a year of play. */
    totalUniquePossibleCharacters: number;
}

export function countContent(): ContentCounts {
    const dowRegularsTotal = Object.values(DOW_REGULARS).reduce((s, arr) => s + arr.length, 0);
    const moodHintsTotal = Object.values(MOOD_HINTS).reduce((s, arr) => s + (arr?.length ?? 0), 0);

    // Note: DAILY_THEMES is placeholder-imported from boss-aftermath; we void it.
    void DAILY_THEMES;

    const customers = CUSTOMERS.length;
    const bosses = BOSS_CUSTOMERS.length;
    const weekendCustomers = WEEKEND_CUSTOMERS.length;
    const seasonalCustomers = SEASONAL_CUSTOMERS.length;
    const seasonalBosses = SEASONAL_BOSSES.length;
    const easterEggs = EASTER_EGGS.length;
    const bossAftermaths = BOSS_AFTERMATHS.length;

    return {
        customers,
        bosses,
        weekendCustomers,
        seasonalCustomers,
        seasonalBosses,
        easterEggs,
        bossAftermaths,
        dowRegulars: dowRegularsTotal,
        gondoRoasts: GONDO_ROASTS.length,
        gondoFragments: GONDO_FRAGMENTS.length,
        gondoLetters: GONDO_LETTERS.length,
        barFragments: BAR_FRAGMENTS.length,
        achievements: ACHIEVEMENTS.length,
        moodHints: moodHintsTotal,
        nightMoments: NIGHT_MOMENTS.length,
        rareEvents: RARE_EVENTS.length,
        dreamFlickers: DREAM_FLICKERS.length,
        milestones: MILESTONES.length,
        serviceTips: SERVICE_TIPS.length,
        weatherVariants: WEATHER_POOL.length,
        signatureDrinks: SIGNATURE_DRINKS.length,
        counterObjects: COUNTER_OBJECTS.length,
        neighborhoods: NEIGHBORHOODS.length,
        rivalShops: RIVAL_SHOPS.length,
        timelineEvents: GONDO_TIMELINE.length,
        menuItems: HOUSE_MENU.length,
        totalUniquePossibleCharacters:
            customers + bosses + weekendCustomers + seasonalCustomers +
            seasonalBosses + easterEggs + bossAftermaths * 2 +
            dowRegularsTotal,
    };
}

/** Render a content summary as a plain string (for logs / debug). */
export function contentSummary(): string {
    const c = countContent();
    return [
        `Silent Bartender -- content summary`,
        ``,
        `Customers:        ${c.customers}`,
        `Bosses:           ${c.bosses}`,
        `Weekend:          ${c.weekendCustomers}`,
        `Seasonal:         ${c.seasonalCustomers} (+${c.seasonalBosses} bosses)`,
        `Easter eggs:      ${c.easterEggs}`,
        `Aftermaths:       ${c.bossAftermaths}`,
        `DOW regulars:     ${c.dowRegulars}`,
        `Unique reachable: ${c.totalUniquePossibleCharacters}`,
        ``,
        `Gondo roasts:     ${c.gondoRoasts}`,
        `Gondo fragments:  ${c.gondoFragments}`,
        `Gondo letters:    ${c.gondoLetters}`,
        `Bar fragments:    ${c.barFragments}`,
        `Achievements:     ${c.achievements}`,
        `Mood hints:       ${c.moodHints}`,
        `Night moments:    ${c.nightMoments}`,
        `Rare events:      ${c.rareEvents}`,
        `Dream flickers:   ${c.dreamFlickers}`,
        `Milestones:       ${c.milestones}`,
        `Service tips:     ${c.serviceTips}`,
        `Weather:          ${c.weatherVariants}`,
        `Signature drinks: ${c.signatureDrinks}`,
        `Counter objects:  ${c.counterObjects}`,
        `Neighborhoods:    ${c.neighborhoods}`,
        `Rival shops:      ${c.rivalShops}`,
        `Timeline events:  ${c.timelineEvents}`,
        `Menu items:       ${c.menuItems}`,
    ].join('\n');
}
