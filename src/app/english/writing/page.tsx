'use client';

// 英作文 → トレーニング登録
// Claude がチャットで口語化した英文 (writing-seed.ts) を表示し、
// ユーザーは登録したい文をチェックで選んでトレーニング(phrases)に登録する。

import { useState } from 'react';
import Link from 'next/link';
import { WRITING_SEEDS, type WritingEntry } from '@/data/english/writing-seed';

const ACCENT = '#D4AF37';
const INK = '#1c1917';
const SUB = '#78716C';
const LINE = '#e7e5e4';
const GREEN = '#10B981';

const LS_KEY = 'writing-registered';

interface EntryResult {
    added: number;
    duplicate: number;
    failed: number;
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

export default function WritingPage() {
    const entries = [...WRITING_SEEDS].sort((a, b) => b.date.localeCompare(a.date));
    const [registered, setRegistered] = useState<Set<string>>(loadRegistered);
    const [dates, setDates] = useState<Record<string, string>>(() =>
        Object.fromEntries(WRITING_SEEDS.map(e => [e.id, e.date]))
    );
    // 既定で全文を選択状態にしておく（要らない文だけ外す運用）
    const [selected, setSelected] = useState<Record<string, Set<number>>>(() =>
        Object.fromEntries(
            WRITING_SEEDS.map(e => [e.id, new Set(e.sentences.map((_, i) => i))])
        )
    );
    const [registeringId, setRegisteringId] = useState<string | null>(null);
    const [results, setResults] = useState<Record<string, EntryResult>>({});

    const toggle = (entryId: string, idx: number) => {
        setSelected(prev => {
            const set = new Set(prev[entryId] || []);
            if (set.has(idx)) set.delete(idx);
            else set.add(idx);
            return { ...prev, [entryId]: set };
        });
    };

    const setAll = (entry: WritingEntry, all: boolean) => {
        setSelected(prev => ({
            ...prev,
            [entry.id]: all ? new Set(entry.sentences.map((_, i) => i)) : new Set(),
        }));
    };

    const handleRegister = async (entry: WritingEntry) => {
        if (registeringId) return;
        const date = dates[entry.id] || entry.date;
        const sel = selected[entry.id] || new Set<number>();
        const toRegister = entry.sentences.filter((_, i) => sel.has(i));
        if (!date || toRegister.length === 0) return;
        setRegisteringId(entry.id);
        let added = 0;
        let duplicate = 0;
        let failed = 0;
        for (const sentence of toRegister) {
            try {
                const res = await fetch('/api/phrases', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        english: sentence,
                        japanese: '',
                        category: 'writing',
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
        setResults(prev => ({ ...prev, [entry.id]: { added, duplicate, failed } }));
        const next = new Set(registered);
        next.add(entry.id);
        setRegistered(next);
        try {
            localStorage.setItem(LS_KEY, JSON.stringify([...next]));
        } catch {
            /* localStorage unavailable */
        }
        setRegisteringId(null);
    };

    return (
        <div style={{ padding: '32px 24px 80px', maxWidth: '780px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{
                    fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em',
                    color: ACCENT, textTransform: 'uppercase',
                }}>
                    Writing → Training
                </div>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: INK, margin: '6px 0 4px' }}>
                    英作文 → トレーニング登録
                </h1>
                <p style={{ fontSize: '13px', color: SUB, lineHeight: 1.7, margin: 0 }}>
                    Claude が口語化した英文がここに並ぶ。登録したい文だけチェックして、トレーニング(phrases)に登録。
                </p>
            </div>

            {entries.length === 0 && (
                <div style={{
                    background: '#fff', border: `1px dashed ${LINE}`, borderRadius: '14px',
                    padding: '40px 20px', textAlign: 'center', color: SUB, fontSize: '13px',
                }}>
                    まだ英文がない。チャットで口語化を頼めば、ここに並ぶ。
                </div>
            )}

            {entries.map(entry => {
                const isRegistered = registered.has(entry.id);
                const isBusy = registeringId === entry.id;
                const result = results[entry.id];
                const sel = selected[entry.id] || new Set<number>();
                const selCount = sel.size;
                const canRegister = selCount > 0 && !!dates[entry.id] && !registeringId;
                return (
                    <section
                        key={entry.id}
                        style={{
                            background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px',
                            padding: '18px', marginBottom: '16px',
                        }}
                    >
                        {/* Entry header */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            alignItems: 'flex-start', gap: '12px',
                        }}>
                            <div>
                                <div style={{ fontSize: '15px', fontWeight: 800, color: INK }}>
                                    {entry.title}
                                </div>
                                <div style={{ fontSize: '11px', color: SUB, marginTop: '3px' }}>
                                    {selCount} / {entry.sentences.length} 文を選択中
                                    {entry.source && <> ・ {entry.source}</>}
                                </div>
                            </div>
                            {isRegistered && (
                                <div style={{
                                    fontSize: '11px', fontWeight: 700, color: GREEN,
                                    background: '#ECFDF5', border: '1px solid #A7F3D0',
                                    borderRadius: '999px', padding: '3px 10px', whiteSpace: 'nowrap',
                                }}>
                                    登録済み
                                </div>
                            )}
                        </div>

                        {/* Select all / none */}
                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                            <button
                                onClick={() => setAll(entry, true)}
                                style={selToggleStyle}
                            >
                                全選択
                            </button>
                            <button
                                onClick={() => setAll(entry, false)}
                                style={selToggleStyle}
                            >
                                全解除
                            </button>
                        </div>

                        {/* Sentences (selectable) */}
                        <ul style={{
                            margin: '10px 0 0', padding: 0, listStyle: 'none',
                            display: 'flex', flexDirection: 'column', gap: '6px',
                        }}>
                            {entry.sentences.map((s, i) => {
                                const on = sel.has(i);
                                return (
                                    <li
                                        key={i}
                                        onClick={() => toggle(entry.id, i)}
                                        style={{
                                            display: 'flex', gap: '10px', alignItems: 'baseline',
                                            padding: '8px 10px', borderRadius: '8px',
                                            background: on ? '#fffdf5' : '#fafaf9',
                                            border: `1px solid ${on ? '#EBD9A0' : LINE}`,
                                            fontSize: '13px', lineHeight: 1.6, cursor: 'pointer',
                                            userSelect: 'none',
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={on}
                                            onChange={() => toggle(entry.id, i)}
                                            onClick={e => e.stopPropagation()}
                                            style={{ marginTop: '3px', accentColor: ACCENT, cursor: 'pointer' }}
                                        />
                                        <span style={{
                                            fontSize: '11px', fontWeight: 700,
                                            color: on ? ACCENT : '#cbc4b4', minWidth: '18px',
                                        }}>
                                            {i + 1}
                                        </span>
                                        <span style={{ color: on ? INK : '#a8a29e' }}>{s}</span>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Register row */}
                        <div style={{
                            display: 'flex', gap: '12px', alignItems: 'center',
                            marginTop: '14px', paddingTop: '14px', borderTop: `1px solid ${LINE}`,
                            flexWrap: 'wrap',
                        }}>
                            <label style={{ fontSize: '12px', color: SUB, fontWeight: 600 }}>
                                登録日
                            </label>
                            <input
                                type="date"
                                value={dates[entry.id] || ''}
                                onChange={e => setDates(prev => ({ ...prev, [entry.id]: e.target.value }))}
                                style={{
                                    padding: '7px 10px', border: `1px solid ${LINE}`,
                                    borderRadius: '8px', fontSize: '13px', color: INK,
                                    background: '#fff', outline: 'none',
                                }}
                            />
                            <button
                                onClick={() => handleRegister(entry)}
                                disabled={!canRegister}
                                style={{
                                    marginLeft: 'auto',
                                    padding: '10px 20px', borderRadius: '8px', border: 'none',
                                    background: canRegister ? ACCENT : '#e7e5e4',
                                    color: canRegister ? '#1c1917' : '#a8a29e',
                                    fontSize: '13px', fontWeight: 800,
                                    cursor: canRegister ? 'pointer' : 'not-allowed',
                                }}
                            >
                                {isBusy
                                    ? '登録中…'
                                    : `選んだ${selCount}文を登録`}
                            </button>
                        </div>

                        {/* Result */}
                        {result && (
                            <div style={{ marginTop: '10px', fontSize: '12px', color: SUB, lineHeight: 1.7 }}>
                                新規 <strong style={{ color: GREEN }}>{result.added}</strong> 件
                                {result.duplicate > 0 && <> / 重複スキップ <strong>{result.duplicate}</strong> 件</>}
                                {result.failed > 0 && <> / 失敗 <strong style={{ color: '#DC2626' }}>{result.failed}</strong> 件</>}
                                {' '}
                                <Link
                                    href={`/english/training/${dates[entry.id]}`}
                                    style={{ color: ACCENT, fontWeight: 700, textDecoration: 'none' }}
                                >
                                    トレーニングを見る →
                                </Link>
                            </div>
                        )}
                    </section>
                );
            })}
        </div>
    );
}

const selToggleStyle: React.CSSProperties = {
    padding: '4px 10px',
    borderRadius: '6px',
    border: `1px solid ${LINE}`,
    background: '#fafaf9',
    color: SUB,
    fontSize: '11px',
    fontWeight: 600,
    cursor: 'pointer',
};
