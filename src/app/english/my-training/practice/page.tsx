'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
    getAudioCtx, playLevelSound, playGpCoin, playStreakBreak,
    playFeverChainHit, playRankUpSound,
} from '@/lib/training-sounds';
import { MASTER_EXPRESSIONS, MASTER_LEVELS, MasterExpression } from '@/data/english/365/master-expressions';

// ── Practice completion key for calendar ──
const PRACTICE_DONE_KEY = (date: string) => `practice-done-${date}`;

// ── Types ──
interface TrainingPhrase {
    id: string;
    english: string;
    japanese: string;
    category: string;
    date: string;
    situation?: string;
    context?: string;
}

type DrillType = 'ja2en' | 'en2ja' | 'fill' | 'back' | 'listen';

interface DrillRound {
    type: DrillType;
    phrase: TrainingPhrase;
    masterExpr: MasterExpression | null;
    question: string;
    questionSub?: string;
    options: string[];
    correctIdx: number;
    hint: string;
}

// ── Constants ──
const GOLD = '#D4AF37';
const GREEN = '#10B981';
const BLUE = '#3B82F6';
const RED = '#EF4444';
const TEXT = '#1C1917';
const TEXT_SUB = '#57534E';
const TEXT_MUTED = '#78716C';
const TEXT_FAINT = '#A8A29E';
const BG = '#FAFAF9';
const BORDER = '#E7E5E4';

const DRILL_LABELS: Record<DrillType, { label: string; color: string; icon: string }> = {
    ja2en:  { label: '和→英',    color: GOLD,  icon: 'JP' },
    en2ja:  { label: '英→和',    color: GREEN, icon: 'EN' },
    fill:   { label: '穴埋め',   color: BLUE,  icon: '--' },
    back:   { label: '返し',     color: '#8B5CF6', icon: '<>' },
    listen: { label: 'リスニング', color: '#F97316', icon: '))'  },
};

const DAILY_MISSIONS = [
    { id: 'practice_5', label: '5問クリア', target: 5, xp: 10 },
    { id: 'practice_10', label: '10問クリア', target: 10, xp: 25 },
    { id: 'streak_5', label: '5連続正解', target: 5, xp: 20 },
    { id: 'perfect', label: 'パーフェクト', target: 10, xp: 50 },
];

function getTodayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ── Find matching MasterExpression ──
function findMaster(phrase: TrainingPhrase): MasterExpression | null {
    return MASTER_EXPRESSIONS.find(e => e.japanese === phrase.japanese) || null;
}

// ── Build category index for smart distractors ──
function buildCategoryIndex(): Map<string, MasterExpression[]> {
    const idx = new Map<string, MasterExpression[]>();
    for (const expr of MASTER_EXPRESSIONS) {
        const cat = expr.category || 'other';
        if (!idx.has(cat)) idx.set(cat, []);
        idx.get(cat)!.push(expr);
    }
    return idx;
}

// ── Build daySlot index for same-day distractors ──
function buildDayIndex(): Map<number, MasterExpression[]> {
    const idx = new Map<number, MasterExpression[]>();
    for (const expr of MASTER_EXPRESSIONS) {
        const day = expr.daySlot;
        if (!idx.has(day)) idx.set(day, []);
        idx.get(day)!.push(expr);
    }
    return idx;
}

const CATEGORY_INDEX = buildCategoryIndex();
const DAY_INDEX = buildDayIndex();

// ── Smart distractors: same category first, then same day, then random ──
function getSmartDistractors(
    correct: string,
    master: MasterExpression | null,
    pool: string[],
    level: 0 | 1 | 2 | 3,
    count: number,
): string[] {
    const picked: string[] = [];
    const used = new Set([correct]);

    // Priority 1: Same category expressions (most confusing = best distractors)
    if (master) {
        const sameCat = CATEGORY_INDEX.get(master.category) || [];
        const catPool = shuffle(sameCat.filter(e => e.japanese !== master.japanese));
        for (const e of catPool) {
            if (picked.length >= count) break;
            const val = e.english[level];
            if (val && !used.has(val)) { picked.push(val); used.add(val); }
        }
    }

    // Priority 2: Same daySlot (similar theme = plausible wrong answers)
    if (picked.length < count && master) {
        const sameDay = DAY_INDEX.get(master.daySlot) || [];
        const dayPool = shuffle(sameDay.filter(e => e.japanese !== master.japanese));
        for (const e of dayPool) {
            if (picked.length >= count) break;
            const val = e.english[level];
            if (val && !used.has(val)) { picked.push(val); used.add(val); }
        }
    }

    // Priority 3: Similar length strings from global pool (harder to guess by length)
    if (picked.length < count) {
        const lenTarget = correct.length;
        const sorted = shuffle(pool.filter(s => !used.has(s) && s.length > 0))
            .sort((a, b) => Math.abs(a.length - lenTarget) - Math.abs(b.length - lenTarget));
        for (const s of sorted) {
            if (picked.length >= count) break;
            if (!used.has(s)) { picked.push(s); used.add(s); }
        }
    }

    return picked.slice(0, count);
}

// ── Legacy fallback for simple pools (ja distractors) ──
function getDistractors(
    correct: string,
    pool: string[],
    count: number,
    master?: MasterExpression | null,
): string[] {
    // For Japanese: prefer same category
    if (master) {
        const picked: string[] = [];
        const used = new Set([correct]);
        const sameCat = CATEGORY_INDEX.get(master.category) || [];
        const catJa = shuffle(sameCat.filter(e => e.japanese !== master.japanese));
        for (const e of catJa) {
            if (picked.length >= count) break;
            if (!used.has(e.japanese)) { picked.push(e.japanese); used.add(e.japanese); }
        }
        // Fill remainder from pool
        if (picked.length < count) {
            const rest = shuffle(pool.filter(s => !used.has(s)));
            for (const s of rest) {
                if (picked.length >= count) break;
                picked.push(s); used.add(s);
            }
        }
        return picked;
    }
    const filtered = pool.filter(s => s !== correct && s.length > 0);
    return shuffle(filtered).slice(0, count);
}

