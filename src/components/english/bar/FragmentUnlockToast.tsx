'use client';

/**
 * Silent Bartender — Fragment Unlock Toast.
 *
 * A subtle top-right notification that a new Gondo fragment was unlocked
 * on this night. Auto-dismisses after 5 seconds or on click.
 *
 * Light theme. No external deps. Inline styles.
 */

import { useEffect, useState } from 'react';
import type { GondoFragment } from '@/data/english/bar/gondo-fragments';

interface FragmentUnlockToastProps {
    fragment: GondoFragment | null;
    onDismiss: () => void;
}

const PAPER = '#FFFFFF';
const INK_DEEP = '#1C1917';
const INK_SOFT = '#57534E';
const GOLD = '#B8860B';
const GOLD_SOFT = '#D4AF37';
const BORDER = '#E7E0CC';

const AUTO_DISMISS_MS = 5000;

export default function FragmentUnlockToast({
    fragment,
    onDismiss,
}: FragmentUnlockToastProps) {
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        if (!fragment) {
            setEntered(false);
            return;
        }
        const raf = requestAnimationFrame(() => setEntered(true));
        const timeout = window.setTimeout(() => {
            onDismiss();
        }, AUTO_DISMISS_MS);
        return () => {
            cancelAnimationFrame(raf);
            window.clearTimeout(timeout);
        };
    }, [fragment, onDismiss]);

    if (!fragment) return null;

    return (
        <>
            <style>{`
                @keyframes gondo-toast-in {
                    from { opacity: 0; transform: translateX(24px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>

            <button
                type="button"
                onClick={onDismiss}
                aria-label="閉じる"
                style={{
                    position: 'fixed',
                    top: 12,
                    right: 12,
                    zIndex: 9999,
                    maxWidth: 'min(340px, calc(100vw - 24px))',
                    padding: 0,
                    background: PAPER,
                    border: `1px solid ${BORDER}`,
                    borderLeft: `3px solid ${GOLD}`,
                    borderRadius: 8,
                    boxShadow:
                        '0 10px 30px rgba(28,25,23,0.08), 0 2px 6px rgba(28,25,23,0.04)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    opacity: entered ? 1 : 0,
                    animation: entered
                        ? 'gondo-toast-in 420ms ease-out both'
                        : 'none',
                    transition: 'opacity 300ms ease',
                    fontFamily:
                        '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                }}
            >
                <div
                    style={{
                        padding: '10px 16px 4px',
                        fontSize: 10,
                        letterSpacing: '0.3em',
                        color: GOLD,
                        fontWeight: 500,
                    }}
                >
                    NIGHT {fragment.unlockAfterNights}
                </div>
                <div
                    style={{
                        padding: '0 16px 6px',
                        fontSize: 14,
                        color: INK_DEEP,
                        letterSpacing: '0.08em',
                        fontWeight: 500,
                    }}
                >
                    権藤の話が一つ増えた
                </div>
                <div
                    style={{
                        padding: '0 16px 14px',
                        fontSize: 13,
                        color: INK_SOFT,
                        letterSpacing: '0.05em',
                        borderTop: `1px dashed ${BORDER}`,
                        marginTop: 4,
                        paddingTop: 10,
                    }}
                >
                    <span style={{ color: GOLD_SOFT, marginRight: 6 }}>—</span>
                    {fragment.title}
                </div>
            </button>
        </>
    );
}
