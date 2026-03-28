// localStorage-based data layer for standalone RPG app (no API/DB)
import { QUEST_PHRASES } from '@/data/quest-phrases';

// ── Types ────────────────────────────────────────────────
export interface TrainingPhrase {
    id: string;
    english: string;
    japanese: string;
    category: string;
    date: string;
}

export interface PlayerStats {
    total_xp: number;
    total_touches: number;
    sparks: number;
    pity_counter: number;
    legendary_count: number;
}

export interface ReviewEntry {
    count: number;
    xp: number;
    sparks: number;
}

export interface UserPhrase {
    id: string;
    phrase: string;
    type: string;
    meaning: string;
    example?: string;
    source?: string;
    date?: string;
    mastery_level: number;
    created_at: string;
}

export interface PhraseLink {
    phrase_id: string;
    text: string;
    created_at: string;
}

// ── Storage Keys ─────────────────────────────────────────
const K = {
    CUSTOM_PHRASES: 'rpg_custom_phrases',
    MASTERY: 'rpg_mastery',
    LAST_LEVELED: 'rpg_last_leveled',
    CARD_POINTS: 'rpg_card_points',
    CARD_NAMES: 'rpg_card_names',
    PLAYER_STATS: 'rpg_player_stats',
    REVIEW_COUNTS: 'rpg_review_counts',
    DATE_TOUCHES: 'rpg_date_touches',
    PHRASE_LINKS: 'rpg_phrase_links',
    USER_PHRASES: 'rpg_user_phrases',
};

// ── Helpers ──────────────────────────────────────────────
function getJSON<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
}

function setJSON(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
}

// ── Static Phrases (quest-phrases → training format) ─────
const BASE_DATE = new Date('2025-01-06T00:00:00');

let _staticPhrases: TrainingPhrase[] | null = null;

export function getStaticPhrases(): TrainingPhrase[] {
    if (_staticPhrases) return _staticPhrases;

    const phrases: TrainingPhrase[] = [];
    let globalIdx = 0;

    for (const qp of QUEST_PHRASES) {
        const dayOffset = Math.floor(globalIdx / 10);
        const d = new Date(BASE_DATE);
        d.setDate(d.getDate() + dayOffset);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');

        phrases.push({
            id: qp.id,
            english: qp.english,
            japanese: qp.japanese,
            category: qp.element,
            date: `${yyyy}-${mm}-${dd}`,
        });
        globalIdx++;
    }

    _staticPhrases = phrases;
    return phrases;
}

// All phrases = only explicitly added phrases (from Quest or manual)
export function getAllPhrases(): TrainingPhrase[] {
    return getJSON<TrainingPhrase[]>(K.CUSTOM_PHRASES, []);
}

// Check if a quest phrase is already in training
export function isInTraining(phraseId: string): boolean {
    const phrases = getJSON<TrainingPhrase[]>(K.CUSTOM_PHRASES, []);
    return phrases.some(p => p.id === phraseId);
}

// Add a quest phrase to training with a date
export function addQuestPhraseToTraining(qp: { id: string; english: string; japanese: string; element: string }): TrainingPhrase {
    const phrases = getJSON<TrainingPhrase[]>(K.CUSTOM_PHRASES, []);
    // Skip if already exists
    const existing = phrases.find(p => p.id === qp.id);
    if (existing) return existing;

    // Assign date: next available slot (10 phrases per date)
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const newPhrase: TrainingPhrase = {
        id: qp.id,
        english: qp.english,
        japanese: qp.japanese,
        category: qp.element,
        date: dateStr,
    };
    phrases.push(newPhrase);
    setJSON(K.CUSTOM_PHRASES, phrases);

    // Bridge: also add to tl_phrases so Training page (API-based) picks it up
    try {
        const apiPhrases = JSON.parse(localStorage.getItem('tl_phrases') || '[]') as TrainingPhrase[];
        if (!apiPhrases.find(p => p.id === qp.id)) {
            apiPhrases.push({
                ...newPhrase,
                created_at: new Date().toISOString(),
            } as TrainingPhrase & { created_at: string });
            localStorage.setItem('tl_phrases', JSON.stringify(apiPhrases));
        }
    } catch {}

    return newPhrase;
}

// ── Phrase CRUD ──────────────────────────────────────────
export function addPhrase(p: { english: string; japanese: string; category: string; date: string }): TrainingPhrase {
    const newPhrase: TrainingPhrase = {
        id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        english: p.english,
        japanese: p.japanese,
        category: p.category,
        date: p.date,
    };
    // Write to my-training-phrases (production Daily Training)
    try {
        const myPhrases = JSON.parse(localStorage.getItem('my-training-phrases') || '[]');
        myPhrases.push(newPhrase);
        localStorage.setItem('my-training-phrases', JSON.stringify(myPhrases));
    } catch { /* */ }
    // Also keep rpg_custom_phrases for backward compat
    const custom = getJSON<TrainingPhrase[]>(K.CUSTOM_PHRASES, []);
    custom.push(newPhrase);
    setJSON(K.CUSTOM_PHRASES, custom);
    return newPhrase;
}

