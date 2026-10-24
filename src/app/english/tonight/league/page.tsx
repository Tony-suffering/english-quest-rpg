'use client';

// とにおリーグ — 精密採点(カラオケDAM風)。
// 毎晩のDMMを1試合として採点し、レーダーチャート/総合点/分析レポート/
// 成績推移/やらかし順位表で見せる。恥=経験値。読者はスコアブックを追う。
// データ/採点は tonio-league.ts、EXP/Lvは tonio-saga.ts 由来。
// ライト基調 + INKの採点パネル(アクセント)。みばえ重視。

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    LEAGUE_META, GRAMMAR_PLAYERS, STORY_ARCS,
    getLeagueNights, getLatestLeagueNight, getCommentary,
    getBoxScore, getRadar, getMarket, getNightMarket, getOdds, getForm,
    getCurrentArc, getNextTease,
    getStandings, getSeasonTotals, getArticleStreak, getTitles,
    type MarketPoint, type OddsLine,
} from '@/data/english/tonio-league';
import { getSagaStateAfter, RAID_BOSS } from '@/data/english/tonio-saga';

const PAPER = '#F4F0E6';
const CARD = '#FFFFFF';
const INK = '#17130F';
const MUTED = '#6E6558';
const RED = '#C0392B';
const GOLD = '#B8941E';
const GOLD_HI = '#E7C14B';
const GREEN = '#2E9E6B';
const LINE = '#E5DECF';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";
const SANS = "'Helvetica Neue', Arial, 'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";

const RATING_COLOR: Record<string, string> = { S: '#E7C14B', A: '#2E9E6B', B: '#3E7AB8', C: '#B8901E', D: '#8A8171' };

// ============ レーダーチャート(SVG 6軸) ============
function Radar({ axes, size = 260 }: { axes: { label: string; value: number }[]; size?: number }) {
    const cx = size / 2, cy = size / 2, r = size * 0.34;
    const n = axes.length;
    const pt = (i: number, radius: number) => {
        const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
        return [cx + radius * Math.cos(ang), cy + radius * Math.sin(ang)] as const;
    };
    const rings = [0.25, 0.5, 0.75, 1];
    const dataPts = axes.map((a, i) => pt(i, r * (a.value / 100)));
    const dataPath = dataPts.map((p) => p.join(',')).join(' ');
    return (
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ maxWidth: '100%' }}>
            <defs>
                <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={GOLD_HI} stopOpacity="0.55" />
                    <stop offset="100%" stopColor={GOLD} stopOpacity="0.30" />
                </radialGradient>
            </defs>
            {/* グリッド */}
            {rings.map((ring, ri) => (
                <polygon key={ri}
                    points={axes.map((_, i) => pt(i, r * ring).join(',')).join(' ')}
                    fill="none" stroke={ri === rings.length - 1 ? INK : LINE} strokeWidth={ri === rings.length - 1 ? 1.5 : 1} />
            ))}
            {/* 軸線 */}
            {axes.map((_, i) => {
                const [x, y] = pt(i, r);
                return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={LINE} strokeWidth={1} />;
            })}
            {/* データ多角形 */}
            <polygon points={dataPath} fill="url(#radarFill)" stroke={GOLD} strokeWidth={2.5} strokeLinejoin="round" />
            {dataPts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={3.2} fill={RED} />)}
            {/* ラベル */}
            {axes.map((a, i) => {
                const [x, y] = pt(i, r + 22);
                return (
                    <text key={i} x={x} y={y} fontSize="11" fontWeight="700" fill={INK}
                        textAnchor={Math.abs(x - cx) < 4 ? 'middle' : x > cx ? 'start' : 'end'}
                        dominantBaseline="middle" fontFamily={SANS}>
                        {a.label}
                    </text>
                );
            })}
        </svg>
    );
}

