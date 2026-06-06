'use client';
// v5 同時通訳ジム
import { useState } from 'react';
import Link from 'next/link';
import { INTERPRET_ITEMS, type InterpretItem } from '@/data/english/interpret-items';

const A = '#0891B2', INK = '#1C1917', SUB = '#78716C', LINE = '#E7E5E4';
function speak(t: string) { if (typeof window === 'undefined' || !window.speechSynthesis) return; window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; u.rate = .96; window.speechSynthesis.speak(u); }

export default function InterpretPage() {
    const [i, setI] = useState(0);
    const [show, setShow] = useState(false);
    const item: InterpretItem = INTERPRET_ITEMS[i % INTERPRET_ITEMS.length];
    const next = () => { setI(x => (x + 1) % INTERPRET_ITEMS.length); setShow(false); };

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', padding: '24px 16px 80px' }}>
            <div style={{ maxWidth: 620, margin: '0 auto' }}>
                <div style={{ background: `linear-gradient(135deg, ${A}, #155E75)`, borderRadius: 20, padding: '24px 22px', color: '#fff', marginBottom: 18 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', opacity: .9 }}>JP→EN / 同時通訳</div>
                    <h1 style={{ fontSize: 26, fontWeight: 900, margin: '6px 0 8px' }}>同時通訳ジム</h1>
                    <p style={{ fontSize: 13.5, lineHeight: 1.7, margin: 0, opacity: .95 }}>日本語が出る。3秒で、声に出して英語にしろ。それから答えを見る。通訳案内士・英検二次の本当の筋トレ。</p>
                    <div style={{ fontSize: 12, marginTop: 10, opacity: .85, fontWeight: 700 }}>{INTERPRET_ITEMS.length} 問<Link href="/english/home" style={{ color: '#fff', marginLeft: 12, textDecoration: 'underline', opacity: .8 }}>ラボ一覧 →</Link></div>
                </div>

                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 18, padding: 22 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: SUB }}>{item.topic} ・ {i % INTERPRET_ITEMS.length + 1}/{INTERPRET_ITEMS.length}</div>
                    <div style={{ fontSize: 21, fontWeight: 800, color: INK, lineHeight: 1.5, margin: '14px 0' }}>{item.ja}</div>
                    {!show ? (
                        <>
                            <div style={{ fontSize: 13, color: SUB, marginBottom: 12 }}>…声に出して英語で言ってみろ。</div>
                            <button onClick={() => setShow(true)} style={{ ...btn(A), width: '100%' }}>答えを見る</button>
                        </>
                    ) : (
                        <div>
                            <div style={{ background: '#ECFEFF', borderLeft: `3px solid ${A}`, borderRadius: 12, padding: '14px 16px' }}>
                                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                    <div style={{ flex: 1, fontSize: 18, fontWeight: 700, color: INK, lineHeight: 1.5 }}>{item.en}</div>
                                    <button onClick={() => speak(item.en)} style={play(A)}>▶</button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                                {item.alts.map((a, k) => <button key={k} onClick={() => speak(a)} style={chip()}>{a}</button>)}
                            </div>
                            <div style={{ fontSize: 13, color: '#44403C', marginTop: 12, padding: '11px 14px', background: '#FAFAF9', borderRadius: 10, borderLeft: `3px solid ${A}`, lineHeight: 1.75 }}>
                                <span style={{ fontSize: 10, fontWeight: 800, color: A, marginRight: 6 }}>組み立て</span>{item.breakdown}</div>
                            <button onClick={next} style={{ ...btn(A), width: '100%', marginTop: 14 }}>次へ</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
const btn = (bg: string): React.CSSProperties => ({ padding: '12px 16px', borderRadius: 12, border: 'none', background: bg, color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer' });
const play = (c: string): React.CSSProperties => ({ flexShrink: 0, width: 30, height: 30, borderRadius: 8, border: `1px solid ${c}55`, background: '#fff', color: c, cursor: 'pointer', fontWeight: 800 });
const chip = (): React.CSSProperties => ({ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 999, padding: '5px 11px', fontSize: 12.5, color: '#44403C', cursor: 'pointer' });
