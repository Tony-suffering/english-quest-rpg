// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/components/english/WriteLayerPanel.tsx
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
'use client';

/**
 * その日の 裏(逆の立場) と 話(口語版) を出すパネル。
 *
 * 表(論文体)は上のカードにある。ここに残り2層を置いて、1日分が
 *   表で書く → 裏から書く → 口から出す
 * の順に回せるようにする。型(穴あき)はさらに下の表に出る。
 */

import { useEffect, useState } from 'react';
import type { CounterEssayDay } from '@/data/english/write-counter-types';
import type { SpokenEssayDay } from '@/data/english/write-spoken-types';

const REG_KEY = 'write-spoken-registered-v1';

function todayStr() {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';
const PAPER = '#FAF8F2';

type Tab = 'counter' | 'spoken';

export function WriteLayerPanel({
    counter, spoken, isMobile,
}: {
    counter: CounterEssayDay | null;
    spoken: SpokenEssayDay | null;
    isMobile: boolean;
}) {
    const [tab, setTab] = useState<Tab>(counter ? 'counter' : 'spoken');
    const [showJa, setShowJa] = useState(false);
    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(REG_KEY);
            if (raw) setRegistered(new Set(JSON.parse(raw)));
        } catch {
            // 印が読めなくても登録そのものは何度でもやり直せる
        }
    }, []);

    /** 口語版の行を /api/phrases に流す。1行 = 1枚(英文と訳が揃っているのでそのまま復習できる) */
    const register = async (items: { en: string; ja: string }[], key: string) => {
        setBusy(key);
        const next = new Set(registered);
        for (const it of items) {
            if (next.has(it.en)) continue;
            try {
                const res = await fetch('/api/phrases', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ english: it.en, japanese: it.ja, category: 'expression', date: todayStr() }),
                });
                const data = await res.json().catch(() => ({}));
                // 既に同じ文が入っている場合も登録済みとして扱う
                if (res.ok || res.status === 409 || data?.success || data?.duplicate) next.add(it.en);
            } catch {
                // 1行落ちても残りは続ける
            }
        }
        setRegistered(next);
        try { localStorage.setItem(REG_KEY, JSON.stringify([...next])); } catch { /* noop */ }
        setBusy(null);
    };

    if (!counter && !spoken) return null;

    const spokenAll = spoken ? [{ en: spoken.hook, ja: spoken.hookJa }, ...spoken.lines] : [];
    const spokenDone = spokenAll.filter((l) => registered.has(l.en)).length;

    const btn = (key: Tab, label: string, sub: string, on: boolean, enabled: boolean) => (
        <button
            key={key}
            onClick={() => enabled && setTab(key)}
            disabled={!enabled}
            style={{
                flex: 1, padding: '9px 6px', borderRadius: '10px',
                cursor: enabled ? 'pointer' : 'default',
                border: on ? `2px solid ${GOLD}` : `1px solid ${LINE}`,
                background: on ? '#FEF9E7' : enabled ? '#fff' : '#F7F5EF',
                textAlign: 'center',
            }}
        >
            <div style={{ fontSize: '12.5px', fontWeight: 900, color: on ? DEEPGOLD : enabled ? SUB : '#D6D3D1' }}>{label}</div>
            <div style={{ fontSize: '9.5px', color: FAINT, marginTop: '1px' }}>{sub}</div>
        </button>
    );

    return (
        <div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                {btn('counter', '裏 ー 逆の立場', '同じ型で反対を書く', tab === 'counter', !!counter)}
                {btn('spoken', '話 ー 口語版', '2分で喋る形', tab === 'spoken', !!spoken)}
            </div>

            {tab === 'counter' && counter && (
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: isMobile ? '16px' : '20px 22px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 900, color: FAINT, letterSpacing: '1px', marginBottom: '5px' }}>逆の立場</div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: INK, lineHeight: 1.6 }}>{counter.stance}</div>
                    <div style={{ fontSize: '11.5px', color: SUB, marginTop: '3px' }}>{counter.stanceJa}</div>

                    <div style={{ marginTop: '14px', borderTop: `1px solid ${PAPER}`, paddingTop: '12px' }}>
                        {counter.essay.split('\n\n').map((p, i) => (
                            <p key={i} style={{ margin: '0 0 12px', fontSize: '14px', lineHeight: 1.95, color: INK, fontFamily: 'Georgia, serif' }}>
                                {p}
                            </p>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowJa(!showJa)}
                        style={{ fontSize: '11px', fontWeight: 800, color: SUB, background: '#fff', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer' }}
                    >
                        {showJa ? '訳を隠す' : '訳を見る'}
                    </button>
                    {showJa && (
                        <div style={{ marginTop: '10px', background: PAPER, borderRadius: '10px', padding: '12px 14px' }}>
                            {counter.essayJa.split('\n\n').map((p, i) => (
                                <p key={i} style={{ margin: '0 0 10px', fontSize: '12px', lineHeight: 1.95, color: SUB }}>{p}</p>
                            ))}
                        </div>
                    )}
                    <div style={{ fontSize: '10px', color: FAINT, marginTop: '10px', lineHeight: 1.8 }}>
                        {counter.wordCount}語。表と同じ普遍フレームで書いてある。同じ型に別の単語を入れると逆の意見になる。
                    </div>
                </div>
            )}

            {tab === 'spoken' && spoken && (
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: isMobile ? '16px' : '20px 22px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 900, color: FAINT, letterSpacing: '1px', marginBottom: '5px' }}>口語版(2分)</div>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: INK, lineHeight: 1.6 }}>{spoken.stance}</div>
                    <div style={{ fontSize: '11.5px', color: SUB, marginTop: '3px' }}>{spoken.stanceJa}</div>

                    <div style={{ marginTop: '12px', background: '#FEF9E7', border: '1px solid #EBD9A0', borderRadius: '10px', padding: '10px 12px' }}>
                        <div style={{ fontSize: '9.5px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '1px', marginBottom: '3px' }}>掴み直し(理解した合図)</div>
                        <div style={{ fontSize: '13px', color: INK, lineHeight: 1.7 }}>{spoken.hook}</div>
                        <div style={{ fontSize: '11px', color: SUB, marginTop: '2px' }}>{spoken.hookJa}</div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '12px', paddingTop: '10px', borderTop: `1px solid ${PAPER}` }}>
                        <div style={{ fontSize: '11.5px', fontWeight: 900, color: INK }}>
                            トレーニング登録 <span style={{ color: DEEPGREEN }}>{spokenDone}</span>
                            <span style={{ color: FAINT, fontWeight: 700 }}> / {spokenAll.length} 行</span>
                        </div>
                        <button
                            onClick={() => register(spokenAll, 'all')}
                            disabled={busy !== null || spokenDone === spokenAll.length}
                            style={{
                                marginLeft: 'auto', padding: '8px 16px', borderRadius: '9px',
                                cursor: busy || spokenDone === spokenAll.length ? 'default' : 'pointer',
                                border: 'none',
                                background: spokenDone === spokenAll.length ? '#D1FAE5' : busy === 'all' ? SUB : INK,
                                color: spokenDone === spokenAll.length ? DEEPGREEN : '#fff',
                                fontSize: '11.5px', fontWeight: 900,
                            }}
                        >
                            {busy === 'all' ? '登録中' : spokenDone === spokenAll.length ? 'この日は登録済み' : 'この日の口語版を全部登録'}
                        </button>
                    </div>

                    <div style={{ marginTop: '10px' }}>
                        {spokenAll.map((l, i) => {
                            const isDone = registered.has(l.en);
                            return (
                                <div key={i} style={{ display: 'flex', gap: '9px', padding: '7px 0', borderBottom: i === spokenAll.length - 1 ? 'none' : `1px solid ${PAPER}` }}>
                                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '10px', color: i === 0 ? DEEPGOLD : FAINT, minWidth: '20px', paddingTop: '3px' }}>
                                        {i === 0 ? '掴' : String(i).padStart(2, '0')}
                                    </span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '13.5px', lineHeight: 1.75, color: INK }}>{l.en}</div>
                                        <div style={{ fontSize: '11px', lineHeight: 1.75, color: SUB, marginTop: '2px' }}>{l.ja}</div>
                                    </div>
                                    <button
                                        onClick={() => register([l], `l${i}`)}
                                        disabled={isDone || busy !== null}
                                        title="この行だけ登録"
                                        style={{
                                            alignSelf: 'flex-start', flexShrink: 0, padding: '3px 8px', borderRadius: '7px',
                                            cursor: isDone || busy ? 'default' : 'pointer',
                                            border: `1px solid ${isDone ? GREEN : LINE}`,
                                            background: isDone ? '#D1FAE5' : '#fff',
                                            color: isDone ? DEEPGREEN : FAINT, fontSize: '9.5px', fontWeight: 900,
                                        }}
                                    >
                                        {isDone ? '済' : '登録'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ fontSize: '10px', color: FAINT, marginTop: '10px', lineHeight: 1.8 }}>
                        {spoken.wordCount}語。短いSVOと反復で組んである。論文体の語は使っていないので、そのまま口から出る。
                        1行が英文と訳の両方を持っているので、そのままカードとして復習できる。
                    </div>
                </div>
            )}
        </div>
    );
}
