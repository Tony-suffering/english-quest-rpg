'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
    getAudioCtx, playLevelSound, playGpCoin, playStreakBreak,
    playFeverChainHit, playRankUpSound,
} from '@/lib/training-sounds';
import { MASTER_EXPRESSIONS, MASTER_LEVELS, MasterExpression } from '@/data/english/365/master-expressions';

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

// ── Get distractors (wrong answers from pool) ──
function getDistractors(
    correct: string,
    pool: string[],
    count: number,
): string[] {
    const filtered = pool.filter(s => s !== correct && s.length > 0);
    const picked = shuffle(filtered).slice(0, count);
    // Pad if not enough distractors
    while (picked.length < count) {
        picked.push(`(${picked.length + 1})`);
    }
    return picked;
}

function makeOptions(correct: string, distractors: string[]): { options: string[]; correctIdx: number } {
    const options = shuffle([correct, ...distractors]);
    const correctIdx = options.indexOf(correct);
    return { options, correctIdx: correctIdx >= 0 ? correctIdx : 0 };
}

// ── Extract a blankable word from English phrase ──
function extractBlankWord(en: string): { blanked: string; word: string } | null {
    const words = en.replace(/[.,!?;:'"]/g, '').split(/\s+/).filter(w => w.length >= 3);
    // Skip common words, prefer content words
    const skip = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'am', 'do', 'does', 'did', 'not', 'and', 'but', 'for', 'that', 'this', 'with', 'you', 'your', 'just']);
    const candidates = words.filter(w => !skip.has(w.toLowerCase()));
    if (candidates.length === 0) return null;
    const word = candidates[Math.floor(Math.random() * candidates.length)];
    // Find in original string and blank it
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
    const uniqueWords = [...new Set(allWords.map(w => w.toLowerCase()))];

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

        switch (type) {
            case 'ja2en': {
                const correct = phrase.english;
                const pool = master
                    ? (phrase.english === master.english[0] ? allEnCore
                        : phrase.english === master.english[1] ? allEnVibe
                        : allEnScene)
                    : allEnCore;
                const distractors = getDistractors(correct, pool, 3);
                const { options, correctIdx } = makeOptions(correct, distractors);
                return {
                    type, phrase, masterExpr: master,
                    question: `"${phrase.japanese}" を英語で？`,
                    options, correctIdx, hint,
                };
            }
            case 'en2ja': {
                const correct = phrase.japanese;
                const distractors = getDistractors(correct, allJa, 3);
                const { options, correctIdx } = makeOptions(correct, distractors);
                return {
                    type, phrase, masterExpr: master,
                    question: phrase.english,
                    questionSub: 'この英語の意味は？',
                    options, correctIdx, hint,
                };
            }
            case 'listen': {
                const correct = phrase.japanese;
                const distractors = getDistractors(correct, allJa, 3);
                const { options, correctIdx } = makeOptions(correct, distractors);
                return {
                    type, phrase, masterExpr: master,
                    question: '(音声を聞いて選んでください)',
                    options, correctIdx, hint,
                };
            }
            case 'fill': {
                const en = phrase.english;
                const blank = extractBlankWord(en);
                if (!blank) {
                    const correct = phrase.english;
                    const distractors = getDistractors(correct, allEnCore, 3);
                    const { options, correctIdx } = makeOptions(correct, distractors);
                    return {
                        type: 'ja2en', phrase, masterExpr: master,
                        question: `"${phrase.japanese}" を英語で？`,
                        options, correctIdx, hint,
                    };
                }
                const correct = blank.word;
                const wordDistractors = getDistractors(
                    correct.toLowerCase(), uniqueWords, 3,
                ).map(w => w.charAt(0) + w.slice(1));
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
                    const distractors = getDistractors(correct, allEnCore, 3);
                    const { options, correctIdx } = makeOptions(correct, distractors);
                    return {
                        type: 'ja2en', phrase, masterExpr: master,
                        question: `"${phrase.japanese}" を英語で？`,
                        options, correctIdx, hint,
                    };
                }
                const correct = master.english[3];
                const distractors = getDistractors(correct, allBack, 3);
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
                // Fallback: ja2en
                const correct = phrase.english;
                const distractors = getDistractors(correct, allEnCore, 3);
                const { options, correctIdx } = makeOptions(correct, distractors);
                return {
                    type: 'ja2en' as DrillType, phrase, masterExpr: master,
                    question: `"${phrase.japanese}" を英語で？`,
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
    const [isMobile, setIsMobile] = useState(false);
    const [ttsPlaying, setTtsPlaying] = useState(false);
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
            const raw = localStorage.getItem('my-training-phrases');
            const myPhrases: TrainingPhrase[] = raw ? JSON.parse(raw) : [];
            if (myPhrases.length === 0) {
                const tlRaw = localStorage.getItem('tl_phrases');
                const tlPhrases: TrainingPhrase[] = tlRaw ? JSON.parse(tlRaw) : [];
                setPhrases(tlPhrases);
            } else {
                setPhrases(myPhrases);
            }
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

    // Generate rounds
    useEffect(() => {
        if (phrases.length === 0) return;
        setRounds(generateDrills(phrases, Math.min(10, phrases.length)));
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
        } else {
            if (streak >= 2) playStreakBreak();
        }

        setScore(newScore);
        setSessionScore(newSessionScore);
        setStreak(newStreak);
        setBestStreak(newBest);
        setTotalAttempts(newAttempts);
        saveProgress(newScore, newBest, newAttempts);

        // Auto-advance after delay
        setTimeout(() => {
            if (currentIdx + 1 >= totalRounds) {
                setSessionComplete(true);
                setTimeout(() => playLevelSound(6), 300);
            } else {
                setCurrentIdx(prev => prev + 1);
                setSelected(null);
            }
        }, correct ? 800 : 1500);
    }, [selected, current, score, sessionScore, streak, bestStreak, totalAttempts, currentIdx, totalRounds, saveProgress]);

    // Restart
    const restart = useCallback(() => {
        setRounds(generateDrills(phrases, Math.min(10, phrases.length)));
        setCurrentIdx(0);
        setSelected(null);
        setStreak(0);
        setSessionScore(0);
        setSessionComplete(false);
    }, [phrases]);

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
            playRankUpSound();
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

    // ── Session complete ──
    if (sessionComplete) {
        const accuracy = totalRounds > 0 ? Math.round((sessionScore / totalRounds) * 100) : 0;
        const isPerfect = sessionScore === totalRounds;
        return (
            <div style={{ maxWidth: 480, margin: '0 auto', padding: '40px 20px' }}>
                <div style={{
                    background: isPerfect
                        ? 'linear-gradient(135deg, #FEF3C7, #ECFDF5)'
                        : accuracy >= 80 ? 'linear-gradient(135deg, #F5F5F4, #ECFDF5)' : '#fff',
                    border: isPerfect ? `2px solid ${GOLD}` : `1px solid ${BORDER}`,
                    borderRadius: 16, padding: '32px 24px', textAlign: 'center',
                    marginBottom: 20,
                }}>
                    {isPerfect && (
                        <div style={{
                            fontSize: 11, fontWeight: 800, color: GOLD,
                            letterSpacing: '0.3em', marginBottom: 12,
                            padding: '4px 16px', display: 'inline-block',
                            background: '#FFFBEB', borderRadius: 20,
                            border: `1px solid ${GOLD}40`,
                        }}>
                            PERFECT
                        </div>
                    )}
                    <div style={{
                        fontSize: 12, fontWeight: 700, color: TEXT_FAINT,
                        letterSpacing: '0.2em', marginBottom: 8,
                    }}>
                        SESSION COMPLETE
                    </div>
                    <div style={{
                        fontSize: 56, fontWeight: 900,
                        color: isPerfect ? GOLD : accuracy >= 80 ? GREEN : accuracy >= 50 ? BLUE : TEXT_MUTED,
                        lineHeight: 1, marginBottom: 4,
                    }}>
                        {accuracy}%
                    </div>
                    <div style={{ fontSize: 14, color: TEXT_SUB, marginBottom: 20 }}>
                        {sessionScore}/{totalRounds} 正解
                    </div>

                    <div style={{
                        display: 'flex', justifyContent: 'center', gap: 32,
                        marginBottom: 24,
                    }}>
                        <div>
                            <div style={{ fontSize: 24, fontWeight: 900, color: GOLD }}>{bestStreak}</div>
                            <div style={{ fontSize: 10, color: TEXT_FAINT }}>BEST STREAK</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 24, fontWeight: 900, color: GREEN }}>{totalXP}</div>
                            <div style={{ fontSize: 10, color: TEXT_FAINT }}>XP EARNED</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 24, fontWeight: 900, color: BLUE }}>{totalAttempts}</div>
                            <div style={{ fontSize: 10, color: TEXT_FAINT }}>TODAY TOTAL</div>
                        </div>
                    </div>

                    <button onClick={restart} style={{
                        padding: '14px 40px', background: GREEN, color: '#fff',
                        border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 800,
                        cursor: 'pointer', letterSpacing: '0.05em',
                    }}>
                        NEXT SET
                    </button>
                </div>

                {/* Missions */}
                <div style={{
                    background: '#fff', border: `1px solid ${BORDER}`,
                    borderRadius: 12, padding: 16,
                }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: TEXT_FAINT, letterSpacing: '0.15em', marginBottom: 12 }}>
                        TODAY'S MISSIONS
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

                <Link href="/english/my-training" style={{
                    display: 'block', textAlign: 'center',
                    padding: '12px', marginTop: 16,
                    color: TEXT_MUTED, fontSize: 13, textDecoration: 'none',
                }}>
                    ← Daily Training
                </Link>
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
        }}>
            {/* Header */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 16,
            }}>
                <Link href="/english/my-training" style={{
                    fontSize: 12, color: TEXT_FAINT, textDecoration: 'none',
                }}>
                    ← Training
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {streak >= 2 && (
                        <span style={{
                            fontSize: 11, fontWeight: 800, color: '#EA580C',
                            padding: '2px 8px', background: '#FFF7ED',
                            borderRadius: 6, border: '1px solid #FED7AA',
                            animation: streak >= 5 ? 'pulse 0.5s ease-in-out infinite' : 'none',
                        }}>
                            {streak} STREAK
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
                                    YOU SAID:
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
                        padding: '12px 20px 16px',
                        borderTop: `1px solid #F5F5F4`,
                        background: isCorrect ? '#F0FDF4' : '#FFFBEB',
                    }}>
                        <div style={{
                            fontSize: 13, fontWeight: 800,
                            color: isCorrect ? GREEN : GOLD,
                            marginBottom: 4,
                        }}>
                            {isCorrect ? '正解!' : '惜しい!'}
                        </div>
                        {current.phrase.context && (
                            <div style={{
                                fontSize: 11, color: TEXT_SUB, lineHeight: 1.6,
                            }}>
                                {current.phrase.context}
                            </div>
                        )}
                    </div>
                )}
            </div>

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
