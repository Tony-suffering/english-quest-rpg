/**
 * Silent Bartender -- Gondo's micro-awakenings.
 *
 * Rare moments where the sleeping master briefly stirs in the back.
 * Shown as a brief flash of text at the top of the status strip.
 * Very rare (2% chance per customer).
 */

export const GONDO_AWAKENINGS: string[] = [
    '...奥で、権藤が一度だけ、身動ぎした。',
    '...権藤が、寝ながら微かに頷いたように見えた。',
    '...奥の椅子で、古い本のページが一枚、独りでにめくれた。',
    '...マスターが目を半分だけ開けて、すぐにまた閉じた。',
    '...奥から、小さな咳が聞こえた。そして静寂。',
    '...マスターが寝言で「いいぞ」と言った、気がする。',
    '...奥の椅子の位置が、さっきより少しだけズレている。',
    '...権藤が夢の中で、誰かに「黙れ」と言ったようだった。',
    '...マスターの足が、椅子の下で、一度だけ組み直された。',
    '...奥の暗がりで、権藤の眼鏡が光を反射した、一瞬。',
];

export function maybeAwakening(chance = 0.02): string | null {
    if (Math.random() > chance) return null;
    return GONDO_AWAKENINGS[Math.floor(Math.random() * GONDO_AWAKENINGS.length)];
}
