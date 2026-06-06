// v4 聞き取りディクテーション — degraded/fast listening
// 本丸: 崩れた・速い実英語を聞いて打つ。聞き間違えポイント(mishear)を可視化する。
// データはワークフロー(dictation-v4)が生成。下記は見本兼フォールバック。

export interface DictationItem {
    id: string;
    domain: string;     // 場面
    text_en: string;    // 流れる実英語(崩れ込み)
    ja: string;         // 意味
    mishear: string;    // 日本人が聞き間違える所と理由
    tip: string;        // 聞き取りのコツ
}

export const DICTATION_ITEMS: DictationItem[] = [
    {
        id: 'd-001', domain: 'カフェ',
        text_en: "Whaddya want? — I'll have a tall latte.",
        ja: "何にする？ — トールラテで。",
        mishear: "Whaddya は What do you が完全に潰れた音。『ワダヤ』に聞こえる。do you が消えるのを知らないと一生取れない。",
        tip: "文頭の潰れた塊は『What do you / Did you / Don't you』のどれか。意味から逆算しろ。",
    },
    {
        id: 'd-002', domain: '空港',
        text_en: "Lemme see your boarding pass real quick.",
        ja: "搭乗券ちょっと見せて。",
        mishear: "Lemme = Let me。real quick は『ちょっとだけ』の決まり文句で、速いと『リークイック』。",
        tip: "Lemme / Gimme / Gonna は完全に1単語として耳に刻め。分解して待つと遅れる。",
    },
];