// ============ 項目別バー ============
function StatBar({ label, value, max, unit, color = GOLD }: { label: string; value: number; max: number; unit: string; color?: string }) {
    const pct = Math.min(100, (value / max) * 100);
    return (
        <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 700, color: INK }}>{label}</span>
                <span style={{ fontSize: '15px', fontWeight: 900, color, fontFamily: SERIF }}>{value}<span style={{ fontSize: '11px', color: MUTED, fontWeight: 400, marginLeft: '3px' }}>{unit}</span></span>
            </div>
            <div style={{ height: '9px', backgroundColor: '#EFEADD', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRadius: '999px' }} />
            </div>
        </div>
    );
}

// ============ 醜態相場(芸 vs 英語力) ============
function MarketChart({ data, current }: { data: MarketPoint[]; current: number }) {
    const W = 640, H = 210, padL = 6, padR = 6, padT = 16, padB = 24;
    const shows = data.map((d) => d.show);
    const smin = Math.min(...shows), smax = Math.max(...shows);
    const skills = data.map((d) => d.skill);
    const kmin = Math.min(...skills), kmax = Math.max(...skills);
    const x = (i: number) => padL + (i * (W - padL - padR)) / Math.max(1, data.length - 1);
    const yShow = (v: number) => padT + (1 - (v - smin) / Math.max(1, smax - smin)) * (H - padT - padB);
    const ySkill = (v: number) => padT + (1 - (v - kmin) / Math.max(1, kmax - kmin)) * (H - padT - padB);
    const showPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${yShow(d.show)}`).join(' ');
    const lastX = x(data.length - 1);
    const showArea = `${showPath} L${lastX},${H - padB} L${x(0)},${H - padB} Z`;
    const skillPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${ySkill(d.skill)}`).join(' ');
    const athIdx = shows.indexOf(smax);
    const curIdx = data.findIndex((d) => d.night === current);
    const tickEvery = Math.max(1, Math.round(data.length / 8));
    return (
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
            <defs>
                <linearGradient id="mktFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GOLD} stopOpacity="0.34" />
                    <stop offset="100%" stopColor={GOLD} stopOpacity="0.02" />
                </linearGradient>
            </defs>
            {/* 芸指数(相場)エリア */}
            <path d={showArea} fill="url(#mktFill)" />
            <path d={showPath} fill="none" stroke={GOLD} strokeWidth={2.6} strokeLinejoin="round" />
            {/* 英語力(地力) */}
            <path d={skillPath} fill="none" stroke={GREEN} strokeWidth={1.8} strokeDasharray="4 3" strokeLinejoin="round" opacity={0.85} />
            {/* 自己最高(ATH)マーカー */}
            <circle cx={x(athIdx)} cy={yShow(smax)} r={4} fill="none" stroke={INK} strokeWidth={1.5} />
            <text x={x(athIdx)} y={yShow(smax) - 8} fontSize="9" fontWeight="800" fill={INK} textAnchor="middle">最高 {smax.toLocaleString()}</text>
            {/* 現在夜 */}
            {curIdx >= 0 && (
                <g>
                    <line x1={x(curIdx)} y1={padT} x2={x(curIdx)} y2={H - padB} stroke={RED} strokeWidth={1} strokeDasharray="3 3" opacity={0.5} />
                    <circle cx={x(curIdx)} cy={yShow(data[curIdx].show)} r={5} fill={RED} />
                </g>
            )}
            {/* 夜ラベル */}
            {data.map((d, i) => (i % tickEvery === 0 || d.night === current) ? (
                <text key={d.night} x={x(i)} y={H - 8} fontSize="9" fill={d.night === current ? RED : MUTED} fontWeight={d.night === current ? 800 : 400} textAnchor="middle">{d.night}</text>
            ) : null)}
        </svg>
    );
}

