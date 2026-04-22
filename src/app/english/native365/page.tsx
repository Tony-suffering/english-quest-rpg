'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { Native365Item, Native365Level, Native365Section, Native365CharKey } from '@/types/native365';
import { NATIVE365_CHARS, NATIVE365_CHAR_ORDER } from '@/types/native365';
import { NATIVE365_MONTH1_PLAN, getNative365Day, isNative365DayReady } from '@/data/english/native365';

// ─── Storage ────────────────────────────────────────────────
const STORAGE_KEY = 'native365_stats';

type Stats = {
    currentDay: number;
    totalCompleted: number;
    streakDays: number;
    lastVisit: string;
    dayProgress: Record<number, { completed: boolean; revealedLevels: Record<string, boolean> }>;
};

function loadStats(): Stats {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch { /* ignore */ }
    return { currentDay: 1, totalCompleted: 0, streakDays: 0, lastVisit: '', dayProgress: {} };
}
function saveStats(s: Stats) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }

// ─── Colors (light theme only) ──────────────────────────────
const C = {
    gold: '#D4AF37', goldDim: '#B8971F', goldBg: '#FFFBEB',
    green: '#10B981', greenDim: '#059669',
    blue: '#3B82F6', blueDim: '#1D4ED8',
    bg: '#FAFAF9', card: '#FFFFFF', border: '#E7E5E4',
    textPrimary: '#1C1917', textSub: '#57534E', textDim: '#78716C', textFaint: '#A8A29E',
};

const LEVEL_META: Record<Native365Level, { label: string; color: string; dim: string; sub: string }> = {
    core:   { label: 'CORE',   color: '#78716C', dim: '#44403C', sub: '骨格ルール' },
    nuance: { label: 'NUANCE', color: C.gold,    dim: C.goldDim, sub: 'ネイティブの直感' },
    shift:  { label: 'SHIFT',  color: C.green,   dim: C.greenDim, sub: '文脈で変わる' },
    native: { label: 'NATIVE', color: C.blue,    dim: C.blueDim,  sub: '実際に口から出る' },
};

const LEVEL_ORDER: Native365Level[] = ['core', 'nuance', 'shift', 'native'];

