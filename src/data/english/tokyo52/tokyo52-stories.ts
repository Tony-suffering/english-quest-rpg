/**
 * Tokyo 52 -- Story Scenes (Weeks 1-4, Spring)
 *
 * Weekly episodes (20-30 lines), longer than 365's daily scenes.
 * Advanced conversational situations: opinions, culture, work, debate.
 *
 * Characters:
 *   yuki (27F) - trading company sales, TOEIC 620, daytime persona: serious, frustrated, determined
 *   aya (24F) - returnee junior colleague, fluent but never condescending, warm
 *   rina (22F) - cafe barista, self-taught via YouTube/Netflix, fearless
 *   master (78M) - Gondo, izakaya owner, appears in izakaya scenes only
 *   client (male) - foreign client at Yuki's company, Week 3
 */

// ============================================================
// TYPES
// ============================================================

export interface Tokyo52StoryLine {
    speaker: string;
    japanese: string;
    english?: string;
    mood?: 'normal' | 'drunk' | 'angry' | 'excited' | 'thinking' | 'smug' | 'defeated';
    action?: string;
}

export interface Tokyo52Story {
    weekSlot: number;
    title: string;
    titleEn: string;
    scene: string;
    story: Tokyo52StoryLine[];
}

// ============================================================
// STORIES: WEEKS 1-4
// ============================================================

