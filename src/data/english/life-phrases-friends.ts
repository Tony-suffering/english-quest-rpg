import type { LifePhrase } from './life-phrases';

export const friendsPhrases: LifePhrase[] = [
  // ── messaging / LINE ──────────────────────────────
  {
    id: 'life-friends-001',
    japanese: '既読スルーされた',
    english: [
      "left on read",
      "they totally left me on read, seriously",
      "I sent a message and they read it but never replied",
      "Left on read. Seen at 2:47 PM. It is now 11 PM. Nine hours. I have gone through all five stages of grief. Denial: maybe they are busy. Anger: how dare you. Bargaining: maybe I will send a follow-up. Depression: they hate me. Acceptance: I am going to pretend I do not care while checking my phone every four minutes."
    ],
    context: "「既読スルー」は日本語発の概念だけど英語にもleft on readがある。on readの「on」は状態を表す前置詞。on fire、on holdと同じ構造。「読まれた状態で放置された」。LINE文化が生んだ言葉が海を越えた。",
    category: 'friends',
    subcategory: 'messaging',
    situation: 'LINEの返事が来ないとき',
  },
  {
    id: 'life-friends-002',
    japanese: '未読スルーのほうがキツい',
    english: [
      "not even opened",
      "they did not even open it, that is worse",
      "Being left on delivered is honestly worse than being left on read",
      "There is a hierarchy of digital rejection and people do not talk about it enough. Left on read means they saw it and chose silence. But left on delivered? They did not even bother opening it. Your message is just sitting there in their notification graveyard next to app updates and spam. You are not even worth a tap."
    ],
    context: "英語ではleft on deliveredが未読スルー。delivered=「届いた」の状態で放置。read>deliveredという既読の方がまだマシという感覚は万国共通。デジタル時代の拒絶にもランクがある。",
    category: 'friends',
    subcategory: 'messaging',
    situation: 'メッセージを開いてすらもらえないとき',
  },
  {
    id: 'life-friends-003',
    japanese: 'グループLINEが荒れてる',
    english: [
      "group chat blowing up",
      "the group chat is absolutely blowing up right now",
      "Our group chat has been going off nonstop all day",
      "I stepped away from my phone for twenty minutes and came back to 247 unread messages. Someone said something controversial and now everyone has an opinion. Half the group is fighting, the other half is sending reaction images. I am just scrolling through the wreckage trying to figure out what happened."
    ],
    context: "blow upは「爆発する」が転じて「通知が鳴りまくる」。go offも同義。日本語の「荒れてる」は雰囲気が悪い含みがあるけど、英語のblowing upは単に盛り上がっている意味でも使う。ニュアンスは文脈次第。",
    category: 'friends',
    subcategory: 'messaging',
    situation: 'グループチャットが大量に動いているとき',
  },
  {
    id: 'life-friends-004',
    japanese: 'スタンプで返すしかなかった',
    english: [
      "just sent a sticker",
      "I had nothing to say so I just sent a sticker",
      "I could not think of a proper reply so I just reacted with an emoji",
      "There are moments in a conversation where words fail you. Not because the topic is deep or emotional but because you genuinely have no idea what to say. So you reach for the universal escape button: a sticker. A thumbs up. A laughing face. It says everything and nothing at the same time. Communication perfected."
    ],
    context: "英語圏ではLINEスタンプの文化がないから、stickerよりemoji reactやreactionで伝わる。スタンプ=「言葉の代わりに投げる絵」という概念自体が日本的。英語圏はGIF文化の方が近い。",
    category: 'friends',
    subcategory: 'messaging',
    situation: '返信に困ってスタンプで逃げたとき',
  },

  // ── 飲み会 ──────────────────────────────
  {
    id: 'life-friends-005',
    japanese: '今日飲みに行かない?',
    english: [
      "want to grab drinks",
      "hey, want to grab drinks tonight or what",
      "Do you want to go out for drinks tonight?",
      "It is 4:30 PM on a Thursday. I have accomplished nothing of value at work today. My brain is fried. The only reasonable course of action is to text the group chat 'drinks tonight?' and see who bites. Productivity can wait. My liver cannot, but that is a problem for tomorrow morning."
    ],
    context: "grab drinksの「grab」が英語の飲み誘い文化を象徴している。grabは「ひょいと掴む」。重い約束じゃなく「軽くサクッと」のニュアンス。日本語の「飲みに行く」より気軽さが3倍くらいある。",
    category: 'friends',
    subcategory: 'drinking',
    situation: '仕事終わりに誘うとき',
  },
  {
    id: 'life-friends-006',
    japanese: '二次会行く?',
    english: [
      "hit another spot",
      "want to hit another spot or are you done",
      "Should we go somewhere else for another round?",
      "This is the moment of truth. The first place is winding down, someone suggests moving on, and now you have to make a decision that your future self will either thank you for or deeply regret. My brain says go home. My drunk self says one more place. My drunk self is undefeated in this matchup."
    ],
    context: "「二次会」に当たる英語は存在しない。英語圏はbar hoppingで店を回る文化で、一次会/二次会の区切りがない。hit another spotが一番近い。hitは「行く」のカジュアル版。spot=「場所」。",
    category: 'friends',
    subcategory: 'drinking',
    situation: '一軒目が終わって次を考えるとき',
  },
  {
    id: 'life-friends-007',
    japanese: '終電逃した',
    english: [
      "missed the last train",
      "I missed the last train, I am stuck here",
      "I stayed out too late and missed the last train home",
      "There is a very specific moment of clarity that hits you when you check your phone and realize it is 12:47 AM and the last train left at 12:15. The math is instant. Taxi home is sixty bucks. Karaoke until first train is twenty. The karaoke always wins. Always. It is not even a choice anymore."
    ],
    context: "missed the last trainは世界中で通じるけど、終電を逃す=始発までどうするか問題は東京特有。英語圏はUberで帰るから「終電」の重みが違う。日本のtaxi代が高すぎるから生まれた文化。",
    category: 'friends',
    subcategory: 'drinking',
    situation: '飲みすぎて終電を逃したとき',
  },
  {
    id: 'life-friends-008',
    japanese: '飲みすぎて記憶がない',
    english: [
      "blacked out",
      "I totally blacked out, what happened last night",
      "I drank so much that I cannot remember anything after a certain point",
      "I woke up in my own bed, which is a good sign. I have my wallet, keys, and phone, so nothing was lost. But there is a six-hour gap in my memory between my third beer and waking up at 7 AM still in my jeans. I am afraid to check my sent messages. Some mysteries are better left unsolved."
    ],
    context: "blacked outは「記憶が飛んだ」。blackout=「停電」と同じ語。脳の記録装置がシャットダウンしたイメージ。passed outは「気絶した」で別物。記憶はないけど意識はあった、がblacked out。",
    category: 'friends',
    subcategory: 'drinking',
    situation: '翌朝目覚めて記憶がないとき',
  },
  {
    id: 'life-friends-009',
    japanese: '酔うと絡みがうざい人いるよね',
    english: [
      "annoying drunk",
      "some people get so annoying when they are drunk",
      "There is always that one person who gets really clingy and obnoxious after a few drinks",
      "Everyone has a drunk personality. Some people get quiet. Some get philosophical. Some start crying about their ex. And then there is that one person who grabs your arm and will not let go and keeps repeating the same story four times while getting progressively louder. We all know who that person is. If you do not, it might be you."
    ],
    context: "annoying drunkは人格としてのラベル。英語は「酔い方」を性格タイプとして分類するのが好き。happy drunk, angry drunk, sleepy drunk。日本語の「絡む」は英語だとclingy(べったり)やobnoxious(うざい)に分かれる。",
    category: 'friends',
    subcategory: 'drinking',
    situation: '飲み会で絡んでくる人について話すとき',
  },

  // ── 割り勘・おごり ──────────────────────────────
  {
    id: 'life-friends-010',
    japanese: '割り勘にしよう',
    english: [
      "let us split it",
      "let us just split it evenly, yeah?",
      "Why do we not just split the bill evenly between everyone?",
      "Splitting the bill should be simple math but it never is. Someone had three cocktails and everyone else had beer. Someone ordered dessert. Someone only had salad. And now we are all standing at the register doing mental arithmetic while the waiter stares at us. Just Venmo me later. That is the modern solution."
    ],
    context: "split the billが割り勘。splitは「割る」。go Dutchは古い表現で今はあまり使わない。日本の「割り勘」は均等割りが基本だけど、英語圏はsplit evenly(均等)かsplit by what you had(食べた分)かで毎回議論になる。",
    category: 'friends',
    subcategory: 'money',
    situation: '会計のとき',
  },
  {
    id: 'life-friends-011',
    japanese: '今日は俺がおごるよ',
    english: [
      "this one is on me",
      "I got this one, do not worry about it",
      "Do not worry about the bill, I will pay for everything tonight",
      "There is a power move hidden inside generosity. When you say 'I got this' with confidence, you are not just paying a bill. You are establishing dominance. You are saying I am doing well enough to cover this without thinking about it. Of course, I will absolutely be thinking about it when I check my bank account tomorrow."
    ],
    context: "on meの「on」は負担を表す。It's on me=「俺の上に乗ってる」=俺が背負う。I got this(俺が持った)も同じ。日本語の「おごる」は英語に一語で訳せない。treat(もてなす)が近いけどニュアンスが上品すぎる。",
    category: 'friends',
    subcategory: 'money',
    situation: '支払いを全部持つとき',
  },
  {
    id: 'life-friends-012',
    japanese: 'あいつ絶対おごらないよね',
    english: [
      "never picks up the tab",
      "that guy never picks up the tab, ever",
      "He has never once offered to pay for anyone else in his life",
      "We have been friends for eight years. We have gone out to eat maybe two hundred times. Not once. Not a single time has this man reached for his wallet with any sense of urgency. He does this thing where he suddenly needs to use the bathroom right when the check arrives. Every time. It is almost impressive at this point."
    ],
    context: "pick up the tabの「tab」は飲食店のツケ。tabを「拾い上げる」=支払いを引き受ける。英語圏では割り勘よりround制(順番におごる)が多い。だから「絶対おごらない奴」への不満は万国共通。",
    category: 'friends',
    subcategory: 'money',
    situation: 'ケチな友達について話すとき',
  },
  {
    id: 'life-friends-013',
    japanese: '先輩がおごってくれた',
    english: [
      "they treated me",
      "my senior at work treated me to dinner, solid move",
      "My senpai took me out and paid for everything",
      "In Japan this is just how it works. The senior pays. It is unwritten law. But explaining this to my American friend was impossible. He kept saying 'why would someone pay for your dinner just because they are older than you?' Because that is the deal. You suffer as the junior, you pay as the senior. The circle of life."
    ],
    context: "treat someone to dinnerが「おごる」。treat=「もてなし」。先輩後輩の上下関係おごりは英語圏にない文化。senpaiはそのまま通じるけど、おごりの義務感は通じない。mentor buys lunchくらいが近い。",
    category: 'friends',
    subcategory: 'money',
    situation: '先輩に飯をおごってもらったとき',
  },

  // ── ドタキャン・約束 ──────────────────────────────
  {
    id: 'life-friends-014',
    japanese: 'ドタキャンされた',
    english: [
      "bailed on me",
      "they bailed on me last minute, typical",
      "They cancelled on me at the very last minute after I was already ready to go",
      "I showered. I put on a clean shirt. I did my hair. I was standing at the station, looking presentable for once in my life. Then my phone buzzes. 'Sorry, something came up.' Something came up. The most overused excuse in human history. Nothing came up. Netflix came up. Your couch came up. You just did not want to leave your house."
    ],
    context: "bail on someoneが「ドタキャン」。bailは保釈金の意味もあって「逃げ出す」イメージ。flake outも同じ。「ドタキャン」は「土壇場キャンセル」の略で日本語としても面白い。last minuteを付けると直前感が出る。",
    category: 'friends',
    subcategory: 'plans',
    situation: '直前にキャンセルされたとき',
  },
  {
    id: 'life-friends-015',
    japanese: 'あいつドタキャン常習犯だから',
    english: [
      "always flakes out",
      "that one always flakes out, I never count on them",
      "They are notorious for cancelling plans at the last second",
      "At this point I do not even get disappointed anymore. I plan around it. If five people say they are coming, I mentally subtract one because I know this person will bail. I have started making backup plans for my backup plans. The funny thing is they always say 'next time for sure' and I always believe them. I am the real problem here."
    ],
    context: "flakeは「薄片」。flake outは「剥がれ落ちるように消える」。常習犯はserial flaker。英語はこういう人に専用名詞を付けるのが好き。serial killer(連続殺人犯)と同じ構造で「連続ドタキャン犯」。",
    category: 'friends',
    subcategory: 'plans',
    situation: 'いつもドタキャンする人について話すとき',
  },
  {
    id: 'life-friends-016',
    japanese: 'ごめん、今日無理になった',
    english: [
      "something came up",
      "sorry, something came up and I cannot make it",
      "I am really sorry but I am not going to be able to make it today",
      "I have sent this exact text maybe three hundred times in my life. 'Something came up.' What came up? Nothing. Absolutely nothing came up. I just do not want to go anymore. The enthusiasm I had when I agreed three days ago has completely evaporated. Current me is furious at past me for making commitments future me has no intention of keeping."
    ],
    context: "something came upは万能キャンセル文句。come up=「急に浮上する」。何が浮上したかは言わないのがポイント。日本語の「ちょっと用事が」と全く同じ戦略。具体的に言わないことで嘘がバレない。天才。",
    category: 'friends',
    subcategory: 'plans',
    situation: '約束をキャンセルするとき',
  },
  {
    id: 'life-friends-017',
    japanese: '予定合わなすぎて全然会えない',
    english: [
      "schedules never line up",
      "our schedules never line up, it has been months",
      "We keep trying to make plans but our schedules never align",
      "We have been saying 'let us hang out soon' for four months. The conversation always goes the same way. 'How about Saturday?' Busy. 'Next Thursday?' I have a thing. 'Two weeks from now?' Let me check. And then nobody checks. And another month passes. We are not bad friends. We are just adults. This is what being an adult is."
    ],
    context: "line upは「列に並ぶ」→「揃う」。schedules line upで「予定が揃う」。alignも同じ。日本語は「合わない」だけど英語は「揃わない」。予定を線に見立てて、2本の線が重ならないイメージ。",
    category: 'friends',
    subcategory: 'plans',
    situation: '友達となかなか会えないとき',
  },

  // ── 愚痴 ──────────────────────────────
  {
    id: 'life-friends-018',
    japanese: 'ちょっと聞いてよ',
    english: [
      "you will not believe this",
      "okay you are not going to believe this, listen",
      "You have to hear what happened to me today",
      "Every good rant needs an opening line. 'You will not believe this' is the universal signal that I am about to talk for fifteen minutes without letting you respond. I do not want advice. I do not want solutions. I want you to sit there, nod, and occasionally say 'no way' or 'that is messed up.' That is the entire job description."
    ],
    context: "「ちょっと聞いてよ」の直訳はlisten a bitだけど、英語では感情のフリとしてyou won't believe thisが自然。「信じられないよ」と言うことで相手の注意を掴む。愚痴の前振りとして完璧な型。",
    category: 'friends',
    subcategory: 'venting',
    situation: '愚痴を言い始めるとき',
  },
  {
    id: 'life-friends-019',
    japanese: 'もう関わりたくないんだけど',
    english: [
      "done with them",
      "honestly I am so done with them at this point",
      "I really do not want to deal with that person anymore",
      "I say this every two weeks about the same person and nothing ever changes. 'I am done.' Done with what? Being annoyed and then forgiving them immediately? Because that is what keeps happening. I have the emotional memory of a goldfish when it comes to grudges. Three days from now I will be getting lunch with them like nothing happened."
    ],
    context: "I'm done with themの「done」は「終わった」。料理のdone(焼けた)と同じ。「もう十分加熱された、限界」のイメージ。deal withも「対処する」で、もう対処したくない=I don't want to deal with them。",
    category: 'friends',
    subcategory: 'venting',
    situation: '誰かにうんざりしているとき',
  },
  {
    id: 'life-friends-020',
    japanese: 'あいつ最近調子乗ってない?',
    english: [
      "getting full of themselves",
      "is it just me or are they getting full of themselves",
      "Do you not think they have been acting a bit too cocky lately?",
      "I am not saying I am jealous. I am genuinely not. But something shifted. They got that promotion and now every sentence starts with 'at my level' or 'in my position.' You were eating instant ramen with us six months ago, my friend. The ramen stains on your reputation have not dried yet. Calm down."
    ],
    context: "full of themselvesは「自分でいっぱい=自惚れている」。頭の中が自分のことで満タン状態。cockyは「生意気」。getting cockyで「調子に乗りつつある」。進行形にすると「最近」の含みが出る。",
    category: 'friends',
    subcategory: 'venting',
    situation: '友達が調子に乗っているとき',
  },

  // ── マウント ──────────────────────────────
  {
    id: 'life-friends-021',
    japanese: 'マウント取ってくるのうざい',
    english: [
      "always one-upping people",
      "they always have to one-up everyone, so annoying",
      "They constantly try to make themselves seem superior in every conversation",
      "You say you are tired. They say they are more tired. You got a raise. They got a bigger one. You went to Hawaii. They went to the Maldives. Every conversation is a competition they did not tell you you were entering. I just wanted to share something nice that happened to me. I did not sign up for the suffering Olympics."
    ],
    context: "one-upは「一個上を行く」。トランプで相手より1枚上のカードを出すイメージ。マウントは日本語のネットスラングだけど、英語ではone-uppingが完全対応。常にone-upする人をone-upperと呼ぶ。名詞にもなる便利な語。",
    category: 'friends',
    subcategory: 'dynamics',
    situation: '何でもマウントを取ってくる人について',
  },
  {
    id: 'life-friends-022',
    japanese: 'さりげなく自慢してくるやつ',
    english: [
      "humble bragging",
      "the humble bragging is getting out of hand honestly",
      "They pretend to complain but are actually showing off",
      "The humble brag is an art form and some people have mastered it. 'Ugh, my boyfriend keeps surprising me with expensive gifts, it is so overwhelming.' 'I hate how fast my metabolism is, I eat so much and cannot gain weight.' Nobody is fooled. We all see it. But we just smile and nod because calling it out would make us the bad guy somehow."
    ],
    context: "humble brag=「謙虚な自慢」。2010年代にSNSで生まれた造語。文句を装った自慢。日本語の「嫌味」や「自虐風自慢」に近い。英語は新しい概念にすぐ名前を付ける。名前が付いた瞬間、武器になる。",
    category: 'friends',
    subcategory: 'dynamics',
    situation: 'さりげなく自慢してくる友達について',
  },
  {
    id: 'life-friends-023',
    japanese: 'マウント取られても気にしないようにしてる',
    english: [
      "trying not to engage",
      "I am just trying not to engage with it anymore",
      "I have decided to stop reacting when people try to one-up me",
      "The trick is to not play the game. When someone says 'oh you went to Okinawa? I just got back from Bali,' you just say 'nice' and change the subject. Do not compete. Do not explain. Just 'nice.' It drives them crazy because they need your reaction to complete the circuit. No reaction, no satisfaction. Emotional jiu-jitsu."
    ],
    context: "engageは「かみ合う」。ギアがかみ合うengage。not engageは「かみ合わない=乗らない」。日本語の「スルーする」に近い。英語ではdisengage(離脱)も使う。戦場用語が日常会話に入っている。",
    category: 'friends',
    subcategory: 'dynamics',
    situation: 'マウントをスルーすると決めたとき',
  },

  // ── 噂話 ──────────────────────────────
  {
    id: 'life-friends-024',
    japanese: 'ここだけの話なんだけど',
    english: [
      "between us",
      "okay this stays between us, promise me",
      "I am going to tell you something but you cannot tell anyone else",
      "Every secret begins with 'do not tell anyone' and ends with being told to everyone. This is how information works. I know this. You know this. And yet here I am saying 'between us' like it is a magic spell that will actually keep this contained. The average lifespan of a secret is 48 hours. That is just science."
    ],
    context: "between usは「私たちの間だけ」。just between you and meが正式版。日本語の「ここだけの話」と構造が同じ。「この場所だけ」vs「この2人の間だけ」。どちらも守られないのも同じ。人類共通。",
    category: 'friends',
    subcategory: 'gossip',
    situation: '秘密の話をし始めるとき',
  },
  {
    id: 'life-friends-025',
    japanese: 'あの二人付き合ってるらしいよ',
    english: [
      "apparently they are together",
      "so apparently those two are a thing now, did you know?",
      "I heard that those two are dating each other",
      "The moment you hear this news, everything clicks. All the signs you missed. The way they always sat next to each other. The mysterious Instagram stories with the same background. How they both 'happened to be busy' on the same weekends. You are not Sherlock Holmes. You missed every single clue. But now that you know, it is so obvious."
    ],
    context: "are a thingが面白い。thing=「もの」だけど、are a thingで「付き合っている」。名前のない関係を「thingがある」と表現する。apparentlyは「どうやら~らしい」で、伝聞の責任を回避する便利な副詞。",
    category: 'friends',
    subcategory: 'gossip',
    situation: '友達の恋愛の噂を聞いたとき',
  },
  {
    id: 'life-friends-026',
    japanese: '裏で悪口言ってたらしい',
    english: [
      "talking behind my back",
      "they were talking behind my back the whole time",
      "I found out that they have been saying bad things about me when I am not around",
      "Finding out someone was talking behind your back is a specific kind of betrayal. Not the dramatic movie kind. The kind where you replay every interaction wondering which smiles were real. Was the 'you look great today' genuine or were they storing material? Trust is like a phone screen. One crack and you notice it every single time."
    ],
    context: "behind my backは「背中の後ろで」=陰で。talk behind someone's backで「陰口を言う」。英語は身体の向きで表現する。face to face(面と向かって)の反対。日本語の「裏で」と英語の「背中の後ろで」、視点が違うけど意味は同じ。",
    category: 'friends',
    subcategory: 'gossip',
    situation: '陰口を言われていたと知ったとき',
  },

  // ── 距離感 ──────────────────────────────
  {
    id: 'life-friends-027',
    japanese: 'ちょっと距離置きたい',
    english: [
      "need some space",
      "I think I need some space from them for a while",
      "I feel like I need to take a step back from that friendship",
      "It is not that I hate them. That would be easier. You can just stop talking to someone you hate. But when you need space from someone you like, it is complicated. You cannot say 'hey I like you but you are exhausting me.' There is no polite way to say 'I need to not see your face for about three weeks.' So you just get busy. Strategically busy."
    ],
    context: "need spaceは物理的にも心理的にも使える。space=空間=距離。take a step backは「一歩下がる」で、友情から完全に離れるのではなく「少し後退」のニュアンス。距離感の微調整を英語は空間メタファーで表現する。",
    category: 'friends',
    subcategory: 'boundaries',
    situation: '友達と少し距離を置きたいとき',
  },
  {
    id: 'life-friends-028',
    japanese: '仲良いけど毎日は無理',
    english: [
      "need my own time",
      "I like them but I still need my own time, you know",
      "We are close friends but I cannot hang out with them every single day",
      "Some people recharge by being around others. I recharge by being alone in my room with the door closed and no obligations. That does not make me a bad friend. It makes me an introvert with a social battery that drains faster than my phone. Full charge gets me about four hours of socializing. After that I am running on fumes."
    ],
    context: "social batteryは英語圏で市民権を得た表現。人付き合いの体力をバッテリーに例える。introvert(内向型)の文脈で使う。日本語には「社交バッテリー」の直訳がまだ定着していない。概念はあるのに言葉がない珍しいケース。",
    category: 'friends',
    subcategory: 'boundaries',
    situation: '毎日会うのはしんどいと感じるとき',
  },
  {
    id: 'life-friends-029',
    japanese: 'あの人ちょっと距離感おかしくない?',
    english: [
      "no sense of boundaries",
      "they have absolutely no sense of boundaries at all",
      "That person has no idea what appropriate personal space looks like",
      "They text me at midnight asking if I am awake. They show up unannounced at my apartment. They get offended if I do not reply within ten minutes. And when I say I am busy, they ask 'busy doing what?' I did not realize friendship came with a terms of service agreement that requires 24/7 availability. I need to renegotiate this contract."
    ],
    context: "boundariesは「境界線」。no sense of boundariesで「距離感がおかしい」。英語圏はboundaries(個人の境界線)を非常に重視する文化。set boundaries(境界線を設定する)は自己啓発でも頻出。日本語の「距離感」より権利意識が強い。",
    category: 'friends',
    subcategory: 'boundaries',
    situation: '距離感がおかしい人について話すとき',
  },

  // ── 再会 ──────────────────────────────
  {
    id: 'life-friends-030',
    japanese: '久しぶりすぎて何話していいかわからない',
    english: [
      "so awkward at first",
      "it was so awkward at first because it had been forever",
      "We had not seen each other in so long that I did not even know where to start",
      "The first five minutes of any reunion after a long gap are brutal. You do the hug, you say 'it has been so long,' and then there is this pause. This terrifying pause where you both realize you might have run out of things in common. But then someone mentions a random memory from ten years ago and suddenly it is 2 AM and you have not stopped talking."
    ],
    context: "awkwardは「気まずい」を完璧にカバーする語。居心地の悪い空気感全般に使える。日本語の「気まずい」は関係性の問題だけど、awkwardは状況自体の問題。the awkward silenceは「気まずい沈黙」で、再会の最初の敵。",
    category: 'friends',
    subcategory: 'reunion',
    situation: '久しぶりに会った友達との会話',
  },
  {
    id: 'life-friends-031',
    japanese: '会った瞬間、昔に戻った感じ',
    english: [
      "felt like old times",
      "the second we met up it felt like old times again",
      "As soon as we saw each other, it was like no time had passed at all",
      "That is the test of a real friendship. You do not see someone for three years and within ten minutes you are finishing each other's sentences again. No catching up needed. No awkward small talk. Just straight back into roasting each other and laughing at inside jokes that stopped being funny to anyone else a decade ago. Time means nothing to good friendships."
    ],
    context: "like old timesは「昔みたいだった」。old timesは「古き良き時代」。felt like no time had passedも定番。「時間が経っていないみたいだった」。英語は再会の感動を時間の無効化で表現する。",
    category: 'friends',
    subcategory: 'reunion',
    situation: '久しぶりに会ってすぐ打ち解けたとき',
  },
  {
    id: 'life-friends-032',
    japanese: '同窓会どうする? 行く?',
    english: [
      "going to the reunion",
      "so are you going to the reunion or skipping it",
      "Are you planning to go to the class reunion this year?",
      "The class reunion is the ultimate social gamble. Best case: you reconnect with people you actually missed. Worst case: you spend three hours explaining your job to people who peaked in high school while they show you photos of their kids. And there is always one person who looks exactly the same and one who is completely unrecognizable. The suspense alone is almost worth going."
    ],
    context: "class reunionが同窓会。reunionは「再結合」。re(再)+union(結合)。アメリカはhigh school reunionが10年ごとにある文化。日本の同窓会より規模が大きくてフォーマル。映画のネタにもなりやすい。",
    category: 'friends',
    subcategory: 'reunion',
    situation: '同窓会に行くか迷っているとき',
  },

  // ── 学生時代の友達 ──────────────────────────────
  {
    id: 'life-friends-033',
    japanese: '学生の頃は毎日一緒だったのにね',
    english: [
      "used to be inseparable",
      "we used to be inseparable back in school, crazy right",
      "It is hard to believe we used to see each other every single day in school",
      "In school, friendship was automatic. You saw the same people five days a week whether you wanted to or not. Proximity did all the work. Then you graduate and suddenly friendship requires effort, scheduling, and motivation. Three things that adults are chronically short on. It is not that we grew apart. Gravity just stopped working."
    ],
    context: "inseparableは「分離不可能」。in(不)+separable(分けられる)。「離せないほど仲が良かった」。used to beで「かつてはそうだった(今は違う)」。この2語の組み合わせが学生時代の友情の切なさを全部表現している。",
    category: 'friends',
    subcategory: 'old-friends',
    situation: '学生時代の友達と疎遠になったとき',
  },
  {
    id: 'life-friends-034',
    japanese: '社会人になると友達作りにくいよね',
    english: [
      "hard to make friends as an adult",
      "making friends as an adult is honestly so hard",
      "It gets so much harder to make new friends once you start working",
      "As a kid you could become best friends with someone in fifteen minutes on a playground. As an adult, making a friend requires meeting someone, exchanging numbers, actually texting, finding a day that works, going somewhere, having a conversation without talking about work, and then repeating this process enough times until it stops feeling forced. It is basically a part-time job."
    ],
    context: "make friendsの「make」は「作る」。友達は自然にできるものではなく「作る」もの、という英語の発想。日本語も「友達を作る」だから同じ。でもas an adult(大人として)を付けた瞬間、難易度が跳ね上がる感覚は世界共通。",
    category: 'friends',
    subcategory: 'old-friends',
    situation: '大人になってからの友達作りについて',
  },
  {
    id: 'life-friends-035',
    japanese: '地元の友達と話すと方言出る',
    english: [
      "my accent comes back",
      "my old accent totally comes back when I am with them",
      "Whenever I hang out with friends from back home, my accent starts slipping out",
      "I have spent years carefully constructing my standard Tokyo Japanese. Professional. Clean. Then I go home for one weekend and within thirty minutes I am back to full dialect like I never left. My friends do not even notice. To them this is how I have always talked. It is like having two operating systems and my hometown friends have the admin password to the old one."
    ],
    context: "accentは「訛り」。comes backで「戻ってくる」。slips outは「つい出てしまう」。英語圏でも同じ現象がある。NYの人がNJ訛りに戻る、イギリス人が故郷の訛りに戻る。code-switching(言語の切り替え)という言語学用語もある。",
    category: 'friends',
    subcategory: 'old-friends',
    situation: '地元の友達と話しているとき',
  },

  // ── ママ友 ──────────────────────────────
  {
    id: 'life-friends-036',
    japanese: 'ママ友の付き合い疲れる',
    english: [
      "mom friends are exhausting",
      "the whole mom friend thing is honestly exhausting",
      "Socializing with other moms from school is more tiring than actual parenting",
      "Mom friends are not real friends. They are strategic alliances formed around the fact that your children happen to attend the same school. Every interaction is a chess game. Say too little and you are standoffish. Say too much and it becomes gossip material. And the group chat about the school festival? That is a war room disguised as a LINE group."
    ],
    context: "「ママ友」は英語に直訳できない日本特有の概念。mom friendsが最も近いけど、英語圏のmom friendsは「子供がきっかけで本当に仲良くなった人」。日本の「義務的な付き合い」のニュアンスはない。",
    category: 'friends',
    subcategory: 'mom-friends',
    situation: 'ママ友付き合いに疲れたとき',
  },
  {
    id: 'life-friends-037',
    japanese: 'ママ友にマウント取られた',
    english: [
      "got mom-shamed",
      "I basically got mom-shamed at pickup today, unbelievable",
      "One of the school moms made me feel terrible about my parenting choices",
      "She asked if my kid's lunchbox was homemade. It was convenience store onigiri wrapped in a cute cloth to look homemade. She knew. I knew she knew. She smiled that smile that says 'I woke up at five to make character bento and you clearly did not.' Parenting is not a competition but somebody forgot to tell the other moms."
    ],
    context: "mom-shamingは「母親として恥をかかせる」。shame(恥)が動詞化した英語の造語力。body-shaming, fat-shamingと同じ構造。日本語の「ママ友マウント」は英語だとmom-shaming。攻撃の方向が違う。英語は「恥をかかせる」側を問題視する。",
    category: 'friends',
    subcategory: 'mom-friends',
    situation: 'ママ友にマウントを取られたとき',
  },

  // ── 職場の人間関係 ──────────────────────────────
  {
    id: 'life-friends-038',
    japanese: '職場の人とプライベートで会いたくない',
    english: [
      "keep work and life separate",
      "I like to keep work and personal life totally separate",
      "I do not want to see my coworkers outside of work hours",
      "From nine to six, I am a team player. I laugh at jokes that are not funny. I attend optional events that are not optional. I say 'let us grab lunch sometime' knowing full well I will never follow through. But the second I clock out, I am a ghost. My coworkers are NPCs and when I leave the building, the simulation ends."
    ],
    context: "keep work and life separateは「ワークライフを分ける」。separateの使い方が英語圏の価値観を映している。日本はwork-life balanceと言いながら飲み会が半強制。英語圏はそもそも混ぜないのがデフォルト。",
    category: 'friends',
    subcategory: 'work-relationships',
    situation: '職場の人間関係を割り切りたいとき',
  },
  {
    id: 'life-friends-039',
    japanese: '職場に一人は気が合う人がいると助かる',
    english: [
      "need a work buddy",
      "having at least one work buddy honestly saves your sanity",
      "It makes such a difference when there is at least one person at work you actually get along with",
      "You do not need everyone at work to like you. You just need one person. One person you can make eye contact with during absurd meetings. One person who understands when you say 'I need coffee' you actually mean 'I need to complain about something for five minutes.' That one person is the difference between surviving your job and losing your mind."
    ],
    context: "work buddyの「buddy」は「相棒」。friendより軽くてacquaintanceより親しい。workを付けると「職場限定の仲間」。save your sanityは「正気を保つ」。sanity=正気。職場に味方が一人いると精神が保てる。この切実さは万国共通。",
    category: 'friends',
    subcategory: 'work-relationships',
    situation: '職場に気の合う人がいることのありがたさ',
  },
  {
    id: 'life-friends-040',
    japanese: '上司の愚痴で盛り上がる',
    english: [
      "bonding over boss complaints",
      "nothing brings coworkers together like complaining about the boss",
      "We spent the entire lunch break talking about how annoying our manager is",
      "Complaining about your boss is the most powerful team-building exercise ever invented. No corporate retreat, no trust fall, no escape room can create bonds as strong as a shared enemy. You could have nothing else in common with a coworker, but the moment you both roll your eyes at the same email, you are brothers in arms."
    ],
    context: "bond overは「~をきっかけに絆が生まれる」。bondは接着剤。共通の敵(上司)が接着剤になるのは人類の本能。英語のshared enemy(共通の敵)は友情の最短ルート。nothing brings people together likeは「~ほど人を結びつけるものはない」の型。",
    category: 'friends',
    subcategory: 'work-relationships',
    situation: '同僚と上司の愚痴で意気投合するとき',
  },

  // ── SNS・デジタル ──────────────────────────────
  {
    id: 'life-friends-041',
    japanese: 'インスタのストーリー誰が見たかチェックしちゃう',
    english: [
      "always check who viewed",
      "I always check who viewed my story, I cannot help it",
      "I keep checking my Instagram story views to see if a specific person watched it",
      "I posted a story twenty minutes ago. I have checked the viewer list nine times. I do not care about the forty people who watched it. I care about the one person who has not. And when they finally show up at view number forty-seven, I feel a relief that is completely disproportionate to the situation. Social media has turned us all into surveillance operators monitoring one specific target."
    ],
    context: "viewerは「見た人」。story viewsは「ストーリーの閲覧者リスト」。英語圏でもstory stalkingという自虐的な言い方がある。stalk=「ストーキングする」。見られた側じゃなく見る側が中毒になる設計。SNSの罠。",
    category: 'friends',
    subcategory: 'social-media',
    situation: 'ストーリーの閲覧者をチェックしてしまうとき',
  },
  {
    id: 'life-friends-042',
    japanese: 'フォロー外されてた',
    english: [
      "got unfollowed",
      "I just realized they unfollowed me, what the heck",
      "I noticed that someone I thought was a friend quietly unfollowed me on social media",
      "In 2026, unfollowing someone is the digital equivalent of crossing the street to avoid them. It is a conscious decision to remove someone from your feed, which means they thought about it. They went to your profile, they hovered over the button, and they pressed it. That is premeditated. That is first-degree unfollowing. I am pressing charges."
    ],
    context: "unfollowは「フォローを外す」。un-を付けるだけで反対動作になる英語の便利さ。日本語は「フォロー外す」と動詞+動詞だけど英語は接頭辞一発。get unfollowedで「外された」。受動態にするだけで被害者感が出る。",
    category: 'friends',
    subcategory: 'social-media',
    situation: 'フォローを外されていたことに気づいたとき',
  },
  {
    id: 'life-friends-043',
    japanese: 'SNSでは楽しそうなのに会うと普通だよね',
    english: [
      "different online",
      "they are so different online versus in person, honestly",
      "They seem like they are having the time of their life on social media but in person they are totally normal",
      "Their Instagram looks like a travel magazine. Every meal is photogenic. Every weekend is an adventure. Then you meet them in real life and they are eating leftover curry in sweatpants watching reruns. Which is fine. That is what everyone is actually doing. The gap between someone's online life and their real life is the biggest lie of our generation."
    ],
    context: "different onlineは「ネット上では別人」。in person(直接会うと)が対義語。英語ではonline personaという言い方もある。persona=「仮面」。SNSの自分は仮面。日本語の「ネットでは」と「リアルでは」の二重生活を一語で表す語がpersona。",
    category: 'friends',
    subcategory: 'social-media',
    situation: 'SNSと実際のギャップを感じるとき',
  },

  // ── 友情の本質 ──────────────────────────────
  {
    id: 'life-friends-044',
    japanese: '本当の友達は何人もいらない',
    english: [
      "quality over quantity",
      "when it comes to friends, quality over quantity all the way",
      "You do not need a lot of friends, just a few real ones",
      "I used to measure friendship in numbers. How many people came to my birthday. How many contacts in my phone. How many likes on my posts. Then life got hard and I found out that out of three hundred 'friends,' exactly four showed up. Four. And those four were worth more than the other two hundred and ninety-six combined. Math has never been more depressing and comforting at the same time."
    ],
    context: "quality over quantityは「量より質」。英語で最も有名な価値観フレーズの一つ。友達の文脈では a few real ones(少数の本物)が核心。real oneの「real」が重い。fake friendsの対義語としてのreal。SNS時代に改めて重みが増した表現。",
    category: 'friends',
    subcategory: 'philosophy',
    situation: '友達の数より質が大事だと感じるとき',
  },
  {
    id: 'life-friends-045',
    japanese: '友達に遠慮しすぎて疲れる',
    english: [
      "walking on eggshells",
      "I feel like I am walking on eggshells around them all the time",
      "I am so careful about what I say around certain friends that it is exhausting",
      "Real friendship should not require a script. But here I am, rehearsing every sentence before I say it because one wrong word might set them off. 'Can I say this? Is this offensive? Will they take it the wrong way?' If I need a legal team to review my casual conversation, maybe this is not friendship. Maybe this is hostage negotiation."
    ],
    context: "walking on eggshellsは「卵の殻の上を歩く」。割れないように慎重に、の比喩。日本語の「腫れ物に触るように」と完全対応。英語は卵、日本語は腫れ物。どちらも「壊れやすいものに注意して接する」。比喩の選び方にお国柄が出る。",
    category: 'friends',
    subcategory: 'philosophy',
    situation: '友達に気を使いすぎて疲れるとき',
  },
  {
    id: 'life-friends-046',
    japanese: '何も言わなくても気まずくない関係',
    english: [
      "comfortable silence",
      "we can sit in comfortable silence and that is everything",
      "The best kind of friendship is when you can be together without needing to talk",
      "The ultimate friendship test is not whether you can talk for hours. It is whether you can shut up for hours and still feel fine. Sitting in the same room, both on your phones, zero conversation, zero awkwardness. That is peak friendship. You have graduated from 'I need to entertain this person' to 'we are just existing in the same space and that is enough.'"
    ],
    context: "comfortable silenceは「心地よい沈黙」。comfortableがsilenceを修飾する瞬間、沈黙がポジティブになる。普通は沈黙=気まずいだけど、comfortable silenceは親密さの証。Pulp Fictionの有名なセリフでもある。",
    category: 'friends',
    subcategory: 'philosophy',
    situation: '何も話さなくても平気な友達といるとき',
  },
  {
    id: 'life-friends-047',
    japanese: 'あいつには何でも話せる',
    english: [
      "can tell them anything",
      "I can literally tell them anything and they will not judge me",
      "There is nothing I cannot talk to them about, they are the one person who never judges",
      "Everyone has a filter. The things you do not say at work, the thoughts you keep from your family, the feelings you hide from most friends. But there is that one person where the filter comes off completely. You can say the dumbest, most embarrassing, most unhinged thing and their response is just 'yeah that makes sense.' That person is irreplaceable. Protect them."
    ],
    context: "not judgeが核心。judge=「裁く」。日本語の「何でも話せる」の裏にあるのは「裁かれない安心感」。英語はそれを明示的に言う。no judgment zoneという表現もある。裁かないことが最高の友情スキルだと英語は定義している。",
    category: 'friends',
    subcategory: 'philosophy',
    situation: '何でも話せる親友について',
  },
  {
    id: 'life-friends-048',
    japanese: '友達の成功を素直に喜べない自分がいる',
    english: [
      "hard to be happy for them",
      "it is honestly hard to be genuinely happy for them sometimes",
      "Sometimes I struggle to feel truly happy when my friends succeed",
      "Nobody talks about this but everyone feels it. Your friend gets the promotion, the partner, the apartment, the life you wanted, and you smile and say congratulations while something ugly twists in your stomach. You hate yourself for feeling it. You know it is not a competition. But knowing and feeling are two different departments and they do not communicate well."
    ],
    context: "be happy for someoneは「誰かのために喜ぶ」。forが重要で、自分の喜びではなく「相手のために」の方向性がある。struggleは「もがく」。素直に喜べない葛藤をstruggle to be happy forと表現できる。英語は感情の方向まで前置詞で指定する。",
    category: 'friends',
    subcategory: 'philosophy',
    situation: '友達の成功に嫉妬してしまうとき',
  },

  // ── その他シチュエーション ──────────────────────────────
  {
    id: 'life-friends-049',
    japanese: '友達の紹介で会ったんだけど気まずかった',
    english: [
      "set up was awkward",
      "my friend set us up but it was painfully awkward honestly",
      "A friend introduced us thinking we would get along but it was really uncomfortable",
      "There should be a rule that if you introduce two friends, you have to stay for the first thirty minutes as a buffer. Instead, my friend said 'you two will get along great' and disappeared. Leaving two strangers sitting across from each other with nothing in common except the mutual friend who abandoned them. We talked about the weather for twelve minutes. The weather."
    ],
    context: "set upは「セッティングする」。友達を引き合わせる時にset them upと言う。恋愛の紹介にも使う。awkwardは気まずさの万能語。日本語の「紹介」は中立だけど、英語のset upには「お膳立て」の含みがあって、失敗すると責任がset upした側に行く。",
    category: 'friends',
    subcategory: 'social',
    situation: '友達の紹介で誰かと会ったとき',
  },
  {
    id: 'life-friends-050',
    japanese: '結局あいつが一番長い付き合いだな',
    english: [
      "longest friendship I have",
      "they are honestly the longest friendship I have got and it is not even close",
      "When I think about it, they are the friend I have known the longest out of everyone",
      "Fifteen years. Through school, jobs, breakups, moves, arguments, and stretches where we did not talk for months. But somehow we always end up back at the same ramen place having the same kinds of conversations. People come and go. Trends change. My entire personality has been rewritten twice. But this person is still in my life. At some point that stops being friendship and starts being family."
    ],
    context: "longest friendship I haveは「一番長い付き合い」。friendshipを時間で測る発想。英語は友情を長さ(longest)、深さ(deepest)、近さ(closest)で形容できる。「腐れ縁」に当たる英語はないけど、stops being friendship and starts being familyが近い。",
    category: 'friends',
    subcategory: 'philosophy',
    situation: '付き合いの長い友達について語るとき',
  },
];
