'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { PPButton, PPPopup, usePPWordPicker } from '@/components/english/PPWordPicker';
import { MOVIE_BY_DATE, GENRE_META, type HarvestMovie } from '@/data/english/harvest-movies';
import { seedHarvestExpressions } from '@/data/english/harvest-expressions';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HarvestExpression {
    id: string;
    expression: string;
    context: string | null;
    note: string | null;
    source_type: 'youtube' | 'reddit' | 'movie_script';
    source_title: string | null;
    source_url: string | null;
    score: number;
    harvest_date: string | null;
    status: string;
    created_at: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ACCENT = '#D4AF37';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function speakText(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.92;
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

function rankBadge(score: number): { text: string; color: string; bg: string } {
    if (score >= 15) return { text: 'S', color: '#92400E', bg: '#FEF3C7' };
    if (score >= 10) return { text: 'A', color: '#065F46', bg: '#D1FAE5' };
    if (score >= 6) return { text: 'B', color: '#1E40AF', bg: '#DBEAFE' };
    return { text: 'C', color: '#78716C', bg: '#F5F5F4' };
}

function dateKey(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function loadExpressions(): HarvestExpression[] {
    try {
        const raw = localStorage.getItem('harvest-expressions');
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function HarvestPage() {
    const [mounted, setMounted] = useState(false);
    const today = jstToday();
    const todayParts = today.split('-').map(Number);
    const [viewYear, setViewYear] = useState(todayParts[0]);
    const [viewMonth, setViewMonth] = useState(todayParts[1] - 1);
    const [selectedDay, setSelectedDay] = useState<number | null>(todayParts[2]);
    const [expressions, setExpressions] = useState<HarvestExpression[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [registered, setRegistered] = useState<Set<string>>(new Set<string>());

    useEffect(() => {
        setMounted(true);
        seedHarvestExpressions();
        setExpressions(loadExpressions());
        try {
            const s = localStorage.getItem('harvest-registered');
            if (s) setRegistered(new Set<string>(JSON.parse(s)));
        } catch {}
    }, []);

    useEffect(() => {
        if (!mounted) return;
        try { localStorage.setItem('harvest-registered', JSON.stringify([...registered])); } catch {}
    }, [registered, mounted]);

    const { ppWordPicker, openPP, toggleWord, closePP, search } = usePPWordPicker();

    // Group by harvest_date
    const byDate = useMemo(() => {
        const map = new Map<string, HarvestExpression[]>();
        for (const e of expressions) {
            const dk = e.harvest_date || e.created_at?.slice(0, 10) || '';
            if (!dk) continue;
            if (!map.has(dk)) map.set(dk, []);
            map.get(dk)!.push(e);
        }
        return map;
    }, [expressions]);

    const grid = useMemo(() => buildCalendarGrid(viewYear, viewMonth), [viewYear, viewMonth]);

    const selectedDateKey = selectedDay ? dateKey(viewYear, viewMonth, selectedDay) : null;
    const selectedExprs = selectedDateKey ? (byDate.get(selectedDateKey) || []) : [];
    const selectedMovie = selectedDateKey ? MOVIE_BY_DATE[selectedDateKey] : null;

    // Stats
    const totalMovies = Object.keys(MOVIE_BY_DATE).filter(d => {
        const [y, m] = d.split('-').map(Number);
        return y === viewYear && m === viewMonth + 1;
    }).length;
    const seededMovies = [...byDate.keys()].filter(d => {
        const [y, m] = d.split('-').map(Number);
        return y === viewYear && m === viewMonth + 1;
    }).length;

    // Month nav
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

    // Register to training via local-api interceptor
    const [registeringId, setRegisteringId] = useState<string | null>(null);
    const handleRegister = useCallback(async (expr: HarvestExpression) => {
        setRegisteringId(expr.id);
        try {
            const res = await fetch('/api/user-phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phrase: expr.expression,
                    type: 'expression',
                    meaning: expr.note || expr.context || expr.expression,
                    source: expr.source_title || 'Movie Harvest',
                }),
            });
            if (res.ok) {
                setRegistered(prev => new Set(prev).add(expr.id));
            }
        } catch {} finally {
            setRegisteringId(null);
        }
    }, []);

    // -----------------------------------------------------------------------
    // Expression Card
    // -----------------------------------------------------------------------
    function ExprCard({ expr, index }: { expr: HarvestExpression; index: number }) {
        const rank = rankBadge(expr.score);
        const isExpanded = expandedId === expr.id;
        const isReg = registered.has(expr.id);
        const isReging = registeringId === expr.id;

        return (
            <div style={{
                backgroundColor: '#fff',
                borderRadius: '14px',
                border: '1px solid #E7E5E4',
                padding: '16px 18px',
                transition: 'box-shadow 0.2s',
            }}>
                {/* Header: index + rank + expression */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '4px' }}>
                    <span style={{
                        fontSize: '11px', fontWeight: '700', color: '#A8A29E',
                        width: '20px', textAlign: 'right', flexShrink: 0,
                        paddingTop: '4px',
                    }}>
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                        backgroundColor: rank.bg, color: rank.color,
                        fontSize: '12px', fontWeight: '800',
                    }}>
                        {rank.text}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                            fontSize: '17px', fontWeight: '700', color: '#1C1917',
                            lineHeight: 1.4, letterSpacing: '-0.01em',
                        }}>
                            &ldquo;{expr.expression}&rdquo;
                        </div>
                    </div>
                </div>

                {/* Context (scene description) */}
                {expr.context && (
                    <p style={{
                        fontSize: '13px', color: '#57534E', fontStyle: 'italic',
                        margin: '10px 0 8px 30px', padding: '8px 14px',
                        backgroundColor: '#FAFAF9', borderRadius: '8px',
                        borderLeft: '3px solid #D6D3D1', lineHeight: 1.6,
                    }}>
                        {expr.context}
                    </p>
                )}

                {/* Note (Japanese explanation) */}
                {expr.note && (
                    <div style={{
                        fontSize: '13px', color: '#44403C',
                        margin: '8px 0 8px 30px', padding: '10px 14px',
                        backgroundColor: '#FFFBEB', borderRadius: '8px',
                        borderLeft: `3px solid ${ACCENT}`, lineHeight: 1.7,
                    }}>
                        {expr.note}
                    </div>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginTop: '10px', marginLeft: '30px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => speakText(expr.expression)}
                        style={{
                            width: '34px', height: '34px', borderRadius: '8px',
                            border: '1px solid #E7E5E4', backgroundColor: '#fff',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                        title="Play"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#78716C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                    </button>

                    <PPButton onClick={() => openPP(expr.id, expr.expression)} />

                    <button
                        onClick={() => !isReg && !isReging && handleRegister(expr)}
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

                    <button
                        onClick={() => setExpandedId(isExpanded ? null : expr.id)}
                        style={{
                            padding: '7px 12px', borderRadius: '8px',
                            border: '1px solid #E7E5E4',
                            backgroundColor: isExpanded ? '#F5F5F4' : '#fff',
                            color: '#78716C', fontSize: '12px', fontWeight: '500', cursor: 'pointer',
                        }}
                    >
                        {isExpanded ? 'Close' : 'Details'}
                    </button>
                </div>

                {/* Expanded */}
                {isExpanded && (
                    <div style={{
                        marginTop: '12px', marginLeft: '30px', paddingTop: '12px',
                        borderTop: '1px solid #F5F5F4',
                        fontSize: '12px', color: '#78716C', lineHeight: 1.7,
                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 12px' }}>
                            <span style={{ fontWeight: '600', color: '#57534E' }}>Source</span>
                            <span>{expr.source_title || 'Movie Script'}</span>
                            <span style={{ fontWeight: '600', color: '#57534E' }}>Score</span>
                            <span>{expr.score} ({rank.text})</span>
                            <span style={{ fontWeight: '600', color: '#57534E' }}>Date</span>
                            <span>{expr.harvest_date || expr.created_at?.slice(0, 10)}</span>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // -----------------------------------------------------------------------
    // Movie Header (shown above expressions for selected day)
    // -----------------------------------------------------------------------
    function MovieHeader({ movie, count }: { movie: HarvestMovie; count: number }) {
        const g = GENRE_META[movie.genre] || GENRE_META.drama;
        return (
            <div style={{
                backgroundColor: '#fff', borderRadius: '16px',
                border: '1px solid #E7E5E4', padding: '24px',
                marginBottom: '16px',
                background: 'linear-gradient(135deg, #FFFBEB 0%, #fff 40%)',
            }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{
                        fontSize: '11px', fontWeight: '700', color: g.color,
                        padding: '3px 10px', borderRadius: '6px', backgroundColor: g.bg,
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>
                        {g.label}
                    </span>
                    <span style={{ fontSize: '12px', color: '#A8A29E', fontWeight: '500' }}>
                        {movie.year}
                    </span>
                </div>
                <h2 style={{
                    fontSize: '26px', fontWeight: '800', color: '#1C1917',
                    margin: '12px 0 8px', letterSpacing: '-0.02em', lineHeight: 1.2,
                }}>
                    {movie.title}
                </h2>
                <p style={{
                    fontSize: '14px', color: '#57534E', margin: '0 0 12px',
                    lineHeight: 1.6,
                }}>
                    {movie.tagline}
                </p>
                <div style={{ fontSize: '12px', color: '#A8A29E', fontWeight: '600' }}>
                    {count > 0 ? `${count} EXPRESSIONS` : 'COMING SOON'}
                </div>
            </div>
        );
    }

    // -----------------------------------------------------------------------
    // Render
    // -----------------------------------------------------------------------
    if (!mounted) return null;

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
                        Movie Harvest
                    </h1>
                    <p style={{ fontSize: '14px', color: '#78716C', margin: 0, lineHeight: 1.5 }}>
                        1 movie / day -- 10 curated expressions per movie
                    </p>
                    <p style={{ fontSize: '12px', color: '#A8A29E', margin: '4px 0 0' }}>
                        {seededMovies} / {totalMovies} movies seeded this month
                        {' '} -- {expressions.length} total expressions
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

                {/* Calendar Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '24px' }}>
                    {grid.map((day, i) => {
                        if (day === null) return <div key={`e${i}`} />;

                        const dk = dateKey(viewYear, viewMonth, day);
                        const movie = MOVIE_BY_DATE[dk];
                        const dayExprs = byDate.get(dk) || [];
                        const hasData = dayExprs.length > 0;
                        const isSelected = selectedDay === day;
                        const isToday = dk === today;
                        const genre = movie ? GENRE_META[movie.genre] : null;

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
                                            ? '2px solid #10B981'
                                            : '1px solid #E7E5E4',
                                    backgroundColor: isSelected
                                        ? '#FFFBEB'
                                        : hasData
                                            ? '#fff'
                                            : movie
                                                ? '#FAFAF9'
                                                : '#F5F5F4',
                                    cursor: movie ? 'pointer' : 'default',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    gap: '2px',
                                    padding: '6px 3px',
                                    textAlign: 'center',
                                    opacity: movie ? 1 : 0.5,
                                    transition: 'all 0.15s',
                                }}
                            >
                                {/* Day number */}
                                <span style={{
                                    fontSize: '12px',
                                    fontWeight: isSelected || isToday ? '800' : '600',
                                    color: isSelected ? '#B45309' : isToday ? '#059669' : '#78716C',
                                }}>
                                    {day}
                                </span>

                                {/* Genre dot */}
                                {genre && (
                                    <div style={{
                                        width: '6px', height: '6px', borderRadius: '50%',
                                        backgroundColor: genre.color,
                                    }} />
                                )}

                                {/* Movie title (truncated) */}
                                {movie && (
                                    <span style={{
                                        fontSize: '9px', fontWeight: '600',
                                        color: hasData ? '#44403C' : '#A8A29E',
                                        lineHeight: 1.2,
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        maxWidth: '100%',
                                        wordBreak: 'break-word',
                                    }}>
                                        {movie.title}
                                    </span>
                                )}

                                {/* Expression count */}
                                {hasData && (
                                    <span style={{
                                        fontSize: '8px', fontWeight: '700',
                                        color: ACCENT,
                                    }}>
                                        {dayExprs.length}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Genre legend */}
                <div style={{
                    display: 'flex', gap: '12px', justifyContent: 'center',
                    flexWrap: 'wrap', marginBottom: '24px',
                }}>
                    {Object.entries(GENRE_META).map(([key, meta]) => (
                        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{
                                width: '6px', height: '6px', borderRadius: '50%',
                                backgroundColor: meta.color,
                            }} />
                            <span style={{ fontSize: '10px', color: '#A8A29E', fontWeight: '500' }}>
                                {meta.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Detail panel */}
                {selectedDay && (
                    <div>
                        {/* Movie header */}
                        {selectedMovie && (
                            <MovieHeader movie={selectedMovie} count={selectedExprs.length} />
                        )}

                        {/* Date label if no movie scheduled */}
                        {!selectedMovie && (
                            <h2 style={{
                                fontSize: '16px', fontWeight: '700', color: '#1C1917',
                                margin: '0 0 12px',
                            }}>
                                {viewYear}/{viewMonth + 1}/{selectedDay}
                            </h2>
                        )}

                        {/* Expressions */}
                        {selectedExprs.length === 0 ? (
                            <div style={{
                                padding: '40px', textAlign: 'center',
                                backgroundColor: '#fff', borderRadius: '14px',
                                border: '1px solid #E7E5E4',
                            }}>
                                <p style={{ color: '#A8A29E', fontSize: '14px', margin: 0 }}>
                                    {selectedMovie ? 'Coming soon' : 'No movie scheduled'}
                                </p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {selectedExprs
                                    .sort((a, b) => b.score - a.score)
                                    .map((expr, idx) => (
                                        <ExprCard key={expr.id} expr={expr} index={idx} />
                                    ))
                                }
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* PP Popup */}
            {ppWordPicker && (
                <PPPopup state={ppWordPicker} onToggle={toggleWord} onClose={closePP} onSearch={search} />
            )}
        </div>
    );
}
