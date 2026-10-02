// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/components/english/WriteFrameTable.tsx
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
'use client';

/**
 * 型の表 -- 模範解答を「役割ラベル + 型(X/Y/Z の穴)」に還元して並べる。
 *
 * 3つの見方を切り替える:
 *   型      左に役割、右に穴あきの型。何も埋まっていない状態。これが在庫の正体
 *   埋める  穴に自分で単語を入れるゲーム。答え合わせでその日の中身と照合
 *   原文    型に中身が入った完成文(= write-eiken1.ts の原文)
 *
 * 型 + 中身 = 原文 は scripts/verify-write-frames.cjs が機械検査している。
 * つまりこの表は原文を要約したものではなく、原文と等価な分解になっている。
 */

import { useMemo, useState } from 'react';
import type { EssayFrameDay, EssayFrame } from '@/data/english/write-frames-types';
import { ROLE_BY_ID } from '@/data/english/write-frames-types';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';
const PAPER = '#FAF8F2';

type View = 'frame' | 'fill' | 'full';

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** 型の X/Y/Z を <slot> に割って描く */
function renderFrame(frame: string, render: (letter: string, i: number) => React.ReactNode) {
    const parts = frame.split(/(?<![A-Za-z])([XYZ])(?![A-Za-z])/g);
    let n = 0;
    return parts.map((p, i) =>
        /^[XYZ]$/.test(p) ? <span key={i}>{render(p, n++)}</span> : <span key={i}>{p}</span>,
    );
}

export function WriteFrameTable({ data, isMobile }: { data: EssayFrameDay; isMobile: boolean }) {
    const [view, setView] = useState<View>('frame');
    const [input, setInput] = useState<Record<string, string>>({});
    const [checked, setChecked] = useState(false);

    const totalSlots = useMemo(
        () => data.frames.reduce((n, f) => n + Object.keys(f.slots).length, 0),
        [data],
    );
    const correct = useMemo(() => {
        if (!checked) return 0;
        let n = 0;
        for (const [fi, f] of data.frames.entries()) {
            for (const k of Object.keys(f.slots)) {
                if (norm(input[`${fi}:${k}`] ?? '') === norm(f.slots[k])) n++;
            }
        }
        return n;
    }, [checked, input, data]);

    const tab = (key: View, label: string, sub: string) => {
        const on = view === key;
        return (
            <button
                key={key}
                onClick={() => setView(key)}
                style={{
                    flex: 1, padding: '8px 6px', borderRadius: '10px', cursor: 'pointer',
                    border: on ? `2px solid ${GOLD}` : `1px solid ${LINE}`,
                    background: on ? '#FEF9E7' : '#fff', textAlign: 'center',
                }}
            >
                <div style={{ fontSize: '12px', fontWeight: 900, color: on ? DEEPGOLD : SUB }}>{label}</div>
                <div style={{ fontSize: '9.5px', color: FAINT, marginTop: '1px' }}>{sub}</div>
            </button>
        );
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                {tab('frame', '型', '穴あきの骨格')}
                {tab('fill', '埋める', '単語を入れるゲーム')}
                {tab('full', '原文', '中身が入った完成文')}
            </div>

            <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.9, marginBottom: '12px', background: PAPER, border: `1px solid ${LINE}`, borderRadius: '10px', padding: '10px 12px' }}>
                模範解答を <strong style={{ color: INK }}>役割ラベル + 型</strong> に還元したもの。
                型の X / Y / Z にその日の単語を入れると原文に戻る(機械検査済み)。
                つまり覚えるのは{data.frames.length}行の型だけで、あとは<strong style={{ color: INK }}>単語を入れ替えるゲーム</strong>になる。
            </div>

            {view === 'fill' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setChecked(true)}
                        style={{ padding: '8px 16px', borderRadius: '9px', border: 'none', background: INK, color: '#fff', fontSize: '11.5px', fontWeight: 900, cursor: 'pointer' }}
                    >
                        答え合わせ
                    </button>
                    <button
                        onClick={() => { setInput({}); setChecked(false); }}
                        style={{ padding: '8px 14px', borderRadius: '9px', border: `1px solid ${LINE}`, background: '#fff', color: SUB, fontSize: '11.5px', fontWeight: 900, cursor: 'pointer' }}
                    >
                        消す
                    </button>
                    {checked && (
                        <span style={{ fontSize: '12px', fontWeight: 900, color: correct === totalSlots ? DEEPGREEN : DEEPGOLD }}>
                            {correct} / {totalSlots} 一致
                        </span>
                    )}
                    <span style={{ fontSize: '10px', color: FAINT }}>
                        別の単語でも英語として成立すればいい。ここは原文との一致だけを見る
                    </span>
                </div>
            )}

            <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
                {data.frames.map((f, fi) => (
                    <Row
                        key={fi}
                        f={f}
                        fi={fi}
                        view={view}
                        input={input}
                        setInput={setInput}
                        checked={checked}
                        isMobile={isMobile}
                        last={fi === data.frames.length - 1}
                    />
                ))}
            </div>
        </div>
    );
}

