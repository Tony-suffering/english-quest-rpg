'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';

// ===== Types =====
interface Phrase { id: string; english: string; japanese: string; category: string; date: string; }
interface PhraseLink { phrase_id: string; text: string; created_at: string; }
interface VoiceRecording { id: number; phrase_id: string; url: string; created_at: string; }
type ChakraLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;
interface PlayerStats { total_xp: number; sparks: number; legendary_count: number; pity_counter: number; total_touches: number; }

// ===== Design Tokens =====
const T = {
    bg: '#F0EFE9',
    surface: '#FFFFFF',
    surfaceAlt: '#F7F6F3',
    panelBorder: '#D5D3CC',
    text: '#1C1917',
    textSub: '#57534E',
    textMuted: '#A8A29E',
    border: '#E7E5E4',
    borderLight: '#F0EEEA',
    green: '#10B981',
    greenSoft: '#ECFDF5',
    gold: '#D4AF37',
    goldSoft: '#FFFBEB',
    red: '#EF4444',
    blue: '#3B82F6',
    purple: '#8B5CF6',
    orange: '#F97316',
    navy: '#1E293B',
    navyLight: '#334155',
    shadow: '0 2px 4px rgba(0,0,0,0.06)',
    shadowMd: '0 4px 12px rgba(0,0,0,0.08)',
    radius: '16px',
    radiusSm: '10px',
    ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
};

const CHAKRA: Record<ChakraLevel, { name: string; ja: string; lv: number; color: string; bg: string }> = {
    0: { name: 'SEED',   ja: '種', lv: 1, color: '#DC2626', bg: '#FEF2F2' },
    1: { name: 'SPARK',  ja: '芽', lv: 2, color: '#EA580C', bg: '#FFF7ED' },
    2: { name: 'FORGE',  ja: '鍛', lv: 3, color: '#CA8A04', bg: '#FEFCE8' },
    3: { name: 'OWN',    ja: '得', lv: 4, color: '#16A34A', bg: '#F0FDF4' },
    4: { name: 'VOICE',  ja: '声', lv: 5, color: '#2563EB', bg: '#EFF6FF' },
    5: { name: 'VISION', ja: '研', lv: 6, color: '#4F46E5', bg: '#EEF2FF' },
    6: { name: 'CROWN',  ja: '極', lv: 7, color: '#7C3AED', bg: '#FAF5FF' },
};

function getLv(bm: number, rec: boolean, link: boolean): ChakraLevel {
    if (bm === 6) return 6;
    if (bm >= 3 && rec && link) return 5;
    if (bm >= 3 && rec) return 4;
    return Math.min(bm, 3) as ChakraLevel;
}

function xpForLevel(lv: number): number {
    if (lv <= 1) return 0;
    return Math.floor(13 * Math.pow(lv, 2.3));
}

function getPlayerLevel(totalXp: number): number {
    let lv = 1;
    while (xpForLevel(lv + 1) <= totalXp) lv++;
    return lv;
}

function getLevelTitle(lv: number): { title: string; color: string } {
    if (lv >= 100) return { title: '英語の神', color: '#D4AF37' };
    if (lv >= 81) return { title: '伝説', color: '#D4AF37' };
    if (lv >= 61) return { title: '賢者', color: '#7C3AED' };
    if (lv >= 41) return { title: '達人', color: '#DC2626' };
    if (lv >= 31) return { title: '猛者', color: '#EA580C' };
    if (lv >= 21) return { title: '実践者', color: '#CA8A04' };
    if (lv >= 11) return { title: '修行者', color: '#16A34A' };
    if (lv >= 6) return { title: '学徒', color: '#2563EB' };
    return { title: '見習い', color: '#78716C' };
}

function niceMax(v: number) {
    if (v <= 0) return 5;
    if (v <= 5) return 5;
    if (v <= 10) return 10;
    const mag = Math.pow(10, Math.floor(Math.log10(v)));
    const r = v / mag;
    if (r <= 1.5) return 1.5 * mag;
    if (r <= 2) return 2 * mag;
    if (r <= 3) return 3 * mag;
    if (r <= 5) return 5 * mag;
    return 10 * mag;
}

