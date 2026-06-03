'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { NATIVE_PHRASES, NATIVE_PHRASE_TAGS, type NativePhrase } from '@/data/english/native365/native-phrases';

const REPS_PER_MASTER = 5;

// ─── Colors ────────────────────────────────────────────────
const C = {
    gold: '#D4AF37', goldDim: '#B8971F', goldBg: '#FFFBEB',
    green: '#10B981', greenDim: '#059669',
    blue: '#3B82F6', blueDim: '#1D4ED8',
    bg: '#FAFAF9', card: '#FFFFFF', border: '#E7E5E4',
    textPrimary: '#1C1917', textSub: '#57534E', textDim: '#78716C', textFaint: '#A8A29E',
};

// ─── Storage ───────────────────────────────────────────────
const STORAGE_KEY = 'native365_phrase_stats';

type PhraseStats = {
    totalReps: number;
    phraseReps: Record<string, number>;
};

function loadPhraseStats(): PhraseStats {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            return {
                totalReps: parsed.totalReps ?? 0,
                phraseReps: parsed.phraseReps ?? {},
            };
        }
    } catch { /* ignore */ }
    return { totalReps: 0, phraseReps: {} };
}
function savePhraseStats(s: PhraseStats) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}

// ─── Phrase card ───────────────────────────────────────────
function PhraseCard({
    phrase, reps, onRep,
}: { phrase: NativePhrase; reps: number; onRep: () => void }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const loopCountRef = useRef(0);
    const [looping, setLooping] = useState(false);
    const mastered = reps >= REPS_PER_MASTER;

    // Ensure audio element exists
    useEffect(() => {
        if (!audioRef.current) {
            const a = new Audio(phrase.file);
            a.preload = 'none';
            audioRef.current = a;
        }
    }, [phrase.file]);

    const play = useCallback((rate: number) => {
        const a = audioRef.current;
        if (!a) return;
        a.pause();
        a.currentTime = 0;
        a.playbackRate = rate;
        a.onended = null;
        a.play().catch(() => { /* autoplay may need user gesture earlier */ });
        onRep();
    }, [onRep]);

    const onLoop = useCallback(() => {
        const a = audioRef.current;
        if (!a || looping) return;
        setLooping(true);
        loopCountRef.current = 0;
        a.playbackRate = 0.95;
        const runOnce = () => {
            a.currentTime = 0;
            a.play().catch(() => { /* ignore */ });
            onRep();
        };
        a.onended = () => {
            loopCountRef.current += 1;
            if (loopCountRef.current < REPS_PER_MASTER) {
                setTimeout(runOnce, 700);
            } else {
                setLooping(false);
                a.onended = null;
            }
        };
        runOnce();
    }, [looping, onRep]);

    const btnStyle = (color: string, filled = false): React.CSSProperties => ({
        flex: 1, padding: '8px 6px',
        background: filled ? color : '#fff',
        color: filled ? '#fff' : color,
        border: `1.5px solid ${color}`,
        borderRadius: 8,
        fontSize: 10, fontWeight: 800, letterSpacing: 1,
        cursor: looping ? 'wait' : 'pointer',
        opacity: looping ? 0.6 : 1,
    });

    const tagMeta = (id: string) => NATIVE_PHRASE_TAGS.find(t => t.id === id);

    return (
        <div style={{
            background: C.card,
            border: `1px solid ${mastered ? C.green + '50' : C.border}`,
            borderRadius: 14, padding: 14, marginBottom: 12,
            position: 'relative',
            boxShadow: mastered ? `0 2px 10px ${C.green}18` : 'none',
        }}>
            {mastered && (
                <span style={{
                    position: 'absolute', top: 10, right: 12,
                    fontSize: 13, color: C.green,
                }}>★</span>
            )}

            {/* Tags */}
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
                {phrase.tags.map(t => {
                    const meta = tagMeta(t);
                    if (!meta) return null;
                    return (
                        <span key={t} style={{
                            fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
                            padding: '2px 6px', borderRadius: 4,
                            color: meta.color, background: `${meta.color}12`,
                            border: `1px solid ${meta.color}30`,
                        }}>
                            {meta.label}
                        </span>
                    );
                })}
            </div>

            {/* Transcript */}
            <div
                onClick={() => play(0.95)}
                style={{
                    fontSize: 14, fontWeight: 600, color: C.textPrimary,
                    lineHeight: 1.6, marginBottom: 10, cursor: 'pointer',
                }}
            >
                {phrase.transcript}
            </div>

            {/* Shadow controls */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
            }}>
                <span style={{ fontSize: 9, color: C.blueDim, fontWeight: 800, letterSpacing: 1.5, flex: 1 }}>
                    SHADOW
                </span>
                <span style={{
                    fontSize: 10, fontWeight: 800,
                    color: mastered ? C.green : C.textDim,
                    background: mastered ? `${C.green}15` : C.bg,
                    padding: '2px 8px', borderRadius: 999,
                    border: `1px solid ${mastered ? C.green + '40' : C.border}`,
                }}>
                    {mastered ? `★ ${reps}` : `× ${reps} / ${REPS_PER_MASTER}`}
                </span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => play(0.95)} disabled={looping} style={btnStyle(C.blue, true)}>
                    {'▶'} PLAY
                </button>
                <button onClick={() => play(0.70)} disabled={looping} style={btnStyle(C.blueDim)}>
                    {'▶▶'} SLOW
                </button>
                <button onClick={onLoop} disabled={looping} style={btnStyle(C.gold, looping)}>
                    {looping ? '…' : `${'↻'} LOOP×${REPS_PER_MASTER}`}
                </button>
            </div>
        </div>
    );
}