// ============ オッズ1行(事前予想+結果) ============
function OddsRow({ o, open }: { o: OddsLine; open?: boolean }) {
    const hit = o.hit;
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 13px', borderRadius: '9px', border: `1px solid ${open ? '#E7DFC9' : hit ? '#CDE3D2' : LINE}`, backgroundColor: open ? '#FBF7EA' : hit ? '#F0F7F1' : '#FAF7F1' }}>
            <div style={{ minWidth: '58px', textAlign: 'center', fontFamily: SERIF, fontWeight: 900, fontSize: '20px', color: INK, backgroundColor: '#fff', border: `1px solid ${LINE}`, borderRadius: '7px', padding: '3px 0' }}>
                ×{o.odds.toFixed(1)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: INK }}>{o.label}</div>
                <div style={{ fontSize: '11px', color: MUTED, lineHeight: 1.5 }}>{o.note}</div>
            </div>
            {open ? (
                <span style={{ fontSize: '11px', fontWeight: 800, color: GOLD, letterSpacing: '1px', whiteSpace: 'nowrap' }}>受付中</span>
            ) : (
                <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '1px', whiteSpace: 'nowrap', padding: '4px 11px', borderRadius: '999px', color: '#fff', backgroundColor: hit ? GREEN : '#B7AE9E' }}>
                    {hit ? '的中' : '不的中'}
                </span>
            )}
        </div>
    );
}

const RANK_HUE: Record<string, string> = { S: '#E7C14B', A: '#2E9E6B', B: '#3E7AB8', C: '#B8901E', D: '#8A8171' };

