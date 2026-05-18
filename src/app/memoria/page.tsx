'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { MemoriaStorage } from '@/lib/memoria-storage';
import { MemoriaEntry } from '@/types/memoria';
import { journalEntries } from '@/data/journal';
import { labEntries } from '@/data/lab';
import { collegePartyRecapEntries } from '@/data/english/college-party-recap';
import { monsterUnderBedEntries } from '@/data/english/monster-under-bed';
import { marinersTradeEntries } from '@/data/english/mariners-trade-talk';
import { skeletonTalkEntries } from '@/data/english/skeleton-talk';
import { movieNightEntries } from '@/data/english/movie-night';
import { gameNightEntries } from '@/data/english/game-night-chaos';
import { antiquesHouseEntries } from '@/data/english/antiques-house';
import { bucketListTripEntries } from '@/data/english/bucket-list-trip';
import { bbqNeighborhoodEntries } from '@/data/english/bbq-neighborhood';
import { theJobEntries } from '@/data/english/365-the-job';
import { tokyo52Ep01Entries } from '@/data/english/tokyo52/ep01';
import { tokyo52Ep02Entries } from '@/data/english/tokyo52/ep02';

export default function MemoriaPage() {
    const [entries, setEntries] = useState<MemoriaEntry[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
    const [tabMode, setTabMode] = useState<'memoria' | 'tangent'>('memoria');
    const [tangentEntries, setTangentEntries] = useState<MemoriaEntry[]>([]);
    const [completedSet, setCompletedSet] = useState<Set<string>>(new Set());

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Load completion states
    useEffect(() => {
        const done = new Set<string>();
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith('memoria_') && key.endsWith('_completed')) {
                const id = key.replace('memoria_', '').replace('_completed', '');
                if (localStorage.getItem(key) === 'true') done.add(id);
            }
        }
        setCompletedSet(done);
    }, []);

    useEffect(() => {
        const loadEntries = async () => {
            const userEntries = await MemoriaStorage.getAll();

            const journalMemoriaEntries: MemoriaEntry[] = journalEntries
                .filter(entry => entry.conversationData)
                .map(entry => ({
                    id: `journal-${entry.id}`,
                    date: entry.date,
                    title: entry.title,
                    content: entry.summary,
                    conversation: entry.conversationData,
                    tone: entry.conversationData!.tone,
                    createdAt: entry.conversationData!.generatedAt,
                    updatedAt: entry.conversationData!.generatedAt,
                    tags: [...entry.businessTags, ...entry.techTags],
                    heroImage: entry.heroImage,
                }));

            const tangentMemoriaEntries: MemoriaEntry[] = journalEntries
                .filter(entry => entry.tangentData)
                .map(entry => ({
                    id: `tangent-${entry.id}`,
                    date: entry.date,
                    title: entry.title,
                    content: entry.summary,
                    conversation: entry.tangentData,
                    tone: entry.tangentData!.tone,
                    createdAt: entry.tangentData!.generatedAt,
                    updatedAt: entry.tangentData!.generatedAt,
                    tags: [...entry.businessTags, ...entry.techTags],
                    heroImage: entry.heroImage,
                }));

            const labMemoriaEntries: MemoriaEntry[] = labEntries
                .filter(entry => entry.conversationData)
                .map(entry => ({
                    id: `lab-${entry.id}`,
                    date: entry.date,
                    title: entry.title,
                    content: entry.summary,
                    conversation: entry.conversationData,
                    tone: entry.conversationData!.tone,
                    createdAt: entry.conversationData!.generatedAt,
                    updatedAt: entry.conversationData!.generatedAt,
                    tags: [...entry.businessTags, ...entry.techTags],
                    heroImage: entry.heroImage,
                }));

            const partyMemoriaEntries: MemoriaEntry[] = collegePartyRecapEntries.map(e => ({
                id: e.id,
                date: e.date,
                title: e.title,
                content: e.content,
                conversation: e.conversation,
                tone: e.tone,
                series: e.series,
                seriesTitle: e.seriesTitle,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
                tags: e.tags,
            }));

            const monsterMemoriaEntries: MemoriaEntry[] = monsterUnderBedEntries.map(e => ({
                id: e.id,
                date: e.date,
                title: e.title,
                content: e.content,
                conversation: e.conversation,
                tone: e.tone,
                series: e.series,
                seriesTitle: e.seriesTitle,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
                tags: e.tags,
            }));

            const marinersMemoriaEntries: MemoriaEntry[] = marinersTradeEntries.map(e => ({
                id: e.id,
                date: e.date,
                title: e.title,
                content: e.content,
                conversation: e.conversation,
                tone: e.tone,
                series: e.series,
                seriesTitle: e.seriesTitle,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
                tags: e.tags,
            }));

            const skeletonMemoriaEntries: MemoriaEntry[] = skeletonTalkEntries.map(e => ({
                id: e.id,
                date: e.date,
                title: e.title,
                content: e.content,
                conversation: e.conversation,
                tone: e.tone,
                series: e.series,
                seriesTitle: e.seriesTitle,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
                tags: e.tags,
            }));

            const movieMemoriaEntries: MemoriaEntry[] = movieNightEntries.map(e => ({
                id: e.id,
                date: e.date,
                title: e.title,
                content: e.content,
                conversation: e.conversation,
                tone: e.tone,
                series: e.series,
                seriesTitle: e.seriesTitle,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
                tags: e.tags,
            }));

            const gameNightMemoriaEntries: MemoriaEntry[] = gameNightEntries.map(e => ({
                id: e.id,
                date: e.date,
                title: e.title,
                content: e.content,
                conversation: e.conversation,
                tone: e.tone,
                series: e.series,
                seriesTitle: e.seriesTitle,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
                tags: e.tags,
            }));

            const antiquesMemoriaEntries: MemoriaEntry[] = antiquesHouseEntries.map(e => ({
                id: e.id,
                date: e.date,
                title: e.title,
                content: e.content,
                conversation: e.conversation,
                tone: e.tone,
                series: e.series,
                seriesTitle: e.seriesTitle,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
                tags: e.tags,
            }));

            const bucketListMemoriaEntries: MemoriaEntry[] = bucketListTripEntries.map(e => ({
                id: e.id,
                date: e.date,
                title: e.title,
                content: e.content,
                conversation: e.conversation,
                tone: e.tone,
                series: e.series,
                seriesTitle: e.seriesTitle,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
                tags: e.tags,
            }));

            const bbqMemoriaEntries: MemoriaEntry[] = bbqNeighborhoodEntries.map(e => ({
                id: e.id,
                date: e.date,
                title: e.title,
                content: e.content,
                conversation: e.conversation,
                tone: e.tone,
                series: e.series,
                seriesTitle: e.seriesTitle,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
                tags: e.tags,
            }));

            const theJobMemoriaEntries: MemoriaEntry[] = theJobEntries.map(e => ({
                id: e.id,
                date: e.date,
                title: e.title,
                content: e.content,
                conversation: e.conversation,
                tone: e.tone,
                series: e.series,
                seriesTitle: e.seriesTitle,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
                tags: e.tags,
            }));

            const tokyo52MemoriaEntries: MemoriaEntry[] = tokyo52Ep01Entries.map(e => ({
                id: e.id,
                date: e.date,
                title: e.title,
                content: e.content,
                conversation: e.conversation,
                tone: e.tone,
                series: e.series,
                seriesTitle: e.seriesTitle,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
                tags: e.tags,
            }));

            const tokyo52Ep02MemoriaEntries: MemoriaEntry[] = tokyo52Ep02Entries.map(e => ({
                id: e.id,
                date: e.date,
                title: e.title,
                content: e.content,
                conversation: e.conversation,
                tone: e.tone,
                series: e.series,
                seriesTitle: e.seriesTitle,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt,
                tags: e.tags,
            }));

            const allEntries = [...theJobMemoriaEntries, ...tokyo52MemoriaEntries, ...tokyo52Ep02MemoriaEntries];
            setEntries(allEntries);
            setTangentEntries([]);
            localStorage.setItem('memoria_total', String(allEntries.length));
        };
        loadEntries();
    }, []);

    // Group entries by date
    const entriesByDate = useMemo(() => {
        const map = new Map<string, MemoriaEntry[]>();
        entries.forEach(entry => {
            const dateKey = entry.date.split('T')[0];
            if (!map.has(dateKey)) {
                map.set(dateKey, []);
            }
            map.get(dateKey)!.push(entry);
        });
        return map;
    }, [entries]);

    // Group entries by series
    const seriesGroups = useMemo(() => {
        const groups = new Map<string, { title: string; entries: MemoriaEntry[] }>();
        entries.forEach(entry => {
            if (entry.series) {
                if (!groups.has(entry.series)) {
                    groups.set(entry.series, {
                        title: entry.seriesTitle || entry.series,
                        entries: []
                    });
                }
                groups.get(entry.series)!.entries.push(entry);
            }
        });
        // Sort entries in each series by date
        groups.forEach(group => {
            group.entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        });
        return groups;
    }, [entries]);

    // Grouped items for list view (series grouped, singles separate)
    const listItems = useMemo(() => {
        const items: Array<{ type: 'single'; entry: MemoriaEntry } | { type: 'series'; seriesId: string; title: string; entries: MemoriaEntry[]; latestDate: string }> = [];
        const processedSeries = new Set<string>();

        // Sort all entries by date (newest first)
        const sorted = [...entries].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        sorted.forEach(entry => {
            if (entry.series) {
                // If we haven't processed this series yet
                if (!processedSeries.has(entry.series)) {
                    processedSeries.add(entry.series);
                    const seriesEntries = entries
                        .filter(e => e.series === entry.series)
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    items.push({
                        type: 'series',
                        seriesId: entry.series,
                        title: entry.seriesTitle || entry.series,
                        entries: seriesEntries,
                        latestDate: seriesEntries[0].date
                    });
                }
            } else {
                items.push({ type: 'single', entry });
            }
        });

        // Sort by latest date
        return items.sort((a, b) => {
            const dateA = a.type === 'single' ? a.entry.date : a.latestDate;
            const dateB = b.type === 'single' ? b.entry.date : b.latestDate;
            return new Date(dateB).getTime() - new Date(dateA).getTime();
        });
    }, [entries]);

    // Calendar helpers
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const navigateMonth = (direction: 'prev' | 'next') => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1));
            return newDate;
        });
        setSelectedDay(null);
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

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

    const selectedDayEntries = selectedDay ? entriesByDate.get(selectedDay) || [] : [];
    const rows = Math.ceil(calendarDays.length / 7);

    const getToneColors = (tone?: string): { from: string; to: string } => {
        switch (tone) {
            case 'philosophical':
            case 'reflective':
                return { from: '#6B21A8', to: '#A855F7' };
            case 'humorous':
            case 'comedic':
            case 'playful':
                return { from: '#C2410C', to: '#FB923C' };
            case 'casual':
                return { from: '#92400E', to: '#D4AF37' };
            case 'introspective':
            case 'melancholic':
                return { from: '#1E3A5F', to: '#3B82F6' };
            case 'energetic':
                return { from: '#991B1B', to: '#EF4444' };
            case 'cold_analytical':
            case 'analytical':
                return { from: '#374151', to: '#6B7280' };
            default:
                return { from: '#44403C', to: '#78716C' };
        }
    };

    return (
        <div style={{
            backgroundColor: '#f5f5f5',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Tab Bar */}
            <div style={{
                display: 'flex',
                backgroundColor: '#fff',
                borderBottom: '1px solid #e5e5e5',
                padding: '0 16px',
                flexShrink: 0
            }}>
                <button
                    onClick={() => setTabMode('memoria')}
                    style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: tabMode === 'memoria' ? '#1a1a1a' : '#999',
                        borderBottom: tabMode === 'memoria' ? '2px solid #D4AF37' : '2px solid transparent',
                        transition: 'all 0.15s ease'
                    }}
                >
                    Memoria
                </button>
                <button
                    onClick={() => setTabMode('tangent')}
                    style={{
                        padding: '10px 20px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: tabMode === 'tangent' ? '#1a1a1a' : '#999',
                        borderBottom: tabMode === 'tangent' ? '2px solid #D4AF37' : '2px solid transparent',
                        transition: 'all 0.15s ease'
                    }}
                >
                    Tangent
                </button>
            </div>

            {/* Header - Memoria only */}
            {tabMode === 'memoria' && (
            <div style={{
                padding: '12px 16px',
                backgroundColor: '#fff',
                borderBottom: '1px solid #e5e5e5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0
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
                            transition: 'all 0.15s ease'
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
                            transition: 'all 0.15s ease'
                        }}
                    >
                        リスト
                    </button>
                </div>

                {/* Center: Month Navigation (only in calendar mode) */}
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
                                color: '#666'
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
                                color: '#666'
                            }}
                        >
                            &#8250;
                        </button>
                    </div>
                ) : (
                    <div style={{ fontSize: '14px', color: '#888' }}>
                        {entries.length} 件の記事
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
                        opacity: viewMode === 'calendar' ? 1 : 0.5
                    }}
                    disabled={viewMode === 'list'}
                >
                    今日
                </button>
            </div>
            )}

            {/* Main Content */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                overflow: 'hidden',
                minHeight: 0
            }}>
                {/* Tangent View */}
                {tabMode === 'tangent' && (
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        backgroundColor: '#f5f5f5',
                        padding: '16px'
                    }}>
                        <div style={{
                            maxWidth: '700px',
                            margin: '0 auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        }}>
                            <div style={{ fontSize: '12px', color: '#888', fontWeight: '500', padding: '0 4px' }}>
                                {tangentEntries.length} conversations
                            </div>
                            {tangentEntries
                                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                .map(entry => {
                                    const lineCount = entry.conversation?.english?.length || 0;
                                    const dateObj = new Date(entry.date);
                                    return (
                                        <Link
                                            key={entry.id}
                                            href={`/memoria/${entry.id}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <div style={{
                                                backgroundColor: '#fff',
                                                borderRadius: '12px',
                                                padding: '16px 20px',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '16px',
                                                transition: 'all 0.15s ease',
                                                borderLeft: completedSet.has(entry.id) ? '3px solid #D4AF37' : '3px solid transparent'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                                            }}
                                            >
                                                <div style={{ flex: 1 }}>
                                                    <div style={{
                                                        fontSize: '15px',
                                                        fontWeight: '600',
                                                        color: '#1a1a1a',
                                                        lineHeight: '1.4',
                                                        marginBottom: '4px'
                                                    }}>
                                                        {entry.title}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '12px',
                                                        color: '#888',
                                                        display: 'flex',
                                                        gap: '12px',
                                                        alignItems: 'center'
                                                    }}>
                                                        <span>{dateObj.getFullYear()}/{dateObj.getMonth() + 1}/{dateObj.getDate()}</span>
                                                        <span style={{ color: '#ccc' }}>|</span>
                                                        <span>{lineCount} lines</span>
                                                    </div>
                                                </div>
                                                {completedSet.has(entry.id) ? (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                                        <path d="M20 6L9 17l-5-5" />
                                                    </svg>
                                                ) : (
                                                    <span style={{ color: '#ccc', fontSize: '18px', flexShrink: 0 }}>&#8250;</span>
                                                )}
                                            </div>
                                        </Link>
                                    );
                                })}
                            {tangentEntries.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
                                    No tangent conversations yet
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* List View - Grouped by Series */}
                {tabMode === 'memoria' && viewMode === 'list' && (
                    <div style={{
                        flex: 1,
                        overflowY: 'auto',
                        backgroundColor: '#f5f5f5',
                        padding: '16px'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            maxWidth: '900px',
                            margin: '0 auto'
                        }}>
                            {listItems.map((item, idx) => {
                                if (item.type === 'single') {
                                    // Single entry card
                                    const entry = item.entry;
                                    const dateObj = new Date(entry.date);
                                    return (
                                        <Link
                                            key={entry.id}
                                            href={`/memoria/${entry.id}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <div style={{
                                                backgroundColor: '#fff',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                transition: 'all 0.15s ease',
                                                borderLeft: `4px solid ${getToneColors(entry.tone).to}`,
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                                            }}
                                            >
                                                {/* Content */}
                                                <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                    <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px' }}>
                                                        {dateObj.getFullYear()}/{dateObj.getMonth() + 1}/{dateObj.getDate()}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '15px',
                                                        fontWeight: '600',
                                                        color: '#1a1a1a',
                                                        lineHeight: '1.4',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                    }}>
                                                        {entry.title}
                                                        {completedSet.has(entry.id) && (
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                                                <path d="M20 6L9 17l-5-5" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                } else {
                                    // Series card
                                    const firstEntry = item.entries[0];
                                    return (
                                        <div key={item.seriesId} style={{
                                            backgroundColor: '#fff',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                                        }}>
                                            {/* Series Header */}
                                            <div style={{
                                                background: 'linear-gradient(135deg, #D4AF37 0%, #b8962e 100%)',
                                                padding: '16px 20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}>
                                                <div>
                                                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', fontWeight: '600', marginBottom: '2px' }}>
                                                        SERIES
                                                    </div>
                                                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>
                                                        {item.title}
                                                    </div>
                                                </div>
                                                <div style={{
                                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                                    borderRadius: '20px',
                                                    padding: '4px 12px',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    color: '#fff'
                                                }}>
                                                    {item.entries.length} episodes
                                                </div>
                                            </div>
                                            {/* Episode List */}
                                            <div>
                                                {item.entries.map((entry, epIdx) => {
                                                    const dateObj = new Date(entry.date);
                                                    return (
                                                        <Link
                                                            key={entry.id}
                                                            href={`/memoria/${entry.id}`}
                                                            style={{ textDecoration: 'none' }}
                                                        >
                                                            <div style={{
                                                                padding: '12px 20px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '14px',
                                                                borderBottom: epIdx < item.entries.length - 1 ? '1px solid #f0f0f0' : 'none',
                                                                transition: 'background 0.15s ease'
                                                            }}
                                                            onMouseEnter={(e) => {
                                                                e.currentTarget.style.backgroundColor = '#fafafa';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.currentTarget.style.backgroundColor = 'transparent';
                                                            }}
                                                            >
                                                                {/* Episode Number */}
                                                                <div style={{
                                                                    width: '28px',
                                                                    height: '28px',
                                                                    borderRadius: '50%',
                                                                    backgroundColor: '#f5f5f5',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    fontSize: '12px',
                                                                    fontWeight: '700',
                                                                    color: '#D4AF37',
                                                                    flexShrink: 0
                                                                }}>
                                                                    {epIdx + 1}
                                                                </div>
                                                                {/* Title & Date */}
                                                                <div style={{ flex: 1 }}>
                                                                    <div style={{
                                                                        fontSize: '14px',
                                                                        fontWeight: '500',
                                                                        color: '#333',
                                                                        marginBottom: '2px'
                                                                    }}>
                                                                        {entry.title}
                                                                    </div>
                                                                    <div style={{ fontSize: '11px', color: '#999' }}>
                                                                        {dateObj.getMonth() + 1}/{dateObj.getDate()}
                                                                    </div>
                                                                </div>
                                                                {/* Status */}
                                                                <div style={{ color: completedSet.has(entry.id) ? '#D4AF37' : '#ccc', fontSize: '16px' }}>
                                                                    {completedSet.has(entry.id) ? (
                                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                            <path d="M20 6L9 17l-5-5" />
                                                                        </svg>
                                                                    ) : '→'}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                        {listItems.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
                                記事がありません
                            </div>
                        )}
                    </div>
                )}

                {/* Calendar Section */}
                {tabMode === 'memoria' && viewMode === 'calendar' && (
                <div style={{
                    flex: isMobile ? 'none' : '1',
                    height: isMobile ? '50%' : '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    backgroundColor: '#fff',
                    borderRight: isMobile ? 'none' : '1px solid #e5e5e5'
                }}>
                    {/* Day Headers */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        borderBottom: '1px solid #eee',
                        flexShrink: 0
                    }}>
                        {dayNames.map((day, index) => (
                            <div
                                key={day}
                                style={{
                                    textAlign: 'center',
                                    fontSize: '11px',
                                    color: index === 0 ? '#ef4444' : index === 6 ? '#3b82f6' : '#666',
                                    fontWeight: '600',
                                    padding: '8px 0'
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
                            const hasEntries = dayEntries.length > 0;
                            const entryWithImage = dayEntries.find(e => e.heroImage);
                            const firstEntry = dayEntries[0];
                            const toneBg = hasEntries && !entryWithImage ? getToneColors(firstEntry?.tone) : null;
                            const isTodayDate = isToday(day);
                            const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                            const isSelected = selectedDay === dateKey;
                            const dayOfWeek = (firstDayOfMonth + day - 1) % 7;

                            const allDayCompleted = dayEntries.length > 0 && dayEntries.every(e => completedSet.has(e.id));
                            const someDayCompleted = dayEntries.some(e => completedSet.has(e.id));

                            return (
                                <div
                                    key={day}
                                    onClick={() => hasEntries && setSelectedDay(isSelected ? null : dateKey)}
                                    style={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        borderRadius: '4px',
                                        cursor: hasEntries ? 'pointer' : 'default',
                                        backgroundColor: hasEntries ? '#fafaf9' : '#fff',
                                        boxShadow: isSelected ? '0 0 0 2px #D4AF37' : isTodayDate ? '0 0 0 2px #10b981' : 'none',
                                        borderLeft: hasEntries ? `3px solid ${getToneColors(firstEntry?.tone).to}` : 'none',
                                        aspectRatio: '1'
                                    }}
                                >
                                    {/* Content */}
                                    <div style={{
                                        padding: '4px',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>
                                        {/* Day Number + Completion */}
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                            <div style={{
                                                fontSize: '12px',
                                                fontWeight: '700',
                                                color: dayOfWeek === 0 ? '#ef4444' : dayOfWeek === 6 ? '#3b82f6' : hasEntries ? '#1a1a1a' : '#888',
                                            }}>
                                                {day}
                                            </div>
                                            {allDayCompleted && (
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20 6L9 17l-5-5" />
                                                </svg>
                                            )}
                                            {someDayCompleted && !allDayCompleted && (
                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D4AF37' }} />
                                            )}
                                        </div>

                                        {/* Entry Title */}
                                        {hasEntries && (
                                            <div style={{
                                                flex: 1,
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                paddingTop: '2px',
                                            }}>
                                                <div style={{
                                                    fontSize: '10px',
                                                    fontWeight: '500',
                                                    color: '#57534e',
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
                                                        marginTop: '2px',
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
                </div>
                )}

                {/* Right Panel: Selected Day or Series (only in calendar mode) */}
                {tabMode === 'memoria' && viewMode === 'calendar' && (
                <div style={{
                    flex: isMobile ? 'none' : '0 0 320px',
                    height: isMobile ? '50%' : '100%',
                    overflowY: 'auto',
                    backgroundColor: '#fafafa',
                    borderTop: isMobile ? '1px solid #e5e5e5' : 'none'
                }}>
                    {selectedDay && selectedDayEntries.length > 0 ? (
                        /* Selected Day Entries */
                        <div style={{ padding: '16px' }}>
                            <div style={{
                                fontSize: '12px',
                                color: '#888',
                                marginBottom: '12px',
                                fontWeight: '500'
                            }}>
                                {new Date(selectedDay).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })} - {selectedDayEntries.length}件
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {selectedDayEntries.map(entry => (
                                    <Link
                                        key={entry.id}
                                        href={`/memoria/${entry.id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <div style={{
                                            backgroundColor: '#fff',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                            borderLeft: `4px solid ${getToneColors(entry.tone).to}`,
                                        }}>
                                            <div style={{ padding: '12px' }}>
                                                {entry.series && (
                                                    <div style={{
                                                        fontSize: '10px',
                                                        color: '#D4AF37',
                                                        fontWeight: '600',
                                                        marginBottom: '4px'
                                                    }}>
                                                        {entry.seriesTitle}
                                                    </div>
                                                )}
                                                <div style={{
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    color: '#1a1a1a',
                                                    lineHeight: '1.4',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                }}>
                                                    {entry.title}
                                                    {completedSet.has(entry.id) && (
                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                                            <path d="M20 6L9 17l-5-5" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Series List */
                        <div style={{ padding: '16px' }}>
                            <div style={{
                                fontSize: '12px',
                                color: '#888',
                                marginBottom: '16px',
                                fontWeight: '500',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}>
                                Series
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {Array.from(seriesGroups.entries()).map(([seriesId, group]) => (
                                    <div key={seriesId} style={{
                                        backgroundColor: '#fff',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                    }}>
                                        <div style={{
                                            padding: '12px 16px',
                                            borderBottom: '1px solid #f0f0f0',
                                            backgroundColor: '#D4AF37'
                                        }}>
                                            <div style={{
                                                fontSize: '14px',
                                                fontWeight: '700',
                                                color: '#fff'
                                            }}>
                                                {group.title}
                                            </div>
                                            <div style={{
                                                fontSize: '11px',
                                                color: 'rgba(255,255,255,0.8)',
                                                marginTop: '2px'
                                            }}>
                                                {group.entries.length} episodes
                                            </div>
                                        </div>
                                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                            {group.entries.map((entry, idx) => (
                                                <Link
                                                    key={entry.id}
                                                    href={`/memoria/${entry.id}`}
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <div style={{
                                                        padding: '10px 16px',
                                                        borderBottom: idx < group.entries.length - 1 ? '1px solid #f5f5f5' : 'none',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '12px'
                                                    }}>
                                                        <div style={{
                                                            width: '24px',
                                                            height: '24px',
                                                            borderRadius: '50%',
                                                            backgroundColor: '#f5f5f5',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '11px',
                                                            fontWeight: '600',
                                                            color: '#888',
                                                            flexShrink: 0
                                                        }}>
                                                            {idx + 1}
                                                        </div>
                                                        <div style={{
                                                            flex: 1,
                                                            fontSize: '13px',
                                                            color: '#333',
                                                            lineHeight: '1.3'
                                                        }}>
                                                            {entry.title}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {seriesGroups.size === 0 && (
                                    <div style={{
                                        textAlign: 'center',
                                        padding: '40px 20px',
                                        color: '#888',
                                        fontSize: '13px'
                                    }}>
                                        日付をタップして記事を表示
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                )}
            </div>
        </div>
    );
}
