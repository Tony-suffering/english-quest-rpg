/**
 * プロの通訳者が「英語にしにくい」として取り上げた日本語。
 *
 * 見出しの語だけを持ち、記事の中身は取らない。
 * 英語側で Wiktionary を recall の物差しに使ったのと同じ扱いで、
 * こちらの表がこの層を拾えているかを外から確かめるために置く。
 *
 * 出典 小松達也「訳せそうで訳せない日本語」全38回 / "Untranslatable Japanese" 全13回
 *      サイマル・アカデミー
 *
 * 頻度順の表はこの層を絶対に上に出さない。生涯1〜3万回に散らばっていて
 * 「こと」「よう」「そう」の下に沈む。だから並べ方のほうを、
 * この一覧を再現できる式に変える。そのための正解データ。
 *
 * 自動生成。手で編集しない。 node scripts/ja-seed-to-ts.mjs
 */

/** 生涯遭遇と、実測で掘れた英訳。英訳が空なのは対訳コーパスに出てこない語 */
export type InterpreterSeed = {
    ja: string;
    key: string;
    hits: number;
    en: string[];
    spread: number | null;
};

export const INTERPRETER_SOURCE = {
    name: '小松達也「訳せそうで訳せない日本語」/ "Untranslatable Japanese"',
    site: 'サイマル・アカデミー',
    urls: [
        'https://www.simulacademy.com/column/yakusesoudeyakusenai/',
        'https://www.simulacademy.com/column/untranslatable/',
    ],
} as const;

