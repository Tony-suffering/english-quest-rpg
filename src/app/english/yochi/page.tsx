'use client';

// 文法災害予知 — とにお英語調査委員会「長期評価」
//
// この番組の器は全部「終わった夜」を扱う(検死 / 番組 / スコア / 町)。
// ここだけが事前の器。次の25分で何が壊れるかを、実データから計算して先に出す。
// 数字は yochi.ts が kenshi-lessons.ts から算出する。手書きの確率はゼロ。
//
// 見た目は気象・地震の発表資料。白と黒と赤だけ。装飾を足さないほうが、
// 「これは観測結果である」という顔になる。

import { Fragment, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
    YOCHI_META, assessFaults, buildForecast, PREDICTIONS, PRECURSORS,
    predictionScore, type FaultAssessment,
} from '@/data/english/yochi';

const INK = '#111111';
const MUTED = '#6b7280';
const LINE = '#d6d3d1';
const PAPER = '#ffffff';
const SHEET = '#fafaf9';
const RED = '#B91C1C';
const AMBER = '#B45309';
const GREEN = '#15803D';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, 'Courier New', monospace";

const LEVEL_COLOR: Record<FaultAssessment['level'], string> = {
    AAA: RED, AA: RED, A: AMBER, B: '#78716c', C: '#a8a29e',
};
const LEVEL_LABEL: Record<FaultAssessment['level'], string> = {
    AAA: '最高度', AA: '高い', A: 'やや高い', B: '低い', C: '静穏',
};

// **強調** だけを太字にする。データ側の文体(番組と同じ)をそのまま出すため。
function Rich({ text }: { text: string }): ReactNode {
    // 正規表現を使わない。** で割って、奇数番目だけ太字にする。
    return text.split('**').map((part, i) =>
        i % 2 === 1
            ? <strong key={i} style={{ fontWeight: 700 }}>{part}</strong>
            : <Fragment key={i}>{part}</Fragment>
    );
}

function Bar({ p, color }: { p: number; color: string }) {
    return (
        <div style={{ height: 8, background: '#f1f1ef', borderRadius: 2, overflow: 'hidden', minWidth: 90 }}>
            <div style={{ width: `${Math.round(p * 100)}%`, height: '100%', background: color }} />
        </div>
    );
}

const RESULT_STYLE: Record<string, { label: string; color: string }> = {
    EXECUTED: { label: '執行', color: GREEN },
    FAILED: { label: '不履行', color: RED },
    AVOIDED: { label: '回避', color: AMBER },
    NO_CHANCE: { label: '機会なし', color: '#78716c' },
    PENDING: { label: '判定待ち', color: MUTED },
};

