// Month 11 Week 43: 人生の節目 / Life Milestones
// Days 315-321, 70 expressions total

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// Day 315: 卒業と入学 (Graduation & Enrollment)
// ============================================================

const day315: MasterExpression[] = [
  {
    daySlot: 315,
    japanese: '卒業おめでとう',
    english: [
      'Congratulations on graduating',
      'You made it through -- congrats on graduating',
      'Hey, congratulations on graduating! That is a huge deal, seriously.',
      'In Japanese you just say "sotsugyou omedetou" and it covers everything. In English, people love to pile on extra words like "I am so proud of you" or "you did it" to really drive the celebration home. The bare "congratulations" sometimes feels too short, so we add context to match the warmth.',
    ],
    context: '日本語は「おめでとう」一言で十分温かいけど、英語はそこに「proud of you」とか足さないとそっけなく聞こえる。逆に足しすぎると大袈裟に。このバランスが難しい。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 315,
    japanese: '入学式っていつ？',
    english: [
      'When is the ceremony?',
      'When is the entrance ceremony?',
      'Do you know when the entrance ceremony is? I want to make sure I can be there.',
      'English-speaking countries do not really have "entrance ceremonies" the way Japan does. The concept of nyuugakushiki is pretty unique. In the US or UK, you just show up on the first day. So when you translate this, you often have to explain the cultural context too.',
    ],
    context: '「入学式」は日本独特の文化。英語圏では入学式自体がないから、"entrance ceremony"と言っても「何それ？」ってなる。orientation dayが近いけど、あの厳かな感じとは全然違う。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 315,
    japanese: '卒業したら何するの？',
    english: [
      'What will you do after?',
      'What are your plans after graduation?',
      'So what are you planning to do after you graduate? Do you have anything lined up yet?',
      'In Japanese, "sotsugyou shitara" is a simple conditional. In English, we tend to ask about "plans" specifically, which puts a bit more pressure on the person to have a concrete answer. The casual way to soften it is adding "anything lined up yet" so it does not sound like an interrogation.',
    ],
    context: '「卒業したら何するの？」は日本語だと軽い質問だけど、英語で"What are your plans?"って聞くと妙にプレッシャーかかる。"any ideas?"くらいに柔らかくするのがコツ。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 315,
    japanese: '学生生活が懐かしい',
    english: [
      'I miss school days',
      'I really miss my school days',
      'Man, I really miss my school days. Everything was so much simpler back then.',
      'Japanese uses "natsukashii" which is this beautiful one-word feeling of warm nostalgia. English does not have a single word for that. You have to build it with "I miss" plus some extra sentiment like "those were the days" or "simpler times" to capture that same bittersweet warmth.',
    ],
    context: '「懐かしい」は英語に直訳できない日本語の代表格。"nostalgic"はちょっと堅いし、"I miss it"だけだと寂しさが強すぎる。組み合わせて初めてあの温かい感じが出る。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 315,
    japanese: '第二ボタンもらった？',
    english: [
      'Did you get a button?',
      'Did anyone give you their second button?',
      'Did anyone give you their second button from their uniform? That is such a sweet tradition.',
      'The second button tradition is completely Japanese. In English, there is no equivalent at all. If you try to explain it, you have to set up the whole context: school uniforms, the button closest to the heart, giving it to someone you like. It is one of those cultural things that needs a mini-explanation every time.',
    ],
    context: '第二ボタン文化は完全に日本オリジナル。英語で説明しようとすると「制服のボタンを好きな人にあげる」って全部説明しないと意味不明。文化の壁が厚い表現の典型。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 315,
    japanese: '答辞を読むことになった',
    english: [
      'I am giving the speech',
      'I got picked to give the farewell speech',
      'They picked me to give the farewell speech at graduation. I am so nervous about it.',
      'Japanese graduation has a specific format with "touji" -- a formal reply speech from a graduating student. English graduations have valedictorian speeches or commencement addresses, but the structure is totally different. The cultural weight of standing up in front of everyone and formally thanking the school is very Japanese.',
    ],
    context: '「答辞」は卒業式の形式的なスピーチ。英語の"valedictorian speech"は成績トップが読むもので、日本の答辞とは選ばれ方も内容も違う。近いけど別物。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 315,
    japanese: '卒アルにメッセージ書いて',
    english: [
      'Sign my yearbook',
      'Can you sign my yearbook?',
      'Hey, can you sign my yearbook? Write something I will actually want to read in ten years.',
      'Yearbook signing is one area where Japanese and English cultures actually overlap. Both countries do it. But in Japan, the "sotsuaru" messages tend to be more heartfelt and longer, while American yearbook signings are often quick jokes like "have a great summer" or "stay cool." The depth of emotion is different.',
    ],
    context: '卒アルのメッセージ文化は日米共通だけど、日本人は長めに真面目に書く。アメリカ人は"HAGS (Have A Great Summer)"みたいに超短くて軽い。温度差がすごい。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 315,
    japanese: '受験勉強がやっと終わった',
    english: [
      'Exams are finally over',
      'I am finally done with entrance exams',
      'I am finally done with all the entrance exam studying. I feel like I got my life back.',
      'Japan has "juken benkyou" as this massive life event that consumes months or years. In English-speaking countries, college applications involve tests like the SAT, but the cultural intensity is completely different. Japanese entrance exams feel like a war. The relief when it ends is hard to convey without that shared context.',
    ],
    context: '「受験勉強」の重さは日本特有。SATやACTはあるけど、日本の受験戦争ほどの精神的プレッシャーは英語圏にはない。"entrance exam hell"くらい言わないと伝わらない。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 315,
    japanese: '大学デビューするぞ',
    english: [
      'I will reinvent myself',
      'I am going to reinvent myself in college',
      'I am going to totally reinvent myself when I start college. New look, new attitude, everything.',
      'The concept of "daigaku debut" -- transforming yourself when you enter university -- is a very Japanese idea with its own word. English does not have a single term for it. You would say "reinvent myself" or "start fresh" but those lack the specific nuance of deliberately changing your image at a life transition point.',
    ],
    context: '「大学デビュー」は和製概念。英語で"college debut"と言っても通じない。"reinvent myself"が近いけど、あのちょっとイタい感じのニュアンスまでは伝わらない。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 315,
    japanese: 'やっと制服から解放される',
    english: [
      'No more uniforms',
      'I am finally free from uniforms',
      'I am finally free from wearing a uniform every single day. I can wear whatever I want now.',
      'Most American and British students do not wear uniforms, so "freedom from uniforms" does not resonate the same way. In Japan, the uniform is such a core part of student identity that taking it off feels like shedding a skin. The emotional weight behind this simple statement is way heavier in Japanese.',
    ],
    context: '制服文化は日本の学校の象徴。英語圏の多くの学校は私服だから、「制服から解放」の開放感が共感されにくい。文化的背景を足さないと「so what?」で終わる。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
];

const day315Keywords: KeyWord[] = [
  { en: 'graduation', ja: '卒業', pron: 'graj-oo-AY-shun', example: 'My graduation is next Friday.', note: 'commencement is the formal word but graduation is what everyone says' },
  { en: 'enrollment', ja: '入学', pron: 'en-ROHL-ment', example: 'Enrollment starts in April.', note: 'in English this is more of an administrative process than a ceremony' },
  { en: 'yearbook', ja: '卒業アルバム', pron: 'YEER-book', example: 'Sign my yearbook before you leave.', note: 'a book with photos of all students, very American tradition' },
  { en: 'valedictorian', ja: '総代・答辞を読む人', pron: 'val-eh-dik-TOR-ee-un', example: 'She was the valedictorian of her class.', note: 'the top student who gives a speech at graduation' },
  { en: 'reinvent', ja: '生まれ変わる・イメチェンする', pron: 'ree-in-VENT', example: 'College is a chance to reinvent yourself.', note: 'stronger than just "change" -- implies a complete transformation' },
];

// ============================================================
// Day 316: 就職と退職 (Getting Hired & Quitting)
// ============================================================

const day316: MasterExpression[] = [
  {
    daySlot: 316,
    japanese: '内定もらった',
    english: [
      'I got a job offer',
      'I got a job offer! Finally!',
      'Guess what -- I got a job offer! After all those interviews, I finally landed one.',
      'Japanese "naitei" is a pre-graduation informal job offer, which is a whole system unique to Japan. English just says "job offer" but that lacks the context of the shuukatsu process where companies recruit students a year before graduation. The timing and cultural weight are completely different.',
    ],
    context: '「内定」は日本の就活システムの産物。英語の"job offer"にはあの「まだ正式じゃないけどほぼ確定」という独特のステータスがない。一発で決まる感じになっちゃう。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 316,
    japanese: '今日で最終出社です',
    english: [
      'Today is my last day',
      'Today is my last day at the office',
      'So today is actually my last day at the office. It has been a great run working with everyone.',
      'In Japanese, "saishuu shussha" specifically means your final day of physically coming to the office, which might be different from your official resignation date. English does not distinguish between your last working day and your last day in the office. You just say "last day" and it covers everything.',
    ],
    context: '「最終出社日」と「退職日」が違うのは日本の有給消化文化。英語では"last day"で全部まとめちゃう。有給を退職前にまとめて使う概念自体が英語圏では珍しい。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 316,
    japanese: '会社辞めようと思ってる',
    english: [
      'I am thinking of quitting',
      'I have been thinking about quitting my job',
      'I have been seriously thinking about quitting my job. It is just not what I want to do anymore.',
      'In Japanese, "kaisha yameyou to omotteru" uses the volitional form plus "thinking" which creates a soft buffer. English "thinking about quitting" works similarly, but the weight is different. In Japan, quitting is a bigger deal culturally because of lifetime employment expectations, so this statement carries more gravity.',
    ],
    context: '日本では「会社を辞める」がまだ重大決断。英語圏では転職が普通だから"thinking about quitting"はそこまで重くない。同じ言葉でも文化的な重力が違う。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 316,
    japanese: '退職届出してきた',
    english: [
      'I turned in my resignation',
      'I just handed in my resignation letter',
      'I just went ahead and handed in my resignation letter. There is no turning back now.',
      'Japanese has "taishoku todoke" as a formal document you submit. In many English-speaking workplaces, a resignation can be as simple as an email or a conversation with your manager. The formality level is different. But the finality -- that feeling of "it is done" -- is universal.',
    ],
    context: '「退職届」は紙の書類を上司に出すイメージ。英語圏ではメール一本で辞められることも多い。形式の重さが全然違うけど、「もう後戻りできない」感覚は同じ。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 316,
    japanese: '送別会いつやる？',
    english: [
      'When is the farewell party?',
      'When are we doing the farewell party?',
      'When are we throwing the farewell party? We should do it before their last day for sure.',
      'Japanese "soubetsukai" is a structured workplace tradition with speeches and gifts. In English, a "farewell party" or "going-away party" exists but tends to be more casual -- maybe drinks after work. The level of ceremony and obligation to attend is much higher in Japanese work culture.',
    ],
    context: '「送別会」は日本の職場文化の定番行事。英語の"farewell party"は存在するけど、幹事が花束用意してスピーチして二次会行って...みたいな儀式感はない。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 316,
    japanese: '就活がしんどい',
    english: [
      'Job hunting is exhausting',
      'Job hunting is really wearing me down',
      'Job hunting is really wearing me down. The endless applications and interviews are draining all my energy.',
      'Japanese "shuukatsu" is a uniquely intense process where everyone job-hunts at the same time in matching black suits. English "job hunting" does not carry that same image of a synchronized, high-pressure ritual. The individual struggle is similar, but the collective experience is very different.',
    ],
    context: '「就活」の地獄感は日本独特。全員同じリクルートスーツで一斉に動く異様さ。英語の"job hunting"にはあの画一的なプレッシャーがない。個人戦と団体戦の違い。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 316,
    japanese: 'ブラック企業だったわ',
    english: [
      'It was a terrible company',
      'That place was a total sweatshop',
      'That place was a total sweatshop. Unpaid overtime every day, no holidays, the whole deal.',
      'The term "burakku kigyou" literally translates as "black company" but you absolutely cannot say that in English. The racial connotations make it a no-go. Instead, you say "sweatshop," "toxic workplace," or "exploitative company." This is a major translation trap that catches a lot of Japanese speakers.',
    ],
    context: '「ブラック企業」は絶対に"black company"と訳してはダメ。英語では人種的な意味に取られる。"toxic workplace"や"sweatshop"を使う。和製英語の危険な罠。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 316,
    japanese: '引き継ぎが大変',
    english: [
      'The handover is tough',
      'The handover process is a real pain',
      'The handover process is a real pain. I have to document everything I have been doing for the past three years.',
      'Japanese workplaces take "hikitsugi" very seriously -- it is an elaborate process of transferring all knowledge to your successor. In English-speaking workplaces, a "handover" exists but is often much less thorough. Sometimes people just leave and the next person figures it out.',
    ],
    context: '「引き継ぎ」の丁寧さは日本の美徳。英語圏では引き継ぎなしで辞める人も多い。マニュアル作って後任に教えて...という文化は日本が圧倒的に手厚い。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 316,
    japanese: '円満退社できた',
    english: [
      'I left on good terms',
      'I managed to leave on good terms',
      'I managed to leave on good terms with everyone. No drama, no hard feelings, just a clean exit.',
      'Japanese "enman taisha" has this specific image of leaving peacefully with everyone smiling and bowing. English "leaving on good terms" is close but less poetic. The Japanese version almost sounds like a Buddhist concept of harmony, while the English is more practical and transactional.',
    ],
    context: '「円満退社」には和の精神が詰まってる。英語の"left on good terms"はもっとドライ。日本語の方が「みんな笑顔で見送ってくれた」的な温かいイメージがある。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 316,
    japanese: '転職先決まった？',
    english: [
      'Found a new job yet?',
      'Have you found your next job yet?',
      'Have you found your next job yet? Or are you going to take some time off first?',
      'In Japanese culture, asking "tenshoku saki kimatta?" is natural concern. In English, asking someone if they have found a new job can feel nosy or pushy depending on how close you are. The social rules around this question are different -- in English, you soften it more.',
    ],
    context: '「転職先決まった？」は日本語だと心配の表現。英語で同じことを聞くとおせっかいに聞こえることがある。距離感の取り方が違うから、"if you do not mind me asking"を足す場合も。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
];

const day316Keywords: KeyWord[] = [
  { en: 'resignation', ja: '辞職・退職届', pron: 'rez-ig-NAY-shun', example: 'She submitted her resignation last Monday.', note: 'formal word; casual is just "I quit"' },
  { en: 'handover', ja: '引き継ぎ', pron: 'HAND-oh-ver', example: 'The handover took two whole weeks.', note: 'also called "transition" in some workplaces' },
  { en: 'farewell', ja: '送別・別れ', pron: 'fair-WELL', example: 'We threw a farewell party for the boss.', note: 'slightly formal but commonly used for workplace goodbyes' },
  { en: 'sweatshop', ja: 'ブラック企業', pron: 'SWET-shop', example: 'That startup turned out to be a total sweatshop.', note: 'originally meant a factory with terrible conditions; now used more broadly' },
  { en: 'land (a job)', ja: '(仕事を)つかむ・決める', pron: 'LAND', example: 'He landed a great position at a tech company.', note: 'casual and positive -- implies success after effort' },
];

// ============================================================
// Day 317: 結婚 (Marriage)
// ============================================================

const day317: MasterExpression[] = [
  {
    daySlot: 317,
    japanese: 'プロポーズされた',
    english: [
      'He proposed to me',
      'He actually proposed! I said yes!',
      'Oh my god, he actually proposed to me last night. I could not believe it. I said yes right away.',
      'In Japanese, "puropoozu sareta" uses passive form which is natural. In English, "I was proposed to" sounds awkward -- people prefer the active "he proposed to me." Also, English speakers almost always immediately add whether they said yes or no, because leaving that out creates unbearable suspense.',
    ],
    context: '日本語は受身形「プロポーズされた」が自然だけど、英語では能動態"he proposed to me"の方が自然。あと英語では「で、何て答えたの？」が即座に来るから、返事もセットで言うのが普通。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 317,
    japanese: '入籍しました',
    english: [
      'We registered our marriage',
      'We officially registered our marriage today',
      'We officially registered our marriage today. No big ceremony or anything -- just the paperwork for now.',
      'Japanese "nyuuseki" -- registering at city hall -- has no clean English equivalent. In English-speaking countries, you need an officiant and witnesses; you cannot just submit paperwork. So "we registered our marriage" works but misses the Japanese simplicity of just walking into city hall with a form.',
    ],
    context: '「入籍」は婚姻届を出すだけで成立する日本のシステム。英語圏では牧師や判事の前で宣誓が必要。紙一枚で完了する日本の手軽さは英語では説明しづらい。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 317,
    japanese: 'ご祝儀いくら包む？',
    english: [
      'How much should we give?',
      'How much should we put in the gift envelope?',
      'How much money should we put in the gift envelope for the wedding? Is thirty thousand yen the standard?',
      'The "goshuugi" system -- cash gifts in special envelopes with specific amounts based on your relationship -- is uniquely Japanese. In English-speaking countries, wedding gifts are usually items from a registry. Explaining the entire cash-in-a-fancy-envelope protocol requires a lot of cultural context.',
    ],
    context: '「ご祝儀」文化は日本独特。英語圏の結婚祝いはレジストリ（欲しいものリスト）から物を贈る。3万円・5万円・奇数ルールとか、祝儀袋のマナーとか、全部説明が必要。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 317,
    japanese: '結婚式の二次会来る？',
    english: [
      'Coming to the after-party?',
      'Are you coming to the wedding after-party?',
      'Are you coming to the wedding after-party? It is going to be way more relaxed than the ceremony.',
      'Japanese weddings have a structured "nijikai" -- a semi-formal after-party with games and speeches. English-speaking wedding receptions already include the party element, so there is usually no separate after-party. When there is one, it is just "drinks after" with no structure.',
    ],
    context: '「二次会」は日本の結婚式文化のユニークな部分。英語圏ではレセプション自体がパーティだから、別途二次会をやる習慣がない。"after-party"が近いけど、あのビンゴや余興の感じはない。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 317,
    japanese: 'バージンロード歩くの緊張する',
    english: [
      'Walking down the aisle is scary',
      'I am so nervous about walking down the aisle',
      'I am so nervous about walking down the aisle. Everyone is going to be staring at me the whole time.',
      'Japanese uses "baajin roodo" which is actually Japanese-English that does not work in real English. You never say "virgin road" -- it is always "walking down the aisle." This is a classic wasei-eigo trap. If you said "virgin road" to an English speaker, they would have absolutely no idea what you meant.',
    ],
    context: '「バージンロード」は和製英語の代表格。英語では"aisle"（通路）としか言わない。"virgin road"と言ったら100%通じない。"walk down the aisle"で結婚式のイメージが伝わる。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 317,
    japanese: '婚約指輪見せて',
    english: [
      'Show me the ring',
      'Let me see the engagement ring!',
      'Let me see the engagement ring! I have been dying to see it ever since you told me the news.',
      'When someone gets engaged in English-speaking culture, the first thing people want to see is the ring. It is almost a reflex. In Japan, the ring matters too, but the conversation often goes to the proposal story first. In English, ring first, story second -- it is just how the excitement flows.',
    ],
    context: '英語圏では婚約の報告を受けたら、まず指輪を見たがる。"Show me the ring!"は定番リアクション。日本では「どうやってプロポーズされたの？」が先に来ることが多い。優先順位が逆。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 317,
    japanese: 'ウェディングハイになってる',
    english: [
      'She is on a wedding high',
      'She is totally caught up in wedding fever',
      'She is totally caught up in wedding fever right now. Every conversation somehow circles back to flowers or seating charts.',
      'Japanese "uedingu hai" is borrowed English but "wedding high" is not a natural English phrase. English speakers say "wedding fever" or "bridezilla mode" or "obsessed with wedding planning." The Japanese katakana version sounds like it should work, but it does not.',
    ],
    context: '「ウェディングハイ」は和製英語っぽい表現。英語では"wedding fever"や"bridezilla"が近い。"wedding high"でもギリ通じるけど、自然な英語ではない。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 317,
    japanese: '授かり婚でした',
    english: [
      'It was a shotgun wedding',
      'It was actually a shotgun wedding',
      'It was actually what you call a shotgun wedding -- the baby came first, then the wedding. But we are happy.',
      'Japanese recently shifted from "dekichatta kekkon" to the softer "sazukari kon" (blessed marriage). English has "shotgun wedding" which has a humorous but slightly negative tone. Neither language treats this neutrally, but they spin it in different directions.',
    ],
    context: '「授かり婚」は「できちゃった婚」をポジティブに言い換えた表現。英語の"shotgun wedding"はユーモラスだけどちょっとネガティブ。言い換えの方向性が日英で違うのが面白い。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 317,
    japanese: '末永くお幸せに',
    english: [
      'Wishing you happiness',
      'Wishing you a lifetime of happiness',
      'I am wishing you both a lifetime of happiness together. You two really are perfect for each other.',
      'Japanese "suenagaku oshiawase ni" is a set phrase everyone uses at weddings. English does not have one single go-to phrase -- people say various things like "best wishes," "congratulations," "wishing you all the best." The Japanese version is more formulaic and universally used.',
    ],
    context: '「末永くお幸せに」は結婚式の定型句。英語には同じレベルの「これ言っとけば間違いない」フレーズがない。"Best wishes"が近いけど、あの日本語の格式と温かさの両立は難しい。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 317,
    japanese: '式は挙げないことにした',
    english: [
      'We decided to skip the ceremony',
      'We decided not to have a wedding ceremony',
      'We decided not to have a big wedding ceremony. We would rather just save the money and go on a nice trip instead.',
      'In Japan, "shiki wo agenai" is becoming more common but still gets strong reactions from family. In English-speaking countries, skipping a formal wedding is more accepted -- courthouse weddings or elopements are totally normal. The social pressure around this decision is very different.',
    ],
    context: '「式は挙げない」を日本で言うと親世代からの圧がすごい。英語圏ではelopement（駆け落ち婚）も含めてカジュアル婚が普通に受け入れられてる。社会の空気が違う。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
];

const day317Keywords: KeyWord[] = [
  { en: 'propose', ja: 'プロポーズする', pron: 'pruh-POHZ', example: 'He proposed at the top of the Eiffel Tower.', note: 'always "propose to someone" -- never just "propose someone"' },
  { en: 'aisle', ja: '（教会の）通路・バージンロード', pron: 'AYL (silent s)', example: 'Her father walked her down the aisle.', note: 'the "s" is silent -- sounds exactly like "I will"' },
  { en: 'registry', ja: '結婚祝いの欲しいものリスト', pron: 'REJ-ih-stree', example: 'Did you check their wedding registry yet?', note: 'a list of gifts the couple wants -- guests pick from it' },
  { en: 'elope', ja: '駆け落ちする・二人だけで結婚する', pron: 'ih-LOHP', example: 'They eloped to Vegas last weekend.', note: 'used to mean running away to marry; now just means a small private wedding' },
  { en: 'reception', ja: '披露宴', pron: 'rih-SEP-shun', example: 'The reception was at a beautiful hotel by the lake.', note: 'the party after the ceremony with food, drinks, and dancing' },
];

// ============================================================
// Day 318: 出産と育児 (Birth & Childcare)
// ============================================================

const day318: MasterExpression[] = [
  {
    daySlot: 318,
    japanese: '予定日いつ？',
    english: [
      'When are you due?',
      'When is the baby due?',
      'When is the baby due? You must be getting so excited as the date gets closer.',
      'In Japanese, "yoteibi" is the generic word for any scheduled date. But in English, "when are you due?" is specifically understood as asking about a baby. You would never use "due date" for a business meeting. Context does all the work here.',
    ],
    context: '「予定日」は日本語では汎用的だけど、英語で"When are you due?"と聞いたら100%赤ちゃんの話。仕事の締切は"deadline"。同じ概念が英語では完全に分かれてる。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 318,
    japanese: '無事に生まれました',
    english: [
      'The baby arrived safely',
      'The baby arrived safe and sound',
      'Great news -- the baby arrived safe and sound. Mom and baby are both doing well.',
      'Japanese "buji ni umaremashita" uses passive form and emphasizes safety. English prefers the active and almost poetic "the baby arrived" as if the baby chose to show up. Both express relief, but the framing is different -- Japanese focuses on the safe outcome, English on the arrival event.',
    ],
    context: '日本語は「無事に」を強調するのが定番。英語は"safe and sound"や"healthy"を添えるけど、"arrived"という動詞選びが面白い。赤ちゃんが自分の意志で来たみたいな言い方。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 318,
    japanese: '育休取るの？',
    english: [
      'Taking parental leave?',
      'Are you going to take parental leave?',
      'Are you going to take parental leave? How long are you planning to be off?',
      'In Japan, "ikukyuu" is increasingly encouraged but still carries stigma, especially for men. In English-speaking countries, parental leave policies vary wildly -- the US barely has it, Scandinavia has tons. The cultural conversation around this question is completely different depending on the country.',
    ],
    context: '「育休」は国によって制度が全然違う。日本は制度はあるけど取りづらい空気。アメリカは制度自体が弱い。北欧は当然。同じ質問でも背景にある社会問題が違う。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 318,
    japanese: '夜泣きがひどくて',
    english: [
      'The baby cries all night',
      'The baby has been crying all night every night',
      'The baby has been crying all night every night this week. I am running on like two hours of sleep.',
      'Japanese has the specific word "yonaki" for nighttime baby crying. English does not have a single word for it -- you have to describe it as "the baby cries at night" or "night waking." Having a dedicated word shows how culturally acknowledged this struggle is in Japan.',
    ],
    context: '「夜泣き」という専用語があるのは日本語の便利なところ。英語には一語で表す単語がない。"colic"は近いけど医学用語で、あの「毎晩起こされる地獄」のニュアンスとは違う。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 318,
    japanese: 'イクメンだね',
    english: [
      'What a great dad',
      'He is such a hands-on dad',
      'He is such a hands-on dad. You do not see that enough. It is really great that he is so involved.',
      'The Japanese word "ikumen" was created to praise men who participate in childcare. In English, there is no equivalent because the expectation is that fathers should be involved -- it should not require a special word. Calling someone a "hands-on dad" is a compliment, but making a whole category for it feels unnecessary in English.',
    ],
    context: '「イクメン」は日本で生まれた造語。英語圏では「父親が育児するのは当たり前」だから特別な言葉がない。褒めること自体が「え、普通じゃないの？」となる文化差。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 318,
    japanese: '保育園落ちた',
    english: [
      'We did not get a daycare spot',
      'We got rejected from daycare',
      'We got rejected from daycare again. The waiting list is insane in this area. I do not know what we are going to do.',
      'Japanese "hoikuen ochita" became a viral phrase showing how hard it is to get childcare in Japan. In many English-speaking countries, daycare access is also tough, but the competitive application process and rejection system is more Japanese. In English, you just say you are "on a waiting list."',
    ],
    context: '「保育園落ちた日本死ね」で有名になった保活問題。英語圏でも待機はあるけど、「落ちる」「受かる」という受験用語で語る日本の保育園事情は独特。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 318,
    japanese: 'ワンオペ育児つらい',
    english: [
      'Solo parenting is hard',
      'Doing all the parenting alone is really hard',
      'Doing all the parenting completely on my own is really, really hard. I have no help and I am exhausted every single day.',
      'Japanese "wan-ope ikuji" comes from "one operation" -- like a store run by one person. This term does not exist in English. You would say "solo parenting" or "single-handedly raising kids." The Japanese term uniquely captures the feeling of being abandoned in the task, not just doing it alone.',
    ],
    context: '「ワンオペ育児」は和製英語で英語では通じない。"solo parenting"が近いけど、ワンオペの「本来は二人でやるべきことを一人でやらされてる」という不満のニュアンスがない。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 318,
    japanese: 'お宮参り行ってきた',
    english: [
      'We visited the shrine for the baby',
      'We took the baby to the shrine for the first visit',
      'We took the baby to the shrine for the traditional first visit. The whole family came along and we got some nice photos.',
      'Japanese "omiyamairi" is a Shinto tradition of taking a newborn to a shrine about a month after birth. English has no equivalent cultural practice. Christening or baptism is the closest parallel in Christian cultures, but the religious context and timing are completely different.',
    ],
    context: '「お宮参り」は神道の伝統。英語圏ではchristening（洗礼）が近いけど、宗教的背景が全然違う。「生後1ヶ月で神社に行く」こと自体を一から説明しないといけない。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 318,
    japanese: '性別わかった？',
    english: [
      'Do you know the gender?',
      'Did you find out the gender yet?',
      'Did you find out if it is a boy or a girl yet? Or are you keeping it a surprise?',
      'In English-speaking countries, gender reveal parties have become a huge thing -- some even cause wildfires. In Japan, people ask casually but there is no big production around it. The cultural energy around this question is way more intense in English, especially in the US.',
    ],
    context: '性別を聞くのは日米共通だけど、アメリカのgender reveal partyの派手さは日本にはない。ケーキ切ったり風船割ったり、時には山火事起こしたり。テンションの差がすごい。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 318,
    japanese: '名前もう決めた？',
    english: [
      'Picked a name yet?',
      'Have you picked a name for the baby yet?',
      'Have you decided on a name for the baby yet? I am dying to know what you are going to call them.',
      'In Japan, names are agonized over because of kanji choices and fortunetelling consultants. In English-speaking countries, names matter too, but the process is different -- no stroke counting or meaning analysis of individual characters. The anguish is universal, but the methodology is not.',
    ],
    context: '名前決めの苦悩は万国共通だけど、日本は画数・音・漢字の意味・姓名判断と考慮点が多すぎる。英語圏は響きと家族の伝統が中心。プロセスの複雑さが段違い。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
];

const day318Keywords: KeyWord[] = [
  { en: 'due date', ja: '出産予定日', pron: 'DOO dayt', example: 'Her due date is sometime in March.', note: 'in everyday English, "due date" without context means baby; for assignments say "deadline"' },
  { en: 'parental leave', ja: '育児休暇', pron: 'puh-REN-tul leev', example: 'He is taking three months of parental leave.', note: 'gender-neutral; "maternity leave" and "paternity leave" are the specific versions' },
  { en: 'daycare', ja: '保育園', pron: 'DAY-kair', example: 'We finally got a spot at the daycare near our house.', note: 'also called "nursery" in British English' },
  { en: 'hands-on', ja: '積極的に関わる・実践的な', pron: 'HANDZ-on', example: 'He is a really hands-on father.', note: 'means actively involved, not just present -- implies effort and participation' },
  { en: 'gender reveal', ja: '性別発表', pron: 'JEN-der rih-VEEL', example: 'They threw a gender reveal party last weekend.', note: 'American trend of dramatically announcing baby gender; sometimes controversial' },
];

// ============================================================
// Day 319: 引退 (Retirement)
// ============================================================

const day319: MasterExpression[] = [
  {
    daySlot: 319,
    japanese: '定年まであと何年？',
    english: [
      'How many years until retirement?',
      'How many years do you have until retirement?',
      'How many more years do you have until you can retire? Are you counting down the days yet?',
      'Japanese "teinen" is a fixed mandatory retirement age set by the company. In English-speaking countries, retirement age is more flexible and individual. There is no one-size-fits-all "teinen." So this question in English is more personal and less institutional.',
    ],
    context: '「定年」は会社が決める強制退職年齢。英語の"retirement"は個人の選択。日本は60歳（延長で65歳）が制度的に決まってるけど、英語圏では「いつ辞めるかは自分次第」が基本。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 319,
    japanese: '引退後は何するの？',
    english: [
      'What will you do after retiring?',
      'What are you planning to do after you retire?',
      'So what are you planning to do once you retire? Any big dreams you have been putting off?',
      'This question works the same in both languages, but the expected answers differ. In Japan, common answers involve hobbies, gardening, or travel. In English-speaking countries, people often talk about "passion projects," starting a small business, or volunteering. The retirement dream template is culturally shaped.',
    ],
    context: '引退後の夢は文化で違う。日本は「畑やりたい」「旅行したい」。英語圏は「ビジネス始めたい」「ボランティアしたい」。静の余生vs動の余生。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 319,
    japanese: 'まだまだ現役だよ',
    english: [
      'I am still going strong',
      'I am still going strong, not slowing down yet',
      'I am still going strong. I have got plenty of gas left in the tank. Do not write me off just yet.',
      'Japanese "geneki" means "active duty" or "still in the game." English has "still going strong" or "not ready to hang it up." The Japanese term has a sports or military feel that naturally implies fighting against age, while English versions are more lighthearted.',
    ],
    context: '「現役」は軍隊やスポーツ由来の言葉で、まだ戦えるという力強さがある。英語の"still going strong"はもっとカジュアル。日本語の方が年齢との戦いのニュアンスが強い。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 319,
    japanese: '年金だけじゃ足りない',
    english: [
      'The pension is not enough',
      'My pension alone is not going to cut it',
      'My pension alone is definitely not going to cut it. I need to figure out some other source of income on the side.',
      'Both Japanese and English speakers share this anxiety, but the pension systems are totally different. Japan has a national pension plus company pension. English-speaking countries have social security, 401k, private pensions -- all with different structures. The worry is universal, the systems are not.',
    ],
    context: '年金不安は世界共通だけど、制度が全然違う。日本の国民年金・厚生年金と、アメリカのSocial Security・401kは別物。不安の種類は同じでも、制度知識が必要。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 319,
    japanese: '功労者だよ、あの人は',
    english: [
      'He has done so much for us',
      'That person has contributed so much over the years',
      'That person has contributed so much over the years. The company would not be where it is today without them, honestly.',
      'Japanese "kourousha" is a formal title that gets bestowed on someone. English does not have a single word for it -- you describe the contribution instead. Saying "he is a person of great merit" sounds oddly formal. English prefers showing impact over labeling status.',
    ],
    context: '「功労者」は肩書きとして使える日本語。英語では"person of merit"は堅すぎるし、"hero"は大袈裟。「どれだけ貢献したか」を具体的に言うのが英語流の敬意の示し方。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 319,
    japanese: '第二の人生を楽しんで',
    english: [
      'Enjoy the next chapter',
      'Enjoy the next chapter of your life',
      'I hope you enjoy the next chapter of your life. You have earned every bit of rest and freedom coming your way.',
      'Japanese "daini no jinsei" literally means "second life." English prefers "next chapter" which is more literary and optimistic. "Second life" in English might make people think of the video game. The metaphor is different but the sentiment is identical.',
    ],
    context: '「第二の人生」は日本語だとポジティブだけど、英語で"second life"と言うとゲームを連想する人も。"next chapter"や"new chapter"の方が自然で前向き。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 319,
    japanese: '退職金でかかった？',
    english: [
      'Was the severance good?',
      'Did you get a decent severance package?',
      'Did you end up getting a decent severance package? I have heard some companies are pretty generous with that.',
      'Japanese "taishokukin" is a lump sum payment that most full-time employees receive upon leaving. In English, "severance" often implies being let go, not retiring naturally. The concept of automatically receiving a big payout just for leaving is more standard in Japan than in English-speaking countries.',
    ],
    context: '「退職金」は日本では当然もらえるもの。英語の"severance"はリストラ時に出るイメージが強い。定年退職で自動的にまとまった金が出る日本の制度は英語圏では珍しい。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 319,
    japanese: '引退試合で泣いちゃった',
    english: [
      'I cried at the farewell game',
      'I actually cried at the retirement game',
      'I actually cried at the retirement game. When they played the highlight reel, I totally lost it.',
      'Japanese sports culture has formal "intai jiai" -- farewell games with ceremony. English-speaking sports also honor retiring players, but the term "retirement game" is not as standardized. The emotional display is similar though -- crying at these events is accepted in both cultures.',
    ],
    context: '引退試合の感動は万国共通。でも日本の引退セレモニーの丁寧さ（花束、スピーチ、場内一周）は独特。英語圏も泣く場面はあるけど、形式がもう少しカジュアル。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 319,
    japanese: '早期退職した',
    english: [
      'I took early retirement',
      'I ended up taking early retirement',
      'I ended up taking early retirement. They offered a package and I figured why not -- life is short.',
      'In both Japanese and English, "early retirement" can mean either a personal choice or a corporate push. But in Japanese, "souki taishoku" often implies the company offered a package to reduce staff, while in English it can sound more like a luxury lifestyle choice. The nuance depends heavily on context.',
    ],
    context: '「早期退職」は日本だとリストラの匂いがすることも。英語の"early retirement"はFIRE（経済的自立で早期退職）みたいにポジティブな響きもある。同じ言葉でも印象が違う。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 319,
    japanese: '趣味に生きるわ',
    english: [
      'I will live for my hobbies',
      'I am going to dedicate myself to my hobbies now',
      'From now on, I am going to fully dedicate myself to my hobbies. Golf, fishing, gardening -- the whole deal.',
      'Japanese "shumi ni ikiru" is a common retirement declaration. English does not have a set phrase for this. You would say "pursue my passions" or "finally have time for hobbies." The Japanese version makes it sound like a life philosophy, while English treats it more as filling free time.',
    ],
    context: '「趣味に生きる」は退職後の宣言として格好いい。英語の"pursue my passions"は近いけど、もっと真剣で壮大に聞こえる。日本語のカジュアルな「趣味に生きるわ」の軽さが出にくい。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
];

const day319Keywords: KeyWord[] = [
  { en: 'retire', ja: '引退する・退職する', pron: 'rih-TYRE', example: 'She retired at 62 and moved to the countryside.', note: 'can mean stopping work or stopping a sport career' },
  { en: 'pension', ja: '年金', pron: 'PEN-shun', example: 'His pension barely covers his living expenses.', note: 'regular payment after retirement; different from a lump-sum severance' },
  { en: 'severance', ja: '退職金', pron: 'SEV-er-unce', example: 'They offered a generous severance package.', note: 'in English, often associated with being laid off rather than normal retirement' },
  { en: 'chapter', ja: '（人生の）章', pron: 'CHAP-ter', example: 'Retirement is just the start of a new chapter.', note: 'common metaphor for life phases -- "next chapter" is very natural' },
  { en: 'highlight reel', ja: 'ハイライト映像', pron: 'HYE-lyte reel', example: 'They showed a highlight reel of his entire career.', note: 'a compilation video of best moments; common at retirement or farewell events' },
];

// ============================================================
// Day 320: お葬式 (Funerals)
// ============================================================

const day320: MasterExpression[] = [
  {
    daySlot: 320,
    japanese: 'お悔やみ申し上げます',
    english: [
      'My condolences',
      'Please accept my deepest condolences',
      'I am so sorry for your loss. Please accept my deepest condolences during this difficult time.',
      'Japanese "okuyami moushiagemasu" is THE set phrase for funerals. English has "my condolences" but people more commonly say "I am sorry for your loss." The Japanese version feels more ceremonial, while English tends toward personal warmth. Both are sincere, just different registers.',
    ],
    context: '「お悔やみ申し上げます」は定型句として完璧。英語の"my condolences"は正しいけど堅い。実際は"I am so sorry for your loss"の方がよく使われる。温度感が違う。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 320,
    japanese: '香典いくら包む？',
    english: [
      'How much should we give?',
      'How much money should we bring for the family?',
      'How much money should we bring for the family? I am not sure what the appropriate amount is.',
      'Japanese "kouden" -- monetary offerings in special envelopes at funerals -- is a specific system. In English-speaking cultures, people send flowers, cards, or donations to charity in the deceased person\'s name. The cash-in-envelope system is distinctly Japanese.',
    ],
    context: '「香典」は日本の葬儀文化の核。英語圏では花やチャリティ寄付が一般的で、現金を袋に入れて渡す文化はない。金額の相場やマナーも全部日本独自のルール。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 320,
    japanese: '通夜に行ってくる',
    english: [
      'I am going to the wake',
      'I am heading to the wake tonight',
      'I am heading to the wake tonight. I want to pay my respects before the funeral tomorrow.',
      'Both Japanese "tsuya" and English "wake" refer to a pre-funeral gathering, but the format is different. Japanese wakes are more formal with incense and Buddhist chanting. English-speaking wakes, especially Irish ones, can be quite social with food, drinks, and storytelling about the deceased.',
    ],
    context: '「通夜」と"wake"は似てるようで違う。日本の通夜は厳粛にお焼香。アイルランドのwakeは故人の思い出を語りながら飲む。悲しみの表現の仕方が文化で全然違う。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 320,
    japanese: '喪服どこにしまったっけ',
    english: [
      'Where did I put my black suit?',
      'Where did I put my funeral clothes?',
      'Where on earth did I put my funeral clothes? I know I have a black suit somewhere in the closet.',
      'Japanese has the specific word "mofuku" for funeral attire with strict rules about what is appropriate. In English, you just wear "black" or "dark formal clothes." There is no special category of clothing dedicated to funerals. The dress code exists but there is no single word for the outfit.',
    ],
    context: '「喪服」は専用の服として存在する日本文化。英語では"funeral attire"か単に"something black"。葬式用の服を別に持っておくという概念自体が日本的。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 320,
    japanese: '大往生だったね',
    english: [
      'They lived a full life',
      'At least they lived a long and full life',
      'At least they lived a long and full life. That is something to be grateful for, even though it still hurts.',
      'Japanese "daioujou" specifically means dying peacefully at an old age -- a Buddhist term implying a good death. English does not have a single word for this beautiful concept. "They lived a full life" is the closest, but it misses the acceptance and even celebration that "daioujou" carries.',
    ],
    context: '「大往生」は仏教的な良い死に方の概念。英語にはこれに相当する一語がない。"passed away peacefully at a ripe old age"と説明的に言うしかない。日本語の方が死を肯定的に語れる。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 320,
    japanese: '初七日はいつ？',
    english: [
      'When is the memorial service?',
      'When is the first memorial service?',
      'When is the first memorial service after the funeral? I want to make sure I am there for it.',
      'Japanese Buddhism has specific memorial services on the 7th, 49th day, and yearly anniversaries. English-speaking Christian tradition has different timing -- maybe a memorial mass or anniversary remembrance. The structured schedule of Buddhist memorial services has no direct English parallel.',
    ],
    context: '「初七日」「四十九日」「一周忌」の法事スケジュールは仏教文化。英語圏のキリスト教にも追悼はあるけど、7日ごと・49日という仏教的タイムラインは独自。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 320,
    japanese: '最後に会っておけばよかった',
    english: [
      'I wish I had seen them',
      'I really wish I had visited them one last time',
      'I really wish I had gone to visit them one last time. I keep thinking about it and I just feel so guilty.',
      'This regret is universal and translates almost perfectly between Japanese and English. Both languages use the same conditional past structure to express it. This is rare -- most emotional expressions have cultural gaps, but this one hits the same way in both languages.',
    ],
    context: 'この後悔の表現は日英でほぼ完全に一致する珍しいケース。「会っておけば」= "I wish I had visited"。文法構造も感情も同じ。人間の後悔は言語を超える。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 320,
    japanese: '献花しに行こう',
    english: [
      'Let us go lay some flowers',
      'Let us go lay some flowers at the grave',
      'Let us go lay some flowers at the grave this weekend. I think it would mean a lot.',
      'Both cultures bring flowers to graves, so this translates well. But the flower types and customs differ -- Japan has chrysanthemums and incense, while English-speaking cultures vary by region. The act of visiting a grave is universal, but what you bring and do there is cultural.',
    ],
    context: '献花は日英共通の文化だけど、日本は菊と線香、英語圏はバラやユリ。お墓の形も違うし、お参りの作法も違う。行為は同じでも見た目が全然違う。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 320,
    japanese: 'あの人らしい最期だった',
    english: [
      'It was just like them',
      'The way they went was so like them',
      'The way they went was so perfectly like them. They would not have wanted it any other way, I think.',
      'Japanese "ano hito rashii saigo" is a common and comforting phrase. English "it was so like them" works well too. Both languages find comfort in saying the person died in a way that matched who they were. This is one of those phrases where the emotional function translates cleanly.',
    ],
    context: '「あの人らしい」は日本語の素晴らしい表現。英語の"so like them"もほぼ同じニュアンスで使える。故人の人柄と最期を結びつけて語る習慣は両文化に共通。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 320,
    japanese: '天国でゆっくり休んでね',
    english: [
      'Rest in peace',
      'Rest in peace -- you deserve it',
      'Rest in peace. You worked hard your whole life and you truly deserve to rest now. We will miss you.',
      'Japanese "tengoku de yukkuri yasunde" is more personal and conversational, as if talking to the deceased. English "rest in peace" or "RIP" is used but has become somewhat formulaic. The Japanese version keeps the warmth of directly addressing the person, while English can feel more like a label.',
    ],
    context: '「天国でゆっくり休んで」は故人に語りかける温かい表現。英語の"RIP"は略語になるほど定型化してしまった。日本語の方が故人との会話感がある。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
];

const day320Keywords: KeyWord[] = [
  { en: 'condolences', ja: 'お悔やみ', pron: 'kun-DOH-lun-siz', example: 'Please accept our sincere condolences.', note: 'always plural; "a condolence" sounds wrong' },
  { en: 'wake', ja: '通夜', pron: 'WAYK', example: 'The wake is tonight at six.', note: 'same spelling as "wake up" but completely different meaning' },
  { en: 'eulogy', ja: '弔辞', pron: 'YOO-luh-jee', example: 'She gave a beautiful eulogy for her father.', note: 'a speech honoring the deceased, usually given at the funeral' },
  { en: 'bereaved', ja: '遺族・喪に服している人', pron: 'bih-REEVD', example: 'The bereaved family requested privacy.', note: 'formal word meaning someone who has lost a loved one' },
  { en: 'cremation', ja: '火葬', pron: 'krih-MAY-shun', example: 'They chose cremation over burial.', note: 'standard in Japan; in English-speaking countries both burial and cremation are common' },
];

// ============================================================
// Day 321: 記念日 (Anniversaries)
// ============================================================

const day321: MasterExpression[] = [
  {
    daySlot: 321,
    japanese: '結婚記念日忘れてた',
    english: [
      'I forgot our anniversary',
      'I completely forgot our wedding anniversary',
      'I completely forgot our wedding anniversary. She is going to be so mad at me. I am a dead man.',
      'Forgetting anniversaries is a universal comedy setup in both languages. But in English, the trope of the husband forgetting and scrambling to make up for it is deeply embedded in sitcom culture. Japanese has the same anxiety but treats it with more genuine panic and less humor.',
    ],
    context: '結婚記念日を忘れる夫のネタは日英共通だけど、英語圏ではコメディの定番。"I am a dead man"みたいな大袈裟な表現で笑いに変える。日本語はもう少しガチで焦る感じ。',
    character: 'takeshi',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 321,
    japanese: '付き合って何年目？',
    english: [
      'How long have you been together?',
      'How many years have you two been together?',
      'How many years have you two been together now? Time really flies when you are with the right person.',
      'Japanese counts from the start of officially dating. English "how long have you been together" is more ambiguous -- it could mean dating or married. Japanese also has the concept of "tsukiau" (officially going out) which has a clearer start point than English dating culture.',
    ],
    context: '日本語の「付き合って」は公式に交際開始した日が基準。英語の"together"は曖昧で、初デートからなのか告白からなのか不明確。交際開始の定義が文化的に違う。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 321,
    japanese: '還暦のお祝い何する？',
    english: [
      'What should we do for their 60th?',
      'What should we do to celebrate their 60th birthday?',
      'What should we do to celebrate their 60th birthday? Should we throw a big party or keep it small?',
      'Japanese "kanreki" is not just turning 60 -- it is a specific cultural milestone tied to the Chinese zodiac completing a full cycle. The red vest tradition has no English equivalent. In English, 60 is just another birthday, maybe slightly notable. The cultural weight is completely different.',
    ],
    context: '「還暦」は干支が一周する特別な節目。赤いちゃんちゃんこの文化も含めて日本独自。英語圏で60歳は特別な区切りではない。50や65の方が意味を持つことが多い。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 321,
    japanese: '銀婚式だって',
    english: [
      'It is their silver anniversary',
      'They are celebrating their silver anniversary',
      'They are celebrating their silver anniversary -- 25 years married. Can you believe it? That is amazing.',
      'Silver and golden anniversaries exist in both Japanese and English, and the milestone years are the same (25 and 50). This is one of those happy cases where the cultural concept transferred directly. The celebration style might differ, but the symbolic meaning is shared.',
    ],
    context: '銀婚式（25年）と金婚式（50年）は日英共通の概念。珍しく直訳で完全に通じる表現。ただし日本は夫婦で食事、英語圏は家族や友人を呼んでパーティが多い。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 321,
    japanese: '毎年この日に来るんだよね',
    english: [
      'We come here every year on this day',
      'We make it a point to come here every year on this day',
      'We make it a point to come here every year on this day. It has become our little tradition and I love it.',
      'Japanese "mainichi kono hi ni kuru" is straightforward. English adds layers like "make it a point" or "it is our tradition" to give the act more intentional meaning. Japanese states the fact; English frames it as a deliberate choice, which subtly adds emotional weight.',
    ],
    context: '日本語は「毎年来る」と事実を述べるだけでも温かい。英語は"make it a point"と意図を明示することで同じ温かさを出す。表現の温度調整の仕方が違う。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 321,
    japanese: '記念に写真撮ろう',
    english: [
      'Let us take a photo to remember',
      'Let us take a photo to commemorate this',
      'Let us take a photo together to mark the occasion. We will look back at this and smile someday.',
      'Japanese "kinen ni" is a simple, common phrase. English has several options -- "to commemorate," "to mark the occasion," "to remember this." The Japanese version is more compact and natural, while English speakers often add a reason or future projection like "we will look back on this."',
    ],
    context: '「記念に」は便利な一言。英語では"to commemorate"は堅すぎるし"to remember this"は軽すぎる。"to mark the occasion"がちょうどいいけど、日本語の「記念に」ほどの万能さはない。',
    character: 'lisa',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 321,
    japanese: 'サプライズ用意してるんだ',
    english: [
      'I have a surprise planned',
      'I have got a surprise planned for them',
      'I have got a surprise planned for them. Do not tell anyone -- I want to see the look on their face.',
      'The concept of surprises is universal and translates cleanly. But the type of surprises differs -- Japanese surprises tend to be thoughtful and subtle (a meaningful gift, a reservation at a special restaurant), while American surprises can be more dramatic (surprise parties, flash mobs). Scale is cultural.',
    ],
    context: 'サプライズ文化は日米共通だけど、スケール感が違う。日本は「こっそり予約しておいた」くらい。アメリカは30人集めてサプライズパーティ。テンションの差がすごい。',
    character: 'kenji',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 321,
    japanese: 'あっという間の一年だった',
    english: [
      'This year flew by',
      'This past year just flew by so fast',
      'This past year just flew by so fast. I feel like we just celebrated the last anniversary yesterday.',
      'Both Japanese "atto iu ma" and English "flew by" use the same metaphor of time moving quickly. This is another rare case of near-perfect translation. The onomatopoeia in "atto iu ma" (literally "in the time it takes to say ah") has a charm that English cannot quite match though.',
    ],
    context: '「あっという間」は擬態語的な表現で、英語の"flew by"とほぼ同じ意味。直訳すると「あっと言う間に」= "in the time of saying ah"で、この詩的な感覚は英語にない。',
    character: 'mina',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 321,
    japanese: '初心に戻ろう',
    english: [
      'Let us go back to basics',
      'Let us remember how it all started',
      'Let us remember how it all started and get back to that feeling. Sometimes you need to reset and appreciate what you have.',
      'Japanese "shoshin ni modoru" is a powerful concept -- returning to your beginner\'s mind. English does not have a phrase with the same philosophical depth. "Back to basics" or "remember our roots" are functional but lack the Zen-like quality of "shoshin" that implies humility and fresh perspective.',
    ],
    context: '「初心に戻る」は禅の「初心」の概念が入った深い表現。英語の"back to basics"は実用的だけど哲学的な深みがない。"beginner\'s mind"はZen英語として一部で知られてるけど一般的ではない。',
    character: 'master',
    category: 'social',
    month: '2027-02',
  },
  {
    daySlot: 321,
    japanese: 'これからもよろしくね',
    english: [
      'Here is to many more years',
      'Here is to many more years together',
      'Here is to many more years together. I really could not imagine doing any of this without you by my side.',
      'Japanese "korekara mo yoroshiku" is one of those famously untranslatable phrases. It means "please continue to be good to me" but that sounds weird in English. "Here is to many more years" captures the forward-looking warmth without the awkwardness of a literal translation.',
    ],
    context: '「これからもよろしく」は英語に訳せない日本語の代表。"Please be good to me"は直訳すぎて変。"Here is to us"や"Here is to many more"が記念日の文脈では一番近い。',
    character: 'yuki',
    category: 'social',
    month: '2027-02',
  },
];

const day321Keywords: KeyWord[] = [
  { en: 'anniversary', ja: '記念日', pron: 'an-ih-VER-suh-ree', example: 'Happy anniversary! How many years is it now?', note: 'can be for any recurring date, not just weddings' },
  { en: 'commemorate', ja: '記念する・祝う', pron: 'kuh-MEM-uh-rayt', example: 'We planted a tree to commemorate the occasion.', note: 'more formal than "celebrate" -- implies honoring a meaningful event' },
  { en: 'milestone', ja: '節目・マイルストーン', pron: 'MYLE-stohn', example: 'Turning 50 is a real milestone.', note: 'originally a stone marking distance; now means any significant point in a journey' },
  { en: 'tradition', ja: '伝統・恒例', pron: 'truh-DIH-shun', example: 'It has become a family tradition to eat here.', note: 'can be big cultural traditions or small personal ones' },
  { en: 'toast (a toast)', ja: '乾杯・祝辞', pron: 'TOHST', example: 'Let me raise a toast to the happy couple.', note: '"raise a toast" means to lift your glass and say something celebratory' },
];

// ============================================================
// Exports
// ============================================================

export const MONTH11_W43_EXPRESSIONS: MasterExpression[] = [
  ...day315,
  ...day316,
  ...day317,
  ...day318,
  ...day319,
  ...day320,
  ...day321,
];

export const MONTH11_W43_DAY_THEMES: Record<number, { title: string; titleEn: string; category: string; scene: string; keywords: KeyWord[] }> = {
  315: { title: '卒業と入学', titleEn: 'Graduation & Enrollment', category: 'social', scene: '居酒屋で春の卒業シーズンの思い出話。常連が学生時代の写真を見せながら盛り上がる。', keywords: day315Keywords },
  316: { title: '就職と退職', titleEn: 'Getting Hired & Quitting', category: 'social', scene: '転職したばかりの常連が、前の会社を辞めた経緯を語る。大将が「うちも人手不足だよ」とぼやく。', keywords: day316Keywords },
  317: { title: '結婚', titleEn: 'Marriage', category: 'social', scene: '常連の結婚報告に店全体が沸く。大将がお祝いの一品をサービスして、みんなで乾杯。', keywords: day317Keywords },
  318: { title: '出産と育児', titleEn: 'Birth & Childcare', category: 'social', scene: '赤ちゃんが生まれたばかりのパパ常連が、寝不足の顔で来店。周りが育児アドバイスを次々と。', keywords: day318Keywords },
  319: { title: '引退', titleEn: 'Retirement', category: 'social', scene: '定年退職した常連のお祝い会。「明日から毎日が日曜日だな」と笑いながら、これからの夢を語る。', keywords: day319Keywords },
  320: { title: 'お葬式', titleEn: 'Funerals', category: 'social', scene: '葬儀帰りの常連が静かにカウンターに座る。大将が黙って熱燗を出し、故人の思い出を語り合う。', keywords: day320Keywords },
  321: { title: '記念日', titleEn: 'Anniversaries', category: 'social', scene: '結婚記念日を忘れて奥さんに怒られた常連が駆け込んでくる。「何かいいプレゼントない？」と必死。', keywords: day321Keywords },
};