function smoothPath(points: [number, number][], tension = 0.3, yMin = -Infinity, yMax = Infinity): string {
    if (points.length < 2) return '';
    if (points.length === 2) return `M${points[0][0]},${points[0][1]}L${points[1][0]},${points[1][1]}`;
    const clampY = (y: number) => Math.max(yMin, Math.min(yMax, y));
    let d = `M${points[0][0]},${points[0][1]}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[Math.max(0, i - 1)];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[Math.min(points.length - 1, i + 2)];
        const cp1x = p1[0] + (p2[0] - p0[0]) * tension;
        const cp1y = clampY(p1[1] + (p2[1] - p0[1]) * tension);
        const cp2x = p2[0] - (p3[0] - p1[0]) * tension;
        const cp2y = clampY(p2[1] - (p3[1] - p1[1]) * tension);
        d += `C${cp1x},${cp1y},${cp2x},${cp2y},${p2[0]},${p2[1]}`;
    }
    return d;
}

// ===== Main =====
export default function AnalyticsPage() {
    const [phrases, setPhrases] = useState<Phrase[]>([]);
    const [mast, setMast] = useState<Record<string, number>>({});
    const [recs, setRecs] = useState<Record<string, VoiceRecording[]>>({});
    const [lnks, setLnks] = useState<Record<string, PhraseLink[]>>({});
    const [rc, setRc] = useState<Record<string, { count: number; xp: number }>>({});
    const [dt, setDt] = useState<Record<string, number>>({});
    const [ps, setPs] = useState<PlayerStats | null>(null);
    const [cm, setCm] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [today, setToday] = useState('');
    const [hoverDay, setHoverDay] = useState<number | null>(null);
    const [hoverBarDay, setHoverBarDay] = useState<number | null>(null);

    useEffect(() => {
        const n = new Date();
        setToday(`${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`);
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const [a, b, c, d, e] = await Promise.all([
                    fetch('/api/phrases'), fetch('/api/phrases/mastery'),
                    fetch('/api/voice-recordings'), fetch('/api/phrases/links'),
                    fetch('/api/player-stats'),
                ]);
                const [ad, bd, cd, dd, ed] = await Promise.all([a.json(), b.json(), c.json(), d.json(), e.json()]);
                if (ad.success) setPhrases(ad.phrases);
                if (bd.success) setMast(bd.mastery || {});
                if (cd.success) setRecs(cd.recordings || {});
                if (dd.success) {
                    const m: Record<string, PhraseLink[]> = {};
                    for (const l of (dd.links || [])) { if (!m[l.phrase_id]) m[l.phrase_id] = []; m[l.phrase_id].push(l); }
                    setLnks(m);
                }
                if (ed.success) setPs({ total_xp: ed.total_xp ?? 0, sparks: ed.sparks ?? 0, legendary_count: ed.legendary_count ?? 0, pity_counter: ed.pity_counter ?? 0, total_touches: ed.total_touches ?? 0 });
            } finally { setLoading(false); }
        })();
    }, []);

    useEffect(() => {
        const ym = `${cm.getFullYear()}-${String(cm.getMonth() + 1).padStart(2, '0')}`;
        fetch(`/api/review-count?month=${ym}`).then(r => r.json()).then(d => { if (d.success) setRc(d.counts || {}); }).catch(() => {});
        fetch(`/api/date-touches?month=${ym}`).then(r => r.json()).then(d => { if (d.success) setDt(d.touches || {}); }).catch(() => {});
    }, [cm]);

    const lvMap = useMemo(() => {
        const m: Record<string, ChakraLevel> = {};
        for (const p of phrases) m[p.id] = getLv(mast[p.id] ?? 0, !!(recs[p.id]?.length), !!(lnks[p.id]?.length));
        return m;
    }, [phrases, mast, recs, lnks]);

    const byDate = useMemo(() => {
        const m: Record<string, Phrase[]> = {};
        for (const p of phrases) { const k = p.date.split('T')[0]; if (!m[k]) m[k] = []; m[k].push(p); }
        return m;
    }, [phrases]);

    const yr = cm.getFullYear(), mo = cm.getMonth();
    const dim = new Date(yr, mo + 1, 0).getDate();
    const fdow = new Date(yr, mo, 1).getDay();
    const fmtD = useCallback((d: number) => `${yr}-${String(mo + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`, [yr, mo]);

    const playerLevel = useMemo(() => ps ? getPlayerLevel(ps.total_xp) : 1, [ps]);
    const levelInfo = useMemo(() => getLevelTitle(playerLevel), [playerLevel]);
    const xpCurrent = ps?.total_xp ?? 0;
    const xpThisLevel = xpForLevel(playerLevel);
    const xpNextLevel = xpForLevel(playerLevel + 1);
    const levelProgress = xpNextLevel > xpThisLevel ? (xpCurrent - xpThisLevel) / (xpNextLevel - xpThisLevel) : 1;

    const dayData = useMemo(() => {
        return Array.from({ length: dim }, (_, i) => {
            const dk = fmtD(i + 1);
            const dp = byDate[dk] || [];
            let pts = 0;
            for (const p of dp) pts += CHAKRA[lvMap[p.id] ?? 0].lv;
            const reps = rc[dk]?.count || 0;
            const xp = rc[dk]?.xp || 0;
            return { dk, dn: i + 1, count: dp.length, reps, xp, pts };
        });
    }, [dim, byDate, lvMap, rc, fmtD]);

    const g = useMemo(() => {
        const total = phrases.length;
        let pts = 0;
        const dist = [0, 0, 0, 0, 0, 0, 0];
        for (const p of phrases) { const lv = lvMap[p.id] ?? 0; pts += CHAKRA[lv].lv; dist[lv]++; }
        const avg = total > 0 ? pts / total : 0;
        return { total, pts, dist, avg };
    }, [phrases, lvMap]);

    const ms = useMemo(() => {
        let reps = 0, xp = 0, pts = 0, maxR = 0, maxD = '', activeDays = 0;
        for (const d of dayData) {
            reps += d.reps; xp += d.xp; pts += d.pts;
            if (d.reps > 0) activeDays++;
            if (d.reps > maxR) { maxR = d.reps; maxD = d.dk; }
        }
        return { reps, xp, pts, maxR, maxD, activeDays, avgRDay: activeDays > 0 ? reps / activeDays : 0 };
    }, [dayData]);

    // ===== CHART DIMENSIONS (responsive via viewBox) =====
    const BCW = 600, BCH = 240, BPL = 40, BPR = 12, BPT = 20, BPB = 32;
    const bW = BCW - BPL - BPR, bH = BCH - BPT - BPB;
    const maxReps = useMemo(() => Math.max(...dayData.map(d => d.reps), 1), [dayData]);
    const repsMax = niceMax(maxReps);
    const repsTicks = Array.from({ length: 5 }, (_, i) => Math.round((repsMax / 4) * i));

    const LCW = 600, LCH = 260, LPL = 44, LPR = 44, LPT = 28, LPB = 36;
    const lW = LCW - LPL - LPR, lH = LCH - LPT - LPB;
    const maxPts = useMemo(() => Math.max(...dayData.map(d => d.pts), 1), [dayData]);
    const maxXp = useMemo(() => Math.max(...dayData.map(d => d.xp), 1), [dayData]);
    const ptsMax = niceMax(maxPts);
    const xpMax = niceMax(maxXp);
    const ptsTicks = Array.from({ length: 5 }, (_, i) => Math.round((ptsMax / 4) * i));
    const xpTicks = Array.from({ length: 5 }, (_, i) => Math.round((xpMax / 4) * i));

    const powerPts = useMemo<[number, number][]>(() =>
        dayData.map((d, i) => [LPL + (i / Math.max(dim - 1, 1)) * lW, LPT + lH - (d.pts / ptsMax) * lH]),
    [dayData, dim, lW, lH, ptsMax]);
    const xpPts = useMemo<[number, number][]>(() =>
        dayData.map((d, i) => [LPL + (i / Math.max(dim - 1, 1)) * lW, LPT + lH - (d.xp / xpMax) * lH]),
    [dayData, dim, lW, lH, xpMax]);

    // ===== HEATMAP =====
    const calDays: (number | null)[] = [];
    for (let i = 0; i < fdow; i++) calDays.push(null);
    for (let d = 1; d <= dim; d++) calDays.push(d);
    const rows = Math.ceil(calDays.length / 7);
    const calMaxReps = Math.max(...dayData.map(x => x.reps), 1);

    // ===== WEEKS =====
    const weeks = useMemo(() => {
        const ws: { label: string; days: number; reps: number; xp: number; pts: number; avgLv: number }[] = [];
        let s = 0;
        while (s < dayData.length) {
            const e = Math.min(s + 7, dayData.length);
            const sl = dayData.slice(s, e);
            let r = 0, x = 0, pt = 0, pCount = 0;
            for (const d of sl) { r += d.reps; x += d.xp; pt += d.pts; pCount += d.count; }
            ws.push({ label: `${s + 1}-${e}`, days: e - s, reps: r, xp: x, pts: pt, avgLv: pCount > 0 ? pt / pCount : 0 });
            s = e;
        }
        return ws;
    }, [dayData]);

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: T.bg }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', border: `3px solid ${T.border}`, borderTopColor: T.gold, borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                <span style={{ color: T.textMuted, fontSize: '13px', fontWeight: 600 }}>Loading...</span>
                <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            </div>
        </div>
    );

    const barGap = 2;
    const barW = Math.max((bW / dim) - barGap, 3);

    // HP bar color based on percentage
    const hpColor = (pct: number) => pct > 0.5 ? '#22C55E' : pct > 0.2 ? '#EAB308' : '#EF4444';

    return (
        <div className="pokemon-dash" style={{ minHeight: '100vh', backgroundColor: T.bg, fontFamily: "'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif" }}>

            {/* ===== TRAINER CARD HEADER ===== */}
            <div style={{
                background: `linear-gradient(135deg, ${T.navy} 0%, ${T.navyLight} 100%)`,
                padding: '0',
                position: 'sticky', top: 0, zIndex: 10,
            }}>
                {/* Top bar */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 16px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '28px', height: '28px', borderRadius: '50%',
                            background: `linear-gradient(135deg, ${T.gold}, #B8960C)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '12px', fontWeight: 900, color: '#FFF',
                            boxShadow: '0 0 8px rgba(212,175,55,0.4)',
                        }}>T</div>
                        <span style={{ fontSize: '15px', fontWeight: 800, color: '#FFF', letterSpacing: '0.5px' }}>
                            Tonio
                        </span>
                    </div>
                    <Link href="/english/training" style={{
                        textDecoration: 'none', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.7)',
                        padding: '5px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                    }}>
                        Training
                    </Link>
                </div>

                {/* Trainer info */}
                <div style={{ padding: '12px 16px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '22px', fontWeight: 900, color: '#FFF', letterSpacing: '-0.5px' }}>
                                Lv. {playerLevel}
                            </span>
                            <span style={{
                                fontSize: '11px', fontWeight: 800, color: levelInfo.color,
                                padding: '2px 8px', borderRadius: '6px',
                                backgroundColor: `${levelInfo.color}22`,
                                border: `1px solid ${levelInfo.color}44`,
                                letterSpacing: '0.5px',
                            }}>{levelInfo.title}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
                            {xpCurrent.toLocaleString()} / {xpNextLevel.toLocaleString()} XP
                        </div>
                    </div>
                    {/* HP-style XP bar */}
                    <div style={{
                        height: '8px', borderRadius: '4px',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                        <div style={{
                            height: '100%', borderRadius: '3px',
                            width: `${Math.min(levelProgress * 100, 100)}%`,
                            background: `linear-gradient(90deg, ${hpColor(levelProgress)}, ${hpColor(Math.min(levelProgress + 0.1, 1))})`,
                            transition: `width 600ms ${T.ease}`,
                            boxShadow: `0 0 6px ${hpColor(levelProgress)}66`,
                        }} />
                    </div>
                </div>
            </div>

            {/* ===== MONTH NAV ===== */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                padding: '12px 16px', backgroundColor: T.surfaceAlt,
                borderBottom: `1px solid ${T.panelBorder}`,
            }}>
                <button onClick={() => setCm(new Date(yr, mo - 1, 1))} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '18px', color: T.textSub, padding: '4px 12px', lineHeight: 1,
                }}>{'<'}</button>
                <span style={{ fontSize: '15px', fontWeight: 800, color: T.text, minWidth: '100px', textAlign: 'center' }}>
                    {yr}年 {mo + 1}月
                </span>
                <button onClick={() => setCm(new Date(yr, mo + 1, 1))} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '18px', color: T.textSub, padding: '4px 12px', lineHeight: 1,
                }}>{'>'}</button>
            </div>

            <div style={{ maxWidth: '960px', margin: '0 auto', padding: '12px 12px 60px' }}>

                {/* ===== 1. STATUS KPI GRID ===== */}
                <div className="kpi-grid" style={{ display: 'grid', gap: '8px', marginBottom: '10px' }}>
                    <StatPanel label="総戦力" value={g.pts.toLocaleString()} sub={`${g.total}語 / 平均 Lv.${g.avg.toFixed(1)}`} color={T.gold} icon="S" />
                    <StatPanel label="SP (スパーク)" value={(ps?.sparks ?? 0).toLocaleString()} sub={`伝説 ${ps?.legendary_count ?? 0}回`} color={T.purple} icon="SP" />
                    <StatPanel label={`${mo + 1}月 経験値`} value={ms.xp.toLocaleString()} sub={`${ms.activeDays}日間 / 平均${ms.avgRDay.toFixed(1)}回`} color={T.orange} icon="XP" />
                    <StatPanel label={`${mo + 1}月 復習回数`} value={ms.reps.toLocaleString()} sub={`最高 ${ms.maxR}回 (${ms.maxD ? `${mo + 1}/${ms.maxD.slice(8)}` : '-'})`} color={T.green} icon="R" />
                </div>

                {/* ===== 2. EVOLUTION STAGES (Chakra) ===== */}
                <Panel title="進化段階" titleColor={T.gold}>
                    {/* Progress bar */}
                    <div style={{ height: '28px', borderRadius: '8px', overflow: 'hidden', display: 'flex', backgroundColor: T.borderLight, marginBottom: '10px', border: `1px solid ${T.border}` }}>
                        {([0, 1, 2, 3, 4, 5, 6] as ChakraLevel[]).map(lv => {
                            const pct = g.total > 0 ? (g.dist[lv] / g.total) * 100 : 0;
                            if (pct <= 0) return null;
                            return (
                                <div key={lv} style={{
                                    width: `${pct}%`, backgroundColor: CHAKRA[lv].color,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: `width 400ms ${T.ease}`, minWidth: pct > 3 ? '0' : '2px',
                                }}>
                                    {pct >= 7 && <span style={{ fontSize: '10px', fontWeight: 800, color: '#FFF' }}>{CHAKRA[lv].ja}</span>}
                                </div>
                            );
                        })}
                    </div>
                    {/* Badge row */}
                    <div className="chakra-badges" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {([0, 1, 2, 3, 4, 5, 6] as ChakraLevel[]).map(lv => (
                            <div key={lv} style={{
                                display: 'flex', alignItems: 'center', gap: '5px',
                                padding: '4px 10px', borderRadius: '20px',
                                backgroundColor: CHAKRA[lv].bg, border: `1.5px solid ${CHAKRA[lv].color}33`,
                            }}>
                                <span style={{ fontSize: '13px', fontWeight: 900, color: CHAKRA[lv].color }}>{CHAKRA[lv].ja}</span>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: CHAKRA[lv].color }}>
                                    {g.dist[lv]}
                                </span>
                                <span style={{ fontSize: '10px', color: T.textMuted }}>
                                    {g.total > 0 ? `${((g.dist[lv] / g.total) * 100).toFixed(0)}%` : '0%'}
                                </span>
                            </div>
                        ))}
                    </div>
                </Panel>

                {/* ===== 3. REPS BAR CHART ===== */}
                <Panel title="日別復習回数" titleColor={T.green}>
                    <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                        <svg viewBox={`0 0 ${BCW} ${BCH}`} style={{ display: 'block', width: '100%', height: 'auto', minWidth: '320px' }}>
                            {repsTicks.map((v, i) => {
                                const y = BPT + bH - (v / repsMax) * bH;
                                return <g key={`rg${i}`}>
                                    <line x1={BPL} y1={y} x2={BCW - BPR} y2={y} stroke={T.borderLight} strokeWidth={0.5} />
                                    <text x={BPL - 6} y={y + 3} textAnchor="end" fontSize={9} fill={T.textMuted} fontWeight={500}>{v}</text>
                                </g>;
                            })}
                            <line x1={BPL} y1={BPT + bH} x2={BCW - BPR} y2={BPT + bH} stroke={T.border} strokeWidth={1} />
                            {dayData.map((d, i) => {
                                const x = BPL + i * (barW + barGap) + barGap / 2;
                                const h = d.reps > 0 ? Math.max((d.reps / repsMax) * bH, 2) : 0;
                                const y = BPT + bH - h;
                                const isT = d.dk === today;
                                const isH = d.dn === hoverBarDay;
                                const showLabel = dim <= 15 || d.dn % 3 === 1 || d.dn === dim || isT;
                                return <g key={d.dk} onMouseEnter={() => setHoverBarDay(d.dn)} onMouseLeave={() => setHoverBarDay(null)}>
                                    {isH && <rect x={x - 1} y={BPT} width={barW + 2} height={bH} fill="rgba(16,185,129,0.06)" rx={3} />}
                                    {d.reps > 0 && (
                                        <rect x={x} y={y} width={barW} height={h} rx={Math.min(2, barW / 4)}
                                            fill={isT ? T.gold : T.green} opacity={isH ? 1 : 0.8}
                                            style={{ transition: `all 150ms ${T.ease}` }} />
                                    )}
                                    {isH && d.reps > 0 && (
                                        <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize={9} fill={T.text} fontWeight={700}>{d.reps}</text>
                                    )}
                                    {showLabel && (
                                        <text x={x + barW / 2} y={BPT + bH + 14} textAnchor="middle" fontSize={8}
                                            fill={isT ? T.gold : T.textMuted} fontWeight={isT ? 700 : 400}>{d.dn}</text>
                                    )}
                                </g>;
                            })}
                        </svg>
                    </div>
                    <div className="footer-stats" style={{ display: 'grid', gap: '8px', borderTop: `1px solid ${T.borderLight}`, paddingTop: '12px', marginTop: '6px' }}>
                        <FooterStat label="合計回数" value={ms.reps.toLocaleString()} color={T.green} />
                        <FooterStat label="日平均" value={ms.avgRDay.toFixed(1)} color={T.green} />
                        <FooterStat label="最高記録" value={`${ms.maxR}`} color={T.red} sub={ms.maxD ? `${mo + 1}/${ms.maxD.slice(8)}` : '-'} />
                        <FooterStat label="稼働日数" value={`${ms.activeDays}`} color={T.text} sub={`/ ${dim}日`} />
                    </div>
                </Panel>

                {/* ===== 4. POWER & XP LINE CHART ===== */}
                <Panel title="戦力 & 経験値" titleColor={T.gold}>
                    <div style={{ fontSize: '11px', color: T.textMuted, marginBottom: '10px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <span><span style={{ display: 'inline-block', width: '10px', height: '3px', backgroundColor: T.gold, borderRadius: '2px', marginRight: '4px', verticalAlign: 'middle' }} />戦力</span>
                        <span><span style={{ display: 'inline-block', width: '10px', height: '3px', backgroundColor: T.orange, borderRadius: '2px', marginRight: '4px', verticalAlign: 'middle' }} />経験値</span>
                    </div>
                    <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                        <svg viewBox={`0 0 ${LCW} ${LCH}`} style={{ display: 'block', width: '100%', height: 'auto', minWidth: '320px' }}>
                            <defs>
                                <linearGradient id="areaPower" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={T.gold} stopOpacity={0.2} />
                                    <stop offset="100%" stopColor={T.gold} stopOpacity={0.01} />
                                </linearGradient>
                                <linearGradient id="areaXp" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={T.orange} stopOpacity={0.2} />
                                    <stop offset="100%" stopColor={T.orange} stopOpacity={0.01} />
                                </linearGradient>
                                <clipPath id="lineChartClip"><rect x={LPL} y={LPT} width={lW} height={lH} /></clipPath>
                            </defs>
                            {ptsTicks.map((v, i) => {
                                const y = LPT + lH - (v / ptsMax) * lH;
                                return <g key={`pg${i}`}>
                                    <line x1={LPL} y1={y} x2={LCW - LPR} y2={y} stroke={T.borderLight} strokeWidth={0.5} />
                                    <text x={LPL - 6} y={y + 3} textAnchor="end" fontSize={8} fill={T.gold} fontWeight={600}>{v}</text>
                                </g>;
                            })}
                            {xpTicks.map((v, i) => {
                                const y = LPT + lH - (v / xpMax) * lH;
                                return <text key={`xg${i}`} x={LCW - LPR + 6} y={y + 3} textAnchor="start" fontSize={8} fill={T.orange} fontWeight={600}>{v}</text>;
                            })}
                            <line x1={LPL} y1={LPT + lH} x2={LCW - LPR} y2={LPT + lH} stroke={T.border} strokeWidth={1} />
                            <g clipPath="url(#lineChartClip)">
                                {powerPts.length > 1 && <path d={`${smoothPath(powerPts, 0.3, LPT, LPT + lH)}L${powerPts[powerPts.length - 1][0]},${LPT + lH}L${powerPts[0][0]},${LPT + lH}Z`} fill="url(#areaPower)" />}
                                {xpPts.length > 1 && <path d={`${smoothPath(xpPts, 0.3, LPT, LPT + lH)}L${xpPts[xpPts.length - 1][0]},${LPT + lH}L${xpPts[0][0]},${LPT + lH}Z`} fill="url(#areaXp)" />}
                                {powerPts.length > 1 && <path d={smoothPath(powerPts, 0.3, LPT, LPT + lH)} fill="none" stroke={T.gold} strokeWidth={2} strokeLinecap="round" />}
                                {xpPts.length > 1 && <path d={smoothPath(xpPts, 0.3, LPT, LPT + lH)} fill="none" stroke={T.orange} strokeWidth={2} strokeLinecap="round" />}
                            </g>
                            {dayData.map((d, i) => {
                                const x = LPL + (i / Math.max(dim - 1, 1)) * lW;
                                const isT = d.dk === today;
                                const isH = d.dn === hoverDay;
                                const showLabel = dim <= 15 || d.dn % 3 === 1 || d.dn === dim || isT;
                                return <g key={d.dk} onMouseEnter={() => setHoverDay(d.dn)} onMouseLeave={() => setHoverDay(null)}>
                                    {isH && <line x1={x} y1={LPT} x2={x} y2={LPT + lH} stroke={T.border} strokeWidth={1} strokeDasharray="3,3" />}
                                    {d.pts > 0 && <circle cx={powerPts[i][0]} cy={powerPts[i][1]} r={isH ? 4 : 2.5} fill={T.gold} stroke="#FFF" strokeWidth={1.5} />}
                                    {d.xp > 0 && <circle cx={xpPts[i][0]} cy={xpPts[i][1]} r={isH ? 4 : 2.5} fill={T.orange} stroke="#FFF" strokeWidth={1.5} />}
                                    {showLabel && <text x={x} y={LPT + lH + 14} textAnchor="middle" fontSize={8} fill={isT ? T.gold : T.textMuted} fontWeight={isT ? 700 : 400}>{d.dn}</text>}
                                    {isH && (d.pts > 0 || d.xp > 0) && (() => {
                                        const tw = 90, th = 44;
                                        let tx = x - tw / 2;
                                        if (tx < LPL) tx = LPL;
                                        if (tx + tw > LCW - LPR) tx = LCW - LPR - tw;
                                        return <g>
                                            <rect x={tx} y={LPT - th - 6} width={tw} height={th} rx={6} fill={T.navy} opacity={0.95} />
                                            <text x={tx + tw / 2} y={LPT - th - 6 + 14} textAnchor="middle" fontSize={9} fill="#999" fontWeight={500}>{mo + 1}/{d.dn}</text>
                                            <text x={tx + 8} y={LPT - th - 6 + 28} fontSize={9} fill={T.gold} fontWeight={700}>{d.pts} 戦力</text>
                                            <text x={tx + 8} y={LPT - th - 6 + 40} fontSize={9} fill={T.orange} fontWeight={700}>{d.xp} XP</text>
                                        </g>;
                                    })()}
                                </g>;
                            })}
                        </svg>
                    </div>
                    <div className="footer-stats" style={{ display: 'grid', gap: '8px', borderTop: `1px solid ${T.borderLight}`, paddingTop: '12px', marginTop: '6px' }}>
                        <FooterStat label="総戦力" value={ms.pts.toLocaleString()} color={T.gold} />
                        <FooterStat label="総経験値" value={ms.xp.toLocaleString()} color={T.orange} />
                        <FooterStat label="平均レベル" value={`Lv.${g.avg.toFixed(2)}`} color={T.purple} />
                        <FooterStat label="総語数" value={g.total.toLocaleString()} color={T.text} />
                    </div>
                </Panel>

                {/* ===== 5. SP & GACHA ===== */}
                <Panel title="SP & ガチャ" titleColor={T.purple}>
                    <div className="gacha-grid" style={{ display: 'grid', gap: '16px' }}>
                        {/* SP display */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
                                <span style={{ fontSize: '36px', fontWeight: 900, color: T.purple, letterSpacing: '-1px', lineHeight: 1 }}>{(ps?.sparks ?? 0).toLocaleString()}</span>
                                <span style={{ fontSize: '14px', fontWeight: 700, color: T.purple, opacity: 0.7 }}>SP</span>
                            </div>
                            <div className="mini-stats" style={{ display: 'grid', gap: '8px' }}>
                                <MiniStat label="伝説回数" value={ps?.legendary_count ?? 0} color="#D4AF37" />
                                <MiniStat label="総復習回数" value={ps?.total_touches ?? 0} color={T.green} />
                                <MiniStat label="SP / 回" value={ps && ps.total_touches > 0 ? (ps.sparks / ps.total_touches).toFixed(1) : '0'} color={T.purple} />
                            </div>
                        </div>
                        {/* Pity counter */}
                        <div>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: T.textMuted, marginBottom: '8px', letterSpacing: '0.5px' }}>天井カウンター</div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '26px', fontWeight: 800, color: T.text, letterSpacing: '-0.5px' }}>{ps?.pity_counter ?? 0}</span>
                                <span style={{ fontSize: '13px', fontWeight: 500, color: T.textMuted }}>/ 200</span>
                            </div>
                            {/* HP-style pity bar */}
                            <div style={{
                                height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '6px',
                                backgroundColor: T.borderLight, border: `1px solid ${T.border}`,
                            }}>
                                <div style={{
                                    height: '100%', borderRadius: '4px',
                                    width: `${Math.min(((ps?.pity_counter ?? 0) / 200) * 100, 100)}%`,
                                    background: (ps?.pity_counter ?? 0) >= 180 ? `linear-gradient(90deg, ${T.orange}, ${T.red})` : (ps?.pity_counter ?? 0) >= 100 ? `linear-gradient(90deg, ${T.gold}, ${T.orange})` : `linear-gradient(90deg, ${T.purple}, #A78BFA)`,
                                    transition: `width 500ms ${T.ease}`,
                                }} />
                            </div>
                            <div style={{ fontSize: '11px', color: T.textMuted, marginBottom: '10px' }}>
                                {(ps?.pity_counter ?? 0) >= 180 ? 'MEGA+ 確定まであと少し' : (ps?.pity_counter ?? 0) >= 100 ? '天井まで半分突破' : '天井保証までの外れ回数'}
                            </div>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {[
                                    { tier: 'LEGENDARY', rate: '0.5%', color: T.gold, sp: 777 },
                                    { tier: 'MEGA', rate: '1.5%', color: T.purple, sp: 77 },
                                    { tier: 'SUPER', rate: '3%', color: T.red, sp: 30 },
                                    { tier: 'GREAT', rate: '5%', color: T.orange, sp: 15 },
                                    { tier: 'BONUS', rate: '12%', color: T.green, sp: 5 },
                                ].map(tier => (
                                    <div key={tier.tier} style={{
                                        display: 'flex', alignItems: 'center', gap: '3px',
                                        padding: '3px 8px', borderRadius: '12px',
                                        backgroundColor: `${tier.color}10`, border: `1.5px solid ${tier.color}22`,
                                    }}>
                                        <span style={{ fontSize: '9px', fontWeight: 800, color: tier.color }}>{tier.tier}</span>
                                        <span style={{ fontSize: '8px', color: T.textMuted }}>{tier.sp}SP</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Panel>

                {/* ===== 6. ACTIVITY HEATMAP ===== */}
                <Panel title="アクティビティ" titleColor={T.green}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                        <HeatScale color={T.green} label="回" max={calMaxReps} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '3px', marginBottom: '3px' }}>
                        {['日', '月', '火', '水', '木', '金', '土'].map((d, i) => (
                            <div key={d} style={{
                                textAlign: 'center', fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px',
                                color: i === 0 ? '#DC2626' : i === 6 ? T.blue : T.textMuted, padding: '4px 0',
                            }}>{d}</div>
                        ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: `repeat(${rows}, 1fr)`, gap: '3px' }}>
                        {calDays.map((day, idx) => {
                            if (day === null) return <div key={`e${idx}`} style={{ aspectRatio: '1', borderRadius: '8px', backgroundColor: T.borderLight }} />;
                            const dd = dayData[day - 1];
                            const isT = dd.dk === today;
                            const isFuture = dd.dk > today;
                            const dow = (fdow + day - 1) % 7;
                            const ratio = calMaxReps > 0 ? dd.reps / calMaxReps : 0;
                            const greenAlpha = ratio <= 0 ? 0 : Math.min(0.08 + ratio * 0.5, 0.6);
                            return (
                                <div key={day} style={{
                                    aspectRatio: '1', borderRadius: '8px', padding: '3px',
                                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                                    position: 'relative', overflow: 'hidden',
                                    backgroundColor: isFuture ? T.surfaceAlt : dd.reps > 0 ? `rgba(16,185,129,${greenAlpha})` : T.surfaceAlt,
                                    border: isT ? `2px solid ${T.gold}` : `1px solid ${dd.reps > 0 ? 'rgba(16,185,129,0.2)' : T.borderLight}`,
                                    boxShadow: isT ? `0 0 0 2px ${T.gold}22` : 'none',
                                    transition: `all 250ms ${T.ease}`,
                                    opacity: isFuture ? 0.4 : 1,
                                }}>
                                    <span style={{
                                        fontSize: '10px', fontWeight: 700, lineHeight: 1,
                                        color: dow === 0 ? '#DC2626' : dow === 6 ? T.blue : isT ? T.gold : ratio > 0.5 ? '#FFF' : T.text,
                                    }}>{day}</span>
                                    {dd.reps > 0 && !isFuture && (
                                        <span style={{
                                            fontSize: ratio > 0.7 ? '13px' : ratio > 0.3 ? '11px' : '10px',
                                            fontWeight: 700, color: ratio > 0.5 ? '#FFF' : '#059669',
                                            textAlign: 'center', lineHeight: 1,
                                        }}>{dd.reps}</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Panel>

                {/* ===== 7. WEEKLY BREAKDOWN TABLE ===== */}
                <Panel title="週間レポート" titleColor={T.blue}>
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '400px' }}>
                            <thead>
                                <tr>
                                    {['期間', '日数', '回数', 'XP', '戦力', '平均Lv'].map((h, i) => (
                                        <th key={h} style={{
                                            padding: '8px 6px', textAlign: i === 0 ? 'left' : 'right',
                                            fontWeight: 800, color: T.textMuted, fontSize: '10px', letterSpacing: '0.3px',
                                            borderBottom: `2px solid ${T.border}`,
                                        }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {weeks.map((w, i) => (
                                    <tr key={i} style={{ borderBottom: `1px solid ${T.borderLight}` }}>
                                        <td style={{ padding: '8px 6px', color: T.text, fontWeight: 600, fontSize: '12px' }}>{mo + 1}/{w.label}</td>
                                        <td style={{ padding: '8px 6px', textAlign: 'right', color: T.textSub, fontWeight: 500, fontSize: '12px' }}>{w.days}日</td>
                                        <td style={{ padding: '8px 6px', textAlign: 'right', color: T.green, fontWeight: 700, fontSize: '12px' }}>{w.reps}</td>
                                        <td style={{ padding: '8px 6px', textAlign: 'right', color: T.orange, fontWeight: 700, fontSize: '12px' }}>{w.xp}</td>
                                        <td style={{ padding: '8px 6px', textAlign: 'right', color: T.gold, fontWeight: 700, fontSize: '12px' }}>{w.pts}</td>
                                        <td style={{ padding: '8px 6px', textAlign: 'right', color: T.purple, fontWeight: 500, fontSize: '12px' }}>{w.avgLv.toFixed(2)}</td>
                                    </tr>
                                ))}
                                <tr style={{ borderTop: `2px solid ${T.border}` }}>
                                    <td style={{ padding: '8px 6px', color: T.text, fontWeight: 800, fontSize: '12px' }}>合計</td>
                                    <td style={{ padding: '8px 6px', textAlign: 'right', color: T.text, fontWeight: 700, fontSize: '12px' }}>{ms.activeDays}日</td>
                                    <td style={{ padding: '8px 6px', textAlign: 'right', color: T.green, fontWeight: 800, fontSize: '12px' }}>{ms.reps}</td>
                                    <td style={{ padding: '8px 6px', textAlign: 'right', color: T.orange, fontWeight: 800, fontSize: '12px' }}>{ms.xp}</td>
                                    <td style={{ padding: '8px 6px', textAlign: 'right', color: T.gold, fontWeight: 800, fontSize: '12px' }}>{ms.pts}</td>
                                    <td style={{ padding: '8px 6px', textAlign: 'right', color: T.purple, fontWeight: 700, fontSize: '12px' }}>{g.avg.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Panel>
            </div>

            {/* ===== RESPONSIVE STYLES ===== */}
            <style>{`
                @keyframes spin { to { transform: rotate(360deg) } }

                .pokemon-dash .kpi-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                .pokemon-dash .footer-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
                .pokemon-dash .gacha-grid {
                    grid-template-columns: 1fr;
                }
                .pokemon-dash .mini-stats {
                    grid-template-columns: repeat(3, 1fr);
                }

                @media (min-width: 640px) {
                    .pokemon-dash .kpi-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .pokemon-dash .gacha-grid {
                        grid-template-columns: 1fr 1fr;
                    }
                }

                @media (min-width: 960px) {
                    .pokemon-dash .kpi-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                    .pokemon-dash .footer-stats {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }
            `}</style>
        </div>
    );
}

// ===== Sub-components =====

function Panel({ title, titleColor, children }: { title: string; titleColor: string; children: React.ReactNode }) {
    return (
        <div style={{
            backgroundColor: T.surface, borderRadius: T.radius,
            boxShadow: T.shadow, border: `1px solid ${T.panelBorder}`,
            marginBottom: '10px', overflow: 'hidden',
        }}>
            {/* Pokemon-style panel header */}
            <div style={{
                padding: '10px 16px',
                background: `linear-gradient(135deg, ${titleColor}12, ${titleColor}06)`,
                borderBottom: `1px solid ${titleColor}20`,
                display: 'flex', alignItems: 'center', gap: '8px',
            }}>
                <div style={{
                    width: '4px', height: '16px', borderRadius: '2px',
                    backgroundColor: titleColor,
                }} />
                <span style={{ fontSize: '13px', fontWeight: 800, color: T.text, letterSpacing: '0.3px' }}>{title}</span>
            </div>
            <div style={{ padding: '14px 16px' }}>
                {children}
            </div>
        </div>
    );
}

function StatPanel({ label, value, sub, color, icon }: { label: string; value: string; sub: string; color: string; icon: string }) {
    return (
        <div style={{
            borderRadius: T.radius, padding: '14px 14px', position: 'relative', overflow: 'hidden',
            backgroundColor: T.surface, border: `1px solid ${T.panelBorder}`, boxShadow: T.shadow,
        }}>
            <div style={{
                position: 'absolute', top: '10px', right: '10px',
                width: '28px', height: '28px', borderRadius: '50%',
                background: `${color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', fontWeight: 900, color: color, letterSpacing: '-0.5px',
            }}>{icon}</div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: T.textMuted, marginBottom: '6px', letterSpacing: '0.3px' }}>{label}</div>
            <div style={{ fontSize: '24px', fontWeight: 900, color, lineHeight: 1.1, letterSpacing: '-0.5px' }}>{value}</div>
            <div style={{ fontSize: '10px', fontWeight: 500, color: T.textMuted, marginTop: '5px' }}>{sub}</div>
        </div>
    );
}

function FooterStat({ label, value, color, sub }: { label: string; value: string; color: string; sub?: string }) {
    return (
        <div>
            <div style={{ fontSize: '10px', fontWeight: 700, color: T.textMuted, marginBottom: '3px', letterSpacing: '0.3px' }}>{label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color, letterSpacing: '-0.3px' }}>{value}</span>
                {sub && <span style={{ fontSize: '10px', color: T.textMuted }}>{sub}</span>}
            </div>
        </div>
    );
}

function MiniStat({ label, value, color }: { label: string; value: number | string; color: string }) {
    return (
        <div style={{ padding: '8px 10px', borderRadius: T.radiusSm, backgroundColor: `${color}08`, border: `1px solid ${color}15` }}>
            <div style={{ fontSize: '9px', fontWeight: 700, color: T.textMuted, marginBottom: '3px', letterSpacing: '0.3px' }}>{label}</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color, letterSpacing: '-0.3px' }}>{typeof value === 'number' ? value.toLocaleString() : value}</div>
        </div>
    );
}

function HeatScale({ label, max }: { color?: string; label: string; max: number }) {
    const steps = [0, 0.15, 0.3, 0.45, 0.6];
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '9px', color: T.textMuted, fontWeight: 500 }}>0</span>
            <div style={{ display: 'flex', gap: '2px' }}>
                {steps.map((s, i) => (
                    <div key={i} style={{
                        width: '12px', height: '12px', borderRadius: '3px',
                        backgroundColor: s === 0 ? T.borderLight : `rgba(16,185,129,${0.08 + s * 0.7})`,
                        border: `1px solid ${T.borderLight}`,
                    }} />
                ))}
            </div>
            <span style={{ fontSize: '9px', color: T.textMuted, fontWeight: 500 }}>{max} {label}</span>
        </div>
    );
}
