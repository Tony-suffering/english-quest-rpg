'use client';

// 日めくりカレンダー(hub) — 「今夜も、通じない。」の各夜を日付カレンダーに格納。
// 同じ夜のDMMから生まれる全部(番組/精密採点)にここから飛ぶ。
// 既存 ReviewCalendar(goroku/nihongo/dmm と同じ型)を流用。
// エピソードは /api/tonight(編集反映)、スコアは tonio-league から。

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import ReviewCalendar from '@/components/english/ReviewCalendar';
import { SHOW_META, showEpisodes, type ShowEpisode, mergeEpisodes } from '@/data/english/dmm-show';
import { getNightScore, getCommentary } from '@/data/english/tonio-league';
import { kenshiLessons } from '@/data/english/kenshi-lessons';

const TSUKKOMI_DATES = new Set(kenshiLessons.filter((l) => l.mistakes.length > 0).map((l) => l.date));

const INK = '#17130F';
const MUTED = '#6E6558';
const GOLD = '#B8941E';
const GOLD_HI = '#C79A1E';
const RED = '#C0392B';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";
const RATING_COLOR: Record<string, string> = { S: '#B8901E', A: '#2E9E6B', B: '#3E7AB8', C: '#B8901E', D: '#8A8171' };

function parseYMD(date: string) { const [y, m, d] = date.split('-').map(Number); return { y, m: (m || 1) - 1, d: d || 1 }; }

