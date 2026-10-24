'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import * as d3Zoom from 'd3-zoom';
import * as d3Selection from 'd3-selection';
import { AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, Loader2 } from 'lucide-react';
import dotsData from '../../../data/world-map-dots.json';

// ── Stage Definitions ────────────────────────────────────────
interface StageInfo {
    id: number;
    city: string;
    cityJa: string;
    scenarioKey: string;
    title: string;
    titleJa: string;
    prologueDate: string;
    x: number; // dot-space x
    y: number; // dot-space y
    badgeColor: string;
    badgeIcon: string; // simple SVG path identifier
}

const STAGES: StageInfo[] = [
    {
        id: 1, city: 'Tokyo', cityJa: '東京',
        scenarioKey: 'party', title: 'College Party',
        titleJa: '大学パーティー', prologueDate: '2026-02-05',
        x: 178, y: 38, badgeColor: '#EF4444', badgeIcon: 'fire',
    },
    {
        id: 2, city: 'Los Angeles', cityJa: 'ロサンゼルス',
        scenarioKey: 'monster', title: 'Monster Under the Bed',
        titleJa: 'ベッドの下のモンスター', prologueDate: '2026-02-10',
        x: 293, y: 37, badgeColor: '#8B5CF6', badgeIcon: 'ghost',
    },
    {
        id: 3, city: 'Seattle', cityJa: 'シアトル',
        scenarioKey: 'mariners', title: 'Mariners Trade Talk',
        titleJa: '野球トレード談義', prologueDate: '2026-02-15',
        x: 289, y: 27, badgeColor: '#0284C7', badgeIcon: 'baseball',
    },
    {
        id: 4, city: 'New York', cityJa: 'ニューヨーク',
        scenarioKey: 'movie', title: 'First Movie Without Parents',
        titleJa: '親なし映画デビュー', prologueDate: '2026-02-20',
        x: 330, y: 30, badgeColor: '#F59E0B', badgeIcon: 'film',
    },
    {
        id: 5, city: 'London', cityJa: 'ロンドン',
        scenarioKey: 'gamenight', title: 'Game Night Gone Wrong',
        titleJa: 'ゲームナイト崩壊', prologueDate: '2026-02-25',
        x: 60, y: 27, badgeColor: '#10B981', badgeIcon: 'dice',
    },
    {
        id: 6, city: 'Paris', cityJa: 'パリ',
        scenarioKey: 'antiques', title: 'Antiques House Call',
        titleJa: '骨董鑑定パニック', prologueDate: '2026-03-02',
        x: 62, y: 30, badgeColor: '#D4AF37', badgeIcon: 'crown',
    },
];

const WORDS_PER_DAY = 10;
const WORDS_PER_SCENARIO = 50;
const START_DATE = new Date(2026, 0, 1);

