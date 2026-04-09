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
        setPhase('celebrate');
        playCheckinCelebration();
        // Stagger the celebration reveal
        setTimeout(() => setCelebrateStep(1), 200);  // ring burst
        setTimeout(() => setCelebrateStep(2), 600);  // text
        setTimeout(() => setCelebrateStep(3), 1000); // picks reveal
        setTimeout(() => setCelebrateStep(4), 1800); // streak
        setTimeout(() => setCelebrateStep(5), 2800); // ready to dismiss
        setTimeout(() => onComplete(picks), 4000);
    }, [selected, onComplete]);

    // ── Celebrate phase ──
    if (phase === 'celebrate') {
        const streakResult = streakResultRef.current || { current: 1, best: 1, isNew: true };
        const pickedExpressions = expressions.filter(e => selected.has(e.id));
        const isFirstEver = streakResult.current === 1 && streakResult.isNew;

        return (
            <div style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                backgroundColor: 'rgba(0,0,0,0.92)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', padding: 24,
                animation: 'celFadeIn 0.4s ease-out',
                overflow: 'hidden',
            }}>
                <style>{`
                    @keyframes celFadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes celRingBurst {
                        0% { transform: scale(0); opacity: 1; }
                        60% { transform: scale(1); opacity: 1; }
                        100% { transform: scale(1.8); opacity: 0; }
                    }
                    @keyframes celCheckPop {
                        0% { transform: scale(0) rotate(-45deg); opacity: 0; }
                        60% { transform: scale(1.15) rotate(0deg); opacity: 1; }
                        100% { transform: scale(1) rotate(0deg); opacity: 1; }
                    }
                    @keyframes celGlow {
                        0%, 100% { box-shadow: 0 0 30px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.1); }
                        50% { box-shadow: 0 0 50px rgba(212,175,55,0.6), 0 0 100px rgba(212,175,55,0.2); }
                    }
                    @keyframes celRays {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes celTextUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes celPickSlide {
                        from { opacity: 0; transform: translateX(-24px); }
                        to { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes celParticle {
                        0% { opacity: 1; transform: translate(0, 0) scale(1); }
                        100% { opacity: 0; transform: translate(var(--px), var(--py)) scale(0); }
                    }
                    @keyframes celStreakCount {
                        from { opacity: 0; transform: scale(0.5); }
                        to { opacity: 1; transform: scale(1); }
                    }
                    @keyframes celShine {
                        0% { left: -100%; }
                        100% { left: 200%; }
                    }
                `}</style>

                {/* Rotating light rays behind the icon */}
                {celebrateStep >= 1 && (
                    <div style={{
                        position: 'absolute',
                        width: 300, height: 300,
                        animation: 'celRays 20s linear infinite',
                        opacity: 0.15,
                    }}>
                        {Array.from({ length: 12 }, (_, i) => (
                            <div key={i} style={{
                                position: 'absolute',
                                left: '50%', top: '50%',
                                width: 2, height: 150,
                                background: `linear-gradient(to top, transparent, ${gold})`,
                                transformOrigin: 'bottom center',
                                transform: `translateX(-50%) rotate(${i * 30}deg)`,
                            }} />
                        ))}
                    </div>
                )}

                {/* Particle burst */}
                {celebrateStep >= 1 && (
                    <div style={{ position: 'absolute', width: 0, height: 0 }}>
                        {Array.from({ length: 20 }, (_, i) => {
                            const angle = (i / 20) * Math.PI * 2;
                            const dist = 80 + Math.random() * 100;
                            const px = Math.cos(angle) * dist;
                            const py = Math.sin(angle) * dist;
                            const size = 3 + Math.random() * 5;
                            const colors = [gold, '#F5D76E', '#FFE4A0', '#10B981', '#fff'];
                            return (
                                <div key={i} style={{
                                    position: 'absolute',
                                    width: size, height: size,
                                    borderRadius: '50%',
                                    backgroundColor: colors[i % colors.length],
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ['--px' as any]: `${px}px`,
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    ['--py' as any]: `${py}px`,
                                    animation: `celParticle ${0.8 + Math.random() * 0.6}s ease-out ${Math.random() * 0.3}s forwards`,
                                }} />
                            );
                        })}
                    </div>
                )}

                {/* Expanding ring burst */}
                {celebrateStep >= 1 && (
                    <>
                        <div style={{
                            position: 'absolute',
                            width: 100, height: 100, borderRadius: '50%',
                            border: `3px solid ${gold}`,
                            animation: 'celRingBurst 0.8s ease-out forwards',
                        }} />
                        <div style={{
                            position: 'absolute',
                            width: 100, height: 100, borderRadius: '50%',
                            border: `2px solid ${green}`,
                            animation: 'celRingBurst 0.8s ease-out 0.15s forwards',
                            opacity: 0,
                        }} />
                    </>
                )}

                {/* Main check icon */}
                <div style={{
                    width: 88, height: 88, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${gold}, #F5D76E, ${gold})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: celebrateStep >= 1
                        ? 'celCheckPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, celGlow 2s ease-in-out 0.5s infinite'
                        : 'none',
                    opacity: celebrateStep >= 1 ? undefined : 0,
                    marginBottom: 20,
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {/* Shine sweep */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                        animation: 'celShine 1.5s ease-in-out 0.6s',
                    }} />
                </div>

                {/* Text content */}
                {celebrateStep >= 2 && (
                    <div style={{ textAlign: 'center', animation: 'celTextUp 0.5s ease-out' }}>
                        <div style={{
                            fontSize: 10, letterSpacing: '0.35em', color: gold,
                            fontWeight: 700, marginBottom: 10,
                        }}>
                            {isFirstEver ? 'FIRST CHECK IN' : 'CHECK IN COMPLETE'}
                        </div>
                        <div style={{
                            fontSize: 28, fontWeight: 900, color: '#fff', marginBottom: 4,
                            textShadow: `0 0 30px rgba(212,175,55,0.3)`,
                        }}>
                            Day {day}
                        </div>
                        {isFirstEver && (
                            <div style={{
                                fontSize: 12, color: '#888', fontWeight: 300, marginTop: 4,
                                animation: 'celTextUp 0.5s ease-out 0.2s both',
                            }}>
                                365日の旅が始まった
                            </div>
                        )}
                    </div>
                )}

                {/* Selected 3 picks reveal */}
                {celebrateStep >= 3 && (
                    <div style={{
                        marginTop: 24, width: '100%', maxWidth: 320,
                        display: 'flex', flexDirection: 'column', gap: 6,
                    }}>
                        <div style={{
                            fontSize: 9, letterSpacing: '0.25em', color: '#555',
                            fontWeight: 700, textAlign: 'center', marginBottom: 4,
                            animation: 'celTextUp 0.3s ease-out both',
                        }}>
                            TODAY&apos;S PICKS
                        </div>
                        {pickedExpressions.map((expr, i) => {
                            const charColor = CHARACTER_COLORS[expr.character] || '#78716C';
                            return (
                                <div key={expr.id} style={{
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    padding: '10px 14px',
                                    backgroundColor: 'rgba(212,175,55,0.06)',
                                    border: `1px solid rgba(212,175,55,0.15)`,
                                    borderRadius: 8,
                                    animation: `celPickSlide 0.4s ease-out ${i * 0.12}s both`,
                                }}>
                                    <div style={{
                                        width: 6, height: 6, borderRadius: '50%',
                                        backgroundColor: charColor, flexShrink: 0,
                                    }} />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.3 }}>
                                            {expr.japanese}
                                        </div>
                                        <div style={{ fontSize: 11, color: gold, lineHeight: 1.4, opacity: 0.8 }}>
                                            {expr.english}
                                        </div>
                                    </div>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="2.5" strokeLinecap="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                            );
                        })}
                        <div style={{
                            fontSize: 10, color: '#444', textAlign: 'center', marginTop: 4,
                            animation: `celTextUp 0.3s ease-out ${pickedExpressions.length * 0.12 + 0.2}s both`,
                        }}>
                            <span style={{ color: green }}>仕込み帳</span>に追加済み
                        </div>
                    </div>
                )}

                {/* Streak display */}
                {celebrateStep >= 4 && streakResult.current >= 2 && (
                    <div style={{
                        marginTop: 20, textAlign: 'center',
                        animation: 'celStreakCount 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'baseline', gap: 6,
                            padding: '8px 20px',
                            background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(16,185,129,0.08))',
                            border: '1px solid rgba(212,175,55,0.2)',
                            borderRadius: 20,
                        }}>
                            <span style={{ fontSize: 24, fontWeight: 900, color: gold }}>
                                {streakResult.current}
                            </span>
                            <span style={{ fontSize: 11, color: '#888', fontWeight: 500, letterSpacing: '0.05em' }}>
                                day streak
                            </span>
                        </div>
                    </div>
                )}
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
                    選んだ3つは自動で<span style={{ color: '#10B981' }}>仕込み帳</span>に追加されます。
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
