/**
 * note遠征 -- 英語コミュニティの外にいる書き手の記事を読みに行く作戦のデータ。
 *
 * ループ: 面白い日本語の記事 → 3層で訳す(ごみ訳/note公式AI訳/俺の面白版) →
 * 笑いながら英語がカード化される → 日本語で感想を返す → noteで紹介すれば作者にも読者が返る。
 * ビジネスに繋がらなくても、名訳に落とした時点で教材として元が取れている。繋がりはボーナス。
 *
 * 人選のルール (2026-07-29 とにお指示):
 *  - 大物は選ばない。コメントを読まない相手に返信しても作戦にならない
 *  - 最新(数日以内)・中堅・これから伸びる人。スキ50-300、コメント欄が生きてる規模
 *  - 「本気で面白いと思った」記事だけ。義理で選ばない
 *
 * 3層:
 *  chokuyaku  … 逐語ごみ訳(比較用のわざと死んだ英語)
 *  noteEn     … note公式のAI英訳 (?hl=en)。Google の生成AI。無い記事は noEnReason に理由
 *  omoshiro   … 俺の面白版 (Fable 5 執筆)。原文の声を最優先した英訳
 *
 * phrases は omoshiro の訳文中に実際に登場する表現だけ。トレーニング(/api/phrases)に
 * カード登録して暗記まで持っていく。読んで終わりにしない。1記事1段落まで。
 * 返信(コメント)の本文はここに書かない。切り口だけ。中身は本人が書く。
 */

export interface EnseiPhrase {
    english: string;
    japanese: string;
}

export interface EnseiEntry {
    id: string;
    /** 読みに行く日 (カレンダーの日付) */
    date: string;
    creator: string;
    genre: string;
    likes: number;
    articleTitle: string;
    articleUrl: string;
    /** note公式AI英訳が存在するか (?hl=en で英語が返るか実地確認済みの値) */
    hasNoteEn: boolean;
    /** hasNoteEn=false のときの理由 (実地確認した事実を書く) */
    noEnReason?: string;
    /** 引っかかった段落 (原文ママ)。1記事1段落まで。全文はやらない */
    passageJa: string;
    /** note公式AI訳 (hasNoteEn のときだけ) */
    noteEn?: string;
    /** 逐語ごみ訳 (比較用) */
    chokuyaku: string;
    /** 俺の面白版 */
    omoshiro: string;
    phrases: EnseiPhrase[];
    /** 返信の切り口ヒント (コメント本文は書かない) */
    kirikuchi: string;
    /** 作戦メモ (なぜこの人か) */
    memo: string;
}

export const ENSEI_META = {
    title: 'note遠征',
    subtitle: 'READ ABROAD, REPLY AT HOME',
    premise: '英語コミュニティに客はいない。他所の畑の面白い記事を3層(ごみ訳/note公式AI訳/俺の面白版)で訳し、笑いながら英語をカード化して、日本語で感想を返す。名訳に落とした時点で教材として元が取れている。繋がりはボーナス。大物は選ばない、1日1記事1段落まで。',
} as const;

