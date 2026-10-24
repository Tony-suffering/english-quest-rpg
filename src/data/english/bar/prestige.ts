/**
 * Silent Bartender -- prestige system.
 *
 * For players who reach 1000 nights and choose to continue.
 * Prestiging resets the visible night counter but gives a permanent
 * badge and reveals a new layer of content (future expansion).
 */

export interface PrestigeLevel {
    level: number;
    title: string;
    description: string;   // JP, 1-2 lines
    requirement: number;   // total nights required
}

export const PRESTIGE_LEVELS: PrestigeLevel[] = [
    {
        level: 1,
        title: '一周',
        description: '1000夜を達成した。\n店に戻ってきたお前は、まだ同じ前掛けを巻いている。',
        requirement: 1000,
    },
    {
        level: 2,
        title: '二周',
        description: '2000夜。\n二度目の1000夜を越えた者だけが知る沈黙がある。',
        requirement: 2000,
    },
    {
        level: 3,
        title: '三周',
        description: '3000夜。\nお前はもう、権藤の存在を疑わない。',
        requirement: 3000,
    },
    {
        level: 4,
        title: '四周',
        description: '4000夜。\n季節が三巡半した。窓の外の街も、少しずつ変わっていった。',
        requirement: 4000,
    },
    {
        level: 5,
        title: '十年',
        description: '3650夜相当。10年分の夜をこの店で重ねた。\n街はもはや、お前の顔を覚えている。',
        requirement: 3650,
    },
];

export function getPrestigeLevel(totalNights: number): PrestigeLevel | null {
    const eligible = PRESTIGE_LEVELS.filter(p => totalNights >= p.requirement);
    if (eligible.length === 0) return null;
    return eligible[eligible.length - 1];
}

export function isPrestigeEligible(totalNights: number): boolean {
    return totalNights >= 1000;
}
