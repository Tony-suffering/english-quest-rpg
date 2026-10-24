'use client';

/**
 * Silent Bartender — Milestone Overlay.
 *
 * A full-screen overlay shown on the night a milestone fires
 * (e.g. 100th night, 1-year anniversary). Paper-amber palette, large
 * title, body prose, single dismiss button. Subtle fade-in, no shake.
 *
 * If `milestone` is null, renders nothing.
 *
 * Light theme. Inline styles. No external deps.
 */

import { useEffect, useState } from 'react';
import type { Milestone } from '@/data/english/bar/milestones';

interface MilestoneOverlayProps {
    milestone: Milestone | null;
    onDismiss: () => void;
}

const PAPER = '#FBF7EC';
const PAPER_DEEP = '#F4ECD4';
const INK_DEEP = '#1C1917';
const INK_SOFT = '#57534E';
const GOLD = '#B8860B';
const GOLD_SOFT = '#D4AF37';
const BORDER = '#E7E0CC';

const TIER_LABEL: Record<Milestone['tier'], string> = {
    small: 'MILESTONE',
    big: 'ANNIVERSARY',
    legendary: 'LEGEND',
};

export default function MilestoneOverlay({
    milestone,
    onDismiss,
}: MilestoneOverlayProps) {
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        if (!milestone) {
            setEntered(false);
            return;
        }
        const raf = requestAnimationFrame(() => setEntered(true));
        return () => cancelAnimationFrame(raf);
    }, [milestone]);

    if (!milestone) return null;

    const tierLabel = TIER_LABEL[milestone.tier];
    const isLegendary = milestone.tier === 'legendary';

    return (
        <>
            <style>{`
                @keyframes milestone-fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes milestone-rise {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div
                role="dialog"
                aria-modal="true"
                aria-label={milestone.title}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 10000,
                    background:
                        `radial-gradient(ellipse at center, ${PAPER} 0%, ${PAPER_DEEP} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 24,
                    animation: entered
                        ? 'milestone-fade-in 600ms ease-out both'
                        : 'none',
                    opacity: entered ? 1 : 0,
                    fontFamily:
                        '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                }}
            >
                <div
                    style={{
                        maxWidth: 560,
                        width: '100%',
                        textAlign: 'center',
                        animation: entered
                            ? 'milestone-rise 900ms ease-out 200ms both'
                            : 'none',
                    }}
                >
                    <div
                        style={{
                            fontSize: 11,
                            letterSpacing: '0.5em',
                            color: GOLD,
                            fontWeight: 500,
                            marginBottom: 24,
                            paddingLeft: '0.5em',
                        }}
                    >
                        {tierLabel}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 16,
                            marginBottom: 32,
                        }}
                    >
                        <span
                            style={{
                                flex: '0 0 48px',
                                height: 1,
                                background: GOLD_SOFT,
                            }}
                        />
                        <span
                            style={{
                                fontSize: 13,
                                letterSpacing: '0.3em',
                                color: INK_SOFT,
                                fontWeight: 500,
                                paddingLeft: '0.3em',
                            }}
                        >
                            NIGHT {milestone.nights}
                        </span>
                        <span
                            style={{
                                flex: '0 0 48px',
                                height: 1,
                                background: GOLD_SOFT,
                            }}
                        />
                    </div>

                    <h2
                        style={{
                            fontSize: isLegendary ? 40 : 32,
                            lineHeight: 1.3,
                            letterSpacing: '0.15em',
                            color: INK_DEEP,
                            fontWeight: 500,
                            margin: '0 0 28px',
                            paddingLeft: '0.15em',
                        }}
                    >
                        {milestone.title}
                    </h2>

                    <p
                        style={{
                            fontSize: 15,
                            lineHeight: 2,
                            color: INK_DEEP,
                            letterSpacing: '0.08em',
                            margin: '0 auto 40px',
                            maxWidth: 480,
                            textAlign: 'left',
                        }}
                    >
                        {milestone.body}
                    </p>

                    <button
                        type="button"
                        onClick={onDismiss}
                        style={{
                            padding: '12px 40px',
                            background: 'transparent',
                            border: `1px solid ${GOLD}`,
                            borderRadius: 2,
                            color: GOLD,
                            fontSize: 12,
                            letterSpacing: '0.4em',
                            fontWeight: 500,
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            paddingLeft: 'calc(40px + 0.4em)',
                            transition:
                                'background 200ms ease, color 200ms ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = GOLD;
                            e.currentTarget.style.color = PAPER;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = GOLD;
                        }}
                    >
                        暖簾を下ろす
                    </button>

                    <div
                        style={{
                            marginTop: 48,
                            fontSize: 10,
                            letterSpacing: '0.3em',
                            color: INK_SOFT,
                            opacity: 0.6,
                            borderTop: `1px dashed ${BORDER}`,
                            paddingTop: 16,
                            maxWidth: 280,
                            margin: '48px auto 0',
                        }}
                    >
                        SILENT BARTENDER
                    </div>
                </div>
            </div>
        </>
    );
}
