/**
 * Silent Bartender -- Night 1000 finale.
 *
 * The player has played 1000 nights. This is the ceremonial closing
 * sequence. Once unlocked, the player can view it any time from the
 * Gondo journal. They can also replay it as a ritual.
 */

export interface FinaleScene {
    id: string;
    text: string;          // JP prose
    pause: number;         // ms before next
}

export const NIGHT_1000_FINALE: FinaleScene[] = [
    {
        id: 'scene-01',
        text: '千夜目の朝。お前は店を閉めた。暖簾を下ろす手が、いつもより少しだけ重く感じた。',
        pause: 3000,
    },
    {
        id: 'scene-02',
        text: 'カウンターを拭く。木目が、自分の手の形に凹んでいる。千夜分の摩擦が、静かな記録として残っている。',
        pause: 3500,
    },
    {
        id: 'scene-03',
        text: '奥の部屋を覗くと、権藤はそこにいた。座って、窓の外を見ていた。目は開いていた。',
        pause: 3500,
    },
    {
        id: 'scene-04',
        text: '「千夜、よくやった」。権藤が言った。声は、最初の夜と同じ響きだった。',
        pause: 3000,
    },
    {
        id: 'scene-05',
        text: '「この暖簾は、次にお前が誰かに渡すものだ。俺が師匠から貰って、お前に渡したように」。',
        pause: 4000,
    },
    {
        id: 'scene-06',
        text: '権藤は立ち上がった。前掛けを外した。畳んで、カウンターの奥に置いた。',
        pause: 3500,
    },
    {
        id: 'scene-07',
        text: '「俺は、これから旅に出る。客として、どこかの店の暖簾をくぐる。名前のない店がいい」。',
        pause: 4000,
    },
    {
        id: 'scene-08',
        text: 'お前は何も言わなかった。千夜、そう訓練されてきた。',
        pause: 3000,
    },
    {
        id: 'scene-09',
        text: '権藤は、カウンターの右端にある小さな十字の傷に触れた。\n「これ、俺がつけた」と、初めて言った。',
        pause: 4500,
    },
    {
        id: 'scene-10',
        text: '「開店の夜、最初の客が来る前に、鍵を落とした。それが傷になった。消そうと思えば消せたが、残した」。',
        pause: 4500,
    },
    {
        id: 'scene-11',
        text: '「傷は、店の一部だ。お前も、どこかに一つ、残していけ」。',
        pause: 4000,
    },
    {
        id: 'scene-12',
        text: '権藤は扉を開けた。暖簾の下をくぐった。振り返らなかった。',
        pause: 3500,
    },
    {
        id: 'scene-13',
        text: 'お前は、新しく師匠になった。',
        pause: 3000,
    },
    {
        id: 'scene-14',
        text: '明日も、店を開ける。',
        pause: 4000,
    },
];

/** Check if player has unlocked the finale. */
export function isFinaleUnlocked(totalNights: number): boolean {
    return totalNights >= 1000;
}
