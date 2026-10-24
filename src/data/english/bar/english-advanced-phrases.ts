/**
 * Advanced English phrases heard in bar and izakaya contexts.
 * Companion to english-expressions-learned.ts, targeting experienced players.
 * Includes idioms, indirect expressions, and polite-casual constructions.
 * Unlocked progressively as total nights accumulate.
 */

export interface AdvancedPhrase {
    id: string;
    englishPhrase: string;
    jpTranslation: string;
    registerNote: string;
    exampleContext: string;
    pitfall?: string;
    unlockAfterNights: number;
}

export const ADVANCED_PHRASES: AdvancedPhrase[] = [
    {
        id: "adv-could-use-drink",
        englishPhrase: "I could use a drink.",
        jpTranslation: "一杯やりたい気分だ。",
        registerNote: "カジュアル。疲れた帰り道や重い一日の後に自然。ビジネスの乾杯挨拶では使わない。",
        exampleContext: "金曜夜、スーツ姿の常連がカウンターに腰を下ろしてつぶやく最初の一言。",
        pitfall: "「use a drink」を直訳して「飲み物を使う」と誤解しがち。実際は「一杯必要」の婉曲表現。",
        unlockAfterNights: 20,
    },
    {
        id: "adv-call-it-a-night",
        englishPhrase: "Let's call it a night.",
        jpTranslation: "今夜はこのへんでお開きにしよう。",
        registerNote: "カジュアルから丁寧カジュアルまで幅広く使える。会議や仕事終わりでも可。",
        exampleContext: "終電を気にする二人組の客が、グラスを空にしながら切り出す別れの合図。",
        pitfall: "「call」をそのまま「電話する」と取ると意味不明になる。慣用句として覚える。",
        unlockAfterNights: 35,
    },
    {
        id: "adv-makes-two-of-us",
        englishPhrase: "That makes two of us.",
        jpTranslation: "それは俺も同じだよ。",
        registerNote: "カジュアル。相手のぼやきや共感にうなずく時に使う。上司への返答には少し軽い印象。",
        exampleContext: "「今日は疲れた」とこぼす客に、隣の常連が苦笑いしながら返す一言。",
        unlockAfterNights: 50,
    },
    {
        id: "adv-one-of-those-days",
        englishPhrase: "It's been one of those days.",
        jpTranslation: "今日はそういう日だったんだ。",
        registerNote: "カジュアル。詳細を言わずに「色々あった」と匂わせる便利な表現。",
        exampleContext: "ネクタイを緩めながら座る客が、店主の「お疲れさま」に返す疲れた返事。",
        pitfall: "「those days」が何を指すか説明しなくていい。聞き手が察する前提の表現。",
        unlockAfterNights: 70,
    },
    {
        id: "adv-no-offense-but",
        englishPhrase: "No offense, but...",
        jpTranslation: "悪気はないんだけど、...",
        registerNote: "丁寧カジュアル。批判や反論の前置き。ただし後に続く内容は結局失礼になりがち。",
        exampleContext: "常連が店主の新メニューについて率直な感想を述べる前に置く前置き。",
        pitfall: "この言葉を置けば何でも許されるわけではない。後に続く内容は慎重に。",
        unlockAfterNights: 90,
    },
    {
        id: "adv-honest-with-you",
        englishPhrase: "I'll be honest with you.",
        jpTranslation: "正直に言わせてもらうとね。",
        registerNote: "丁寧カジュアル。相手との距離を縮めつつ本音を伝える時に自然。",
        exampleContext: "客が仕事の悩みを打ち明ける前、一拍置いて店主に向き直る瞬間。",
        unlockAfterNights: 115,
    },
    {
        id: "adv-not-my-cup-of-tea",
        englishPhrase: "That's not my cup of tea.",
        jpTranslation: "それは俺の好みじゃないな。",
        registerNote: "カジュアル。好き嫌いを角立てず伝える英国由来の慣用句。アメリカでも通じる。",
        exampleContext: "店主に勧められた甘めのカクテルを客がやんわり断る場面。",
        pitfall: "お茶の話をしているわけではない。直訳厳禁。",
        unlockAfterNights: 140,
    },
    {
        id: "adv-dont-sweat-it",
        englishPhrase: "Don't sweat it.",
        jpTranslation: "気にしなくていいって。",
        registerNote: "かなりカジュアル。目上の人に使うと軽すぎる印象。友人・同僚向け。",
        exampleContext: "小銭を切らした客に、店主が笑って手を振る時の返し。",
        unlockAfterNights: 170,
    },
    {
        id: "adv-owe-you-one",
        englishPhrase: "I owe you one.",
        jpTranslation: "これは借りにしとくよ。",
        registerNote: "カジュアル。助けてもらった相手への軽い感謝。正式なビジネス場面では不向き。",
        exampleContext: "傘を貸してくれた常連に、帰り際の客が肩を叩きながら伝える一言。",
        unlockAfterNights: 200,
    },
    {
        id: "adv-pick-your-brain",
        englishPhrase: "Can I pick your brain?",
        jpTranslation: "ちょっと知恵を貸してもらえないかな。",
        registerNote: "丁寧カジュアル。相談ごとを切り出す柔らかい前置き。ビジネスでも使える。",
        exampleContext: "業界の先輩客に、若い客がカウンター越しにそっと話しかける時の入り方。",
        pitfall: "脳を物理的に突くイメージで引かれがち。比喩だと知らないと怖い表現。",
        unlockAfterNights: 230,
    },
    {
        id: "adv-split-the-bill",
        englishPhrase: "Let's split the bill.",
        jpTranslation: "割り勘にしよう。",
        registerNote: "カジュアルから丁寧まで幅広く。友人同士でも仕事関係でも無難。",
        exampleContext: "デートではないが同僚同士で飲んだ帰り、レジ前で自然に切り出される定番。",
        pitfall: "「go Dutch」も同じ意味だが、やや古風で場面によっては違和感。",
        unlockAfterNights: 270,
    },
    {
        id: "adv-not-going-to-lie",
        englishPhrase: "I'm not going to lie.",
        jpTranslation: "嘘はつかないけどさ。",
        registerNote: "カジュアル。本音を切り出す前置き。近年SNS経由で定着した口語。",
        exampleContext: "店主の新作料理を試食した客が、少し間を置いて率直な感想を述べる前。",
        unlockAfterNights: 310,
    },
    {
        id: "adv-cut-me-some-slack",
        englishPhrase: "Cut me some slack.",
        jpTranslation: "もう少し大目に見てくれよ。",
        registerNote: "カジュアル。気軽な文句・お願いに使う。上司には使わない方が無難。",
        exampleContext: "注文を間違えた店主に、常連がからかい混じりに返される軽い抗議。",
        pitfall: "「slack」を単語として分解しても意味が出ない。慣用句として丸覚えが必要。",
        unlockAfterNights: 360,
    },
    {
        id: "adv-grain-of-salt",
        englishPhrase: "Take it with a grain of salt.",
        jpTranslation: "話半分に聞いといてね。",
        registerNote: "丁寧カジュアル。噂話や不確かな情報を伝える時の責任回避フレーズ。",
        exampleContext: "業界の噂を客に話す店主が、最後に肩をすくめて付け加える締めの一言。",
        unlockAfterNights: 410,
    },
    {
        id: "adv-seen-better-days",
        englishPhrase: "I've seen better days.",
        jpTranslation: "最近は調子がいいとは言えないね。",
        registerNote: "丁寧カジュアル。体調・状況の不調を遠回しに伝える大人の表現。",
        exampleContext: "久しぶりに顔を出した常連が、店主の「元気だった?」に苦笑で返す答え。",
        pitfall: "物にも使える。「This jacket has seen better days」=「この上着もだいぶ古い」。",
        unlockAfterNights: 460,
    },
    {
        id: "adv-all-ears",
        englishPhrase: "I'm all ears.",
        jpTranslation: "さあ、聞かせてもらおうか。",
        registerNote: "カジュアル。相手に話を促す時の温かい表現。会議でも軽く使える。",
        exampleContext: "悩みがありそうな客にグラスを置きながら、店主がカウンターに肘をつく瞬間。",
        unlockAfterNights: 520,
    },
    {
        id: "adv-drink-to-that",
        englishPhrase: "I'll drink to that.",
        jpTranslation: "それには乾杯できるな。",
        registerNote: "カジュアル。相手の発言に同意し、乾杯の動作を伴うと自然。",
        exampleContext: "客が人生哲学を語った直後、隣の客がグラスを掲げて同意を示す場面。",
        unlockAfterNights: 600,
    },
    {
        id: "adv-hit-me-with-another",
        englishPhrase: "Hit me with another.",
        jpTranslation: "もう一杯頼むよ。",
        registerNote: "カジュアル。バーテンダーとの距離が近い常連の口調。高級店では不向き。",
        exampleContext: "空になったグラスをカウンターに置き、常連が店主と目を合わせて短く伝える瞬間。",
        pitfall: "「hit me」を殴れと誤解するのはよくある初学者の反応。文脈で判断。",
        unlockAfterNights: 700,
    },
    {
        id: "adv-its-on-me-tonight",
        englishPhrase: "It's on me tonight.",
        jpTranslation: "今夜は俺のおごりだ。",
        registerNote: "カジュアル。親しい相手への気前のいい申し出。ビジネス接待でも通じる。",
        exampleContext: "昇進した常連が同僚を連れて来店し、レジで笑顔で伝える定番の一言。",
        pitfall: "「on me」は「私の上に」ではなく「私持ち」。前置詞 on の感覚が鍵。",
        unlockAfterNights: 850,
    },
    {
        id: "adv-could-be-worse",
        englishPhrase: "Could be worse.",
        jpTranslation: "まあ、もっとひどい時もあったさ。",
        registerNote: "カジュアル。弱音を吐きすぎず、でも本音をにじませる大人の返し方。",
        exampleContext: "一年ぶりに戻ってきた常連が、店主の気遣う視線に静かに返す短い答え。",
        unlockAfterNights: 1000,
    },
];

export function getAdvancedLearned(totalNights: number): AdvancedPhrase[] {
    return ADVANCED_PHRASES.filter((phrase) => totalNights >= phrase.unlockAfterNights);
}