export const enseiEntries: EnseiEntry[] = [
    {
        id: 'rinrin-saifu',
        date: '2026-07-29',
        creator: 'rinrin (rinrin船長)',
        genre: 'エッセイ',
        likes: 169,
        articleTitle: '【財布収納タイムトライアル】見えないプレッシャーと、店外での哀しき再構築',
        articleUrl: 'https://note.com/dalars10/n/n07bb9e8ce30c',
        hasNoteEn: true,
        passageJa: '「あ、もう無理だ」\nタイムトライアルの限界を迎えた私は、財布を綺麗に整頓するというミッションをあっさりと放棄します。美しい収納という理想は潔く捨て去り、手の中にあるお札も小銭もレシートも鷲掴みにし、鞄の隙間やコートのポケットに無造作に突っ込みます。\nそして、「ありがとうございましたー！」とそそくさとその場を後にするのです。レジ前からの完全なる敗走劇です。',
        noteEn: "'Ah, I can't do it anymore.' Having reached the limit of my time trial, I easily abandon the mission of neatly organizing my wallet. I cleanly discard the ideal of beautiful storage, grab the bills, coins, and receipt in my hand, and shove them haphazardly into a gap in my bag or my coat pocket. And then, I quickly leave the scene with a 'Thank you very much!' It is a complete retreat from in front of the register.",
        chokuyaku: '"Ah, it is impossible anymore." I, who have reached the limit of the time trial, easily abandon the mission of organizing my wallet neatly. I gracefully discard the ideal of beautiful storage and grasp the bills, coins, and receipts that are in my hand.',
        omoshiro: '"Okay. That\'s it. I\'m done."\nThe time trial hits its limit, and I abandon the mission — the sacred mission of keeping my wallet beautifully organized — without a second of hesitation. The ideal of elegant storage? Dropped. Cleanly, proudly. I grab bills, coins, receipt, all of it, in one big claw, and cram the whole fistful into a gap in my bag, into a coat pocket, wherever it lands.\nThen a quick "Thank you so much!" and I\'m out of there. A full, unconditional retreat from the front lines of the register.',
        phrases: [
            { english: 'without a second of hesitation', japanese: '一瞬もためらわずに。「あっさり放棄」の潔さはこれ一発で出る' },
            { english: 'cram the whole fistful into my pocket', japanese: '鷲掴みしたやつをポケットに突っ込む。cram=無造作にねじ込む動詞' },
            { english: 'a full retreat from the front lines', japanese: '前線からの完全撤退。日常の失敗を軍事用語で大げさに言うギャグの型' },
        ],
        kirikuchi: '「敗走劇」の軍事パロディを褒め、自分のレジ敗走一件を白状して並ぶ',
        memo: 'note初心者を名乗る毎日投稿勢。スキ169・コメント21=コメント欄が生きてる規模で、返信が確実に読まれる。レジ前の自意識過剰を「タイムトライアル→指先のバグ→敗走→店外で再構築」と実況する構成力。恥の分類学がこっちの商品と同じDNA。公式英訳あり=3層フル比較の回。',
    },
    {
        id: 'aono-nabesan',
        date: '2026-07-30',
        creator: '蒼乃桔梗',
        genre: '人生',
        likes: 135,
        articleTitle: '鍋さん、あなたにもう一度会いたいよ',
        articleUrl: 'https://note.com/k85_292/n/n0f2a311b9890',
        hasNoteEn: true,
        passageJa: 'ある時、年賀状に「声を聞かせて下さい」の一言とともに携帯番号が記されていた。適応障害でM造船をクビになり失意のドン底にいた私は会わせる顔がないとスルーした。\n数年後、鍋さんが亡くなったとの報せ。\nあの時、鍋さんに連絡しなかったことを心底悔いた。\n生きてるうちにしか会えないんだ、と。',
        noteEn: "…a New Year's card along with the words, 'Please let me hear your voice.' I was at the bottom of despair after being fired from M Shipbuilding due to adjustment disorder, and I ignored it because I felt I couldn't face him. A few years later, I received news that Nabe-san had passed away. I deeply regretted not contacting Nabe-san at that time. You can only meet people while they are alive.",
        chokuyaku: 'At one time, on a New Year\'s card, a mobile phone number was written along with the words "Please let me hear your voice." I, who had been dismissed from M Shipbuilding due to adjustment disorder and was in the depths of despair, ignored it because I had no face to show him.',
        omoshiro: 'One year, his New Year\'s card came with a single line — "Let me hear your voice" — and his cell number written underneath. I\'d just been fired from M Shipbuilding. Adjustment disorder. Rock bottom. I couldn\'t face him. So I let the card sit there, and said nothing.\nA few years later, word came that Nabe-san had died. I regretted it from the bottom of my gut — not calling him back then. You can only see people while they\'re alive. That\'s the whole lesson, and I learned it too late.',
        phrases: [
            { english: "I couldn't face him", japanese: '会わせる顔がなかった。日本語とほぼ同じ発想で通じる貴重な一致' },
            { english: 'I regretted it from the bottom of my gut', japanese: '心底悔いた。heartでなくgutにすると後悔が内臓に来る' },
            { english: "you can only see people while they're alive", japanese: '生きてるうちにしか会えない。飾らない平叙文のまま置くのが一番重い' },
        ],
        kirikuchi: '自分にも返しそびれた一通がある、と一人分だけ静かに添える',
        memo: '京都の還暦男性、職業訓練校に通いながらnoteで半生を振り返り中。鋳造業界の営業部長「鍋さん」への追悼。現場と工場の世界=内装屋と地続きで、コメントが届く距離にいる(コメント12件)。この回は笑いにしない。「会わせる顔がない」が I couldn\'t face him とほぼ同型なのが発見。',
    },
    {
        id: 'satty-iuhodo',
        date: '2026-07-31',
        creator: 'サティ',
        genre: '会話',
        likes: 108,
        articleTitle: '言うほどでもないことが、言えなくて。',
        articleUrl: 'https://note.com/neosatty/n/ncf644d4ed0ae',
        hasNoteEn: false,
        noEnReason: '投稿翌日時点で ?hl=en がまだ日本語のまま (翻訳は段階的に来る)。後日再確認。いまは俺の面白版が唯一の英訳',
        passageJa: 'すぐにガス欠。私の雑談は、燃費が悪いのだ。\n会話というものは、エネルギーが必要だと思う。伝えたいという熱。聞いてほしいという熱。おそらく人によって燃費の良し悪しがさまざまで、そんなことを考えずとも話ができる人もいれば、伝えたい熱を溜めて溜めて凝縮してからじゃないと出力できない人もいる。私はおそらく後者のタイプ。燃費が恐ろしく悪い。',
        chokuyaku: 'Immediately out of gas. My small talk has bad fuel efficiency. I think that conversation requires energy. The heat of wanting to convey. The heat of wanting to be listened to.',
        omoshiro: "And then — empty tank. Just like that. My small talk gets terrible gas mileage.\nConversation takes fuel, I think. The heat of wanting to say something. The heat of wanting to be heard. And everyone's mileage is different: some people can just talk, no gauge, no math, while some of us can't output a single word until we've stored the heat up, and stored it up, and compressed it down into something dense enough to burn. I'm probably the second kind. My mileage is atrocious.",
        phrases: [
            { english: 'my small talk gets terrible gas mileage', japanese: '俺の雑談は燃費が悪い。get+mileageで比喩ごと持ち運べる' },
            { english: 'store the heat up and compress it down', japanese: '熱を溜めて溜めて凝縮する。up/downの対で「溜め→圧縮」のリズムが出る' },
            { english: 'my mileage is atrocious', japanese: '燃費が恐ろしく悪い。atrocious=ひどいの最上級ノリ(英検1級語彙がここで使える)' },
        ],
        kirikuchi: '現場職人の自分も燃費悪い側だと申告し、給油方法を一つ聞く',
        memo: '劇団の脚本家、「書く筋トレ中」(こっちは英語筋トレ)。ファミレスの4人会話で無口になる内側を「会話の燃費」で書き切り、最後は「チキンにクリームって、めっちゃ合うね」→「言うほどでもないことを言う、チキン野郎め」で回収。言いたい熱が出力できない=恥とあきらめの英会話のど真ん中。日本語でこれなら、DMMの俺の沈黙は言語の問題ですらない。',
    },
];

export function getEnseiEntry(id: string): EnseiEntry | undefined {
    return enseiEntries.find((e) => e.id === id);
}
