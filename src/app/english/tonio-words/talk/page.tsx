'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ALL_WORDS, ALL_PHRASES, CATEGORIES } from '@/data/tonio-words';
import type { PhraseEntry, WordEntry } from '@/data/tonio-words';

// ── TONIO WORDS / TALK MODE ───────────────────────────────────
// 単語ごとに3フレーズ。6人のスピーカーが会話形式で登場。

const WORDS_PER_DAY = 25;
const TOTAL_DAYS = 20;
const LS_KEY = 'tonio-words-learned';
const LS_PHRASE_KEY = 'tonio-phrases-learned';

const DAY_THEMES: Record<number, string> = {
    1: '知ってるつもりで使えない',
    2: 'カタカナの嘘つき',
    3: '日本語にない感覚',
    4: '超便利つなぎ言葉',
    5: '毎日の動作',
    6: '感情を英語にする',
    7: '人を動かす動詞',
    8: 'ビジネス即戦力',
    9: '実は深い簡単な単語',
    10: 'TOEICの世界',
    11: '議論・意見の武器',
    12: '変化を表現する',
    13: '程度・ニュアンス調整',
    14: '抽象概念を操る',
    15: '生活の動詞',
    16: '形容詞マスター',
    17: '前置詞で化ける動詞',
    18: 'カタカナの嘘 Part 2',
    19: '間違えやすいペア',
    20: 'TOEIC頻出 x 会話',
};

const SPEAKER_COLORS: Record<string, string> = {
    Marcus:  '#DC2626',
    Sarah:   '#2563EB',
    Tom:     '#16A34A',
    Lisa:    '#9333EA',
    Kevin:   '#EA580C',
    Rachel:  '#0891B2',
};

interface WordGroup {
    word: WordEntry;
    wordIndex: number;
    phrases: PhraseEntry[];
}

