/**
 * Translation notes for Silent Bartender.
 * The apprentice overhears foreign tourists at the counter and jots
 * down what each phrase literally says versus what it truly means.
 * Each note captures the gap between word-for-word and real intent.
 * Used by the notebook UI near the counter.
 */

export interface TranslationNote {
    id: string;
    englishPhrase: string;
    literalJapanese: string;
    realMeaning: string;
    whenHeard: string;
}

export const TRANSLATION_NOTES: TranslationNote[] = [
    {
        id: 'tnote-long-time-no-see',
        englishPhrase: 'Long time no see.',
        literalJapanese: '長い・時間・無い・会う。',
        realMeaning: '久しぶりに会った相手への挨拶。「お久しぶり」に相当する。',
        whenHeard: '常連の外国人客が、半年ぶりに扉をくぐって旧友のマスターと目を合わせた瞬間。',
    },
    {
        id: 'tnote-im-good-thanks',
        englishPhrase: "I'm good, thanks.",
        literalJapanese: '私は・良い・ありがとう。',
        realMeaning: '丁寧な辞退。「大丈夫です、結構です」の意味で使われる。',
        whenHeard: 'お代わりを勧めた旅行者が、グラスに少し残った日本酒を見つめて静かに首を振ったとき。',
    },
    {
        id: 'tnote-it-is-what-it-is',
        englishPhrase: 'It is what it is.',
        literalJapanese: 'それは・それが・ある・もの・である。',
        realMeaning: '諦めと受容。「まあ、しょうがないよ」というニュアンス。',
        whenHeard: '出張延期を電話で告げられた男が、受話器を置きながらおしぼりを握りしめた直後。',
    },
    {
        id: 'tnote-no-worries',
        englishPhrase: 'No worries.',
        literalJapanese: '無い・心配事。',
        realMeaning: '気にしないで、大丈夫。謝られたときの軽い返答。',
        whenHeard: '隣の客に肘をぶつけてしまった女性旅行者へ、相手が微笑みながら返した一言。',
    },
    {
        id: 'tnote-fair-enough',
        englishPhrase: 'Fair enough.',
        literalJapanese: '公正・十分。',
        realMeaning: '納得した、理屈は分かった。完全同意ではないが受け入れる姿勢。',
        whenHeard: '値段の理由をマスターが説明し終えた後、相手がゆっくり頷いて発したとき。',
    },
    {
        id: 'tnote-take-it-easy',
        englishPhrase: 'Take it easy.',
        literalJapanese: 'それを・取れ・簡単に。',
        realMeaning: '無理しないで、気楽にね。別れ際の優しい挨拶としても使う。',
        whenHeard: '帰り支度をする連れに、同席していた外国人客が肩を軽く叩きながら。',
    },
    {
        id: 'tnote-catch-you-later',
        englishPhrase: 'Catch you later.',
        literalJapanese: '捕まえる・あなたを・後で。',
        realMeaning: 'カジュアルな「またね」。再会を約束しない軽い別れ。',
        whenHeard: '会計を済ませた旅行者が、扉の前で振り返り片手を上げた瞬間。',
    },
    {
        id: 'tnote-same-here',
        englishPhrase: 'Same here.',
        literalJapanese: '同じ・ここ。',
        realMeaning: '私も同じ。共感や同注文の場面で使う。',
        whenHeard: '連れがハイボールを頼んだ直後、もう一人が指を一本立てて静かに告げたとき。',
    },
    {
        id: 'tnote-you-bet',
        englishPhrase: 'You bet.',
        literalJapanese: 'あなたは・賭ける。',
        realMeaning: 'もちろん、任せて。「どういたしまして」の代わりにも使う。',
        whenHeard: '水のお代わりを頼まれた客が、横から代わりにピッチャーを差し出しながら。',
    },
    {
        id: 'tnote-not-a-chance',
        englishPhrase: 'Not a chance.',
        literalJapanese: '無い・ひとつの・機会。',
        realMeaning: '絶対にあり得ない。強い否定。',
        whenHeard: '納豆を勧められた旅行者が、匂いを一度嗅いだ直後に苦笑しながら。',
    },
    {
        id: 'tnote-rain-check',
        englishPhrase: "I'll take a rain check.",
        literalJapanese: '私は・取る・ひとつの・雨・小切手。',
        realMeaning: '今回は見送るが、また次の機会に。延期を示す丁寧な断り。',
        whenHeard: '二軒目に誘われた女性客が、腕時計をそっと確認してから残念そうに返した瞬間。',
    },
    {
        id: 'tnote-knock-yourself-out',
        englishPhrase: 'Knock yourself out.',
        literalJapanese: '叩け・あなた自身を・外へ。',
        realMeaning: 'どうぞご自由に。好きにやっていいよという許可。',
        whenHeard: 'メニューの端を指差して躊躇する連れに、外国人客が肩をすくめて放った一言。',
    },
    {
        id: 'tnote-suit-yourself',
        englishPhrase: 'Suit yourself.',
        literalJapanese: '合わせろ・あなた自身を。',
        realMeaning: '好きにしなよ。少し突き放した、呆れ気味の許可。',
        whenHeard: 'おすすめを拒んで冷奴だけを頼み続ける連れに、相手が眉を上げて投げかけた言葉。',
    },
    {
        id: 'tnote-break-a-leg',
        englishPhrase: 'Break a leg.',
        literalJapanese: '折れ・ひとつの・脚。',
        realMeaning: '幸運を祈る。舞台前などに贈る逆説的な激励。',
        whenHeard: '明日プレゼン本番だと話した旅行者へ、カウンターの隣客が乾杯のグラスを掲げて。',
    },
    {
        id: 'tnote-hang-in-there',
        englishPhrase: 'Hang in there.',
        literalJapanese: 'ぶら下がれ・中で・そこ。',
        realMeaning: 'もう少し頑張って、踏ん張って。励ましの定番表現。',
        whenHeard: '仕事の愚痴を吐き出した連れの肩を、外国人客が軽く握りながら告げた瞬間。',
    },
];

export function pickTranslationNote(): TranslationNote {
    const index = Math.floor(Math.random() * TRANSLATION_NOTES.length);
    return TRANSLATION_NOTES[index];
}
