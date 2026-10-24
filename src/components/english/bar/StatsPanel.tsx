'use client';

/**
 * Silent Bartender -- StatsPanel
 *
 * Renders the player's lifetime stats and unlocked achievements.
 * Self-contained: no CSS modules, inline styles only (project convention).
 */

import type { PlayerStats } from '@/lib/english/bar/storage';
import { moodSuccessRate } from '@/lib/english/bar/storage';
import {
    ACHIEVEMENTS,
    suggestNextAchievement,
    type Achievement,
    type AchievementTier,
} from '@/data/english/bar/achievements';
import { getCurrentPersona } from '@/data/english/bar/persona-titles';
import { currentGrowthBeat } from '@/data/english/bar/apprentice-growth';
import type { Mood } from '@/data/english/bar/types';

// ─── Palette (matches bar/page.tsx) ─────────────────────────
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

// ─── Mood display labels ────────────────────────────────────
const MOOD_JP: Partial<Record<Mood, string>> = {
    tired: '疲労',
    'first-time': '初来店',
    homesick: 'ホームシック',
    drunk: '泥酔',
    heartbroken: '失恋',
    alien: '宇宙人',
    ghost: '幽霊',
    edo: '江戸',
    dog: '犬',
    regular: '常連',
    celebrating: '祝勝',
    suspicious: '胡散臭い',
    nervous: '緊張',
    smug: '得意げ',
    curious: '好奇心',
    angry: '激怒',
    'late-night': '深夜',
    existential: '実存',
    romantic: '恋',
};

