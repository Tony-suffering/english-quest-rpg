'use client';

// とにお劇「解剖される男」— 連載の背骨(ドラマ)を見せるページ。
// 断片の羅列だった1〜64夜を、敵役3体・5幕・縦糸で1本の劇として組み直す。
// 時系列で入らなくていい導線(入口5つ / 糸)を用意して、62話目でも1000話目でも
// 途中から入った人がファンになれるようにする。ライト基調・絵文字なし。

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
    DRAMA_META, DRAMA_VILLAINS, DRAMA_ACTS, DRAMA_ENTRIES,
} from '@/data/english/tonio-drama';
import { getThreads } from '@/data/english/tonio-threads';
import { getCurriculumStats } from '@/data/english/tonio-curriculum';

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

const TOTAL_NIGHTS = 64;

// ============ 糸マップ(路線図) ============
// 64夜を横軸に、各糸を1本の線として引く。夜をまたぐ繋がりが一目で見える。
function ThreadMap({ threads, onPick, active }: {
    threads: ReturnType<typeof getThreads>;
    onPick: (id: string) => void;
    active: string | null;
}) {
    const W = 680, rowH = 30, padL = 132, padR = 14, padT = 18;
    const H = padT + threads.length * rowH + 26;
    const x = (night: number) => padL + ((night - 1) / (TOTAL_NIGHTS - 1)) * (W - padL - padR);

    return (
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
            {/* 夜の目盛り */}
            {[1, 16, 32, 48, 64].map((n) => (
                <g key={n}>
                    <line x1={x(n)} y1={padT - 6} x2={x(n)} y2={H - 22} stroke={LINE} strokeWidth={1} strokeDasharray="2 4" />
                    <text x={x(n)} y={H - 8} fontSize="9" fill={MUTED} textAnchor="middle" fontFamily={SANS}>{n}夜</text>
                </g>
            ))}
            {threads.map((t, i) => {
                const y = padT + i * rowH + 8;
                const dim = active !== null && active !== t.id;
                const first = t.beats[0]?.night ?? 1;
                const last = t.beats[t.beats.length - 1]?.night ?? TOTAL_NIGHTS;
                return (
                    <g key={t.id} opacity={dim ? 0.28 : 1} style={{ cursor: 'pointer' }} onClick={() => onPick(t.id)}>
                        {/* 糸名 */}
                        <text x={padL - 10} y={y + 4} fontSize="11" fontWeight={active === t.id ? 800 : 600}
                            fill={active === t.id ? t.color : INK} textAnchor="end" fontFamily={SANS}>
                            {t.title}
                        </text>
                        {/* 線(初出→最新) */}
                        <line x1={x(first)} y1={y} x2={x(last)} y2={y} stroke={t.color} strokeWidth={active === t.id ? 3 : 2} strokeLinecap="round" />
                        {/* 各夜の点(同じ夜に複数ビートが載る糸があるので index も鍵に含める) */}
                        {t.beats.map((b, bi) => (
                            <circle key={`${b.night}-${bi}`} cx={x(b.night)} cy={y} r={b.turn ? 5 : 3.2}
                                fill={b.turn ? '#fff' : t.color} stroke={t.color} strokeWidth={b.turn ? 2.5 : 0} />
                        ))}
                    </g>
                );
            })}
        </svg>
    );
}

function SectionH({ children }: { children: React.ReactNode }) {
    return <h2 style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 900, color: INK, margin: '0 0 4px' }}>{children}</h2>;
}
function Card({ children }: { children: React.ReactNode }) {
    return <div style={{ backgroundColor: CARD, border: `1px solid ${LINE}`, borderRadius: '14px', padding: 'clamp(18px, 4vw, 28px)', marginTop: '16px' }}>{children}</div>;
}