// ─── Page ──────────────────────────────────────────────────
export default function PhraseBankPage() {
    const [stats, setStats] = useState<PhraseStats | null>(null);
    const [activeTags, setActiveTags] = useState<string[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        setStats(loadPhraseStats());
    }, []);

    const bumpRep = useCallback((slug: string) => {
        setStats(prev => {
            if (!prev) return prev;
            const cur = prev.phraseReps[slug] ?? 0;
            const next: PhraseStats = {
                totalReps: prev.totalReps + 1,
                phraseReps: { ...prev.phraseReps, [slug]: cur + 1 },
            };
            savePhraseStats(next);
            return next;
        });
    }, []);

    const toggleTag = (id: string) => {
        setActiveTags(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    };

    const filtered = useMemo(() => {
        const s = search.trim().toLowerCase();
        return NATIVE_PHRASES.filter(p => {
            if (activeTags.length > 0 && !activeTags.some(t => p.tags.includes(t))) return false;
            if (s && !p.transcript.toLowerCase().includes(s)) return false;
            return true;
        });
    }, [activeTags, search]);

    if (!stats) return null;

    const masteredCount = Object.values(stats.phraseReps).filter(r => r >= REPS_PER_MASTER).length;

    return (
        <div style={{ minHeight: '100vh', background: C.bg, paddingBottom: 60 }}>
            {/* Header */}
            <div style={{
                background: '#fff', borderBottom: `1px solid ${C.border}`,
                padding: '20px 16px 18px',
            }}>
                <div style={{ maxWidth: 760, margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                        <div>
                            <Link href="/english/native365" style={{
                                fontSize: 10, color: C.textFaint, letterSpacing: 2, fontWeight: 700,
                                textDecoration: 'none',
                            }}>
                                ← ネイティブ365
                            </Link>
                            <h1 style={{
                                fontSize: 22, fontWeight: 900, color: C.textPrimary,
                                margin: '6px 0 2px', letterSpacing: '-0.02em',
                            }}>
                                Phrase Bank
                            </h1>
                            <p style={{ fontSize: 12, color: C.textSub, margin: 0, lineHeight: 1.6 }}>
                                ネイティブの生音声 {NATIVE_PHRASES.length} 本。体が覚えるまで繰り返す。
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                            <div style={{
                                padding: '6px 10px', background: `${C.blue}10`,
                                border: `1px solid ${C.blue}40`, borderRadius: 10, textAlign: 'center',
                                minWidth: 54,
                            }}>
                                <div style={{ fontSize: 16, fontWeight: 900, color: C.blueDim, lineHeight: 1 }}>
                                    {stats.totalReps}
                                </div>
                                <div style={{ fontSize: 8, color: C.blueDim, fontWeight: 700, letterSpacing: 1, marginTop: 2 }}>
                                    SHADOW
                                </div>
                            </div>
                            <div style={{
                                padding: '6px 10px', background: C.goldBg,
                                border: `1px solid ${C.gold}40`, borderRadius: 10, textAlign: 'center',
                                minWidth: 54,
                            }}>
                                <div style={{ fontSize: 16, fontWeight: 900, color: C.goldDim, lineHeight: 1 }}>
                                    {masteredCount}
                                </div>
                                <div style={{ fontSize: 8, color: C.goldDim, fontWeight: 700, letterSpacing: 1, marginTop: 2 }}>
                                    ★ MASTER
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div style={{ maxWidth: 760, margin: '14px auto 0', padding: '0 16px' }}>
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="文字で絞る..."
                    style={{
                        width: '100%', padding: '10px 14px',
                        border: `1px solid ${C.border}`, borderRadius: 10,
                        fontSize: 13, color: C.textPrimary, background: '#fff',
                        marginBottom: 10, outline: 'none',
                    }}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {NATIVE_PHRASE_TAGS.map(t => {
                        const active = activeTags.includes(t.id);
                        return (
                            <button
                                key={t.id}
                                onClick={() => toggleTag(t.id)}
                                style={{
                                    padding: '4px 10px',
                                    background: active ? t.color : '#fff',
                                    color: active ? '#fff' : t.color,
                                    border: `1.5px solid ${t.color}`,
                                    borderRadius: 999,
                                    fontSize: 11, fontWeight: 700,
                                    cursor: 'pointer',
                                }}
                            >
                                {t.label}
                            </button>
                        );
                    })}
                    {activeTags.length > 0 && (
                        <button
                            onClick={() => setActiveTags([])}
                            style={{
                                padding: '4px 10px', background: '#fff',
                                color: C.textDim, border: `1.5px solid ${C.border}`,
                                borderRadius: 999, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                            }}
                        >
                            × クリア
                        </button>
                    )}
                </div>
                <div style={{ fontSize: 11, color: C.textFaint, marginBottom: 10 }}>
                    {filtered.length} / {NATIVE_PHRASES.length} フレーズ
                </div>
            </div>

            {/* Phrase cards */}
            <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 16px' }}>
                {filtered.map(p => (
                    <PhraseCard
                        key={p.slug}
                        phrase={p}
                        reps={stats.phraseReps[p.slug] ?? 0}
                        onRep={() => bumpRep(p.slug)}
                    />
                ))}
                {filtered.length === 0 && (
                    <div style={{
                        padding: 32, textAlign: 'center',
                        background: '#fff', border: `1px dashed ${C.border}`, borderRadius: 14,
                        color: C.textDim, fontSize: 13,
                    }}>
                        該当フレーズなし。タグか検索を変えて。
                    </div>
                )}
            </div>
        </div>
    );
}
