'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
    getAudioCtx, playLevelSound, playGpCoin, playStreakBreak,
    playFeverChainHit, playRankUpSound,
} from '@/lib/training-sounds';

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

interface PracticeRound {
    phrase: TrainingPhrase;
    situation: string;
    context: string;
    hint: string;
}

// ── Fallback situation templates (for phrases without pre-set situation) ──
const FALLBACK_SITUATIONS: { template: string; hint: string }[] = [
    { template: '友達とカフェで話してる。{ja}と言いたい。', hint: '気軽に' },
    { template: '同僚とランチ中。{ja}って伝えたい。', hint: '自然に' },
    { template: '海外旅行中、現地の人に{ja}と言いたい。', hint: 'シンプルに' },
    { template: 'ホームパーティーで{ja}と話を振りたい。', hint: 'フレンドリーに' },
    { template: 'バーで隣の人と雑談。{ja}と言ってみたい。', hint: 'リラックスして' },
];

// ── Daily mission config ──
const DAILY_MISSIONS = [
    { id: 'practice_3', label: '3問クリア', target: 3, xp: 10 },
    { id: 'practice_7', label: '7問クリア', target: 7, xp: 25 },
    { id: 'streak_3', label: '3連続正解', target: 3, xp: 15 },
];

function getTodayStr() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// ── Component ──
export default function PracticePage() {
    const [phrases, setPhrases] = useState<TrainingPhrase[]>([]);
    const [rounds, setRounds] = useState<PracticeRound[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [sessionComplete, setSessionComplete] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const prevMissionsDone = useRef(-1);

    // Load phrases from localStorage
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Load from my-training-phrases
        try {
            const raw = localStorage.getItem('my-training-phrases');
            const myPhrases: TrainingPhrase[] = raw ? JSON.parse(raw) : [];
            // Also check tl_phrases as fallback
            if (myPhrases.length === 0) {
                const tlRaw = localStorage.getItem('tl_phrases');
                const tlPhrases: TrainingPhrase[] = tlRaw ? JSON.parse(tlRaw) : [];
                setPhrases(tlPhrases);
            } else {
                setPhrases(myPhrases);
            }
        } catch { /* */ }

        // Load today's progress
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

    // Generate rounds when phrases load
    useEffect(() => {
        if (phrases.length === 0) return;
        // Shuffle and pick up to 10
        const shuffled = [...phrases].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, Math.min(10, shuffled.length));
        const generated = selected.map(phrase => {
            if (phrase.situation) {
                // Use pre-set situation from registration
                // situation format: "病院で -- 居酒屋で常連が..."
                const parts = phrase.situation.split(' -- ');
                const sceneTitle = parts[0] || '';
                const sceneDesc = parts[1] || '';
                return {
                    phrase,
                    situation: `"${phrase.japanese}" と英語で言いたい。`,
                    context: sceneDesc || sceneTitle,
                    hint: sceneTitle,
                };
            }
            // Fallback for old phrases without situation
            const sit = FALLBACK_SITUATIONS[Math.floor(Math.random() * FALLBACK_SITUATIONS.length)];
            return {
                phrase,
                situation: sit.template.replace('{ja}', `"${phrase.japanese}"`),
                context: '',
                hint: sit.hint,
            };
        });
        setRounds(generated);
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

    // Handle "I knew it" / "Not yet"
    const handleResult = useCallback((knew: boolean) => {
        const newScore = knew ? score + 1 : score;
        const newStreak = knew ? streak + 1 : 0;
        const newBest = Math.max(bestStreak, newStreak);
        const newAttempts = totalAttempts + 1;

        // Sound effects
        if (knew) {
            if (newStreak >= 3) {
                playFeverChainHit(newStreak);
            } else {
                playLevelSound(3);
            }
        } else {
            if (streak >= 2) {
                playStreakBreak();
            }
        }

        setScore(newScore);
        setStreak(newStreak);
        setBestStreak(newBest);
        setTotalAttempts(newAttempts);
        setRevealed(false);
        saveProgress(newScore, newBest, newAttempts);

        if (currentIdx + 1 >= totalRounds) {
            setSessionComplete(true);
            // Session complete sound (delayed slightly)
            setTimeout(() => playLevelSound(6), 300);
        } else {
            setCurrentIdx(prev => prev + 1);
        }
    }, [score, streak, bestStreak, totalAttempts, currentIdx, totalRounds, saveProgress]);

    // Restart
    const restart = useCallback(() => {
        const shuffled = [...phrases].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, Math.min(10, shuffled.length));
        const generated = selected.map(phrase => {
            if (phrase.situation) {
                const parts = phrase.situation.split(' -- ');
                const sceneTitle = parts[0] || '';
                const sceneDesc = parts[1] || '';
                return {
                    phrase,
                    situation: `"${phrase.japanese}" と英語で言いたい。`,
                    context: sceneDesc || sceneTitle,
                    hint: sceneTitle,
                };
            }
            const sit = FALLBACK_SITUATIONS[Math.floor(Math.random() * FALLBACK_SITUATIONS.length)];
            return {
                phrase,
                situation: sit.template.replace('{ja}', `"${phrase.japanese}"`),
                context: '',
                hint: sit.hint,
            };
        });
        setRounds(generated);
        setCurrentIdx(0);
        setRevealed(false);
        setStreak(0);
        setSessionComplete(false);
    }, [phrases]);

    // Daily missions progress
    const missions = useMemo(() => {
        return DAILY_MISSIONS.map(m => {
            let current = 0;
            if (m.id === 'practice_3') current = Math.min(totalAttempts, m.target);
            if (m.id === 'practice_7') current = Math.min(totalAttempts, m.target);
            if (m.id === 'streak_3') current = Math.min(bestStreak, m.target);
            return { ...m, current, done: current >= m.target };
        });
    }, [totalAttempts, bestStreak]);

    const totalXP = missions.filter(m => m.done).reduce((sum, m) => sum + m.xp, 0);
    const doneCount = missions.filter(m => m.done).length;

    // Play sound when a new mission completes (skip initial load)
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
                <div style={{ fontSize: 18, fontWeight: 800, color: '#1C1917', marginBottom: 8 }}>
                    まだフレーズがありません
                </div>
                <div style={{ fontSize: 13, color: '#78716C', lineHeight: 1.6, marginBottom: 24 }}>
                    英会話マスター365でフレーズを登録すると、<br />
                    ここで実習できるようになります。
                </div>
                <Link href="/english/izakaya-toeic/kaiwa" style={{
                    display: 'inline-block', padding: '12px 24px',
                    background: '#10B981', color: '#fff', borderRadius: 10,
                    fontSize: 14, fontWeight: 700, textDecoration: 'none',
                }}>
                    マスター365へ
                </Link>
            </div>
        );
    }

    // ── Session complete ──
    if (sessionComplete) {
        const accuracy = totalRounds > 0 ? Math.round((score / totalRounds) * 100) : 0;
        return (
            <div style={{
                maxWidth: 480, margin: '0 auto', padding: '40px 20px',
            }}>
                {/* Result card */}
                <div style={{
                    background: accuracy >= 80
                        ? 'linear-gradient(135deg, #FEF3C7, #ECFDF5)'
                        : '#fff',
                    border: accuracy >= 80 ? '2px solid #D4AF37' : '1px solid #E7E5E4',
                    borderRadius: 16, padding: '32px 24px', textAlign: 'center',
                    marginBottom: 20,
                }}>
                    <div style={{
                        fontSize: 12, fontWeight: 700, color: '#A8A29E',
                        letterSpacing: '0.2em', marginBottom: 8,
                    }}>
                        SESSION COMPLETE
                    </div>
                    <div style={{
                        fontSize: 48, fontWeight: 900,
                        color: accuracy >= 80 ? '#D4AF37' : accuracy >= 50 ? '#10B981' : '#78716C',
                        lineHeight: 1,
                        marginBottom: 4,
                    }}>
                        {accuracy}%
                    </div>
                    <div style={{ fontSize: 14, color: '#57534E', marginBottom: 16 }}>
                        {score}/{totalRounds} 正解
                    </div>

                    {/* Stats row */}
                    <div style={{
                        display: 'flex', justifyContent: 'center', gap: 24,
                        marginBottom: 20,
                    }}>
                        <div>
                            <div style={{ fontSize: 20, fontWeight: 800, color: '#D4AF37' }}>{bestStreak}</div>
                            <div style={{ fontSize: 10, color: '#A8A29E' }}>BEST STREAK</div>
                        </div>
                        <div>
                            <div style={{ fontSize: 20, fontWeight: 800, color: '#10B981' }}>{totalXP}</div>
                            <div style={{ fontSize: 10, color: '#A8A29E' }}>XP EARNED</div>
                        </div>
                    </div>

                    <button onClick={restart} style={{
                        padding: '12px 32px', background: '#D4AF37', color: '#fff',
                        border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700,
                        cursor: 'pointer',
                    }}>
                        NEXT SET
                    </button>
                </div>

                {/* Daily missions */}
                <div style={{
                    background: '#fff', border: '1px solid #E7E5E4',
                    borderRadius: 12, padding: 16,
                }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#A8A29E', letterSpacing: '0.15em', marginBottom: 12 }}>
                        TODAY'S MISSIONS
                    </div>
                    {missions.map(m => (
                        <div key={m.id} style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '8px 0',
                            borderBottom: '1px solid #F5F5F4',
                        }}>
                            <div style={{
                                width: 20, height: 20, borderRadius: '50%',
                                border: m.done ? '2px solid #10B981' : '2px solid #E7E5E4',
                                background: m.done ? '#10B981' : '#fff',
                                color: m.done ? '#fff' : '#D6D3D1',
                                fontSize: 11, fontWeight: 700,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {m.done ? '\u2713' : ''}
                            </div>
                            <div style={{ flex: 1 }}>
                                <span style={{
                                    fontSize: 13, fontWeight: 600,
                                    color: m.done ? '#10B981' : '#44403C',
                                }}>{m.label}</span>
                            </div>
                            <div style={{
                                fontSize: 11, fontWeight: 700,
                                color: m.done ? '#10B981' : '#A8A29E',
                            }}>
                                {m.current}/{m.target}
                            </div>
                            <div style={{
                                fontSize: 10, fontWeight: 700,
                                color: m.done ? '#D4AF37' : '#D6D3D1',
                            }}>
                                +{m.xp} XP
                            </div>
                        </div>
                    ))}
                </div>

                <Link href="/english/my-training" style={{
                    display: 'block', textAlign: 'center',
                    padding: '12px', marginTop: 16,
                    color: '#78716C', fontSize: 13, textDecoration: 'none',
                }}>
                    ← Daily Training
                </Link>
            </div>
        );
    }

    // ── Main practice UI ──
    return (
        <div style={{
            maxWidth: 480, margin: '0 auto',
            padding: isMobile ? '16px' : '32px 20px',
            minHeight: '100vh',
        }}>
            {/* Header */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 20,
            }}>
                <Link href="/english/my-training" style={{
                    fontSize: 12, color: '#A8A29E', textDecoration: 'none',
                }}>
                    ← Training
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {streak >= 2 && (
                        <span style={{
                            fontSize: 11, fontWeight: 800, color: '#EA580C',
                            padding: '2px 8px', background: '#FFF7ED',
                            borderRadius: 6, border: '1px solid #FED7AA',
                        }}>
                            {streak} STREAK
                        </span>
                    )}
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#D4AF37' }}>
                        {score}/{totalRounds}
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{
                height: 4, background: '#F5F5F4', borderRadius: 2,
                marginBottom: 24, overflow: 'hidden',
            }}>
                <div style={{
                    height: '100%',
                    width: `${((currentIdx) / totalRounds) * 100}%`,
                    background: 'linear-gradient(90deg, #D4AF37, #10B981)',
                    borderRadius: 2,
                    transition: 'width 0.3s ease',
                }} />
            </div>

            {/* Question card */}
            {current && (
                <div style={{
                    background: '#fff', borderRadius: 16,
                    border: '1px solid #E7E5E4',
                    overflow: 'hidden',
                    marginBottom: 16,
                }}>
                    {/* Round number */}
                    <div style={{
                        padding: '12px 20px',
                        borderBottom: '1px solid #F5F5F4',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#A8A29E' }}>
                            Q{currentIdx + 1} / {totalRounds}
                        </span>
                        <span style={{
                            fontSize: 10, fontWeight: 600, color: '#10B981',
                            padding: '2px 8px', background: '#ECFDF5',
                            borderRadius: 4,
                        }}>
                            {current.hint}
                        </span>
                    </div>

                    {/* Situation */}
                    <div style={{ padding: '20px' }}>
                        {current.context && (
                            <div style={{
                                fontSize: 12, color: '#78716C', lineHeight: 1.6,
                                marginBottom: 10,
                                padding: '8px 12px',
                                background: '#FAFAF9',
                                borderRadius: 8,
                                borderLeft: '3px solid #D4AF3740',
                            }}>
                                {current.context}
                            </div>
                        )}
                        <div style={{
                            fontSize: 15, fontWeight: 600, color: '#1C1917', lineHeight: 1.7,
                            marginBottom: 20,
                        }}>
                            {current.situation}
                        </div>

                        {/* English phrase area */}
                        {!revealed ? (
                            <button
                                onClick={() => { playGpCoin(); setRevealed(true); }}
                                style={{
                                    width: '100%', padding: '20px',
                                    background: '#FFFBEB',
                                    border: '2px dashed #D4AF3760',
                                    borderRadius: 12,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                            >
                                <div style={{
                                    fontSize: 14, fontWeight: 600, color: '#D4AF37',
                                    marginBottom: 4,
                                }}>
                                    Tap to reveal
                                </div>
                                <div style={{
                                    fontSize: 11, color: '#A8A29E',
                                }}>
                                    まず頭の中で英語にしてから
                                </div>
                            </button>
                        ) : (
                            <div style={{
                                padding: '20px',
                                background: 'linear-gradient(135deg, #ECFDF5, #FFFBEB)',
                                border: '1px solid #D4AF3740',
                                borderRadius: 12,
                            }}>
                                <div style={{
                                    fontSize: 17, fontWeight: 700, color: '#1C1917',
                                    lineHeight: 1.5, marginBottom: 8,
                                }}>
                                    {current.phrase.english}
                                </div>
                                <div style={{
                                    fontSize: 12, color: '#78716C',
                                }}>
                                    {current.phrase.japanese}
                                </div>
                                {current.phrase.context && (
                                    <div style={{
                                        fontSize: 11, color: '#57534E', lineHeight: 1.6,
                                        marginTop: 12, paddingTop: 10,
                                        borderTop: '1px solid #E7E5E440',
                                    }}>
                                        {current.phrase.context}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Answer buttons */}
                    {revealed && (
                        <div style={{
                            display: 'flex', gap: 8,
                            padding: '0 20px 20px',
                        }}>
                            <button
                                onClick={() => handleResult(false)}
                                style={{
                                    flex: 1, padding: '14px',
                                    background: '#fff',
                                    border: '2px solid #E7E5E4',
                                    borderRadius: 10,
                                    fontSize: 13, fontWeight: 700,
                                    color: '#78716C',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s',
                                }}
                            >
                                もう一回
                            </button>
                            <button
                                onClick={() => handleResult(true)}
                                style={{
                                    flex: 1, padding: '14px',
                                    background: '#10B981',
                                    border: '2px solid #10B981',
                                    borderRadius: 10,
                                    fontSize: 13, fontWeight: 700,
                                    color: '#fff',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s',
                                }}
                            >
                                言えた
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Daily missions (compact) */}
            <div style={{
                display: 'flex', gap: 6, justifyContent: 'center',
            }}>
                {missions.map(m => (
                    <div key={m.id} style={{
                        padding: '4px 10px',
                        borderRadius: 6,
                        background: m.done ? '#ECFDF5' : '#FAFAF9',
                        border: m.done ? '1px solid #10B98140' : '1px solid #E7E5E4',
                        fontSize: 10, fontWeight: 600,
                        color: m.done ? '#10B981' : '#A8A29E',
                    }}>
                        {m.done ? '\u2713' : ''} {m.label}
                    </div>
                ))}
            </div>
        </div>
    );
}
