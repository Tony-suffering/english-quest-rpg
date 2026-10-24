'use client';

import { useCallback, useEffect, useState } from 'react';
import EnglishSidebar from '@/components/EnglishSidebar';
import { registerAnalysis as a } from '@/data/english/register-analysis';

const REG_KEY = 'c2native_registered';

function loadRegistered(): Set<string> {
    if (typeof window === 'undefined') return new Set();
    try {
        return new Set(JSON.parse(localStorage.getItem(REG_KEY) || '[]'));
    } catch {
        return new Set();
    }
}

function todayStr(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function C2VsNativePage() {
    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);

    useEffect(() => { setRegistered(loadRegistered()); }, []);

    const addToTraining = useCallback(async (english: string, japanese: string) => {
        const key = english.toLowerCase();
        if (registered.has(key) || busy) return;
        setBusy(key);
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english, japanese, category: 'expression', date: todayStr() }),
            });
            if (res.ok || res.status === 409) {
                setRegistered(prev => {
                    const next = new Set(prev);
                    next.add(key);
                    localStorage.setItem(REG_KEY, JSON.stringify([...next]));
                    return next;
                });
            }
        } catch { /* silent */ } finally { setBusy(null); }
    }, [registered, busy]);

    const AddButton = ({ english, japanese }: { english: string; japanese: string }) => {
        const done = registered.has(english.toLowerCase());
        const loading = busy === english.toLowerCase();
        return (
            <button
                onClick={() => addToTraining(english, japanese)}
                disabled={done || loading}
                style={{
                    marginTop: 10, padding: '6px 14px', fontSize: 12, fontWeight: 600, borderRadius: 8,
                    cursor: done ? 'default' : 'pointer',
                    border: done ? '1px solid #10B981' : '1px solid #D4AF37',
                    background: done ? 'rgba(16,185,129,0.1)' : 'rgba(212,175,55,0.1)',
                    color: done ? '#047857' : '#8a6d1a', transition: 'all 0.15s ease',
                }}
            >
                {done ? '登録済み — トレーニングで復習' : loading ? '追加中...' : 'トレーニングに追加'}
            </button>
        );
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#FAFAF9' }}>
            <EnglishSidebar />
            <main style={{
                flex: 1, maxWidth: 820, margin: '0 auto', padding: '40px 20px 96px',
                fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1c1917',
            }}>
                <header style={{ marginBottom: 32 }}>
                    <div style={{ fontSize: 12, letterSpacing: 3, color: '#a8a29e', textTransform: 'uppercase' }}>C2 vs Native</div>
                    <h1 style={{ fontSize: 30, fontWeight: 700, margin: '6px 0 12px', letterSpacing: 0.5 }}>C2 vs ネイティブ — 英語の正体</h1>
                    <p style={{ fontSize: 15, lineHeight: 1.9, color: '#44403c', margin: 0 }}>{a.intro}</p>
                    <div style={{ marginTop: 12, fontSize: 12, color: '#a8a29e' }}>解剖: {a.updated}</div>
                </header>

                {/* 三層モデル */}
                <section style={{ marginBottom: 44 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 14px' }}>三層モデル</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5, minWidth: 560 }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid #e7e5e4', color: '#78716c', fontWeight: 700 }}>軸</th>
                                    <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid #e7e5e4', color: '#0e7490', fontWeight: 700 }}>ネイティブ投手</th>
                                    <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid #e7e5e4', color: '#047857', fontWeight: 700 }}>ロハス (C2)</th>
                                    <th style={{ textAlign: 'left', padding: '10px 12px', borderBottom: '2px solid #e7e5e4', color: '#8a6d1a', fontWeight: 700 }}>とにお (現在)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {a.layers.map((row, i) => (
                                    <tr key={i}>
                                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f0efee', fontWeight: 700, color: '#44403c' }}>{row.axis}</td>
                                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f0efee', color: '#57534e' }}>{row.native}</td>
                                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f0efee', color: '#57534e' }}>{row.rojas}</td>
                                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f0efee', color: '#57534e' }}>{row.tonio}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 本文 */}
                {a.sections.map(s => (
                    <section key={s.id} style={{ marginBottom: 40 }}>
                        <h2 style={{ fontSize: 21, fontWeight: 700, margin: '0 0 6px', letterSpacing: 0.3, lineHeight: 1.4 }}>{s.heading}</h2>
                        {s.lead && <p style={{ fontSize: 14, fontWeight: 600, color: '#8a6d1a', margin: '0 0 14px' }}>{s.lead}</p>}
                        {s.paragraphs.map((p, j) => (
                            <p key={j} style={{ fontSize: 15.5, lineHeight: 2, margin: '0 0 16px', color: '#292524' }}>{p}</p>
                        ))}
                    </section>
                ))}

                {/* 盗む表現 */}
                <section style={{ marginTop: 44 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 6px' }}>盗む表現</h2>
                    <p style={{ fontSize: 13, color: '#78716c', margin: '0 0 18px' }}>ロハスの中身・イディオムと、ネイティブのテクスチャ。どっちも登録して回せる。</p>
                    <div style={{ display: 'grid', gap: 14 }}>
                        {a.steal.map((p, i) => (
                            <div key={i} style={{ padding: '18px 20px', background: 'white', border: '1px solid #e7e5e4', borderRadius: 12 }}>
                                <div style={{
                                    fontSize: 11, fontWeight: 700, display: 'inline-block', padding: '2px 10px', borderRadius: 999, marginBottom: 10,
                                    color: p.who === 'rojas' ? '#047857' : '#0e7490',
                                    background: p.who === 'rojas' ? 'rgba(16,185,129,0.12)' : 'rgba(14,116,144,0.1)',
                                }}>{p.who === 'rojas' ? 'ROJAS — 中身/イディオム' : 'NATIVE — テクスチャ'}</div>
                                <div style={{ fontSize: 18, fontWeight: 700, color: '#1c1917', lineHeight: 1.5 }}>{p.english}</div>
                                <div style={{ fontSize: 14, color: '#57534e', marginTop: 4 }}>{p.ja}</div>
                                <div style={{ fontSize: 13, color: '#78716c', lineHeight: 1.7, marginTop: 8 }}>{p.note}</div>
                                <AddButton english={p.english} japanese={p.ja} />
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
