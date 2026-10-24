import type { LifePhrase } from './life-phrases';

export const emotionsPhrases: LifePhrase[] = [
  {
    id: 'life-emotions-001',
    japanese: 'なんかモヤモヤする',
    english: [
      "something feels off",
      "I can't put my finger on it but something's bugging me",
      "there's this weird uneasy feeling and I can't figure out what it is",
      "something's off. I don't know what. everything looks fine on paper but my gut is sending me signals and I've learned to trust my gut more than my brain because my brain lies to me all the time but my gut? my gut has never been wrong. it just can't explain itself. which is frustrating."
    ],
    context: "「モヤモヤ」は英語に直訳不可能な日本語の代表格。英語は感情を言語化するとき必ず原因を特定しようとする。I feel bad ABOUT something。日本語は原因不明のまま成立する。英語は原因不明が許されない言語。",
    category: 'emotions',
    subcategory: 'unease',
    situation: '寝る前に考え事してるとき',
  },
  {
    id: 'life-emotions-002',
    japanese: 'めっちゃ嬉しい',
    english: [
      "I'm so happy",
      "honestly I'm over the moon right now",
      "I'm genuinely thrilled about this, like I can't stop smiling",
      "I'm so happy I could cry which is weird because I'm a grown adult and crying from happiness is something I thought only happened in movies but here I am getting emotional over something that honestly most people wouldn't even care about but I care and that's what matters right?"
    ],
    context: "happyは汎用すぎて感情の強度が伝わらない。英語はthrilled、ecstatic、over the moonと強度で語彙を切り替える。日本語は「めっちゃ」をつけるだけ。英語は形容詞そのものを交換する言語。",
    category: 'emotions',
    subcategory: 'joy',
    situation: '良い知らせを受け取ったとき',
  },
  {
    id: 'life-emotions-003',
    japanese: '泣きそう',
    english: [
      "I'm tearing up",
      "I'm literally about to cry right now",
      "my eyes are getting watery and I'm trying so hard not to lose it",
      "I'm about to cry and I really need to not cry right now because if I start I won't stop and then everyone's going to look at me and ask if I'm okay and I'll have to say I'm fine while clearly not being fine and that's the worst performance anyone has ever given in the history of pretending to be okay."
    ],
    context: "「泣きそう」は予告。英語はabout toで未来の直前を表現する。tear upは涙が出かけてる状態で、cryは実際に泣く動作。この区別が日本語にはない。「泣く」のグラデーションが英語は異常に細かい。",
    category: 'emotions',
    subcategory: 'sadness',
    situation: '感動的な場面や辛いことがあったとき',
  },
  {
    id: 'life-emotions-004',
    japanese: 'マジでムカつく',
    english: [
      "I'm so pissed",
      "that genuinely makes my blood boil",
      "I'm actually furious right now and I need a minute to cool down",
      "I'm so angry I can feel it in my chest and my jaw is clenched and I want to say something but I know if I open my mouth right now whatever comes out is going to be something I'll regret tomorrow morning when I'm lying in bed replaying this exact moment over and over like a movie I didn't ask to watch."
    ],
    context: "日本語の「ムカつく」は胃が関与する身体感覚。英語のpissedは品が悪いけど一番リアル。angryは報告書みたいで温度が低い。ネイティブが本気で怒ってるときangryとは言わない。furiousかpissedかlivid。",
    category: 'emotions',
    subcategory: 'anger',
    situation: '理不尽なことをされたとき',
  },
  {
    id: 'life-emotions-005',
    japanese: '不安で眠れない',
    english: [
      "can't sleep",
      "my anxiety is keeping me up again",
      "I've been lying here for hours and my brain just won't shut up",
      "it's three in the morning and I'm wide awake staring at the ceiling and my brain has decided this is the perfect time to remind me of every single thing that could go wrong tomorrow and next week and for the rest of my life and honestly at this point I'm not even tired anymore I'm just annoyed at my own brain."
    ],
    context: "「不安」にanxietyを当てると病名っぽくなる。英語のanxietyは日本語より重い。日常の不安はworried、nervous、uneasyが自然。でもcan't sleepレベルならanxietyで正解。強度で語彙が変わる。",
    category: 'emotions',
    subcategory: 'anxiety',
    situation: '夜中にベッドで目が冴えてるとき',
  },
  {
    id: 'life-emotions-006',
    japanese: '懐かしい',
    english: [
      "takes me back",
      "wow that's a blast from the past",
      "that brings back so many memories, I haven't thought about that in years",
      "oh man this takes me back. like way back. I can almost smell the air from that time and hear the sounds and feel what it was like to be that version of me who had no idea what was coming next and honestly that version of me was probably happier because ignorance really is bliss and I'm living proof."
    ],
    context: "「懐かしい」は英語に存在しない感情。nostalgicは文学的すぎて会話で使うと変。英語は動作で表現する。takes me back、brings back memories。感情を形容詞で持たず、動詞で「連れ戻される」と言う。この発想の差がでかい。",
    category: 'emotions',
    subcategory: 'nostalgia',
    situation: '昔の写真や曲に触れたとき',
  },
  {
    id: 'life-emotions-007',
    japanese: '切ない',
    english: [
      "bittersweet",
      "it hurts but in a weirdly beautiful way",
      "there's this ache in my chest that's sad but also kind of precious",
      "it's that feeling where you're sad but you don't want the sadness to go away because the sadness is connected to something beautiful and if you lose the sadness you lose the beauty too and that's the real tragedy isn't it? not the pain itself but the fear of forgetting what caused it."
    ],
    context: "「切ない」は英語最大の翻訳不可能語の一つ。bittersweetが一番近いけど甘さが強すぎる。英語は悲しみと美しさの共存を一語で表現できない。だから毎回説明が必要になる。日本語の方が感情の解像度が高い珍しい例。",
    category: 'emotions',
    subcategory: 'bittersweet',
    situation: '別れの場面や終わりを感じるとき',
  },
  {
    id: 'life-emotions-008',
    japanese: 'ワクワクする',
    english: [
      "I'm pumped",
      "I'm so excited I can barely sit still",
      "I've got butterflies in my stomach, the good kind though",
      "I'm excited in that way where your whole body knows something good is about to happen and you can't focus on anything else and you keep checking the time and the minutes are going so slow it feels like the universe is personally messing with you just because it can and it thinks it's funny."
    ],
    context: "「ワクワク」は身体が動く興奮。excitedは汎用的すぎる。pumpedは体がエネルギーで膨らむ感じ。butterfliesはお腹がソワソワ。英語は興奮を身体のどこで感じてるかで表現を変える。日本語のオノマトペ一発に負ける。",
    category: 'emotions',
    subcategory: 'excitement',
    situation: '旅行の前日や楽しみなイベントの前',
  },
  {
    id: 'life-emotions-009',
    japanese: 'ドキドキする',
    english: [
      "my heart's racing",
      "my heart is pounding so hard right now",
      "I can literally feel my heartbeat in my ears, that's how nervous I am",
      "my heart is doing that thing where it beats so loud I'm convinced everyone around me can hear it and they're all just being polite by not mentioning it and meanwhile I'm standing here trying to look calm while my chest is basically hosting a drum solo that nobody asked for."
    ],
    context: "「ドキドキ」は心臓の擬音が感情になった日本語の天才的発明。英語はheart racing、heart pounding、heart skippingと原因別に分ける。緊張のドキドキと恋のドキドキを同じ語で表現できるのは日本語だけ。",
    category: 'emotions',
    subcategory: 'nervousness',
    situation: '告白の直前や面接の待ち時間',
  },
  {
    id: 'life-emotions-010',
    japanese: '寂しい',
    english: [
      "I feel lonely",
      "I miss having someone around honestly",
      "the apartment feels way too quiet tonight and I don't like it",
      "it's weird because I'm surrounded by people all day but the second I get home and close the door it hits me. this overwhelming quiet. and I don't even want to talk to anyone specifically I just want the feeling of someone being there. not doing anything. just existing in the same space. is that too much to ask?"
    ],
    context: "「寂しい」はlonelyだけじゃない。I miss youの「寂しい」もある。英語はlonely（状態）とmissing someone（対象あり）を明確に分ける。日本語は全部「寂しい」。英語は寂しさの原因を常に特定させられる。",
    category: 'emotions',
    subcategory: 'loneliness',
    situation: '一人暮らしの夜',
  },
  {
    id: 'life-emotions-011',
    japanese: 'イライラする',
    english: [
      "so irritating",
      "everything is getting on my nerves today",
      "I'm in one of those moods where every little thing annoys me",
      "I don't know what's wrong with me today but everything is annoying. the way that person chews. the sound of typing. someone breathing too loud. I know it's a me problem and I know I'm being unreasonable but knowing that doesn't make me less irritated it just makes me irritated AND guilty which is worse."
    ],
    context: "「イライラ」は低温の怒り。英語はirritatedとannoyedで微妙に違う。irritatedは肌がヒリヒリする感じ、annoyedは「うざい」。get on my nervesは神経を逆撫でする物理表現。英語の怒りは常に温度計がついてる。",
    category: 'emotions',
    subcategory: 'irritation',
    situation: '仕事中に小さなストレスが積み重なるとき',
  },
  {
    id: 'life-emotions-012',
    japanese: '虚しい',
    english: [
      "feels empty",
      "what's even the point of all this",
      "I just feel hollow inside, like nothing really matters right now",
      "I did everything I was supposed to do today. checked every box. replied to every message. ate three meals. went to bed on time. and somehow at the end of it all I feel absolutely nothing. not sad. not happy. just empty. like someone scooped out my insides and forgot to put them back."
    ],
    context: "「虚しい」はemptyだけど、英語のemptyは物理的な空っぽが先。感情のemptyは比喩として使う。hollowも「中が空洞」。日本語は虚しいが最初から感情語。英語は物理→感情の順で意味が拡張される言語。",
    category: 'emotions',
    subcategory: 'emptiness',
    situation: 'やるべきことを全部やったのに満たされないとき',
  },
  {
    id: 'life-emotions-013',
    japanese: '後悔してる',
    english: [
      "I regret it",
      "I really wish I hadn't done that",
      "if I could go back in time I would do everything differently",
      "I keep replaying that moment in my head and every time I replay it I come up with a better response that I could have said but didn't because my brain only works properly when there's zero pressure and in the actual moment I'm basically a goldfish with anxiety who forgot how words work."
    ],
    context: "regretは後悔の報告。wish I hadn'tは「あの時ああしなければ」の仮定法。英語は後悔を表現するとき必ず仮定法が出てくる。would have、could have、should have。後悔専用の文法が存在する。日本語にはない仕組み。",
    category: 'emotions',
    subcategory: 'regret',
    situation: '失言した後やチャンスを逃した後',
  },
  {
    id: 'life-emotions-014',
    japanese: 'ホッとした',
    english: [
      "what a relief",
      "oh thank god, I can finally breathe again",
      "the weight just lifted off my shoulders and I feel like I can function again",
      "oh my god it's over. it's actually over. I can breathe. I can feel my shoulders dropping from where they've been living next to my ears for the past three days. I didn't even realize how tense I was until the tension left and now I feel like a deflated balloon but in the best way possible."
    ],
    context: "「ホッとした」は息を吐く音が語源。英語のreliefはre(再び)+lief(軽い)で「また軽くなった」。両方とも身体感覚から来てるけどルートが違う。日本語は音、英語は重さ。安心の表現方法に文化が出る。",
    category: 'emotions',
    subcategory: 'relief',
    situation: '試験の結果が良かったとき、問題が解決したとき',
  },
  {
    id: 'life-emotions-015',
    japanese: '感動した',
    english: [
      "I'm moved",
      "that hit me right in the feels honestly",
      "I wasn't expecting to be this emotional but here we are",
      "I didn't plan on crying today but apparently my tear ducts had other plans because one minute I was fine and the next minute I'm sitting here with tears running down my face over something that shouldn't even be that deep but it IS deep and I'm feeling things I didn't give permission to feel and that's honestly rude."
    ],
    context: "「感動」は日本語だと一語でカバー範囲が広い。英語はmovedだと控えめ、touchedだと心に触れた感じ、blown awayだと衝撃。日本語の感動は涙レベルだけど英語のmovedは涙まで行かない。温度差に注意。",
    category: 'emotions',
    subcategory: 'moved',
    situation: '映画のラストシーンや人の優しさに触れたとき',
  },
  {
    id: 'life-emotions-016',
    japanese: '恥ずかしい',
    english: [
      "so embarrassing",
      "I want to crawl into a hole and disappear",
      "I can feel my face turning red and there's nothing I can do about it",
      "you know that thing where something embarrassing happens and your brain decides to store it in the permanent collection so it can replay it at three in the morning ten years from now? yeah. this is going straight to the permanent collection. front row. spotlight. no escape. my brain is a terrible curator."
    ],
    context: "「恥ずかしい」にembarrassedとashamedの2つがある。embarrassedは人前でやらかした恥、ashamedは道徳的な恥。日本語は区別しない。英語は「誰に見られてるか」で恥の種類が変わる。観客がいる恥と自分だけの恥。",
    category: 'emotions',
    subcategory: 'embarrassment',
    situation: '人前で失敗したとき、過去の黒歴史を思い出したとき',
  },
  {
    id: 'life-emotions-017',
    japanese: '嫉妬してる',
    english: [
      "I'm jealous",
      "not going to lie, I'm kind of envious",
      "I hate admitting it but seeing that made me feel a little sting inside",
      "I'm jealous and I know I'm jealous and I hate that I'm jealous because jealousy is an ugly emotion and I'm supposed to be happy for other people's success but my heart didn't get the memo so here I am being a terrible person while simultaneously knowing I'm being a terrible person which is its own special kind of suffering."
    ],
    context: "jealousは「取られたくない」嫉妬、enviousは「あれ欲しい」羨望。日本語の「嫉妬」は両方カバーするけど英語は分ける。彼女を取られそう=jealous、友達の昇進が羨ましい=envious。対象物の所有権で変わる。",
    category: 'emotions',
    subcategory: 'jealousy',
    situation: '友達のSNSを見てるとき、同僚が昇進したとき',
  },
  {
    id: 'life-emotions-018',
    japanese: '焦ってる',
    english: [
      "I'm panicking",
      "I'm scrambling and nothing is working",
      "my brain is going a hundred miles an hour and I can't think straight",
      "okay don't panic don't panic don't panic I'm panicking. why did I leave this to the last minute? because I'm me. that's why. and me is someone who apparently believes that future me is some kind of superhero who can do in two hours what past me couldn't do in two weeks. future me is not that person. future me is just me but more tired."
    ],
    context: "「焦る」は英語に一語の対応がない。panickingは強すぎ、rushedは「急いでる」だけ。flustered（テンパった）が一番近いけど口語ではscrambling（バタバタ）が自然。日本語の「焦り」は時間+感情のセットだけど英語は分離してる。",
    category: 'emotions',
    subcategory: 'panic',
    situation: '締め切り直前で何も終わってないとき',
  },
  {
    id: 'life-emotions-019',
    japanese: 'なんか泣ける',
    english: [
      "that's tear-jerking",
      "why is this making me so emotional",
      "I don't even know why I'm getting teary, it just hit different",
      "I wasn't sad. I wasn't happy. I wasn't anything. and then this random thing comes along and suddenly I'm tearing up and I genuinely cannot explain why. it's like my eyes have their own emotional schedule that they didn't share with the rest of me and today was apparently scheduled for unexpected crying."
    ],
    context: "「なんか泣ける」の「なんか」が最重要。理由が不明なのに泣ける。英語はI don't know whyを前置きしないと成立しない。日本語は「なんか」一語で理由不明を許可する。英語は感情にも理由の説明責任が発生する。",
    category: 'emotions',
    subcategory: 'moved',
    situation: '動画やCMを見て不意に涙が出るとき',
  },
  {
    id: 'life-emotions-020',
    japanese: 'やる気出ない',
    english: [
      "zero motivation",
      "I just cannot be bothered right now",
      "I know I should get up and do something but my body isn't cooperating",
      "my brain says get up. my body says no. my brain says come on we have things to do. my body says those things can wait. my brain says they actually cannot wait. my body says watch me. and so here I am lying on the couch watching my brain lose an argument to a couch cushion and honestly the cushion makes some good points."
    ],
    context: "「やる気」はmotivationだけどI have no motivationは硬すぎ。can't be botheredはイギリス英語で「わざわざやる気にならない」。I don't feel like itが一番日常的。日本語は「やる気」が独立した名詞だけど英語はfeel likeで表現する。気分動詞。",
    category: 'emotions',
    subcategory: 'apathy',
    situation: '休日の朝、やることがあるのに動けないとき',
  },
  {
    id: 'life-emotions-021',
    japanese: 'ちょっと凹んだ',
    english: [
      "that stung",
      "I'm a little bummed not going to lie",
      "that got to me more than I expected, I need a minute",
      "I thought I was okay with it but apparently I'm not because it's been three hours and I'm still thinking about it and I keep telling myself it's not a big deal but if it's not a big deal then why am I still thinking about it? checkmate, brain. you played yourself."
    ],
    context: "「凹む」は物理的にへこむ形が感情に転用された日本語。英語はbummedが近いけどアメリカ口語限定。down、deflatedも使う。that stung（チクッときた）は痛みの比喩。英語は感情のダメージを物理で言う点は日本語と同じ。",
    category: 'emotions',
    subcategory: 'disappointment',
    situation: '期待してたことがダメだったとき',
  },
  {
    id: 'life-emotions-022',
    japanese: 'うわ、最悪',
    english: [
      "that sucks",
      "are you kidding me? this is the worst",
      "of all the things that could have happened, this is literally the worst one",
      "great. just great. because today wasn't already going badly enough the universe decided to add one more thing to the pile just to make sure I don't accidentally start feeling optimistic. I appreciate the consistency honestly. at least I know where I stand. and where I stand is knee-deep in garbage."
    ],
    context: "「最悪」はthe worstだけど会話ではthat sucksが9割。sucksは品は良くないけど全年齢で使う。テキストではこれsucks、あれsucks、何でもsucks。the worstは「今までで一番ひどい」の最上級。日常の愚痴はsucksで十分。",
    category: 'emotions',
    subcategory: 'frustration',
    situation: '予想外のトラブルが起きたとき',
  },
  {
    id: 'life-emotions-023',
    japanese: '申し訳ない気持ち',
    english: [
      "I feel bad",
      "I feel awful about it to be honest",
      "I genuinely feel terrible and I don't know how to make it right",
      "I keep thinking about what I said and every time I replay it the guilt gets a little heavier like someone is stacking bricks on my chest one by one and I know apologizing would help but what if my apology isn't good enough? what if it makes things worse? so instead I just sit here feeling guilty about feeling guilty about not apologizing. very productive."
    ],
    context: "「申し訳ない」にsorryを使うと軽すぎる。I feel badは「悪いと思ってる」の報告。I feel terribleまで行くと本気度が伝わる。guiltyは罪悪感。英語は申し訳なさの原因が自分かどうかで表現が変わる。自分が悪いならguilty、そうでなければbad。",
    category: 'emotions',
    subcategory: 'guilt',
    situation: '誰かに迷惑をかけたとき、断ったとき',
  },
  {
    id: 'life-emotions-024',
    japanese: 'もう限界',
    english: [
      "I'm done",
      "I've hit my limit and I'm not okay",
      "I literally cannot take any more of this, I need to stop",
      "I've been pushing through for so long that I forgot what not pushing through feels like and now my body is sending me very clear signals that it's time to stop and by clear signals I mean everything hurts and my brain has the processing power of a calculator from 1985 and even that calculator would have shut down by now."
    ],
    context: "「限界」はlimitだけど会話ではI'm doneが一番強い。I'm done=「もう終わり」。burnedoutは慢性的、I can't take anymoreは瞬間的。英語は限界の時間軸で表現が分岐する。長期疲弊と今この瞬間の限界は別の語彙。",
    category: 'emotions',
    subcategory: 'exhaustion',
    situation: '仕事が忙しすぎるとき、ストレスが爆発しそうなとき',
  },
  {
    id: 'life-emotions-025',
    japanese: '地味に傷ついた',
    english: [
      "that lowkey hurt",
      "it didn't look like much but that actually stung",
      "I smiled it off but honestly that one cut deeper than I expected",
      "nobody noticed because I'm really good at pretending things don't affect me but that comment went straight through my armor and now it's just sitting there in my chest like a splinter that I can't reach and it's not big enough to complain about but it's big enough that I can't stop feeling it. small wounds are the worst."
    ],
    context: "「地味に」はlowkeyが天才的に近い。loudじゃないけど確実にある。英語のlowkeyは2010年代から感情修飾語として爆発的に普及した。quietly hurtは文学的すぎる。lowkeyは口語の発明品で日本語の「地味に」と完全に同期してる。",
    category: 'emotions',
    subcategory: 'hurt',
    situation: '冗談のつもりで言われた一言が刺さったとき',
  },
  {
    id: 'life-emotions-026',
    japanese: '複雑な気持ち',
    english: [
      "mixed feelings",
      "I honestly don't know how I feel about this",
      "part of me is happy but the other part of me isn't sure this is a good thing",
      "I'm feeling seventeen different emotions at once and at least five of them are contradicting each other and I can't even sort them into categories because every time I think I've figured out how I feel a new feeling shows up uninvited like a guest at a party who wasn't on the list but brought snacks so you can't really kick them out."
    ],
    context: "「複雑な気持ち」はmixed feelingsでほぼ直訳が成立する珍しいケース。ただし英語はambivalent（両義的）という学術語もある。conflictedは「内部で戦ってる」。I'm tornは「引き裂かれてる」。複雑さの表現手段が英語は物理的に痛い。",
    category: 'emotions',
    subcategory: 'ambivalence',
    situation: '転職のオファーを受けたとき、友達の結婚を聞いたとき',
  },
  {
    id: 'life-emotions-027',
    japanese: 'やっちまった',
    english: [
      "I messed up",
      "yeah I definitely should not have done that",
      "well that was a mistake and I can't undo it so here we are",
      "okay so in my defense it seemed like a good idea at the time. in my prosecution however it was clearly not a good idea at any time and I should have known better because I'm an adult with a functioning brain except apparently my brain called in sick today and sent an intern who just makes decisions based on vibes."
    ],
    context: "「やっちまった」はI messed upが完璧。screwed upはもう少し深刻。英語はmess（散らかす）が失敗の基本比喩。日本語の「やる」+「しまった」は完了の後悔だけど英語はmess upで「散らかした=壊した」。失敗=散乱という英語の世界観。",
    category: 'emotions',
    subcategory: 'regret',
    situation: '取り返しのつかないことをした直後',
  },
  {
    id: 'life-emotions-028',
    japanese: 'テンション上がる',
    english: [
      "I'm hyped",
      "oh man I'm getting so fired up right now",
      "my energy just went through the roof and I'm ready for anything",
      "something switched on inside me and now I have the energy of a thousand suns and I want to do everything at once. clean the house. start a business. learn guitar. run a marathon. this feeling will last approximately forty-five minutes and then I'll be back on the couch eating chips but right now? right now I'm unstoppable."
    ],
    context: "「テンション」は和製英語で英語のtensionは緊張。テンション上がる=I'm hyped、fired up、pumped。英語は「熱」の比喩が多い。fired up（火がついた）、on fire（燃えてる）。日本語は「テンション」という謎の外来語に全部任せてる。",
    category: 'emotions',
    subcategory: 'excitement',
    situation: 'ライブの前やスポーツ観戦中',
  },
  {
    id: 'life-emotions-029',
    japanese: '心が折れそう',
    english: [
      "I'm breaking",
      "I'm holding on but barely honestly",
      "I'm trying to stay strong but I can feel myself cracking",
      "you know those videos of trees bending in a hurricane? that's me right now. still standing technically but making some very concerning noises and everyone's watching wondering when I'm going to snap and honestly so am I. the answer is soon. the answer is very soon. but not yet. not yet."
    ],
    context: "「心が折れる」は日本語の名作表現。英語にbreaking pointはあるけど「心が折れる」の詩的さはない。I'm breakingは壊れている最中。at my breaking pointは限界点。英語はbreakを使うけど「何が」壊れるか特定する。心が主語にならない。",
    category: 'emotions',
    subcategory: 'despair',
    situation: '何度挑戦しても結果が出ないとき',
  },
  {
    id: 'life-emotions-030',
    japanese: 'どうでもよくなってきた',
    english: [
      "I stopped caring",
      "honestly at this point I just don't care anymore",
      "I used to care a lot about this but something in me just shut off",
      "there's this beautiful moment when you've been stressed about something for so long that your brain just goes nope. we're done caring about this. and suddenly you feel nothing. zero. and it's not sad it's actually kind of peaceful like reaching the bottom of the ocean where everything is dark and quiet and nothing can hurt you down here."
    ],
    context: "「どうでもいい」はI don't careだけど「なってきた」が重要。過程がある。英語はI stopped caringで「やめた」瞬間を示す。I've reached the point whereは「ある地点に到達した」。日本語の「〜なってきた」は変化の進行中。英語は到達か断絶。",
    category: 'emotions',
    subcategory: 'apathy',
    situation: '長期間悩んでた問題を手放す瞬間',
  },
  {
    id: 'life-emotions-031',
    japanese: '胸がキュッとなる',
    english: [
      "heart squeeze",
      "my chest just tightened in the sweetest way",
      "I felt this little squeeze in my chest like my heart was trying to hug itself",
      "it's that feeling when you see something so pure that your chest physically reacts and you're like wait did I just have a medical event? no. no it's just my heart being dramatic again because it saw a dog sleeping on its back or a kid giving their mom flowers and now I'm emotional in public which is my least favorite place to be emotional."
    ],
    context: "「胸がキュッとなる」は擬音+身体部位の日本語お家芸。英語にはこの音がない。tightenは締まるけどキュッの可愛さがない。heart squeezeは最近の口語で一番近い。英語は感情の物理表現が日本語より2テンポ遅れる。",
    category: 'emotions',
    subcategory: 'tenderness',
    situation: '可愛いものや健気なものを見たとき',
  },
  {
    id: 'life-emotions-032',
    japanese: '気まずい',
    english: [
      "so awkward",
      "I want this moment to end right now please",
      "the silence is killing me and I don't know what to say to fix this",
      "you know when the air in the room changes and everyone suddenly becomes very interested in their phones and nobody's making eye contact? yeah. we're in that. and someone needs to say something but it's not going to be me because whatever I say will make it worse. it always makes it worse. silence is my safest option."
    ],
    context: "「気まずい」はawkwardが直訳だけど日本語の方が「気」が入ってて空気ごと不快。英語のawkwardは「不器用な状況」で空気は含まない。uncomfortable silenceは近いけど音がない時限定。日本語の気まずさは空気全体を汚染する。",
    category: 'emotions',
    subcategory: 'discomfort',
    situation: 'エレベーターで元カノに会ったとき',
  },
  {
    id: 'life-emotions-033',
    japanese: '自分が情けない',
    english: [
      "pathetic",
      "I'm honestly disappointed in myself",
      "I expected better from myself and I didn't deliver and that hurts",
      "I'm looking at myself from the outside right now and what I see is not impressive. it's actually kind of sad. like watching a movie where the main character keeps making the same mistake over and over and you're screaming at the screen just stop doing that but the main character is me so I can't even change the channel."
    ],
    context: "「情けない」はpatheticだけどpatheticは他人に使うと超攻撃的。自分に使うと自虐。disappointed in myselfは冷静な自己評価。英語は自分への失望と他人への軽蔑が同じ語彙圏にある。使う方向で意味が180度変わる。",
    category: 'emotions',
    subcategory: 'self-disappointment',
    situation: '同じ失敗を繰り返したとき',
  },
  {
    id: 'life-emotions-034',
    japanese: '羨ましい',
    english: [
      "I'm envious",
      "must be nice, I wish that were me",
      "I'm happy for them but I'd be lying if I said I wasn't a little jealous",
      "must be nice. must be really nice. to just have things work out like that. meanwhile I'm over here struggling with the most basic tasks and they're just casually living their best life like it's easy and maybe it IS easy for them and that's what makes it hurt because for me nothing has ever been easy. nothing."
    ],
    context: "「羨ましい」はenvious。must be niceは皮肉っぽく聞こえるので注意。日本語の「いいなあ」は純粋な羨望だけど、英語のmust be niceは嫉妬+皮肉が混ざる。good for youも同じ罠。英語は羨望表現が全部ちょっと嫌味に聞こえるリスクがある。",
    category: 'emotions',
    subcategory: 'envy',
    situation: '友達の幸せ報告を聞いたとき',
  },
  {
    id: 'life-emotions-035',
    japanese: 'なんか満たされた',
    english: [
      "I feel content",
      "I don't need anything else right now honestly",
      "for once in my life I feel like everything is exactly where it should be",
      "I'm sitting here and nothing special is happening and I'm not doing anything productive and normally that would stress me out but right now? right now I'm just... okay. like genuinely okay. not pretending to be okay. actually okay. and I don't even know what changed but I don't want to analyze it because analyzing it might ruin it."
    ],
    context: "「満たされた」にhappyを使うと強すぎる。contentは「これでいい」という静かな満足。satisfiedは条件クリアの達成感。fulfilledは人生レベル。英語は満足のスケールが4段階ある。日本語の「満たされた」はcontentが一番近い。穏やかな完結。",
    category: 'emotions',
    subcategory: 'contentment',
    situation: '何もない休日の午後に日差しを浴びてるとき',
  },
  {
    id: 'life-emotions-036',
    japanese: 'ゾッとした',
    english: [
      "sent chills",
      "that literally gave me goosebumps and not the good kind",
      "a cold shiver just went down my spine and I am not okay",
      "you know that feeling when your blood goes cold and every hair on your body stands up at the same time? just had that. and my body is now in full alert mode scanning for danger while my brain is trying to explain to my body that we're in a well-lit room and nothing is actually wrong but my body is not buying it. trust has been broken."
    ],
    context: "「ゾッとする」は寒気が走る恐怖。英語はchills、goosebumps、shiverと身体反応で表現する。creepy（気持ち悪い）は対象が原因、chilling（ゾクッとする）は自分の反応。英語は恐怖を体温の低下で表現する。cold blood、cold sweat。恐怖=冷たい。",
    category: 'emotions',
    subcategory: 'fear',
    situation: 'ホラー映画を見た後、怖い体験をしたとき',
  },
  {
    id: 'life-emotions-037',
    japanese: 'ソワソワする',
    english: [
      "can't sit still",
      "I'm fidgety and I can't help it",
      "my body won't let me relax and I keep shifting around for no reason",
      "I can't sit still. I keep crossing and uncrossing my legs and checking my phone and standing up and sitting back down and I look like someone who drank six coffees which I did but that's beside the point. the point is something is about to happen and my body knows it before my brain does and my body is terrible at waiting."
    ],
    context: "「ソワソワ」は落ち着かない身体の動き。fidgety（もじもじ）、restless（休めない）、antsy（蟻みたいに動く）。antsyはantsが由来で蟻が体を這ってる感じ。英語は落ち着かなさを虫で表現する発想が面白い。",
    category: 'emotions',
    subcategory: 'restlessness',
    situation: '結果発表の前やデートの待ち合わせ',
  },
  {
    id: 'life-emotions-038',
    japanese: '悔しい',
    english: [
      "so frustrating",
      "it eats me up that I couldn't pull it off",
      "I know I could have done better and that's what kills me the most",
      "the worst part isn't losing. the worst part is knowing I could have won. I had it. I was right there. and I let it slip through my fingers because of one stupid mistake and now I have to live with this feeling which is basically my brain saying you almost did it but almost doesn't count does it? no. no it does not."
    ],
    context: "「悔しい」は英語最難関の翻訳ワード。frustratingは近いけどニュアンスが違う。悔しいは「自分がもっとできたはず」の無念。英語にはこの一語がない。it kills me that I couldn'tが一番感情を伝える。regretでもなくangerでもない独立した感情。",
    category: 'emotions',
    subcategory: 'frustration',
    situation: '試合に負けたとき、あと一歩で届かなかったとき',
  },
  {
    id: 'life-emotions-039',
    japanese: '心がざわつく',
    english: [
      "feeling uneasy",
      "something's making my skin crawl a little",
      "there's a weird disturbance in my chest that I can't explain",
      "my heart is doing that thing again where it feels like there's static inside me. not pain. not anxiety exactly. just noise. like someone left a radio on between stations inside my chest and I can hear it but I can't turn it off and I can't tune it to a clear channel either. just static. constant low-level static."
    ],
    context: "「心がざわつく」は英語に直訳不可能。uneasyは状態報告だけ。ざわざわという音が入ってない。skin crawlは肌の不快感。英語は心の不穏を表現するとき身体の別の場所で代用する。心→肌、心→胃、心→背中。心が直接ざわつかない。",
    category: 'emotions',
    subcategory: 'unease',
    situation: '嫌な予感がするとき、何かの前兆を感じるとき',
  },
  {
    id: 'life-emotions-040',
    japanese: 'もう何も考えたくない',
    english: [
      "brain's fried",
      "my brain has officially checked out for the day",
      "I've used up all my thinking power and there's nothing left in the tank",
      "my brain sent me a notification that it has exceeded its daily usage limit and all further thoughts will be queued until tomorrow morning. any attempts to think right now will result in a buffering icon. my brain is a free-tier subscription and I refuse to upgrade because the premium version probably just overthinks even harder."
    ],
    context: "「何も考えたくない」は意志だけどmy brain is friedは状態。英語は「考えたくない」より「考えられない」で表現する方が自然。I don't want to thinkは意志が弱い。brain is friedは脳が揚げ物になった比喩。英語は脳を料理する。",
    category: 'emotions',
    subcategory: 'mental fatigue',
    situation: '長時間の仕事や勉強の後',
  },
  {
    id: 'life-emotions-041',
    japanese: 'すごく救われた',
    english: [
      "that saved me",
      "you have no idea how much that helped me",
      "I was drowning and that was the hand that pulled me out",
      "I was at the bottom. like genuinely at the bottom. and then this one thing happened and it wasn't even a big thing objectively but for me in that moment it was everything. it was oxygen. it was a rope thrown into a well. and I grabbed it and I'm still holding on and I'm probably going to hold on to this memory for the rest of my life."
    ],
    context: "「救われた」はsavedだけどthat saved meは命が助かった感がある。you have no idea how much that meantは「どれだけ意味があったか分からないでしょ」。英語は救いの表現に水の比喩が多い。drowning、lifeline、staying afloat。苦しみ=溺れる。",
    category: 'emotions',
    subcategory: 'gratitude',
    situation: '辛い時期に誰かの一言に助けられたとき',
  },
  {
    id: 'life-emotions-042',
    japanese: 'なんかムズムズする',
    english: [
      "it's bugging me",
      "I have this weird itch that I can't scratch",
      "there's something gnawing at the back of my mind and I can't let it go",
      "you know when you have a word on the tip of your tongue? it's like that but for feelings. there's something I need to figure out or do or say and I don't know what it is. it's just sitting there in the back of my brain being annoying. like a notification I can't dismiss. my brain has a bug and there's no update available."
    ],
    context: "「ムズムズ」は痒みと落ち着かなさの中間。英語はitchy（物理的）かrestless（精神的）で分離する。gnawing（齧る）は何かが心を齧ってる感じで一番近い。日本語のオノマトペは物理と精神を同時にカバーする天才的仕組み。",
    category: 'emotions',
    subcategory: 'restlessness',
    situation: '何か忘れてる気がするとき、行動したくてウズウズするとき',
  },
  {
    id: 'life-emotions-043',
    japanese: '感謝しかない',
    english: [
      "just grateful",
      "I honestly can't thank them enough",
      "words can't capture how thankful I am for everything they've done",
      "I want to say thank you but thank you feels so small for what they did for me. like someone hands you a life raft in the middle of the ocean and all you can say is thanks? thanks?? that word is not big enough. but language has its limits and feelings don't so I just stand there looking grateful which is the human equivalent of a loading bar stuck at 99 percent."
    ],
    context: "「感謝しかない」の「しかない」が英語にできない。grateful is all I haveは直訳だけど自然じゃない。I can't thank them enoughは「十分に感謝できない」。英語は感謝を「量が足りない」で表現する。日本語は「それしかない」。足りないvs他にない。逆方向。",
    category: 'emotions',
    subcategory: 'gratitude',
    situation: '大病の看病をしてくれた人に対して',
  },
  {
    id: 'life-emotions-044',
    japanese: '開き直った',
    english: [
      "whatever happens",
      "you know what? it is what it is and I'm done fighting it",
      "I've accepted the situation and honestly it's kind of liberating",
      "I spent weeks stressing about this and you know what changed? nothing. nothing changed from all that stressing. so I'm done. I'm just going to let it happen. and if everything falls apart at least I'll fall apart with dignity and a cup of coffee and maybe that's the best I can do and maybe the best I can do is enough."
    ],
    context: "「開き直る」は英語にない概念。一番近いのはit is what it is。でも開き直りの「もういいや、知らん」の居直り感がない。英語はownit（受け入れて堂々とする）も使う。ネガティブな状況を受け入れてポジティブに切り替える動詞が英語にはない。",
    category: 'emotions',
    subcategory: 'acceptance',
    situation: 'ずっと悩んでたことを手放す瞬間',
  },
  {
    id: 'life-emotions-045',
    japanese: 'やっと実感湧いてきた',
    english: [
      "it's sinking in",
      "it's finally hitting me that this is actually real",
      "I knew it was happening but now it actually FEELS like it's happening",
      "it's been three days since I found out and my brain just now decided to process the information. like my brain has a three-day shipping policy for emotions. standard delivery only. no express option. and now everything is arriving at once and I'm just standing at the door of my feelings accepting packages I didn't know were coming."
    ],
    context: "「実感が湧く」は英語ではit's sinking in（沈み込んでくる）。hitting me（当たる）も使う。日本語は「湧く」で感情が泉みたいに下から出てくるけど英語は上から沈んでくるか横から当たる。感情の到達方向が真逆。",
    category: 'emotions',
    subcategory: 'realization',
    situation: '合格発表や大きな変化の直後',
  },
  {
    id: 'life-emotions-046',
    japanese: '考えすぎて疲れた',
    english: [
      "overthinking again",
      "my brain won't stop spinning and I'm exhausted",
      "I've been going back and forth in my head for hours and I'm completely drained",
      "I have analyzed this situation from fourteen different angles and reached fourteen different conclusions and I'm no closer to an answer than when I started. in fact I'm further away because now I have new questions that I didn't have before. my brain is a machine that turns simple problems into complex ones and charges me energy for the service."
    ],
    context: "overthinkingは英語圏でも超共感される現代病。日本語は「考えすぎ」だけど英語はoverthinkが動詞として完全に市民権を得てる。I'm an overthinkerは自己紹介で使う。英語は思考パターンを性格として固定する傾向がある。",
    category: 'emotions',
    subcategory: 'mental fatigue',
    situation: '大事な決断を前にして堂々巡りしてるとき',
  },
  {
    id: 'life-emotions-047',
    japanese: '気持ちの整理がつかない',
    english: [
      "can't process this",
      "I need time to sort through all of this",
      "my emotions are all tangled up and I can't separate one from another",
      "imagine your feelings are like clothes in a dryer and they're all tangled together and you're pulling on one sleeve but three other things come with it and you can't tell which feeling belongs to which event and everything is warm and slightly damp and making static and honestly I should probably just close the dryer and walk away for a while."
    ],
    context: "「整理がつかない」はcan't sort through。英語は感情を物理的に「整理する」比喩をそのまま使う。sort through、untangle、process。processは機械用語が感情に転用された例。英語は感情処理をCPUの情報処理と同じ語彙で扱う。",
    category: 'emotions',
    subcategory: 'confusion',
    situation: '別れ話の直後、大きな出来事の後',
  },
  {
    id: 'life-emotions-048',
    japanese: 'なぜか涙が止まらない',
    english: [
      "can't stop crying",
      "the tears just keep coming and I don't even know why",
      "I've been crying for an hour and I don't fully understand what triggered it",
      "I can't stop crying and the worst part is I can't even explain what I'm crying about. it's not one thing. it's everything and nothing at the same time. it's like my body decided to do a software update and the update requires clearing the emotional cache and the cache is apparently enormous because this has been going on for a while now."
    ],
    context: "「なぜか」+感情は日本語で自然だけど英語でI don't know whyを毎回足すのは重い。英語はfor no reasonで「理由なく」と言えるけど、ネイティブは理由を探そうとする文化。理由なき感情に不安を感じるのが英語話者の特徴。",
    category: 'emotions',
    subcategory: 'overwhelm',
    situation: 'ストレスが限界を超えたとき',
  },
  {
    id: 'life-emotions-049',
    japanese: '自分を許せない',
    english: [
      "can't forgive myself",
      "I'm still beating myself up over it honestly",
      "I know I should let it go but I can't stop punishing myself for what happened",
      "everyone says let it go. forgive yourself. move on. and I hear them and I agree with them logically but there's a part of me that refuses to release the guilt because letting go feels like saying what I did was okay and it wasn't okay and I don't deserve to feel okay about it yet. self-forgiveness requires a permission slip I haven't signed."
    ],
    context: "beat myself upは「自分を殴る」で自責の物理表現。英語は自分を責めるとき暴力の比喩を使う。hard on myself、punishing myself。日本語の「許せない」は裁判っぽいけど英語は肉体刑。自責の表現に文化の差が出る。",
    category: 'emotions',
    subcategory: 'guilt',
    situation: '過去の過ちを引きずっているとき',
  },
  {
    id: 'life-emotions-050',
    japanese: '生きてて良かった',
    english: [
      "glad to be alive",
      "moments like this make the whole thing worth it",
      "I genuinely feel grateful to be here right now experiencing this",
      "every once in a while life gives you a moment that makes you forget all the garbage. the stress. the bills. the overthinking. the anxiety. the regret. all of it just dissolves for a second and you're standing there breathing and thinking wow. this. this right here is why. and you can't hold on to it because it's already passing but you felt it. and that's enough."
    ],
    context: "「生きてて良かった」は英語で言うとglad to be aliveだけど重すぎる。makes it all worth itが一番日常で使える。英語は「生きてる」ことを言語化するのが大げさになりやすい。日本語はラーメンが美味くても言える。英語はそうはいかない。温度差。",
    category: 'emotions',
    subcategory: 'gratitude',
    situation: '最高のご飯を食べたとき、絶景を見たとき',
  },
];
