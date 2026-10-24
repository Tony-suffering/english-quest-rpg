/**
 * Silent Bartender -- color palette presets.
 *
 * The light-theme palette used throughout the game. Centralized here
 * so component authors can pull from a single source.
 */

export const BAR_PALETTE = {
    // Backgrounds
    bg: '#FAF6EC',              // off-white paper
    bgDeep: '#F2ECD8',          // cream menu-paper
    card: '#FFFFFF',            // order-slip white
    cardHover: '#FFF8E1',       // amber-tinted

    // Borders
    border: '#E5DCC0',          // tea-stain edge
    borderBright: '#C8A45C',

    // Gold / amber (brand)
    amber: '#B8860B',           // dark gold ink
    amberDim: '#8B6508',
    amberBg: '#FFF5D1',
    amberStrong: '#92700A',

    // Accent colors
    red: '#B91C1C',             // error / bust
    redBg: '#FDEEEE',
    green: '#047857',           // success / served
    greenBg: '#ECFDF5',
    blue: '#1E40AF',            // info / navigate
    blueBg: '#EFF6FF',
    purple: '#6D28D9',          // existential / transitions
    purpleBg: '#F5F3FF',

    // Text
    text: '#1C1917',            // sumi ink
    textSub: '#44403C',
    textDim: '#57534E',
    textFaint: '#A8A29E',
    textGhost: '#D6D3D1',

    // Overlay
    overlay: 'rgba(250,246,236,0.95)',
    overlayDark: 'rgba(28,25,23,0.15)',
} as const;

export type BarPaletteKey = keyof typeof BAR_PALETTE;

/** Small helper: borders + background as a paired pair. */
export function paperCard(): { background: string; border: string } {
    return { background: BAR_PALETTE.card, border: `1px solid ${BAR_PALETTE.border}` };
}

/** Small helper: amber badge styles. */
export function amberBadge(): { background: string; color: string; border: string } {
    return {
        background: BAR_PALETTE.amberBg,
        color: BAR_PALETTE.amber,
        border: `1px solid ${BAR_PALETTE.amber}55`,
    };
}
