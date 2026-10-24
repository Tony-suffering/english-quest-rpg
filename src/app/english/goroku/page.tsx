'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { CATEGORY_META, type GorokuCategory } from '@/data/english/ore-goroku';
import { GOROKU_SEEDS } from '@/data/english/goroku-seed';
import ReviewCalendar, { loadReviewed, saveReviewed } from '@/components/english/ReviewCalendar';
import { usePPWordPicker, PPButton, PPPopup } from '@/components/english/PPWordPicker';

interface GorokuEntry {
    id: string;
    day_slot: number;
    japanese: string;
    english: string[];
    literal: string | null;
    context: string;
    category: string;
    mastery_level: number;
    slot: string | null;
    slot_hints: string[] | null;
}

function buildMonthKey(year: number, month: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}`;
}

function buildEntries(year: number, month: number): GorokuEntry[] {
    const monthKey = buildMonthKey(year, month);
    const counters: Record<number, number> = {};
    return GOROKU_SEEDS
        .filter(seed => (seed.month || '2026-02') === monthKey)
        .map(seed => {
            const idx = counters[seed.daySlot] || 0;
            counters[seed.daySlot] = idx + 1;
            return {
                id: `d${monthKey}_${String(seed.daySlot).padStart(2, '0')}_${idx}`,
                day_slot: seed.daySlot,
                japanese: seed.japanese,
                english: seed.english,
                literal: seed.literal || null,
                context: seed.context,
                category: seed.category,
                mastery_level: 0,
                slot: seed.slot || null,
                slot_hints: seed.slotHints || null,
            };
        });
}

const CATEGORY_COLORS: Record<string, { fg: string; bg: string }> = {
    reaction: { fg: '#D4AF37', bg: '#FEF9E7' },
    request: { fg: '#10B981', bg: '#ECFDF5' },
    opinion: { fg: '#3B82F6', bg: '#EFF6FF' },
    suggestion: { fg: '#8B5CF6', bg: '#F5F3FF' },
    filler: { fg: '#F59E0B', bg: '#FFFBEB' },
    shutdown: { fg: '#EF4444', bg: '#FEF2F2' },
};

export default function GorokuPage() {
    const [entries, setEntries] = useState<GorokuEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [playedIds, setPlayedIds] = useState<Set<string>>(() => {
        try {
            const saved = localStorage.getItem('goroku-played');
            return saved ? new Set(JSON.parse(saved)) : new Set();
        } catch { return new Set(); }
    });
    const [isMobile, setIsMobile] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
    const [registeredPhrases, setRegisteredPhrases] = useState<Set<string>>(new Set());
    const [registeringId, setRegisteringId] = useState<string | null>(null);
    const [customSlots, setCustomSlots] = useState<Record<string, string>>({});
    const [editingSlotId, setEditingSlotId] = useState<string | null>(null);
    const [levelMap, setLevelMap] = useState<Record<string, number>>({});
    const detailRef = useRef<HTMLDivElement>(null);
    const { ppWordPicker, openPP, toggleWord, closePP, search: ppSearch } = usePPWordPicker();

    const now = new Date();
    const [viewYear, setViewYear] = useState(now.getFullYear());
    const [viewMonth, setViewMonth] = useState(now.getMonth());

    const todayDate = now.getDate();
    const todayMonth = now.getMonth();
    const todayYear = now.getFullYear();
    const isCurrentMonth = viewYear === todayYear && viewMonth === todayMonth;

    // Reviewed days for detail panel button
    const reviewKey = `goroku-reviewed-${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
    const [reviewedDays, setReviewedDays] = useState<Set<number>>(new Set());

    useEffect(() => {
        setReviewedDays(loadReviewed(reviewKey));
    }, [reviewKey]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('goroku-slots');
            if (saved) setCustomSlots(JSON.parse(saved));
        } catch { /* ignore */ }
    }, []);

    useEffect(() => {
        const allEntries = buildEntries(viewYear, viewMonth);
        setEntries(allEntries);
        setSelectedDay(null);
        setCategoryFilter(null);
        // playedIds persisted in localStorage -- don't reset
        fetch('/api/phrases').then(r => r.json()).then(data => {
            if (data.success && data.phrases) {
                setRegisteredPhrases(new Set(
                    data.phrases.map((p: { english: string }) => p.english.toLowerCase())
                ));
            }
        }).catch(() => {});
        setLoading(false);
    }, [viewYear, viewMonth]);

    useEffect(() => {
        if (!loading && entries.length > 0 && selectedDay === null) {
            setSelectedDay(todayDate);
        }
    }, [loading, entries.length, selectedDay, todayDate]);

    useEffect(() => {
        if (detailRef.current) {
            detailRef.current.scrollTop = 0;
        }
    }, [selectedDay]);

    // Sync reviewed state from calendar component
    useEffect(() => {
        const handleStorage = () => {
            setReviewedDays(loadReviewed(reviewKey));
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [reviewKey]);

    // Auto-complete check: when all entries for selected day are played
    useEffect(() => {
        if (!selectedDay) return;
        const dayEntries = byDay[selectedDay] || [];
        if (dayEntries.length === 0) return;
        const allPlayed = dayEntries.every(e => playedIds.has(e.id));
        if (allPlayed && !reviewedDays.has(selectedDay)) {
            const next = new Set(reviewedDays);
            next.add(selectedDay);
            setReviewedDays(next);
            saveReviewed(reviewKey, next);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playedIds, selectedDay]);

    const byDay = useMemo(() => {
        const map: Record<number, GorokuEntry[]> = {};
        entries.forEach(e => {
            if (!map[e.day_slot]) map[e.day_slot] = [];
            map[e.day_slot].push(e);
        });
        return map;
    }, [entries]);

    const selectedEntries = useMemo(() => {
        if (!selectedDay) return [];
        const dayEntries = byDay[selectedDay] || [];
        if (!categoryFilter) return dayEntries;
        return dayEntries.filter(e => e.category === categoryFilter);
    }, [selectedDay, byDay, categoryFilter]);

    const totalEntries = entries.length;

    const selectedDayCategoryCounts = useMemo(() => {
        if (!selectedDay) return {};
        const dayEntries = byDay[selectedDay] || [];
        const counts: Record<string, number> = {};
        dayEntries.forEach(e => {
            counts[e.category] = (counts[e.category] || 0) + 1;
        });
        return counts;
    }, [selectedDay, byDay]);

    const speak = useCallback((text: string, id: string) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        const voices = window.speechSynthesis.getVoices();
        const preferred = voices.find(v => v.name.includes('Samantha'))
            || voices.find(v => v.lang === 'en-US' && v.localService);
        if (preferred) utterance.voice = preferred;
        setPlayingId(id);
        utterance.onend = () => {
            setPlayingId(null);
            setPlayedIds(prev => {
                const next = new Set(prev).add(id);
                try { localStorage.setItem('goroku-played', JSON.stringify([...next])); } catch { /* */ }
                return next;
            });
        };
        utterance.onerror = () => setPlayingId(null);
        window.speechSynthesis.speak(utterance);
    }, []);

    const setSlotWord = useCallback((entryId: string, word: string) => {
        setCustomSlots(prev => {
            const next = { ...prev, [entryId]: word };
            try { localStorage.setItem('goroku-slots', JSON.stringify(next)); } catch { /* ignore */ }
            return next;
        });
    }, []);

    const getDisplayText = useCallback((entry: GorokuEntry, level?: number): string => {
        const englishArr = Array.isArray(entry.english) ? entry.english : [entry.english];
        const lvl = level ?? (levelMap[entry.id] ?? 1);
        const base = englishArr[lvl] || englishArr[1] || englishArr[0];
        const custom = customSlots[entry.id];
        if (!entry.slot || !custom) return base;
        const regex = new RegExp(entry.slot.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        return base.replace(regex, custom);
    }, [customSlots, levelMap]);

    const registerToPhrase = async (entry: GorokuEntry) => {
        const phrase = getDisplayText(entry);
        if (registeredPhrases.has(phrase.toLowerCase())) return;
        setRegisteringId(entry.id);
        try {
            const today = new Date();
            const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english: phrase,
                    japanese: entry.japanese,
                    category: 'expression',
                    date: dateStr,
                }),
            });
            const data = await res.json();
            if (data.success || res.status === 409) {
                setRegisteredPhrases(prev => new Set(prev).add(phrase.toLowerCase()));
            }
        } catch (err) {
            console.error('Failed to register phrase:', err);
        } finally {
            setRegisteringId(null);
        }
    };

    const prevMonth = () => {
        if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
        else setViewMonth(m => m - 1);
    };

    const nextMonth = () => {
        if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
        else setViewMonth(m => m + 1);
    };

    const goToday = () => {
        setViewYear(todayYear);
        setViewMonth(todayMonth);
        setSelectedDay(todayDate);
    };

    const toggleDayReviewed = useCallback(() => {
        if (!selectedDay) return;
        setReviewedDays(prev => {
            const next = new Set(prev);
            if (next.has(selectedDay)) next.delete(selectedDay);
            else next.add(selectedDay);
            saveReviewed(reviewKey, next);
            return next;
        });
    }, [selectedDay, reviewKey]);

    // Calendar entries for ReviewCalendar (simplified interface)
    const calendarEntries = useMemo(() =>
        entries.map(e => ({
            id: e.id,
            day_slot: e.day_slot,
            japanese: e.japanese,
            category: e.category,
        })),
    [entries]);

    // Count played entries for selected day
    const selectedDayPlayedCount = useMemo(() => {
        if (!selectedDay) return 0;
        const dayEntries = byDay[selectedDay] || [];
        return dayEntries.filter(e => playedIds.has(e.id)).length;
    }, [selectedDay, byDay, playedIds]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAFAF9' }}>
                <span style={{ color: '#A8A29E', fontSize: '13px', letterSpacing: '0.5px' }}>Loading...</span>
            </div>
        );
    }

    const dayIsReviewed = selectedDay ? reviewedDays.has(selectedDay) : false;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9' }}>
            <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                height: isMobile ? 'auto' : '100vh',
            }}>
                {/* Left: Calendar */}
                <ReviewCalendar
                    title={'\u82F1\u8A9E\u7B4B\u30C8\u30EC'}
                    subtitle={`${totalEntries} Speaking Patterns`}
                    accent="#D4AF37"
                    accentBg="#FEF9E7"
                    entries={calendarEntries}
                    categoryColors={CATEGORY_COLORS}
                    selectedDay={selectedDay}
                    onSelectDay={(day) => { setSelectedDay(day); setCategoryFilter(null); }}
                    viewYear={viewYear}
                    viewMonth={viewMonth}
                    onPrevMonth={prevMonth}
                    onNextMonth={nextMonth}
                    onGoToday={goToday}
                    storagePrefix="goroku"
                    playedIds={playedIds}
                    isMobile={isMobile}
                    headerRight={totalEntries === 0 ? (
                        <button
                            onClick={async () => {
                                try {
                                    const res = await fetch('/api/goroku/init', { method: 'POST' });
                                    const data = await res.json();
                                    if (data.success) window.location.reload();
                                    else alert('Init failed: ' + (data.error || data.message));
                                } catch (err) {
                                    alert('Error: ' + err);
                                }
                            }}
                            style={{
                                padding: '6px 16px', borderRadius: '6px',
                                border: '1px solid #D4AF37', backgroundColor: '#fff',
                                color: '#D4AF37', fontSize: '12px', fontWeight: '700', cursor: 'pointer',
                            }}
                        >
                            Initialize
                        </button>
                    ) : undefined}
                />

                {/* Right: Detail Panel */}
                <div
                    ref={detailRef}
                    style={{
                        width: isMobile ? '100%' : '420px',
                        borderLeft: isMobile ? 'none' : '1px solid #F5F5F4',
                        borderTop: isMobile ? '1px solid #F5F5F4' : 'none',
                        backgroundColor: '#fff',
                        overflow: 'auto',
                        flexShrink: 0,
                        minHeight: isMobile ? '400px' : 'auto',
                    }}
                >
                    {selectedDay && (byDay[selectedDay] || []).length > 0 ? (
                        <div style={{ padding: '20px' }}>
                            {/* Day header */}
                            <div style={{ marginBottom: '16px' }}>
                                <div style={{
                                    display: 'flex', alignItems: 'baseline', gap: '8px',
                                    marginBottom: '10px',
                                }}>
                                    <span style={{
                                        fontSize: '32px', fontWeight: '900', color: '#D4AF37',
                                        lineHeight: 1, letterSpacing: '-1px',
                                    }}>
                                        {selectedDay}
                                    </span>
                                    <span style={{
                                        fontSize: '12px', color: '#A8A29E', fontWeight: '600',
                                    }}>
                                        {new Date(viewYear, viewMonth, selectedDay).toLocaleDateString('ja-JP', { weekday: 'short' })}
                                    </span>
                                    {selectedDayPlayedCount > 0 && (
                                        <span style={{
                                            fontSize: '10px', color: '#D6D3D1', fontWeight: '500',
                                        }}>
                                            {selectedDayPlayedCount}/{(byDay[selectedDay] || []).length} played
                                        </span>
                                    )}
                                </div>

                                {/* Review complete button */}
                                <button
                                    onClick={toggleDayReviewed}
                                    style={{
                                        width: '100%',
                                        height: '44px',
                                        borderRadius: '10px',
                                        border: dayIsReviewed ? '2px solid #D4AF37' : '2px solid #D4AF37',
                                        backgroundColor: dayIsReviewed ? '#D4AF37' : '#fff',
                                        color: dayIsReviewed ? '#fff' : '#D4AF37',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        marginBottom: '12px',
                                    }}
                                >
                                    {dayIsReviewed ? '\u2713 \u5B8C\u4E86' : '\u5FA9\u7FD2\u5B8C\u4E86\u306B\u3059\u308B'}
                                </button>

                                {/* Category filter pills */}
                                <div style={{
                                    display: 'flex', gap: '4px', flexWrap: 'wrap',
                                }}>
                                    <button
                                        onClick={() => setCategoryFilter(null)}
                                        style={{
                                            padding: '3px 10px',
                                            borderRadius: '12px',
                                            border: categoryFilter === null ? '1px solid #44403C' : '1px solid #E7E5E4',
                                            fontSize: '10px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            backgroundColor: categoryFilter === null ? '#44403C' : '#fff',
                                            color: categoryFilter === null ? '#fff' : '#A8A29E',
                                            transition: 'all 0.15s',
                                        }}
                                    >
                                        All {(byDay[selectedDay] || []).length}
                                    </button>
                                    {Object.entries(selectedDayCategoryCounts).map(([cat, count]) => {
                                        const colors = CATEGORY_COLORS[cat] || { fg: '#999', bg: '#f5f5f5' };
                                        const isActive = categoryFilter === cat;
                                        return (
                                            <button
                                                key={cat}
                                                onClick={() => setCategoryFilter(isActive ? null : cat)}
                                                style={{
                                                    padding: '3px 10px',
                                                    borderRadius: '12px',
                                                    border: isActive ? `1px solid ${colors.fg}` : '1px solid #E7E5E4',
                                                    fontSize: '10px',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    backgroundColor: isActive ? colors.bg : '#fff',
                                                    color: isActive ? colors.fg : '#A8A29E',
                                                    transition: 'all 0.15s',
                                                }}
                                            >
                                                {CATEGORY_META[cat as GorokuCategory]?.en || cat} {count}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Entry list */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {selectedEntries.map((entry) => {
                                    const englishArr = Array.isArray(entry.english) ? entry.english : [entry.english];
                                    const hasBeenPlayed = playedIds.has(entry.id);
                                    const levelLabels = ['Core', 'Natural', 'Full', 'Bonus'];

                                    return (
                                        <div
                                            key={entry.id}
                                            style={{
                                                backgroundColor: '#fff',
                                                borderRadius: '10px',
                                                border: playingId === entry.id
                                                    ? '2px solid #D4AF37'
                                                    : '1px solid #F5F5F4',
                                                padding: '10px 12px',
                                                transition: 'all 0.15s',
                                            }}
                                        >
                                            {/* Japanese header */}
                                            <div style={{
                                                display: 'flex', alignItems: 'center', gap: '8px',
                                                marginBottom: '6px',
                                            }}>
                                                <div style={{ position: 'relative', flexShrink: 0 }}>
                                                    <button
                                                        onClick={() => speak(englishArr[1] || englishArr[0], entry.id)}
                                                        style={{
                                                            width: '32px', height: '32px',
                                                            borderRadius: '50%',
                                                            border: 'none', cursor: 'pointer',
                                                            backgroundColor: playingId === entry.id ? '#D4AF37' : '#F5F5F4',
                                                            color: playingId === entry.id ? '#fff' : '#78716C',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            fontSize: '12px',
                                                            transition: 'all 0.15s',
                                                        }}
                                                    >
                                                        {playingId === entry.id ? '\u25A0' : '\u25B6'}
                                                    </button>
                                                    {hasBeenPlayed && playingId !== entry.id && (
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '-1px', right: '-1px',
                                                            width: '8px', height: '8px',
                                                            borderRadius: '50%',
                                                            backgroundColor: '#10B981',
                                                            border: '2px solid #fff',
                                                        }} />
                                                    )}
                                                </div>
                                                <div style={{
                                                    fontSize: '14px', fontWeight: '700', color: '#1C1917',
                                                    lineHeight: 1.4, flex: 1,
                                                }}>
                                                    {entry.japanese}
                                                </div>
                                            </div>

                                            {/* All 4 English levels */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginLeft: '40px' }}>
                                                {englishArr.map((text, lvl) => {
                                                    if (!text) return null;
                                                    const phraseKey = `${entry.id}_lv${lvl}`;
                                                    const isLvPlaying = playingId === phraseKey;
                                                    const alreadyRegistered = registeredPhrases.has(text.toLowerCase());
                                                    const isBonus = lvl === 3;
                                                    return (
                                                        <div key={lvl} style={{
                                                            display: 'flex', alignItems: 'flex-start', gap: '6px',
                                                            padding: '3px 0',
                                                            borderTop: isBonus ? '1px dashed #E7E5E4' : 'none',
                                                            marginTop: isBonus ? '2px' : 0,
                                                            paddingTop: isBonus ? '5px' : '3px',
                                                        }}>
                                                            <button
                                                                onClick={() => speak(text, phraseKey)}
                                                                style={{
                                                                    width: '20px', height: '20px',
                                                                    borderRadius: '50%',
                                                                    border: 'none', cursor: 'pointer',
                                                                    backgroundColor: isLvPlaying ? '#D4AF37' : '#F5F5F4',
                                                                    color: isLvPlaying ? '#fff' : '#A8A29E',
                                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                    fontSize: '8px',
                                                                    flexShrink: 0,
                                                                    marginTop: '1px',
                                                                    transition: 'all 0.15s',
                                                                }}
                                                            >
                                                                {isLvPlaying ? '\u25A0' : '\u25B6'}
                                                            </button>
                                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                                                    <span style={{
                                                                        fontSize: '9px', fontWeight: '700',
                                                                        color: isBonus ? '#10B981' : '#D6D3D1',
                                                                        letterSpacing: '0.5px',
                                                                        flexShrink: 0,
                                                                    }}>
                                                                        {isBonus ? 'BONUS' : levelLabels[lvl]}
                                                                    </span>
                                                                    <span style={{
                                                                        fontSize: lvl === 0 ? '12px' : '12px',
                                                                        fontWeight: lvl === 1 ? '700' : '500',
                                                                        color: lvl === 1 ? '#D4AF37' : isBonus ? '#10B981' : '#57534E',
                                                                        lineHeight: 1.4,
                                                                    }}>
                                                                        {text}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => {
                                                                    if (alreadyRegistered) return;
                                                                    const phrase = text;
                                                                    setRegisteringId(phraseKey);
                                                                    const today = new Date();
                                                                    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                                                                    fetch('/api/phrases', {
                                                                        method: 'POST',
                                                                        headers: { 'Content-Type': 'application/json' },
                                                                        body: JSON.stringify({
                                                                            english: phrase,
                                                                            japanese: entry.japanese,
                                                                            category: 'expression',
                                                                            date: dateStr,
                                                                        }),
                                                                    }).then(r => r.json()).then(data => {
                                                                        if (data.success || data.status === 409) {
                                                                            setRegisteredPhrases(prev => new Set(prev).add(phrase.toLowerCase()));
                                                                        }
                                                                    }).catch(() => {}).finally(() => setRegisteringId(null));
                                                                }}
                                                                disabled={alreadyRegistered || registeringId === phraseKey}
                                                                style={{
                                                                    padding: '2px 6px',
                                                                    borderRadius: '6px',
                                                                    border: alreadyRegistered ? '1px solid #E7E5E4' : '1px solid #D4AF37',
                                                                    backgroundColor: alreadyRegistered ? '#FAFAF9' : '#fff',
                                                                    color: alreadyRegistered ? '#D6D3D1' : '#D4AF37',
                                                                    fontSize: '9px',
                                                                    fontWeight: '600',
                                                                    cursor: alreadyRegistered ? 'default' : 'pointer',
                                                                    flexShrink: 0,
                                                                    transition: 'all 0.15s',
                                                                    marginTop: '1px',
                                                                }}
                                                            >
                                                                {alreadyRegistered ? 'Done' : registeringId === phraseKey ? '...' : '+'}
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Context */}
                                            <div style={{
                                                fontSize: '11px', color: '#78716C',
                                                lineHeight: 1.6, marginTop: '6px',
                                                paddingTop: '6px',
                                                borderTop: '1px solid #F5F5F4',
                                                marginLeft: '40px',
                                            }}>
                                                {entry.context}
                                            </div>
                                            <div style={{ marginLeft: '40px', marginTop: '4px' }}>
                                                <PPButton onClick={() => openPP(entry.id, englishArr[1] || englishArr[0])} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div style={{
                            padding: '40px 20px', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            height: '100%', color: '#D6D3D1',
                        }}>
                            <div style={{
                                fontSize: '56px', fontWeight: '900',
                                color: 'rgba(212,175,55,0.08)',
                                marginBottom: '12px', lineHeight: 1,
                            }}>
                                {isCurrentMonth ? todayDate : ''}
                            </div>
                            <div style={{
                                fontSize: '13px', textAlign: 'center',
                                lineHeight: 1.6, color: '#A8A29E',
                            }}>
                                {entries.length === 0
                                    ? 'Initialize to load 310 expressions.'
                                    : isCurrentMonth
                                        ? `Day ${todayDate} -- tap a date to start`
                                        : 'Select a day to review'
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {ppWordPicker && <PPPopup state={ppWordPicker} onToggle={toggleWord} onClose={closePP} onSearch={ppSearch} />}
        </div>
    );
}
