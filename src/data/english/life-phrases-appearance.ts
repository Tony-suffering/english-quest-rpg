import type { LifePhrase } from './life-phrases';

export const appearancePhrases: LifePhrase[] = [
  {
    id: 'life-appearance-001',
    japanese: '髪切った？',
    english: [
      "new haircut?",
      "wait did you get a haircut?",
      "something's different about you today, oh you got your hair cut!",
      "there's a special skill in noticing when someone gets a haircut. you have to notice. if you don't notice, you've failed a social test you didn't know you were taking. and if you notice but you're wrong and they didn't actually get a haircut, that's even worse. you just told someone they look different for no reason. the stakes are higher than people realize."
    ],
    context: "did you get a haircutは定番の聞き方。gotは「してもらった」。日本語の「切った?」は自分で切ったニュアンスだけど英語のget a haircutは「美容院で切ってもらった」が前提。something's differentは「なんか違う」で気づきの導入に使う英語テクニック。",
    category: 'appearance',
    subcategory: 'hair',
    situation: '同僚や友達の変化に気づいたとき',
  },
  {
    id: 'life-appearance-002',
    japanese: '太った気がする',
    english: [
      "feel like I gained weight",
      "I think I've put on a few pounds",
      "my jeans are definitely tighter than last month and I'm choosing to ignore it",
      "I stepped on the scale this morning and the number was higher than I remembered. not by a lot. just enough to ruin my entire day. my favorite jeans require a small prayer and a deep breath to button now. I could start working out. I could eat better. or I could buy bigger jeans and pretend this never happened. option three is winning at the moment."
    ],
    context: "put on weightは「体重が増える」。gain weightも同じ。日本語の「太った」はgot fatだけどこれは直接的すぎる。put on a few poundsが婉曲。英語ではweight gain/lossの話題はかなりセンシティブ。自分のことならOKだけど他人に言うのはNG。",
    category: 'appearance',
    subcategory: 'weight',
    situation: '体重の変化を感じたとき',
  },
  {
    id: 'life-appearance-003',
    japanese: '痩せた？って聞かれた',
    english: [
      "they said I look thinner",
      "someone told me I look like I've lost weight",
      "a coworker said I look thinner and I've been riding that high for three days straight",
      "someone at work said 'have you lost weight?' and it was the best thing anyone has said to me in months. I haven't lost weight. I'm wearing a different shirt. a strategically chosen shirt. a shirt that lies on my behalf. but I'm not going to correct them. I'm going to say 'oh maybe a little' and carry this compliment with me for the rest of the week. maybe the rest of the month."
    ],
    context: "have you lost weightは「痩せた？」の英語版。ただし英語圏ではこの質問自体がデリケート。褒め言葉のつもりでも「前は太ってた」の含意があるから。日本語では比較的気軽に言えるけど英語では要注意。riding that highは「その快感に乗り続けてる」。",
    category: 'appearance',
    subcategory: 'weight',
    situation: '痩せたと言われて嬉しいとき',
  },
  {
    id: 'life-appearance-004',
    japanese: '服に迷う',
    english: [
      "nothing to wear",
      "I have a closet full of clothes and nothing to wear",
      "I've been standing in front of my closet for twenty minutes and I still can't decide",
      "I own approximately sixty items of clothing. sixty. and yet every morning I stand in front of my closet like it's empty. nothing works. nothing goes together. this shirt is too casual. that one is too formal. this one has a stain I keep pretending isn't there. I'm going to be late again because of this daily fashion crisis that I create entirely by myself. every single morning."
    ],
    context: "nothing to wearは世界共通の嘆き。closet full of clothes and nothing to wearは矛盾してるけど全員が共感する不思議なフレーズ。日本語の「迷う」はcan't decideだけど英語ではnothing to wearと「着るものがない」に変換する方が自然。goes togetherは「合う/コーデが成立する」。",
    category: 'appearance',
    subcategory: 'fashion',
    situation: '朝、服を選べなくて時間を使うとき',
  },
  {
    id: 'life-appearance-005',
    japanese: '化粧めんどくさい',
    english: [
      "makeup is a chore",
      "I really can't be bothered with makeup today",
      "the amount of time and effort it takes to do my face every morning is honestly absurd",
      "step one: moisturizer. step two: primer. step three: foundation. step four: concealer. step five through seventeen: things I can't even name but apparently need. this takes forty minutes. every morning. that's almost five hours a week painting my face. for what? so I can look 'professional'? my face is already professional. it shows up to work every day. that should be enough."
    ],
    context: "can't be botheredは「やる気が出ない」。choreは「面倒な作業」。日本語の「めんどくさい」はcan't be bothered/such a hassleで表現。doは化粧に使うと「する」の意味(do my face/do my makeup)。英語では化粧の工程を数えて大変さをアピールする語り方が定番。",
    category: 'appearance',
    subcategory: 'makeup',
    situation: '朝の化粧に時間を取られるのが嫌なとき',
  },
  {
    id: 'life-appearance-006',
    japanese: '老けた',
    english: [
      "looking older",
      "I swear I look ten years older than last year",
      "I caught my reflection and for a second I thought it was someone else, someone older",
      "I was washing my hands in a public bathroom and I looked up at the mirror and thought 'who is that tired person?' it was me. that tired person was me. when did the lines around my eyes get there? when did my face decide to start doing this? I didn't authorize this. I didn't sign any aging paperwork. and yet here we are. apparently time doesn't need your permission."
    ],
    context: "looking olderは「老けて見える」。caught my reflectionは「鏡に映った自分が目に入った」。日本語の「老けた」は英語でaged/got olderだけどlook olderの方が「見た目の変化」に限定できる。I didn't authorize thisは「許可してない」で老化を書類手続きに例えるユーモア。",
    category: 'appearance',
    subcategory: 'aging',
    situation: '鏡を見て自分の老化に気づいたとき',
  },
  {
    id: 'life-appearance-007',
    japanese: '白髪見つけた',
    english: [
      "found a gray hair",
      "I just found a gray hair and I need a moment",
      "I was fixing my hair and I spotted a gray one and my whole morning is ruined",
      "one gray hair. just one. but it's the first one. the pioneer. the scout. it's out there on my head reporting back to the others that the coast is clear. 'hey guys, it's safe, come on over.' next month there'll be five. then twenty. then I'll be salt and pepper and telling myself it looks distinguished. but right now? right now I'm just standing here holding one gray hair and questioning my mortality."
    ],
    context: "gray hairは「白髪」。英語ではgray(アメリカ)/grey(イギリス)の綴り違いがある。spotは「見つける」。salt and pepperは「ゴマ塩頭」の英語表現。distinguishedは「品がある」で白髪を肯定的に言う時に使う。scoutは「偵察兵」で白髪を擬人化する技。",
    category: 'appearance',
    subcategory: 'aging',
    situation: '初めての白髪にショックを受けたとき',
  },
  {
    id: 'life-appearance-008',
    japanese: 'シワ増えた',
    english: [
      "more wrinkles",
      "I'm getting wrinkles and I'm not okay with it",
      "every time I smile in the mirror I can see new lines that weren't there before",
      "I used to smile and my face would go back to normal. now I smile and my face keeps some of the smile. like a receipt. a wrinkle receipt for every emotion I've ever had. here's the one from stress at work. here's the one from squinting at my phone for ten years. here's the one from laughing too hard at that video last Tuesday. every wrinkle has a backstory. I just wish they weren't all visible."
    ],
    context: "wrinklesは「シワ」。linesも使う(fine linesは「小ジワ」)。英語圏ではwrinkleをlines/expression linesと婉曲に言う傾向。a wrinkle receiptは「シワの領収書」で感情の記録として表現する独自の比喩。backstoryは「裏話/経緯」。日本語の「増えた」はgetting moreで進行形が自然。",
    category: 'appearance',
    subcategory: 'aging',
    situation: '鏡でシワの増加を確認したとき',
  },
  {
    id: 'life-appearance-009',
    japanese: '筋トレ始めた',
    english: [
      "started working out",
      "I actually started going to the gym, no really",
      "I signed up for a gym membership and I've been twice this week which is a new personal record",
      "day three of going to the gym. I don't know what any of the machines do. I just walk around looking confident and copying what the person next to me is doing. today I accidentally made eye contact with a guy doing deadlifts and he nodded at me like we were gym brothers. we are not gym brothers. I don't even know what a deadlift is. but I nodded back. the gym is a strange social ecosystem."
    ],
    context: "working outは「筋トレ/運動する」。go to the gymでも通じる。no reallyは「マジで」と前言を補強。日本語の「始めた」はstartedで直訳OKだけど英語では「今回は本気」のno really/actuallyを添えると挫折歴を暗示できる。deadliftは「デッドリフト」の筋トレ種目。",
    category: 'appearance',
    subcategory: 'fitness',
    situation: 'ジム通いを始めたばかりのとき',
  },
  {
    id: 'life-appearance-010',
    japanese: '肌荒れやばい',
    english: [
      "skin's a mess",
      "my skin is absolutely wrecked right now",
      "I woke up with three new breakouts and I have a meeting in two hours",
      "my skin has decided to revolt. I don't know what I did wrong. I've been drinking water. I've been washing my face. I even bought that expensive serum that the internet told me would change my life. it did not change my life. it changed my bank account. my skin looks worse than before. at this point I think my face is just doing this to spite me. a personal vendetta between me and my own pores."
    ],
    context: "breakoutは「吹き出物」。wreckedは「ボロボロ」。日本語の「肌荒れ」は英語にピッタリの一語がない。bad skin/breakouts/skin issuesなど状態で言う。serumは「美容液」。vendettaは「復讐」。英語では肌を敵として語る擬人化パターンが面白い。",
    category: 'appearance',
    subcategory: 'skin',
    situation: '肌の調子が最悪のとき',
  },
  {
    id: 'life-appearance-011',
    japanese: 'メガネ似合わない',
    english: [
      "glasses don't suit me",
      "I look terrible in glasses no matter what frame I try",
      "I've tried on like forty pairs of glasses and I don't look good in any of them",
      "the optician said 'you have a round face so try square frames.' I tried square frames. I looked like an accountant from the 1980s. she said 'okay try round frames.' I tried round frames. I looked like John Lennon's less attractive cousin. then she suggested rimless. I looked invisible. not the glasses, me. the glasses erased my face. I'm starting to think my face is the problem, not the frames."
    ],
    context: "don't suit meは「似合わない」。look good in/look terrible inで「〜を着て(かけて)似合う/似合わない」。日本語の「似合わない」は英語でdon't look good in/don't suit。opticianは「メガネ屋」。英語ではフレーム選びの苦悩は共感ネタ。",
    category: 'appearance',
    subcategory: 'accessories',
    situation: 'メガネを選んでるけど決まらないとき',
  },
  {
    id: 'life-appearance-012',
    japanese: 'コンタクト入れるの怖い',
    english: [
      "contacts scare me",
      "I cannot bring myself to touch my own eyeball",
      "the optometrist showed me how to put in contacts and I almost passed out",
      "here's the thing about contact lenses. you have to touch your eye. your actual eye. the thing that blinks automatically to protect itself from being touched. and you have to override that entire defense system with your finger. I spent thirty minutes in the optometrist's office trying to get one lens in. one. the other eye just watched in horror. eventually the doctor said 'maybe glasses are fine for you.' yeah. maybe."
    ],
    context: "bring myself to〜は「〜する気になれない」。eyeballは「眼球」でeyeよりインパクトがある。optometristは「検眼医」。日本語の「怖い」はscaredだけどcan't bring myself toの方が「心理的ハードル」を表現できる。override the defense systemは体の防衛反射をシステムに例える英語的技。",
    category: 'appearance',
    subcategory: 'accessories',
    situation: '初めてコンタクトに挑戦するとき',
  },
  {
    id: 'life-appearance-013',
    japanese: 'ネイル可愛い',
    english: [
      "love your nails",
      "your nails are so cute, where did you get them done?",
      "I need to know where you got your nails done because they look absolutely amazing",
      "there are two types of compliments. the regular kind where you say 'nice' and move on. and the nail compliment where you grab someone's hand, pull it toward your face, inspect each finger individually, and ask for the salon name, the specific color, and whether they used gel or acrylic. nail compliments are a full investigation. it's not casual. it's forensic. and I'm fully committed."
    ],
    context: "get them doneは「(サロンで)やってもらう」。where did you get them doneは「どこでやった？」。日本語の「可愛い」はcuteで直訳OKだけどネイルにはgorgeousやstunningも使う。forensicは「科学捜査の」で褒め方の本気度をユーモアに表現。",
    category: 'appearance',
    subcategory: 'nails',
    situation: '友達のネイルが可愛くて聞きたいとき',
  },
  {
    id: 'life-appearance-014',
    japanese: '美容院高い',
    english: [
      "salon's expensive",
      "haircuts are way too expensive these days",
      "I just paid eighty bucks for a haircut that looks exactly the same as before",
      "I went to the salon. sat in the chair. she asked what I wanted. I said 'just a trim.' she spent forty minutes doing things with scissors and spray bottles and a blow dryer. I looked in the mirror at the end. it looked the same. exactly the same. but lighter somehow. she removed invisible hair. ghost hair. and charged me eighty dollars for the privilege. I could have not gone and saved eighty dollars and nobody would have noticed."
    ],
    context: "salonは美容院。英語ではhaircut/hair appointmentと言う。just a trimは「ちょっと整えるだけ」の定番オーダー。日本語の「高い」はexpensiveだけどway too expensiveで「高すぎ」。ghost hairは「見えない髪」の造語で、切ったのにわからない状況の皮肉。",
    category: 'appearance',
    subcategory: 'salon',
    situation: '美容院代に毎回驚くとき',
  },
  {
    id: 'life-appearance-015',
    japanese: 'ダイエット続かない',
    english: [
      "diet won't stick",
      "I've started and quit like five diets this year",
      "every Monday I start a new diet and by Wednesday I'm eating ice cream at midnight",
      "Monday: salad for lunch, grilled chicken for dinner, no carbs. Tuesday: still going strong, feeling great, I'm a new person. Wednesday: someone brought cake to the office. I had one slice. then another. then I stopped counting. Thursday: the diet is over. it had a good run. three days of discipline destroyed by one sheet cake. I'll try again next Monday. the cycle is eternal."
    ],
    context: "won't stickは「定着しない/続かない」。stickは粘着の意味から「習慣が続く」に。日本語の「続かない」はcan't stick with itが一番近い。feeling greatは「調子いい」で好調→崩壊の落差がユーモア。the cycle is eternalは「このサイクルは永遠」でダイエットあるある。",
    category: 'appearance',
    subcategory: 'diet',
    situation: '何度もダイエットに失敗してるとき',
  },
  {
    id: 'life-appearance-016',
    japanese: 'その服似合うね',
    english: [
      "looks good on you",
      "that looks really good on you",
      "seriously that outfit suits you perfectly, where did you find it?",
      "there's an art to giving fashion compliments. you can't just say 'nice shirt' and walk away. you have to specify what makes it work. 'the color brings out your eyes.' 'the fit is perfect.' 'it works with your whole vibe.' you have to make it personal. generic compliments are worth nothing in the fashion world. you want to make someone's day? tell them exactly why something looks good. specificity is the key."
    ],
    context: "looks good on youは「似合ってる」の定番。on youがポイントで「あなたが着ると」の意味。suitsも「似合う」だけどlooks good on youの方がカジュアル。brings out your eyesは「目が映える」で具体的な褒め方。日本語の「似合う」は英語では理由を添えた方が喜ばれる。",
    category: 'appearance',
    subcategory: 'fashion',
    situation: '友達のコーデを褒めるとき',
  },
  {
    id: 'life-appearance-017',
    japanese: '寝癖やばい',
    english: [
      "bed head disaster",
      "my bed head is out of control this morning",
      "I looked in the mirror and my hair looks like I got into a fight with my pillow and lost",
      "there are levels to bed head. level one: slightly messy, kind of cute. level two: noticeable, needs some water. level three: what I have right now. my hair has achieved a shape that defies physics. it's going up, sideways, and somehow also inward. I don't know how hair goes inward. mine figured it out. I'm going to need twenty minutes and a lot of water to fix this. or a hat. a hat is faster."
    ],
    context: "bed headは「寝癖」。morning hairとも言う。out of controlは「制御不能」。defies physicsは「物理法則に逆らう」で寝癖の異常な形を大げさに表現。日本語の「やばい」は状況次第で英語の表現が変わるけど、ここではout of control/disasterが合う。",
    category: 'appearance',
    subcategory: 'hair',
    situation: '朝、鏡を見て寝癖に絶望するとき',
  },
  {
    id: 'life-appearance-018',
    japanese: 'このTシャツ何年着てんだろ',
    english: [
      "ancient shirt",
      "this shirt has been through things with me",
      "I've been wearing this same t-shirt for so many years it probably qualifies as a historical artifact",
      "this t-shirt and I have been together longer than most marriages. I bought it in 2018. or was it 2016. the tag is gone. the color that was once black is now a distinguished gray. the collar is stretched into a shape that resembles a boat neck except I didn't ask for a boat neck. but it's soft. perfectly soft. no new shirt will ever be this soft. you can't buy softness like this. you earn it."
    ],
    context: "been through thingsは「一緒にいろいろ経験してきた」。historical artifactは「歴史的遺物」。日本語の「何年」はhow manyだけど英語ではfor yearsと曖昧にする方が自然。distinguished grayは白髪の「品のある灰色」と掛けてる。you earn itは「勝ち取るもの」。",
    category: 'appearance',
    subcategory: 'fashion',
    situation: '愛着のある古い服をまだ着てるとき',
  },
  {
    id: 'life-appearance-019',
    japanese: '日焼けした',
    english: [
      "got sunburned",
      "I got way too much sun and now I'm a lobster",
      "I forgot to put on sunscreen and now my skin is the color of a fire truck",
      "I was outside for two hours. two hours without sunscreen because I thought 'it's not that sunny.' it was that sunny. it was extremely that sunny. now my face is red, my shoulders are peeling, and I look like a before picture in a skincare commercial. the tan line from my watch is the funniest thing I've seen all week. I have a white circle on my wrist. like a reverse watch."
    ],
    context: "got sunburnedは「日焼けした(焼けすぎ)」。tannedは健康的な日焼け、burnedは焼けすぎ。lobsterは「ロブスター」→「真っ赤な人」の比喩。日本語の「日焼け」は良い意味も悪い意味もあるけど英語はtan(良い)とburn(悪い)で分ける。peelingは「皮がむける」。",
    category: 'appearance',
    subcategory: 'skin',
    situation: '日焼け止めを塗り忘れて焼けたとき',
  },
  {
    id: 'life-appearance-020',
    japanese: '顔むくんでる',
    english: [
      "face is puffy",
      "my face is so puffy I look like a different person",
      "I woke up and my face is so swollen I could barely recognize myself in the mirror",
      "I ate ramen last night at eleven PM. this morning my face looks like I'm storing acorns for winter. my eyes are tiny slits in a sea of puffiness. I tried putting cold spoons on my face like the internet told me to. it didn't help. it just made my face cold and puffy. I have a video call in thirty minutes. I'm going to blame allergies. even though the only thing I'm allergic to is late-night sodium."
    ],
    context: "puffyは「むくんだ/腫れぼったい」。swollenはもっと医学的。日本語の「むくんでる」はpuffy/bloatedで対応。storing acorns for winterは「リスが冬に備えてドングリを溜め込む」比喩。英語ではpuffy faceを動物に例えるのが定番ユーモア。",
    category: 'appearance',
    subcategory: 'face',
    situation: '朝起きて顔がパンパンなとき',
  },
  {
    id: 'life-appearance-021',
    japanese: '身長もうちょっと欲しかった',
    english: [
      "wish I was taller",
      "I really wish I was just a little bit taller",
      "being this height means I can never reach the top shelf without looking ridiculous",
      "I'm not short. I'm just not tall. there's a difference. probably. I can't reach the top shelf at the grocery store without doing that thing where I stand on my toes and stretch my arm as far as it goes while hoping nobody sees me. sometimes I use a step stool. sometimes I climb the shelf like a small determined mountain climber. the top shelf is my Everest. I summit it weekly."
    ],
    context: "wish I was tallerは仮定法で「もっと背が高ければ」。I'm not short, I'm just not tallは「低いんじゃなくて高くないだけ」の言い訳。日本語の「欲しかった」は過去形で「もう変えられない」ニュアンス。英語でもwish I wasと仮定法過去で「現実と違う願望」を表す。",
    category: 'appearance',
    subcategory: 'body',
    situation: '身長のことを気にしてるとき',
  },
  {
    id: 'life-appearance-022',
    japanese: 'すっぴんで外出れない',
    english: [
      "can't go out bare-faced",
      "I literally cannot step outside without makeup on",
      "the idea of going out in public with no makeup on gives me actual anxiety",
      "there are people who can walk out the door with nothing on their face and feel fine about it. I am not one of those people. even going to the convenience store requires at minimum concealer, eyebrows, and lip balm. minimum. anything less and I feel like everyone is staring at me. they're not. I know they're not. but my brain doesn't care about logic when it comes to my bare face in public."
    ],
    context: "bare-facedは「すっぴんの」。no makeup onも通じる。日本語の「すっぴん」は英語にぴったりの一語がない。bare face/no makeupで表現。step outsideは「外に一歩出る」。gives me anxietyは「不安になる」で現代英語の定番フレーズ。",
    category: 'appearance',
    subcategory: 'makeup',
    situation: 'すっぴんでの外出に抵抗があるとき',
  },
  {
    id: 'life-appearance-023',
    japanese: '髪色変えたい',
    english: [
      "want new hair color",
      "I'm thinking about dyeing my hair a completely different color",
      "I've been staring at hair color photos for two hours and I can't decide between four options",
      "I want to dye my hair. something bold. something different. something that says 'I'm going through a change and this is how I'm expressing it externally.' the problem is I'm terrified of commitment. what if I hate it? what if it doesn't suit me? what if I end up looking like a different person in a bad way? the Pinterest photos make everything look good. Pinterest is a liar. a beautiful, convincing liar."
    ],
    context: "dyeは「染める」。dye my hairで「髪を染める」。日本語の「変えたい」はwant to changeだけど髪色限定ならdyeを使う。going through a changeは「変化の真っ最中」。英語では髪色を変えることを人生の転機と結びつける文化がある。commitment issues(コミット恐怖)も英語の定番。",
    category: 'appearance',
    subcategory: 'hair',
    situation: '気分転換に髪色を変えたいとき',
  },
  {
    id: 'life-appearance-024',
    japanese: '鏡見たくない',
    english: [
      "avoiding mirrors",
      "I really don't want to look in the mirror today",
      "today is one of those days where I'm actively avoiding every reflective surface",
      "some days you wake up and you feel good. you look in the mirror and think 'yeah, okay, not bad.' today is not that day. today I woke up and my face said no. every mirror I walk past is a personal attack. I caught my reflection in a window and flinched. my own face made me flinch. I'm just going to get through this day without looking at myself and try again tomorrow."
    ],
    context: "avoiding mirrorsは「鏡を避けてる」。reflective surfaceは「反射する面」で鏡以外のガラスも含む。日本語の「見たくない」はdon't want to lookだけど英語ではactively avoiding(積極的に避ける)で意図的な行動として描写する方が面白い。flinchは「びくっとする」。",
    category: 'appearance',
    subcategory: 'self-image',
    situation: '自分の見た目に自信がない日',
  },
  {
    id: 'life-appearance-025',
    japanese: 'ヒゲ剃るの面倒',
    english: [
      "shaving is tedious",
      "I really can't be bothered to shave today",
      "shaving every single day is one of those things nobody warned me about becoming an adult",
      "shaving is the most pointless recurring task in human existence. you shave. it grows back. you shave again. it grows back again. this happens every day forever until you die. I've been shaving for fifteen years. that's probably five thousand shaves. and after every single one of them the hair just comes right back like nothing happened. at least when you clean your room it stays clean for a few days. hair has no respect for your effort."
    ],
    context: "can't be bothered toは「面倒でやる気がない」。pointlessは「意味がない」。recurringは「繰り返し起こる」。日本語の「面倒」はtedious/hassle/can't be botheredで温度差がある。has no respect for your effortは「あなたの努力を尊重しない」で髪を擬人化する英語的ユーモア。",
    category: 'appearance',
    subcategory: 'grooming',
    situation: '毎日の髭剃りに嫌気がさしてるとき',
  },
  {
    id: 'life-appearance-026',
    japanese: '服のセンスない',
    english: [
      "no fashion sense",
      "I have absolutely zero fashion sense",
      "I've accepted that I will never be a fashionable person and I'm mostly at peace with it",
      "everyone else seems to know what goes with what. they combine colors and textures and layers like it's easy. I put on a t-shirt and jeans and call it a day. every day. the same combination since 2010. someone once told me 'you should experiment with your style' and I said 'this is the experiment and the results are in.' I am what I am. a t-shirt and jeans person. for life."
    ],
    context: "fashion senseは「ファッションセンス」。zero fashion senseは「センス皆無」。日本語の「センスない」は英語でもsenseを使うので直訳気味にno fashion senseでOK。call it a dayは「今日はここまで」の慣用句。the results are inは「結果が出た」の報告書口調ユーモア。",
    category: 'appearance',
    subcategory: 'fashion',
    situation: 'ファッションに自信がないとき',
  },
  {
    id: 'life-appearance-027',
    japanese: 'ダイエット中なのに食べちゃう',
    english: [
      "diet fail",
      "I'm supposed to be on a diet but I just ate a whole pizza",
      "my brain knows I'm on a diet but my hands keep opening the fridge anyway",
      "I'm on a diet. technically. in theory. the diet exists in my mind as a concept. in practice, I just ate an entire bag of chips while watching a workout video. not doing the workout. watching someone else do it. like that counts. like fitness by osmosis is a thing. my body is in the kitchen eating snacks while my brain is in the gym. they need to communicate better."
    ],
    context: "supposed to beは「本来は〜のはず」で現実との乖離を示す。diet failは「ダイエット失敗」。fitness by osmosisは「見るだけフィットネス」の造語で浸透圧(osmosis)を使った科学ジョーク。日本語の「なのに」は英語でbut/supposed to beで逆接と理想のギャップを出す。",
    category: 'appearance',
    subcategory: 'diet',
    situation: 'ダイエットの意志が弱すぎるとき',
  },
  {
    id: 'life-appearance-028',
    japanese: '前髪切りすぎた',
    english: [
      "bangs too short",
      "I cut my bangs too short and I want to disappear",
      "I thought I could trim my own bangs and I was very, very wrong",
      "I was standing in my bathroom with scissors thinking 'I can do this. it's just bangs. how hard can it be?' very hard apparently. one side is shorter than the other. neither side is the length I wanted. I look like a medieval peasant who cut their own hair with garden shears. which is essentially what happened except replace medieval with modern and garden shears with kitchen scissors. the result is the same."
    ],
    context: "bangsは「前髪」(アメリカ英語)。イギリスではfringe。trim my own bangsは「自分で前髪を切る」。how hard can it beは「どんだけ難しいの」の有名なフラグ。英語ではこのフレーズの後に必ず失敗が来るのがお約束。medieval peasantは「中世の農民」の大げさ比喩。",
    category: 'appearance',
    subcategory: 'hair',
    situation: 'セルフカットに失敗したとき',
  },
  {
    id: 'life-appearance-029',
    japanese: '写真うつり悪い',
    english: [
      "not photogenic",
      "I always look terrible in photos",
      "in person I look fine but the camera turns me into a completely different creature",
      "the mirror: you look great. the front camera: you are a cryptid. a blurry, unflattering cryptid. I don't understand the technology. how can two reflective surfaces produce such wildly different results? every group photo is the same story. everyone looks normal. I look like I was startled by a flash grenade. at this point I've accepted that photogenic is just a genetic trait I wasn't born with."
    ],
    context: "photogenicは「写真うつりがいい」。not photogenicは「写真うつりが悪い」。cryptidは「未確認生物」(ネッシーとか)。日本語の「写真うつり」は英語に直訳がなく、looks good/bad in photosかphotogenicで対応。front cameraは「フロントカメラ/インカメ」。",
    category: 'appearance',
    subcategory: 'self-image',
    situation: '写真を見て落ち込むとき',
  },
  {
    id: 'life-appearance-030',
    japanese: 'イメチェンしたい',
    english: [
      "want a new look",
      "I need a complete makeover honestly",
      "I'm so tired of looking the same every day, I want to reinvent myself",
      "I've looked the same for five years. same haircut. same clothes. same face obviously. I can't change the face but I can change everything around it. I want a whole new vibe. new hair. new wardrobe. new energy. the kind of transformation where people say 'wait is that the same person?' I want a glow-up montage. except in real life there's no montage music and the transformation takes three months minimum."
    ],
    context: "makeoverは「大変身」。glow-upは「以前よりめちゃくちゃ良くなること」のSNS用語。reinvent myselfは「自分を再発明する」で大げさだけど英語では普通に使う。日本語の「イメチェン」は和製英語。英語ではmakeover/new look/glow-upが対応。montageは「変身シーンの早送り」。",
    category: 'appearance',
    subcategory: 'self-image',
    situation: '見た目を一新したいと思ったとき',
  },
  {
    id: 'life-appearance-031',
    japanese: 'この服高かったのに全然着てない',
    english: [
      "expensive but unworn",
      "I spent so much money on this and I've never worn it",
      "I have this super expensive jacket in my closet that I've worn exactly zero times",
      "I bought this coat two years ago. it was three hundred dollars. I've worn it once. to the store. to return something else. since then it's been hanging in my closet like a museum exhibit. I can't wear it because what if I stain it? what if the weather isn't coat-worthy enough? what if the occasion isn't fancy enough? the coat requires conditions that apparently never exist in my daily life."
    ],
    context: "unwornは「一度も着てない」。museum exhibitは「博物館の展示品」で飾ってあるだけの状態を表現。coat-worthyは「コートに値する」の造語。日本語の「なのに」は英語でbut/and yetで逆接。英語では高い服を着ない問題をsunk cost(埋没費用)として語る人もいる。",
    category: 'appearance',
    subcategory: 'fashion',
    situation: '買ったきり着てない高い服を見つけたとき',
  },
  {
    id: 'life-appearance-032',
    japanese: 'クマがひどい',
    english: [
      "dark circles bad",
      "my dark circles have dark circles at this point",
      "I look like I haven't slept in a week which is only a slight exaggeration",
      "the bags under my eyes are so dark they have their own gravitational pull. no concealer can fix this. I've tried three different brands. two concealers, one color corrector, and something called an 'eye brightening serum' that cost forty dollars and did absolutely nothing. my under-eye situation is beyond cosmetic intervention. it's structural. it's architectural. it's a permanent feature of my face now."
    ],
    context: "dark circlesは「クマ」。bags under the eyesは「目の下のたるみ」。日本語の「クマ」は動物のクマと同じだけど英語は色(dark circles)で表現。concealerは「コンシーラー」。gravitational pullは「重力」で大げさ比喩。beyond cosmetic interventionは「化粧品では手に負えない」の医療口調ユーモア。",
    category: 'appearance',
    subcategory: 'face',
    situation: '睡眠不足でクマが濃いとき',
  },
  {
    id: 'life-appearance-033',
    japanese: '眉毛整えるの失敗した',
    english: [
      "eyebrow disaster",
      "I messed up my eyebrows and now I look permanently surprised",
      "I was just going to clean up my eyebrows a little and now one is significantly thinner than the other",
      "I was tweezing my eyebrows. just cleaning up the edges. a simple task. a task I've done hundreds of times. but this time my hand slipped and now my left eyebrow is noticeably thinner than my right. I look like I'm perpetually questioning something with one side of my face. the worst part is there's no fixing it except waiting three weeks for it to grow back. three weeks of asymmetrical surprise."
    ],
    context: "messed upは「失敗した」。tweezingは「毛抜きで抜く」。permanently surprisedは「永久に驚いてる顔」で左右非対称の眉のこと。asymmetricalは「非対称」。日本語の「失敗した」はmessed up/screwed upで対応。英語では眉毛の失敗=表情が変わるジョークが定番。",
    category: 'appearance',
    subcategory: 'grooming',
    situation: '眉毛を整えるのに失敗したとき',
  },
  {
    id: 'life-appearance-034',
    japanese: '腹出てきた',
    english: [
      "belly's growing",
      "I'm starting to get a belly and I'm in denial about it",
      "I used to be able to see my feet when I looked down and now there's a situation in the way",
      "it started small. a slight curve. a gentle rounding. I told myself it was bloating. then the bloating didn't go away. for six months. that's not bloating anymore. that's a belly. a permanent resident. I do that thing where I suck it in when I see someone I know and then exhale dramatically when they leave. this is my cardio now. sucking in and releasing. core workout, technically."
    ],
    context: "get a bellyは「腹が出てくる」。in denialは「現実を認めない」。a situationは「問題」の婉曲表現。bloatingは「膨満感」。日本語の「出てきた」は進行形のgettingで対応。permanent residentは「永住者」でお腹を住人に例える。suck inは「お腹を引っ込める」。",
    category: 'appearance',
    subcategory: 'body',
    situation: 'お腹の変化を認めたくないとき',
  },
  {
    id: 'life-appearance-035',
    japanese: 'スーツ似合わない',
    english: [
      "suits don't suit me",
      "I look like a kid playing dress-up in a suit",
      "every time I put on a suit I feel like I'm pretending to be a functioning adult",
      "there are people who put on a suit and look like they were born to wear it. like the suit was designed specifically for their body. when I put on a suit I look like the suit is wearing me. like the suit showed up and I just happened to be inside it. my coworker said I looked 'professional' which I think was code for 'you look uncomfortable' and honestly both are accurate."
    ],
    context: "suits don't suit meは「スーツが似合わない」のダジャレ。playing dress-upは「おめかしごっこ」。the suit is wearing meは「スーツに着られてる」で日本語の「服に着られてる」と全く同じ発想。英語と日本語が同じ比喩を持つ珍しいケース。professionalは婉曲表現として使える。",
    category: 'appearance',
    subcategory: 'fashion',
    situation: 'スーツを着慣れてなくて違和感があるとき',
  },
  {
    id: 'life-appearance-036',
    japanese: '二重あごやばい',
    english: [
      "double chin alert",
      "I just saw my double chin in a photo and I'm shaken",
      "I was on a video call and noticed I have a double chin from that angle and I can't unsee it",
      "I was doing fine. living my life. content with my appearance. and then someone took a photo from below and I saw it. the double chin. my chin's roommate. it only appears from certain angles which means I've been walking around looking fine from the front but from below I look like a bullfrog. now I'm paranoid about every angle. I'm only allowing photos from directly ahead and slightly above from now on."
    ],
    context: "double chinは「二重あご」そのまま。can't unsee itは「見たものは見なかったことにできない」。bullfrogは「ウシガエル」で膨らんだあごの比喩。日本語の「やばい」は英語で状況に応じて変わるけど、ここではI'm shakenが「衝撃を受けた」で対応。anglは「角度」。",
    category: 'appearance',
    subcategory: 'face',
    situation: '写真で二重あごに気づいてショックなとき',
  },
  {
    id: 'life-appearance-037',
    japanese: '靴擦れ痛い',
    english: [
      "blisters hurt",
      "these new shoes are destroying my feet",
      "I'm walking around with blisters on both heels pretending I'm not in agony",
      "I bought new shoes. cute shoes. shoes that looked great in the store when I walked approximately three steps. now I've walked three thousand steps and my heels are on fire. every step is a tiny knife. I could change into my old shoes but they don't match my outfit so I'm choosing fashion over comfort which is a choice I make regularly and regret every single time."
    ],
    context: "blistersは「靴擦れ/水ぶくれ」。destroyingは「破壊してる」の誇張。agonyは「激痛」。日本語の「靴擦れ」は英語でblister(水ぶくれ)。fashion over comfortは「快適さよりファッション」で見た目重視の自虐。every step is a tiny knifeは「一歩が小さなナイフ」の痛みの比喩。",
    category: 'appearance',
    subcategory: 'shoes',
    situation: '新しい靴で足が痛いとき',
  },
  {
    id: 'life-appearance-038',
    japanese: '抜け毛多い',
    english: [
      "losing so much hair",
      "I'm losing hair at a rate that concerns me",
      "every time I shower the drain looks like a small animal is trying to escape",
      "I ran my hand through my hair and about thirty strands came with it. thirty. I counted. well, I estimated. I've been finding hair on my pillow, on my desk, on my food, in places hair has no business being. the internet says losing a hundred hairs a day is normal. I think I'm doubling that quota. my shower drain is filing a restraining order. if this continues I'm going to need a bigger drain. or less hair. nature seems to be choosing the latter."
    ],
    context: "losing hairは「髪が抜ける」。at a rate that concerns meは「心配になるペースで」。drain(排水口)に髪が詰まる描写は英語圏で共感度が高い。restraining orderは「接近禁止命令」で排水口が髪に対して法的措置を取る擬人化。latter(後者)=less hairのオチが効く。",
    category: 'appearance',
    subcategory: 'hair',
    situation: '抜け毛の量が気になってるとき',
  },
  {
    id: 'life-appearance-039',
    japanese: '体型隠したい',
    english: [
      "want to hide my body",
      "I just want to wear something that hides everything",
      "my clothing strategy is basically finding the most forgiving silhouette possible",
      "my relationship with fashion is simple: does this hide my problem areas? yes? I'll take it in three colors. oversized is not a trend for me, it's a lifestyle. it's a coping mechanism. a large sweater is just a wearable hug that also happens to conceal the fact that I ate an entire pizza yesterday. fashion people call it 'relaxed fit.' I call it 'strategic camouflage.' we are not the same."
    ],
    context: "forgiving silhouetteは「体型を許してくれるシルエット」。英語のforgivingは服にも使える(体型の欠点を目立たせない)。strategic camouflageは「戦略的迷彩」。日本語の「隠したい」は英語でhide/concealだけどforgivingは服業界の専門用語。oversized fitは体型カバーの定番。",
    category: 'appearance',
    subcategory: 'body',
    situation: '体型をカバーする服を選んでるとき',
  },
  {
    id: 'life-appearance-040',
    japanese: '美容液高すぎて手が出ない',
    english: [
      "serum's too pricey",
      "that serum costs more than my grocery budget for a week",
      "I've been eyeing this skincare product for months but it costs as much as my electricity bill",
      "the serum is ninety dollars. for thirty milliliters. that's three dollars per milliliter. I don't even know how much a milliliter is but I know it's not ninety dollars worth. my friend uses it and her skin looks amazing and I hate her a little bit for it. I could buy it. or I could pay rent. both are important. one keeps a roof over my head. the other keeps my skin looking young under that roof."
    ],
    context: "priceyは「高い」のカジュアル表現。hand can't reachは日本語の「手が出ない」の直訳だけど英語ではcan't afford/too priceyと価格で言う。eyeingは「目をつけてる」。日本語の「手が出ない」は金額的に無理だけど英語はout of my price range/can't justifyが近い。",
    category: 'appearance',
    subcategory: 'skincare',
    situation: '欲しいスキンケアが高額すぎるとき',
  },
  {
    id: 'life-appearance-041',
    japanese: 'ムダ毛処理めんどい',
    english: [
      "shaving is a hassle",
      "body hair maintenance is such a chore",
      "the amount of time I spend removing hair from my body is honestly depressing",
      "I shave my legs. they're smooth for approximately fourteen hours. then the stubble returns. like a villain in a horror movie sequel. you thought it was over? it's never over. I've tried everything. razors, wax, that cream that smells like a chemical accident. nothing is permanent. every two days I'm back in the shower performing the same ritual. an endless loop of hair removal. Sisyphus had his boulder. I have my razor."
    ],
    context: "body hair maintenanceは「体毛のメンテ」。stubbleは「ジョリジョリ」(短い毛)。Sisyphusは「シーシュポス」で岩を永遠に転がすギリシャ神話。英語では終わらない作業をSisypheanと形容する教養系ジョーク。日本語の「めんどい」はhassle/choreで対応。",
    category: 'appearance',
    subcategory: 'grooming',
    situation: '定期的な毛の処理に疲れたとき',
  },
  {
    id: 'life-appearance-042',
    japanese: '若く見られる',
    english: [
      "look young for my age",
      "people always think I'm way younger than I actually am",
      "I got carded at the store again and I'm thirty-two years old",
      "I'm thirty-two. the cashier asked for my ID. I showed it to her. she looked at it. looked at me. looked at it again. said 'really?' yes really. I'm thirty-two and I look like a college student apparently. sounds like a compliment right? it's not when you're trying to be taken seriously in a business meeting and your client thinks you're the intern. youth is wasted on the young. and apparently also wasted on me."
    ],
    context: "got cardedは「年齢確認された」(カードを見せろと言われた)。IDは身分証明書。日本語の「若く見られる」は英語でlook young for my ageが定番。cardedはアメリカ文化特有の表現。taken seriouslyは「真面目に受け止められる」。youth is wasted on the youngは有名な引用。",
    category: 'appearance',
    subcategory: 'aging',
    situation: '実年齢より若く見られることが多いとき',
  },
  {
    id: 'life-appearance-043',
    japanese: '老けて見られる',
    english: [
      "look older than I am",
      "people always think I'm older and it hurts a little",
      "someone just assumed I was ten years older than I actually am and my soul cracked",
      "I was at a restaurant with my friend. she's thirty-five. I'm twenty-eight. the waiter called us 'the two ladies' which was fine. then he turned to me specifically and said 'and what would mom like?' mom. I'm twenty-eight. I'm seven years younger than my friend. I looked at her. she looked at me. she was trying very hard not to laugh. she failed. I'm buying anti-aging cream on the way home."
    ],
    context: "look older than I amは「実年齢より老けて見える」。my soul crackedは「魂にひびが入った」の造語的表現で深いダメージ。日本語の「老けて見られる」は英語でpeople assume I'm olderで「勝手に年上だと思われる」。anti-aging creamは「アンチエイジングクリーム」。",
    category: 'appearance',
    subcategory: 'aging',
    situation: '実年齢より上に見られたとき',
  },
  {
    id: 'life-appearance-044',
    japanese: '鼻毛出てた',
    english: [
      "nose hair showing",
      "someone just told me my nose hair was showing and I want to evaporate",
      "I spent the entire meeting with a nose hair sticking out and nobody said anything until after",
      "here's what happened. I had a two-hour meeting. two hours of talking, presenting, making eye contact with twelve people. afterward, my coworker pulled me aside and said 'hey, you've got a nose hair situation.' a situation. for two hours. twelve people saw it. none of them told me. they just let me present quarterly results with a nose hair waving at the audience like a tiny arm. I'm transferring departments."
    ],
    context: "nose hair showingは「鼻毛が出てる」。a situationは問題を婉曲に言う英語テクニック。pull someone asideは「そっと呼び出す」。日本語では「鼻毛出てるよ」と指摘するのは普通だけど英語圏では言いにくい。like a tiny arm wavingは鼻毛を小さな腕に例える独自のユーモア。",
    category: 'appearance',
    subcategory: 'grooming',
    situation: '鼻毛が出てることを後から知ったとき',
  },
  {
    id: 'life-appearance-045',
    japanese: '脚長くなりたい',
    english: [
      "want longer legs",
      "I'd trade almost anything for longer legs",
      "every time I see someone with long legs I stare for a second and then look at my own legs in disappointment",
      "I tried on a pair of pants yesterday. the model on the website looked like a gazelle. elegant, long-legged, effortless. I put on the same pants and looked like I was borrowing my dad's clothes. the hem was on the floor. the waist was at my chest. these pants were not designed for my body. these pants were designed for people whose legs start at their ribcage. my legs start much later. much, much later."
    ],
    context: "longer legsは「もっと長い脚」。gazelleは「ガゼル」で脚の長い動物。日本語の「長くなりたい」はwant/wish I hadで願望を出す。英語では体型の理想をanimal(ガゼル)やmodel(モデル)との比較で語る。the hem was on the floorは裾が床についてるズボンあるある。",
    category: 'appearance',
    subcategory: 'body',
    situation: '脚の長さにコンプレックスがあるとき',
  },
  {
    id: 'life-appearance-046',
    japanese: 'ほくろ増えた',
    english: [
      "new moles appearing",
      "I keep finding new moles that I swear weren't there before",
      "my body is adding new moles without my consent like unwanted software updates",
      "I found a new mole on my arm today. I don't remember approving this mole. it just showed up. like an uninvited guest at a party except the party is my skin and the guest is permanent. I now have a collection. some people collect stamps. I collect moles. involuntarily. my skin is basically a connect-the-dots puzzle at this point. if you connect them it probably spells something disappointing."
    ],
    context: "moleは「ほくろ」。without my consentは「同意なしに」。software updatesは「ソフトの更新」でほくろが勝手に増える様子をPCに例える。connect-the-dotsは「点つなぎパズル」。日本語の「増えた」はmore/newで対応。英語ではbody modification without permissionのジョークが効く。",
    category: 'appearance',
    subcategory: 'skin',
    situation: '体のほくろの増加に気づいたとき',
  },
  {
    id: 'life-appearance-047',
    japanese: 'メイク落とすの忘れて寝た',
    english: [
      "slept with makeup on",
      "I fell asleep with my makeup on again",
      "I woke up looking like a raccoon because I forgot to take my makeup off",
      "last night I came home exhausted. I knew I should wash my face. every skincare article ever written says 'never sleep with makeup on.' I know this. my brain knows this. but my body made an executive decision to collapse on the bed fully clothed and fully made up. this morning my pillow has a face print on it. a perfect mascara-smudged face print. like the Shroud of Turin but sadder."
    ],
    context: "raccoonは「アライグマ」→マスカラがにじんで目の周りが黒い状態。Shroud of Turinは「トリノの聖骸布」(キリストの顔が映ったとされる布)。日本語の「忘れて」はforgotだけど英語ではmy body made an executive decisionと「体が勝手に決断した」擬人化が光る。",
    category: 'appearance',
    subcategory: 'makeup',
    situation: '疲れてメイク落とさず寝た翌朝',
  },
  {
    id: 'life-appearance-048',
    japanese: '筋肉痛で動けない',
    english: [
      "so sore",
      "I'm so sore I can barely move",
      "I worked out yesterday and now every muscle in my body is staging a protest",
      "I went to the gym yesterday for the first time in three months. I was feeling motivated. powerful. unstoppable. I did squats. I did lunges. I did things with weights that I can't name. today I can't sit down without making a sound. standing up takes about forty-five seconds and involves holding onto furniture. walking down stairs looks like a slow-motion movie scene. my legs have betrayed me."
    ],
    context: "soreは「筋肉痛の」。DOMs(delayed onset muscle soreness)は「遅発性筋肉痛」。staging a protestは「抗議行動を起こす」で筋肉が反乱する擬人化。日本語の「筋肉痛」は英語でsore muscles/muscle soreness。without making a soundは「音を出さずに」→無理で声が出るユーモア。",
    category: 'appearance',
    subcategory: 'fitness',
    situation: '久しぶりの運動の翌日に動けないとき',
  },
  {
    id: 'life-appearance-049',
    japanese: 'パーマ失敗した',
    english: [
      "perm went wrong",
      "my perm came out nothing like the photo I showed",
      "I showed the stylist a photo of soft waves and ended up looking like a poodle from the 80s",
      "I brought a photo to the salon. a beautiful photo. soft, loose waves cascading down perfectly. I showed it to the stylist. she nodded confidently. two hours and a lot of chemicals later I looked in the mirror and the person staring back at me looked like they had been in a fight with a curling iron and lost. spectacularly. the stylist said 'it'll relax in a few days.' it's been a few days. it has not relaxed."
    ],
    context: "perm(パーマ)は英語でもperm。came outは「仕上がりが〜だった」。like a poodleは「プードルみたい」でパーマ失敗の定番比喩。cascadingは「滝のように流れる」で理想の髪を描写。it'll relaxは「落ち着く」で美容師の常套句。日本語の「失敗した」はwent wrong/didn't turn outで。",
    category: 'appearance',
    subcategory: 'hair',
    situation: '美容院でパーマが理想と違ったとき',
  },
  {
    id: 'life-appearance-050',
    japanese: '自撮り100枚撮って1枚も使えない',
    english: [
      "hundred selfies zero keepers",
      "I just took a hundred selfies and deleted every single one",
      "I spent thirty minutes trying to take one decent selfie and I don't like any of them",
      "the process is always the same. take a photo. hate it. adjust the angle. take another. hate it more. try a different light. still terrible. smile. too much. don't smile. too serious. tilt head. too tilted. a hundred attempts later I have a camera roll full of evidence that I should never take selfies. then my friend takes a random photo of me laughing and it's perfect. the secret to a good photo of me is apparently not trying."
    ],
    context: "keepersは「残す価値があるもの」。zero keepersは「使えるの0枚」。self-awareness(自分の見え方の意識)が高いほどselfieが難しいのは英語圏でも共通。the secret is not tryingは「コツは頑張らないこと」で自撮りの逆説。candid photo(自然な写真)の方がいいのは世界共通。",
    category: 'appearance',
    subcategory: 'self-image',
    situation: '自撮りが上手く撮れなくて時間だけ過ぎたとき',
  },
];