function getDateForIndex(index: number): string {
    const dayIndex = Math.floor(index / WORDS_PER_DAY);
    const date = new Date(START_DATE);
    date.setDate(date.getDate() + dayIndex);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function getDatesForScenario(prologueDate: string): string[] {
    const start = new Date(prologueDate);
    const dates: string[] = [];
    for (let i = 0; i < 5; i++) {
        const d = new Date(start);
        d.setDate(d.getDate() + i);
        dates.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
    }
    return dates;
}

interface UserPhrase {
    id: string;
    phrase: string;
    type: string;
    meaning: string;
    mastery_level: number;
    created_at: string;
}

interface StageProgress {
    total: number;
    mastered: number; // mastery_level === 3
    percentage: number;
    isComplete: boolean;
}

// ── Badge SVG Components ─────────────────────────────────────
function BadgeIcon({ icon, color, size = 24, earned = false }: { icon: string; color: string; size?: number; earned?: boolean }) {
    const fill = earned ? color : '#78716C';
    const opacity = earned ? 1 : 0.3;
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity }}>
            {icon === 'fire' && (
                <path d="M12 2C6.48 8 4 12 4 15a8 8 0 0016 0c0-3-2.48-7-8-13zm0 18a6 6 0 01-6-6c0-2 1.5-5 6-10 4.5 5 6 8 6 10a6 6 0 01-6 6z" fill={fill} />
            )}
            {icon === 'ghost' && (
                <path d="M12 2a8 8 0 00-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 00-8-8zm-2 10a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill={fill} />
            )}
            {icon === 'baseball' && (
                <>
                    <circle cx="12" cy="12" r="10" stroke={fill} strokeWidth="2" fill="none" />
                    <path d="M6 3.5c2 2.5 2 6.5 0 9M18 3.5c-2 2.5-2 6.5 0 9M6 20.5c2-2.5 2-6.5 0-9M18 20.5c-2-2.5-2-6.5 0-9" stroke={fill} strokeWidth="1.5" fill="none" />
                </>
            )}
            {icon === 'film' && (
                <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 4h16M4 16h16M8 4v16M16 4v16" stroke={fill} strokeWidth="2" fill="none" />
            )}
            {icon === 'dice' && (
                <>
                    <rect x="3" y="3" width="18" height="18" rx="3" stroke={fill} strokeWidth="2" fill="none" />
                    <circle cx="8" cy="8" r="1.5" fill={fill} />
                    <circle cx="16" cy="8" r="1.5" fill={fill} />
                    <circle cx="12" cy="12" r="1.5" fill={fill} />
                    <circle cx="8" cy="16" r="1.5" fill={fill} />
                    <circle cx="16" cy="16" r="1.5" fill={fill} />
                </>
            )}
            {icon === 'crown' && (
                <path d="M2 20h20l-2-8-4 4-4-8-4 8-4-4-2 8zM4 20v2h16v-2" fill={fill} />
            )}
        </svg>
    );
}

// ── Curved Path between stages ───────────────────────────────
function curvedPath(x1: number, y1: number, x2: number, y2: number): string {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const cx = (x1 + x2) / 2 - dy * 0.2;
    const cy = (y1 + y2) / 2 + dx * 0.2;
    return `M ${x1 * 8} ${y1 * 8} Q ${cx * 8} ${cy * 8} ${x2 * 8} ${y2 * 8}`;
}

