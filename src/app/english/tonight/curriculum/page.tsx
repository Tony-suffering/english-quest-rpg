'use client';

// とにお教材 — 読者側の積み上げページ。
// 「芸指数(俺の失敗相場)は乱高下するが、あなたの語彙資産は絶対に減らない」
// という対比が主題。全64夜の持ち帰り表現(191)と対比ドリル(192)を、
// 章=単元として並べ、そのままトレーニングに登録できる。
// ライト基調・絵文字なし。

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
    getLexicon, getGrowthCurve, getUnits, getDrills, getCurriculumStats,
    KIND_LABEL, LEVEL_LABEL, type LexKind, type LexLevel, type GrowthPoint,
} from '@/data/english/tonio-curriculum';
import { getMarket } from '@/data/english/tonio-league';

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

const KIND_COLOR: Record<LexKind, string> = { idiom: GOLD, phrasal: '#3E7AB8', word: GREEN, phrase: RED };
const LEVEL_COLOR: Record<LexLevel, string> = { basic: GREEN, mid: '#3E7AB8', hard: '#8A6A3F' };

// ============ 2本のカーブ: 芸指数(乱高下) vs 語彙資産(単調増加) ============
function TwinCurve({ growth }: { growth: GrowthPoint[] }) {
    const market = useMemo(() => getMarket(), []);
    const W = 660, H = 200, padT = 14, padB = 24;
    const n = growth.length;
    const x = (i: number) => (i * W) / Math.max(1, n - 1);

    const gMax = growth[n - 1]?.total || 1;
    const yG = (v: number) => padT + (1 - v / gMax) * (H - padT - padB);

    const shows = market.map((m) => m.show);
    const sMin = Math.min(...shows), sMax = Math.max(...shows);
    const yS = (v: number) => padT + (1 - (v - sMin) / Math.max(1, sMax - sMin)) * (H - padT - padB);

    const gPath = growth.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${yG(p.total)}`).join(' ');
    const gArea = `${gPath} L${W},${H - padB} L0,${H - padB} Z`;
    const sPath = market.map((m, i) => `${i === 0 ? 'M' : 'L'}${x(Math.min(i, n - 1))},${yS(m.show)}`).join(' ');

    return (
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
            <defs>
                <linearGradient id="curFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GREEN} stopOpacity="0.30" />
                    <stop offset="100%" stopColor={GREEN} stopOpacity="0.02" />
                </linearGradient>
            </defs>
            {/* 芸指数(彼) — 乱高下 */}
            <path d={sPath} fill="none" stroke={GOLD} strokeWidth={1.6} strokeDasharray="4 3" opacity={0.75} strokeLinejoin="round" />
            {/* 語彙資産(あなた) — 単調増加 */}
            <path d={gArea} fill="url(#curFill)" />
            <path d={gPath} fill="none" stroke={GREEN} strokeWidth={2.8} strokeLinejoin="round" />
            <circle cx={x(n - 1)} cy={yG(gMax)} r={4.5} fill={GREEN} />
            <text x={x(n - 1) - 6} y={yG(gMax) - 9} fontSize="11" fontWeight="800" fill={GREEN} textAnchor="end" fontFamily={SANS}>{gMax}表現</text>
            {/* 夜ラベル */}
            {growth.map((p, i) => (i % 8 === 0 || i === n - 1) ? (
                <text key={p.night} x={x(i)} y={H - 7} fontSize="9" fill={MUTED} textAnchor="middle" fontFamily={SANS}>{p.night}</text>
            ) : null)}
        </svg>
    );
}

function SectionH({ children }: { children: React.ReactNode }) {
    return <h2 style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 900, color: INK, margin: '0 0 4px' }}>{children}</h2>;
}
function Card({ children }: { children: React.ReactNode }) {
    return <div style={{ backgroundColor: CARD, border: `1px solid ${LINE}`, borderRadius: '14px', padding: 'clamp(18px, 4vw, 28px)', marginTop: '16px' }}>{children}</div>;
}

// ============ 表現1件 + トレーニング登録 ============
function LexRow({ it }: { it: { en: string; ja: string; note: string; night: number; kind: LexKind; level: LexLevel } }) {
    const [state, setState] = useState<'idle' | 'saving' | 'done' | 'dup'>('idle');
    const add = async () => {
        if (state === 'saving' || state === 'done') return;
        setState('saving');
        try {
            const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' });
            const r = await fetch('/api/phrases', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english: it.en, japanese: it.ja, date: today }),
            });
            const j = await r.json();
            const p = j.phrase || j;
            setState(p?.duplicate ? 'dup' : 'done');
        } catch { setState('idle'); }
    };
    return (
        <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', padding: '11px 0', borderTop: `1px solid ${LINE}` }}>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '3px' }}>
                <span style={{ fontSize: '9.5px', fontWeight: 800, color: '#fff', backgroundColor: LEVEL_COLOR[it.level], borderRadius: '4px', padding: '2px 6px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {LEVEL_LABEL[it.level]}
                </span>
                <span style={{ fontSize: '9px', fontWeight: 700, color: KIND_COLOR[it.kind], border: `1px solid ${KIND_COLOR[it.kind]}`, borderRadius: '4px', padding: '1px 5px', whiteSpace: 'nowrap', textAlign: 'center' }}>
                    {KIND_LABEL[it.kind]}
                </span>
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: SERIF, fontSize: '15.5px', fontWeight: 700, color: INK, lineHeight: 1.5 }}>{it.en}</div>
                <div style={{ fontSize: '12.5px', color: MUTED, marginTop: '2px' }}>{it.ja}</div>
                {it.note && <div style={{ fontSize: '11.5px', color: '#5a5a5a', marginTop: '5px', lineHeight: 1.7 }}>{it.note}</div>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px', flexShrink: 0 }}>
                <Link href={`/english/tonight/league?night=${it.night}`} style={{ fontSize: '10.5px', color: MUTED, textDecoration: 'none', whiteSpace: 'nowrap' }}>第{it.night}夜</Link>
                <button onClick={add} disabled={state === 'saving'}
                    style={{
                        cursor: state === 'done' || state === 'dup' ? 'default' : 'pointer', whiteSpace: 'nowrap',
                        backgroundColor: state === 'done' ? GREEN : state === 'dup' ? '#B7AE9E' : '#fff',
                        color: state === 'done' || state === 'dup' ? '#fff' : INK,
                        border: `1px solid ${state === 'done' ? GREEN : LINE}`, borderRadius: '7px',
                        padding: '4px 10px', fontSize: '10.5px', fontWeight: 800,
                    }}>
                    {state === 'saving' ? '登録中' : state === 'done' ? '登録した' : state === 'dup' ? '既出' : '+ 覚える'}
                </button>
            </div>
        </div>
    );
}

export default function CurriculumPage() {
    const lex = useMemo(() => getLexicon(), []);
    const growth = useMemo(() => getGrowthCurve(), []);
    const units = useMemo(() => getUnits(), []);
    const stats = useMemo(() => getCurriculumStats(), []);
    const drills = useMemo(() => getDrills().slice(0, 12), []);

    const [unit, setUnit] = useState<number>(units.length); // 既定は最新章
    const [kind, setKind] = useState<LexKind | 'all'>('all');
    const [lv, setLv] = useState<LexLevel | 'all'>('all');
    const [q, setQ] = useState('');

    const shown = useMemo(() => {
        const base = lex.filter((x) => x.arcNo === unit);
        const l = lv === 'all' ? base : base.filter((x) => x.level === lv);
        const k = kind === 'all' ? l : l.filter((x) => x.kind === kind);
        const s = q.trim().toLowerCase();
        return s ? k.filter((x) => x.en.toLowerCase().includes(s) || x.ja.includes(q.trim())) : k;
    }, [lex, unit, kind, lv, q]);

    const cur = units.find((u) => u.arcNo === unit);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: PAPER, fontFamily: SANS, color: INK, padding: '0 0 90px' }}>
            {/* ツールバー */}
            <div style={{ backgroundColor: INK, color: '#fff', padding: '10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Link href="/english/tonight" style={{ color: GOLD_HI, textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>← 番組へ</Link>
                    <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '2px' }}>とにお教材</span>
                </div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>全{stats.total}表現 / {stats.nights}夜</span>
            </div>

            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 14px' }}>
                {/* ===== 主題 ===== */}
                <div style={{ backgroundColor: INK, color: '#fff', borderRadius: '0 0 16px 16px', padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 38px)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: GOLD_HI }}>読者の積み上げ</div>
                    <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(26px, 6.5vw, 42px)', fontWeight: 900, lineHeight: 1.25, margin: '10px 0 0' }}>
                        彼は上手くならない。<br />あなたは、上手くなる。
                    </h1>
                    <p style={{ fontSize: '13.5px', lineHeight: 1.95, color: 'rgba(255,255,255,0.86)', margin: '14px 0 0' }}>
                        毎晩の失敗から、正解だけが抜き出されて積み上がる。芸指数は乱高下するが、
                        <span style={{ color: '#7BE0AF', fontWeight: 700 }}>ここに積まれた表現は一度も減っていない。</span>
                        64夜で{stats.total}表現。読み続けた人だけが、勝手に教材を1冊持っていることになる。
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '18px' }}>
                        {[
                            ['表現', `${stats.total}`],
                            ['対比ドリル', `${stats.drills}`],
                            ['1夜あたり', `${stats.perNight}`],
                            ['単元', `${units.length}章`],
                        ].map(([k, v], i) => (
                            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(231,193,75,0.3)', borderRadius: '9px', padding: '9px 15px' }}>
                                <div style={{ fontSize: '10px', letterSpacing: '1px', color: 'rgba(255,255,255,0.55)' }}>{k}</div>
                                <div style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 900, color: GOLD_HI }}>{v}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===== 2本のカーブ ===== */}
                <Card>
                    <SectionH>2本のカーブ</SectionH>
                    <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', margin: '8px 0 6px', fontSize: '11.5px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                            <span style={{ width: '18px', height: '3px', backgroundColor: GREEN, borderRadius: '2px' }} />あなたの語彙資産(減らない)
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: MUTED }}>
                            <span style={{ width: '18px', borderTop: `2px dashed ${GOLD}` }} />彼の芸指数(乱高下)
                        </span>
                    </div>
                    <TwinCurve growth={growth} />
                    <p style={{ fontSize: '12px', color: MUTED, marginTop: '8px', lineHeight: 1.75 }}>
                        金の点線は彼の壊れっぷり。上がったり落ちたりする。緑は読者が持ち帰った表現の総数 — 64夜で一度も下がっていない。
                        彼の英語が直らないことと、あなたの英語が伸びることは、まったく矛盾しない。
                    </p>
                </Card>

                {/* ===== 単元(章)選択 ===== */}
                <Card>
                    <SectionH>単元 — 章ごとの表現</SectionH>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', margin: '12px 0' }}>
                        {units.map((u) => (
                            <button key={u.arcNo} onClick={() => setUnit(u.arcNo)}
                                style={{
                                    cursor: 'pointer', borderRadius: '8px', padding: '7px 12px', fontSize: '12px', fontWeight: 800,
                                    backgroundColor: unit === u.arcNo ? INK : '#fff', color: unit === u.arcNo ? '#fff' : INK,
                                    border: `1px solid ${unit === u.arcNo ? INK : LINE}`,
                                }}>
                                {u.arcNo}. {u.title} <span style={{ color: unit === u.arcNo ? GOLD_HI : MUTED, fontWeight: 700 }}>{u.items.length}</span>
                            </button>
                        ))}
                    </div>

                    {/* 章のゴール文 */}
                    {cur?.goal && (
                        <div style={{ backgroundColor: '#FBF6E7', border: '1px solid #E8D9A8', borderRadius: '9px', padding: '13px 16px', marginBottom: '14px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '2px', color: GOLD }}>この章のゴール(第{cur.goal.night}夜の到達点)</div>
                            <div style={{ fontFamily: SERIF, fontSize: '14.5px', fontWeight: 700, marginTop: '5px', lineHeight: 1.6 }}>{cur.goal.en}</div>
                            <div style={{ fontSize: '12px', color: MUTED, marginTop: '4px', lineHeight: 1.7 }}>{cur.goal.ja}</div>
                        </div>
                    )}

                    {/* 難易度で絞る(初心者が「今日使える分」を取り出すため) */}
                    <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '10.5px', fontWeight: 800, color: MUTED, letterSpacing: '1px' }}>難易度</span>
                        {(['all', 'basic', 'mid', 'hard'] as const).map((k) => (
                            <button key={k} onClick={() => setLv(k)}
                                style={{
                                    cursor: 'pointer', borderRadius: '999px', padding: '4px 12px', fontSize: '11.5px', fontWeight: 800,
                                    backgroundColor: lv === k ? (k === 'all' ? INK : LEVEL_COLOR[k]) : '#fff',
                                    color: lv === k ? '#fff' : MUTED, border: `1px solid ${lv === k ? 'transparent' : LINE}`,
                                }}>
                                {k === 'all' ? 'すべて' : LEVEL_LABEL[k]}
                            </button>
                        ))}
                        <span style={{ fontSize: '10.5px', color: MUTED }}>
                            (初級{stats.byLevel.basic} / 中級{stats.byLevel.mid} / 上級{stats.byLevel.hard})
                        </span>
                    </div>

                    {/* 絞り込み */}
                    <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '4px' }}>
                        {(['all', 'idiom', 'phrasal', 'word', 'phrase'] as const).map((k) => (
                            <button key={k} onClick={() => setKind(k)}
                                style={{
                                    cursor: 'pointer', borderRadius: '999px', padding: '4px 11px', fontSize: '11px', fontWeight: 700,
                                    backgroundColor: kind === k ? (k === 'all' ? INK : KIND_COLOR[k]) : '#fff',
                                    color: kind === k ? '#fff' : MUTED, border: `1px solid ${kind === k ? 'transparent' : LINE}`,
                                }}>
                                {k === 'all' ? 'すべて' : KIND_LABEL[k]}
                            </button>
                        ))}
                        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="検索"
                            style={{ flex: 1, minWidth: '110px', fontSize: '12px', padding: '6px 10px', borderRadius: '8px', border: `1px solid ${LINE}`, backgroundColor: '#fff', color: INK }} />
                    </div>

                    <div style={{ marginTop: '6px' }}>
                        {shown.length === 0 && <div style={{ fontSize: '12.5px', color: MUTED, padding: '18px 0' }}>該当なし。</div>}
                        {shown.map((it, i) => <LexRow key={`${it.en}-${i}`} it={it} />)}
                    </div>
                    <div style={{ fontSize: '11px', color: MUTED, marginTop: '10px' }}>
                        ※「+ 覚える」でトレーニングに登録(同じ英文は重複しない)。
                    </div>
                </Card>

                {/* ===== 対比ドリル ===== */}
                <Card>
                    <SectionH>対比ドリル — 言えなかった形 vs 正解</SectionH>
                    <p style={{ fontSize: '12.5px', color: MUTED, margin: '4px 0 14px' }}>
                        教材として一番効くのはここ。正解だけ読んでも入らないが、崩れた実物と並べると忘れない。直近{drills.length}件。
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {drills.map((d, i) => (
                            <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: '10px', overflow: 'hidden' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', padding: '7px 13px', backgroundColor: '#FAF7F1', borderBottom: `1px solid ${LINE}` }}>
                                    <span style={{ fontSize: '11px', color: MUTED }}>{d.scene}</span>
                                    <Link href={`/english/tonight/league?night=${d.night}`} style={{ fontSize: '10.5px', fontWeight: 700, color: GOLD, textDecoration: 'none', whiteSpace: 'nowrap' }}>第{d.night}夜</Link>
                                </div>
                                <div style={{ padding: '11px 13px', backgroundColor: '#FBF1F0' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1.5px', color: RED }}>言えなかった形</span>
                                    <div style={{ fontFamily: SERIF, fontSize: '14px', fontStyle: 'italic', color: INK, marginTop: '4px', lineHeight: 1.6 }}>{d.broken}</div>
                                </div>
                                <div style={{ padding: '11px 13px', backgroundColor: '#F0F7F1' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1.5px', color: '#166534' }}>正解</span>
                                    <div style={{ fontFamily: SERIF, fontSize: '14px', fontWeight: 700, color: INK, marginTop: '4px', lineHeight: 1.6 }}>{d.correct}</div>
                                    {d.point && <div style={{ fontSize: '11.5px', color: '#166534', marginTop: '6px', lineHeight: 1.7 }}>{d.point}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* ===== 導線 ===== */}
                <div style={{ marginTop: '20px', backgroundColor: INK, color: '#fff', borderRadius: '14px', padding: 'clamp(20px, 4vw, 30px)', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>登録した表現は、そのまま復習に回る:</span>
                    <Link href="/english/training" style={{ backgroundColor: GOLD, color: INK, fontWeight: 900, fontSize: '13px', padding: '10px 20px', borderRadius: '9px', textDecoration: 'none' }}>トレーニングへ</Link>
                    <Link href="/english/tonight/story-lab" style={{ color: GOLD_HI, fontWeight: 800, fontSize: '13px', textDecoration: 'none' }}>物語(成長ストーリー) →</Link>
                </div>
            </div>
        </div>
    );
}
