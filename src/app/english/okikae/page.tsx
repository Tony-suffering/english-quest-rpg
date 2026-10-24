'use client';

/**
 * 置き換え -- 日本語の塊を、しゃべる英語に置き換える。1日1本。
 *
 * 毎日、日本語の対談・ラジオ・インタビューを1本拾い、中に出てくる口語の塊だけを抜いて、
 * ネイティブがその場で口にする英語を2通り付ける。話の中身はどうでもいい。塊だけを見る。
 *
 * 英語の音は JRE などで浴びている。日本語は母語なので音は要らない。文字で塊を拾えば足りる。
 * 翻訳の英語(my feeling of long-awaited anticipation was immense)は置かない。しゃべる英語だけ。
 *
 * データは src/data/english/okikae/<date>.json -> scripts/build-okikae.mjs -> okikae-days.ts
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import { OKIKAE_DAYS, OKIKAE_TOTAL_ROWS } from '@/data/english/okikae-days';

const ACCENT = '#D4AF37';
const DEEP = '#9A7B16';
const EMERALD = '#10B981';
const INK = '#1C1917';
const SUB = '#57534E';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const REG_KEY = 'okikae_registered';

function speak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
}

function jstToday(): string {
    return new Date(Date.now() + 9 * 3600 * 1000).toISOString().slice(0, 10);
}

function buildGrid(year: number, month: number): (number | null)[] {
    const first = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const g: (number | null)[] = [];
    for (let i = 0; i < first; i++) g.push(null);
    for (let d = 1; d <= days; d++) g.push(d);
    while (g.length % 7 !== 0) g.push(null);
    return g;
}

const dateKey = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

export default function OkikaePage() {
    const today = jstToday();
    const byDate = useMemo(() => new Map(OKIKAE_DAYS.map((d) => [d.date, d])), []);
    // 今日のぶんが無ければ、開始前なら初日、過ぎていればいちばん新しい日を開く
    const first = OKIKAE_DAYS[0]?.date ?? today;
    const last = OKIKAE_DAYS[OKIKAE_DAYS.length - 1]?.date ?? today;
    const initial = byDate.has(today) ? today : today < first ? first : last;
    const [viewYear, setViewYear] = useState(Number(initial.slice(0, 4)));
    const [viewMonth, setViewMonth] = useState(Number(initial.slice(5, 7)) - 1);
    const [selected, setSelected] = useState(initial);
    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);

    useEffect(() => {
        try { setRegistered(new Set(JSON.parse(localStorage.getItem(REG_KEY) || '[]'))); } catch { /* noop */ }
    }, []);

    const grid = useMemo(() => buildGrid(viewYear, viewMonth), [viewYear, viewMonth]);
    const day = byDate.get(selected);

    const add = useCallback(async (english: string, japanese: string) => {
        const key = english.toLowerCase();
        if (registered.has(key) || busy) return;
        setBusy(key);
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english, japanese, category: 'expression', date: today }),
            });
            if (res.ok || res.status === 409) {
                setRegistered((prev) => {
                    const next = new Set(prev);
                    next.add(key);
                    try { localStorage.setItem(REG_KEY, JSON.stringify([...next])); } catch { /* noop */ }
                    return next;
                });
            }
        } catch { /* silent */ } finally { setBusy(null); }
    }, [registered, busy, today]);

    const moveMonth = (delta: number) => {
        const d = new Date(viewYear, viewMonth + delta, 1);
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FAFAF9', color: INK }}>
            <div style={{ maxWidth: '980px', margin: '0 auto', padding: '28px 16px 80px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: FAINT, textTransform: 'uppercase' }}>Okikae</div>
                <h1 style={{ margin: '6px 0 0', fontSize: '26px', fontWeight: 800, letterSpacing: '-0.3px' }}>
                    置き換え <span style={{ fontSize: '15px', fontWeight: 400, color: FAINT }}>日本語の塊を、しゃべる英語に。1日1本</span>
                </h1>
                <p style={{ margin: '12px 0 0', fontSize: '13px', color: SUB, lineHeight: 1.9, maxWidth: '720px' }}>
                    毎日、日本語の対談やラジオを1本拾って、中に出てくる口語の塊だけを抜く。話の中身はどうでもいい。
                    日本人が3時間しゃべり続けられるのは、この塊を組み立てずに出しているから。英語も同じで、1個ずつ置き換えていく。
                    英語は翻訳ではなく、その場でネイティブが口にする言い方を2通り。
                </p>
                <div style={{ marginTop: '10px', fontSize: '12px', color: FAINT }}>
                    {OKIKAE_DAYS.length} 本 / 塊 {OKIKAE_TOTAL_ROWS.toLocaleString()} 個
                </div>

                {/* Month nav */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '24px 0 12px' }}>
                    <button onClick={() => moveMonth(-1)} aria-label="前の月"
                        style={{ width: '48px', height: '40px', borderRadius: '10px', border: `1px solid ${LINE}`, background: '#fff', cursor: 'pointer', fontSize: '16px' }}>←</button>
                    <div style={{ fontSize: '18px', fontWeight: 700 }}>
                        {new Date(viewYear, viewMonth, 1).toLocaleString('en-US', { month: 'long' })} {viewYear}
                    </div>
                    <button onClick={() => moveMonth(1)} aria-label="次の月"
                        style={{ width: '48px', height: '40px', borderRadius: '10px', border: `1px solid ${LINE}`, background: '#fff', cursor: 'pointer', fontSize: '16px' }}>→</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '4px' }}>
                    {WEEKDAYS.map((w) => (
                        <div key={w} style={{ textAlign: 'center', fontSize: '11px', fontWeight: 600, color: FAINT, padding: '6px 0', textTransform: 'uppercase' }}>{w}</div>
                    ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '24px' }}>
                    {grid.map((d, i) => {
                        if (d === null) return <div key={`e${i}`} />;
                        const dk = dateKey(viewYear, viewMonth, d);
                        const data = byDate.get(dk);
                        const isSel = selected === dk;
                        const isToday = dk === today;
                        return (
                            <button key={dk} onClick={() => setSelected(dk)}
                                style={{
                                    minHeight: '64px', borderRadius: '10px', cursor: 'pointer',
                                    border: isSel ? `2px solid ${ACCENT}` : isToday ? `2px solid ${EMERALD}` : `1px solid ${LINE}`,
                                    backgroundColor: isSel ? '#FFFBEB' : data ? '#fff' : '#F5F5F4',
                                    opacity: data ? 1 : 0.55,
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', padding: '6px 2px',
                                }}>
                                <span style={{ fontSize: '12px', fontWeight: isSel || isToday ? 800 : 600, color: isSel ? '#B45309' : isToday ? '#059669' : '#78716C' }}>{d}</span>
                                {data && <span style={{ fontSize: '9px', fontWeight: 700, color: ACCENT }}>{data.rows.length}</span>}
                            </button>
                        );
                    })}
                </div>

                {!day ? (
                    <div style={{ padding: '40px', textAlign: 'center', background: '#fff', borderRadius: '14px', border: `1px solid ${LINE}`, color: FAINT, fontSize: '14px' }}>
                        この日はまだ無い
                    </div>
                ) : (
                    <div>
                        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '14px 16px', marginBottom: '12px' }}>
                            <div style={{ fontSize: '11px', color: FAINT }}>{day.date} ・ 素材</div>
                            <a href={`https://www.youtube.com/watch?v=${day.source.videoId}`} target="_blank" rel="noopener noreferrer"
                                style={{ display: 'block', marginTop: '4px', fontSize: '15px', fontWeight: 700, color: INK, textDecoration: 'none', lineHeight: 1.5 }}>
                                {day.source.title}
                            </a>
                            <div style={{ marginTop: '2px', fontSize: '12px', color: SUB }}>{day.source.channel} ・ 塊 {day.rows.length} 個</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {day.rows.map((r, idx) => {
                                return (
                                    <div key={r.ja} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '12px 14px' }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: '11px', fontWeight: 700, color: FAINT }}>{idx + 1}</span>
                                            <span style={{ fontSize: '17px', fontWeight: 800, color: INK }}>{r.ja}</span>
                                        </div>
                                        <div style={{ marginTop: '3px', fontSize: '12px', color: FAINT, lineHeight: 1.6 }}>{r.line}</div>
                                        <div style={{ marginTop: '8px', display: 'grid', gap: '6px' }}>
                                            {[r.en1, r.en2].map((en, k) => {
                                                const done = registered.has(en.toLowerCase());
                                                const loading = busy === en.toLowerCase();
                                                return (
                                                    <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <button onClick={() => speak(en)} aria-label="音で聞く"
                                                            style={{ flexShrink: 0, border: `1px solid ${LINE}`, background: '#fff', borderRadius: '8px', padding: '3px 8px', fontSize: '11px', color: SUB, cursor: 'pointer' }}>
                                                            音
                                                        </button>
                                                        <span style={{ flex: 1, fontSize: '15px', fontWeight: k === 0 ? 700 : 500, color: k === 0 ? INK : SUB, lineHeight: 1.5 }}>{en}</span>
                                                        <button onClick={() => add(en, r.ja)} disabled={done || loading}
                                                            style={{
                                                                flexShrink: 0, borderRadius: '8px', padding: '4px 9px', fontSize: '11px', fontWeight: 600, cursor: done ? 'default' : 'pointer',
                                                                border: `1px solid ${done ? EMERALD : '#F59E0B'}`, background: done ? '#ECFDF5' : '#FFFBEB', color: done ? '#047857' : DEEP,
                                                            }}>
                                                            {done ? '登録済み' : loading ? '追加中' : '追加'}
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
