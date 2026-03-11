'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as d3Geo from 'd3-geo';
import * as d3Zoom from 'd3-zoom';
import * as d3Selection from 'd3-selection';
import * as topojson from 'topojson-client';
import worldData from '../../../data/world-topo-50m.json';
import { STAGE_INFO, QUEST_PHRASES } from '@/data/quest-phrases';
import { getPlayerStats } from '@/lib/local-store';

// ── Types ─────────────────────────────────────────────────────
interface QuestProgress {
    stage: number;
    index: number;
    caught: Record<string, boolean>;
}

type StageStatus = 'completed' | 'current' | 'locked';

// ── Stage Locations ───────────────────────────────────────────
// Each stage = a real-world city. Journey: Tokyo → LA → London → ...
// Ordered to create a visually interesting route across the Pacific-centered map.
interface StageLocation {
    stage: number;
    lat: number;
    lng: number;
    city: string;
    country: string;
    regionJa: string;
}

const STAGE_LOCATIONS: StageLocation[] = [
    { stage: 1, lat: 35.68, lng: 139.69, city: 'Tokyo', country: 'Japan', regionJa: '日本' },
    { stage: 2, lat: 34.05, lng: -118.24, city: 'Los Angeles', country: 'USA', regionJa: 'アメリカ' },
    { stage: 3, lat: 51.51, lng: -0.13, city: 'London', country: 'UK', regionJa: 'イギリス' },
    { stage: 4, lat: -33.87, lng: 151.21, city: 'Sydney', country: 'Australia', regionJa: 'オーストラリア' },
    { stage: 5, lat: 49.28, lng: -123.12, city: 'Vancouver', country: 'Canada', regionJa: 'カナダ' },
    { stage: 6, lat: 48.86, lng: 2.35, city: 'Paris', country: 'France', regionJa: 'フランス' },
    { stage: 7, lat: 40.71, lng: -74.01, city: 'New York', country: 'USA', regionJa: 'アメリカ' },
    { stage: 8, lat: 55.76, lng: 37.62, city: 'Moscow', country: 'Russia', regionJa: 'ロシア' },
    { stage: 9, lat: -22.91, lng: -43.17, city: 'Rio de Janeiro', country: 'Brazil', regionJa: 'ブラジル' },
    { stage: 10, lat: 27.99, lng: 86.93, city: 'Mt. Everest', country: 'Nepal', regionJa: 'ネパール' },
];

// Route connections
const ROUTES: [number, number][] = [
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10],
];

// ── Map colors (wood tones from map-4) ────────────────────────
const MAP_COLORS = ['#E3C195', '#C69C6D', '#A67C52', '#D4B08C', '#8B5A2B'];

function hashColor(id: string): string {
    let h = 0;
    for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
    return MAP_COLORS[Math.abs(h) % MAP_COLORS.length];
}

// ── Progress ──────────────────────────────────────────────────
function loadProgress(): QuestProgress {
    try {
        const raw = localStorage.getItem('quest-progress');
        return raw ? JSON.parse(raw) : { stage: 1, index: 0, caught: {} };
    } catch {
        return { stage: 1, index: 0, caught: {} };
    }
}

function getCaughtIds(caught: Record<string, boolean>): string[] {
    return Object.keys(caught).filter(k => caught[k]);
}

function getStatus(stage: number, progress: QuestProgress): StageStatus {
    const phrases = QUEST_PHRASES.filter(p => p.stage === stage);
    const caughtIds = getCaughtIds(progress.caught);
    // Stage with no real phrases (stubs) - check if user has progressed past
    if (phrases.length <= 1 && stage > 3) {
        return stage <= progress.stage ? 'current' : 'locked';
    }
    const allCaught = phrases.length > 0 && phrases.every(p => caughtIds.includes(p.id));
    if (allCaught) return 'completed';
    if (stage <= progress.stage) return 'current';
    // Next stage unlocks when prev is complete
    if (stage > 1) {
        const prev = QUEST_PHRASES.filter(p => p.stage === stage - 1);
        if (prev.length > 0 && prev.every(p => caughtIds.includes(p.id))) return 'current';
    }
    return 'locked';
}

function stageCounts(stage: number, caught: Record<string, boolean>) {
    const phrases = QUEST_PHRASES.filter(p => p.stage === stage);
    const ids = getCaughtIds(caught);
    return { got: phrases.filter(p => ids.includes(p.id)).length, total: phrases.length };
}

