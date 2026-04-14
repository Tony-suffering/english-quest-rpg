'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import EnglishSidebar from '@/components/EnglishSidebar';
import ReviewCalendar from '@/components/english/ReviewCalendar';
import { grindEntries, type GrindEntry } from '@/data/grind-log';

const CATEGORY_COLORS: Record<string, { fg: string; bg: string }> = {
    log: { fg: '#92400E', bg: '#FEF3C7' },
};

const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/channel/UC6vo3TpW_TBo2ACn9B9d93Q';

// --- Helpers ---
function dateToParts(dateStr: string) {
    const [y, m, d] = dateStr.split('-').map(Number);
    return { year: y, month: m - 1, day: d };
}

// --- Main ---
export default function GrindPage() {
    const now = new Date();
    const [viewYear, setViewYear] = useState(now.getFullYear());
    const [viewMonth, setViewMonth] = useState(now.getMonth());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const entries = grindEntries;
    const [isMobile, setIsMobile] = useState(false);
    const detailRef = useRef<HTMLDivElement>(null);

    const todayDate = now.getDate();
    const todayMonth = now.getMonth();
    const todayYear = now.getFullYear();

    // Responsive -- stacked layout kicks in for 13" laptops and smaller,
    // not just phones. 3-column (sidebar + calendar + detail) is too cramped
    // below ~1100px effective width.
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1100);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Read ?date=YYYY-MM-DD from URL on mount
    const [urlDateApplied, setUrlDateApplied] = useState(false);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const d = params.get('date');
        if (d && /^\d{4}-\d{2}-\d{2}$/.test(d)) {
            const [y, m, day] = d.split('-').map(Number);
            setViewYear(y);
            setViewMonth(m - 1);
            setSelectedDay(day);
        }
        setUrlDateApplied(true);
    }, []);

    // Sync selectedDay → URL
    useEffect(() => {
        if (!urlDateApplied) return;
        if (selectedDay === null) return;
        const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
        const url = new URL(window.location.href);
        if (url.searchParams.get('date') !== dateStr) {
            url.searchParams.set('date', dateStr);
            window.history.replaceState({}, '', url.toString());
        }
    }, [urlDateApplied, selectedDay, viewYear, viewMonth]);

    // Scroll top on day change
    useEffect(() => { detailRef.current?.scrollTo(0, 0); }, [selectedDay]);

    // Tag filter
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const allTags = useMemo(() => {
        const counts: Record<string, number> = {};
        entries.forEach(e => {
            (e.tags || '').split(',').map(t => t.trim()).filter(Boolean).forEach(tag => {
                counts[tag] = (counts[tag] || 0) + 1;
            });
        });
        return Object.entries(counts).sort((a, b) => b[1] - a[1]);
    }, [entries]);

    const filteredEntries = useMemo(() => {
        if (!activeTag) return entries;
        return entries.filter(e =>
            (e.tags || '').split(',').map(t => t.trim()).includes(activeTag)
        );
    }, [entries, activeTag]);

    // Current month entries (tag-filtered)
    const monthEntries = useMemo(() => {
        const prefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-`;
        return filteredEntries.filter(e => e.date.startsWith(prefix));
    }, [filteredEntries, viewYear, viewMonth]);

    // Auto-select today when entries loaded (only if URL didn't specify a date)
    useEffect(() => {
        if (!urlDateApplied) return;
        if (selectedDay === null && viewYear === todayYear && viewMonth === todayMonth) {
            setSelectedDay(todayDate);
        }
    }, [urlDateApplied, selectedDay, viewYear, viewMonth, todayYear, todayMonth, todayDate]);

    // Calendar entries format
    const calendarEntries = useMemo(
        () => monthEntries.map(e => ({
            id: e.id,
            day_slot: dateToParts(e.date).day,
            japanese: e.title_ja || e.title,
            category: 'log',
        })),
        [monthEntries]
    );

    // Checked = user explicitly marked "確認済み" on this entry
    const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
    useEffect(() => {
        try {
            const raw = localStorage.getItem('grind-checked-ids');
            if (raw) setCheckedIds(new Set(JSON.parse(raw)));
        } catch {}
    }, []);
    const toggleChecked = (id: string) => {
        setCheckedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            try { localStorage.setItem('grind-checked-ids', JSON.stringify([...next])); } catch {}
            return next;
        });
    };
    const playedIds = checkedIds;

    // By day map
    const byDay = useMemo(() => {
        const map: Record<number, GrindEntry[]> = {};
        monthEntries.forEach(e => {
            const d = dateToParts(e.date).day;
            if (!map[d]) map[d] = [];
            map[d].push(e);
        });
        return map;
    }, [monthEntries]);

    const selectedEntries = selectedDay ? (byDay[selectedDay] || []) : [];

    // Stats: total videos, total minutes, streak
    const stats = useMemo(() => {
        const totalVideos = entries.length;
        const totalSeconds = entries.reduce((sum, e) => sum + (e.duration || 0), 0);

        // Streak: count consecutive days back from today that have an entry
        const dates = new Set(entries.map(e => e.date));
        let streak = 0;
        const cur = new Date();
        while (true) {
            const key = `${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}-${String(cur.getDate()).padStart(2, '0')}`;
            if (dates.has(key)) {
                streak++;
                cur.setDate(cur.getDate() - 1);
            } else {
                // Allow "today missed but streak still valid" -- only if streak already started? Nope, strict.
                break;
            }
        }
        return { totalVideos, totalSeconds, streak };
    }, [entries]);

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
    const goToday = () => {
        setViewYear(todayYear); setViewMonth(todayMonth); setSelectedDay(todayDate);
    };

    // Sorted unique dates that have entries (ASC) -- respects active tag filter
    const sortedDates = useMemo(() => {
        const set = new Set(filteredEntries.map(e => e.date));
        return Array.from(set).sort();
    }, [filteredEntries]);

    // Current selected date string
    const selectedDateStr = selectedDay
        ? `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
        : null;

    const currentDateIdx = selectedDateStr ? sortedDates.indexOf(selectedDateStr) : -1;
    const prevDateStr = currentDateIdx > 0 ? sortedDates[currentDateIdx - 1] : null;
    const nextDateStr = currentDateIdx >= 0 && currentDateIdx < sortedDates.length - 1
        ? sortedDates[currentDateIdx + 1]
        : null;

    const jumpToDate = (dateStr: string) => {
        const [y, m, d] = dateStr.split('-').map(Number);
        setViewYear(y);
        setViewMonth(m - 1);
        setSelectedDay(d);
    };

    // Year mosaic: 12 months x 31 days grid for current year
    const yearGrid = useMemo(() => {
        const year = todayYear;
        const entryMap: Record<string, GrindEntry> = {};
        entries.filter(e => e.date.startsWith(`${year}-`)).forEach(e => {
            entryMap[e.date] = e;
        });

        // 12 rows, each row = one month, each cell = day (1-31)
        const months: Array<{
            label: string;
            cells: Array<{ date: string; entry?: GrindEntry } | null>;
        }> = [];
        const labels = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
        for (let m = 0; m < 12; m++) {
            const daysInMonth = new Date(year, m + 1, 0).getDate();
            const cells: Array<{ date: string; entry?: GrindEntry } | null> = [];
            for (let d = 1; d <= 31; d++) {
                if (d > daysInMonth) {
                    cells.push(null);
                } else {
                    const dateStr = `${year}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                    cells.push({ date: dateStr, entry: entryMap[dateStr] });
                }
            }
            months.push({ label: labels[m], cells });
        }
        return { months, year };
    }, [entries, todayYear]);

    // --- RENDER ---
    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#FAFAF9',
            overflowX: 'hidden',
            maxWidth: '100vw',
        }}>
            <EnglishSidebar />
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                overflow: isMobile ? 'visible' : 'hidden',
                overflowX: 'hidden',
                height: isMobile ? 'auto' : '100vh',
                minWidth: 0,
                maxWidth: '100%',
            }}>
                {/* LEFT: Calendar + Stats */}
                <div style={{
                    width: isMobile ? '100%' : 340,
                    minWidth: isMobile ? undefined : 300,
                    borderRight: isMobile ? 'none' : '1px solid #E7E5E4',
                    borderBottom: isMobile ? '1px solid #E7E5E4' : 'none',
                    background: '#FFF',
                    display: 'flex', flexDirection: 'column',
                    maxHeight: isMobile ? 'none' : '100vh',
                    overflow: 'auto',
                }}>
                    <ReviewCalendar
                        title="GRIND 365"
                        subtitle="俺も毎日やってる、1日1本サボらず"
                        accent="#D4AF37"
                        accentBg="#FEF9E7"
                        entries={calendarEntries}
                        categoryColors={CATEGORY_COLORS}
                        selectedDay={selectedDay}
                        onSelectDay={setSelectedDay}
                        viewYear={viewYear}
                        viewMonth={viewMonth}
                        onPrevMonth={prevMonth}
                        onNextMonth={nextMonth}
                        onGoToday={goToday}
                        storagePrefix="grind"
                        playedIds={playedIds}
                        isMobile={isMobile}
                        headerRight={
                            <span style={{
                                fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
                                color: '#D4AF37', background: '#FEF9E7',
                                padding: '5px 10px', borderRadius: 5,
                                border: '1px solid #D4AF3730',
                            }}>
                                365 DAILY
                            </span>
                        }
                    />

                    {/* Tag filter pills */}
                    {allTags.length > 0 && (
                        <div style={{
                            padding: '12px 14px 4px',
                            borderTop: '1px solid #F5F5F4',
                        }}>
                            <div style={{
                                fontSize: 9, fontWeight: 700, color: '#78716C',
                                letterSpacing: '0.1em', marginBottom: 8,
                            }}>
                                FILTER BY TAG
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                                <button
                                    onClick={() => setActiveTag(null)}
                                    style={{
                                        fontSize: 10, fontWeight: 700,
                                        padding: '4px 9px', borderRadius: 5,
                                        border: activeTag === null ? '1px solid #D4AF37' : '1px solid #E7E5E4',
                                        background: activeTag === null ? '#FEF9E7' : '#FFF',
                                        color: activeTag === null ? '#92400E' : '#78716C',
                                        cursor: 'pointer',
                                        letterSpacing: '0.04em',
                                    }}
                                >
                                    ALL · {entries.length}
                                </button>
                                {allTags.map(([tag, count]) => (
                                    <button
                                        key={tag}
                                        onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                                        style={{
                                            fontSize: 10, fontWeight: 600,
                                            padding: '4px 9px', borderRadius: 5,
                                            border: activeTag === tag ? '1px solid #10B981' : '1px solid #E7E5E4',
                                            background: activeTag === tag ? '#D1FAE5' : '#FFF',
                                            color: activeTag === tag ? '#065F46' : '#57534E',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        #{tag} · {count}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Stats card */}
                    <div style={{
                        margin: 14, padding: '14px 16px',
                        background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
                        borderRadius: 12, border: '1px solid #F59E0B30',
                    }}>
                        <div style={{
                            fontSize: 9, fontWeight: 700, color: '#92400E',
                            letterSpacing: '0.1em', marginBottom: 10,
                        }}>
                            STATS
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            <div>
                                <div style={{ fontSize: 26, fontWeight: 800, color: '#92400E', lineHeight: 1 }}>
                                    {stats.streak}
                                </div>
                                <div style={{ fontSize: 9, color: '#78716C', marginTop: 4 }}>streak</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 26, fontWeight: 800, color: '#92400E', lineHeight: 1 }}>
                                    {stats.totalVideos}
                                </div>
                                <div style={{ fontSize: 9, color: '#78716C', marginTop: 4 }}>videos</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Detail */}
                <div
                    ref={detailRef}
                    style={{
                        flex: 1,
                        overflow: isMobile ? 'visible' : 'auto',
                        padding: isMobile ? '16px 14px' : '24px 32px',
                        minWidth: 0,
                    }}
                >
                    {/* Flashy marquee hero */}
                    {entries.length > 0 && (
                        <div style={{
                            position: 'relative',
                            marginBottom: 18,
                            borderRadius: 14,
                            overflow: 'hidden',
                            background: 'linear-gradient(135deg, #1C1917 0%, #292524 50%, #1C1917 100%)',
                            border: '1px solid #D4AF3740',
                            boxShadow: '0 8px 32px rgba(212,175,55,0.18), inset 0 1px 0 rgba(255,255,255,0.06)',
                        }}>
                            {/* Shimmer sweep overlay */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(110deg, transparent 40%, rgba(212,175,55,0.18) 50%, transparent 60%)',
                                backgroundSize: '200% 100%',
                                animation: 'grindShimmer 3.5s ease-in-out infinite',
                                pointerEvents: 'none',
                            }} />
                            {/* Header row */}
                            <div style={{
                                position: 'relative',
                                display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 12,
                                padding: isMobile ? '14px 14px 10px' : '16px 20px 12px',
                                flexWrap: 'nowrap',
                                minWidth: 0,
                            }}>
                                <div style={{
                                    width: 10, height: 10, borderRadius: '50%',
                                    background: '#D4AF37',
                                    boxShadow: '0 0 12px #D4AF37, 0 0 24px #D4AF3770',
                                    animation: 'grindPulse 1.8s infinite',
                                }} />
                                <div style={{
                                    fontSize: isMobile ? 15 : 17, fontWeight: 900,
                                    letterSpacing: '0.14em',
                                    background: 'linear-gradient(90deg, #FEF3C7, #D4AF37, #FEF3C7)',
                                    backgroundSize: '200% 100%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    animation: 'grindGradient 4s ease infinite',
                                }}>
                                    GRIND 365
                                </div>
                                <div style={{
                                    marginLeft: 'auto',
                                    display: 'flex', alignItems: 'baseline', gap: 4,
                                }}>
                                    <span style={{
                                        fontSize: isMobile ? 22 : 26, fontWeight: 900,
                                        color: '#FFF',
                                        textShadow: '0 0 20px rgba(212,175,55,0.6)',
                                        lineHeight: 1,
                                    }}>
                                        {stats.totalVideos}
                                    </span>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: '#A8A29E', letterSpacing: '0.05em' }}>
                                        / 365
                                    </span>
                                </div>
                            </div>
                            {/* Progress bar */}
                            <div style={{
                                position: 'relative',
                                height: 3,
                                background: 'rgba(255,255,255,0.06)',
                                margin: isMobile ? '0 16px' : '0 20px',
                            }}>
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    width: `${Math.min(100, (stats.totalVideos / 365) * 100)}%`,
                                    background: 'linear-gradient(90deg, #D4AF37, #F59E0B, #D4AF37)',
                                    backgroundSize: '200% 100%',
                                    animation: 'grindGradient 3s linear infinite',
                                    boxShadow: '0 0 10px #D4AF37',
                                }} />
                            </div>
                            {/* Marquee of recent titles */}
                            <div style={{
                                position: 'relative',
                                overflow: 'hidden',
                                padding: '10px 0 12px',
                                maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
                                WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)',
                            }}>
                                <div style={{
                                    display: 'inline-flex',
                                    whiteSpace: 'nowrap',
                                    animation: 'grindMarquee 40s linear infinite',
                                }}>
                                    {[...entries, ...entries].map((e, i) => (
                                        <span key={i} style={{
                                            display: 'inline-flex', alignItems: 'center', gap: 8,
                                            fontSize: 11, fontWeight: 600,
                                            color: '#D6D3D1',
                                            padding: '0 18px',
                                        }}>
                                            <span style={{
                                                fontSize: 9, fontWeight: 800,
                                                color: '#D4AF37', letterSpacing: '0.05em',
                                            }}>
                                                {e.date}
                                            </span>
                                            <span>{e.title_ja || e.title}</span>
                                            <span style={{ color: '#44403C' }}>•</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Prev/Next day nav */}
                    {selectedEntries.length > 0 && (prevDateStr || nextDateStr) && (
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            marginBottom: 16,
                        }}>
                            <button
                                onClick={() => prevDateStr && jumpToDate(prevDateStr)}
                                disabled={!prevDateStr}
                                style={{
                                    flex: 1,
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '10px 14px',
                                    background: prevDateStr ? '#FFF' : '#FAFAF9',
                                    border: '1px solid #E7E5E4',
                                    borderRadius: 10,
                                    cursor: prevDateStr ? 'pointer' : 'not-allowed',
                                    opacity: prevDateStr ? 1 : 0.4,
                                    transition: 'all 0.15s',
                                    textAlign: 'left',
                                }}
                            >
                                <span style={{ fontSize: 14, color: '#78716C' }}>←</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 9, fontWeight: 700, color: '#A8A29E', letterSpacing: '0.08em' }}>
                                        PREV
                                    </div>
                                    <div style={{ fontSize: 11, fontWeight: 600, color: '#292524', marginTop: 2 }}>
                                        {prevDateStr || '--'}
                                    </div>
                                </div>
                            </button>
                            <button
                                onClick={() => nextDateStr && jumpToDate(nextDateStr)}
                                disabled={!nextDateStr}
                                style={{
                                    flex: 1,
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    padding: '10px 14px',
                                    background: nextDateStr ? '#FFF' : '#FAFAF9',
                                    border: '1px solid #E7E5E4',
                                    borderRadius: 10,
                                    cursor: nextDateStr ? 'pointer' : 'not-allowed',
                                    opacity: nextDateStr ? 1 : 0.4,
                                    transition: 'all 0.15s',
                                    textAlign: 'right',
                                }}
                            >
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 9, fontWeight: 700, color: '#A8A29E', letterSpacing: '0.08em' }}>
                                        NEXT
                                    </div>
                                    <div style={{ fontSize: 11, fontWeight: 600, color: '#292524', marginTop: 2 }}>
                                        {nextDateStr || '--'}
                                    </div>
                                </div>
                                <span style={{ fontSize: 14, color: '#78716C' }}>→</span>
                            </button>
                        </div>
                    )}

                    {selectedEntries.length === 0 ? (
                        <EmptyState
                            label={selectedDay ? 'この日の動画はまだ公開されてない' : '日付を選んで'}
                            sub={selectedDay ? '明日以降にまた覗きに来て' : 'カレンダーから日付を選択'}
                        />
                    ) : (
                        selectedEntries.map(entry => {
                            const isToday =
                                viewYear === todayYear &&
                                viewMonth === todayMonth &&
                                selectedDay === todayDate;
                            return (
                                <EntryCard
                                    key={entry.id}
                                    entry={entry}
                                    isMobile={isMobile}
                                    isToday={isToday}
                                    isChecked={checkedIds.has(entry.id)}
                                    onToggleChecked={() => toggleChecked(entry.id)}
                                />
                            );
                        })
                    )}

                    {/* Year mosaic: 365 thumbnails */}
                    {entries.length > 0 && (
                        <div style={{
                            marginTop: 40,
                            padding: isMobile ? '18px 12px' : '22px 24px',
                            background: 'linear-gradient(135deg, #1C1917, #292524)',
                            borderRadius: 14,
                            border: '1px solid #D4AF3730',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                            minWidth: 0,
                            overflow: 'hidden',
                        }}>
                            <div style={{
                                display: 'flex', alignItems: 'baseline', gap: 12,
                                marginBottom: 14,
                            }}>
                                <div style={{
                                    fontSize: isMobile ? 13 : 15, fontWeight: 900,
                                    color: '#D4AF37', letterSpacing: '0.12em',
                                }}>
                                    {yearGrid.year} WALL
                                </div>
                                <div style={{
                                    fontSize: 10, fontWeight: 600, color: '#78716C',
                                }}>
                                    1年分の勉強が壁画になる
                                </div>
                            </div>
                            <div style={{
                                display: 'flex', flexDirection: 'column', gap: 4,
                            }}>
                                {yearGrid.months.map((mRow, mi) => (
                                    <div key={mi} style={{
                                        display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 8,
                                        minWidth: 0,
                                    }}>
                                        <div style={{
                                            width: isMobile ? 22 : 28, flexShrink: 0,
                                            fontSize: 9, fontWeight: 800,
                                            color: '#D4AF37', letterSpacing: '0.05em',
                                        }}>
                                            {mRow.label}
                                        </div>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(31, 1fr)',
                                            gap: isMobile ? 1 : 2,
                                            flex: 1,
                                            minWidth: 0,
                                        }}>
                                            {mRow.cells.map((cell, ci) => {
                                                if (!cell) {
                                                    return <div key={ci} style={{ aspectRatio: '1', maxHeight: 16 }} />;
                                                }
                                                const hasEntry = !!cell.entry;
                                                return (
                                                    <button
                                                        key={ci}
                                                        onClick={() => jumpToDate(cell.date)}
                                                        title={hasEntry ? `${cell.date} -- ${cell.entry!.title_ja || cell.entry!.title}` : cell.date}
                                                        style={{
                                                            aspectRatio: '1',
                                                            maxHeight: 16,
                                                            padding: 0,
                                                            border: 'none',
                                                            borderRadius: 2,
                                                            background: hasEntry
                                                                ? `url(https://i.ytimg.com/vi/${cell.entry!.youtube_id}/default.jpg) center / cover`
                                                                : 'rgba(255,255,255,0.04)',
                                                            cursor: 'pointer',
                                                            outline: hasEntry ? '1px solid rgba(212,175,55,0.35)' : '1px solid rgba(255,255,255,0.04)',
                                                            transition: 'transform 0.15s, outline-color 0.15s',
                                                        }}
                                                        onMouseEnter={e => {
                                                            e.currentTarget.style.transform = 'scale(2.4)';
                                                            e.currentTarget.style.zIndex = '10';
                                                            e.currentTarget.style.position = 'relative';
                                                            if (hasEntry) e.currentTarget.style.outlineColor = '#D4AF37';
                                                        }}
                                                        onMouseLeave={e => {
                                                            e.currentTarget.style.transform = 'scale(1)';
                                                            e.currentTarget.style.zIndex = '';
                                                            e.currentTarget.style.position = '';
                                                            if (hasEntry) e.currentTarget.style.outlineColor = 'rgba(212,175,55,0.35)';
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes grindPulse {
                    0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.6); }
                    70% { box-shadow: 0 0 0 10px rgba(255,255,255,0); }
                    100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
                }
                @keyframes grindShimmer {
                    0% { background-position: -100% 0; }
                    100% { background-position: 200% 0; }
                }
                @keyframes grindGradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes grindMarquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
}

// --- Sub components ---

function EmptyState({ label, sub }: { label: string; sub?: string }) {
    return (
        <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            height: '100%', minHeight: 300, color: '#A8A29E',
        }}>
            <div style={{
                width: 64, height: 64, borderRadius: 16,
                background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 800, color: '#D4AF37',
                marginBottom: 16,
            }}>
                G
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#78716C', marginBottom: 6 }}>
                {label}
            </div>
            {sub && (
                <div style={{ fontSize: 12, color: '#A8A29E' }}>
                    {sub}
                </div>
            )}
        </div>
    );
}

function EntryCard({
    entry, isMobile, isToday, isChecked, onToggleChecked,
}: { entry: GrindEntry; isMobile: boolean; isToday?: boolean; isChecked: boolean; onToggleChecked: () => void }) {
    const tags = entry.tags ? entry.tags.split(',').map(t => t.trim()).filter(Boolean) : [];
    const [copied, setCopied] = useState(false);
    const handleShare = async () => {
        const url = `${window.location.origin}/english/grind?date=${entry.date}`;
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {}
    };
    return (
        <div style={{ marginBottom: 24 }}>
            {/* TODAY hero banner */}
            {isToday && (
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    marginBottom: 14, padding: isMobile ? '10px 12px' : '10px 16px',
                    background: 'linear-gradient(135deg, #D4AF37, #F59E0B)',
                    borderRadius: 10,
                    boxShadow: '0 6px 20px rgba(212,175,55,0.35)',
                    flexWrap: 'wrap',
                    minWidth: 0,
                }}>
                    <span style={{
                        display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                        background: '#FFF',
                        boxShadow: '0 0 0 0 rgba(255,255,255,0.6)',
                        animation: 'grindPulse 1.8s infinite',
                    }} />
                    <span style={{
                        fontSize: 11, fontWeight: 800, letterSpacing: '0.12em',
                        color: '#FFF',
                    }}>
                        TODAY&apos;S GRIND
                    </span>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
                        今日の1本
                    </span>
                    <span style={{
                        marginLeft: 'auto', fontSize: 10, fontWeight: 700,
                        color: '#FFF', letterSpacing: '0.05em',
                    }}>
                        {entry.date}
                    </span>
                </div>
            )}

            {/* Header row (non-today) */}
            {!isToday && (
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    marginBottom: 10, flexWrap: 'wrap',
                }}>
                    <span style={{
                        fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
                        color: '#92400E', background: '#FEF3C7',
                        padding: '3px 8px', borderRadius: 4,
                    }}>
                        STUDY LOG
                    </span>
                    <span style={{ fontSize: 11, color: '#A8A29E' }}>{entry.date}</span>
                </div>
            )}

            {/* Title */}
            <h1 style={{
                fontSize: isMobile ? (isToday ? 20 : 17) : (isToday ? 28 : 22),
                fontWeight: 800, color: '#1C1917',
                margin: '0 0 4px 0', lineHeight: 1.25,
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
            }}>
                {entry.title}
            </h1>
            {entry.title_ja && (
                <p style={{
                    fontSize: isToday ? 14 : 13, color: '#78716C',
                    margin: '0 0 10px 0', fontWeight: 500,
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                }}>
                    {entry.title_ja}
                </p>
            )}

            {/* Share + Check buttons */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                <button
                    onClick={onToggleChecked}
                    style={{
                        fontSize: 11, fontWeight: 800, letterSpacing: '0.06em',
                        color: isChecked ? '#92400E' : '#78716C',
                        background: isChecked ? '#FEF3C7' : '#F5F5F4',
                        border: `1px solid ${isChecked ? '#D4AF3760' : '#E7E5E4'}`,
                        padding: '7px 14px', borderRadius: 6,
                        cursor: 'pointer', transition: 'all 0.2s',
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                    }}
                >
                    <span style={{ fontSize: 13, lineHeight: 1 }}>{isChecked ? '★' : '☆'}</span>
                    {isChecked ? '確認済み' : '確認した？'}
                </button>
                <button
                    onClick={handleShare}
                    style={{
                        fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                        color: copied ? '#065F46' : '#78716C',
                        background: copied ? '#D1FAE5' : '#F5F5F4',
                        border: `1px solid ${copied ? '#10B98140' : '#E7E5E4'}`,
                        padding: '6px 12px', borderRadius: 6,
                        cursor: 'pointer', transition: 'all 0.2s',
                    }}
                >
                    {copied ? 'COPIED!' : 'SHARE LINK'}
                </button>
            </div>

            {/* YouTube embed */}
            <div style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                background: '#000',
                borderRadius: 12,
                overflow: 'hidden',
                marginBottom: 16,
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            }}>
                <iframe
                    src={`https://www.youtube.com/embed/${entry.youtube_id}?rel=0`}
                    title={entry.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        border: 0,
                    }}
                />
            </div>

            {/* Subscribe CTA */}
            <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: isMobile ? '12px 14px' : '14px 18px',
                    marginBottom: 16,
                    background: 'linear-gradient(135deg, #1C1917, #292524)',
                    borderRadius: 12,
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                    transition: 'transform 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
                <div style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: '#FF0000',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                }}>
                    <svg width="20" height="14" viewBox="0 0 24 17" fill="none">
                        <path d="M23.5 2.66c-.28-1.04-1.1-1.86-2.14-2.14C19.47 0 12 0 12 0S4.53 0 2.64.52C1.6.8.78 1.62.5 2.66 0 4.55 0 8.5 0 8.5s0 3.95.5 5.84c.28 1.04 1.1 1.86 2.14 2.14C4.53 17 12 17 12 17s7.47 0 9.36-.52c1.04-.28 1.86-1.1 2.14-2.14.5-1.89.5-5.84.5-5.84s0-3.95-.5-5.84z" fill="#FFF"/>
                        <path d="M9.6 12.14L15.82 8.5 9.6 4.86v7.28z" fill="#FF0000"/>
                    </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                        fontSize: isMobile ? 13 : 14, fontWeight: 800,
                        color: '#FFF', marginBottom: 2, letterSpacing: '0.01em',
                    }}>
                        チャンネル登録で毎日1本届く
                    </div>
                    <div style={{
                        fontSize: isMobile ? 10 : 11, color: '#A8A29E',
                        fontWeight: 500,
                    }}>
                        サボらず365日アップ中 -- とにおの英語勉強ログ
                    </div>
                </div>
                <div style={{
                    fontSize: 10, fontWeight: 800, letterSpacing: '0.1em',
                    color: '#1C1917', background: '#FFF',
                    padding: '7px 12px', borderRadius: 6,
                    flexShrink: 0,
                }}>
                    SUBSCRIBE
                </div>
            </a>

            {/* Tags */}
            {tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {tags.map((tag, i) => (
                        <span key={i} style={{
                            fontSize: 10, fontWeight: 600, color: '#065F46',
                            background: '#D1FAE5', padding: '3px 9px', borderRadius: 5,
                            letterSpacing: '0.03em',
                        }}>
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Note */}
            {entry.note && (
                <div style={{
                    background: '#FFF',
                    borderRadius: 12,
                    padding: isMobile ? '14px 16px' : '18px 22px',
                    border: '1px solid #E7E5E4',
                    lineHeight: 1.75,
                    fontSize: 14,
                    color: '#292524',
                    whiteSpace: 'pre-wrap',
                }}>
                    <div style={{
                        fontSize: 9, fontWeight: 700, color: '#D4AF37',
                        letterSpacing: '0.1em', marginBottom: 8,
                    }}>
                        NOTE
                    </div>
                    {entry.note}
                </div>
            )}
        </div>
    );
}
