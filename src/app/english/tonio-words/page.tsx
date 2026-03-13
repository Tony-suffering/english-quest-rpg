'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ALL_WORDS, ALL_PHRASES, CATEGORIES } from '@/data/tonio-words';
import { LEVELS } from '@/data/tonio-words/types';
import type { PhraseEntry, CategoryMeta, LevelMeta } from '@/data/tonio-words/types';

// ── TONIO WORDS ─────────────────────────────────────────────────
// Level-based TOEIC vocabulary app. Mobile-first.
// whyフィールドがプロダクトの核。居酒屋トーン解説を大きく見せる。

const LS_KEY = 'tonio-words-learned';

const SPEAKER_COLORS: Record<string, string> = {
    Marcus: '#DC2626', Sarah: '#2563EB', Tom: '#16A34A',
    Lisa: '#9333EA', Kevin: '#EA580C', Rachel: '#0891B2',
};

type Screen = 'levels' | 'lessons' | 'card';

interface WordWithPhrases {
    en: string; pron: string; ja: string; why: string;
    note: string; cat: string; level: 1 | 2 | 3; lesson: number;
    uid: string; phrases: PhraseEntry[];
}

// ── Lesson themes per level ──
const LESSON_THEMES: Record<number, Record<number, string>> = {
    1: {
        1: '知ってるのに出てこない', 2: 'カタカナに騙される', 3: '会話の接着剤',
        4: '万能すぎる動詞', 5: '気持ちを英語にする', 6: '毎日の「あれ」',
    },
    2: {
        1: '感情の精密射撃', 2: 'ビジネス即戦力', 3: '多義語の深み',
        4: 'TOEICの風景', 5: '変化を表現する', 6: 'カタカナの嘘 Part 2',
        7: 'つなぎ & 紛らわしいペア',
    },
    3: {
        1: '議論で勝つ語', 2: '抽象を操る', 3: 'TOEICの世界',
        4: '形容詞で差がつく', 5: '前置詞で化ける動詞', 6: 'ニュアンスの精密さ',
        7: '読解を加速する語',
    },
};

