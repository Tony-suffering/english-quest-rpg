'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { playCheckinSelect, playCheckinDeselect, playCheckin3Ready, playCheckinCelebration } from '@/lib/kaiwa-sounds';

// ─── Types ─────────────────────────────────────────────────

interface CheckinExpression {
    id: string;
    japanese: string;
    english: string; // Vibe level
    character: string;
    category: string;
}

interface DailyCheckinProps {
    day: number;
    expressions: CheckinExpression[];
    onComplete: (picks: string[]) => void;
    streak: { current: number; best: number };
}

// ─── Persistence ───────────────────────────────────────────

const CHECKIN_PREFIX = '365-checkin-';
const STREAK_KEY = '365-checkin-streak';

export function getTodayStr(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function isCheckedInToday(): boolean {
    return localStorage.getItem(CHECKIN_PREFIX + getTodayStr()) !== null;
}

export function getTodayPicks(): string[] {
    try {
        const raw = localStorage.getItem(CHECKIN_PREFIX + getTodayStr());
        if (!raw) return [];
        return JSON.parse(raw).picks || [];
    } catch { return []; }
}

export function loadCheckinStreak(): { current: number; lastDate: string; best: number } {
    try {
        const raw = localStorage.getItem(STREAK_KEY);
        if (!raw) return { current: 0, lastDate: '', best: 0 };
        return JSON.parse(raw);
    } catch { return { current: 0, lastDate: '', best: 0 }; }
}

function getYesterdayStr(): string {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function recordCheckinStreak(): { current: number; best: number; isNew: boolean } {
    const today = getTodayStr();
    const saved = loadCheckinStreak();
    if (saved.lastDate === today) return { current: saved.current, best: saved.best, isNew: false };

    const yesterday = getYesterdayStr();
    const newCurrent = saved.lastDate === yesterday ? saved.current + 1 : 1;
    const newBest = Math.max(saved.best, newCurrent);
    localStorage.setItem(STREAK_KEY, JSON.stringify({ current: newCurrent, lastDate: today, best: newBest }));
    return { current: newCurrent, best: newBest, isNew: true };
}

function saveCheckin(picks: string[]) {
    const today = getTodayStr();
    localStorage.setItem(CHECKIN_PREFIX + today, JSON.stringify({
        picks,
        timestamp: new Date().toISOString(),
    }));
}

export function getCheckinDaysForMonth(year: number, month: number): Set<number> {
    const days = new Set<number>();
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    for (let d = 1; d <= 31; d++) {
        const key = CHECKIN_PREFIX + `${prefix}-${String(d).padStart(2, '0')}`;
        if (localStorage.getItem(key) !== null) days.add(d);
    }
    return days;
}

// ─── Streak Milestones ─────────────────────────────────────

export const STREAK_MILESTONES = [
    { days: 3, title: '3-Day Streak', message: 'Three days running. The habit is forming.' },
    { days: 7, title: '1 Week', message: 'One week. This is no longer luck.' },
    { days: 14, title: '2 Weeks', message: 'Two weeks. You are building something.' },
    { days: 30, title: '1 Month', message: 'One month. Others quit. You did not.' },
    { days: 60, title: '2 Months', message: 'Sixty days. This is discipline, not motivation.' },
    { days: 100, title: '100 Days', message: 'Triple digits. This is who you are now.' },
    { days: 200, title: '200 Days', message: 'Two hundred. Most people never get here.' },
    { days: 365, title: '1 Year', message: 'One full year. Master.' },
];

export function checkMilestone(streakDays: number): typeof STREAK_MILESTONES[0] | null {
    const seen: number[] = JSON.parse(localStorage.getItem('365-milestones-seen') || '[]');
    const ms = STREAK_MILESTONES.find(m => m.days === streakDays && !seen.includes(m.days));
    if (ms) {
        seen.push(ms.days);
        localStorage.setItem('365-milestones-seen', JSON.stringify(seen));
    }
    return ms || null;
}

// ─── Colors ────────────────────────────────────────────────

const gold = '#D4AF37';
const green = '#10B981';

const CHARACTER_COLORS: Record<string, string> = {
    yuki: '#D4AF37', master: '#78716C', takeshi: '#3B82F6',
    lisa: '#EC4899', kenji: '#92400E', mina: '#8B5CF6',
};

// ─── Component ─────────────────────────────────────────────

export default function DailyCheckin({ day, expressions, onComplete, streak }: DailyCheckinProps) {
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [phase, setPhase] = useState<'pick' | 'celebrate'>('pick');
    const [fadeIn, setFadeIn] = useState(false);
    const [celebrateStep, setCelebrateStep] = useState(0);
    const prev3Ready = useRef(false);
    const streakResultRef = useRef<{ current: number; best: number; isNew: boolean } | null>(null);

    useEffect(() => {
        requestAnimationFrame(() => setFadeIn(true));
    }, []);

    // Detect when 3 picks are reached → play ready sound
    useEffect(() => {
        if (selected.size === 3 && !prev3Ready.current) {
            prev3Ready.current = true;
            playCheckin3Ready();
        } else if (selected.size < 3) {
            prev3Ready.current = false;
        }
    }, [selected.size]);

    const toggle = useCallback((id: string) => {
        setSelected(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
                playCheckinDeselect();
            } else if (next.size < 3) {
                next.add(id);
                playCheckinSelect();
            }
            return next;
        });
    }, []);

    const handleCheckin = useCallback(() => {
        const picks = Array.from(selected);
        saveCheckin(picks);
        streakResultRef.current = recordCheckinStreak();
        // Register phrases immediately (don't wait for animation)
        onComplete(picks);
        setPhase('celebrate');
        playCheckinCelebration();
        // Stagger the celebration reveal
        setTimeout(() => setCelebrateStep(1), 200);  // ring burst
        setTimeout(() => setCelebrateStep(2), 600);  // text
        setTimeout(() => setCelebrateStep(3), 1000); // picks reveal
        setTimeout(() => setCelebrateStep(4), 1800); // streak
        setTimeout(() => setCelebrateStep(5), 2800); // ready to dismiss
    }, [selected, onComplete]);

    // ── Celebrate phase ──
    if (phase === 'celebrate') {
        const streakResult = streakResultRef.current || { current: 1, best: 1, isNew: true };
        const pickedExpressions = expressions.filter(e => selected.has(e.id));
        const isFirstEver = streakResult.current === 1 && streakResult.isNew;
        const easing = 'cubic-bezier(0.2, 0.65, 0.3, 0.9)';

        // Deterministic dust particles (no random, SSR-safe, consistent)
        const dust = Array.from({ length: 16 }, (_, i) => ({
            left: (i * 41 + 7) % 100,
            delay: (i * 0.37) % 5,
            duration: 9 + ((i * 1.3) % 5),
            size: 1.5 + ((i * 0.7) % 2.5),
            drift: ((i * 13) % 30) - 15,
        }));

        return (
            <div style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'radial-gradient(ellipse at center, #1a1917 0%, #050403 75%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', padding: '40px 24px',
                animation: 'celFadeIn 0.6s ease-out',
                overflow: 'hidden',
            }}>
                <style>{`
                    @keyframes celFadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes celRise {
                        from { opacity: 0; transform: translateY(14px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes celRingExpand {
                        0%   { transform: scale(0.6); opacity: 0; }
                        40%  { opacity: 0.5; }
                        100% { transform: scale(1.15); opacity: 0; }
                    }
                    @keyframes celOrbPulse {
                        0%, 100% { transform: scale(1);    opacity: 0.75; }
                        50%      { transform: scale(1.06); opacity: 1; }
                    }
                    @keyframes celDust {
                        0%   { transform: translateY(0) translateX(0); opacity: 0; }
                        10%  { opacity: 0.7; }
                        90%  { opacity: 0.5; }
                        100% { transform: translateY(-110vh) translateX(var(--drift, 0px)); opacity: 0; }
                    }
                    @keyframes celShimmer {
                        0%   { background-position: -200% 0; }
                        100% { background-position:  200% 0; }
                    }
                    .cel-shimmer {
                        background: linear-gradient(
                            90deg,
                            #ffffff 0%,
                            #ffffff 35%,
                            ${gold} 50%,
                            #ffffff 65%,
                            #ffffff 100%
                        );
                        background-size: 200% 100%;
                        -webkit-background-clip: text;
                        background-clip: text;
                        -webkit-text-fill-color: transparent;
                        color: transparent;
                        animation: celShimmer 5s linear infinite;
                    }
                    .cel-dust {
                        position: absolute;
                        bottom: -10px;
                        width: var(--s);
                        height: var(--s);
                        border-radius: 50%;
                        background: ${gold};
                        box-shadow: 0 0 6px ${gold}aa, 0 0 12px ${gold}55;
                        animation: celDust var(--d) linear infinite;
                        animation-delay: var(--dl);
                        pointer-events: none;
                    }
                `}</style>

                {/* Ambient gold orb */}
                <div style={{
                    position: 'absolute',
                    width: 560, height: 560, borderRadius: '50%',
                    background: `radial-gradient(circle, ${gold}20 0%, ${gold}06 40%, transparent 70%)`,
                    filter: 'blur(60px)',
                    opacity: celebrateStep >= 1 ? 1 : 0,
                    transition: 'opacity 1.2s ease-out',
                    animation: celebrateStep >= 2 ? 'celOrbPulse 5s ease-in-out infinite' : 'none',
                    pointerEvents: 'none',
                }} />

                {/* Rising dust particles */}
                {celebrateStep >= 1 && dust.map((p, i) => (
                    <div
                        key={i}
                        className="cel-dust"
                        style={{
                            left: `${p.left}%`,
                            ['--s' as string]: `${p.size}px`,
                            ['--d' as string]: `${p.duration}s`,
                            ['--dl' as string]: `${p.delay}s`,
                            ['--drift' as string]: `${p.drift}px`,
                        } as React.CSSProperties}
                    />
                ))}

                {/* Thin gold ring — single graceful expansion */}
                {celebrateStep >= 1 && (
                    <div style={{
                        position: 'absolute',
                        width: 340, height: 340, borderRadius: '50%',
                        border: `1px solid ${gold}50`,
                        animation: `celRingExpand 2.4s ${easing} forwards`,
                        pointerEvents: 'none',
                    }} />
                )}

                {/* Content */}
                <div style={{
                    position: 'relative', zIndex: 1,
                    maxWidth: 520, width: '100%', textAlign: 'center',
                }}>
                    {/* Label */}
                    <div style={{
                        opacity: celebrateStep >= 1 ? 1 : 0,
                        transform: celebrateStep >= 1 ? 'translateY(0)' : 'translateY(-8px)',
                        transition: `all 1s ${easing}`,
                        marginBottom: 18,
                    }}>
                        <div style={{
                            fontSize: 10, letterSpacing: '0.45em', color: gold,
                            fontWeight: 700,
                            textShadow: `0 0 20px ${gold}80`,
                        }}>
                            {isFirstEver ? 'FIRST CHECK IN' : 'CHECK IN'}
                        </div>
                    </div>

                    {/* Day number — star */}
                    <div style={{
                        opacity: celebrateStep >= 2 ? 1 : 0,
                        transform: celebrateStep >= 2 ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.96)',
                        transition: `all 1.2s ${easing}`,
                        marginBottom: 14,
                    }}>
                        <div
                            className={celebrateStep >= 3 ? 'cel-shimmer' : ''}
                            style={{
                                fontSize: 72,
                                fontWeight: 200,
                                color: celebrateStep >= 3 ? undefined : '#fff',
                                lineHeight: 1,
                                fontFamily: 'Georgia, serif',
                                letterSpacing: '-0.01em',
                                textShadow: celebrateStep >= 3 ? 'none' : `0 0 40px ${gold}50`,
                            }}
                        >
                            Day {day}
                        </div>
                    </div>

                    {/* Gold divider */}
                    <div style={{
                        width: celebrateStep >= 3 ? 60 : 0,
                        height: 1,
                        background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
                        margin: '0 auto 24px',
                        transition: `width 1s ${easing}`,
                        boxShadow: celebrateStep >= 3 ? `0 0 12px ${gold}80` : 'none',
                    }} />

                    {/* Subtitle */}
                    {isFirstEver && (
                        <div style={{
                            opacity: celebrateStep >= 3 ? 0.6 : 0,
                            transform: celebrateStep >= 3 ? 'translateY(0)' : 'translateY(6px)',
                            transition: `all 0.9s ${easing} 0.2s`,
                            marginBottom: 28,
                            fontSize: 12, color: '#b8b8b8', fontStyle: 'italic',
                            fontWeight: 300, letterSpacing: '0.04em',
                        }}>
                            365日の旅が、今日始まる
                        </div>
                    )}

                    {/* Selected 3 picks — minimal list */}
                    {celebrateStep >= 3 && (
                        <div style={{
                            width: '100%', maxWidth: 420, margin: '0 auto',
                            display: 'flex', flexDirection: 'column', gap: 10,
                            marginTop: isFirstEver ? 0 : 8,
                        }}>
                            <div style={{
                                fontSize: 9, letterSpacing: '0.35em', color: `${gold}aa`,
                                fontWeight: 700, marginBottom: 6,
                                animation: `celRise 0.8s ${easing} both`,
                            }}>
                                TODAY&apos;S THREE
                            </div>
                            {pickedExpressions.map((expr, i) => (
                                <div key={expr.id} style={{
                                    padding: '14px 18px',
                                    background: `linear-gradient(135deg, ${gold}0c, transparent)`,
                                    border: `1px solid ${gold}22`,
                                    borderLeft: `2px solid ${gold}`,
                                    textAlign: 'left',
                                    animation: `celRise 0.9s ${easing} ${0.15 + i * 0.18}s both`,
                                }}>
                                    <div style={{
                                        fontSize: 14, fontWeight: 400, color: '#f0f0f0',
                                        lineHeight: 1.5, marginBottom: 4,
                                    }}>
                                        {expr.japanese}
                                    </div>
                                    <div style={{
                                        fontSize: 11, color: `${gold}cc`,
                                        lineHeight: 1.4, fontStyle: 'italic',
                                        letterSpacing: '0.01em',
                                    }}>
                                        {expr.english}
                                    </div>
                                </div>
                            ))}
                            <div style={{
                                fontSize: 10, color: '#666', marginTop: 8,
                                letterSpacing: '0.15em', textAlign: 'center',
                                animation: `celRise 0.8s ${easing} ${0.15 + pickedExpressions.length * 0.18 + 0.1}s both`,
                            }}>
                                トレーニングに登録完了
                            </div>
                        </div>
                    )}

                    {/* Streak — quiet pill */}
                    {celebrateStep >= 4 && streakResult.current >= 2 && (
                        <div style={{
                            marginTop: 28,
                            animation: `celRise 1s ${easing}`,
                        }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'baseline', gap: 8,
                                padding: '10px 22px',
                                border: `1px solid ${gold}40`,
                                background: `${gold}08`,
                                boxShadow: `0 0 24px ${gold}20`,
                            }}>
                                <span style={{
                                    fontSize: 22, fontWeight: 200, color: gold,
                                    fontFamily: 'Georgia, serif',
                                    textShadow: `0 0 16px ${gold}80`,
                                }}>
                                    {streakResult.current}
                                </span>
                                <span style={{
                                    fontSize: 10, color: `${gold}cc`, fontWeight: 600,
                                    letterSpacing: '0.2em',
                                }}>
                                    DAY STREAK
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // ── Pick phase ──
    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.92)',
            display: 'flex', flexDirection: 'column',
            opacity: fadeIn ? 1 : 0,
            transition: 'opacity 0.4s ease',
        }}>
            <style>{`
                @keyframes checkinSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes checkinBtnPulse { 0%, 100% { box-shadow: 0 4px 20px rgba(212,175,55,0.4); } 50% { box-shadow: 0 4px 30px rgba(212,175,55,0.7); } }
            `}</style>

            {/* Header */}
            <div style={{
                padding: '24px 20px 16px', textAlign: 'center',
                borderBottom: '1px solid #222',
            }}>
                <div style={{ fontSize: 10, letterSpacing: '0.3em', color: gold, fontWeight: 700, marginBottom: 8 }}>
                    TODAY&apos;S 3-PICK
                </div>
                <div style={{ fontSize: 20, fontWeight: 300, color: '#fff', marginBottom: 6 }}>
                    Day {day}
                </div>
                <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.8 }}>
                    今日の10表現から、<span style={{ color: '#fff', fontWeight: 600 }}>気になる3つ</span>を選んでください。
                </div>
                <div style={{ fontSize: 11, color: '#666', lineHeight: 1.6, marginTop: 4 }}>
                    選んだ3つは自動で<span style={{ color: '#10B981' }}>トレーニング</span>に登録されます。
                </div>
            </div>

            {/* Selection counter */}
            <div style={{
                display: 'flex', justifyContent: 'center', gap: 8,
                padding: '12px 20px',
            }}>
                {[0, 1, 2].map(i => (
                    <div key={i} style={{
                        width: i < selected.size ? 40 : 32,
                        height: 4, borderRadius: 2,
                        backgroundColor: i < selected.size ? gold : '#333',
                        transition: 'all 0.25s ease',
                        boxShadow: i < selected.size ? `0 0 8px rgba(212,175,55,0.4)` : 'none',
                    }} />
                ))}
            </div>

            {/* Expression list */}
            <div style={{
                flex: 1, overflowY: 'auto',
                padding: '8px 16px 120px',
            }}>
                {expressions.map((expr, idx) => {
                    const isSelected = selected.has(expr.id);
                    const charColor = CHARACTER_COLORS[expr.character] || '#78716C';
                    return (
                        <div
                            key={expr.id}
                            onClick={() => toggle(expr.id)}
                            style={{
                                padding: '14px 16px',
                                marginBottom: 6,
                                borderRadius: 10,
                                border: isSelected ? `2px solid ${gold}` : '2px solid #222',
                                backgroundColor: isSelected ? `${gold}08` : '#111',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                display: 'flex', gap: 12, alignItems: 'flex-start',
                                animation: `checkinSlideUp 0.3s ease-out ${idx * 0.04}s both`,
                                boxShadow: isSelected ? `0 0 12px rgba(212,175,55,0.1)` : 'none',
                            }}
                        >
                            {/* Number + check */}
                            <div style={{
                                width: 24, height: 24, borderRadius: '50%',
                                border: isSelected ? `2px solid ${gold}` : '2px solid #444',
                                backgroundColor: isSelected ? gold : 'transparent',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0, marginTop: 2,
                                transition: 'all 0.15s ease',
                                boxShadow: isSelected ? `0 0 8px rgba(212,175,55,0.3)` : 'none',
                            }}>
                                {isSelected ? (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                                ) : (
                                    <span style={{ fontSize: 10, color: '#555', fontWeight: 700 }}>{idx + 1}</span>
                                )}
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: 4 }}>
                                    {expr.japanese}
                                </div>
                                <div style={{ fontSize: 13, color: isSelected ? gold : '#888', lineHeight: 1.5, transition: 'color 0.15s' }}>
                                    {expr.english}
                                </div>
                            </div>

                            {/* Character dot */}
                            <div style={{
                                width: 8, height: 8, borderRadius: '50%',
                                backgroundColor: charColor, flexShrink: 0, marginTop: 8,
                                opacity: isSelected ? 1 : 0.6,
                                transition: 'opacity 0.15s',
                            }} />
                        </div>
                    );
                })}
            </div>

            {/* Bottom bar */}
            <div style={{
                position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10000,
                padding: '16px 20px 28px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.95) 30%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            }}>
                <button
                    onClick={handleCheckin}
                    disabled={selected.size < 3}
                    style={{
                        width: '100%', maxWidth: 360,
                        padding: '14px 32px', borderRadius: 0,
                        backgroundColor: selected.size >= 3 ? gold : '#333',
                        border: 'none',
                        color: selected.size >= 3 ? '#000' : '#666',
                        fontSize: 15, fontWeight: 800,
                        letterSpacing: '0.1em',
                        cursor: selected.size >= 3 ? 'pointer' : 'default',
                        transition: 'all 0.3s ease',
                        animation: selected.size >= 3 ? 'checkinBtnPulse 2s ease-in-out infinite' : 'none',
                        boxShadow: selected.size >= 3 ? '0 4px 20px rgba(212,175,55,0.4)' : 'none',
                    }}
                >
                    {selected.size < 3
                        ? `あと ${3 - selected.size} つ選んでください`
                        : 'CHECK IN'
                    }
                </button>
                {streak.current > 0 && (
                    <div style={{ fontSize: 11, color: '#555' }}>
                        Current streak: {streak.current} day{streak.current !== 1 ? 's' : ''}
                    </div>
                )}
            </div>
        </div>
    );
}
