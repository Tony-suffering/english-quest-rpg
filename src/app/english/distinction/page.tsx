'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
    NATIVE_1000,
    CATEGORY_META,
    LEVEL_META,
    getEntriesForDay,
    TOTAL_DAYS,
    START_DATE,
    type NativeCategory,
    type NativeEntry,
} from '@/data/english/native1000';
import { usePPWordPicker, PPButton, PPPopup } from '@/components/english/PPWordPicker';

const STORAGE_KEY = 'native1000-learned';
const START = START_DATE;

function getDateForDay(dayNum: number): Date {
    const d = new Date(START);
    d.setDate(d.getDate() + dayNum - 1);
    return d;
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function loadLearned(): Set<string> {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
}
function saveLearned(set: Set<string>) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...set])); } catch { /* noop */ }
}
function speakText(text: string) {
    if (typeof window === 'undefined') return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
}

function buildCalendarGrid(year: number, month: number): (number | null)[] {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDow = new Date(year, month, 1).getDay();
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
}

function buildDateToDayMap(): Record<string, number> {
    const map: Record<string, number> = {};
    for (let d = 1; d <= TOTAL_DAYS; d++) {
        const dt = getDateForDay(d);
        const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
        map[key] = d;
    }
    return map;
}
const DATE_TO_DAY = buildDateToDayMap();

// Category color for stacked bar segments
const CAT_COLORS: Record<NativeCategory, string> = {
    reaction: '#D4AF37', opinion: '#3B82F6', emotion: '#EC4899',
    connector: '#10B981', descriptor: '#8B5CF6', social: '#F59E0B',
};

