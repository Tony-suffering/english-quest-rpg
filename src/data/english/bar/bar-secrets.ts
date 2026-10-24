/**
 * Silent Bartender -- bar secrets.
 *
 * Small lore items revealed over many nights of play. Not unlocked
 * by achievements — unlocked by being there. Reference-only, for
 * future content reveal hooks.
 */

export interface BarSecret {
    id: string;
    title: string;
    body: string;
    revealAfter: number; // night count
}

export const BAR_SECRETS: BarSecret[] = [
    {
        id: 'sec-left-door',
        title: '左の扉',
        body: 'カウンターの奥に、もう一つ扉がある。\n常に閉まっていて、権藤だけが開ける。\nその向こうに何があるかは、本人も説明したがらない。',
        revealAfter: 30,
    },
    {
        id: 'sec-third-seat',
        title: '三番目の席',
        body: 'カウンターの三番目の席は、他より少しだけ座面が柔らかい。\n権藤が自分で布を入れ替えた。\n理由は「あの席の客に、長く座ってほしかった」。',
        revealAfter: 45,
    },
    {
        id: 'sec-morning-delivery',
        title: '朝の配達',
        body: '毎朝5時、店の裏口に新鮮な酒と野菜が届く。\n誰が届けるかは、権藤も知らない。\n20年間、一度も遅れたことがない。',
        revealAfter: 60,
    },
    {
        id: 'sec-the-ladle',
        title: 'お玉の曲がり',
        body: 'あのお玉は、権藤が師匠から受け継ぐ前から曲がっていた。\n師匠はそれを「前の店主の癖」と言った。\n誰の癖かは、もう誰も知らない。',
        revealAfter: 80,
    },
    {
        id: 'sec-the-ghost-seat',
        title: '幽霊の席',
        body: '奥の隅の席には、座る客がいない。\nだが、偶に冷たい空気が流れる。\n権藤は「あそこは、前の師匠の席だ」と言った。一度だけ。',
        revealAfter: 100,
    },
    {
        id: 'sec-the-silent-agreement',
        title: '暗黙の契約',
        body: 'この店には、書かれていない契約がある。\n「客は黙って入り、黙って出る」。\n破った客は一度もいない。権藤が空気を作っているから。',
        revealAfter: 150,
    },
    {
        id: 'sec-the-reason',
        title: '店を閉めない理由',
        body: '権藤は昔、店を辞めようと思った夜が一度ある。\n客は来なかった。代わりに、師匠の亡霊が座っていた。\nそれからは、誰が来なくても開ける、と決めた。',
        revealAfter: 200,
    },
];

export function getRevealedSecrets(totalNights: number): BarSecret[] {
    return BAR_SECRETS.filter(s => totalNights >= s.revealAfter);
}
