/**
 * Silent Bartender -- closing-time sequence.
 *
 * A small ritual sequence the player performs at 5 AM, shown briefly
 * after the ended state (before the result summary). Fades through
 * several JP prose beats as the apprentice closes the shop.
 */

export interface ClosingStep {
    id: string;
    text: string;
    pause: number;  // ms before next
}

export const CLOSING_SEQUENCE: ClosingStep[] = [
    {
        id: 'close-01',
        text: '最後のグラスを洗い、布で拭いた。',
        pause: 1800,
    },
    {
        id: 'close-02',
        text: 'カウンターを左から右へ、もう一度拭いた。',
        pause: 1800,
    },
    {
        id: 'close-03',
        text: '灯りを一つだけ残して、奥の二つを消した。',
        pause: 1800,
    },
    {
        id: 'close-04',
        text: '暖簾を下ろし、丁寧に畳んで、カウンターの奥に置いた。',
        pause: 2000,
    },
    {
        id: 'close-05',
        text: '扉に鍵をかけた。',
        pause: 1600,
    },
    {
        id: 'close-06',
        text: '外の空気は、いつもより少しだけ冷たく感じた。',
        pause: 2000,
    },
];

export function totalClosingDuration(): number {
    return CLOSING_SEQUENCE.reduce((sum, s) => sum + s.pause, 0);
}
