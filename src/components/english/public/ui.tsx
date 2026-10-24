'use client';

/**
 * 公開版(とにおラボ)の共通部品
 * 色はサイトの既定: 金 #D4AF37 / 緑 #10B981 / 石の灰色。背景は常に明るい。
 */

import Link from 'next/link';
import type { ReactNode, CSSProperties } from 'react';

export const C = {
    gold: '#D4AF37',
    deepGold: '#9A7B16',
    green: '#10B981',
    deepGreen: '#047857',
    ink: '#1C1917',
    body: '#44403C',
    sub: '#78716C',
    faint: '#A8A29E',
    line: '#E7E5E4',
    bg: '#FAFAF9',
    paper: '#FFFFFF',
    red: '#B91C1C',
    redBg: '#FEF2F2',
} as const;

export const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A7B16]';

export function PageShell({ children, width = 640 }: { children: ReactNode; width?: number }) {
    return (
        <div className="min-h-screen bg-[#FAFAF9] px-4 pt-6 pb-28 md:px-6 md:pt-10 md:pb-16" style={{ overflowX: 'hidden' }}>
            <div className="mx-auto w-full" style={{ maxWidth: width }}>{children}</div>
        </div>
    );
}

export function Kicker({ children, color = C.faint }: { children: ReactNode; color?: string }) {
    return <div className="text-[10px] font-bold tracking-[0.28em] mb-2" style={{ color }}>{children}</div>;
}

export function H1({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
    return (
        <div className="mb-5">
            <h1 className="text-[24px] md:text-[28px] font-black leading-snug tracking-tight" style={{ color: C.ink }}>{children}</h1>
            {sub && <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: C.sub }}>{sub}</p>}
        </div>
    );
}

export function H2({ children, note }: { children: ReactNode; note?: ReactNode }) {
    return (
        <div className="mt-8 mb-3 flex items-baseline justify-between gap-3">
            <h2 className="text-[15px] font-black tracking-wide" style={{ color: C.ink }}>{children}</h2>
            {note && <span className="text-[11px]" style={{ color: C.faint }}>{note}</span>}
        </div>
    );
}

export function Card({ children, className = '', style, accent }: { children: ReactNode; className?: string; style?: CSSProperties; accent?: string }) {
    return (
        <div
            className={`rounded-2xl border bg-white shadow-sm ${className}`}
            style={{ borderColor: C.line, borderLeft: accent ? `4px solid ${accent}` : undefined, ...style }}
        >
            {children}
        </div>
    );
}

type BtnVariant = 'gold' | 'ink' | 'outline' | 'ghost' | 'green';

const VARIANT: Record<BtnVariant, string> = {
    gold: 'bg-[#D4AF37] text-[#1C1917] hover:bg-[#C9A633] shadow-[0_4px_14px_rgba(212,175,55,0.28)]',
    green: 'bg-[#10B981] text-white hover:bg-[#0EA371]',
    ink: 'bg-[#1C1917] text-white hover:bg-[#292524]',
    outline: 'bg-white text-[#1C1917] border border-[#D6D3D1] hover:bg-[#F5F5F4]',
    ghost: 'bg-transparent text-[#78716C] hover:bg-[#F5F5F4]',
};

export function Button({
    children, onClick, href, variant = 'gold', disabled, full = true, size = 'lg', ariaLabel, type = 'button', className = '',
}: {
    children: ReactNode; onClick?: () => void; href?: string; variant?: BtnVariant; disabled?: boolean;
    full?: boolean; size?: 'lg' | 'md' | 'sm'; ariaLabel?: string; type?: 'button' | 'submit'; className?: string;
}) {
    const sizeCls = size === 'lg' ? 'min-h-[52px] px-5 text-[15px]' : size === 'md' ? 'min-h-[44px] px-4 text-[14px]' : 'min-h-[36px] px-3 text-[13px]';
    const cls = `inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-colors select-none ${sizeCls} ${VARIANT[variant]} ${full ? 'w-full' : ''} ${disabled ? 'opacity-40 pointer-events-none' : 'cursor-pointer'} ${FOCUS} ${className}`;
    if (href && !disabled) {
        return <Link href={href} className={cls} aria-label={ariaLabel} style={{ textDecoration: 'none' }}>{children}</Link>;
    }
    return <button type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel} className={cls}>{children}</button>;
}

export function Notice({ children, tone = 'info' }: { children: ReactNode; tone?: 'info' | 'warn' }) {
    const bg = tone === 'warn' ? C.redBg : '#FFFBEB';
    const bd = tone === 'warn' ? '#FECACA' : '#FDE68A';
    const fg = tone === 'warn' ? C.red : '#92400E';
    return (
        <div role={tone === 'warn' ? 'alert' : 'status'} className="rounded-xl px-4 py-3 text-[12.5px] leading-relaxed" style={{ background: bg, border: `1px solid ${bd}`, color: fg }}>
            {children}
        </div>
    );
}

export function Footnote({ children }: { children: ReactNode }) {
    return <p className="mt-6 text-[11.5px] leading-relaxed" style={{ color: C.faint }}>{children}</p>;
}

export function LinkRow({ href, title, desc, external }: { href: string; title: string; desc?: string; external?: boolean }) {
    const inner = (
        <div className={`flex items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3 hover:bg-[#FAFAF9] transition-colors ${FOCUS}`} style={{ borderColor: C.line }}>
            <div className="min-w-0">
                <div className="text-[14px] font-bold" style={{ color: C.ink }}>{title}</div>
                {desc && <div className="text-[12px] leading-relaxed mt-0.5" style={{ color: C.sub }}>{desc}</div>}
            </div>
            <span className="shrink-0 text-[12px]" style={{ color: C.faint }}>{external ? '別サイト' : '開く'}</span>
        </div>
    );
    if (external) return <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{inner}</a>;
    return <Link href={href} style={{ textDecoration: 'none' }}>{inner}</Link>;
}

export function Skeleton({ h = 120 }: { h?: number }) {
    return <div className="rounded-2xl animate-pulse" style={{ height: h, background: '#EFEDEA' }} aria-hidden />;
}
