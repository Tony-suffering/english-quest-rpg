/**
 * Silent Bartender -- visual tokens.
 *
 * Tiny text glyphs and symbols used across the UI where emojis are
 * forbidden. Use these instead of manually typing unicode characters
 * so the project's no-emoji rule is enforced centrally.
 */

export const TOKENS = {
    // Dots and progress
    dot: '・',
    dotThin: '·',
    dotHeavy: '●',
    dotEmpty: '○',

    // Symbols
    check: '✓',       // acceptable as typographic mark, not emoji
    cross: '×',
    arrowRight: '→',
    arrowLeft: '←',
    arrowDown: '↓',
    arrowUp: '↑',
    ellipsis: '…',

    // Bar-themed ascii
    noren: '|||',     // fake vertical noren, three strokes
    chopsticks: '╎╎',
    cupBottom: '⌣',
    moon: '○',
    counterEdge: '─',
    sparkle: '*',

    // Separators
    dash: '─',
    dashes: '───',
    bullet: '·',
    pipe: '│',
} as const;

export type TokenKey = keyof typeof TOKENS;