export const TOKYO52_STORIES: Tokyo52Story[] = [

    // ────────────────────────────────────────────────────────
    // WEEK 1: 意見を言う (Sharing Opinions)
    // カフェでユキとアヤが「日本人はなぜ意見を言わないか」の議論に
    // ────────────────────────────────────────────────────────
    {
        weekSlot: 1,
        title: '意見を言う',
        titleEn: 'Sharing Opinions',
        scene: '渋谷のカフェ。金曜の午後、仕事帰りのユキとアヤ。リナがカウンターで働いている。',
        story: [
            { speaker: 'narration', japanese: '渋谷のカフェ。窓際の席でユキがアイスラテを見つめている。' },
            { speaker: 'yuki', japanese: '今日の会議、また何も言えなかった。', mood: 'defeated', action: 'ストローをくるくる回す' },
            { speaker: 'aya', japanese: '部長がずっと喋ってたもんね。誰も入れなかったよ。', mood: 'normal' },
            { speaker: 'yuki', japanese: '正直に言うと、入るタイミングがわからない。英語の会議って、みんなどんどん喋るでしょ。', english: 'Honestly, I never know when to jump in. In English meetings, everyone just... talks.', mood: 'thinking' },
            { speaker: 'aya', japanese: '個人的には、日本語の会議も同じ問題あると思うけどね。', english: 'Personally, I think it is the same problem in Japanese meetings too.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'それは違うと思う。日本語だったら空気読めるから。英語になると空気がわからなくなる。', english: 'I see it differently. In Japanese I can read the room. In English, I lose that completely.', mood: 'normal' },
            { speaker: 'aya', japanese: '一理あるけど...でもさ、「空気を読む」って本当に意見を言ってることになる？', english: 'You have got a point, but... here is the thing -- is reading the room really the same as sharing your opinion?', mood: 'thinking' },
            { speaker: 'yuki', japanese: '...。', mood: 'thinking' },
            { speaker: 'rina', japanese: 'おかわりいかがですか？ ...あ、重い話してる？', action: 'ラテを持ってくる' },
            { speaker: 'aya', japanese: 'リナちゃん、聞いてもいい？英語で自分の意見言うとき、怖くない？', mood: 'normal' },
            { speaker: 'rina', japanese: '怖い？ ...うーん、例えば、海外のお客さんにおすすめ聞かれたとき、「個人的にはこれが好き」って普通に言うけど。', english: 'Hmm, like, when a customer asks for a recommendation, I just say what I personally like. It is not scary, it is just... my opinion.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'それは注文の話でしょ。会議で「あなたの意見は間違ってます」って言えるかって話。', mood: 'normal' },
            { speaker: 'rina', japanese: '言い方の問題じゃないですか？「それは違う」じゃなくて「別の見方をすると」なら角が立たない。', english: 'Is it not about how you say it? Instead of "you are wrong," you say "here is another angle." Same thing, different packaging.', mood: 'normal' },
            { speaker: 'aya', japanese: '要するに、日本人は意見がないんじゃなくて、意見の「出し方」を知らないだけなんだよね。', english: 'What it comes down to is -- Japanese people do not lack opinions. They just do not know how to present them.', mood: 'normal' },
            { speaker: 'yuki', japanese: '確かにそうだけど...何が言いたいかって言うと、英語で意見を言うのって技術がいるってこと。感情じゃなくて。', english: 'Fair enough, but... what I am really trying to say is that expressing opinions in English is a skill. Not a personality trait.', mood: 'thinking' },
            { speaker: 'rina', japanese: '技術なら練習できますよね。', mood: 'normal', action: 'カウンターを拭きながら' },
            { speaker: 'aya', japanese: 'そうそう。結論から言うと、「意見を言う練習」が足りてないだけ。英語力の問題じゃない。', english: 'Let me cut to the chase. We do not practice sharing opinions enough. It is not about English ability.', mood: 'normal' },
            { speaker: 'yuki', japanese: '...じゃあ練習しよう。今、ここで。', mood: 'normal', action: 'ラテを置いて姿勢を正す' },
            { speaker: 'aya', japanese: 'え、急に？', mood: 'excited' },
            { speaker: 'yuki', japanese: '逆に言えば、カフェで練習できないなら会議でもできない。正直に言うと、私は変わりたい。', english: 'If you flip it around, if I can not do it in a cafe, I can not do it in a meeting. Honestly, I want to change.', mood: 'normal' },
            { speaker: 'rina', japanese: 'お題出しましょうか？「猫と犬、どっちが上か」。', mood: 'excited', action: 'カウンター越しに身を乗り出す' },
            { speaker: 'aya', japanese: '...もうちょっとマシなお題にして。', mood: 'normal' },
            { speaker: 'yuki', japanese: '...ぷっ。まあいいや。猫。個人的には猫。理由は3つある。', english: 'Fine. Cats. Personally, I am a cat person. Three reasons.', mood: 'normal', action: '指を3本立てる' },
            { speaker: 'rina', japanese: '見てください、もう意見言えてるじゃないですか。', mood: 'excited' },
            { speaker: 'aya', japanese: 'お題のレベルが低すぎるだけだと思う...', mood: 'normal' },
            { speaker: 'narration', japanese: '3人の笑い声がカフェに広がった。意見を言う練習は、くだらないお題から始まった。' },
        ],
    },

    // ────────────────────────────────────────────────────────
    // WEEK 2: 日本を説明する (Explaining Japan)
    // 外国人同僚に「なぜ日本人は〜」と聞かれて困るユキ
    // ────────────────────────────────────────────────────────
    {
        weekSlot: 2,
        title: '日本を説明する',
        titleEn: 'Explaining Japan',
        scene: 'オフィスの休憩室。ユキの会社に出向中の外国人同僚マークが素朴な質問をぶつけてくる。夜、カフェでアヤとリナに報告。',
        story: [
            { speaker: 'narration', japanese: 'オフィスの休憩室。昼休み。マークがコーヒーを入れながらユキに話しかける。' },
            { speaker: 'client', japanese: 'Hey Yuki, can I ask you something? Why does everyone bow to the elevator?', english: 'Hey Yuki, can I ask you something? Why does everyone bow to the elevator?', mood: 'normal' },
            { speaker: 'yuki', japanese: '（...エレベーターにお辞儀？ あー、降りる人に頭下げてるのか）えっと...', english: 'Um... well...', mood: 'thinking' },
            { speaker: 'client', japanese: 'Like, every time the door opens, everyone does this little nod. Is that a Japan thing?', english: 'Like, every time the door opens, everyone does this little nod. Is that a Japan thing?', mood: 'normal' },
            { speaker: 'yuki', japanese: '日本ではね...文化的に、挨拶は...um...', english: 'So in Japan... culturally, greetings are...', mood: 'defeated', action: '言葉を探して天井を見る' },
            { speaker: 'client', japanese: 'Sorry, was that a weird question?', english: 'Sorry, was that a weird question?', mood: 'normal' },
            { speaker: 'yuki', japanese: 'No! It is just... 一言で説明するのは難しくて。', english: 'No! It is just... it is not easy to put into words.', mood: 'normal' },
            { speaker: 'narration', japanese: 'その夜。渋谷のカフェ。ユキがアヤとリナに報告する。' },
            { speaker: 'yuki', japanese: '「なぜエレベーターにお辞儀するの」って聞かれて固まった。', mood: 'defeated' },
            { speaker: 'aya', japanese: 'あー、日本を説明するの難しいよね。直訳すると変になるし。', english: 'Yeah, explaining Japan is hard. The literal translation never works.', mood: 'normal' },
            { speaker: 'rina', japanese: 'お辞儀って英語でbowですよね。でもbowだけじゃ伝わらない。あれ、挨拶というか、存在を認めてるというか...', english: 'Bow is the word, but it does not capture it. It is more like... acknowledging someone is there.', mood: 'thinking' },
            { speaker: 'yuki', japanese: 'それ！日本語では「〜という概念がある」って言いたいのに英語で出てこない。', english: 'That! In Japanese, we have this concept of... but I could not find the English.', mood: 'normal' },
            { speaker: 'aya', japanese: '一般的には、お辞儀は「リスペクト」で説明されるけど、それだけじゃないんだよね。', english: 'Generally, bowing is explained as respect. But that is an oversimplification.', mood: 'thinking' },
            { speaker: 'rina', japanese: '外国人にはわかりにくいかもだけど、日本人って「場」を大事にするんですよね。エレベーターも一つの「場」。', english: 'This is probably one of those things that does not make sense unless you have lived here. Japanese people value shared spaces. Even an elevator is a shared space.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'ざっくり言うと、「同じ空間にいる人への敬意」ってことかな。', english: 'To put it simply, it is about showing respect to people sharing the same space.', mood: 'thinking' },
            { speaker: 'aya', japanese: 'それは誤解されがちだけど、お辞儀は服従じゃないんだよね。実はそうじゃなくて、対等な関係でもする。', english: 'That is actually a common misconception. Bowing is not submission. It is actually the other way around -- equals do it too.', mood: 'normal' },
            { speaker: 'rina', japanese: '例外もありますよ。若い人はエレベーターでお辞儀しない人も増えてる。変わりつつあるってことですよね。', english: 'There are exceptions, though. Younger people are starting to skip it. Things are shifting.', mood: 'normal' },
            { speaker: 'yuki', japanese: '個人差もあるし。私の弟なんか絶対しない。', english: 'It depends on the person too. My younger brother never does it.', mood: 'normal' },
            { speaker: 'aya', japanese: '歴史的に言えば、武士の時代から続いてる文化だけど、形はどんどん変わってる。', english: 'If you go back in history, it dates from the samurai era, but the form has evolved a lot.', mood: 'normal' },
            { speaker: 'yuki', japanese: '...今の会話、全部英語で言えたら完璧だったのに。', mood: 'defeated' },
            { speaker: 'rina', japanese: 'でもユキさん、今「to put it simply」って言いましたよね。それ、先週言えなかった表現じゃないですか？', mood: 'excited' },
            { speaker: 'yuki', japanese: '...あ。本当だ。', mood: 'thinking' },
            { speaker: 'aya', japanese: '来週マークに聞かれたら、今日の練習をそのまま言えばいいよ。準備してると全然違うから。', english: 'Next time Mark asks, just say what you practiced today. Preparation makes all the difference.', mood: 'normal' },
            { speaker: 'yuki', japanese: '日本を説明するのが怖かったけど、説明できないのがもっと悔しい。', mood: 'normal' },
            { speaker: 'narration', japanese: 'ユキのスマホにメモが増えていく。「日本を英語で説明するフレーズ集」。3ページ目に突入。' },
        ],
    },

    // ────────────────────────────────────────────────────────
    // WEEK 3: 仕事で使う英語 (Professional English)
    // クライアントが来社。教科書英語と現実の差にユキが気づく
    // ────────────────────────────────────────────────────────
    {
        weekSlot: 3,
        title: '仕事で使う英語',
        titleEn: 'Professional English',
        scene: '月曜朝。ユキの会社に海外クライアントのマークが正式会議で来社。ユキが通訳補助として同席。夜、カフェで振り返り。',
        story: [
            { speaker: 'narration', japanese: '会議室。ユキが資料を並べている。手が微かに震えている。' },
            { speaker: 'yuki', japanese: '（大丈夫。確認させてください、期限はいつですか、結果を共有します。この3つだけ覚えとけば...）', mood: 'thinking', action: '手帳を何度も見直す' },
            { speaker: 'client', japanese: 'Good morning, everyone. Thanks for making time for this.', english: 'Good morning, everyone. Thanks for making time for this.', mood: 'normal', action: '笑顔で入室' },
            { speaker: 'yuki', japanese: 'Good morning. お時間いただきありがとうございます。', english: 'Good morning. Thank you for your time.', mood: 'normal' },
            { speaker: 'client', japanese: 'So, I want to walk you through the next steps from our end. First, the timeline.', english: 'So, I want to walk you through the next steps from our end. First, the timeline.', mood: 'normal' },
            { speaker: 'yuki', japanese: '（"walk you through"... 教科書で見たことない。"explain"とは違うの？）', mood: 'thinking' },
            { speaker: 'client', japanese: 'The deadline is June 15th. Can we make that work?', english: 'The deadline is June 15th. Can we make that work?', mood: 'normal' },
            { speaker: 'yuki', japanese: '確認させてください。6月15日...ですね。スケジュール調整が必要かもしれません。', english: 'Let me double check. June 15th. We might need to adjust the timeline on our end.', mood: 'normal' },
            { speaker: 'client', japanese: 'Sure, I totally understand. What would work better for your team?', english: 'Sure, I totally understand. What would work better for your team?', mood: 'normal' },
            { speaker: 'yuki', japanese: '（え...こっちの都合を聞いてくれるの？日本の会議だったら一方的に決まるのに）', mood: 'thinking' },
            { speaker: 'yuki', japanese: '担当者に確認して、明日までにご連絡します。', english: 'Let me check with our team lead and I will get back to you by tomorrow.', mood: 'normal' },
            { speaker: 'client', japanese: 'Perfect. And hey, any feedback on the proposal? Do not hold back, I really want to get this right.', english: 'Perfect. And hey, any feedback on the proposal? Do not hold back, I really want to get this right.', mood: 'normal' },
            { speaker: 'yuki', japanese: '（"do not hold back"...遠慮するなってこと？ ビジネスの場で？）', mood: 'thinking' },
            { speaker: 'yuki', japanese: '改善の余地がある部分もあると思います。資料をお送りしますので...', english: 'I think there is room for improvement in a few areas. I will put my notes together and send them over.', mood: 'normal' },
            { speaker: 'client', japanese: 'I appreciate that. Honestly, the more honest the better. I would rather fix things now than scramble later.', english: 'I appreciate that. Honestly, the more honest the better. I would rather fix things now than scramble later.', mood: 'normal' },
            { speaker: 'narration', japanese: 'その夜。カフェ。ユキがアイスラテを飲みながら興奮している。' },
            { speaker: 'yuki', japanese: '今日気づいたんだけど、ビジネス英語って教科書と全然違う。', mood: 'excited' },
            { speaker: 'aya', japanese: 'どういうこと？', mood: 'normal' },
            { speaker: 'yuki', japanese: '教科書は"I would like to confirm"とか堅い表現ばっかり。でもマークは"Let me double check"とか"shoot it over"とか使うの。', english: 'Textbooks teach "I would like to confirm." But Mark says "let me double check" and "shoot it over." Real people talk like people.', mood: 'excited' },
            { speaker: 'rina', japanese: 'カフェのお客さんもそうですよ。教科書の英語で注文する外国人、見たことないです。', mood: 'normal' },
            { speaker: 'aya', japanese: '前向きに考えますって英語で言いたいとき、"I will consider it positively"って言ってない？', mood: 'smug' },
            { speaker: 'yuki', japanese: '言ってた。', mood: 'defeated' },
            { speaker: 'aya', japanese: '"I am leaning towards yes"のほうが百倍自然。そして百倍伝わる。', english: '"I am leaning towards yes" is a hundred times more natural. And a hundred times clearer.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'あとね、「検討します」って言ったら、マークに"So that is a yes?"って聞き返された。日本語の「検討します」と英語の"I will think about it"は重さが違う。', mood: 'thinking' },
            { speaker: 'rina', japanese: '日本語の「検討します」は「NO」ですよね。英語だと本当に考えてもらえると期待される。', mood: 'normal' },
            { speaker: 'yuki', japanese: '優先順位つけると、まず「教科書英語を捨てる」が一番大事。結果を共有するね、来週の会議で使う表現リスト作るから。', english: 'If I had to prioritize -- the first thing is to ditch textbook English. I will keep you posted. I am making a list of real expressions for next week.', mood: 'normal' },
            { speaker: 'narration', japanese: 'ユキの手帳に赤ペンで書かれた文字。「教科書を捨てろ」。下に小さく「でもまだ捨てない。もうちょっと読む」。' },
        ],
    },

    // ────────────────────────────────────────────────────────
    // WEEK 4: 賛成と反対 (Agreeing and Disagreeing)
    // 居酒屋で「AIは仕事を奪うか」の大議論
    // ────────────────────────────────────────────────────────
    {
        weekSlot: 4,
        title: '賛成と反対',
        titleEn: 'Agreeing and Disagreeing',
        scene: '金曜夜。居酒屋「暖簾」。ユキ、アヤ、リナが権藤マスターの店で飲んでいる。AIの話題で白熱。',
        story: [
            { speaker: 'narration', japanese: '居酒屋「暖簾」。カウンターに3人が並んでいる。枝豆とビール。テレビでAIのニュースが流れている。' },
            { speaker: 'rina', japanese: 'また「AIに仕事を奪われる」って。毎日このニュースやってません？', mood: 'normal', action: 'テレビを指差す' },
            { speaker: 'aya', japanese: 'その通り、奪われると思う。正直に言うと。', english: 'Honestly? Yes. I think jobs will be taken.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'それはちょっと違うと思う。全部は奪われないでしょ。', english: 'I do not think that is quite right. Not ALL jobs.', mood: 'normal' },
            { speaker: 'aya', japanese: '根拠は？', english: 'Based on what?', mood: 'normal' },
            { speaker: 'yuki', japanese: '...感覚的に。', mood: 'defeated' },
            { speaker: 'master', japanese: '感情論じゃなくてデータで話せ。', english: 'Separate feelings from facts.', mood: 'normal', action: 'グラスを拭きながら' },
            { speaker: 'yuki', japanese: 'うっ。...じゃあデータを見ると、産業革命のときも「機械に仕事を奪われる」って言われたけど、新しい仕事が生まれた。', english: 'OK, if you look at the data -- the Industrial Revolution. People said machines would take all jobs. New jobs were created instead.', mood: 'thinking' },
            { speaker: 'aya', japanese: '一部は賛成。でも今回は違うと思う。AIは「考える仕事」も奪うから。', english: 'I partly agree. But this time is different. AI takes thinking jobs too.', mood: 'normal' },
            { speaker: 'rina', japanese: '仮にAIがバリスタの仕事を奪うとしたら...いや、それは嫌だな。', english: 'Hypothetically, if AI replaced baristas... actually, no. I do not like that thought.', mood: 'thinking' },
            { speaker: 'master', japanese: '極端な話、この店も全部ロボットにすればいい。料理もロボット、接客もロボット。', english: 'To take it to the extreme, this whole place could be robots. Robot cooking, robot service.', mood: 'smug' },
            { speaker: 'yuki', japanese: '嫌ですよそれは！マスターの唐揚げはマスターが作るから美味しいんでしょ！', mood: 'angry' },
            { speaker: 'master', japanese: '今のが「感情論」だ。', mood: 'smug' },
            { speaker: 'yuki', japanese: '...ぐっ。', mood: 'defeated' },
            { speaker: 'aya', japanese: '現実問題として、翻訳とかライティングはもうAIでかなりいける。', english: 'Realistically, translation and writing are already pretty doable with AI.', mood: 'normal' },
            { speaker: 'yuki', japanese: '理想はそうだけど...人間にしかできないことってあるでしょ。', english: 'In a perfect world, sure. But there are things only humans can do.', mood: 'thinking' },
            { speaker: 'rina', japanese: 'そもそも「仕事を奪う」って表現がおかしくないですか？仕事は変わるだけで、なくならない。', english: 'Can I take a step back here? "Taking jobs" is the wrong framing. Jobs change. They do not disappear.', mood: 'normal' },
            { speaker: 'master', japanese: '話をすり替えるな。「奪う」か「変わる」かが論点だろう。', english: 'Do not move the goalposts. Whether it is taken or changed -- that is the question.', mood: 'normal' },
            { speaker: 'rina', japanese: '...マスター厳しい。', mood: 'defeated' },
            { speaker: 'aya', japanese: '結局のところ、AIが仕事を奪うかどうかは誰にもわからない。でもそれを英語で議論できるかどうかは、今決められる。', english: 'At the end of the day, nobody knows if AI will take our jobs. But whether we can discuss it in English -- that is something we can decide right now.', mood: 'normal' },
            { speaker: 'yuki', japanese: '...今の、めちゃくちゃいい締めだった。', mood: 'excited' },
            { speaker: 'master', japanese: '両方正しいかもしれんし、両方間違ってるかもしれん。答えは出なくていい。議論すること自体に意味がある。', english: 'Maybe you are both right. Maybe you are both wrong. You do not need an answer. The conversation itself matters.', mood: 'normal', action: 'ビールを注ぎ足す' },
            { speaker: 'rina', japanese: '答えは出ないかもしれないけど、マスターの唐揚げが美味しいのだけは事実ですよね。', mood: 'excited' },
            { speaker: 'master', japanese: '...それは感情論じゃなくてデータだ。', mood: 'smug' },
            { speaker: 'yuki', japanese: '何のデータ？', mood: 'normal' },
            { speaker: 'master', japanese: '37年分の売上だ。', mood: 'smug' },
            { speaker: 'narration', japanese: '笑い声と唐揚げの音。居酒屋「暖簾」の金曜夜は、英語と日本語が混ざりながら更けていく。' },
        ],
    },
];
