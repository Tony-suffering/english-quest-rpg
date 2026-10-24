import type { LifePhrase } from './life-phrases';

export const lovePhrases: LifePhrase[] = [
  // ── 出会い・気になる ──
  {
    id: 'life-love-001',
    japanese: 'なんかいい感じの人いるんだよね',
    english: [
      "seeing someone kinda",
      "there's this person I've been talking to",
      "so there's someone I've been hanging out with and it's going pretty well",
      "so there's this person. and we've been talking. and by 'talking' I mean we text every day and I overthink every single reply for twenty minutes before sending it. are we dating? I don't know. are we friends? also don't know. we're in that zone where nobody defines anything because defining it would ruin it."
    ],
    context: "「いい感じ」を英語にするのが地獄。英語圏ではtalking to someoneが「付き合ってないけどいい感じ」の定番。日本語の曖昧さが美徳なのに、英語は曖昧でも段階にラベルを貼る。talkingは「まだ何も確定してない関係」の隠語。",
    category: 'love',
    subcategory: 'new-interest',
    situation: '友達に恋バナするとき',
  },
  {
    id: 'life-love-002',
    japanese: '一目惚れした',
    english: [
      "love at first sight",
      "I fell for them the second I saw them",
      "the moment I saw them I just knew, it was love at first sight",
      "I walked in and there they were and my brain just went offline. completely. I forgot what I was doing, where I was going, my own name probably. people say love at first sight isn't real but my heart rate would like to respectfully disagree. it went from resting to cardio in about half a second."
    ],
    context: "一目惚れ=love at first sight。英語も日本語も「最初の視線で恋に落ちる」という構造が同じ珍しいケース。ただしfell forのfallが重要。英語では恋=落ちるもの。fall in love。日本語は「惚れる」で能動的だけど、英語は重力に負けて落下するイメージ。恋は事故。",
    category: 'love',
    subcategory: 'new-interest',
    situation: '友達に報告するとき',
  },
  {
    id: 'life-love-003',
    japanese: 'タイプなんだよね',
    english: [
      "totally my type",
      "they're exactly my type honestly",
      "I don't know what it is but they're just completely my type",
      "they're my type. like, dangerously my type. the kind of type where my friends look at me and go 'oh no' because they know I'm about to make terrible decisions. I have a type and my type has a type and unfortunately those two types have never overlapped. but this time. maybe this time."
    ],
    context: "typeは英語でもそのまま通じる。ただし日本語の「タイプ」はもう少し広い。英語のmy typeは見た目+雰囲気+性格の総合判定。they're my typeは「理屈じゃなく全部が刺さる」のニュアンス。日本語みたいに「顔がタイプ」と限定したい時はmy type looks-wiseと補足する。",
    category: 'love',
    subcategory: 'new-interest',
    situation: '好みの人を見つけたとき',
  },
  {
    id: 'life-love-004',
    japanese: '気になってる人がいる',
    english: [
      "someone on my mind",
      "there's someone I can't stop thinking about",
      "I've had this person on my mind lately and I can't shake it",
      "there's someone. I'm not going to say who. but every time my phone buzzes I check if it's them. it's never them. it's always my credit card company telling me I'm broke. but for that one second before I look at the screen, there's hope. and honestly I'm living for that one second right now."
    ],
    context: "「気になる」の英語が難しい。interestedだとビジネスっぽい。on my mindが近い。can't stop thinking aboutは強め。英語は「頭の中にいる=気になってる」の構造。日本語の「気になる」は軽いのに、英語で言うとどれも重くなる問題。",
    category: 'love',
    subcategory: 'new-interest',
    situation: '自分の気持ちに気づいたとき',
  },

  // ── マッチングアプリ ──
  {
    id: 'life-love-005',
    japanese: 'マッチングアプリ始めた',
    english: [
      "got on the apps",
      "I downloaded a dating app, no judgment please",
      "I finally caved and signed up for a dating app",
      "I got on the apps. yes, the apps. plural. because apparently one avenue of rejection wasn't enough for me. I needed to be rejected across multiple platforms simultaneously. my bio says 'easy-going' which is a lie. I'm the least easy-going person I know. but that's what you write. everyone lies on dating apps. it's basically the rule."
    ],
    context: "英語圏ではdating appが正式名。でも日常会話ではthe appsで通じる。「アプリやってる？」=Are you on the apps?。on=プラットフォームに乗ってるイメージ。日本語の「マッチングアプリ」は英語だとmatching appと言わない。datingが前につく。",
    category: 'love',
    subcategory: 'dating-apps',
    situation: '友達にカミングアウトするとき',
  },
  {
    id: 'life-love-006',
    japanese: 'プロフィール写真詐欺だった',
    english: [
      "total catfish",
      "their pics were nothing like the real thing",
      "I showed up and they looked nothing like their profile pictures",
      "so I get to the restaurant and I'm looking around for this person and I cannot find them. because the person I'm looking for does not exist. their profile picture was from 2019 and apparently a lot can happen in seven years. I'm not saying I'm perfect either but at least my photos are from this calendar year. that should be the bare minimum."
    ],
    context: "catfish=プロフ詐欺の人、という動詞にもなる英語スラング。元はドキュメンタリー映画のタイトル。I got catfished=写真と別人が来た。日本語の「写真詐欺」は冗談半分だけど、英語のcatfishはもっと深刻なニュアンスも含む。ネット文化発の言葉。",
    category: 'love',
    subcategory: 'dating-apps',
    situation: 'マッチングアプリで会った後',
  },
  {
    id: 'life-love-007',
    japanese: 'いいねしたのに返ってこない',
    english: [
      "left on read basically",
      "I liked their profile and got absolutely nothing back",
      "I swiped right on them and they didn't match with me and that stings a little",
      "I liked their profile. put thought into it. read their bio. we had things in common. sent a like. waited. nothing. refreshed the app. nothing. checked my wifi. it's working. so the problem isn't technical. the problem is me. and you know what, that's fine. I'm used to being the problem. I've been the problem my whole life."
    ],
    context: "swipe right=いいね、swipe left=スルー。Tinderが生んだ文化用語。left on readは「既読スルー」で恋愛以外でも使う。英語では「いいね」の概念がアプリごとに違うけど、swipe right/leftはもう共通言語。身体動作がそのまま判定になった言葉。",
    category: 'love',
    subcategory: 'dating-apps',
    situation: 'マッチングアプリで落ち込んだとき',
  },

  // ── デート ──
  {
    id: 'life-love-008',
    japanese: '今度ご飯行かない？',
    english: [
      "wanna grab food",
      "hey, wanna grab something to eat sometime",
      "so I was thinking, do you want to go grab food sometime this week",
      "so this is going to sound casual but I've actually rehearsed this seventeen times in the mirror. do you want to grab food sometime? see, that sounded natural. I'm very proud of myself. please say yes because my backup plan was to pretend I was joking and I really don't want to have to activate the backup plan."
    ],
    context: "grab food/grab a biteがカジュアルな誘い方の鉄板。go to dinnerだとフォーマルすぎてデート感が強い。grabは「ちょっとつかむ」のイメージで、重くならない。日本語の「ご飯行かない？」の軽さにはgrabが一番近い。let's get dinnerだと宣言になる。",
    category: 'love',
    subcategory: 'dating',
    situation: '気になる人を誘うとき',
  },
  {
    id: 'life-love-009',
    japanese: 'どこ行きたい？なんでもいいよ',
    english: [
      "your call",
      "wherever you want, I'm down for anything",
      "I'm totally fine with whatever, you pick the place",
      "wherever you want. I'm easy. and I know 'I'm easy' sounds like I have no personality but actually I just genuinely do not care where we eat. as long as there's food and you're there, I'm happy. that sounded romantic but I mostly just meant the food part. the you part is a bonus. a big bonus. but still."
    ],
    context: "your call=あなたが決めて。I'm downは「乗った、いいよ」の超カジュアル表現。日本語の「なんでもいいよ」は優柔不断に聞こえるけど、英語でI'm down for anythingと言うとむしろポジティブ。「何が来ても楽しめる」のニュアンス。日本語と真逆の印象。",
    category: 'love',
    subcategory: 'dating',
    situation: 'デートの場所を決めるとき',
  },
  {
    id: 'life-love-010',
    japanese: '緊張しすぎてなに喋ったか覚えてない',
    english: [
      "blacked out nervously",
      "I was so nervous I don't remember a single thing I said",
      "I was so nervous on that date that I have zero memory of what I talked about",
      "I have no idea what I said. none. my mouth was moving and words were coming out but my brain was not involved in that process at all. I might have told them about my childhood hamster. I might have explained the plot of a movie they didn't ask about. I genuinely do not know. all I know is I smiled a lot and probably too much."
    ],
    context: "英語のnervousは日本語の「緊張」より幅が広い。「ドキドキ」も「不安」もnervous。I blacked outは「記憶が飛んだ」。酒の場面でよく使うけど緊張でも使える。日本語は「緊張して頭真っ白になった」だけど、英語はblank outやblack outで「画面が消えた」メタファー。",
    category: 'love',
    subcategory: 'dating',
    situation: '初デート後に友達に報告',
  },
  {
    id: 'life-love-011',
    japanese: '割り勘にする？',
    english: [
      "split it",
      "should we split the bill or what",
      "do you want to split the check or should I just get this one",
      "so the check comes and now we're in the most awkward two seconds of any date. who reaches first. do I offer to pay? do I offer to split? if I offer to pay is that outdated? if I offer to split is that cheap? there's no right answer here. somebody invented going dutch and that person was a genius because at least it has a name now."
    ],
    context: "split the bill/check=割り勘。going dutchも同じ意味だけど少し古い表現。英語圏のデートでは誰が払うか問題が日本以上にセンシティブ。I'll get thisは「ここは俺が出すよ」。日本語の「割り勘ね」の軽さが英語だと一大イベントになる文化差。",
    category: 'love',
    subcategory: 'dating',
    situation: '食事の会計のとき',
  },
  {
    id: 'life-love-012',
    japanese: '2回目のデートに誘われた',
    english: [
      "asked me out again",
      "they actually asked me out for a second date",
      "they texted me the next day and asked if I wanted to hang out again",
      "they asked me out again. a second date. me. the person who accidentally knocked over a glass of water on the first date. they saw that and thought 'yeah, I want more of this.' which either means I'm charming or they have very low standards. either way I'm available Saturday."
    ],
    context: "ask outは「デートに誘う」の定番。ask me on a dateより軽い。英語ではfirst date, second dateと回数を数える文化が強い。third dateには特別な意味がある(関係が進む暗黙の了解)。日本語は回数を数える文化がそこまでない。",
    category: 'love',
    subcategory: 'dating',
    situation: 'デート後に嬉しい連絡が来たとき',
  },

  // ── 告白・付き合う ──
  {
    id: 'life-love-013',
    japanese: '付き合ってください',
    english: [
      "be with me",
      "I want us to be official, like for real",
      "I really like you and I want to make this official if you're down",
      "okay so I'm just going to say it. I like you. a lot. and I want to be with you. not in the vague 'we're hanging out' way. in the actual 'you're my person' way. I practiced this speech in the shower and it was way better there. the acoustics really helped. but the sentiment is the same. will you be my person?"
    ],
    context: "日本語の「付き合う」に直訳がない。これが最大の壁。英語にはbe officialやbe exclusiveがあるけど、日本語の「告白→付き合う」の儀式が英語圏にはない。DTR(Define The Relationship)という会話で関係を定義する。告白文化vs確認文化。",
    category: 'love',
    subcategory: 'confession',
    situation: '告白するとき',
  },
  {
    id: 'life-love-014',
    japanese: 'フラれた',
    english: [
      "got rejected",
      "they turned me down and I'm still processing it",
      "I told them how I felt and they didn't feel the same way",
      "I put it all out there. my feelings. on the table. vulnerable. raw. real. and they looked at me and said 'I think you're really great but.' and the second you hear 'but' after 'you're really great' it's over. nothing good follows that but. that but is a trapdoor. you fall right through it into the land of people who tried and failed."
    ],
    context: "got rejectedが直球。turned me downは「断られた」のソフト版。英語のrejectionは恋愛だけじゃなく就活でもよく使う。日本語の「フラれた」は恋愛専用だけど、英語のrejectは汎用。恋愛固有なのはturned downやshot down(撃ち落とされた)のほうが近い。",
    category: 'love',
    subcategory: 'confession',
    situation: '告白して振られた後',
  },
  {
    id: 'life-love-015',
    japanese: '友達としか見れない',
    english: [
      "just friends vibes",
      "I only see them as a friend, nothing more",
      "I like them as a person but I just can't see them that way romantically",
      "they're great. genuinely great. the kind of person you want to be around. but when I try to imagine kissing them my brain just goes 'error 404: romance not found.' and I can't force it. you can't manufacture that spark. it's either there or it's not and in this case it is aggressively not there."
    ],
    context: "I see them as a friendが定番。英語のfriend zoneは名詞にも動詞にもなる。I got friend-zoned=友達ゾーンに入れられた。日本語の「友達としか見れない」は自分視点だけど、英語のfriend-zoneは相手から「お前はここ」と場所を指定される受動的なイメージ。",
    category: 'love',
    subcategory: 'confession',
    situation: '気持ちに応えられないとき',
  },

  // ── 片思い ──
  {
    id: 'life-love-016',
    japanese: '片思いがつらい',
    english: [
      "unrequited pain",
      "having feelings for someone who doesn't feel the same hurts",
      "one-sided love is honestly one of the most exhausting things you can go through",
      "I like someone who doesn't like me back. and I know they don't like me back because I have eyes and basic pattern recognition. they treat me like a buddy. they call me 'dude.' nobody calls the person they're romantically interested in 'dude.' the word dude has never in history led to a wedding. I need to move on but my heart didn't get the memo."
    ],
    context: "片思い=unrequited love（文学的）かone-sided love（日常的）。crush on someoneは「片思い中」のカジュアル版。I have a crush on them。英語のcrushは「押しつぶす」が原義。好きすぎて心が潰れるイメージ。日本語の「片」(一方通行)とは違う発想。",
    category: 'love',
    subcategory: 'unrequited',
    situation: '片思いで苦しいとき',
  },
  {
    id: 'life-love-017',
    japanese: '目が合うとドキドキする',
    english: [
      "heart skips a beat",
      "every time we make eye contact my heart goes crazy",
      "whenever our eyes meet my heart starts racing and I completely forget how to act normal",
      "we made eye contact today. for like two seconds. and in those two seconds my body decided to activate every single stress response it has. heart rate up. palms sweating. brain offline. all because another human looked in my direction. this is not a proportional response. my nervous system needs to calm down."
    ],
    context: "ドキドキの英語表現が豊富。heart races, heart pounds, heart skips a beat, butterflies in my stomach。全部「心臓」か「胃」で身体反応を描写する。日本語のオノマトペ「ドキドキ」は音で表現。英語は音じゃなく動作で描写する言語。skip a beatは「一拍飛ぶ」。",
    category: 'love',
    subcategory: 'unrequited',
    situation: '好きな人と目が合ったとき',
  },
  {
    id: 'life-love-018',
    japanese: '既読スルーされた、脈ないのかな',
    english: [
      "left on read again",
      "they left me on read, pretty sure that's not a good sign",
      "they saw my message and didn't reply and now I'm spiraling",
      "left on read. again. and I know I should play it cool but instead I'm analyzing the message I sent like it's a crime scene. was it the emoji? was it too many words? too few words? should I have waited longer to reply? the rules of texting are more complex than tax law and nobody gave me the manual."
    ],
    context: "left on read=既読スルー。readは「開封済み」の意味でそのままreadを使う。英語圏でもleft on readは大ダメージ。seenとも言う(Facebookのseen表示から)。ghosted(幽霊化)は返信が永遠に来ないバージョン。日本語の「既読」がそのまま英語の概念になった珍しい例。",
    category: 'love',
    subcategory: 'unrequited',
    situation: 'LINEの返信が来ないとき',
  },

  // ── 交際中 ──
  {
    id: 'life-love-019',
    japanese: '彼氏/彼女できた',
    english: [
      "in a relationship now",
      "I'm officially seeing someone, it's actually happening",
      "so yeah, I have a boyfriend/girlfriend now and I still can't believe it",
      "I have a significant other. me. the person who couldn't get a text back three months ago. I'm in an actual relationship with an actual human who actually chose to be with me on purpose. not by accident. on purpose. I keep waiting for the hidden camera crew to come out because this does not feel real."
    ],
    context: "significant other(SO)は性別を問わない便利な言い方。partner, boyfriend, girlfriend, 最近はpersonも使う。日本語の「彼氏/彼女」は性別固定だけど、英語はpartnerやSOで性別を曖昧にできる。関係の呼び方が多い=社会的な配慮が言語に埋め込まれてる。",
    category: 'love',
    subcategory: 'relationship',
    situation: '友達に報告するとき',
  },
  {
    id: 'life-love-020',
    japanese: 'のろけてごめん',
    english: [
      "sorry for bragging",
      "sorry I keep talking about them, I can't help it",
      "I know I'm being that annoying couple person right now but I just can't stop",
      "I'm sorry. I know I'm being insufferable right now. every sentence I say starts with 'my partner' this and 'my partner' that. I've become the exact kind of person I used to roll my eyes at. and I would stop but every time I try to talk about something else my brain goes 'but have you told them about Tuesday?' no brain. stop."
    ],
    context: "「のろけ」にぴったりの英語がない。bragging about your relationship、gushingが近い。TMI(Too Much Information)も関連。英語圏ではPDA(Public Display of Affection=人前でイチャイチャ)を嫌う文化がある。のろけは言葉版のPDA。",
    category: 'love',
    subcategory: 'relationship',
    situation: '友達の前で恋人の話をしすぎたとき',
  },
  {
    id: 'life-love-021',
    japanese: '記念日忘れてた',
    english: [
      "forgot our anniversary",
      "I completely blanked on our anniversary date",
      "I forgot our anniversary and I have never felt more panic in my life",
      "I forgot our anniversary. and I didn't just forget it. I forgot it on the actual day while they were sitting across from me at dinner clearly waiting for me to say something. and I said 'this pasta is great.' and they said 'is that all?' and in that moment I saw my entire life flash before my eyes."
    ],
    context: "anniversaryは「記念日」だけど英語圏では結婚記念日のイメージが強い。付き合った記念日はour anniversary。monthlyで祝う文化は日本ほど強くない。blanked on=完全に忘れた(頭が白紙になった)。英語は「忘れた」にもforgot, blanked, slipped my mindと段階がある。",
    category: 'love',
    subcategory: 'relationship',
    situation: '記念日をやらかしたとき',
  },
  {
    id: 'life-love-022',
    japanese: '甘えたい',
    english: [
      "need some affection",
      "I just want to be held right now honestly",
      "I'm in one of those moods where I just want to cuddle and not think about anything",
      "I want to be held. I want someone to play with my hair and tell me everything is going to be okay even if it's not. I want to be the little spoon. I don't care how tall I am. height has nothing to do with spoon eligibility. being the little spoon is a human right and I will die on this hill."
    ],
    context: "「甘える」は日本語特有の概念。英語に直訳がない。be affectionate、cuddly、clingyは全部ニュアンスが違う。clingyはネガティブ（ベタベタしすぎ）。cuddleが一番近いけど「甘える」の精神的依存感がない。日本語の「甘え」は土居健郎が本を書くレベルの文化概念。",
    category: 'love',
    subcategory: 'relationship',
    situation: '恋人に甘えたいとき',
  },

  // ── 喧嘩 ──
  {
    id: 'life-love-023',
    japanese: '些細なことで喧嘩した',
    english: [
      "dumb fight again",
      "we had a fight over literally the stupidest thing",
      "we got into an argument over something so small and it blew up into this whole thing",
      "we had a fight. about the dishes. the dishes. not money, not values, not life direction. dishes. specifically, whether the pan goes in the dishwasher or not. and somehow that turned into a forty-minute conversation about respect and consideration and who does more around the house. all because of a pan. a non-stick pan, to be specific."
    ],
    context: "got into an argument=喧嘩になった。had a fightでもいい。blew upは「爆発した→大事になった」。英語では喧嘩の原因を強調する文化がある。fought over=〜について喧嘩。日本語の「些細なこと」は英語だとsomething stupid/small/pettyで、自虐的に原因を矮小化する。",
    category: 'love',
    subcategory: 'fight',
    situation: '友達に喧嘩の報告をするとき',
  },
  {
    id: 'life-love-024',
    japanese: 'もう話しかけないで',
    english: [
      "don't talk to me",
      "I need you to not talk to me right now",
      "I'm too upset to have this conversation, please just give me some space",
      "do not talk to me right now. not because I hate you. I don't hate you. but if you talk to me right now I'm going to say something I regret and then we'll have two problems instead of one. so for the sake of this relationship and your feelings and also because I have zero emotional regulation right now, silence. please."
    ],
    context: "give me spaceは「距離を置いて」の定番。I need space=距離が必要。日本語の「話しかけないで」は命令だけど、英語では感情的な理由を添えることが多い。I need a minute, I need to cool downなど「冷却時間が必要」という表現が好まれる。直接的な拒絶より理由付き要求。",
    category: 'love',
    subcategory: 'fight',
    situation: '喧嘩がヒートアップしたとき',
  },
  {
    id: 'life-love-025',
    japanese: 'こっちが悪かったよ、ごめん',
    english: [
      "my bad, I'm sorry",
      "you're right, that was on me and I'm sorry",
      "I thought about it and I was wrong, I'm really sorry for what I said",
      "okay. I was wrong. I know that. you know that. the neighbors probably know that too because we were not being quiet about it. and I'm sorry. not the fake sorry where I'm just saying it to end the fight. the real sorry. the one where I actually understand what I did and I'm not going to do it again. probably. I'm going to try very hard not to do it again."
    ],
    context: "that was on me=俺が悪かった。my bad=ごめん(軽め)。I was wrong=私が間違ってた(しっかり認める)。英語では謝罪の重さが表現で変わる。sorry<I apologize<I was wrongの順で重くなる。日本語の「ごめん」は一語で済むけど、英語は具体的に何が悪かったか言わないと軽く聞こえる。",
    category: 'love',
    subcategory: 'fight',
    situation: '自分が悪いと気づいたとき',
  },
  {
    id: 'life-love-026',
    japanese: '仲直りした',
    english: [
      "made up already",
      "we talked it out and we're good now",
      "we had a long conversation and worked through it and I think we're stronger for it",
      "we made up. it took three hours, two apologies, one very honest conversation, and a hug that lasted way too long. but we're good. we're actually better than good. sometimes you need a fight to say the things you've been holding in. it's like a pressure valve. terrible in the moment. necessary in the long run."
    ],
    context: "made up=仲直りした。talked it out=話し合って解決した。worked through it=乗り越えた。英語には「仲直り」の段階がある。made upは結果、talked it outはプロセス、worked throughは努力感。日本語の「仲直り」は一発で終わるけど、英語は解決の過程を動詞で描写する。",
    category: 'love',
    subcategory: 'fight',
    situation: '喧嘩の後に仲直りした報告',
  },

  // ── 嫉妬・束縛 ──
  {
    id: 'life-love-027',
    japanese: '誰とLINEしてんの？',
    english: [
      "who's that texting you",
      "who are you texting that's making you smile like that",
      "I noticed you've been on your phone a lot lately, who are you talking to",
      "so you're smiling at your phone. which is fine. people smile at phones. but you never smile at your phone like that when I text you. I get the neutral face. maybe a brief exhale through the nose. but whoever that is gets the full smile. the teeth smile. I'm not jealous. I'm making observations. there's a difference."
    ],
    context: "who are you textingが直訳。英語では嫉妬の質問を間接的にする傾向がある。who's thatは相手を特定する質問。日本語は「誰とLINEしてんの」でストレートに聞けるけど、英語で直球すぎるとcontrolling(束縛的)と思われる。だから観察→質問の順で聞く。",
    category: 'love',
    subcategory: 'jealousy',
    situation: '恋人がスマホを見て笑ってるとき',
  },
  {
    id: 'life-love-028',
    japanese: 'やきもち焼いてるの？',
    english: [
      "oh you're jealous",
      "wait, are you actually jealous right now",
      "hold on, is this jealousy I'm seeing or am I reading this wrong",
      "oh. oh this is jealousy. I know this face. this is the face that says 'I'm completely fine' while radiating the energy of someone who is not even slightly fine. and you know what? it's kind of adorable. I shouldn't say that. saying jealousy is adorable is probably not the right move. but it is. a little. don't be mad."
    ],
    context: "jealousは「嫉妬してる」。英語ではjealousとenvyは違う。jealous=自分の持ってるものを奪われる不安。envy=他人が持ってるものが欲しい。日本語の「やきもち」は可愛い響きだけど、英語のjealousyはもっと重い。cute jealousyという概念が英語にはあまりない。",
    category: 'love',
    subcategory: 'jealousy',
    situation: '恋人がやきもちを焼いてるのに気づいたとき',
  },
  {
    id: 'life-love-029',
    japanese: '束縛しすぎだよ',
    english: [
      "way too controlling",
      "you're being really controlling and it's not okay",
      "I need you to trust me more because this level of control isn't healthy for either of us",
      "I love you but I also need to be a person. a separate, individual person with my own life and my own friends and the ability to go to the convenience store without filing a flight plan. I don't need to check in every thirty minutes. I'm not a pilot. this is not air traffic control. this is a relationship. trust is the whole point."
    ],
    context: "controllingが「束縛」の英語。possessiveも近い（所有欲が強い）。clingyは「べったり」で束縛よりソフト。英語圏では束縛=red flag(危険信号)の認識が強い。日本語の「束縛」はグレーゾーンだけど、英語のcontrollingはほぼ確実にネガティブ。文化的な許容範囲が違う。",
    category: 'love',
    subcategory: 'jealousy',
    situation: '恋人に束縛されてると感じたとき',
  },

  // ── 浮気 ──
  {
    id: 'life-love-030',
    japanese: '浮気してるでしょ',
    english: [
      "you're cheating",
      "I know you're seeing someone else, don't lie",
      "something's been off and I think you've been seeing someone behind my back",
      "I'm going to ask you something and I need you to be honest. are you seeing someone else? because the math isn't adding up. you're 'working late' three times a week now. you guard your phone like it contains nuclear launch codes. and you smell like a perfume that I definitely don't own. so. the floor is yours."
    ],
    context: "cheating=浮気。seeing someone behind my back=裏で誰かと会ってる。英語ではcheatingの定義が人によって違う議論が永遠にある。emotional cheating(心の浮気)とphysical cheating(体の浮気)を分ける。日本語の「浮気」は両方含むけど、英語は分けて議論する文化。",
    category: 'love',
    subcategory: 'cheating',
    situation: '浮気を疑ったとき',
  },
  {
    id: 'life-love-031',
    japanese: '浮気されてた',
    english: [
      "got cheated on",
      "I found out they've been cheating on me this whole time",
      "turns out they were seeing someone else behind my back for months",
      "they cheated on me. found out yesterday. and you know what the worst part is? not the betrayal. not the lying. the worst part is that my first instinct was to text them about it. because they're the person I tell everything to. and now they're the person who did the thing I need to tell someone about. that's the cruelest part of cheating. it takes away the one person you'd normally go to."
    ],
    context: "got cheated on=浮気された。受動態で「された」のニュアンス。found outは「発覚した」。behind my backは「背中の後ろで=こっそり」。英語では浮気の発覚をfound outで表現する。日本語は「バレた」(加害者視点)と「知った」(被害者視点)があるけど、英語はfound outで被害者視点が基本。",
    category: 'love',
    subcategory: 'cheating',
    situation: '浮気が発覚したとき',
  },

  // ── 別れ ──
  {
    id: 'life-love-032',
    japanese: '別れよう',
    english: [
      "let's break up",
      "I think we should end this, for real this time",
      "I've been thinking about this for a while and I think we need to go our separate ways",
      "I've been trying to figure out how to say this and there's no good way so I'm just going to say it. I think we should break up. and I know that sounds sudden but it's not. I've been sitting with this for weeks. turning it over. trying to find the angle where it works. and there isn't one. sometimes two good people just don't work together. and that's what this is."
    ],
    context: "break upが定番。go our separate ways=別々の道を行く(フォーマル)。end things=終わりにする。call it quits=やめにする。英語は別れの表現が多い。日本語の「別れよう」は一言だけど、英語は重さに応じて使い分ける。let's break upは直球、I think we should...は婉曲。",
    category: 'love',
    subcategory: 'breakup',
    situation: '別れを切り出すとき',
  },
  {
    id: 'life-love-033',
    japanese: 'まだ好きなんだけどね',
    english: [
      "still have feelings",
      "I still care about them, that's the hard part",
      "the feelings didn't just disappear because we broke up, that's not how it works",
      "I still like them. that's the thing nobody tells you about breakups. the feelings don't have an off switch. you can't just decide to stop caring about someone. the relationship ended but the feelings didn't get the memo. they're still showing up to work every day like nothing happened. very committed. wish they had this energy when I was actually in the relationship."
    ],
    context: "still have feelingsは「まだ気持ちがある」。英語ではfeelings=恋愛感情の暗黙の了解がある。I have feelings for youと言えば「好き」の意味。日本語の「好き」は直球だけど、英語のfeelingsは曖昧。何のfeelingかは文脈で判断。でも恋愛の話でfeelingsと言えば100%恋愛。",
    category: 'love',
    subcategory: 'breakup',
    situation: '別れた後に気持ちが残ってるとき',
  },
  {
    id: 'life-love-034',
    japanese: '元カレ/元カノの荷物どうしよう',
    english: [
      "their stuff's still here",
      "my ex's stuff is still at my place and it's haunting me",
      "they left a bunch of their things at my apartment and I don't know what to do with it",
      "their toothbrush is still in my bathroom. and a hoodie. and three books they'll never come back for. and every time I see that hoodie I think about returning it. and then I think about not returning it. and then I wear it because it's comfortable and nobody's watching. is that weird? that's weird. I should put it in a box. I'm going to put it in a box. tomorrow."
    ],
    context: "ex=元カレ/元カノ。my ex's stuffは「元恋人の荷物」。英語ではexの荷物を返す/返さない問題がドラマの定番ネタ。closure(ケジメ・区切り)という概念が英語にはある。荷物を返すのはclosureの一部。日本語にはclosureの直訳がない。「ケジメ」が一番近いけど意味が違う。",
    category: 'love',
    subcategory: 'breakup',
    situation: '別れた後に荷物が残ってるとき',
  },
  {
    id: 'life-love-035',
    japanese: '引きずってるわ',
    english: [
      "not over it yet",
      "I'm definitely not over them and it shows",
      "I keep telling people I've moved on but honestly I haven't even started",
      "I'm not over it. I changed my phone wallpaper. deleted the photos. unfollowed on everything. did all the breakup checklist stuff. and then last night I heard a song that we used to listen to together and I sat in my car for twenty minutes doing absolutely nothing. so no. I have not moved on. the checklist lied."
    ],
    context: "not over them=まだ引きずってる。get overは「乗り越える」。moved on=前に進んだ。英語では「引きずる」を「上を越えられない」(get over)か「前に進めない」(move on)で表現する。日本語の「引きずる」は後ろに引っ張られるイメージ。英語は「前に進めない」が基本メタファー。方向が違う。",
    category: 'love',
    subcategory: 'breakup',
    situation: '別れた後に引きずってるとき',
  },

  // ── 復縁 ──
  {
    id: 'life-love-036',
    japanese: 'やり直したい',
    english: [
      "want them back",
      "I want to give it another shot if they're willing",
      "I know we ended things but I can't stop thinking about trying again",
      "I want to try again. and I know the definition of insanity is doing the same thing and expecting different results but what if this time we're different? we've both had time to think. to grow. to realize that the grass isn't greener on the other side. the grass is just grass. and our grass was pretty good grass. I miss our grass. that metaphor got away from me."
    ],
    context: "give it another shot=もう一回やってみる。try again=やり直す。get back togetherは「復縁する」の定番。英語では復縁にsecond chanceの概念がセットでつく。日本語の「やり直す」はプロセスを強調するけど、英語のsecond chanceは「もう一回チャンスをくれ」とお願いのニュアンス。",
    category: 'love',
    subcategory: 'reconciliation',
    situation: '復縁を考えてるとき',
  },
  {
    id: 'life-love-037',
    japanese: '元カレ/元カノから連絡きた',
    english: [
      "my ex texted me",
      "my ex hit me up out of nowhere and I panicked",
      "I got a random text from my ex last night and I have no idea what to do about it",
      "my ex texted me at 11pm. eleven pm. not noon. not a reasonable hour. eleven pm on a Thursday. and the message was 'hey, how have you been?' and I stared at that message for so long my phone screen turned off. twice. how have I been? I've been fine. I've been moving on. and now you're texting me at eleven pm undoing months of progress in five words."
    ],
    context: "hit me up=連絡してきた(カジュアル)。reached outはフォーマル。slid into my DMsはSNS経由。英語では元恋人からの連絡時間帯に意味がある。late night text=深夜テキスト=未練の象徴。日本語でも「夜中に連絡」は意味深だけど、英語圏ではlate night textがもうジャンルとして確立してる。",
    category: 'love',
    subcategory: 'reconciliation',
    situation: '元恋人から連絡が来たとき',
  },

  // ── 遠距離 ──
  {
    id: 'life-love-038',
    japanese: '遠距離恋愛ってまじでつらい',
    english: [
      "long distance is brutal",
      "long distance relationships are way harder than people think",
      "being in a long distance relationship tests every single part of you and it's exhausting",
      "people say distance makes the heart grow fonder and those people have clearly never been in a long distance relationship. distance makes the heart grow anxious. distance makes the heart overthink every unanswered text. distance makes you pay for plane tickets you can't afford. my heart isn't growing fonder. my heart is growing frequent flyer miles."
    ],
    context: "long distance relationship(LDR)=遠距離恋愛。distance makes the heart grow fonderは有名なことわざ「離れると心が深まる」。でも実際はmakes the heart grow anxiousという皮肉がよく使われる。英語圏でもLDRは大変だという共通認識。日本語と同じ。",
    category: 'love',
    subcategory: 'long-distance',
    situation: '遠距離恋愛中の愚痴',
  },
  {
    id: 'life-love-039',
    japanese: '次いつ会えるかわかんないのがしんどい',
    english: [
      "no next date set",
      "not knowing when I'll see them next is killing me",
      "the hardest part of long distance is not having a date on the calendar for the next visit",
      "the worst part isn't the distance. the worst part is the uncertainty. if someone told me 'you'll see them in exactly forty-two days' I could handle that. I'd mark it on my calendar. I'd count down. I'd have something to hold onto. but 'I don't know when' is a special kind of torture. my brain needs a deadline or it starts spiraling. and right now it's spiraling."
    ],
    context: "killing me=しんどい(比喩的に「殺してる」)。英語では感情の強さをkilling, destroying, breaking meで表現する。大げさだけどこれが普通。日本語の「しんどい」は控えめ。英語は感情を大きく表現するのが文化。日本語基準だと英語は常にオーバーリアクション。",
    category: 'love',
    subcategory: 'long-distance',
    situation: '次の再会が決まらないとき',
  },

  // ── 結婚 ──
  {
    id: 'life-love-040',
    japanese: '結婚っていつ頃考えてる？',
    english: [
      "thought about marriage",
      "so have you thought about where this is going long-term",
      "I don't want to pressure you but I've been wondering if marriage is something you see for us",
      "so. marriage. I'm going to bring it up. I know it's scary. it's scary for me too. but we've been together long enough that I think we should at least talk about whether we're on the same page. because if you're thinking 'maybe in five years' and I'm thinking 'maybe next year' then we have a math problem. and I'm bad at math but I can spot that one."
    ],
    context: "where this is going=この関係はどこに向かってるの。英語ではhaving the marriage talkという概念がある。「結婚の話をする」が一つのイベント。日本語は「結婚どう思う？」で軽く聞けるけど、英語ではthe talkと呼ばれるほど重い会話。the talk=人生の方向性を確認する儀式。",
    category: 'love',
    subcategory: 'marriage',
    situation: '結婚について切り出すとき',
  },
  {
    id: 'life-love-041',
    japanese: 'プロポーズされた',
    english: [
      "they proposed",
      "they got down on one knee and I completely lost it",
      "they proposed to me last night and I cried so hard I couldn't even say yes properly",
      "they proposed. got down on one knee. the whole thing. and I had imagined this moment a thousand times in my head and in every version I was composed and graceful and said something beautiful. in reality I said 'wait are you serious' three times and then ugly cried for five minutes. they took that as a yes. which it was. obviously. but it was the least elegant yes in proposal history."
    ],
    context: "got down on one knee=片膝をついた(プロポーズの定番姿勢)。popped the question=プロポーズした(カジュアル)。英語圏のプロポーズは演出が大事。日本語の「結婚してください」はシンプルだけど、英語ではwill you marry meの前にスピーチがつくのが文化。",
    category: 'love',
    subcategory: 'marriage',
    situation: 'プロポーズされたとき',
  },

  // ── 倦怠期 ──
  {
    id: 'life-love-042',
    japanese: 'なんかマンネリだよね',
    english: [
      "we're in a rut",
      "things feel kind of stale between us lately",
      "I love them but honestly our relationship feels like it's on autopilot right now",
      "we eat at the same restaurant. watch the same shows. have the same conversations. I can predict what they're going to say before they say it. and they can predict what I'm going to say before I say it. we've become a very efficient communication system. zero surprises. maximum predictability. which is great for a factory but terrible for a relationship."
    ],
    context: "in a rut=マンネリ(轍にハマってる)。stale=新鮮さがない。on autopilot=自動操縦。英語ではrut(轍・溝)のメタファーが強い。同じ道を繰り返し通って溝ができて抜け出せない。日本語の「マンネリ」は英語のmannerismから来たけど、英語では恋愛にmannerismを使わない。in a rutが正解。",
    category: 'love',
    subcategory: 'stagnation',
    situation: '関係がマンネリ化してきたとき',
  },
  {
    id: 'life-love-043',
    japanese: 'ときめかなくなった',
    english: [
      "spark's gone",
      "that butterfly feeling is just gone now",
      "I don't feel that excitement anymore and I don't know if that's normal or a problem",
      "I remember when their name popping up on my phone made my whole day. now it pops up and I think 'what do they need.' and I hate that. I hate that I went from butterflies to logistics. from 'I can't wait to see you' to 'can you pick up milk on your way home.' is that just what happens? does every relationship eventually become a grocery list?"
    ],
    context: "sparkは「ときめき」の定番英語。the spark is gone=ときめきが消えた。butterflies(蝶々)=胸のドキドキ。英語では恋愛の興奮を「蝶々が胃の中を飛んでる」と表現する。butterflies in my stomach。日本語のドキドキは心臓、英語のbutterfliesは胃。興奮を感じる臓器が違う。",
    category: 'love',
    subcategory: 'stagnation',
    situation: 'ときめきが薄れてきたとき',
  },

  // ── 好きな人ができた（既存関係中）──
  {
    id: 'life-love-044',
    japanese: '他に好きな人ができた',
    english: [
      "caught feelings elsewhere",
      "I developed feelings for someone else and I feel terrible",
      "I need to be honest with you, I've started having feelings for someone else",
      "I didn't plan this. I didn't want this. it just happened. and I know 'it just happened' sounds like an excuse but I genuinely did not wake up one morning and decide to have feelings for someone else. feelings don't ask for permission. they don't check if the timing is convenient. they just show up. uninvited. like feelings are the worst houseguest in the world."
    ],
    context: "developed feelings for=〜に気持ちが芽生えた。caught feelings=恋愛感情がついた(カジュアル)。英語のcatch feelingsは「感情をキャッチしてしまった」で、自分の意思じゃないニュアンス。日本語の「好きになっちゃった」の「ちゃった」と同じ。不可抗力。catch=偶然つかんでしまった。",
    category: 'love',
    subcategory: 'new-feelings',
    situation: '既存の関係がある中で別の人を好きになったとき',
  },
  {
    id: 'life-love-045',
    japanese: '気持ちに嘘つけない',
    english: [
      "can't fake it",
      "I can't keep pretending everything's fine when it's not",
      "I owe it to both of us to be honest about how I'm really feeling",
      "I tried to ignore it. pushed it down. told myself it would pass. it didn't pass. it got louder. and I can keep pretending but pretending is exhausting and unfair to everyone involved. especially to someone who deserves to be with a person who's fully there. and right now I'm not fully there. and lying about it would be worse than the truth. so here's the truth."
    ],
    context: "can't pretend=嘘つけない。be honest about=正直になる。I owe it to=〜に対する義務がある。英語ではI owe it to youは「あなたに対して誠実でいる義務がある」という意味。日本語の「嘘つけない」は感情ベースだけど、英語のowe itは義務・借りのメタファー。正直さを「借金返済」で表現する。",
    category: 'love',
    subcategory: 'new-feelings',
    situation: '正直に気持ちを打ち明けるとき',
  },

  // ── 恋愛相談 ──
  {
    id: 'life-love-046',
    japanese: 'これって脈あり？',
    english: [
      "is this a sign",
      "do you think they're into me or am I reading too much into it",
      "they did this thing and I can't tell if it means they like me or if I'm delusional",
      "okay so they touched my arm. during a conversation. lightly. for about one second. and I need to know if that means something. because I've been analyzing that one-second arm touch for three days now. I've consulted two friends, one coworker, and an online article titled 'fifteen signs they like you' and I'm still not sure. is there a lab I can send this data to?"
    ],
    context: "into me=私に気がある。reading too much into it=深読みしすぎ。英語ではsigns(サイン)を読むという表現をする。日本語の「脈あり」は医学用語(脈=pulse)が恋愛に転用されてる。英語にはpulse的な恋愛表現がない代わりに、signsやgreen lightで信号機メタファーを使う。",
    category: 'love',
    subcategory: 'advice',
    situation: '友達に恋愛相談するとき',
  },
  {
    id: 'life-love-047',
    japanese: '恋愛に向いてない気がする',
    english: [
      "not built for dating",
      "I'm starting to think I'm just not cut out for relationships",
      "every relationship I've been in ends the same way and I'm starting to think the problem is me",
      "maybe I'm just not relationship material. some people are good at this. they navigate feelings and communication and compromise like it's natural. for me it's like doing math in a language I don't speak. I understand the concept. I respect people who can do it. but every time I try, I get the wrong answer. maybe I'm a solo player in a co-op game."
    ],
    context: "not cut out for=向いてない。built for=〜用に作られてない。英語では「自分はそう設計されてない」と機械メタファーで表現する。relationship material=恋愛素材がある人。日本語の「向いてない」は方向のメタファー。英語は素材(material)や設計(built for)で「構造的に合わない」イメージ。",
    category: 'love',
    subcategory: 'advice',
    situation: '恋愛に自信をなくしたとき',
  },
  {
    id: 'life-love-048',
    japanese: '恋人欲しいけど面倒くさい',
    english: [
      "want love hate the effort",
      "I want a relationship but the whole process of getting there is exhausting",
      "part of me really wants to be with someone but the other part of me doesn't want to go through all the dating stuff",
      "I want the result without the process. I want to skip ahead to the part where we're comfortable and can order food in silence without it being weird. the getting-to-know-you phase? terrible. the 'what are we' conversation? terrifying. first date small talk? torture. I want a relationship but I want it to arrive fully assembled like furniture. except actually assembled. not like furniture."
    ],
    context: "the process of getting there=そこに至るプロセス。英語では恋愛のステップを明確に分ける。talking stage→dating stage→exclusive stage→relationship。日本語はこの段階分けが曖昧だけど、英語は各段階に名前がある。面倒くさいのは段階が多いから。ゲームのチュートリアルが長いのと同じ。",
    category: 'love',
    subcategory: 'advice',
    situation: '恋愛したいけど面倒なとき',
  },

  // ── SNS・現代恋愛 ──
  {
    id: 'life-love-049',
    japanese: 'インスタのストーリー誰が見てるか気になる',
    english: [
      "checking my viewers",
      "I keep checking who viewed my story and it's embarrassing",
      "I posted a story specifically to see if they'd watch it and I'm not proud of that",
      "I posted a story. a very curated, carefully chosen story. not because I wanted to share it with the world. but because I wanted one specific person to see it. and I've checked the viewer list fourteen times in the last hour. they haven't seen it. everyone else on the planet has seen it. my dentist has seen it. but not them. the algorithm is personally attacking me."
    ],
    context: "viewed my storyはそのまま使える。英語圏でもストーリーの閲覧者チェックは恋愛あるある。soft launching=SNSで恋人をチラ見せすること(手だけ写す等)。英語にはSNS恋愛用語が大量にある。orbiting=フォローしてるけど連絡しない元恋人の行動。日本語にない概念。",
    category: 'love',
    subcategory: 'social-media',
    situation: 'SNSで好きな人の反応が気になるとき',
  },
  {
    id: 'life-love-050',
    japanese: '元カレのSNS見ちゃった',
    english: [
      "stalked my ex online",
      "I went down a rabbit hole stalking my ex's social media",
      "I told myself I wouldn't look at their profile and then I spent forty minutes going through their posts",
      "I looked at my ex's Instagram. and then their Twitter. and then their friend's Instagram because my ex was tagged in a photo. and then the tagged person's profile. and now I know that my ex went to brunch last Sunday with someone I don't recognize and they looked happy and I feel sick. this is entirely my fault. I did this to myself. the information was behind a door that I chose to open. and then I chose to walk through it. and then furnish the room."
    ],
    context: "stalking=SNSストーキング。英語でもstalkerだけど、SNS上のチェックはcreeping/stalkingとカジュアルに言う。went down a rabbit hole=ウサギの穴に落ちた=ハマって抜けられなくなった。不思議の国のアリスが語源。日本語の「見ちゃった」の罪悪感がrabbit holeの「自分で落ちた」感と近い。",
    category: 'love',
    subcategory: 'social-media',
    situation: '元恋人のSNSを見てしまったとき',
  },
];
