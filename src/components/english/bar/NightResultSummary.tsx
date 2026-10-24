'use client';

/**
 * Silent Bartender -- NightResultSummary
 *
 * Shown at the end of a single run. Presents:
 *   - Night outcome (success/fail counts, busted?)
 *   - Cumulative milestones touched this run
 *   - Newly unlocked achievements with animation
 *
 * No external animation libraries: keyframes injected via <style>.
 */

import { useEffect, useState } from 'react';
import type { NightResult, PlayerStats } from '@/lib/english/bar/storage';
import type { Achievement, AchievementTier } from '@/data/english/bar/achievements';
import { useReducedMotion } from '@/lib/english/bar/a11y';

// Count up from 0 to target over `duration` ms using rAF.
// eased-out cubic to land softly on the final value.
// When reduced-motion is on, returns `target` immediately.
function useCountUp(target: number, duration = 800, delay = 0, reduced = false): number {
    const [value, setValue] = useState(reduced ? target : 0);
    useEffect(() => {
        if (reduced) { setValue(target); return; }
        let raf = 0;
        let start = 0;
        let cancelled = false;
        const timer = setTimeout(() => {
            const step = (t: number) => {
                if (cancelled) return;
                if (!start) start = t;
                const p = Math.min(1, (t - start) / duration);
                const eased = 1 - Math.pow(1 - p, 3);
                setValue(Math.round(target * eased));
                if (p < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
        }, delay);
        return () => {
            cancelled = true;
            clearTimeout(timer);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [target, duration, delay, reduced]);
    return value;
}

// ─── Palette ────────────────────────────────────────────────
const C = {
    bg: '#FAF6EC',
    card: '#FFFFFF',
    cardSoft: '#FFF8E1',
    border: '#E5DCC0',
    amber: '#B8860B',
    amberDim: '#8B6508',
    amberBg: '#FFF5D1',
    red: '#B91C1C',
    green: '#047857',
    text: '#1C1917',
    textDim: '#57534E',
    textFaint: '#A8A29E',
};

const TIER_COLOR: Record<AchievementTier, string> = {
    bronze: '#A16207',
    silver: '#6B7280',
    gold: '#B8860B',
    hidden: '#6D28D9',
};

const TIER_LABEL_JP: Record<AchievementTier, string> = {
    bronze: '銅',
    silver: '銀',
    gold: '金',
    hidden: '隠',
};

// ═══════════════════════════════════════════════════════════
// Props + component
// ═══════════════════════════════════════════════════════════
interface Props {
    result: NightResult;
    stats: PlayerStats;
    newlyUnlocked: Achievement[];
}

export default function NightResultSummary({ result, stats, newlyUnlocked }: Props) {
    const reduced = useReducedMotion();
    const total = result.success + result.failed;
    const rate = total > 0 ? Math.round((result.success / total) * 100) : 0;
    const perfect = !result.busted && result.success >= 5 && result.failed === 0;

    // Count-up animations — start after the numbers card fades in (~120ms).
    // Reduced-motion users see the final numbers instantly.
    const successCount = useCountUp(result.success, 800, 120, reduced);
    const failedCount = useCountUp(result.failed, 800, 180, reduced);
    const rateCount = useCountUp(rate, 800, 240, reduced);

    const banner = result.busted
        ? { label: 'BUSTED', color: C.red, ja: '権藤が出た' }
        : perfect
            ? { label: 'PERFECT', color: C.amber, ja: '完全営業' }
            : result.success > result.failed
                ? { label: 'CLOSED', color: C.green, ja: 'なんとか閉店' }
                : { label: 'ROUGH NIGHT', color: C.textDim, ja: '厳しい夜だった' };

    return (
        <div style={styles.wrap}>
            <style>{keyframes}</style>

            {/* ── Banner ── */}
            <div style={{
                ...styles.banner,
                animation: reduced ? undefined : 'bar-fade-up 0.5s ease-out both',
            }}>
                <div style={{ ...styles.bannerLabel, color: banner.color }}>
                    {banner.label}
                </div>
                <div style={styles.bannerJa}>{banner.ja}</div>
            </div>

            {/* ── Numbers ── */}
            <div style={{
                ...styles.numbers,
                animation: reduced ? undefined : 'bar-fade-up 0.6s 0.12s ease-out both',
            }}>
                <div style={styles.numCell}>
                    <div style={{ ...styles.numValue, color: C.green }}>{successCount}</div>
                    <div style={styles.numLabel}>ありがとう</div>
                </div>
                <div style={styles.numDivider} />
                <div style={styles.numCell}>
                    <div style={{ ...styles.numValue, color: C.red }}>{failedCount}</div>
                    <div style={styles.numLabel}>撃沈</div>
                </div>
                <div style={styles.numDivider} />
                <div style={styles.numCell}>
                    <div style={{ ...styles.numValue, color: C.amber }}>{rateCount}%</div>
                    <div style={styles.numLabel}>満足率</div>
                </div>
            </div>

            {/* ── Lifetime brief ── */}
            <div style={{
                ...styles.lifetime,
                animation: reduced ? undefined : 'bar-fade-up 0.6s 0.24s ease-out both',
            }}>
                <div style={styles.lifetimeRow}>
                    <span>通算</span>
                    <span>{stats.totalNights} 夜</span>
                </div>
                <div style={styles.lifetimeRow}>
                    <span>累計ありがとう</span>
                    <span>{stats.lifetimeArigatou}</span>
                </div>
                <div style={styles.lifetimeRow}>
                    <span>無バスト連続</span>
                    <span>{stats.currentNoBustStreak} / 最高 {stats.longestNoBustStreak}</span>
                </div>
            </div>

            {/* ── Newly unlocked achievements ── */}
            {newlyUnlocked.length > 0 && (
                <div style={styles.unlockBox}>
                    <div style={styles.unlockHead}>
                        <span style={styles.unlockHeadLabel}>UNLOCKED</span>
                        <span style={styles.unlockHeadCount}>{newlyUnlocked.length}</span>
                    </div>
                    {newlyUnlocked.map((a, i) => (
                        <div
                            key={a.id}
                            role="status"
                            aria-live="polite"
                            aria-label={`新しい称号: ${a.title}`}
                            style={{
                                ...styles.unlockRow,
                                borderLeft: `3px solid ${TIER_COLOR[a.tier]}`,
                                animation: reduced ? undefined : `bar-unlock 0.55s ${0.36 + i * 0.18}s ease-out both`,
                            }}
                        >
                            <div style={styles.unlockRowHead}>
                                <span style={{
                                    ...styles.unlockBadge,
                                    background: TIER_COLOR[a.tier],
                                }}>
                                    {TIER_LABEL_JP[a.tier]}
                                </span>
                                <span style={styles.unlockTitle}>{a.title}</span>
                            </div>
                            <div style={styles.unlockDesc}>{a.description}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Empty-state hint when nothing unlocked ── */}
            {newlyUnlocked.length === 0 && !result.busted && (
                <div style={{
                    ...styles.noUnlock,
                    animation: reduced ? undefined : 'bar-fade-up 0.6s 0.36s ease-out both',
                }}>
                    新しい称号はなし。次の夜に期待。
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// Keyframes (injected inline; matches project pattern)
// ═══════════════════════════════════════════════════════════
const keyframes = `
@keyframes bar-fade-up {
    0%   { opacity: 0; transform: translateY(10px); }
    100% { opacity: 1; transform: translateY(0); }
}
@keyframes bar-unlock {
    0%   { opacity: 0; transform: translateX(-16px) scale(0.96); }
    60%  { opacity: 1; transform: translateX(3px) scale(1.02); }
    100% { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes bar-shimmer {
    0%   { background-position: -200px 0; }
    100% { background-position: 200px 0; }
}
`;

// ═══════════════════════════════════════════════════════════
// Styles
// ═══════════════════════════════════════════════════════════
const styles: Record<string, React.CSSProperties> = {
    wrap: {
        maxWidth: 520, width: '100%', margin: '0 auto', padding: 16,
        background: C.bg, color: C.text, boxSizing: 'border-box',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    banner: {
        textAlign: 'center' as const, marginBottom: 22,
    },
    bannerLabel: {
        fontSize: 11, letterSpacing: 6, fontWeight: 900, marginBottom: 6,
    },
    bannerJa: {
        fontSize: 26, fontWeight: 900, color: C.text, letterSpacing: -0.5,
    },
    numbers: {
        display: 'flex', alignItems: 'stretch',
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 12, padding: '16px 8px', marginBottom: 16,
    },
    numCell: {
        flex: 1, textAlign: 'center' as const, minWidth: 0,
    },
    numValue: {
        fontSize: 28, fontWeight: 900, lineHeight: 1,
    },
    numLabel: {
        fontSize: 10, letterSpacing: 2, color: C.textDim,
        marginTop: 6, fontWeight: 700,
    },
    numDivider: {
        width: 1, background: C.border, margin: '4px 0',
    },
    lifetime: {
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 10, padding: '12px 14px', marginBottom: 20,
        display: 'flex', flexDirection: 'column' as const, gap: 6,
    },
    lifetimeRow: {
        display: 'flex', justifyContent: 'space-between',
        fontSize: 12, color: C.textDim, fontWeight: 600,
    },
    unlockBox: {
        background: C.amberBg,
        border: `1px solid ${C.amber}55`,
        borderRadius: 12, padding: '14px 14px 10px',
        marginBottom: 10,
    },
    unlockHead: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 10,
    },
    unlockHeadLabel: {
        fontSize: 10, letterSpacing: 5, color: C.amberDim, fontWeight: 900,
    },
    unlockHeadCount: {
        fontSize: 14, fontWeight: 900, color: C.amber,
    },
    unlockRow: {
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 8, padding: '10px 12px', marginBottom: 6,
    },
    unlockRowHead: {
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4,
    },
    unlockBadge: {
        minWidth: 18, textAlign: 'center' as const,
        padding: '2px 6px', borderRadius: 4,
        fontSize: 10, fontWeight: 900, color: '#FFF',
        letterSpacing: 1,
    },
    unlockTitle: {
        fontSize: 13, fontWeight: 800, color: C.text,
    },
    unlockDesc: {
        fontSize: 11, color: C.textDim, lineHeight: 1.6,
    },
    noUnlock: {
        fontSize: 11, color: C.textFaint, textAlign: 'center' as const,
        fontStyle: 'italic' as const,
        padding: '8px 0',
    },
};
