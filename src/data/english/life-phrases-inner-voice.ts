import type { LifePhrase } from './life-phrases';

export const innerVoicePhrases: LifePhrase[] = [
  {
    id: 'life-inner-001',
    japanese: '俺何やってんだろ',
    english: [
      "what am I doing",
      "what am I even doing with my life",
      "seriously what am I doing, like what is the actual point of all this",
      "what am I doing. no really. what am I doing. I'm thirty-something years old sitting in my apartment at 2 AM eating cold rice and staring at my phone like the answers are going to appear between Instagram stories. they're not. the answers are not there. but neither is sleep apparently so here we are."
    ],
    context: "what am I doingは文字通り「何してる」だけど、with my lifeをつけた瞬間に存在的危機になる。英語はwithを足すだけで日常の疑問が哲学になる。日本語は「何やってんだろ」で全部カバーする。",
    category: 'inner-voice',
    subcategory: 'existential',
    situation: '深夜に一人でいるとき',
  },
  {
    id: 'life-inner-002',
    japanese: 'もう無理',
    english: [
      "I can't",
      "I literally cannot do this anymore",
      "I'm done, I physically and emotionally cannot handle one more thing",
      "I can't. I'm saying it. I can't. my brain has left the building. my motivation packed its bags last Tuesday and I haven't heard from it since. if one more person sends me a message that starts with 'quick question' I'm going to throw my laptop into the ocean. I don't even live near the ocean. I'll drive there."
    ],
    context: "I can'tは「できない」だけどI'm doneは「降りる」宣言。英語はcannot→will notの段階がある。日本語の「無理」は能力も意思も全部ひとつの言葉で表現してる。",
    category: 'inner-voice',
    subcategory: 'burnout',
    situation: '仕事や勉強の限界が来たとき',
  },
  {
    id: 'life-inner-003',
    japanese: '明日から本気出す',
    english: [
      "starting tomorrow",
      "I'll get serious starting tomorrow for real",
      "tomorrow is the day I actually get my life together, no excuses",
      "tomorrow. tomorrow is when it all changes. I'm going to wake up at 6 AM, go for a run, eat a salad, read a book, and become the person my parents thought I'd be by now. I've said this fourteen Sundays in a row. but this time it's different. it's not different. I know it's not different. but let me have this."
    ],
    context: "starting tomorrowが永遠に来ない「明日」なのは万国共通。英語圏にもtomorrow never comesという諺がある。for realを足すほど信頼度が下がるのが面白い。",
    category: 'inner-voice',
    subcategory: 'motivation',
    situation: '夜に決意するとき（だいたい続かない）',
  },
  {
    id: 'life-inner-004',
    japanese: 'やっぱ俺ダメだわ',
    english: [
      "I'm hopeless",
      "yeah no I'm just not cut out for this",
      "I keep trying to convince myself I can do this but honestly I'm just not that guy",
      "you know what, I tried. I really tried. and I failed. again. at this point it's not even disappointing anymore, it's just consistent. I'm consistently terrible. that's a skill in itself honestly. most people can't fail this reliably. I should put it on my resume. 'special skills: guaranteed underperformance.'"
    ],
    context: "not cut out for thisは「向いてない」の核心。cut outは型を切り抜く意味で、自分がその型にハマらないイメージ。日本語の「ダメ」は全否定だけど英語はnot cut out for=この分野では、と限定する。",
    category: 'inner-voice',
    subcategory: 'self-deprecation',
    situation: '何かに失敗した直後',
  },
  {
    id: 'life-inner-005',
    japanese: 'なんか虚しい',
    english: [
      "feels empty",
      "I just feel kind of hollow inside",
      "everything is technically fine but something feels really empty and I can't explain it",
      "I'm not sad. I'm not happy. I'm just here. existing. like a houseplant that nobody talks to. I went through my whole day, did everything I was supposed to do, and at the end of it I felt absolutely nothing. not even tired. just hollow. like someone scooped out my insides and replaced them with static noise."
    ],
    context: "hollowは「中が空洞」で虚しさの物理感がある。emptyは容器が空、hollowは中身がくり抜かれた感じ。日本語の「虚しい」はhollowに近い。voidは哲学的すぎる。",
    category: 'inner-voice',
    subcategory: 'existential',
    situation: '特に理由もなく虚しいとき',
  },
  {
    id: 'life-inner-006',
    japanese: '死にたいわけじゃないけど消えたい',
    english: [
      "just want to disappear",
      "I don't want to die, I just want to not exist for a while",
      "it's not that I want to end things, I just want to press pause on being a person for a bit",
      "I don't want to die. let me be very clear about that. I just want to be somewhere where nobody can find me, nobody needs anything from me, and I don't have to be anyone for like a month. maybe a cave. a nice cave. with Wi-Fi. and a convenience store nearby. okay so basically I just want to be alone in my apartment but without the guilt."
    ],
    context: "not exist for a whileが絶妙。dieは終了、disappearは一時離脱。英語はfor a whileで「しばらく」と期間を限定することで深刻さを調整できる。日本語の「消えたい」もそのニュアンス。",
    category: 'inner-voice',
    subcategory: 'existential',
    situation: '全部がしんどいとき',
  },
  {
    id: 'life-inner-007',
    japanese: '今日だけはサボっていい',
    english: [
      "just today though",
      "I'm allowed to slack off just for today",
      "today is officially a write-off day and I refuse to feel guilty about it",
      "today doesn't count. I'm declaring it. this is a government-mandated rest day and the government is me. I'm not being lazy, I'm recovering. from what? from yesterday. what happened yesterday? nothing. but it was exhausting doing nothing. anyway the point is the couch is calling and I'm answering."
    ],
    context: "write-off dayは「もう見切りをつけた一日」。会計用語のwrite off（損金処理）から来てて、今日一日を損失として計上する感じ。slack offは「サボる」のカジュアル表現。",
    category: 'inner-voice',
    subcategory: 'self-permission',
    situation: 'やる気が完全にゼロの朝',
  },
  {
    id: 'life-inner-008',
    japanese: '頑張ってるのに報われない',
    english: [
      "nothing pays off",
      "I try so hard and nothing ever comes of it",
      "I'm putting in all this effort and getting absolutely nothing back",
      "I did everything right. I showed up. I tried. I stayed late. I said yes when I wanted to say no. and what do I get? the same result as the guy who did nothing. actually no, that guy got promoted. he's doing great. meanwhile I'm over here grinding away like a background character in my own life. the universe has a terrible sense of humor."
    ],
    context: "nothing comes of itは「何にもならない」の核。come of=結果として出てくる。pay offは投資が回収される意味。日本語の「報われない」は努力への見返りがないニュアンスで、英語だとnot pay offが一番近い。",
    category: 'inner-voice',
    subcategory: 'frustration',
    situation: '努力が結果に結びつかないとき',
  },
  {
    id: 'life-inner-009',
    japanese: 'まあいっか',
    english: [
      "whatever",
      "you know what, it's fine, whatever",
      "honestly it doesn't matter that much, I'm just going to let it go",
      "I was stressed about this for three hours. three hours of my finite human life spent worrying about something that in the grand scheme of things means absolutely nothing. so you know what? it's fine. it's all fine. everything is fine. I'm going to eat a snack and forget this ever happened. that's my coping mechanism and it works."
    ],
    context: "whateverは「どうでもいい」の万能ナイフ。let it goは「手放す」で、まあいっかの本質。英語はit doesn't matterとlet it goで「重要じゃない」と「手放す」を分けて言える。",
    category: 'inner-voice',
    subcategory: 'acceptance',
    situation: '小さいことで悩んでたのをやめるとき',
  },
  {
    id: 'life-inner-010',
    japanese: '俺の人生これでいいのか',
    english: [
      "is this it",
      "is this really what my life is going to be",
      "I'm starting to wonder if this is actually all there is for me",
      "I wake up. I work. I eat. I sleep. I do it again. is this the loop? is this what people meant when they said 'welcome to adulthood'? because nobody mentioned it would feel like being stuck on a treadmill that's bolted to the floor of a room with no windows. I'm not unhappy. I'm just aggressively okay. and that might be worse."
    ],
    context: "is this itは3語で人生を問える最強フレーズ。itが「これ」と「全て」を同時に意味する。all there isで「これが全部」。日本語の「これでいいのか」は確認だけど英語のis this itは絶望に近い。",
    category: 'inner-voice',
    subcategory: 'existential',
    situation: 'ルーティンに飽きたとき',
  },
  {
    id: 'life-inner-011',
    japanese: '考えすぎだな俺',
    english: [
      "overthinking again",
      "I'm way overthinking this, I need to stop",
      "my brain is doing that thing again where it turns nothing into a five-season drama",
      "okay so someone left me on read and now I've constructed seventeen possible scenarios in my head, three of which involve them secretly hating me and two of which involve me moving to a different country. it has been four minutes. they're probably just in the shower. I need to stop doing this to myself."
    ],
    context: "overthinkは日本語にない動詞。「考えすぎ」をover+thinkの一語で表現できる。英語はover-をつけて何でも「やりすぎ」にできる：overeat、overwork、oversleep。日本語は毎回「〜すぎ」と後付けする。",
    category: 'inner-voice',
    subcategory: 'self-awareness',
    situation: 'ぐるぐる考えてしまうとき',
  },
  {
    id: 'life-inner-012',
    japanese: '寝たいのに寝れない',
    english: [
      "can't sleep",
      "I'm exhausted but my brain won't shut up",
      "my body is begging for sleep but my brain decided now is the perfect time to review every embarrassing thing I've ever done",
      "it's 3 AM. I have to be up in four hours. my body is completely done. my brain, however, has chosen this exact moment to remind me of that thing I said at a party in 2019. thanks brain. really helpful. now I'm lying here wide awake replaying a conversation that the other person definitely doesn't even remember. cool."
    ],
    context: "my brain won't shut upは「脳が黙ってくれない」。won'tは意志のwillの否定で、脳が意志を持って拒否してる擬人化。日本語の「寝れない」は状態だけど英語は原因（脳がうるさい）まで言語化する傾向。",
    category: 'inner-voice',
    subcategory: 'insomnia',
    situation: '布団の中で目が冴えてるとき',
  },
  {
    id: 'life-inner-013',
    japanese: 'あの時ああしてればな',
    english: [
      "should've done that",
      "if only I'd done things differently back then",
      "I keep going back to that moment and thinking about what I should have done instead",
      "you know what kills me? I knew. I knew at the time what the right choice was. I literally thought 'I should do this' and then did the exact opposite. and now three years later I'm lying in bed reconstructing the whole thing like a detective at a crime scene. the crime is my own stupidity. case closed."
    ],
    context: "if onlyは後悔専用の入り口。shouldを過去にすると全部後悔になる：should have said、should have gone。日本語の「〜てれば」は仮定法だけど英語のif onlyは感情がもっと重い。嘆きの入口。",
    category: 'inner-voice',
    subcategory: 'regret',
    situation: '過去の選択を思い出して後悔するとき',
  },
  {
    id: 'life-inner-014',
    japanese: 'もういいや全部どうでもいい',
    english: [
      "screw it all",
      "I don't even care anymore, none of it matters",
      "I've officially hit the point where I have zero capacity to care about any of this",
      "you know what? I'm done caring. about all of it. the deadlines, the expectations, the 'you should really try harder' energy from everyone. I'm unplugging. not literally, because I still need my phone for food delivery. but emotionally I'm checked out. I'm a ghost. a ghost who orders ramen at midnight. boo."
    ],
    context: "I don't careとI don't even careのevenが効いてる。「もう〜すら〜ない」の感じ。checked outはホテルのチェックアウトと同じで「もう出ました」。精神的に現場から退場した状態。",
    category: 'inner-voice',
    subcategory: 'burnout',
    situation: '全てに疲れ果てたとき',
  },
  {
    id: 'life-inner-015',
    japanese: 'よし、やるか',
    english: [
      "let's do this",
      "alright, time to actually get this done",
      "okay I've been putting this off long enough, let's just go",
      "alright. I've watched four YouTube videos, reorganized my desk, made coffee, checked the weather in three cities I've never been to, and now I'm officially out of procrastination activities. there is nothing left to do except the thing I'm supposed to do. so fine. let's do it. here I go. doing it. any second now."
    ],
    context: "let's do thisのlet'sは自分に許可を出してる。alrightは「よし」の発進音。英語は自分にhere we go、let's goと声をかけて動き出すのが自然。日本語の「やるか」と同じ自己発破。",
    category: 'inner-voice',
    subcategory: 'motivation',
    situation: '重い腰を上げるとき',
  },
  {
    id: 'life-inner-016',
    japanese: '自分が嫌いになる',
    english: [
      "hate myself",
      "I honestly kind of hate who I am right now",
      "there are moments where I genuinely can't stand the person I see in the mirror",
      "I don't hate myself all the time. just in those quiet moments after I do something I know I shouldn't have. and then the voice kicks in. the one that says 'you always do this.' and the worst part is the voice is right. it's always right. it's me. I'm arguing with myself and losing. how do you lose a fight with yourself."
    ],
    context: "can't standは「我慢できない」で、hateより体感的。自分がいる空間に自分が耐えられない感じ。英語はI hate myselfよりI can't stand myselfの方が生々しい。日本語の「嫌い」は感情、英語のcan't standは耐久限界。",
    category: 'inner-voice',
    subcategory: 'self-loathing',
    situation: '自己嫌悪に陥ったとき',
  },
  {
    id: 'life-inner-017',
    japanese: '誰にもわかってもらえない',
    english: [
      "nobody gets it",
      "nobody actually understands what I'm going through",
      "I could explain this a hundred times and still nobody would really get it",
      "I tried to talk about it. I really did. and they nodded and said 'yeah that's tough' and changed the subject to what they're having for lunch. cool. thanks. that really helped. I don't even blame them honestly. how do you explain a feeling you don't even have words for? I'm trying to describe a color that doesn't exist yet."
    ],
    context: "get itのgetは「掴む」。understandは頭で理解、getは体で掴む感じ。nobody gets meだと「誰も俺を掴めない」で孤独感が強い。日本語の「わかってもらえない」のもらえないは受動で、英語はnobody getsと能動にする。",
    category: 'inner-voice',
    subcategory: 'isolation',
    situation: '孤独を感じるとき',
  },
  {
    id: 'life-inner-018',
    japanese: '比べても意味ないのに比べちゃう',
    english: [
      "keep comparing",
      "I know comparing is pointless but I can't stop doing it",
      "I tell myself not to compare my life to other people's but my brain does it automatically",
      "I know. I know comparing yourself to others is toxic. I've read the articles. I've seen the motivational quotes. and yet here I am scrolling through social media at midnight going 'oh cool he bought a house, she's traveling Europe, they're getting married, and I just successfully microwaved leftovers without setting off the fire alarm. great. winning at life.'"
    ],
    context: "compareは「比べる」だけど英語ではcompare yourself to othersとyourself（自分自身を）が必須。日本語は「比べちゃう」で主語も対象もぼかせるけど、英語は「自分を」「他人と」を明示しないと文が成立しない。",
    category: 'inner-voice',
    subcategory: 'self-awareness',
    situation: 'SNSを見て落ち込むとき',
  },
  {
    id: 'life-inner-019',
    japanese: '逃げたい',
    english: [
      "want to run",
      "I just want to run away from everything",
      "every part of me is screaming to just drop everything and disappear somewhere",
      "I've looked up flights. not to anywhere specific, just away. somewhere nobody knows my name or my email address or my deadlines. I want to sit in a cafe in a country where I don't speak the language and just be a guy. just some guy drinking coffee. no responsibilities. no notifications. just coffee and silence and the blessed ignorance of being nobody."
    ],
    context: "run awayは子供の家出イメージだけど大人が使うと切実。drop everythingは「全部落とす」で、今持ってるもの全部手放す感じ。英語のrun away fromは「〜から」逃げる方向が必要。日本語の「逃げたい」は方向なしで成立する。",
    category: 'inner-voice',
    subcategory: 'escape',
    situation: 'プレッシャーに押しつぶされそうなとき',
  },
  {
    id: 'life-inner-020',
    japanese: '俺だけ取り残されてる気がする',
    english: [
      "falling behind",
      "feels like everyone's moving forward except me",
      "it's like the whole world is progressing and I'm stuck in the same spot watching",
      "my friends are getting married. my classmates are getting promoted. people I went to school with are posting photos of their kids' first birthday. and I'm still trying to figure out what I want to eat for dinner. it's not that I'm jealous. okay it's a little bit jealousy. but mostly it's this feeling that the train left and I'm still standing on the platform holding a ticket to nowhere."
    ],
    context: "falling behindは「後ろに落ちていく」進行形。stuck in the same spotは「同じ場所に固定されてる」。英語はmoving forwardとstuckの対比で焦りを表現する。日本語の「取り残される」は受動態で、自分の意志じゃない感じが出る。",
    category: 'inner-voice',
    subcategory: 'comparison',
    situation: '周りと自分を比べてしまうとき',
  },
  {
    id: 'life-inner-021',
    japanese: 'もう少しだけ頑張ろう',
    english: [
      "just a little more",
      "I can hang on just a little bit longer",
      "I'm barely holding it together but I'll push through just a bit more",
      "I'm running on fumes. I can feel my brain buffering like a 2008 YouTube video. but you know what, I've come this far. quitting now would make all the suffering so far completely pointless. so I'll keep going. just a little more. just until this is done. and then I'll collapse dramatically on my couch like I just finished a marathon. the marathon was an email."
    ],
    context: "hang onは「しがみつく」で、ギリギリ耐えてるニュアンス。running on fumesはガス欠寸前で走ってる車のイメージ。日本語の「もう少し」は軽く聞こえるけど英語はhang on、push throughで必死さが出る。",
    category: 'inner-voice',
    subcategory: 'perseverance',
    situation: '疲れてるけどもう少しで終わるとき',
  },
  {
    id: 'life-inner-022',
    japanese: '何がしたいのか自分でもわからない',
    english: [
      "no idea what I want",
      "I genuinely have no idea what I want from life",
      "people keep asking me what my goals are and I honestly have no answer",
      "everyone seems to have a thing. a passion. a calling. a five-year plan. I have a Netflix subscription and a vague sense of dread about the future. I've tried making lists, doing personality tests, journaling. nothing sticks. it's like trying to grab smoke. maybe that IS my thing. maybe I'm just the guy who's really good at not knowing what he wants. specialization."
    ],
    context: "what I want from lifeのfromが重要。lifeから何をもらいたいか、と人生に要求してる構造。日本語は「何がしたい」で自分の欲求を聞いてるけど、英語はfrom lifeで人生との取引関係になる。",
    category: 'inner-voice',
    subcategory: 'direction',
    situation: '将来が見えないとき',
  },
  {
    id: 'life-inner-023',
    japanese: '今のままじゃダメだってわかってる',
    english: [
      "can't stay like this",
      "I know I can't keep going on like this",
      "deep down I know something has to change but I don't know where to start",
      "I know this isn't sustainable. I know. I'm not stupid. I can see the problem clearly. I can diagnose it perfectly. I just can't fix it. it's like being a mechanic who knows exactly what's wrong with the car but doesn't have any tools. or motivation. or a car. wait, in this metaphor am I the car? that's depressing. the car is broken and it knows it's broken."
    ],
    context: "keep going on like thisは「このまま続ける」の否定。sustainableは「持続可能」で環境問題みたいだけど日常でも使う。日本語の「このままじゃダメ」は断定だけど英語はsomething has to changeと「何か」をぼかす。",
    category: 'inner-voice',
    subcategory: 'self-awareness',
    situation: '変わらなきゃと思ってるけど動けないとき',
  },
  {
    id: 'life-inner-024',
    japanese: '全部投げ出したい',
    english: [
      "quit everything",
      "I want to throw in the towel on all of it",
      "I'm about two bad days away from quitting everything and starting over somewhere else",
      "what if I just stopped? like all of it. job, responsibilities, social obligations. what if I just said 'no thank you' to my entire life and went to live on a farm somewhere? I don't know anything about farming. I'd probably kill the crops in a week. but at least the crops wouldn't send me passive-aggressive emails at 11 PM."
    ],
    context: "throw in the towelはボクシングのタオル投入から。「もう降参」の合図。quit everythingより文化的な重みがある。日本語の「投げ出す」もモノを投げるイメージだから意外と近い比喩。",
    category: 'inner-voice',
    subcategory: 'burnout',
    situation: '全てが嫌になったとき',
  },
  {
    id: 'life-inner-025',
    japanese: '自分に甘すぎる',
    english: [
      "too easy on myself",
      "I keep letting myself off the hook way too easily",
      "I'm supposed to be disciplined but I keep giving myself a free pass on everything",
      "I said I'd study for two hours. I studied for twelve minutes. then I told myself 'well at least I opened the book' like that deserves a medal. I literally gave myself credit for looking at words. this is the problem. I negotiate with myself and I always lose. or win? both? I'm my own worst enabler."
    ],
    context: "let myself off the hookは「自分を釣り針から外す」。hookは責任のフックで、自分で自分を免除する感じ。free passは「フリーパス」でそのまま。英語はeasy on oneselfで「自分に優しすぎる」。甘いを直訳するとsweetで意味不明になる。",
    category: 'inner-voice',
    subcategory: 'self-discipline',
    situation: '自分の甘さに気づいたとき',
  },
  {
    id: 'life-inner-026',
    japanese: '結局何も変わってない',
    english: [
      "nothing changed",
      "at the end of the day nothing actually changed",
      "I look back at the past year and realize I'm in the exact same place I was",
      "new year's resolution? made it. broke it by January 14th. downloaded a habit tracker app? used it for three days. bought a self-help book? it's holding up my monitor. I have spent an entire year aggressively planning to change and absolutely nothing is different. I am a perfectly preserved time capsule of mediocrity."
    ],
    context: "at the end of the dayは「結局」の定番。nothing changedは過去形で「変わらなかった」の事実確認。英語はin the exact same placeで「全く同じ場所に」と空間的に表現する。日本語の「何も変わってない」は時間的。",
    category: 'inner-voice',
    subcategory: 'stagnation',
    situation: '自分の成長のなさを実感するとき',
  },
  {
    id: 'life-inner-027',
    japanese: 'なんで俺ばっかり',
    english: [
      "why always me",
      "why does this stuff always happen to me specifically",
      "I swear the universe has a personal grudge against me and me alone",
      "other people spill coffee and it lands on the floor. I spill coffee and it lands on my white shirt, my laptop, and my dignity, all at once, in front of my boss, during a presentation. the probability of this is astronomically low and yet here I am. I'm not unlucky, I'm statistically impossible. someone should study me."
    ],
    context: "why meは被害者意識の定番だけどwhy always meのalwaysで「毎回」感が倍増する。have a grudge againstは「恨みを持つ」。日本語の「ばっかり」はonly meだけど、英語ではalways meと時間軸に変換する方が自然。",
    category: 'inner-voice',
    subcategory: 'victimhood',
    situation: '不運が続くとき',
  },
  {
    id: 'life-inner-028',
    japanese: '涙出てきた',
    english: [
      "going to cry",
      "great, now I'm actually about to cry",
      "I didn't think this would get to me but here come the tears apparently",
      "I'm not a crier. I'm really not. I watched three sad movies last week and felt nothing. but this one tiny inconvenience, this one completely insignificant thing, has broken me. I'm tearing up in the convenience store because they didn't have the pudding I wanted. this isn't about the pudding. it was never about the pudding. the pudding was just the last straw."
    ],
    context: "here come the tearsの語順が面白い。here comes+主語は「ほら来た」の登場感。the last strawは「最後の藁」で、ラクダの背中の藁のことわざから。小さいことで崩壊するあの感じ。日本語の「涙出てきた」は自動詞で勝手に出る。",
    category: 'inner-voice',
    subcategory: 'emotional-overflow',
    situation: '些細なことで泣きそうになるとき',
  },
  {
    id: 'life-inner-029',
    japanese: '俺って口だけだな',
    english: [
      "all talk",
      "I'm all talk and absolutely zero action",
      "I say all these things I'm going to do and then never follow through on any of them",
      "I told everyone I was going to start working out. I posted about it. I bought the shoes. I downloaded the app. I watched a 30-minute video about proper form. and that's where the story ends. the shoes are in the closet. the app is uninstalled. the form video is the most exercise I got that month. I'm a hype machine for a product that doesn't exist."
    ],
    context: "all talkは「全部口だけ」の完璧な表現。follow throughは「最後までやり切る」で、ゴルフのフォロースルーと同じ。始めるけど終わらない人にはnever follow throughがぴったり。日本語の「口だけ」と構造が同じ。",
    category: 'inner-voice',
    subcategory: 'self-criticism',
    situation: '宣言だけして何もしなかったとき',
  },
  {
    id: 'life-inner-030',
    japanese: 'いつまでこれ続くんだろ',
    english: [
      "how long though",
      "how much longer is this going to go on for",
      "I keep telling myself it'll get better but I'm honestly starting to wonder when",
      "they say time heals everything. who's 'they'? because I'd like a word with them. it has been quite some time and nothing is healed. if anything the wound has developed a personality and started paying rent. we're roommates now. me and my problem. we watch TV together. it's not getting better, it's getting comfortable."
    ],
    context: "how much longerは「あとどれだけ」で、ゴールが見えない焦り。go on forは「続く」の持続感。日本語の「いつまで」は終点を聞いてるけど英語のhow much longerは残り時間を聞いてる。視点が逆。",
    category: 'inner-voice',
    subcategory: 'endurance',
    situation: 'つらい状況が終わらないとき',
  },
  {
    id: 'life-inner-031',
    japanese: 'もっと早く気づけばよかった',
    english: [
      "should've noticed sooner",
      "I wish I had realized this way earlier",
      "looking back it was so obvious and I can't believe it took me this long to figure it out",
      "the answer was right there. the whole time. like a book on a shelf I walked past every single day for years. and then one random Tuesday it just clicked. and now I'm sitting here going 'how did I not see this before?' the answer was not hiding. I was just professionally blind. I should put that on my business card."
    ],
    context: "I wish I hadは「〜だったらよかったのに」の仮定法過去完了。英語は時制で後悔の深さを表現する。wishの後に過去完了が来ると「あの時」感が強い。日本語は「〜ばよかった」で時制関係なく後悔できる。",
    category: 'inner-voice',
    subcategory: 'regret',
    situation: '今さら大事なことに気づいたとき',
  },
  {
    id: 'life-inner-032',
    japanese: '最悪の選択肢ばっかり選んでる気がする',
    english: [
      "worst possible choice",
      "I swear I always pick the worst possible option",
      "if there's a wrong choice to be made you can bet I'll find it every single time",
      "you know those 'choose your own adventure' books? I'm the kid who picks the option that says 'go into the dark cave alone' every single time. relationship decisions? catastrophic. career moves? questionable at best. dinner choices? somehow I always order the one thing on the menu that tastes like regret. it's a gift honestly."
    ],
    context: "pick the worst possible optionのpossibleが「可能な限り最悪の」を強調する。you can bet=「賭けてもいい」で確信の表現。日本語の「ばっかり」はalwaysだけど英語はevery single timeで「一回残らず」と強調する。",
    category: 'inner-voice',
    subcategory: 'self-criticism',
    situation: '自分の判断力のなさを嘆くとき',
  },
  {
    id: 'life-inner-033',
    japanese: '誰かに相談したいけど誰に言えばいいかわからない',
    english: [
      "need to talk",
      "I want to talk to someone but I don't know who",
      "I need to get this off my chest but I can't figure out who the right person is",
      "I have friends. I do. but this particular problem doesn't fit into any of those friendships neatly. it's too heavy for the fun friends, too personal for the work friends, too vague for the advice friends. I need someone who's a therapist, a bartender, and a stranger on a train all at once. that person doesn't exist. so I'm telling my ceiling."
    ],
    context: "get this off my chestは「胸から降ろす」で、溜まってるものを出す比喩。日本語の「胸につかえる」と似た身体感覚。the right personの選定に悩むのは英語圏でも同じ。日本語は「相談する」一語だけど英語はtalk to/open up to/confide inと段階がある。",
    category: 'inner-voice',
    subcategory: 'isolation',
    situation: '悩みを抱えて一人で苦しいとき',
  },
  {
    id: 'life-inner-034',
    japanese: '本当の自分がわからない',
    english: [
      "who am I really",
      "I honestly don't know who I actually am anymore",
      "I've been performing different versions of myself for so long that I lost the original",
      "at work I'm one person. with friends I'm another. with family I'm a third. online I'm a fourth. and when I'm alone? I have no idea. I've been wearing so many masks that when I finally take them all off there's just a question mark underneath. like one of those nesting dolls except the smallest one is empty. that's concerning."
    ],
    context: "performing different versionsが核心。performは「演じる」で、自分の複数バージョンを演じてるイメージ。lost the originalは「オリジナルを見失った」。日本語の「本当の自分」は英語だとtrue selfだけど、real meの方が生々しい。",
    category: 'inner-voice',
    subcategory: 'identity',
    situation: '自分が何者かわからなくなったとき',
  },
  {
    id: 'life-inner-035',
    japanese: '褒められても素直に喜べない',
    english: [
      "can't take compliments",
      "someone complimented me and I immediately didn't believe it",
      "every time someone says something nice about me my brain auto-corrects it to sarcasm",
      "my boss said 'good job' today and my first thought was 'what does she want.' my second thought was 'she's probably just being polite.' my third thought was 'she said that to everyone.' I rejected a compliment three different ways in under two seconds. my self-esteem has a firewall and it's blocking all incoming positive data."
    ],
    context: "take a complimentのtakeは「受け取る」。褒め言葉を受け取れない=can't take compliments。英語圏でも自己評価低い人はdeflect compliments（褒めをそらす）と言う。日本語の「素直に」はhonestlyじゃなくてgracefullyに近い。",
    category: 'inner-voice',
    subcategory: 'self-esteem',
    situation: '褒められて素直になれないとき',
  },
  {
    id: 'life-inner-036',
    japanese: '友達いるのに孤独',
    english: [
      "lonely anyway",
      "I have friends but I still feel completely alone",
      "I'm surrounded by people who care about me and yet I've never felt more isolated",
      "I went out last weekend. laughed a lot. posted a group photo. got likes. looked happy. went home. sat in my car in the parking lot for twenty minutes staring at the steering wheel. because the loneliness isn't about being alone. it's about being with people and still feeling like there's a glass wall between you and everyone else."
    ],
    context: "lonely vs aloneの違いが全て。aloneは物理的に一人、lonelyは心理的に一人。surrounded by peopleとisolatedの対比が英語の表現力。日本語は「いるのに孤独」で矛盾を一文で表現できるのが強い。",
    category: 'inner-voice',
    subcategory: 'isolation',
    situation: '人といるのに孤独を感じるとき',
  },
  {
    id: 'life-inner-037',
    japanese: '今日も何もしなかった',
    english: [
      "wasted another day",
      "another entire day and I did absolutely nothing",
      "the sun came up, the sun went down, and in between I accomplished precisely zero things",
      "I had sixteen waking hours today. sixteen. that's nine hundred and sixty minutes of potential. and what did I do with them? scrolled. snacked. napped. scrolled again. took a shower which felt like a major achievement. that's the bar now. basic hygiene is a win. I've set the bar so low it's underground."
    ],
    context: "wasted a dayは「一日を無駄にした」。accomplishは「成し遂げる」でachieveより日常的。precisely zeroのpreciselyが皮肉で「正確にゼロ」。日本語の「何もしなかった」は事実だけど英語はwastedで価値判断を入れる。",
    category: 'inner-voice',
    subcategory: 'guilt',
    situation: '一日何もせずに終わったとき',
  },
  {
    id: 'life-inner-038',
    japanese: '努力してるフリしてるだけかも',
    english: [
      "just pretending",
      "maybe I'm just pretending to try and not actually trying",
      "there's a chance all this effort I think I'm putting in is just performance and not real work",
      "I sit at my desk for eight hours. I look busy. my screen is open. my hands are on the keyboard. but am I actually working? or am I just performing the visual concept of work like a mime trapped in an office? because output-wise there's very little evidence that I did anything today. I'm an actor playing a productive person and I'm not even convincing."
    ],
    context: "pretending to tryは「頑張るフリ」の完璧な英語。performanceは「演技」と「業績」のダブルミーニング。英語のgo through the motionsは「形だけやる」で、動作はするけど中身がない状態。日本語の「フリ」一語で片付くのがすごい。",
    category: 'inner-voice',
    subcategory: 'imposter',
    situation: '自分の努力が本物か疑うとき',
  },
  {
    id: 'life-inner-039',
    japanese: '昔の方が楽しかったな',
    english: [
      "miss the old days",
      "things used to be so much more fun and I miss that",
      "I keep thinking back to when life was simpler and everything felt like it actually mattered",
      "remember when the biggest problem was what to watch on TV? or which friend's house to go to after school? now the biggest problem is existence itself. I'm nostalgic for a time when happiness didn't require effort. it just showed up. like a stray cat. now I have to chase it. and it's fast. and I'm out of shape."
    ],
    context: "things used to beのused toは「かつては〜だった」で、今は違うことが前提。nostalgicは「郷愁的」でmiss the old daysより文学的。日本語の「昔の方が」は比較だけど英語はused toで過去を独立した世界にする。",
    category: 'inner-voice',
    subcategory: 'nostalgia',
    situation: '昔を思い出して切なくなるとき',
  },
  {
    id: 'life-inner-040',
    japanese: '成長してる実感がない',
    english: [
      "not growing",
      "I don't feel like I'm growing at all as a person",
      "everyone talks about personal growth but I honestly feel like I'm the same person I was five years ago",
      "people post about their 'growth journey' and their 'glow up' and I'm sitting here looking exactly the same as I did in 2020. same job. same habits. same me. I thought by now I'd be some evolved version of myself. like a software update. but no. I'm still running the original firmware. and it crashes regularly."
    ],
    context: "personal growthは英語圏の概念で日本語の「成長」より重い。growthは植物が伸びるイメージ。feel like I'm growingの進行形が大事で、成長は点じゃなくて線。日本語の「実感がない」は感覚の不在を言ってて、英語より内省的。",
    category: 'inner-voice',
    subcategory: 'stagnation',
    situation: '自分が停滞してると感じるとき',
  },
  {
    id: 'life-inner-041',
    japanese: 'やらなきゃいけないのにやりたくない',
    english: [
      "don't want to",
      "I have to do this but every cell in my body is saying no",
      "my brain knows I need to do this but my entire being is in full rebellion mode",
      "there's a thing I need to do. it's important. it has a deadline. the deadline is tomorrow. have I started? no. am I going to start? unclear. what I AM doing is rearranging my bookshelf by color. because apparently that's more urgent than the thing that will directly impact my career. my priorities are a crime scene."
    ],
    context: "have toとwant toの戦いは英語学習の最初に習うけど実は哲学的。have to=外部の強制、want to=内部の欲求。日本語の「やらなきゃ」のなきゃは否定の否定で「やらないとダメ」。英語はmust/have toとdon't want toを並べるだけで葛藤になる。",
    category: 'inner-voice',
    subcategory: 'procrastination',
    situation: '締切があるのに動けないとき',
  },
  {
    id: 'life-inner-042',
    japanese: '人生イージーモードの奴が羨ましい',
    english: [
      "must be nice",
      "must be nice to have life just work out for you",
      "some people seem to have everything handed to them and I'm over here struggling for every little thing",
      "there's a guy I went to school with who just got his third promotion. he posts about his morning routine which involves meditation, a green smoothie, and a five-mile run before 7 AM. meanwhile my morning routine is hitting snooze eleven times and then sprinting to the train in mismatched socks. we're not playing the same game. he's on easy mode. I'm on whatever mode involves no instructions and everything being on fire."
    ],
    context: "must be niceは3語で羨望と皮肉を同時に表現する。have things handed to youは「手渡してもらう」で、努力なしで得る感じ。日本語の「イージーモード」はゲーム用語だけど英語でもon easy modeは通じる。",
    category: 'inner-voice',
    subcategory: 'envy',
    situation: '恵まれた人を見て嫉妬するとき',
  },
  {
    id: 'life-inner-043',
    japanese: '一人でいたいのに寂しい',
    english: [
      "contradicting myself",
      "I want to be alone but I also hate being lonely",
      "my brain wants solitude and my heart wants company and they're both screaming at the same time",
      "I canceled plans to stay home. now I'm home. alone. exactly like I wanted. and I feel terrible about it. I wanted this. I chose this. and now I'm sitting on my couch texting the group chat 'what's everyone up to tonight' like I didn't just decline three invitations. I'm my own worst plot twist. the call is coming from inside the house."
    ],
    context: "solitudeは「一人を楽しむ孤独」、lonelinessは「寂しい孤独」。日本語は「一人」で両方カバーするけど英語は使い分ける。この矛盾はI want to be alone but not lonelyで表現できる。英語はaloneとlonelyを分けたことで矛盾を名詞レベルで可視化する。",
    category: 'inner-voice',
    subcategory: 'contradiction',
    situation: '一人がいいのに寂しいとき',
  },
  {
    id: 'life-inner-044',
    japanese: '正解がわからないまま選ぶしかない',
    english: [
      "choosing blind",
      "I have to choose without knowing if it's the right call",
      "there's no instruction manual for this and I just have to pick a direction and hope for the best",
      "adults lied. they said when you grow up you'll know what to do. I'm grown up. I don't know what to do. every major decision feels like defusing a bomb where all the wires are the same color. and there's no one standing behind me saying 'cut the red one.' because there is no red one. there's just gray. everything is gray. choose your gray."
    ],
    context: "the right callのcallは「判断」。make a callで「判断を下す」。hope for the bestは「最善を祈る」で、選んだ後は運任せ。日本語の「正解がわからない」は情報不足だけど英語はno right answerで「正解自体が存在しない」にもなる。",
    category: 'inner-voice',
    subcategory: 'uncertainty',
    situation: '人生の分岐点で迷うとき',
  },
  {
    id: 'life-inner-045',
    japanese: 'あー言わなきゃよかった',
    english: [
      "shouldn't have said that",
      "why did I say that, I totally shouldn't have said that",
      "the words left my mouth and I immediately wanted to grab them and shove them back in",
      "I said the thing. the thing you're not supposed to say. and I watched it land in real time. I saw their face change. that little flicker. and now it's 2 AM and I'm replaying the exact moment frame by frame like a sports commentator analyzing a foul. 'and there it is folks, the moment he ruined everything, let's see that again in slow motion.'"
    ],
    context: "shouldn't haveは後悔の王道。the words left my mouthは「言葉が口を離れた」で、自分の意志じゃなく言葉が勝手に出た感じ。日本語の「言わなきゃよかった」はシンプルだけど英語はshouldn't have+過去分詞で時制操作する。",
    category: 'inner-voice',
    subcategory: 'regret',
    situation: '余計なことを言ってしまった後',
  },
  {
    id: 'life-inner-046',
    japanese: '期待するから傷つく',
    english: [
      "expectations hurt",
      "I keep expecting things and keep getting disappointed",
      "the problem isn't other people, the problem is I keep expecting them to do things they were never going to do",
      "I thought they'd remember. they didn't. I thought they'd ask. they didn't. I thought they'd care. jury's still out. and every single time I end up hurt, not because they did anything wrong, but because I wrote a script in my head where they play a role they never auditioned for. I'm directing a movie nobody else knows they're in."
    ],
    context: "expectationsは「期待」だけどset expectations（期待値を設定する）という言い方がビジネスでも日常でもある。英語では期待は「設定するもの」で、日本語では「するもの」。設定した自分が悪い、という構造が英語には最初からある。",
    category: 'inner-voice',
    subcategory: 'emotional-pattern',
    situation: '期待して裏切られるパターンに気づいたとき',
  },
  {
    id: 'life-inner-047',
    japanese: '30超えてからマジで時間早い',
    english: [
      "time flies now",
      "time started going insanely fast after I turned thirty",
      "I blinked and somehow an entire year went by, this is getting ridiculous",
      "January was last week. I'm sure of it. there is no way six months have passed. I refuse to accept that. but the calendar doesn't care about my feelings. it just keeps going. and every year gets shorter. when I was a kid, summer lasted forever. now summer is a Tuesday. I sneezed and missed autumn. time is accelerating and nobody is talking about it enough."
    ],
    context: "time fliesは直訳「時間が飛ぶ」。I blinkedは「瞬きした」で、一瞬のうちに時間が過ぎた表現。英語はin the blink of an eye（瞬きの間に）という慣用句がある。日本語の「あっという間」の「あっ」と、英語のblinkは同じ一瞬の感覚。",
    category: 'inner-voice',
    subcategory: 'aging',
    situation: '時間の流れの速さに驚くとき',
  },
  {
    id: 'life-inner-048',
    japanese: '幸せってなんだっけ',
    english: [
      "what is happiness",
      "I genuinely forgot what being happy feels like",
      "I've been going through the motions for so long that I can't remember what real happiness actually is",
      "someone asked me 'what makes you happy?' and I froze. like actually froze. I couldn't name one thing. not one. I used to have answers. I used to know. now I just have a list of things that make me less unhappy. and that's not the same thing. 'less unhappy' is not a destination. it's just a nicer waiting room."
    ],
    context: "going through the motionsは「形だけやる」の定番。what makes you happyは英語の自己啓発の定番質問で、makeが「何があなたを幸せにするか」と外部要因を聞いてる。日本語の「幸せってなんだっけ」は定義を問うてて、もっと哲学的。",
    category: 'inner-voice',
    subcategory: 'existential',
    situation: '幸福の定義がわからなくなったとき',
  },
  {
    id: 'life-inner-049',
    japanese: '泣きたいのに泣けない',
    english: [
      "can't even cry",
      "I want to cry but nothing comes out anymore",
      "my body wants to cry so badly but somehow I've forgotten how to actually do it",
      "there's this pressure behind my eyes. like the tears are right there. queued up. ready to go. but they won't come out. it's like my emotional plumbing is clogged. I've tried sad movies, sad songs, looking at old photos. nothing. I'm emotionally constipated. I just want to have one good cry and feel human again but apparently even that's too much to ask."
    ],
    context: "nothing comes outの「出てこない」が物理的。英語はcry one's eyes out（目が出るほど泣く）やhave a good cry（良い泣き）という表現があって、泣くことをポジティブに捉える文化がある。日本語の「泣けない」は能力の不在。",
    category: 'inner-voice',
    subcategory: 'emotional-block',
    situation: '感情が詰まって泣けないとき',
  },
  {
    id: 'life-inner-050',
    japanese: 'まあでも生きてるだけでえらいか',
    english: [
      "still here though",
      "honestly just being alive is an achievement at this point",
      "after everything I've been through the fact that I'm still standing counts for something",
      "I didn't do anything great today. or yesterday. or arguably this entire month. but you know what I did do? I got up. I made it through another day on this ridiculous planet. and tomorrow I'll probably do it again. not because I'm brave or motivated or any of that poster quote nonsense. just because I'm stubborn. and stubbornness, when you think about it, is just courage that refuses to dress up."
    ],
    context: "still here thoughのthoughが全て。「でも」一語で全部ひっくり返す。still standingは「まだ立ってる」でElton Johnの曲名でもある。日本語の「えらい」は英語にしにくい。good jobでもproudでもない。you deserve creditが近い。",
    category: 'inner-voice',
    subcategory: 'self-compassion',
    situation: '自分を少しだけ許せた瞬間',
  },
];
