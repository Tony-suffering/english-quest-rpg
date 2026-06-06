'use client';
// v6 3秒で返せ — reflex trainer
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { REFLEX_ITEMS, type ReflexItem } from '@/data/english/reflex-items';

const A = '#EA580C', INK = '#1C1917', SUB = '#78716C', LINE = '#E7E5E4', GOOD = '#10B981', WARN = '#D97706';
function speak(t: string) { if (typeof window === 'undefined' || !window.speechSynthesis) return; window.speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; u.rate = 1.0; window.speechSynthesis.speak(u); }

export default function ReflexPage() {
    const [i, setI] = useState(0);
    const [count, setCount] = useState<number | null>(null);
    const [show, setShow] = useState(false);
    const timer = useRef<any>(null);
    const item: ReflexItem = REFLEX_ITEMS[i % REFLEX_ITEMS.length];

    const start = () => {
        setShow(false); setCount(3);
        speak(item.prompt_en);
        clearInterval(timer.current);
        timer.current = setInterval(() => {
            setCount(c => { if (c === null) return c; if (c <= 1) { clearInterval(timer.current); setShow(true); return 0; } return c - 1; });
        }, 1000);
    };
    useEffect(() => () => clearInterval(timer.current), []);
    const next = () => { clearInterval(timer.current); setI(x => (x + 1) % REFLEX_ITEMS.length); setCount(null); setShow(false); };

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', padding: '24px 16px 80px' }}>
            <div style={{ maxWidth: 620, margin: '0 auto' }}>
                <div style={{ background: `linear-gradient(135deg, ${A}, #7C2D12)`, borderRadius: 20, padding: '24px 22px', color: '#fff', marginBottom: 18 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', opacity: .9 }}>3-SECOND REFLEX</div>
                    <h1 style={{ fontSize: 26, fontWeight: 900, margin: '6px 0 8px' }}>3秒で返せ</h1>
                    <p style={{ fontSize: 13.5, lineHeight: 1.7, margin: 0, opacity: .95 }}>状況と相手の一言が出る。3秒以内に、考えずに口から出せ。会話は反射。詰まる前に何か言うのが正解。</p>
                    <div style={{ fontSize: 12, marginTop: 10, opacity: .85, fontWeight: 700 }}>{REFLEX_ITEMS.length} 問<Link href="/english/home" style={{ color: '#fff', marginLeft: 12, textDecoration: 'underline', opacity: .8 }}>ラボ一覧 →</Link></div>
                </div>

                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 18, padding: 22, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: SUB, fontWeight: 700 }}>{item.situation_ja}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: INK, margin: '14px 0', lineHeight: 1.5 }}>&ldquo;{item.prompt_en}&rdquo;</div>
                    {count === null && !show && <button onClick={start} style={{ ...btn(A), width: '100%' }}>スタート（3秒）</button>}
                    {count !== null && count > 0 && <div style={{ fontSize: 64, fontWeight: 900, color: A }}>{count}</div>}
                    {show && (
                        <div style={{ textAlign: 'left', marginTop: 10 }}>
                            <div style={{ fontSize: 12, fontWeight: 800, color: SUB, marginBottom: 8 }}>言えたか？正解の返し:</div>
                            {item.replies.map((r, k) => (
                                <div key={k} style={{ background: '#FAFAF9', border: `1px solid ${LINE}`, borderLeft: `4px solid ${r.tag === 'good' ? GOOD : WARN}`, borderRadius: 12, padding: '12px 14px', marginBottom: 8 }}>
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                        <div style={{ flex: 1, fontSize: 16, fontWeight: 700, color: INK }}>&ldquo;{r.en}&rdquo;</div>
                                        <button onClick={() => speak(r.en)} style={play(A)}>▶</button>
                                    </div>
                                    <div style={{ fontSize: 12.5, color: SUB, marginTop: 5, lineHeight: 1.7 }}><span style={{ fontWeight: 800, color: r.tag === 'good' ? GOOD : WARN, marginRight: 6 }}>{r.tag === 'good' ? '自然' : '惜しい'}</span>{r.note}</div>
                                </div>
                            ))}
                            <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                                <button onClick={start} style={{ ...btn('#fff'), color: A, border: `1px solid ${A}55`, flex: 1 }}>もう一回</button>
                                <button onClick={next} style={{ ...btn(A), flex: 1 }}>次へ</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
const btn = (bg: string): React.CSSProperties => ({ padding: '12px 16px', borderRadius: 12, border: 'none', background: bg, color: bg === '#fff' ? '#000' : '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer' });
const play = (c: string): React.CSSProperties => ({ flexShrink: 0, width: 30, height: 30, borderRadius: 8, border: `1px solid ${c}55`, background: '#fff', color: c, cursor: 'pointer', fontWeight: 800 });