function makeOptions(correct: string, distractors: string[]): { options: string[]; correctIdx: number } {
    const options = shuffle([correct, ...distractors]);
    const correctIdx = options.indexOf(correct);
    return { options, correctIdx: correctIdx >= 0 ? correctIdx : 0 };
}

// ── Extract a blankable word from English phrase ──
function extractBlankWord(en: string): { blanked: string; word: string } | null {
    const words = en.replace(/[.,!?;:'"]/g, '').split(/\s+/).filter(w => w.length >= 3);
    // Skip function words — we want content words (verbs, nouns, adjectives, adverbs)
    const skip = new Set([
        'the', 'a', 'an', 'is', 'are', 'was', 'were', 'am', 'be', 'been', 'being',
        'do', 'does', 'did', 'has', 'have', 'had', 'will', 'would', 'could', 'should',
        'can', 'may', 'might', 'shall', 'must',
        'not', 'and', 'but', 'or', 'nor', 'for', 'yet', 'so',
        'that', 'this', 'these', 'those', 'which', 'what', 'who', 'whom',
        'with', 'from', 'into', 'onto', 'upon', 'about', 'than',
        'you', 'your', 'his', 'her', 'its', 'our', 'their', 'my',
        'just', 'also', 'very', 'too', 'really', 'quite', 'well',
        'all', 'each', 'every', 'some', 'any', 'many', 'much', 'few',
        'there', 'here', 'where', 'when', 'how', 'why',
        'like', 'know', 'think', 'going', 'gonna', 'gotta', 'wanna',
    ]);
    const candidates = words.filter(w => !skip.has(w.toLowerCase()));
    if (candidates.length === 0) return null;
    // Prefer longer words (more meaningful) — weight by length
    const weighted = candidates.sort((a, b) => b.length - a.length);
    // Pick from top half (longer words) with some randomness
    const topHalf = weighted.slice(0, Math.max(1, Math.ceil(weighted.length / 2)));
    const word = topHalf[Math.floor(Math.random() * topHalf.length)];
    const idx = en.indexOf(word);
    if (idx === -1) return null;
    const blanked = en.substring(0, idx) + '____' + en.substring(idx + word.length);
    return { blanked, word };
}

// ── Generate drill rounds ──
function generateDrills(
    phrases: TrainingPhrase[],
    count: number,
): DrillRound[] {
    const selected = shuffle(phrases).slice(0, count);
    const allJa = MASTER_EXPRESSIONS.map(e => e.japanese);
    const allEnCore = MASTER_EXPRESSIONS.map(e => e.english[0]);
    const allEnVibe = MASTER_EXPRESSIONS.map(e => e.english[1]);
    const allEnScene = MASTER_EXPRESSIONS.map(e => e.english[2]);
    const allBack = MASTER_EXPRESSIONS.map(e => e.english[3]);
    // Collect fill-blank word pool
    const allWords = MASTER_EXPRESSIONS.flatMap(e =>
        e.english.flatMap(s => s.replace(/[.,!?;:'"]/g, '').split(/\s+/).filter(w => w.length >= 3))
    );
    const uniqueWords = Array.from(new Set(allWords.map(w => w.toLowerCase())));

    const drillTypes: DrillType[] = ['ja2en', 'en2ja', 'fill', 'back', 'listen'];

    return selected.map<DrillRound>((phrase) => {
        const master = findMaster(phrase);

        // Pick drill type with weights
        let type: DrillType;
        const r = Math.random();
        if (r < 0.28) type = 'ja2en';
        else if (r < 0.48) type = 'en2ja';
        else if (r < 0.66) type = 'fill';
        else if (r < 0.82) type = 'back';
        else type = 'listen';

        // If no master data, fall back to ja2en or en2ja
        if (!master && (type === 'fill' || type === 'back')) {
            type = Math.random() < 0.5 ? 'ja2en' : 'en2ja';
        }

        const hint = phrase.situation?.split(' -- ')[0] || '';

        // Determine which level the phrase is at
        const level: 0 | 1 | 2 | 3 = master
            ? (phrase.english === master.english[0] ? 0
                : phrase.english === master.english[1] ? 1
                : phrase.english === master.english[2] ? 2 : 0)
            : 0;

        switch (type) {
            case 'ja2en': {
                const correct = phrase.english;
                const distractors = getSmartDistractors(correct, master, allEnCore, level, 3);
                const { options, correctIdx } = makeOptions(correct, distractors);
                return {
                    type, phrase, masterExpr: master,
                    question: phrase.japanese,
                    questionSub: '英語でなんて言う？',
                    options, correctIdx, hint,
                };
            }
            case 'en2ja': {
                const correct = phrase.japanese;
                const distractors = getDistractors(correct, allJa, 3, master);
                const { options, correctIdx } = makeOptions(correct, distractors);
                return {
                    type, phrase, masterExpr: master,
                    question: phrase.english,
                    questionSub: 'どういう意味？',
                    options, correctIdx, hint,
                };
            }
            case 'listen': {
                const correct = phrase.japanese;
                const distractors = getDistractors(correct, allJa, 3, master);
                const { options, correctIdx } = makeOptions(correct, distractors);
                return {
                    type, phrase, masterExpr: master,
                    question: '音声を聞いて選んでください',
                    options, correctIdx, hint,
                };
            }
            case 'fill': {
                const en = phrase.english;
                const blank = extractBlankWord(en);
                if (!blank) {
                    const correct = phrase.english;
                    const distractors = getSmartDistractors(correct, master, allEnCore, level, 3);
                    const { options, correctIdx } = makeOptions(correct, distractors);
                    return {
                        type: 'ja2en', phrase, masterExpr: master,
                        question: phrase.japanese,
                        questionSub: '英語でなんて言う？',
                        options, correctIdx, hint,
                    };
                }
                const correct = blank.word;
                // Smart word distractors: similar length words from same category
                const catWords = master
                    ? (CATEGORY_INDEX.get(master.category) || [])
                        .flatMap(e => e.english.flatMap(s => s.replace(/[.,!?;:'"]/g, '').split(/\s+/).filter(w => w.length >= 3)))
                    : [];
                const wordPool = catWords.length > 10
                    ? Array.from(new Set(catWords.map(w => w.toLowerCase())))
                    : uniqueWords;
                const wordDistractors = shuffle(
                    wordPool.filter(w => w !== correct.toLowerCase())
                        .sort((a, b) => Math.abs(a.length - correct.length) - Math.abs(b.length - correct.length))
                ).slice(0, 3).map(w => w.charAt(0) + w.slice(1));
                const { options, correctIdx } = makeOptions(correct, wordDistractors);
                return {
                    type, phrase, masterExpr: master,
                    question: blank.blanked,
                    questionSub: phrase.japanese,
                    options, correctIdx, hint,
                };
            }
            case 'back': {
                if (!master) {
                    const correct = phrase.english;
                    const distractors = getSmartDistractors(correct, master, allEnCore, level, 3);
                    const { options, correctIdx } = makeOptions(correct, distractors);
                    return {
                        type: 'ja2en', phrase, masterExpr: master,
                        question: phrase.japanese,
                        questionSub: '英語でなんて言う？',
                        options, correctIdx, hint,
                    };
                }
                const correct = master.english[3];
                const distractors = getSmartDistractors(correct, master, allBack, 3, 3);
                const { options, correctIdx } = makeOptions(correct, distractors);
                const yourPhrase = master.english[2] || master.english[1] || master.english[0];
                return {
                    type, phrase, masterExpr: master,
                    question: yourPhrase,
                    questionSub: '相手はなんて返す？',
                    options, correctIdx, hint,
                };
            }
            default: {
                const correct = phrase.english;
                const distractors = getSmartDistractors(correct, master, allEnCore, level, 3);
                const { options, correctIdx } = makeOptions(correct, distractors);
                return {
                    type: 'ja2en' as DrillType, phrase, masterExpr: master,
                    question: phrase.japanese,
                    questionSub: '英語でなんて言う？',
                    options, correctIdx, hint,
                };
            }
        }
    }).filter(Boolean) as DrillRound[];
}

// ── Component ──
export default function PracticePage() {
    const [phrases, setPhrases] = useState<TrainingPhrase[]>([]);
    const [rounds, setRounds] = useState<DrillRound[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [sessionScore, setSessionScore] = useState(0);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [started, setStarted] = useState(false);
    const [drillCount, setDrillCount] = useState(10);
    const [isMobile, setIsMobile] = useState(false);
    const [ttsPlaying, setTtsPlaying] = useState(false);
    const [correctFlash, setCorrectFlash] = useState(false);
    const [comboText, setComboText] = useState<string | null>(null);
    const prevMissionsDone = useRef(-1);
    const synthRef = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        synthRef.current = window.speechSynthesis;
    }, []);

    // Load phrases
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        try {
            // Only use user-registered phrases, never the full tl_phrases pool
            const raw = localStorage.getItem('my-training-phrases');
            const registered: TrainingPhrase[] = raw ? JSON.parse(raw) : [];
            setPhrases(registered);
        } catch { /* */ }

        try {
            const raw = localStorage.getItem(`practice-progress-${getTodayStr()}`);
            if (raw) {
                const data = JSON.parse(raw);
                setScore(data.score || 0);
                setBestStreak(data.bestStreak || 0);
                setTotalAttempts(data.totalAttempts || 0);
            }
        } catch { /* */ }

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Start session
    const startSession = useCallback((count: number) => {
        setDrillCount(count);
        setRounds(generateDrills(phrases, Math.min(count, phrases.length)));
        setCurrentIdx(0);
        setSelected(null);
        setStreak(0);
        setSessionScore(0);
        setSessionComplete(false);
        setStarted(true);
    }, [phrases]);

    // Save progress
    const saveProgress = useCallback((s: number, bs: number, ta: number) => {
        try {
            localStorage.setItem(`practice-progress-${getTodayStr()}`, JSON.stringify({
                score: s, bestStreak: bs, totalAttempts: ta,
            }));
        } catch { /* */ }
    }, []);

    const current = rounds[currentIdx];
    const totalRounds = rounds.length;

    // Play TTS for listening drills
    const playTTS = useCallback((text: string) => {
        if (!synthRef.current) return;
        synthRef.current.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 0.85;
        u.onstart = () => setTtsPlaying(true);
        u.onend = () => setTtsPlaying(false);
        synthRef.current.speak(u);
    }, []);

    // Auto-play TTS for listen drills
    useEffect(() => {
        if (current?.type === 'listen' && selected === null) {
            setTimeout(() => playTTS(current.phrase.english), 300);
        }
    }, [current, selected, playTTS]);

    // Handle option selection
    const handleSelect = useCallback((idx: number) => {
        if (selected !== null) return; // Already answered
        setSelected(idx);

        const correct = idx === current.correctIdx;
        const newScore = correct ? score + 1 : score;
        const newSessionScore = correct ? sessionScore + 1 : sessionScore;
        const newStreak = correct ? streak + 1 : 0;
        const newBest = Math.max(bestStreak, newStreak);
        const newAttempts = totalAttempts + 1;

        if (correct) {
            if (newStreak >= 3) playFeverChainHit(newStreak);
            else playLevelSound(3);
            // Flash effect
            setCorrectFlash(true);
            setTimeout(() => setCorrectFlash(false), 400);
            // Combo text
            if (newStreak >= 3) {
                const combos = ['NICE!', 'GREAT!', 'EXCELLENT!', 'AMAZING!', 'GODLIKE!'];
                setComboText(combos[Math.min(Math.floor((newStreak - 3) / 2), combos.length - 1)]);
                setTimeout(() => setComboText(null), 800);
            }
        } else {
            if (streak >= 2) playStreakBreak();
        }

        setScore(newScore);
        setSessionScore(newSessionScore);
        setStreak(newStreak);
        setBestStreak(newBest);
        setTotalAttempts(newAttempts);
        saveProgress(newScore, newBest, newAttempts);

        // Don't auto-advance — let user read the explanation and tap "次へ"
        // Only auto-advance on correct if streak is going (keeps momentum)
        if (correct && newStreak >= 2) {
            setTimeout(() => {
                if (currentIdx + 1 >= totalRounds) {
                    finishSession(newSessionScore, totalRounds);
                } else {
                    setCurrentIdx(prev => prev + 1);
                    setSelected(null);
                }
            }, 1200);
        }
    }, [selected, current, score, sessionScore, streak, bestStreak, totalAttempts, currentIdx, totalRounds, saveProgress]);

    // Finish session helper
    const finishSession = useCallback((finalScore: number, total: number) => {
        setSessionComplete(true);
        try {
            localStorage.setItem(PRACTICE_DONE_KEY(getTodayStr()), JSON.stringify({
                score: finalScore, total, timestamp: Date.now(),
            }));
        } catch { /* */ }
        setTimeout(() => playLevelSound(6), 300);
    }, []);

    // Manual advance (when user taps "次へ")
    const advanceToNext = useCallback(() => {
        if (currentIdx + 1 >= totalRounds) {
            finishSession(sessionScore, totalRounds);
        } else {
            setCurrentIdx(prev => prev + 1);
            setSelected(null);
        }
    }, [currentIdx, totalRounds, sessionScore, finishSession]);

    // Restart
    const restart = useCallback(() => {
        setRounds(generateDrills(phrases, Math.min(drillCount, phrases.length)));
        setCurrentIdx(0);
        setSelected(null);
        setStreak(0);
        setSessionScore(0);
        setSessionComplete(false);
    }, [phrases, drillCount]);

    // Daily missions
    const missions = useMemo(() => {
        return DAILY_MISSIONS.map(m => {
            let current = 0;
            if (m.id === 'practice_5') current = Math.min(totalAttempts, m.target);
            if (m.id === 'practice_10') current = Math.min(totalAttempts, m.target);
            if (m.id === 'streak_5') current = Math.min(bestStreak, m.target);
            if (m.id === 'perfect') current = Math.min(sessionScore, m.target);
            return { ...m, current, done: current >= m.target };
        });
    }, [totalAttempts, bestStreak, sessionScore]);

    const totalXP = missions.filter(m => m.done).reduce((sum, m) => sum + m.xp, 0);
    const doneCount = missions.filter(m => m.done).length;

    useEffect(() => {
        if (prevMissionsDone.current >= 0 && doneCount > prevMissionsDone.current) {
            playRankUpSound('GOLD');
        }
        prevMissionsDone.current = doneCount;
    }, [doneCount]);

    // ── Empty state ──
    if (phrases.length === 0) {
        return (
            <div style={{
                maxWidth: 480, margin: '0 auto', padding: '60px 20px',
                textAlign: 'center',
            }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: TEXT, marginBottom: 8 }}>
                    まだフレーズがありません
                </div>
                <div style={{ fontSize: 13, color: TEXT_MUTED, lineHeight: 1.6, marginBottom: 24 }}>
                    英会話マスター365でフレーズを登録すると、<br />
                    ここで5種類のドリルが解禁されます。
                </div>
                <Link href="/english/izakaya-toeic/kaiwa" style={{
                    display: 'inline-block', padding: '12px 24px',
                    background: GREEN, color: '#fff', borderRadius: 10,
                    fontSize: 14, fontWeight: 700, textDecoration: 'none',
                }}>
                    マスター365へ
                </Link>
            </div>
        );
    }

    // ── Intro / Welcome screen ──
    if (!started) {
        const todayProgress = totalAttempts > 0;
        const countOptions: { n: number; label: string; time: string }[] = [
            { n: 5,  label: 'サクッと5問',  time: '約30秒' },
            { n: 10, label: 'しっかり10問', time: '約1分' },
            { n: 15, label: 'ガッツリ15問', time: '約2分' },
        ];
        return (
            <div style={{
                maxWidth: 480, margin: '0 auto',
                padding: isMobile ? '24px 16px' : '40px 20px',
                minHeight: '100vh',
            }}>
                {/* Back link */}
                <Link href="/english/my-training" style={{
                    fontSize: 12, color: TEXT_FAINT, textDecoration: 'none',
                    display: 'inline-block', marginBottom: 20,
                }}>
                    ← トレーニングに戻る
                </Link>

                {/* Title */}
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{
                        fontSize: 20, fontWeight: 900, color: TEXT,
                        lineHeight: 1.4, marginBottom: 6,
                    }}>
                        実習ドリル
                    </div>
                    <div style={{ fontSize: 13, color: TEXT_MUTED, lineHeight: 1.6 }}>
                        登録した {phrases.length} フレーズから4択で出題
                    </div>
                </div>

                {/* Today's stats (if any) */}
                {todayProgress && (
                    <div style={{
                        background: '#ECFDF5', border: `1px solid ${GREEN}30`,
                        borderRadius: 12, padding: '10px 16px',
                        marginBottom: 20, display: 'flex',
                        justifyContent: 'space-around', textAlign: 'center',
                    }}>
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 900, color: GREEN }}>{score}</div>
                            <div style={{ fontSize: 9, fontWeight: 600, color: TEXT_FAINT }}>正解</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 900, color: GOLD }}>{bestStreak}</div>
                            <div style={{ fontSize: 9, fontWeight: 600, color: TEXT_FAINT }}>最高連続</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 900, color: BLUE }}>{totalAttempts}</div>
                            <div style={{ fontSize: 9, fontWeight: 600, color: TEXT_FAINT }}>今日の合計</div>
                        </div>
                    </div>
                )}

                {/* Drill types - compact */}
                <div style={{
                    background: '#fff', border: `1px solid ${BORDER}`,
                    borderRadius: 14, padding: '14px 16px',
                    marginBottom: 20,
                }}>
                    <div style={{
                        fontSize: 11, fontWeight: 700, color: TEXT_MUTED,
                        marginBottom: 10,
                    }}>
                        ランダムで5種類のドリルが出る
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {(Object.entries(DRILL_LABELS) as [DrillType, typeof DRILL_LABELS[DrillType]][]).map(([key, info]) => (
                            <span key={key} style={{
                                fontSize: 11, fontWeight: 700, color: info.color,
                                padding: '4px 10px', borderRadius: 6,
                                background: `${info.color}12`,
                                border: `1px solid ${info.color}25`,
                            }}>
                                {info.label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Question count selector - Japanese, clear */}
                <div style={{ marginBottom: 20 }}>
                    <div style={{
                        fontSize: 11, fontWeight: 700, color: TEXT_MUTED,
                        marginBottom: 8,
                    }}>
                        問題数をえらぶ
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {countOptions.map(({ n, label, time }) => (
                            <button
                                key={n}
                                onClick={() => setDrillCount(n)}
                                style={{
                                    display: 'flex', alignItems: 'center',
                                    padding: '12px 16px',
                                    borderRadius: 12,
                                    border: drillCount === n
                                        ? `2px solid ${GOLD}`
                                        : `2px solid ${BORDER}`,
                                    background: drillCount === n ? '#FFFBEB' : '#fff',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s',
                                }}
                            >
                                <span style={{
                                    fontSize: 15, fontWeight: 900,
                                    color: drillCount === n ? GOLD : TEXT_MUTED,
                                    marginRight: 12, minWidth: 24,
                                }}>
                                    {n}
                                </span>
                                <span style={{
                                    fontSize: 14, fontWeight: 700,
                                    color: drillCount === n ? TEXT : TEXT_MUTED,
                                    flex: 1, textAlign: 'left',
                                }}>
                                    {label}
                                </span>
                                <span style={{
                                    fontSize: 11, fontWeight: 600,
                                    color: TEXT_FAINT,
                                }}>
                                    {time}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* START button */}
                <button
                    onClick={() => startSession(drillCount)}
                    style={{
                        width: '100%', padding: '16px',
                        background: `linear-gradient(135deg, ${GOLD}, ${GREEN})`,
                        color: '#fff', border: 'none',
                        borderRadius: 14, fontSize: 16, fontWeight: 900,
                        cursor: 'pointer',
                        transition: 'transform 0.15s',
                    }}
                    onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
                    onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                    {drillCount}問スタート
                </button>

                {/* Missions */}
                <div style={{
                    background: '#fff', border: `1px solid ${BORDER}`,
                    borderRadius: 12, padding: 14, marginTop: 16,
                }}>
                    <div style={{
                        fontSize: 11, fontWeight: 700, color: TEXT_MUTED,
                        marginBottom: 8,
                    }}>
                        今日のミッション
                    </div>
                    {missions.map(m => (
                        <div key={m.id} style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '5px 0',
                        }}>
                            <div style={{
                                width: 18, height: 18, borderRadius: '50%',
                                border: m.done ? `2px solid ${GREEN}` : `2px solid ${BORDER}`,
                                background: m.done ? GREEN : '#fff',
                                color: m.done ? '#fff' : '#D6D3D1',
                                fontSize: 10, fontWeight: 700,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {m.done ? '\u2713' : ''}
                            </div>
                            <span style={{
                                fontSize: 12, fontWeight: 600,
                                color: m.done ? GREEN : TEXT_SUB, flex: 1,
                            }}>
                                {m.label}
                            </span>
                            <span style={{
                                fontSize: 10, fontWeight: 700,
                                color: m.done ? GOLD : '#D6D3D1',
                            }}>
                                +{m.xp} XP
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ── Session complete ──
    if (sessionComplete) {
        const accuracy = totalRounds > 0 ? Math.round((sessionScore / totalRounds) * 100) : 0;
        const isPerfect = sessionScore === totalRounds;
        const isGreat = accuracy >= 80;
        const confettiColors = ['#D4AF37', '#10B981', '#3B82F6', '#F97316', '#8B5CF6', '#EC4899'];
        return (
            <div style={{
                maxWidth: 480, margin: '0 auto', padding: '40px 20px',
                position: 'relative', overflow: 'hidden', minHeight: '100vh',
            }}>
                <style>{`
                    @keyframes pr-confetti-fall {
                        0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                    }
                    @keyframes pr-result-slam {
                        0% { transform: scale(3); opacity: 0; }
                        50% { transform: scale(0.9); opacity: 1; }
                        70% { transform: scale(1.05); }
                        100% { transform: scale(1); opacity: 1; }
                    }
                    @keyframes pr-shine {
                        0% { background-position: -200% center; }
                        100% { background-position: 200% center; }
                    }
                    @keyframes pr-stat-in {
                        0% { transform: translateY(20px); opacity: 0; }
                        100% { transform: translateY(0); opacity: 1; }
                    }
                `}</style>

                {/* Confetti particles */}
                {(isPerfect || isGreat) && Array.from({ length: isPerfect ? 30 : 12 }).map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        top: -10,
                        left: `${Math.random() * 100}%`,
                        width: Math.random() * 8 + 4,
                        height: Math.random() * 8 + 4,
                        background: confettiColors[i % confettiColors.length],
                        borderRadius: Math.random() > 0.5 ? '50%' : 2,
                        animation: `pr-confetti-fall ${Math.random() * 2 + 1.5}s ease-in ${Math.random() * 0.5}s forwards`,
                        pointerEvents: 'none' as const,
                        zIndex: 10,
                    }} />
                ))}

                <div style={{
                    background: isPerfect
                        ? 'linear-gradient(135deg, #FEF3C7, #ECFDF5)'
                        : isGreat ? 'linear-gradient(135deg, #F5F5F4, #ECFDF5)' : '#fff',
                    border: isPerfect ? `2px solid ${GOLD}` : `1px solid ${BORDER}`,
                    borderRadius: 16, padding: '32px 24px', textAlign: 'center',
                    marginBottom: 20, position: 'relative', zIndex: 20,
                }}>
                    {isPerfect && (
                        <div style={{
                            fontSize: 13, fontWeight: 900, color: GOLD,
                            letterSpacing: '0.3em', marginBottom: 12,
                            padding: '6px 20px', display: 'inline-block',
                            background: 'linear-gradient(90deg, #FFFBEB, #FEF3C7, #FFFBEB)',
                            backgroundSize: '200% 100%',
                            animation: 'pr-shine 2s linear infinite',
                            borderRadius: 20,
                            border: `1px solid ${GOLD}60`,
                        }}>
                            PERFECT
                        </div>
                    )}
                    <div style={{
                        fontSize: 12, fontWeight: 700, color: TEXT_FAINT,
                        letterSpacing: '0.2em', marginBottom: 8,
                    }}>
                        セッション完了
                    </div>
                    <div style={{
                        fontSize: 64, fontWeight: 900,
                        color: isPerfect ? GOLD : isGreat ? GREEN : accuracy >= 50 ? BLUE : TEXT_MUTED,
                        lineHeight: 1, marginBottom: 4,
                        animation: 'pr-result-slam 0.6s ease-out',
                    }}>
                        {accuracy}%
                    </div>
                    <div style={{ fontSize: 14, color: TEXT_SUB, marginBottom: 24 }}>
                        {sessionScore}/{totalRounds} 正解
                    </div>

                    <div style={{
                        display: 'flex', justifyContent: 'center', gap: 32,
                        marginBottom: 24,
                    }}>
                        {[
                            { val: bestStreak, label: '最高連続', c: GOLD, delay: '0.2s' },
                            { val: totalXP, label: '獲得XP', c: GREEN, delay: '0.35s' },
                            { val: totalAttempts, label: '今日の合計', c: BLUE, delay: '0.5s' },
                        ].map(s => (
                            <div key={s.label} style={{
                                animation: `pr-stat-in 0.4s ease-out ${s.delay} both`,
                            }}>
                                <div style={{ fontSize: 26, fontWeight: 900, color: s.c }}>{s.val}</div>
                                <div style={{ fontSize: 10, color: TEXT_FAINT }}>{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Today's practice marked! */}
                    <div style={{
                        padding: '8px 16px', borderRadius: 8,
                        background: '#ECFDF5', border: `1px solid ${GREEN}30`,
                        fontSize: 12, fontWeight: 700, color: GREEN,
                        marginBottom: 20, display: 'inline-block',
                    }}>
                        今日の実習クリア
                    </div>

                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                        <button onClick={restart} style={{
                            padding: '14px 32px', background: GREEN, color: '#fff',
                            border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 800,
                            cursor: 'pointer', letterSpacing: '0.05em',
                        }}>
                            もう1セット
                        </button>
                        <Link href="/english/my-training" style={{
                            padding: '14px 24px', background: '#fff', color: TEXT_MUTED,
                            border: `1px solid ${BORDER}`, borderRadius: 12,
                            fontSize: 14, fontWeight: 700, textDecoration: 'none',
                            display: 'inline-flex', alignItems: 'center',
                        }}>
                            トレーニングへ
                        </Link>
                    </div>
                </div>

                {/* Missions */}
                <div style={{
                    background: '#fff', border: `1px solid ${BORDER}`,
                    borderRadius: 12, padding: 16,
                }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: TEXT_FAINT, letterSpacing: '0.15em', marginBottom: 12 }}>
                        今日のミッション
                    </div>
                    {missions.map(m => (
                        <div key={m.id} style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '8px 0', borderBottom: `1px solid #F5F5F4`,
                        }}>
                            <div style={{
                                width: 22, height: 22, borderRadius: '50%',
                                border: m.done ? `2px solid ${GREEN}` : `2px solid ${BORDER}`,
                                background: m.done ? GREEN : '#fff',
                                color: m.done ? '#fff' : '#D6D3D1',
                                fontSize: 12, fontWeight: 700,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {m.done ? '\u2713' : ''}
                            </div>
                            <div style={{ flex: 1 }}>
                                <span style={{
                                    fontSize: 13, fontWeight: 600,
                                    color: m.done ? GREEN : '#44403C',
                                }}>{m.label}</span>
                            </div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: m.done ? GREEN : TEXT_FAINT }}>
                                {m.current}/{m.target}
                            </div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: m.done ? GOLD : '#D6D3D1' }}>
                                +{m.xp} XP
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        );
    }

    // ── Main drill UI ──
    if (!current) return null;

    const drillInfo = DRILL_LABELS[current.type];
    const answered = selected !== null;
    const isCorrect = selected === current.correctIdx;

    return (
        <div style={{
            maxWidth: 480, margin: '0 auto',
            padding: isMobile ? '16px' : '32px 20px',
            minHeight: '100vh',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Keyframes */}
            <style>{`
                @keyframes pr-flash { 0% { opacity: 0.6; } 100% { opacity: 0; } }
                @keyframes pr-combo-pop {
                    0% { transform: scale(0.3) translateY(0); opacity: 0; }
                    30% { transform: scale(1.3) translateY(-10px); opacity: 1; }
                    70% { transform: scale(1) translateY(-30px); opacity: 1; }
                    100% { transform: scale(0.8) translateY(-60px); opacity: 0; }
                }
                @keyframes pr-streak-glow {
                    0%, 100% { box-shadow: 0 0 8px rgba(234,88,12,0.3); }
                    50% { box-shadow: 0 0 20px rgba(234,88,12,0.6); }
                }
                @keyframes pr-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
                @keyframes pr-shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
                @keyframes pr-confetti-fall {
                    0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
                }
                @keyframes pr-result-slam {
                    0% { transform: scale(3); opacity: 0; }
                    50% { transform: scale(0.9); opacity: 1; }
                    70% { transform: scale(1.05); }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>

            {/* Correct flash overlay */}
            {correctFlash && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 100,
                    background: `radial-gradient(circle, ${GREEN}30 0%, transparent 70%)`,
                    animation: 'pr-flash 0.4s ease-out forwards',
                    pointerEvents: 'none',
                }} />
            )}

            {/* Combo text popup */}
            {comboText && (
                <div style={{
                    position: 'fixed', top: '35%', left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 101, pointerEvents: 'none',
                    fontSize: 32, fontWeight: 900,
                    color: streak >= 7 ? '#DC2626' : streak >= 5 ? '#EA580C' : GOLD,
                    textShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    animation: 'pr-combo-pop 0.8s ease-out forwards',
                    letterSpacing: '0.05em',
                }}>
                    {comboText}
                </div>
            )}
            {/* Header */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 16,
            }}>
                <Link href="/english/my-training" style={{
                    fontSize: 12, color: TEXT_FAINT, textDecoration: 'none',
                }}>
                    ← トレーニング
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {streak >= 2 && (
                        <span style={{
                            fontSize: 11, fontWeight: 800,
                            color: streak >= 7 ? '#DC2626' : '#EA580C',
                            padding: '2px 8px',
                            background: streak >= 7 ? '#FEF2F2' : '#FFF7ED',
                            borderRadius: 6,
                            border: streak >= 7 ? '1px solid #FECACA' : '1px solid #FED7AA',
                            animation: streak >= 5 ? 'pr-streak-glow 1s ease-in-out infinite' : 'none',
                        }}>
                            {streak >= 7 ? 'FEVER ' : ''}{streak}連続
                        </span>
                    )}
                    <span style={{ fontSize: 14, fontWeight: 800, color: GOLD }}>
                        {sessionScore}/{totalRounds}
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{
                height: 5, background: '#F5F5F4', borderRadius: 3,
                marginBottom: 20, overflow: 'hidden',
            }}>
                <div style={{
                    height: '100%',
                    width: `${((currentIdx) / totalRounds) * 100}%`,
                    background: `linear-gradient(90deg, ${GOLD}, ${GREEN})`,
                    borderRadius: 3,
                    transition: 'width 0.4s ease',
                }} />
            </div>

            {/* Drill type badge + question number */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 12,
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                }}>
                    <span style={{
                        fontSize: 9, fontWeight: 900, color: '#fff',
                        padding: '3px 6px', borderRadius: 4,
                        background: drillInfo.color,
                        letterSpacing: '0.05em',
                    }}>
                        {drillInfo.icon}
                    </span>
                    <span style={{
                        fontSize: 11, fontWeight: 700, color: drillInfo.color,
                    }}>
                        {drillInfo.label}
                    </span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: TEXT_FAINT }}>
                    Q{currentIdx + 1} / {totalRounds}
                </span>
            </div>

            {/* Question card */}
            <div style={{
                background: '#fff', borderRadius: 16,
                border: `1px solid ${BORDER}`,
                overflow: 'hidden',
                marginBottom: 12,
            }}>
                {/* Question area */}
                <div style={{ padding: '24px 20px' }}>
                    {current.hint && (
                        <div style={{
                            fontSize: 10, fontWeight: 600, color: GREEN,
                            padding: '2px 8px', background: '#ECFDF5',
                            borderRadius: 4, display: 'inline-block',
                            marginBottom: 10,
                        }}>
                            {current.hint}
                        </div>
                    )}

                    {current.type === 'listen' && (
                        <button
                            onClick={() => playTTS(current.phrase.english)}
                            disabled={ttsPlaying}
                            style={{
                                width: '100%', padding: '20px',
                                background: ttsPlaying ? '#FFF7ED' : BG,
                                border: `2px solid ${ttsPlaying ? '#F97316' : BORDER}`,
                                borderRadius: 12, cursor: 'pointer',
                                marginBottom: 16,
                                transition: 'all 0.2s',
                            }}
                        >
                            <div style={{
                                fontSize: 28, fontWeight: 300,
                                color: ttsPlaying ? '#F97316' : TEXT_MUTED,
                                marginBottom: 4,
                            }}>
                                {ttsPlaying ? '))) ...' : '))'}
                            </div>
                            <div style={{ fontSize: 12, color: TEXT_FAINT }}>
                                {ttsPlaying ? '再生中...' : 'タップで再生'}
                            </div>
                        </button>
                    )}

                    {current.type !== 'listen' && (
                        <div style={{
                            fontSize: current.type === 'fill' ? 16 : 17,
                            fontWeight: 700,
                            color: TEXT,
                            lineHeight: 1.6,
                            marginBottom: current.questionSub ? 8 : 0,
                            fontStyle: current.type === 'back' ? 'normal' : 'normal',
                        }}>
                            {current.type === 'back' && (
                                <span style={{
                                    fontSize: 10, fontWeight: 700, color: '#8B5CF6',
                                    display: 'block', marginBottom: 6,
                                }}>
                                    あなたの発言:
                                </span>
                            )}
                            {current.question}
                        </div>
                    )}

                    {current.questionSub && (
                        <div style={{
                            fontSize: 13, color: TEXT_MUTED, lineHeight: 1.5,
                        }}>
                            {current.questionSub}
                        </div>
                    )}
                </div>

                {/* Options */}
                <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(current.options || []).map((opt, i) => {
                        const isThis = selected === i;
                        const isAnswer = i === current.correctIdx;
                        let bg = '#fff';
                        let borderColor = BORDER;
                        let textColor = TEXT;

                        if (answered) {
                            if (isAnswer) {
                                bg = '#ECFDF5';
                                borderColor = GREEN;
                                textColor = '#065F46';
                            } else if (isThis && !isCorrect) {
                                bg = '#FEF2F2';
                                borderColor = RED;
                                textColor = '#991B1B';
                            } else {
                                textColor = TEXT_FAINT;
                            }
                        }

                        return (
                            <button
                                key={i}
                                onClick={() => handleSelect(i)}
                                disabled={answered}
                                style={{
                                    width: '100%', padding: '14px 16px',
                                    background: bg,
                                    border: `2px solid ${borderColor}`,
                                    borderRadius: 12,
                                    fontSize: 14, fontWeight: 600,
                                    color: textColor,
                                    textAlign: 'left',
                                    cursor: answered ? 'default' : 'pointer',
                                    transition: 'all 0.15s',
                                    lineHeight: 1.5,
                                    opacity: answered && !isAnswer && !isThis ? 0.5 : 1,
                                }}
                            >
                                <span style={{
                                    fontSize: 11, fontWeight: 800,
                                    color: answered && isAnswer ? GREEN : TEXT_FAINT,
                                    marginRight: 8,
                                }}>
                                    {String.fromCharCode(65 + i)}
                                </span>
                                {opt}
                            </button>
                        );
                    })}
                </div>

                {/* Feedback after answer */}
                {answered && (
                    <div style={{
                        padding: '14px 20px 16px',
                        borderTop: `1px solid #F5F5F4`,
                        background: isCorrect ? '#F0FDF4' : '#FFFBEB',
                    }}>
                        <div style={{
                            fontSize: 13, fontWeight: 800,
                            color: isCorrect ? GREEN : '#B45309',
                            marginBottom: 6,
                        }}>
                            {isCorrect ? '正解!' : '不正解'}
                        </div>
                        {/* Show correct answer when wrong */}
                        {!isCorrect && (
                            <div style={{
                                fontSize: 13, fontWeight: 700,
                                color: '#065F46', marginBottom: 8,
                                padding: '6px 10px', background: '#ECFDF5',
                                borderRadius: 6, border: `1px solid ${GREEN}30`,
                            }}>
                                正解: {current.options[current.correctIdx]}
                            </div>
                        )}
                        {/* Show 4-level progression for context */}
                        {current.masterExpr && (
                            <div style={{ marginBottom: 8 }}>
                                {MASTER_LEVELS.map((lvl, i) => (
                                    <div key={i} style={{
                                        display: 'flex', gap: 6, alignItems: 'baseline',
                                        padding: '2px 0',
                                        fontSize: 11, lineHeight: 1.5,
                                    }}>
                                        <span style={{
                                            fontSize: 9, fontWeight: 800,
                                            color: lvl.color,
                                            minWidth: 36, flexShrink: 0,
                                        }}>
                                            {lvl.ja}
                                        </span>
                                        <span style={{
                                            color: TEXT_SUB,
                                            fontWeight: i <= 1 ? 400 : 500,
                                        }}>
                                            {current.masterExpr!.english[i]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {/* Linguistic context from master data */}
                        {current.masterExpr?.context && (
                            <div style={{
                                fontSize: 11, color: TEXT_SUB, lineHeight: 1.7,
                                padding: '8px 10px',
                                background: '#FAFAF9', borderRadius: 6,
                                border: `1px solid ${BORDER}`,
                            }}>
                                {current.masterExpr.context}
                            </div>
                        )}
                        {/* Fallback to phrase context if no master */}
                        {!current.masterExpr?.context && current.phrase.context && (
                            <div style={{
                                fontSize: 11, color: TEXT_SUB, lineHeight: 1.6,
                            }}>
                                {current.phrase.context}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Next button — shown when answered and not auto-advancing */}
            {answered && (
                <button
                    onClick={advanceToNext}
                    style={{
                        width: '100%', padding: '14px',
                        marginTop: 10,
                        background: isCorrect ? GREEN : GOLD,
                        color: '#fff', border: 'none',
                        borderRadius: 12, fontSize: 15, fontWeight: 800,
                        cursor: 'pointer',
                        letterSpacing: '0.03em',
                    }}
                >
                    {currentIdx + 1 >= totalRounds ? '結果を見る' : '次へ'}
                </button>
            )}

            {/* Compact missions */}
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 8 }}>
                {missions.map(m => (
                    <div key={m.id} style={{
                        padding: '3px 8px', borderRadius: 6,
                        background: m.done ? '#ECFDF5' : BG,
                        border: m.done ? `1px solid ${GREEN}40` : `1px solid ${BORDER}`,
                        fontSize: 9, fontWeight: 600,
                        color: m.done ? GREEN : TEXT_FAINT,
                    }}>
                        {m.done ? '\u2713 ' : ''}{m.label}
                    </div>
                ))}
            </div>
        </div>
    );
}
