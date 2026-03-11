'use client';

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { getAllPhrases, getCardPoints, getMastery } from '@/lib/local-store';
import type { TrainingPhrase } from '@/lib/local-store';
import {
    ELEMENT_COLORS, ELEMENT_LABELS, ELEMENT_ADVANTAGE,
    BST_STAT_NAMES_JA, BST_TIERS,
    calcBstStats, calcBstTotal, getBstTier,
    type BstTier,
} from '@/data/english/elements';

// ── Card Rank System ─────────────────────────────────────────
type CardRank = 'NORMAL' | 'BRONZE' | 'SILVER' | 'GOLD' | 'HOLOGRAPHIC' | 'LEGENDARY';

interface RankConfig {
    rank: CardRank;
    label: string;
    threshold: number;
    borderColor: string;
}

// Thresholds match Training page gacha system exactly
const CARD_RANKS: RankConfig[] = [
    { rank: 'LEGENDARY', label: 'LEGENDARY', threshold: 250, borderColor: '#D4AF37' },
    { rank: 'HOLOGRAPHIC', label: 'HOLOGRAPHIC', threshold: 100, borderColor: '#A855F7' },
    { rank: 'GOLD', label: 'GOLD', threshold: 50, borderColor: '#F6C85F' },
    { rank: 'SILVER', label: 'SILVER', threshold: 20, borderColor: '#94A3B8' },
    { rank: 'BRONZE', label: 'BRONZE', threshold: 5, borderColor: '#CD7F32' },
    { rank: 'NORMAL', label: 'NORMAL', threshold: 0, borderColor: '#D6D3D1' },
];

const RANK_ORDER: CardRank[] = ['LEGENDARY', 'HOLOGRAPHIC', 'GOLD', 'SILVER', 'BRONZE', 'NORMAL'];
const RANK_JA: Record<CardRank, string> = {
    LEGENDARY: '\u4F1D\u8AAC', HOLOGRAPHIC: '\u8679\u8272', GOLD: '\u91D1',
    SILVER: '\u9280', BRONZE: '\u9285', NORMAL: '\u666E\u901A',
};

const MAX_TILT: Record<CardRank, number> = {
    NORMAL: 6, BRONZE: 8, SILVER: 10, GOLD: 14, HOLOGRAPHIC: 18, LEGENDARY: 22,
};

function getCardRank(points: number): RankConfig {
    for (const r of CARD_RANKS) {
        if (points >= r.threshold) return r;
    }
    return CARD_RANKS[CARD_RANKS.length - 1];
}

function getNextRank(rank: CardRank): RankConfig | null {
    const idx = CARD_RANKS.findIndex(r => r.rank === rank);
    return idx > 0 ? CARD_RANKS[idx - 1] : null;
}

// ── Chakra Levels ────────────────────────────────────────────
const CHAKRA = [
    { name: 'SEED', ja: '\u7A2E', color: '#78716C' },
    { name: 'SPARK', ja: '\u706B', color: '#EF4444' },
    { name: 'FORGE', ja: '\u932C', color: '#F97316' },
    { name: 'OWN', ja: '\u5F97', color: '#EAB308' },
    { name: 'VOICE', ja: '\u58F0', color: '#10B981' },
    { name: 'VISION', ja: '\u773C', color: '#3B82F6' },
    { name: 'CROWN', ja: '\u51A0', color: '#A855F7' },
];

// ── Element Badge ────────────────────────────────────────────
function ElementBadge({ element, size = 10 }: { element: string; size?: number }) {
    const color = ELEMENT_COLORS[element] || '#78716C';
    const label = ELEMENT_LABELS[element] || element;
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '3px',
            padding: '1px 5px', borderRadius: '4px',
            backgroundColor: color + '15', border: `1px solid ${color}30`,
        }}>
            <span style={{
                width: `${size - 2}px`, height: `${size - 2}px`, borderRadius: '50%',
                backgroundColor: color,
            }} />
            <span style={{ fontSize: `${size - 2}px`, fontWeight: '700', color }}>{label}</span>
        </span>
    );
}

// ── Card Visual Helpers ──────────────────────────────────────
function getCardFrame(rank: CardRank): React.CSSProperties {
    const base: React.CSSProperties = { borderRadius: '16px', overflow: 'hidden' };
    switch (rank) {
        case 'NORMAL': return { ...base, border: '2px solid #E7E5E4', background: 'linear-gradient(180deg, #FFFFFF, #FAFAF9)' };
        case 'BRONZE': return { ...base, border: '2px solid #CD7F32', background: 'linear-gradient(180deg, #FDF8F0, #FAF0E4)' };
        case 'SILVER': return { ...base, border: '2px solid #94A3B8', background: 'linear-gradient(135deg, #F1F5F9, #E2E8F0)' };
        case 'GOLD': return { ...base, border: '2px solid #D4AF37', background: 'radial-gradient(ellipse at top, #FFFBEB, #FFF3CC)' };
        case 'HOLOGRAPHIC': return { ...base, border: '2px solid #A855F7', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(243,232,255,0.8))' };
        case 'LEGENDARY': return { ...base, border: '2px solid #D4AF37', background: 'radial-gradient(circle at center, #2D2438, #181A1B)' };
    }
}

function getCardShadow(rank: CardRank): string {
    switch (rank) {
        case 'NORMAL': return '0 2px 8px rgba(0,0,0,0.06)';
        case 'BRONZE': return '0 4px 12px rgba(205,127,50,0.15)';
        case 'SILVER': return '0 4px 16px rgba(148,163,184,0.2)';
        case 'GOLD': return '0 6px 20px rgba(212,175,55,0.25)';
        case 'HOLOGRAPHIC': return '0 8px 24px rgba(168,85,247,0.2), 0 0 12px rgba(168,85,247,0.1)';
        case 'LEGENDARY': return '0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.4)';
    }
}

function getCardWindowBg(rank: CardRank): string {
    switch (rank) {
        case 'NORMAL': return 'linear-gradient(180deg, #FAFAF9, #F5F5F4)';
        case 'BRONZE': return 'linear-gradient(180deg, #FDF8F0, #FAF0E4)';
        case 'SILVER': return 'linear-gradient(135deg, #F1F5F9, #E2E8F0)';
        case 'GOLD': return 'radial-gradient(ellipse at top, #FFFBEB, #FFF3CC)';
        case 'HOLOGRAPHIC': return 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(243,232,255,0.8))';
        case 'LEGENDARY': return 'radial-gradient(circle at center, #2D2438, #181A1B)';
    }
}

