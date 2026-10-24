'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ALL_EVERYDAY_WORDS, WORD_CATEGORIES, getMaxDay } from '@/data/english/everyday-words';
import type { EverydayWordSeed } from '@/data/english/everyday-words';
import { usePPWordPicker, PPButton, PPPopup } from '@/components/english/PPWordPicker';

// ── 英単語帳 ─────────────────────────────────────────────────
// 市販のとは全く違う角度の英単語帳。
// カレンダーじゃなくてUnit制。根拠つき。楽しい。

const WORDS_PER_UNIT = 25;

interface WordWithId extends EverydayWordSeed {
    uid: string;
    unitIndex: number;
}

type SortMode = 'default' | 'shuffle' | 'category';

// Seeded shuffle for consistent results per session
function shuffleArray<T>(arr: T[], seed: number): T[] {
    const result = [...arr];
    let s = seed;
    for (let i = result.length - 1; i > 0; i--) {
        s = (s * 16807 + 0) % 2147483647;
        const j = s % (i + 1);
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

// Interleave by category so same category doesn't repeat
function interleaveByCategory<T extends { cat: string }>(arr: T[]): T[] {
    const byCategory: Record<string, T[]> = {};
    arr.forEach(item => {
        if (!byCategory[item.cat]) byCategory[item.cat] = [];
        byCategory[item.cat].push(item);
    });

    const queues = Object.values(byCategory).sort((a, b) => b.length - a.length);
    const result: T[] = [];
    let maxLen = Math.max(...queues.map(q => q.length));

    for (let i = 0; i < maxLen; i++) {
        for (const queue of queues) {
            if (i < queue.length) result.push(queue[i]);
        }
    }
    return result;
}

export default function EverydayWordsPage() {
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set());
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [registeredWords, setRegisteredWords] = useState<Set<string>>(new Set());
    const [registeringId, setRegisteringId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'units' | 'all'>('units');
    const [sortMode, setSortMode] = useState<SortMode>('shuffle');
    const [showSidebar, setShowSidebar] = useState(false);
    const [sessionSeed] = useState(() => Date.now());
    const [autoPlay, setAutoPlay] = useState(false);
    const autoPlayRef = useRef(false);
    const { ppWordPicker, openPP, toggleWord, closePP, search: ppSearch } = usePPWordPicker();
    const currentWordListRef = useRef<WordWithId[]>([]);

    useEffect(() => { autoPlayRef.current = autoPlay; }, [autoPlay]);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Fetch learned state + registered words from DB in parallel
    useEffect(() => {
        (async () => {
            try {
                const [learnedRes, registeredRes] = await Promise.all([
                    fetch('/api/ew-progress'),
                    fetch('/api/user-words'),
                ]);
                if (learnedRes.ok) {
                    const data = await learnedRes.json();
                    if (data.uids?.length) setLearnedWords(new Set(data.uids));
                }
                if (registeredRes.ok) {
                    const data = await registeredRes.json();
                    const set = new Set<string>();
                    (data.words || []).forEach((w: { english: string }) => set.add(w.english.toLowerCase()));
                    setRegisteredWords(set);
                }
            } catch { /* */ }
            setLoading(false);
        })();
    }, []);

    // All words with UIDs and unit indices
    const allWords: WordWithId[] = useMemo(() =>
        ALL_EVERYDAY_WORDS.map((w, i) => ({
            ...w,
            uid: `ew_${i}`,
            unitIndex: Math.floor(i / WORDS_PER_UNIT) + 1,
        })),
    []);

    const totalUnits = Math.ceil(allWords.length / WORDS_PER_UNIT);

    // Unit words with sort applied
    const unitWords = useMemo(() => {
        let words = viewMode === 'units'
            ? allWords.filter(w => w.unitIndex === selectedUnit)
            : allWords;
        if (categoryFilter) words = words.filter(w => w.cat === categoryFilter);
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            words = words.filter(w =>
                w.en.toLowerCase().includes(q) ||
                w.ja.includes(q) ||
                w.pron.includes(q) ||
                w.note.toLowerCase().includes(q) ||
                (w.why && w.why.toLowerCase().includes(q))
            );
        }
        // Apply sort
        if (sortMode === 'shuffle') {
            words = shuffleArray(words, sessionSeed + selectedUnit);
        } else if (sortMode === 'category') {
            words = interleaveByCategory(words);
        }
        return words;
    }, [allWords, selectedUnit, categoryFilter, searchQuery, viewMode, sortMode, sessionSeed]);

    // Keep ref updated for autoplay
    useEffect(() => { currentWordListRef.current = unitWords; }, [unitWords]);

    // Category stats for current unit
    const unitCategoryStats = useMemo(() => {
        const base = viewMode === 'units'
            ? allWords.filter(w => w.unitIndex === selectedUnit)
            : allWords;
        const counts: Record<string, number> = {};
        base.forEach(w => { counts[w.cat] = (counts[w.cat] || 0) + 1; });
        return counts;
    }, [allWords, selectedUnit, viewMode]);

    // Progress per unit
    const unitProgress = useMemo(() => {
        const progress: Record<number, { total: number; learned: number }> = {};
        for (let u = 1; u <= totalUnits; u++) {
            const words = allWords.filter(w => w.unitIndex === u);
            const learned = words.filter(w => learnedWords.has(w.uid)).length;
            progress[u] = { total: words.length, learned };
        }
        return progress;
    }, [allWords, totalUnits, learnedWords]);

    const toggleLearned = useCallback((uid: string) => {
        setLearnedWords(prev => {
            const next = new Set(prev);
            const wasLearned = next.has(uid);
            if (wasLearned) next.delete(uid);
            else next.add(uid);
            // Fire-and-forget DB update
            fetch('/api/ew-progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uid, learned: !wasLearned }),
            }).catch(() => {});
            return next;
        });
    }, []);

    const markLearned = useCallback((uid: string) => {
        setLearnedWords(prev => {
            if (prev.has(uid)) return prev;
            const next = new Set(prev);
            next.add(uid);
            // Fire-and-forget DB update
            fetch('/api/ew-progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ uid, learned: true }),
            }).catch(() => {});
            return next;
        });
    }, []);

    const speak = useCallback((en: string, uid: string) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        setPlayingId(uid);
        const u = new SpeechSynthesisUtterance(en);
        u.lang = 'en-US';
        u.rate = 0.85;
        const voices = window.speechSynthesis.getVoices();
        const preferred = voices.find(v => v.name.includes('Samantha'))
            || voices.find(v => v.lang === 'en-US' && v.localService);
        if (preferred) u.voice = preferred;
        u.onend = () => {
            setPlayingId(null);
            // Auto-mark as learned when played
            markLearned(uid);
            // Auto-play next word if enabled
            if (autoPlayRef.current) {
                const list = currentWordListRef.current;
                const idx = list.findIndex(w => w.uid === uid);
                if (idx >= 0 && idx < list.length - 1) {
                    const next = list[idx + 1];
                    setTimeout(() => speak(next.en, next.uid), 600);
                } else {
                    setAutoPlay(false);
                }
            }
        };
        u.onerror = () => { setPlayingId(null); setAutoPlay(false); };
        window.speechSynthesis.speak(u);
    }, [markLearned]);

    const registerWord = async (word: WordWithId) => {
        if (registeredWords.has(word.en.toLowerCase()) || registeringId === word.uid) return;
        setRegisteringId(word.uid);
        try {
            const res = await fetch('/api/user-words', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english: word.en, pronunciation: word.pron,
                    japanese: word.ja, note: word.note, category: word.cat,
                }),
            });
            if (res.ok || res.status === 409) {
                setRegisteredWords(prev => new Set(prev).add(word.en.toLowerCase()));
            }
        } finally { setRegisteringId(null); }
    };

    const registerAll = async () => {
        const unregistered = unitWords.filter(w => !registeredWords.has(w.en.toLowerCase()));
        for (const word of unregistered) {
            await registerWord(word);
        }
    };

    const stopAutoPlay = useCallback(() => {
        setAutoPlay(false);
        window.speechSynthesis?.cancel();
        setPlayingId(null);
    }, []);

    const startAutoPlay = useCallback(() => {
        if (unitWords.length === 0) return;
        // Start from first unlearned, or first word
        const startWord = unitWords.find(w => !learnedWords.has(w.uid)) || unitWords[0];
        setAutoPlay(true);
        speak(startWord.en, startWord.uid);
    }, [unitWords, learnedWords, speak]);

    const totalLearned = learnedWords.size;
    const totalWords = allWords.length;
    const overallPct = totalWords > 0 ? Math.round((totalLearned / totalWords) * 100) : 0;
    const unitLearnedCount = unitWords.filter(w => learnedWords.has(w.uid)).length;
    const unitRegisteredCount = unitWords.filter(w => registeredWords.has(w.en.toLowerCase())).length;

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAF9' }}>
                <span style={{ color: '#A8A29E', fontSize: '13px' }}>Loading...</span>
            </div>
        );
    }

    return (<>
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
                            <h1 style={{ fontSize: '18px', fontWeight: 900, color: '#1C1917', margin: 0 }}>
                                English Words
                            </h1>
                            <span style={{ fontSize: '10px', color: '#A8A29E' }}>
                                {totalLearned}/{totalWords} learned
                            </span>
                        </div>
                        <button onClick={() => setShowSidebar(!showSidebar)} style={{
                            padding: '6px 12px', borderRadius: '6px', border: '1px solid #E7E5E4',
                            backgroundColor: '#fff', cursor: 'pointer', fontSize: '11px',
                            fontWeight: 600, color: '#57534E',
                        }}>
                            Unit {selectedUnit}
                        </button>
                    </div>
                )}

                {/* ── Left Panel: Unit Navigation ── */}
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
                    {/* Header (desktop only) */}
                    {!isMobile && (
                        <div style={{ marginBottom: '16px' }}>
                            <h1 style={{
                                fontSize: '20px', fontWeight: 900, color: '#1C1917',
                                letterSpacing: '-0.5px', marginBottom: '4px',
                            }}>
                                English Words
                            </h1>
                            <p style={{ fontSize: '11px', color: '#A8A29E', lineHeight: 1.5 }}>
                                {totalWords.toLocaleString()} words / {totalUnits} units
                            </p>
                        </div>
                    )}

                    {/* Overall progress */}
                    <div style={{
                        padding: '10px 12px', backgroundColor: '#F5F5F4', borderRadius: '10px',
                        marginBottom: '12px',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span style={{ fontSize: '11px', color: '#78716C', fontWeight: 600 }}>Progress</span>
                            <span style={{ fontSize: '11px', color: '#8B5CF6', fontWeight: 700 }}>{totalLearned}/{totalWords}</span>
                        </div>
                        <div style={{ height: '4px', backgroundColor: '#E7E5E4', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{
                                height: '100%', width: `${overallPct}%`, backgroundColor: '#8B5CF6',
                                borderRadius: '2px', transition: 'width 0.3s',
                            }} />
                        </div>
                    </div>

                    {/* View mode toggle */}
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                        {(['units', 'all'] as const).map(mode => (
                            <button key={mode} onClick={() => { setViewMode(mode); if (isMobile) setShowSidebar(false); }} style={{
                                flex: 1, padding: '6px', fontSize: '11px', fontWeight: 600,
                                border: '1px solid #E7E5E4', cursor: 'pointer',
                                backgroundColor: viewMode === mode ? '#8B5CF6' : '#fff',
                                color: viewMode === mode ? '#fff' : '#78716C',
                                borderRadius: '6px',
                            }}>
                                {mode === 'units' ? 'Unit' : 'All'}
                            </button>
                        ))}
                    </div>

                    {/* Unit list */}
                    {viewMode === 'units' && (
                        <div style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'row' : 'column',
                            gap: '3px',
                            flexWrap: isMobile ? 'wrap' : 'nowrap',
                            maxHeight: isMobile ? '200px' : 'none',
                            overflow: isMobile ? 'auto' : 'visible',
                        }}>
                            {Array.from({ length: totalUnits }, (_, i) => i + 1).map(u => {
                                const prog = unitProgress[u];
                                const isActive = selectedUnit === u;
                                const isComplete = prog && prog.learned >= prog.total;
                                const pct = prog ? Math.round((prog.learned / prog.total) * 100) : 0;

                                return (
                                    <button key={u} onClick={() => { setSelectedUnit(u); if (isMobile) setShowSidebar(false); }} style={{
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        padding: isMobile ? '6px 10px' : '6px 10px',
                                        border: isActive ? '1px solid #8B5CF6' : '1px solid transparent',
                                        backgroundColor: isActive ? '#F5F3FF' : isComplete ? '#ECFDF5' : 'transparent',
                                        cursor: 'pointer', textAlign: 'left',
                                        borderRadius: '8px', width: isMobile ? 'auto' : '100%',
                                        flexShrink: 0,
                                    }}>
                                        <span style={{
                                            fontSize: '11px', fontWeight: 800,
                                            color: isComplete ? '#10B981' : isActive ? '#8B5CF6' : '#A8A29E',
                                            width: '20px', textAlign: 'center', flexShrink: 0,
                                        }}>
                                            {isComplete ? '\u2713' : u}
                                        </span>
                                        {!isMobile && (
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{
                                                        fontSize: '11px', fontWeight: 600,
                                                        color: isActive ? '#1C1917' : '#57534E',
                                                    }}>
                                                        Unit {u}
                                                    </span>
                                                    <span style={{ fontSize: '10px', color: '#A8A29E' }}>
                                                        {prog?.learned || 0}/{prog?.total || 0}
                                                    </span>
                                                </div>
                                                {/* Mini progress bar */}
                                                <div style={{
                                                    height: '2px', backgroundColor: '#E7E5E4',
                                                    borderRadius: '1px', marginTop: '3px', overflow: 'hidden',
                                                }}>
                                                    <div style={{
                                                        height: '100%', width: `${pct}%`,
                                                        backgroundColor: isComplete ? '#10B981' : '#8B5CF6',
                                                        transition: 'width 0.3s',
                                                    }} />
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* ── Right Panel: Word Cards ── */}
                <div style={{
                    flex: 1, overflow: 'auto', padding: isMobile ? '12px' : '20px 24px',
                }}>
                    {/* Toolbar */}
                    <div style={{ marginBottom: '16px', maxWidth: '720px' }}>
                        {/* Top row: title + actions */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            marginBottom: '10px', flexWrap: 'wrap',
                        }}>
                            {viewMode === 'units' && (
                                <span style={{
                                    fontSize: '12px', fontWeight: 800, color: '#8B5CF6',
                                    letterSpacing: '1px',
                                }}>
                                    UNIT {selectedUnit}
                                </span>
                            )}
                            <span style={{ fontSize: '11px', color: '#A8A29E' }}>
                                {unitWords.length} words
                                {unitLearnedCount > 0 && ` / ${unitLearnedCount} learned`}
                                {unitRegisteredCount > 0 && ` / ${unitRegisteredCount} registered`}
                            </span>

                            <div style={{ flex: 1 }} />

                            {/* Auto-play toggle */}
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
                                    padding: '5px 10px', borderRadius: '6px', border: '1px solid #E7E5E4',
                                    backgroundColor: '#fff', color: '#57534E', cursor: 'pointer',
                                    fontSize: '11px', fontWeight: 600,
                                }}>
                                    Auto Play
                                </button>
                            )}

                            {/* Register all */}
                            {unitRegisteredCount < unitWords.length && (
                                <button onClick={registerAll} style={{
                                    padding: '5px 10px', borderRadius: '6px', border: 'none',
                                    backgroundColor: '#F5F3FF', color: '#7C3AED', cursor: 'pointer',
                                    fontSize: '11px', fontWeight: 700,
                                }}>
                                    + Register All
                                </button>
                            )}
                        </div>

                        {/* Search + Sort row */}
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search words..."
                                style={{
                                    flex: 1, minWidth: '180px', padding: '7px 12px',
                                    border: '1px solid #E7E5E4', borderRadius: '8px',
                                    fontSize: '13px', outline: 'none',
                                }}
                            />
                            {/* Sort mode */}
                            <div style={{ display: 'flex', gap: '2px' }}>
                                {([
                                    { key: 'shuffle' as SortMode, label: 'Mix' },
                                    { key: 'category' as SortMode, label: 'Cat' },
                                    { key: 'default' as SortMode, label: 'Seq' },
                                ]).map(s => (
                                    <button key={s.key} onClick={() => setSortMode(s.key)} style={{
                                        padding: '5px 10px', fontSize: '10px', fontWeight: 700,
                                        border: sortMode === s.key ? '1px solid #8B5CF6' : '1px solid #E7E5E4',
                                        backgroundColor: sortMode === s.key ? '#F5F3FF' : '#fff',
                                        color: sortMode === s.key ? '#8B5CF6' : '#A8A29E',
                                        cursor: 'pointer', borderRadius: '6px',
                                    }}>
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category pills */}
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            <button onClick={() => setCategoryFilter(null)} style={{
                                padding: '3px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 600,
                                border: categoryFilter === null ? '1px solid #44403C' : '1px solid #E7E5E4',
                                backgroundColor: categoryFilter === null ? '#44403C' : '#fff',
                                color: categoryFilter === null ? '#fff' : '#A8A29E',
                                cursor: 'pointer',
                            }}>
                                All
                            </button>
                            {Object.entries(unitCategoryStats).map(([cat, count]) => {
                                const meta = WORD_CATEGORIES[cat];
                                const isActive = categoryFilter === cat;
                                return (
                                    <button key={cat} onClick={() => setCategoryFilter(isActive ? null : cat)} style={{
                                        padding: '3px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 600,
                                        border: isActive ? `1px solid ${meta?.color || '#999'}` : '1px solid #E7E5E4',
                                        backgroundColor: isActive ? (meta?.bg || '#f5f5f5') : '#fff',
                                        color: isActive ? (meta?.color || '#999') : '#A8A29E',
                                        cursor: 'pointer',
                                    }}>
                                        {meta?.label || cat} {count}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Word Cards - flat layout, no expand */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '720px' }}>
                        {unitWords.map((word) => {
                            const isLearned = learnedWords.has(word.uid);
                            const isPlaying = playingId === word.uid;
                            const registered = registeredWords.has(word.en.toLowerCase());
                            const catMeta = WORD_CATEGORIES[word.cat];

                            return (
                                <div key={word.uid} style={{
                                    backgroundColor: '#fff',
                                    border: isPlaying
                                        ? `2px solid ${catMeta?.color || '#8B5CF6'}`
                                        : isLearned
                                            ? '1px solid #D1FAE5'
                                            : '1px solid #F5F5F4',
                                    borderRadius: '12px',
                                    padding: isPlaying ? '13px' : '14px',
                                    transition: 'border-color 0.15s, background-color 0.15s',
                                    opacity: isLearned && !isPlaying ? 0.7 : 1,
                                }}>
                                    {/* Row 1: Play + Word + Actions */}
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '10px',
                                    }}>
                                        {/* Play button */}
                                        <button onClick={() => speak(word.en, word.uid)} style={{
                                            width: '36px', height: '36px', borderRadius: '50%',
                                            border: 'none', cursor: 'pointer', flexShrink: 0,
                                            backgroundColor: isPlaying ? (catMeta?.color || '#8B5CF6') : '#F5F5F4',
                                            color: isPlaying ? '#fff' : '#57534E',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '12px', transition: 'all 0.15s',
                                        }}>
                                            {isPlaying ? '\u25A0' : '\u25B6'}
                                        </button>

                                        {/* Word + meaning */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
                                                <span style={{
                                                    fontSize: '17px', fontWeight: 800, color: '#1C1917',
                                                }}>
                                                    {word.en}
                                                </span>
                                                <span style={{ fontSize: '11px', color: '#C4B5A0' }}>
                                                    {word.pron}
                                                </span>
                                                {/* Category tag */}
                                                <span style={{
                                                    fontSize: '9px', fontWeight: 600, padding: '1px 6px',
                                                    borderRadius: '4px',
                                                    backgroundColor: catMeta?.bg || '#F5F5F4',
                                                    color: catMeta?.color || '#78716C',
                                                }}>
                                                    {catMeta?.labelEn || word.cat}
                                                </span>
                                            </div>
                                            <div style={{ fontSize: '13px', color: '#57534E', marginTop: '2px' }}>
                                                {word.ja}
                                            </div>
                                        </div>

                                        {/* Register button - always visible */}
                                        <button
                                            onClick={() => !registered && registerWord(word)}
                                            disabled={registered || registeringId === word.uid}
                                            style={{
                                                padding: '5px 10px', borderRadius: '6px',
                                                border: 'none', cursor: registered ? 'default' : 'pointer',
                                                backgroundColor: registered ? '#ECFDF5' : '#F5F3FF',
                                                color: registered ? '#059669' : '#7C3AED',
                                                fontSize: '10px', fontWeight: 700, flexShrink: 0,
                                                opacity: registeringId === word.uid ? 0.5 : 1,
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {registeringId === word.uid ? '...' : registered ? 'Done' : '+ Add'}
                                        </button>

                                        <PPButton onClick={() => openPP(word.uid, word.en)} />

                                        {/* Learned check */}
                                        <button onClick={() => toggleLearned(word.uid)} style={{
                                            width: '28px', height: '28px', borderRadius: '50%',
                                            border: isLearned ? '2px solid #10B981' : '2px solid #E7E5E4',
                                            backgroundColor: isLearned ? '#D1FAE5' : '#fff',
                                            color: isLearned ? '#10B981' : '#E7E5E4',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '13px', fontWeight: 900, cursor: 'pointer', flexShrink: 0,
                                            transition: 'all 0.15s',
                                        }}>
                                            {isLearned ? '\u2713' : ''}
                                        </button>
                                    </div>

                                    {/* Row 2: Example sentence - always visible */}
                                    <div style={{
                                        marginTop: '8px', marginLeft: '46px',
                                        fontSize: '12px', color: '#78716C', lineHeight: 1.6,
                                        padding: '6px 10px', backgroundColor: '#FAFAF9',
                                        borderRadius: '6px',
                                        borderLeft: `3px solid ${catMeta?.color || '#8B5CF6'}`,
                                    }}>
                                        {word.note}
                                    </div>

                                    {/* Row 3: WHY section - always visible if exists */}
                                    {word.why && (
                                        <div style={{
                                            marginTop: '6px', marginLeft: '46px',
                                            fontSize: '12px', color: '#92400E', lineHeight: 1.7,
                                            padding: '6px 10px',
                                            backgroundColor: '#FFFBEB',
                                            borderRadius: '6px',
                                            border: '1px solid #FDE68A',
                                        }}>
                                            <span style={{
                                                fontSize: '9px', fontWeight: 700,
                                                color: '#D4AF37', letterSpacing: '0.5px',
                                                marginRight: '6px',
                                            }}>
                                                WHY?
                                            </span>
                                            {word.why}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {unitWords.length === 0 && (
                            <div style={{
                                padding: '40px', textAlign: 'center', color: '#A8A29E',
                                fontSize: '13px',
                            }}>
                                {searchQuery ? 'No matching words.' : 'No words in this unit.'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        {ppWordPicker && <PPPopup state={ppWordPicker} onToggle={toggleWord} onClose={closePP} onSearch={ppSearch} />}
    </>);
}
