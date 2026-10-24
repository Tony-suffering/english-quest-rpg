'use client';

/**
 * Silent Bartender -- DeepStats
 *
 * Deep analytics dashboard for players who care about their history.
 * Purely derived from PlayerStats; no network, no external deps.
 */

import type { PlayerStats } from '@/lib/english/bar/storage';
import { moodSuccessRate } from '@/lib/english/bar/storage';
import type { Mood } from '@/data/english/bar/types';

// ─── Palette (matches StatsPanel / CustomerAtlas) ─────────────
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

const MOOD_JP: Partial<Record<Mood, string>> = {
    tired: '疲労', 'first-time': '初来店', homesick: 'ホームシック',
    drunk: '泥酔', heartbroken: '失恋', alien: '宇宙人', ghost: '幽霊',
    edo: '江戸', dog: '犬', regular: '常連', celebrating: '祝勝',
    suspicious: '胡散臭い', nervous: '緊張', smug: '得意げ',
    curious: '好奇心', angry: '激怒', 'late-night': '深夜',
    existential: '実存', romantic: '恋',
};

// ═══════════════════════════════════════════════════════════
// Milestone targets
// ═══════════════════════════════════════════════════════════
const NIGHT_TARGETS = [10, 30, 100, 300];
const ARIGATOU_TARGETS = [100, 500, 1000, 5000];
const STREAK_TARGETS = [5, 10, 25, 50];
const PERFECT_TARGETS = [1, 10, 30];

function nextTarget(current: number, targets: number[]): number | null {
    for (const t of targets) if (current < t) return t;
    return null;
}

// ═══════════════════════════════════════════════════════════
// Persona heuristic
// ═══════════════════════════════════════════════════════════
function derivePersona(stats: PlayerStats): string {
    const MIN_SAMPLE = 5;
    const strong = (m: Mood) => {
        const rec = stats.moodStats[m];
        if (!rec) return false;
        const total = rec.success + rec.failed;
        if (total < MIN_SAMPLE) return false;
        return rec.success / total >= 0.7;
    };
    if (stats.perfectNights >= 10) return '夜の匠';
    if (stats.lifetimeBusts >= 10 && stats.lifetimeArigatou >= 100) return '傷を背負う者';
    if (strong('homesick')) return '故郷の代わりになれる人';
    if (strong('drunk')) return '酔客の番人';
    if (strong('ghost')) return '見えない客の友';
    if (stats.totalNights === 0) return 'まだ始まったばかり';
    return 'まだ始まったばかり';
}