export default function TonioWordsPage() {
    const [loading, setLoading] = useState(true);
    const [screen, setScreen] = useState<Screen>('levels');
    const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);
    const [selectedLesson, setSelectedLesson] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set());
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [showPhrases, setShowPhrases] = useState(false);

    // Load learned state
    useEffect(() => {
        try {
            const stored = localStorage.getItem(LS_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) setLearnedWords(new Set(parsed));
            }
        } catch { /* ignore */ }
        setLoading(false);
    }, []);

    const saveLearned = useCallback((next: Set<string>) => {
        try { localStorage.setItem(LS_KEY, JSON.stringify(Array.from(next))); } catch { /* */ }
    }, []);

    // Build phrase map
    const phraseMap = useMemo(() => {
        const map: Record<string, PhraseEntry[]> = {};
        ALL_PHRASES.forEach(p => {
            if (!map[p.wordEn]) map[p.wordEn] = [];
            map[p.wordEn].push(p);
        });
        return map;
    }, []);

    // All words enriched with uid + phrases
    const allWords: WordWithPhrases[] = useMemo(() =>
        ALL_WORDS.map((w, i) => ({
            ...w, uid: `tw_${i}`, phrases: phraseMap[w.en] || [],
        })),
    [phraseMap]);

    // Words for selected level
    const levelWords = useMemo(() =>
        allWords.filter(w => w.level === selectedLevel),
    [allWords, selectedLevel]);

    // Words for selected lesson
    const lessonWords = useMemo(() =>
        levelWords.filter(w => w.lesson === selectedLesson),
    [levelWords, selectedLesson]);

    // Current word
    const word = lessonWords[currentIndex] || null;
    const catMeta: CategoryMeta | undefined = word ? CATEGORIES[word.cat] : undefined;
    const isLearned = word ? learnedWords.has(word.uid) : false;

    // Level progress: how many words learned per level
    const levelProgress = useMemo(() => {
        const p: Record<number, { total: number; learned: number }> = {};
        for (const lv of LEVELS) {
            const ws = allWords.filter(w => w.level === lv.level);
            p[lv.level] = { total: ws.length, learned: ws.filter(w => learnedWords.has(w.uid)).length };
        }
        return p;
    }, [allWords, learnedWords]);

    // Lesson progress: how many words learned per lesson within current level
    const lessonProgress = useMemo(() => {
        const p: Record<number, { total: number; learned: number }> = {};
        const lvMeta = LEVELS.find(l => l.level === selectedLevel);
        if (!lvMeta) return p;
        for (let les = 1; les <= lvMeta.lessons; les++) {
            const ws = levelWords.filter(w => w.lesson === les);
            p[les] = { total: ws.length, learned: ws.filter(w => learnedWords.has(w.uid)).length };
        }
        return p;
    }, [levelWords, selectedLevel, learnedWords]);

    const toggleLearned = useCallback((uid: string) => {
        setLearnedWords(prev => {
            const next = new Set(prev);
            if (next.has(uid)) next.delete(uid); else next.add(uid);
            saveLearned(next);
            return next;
        });
    }, [saveLearned]);

    const speak = useCallback((text: string, id: string) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        setPlayingId(id);
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US'; u.rate = 0.85;
        const voices = window.speechSynthesis.getVoices();
        const pref = voices.find(v => v.name.includes('Samantha'))
            || voices.find(v => v.lang === 'en-US' && v.localService);
        if (pref) u.voice = pref;
        u.onend = () => setPlayingId(null);
        u.onerror = () => setPlayingId(null);
        window.speechSynthesis.speak(u);
    }, []);

    const goTo = useCallback((i: number) => {
        setCurrentIndex(i);
        setShowPhrases(false);
    }, []);
    const goNext = useCallback(() => goTo(Math.min(currentIndex + 1, lessonWords.length - 1)), [currentIndex, lessonWords.length, goTo]);
    const goPrev = useCallback(() => goTo(Math.max(currentIndex - 1, 0)), [currentIndex, goTo]);

    const selectLevel = useCallback((lv: 1 | 2 | 3) => {
        setSelectedLevel(lv);
        setSelectedLesson(1);
        setCurrentIndex(0);
        setShowPhrases(false);
        setScreen('lessons');
    }, []);

    const selectLesson = useCallback((les: number) => {
        setSelectedLesson(les);
        setCurrentIndex(0);
        setShowPhrases(false);
        setScreen('card');
    }, []);

    const goBack = useCallback(() => {
        if (screen === 'card') { setScreen('lessons'); setShowPhrases(false); }
        else if (screen === 'lessons') setScreen('levels');
    }, [screen]);

    // Keyboard (only on card screen)
    useEffect(() => {
        if (screen !== 'card') return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goNext(); }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goPrev(); }
            if (e.key === ' ') { e.preventDefault(); if (word) speak(word.en, word.uid); }
            if (e.key === 'Enter') { e.preventDefault(); if (word) toggleLearned(word.uid); }
            if (e.key === 'Escape') { e.preventDefault(); goBack(); }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [screen, goNext, goPrev, word, speak, toggleLearned, goBack]);

    // Touch swipe (only on card screen)
    const touchRef = useRef<{ x: number; y: number } | null>(null);
    const onTouchStart = useCallback((e: React.TouchEvent) => {
        if (screen !== 'card') return;
        touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, [screen]);
    const onTouchEnd = useCallback((e: React.TouchEvent) => {
        if (!touchRef.current || screen !== 'card') return;
        const dx = e.changedTouches[0].clientX - touchRef.current.x;
        const dy = e.changedTouches[0].clientY - touchRef.current.y;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            if (dx < 0) goNext(); else goPrev();
        }
        touchRef.current = null;
    }, [screen, goNext, goPrev]);

    const totalLearned = learnedWords.size;
    const currentLevelMeta = LEVELS.find(l => l.level === selectedLevel);

    if (loading) {
        return (
            <div style={{
                minHeight: '100dvh', display: 'flex', alignItems: 'center',
                justifyContent: 'center', backgroundColor: '#FAFAF9',
            }}>
                <span style={{ color: '#A8A29E', fontSize: '13px' }}>Loading...</span>
            </div>
        );
    }

    // ════════════════════════════════════════════════════════════════
    // Screen 1: Level Select
    // ════════════════════════════════════════════════════════════════
    if (screen === 'levels') {
        return (
            <div style={{
                minHeight: '100dvh', backgroundColor: '#FAFAF9',
                display: 'flex', flexDirection: 'column',
            }}>
                {/* Header */}
                <div style={{
                    padding: '20px 16px 12px',
                    backgroundColor: '#fff',
                    borderBottom: '1px solid #F5F5F4',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                            fontSize: '15px', fontWeight: 900, color: '#D4AF37',
                            letterSpacing: '1.5px',
                        }}>
                            TONIO WORDS
                        </span>
                        <div style={{ flex: 1 }} />
                        <span style={{ fontSize: '11px', color: '#A8A29E' }}>
                            {totalLearned} / 500
                        </span>
                    </div>
                    <div style={{
                        height: '3px', backgroundColor: '#E7E5E4',
                        borderRadius: '2px', overflow: 'hidden', marginTop: '10px',
                    }}>
                        <div style={{
                            height: '100%', width: `${(totalLearned / 500) * 100}%`,
                            backgroundColor: '#D4AF37', borderRadius: '2px',
                            transition: 'width 0.3s',
                        }} />
                    </div>
                </div>

                {/* Level Cards */}
                <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
                    <div style={{ maxWidth: '480px', margin: '0 auto' }}>
                        <div style={{
                            fontSize: '12px', color: '#A8A29E', fontWeight: 600,
                            marginBottom: '12px', letterSpacing: '0.5px',
                        }}>
                            LEVEL SELECT
                        </div>

                        {LEVELS.map(lv => {
                            const prog = levelProgress[lv.level] || { total: 0, learned: 0 };
                            const pct = prog.total > 0 ? (prog.learned / prog.total) * 100 : 0;
                            const isComplete = prog.learned >= prog.total && prog.total > 0;
                            return (
                                <button key={lv.level} onClick={() => selectLevel(lv.level)} style={{
                                    display: 'block', width: '100%', textAlign: 'left',
                                    padding: '20px', marginBottom: '12px',
                                    borderRadius: '16px', border: `1.5px solid ${lv.color}20`,
                                    backgroundColor: '#fff', cursor: 'pointer',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                                    transition: 'all 0.15s',
                                }}>
                                    {/* Top row: level badge + score target */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                        <span style={{
                                            fontSize: '11px', fontWeight: 800,
                                            padding: '3px 10px', borderRadius: '6px',
                                            backgroundColor: lv.bg, color: lv.color,
                                            letterSpacing: '0.5px',
                                        }}>
                                            {lv.nameEn.toUpperCase()}
                                        </span>
                                        <span style={{
                                            fontSize: '13px', fontWeight: 700, color: lv.color,
                                        }}>
                                            {lv.target}
                                        </span>
                                        <div style={{ flex: 1 }} />
                                        {isComplete && (
                                            <span style={{
                                                fontSize: '12px', fontWeight: 800,
                                                color: '#10B981',
                                            }}>
                                                COMPLETE
                                            </span>
                                        )}
                                    </div>

                                    {/* Level name (Japanese) */}
                                    <div style={{
                                        fontSize: '18px', fontWeight: 800, color: '#1C1917',
                                        marginBottom: '4px', lineHeight: 1.3,
                                    }}>
                                        Level {lv.level}: {lv.name}
                                    </div>

                                    {/* Word count + lesson count */}
                                    <div style={{
                                        fontSize: '12px', color: '#78716C', marginBottom: '12px',
                                    }}>
                                        {lv.words} words / {lv.lessons} lessons
                                    </div>

                                    {/* Progress bar */}
                                    <div style={{
                                        height: '6px', backgroundColor: '#F5F5F4',
                                        borderRadius: '3px', overflow: 'hidden',
                                    }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${pct}%`,
                                            backgroundColor: isComplete ? '#10B981' : lv.color,
                                            borderRadius: '3px',
                                            transition: 'width 0.3s',
                                        }} />
                                    </div>

                                    {/* Progress text */}
                                    <div style={{
                                        fontSize: '11px', color: '#A8A29E', marginTop: '6px',
                                        textAlign: 'right',
                                    }}>
                                        {prog.learned} / {prog.total}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    // ════════════════════════════════════════════════════════════════
    // Screen 2: Lesson Select
    // ════════════════════════════════════════════════════════════════
    if (screen === 'lessons') {
        const lvMeta = currentLevelMeta || LEVELS[0];
        const themes = LESSON_THEMES[lvMeta.level] || {};

        return (
            <div style={{
                minHeight: '100dvh', backgroundColor: '#FAFAF9',
                display: 'flex', flexDirection: 'column',
            }}>
                {/* Header */}
                <div style={{
                    padding: '12px 16px',
                    backgroundColor: '#fff',
                    borderBottom: '1px solid #F5F5F4',
                    position: 'sticky', top: 0, zIndex: 10,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button onClick={goBack} style={{
                            width: '36px', height: '36px', borderRadius: '10px',
                            border: '1px solid #E7E5E4', backgroundColor: '#fff',
                            cursor: 'pointer', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            fontSize: '16px', color: '#78716C',
                        }}>
                            {'\u2190'}
                        </button>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{
                                    fontSize: '10px', fontWeight: 800,
                                    padding: '2px 8px', borderRadius: '5px',
                                    backgroundColor: lvMeta.bg, color: lvMeta.color,
                                    letterSpacing: '0.5px',
                                }}>
                                    {lvMeta.nameEn.toUpperCase()}
                                </span>
                                <span style={{
                                    fontSize: '14px', fontWeight: 800, color: '#1C1917',
                                }}>
                                    {lvMeta.name}
                                </span>
                            </div>
                            <div style={{
                                fontSize: '11px', color: '#A8A29E', marginTop: '2px',
                            }}>
                                {lvMeta.target} / {lvMeta.words} words
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lesson List */}
                <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
                    <div style={{ maxWidth: '480px', margin: '0 auto' }}>
                        {Array.from({ length: lvMeta.lessons }, (_, i) => i + 1).map(les => {
                            const prog = lessonProgress[les] || { total: 0, learned: 0 };
                            const pct = prog.total > 0 ? (prog.learned / prog.total) * 100 : 0;
                            const isComplete = prog.learned >= prog.total && prog.total > 0;
                            const theme = themes[les] || '';
                            return (
                                <button key={les} onClick={() => selectLesson(les)} style={{
                                    display: 'flex', width: '100%', textAlign: 'left',
                                    padding: '16px', marginBottom: '8px',
                                    borderRadius: '14px', border: '1px solid #F5F5F4',
                                    backgroundColor: '#fff', cursor: 'pointer',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                                    gap: '14px', alignItems: 'center',
                                    transition: 'all 0.15s',
                                }}>
                                    {/* Lesson number */}
                                    <div style={{
                                        width: '44px', height: '44px', borderRadius: '12px',
                                        backgroundColor: isComplete ? '#D1FAE5' : lvMeta.bg,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0,
                                    }}>
                                        <span style={{
                                            fontSize: isComplete ? '18px' : '16px',
                                            fontWeight: 800,
                                            color: isComplete ? '#10B981' : lvMeta.color,
                                        }}>
                                            {isComplete ? '\u2713' : les}
                                        </span>
                                    </div>

                                    {/* Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontSize: '15px', fontWeight: 700, color: '#1C1917',
                                            marginBottom: '2px',
                                        }}>
                                            Lesson {les}
                                        </div>
                                        {theme && (
                                            <div style={{
                                                fontSize: '12px', color: '#78716C',
                                                marginBottom: '6px',
                                            }}>
                                                {theme}
                                            </div>
                                        )}
                                        {/* Progress bar */}
                                        <div style={{
                                            height: '4px', backgroundColor: '#F5F5F4',
                                            borderRadius: '2px', overflow: 'hidden',
                                        }}>
                                            <div style={{
                                                height: '100%', width: `${pct}%`,
                                                backgroundColor: isComplete ? '#10B981' : lvMeta.color,
                                                borderRadius: '2px',
                                                transition: 'width 0.3s',
                                            }} />
                                        </div>
                                    </div>

                                    {/* Count */}
                                    <span style={{
                                        fontSize: '11px', color: '#A8A29E',
                                        flexShrink: 0,
                                    }}>
                                        {prog.learned}/{prog.total}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    // ════════════════════════════════════════════════════════════════
    // Screen 3: Word Card (1語1画面)
    // ════════════════════════════════════════════════════════════════
    const lvMeta = currentLevelMeta || LEVELS[0];
    const lesProg = lessonProgress[selectedLesson] || { total: 0, learned: 0 };

    return (
        <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{
                minHeight: '100dvh', backgroundColor: '#FAFAF9',
                display: 'flex', flexDirection: 'column',
                WebkitTapHighlightColor: 'transparent',
            }}
        >
            {/* ── Sticky Header ── */}
            <div style={{
                padding: '10px 16px',
                backgroundColor: '#fff',
                borderBottom: '1px solid #F5F5F4',
                position: 'sticky', top: 0, zIndex: 10,
            }}>
                {/* Row 1: Back + level/lesson info + progress */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <button onClick={goBack} style={{
                        width: '36px', height: '36px', borderRadius: '10px',
                        border: '1px solid #E7E5E4', backgroundColor: '#fff',
                        cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        fontSize: '16px', color: '#78716C', flexShrink: 0,
                    }}>
                        {'\u2190'}
                    </button>
                    <span style={{
                        fontSize: '10px', fontWeight: 800,
                        padding: '2px 8px', borderRadius: '5px',
                        backgroundColor: lvMeta.bg, color: lvMeta.color,
                        letterSpacing: '0.5px', flexShrink: 0,
                    }}>
                        {lvMeta.nameEn.toUpperCase()}
                    </span>
                    <span style={{
                        fontSize: '13px', fontWeight: 700, color: '#1C1917',
                    }}>
                        Lesson {selectedLesson}
                    </span>
                    <div style={{ flex: 1 }} />
                    <span style={{ fontSize: '10px', color: '#A8A29E' }}>
                        {lesProg.learned}/{lesProg.total}
                    </span>
                </div>

                {/* Row 2: Progress dots */}
                <div style={{
                    display: 'flex', gap: '3px',
                    justifyContent: 'center', flexWrap: 'wrap',
                }}>
                    {lessonWords.map((w, i) => (
                        <button key={i} onClick={() => goTo(i)} style={{
                            width: '9px', height: '9px', borderRadius: '50%',
                            border: 'none', cursor: 'pointer', padding: 0,
                            backgroundColor: i === currentIndex
                                ? lvMeta.color
                                : learnedWords.has(w.uid)
                                    ? '#10B981'
                                    : '#E7E5E4',
                            transition: 'all 0.15s',
                            transform: i === currentIndex ? 'scale(1.4)' : 'scale(1)',
                        }} />
                    ))}
                </div>
            </div>

            {/* ── Card Area ── */}
            {word && (
                <div style={{
                    flex: 1, padding: '16px', overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                }}>
                    <div style={{ maxWidth: '480px', margin: '0 auto' }}>

                        {/* ── Word Header ── */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '12px',
                            marginBottom: '4px',
                        }}>
                            {/* Play */}
                            <button onClick={() => speak(word.en, word.uid)} style={{
                                width: '48px', height: '48px', borderRadius: '50%',
                                border: 'none', cursor: 'pointer', flexShrink: 0,
                                backgroundColor: playingId === word.uid
                                    ? (catMeta?.color || lvMeta.color) : '#F5F5F4',
                                color: playingId === word.uid ? '#fff' : '#78716C',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '16px', transition: 'all 0.15s',
                            }}>
                                {playingId === word.uid ? '\u25A0' : '\u25B6'}
                            </button>
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    fontSize: '28px', fontWeight: 900, color: '#1C1917',
                                    letterSpacing: '-0.5px', lineHeight: 1.1,
                                }}>
                                    {word.en}
                                </div>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px',
                                }}>
                                    <span style={{ fontSize: '12px', color: '#C4B5A0' }}>{word.pron}</span>
                                    <span style={{ fontSize: '13px', color: '#78716C' }}>{word.ja}</span>
                                </div>
                            </div>
                            {/* Learned */}
                            <button onClick={() => toggleLearned(word.uid)} style={{
                                width: '36px', height: '36px', borderRadius: '50%',
                                border: isLearned ? '2.5px solid #10B981' : '2.5px solid #E7E5E4',
                                backgroundColor: isLearned ? '#D1FAE5' : '#fff',
                                color: isLearned ? '#10B981' : '#E7E5E4',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '16px', fontWeight: 900, cursor: 'pointer', flexShrink: 0,
                            }}>
                                {isLearned ? '\u2713' : ''}
                            </button>
                        </div>

                        {/* Category pill + position */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            marginLeft: '60px', marginBottom: '16px',
                        }}>
                            <span style={{
                                fontSize: '10px', fontWeight: 700, padding: '2px 8px',
                                borderRadius: '5px',
                                backgroundColor: catMeta?.bg || '#F5F5F4',
                                color: catMeta?.color || '#78716C',
                            }}>
                                {catMeta?.label || word.cat}
                            </span>
                            <span style={{ fontSize: '10px', color: '#A8A29E' }}>
                                {currentIndex + 1} / {lessonWords.length}
                            </span>
                        </div>

                        {/* ══ WHY -- THE PRODUCT CORE ══ */}
                        <div style={{
                            backgroundColor: '#fff', borderRadius: '16px',
                            border: '1px solid #F5F5F4',
                            padding: '20px',
                            marginBottom: '12px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        }}>
                            <div style={{
                                fontSize: '16px', lineHeight: 2.0,
                                color: '#292524',
                            }}>
                                {word.why}
                            </div>
                        </div>

                        {/* Example */}
                        <div style={{
                            padding: '12px 16px',
                            backgroundColor: '#fff', borderRadius: '12px',
                            borderLeft: `3px solid ${catMeta?.color || lvMeta.color}`,
                            marginBottom: '12px',
                        }}>
                            <div style={{
                                fontSize: '14px', color: '#57534E', lineHeight: 1.6,
                                fontStyle: 'italic',
                            }}>
                                {word.note}
                            </div>
                        </div>

                        {/* ── Phrases ── */}
                        {word.phrases.length > 0 && (
                            <div style={{ marginBottom: '16px' }}>
                                <button onClick={() => setShowPhrases(!showPhrases)} style={{
                                    width: '100%', padding: '12px 16px',
                                    border: '1px solid #F5F5F4', borderRadius: '12px',
                                    backgroundColor: '#fff', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    gap: '6px',
                                }}>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#57534E' }}>
                                        {showPhrases ? 'Hide' : 'Show'} {word.phrases.length} phrases
                                    </span>
                                    <span style={{
                                        fontSize: '10px', color: '#A8A29E',
                                        transform: showPhrases ? 'rotate(180deg)' : 'none',
                                        transition: 'transform 0.2s',
                                    }}>{'\u25BC'}</span>
                                </button>

                                {showPhrases && (
                                    <div style={{
                                        marginTop: '8px', backgroundColor: '#fff',
                                        borderRadius: '12px', border: '1px solid #F5F5F4',
                                        overflow: 'hidden',
                                    }}>
                                        {word.phrases.map((p, pi) => (
                                            <div key={pi} style={{
                                                display: 'flex', gap: '10px',
                                                padding: '12px 16px',
                                                borderBottom: pi < word.phrases.length - 1
                                                    ? '1px solid #F5F5F4' : 'none',
                                            }}>
                                                <button onClick={() => speak(p.text, `${word.uid}_p${pi}`)} style={{
                                                    width: '32px', height: '32px', borderRadius: '50%',
                                                    border: 'none', cursor: 'pointer', flexShrink: 0,
                                                    backgroundColor: playingId === `${word.uid}_p${pi}`
                                                        ? (SPEAKER_COLORS[p.speaker] || '#78716C') : '#F5F5F4',
                                                    color: playingId === `${word.uid}_p${pi}` ? '#fff' : '#A8A29E',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '10px', marginTop: '2px',
                                                }}>
                                                    {playingId === `${word.uid}_p${pi}` ? '\u25A0' : '\u25B6'}
                                                </button>
                                                <div style={{ flex: 1 }}>
                                                    <span style={{
                                                        fontSize: '10px', fontWeight: 700,
                                                        color: SPEAKER_COLORS[p.speaker] || '#78716C',
                                                    }}>
                                                        {p.speaker}
                                                    </span>
                                                    <div style={{
                                                        fontSize: '14px', color: '#1C1917', lineHeight: 1.6,
                                                    }}>
                                                        {p.text}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '12px', color: '#A8A29E', lineHeight: 1.4,
                                                    }}>
                                                        {p.ja}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── Nav buttons ── */}
                        <div style={{
                            display: 'flex', gap: '10px', marginTop: '8px',
                        }}>
                            <button onClick={goPrev} disabled={currentIndex === 0} style={{
                                flex: 1, padding: '14px', borderRadius: '12px',
                                border: '1px solid #E7E5E4', backgroundColor: '#fff',
                                cursor: currentIndex === 0 ? 'default' : 'pointer',
                                opacity: currentIndex === 0 ? 0.3 : 1,
                                fontSize: '14px', fontWeight: 600, color: '#57534E',
                                minHeight: '48px',
                            }}>
                                {'\u2190'} Prev
                            </button>
                            <button onClick={goNext} disabled={currentIndex >= lessonWords.length - 1} style={{
                                flex: 1, padding: '14px', borderRadius: '12px',
                                border: 'none',
                                backgroundColor: currentIndex >= lessonWords.length - 1 ? '#E7E5E4' : lvMeta.color,
                                cursor: currentIndex >= lessonWords.length - 1 ? 'default' : 'pointer',
                                fontSize: '14px', fontWeight: 700,
                                color: currentIndex >= lessonWords.length - 1 ? '#A8A29E' : '#fff',
                                minHeight: '48px',
                            }}>
                                Next {'\u2192'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty state -- no words in this lesson yet */}
            {!word && (
                <div style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    padding: '32px 16px', color: '#A8A29E',
                }}>
                    <div style={{ fontSize: '14px', marginBottom: '16px' }}>
                        No words in this lesson yet
                    </div>
                    <button onClick={goBack} style={{
                        padding: '12px 24px', borderRadius: '12px',
                        border: '1px solid #E7E5E4', backgroundColor: '#fff',
                        cursor: 'pointer', fontSize: '14px', fontWeight: 600,
                        color: '#57534E',
                    }}>
                        {'\u2190'} Back to lessons
                    </button>
                </div>
            )}
        </div>
    );
}