// ─── Item viewer ────────────────────────────────────────────
function ItemCard({ item }: { item: Native365Item }) {
    const [level, setLevel] = useState<Native365Level>('core');
    const lm = LEVEL_META[level];
    const point = item.points[level];

    return (
        <div style={{
            background: C.card, border: `1px solid ${C.border}`,
            borderRadius: 14, padding: 16, marginBottom: 14,
        }}>
            {/* Label + trigger */}
            <div style={{ fontSize: 12, fontWeight: 800, color: C.textPrimary, marginBottom: 4 }}>
                {item.label}
            </div>
            <div style={{ fontSize: 12, color: C.textDim, marginBottom: 12, fontStyle: 'italic' }}>
                {item.trigger}
            </div>

            {/* Level tabs */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                {LEVEL_ORDER.map(l => {
                    const active = l === level;
                    const meta = LEVEL_META[l];
                    return (
                        <button
                            key={l}
                            onClick={() => setLevel(l)}
                            style={{
                                flex: 1, padding: '6px 4px',
                                border: `1px solid ${active ? meta.color : C.border}`,
                                background: active ? meta.color : C.card,
                                color: active ? '#fff' : C.textDim,
                                fontSize: 10, fontWeight: 800, letterSpacing: 1.2,
                                borderRadius: 6, cursor: 'pointer',
                                transition: 'all 0.15s',
                            }}
                        >
                            {meta.label}
                        </button>
                    );
                })}
            </div>

            {/* EN + JA */}
            <div style={{
                background: `linear-gradient(135deg, ${lm.color}10, ${C.card})`,
                border: `1px solid ${lm.color}30`,
                borderRadius: 10, padding: '12px 14px', marginBottom: 10,
            }}>
                <div style={{ fontSize: 9, fontWeight: 800, color: lm.dim, letterSpacing: 1.5, marginBottom: 4 }}>
                    {lm.sub}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary, lineHeight: 1.5, marginBottom: 6 }}>
                    {point.en}
                </div>
                <div style={{ fontSize: 12, color: C.textSub, lineHeight: 1.7 }}>
                    {point.ja}
                </div>
            </div>

            {/* Trap + Tip */}
            {item.trap && (
                <div style={{
                    background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8,
                    padding: '8px 12px', marginBottom: 6,
                }}>
                    <div style={{ fontSize: 9, fontWeight: 800, color: '#B91C1C', letterSpacing: 1.5, marginBottom: 3 }}>TRAP</div>
                    <div style={{ fontSize: 12, color: '#7F1D1D', lineHeight: 1.5 }}>{item.trap}</div>
                </div>
            )}
            {item.tip && (
                <div style={{
                    background: C.goldBg, border: `1px solid ${C.gold}40`, borderRadius: 8,
                    padding: '8px 12px', marginBottom: 10,
                }}>
                    <div style={{ fontSize: 9, fontWeight: 800, color: C.goldDim, letterSpacing: 1.5, marginBottom: 3 }}>TIP</div>
                    <div style={{ fontSize: 12, color: C.textSub, lineHeight: 1.5 }}>{item.tip}</div>
                </div>
            )}

            {/* 6-character reactions */}
            <div style={{ marginTop: 10 }}>
                <div style={{
                    fontSize: 9, letterSpacing: 2.5, color: C.textFaint,
                    fontWeight: 800, marginBottom: 8, textAlign: 'center',
                }}>
                    — 6人の反応 —
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    {NATIVE365_CHAR_ORDER.map((key: Native365CharKey) => {
                        const ch = NATIVE365_CHARS[key];
                        const line = item.reactions[key];
                        if (!line) return null;
                        return (
                            <div key={key} style={{
                                display: 'flex', alignItems: 'flex-start', gap: 8,
                                padding: '8px 10px', borderRadius: 10,
                                background: `${ch.color}08`,
                                border: `1px solid ${ch.color}20`,
                            }}>
                                <img
                                    src={ch.avatar}
                                    alt={ch.name}
                                    width={24} height={24}
                                    style={{
                                        flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
                                        objectFit: 'cover', border: `2px solid ${ch.color}`,
                                    }}
                                />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        fontSize: 9, fontWeight: 800, color: ch.colorDim,
                                        letterSpacing: 1, marginBottom: 2,
                                    }}>
                                        {ch.name} ({ch.role})
                                    </div>
                                    <div style={{ fontSize: 11, color: C.textSub, lineHeight: 1.5 }}>
                                        {line}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// ─── Section (発音 or 文法) ──────────────────────────────────
function SectionBlock({ section, color, tag }: { section: Native365Section; color: string; tag: string }) {
    return (
        <div style={{ marginBottom: 28 }}>
            <div style={{ marginBottom: 12 }}>
                <div style={{
                    display: 'inline-block', padding: '3px 10px', borderRadius: 4,
                    background: color, color: '#fff',
                    fontSize: 10, fontWeight: 800, letterSpacing: 2, marginBottom: 8,
                }}>
                    {tag}
                </div>
                <h2 style={{
                    fontSize: 20, fontWeight: 900, color: C.textPrimary,
                    margin: '0 0 4px', letterSpacing: '-0.01em',
                }}>
                    {section.title}
                </h2>
                <p style={{ fontSize: 13, color: C.textSub, margin: '0 0 10px', lineHeight: 1.6 }}>
                    {section.subtitle}
                </p>
                <div style={{
                    background: C.bg, borderLeft: `3px solid ${color}`,
                    padding: '10px 14px', borderRadius: 8,
                    fontSize: 12, color: C.textSub, lineHeight: 1.7,
                }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color, letterSpacing: 1.5, marginRight: 8 }}>TL;DR</span>
                    {section.tldr}
                </div>
            </div>
            {section.items.map(item => <ItemCard key={item.id} item={item} />)}
        </div>
    );
}

// ─── Page ───────────────────────────────────────────────────
export default function Native365Page() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [selectedDay, setSelectedDay] = useState<number>(1);

    useEffect(() => {
        const s = loadStats();
        setStats(s);
        setSelectedDay(s.currentDay || 1);
    }, []);

    const day = useMemo(() => getNative365Day(selectedDay), [selectedDay]);
    const plan = NATIVE365_MONTH1_PLAN.find(p => p.day === selectedDay);

    if (!stats) return null;

    return (
        <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 60 }}>
            {/* Header */}
            <div style={{
                background: '#fff', borderBottom: `1px solid ${C.border}`,
                padding: '24px 16px 20px',
            }}>
                <div style={{ maxWidth: 760, margin: '0 auto' }}>
                    <div style={{ fontSize: 10, letterSpacing: 3, color: C.textFaint, fontWeight: 800, marginBottom: 6 }}>
                        ネイティブ365 / NATIVE 365
                    </div>
                    <h1 style={{
                        fontSize: 24, fontWeight: 900, color: C.textPrimary,
                        margin: '0 0 4px', letterSpacing: '-0.02em',
                    }}>
                        英語の最後の1マイル
                    </h1>
                    <p style={{ fontSize: 13, color: C.textSub, margin: 0, lineHeight: 1.7 }}>
                        TOEIC 900・英検準1級の壁の先。発音 + 文法を毎日1テーマずつ、365日で潰す。
                    </p>
                </div>
            </div>

            {/* Month 1 calendar */}
            <div style={{ maxWidth: 760, margin: '16px auto 0', padding: '0 16px' }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: C.textFaint, fontWeight: 800, marginBottom: 8 }}>
                    MONTH 1 / 30 DAYS
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))',
                    gap: 4, marginBottom: 20,
                }}>
                    {NATIVE365_MONTH1_PLAN.map(p => {
                        const ready = isNative365DayReady(p.day);
                        const active = selectedDay === p.day;
                        return (
                            <button
                                key={p.day}
                                onClick={() => setSelectedDay(p.day)}
                                style={{
                                    aspectRatio: '1/1',
                                    border: `1px solid ${active ? C.gold : C.border}`,
                                    background: active ? C.gold : (ready ? C.card : C.bg),
                                    color: active ? '#fff' : (ready ? C.textPrimary : C.textFaint),
                                    fontSize: 12, fontWeight: 800,
                                    borderRadius: 6, cursor: 'pointer',
                                    transition: 'all 0.15s',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}
                                title={`${p.pronunciation} / ${p.grammar}`}
                            >
                                {p.day}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Day header */}
            <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 16px 16px' }}>
                <div style={{
                    background: '#fff', border: `1px solid ${C.border}`,
                    borderRadius: 14, padding: '16px 18px',
                }}>
                    <div style={{ fontSize: 10, letterSpacing: 2, color: C.gold, fontWeight: 800, marginBottom: 4 }}>
                        DAY {selectedDay} / 30
                    </div>
                    {plan && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontSize: 12, color: C.textSub }}>
                            <div>
                                <span style={{ color: C.gold, fontWeight: 700 }}>発音</span>{' / '}
                                {plan.pronunciation}
                            </div>
                            <div>
                                <span style={{ color: C.green, fontWeight: 700 }}>文法</span>{' / '}
                                {plan.grammar}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 16px' }}>
                {day ? (
                    <>
                        <SectionBlock section={day.pronunciation} color={C.gold} tag="発音" />
                        <SectionBlock section={day.grammar} color={C.green} tag="文法" />
                    </>
                ) : (
                    <div style={{
                        padding: 32, textAlign: 'center',
                        background: '#fff', border: `1px dashed ${C.border}`, borderRadius: 14,
                        color: C.textDim, fontSize: 13, lineHeight: 1.7,
                    }}>
                        Day {selectedDay} は準備中。<br />
                        発音: {plan?.pronunciation ?? '-'}<br />
                        文法: {plan?.grammar ?? '-'}
                    </div>
                )}

                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <Link href="/english/native365/lp" style={{
                        fontSize: 11, color: C.textDim,
                        textDecoration: 'underline', letterSpacing: 0.5,
                    }}>
                        ネイティブ365とは？
                    </Link>
                </div>
            </div>
        </div>
    );
}