function Row({
    f, fi, view, input, setInput, checked, isMobile, last,
}: {
    f: EssayFrame; fi: number; view: View;
    input: Record<string, string>; setInput: (v: Record<string, string>) => void;
    checked: boolean; isMobile: boolean; last: boolean;
}) {
    const role = ROLE_BY_ID[f.role];
    const letters = Object.keys(f.slots);

    return (
        <div style={{
            display: 'flex', gap: isMobile ? '8px' : '12px', padding: '10px 12px',
            borderBottom: last ? 'none' : `1px solid ${PAPER}`, alignItems: 'flex-start',
        }}>
            <div style={{ flexShrink: 0, width: isMobile ? '34px' : '44px', paddingTop: '2px' }}>
                <div style={{ fontSize: '10px', fontWeight: 900, color: role.color }}>{role.label}</div>
                <div style={{ height: '2px', background: role.color, borderRadius: '1px', marginTop: '3px', opacity: 0.5 }} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
                {view === 'full' ? (
                    <div style={{ fontSize: '13px', lineHeight: 1.75, color: INK }}>{f.original}</div>
                ) : (
                    <div style={{ fontSize: '13px', lineHeight: 2.1, color: INK }}>
                        {renderFrame(f.frame, (letter) => {
                            if (view === 'frame') {
                                return (
                                    <span style={{
                                        display: 'inline-block', minWidth: '22px', textAlign: 'center',
                                        background: '#FEF9E7', border: `1px solid #EBD9A0`, borderRadius: '5px',
                                        color: DEEPGOLD, fontWeight: 900, padding: '0 5px', margin: '0 2px',
                                    }}>
                                        {letter}
                                    </span>
                                );
                            }
                            const key = `${fi}:${letter}`;
                            const val = input[key] ?? '';
                            const ok = checked && norm(val) === norm(f.slots[letter] ?? '');
                            const ng = checked && !ok;
                            return (
                                <input
                                    value={val}
                                    onChange={(e) => setInput({ ...input, [key]: e.target.value })}
                                    placeholder={letter}
                                    style={{
                                        width: `${Math.max(60, Math.min(240, (f.slots[letter] ?? '').length * 7))}px`,
                                        margin: '0 3px', padding: '2px 7px', fontSize: '12.5px',
                                        border: `1px solid ${ok ? GREEN : ng ? '#E7A94B' : LINE}`,
                                        background: ok ? '#ECFDF5' : ng ? '#FFFBEB' : '#fff',
                                        borderRadius: '6px', outline: 'none', color: INK,
                                    }}
                                />
                            );
                        })}
                    </div>
                )}

                <div style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.7, marginTop: '3px' }}>{f.ja}</div>

                {view === 'fill' && checked && (
                    <div style={{ fontSize: '10.5px', color: DEEPGOLD, marginTop: '4px' }}>
                        {letters.map((k) => `${k} = ${f.slots[k]}`).join('   ')}
                    </div>
                )}
            </div>
        </div>
    );
}
