// v5 同時通訳ジム — JP→EN consecutive interpretation drill
// 日本語が出る→その場で英語を口に出す→モデル訳と分解を見る。通訳案内士/英検二次の筋トレ。
// データはワークフロー(interpret-v5)が生成。下記は見本兼フォールバック。

export interface InterpretItem {
    id: string;
    topic: string;      // 分野
    ja: string;         // お題(日本語)
    en: string;         // モデル英訳
    alts: string[];     // 別の言い方
    breakdown: string;  // どう組み立てたか/詰まりやすい所
}

export const INTERPRET_ITEMS: InterpretItem[] = [
    {
        id: 'i-001', topic: '日本文化',
        ja: "初詣というのは、年が明けて初めて神社やお寺にお参りに行く習慣です。",
        en: "Hatsumode is the custom of making your first visit of the year to a shrine or temple.",
        alts: ["It's the tradition of visiting a shrine or temple for the first time in the new year.", "People go to a shrine or temple right after New Year's to pray for the year ahead."],
        breakdown: "『〜という習慣です』は the custom of -ing が鉄板。固有名詞(初詣)はそのまま出して of で説明を足す。これ一個の型で和文化の8割が訳せる。",
    },
    {
        id: 'i-002', topic: '道案内',
        ja: "この道をまっすぐ行って、二つ目の信号を右に曲がると左手にあります。",
        en: "Go straight down this street, turn right at the second light, and it'll be on your left.",
        alts: ["Head straight, take a right at the second set of lights, and you'll see it on your left.", "Keep going straight, right at the second signal, it's on the left side."],
        breakdown: "道案内は命令形を and で繋ぐだけ。『二つ目の信号』= the second light/signal。『左手に』= on your left。語順は日本語とほぼ同じで楽。",
    },
];
