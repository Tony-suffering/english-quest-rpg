'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { journalEntries } from '@/data/journal';
import { PUBLISHED_JOURNAL_IDS } from '@/data/journal/published';

export default function JournalPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-select today if it has entries
    useEffect(() => {
        const now = new Date();
        const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        if (entriesByDate.has(todayKey)) {
            setSelectedDay(todayKey);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const publishedEntries = useMemo(() => {
        if (PUBLISHED_JOURNAL_IDS.length === 0) return [];
        const idSet = new Set(PUBLISHED_JOURNAL_IDS);
        return journalEntries.filter(e => idSet.has(e.id));
    }, []);

    const entriesByDate = useMemo(() => {
        const map = new Map<string, typeof journalEntries>();
        publishedEntries.forEach(entry => {
            const existing = map.get(entry.date) || [];
            map.set(entry.date, [...existing, entry]);
        });
        return map;
    }, [publishedEntries]);

    const sortedEntries = useMemo(() => {
        return [...publishedEntries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [publishedEntries]);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

    const calendarDays: (number | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
    for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

    const today = new Date();
    const isToday = (day: number) => day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    const getEntriesForDay = (day: number) => {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return entriesByDate.get(dateKey) || [];
    };

    const selectedDayEntries = selectedDay
        ? (entriesByDate.get(selectedDay) || []).sort((a, b) => Number(b.id) - Number(a.id))
        : [];

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const d = new Date(prev);
            d.setMonth(d.getMonth() + (direction === 'prev' ? -1 : 1));
            return d;
        });
        setSelectedDay(null);
    };

    // Count entries in current month
    const monthEntryCount = useMemo(() => {
        let count = 0;
        for (let day = 1; day <= daysInMonth; day++) {
            count += getEntriesForDay(day).length;
        }
        return count;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year, month, daysInMonth]);

    return (
        <div style={{
            backgroundColor: '#f5f5f5',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }}>
            {/* Header */}
            <div style={{
                padding: '12px 16px',
                backgroundColor: '#fff',
                borderBottom: '1px solid #e5e5e5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0,
            }}>
                {/* Left: View Toggle */}
                <div style={{ display: 'flex', gap: '4px', backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '3px' }}>
                    <button
                        onClick={() => setViewMode('calendar')}
                        style={{
                            background: viewMode === 'calendar' ? '#fff' : 'transparent',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: viewMode === 'calendar' ? '#1a1a1a' : '#888',
                            boxShadow: viewMode === 'calendar' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        カレンダー
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        style={{
                            background: viewMode === 'list' ? '#fff' : 'transparent',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: viewMode === 'list' ? '#1a1a1a' : '#888',
                            boxShadow: viewMode === 'list' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        リスト
                    </button>
                </div>

                {/* Center: Month Navigation or Count */}
                {viewMode === 'calendar' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                            onClick={() => navigateMonth('prev')}
                            style={{
                                background: 'none',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                padding: '4px 10px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: '#666',
                            }}
                        >
                            &#8249;
                        </button>
                        <span style={{ fontSize: '16px', fontWeight: '700', color: '#1a1a1a', minWidth: '100px', textAlign: 'center' }}>
                            {year}年 {monthNames[month]}
                        </span>
                        <button
                            onClick={() => navigateMonth('next')}
                            style={{
                                background: 'none',
                                border: '1px solid #ddd',
                                borderRadius: '6px',
                                padding: '4px 10px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: '#666',
                            }}
                        >
                            &#8250;
                        </button>
                    </div>
                ) : (
                    <div style={{ fontSize: '14px', color: '#888' }}>
                        {publishedEntries.length} entries
                    </div>
                )}

                {/* Right: Today button */}
                <button
                    onClick={() => { setCurrentDate(new Date()); setSelectedDay(null); }}
                    style={{
                        background: '#D4AF37',
                        border: 'none',
                        color: '#fff',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        opacity: viewMode === 'calendar' ? 1 : 0.5,
                    }}
                    disabled={viewMode === 'list'}
                >
                    今日
                </button>
            </div>

            {/* Main Content */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                overflow: 'hidden',
                minHeight: 0,
            }}>
                {/* List View */}
                {viewMode === 'list' && (
                    <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f5f5f5', padding: '16px' }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            maxWidth: '720px',
                            margin: '0 auto',
                        }}>
                            {sortedEntries.map((entry) => (
                                <Link
                                    key={entry.id}
                                    href={`/journal/${entry.id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <div
                                        style={{
                                            backgroundColor: '#fff',
                                            borderRadius: '12px',
                                            padding: '14px 16px',
                                            border: '1px solid #e7e5e4',
                                            transition: 'all 0.15s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '14px',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = '#D4AF37';
                                            e.currentTarget.style.boxShadow = '0 2px 12px rgba(212,175,55,0.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = '#e7e5e4';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        {/* Entry number */}
                                        <div style={{
                                            width: '44px',
                                            height: '44px',
                                            borderRadius: '10px',
                                            backgroundColor: entry.featured ? '#FFFBEB' : '#F5F5F4',
                                            border: entry.featured ? '1px solid #FDE68A' : '1px solid #E7E5E4',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                            <span style={{
                                                fontSize: '14px',
                                                fontWeight: '700',
                                                color: entry.featured ? '#D4AF37' : '#78716C',
                                            }}>
                                                {entry.id}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                                                <span style={{ fontSize: '11px', color: '#A8A29E' }}>
                                                    {new Date(entry.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                                                </span>
                                                <span style={{ fontSize: '11px', color: '#A8A29E' }}>
                                                    {entry.readTime}min
                                                </span>
                                                {entry.featured && (
                                                    <span style={{
                                                        fontSize: '9px',
                                                        fontWeight: '700',
                                                        color: '#D4AF37',
                                                        letterSpacing: '0.5px',
                                                    }}>
                                                        FEATURED
                                                    </span>
                                                )}
                                            </div>
                                            <div style={{
                                                fontSize: '14px',
                                                fontWeight: '600',
                                                color: '#1C1917',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}>
                                                {entry.title}
                                            </div>
                                            <div style={{
                                                fontSize: '12px',
                                                color: '#A8A29E',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                marginTop: '2px',
                                            }}>
                                                {entry.summary}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Calendar Section */}
                {viewMode === 'calendar' && (
                    <div style={{
                        flex: isMobile ? 'none' : '1',
                        height: isMobile ? '50%' : '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowY: 'auto',
                        backgroundColor: '#fff',
                        borderRight: isMobile ? 'none' : '1px solid #e5e5e5',
                    }}>
                        {/* Day Headers */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            borderBottom: '1px solid #eee',
                            flexShrink: 0,
                        }}>
                            {dayNames.map((day, index) => (
                                <div
                                    key={day}
                                    style={{
                                        textAlign: 'center',
                                        fontSize: '11px',
                                        color: index === 0 ? '#ef4444' : index === 6 ? '#3b82f6' : '#666',
                                        fontWeight: '600',
                                        padding: '8px 0',
                                    }}
                                >
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(7, 1fr)',
                            gap: '2px',
                            padding: '4px',
                            backgroundColor: '#f0f0f0',
                        }}>
                            {calendarDays.map((day, index) => {
                                if (day === null) {
                                    return <div key={`empty-${index}`} style={{ backgroundColor: '#fafafa', aspectRatio: '1', borderRadius: '4px' }} />;
                                }

                                const dayEntries = getEntriesForDay(day);
                                const hasContent = dayEntries.length > 0;
                                const hasFeatured = dayEntries.some(e => e.featured);
                                const isTodayDate = isToday(day);
                                const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                                const isSelected = selectedDay === dateKey;
                                const dayOfWeek = (firstDayOfMonth + day - 1) % 7;

                                return (
                                    <div
                                        key={day}
                                        onClick={() => hasContent && setSelectedDay(isSelected ? null : dateKey)}
                                        style={{
                                            position: 'relative',
                                            overflow: 'hidden',
                                            borderRadius: '4px',
                                            cursor: hasContent ? 'pointer' : 'default',
                                            backgroundColor: hasContent
                                                ? (hasFeatured ? '#FFFBEB' : '#FFF')
                                                : '#fff',
                                            boxShadow: isSelected
                                                ? '0 0 0 2px #D4AF37'
                                                : isTodayDate
                                                    ? '0 0 0 2px #10b981'
                                                    : 'none',
                                            aspectRatio: '1',
                                            transition: 'box-shadow 0.15s ease',
                                        }}
                                    >
                                        <div style={{ padding: '4px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            {/* Day Number */}
                                            <div style={{
                                                fontSize: '12px',
                                                fontWeight: '700',
                                                color: hasContent
                                                    ? '#1C1917'
                                                    : dayOfWeek === 0 ? '#ef4444' : dayOfWeek === 6 ? '#3b82f6' : '#ccc',
                                            }}>
                                                {day}
                                            </div>

                                            {/* Entry indicator */}
                                            {hasContent && (
                                                <div style={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'flex-end',
                                                    minHeight: 0,
                                                }}>
                                                    <div style={{
                                                        fontSize: '9px',
                                                        fontWeight: '600',
                                                        color: hasFeatured ? '#D4AF37' : '#78716C',
                                                        lineHeight: '1.3',
                                                        overflow: 'hidden',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}>
                                                        {dayEntries[0].title}
                                                    </div>
                                                    {dayEntries.length > 1 && (
                                                        <div style={{
                                                            fontSize: '9px',
                                                            color: '#D4AF37',
                                                            fontWeight: '700',
                                                            marginTop: '1px',
                                                        }}>
                                                            +{dayEntries.length - 1}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Month stats */}
                        <div style={{
                            padding: '12px 16px',
                            backgroundColor: '#fafafa',
                            borderTop: '1px solid #eee',
                            marginTop: 'auto',
                        }}>
                            <div style={{ fontSize: '11px', color: '#D4AF37', fontWeight: '600', marginBottom: '4px' }}>
                                {monthNames[month]} -- {monthEntryCount} entries
                            </div>
                            <div style={{ fontSize: '11px', color: '#888', lineHeight: '1.5' }}>
                                Total: {publishedEntries.length} journal entries
                            </div>
                        </div>
                    </div>
                )}

                {/* Right Panel: Selected Day Entries (calendar mode only) */}
                {viewMode === 'calendar' && (
                    <div style={{
                        flex: isMobile ? 'none' : '0 0 400px',
                        height: isMobile ? '50%' : '100%',
                        overflowY: 'auto',
                        backgroundColor: '#fafafa',
                        borderTop: isMobile ? '1px solid #e5e5e5' : 'none',
                    }}>
                        {selectedDay && selectedDayEntries.length > 0 ? (
                            <div style={{ padding: '16px' }}>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#888',
                                    marginBottom: '12px',
                                    fontWeight: '500',
                                }}>
                                    {new Date(selectedDay + 'T00:00:00').toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })} -- {selectedDayEntries.length} entr{selectedDayEntries.length > 1 ? 'ies' : 'y'}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {selectedDayEntries.map(entry => (
                                        <Link
                                            key={entry.id}
                                            href={`/journal/${entry.id}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <div
                                                style={{
                                                    backgroundColor: '#fff',
                                                    borderRadius: '12px',
                                                    overflow: 'hidden',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                                    transition: 'all 0.15s ease',
                                                    border: entry.featured ? '1px solid #FDE68A' : '1px solid #e7e5e4',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
                                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                }}
                                            >
                                                {/* Hero image */}
                                                {entry.heroImage && (
                                                    <div style={{
                                                        position: 'relative',
                                                        aspectRatio: '16/9',
                                                        backgroundImage: `url(${entry.heroImage})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                    }}>
                                                        <div style={{
                                                            position: 'absolute',
                                                            inset: 0,
                                                            background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                                                        }} />
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '8px',
                                                            left: '8px',
                                                            backgroundColor: entry.featured ? '#D4AF37' : 'rgba(0,0,0,0.6)',
                                                            color: '#fff',
                                                            padding: '2px 8px',
                                                            borderRadius: '4px',
                                                            fontSize: '11px',
                                                            fontWeight: '700',
                                                        }}>
                                                            #{entry.id}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Content */}
                                                <div style={{ padding: '14px 16px' }}>
                                                    {!entry.heroImage && (
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '8px',
                                                            marginBottom: '6px',
                                                        }}>
                                                            <span style={{
                                                                fontSize: '11px',
                                                                fontWeight: '700',
                                                                color: entry.featured ? '#D4AF37' : '#A8A29E',
                                                            }}>
                                                                #{entry.id}
                                                            </span>
                                                            <span style={{ fontSize: '11px', color: '#A8A29E' }}>
                                                                {entry.readTime}min
                                                            </span>
                                                            {entry.featured && (
                                                                <span style={{
                                                                    fontSize: '9px',
                                                                    fontWeight: '700',
                                                                    color: '#D4AF37',
                                                                    backgroundColor: '#FFFBEB',
                                                                    padding: '1px 6px',
                                                                    borderRadius: '4px',
                                                                }}>
                                                                    FEATURED
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                    <div style={{
                                                        fontSize: '15px',
                                                        fontWeight: '700',
                                                        color: '#1C1917',
                                                        lineHeight: '1.4',
                                                        marginBottom: '6px',
                                                    }}>
                                                        {entry.title}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '12px',
                                                        color: '#78716C',
                                                        lineHeight: '1.5',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                    }}>
                                                        {entry.summary}
                                                    </div>
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '10px' }}>
                                                        {entry.businessTags.slice(0, 3).map(tag => (
                                                            <span key={tag} style={{
                                                                fontSize: '10px',
                                                                color: '#D4AF37',
                                                                backgroundColor: '#FFFBEB',
                                                                padding: '2px 8px',
                                                                borderRadius: '10px',
                                                                fontWeight: '500',
                                                            }}>
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                        {entry.techTags.slice(0, 2).map(tag => (
                                                            <span key={tag} style={{
                                                                fontSize: '10px',
                                                                color: '#78716C',
                                                                backgroundColor: '#F5F5F4',
                                                                padding: '2px 8px',
                                                                borderRadius: '10px',
                                                                fontWeight: '500',
                                                            }}>
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            /* Empty state */
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                padding: '32px',
                                textAlign: 'center',
                            }}>
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    backgroundColor: '#FFFBEB',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '16px',
                                }}>
                                    <span style={{ fontSize: '28px', fontWeight: '200', color: '#D4AF37', fontFamily: 'serif' }}>J</span>
                                </div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                                    Journal
                                </div>
                                <div style={{ fontSize: '12px', color: '#888', lineHeight: '1.5' }}>
                                    {publishedEntries.length > 0
                                        ? <>カレンダーから日付を選択して<br />記事を読む</>
                                        : <>記事を準備中です<br />もう少しお待ちください</>
                                    }
                                </div>
                                {publishedEntries.length > 0 && (
                                    <div style={{
                                        marginTop: '24px',
                                        padding: '12px 16px',
                                        backgroundColor: '#fff',
                                        borderRadius: '8px',
                                        border: '1px solid #e5e5e5',
                                        fontSize: '11px',
                                        color: '#666',
                                    }}>
                                        {publishedEntries.length} entries available
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
