'use client';

/** RAW PASS 30日の一覧。端末に残った記録をそのまま並べる */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { RAWPASS_DAYS, PHASES, rampOf } from '@/data/english/rawpass';
import { noiseDial } from '@/lib/english/rawpass/ear-engine';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const CREAM = '#FFFDF8';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

export default function RawPassProgramPage() {
    const [recs, setRecs] = useState<Record<number, { avg: number; replayAvg?: number }>>({});

    useEffect(() => {
        const r: Record<number, { avg: number; replayAvg?: number }> = {};
        for (let d = 1; d <= 30; d++) {
            try {
                const raw = window.localStorage.getItem(`rawpass:day:${d}`);
                if (raw) r[d] = JSON.parse(raw);
            } catch { /* noop */ }
        }
        setRecs(r);
    }, []);

    const doneCount = Object.keys(recs).length;
    const nextDay = RAWPASS_DAYS.find(d => !recs[d.day])?.day ?? 30;

    return (
        <div style={{
            background: CREAM, minHeight: '100vh', color: INK,
            fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif',
        }}>
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '34px 20px 90px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 900, color: GOLD, letterSpacing: '1px' }}>RAW</span>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 900, letterSpacing: '1px' }}>PASS</span>
                    <Link href="/english/rawpass" style={{ marginLeft: 'auto', fontSize: '12.5px', color: SUB, fontWeight: 800, textDecoration: 'none' }}>商品ページ</Link>
                </div>

                <h1 style={{ fontFamily: SERIF, fontSize: '28px', fontWeight: 900, lineHeight: 1.45, margin: '22px 0 10px' }}>
                    試験音声から、生音まで。<br />10段を30日で登る。
                </h1>
                <p style={{ fontSize: '13.5px', color: SUB, lineHeight: 2, margin: '0 0 22px' }}>
                    記録はこの端末にだけ保存されます。{doneCount > 0 ? `いま ${doneCount} / 30 日。` : 'まだ1日目です。'}
                </p>

                <Link href={`/english/rawpass/day/${nextDay}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                        background: INK, color: '#fff', borderRadius: '14px', padding: '18px 22px',
                        display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '30px',
                    }}>
                        <div>
                            <div style={{ fontSize: '11px', letterSpacing: '2px', color: GOLD, fontWeight: 900 }}>NEXT</div>
                            <div style={{ fontSize: '17px', fontWeight: 900, marginTop: '3px' }}>Day {nextDay} を始める</div>
                        </div>
                        <div style={{ marginLeft: 'auto', fontSize: '20px', color: GOLD, fontWeight: 900 }}>→</div>
                    </div>
                </Link>

                {PHASES.map(p => (
                    <div key={p.n} style={{ marginBottom: '34px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '2.5px', color: p.n === 3 ? GREEN : DEEPGOLD }}>
                                PHASE {p.n}
                            </span>
                            <span style={{ fontSize: '11.5px', color: SUB, fontWeight: 700 }}>{p.days}</span>
                        </div>
                        <div style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 900, marginBottom: '6px' }}>{p.name}</div>
                        <p style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.95, margin: '0 0 14px' }}>{p.body}</p>

                        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', overflow: 'hidden' }}>
                            {RAWPASS_DAYS.filter(d => d.phase === p.n).map(d => {
                                const r = recs[d.day];
                                const ramp = rampOf(d.lv);
                                return (
                                    <Link key={d.day} href={`/english/rawpass/day/${d.day}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '13px',
                                            padding: '13px 16px', borderBottom: `1px solid ${LINE}`,
                                            background: r ? '#FEFCF2' : '#fff',
                                        }}>
                                            <div style={{
                                                flexShrink: 0, width: '38px', height: '38px', borderRadius: '10px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '13px', fontWeight: 900,
                                                background: r ? GOLD : '#F5F5F4', color: r ? '#fff' : SUB,
                                            }}>{d.day}</div>
                                            <div style={{ minWidth: 0, flex: 1 }}>
                                                <div style={{ fontSize: '13.5px', fontWeight: 800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {d.title}
                                                </div>
                                                <div style={{ fontSize: '11.5px', color: SUB, marginTop: '2px' }}>
                                                    Lv.{d.lv} ｜ {ramp.rate.toFixed(2)}倍 ｜ 雑音 {noiseDial(ramp.noise)}/5
                                                    {d.clip && ' ｜ 生音'}
                                                    {d.replay && ' ｜ 初日と比較'}
                                                </div>
                                            </div>
                                            {r ? (
                                                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                                                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 900, color: DEEPGOLD }}>{r.avg}%</div>
                                                    {r.replayAvg !== undefined && (
                                                        <div style={{ fontSize: '10.5px', color: GREEN, fontWeight: 800 }}>初日比較 {r.replayAvg}%</div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div style={{ flexShrink: 0, fontSize: '18px', color: '#D6D3D1' }}>›</div>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '18px 20px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '2px', marginBottom: '10px' }}>まだ測っていない人へ</div>
                    <p style={{ fontSize: '13px', color: SUB, lineHeight: 1.95, margin: '0 0 14px' }}>
                        自分が10段のどこにいるかを先に測ると、Day 1 の意味が変わります。5分・無料。
                    </p>
                    <Link href="/english/rawpass/ear" style={{ textDecoration: 'none' }}>
                        <div style={{ background: GREEN, color: '#fff', padding: '13px', borderRadius: '10px', fontSize: '14px', fontWeight: 900, textAlign: 'center' }}>
                            耳の実測へ
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
