/**
 * Silent Bartender -- Gondo's sleep talk.
 *
 * Occasionally, the sleeping master murmurs something from the back
 * room. The player catches fragments. Not coherent advice — just
 * the kind of thing he might have said if awake.
 */

export const GONDO_SLEEP_TALK: string[] = [
    '...「ニューヨーク、静か、だった」...',
    '...「あいつは、帰って来なかった」...',
    '...「写真、棚の、奥」...',
    '...「暖簾を、染め直せ」...',
    '...「カウンターの傷、触るな」...',
    '...「師匠、すみません」...',
    '...「犬、また、来るぞ」...',
    '...「幽霊じゃ、ないんだ、あれは」...',
    '...「春になれば」...',
    '...「おい、まだ、客がいる」...',
    '...「明日は、雨だ」...',
    '...「お玉、曲がってる」...',
];

/** Roll for sleep talk during late/closing phases. */
export function maybeSleepTalk(chance = 0.03): string | null {
    if (Math.random() > chance) return null;
    return GONDO_SLEEP_TALK[Math.floor(Math.random() * GONDO_SLEEP_TALK.length)];
}