// ═══════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════
export default function StatsPanel({ stats }: { stats: PlayerStats }) {
    const unlockedIds = new Set(stats.unlockedAchievementIds);
    const unlocked = ACHIEVEMENTS.filter(a => unlockedIds.has(a.id));
    const locked = ACHIEVEMENTS.filter(a => !unlockedIds.has(a.id));
    const hint = suggestNextAchievement(stats);

    const totalServed = stats.lifetimeArigatou + stats.lifetimeFailed;
    const overallRate = totalServed > 0
        ? Math.round((stats.lifetimeArigatou / totalServed) * 100)
        : 0;

    const moodEntries = Object.entries(stats.moodStats) as [Mood, { success: number; failed: number }][];
    moodEntries.sort(([, a], [, b]) => (b.success + b.failed) - (a.success + a.failed));

    const persona = getCurrentPersona(stats);
    const growth = currentGrowthBeat(stats.totalNights);

    return (
        <div style={styles.wrap}>
            {/* ── Header ── */}
            <div style={styles.header}>
                <div style={styles.headerLabel}>CARD OF RECORDS</div>
                <div style={styles.headerTitle}>無言給仕 戦績表</div>
                {persona && (
                    <div style={styles.personaTag}>
                        <span style={styles.personaLabel}>称号</span>
                        <span style={styles.personaTitle}>{persona.title}</span>
                        <span style={styles.personaDesc}>{persona.description}</span>
                    </div>
                )}
            </div>

            {/* ── Core metrics grid ── */}
            <div style={styles.grid3}>
                <StatCell label="通算夜数" value={stats.totalNights} />
                <StatCell label="ありがとう" value={stats.lifetimeArigatou} highlight="green" />
                <StatCell label="バスト回数" value={stats.lifetimeBusts} highlight="red" />
                <StatCell label="完走夜数" value={stats.completedNights} />
                <StatCell label="無バスト連続" value={stats.longestNoBustStreak} highlight="amber" />
                <StatCell label="最高連鎖" value={stats.longestCorrectChainEver} />
            </div>

            {/* ── Overall success rate bar ── */}
            {totalServed > 0 && (
                <div style={styles.rateBox}>
                    <div style={styles.rateRow}>
                        <span style={styles.rateLabel}>通算 満足率</span>
                        <span style={styles.rateValue}>{overallRate}%</span>
                    </div>
                    <div style={styles.rateTrack}>
                        <div style={{ ...styles.rateFill, width: `${overallRate}%` }} />
                    </div>
                    <div style={styles.rateHint}>
                        {stats.lifetimeArigatou} 満足 / {stats.lifetimeFailed} 撃沈
                    </div>
                </div>
            )}

            {/* ── Per-mood breakdown ── */}
            {moodEntries.length > 0 && (
                <div style={styles.section}>
                    <div style={styles.sectionTitle}>気分別 成功率</div>
                    <div style={styles.moodGrid}>
                        {moodEntries.slice(0, 8).map(([mood]) => {
                            const rate = moodSuccessRate(stats, mood);
                            const pct = rate == null ? 0 : Math.round(rate * 100);
                            const label = MOOD_JP[mood] ?? mood;
                            return (
                                <div key={mood} style={styles.moodRow}>
                                    <span style={styles.moodLabel}>{label}</span>
                                    <div style={styles.moodBarTrack}>
                                        <div style={{ ...styles.moodBarFill, width: `${pct}%` }} />
                                    </div>
                                    <span style={styles.moodPct}>{pct}%</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── Achievements ── */}
            <div style={styles.section}>
                <div style={styles.sectionTitle}>
                    称号 <span style={styles.countHint}>{unlocked.length} / {ACHIEVEMENTS.length}</span>
                </div>
                <div style={styles.achList}>
                    {unlocked.map(a => <AchievementRow key={a.id} a={a} unlocked />)}
                    {locked.length > 0 && (
                        <div style={styles.lockedDivider}>未取得</div>
                    )}
                    {locked.map(a => <AchievementRow key={a.id} a={a} unlocked={false} />)}
                </div>
            </div>

            {/* ── Next-achievement hint ── */}
            {hint && (
                <div style={styles.hintBox}>
                    <div style={styles.hintLabel}>NEXT</div>
                    <div style={styles.hintTitle}>{hint.title}</div>
                    <div style={styles.hintDesc}>{hint.description}</div>
                </div>
            )}

            {growth && (
                <div style={styles.growthBox}>
                    <div style={styles.growthLabel}>見習いのノート</div>
                    <div style={styles.growthBody}>{growth.body}</div>
                    <div style={styles.growthFoot}>
                        NIGHT {growth.unlockAfterNights} — {growth.category}
                    </div>
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════════
function StatCell({
    label,
    value,
    highlight,
}: {
    label: string;
    value: number;
    highlight?: 'green' | 'red' | 'amber';
}) {
    const color =
        highlight === 'green' ? C.green :
        highlight === 'red' ? C.red :
        highlight === 'amber' ? C.amber : C.text;
    return (
        <div style={styles.statCell}>
            <div style={{ ...styles.statValue, color }}>{value}</div>
            <div style={styles.statLabel}>{label}</div>
        </div>
    );
}

function AchievementRow({ a, unlocked }: { a: Achievement; unlocked: boolean }) {
    const tierColor = TIER_COLOR[a.tier];
    const isHidden = a.tier === 'hidden' && !unlocked;
    const title = isHidden ? '???' : a.title;
    const desc = isHidden
        ? (a.lockedDescription ?? '...何かが、まだ起きていない。')
        : a.description;
    return (
        <div style={{
            ...styles.achRow,
            opacity: unlocked ? 1 : 0.55,
            borderLeft: `3px solid ${unlocked ? tierColor : C.border}`,
        }}>
            <div style={styles.achHead}>
                <span style={{
                    ...styles.achTierBadge,
                    background: unlocked ? tierColor : C.textFaint,
                }}>
                    {TIER_LABEL_JP[a.tier]}
                </span>
                <span style={styles.achTitle}>{title}</span>
            </div>
            <div style={{
                ...styles.achDesc,
                fontStyle: isHidden ? 'italic' : 'normal',
            }}>
                {desc}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// Styles
// ═══════════════════════════════════════════════════════════
const styles: Record<string, React.CSSProperties> = {
    wrap: {
        maxWidth: 560,
        width: '100%',
        margin: '0 auto',
        padding: 16,
        boxSizing: 'border-box',
        background: C.bg,
        color: C.text,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    header: { marginBottom: 20, textAlign: 'center' as const },
    headerLabel: {
        fontSize: 10, letterSpacing: 6, color: C.amberDim,
        fontWeight: 800, marginBottom: 8,
    },
    headerTitle: {
        fontSize: 22, fontWeight: 900, color: C.text, letterSpacing: -0.3,
    },
    personaTag: {
        marginTop: 12,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 12px',
        background: C.amberBg,
        border: `1px solid ${C.amber}`,
        borderRadius: 999,
    },
    personaLabel: {
        fontSize: 9, letterSpacing: 2, color: C.amberDim,
        fontWeight: 900,
    },
    personaTitle: {
        fontSize: 13, fontWeight: 900, color: C.text, letterSpacing: 1,
    },
    personaDesc: {
        fontSize: 10, color: C.textDim, fontStyle: 'italic' as const,
    },
    grid3: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8, marginBottom: 18,
    },
    statCell: {
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 10, padding: '14px 10px', textAlign: 'center' as const,
    },
    statValue: {
        fontSize: 26, fontWeight: 900, lineHeight: 1, color: C.text,
    },
    statLabel: {
        fontSize: 10, letterSpacing: 2, color: C.textDim,
        marginTop: 6, fontWeight: 700,
    },
    rateBox: {
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 10, padding: '14px 16px', marginBottom: 20,
    },
    rateRow: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 8,
    },
    rateLabel: { fontSize: 11, letterSpacing: 2, color: C.textDim, fontWeight: 700 },
    rateValue: { fontSize: 20, fontWeight: 900, color: C.amber },
    rateTrack: {
        width: '100%', height: 6, background: C.border,
        borderRadius: 999, overflow: 'hidden',
    },
    rateFill: {
        height: '100%', background: C.amber, transition: 'width 0.4s ease',
    },
    rateHint: {
        fontSize: 10, color: C.textFaint, marginTop: 6, letterSpacing: 1,
    },
    section: { marginBottom: 20 },
    sectionTitle: {
        fontSize: 11, letterSpacing: 3, color: C.amberDim,
        fontWeight: 900, marginBottom: 10,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
    },
    countHint: {
        fontSize: 10, color: C.textFaint, letterSpacing: 1, fontWeight: 700,
    },
    moodGrid: { display: 'flex', flexDirection: 'column' as const, gap: 6 },
    moodRow: {
        display: 'grid', gridTemplateColumns: '76px 1fr 40px',
        alignItems: 'center', gap: 8,
        background: C.card, border: `1px solid ${C.border}`,
        padding: '8px 10px', borderRadius: 8,
    },
    moodLabel: { fontSize: 12, color: C.text, fontWeight: 700 },
    moodBarTrack: {
        height: 4, background: C.border, borderRadius: 999, overflow: 'hidden',
    },
    moodBarFill: {
        height: '100%', background: C.green, transition: 'width 0.4s ease',
    },
    moodPct: {
        fontSize: 11, fontWeight: 800, color: C.textDim, textAlign: 'right' as const,
    },
    achList: { display: 'flex', flexDirection: 'column' as const, gap: 6 },
    achRow: {
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 8, padding: '10px 12px',
        transition: 'opacity 0.2s',
    },
    achHead: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' },
    achTierBadge: {
        display: 'inline-block', minWidth: 18, textAlign: 'center' as const,
        padding: '2px 6px', borderRadius: 4,
        fontSize: 10, fontWeight: 900, color: '#FFF',
        letterSpacing: 1,
    },
    achTitle: { fontSize: 13, fontWeight: 800, color: C.text },
    achDesc: { fontSize: 11, color: C.textDim, lineHeight: 1.6 },
    lockedDivider: {
        fontSize: 10, letterSpacing: 3, color: C.textFaint,
        fontWeight: 700, margin: '8px 0 2px', textAlign: 'center' as const,
    },
    hintBox: {
        background: C.amberBg, border: `1px dashed ${C.amber}`,
        borderRadius: 10, padding: '12px 14px',
    },
    hintLabel: {
        fontSize: 9, letterSpacing: 4, color: C.amberDim,
        fontWeight: 900, marginBottom: 4,
    },
    hintTitle: { fontSize: 13, fontWeight: 800, color: C.text, marginBottom: 2 },
    hintDesc: { fontSize: 11, color: C.textDim, lineHeight: 1.6 },
    growthBox: {
        marginTop: 16,
        background: C.card,
        border: `1px dashed ${C.border}`,
        borderRadius: 10,
        padding: '16px 18px',
        fontFamily:
            '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif',
    },
    growthLabel: {
        fontSize: 10, letterSpacing: 3, color: C.amberDim,
        fontWeight: 700, marginBottom: 10,
    },
    growthBody: {
        fontSize: 14, color: C.text, lineHeight: 1.9,
        letterSpacing: '0.04em', whiteSpace: 'pre-wrap' as const,
    },
    growthFoot: {
        marginTop: 10,
        fontSize: 10, letterSpacing: 2, color: C.textFaint,
        textAlign: 'right' as const,
    },
};
