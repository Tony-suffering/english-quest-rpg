/**
 * 365 English Master -- Practice Drill Bank
 *
 * Hand-crafted 4-choice drills tied to specific MasterExpressions.
 * Each drill teaches ONE specific point a Japanese learner actually needs:
 * - Real cognitive traps
 * - Plausible distractors that represent actual mistakes
 * - Explanation that teaches WHY (not just "that's correct")
 *
 * Matching: by `japaneseKey` === MasterExpression.japanese
 * Fallback: if no hand-crafted drill exists, auto-gen is used
 */

export type HandDrillType =
    | 'pick-native'   // Which sounds most native?
    | 'meaning'       // What does this actually mean?
    | 'trap'          // Which one is WRONG? / spot the mistake
    | 'word-choice'   // Fill in the critical word
    | 'register'      // Formality/situation match
    | 'response';     // How do you reply?

export interface HandcraftedDrill {
    id: string;
    japaneseKey: string;
    type: HandDrillType;
    question: string;
    questionSub?: string;
    options: [string, string, string, string];
    correctIdx: 0 | 1 | 2 | 3;
    explanation: string;
}

export const HANDCRAFTED_DRILLS: HandcraftedDrill[] = [
    // ═══════════════════════════════════════════════════════
    // DAY 1: はじめての挨拶
    // ═══════════════════════════════════════════════════════
    {
        id: 'd1-hajimemashite-1',
        japaneseKey: 'はじめまして',
        type: 'pick-native',
        question: 'カジュアルな居酒屋で初対面。友達の友達に紹介された時、一番自然なのは？',
        questionSub: '「はじめまして」を英語で',
        options: [
            'Nice to meet you.',
            'How do you do?',
            'Nice meeting you.',
            'Pleased to meet you.',
        ],
        correctIdx: 0,
        explanation: 'どれも文法は正しいが場面で差が出る。How do you do? は19世紀の英語でビジネスでも古い。Nice meeting you. は過去形のニュアンスで「会えてよかった」→別れ際に使う。Pleased to meet you. はフォーマル寄りで居酒屋では硬い。Nice to meet you. が場面問わず一番安全。',
    },
    {
        id: 'd1-hajimemashite-2',
        japaneseKey: 'はじめまして',
        type: 'trap',
        question: '"Nice to meet you." と言われた。返事はどれが自然？',
        options: [
            'Me too.',
            'Same.',
            'Nice to meet you too.',
            'You too, please.',
        ],
        correctIdx: 2,
        explanation: 'Me too は「私も〜する」の意味で「初めて会った」感が出ない。Same はカジュアルすぎて初対面で使うと雑。You too, please は文法崩壊。Nice to meet you too. または単に You too! が正解。',
    },
    {
        id: 'd1-yoroshiku-1',
        japaneseKey: 'よろしくお願いします',
        type: 'meaning',
        question: '初対面の「よろしくお願いします」を英語で言うなら？',
        options: [
            'Please take care of me.',
            'Please do your best for me.',
            "I'm looking forward to working with you.",
            'Thank you for your future cooperation.',
        ],
        correctIdx: 2,
        explanation: 'Please take care of me は「私を世話して」で子供か病人みたいになる。Please do your best for me は上から目線で失礼。Thank you for your future cooperation はメールの締めくくりでは使えるが口頭では不自然。I am looking forward to...が一番自然。',
    },
    {
        id: 'd1-namae-1',
        japaneseKey: 'お名前は？',
        type: 'pick-native',
        question: '相手の名前を聞き取れなかった。角が立たない聞き方は？',
        options: [
            "Sorry, what's your name again?",
            "Sorry, I didn't catch your name.",
            "Could you tell me your name again?",
            "What did you say your name was?",
        ],
        correctIdx: 1,
        explanation: '4つとも実際に使える英語だが温度感が違う。again は「もう一回言わせて」で軽く失礼。Could you tell me は丁寧だが改まりすぎ。What did you say はやや詰問調。I did not catch your name(聞き取れなかった=私のせい)が一番自然で角が立たない。ネイティブ頻出のフレーズ。',
    },
    {
        id: 'd1-iimise-1',
        japaneseKey: 'ここ、いい店ですね',
        type: 'trap',
        question: '「ここ、いい店ですね」を英訳。日本人がやりがちな間違いはどれ？',
        options: [
            'This is a nice place.',
            'This place is great.',
            'This is a good shop.',
            'I love the vibe in here.',
        ],
        correctIdx: 2,
        explanation: '「店」を shop と訳すのが典型的ミス。shop は物を売る店(clothing shop等)で、飲食店には使わない。レストラン/バー/カフェは全部 place でOK。placeは万能選手。vibe(雰囲気)を使えるとさらに自然。',
    },
    {
        id: 'd1-osusume-1',
        japaneseKey: '何がおすすめですか？',
        type: 'register',
        question: '居酒屋のカウンターで店主に聞く。一番空気に合うのは？',
        options: [
            'What do you recommend?',
            "What's good here?",
            'What should I order?',
            'Any recommendations?',
        ],
        correctIdx: 1,
        explanation: '4つとも通じる英語。What do you recommend? は正しいが少しフォーマル(高級店向き)。What should I order? は「何頼めばいい？」でややパッシブ。Any recommendations? は複数形で「何かある？」の感じ。居酒屋のカウンターには What is good here? が一番しっくりくる。What is your go-to? も同じく自然。',
    },
    {
        id: 'd1-toriaezu-1',
        japaneseKey: 'とりあえずビール',
        type: 'meaning',
        question: '「とりあえずビール」の感じを英語で一番近く出せるのは？',
        options: [
            'Just a beer for now.',
            "I'll start with a beer.",
            "Let me get a beer first.",
            "Beer for me, please.",
        ],
        correctIdx: 1,
        explanation: '全部通じるが感覚が違う。Just a beer for now は「今のところビールだけ(他は後で追加)」で注文を絞る感じ。Let me get a beer first は「最初の一杯」感が強く順序に注目。Beer for me, please. は単純な注文で「とりあえず」感ゼロ。I will start with a beer が「まず1杯目、後は考えながら」のニュアンスを一番出せる。英語に「とりあえず」の直訳はない。',
    },
    {
        id: 'd1-wakaru-1',
        japaneseKey: 'わかるわかる',
        type: 'trap',
        question: '友達の愚痴に「わかるわかる！」と全力共感したい。一番温度感が近いのは？',
        options: [
            'I understand.',
            'I know, right?',
            "Yeah, I get it.",
            "I know what you mean.",
        ],
        correctIdx: 1,
        explanation: '4つとも「わかる」系だが温度が違う。I understand は試験問題の答え。冷たい相槌で他人事。I get it は「話の筋は理解した」で共感弱め。I know what you mean は共感あるが落ち着いた大人の返し。I know, right? は「だよね！」で完全に同じ温度、語尾上げで強い同意を表す。愚痴への最強リアクション。',
    },
    {
        id: 'd1-matakimasu-1',
        japaneseKey: 'また来ます',
        type: 'pick-native',
        question: '居酒屋を出るとき店主に「また来ます」。一番こなれた言い方は？',
        options: [
            'I will come again.',
            "I'll be back.",
            "See you next time.",
            "I'll come back soon.",
        ],
        correctIdx: 1,
        explanation: '4つとも通じるが自然さが違う。I will come again は文法的に正しいがロボっぽく「また来ます」の軽さが出ない。See you next time は相手が次に会う前提で少しズレる。I will come back soon は「すぐまた来る」で軽い約束感。I will be back(ターミネーターの有名なセリフ)が日常会話での「また来るよ」の最自然な形。軽さと確実さの両方が出る。',
    },

    // ═══════════════════════════════════════════════════════
    // DAY 2: 注文する
    // ═══════════════════════════════════════════════════════
    {
        id: 'd2-sumimasen-1',
        japaneseKey: 'すみません',
        type: 'trap',
        question: '店員を呼ぶときの「すみません」を英語で。間違いはどれ？',
        options: [
            'Excuse me.',
            'Sorry.',
            'Excuse me!',
            "Excuse me, when you have a moment?",
        ],
        correctIdx: 1,
        explanation: '日本語の「すみません」は万能で呼びかけにも謝罪にも使えるが、英語はガチガチに分かれる。呼びかけ=Excuse me、謝罪=Sorry、感謝=Thank you。店員を呼ぶのに Sorry. と言うと「私が悪いことしました」って聞こえる。日本人が一番やる誤用。',
    },
    {
        id: 'd2-korekudasai-1',
        japaneseKey: 'これください',
        type: 'register',
        question: 'レストランで注文。どれが一番自然な英語？',
        options: [
            'This, please.',
            "I'll have this.",
            'Give me this one.',
            'I want this.',
        ],
        correctIdx: 1,
        explanation: 'This, please は短くて通じるが指差すだけの赤ちゃん注文。Give me は命令形で失礼。I want this は子供が駄々こねる言い方。I will have this(willを使って未来形)が大人の注文。Can I get this one? も同じくらい自然。',
    },
    {
        id: 'd2-menu-1',
        japaneseKey: 'メニュー見せてもらえますか',
        type: 'word-choice',
        question: 'Could I ____ a look at the menu?',
        questionSub: '「メニューちょっと見てもいいですか」',
        options: ['do', 'have', 'take', 'make'],
        correctIdx: 2,
        explanation: 'take a look で「ちらっと見る」の決まり文句。do a look や make a look は存在しない。have a look は英国英語としてアリだが米英どちらでも使える take a look が一番安全。日本語の「見てみる」と同じ感覚。',
    },
    {
        id: 'd2-okaikei-1',
        japaneseKey: 'お会計お願いします',
        type: 'trap',
        question: 'アメリカの店でお会計を頼むとき、使わないのは？',
        options: [
            'Check, please.',
            'Can I get the check?',
            'Bill, please.',
            "We're ready whenever you are.",
        ],
        correctIdx: 2,
        explanation: 'アメリカは check、イギリスは bill。混ざると変。We are ready whenever you are は「お手すきのときに」で実は上級英語。日本語の「お会計お願いします」の丁寧さに近い。アメリカで bill と言うと「請求書？」って一瞬考えられる。',
    },
    {
        id: 'd2-oishii-1',
        japaneseKey: 'おいしい！',
        type: 'trap',
        question: '料理を一口食べて「うまっ！」と声に出す。不自然なのはどれ？',
        options: [
            'This is so good!',
            "Oh wow, this is amazing.",
            'Very delicious!',
            "This is really good.",
        ],
        correctIdx: 2,
        explanation: 'Very delicious は日本人の典型ミス。delicious は「とても美味しい」の意味をすでに含む強い形容詞なので very を付けない(very excellent や very perfect と同じく英語ではアウト)。弱い形容詞の good や nice には very を付けられる。ネイティブは really delicious なら言うが very delicious は言わない。',
    },
    {
        id: 'd2-mouippai-1',
        japaneseKey: 'もう一杯ください',
        type: 'word-choice',
        question: 'Can I get ____ one?',
        questionSub: '同じものをもう一杯',
        options: ['more', 'another', 'other', 'again'],
        correctIdx: 1,
        explanation: 'more は「もっと量」(Can I get more beer? はOK)。other は「別のもの」で意味が変わる。again は副詞で名詞の前に置けない。another(an+other=もう1つ) が「もう一杯」の決まり文句。Same again? も同じ意味で使える。',
    },
    {
        id: 'd2-karai-1',
        japaneseKey: '辛いですか？',
        type: 'trap',
        question: '「これ辛いですか？」を英訳。間違いはどれ？',
        options: [
            'Is this spicy?',
            'Is this hot?',
            'Is this salty?',
            'Is this spicy at all?',
        ],
        correctIdx: 2,
        explanation: 'salty は「塩辛い/しょっぱい」で別物。日本語の「辛い」を salty と訳すのは日本人の典型ミス。spicy=唐辛子的辛さ、hot=(熱いor辛い両方、文脈で判断)。at all を付けると「少しでも辛い？」のニュアンス。',
    },
    {
        id: 'd2-allergy-1',
        japaneseKey: 'アレルギーがあるんですが',
        type: 'word-choice',
        question: "I'm ____ to shellfish.",
        questionSub: '「甲殻類アレルギー」',
        options: ['allergy', 'allergic', 'allergied', 'allergical'],
        correctIdx: 1,
        explanation: 'allergy は名詞(I have an allergy)。動詞化した allergied や allergical は存在しない(日本人がでっち上げがち)。I am allergic to X が形容詞で「Xアレルギー」の決まり文句。命に関わる場面なので間違えられない。発音は「アラジック」(アレルギック じゃない)。',
    },
    {
        id: 'd2-mochikaeri-1',
        japaneseKey: '持ち帰りできますか',
        type: 'pick-native',
        question: '食べきれなかった料理を持ち帰りたい。一番自然なのは？',
        options: [
            'Can I take this home?',
            'Can I get a doggy bag?',
            'Can I get a box for this?',
            'Please wrap this for me.',
        ],
        correctIdx: 2,
        explanation: 'doggy bag は1980年代の言い方で今は古い(犬に持ち帰るふりをした時代の名残)。Please wrap は「包んで」で持ち帰りの意味が不明。Can I take this home? も通じるが、一番よく聞くのは Can I get a box? (箱ちょうだい=持ち帰る前提)。',
    },
    {
        id: 'd2-gochisousama-1',
        japaneseKey: 'ごちそうさまでした',
        type: 'meaning',
        question: '「ごちそうさま」の感覚を一番近く英訳するなら？',
        options: [
            'Thank you for the meal.',
            'I have finished eating.',
            'Everything was great, thank you.',
            'The food was done.',
        ],
        correctIdx: 2,
        explanation: 'Thank you for the meal は直訳で意味は通じるがロボット的。I have finished eating は事実報告で感謝がない。The food was done は料理の話じゃなく「終わった」の意味でズレる。Everything was great, thank you が「ごちそうさま」の感謝と賞賛を両方含む。英語は具体的に褒めるのが礼儀。',
    },

    // ═══════════════════════════════════════════════════════
    // DAY 3: 買い物
    // ═══════════════════════════════════════════════════════
    {
        id: 'd3-ikura-1',
        japaneseKey: 'いくらですか？',
        type: 'pick-native',
        question: '値段を聞くとき、一番カジュアルで自然なのは？',
        options: [
            'What is the price of this?',
            'How much does this cost to buy?',
            'How much is this?',
            'How much money do I need?',
        ],
        correctIdx: 2,
        explanation: 'What is the price は硬くてデパートの店員みたい。How much does this cost to buy は英語として冗長すぎる(to buyは当たり前)。How much money do I need は「いくら持ってくればいい？」で意味が違う。How much is this? これだけでOK。How much? だけでも通じる。',
    },
    {
        id: 'd3-justlooking-1',
        japaneseKey: 'ちょっと見てるだけです',
        type: 'trap',
        question: '店員に話しかけられた。「見てるだけ」はどれ？',
        options: [
            'Just looking.',
            "I'm only watching.",
            "I'm just seeing.",
            "I'm observing.",
        ],
        correctIdx: 0,
        explanation: 'watch は動くものを追いかけて見る(テレビ、試合)。see は視界に入る(見える)。observe は研究者が観察する。商品を「見る」(物色する)の意味で使うのは look だけ。Just looking, thanks. これが店員撃退の世界共通フレーズ。',
    },
    {
        id: 'd3-kore-arimasuka-1',
        japaneseKey: 'これ、ありますか？',
        type: 'word-choice',
        question: 'Do you ____ this?',
        questionSub: '「これ取り扱ってますか？」',
        options: ['sell', 'carry', 'keep', 'hold'],
        correctIdx: 1,
        explanation: 'sell(売る) も通じるが、店が「取り扱い品目として持っている」のは carry が正しい動詞(店の在庫の意味)。keep は「保管する」で意味がズレる。hold は「取り置き」の意味になる。Do you carry...? が買い物英語の定番。Do you have...? でもOK。',
    },

    // ═══════════════════════════════════════════════════════
    // DAY 4: 移動
    // ═══════════════════════════════════════════════════════
    {
        id: 'd4-eki-1',
        japaneseKey: '駅はどこですか？',
        type: 'pick-native',
        question: '知らない人に駅の場所を聞く。一番自然で丁寧なのは？',
        options: [
            "Where is the station?",
            "Excuse me, where's the station?",
            "Do you know where the station is?",
            "Can you tell me where the station is?",
        ],
        correctIdx: 1,
        explanation: '4つとも通じるが差がある。Where is the station? 単体は文法OKだが唐突で失礼(日本語で「駅どこ？」と叫ぶ感じ)。Do you know where is... は文法ミスしがち(正しくは where the station is の語順)。Can you tell me... は丁寧だが硬い。Excuse me, を前に付けると一気に礼儀正しくなる。英語は前置きが命。',
    },
    {
        id: 'd4-norikae-1',
        japaneseKey: '乗り換えはどこですか',
        type: 'word-choice',
        question: 'Where do I ____ trains?',
        questionSub: '「どこで電車を乗り換える？」',
        options: ['change', 'transfer', 'exchange', 'switch'],
        correctIdx: 1,
        explanation: 'change trains も正しい(英国寄り)。exchange は「交換する(物)」で乗り換えには使わない。switch はアリだが砕けすぎ。アメリカでは transfer が駅の掲示板にも書いてある公式語。Where do I transfer? これが一番通じる。',
    },
    {
        id: 'd4-michinimayoi-1',
        japaneseKey: '道に迷いました',
        type: 'trap',
        question: '「道に迷いました」を英訳。日本人がやりがちな間違いは？',
        options: [
            "I'm lost.",
            'I lost my way.',
            'I missed my road.',
            "I can't find where I am.",
        ],
        correctIdx: 2,
        explanation: 'I missed my road は直訳で英語として存在しない(日本人の典型ミス)。I lost my way は古い英語だが通じる。I cannot find where I am も文法的にはOK。一番シンプルで自然なのは I am lost. これだけで全部伝わる。2語で済むなら2語で。',
    },

    // ═══════════════════════════════════════════════════════
    // DAY 5: 気持ち
    // ═══════════════════════════════════════════════════════
    {
        id: 'd5-tanoshii-1',
        japaneseKey: '楽しい！',
        type: 'trap',
        question: '友達と遊んでて「今楽しい！」と言いたい。間違いはどれ？',
        options: [
            'This is fun!',
            "I'm having fun!",
            "I'm enjoying!",
            "I'm having a blast!",
        ],
        correctIdx: 2,
        explanation: 'I am enjoying は日本人の典型ミス。enjoy は他動詞で必ず目的語がいる(I am enjoying this/myself/the party)。目的語なしで enjoying だけは文法エラー。I am having fun は「楽しんでる」の基本形。I am having a blast はもっと強い「超楽しい」。',
    },
    {
        id: 'd5-tsukareta-1',
        japaneseKey: '疲れた',
        type: 'pick-native',
        question: '仕事終わりに「マジで疲れた...」とぼやく。一番ネイティブっぽいのは？',
        options: [
            "I'm very tired.",
            "I'm so tired.",
            "I'm exhausted.",
            "I'm really tired today.",
        ],
        correctIdx: 2,
        explanation: '全部通じるが温度が違う。I am very tired は教科書英語で感情がない。I am so tired は「めっちゃ疲れた」で使えるが tired 自体は弱い。I am really tired today も日常的。exhausted は「疲労困憊」で tired よりずっと強く、ネイティブが一日の終わりに連発する定番。I am beat / I am wiped / I am drained も同じ強さ。',
    },
    {
        id: 'd5-bikkuri-1',
        japaneseKey: 'びっくりした',
        type: 'word-choice',
        question: 'I was ____!',
        questionSub: '「びっくりした！」',
        options: ['surprising', 'surprised', 'surprise', 'surprisely'],
        correctIdx: 1,
        explanation: 'surprising は「(物事が)驚かせる(側)」(The news was surprising)。surprise は名詞。surprisely は存在しない。人が驚いた側は surprised(過去分詞=形容詞化)。I was surprised / shocked が「びっくりした」。interesting/interested と同じ現在形vs過去分詞の罠。',
    },
    {
        id: 'd5-shinpai-1',
        japaneseKey: '心配しないで',
        type: 'pick-native',
        question: '友達が不安そうなときに「心配しないで、大丈夫」と伝える。自然なのは？',
        options: [
            "Don't worry.",
            "Don't worry about it.",
            "No need to worry.",
            "You don't have to worry.",
        ],
        correctIdx: 1,
        explanation: '全部通じるが用途が違う。Don\'t worry. 単体は軽くて万能だがやや突き放した感じ(「気にすんな」)。No need to worry はやや硬くて説教調。You don\'t have to worry は「〜する必要ない」で冷たい。Don\'t worry about it. が「それについては気にしないで」で具体的なことへの安心させ方として最自然。No worries.(オーストラリア発の世界語)も同じ温度。',
    },

    // ═══════════════════════════════════════════════════════
    // DAY 6: お願い/断り
    // ═══════════════════════════════════════════════════════
    {
        id: 'd6-tetsudatte-1',
        japaneseKey: '手伝ってもらえますか',
        type: 'register',
        question: '同僚に軽く「ちょっと手伝ってくれる？」とお願いする。一番自然なのは？',
        options: [
            "Could you help me?",
            "Could you give me a hand?",
            "Would you help me with this?",
            "Can you assist me?",
        ],
        correctIdx: 1,
        explanation: '全部丁寧だが自然さが違う。Could you help me? は正しいが事務的。Would you help me with this? は丁寧だがやや硬い。Can you assist me? は assist がフォーマルでビジネス文書みたい(日常会話では硬い)。Could you give me a hand? が「ちょっと手貸してくれる？」の軽さに最適。日本語の「手伝って」と同じく体の部位(手)を使った慣用表現。',
    },
    {
        id: 'd6-shashin-1',
        japaneseKey: '写真撮ってもらえますか',
        type: 'trap',
        question: '観光地で通行人に写真を頼む。間違いはどれ？',
        options: [
            'Could you take our picture?',
            'Could you take a picture of us?',
            'Could you take us a picture?',
            "Would you mind taking a photo of us?",
        ],
        correctIdx: 2,
        explanation: 'take us a picture は日本人の典型ミス。take + 人 + picture の語順は存在しない(give me a book型と混同)。正しくは take a picture of 人。前置詞 of が必要。Would you mind taking...? が一番丁寧。観光英語の必須パターン。',
    },
    {
        id: 'd6-mochiron-1',
        japaneseKey: 'もちろん！',
        type: 'pick-native',
        question: '「もちろん！任せて！」の感じで答えるなら？',
        options: [
            'Of course, of course.',
            'Yes naturally.',
            'Absolutely!',
            'Definitely I will.',
        ],
        correctIdx: 2,
        explanation: 'Of course 連打は日本人が連発してロボットっぽい。naturally は「当然」でやや冷たい。Definitely I will は語順が変(Definitely! または I definitely will)。Absolutely! は「もちろん！任せて！」の熱量を1語で出せる最強フレーズ。For sure! も同じ。',
    },

    // ═══════════════════════════════════════════════════════
    // DAY 7: 雑談
    // ═══════════════════════════════════════════════════════
    {
        id: 'd7-saikindou-1',
        japaneseKey: '最近どう？',
        type: 'trap',
        question: '「最近どう？」を英訳。間違いはどれ？',
        options: [
            "How's it going?",
            "What's up?",
            "How are you recently?",
            "How have you been?",
        ],
        correctIdx: 2,
        explanation: 'How are you recently? は日本人の典型ミス。recently(最近)は現在完了と一緒に使う副詞で、How are you(現在形)とは合わない。「最近」を言いたければ How have you been (lately)? が正解。How is it going? / What is up? は時制関係なく使える万能挨拶。',
    },
    {
        id: 'd7-tenkiiine-1',
        japaneseKey: '天気いいね',
        type: 'pick-native',
        question: '晴れた日の「いい天気だね」。一番ネイティブなのは？',
        options: [
            'The weather is good.',
            "It's a nice day.",
            'Today weather is nice.',
            "Today's weather is very good.",
        ],
        correctIdx: 1,
        explanation: 'The weather is good は天気予報の文。Today weather is は冠詞/所有格なしで文法崩壊。Today is nice も「今日は(性格が)いい」と聞こえる。It is a nice day. (天気はitで表す)が挨拶の定番。It is beautiful out today. も同じく自然。',
    },
    {
        id: 'd7-shumi-1',
        japaneseKey: '趣味は何ですか？',
        type: 'trap',
        question: '「趣味は何ですか？」を英訳。一番ネイティブっぽくないのは？',
        options: [
            'What is your hobby?',
            "What do you like to do in your free time?",
            "What do you do for fun?",
            "Do you have any hobbies?",
        ],
        correctIdx: 0,
        explanation: 'What is your hobby? は文法的には正しいが子供の英作文みたいで大人は使わない(ネイティブは1つに限定しない)。What do you do for fun? が大人の自然な聞き方。hobbies と複数形にするか、趣味という言葉を使わず「楽しみでやってること」と言うのがコツ。',
    },
    {
        id: 'd7-onaji-1',
        japaneseKey: '同じく！',
        type: 'pick-native',
        question: '相手の発言に「俺も同じ！」と返す。最自然なのは？',
        options: [
            'I am same.',
            'Me too!',
            'Same to me.',
            'I have same.',
        ],
        correctIdx: 1,
        explanation: 'I am same は冠詞なし+意味不明。Same to me は「同じく返す」で意味ズレ(Same to you なら「そちらも」の意味で存在)。I have same は「同じもの持ってる」。Me too! または単に Same! が「同じく！」。Same here. も超自然。',
    },
    {
        id: 'd7-ikou-1',
        japaneseKey: '今度一緒に行こうよ',
        type: 'word-choice',
        question: "We should go ____ sometime.",
        questionSub: '「今度一緒に行こうよ」',
        options: ['together', 'both', 'with', 'accompany'],
        correctIdx: 0,
        explanation: 'both は「両方」で動詞の後ろに置かない。with は前置詞で単体では置けない(with you などが必要)。accompany は動詞で go の後に置けない。together(一緒に)が副詞として動詞の後に置ける唯一の選択肢。We should hang out sometime. も同じ意味で自然。',
    },
    {
        id: 'd7-renrakusaki-1',
        japaneseKey: '連絡先交換しない？',
        type: 'register',
        question: '仲良くなった相手に連絡先を聞きたい。一番カジュアルで自然なのは？',
        options: [
            'Please give me your phone number.',
            'May I have your contact information?',
            "Let's exchange contact info.",
            "Want to exchange numbers?",
        ],
        correctIdx: 3,
        explanation: 'Please give me は懇願してる感じで引かれる。May I have your contact information? は企業の受付レベル。Let us exchange... はやや硬い。Want to exchange numbers? が「連絡先交換しない？」の軽さに最も近い。What is your IG(Instagram)? も若者間では定番。',
    },
];
