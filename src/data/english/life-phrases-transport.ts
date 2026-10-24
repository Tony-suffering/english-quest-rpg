import type { LifePhrase } from './life-phrases';

export const transportPhrases: LifePhrase[] = [
  {
    id: 'life-transport-001',
    japanese: '電車乗り遅れた',
    english: [
      "missed the train",
      "I just missed my train by like two seconds",
      "the doors closed right in front of me, I literally just missed it",
      "two seconds. two seconds is the difference between being on time and standing on this platform like an idiot watching my train leave. I could see the people inside. they looked comfortable. they looked like winners. I am not a winner. I am the guy who ran down the stairs and made eye contact with the conductor as the doors closed. that's my villain origin story."
    ],
    context: "「乗り遅れた」は結果だけ。英語のmissedも同じく結果。でもby like two secondsを足すと「ギリギリだった悔しさ」が出る。just missedのjustが「たった今」と「ほんの少しで」の二重の意味を持つのが英語の便利なところ。",
    category: 'transport',
    subcategory: 'train',
    situation: '目の前で電車のドアが閉まったとき',
  },
  {
    id: 'life-transport-002',
    japanese: '満員電車マジ無理',
    english: [
      "packed trains suck",
      "I can't deal with packed trains anymore",
      "rush hour trains are actually inhumane, I don't know how people do this every day",
      "there is a man's elbow in my rib. there is a backpack pressing into my spine. I can smell what three different people had for breakfast. the concept of personal space does not exist here. we are all one organism now. a sweaty, miserable, commuting organism. and the worst part is I paid money for this experience. I voluntarily bought a ticket to suffer."
    ],
    context: "「マジ無理」は拒絶の最終形。can't dealは「もう処理できない」。inhumaneは大げさだけど通勤者の本音。英語はpacked/crowded/jammed/stuffedと「ぎゅうぎゅう」の語彙が豊富。日本語は「満員」一語で済ませるのと対照的。",
    category: 'transport',
    subcategory: 'train',
    situation: '朝のラッシュで押しつぶされているとき',
  },
  {
    id: 'life-transport-003',
    japanese: '電車遅延してるわ',
    english: [
      "train's delayed",
      "of course the train is delayed again",
      "my train is delayed and nobody is telling us anything",
      "delayed. again. no explanation. no estimated time. just a vague announcement that says we apologize for the inconvenience. you know what would be less inconvenient? information. any information. a number. a reason. a vague hand gesture. anything. I'm standing here refreshing the app and the app is also confused. even the technology doesn't know what's happening."
    ],
    context: "「してるわ」の「わ」は発見+諦め。英語のof courseが同じ温度。「また来たか」の予想通り感。delayedは受動態だけど誰のせいかは問わない。日本語の「遅延」も同じく責任をぼかす。両言語とも犯人不明のまま怒る構造。",
    category: 'transport',
    subcategory: 'train',
    situation: '駅で遅延情報を見たとき',
  },
  {
    id: 'life-transport-004',
    japanese: '渋滞ハマった',
    english: [
      "stuck in traffic",
      "I'm completely stuck in traffic right now",
      "I've been sitting in traffic for thirty minutes and I haven't moved at all",
      "I have not moved in twenty minutes. my car is a very expensive chair right now. I could have walked. I could have crawled. a turtle would have passed me by now. I'm watching the estimated arrival time on my GPS go from twenty minutes to thirty to forty-five and I swear it's mocking me. this road has become my home. I live here now."
    ],
    context: "「ハマった」はもう抜け出せない状態。stuck inがドンピシャ。caught in trafficは「巻き込まれた」で、まだ動いている可能性がある。stuckは完全に停止。日本語の「ハマる」の絶望感はstuckの方が正確に伝わる。",
    category: 'transport',
    subcategory: 'car',
    situation: '通勤中に渋滞で全く動かないとき',
  },
  {
    id: 'life-transport-005',
    japanese: '駐車場どこも空いてない',
    english: [
      "no parking anywhere",
      "there's literally no parking anywhere",
      "I've been circling this parking lot for fifteen minutes and nothing is open",
      "I am driving in circles. literally circles. I have passed this same SUV four times. I know its license plate by heart now. every time I see a person walking toward their car I slow down like a creep and stare at them hoping they're leaving. they're not leaving. they're just getting their sunglasses. my hopes have been destroyed six times in the last ten minutes."
    ],
    context: "「どこも空いてない」の「どこも」が効いている。anywhereが完全対応。circlingは「ぐるぐる回る」で駐車場あるあるの行動を一語で描写。日本語の「空いてない」は「空きスペースがない」だけど英語はopenで「開いている」と表現。視点が違う。",
    category: 'transport',
    subcategory: 'parking',
    situation: '休日のショッピングモールで駐車場を探しているとき',
  },
  {
    id: 'life-transport-006',
    japanese: 'タクシー呼ぶわ',
    english: [
      "calling a cab",
      "forget it, I'm just going to grab a taxi",
      "I'm done waiting, let me just call a cab and get out of here",
      "I have officially given up on public transportation. the bus isn't coming. the train is delayed. my legs are tired. my patience is gone. I'm spending money I don't have on a taxi because my sanity is worth more than my savings right now. future me can deal with the credit card bill. present me needs to be horizontal on a couch within twenty minutes."
    ],
    context: "「呼ぶわ」は決断の瞬間。forget itが「もういい」の投げやり感を出す。grabは「さっとつかむ」でcallより気軽。タクシーはcab/taxi/rideと3パターンあって、cabが一番カジュアル。Uber時代はget a rideも定番。",
    category: 'transport',
    subcategory: 'taxi',
    situation: '電車やバスを待つのを諦めたとき',
  },
  {
    id: 'life-transport-007',
    japanese: '終電やばい',
    english: [
      "last train soon",
      "wait, the last train is in like ten minutes",
      "oh no, we need to leave right now or we're missing the last train",
      "what time is it. what time is it. oh no. oh no no no. the last train is in twelve minutes and we are not twelve minutes away from the station. we are at least fifteen minutes away. someone do the math. the math is bad. the math says we are sleeping here tonight or spending forty dollars on a cab. I love how every good night ends with transportation panic."
    ],
    context: "「やばい」は危機感の万能語。英語にこの一語はない。oh noが近いけど弱い。we need to leaveの切迫感で補う。last trainは和製英語じゃなくてそのまま通じる。でもアメリカ人には終電ダッシュの文化がないから温度差がある。",
    category: 'transport',
    subcategory: 'train',
    situation: '飲み会で時間を忘れて終電が迫っているとき',
  },
  {
    id: 'life-transport-008',
    japanese: '乗り過ごした',
    english: [
      "missed my stop",
      "I totally missed my stop, I was zoning out",
      "I fell asleep on the train and now I'm three stations past where I needed to be",
      "I closed my eyes for what I thought was thirty seconds and apparently it was thirty minutes. I am now in a neighborhood I have never seen before. the station name has too many kanji. my phone GPS is recalculating like it's disappointed in me. I have to get on a train going back the other direction and pretend this was intentional. nobody can know about this."
    ],
    context: "「乗り過ごす」は英語だとmiss my stopかride past my stop。zone outは「ぼーっとする」で原因説明。日本語は「乗り過ごす」一語で完結するけど、英語は「どの駅で降りるべきだったのに通過した」と状況説明が必要。情報量が違う。",
    category: 'transport',
    subcategory: 'train',
    situation: 'スマホに夢中で降りる駅を通過したとき',
  },
  {
    id: 'life-transport-009',
    japanese: '道に迷った',
    english: [
      "totally lost",
      "I have no idea where I am right now",
      "I've been walking in circles and I'm pretty sure I'm completely lost",
      "Google Maps says I've arrived. I have not arrived. I'm standing in front of a parking lot. this is not a restaurant. this is concrete and sadness. I've been walking for twenty minutes following a blue dot that clearly hates me. I turned left when it said turn left. I turned right when it said turn right. and now it says I'm in the ocean. I'm not in the ocean. I think."
    ],
    context: "「迷った」はシンプルだけどlostも同じくシンプル。差が出るのは「迷い具合」の表現。totally lost/kind of lost/a little lostで段階がある。日本語の「迷った」は程度が曖昧。英語は形容詞で温度を調整する言語。",
    category: 'transport',
    subcategory: 'walking',
    situation: '知らない場所で道がわからなくなったとき',
  },
  {
    id: 'life-transport-010',
    japanese: 'ナビが変な道案内してくる',
    english: [
      "GPS is wrong",
      "my GPS is taking me through some weird back road",
      "I don't trust this navigation anymore, it's sending me down sketchy side streets",
      "my GPS just told me to turn right into what appears to be someone's driveway. I'm not doing that. I'm not driving into a stranger's yard because a satellite told me to. last time I trusted this thing it took me through an unpaved road in the mountains. I could hear banjo music. I have trust issues with technology now. I'm going back to asking humans for directions."
    ],
    context: "「変な」は主観的な不信感。weirdが完全一致。sketchyは「怪しい」でもう一段不安が上。英語のGPSあるあるはtake me through~で「変なルートを通される」。日本語の「案内してくる」の「くる」は迷惑のニュアンス。英語はsend meで「送り込まれる」感を出す。",
    category: 'transport',
    subcategory: 'navigation',
    situation: 'ナビが明らかにおかしい道を指示してきたとき',
  },
  {
    id: 'life-transport-011',
    japanese: 'チャリで行くわ',
    english: [
      "biking there",
      "I'll just ride my bike, it's not that far",
      "it's close enough to bike, I don't want to deal with parking anyway",
      "bike. final answer. no parking fees. no traffic. no waiting for a bus that shows up when it feels like it. just me and two wheels and the open road. well, the open sidewalk. okay, the narrow sidewalk shared with pedestrians who walk in zigzag patterns like they're avoiding invisible sniper fire. but still. freedom. sort of."
    ],
    context: "「チャリ」はbikeの口語版。ride my bikeが標準だけど、I'll bikeだけでも動詞として成立する。「で行く」の「で」は手段の助詞。英語は前置詞なしでbike thereと動詞化できるのが日本語にない効率性。",
    category: 'transport',
    subcategory: 'bicycle',
    situation: '近場への移動手段を決めるとき',
  },
  {
    id: 'life-transport-012',
    japanese: '歩いた方が早くね？',
    english: [
      "faster to walk",
      "honestly it'd be faster to just walk at this point",
      "we've been waiting so long, we could have walked there by now",
      "the bus app says seven minutes. it said seven minutes twelve minutes ago. at some point the bus became theoretical. it exists in concept only. meanwhile my legs work. they're right here. fully functional. the destination is a fifteen minute walk. we have already spent twenty minutes waiting for a vehicle that may or may not be real. the math is mathing and the math says walk."
    ],
    context: "「早くね？」の「ね？」は提案型の確認。英語のhonestlyが「正直に言うと」で意見を切り出すクッション。at this pointは「もうここまで来たら」で状況の変化を示す。日本語の「方が」（比較）は英語だとfaster to~で処理する。",
    category: 'transport',
    subcategory: 'walking',
    situation: 'バスや電車を待ちすぎて歩いた方が合理的なとき',
  },
  {
    id: 'life-transport-013',
    japanese: 'ガソリン高すぎ',
    english: [
      "gas is insane",
      "gas prices are absolutely ridiculous right now",
      "have you seen gas prices lately? it costs more to fill up than to eat out",
      "I just paid sixty dollars to fill my tank. sixty dollars. I remember when that was a week of groceries. now it's a week of driving to work so I can make money to buy more gas to drive to work. it's a beautiful cycle of financial despair. I'm basically working for my car at this point. my car is my boss. I serve the vehicle."
    ],
    context: "「高すぎ」の「すぎ」は限度超え。英語はinsane/ridiculous/crazyで「常軌を逸している」と表現。too expensiveより感情が乗る。gas pricesは不可算のgasに複数形のpricesがつく。値段を語る時は複数形。これ英語の隠れルール。",
    category: 'transport',
    subcategory: 'gas',
    situation: 'ガソリンスタンドで値段を見てショックを受けたとき',
  },
  {
    id: 'life-transport-014',
    japanese: '高速乗る？下道で行く？',
    english: [
      "highway or local?",
      "should we take the highway or just stick to regular roads?",
      "do you want to take the highway and get there faster, or save the toll and go local?",
      "this is the eternal debate. highway means faster but it costs money and you're locked in. no stopping for snacks. no spontaneous detours. local roads mean freedom. you can stop at that weird roadside shop. you can change your mind. but it takes forever. so the real question is: do you value your time or your money? trick question. I value neither. let's flip a coin."
    ],
    context: "「高速」と「下道」の対比。highwayとlocal/back roadsが対応。stick toは「そのまま行く」。日本語の「下道」は「高速じゃない道」という否定形の定義だけど、英語はlocal roads/side roads/back roadsと選択肢が多い。",
    category: 'transport',
    subcategory: 'highway',
    situation: 'ドライブで高速か下道か相談するとき',
  },
  {
    id: 'life-transport-015',
    japanese: '新幹線取れなかった',
    english: [
      "sold out",
      "the bullet train is completely sold out already",
      "I tried to book a bullet train but everything is sold out for the whole weekend",
      "sold out. everything. every single train. every single seat. I checked Friday. sold out. Saturday. sold out. the one that leaves at five in the morning that nobody should want. sold out. who are these people? where are they all going? is there a secret event I don't know about? is the entire country relocating this weekend? I should have booked last month. I should have booked last year."
    ],
    context: "「取れなかった」は予約の失敗。sold outは「売り切れ」で完全にゼロ。bookedは「埋まっている」でニュアンスが違う。bullet trainは新幹線の英訳として定着済み。Shinkansenもそのまま通じるけど、説明なしで使えるのはbullet train。",
    category: 'transport',
    subcategory: 'shinkansen',
    situation: '連休前に新幹線を予約しようとしたら満席だったとき',
  },
  {
    id: 'life-transport-016',
    japanese: 'この電車合ってる？',
    english: [
      "right train?",
      "wait, is this the right train?",
      "are we on the right train? I feel like we should have transferred by now",
      "I'm going to need someone to confirm that this train is going where I think it's going. because the station name that just flashed by did not look familiar. at all. and the route map on the wall has too many lines and colors and I've lost track of which one is ours. I don't want to be that person who ends up in the wrong city. again. I said again. yes this has happened before."
    ],
    context: "「合ってる？」は正解確認。the right~は英語の「正しい方の」の定番。right train/right bus/right direction全部同じ構造。日本語は「合う」で正誤を判定するけど、英語はrightで「正しい」と直接言う。確信度が高く聞こえる分、間違ってた時が恥ずかしい。",
    category: 'transport',
    subcategory: 'train',
    situation: '乗換案内を見ながら不安になったとき',
  },
  {
    id: 'life-transport-017',
    japanese: 'Uber来ないんだけど',
    english: [
      "Uber's not coming",
      "my Uber has been three minutes away for ten minutes now",
      "I ordered an Uber fifteen minutes ago and the driver keeps circling the block",
      "the app says two minutes. the app has been saying two minutes since before I had wrinkles. the little car icon on the screen is moving but it's moving in the wrong direction. it's going away from me. is my driver lost? is my driver running errands? is my driver living their best life while I stand on this curb like a discarded mannequin? I'm about to cancel and walk."
    ],
    context: "「来ないんだけど」の「んだけど」は文句+説明要求。英語はhas been~for~で「ずっと~のまま」の苛立ちを表現。three minutes away for ten minutesは矛盾を並べることで怒りを可視化する。日本語の「んだけど」の圧を英語は数字の矛盾で代替する。",
    category: 'transport',
    subcategory: 'rideshare',
    situation: '配車アプリで車が全然来ないとき',
  },
  {
    id: 'life-transport-018',
    japanese: '信号長すぎ',
    english: [
      "longest light ever",
      "this red light is taking forever",
      "I swear this traffic light has been red for a solid five minutes",
      "I am convinced this traffic light is broken. or it hates me personally. everyone else's direction has gotten green twice. twice. and I'm still here. watching. waiting. contemplating my life choices. there's a guy next to me who has had time to eat an entire sandwich while waiting for this light. I've aged. my hair is grayer. civilizations have risen and fallen. and the light is still red."
    ],
    context: "「長すぎ」はtaking foreverが口語で完璧。foreverは「永遠」だけど、日常英語では「長すぎ」の誇張表現。a solid five minutesのsolidは「丸々」で、本当に5分という強調。日本語の「すぎ」の過剰感を英語は誇張法で再現する。",
    category: 'transport',
    subcategory: 'traffic',
    situation: '赤信号でずっと待たされているとき',
  },
  {
    id: 'life-transport-019',
    japanese: '飛行機の隣のやつガチャ外れた',
    english: [
      "bad seat neighbor",
      "I got the worst seat neighbor on this flight",
      "the person next to me on the plane is using both armrests and I'm losing my mind",
      "I have been assigned a middle seat next to a man who has claimed both armrests like he's planting a flag on the moon. his elbow is in my personal space. his snoring started before takeoff. he brought a tuna sandwich. a tuna sandwich. in a sealed metal tube at thirty thousand feet. this is chemical warfare. I have eleven more hours of this. I'm going to write my will on a napkin."
    ],
    context: "「ガチャ」はランダム結果。英語にはlottery/luck of the drawが近いけど、seat neighborは「隣の席の人」で直接表現。armrest warは英語圏の飛行機あるある。日本語の「ガチャ外れ」の概念は英語だとgot unlucky withで処理する。文化がない分、説明的になる。",
    category: 'transport',
    subcategory: 'airplane',
    situation: '飛行機で隣の席の人がハズレだったとき',
  },
  {
    id: 'life-transport-020',
    japanese: '空港着いたけど何もすることない',
    english: [
      "too early, nothing to do",
      "I'm at the airport way too early and there's nothing to do",
      "I got to the airport three hours early and now I'm just wandering around killing time",
      "I am the kind of person who arrives three hours early to avoid being one minute late. and now I'm paying for my paranoia by sitting in a terminal with nothing open except a vending machine and my own regrets. I've already walked every gate. I've read every departure board. I've judged every outfit in the lounge. I've run out of ways to waste time and my flight doesn't board for two more hours."
    ],
    context: "「何もすることない」はnothing to doで直訳が成立する珍しいパターン。killing timeは「時間を潰す」で日本語と同じ暴力的メタファー。wandering aroundの「around」が目的なくうろつく感じを出す。英語はwander/roam/strollで「うろつき方」を使い分ける。",
    category: 'transport',
    subcategory: 'airplane',
    situation: '空港に早く着きすぎて暇なとき',
  },
  {
    id: 'life-transport-021',
    japanese: '座れた、ラッキー',
    english: [
      "got a seat, nice",
      "oh sweet, I actually got a seat for once",
      "I can't believe I actually got a seat on the train, today is my lucky day",
      "I got a seat. a seat. on the morning train. during rush hour. this never happens. I feel like I won the lottery except the prize is not standing for forty minutes. the people standing around me are looking at me with envy. I can feel their gaze. I'm sitting and they're not and we all know it. I'm going to enjoy every second of this. this is my throne. I earned this."
    ],
    context: "「ラッキー」はそのまま英語だけどluckyよりsweet/niceが口語では自然。for onceは「珍しく」で普段は座れない前提を一語で暗示。日本語の「ラッキー」は軽い喜びだけど、英語のI can't believeは「信じられない」レベルまで上げてもカジュアルに使える。",
    category: 'transport',
    subcategory: 'train',
    situation: '混んでる電車で奇跡的に座れたとき',
  },
  {
    id: 'life-transport-022',
    japanese: '定期切れてた',
    english: [
      "pass expired",
      "my commuter pass expired and I didn't even notice",
      "I just found out my train pass expired three days ago, I've been paying full fare",
      "my pass expired. three days ago. which means I have been tapping my card at the gate like a responsible adult while it quietly charged me full price every single time. three days of full fare. the gate didn't beep differently. it didn't warn me. it just took my money with the same little chirp. that chirp was a lie. I trusted that chirp. betrayed by a sound effect."
    ],
    context: "「切れてた」の「てた」は発見の過去完了。expiredで「期限が切れた」。didn't even noticeが「気づきもしなかった」で、日本語の「てた」が持つ「知らなかった間に」のニュアンスを補完する。英語は状態変化に気づいた瞬間を描写するのが得意。",
    category: 'transport',
    subcategory: 'train',
    situation: '改札で残高不足に気づいたとき',
  },
  {
    id: 'life-transport-023',
    japanese: '酔った、タクシー使うか',
    english: [
      "too drunk, cabbing it",
      "I'm way too drunk to take the train, let's just cab it",
      "there's no way I'm navigating the train system right now, I'm calling a taxi",
      "I have had enough drinks that the train map looks like modern art. I cannot figure out which line goes where. I can barely figure out which direction is north. putting me on a train right now is a recipe for waking up in a different prefecture. a taxi is not a luxury tonight. it is a public safety measure. I am protecting the other passengers from my confused energy."
    ],
    context: "cab itは動詞化。「タクシーで行く」を2語で片付ける。navigateは「操縦する」で、酔った状態で乗り換えを処理する難しさを表現。there's no wayは「絶対無理」。日本語の「使うか」の軽い決断を、英語はlet's justの「もういいでしょ」で再現する。",
    category: 'transport',
    subcategory: 'taxi',
    situation: '飲み会後にタクシーを使う決断をしたとき',
  },
  {
    id: 'life-transport-024',
    japanese: '車出してくれない？',
    english: [
      "can you drive?",
      "hey, any chance you could drive us there?",
      "would you mind driving? I really don't feel like taking the train",
      "so here's the thing. I don't have a car. you have a car. the destination is not near a train station. see where I'm going with this? I'll pay for gas. I'll buy you coffee. I'll be the best passenger you've ever had. I'll control the music. actually no, you control the music. your car, your rules. I'll just sit there and be grateful. please say yes."
    ],
    context: "「出してくれない？」は車を出す=運転手になってくれという頼み。英語にはこの「車を出す」表現がない。could you driveが最も近い。any chanceは「もしかして可能性ある？」で断りやすさを残すクッション。日本語の「くれない？」の甘え方を英語は選択肢を渡すことで表現する。",
    category: 'transport',
    subcategory: 'car',
    situation: '友達に車を出してほしいとき',
  },
  {
    id: 'life-transport-025',
    japanese: '事故渋滞かよ',
    english: [
      "accident traffic, great",
      "it's accident traffic, are you kidding me",
      "there's been an accident up ahead and traffic is completely backed up",
      "so apparently someone decided to have a fender bender right in the middle of rush hour. perfect timing. could not have picked a worse moment. now three lanes are merging into one and everyone has forgotten how to drive. it's like the accident broke everyone's brain. people are cutting in. people are honking. nobody is moving. we are all just sitting here marinating in collective frustration."
    ],
    context: "「かよ」は怒りと呆れのハイブリッド。are you kidding meが温度的に近い。backed upは「詰まっている」で渋滞の物理的イメージ。fender benderは軽い接触事故の口語表現。日本語の「事故渋滞」は原因+結果の複合語だけど、英語は2文に分けて説明する傾向がある。",
    category: 'transport',
    subcategory: 'traffic',
    situation: '高速道路で事故渋滞に巻き込まれたとき',
  },
  {
    id: 'life-transport-026',
    japanese: 'あと何駅？',
    english: [
      "how many stops?",
      "how many more stops until we get there?",
      "do you know how many stations are left? I keep losing track",
      "I have been on this train for what feels like my entire life. I stopped counting stations around station five. or was it six. the announcement system is saying words but my brain stopped processing them three stops ago. I could check my phone but that would require effort and I have committed to doing absolutely nothing on this ride except existing. someone just tell me when to stand up."
    ],
    context: "「あと何駅」は残り距離を駅数で測る日本語的な発想。how many more stopsで完全対応。stopsはバスでも電車でも使える万能語。stationsは電車専用。leftは「残りの」で、日本語の「あと」と同じ機能。この「あと」=left/more/to goの3択は覚えておくと便利。",
    category: 'transport',
    subcategory: 'train',
    situation: '電車の中で目的地までの距離が気になるとき',
  },
  {
    id: 'life-transport-027',
    japanese: '自転車パンクした',
    english: [
      "got a flat",
      "my bike just got a flat tire, great",
      "my bike tire is completely flat and I'm nowhere near a repair shop",
      "my tire is flat. not a little low. flat. dead flat. this tire has given up on life. I'm standing on the side of the road with a bicycle that is now a very inefficient scooter. I could push it to a repair shop but the nearest one is a twenty minute walk and pushing a bike with a flat tire is the most undignified form of transportation known to man. I should have taken the bus."
    ],
    context: "「パンクした」は英語でgot a flat。punctureが語源だけど日常会話ではflatで十分。great/perfectを皮肉で付けるのが英語の定番パターン。日本語の「パンク」は英語からの借用語だけど、英語圏ではpunctureよりflatの方が100倍使われる。借用元と現地で使用頻度が逆転している例。",
    category: 'transport',
    subcategory: 'bicycle',
    situation: '自転車のタイヤがパンクしたとき',
  },
  {
    id: 'life-transport-028',
    japanese: '逆方向乗っちゃった',
    english: [
      "wrong direction",
      "wait, I'm going the wrong direction",
      "I just realized I got on the train going the completely wrong way",
      "I am currently moving away from my destination at high speed. every second that passes I am getting farther from where I need to be. I sat down. I got comfortable. I started scrolling my phone. and then I looked up and saw a station name that made no sense. because it's on the opposite side of the city. I am now the farthest I have ever been from my goal. both literally and metaphorically."
    ],
    context: "「逆方向」はthe wrong directionで直訳が機能する。ただし英語はwrong wayも同義で使える。got on the trainの前置詞onがポイント。日本語の「乗る」は乗り物全般に使えるけど、英語はget on/get in/boardと乗り方で変わる。電車はget on。車はget in。",
    category: 'transport',
    subcategory: 'train',
    situation: '電車で逆方向に乗ってしまったと気づいたとき',
  },
  {
    id: 'life-transport-029',
    japanese: '旅行の荷物多すぎ問題',
    english: [
      "packed too much",
      "I always overpack and I never learn",
      "why do I pack like I'm moving to a new country every time I go on a trip",
      "I am bringing four outfits for a two day trip. I have backup shoes. I have a jacket for weather that doesn't exist in the forecast. I have three chargers for two devices. my suitcase weighs more than I do. and I will wear exactly two of these items. the same two items I wear at home. the rest is just anxiety in fabric form. but what if it gets cold. what if there's a formal event. there won't be. but what if."
    ],
    context: "「問題」を名詞で付ける日本語のパターン。英語には直訳がない。overpackは「詰め込みすぎる」で一語で状態を表現。never learnは「一生学ばない」で自虐。日本語の「〇〇問題」は英語ではthe ~ situationかthe ~ issueだけど、口語ではI always~で行動パターンとして描写する方が自然。",
    category: 'transport',
    subcategory: 'travel',
    situation: '旅行前のパッキングで荷物が減らせないとき',
  },
  {
    id: 'life-transport-030',
    japanese: '横入りすんな',
    english: [
      "no cutting in",
      "hey, don't cut in line",
      "excuse me, there's a line here, you can't just skip ahead",
      "I have been standing in this line for fifteen minutes. fifteen. my feet hurt. my patience is thin. and this person just walked up and inserted themselves in front of me like I'm invisible. like I don't exist. like the concept of a queue is a suggestion. it is not a suggestion. it is a social contract. and you just violated it. everyone behind me is thinking what I'm thinking. we are all judging you. silently. aggressively."
    ],
    context: "「横入り」はcut in line/skip the lineで英語にも概念がある。日本語の「すんな」は禁止命令。英語のdon'tも同じだけど、excuse meを前につけると「丁寧に怒る」という高度な技が使える。怒りを敬語でくるむのは日英共通の大人スキル。",
    category: 'transport',
    subcategory: 'manners',
    situation: '電車やバスの列に割り込まれたとき',
  },
  {
    id: 'life-transport-031',
    japanese: 'この道通れないじゃん',
    english: [
      "road's blocked",
      "this road is completely blocked, now what",
      "the road I was planning to take is closed, I have to reroute everything",
      "closed. the road is closed. there is a sign. there are cones. there is a person in a vest waving me away from the road I need. the one road. the only road I know how to use to get where I'm going. my GPS is having a panic attack. it's recalculating. it's been recalculating for thirty seconds which in GPS years is an eternity. I'm going to have to go a completely different way and I don't like change."
    ],
    context: "「じゃん」は発見+軽い文句。now whatが「で、どうすんの」で同じ温度。blockedとclosedはニュアンスが違って、blockedは「何かが塞いでいる」、closedは「公式に通行止め」。日本語の「通れない」はどっちも含むけど英語は原因で単語が変わる。",
    category: 'transport',
    subcategory: 'navigation',
    situation: '通ろうとした道が工事で通れないとき',
  },
  {
    id: 'life-transport-032',
    japanese: '免許更新行かなきゃ',
    english: [
      "license renewal time",
      "I need to go renew my driver's license before it expires",
      "my license is about to expire and I keep putting off going to the DMV",
      "my license expires next week and I have known this for three months. three months of knowing and zero months of doing anything about it. the DMV is my least favorite place on earth. it's where time goes to die. you take a number and that number is your age when you finally get called. I'm going to bring a book. and snacks. and probably a sleeping bag. this is going to take all day."
    ],
    context: "「行かなきゃ」は義務感。need toが対応。keep putting offは「ずっと先延ばしにしている」。procrastinateより口語的。DMV(Department of Motor Vehicles)はアメリカの免許センターで「行きたくない場所」の代名詞。日本語の「面倒くさい」が英語ではDMVという固有名詞に凝縮されている。",
    category: 'transport',
    subcategory: 'car',
    situation: '免許の更新期限が近づいているとき',
  },
  {
    id: 'life-transport-033',
    japanese: 'まだ着かないの？',
    english: [
      "are we there yet?",
      "seriously, how much longer until we get there?",
      "it feels like we've been driving forever, are we anywhere close?",
      "I asked are we there yet twenty minutes ago and the answer was almost. I just asked again and the answer is still almost. almost is not a unit of distance. I need a number. minutes. kilometers. something measurable. my legs are cramped. my phone is at four percent. the scenery has not changed in an hour. I think we might be driving in a loop. are we in a simulation? is this a test?"
    ],
    context: "are we there yet?は英語圏の子供が車で必ず言うフレーズ。大人が使うと「子供みたいに退屈してる」自虐が入る。日本語の「まだ？」のシンプルさに比べて、英語はare we there yetという完成された文化的フレーズがある。直訳じゃなく文化ごと借りる例。",
    category: 'transport',
    subcategory: 'car',
    situation: '長距離ドライブで退屈してきたとき',
  },
  {
    id: 'life-transport-034',
    japanese: '酔い止め飲んどけばよかった',
    english: [
      "should've taken something",
      "I should have taken motion sickness pills before this",
      "I knew I'd get carsick and I still didn't take any medicine, what's wrong with me",
      "my stomach is making decisions I did not approve. the car is moving and my insides are moving independently. I had the motion sickness pills. they were on the counter. I looked at them. I thought nah I'll be fine. I am not fine. past me was an overconfident fool. the road is curving and my body is rejecting every curve like a food critic rejecting a bad appetizer. pull over. please pull over."
    ],
    context: "「飲んどけばよかった」の「ば」は後悔の仮定法。should haveが英語の後悔表現の柱。could have/would haveもあるけど、should haveは「自分のせい」の自覚がある。motion sicknessは乗り物酔い。carsick/seasick/airksickと乗り物別に形容詞がある。日本語の「乗り物酔い」は一語で全部カバー。",
    category: 'transport',
    subcategory: 'car',
    situation: '車に酔ってから酔い止めの存在を思い出したとき',
  },
  {
    id: 'life-transport-035',
    japanese: 'この電車冷房効きすぎ',
    english: [
      "AC's blasting",
      "the AC on this train is way too strong",
      "it's freezing in here, why is the air conditioning cranked up so high",
      "I got on this train to go to work not to visit Antarctica. my arms have goosebumps. my nose is cold. the person across from me is wearing a jacket in July and I thought they were crazy but they were actually a genius. they knew. they prepared. I'm sitting here in a short sleeve shirt slowly becoming a popsicle. this is not a train. this is a refrigerator on rails."
    ],
    context: "「効きすぎ」はACが強すぎること。blastingは「全開で噴き出す」でACの強さを音のイメージで表現。cranked upは「ダイヤルを全開まで回した」。日本語の「効く」は機能しているという意味だけど、英語は効き「すぎ」を動詞の激しさで表現する。形容詞じゃなく動詞で温度を伝える発想。",
    category: 'transport',
    subcategory: 'train',
    situation: '夏に電車の冷房が寒すぎるとき',
  },
  {
    id: 'life-transport-036',
    japanese: 'バス来ないなぁ',
    english: [
      "bus isn't coming",
      "the bus should have been here ten minutes ago",
      "I've been standing at this bus stop forever and there's no sign of any bus",
      "the schedule says every fifteen minutes. it has been twenty-five minutes. the schedule is a work of fiction. it was written by someone with a dream and no connection to reality. there are three of us at this stop now. we don't make eye contact. we just stand here. a silent community of abandoned bus waiters. united by disappointment. the bus stop is not a place. it is a state of mind."
    ],
    context: "「なぁ」はため息混じりの独り言。英語のshould have beenが「来ているべきだったのに」で期待外れを表現。no sign ofは「気配すらない」。日本語の「来ない」はただの否定だけど、英語はshould have been/supposed to beで「予定との差」を強調する。",
    category: 'transport',
    subcategory: 'bus',
    situation: 'バス停でバスを待ち続けているとき',
  },
  {
    id: 'life-transport-037',
    japanese: 'イヤホン忘れた、地獄',
    english: [
      "forgot my earbuds",
      "I forgot my earbuds and this commute is going to be torture",
      "I left my earbuds at home and now I have to sit through this entire ride with no music",
      "no earbuds. no music. no podcasts. no escape. just me and the raw unfiltered sounds of public transportation. someone is watching a video without headphones. a baby is making its opinions known. the train is making a sound that might be mechanical failure or might be normal, I can't tell and I can't Google it because I'd normally have my earbuds in and never hear it. ignorance was bliss. awareness is suffering."
    ],
    context: "「地獄」を一語で添える日本語の効率。英語はtortureが近いけど、日本語ほど気軽に「地獄」とは言わない。commute is going to be~で「これからの通勤が~になる」と未来の苦痛を予告する構造。earbudsはイヤホンの主流表現。headphonesは大きいヘッドホン。",
    category: 'transport',
    subcategory: 'train',
    situation: '通勤電車でイヤホンを忘れたことに気づいたとき',
  },
  {
    id: 'life-transport-038',
    japanese: 'これ最寄り駅どこ？',
    english: [
      "nearest station?",
      "hey, do you know which station is closest to here?",
      "I'm trying to figure out which station is the closest, can anyone help me out?",
      "I'm standing in a part of the city I've never been to and I need a train station. any train station. my phone is about to die and I need to find one before it does because once this phone dies I'm navigating by instinct and my instinct is terrible. my instinct once told me to turn left and I ended up at a harbor. I don't need a harbor. I need a ticket machine and a platform."
    ],
    context: "「最寄り」はnearest/closestで完全対応。でも英語ではnearest stationとclosest stationどっちも使う。nearestの方がフォーマル。whichを使うと「複数の中から」選ぶニュアンスが出る。日本語の「最寄り」は一語だけど英語は最上級形容詞が必要で、この差が地味に面倒。",
    category: 'transport',
    subcategory: 'train',
    situation: '知らない場所で駅を探しているとき',
  },
  {
    id: 'life-transport-039',
    japanese: '車検高すぎて泣ける',
    english: [
      "inspection costs are brutal",
      "the car inspection bill is going to make me cry",
      "I just got the estimate for my car inspection and I want to sell the car instead",
      "my car inspection came back. the number has too many digits. I don't want to say the exact amount because I might actually pass out. it costs more to maintain this car than it costs to maintain me. I eat instant noodles and my car gets premium service. my car lives a better life than I do. at some point I stopped owning a car and started working for one. the car is the master now."
    ],
    context: "「泣ける」は本当に泣くわけじゃない比喩。make me cryも同じ誇張。car inspectionは車検。日本の車検制度は海外と違うけど、inspectionという単語は通じる。brutalは「残酷な」で値段の暴力性を表現。日本語の「高すぎて〇〇」構文を英語はso ~ that~で処理するけど、口語ではgoing to make meが自然。",
    category: 'transport',
    subcategory: 'car',
    situation: '車検の見積もりを見てショックを受けたとき',
  },
  {
    id: 'life-transport-040',
    japanese: '遠回りさせられた',
    english: [
      "took the long way",
      "the driver took the longest route possible",
      "I'm pretty sure the taxi driver just took me the long way around on purpose",
      "either this driver doesn't know where he's going or he knows exactly where he's going and that place is my wallet. we turned left three times. that's a circle. I know geometry. we drove past the same convenience store twice. I noticed. I'm not saying anything because confrontation makes me uncomfortable but I'm mentally calculating the extra fare and it's making me silently furious. this is a scenic tour I did not request."
    ],
    context: "「させられた」は使役受身。英語にはこの文法がない。took me the long wayで「遠い道を通られた」と表現するしかない。on purposeを足すと「わざと」の疑惑が出る。日本語の使役受身は「やらされた迷惑感」を一語で出せるけど、英語は文脈で説明する。",
    category: 'transport',
    subcategory: 'taxi',
    situation: 'タクシーで遠回りされたと感じたとき',
  },
  {
    id: 'life-transport-041',
    japanese: 'ETCカード入れ忘れた',
    english: [
      "forgot my toll card",
      "I forgot to put my ETC card in before the highway",
      "I'm about to hit the toll gate and I just realized my toll card isn't in the reader",
      "the toll gate is in four hundred meters. my ETC card is in my other jacket. my other jacket is at home. at home. not in this car. I have three seconds to decide: merge into the cash lane like it's 1998 or reverse on a highway which is illegal and insane. option one it is. I'm paying cash at a toll booth in the modern era. the toll booth worker is going to look at me like I'm a time traveler."
    ],
    context: "ETCは日本固有だけどtoll card/toll passで通じる。英語圏にもE-ZPassやSunPassがある。readerは「読み取り機」。日本語の「入れ忘れた」は動作の忘却。英語はforgot to putで「入れることを忘れた」と不定詞で動作を指定する。forget to doとforget doingの使い分けがここで活きる。",
    category: 'transport',
    subcategory: 'highway',
    situation: '高速道路の料金所手前でETCカードを入れ忘れたと気づいたとき',
  },
  {
    id: 'life-transport-042',
    japanese: 'ここ降りる？次？',
    english: [
      "this stop or next?",
      "wait, do we get off here or at the next stop?",
      "I can never remember if it's this station or the next one, someone help me",
      "the doors are opening. this might be our stop. it might not be. I don't know. the station name looks familiar but they all look familiar at this point. if we get off and it's wrong we have to wait for the next train. if we stay on and it was right we have to come back. both options involve regret. this is Schrodinger's train stop. we are simultaneously in the right place and the wrong place until we step outside."
    ],
    context: "「ここ降りる？」は超短文の確認。get offは電車から「降りる」。get out ofは車から。この使い分けは日本語にない。「降りる」は全部「降りる」。英語は乗り物のサイズで前置詞が変わる。this stop or next?の省略形は英語でも全然OK。むしろ自然。",
    category: 'transport',
    subcategory: 'train',
    situation: '降りる駅が近づいて確認したいとき',
  },
  {
    id: 'life-transport-043',
    japanese: 'サービスエリア寄ろうよ',
    english: [
      "let's stop somewhere",
      "can we pull over at the next rest stop?",
      "let's hit up the next rest area, I need to stretch my legs and grab a coffee",
      "I have been sitting in this car for two hours and my body has forgotten what walking feels like. my legs are asleep. my back is staging a protest. and I smell food from somewhere which means there's a rest stop nearby and my stomach just became the navigator. I don't care if we're making good time. time means nothing when there are fresh meat buns and a clean bathroom waiting for us."
    ],
    context: "「サービスエリア」は和製英語。英語ではrest stop/rest area/service plaza。pull overは「路肩に寄せる」だけど、rest stopに入る時にも使う。hit upは「立ち寄る」のカジュアル表現。stretch my legsは「足を伸ばす」で直訳が成立する珍しいケース。体の動作メタファーは日英で一致しやすい。",
    category: 'transport',
    subcategory: 'highway',
    situation: '長距離ドライブで休憩したくなったとき',
  },
  {
    id: 'life-transport-044',
    japanese: 'めっちゃ揺れるんだけど',
    english: [
      "so bumpy",
      "why is this bus shaking so much, I can't even type",
      "the road is so bumpy I feel like I'm on a roller coaster right now",
      "every pothole on this road has been discovered by this bus. not avoided. discovered. the driver is hitting them all. it's like a personal mission. I tried to drink my water and it became a face wash. I tried to read my phone and the screen turned into a blur. the person next to me is somehow sleeping through this. how. teach me your ways. I need whatever internal gyroscope you have."
    ],
    context: "「揺れる」はbumpy/shaky/roughで表現。bumpyは「ガタガタ」で路面の凸凹感。shakyは「ブルブル」で振動感。roughは「荒い」で全体的な乗り心地の悪さ。日本語の「揺れる」一語に対して英語は原因別に単語が分かれる。何が揺れの原因かで選ぶ言語。",
    category: 'transport',
    subcategory: 'bus',
    situation: 'バスの揺れがひどくてスマホも見れないとき',
  },
  {
    id: 'life-transport-045',
    japanese: '寝過ごして終点まで行った',
    english: [
      "slept to the last stop",
      "I fell asleep and rode the train all the way to the last stop",
      "I knocked out on the train and woke up at the very end of the line",
      "I woke up and the train was empty. empty. that's never a good sign. the lights were brighter somehow. the air felt different. I looked at the station sign and it was a place I have never heard of in my life. the end of the line. the place where trains go to rest. and apparently where I go too when I close my eyes for just a second. one second. that's all it was. one second that was actually forty-five minutes."
    ],
    context: "「終点まで」はall the way to the last stopで距離感を強調。knocked outは「気絶した」で寝落ちの深さを表現。end of the lineは「路線の終端」で、人生のメタファーにもなる英語の面白い表現。日本語の「終点」はただの事実だけど、英語のend of the lineには物語性がある。",
    category: 'transport',
    subcategory: 'train',
    situation: '電車で爆睡して終点で起こされたとき',
  },
  {
    id: 'life-transport-046',
    japanese: '充電切れそう、ナビが',
    english: [
      "phone's dying, GPS too",
      "my phone is about to die and I still need the GPS",
      "my phone is at three percent and I'm in the middle of following navigation directions",
      "three percent. my phone has three percent battery and I am currently relying on it for directions. every second that passes is borrowed time. I'm memorizing the route in case it dies. left at the next light. then straight for two kilometers. then right at the gas station. or was it the convenience store. I've already forgotten. I need this phone to live for four more minutes. just four. please."
    ],
    context: "「切れそう」の「そう」は予測。about to dieが「死にそう」で電子機器にもdieを使う。英語はデバイスの電池切れを「死」と表現する。日本語も「バッテリーが死んだ」と言うから、このメタファーは共通。at three percentと具体的数字で切迫感を出すのは英語の得意技。",
    category: 'transport',
    subcategory: 'navigation',
    situation: '知らない場所でスマホの充電が切れそうなとき',
  },
  {
    id: 'life-transport-047',
    japanese: 'あの運転荒くない？',
    english: [
      "that driver's crazy",
      "did you see that? that driver is insane",
      "that car just cut across three lanes, how is that even legal",
      "I just witnessed a car change lanes like it was playing a video game. no signal. no hesitation. just vibes and velocity. the rest of us are following traffic laws like responsible citizens and this person is out here creating their own rules. they're already six cars ahead. I hate that it worked. I hate that being reckless is faster than being safe. the system rewards chaos and I'm too scared to participate."
    ],
    context: "「荒くない？」は同意を求める否定疑問。英語のdid you see that?も共感を求める構造。aggressiveよりinsane/crazyの方が口語で自然。cut acrossは「横切る」で車線変更の荒さを表現。日本語の「荒い」は運転全体の評価だけど、英語は具体的な行動(cut/swerve/weave)で描写する傾向。",
    category: 'transport',
    subcategory: 'traffic',
    situation: '危険な運転を目撃したとき',
  },
  {
    id: 'life-transport-048',
    japanese: 'スーツケース重すぎて腕もげる',
    english: [
      "suitcase is killing me",
      "this suitcase weighs a ton, my arm is going to fall off",
      "I'm dragging this suitcase through the station and I think my shoulder is dislocating",
      "I packed light. that was the plan. pack light. and then I added one more thing. and one more thing. and somehow one more thing twelve times. now I'm dragging a suitcase that has its own gravitational pull through a train station with no elevator. stairs. so many stairs. my arm is three inches longer than when I started this trip. I'm going to need physical therapy when I get home. and a lighter suitcase."
    ],
    context: "「もげる」は「取れる」の強烈版。fall offが対応。killing meは「殺される」でweighs a tonは「1トンある」。英語の誇張パターンは日本語と同じ方向に誇張する。「重すぎて腕もげる」→weighs a ton, arm is going to fall off。誇張のベクトルが日英で一致する珍しい例。",
    category: 'transport',
    subcategory: 'travel',
    situation: '旅行の重い荷物を持って駅を移動しているとき',
  },
  {
    id: 'life-transport-049',
    japanese: 'ここ一通じゃん、入れない',
    english: [
      "one-way street",
      "shoot, this is a one-way street, I can't go this way",
      "I need to turn around, this street is one-way and I'm going the wrong direction",
      "one-way. of course it's one-way. the one street I need to use is one-way in the exact opposite direction I need to go. now I have to drive around the entire block. which sounds simple except this is downtown and every block is surrounded by more one-way streets all pointing in directions that are not my direction. it's a maze designed by someone who hates drivers. I'm trapped in a spiral of wrong turns."
    ],
    context: "「一通」は「一方通行」の略。one-way streetで完全対応。英語も日常会話ではone-wayだけで通じる。「じゃん」は発見+驚き。shootはshitの上品版で、英語の悪態にもレベルがある。turn aroundは「Uターンする」。日本語の「入れない」を英語はcan't go this wayで方向の問題として処理する。",
    category: 'transport',
    subcategory: 'car',
    situation: '曲がろうとした道が一方通行だったとき',
  },
  {
    id: 'life-transport-050',
    japanese: 'やっと着いた、長かった',
    english: [
      "finally here",
      "oh my god, we finally made it",
      "I thought we'd never get here, that was the longest trip of my life",
      "we're here. we're actually here. I didn't think this moment would come. I've been in some form of transportation for what feels like a calendar year. my legs don't work the way they used to. my concept of distance has been permanently altered. but we made it. the destination exists and we are at it. I'm going to touch the ground and kiss it like the Pope getting off a plane. never again. until next time."
    ],
    context: "「やっと」はfinallyで完全一致。「長かった」の一言に込められた疲労を、英語はthe longest trip of my lifeと最上級で表現する。made itは「着いた」だけど「やり遂げた」のニュアンスもある。到着を達成として祝うのは日英共通。移動は小さな冒険。",
    category: 'transport',
    subcategory: 'travel',
    situation: '長時間の移動を終えてようやく目的地に着いたとき',
  },
];
