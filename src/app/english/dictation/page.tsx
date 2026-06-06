'use client';
// v4 聞き取りディクテーション
import { useState } from 'react';
import Link from 'next/link';
import { DICTATION_ITEMS, type DictationItem } from '@/data/english/dictation-items';

const A = '#7C3AED', INK = '#1C1917', SUB = '#78716C', LINE = '#E7E5E4';
function speak(t: string, rate = 1.0) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; u.rate = rate;
    window.speechSynthesis.speak(u);
}

export default function DictationPage() {
    const [i, setI] = useState(0);
    const [val, setVal] = useState('');
    const [show, setShow] = useState(false);
    const item: DictationItem = DICTATION_ITEMS[i % DICTATION_ITEMS.length];
    const next = () => { setI(x => (x + 1) % DICTATION_ITEMS.length); setVal(''); setShow(false); };

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', padding: '24px 16px 80px' }}>
            <div style={{ maxWidth: 620, margin: '0 auto' }}>
                <Hero title="聞き取りディクテーション" tag="LISTEN & TYPE / 本丸" color={A}
                    desc="速くて崩れた本物の音を聞いて、打つ。聞き間違えポイントを潰す。完璧に聞こえなくていい、食らいつけ。" count={`${DICTATION_ITEMS.length} 問`} />

                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 18, padding: 22 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: SUB }}>{item.domain} ・ {i % DICTATION_ITEMS.length + 1}/{DICTATION_ITEMS.length}</div>
                    <div style={{ display: 'flex', gap: 10, margin: '14px 0' }}>
                        <button onClick={() => speak(item.text_en, 1.15)} style={{ ...btn(A), flex: 1 }}>▶ 聞く（速め）</button>
                        <button onClick={() => speak(item.text_en, 0.8)} style={{ ...btn('#fff'), color: A, border: `1px solid ${A}55`, flex: 1 }}>▶ ゆっくり</button>
                    </div>
                    <textarea value={val} onChange={e => setVal(e.target.value)} placeholder="聞こえたまま打つ…"
                        style={{ width: '100%', minHeight: 70, padding: 12, borderRadius: 12, border: `1px solid ${LINE}`, fontSize: 15, resize: 'vertical', outline: 'none' }} />
                    {!show ? (
                        <button onClick={() => setShow(true)} style={{ ...btn(A), width: '100%', marginTop: 12 }}>答え合わせ</button>
                    ) : (
                        <div style={{ marginTop: 14 }}>
                            <div style={{ background: '#F5F3FF', borderLeft: `3px solid ${A}`, borderRadius: 12, padding: '14px 16px' }}>
                                <div style={{ fontSize: 18, fontWeight: 800, color: INK, lineHeight: 1.5 }}>{item.text_en}</div>
                                <div style={{ fontSize: 13, color: SUB, marginTop: 4 }}>{item.ja}</div>
                            </div>
                            <Note label="聞き間違え" color="#DC2626">{item.mishear}</Note>
                            <Note label="コツ" color={A}>{item.tip}</Note>
                            <button onClick={next} style={{ ...btn(A), width: '100%', marginTop: 14 }}>次へ</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
function Hero({ title, tag, desc, color, count }: any) {
    return (<div style={{ background: `linear-gradient(135deg, ${color}, #4C1D95)`, borderRadius: 20, padding: '24px 22px', color: '#fff', marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', opacity: .9 }}>{tag}</div>
        <h1 style={{ fontSize: 26, fontWeight: 900, margin: '6px 0 8px' }}>{title}</h1>
        <p style={{ fontSize: 13.5, lineHeight: 1.7, margin: 0, opacity: .95 }}>{desc}</p>
        <div style={{ fontSize: 12, marginTop: 10, opacity: .85, fontWeight: 700 }}>{count}<Link href="/english/home" style={{ color: '#fff', marginLeft: 12, textDecoration: 'underline', opacity: .8 }}>ラボ一覧 →</Link></div>
    </div>);
}
function Note({ label, color, children }: any) {
    return (<div style={{ fontSize: 13, color: '#44403C', marginTop: 10, padding: '10px 13px', background: '#FAFAF9', borderRadius: 10, borderLeft: `3px solid ${color}`, lineHeight: 1.7 }}>
        <span style={{ fontSize: 10, fontWeight: 800, color, marginRight: 6 }}>{label}</span>{children}</div>);
}
const btn = (bg: string): React.CSSProperties => ({ padding: '12px 16px', borderRadius: 12, border: 'none', background: bg, color: bg === '#fff' ? '#000' : '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer' });
