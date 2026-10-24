'use client';

// とにおリーグ 物語ページ — シーズンの成長ストーリーを1本で見せる。
// 骨格は「上手くなったら終わる番組」。読者は男の失敗に賭けながら、
// 章 → 章 → 今ここ → 次回予告 と追わされる。全部お笑い、ライト基調。
// 数字/章/次回は tonio-league.ts の実データから。凝った比較ラボは廃止(採用案=リーグ路線に一本化)。

import Link from 'next/link';
import {
    LEAGUE_META, STORY_ARCS, GRAMMAR_PLAYERS,
    getMarket, getLatestLeagueNight, getNightMarket, getCommentary, getNextTease,
    type MarketPoint,
} from '@/data/english/tonio-league';

const PAPER = '#F4F0E6';
const INK = '#17130F';
const MUTED = '#6E6558';
const RED = '#C0392B';
const GOLD = '#B8941E';
const GOLD_HI = '#E7C14B';
const GREEN = '#2E9E6B';
const LINE = '#E5DECF';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";
const SANS = "'Helvetica Neue', Arial, 'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";

// ============ 成長曲線(章の帯つき) ============
function GrowthCurve({ data }: { data: MarketPoint[] }) {
    const W = 680, H = 220, padT = 16, padB = 26;
    const shows = data.map((d) => d.show);
    const smin = Math.min(...shows), smax = Math.max(...shows);
    const skills = data.map((d) => d.skill);
    const kmin = Math.min(...skills), kmax = Math.max(...skills);
    const x = (i: number) => (i * W) / Math.max(1, data.length - 1);
    const yShow = (v: number) => padT + (1 - (v - smin) / Math.max(1, smax - smin)) * (H - padT - padB);
    const ySkill = (v: number) => padT + (1 - (v - kmin) / Math.max(1, kmax - kmin)) * (H - padT - padB);
    const idxOf = (night: number) => data.findIndex((d) => d.night === night);
    const showPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${yShow(d.show)}`).join(' ');
    const showArea = `${showPath} L${W},${H - padB} L0,${H - padB} Z`;
    const skillPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${ySkill(d.skill)}`).join(' ');
    return (
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
            <defs>
                <linearGradient id="gcFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GOLD} stopOpacity="0.32" />
                    <stop offset="100%" stopColor={GOLD} stopOpacity="0.02" />
                </linearGradient>
            </defs>
            {/* 章の境界 */}
            {STORY_ARCS.map((a, i) => {
                const si = idxOf(a.nights[0]);
                if (si <= 0) return null;
                const px = x(si);
                return <line key={i} x1={px} y1={padT} x2={px} y2={H - padB} stroke={LINE} strokeWidth={1} strokeDasharray="2 3" />;
            })}
            {/* 章ラベル */}
            {STORY_ARCS.map((a, i) => {
                const si = Math.max(0, idxOf(a.nights[0]));
                const ei = idxOf(a.nights[1]) < 0 ? data.length - 1 : idxOf(a.nights[1]);
                const cx = (x(si) + x(ei)) / 2;
                return <text key={i} x={cx} y={H - 9} fontSize="9.5" fill={MUTED} textAnchor="middle" fontFamily={SANS}>{a.no}. {a.title}</text>;
            })}
            <path d={showArea} fill="url(#gcFill)" />
            <path d={showPath} fill="none" stroke={GOLD} strokeWidth={2.6} strokeLinejoin="round" />
            <path d={skillPath} fill="none" stroke={GREEN} strokeWidth={1.8} strokeDasharray="4 3" opacity={0.85} strokeLinejoin="round" />
        </svg>
    );
}

