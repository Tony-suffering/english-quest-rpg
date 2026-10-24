/**
 * Learned English Expressions — Silent Bartender reference log.
 * Over many quiet nights the apprentice picks up useful English phrases
 * from foreign customers sitting at the counter. This file collects 20
 * of those phrases as a study aid for the player, unlocked gradually
 * as the apprentice puts in more nights behind the bar.
 */

export interface LearnedExpression {
    id: string;
    englishExpression: string;
    japaneseMeaning: string;
    exampleAtBar: string;
    whyUseful: string;
    difficulty: 'easy' | 'medium' | 'hard';
    unlockAfterNights: number;
}

export const LEARNED_EXPRESSIONS: LearnedExpression[] = [
    {
        id: 'learned-cheers',
        englishExpression: 'Cheers.',
        japaneseMeaning: '乾杯。／ありがとう。',
        exampleAtBar: '常連の英国人がグラスを軽く掲げ、隣の客と目を合わせて一言。',
        whyUseful: '乾杯にも軽いお礼にも使える、最短で万能な一言。',
        difficulty: 'easy',
        unlockAfterNights: 3,
    },
    {
        id: 'learned-im-good-thanks',
        englishExpression: "I'm good, thanks.",
        japaneseMeaning: '（もう）大丈夫です、ありがとう。',
        exampleAtBar: 'お代わりを勧めた時、旅行者がグラスに軽く手をかざして微笑んだ。',
        whyUseful: '断りたい時に失礼にならず、角の立たない定番フレーズ。',
        difficulty: 'easy',
        unlockAfterNights: 5,
    },
    {
        id: 'learned-keep-the-change',
        englishExpression: 'Keep the change.',
        japaneseMeaning: 'おつりは取っておいて。',
        exampleAtBar: '札を置いた客がコートを羽織りながら、片手を軽く振って言い残した。',
        whyUseful: 'チップ文化の海外で、スマートに会計を締める一言。',
        difficulty: 'easy',
        unlockAfterNights: 8,
    },
    {
        id: 'learned-thats-on-me',
        englishExpression: "That's on me.",
        japaneseMeaning: 'ここは俺のおごりで。',
        exampleAtBar: '連れの勘定書を指さし、古い友人らしき男が静かに引き寄せた。',
        whyUseful: 'おごる側の意思表示として、最もよく使われる自然な言い方。',
        difficulty: 'easy',
        unlockAfterNights: 12,
    },
    {
        id: 'learned-another-round-please',
        englishExpression: 'Another round, please.',
        japaneseMeaning: '同じのをもう一巡お願いします。',
        exampleAtBar: '四人組が空いたグラスを軽く揃え、代表の一人がカウンターへ合図。',
        whyUseful: 'グループ全員分を一度で頼める、複数人の場で便利。',
        difficulty: 'medium',
        unlockAfterNights: 18,
    },
    {
        id: 'learned-ill-have-what-theyre-having',
        englishExpression: "I'll have what they're having.",
        japaneseMeaning: 'あの人たちと同じのをください。',
        exampleAtBar: '隣席の澄んだ琥珀色に見とれた客が、迷いなくその方向を指で示した。',
        whyUseful: 'メニューに迷った時、指差し一つで注文を済ませられる便利表現。',
        difficulty: 'medium',
        unlockAfterNights: 25,
    },
    {
        id: 'learned-make-it-a-double',
        englishExpression: 'Make it a double.',
        japaneseMeaning: 'ダブルで。',
        exampleAtBar: '疲れた顔のスーツ姿が、ウイスキーを頼んだ直後にぽつりと付け加えた。',
        whyUseful: '量を倍にしたい時に、短く確実に伝わる定型フレーズ。',
        difficulty: 'medium',
        unlockAfterNights: 35,
    },
    {
        id: 'learned-just-a-taste',
        englishExpression: 'Just a taste.',
        japaneseMeaning: '少しだけ味見で。',
        exampleAtBar: '珍しい銘柄を前にした客が、親指と人差し指で小さな隙間を作って見せた。',
        whyUseful: '控えめに頼みたい時、量を指定する遠慮の利いた言い回し。',
        difficulty: 'medium',
        unlockAfterNights: 50,
    },
    {
        id: 'learned-put-it-on-my-tab',
        englishExpression: 'Put it on my tab.',
        japaneseMeaning: 'ツケにしといて。',
        exampleAtBar: '週に二度来る常連が、財布を開かず小さく頷いて帰り支度を始めた。',
        whyUseful: '馴染みの店での後払いを頼む時、最も自然に使われる一言。',
        difficulty: 'medium',
        unlockAfterNights: 70,
    },
    {
        id: 'learned-on-the-house',
        englishExpression: 'On the house.',
        japaneseMeaning: '店からのサービスです。',
        exampleAtBar: '誕生日を漏らした客の前に、権藤が黙って一杯を差し出した時の決め台詞。',
        whyUseful: '店側の厚意を伝える英語圏バーの定番表現。聞き取れるだけで嬉しい。',
        difficulty: 'medium',
        unlockAfterNights: 100,
    },
    {
        id: 'learned-fair-enough',
        englishExpression: 'Fair enough.',
        japaneseMeaning: 'なるほど、まあいいでしょう。',
        exampleAtBar: '値段を聞いた旅行者が、少し考えてから肩をすくめ静かに頷いた。',
        whyUseful: '完全な同意ではないが納得した時に使える、大人の相槌。',
        difficulty: 'medium',
        unlockAfterNights: 130,
    },
    {
        id: 'learned-its-been-a-long-day',
        englishExpression: "It's been a long day.",
        japaneseMeaning: '今日は長い一日でした。',
        exampleAtBar: '背広のボタンを外した客が、おしぼりを顔に当てて深く息を吐いた。',
        whyUseful: '疲れを柔らかく伝える定型句。会話のきっかけにもなる万能フレーズ。',
        difficulty: 'medium',
        unlockAfterNights: 170,
    },
    {
        id: 'learned-take-your-time',
        englishExpression: 'Take your time.',
        japaneseMeaning: 'ごゆっくりどうぞ。',
        exampleAtBar: 'メニューを開いたまま迷う客に、隣の常連が優しく声をかけた。',
        whyUseful: '急かさない姿勢を伝えるフレーズ。接客側の立場でも使える。',
        difficulty: 'easy',
        unlockAfterNights: 220,
    },
    {
        id: 'learned-no-need-to-rush',
        englishExpression: 'No need to rush.',
        japaneseMeaning: '急がなくて大丈夫です。',
        exampleAtBar: '会計を急いでしまった客に、権藤が小さく手を振って落ち着かせた。',
        whyUseful: '相手の焦りを和らげる一言。ビジネスでも日常でも応用が広い。',
        difficulty: 'medium',
        unlockAfterNights: 280,
    },
    {
        id: 'learned-dont-mind-me',
        englishExpression: "Don't mind me.",
        japaneseMeaning: '気にしないでください。',
        exampleAtBar: '隣のカップルの会話に割り込みかけた客が、首を小さく振って身を引いた。',
        whyUseful: '場を邪魔したくない時の配慮を示せる、控えめな社交表現。',
        difficulty: 'hard',
        unlockAfterNights: 350,
    },
    {
        id: 'learned-rain-check',
        englishExpression: 'Rain check?',
        japaneseMeaning: 'また別の機会にお願いできますか？',
        exampleAtBar: '誘いを受けた客が、携帯の通知を見て申し訳なさそうに眉を下げた。',
        whyUseful: '断りつつ次の機会を残す、角を立てない高等テクニック。',
        difficulty: 'hard',
        unlockAfterNights: 420,
    },
    {
        id: 'learned-last-call',
        englishExpression: 'Last call.',
        japaneseMeaning: 'ラストオーダーです。',
        exampleAtBar: '閉店十五分前、時計を見た権藤が客全員を見回して静かに告げた。',
        whyUseful: '海外バーでは必ず聞く合図。聞き逃すと飲み物を頼めなくなる重要語。',
        difficulty: 'medium',
        unlockAfterNights: 500,
    },
    {
        id: 'learned-one-for-the-road',
        englishExpression: 'One for the road.',
        japaneseMeaning: '帰り際にもう一杯。',
        exampleAtBar: 'コートを腕に掛けた客が、ドアに手をかける前にふと立ち止まって微笑んだ。',
        whyUseful: '締めの一杯を頼む粋な慣用句。知っていると英語圏で通っぽく聞こえる。',
        difficulty: 'hard',
        unlockAfterNights: 650,
    },
    {
        id: 'learned-catch-you-later',
        englishExpression: 'Catch you later.',
        japaneseMeaning: 'じゃあ、またね。',
        exampleAtBar: '常連の一人が扉の前で振り返り、軽く二本指を額に当てて挨拶を残した。',
        whyUseful: 'カジュアルな別れ際の定番。フォーマル過ぎない友人感のある一言。',
        difficulty: 'hard',
        unlockAfterNights: 800,
    },
    {
        id: 'learned-same-time-tomorrow',
        englishExpression: 'Same time tomorrow.',
        japaneseMeaning: 'また明日、同じ時間に。',
        exampleAtBar: '毎晩九時に来る常連が、勘定を済ませてカウンターを軽く二度叩いた。',
        whyUseful: '常連としての小さな約束を交わす、短くも深い愛着のこもった別れ言葉。',
        difficulty: 'hard',
        unlockAfterNights: 1000,
    },
];

export function getStudiedExpressions(totalNights: number): LearnedExpression[] {
    return LEARNED_EXPRESSIONS.filter(
        (expression) => expression.unlockAfterNights <= totalNights,
    );
}
