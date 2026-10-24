'use client';

import { useCallback, useEffect, useState } from 'react';
import EnglishSidebar from '@/components/EnglishSidebar';
import { kenshiLessons } from '@/data/english/kenshi-lessons';

const REG_KEY = 'tsukkomi_registered';

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

export default function TsukkomiPage() {
    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);

    useEffect(() => {
        setRegistered(loadRegistered());
    }, []);

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
        } catch {
            /* silent */
        } finally {
            setBusy(null);
        }
    }, [registered, busy]);

    const AddButton = ({ english, japanese }: { english: string; japanese: string }) => {
        const done = registered.has(english.toLowerCase());
        const loading = busy === english.toLowerCase();
        return (
            <button
                onClick={() => addToTraining(english, japanese)}
                disabled={done || loading}
                style={{
                    marginTop: 10,
                    padding: '6px 14px',
                    fontSize: 12,
                    fontWeight: 600,
                    borderRadius: 8,
                    cursor: done ? 'default' : 'pointer',
                    border: done ? '1px solid #10B981' : '1px solid #D4AF37',
                    background: done ? 'rgba(16,185,129,0.1)' : 'rgba(212,175,55,0.1)',
                    color: done ? '#047857' : '#8a6d1a',
                    transition: 'all 0.15s ease',
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
                flex: 1,
                maxWidth: 860,
                margin: '0 auto',
                padding: '40px 20px 96px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                color: '#1c1917',
            }}>
                <header style={{ marginBottom: 32 }}>
                    <div style={{ fontSize: 12, letterSpacing: 3, color: '#a8a29e', textTransform: 'uppercase' }}>Tsukkomi / Postmortem</div>
                    <h1 style={{ fontSize: 30, fontWeight: 700, margin: '6px 0 10px', letterSpacing: 0.5 }}>英語ツッコミ (復習)</h1>
                    <p style={{ fontSize: 14, lineHeight: 1.8, color: '#57534e', margin: 0, maxWidth: 640 }}>
                        実際に口から出した英語を、ミス -&gt; 直し -&gt; 勝ち に仕分けたログ。
                        各カードの「トレーニングに追加」を押すと、その一文が
                        <a href="/english/training" style={{ color: '#0e7490', textDecoration: 'underline', margin: '0 4px' }}>トレーニング</a>
                        のカードになって暗記できる。流して終わりにしない。
                    </p>
                </header>

                {kenshiLessons.map(lesson => (
                    <section key={lesson.date} style={{ marginBottom: 48 }}>
                        <div style={{
                            padding: '16px 20px',
                            background: 'white',
                            border: '1px solid #e7e5e4',
                            borderRadius: 14,
                            marginBottom: 24,
                        }}>
                            <div style={{ fontSize: 12, color: '#a8a29e', marginBottom: 6 }}>{lesson.date}</div>
                            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{lesson.source}</div>
                            <p style={{ fontSize: 14, lineHeight: 1.8, color: '#44403c', margin: '0 0 10px' }}>{lesson.summary}</p>
                            <div style={{
                                fontSize: 13, lineHeight: 1.8, color: '#134e4a',
                                background: '#f0fdf9', borderLeft: '4px solid #10B981',
                                borderRadius: '0 8px 8px 0', padding: '10px 16px',
                            }}>
                                核心: {lesson.core}
                            </div>
                        </div>

                        <h2 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 4px' }}>直し</h2>
                        <p style={{ fontSize: 13, color: '#78716c', margin: '0 0 16px' }}>崩れた形と、口に出せる直し。追加すると training で回せる。</p>
                        <div style={{ display: 'grid', gap: 14, marginBottom: 36 }}>
                            {lesson.mistakes.map((m, i) => (
                                <div key={i} style={{ padding: '18px 20px', background: 'white', border: '1px solid #e7e5e4', borderRadius: 12 }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: '#b45309', background: '#fef3c7', display: 'inline-block', padding: '2px 10px', borderRadius: 999, marginBottom: 10 }}>{m.pattern}</div>
                                    <div style={{ fontSize: 13, color: '#a8a29e', textDecoration: 'line-through', marginBottom: 6 }}>{m.spoke}</div>
                                    <div style={{ fontSize: 18, fontWeight: 700, color: '#1c1917', lineHeight: 1.5 }}>{m.drill}</div>
                                    <div style={{ fontSize: 14, color: '#57534e', marginTop: 4 }}>{m.ja}</div>
                                    {m.note && <div style={{ fontSize: 13, color: '#78716c', lineHeight: 1.7, marginTop: 8 }}>{m.note}</div>}
                                    <AddButton english={m.drill} japanese={m.card ?? (m.note ? `${m.ja} — ${m.note}` : m.ja)} />
                                </div>
                            ))}
                        </div>

                        <h2 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 4px' }}>今日の勝ち</h2>
                        <p style={{ fontSize: 13, color: '#78716c', margin: '0 0 16px' }}>そのまま武器になった表現。温存して使い回す。</p>
                        <div style={{ display: 'grid', gap: 14 }}>
                            {lesson.wins.map((w, i) => (
                                <div key={i} style={{ padding: '18px 20px', background: 'white', border: '1px solid #d1fae5', borderRadius: 12 }}>
                                    <div style={{ fontSize: 18, fontWeight: 700, color: '#065f46', lineHeight: 1.5 }}>{w.english}</div>
                                    <div style={{ fontSize: 14, color: '#57534e', marginTop: 4 }}>{w.ja}</div>
                                    <div style={{ fontSize: 13, color: '#78716c', lineHeight: 1.7, marginTop: 8 }}>{w.note}</div>
                                    <AddButton english={w.english} japanese={w.card ?? (w.note ? `${w.ja} — ${w.note}` : w.ja)} />
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
}