// ── Main Component ───────────────────────────────────────────
export default function WorldMapPage() {
    const [loading, setLoading] = useState(true);
    const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
    const [transform, setTransform] = useState({ k: 1, x: 0, y: 0 });
    const [selectedStage, setSelectedStage] = useState<number | null>(null);
    const [phrases, setPhrases] = useState<UserPhrase[]>([]);
    const [showBadges, setShowBadges] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const svgRef = useRef<SVGSVGElement>(null);
    const gRef = useRef<SVGGElement>(null);
    const zoomRef = useRef<d3Zoom.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

    // Process dots
    const dots = useMemo(() => {
        const allDots = dotsData as Array<{ x: number; y: number; region: string }>;
        const gridSize = 1;
        const seen = new Set<string>();
        return allDots.filter((dot) => {
            const gridKey = `${Math.floor(dot.x / gridSize)},${Math.floor(dot.y / gridSize)}`;
            if (seen.has(gridKey)) return false;
            seen.add(gridKey);
            return true;
        }).map((dot, i) => ({ ...dot, id: i }));
    }, []);

    // Fetch phrase data
    useEffect(() => {
        fetch('/api/user-phrases')
            .then(r => r.json())
            .then(data => {
                const list = Array.isArray(data) ? data : (data.phrases || []);
                setPhrases(list);
            })
            .catch(() => setPhrases([]));
    }, []);

    // Compute stage progress from phrases
    const stageProgress = useMemo(() => {
        const sorted = [...phrases].sort((a, b) => {
            if (a.created_at !== b.created_at) return a.created_at < b.created_at ? -1 : 1;
            return a.id < b.id ? -1 : 1;
        });
        const result: Record<number, StageProgress> = {};

        for (const stage of STAGES) {
            const dates = getDatesForScenario(stage.prologueDate);
            const stageWords = sorted.filter((p, idx) => {
                const dateStr = getDateForIndex(idx);
                return dates.includes(dateStr);
            });
            const mastered = stageWords.filter(w => w.mastery_level === 3).length;
            const total = stageWords.length || WORDS_PER_SCENARIO;
            result[stage.id] = {
                total,
                mastered,
                percentage: total > 0 ? Math.round((mastered / total) * 100) : 0,
                isComplete: mastered >= WORDS_PER_SCENARIO,
            };
        }
        return result;
    }, [phrases]);

    // Get stage status
    const getStageStatus = useCallback((stageId: number): 'complete' | 'current' | 'locked' => {
        const progress = stageProgress[stageId];
        if (!progress) return stageId === 1 ? 'current' : 'locked';
        if (progress.isComplete) return 'complete';
        // First incomplete stage is current
        for (const s of STAGES) {
            const p = stageProgress[s.id];
            if (!p || !p.isComplete) return s.id === stageId ? 'current' : (s.id < stageId ? 'current' : 'locked');
        }
        return 'locked';
    }, [stageProgress]);

    // Total stats
    const totalStats = useMemo(() => {
        let mastered = 0;
        let total = 0;
        let badges = 0;
        for (const stage of STAGES) {
            const p = stageProgress[stage.id];
            if (p) {
                mastered += p.mastered;
                total += p.total;
                if (p.isComplete) badges++;
            }
        }
        return { mastered, total: Math.max(total, STAGES.length * WORDS_PER_SCENARIO), badges };
    }, [stageProgress]);

    // Current stage
    const currentStageId = useMemo(() => {
        for (const s of STAGES) {
            const p = stageProgress[s.id];
            if (!p || !p.isComplete) return s.id;
        }
        return STAGES.length;
    }, [stageProgress]);

    useEffect(() => {
        const update = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
            setIsMobile(window.innerWidth < 768);
        };
        update();
        window.addEventListener('resize', update);
        setLoading(false);
        return () => window.removeEventListener('resize', update);
    }, []);

    // Initialize zoom
    useEffect(() => {
        if (!svgRef.current || !gRef.current) return;

        const zoom = d3Zoom.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.5, 20])
            .on('zoom', (event) => {
                if (gRef.current) {
                    d3Selection.select(gRef.current as any).attr('transform', event.transform.toString());
                    setTransform({ k: event.transform.k, x: event.transform.x, y: event.transform.y });
                }
            });

        zoomRef.current = zoom;
        const svg = d3Selection.select(svgRef.current);
        svg.call(zoom);

        // Center on Japan
        const japanX = 178 * 8;
        const japanY = 38 * 8;
        const scale = 1.5;
        const translateX = dimensions.width / 2 - japanX * scale;
        const translateY = dimensions.height / 2 - japanY * scale;
        svg.call(zoom.transform, d3Zoom.zoomIdentity.translate(translateX, translateY).scale(scale));
    }, [dimensions]);

    const handleZoom = useCallback((factor: number) => {
        if (!svgRef.current || !zoomRef.current) return;
        d3Selection.select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, factor);
    }, []);

    const handleReset = useCallback(() => {
        if (!svgRef.current || !zoomRef.current) return;
        const svg = d3Selection.select(svgRef.current);
        const japanX = 178 * 8;
        const japanY = 38 * 8;
        const scale = 1.5;
        svg.transition().duration(500).call(
            zoomRef.current.transform,
            d3Zoom.zoomIdentity.translate(dimensions.width / 2 - japanX * scale, dimensions.height / 2 - japanY * scale).scale(scale)
        );
    }, [dimensions]);

    const flyToStage = useCallback((stage: StageInfo) => {
        if (!svgRef.current || !zoomRef.current) return;
        const svg = d3Selection.select(svgRef.current);
        const scale = 3;
        const tx = dimensions.width / 2 - stage.x * 8 * scale;
        const ty = dimensions.height / 2 - stage.y * 8 * scale;
        svg.transition().duration(800).call(
            zoomRef.current.transform,
            d3Zoom.zoomIdentity.translate(tx, ty).scale(scale)
        );
    }, [dimensions]);

    const selectedStageInfo = selectedStage !== null ? STAGES.find(s => s.id === selectedStage) : null;

    return (
        <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', backgroundColor: '#F5F5F0', fontFamily: 'serif' }}>
            {/* Noise texture */}
            <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.15, mixBlendMode: 'multiply',
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
            }} />

            {/* Header */}
            <header style={{
                position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
                padding: isMobile ? '12px 16px' : '20px 24px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                pointerEvents: 'none',
            }}>
                <div style={{ pointerEvents: 'auto', display: 'flex', gap: '8px' }}>
                    <Link href="/english/training" style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '8px 14px', backgroundColor: '#EEECE5', border: '1px solid #D4B08C',
                        color: '#5D4037', fontSize: '12px', fontWeight: 600, textDecoration: 'none',
                        letterSpacing: '1px',
                    }}>
                        Training
                    </Link>
                    <button onClick={() => setShowBadges(!showBadges)} style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '8px 14px', backgroundColor: showBadges ? '#D4AF37' : '#EEECE5',
                        border: '1px solid #D4B08C', color: showBadges ? '#fff' : '#5D4037',
                        fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                        letterSpacing: '1px',
                    }}>
                        {totalStats.badges}/{STAGES.length}
                    </button>
                </div>

                <div style={{ textAlign: 'right', pointerEvents: 'auto' }}>
                    <h1 style={{
                        fontSize: isMobile ? '20px' : '28px', color: '#3E2723',
                        fontWeight: 900, letterSpacing: '3px', marginBottom: '4px',
                    }}>
                        WORLD MAP
                    </h1>
                    <div style={{ height: '2px', width: '60px', backgroundColor: '#8B5A2B', marginLeft: 'auto', marginBottom: '4px' }} />
                    <p style={{ fontSize: '11px', color: '#8D6E63', letterSpacing: '2px' }}>
                        Stage {currentStageId} / {STAGES.length}
                    </p>
                </div>
            </header>

            {/* SVG Map */}
            <main style={{ width: '100%', height: '100vh', cursor: 'move' }}>
                {loading ? (
                    <div style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: '8px', color: '#8B5A2B',
                    }}>
                        <Loader2 style={{ animation: 'spin 1s linear infinite' }} />
                        <span style={{ letterSpacing: '3px', fontSize: '13px' }}>MAP...</span>
                    </div>
                ) : (
                    <svg ref={svgRef} width={dimensions.width} height={dimensions.height} style={{ width: '100%', height: '100%' }}>
                        <defs>
                            {/* Pulse animation for current stage */}
                            <radialGradient id="pulse-glow">
                                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                            </radialGradient>
                            {/* Complete glow */}
                            <radialGradient id="complete-glow">
                                <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <g ref={gRef}>
                            {/* Dot matrix background */}
                            {dots.map((dot) => (
                                <circle
                                    key={dot.id}
                                    cx={dot.x * 8}
                                    cy={dot.y * 8}
                                    r={2.5}
                                    fill="#C4B5A0"
                                    opacity={0.4}
                                />
                            ))}

                            {/* Route lines between stages */}
                            {STAGES.slice(0, -1).map((stage, i) => {
                                const next = STAGES[i + 1];
                                const status = getStageStatus(stage.id);
                                const nextStatus = getStageStatus(next.id);
                                const isCompleteRoute = status === 'complete';
                                const isActiveRoute = status === 'current' || nextStatus === 'current';
                                return (
                                    <path
                                        key={`route-${stage.id}`}
                                        d={curvedPath(stage.x, stage.y, next.x, next.y)}
                                        fill="none"
                                        stroke={isCompleteRoute ? '#10B981' : isActiveRoute ? '#D4AF37' : '#A8A29E'}
                                        strokeWidth={isCompleteRoute ? 3 : 2}
                                        strokeDasharray={isCompleteRoute ? 'none' : '8 6'}
                                        opacity={isCompleteRoute ? 0.8 : isActiveRoute ? 0.6 : 0.25}
                                    >
                                        {isActiveRoute && (
                                            <animate
                                                attributeName="stroke-dashoffset"
                                                values="0;-28"
                                                dur="1.5s"
                                                repeatCount="indefinite"
                                            />
                                        )}
                                    </path>
                                );
                            })}

                            {/* Stage markers */}
                            {STAGES.map(stage => {
                                const status = getStageStatus(stage.id);
                                const progress = stageProgress[stage.id];
                                const cx = stage.x * 8;
                                const cy = stage.y * 8;

                                return (
                                    <g key={`stage-${stage.id}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedStage(stage.id === selectedStage ? null : stage.id);
                                            flyToStage(stage);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {/* Glow ring */}
                                        {status === 'current' && (
                                            <circle cx={cx} cy={cy} r={28} fill="url(#pulse-glow)">
                                                <animate attributeName="r" values="20;32;20" dur="2s" repeatCount="indefinite" />
                                                <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
                                            </circle>
                                        )}
                                        {status === 'complete' && (
                                            <circle cx={cx} cy={cy} r={24} fill="url(#complete-glow)" />
                                        )}

                                        {/* Outer ring */}
                                        <circle
                                            cx={cx} cy={cy} r={16}
                                            fill={status === 'complete' ? '#10B981' : status === 'current' ? '#D4AF37' : '#A8A29E'}
                                            opacity={status === 'locked' ? 0.4 : 1}
                                        />

                                        {/* Inner circle */}
                                        <circle
                                            cx={cx} cy={cy} r={12}
                                            fill={status === 'complete' ? '#ECFDF5' : status === 'current' ? '#FFFBEB' : '#F5F5F4'}
                                        />

                                        {/* Stage number or checkmark */}
                                        {status === 'complete' ? (
                                            <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
                                                fontSize="14" fontWeight="900" fill="#10B981">
                                                &#10003;
                                            </text>
                                        ) : status === 'locked' ? (
                                            <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
                                                fontSize="10" fontWeight="700" fill="#A8A29E">
                                                {stage.id}
                                            </text>
                                        ) : (
                                            <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
                                                fontSize="11" fontWeight="900" fill="#D4AF37">
                                                {stage.id}
                                            </text>
                                        )}

                                        {/* City label */}
                                        <text x={cx} y={cy + 28} textAnchor="middle" fontSize="9"
                                            fontWeight="700" fill={status === 'locked' ? '#A8A29E' : '#5D4037'}
                                            opacity={status === 'locked' ? 0.5 : 0.9}
                                            style={{ letterSpacing: '0.5px' }}>
                                            {stage.cityJa}
                                        </text>

                                        {/* Progress arc for current stage */}
                                        {status === 'current' && progress && progress.percentage > 0 && (
                                            <circle
                                                cx={cx} cy={cy} r={16}
                                                fill="none" stroke="#D4AF37" strokeWidth={3}
                                                strokeDasharray={`${(progress.percentage / 100) * 100.5} 100.5`}
                                                transform={`rotate(-90 ${cx} ${cy})`}
                                                opacity={0.8}
                                            />
                                        )}

                                        {/* Badge indicator for completed */}
                                        {status === 'complete' && (
                                            <g transform={`translate(${cx + 12}, ${cy - 14})`}>
                                                <circle r={7} fill={stage.badgeColor} />
                                                <text textAnchor="middle" dominantBaseline="middle"
                                                    fontSize="8" fontWeight="900" fill="#fff">
                                                    B
                                                </text>
                                            </g>
                                        )}
                                    </g>
                                );
                            })}
                        </g>
                    </svg>
                )}
            </main>

            {/* Zoom Controls */}
            <div style={{
                position: 'absolute', bottom: isMobile ? 80 : 20, left: 16,
                display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 20,
            }}>
                {[
                    { icon: <ZoomIn size={16} />, action: () => handleZoom(1.5), label: '+' },
                    { icon: <ZoomOut size={16} />, action: () => handleZoom(0.67), label: '-' },
                    { icon: <RotateCcw size={16} />, action: handleReset, label: 'R' },
                ].map((btn, i) => (
                    <button key={i} onClick={btn.action} style={{
                        padding: '10px', backgroundColor: '#EEECE5', border: '1px solid #D4B08C',
                        color: '#5D4037', cursor: 'pointer', display: 'flex', alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {btn.icon}
                    </button>
                ))}
            </div>

            {/* Player Stats Panel (bottom center) */}
            <div style={{
                position: 'absolute', bottom: isMobile ? 80 : 20,
                left: '50%', transform: 'translateX(-50%)', zIndex: 20,
            }}>
                <div style={{
                    backgroundColor: 'rgba(238,236,229,0.92)', backdropFilter: 'blur(8px)',
                    padding: '10px 20px', border: '1px solid #D4B08C',
                    display: 'flex', gap: '20px', alignItems: 'center',
                    fontSize: '12px', color: '#5D4037', fontWeight: 600, letterSpacing: '0.5px',
                }}>
                    <span>{totalStats.mastered} / {totalStats.total} GET</span>
                    <span style={{ color: '#D4AF37' }}>Stage {currentStageId}</span>
                    <span>{totalStats.badges} badges</span>
                </div>
            </div>

            {/* Stage Detail Card */}
            {selectedStageInfo && (() => {
                const progress = stageProgress[selectedStageInfo.id] || { total: 50, mastered: 0, percentage: 0, isComplete: false };
                const status = getStageStatus(selectedStageInfo.id);
                return (
                    <div style={{
                        position: 'absolute',
                        top: isMobile ? 'auto' : '80px',
                        bottom: isMobile ? 90 : 'auto',
                        right: isMobile ? '16px' : '24px',
                        left: isMobile ? '16px' : 'auto',
                        width: isMobile ? 'auto' : '300px',
                        zIndex: 30,
                        backgroundColor: 'rgba(238,236,229,0.97)',
                        backdropFilter: 'blur(12px)',
                        border: `2px solid ${status === 'complete' ? '#10B981' : status === 'current' ? '#D4AF37' : '#D4B08C'}`,
                        padding: '20px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    }}>
                        {/* Close button */}
                        <button onClick={() => setSelectedStage(null)} style={{
                            position: 'absolute', top: '8px', right: '12px',
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '18px', color: '#A8A29E',
                        }}>x</button>

                        {/* Stage header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <div style={{
                                width: '36px', height: '36px', borderRadius: '50%',
                                backgroundColor: status === 'complete' ? '#10B981' : status === 'current' ? '#D4AF37' : '#A8A29E',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#fff', fontWeight: 900, fontSize: '14px',
                            }}>
                                {status === 'complete' ? '\u2713' : selectedStageInfo.id}
                            </div>
                            <div>
                                <div style={{ fontSize: '15px', fontWeight: 800, color: '#3E2723' }}>
                                    {selectedStageInfo.cityJa}
                                </div>
                                <div style={{ fontSize: '11px', color: '#8D6E63' }}>
                                    {selectedStageInfo.city}
                                </div>
                            </div>
                        </div>

                        {/* Scenario title */}
                        <div style={{
                            fontSize: '13px', fontWeight: 600, color: '#5D4037',
                            marginBottom: '4px',
                        }}>
                            {selectedStageInfo.titleJa}
                        </div>
                        <div style={{
                            fontSize: '11px', color: '#A8A29E', marginBottom: '16px',
                        }}>
                            {selectedStageInfo.title}
                        </div>

                        {/* Progress bar */}
                        <div style={{ marginBottom: '12px' }}>
                            <div style={{
                                display: 'flex', justifyContent: 'space-between', marginBottom: '6px',
                                fontSize: '11px', color: '#78716C',
                            }}>
                                <span>{progress.mastered} / {progress.total}</span>
                                <span style={{
                                    fontWeight: 700,
                                    color: progress.isComplete ? '#10B981' : '#D4AF37',
                                }}>
                                    {progress.percentage}%
                                </span>
                            </div>
                            <div style={{
                                height: '6px', backgroundColor: '#E7E5E4', borderRadius: '3px',
                                overflow: 'hidden',
                            }}>
                                <div style={{
                                    height: '100%', borderRadius: '3px',
                                    width: `${progress.percentage}%`,
                                    backgroundColor: progress.isComplete ? '#10B981' : '#D4AF37',
                                    transition: 'width 0.5s ease',
                                }} />
                            </div>
                        </div>

                        {/* Badge */}
                        {progress.isComplete && (
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '8px',
                                padding: '8px 12px', backgroundColor: 'rgba(212,175,55,0.08)',
                                border: '1px solid rgba(212,175,55,0.2)', marginBottom: '12px',
                            }}>
                                <BadgeIcon icon={selectedStageInfo.badgeIcon} color={selectedStageInfo.badgeColor} size={20} earned />
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#D4AF37' }}>
                                    Badge GET!
                                </span>
                            </div>
                        )}

                        {/* Action button */}
                        {status !== 'locked' && (
                            <Link href={`/english/requiem`} style={{
                                display: 'block', textAlign: 'center',
                                padding: '10px', backgroundColor: status === 'complete' ? '#10B981' : '#D4AF37',
                                color: '#fff', fontWeight: 700, fontSize: '13px', textDecoration: 'none',
                                letterSpacing: '1px',
                            }}>
                                {status === 'complete' ? 'Review' : 'Training'}
                            </Link>
                        )}
                        {status === 'locked' && (
                            <div style={{
                                textAlign: 'center', padding: '10px',
                                backgroundColor: '#F5F5F4', color: '#A8A29E',
                                fontSize: '12px', fontWeight: 600,
                            }}>
                                Stage {selectedStageInfo.id - 1} Clear
                            </div>
                        )}
                    </div>
                );
            })()}

            {/* Badge Collection Panel */}
            {showBadges && (
                <div style={{
                    position: 'absolute', top: isMobile ? 56 : 64, left: 16, zIndex: 30,
                    backgroundColor: 'rgba(238,236,229,0.97)', backdropFilter: 'blur(12px)',
                    border: '1px solid #D4B08C', padding: '16px', width: '240px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                }}>
                    <div style={{
                        fontSize: '11px', fontWeight: 700, color: '#8D6E63',
                        letterSpacing: '2px', marginBottom: '12px',
                    }}>
                        BADGES
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                        {STAGES.map(stage => {
                            const earned = stageProgress[stage.id]?.isComplete || false;
                            return (
                                <div key={stage.id} style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                                }}>
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '50%',
                                        backgroundColor: earned ? 'rgba(212,175,55,0.1)' : '#F5F5F4',
                                        border: `2px solid ${earned ? stage.badgeColor : '#E7E5E4'}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <BadgeIcon icon={stage.badgeIcon} color={stage.badgeColor} size={22} earned={earned} />
                                    </div>
                                    <span style={{
                                        fontSize: '9px', fontWeight: 600,
                                        color: earned ? '#5D4037' : '#A8A29E',
                                    }}>
                                        {stage.cityJa}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Mobile Stage Selector (bottom bar) */}
            {isMobile && (
                <div style={{
                    position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 25,
                    backgroundColor: 'rgba(238,236,229,0.95)', backdropFilter: 'blur(8px)',
                    borderTop: '1px solid #D4B08C', padding: '8px 12px',
                    display: 'flex', justifyContent: 'space-around',
                }}>
                    {STAGES.map(stage => {
                        const status = getStageStatus(stage.id);
                        const isSelected = selectedStage === stage.id;
                        return (
                            <button key={stage.id} onClick={() => {
                                setSelectedStage(isSelected ? null : stage.id);
                                flyToStage(stage);
                            }} style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                border: `2px solid ${isSelected ? '#D4AF37' : status === 'complete' ? '#10B981' : status === 'current' ? '#D4AF37' : '#D4D4D4'}`,
                                backgroundColor: status === 'complete' ? '#ECFDF5' : status === 'current' ? '#FFFBEB' : '#F5F5F4',
                                color: status === 'complete' ? '#10B981' : status === 'current' ? '#D4AF37' : '#A8A29E',
                                fontWeight: 800, fontSize: '13px', cursor: 'pointer',
                                opacity: status === 'locked' ? 0.4 : 1,
                            }}>
                                {status === 'complete' ? '\u2713' : stage.id}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* CSS for spin animation */}
            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
