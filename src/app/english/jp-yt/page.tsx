'use client';

import { useState, useMemo, useCallback } from 'react';
import { PPButton, PPPopup, usePPWordPicker } from '@/components/english/PPWordPicker';
import {
    JPYT_SEEDS,
    JPYT_SOURCE_BY_DATE,
    type JpYtEntry,
    type JpYtSource,
} from '@/data/english/jp-yt-seed';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ACCENT = '#0EA5E9'; // sky blue — distinguish from podcast (gold) and casual (emerald)
const ROSE = '#F472B6';

function speakText(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
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

interface DisplayEntry extends JpYtEntry {
    id: string;
}

export default function JpYtPage() {
    const today = jstToday();
    const [yy, mm, dd] = today.split('-').map(Number);
    const [viewYear, setViewYear] = useState(yy);
    const [viewMonth, setViewMonth] = useState(mm - 1);
    const [selectedDay, setSelectedDay] = useState<number | null>(dd);
    const [registered, setRegistered] = useState<Set<string>>(() => {
        if (typeof window === 'undefined') return new Set();
        try {
            const s = localStorage.getItem('jpyt-registered');
            return s ? new Set<string>(JSON.parse(s)) : new Set<string>();
        } catch { return new Set<string>(); }
    });
    const [registeringId, setRegisteringId] = useState<string | null>(null);

    const { ppWordPicker, openPP, toggleWord, closePP, search } = usePPWordPicker();

    const entriesByMonth = useMemo(() => {
        const map = new Map<string, DisplayEntry[]>();
        for (const seed of JPYT_SEEDS) {
            const monthKey = seed.month || '2026-05';
            if (!map.has(monthKey)) map.set(monthKey, []);
            const list = map.get(monthKey)!;
            const idx = list.filter(e => e.daySlot === seed.daySlot).length;
            list.push({
                ...seed,
                id: `jpyt_${monthKey}_${String(seed.daySlot).padStart(2, '0')}_${idx}`,
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
    const selectedSource: JpYtSource | null = selectedDateKey
        ? (JPYT_SOURCE_BY_DATE[selectedDateKey] || null)
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
                    english: entry.english,
                    japanese: entry.japanese,
                    category: 'jp-yt',
                    date: dateStr,
                }),
            });
            if (res.ok) {
                setRegistered(prev => {
                    const next = new Set(prev).add(entry.id);
                    try { localStorage.setItem('jpyt-registered', JSON.stringify([...next])); } catch {}
                    return next;
                });
            }
        } catch {} finally {
            setRegisteringId(null);
        }
    }, [viewYear, viewMonth]);

    function EntryCard({ entry, index }: { entry: DisplayEntry; index: number }) {
        const rank = rankBadge(entry.rank);
        const isReg = registered.has(entry.id);
        const isReging = registeringId === entry.id;

        return (
            <div style={{
                backgroundColor: '#fff',
                borderRadius: '14px',
                border: '1px solid #E7E5E4',
                padding: '18px 20px',
            }}>
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
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                            fontSize: '20px', fontWeight: '700', color: '#1C1917',
                            lineHeight: 1.3, letterSpacing: '-0.01em',
                        }}>
                            「{entry.japanese}」
                        </div>
                    </div>
                </div>

                {/* Japanese context (the scene) */}
                <div style={{
                    margin: '8px 0 12px 30px',
                    padding: '12px 16px',
                    backgroundColor: '#FAFAF9',
                    borderRadius: '10px',
                    borderLeft: '3px solid #D6D3D1',
                    fontSize: '13px',
                    lineHeight: 1.7,
                }}>
                    <div style={{ color: '#A8A29E', fontStyle: 'italic', marginBottom: '4px' }}>
                        {entry.contextBefore}
                    </div>
                    <div style={{ color: '#1C1917', fontWeight: '600' }}>
                        {entry.target}
                    </div>
                    <div style={{ color: '#A8A29E', fontStyle: 'italic', marginTop: '4px' }}>
                        {entry.contextAfter}
                    </div>
                </div>

                {/* Primary English translation */}
                <div style={{
                    margin: '0 0 8px 30px',
                    padding: '12px 16px',
                    backgroundColor: '#F0F9FF',
                    borderRadius: '10px',
                    borderLeft: `3px solid ${ACCENT}`,
                }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: ACCENT, marginBottom: '4px', letterSpacing: '0.04em' }}>
                        ENGLISH
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#1C1917', lineHeight: 1.5 }}>
                        &ldquo;{entry.english}&rdquo;
                    </div>
                    <button
                        onClick={() => speakText(entry.english)}
                        style={{
                            marginTop: '6px',
                            padding: '4px 10px', borderRadius: '6px',
                            border: '1px solid #BAE6FD', backgroundColor: '#fff',
                            cursor: 'pointer', fontSize: '11px', color: ACCENT,
                            fontWeight: '600',
                        }}
                    >
                        Play
                    </button>
                </div>

                {/* Alternative phrasings */}
                {entry.alternatives.length > 0 && (
                    <div style={{
                        margin: '0 0 12px 30px',
                        padding: '10px 14px',
                        backgroundColor: '#FAFAF9',
                        borderRadius: '8px',
                        border: '1px dashed #E7E5E4',
                    }}>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#A8A29E', marginBottom: '6px', letterSpacing: '0.04em' }}>
                            ALTERNATIVES
                        </div>
                        {entry.alternatives.map((alt, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                                <span style={{ fontSize: '13px', color: '#44403C', flex: 1 }}>
                                    &ldquo;{alt}&rdquo;
                                </span>
                                <button
                                    onClick={() => speakText(alt)}
                                    style={{
                                        padding: '2px 8px', borderRadius: '5px',
                                        border: '1px solid #E7E5E4', backgroundColor: '#fff',
                                        cursor: 'pointer', fontSize: '10px', color: '#78716C',
                                    }}
                                >
                                    play
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* とにお note */}
                <div style={{
                    fontSize: '13px', color: '#44403C',
                    margin: '0 0 12px 30px', padding: '10px 14px',
                    backgroundColor: '#FDF2F8', borderRadius: '8px',
                    borderLeft: `3px solid ${ROSE}`, lineHeight: 1.7,
                }}>
                    {entry.note}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginLeft: '30px', flexWrap: 'wrap' }}>
                    <PPButton onClick={() => openPP(entry.id, entry.english)} />
                    <button
                        onClick={() => !isReg && !isReging && handleRegister(entry)}
                        disabled={isReg || isReging}
                        style={{
                            padding: '7px 14px', borderRadius: '8px', border: 'none',
                            backgroundColor: isReg ? '#D1FAE5' : ACCENT,
                            color: isReg ? '#065F46' : '#fff',
                            fontSize: '12px', fontWeight: '600',
                            cursor: isReg ? 'default' : 'pointer',
                            opacity: isReging ? 0.6 : 1,
                        }}
                    >
                        {isReging ? '...' : isReg ? 'Added' : '+ Training'}
                    </button>
                </div>
            </div>
        );
    }

    function SourceHeader({ source, count }: { source: JpYtSource; count: number }) {
        return (
            <div style={{
                backgroundColor: '#fff', borderRadius: '16px',
                border: '1px solid #E7E5E4', padding: '24px',
                marginBottom: '16px',
                background: 'linear-gradient(135deg, #F0F9FF 0%, #fff 50%)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    <span style={{
                        fontSize: '11px', fontWeight: '700', color: ACCENT,
                        padding: '3px 10px', borderRadius: '6px', backgroundColor: '#E0F2FE',
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>
                        罪悪感ゼロ
                    </span>
                    <span style={{ fontSize: '12px', color: '#78716C', fontWeight: '600' }}>
                        {source.creator}
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
                <div style={{ marginBottom: '24px' }}>
                    <h1 style={{
                        fontSize: '28px', fontWeight: '800', color: '#1C1917',
                        letterSpacing: '-0.02em', margin: '0 0 6px',
                    }}>
                        罪悪感ゼロ英語
                    </h1>
                    <p style={{ fontSize: '14px', color: '#78716C', margin: 0, lineHeight: 1.5 }}>
                        日本語YouTube → 英語 -- 観た動画の日本語フレーズを「ネイティブが言う英語」に変換
                    </p>
                    <p style={{ fontSize: '12px', color: '#A8A29E', margin: '4px 0 0' }}>
                        {seededDays} day(s) seeded this month -- {monthEntries.length} total expressions
                    </p>
                </div>

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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '24px' }}>
                    {grid.map((day, i) => {
                        if (day === null) return <div key={`e${i}`} />;
                        const dk = dateKey(viewYear, viewMonth, day);
                        const dayEntries = entriesByDay.get(day) || [];
                        const hasData = dayEntries.length > 0;
                        const isSelected = selectedDay === day;
                        const isToday = dk === today;
                        const source = JPYT_SOURCE_BY_DATE[dk];

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
                                            ? `2px solid ${ROSE}`
                                            : '1px solid #E7E5E4',
                                    backgroundColor: isSelected
                                        ? '#F0F9FF'
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
                                    color: isSelected ? '#0369A1' : isToday ? '#BE185D' : '#78716C',
                                }}>
                                    {day}
                                </span>
                                {source && (
                                    <span style={{
                                        fontSize: '9px', fontWeight: '700',
                                        color: '#78716C',
                                        maxWidth: '100%', overflow: 'hidden',
                                        textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                    }}>
                                        {source.creator.slice(0, 5)}
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
                                    No video harvested yet
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
