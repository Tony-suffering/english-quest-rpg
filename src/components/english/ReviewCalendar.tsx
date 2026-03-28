'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';

// --- Types ---

export interface CalendarEntry {
    id: string;
    day_slot: number;
    japanese: string;
    category: string;
}

export interface CategoryColor {
    fg: string;
    bg: string;
}

export interface ReviewCalendarProps {
    title: string;
    subtitle: string;
    accent: string;
    accentBg: string;
    entries: CalendarEntry[];
    categoryColors: Record<string, CategoryColor>;
    selectedDay: number | null;
    onSelectDay: (day: number) => void;
    viewYear: number;
    viewMonth: number;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onGoToday: () => void;
    storagePrefix: string;
    playedIds: Set<string>;
    masteredIds?: Set<string>;
    isMobile: boolean;
    headerRight?: React.ReactNode;
    checkinDays?: Set<number>;
}

// --- Helpers ---

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
}

function buildReviewKey(prefix: string, year: number, month: number): string {
    return `${prefix}-reviewed-${year}-${String(month + 1).padStart(2, '0')}`;
}

function loadReviewed(key: string): Set<number> {
    try {
        const saved = localStorage.getItem(key);
        return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
}

function saveReviewed(key: string, days: Set<number>) {
    try { localStorage.setItem(key, JSON.stringify([...days])); } catch { /* ignore */ }
}

// --- Component ---

export default function ReviewCalendar({
    title,
    subtitle,
    accent,
    accentBg,
    entries,
    selectedDay,
    onSelectDay,
    viewYear,
    viewMonth,
    onPrevMonth,
    onNextMonth,
    onGoToday,
    storagePrefix,
    playedIds,
    masteredIds,
    isMobile,
    headerRight,
    checkinDays,
}: ReviewCalendarProps) {
    const now = new Date();
    const todayDate = now.getDate();
    const todayMonth = now.getMonth();
    const todayYear = now.getFullYear();
    const isCurrentMonth = viewYear === todayYear && viewMonth === todayMonth;

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

    const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString('ja-JP', {
        year: 'numeric', month: 'long',
    });

    const reviewKey = buildReviewKey(storagePrefix, viewYear, viewMonth);
    const [reviewedDays, setReviewedDays] = useState<Set<number>>(() => loadReviewed(reviewKey));
    const [prevReviewKey, setPrevReviewKey] = useState(reviewKey);
    const [toastVisible, setToastVisible] = useState(false);

    if (prevReviewKey !== reviewKey) {
        setPrevReviewKey(reviewKey);
        setReviewedDays(loadReviewed(reviewKey));
    }

    // Auto-complete when all entries mastered
    useEffect(() => {
        if (!selectedDay) return;
        const dayEntries = byDay[selectedDay] || [];
        if (dayEntries.length === 0) return;
        const source = masteredIds || playedIds;
        const allDone = dayEntries.every(e => source.has(e.id));
        if (allDone && !reviewedDays.has(selectedDay)) {
            const next = new Set(reviewedDays);
            next.add(selectedDay);
            setReviewedDays(next);
            saveReviewed(reviewKey, next);
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 2500);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playedIds, masteredIds, selectedDay]);

    const toggleReviewed = useCallback((day: number) => {
        setReviewedDays(prev => {
            const next = new Set(prev);
            if (next.has(day)) next.delete(day);
            else next.add(day);
            saveReviewed(reviewKey, next);
            return next;
        });
    }, [reviewKey]);

    const byDay = useMemo(() => {
        const map: Record<number, CalendarEntry[]> = {};
        entries.forEach(e => {
            if (!map[e.day_slot]) map[e.day_slot] = [];
            map[e.day_slot].push(e);
        });
        return map;
    }, [entries]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedDay) return;
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                for (let d = selectedDay - 1; d >= 1; d--) {
                    if (byDay[d]?.length) { onSelectDay(d); return; }
                }
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                for (let d = selectedDay + 1; d <= daysInMonth; d++) {
                    if (byDay[d]?.length) { onSelectDay(d); return; }
                }
            } else if (e.key === ' ') {
                e.preventDefault();
                toggleReviewed(selectedDay);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedDay, byDay, daysInMonth, onSelectDay, toggleReviewed]);

    // Calendar cells
    const calendarCells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) calendarCells.push(null);
    for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);
    while (calendarCells.length % 7 !== 0) calendarCells.push(null);

    return (
        <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            minWidth: 0,
            padding: isMobile ? '16px 12px' : '20px 24px',
            position: 'relative',
        }}>
            {/* Toast */}
            {toastVisible && (
                <div style={{
                    position: 'fixed', top: '20px', left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: accent, color: '#fff',
                    padding: '10px 24px', borderRadius: '10px',
                    fontSize: '13px', fontWeight: '700', zIndex: 1000,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                    animation: 'toastSlide 0.3s ease-out',
                }}>
                    Complete!
                </div>
            )}

            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', marginBottom: '16px',
                }}>
                    <div>
                        <h1 style={{
                            fontSize: '18px', fontWeight: '900', color: '#1C1917',
                            margin: 0, letterSpacing: '-0.3px', lineHeight: 1.2,
                        }}>
                            {title}
                        </h1>
                        <p style={{
                            fontSize: '11px', color: '#A8A29E', margin: '4px 0 0 0',
                            letterSpacing: '0.3px',
                        }}>
                            {subtitle}
                        </p>
                    </div>
                    {headerRight}
                </div>

                {/* Month navigation */}
                <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '12px',
                    background: '#FAFAF9', borderRadius: '12px',
                    padding: '8px 4px',
                }}>
                    <button onClick={onPrevMonth} style={{
                        border: 'none', background: 'none', cursor: 'pointer',
                        fontSize: '20px', color: '#A8A29E', padding: '4px 10px', lineHeight: 1,
                        borderRadius: '8px', transition: 'background 0.15s',
                    }}>&#8249;</button>
                    <span style={{
                        fontSize: '14px', fontWeight: '700', color: '#44403C',
                        minWidth: '120px', textAlign: 'center',
                    }}>{monthLabel}</span>
                    <button onClick={onNextMonth} style={{
                        border: 'none', background: 'none', cursor: 'pointer',
                        fontSize: '20px', color: '#A8A29E', padding: '4px 10px', lineHeight: 1,
                        borderRadius: '8px', transition: 'background 0.15s',
                    }}>&#8250;</button>
                    {!isCurrentMonth && (
                        <button onClick={onGoToday} style={{
                            border: '1px solid #E7E5E4', borderRadius: '8px',
                            background: '#fff', cursor: 'pointer',
                            fontSize: '10px', color: '#78716C', padding: '5px 14px', fontWeight: '700',
                            transition: 'all 0.15s',
                        }}>Today</button>
                    )}
                </div>
            </div>

            {/* Weekday headers */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
                marginBottom: '6px',
            }}>
                {WEEKDAYS.map((d, idx) => (
                    <div key={d} style={{
                        textAlign: 'center', fontSize: '10px', fontWeight: '700',
                        color: idx === 0 ? '#EF444480' : idx === 6 ? '#3B82F680' : '#D6D3D1',
                        padding: '6px 0',
                        letterSpacing: '0.05em',
                    }}>
                        {d}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '4px',
            }}>
                {calendarCells.map((day, i) => {
                    if (day === null) {
                        return <div key={`empty-${i}`} />;
                    }

                    const dayEntries = byDay[day] || [];
                    const isToday = isCurrentMonth && day === todayDate;
                    const isSelected = day === selectedDay;
                    const count = dayEntries.length;
                    const dayOfWeek = (firstDay + day - 1) % 7;
                    const hasCheckin = checkinDays?.has(day);

                    // Mastery progress for this day
                    const source = masteredIds || playedIds;
                    const masteredCount = count > 0
                        ? dayEntries.filter(e => source.has(e.id)).length
                        : 0;
                    const progress = count > 0 ? masteredCount / count : 0;
                    const isComplete = progress === 1 && count > 0;
                    const hasProgress = progress > 0 && !isComplete;

                    // Soft, warm backgrounds -- celebrate what you did
                    const bgColor = count === 0
                        ? 'transparent'
                        : isSelected
                            ? accentBg
                            : isComplete
                                ? 'linear-gradient(135deg, #FEF3C7, #ECFDF5)'
                                : hasCheckin
                                    ? '#FEFCE8'
                                    : hasProgress
                                        ? '#FEFCF4'
                                        : '#FAFAF9';

                    const isGradient = typeof bgColor === 'string' && bgColor.startsWith('linear');

                    return (
                        <div
                            key={day}
                            onClick={() => { if (count > 0) onSelectDay(day); }}
                            style={{
                                borderRadius: '10px',
                                cursor: count > 0 ? 'pointer' : 'default',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '2px',
                                padding: isMobile ? '6px 2px' : '8px 4px',
                                background: isGradient ? bgColor : undefined,
                                backgroundColor: isGradient ? undefined : bgColor,
                                border: isSelected
                                    ? `2.5px solid ${accent}`
                                    : isToday
                                        ? `2.5px solid ${accent}`
                                        : isComplete
                                            ? `1.5px solid ${accent}50`
                                            : count > 0
                                                ? '1px solid #F5F5F4'
                                                : '1px solid transparent',
                                transition: 'all 0.2s ease',
                                position: 'relative',
                                boxShadow: isSelected
                                    ? `0 0 0 3px ${accent}20`
                                    : isComplete
                                        ? '0 1px 4px rgba(212,175,55,0.15)'
                                        : 'none',
                                animation: isToday && !hasCheckin && count > 0
                                    ? 'todayPulse 2.5s ease-in-out infinite' : undefined,
                            }}
                        >
                            {/* Day number */}
                            <span style={{
                                fontSize: isMobile ? '13px' : '14px',
                                fontWeight: isToday || isSelected ? '800' : count > 0 ? '600' : '400',
                                color: count === 0
                                    ? '#E7E5E4'
                                    : isSelected
                                        ? accent
                                        : isComplete
                                            ? '#92400E'
                                            : dayOfWeek === 0
                                                ? '#EF4444'
                                                : dayOfWeek === 6
                                                    ? '#3B82F6'
                                                    : '#57534E',
                                lineHeight: 1,
                            }}>
                                {day}
                            </span>

                            {/* Status indicator -- minimal, no pressure */}
                            {count > 0 && (
                                <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    height: 14,
                                }}>
                                    {isComplete ? (
                                        // Beautiful gold checkmark
                                        <span style={{
                                            fontSize: '11px', fontWeight: 900,
                                            color: accent,
                                            lineHeight: 1,
                                        }}>{'\u2713'}</span>
                                    ) : hasProgress ? (
                                        // Soft dots showing gentle progress (not numbers)
                                        <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                                            {Array.from({ length: Math.min(3, Math.ceil(progress * 3)) }).map((_, di) => (
                                                <div key={di} style={{
                                                    width: 4, height: 4, borderRadius: '50%',
                                                    backgroundColor: accent,
                                                    opacity: 0.5 + (di * 0.15),
                                                }} />
                                            ))}
                                        </div>
                                    ) : hasCheckin ? (
                                        // Checked in but no mastery yet -- gentle marker
                                        <div style={{
                                            width: 5, height: 5, borderRadius: '50%',
                                            backgroundColor: `${accent}60`,
                                        }} />
                                    ) : (
                                        // Has entries but untouched -- subtle circle
                                        <div style={{
                                            width: 5, height: 5, borderRadius: '50%',
                                            border: '1px solid #E7E5E4',
                                        }} />
                                    )}
                                </div>
                            )}

                            {/* Today label */}
                            {isToday && count > 0 && (
                                <span style={{
                                    position: 'absolute', bottom: isMobile ? 1 : 2,
                                    fontSize: '7px', fontWeight: 800,
                                    color: accent,
                                    letterSpacing: '0.05em',
                                }}>
                                    TODAY
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Keyboard hint */}
            {!isMobile && selectedDay && (
                <div style={{
                    marginTop: '10px', textAlign: 'center',
                    fontSize: '10px', color: '#E7E5E4', letterSpacing: '0.3px', flexShrink: 0,
                }}>
                    &#8592; &#8594; navigate &middot; space = toggle
                </div>
            )}

            <style>{`
                @keyframes toastSlide {
                    from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
                @keyframes todayPulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.3); }
                    50% { box-shadow: 0 0 0 4px rgba(212,175,55,0.12); }
                }
            `}</style>
        </div>
    );
}

export { buildReviewKey, loadReviewed, saveReviewed };