// ── Flavor Text (deterministic from ID) ──────────────────────
function getFlavorText(id: string): { en: string; ja: string } {
    const flavors = [
        { en: 'Every journey begins with a single phrase.', ja: '\u3059\u3079\u3066\u306E\u65C5\u306F\u4E00\u3064\u306E\u30D5\u30EC\u30FC\u30BA\u304B\u3089\u59CB\u307E\u308B\u3002' },
        { en: 'Words are the weapons of the wise.', ja: '\u8A00\u8449\u306F\u8CE2\u8005\u306E\u6B66\u5668\u3002' },
        { en: 'Speak and the world opens.', ja: '\u8A71\u305B\u3070\u4E16\u754C\u304C\u958B\u304F\u3002' },
        { en: 'Not all who wander are lost in translation.', ja: '\u3055\u307E\u3088\u3046\u8005\u304C\u307F\u306A\u8FF7\u5B50\u3068\u306F\u9650\u3089\u306A\u3044\u3002' },
        { en: 'The tongue is mightier than the sword.', ja: '\u820C\u306F\u5263\u3088\u308A\u5F37\u3057\u3002' },
        { en: 'A phrase caught is a world gained.', ja: '\u4E00\u3064\u306E\u30D5\u30EC\u30FC\u30BA\u304C\u4E16\u754C\u3092\u5E83\u3052\u308B\u3002' },
        { en: 'Language is the road map of a culture.', ja: '\u8A00\u8449\u306F\u6587\u5316\u306E\u5730\u56F3\u3002' },
        { en: 'To have another language is to possess a second soul.', ja: '\u3082\u3046\u4E00\u3064\u306E\u8A00\u8449\u306F\u3082\u3046\u4E00\u3064\u306E\u9B42\u3002' },
    ];
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
    return flavors[Math.abs(hash) % flavors.length];
}

// ── Card Data ────────────────────────────────────────────────
interface CardData {
    phrase: TrainingPhrase;
    points: number;
    rankConfig: RankConfig;
    chakra: number;
}

// ── 3D Tilt Hook ─────────────────────────────────────────────
function useCardTilt(rank: CardRank, enabled: boolean) {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({
        transform: 'rotateX(0deg) rotateY(0deg)', transition: 'transform 0.6s ease-out',
    });
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [isHovering, setIsHovering] = useState(false);
    const maxTilt = MAX_TILT[rank];

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (!enabled || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setStyle({ transform: `rotateX(${(y - 0.5) * -2 * maxTilt}deg) rotateY(${(x - 0.5) * 2 * maxTilt}deg)`, transition: 'none' });
        setMousePos({ x, y });
        setIsHovering(true);
    }, [enabled, maxTilt]);

    const onMouseLeave = useCallback(() => {
        setStyle({ transform: 'rotateX(0deg) rotateY(0deg)', transition: 'transform 0.6s ease-out' });
        setMousePos({ x: 0.5, y: 0.5 });
        setIsHovering(false);
    }, []);

    return { ref, style, mousePos, isHovering, onMouseMove, onMouseLeave };
}

// ── Card Nicknames (localStorage) ────────────────────────────
function saveNickname(phraseId: string, name: string) {
    try {
        const raw = localStorage.getItem('rpg_card_names');
        const names = raw ? JSON.parse(raw) : {};
        if (name.trim()) names[phraseId] = name.trim();
        else delete names[phraseId];
        localStorage.setItem('rpg_card_names', JSON.stringify(names));
    } catch { /* ignore */ }
}

