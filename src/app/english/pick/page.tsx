'use client';

import { useState, useMemo, useCallback } from 'react';
import { PPButton, PPPopup, usePPWordPicker } from '@/components/english/PPWordPicker';
import {
    CLAUDE_PICK_SEEDS,
    CLAUDE_PICK_SOURCE_BY_DATE,
    type PodcastEntry,
    type PodcastSource,
} from '@/data/english/claude-pick-seed';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ACCENT = '#D4AF37';
const EMERALD = '#10B981';

function speakText(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
}

function parseLines(text: string): string[] {
    return text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
}

function extractSpoken(line: string): string {
    const m = line.match(/^[^:"]+:\s*(.+)$/);
    const inner = m ? m[1] : line;
    return inner.trim().replace(/^["“]/, '').replace(/["”]$/, '').trim();
}

function jstToday(): string {
    const now = new Date();
    const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    return jst.toISOString().slice(0, 10);
}

function buildCalendarGrid(year: number, month: number): (number | null)[] {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const grid: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) grid.push(null);
    for (let d = 1; d <= daysInMonth; d++) grid.push(d);
    while (grid.length % 7 !== 0) grid.push(null);
    return grid;
}

function dateKey(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function buildMonthKey(year: number, month: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}`;
}

function rankBadge(rank: 'S' | 'A' | 'B' | 'C'): { color: string; bg: string } {
    if (rank === 'S') return { color: '#92400E', bg: '#FEF3C7' };
    if (rank === 'A') return { color: '#065F46', bg: '#D1FAE5' };
    if (rank === 'B') return { color: '#1E40AF', bg: '#DBEAFE' };
    return { color: '#78716C', bg: '#F5F5F4' };
}

interface DisplayEntry extends PodcastEntry {
    id: string;
}

export default function ClaudePickPage() {
    const today = jstToday();
    const [yy, mm, dd] = today.split('-').map(Number);
    const [viewYear, setViewYear] = useState(yy);
    const [viewMonth, setViewMonth] = useState(mm - 1);
    const [selectedDay, setSelectedDay] = useState<number | null>(dd);
    const [registered, setRegistered] = useState<Set<string>>(() => {
        if (typeof window === 'undefined') return new Set();
        try {
            const s = localStorage.getItem('pick-registered');
            return s ? new Set<string>(JSON.parse(s)) : new Set<string>();
        } catch { return new Set<string>(); }
    });
    const [registeringId, setRegisteringId] = useState<string | null>(null);
    const [registeredLines, setRegisteredLines] = useState<Set<string>>(() => {
        if (typeof window === 'undefined') return new Set();
        try {
            const s = localStorage.getItem('pick-registered-lines');
            return s ? new Set<string>(JSON.parse(s)) : new Set<string>();
        } catch { return new Set<string>(); }
    });
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const [bulkRegisteringId, setBulkRegisteringId] = useState<string | null>(null);

    const { ppWordPicker, openPP, toggleWord, closePP, search } = usePPWordPicker();

    // Group entries by month
    const entriesByMonth = useMemo(() => {
        const map = new Map<string, DisplayEntry[]>();
        for (const seed of CLAUDE_PICK_SEEDS) {
            const monthKey = seed.month || '2026-05';
            if (!map.has(monthKey)) map.set(monthKey, []);
            const list = map.get(monthKey)!;
            const idx = list.filter(e => e.daySlot === seed.daySlot).length;
            list.push({
                ...seed,
                id: `pick_${monthKey}_${String(seed.daySlot).padStart(2, '0')}_${idx}`,
            });
        }
        return map;
    }, []);

    const monthEntries = useMemo(() => {
        return entriesByMonth.get(buildMonthKey(viewYear, viewMonth)) || [];
    }, [entriesByMonth, viewYear, viewMonth]);

    const entriesByDay = useMemo(() => {
        const map = new Map<number, DisplayEntry[]>();
        for (const e of monthEntries) {
            if (!map.has(e.daySlot)) map.set(e.daySlot, []);
            map.get(e.daySlot)!.push(e);
        }
        return map;
    }, [monthEntries]);

    const grid = useMemo(() => buildCalendarGrid(viewYear, viewMonth), [viewYear, viewMonth]);

    const selectedDateKey = selectedDay ? dateKey(viewYear, viewMonth, selectedDay) : null;
    const selectedSource: PodcastSource | null = selectedDateKey
        ? (CLAUDE_PICK_SOURCE_BY_DATE[selectedDateKey] || null)
        : null;
    const selectedEntries = selectedDay ? (entriesByDay.get(selectedDay) || []) : [];

    const seededDays = entriesByDay.size;

    const prevMonth = () => {
        if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
        else setViewMonth(m => m - 1);
        setSelectedDay(null);
    };
    const nextMonth = () => {
        if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
        else setViewMonth(m => m + 1);
        setSelectedDay(null);
    };

    const handleRegister = useCallback(async (entry: DisplayEntry) => {
        setRegisteringId(entry.id);
        try {
            const dateStr = `${buildMonthKey(viewYear, viewMonth)}-${String(entry.daySlot).padStart(2, '0')}`;
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english: entry.expression,
                    japanese: entry.note,
                    category: 'pick',
                    date: dateStr,
                }),
            });
            if (res.ok) {
                setRegistered(prev => {
                    const next = new Set(prev).add(entry.id);
                    try { localStorage.setItem('pick-registered', JSON.stringify([...next])); } catch {}
                    return next;
                });
            }
        } catch {} finally {
            setRegisteringId(null);
        }
    }, [viewYear, viewMonth]);

    const toggleItem = useCallback((fullKey: string) => {
        setSelectedItems(prev => {
            const next = new Set(prev);
            if (next.has(fullKey)) next.delete(fullKey);
            else next.add(fullKey);
            return next;
        });
    }, []);

    const handleBulkRegister = useCallback(async (
        entry: DisplayEntry,
        items: { fullKey: string; text: string }[],
    ) => {
        if (items.length === 0) return;
        setBulkRegisteringId(entry.id);
        try {
            const dateStr = `${buildMonthKey(viewYear, viewMonth)}-${String(entry.daySlot).padStart(2, '0')}`;
            const englishContent = items.map(it => it.text).join('\n');
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english: englishContent,
                    japanese: entry.note,
                    category: 'pick',
                    date: dateStr,
                }),
            });
            if (res.ok) {
                setRegisteredLines(prev => {
                    const next = new Set(prev);
                    items.forEach(it => next.add(it.fullKey));
                    try { localStorage.setItem('pick-registered-lines', JSON.stringify([...next])); } catch {}
                    return next;
                });
                setSelectedItems(prev => {
                    const next = new Set(prev);
                    items.forEach(it => next.delete(it.fullKey));
                    return next;
                });
            }
        } catch {} finally {
            setBulkRegisteringId(null);
        }
    }, [viewYear, viewMonth]);

    function EntryCard({ entry, index }: { entry: DisplayEntry; index: number }) {
        const rank = rankBadge(entry.rank);
        const isBulkReging = bulkRegisteringId === entry.id;

        const exprFullKey = `${entry.id}::expr`;
        const lineRows = [
            ...parseLines(entry.contextBefore).map((line, i) => ({ section: 'b', idx: i, line, italic: true, color: '#A8A29E', weight: '400' })),
            ...parseLines(entry.target).map((line, i) => ({ section: 't', idx: i, line, italic: false, color: '#1C1917', weight: '600' })),
            ...parseLines(entry.contextAfter).map((line, i) => ({ section: 'a', idx: i, line, italic: true, color: '#A8A29E', weight: '400' })),
        ];

        const itemsToRegister: { fullKey: string; text: string }[] = [];
        if (selectedItems.has(exprFullKey) && !registeredLines.has(exprFullKey)) {
            itemsToRegister.push({ fullKey: exprFullKey, text: entry.expression });
        }
        for (const row of lineRows) {
            const fullKey = `${entry.id}::${row.section}:${row.idx}`;
            if (selectedItems.has(fullKey) && !registeredLines.has(fullKey)) {
                itemsToRegister.push({ fullKey, text: row.line });
            }
        }
        const selectedCount = itemsToRegister.length;

        const exprIsReg = registeredLines.has(exprFullKey);
        const exprIsSel = selectedItems.has(exprFullKey);

        const togglerStyle = (isReg: boolean, isSel: boolean) => ({
            width: '22px', height: '22px', borderRadius: '5px',
            border: `1px solid ${isReg ? '#D4AF37' : isSel ? '#D4AF37' : '#D6D3D1'}`,
            backgroundColor: isReg ? '#FDE68A' : isSel ? '#FEF3C7' : '#fff',
            color: isReg ? '#92400E' : isSel ? '#92400E' : '#A8A29E',
            fontSize: '12px', fontWeight: '700',
            cursor: isReg ? 'default' : 'pointer',
            flexShrink: 0, padding: 0, lineHeight: 1,
        });

        return (
            <div style={{
                backgroundColor: '#fff',
                borderRadius: '14px',
                border: '1px solid #E7E5E4',
                padding: '18px 20px',
            }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                    <span style={{
                        fontSize: '11px', fontWeight: '700', color: '#A8A29E',
                        width: '20px', textAlign: 'right', flexShrink: 0, paddingTop: '4px',
                    }}>
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                        backgroundColor: rank.bg, color: rank.color,
                        fontSize: '12px', fontWeight: '800',
                    }}>
                        {entry.rank}
                    </span>
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                            onClick={() => !exprIsReg && toggleItem(exprFullKey)}
                            disabled={exprIsReg}
                            title={exprIsReg ? 'Added to training' : exprIsSel ? 'Selected — click to unselect' : 'Select expression for training'}
                            style={{ ...togglerStyle(exprIsReg, exprIsSel), marginTop: '4px' }}
                        >
                            {exprIsReg ? '✓' : exprIsSel ? '✓' : '+'}
                        </button>
                        <div style={{
                            fontSize: '18px', fontWeight: '700', color: '#1C1917',
                            lineHeight: 1.4, letterSpacing: '-0.01em',
                        }}>
                            &ldquo;{entry.expression}&rdquo;
                        </div>
                    </div>
                </div>

                {/* Surrounding context with per-line + buttons */}
                <div style={{
                    margin: '8px 0 12px 30px',
                    padding: '12px 16px',
                    backgroundColor: '#FAFAF9',
                    borderRadius: '10px',
                    borderLeft: '3px solid #D6D3D1',
                    fontSize: '13px',
                    lineHeight: 1.7,
                }}>
                    {lineRows.map(({ section, idx, line, italic, color, weight }) => {
                        const fullKey = `${entry.id}::${section}:${idx}`;
                        const isLineReg = registeredLines.has(fullKey);
                        const isLineSel = selectedItems.has(fullKey);
                        return (
                            <div
                                key={fullKey}
                                style={{
                                    display: 'flex', alignItems: 'flex-start', gap: '8px',
                                    margin: '3px 0',
                                }}
                            >
                                <button
                                    onClick={() => !isLineReg && toggleItem(fullKey)}
                                    disabled={isLineReg}
                                    title={isLineReg ? 'Added to training' : isLineSel ? 'Selected — click to unselect' : 'Select line for training'}
                                    style={{ ...togglerStyle(isLineReg, isLineSel), marginTop: '2px' }}
                                >
                                    {isLineReg ? '✓' : isLineSel ? '✓' : '+'}
                                </button>
                                <span
                                    style={{
                                        flex: 1, color, fontWeight: weight,
                                        fontStyle: italic ? 'italic' : 'normal',
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    {line}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* とにお note */}
                <div style={{
                    fontSize: '13px', color: '#44403C',
                    margin: '0 0 12px 30px', padding: '10px 14px',
                    backgroundColor: '#FFFBEB', borderRadius: '8px',
                    borderLeft: `3px solid ${ACCENT}`, lineHeight: 1.7,
                }}>
                    {entry.note}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginLeft: '30px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => speakText(entry.target)}
                        style={{
                            width: '34px', height: '34px', borderRadius: '8px',
                            border: '1px solid #E7E5E4', backgroundColor: '#fff',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                        title="Play target sentence"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#78716C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                    </button>
                    <PPButton onClick={() => openPP(entry.id, entry.expression)} />
                    <button
                        onClick={() => selectedCount > 0 && !isBulkReging && handleBulkRegister(entry, itemsToRegister)}
                        disabled={selectedCount === 0 || isBulkReging}
                        style={{
                            padding: '7px 14px', borderRadius: '8px', border: 'none',
                            backgroundColor: selectedCount > 0 ? ACCENT : '#E7E5E4',
                            color: selectedCount > 0 ? '#fff' : '#A8A29E',
                            fontSize: '12px', fontWeight: '600',
                            cursor: selectedCount > 0 && !isBulkReging ? 'pointer' : 'default',
                            opacity: isBulkReging ? 0.6 : 1,
                        }}
                    >
                        {isBulkReging
                            ? '...'
                            : selectedCount > 0
                                ? `+ Register Selected (${selectedCount})`
                                : '+ Register Selected'}
                    </button>
                </div>
            </div>
        );
    }

    function SourceHeader({ source, count }: { source: PodcastSource; count: number }) {
        return (
            <div style={{
                backgroundColor: '#fff', borderRadius: '16px',
                border: '1px solid #E7E5E4', padding: '24px',
                marginBottom: '16px',
                background: 'linear-gradient(135deg, #FFFBEB 0%, #fff 50%)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <span style={{
                        fontSize: '11px', fontWeight: '700', color: ACCENT,
                        padding: '3px 10px', borderRadius: '6px', backgroundColor: '#FEF3C7',
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>
                        Claude&apos;s Pick
                    </span>
                    <span style={{ fontSize: '12px', color: '#78716C', fontWeight: '600' }}>
                        {source.show}
                    </span>
                </div>
                <h2 style={{
                    fontSize: '22px', fontWeight: '800', color: '#1C1917',
                    margin: '4px 0 8px', letterSpacing: '-0.02em', lineHeight: 1.3,
                }}>
                    {source.title}
                </h2>
                <p style={{
                    fontSize: '13px', color: '#57534E', margin: '0 0 12px',
                    lineHeight: 1.6,
                }}>
                    {source.tagline}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    {source.url && (
                        <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontSize: '12px', color: '#1E40AF', textDecoration: 'none',
                                padding: '5px 10px', borderRadius: '6px',
                                backgroundColor: '#EFF6FF', fontWeight: '600',
                            }}
                        >
                            Watch on YouTube &rarr;
                        </a>
                    )}
                    <span style={{ fontSize: '12px', color: '#A8A29E', fontWeight: '600' }}>
                        {count} EXPRESSIONS
                    </span>
                </div>
            </div>
        );
    }

    const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9', padding: '32px 24px 80px' }}>
            <div style={{ maxWidth: '920px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: '24px' }}>
                    <h1 style={{
                        fontSize: '28px', fontWeight: '800', color: '#1C1917',
                        letterSpacing: '-0.02em', margin: '0 0 6px',
                    }}>
                        Claude&apos;s Pick
                    </h1>
                    <p style={{ fontSize: '14px', color: '#78716C', margin: 0, lineHeight: 1.5 }}>
                        Claude が編集者として選ぶ、覚える価値のある native 表現 -- 1テーマ / 日、10連発
                    </p>
                    <p style={{ fontSize: '12px', color: '#A8A29E', margin: '4px 0 0' }}>
                        {seededDays} day(s) seeded this month -- {monthEntries.length} total expressions
                    </p>
                </div>

                {/* Month nav */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: '16px',
                }}>
                    <button onClick={prevMonth} style={{
                        padding: '8px 16px', borderRadius: '10px',
                        border: '1px solid #E7E5E4', backgroundColor: '#fff',
                        cursor: 'pointer', fontSize: '16px', color: '#57534E',
                    }}>&larr;</button>
                    <span style={{ fontSize: '18px', fontWeight: '700', color: '#1C1917' }}>
                        {monthLabel}
                    </span>
                    <button onClick={nextMonth} style={{
                        padding: '8px 16px', borderRadius: '10px',
                        border: '1px solid #E7E5E4', backgroundColor: '#fff',
                        cursor: 'pointer', fontSize: '16px', color: '#57534E',
                    }}>&rarr;</button>
                </div>

                {/* Weekday headers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '4px' }}>
                    {WEEKDAYS.map(d => (
                        <div key={d} style={{
                            textAlign: 'center', fontSize: '11px', fontWeight: '600',
                            color: '#A8A29E', padding: '6px 0',
                            textTransform: 'uppercase', letterSpacing: '0.05em',
                        }}>
                            {d}
                        </div>
                    ))}
                </div>

                {/* Calendar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '24px' }}>
                    {grid.map((day, i) => {
                        if (day === null) return <div key={`e${i}`} />;
                        const dk = dateKey(viewYear, viewMonth, day);
                        const dayEntries = entriesByDay.get(day) || [];
                        const hasData = dayEntries.length > 0;
                        const isSelected = selectedDay === day;
                        const isToday = dk === today;
                        const source = CLAUDE_PICK_SOURCE_BY_DATE[dk];

                        return (
                            <button
                                key={`d${day}`}
                                onClick={() => setSelectedDay(day)}
                                style={{
                                    minHeight: '72px',
                                    borderRadius: '10px',
                                    border: isSelected
                                        ? `2px solid ${ACCENT}`
                                        : isToday
                                            ? `2px solid ${EMERALD}`
                                            : '1px solid #E7E5E4',
                                    backgroundColor: isSelected
                                        ? '#FFFBEB'
                                        : hasData
                                            ? '#fff'
                                            : '#F5F5F4',
                                    cursor: 'pointer',
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'flex-start',
                                    gap: '3px', padding: '6px 3px', textAlign: 'center',
                                    opacity: hasData ? 1 : 0.55,
                                    transition: 'all 0.15s',
                                }}
                            >
                                <span style={{
                                    fontSize: '12px',
                                    fontWeight: isSelected || isToday ? '800' : '600',
                                    color: isSelected ? '#B45309' : isToday ? '#059669' : '#78716C',
                                }}>
                                    {day}
                                </span>
                                {source && (
                                    <span style={{
                                        fontSize: '8px', fontWeight: '700',
                                        color: '#78716C', letterSpacing: '0.04em',
                                    }}>
                                        {source.show.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()}
                                    </span>
                                )}
                                {hasData && (
                                    <span style={{
                                        fontSize: '9px', fontWeight: '700',
                                        color: ACCENT,
                                    }}>
                                        {dayEntries.length}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Detail */}
                {selectedDay && (
                    <div>
                        {selectedSource && (
                            <SourceHeader source={selectedSource} count={selectedEntries.length} />
                        )}
                        {!selectedSource && (
                            <h2 style={{
                                fontSize: '16px', fontWeight: '700', color: '#1C1917',
                                margin: '0 0 12px',
                            }}>
                                {viewYear}/{viewMonth + 1}/{selectedDay}
                            </h2>
                        )}
                        {selectedEntries.length === 0 ? (
                            <div style={{
                                padding: '40px', textAlign: 'center',
                                backgroundColor: '#fff', borderRadius: '14px',
                                border: '1px solid #E7E5E4',
                            }}>
                                <p style={{ color: '#A8A29E', fontSize: '14px', margin: 0 }}>
                                    No episode harvested yet
                                </p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {selectedEntries.map((entry, idx) => (
                                    <EntryCard key={entry.id} entry={entry} index={idx} />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {ppWordPicker && (
                <PPPopup state={ppWordPicker} onToggle={toggleWord} onClose={closePP} onSearch={search} />
            )}
        </div>
    );
}