export default function StoryLabPage() {
    const market = getMarket();
    const latest = getLatestLeagueNight();
    const mkt = getNightMarket(latest.night);
    const nextTease = getNextTease(latest.night);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: PAPER, fontFamily: SANS, color: INK, padding: '0 0 90px' }}>
            {/* ツールバー */}
            <div style={{ backgroundColor: INK, color: '#fff', padding: '10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Link href="/english/tonight" style={{ color: GOLD_HI, textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>← 番組へ</Link>
                    <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '2px' }}>とにおリーグ 物語</span>
                </div>
                <Link href="/english/tonight/league" style={{ color: GOLD_HI, textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>スコア(相場)へ →</Link>
            </div>

            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 14px' }}>
                {/* ===== 主題(引き) ===== */}
                <div style={{ backgroundColor: INK, color: '#fff', borderRadius: '0 0 16px 16px', padding: 'clamp(26px, 6vw, 44px) clamp(20px, 5vw, 40px)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: GOLD_HI }}>{LEAGUE_META.season}</div>
                    <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(30px, 8vw, 52px)', fontWeight: 900, lineHeight: 1.15, margin: '10px 0 0' }}>
                        壊れたまま、<br />終わらない。
                    </h1>
                    <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', lineHeight: 1.9, color: 'rgba(255,255,255,0.86)', marginTop: '18px' }}>
                        5年ぶりに英会話へ戻った男が、毎晩25分、恥をかきに行く。回数は積み上がる。イディオムも増える。
                        だが — 通じない。新語を生む。冠詞は消える。<span style={{ color: GOLD_HI, fontWeight: 700 }}>この「ぶっ壊れイングリッシュ」こそが売りで、彼は一生卒業しない。だから、終わらない。</span>
                        読者は「上達するか」ではなく「今夜はどう壊れるか」に賭ける。
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
                        {[
                            ['連載', '無限'],
                            ['芸指数', mkt.index.toLocaleString()],
                            ['積み上げ', String(mkt.skill)],
                            ['最終回', '無し'],
                        ].map(([k, v], i) => (
                            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(231,193,75,0.3)', borderRadius: '9px', padding: '9px 15px' }}>
                                <div style={{ fontSize: '10px', letterSpacing: '1px', color: 'rgba(255,255,255,0.55)' }}>{k}</div>
                                <div style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 900, color: GOLD_HI }}>{v}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===== 成長曲線 ===== */}
                <div style={{ backgroundColor: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: 'clamp(18px, 4vw, 26px)', marginTop: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: RED, marginBottom: '10px' }}>積み上がり — 壊れっぷり と 道具の数</div>
                    <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', marginBottom: '8px', fontSize: '11.5px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}><span style={{ width: '18px', height: '3px', backgroundColor: GOLD, borderRadius: '2px' }} />芸指数(壊れっぷり)</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}><span style={{ width: '18px', borderTop: `2px dashed ${GREEN}` }} />積み上げ(回収イディオム)</span>
                    </div>
                    <GrowthCurve data={market} />
                    <p style={{ fontSize: '12px', color: MUTED, marginTop: '10px', lineHeight: 1.7 }}>
                        金の相場(壊れっぷり)は毎晩ドカンと上下。緑の点線は道具(イディオム)が増えてじわ上がり。だが道具が増えても、壊れは一生消えない — 二本の線は交わらない。だから、終わらない。
                    </p>
                </div>

                {/* ===== 全6章 ===== */}
                <div style={{ marginTop: '26px', marginBottom: '10px' }}>
                    <h2 style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 900, color: INK, margin: 0 }}>全{STORY_ARCS.length}章のあらすじ</h2>
                    <p style={{ fontSize: '12.5px', color: MUTED, marginTop: '4px' }}>各章のヤマ場に飛べる。数字は「その夜のスコア(相場)」につながる。</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {STORY_ARCS.map((a) => {
                        const peak = getCommentary(a.peakNight);
                        return (
                            <div key={a.no} style={{ backgroundColor: '#fff', border: `1px solid ${LINE}`, borderLeft: `5px solid ${GOLD}`, borderRadius: '12px', padding: 'clamp(16px, 4vw, 24px)' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                                    <span style={{ fontFamily: SERIF, fontSize: '32px', fontWeight: 900, color: GOLD, lineHeight: 1 }}>{a.no}</span>
                                    <span style={{ fontFamily: SERIF, fontSize: '21px', fontWeight: 900, color: INK }}>{a.title}</span>
                                    <span style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>第{a.nights[0]}〜{a.nights[1]}夜</span>
                                </div>
                                <p style={{ fontFamily: SERIF, fontSize: '15px', lineHeight: 1.85, color: INK, margin: '12px 0 8px' }}>{a.logline}</p>
                                <div style={{ backgroundColor: '#FBF6E7', border: '1px solid #E8D9A8', borderRadius: '8px', padding: '10px 14px', marginBottom: '12px' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '2px', color: GOLD }}>転機</span>
                                    <div style={{ fontSize: '13px', color: INK, marginTop: '3px', lineHeight: 1.7 }}>{a.turn}</div>
                                </div>
                                <Link href={`/english/tonight/league?night=${a.peakNight}`}
                                    style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', backgroundColor: PAPER, border: `1px solid ${LINE}`, borderRadius: '9px', padding: '10px 14px' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1px', color: RED, whiteSpace: 'nowrap' }}>この章の名勝負</span>
                                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: INK, flex: 1, minWidth: 0 }}>第{a.peakNight}夜 — {peak?.headline}</span>
                                    <span style={{ fontSize: '12px', fontWeight: 800, color: GOLD, whiteSpace: 'nowrap' }}>見る →</span>
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {/* ===== 登場人物(文法選手=常連の敵) ===== */}
                <div style={{ marginTop: '28px', marginBottom: '10px' }}>
                    <h2 style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 900, color: INK, margin: 0 }}>常連の敵 — 文法選手</h2>
                    <p style={{ fontSize: '12.5px', color: MUTED, marginTop: '4px' }}>毎晩どれかが必ず現れる。持病の擬人化。倒しても、翌晩また来る。</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                    {GRAMMAR_PLAYERS.map((p) => (
                        <div key={p.id} style={{ backgroundColor: '#fff', border: `1px solid ${LINE}`, borderRadius: '11px', padding: '15px 17px' }}>
                            <div style={{ fontFamily: SERIF, fontSize: '17px', fontWeight: 900, color: INK }}>{p.nickname}</div>
                            <div style={{ fontSize: '11px', color: MUTED, marginTop: '2px' }}>{p.name} · {p.position}</div>
                            <p style={{ fontSize: '12px', color: MUTED, lineHeight: 1.7, marginTop: '8px', marginBottom: 0 }}>{p.scouting}</p>
                        </div>
                    ))}
                </div>

                {/* ===== 次回への引き ===== */}
                <div style={{ marginTop: '28px', backgroundColor: INK, color: '#fff', borderRadius: '14px', padding: 'clamp(22px, 5vw, 34px)', border: `1px solid ${GOLD}` }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: GOLD_HI }}>そして、次回 — 第{nextTease.night}夜</div>
                    <p style={{ fontFamily: SERIF, fontSize: 'clamp(16px, 3.4vw, 20px)', fontWeight: 700, lineHeight: 1.85, margin: '12px 0 18px' }}>{nextTease.teaser}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '8px' }}>
                        {nextTease.openOdds.map((o) => (
                            <div key={o.key} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '9px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(231,193,75,0.35)' }}>
                                <span style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '19px', color: GOLD_HI, minWidth: '48px' }}>×{o.odds.toFixed(1)}</span>
                                <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>{o.label}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '20px' }}>
                        <Link href="/english/tonight/league" style={{ backgroundColor: GOLD, color: INK, fontWeight: 900, fontSize: '13px', padding: '11px 22px', borderRadius: '9px', textDecoration: 'none' }}>スコア(相場)を見る</Link>
                        <Link href="/english/tonight" style={{ color: GOLD_HI, fontWeight: 800, fontSize: '13px', padding: '11px 4px', textDecoration: 'none' }}>番組本編へ →</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
