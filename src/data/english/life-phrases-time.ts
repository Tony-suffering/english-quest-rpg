import type { LifePhrase } from './life-phrases';

export const timePhrases: LifePhrase[] = [
  {
    id: 'life-time-001',
    japanese: '朝起きれない',
    english: [
      "can't get up",
      "I literally cannot get out of bed",
      "every single morning is a battle between me and my alarm clock, and the alarm keeps losing",
      "my alarm goes off at seven. I hit snooze. it goes off at seven-ten. I hit snooze again. this repeats until eight-fifteen when I bolt upright in a panic because I'm supposed to be at work in forty-five minutes and I haven't even brushed my teeth. this has been my routine for the past three years and I have no plans to change it."
    ],
    context: "can't get upでOK。wake upは「目が覚める」、get upは「布団から出る」。日本語の「起きれない」はget up寄り。目は覚めてるけど体が動かないニュアンスまで含んでるのが日本語の「起きれない」。",
    category: 'time',
    subcategory: 'morning',
    situation: '朝、目覚ましが鳴っても動けないとき',
  },
  {
    id: 'life-time-002',
    japanese: '二度寝した',
    english: [
      "went back to sleep",
      "I accidentally went back to sleep",
      "I woke up, checked my phone, and then somehow fell back asleep for another hour",
      "I set three alarms this morning. three. I woke up at the first one, thought 'I'll just rest my eyes for five minutes,' and the next thing I know it's an hour and a half later and the sun is fully up and my cat is staring at me like I'm a disappointment. which is fair. I am a disappointment. at least to my alarm clock."
    ],
    context: "「二度寝」は英語に一語がない。go back to sleepかfall back asleepで言う。英語は行為をそのまま描写する。「二度」という回数情報は英語では省略されがち。fell back asleepの方が「意図せず寝落ちた」感が出る。",
    category: 'time',
    subcategory: 'morning',
    situation: '二度寝して時間を無駄にしたとき',
  },
  {
    id: 'life-time-003',
    japanese: 'やべ遅刻する',
    english: [
      "gonna be late",
      "oh crap I'm going to be late",
      "I just looked at the time and there's no way I'm making it on time",
      "it's eight forty-seven. I need to be there at nine. it takes thirty minutes to get there. I haven't showered. I haven't eaten. I'm still in my underwear. the math isn't mathing right now. I'm going to do that thing where I sprint to the station and then walk into the office pretending I'm not out of breath. very casual. very cool."
    ],
    context: "gonna be lateは遅刻の定番。日本語の「やべ」は英語のoh crapやshootに当たる。the math isn't mathingはSNS発の新しい表現で「計算が合わない」。英語は時間に関して数字で具体的に語る傾向が強い。",
    category: 'time',
    subcategory: 'late',
    situation: '出発時間を過ぎてることに気づいたとき',
  },
  {
    id: 'life-time-004',
    japanese: '締切やばい',
    english: [
      "deadline's coming",
      "the deadline is breathing down my neck",
      "I've got a deadline coming up and I haven't even started yet",
      "the deadline is tomorrow. tomorrow. I've known about this for two weeks. what have I been doing for two weeks? excellent question. the answer is everything except the thing I was supposed to do. I cleaned my apartment. I reorganized my bookshelf by color. I watched a three-hour documentary about octopuses. but the report? untouched. pristine. mint condition."
    ],
    context: "breathing down my neckは「首筋に息がかかるほど迫ってる」。日本語の「やばい」を一語で訳すのは不可能。状況によってbad/tight/close/screwed全部ありえる。英語は「何がどうやばいか」を言わないと伝わらない。",
    category: 'time',
    subcategory: 'deadline',
    situation: '締切が迫ってるのに何もしてないとき',
  },
  {
    id: 'life-time-005',
    japanese: '週末あっという間だった',
    english: [
      "weekend flew by",
      "the weekend went by way too fast",
      "I blinked and the weekend was over, feels like Friday was five minutes ago",
      "Friday night I was so excited. two whole days of freedom. I was going to sleep in, go to that new cafe, maybe even exercise. it is now Sunday night. I did none of those things. I spent fourteen hours on my phone and took two naps. where did the time go. I genuinely need someone to explain to me where the time went."
    ],
    context: "fly byは「あっという間に過ぎる」の定番。日本語の「あっという間」は音の速さで表現するけど、英語は飛ぶ(fly)か走る(race)で表現する。時間が物理的に移動するイメージ。went byはもう少し中立的。",
    category: 'time',
    subcategory: 'weekend',
    situation: '日曜の夜に現実に引き戻されたとき',
  },
  {
    id: 'life-time-006',
    japanese: 'まだ月曜かよ',
    english: [
      "still Monday",
      "you're telling me it's only Monday",
      "it feels like this week has been going on for three days and it's still only Monday",
      "I just looked at my phone and it says Monday. still Monday. how is it still Monday. I've aged emotionally by about fifteen years since this morning. I've had four meetings, two crises, and someone microwaved fish in the break room. all before lunch. on a Monday. there are four more days of this. four. I'm not going to make it."
    ],
    context: "only Mondayのonlyが絶望感を出す。英語はstill/only/justで「信じられない」を表現するのが得意。日本語の「かよ」は英語のyou're telling meに近い。「嘘だろ」のニュアンスを疑問形で出す技。",
    category: 'time',
    subcategory: 'weekday',
    situation: '月曜の時点でもう疲れ果てたとき',
  },
  {
    id: 'life-time-007',
    japanese: 'もう金曜じゃん',
    english: [
      "already Friday",
      "wait it's already Friday?",
      "hold on, how is it Friday already, I swear it was just Tuesday",
      "someone just said 'happy Friday' and I had to check my phone because I genuinely thought it was Wednesday. this entire week was a blur. I don't remember Thursday at all. like, what did I do on Thursday? I have no memory of it. did Thursday even happen? I'm starting to think I lost a day somewhere and nobody told me."
    ],
    context: "alreadyが「もう」に対応。日本語の「じゃん」は発見+軽い驚き。英語はwait/hold onで「ちょっと待って」と割り込む形で驚きを出す。How is it X already?は時間が思ったより進んでた時の鉄板フレーズ。",
    category: 'time',
    subcategory: 'weekday',
    situation: '気づいたら週末が来てたとき',
  },
  {
    id: 'life-time-008',
    japanese: '月曜が憂鬱',
    english: [
      "Monday blues",
      "I've got the Monday blues real bad",
      "Sunday night hits and I already start dreading Monday morning",
      "it's Sunday evening. the sun is setting. tomorrow is Monday. I can feel it in my bones. this specific sadness that starts around four PM on Sunday and doesn't fully go away until Friday at five. I call it the weekly grief cycle. five stages, five days. by Friday I've reached acceptance. then Saturday resets the whole thing."
    ],
    context: "Monday bluesは英語の定番表現。bluesは「憂鬱な気分」。日曜夜の憂鬱はSunday scariesとも言う。dreadは「恐怖を伴う嫌悪感」で、日本語の「憂鬱」より強め。英語は感情を身体感覚で言うのが好き。feel it in my bones。",
    category: 'time',
    subcategory: 'weekday',
    situation: '日曜の夜に明日を考えて沈むとき',
  },
  {
    id: 'life-time-009',
    japanese: '連休最高',
    english: [
      "long weekend!",
      "a long weekend is exactly what I needed",
      "three days off in a row, I could literally cry from happiness right now",
      "three days. three whole days with no alarm, no emails, no pretending to look busy at my desk. I don't even have plans and that's the best part. no plans means no obligations means I can spend seventy-two hours in my pajamas eating cereal out of the box and watching cooking shows. this is what peak living looks like."
    ],
    context: "「連休」はlong weekendが一番近い。三連休ならthree-day weekend。英語圏ではGWのような大型連休の概念がないのでlong weekendが最大単位感。consecutive holidays/days offとも言えるけど日常会話ではlong weekend一択。",
    category: 'time',
    subcategory: 'holiday',
    situation: '連休の初日にテンション上がってるとき',
  },
  {
    id: 'life-time-010',
    japanese: '暇すぎてやばい',
    english: [
      "so bored",
      "I'm so bored I might actually lose my mind",
      "I have literally nothing to do and it's driving me insane",
      "there's nothing to do. I've scrolled through every app on my phone. twice. I've opened the fridge six times hoping something new appeared. it didn't. I considered cleaning my room but then I sat back down. I'm at the point where I'm watching videos of other people being productive and counting that as being productive myself. this is rock bottom."
    ],
    context: "boredは「退屈」の基本。I might lose my mindは「頭おかしくなりそう」。日本語の「やばい」は良くも悪くも使うけど、ここではdriving me insaneで「狂いそう」に変換。英語は退屈を精神崩壊レベルで誇張するのが定番。",
    category: 'time',
    subcategory: 'free-time',
    situation: '休みなのに何もすることがないとき',
  },
  {
    id: 'life-time-011',
    japanese: '忙しすぎて死ぬ',
    english: [
      "swamped",
      "I'm absolutely swamped right now",
      "I've got so much going on I can barely keep my head above water",
      "I have three reports due tomorrow, a presentation on Thursday, my mom's birthday dinner tonight, and my car needs an oil change that I've been putting off for two months. also I haven't done laundry in a week and I'm wearing my emergency underwear. the ones with the holes. this is what rock bottom looks like and I'm living in it."
    ],
    context: "swampedは「沼にはまった」→「忙殺」。keep my head above waterは「溺れないようにする」で精一杯感。日本語の「死ぬ」は英語でもI'm dyingと言うけど、swamped/drowning/buriedの方が「仕事に埋もれてる」具体性が出る。",
    category: 'time',
    subcategory: 'busy',
    situation: 'タスクが溢れて回らないとき',
  },
  {
    id: 'life-time-012',
    japanese: '時間足りない',
    english: [
      "not enough time",
      "there aren't enough hours in the day",
      "no matter how hard I try, I just can't seem to find enough time for everything",
      "I need like thirty-six hours in a day. twenty-four is a joke. who decided twenty-four was enough? was it the same person who decided we need eight hours of sleep? because if I sleep eight hours I only have sixteen hours left and at least ten of those go to work and commuting. that leaves six hours to do everything else. six hours. that's not a life, that's a speed run."
    ],
    context: "not enough hours in the dayは英語の定番フレーズ。日本語は「時間が足りない」と抽象的だけど、英語はhours in the dayと具体的な単位で言う。find timeは「時間を見つける」で、時間が隠れてるものとして扱う英語独特の感覚。",
    category: 'time',
    subcategory: 'busy',
    situation: 'やりたいことに時間が回らないとき',
  },
  {
    id: 'life-time-013',
    japanese: '1年早すぎ',
    english: [
      "year flew by",
      "this year went by insanely fast",
      "I swear we were just celebrating New Year's and now it's almost over",
      "it's October. October. I still have my New Year's resolution list on my fridge and I haven't crossed off a single thing. learn guitar. nope. read twenty books. I read two. go to the gym regularly. I went once in January and then my membership has been donating money to the gym every month since then. time is a scam."
    ],
    context: "fly byがまた登場。時間の速さには英語もfly/race/zoom系の動詞を使う。insanelyは「狂ったように」で副詞の誇張力が強い。日本語の「早すぎ」はtoo fastだけど、flew byの方が「振り返ったらもう終わってた」感が出る。",
    category: 'time',
    subcategory: 'aging',
    situation: '年末に1年を振り返ったとき',
  },
  {
    id: 'life-time-014',
    japanese: '年取るの早い',
    english: [
      "getting old fast",
      "I'm aging at an alarming rate",
      "the older I get, the faster time seems to move and I don't like it one bit",
      "I was twenty-two like five minutes ago. now I'm thirty-one and my knees make sounds when I stand up. when did that start? nobody warned me about the knee sounds. also I get excited about new kitchen appliances now. I saw a really nice rice cooker last week and I thought about it for three days. three days. about a rice cooker. this is what getting old looks like."
    ],
    context: "agingは進行形で「今まさに老けていってる」。at an alarming rateは「やばいスピードで」。日本語の「年取る」は自然現象っぽいけど、英語のget olderは変化の実感を主語で引き受ける。自分事として語る英語の性格が出る。",
    category: 'time',
    subcategory: 'aging',
    situation: '自分の年齢を実感したとき',
  },
  {
    id: 'life-time-015',
    japanese: '深夜テンション上がるのなんで',
    english: [
      "late-night energy",
      "why do I get so wired at like 2 AM",
      "it makes zero sense that I'm exhausted all day but wide awake at midnight",
      "it's two in the morning. I should be asleep. but instead I'm reorganizing my spotify playlists and thinking about that embarrassing thing I said in seventh grade. my brain has decided that right now, at 2 AM, is the perfect time to be creative and productive. where was this energy at three PM when I was falling asleep at my desk? my brain is trolling me. there's no other explanation."
    ],
    context: "wiredは「覚醒しまくってる」。日本語の「テンション」はそのまま英語にならない。energyかvibeが近い。wide awakeは「バッチリ目が覚めてる」。夜型人間の定番悩みだけど英語ではnight owlという可愛い表現もある。",
    category: 'time',
    subcategory: 'night',
    situation: '深夜に謎のやる気が出てしまったとき',
  },
  {
    id: 'life-time-016',
    japanese: '昼寝最高',
    english: [
      "naps rule",
      "a good nap hits different",
      "there's nothing in this world quite like a perfect afternoon nap",
      "I just took a twenty-minute nap and I feel like a completely different person. like I've been reborn. I don't know what the old me was worried about because the new me is unstoppable. this is the power of a nap. someone should do a TED talk about this. I would but I'm thinking about taking another nap first. the second nap is always a gamble though."
    ],
    context: "napは短い睡眠。power napは15-20分の戦略的昼寝。hits differentは「格別」のスラング。日本語の「最高」はthe bestだけど、口語ではhits different/slaps/is chefʼs kissなど体感で表現する方がネイティブっぽい。",
    category: 'time',
    subcategory: 'nap',
    situation: '昼寝から目覚めて生まれ変わった気分のとき',
  },
  {
    id: 'life-time-017',
    japanese: 'あと5分だけ',
    english: [
      "five more minutes",
      "just five more minutes I swear",
      "I'm telling myself five more minutes but we both know that's a lie",
      "five more minutes. that's what I said twenty minutes ago. and twenty minutes before that. at this point 'five more minutes' is not a time estimate, it's a lifestyle. my bed is warm. the outside world is cold and full of responsibilities. the cost-benefit analysis strongly favors staying exactly where I am. five more minutes. final answer. until the next final answer."
    ],
    context: "five more minutesは世界共通の嘘。英語でも日本語でも朝のベッドで同じこと言ってる。I swearは「マジで」と誓うけど、we both knowで自分の嘘を自分で暴露する。この自己ツッコミは英語の日常会話に多い構造。",
    category: 'time',
    subcategory: 'morning',
    situation: '朝、布団から出たくないとき',
  },
  {
    id: 'life-time-018',
    japanese: '今日何曜日だっけ',
    english: [
      "what day is it",
      "wait what day of the week is it",
      "I've completely lost track of what day it is, they all feel the same",
      "I just had to check my phone to find out what day it is. that's where I am mentally. every day just blends into the next like some kind of endless time soup. wake up, work, eat, sleep, repeat. I think it might be Wednesday but I'm not confident enough to bet money on it. actually it's Thursday. see? I had no idea. the days mean nothing anymore."
    ],
    context: "what day is itは曜日を聞く定番。lost track ofは「見失った」。日本語の「だっけ」は確認の「け」で自分に聞いてる。英語ではI can't even tell/I've lost trackで「もうわからん」感を出す。blends intoは「溶け合う」で日が区別つかない感覚。",
    category: 'time',
    subcategory: 'weekday',
    situation: 'リモートワークや連休中に曜日感覚がなくなったとき',
  },
  {
    id: 'life-time-019',
    japanese: '夜更かししちゃった',
    english: [
      "stayed up late",
      "I stayed up way too late again",
      "I told myself I'd go to bed early but it's 3 AM and I'm still up",
      "I was going to sleep at eleven. that was the plan. a solid plan. a reasonable plan. but then I started watching one video and the algorithm took me on a journey. a three-hour journey through conspiracy theories about mattresses. did you know there are way too many mattress stores? anyway it's 2 AM now and I have to be up in four hours. worth it. probably not but I'm saying worth it."
    ],
    context: "stay up lateは「夜更かしする」そのまま。英語は日本語と違って「寝ない」ではなく「起きている」方向で表現する。pull an all-nighterは完徹。日本語の「しちゃった」はagainで「またやった」の後悔ニュアンスを出せる。",
    category: 'time',
    subcategory: 'night',
    situation: '深夜にスマホを見続けて後悔したとき',
  },
  {
    id: 'life-time-020',
    japanese: '朝型になりたい',
    english: [
      "wanna be a morning person",
      "I wish I was a morning person so bad",
      "I keep trying to become a morning person but my body just refuses to cooperate",
      "every Sunday night I decide I'm going to become a morning person. I set my alarm for six. I put my phone across the room so I have to physically get up. Monday morning comes and I somehow sleepwalk across the room, grab my phone, turn off the alarm, and crawl back to bed. all while unconscious. my body has developed countermeasures against my own self-improvement plans."
    ],
    context: "morning personは「朝型人間」。night owlの反対。英語では人をX personと分類する表現が多い。I'm not a morning person=朝ダメな人。my body refusesと体を別人格にする表現は英語の定番ユーモア。",
    category: 'time',
    subcategory: 'morning',
    situation: '何度も早起きに失敗してるとき',
  },
  {
    id: 'life-time-021',
    japanese: '気づいたらこんな時間',
    english: [
      "lost track of time",
      "oh wow I totally lost track of time",
      "I looked up and somehow three hours had passed without me noticing",
      "I sat down at my computer to check one email. one. that was four hours ago. I don't even know what I did for four hours. I definitely didn't just check one email. I think I went down a Wikipedia rabbit hole about the history of ketchup and somehow ended up reading about the Roman Empire. the internet is a time machine that only goes forward."
    ],
    context: "lose track of timeは「時間を見失う」。日本語の「気づいたら」は英語でbefore I knew it/without noticingで「気づかないうちに」。rabbit holeは「ネットの沼」。時間泥棒体験を語る時に英語ではhours disappearedのように時間が消える表現を好む。",
    category: 'time',
    subcategory: 'passing',
    situation: 'スマホやPCに時間を溶かしたとき',
  },
  {
    id: 'life-time-022',
    japanese: '早く帰りたい',
    english: [
      "wanna go home",
      "I just wanna go home already",
      "I've been mentally checked out since 2 PM, just let me go home",
      "my body is at my desk. my soul left the building at two-thirty. I'm physically present but spiritually I'm already on my couch in sweatpants watching cooking videos. every five minutes I check the clock and it's moved forward by approximately thirty seconds. I think the clock is broken. or time itself is broken. either way I need to leave this place."
    ],
    context: "mentally checked outは「心ここにあらず」。I just wanna go homeのjustが切実さを出す。日本語の「帰りたい」は願望一語だけど、英語はalreadyやjust let meで「もう限界」を重ねる。クロックウォッチングは英語圏でも共感度高い話題。",
    category: 'time',
    subcategory: 'work-time',
    situation: '退勤までの時間が永遠に感じるとき',
  },
  {
    id: 'life-time-023',
    japanese: '寝落ちした',
    english: [
      "passed out",
      "I totally passed out on the couch",
      "I was watching something on my phone and the next thing I know it's 3 AM",
      "I was lying on the couch watching a movie. a really good movie apparently because I'll never know how it ended. I woke up at three in the morning with my phone on my face and the Netflix 'are you still watching' screen judging me. yes Netflix, I'm still here. sort of. I'm a conscious being technically. barely."
    ],
    context: "pass outは「気絶するように寝落ちる」。dozed offは「うとうとして寝た」でもう少しソフト。日本語の「寝落ち」はスマホ時代の言葉だけど英語にはピッタリの一語がない。fell asleep without meaning toが正確だけど長い。",
    category: 'time',
    subcategory: 'night',
    situation: 'ソファや床で意図せず寝てしまったとき',
  },
  {
    id: 'life-time-024',
    japanese: '目覚ましうるさい',
    english: [
      "alarm's annoying",
      "my alarm is the worst sound in existence",
      "whoever invented the alarm clock is responsible for ruining every single morning of my life",
      "my alarm sound is the default iPhone one. you know the one. the one that makes your heart rate spike like you're being chased by a bear. I've tried changing it to a gentle melody but then I sleep right through it. so now I'm stuck with cardiac arrest every morning at seven because apparently that's the only thing that works. great system."
    ],
    context: "alarm clockのalarmは元々「警報」。だから不快なのは設計通り。英語のworst sound in existenceは「この世で最悪の音」で大げさに言うのが英語のユーモア。日本語の「うるさい」は音量だけど英語は不快感まで含めて表現する。",
    category: 'time',
    subcategory: 'morning',
    situation: '朝、目覚ましで不快な目覚めをしたとき',
  },
  {
    id: 'life-time-025',
    japanese: '日曜の夜つらい',
    english: [
      "Sunday night dread",
      "Sunday nights are genuinely depressing",
      "Sunday night is when reality crashes the party and reminds you Monday exists",
      "there's a specific kind of sadness that only exists between 6 PM Sunday and midnight. it's not real depression. it's more like a preview of depression. a free trial. the weekend is dying and you can feel it slipping away while you try to squeeze out one more hour of freedom. then you check your work email 'just in case' and ruin whatever peace you had left."
    ],
    context: "Sunday scariesは近年定着した英語表現で「日曜の夜の不安」。dreadは「恐怖混じりの嫌悪」。日本語の「つらい」より具体的。crashes the partyは「空気読まずに乗り込んでくる」。現実が月曜を連れてパーティーに来る比喩。",
    category: 'time',
    subcategory: 'weekend',
    situation: '日曜の夕方から気分が落ちてくるとき',
  },
  {
    id: 'life-time-026',
    japanese: '時間よ止まれ',
    english: [
      "time stop please",
      "I need time to just stop for a second",
      "if I could freeze time right now I absolutely would, no questions asked",
      "there are moments when you just want to hit pause. not even rewind. just pause. like right now. I'm lying in the park and the sun is perfect and I have nowhere to be and nothing is wrong. this is so rare that I'm already anxious about it ending. I'm ruining the moment by worrying about the moment ending. this is the most human thing ever."
    ],
    context: "freeze time/stop timeが定番。hit pauseはリモコン感覚。日本語の「止まれ」は命令形だけど英語はI wish/if I couldと仮定で言うのが自然。命令形でTime, stop!と言うと演劇的になる。英語は願望と命令で温度差が大きい。",
    category: 'time',
    subcategory: 'passing',
    situation: '楽しい時間が終わってほしくないとき',
  },
  {
    id: 'life-time-027',
    japanese: '朝活してる人すごい',
    english: [
      "morning people amaze me",
      "people who do stuff before 8 AM are built different",
      "I genuinely don't understand how some people wake up at 5 to exercise and actually enjoy it",
      "my coworker wakes up at five every day. five. voluntarily. she goes for a run, does yoga, makes a full breakfast, and reads for thirty minutes. all before seven-thirty. I can barely open my eyes before eight. we are not the same species. she's operating on some other level of human evolution. I'm still stuck on the version that wants to hibernate until spring."
    ],
    context: "built differentは「そもそもの作りが違う」のスラング。voluntarilyは「自分の意志で」でツッコミ感を出す。日本語の「すごい」は英語でamazing/impressive/insaneなど。ここではbuilt differentが「尊敬+理解不能」を同時に出せて便利。",
    category: 'time',
    subcategory: 'morning',
    situation: '早起きの人を見て感心するとき',
  },
  {
    id: 'life-time-028',
    japanese: '今月もう終わりじゃん',
    english: [
      "month's already over",
      "how is the month already over",
      "I literally just got paid and the month is already ending, what happened",
      "it's the 28th. the 28th. I still feel like it's the first week of the month. I haven't done any of the things I was going to do this month. I was going to meal prep. I was going to cancel that subscription I don't use. I was going to call my dentist. none of it happened. and now next month is starting and I'm going to say the same things again. the cycle never ends."
    ],
    context: "how is X alreadyは「どうしてもうXなの」の驚き構文。日本語の「じゃん」は発見の感嘆。英語はhow/already/waitの組み合わせで同じ感情を出す。月の速さを語る時はI just got paidが金銭感覚と連動して実感がこもる表現。",
    category: 'time',
    subcategory: 'passing',
    situation: '月末に時の速さに驚いたとき',
  },
  {
    id: 'life-time-029',
    japanese: '待ち合わせに早く着きすぎた',
    english: [
      "way too early",
      "I got here way too early like a weirdo",
      "I'm fifteen minutes early and now I'm just standing here pretending to look at my phone",
      "I'm one of those people who's either fifteen minutes early or five minutes late. there's no in between. today I'm the early version. I've been standing outside this restaurant for ten minutes doing the fake phone check thing. you know, where you pretend to read something important but you're actually just scrolling through your camera roll for the fifth time. being early is its own kind of awkward."
    ],
    context: "way too earlyのwayは「めちゃくちゃ」の強調。日本語の「着きすぎた」はgot here too earlyで直訳OK。like a weirdoは自虐。英語では早く着くことを少し恥ずかしく感じる文化がある。fashionably lateは「おしゃれに遅刻」で遅れが許容される感覚。",
    category: 'time',
    subcategory: 'schedule',
    situation: '約束の場所に早く着いて暇なとき',
  },
  {
    id: 'life-time-030',
    japanese: '5分前行動とかムリ',
    english: [
      "can't be early",
      "being five minutes early every time is not realistic",
      "whoever made up the five-minutes-early rule clearly didn't have my life",
      "people who are always five minutes early scare me. how do they calculate the exact right time to leave? I always either wildly overestimate or underestimate. there's no middle ground. I'm either twenty minutes early sweating in a parking lot or running in five minutes late blaming traffic that didn't exist. time management is a myth invented by people who are naturally punctual."
    ],
    context: "not realisticは「現実的じゃない」。日本語の「ムリ」は英語でnot possible/can't do itだけどnot realisticが「そもそも無理ゲー」感を出す。time management is a mythは「時間管理は都市伝説」で、自虐系のユーモア。",
    category: 'time',
    subcategory: 'schedule',
    situation: '時間通りに行動できない自分にツッコむとき',
  },
  {
    id: 'life-time-031',
    japanese: '休みが足りない',
    english: [
      "need more days off",
      "I don't get nearly enough time off",
      "two days off a week is not enough to recover from five days of work",
      "the work-life ratio is fundamentally broken. five days on, two days off. that's not balanced, that's a scam. by the time Saturday hits I'm so tired I sleep until noon. then Sunday is spent dreading Monday. so really I get about one day of actual freedom per week. one. somebody needs to recalculate this whole system because the math is not working in our favor."
    ],
    context: "not enough/not nearly enoughで「全然足りない」。日本語の「足りない」は量の不足だけど英語は感情込めてnot nearly enoughやnowhere near enoughで「足りなさ加減」を強調する。work-life ratioと数値で語るのも英語的。",
    category: 'time',
    subcategory: 'holiday',
    situation: '休みの少なさに不満があるとき',
  },
  {
    id: 'life-time-032',
    japanese: 'あの頃に戻りたい',
    english: [
      "miss those days",
      "I'd give anything to go back to those days",
      "sometimes I really wish I could just go back in time to when things were simpler",
      "I miss being a kid. not the homework part. not the broccoli part. but the part where your biggest problem was what to watch after school and bedtime felt like a punishment instead of a reward. now bedtime is the highlight of my day. I literally look forward to sleeping. my ten-year-old self would be so confused by who I've become."
    ],
    context: "I miss those daysは「あの頃が懐かしい」。go back in timeは「時間を戻す」。日本語の「戻りたい」は場所のイメージだけど英語はgo back to when〜と「いつ」で特定する。nostalgia(ノスタルジア)は元々「帰郷の痛み」を意味するギリシャ語。",
    category: 'time',
    subcategory: 'nostalgia',
    situation: '昔を思い出して切なくなったとき',
  },
  {
    id: 'life-time-033',
    japanese: '一日が長い',
    english: [
      "longest day ever",
      "today is dragging on forever",
      "this has been the longest day of my life and it's only two in the afternoon",
      "I looked at the clock at what I thought was around four PM. it was one-thirty. one-thirty. I've lived an entire emotional lifetime since nine this morning. I've been bored, angry, confused, briefly happy about a vending machine snack, and now I'm back to bored. and there's still five hours left. how is there still five hours left. time is mocking me."
    ],
    context: "drag onは「ダラダラ長引く」。longest day of my lifeは「人生で一番長い日」で誇張。日本語の「長い」は英語のlongだけど、drag/crawl/creepを使うと時間が這うように進む体感が出る。the clock is mocking meと時計を擬人化するのも英語的。",
    category: 'time',
    subcategory: 'work-time',
    situation: '時間が全然進まない日に絶望してるとき',
  },
  {
    id: 'life-time-034',
    japanese: '秒で終わった',
    english: [
      "over in a flash",
      "that was over in like two seconds",
      "I blinked and it was already done, that was insanely fast",
      "I waited three months for this concert. three months of anticipation. counting down the days. and then it started and it was incredible and then suddenly the lights came on and everyone was leaving and I'm standing there like wait that's it? two hours felt like twenty minutes. the better something is, the faster it goes. that's the cruelest law of physics."
    ],
    context: "in a flashは「一瞬で」。blinkedは「まばたき一回」。日本語の「秒」はin secondsで対応するけど、in a flash/in the blink of an eyeの方が表現として豊か。英語は「楽しい時間=短い」をtime flies when you're having funという諺で言う。",
    category: 'time',
    subcategory: 'passing',
    situation: '楽しみにしてたイベントが一瞬で終わったとき',
  },
  {
    id: 'life-time-035',
    japanese: 'アラーム止めた記憶ない',
    english: [
      "don't remember",
      "I have zero memory of turning off my alarm",
      "apparently I turned off my alarm in my sleep because I have absolutely no recollection of doing it",
      "my alarm was set for seven. I woke up at nine-fifteen. the alarm was off. I definitely didn't consciously turn it off because I have no memory of it happening. my sleeping self is actively sabotaging my waking self. they're two different people with completely opposite goals. sleeping me wants to sleep forever. waking me wants to be a functional adult. sleeping me is winning."
    ],
    context: "no recollection/no memoryは「記憶がない」のフォーマル寄り。日常ではI don't rememberでOK。apparentlyは「どうやら」で「自分でもよくわからんが」のニュアンス。英語では寝てる自分を別人格として語る自虐パターンが人気。",
    category: 'time',
    subcategory: 'morning',
    situation: '無意識にアラームを止めて寝坊したとき',
  },
  {
    id: 'life-time-036',
    japanese: 'もうちょっと寝かせて',
    english: [
      "let me sleep",
      "just let me sleep a little longer please",
      "I'm begging you, just give me five more minutes of sleep, that's all I ask",
      "there's nothing I want more in this world right now than to keep sleeping. you could offer me a million dollars or five more minutes of sleep and I would genuinely have to think about it. that's where I am. that's my current mental state. the bed is warm and the pillow is perfect and whatever is out there waiting for me can wait five more minutes. or thirty."
    ],
    context: "let me sleepはシンプルで直球。I'm begging youは「お願いだから」の切実バージョン。日本語の「寝かせて」は許可を求めてるけど英語のlet meも同じ構造。would have to think about itは「マジで考える」で選択のジレンマをユーモアにする技。",
    category: 'time',
    subcategory: 'morning',
    situation: '誰かに起こされて抵抗するとき',
  },
  {
    id: 'life-time-037',
    japanese: '休み明けだるい',
    english: [
      "post-vacation blues",
      "coming back from a break is the worst",
      "the first day back after time off should be illegal honestly",
      "I had five days off. five beautiful days. and now I'm back at my desk and my body has completely forgotten how to function in an office. how do I sit in this chair? what's my password? why are there four hundred emails? my brain went into vacation mode and it's refusing to come back. like it checked out of the hotel but it's still by the pool sipping something with an umbrella in it."
    ],
    context: "post-vacation bluesは「休み明けの憂鬱」。coming backは「戻る」の行為そのもの。should be illegalは「違法にすべき」で英語の定番誇張。日本語の「だるい」はsluggishが近いけど、the worstの方が感情込めて愚痴れる。",
    category: 'time',
    subcategory: 'holiday',
    situation: '連休明けの出勤初日',
  },
  {
    id: 'life-time-038',
    japanese: '午後の眠気やばい',
    english: [
      "afternoon slump",
      "the afternoon sleepiness is hitting hard",
      "it's 2 PM and my eyelids are staging a full rebellion against staying open",
      "there's a period between 1 PM and 3 PM where I'm technically alive but barely functional. my eyes are open but my brain has gone to lunch and hasn't come back. I'm reading the same paragraph for the fourth time. not because it's complicated, because my brain won't process words right now. this is the food coma. the post-lunch abyss. the 2 PM wall."
    ],
    context: "afternoon slumpは「午後の急降下」で定番ビジネス表現。food comaは「食後の昏睡」。英語は眠気をsleepinessだけでなくwall/slump/crashと障害物や墜落で表現する。staging a rebellionは「反乱を起こす」で体の部位を擬人化。",
    category: 'time',
    subcategory: 'afternoon',
    situation: '昼食後にどうしようもなく眠いとき',
  },
  {
    id: 'life-time-039',
    japanese: '夏休みまだかな',
    english: [
      "summer break when",
      "I'm already counting down to summer vacation",
      "I know it's only March but I need summer break to get here immediately",
      "summer vacation is three months away and I'm already fantasizing about it. I have a mental list of everything I'm going to do. sleep in every day. go to the beach. eat watermelon. do absolutely nothing for at least one full week. the anticipation is the only thing keeping me going right now. it's like a carrot on a stick except the carrot is a hammock and the stick is three months of work."
    ],
    context: "count down toは「カウントダウンする」。日本語の「まだかな」はwhenで「いつ来るの」の待望感。英語ではI can't waitが定番だけどcounting downの方がカレンダーを毎日見てる感じが出る。carrot on a stickは「目の前のニンジン」の慣用句。",
    category: 'time',
    subcategory: 'holiday',
    situation: '長期休暇が待ち遠しくてたまらないとき',
  },
  {
    id: 'life-time-040',
    japanese: '時差ボケつらい',
    english: [
      "jet lag sucks",
      "this jet lag is absolutely destroying me",
      "my body thinks it's 3 AM and I'm supposed to be functioning like a normal human",
      "it's noon here. my body thinks it's four in the morning. my brain is in a different time zone, literally. I fell asleep during lunch. not after lunch, during lunch. face first into my salad. my internal clock is so confused it's basically spinning in circles. they say jet lag takes one day per hour of time difference. I'm seven hours off. see you in a week I guess."
    ],
    context: "jet lagは英語から日本語に入った言葉。lagは「遅延」。my body thinks it's〜は「体がまだ〜だと思ってる」で時差を体感的に説明する英語パターン。日本語の「つらい」はsucks/is killingで「やばい」に変換。destroyingは大げさ表現。",
    category: 'time',
    subcategory: 'travel',
    situation: '海外旅行から帰って体内時計が狂ってるとき',
  },
  {
    id: 'life-time-041',
    japanese: 'もう年末だよ',
    english: [
      "already year-end",
      "how is it the end of the year already",
      "I cannot believe it's December, I literally just finished processing January",
      "it's December. December. my brain is still loading April. I remember setting my New Year's goals and thinking 'I have a whole year' and now the year is over and I did maybe two of the fifteen things on my list. time doesn't just fly, it teleports. one day you're eating New Year's noodles and the next day you're eating New Year's noodles again. what happened in between is a mystery."
    ],
    context: "how is it X alreadyは時間の驚き定番。still loading/processing〜は「まだ処理中」でPCのメタファー。日本語の「だよ」は相手に同意を求める終助詞。英語ではI cannot believe/how is itと不信感を前面に出して共感を誘う。",
    category: 'time',
    subcategory: 'passing',
    situation: '年末に時の速さに愕然とするとき',
  },
  {
    id: 'life-time-042',
    japanese: '今日何もしてない',
    english: [
      "did nothing today",
      "I've done absolutely nothing productive today",
      "it's almost evening and I have literally zero accomplishments to show for this day",
      "I woke up at nine. it is now five PM. in those eight hours I have accomplished the following: got out of bed, made coffee, sat on the couch, moved to a different spot on the couch, thought about doing laundry, decided not to, and ate some crackers. that's it. that's the full list. if this day was a report card it would say 'does not apply himself' and honestly that's fair."
    ],
    context: "did nothingのnothingが全否定。productiveをつけると「生産的なことは何も」。show for itは「見せるものがある」→「成果がない」。日本語の「何もしてない」は英語でも同じ罪悪感があるけど、英語はzero accomplishmentsと数値化する傾向。",
    category: 'time',
    subcategory: 'free-time',
    situation: '休日を無駄にした自覚があるとき',
  },
  {
    id: 'life-time-043',
    japanese: '寝る前のスマホやめられない',
    english: [
      "phone before bed",
      "I can't stop scrolling before bed",
      "I tell myself every night to put the phone down but my hands won't listen",
      "the bedtime routine is supposed to be: brush teeth, read a book, lights out. my actual bedtime routine is: get in bed, open my phone to set an alarm, accidentally open twitter, scroll for ninety minutes, panic about how late it is, set the alarm, open instagram, scroll for another thirty minutes, hate myself, finally sleep. and then do it all again tomorrow."
    ],
    context: "scrollingはSNS時代の基本動詞。put the phone downは「スマホを置け」。my hands won't listenは「手が言うこと聞かない」で体のパーツ反乱シリーズ。英語ではdoomscrolling(破滅的スクロール)という新語もある。やめられない系はcan't stop -ingが鉄板。",
    category: 'time',
    subcategory: 'night',
    situation: '夜、ベッドでスマホをやめられないとき',
  },
  {
    id: 'life-time-044',
    japanese: '土曜なのにアラームで起きた',
    english: [
      "alarm on Saturday",
      "my alarm went off on Saturday and I've never been so betrayed",
      "I forgot to turn off my weekday alarm and it woke me up at 7 on a Saturday",
      "Saturday. the one day I can sleep in. and my alarm goes off at seven because I forgot to turn it off. seven AM on a Saturday. that's a crime. that should be punishable by law. the worst part is once I'm awake I can't fall back asleep so now I'm just lying here at 7 AM on a Saturday with my eyes open, furious. this is the worst start to a weekend in recorded history."
    ],
    context: "betrayedは「裏切られた」。アラームに裏切られるという擬人化が英語のユーモア。sleep inは「遅くまで寝る」の定番。日本語は「なのに」で逆接を出すけど英語はthe one day I can〜and〜で「唯一のチャンスなのに」を構文で表現する。",
    category: 'time',
    subcategory: 'weekend',
    situation: '休日にアラームを止め忘れて起きたとき',
  },
  {
    id: 'life-time-045',
    japanese: '予定詰めすぎた',
    english: [
      "overbooked myself",
      "I way overbooked myself today",
      "I said yes to way too many things and now my schedule is a complete disaster",
      "I have brunch at ten, dentist at noon, gym at two, dinner at six, and drinks at nine. what was I thinking? past me is an absolute menace to present me. past me keeps making plans that present me has to deal with. I'm going to start saying no to things. starting tomorrow. because today is already a lost cause. I need a clone."
    ],
    context: "overbookは「予約しすぎ」。ホテルのダブルブッキングと同じ語。said yes to too manyは「断れなくて受けすぎた」。past me vs present meは英語の自虐ネタの定番構造。日本語の「詰めすぎた」は英語で「入れすぎた」というpack/cram/stuffでも表現できる。",
    category: 'time',
    subcategory: 'schedule',
    situation: '予定を入れすぎてパンクしそうなとき',
  },
  {
    id: 'life-time-046',
    japanese: 'GW何しよう',
    english: [
      "what to do",
      "I have no idea what to do for the long break",
      "everyone's making plans for the holidays and I'm just sitting here with zero ideas",
      "the long weekend is coming up and everyone at work is talking about their plans. road trip. camping. flying to Okinawa. and then someone asks me 'what about you?' and I panic and say 'oh I have some stuff planned' which is a complete lie. my plan is to not have a plan. but when you say that out loud it sounds depressing so I just make something up."
    ],
    context: "what to doは「何しよう」の直訳。have no ideaは「全くわからない」。英語ではGWの概念がないのでlong break/long weekendで訳す。I have some stuff plannedは「いくつか予定ある」で具体性ゼロの誤魔化し。英語でもこの曖昧回答は日常的に使われる。",
    category: 'time',
    subcategory: 'holiday',
    situation: '大型連休の予定が空白のとき',
  },
  {
    id: 'life-time-047',
    japanese: '3時のおやつまでが長い',
    english: [
      "snack time when",
      "is it three o'clock yet I need a snack break",
      "I've been staring at the clock since lunch waiting for it to hit 3 PM",
      "there's a black hole between 1 PM and 3 PM where time moves at half speed. I swear the clock is going backward. I've checked the time fourteen times in the last twenty minutes. all I want is a snack and a five-minute break. is that too much to ask? the afternoon needs a save point. like a checkpoint in a video game. and that checkpoint is three o'clock and a cookie."
    ],
    context: "snack breakは「おやつ休憩」。英語圏でも3時のおやつ概念はあるけどafternoon snackくらいの呼び方。is it X yetは「まだXじゃないの」の焦り構文。save pointはゲーム用語だけど日常会話でも比喩として使う世代が増えてる。",
    category: 'time',
    subcategory: 'afternoon',
    situation: '午後の休憩時間が待ち遠しいとき',
  },
  {
    id: 'life-time-048',
    japanese: '今年こそ何か変えたい',
    english: [
      "this year for real",
      "this year I'm actually going to change something",
      "I say this every January but I mean it this time, something has to change",
      "every year I tell myself this is the year. the year I get in shape. the year I learn something new. the year I finally become the person I've been pretending to be on social media. and every year around March I quietly abandon all of those goals and go back to being the regular version of me. but this year is different. I can feel it. I said that last year too but this time I mean it. probably."
    ],
    context: "this year for realは「今年こそマジで」。I mean it this timeは「今回は本気」。日本語の「こそ」は英語に直訳できない強調助詞。for real/this time/actuallyで「今度こそ」を表現する。New Year's resolutionは「新年の抱負」で1月に立てて3月に忘れるのが世界共通のネタ。",
    category: 'time',
    subcategory: 'new-year',
    situation: '年始に決意を固めてるとき',
  },
  {
    id: 'life-time-049',
    japanese: '時計見るのやめたい',
    english: [
      "stop checking time",
      "I need to stop looking at the clock every two seconds",
      "the more I check the time, the slower it seems to go, but I can't stop",
      "I've entered a loop. I look at the clock. only three minutes have passed. I try to focus on work. I fail. I look at the clock again. two minutes. I try harder. I read one paragraph. I look at the clock. one minute. at this rate I'm going to vibrate out of my chair by five o'clock. a watched pot never boils and a watched clock never hits quitting time."
    ],
    context: "a watched pot never boilsは英語の有名な諺で「見てる鍋は沸かない」。quitting timeは「終業時間」。日本語の「見るのやめたい」は英語でstop -ingで表現。the more I X, the more I Yは「Xすればするほど」の比較構文で日常でもよく使う。",
    category: 'time',
    subcategory: 'work-time',
    situation: '退勤までの時間が気になって仕方ないとき',
  },
  {
    id: 'life-time-050',
    japanese: '永遠に寝てたい',
    english: [
      "sleep forever",
      "I could honestly sleep forever and be fine with it",
      "if sleeping was a career I'd be the most successful person alive",
      "some people dream of becoming doctors or astronauts. I dream of sleeping. not even doing anything cool in my sleep. just sleeping. the act of unconscious horizontal existence. if someone told me I could sleep for a month straight with no consequences I wouldn't even ask questions. I'd just say yes and set up my pillows. this isn't laziness. this is a calling."
    ],
    context: "sleep foreverは「永遠に寝たい」。if X was a careerは「もしXが職業なら」の仮定法ユーモア。日本語の「永遠に」はforeverで直訳OK。英語ではhorizontal existence(水平な存在)のようにシンプルなことを大げさに言い換えるのがコメディの技。",
    category: 'time',
    subcategory: 'sleep',
    situation: '疲れすぎてベッドから出たくないとき',
  },
];