// ── Status colors ─────────────────────────────────────────────
const STATUS_COLORS: Record<StageStatus, { fill: string; stroke: string; text: string; glow: string }> = {
    completed: { fill: '#065F46', stroke: '#10B981', text: '#10B981', glow: 'rgba(16,185,129,0.4)' },
    current: { fill: '#1C1917', stroke: '#D4AF37', text: '#D4AF37', glow: 'rgba(212,175,55,0.5)' },
    locked: { fill: '#44403C', stroke: '#78716C', text: '#78716C', glow: 'transparent' },
};

// ── Curved route path (Great Circle approximation) ────────────
function curvedPath(x1: number, y1: number, x2: number, y2: number): string {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Curve outward proportional to distance
    const offset = dist * 0.15;
    const nx = -dy / dist;
    const ny = dx / dist;
    const cx = mx + nx * offset;
    const cy = my + ny * offset;
    return `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`;
}

// ── Component ─────────────────────────────────────────────────
export default function WorldMapPage() {
    const router = useRouter();
    const [features, setFeatures] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [dims, setDims] = useState({ w: 1200, h: 800 });
    const [hovered, setHovered] = useState<number | null>(null);
    const [selected, setSelected] = useState<number | null>(null);
    const [mobile, setMobile] = useState(false);
    const [progress, setProgress] = useState<QuestProgress>({ stage: 1, index: 0, caught: {} });
    const [stats, setStats] = useState({ total_xp: 0, total_touches: 0, sparks: 0, pity_counter: 0, legendary_count: 0 });

    const svgRef = useRef<SVGSVGElement>(null);
    const gRef = useRef<SVGGElement>(null);

    // Init
    useEffect(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        setDims({ w, h });
        setMobile(w < 768);
        setProgress(loadProgress());
        setStats(getPlayerStats());

        if (worldData) {
            // @ts-ignore
            const countries = topojson.feature(worldData, worldData.objects.countries);
            // @ts-ignore
            setFeatures(countries.features.filter((f: any) =>
                f.id !== '010' && f.properties?.name !== 'Antarctica'
            ));
            setLoading(false);
        }

        const resize = () => { setDims({ w: window.innerWidth, h: window.innerHeight }); setMobile(window.innerWidth < 768); };
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    // Projection
    const projection = useMemo(() => {
        if (!features.length) return d3Geo.geoNaturalEarth1();
        return d3Geo.geoNaturalEarth1()
            .rotate([-150, 0])
            .fitExtent(
                [[60, 60], [dims.w - 60, dims.h - 60]],
                { type: 'FeatureCollection', features } as any
            );
    }, [dims, features]);

    const pathGen = useMemo(() => d3Geo.geoPath().projection(projection), [projection]);

    // D3 zoom
    useEffect(() => {
        if (!svgRef.current || !gRef.current) return;
        const zoom = d3Zoom.zoom<SVGSVGElement, unknown>()
            .scaleExtent([1, 8])
            .translateExtent([[-100, -100], [dims.w + 100, dims.h + 100]])
            .on('zoom', (e) => {
                if (gRef.current) d3Selection.select(gRef.current as any).attr('transform', e.transform);
            });
        d3Selection.select(svgRef.current).call(zoom);
    }, [dims, features]);

    // Stage screen coords
    const stageXY = useMemo(() => STAGE_LOCATIONS.map(loc => {
        const p = projection([loc.lng, loc.lat]);
        return { ...loc, x: p?.[0] ?? 0, y: p?.[1] ?? 0 };
    }), [projection]);

    // Navigate
    const go = useCallback((stage: number) => {
        const s = getStatus(stage, progress);
        if (s === 'locked') return;
        router.push(`/english/quest?stage=${stage}`);
    }, [progress, router]);

    // Derived
    const activeStage = selected ?? hovered;
    const activeInfo = activeStage ? STAGE_INFO.find(s => s.stage === activeStage) : null;
    const activeLoc = activeStage ? STAGE_LOCATIONS.find(l => l.stage === activeStage) : null;
    const activeStatus = activeStage ? getStatus(activeStage, progress) : null;
    const activeCounts = activeStage ? stageCounts(activeStage, progress.caught) : null;
    const totalCaught = getCaughtIds(progress.caught).length;

    // Find current stage (first non-completed)
    const currentStage = useMemo(() => {
        for (let i = 1; i <= 10; i++) {
            if (getStatus(i, progress) !== 'completed') return i;
        }
        return 10;
    }, [progress]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F0' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '32px', height: '32px', border: '3px solid #E7E5E4', borderTopColor: '#D4AF37', borderRadius: '50%', animation: 'wm-spin 0.8s linear infinite', margin: '0 auto 12px' }} />
                    <div style={{ fontSize: '12px', color: '#78716C', letterSpacing: '0.5px' }}>Loading map...</div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#F5F5F0' }}>
            <style>{`
                @keyframes wm-spin { to { transform: rotate(360deg); } }
                @keyframes wm-pulse { 0%,100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.8); opacity: 0; } }
                @keyframes wm-glow { 0%,100% { filter: drop-shadow(0 0 6px rgba(212,175,55,0.5)); } 50% { filter: drop-shadow(0 0 14px rgba(212,175,55,0.8)); } }
                @keyframes wm-dash { to { stroke-dashoffset: -24; } }
                @keyframes wm-slide { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes wm-flag { 0%,100% { transform: scaleX(1); } 50% { transform: scaleX(0.85); } }
            `}</style>

            {/* ── Top-left: Back + Title ───────────────────────── */}
            <div style={{
                position: 'absolute', top: 0, left: 0, zIndex: 20,
                padding: mobile ? '12px 14px' : '20px 24px', pointerEvents: 'none',
            }}>
                <Link href="/english/quest" style={{
                    pointerEvents: 'auto', display: 'inline-flex', alignItems: 'center', gap: '6px',
                    fontSize: '11px', fontWeight: '600', color: '#8B5A2B', textDecoration: 'none',
                    padding: '6px 14px', backgroundColor: 'rgba(245,245,240,0.92)', borderRadius: '8px',
                    border: '1px solid rgba(139,90,43,0.2)', backdropFilter: 'blur(8px)',
                }}>
                    Quest
                </Link>
                <h1 style={{
                    fontSize: mobile ? '18px' : '24px', fontWeight: '900', color: '#1C1917',
                    letterSpacing: '-0.5px', marginTop: '10px', lineHeight: 1.2,
                    textShadow: '0 1px 2px rgba(255,255,255,0.6)',
                }}>
                    World Map
                </h1>
                <p style={{ fontSize: '10px', color: '#8B5A2B', fontWeight: '600', letterSpacing: '2px', marginTop: '2px' }}>
                    ENGLISH QUEST RPG
                </p>
            </div>

            {/* ── Top-right: Player stats ──────────────────────── */}
            <div style={{
                position: 'absolute', top: mobile ? '12px' : '20px', right: mobile ? '14px' : '24px', zIndex: 20,
                backgroundColor: 'rgba(28,25,23,0.92)', borderRadius: '14px',
                padding: mobile ? '10px 14px' : '14px 20px',
                backdropFilter: 'blur(10px)', border: '1px solid rgba(212,175,55,0.15)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}>
                <div style={{ display: 'flex', gap: mobile ? '16px' : '24px' }}>
                    {/* GET count */}
                    <div>
                        <div style={{ fontSize: '8px', fontWeight: '700', color: 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', marginBottom: '2px' }}>GET</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                            <span style={{ fontSize: mobile ? '20px' : '26px', fontWeight: '900', color: '#D4AF37', lineHeight: 1 }}>{totalCaught}</span>
                            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>/{QUEST_PHRASES.length}</span>
                        </div>
                    </div>
                    {/* Sparks */}
                    <div>
                        <div style={{ fontSize: '8px', fontWeight: '700', color: 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', marginBottom: '2px' }}>SPARKS</div>
                        <span style={{ fontSize: mobile ? '20px' : '26px', fontWeight: '900', color: '#A855F7', lineHeight: 1 }}>{stats.sparks}</span>
                    </div>
                    {/* Stage */}
                    <div>
                        <div style={{ fontSize: '8px', fontWeight: '700', color: 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', marginBottom: '2px' }}>STAGE</div>
                        <span style={{ fontSize: mobile ? '20px' : '26px', fontWeight: '900', color: '#FAFAF9', lineHeight: 1 }}>{currentStage}</span>
                    </div>
                </div>
            </div>

            {/* ── Bottom-left: Zoom ────────────────────────────── */}
            <div style={{
                position: 'absolute', bottom: mobile ? '84px' : '24px', left: '24px',
                display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 20,
            }}>
                {[{ label: '+', f: 1.5 }, { label: '\u2212', f: 0.67 }].map(btn => (
                    <button key={btn.label} onClick={() => {
                        if (!svgRef.current) return;
                        d3Selection.select(svgRef.current).transition().duration(400)
                            .call((d3Zoom.zoom() as any).scaleBy, btn.f);
                    }} style={{
                        width: '34px', height: '34px', borderRadius: '10px', border: '1px solid rgba(139,90,43,0.2)',
                        backgroundColor: 'rgba(245,245,240,0.92)', backdropFilter: 'blur(8px)',
                        cursor: 'pointer', fontSize: '16px', fontWeight: '700', color: '#8B5A2B',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        {btn.label}
                    </button>
                ))}
            </div>

            {/* ── Stage detail card (bottom-right) ─────────────── */}
            {activeInfo && activeLoc && activeStatus && activeCounts && (
                <div style={{
                    position: 'absolute',
                    bottom: mobile ? '84px' : '24px', right: '24px',
                    width: mobile ? '260px' : '300px',
                    backgroundColor: 'rgba(28,25,23,0.96)', borderRadius: '16px',
                    padding: '20px', border: `1px solid ${STATUS_COLORS[activeStatus].stroke}30`,
                    boxShadow: `0 8px 32px rgba(0,0,0,0.25), 0 0 20px ${STATUS_COLORS[activeStatus].glow}`,
                    backdropFilter: 'blur(12px)', zIndex: 20,
                    animation: 'wm-slide 0.2s ease-out',
                }}>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                <span style={{
                                    fontSize: '10px', fontWeight: '800', letterSpacing: '2px',
                                    color: STATUS_COLORS[activeStatus].text,
                                }}>
                                    STAGE {activeInfo.stage}
                                </span>
                                <span style={{
                                    fontSize: '9px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px',
                                    backgroundColor: STATUS_COLORS[activeStatus].stroke + '18',
                                    color: STATUS_COLORS[activeStatus].text,
                                    border: `1px solid ${STATUS_COLORS[activeStatus].stroke}30`,
                                }}>
                                    {activeStatus === 'completed' ? 'CLEAR' : activeStatus === 'current' ? 'OPEN' : 'LOCKED'}
                                </span>
                            </div>
                            <div style={{ fontSize: '20px', fontWeight: '800', color: '#FAFAF9', lineHeight: 1.2 }}>
                                {activeLoc.city}
                            </div>
                            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>
                                {activeLoc.regionJa}
                            </div>
                        </div>
                    </div>

                    {/* Hack info */}
                    <div style={{
                        padding: '12px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.06)', marginBottom: '14px',
                    }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#D4AF37', marginBottom: '4px', lineHeight: 1.3 }}>
                            {activeInfo.title}
                        </div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.4, marginBottom: '8px' }}>
                            {activeInfo.titleJa}
                        </div>
                        <div style={{
                            fontSize: '11px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5,
                            paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)',
                        }}>
                            {activeInfo.hack}
                        </div>
                    </div>

                    {/* Progress */}
                    <div style={{ marginBottom: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontWeight: '600', letterSpacing: '1px' }}>PHRASES</span>
                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: '700' }}>
                                {activeCounts.got} / {activeCounts.total}
                            </span>
                        </div>
                        <div style={{ height: '6px', borderRadius: '3px', backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                            <div style={{
                                height: '100%',
                                width: activeCounts.total > 0 ? `${(activeCounts.got / activeCounts.total) * 100}%` : '0%',
                                borderRadius: '3px',
                                background: activeStatus === 'completed'
                                    ? 'linear-gradient(90deg, #10B981, #059669)'
                                    : 'linear-gradient(90deg, #D4AF37, #F6E27A)',
                                transition: 'width 0.4s ease',
                            }} />
                        </div>
                    </div>

                    {/* Core words */}
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '14px' }}>
                        {activeInfo.coreWords.slice(0, 5).map(w => (
                            <span key={w} style={{
                                fontSize: '10px', fontWeight: '700', padding: '3px 8px', borderRadius: '6px',
                                backgroundColor: 'rgba(212,175,55,0.1)', color: '#D4AF37',
                                border: '1px solid rgba(212,175,55,0.15)',
                            }}>{w}</span>
                        ))}
                    </div>

                    {/* Action button */}
                    {activeStatus !== 'locked' ? (
                        <button onClick={() => go(activeInfo.stage)} style={{
                            width: '100%', padding: '11px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                            backgroundColor: activeStatus === 'completed' ? '#065F46' : '#D4AF37',
                            color: activeStatus === 'completed' ? '#10B981' : '#1C1917',
                            fontSize: '13px', fontWeight: '800', letterSpacing: '1px',
                            boxShadow: activeStatus === 'completed' ? 'none' : '0 2px 12px rgba(212,175,55,0.3)',
                        }}>
                            {activeStatus === 'completed' ? 'REVISIT' : 'START QUEST'}
                        </button>
                    ) : (
                        <div style={{
                            width: '100%', padding: '11px', borderRadius: '10px', textAlign: 'center',
                            backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
                            color: 'rgba(255,255,255,0.25)', fontSize: '12px', fontWeight: '700', letterSpacing: '1px',
                        }}>
                            STAGE {activeInfo.stage - 1} CLEAR REQUIRED
                        </div>
                    )}
                </div>
            )}

            {/* ── Mobile: Stage selector bar ───────────────────── */}
            {mobile && (
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '72px',
                    backgroundColor: 'rgba(28,25,23,0.95)', borderTop: '1px solid rgba(212,175,55,0.1)',
                    backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center',
                    padding: '0 8px', gap: '4px', overflowX: 'auto', zIndex: 20,
                }}>
                    {STAGE_LOCATIONS.map(loc => {
                        const s = getStatus(loc.stage, progress);
                        const c = stageCounts(loc.stage, progress.caught);
                        const isActive = selected === loc.stage;
                        const sc = STATUS_COLORS[s];
                        return (
                            <button key={loc.stage} onClick={() => setSelected(isActive ? null : loc.stage)} style={{
                                flexShrink: 0, width: '52px', height: '52px', borderRadius: '12px',
                                border: isActive ? `2px solid ${sc.stroke}` : `1.5px solid ${sc.stroke}40`,
                                backgroundColor: isActive ? `${sc.stroke}15` : 'rgba(255,255,255,0.03)',
                                cursor: s === 'locked' ? 'default' : 'pointer',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                gap: '2px', padding: '4px', opacity: s === 'locked' ? 0.35 : 1,
                                transition: 'all 0.15s ease',
                            }}>
                                <span style={{ fontSize: '15px', fontWeight: '900', color: sc.text, lineHeight: 1 }}>{loc.stage}</span>
                                <span style={{ fontSize: '8px', fontWeight: '600', color: sc.text, opacity: 0.7 }}>
                                    {s === 'completed' ? 'CLEAR' : `${c.got}/${c.total}`}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* ── SVG Map ──────────────────────────────────────── */}
            <svg ref={svgRef} width={dims.w} height={dims.h} style={{ cursor: 'grab', display: 'block' }}>
                <defs>
                    <filter id="wm-shadow"><feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.15" /></filter>
                    <filter id="wm-glow-gold">
                        <feGaussianBlur stdDeviation="4" result="b" />
                        <feFlood floodColor="#D4AF37" floodOpacity="0.4" />
                        <feComposite in2="b" operator="in" />
                        <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="wm-glow-green">
                        <feGaussianBlur stdDeviation="3" result="b" />
                        <feFlood floodColor="#10B981" floodOpacity="0.3" />
                        <feComposite in2="b" operator="in" />
                        <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    {/* Paper texture */}
                    <filter id="wm-noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                </defs>

                {/* Paper texture overlay */}
                <rect width="100%" height="100%" filter="url(#wm-noise)" opacity="0.05" style={{ mixBlendMode: 'multiply' }} />

                <g ref={gRef}>
                    {/* Countries */}
                    {features.map((f: any) => (
                        <path
                            key={f.id || f.properties?.name}
                            d={pathGen(f) || ''}
                            fill={hashColor(f.id || '')}
                            stroke="#F5F5F0"
                            strokeWidth={0.5}
                        />
                    ))}

                    {/* Route lines */}
                    {ROUTES.map(([from, to]) => {
                        const a = stageXY.find(p => p.stage === from);
                        const b = stageXY.find(p => p.stage === to);
                        if (!a || !b) return null;
                        const sFrom = getStatus(from, progress);
                        const sTo = getStatus(to, progress);
                        const bothDone = sFrom === 'completed' && sTo === 'completed';
                        const active = sFrom !== 'locked' && sTo !== 'locked';
                        const oneActive = sFrom !== 'locked' || sTo !== 'locked';
                        const pathD = curvedPath(a.x, a.y, b.x, b.y);

                        return (
                            <g key={`r-${from}-${to}`}>
                                {/* Shadow */}
                                <path d={pathD} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={4} strokeLinecap="round" />
                                {/* Main line */}
                                <path
                                    d={pathD} fill="none"
                                    stroke={bothDone ? '#10B981' : active ? '#D4AF37' : oneActive ? '#A8A29E' : '#C4B5A4'}
                                    strokeWidth={bothDone ? 3 : active ? 2.5 : 1.5}
                                    strokeLinecap="round"
                                    strokeDasharray={bothDone ? 'none' : active ? '8 4' : '4 8'}
                                    opacity={active ? 0.9 : 0.25}
                                    filter={active && !bothDone ? 'url(#wm-glow-gold)' : bothDone ? 'url(#wm-glow-green)' : 'none'}
                                    style={{ animation: active && !bothDone ? 'wm-dash 1.2s linear infinite' : 'none' }}
                                />
                            </g>
                        );
                    })}

                    {/* Stage markers */}
                    {stageXY.map(pt => {
                        const s = getStatus(pt.stage, progress);
                        const sc = STATUS_COLORS[s];
                        const isHov = hovered === pt.stage || selected === pt.stage;
                        const isCurrent = pt.stage === currentStage;
                        const r = isHov ? 16 : isCurrent ? 13 : 10;
                        const c = stageCounts(pt.stage, progress.caught);

                        return (
                            <g
                                key={pt.stage}
                                style={{ cursor: s === 'locked' ? 'default' : 'pointer' }}
                                onMouseEnter={() => !mobile && setHovered(pt.stage)}
                                onMouseLeave={() => !mobile && setHovered(null)}
                                onClick={() => {
                                    if (mobile) { setSelected(selected === pt.stage ? null : pt.stage); }
                                    else if (s !== 'locked') go(pt.stage);
                                }}
                            >
                                {/* Pulse ring for current */}
                                {isCurrent && s === 'current' && (
                                    <circle cx={pt.x} cy={pt.y} r={r} fill="none" stroke={sc.stroke} strokeWidth={2}
                                        style={{ animation: 'wm-pulse 2s ease-out infinite', transformOrigin: `${pt.x}px ${pt.y}px` }} />
                                )}

                                {/* Drop shadow */}
                                <circle cx={pt.x} cy={pt.y + 2} r={r} fill="rgba(0,0,0,0.15)" />

                                {/* Outer ring */}
                                <circle cx={pt.x} cy={pt.y} r={r} fill={sc.fill} stroke={sc.stroke}
                                    strokeWidth={isCurrent ? 3 : isHov ? 2.5 : 2}
                                    filter={s === 'current' ? 'url(#wm-glow-gold)' : s === 'completed' ? 'url(#wm-glow-green)' : 'none'}
                                    style={{ transition: 'r 0.2s ease' }}
                                />

                                {/* Inner: stage number or checkmark */}
                                {s === 'completed' ? (
                                    <text x={pt.x} y={pt.y + 1} textAnchor="middle" dominantBaseline="central"
                                        style={{ fontSize: isHov ? '14px' : '11px', fontWeight: '900', fill: '#10B981', pointerEvents: 'none' }}>
                                        &#10003;
                                    </text>
                                ) : (
                                    <text x={pt.x} y={pt.y + 1} textAnchor="middle" dominantBaseline="central"
                                        style={{ fontSize: isHov ? '13px' : '10px', fontWeight: '900', fill: sc.text, pointerEvents: 'none' }}>
                                        {pt.stage}
                                    </text>
                                )}

                                {/* City label (always visible on desktop for non-locked, hover on locked) */}
                                {(!mobile && (s !== 'locked' || isHov)) && (
                                    <g>
                                        <rect x={pt.x - 35} y={pt.y - r - 24} width={70} height={20} rx={6}
                                            fill="rgba(28,25,23,0.9)" stroke={sc.stroke} strokeWidth={0.5} />
                                        <text x={pt.x} y={pt.y - r - 12} textAnchor="middle" dominantBaseline="central"
                                            style={{ fontSize: '9px', fontWeight: '700', fill: '#FAFAF9', letterSpacing: '0.3px', pointerEvents: 'none' }}>
                                            {pt.city}
                                        </text>
                                    </g>
                                )}

                                {/* Progress fraction below marker */}
                                {s !== 'locked' && !isHov && (
                                    <text x={pt.x} y={pt.y + r + 12} textAnchor="middle"
                                        style={{ fontSize: '8px', fontWeight: '700', fill: sc.text, opacity: 0.7, pointerEvents: 'none' }}>
                                        {s === 'completed' ? 'CLEAR' : `${c.got}/${c.total}`}
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
}
