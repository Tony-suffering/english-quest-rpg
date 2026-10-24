'use client';

// 英検1級 語彙 → トレーニング登録
// 呪術廻戦キャラの会話例文で22語を覚え、チェックした例文を phrases に登録する。

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { EIKEN1_VOCAB, EIKEN1_META, type EikenVocabEntry } from '@/data/english/eiken1-vocab';

const ACCENT = '#D4AF37';
const INK = '#1c1917';
const SUB = '#78716C';
const LINE = '#e7e5e4';
const GREEN = '#10B981';
const RED = '#DC2626';

const LS_KEY = 'eiken1-registered';

function todayStr(): string {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function loadRegistered(): Set<string> {
    if (typeof window === 'undefined') return new Set();
    try {
        const s = localStorage.getItem(LS_KEY);
        return s ? new Set<string>(JSON.parse(s)) : new Set<string>();
    } catch {
        return new Set<string>();
    }
}

export default function Eiken1Page() {
    const [registered, setRegistered] = useState<Set<string>>(loadRegistered);
    const [selected, setSelected] = useState<Set<string>>(
        () => new Set(EIKEN1_VOCAB.map(e => e.id))
    );
    const [date, setDate] = useState<string>(todayStr());
    const [busy, setBusy] = useState(false);
    const [missedOnly, setMissedOnly] = useState(false);
    const [result, setResult] = useState<{ added: number; duplicate: number; failed: number } | null>(null);

    const list = useMemo(
        () => (missedOnly ? EIKEN1_VOCAB.filter(e => e.missed) : EIKEN1_VOCAB),
        [missedOnly]
    );

    const toggle = (id: string) => {
        setSelected(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const setAll = (on: boolean) => {
        if (on) setSelected(new Set(list.map(e => e.id)));
        else {
            setSelected(prev => {
                const next = new Set(prev);
                list.forEach(e => next.delete(e.id));
                return next;
            });
        }
    };

    const selCount = list.filter(e => selected.has(e.id)).length;

    const handleRegister = async () => {
        if (busy) return;
        const toRegister = EIKEN1_VOCAB.filter(e => selected.has(e.id));
        if (!date || toRegister.length === 0) return;
        setBusy(true);
        let added = 0, duplicate = 0, failed = 0;
        for (const e of toRegister) {
            try {
                const res = await fetch('/api/phrases', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        english: e.example,
                        japanese: `${e.word} = ${e.meaning}`,
                        category: 'eiken1',
                        date,
                    }),
                });
                const data = await res.json().catch(() => ({}));
                if (res.ok && data.success) {
                    if (data.duplicate) duplicate++;
                    else added++;
                } else {
                    failed++;
                }
            } catch {
                failed++;
            }
        }
        setResult({ added, duplicate, failed });
        const next = new Set(registered);
        toRegister.forEach(e => next.add(e.id));
        setRegistered(next);
        try {
            localStorage.setItem(LS_KEY, JSON.stringify([...next]));
        } catch { /* ignore */ }
        setBusy(false);
    };

    return (
        <div style={{ padding: '32px 24px 96px', maxWidth: '820px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em',
                    color: ACCENT, textTransform: 'uppercase',
                }}>
                    Eiken Grade 1 Vocab → Training
                </div>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: INK, margin: '6px 0 4px' }}>
                    {EIKEN1_META.title}
                </h1>
                <p style={{ fontSize: '13px', color: SUB, lineHeight: 1.7, margin: 0 }}>
                    {EIKEN1_META.round}・{EIKEN1_META.source}。呪術廻戦のキャラの会話で22語を覚えて、
                    選んだ例文をトレーニング(phrases)に登録する。
                </p>
                <p style={{ fontSize: '12px', color: RED, fontWeight: 700, marginTop: '8px' }}>
                    {EIKEN1_META.missedNote}
                </p>
            </div>

            {/* Controls */}
            <div style={{
                display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap',
                background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px',
                padding: '12px 14px', marginBottom: '16px', position: 'sticky', top: '12px', zIndex: 5,
            }}>
                <button onClick={() => setAll(true)} style={chip}>全選択</button>
                <button onClick={() => setAll(false)} style={chip}>全解除</button>
                <button
                    onClick={() => setMissedOnly(v => !v)}
                    style={{ ...chip, borderColor: missedOnly ? RED : LINE, color: missedOnly ? RED : SUB }}
                >
                    {missedOnly ? '落とした3つだけ表示中' : '落とした3つだけ'}
                </button>
                <label style={{ fontSize: '12px', color: SUB, fontWeight: 600, marginLeft: '6px' }}>登録日</label>
                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    style={{
                        padding: '7px 10px', border: `1px solid ${LINE}`, borderRadius: '8px',
                        fontSize: '13px', color: INK, background: '#fff', outline: 'none',
                    }}
                />
                <button
                    onClick={handleRegister}
                    disabled={selCount === 0 || busy}
                    style={{
                        marginLeft: 'auto', padding: '10px 20px', borderRadius: '8px', border: 'none',
                        background: selCount > 0 && !busy ? ACCENT : '#e7e5e4',
                        color: selCount > 0 && !busy ? '#1c1917' : '#a8a29e',
                        fontSize: '13px', fontWeight: 800,
                        cursor: selCount > 0 && !busy ? 'pointer' : 'not-allowed',
                    }}
                >
                    {busy ? '登録中…' : `選んだ${selCount}語を登録`}
                </button>
            </div>

            {/* Result */}
            {result && (
                <div style={{
                    marginBottom: '16px', fontSize: '13px', color: SUB, lineHeight: 1.7,
                    background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '12px 14px',
                }}>
                    新規 <strong style={{ color: GREEN }}>{result.added}</strong> 件
                    {result.duplicate > 0 && <> / 重複スキップ <strong>{result.duplicate}</strong> 件</>}
                    {result.failed > 0 && <> / 失敗 <strong style={{ color: RED }}>{result.failed}</strong> 件</>}
                    {'  '}
                    <Link href={`/english/training/${date}`} style={{ color: ACCENT, fontWeight: 700, textDecoration: 'none' }}>
                        トレーニングを見る →
                    </Link>
                </div>
            )}

            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {list.map(entry => (
                    <Card
                        key={entry.id}
                        entry={entry}
                        on={selected.has(entry.id)}
                        done={registered.has(entry.id)}
                        onToggle={() => toggle(entry.id)}
                    />
                ))}
            </div>
        </div>
    );
}

