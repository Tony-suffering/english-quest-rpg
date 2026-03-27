'use client';

import { useState, useEffect, useCallback } from 'react';

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

    useEffect(() => {
        requestAnimationFrame(() => setFadeIn(true));
    }, []);

    const toggle = useCallback((id: string) => {
        setSelected(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else if (next.size < 3) {
                next.add(id);
            }
            return next;
        });
    }, []);

    const handleCheckin = useCallback(() => {
        const picks = Array.from(selected);
        saveCheckin(picks);
        setPhase('celebrate');
        setTimeout(() => onComplete(picks), 1800);
    }, [selected, onComplete]);

    // ── Celebrate phase ──
    if (phase === 'celebrate') {
        const streakResult = recordCheckinStreak();
        return (
            <div style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                backgroundColor: 'rgba(0,0,0,0.88)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', padding: 24,
                animation: 'checkinFadeIn 0.3s ease-out',
            }}>
                <style>{`
                    @keyframes checkinFadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes checkinScale { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                    @keyframes checkinGlow { 0%, 100% { box-shadow: 0 0 20px rgba(212,175,55,0.3); } 50% { box-shadow: 0 0 40px rgba(212,175,55,0.6); } }
                `}</style>
                <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    backgroundColor: gold, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    animation: 'checkinScale 0.5s ease-out, checkinGlow 1.5s ease-in-out infinite',
                    marginBottom: 24,
                }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>
                <div style={{ fontSize: 10, letterSpacing: '0.3em', color: gold, fontWeight: 700, marginBottom: 8 }}>
                    CHECK IN COMPLETE
                </div>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 8 }}>
                    Day {day}
                </div>
                {streakResult.current >= 2 && (
                    <div style={{
                        fontSize: 14, color: '#ccc', fontWeight: 300,
                        animation: 'checkinScale 0.5s ease-out 0.3s both',
                    }}>
                        {streakResult.current} day streak
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
                    選んだ表現は仕込み帳に保存して、トレーニングで育てられます。
                </div>
            </div>

            {/* Selection counter */}
            <div style={{
                display: 'flex', justifyContent: 'center', gap: 8,
                padding: '12px 20px',
            }}>
                {[0, 1, 2].map(i => (
                    <div key={i} style={{
                        width: 32, height: 4, borderRadius: 2,
                        backgroundColor: i < selected.size ? gold : '#333',
                        transition: 'background-color 0.2s ease',
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
                                opacity: 0.6,
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
                        transition: 'all 0.2s ease',
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
