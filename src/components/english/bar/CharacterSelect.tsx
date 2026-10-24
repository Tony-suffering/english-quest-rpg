/**
 * Silent Bartender — CharacterSelect
 *
 * Side-by-side compact cards that let the player choose between the
 * default (無名) and リサ. The Lisa card is locked off-cycle and shows
 * a hint of when it unlocks (every 7th night).
 *
 * Light theme. No emojis. All Japanese for player-facing copy.
 */

'use client';

import type { Character } from '@/lib/english/bar/character';

// Light-theme palette (matches the bar page's stone/amber accents).
const C = {
    bg: '#ffffff',
    surface: '#fafaf9',      // stone-50
    surfaceMuted: '#f5f5f4', // stone-100
    border: '#e7e5e4',       // stone-200
    borderActive: '#a8a29e', // stone-400
    text: '#1c1917',         // stone-900
    textSoft: '#44403c',     // stone-700
    textDim: '#78716c',      // stone-500
    gold: '#b8860b',         // iwasaki gold (tuned for light bg)
    goldSoft: '#fef3c7',     // amber-100
    emerald: '#059669',      // emerald-600
    emeraldSoft: '#d1fae5',  // emerald-100
};

interface Props {
    character: Character;
    onSelect: (c: Character) => void;
    lisaUnlocked: boolean;
}

export default function CharacterSelect({ character, onSelect, lisaUnlocked }: Props) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                width: '100%',
                maxWidth: 560,
                margin: '0 auto',
            }}
        >
            {/* Default — 無名 */}
            <CharacterCard
                active={character === 'default'}
                disabled={false}
                onClick={() => onSelect('default')}
                accent={C.gold}
                accentSoft={C.goldSoft}
                label="無名"
                subtitle="マスターの代打"
                description="権藤がいない夜、黙ってカウンターに立つ。"
                lockedHint={null}
            />

            {/* Lisa — リサ */}
            <CharacterCard
                active={character === 'lisa'}
                disabled={!lisaUnlocked}
                onClick={() => {
                    if (lisaUnlocked) onSelect('lisa');
                }}
                accent={C.emerald}
                accentSoft={C.emeraldSoft}
                label="リサ"
                subtitle="今夜だけ、店主"
                description="権藤は不在。リサの流儀で、リサの一夜。"
                lockedHint={lisaUnlocked ? null : '7夜ごとに出現(7, 14, 21...)'}
            />
        </div>
    );
}

interface CardProps {
    active: boolean;
    disabled: boolean;
    onClick: () => void;
    accent: string;
    accentSoft: string;
    label: string;
    subtitle: string;
    description: string;
    lockedHint: string | null;
}

function CharacterCard({
    active,
    disabled,
    onClick,
    accent,
    accentSoft,
    label,
    subtitle,
    description,
    lockedHint,
}: CardProps) {
    const locked = disabled;
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={locked}
            aria-pressed={active}
            style={{
                appearance: 'none',
                textAlign: 'left',
                padding: '14px 14px 16px',
                borderRadius: 14,
                background: active ? accentSoft : C.surface,
                border: `1px solid ${active ? accent : C.border}`,
                boxShadow: active
                    ? `0 1px 0 rgba(0,0,0,0.02), 0 0 0 3px ${accentSoft}`
                    : '0 1px 0 rgba(0,0,0,0.02)',
                cursor: locked ? 'not-allowed' : 'pointer',
                opacity: locked ? 0.55 : 1,
                transition: 'all 160ms ease',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                color: C.text,
                minHeight: 132,
            }}
        >
            <div
                style={{
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    fontWeight: 700,
                    color: accent,
                    textTransform: 'uppercase',
                }}
            >
                {active ? 'SELECTED' : locked ? 'LOCKED' : 'SELECT'}
            </div>
            <div
                style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: C.text,
                    letterSpacing: '0.04em',
                }}
            >
                {label}
            </div>
            <div
                style={{
                    fontSize: 12,
                    color: C.textSoft,
                    fontWeight: 600,
                }}
            >
                {subtitle}
            </div>
            <div
                style={{
                    fontSize: 12,
                    color: C.textDim,
                    lineHeight: 1.7,
                    marginTop: 2,
                }}
            >
                {description}
            </div>
            {lockedHint ? (
                <div
                    style={{
                        marginTop: 'auto',
                        paddingTop: 8,
                        fontSize: 11,
                        color: C.textDim,
                        fontStyle: 'italic',
                        borderTop: `1px dashed ${C.border}`,
                    }}
                >
                    {lockedHint}
                </div>
            ) : null}
        </button>
    );
}