export default function Native100Page() {
    const [learned, setLearned] = useState<Set<string>>(new Set());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [speakingId, setSpeakingId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
    const [viewYear, setViewYear] = useState(2026);
    const [viewMonth, setViewMonth] = useState(2);
    const [registeredPhrases, setRegisteredPhrases] = useState<Set<string>>(new Set());
    const [registeringId, setRegisteringId] = useState<string | null>(null);
    const { ppWordPicker, openPP, toggleWord, closePP, search: ppSearch } = usePPWordPicker();

    useEffect(() => {
        setLearned(loadLearned());
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);

        const now = new Date();
        const diff = Math.floor((now.getTime() - START.getTime()) / (1000 * 60 * 60 * 24));
        if (diff >= 0 && diff < TOTAL_DAYS) {
            setSelectedDay(diff + 1);
            const target = getDateForDay(diff + 1);
            setViewYear(target.getFullYear());
            setViewMonth(target.getMonth());
        } else {
            setSelectedDay(1);
        }

        // Load registered phrases from DB
        fetch('/api/phrases').then(r => r.json()).then(data => {
            if (data.success && data.phrases) {
                setRegisteredPhrases(new Set(
                    data.phrases.map((p: { english: string }) => p.english.toLowerCase())
                ));
            }
        }).catch(() => {});

        return () => window.removeEventListener('resize', check);
    }, []);

    const learnedCount = learned.size;

    const markLearned = useCallback((id: string) => {
        setLearned(prev => {
            if (prev.has(id)) return prev;
            const next = new Set(prev);
            next.add(id);
            saveLearned(next);
            return next;
        });
    }, []);

    const toggleLearned = useCallback((id: string) => {
        setLearned(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            saveLearned(next);
            return next;
        });
    }, []);

    const handleSpeak = useCallback((id: string, text: string) => {
        setSpeakingId(id);
        speakText(text);
        // Auto-mark as learned on play
        markLearned(id);
        setTimeout(() => setSpeakingId(null), 2000);
    }, [markLearned]);

    const registerToTraining = useCallback(async (english: string, japanese: string) => {
        if (registeredPhrases.has(english.toLowerCase())) return;
        setRegisteringId(english);
        try {
            const today = new Date();
            const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english,
                    japanese,
                    category: 'expression',
                    date: dateStr,
                }),
            });
            const data = await res.json();
            if (data.success || res.status === 409) {
                setRegisteredPhrases(prev => new Set(prev).add(english.toLowerCase()));
            }
        } catch (err) {
            console.error('Failed to register:', err);
        } finally {
            setRegisteringId(null);
        }
    }, [registeredPhrases]);

    function learnedForDay(dayNum: number): number {
        return getEntriesForDay(dayNum).filter(e => learned.has(e.id)).length;
    }

    const dayEntries: NativeEntry[] = selectedDay ? getEntriesForDay(selectedDay) : [];

    const calendarDays = useMemo(() => buildCalendarGrid(viewYear, viewMonth), [viewYear, viewMonth]);
    const rows = Math.ceil(calendarDays.length / 7);

    const now = new Date();
    const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const isCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth();
    const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' });

    const prevMonth = () => { if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); } else setViewMonth(m => m - 1); };
    const nextMonth = () => { if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); } else setViewMonth(m => m + 1); };
    const goToday = () => { setViewYear(now.getFullYear()); setViewMonth(now.getMonth()); };

    const [search, setSearch] = useState('');
    const filteredAll = useMemo(() => {
        if (!search.trim()) return NATIVE_1000;
        const q = search.toLowerCase();
        return NATIVE_1000.filter(e =>
            e.expression.toLowerCase().includes(q) || e.meaning.includes(q) ||
            e.why.includes(q) || e.example.a.toLowerCase().includes(q) || e.example.b.toLowerCase().includes(q)
        );
    }, [search]);

    return (
        <div style={{
            minHeight: '100vh', backgroundColor: '#FAFAF9',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            display: 'flex', flexDirection: 'column',
        }}>
            {/* ===== TOP BAR ===== */}
            <div style={{
                backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7E5E4',
                padding: isMobile ? '12px 16px' : '14px 32px', flexShrink: 0,
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <h1 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: '800', color: '#1C1917', margin: 0, letterSpacing: '-0.5px' }}>
                                Native 1000
                            </h1>
                            <p style={{ fontSize: '12px', color: '#A8A29E', margin: '2px 0 0' }}>
                                ネイティブが毎日使う、教科書に載ってない1000の表現
                            </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                background: learnedCount === 1000 ? 'linear-gradient(135deg, #D4AF37, #10B981)' : `conic-gradient(#D4AF37 ${learnedCount * 0.36}deg, #E7E5E4 0deg)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: '#1C1917' }}>
                                    {learnedCount}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1C1917' }}>{learnedCount}/1000</div>
                                <div style={{ fontSize: '10px', color: '#A8A29E' }}>learned</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', borderBottom: '1px solid #E7E5E4', marginTop: '12px', marginBottom: '-1px' }}>
                        {(['calendar', 'list'] as const).map(mode => (
                            <button key={mode} onClick={() => setViewMode(mode)} style={{
                                flex: 1, padding: '8px 0', border: 'none', cursor: 'pointer',
                                fontSize: '11px', fontWeight: viewMode === mode ? '800' : '500',
                                letterSpacing: '1.5px', color: viewMode === mode ? (mode === 'calendar' ? '#1C1917' : '#D4AF37') : '#A8A29E',
                                background: '#fff',
                                borderBottom: viewMode === mode ? `2px solid ${mode === 'calendar' ? '#1C1917' : '#D4AF37'}` : '2px solid transparent',
                            }}>
                                {mode === 'calendar' ? 'CALENDAR' : 'ALL 1000'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== CALENDAR VIEW ===== */}
            {viewMode === 'calendar' && (
                <div style={{
                    flex: 1, display: 'flex', flexDirection: isMobile ? 'column' : 'row',
                    maxWidth: '1200px', margin: '0 auto', width: '100%',
                    overflow: isMobile ? 'auto' : 'hidden',
                }}>
                    <div style={{
                        flex: isMobile ? 'none' : '1 1 0%', minWidth: 0,
                        display: 'flex', flexDirection: 'column', backgroundColor: '#fff',
                        borderRight: isMobile ? 'none' : '1px solid #E7E5E4',
                        overflow: isMobile ? 'visible' : 'hidden',
                    }}>
                        {/* Month nav */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #F5F5F4', flexShrink: 0 }}>
                            <button onClick={prevMonth} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px', color: '#78716C', padding: '4px 8px' }}>{'<'}</button>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '14px', fontWeight: '700', color: '#1C1917' }}>{monthLabel}</span>
                                {!isCurrentMonth && (
                                    <button onClick={goToday} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '4px', border: '1px solid #E7E5E4', background: '#FAFAF9', color: '#78716C', cursor: 'pointer' }}>TODAY</button>
                                )}
                            </div>
                            <button onClick={nextMonth} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '16px', color: '#78716C', padding: '4px 8px' }}>{'>'}</button>
                        </div>

                        {/* Weekday headers */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #eee', flexShrink: 0 }}>
                            {DAY_NAMES.map((dn, idx) => (
                                <div key={dn} style={{ textAlign: 'center', fontSize: '10px', color: idx === 0 ? '#ef4444' : idx === 6 ? '#3b82f6' : '#666', fontWeight: '600', padding: '6px 0' }}>{dn}</div>
                            ))}
                        </div>

                        {/* Calendar grid */}
                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
                            gridTemplateRows: `repeat(${rows}, 1fr)`,
                            flex: 1, minHeight: isMobile ? `${rows * 72}px` : 0,
                        }}>
                            {calendarDays.map((day, index) => {
                                if (day === null) return <div key={`empty-${index}`} style={{ backgroundColor: '#fafafa' }} />;

                                const dateKey = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                const dayNum = DATE_TO_DAY[dateKey] || null;
                                const hasPhrases = dayNum !== null;
                                const isTodayDate = dateKey === todayKey;
                                const isSelected = dayNum === selectedDay;
                                const dayLearned = dayNum ? learnedForDay(dayNum) : 0;
                                const allDone = dayLearned === 10;
                                const pct = dayNum ? (dayLearned / 10) * 100 : 0;
                                const dayOfWeek = new Date(viewYear, viewMonth, day).getDay();

                                // Category breakdown for stacked bar
                                const entries = dayNum ? getEntriesForDay(dayNum) : [];
                                const catCounts: Partial<Record<NativeCategory, { total: number; done: number }>> = {};
                                for (const e of entries) {
                                    if (!catCounts[e.category]) catCounts[e.category] = { total: 0, done: 0 };
                                    catCounts[e.category]!.total++;
                                    if (learned.has(e.id)) catCounts[e.category]!.done++;
                                }

                                return (
                                    <div
                                        key={day}
                                        onClick={() => { if (dayNum) { setSelectedDay(dayNum); setExpandedId(null); } }}
                                        onMouseEnter={e => { if (hasPhrases) { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; } }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                                        style={{
                                            padding: '4px',
                                            cursor: hasPhrases ? 'pointer' : 'default',
                                            backgroundColor: isSelected ? '#FEF9E7'
                                                : allDone ? '#F0FDF4'
                                                : pct > 50 ? '#FFFDF5'
                                                : !hasPhrases ? '#fafafa' : '#fff',
                                            border: isSelected ? '2px solid #D4AF37'
                                                : isTodayDate ? '2px solid #D4AF37'
                                                : hasPhrases ? '1px solid #e5e5e5' : '1px solid #f0f0f0',
                                            display: 'flex', flexDirection: 'column',
                                            minHeight: isMobile ? '60px' : '80px',
                                            transition: 'transform 0.15s, box-shadow 0.15s, background-color 0.3s',
                                            position: 'relative', overflow: 'hidden',
                                        }}
                                    >
                                        {/* Top: day number + Day label */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{
                                                fontSize: isMobile ? '10px' : '11px',
                                                fontWeight: isTodayDate ? '800' : '600',
                                                color: isTodayDate ? '#D4AF37' : dayOfWeek === 0 ? '#ef4444' : dayOfWeek === 6 ? '#3b82f6' : !hasPhrases ? '#ccc' : '#78716C',
                                            }}>{day}</span>
                                            {dayNum && (
                                                <span style={{ fontSize: '8px', fontWeight: '700', color: isSelected ? '#D4AF37' : '#D6D3D1', letterSpacing: '0.5px' }}>
                                                    D{dayNum}
                                                </span>
                                            )}
                                        </div>

                                        {/* Middle: stacked category bars (training style) */}
                                        {hasPhrases && (
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1px', marginTop: '3px', position: 'relative' }}>
                                                {/* Center overlay: learned count */}
                                                <div style={{
                                                    position: 'absolute', inset: 0,
                                                    display: 'flex', flexDirection: 'column',
                                                    alignItems: 'center', justifyContent: 'center',
                                                    pointerEvents: 'none', zIndex: 2,
                                                }}>
                                                    {allDone ? (
                                                        <span style={{ fontSize: isMobile ? '14px' : '18px', fontWeight: '900', color: '#10B981' }}>{'\u2713'}</span>
                                                    ) : dayLearned > 0 ? (
                                                        <span style={{ fontSize: isMobile ? '14px' : '20px', fontWeight: '900', color: 'rgba(212,175,55,0.25)' }}>{dayLearned}</span>
                                                    ) : (
                                                        <span style={{ fontSize: isMobile ? '12px' : '16px', fontWeight: '900', color: 'rgba(0,0,0,0.04)' }}>10</span>
                                                    )}
                                                </div>
                                                {/* Stacked bars by category */}
                                                {(Object.keys(catCounts) as NativeCategory[]).map(cat => {
                                                    const c = catCounts[cat]!;
                                                    const donePct = (c.done / 10) * 100;
                                                    const totalPct = (c.total / 10) * 100;
                                                    return (
                                                        <div key={cat} style={{
                                                            flex: c.total,
                                                            borderRadius: '1px',
                                                            backgroundColor: '#F0EFEC',
                                                            overflow: 'hidden',
                                                            position: 'relative',
                                                        }}>
                                                            <div style={{
                                                                width: `${(c.done / c.total) * 100}%`,
                                                                height: '100%',
                                                                background: `linear-gradient(90deg, ${CAT_COLORS[cat]}90, ${CAT_COLORS[cat]})`,
                                                                transition: 'width 0.4s ease',
                                                                minWidth: c.done > 0 ? '2px' : '0px',
                                                            }} />
                                                            {/* Count on right */}
                                                            {!isMobile && (
                                                                <span style={{
                                                                    position: 'absolute', right: '2px', top: '50%', transform: 'translateY(-50%)',
                                                                    fontSize: '6px', fontWeight: '800',
                                                                    color: c.done > 0 ? CAT_COLORS[cat] : '#ccc',
                                                                }}>{c.done > 0 ? c.done : ''}</span>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Detail Panel */}
                    <div style={{
                        flex: isMobile ? 'none' : '1 1 0%', minWidth: 0,
                        overflow: 'auto', backgroundColor: '#FAFAF9', order: isMobile ? 2 : 0,
                    }}>
                        {selectedDay ? (
                            <div style={{ padding: isMobile ? '16px' : '20px 24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #E7E5E4' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                        <span style={{ fontSize: '18px', fontWeight: '800', color: '#1C1917' }}>Day {selectedDay}</span>
                                        <span style={{ fontSize: '12px', color: '#A8A29E' }}>
                                            {getDateForDay(selectedDay).getMonth() + 1}/{getDateForDay(selectedDay).getDate()}
                                            ({DAY_NAMES[getDateForDay(selectedDay).getDay()]})
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: '800', color: learnedForDay(selectedDay) === 10 ? '#10B981' : '#D4AF37' }}>
                                            {learnedForDay(selectedDay)}/10
                                        </span>
                                        <button onClick={() => { if (selectedDay > 1) { setSelectedDay(selectedDay - 1); setExpandedId(null); } }} disabled={selectedDay <= 1} style={{ border: '1px solid #E7E5E4', borderRadius: '6px', background: '#fff', padding: '4px 8px', cursor: selectedDay > 1 ? 'pointer' : 'not-allowed', color: selectedDay > 1 ? '#78716C' : '#D6D3D1', fontSize: '12px' }}>{'<'}</button>
                                        <button onClick={() => { if (selectedDay < TOTAL_DAYS) { setSelectedDay(selectedDay + 1); setExpandedId(null); } }} disabled={selectedDay >= TOTAL_DAYS} style={{ border: '1px solid #E7E5E4', borderRadius: '6px', background: '#fff', padding: '4px 8px', cursor: selectedDay < TOTAL_DAYS ? 'pointer' : 'not-allowed', color: selectedDay < TOTAL_DAYS ? '#78716C' : '#D6D3D1', fontSize: '12px' }}>{'>'}</button>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {dayEntries.map((entry, idx) => (
                                        <EntryCard
                                            key={entry.id}
                                            entry={entry}
                                            index={(selectedDay - 1) * 10 + idx + 1}
                                            isExpanded={expandedId === entry.id}
                                            isLearned={learned.has(entry.id)}
                                            isSpeaking={speakingId === entry.id}
                                            isMobile={isMobile}
                                            isRegistered={registeredPhrases.has(entry.expression.toLowerCase())}
                                            isRegistering={registeringId === entry.id}
                                            registeredPhrases={registeredPhrases}
                                            registeringId={registeringId}
                                            onToggleExpand={() => setExpandedId(prev => prev === entry.id ? null : entry.id)}
                                            onToggleLearned={() => toggleLearned(entry.id)}
                                            onSpeak={handleSpeak}
                                            onOpenPP={() => openPP(entry.id, entry.expression)}
                                            onRegister={() => registerToTraining(entry.expression, entry.meaning)}
                                            onRegisterExample={(english) => registerToTraining(english, '')}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#A8A29E', fontSize: '14px' }}>
                                Select a day to view expressions
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ===== LIST VIEW ===== */}
            {viewMode === 'list' && (
                <div style={{ flex: 1, maxWidth: '900px', margin: '0 auto', width: '100%', padding: isMobile ? '16px' : '24px 32px' }}>
                    <input type="text" placeholder="Search expressions..." value={search} onChange={e => setSearch(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', fontSize: '14px', border: '1px solid #E7E5E4', borderRadius: '10px', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box', marginBottom: '16px' }} />
                    <div style={{ fontSize: '12px', color: '#A8A29E', marginBottom: '12px' }}>{filteredAll.length} expressions</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {filteredAll.map((entry) => (
                            <EntryCard
                                key={entry.id}
                                entry={entry}
                                index={NATIVE_1000.indexOf(entry) + 1}
                                isExpanded={expandedId === entry.id}
                                isLearned={learned.has(entry.id)}
                                isSpeaking={speakingId === entry.id}
                                isMobile={isMobile}
                                isRegistered={registeredPhrases.has(entry.expression.toLowerCase())}
                                isRegistering={registeringId === entry.expression}
                                registeredPhrases={registeredPhrases}
                                registeringId={registeringId}
                                onToggleExpand={() => setExpandedId(prev => prev === entry.id ? null : entry.id)}
                                onToggleLearned={() => toggleLearned(entry.id)}
                                onSpeak={handleSpeak}
                                onOpenPP={() => openPP(entry.id, entry.expression)}
                                onRegister={() => registerToTraining(entry.expression, entry.meaning)}
                                onRegisterExample={(english: string) => registerToTraining(english, '')}
                            />
                        ))}
                    </div>
                </div>
            )}

            {ppWordPicker && (
                <PPPopup state={ppWordPicker} onToggle={toggleWord} onClose={closePP} onSearch={ppSearch} />
            )}
        </div>
    );
}

// ===== ENTRY CARD =====
function EntryCard({ entry, index, isExpanded, isLearned, isSpeaking, isMobile, isRegistered, isRegistering, registeredPhrases, registeringId, onToggleExpand, onToggleLearned, onSpeak, onOpenPP, onRegister, onRegisterExample }: {
    entry: NativeEntry; index: number;
    isExpanded: boolean; isLearned: boolean; isSpeaking: boolean; isMobile: boolean;
    isRegistered: boolean; isRegistering: boolean;
    registeredPhrases: Set<string>; registeringId: string | null;
    onToggleExpand: () => void; onToggleLearned: () => void;
    onSpeak: (id: string, text: string) => void; onOpenPP: () => void;
    onRegister: () => void; onRegisterExample: (english: string) => void;
}) {
    const catMeta = CATEGORY_META[entry.category];
    const lvlMeta = LEVEL_META[entry.level];

    return (
        <div onClick={onToggleExpand} style={{
            backgroundColor: '#FFFFFF', border: '1px solid',
            borderColor: isLearned ? '#D4AF3740' : '#E7E5E4',
            borderRadius: '14px', padding: isMobile ? '14px 16px' : '16px 20px',
            cursor: 'pointer', transition: 'all 0.15s ease',
            borderLeft: isLearned ? '3px solid #D4AF37' : '3px solid transparent',
        }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#D6D3D1', minWidth: '24px', paddingTop: '3px' }}>{index}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: '700', color: '#1C1917', letterSpacing: '-0.3px' }}>{entry.expression}</span>
                        <span style={{ fontSize: '10px', fontWeight: '600', color: catMeta.color, backgroundColor: catMeta.bg, padding: '2px 8px', borderRadius: '4px' }}>{catMeta.labelEn}</span>
                        <span style={{ fontSize: '10px', fontWeight: '600', color: lvlMeta.color, backgroundColor: lvlMeta.bg, padding: '2px 8px', borderRadius: '4px' }}>Lv.{entry.level}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#78716C', marginTop: '4px' }}>{entry.meaning}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                    {/* Play (auto-checks learned) */}
                    <button onClick={e => { e.stopPropagation(); onSpeak(entry.id, entry.expression); }} style={{
                        width: '30px', height: '30px', borderRadius: '8px', border: '1px solid #E7E5E4',
                        backgroundColor: isSpeaking ? '#FEF9E7' : '#FAFAF9', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '14px', color: isSpeaking ? '#D4AF37' : '#A8A29E',
                    }}>
                        {isSpeaking ? '...' : '\u25B6'}
                    </button>
                    <PPButton onClick={onOpenPP} style={{ height: '30px' }} />
                    {/* Register to Training */}
                    <button onClick={e => { e.stopPropagation(); onRegister(); }} disabled={isRegistered || isRegistering}
                        title={isRegistered ? 'Registered' : 'Register to Training'}
                        style={{
                            width: '30px', height: '30px', borderRadius: '8px',
                            border: '1px solid', borderColor: isRegistered ? '#10B981' : '#E7E5E4',
                            backgroundColor: isRegistered ? '#ECFDF5' : isRegistering ? '#FFFBEB' : '#FAFAF9',
                            cursor: isRegistered ? 'default' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '10px', fontWeight: '700',
                            color: isRegistered ? '#10B981' : '#A8A29E',
                        }}>
                        {isRegistered ? 'T' : isRegistering ? '...' : '+T'}
                    </button>
                    {/* Learned toggle */}
                    <button onClick={e => { e.stopPropagation(); onToggleLearned(); }} style={{
                        width: '30px', height: '30px', borderRadius: '8px',
                        border: '1px solid', borderColor: isLearned ? '#D4AF37' : '#E7E5E4',
                        backgroundColor: isLearned ? '#FEF9E7' : '#FAFAF9', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '14px', fontWeight: '700', color: isLearned ? '#D4AF37' : '#D6D3D1',
                    }}>
                        {isLearned ? '\u2713' : '\u2013'}
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #F5F5F4' }}>
                    <div style={{ marginBottom: '14px' }}>
                        <div style={{ fontSize: '11px', fontWeight: '700', color: '#D4AF37', letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: '6px' }}>WHY</div>
                        <div style={{ fontSize: '14px', color: '#44403C', lineHeight: '1.7', backgroundColor: '#FAFAF9', padding: '12px 14px', borderRadius: '10px', border: '1px solid #F5F5F4' }}>{entry.why}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: '700', color: '#10B981', letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: '6px' }}>EXAMPLE</div>
                        <div style={{ backgroundColor: '#FAFAF9', borderRadius: '10px', border: '1px solid #F5F5F4', padding: '12px 14px' }}>
                            <div style={{ fontSize: '13px', color: '#57534E', lineHeight: '1.6', marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontWeight: '700', color: '#78716C', marginRight: '6px' }}>A:</span>{entry.example.a}
                                </div>
                                {(() => { const regA = registeredPhrases.has(entry.example.a.toLowerCase()); const ingA = registeringId === entry.example.a; return (
                                    <button onClick={e => { e.stopPropagation(); onRegisterExample(entry.example.a); }} disabled={regA || ingA}
                                        title={regA ? 'Registered' : 'Register example to Training'}
                                        style={{
                                            flexShrink: 0, width: '26px', height: '26px', borderRadius: '6px',
                                            border: '1px solid', borderColor: regA ? '#10B981' : '#E7E5E4',
                                            backgroundColor: regA ? '#ECFDF5' : ingA ? '#FFFBEB' : '#fff',
                                            cursor: regA ? 'default' : 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '9px', fontWeight: '700', color: regA ? '#10B981' : '#A8A29E',
                                        }}>
                                        {regA ? 'T' : ingA ? '..' : '+T'}
                                    </button>
                                ); })()}
                            </div>
                            <div style={{ fontSize: '13px', color: '#1C1917', lineHeight: '1.6', fontWeight: '500', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontWeight: '700', color: '#D4AF37', marginRight: '6px' }}>B:</span>{entry.example.b}
                                </div>
                                {(() => { const regB = registeredPhrases.has(entry.example.b.toLowerCase()); const ingB = registeringId === entry.example.b; return (
                                    <button onClick={e => { e.stopPropagation(); onRegisterExample(entry.example.b); }} disabled={regB || ingB}
                                        title={regB ? 'Registered' : 'Register example to Training'}
                                        style={{
                                            flexShrink: 0, width: '26px', height: '26px', borderRadius: '6px',
                                            border: '1px solid', borderColor: regB ? '#10B981' : '#E7E5E4',
                                            backgroundColor: regB ? '#ECFDF5' : ingB ? '#FFFBEB' : '#fff',
                                            cursor: regB ? 'default' : 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '9px', fontWeight: '700', color: regB ? '#10B981' : '#A8A29E',
                                        }}>
                                        {regB ? 'T' : ingB ? '..' : '+T'}
                                    </button>
                                ); })()}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                            <button onClick={e => { e.stopPropagation(); onSpeak(entry.id, `${entry.example.a} ... ${entry.example.b}`); }}
                                style={{ padding: '6px 14px', fontSize: '12px', fontWeight: '600', color: '#78716C', backgroundColor: 'transparent', border: '1px solid #E7E5E4', borderRadius: '8px', cursor: 'pointer' }}>
                                Listen to dialogue
                            </button>
                            {!isRegistered && (
                                <button onClick={e => { e.stopPropagation(); onRegister(); }} disabled={isRegistering}
                                    style={{ padding: '6px 14px', fontSize: '12px', fontWeight: '600', color: '#10B981', backgroundColor: '#ECFDF5', border: '1px solid #10B98140', borderRadius: '8px', cursor: 'pointer' }}>
                                    {isRegistering ? '...' : 'Training'}
                                </button>
                            )}
                        </div>
                    </div>
                    {entry.note && (
                        <div style={{ marginTop: '12px', fontSize: '12px', color: '#A8A29E', fontStyle: 'italic' }}>{entry.note}</div>
                    )}
                </div>
            )}
        </div>
    );
}