export function updatePhrase(id: string, updates: { english?: string; japanese?: string }): boolean {
    const custom = getJSON<TrainingPhrase[]>(K.CUSTOM_PHRASES, []);
    const idx = custom.findIndex(p => p.id === id);
    if (idx === -1) return false;
    if (updates.english) custom[idx].english = updates.english;
    if (updates.japanese) custom[idx].japanese = updates.japanese;
    setJSON(K.CUSTOM_PHRASES, custom);
    return true;
}

export function deletePhrase(id: string): boolean {
    const custom = getJSON<TrainingPhrase[]>(K.CUSTOM_PHRASES, []);
    const filtered = custom.filter(p => p.id !== id);
    if (filtered.length === custom.length) return false;
    setJSON(K.CUSTOM_PHRASES, filtered);
    return true;
}

// ── Mastery ──────────────────────────────────────────────
export function getMastery(): Record<string, number> {
    return getJSON(K.MASTERY, {});
}

export function getLastLeveled(): Record<string, string> {
    return getJSON(K.LAST_LEVELED, {});
}

export function setMastery(phraseId: string, level: number, today: string): boolean {
    const mastery = getMastery();
    const lastLeveled = getLastLeveled();

    // Same-day gate for level-ups (not resets)
    if (level > 0 && lastLeveled[phraseId] === today) return false;

    mastery[phraseId] = level;
    if (level > 0) lastLeveled[phraseId] = today;

    setJSON(K.MASTERY, mastery);
    setJSON(K.LAST_LEVELED, lastLeveled);
    return true;
}

// ── Card Points ──────────────────────────────────────────
export function getCardPoints(): Record<string, number> {
    return getJSON(K.CARD_POINTS, {});
}

export function addCardPoints(phraseId: string, points: number): number {
    const cp = getCardPoints();
    cp[phraseId] = (cp[phraseId] || 0) + points;
    setJSON(K.CARD_POINTS, cp);
    return cp[phraseId];
}

// ── Player Stats ─────────────────────────────────────────
const DEFAULT_STATS: PlayerStats = {
    total_xp: 0,
    total_touches: 0,
    sparks: 0,
    pity_counter: 0,
    legendary_count: 0,
};

export function getPlayerStats(): PlayerStats {
    return getJSON(K.PLAYER_STATS, { ...DEFAULT_STATS });
}

export function addPlayerXP(xp: number): PlayerStats {
    const stats = getPlayerStats();
    stats.total_xp += xp;
    stats.total_touches += 1;
    setJSON(K.PLAYER_STATS, stats);
    return stats;
}

// ── Gacha (client-side) ──────────────────────────────────
type GachaTier = 'MISS' | 'WIN' | 'BIG' | 'SUPER' | 'ULTRA' | 'MEGA';

const GACHA_TABLE: { tier: GachaTier; weight: number; sparks: number; cardPts: number }[] = [
    { tier: 'MEGA',  weight: 0.5,  sparks: 100, cardPts: 50 },
    { tier: 'ULTRA', weight: 2.5,  sparks: 50,  cardPts: 25 },
    { tier: 'SUPER', weight: 7,    sparks: 20,  cardPts: 10 },
    { tier: 'BIG',   weight: 15,   sparks: 10,  cardPts: 5  },
    { tier: 'WIN',   weight: 25,   sparks: 3,   cardPts: 2  },
    { tier: 'MISS',  weight: 50,   sparks: 0,   cardPts: 0  },
];

export interface GachaResult {
    tier: string;
    sparks_won: number;
    total_sparks: number;
    card_points_earned: number;
    card_total_points: number;
    luck_multiplier: number;
}

