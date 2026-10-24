import type { LifePhrase } from './life-phrases';

export const healthPhrases: LifePhrase[] = [
  {
    id: 'life-health-001',
    japanese: 'マジ眠い',
    english: [
      "so sleepy",
      "I can barely keep my eyes open",
      "I'm so tired I could fall asleep standing up right now",
      "I'm dying. my eyelids weigh about forty pounds each. I had coffee. two cups. did nothing. my body has developed complete caffeine immunity. I'm sitting here pretending to work but my brain checked out an hour ago. if someone talks to me right now I'll just nod and hope it wasn't a question."
    ],
    context: "sleepyは「眠い」、tiredは「疲れた」。日本語は両方「眠い」で済むけど英語は原因で使い分ける。寝不足ならsleepy、働きすぎならtired。drowsy(うとうと)、beat(ぐったり)と疲労語彙が異常に多い。疲れてる国民なんだろう。",
    category: 'health',
    subcategory: 'fatigue',
    situation: '午後の会議中',
  },
  {
    id: 'life-health-002',
    japanese: '風邪ひいたかも',
    english: [
      "catching a cold",
      "I think I'm coming down with something",
      "My throat's been scratchy all day, I might be getting sick",
      "my throat started feeling weird around lunch and now my nose is doing that thing where it's not quite runny but not quite clear either. I refuse to believe this is a cold. I'm going to pretend it's allergies until I physically cannot stand. denial is my primary healthcare provider."
    ],
    context: "come down with somethingが「何かにかかりそう」の定番。catchよりリアル。somethingと濁すのがポイントで、まだ確定してない不安をそのまま表す。日本語の「かも」のニュアンスがsomethingに全部入ってる。",
    category: 'health',
    subcategory: 'cold',
    situation: '喉がイガイガする時',
  },
  {
    id: 'life-health-003',
    japanese: '頭ガンガンする',
    english: [
      "splitting headache",
      "my head is absolutely pounding right now",
      "I've got this throbbing headache that won't go away",
      "there is a tiny construction crew inside my skull and they are renovating. jackhammers. the whole thing. every heartbeat is a bass drum solo directly behind my left eye. I took two ibuprofen an hour ago and they did absolutely nothing. at this point I'm convinced my brain is just angry at me for existing."
    ],
    context: "poundingは「ドンドン叩く」、throbbingは「ズキズキ」、splittingは「割れそう」。日本語の「ガンガン」一語で済むところを英語は痛みの種類で細分化する。逆に日本語の擬音語の豊かさは英語にない。お互い様。",
    category: 'health',
    subcategory: 'headache',
    situation: '仕事中、画面見すぎた時',
  },
  {
    id: 'life-health-004',
    japanese: '腰やばい',
    english: [
      "my back's killing me",
      "I threw my back out again somehow",
      "My lower back has been giving me hell all week",
      "I bent down to pick up a pen. a pen. and my lower back just said no. I'm thirty-something years old and my spine has the structural integrity of a wet paper towel. I now have to plan my movements like a chess game. reaching for things on the floor is a strategic decision."
    ],
    context: "日本語の「腰」はlower back。backだけだと背中全体になる。killing meは「殺される=超痛い」で大げさに言うのが英語流。threw my back outは「ぎっくり腰」的なニュアンス。give me hellは「苦しめやがる」。",
    category: 'health',
    subcategory: 'back-pain',
    situation: 'デスクワーク中',
  },
  {
    id: 'life-health-005',
    japanese: '肩こりやばい',
    english: [
      "stiff shoulders",
      "my shoulders are so tense they're basically rocks",
      "I've got these massive knots in my shoulders from sitting all day",
      "my shoulders have achieved a level of tension that scientists would find interesting. I'm pretty sure if you pressed on them right now you'd hear a cracking sound like stepping on gravel. I keep rolling my neck at my desk and my coworkers probably think I'm possessed. someone please just hit me with a rolling pin."
    ],
    context: "「肩こり」は英語に直訳がない。stiff shouldersかtense shouldersで伝える。英語圏では肩こりの概念自体が薄い。knotsは「筋肉のしこり」。日本文化特有の症状を説明するのに3語以上必要なのが面白い。",
    category: 'health',
    subcategory: 'stiff-shoulders',
    situation: 'PC作業8時間後',
  },
  {
    id: 'life-health-006',
    japanese: '花粉やばすぎ',
    english: [
      "allergies are brutal",
      "hay fever is destroying me right now",
      "The pollen count must be insane today because I can't stop sneezing",
      "I have sneezed fourteen times in the last twenty minutes. my eyes look like I've been watching a sad movie marathon. I went outside for five seconds and the air personally attacked me. spring is supposed to be beautiful but for me it's just biological warfare. the cherry blossoms are my enemy."
    ],
    context: "花粉症はhay feverかpollen allergies。allergyだけだと何のアレルギーか不明。英語圏でもhay feverは超メジャーだから通じる。brutalは「残忍な」だけど口語で「えぐい、きつい」。日本語の「やばい」に近い万能さ。",
    category: 'health',
    subcategory: 'allergies',
    situation: '春、外出後',
  },
  {
    id: 'life-health-007',
    japanese: '二日酔いで死にそう',
    english: [
      "so hungover",
      "I'm massively hungover and regretting everything",
      "I drank way too much last night and now I'm paying for it",
      "why did I think that last round of shots was a good idea. why does past me hate future me so much. I'm lying in bed and the room is spinning and I haven't even opened my eyes yet. water tastes wrong. everything tastes wrong. I'm making a solemn promise to never drink again and I know it's a lie."
    ],
    context: "hungoverは形容詞で「二日酔いの」。a hangoverが名詞。paying for itは「ツケを払う」で因果応報感がある。日本語は「死にそう」で済むけど英語はregretting(後悔)を入れると自業自得のニュアンスが出る。",
    category: 'health',
    subcategory: 'hangover',
    situation: '飲みすぎた翌朝',
  },
  {
    id: 'life-health-008',
    japanese: '全然寝れなかった',
    english: [
      "couldn't sleep at all",
      "I barely slept a wink last night",
      "I was tossing and turning all night and got maybe two hours",
      "I went to bed at eleven. normal time. responsible adult behavior. then I lay there staring at the ceiling for three hours thinking about every embarrassing thing I've ever done since middle school. finally dozed off around three and my alarm went off at six. I'm running on pure spite right now."
    ],
    context: "not a winkの winkは「まばたき」で「まばたきする暇もないほど寝てない」。tossing and turningは「寝返りばかり」の定番表現。英語は不眠の描写が具体的で、日本語みたいに「寝れなかった」一言では物足りない感がある。",
    category: 'health',
    subcategory: 'insomnia',
    situation: '朝、職場で',
  },
  {
    id: 'life-health-009',
    japanese: '運動不足すぎる',
    english: [
      "so out of shape",
      "I'm embarrassingly out of shape these days",
      "I really need to start exercising because I'm completely out of shape",
      "I got winded walking up two flights of stairs yesterday. two. I used to play sports in high school. what happened to that person. they're gone. replaced by someone who considers walking to the fridge a workout. I keep telling myself I'll start running next week and next week has been happening for about three years now."
    ],
    context: "out of shapeは「体がなまってる」。運動不足という概念を一語で言う英単語がないのが面白い。lack of exerciseは硬すぎ。out of shapeなら「形が崩れた」で口語的。反対はin shapeで「体ができてる」。",
    category: 'health',
    subcategory: 'exercise',
    situation: '階段で息切れした時',
  },
  {
    id: 'life-health-010',
    japanese: '筋肉痛がやばい',
    english: [
      "so sore",
      "I'm sore in muscles I didn't know existed",
      "Every part of my body aches from yesterday's workout",
      "I went to the gym for the first time in six months and now I can't sit down without making old man noises. my thighs have filed a formal complaint. raising my arms to wash my hair this morning was an Olympic event. I'm walking around like a robot because bending any joint is an act of bravery."
    ],
    context: "筋肉痛はsore。muscle painとは言わない。soreは「痛くて触れない」感じ。achesは「鈍い痛み全体」。日本語は「筋肉痛」一語で完璧に伝わるけど、英語はI'm soreと主語が必要。痛みの所有者を明示するのが英語。",
    category: 'health',
    subcategory: 'muscle-pain',
    situation: '久々の運動翌日',
  },
  {
    id: 'life-health-011',
    japanese: '食べすぎた',
    english: [
      "ate too much",
      "I'm stuffed, I definitely overdid it",
      "I ate way more than I should have and now I can barely move",
      "I told myself I'd have a light dinner. that was a lie. I had three helpings of rice and then dessert because apparently my stomach has no off switch. I'm lying on the couch in the recovery position like a beached whale. breathing is a challenge. my belt is on its last hole and praying."
    ],
    context: "stuffedは「詰め込まれた」で「腹パンパン」。fullだと普通に「満腹」。stuffedの方が「やっちまった」感がある。I'm so full I could burstも定番。英語は食べすぎを身体の膨張で表現する傾向が強い。",
    category: 'health',
    subcategory: 'overeating',
    situation: '食後、動けない時',
  },
  {
    id: 'life-health-012',
    japanese: 'ストレスやばい',
    english: [
      "so stressed out",
      "I'm stressed out of my mind lately",
      "Work has been so stressful that I can feel it in my body",
      "my jaw hurts because apparently I've been clenching it in my sleep. my shoulders live next to my ears now. I'm stress-eating convenience store snacks at midnight and calling it dinner. my body is keeping score of every deadline I've ever missed and it's presenting the bill all at once."
    ],
    context: "stressed outのoutが大事。stressedだけだと軽い。outがつくと「限界突破」感が出る。burnt outは「燃え尽き」で一段上。日本語の「やばい」は程度を曖昧にできるけど英語はstressed < stressed out < burnt outと段階がある。",
    category: 'health',
    subcategory: 'stress',
    situation: '仕事が詰まってる時',
  },
  {
    id: 'life-health-013',
    japanese: '薬飲まなきゃ',
    english: [
      "gotta take my meds",
      "I need to take my medicine before I forget",
      "I keep forgetting to take my medication, I should set an alarm",
      "I just realized I forgot my morning pills again. this is the third time this week. I'm supposed to take them with food but I also forgot to eat breakfast so that's two failures before nine AM. I need one of those daily pill organizers that old people have. wait. am I old people now."
    ],
    context: "medsはmedicineのカジュアル版。会話ではmedsが圧倒的に多い。take medicineは「薬を飲む」だけどtakeを使う。drinkじゃない。英語は薬を「飲む」じゃなく「取る」。液体の薬でもtake。この感覚が日本人には地味にハマらない。",
    category: 'health',
    subcategory: 'medication',
    situation: '朝の支度中',
  },
  {
    id: 'life-health-014',
    japanese: '病院行かないと',
    english: [
      "should see a doctor",
      "I really need to go see a doctor about this",
      "This has been going on long enough, I should probably see a doctor",
      "I've been ignoring this weird pain for two weeks now hoping it would just go away on its own. it did not go away on its own. my strategy of pretending I'm fine has failed. now I have to actually call a clinic and make an appointment and sit in a waiting room and explain my symptoms to a human being. exhausting."
    ],
    context: "see a doctorが自然。go to the hospitalは入院レベルの重さになるから注意。日本語の「病院行く」は風邪でも使うけど英語のhospitalは緊急や大病。普段の診察はclinicかdoctor's office。この違いを知らないと大げさに聞こえる。",
    category: 'health',
    subcategory: 'hospital',
    situation: '症状が続いてる時',
  },
  {
    id: 'life-health-015',
    japanese: 'なんか体だるい',
    english: [
      "feeling sluggish",
      "I just feel off today, kind of blah",
      "I don't know what's wrong but my whole body feels heavy and slow",
      "I'm not sick. I'm not tired. I'm not sad. I'm just... nothing. my body is at sixty percent power for no identifiable reason. like someone turned down my brightness setting. I could do things. technically. but the idea of doing things sounds terrible. I'm in energy-saving mode and I didn't authorize it."
    ],
    context: "「だるい」に完璧な英語がない。sluggishは「ナメクジみたいに鈍い」、feel offは「なんか調子が変」。blahは「ぼんやり不調」。lethargicは医学用語寄り。日本語の「だるい」が一語で全部カバーしてるのは実は便利。",
    category: 'health',
    subcategory: 'fatigue',
    situation: '朝起きた時',
  },
  {
    id: 'life-health-016',
    japanese: '目が疲れた',
    english: [
      "eyes are strained",
      "my eyes are so tired from staring at screens",
      "I've been looking at a screen for ten hours and my eyes are burning",
      "my eyes feel like they've been sandpapered. I blinked and it hurt. I'm supposed to do the twenty-twenty-twenty thing where you look away every twenty minutes but I forget every single time because I'm looking at a screen. the irony is that I'd have to set a screen reminder to stop looking at screens."
    ],
    context: "eye strainが「目の疲れ」の正確な表現。strained eyesとも。screenを主語にする文も多い。twenty-twenty-twenty ruleは実在する目の休憩法。英語圏のオフィスワーカーの共通語彙になってる。",
    category: 'health',
    subcategory: 'eye-strain',
    situation: 'PC作業後',
  },
  {
    id: 'life-health-017',
    japanese: '熱あるかも',
    english: [
      "might have a fever",
      "I feel warm, I think I have a temperature",
      "I'm feeling really flushed and I think I might be running a fever",
      "my forehead is hot. or is it. I keep touching my own forehead like that's a reliable diagnostic tool. I don't own a thermometer because I'm an adult who is terrible at being an adult. I'm going to use the back of my hand method that my mom used to do and just guess. I'm guessing yes."
    ],
    context: "have a temperatureは「熱がある」の口語。temperatureは本来「体温」だから理屈ではおかしいけど慣用表現。run a feverの方がちょっと正式。日本語の「熱ある」と同じくらいカジュアルに使われる。",
    category: 'health',
    subcategory: 'fever',
    situation: '体が熱い時',
  },
  {
    id: 'life-health-018',
    japanese: '鼻水止まらん',
    english: [
      "runny nose won't stop",
      "my nose just won't stop running, it's ridiculous",
      "I've gone through an entire box of tissues because my nose won't stop",
      "I've used so many tissues that there's a small mountain on my desk and my coworkers are judging me. my nose is running like it's training for a marathon. every time I think it's done, surprise, more. I've shoved tissue up my nostrils twice already today because dignity left the building hours ago."
    ],
    context: "runny noseは「鼻水が出る鼻」。my nose is runningは「鼻が走ってる」で面白い表現。stuffyは逆に「詰まってる」。日本語は「鼻水」と物質を言うけど英語は鼻の状態(running/stuffy)で表す。視点が違う。",
    category: 'health',
    subcategory: 'cold',
    situation: '花粉or風邪の時',
  },
  {
    id: 'life-health-019',
    japanese: '咳が止まらない',
    english: [
      "can't stop coughing",
      "this cough is driving me absolutely insane",
      "I've had this persistent cough for days and nothing seems to help",
      "I coughed in a meeting and everyone looked at me like I was patient zero. I've been living on cough drops and they taste like medicine pretending to be candy. the worst part is the cough always comes at the quietest possible moment. library silence. then me. hacking like I've smoked for forty years."
    ],
    context: "persistent coughは「しつこい咳」。drive me insaneは「発狂しそう」でイライラ感を出す。hacking coughは「ゲホゲホいう激しい咳」。英語は咳にもdry cough(空咳)、wet cough(痰がらみ)と種類がある。",
    category: 'health',
    subcategory: 'cough',
    situation: '風邪が長引いてる時',
  },
  {
    id: 'life-health-020',
    japanese: '胃がもたれてる',
    english: [
      "heavy stomach",
      "my stomach feels so heavy and gross right now",
      "I've had this heavy feeling in my stomach since last night's dinner",
      "my stomach is staging a protest against last night's fried food. it's not pain exactly. it's more like my stomach is full of wet cement that refuses to move. I know I should have stopped at the second plate of karaage but the third one was right there and it looked so good. it does not look so good anymore."
    ],
    context: "「もたれる」の直訳がない。heavy stomachかupset stomachで近づける。indigestionは「消化不良」で医学寄り。英語はfeel heavyと感覚で言う。bloatedは「膨満感」でまた別。日本語の「もたれる」の絶妙さは翻訳泣かせ。",
    category: 'health',
    subcategory: 'digestion',
    situation: '食べすぎた翌日',
  },
  {
    id: 'life-health-021',
    japanese: '体重やばい',
    english: [
      "gaining weight",
      "I've been putting on weight and it's getting bad",
      "I stepped on the scale this morning and I really didn't like the number",
      "I made the mistake of stepping on the scale after avoiding it for three months. the number was rude. my jeans are not lying either. they've been getting tighter but I blamed the dryer. it's not the dryer. it's the late-night cup noodles. it's always the late-night cup noodles. they know what they did."
    ],
    context: "put on weightは「体重が増える」のカジュアル版。gain weightよりリアル。step on the scaleは「体重計に乗る」。英語はweighではなくscaleに乗る。日本語の「やばい」は増えても減えてもOKだけど英語は方向を明示する。",
    category: 'health',
    subcategory: 'weight',
    situation: '体重計に乗った後',
  },
  {
    id: 'life-health-022',
    japanese: '老けた気がする',
    english: [
      "feeling old",
      "I swear I'm aging at double speed lately",
      "I looked in the mirror this morning and thought, when did I get so old",
      "I found a gray hair last week and pulled it out. then I found two more. you can't pull them all out. that's not a viable strategy. my knees make sounds now. actual sounds. like bubble wrap. I used to bounce back from everything and now I need a full business day to recover from staying up past midnight."
    ],
    context: "agingは「老化」だけどfeeling oldの方がリアル。get oldは「老ける」の進行形。日本語の「老けた」は見た目中心だけど英語のfeel oldは体の衰え全体。「気がする」のI swearは「マジで」と強調する時に便利。",
    category: 'health',
    subcategory: 'aging',
    situation: '鏡を見た時',
  },
  {
    id: 'life-health-023',
    japanese: '寝違えた',
    english: [
      "slept wrong",
      "I slept funny and now my neck is wrecked",
      "I woke up with my neck completely locked up from sleeping in a weird position",
      "I went to bed fine. eight hours later I woke up and apparently my neck decided to become a fixed object while I was unconscious. I can only look to the left. if you want to talk to me you'll have to stand on my left side. turning right involves rotating my entire torso like a tank turret."
    ],
    context: "「寝違えた」はslept wrong/funnyで通じる。crick in my neckも定番。英語にはこの現象の専用動詞がなく「変な寝方をした」と原因から説明する。日本語の「寝違えた」は一語で症状も原因も伝わる便利さ。",
    category: 'health',
    subcategory: 'neck-pain',
    situation: '朝起きた時',
  },
  {
    id: 'life-health-024',
    japanese: '口内炎できた',
    english: [
      "got a canker sore",
      "I've got a canker sore and it's so annoying",
      "There's a painful sore inside my mouth and eating anything spicy is torture",
      "I have a canker sore on the inside of my lip and it has ruined my entire week. every food is an enemy now. I tried to eat chips. mistake. I tried to eat miso soup. the salt found it. I'm reduced to eating plain rice and even that somehow hurts. one tiny little ulcer has taken my whole mouth hostage."
    ],
    context: "canker soreが口内炎。mouth ulcerとも言う。cold soreは口の外にできるヘルペスで全く別物。間違えると誤解されるから注意。日本語は「口内炎」で一発だけど英語はcanker/cold/soreの組み合わせで意味が変わる。",
    category: 'health',
    subcategory: 'mouth',
    situation: '食事中に痛い時',
  },
  {
    id: 'life-health-025',
    japanese: '便秘つらい',
    english: [
      "constipated",
      "I've been constipated for days and it's miserable",
      "Nothing's moving and I've tried everything, this is really uncomfortable",
      "it's been three days. I've eaten yogurt. I've had fiber. I've drunk enough water to fill a pool. I've walked around. nothing. my body has decided to just keep everything. like a hoarder. I'm considering prune juice and I hate prune juice but desperate times call for desperate beverages."
    ],
    context: "constipatedが「便秘」。これは日本人が恥ずかしくて言えない英単語ランキング上位。regularは「快便」。英語圏では割とオープンに話す。nothing's movingは直接言わずに伝える婉曲表現で会話向き。",
    category: 'health',
    subcategory: 'digestion',
    situation: '腹が張ってる時',
  },
  {
    id: 'life-health-026',
    japanese: '膝が痛い',
    english: [
      "bad knees",
      "my knees are acting up again, getting old sucks",
      "My knee's been bothering me every time I go up and down stairs",
      "stairs are now my nemesis. I used to take them two at a time like a young gazelle. now I hold the railing and descend one step at a time like I'm navigating a cliff face. my right knee makes a popping sound that I choose to interpret as totally normal and not at all concerning."
    ],
    context: "acting upは「調子が悪い」で体の部位が主語になれる便利表現。my back's acting up、my stomach's acting up。日本語の「痛い」は一方向だけど英語はbother(悩ませる)、act up(暴れる)、give me trouble(面倒かける)と擬人化する。",
    category: 'health',
    subcategory: 'joint-pain',
    situation: '階段を上る時',
  },
  {
    id: 'life-health-027',
    japanese: '歯が痛い',
    english: [
      "toothache",
      "I've got a toothache and I'm dreading the dentist",
      "This toothache has been killing me but I keep putting off going to the dentist",
      "there is a pain in my upper left molar that I've been ignoring for approximately two months. every time I drink something cold it's like an electric shock. I know I need to go to the dentist. I know this. but the dentist is my least favorite place on earth and I will continue avoiding it until my tooth literally falls out."
    ],
    context: "toothacheは一語で「歯痛」。keep putting offは「先延ばしにし続ける」。dreadは「恐怖する」で単なるdislikeより強い。英語圏でもdentist嫌いは万国共通。put offの使いこなしが英会話の上達指標になる。",
    category: 'health',
    subcategory: 'dental',
    situation: '冷たいもの飲んだ時',
  },
  {
    id: 'life-health-028',
    japanese: '手荒れがひどい',
    english: [
      "hands are so dry",
      "my hands are cracked and raw from all the washing",
      "My hands are so dry and cracked that everything I touch stings",
      "my hands look like they belong to someone who works in a salt mine. every knuckle has a tiny crack that opens up whenever I do anything useful. hand cream lasts about twelve minutes before my hands return to their desert state. I put cream on, wash my hands, repeat. it's a cycle with no winner."
    ],
    context: "「手荒れ」の直訳がない。dry/cracked/chapped handsと状態で言う。rawは「ヒリヒリする」。chappedは「ひび割れ」で冬に多い。英語は原因(washing, cold)か状態(dry, cracked)で表すから「手荒れ」のような複合名詞がない。",
    category: 'health',
    subcategory: 'skin',
    situation: '冬場、手洗い後',
  },
  {
    id: 'life-health-029',
    japanese: '睡眠不足だわ',
    english: [
      "sleep-deprived",
      "I'm running on like four hours of sleep here",
      "I've been averaging about four hours of sleep and it's catching up with me",
      "four hours last night. five the night before. three on Monday. I'm doing the math and the total is not enough. my brain is functioning at the level of a calculator with low batteries. I walked into a room and forgot why. twice. I put my phone in the fridge. I am a danger to myself and basic tasks."
    ],
    context: "sleep-deprivedは「睡眠を奪われた」でdepriveが強い。running on~は「〜で動いてる」で燃料が少ない車みたいなニュアンス。catching up with meは「ツケが回ってきた」。英語は睡眠不足を借金のメタファーで語ることが多い。",
    category: 'health',
    subcategory: 'insomnia',
    situation: '数日寝不足が続いた時',
  },
  {
    id: 'life-health-030',
    japanese: 'やっと治った',
    english: [
      "finally better",
      "I'm finally over it, took long enough",
      "It took about a week but I'm finally feeling like myself again",
      "I can breathe through both nostrils simultaneously for the first time in eight days. this is freedom. I forgot what it felt like to not be sick. food has taste again. I have energy. I'm going to waste this energy immediately by doing nothing but at least I have the option. health is underrated."
    ],
    context: "get over itが「治る」。recoverは硬い。feeling like myself againは「自分に戻った」で回復を実感する定番フレーズ。英語は病気を「乗り越える」(get over)と表現するから、風邪でもちょっと勝利感がある。",
    category: 'health',
    subcategory: 'recovery',
    situation: '風邪から回復した時',
  },
  {
    id: 'life-health-031',
    japanese: '声がガラガラ',
    english: [
      "lost my voice",
      "my voice is completely shot right now",
      "I can barely talk, my throat is so raw that every word hurts",
      "I sound like a sixty-year-old blues singer who smokes two packs a day. my voice cracked in a meeting this morning and everyone looked concerned. I tried to order coffee and the barista asked me to repeat myself three times. I'm communicating primarily through hand gestures and aggressive nodding."
    ],
    context: "my voice is shotは「声が終わってる」。shotは「弾を食らった」から「ダメになった」の口語。hoarse(しわがれた)は形容詞で正式。raspy(ガラガラ)も使う。日本語の擬音「ガラガラ」に匹敵する英語はなくて状態形容詞で回る。",
    category: 'health',
    subcategory: 'throat',
    situation: '風邪で喉がやられた時',
  },
  {
    id: 'life-health-032',
    japanese: '汗がやばい',
    english: [
      "sweating so much",
      "I'm sweating like crazy and it's embarrassing",
      "I'm drenched in sweat and I've barely done anything physical",
      "I walked from the station to the office. seven minutes. I look like I just completed a triathlon. there are sweat stains in places I didn't know could produce sweat stains. I'm doing that thing where you hold your arms slightly away from your body to air-dry. it's not working. nothing is working. summer is my enemy."
    ],
    context: "sweating bulletsは「滝汗」。drenchedは「ずぶ濡れ」。perspireは「発汗する」で上品すぎて会話で使うと変。like crazyは「狂ったように」でintensifierとして万能。日本語の「やばい」と同じポジション。",
    category: 'health',
    subcategory: 'heat',
    situation: '夏、外歩いた後',
  },
  {
    id: 'life-health-033',
    japanese: '最近太った',
    english: [
      "put on weight",
      "I've definitely gained a few pounds lately",
      "My clothes are getting tighter and I know I've been eating too much",
      "I put on my favorite jeans last weekend and they did not cooperate. I had to do the lie-down-and-zip method. this is the body's polite way of saying you've been eating too many convenience store onigiri at two AM. I'm one midnight snack away from needing a whole new wardrobe."
    ],
    context: "gained a few poundsは控えめに言うリアルな表現。put on weightはニュートラル。gotten fatとは絶対言わない。英語は体重増加をかなり婉曲に言う文化がある。clothes are getting tighterも責任を服に転嫁する上手い言い方。",
    category: 'health',
    subcategory: 'weight',
    situation: '服がきつくなった時',
  },
  {
    id: 'life-health-034',
    japanese: '足つった',
    english: [
      "got a cramp",
      "my leg just cramped up out of nowhere",
      "I got the worst leg cramp in the middle of the night",
      "I was sleeping peacefully and then at three AM my calf muscle decided to become a rock. I woke up screaming and grabbing my leg like something attacked me. my partner asked what happened and all I could say was a series of sounds that were not words. it lasted thirty seconds but those were the longest thirty seconds of my life."
    ],
    context: "crampが「つる」。charley horseはアメリカ英語で「こむら返り」の口語。cramp upは「つって動けない」。日本語は「つった」一語だけど英語はcrampに体の部位をつける。my calf cramped up。部位が先に来るのが英語の発想。",
    category: 'health',
    subcategory: 'muscle-pain',
    situation: '夜中or運動中',
  },
  {
    id: 'life-health-035',
    japanese: '健康診断の結果やばかった',
    english: [
      "bad checkup results",
      "my health checkup results were not great, honestly",
      "I got my annual checkup results back and there were some concerning numbers",
      "the doctor showed me my blood work and pointed at numbers that were circled in red. red is never good. my cholesterol is high, which is weird because I thought I was eating okay. turns out convenience store salads don't cancel out the ramen I eat three times a week. my body is doing math I don't agree with."
    ],
    context: "health checkupが「健康診断」。annualをつけると「年一回の」。blood workは「血液検査」。数値が悪いはthe numbers were highで「数字が高い」。日本語の「やばい」は方向不明だけど英語は具体的にhigh/lowで示す。",
    category: 'health',
    subcategory: 'checkup',
    situation: '健康診断後',
  },
  {
    id: 'life-health-036',
    japanese: '肌荒れてる',
    english: [
      "skin's breaking out",
      "my skin is a total mess right now, so frustrating",
      "I keep breaking out and no amount of skincare seems to help",
      "I'm thirty years old and still getting acne like I'm sixteen. I have a twelve-step skincare routine that costs more than my electricity bill and my face still looks like it's going through puberty. my skin has decided to rebel against me specifically during the week I have three important meetings. thanks, face."
    ],
    context: "break outは「吹き出る」でニキビ・肌荒れの定番。break outは「脱走する」と同じ形だから文脈で判断。skincare routineは「スキンケアの手順」で英語圏でも普通に言う。「肌荒れ」を一語で言う英語がないのが地味に困る。",
    category: 'health',
    subcategory: 'skin',
    situation: 'ストレスで肌荒れた時',
  },
  {
    id: 'life-health-037',
    japanese: '冷え性つらい',
    english: [
      "always cold",
      "my hands and feet are freezing no matter what I do",
      "I have terrible circulation and I'm always cold even when everyone else is fine",
      "it is room temperature in this office. everyone else is in short sleeves. I am wearing a sweater, a scarf, and I have a blanket on my lap and I'm still cold. my fingers are the temperature of a frozen fish stick. I'm basically a cold-blooded reptile who accidentally got born as a human being."
    ],
    context: "「冷え性」は英語に概念がない。poor circulation(血行不良)が近いけど医学的すぎる。I'm always coldが一番伝わる。英語圏では冷え性が体質として認知されてないから「いつも寒い人」と説明するしかない。文化の壁。",
    category: 'health',
    subcategory: 'circulation',
    situation: 'オフィスで一人だけ寒い時',
  },
  {
    id: 'life-health-038',
    japanese: 'お腹壊した',
    english: [
      "upset stomach",
      "something I ate is not agreeing with me at all",
      "I think I ate something bad because my stomach has been a disaster all day",
      "I don't know which meal betrayed me but one of them did. I've been in and out of the bathroom four times this morning. my stomach is making sounds that a stomach should not make. sounds like a broken washing machine. I'm now suspicious of every meal I had in the last twenty-four hours. nobody is innocent."
    ],
    context: "not agreeing with meは「体に合わない」で食べ物が主語。お腹を壊すの直訳はbreak my stomachだけどそんな表現はない。upset stomachかstomach trouble。英語は食べ物との「不一致」で表す。agree(同意する)を体の相性に使うのが面白い。",
    category: 'health',
    subcategory: 'digestion',
    situation: '怪しいもの食べた後',
  },
  {
    id: 'life-health-039',
    japanese: '血圧高いらしい',
    english: [
      "high blood pressure",
      "apparently my blood pressure is on the high side now",
      "The doctor told me my blood pressure is higher than it should be",
      "I went to the doctor thinking everything was fine and she was like your blood pressure is elevated. elevated. like it took an elevator to a floor it shouldn't be on. she told me to reduce sodium and I nodded while mentally calculating how much soy sauce I use per day. the answer is too much. the answer is always too much."
    ],
    context: "on the high sideは「高め」で断定を避ける言い方。elevatedは医者が使う「上昇してる」。日本語の「らしい」をapparentlyで出すのが上手い。英語のapparentlyは「聞いたところでは」で責任を他者に置ける便利ワード。",
    category: 'health',
    subcategory: 'checkup',
    situation: '健康診断で言われた時',
  },
  {
    id: 'life-health-040',
    japanese: '疲れが取れない',
    english: [
      "can't shake this fatigue",
      "no matter how much I sleep I still feel exhausted",
      "I've been sleeping eight hours but I wake up just as tired as when I went to bed",
      "I slept eight hours. full eight. I should feel refreshed. I feel like I ran a marathon in my sleep. maybe I did. maybe my subconscious is doing CrossFit while I'm unconscious. there is no amount of sleep that fixes whatever this is. I wake up and my body immediately asks can we go back. every single morning."
    ],
    context: "can't shake itは「振り払えない」でしつこい症状に使う。shake offで「振り落とす」。日本語の「取れない」は静的だけど英語のshakeは能動的に「振り払おうとして失敗」してるニュアンス。疲労との格闘が見える。",
    category: 'health',
    subcategory: 'fatigue',
    situation: '慢性疲労を感じる時',
  },
  {
    id: 'life-health-041',
    japanese: '生理痛つらい',
    english: [
      "bad cramps",
      "I'm having really bad cramps and it's the worst",
      "My period cramps are so bad I can barely function today",
      "I'm curled up on the couch with a heating pad wondering what I did to deserve this monthly subscription to pain. my uterus is throwing a tantrum. I took painkillers thirty minutes ago and they've done absolutely nothing so far. I just want to lie here and not be spoken to for approximately forty-eight hours."
    ],
    context: "crampsで生理痛は通じる。period crampsと言えば確実。英語圏では以前よりオープンに話す傾向。monthly subscriptionはサブスク文化からの比喩で「毎月届く嫌なもの」。日本語より英語の方がこの話題の語彙が発達してきてる。",
    category: 'health',
    subcategory: 'menstrual',
    situation: '生理中',
  },
  {
    id: 'life-health-042',
    japanese: '耳鳴りする',
    english: [
      "ears are ringing",
      "I've had this ringing in my ears all morning",
      "There's a constant high-pitched ringing in my ear that won't go away",
      "there is a sound in my left ear that sounds like someone left a microphone on next to a speaker. it's been there since I woke up. it gets louder when it's quiet which means bedtime is especially fun. I googled the symptoms and as usual the internet told me it could be nothing or everything. very helpful."
    ],
    context: "ringing in my earsが「耳鳴り」。tinnitus(ティナイタス)が医学用語。日本語は「耳鳴り」と音が鳴るイメージだけど英語もringing(鳴る)で同じ発想。buzzing(ブーン)、hissing(シュー)と音の種類で使い分けるのは英語ならでは。",
    category: 'health',
    subcategory: 'ear',
    situation: '静かな場所で気になる時',
  },
  {
    id: 'life-health-043',
    japanese: '視力落ちた',
    english: [
      "eyes getting worse",
      "my eyesight has definitely gotten worse lately",
      "I've noticed I'm squinting a lot more and I think I need new glasses",
      "I used to read signs from far away and now I'm squinting at my phone from six inches away. I held a menu at arm's length the other day like a grandparent. my eyes are declining at a rate that is personally offensive. I either need new glasses or binoculars at this point. probably both."
    ],
    context: "eyesightが「視力」。visionでもOK。get worseが「悪くなる」。squintは「目を細める」で視力低下のリアルな動作。日本語の「落ちた」(drop)は英語ではget worse(悪くなる)かdecline(低下する)。落ちるのメタファーは使わない。",
    category: 'health',
    subcategory: 'eye-strain',
    situation: '文字が見にくい時',
  },
  {
    id: 'life-health-044',
    japanese: 'インフルかも',
    english: [
      "might be the flu",
      "I think this might actually be the flu, not just a cold",
      "I've got body aches, chills, and a fever, I'm pretty sure it's the flu",
      "this is not a regular cold. a cold doesn't make every bone in your body hurt. I have chills even though I'm under three blankets. my body temperature is apparently trying to set a new personal record. I went from fine to completely destroyed in about four hours. the flu doesn't warn you. it just arrives."
    ],
    context: "the fluにtheがつくのがポイント。a coldだけどthe flu。fluは特定の病気だからthe。body achesは「全身の痛み」、chillsは「悪寒」。風邪(cold)とインフル(flu)の区別を英語はかなり明確にする。日本語の方が曖昧。",
    category: 'health',
    subcategory: 'flu',
    situation: '急に高熱が出た時',
  },
  {
    id: 'life-health-045',
    japanese: '息切れする',
    english: [
      "out of breath",
      "I get winded just going up the stairs now",
      "I'm so out of breath from walking uphill that I had to stop and rest",
      "I jogged to catch the train. thirty seconds of light jogging. I arrived at the platform breathing like I just completed an Iron Man. people were looking at me. I was bent over with my hands on my knees doing the athlete pose but I am not an athlete. I'm a person who occasionally moves faster than walking speed and pays for it."
    ],
    context: "windedは「息が切れた」。wind(風)から来てる。out of breathも同じ意味で定番。短い距離で息切れするget winded easilyは運動不足の自己申告で使える。日本語の「息切れ」は状態描写だけど英語は原因(running, climbing)とセットで使うことが多い。",
    category: 'health',
    subcategory: 'exercise',
    situation: '階段や坂道の後',
  },
  {
    id: 'life-health-046',
    japanese: 'ぎっくり腰やった',
    english: [
      "threw my back out",
      "I threw my back out and I literally cannot move",
      "I bent down to pick something up and my back just completely gave out",
      "I was picking up a bag of groceries. not even a heavy bag. and my lower back made a sound and then everything went wrong. I'm currently standing at a fifteen-degree angle because standing straight is not available. getting in and out of a chair is a ten-minute production. I've aged thirty years in one afternoon."
    ],
    context: "threw my back outが「ぎっくり腰」の定番。threwは過去形。gave outは「力が抜けた」で急な崩壊。日本語の「ぎっくり腰」は擬音語(ぎっくり)入りだけど英語はthrew out(投げ出した)で暴力的。どっちも大げさで面白い。",
    category: 'health',
    subcategory: 'back-pain',
    situation: '何か持ち上げた瞬間',
  },
  {
    id: 'life-health-047',
    japanese: 'もう若くない',
    english: [
      "not young anymore",
      "I'm not as young as I used to be, that's for sure",
      "My body keeps reminding me that I'm not in my twenties anymore",
      "I used to eat whatever I wanted and stay skinny. I used to sleep four hours and function. I used to sit on the floor and stand up without planning it. all of those abilities have been revoked. my body sends me a new reminder every week that the warranty has expired. I'm in the maintenance phase of being alive."
    ],
    context: "not as young as I used to beは自虐の定番フレーズ。I'm getting upthereも「いい歳になってきた」。英語は年齢を直接言わずused to(昔は)との比較で表す。日本語の「若くない」はストレートだけど英語は過去の自分との対比で語る傾向。",
    category: 'health',
    subcategory: 'aging',
    situation: '体力の衰えを感じた時',
  },
  {
    id: 'life-health-048',
    japanese: '自律神経やられてる',
    english: [
      "system's all messed up",
      "my body's all out of whack from stress and bad sleep",
      "I think the stress is messing with my whole system, I feel off in every way",
      "I can't sleep but I'm tired. I'm hungry but nothing sounds good. I'm cold but I'm sweating. my body is sending contradictory signals like a government press conference. the doctor said it's autonomic nervous system stuff and I nodded like I understood but honestly my body is just doing whatever it wants and I'm just living in it."
    ],
    context: "「自律神経」はautonomic nervous systemだけど会話で言ったら医者扱いされる。out of whackが「調子が狂ってる」で完璧。my system's offも使える。英語圏では自律神経の概念が一般的じゃないから症状で説明する方が伝わる。",
    category: 'health',
    subcategory: 'stress',
    situation: '原因不明の不調時',
  },
  {
    id: 'life-health-049',
    japanese: 'コーヒー飲みすぎた',
    english: [
      "too much coffee",
      "I've had way too much coffee and I'm vibrating",
      "I overdid it on the coffee and now my heart is racing and my hands are shaking",
      "five cups. I had five cups before noon. I didn't plan this. each one was going to be the last one. my hands are shaking. my heart rate is doing something creative. I can feel my pulse in my eyeballs. I have transcended tiredness and entered a new dimension where I'm exhausted but also cannot sit still. this is not better than being sleepy."
    ],
    context: "jitteryは「カフェインでソワソワ」の専用語。wiredも「覚醒しすぎ」。heart is racingは「心臓バクバク」。英語にはcaffeine-relatedの語彙が豊富。コーヒー文化が根深い証拠。日本語の「飲みすぎた」は原因だけど英語は症状で語る。",
    category: 'health',
    subcategory: 'caffeine',
    situation: '午前中にコーヒー飲みすぎた時',
  },
  {
    id: 'life-health-050',
    japanese: '深呼吸しよう',
    english: [
      "deep breath",
      "okay, let me just take a deep breath and reset",
      "I need to stop and take a few deep breaths before I lose it completely",
      "okay. breathing. in through the nose, out through the mouth. this is what calm people do. I am not a calm person but I'm doing the breathing thing anyway. someone at work told me to try box breathing and I tried it and all I could think about was boxes. my mind does not want to be calmed. it wants to think about everything at once forever."
    ],
    context: "take a deep breathが「深呼吸する」。breathe(動詞)とbreath(名詞)のスペルに注意。box breathingは4秒吸う・止める・吐く・止めるの呼吸法で英語圏のストレス対策として超メジャー。resetは「リセットする」でそのまま通じる。",
    category: 'health',
    subcategory: 'stress',
    situation: 'イライラした時、不安な時',
  },
];
