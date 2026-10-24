/**
 * Quiet personal achievements for the apprentice in Silent Bartender.
 * These are small internal victories that no counter would ever record,
 * things the apprentice alone (and on rare nights, Gondo or a customer)
 * would notice. Not stats, not badges. Just moments held in the chest.
 * Ordered ascending by the night on which each becomes available.
 */

export interface QuietAchievement {
    id: string;
    title: string;
    description: string;
    howItFelt: string;
    whoNoticed: 'no-one' | 'gondo-maybe' | 'customer' | 'self-only';
    unlockAfterNights: number;
}

export const QUIET_ACHIEVEMENTS: QuietAchievement[] = [
    {
        id: 'quiet-shoelace',
        title: '解けた靴紐',
        description: '客の靴紐がほつれているのを見て、何も言わず、ただ湯呑みをもう一杯出した。',
        howItFelt: '喉の奥が少しだけ熱くなったが、顔には出さなかった。',
        whoNoticed: 'no-one',
        unlockAfterNights: 5,
    },
    {
        id: 'quiet-tremor',
        title: '震える指',
        description: '自分の手が震えているのに気づきながら、徳利を一滴もこぼさずに注ぎ切った。',
        howItFelt: '息を止めていたことに、置いてから気づいた。',
        whoNoticed: 'self-only',
        unlockAfterNights: 10,
    },
    {
        id: 'quiet-gondo-snap',
        title: '飲み込んだ返事',
        description: '権藤の嫌味に対して言い返したい言葉を、今夜は一度も口に出さなかった。',
        howItFelt: '舌の裏に鉄の味が残った。',
        whoNoticed: 'gondo-maybe',
        unlockAfterNights: 18,
    },
    {
        id: 'quiet-ice-listen',
        title: '氷の声',
        description: 'グラスの氷が鳴る音で、客がもう一杯欲しいと気づき、聞かれる前に用意した。',
        howItFelt: '耳が少しだけ広くなった気がした。',
        whoNoticed: 'customer',
        unlockAfterNights: 28,
    },
    {
        id: 'quiet-breath-pause',
        title: '三拍置く',
        description: '怒った客が言い終わるまで、遮らず、三呼吸待ってから口を開いた。',
        howItFelt: '時間がゆっくり流れる場所を、自分の中に見つけた。',
        whoNoticed: 'no-one',
        unlockAfterNights: 40,
    },
    {
        id: 'quiet-knife-angle',
        title: '刃の角度',
        description: '誰も見ていない仕込みの時間に、包丁の角度を一度だけ直した。誰にも報告しなかった。',
        howItFelt: '自分との約束を守った夜だった。',
        whoNoticed: 'no-one',
        unlockAfterNights: 55,
    },
    {
        id: 'quiet-forgot-myself',
        title: '自分を忘れた夜',
        description: '閉店後、今日の自分の機嫌がどうだったか、一度も考えずに過ごしたことに気づいた。',
        howItFelt: '空っぽだが、軽かった。',
        whoNoticed: 'self-only',
        unlockAfterNights: 75,
    },
    {
        id: 'quiet-empty-seat',
        title: '空席への一礼',
        description: 'いつも来ていた客が来なかった夜、空いた席に向かって無意識に小さく頭を下げていた。',
        howItFelt: '胸の内側が静かに湿った。',
        whoNoticed: 'no-one',
        unlockAfterNights: 95,
    },
    {
        id: 'quiet-gondo-tea',
        title: '黙って置いた茶',
        description: '権藤が疲れた顔をしていた夜、頼まれてもいない熱い茶を、何も言わず隣に置いた。',
        howItFelt: '自分が大人になりかけている予感がした。',
        whoNoticed: 'gondo-maybe',
        unlockAfterNights: 115,
    },
    {
        id: 'quiet-not-correct',
        title: '訂正しなかった名前',
        description: '客に名前を間違えて呼ばれたが、訂正しなかった。その方が、その人が話しやすそうだったから。',
        howItFelt: '小さな嘘の中に、小さな優しさがあった。',
        whoNoticed: 'no-one',
        unlockAfterNights: 140,
    },
    {
        id: 'quiet-towel-fold',
        title: '布巾の畳み方',
        description: '布巾を畳む手つきが、いつのまにか権藤と同じ折り目の数になっていたことに、誰にも言わずに気づいた。',
        howItFelt: '時間が自分に手を貸していた。',
        whoNoticed: 'no-one',
        unlockAfterNights: 170,
    },
    {
        id: 'quiet-rain-smell',
        title: '雨の匂いだけで',
        description: '客が傘を差していなくても、雨が降り始めたことを空気の匂いで先に察し、暖簾をそっと引いた。',
        howItFelt: '自分の鼻が、少しだけ店の一部になっていた。',
        whoNoticed: 'no-one',
        unlockAfterNights: 200,
    },
    {
        id: 'quiet-no-flinch',
        title: '皿を落とした音',
        description: '隣の席で皿が割れる大きな音がしたのに、肩が一度も跳ねなかった。',
        howItFelt: '自分の中心が、少し深い場所に移った。',
        whoNoticed: 'gondo-maybe',
        unlockAfterNights: 240,
    },
    {
        id: 'quiet-longest-silence',
        title: '長い沈黙に耐えた',
        description: '客が話したくなさそうな夜、十五分以上一言も発さずに、ただ隣で器を磨き続けた。',
        howItFelt: '沈黙が相手を支えている手触りを覚えた。',
        whoNoticed: 'customer',
        unlockAfterNights: 290,
    },
    {
        id: 'quiet-old-regret',
        title: '昔の後悔',
        description: '昔の自分の失敗を思い出したが、手が止まらなかった。思い出は包丁の動きを邪魔しなかった。',
        howItFelt: '許すでもなく、忘れるでもなく、ただ並んでいられた。',
        whoNoticed: 'self-only',
        unlockAfterNights: 350,
    },
    {
        id: 'quiet-gondo-sigh',
        title: '権藤の溜息',
        description: '権藤が長い溜息をついたとき、意味を問わず、ただ湯を足して火を少し強めた。',
        howItFelt: '言葉のいらない返事をした気がした。',
        whoNoticed: 'gondo-maybe',
        unlockAfterNights: 420,
    },
    {
        id: 'quiet-mirror-check',
        title: '鏡を見なかった夜',
        description: '厨房の鏡に映った自分の顔を、今夜は一度も確かめなかった。それでも、所作は乱れなかった。',
        howItFelt: '自分を見張らなくても、自分でいられた。',
        whoNoticed: 'no-one',
        unlockAfterNights: 500,
    },
    {
        id: 'quiet-student-glance',
        title: '若い手つき',
        description: '新しく入った見習いの手つきを見て、昔の自分を笑わず、代わりに包丁を静かに研ぎ直した。',
        howItFelt: '自分の中の厳しさが、少しだけ柔らかくなった。',
        whoNoticed: 'gondo-maybe',
        unlockAfterNights: 620,
    },
    {
        id: 'quiet-last-cup',
        title: '最後の一杯',
        description: '閉店後、権藤のために残しておいた最後の酒を、何も言わずに徳利へ注いだ。',
        howItFelt: '師匠という言葉を、ようやく肩で理解した。',
        whoNoticed: 'no-one',
        unlockAfterNights: 800,
    },
    {
        id: 'quiet-own-shadow',
        title: '自分の影に追いつく',
        description: '暖簾を下ろしたあと、床に伸びた自分の影を見て、初めてそれを権藤の影と見分けられないと思った。',
        howItFelt: '長い道の、どこかに自分が置かれていた。',
        whoNoticed: 'no-one',
        unlockAfterNights: 1000,
    },
];

export function getQuietAchievements(totalNights: number): QuietAchievement[] {
    return QUIET_ACHIEVEMENTS.filter((a) => a.unlockAfterNights <= totalNights);
}
