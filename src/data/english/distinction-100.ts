// Native 100: ネイティブが毎日使ってるのに、教科書に載ってない100の表現
// NOT traditional idioms. NOT textbook phrases. Real conversational English.
// Calendar: 10 per day, 10 days starting 2026-03-24

export const NATIVE100_START_DATE = '2026-03-24'; // Day 1

export interface DistinctionEntry {
    id: string;
    expression: string;
    meaning: string;
    level: 1 | 2 | 3;
    category: DistinctionCategory;
    why: string;
    example: {
        a: string;
        b: string;
    };
    note?: string;
}

/** Get day number (1-10) for an entry by its index in DISTINCTION_DATA */
export function getDayForIndex(index: number): number {
    return Math.floor(index / 10) + 1;
}

/** Get calendar date string for a day number (1-10) */
export function getDateForDay(dayNum: number): string {
    const start = new Date(2026, 2, 24); // March 24
    start.setDate(start.getDate() + dayNum - 1);
    return `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`;
}

/** Get entries for a specific day (1-10) */
export function getEntriesForDay(dayNum: number): DistinctionEntry[] {
    const start = (dayNum - 1) * 10;
    return DISTINCTION_DATA.slice(start, start + 10);
}

/** Get day number from a Date object, or null if outside range */
export function getDayFromDate(date: Date): number | null {
    const start = new Date(2026, 2, 24);
    const diff = Math.floor((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0 || diff > 9) return null;
    return diff + 1;
}

export type DistinctionCategory =
    | 'reaction'
    | 'opinion'
    | 'emotion'
    | 'connector'
    | 'descriptor'
    | 'social';

export const DISTINCTION_CATEGORY_META: Record<DistinctionCategory, {
    label: string;
    labelEn: string;
    color: string;
    bg: string;
}> = {
    reaction:   { label: 'リアクション', labelEn: 'Reaction', color: '#D4AF37', bg: '#FEF9E7' },
    opinion:    { label: '意見表明', labelEn: 'Opinion', color: '#3B82F6', bg: '#EFF6FF' },
    emotion:    { label: '感情・状態', labelEn: 'Emotion', color: '#EC4899', bg: '#FDF2F8' },
    connector:  { label: '会話の接続', labelEn: 'Connector', color: '#10B981', bg: '#ECFDF5' },
    descriptor: { label: '描写・形容', labelEn: 'Descriptor', color: '#8B5CF6', bg: '#F5F3FF' },
    social:     { label: '社会的駆け引き', labelEn: 'Social', color: '#F59E0B', bg: '#FFFBEB' },
};

export const LEVEL_META: Record<1 | 2 | 3, { label: string; labelEn: string; color: string; bg: string }> = {
    1: { label: '日常必須', labelEn: 'Daily', color: '#16A34A', bg: '#F0FDF4' },
    2: { label: 'ナチュラル', labelEn: 'Natural', color: '#D97706', bg: '#FFFBEB' },
    3: { label: '上級会話', labelEn: 'Advanced', color: '#DC2626', bg: '#FEF2F2' },
};

export const DISTINCTION_DATA: DistinctionEntry[] = [
    // ===== REACTION (d001-d018) =====
    {
        id: 'd001',
        expression: 'That tracks',
        meaning: 'それ辻褄合うわ',
        level: 2,
        category: 'reaction',
        why: '「makes sense」の新世代版。元はデータ分析用語で「データが軌道に乗る」→「話の筋が通る」に進化した。makes senseより軽くてカジュアル。',
        example: {
            a: 'She quit her job and moved to Bali.',
            b: 'Yeah, that tracks. She was always talking about it.',
        },
    },
    {
        id: 'd002',
        expression: "I'm dead",
        meaning: '笑いすぎて死んだ',
        level: 1,
        category: 'reaction',
        why: '日本語の「死んだ」とほぼ同じ使い方。面白すぎて機能停止。テキストでも会話でも使う。LOLの口語版みたいなもの。',
        example: {
            a: 'He walked into the glass door at the meeting.',
            b: "I'm dead. Please tell me someone recorded that.",
        },
    },
    {
        id: 'd003',
        expression: 'Say less',
        meaning: 'もう十分、了解',
        level: 2,
        category: 'reaction',
        why: '「もう説明いらない、完全に理解した」の意味。説明を遮るんじゃなくて「即座に賛同」のニュアンス。Yesより強い同意。',
        example: {
            a: "There's a new ramen spot and they have unlimited garlic.",
            b: 'Say less. When are we going?',
        },
    },
    {
        id: 'd004',
        expression: 'Fair enough',
        meaning: 'まあそうだね、納得した',
        level: 1,
        category: 'reaction',
        why: '100%同意じゃないけど、相手の理屈は認める。日本語の「まあね」に近い。議論を柔らかく終わらせる万能フレーズ。',
        example: {
            a: "I don't want to go out. It's literally freezing.",
            b: "Fair enough. We'll just order in.",
        },
    },
    {
        id: 'd005',
        expression: 'Valid',
        meaning: 'それは正当、一理ある',
        level: 2,
        category: 'reaction',
        why: '元は「有効な」だけど、会話では「あなたの感情/意見は正当です」の短縮形。感情を否定しない同意。相手の気持ちを認めるときに使う。',
        example: {
            a: "I'm annoyed that nobody texted me back.",
            b: "That's valid. I'd be annoyed too.",
        },
    },
    {
        id: 'd006',
        expression: "I can't with you",
        meaning: 'お前もう無理だわ（笑）',
        level: 2,
        category: 'reaction',
        why: '「can\'t deal with you」の省略。怒りじゃなくて「面白すぎて処理不能」。日本語の「お前マジかよ」に近い愛情あるツッコミ。',
        example: {
            a: 'I put salt in my coffee instead of sugar and drank the whole thing.',
            b: "I can't with you. How did you not notice?",
        },
    },
    {
        id: 'd007',
        expression: 'No, because...',
        meaning: 'いやちょっと待って、実は...',
        level: 3,
        category: 'reaction',
        why: '否定に見えるけど実は強い同意の前置き。「No, because I was JUST thinking that」みたいに「偶然すぎて信じられない」を演出する。',
        example: {
            a: "We should get Korean food tonight.",
            b: "No, because I was literally just craving bibimbap.",
        },
    },
    {
        id: 'd008',
        expression: 'Noted',
        meaning: '了解、覚えておく',
        level: 1,
        category: 'reaction',
        why: 'ビジネスでもカジュアルでも使える万能返事。「聞いた、記録した」のニュアンス。温度感ゼロの返事にも使えるし、本気のメモにも使える。',
        example: {
            a: "If you eat my leftovers again, I'm moving out.",
            b: 'Noted.',
        },
    },
    {
        id: 'd009',
        expression: 'Wait, what?',
        meaning: 'え、ちょっと待って？',
        level: 1,
        category: 'reaction',
        why: '日本語の「え、待って？」そのもの。驚きと「もう一回言って」の両方を1語で表現。英語の驚きリアクションの基本形。',
        example: {
            a: 'Oh by the way, I got engaged last weekend.',
            b: "Wait, what? And you're just now telling me?",
        },
    },
    {
        id: 'd010',
        expression: "I'm not even surprised",
        meaning: '驚かないわ（もう慣れた）',
        level: 1,
        category: 'reaction',
        why: '「またか」の英語版。期待値が低い相手やお決まりの展開に使う。皮肉っぽいけど親しい間柄のジョーク。',
        example: {
            a: "I forgot my keys again and got locked out.",
            b: "I'm not even surprised at this point.",
        },
    },
    {
        id: 'd011',
        expression: 'Big yikes',
        meaning: 'うわ、それはヤバい',
        level: 2,
        category: 'reaction',
        why: 'yikesだけでも「うわっ」だけど、bigを付けると「それは相当ヤバい」に格上げ。他人の失敗に対する同情+引きのコンボ。',
        example: {
            a: 'I accidentally replied all with a complaint about my boss.',
            b: 'Big yikes. Are you still employed?',
        },
    },
    {
        id: 'd012',
        expression: 'Felt that',
        meaning: 'わかりすぎる、共感の極み',
        level: 2,
        category: 'reaction',
        why: '「I felt that in my soul」の省略。「わかる」じゃなくて「体験として理解した」レベルの共感。SNSでもリアルでも使う。',
        example: {
            a: "I'm so tired of pretending to like small talk.",
            b: 'Felt that. Deeply.',
        },
    },
    {
        id: 'd013',
        expression: "You're good",
        meaning: '大丈夫だよ、気にしないで',
        level: 1,
        category: 'reaction',
        why: '謝られたときの「no problem」よりカジュアルな返し。「You\'re fine」とも言う。日本語の「全然いいよ」のトーン。',
        example: {
            a: "Sorry I'm a few minutes late.",
            b: "You're good. We just got here too.",
        },
    },
    {
        id: 'd014',
        expression: 'Screaming',
        meaning: '面白すぎて叫んでる',
        level: 3,
        category: 'reaction',
        why: 'テキスト/SNS発の表現が口語に逆輸入。「I\'m screaming」で「笑いすぎ」。deadと同系統だけどもう少しテンション高め。',
        example: {
            a: 'Look at this picture of my cat wearing a tiny hat.',
            b: 'Screaming. This is the best thing I have seen all week.',
        },
    },
    {
        id: 'd015',
        expression: 'Heard',
        meaning: '了解、ちゃんと聞いた',
        level: 2,
        category: 'reaction',
        why: 'レストラン業界発。キッチンで注文を「聞いた！」と叫ぶ文化から一般会話に広がった。notedよりワーキングクラスっぽい響き。',
        example: {
            a: "Can you pick up milk on the way home?",
            b: 'Heard.',
        },
    },
    {
        id: 'd016',
        expression: 'The way I just...',
        meaning: '今の自分の反応がヤバい',
        level: 3,
        category: 'reaction',
        why: '自分の反応を実況するメタ表現。「The way I just spit out my coffee」で「コーヒー吹いた自分がウケる」。自虐+驚きの合体技。',
        example: {
            a: 'They announced a surprise day off tomorrow.',
            b: 'The way I just gasped out loud in the office.',
        },
    },
    {
        id: 'd017',
        expression: 'Wild',
        meaning: 'ヤバすぎ、信じられない',
        level: 1,
        category: 'reaction',
        why: '「crazy」のアップグレード版。crazyは使いすぎて弱くなった。wildは良い意味でも悪い意味でも「規格外」に使える。',
        example: {
            a: 'The concert tickets sold out in 8 seconds.',
            b: "That's wild. How is that even possible?",
        },
    },
    {
        id: 'd018',
        expression: 'Absolutely not',
        meaning: '絶対無理、断固拒否',
        level: 1,
        category: 'reaction',
        why: '「No」だと弱い場面で使う全力拒否。だけど会話では冗談っぽく使うことが多い。「絶対やだ（笑）」のトーン。',
        example: {
            a: "Let's go hiking at 5 AM tomorrow.",
            b: 'Absolutely not. I will be asleep.',
        },
    },

    // ===== OPINION (d019-d035) =====
    {
        id: 'd019',
        expression: 'Not gonna lie',
        meaning: '正直に言うと',
        level: 1,
        category: 'opinion',
        why: '「to be honest」のカジュアル版。だけど機能が違う。TBHは前置きだけど、NGLは「意外な本音」を出すときのクッション。ちょっと後ろめたい意見に使う。',
        example: {
            a: 'How was the movie?',
            b: "Not gonna lie, I fell asleep halfway through.",
        },
    },
    {
        id: 'd020',
        expression: 'Hot take',
        meaning: '物議を醸す意見、攻めた見解',
        level: 2,
        category: 'opinion',
        why: 'ジャーナリズム用語が日常会話に降りてきた。「これ言ったら炎上するかもだけど」の前振り。自分の意見が少数派だと自覚して言う。',
        example: {
            a: 'Hot take: pineapple on pizza is actually good.',
            b: "That's not a hot take, that's just facts.",
        },
    },
    {
        id: 'd021',
        expression: 'I said what I said',
        meaning: '言ったことは言った、撤回しない',
        level: 2,
        category: 'opinion',
        why: '反論されても「俺の意見は変わらない」の宣言。ドラマチックに聞こえるけど日常で軽く使う。日本語の「言ったもん勝ち」のノリ。',
        example: {
            a: "You really think that's the best restaurant in town?",
            b: 'I said what I said. Fight me.',
        },
    },
    {
        id: 'd022',
        expression: 'Honestly though',
        meaning: 'でもマジな話',
        level: 1,
        category: 'opinion',
        why: '冗談やふざけた話の後に本音に切り替えるスイッチ。「Honestly though, I really do appreciate it」みたいにトーンチェンジに使う。',
        example: {
            a: "Haha yeah, the interview was a disaster.",
            b: "Honestly though, I think you did better than you think.",
        },
    },
    {
        id: 'd023',
        expression: 'Hear me out',
        meaning: 'ちょっと聞いて、最後まで聞いて',
        level: 1,
        category: 'opinion',
        why: '「突飛なことを言うけど」の前振り。相手が反射的にNoと言いそうな提案の前に使う。プレゼン力のある表現。',
        example: {
            a: 'Okay, hear me out. What if we just quit and start a food truck?',
            b: "I'm listening...",
        },
    },
    {
        id: 'd024',
        expression: 'Respectfully',
        meaning: '敬意を持って言うけど（実は辛辣）',
        level: 2,
        category: 'opinion',
        why: '本来は丁寧語だけど、今は「これから失礼なこと言います」の免罪符。皮肉の前置き。日本語の「失礼ですが」と同じ裏表構造。',
        example: {
            a: "I think we should all start waking up at 4 AM.",
            b: 'Respectfully, no.',
        },
    },
    {
        id: 'd025',
        expression: "That's a stretch",
        meaning: 'それはこじつけでしょ',
        level: 2,
        category: 'opinion',
        why: '「stretch = 伸ばしすぎ」。相手の論理が飛躍してるとき。直接「wrong」と言わずに「ちょっと無理がある」とやんわり否定。',
        example: {
            a: "Maybe she didn't text back because she hates me.",
            b: "That's a stretch. She's probably just busy.",
        },
    },
    {
        id: 'd026',
        expression: "I mean...",
        meaning: 'いやまあ...',
        level: 1,
        category: 'opinion',
        why: '英語で最も多用されるフィラーの一つだけど教科書では教えない。意見をボカすとき、言い直すとき、「正直言うと」のニュアンスで全部使える。',
        example: {
            a: 'Do you like her new haircut?',
            b: "I mean... it's definitely different.",
        },
    },
    {
        id: 'd027',
        expression: "Let's be real",
        meaning: 'ぶっちゃけようぜ',
        level: 1,
        category: 'opinion',
        why: '「本音を言おう」の呼びかけ。グループ会話で使う。「let\'s be honest」より口語的。議論のギアを上げるときの合図。',
        example: {
            a: "Let's be real, nobody actually reads the terms and conditions.",
            b: 'Not a single person on earth.',
        },
    },
    {
        id: 'd028',
        expression: "That ain't it",
        meaning: 'それは違うわ、ハズレ',
        level: 2,
        category: 'opinion',
        why: '「that\'s not it」のカジュアル版。正解じゃない、的を外してる、ダサい。ファッション、意見、行動、何にでも使える否定。',
        example: {
            a: 'What do you think of my new logo design?',
            b: "I love you but... that ain't it, chief.",
        },
    },
    {
        id: 'd029',
        expression: 'To be fair',
        meaning: '公平に言えば',
        level: 1,
        category: 'opinion',
        why: '批判の後に「でも相手にも事情がある」と付け足すバランサー。日本語の「まあでも」に近い。議論で中立に戻すときの定番。',
        example: {
            a: "He totally ghosted us last night.",
            b: "To be fair, he did say he wasn't feeling well.",
        },
    },
    {
        id: 'd030',
        expression: 'No shade, but...',
        meaning: '悪口じゃないけど...',
        level: 3,
        category: 'opinion',
        why: '「shade = 陰口」を投げないと前置きしつつ、実は投げてる。日本語の「悪いけど」「ディスるわけじゃないけど」と同じ構造。',
        example: {
            a: 'No shade, but his cooking is not as good as he thinks it is.',
            b: "You just threw shade while saying no shade.",
        },
    },
    {
        id: 'd031',
        expression: "I'm just saying",
        meaning: 'ただ言ってるだけ（責任回避）',
        level: 1,
        category: 'opinion',
        why: '意見を言った後の保険。「アドバイスじゃないよ、ただの感想だよ」という逃げ道。日本語の「知らんけど」に近い機能。',
        example: {
            a: "I'm just saying, if I were you, I'd ask for a raise.",
            b: 'You make it sound so easy.',
        },
    },
    {
        id: 'd032',
        expression: 'Real talk',
        meaning: 'ガチで言うと、マジな話',
        level: 2,
        category: 'opinion',
        why: '冗談モードから真剣モードへの切り替えスイッチ。「Real talk, are you okay?」で急にシリアスになる。ヒップホップ文化発。',
        example: {
            a: "Haha, yeah, I've been working 14-hour days.",
            b: "Real talk, you need to set some boundaries.",
        },
    },
    {
        id: 'd033',
        expression: "Here's the thing",
        meaning: 'ポイントはこうなんだけど',
        level: 1,
        category: 'opinion',
        why: '議論の核心を切り出すフレーズ。「the thing is」より強い。これを言うと相手は「お、本題来るぞ」と身構える。',
        example: {
            a: "Why don't you just move closer to work?",
            b: "Here's the thing -- I actually like the commute. It's my alone time.",
        },
    },
    {
        id: 'd034',
        expression: "It's giving...",
        meaning: '~っぽい、~の雰囲気',
        level: 3,
        category: 'opinion',
        why: 'ドラッグカルチャー→TikTokで爆発。「It\'s giving 90s」で「90年代の雰囲気ある」。形容詞を使わずにvibeで伝える新しい構文。',
        example: {
            a: 'What do you think of this outfit?',
            b: "It's giving main character. You look amazing.",
        },
    },
    {
        id: 'd035',
        expression: 'Hard pass',
        meaning: '完全にパス、絶対やらない',
        level: 1,
        category: 'opinion',
        why: '「no thanks」の最上級。「pass」だけでも断りだけど「hard pass」は全力拒否。でもカジュアルだから友達同士で気軽に使う。',
        example: {
            a: 'Want to try the ghost pepper challenge?',
            b: "Hard pass. I choose life.",
        },
    },

    // ===== EMOTION (d036-d053) =====
    {
        id: 'd036',
        expression: "I can't even",
        meaning: 'もう無理、処理不能',
        level: 1,
        category: 'emotion',
        why: '文が完成しない。それ自体が感情の表現。「何ができないの？」→「全部」。感情がオーバーフローして言語化不能になった状態。',
        example: {
            a: 'They just announced a third season.',
            b: "I can't even. I need to sit down.",
        },
    },
    {
        id: 'd037',
        expression: "I'm over it",
        meaning: 'もう飽きた、どうでもいい',
        level: 1,
        category: 'emotion',
        why: '「乗り越えた」じゃなくて「もうウンザリ」。怒りが通り過ぎて無関心になった状態。日本語の「もういいわ」のニュアンス。',
        example: {
            a: 'Did you hear what happened at work today?',
            b: "Honestly? I'm over it. I stopped caring.",
        },
    },
    {
        id: 'd038',
        expression: 'Hits different',
        meaning: '格別、他と違う良さ',
        level: 2,
        category: 'emotion',
        why: '「good」や「special」では伝わらない感覚。特定の条件下で何かが普段より良く感じる。「冬のラーメンは格別」的な文脈。',
        example: {
            a: 'Why are you eating cereal at midnight?',
            b: "It just hits different at night. I don't make the rules.",
        },
    },
    {
        id: 'd039',
        expression: "I'm not okay",
        meaning: '結構キツい（半分冗談）',
        level: 1,
        category: 'emotion',
        why: 'ドラマチックに使うのがポイント。本当の精神崩壊じゃなくて「推しの新曲がヤバすぎてI\'m not okay」みたいな過剰反応。',
        example: {
            a: 'They just dropped the final trailer.',
            b: "I've watched it six times and I'm not okay.",
        },
    },
    {
        id: 'd040',
        expression: 'Living my best life',
        meaning: '最高に充実してる',
        level: 2,
        category: 'emotion',
        why: '自分の幸せを堂々と宣言する表現。自虐的にも使う。「一人でピザ食べてNetflix見てliving my best life」みたいな。',
        example: {
            a: 'What are you doing this weekend?',
            b: "Absolutely nothing. Living my best life.",
        },
    },
    {
        id: 'd041',
        expression: 'Mentally checked out',
        meaning: '心ここにあらず、集中力ゼロ',
        level: 2,
        category: 'emotion',
        why: 'ホテルのチェックアウトのメタファー。「精神が退室した」。仕事中に頭が他のこと考えてる状態。金曜午後の全社員の状態。',
        example: {
            a: 'Hey, are you listening?',
            b: "Sorry, I mentally checked out about five minutes ago.",
        },
    },
    {
        id: 'd042',
        expression: "It's a whole mood",
        meaning: 'めっちゃ共感、まさにそれ',
        level: 2,
        category: 'emotion',
        why: '「mood」が名詞から形容詞的に進化した表現。画像や状況を見て「これはまさに今の気分」。共感の最上級。',
        example: {
            a: 'Look at this dog lying on the couch with sunglasses.',
            b: "That's a whole mood right there.",
        },
    },
    {
        id: 'd043',
        expression: "I'm running on empty",
        meaning: 'もうガス欠、限界',
        level: 1,
        category: 'emotion',
        why: '車のガソリンメタファー。燃料切れ寸前で走ってる状態。「tired」の100倍具体的。体力、気力、どっちにも使える。',
        example: {
            a: 'You look exhausted.',
            b: "I'm running on empty. Three hours of sleep.",
        },
    },
    {
        id: 'd044',
        expression: 'Lowkey',
        meaning: 'ちょっと、控えめに、地味に',
        level: 1,
        category: 'emotion',
        why: '英語には「ちょっと」と「めっちゃ」の中間の強度表現が少ない。lowkeyはそこを埋める。「lowkey excited = 地味にワクワクしてる」。公言しにくい気持ちに使う。',
        example: {
            a: 'Are you excited about the reunion?',
            b: "I'm lowkey dreading it, to be honest.",
        },
    },
    {
        id: 'd045',
        expression: 'Highkey',
        meaning: 'めっちゃ、隠しきれないレベルで',
        level: 2,
        category: 'emotion',
        why: 'lowkeyの対義語。「隠せないレベルで」。「highkey obsessed = もう隠せないくらいハマってる」。very/reallyより感情が乗る。',
        example: {
            a: 'How do you feel about the new album?',
            b: "I'm highkey obsessed. I've listened to it on repeat.",
        },
    },
    {
        id: 'd046',
        expression: 'Drained',
        meaning: '精神的に疲弊した',
        level: 1,
        category: 'emotion',
        why: '「drain = 排水」。エネルギーが全部流れ出た状態。tiredは肉体、drainedは精神。人間関係や仕事で「吸い取られた」感覚。',
        example: {
            a: 'How was the family dinner?',
            b: 'Drained. Three hours of passive-aggressive comments.',
        },
    },
    {
        id: 'd047',
        expression: "I'm in my feels",
        meaning: '感傷的になってる',
        level: 2,
        category: 'emotion',
        why: '「feelings」をfeelsに短縮した形。感情の渦中にいる状態。夜中に昔の写真見てる時とか。ちょっと自虐的に使うのが普通。',
        example: {
            a: "Why are you listening to sad music at 2 AM?",
            b: "I'm in my feels tonight. Don't judge me.",
        },
    },
    {
        id: 'd048',
        expression: "I'm so done",
        meaning: 'もう限界、これ以上は無理',
        level: 1,
        category: 'emotion',
        why: '「finished」の感情版。タスクじゃなくて忍耐が「完了」した。「I\'m done with this day」で「今日もう終わりにしたい」。',
        example: {
            a: "The printer jammed again.",
            b: "I'm so done with this printer. I want to throw it out the window.",
        },
    },
    {
        id: 'd049',
        expression: 'Obsessed',
        meaning: 'ドハマリ中',
        level: 1,
        category: 'emotion',
        why: '医学用語の「強迫観念」が日常では「超お気に入り」に。ポジティブな意味で使う。「I\'m obsessed with this song」は「この曲神」レベル。',
        example: {
            a: 'Have you tried that new cafe?',
            b: "I'm obsessed. I've been there four times this week.",
        },
    },
    {
        id: 'd050',
        expression: 'Spiraling',
        meaning: 'ネガティブ思考が止まらない',
        level: 2,
        category: 'emotion',
        why: '「spiral = らせん状に落ちる」。不安や心配が雪だるま式に膨らむ状態。自分で「あ、今spiralしてる」と自覚して言える便利な表現。',
        example: {
            a: "She hasn't texted back in two hours.",
            b: "You're spiraling. She's probably just at work.",
        },
    },
    {
        id: 'd051',
        expression: 'Thriving',
        meaning: '絶好調、充実しまくり',
        level: 2,
        category: 'emotion',
        why: '「survive（生存）」の上位が「thrive（繁栄）」。日常では「最高の状態」。別れた後に元気アピールで使う定番。',
        example: {
            a: 'How have you been since you quit?',
            b: 'Honestly? Thriving. Best decision I ever made.',
        },
    },
    {
        id: 'd052',
        expression: 'Triggered',
        meaning: 'スイッチ入った、地雷踏まれた',
        level: 2,
        category: 'emotion',
        why: '元は心理学用語（トラウマの引き金）だけど、カジュアルに「嫌なこと思い出した」「イラッとした」に使う。軽い使い方は議論もあるが超普及してる。',
        example: {
            a: 'Remember that group project in college?',
            b: "Don't. I'm already triggered.",
        },
    },
    {
        id: 'd053',
        expression: "Couldn't be me",
        meaning: '俺には無理だわ、自分じゃ絶対やらない',
        level: 2,
        category: 'emotion',
        why: '他人の状況を見て「自分はあれにはなれない」。同情、見下し、自虐が全部混ざる。「couldn\'t」の短縮が口語感を出す。',
        example: {
            a: 'She wakes up at 4:30 every morning to work out.',
            b: "Couldn't be me. I need my sleep.",
        },
    },

    // ===== CONNECTOR (d054-d068) =====
    {
        id: 'd054',
        expression: 'Anyway',
        meaning: 'まあとにかく、それはさておき',
        level: 1,
        category: 'connector',
        why: '話題転換の王様。日本語の「まあいいや」「とにかく」。脱線した後に本題に戻すとき必須。ネイティブは1会話で何回も使う。',
        example: {
            a: '...and then the waiter tripped. Anyway, what were you saying?',
            b: 'Oh right, so about the meeting tomorrow...',
        },
    },
    {
        id: 'd055',
        expression: 'Speaking of which',
        meaning: 'そういえば、それで思い出したけど',
        level: 1,
        category: 'connector',
        why: '自然な話題遷移の接着剤。前の話題と次の話題を関連づけて繋ぐ。「by the way」より論理的な接続。',
        example: {
            a: "I need to start eating healthier.",
            b: "Speaking of which, have you tried that new salad place?",
        },
    },
    {
        id: 'd056',
        expression: 'On that note',
        meaning: 'その話で言うと、じゃあここで',
        level: 2,
        category: 'connector',
        why: '話題に乗っかって別の方向に持っていく。または会話やミーティングを締める合図。「On that note, I should get going」は退出の定番。',
        example: {
            a: "Yeah, it's been a long day for everyone.",
            b: "On that note, I'm heading out. See you tomorrow.",
        },
    },
    {
        id: 'd057',
        expression: "So basically",
        meaning: 'つまりざっくり言うと',
        level: 1,
        category: 'connector',
        why: '長い説明を要約するとき。「basically」だけでもいいけど「so basically」で「ここまでの話をまとめると」の機能が強まる。',
        example: {
            a: "I don't understand what happened.",
            b: "So basically, they changed the plan without telling anyone.",
        },
    },
    {
        id: 'd058',
        expression: 'The thing is',
        meaning: '実はさ、問題はさ',
        level: 1,
        category: 'connector',
        why: '本題に切り込む前置き。言い訳にも使える万能接続詞。「The thing is, I forgot」= 「実はさ、忘れてた」。日本語の「あのさ」に近い便利さ。',
        example: {
            a: 'Why didn\'t you come to the party?',
            b: 'The thing is, I totally forgot it was today.',
        },
    },
    {
        id: 'd059',
        expression: 'Not to change the subject, but...',
        meaning: '話変えるわけじゃないけど...',
        level: 2,
        category: 'connector',
        why: '話題を変えますと宣言しながら変える。日本語の「話変わるけど」と同じ。宣言するから不自然にならない。逆説の礼儀。',
        example: {
            a: "...so that's what happened at the meeting.",
            b: "Not to change the subject, but did you eat? I'm starving.",
        },
    },
    {
        id: 'd060',
        expression: "That reminds me",
        meaning: 'あ、それで思い出した',
        level: 1,
        category: 'connector',
        why: '連想ゲームの接続詞。相手の話から自分の話に自然に繋ぐ。「Oh that reminds me, I need to call my mom」みたいな独り言にも使う。',
        example: {
            a: 'The concert is next Friday.',
            b: "Oh, that reminds me, I still need to buy tickets.",
        },
    },
    {
        id: 'd061',
        expression: 'Where was I?',
        meaning: 'あれ、どこまで話したっけ？',
        level: 1,
        category: 'connector',
        why: '話が脱線した後に本線に戻るフレーズ。日本語の「で、何の話だっけ」そのもの。会話の再起動ボタン。',
        example: {
            a: "...oh wait, that's a different story. Where was I?",
            b: 'You were talking about the interview.',
        },
    },
    {
        id: 'd062',
        expression: "Point being",
        meaning: '要するに何が言いたいかというと',
        level: 2,
        category: 'connector',
        why: '「my point being」の省略。だらだら話した後に結論を叩きつける。「the point is」より口語的で勢いがある。',
        example: {
            a: '...and then this happened, and then that happened...',
            b: "Point being, we need a better plan.",
        },
    },
    {
        id: 'd063',
        expression: 'Real quick',
        meaning: 'ちょっとだけ、一瞬だけ',
        level: 1,
        category: 'connector',
        why: '「quickly」のカジュアル版。話を挟むとき、頼みごとするとき、全部これ。「Can I say something real quick?」で割り込む。',
        example: {
            a: "Hey, can I grab you real quick?",
            b: "Yeah, what's up?",
        },
    },
    {
        id: 'd064',
        expression: 'To circle back',
        meaning: 'さっきの話に戻ると',
        level: 2,
        category: 'connector',
        why: 'ビジネス英語から日常に降りてきた。「戻る」の比喩。「To circle back to what you said earlier」で前の話題を掘り返す。',
        example: {
            a: "To circle back to the budget thing, I actually have an idea.",
            b: "Oh yeah, let's hear it.",
        },
    },
    {
        id: 'd065',
        expression: "But yeah",
        meaning: 'まあそんな感じ',
        level: 1,
        category: 'connector',
        why: '話の締めくくりに使う。「でもまあ、そういうこと」。長い話を「but yeah」で着地させる。英語の「まあね」。ネイティブの口癖。',
        example: {
            a: "...so it was kind of a mess. But yeah, we figured it out.",
            b: "Glad it worked out.",
        },
    },
    {
        id: 'd066',
        expression: "I digress",
        meaning: '脱線した、話がそれた',
        level: 3,
        category: 'connector',
        why: 'フォーマルな単語をカジュアルに使うギャップが面白い表現。自分で脱線を自覚して宣言する。知的な自虐。',
        example: {
            a: "...but that's a whole other topic. I digress.",
            b: "No, actually, I want to hear about that too.",
        },
    },
    {
        id: 'd067',
        expression: "The thing is",
        meaning: '問題はさ、実はね',
        level: 1,
        category: 'connector',
        why: '核心を切り出す前置き。「Here\'s the thing」より柔らかい。言いにくいことを言うときのクッション。超頻出なのに教科書にない。',
        example: {
            a: 'Why did you cancel?',
            b: "The thing is, I just wasn't in the mood to be around people.",
        },
    },
    {
        id: 'd068',
        expression: "You know what",
        meaning: 'あのさ、ちょっと聞いて',
        level: 1,
        category: 'connector',
        why: '質問じゃない。「聞いて」のアテンション・グラバー。怒りでも興奮でも使う。「You know what, forget it」は「もういいわ」。',
        example: {
            a: "Should we just order pizza again?",
            b: "You know what, let's actually cook something for once.",
        },
    },

    // ===== DESCRIPTOR (d069-d085) =====
    {
        id: 'd069',
        expression: 'Rent-free',
        meaning: '頭から離れない',
        level: 2,
        category: 'descriptor',
        why: '「living in my head rent-free」= 家賃も払わず頭に住み着いてる。忘れられない曲、シーン、人に使う。メタファーの天才的表現。',
        example: {
            a: "I keep thinking about that embarrassing thing I said.",
            b: "It's living in your head rent-free. Let it go.",
        },
    },
    {
        id: 'd070',
        expression: 'Main character energy',
        meaning: '主人公オーラ、目立ってる',
        level: 3,
        category: 'descriptor',
        why: '人生を映画に見立てる表現。「あの人は主人公っぽい」。自信があってキラキラしてる人に使う。自虐的にも使える。',
        example: {
            a: 'She walked in with sunglasses and a coffee, ten minutes late.',
            b: 'Main character energy. She does not care.',
        },
    },
    {
        id: 'd071',
        expression: 'The bare minimum',
        meaning: '最低限のこと、それすらギリギリ',
        level: 1,
        category: 'descriptor',
        why: '「最低限すらやってない」の文脈で使うことが多い。恋愛で「texting back is the bare minimum」=「返信するなんて当たり前」。期待値の話。',
        example: {
            a: 'He remembered my birthday this year.',
            b: "That's literally the bare minimum.",
        },
    },
    {
        id: 'd072',
        expression: 'Giving me anxiety',
        meaning: '不安にさせてくる、ストレス',
        level: 1,
        category: 'descriptor',
        why: '医学用語の「anxiety」がカジュアルに超普及。「This email is giving me anxiety」=「このメール見るだけでストレス」。日常の軽い不安に使う。',
        example: {
            a: "My phone is at 2% and I can't find my charger.",
            b: "That's giving me anxiety just hearing about it.",
        },
    },
    {
        id: 'd073',
        expression: 'A whole vibe',
        meaning: '最高の雰囲気、独自の世界観',
        level: 2,
        category: 'descriptor',
        why: '「vibe」を名詞で使う新しい文法。「This cafe is a whole vibe」=「この店、世界観すごい」。形容詞では表現しきれない空気感を一語で。',
        example: {
            a: 'Have you been to that new bookstore?',
            b: 'Yes. It is a whole vibe. Jazz, coffee, and cats.',
        },
    },
    {
        id: 'd074',
        expression: 'Unhinged',
        meaning: 'ぶっ飛んでる、ネジ外れてる',
        level: 2,
        category: 'descriptor',
        why: '「hinge = 蝶番」が外れた状態。元は精神状態だけど今は「予想外の行動」をする人に褒め言葉としても使う。TikTokで爆発。',
        example: {
            a: 'She ate cereal with water because she ran out of milk.',
            b: 'That is unhinged behavior.',
        },
    },
    {
        id: 'd075',
        expression: 'Iconic',
        meaning: '伝説的、圧倒的に良い',
        level: 2,
        category: 'descriptor',
        why: '元は「象徴的な」だけど日常では「最高にイケてる」。友達の発言や行動を「That\'s iconic」と持ち上げる。good/greatの上位互換。',
        example: {
            a: 'She told her boss she needed a mental health day and just went to the beach.',
            b: 'Iconic.',
        },
    },
    {
        id: 'd076',
        expression: 'A red flag',
        meaning: '危険信号、やめた方がいい兆候',
        level: 1,
        category: 'descriptor',
        why: '恋愛文脈で爆発的に普及。相手のヤバい兆候。「He doesn\'t tip = red flag」。今は恋愛以外でも何にでも使う。',
        example: {
            a: 'He said he doesn\'t have any close friends.',
            b: "That's a red flag, honestly.",
        },
    },
    {
        id: 'd077',
        expression: 'A green flag',
        meaning: '好印象、いい兆候',
        level: 2,
        category: 'descriptor',
        why: 'red flagの対義語として自然発生。「いい兆候」。恋愛で「He remembers small details = green flag」。red flagの流行が生んだ双子。',
        example: {
            a: 'She asked how my mom was doing without me bringing it up.',
            b: 'Green flag. She actually listens.',
        },
    },
    {
        id: 'd078',
        expression: 'The ick',
        meaning: '生理的に無理、急に冷めるやつ',
        level: 3,
        category: 'descriptor',
        why: '恋愛で「一瞬で冷める瞬間」。「He gave me the ick when he ran for the bus」。論理じゃなくて生理的反応。日本語の「ちょっと無理」。',
        example: {
            a: 'He eats with his mouth open.',
            b: "That would give me the ick immediately.",
        },
    },
    {
        id: 'd079',
        expression: 'Low-maintenance',
        meaning: '手がかからない、楽な人',
        level: 1,
        category: 'descriptor',
        why: '機械のメンテナンス用語が人間関係に。「She\'s low-maintenance」= 気を遣わなくていい人。褒め言葉。逆はhigh-maintenance。',
        example: {
            a: "I love hanging out with her. She's so low-maintenance.",
            b: "Right? She's happy with anything.",
        },
    },
    {
        id: 'd080',
        expression: 'Tone-deaf',
        meaning: '空気読めてない、場違い',
        level: 2,
        category: 'descriptor',
        why: '音楽の「音痴」が「空気を読めない」に拡張。「That comment was so tone-deaf」= 場の空気を完全に無視した発言。',
        example: {
            a: 'He complained about his vacation being boring to someone who can\'t afford one.',
            b: "That's incredibly tone-deaf.",
        },
    },
    {
        id: 'd081',
        expression: 'On brand',
        meaning: 'その人らしい、いかにも',
        level: 2,
        category: 'descriptor',
        why: 'マーケティング用語の「ブランドに合ってる」が個人に適用。「Showing up late is so on brand for him」= 遅刻、あいつらしい。',
        example: {
            a: 'He brought a spreadsheet to plan the road trip.',
            b: "That's so on brand for him.",
        },
    },
    {
        id: 'd082',
        expression: 'Peak',
        meaning: '最高潮、これ以上ない',
        level: 2,
        category: 'descriptor',
        why: '「peak performance」のpeakが独立。「This is peak comedy」=「これ以上面白いものはない」。皮肉にも本気にも使える。',
        example: {
            a: 'He fell asleep during his own presentation.',
            b: "That's peak comedy right there.",
        },
    },
    {
        id: 'd083',
        expression: 'Mid',
        meaning: '普通、微妙、期待ハズレ',
        level: 2,
        category: 'descriptor',
        why: '「middle = 真ん中」→「平凡」。badじゃなくて「特に良くもない」。ゲーム文化発。期待してたのに普通だった失望を表す。',
        example: {
            a: 'How was the new restaurant?',
            b: "Honestly? Mid. It was fine but nothing special.",
        },
    },
    {
        id: 'd084',
        expression: 'Chaotic energy',
        meaning: 'カオスな雰囲気、予測不能な人',
        level: 3,
        category: 'descriptor',
        why: '「chaotic good/evil」のD&D用語が日常に。予測不能だけどなぜか魅力的な人やイベント。「She has chaotic energy」= あの子カオス。',
        example: {
            a: 'She showed up to the meeting with a full pizza.',
            b: 'Chaotic energy. I respect it.',
        },
    },
    {
        id: 'd085',
        expression: 'Built different',
        meaning: '一味違う、普通じゃない',
        level: 2,
        category: 'descriptor',
        why: '「作りが違う」。すごいことを平然とやる人に使う。褒め言葉。「She ran a marathon with no training. Built different.」',
        example: {
            a: 'He ate the entire spicy ramen without water.',
            b: 'That man is built different.',
        },
    },

    // ===== SOCIAL (d086-d100) =====
    {
        id: 'd086',
        expression: 'The audacity',
        meaning: 'よくそんなことできるな',
        level: 2,
        category: 'social',
        why: '「audacity = 大胆さ」だけど会話では「信じられない図々しさ」。怒りと驚きのコンボ。「The audacity of this man」で「この男の神経」。',
        example: {
            a: 'He asked me to help him move after ghosting me for a month.',
            b: 'The audacity. I hope you said no.',
        },
    },
    {
        id: 'd087',
        expression: 'Main character energy',
        meaning: '主人公感、自分が中心の振る舞い',
        level: 2,
        category: 'social',
        why: '映画やドラマの主人公みたいに振る舞う人。褒めにも皮肉にも使える。「She walked in with main character energy」= あの子、完全に主人公の登場シーンだった。',
        example: {
            a: 'She wore a red dress to a funeral.',
            b: 'Main character energy. Bold move.',
        },
    },
    {
        id: 'd088',
        expression: 'Pick your battles',
        meaning: '戦うところを選べ、全部に怒るな',
        level: 1,
        category: 'social',
        why: '軍事用語が人生のアドバイスに。「すべてに反応するな、本当に大事なことだけに力を使え」。大人の知恵。',
        example: {
            a: "My coworker keeps leaving dishes in the sink.",
            b: "Pick your battles. Is it worth the confrontation?",
        },
    },
    {
        id: 'd089',
        expression: "That's on you",
        meaning: 'それは自己責任でしょ',
        level: 1,
        category: 'social',
        why: '「on you = あなたの上に乗ってる」→「あなたの責任」。blame（非難）ほどキツくないけど「自分で招いた結果だよね」の指摘。',
        example: {
            a: "I shouldn't have eaten that whole cake.",
            b: "Yeah, that's on you.",
        },
    },
    {
        id: 'd090',
        expression: 'We need to talk',
        meaning: '話がある（深刻な前振り）',
        level: 1,
        category: 'social',
        why: '英語圏で最も恐れられるフレーズの一つ。別れ話、クビ、重大な告白の前振り。これを言われた瞬間、心拍数が上がる。',
        example: {
            a: 'Hey, we need to talk.',
            b: 'Those four words just gave me a heart attack.',
        },
    },
    {
        id: 'd091',
        expression: 'Boundaries',
        meaning: '線引き、ここまでOKここからNG',
        level: 1,
        category: 'social',
        why: '心理学用語が完全に日常化。「Set boundaries」= 自分の限界を相手に伝える。現代英語で最も重要な概念の一つ。',
        example: {
            a: 'My boss keeps texting me at midnight.',
            b: 'You need to set some boundaries.',
        },
    },
    {
        id: 'd092',
        expression: "Don't come for me",
        meaning: '俺を攻撃するなよ',
        level: 3,
        category: 'social',
        why: '「come for someone = 誰かを攻撃しに行く」。自分の意見が物議を醸すとわかってて先に防御線を張る。攻撃的じゃなくて防御的な表現。',
        example: {
            a: "Don't come for me, but I think that movie was overrated.",
            b: "Oh, people are definitely going to come for you.",
        },
    },
    {
        id: 'd093',
        expression: 'Call someone out',
        meaning: '指摘する、問題を表に出す',
        level: 1,
        category: 'social',
        why: '「out = 外に」。隠れてた問題を表に引きずり出す。SNS時代に超重要になった。「cancel」の一歩手前。公の場での批判。',
        example: {
            a: "Someone needs to call him out on that behavior.",
            b: "I know, but nobody wants to be the one to do it.",
        },
    },
    {
        id: 'd094',
        expression: 'Gatekeeping',
        meaning: '独占、仲間に入れない行為',
        level: 2,
        category: 'social',
        why: '門番（gatekeeper）が趣味やコミュニティを独占する行為。「You can\'t be a real fan unless...」みたいなやつ。排他的行為の批判に使う。',
        example: {
            a: "You're not a real coffee person if you use sugar.",
            b: "Stop gatekeeping coffee. Let people enjoy things.",
        },
    },
    {
        id: 'd095',
        expression: 'Gaslight',
        meaning: '相手の認識を操作する、嘘で混乱させる',
        level: 2,
        category: 'social',
        why: '1944年の映画タイトルが動詞に。相手の正気を疑わせる心理操作。「Am I being gaslit?」=「俺の記憶が間違ってるの？」。超流行中。',
        example: {
            a: "I swear he said Friday, but now he's saying Saturday.",
            b: "He's gaslighting you. I heard him say Friday too.",
        },
    },
    {
        id: 'd096',
        expression: "It's not that deep",
        meaning: 'そんな深い意味ないよ',
        level: 2,
        category: 'social',
        why: '相手が考えすぎてるときのストッパー。「深読みしすぎ」。軽い話を重く受け止められたときに使う。「relax」のスマート版。',
        example: {
            a: "Do you think she's mad at me because she used a period instead of an exclamation mark?",
            b: "It's not that deep. She was probably just in a hurry.",
        },
    },
    {
        id: 'd097',
        expression: 'Normalize',
        meaning: '当たり前にしよう、普通のことにしよう',
        level: 2,
        category: 'social',
        why: 'SNS時代のスローガン構文。「Normalize taking a day off for your mental health」。社会の「普通」を再定義しようとする表現。',
        example: {
            a: "I feel bad for leaving work on time.",
            b: "Normalize leaving when your shift is over.",
        },
    },
    {
        id: 'd098',
        expression: 'Toxic',
        meaning: '有害な、悪影響を及ぼす',
        level: 1,
        category: 'social',
        why: '化学用語が人間関係の必須語彙に。「toxic relationship」「toxic workplace」。2010年代後半から爆発的に普及。今や日常語。',
        example: {
            a: "My ex keeps texting me even though we broke up.",
            b: "That's toxic. Block the number.",
        },
    },
    {
        id: 'd099',
        expression: 'Do the bare minimum',
        meaning: '最低限のことだけやる（批判的に）',
        level: 1,
        category: 'social',
        why: '努力不足を批判する定番フレーズ。特に恋愛で「He only does the bare minimum」= あの人は必要最低限しかしない。期待値の話。',
        example: {
            a: "He finally responded after three days.",
            b: "Wow, doing the bare minimum. How generous.",
        },
    },
    {
        id: 'd100',
        expression: "That's not giving what you think it's giving",
        meaning: '思ってるほど良くないよ',
        level: 3,
        category: 'social',
        why: '「It\'s giving」の否定形。相手が自信満々だけど実際は微妙なとき。「あなたが思ってる印象と実際の印象が違う」。最高に辛辣で面白い。',
        example: {
            a: "Check out my dance moves.",
            b: "That's not giving what you think it's giving.",
        },
    },
];

// Helper functions
export function getByCategory(cat: DistinctionCategory): DistinctionEntry[] {
    return DISTINCTION_DATA.filter(e => e.category === cat);
}

export function getByLevel(level: 1 | 2 | 3): DistinctionEntry[] {
    return DISTINCTION_DATA.filter(e => e.level === level);
}

export function getCategoryStats(): Record<DistinctionCategory, number> {
    const stats = { reaction: 0, opinion: 0, emotion: 0, connector: 0, descriptor: 0, social: 0 };
    for (const entry of DISTINCTION_DATA) {
        stats[entry.category]++;
    }
    return stats;
}

export function getLevelStats(): Record<1 | 2 | 3, number> {
    const stats = { 1: 0, 2: 0, 3: 0 };
    for (const entry of DISTINCTION_DATA) {
        stats[entry.level]++;
    }
    return stats;
}
