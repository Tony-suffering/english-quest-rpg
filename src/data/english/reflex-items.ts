// v6 3秒で返せ — instant-reply reflex trainer
// 状況+相手の一言が出る→3秒以内に反射で返す→良い返しを見る。瞬発力に全振り。
// データはワークフロー(reflex-v6)が生成。下記は見本兼フォールバック。

export interface ReflexItem {
    id: string;
    situation_ja: string;  // 状況
    prompt_en: string;     // 相手の一言(これに返す)
    replies: { en: string; tag: 'good' | 'awkward'; note: string }[];
}

export const REFLEX_ITEMS: ReflexItem[] = [
    {
        id: 'r-001',
        situation_ja: "店員にレジで。",
        prompt_en: "How's your day going?",
        replies: [
            { en: "Pretty good, thanks. You?", tag: 'good', note: "店員の挨拶は社交辞令。中身より速さ。Pretty good + You? で即返すのが正解。" },
            { en: "I'm fine. And you?", tag: 'awkward', note: "教科書英語。通じるが硬い。Pretty good / Not bad の方が自然。" },
        ],
    },
    {
        id: 'r-002',
        situation_ja: "同僚に廊下ですれ違いざま。",
        prompt_en: "Hey, long time no see! What have you been up to?",
        replies: [
            { en: "Oh, not much, just busy with work. You?", tag: 'good', note: "What have you been up to? は『最近どう?』。Not much が万能の出だし。詰まったらこれ。" },
            { en: "I have been very busy these days.", tag: 'awkward', note: "間違ってないが重い。すれ違いの一瞬は Not much で軽く流すのが場に合う。" },
        ],
    },
];
