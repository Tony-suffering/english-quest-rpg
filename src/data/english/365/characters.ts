/**
 * 365 English Master Course -- Character Definitions
 *
 * Built around the Izakaya TOEIC cast
 * Setting: Master Gondo's izakaya in Shimokitazawa
 * Theme: TOEIC-smart professionals who can't actually speak English
 */

// ============================================================
// CHARACTER INTERFACE
// ============================================================

export interface Character365 {
    id: string;
    name: string;
    nameJa: string;
    age: number;
    gender: 'male' | 'female';
    role: string;
    toeicScore: number;
    englishLevel: string;
    personality: string;
    speakingStyle: string;
    catchphrase: string;
    catchphraseJa: string;
    arc: string;
    color: string;
    ttsRate?: number;
    ttsPitch?: number;
}

// ============================================================
// CORE 6 -- Izakaya TOEIC Cast
// ============================================================

export const CORE_CHARACTERS: Character365[] = [
    {
        id: 'yuki',
        name: 'Yuki',
        nameJa: 'ユキ',
        age: 28,
        gender: 'female',
        role: 'Trading company sales. Protagonist. Can read English, cannot speak it.',
        toeicScore: 620,
        englishLevel: 'Reading OK. Speaking near zero. Freezes when spoken to.',
        personality: 'Hardworking, frustrated, self-critical. Knows she should be better.',
        speakingStyle: 'Hesitant. Starts sentences, stops, restarts. Apologizes for her English. Gets braver over time.',
        catchphrase: "I know this word... but I cannot say it.",
        catchphraseJa: '知ってるのに...出てこない。',
        arc: 'Frozen -> first words -> setbacks -> steady growth -> confident speaker',
        color: '#D4AF37',
        ttsRate: 0.9,
        ttsPitch: 1.1,
    },
    {
        id: 'gondo',
        name: 'Master Gondo',
        nameJa: '権藤マスター',
        age: 58,
        gender: 'male',
        role: 'Izakaya owner. Ex-TOEIC instructor. The mentor.',
        toeicScore: 990,
        englishLevel: 'Near-perfect test English. Conversational but formal. Textbook habits.',
        personality: 'Warm, wise, patient. Believes anyone can learn. Strict about effort.',
        speakingStyle: 'Clear, measured. Teaches through questions. Corrects gently. Uses the izakaya as a classroom.',
        catchphrase: "The answer is already inside you. You just need to say it out loud.",
        catchphraseJa: '答えはもう持ってる。声に出すだけだ。',
        arc: 'Mentor -> faces own limits (conversation vs test) -> grows alongside students',
        color: '#78716C',
        ttsRate: 0.9,
        ttsPitch: 0.85,
    },
    {
        id: 'takeshi',
        name: 'Takeshi',
        nameJa: 'タケシ',
        age: 35,
        gender: 'male',
        role: 'IT project manager. Comic relief. TOEIC decent, speaking terrible.',
        toeicScore: 550,
        englishLevel: 'Can read emails. Speaking is a disaster. Panics under pressure.',
        personality: 'Loud, funny, self-deprecating. Makes everyone laugh. Hides insecurity with humor.',
        speakingStyle: 'Mixes Japanese and English randomly. Makes up words. Confident but wrong. Lovable mess.',
        catchphrase: "No problem! ...Wait, big problem.",
        catchphraseJa: '大丈夫大丈夫！...いや、大丈夫じゃない。',
        arc: 'Class clown -> realizes humor works in English too -> finds his voice',
        color: '#3B82F6',
        ttsRate: 1.05,
        ttsPitch: 1.0,
    },
    {
        id: 'lisa',
        name: 'Lisa',
        nameJa: 'リサ',
        age: 32,
        gender: 'female',
        role: 'Foreign marketing company. Returnee. The bridge between worlds.',
        toeicScore: 860,
        englishLevel: 'Fluent. Lived abroad. Natural conversation. Sometimes too fast for others.',
        personality: 'Kind, encouraging, but sometimes forgets how hard it is for beginners.',
        speakingStyle: 'Natural, flowing English. Slows down for others. Explains things simply.',
        catchphrase: "You are closer than you think.",
        catchphraseJa: 'みんなが思ってるより、ずっと近いよ。',
        arc: 'Helper -> learns to teach (not just translate) -> finds purpose',
        color: '#EC4899',
        ttsRate: 1.0,
        ttsPitch: 1.15,
    },
    {
        id: 'kenji',
        name: 'Kenji',
        nameJa: 'ケンジ',
        age: 45,
        gender: 'male',
        role: 'Construction company director. Oldest student. Most reluctant.',
        toeicScore: 480,
        englishLevel: 'Basic reading. Zero conversation. Embarrassed to try in front of younger people.',
        personality: 'Tough exterior, sensitive inside. Proud. Does not want to look foolish.',
        speakingStyle: 'Very short sentences. Direct. Avoids complex structures. Honest.',
        catchphrase: "I am too old for this... but I am here.",
        catchphraseJa: 'もう歳だよ...でも来てるだろ。',
        arc: 'Resistant -> pride hurt -> breakthrough moment -> quiet determination',
        color: '#92400E',
        ttsRate: 0.85,
        ttsPitch: 0.8,
    },
    {
        id: 'mina',
        name: 'Mina',
        nameJa: 'ミナ',
        age: 24,
        gender: 'female',
        role: 'Temp worker. Youngest. Eager but anxious. Trained ears from K-POP.',
        toeicScore: 730,
        englishLevel: 'Listening excellent (music/drama). Speaking timid. High potential.',
        personality: 'Shy, observant, sensitive. Understands more than she lets on.',
        speakingStyle: 'Quiet. When she speaks, surprisingly accurate. Gains confidence slowly.',
        catchphrase: "I understood everything... I just could not answer.",
        catchphraseJa: '全部聞き取れた...でも返せなかった。',
        arc: 'Silent listener -> finds voice -> speaks with clarity -> surprises everyone',
        color: '#8B5CF6',
        ttsRate: 0.95,
        ttsPitch: 1.2,
    },
];

