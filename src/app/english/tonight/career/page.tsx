'use client';

// 英会話芸人・戦績 — 62回のDMM「実データ」から醜態(ギャグ)を導出して見せる。
// 主役はギャグ。成長は二の次、上達自慢はしない。刃は自分に向ける。
// 数字は全部 tonio-derive.ts が conversation の中身から計算(捏造なし)。
// これが62本化の土台=データ管理。夜にする順番は醜態力ランキングで決める。

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { DmmConversation } from '@/lib/d1';
import { deriveCareer, type Career } from '@/lib/tonio-derive';

const PAPER = '#F4F0E6';
const CARD = '#FFFFFF';
const INK = '#17130F';
const MUTED = '#6E6558';
const RED = '#C0392B';
const GOLD = '#B8941E';
const GOLD_HI = '#E7C14B';
const LINE = '#E5DECF';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";
const SANS = "'Helvetica Neue', Arial, 'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";

// 恥の蓄積曲線(正直な積み上げ。上達ではなく"晒した恥"が積もる)
function ShameCurve({ data }: { data: { date: string; cum: number }[] }) {
    const W = 640, H = 150, padL = 34, padR = 12, padT = 12, padB = 22;
    const n = data.length;
    const max = data.length ? data[data.length - 1].cum : 1;
    const x = (i: number) => padL + (i * (W - padL - padR)) / Math.max(1, n - 1);
    const y = (v: number) => padT + (1 - v / max) * (H - padT - padB);
    const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.cum).toFixed(1)}`).join(' ');
    const area = `${path} L${x(n - 1).toFixed(1)},${y(0)} L${x(0).toFixed(1)},${y(0)} Z`;
    return (
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
            <path d={area} fill={GOLD} opacity={0.12} />
            <path d={path} fill="none" stroke={GOLD} strokeWidth={2.5} strokeLinejoin="round" />
            <text x={padL} y={H - 5} fontSize="9" fill={MUTED}>{data[0]?.date.slice(5)}</text>
            <text x={W - padR} y={H - 5} fontSize="9" fill={MUTED} textAnchor="end">{data[n - 1]?.date.slice(5)}</text>
        </svg>
    );
}

function Stat({ label, value, sub, color = INK }: { label: string; value: React.ReactNode; sub?: string; color?: string }) {
    return (
        <div style={{ flex: '1 1 130px', minWidth: 120, border: `1px solid ${LINE}`, borderTop: `3px solid ${GOLD}`, borderRadius: 10, padding: '14px 16px', background: CARD }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, color: MUTED }}>{label}</div>
            <div style={{ fontFamily: SERIF, fontSize: 26, fontWeight: 900, color, marginTop: 2, lineHeight: 1.1 }}>{value}</div>
            {sub && <div style={{ fontSize: 10.5, color: MUTED, marginTop: 3 }}>{sub}</div>}
        </div>
    );
}

function ProgressRow({ label, done, total, note }: { label: string; done: number; total: number; note: string }) {
    const pct = total ? Math.round((done / total) * 100) : 0;
    return (
        <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                <span style={{ fontSize: 12.5, fontWeight: 700 }}>{label} <span style={{ fontSize: 11, color: MUTED, fontWeight: 400 }}>— {note}</span></span>
                <span style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 900, color: GOLD }}>{done}<span style={{ fontSize: 11, color: MUTED, fontWeight: 400 }}>/{total}</span></span>
            </div>
            <div style={{ height: 9, background: '#EFEADD', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: GOLD, borderRadius: 999 }} />
            </div>
        </div>
    );
}

export default function TonightCareerPage() {
    const [convs, setConvs] = useState<DmmConversation[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let alive = true;
        fetch('/api/dmm-conversations', { cache: 'no-store' })
            .then((r) => r.json())
            .then((j) => { if (!alive) return; if (!j?.success) { setError(j?.error || 'load failed'); return; } setConvs(j.conversations as DmmConversation[]); })
            .catch((e) => { if (alive) setError(String(e)); });
        return () => { alive = false; };
    }, []);

    const career: Career | null = useMemo(() => (convs ? deriveCareer(convs) : null), [convs]);

    if (error) return <div style={{ padding: 40, fontFamily: SANS, color: RED }}>Error: {error}</div>;
    if (!career) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: PAPER, color: MUTED, fontFamily: SANS }}>62回の恥を集計中…</div>;

    const expPct = Math.min(100, Math.round((career.totalExp / career.nextLevelAt) * 100));

    return (
        <div style={{ minHeight: '100vh', backgroundColor: PAPER, padding: '0 0 90px', fontFamily: SANS, color: INK }}>
            <div style={{ backgroundColor: INK, color: '#fff', padding: '10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Link href="/english/tonight" style={{ color: GOLD_HI, textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>← 番組へ</Link>
                    <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2 }}>英会話芸人・戦績</span>
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>全{career.totalLessons}回 · 実データ</span>
            </div>

            <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 14px' }}>
                {/* ヒーロー: 恥=経験値(上達ではなく蓄積) */}
                <div style={{ backgroundColor: INK, color: '#fff', borderRadius: '0 0 14px 14px', padding: 'clamp(22px,5vw,34px) clamp(18px,4vw,32px)' }}>
                    <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 3, color: GOLD_HI }}>恥=経験値 — 上手くなるより、面白く失敗する</div>
                    <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', marginTop: 14 }}>
                        <div style={{ width: 78, height: 78, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', border: `2px solid ${GOLD_HI}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontSize: 10, letterSpacing: 1, color: GOLD_HI }}>LEVEL</span>
                            <span style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{career.level}</span>
                        </div>
                        <div style={{ flex: 1, minWidth: 220 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.75)', marginBottom: 5 }}>
                                <span>累計 {career.totalExp.toLocaleString()} EXP</span>
                                <span>次のLvまで {Math.max(0, career.nextLevelAt - career.totalExp).toLocaleString()}</span>
                            </div>
                            <div style={{ height: 14, background: 'rgba(255,255,255,0.12)', borderRadius: 999, overflow: 'hidden' }}>
                                <div style={{ width: `${expPct}%`, height: '100%', background: `linear-gradient(90deg,${GOLD},${GOLD_HI})`, borderRadius: 999 }} />
                            </div>
                            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.7)', marginTop: 8, lineHeight: 1.7 }}>
                                晒した恥 <b style={{ color: GOLD_HI }}>{career.totalShame}</b> 件が、そのまま芸の元手。伸びたかどうかは、どうでもいい。
                            </div>
                        </div>
                    </div>
                </div>

                {/* 統計 */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
                    <Stat label="通算レッスン" value={career.totalLessons} sub="開幕〜現在" />
                    <Stat label="連続" value={`${career.streak}日`} sub="毎晩やってる" />
                    <Stat label="総発話" value={career.totalTurns} sub="=打席数" />
                    <Stat label="恥の総量" value={career.totalShame} sub="拾われた醜態" color={RED} />
                </div>

                {/* 62本化の進捗(=データ管理の核) */}
                <div style={{ backgroundColor: CARD, border: `1px solid ${LINE}`, borderRadius: 12, padding: 'clamp(18px,4vw,26px)', marginTop: 18 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: RED, textTransform: 'uppercase', marginBottom: 4 }}>62本化の進捗 — ギャグにできた回数</div>
                    <div style={{ fontSize: 12, color: MUTED, marginBottom: 16 }}>ツッコミ(spice)か検死が付けば、その回は夜(ギャグ)にできる。ここを埋めるのが全部化の作業。</div>
                    <ProgressRow label="夜になった" done={career.madeCount} total={career.totalLessons} note="番組(今夜も、通じない。)に仕上げ済み" />
                    <ProgressRow label="ギャグ化 準備OK" done={career.nightReady} total={career.totalLessons} note="ツッコミ or 検死あり" />
                    <ProgressRow label="ツッコミ済(spice)" done={career.spiceReady} total={career.totalLessons} note="一言ツッコミが付いた回" />
                    <ProgressRow label="検死済(diagnosis)" done={career.diagReady} total={career.totalLessons} note="乖離/文法バグを記録した回" />
                </div>

                {/* 恥の蓄積曲線(正直な積み上げ。成長曲線ではない) */}
                <div style={{ backgroundColor: CARD, border: `1px solid ${LINE}`, borderRadius: 12, padding: 'clamp(18px,4vw,26px)', marginTop: 18 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: RED, textTransform: 'uppercase', marginBottom: 6 }}>恥の蓄積 — 積もるほど芸の在庫</div>
                    <ShameCurve data={career.expCurve} />
                    <div style={{ fontSize: 11.5, color: MUTED, marginTop: 8 }}>右肩上がりで正しい。これは上達曲線じゃない。恥が積もった量。</div>
                </div>

                {/* 醜態力ランキング(=夜にする順) */}
                <div style={{ backgroundColor: CARD, border: `1px solid ${LINE}`, borderRadius: 12, padding: 'clamp(18px,4vw,26px)', marginTop: 18 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: RED, textTransform: 'uppercase', marginBottom: 4 }}>醜態力ランキング — 次に夜にする順</div>
                    <div style={{ fontSize: 12, color: MUTED, marginBottom: 14 }}>この順で /tonight・/league のプレミアム版に仕上げる。ボケが濃い回が上。<b>既に夜にした{career.madeCount}回は除外</b>してあるので、上から順に潰せばいい。(残り{career.ready.length}回が採点済)</div>
                    {career.ready.length === 0 ? (
                        <div style={{ padding: 20, color: MUTED, fontSize: 13 }}>採点済の回は全部夜になりました。次はツッコミ(spice)か検死を付けるところから。</div>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                            {career.ready.slice(0, 15).map((l, i) => (
                                <li key={l.id}>
                                    <Link href={`/english/training/dmm/${l.id}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', background: i < 3 ? '#FBF6E7' : '#fff', border: `1px solid ${i < 3 ? '#E8D9A8' : LINE}`, borderRadius: 10, textDecoration: 'none', color: 'inherit' }}>
                                        <span style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 18, color: i < 3 ? GOLD : MUTED, width: 26, textAlign: 'center' }}>{i + 1}</span>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: 14, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.title}</div>
                                            <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{l.date} · ボケ{l.spiceCount} · 乖離{l.divergences} · 文法{l.grammarBugs}</div>
                                        </div>
                                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                            <div style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 20, color: GOLD }}>{l.shutai}</div>
                                            <div style={{ fontSize: 9, color: MUTED, letterSpacing: 1 }}>醜態力</div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* 未注釈キュー(=素材待ち) */}
                {career.queue.length > 0 && (
                    <div style={{ backgroundColor: CARD, border: `1px solid ${LINE}`, borderRadius: 12, padding: 'clamp(18px,4vw,26px)', marginTop: 18 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: MUTED, textTransform: 'uppercase' }}>素材待ち — ツッコミ未記入</div>
                            <span style={{ fontSize: 11, color: MUTED }}>{career.queue.length}回</span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
                            {career.queue.slice(0, 10).map((l) => (
                                <li key={l.id}>
                                    <Link href={`/english/training/dmm/${l.id}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 14px', background: '#FAFAF9', border: `1px solid ${LINE}`, borderRadius: 9, textDecoration: 'none', color: 'inherit' }}>
                                        <span style={{ fontSize: 11, color: MUTED, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{l.date.slice(5)}</span>
                                        <span style={{ flex: 1, fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.title}</span>
                                        <span style={{ fontSize: 11, color: MUTED }}>発話{l.studentTurns}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {career.queue.length > 10 && <div style={{ fontSize: 11, color: MUTED, marginTop: 8 }}>ほか {career.queue.length - 10} 回</div>}
                    </div>
                )}

                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 20, fontSize: 12 }}>
                    <Link href="/english/tonight/calendar" style={{ color: GOLD, fontWeight: 700, textDecoration: 'none' }}>日めくりカレンダー</Link>
                    <Link href="/english/tonight/league" style={{ color: GOLD, fontWeight: 700, textDecoration: 'none' }}>とにおリーグ(精密採点)</Link>
                    <Link href="/english/training/dmm" style={{ color: GOLD, fontWeight: 700, textDecoration: 'none' }}>DMM会話カレンダー</Link>
                </div>
            </div>
        </div>
    );
}
