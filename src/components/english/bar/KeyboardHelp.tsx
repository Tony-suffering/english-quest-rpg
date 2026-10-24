'use client';

/**
 * Silent Bartender -- keyboard shortcuts legend.
 *
 * A small "?" button bottom-left on the playing screen that opens
 * a transient cheat sheet. Very subtle, easy to ignore, lifesaver
 * for desktop players who never discovered the 1-5 shortcuts.
 */

import { useEffect, useState } from 'react';

const C = {
    card: '#FFFFFF',
    border: '#E5DCC0',
    amber: '#B8860B',
    amberBg: '#FFF5D1',
    text: '#1C1917',
    textDim: '#57534E',
    overlay: 'rgba(250,246,236,0.95)',
};

const SHORTCUTS: Array<{ key: string; label: string }> = [
    { key: '1 - 5', label: 'カードを選ぶ' },
    { key: 'Tab', label: 'カードをフォーカス移動' },
    { key: '↑ ↓ ← →', label: 'フォーカス移動' },
    { key: 'Enter / Space', label: 'フォーカス中のカードを確定' },
    { key: 'Esc', label: 'フォーカス解除' },
    { key: 'M', label: '音を切る / 出す' },
    { key: '?', label: 'このヘルプを開く / 閉じる' },
];

export default function KeyboardHelp() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
                const target = e.target as HTMLElement | null;
                const tag = target?.tagName;
                if (tag === 'INPUT' || tag === 'TEXTAREA') return;
                setOpen(o => !o);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <>
            <button
                onClick={() => setOpen(o => !o)}
                title="キーボード (?)"
                aria-label="キーボードショートカット"
                style={{
                    position: 'fixed', bottom: 16, left: 16,
                    width: 44, height: 44, borderRadius: '50%',
                    background: C.card, color: C.textDim,
                    border: `1px solid ${C.border}`,
                    fontSize: 16, fontWeight: 700, cursor: 'pointer',
                    zIndex: 50, lineHeight: 1,
                }}
            >
                ?
            </button>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 100,
                        background: C.overlay,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: 20,
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: C.card, border: `1px solid ${C.border}`,
                            borderRadius: 14, padding: '20px 22px',
                            maxWidth: 360, width: '100%',
                            boxShadow: '0 8px 24px rgba(28,25,23,0.08)',
                        }}
                    >
                        <div style={{
                            fontSize: 10, letterSpacing: 3, fontWeight: 800,
                            color: C.amber, marginBottom: 14,
                        }}>
                            KEYBOARD
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {SHORTCUTS.map((s, i) => (
                                <div key={i} style={{
                                    display: 'flex', justifyContent: 'space-between',
                                    alignItems: 'center', gap: 12,
                                }}>
                                    <span style={{
                                        fontSize: 11, color: C.text,
                                        background: C.amberBg,
                                        border: `1px solid ${C.amber}33`,
                                        padding: '3px 10px', borderRadius: 6,
                                        fontWeight: 700, letterSpacing: 1,
                                        fontFamily: 'monospace',
                                    }}>
                                        {s.key}
                                    </span>
                                    <span style={{
                                        fontSize: 12, color: C.textDim,
                                        textAlign: 'right',
                                    }}>
                                        {s.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div style={{
                            marginTop: 16, fontSize: 10, color: C.textDim,
                            textAlign: 'center',
                        }}>
                            タップして閉じる
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