function Card({ entry, on, done, onToggle }: {
    entry: EikenVocabEntry; on: boolean; done: boolean; onToggle: () => void;
}) {
    return (
        <section
            onClick={onToggle}
            style={{
                background: '#fff',
                border: `1px solid ${entry.missed ? '#F3C7C7' : on ? '#EBD9A0' : LINE}`,
                borderLeft: `4px solid ${entry.missed ? RED : on ? ACCENT : LINE}`,
                borderRadius: '14px', padding: '16px 18px', cursor: 'pointer', userSelect: 'none',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                <input
                    type="checkbox"
                    checked={on}
                    onChange={onToggle}
                    onClick={e => e.stopPropagation()}
                    style={{ accentColor: ACCENT, cursor: 'pointer', transform: 'translateY(2px)' }}
                />
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#cbc4b4', minWidth: '20px' }}>
                    {entry.no}
                </span>
                <span style={{ fontSize: '19px', fontWeight: 800, color: INK }}>{entry.word}</span>
                <span style={{ fontSize: '11px', color: SUB, fontWeight: 600 }}>{entry.pos}</span>
                <span style={{ fontSize: '13px', color: '#57534e' }}>{entry.meaning}</span>
                {entry.missed && (
                    <span style={{
                        fontSize: '10px', fontWeight: 800, color: '#fff', background: RED,
                        borderRadius: '999px', padding: '2px 8px',
                    }}>
                        落とした
                    </span>
                )}
                {done && (
                    <span style={{
                        marginLeft: 'auto', fontSize: '10px', fontWeight: 700, color: GREEN,
                        background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '999px', padding: '2px 8px',
                    }}>
                        登録済み
                    </span>
                )}
            </div>

            <div style={{ marginTop: '10px', paddingLeft: '30px' }}>
                <div style={{ fontSize: '11px', color: ACCENT, fontWeight: 700, marginBottom: '3px' }}>
                    {entry.character}
                </div>
                <div style={{ fontSize: '15px', color: INK, lineHeight: 1.55, fontWeight: 500 }}>
                    {entry.example}
                </div>
                <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.6, marginTop: '4px' }}>
                    {entry.translation}
                </div>
            </div>
        </section>
    );
}

const chip: React.CSSProperties = {
    padding: '6px 12px', borderRadius: '8px', border: `1px solid ${LINE}`,
    background: '#fafaf9', color: SUB, fontSize: '12px', fontWeight: 600, cursor: 'pointer',
};