export default function YochiPage() {
    const [windowSize, setWindowSize] = useState(12);
    const faults = useMemo(() => assessFaults(windowSize), [windowSize]);
    const forecast = useMemo(() => buildForecast(windowSize), [windowSize]);
    const score = useMemo(() => predictionScore(), []);
    const [openId, setOpenId] = useState<string | null>(faults[0]?.fault.id ?? null);

    return (
        <div style={{ background: SHEET, minHeight: '100vh', color: INK, fontFamily: SERIF }}>
            <div style={{ maxWidth: 980, margin: '0 auto', padding: '32px 20px 80px' }}>

                {/* ヘッダ */}
                <header style={{ borderBottom: `3px double ${INK}`, paddingBottom: 16, marginBottom: 24 }}>
                    <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 2, color: MUTED }}>
                        {YOCHI_META.subtitle}
                    </div>
                    <h1 style={{ fontSize: 38, fontWeight: 700, letterSpacing: 4, margin: '6px 0 10px' }}>
                        {YOCHI_META.title}
                    </h1>
                    <p style={{ fontSize: 14, lineHeight: 1.9, color: '#3f3f46', margin: 0 }}>
                        {YOCHI_META.lead}
                    </p>
                </header>

                {/* 次の25分の予報 */}
                <section style={{ background: PAPER, border: `1px solid ${LINE}`, borderLeft: `6px solid ${RED}`, padding: '18px 20px', marginBottom: 28 }}>
                    <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 2, color: RED, marginBottom: 8 }}>
                        FORECAST — 次の25分
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.6, marginBottom: 8 }}>
                        {forecast.headline}
                    </div>
                    <p style={{ fontSize: 13.5, lineHeight: 1.9, color: '#3f3f46', margin: 0 }}>
                        {forecast.body}
                    </p>
                </section>

                {/* 長期評価テーブル */}
                <section style={{ marginBottom: 36 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                        <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: 2, margin: 0 }}>
                            長期評価 — 震源域別の発生確率
                        </h2>
                        <label style={{ fontSize: 12, color: MUTED, fontFamily: MONO }}>
                            評価期間{' '}
                            <select
                                value={windowSize}
                                onChange={(e) => setWindowSize(Number(e.target.value))}
                                style={{ fontFamily: MONO, fontSize: 12, padding: '2px 6px', border: `1px solid ${LINE}`, background: PAPER, color: INK }}
                            >
                                {[6, 12, 20, 40].map((n) => <option key={n} value={n}>直近{n}夜</option>)}
                            </select>
                        </label>
                    </div>

                    <div style={{ overflowX: 'auto', border: `1px solid ${LINE}`, background: PAPER }}>
                        <table style={{ width: '100%', minWidth: 720, borderCollapse: 'collapse', fontSize: 13 }}>
                            <thead>
                                <tr style={{ background: '#f4f4f2', textAlign: 'left' }}>
                                    <th style={{ padding: '10px 12px', borderBottom: `1px solid ${LINE}`, whiteSpace: 'nowrap' }}>警戒度</th>
                                    <th style={{ padding: '10px 12px', borderBottom: `1px solid ${LINE}` }}>震源域 / 持病</th>
                                    <th style={{ padding: '10px 12px', borderBottom: `1px solid ${LINE}`, whiteSpace: 'nowrap' }}>発生確率</th>
                                    <th style={{ padding: '10px 12px', borderBottom: `1px solid ${LINE}`, whiteSpace: 'nowrap' }}>実測</th>
                                    <th style={{ padding: '10px 12px', borderBottom: `1px solid ${LINE}`, whiteSpace: 'nowrap' }}>最大規模</th>
                                    <th style={{ padding: '10px 12px', borderBottom: `1px solid ${LINE}`, whiteSpace: 'nowrap' }}>最終発生</th>
                                </tr>
                            </thead>
                            <tbody>
                                {faults.map((f) => {
                                    const open = openId === f.fault.id;
                                    return (
                                        <Fragment key={f.fault.id}>
                                            <tr
                                                onClick={() => setOpenId(open ? null : f.fault.id)}
                                                style={{ cursor: 'pointer', background: open ? '#fffdf7' : PAPER }}
                                            >
                                                <td style={{ padding: '10px 12px', borderBottom: `1px solid ${LINE}`, whiteSpace: 'nowrap' }}>
                                                    <span style={{
                                                        fontFamily: MONO, fontSize: 11, fontWeight: 700, letterSpacing: 1,
                                                        color: '#fff', background: LEVEL_COLOR[f.level], padding: '2px 7px', borderRadius: 2,
                                                    }}>
                                                        {f.level}
                                                    </span>
                                                    <span style={{ fontSize: 11, color: MUTED, marginLeft: 6 }}>{LEVEL_LABEL[f.level]}</span>
                                                </td>
                                                <td style={{ padding: '10px 12px', borderBottom: `1px solid ${LINE}` }}>
                                                    <div style={{ fontWeight: 600 }}>{f.fault.name}</div>
                                                    <div style={{ fontSize: 11, color: MUTED, fontFamily: MONO }}>{f.fault.zone}</div>
                                                </td>
                                                <td style={{ padding: '10px 12px', borderBottom: `1px solid ${LINE}` }}>
                                                    <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: 15, color: LEVEL_COLOR[f.level] }}>
                                                        {Math.round(f.probability * 100)}%
                                                    </div>
                                                    <Bar p={f.probability} color={LEVEL_COLOR[f.level]} />
                                                </td>
                                                <td style={{ padding: '10px 12px', borderBottom: `1px solid ${LINE}`, fontFamily: MONO, fontSize: 12, color: MUTED, whiteSpace: 'nowrap' }}>
                                                    {f.hits} / {f.window} 夜
                                                </td>
                                                <td style={{ padding: '10px 12px', borderBottom: `1px solid ${LINE}`, fontFamily: MONO, fontSize: 12, whiteSpace: 'nowrap' }}>
                                                    {f.maxPerNight === 0 ? '—' : `1夜 ${f.maxPerNight} 件`}
                                                </td>
                                                <td style={{ padding: '10px 12px', borderBottom: `1px solid ${LINE}`, fontFamily: MONO, fontSize: 12, color: MUTED, whiteSpace: 'nowrap' }}>
                                                    {f.lastSeen ?? '—'}
                                                    {f.nightsSince !== null && (
                                                        <span style={{ marginLeft: 6, color: f.nightsSince === 0 ? RED : MUTED }}>
                                                            {f.nightsSince === 0 ? '(最新夜)' : `(${f.nightsSince}夜前)`}
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                            {open && (
                                                <tr>
                                                    <td colSpan={6} style={{ padding: '14px 16px 18px', borderBottom: `1px solid ${LINE}`, background: '#fffdf7' }}>
                                                        <p style={{ margin: '0 0 10px', fontSize: 13, lineHeight: 1.9, color: '#3f3f46' }}>
                                                            <Rich text={f.fault.note} />
                                                        </p>
                                                        <div style={{ fontSize: 12, color: MUTED, marginBottom: 4, fontFamily: MONO, letterSpacing: 1 }}>直近の観測</div>
                                                        <ul style={{ margin: '0 0 12px', paddingLeft: 18 }}>
                                                            {f.samples.length === 0 && <li style={{ color: MUTED, fontSize: 12 }}>この期間の記録なし</li>}
                                                            {f.samples.map((s, i) => (
                                                                <li key={i} style={{ fontSize: 12.5, lineHeight: 1.8, color: '#57534e' }}>{s}</li>
                                                            ))}
                                                        </ul>
                                                        <div style={{ borderTop: `1px dashed ${LINE}`, paddingTop: 10 }}>
                                                            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1, color: GREEN }}>備え</span>
                                                            <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>{f.fault.drill}</div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.8, marginTop: 10 }}>
                        {YOCHI_META.disclaimer}
                    </p>
                </section>

                {/* 予知の台帳 */}
                <section style={{ marginBottom: 36 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: 2, margin: '0 0 4px' }}>
                        予知の台帳 — 出した宿題と、翌夜の実測
                    </h2>
                    <p style={{ fontSize: 12.5, color: MUTED, margin: '0 0 14px', lineHeight: 1.8 }}>
                        判定済み {score.total} 件 / 執行 {score.executed} ・ 不履行 {score.failed} ・ 回避 {score.avoided}。
                        執行率 <strong style={{ color: score.rate === 0 ? RED : GREEN, fontFamily: MONO }}>{Math.round(score.rate * 100)}%</strong>。
                        {score.rate === 0 && ' 予知そのものは当たっている。当たり方が問題である。'}
                    </p>

                    <div style={{ display: 'grid', gap: 10 }}>
                        {PREDICTIONS.map((p, i) => {
                            const st = RESULT_STYLE[p.result];
                            return (
                                <div key={i} style={{ background: PAPER, border: `1px solid ${LINE}`, borderLeft: `5px solid ${st.color}`, padding: '12px 14px' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'baseline', marginBottom: 6 }}>
                                        <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: '#fff', background: st.color, padding: '2px 8px', borderRadius: 2 }}>
                                            {st.label}
                                        </span>
                                        <span style={{ fontFamily: MONO, fontSize: 11.5, color: MUTED }}>
                                            第{p.issuedNight}夜 {p.issuedDate} 発表
                                            {p.verifiedNight !== null && ` → 第${p.verifiedNight}夜 ${p.verifiedDate} 検証`}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.7, marginBottom: 6 }}>{p.homework}</div>
                                    <div style={{ fontFamily: MONO, fontSize: 12, color: '#57534e', lineHeight: 1.8, marginBottom: 4 }}>{p.evidence}</div>
                                    <div style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.8 }}><Rich text={p.note} /></div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 前兆現象 */}
                <section style={{ marginBottom: 36 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: 2, margin: '0 0 14px' }}>
                        前兆現象 — 事故の直前に必ず出る挙動
                    </h2>
                    <div style={{ display: 'grid', gap: 10 }}>
                        {PRECURSORS.map((pc, i) => (
                            <div key={i} style={{ background: PAPER, border: `1px solid ${LINE}`, padding: '14px 16px' }}>
                                <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginBottom: 6, flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>{pc.name}</span>
                                    <span style={{ fontFamily: MONO, fontSize: 11.5, color: RED }}>引き金 — {pc.trigger}</span>
                                </div>
                                <p style={{ fontSize: 13, lineHeight: 1.9, color: '#3f3f46', margin: '0 0 8px' }}><Rich text={pc.observed} /></p>
                                <div style={{ borderTop: `1px dashed ${LINE}`, paddingTop: 8 }}>
                                    <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: 1, color: GREEN }}>対策</span>
                                    <p style={{ fontSize: 13, lineHeight: 1.9, color: '#3f3f46', margin: '2px 0 0' }}><Rich text={pc.countermeasure} /></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 導線 */}
                <nav style={{ borderTop: `1px solid ${LINE}`, paddingTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13 }}>
                    <Link href="/english/tonight" style={{ color: INK, textDecoration: 'underline' }}>今夜も、通じない。(事後の器)</Link>
                    <Link href="/english/tsukkomi" style={{ color: INK, textDecoration: 'underline' }}>英語ツッコミ(復習カード)</Link>
                    <Link href="/english/training/dmm" style={{ color: INK, textDecoration: 'underline' }}>DMM英会話(検死つき会話)</Link>
                    <Link href="/english/town" style={{ color: INK, textDecoration: 'underline' }}>TONIO TOWN(誤りが物理になる町)</Link>
                </nav>
            </div>
        </div>
    );
}