export default function DramaPage() {
    const threads = useMemo(() => getThreads(), []);
    const stats = useMemo(() => getCurriculumStats(), []);
    const [active, setActive] = useState<string | null>(null);
    const cur = threads.find((t) => t.id === active);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: PAPER, fontFamily: SANS, color: INK, padding: '0 0 90px' }}>
            {/* ツールバー */}
            <div style={{ backgroundColor: INK, color: '#fff', padding: '10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Link href="/english/tonight" style={{ color: GOLD_HI, textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>← 番組へ</Link>
                    <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '2px' }}>とにお劇</span>
                </div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>全{TOTAL_NIGHTS}夜 / 5幕</span>
            </div>

            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 14px' }}>
                {/* ===== 主題 ===== */}
                <div style={{ backgroundColor: INK, color: '#fff', borderRadius: '0 0 16px 16px', padding: 'clamp(26px, 6vw, 44px) clamp(20px, 5vw, 38px)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: GOLD_HI }}>連載の背骨</div>
                    <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(32px, 9vw, 56px)', fontWeight: 900, lineHeight: 1.15, margin: '10px 0 0' }}>
                        解剖される男
                    </h1>
                    <p style={{ fontFamily: SERIF, fontSize: 'clamp(15px, 3.2vw, 18px)', lineHeight: 1.85, color: GOLD_HI, margin: '14px 0 0', fontWeight: 700 }}>
                        {DRAMA_META.logline}
                    </p>
                    <p style={{ fontSize: '13.5px', lineHeight: 2, color: 'rgba(255,255,255,0.85)', margin: '16px 0 0' }}>
                        {DRAMA_META.premise}
                    </p>
                    <div style={{ marginTop: '18px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '14px', fontSize: '13px', color: GOLD_HI, fontWeight: 700 }}>
                        {DRAMA_META.stakes}
                    </div>
                </div>

                {/* ===== どこから読むか(時系列でない入口) ===== */}
                <Card>
                    <SectionH>どこから読んでもいい</SectionH>
                    <p style={{ fontSize: '12.5px', color: MUTED, margin: '4px 0 14px' }}>
                        第1夜から順に読む必要は無い。刺さりそうな1夜から入って、糸を辿れば全部つながる。
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                        {DRAMA_ENTRIES.map((e) => (
                            <Link key={e.night} href={`/english/tonight/league?night=${e.night}`} style={{ textDecoration: 'none' }}>
                                <div style={{ border: `1px solid ${LINE}`, borderLeft: `4px solid ${GOLD}`, borderRadius: '9px', padding: '12px 14px', backgroundColor: PAPER, height: '100%' }}>
                                    <div style={{ fontSize: '11px', fontWeight: 800, color: RED, letterSpacing: '0.5px' }}>{e.label}</div>
                                    <div style={{ fontFamily: SERIF, fontSize: '17px', fontWeight: 900, color: INK, marginTop: '3px' }}>第{e.night}夜</div>
                                    <div style={{ fontSize: '11.5px', color: MUTED, marginTop: '4px', lineHeight: 1.65 }}>{e.why}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Card>

                {/* ===== 敵役 ===== */}
                <Card>
                    <SectionH>敵役は3体</SectionH>
                    <p style={{ fontSize: '12.5px', color: MUTED, margin: '4px 0 14px' }}>
                        どれも倒せない。倒せないから、連載が終わらない。
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                        {DRAMA_VILLAINS.map((v, i) => (
                            <div key={v.id} style={{ border: `1px solid ${LINE}`, borderRadius: '11px', padding: '14px 16px', backgroundColor: i === 1 ? '#FBF1F0' : PAPER }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                                    <span style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 900, color: i === 1 ? RED : INK }}>{v.name}</span>
                                    <span style={{ fontSize: '11px', color: MUTED }}>{v.role}</span>
                                </div>
                                <div style={{ fontSize: '11.5px', fontWeight: 800, color: i === 1 ? RED : GOLD, marginTop: '5px' }}>{v.record}</div>
                                <p style={{ fontSize: '12.5px', color: INK, lineHeight: 1.85, margin: '7px 0 0' }}>{v.why}</p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* ===== 5幕 ===== */}
                <Card>
                    <SectionH>5幕 — 64夜の劇</SectionH>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '14px' }}>
                        {DRAMA_ACTS.map((a) => (
                            <div key={a.no} style={{ border: `1px solid ${LINE}`, borderLeft: `5px solid ${GOLD}`, borderRadius: '12px', padding: '16px 18px' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '11px', flexWrap: 'wrap' }}>
                                    <span style={{ fontFamily: SERIF, fontSize: '13px', fontWeight: 900, color: GOLD, letterSpacing: '2px' }}>第{a.no}幕</span>
                                    <span style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 900, color: INK }}>{a.title}</span>
                                    <span style={{ fontSize: '11px', color: MUTED }}>第{a.nights[0]}〜{a.nights[1]}夜</span>
                                </div>
                                <p style={{ fontSize: '13px', lineHeight: 1.9, color: INK, margin: '10px 0 0' }}>{a.situation}</p>
                                <div style={{ fontSize: '12px', color: RED, fontWeight: 700, marginTop: '8px' }}>賭かっているもの — {a.stake}</div>

                                {/* 転換点 */}
                                <Link href={`/english/tonight/league?night=${a.turn.night}`} style={{ textDecoration: 'none' }}>
                                    <div style={{ backgroundColor: '#FBF6E7', border: '1px solid #E8D9A8', borderRadius: '9px', padding: '11px 14px', marginTop: '11px' }}>
                                        <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '2px', color: GOLD }}>転換点 — 第{a.turn.night}夜</div>
                                        <div style={{ fontSize: '12.5px', color: INK, marginTop: '4px', lineHeight: 1.7 }}>{a.turn.what}</div>
                                        {a.turn.quote && (
                                            <div style={{ fontFamily: SERIF, fontSize: '14px', fontStyle: 'italic', fontWeight: 700, color: RED, marginTop: '6px', lineHeight: 1.6 }}>
                                                &ldquo;{a.turn.quote}&rdquo;
                                            </div>
                                        )}
                                    </div>
                                </Link>
                                <div style={{ fontSize: '12.5px', color: MUTED, marginTop: '10px', lineHeight: 1.8, fontStyle: 'italic' }}>{a.hook}</div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* ===== 縦糸(路線図) ===== */}
                <Card>
                    <SectionH>縦糸 — 夜をまたぐ{threads.length}本</SectionH>
                    <p style={{ fontSize: '12.5px', color: MUTED, margin: '4px 0 12px' }}>
                        同じ問いが何十夜も離れて再燃する。線をタップすると、その糸だけが辿れる。白い丸が転換点。
                    </p>
                    <ThreadMap threads={threads} onPick={(id) => setActive(active === id ? null : id)} active={active} />

                    {cur && (
                        <div style={{ marginTop: '14px', border: `1px solid ${LINE}`, borderTop: `4px solid ${cur.color}`, borderRadius: '11px', padding: '15px 17px', backgroundColor: PAPER }}>
                            <div style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 900, color: INK }}>{cur.title}</div>
                            <div style={{ fontSize: '12px', color: MUTED, marginTop: '3px', lineHeight: 1.7 }}>{cur.question}</div>
                            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                                {cur.beats.map((b, bi) => (
                                    <Link key={`${b.night}-${bi}`} href={`/english/tonight/league?night=${b.night}`} style={{ textDecoration: 'none' }}>
                                        <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start' }}>
                                            <span style={{
                                                minWidth: '44px', textAlign: 'center', fontSize: '11px', fontWeight: 900,
                                                color: b.turn ? '#fff' : cur.color, backgroundColor: b.turn ? cur.color : '#fff',
                                                border: `1.5px solid ${cur.color}`, borderRadius: '6px', padding: '3px 0', marginTop: '1px',
                                            }}>
                                                {b.night}夜
                                            </span>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: '13px', fontWeight: b.turn ? 800 : 600, color: INK, lineHeight: 1.6 }}>{b.label}</div>
                                                {b.quote && (
                                                    <div style={{ fontFamily: SERIF, fontSize: '12.5px', fontStyle: 'italic', color: MUTED, marginTop: '2px', lineHeight: 1.6 }}>
                                                        &ldquo;{b.quote}&rdquo;
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div style={{ marginTop: '12px', borderTop: `1px solid ${LINE}`, paddingTop: '10px', fontSize: '12.5px', color: INK, lineHeight: 1.85, fontWeight: 600 }}>
                                {cur.payoff}
                            </div>
                        </div>
                    )}
                    {!cur && (
                        <div style={{ fontSize: '11.5px', color: MUTED, marginTop: '10px' }}>
                            ※ 線をタップすると、その糸の全ビートが出る。
                        </div>
                    )}
                </Card>

                {/* ===== 導線 ===== */}
                <div style={{ marginTop: '20px', backgroundColor: INK, color: '#fff', borderRadius: '14px', padding: 'clamp(20px, 4vw, 30px)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: GOLD_HI }}>読者が持って帰るもの</div>
                    <p style={{ fontFamily: SERIF, fontSize: '15px', lineHeight: 1.9, margin: '10px 0 16px', color: 'rgba(255,255,255,0.92)' }}>
                        男は負ける。だが読者の手元には、64夜で{stats.total}個の表現が残っている。
                        この劇のいちばん奇妙なところは、主人公が負け続けるほど、観客が強くなることだ。
                    </p>
                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                        <Link href="/english/tonight/curriculum" style={{ backgroundColor: GOLD, color: INK, fontWeight: 900, fontSize: '13px', padding: '10px 20px', borderRadius: '9px', textDecoration: 'none' }}>教材({stats.total}表現)へ</Link>
                        <Link href="/english/tonight/league" style={{ color: GOLD_HI, fontWeight: 800, fontSize: '13px', padding: '10px 0', textDecoration: 'none' }}>今夜の相場 →</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
