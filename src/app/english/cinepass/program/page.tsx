'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
    CINEPASS_CHUNKS,
    CINEPASS_STAGES,
    CINEPASS_DAY_THEMES,
    chunksForDay,
    stageForDay,
} from '@/data/english/cinepass-chunks';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const CREAM = '#FFFDF8';
const INK = '#1C1917';
const SUB = '#78716C';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

const KNOWN_KEY = 'cinepass_known_ids';

export default function CinepassProgram() {
    const [isMobile, setIsMobile] = useState(false);
    const [day, setDay] = useState(1);
    const [known, setKnown] = useState<Set<string>>(new Set());
    const [hideJp, setHideJp] = useState(false);

    useEffect(() => {
        const c = () => setIsMobile(window.innerWidth < 768);
        c(); window.addEventListener('resize', c);
        return () => window.removeEventListener('resize', c);
    }, []);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(KNOWN_KEY);
            if (raw) setKnown(new Set(JSON.parse(raw)));
        } catch { /* ignore */ }
    }, []);

    const toggleKnown = (id: string) => {
        setKnown(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            localStorage.setItem(KNOWN_KEY, JSON.stringify([...next]));
            return next;
        });
    };

    const chunks = useMemo(() => chunksForDay(day), [day]);
    const stage = stageForDay(day);
    const totalKnown = useMemo(
        () => CINEPASS_CHUNKS.filter(c => known.has(c.id)).length,
        [known],
    );
    const dayDone = (d: number) => {
        const list = chunksForDay(d);
        return list.length > 0 && list.every(c => known.has(c.id));
    };

    const pad = isMobile ? '16px' : '32px';

    return (
        <div style={{ background: CREAM, minHeight: '100vh', fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif', color: INK }}>
            {/* Header */}
            <div style={{ background: '#fff', borderBottom: '1px solid #EFEBDF', padding: `18px ${pad}` }}>
                <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                        <Link href="/english/cinepass" style={{ textDecoration: 'none' }}>
                            <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 900, color: GOLD, letterSpacing: '1px' }}>CINE</span>
                            <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 900, color: INK, letterSpacing: '1px' }}>PASS</span>
                        </Link>
                        <span style={{ fontSize: '11px', color: SUB, marginLeft: '10px', letterSpacing: '0.5px' }}>頻出チャンク 510 / 30日</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ fontSize: '12px', color: SUB }}>
                            習得 <strong style={{ color: DEEPGOLD, fontSize: '16px', fontFamily: SERIF }}>{totalKnown}</strong> / {CINEPASS_CHUNKS.length}
                        </div>
                        <button
                            onClick={() => setHideJp(!hideJp)}
                            style={{
                                fontSize: '11px', fontWeight: 700, padding: '7px 14px', borderRadius: '99px',
                                border: `1px solid ${hideJp ? GREEN : '#E7E5E4'}`,
                                background: hideJp ? '#ECFDF5' : '#fff',
                                color: hideJp ? '#047857' : SUB, cursor: 'pointer',
                            }}
                        >
                            {hideJp ? '和訳: 隠し中 (タップで表示)' : '和訳を隠してテスト'}
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '960px', margin: '0 auto', padding: `24px ${pad} 80px` }}>
                {/* Stage + Day selector */}
                {CINEPASS_STAGES.map(s => (
                    <div key={s.key} style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '14px 0 8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, color: DEEPGOLD, letterSpacing: '2px' }}>STAGE {s.key}</span>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: INK }}>{s.title}</span>
                            <span style={{ fontSize: '10px', color: '#A8A29E' }}>{s.subtitle}</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(5, 1fr)' : 'repeat(10, 1fr)', gap: '6px' }}>
                            {Array.from({ length: s.days[1] - s.days[0] + 1 }, (_, i) => s.days[0] + i).map(d => {
                                const active = d === day;
                                const done = dayDone(d);
                                return (
                                    <button
                                        key={d}
                                        onClick={() => { setDay(d); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        style={{
                                            padding: '9px 0', borderRadius: '10px', cursor: 'pointer',
                                            border: active ? `2px solid ${GOLD}` : '1px solid #E7E5E4',
                                            background: active ? '#FEF9E7' : done ? '#ECFDF5' : '#fff',
                                            color: active ? DEEPGOLD : done ? '#047857' : SUB,
                                            fontWeight: active || done ? 800 : 500, fontSize: '13px',
                                        }}
                                    >
                                        {d}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Day header */}
                <div style={{ margin: '34px 0 18px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: DEEPGOLD, letterSpacing: '2px', marginBottom: '6px' }}>
                        DAY {day} — STAGE {stage.key} {stage.title}
                    </div>
                    <h1 style={{ fontFamily: SERIF, fontSize: isMobile ? '22px' : '28px', fontWeight: 900, margin: 0, lineHeight: 1.4 }}>
                        {CINEPASS_DAY_THEMES[day]}
                    </h1>
                    <p style={{ fontSize: '13px', color: SUB, lineHeight: 1.8, margin: '10px 0 0', maxWidth: '640px' }}>{stage.description}</p>
                </div>

                {/* Chunk cards */}
                {chunks.length === 0 ? (
                    <div style={{ background: '#fff', border: '1px dashed #E7E5E4', borderRadius: '16px', padding: '40px', textAlign: 'center', color: SUB, fontSize: '13px' }}>
                        この日のデータは準備中。
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '10px' }}>
                        {chunks.map((c, i) => {
                            const isKnown = known.has(c.id);
                            return (
                                <div key={c.id} style={{
                                    background: '#fff',
                                    border: isKnown ? `1px solid ${GREEN}55` : '1px solid #EFEBDF',
                                    borderRadius: '14px', padding: isMobile ? '16px' : '18px 22px',
                                    display: 'flex', gap: '14px', alignItems: 'flex-start',
                                }}>
                                    <div style={{ fontSize: '11px', color: '#D6D3D1', fontWeight: 700, minWidth: '22px', paddingTop: '4px' }}>{String(i + 1).padStart(2, '0')}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: isMobile ? '17px' : '19px', fontWeight: 800, color: INK }}>{c.en}</span>
                                            <HiddenJp hidden={hideJp}>{c.jp}</HiddenJp>
                                        </div>
                                        <div style={{ marginTop: '8px', fontSize: '14px', color: '#44403C', lineHeight: 1.7 }}>{c.ex}</div>
                                        <div style={{ marginTop: '2px' }}>
                                            <HiddenJp hidden={hideJp} small>{c.exJp}</HiddenJp>
                                        </div>
                                        {c.note && (
                                            <div style={{ marginTop: '8px', fontSize: '12px', color: DEEPGOLD, background: '#FEF9E7', borderRadius: '8px', padding: '6px 10px', display: 'inline-block' }}>
                                                {c.note}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => toggleKnown(c.id)}
                                        style={{
                                            fontSize: '11px', fontWeight: 800, padding: '8px 12px', borderRadius: '10px',
                                            border: isKnown ? `1px solid ${GREEN}` : '1px solid #E7E5E4',
                                            background: isKnown ? GREEN : '#fff',
                                            color: isKnown ? '#fff' : SUB, cursor: 'pointer', whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {isKnown ? '習得済' : '覚えた'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Day nav */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                    <button
                        onClick={() => { if (day > 1) { setDay(day - 1); window.scrollTo(0, 0); } }}
                        disabled={day <= 1}
                        style={{ fontSize: '13px', fontWeight: 700, padding: '12px 22px', borderRadius: '12px', border: '1px solid #E7E5E4', background: '#fff', color: day <= 1 ? '#D6D3D1' : SUB, cursor: day <= 1 ? 'default' : 'pointer' }}
                    >
                        ← Day {Math.max(1, day - 1)}
                    </button>
                    <button
                        onClick={() => { if (day < 30) { setDay(day + 1); window.scrollTo(0, 0); } }}
                        disabled={day >= 30}
                        style={{ fontSize: '13px', fontWeight: 800, padding: '12px 26px', borderRadius: '12px', border: 'none', background: day >= 30 ? '#E7E5E4' : `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#fff', cursor: day >= 30 ? 'default' : 'pointer', boxShadow: day >= 30 ? 'none' : '0 6px 18px rgba(212,175,55,0.3)' }}
                    >
                        Day {Math.min(30, day + 1)} へ →
                    </button>
                </div>
            </div>
        </div>
    );
}

function HiddenJp({ children, hidden, small = false }: { children: React.ReactNode; hidden: boolean; small?: boolean }) {
    const [revealed, setRevealed] = useState(false);
    useEffect(() => { setRevealed(false); }, [hidden, children]);
    const masked = hidden && !revealed;
    return (
        <span
            onClick={() => { if (hidden) setRevealed(!revealed); }}
            style={{
                fontSize: small ? '12px' : '13px',
                color: masked ? 'transparent' : small ? '#A8A29E' : SUB,
                background: masked ? '#F5F5F4' : 'transparent',
                borderRadius: '6px',
                padding: masked ? '2px 8px' : 0,
                cursor: hidden ? 'pointer' : 'default',
                userSelect: masked ? 'none' : 'auto',
                transition: 'all 0.15s ease',
            }}
        >
            {children}
        </span>
    );
}