// ============ 成長ストーリーの背骨(章バー) ============
function StoryArcBar({ night }: { night: number }) {
    return (
        <div style={{ display: 'flex', gap: '6px', marginTop: '16px' }}>
            {STORY_ARCS.map((a) => {
                const active = night >= a.nights[0] && night <= a.nights[1];
                const done = night > a.nights[1];
                return (
                    <div key={a.no} style={{ flex: a.nights[1] - a.nights[0] + 1, minWidth: 0 }}>
                        <div style={{ height: '6px', borderRadius: '999px', backgroundColor: active ? GOLD : done ? '#D9CFB4' : '#ECE6D6' }} />
                        <div style={{ fontSize: '10px', marginTop: '5px', fontWeight: active ? 800 : 500, color: active ? INK : MUTED, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {a.no}. {a.title}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: RED, textTransform: 'uppercase', marginBottom: '14px' }}>{children}</div>;
}
function Card({ children }: { children: React.ReactNode }) {
    return <div style={{ backgroundColor: CARD, border: `1px solid ${LINE}`, borderRadius: '12px', padding: 'clamp(18px, 4vw, 28px)', marginTop: '16px' }}>{children}</div>;
}

export default function TonightLeaguePage() {
    const nights = getLeagueNights();
    const [night, setNight] = useState<number>(getLatestLeagueNight().night);

    // URL の ?night=N を反映(ハブ/カレンダーから特定の回に着地するため)。マウント時のみ。
    useEffect(() => {
        const q = Number(new URLSearchParams(window.location.search).get('night'));
        if (getLeagueNights().some((n) => n.night === q)) setNight(q);
    }, []);

    const changeNight = (n: number) => {
        setNight(n);
        const u = new URL(window.location.href);
        u.searchParams.set('night', String(n));
        window.history.replaceState(null, '', u);
    };

    const c = getCommentary(night)!;
    const box = getBoxScore(night);
    const radar = getRadar(night);
    const mkt = getNightMarket(night);
    const market = getMarket();
    const odds = getOdds(night);
    const form = getForm(night);
    const standings = getStandings(night);
    const totals = getSeasonTotals(night);
    const streak = getArticleStreak(night);
    const titles = getTitles(night);
    const { arc } = getCurrentArc(night);
    const nextTease = getNextTease(night);
    const saga = getSagaStateAfter(night);
    const expInLevel = saga.totalExp;
    const expPct = Math.min(100, Math.round((saga.totalExp / saga.nextLevelExp) * 100));
    const up = mkt.delta >= 0;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: PAPER, padding: '0 0 90px', fontFamily: SANS, color: INK }}>
            {/* ツールバー */}
            <div style={{ backgroundColor: INK, color: '#fff', padding: '10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link href="/english/tonight" style={{ color: GOLD_HI, textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>← 番組へ</Link>
                    <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '2px' }}>{LEAGUE_META.title}</span>
                </div>
                <select value={night} onChange={(e) => changeNight(Number(e.target.value))}
                    style={{ fontSize: '13px', padding: '7px 10px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#2a2622', color: '#fff', maxWidth: '60vw' }}>
                    {nights.map((n) => <option key={n.night} value={n.night}>第{n.night}夜 の相場</option>)}
                </select>
            </div>

            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 14px' }}>
                {/* ===== 精密採点パネル(DAM風・INKアクセント) ===== */}
                <div style={{ backgroundColor: INK, color: '#fff', borderRadius: '0 0 14px 14px', padding: 'clamp(22px, 5vw, 36px) clamp(18px, 4vw, 34px)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '3px', color: GOLD_HI }}>醜態相場 — 第{night}夜 終値</span>
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>vs {c.opponent}</span>
                    </div>

                    <div style={{ display: 'flex', gap: 'clamp(14px, 4vw, 34px)', alignItems: 'center', flexWrap: 'wrap', marginTop: '10px' }}>
                        {/* 相場(指数) */}
                        <div style={{ flex: '1 1 210px', minWidth: '200px' }}>
                            <div style={{ fontSize: '11px', letterSpacing: '2px', color: GOLD_HI, fontWeight: 700 }}>芸指数(TOLR)</div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', lineHeight: 1 }}>
                                <span style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 'clamp(50px, 13vw, 82px)', color: GOLD_HI, textShadow: '0 0 24px rgba(231,193,75,0.45)' }}>
                                    {mkt.index.toLocaleString()}
                                </span>
                            </div>
                            {/* 前夜比 = 成長/退化 */}
                            <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '7px', marginTop: '8px', backgroundColor: up ? 'rgba(46,158,107,0.16)' : 'rgba(192,57,43,0.18)', border: `1px solid ${up ? GREEN : RED}`, borderRadius: '8px', padding: '5px 12px' }}>
                                <span style={{ fontSize: '15px', color: up ? '#7BE0AF' : '#F0A199', fontWeight: 900 }}>{up ? '▲' : '▼'}</span>
                                <span style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '20px', color: up ? '#7BE0AF' : '#F0A199' }}>{up ? '+' : ''}{mkt.delta.toLocaleString()}</span>
                                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>前夜比 {up ? '+' : ''}{mkt.pct}%</span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.7)', marginTop: '10px', lineHeight: 1.7 }}>
                                {mkt.isHigh ? <span style={{ color: GOLD_HI, fontWeight: 800 }}>自己最高値 更新中</span> : <>自己最高 {mkt.allTimeHigh.toLocaleString()}</>}
                                <span style={{ color: 'rgba(255,255,255,0.4)' }}> ／ </span>シーズン平均 {mkt.seasonAvg.toLocaleString()}
                                <span style={{ color: 'rgba(255,255,255,0.4)' }}> ／ </span>積み上げ <span style={{ color: '#7BE0AF', fontWeight: 700 }}>{mkt.skill}</span>
                            </div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '13px', backgroundColor: 'rgba(255,255,255,0.08)', border: `1px solid ${RATING_COLOR[c.rating]}`, borderRadius: '8px', padding: '6px 14px' }}>
                                <span style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '30px', color: RATING_COLOR[c.rating], lineHeight: 1 }}>{c.rating}</span>
                                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)' }}>{c.ratingWord}</span>
                            </div>
                        </div>
                        {/* レーダー */}
                        <div style={{ flex: '1 1 240px', display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.96)', borderRadius: '12px', padding: '8px' }}>
                            <Radar axes={radar} />
                        </div>
                    </div>

                    <div style={{ fontFamily: SERIF, fontSize: 'clamp(15px, 3vw, 18px)', fontWeight: 700, color: '#fff', marginTop: '18px', lineHeight: 1.6 }}>
                        {c.headline}
                    </div>
                </div>

                {/* ===== 成長ストーリー(章) ===== */}
                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                        <SectionTitle>第{arc.no}章 / 全{STORY_ARCS.length}章 — {arc.title}</SectionTitle>
                        <Link href="/english/tonight/story-lab" style={{ fontSize: '11px', fontWeight: 700, color: GOLD, textDecoration: 'none' }}>全章のあらすじ →</Link>
                    </div>
                    <p style={{ fontFamily: SERIF, fontSize: '14.5px', lineHeight: 1.8, color: INK, margin: '0 0 4px' }}>{arc.logline}</p>
                    <p style={{ fontSize: '12.5px', lineHeight: 1.7, color: MUTED, margin: 0 }}>転機 — {arc.turn}</p>
                    <StoryArcBar night={night} />
                </Card>

                {/* ===== 分析レポート ===== */}
                <Card>
                    <SectionTitle>分析レポート — 実況の採点講評</SectionTitle>
                    <p style={{ fontSize: '14px', lineHeight: 2, color: INK, margin: 0 }}>{c.announcer}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '12px', marginTop: '18px' }}>
                        <div style={{ backgroundColor: '#F0F7F1', border: '1px solid #CDE3D2', borderLeft: `4px solid ${GREEN}`, borderRadius: '8px', padding: '13px 16px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '2px', color: '#166534' }}>今夜の好プレー</div>
                            <div style={{ fontFamily: SERIF, fontSize: '15px', fontWeight: 700, marginTop: '5px' }}>{c.mvpPlay}</div>
                            <div style={{ fontSize: '12px', color: MUTED, marginTop: '4px', lineHeight: 1.7 }}>{c.mvpNote}</div>
                        </div>
                        <div style={{ backgroundColor: '#FBF1F0', border: '1px solid #EBD3D0', borderLeft: `4px solid ${RED}`, borderRadius: '8px', padding: '13px 16px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '2px', color: RED }}>今夜の戦犯プレー</div>
                            <div style={{ fontFamily: SERIF, fontSize: '15px', fontWeight: 700, marginTop: '5px' }}>{c.worstPlay}</div>
                            <div style={{ fontSize: '12px', color: MUTED, marginTop: '4px', lineHeight: 1.7 }}>{c.worstNote}</div>
                        </div>
                    </div>
                </Card>

                {/* ===== 今夜のオッズ(結果) + フォーム ===== */}
                <Card>
                    <SectionTitle>今夜のオッズ — 事前予想 vs 結果</SectionTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '9px' }}>
                        {odds.map((o) => <OddsRow key={o.key} o={o} />)}
                    </div>
                    <div style={{ fontSize: '11px', color: MUTED, marginTop: '10px' }}>※ オッズは前夜までの発生率から算出(高いほど珍しい)。読む前に張って、読んで答え合わせ。</div>

                    <div style={{ borderTop: `1px solid ${LINE}`, marginTop: '18px', paddingTop: '16px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: MUTED, marginBottom: '10px' }}>フォーム — 直近7夜</div>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                            {form.recent.map((r) => (
                                <Link key={r.night} href={`/english/tonight/league?night=${r.night}`}
                                    style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                                    <span style={{ width: '30px', height: '30px', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SERIF, fontWeight: 900, fontSize: '15px', color: r.night === night ? '#fff' : RANK_HUE[r.rating], backgroundColor: r.night === night ? RANK_HUE[r.rating] : '#fff', border: `1.5px solid ${RANK_HUE[r.rating]}` }}>{r.rating}</span>
                                    <span style={{ fontSize: '9px', color: MUTED }}>{r.night}</span>
                                </Link>
                            ))}
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginLeft: '4px' }}>
                                {form.streak.map((s, i) => (
                                    <span key={i} style={{ fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px', color: s.kind === 'hot' ? '#166534' : RED, backgroundColor: s.kind === 'hot' ? '#E6F4EA' : '#FBEDEB', border: `1px solid ${s.kind === 'hot' ? '#CDE3D2' : '#EBD3D0'}` }}>
                                        {s.kind === 'hot' ? '連続' : '継続'} {s.label} {s.len}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* ===== 項目別スタッツ ===== */}
                <Card>
                    <SectionTitle>項目別スタッツ</SectionTitle>
                    <StatBar label="打席(発言トライ)" value={box.daseki} max={8} unit="打席" color={INK} />
                    <StatBar label="やらかし(通じなかった発言)" value={box.yarakashi} max={6} unit="失策" color={RED} />
                    <StatBar label="新語爆誕(召喚した捏造語)" value={box.shingo} max={4} unit="体" color={GOLD} />
                    <StatBar label="好プレー(着地イディオム+ベスト)" value={box.kouplay} max={5} unit="本" color={GREEN} />
                </Card>

                {/* ===== EXP / レベル ===== */}
                <Card>
                    <SectionTitle>経験値 &amp; レベル — 恥は経験値</SectionTitle>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: INK, color: GOLD_HI, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontSize: '9px', letterSpacing: '1px' }}>Lv</span>
                            <span style={{ fontFamily: SERIF, fontSize: '26px', fontWeight: 900, lineHeight: 1 }}>{saga.level}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: MUTED, marginBottom: '5px' }}>
                                <span>今夜 <b style={{ color: GREEN }}>+{box.exp} EXP</b>{box.levelUp && <span style={{ color: RED, fontWeight: 800, marginLeft: '8px' }}>LEVEL UP!</span>}</span>
                                <span>{expInLevel} / {saga.nextLevelExp}</span>
                            </div>
                            <div style={{ height: '14px', backgroundColor: '#EFEADD', borderRadius: '999px', overflow: 'hidden' }}>
                                <div style={{ width: `${expPct}%`, height: '100%', background: `linear-gradient(90deg, ${GOLD}, ${GOLD_HI})`, borderRadius: '999px' }} />
                            </div>
                            <div style={{ fontSize: '11.5px', color: MUTED, marginTop: '8px', lineHeight: 1.7 }}>
                                次のレベルまで あと <b style={{ color: INK }}>{Math.max(0, saga.nextLevelExp - saga.totalExp)}</b> EXP。
                                レイドボス「{RAID_BOSS.name}」に向けて積み上げ中。
                            </div>
                        </div>
                    </div>
                </Card>

                {/* ===== 醜態相場チャート ===== */}
                <Card>
                    <SectionTitle>醜態相場 — シーズン全{market.length}夜</SectionTitle>
                    <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', marginBottom: '8px', fontSize: '11.5px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: INK, fontWeight: 700 }}>
                            <span style={{ width: '18px', height: '3px', backgroundColor: GOLD, borderRadius: '2px' }} />芸指数(相場)= 面白さ
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: INK, fontWeight: 700 }}>
                            <span style={{ width: '18px', height: '0', borderTop: `2px dashed ${GREEN}` }} />積み上げ(回収イディオム)= 道具は増える
                        </span>
                    </div>
                    <MarketChart data={market} current={night} />
                    <p style={{ fontSize: '11.5px', color: MUTED, marginTop: '10px', lineHeight: 1.7 }}>
                        金の相場(壊れっぷり)は毎晩ドカンと上下。緑の点線はイディオムが増えてじわ上がり。だが道具が増えても、肝心の英語は一生ぶっ壊れたまま — 二本の線は交わらない。だからこの番組に最終回は無い。読者は「今夜はどう壊れるか」に賭ける。
                    </p>
                </Card>

                {/* ===== やらかし順位表 ===== */}
                <Card>
                    <SectionTitle>やらかし順位表 — 文法選手・戦犯ランキング</SectionTitle>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '460px' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', color: MUTED, fontSize: '11px', letterSpacing: '1px' }}>
                                    <th style={{ padding: '6px 4px' }}>順位</th>
                                    <th style={{ padding: '6px 4px' }}>選手</th>
                                    <th style={{ padding: '6px 4px', textAlign: 'center' }}>出勤率</th>
                                    <th style={{ padding: '6px 4px', textAlign: 'center' }}>成績</th>
                                    <th style={{ padding: '6px 4px' }}>スカウティング</th>
                                </tr>
                            </thead>
                            <tbody>
                                {standings.map((row) => {
                                    const worst = row.rank === 1;
                                    const moveEl = row.move > 0 ? <span style={{ color: GREEN }}>▲{row.move}</span>
                                        : row.move < 0 ? <span style={{ color: RED }}>▼{-row.move}</span>
                                            : <span style={{ color: MUTED }}>—</span>;
                                    return (
                                        <tr key={row.player.id} style={{ borderTop: `1px solid ${LINE}`, backgroundColor: worst ? '#FBF1F0' : 'transparent' }}>
                                            <td style={{ padding: '10px 4px', whiteSpace: 'nowrap' }}>
                                                <span style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '16px', color: worst ? RED : INK }}>{row.rank}</span>
                                                <span style={{ fontSize: '10px', marginLeft: '6px' }}>{moveEl}</span>
                                            </td>
                                            <td style={{ padding: '10px 4px' }}>
                                                <div style={{ fontWeight: 700, color: INK }}>{row.player.nickname}</div>
                                                <div style={{ fontSize: '10.5px', color: MUTED }}>{row.player.name} · {row.player.position}</div>
                                            </td>
                                            <td style={{ padding: '10px 4px', textAlign: 'center', fontFamily: SERIF, fontWeight: 700, color: worst ? RED : INK }}>
                                                .{String(Math.round(row.rate * 1000)).padStart(3, '0')}
                                            </td>
                                            <td style={{ padding: '10px 4px', textAlign: 'center', color: MUTED, whiteSpace: 'nowrap' }}>{row.on}勝{row.off}敗</td>
                                            <td style={{ padding: '10px 4px', fontSize: '11.5px', color: MUTED, lineHeight: 1.6 }}>{row.player.scouting}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ fontSize: '11px', color: MUTED, marginTop: '10px' }}>※ 出勤率=正しく機能した割合。低いほど戦犯。上位ほど、あなたも落ちやすい穴。</div>
                </Card>

                {/* ===== 通算記録 / タイトル ===== */}
                <Card>
                    <SectionTitle>通算記録 &amp; シーズンタイトル</SectionTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                        {[
                            ['通算成績', `${totals.games}戦`, `打席${totals.daseki} / やらかし${totals.yarakashi}`],
                            ['新語爆誕・通算', `${totals.shingo}体`, '月刊TOLERANCYに図鑑化'],
                            ['冠詞a ストリーク', streak.kind === 'ON' ? `${streak.len}連続 出勤` : `${streak.len}連続 欠勤`, '固定砲台で執行猶予中'],
                            ['最多戦犯', titles.worstOffender?.player.nickname ?? '—', `出勤率 .${String(Math.round((titles.worstOffender?.rate ?? 0) * 1000)).padStart(3, '0')}`],
                        ].map(([k, v, sub], i) => (
                            <div key={i} style={{ border: `1px solid ${LINE}`, borderTop: `3px solid ${GOLD}`, borderRadius: '8px', padding: '14px 16px', backgroundColor: PAPER }}>
                                <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1.5px', color: MUTED }}>{k}</div>
                                <div style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 900, color: INK, marginTop: '4px', lineHeight: 1.2 }}>{v}</div>
                                <div style={{ fontSize: '11px', color: MUTED, marginTop: '4px', lineHeight: 1.5 }}>{sub}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '14px', backgroundColor: '#FBF6E7', border: '1px solid #E8D9A8', borderRadius: '8px', padding: '13px 16px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '2px', color: GOLD }}>月間ベストプレー</span>
                        <div style={{ fontFamily: SERIF, fontSize: '15px', fontWeight: 700, marginTop: '4px' }}>{titles.bestPlay.play}</div>
                        <div style={{ fontSize: '12px', color: MUTED, marginTop: '3px' }}>第{titles.bestPlay.night}夜 — {titles.bestPlay.note}</div>
                    </div>
                </Card>

                {/* ===== 次回予告(引き) ===== */}
                <div style={{ marginTop: '20px', backgroundColor: INK, color: '#fff', borderRadius: '14px', padding: 'clamp(20px, 4vw, 30px)', border: `1px solid ${GOLD}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: GOLD_HI }}>次回予告 — 第{nextTease.night}夜</span>
                        {nextTease.exists && (
                            <Link href={`/english/tonight/league?night=${nextTease.night}`} style={{ fontSize: '12px', fontWeight: 800, color: GOLD_HI, textDecoration: 'none' }}>結果を見にいく →</Link>
                        )}
                    </div>
                    <p style={{ fontFamily: SERIF, fontSize: 'clamp(15px, 3vw, 18px)', fontWeight: 700, lineHeight: 1.8, margin: '10px 0 16px', color: '#fff' }}>{nextTease.teaser}</p>
                    <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '2px', color: 'rgba(255,255,255,0.55)', marginBottom: '9px' }}>事前オッズ(受付中)</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px' }}>
                        {nextTease.openOdds.map((o) => (
                            <div key={o.key} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '9px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(231,193,75,0.35)' }}>
                                <span style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '19px', color: GOLD_HI, minWidth: '48px' }}>×{o.odds.toFixed(1)}</span>
                                <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>{o.label}</span>
                            </div>
                        ))}
                    </div>
                    {nextTease.exists ? (
                        <Link href={`/english/tonight/league?night=${nextTease.night}`}
                            style={{ display: 'inline-block', marginTop: '16px', backgroundColor: GOLD, color: INK, fontWeight: 900, fontSize: '13px', padding: '10px 22px', borderRadius: '9px', textDecoration: 'none' }}>
                            答え合わせへ — 第{nextTease.night}夜の結果
                        </Link>
                    ) : (
                        <div style={{ marginTop: '16px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>結果はまだ。番組本編の更新を待て。</div>
                    )}
                </div>

                {/* ===== 読者への一言 ===== */}
                <div style={{ marginTop: '20px', backgroundColor: INK, color: '#fff', borderRadius: '12px', padding: 'clamp(20px, 4vw, 30px)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: GOLD_HI, marginBottom: '12px' }}>このスコアブックの読み方</div>
                    <p style={{ fontFamily: SERIF, fontSize: '14.5px', lineHeight: 2, margin: 0, color: 'rgba(255,255,255,0.92)' }}>{LEAGUE_META.readerPitch}</p>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '18px', fontSize: '12px' }}>
                        <Link href={`/english/tonight/screens?night=${night}`} style={{ color: GOLD_HI, fontWeight: 700, textDecoration: 'none' }}>スマホ縦スクショ (note用)</Link>
                        <Link href="/english/tonight/cards" style={{ color: GOLD_HI, fontWeight: 700, textDecoration: 'none' }}>note用カード書き出し</Link>
                        <Link href="/english/tonight" style={{ color: GOLD_HI, fontWeight: 700, textDecoration: 'none' }}>番組本編へ</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