// ============================================================
// EPISODE CONFIG
// ============================================================

export const EPISODE_CONFIG = {
    totalEpisodes: 52,
    daysPerEpisode: 7,
    wordsPerDay: 10,
    wordsPerEpisode: 70,
    totalWords: 3640,
    totalIdioms: 3640,
    startDate: '2026-03-22',
    phases: [
        { name: 'SURVIVAL', episodes: [1, 13], theme: 'Basics: greetings, self-introduction, daily life' },
        { name: 'SOCIAL', episodes: [14, 26], theme: 'Opinions, feelings, storytelling, asking questions' },
        { name: 'REAL LIFE', episodes: [27, 39], theme: 'Work, culture, problem-solving, abstract ideas' },
        { name: 'FLUENCY', episodes: [40, 52], theme: 'Humor, nuance, debate, improvisation' },
    ],
};

// ============================================================
// LOCATION MAP
// ============================================================

export const LOCATIONS = {
    'gondos-izakaya': { name: "Gondo's Izakaya", area: 'Shimokitazawa', description: "Master Gondo's izakaya. Home base. Where English practice happens." },
    'yukis-office': { name: "Yuki's Trading Company", area: 'Otemachi', description: "Where Yuki faces English daily -- emails, calls, meetings." },
    'takeshis-office': { name: "Takeshi's IT Company", area: 'Shibuya', description: "Tech startup. English documentation, Slack in English." },
    'lisas-office': { name: "Lisa's Marketing Firm", area: 'Roppongi', description: "International office. Lisa's natural habitat." },
    'kenjis-site': { name: "Kenji's Construction Site", area: 'Various Tokyo', description: "Where Kenji works. Foreign workers, safety signs in English." },
    'shimokitazawa': { name: 'Shimokitazawa Streets', area: 'Shimokitazawa', description: 'Shopping, eating, running into foreigners.' },
    'station': { name: 'Train Station', area: 'Various', description: 'Helping lost tourists, reading signs.' },
};

// ============================================================
// CHARACTER HELPERS
// ============================================================

export const CHARACTER_COLORS: Record<string, string> = Object.fromEntries(
    CORE_CHARACTERS.map(c => [c.id, c.color])
);

export function getCharacter(id: string): Character365 | undefined {
    return CORE_CHARACTERS.find(c => c.id === id);
}
