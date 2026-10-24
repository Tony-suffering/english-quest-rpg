'use client';

import { useEffect, useState, useMemo } from 'react';
import {
    KPI_WEEKLY_TARGETS,
    METRICS_TO_TRACK,
    FOLLOW_PRINCIPLES,
    getDayNumber,
    getDateForDay,
} from '@/data/x-playbook';

const STORAGE_KEY = 'x_playbook_v2';

interface DayState {
    morning?: boolean;
    midday?: boolean;
    evening?: boolean;
    replies: string[];
    follows?: number;
    selfReply?: boolean;
    review?: string;
    followerCount?: number;
}

function loadState(): Record<string, DayState> {
    if (typeof window === 'undefined') return {};
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
}

export default function KpiClient() {
    const [state, setState] = useState<Record<string, DayState>>({});
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setState(loadState());
        setHydrated(true);
    }, []);

    const today = useMemo(() => getDayNumber(), []);

    const weeklyActuals = useMemo(() => {
        return KPI_WEEKLY_TARGETS.map(w => {
            let posts = 0, replies = 0, follows = 0, selfReply = 0;
            let endFollowerCount = 0;
            for (let d = w.dayRange[0]; d <= w.dayRange[1]; d++) {
                const ds = state[`day-${d}`];
                if (!ds) continue;
                if (ds.morning) posts++;
                if (ds.midday) posts++;
                if (ds.evening) posts++;
                replies += ds.replies?.length ?? 0;
                follows += ds.follows ?? 0;
                if (ds.selfReply) selfReply++;
                if (ds.followerCount) endFollowerCount = ds.followerCount;
            }
            return { week: w, posts, replies, follows, selfReply, endFollowerCount };
        });
    }, [state]);

    const followerHistory = useMemo(() => {
        const h: { day: number; date: string; count: number }[] = [];
        for (let d = 1; d <= 30; d++) {
            const ds = state[`day-${d}`];
            if (ds?.followerCount !== undefined && ds.followerCount > 0) {
                h.push({ day: d, date: getDateForDay(d), count: ds.followerCount });
            }
        }
        return h;
    }, [state]);

    const responseRate = useMemo(() => {
        // 簡易: リプ完了総数のうち、振り返りに「返信」「リプきた」と書いてあるものをカウント (ヒューリスティック)
        let totalReplies = 0;
        let dayWithReply = 0;
        let dayMentioningResponse = 0;
        Object.values(state).forEach(d => {
            const r = d.replies?.length ?? 0;
            totalReplies += r;
            if (r > 0) dayWithReply++;
            if (d.review && /(返信|リプ|反応|きた)/.test(d.review)) dayMentioningResponse++;
        });
        return { totalReplies, dayWithReply, dayMentioningResponse };
    }, [state]);

    if (!hydrated) return <div style={{ padding: 40, color: '#888' }}>読み込み中...</div>;

    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 16px' }}>
            <div style={{ backgroundColor: '#fff', border: '1px solid #e7e5e4', borderRadius: 16, padding: '20px 24px', marginBottom: 16, borderLeft: '4px solid #7C3AED' }}>
                <div style={{ fontSize: 11, color: '#a8a29e', letterSpacing: '0.2em', marginBottom: 4 }}>KPI / EFFECT TRACKING</div>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1c1917', margin: '0 0 6px 0' }}>効果測定ダッシュボード</h1>
                <div style={{ fontSize: 12, color: '#525252', lineHeight: 1.6 }}>
                    Day {today} / 90 · 週次目標 vs 実績 / フォロワー推移 / 計測すべき指標
                </div>
            </div>

            {/* === 週次目標 vs 実績 === */}
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#525252', margin: '24px 4px 12px', letterSpacing: '0.05em' }}>週次 KPI</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {weeklyActuals.map(({ week, posts, replies, follows, selfReply, endFollowerCount }) => {
                    const isCurrent = today >= week.dayRange[0] && today <= week.dayRange[1];
                    const isPast = today > week.dayRange[1];
                    return (
                        <div
                            key={week.week}
                            style={{
                                backgroundColor: '#fff',
                                border: '1px solid #e7e5e4',
                                borderLeft: `4px solid ${isCurrent ? '#D4AF37' : isPast ? '#10B981' : '#e7e5e4'}`,
                                borderRadius: 12,
                                padding: '16px 20px',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 14, fontWeight: 800, color: '#1c1917' }}>Week {week.week}</span>
                                <span style={{ fontSize: 11, color: '#888' }}>Day {week.dayRange[0]}-{week.dayRange[1]}</span>
                                {isCurrent && <span style={{ fontSize: 10, fontWeight: 700, color: '#92400E', backgroundColor: '#FEF3C7', padding: '2px 8px', borderRadius: 4 }}>NOW</span>}
                                {isPast && <span style={{ fontSize: 10, fontWeight: 700, color: '#065F46', backgroundColor: '#d1fae5', padding: '2px 8px', borderRadius: 4 }}>完了</span>}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 8 }}>
                                <KpiBar label="フォロワー" actual={endFollowerCount} target={week.followers.target} min={week.followers.min} />
                                <KpiBar label="投稿" actual={posts} target={week.posts} />
                                <KpiBar label="リプ" actual={replies} target={week.replies} />
                                <KpiBar label="自リプ100%" actual={selfReply} target={week.dayRange[1] - week.dayRange[0] + 1} suffix="日" />
                                <KpiBar label="フォロー" actual={follows} target={140} note="目安" />
                            </div>
                            <div style={{ fontSize: 11, color: '#525252', fontStyle: 'italic' }}>{week.note}</div>
                        </div>
                    );
                })}
            </div>

            {/* === フォロワー推移 (簡易グラフ) === */}
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#525252', margin: '24px 4px 12px' }}>フォロワー推移</h2>
            <div style={{ backgroundColor: '#fff', border: '1px solid #e7e5e4', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
                {followerHistory.length === 0 ? (
                    <div style={{ fontSize: 12, color: '#888', textAlign: 'center', padding: 20 }}>
                        まだ記録なし。カレンダータブで「現在のフォロワー数」を毎日入力すると、ここにグラフが出ます。
                    </div>
                ) : (
                    <FollowerChart history={followerHistory} />
                )}
            </div>

            {/* === レスポンス率 === */}
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#525252', margin: '24px 4px 12px' }}>リプ営業の手応え</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
                <BigStat label="累計リプ数" value={responseRate.totalReplies} accent="#10B981" sub={`${responseRate.dayWithReply} 日活動`} />
                <BigStat label="反応あった日" value={responseRate.dayMentioningResponse} accent="#D4AF37" sub="振り返り中の言及から推定" />
                <BigStat
                    label="想定レスポンス率"
                    value={`${responseRate.totalReplies > 0 ? Math.round((responseRate.dayMentioningResponse / Math.max(1, responseRate.dayWithReply)) * 100) : 0}%`}
                    accent="#7C3AED"
                    sub="20%超 = ターゲット良好"
                />
            </div>

            {/* === 計測すべき指標 === */}
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#525252', margin: '24px 4px 12px' }}>計測すべき指標 (どこで・いつ見るか)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginBottom: 24 }}>
                {METRICS_TO_TRACK.map(m => (
                    <div key={m.name} style={{ backgroundColor: '#fff', border: '1px solid #e7e5e4', borderRadius: 12, padding: '14px 16px' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#1c1917', marginBottom: 6 }}>{m.name}</div>
                        <div style={{ fontSize: 11, color: '#525252', lineHeight: 1.6, marginBottom: 4 }}>
                            <strong style={{ color: '#888' }}>どこで:</strong> {m.where}
                        </div>
                        <div style={{ fontSize: 11, color: '#525252', lineHeight: 1.6, marginBottom: 4 }}>
                            <strong style={{ color: '#888' }}>いつ:</strong> {m.when}
                        </div>
                        <div style={{ fontSize: 11, color: '#1c1917', lineHeight: 1.6, fontStyle: 'italic' }}>
                            {m.why}
                        </div>
                    </div>
                ))}
            </div>

            {/* === フォロー戦略の原則 === */}
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#525252', margin: '24px 4px 12px' }}>フォロー原則 (凍結回避)</h2>
            <div style={{ backgroundColor: '#fff', border: '1px solid #e7e5e4', borderRadius: 12, padding: '16px 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {FOLLOW_PRINCIPLES.map((p, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 12px', backgroundColor: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: 6 }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: '#0891B2', minWidth: 200 }}>{p.rule}</div>
                            <div style={{ fontSize: 11, color: '#525252', lineHeight: 1.5 }}>{p.why}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function KpiBar({ label, actual, target, min, suffix, note }: { label: string; actual: number; target: number; min?: number; suffix?: string; note?: string }) {
    const pct = target > 0 ? Math.min(100, (actual / target) * 100) : 0;
    const reachedMin = min !== undefined && actual >= min;
    const reachedTarget = actual >= target;
    const color = reachedTarget ? '#10B981' : reachedMin ? '#D4AF37' : actual === 0 ? '#e7e5e4' : '#0891B2';
    return (
        <div>
            <div style={{ fontSize: 10, color: '#888', marginBottom: 2 }}>{label}{note && ` (${note})`}</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#1c1917' }}>
                {actual}{suffix ?? ''}
                <span style={{ fontSize: 10, color: '#888', fontWeight: 500, marginLeft: 4 }}>
                    / {min !== undefined ? `${min}-` : ''}{target}{suffix ?? ''}
                </span>
            </div>
            <div style={{ marginTop: 4, height: 4, backgroundColor: '#f5f5f4', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, backgroundColor: color }} />
            </div>
        </div>
    );
}

function BigStat({ label, value, accent, sub }: { label: string; value: string | number; accent: string; sub?: string }) {
    return (
        <div style={{ backgroundColor: '#fff', border: '1px solid #e7e5e4', borderRadius: 12, padding: '14px 18px' }}>
            <div style={{ fontSize: 10, color: '#888', letterSpacing: '0.05em', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: accent, lineHeight: 1.1 }}>{value}</div>
            {sub && <div style={{ fontSize: 10, color: '#888', marginTop: 4 }}>{sub}</div>}
        </div>
    );
}

function FollowerChart({ history }: { history: { day: number; date: string; count: number }[] }) {
    const max = Math.max(...history.map(h => h.count));
    const min = Math.min(...history.map(h => h.count));
    const range = max - min || 1;
    const w = 600;
    const h = 120;
    const points = history.map((p, i) => {
        const x = history.length > 1 ? (i / (history.length - 1)) * w : w / 2;
        const y = h - ((p.count - min) / range) * h * 0.85 - h * 0.1;
        return `${x},${y}`;
    }).join(' ');
    return (
        <div>
            <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 120 }} preserveAspectRatio="none">
                <polyline points={points} fill="none" stroke="#10B981" strokeWidth="2" />
                {history.map((p, i) => {
                    const x = history.length > 1 ? (i / (history.length - 1)) * w : w / 2;
                    const y = h - ((p.count - min) / range) * h * 0.85 - h * 0.1;
                    return <circle key={i} cx={x} cy={y} r="3" fill="#10B981" />;
                })}
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#888', marginTop: 6 }}>
                <span>Day {history[0].day} ({history[0].count})</span>
                <span>Day {history[history.length - 1].day} ({history[history.length - 1].count})</span>
            </div>
        </div>
    );
}
