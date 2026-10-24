'use client';

/**
 * VisualPrefsToggle — stacks above AudioToggle (bottom-right).
 *
 * Two small round buttons:
 *   - "Aa" : cycle text size (normal / large)
 *   - "HC" : toggle high-contrast
 *
 * Both persist to localStorage via hooks in
 * @/lib/english/bar/visual-prefs.
 */

import { useHighContrast, useTextSize } from '@/lib/english/bar/visual-prefs';

export default function VisualPrefsToggle() {
    const { enabled: hc, toggle: toggleHc } = useHighContrast();
    const { size, toggle: toggleSize } = useTextSize();

    const baseBtn =
        'fixed z-40 flex h-11 w-11 items-center justify-center rounded-full border bg-white/90 text-stone-600 shadow-sm backdrop-blur-sm transition-all hover:shadow-md';

    return (
        <>
            <button
                type="button"
                onClick={toggleSize}
                aria-pressed={size === 'large'}
                aria-label={size === 'large' ? '文字サイズを標準にする' : '文字サイズを大きくする'}
                title={size === 'large' ? '文字サイズ: 大' : '文字サイズ: 標準'}
                className={`${baseBtn} bottom-28 right-4 border-stone-200 hover:border-stone-300 hover:text-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700`}
                style={{
                    fontSize: size === 'large' ? 15 : 13,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
            >
                <span aria-hidden>Aa</span>
                <span className="sr-only">
                    {size === 'large' ? '文字サイズを標準にする' : '文字サイズを大きくする'}
                </span>
            </button>

            <button
                type="button"
                onClick={toggleHc}
                aria-pressed={hc}
                aria-label={hc ? 'ハイコントラストを切る' : 'ハイコントラストを入れる'}
                title={hc ? 'ハイコントラスト: ON' : 'ハイコントラスト: OFF'}
                className={`${baseBtn} bottom-16 right-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 ${
                    hc
                        ? 'border-stone-900 bg-white text-stone-900'
                        : 'border-stone-200 hover:border-stone-300 hover:text-stone-800'
                }`}
                style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: 1,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                }}
            >
                <span aria-hidden>HC</span>
                <span className="sr-only">
                    {hc ? 'ハイコントラストを切る' : 'ハイコントラストを入れる'}
                </span>
            </button>
        </>
    );
}
