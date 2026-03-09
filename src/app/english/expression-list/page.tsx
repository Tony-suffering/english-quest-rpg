'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
    ATLAS_EXPRESSIONS,
    CATEGORY_META,
    getByCategory,
    getCategoryStats,
    type ExpressionCategory,
    type AtlasExpression,
} from '@/data/english/expression-atlas';

const INTENSITY_LABELS: Record<1 | 2 | 3, { label: string; color: string; bg: string }> = {
    1: { label: 'Mild', color: '#16A34A', bg: '#F0FDF4' },
    2: { label: 'Medium', color: '#D97706', bg: '#FFFBEB' },
    3: { label: 'Strong', color: '#DC2626', bg: '#FEF2F2' },
};

const SCENARIO_BADGES: Record<string, { label: string; color: string }> = {
    party: { label: 'Party', color: '#6366F1' },
    monster: { label: 'Monster', color: '#059669' },
    mariners: { label: 'Mariners', color: '#0284C7' },
    movie: { label: 'Movie', color: '#D946EF' },
    gamenight: { label: 'Game Night', color: '#DC2626' },
    antiques: { label: 'Antiques', color: '#B45309' },
};

export default function ExpressionListPage() {
    const [activeCategory, setActiveCategory] = useState<ExpressionCategory | 'all'>('all');
    const [search, setSearch] = useState('');
    const [intensityFilter, setIntensityFilter] = useState<1 | 2 | 3 | null>(null);
    const [scenarioFilter, setScenarioFilter] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const stats = useMemo(() => getCategoryStats(), []);
    const categories = Object.keys(CATEGORY_META) as ExpressionCategory[];

    const filtered = useMemo(() => {
        let items = activeCategory === 'all' ? ATLAS_EXPRESSIONS : getByCategory(activeCategory);
        if (intensityFilter) {
            items = items.filter(e => e.intensity === intensityFilter);
        }
        if (scenarioFilter) {
            items = items.filter(e => e.scenario === scenarioFilter);
        }
        if (search.trim()) {
            const q = search.toLowerCase();
            items = items.filter(e =>
                e.expression.toLowerCase().includes(q) ||
                e.meaning.includes(q) ||
                e.meaningEn.toLowerCase().includes(q) ||
                e.example.toLowerCase().includes(q)
            );
        }
        return items;
    }, [activeCategory, intensityFilter, scenarioFilter, search]);

    const groupedByIntensity = useMemo(() => {
        if (activeCategory === 'all') return null;
        const groups: Record<number, AtlasExpression[]> = { 1: [], 2: [], 3: [] };
        for (const e of filtered) {
            groups[e.intensity].push(e);
        }
        return groups;
    }, [filtered, activeCategory]);

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#FAFAF9',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
            {/* Header */}
            <div style={{
                backgroundColor: '#FFFFFF',
                borderBottom: '1px solid #E7E5E4',
                padding: isMobile ? '16px' : '20px 32px',
                position: 'sticky',
                top: 0,
                zIndex: 50,
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div>
                            <Link href="/english" style={{ fontSize: '12px', color: '#A8A29E', textDecoration: 'none' }}>
                                English
                            </Link>
                            <h1 style={{
                                fontSize: isMobile ? '20px' : '24px',
                                fontWeight: '700',
                                color: '#1C1917',
                                margin: '4px 0 0',
                                letterSpacing: '-0.5px',
                            }}>
                                Expression Atlas
                            </h1>
                            <p style={{ fontSize: '13px', color: '#78716C', margin: '2px 0 0' }}>
                                {ATLAS_EXPRESSIONS.length} expressions -- 10 categories -- intensity 1-3
                            </p>
                        </div>
                    </div>

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search expressions, meanings, examples..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 14px',
                            fontSize: '14px',
                            border: '1px solid #E7E5E4',
                            borderRadius: '10px',
                            outline: 'none',
                            backgroundColor: '#FAFAF9',
                            boxSizing: 'border-box',
                            marginBottom: '12px',
                        }}
                    />

                    {/* Category tabs */}
                    <div style={{
                        display: 'flex',
                        gap: '6px',
                        overflowX: 'auto',
                        paddingBottom: '4px',
                        flexWrap: isMobile ? 'nowrap' : 'wrap',
                    }}>
                        <button
                            onClick={() => setActiveCategory('all')}
                            style={{
                                padding: '6px 14px',
                                fontSize: '12px',
                                fontWeight: activeCategory === 'all' ? '700' : '400',
                                color: activeCategory === 'all' ? '#fff' : '#57534E',
                                backgroundColor: activeCategory === 'all' ? '#1C1917' : '#fff',
                                border: '1px solid',
                                borderColor: activeCategory === 'all' ? '#1C1917' : '#E7E5E4',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                            }}
                        >
                            ALL ({ATLAS_EXPRESSIONS.length})
                        </button>
                        {categories.map(cat => {
                            const meta = CATEGORY_META[cat];
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    style={{
                                        padding: '6px 14px',
                                        fontSize: '12px',
                                        fontWeight: isActive ? '700' : '400',
                                        color: isActive ? '#fff' : '#57534E',
                                        backgroundColor: isActive ? meta.color : '#fff',
                                        border: '1px solid',
                                        borderColor: isActive ? meta.color : '#E7E5E4',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0,
                                    }}
                                >
                                    {meta.label} ({stats[cat]})
                                </button>
                            );
                        })}
                    </div>

                    {/* Sub-filters: intensity + scenario */}
                    <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                        {([1, 2, 3] as const).map(level => {
                            const info = INTENSITY_LABELS[level];
                            const isActive = intensityFilter === level;
                            return (
                                <button
                                    key={level}
                                    onClick={() => setIntensityFilter(isActive ? null : level)}
                                    style={{
                                        padding: '4px 10px',
                                        fontSize: '11px',
                                        fontWeight: isActive ? '700' : '400',
                                        color: isActive ? info.color : '#78716C',
                                        backgroundColor: isActive ? info.bg : 'transparent',
                                        border: '1px solid',
                                        borderColor: isActive ? info.color : '#D6D3D1',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {info.label}
                                </button>
                            );
                        })}
                        <span style={{ width: '1px', backgroundColor: '#D6D3D1', margin: '0 4px' }} />
                        {Object.entries(SCENARIO_BADGES).map(([key, badge]) => {
                            const isActive = scenarioFilter === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setScenarioFilter(isActive ? null : key)}
                                    style={{
                                        padding: '4px 10px',
                                        fontSize: '11px',
                                        fontWeight: isActive ? '700' : '400',
                                        color: isActive ? badge.color : '#78716C',
                                        backgroundColor: isActive ? `${badge.color}10` : 'transparent',
                                        border: '1px solid',
                                        borderColor: isActive ? badge.color : '#D6D3D1',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {badge.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '16px' : '24px 32px' }}>
                {/* Category description when selected */}
                {activeCategory !== 'all' && (
                    <div style={{
                        backgroundColor: '#fff',
                        border: '1px solid #E7E5E4',
                        borderRadius: '12px',
                        padding: '16px 20px',
                        marginBottom: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            backgroundColor: `${CATEGORY_META[activeCategory].color}15`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '18px',
                            fontWeight: '700',
                            color: CATEGORY_META[activeCategory].color,
                            flexShrink: 0,
                        }}>
                            {CATEGORY_META[activeCategory].labelEn[0]}
                        </div>
                        <div>
                            <div style={{ fontSize: '16px', fontWeight: '700', color: '#1C1917' }}>
                                {CATEGORY_META[activeCategory].labelEn} -- {CATEGORY_META[activeCategory].label}
                            </div>
                            <div style={{ fontSize: '13px', color: '#78716C' }}>
                                {CATEGORY_META[activeCategory].desc} -- {filtered.length} expressions
                            </div>
                        </div>
                    </div>
                )}

                {/* Grouped by intensity when category selected */}
                {groupedByIntensity && !intensityFilter ? (
                    ([1, 2, 3] as const).map(level => {
                        const items = groupedByIntensity[level];
                        if (items.length === 0) return null;
                        const info = INTENSITY_LABELS[level];
                        return (
                            <div key={level} style={{ marginBottom: '24px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: '10px',
                                    padding: '0 4px',
                                }}>
                                    <span style={{
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        color: info.color,
                                        letterSpacing: '0.5px',
                                        textTransform: 'uppercase',
                                    }}>
                                        {info.label}
                                    </span>
                                    <span style={{
                                        height: '1px',
                                        flex: 1,
                                        backgroundColor: '#E7E5E4',
                                    }} />
                                    <span style={{ fontSize: '12px', color: '#A8A29E' }}>
                                        {items.length}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                    {items.map((expr, i) => (
                                        <ExpressionCard key={`${expr.expression}-${expr.scenario}-${i}`} expr={expr} isMobile={isMobile} />
                                    ))}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {filtered.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#A8A29E', fontSize: '14px' }}>
                                No expressions found.
                            </div>
                        )}
                        {filtered.map((expr, i) => (
                            <ExpressionCard key={`${expr.expression}-${expr.scenario}-${i}`} expr={expr} isMobile={isMobile} />
                        ))}
                    </div>
                )}

                {/* Stats footer */}
                <div style={{
                    marginTop: '32px',
                    padding: '20px',
                    backgroundColor: '#fff',
                    border: '1px solid #E7E5E4',
                    borderRadius: '12px',
                }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#1C1917', marginBottom: '12px' }}>
                        Category Breakdown
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
                        gap: '8px',
                    }}>
                        {categories.map(cat => {
                            const meta = CATEGORY_META[cat];
                            return (
                                <div key={cat} style={{
                                    padding: '10px',
                                    borderRadius: '8px',
                                    backgroundColor: `${meta.color}08`,
                                    border: `1px solid ${meta.color}20`,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                }} onClick={() => setActiveCategory(cat)}>
                                    <div style={{ fontSize: '20px', fontWeight: '700', color: meta.color }}>{stats[cat]}</div>
                                    <div style={{ fontSize: '11px', color: '#78716C' }}>{meta.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ExpressionCard({ expr, isMobile }: { expr: AtlasExpression; isMobile: boolean }) {
    const [expanded, setExpanded] = useState(false);
    const catMeta = CATEGORY_META[expr.category];
    const intInfo = INTENSITY_LABELS[expr.intensity];
    const scenBadge = SCENARIO_BADGES[expr.scenario];

    return (
        <div
            onClick={() => setExpanded(!expanded)}
            style={{
                backgroundColor: '#fff',
                border: '1px solid #E7E5E4',
                borderRadius: '10px',
                padding: isMobile ? '12px' : '12px 16px',
                cursor: 'pointer',
                transition: 'box-shadow 0.15s ease',
            }}
        >
            {/* Top row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {/* Expression */}
                <span style={{
                    fontSize: isMobile ? '14px' : '15px',
                    fontWeight: '600',
                    color: '#1C1917',
                }}>
                    {expr.expression}
                </span>

                {/* Intensity dot */}
                <span style={{
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: intInfo.bg,
                    color: intInfo.color,
                    fontWeight: '600',
                }}>
                    {expr.intensity}
                </span>

                {/* Category badge */}
                <span style={{
                    fontSize: '10px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: `${catMeta.color}15`,
                    color: catMeta.color,
                    fontWeight: '600',
                }}>
                    {catMeta.labelEn}
                </span>

                {/* Spacer */}
                <span style={{ flex: 1 }} />

                {/* Japanese meaning */}
                <span style={{
                    fontSize: '13px',
                    color: '#78716C',
                }}>
                    {expr.meaning}
                </span>
            </div>

            {/* Expanded content */}
            {expanded && (
                <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #F5F5F4' }}>
                    {/* English explanation */}
                    <div style={{ fontSize: '13px', color: '#57534E', marginBottom: '8px' }}>
                        {expr.meaningEn}
                    </div>

                    {/* Example */}
                    <div style={{
                        fontSize: '13px',
                        color: '#1C1917',
                        backgroundColor: '#FAFAF9',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        fontStyle: 'italic',
                        lineHeight: '1.5',
                        marginBottom: '8px',
                    }}>
                        &ldquo;{expr.example}&rdquo;
                    </div>

                    {/* Meta: speaker + scenario */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: '#A8A29E' }}>
                            -- {expr.speaker}
                        </span>
                        <span style={{
                            fontSize: '10px',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            backgroundColor: `${scenBadge.color}10`,
                            color: scenBadge.color,
                            fontWeight: '600',
                        }}>
                            {scenBadge.label} D{expr.day}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
