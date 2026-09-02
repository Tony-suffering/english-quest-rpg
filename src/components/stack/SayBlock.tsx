
'use client';

import { useRef, useState } from 'react';
import { T, MONO } from '@/data/stack/theme';
import type { Block } from '@/data/stack/lesson-types';

const STYLE: Record<Block['kind'], { label: string; color: string; bg: string; border: string }> = {
    say:    { label: 'Claude Code にこう言う', color: '#166534', bg: '#F0FDF4', border: '#86EFAC' },
    type:   { label: '黒い画面にこれを打つ',   color: '#1E293B', bg: '#F1F5F9', border: '#CBD5E1' },
    hand:   { label: '自分の手でやる',         color: '#9A3412', bg: '#FFF7ED', border: '#FDBA74' },
    expect: { label: 'こうなったら成功',       color: '#57534E', bg: '#FFFFFF', border: '#E7E5E4' },
    check:  { label: '確かめること',           color: '#92700F', bg: '#FFFBEB', border: '#FCD34D' },
    note:   { label: 'ひとこと',               color: '#78716C', bg: '#FAFAF9', border: '#E7E5E4' },
};

/** say と type だけコピーボタンを出す。読み物の部分にボタンは要らない */
const COPYABLE = new Set<Block['kind']>(['say', 'type']);

export function SayBlock({ block }: { block: Block }) {
    const [state, setState] = useState<'idle' | 'ok' | 'manual'>('idle');
    const bodyRef = useRef<HTMLDivElement>(null);
    const s = STYLE[block.kind];
    const copyable = COPYABLE.has(block.kind);
    const mono = block.kind === 'type';

    // コピーが黙って失敗するのが一番たちが悪い。
    // 失敗したら本文を選択状態にして「長押しでコピー」に切り替える。
    async function copy() {
        try {
            await navigator.clipboard.writeText(block.text);
            setState('ok');
            setTimeout(() => setState('idle'), 1600);
            return;
        } catch {
            // 下へ
        }
        const el = bodyRef.current;
        if (el) {
            const range = document.createRange();
            range.selectNodeContents(el);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
        }
        setState('manual');
    }

    const label = state === 'ok' ? 'コピーした' : state === 'manual' ? '選択したので長押し' : 'コピー';

    return (
        <div style={{ margin: '16px 0' }}>
            <div style={{
                border: `1px solid ${s.border}`,
                borderLeft: `4px solid ${s.color}`,
                borderRadius: 10,
                backgroundColor: s.bg,
                overflow: 'hidden',
            }}>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: 10, padding: '7px 12px',
                    borderBottom: `1px solid ${s.border}`,
                }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: s.color, letterSpacing: '0.04em' }}>
                        {s.label}
                    </span>
                    {copyable && (
                        <button
                            onClick={copy}
                            style={{
                                fontSize: 11, fontWeight: 800, cursor: 'pointer',
                                padding: '4px 12px', borderRadius: 999,
                                border: `1px solid ${s.color}44`,
                                backgroundColor: state === 'ok' ? s.color : '#FFFFFF',
                                color: state === 'ok' ? '#FFFFFF' : s.color,
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {label}
                        </button>
                    )}
                </div>

                <div ref={bodyRef} style={{
                    padding: '13px 14px',
                    fontSize: mono ? 13.5 : 14.5,
                    fontFamily: mono ? MONO : 'inherit',
                    lineHeight: mono ? 1.7 : 1.95,
                    color: T.text,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontWeight: copyable ? 600 : 400,
                }}>
                    {block.text}
                </div>
            </div>

            {block.why && (
                <p style={{
                    margin: '7px 2px 0', fontSize: 12.5, color: T.textSub,
                    lineHeight: 1.85, borderLeft: `2px solid ${T.gold}`, paddingLeft: 10,
                }}>
                    なぜこう言うか　{block.why}
                </p>
            )}
        </div>
    );
}