// ═══════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════
export default function DeepStats({ stats }: { stats: PlayerStats }) {
    // ── 1. Mood affinity ──
    const moodEntries = (Object.entries(stats.moodStats) as [Mood, { success: number; failed: number }][])
        .filter(([, r]) => (r.success + r.failed) > 0)
        .sort(([, a], [, b]) => b.success - a.success);

    const maxMoodCount = moodEntries.reduce(
        (m, [, r]) => Math.max(m, r.success + r.failed), 1,
    );

    // ── 4. Milestones ──
    const milestones: Array<{ label: string; current: number; target: number }> = [];
    const nn = nextTarget(stats.totalNights, NIGHT_TARGETS);
    if (nn != null) milestones.push({ label: `通算 ${nn} 夜`, current: stats.totalNights, target: nn });
    const na = nextTarget(stats.lifetimeArigatou, ARIGATOU_TARGETS);
    if (na != null) milestones.push({ label: `ありがとう ${na}`, current: stats.lifetimeArigatou, target: na });
    const ns = nextTarget(stats.longestNoBustStreak, STREAK_TARGETS);
    if (ns != null) milestones.push({ label: `無バスト ${ns} 連続`, current: stats.longestNoBustStreak, target: ns });
    const np = nextTarget(stats.perfectNights, PERFECT_TARGETS);
    if (np != null) milestones.push({ label: `完璧な夜 ${np} 回`, current: stats.perfectNights, target: np });

    const persona = derivePersona(stats);

    return (
        <div style={styles.wrap}>
            {/* ── Header ── */}
            <div style={styles.header}>
                <div style={styles.headerLabel}>DEEP STATS</div>
                <div style={styles.headerTitle}>戦績の深掘り</div>
            </div>

            {/* ── 5. Persona line ── */}
            <div style={styles.personaBox}>
                <div style={styles.personaLabel}>PERSONA</div>
                <div style={styles.personaValue}>{persona}</div>
            </div>

            {/* ── 1. Mood affinity chart ── */}
            <div style={styles.section}>
                <div style={styles.sectionTitle}>気分別 親和度</div>
                {moodEntries.length === 0 ? (
                    <div style={styles.emptyNote}>まだ誰にも会っていない。</div>
                ) : (
                    <div style={styles.moodList}>
                        {moodEntries.map(([mood, rec]) => {
                            const total = rec.success + rec.failed;
                            const rate = moodSuccessRate(stats, mood) ?? 0;
                            const pct = Math.round(rate * 100);
                            const widthPct = Math.round((total / maxMoodCount) * 100);
                            const warm = total >= 3 && rate >= 0.6;
                            const fillColor = warm ? C.amber : C.textFaint;
                            const labelColor = warm ? C.text : C.textDim;
                            return (
                                <div key={mood} style={styles.moodRow}>
                                    <span style={{ ...styles.moodLabel, color: labelColor }}>
                                        {MOOD_JP[mood] ?? mood}
                                    </span>
                                    <div style={styles.moodBarTrack}>
                                        <div style={{
                                            ...styles.moodBarFill,
                                            width: `${widthPct}%`,
                                            background: fillColor,
                                        }} />
                                    </div>
                                    <span style={styles.moodMeta}>
                                        {rec.success}/{total} ({pct}%)
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ── 2. Difficulty curve / current form ── */}
            <div style={styles.section}>
                <div style={styles.sectionTitle}>現在の調子</div>
                <FormCard stats={stats} />
            </div>

            {/* ── 3. Tonight snapshot ── */}
            {stats.lastNight && (
                <div style={styles.section}>
                    <div style={styles.sectionTitle}>直近の夜</div>
                    <LastNightBox stats={stats} />
                </div>
            )}

            {/* ── 4. Milestones countdown ── */}
            {milestones.length > 0 && (
                <div style={styles.section}>
                    <div style={styles.sectionTitle}>次の節目</div>
                    <div style={styles.milestoneList}>
                        {milestones.map(m => {
                            const remaining = Math.max(0, m.target - m.current);
                            const pct = Math.min(100, Math.round((m.current / m.target) * 100));
                            return (
                                <div key={m.label} style={styles.milestoneRow}>
                                    <div style={styles.milestoneHead}>
                                        <span style={styles.milestoneLabel}>{m.label}</span>
                                        <span style={styles.milestoneRemain}>あと {remaining}</span>
                                    </div>
                                    <div style={styles.milestoneTrack}>
                                        <div style={{ ...styles.milestoneFill, width: `${pct}%` }} />
                                    </div>
                                    <div style={styles.milestoneHint}>
                                        {m.current} / {m.target}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════════

/**
 * Current-form card. Since we don't persist per-night history, we
 * visualise the three live streak numbers as a compact inline SVG:
 * an arc from 0 to longestNoBustStreak with a marker at
 * currentNoBustStreak, plus a bust-pressure readout.
 */
function FormCard({ stats }: { stats: PlayerStats }) {
    const longest = Math.max(1, stats.longestNoBustStreak);
    const current = Math.min(stats.currentNoBustStreak, longest);
    const w = 280;
    const h = 60;
    const pad = 10;
    const usable = w - pad * 2;
    const xCurrent = pad + (current / longest) * usable;
    const yBase = h - 14;

    // build a gentle curve peaking at longest streak
    const points: string[] = [];
    const steps = 24;
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = pad + t * usable;
        // ease-in-out via sine
        const y = yBase - Math.sin(t * Math.PI) * (yBase - 14);
        points.push(`${x},${y}`);
    }
    const pathD = `M ${points[0]} ` + points.slice(1).map(p => `L ${p}`).join(' ');

    return (
        <div style={styles.formCard}>
            <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }} aria-hidden>
                <line x1={pad} y1={yBase} x2={w - pad} y2={yBase}
                    stroke={C.border} strokeWidth={1} />
                <path d={pathD} fill="none" stroke={C.amber} strokeWidth={2} />
                <circle cx={xCurrent} cy={yBase - Math.sin((current / longest) * Math.PI) * (yBase - 14)}
                    r={4} fill={C.amber} />
                <text x={pad} y={h - 2} fontSize={8} fill={C.textFaint} letterSpacing={1}>0</text>
                <text x={w - pad} y={h - 2} fontSize={8} fill={C.textFaint}
                    letterSpacing={1} textAnchor="end">{longest}</text>
            </svg>
            <div style={styles.formGrid}>
                <FormStat label="現在" value={stats.currentNoBustStreak} tone="amber" />
                <FormStat label="最長" value={stats.longestNoBustStreak} tone="text" />
                <FormStat
                    label="連続バスト"
                    value={stats.consecutiveBusts}
                    tone={stats.consecutiveBusts > 0 ? 'red' : 'faint'}
                />
            </div>
        </div>
    );
}

function FormStat({
    label, value, tone,
}: { label: string; value: number; tone: 'amber' | 'text' | 'red' | 'faint' }) {
    const color =
        tone === 'amber' ? C.amber :
        tone === 'red' ? C.red :
        tone === 'faint' ? C.textFaint : C.text;
    return (
        <div style={styles.formStatCell}>
            <div style={{ ...styles.formStatValue, color }}>{value}</div>
            <div style={styles.formStatLabel}>{label}</div>
        </div>
    );
}

function LastNightBox({ stats }: { stats: PlayerStats }) {
    const n = stats.lastNight!;
    const total = n.success + n.failed;
    const pct = total > 0 ? Math.round((n.success / total) * 100) : 0;
    const when = new Date(n.timestamp);
    const whenStr = `${when.getFullYear()}/${String(when.getMonth() + 1).padStart(2, '0')}/${String(when.getDate()).padStart(2, '0')}`;
    return (
        <div style={styles.lastNightCard}>
            <div style={styles.lastNightHead}>
                <span style={styles.lastNightDate}>{whenStr}</span>
                <span style={{
                    ...styles.lastNightBadge,
                    background: n.busted ? '#FEF2F2' : '#ECFDF5',
                    color: n.busted ? C.red : C.green,
                }}>
                    {n.busted ? 'BUSTED' : 'COMPLETED'}
                </span>
            </div>
            <div style={styles.lastNightGrid}>
                <FormStat label="満足" value={n.success} tone="amber" />
                <FormStat label="撃沈" value={n.failed} tone={n.failed > 0 ? 'red' : 'faint'} />
                <FormStat label="満足率" value={pct} tone="text" />
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// Styles
// ═══════════════════════════════════════════════════════════
const styles: Record<string, React.CSSProperties> = {
    wrap: {
        maxWidth: 560, width: '100%', margin: '0 auto', padding: 16,
        boxSizing: 'border-box', background: C.bg, color: C.text,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    header: { marginBottom: 16, textAlign: 'center' as const },
    headerLabel: {
        fontSize: 10, letterSpacing: 6, color: C.amberDim,
        fontWeight: 800, marginBottom: 8,
    },
    headerTitle: {
        fontSize: 22, fontWeight: 900, color: C.text, letterSpacing: -0.3,
    },
    personaBox: {
        background: C.cardSoft, border: `1px solid ${C.amber}`,
        borderRadius: 10, padding: '12px 16px', marginBottom: 20,
        textAlign: 'center' as const,
    },
    personaLabel: {
        fontSize: 9, letterSpacing: 4, color: C.amberDim,
        fontWeight: 900, marginBottom: 4,
    },
    personaValue: { fontSize: 18, fontWeight: 900, color: C.text },
    section: { marginBottom: 20 },
    sectionTitle: {
        fontSize: 11, letterSpacing: 3, color: C.amberDim,
        fontWeight: 900, marginBottom: 10,
    },
    emptyNote: {
        fontSize: 11, color: C.textFaint, textAlign: 'center' as const,
        padding: '12px 0',
    },
    moodList: { display: 'flex', flexDirection: 'column' as const, gap: 6 },
    moodRow: {
        display: 'grid', gridTemplateColumns: '84px 1fr 88px',
        alignItems: 'center', gap: 8,
        background: C.card, border: `1px solid ${C.border}`,
        padding: '8px 10px', borderRadius: 8,
    },
    moodLabel: { fontSize: 12, fontWeight: 700 },
    moodBarTrack: {
        height: 6, background: C.border, borderRadius: 999, overflow: 'hidden',
    },
    moodBarFill: { height: '100%', transition: 'width 0.4s ease' },
    moodMeta: {
        fontSize: 10, fontWeight: 700, color: C.textDim,
        textAlign: 'right' as const, letterSpacing: 0.5,
    },
    formCard: {
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 10, padding: 12,
    },
    formGrid: {
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8, marginTop: 8,
    },
    formStatCell: {
        textAlign: 'center' as const, padding: '6px 4px',
        background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8,
    },
    formStatValue: { fontSize: 22, fontWeight: 900, lineHeight: 1 },
    formStatLabel: {
        fontSize: 9, letterSpacing: 2, color: C.textDim,
        marginTop: 4, fontWeight: 700,
    },
    lastNightCard: {
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 10, padding: 12,
    },
    lastNightHead: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: 10,
    },
    lastNightDate: {
        fontSize: 12, fontWeight: 800, color: C.textDim, letterSpacing: 1,
    },
    lastNightBadge: {
        fontSize: 9, fontWeight: 900, letterSpacing: 2,
        padding: '3px 8px', borderRadius: 4,
    },
    lastNightGrid: {
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
    },
    milestoneList: { display: 'flex', flexDirection: 'column' as const, gap: 8 },
    milestoneRow: {
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 8, padding: '10px 12px',
    },
    milestoneHead: {
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'baseline', marginBottom: 6,
    },
    milestoneLabel: { fontSize: 12, fontWeight: 800, color: C.text },
    milestoneRemain: {
        fontSize: 11, fontWeight: 900, color: C.amber, letterSpacing: 1,
    },
    milestoneTrack: {
        height: 4, background: C.border, borderRadius: 999, overflow: 'hidden',
    },
    milestoneFill: {
        height: '100%', background: C.amber, transition: 'width 0.4s ease',
    },
    milestoneHint: {
        fontSize: 10, color: C.textFaint, marginTop: 4, letterSpacing: 0.5,
    },
};
