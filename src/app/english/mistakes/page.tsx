'use client';
// 俺の英語エラー帳 — 蓄積した文法ミスを見返す
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { MISTAKES, PATTERN_LABELS, type Mistake } from '@/data/english/my-mistakes';

const A = '#DC2626', INK = '#1C1917', SUB = '#78716C', LINE = '#E7E5E4', GREEN = '#10B981';

export default function MistakesPage() {
    const [filter, setFilter] = useState<string | null>(null);

    const counts = useMemo(() => {
        const m = new Map<string, number>();
        for (const x of MISTAKES) m.set(x.patternKey, (m.get(x.patternKey) || 0) + 1);
        return [...m.entries()].sort((a, b) => b[1] - a[1]);
    }, []);

    const list = useMemo(
        () => (filter ? MISTAKES.filter(x => x.patternKey === filter) : MISTAKES).slice().sort((a, b) => b.date.localeCompare(a.date)),
        [filter]
    );

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', padding: '24px 16px 90px' }}>
            <div style={{ maxWidth: 820, margin: '0 auto' }}>
                <div style={{ background: `linear-gradient(135deg, ${A}, #7F1D1D)`, borderRadius: 20, padding: '24px 22px', color: '#fff', marginBottom: 18 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', opacity: .9 }}>MY MISTAKES ・ 間違い帳</div>
                    <h1 style={{ fontSize: 26, fontWeight: 900, margin: '6px 0 8px' }}>俺の英語エラー帳</h1>
                    <p style={{ fontSize: 13.5, lineHeight: 1.7, margin: 0, opacity: .95 }}>
                        会話・英作文で出た文法ミスをここに溜めていく。自分の間違いを見返すのが、一番効く復習。同じパターンが何回出てるかも一目で分かる。
                    </p>
                    <div style={{ fontSize: 12, marginTop: 10, opacity: .85, fontWeight: 700 }}>{MISTAKES.length} 件 <Link href="/english/home" style={{ color: '#fff', marginLeft: 12, textDecoration: 'underline', opacity: .8 }}>ラボ一覧 →</Link></div>
                </div>

                {/* recurring pattern summary */}
                <div style={{ fontSize: 12, fontWeight: 800, color: SUB, marginBottom: 8 }}>繰り返してるパターン（多い順）</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                    <button onClick={() => setFilter(null)} style={chip(filter === null)}>すべて ({MISTAKES.length})</button>
                    {counts.map(([k, n]) => (
                        <button key={k} onClick={() => setFilter(k)} style={chip(filter === k, n >= 2)}>
                            {PATTERN_LABELS[k] || k} ({n}){n >= 2 ? ' ⚠' : ''}
                        </button>
                    ))}
                </div>

                {/* table */}
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, overflow: 'hidden' }}>
                    {list.map((x: Mistake, i) => (
                        <div key={x.id} style={{ padding: '14px 16px', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 10, fontWeight: 800, color: A, background: '#FEF2F2', borderRadius: 999, padding: '2px 9px' }}>{PATTERN_LABELS[x.patternKey] || x.patternKey}</span>
                                <span style={{ fontSize: 10, color: '#A8A29E' }}>{x.date}{x.context ? ` ・ ${x.context}` : ''}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                <div style={{ background: '#FEF2F2', borderRadius: 8, padding: '8px 11px' }}>
                                    <div style={{ fontSize: 9, fontWeight: 800, color: A, marginBottom: 2 }}>言った</div>
                                    <div style={{ fontSize: 13.5, color: '#7F1D1D', lineHeight: 1.5, textDecoration: 'line-through', textDecorationColor: '#FCA5A5' }}>{x.said}</div>
                                </div>
                                <div style={{ background: '#ECFDF5', borderRadius: 8, padding: '8px 11px' }}>
                                    <div style={{ fontSize: 9, fontWeight: 800, color: GREEN, marginBottom: 2 }}>直し</div>
                                    <div style={{ fontSize: 13.5, color: '#065F46', lineHeight: 1.5, fontWeight: 600 }}>{x.fix}</div>
                                </div>
                            </div>
                            <div style={{ fontSize: 12.5, color: SUB, marginTop: 7, lineHeight: 1.6 }}>{x.pattern}</div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 14, padding: '10px 14px', background: '#fff', border: `1px dashed ${LINE}`, borderRadius: 10, fontSize: 11, color: '#A8A29E', lineHeight: 1.7 }}>
                    会話や英作文を見せるたびに、新しいミスがここに自動で積まれていく。⚠ が付いたパターンは2回以上やってるやつ＝最優先で直す。
                </div>
            </div>
        </div>
    );
}

function chip(active: boolean, warn = false): React.CSSProperties {
    return {
        padding: '6px 12px', borderRadius: 999, cursor: 'pointer', fontSize: 12, fontWeight: 700,
        border: `1px solid ${active ? A : warn ? '#FCA5A5' : LINE}`,
        background: active ? A : '#fff', color: active ? '#fff' : warn ? A : SUB,
    };
}
