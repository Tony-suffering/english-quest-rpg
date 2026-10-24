import type { LifePhrase } from './life-phrases';

export const homePhrases: LifePhrase[] = [
  {
    id: 'life-home-001',
    japanese: '部屋散らかりすぎ',
    english: [
      "total mess",
      "my room is a complete disaster right now",
      "I can't even see the floor anymore, this place is a total disaster",
      "I just looked around my room and genuinely could not identify what surface is what. there is a shirt on my desk. there are dishes on my bed. there is a bag of chips on my pillow like it lives there. at what point does a room stop being messy and start being an art installation. I think I have crossed that line."
    ],
    context: "「散らかりすぎ」の「すぎ」は限界突破の合図。英語のdisasterは「自然災害」が原義。部屋を災害扱いするこの大袈裟さが、日本語の「すぎ」と同じ温度感。messだと軽すぎる。",
    category: 'home',
    subcategory: 'clutter',
    situation: '部屋の惨状を目の当たりにしたとき',
  },
  {
    id: 'life-home-002',
    japanese: '片付けなきゃ',
    english: [
      "gotta clean up",
      "I really need to get this place in order",
      "I keep telling myself I need to clean up but here I am on the couch",
      "I have been saying I need to clean for three weeks. every morning I wake up and go today is the day. and then I sit down and open my phone and suddenly it is eleven at night. the mess is not getting worse but it is definitely not getting better. I think the mess and I have reached an understanding. we coexist now."
    ],
    context: "「なきゃ」は義務感だけど実行する気ゼロの場合が多い。英語のneed toも同じ。gotta（got to）はもっとカジュアル。ポイントはgetを使うこと。clean upだけより、get this place in orderの方が「秩序を取り戻す」感がある。",
    category: 'home',
    subcategory: 'clutter',
    situation: '散らかった部屋を前にして重い腰が上がらないとき',
  },
  {
    id: 'life-home-003',
    japanese: 'ゴミの日忘れた',
    english: [
      "missed trash day",
      "I totally forgot it was garbage day again",
      "I missed trash day and now I have to live with this pile for another week",
      "the garbage truck came at seven thirty. I woke up at seven thirty-one. one minute. one single minute between me and a clean kitchen. now I have two weeks of trash sitting there judging me. every time I walk past it I can feel it looking at me. next week I am setting five alarms. I said that last time too."
    ],
    context: "trash dayは「ゴミの日」そのまま。garbage dayも同じ。missedは「逃した」で、forgotは「忘れた」。微妙に違う。missedは結果（間に合わなかった）、forgotは原因（覚えてなかった）。日本語は原因と結果を1文で兼ねてる。",
    category: 'home',
    subcategory: 'garbage',
    situation: 'ゴミ収集日を逃して絶望したとき',
  },
  {
    id: 'life-home-004',
    japanese: 'エアコンの効きが悪い',
    english: [
      "AC's barely working",
      "the air conditioning is not doing its job at all",
      "I've got the AC cranked all the way up and it's still hot in here",
      "it is genuinely thirty-three degrees in this room right now. the AC is on. it has been on for two hours. I can hear it running. it is making noise. it is consuming electricity. but it is not producing cold air. it is just vibing. it is a decorative appliance at this point. I am going to melt into this chair."
    ],
    context: "「効きが悪い」は機械の怠慢を責める日本語。英語のnot doing its jobも同じ擬人化。barelyは「かろうじて」で、ギリギリ動いてる感。cranked upは「全開にした」。dial（つまみ）を回すイメージが残ってる表現。",
    category: 'home',
    subcategory: 'aircon',
    situation: '真夏にエアコンが仕事しないとき',
  },
  {
    id: 'life-home-005',
    japanese: '隣うるさい',
    english: [
      "neighbors are loud",
      "my neighbors are being ridiculous right now",
      "the people next door are so loud I can hear every word of their conversation",
      "it is one in the morning. one. and my neighbor is having what sounds like a concert in his living room. I can identify the song. I know the lyrics now because I have heard it four times. I do not want to be that person who complains but I am rapidly becoming that person. tomorrow I am buying earplugs. industrial grade."
    ],
    context: "「隣」だけで「隣の住人」を指す日本語の省略力。英語はneighborsと言わないと伝わらない。being ridiculousは「ありえない行動をしている」で、単にloudより怒りが乗る。next doorは「隣の」を表す便利な形容詞。",
    category: 'home',
    subcategory: 'neighbors',
    situation: '深夜に隣の部屋がうるさいとき',
  },
  {
    id: 'life-home-006',
    japanese: '洗濯物溜まってる',
    english: [
      "laundry's piling up",
      "my laundry situation is getting out of hand",
      "I've let the laundry pile up so much that I'm running out of clean clothes",
      "I have reached the stage where I am considering turning a shirt inside out and calling it clean. that is where I am. the laundry basket is overflowing. there is laundry on the floor next to the basket. the basket has become symbolic. it represents a system I no longer participate in. I will do laundry tonight. probably."
    ],
    context: "pile upは「積み上がる」で物理的な山のイメージ。getting out of handは「手に負えなくなる」。日本語の「溜まってる」は状態報告だけど、英語はpiling up（進行形）で「今も増え続けている」という動きを含む。",
    category: 'home',
    subcategory: 'laundry',
    situation: '洗濯物が山になっているとき',
  },
  {
    id: 'life-home-007',
    japanese: '鍵忘れた',
    english: [
      "forgot my keys",
      "I left my keys inside like an idiot",
      "I just locked myself out and I don't have a spare anywhere",
      "I am standing outside my own apartment. the door is locked. my keys are on the kitchen table. I can picture them. they are sitting right there next to my coffee mug. mocking me. I checked every pocket twice. I checked pockets I do not even have. the locksmith is going to cost me a fortune and I deserve every yen of that bill."
    ],
    context: "locked myself outは英語特有の構文。自分で自分を閉め出した、という再帰的な表現。日本語は「鍵忘れた」と原因を言うが、英語は結果（締め出された）から言う。思考の順番が逆。",
    category: 'home',
    subcategory: 'keys',
    situation: '家の前で鍵がないことに気づいたとき',
  },
  {
    id: 'life-home-008',
    japanese: '風呂掃除めんどい',
    english: [
      "hate cleaning the bath",
      "cleaning the bathtub is the worst chore ever",
      "I've been putting off cleaning the bathtub and now it's way worse",
      "there is a hierarchy of chores and cleaning the bathtub is at the very top of the ones I refuse to do willingly. you have to get in there. you have to crouch. your back hurts. your knees hurt. and then you look at it and there is still grime. it is a losing battle. I am convinced bathtubs were designed by someone who never had to clean one."
    ],
    context: "「めんどい」は「面倒くさい」の圧縮形。英語にはこの1語がない。the worst chore everで「最悪の家事」と格付けする。putting offは「先延ばし」。先延ばしの結果が悪化する、という因果を英語は1文で言える。",
    category: 'home',
    subcategory: 'bath',
    situation: '風呂のカビと向き合いたくないとき',
  },
  {
    id: 'life-home-009',
    japanese: 'Wi-Fi切れた',
    english: [
      "Wi-Fi's down",
      "the Wi-Fi just dropped and I was in the middle of something",
      "the Wi-Fi went out right when I needed it most, this always happens",
      "I was about to submit something important. the page was loading. I could see the progress bar moving. and then nothing. the Wi-Fi icon went from full bars to a little exclamation mark of betrayal. I tried turning the router off and on. I unplugged it. I stared at it. I considered talking to it. nothing is working. I am one outage away from going to a cafe."
    ],
    context: "Wi-Fi's downのdownは「落ちた」。droppedは「途切れた」。went outは「消えた」。全部微妙に違う。downは状態、droppedは瞬間、went outは機能停止。日本語の「切れた」は全部カバーする万能さ。",
    category: 'home',
    subcategory: 'wifi',
    situation: 'ネットが急に繋がらなくなったとき',
  },
  {
    id: 'life-home-010',
    japanese: '引っ越したい',
    english: [
      "wanna move",
      "I seriously need to find a new place",
      "I've been thinking about moving for months but the whole process is exhausting",
      "every time something breaks or the neighbors are loud or the rent goes up I think about moving. but then I think about packing. and unpacking. and changing my address on fifty different accounts. and carrying boxes up stairs. and I go actually this place is fine. the ceiling leak adds character. I have made peace with my situation."
    ],
    context: "「引っ越したい」は願望だけど、英語のwanna moveはもっと軽い。seriouslyを足して本気度を上げる。find a new placeの方が「次を探す」具体性がある。moveだけだと「動きたい」にも聞こえる。",
    category: 'home',
    subcategory: 'moving',
    situation: '今の部屋に不満が募ったとき',
  },
  {
    id: 'life-home-011',
    japanese: '虫出た',
    english: [
      "there's a bug",
      "I just saw a bug and I am not okay right now",
      "there is a massive cockroach in my kitchen and I need someone to come deal with it",
      "I walked into the kitchen to get water. innocent. peaceful. and there it was. on the wall. just sitting there. looking at me. I looked at it. it looked at me. we had a moment. and then it moved and I screamed and now I am in the bedroom with the door closed. it lives in the kitchen now. that is its kitchen. I have accepted this."
    ],
    context: "「虫出た」の「出た」は「出現した」と「この世に現れやがった」の両方。英語のthere's a bugは冷静すぎる。I am not okayを足して初めて日本語の絶望感に追いつく。bugは虫全般、cockroachで一気に具体化。",
    category: 'home',
    subcategory: 'bugs',
    situation: '家でゴキブリや虫に遭遇したとき',
  },
  {
    id: 'life-home-012',
    japanese: 'トイレ詰まった',
    english: [
      "toilet's clogged",
      "the toilet is clogged and I am panicking",
      "the toilet just clogged and the water level is rising, this is a crisis",
      "there are very few moments in life where you experience true fear. this is one of them. the water is going up. it is not going down. I flushed once and it did not help. I flushed again because apparently I do not learn from mistakes. now I am standing here with a plunger questioning every decision that led to this moment. this is my rock bottom."
    ],
    context: "cloggedは「詰まった」のど真ん中。the water level is risingで一気に緊迫感が出る。日本語は「詰まった」だけで全部伝わるが、英語は状況描写を足さないと深刻さが伝わらない。言語の情報密度の差。",
    category: 'home',
    subcategory: 'toilet',
    situation: 'トイレが詰まってパニックのとき',
  },
  {
    id: 'life-home-013',
    japanese: '宅配便来るから出かけられない',
    english: [
      "waiting for delivery",
      "I can't leave because I'm waiting for a package",
      "I've been waiting for the delivery guy all day and I'm trapped in my own house",
      "the tracking says out for delivery. it has said out for delivery since nine in the morning. it is now three in the afternoon. I cannot leave. I cannot shower. I cannot do anything that would take me more than ten steps from the front door. I am a hostage in my own home. the delivery person has all the power and they do not even know it."
    ],
    context: "「出かけられない」は不可能の表現。I can't leaveで直訳できるが、I'm trappedを使うと「囚われてる」感が出る。out for deliveryは配送業者の定型文。この定型文に振り回される人間の滑稽さが英語でも通じる。",
    category: 'home',
    subcategory: 'delivery',
    situation: '宅配便の時間指定が広すぎて身動き取れないとき',
  },
  {
    id: 'life-home-014',
    japanese: 'ソファから動けない',
    english: [
      "stuck on the couch",
      "I have become one with this couch",
      "I sat down on this couch two hours ago and I physically cannot get up",
      "there is a gravitational field around this couch. I sat down to rest for five minutes and that was at noon. it is now dark outside. I have not eaten. I have not moved. my phone is at two percent and the charger is three meters away. three meters. that might as well be a marathon right now. I live here now. this is where I live."
    ],
    context: "「動けない」は物理的不能に見えて精神的怠惰。become one withは「一体化した」という禅みたいな表現をソファに使う面白さ。stuck onは「はまって動けない」。物理と精神の両方をカバーする。",
    category: 'home',
    subcategory: 'sofa',
    situation: '休日にソファで溶けているとき',
  },
  {
    id: 'life-home-015',
    japanese: 'ベッドから出たくない',
    english: [
      "can't leave bed",
      "my bed is holding me hostage and I am okay with it",
      "every cell in my body is telling me to stay in bed right now",
      "the alarm went off. I heard it. I acknowledged it. I chose to ignore it. my bed is the perfect temperature right now. the pillow is in the perfect position. the blanket is wrapped around me in a way that took hours to achieve. you want me to leave this? for what? the outside world? absolutely not. I am staying right here. call it self-care."
    ],
    context: "holding me hostageは「人質に取られてる」。自分の意思で寝てるのに被害者ぶるユーモア。every cellは「全細胞が」で、日本語の「体が拒否してる」に近い。物理的な次元まで話を持っていく大袈裟さが同じ。",
    category: 'home',
    subcategory: 'bed',
    situation: '朝、布団の誘惑に負けているとき',
  },
  {
    id: 'life-home-016',
    japanese: '掃除機かけるか',
    english: [
      "time to vacuum",
      "I guess I should vacuum before it gets any worse",
      "the floor is getting pretty bad, I should probably vacuum before someone sees this",
      "I just noticed there is a visible layer of dust on the floor. not like you have to look for it. it is just there. openly. confidently. I have been walking past it for days pretending it is not there but today it caught the sunlight and I could not ignore it anymore. fine. I will vacuum. but I want it on the record that I am doing this under protest."
    ],
    context: "「かけるか」の「か」は自分への問いかけ兼決意。I guessは「まあ」のニュアンス。shouldが義務感。beforeは「される前に」で、誰かに見られる恥を予防する動機が見える。日本語は動機を隠すが英語は露出する。",
    category: 'home',
    subcategory: 'cleaning',
    situation: '床の汚れが見て見ぬふりの限界を超えたとき',
  },
  {
    id: 'life-home-017',
    japanese: '排水溝やばい',
    english: [
      "drain's disgusting",
      "the drain is so gross I don't even want to touch it",
      "I haven't cleaned the drain in way too long and it's starting to smell",
      "I lifted the drain cover today. I should not have lifted the drain cover today. what I saw cannot be unseen. there is an ecosystem in there. things are growing. I think something moved. I put the cover back and pretended it did not happen. I will deal with it eventually. eventually could be tomorrow. eventually could be never. we will see."
    ],
    context: "「やばい」の守備範囲の広さ。ここでは「ひどい状態」。英語はgross, disgusting, nastyと細かく分かれる。grossは視覚的な気持ち悪さ、disgustingは嫌悪感、nastyはもう少し攻撃的。日本語は「やばい」1語で全部。",
    category: 'home',
    subcategory: 'cleaning',
    situation: '排水溝の状態と向き合わされたとき',
  },
  {
    id: 'life-home-018',
    japanese: '家賃高すぎ',
    english: [
      "rent's insane",
      "I am paying way too much for this tiny apartment",
      "the amount of rent I pay for this shoebox apartment is genuinely criminal",
      "I pay enough rent every month to finance a small country. and what do I get. one room. a kitchen that is also a hallway. a bathroom where I can touch both walls at the same time. but the listing said cozy and I fell for it. cozy is real estate for you will never have guests over because there is nowhere to put them."
    ],
    context: "shoeboxは「靴箱」で狭い部屋の定番比喩。criminalは「犯罪的」で、法外な値段を攻撃する表現。英語圏でも家賃問題は深刻なのでこの手の表現が豊富。cozyは不動産用語で「狭い」の婉曲表現。",
    category: 'home',
    subcategory: 'rent',
    situation: '家賃の引き落としを見て絶望するとき',
  },
  {
    id: 'life-home-019',
    japanese: '水漏れしてる',
    english: [
      "something's leaking",
      "there's water leaking somewhere and I can't find it",
      "I just noticed a wet spot on the ceiling and I think something is leaking upstairs",
      "there is a stain on my ceiling that was not there yesterday. it is damp. it is growing. I put a bucket under it because that is what people do in movies. the bucket is filling up faster than I expected. I called the landlord. voicemail. I called again. voicemail. I am now having a conversation with a bucket about my life choices."
    ],
    context: "leakは「漏れる」の万能動詞。水、情報、秘密、全部leakで表現できる。英語のwet spotは「濡れた箇所」で、dampは「じめっとした」。日本語の「水漏れ」は原因と現象を1語で言うが、英語は分けて説明する。",
    category: 'home',
    subcategory: 'repair',
    situation: '天井のシミに気づいたとき',
  },
  {
    id: 'life-home-020',
    japanese: '大家に連絡しなきゃ',
    english: [
      "gotta call the landlord",
      "I need to get in touch with my landlord about this",
      "I've been meaning to call my landlord for a week but I keep putting it off",
      "I need to call the landlord. I have needed to call the landlord for eight days. every day I think about it and then I think about actually having to talk on the phone and explain the problem and then I decide it can wait one more day. the problem is not getting better. but my avoidance skills are getting stronger. it is a trade-off."
    ],
    context: "landlordは「大家」。get in touch withは「連絡を取る」の丁寧版。call, text, emailよりフォーマル。putting it offは「先延ばし」。日本語の「しなきゃ」と同じで、義務を認識しつつ行動しない人間の本質。",
    category: 'home',
    subcategory: 'repair',
    situation: '修理依頼を先延ばしにしているとき',
  },
  {
    id: 'life-home-021',
    japanese: '自分で直せるかな',
    english: [
      "maybe I can fix it",
      "I wonder if I can fix this myself without breaking it more",
      "let me try fixing it first before I call someone and spend a fortune",
      "I watched a YouTube tutorial. it looked easy. the guy in the video did it in four minutes. I have been at it for an hour and a half. I have made the problem worse. significantly worse. there are now more parts on the floor than there are in the thing I am trying to fix. I should have called a professional from the start. but no. I had to be a hero."
    ],
    context: "without breaking it moreが素晴らしい。「これ以上壊さずに」という最初から失敗を想定した表現。日本語の「直せるかな」は希望だが、英語のI wonderは不確実性を前面に出す。let me tryは「とりあえずやってみる」のDIY精神。",
    category: 'home',
    subcategory: 'diy',
    situation: '何かが壊れてYouTubeで修理動画を見始めたとき',
  },
  {
    id: 'life-home-022',
    japanese: '洗い物やりたくない',
    english: [
      "hate doing dishes",
      "the dishes can wait, I am not dealing with that right now",
      "the sink is full but I refuse to wash dishes at this hour",
      "the sink is a war zone. there are plates stacked in ways that defy physics. there is a pot from three days ago that I am pretending does not exist. I keep telling myself I will do them after dinner but after dinner I am tired and after being tired I am asleep. this cycle has been going on for a week. I need a dishwasher. or a butler."
    ],
    context: "can waitは「待てる」じゃなくて「後でいい」。物に意思があるような言い方。dealing withは「対処する」で、皿洗いを問題として格上げしている。refuseは「拒否する」で、皿洗いに対して正式に宣戦布告している感じ。",
    category: 'home',
    subcategory: 'dishes',
    situation: 'シンクに積まれた皿と目が合ったとき',
  },
  {
    id: 'life-home-023',
    japanese: '換気扇回しっぱなし',
    english: [
      "fan's still running",
      "I left the exhaust fan on this whole time",
      "I just realized the kitchen fan has been running since last night",
      "I cooked dinner at seven last night. it is now ten in the morning. the exhaust fan has been running for fifteen hours. fifteen hours of continuous ventilation. my kitchen is now the most well-ventilated room in the entire building. possibly the country. the electricity bill is going to be interesting this month. I need to start a checklist."
    ],
    context: "exhaust fanが「換気扇」。left it onは「つけっぱなし」の定番。this whole timeは「ずっと」で、期間の長さに驚く気持ちを含む。日本語の「しっぱなし」は接尾辞1つで放置を表現するが、英語は文構造で説明する。",
    category: 'home',
    subcategory: 'kitchen',
    situation: '換気扇をつけっぱなしにしていたことに気づいたとき',
  },
  {
    id: 'life-home-024',
    japanese: 'ゴミ袋がない',
    english: [
      "out of trash bags",
      "we're out of garbage bags at the worst possible time",
      "I have a full trash can and zero garbage bags, this is a nightmare",
      "the trash is overflowing. I reached for a new bag. the box is empty. there are no backup bags. there are no bags anywhere. I looked in every drawer. I looked under the sink. I checked behind the fridge for some reason. nothing. this is one of those problems that seems small but actually paralyzes your entire household. everything stops until there are bags."
    ],
    context: "out ofは「切らした」の万能表現。牛乳でもガソリンでもゴミ袋でも使える。at the worst possible timeは「最悪のタイミングで」。英語は状況のタイミングの悪さを強調するのが好き。日本語は「ない」で事実だけ言う。",
    category: 'home',
    subcategory: 'garbage',
    situation: 'ゴミを捨てようとしてゴミ袋がないとき',
  },
  {
    id: 'life-home-025',
    japanese: '近所付き合いめんどい',
    english: [
      "neighbors are a hassle",
      "I really don't want to deal with the neighborhood stuff",
      "I just moved here and the neighborhood association already has expectations",
      "I moved into this apartment for peace and quiet. instead I got a neighborhood association that meets monthly. monthly. they discuss parking rules and garbage schedules and someone's dog. I have to smile and nod and pretend I care about the community garden. I do not care about the community garden. I just want to go home and be left alone."
    ],
    context: "hassleは「面倒事」で日本語の「めんどい」にぴったり。deal withは「対処する」。neighborhood associationは「町内会/自治会」。英語圏にもあるが、日本ほど強制力がない。expectationsは「期待=暗黙の義務」。",
    category: 'home',
    subcategory: 'neighbors',
    situation: '町内会や近所付き合いが億劫なとき',
  },
  {
    id: 'life-home-026',
    japanese: '洗濯機回すの忘れてた',
    english: [
      "forgot the laundry",
      "I put clothes in the washer and completely forgot to start it",
      "I loaded the washing machine this morning and just realized I never hit start",
      "I woke up early. I sorted the clothes. I put them in the machine. I added detergent. I closed the lid. and then I walked away. I walked away without pressing start. the clothes have been sitting in there for nine hours. they are not clean. they are exactly as dirty as they were this morning except now they are also damp. I am a functional adult."
    ],
    context: "loadedは「入れた」。hit startの hitは「押す」のカジュアル版。pressよりも雑で日常的。「回す」は日本語特有で、英語は「start（始動する）」か「run（動かす）」。物理的に回転する事実は英語では無視される。",
    category: 'home',
    subcategory: 'laundry',
    situation: '洗濯物を入れたまま放置していたとき',
  },
  {
    id: 'life-home-027',
    japanese: '模様替えしたい',
    english: [
      "wanna rearrange",
      "I'm getting the urge to rearrange my whole room",
      "I feel like moving all the furniture around even though nothing is wrong",
      "it happens every three months. I look around my room and suddenly everything is in the wrong place. the desk should be by the window. the bed should face the other way. the bookshelf needs to move. nothing has changed but everything needs to change. I will spend four hours moving things and end up putting everything back where it was. I know this. I will do it anyway."
    ],
    context: "rearrangeは「配置を変える」。模様替えという概念は英語にはない。rearrange the furnitureが最も近い。getting the urgeは「衝動が来ている」で、合理的理由のない突発的欲求。英語はfeel likeでもこの衝動を表現できる。",
    category: 'home',
    subcategory: 'furniture',
    situation: '突然部屋のレイアウトを変えたくなったとき',
  },
  {
    id: 'life-home-028',
    japanese: '風呂沸かすの忘れた',
    english: [
      "forgot to heat the bath",
      "I forgot to run the bath and now I have to wait",
      "I was planning to take a bath an hour ago but I forgot to heat the water",
      "I got home. I was tired. I thought I will take a nice hot bath. I sat on the couch to rest for just a minute. that minute became an hour. now it is ten at night and I have not pressed the button. the bath is cold. I am cold. everything is cold. I could take a shower but a shower is not a bath. a shower is just standing up and being wet."
    ],
    context: "run the bathは「風呂を溜める」。英語はheat（沸かす）よりrun（水を出す）を使う。蛇口をひねる動作が起点。日本語はボタン1つで沸くが、英語圏は追い焚き文化がないのでrun+waitが基本。文化差がそのまま動詞に出る。",
    category: 'home',
    subcategory: 'bath',
    situation: '風呂を入れ忘れて寒い思いをしているとき',
  },
  {
    id: 'life-home-029',
    japanese: 'カビ生えてる',
    english: [
      "there's mold",
      "I just found mold and I am not handling it well",
      "there's mold growing in the corner and I don't even know how long it's been there",
      "I moved a piece of furniture today. behind it was a civilization. a mold civilization. green and black and possibly sentient. how long has it been there. weeks. months. it could have been there since I moved in. I do not know. what I do know is that I need bleach. a lot of bleach. and possibly a hazmat suit. this is a two-glove situation at minimum."
    ],
    context: "moldは「カビ」。growingを使うと生物として扱う感じ。日本語の「生えてる」も植物的な表現。英語のmoldは数えられない名詞で、a moldとは言わない。there's moldの形。この不可算名詞感が「じわじわ広がる」恐怖を表す。",
    category: 'home',
    subcategory: 'cleaning',
    situation: '家具の裏や浴室でカビを発見したとき',
  },
  {
    id: 'life-home-030',
    japanese: '電球切れた',
    english: [
      "bulb's dead",
      "the light bulb burned out and I have no replacement",
      "the light in the bathroom just died and I've been too lazy to replace it",
      "the bathroom light has been dead for five days. five days. I have been showering in the dark. well not complete dark. I leave the door open and use the hallway light. it creates a mood. an unintentional mood. I could go buy a replacement. the store is five minutes away. but that requires putting on pants and I am not at that stage of motivation yet."
    ],
    context: "burned outは「燃え尽きた」で、電球にも人にも使う。仕事でburned outなら「燃え尽き症候群」。deadは「死んだ」で、機械の故障を生死で表現する英語の癖。日本語の「切れた」は糸が切れるイメージ。比喩の出発点が違う。",
    category: 'home',
    subcategory: 'repair',
    situation: '電球が切れたまま放置しているとき',
  },
  {
    id: 'life-home-031',
    japanese: '収納が足りない',
    english: [
      "no storage space",
      "there is absolutely nowhere to put anything in this apartment",
      "I keep buying storage solutions but somehow I still don't have enough space",
      "I have three shelves. two boxes. a closet organizer. four baskets from the hundred yen store. I watched an entire series on organizing your life. I bought the book. I followed the method. and I still have stuff everywhere. the problem is not organization. the problem is that I own too many things. but getting rid of things requires emotional energy I do not have."
    ],
    context: "storage spaceは「収納スペース」。nowhereは「どこにも場所がない」の強調。storage solutionsは「収納グッズ」で、problemをsolutionで解決しようとする構図が面白い。英語はsolution（解決策）という単語を商品名にも使う。",
    category: 'home',
    subcategory: 'clutter',
    situation: '物が多すぎて収納場所がないとき',
  },
  {
    id: 'life-home-032',
    japanese: '隣の工事うるさすぎ',
    english: [
      "construction noise",
      "the construction next door is driving me insane",
      "they've been doing construction next door since seven in the morning and I can feel the vibrations",
      "seven in the morning. seven. on a saturday. the drilling started at seven. who approved this. who looked at a calendar and said saturday at seven sounds perfect. my walls are shaking. my coffee is vibrating in the cup like that scene from Jurassic Park. I put headphones on. I can still hear it through the headphones. that should not be physically possible."
    ],
    context: "driving me insaneは「気が狂いそう」。日本語の「うるさすぎ」より強い。feel the vibrationsで「振動を感じる」。音だけでなく体感に落とすと英語の表現が一段リアルになる。次元を1つ上げる。",
    category: 'home',
    subcategory: 'noise',
    situation: '近隣の工事音に悩まされているとき',
  },
  {
    id: 'life-home-033',
    japanese: '荷物届いた',
    english: [
      "package came",
      "my package finally showed up and I am unreasonably excited",
      "the package I ordered three days ago just arrived and it feels like my birthday",
      "the doorbell rang. I knew what it was. I have been checking the tracking every hour since yesterday. I opened the door. the box was there. beautiful. perfect. I brought it inside. I opened it carefully. and then I held it. the thing I ordered. the thing I definitely needed. the thing that is absolutely not an impulse purchase. I am very happy. no regrets. yet."
    ],
    context: "showed upは「現れた」で、人にも荷物にも使える。arrivedよりカジュアル。unreasonably excitedは「不合理なほど興奮してる」。荷物1つで大喜びする自分をメタ的に笑う表現。英語はこの自己ツッコミ構造が得意。",
    category: 'home',
    subcategory: 'delivery',
    situation: 'ネットで注文した荷物が届いたとき',
  },
  {
    id: 'life-home-034',
    japanese: '置き配でいい',
    english: [
      "just leave it",
      "they can just leave it at the door, I don't care",
      "I always set it to leave at the door because I don't want to talk to anyone",
      "I discovered the leave at door option and my life changed. I do not have to put on a shirt. I do not have to make eye contact. I do not have to say thank you in that awkward way where you are both trying to end the interaction. the box just appears. like magic. no human contact required. it is the single greatest innovation of the twenty-first century."
    ],
    context: "leave at the doorが「置き配」。英語はdrop offやleave itでシンプル。日本語の「置き配」は新語だが英語は昔からleave at doorで通じる。I don't care（どうでもいい）が日本語の「でいい」の投げやり感を再現。",
    category: 'home',
    subcategory: 'delivery',
    situation: '宅配便の受け取り方法を選ぶとき',
  },
  {
    id: 'life-home-035',
    japanese: 'コンセント足りない',
    english: [
      "need more outlets",
      "there are not enough outlets and I refuse to buy another power strip",
      "every single outlet in this room is taken and I still need to plug something in",
      "I have a phone charger. a laptop charger. a monitor. a lamp. a fan. a router. that is six things. I have two outlets. two. so I bought a power strip. then I needed another power strip. now I have a power strip plugged into a power strip. I am pretty sure this is how fires start but I have no other options. this apartment was built for the nineteen eighties."
    ],
    context: "outletは「コンセント」。これ重要。コンセント(concentric)は和製英語。英語ではoutlet, socket, plug。power stripは「延長タップ/電源タップ」。takenは「使用中」で、occupied的な意味。空いてない。",
    category: 'home',
    subcategory: 'electrical',
    situation: '電源タップが足りなくてイライラするとき',
  },
  {
    id: 'life-home-036',
    japanese: '窓開けて換気しよ',
    english: [
      "let some air in",
      "let me crack a window, it's stuffy in here",
      "I'm opening the windows because this room has not had fresh air in days",
      "I have been in this room with the windows closed for I do not know how long. the air in here has been recycled by my lungs so many times it is practically a roommate. I just opened the window and the breeze hit me and I realized I had forgotten what outside air feels like. fresh air is wild. it is just there. for free. incredible."
    ],
    context: "crack a windowは「窓を少し開ける」。crackは「ひび割れ」が原義で、少しだけ開ける動作。stuffyは「蒸し暑い/空気がこもった」。日本語の「換気」は漢語で硬いが、英語はlet some air inと日常的な動詞で言う。",
    category: 'home',
    subcategory: 'ventilation',
    situation: '部屋の空気がこもって息苦しいとき',
  },
  {
    id: 'life-home-037',
    japanese: '床がベタベタする',
    english: [
      "floor's sticky",
      "the floor is sticky and I have no idea why",
      "I just walked across the kitchen and my feet were sticking to the floor",
      "there is something on the kitchen floor. I do not know what it is. I do not know when it got there. all I know is that every step I take makes a sound. that peeling sound. like tape coming off. I should mop. I know I should mop. but first I need to figure out what I am mopping. this requires investigation. or I could just wear slippers and ignore it."
    ],
    context: "stickyは「ベタベタ」のど真ん中。sticking toは「くっつく」。英語のstickyは粘着テープ(sticker)と同じ語源。日本語のオノマトペ「ベタベタ」は音の模倣だが、英語はstick（くっつく）という動作から形容詞化。アプローチが逆。",
    category: 'home',
    subcategory: 'cleaning',
    situation: '床の不快感に気づいたとき',
  },
  {
    id: 'life-home-038',
    japanese: '鍵かけたっけ',
    english: [
      "did I lock up",
      "wait, did I lock the door when I left",
      "I'm on the train and I suddenly can't remember if I locked the front door",
      "I am sitting on the train. I have been on this train for ten minutes. and now. right now. the thought appeared. did I lock the door. I remember grabbing my bag. I remember putting on shoes. but the lock. the lock is a blank spot in my memory. it is probably locked. it is almost definitely locked. but that one percent of doubt is going to ruin my entire day."
    ],
    context: "did I lock upのlock upは「施錠する」。upを付けると完了感が出る。日本語の「かけたっけ」の「っけ」は記憶の不確かさを表す専用語尾。英語にこの「っけ」は存在しない。can't rememberやwait, did Iで代替する。",
    category: 'home',
    subcategory: 'keys',
    situation: '外出先で鍵をかけたか不安になったとき',
  },
  {
    id: 'life-home-039',
    japanese: 'ゴキジェット切れてる',
    english: [
      "spray's empty",
      "the bug spray is empty and this is the worst possible timing",
      "there's a cockroach and the bug spray is completely out, I am defenseless",
      "the cockroach appeared. I reached for the spray. the can was light. too light. I pressed the button. nothing came out. a tiny hiss of air and betrayal. the cockroach is still there. I am still here. but now the power dynamic has shifted entirely. I am holding an empty can and we both know it. this is how documentaries about survival begin."
    ],
    context: "bug sprayは「殺虫スプレー」。英語圏はゴキジェットみたいなブランド名じゃなくてbug sprayと言う。defenselessは「無防備」で、虫相手に軍事用語を使う大袈裟さが笑いになる。worst possible timingは最悪のタイミング。",
    category: 'home',
    subcategory: 'bugs',
    situation: '虫が出たのにスプレーが空だったとき',
  },
  {
    id: 'life-home-040',
    japanese: 'やっと布団干せる',
    english: [
      "finally can air out the futon",
      "it's finally sunny enough to hang out the futon",
      "it's been raining for a week but today is perfect for airing out the futon",
      "seven days of rain. seven. the futon has been absorbing moisture this entire time. it has become heavier. denser. sleeping on it was like sleeping on a cloud. a damp cloud. but today. today the sun is out. the sky is clear. I am carrying this futon to the balcony with the energy of someone who has been waiting for this moment. this is my victory."
    ],
    context: "air outは「干す/風を通す」。hang outは「掛けて干す」。日本語の「布団干す」は布団文化圏の概念で、英語圏はマットレスなので干さない。futonは英語でも通じるが、意味が「薄いソファベッド」に変わる。文化ごとモノが変わる。",
    category: 'home',
    subcategory: 'laundry',
    situation: '晴れた日に布団を干せる喜び',
  },
  {
    id: 'life-home-041',
    japanese: 'また水道代上がった',
    english: [
      "water bill went up",
      "the water bill is higher again and I don't know what I'm doing wrong",
      "I just got the water bill and it's way higher than last month for no reason",
      "I live alone. I take short showers. I do not water a garden. I do not have a swimming pool. I do not wash my car because I do not have a car. so why. why is my water bill higher than last month. am I sleep-showering. is there a leak I do not know about. or is the meter just making up numbers. something does not add up and I am offended."
    ],
    context: "went upは「上がった」のシンプル版。higherは比較級で前月比を暗示。for no reasonは「理由もなく」で、原因不明のストレスを表現。日本語の「また」は繰り返しの嫌気。英語はagainで、毎回言ってる感を出す。",
    category: 'home',
    subcategory: 'utilities',
    situation: '水道の請求書を見て驚いたとき',
  },
  {
    id: 'life-home-042',
    japanese: '洗濯物乾かない',
    english: [
      "laundry won't dry",
      "my laundry has been hanging for two days and it's still damp",
      "it's so humid that nothing is drying no matter how long I leave it out",
      "I hung the laundry yesterday morning. it is now tomorrow evening. the shirts are still wet. not damp. wet. the air is so humid that the laundry is actually absorbing more moisture from the atmosphere. it is getting wetter. I am fighting physics and losing. the dryer at the laundromat costs three hundred yen. that is starting to look like a bargain."
    ],
    context: "won't dryのwon'tは「頑として乾かない」。洗濯物に意思があるかのような拒否のwill not。dampは「じめっとした」でwetより弱い。humidは「湿度が高い」。日本語は「乾かない」1語だが、英語は原因(humid)と結果(damp)を分けて言う。",
    category: 'home',
    subcategory: 'laundry',
    situation: '梅雨や雨続きで洗濯物が乾かないとき',
  },
  {
    id: 'life-home-043',
    japanese: 'シャワーの水圧弱い',
    english: [
      "water pressure's weak",
      "the shower pressure is pathetic, I can barely rinse the shampoo out",
      "the water pressure in this apartment is so low that taking a shower takes twice as long",
      "I turned on the shower. what came out was not a shower. it was a suggestion of water. a gentle mist. a light drizzle that could not rinse soap off a spoon. I stood there for twenty minutes trying to wash my hair. the shampoo was still there. laughing at me. I miss my parents' house. their water pressure could strip paint off a wall. that is what I need."
    ],
    context: "patheticは「情けない」で、人にも物にも使える攻撃力のある形容詞。water pressureは「水圧」そのまま。barelyは「かろうじて」。rinse outは「すすぎ落とす」。英語はシャワーの質を語る語彙が豊富。住環境への要求が高い文化。",
    category: 'home',
    subcategory: 'bath',
    situation: 'シャワーの水圧に不満があるとき',
  },
  {
    id: 'life-home-044',
    japanese: '段ボール溜まってきた',
    english: [
      "boxes piling up",
      "I have way too many cardboard boxes and I keep not breaking them down",
      "the cardboard boxes from online orders are taking over my hallway",
      "I order things online. the things come in boxes. I take the things out. the boxes stay. they stay in the hallway. then in the corner. then they start leaning against the wall like they pay rent. I need to break them down and take them to recycling but that requires a box cutter and motivation. I have neither. the boxes win. again."
    ],
    context: "cardboard boxesは「段ボール箱」。break them downは「畳む/解体する」。pile upは「溜まる」。taking overは「占拠する」で、段ボールに支配されている構図。like they pay rentは「家賃払ってるかのように」居座る比喩。",
    category: 'home',
    subcategory: 'garbage',
    situation: 'ネット通販の段ボールが増殖しているとき',
  },
  {
    id: 'life-home-045',
    japanese: 'ベランダ汚い',
    english: [
      "balcony's filthy",
      "my balcony is disgusting and I've been avoiding it all summer",
      "I haven't cleaned the balcony in months and it looks like an abandoned building",
      "I opened the balcony door today. it was a mistake. there is dirt. there are dead leaves from a tree I do not even own. there is a spider web complex enough to have its own postal code. I used to have a plant out there. it is dead now. it died a quiet death while I was not paying attention. the balcony is a timeline of my neglect."
    ],
    context: "filthyはdirtyの強化版。「不潔」に近い汚さ。abandoned buildingは「廃墟」で、自分のベランダを廃墟に例える自虐。avoidingは「避けてた」で、掃除しないのではなく存在から目を逸らしていた、というニュアンス。",
    category: 'home',
    subcategory: 'cleaning',
    situation: 'ベランダの汚れに気づかないふりをしていたとき',
  },
  {
    id: 'life-home-046',
    japanese: '上の階の足音うるさい',
    english: [
      "upstairs is stomping",
      "the person above me walks like they are trying to go through the floor",
      "I can hear every single step from the apartment above me and it's driving me crazy",
      "I do not know who lives above me. I have never met them. but I know their schedule. they wake up at six. they walk to the bathroom at six oh five. they walk to the kitchen at six ten. I know this because I can hear every footstep through my ceiling. they do not walk. they march. it is like living under a bowling alley. I am considering leaving a note. a polite note. mostly polite."
    ],
    context: "stompingは「ドスドス歩く」。walkよりも重い足音。every single stepのsingleが「1歩残らず全部」を強調。driving me crazyは「気が狂いそう」の定番。upstairsは「上の階」で名詞・副詞・形容詞全部いける便利な語。",
    category: 'home',
    subcategory: 'noise',
    situation: '上の階の住人の足音に悩まされているとき',
  },
  {
    id: 'life-home-047',
    japanese: '冷蔵庫の中やばいことになってる',
    english: [
      "fridge is scary",
      "I am afraid to look in the back of my fridge right now",
      "there is something in the fridge that I bought weeks ago and I am scared to open it",
      "I opened the fridge to get milk. normal activity. but then I saw it. in the back. behind the soy sauce. a container. I do not remember putting it there. I do not remember what is in it. the lid is slightly warped which is never a good sign. I could open it. I could investigate. or I could close the fridge and pretend I never saw it. option two. definitely option two."
    ],
    context: "scaryは「怖い」。冷蔵庫にscaryを使う滑稽さ。afraid to lookは「見るのが怖い」で、恐怖の対象が冷蔵庫。warpedは「歪んだ」で、容器の蓋が膨張している様子。never a good signは「良い兆候じゃない」のunderstatement。",
    category: 'home',
    subcategory: 'kitchen',
    situation: '冷蔵庫の奥で何かが成長しているとき',
  },
  {
    id: 'life-home-048',
    japanese: 'お湯出ない',
    english: [
      "no hot water",
      "the hot water is not working and I am about to lose it",
      "I turned on the shower and nothing but cold water came out, this cannot be happening",
      "I got home from work. tired. cold. all I wanted was a hot shower. I turned the handle. water came out. cold water. ice cold water. I waited. surely it will get warm. it did not get warm. I waited three minutes. still cold. the boiler light is off. I pressed the button. nothing. I am now standing in my bathroom having a conversation with a machine that does not care about my feelings."
    ],
    context: "about to lose itは「もう限界」。lose itの itは正気。正気を失いかけている。nothing butは「ただ～だけ」で、冷水以外何も出ない。this cannot be happeningは「こんなことあり得ない」で、現実拒否の叫び。",
    category: 'home',
    subcategory: 'bath',
    situation: '給湯器が壊れてお湯が出ないとき',
  },
  {
    id: 'life-home-049',
    japanese: '布団カバー替えるのだるい',
    english: [
      "hate changing sheets",
      "putting on a duvet cover is my least favorite activity on earth",
      "I would rather do almost anything else than try to put this duvet cover on",
      "who designed duvet covers. who looked at a perfectly good blanket and said let me make it so that every two weeks a person has to wrestle with a giant cloth bag for twenty minutes. you are inside it. the blanket is outside. then you are both inside it. then the corners do not match. you finally get it right and you are drenched in sweat. from making a bed. this is not okay."
    ],
    context: "duvet coverは「掛け布団カバー」。sheetsは「シーツ」。least favoriteは「一番嫌いな」の婉曲表現。worstと言わずにleast favoriteで「一番好きじゃない」と回りくどく言うのが英語流の嫌味。wrestleは「格闘する」。",
    category: 'home',
    subcategory: 'bed',
    situation: '布団カバーの交換作業に挑むとき',
  },
  {
    id: 'life-home-050',
    japanese: 'やっぱ家が一番',
    english: [
      "home sweet home",
      "nothing beats being home, I swear",
      "after a long day there is literally no place I would rather be than my own apartment",
      "I walked through the door. I took off my shoes. I dropped my bag. I did not have to smile at anyone. I did not have to make small talk. I did not have to pretend to be energetic. I just stood there in my hallway in silence and it was perfect. people talk about traveling the world. I just want my couch and my blanket and zero obligations. that is my paradise."
    ],
    context: "home sweet homeは定番フレーズで「やっぱ我が家」。nothing beatsは「～に勝るものはない」。swearは「誓う」で強調。literallyは「文字通り」だけど、現代英語では「まじで」の強調。家最高を言うときの英語の音の気持ちよさ。",
    category: 'home',
    subcategory: 'relaxation',
    situation: '外出から帰宅してホッとしたとき',
  },
];
