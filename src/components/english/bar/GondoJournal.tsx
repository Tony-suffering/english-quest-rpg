'use client';

/**
 * Silent Bartender — Gondo Journal.
 *
 * Displays unlocked backstory fragments as pages of a handwritten-feeling
 * notebook. Light theme paper, gold accent, serif Japanese body.
 * No external deps. Inline styles.
 */

import { useEffect, useState } from 'react';
import type { GondoFragment } from '@/data/english/bar/gondo-fragments';
import type { BarFragment } from '@/data/english/bar/bar-fragments';
import type { BarSecret } from '@/data/english/bar/bar-secrets';
import type { TrainingEpisode } from '@/data/english/bar/training-episodes';

interface GondoJournalProps {
    unlockedFragments: GondoFragment[];
    unlockedBarFragments?: BarFragment[];
    revealedSecrets?: BarSecret[];
    trainingEpisodes?: TrainingEpisode[];
}

const PAPER_LIGHT = '#FAF6EC';
const PAPER_WHITE = '#FFFFFF';
const INK_DEEP = '#1C1917';
const INK_SOFT = '#44403C';
const GOLD = '#B8860B';
const GOLD_SOFT = '#D4AF37';
const BORDER = '#E7E0CC';

export default function GondoJournal({ unlockedFragments, unlockedBarFragments = [], revealedSecrets = [], trainingEpisodes = [] }: GondoJournalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(id);
    }, []);

    if (unlockedFragments.length === 0 && unlockedBarFragments.length === 0 && revealedSecrets.length === 0 && trainingEpisodes.length === 0) {
        return (
            <div
                style={{
                    maxWidth: 500,
                    margin: '0 auto',
                    padding: '64px 32px',
                    background: PAPER_LIGHT,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 12,
                    textAlign: 'center',
                    color: INK_SOFT,
                    fontFamily:
                        '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                }}
            >
                <style>{`
                    @keyframes gondo-journal-fade-in {
                        from { opacity: 0; transform: translateY(8px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
                <div
                    style={{
                        opacity: mounted ? 1 : 0,
                        animation: mounted
                            ? 'gondo-journal-fade-in 600ms ease-out both'
                            : 'none',
                        fontSize: 15,
                        letterSpacing: '0.08em',
                    }}
                >
                    まだ何も知らない
                </div>
                <div
                    style={{
                        marginTop: 18,
                        fontSize: 12,
                        color: '#A8A29E',
                        letterSpacing: '0.05em',
                    }}
                >
                    夜を重ねると、権藤の話が少しずつ見えてくる。
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                maxWidth: 500,
                margin: '0 auto',
                padding: '24px 12px 48px',
            }}
        >
            <style>{`
                @keyframes gondo-journal-fade-in {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            {trainingEpisodes.length > 0 && (
                <>
                    <header
                        style={{
                            textAlign: 'center',
                            marginBottom: 24,
                            paddingBottom: 16,
                            borderBottom: `1px solid ${BORDER}`,
                            opacity: mounted ? 1 : 0,
                            animation: mounted
                                ? 'gondo-journal-fade-in 500ms ease-out both'
                                : 'none',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                letterSpacing: '0.3em',
                                color: GOLD,
                                fontWeight: 500,
                            }}
                        >
                            APPRENTICE — TRAINING
                        </div>
                        <div
                            style={{
                                marginTop: 6,
                                fontSize: 18,
                                letterSpacing: '0.15em',
                                color: INK_DEEP,
                                fontFamily:
                                    '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                            }}
                        >
                            修行の記憶
                        </div>
                    </header>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>
                        {trainingEpisodes.map((ep, idx) => (
                            <article
                                key={ep.id}
                                style={{
                                    background: idx % 2 === 0 ? PAPER_LIGHT : PAPER_WHITE,
                                    border: `1px solid ${BORDER}`,
                                    borderRadius: 10,
                                    overflow: 'hidden',
                                    boxShadow: '0 1px 2px rgba(28,25,23,0.04)',
                                    opacity: mounted ? 1 : 0,
                                    animation: mounted
                                        ? `gondo-journal-fade-in 600ms ease-out ${idx * 70}ms both`
                                        : 'none',
                                }}
                            >
                                <div
                                    style={{
                                        padding: '8px 16px',
                                        color: INK_DEEP,
                                        fontSize: 13,
                                        letterSpacing: '0.15em',
                                        fontWeight: 600,
                                        fontFamily:
                                            '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                                        borderBottom: `1px solid ${BORDER}`,
                                    }}
                                >
                                    {ep.title}
                                </div>
                                <div style={{
                                    padding: '6px 16px 2px',
                                    fontSize: 10,
                                    letterSpacing: 2,
                                    color: GOLD,
                                }}>
                                    {ep.setting}
                                </div>
                                <div
                                    style={{
                                        padding: '10px 22px 14px',
                                        color: INK_DEEP,
                                        fontSize: 14,
                                        lineHeight: 1.9,
                                        letterSpacing: '0.04em',
                                        fontFamily:
                                            '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    {ep.body}
                                </div>
                                {ep.lesson && (
                                    <div style={{
                                        padding: '4px 22px 14px',
                                        color: INK_SOFT,
                                        fontSize: 12,
                                        fontStyle: 'italic',
                                        borderTop: `1px dashed ${BORDER}`,
                                        marginTop: 2,
                                        paddingTop: 10,
                                        fontFamily:
                                            '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                                    }}>
                                        — {ep.lesson}
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </>
            )}

            {unlockedFragments.length > 0 && (
                <>
                    <header
                        style={{
                            textAlign: 'center',
                            marginBottom: 24,
                            paddingBottom: 16,
                            borderBottom: `1px solid ${BORDER}`,
                            opacity: mounted ? 1 : 0,
                            animation: mounted
                                ? 'gondo-journal-fade-in 500ms ease-out both'
                                : 'none',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                letterSpacing: '0.3em',
                                color: GOLD,
                                fontWeight: 500,
                            }}
                        >
                            GONDO — FRAGMENTS
                        </div>
                        <div
                            style={{
                                marginTop: 6,
                                fontSize: 18,
                                letterSpacing: '0.15em',
                                color: INK_DEEP,
                                fontFamily:
                                    '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                            }}
                        >
                            権藤の記憶
                        </div>
                    </header>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {unlockedFragments.map((frag, idx) => (
                            <article
                                key={frag.id}
                                style={{
                                    background: idx % 2 === 0 ? PAPER_LIGHT : PAPER_WHITE,
                                    border: `1px solid ${BORDER}`,
                                    borderRadius: 10,
                                    overflow: 'hidden',
                                    boxShadow: '0 1px 2px rgba(28,25,23,0.04)',
                                    opacity: mounted ? 1 : 0,
                                    animation: mounted
                                        ? `gondo-journal-fade-in 600ms ease-out ${idx * 70}ms both`
                                        : 'none',
                                }}
                            >
                                <div
                                    style={{
                                        background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_SOFT} 100%)`,
                                        padding: '8px 16px',
                                        color: '#FFF',
                                        fontSize: 13,
                                        letterSpacing: '0.15em',
                                        fontWeight: 500,
                                        fontFamily:
                                            '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                                    }}
                                >
                                    {frag.title}
                                </div>

                                <div
                                    style={{
                                        padding: '20px 22px 14px',
                                        color: INK_DEEP,
                                        fontSize: 15,
                                        lineHeight: 1.9,
                                        letterSpacing: '0.04em',
                                        fontFamily:
                                            '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    {frag.body}
                                </div>

                                <div
                                    style={{
                                        padding: '6px 16px 12px',
                                        textAlign: 'right',
                                        fontSize: 10,
                                        letterSpacing: '0.25em',
                                        color: GOLD,
                                        fontFamily:
                                            '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                                    }}
                                >
                                    — NIGHT {frag.unlockAfterNights}
                                </div>
                            </article>
                        ))}
                    </div>
                </>
            )}

            {unlockedBarFragments.length > 0 && (
                <>
                    <header
                        style={{
                            textAlign: 'center',
                            marginTop: unlockedFragments.length > 0 ? 48 : 0,
                            marginBottom: 24,
                            paddingBottom: 16,
                            borderBottom: `1px solid ${BORDER}`,
                            opacity: mounted ? 1 : 0,
                            animation: mounted
                                ? 'gondo-journal-fade-in 500ms ease-out both'
                                : 'none',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                letterSpacing: '0.3em',
                                color: GOLD,
                                fontWeight: 500,
                            }}
                        >
                            BAR — FRAGMENTS
                        </div>
                        <div
                            style={{
                                marginTop: 6,
                                fontSize: 18,
                                letterSpacing: '0.15em',
                                color: INK_DEEP,
                                fontFamily:
                                    '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                            }}
                        >
                            店の記憶
                        </div>
                    </header>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {unlockedBarFragments.map((frag, idx) => (
                            <article
                                key={frag.id}
                                style={{
                                    background: idx % 2 === 0 ? PAPER_LIGHT : PAPER_WHITE,
                                    border: `1px solid ${BORDER}`,
                                    borderRadius: 10,
                                    overflow: 'hidden',
                                    boxShadow: '0 1px 2px rgba(28,25,23,0.04)',
                                    opacity: mounted ? 1 : 0,
                                    animation: mounted
                                        ? `gondo-journal-fade-in 600ms ease-out ${idx * 70}ms both`
                                        : 'none',
                                }}
                            >
                                <div
                                    style={{
                                        background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_SOFT} 100%)`,
                                        padding: '8px 16px',
                                        color: '#FFF',
                                        fontSize: 13,
                                        letterSpacing: '0.15em',
                                        fontWeight: 500,
                                        fontFamily:
                                            '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                                    }}
                                >
                                    {frag.title}
                                </div>

                                <div
                                    style={{
                                        padding: '20px 22px 14px',
                                        color: INK_DEEP,
                                        fontSize: 15,
                                        lineHeight: 1.9,
                                        letterSpacing: '0.04em',
                                        fontFamily:
                                            '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    {frag.body}
                                </div>
                            </article>
                        ))}
                    </div>
                </>
            )}

            {revealedSecrets.length > 0 && (
                <>
                    <header
                        style={{
                            textAlign: 'center',
                            marginTop: (unlockedFragments.length > 0 || unlockedBarFragments.length > 0) ? 48 : 0,
                            marginBottom: 24,
                            paddingBottom: 16,
                            borderBottom: `1px solid ${BORDER}`,
                            opacity: mounted ? 1 : 0,
                            animation: mounted
                                ? 'gondo-journal-fade-in 500ms ease-out both'
                                : 'none',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 11,
                                letterSpacing: '0.3em',
                                color: GOLD,
                                fontWeight: 500,
                            }}
                        >
                            BAR — UNSPOKEN
                        </div>
                        <div
                            style={{
                                marginTop: 6,
                                fontSize: 18,
                                letterSpacing: '0.15em',
                                color: INK_DEEP,
                                fontFamily:
                                    '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                            }}
                        >
                            店の秘密
                        </div>
                    </header>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {revealedSecrets.map((secret, idx) => (
                            <article
                                key={secret.id}
                                style={{
                                    background: idx % 2 === 0 ? PAPER_LIGHT : PAPER_WHITE,
                                    border: `1px dashed ${GOLD_SOFT}`,
                                    borderRadius: 10,
                                    overflow: 'hidden',
                                    boxShadow: '0 1px 2px rgba(28,25,23,0.04)',
                                    opacity: mounted ? 1 : 0,
                                    animation: mounted
                                        ? `gondo-journal-fade-in 600ms ease-out ${idx * 80}ms both`
                                        : 'none',
                                }}
                            >
                                <div
                                    style={{
                                        padding: '8px 16px',
                                        color: GOLD,
                                        fontSize: 12,
                                        letterSpacing: '0.2em',
                                        fontWeight: 500,
                                        fontFamily:
                                            '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                                        borderBottom: `1px solid ${BORDER}`,
                                    }}
                                >
                                    {secret.title}
                                </div>

                                <div
                                    style={{
                                        padding: '18px 22px 14px',
                                        color: INK_SOFT,
                                        fontSize: 14,
                                        lineHeight: 1.9,
                                        letterSpacing: '0.04em',
                                        fontFamily:
                                            '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                                        whiteSpace: 'pre-wrap',
                                    }}
                                >
                                    {secret.body}
                                </div>

                                <div
                                    style={{
                                        padding: '4px 16px 10px',
                                        textAlign: 'right',
                                        fontSize: 10,
                                        letterSpacing: '0.25em',
                                        color: GOLD,
                                        fontFamily:
                                            '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
                                    }}
                                >
                                    — NIGHT {secret.revealAfter}
                                </div>
                            </article>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
