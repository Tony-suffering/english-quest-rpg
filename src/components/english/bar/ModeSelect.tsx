'use client';

/**
 * Silent Bartender -- mode picker.
 *
 * Horizontal strip (flex-wrap on small screens) of 4 cards:
 * easy / normal / nightmare / speakeasy.
 *
 * Props are deliberately thin: the parent owns the selected id and
 * the stats object, so this component stays presentational.
 */

import { MODES, getMode, isModeUnlocked, type GameMode } from '@/lib/english/bar/modes';

// ═══════════════════════════════════════════════════════════
// Palette (mirrors page.tsx)
// ═══════════════════════════════════════════════════════════
const C = {
    bg: '#FAF6EC',
    card: '#FFFFFF',
    cardLocked: '#F5F0E0',
    border: '#E5DCC0',
    amber: '#B8860B',
    text: '#1C1917',
    textDim: '#57534E',
    textFaint: '#A8A29E',
};

// ═══════════════════════════════════════════════════════════
// Props
// ═══════════════════════════════════════════════════════════
interface Props {
    selected: string;
    onSelect: (modeId: string) => void;
    stats?: { totalNights: number };
}

// ═══════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════
export default function ModeSelect({ selected, onSelect, stats }: Props) {
    const totalNights = stats?.totalNights ?? 0;
    const activeId = getMode(selected).id;

    return (
        <div style={{ width: '100%' }}>
            <div style={{
                fontSize: 10, letterSpacing: 4, color: C.amber,
                fontWeight: 900, marginBottom: 10, textAlign: 'center',
            }}>
                MODE
            </div>
            <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 8,
                justifyContent: 'center',
            }}>
                {MODES.map(mode => {
                    const unlocked = isModeUnlocked(mode, totalNights);
                    const isActive = mode.id === activeId;
                    return (
                        <ModeCard
                            key={mode.id}
                            mode={mode}
                            active={isActive}
                            unlocked={unlocked}
                            remainingNights={Math.max(0, mode.unlockAfterNights - totalNights)}
                            onPick={() => unlocked && onSelect(mode.id)}
                        />
                    );
                })}
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// Single card
// ═══════════════════════════════════════════════════════════
interface CardProps {
    mode: GameMode;
    active: boolean;
    unlocked: boolean;
    remainingNights: number;
    onPick: () => void;
}

function ModeCard({ mode, active, unlocked, remainingNights, onPick }: CardProps) {
    const bg = !unlocked ? C.cardLocked : C.card;
    const borderColor = active ? mode.tint : C.border;
    const borderWidth = active ? 2 : 1;

    return (
        <button
            onClick={onPick}
            disabled={!unlocked}
            style={{
                flex: '1 1 140px',
                minWidth: 130,
                maxWidth: 220,
                minHeight: 44,
                background: bg,
                border: `${borderWidth}px solid ${borderColor}`,
                borderRadius: 12,
                padding: '12px 14px',
                textAlign: 'left',
                cursor: unlocked ? 'pointer' : 'not-allowed',
                opacity: unlocked ? 1 : 0.6,
                fontFamily: 'inherit',
                color: C.text,
                boxSizing: 'border-box',
                transition: 'border 0.15s, transform 0.1s, background 0.15s',
                boxShadow: active ? `0 0 0 2px ${mode.tint}22` : 'none',
            }}
        >
            {/* Label + tint dot */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                marginBottom: 4,
            }}>
                <span style={{
                    display: 'inline-block', width: 8, height: 8,
                    borderRadius: 999, background: mode.tint,
                }} />
                <span style={{
                    fontSize: 13, fontWeight: 900, letterSpacing: 1,
                    color: C.text,
                }}>
                    {mode.label}
                </span>
            </div>

            {/* Description */}
            <div style={{
                fontSize: 10, color: C.textDim, lineHeight: 1.5,
                minHeight: 28, marginBottom: 8,
            }}>
                {mode.description}
            </div>

            {/* Stats row */}
            <div style={{
                display: 'flex', gap: 6, flexWrap: 'wrap',
                fontSize: 9, fontWeight: 800, letterSpacing: 1,
            }}>
                <span style={statPill(C)}>{mode.customerCount}客</span>
                <span style={statPill(C)}>{mode.decideSeconds}秒</span>
                <span style={micPill(mode.micEnabled, C)}>
                    {mode.micEnabled ? 'MIC ON' : 'MIC OFF'}
                </span>
            </div>

            {/* Lock hint */}
            {!unlocked && (
                <div style={{
                    fontSize: 9, color: C.textFaint, marginTop: 8,
                    letterSpacing: 1, fontWeight: 700,
                }}>
                    {remainingNights}夜で解放
                </div>
            )}
        </button>
    );
}

function statPill(c: typeof C): React.CSSProperties {
    return {
        padding: '2px 6px',
        borderRadius: 999,
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.textDim,
    };
}

function micPill(on: boolean, c: typeof C): React.CSSProperties {
    return {
        padding: '2px 6px',
        borderRadius: 999,
        background: on ? '#FEF3C7' : '#DBEAFE',
        border: `1px solid ${on ? '#FBBF24' : '#60A5FA'}`,
        color: on ? '#92400E' : '#1E40AF',
    };
}