function loadNicknames(): Record<string, string> {
    try {
        const raw = localStorage.getItem('rpg_card_names');
        return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
}

// ── Collection Card Component ────────────────────────────────
function CollectionCard({
    card, enableTilt = true, onClick, nickname,
}: {
    card: CardData; enableTilt?: boolean; onClick?: () => void; nickname?: string;
}) {
    const { phrase, points, rankConfig } = card;
    const rank = rankConfig.rank;
    const isHolo = rank === 'HOLOGRAPHIC' || rank === 'LEGENDARY';
    const isLegendary = rank === 'LEGENDARY';
    const isTextLight = rank === 'LEGENDARY';
    const w = 240;
    const h = 340;
    const frame = getCardFrame(rank);
    const shadow = getCardShadow(rank);
    const accent = rankConfig.borderColor;
    const tilt = useCardTilt(rank, enableTilt);

    const holoAngle = useMemo(() => {
        const dx = tilt.mousePos.x - 0.5;
        const dy = tilt.mousePos.y - 0.5;
        return Math.atan2(dy, dx) * (180 / Math.PI);
    }, [tilt.mousePos]);

    const holoGradient = isLegendary
        ? `linear-gradient(${holoAngle}deg, rgba(212,175,55,0.15) 0%, rgba(168,85,247,0.2) 25%, rgba(212,175,55,0.15) 50%, rgba(168,85,247,0.2) 75%, rgba(212,175,55,0.15) 100%)`
        : `linear-gradient(${holoAngle}deg, rgba(232,121,249,0.15) 0%, rgba(99,102,241,0.15) 20%, rgba(59,130,246,0.15) 40%, rgba(16,185,129,0.15) 60%, rgba(245,158,11,0.15) 80%, rgba(232,121,249,0.15) 100%)`;

    const specularBg = `radial-gradient(circle at ${tilt.mousePos.x * 100}% ${tilt.mousePos.y * 100}%, rgba(255,255,255,0.5) 0%, transparent 60%)`;

    const bstTotal = calcBstTotal(phrase.id);
    const bstTier = getBstTier(bstTotal);
    const ci = CHAKRA[card.chakra] || CHAKRA[0];

    return (
        <div style={{ perspective: '800px', cursor: onClick ? 'pointer' : 'default' }} onClick={onClick}>
            <div
                ref={tilt.ref}
                onMouseMove={tilt.onMouseMove}
                onMouseLeave={tilt.onMouseLeave}
                style={{
                    width: `${w}px`, height: `${h}px`, position: 'relative', overflow: 'hidden',
                    display: 'flex', flexDirection: 'column',
                    ...frame, boxShadow: shadow, padding: '6px',
                    ...tilt.style, willChange: 'transform',
                    ...(isLegendary ? { animation: 'card-legendary-aura 4s ease-in-out infinite' } : {}),
                    ...(rank === 'GOLD' ? { animation: 'card-gold-pulse 5s ease-in-out infinite' } : {}),
                }}
            >
                {/* Holographic overlay */}
                {isHolo && (
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: holoGradient, backgroundSize: '200% 200%',
                        animation: 'card-holo-shimmer 3s linear infinite',
                        borderRadius: '4px', pointerEvents: 'none', zIndex: 4,
                        opacity: tilt.isHovering ? 0.25 : 0.08,
                        transition: 'opacity 0.3s ease', mixBlendMode: 'overlay',
                    }} />
                )}

                {/* Specular */}
                {rank !== 'NORMAL' && rank !== 'BRONZE' && tilt.isHovering && (
                    <div style={{
                        position: 'absolute', inset: 0, background: specularBg,
                        borderRadius: '4px', pointerEvents: 'none', zIndex: 5,
                        opacity: 0.6, mixBlendMode: 'overlay',
                    }} />
                )}

                {/* Legendary particles */}
                {isLegendary && Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: `${3 + (i % 3)}px`, height: `${3 + (i % 3)}px`,
                        borderRadius: '50%',
                        background: i % 2 === 0 ? '#D4AF37' : '#A855F7',
                        left: `${10 + (i * 7) % 80}%`, top: `${5 + (i * 13) % 85}%`,
                        animation: `card-particle-float ${2 + (i % 3)}s ease-in-out infinite`,
                        animationDelay: `${i * 0.3}s`,
                        opacity: 0.7, zIndex: 6, pointerEvents: 'none', filter: 'blur(0.5px)',
                    }} />
                ))}

                {/* Top Name Bar */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '4px 8px',
                    backgroundColor: isTextLight ? 'rgba(255,255,255,0.06)' : `${accent}12`,
                    borderRadius: '8px 8px 0 0',
                    borderBottom: `1px solid ${isTextLight ? 'rgba(255,255,255,0.1)' : accent + '30'}`,
                    position: 'relative', zIndex: 7,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ElementBadge element={phrase.category} size={10} />
                        <span style={{
                            fontSize: '8px', fontWeight: '800',
                            color: nickname ? (isTextLight ? '#FAFAF9' : '#57534E') : rankConfig.borderColor,
                            letterSpacing: nickname ? '0.5px' : '1.5px',
                            maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            textShadow: isHolo && !nickname ? `0 0 8px ${rankConfig.borderColor}60` : 'none',
                        }}>
                            {nickname || (rank !== 'NORMAL' ? rankConfig.label : '')}
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                        <span style={{
                            fontSize: '11px', fontWeight: '900',
                            color: rank !== 'NORMAL' ? rankConfig.borderColor : '#A8A29E',
                            fontVariantNumeric: 'tabular-nums',
                        }}>{points}</span>
                        <span style={{ fontSize: '7px', fontWeight: '700', color: isTextLight ? 'rgba(255,255,255,0.4)' : '#A8A29E' }}>SP</span>
                    </div>
                </div>

                {/* Illustration Window */}
                <div style={{
                    flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                    background: getCardWindowBg(rank), borderRadius: '8px',
                    border: `1px solid ${isTextLight ? 'rgba(255,255,255,0.08)' : accent + '25'}`,
                    margin: '4px 0', padding: '12px', textAlign: 'center',
                    position: 'relative', zIndex: 7, overflow: 'hidden',
                }}>
                    {/* Rank-specific texture */}
                    {rank === 'BRONZE' && <div style={{ position: 'absolute', inset: 0, opacity: 0.04, background: 'repeating-linear-gradient(45deg, #CD7F32, #CD7F32 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />}
                    {rank === 'SILVER' && <div style={{ position: 'absolute', inset: 0, opacity: 0.05, background: 'repeating-linear-gradient(-45deg, #94A3B8, #94A3B8 1px, transparent 1px, transparent 14px)', pointerEvents: 'none' }} />}
                    {rank === 'GOLD' && <div style={{ position: 'absolute', inset: 0, opacity: 0.03, background: 'radial-gradient(circle at 30% 40%, #D4AF37 0.5px, transparent 0.5px)', backgroundSize: '16px 16px', pointerEvents: 'none' }} />}

                    <div style={{
                        fontSize: '16px', fontWeight: '800',
                        color: isTextLight ? '#FAFAF9' : '#1C1917',
                        lineHeight: 1.3, marginBottom: '8px', letterSpacing: '-0.3px',
                        position: 'relative',
                        textShadow: isTextLight ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
                    }}>
                        {phrase.english}
                    </div>
                    <div style={{
                        fontSize: '11px',
                        color: isTextLight ? 'rgba(255,255,255,0.5)' : '#78716C',
                        lineHeight: 1.4, position: 'relative',
                    }}>
                        {phrase.japanese}
                    </div>

                    {/* Flavor text */}
                    {(() => {
                        const flavor = getFlavorText(phrase.id);
                        return (
                            <div style={{
                                marginTop: '8px', paddingTop: '6px',
                                borderTop: `1px solid ${isTextLight ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                                position: 'relative',
                            }}>
                                <div style={{
                                    fontSize: '8px', fontStyle: 'italic',
                                    color: isTextLight ? 'rgba(255,255,255,0.35)' : '#A8A29E',
                                    lineHeight: 1.4, letterSpacing: '0.2px',
                                }}>
                                    &ldquo;{flavor.en}&rdquo;
                                </div>
                                <div style={{
                                    fontSize: '6.5px',
                                    color: isTextLight ? 'rgba(255,255,255,0.2)' : '#C4B5A4',
                                    lineHeight: 1.3, marginTop: '2px',
                                }}>
                                    {flavor.ja}
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* Bottom Bar */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '4px 8px',
                    backgroundColor: isTextLight ? 'rgba(255,255,255,0.04)' : `${accent}08`,
                    borderRadius: '0 0 8px 8px',
                    borderTop: `1px solid ${isTextLight ? 'rgba(255,255,255,0.08)' : accent + '20'}`,
                    position: 'relative', zIndex: 7,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '8px', fontWeight: '700', color: isTextLight ? 'rgba(255,255,255,0.35)' : '#A8A29E', letterSpacing: '1px' }}>
                            {rankConfig.label || 'NORMAL'}
                        </span>
                        <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '2px',
                            padding: '1px 5px', borderRadius: '4px',
                            backgroundColor: ci.color + (isTextLight ? '30' : '12'),
                            border: `1px solid ${ci.color}${isTextLight ? '50' : '25'}`,
                        }}>
                            <span style={{ fontSize: '8px', fontWeight: '900', color: ci.color, lineHeight: 1 }}>{ci.ja}</span>
                            <span style={{ fontSize: '6px', fontWeight: '700', color: ci.color, opacity: 0.7, letterSpacing: '0.3px' }}>{ci.name}</span>
                        </span>
                    </div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ fontSize: '7px', fontWeight: '800', color: bstTier.color, letterSpacing: '0.5px' }}>
                            {bstTier.tier} {bstTotal}
                        </span>
                        <span style={{ fontSize: '7px', fontWeight: '600', color: isTextLight ? 'rgba(255,255,255,0.3)' : '#A8A29E', fontFamily: 'monospace' }}>
                            {phrase.id.slice(0, 6)}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}

// ── Dashboard ────────────────────────────────────────────────
function CollectionDashboard({ cards }: { cards: CardData[] }) {
    const total = cards.length;
    const distribution = useMemo(() => {
        const dist: Record<CardRank, number> = { LEGENDARY: 0, HOLOGRAPHIC: 0, GOLD: 0, SILVER: 0, BRONZE: 0, NORMAL: 0 };
        cards.forEach(c => { dist[c.rankConfig.rank]++; });
        return dist;
    }, [cards]);
    const totalSP = useMemo(() => cards.reduce((sum, c) => sum + c.points, 0), [cards]);
    const rarestCard = useMemo(() => {
        if (cards.length === 0) return null;
        return cards.reduce((best, c) => c.points > best.points ? c : best, cards[0]);
    }, [cards]);
    const rareCount = distribution.LEGENDARY + distribution.HOLOGRAPHIC + distribution.GOLD;

    return (
        <div style={{ marginBottom: '28px' }}>
            {/* Hero stats */}
            <div style={{
                background: 'linear-gradient(135deg, #1C1917 0%, #292524 40%, #1C1917 100%)',
                borderRadius: '20px', padding: '28px 32px', marginBottom: '16px',
                position: 'relative', overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px rgba(212,175,55,0.1)',
            }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(168,85,247,0.04) 0%, transparent 50%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                    <div>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', marginBottom: '8px' }}>
                            COLLECTION
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                            <span style={{ fontSize: '52px', fontWeight: '900', color: '#FAFAF9', lineHeight: 1, letterSpacing: '-2px' }}>{total}</span>
                            <span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.3)', fontWeight: '500' }}>cards</span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.35)', letterSpacing: '2px', marginBottom: '8px' }}>
                            TOTAL SP
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', justifyContent: 'flex-end' }}>
                            <span style={{
                                fontSize: '36px', fontWeight: '900', lineHeight: 1, letterSpacing: '-1px',
                                background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 50%, #D4AF37 100%)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            }}>{totalSP.toLocaleString()}</span>
                            <span style={{ fontSize: '12px', color: '#D4AF37', fontWeight: '600', opacity: 0.6 }}>SP</span>
                        </div>
                    </div>
                </div>

                <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.2) 30%, rgba(168,85,247,0.2) 70%, transparent 100%)', margin: '20px 0 18px' }} />

                {/* Rank distribution bar */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.06)', marginBottom: '18px' }}>
                        {RANK_ORDER.map(rank => {
                            const count = distribution[rank];
                            if (count === 0) return null;
                            const cfg = CARD_RANKS.find(r => r.rank === rank)!;
                            return (
                                <div key={rank} style={{
                                    width: `${(count / (total || 1)) * 100}%`,
                                    backgroundColor: cfg.borderColor,
                                    opacity: rank === 'NORMAL' ? 0.25 : 0.9,
                                    minWidth: count > 0 ? '3px' : '0',
                                    transition: 'width 0.5s ease',
                                }} />
                            );
                        })}
                    </div>

                    {/* Rank tiles */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px' }}>
                        {RANK_ORDER.map(rank => {
                            const count = distribution[rank];
                            const cfg = CARD_RANKS.find(r => r.rank === rank)!;
                            const hasCards = count > 0;
                            return (
                                <div key={rank} style={{
                                    textAlign: 'center', padding: '10px 4px', borderRadius: '10px',
                                    backgroundColor: hasCards ? `${cfg.borderColor}10` : 'rgba(255,255,255,0.02)',
                                    border: `1px solid ${hasCards ? cfg.borderColor + '20' : 'rgba(255,255,255,0.04)'}`,
                                }}>
                                    <div style={{ fontSize: '22px', fontWeight: '900', color: hasCards ? cfg.borderColor : 'rgba(255,255,255,0.1)', lineHeight: 1, marginBottom: '4px' }}>{count}</div>
                                    <div style={{ fontSize: '9px', fontWeight: '700', color: hasCards ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)', letterSpacing: '0.5px' }}>{RANK_JA[rank]}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom row */}
            <div style={{ display: 'grid', gridTemplateColumns: rarestCard && rarestCard.points > 0 ? '1fr 2fr' : '1fr', gap: '12px' }}>
                <div style={{
                    background: 'linear-gradient(135deg, #FAF5FF, #F3E8FF)',
                    borderRadius: '16px', padding: '20px 24px',
                    border: '1px solid #E9D5FF', boxShadow: '0 2px 8px rgba(168,85,247,0.06)',
                }}>
                    <div style={{ fontSize: '11px', fontWeight: '600', color: '#A855F7', opacity: 0.6, marginBottom: '8px', letterSpacing: '1px' }}>RARE+</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                        <span style={{ fontSize: '40px', fontWeight: '900', color: '#7C3AED', lineHeight: 1, letterSpacing: '-1px' }}>{rareCount}</span>
                        <span style={{ fontSize: '14px', color: '#A78BFA', fontWeight: '500' }}>/ {total}</span>
                    </div>
                    <div style={{ marginTop: '10px', height: '4px', borderRadius: '2px', backgroundColor: 'rgba(168,85,247,0.1)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${total > 0 ? (rareCount / total) * 100 : 0}%`, borderRadius: '2px', background: 'linear-gradient(90deg, #A855F7, #7C3AED)', transition: 'width 0.5s ease' }} />
                    </div>
                </div>
                {rarestCard && rarestCard.points > 0 && (
                    <div style={{
                        background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
                        borderRadius: '16px', padding: '20px 24px',
                        border: '1px solid #FDE68A', boxShadow: '0 2px 8px rgba(212,175,55,0.08)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '11px', fontWeight: '600', color: '#B8941E', opacity: 0.7, marginBottom: '6px', letterSpacing: '1px' }}>TOP CARD</div>
                            <div style={{ fontSize: '15px', fontWeight: '800', color: '#1C1917', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{rarestCard.phrase.english}</div>
                            <div style={{ fontSize: '11px', color: '#78716C', marginTop: '4px' }}>{rarestCard.phrase.japanese}</div>
                        </div>
                        <div style={{
                            textAlign: 'center', flexShrink: 0, marginLeft: '20px',
                            padding: '12px 16px', borderRadius: '12px',
                            background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.05))',
                            border: '1px solid rgba(212,175,55,0.2)',
                        }}>
                            <div style={{ fontSize: '10px', fontWeight: '800', color: rarestCard.rankConfig.borderColor, letterSpacing: '1px', marginBottom: '4px' }}>{RANK_JA[rarestCard.rankConfig.rank]}</div>
                            <div style={{ fontSize: '28px', fontWeight: '900', color: '#B8941E', lineHeight: 1 }}>{rarestCard.points}</div>
                            <div style={{ fontSize: '9px', color: '#B8941E', opacity: 0.5, fontWeight: '600', marginTop: '2px' }}>SP</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ── Card Detail Modal ────────────────────────────────────────
function CardModal({ card, onClose, isMobile, nickname, onNicknameChange }: {
    card: CardData; onClose: () => void; isMobile: boolean;
    nickname: string; onNicknameChange: (name: string) => void;
}) {
    const nextRank = getNextRank(card.rankConfig.rank);
    const progressPct = nextRank
        ? Math.min(100, ((card.points - card.rankConfig.threshold) / (nextRank.threshold - card.rankConfig.threshold)) * 100)
        : 100;
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(nickname);
    const [mounted, setMounted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const bstStats = calcBstStats(card.phrase.id);
    const bstTotal = bstStats.reduce((a, b) => a + b, 0);
    const bstTier = getBstTier(bstTotal);
    const ci = CHAKRA[card.chakra] || CHAKRA[0];
    const statColors = ['#EF4444', '#F97316', '#EAB308', '#10B981', '#3B82F6', '#A855F7'];
    const maxStat = Math.max(...bstStats);
    const minStat = Math.min(...bstStats);
    const maxIdx = bstStats.indexOf(maxStat);
    const minIdx = bstStats.lastIndexOf(minStat);

    const accent = card.rankConfig.borderColor;
    const isLeg = card.rankConfig.rank === 'LEGENDARY';
    const isHolo = card.rankConfig.rank === 'HOLOGRAPHIC';

    useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);
    useEffect(() => { if (editing && inputRef.current) inputRef.current.focus(); }, [editing]);
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === 'Escape') { if (editing) setEditing(false); else onClose(); } };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [onClose, editing]);

    // Radar chart
    const cx = 90, cy = 90, radarR = 60, STAT_MAX = 120;
    const getPoint = (i: number, val: number) => {
        const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
        const pct = Math.max(val / STAT_MAX, 0.08);
        return { x: cx + radarR * pct * Math.cos(angle), y: cy + radarR * pct * Math.sin(angle) };
    };
    const statPoints = bstStats.map((v, i) => getPoint(i, v));
    const polygon = statPoints.map(p => `${p.x},${p.y}`).join(' ');

    const panelW = isMobile ? 310 : 360;

    return (
        <div onClick={onClose} style={{
            position: 'fixed', inset: 0,
            backgroundColor: mounted ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000, padding: '16px', transition: 'background-color 0.3s ease',
        }}>
            <div onClick={e => e.stopPropagation()} style={{
                width: panelW, maxHeight: '92vh', overflowY: 'auto',
                background: 'rgba(28,25,23,0.97)', borderRadius: '20px',
                border: `1.5px solid ${accent}50`,
                boxShadow: `0 12px 60px rgba(0,0,0,0.6), 0 0 30px ${accent}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
                padding: '0', position: 'relative',
                transform: mounted ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
                opacity: mounted ? 1 : 0,
                transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease',
            }}>
                {/* Close */}
                <button onClick={onClose} style={{
                    position: 'absolute', top: '8px', right: '8px',
                    width: '28px', height: '28px', borderRadius: '50%', border: 'none', cursor: 'pointer',
                    background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.6)',
                    fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 10,
                }}>x</button>

                {/* Header */}
                <div style={{
                    padding: '28px 24px 20px', background: getCardWindowBg(card.rankConfig.rank),
                    borderRadius: '20px 20px 0 0', borderBottom: `1px solid ${accent}30`,
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', position: 'relative' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ElementBadge element={card.phrase.category} size={16} />
                            <span style={{ fontSize: '11px', fontWeight: '800', color: accent, letterSpacing: '1.5px' }}>{card.rankConfig.label}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                            <span style={{ fontSize: '22px', fontWeight: '900', color: card.rankConfig.rank !== 'NORMAL' ? accent : '#A8A29E', fontFamily: 'monospace' }}>{card.points}</span>
                            <span style={{ fontSize: '10px', fontWeight: '700', color: '#A8A29E' }}>SP</span>
                        </div>
                    </div>
                    <div style={{
                        fontSize: '22px', fontWeight: '800', color: isLeg ? '#FAFAF9' : '#1C1917',
                        lineHeight: 1.35, marginBottom: '10px', textShadow: isLeg ? '0 1px 6px rgba(0,0,0,0.5)' : 'none',
                        wordBreak: 'break-word', letterSpacing: '-0.3px',
                    }}>{card.phrase.english}</div>
                    <div style={{ fontSize: '14px', color: isLeg ? 'rgba(255,255,255,0.55)' : '#78716C', lineHeight: 1.6, wordBreak: 'break-word' }}>{card.phrase.japanese}</div>

                    {/* Flavor */}
                    {(() => {
                        const flavor = getFlavorText(card.phrase.id);
                        return (
                            <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: `1px solid ${isLeg ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}>
                                <div style={{ fontSize: '12px', fontStyle: 'italic', color: isLeg ? 'rgba(255,255,255,0.45)' : '#8C7E6F', lineHeight: 1.5 }}>&ldquo;{flavor.en}&rdquo;</div>
                                <div style={{ fontSize: '10px', color: isLeg ? 'rgba(255,255,255,0.25)' : '#B5A99A', lineHeight: 1.4, marginTop: '4px' }}>{flavor.ja}</div>
                            </div>
                        );
                    })()}
                </div>

                {/* Stats */}
                <div style={{ padding: '16px 20px 12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {/* Rank progress */}
                    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '14px 16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.45)', letterSpacing: '1.2px' }}>RANK PROGRESS</span>
                            <span style={{ fontSize: '10px', fontWeight: '600', color: 'rgba(255,255,255,0.4)' }}>
                                {nextRank ? `${RANK_JA[nextRank.rank]} (${nextRank.threshold} SP)` : 'MAX'}
                            </span>
                        </div>
                        <div style={{ height: '8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                            <div style={{
                                height: '100%', width: mounted ? `${progressPct}%` : '0%', borderRadius: '4px',
                                background: nextRank ? `linear-gradient(90deg, ${accent}, ${nextRank.borderColor})` : `linear-gradient(90deg, #D4AF37, #A855F7)`,
                                transition: 'width 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
                                boxShadow: `0 0 8px ${accent}40`,
                            }} />
                        </div>
                        {nextRank && (
                            <div style={{ fontSize: '10px', color: accent + '80', marginTop: '5px', textAlign: 'right', fontWeight: '600' }}>
                                {nextRank.threshold - card.points} SP
                            </div>
                        )}
                    </div>

                    {/* BST Radar */}
                    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '14px 16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.45)', letterSpacing: '1.2px' }}>BST</span>
                                <span style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '0.5px', color: bstTier.color, backgroundColor: bstTier.color + '18', padding: '1px 6px', borderRadius: '4px' }}>{bstTier.ja}</span>
                            </div>
                            <span style={{ fontSize: '16px', fontWeight: '900', color: bstTier.color, fontFamily: 'monospace' }}>{bstTotal}</span>
                        </div>
                        <svg viewBox="0 0 180 185" style={{ width: '100%', maxWidth: '220px', display: 'block', margin: '0 auto' }}>
                            {[0.25, 0.5, 0.75, 1.0].map(level => {
                                const pts = Array.from({ length: 6 }, (_, i) => {
                                    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                                    return `${cx + radarR * level * Math.cos(angle)},${cy + radarR * level * Math.sin(angle)}`;
                                }).join(' ');
                                return <polygon key={level} points={pts} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />;
                            })}
                            {Array.from({ length: 6 }, (_, i) => {
                                const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                                return <line key={i} x1={cx} y1={cy} x2={cx + radarR * Math.cos(angle)} y2={cy + radarR * Math.sin(angle)} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />;
                            })}
                            <polygon points={polygon} fill={`${bstTier.color}20`} stroke={bstTier.color} strokeWidth="1.5"
                                style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.3s' }} />
                            {statPoints.map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y}
                                    r={i === maxIdx ? '4' : i === minIdx ? '2.5' : '3'}
                                    fill={statColors[i]}
                                    stroke={i === maxIdx ? '#fff' : 'rgba(0,0,0,0.3)'}
                                    strokeWidth={i === maxIdx ? '1' : '0.5'}
                                    style={{ opacity: mounted ? 1 : 0, transition: `opacity 0.4s ease ${0.3 + i * 0.05}s` }}
                                />
                            ))}
                            {BST_STAT_NAMES_JA.map((name, i) => {
                                const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                                const lx = cx + (radarR + 18) * Math.cos(angle);
                                const ly = cy + (radarR + 18) * Math.sin(angle);
                                return (
                                    <g key={i}>
                                        <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                                            style={{ fontSize: '8px', fontWeight: i === maxIdx ? '900' : '700', fill: i === maxIdx ? statColors[i] : 'rgba(255,255,255,0.5)' }}>{name}</text>
                                        <text x={lx} y={ly + 11} textAnchor="middle" dominantBaseline="middle"
                                            style={{ fontSize: '8px', fontWeight: '700', fill: statColors[i], fontFamily: 'monospace' }}>{bstStats[i]}</text>
                                    </g>
                                );
                            })}
                        </svg>
                        {/* Stat bars */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '6px' }}>
                            {BST_STAT_NAMES_JA.map((name, i) => {
                                const pct = (bstStats[i] / STAT_MAX) * 100;
                                const isMax = i === maxIdx;
                                return (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '10px', fontWeight: isMax ? '900' : '700', color: statColors[i], width: '24px', textShadow: isMax ? `0 0 6px ${statColors[i]}40` : 'none' }}>{name}</span>
                                        <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{
                                                height: '100%', width: mounted ? `${pct}%` : '0%',
                                                background: isMax ? `linear-gradient(90deg, ${statColors[i]}, ${statColors[i]}cc)` : statColors[i] + 'bb',
                                                borderRadius: '3px', transition: `width 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + i * 0.06}s`,
                                            }} />
                                        </div>
                                        <span style={{ fontSize: '11px', fontWeight: isMax ? '900' : '700', color: statColors[i], fontFamily: 'monospace', width: '24px', textAlign: 'right' }}>{bstStats[i]}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Chakra */}
                    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '12px 16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.45)', letterSpacing: '1.2px' }}>CHAKRA</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '11px', fontWeight: '800', color: ci.color }}>{ci.ja}</span>
                                <span style={{ fontSize: '13px', fontWeight: '900', color: ci.color, fontFamily: 'monospace' }}>Lv.{card.chakra}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                            {CHAKRA.map((c, i) => {
                                const active = i <= card.chakra;
                                const current = i === card.chakra;
                                return (
                                    <div key={c.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                        <div style={{
                                            width: '100%', height: current ? '6px' : '4px', borderRadius: '3px',
                                            backgroundColor: active ? c.color : 'rgba(255,255,255,0.06)',
                                            boxShadow: current ? `0 0 8px ${c.color}50` : 'none',
                                        }} />
                                        <span style={{
                                            fontSize: current ? '10px' : '9px', fontWeight: current ? '900' : '600',
                                            color: current ? c.color : active ? c.color + '70' : 'rgba(255,255,255,0.18)',
                                        }}>{c.ja}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Nickname */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '36px', padding: '2px 0' }}>
                        {editing ? (
                            <form onSubmit={(e) => { e.preventDefault(); onNicknameChange(draft); setEditing(false); }} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <input ref={inputRef} value={draft} onChange={e => setDraft(e.target.value)} maxLength={16}
                                    placeholder={card.rankConfig.label}
                                    style={{
                                        fontSize: '13px', fontWeight: '700', padding: '5px 12px', borderRadius: '8px',
                                        border: `1px solid ${accent}40`, backgroundColor: 'rgba(255,255,255,0.08)',
                                        color: '#fff', outline: 'none', width: '140px', textAlign: 'center',
                                    }} />
                                <button type="submit" style={{ fontSize: '11px', fontWeight: '700', padding: '5px 12px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: accent, color: '#fff' }}>OK</button>
                                {nickname && <button type="button" onClick={() => { onNicknameChange(''); setDraft(''); setEditing(false); }} style={{ fontSize: '11px', fontWeight: '700', padding: '5px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer', backgroundColor: 'transparent', color: 'rgba(255,255,255,0.4)' }}>x</button>}
                            </form>
                        ) : (
                            <button onClick={() => { setDraft(nickname); setEditing(true); }} style={{
                                fontSize: '11px', fontWeight: '700', padding: '5px 14px', borderRadius: '8px',
                                border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer',
                                backgroundColor: 'transparent', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.5px',
                            }}>{nickname || 'NAME'}</button>
                        )}
                    </div>

                    {/* Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 4px 6px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                        <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', letterSpacing: '0.3px' }}>{card.phrase.id}</span>
                        <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.5px' }}>{bstTier.tier}-TIER / {bstTier.ja}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Main Page ────────────────────────────────────────────────
export default function CardCollectionPage() {
    const [phrases, setPhrases] = useState<TrainingPhrase[]>([]);
    const [cardPoints, setCardPoints] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [activeFilter, setActiveFilter] = useState<CardRank | 'ALL'>('ALL');
    const [sortBy, setSortBy] = useState<'sp' | 'bst'>('sp');
    const [bstFilter, setBstFilter] = useState<BstTier | 'ALL'>('ALL');
    const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
    const [nicknames, setNicknames] = useState<Record<string, string>>({});
    const [mastery, setMastery] = useState<Record<string, number>>({});

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);

        // Load from localStorage
        setPhrases(getAllPhrases());
        setCardPoints(getCardPoints());
        setMastery(getMastery());
        setNicknames(loadNicknames());
        setLoading(false);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const cards: CardData[] = useMemo(() => {
        return phrases.map(p => {
            const pts = cardPoints[p.id] || 0;
            const ch = Math.min(mastery[p.id] || 0, 6);
            return { phrase: p, points: pts, rankConfig: getCardRank(pts), chakra: ch };
        });
    }, [phrases, cardPoints, mastery]);

    const filteredCards = useMemo(() => {
        let result = cards;
        if (activeFilter !== 'ALL') result = result.filter(c => c.rankConfig.rank === activeFilter);
        if (bstFilter !== 'ALL') result = result.filter(c => getBstTier(calcBstTotal(c.phrase.id)).tier === bstFilter);
        if (sortBy === 'bst') {
            result = [...result].sort((a, b) => calcBstTotal(b.phrase.id) - calcBstTotal(a.phrase.id));
        } else {
            result = [...result].sort((a, b) => b.points - a.points);
        }
        return result;
    }, [cards, activeFilter, bstFilter, sortBy]);

    const rankCounts = useMemo(() => {
        const counts: Record<CardRank | 'ALL', number> = { ALL: cards.length, LEGENDARY: 0, HOLOGRAPHIC: 0, GOLD: 0, SILVER: 0, BRONZE: 0, NORMAL: 0 };
        cards.forEach(c => { counts[c.rankConfig.rank]++; });
        return counts;
    }, [cards]);

    const bstCounts = useMemo(() => {
        const counts: Record<BstTier | 'ALL', number> = { ALL: cards.length, S: 0, A: 0, B: 0, C: 0, D: 0, F: 0 };
        cards.forEach(c => { counts[getBstTier(calcBstTotal(c.phrase.id)).tier]++; });
        return counts;
    }, [cards]);

    const filterOptions: { key: CardRank | 'ALL'; label: string; color: string; count: number }[] = [
        { key: 'ALL', label: 'ALL', color: '#78716C', count: rankCounts.ALL },
        { key: 'LEGENDARY', label: 'LGD', color: '#D4AF37', count: rankCounts.LEGENDARY },
        { key: 'HOLOGRAPHIC', label: 'HOLO', color: '#A855F7', count: rankCounts.HOLOGRAPHIC },
        { key: 'GOLD', label: 'GOLD', color: '#F6C85F', count: rankCounts.GOLD },
        { key: 'SILVER', label: 'SILVER', color: '#94A3B8', count: rankCounts.SILVER },
        { key: 'BRONZE', label: 'BRONZE', color: '#CD7F32', count: rankCounts.BRONZE },
        { key: 'NORMAL', label: 'NORM', color: '#D6D3D1', count: rankCounts.NORMAL },
    ];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fafafa', padding: isMobile ? '16px' : '24px' }}>
            <style>{`
                @keyframes card-holo-shimmer { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
                @keyframes card-particle-float { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; } 50% { transform: translateY(-10px) scale(1.4); opacity: 1; } }
                @keyframes card-legendary-aura { 0%, 100% { box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.4), 0 0 30px rgba(168,85,247,0.3); } 50% { box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 35px rgba(212,175,55,0.6), 0 0 50px rgba(168,85,247,0.4); } }
                @keyframes card-gold-pulse { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.04); } }
                @keyframes card-enter { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>

            {/* Header */}
            <div style={{ maxWidth: '960px', margin: '0 auto 28px' }}>
                <Link href="/english/training" style={{
                    fontSize: '12px', color: '#A8A29E', textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    marginBottom: '20px', padding: '4px 0',
                }}>
                    &larr; Training
                </Link>
                <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#1C1917', letterSpacing: '-1px', marginBottom: '6px', lineHeight: 1.2 }}>
                    Card Collection
                </h1>
                <p style={{ fontSize: '13px', color: '#78716C', lineHeight: 1.6 }}>
                    Review phrases in Training to earn SP and rank up your cards.
                </p>
            </div>

            <div style={{ maxWidth: '960px', margin: '0 auto' }}>
                {!loading && <CollectionDashboard cards={cards} />}

                {/* Sort + Filter */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '2px', backgroundColor: '#1C1917', borderRadius: '10px', padding: '3px' }}>
                        {([['sp', 'SP'], ['bst', 'BST']] as const).map(([key, label]) => (
                            <button key={key} onClick={() => setSortBy(key)} style={{
                                padding: '6px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                                fontSize: '12px', fontWeight: '700',
                                backgroundColor: sortBy === key ? '#D4AF37' : 'transparent',
                                color: sortBy === key ? '#1C1917' : 'rgba(255,255,255,0.4)',
                                transition: 'all 0.2s ease', letterSpacing: '0.3px',
                            }}>{label}</button>
                        ))}
                    </div>
                    <div style={{ width: '1px', height: '24px', backgroundColor: '#E7E5E4' }} />
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', flex: 1 }}>
                        {filterOptions.map(opt => {
                            const isActive = activeFilter === opt.key;
                            return (
                                <button key={opt.key} onClick={() => setActiveFilter(opt.key)} style={{
                                    padding: isActive ? '5px 12px' : '5px 10px', borderRadius: '8px', border: 'none',
                                    backgroundColor: isActive ? opt.color + (opt.key === 'NORMAL' ? '30' : '18') : '#F5F5F4',
                                    fontSize: '11px', fontWeight: '700',
                                    color: isActive ? (opt.key === 'NORMAL' ? '#57534E' : opt.color) : '#A8A29E',
                                    cursor: 'pointer', whiteSpace: 'nowrap',
                                    display: 'flex', alignItems: 'center', gap: '5px',
                                    transition: 'all 0.15s ease',
                                    boxShadow: isActive ? `0 2px 8px ${opt.color}20` : 'none',
                                }}>
                                    {opt.key !== 'ALL' && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: opt.color, opacity: isActive ? 1 : 0.4 }} />}
                                    {opt.label}
                                    <span style={{ fontSize: '10px', fontWeight: '800', opacity: isActive ? 0.8 : 0.4 }}>{opt.count}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* BST filter */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', fontWeight: '600', color: '#A8A29E', marginRight: '4px' }}>BST</span>
                    {BST_TIERS.map(t => {
                        const count = bstCounts[t.tier];
                        const isActive = bstFilter === t.tier;
                        return (
                            <button key={t.tier} onClick={() => setBstFilter(bstFilter === t.tier ? 'ALL' : t.tier)} style={{
                                padding: '4px 10px', borderRadius: '6px', border: 'none',
                                backgroundColor: isActive ? t.color + '15' : '#F5F5F4',
                                fontSize: '11px', fontWeight: '700',
                                color: isActive ? t.color : '#A8A29E',
                                cursor: 'pointer', whiteSpace: 'nowrap',
                                display: 'flex', alignItems: 'center', gap: '4px',
                            }}>
                                <span style={{ fontWeight: '900', fontSize: '12px' }}>{t.tier}</span>
                                <span style={{ opacity: 0.6 }}>{t.label}</span>
                                <span style={{ fontSize: '10px', opacity: 0.5 }}>{count}</span>
                            </button>
                        );
                    })}
                    {(activeFilter !== 'ALL' || bstFilter !== 'ALL') && (
                        <button onClick={() => { setActiveFilter('ALL'); setBstFilter('ALL'); }} style={{
                            fontSize: '10px', color: '#D4AF37', border: 'none', background: 'none',
                            cursor: 'pointer', fontWeight: '700', padding: '4px 8px', marginLeft: '4px',
                        }}>Reset</button>
                    )}
                </div>

                {/* Results count */}
                {!loading && (activeFilter !== 'ALL' || bstFilter !== 'ALL') && (
                    <div style={{ fontSize: '12px', color: '#78716C', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: '800', color: '#1C1917', fontSize: '14px' }}>{filteredCards.length}</span>
                        <span>/ {cards.length}</span>
                    </div>
                )}

                {/* Card Grid */}
                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? '8px' : '24px', justifyItems: 'center' }}>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} style={{ width: '240px', height: '340px', borderRadius: '16px', backgroundColor: '#F5F5F4', animation: 'card-enter 1.5s ease-in-out infinite', transform: isMobile ? 'scale(0.75)' : 'none', transformOrigin: 'top center' }} />
                        ))}
                    </div>
                ) : filteredCards.length === 0 ? (
                    <div style={{
                        textAlign: 'center', padding: '60px 20px', backgroundColor: '#fff',
                        borderRadius: '16px', border: '1px solid #F5F5F4', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                    }}>
                        <div style={{ fontSize: '14px', color: '#78716C', fontWeight: '500' }}>
                            {activeFilter === 'ALL' && bstFilter === 'ALL'
                                ? 'No cards yet. GET phrases in Quest and review them in Training to earn SP.'
                                : 'No cards match this filter.'}
                        </div>
                        {cards.length === 0 && (
                            <Link href="/english/quest" style={{
                                display: 'inline-block', marginTop: '16px',
                                fontSize: '12px', color: '#fff', border: 'none',
                                background: '#D4AF37', fontWeight: '700',
                                padding: '10px 24px', borderRadius: '10px',
                                textDecoration: 'none',
                            }}>
                                Start Quest
                            </Link>
                        )}
                        {(activeFilter !== 'ALL' || bstFilter !== 'ALL') && (
                            <button onClick={() => { setActiveFilter('ALL'); setBstFilter('ALL'); }} style={{
                                marginTop: '16px', fontSize: '12px', color: '#fff', border: 'none',
                                background: '#1C1917', cursor: 'pointer', fontWeight: '700',
                                padding: '8px 20px', borderRadius: '8px',
                            }}>Clear Filter</button>
                        )}
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                        gap: isMobile ? '8px' : '24px',
                        justifyItems: 'center',
                    }}>
                        {filteredCards.map((card, i) => (
                            <div key={card.phrase.id} style={{
                                animation: `card-enter 0.4s ease-out both`,
                                animationDelay: `${Math.min(i * 0.05, 0.5)}s`,
                                ...(isMobile ? { transform: 'scale(0.75)', transformOrigin: 'top center' } : {}),
                            }}>
                                <CollectionCard
                                    card={card}
                                    enableTilt={!isMobile}
                                    onClick={() => setSelectedCard(card)}
                                    nickname={nicknames[card.phrase.id]}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {selectedCard && (
                <CardModal
                    card={selectedCard}
                    onClose={() => setSelectedCard(null)}
                    isMobile={isMobile}
                    nickname={nicknames[selectedCard.phrase.id] || ''}
                    onNicknameChange={(name) => {
                        saveNickname(selectedCard.phrase.id, name);
                        setNicknames(prev => {
                            const next = { ...prev };
                            if (name.trim()) next[selectedCard.phrase.id] = name.trim();
                            else delete next[selectedCard.phrase.id];
                            return next;
                        });
                    }}
                />
            )}
        </div>
    );
}