export default function TonightCalendarPage() {
    const [episodes, setEpisodes] = useState<ShowEpisode[]>(showEpisodes);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check(); window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    useEffect(() => {
        let alive = true;
        fetch('/api/tonight', { cache: 'no-store' })
            .then((r) => r.json())
            .then((j) => { if (alive && j?.episodes?.length) setEpisodes(mergeEpisodes(j.episodes)); })
            .catch(() => { /* seed で成立 */ });
        return () => { alive = false; };
    }, []);

    const latest = [...episodes].sort((a, b) => a.date.localeCompare(b.date))[episodes.length - 1];
    const init = latest ? parseYMD(latest.date) : (() => { const n = new Date(); return { y: n.getFullYear(), m: n.getMonth(), d: n.getDate() }; })();
    const [viewYear, setViewYear] = useState(init.y);
    const [viewMonth, setViewMonth] = useState(init.m);
    const [selectedDay, setSelectedDay] = useState<number | null>(latest ? init.d : null);

    const monthEps = useMemo(
        () => episodes.filter((e) => { const p = parseYMD(e.date); return p.y === viewYear && p.m === viewMonth; }),
        [episodes, viewYear, viewMonth],
    );
    const entries = useMemo(
        () => monthEps.map((e) => ({ id: String(e.night), day_slot: parseYMD(e.date).d, japanese: e.title, category: '夜' })),
        [monthEps],
    );
    const allNightIds = useMemo(() => new Set(monthEps.map((e) => String(e.night))), [monthEps]);

    const shiftMonth = (delta: number) => {
        setSelectedDay(null);
        const total = viewYear * 12 + viewMonth + delta;
        setViewYear(Math.floor(total / 12));
        setViewMonth(((total % 12) + 12) % 12);
    };
    const goToday = () => { const n = new Date(); setViewYear(n.getFullYear()); setViewMonth(n.getMonth()); setSelectedDay(n.getDate()); };

    const selectedEps = selectedDay ? monthEps.filter((e) => parseYMD(e.date).d === selectedDay).sort((a, b) => a.night - b.night) : [];

    // 連続夜(日付が連続した回数) & 平均醜態力
    const streak = useMemo(() => {
        const uniq = [...new Set(episodes.map((e) => e.date))].sort().reverse();
        if (!uniq.length) return 0;
        let s = 1;
        for (let i = 1; i < uniq.length; i++) {
            if ((new Date(uniq[i - 1]).getTime() - new Date(uniq[i]).getTime()) / 86400000 === 1) s++; else break;
        }
        return s;
    }, [episodes]);
    const avgScore = useMemo(() => {
        if (!episodes.length) return 0;
        const sum = episodes.reduce((a, e) => a + getNightScore(e.night).score, 0);
        return sum / episodes.length;
    }, [episodes]);

    const StatCard = ({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) => (
        <div style={{ flex: '1 1 120px', minWidth: 110, border: '1px solid #EEECE7', borderTop: `3px solid ${GOLD}`, borderRadius: 10, padding: '12px 14px', background: '#fff' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, color: '#A8A29E' }}>{label}</div>
            <div style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 900, color: INK, marginTop: 2, lineHeight: 1.1 }}>{value}</div>
            {sub && <div style={{ fontSize: 10.5, color: '#A8A29E', marginTop: 2 }}>{sub}</div>}
        </div>
    );

    const LinkBtn = ({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) => (
        <Link href={href} style={{
            display: 'inline-flex', alignItems: 'center', padding: '9px 16px', borderRadius: 9, textDecoration: 'none',
            fontSize: 13, fontWeight: 700,
            background: primary ? INK : '#fff', color: primary ? GOLD_HI : INK, border: `1px solid ${primary ? INK : '#E5DECF'}`,
        }}>{children}</Link>
    );

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9' }}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: isMobile ? 'auto' : '100vh' }}>
                {/* 左: カレンダー */}
                <div style={{ flex: isMobile ? 'none' : '0 0 clamp(340px, 46%, 560px)', borderRight: isMobile ? 'none' : '1px solid #EEECE7', display: 'flex', flexDirection: 'column', minHeight: isMobile ? '62vh' : undefined }}>
                    <ReviewCalendar
                        title={SHOW_META.title}
                        subtitle={`全${episodes.length}夜 · 日めくりカレンダー`}
                        accent={GOLD}
                        accentBg="#FEF9E7"
                        entries={entries}
                        categoryColors={{ '夜': { fg: GOLD, bg: '#FEF9E7' } }}
                        selectedDay={selectedDay}
                        onSelectDay={(day) => setSelectedDay(day)}
                        viewYear={viewYear}
                        viewMonth={viewMonth}
                        onPrevMonth={() => shiftMonth(-1)}
                        onNextMonth={() => shiftMonth(1)}
                        onGoToday={goToday}
                        storagePrefix="tonight-cal"
                        playedIds={allNightIds}
                        masteredIds={allNightIds}
                        isMobile={isMobile}
                        headerRight={<Link href="/english/tonight" style={{ fontSize: 12, color: GOLD_HI, fontWeight: 700, textDecoration: 'none' }}>番組本編 →</Link>}
                    />
                </div>

                {/* 右: 選択夜の全て */}
                <div style={{ flex: 1, overflow: 'auto', padding: isMobile ? '16px 14px 60px' : '28px 32px', minWidth: 0 }}>
                    {/* 統計 */}
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
                        <StatCard label="通算" value={`${episodes.length}夜`} sub="開幕からの全記録" />
                        <StatCard label="連続" value={`${streak}夜`} sub="毎晩の積み上げ" />
                        <StatCard label="平均 醜態力" value={avgScore.toFixed(1)} sub="恥=経験値" />
                    </div>

                    {!selectedDay || selectedEps.length === 0 ? (
                        <div style={{ padding: 24, background: '#fff', border: '1px dashed #E7E5E4', borderRadius: 12, color: '#A8A29E', fontSize: 13 }}>
                            左のカレンダーで日付をタップすると、その夜の全部(番組・精密採点)に飛べます。
                        </div>
                    ) : (
                        selectedEps.map((ep) => {
                            const sc = getNightScore(ep.night);
                            const cm = getCommentary(ep.night);
                            return (
                                <div key={ep.night} style={{ marginBottom: 20 }}>
                                    {/* 夜のヘッダー(ダークアクセント) */}
                                    <div style={{ background: INK, color: '#fff', borderRadius: '12px 12px 0 0', padding: '20px 22px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
                                            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 3, color: GOLD_HI }}>第{ep.night}夜 · {ep.date}</span>
                                            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4 }}>
                                                <span style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 30, color: GOLD_HI }}>{sc.score.toFixed(1)}</span>
                                                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>点</span>
                                                <span style={{ marginLeft: 8, fontFamily: SERIF, fontWeight: 900, fontSize: 22, color: RATING_COLOR[sc.rating] }}>{sc.rating}</span>
                                            </span>
                                        </div>
                                        <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 900, marginTop: 8, lineHeight: 1.3 }}>{ep.title}</div>
                                        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 6, lineHeight: 1.7 }}>{cm?.headline ?? ep.catchcopy}</div>
                                    </div>
                                    {/* 導線 */}
                                    <div style={{ background: '#fff', border: '1px solid #EEECE7', borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '16px 22px', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                        <LinkBtn href={`/english/tonight/screens?night=${ep.night}`} primary>縦スクショで読む</LinkBtn>
                                        <LinkBtn href={`/english/tonight/league?night=${ep.night}`}>精密採点を見る</LinkBtn>
                                        {TSUKKOMI_DATES.has(ep.date) && <LinkBtn href={`/english/tsukkomi-cards?date=${ep.date}`}>ツッコミ</LinkBtn>}
                                        <LinkBtn href="/english/tonight/cards">note用カード</LinkBtn>
                                    </div>
                                </div>
                            );
                        })
                    )}

                    {/* 全夜リスト(常に埋める) */}
                    <div style={{ marginTop: 8 }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: INK, marginBottom: 12, letterSpacing: 0.5 }}>全夜(新しい順)</div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                            {[...episodes].sort((a, b) => b.night - a.night).map((ep) => {
                                const sc = getNightScore(ep.night);
                                return (
                                    <li key={ep.night}>
                                        <button
                                            onClick={() => { const p = parseYMD(ep.date); setViewYear(p.y); setViewMonth(p.m); setSelectedDay(p.d); }}
                                            style={{ width: '100%', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: '#fff', border: '1px solid #EEECE7', borderRadius: 10, color: 'inherit' }}
                                        >
                                            <span style={{ fontSize: 11, fontWeight: 800, color: GOLD, whiteSpace: 'nowrap' }}>第{ep.night}夜</span>
                                            <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ep.title}</span>
                                            <span style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 13, color: RATING_COLOR[sc.rating], whiteSpace: 'nowrap' }}>{sc.rating}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
