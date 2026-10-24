'use client';

/**
 * Silent Bartender — visual preferences.
 *
 * Two persistent user settings that complement `useReducedMotion()`:
 *
 *   - useHighContrast(): toggles the `.bar-high-contrast` class on
 *     <html>. CSS lives in this file (injected once on mount) so the
 *     game doesn't need global stylesheet changes. Persisted to
 *     localStorage under `tonio-bar-contrast`.
 *
 *   - useTextSize(): 'normal' | 'large'. Applied as a
 *     `data-bar-text-size` attribute on <html>. CSS scales bar/
 *     components up ~12% when 'large'. Persisted under
 *     `tonio-bar-text-size`.
 *
 * Both hooks are SSR-safe: they read localStorage only after mount
 * to avoid hydration mismatches. Values default to off / normal.
 */

import { useCallback, useEffect, useState } from 'react';

const LS_CONTRAST = 'tonio-bar-contrast';
const LS_TEXT_SIZE = 'tonio-bar-text-size';
const CLASS_HC = 'bar-high-contrast';
const ATTR_TEXT = 'data-bar-text-size';
const STYLE_TAG_ID = 'bar-visual-prefs-style';

export type TextSize = 'normal' | 'large';

// ────────────────────────────────────────────────────────────
// One-time injected stylesheet. Light-theme high-contrast:
// darker ink, thicker borders, no subtle tints. Text-size 'large'
// bumps bar/ component text ~12%.
// ────────────────────────────────────────────────────────────
const STYLES = `
.${CLASS_HC} {
    --bar-text: #000000;
    --bar-text-dim: #1C1917;
    --bar-border: #1C1917;
    --bar-amber: #6B4E00;
}
.${CLASS_HC} [class*="bar-"],
.${CLASS_HC} [data-bar-scope] {
    color: var(--bar-text);
}
/* Strengthen any inline-styled card/border/text under the bar/ tree */
.${CLASS_HC} [data-bar-scope] button,
.${CLASS_HC} [data-bar-scope] [role="radio"],
.${CLASS_HC} [data-bar-scope] [role="radiogroup"],
.${CLASS_HC} [data-bar-scope] [role="dialog"],
.${CLASS_HC} [data-bar-scope] [role="status"] {
    border-color: #1C1917 !important;
    border-width: 2px !important;
    color: #000000 !important;
}
.${CLASS_HC} [data-bar-scope] :focus-visible {
    outline: 3px solid #000000 !important;
    outline-offset: 2px !important;
    box-shadow: none !important;
}
html[${ATTR_TEXT}="large"] [data-bar-scope] {
    font-size: 112.5%;
}
/* Ensure every button in the bar/ tree has a visible focus ring */
[data-bar-scope] button:focus-visible,
[data-bar-scope] a:focus-visible,
[data-bar-scope] [role="radio"]:focus-visible {
    outline: 2px solid #B8860B;
    outline-offset: 2px;
}
`;

function ensureStyleTag() {
    if (typeof document === 'undefined') return;
    if (document.getElementById(STYLE_TAG_ID)) return;
    const el = document.createElement('style');
    el.id = STYLE_TAG_ID;
    el.textContent = STYLES;
    document.head.appendChild(el);
}

// ────────────────────────────────────────────────────────────
// High-contrast toggle
// ────────────────────────────────────────────────────────────
export function useHighContrast(): {
    enabled: boolean;
    toggle: () => void;
} {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        ensureStyleTag();
        try {
            const v = window.localStorage.getItem(LS_CONTRAST);
            if (v === '1') setEnabled(true);
        } catch {
            // localStorage unavailable (private mode etc.)
        }
    }, []);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        const root = document.documentElement;
        if (enabled) root.classList.add(CLASS_HC);
        else root.classList.remove(CLASS_HC);
    }, [enabled]);

    const toggle = useCallback(() => {
        setEnabled(prev => {
            const next = !prev;
            try {
                window.localStorage.setItem(LS_CONTRAST, next ? '1' : '0');
            } catch {
                // ignore
            }
            return next;
        });
    }, []);

    return { enabled, toggle };
}

// ────────────────────────────────────────────────────────────
// Text size toggle (normal / large)
// ────────────────────────────────────────────────────────────
export function useTextSize(): {
    size: TextSize;
    toggle: () => void;
    setSize: (s: TextSize) => void;
} {
    const [size, setSizeState] = useState<TextSize>('normal');

    useEffect(() => {
        ensureStyleTag();
        try {
            const v = window.localStorage.getItem(LS_TEXT_SIZE);
            if (v === 'large') setSizeState('large');
        } catch {
            // ignore
        }
    }, []);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        document.documentElement.setAttribute(ATTR_TEXT, size);
    }, [size]);

    const setSize = useCallback((s: TextSize) => {
        setSizeState(s);
        try {
            window.localStorage.setItem(LS_TEXT_SIZE, s);
        } catch {
            // ignore
        }
    }, []);

    const toggle = useCallback(() => {
        setSizeState(prev => {
            const next: TextSize = prev === 'normal' ? 'large' : 'normal';
            try {
                window.localStorage.setItem(LS_TEXT_SIZE, next);
            } catch {
                // ignore
            }
            return next;
        });
    }, []);

    return { size, toggle, setSize };
}