export const INTERPRETER_SEEDS: InterpreterSeed[] = [
    {
        ja: "当たり前",
        key: "当たり前",
        hits: 7154,
        en: [
            "course",
            "obvious",
            "natural"
        ],
        spread: 0.725
    },
    {
        ja: "当然",
        key: "当然",
        hits: 10814,
        en: [
            "course",
            "naturally",
            "deserved"
        ],
        spread: 0.7
    },
    {
        ja: "遠慮する",
        key: "遠慮",
        hits: 2612,
        en: [
            "shy",
            "hold back",
            "hold"
        ],
        spread: 0.9
    },
    {
        ja: "メドが立つ",
        key: "目処",
        hits: 20,
        en: [],
        spread: null
    },
    {
        ja: "風通しのいい",
        key: "風通し",
        hits: 68,
        en: [
            "place",
            "good",
            "like"
        ],
        spread: 0.667
    },
    {
        ja: "けしからん",
        key: "けしからん",
        hits: 65,
        en: [],
        spread: null
    },
    {
        ja: "苦労する",
        key: "苦労する",
        hits: 2300,
        en: [
            "trouble",
            "hard",
            "hard time"
        ],
        spread: 0.8
    },
    {
        ja: "先送りする",
        key: "先送り",
        hits: 143,
        en: [
            "delay",
            "putting",
            "off"
        ],
        spread: 0.857
    },
    {
        ja: "味のある",
        key: "味",
        hits: 11210,
        en: [],
        spread: null
    },
    {
        ja: "かっこいい",
        key: "かっこいい",
        hits: 6351,
        en: [
            "cool",
            "really cool",
            "you're so cool"
        ],
        spread: 0.4
    },
    {
        ja: "うらむ",
        key: "うらむ",
        hits: 6,
        en: [],
        spread: null
    },
    {
        ja: "を中心に",
        key: "中心",
        hits: 6073,
        en: [
            "center",
            "cores",
            "mit scientists"
        ],
        spread: 0.8
    },
    {
        ja: "だらしない",
        key: "だらしない",
        hits: 441,
        en: [
            "sloppy",
            "untidy",
            "sleaze"
        ],
        spread: 0.925
    },
    {
        ja: "こだわる",
        key: "こだわる",
        hits: 573,
        en: [
            "why",
            "obsessed",
            "past"
        ],
        spread: 0.65
    },
    {
        ja: "反省する",
        key: "反省する",
        hits: 1524,
        en: [
            "reflect",
            "there will be plenty",
            "soulsearching"
        ],
        spread: 0.765
    },
    {
        ja: "どんどん",
        key: "どんどん",
        hits: 16814,
        en: [
            "more and more",
            "becomes",
            "steadily"
        ],
        spread: 0.825
    },
    {
        ja: "思い切った",
        key: "思い切る",
        hits: 9,
        en: [],
        spread: null
    },
    {
        ja: "素直な",
        key: "素直",
        hits: 3069,
        en: [
            "honest",
            "obedient",
            "he's"
        ],
        spread: 0.825
    },
    {
        ja: "厳しい",
        key: "厳しい",
        hits: 6682,
        en: [
            "tough",
            "severe",
            "difficulties"
        ],
        spread: 0.825
    },
    {
        ja: "大事にする",
        key: "大事にする",
        hits: 266,
        en: [],
        spread: null
    },
    {
        ja: "本格的な",
        key: "本格的",
        hits: 33,
        en: [],
        spread: null
    },
    {
        ja: "軌道に乗る",
        key: "軌道に乗る",
        hits: 111,
        en: [
            "lagrange",
            "track",
            "herschel"
        ],
        spread: 0.846
    },
    {
        ja: "地味な",
        key: "地味",
        hits: 1473,
        en: [
            "plain",
            "humble",
            "plain looking"
        ],
        spread: 0.75
    },
    {
        ja: "行きづまる",
        key: "行きづまる",
        hits: 1,
        en: [],
        spread: null
    },
    {
        ja: "推移する",
        key: "推移する",
        hits: 65,
        en: [
            "takes us from point",
            "point a to chaos",
            "chaos"
        ],
        spread: 0.5
    },
    {
        ja: "覚悟する",
        key: "覚悟する",
        hits: 1202,
        en: [
            "5d's",
            "prepare",
            "team 5d's"
        ],
        spread: 0.778
    },
    {
        ja: "筋を通す",
        key: "筋を通す",
        hits: 40,
        en: [],
        spread: null
    },
    {
        ja: "迎合する",
        key: "迎合する",
        hits: 19,
        en: [],
        spread: null
    },
    {
        ja: "タイミング",
        key: "タイミング",
        hits: 8905,
        en: [
            "timing",
            "perfect",
            "perfect timing"
        ],
        spread: 0.475
    },
    {
        ja: "がんばる",
        key: "がんばる",
        hits: 166,
        en: [
            "best",
            "i'll do my best",
            "try"
        ],
        spread: 0.647
    },
    {
        ja: "突出する",
        key: "突出する",
        hits: 105,
        en: [],
        spread: null
    },
    {
        ja: "おかしい",
        key: "おかしい",
        hits: 14355,
        en: [
            "strange",
            "funny",
            "it's funny"
        ],
        spread: 0.8
    },
    {
        ja: "切り抜ける",
        key: "切り抜ける",
        hits: 121,
        en: [
            "somehow",
            "only way",
            "get"
        ],
        spread: 0.909
    },
    {
        ja: "まとめる",
        key: "まとめる",
        hits: 838,
        en: [
            "together",
            "summarize",
            "put them together"
        ],
        spread: 0.825
    },
    {
        ja: "開き直る",
        key: "開き直る",
        hits: 66,
        en: [
            "defiant",
            "care",
            "like"
        ],
        spread: 0.667
    },
    {
        ja: "車の両輪",
        key: "両輪",
        hits: 28,
        en: [],
        spread: null
    },
    {
        ja: "体質",
        key: "体質",
        hits: 502,
        en: [
            "predisposition",
            "constitution",
            "negligence"
        ],
        spread: 0.9
    },
    {
        ja: "中途半端",
        key: "中途半端",
        hits: 996,
        en: [
            "halfway",
            "halfhearted",
            "halfassed"
        ],
        spread: 0.825
    },
    {
        ja: "壁にぶつかる",
        key: "壁にぶつかる",
        hits: 79,
        en: [
            "hit",
            "wall"
        ],
        spread: 0.25
    },
    {
        ja: "大筋合意",
        key: "大筋合意",
        hits: 0,
        en: [],
        spread: null
    },
    {
        ja: "すり合わせる",
        key: "すり合わせる",
        hits: 33,
        en: [],
        spread: null
    },
    {
        ja: "こまめに",
        key: "こまめに",
        hits: 106,
        en: [],
        spread: null
    },
    {
        ja: "温度差",
        key: "温度差",
        hits: 77,
        en: [],
        spread: null
    },
    {
        ja: "教養",
        key: "教養",
        hits: 357,
        en: [
            "educated",
            "literacy",
            "literacy courses"
        ],
        spread: 0.8
    },
    {
        ja: "片付く",
        key: "片付く",
        hits: 85,
        en: [
            "roc's",
            "solved roc's",
            "roc's insurance"
        ],
        spread: 0.917
    },
    {
        ja: "寄り添う",
        key: "寄り添う",
        hits: 196,
        en: [
            "close",
            "patients",
            "gets close"
        ],
        spread: 0.714
    },
    {
        ja: "大変だ",
        key: "大変",
        hits: 27868,
        en: [
            "hard",
            "tough",
            "god"
        ],
        spread: 0.875
    },
    {
        ja: "凛とした",
        key: "凛",
        hits: 631,
        en: [],
        spread: null
    },
    {
        ja: "先取りする",
        key: "先取りする",
        hits: 43,
        en: [],
        spread: null
    },
    {
        ja: "現場",
        key: "現場",
        hits: 12933,
        en: [
            "scene",
            "crime",
            "crime scene"
        ],
        spread: 0.675
    },
    {
        ja: "粛々と",
        key: "粛々と",
        hits: 0,
        en: [],
        spread: null
    },
    {
        ja: "説明責任",
        key: "説明責任",
        hits: 172,
        en: [
            "accountability",
            "accountable",
            "more accountable"
        ],
        spread: 0.45
    }
];

/** 実測。この一覧のうち何件を、こちらの表が拾えているか */
export const INTERPRETER_STATS = {
    total: 52,
    inCorpus: 50,
    withEnglish: 33,
} as const;
