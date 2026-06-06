'use client';

// 罪悪感ゼロ英語 (JP→EN)
// 日本語YouTubeのフレーズを「ネイティブが言う英語」に変換。観た動画が勉強になる。

import { useState, useMemo, useCallback } from 'react';
import { PPButton, PPPopup, usePPWordPicker } from '@/components/english/PPWordPicker';
import {
    JPYT_SEEDS,
    JPYT_SOURCE_BY_DATE,
    type JpYtEntry,
    type JpYtSource,
} from '@/data/english/jp-yt-seed';

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];
const ACCENT = '#0EA5E9';
const ROSE = '#F472B6';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';

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
            list.push({ ...seed, id: `jpyt_${monthKey}_${String(seed.daySlot).padStart(2, '0')}_${idx}` });
        }
        return map;
    }, []);

    const monthEntries = useMemo(
        () => entriesByMonth.get(buildMonthKey(viewYear, viewMonth)) || [],
        [entriesByMonth, viewYear, viewMonth]
    );

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
    const selectedSource: JpYtSource | null = selectedDateKey ? (JPYT_SOURCE_BY_DATE[selectedDateKey] || null) : null;
    const selectedEntries = selectedDay ? (entriesByDay.get(selectedDay) || []) : [];

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
                body: JSON.stringify({ english: entry.english, japanese: `${entry.japanese} = ${entry.english}`, category: 'jp-yt', date: dateStr }),
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

    const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' });
    const seededDays = entriesByDay.size;

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', padding: '28px 16px 96px' }}>
            <div style={{ maxWidth: '880px', margin: '0 auto' }}>

                {/* Hero header */}
                <div style={{
                    background: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 55%, #F472B6 130%)',
                    borderRadius: '20px', padding: '26px 24px', color: '#fff', marginBottom: '18px',
                    boxShadow: '0 10px 30px rgba(14,165,233,0.20)',
                }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.14em', opacity: 0.9 }}>
                        JP → EN ・ GUILT-FREE ENGLISH
                    </div>
                    <h1 style={{ fontSize: '30px', fontWeight: 900, margin: '6px 0 8px', letterSpacing: '-0.02em' }}>
                        罪悪感ゼロ英語
                    </h1>
                    <p style={{ fontSize: '14px', lineHeight: 1.7, margin: 0, opacity: 0.96, maxWidth: '560px' }}>
                        ヒカキン見るの、もう罪悪感いらない。観た動画の日本語を「ネイティブが本当に言う英語」に変えれば、
                        ダラ見が勉強に化ける。教科書に1ミリも載ってない、生きた表現だけ。
                    </p>
                    <div style={{ fontSize: '12px', marginTop: '12px', opacity: 0.9, fontWeight: 600 }}>
                        {monthLabel} ・ {seededDays}日ぶん ・ {monthEntries.length}表現
                    </div>
                    <a href="/english/jp-yt-v2" style={{ display: 'inline-block', marginTop: '12px', fontSize: '12px', fontWeight: 800, color: '#fff', background: 'rgba(255,255,255,0.22)', borderRadius: '999px', padding: '6px 14px', textDecoration: 'none' }}>
                        TODAY版を試す（1日1本やり切る型）→
                    </a>
                </div>

                {/* Month nav */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <button onClick={prevMonth} style={navBtn}>&larr;</button>
                    <span style={{ fontSize: '17px', fontWeight: 800, color: INK }}>{monthLabel}</span>
                    <button onClick={nextMonth} style={navBtn}>&rarr;</button>
                </div>

                {/* Weekday labels */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', marginBottom: '5px' }}>
                    {WEEKDAYS.map((d, i) => (
                        <div key={d} style={{ textAlign: 'center', fontSize: '11px', fontWeight: 700, padding: '4px 0', color: i === 0 ? '#EF4444' : i === 6 ? ACCENT : '#A8A29E' }}>
                            {d}
                        </div>
                    ))}
                </div>

                {/* Calendar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', marginBottom: '22px' }}>
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
                                    minHeight: '74px', borderRadius: '12px',
                                    border: isSelected ? `2px solid ${ACCENT}` : isToday ? `2px solid ${ROSE}` : `1px solid ${LINE}`,
                                    background: isSelected ? '#F0F9FF' : hasData ? '#fff' : '#F5F5F4',
                                    cursor: 'pointer', display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'flex-start', gap: '3px',
                                    padding: '6px 3px', textAlign: 'center', opacity: hasData ? 1 : 0.5,
                                    transition: 'transform 0.12s ease, box-shadow 0.12s ease',
                                    boxShadow: isSelected ? '0 4px 12px rgba(14,165,233,0.18)' : 'none',
                                }}
                            >
                                <span style={{ fontSize: '12px', fontWeight: isSelected || isToday ? 800 : 600, color: isSelected ? '#0369A1' : isToday ? '#BE185D' : '#78716C' }}>
                                    {day}
                                </span>
                                {source && (
                                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#57534E', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {source.creator.slice(0, 5)}
                                    </span>
                                )}
                                {hasData && (
                                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#fff', background: ACCENT, borderRadius: '999px', padding: '1px 6px' }}>
                                        {dayEntries.length}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Selected day */}
                {selectedDay && (
                    <div>
                        {selectedSource && <SourceHeader source={selectedSource} count={selectedEntries.length} />}
                        {!selectedSource && (
                            <h2 style={{ fontSize: '16px', fontWeight: 800, color: INK, margin: '0 0 12px' }}>
                                {viewYear}/{viewMonth + 1}/{selectedDay}
                            </h2>
                        )}
                        {selectedEntries.length === 0 ? (
                            <div style={{ padding: '40px', textAlign: 'center', background: '#fff', borderRadius: '16px', border: `1px solid ${LINE}` }}>
                                <p style={{ color: '#A8A29E', fontSize: '14px', margin: 0 }}>この日はまだ動画を仕込んでない</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {selectedEntries.map((entry, idx) => (
                                    <EntryCard
                                        key={entry.id}
                                        entry={entry}
                                        index={idx}
                                        isReg={registered.has(entry.id)}
                                        isReging={registeringId === entry.id}
                                        onRegister={() => handleRegister(entry)}
                                        openPP={() => openPP(entry.id, entry.english)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {ppWordPicker && <PPPopup state={ppWordPicker} onToggle={toggleWord} onClose={closePP} onSearch={search} />}
        </div>
    );
}

function YouTubeBlock({ source }: { source: JpYtSource }) {
    if (source.youtubeId) {
        return (
            <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: '14px', overflow: 'hidden', marginTop: '14px', background: '#000' }}>
                <iframe
                    src={`https://www.youtube.com/embed/${source.youtubeId}`}
                    title={source.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                />
            </div>
        );
    }
    // Fallback: styled "watch on channel" card (no fake video IDs)
    return (
        <a href={source.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', marginTop: '14px' }}>
            <div style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                background: 'linear-gradient(135deg, #FEF2F2 0%, #FFF 60%)',
                border: `1px solid ${LINE}`, borderRadius: '14px', padding: '14px 16px',
                transition: 'transform 0.12s ease',
            }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: INK }}>{source.creator} のチャンネルで観る</div>
                    <div style={{ fontSize: '11px', color: SUB, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>YouTube で開く &rarr;</div>
                </div>
            </div>
        </a>
    );
}

function SourceHeader({ source, count }: { source: JpYtSource; count: number }) {
    return (
        <div style={{ background: '#fff', borderRadius: '18px', border: `1px solid ${LINE}`, padding: '20px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '999px', background: `linear-gradient(135deg, ${ACCENT}, ${ROSE})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: '17px', flexShrink: 0 }}>
                    {source.creator.slice(0, 1)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: SUB }}>{source.creator}</div>
                    <h2 style={{ fontSize: '19px', fontWeight: 800, color: INK, margin: '2px 0 0', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{source.title}</h2>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: ACCENT, background: '#E0F2FE', borderRadius: '999px', padding: '4px 10px', whiteSpace: 'nowrap' }}>
                    {count} 表現
                </span>
            </div>
            <p style={{ fontSize: '13px', color: '#57534E', margin: '12px 0 0', lineHeight: 1.7 }}>{source.tagline}</p>
            <YouTubeBlock source={source} />
        </div>
    );
}

function EntryCard({ entry, index, isReg, isReging, onRegister, openPP }: {
    entry: DisplayEntry; index: number; isReg: boolean; isReging: boolean; onRegister: () => void; openPP: () => void;
}) {
    const rank = rankBadge(entry.rank);
    const hasScene = !!(entry.target && entry.target.trim());
    const [showScene, setShowScene] = useState(false);

    return (
        <div style={{ background: '#fff', borderRadius: '16px', border: `1px solid ${LINE}`, padding: '18px 20px' }}>
            {/* Header: rank + japanese word */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#CBC4B4', width: '18px', textAlign: 'right', flexShrink: 0 }}>
                    {String(index + 1).padStart(2, '0')}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '8px', background: rank.bg, color: rank.color, fontSize: '12px', fontWeight: 800, flexShrink: 0 }}>
                    {entry.rank}
                </span>
                <span style={{ fontSize: '21px', fontWeight: 800, color: INK, lineHeight: 1.25, letterSpacing: '-0.01em' }}>
                    「{entry.japanese}」
                </span>
            </div>

            {/* English (hero) */}
            <div style={{ background: '#F0F9FF', borderRadius: '12px', borderLeft: `3px solid ${ACCENT}`, padding: '13px 16px' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: ACCENT, marginBottom: '4px', letterSpacing: '0.06em' }}>ENGLISH</div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ flex: 1, fontSize: '17px', fontWeight: 700, color: INK, lineHeight: 1.5 }}>
                        &ldquo;{entry.english}&rdquo;
                    </div>
                    <button onClick={() => speakText(entry.english)} aria-label="play" style={playBtn}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill={ACCENT}><path d="M8 5v14l11-7z" /></svg>
                    </button>
                </div>
            </div>

            {/* Alternatives as chips */}
            {entry.alternatives.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                    {entry.alternatives.map((alt, i) => (
                        <button key={i} onClick={() => speakText(alt)} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            background: '#FAFAF9', border: `1px solid ${LINE}`, borderRadius: '999px',
                            padding: '5px 11px', fontSize: '12px', color: '#44403C', cursor: 'pointer',
                        }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="#A8A29E"><path d="M8 5v14l11-7z" /></svg>
                            {alt}
                        </button>
                    ))}
                </div>
            )}

            {/* とにお note */}
            <div style={{ fontSize: '13px', color: '#44403C', margin: '12px 0 0', padding: '11px 14px', background: '#FDF2F8', borderRadius: '10px', borderLeft: `3px solid ${ROSE}`, lineHeight: 1.75 }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: ROSE, letterSpacing: '0.05em', marginRight: '6px' }}>とにお</span>
                {entry.note}
            </div>

            {/* Scene (conditional + collapsible) */}
            {hasScene && (
                <div style={{ marginTop: '10px' }}>
                    <button onClick={() => setShowScene(s => !s)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 700, color: SUB, padding: '2px 0' }}>
                        {showScene ? '▾ 動画の場面を隠す' : '▸ 動画の場面を見る'}
                    </button>
                    {showScene && (
                        <div style={{ marginTop: '6px', padding: '12px 16px', background: '#FAFAF9', borderRadius: '10px', borderLeft: `3px solid #D6D3D1`, fontSize: '13px', lineHeight: 1.7 }}>
                            {entry.contextBefore && <div style={{ color: '#A8A29E', fontStyle: 'italic' }}>{entry.contextBefore}</div>}
                            <div style={{ color: INK, fontWeight: 700, margin: '3px 0' }}>{entry.target}</div>
                            {entry.contextAfter && <div style={{ color: '#A8A29E', fontStyle: 'italic' }}>{entry.contextAfter}</div>}
                        </div>
                    )}
                </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '12px', flexWrap: 'wrap' }}>
                <PPButton onClick={openPP} />
                <button
                    onClick={() => !isReg && !isReging && onRegister()}
                    disabled={isReg || isReging}
                    style={{
                        padding: '8px 16px', borderRadius: '9px', border: 'none',
                        background: isReg ? '#D1FAE5' : ACCENT, color: isReg ? '#065F46' : '#fff',
                        fontSize: '12px', fontWeight: 700, cursor: isReg ? 'default' : 'pointer', opacity: isReging ? 0.6 : 1,
                    }}
                >
                    {isReging ? '...' : isReg ? '登録済み' : '+ トレーニングに追加'}
                </button>
            </div>
        </div>
    );
}

const navBtn: React.CSSProperties = {
    padding: '8px 16px', borderRadius: '10px', border: `1px solid ${LINE}`,
    background: '#fff', cursor: 'pointer', fontSize: '16px', color: '#57534E',
};
const playBtn: React.CSSProperties = {
    flexShrink: 0, width: '30px', height: '30px', borderRadius: '8px',
    border: '1px solid #BAE6FD', background: '#fff', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
};