export default function TalkModePage() {
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedDay, setSelectedDay] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [learnedPhrases, setLearnedPhrases] = useState<Set<string>>(new Set());
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showJapanese, setShowJapanese] = useState(true);
    const [expandedWord, setExpandedWord] = useState<string | null>(null);
    const [autoPlay, setAutoPlay] = useState(false);
    const autoPlayRef = useRef(false);
    const phraseListRef = useRef<{ id: string; text: string }[]>([]);

    useEffect(() => { autoPlayRef.current = autoPlay; }, [autoPlay]);

    // Responsive
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Load learned state
    useEffect(() => {
        try {
            const stored = localStorage.getItem(LS_PHRASE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) setLearnedPhrases(new Set(parsed));
            }
        } catch { /* ignore */ }
        setLoading(false);
    }, []);

    const saveLearned = useCallback((next: Set<string>) => {
        try {
            localStorage.setItem(LS_PHRASE_KEY, JSON.stringify(Array.from(next)));
        } catch { /* ignore */ }
    }, []);

    // Build phrase index by word
    const phrasesByWord = useMemo(() => {
        const map: Record<string, PhraseEntry[]> = {};
        ALL_PHRASES.forEach(p => {
            if (!map[p.wordEn]) map[p.wordEn] = [];
            map[p.wordEn].push(p);
        });
        return map;
    }, []);

    // Word groups for selected day
    const dayGroups = useMemo(() => {
        let words = ALL_WORDS.filter(w => w.day === selectedDay);
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            words = words.filter(w =>
                w.en.toLowerCase().includes(q) ||
                w.ja.includes(q) ||
                (phrasesByWord[w.en] || []).some(p =>
                    p.text.toLowerCase().includes(q) || p.ja.includes(q)
                )
            );
        }
        return words.map((w, i) => ({
            word: w,
            wordIndex: i,
            phrases: phrasesByWord[w.en] || [],
        }));
    }, [selectedDay, searchQuery, phrasesByWord]);

    // Flat phrase list for autoplay
    useEffect(() => {
        const flat: { id: string; text: string }[] = [];
        dayGroups.forEach(g => {
            g.phrases.forEach((p, pi) => {
                flat.push({ id: `${g.word.en}_${pi}`, text: p.text });
            });
        });
        phraseListRef.current = flat;
    }, [dayGroups]);

    // Progress per day
    const dayProgress = useMemo(() => {
        const progress: Record<number, { total: number; learned: number }> = {};
        for (let d = 1; d <= TOTAL_DAYS; d++) {
            const words = ALL_WORDS.filter(w => w.day === d);
            let total = 0;
            let learned = 0;
            words.forEach(w => {
                const phrases = phrasesByWord[w.en] || [];
                total += phrases.length;
                phrases.forEach((_, pi) => {
                    if (learnedPhrases.has(`${w.en}_${pi}`)) learned++;
                });
            });
            progress[d] = { total, learned };
        }
        return progress;
    }, [learnedPhrases, phrasesByWord]);

    const toggleLearned = useCallback((id: string) => {
        setLearnedPhrases(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            saveLearned(next);
            return next;
        });
    }, [saveLearned]);

    const markLearned = useCallback((id: string) => {
        setLearnedPhrases(prev => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            saveLearned(next);
            return next;
        });
    }, [saveLearned]);

    const speak = useCallback((text: string, id: string) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        setPlayingId(id);
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 0.85;
        const voices = window.speechSynthesis.getVoices();
        const preferred = voices.find(v => v.name.includes('Samantha'))
            || voices.find(v => v.lang === 'en-US' && v.localService);
        if (preferred) u.voice = preferred;
        u.onend = () => {
            setPlayingId(null);
            markLearned(id);
            if (autoPlayRef.current) {
                const list = phraseListRef.current;
                const idx = list.findIndex(p => p.id === id);
                if (idx >= 0 && idx < list.length - 1) {
                    const next = list[idx + 1];
                    setTimeout(() => speak(next.text, next.id), 800);
                } else {
                    setAutoPlay(false);
                }
            }
        };
        u.onerror = () => { setPlayingId(null); setAutoPlay(false); };
        window.speechSynthesis.speak(u);
    }, [markLearned]);

    const stopAutoPlay = useCallback(() => {
        setAutoPlay(false);
        window.speechSynthesis?.cancel();
        setPlayingId(null);
    }, []);

    const startAutoPlay = useCallback(() => {
        const list = phraseListRef.current;
        if (list.length === 0) return;
        const start = list.find(p => !learnedPhrases.has(p.id)) || list[0];
        setAutoPlay(true);
        speak(start.text, start.id);
    }, [learnedPhrases, speak]);

    const totalPhrases = ALL_PHRASES.length;
    const totalLearned = learnedPhrases.size;
    const overallPct = totalPhrases > 0 ? Math.round((totalLearned / totalPhrases) * 100) : 0;

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh', display: 'flex', alignItems: 'center',
                justifyContent: 'center', backgroundColor: '#FAFAF9',
            }}>
                <span style={{ color: '#A8A29E', fontSize: '13px' }}>Loading...</span>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9' }}>
            <div style={{
                display: 'flex', flexDirection: isMobile ? 'column' : 'row',
                height: isMobile ? 'auto' : '100vh',
            }}>
                {/* ── Mobile Header ── */}
                {isMobile && (
                    <div style={{
                        backgroundColor: '#fff', padding: '12px 16px',
                        borderBottom: '1px solid #F5F5F4',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                        <div>
                            <h1 style={{
                                fontSize: '18px', fontWeight: 900, color: '#1C1917',
                                margin: 0, letterSpacing: '2px',
                            }}>
                                TALK MODE
                            </h1>
                            <span style={{ fontSize: '10px', color: '#A8A29E' }}>
                                {totalLearned}/{totalPhrases} phrases
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <a href="/english/tonio-words" style={{
                                padding: '5px 10px', borderRadius: '6px',
                                border: '1px solid #E7E5E4', backgroundColor: '#fff',
                                fontSize: '10px', fontWeight: 600, color: '#57534E',
                                textDecoration: 'none',
                            }}>
                                Words
                            </a>
                            <button onClick={() => setShowSidebar(!showSidebar)} style={{
                                padding: '6px 12px', borderRadius: '6px', border: '1px solid #E7E5E4',
                                backgroundColor: '#fff', cursor: 'pointer', fontSize: '11px',
                                fontWeight: 600, color: '#57534E',
                            }}>
                                Day {selectedDay}
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Left Panel: Day Navigation ── */}
                <div style={{
                    width: isMobile ? '100%' : '260px',
                    backgroundColor: '#fff',
                    borderRight: isMobile ? 'none' : '1px solid #F5F5F4',
                    borderBottom: isMobile ? '1px solid #F5F5F4' : 'none',
                    overflow: 'auto',
                    flexShrink: 0,
                    padding: '20px',
                    display: isMobile ? (showSidebar ? 'block' : 'none') : 'block',
                }}>
                    {!isMobile && (
                        <div style={{ marginBottom: '16px' }}>
                            <h1 style={{
                                fontSize: '20px', fontWeight: 900, color: '#1C1917',
                                letterSpacing: '2px', marginBottom: '2px',
                            }}>
                                TALK MODE
                            </h1>
                            <p style={{ fontSize: '11px', color: '#A8A29E', lineHeight: 1.5, margin: 0 }}>
                                1,500 conversation phrases
                            </p>
                            <div style={{
                                width: '40px', height: '3px', backgroundColor: '#10B981',
                                borderRadius: '2px', marginTop: '8px',
                            }} />
                            {/* Nav links */}
                            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                                <a href="/english/tonio-words" style={{
                                    padding: '4px 10px', borderRadius: '6px',
                                    border: '1px solid #E7E5E4', backgroundColor: '#fff',
                                    fontSize: '10px', fontWeight: 600, color: '#57534E',
                                    textDecoration: 'none',
                                }}>
                                    Words
                                </a>
                                <span style={{
                                    padding: '4px 10px', borderRadius: '6px',
                                    border: '1px solid #10B981', backgroundColor: '#ECFDF5',
                                    fontSize: '10px', fontWeight: 700, color: '#10B981',
                                }}>
                                    Talk
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Overall progress */}
                    <div style={{
                        padding: '10px 12px', backgroundColor: '#ECFDF5',
                        borderRadius: '10px', marginBottom: '12px',
                        border: '1px solid #A7F3D0',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span style={{ fontSize: '11px', color: '#78716C', fontWeight: 600 }}>
                                Phrases
                            </span>
                            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>
                                {totalLearned}/{totalPhrases}
                            </span>
                        </div>
                        <div style={{
                            height: '4px', backgroundColor: '#E7E5E4',
                            borderRadius: '2px', overflow: 'hidden',
                        }}>
                            <div style={{
                                height: '100%', width: `${overallPct}%`,
                                backgroundColor: '#10B981',
                                borderRadius: '2px', transition: 'width 0.3s',
                            }} />
                        </div>
                    </div>

                    {/* Day list */}
                    <div style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'row' : 'column',
                        gap: '3px',
                        flexWrap: isMobile ? 'wrap' : 'nowrap',
                        maxHeight: isMobile ? '240px' : 'none',
                        overflow: isMobile ? 'auto' : 'visible',
                    }}>
                        {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map(d => {
                            const prog = dayProgress[d];
                            const isActive = selectedDay === d;
                            const isComplete = prog && prog.learned >= prog.total && prog.total > 0;
                            const pct = prog && prog.total > 0
                                ? Math.round((prog.learned / prog.total) * 100) : 0;

                            return (
                                <button key={d} onClick={() => {
                                    setSelectedDay(d);
                                    if (isMobile) setShowSidebar(false);
                                }} style={{
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    padding: isMobile ? '6px 10px' : '8px 10px',
                                    border: isActive ? '1px solid #10B981' : '1px solid transparent',
                                    backgroundColor: isActive ? '#ECFDF5' : isComplete ? '#F0FDF4' : 'transparent',
                                    cursor: 'pointer', textAlign: 'left',
                                    borderRadius: '8px', width: isMobile ? 'auto' : '100%',
                                    flexShrink: 0,
                                }}>
                                    <span style={{
                                        fontSize: '11px', fontWeight: 800,
                                        color: isComplete ? '#10B981' : isActive ? '#10B981' : '#A8A29E',
                                        width: '20px', textAlign: 'center', flexShrink: 0,
                                    }}>
                                        {isComplete ? '\u2713' : d}
                                    </span>
                                    {!isMobile && (
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{
                                                display: 'flex', justifyContent: 'space-between',
                                                alignItems: 'center',
                                            }}>
                                                <span style={{
                                                    fontSize: '11px', fontWeight: 600,
                                                    color: isActive ? '#1C1917' : '#57534E',
                                                }}>
                                                    Day {d}
                                                </span>
                                                <span style={{ fontSize: '10px', color: '#A8A29E' }}>
                                                    {prog?.learned || 0}/{prog?.total || 0}
                                                </span>
                                            </div>
                                            <div style={{
                                                fontSize: '10px', color: '#A8A29E',
                                                marginTop: '1px',
                                                whiteSpace: 'nowrap', overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}>
                                                {DAY_THEMES[d] || ''}
                                            </div>
                                            <div style={{
                                                height: '2px', backgroundColor: '#E7E5E4',
                                                borderRadius: '1px', marginTop: '4px', overflow: 'hidden',
                                            }}>
                                                <div style={{
                                                    height: '100%', width: `${pct}%`,
                                                    backgroundColor: isComplete ? '#10B981' : '#10B981',
                                                    transition: 'width 0.3s',
                                                }} />
                                            </div>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Right Panel: Phrase Cards ── */}
                <div style={{
                    flex: 1, overflow: 'auto',
                    padding: isMobile ? '12px' : '20px 24px',
                }}>
                    {/* Toolbar */}
                    <div style={{ marginBottom: '16px', maxWidth: '720px' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            marginBottom: '10px', flexWrap: 'wrap',
                        }}>
                            <span style={{
                                fontSize: '12px', fontWeight: 800, color: '#10B981',
                                letterSpacing: '1px',
                            }}>
                                DAY {selectedDay}
                            </span>
                            <span style={{ fontSize: '11px', color: '#A8A29E' }}>
                                {DAY_THEMES[selectedDay]}
                            </span>
                            <span style={{ fontSize: '11px', color: '#A8A29E' }}>
                                {dayGroups.reduce((sum, g) => sum + g.phrases.filter((_, pi) =>
                                    learnedPhrases.has(`${g.word.en}_${pi}`)).length, 0)
                                } / {dayGroups.reduce((sum, g) => sum + g.phrases.length, 0)} listened
                            </span>

                            <div style={{ flex: 1 }} />

                            {/* JP toggle */}
                            <button onClick={() => setShowJapanese(!showJapanese)} style={{
                                padding: '5px 10px', borderRadius: '6px',
                                border: showJapanese ? '1px solid #10B981' : '1px solid #E7E5E4',
                                backgroundColor: showJapanese ? '#ECFDF5' : '#fff',
                                color: showJapanese ? '#10B981' : '#A8A29E',
                                cursor: 'pointer', fontSize: '11px', fontWeight: 600,
                            }}>
                                JP {showJapanese ? 'ON' : 'OFF'}
                            </button>

                            {/* Auto-play */}
                            {autoPlay ? (
                                <button onClick={stopAutoPlay} style={{
                                    padding: '5px 10px', borderRadius: '6px', border: 'none',
                                    backgroundColor: '#FEE2E2', color: '#DC2626', cursor: 'pointer',
                                    fontSize: '11px', fontWeight: 700,
                                }}>
                                    Stop
                                </button>
                            ) : (
                                <button onClick={startAutoPlay} style={{
                                    padding: '5px 10px', borderRadius: '6px',
                                    border: '1px solid #E7E5E4',
                                    backgroundColor: '#fff', color: '#57534E', cursor: 'pointer',
                                    fontSize: '11px', fontWeight: 600,
                                }}>
                                    Auto Play
                                </button>
                            )}
                        </div>

                        {/* Search */}
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search phrases..."
                            style={{
                                width: '100%', padding: '7px 12px',
                                border: '1px solid #E7E5E4', borderRadius: '8px',
                                fontSize: '13px', outline: 'none',
                                backgroundColor: '#fff', boxSizing: 'border-box',
                            }}
                        />
                    </div>

                    {/* Phrase groups by word */}
                    <div style={{
                        display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '720px',
                    }}>
                        {dayGroups.map((group) => {
                            const catMeta = CATEGORIES[group.word.cat];
                            const isExpanded = expandedWord === group.word.en || expandedWord === null;
                            const groupLearned = group.phrases.filter((_, pi) =>
                                learnedPhrases.has(`${group.word.en}_${pi}`)).length;
                            const allDone = groupLearned === group.phrases.length && group.phrases.length > 0;

                            return (
                                <div key={group.word.en} style={{
                                    backgroundColor: '#fff',
                                    border: allDone ? '1px solid #D1FAE5' : '1px solid #F5F5F4',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                }}>
                                    {/* Word header */}
                                    <button onClick={() =>
                                        setExpandedWord(expandedWord === group.word.en ? null : group.word.en)
                                    } style={{
                                        width: '100%', display: 'flex', alignItems: 'center',
                                        gap: '10px', padding: '12px 14px',
                                        backgroundColor: allDone ? '#F0FDF4' : '#FAFAF9',
                                        border: 'none', cursor: 'pointer', textAlign: 'left',
                                        borderBottom: isExpanded ? '1px solid #F5F5F4' : 'none',
                                    }}>
                                        <span style={{
                                            fontSize: '16px', fontWeight: 800, color: '#1C1917',
                                        }}>
                                            {group.word.en}
                                        </span>
                                        <span style={{
                                            fontSize: '12px', color: '#78716C',
                                        }}>
                                            {group.word.ja}
                                        </span>
                                        <span style={{
                                            fontSize: '9px', fontWeight: 600,
                                            padding: '1px 6px', borderRadius: '4px',
                                            backgroundColor: catMeta?.bg || '#F5F5F4',
                                            color: catMeta?.color || '#78716C',
                                        }}>
                                            {catMeta?.labelEn || group.word.cat}
                                        </span>
                                        <div style={{ flex: 1 }} />
                                        <span style={{
                                            fontSize: '10px', color: allDone ? '#10B981' : '#A8A29E',
                                            fontWeight: 600,
                                        }}>
                                            {groupLearned}/{group.phrases.length}
                                        </span>
                                        <span style={{
                                            fontSize: '11px', color: '#A8A29E',
                                            transform: isExpanded ? 'rotate(180deg)' : 'none',
                                            transition: 'transform 0.2s',
                                        }}>
                                            {'\u25BC'}
                                        </span>
                                    </button>

                                    {/* Phrase list */}
                                    {isExpanded && (
                                        <div style={{ padding: '8px 14px 14px' }}>
                                            {group.phrases.map((phrase, pi) => {
                                                const phraseId = `${group.word.en}_${pi}`;
                                                const isPlaying = playingId === phraseId;
                                                const isLearned = learnedPhrases.has(phraseId);
                                                const speakerColor = SPEAKER_COLORS[phrase.speaker] || '#78716C';

                                                return (
                                                    <div key={pi} style={{
                                                        display: 'flex', gap: '10px',
                                                        padding: '10px 0',
                                                        borderBottom: pi < group.phrases.length - 1
                                                            ? '1px solid #F5F5F4' : 'none',
                                                        opacity: isLearned && !isPlaying ? 0.65 : 1,
                                                        transition: 'opacity 0.15s',
                                                    }}>
                                                        {/* Play button */}
                                                        <button onClick={() => speak(phrase.text, phraseId)} style={{
                                                            width: '32px', height: '32px', borderRadius: '50%',
                                                            border: 'none', cursor: 'pointer', flexShrink: 0,
                                                            backgroundColor: isPlaying ? speakerColor : '#F5F5F4',
                                                            color: isPlaying ? '#fff' : '#78716C',
                                                            display: 'flex', alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '10px', transition: 'all 0.15s',
                                                            marginTop: '2px',
                                                        }}>
                                                            {isPlaying ? '\u25A0' : '\u25B6'}
                                                        </button>

                                                        {/* Content */}
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            {/* Speaker name */}
                                                            <span style={{
                                                                fontSize: '10px', fontWeight: 700,
                                                                color: speakerColor,
                                                                letterSpacing: '0.5px',
                                                            }}>
                                                                {phrase.speaker}
                                                            </span>
                                                            {/* English */}
                                                            <div style={{
                                                                fontSize: '14px', color: '#1C1917',
                                                                lineHeight: 1.6, marginTop: '2px',
                                                                fontWeight: isPlaying ? 600 : 400,
                                                            }}>
                                                                {phrase.text}
                                                            </div>
                                                            {/* Japanese */}
                                                            {showJapanese && (
                                                                <div style={{
                                                                    fontSize: '12px', color: '#A8A29E',
                                                                    lineHeight: 1.5, marginTop: '2px',
                                                                }}>
                                                                    {phrase.ja}
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Learned toggle */}
                                                        <button onClick={() => toggleLearned(phraseId)} style={{
                                                            width: '24px', height: '24px', borderRadius: '50%',
                                                            border: isLearned
                                                                ? '2px solid #10B981' : '2px solid #E7E5E4',
                                                            backgroundColor: isLearned ? '#D1FAE5' : '#fff',
                                                            color: isLearned ? '#10B981' : '#E7E5E4',
                                                            display: 'flex', alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '11px', fontWeight: 900,
                                                            cursor: 'pointer', flexShrink: 0,
                                                            transition: 'all 0.15s',
                                                            marginTop: '4px',
                                                        }}>
                                                            {isLearned ? '\u2713' : ''}
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {dayGroups.length === 0 && (
                            <div style={{
                                padding: '40px', textAlign: 'center', color: '#A8A29E',
                                fontSize: '13px',
                            }}>
                                {searchQuery
                                    ? 'No matching phrases.'
                                    : 'No phrases for this day.'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