export function rollGacha(xp: number, phraseId?: string, fever?: boolean, chainTier?: number): {
    stats: PlayerStats;
    gacha: GachaResult;
    count: number;
    xp: number;
    total_xp: number;
    sparks: number;
} {
    const stats = getPlayerStats();
    stats.total_xp += xp;
    stats.total_touches += 1;

    // Pity bonus: increase odds after consecutive misses
    const pityBonus = Math.min(stats.pity_counter * 2, 30);
    const feverBonus = fever ? (chainTier || 1) * 5 : 0;

    // Roll
    let roll = Math.random() * 100;
    let selectedTier = GACHA_TABLE[GACHA_TABLE.length - 1];

    // Adjust for pity + fever
    roll -= (pityBonus + feverBonus);

    let cumulative = 0;
    for (const entry of GACHA_TABLE) {
        cumulative += entry.weight;
        if (roll < cumulative) {
            selectedTier = entry;
            break;
        }
    }

    // Update pity counter
    if (selectedTier.tier === 'MISS') {
        stats.pity_counter += 1;
    } else {
        stats.pity_counter = 0;
    }

    // Sparks
    const sparksWon = selectedTier.sparks;
    stats.sparks += sparksWon;

    // Card points
    let cardTotal = 0;
    if (phraseId && selectedTier.cardPts > 0) {
        cardTotal = addCardPoints(phraseId, selectedTier.cardPts);
    } else if (phraseId) {
        cardTotal = getCardPoints()[phraseId] || 0;
    }

    if (selectedTier.tier === 'MEGA') {
        stats.legendary_count += 1;
    }

    setJSON(K.PLAYER_STATS, stats);

    // Update today's review count
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const reviews = getJSON<Record<string, ReviewEntry>>(K.REVIEW_COUNTS, {});
    if (!reviews[todayKey]) reviews[todayKey] = { count: 0, xp: 0, sparks: 0 };
    reviews[todayKey].count += 1;
    reviews[todayKey].xp += xp;
    reviews[todayKey].sparks = stats.sparks;
    setJSON(K.REVIEW_COUNTS, reviews);

    return {
        stats,
        gacha: {
            tier: selectedTier.tier,
            sparks_won: sparksWon,
            total_sparks: stats.sparks,
            card_points_earned: selectedTier.cardPts,
            card_total_points: cardTotal,
            luck_multiplier: 1 + pityBonus / 100,
        },
        count: reviews[todayKey].count,
        xp: reviews[todayKey].xp,
        total_xp: stats.total_xp,
        sparks: stats.sparks,
    };
}

// ── Review Counts ────────────────────────────────────────
export function getMonthlyReviewCounts(yearMonth: string): Record<string, ReviewEntry> {
    const all = getJSON<Record<string, ReviewEntry>>(K.REVIEW_COUNTS, {});
    const filtered: Record<string, ReviewEntry> = {};
    for (const [date, entry] of Object.entries(all)) {
        if (date.startsWith(yearMonth)) filtered[date] = entry;
    }
    return filtered;
}

export function incrementReviewCount(date: string, xp: number): ReviewEntry {
    const all = getJSON<Record<string, ReviewEntry>>(K.REVIEW_COUNTS, {});
    if (!all[date]) all[date] = { count: 0, xp: 0, sparks: 0 };
    all[date].count += 1;
    all[date].xp += xp;
    setJSON(K.REVIEW_COUNTS, all);
    return all[date];
}

// ── Date Touches ─────────────────────────────────────────
export function getMonthlyDateTouches(yearMonth: string): Record<string, number> {
    const all = getJSON<Record<string, number>>(K.DATE_TOUCHES, {});
    const filtered: Record<string, number> = {};
    for (const [date, count] of Object.entries(all)) {
        if (date.startsWith(yearMonth)) filtered[date] = count;
    }
    return filtered;
}

export function incrementDateTouch(phraseDate: string) {
    const all = getJSON<Record<string, number>>(K.DATE_TOUCHES, {});
    all[phraseDate] = (all[phraseDate] || 0) + 1;
    setJSON(K.DATE_TOUCHES, all);
}

// ── Phrase Links ─────────────────────────────────────────
export function getPhraseLinks(): Record<string, PhraseLink[]> {
    return getJSON(K.PHRASE_LINKS, {});
}

export function addPhraseLink(phraseId: string, text: string): PhraseLink {
    const all = getPhraseLinks();
    if (!all[phraseId]) all[phraseId] = [];
    const link: PhraseLink = {
        phrase_id: phraseId,
        text,
        created_at: new Date().toISOString(),
    };
    all[phraseId].push(link);
    setJSON(K.PHRASE_LINKS, all);
    return link;
}

// ── User Phrases (vocabulary) ────────────────────────────
export function getUserPhrases(): UserPhrase[] {
    return getJSON(K.USER_PHRASES, []);
}

export function addUserPhrase(data: {
    phrase: string; type: string; meaning: string;
    example?: string; source?: string; date?: string;
}): UserPhrase {
    const all = getUserPhrases();
    // Duplicate check
    if (all.find(p => p.phrase === data.phrase)) {
        throw new Error('Duplicate phrase');
    }
    const newPhrase: UserPhrase = {
        id: `up-${Date.now()}`,
        phrase: data.phrase,
        type: data.type,
        meaning: data.meaning,
        example: data.example,
        source: data.source,
        date: data.date,
        mastery_level: 0,
        created_at: new Date().toISOString(),
    };
    all.push(newPhrase);
    setJSON(K.USER_PHRASES, all);
    return newPhrase;
}
