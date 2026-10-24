// 俺語録 2026年9月 — 訳せない日本語の月
//
// 今月の日本語は、日本語コーパス2億6,223万語から拾った。
// 「頻度は高いのに、英語に1対1で移せない」層だけを残してある。
// 勝手 / 適当 / せっかく / 立派 / 具合 / 世間 / 余計 — 全部そこから来ている。
// プロの通訳者が「訳せそうで訳せない」として挙げる語と同じ帯。
//
// english は4段。[0]短い一撃 [1]態度つき [2]完全文 [3]独り言
// context は「なぜ英語に1対1で移らないか」を書く。語釈ではなく構造の差。

import type { GorokuSeed } from './goroku-seed';

export const GOROKU_SEP_A: GorokuSeed[] = [
    // ── Day 1 ── 勝手・適当・いい加減。日本語の「雑さ」を英語はどう言うか
    { daySlot: 1, japanese: '勝手に決めんなよ', english: [
        "don't just decide that",
        "don't just decide that on your own",
        "you can't just decide that without asking me first",
        "you decided that on your own and then told me after. that's not a decision, that's an announcement. I'm not mad that you chose it. I'm mad that I found out about it the same way a stranger would."
    ], literal: 'on your own = 自分ひとりで(勝手に)', context: "「勝手に」は英語に一語で無い。on your own(自分ひとりで)、without asking(聞かずに)、behind my back(陰で)と、場面ごとに別の語に割れる。日本語の「勝手」は身勝手さと独断を一語に畳んでいるが、英語はどちらかを選んで名指しする。", category: 'shutdown', month: '2026-09' },
    { daySlot: 1, japanese: '適当でいいよ', english: [
        "whatever works",
        "honestly, whatever works is fine",
        "don't overthink it, whatever works is fine with me",
        "I said whatever works and I meant it. pick one. any one. I promise the version in your head where I secretly have a preference does not exist. I am not testing you."
    ], context: "「適当」は正反対の二つを一語で持つ。ちょうどいい(appropriate)と、いい加減(sloppy)。英語はこの二つが絶対に同じ語にならない。だから訳す側は毎回どちらかに決める必要がある。ここではwhatever worksで「何でもいい」側を取っている。", category: 'reaction', month: '2026-09' },
    { daySlot: 1, japanese: 'いい加減にしろ', english: [
        "that's enough",
        "alright, that is enough",
        "seriously, that's enough, knock it off",
        "that's enough. I have asked nicely three times and nice clearly is not landing, so here is the not-nice version. stop."
    ], literal: 'knock it off = やめろ(叩いて止めるイメージ)', context: "「いい加減」もまた両面。ちょうどいい塩梅と、度を越したの両方。「いい加減にしろ」の側は英語ではenough(量が満ちた)で言う。日本語は加減という程度の語、英語は量の語。程度を量に置き換えるのが英語の癖。", category: 'shutdown', month: '2026-09' },
    { daySlot: 1, japanese: 'まあまあかな', english: [
        "it was okay",
        "it was okay, nothing special",
        "it was fine, not amazing, not bad, just fine",
        "it was okay. and I know okay sounds like an insult but it isn't. it did the job. I would not go again but I do not regret going. that is the whole review."
    ], context: "「まあまあ」は英語だとokay。ただしokayは「悪くない」寄りで、日本語の「まあまあ」は「良くはない」寄り。同じ位置に見えて目盛りが半個ずれている。not badに寄せるとやや上、just fineに寄せるとやや下。", category: 'reaction', month: '2026-09' },
    { daySlot: 1, japanese: '割といけるじゃん', english: [
        "that's pretty good",
        "honestly that's pretty good",
        "that's actually pretty good, I didn't expect that",
        "that's actually pretty good. and I want you to hear the actually in there, because I came in with low expectations and you cleared them. that is a compliment. a small one. but a real one."
    ], context: "「割と」はprettyやactually。日本語の「割と」は「思ったより」の含みが入っているが、prettyにはそれが無い。だから英語はactuallyやI didn't expect thatを足して、期待とのズレを別に言葉にする。日本語は一語に埋め込む、英語は分けて出す。", category: 'opinion', month: '2026-09' },
    { daySlot: 1, japanese: '雑すぎる', english: [
        "that's sloppy",
        "that is way too sloppy",
        "that's way too sloppy, you need to redo it",
        "that's sloppy. not wrong exactly. it technically works. but somebody's going to look at this in six months and have to guess what you meant, and that somebody is probably me."
    ], context: "「雑」はsloppy。ただしsloppyは「だらしない」で人柄まで含む。日本語の「雑」は作業の粗さだけを指せる。英語で作業だけを言いたいならrushedやcarelessに逃がす。一語の守備範囲がずれている典型。", category: 'opinion', month: '2026-09' },
    { daySlot: 1, japanese: 'ちゃんとやって', english: [
        "do it properly",
        "please just do it properly",
        "can you just do it properly this time",
        "do it properly. I know properly is vague. that's the problem with the word. but you know what I mean, because you also know what you did."
    ], context: "「ちゃんと」はproperlyだが、これも一語で足りない。きちんと(neatly)、しっかり(firmly)、間違いなく(correctly)を全部背負っている。英語はどの方向のちゃんとかを毎回選ぶ。日本語の副詞は方向を持たないから、そのまま置ける。", category: 'request', month: '2026-09' },
    { daySlot: 1, japanese: 'てきとうに座って', english: [
        "sit anywhere",
        "just sit anywhere you like",
        "just sit wherever, we're not doing assigned seats",
        "sit anywhere. there's no head of the table, there's no seating chart, I did not think about this at all before you arrived and I am not about to start now."
    ], context: "同じ「適当」でも、こちらはanywhere。人に向かう指示のときは「好きに」の意味になり、物に向かうと「雑に」になる。英語はanywhereとsloppyで完全に別語。日本語の一語がどちらに転ぶかは、目的語が人か物かで決まっている。", category: 'request', month: '2026-09' },
    { daySlot: 1, japanese: '手抜きした', english: [
        "I cut corners",
        "I definitely cut corners on that",
        "I cut corners on it and it shows, I know",
        "I cut corners. I'm not proud of it. I had the time, technically, I just didn't have the will, and at some point I decided that done was better than good. ask me tomorrow if I still agree."
    ], literal: 'cut corners = 角を切る(近道して手を抜く)', context: "「手抜き」はcut corners。角を曲がらずに斜めに突っ切るという道のメタファーで、日本語の「手を抜く」は力を抜く身体のメタファー。同じ意味に空間と身体で別々に辿り着いている。", category: 'reaction', month: '2026-09' },
    { daySlot: 1, japanese: 'どうしようもない', english: [
        "nothing I can do",
        "there's nothing I can do about it",
        "at this point there's genuinely nothing I can do about it",
        "there's nothing I can do. and I've checked. I looked for the version of this where I have options and it does not exist. so now it's just a thing that happened."
    ], context: "「どうしようもない」は主語がいらない。英語はthere is nothing I can doと、まずthereを立てて次にIを入れる。誰にも何もできないのか、自分にできないのかを英語は分けるが、日本語は分けずに済ませられる。責任の所在を出さないで済む構文。", category: 'reaction', month: '2026-09' },

    // ── Day 2 ── せっかく・わざわざ・あえて。日本語の「手間の含み」
    { daySlot: 2, japanese: 'せっかく来たのに', english: [
        "after coming all this way",
        "I came all this way for nothing",
        "I came all the way out here and it was closed",
        "I came all this way. that's the part that gets me. not that it was closed, closed happens, but that I moved my whole afternoon around to be standing in front of a locked door."
    ], context: "「せっかく」は英語に無い。all this way(わざわざこんなに)、went out of my way(手間をかけた)、for nothing(無駄に)に割れる。日本語の「せっかく」は「手間をかけた」と「それが報われない」を一語で予告している。英語は手間と無駄を別々に言う。", category: 'reaction', month: '2026-09' },
    { daySlot: 2, japanese: 'わざわざありがとう', english: [
        "thanks for going out of your way",
        "seriously, thanks for going out of your way",
        "thank you for going out of your way to do that, you didn't have to",
        "thanks for going out of your way. and I mean that literally, you took a detour to do this, and the detour is the part I'm thanking you for, not the thing itself."
    ], literal: 'go out of one\'s way = 道を外れる(回り道して手間をかける)', context: "「わざわざ」はgo out of one's way。道を外れるという移動のメタファー。日本語の「わざわざ」は意図の語で、英語は経路の語。日本人が言えないのは、感謝の中に「手間」を入れる型が英語では句動詞になるから。", category: 'reaction', month: '2026-09' },
    { daySlot: 2, japanese: 'あえて言うけど', english: [
        "I'll just say it",
        "look, I'm going to just say it",
        "I'm going to say the thing nobody wants to say",
        "I'll just say it. somebody has to and everybody's looking at their shoes, so it might as well be the person who's already unpopular in this room."
    ], context: "「あえて」はI'll just say itのjustに乗る。英語のjustは「ただ」ではなく、ここでは「遠慮を飛ばして」の合図。日本語は「あえて」という副詞で覚悟を出すが、英語は小さい語の位置で出す。小語が態度を担うのが英語。", category: 'opinion', month: '2026-09' },
    { daySlot: 2, japanese: 'ついでにやっとく', english: [
        "I'll do it while I'm at it",
        "I'll just do it while I'm at it",
        "I'm already doing the other thing so I'll do that too while I'm at it",
        "I'll do it while I'm at it. moving twice costs more than moving once, and I'm already up, and if I sit back down I will not get up again."
    ], literal: 'while I\'m at it = やってるついでに', context: "「ついでに」はwhile I'm at it。日本語は名詞のように置けるが、英語は節を丸ごと足す。ついで=すでに取りかかっている状態、をwhile I amで時間として言う。日本語の一語が英語では時間の節になる。", category: 'suggestion', month: '2026-09' },
    { daySlot: 2, japanese: 'そこまでしなくていい', english: [
        "you don't have to go that far",
        "seriously, you don't have to go that far",
        "that's more than enough, you really don't have to go that far",
        "you don't have to go that far. I asked for help, not a rescue operation. at some point the help becomes its own event and then I owe you, and I hate owing people."
    ], context: "「そこまで」はthat far。距離の語。日本語も「そこ」で空間だから珍しく形が揃う。ただし英語はgo that farと動詞goを必ず立てる。日本語は「する」で済ませるところを、英語は移動の動詞で言う。程度を距離に変える癖。", category: 'reaction', month: '2026-09' },
    { daySlot: 2, japanese: '余計なお世話', english: [
        "none of your business",
        "that's really none of your business",
        "I appreciate the thought but that's none of your business",
        "that's none of your business. and I know it came from a good place. good places are where most of the worst advice comes from."
    ], context: "「余計」は英語に無い。unnecessaryは事務的すぎ、none of your businessは領分の語。日本語は「余分だ」と量で言い、英語は「あなたの領域ではない」と所有で言う。断りの根拠が、量か所有権かで分かれている。", category: 'shutdown', month: '2026-09' },
    { daySlot: 2, japanese: 'ちょっと様子見る', english: [
        "let's wait and see",
        "I'd rather wait and see for now",
        "let's just wait and see how it plays out first",
        "let's wait and see. I'm not saying no. I'm saying the information I need to say yes does not exist yet and I refuse to guess."
    ], literal: 'wait and see = 待って見る(様子見)', context: "「様子見」はwait and see。日本語は名詞で持てるが英語は動詞2つを並べる。play outもよく付く。様子=状況の推移をplay out(展開しきる)で言うのが英語で、日本語は「様子」という静かな名詞に押し込む。", category: 'suggestion', month: '2026-09' },
    { daySlot: 2, japanese: '手が空いたら', english: [
        "when you get a chance",
        "whenever you get a chance",
        "whenever you get a chance, no rush at all",
        "whenever you get a chance. and I do mean whenever. this is the lowest priority thing on your list and I would like it to stay there."
    ], context: "「手が空く」は身体のメタファー。英語はget a chance(機会を得る)かfree up(空きができる)で、手は出てこない。日本語は忙しさを手で数え、英語は時間で数える。同じ状況を身体と時間で別々に言う。", category: 'request', month: '2026-09' },
    { daySlot: 2, japanese: '一応やっといた', english: [
        "I did it just in case",
        "I went ahead and did it just in case",
        "I went ahead and did it just in case we need it later",
        "I did it just in case. probably wasted effort. but wasted effort is cheaper than the version where we need it at four in the afternoon and nobody has it."
    ], context: "「一応」は英語に一語で無い。just in case(念のため)、technically(形式上は)、for now(とりあえず)に割れる。この三つは英語では全部別の意味で、日本語だけが一語に畳んでいる。通訳が毎回止まる語の代表。", category: 'reaction', month: '2026-09' },
    { daySlot: 2, japanese: 'とりあえずビール', english: [
        "beer to start",
        "we'll start with beers",
        "let's just start with beers and figure out the rest later",
        "beers to start. I don't know what I want to eat yet, I don't know how long we're staying, but I know the first move and the first move is beer."
    ], context: "「とりあえず」はfor now / to start。日本語は「決めきらないまま先に進む」の合図で、英語のto startは順番の語。決めていないという含みは英語だと落ちるので、figure out the rest laterのように後で明示する。", category: 'request', month: '2026-09' },

    // ── Day 3 ── 具合・調子・加減。体と物事の状態を同じ語で言う日本語
    { daySlot: 3, japanese: '具合どう？', english: [
        "how are you feeling",
        "hey, how are you feeling today",
        "how are you feeling, any better than yesterday?",
        "how are you feeling. and I want the real answer, not the one you give your boss. you can say bad. bad is an allowed answer here."
    ], context: "「具合」は人にも物にも使える。人ならhow are you feeling、機械ならhow is it running、進み方ならhow is it going。英語は対象ごとに動詞が変わる。日本語は「具合」一語で受け、英語は動詞で分ける。", category: 'request', month: '2026-09' },
    { daySlot: 3, japanese: '調子いいね', english: [
        "you're on a roll",
        "you are really on a roll today",
        "you're on a roll today, whatever you're doing, keep doing it",
        "you're on a roll. I don't know what changed, you don't know what changed, and I'd honestly rather neither of us examine it too closely in case it stops."
    ], literal: 'on a roll = 転がってる(勢いに乗ってる)', context: "「調子」もまた広い。人の体調、機械の動き、勢い。勢いの側はon a rollで、転がり続けるという運動のメタファー。日本語の「調子」は音楽の調子が語源で、英語は転がる球。音と運動で別々に言っている。", category: 'reaction', month: '2026-09' },
    { daySlot: 3, japanese: '調子に乗るなよ', english: [
        "don't push it",
        "alright, don't push your luck",
        "don't push your luck, you got away with it once",
        "don't push it. you got one, you got a good one, and the correct move now is to stop talking and let it be a good one."
    ], context: "同じ「調子」でも、乗るとdon't push your luck。運を押すという賭けのメタファーになる。褒めのon a rollと叱りのpush your luckが、日本語では同じ「調子」で繋がっている。英語話者にはこの二つが同じ語である理由が見えない。", category: 'shutdown', month: '2026-09' },
    { daySlot: 3, japanese: '力加減がわからない', english: [
        "I don't know how hard to push",
        "I never know how hard to push",
        "I can't tell how much pressure it needs, I keep overdoing it",
        "I don't know how hard to push. too soft and nothing happens, too hard and it breaks, and the window between those two is apparently smaller than my hands can measure."
    ], context: "「加減」は英語に無い。how hard(どれくらい強く)、how much(どれくらいの量)と、毎回疑問詞の句に開く。日本語は加える・減らすの二語で程度そのものを名詞にしているが、英語は程度を名詞にできず質問の形で言う。", category: 'reaction', month: '2026-09' },
    { daySlot: 3, japanese: '手加減してよ', english: [
        "go easy on me",
        "come on, go easy on me",
        "go easy on me, I've been doing this for like two weeks",
        "go easy on me. I'm not asking you to lose. I'm asking you to make it look like I had a chance at some point during the game."
    ], literal: 'go easy on = 優しくやる(手加減する)', context: "「手加減」はgo easy on。日本語は手を加減する身体の語、英語はeasyという難易度の語。onで相手を指す。日本人が言えないのは、英語が「相手に対して easy に行く」という前置詞の型を取るから。", category: 'request', month: '2026-09' },
    { daySlot: 3, japanese: '無理しないで', english: [
        "take it easy",
        "seriously, take it easy",
        "take it easy, nothing here is worth wrecking yourself over",
        "take it easy. the thing will still be here tomorrow. you might not be, at this rate, and then who finishes it."
    ], context: "「無理」は英語に一語で無い。impossibleは不可能の側、don't overdo itは無茶の側、take it easyは労りの側。日本語の「無理」は不可能と無茶を一語で持つので、どちらの顔で出ているかを毎回見分ける必要がある。", category: 'reaction', month: '2026-09' },
    { daySlot: 3, japanese: 'それは無理がある', english: [
        "that's a stretch",
        "honestly, that's a bit of a stretch",
        "that's a stretch, I don't think the logic holds",
        "that's a stretch. you can get from A to B the way you just did, but you have to jump, and I watched you jump."
    ], literal: 'a stretch = 伸ばしすぎ(こじつけ)', context: "同じ「無理」でも理屈に使うとa stretch。伸ばしすぎという物理のメタファーで、日本語の「無理がある」も「理が無い」ではなく歪みの感覚。ここは珍しく発想が近いが、英語は必ず名詞a stretchにする。", category: 'opinion', month: '2026-09' },
    { daySlot: 3, japanese: '無理やりやらされた', english: [
        "I got forced into it",
        "I basically got forced into it",
        "I didn't volunteer, I got forced into it",
        "I got forced into it. and I know nobody physically made me. but there's a kind of asking where no is not one of the available answers, and that's the kind that happened."
    ], context: "「やらされた」は使役と受身が重なった形で、英語に直接の対応が無い。got forced intoやgot roped intoのgot受身で言う。日本語は動詞の形だけで「自分の意思ではない」を出せるが、英語は動詞を替える必要がある。", category: 'reaction', month: '2026-09' },
    { daySlot: 3, japanese: '体がついてこない', english: [
        "my body can't keep up",
        "my body just can't keep up anymore",
        "my head says go but my body can't keep up anymore",
        "my body can't keep up. the plan is fine. the plan has always been fine. the problem is the equipment executing the plan is fifteen years older than the last time I made this plan."
    ], context: "「ついてこない」はkeep up。日本語は体が後から来ない、英語は体が追い付き続けられないで、どちらも追走のメタファー。ただし英語はkeep upと句動詞にする。upが「同じ高さを保つ」の意味で入るのが英語らしい。", category: 'reaction', month: '2026-09' },
    { daySlot: 3, japanese: '気持ち悪い', english: [
        "I feel sick",
        "honestly I feel kind of sick",
        "something about it just feels off, it's making me uncomfortable",
        "I feel sick. and I can't tell yet if it's the food or the room or just the whole day catching up with me at once."
    ], context: "「気持ち悪い」は二つに割れる。体調ならI feel sick、対象への不快ならcreepyやit feels off。英語はこの二つが完全に別語で、日本語だけが同じ語で言える。「あの人気持ち悪い」を I feel sick と訳すと大事故になる。", category: 'reaction', month: '2026-09' },

    // ── Day 4 ── 世間・立場・迷惑。人の目を言葉にする層
    { daySlot: 4, japanese: '世間体が悪い', english: [
        "it looks bad",
        "it just looks bad to other people",
        "it looks bad, and unfortunately that matters here",
        "it looks bad. not is bad. looks. and I know that shouldn't be the deciding factor, but you and I both know it's going to be."
    ], context: "「世間体」は英語に無い。how it looksという見え方の語で近づける。世間=名前のない他人の集合、を英語はother peopleやeveryoneと数えられる形にする。日本語は数えない主語を持てるが、英語は誰かを名指す必要がある。", category: 'opinion', month: '2026-09' },
    { daySlot: 4, japanese: '立場がない', english: [
        "I look bad",
        "that makes me look really bad",
        "if that gets out I've got nowhere to stand",
        "I've got nowhere to stand. I defended this in a meeting. I put my name on it. so when it falls over, it doesn't just fall on the project."
    ], literal: 'nowhere to stand = 立つ場所がない', context: "「立場」はpositionだが、「立場がない」はpositionでは通じない。英語はI look badかI have no leg to stand onに逃がす。日本語は立つ場所という空間で面子を言い、英語は見え方か脚の有無で言う。", category: 'reaction', month: '2026-09' },
    { daySlot: 4, japanese: '迷惑かけたくない', english: [
        "I don't want to be a burden",
        "I really don't want to be a burden",
        "I don't want to put you out, you've got enough going on",
        "I don't want to be a burden. and before you say I'm not, I want you to actually check, because people say that reflexively and then quietly start avoiding you."
    ], context: "「迷惑」はtroubleでもbotherでもburdenでもない。かける相手と重さで語が変わる。日本語は「迷惑をかける」という決まった動詞句を持つが、英語はbe a burden(重荷である)とput you out(手間を取らせる)で、状態か行為かを選ぶ。", category: 'reaction', month: '2026-09' },
    { daySlot: 4, japanese: '気を使わせちゃって', english: [
        "sorry to make you worry",
        "sorry, I didn't mean to make you go to any trouble",
        "sorry, I didn't mean to make you feel like you had to do something",
        "sorry to make you go to any trouble. that's the part I actually feel bad about. not the thing itself, but the fact that you had to spend a whole afternoon thinking about me."
    ], context: "「気を使う」自体が訳しにくい上に、ここは使役形。相手に気を使わせた責任を謝る型で、英語にはこの決まり文句が無い。make you feel like you had toと、相手の心の動きまで説明して初めて意味が出る。", category: 'reaction', month: '2026-09' },
    { daySlot: 4, japanese: '空気読めない', english: [
        "they can't read the room",
        "that guy seriously cannot read the room",
        "he cannot read the room, he just keeps going",
        "he cannot read the room. everyone else adjusted about ten minutes ago, the whole tone of the table changed, and he is still telling the story he came in with."
    ], literal: 'read the room = 部屋を読む(空気を読む)', context: "「空気を読む」はread the room。日本語は空気という気体、英語は部屋という空間。読むという動詞は同じ。ここは英語側にも表現があるので珍しく直訳が効くが、英語のread the roomは主に会議や集団の場に限られる。", category: 'opinion', month: '2026-09' },
    { daySlot: 4, japanese: '顔が広い', english: [
        "he knows everyone",
        "that guy knows absolutely everyone",
        "he knows everyone, whatever you need, he knows a guy",
        "he knows everyone. you say a job, any job, and he pulls out his phone and there is already a person in there who does that job and owes him a favor."
    ], context: "「顔が広い」は身体のメタファーだが、英語はwell-connectedと配線のメタファーで言う。日本語は顔の面積、英語は接続の本数。口語ではknows everyoneが一番自然で、比喩を捨てて事実で言うほうが通じる。", category: 'opinion', month: '2026-09' },
    { daySlot: 4, japanese: '顔を立てる', english: [
        "let him save face",
        "we should let him save face here",
        "just let him save face, it costs us nothing",
        "let him save face. he's going to back down either way, the only question is whether he gets to do it with his dignity intact, and that costs us nothing."
    ], literal: 'save face = 顔を救う(面子を保つ)', context: "save faceは英語だが、元は東アジアからの翻訳語。だから顔のメタファーがそのまま残っている。日本語は「立てる」と垂直、英語は「救う」と保全。動詞だけが違う珍しい例で、名詞は同じ顔のまま渡っている。", category: 'suggestion', month: '2026-09' },
    { daySlot: 4, japanese: '肩身が狭い', english: [
        "I feel out of place",
        "I honestly feel out of place there",
        "I feel out of place every time I walk in there",
        "I feel out of place. nobody's done anything. nobody's said anything. I just occupy the room differently than everyone else in it and we can all tell."
    ], context: "「肩身が狭い」は身体を縮める感覚。英語はout of place(場所に合わない)と位置で言う。日本語は自分の体積、英語は座標。同じ居心地の悪さを、縮こまりと位置ずれで別々に言葉にしている。", category: 'reaction', month: '2026-09' },
    { daySlot: 4, japanese: '偉そう', english: [
        "he acts superior",
        "he always acts so superior",
        "he talks down to everybody and doesn't even notice",
        "he talks down to everybody. and if you told him that, he would be genuinely surprised, because in his head he's just being clear."
    ], literal: 'talk down to = 見下して話す', context: "「偉そう」はacts superiorやtalks down to。日本語は「偉い」に「そう」を付けるだけで皮肉になるが、英語にはこの接尾辞が無い。だからacts(演じている)やtalks down(下に向けて話す)と、動作で皮肉を作る。", category: 'opinion', month: '2026-09' },
    { daySlot: 4, japanese: '見栄はるなよ', english: [
        "don't show off",
        "come on, don't show off",
        "you don't have to show off, nobody's counting",
        "don't show off. everybody here already knows what you can do. the showing is not for us, it's for you, and that's fine, just don't pretend it's for us."
    ], context: "「見栄」はshow offやkeep up appearances。日本語は「見え」が名詞になって独立しているが、英語は動詞句でしか言えない。見栄という名詞を英語に移すと必ず動作の形になる。名詞が動詞にほどける典型。", category: 'shutdown', month: '2026-09' },

    // ── Day 5 ── 我慢・遠慮・気の毒。感情の抑えを言う層
    { daySlot: 5, japanese: '我慢してる', english: [
        "I'm holding it in",
        "I'm just holding it in for now",
        "I'm holding it in but I'm not going to be able to much longer",
        "I'm holding it in. and I want credit for that, because the version of me that says what I'm thinking right now would end this conversation permanently."
    ], context: "「我慢」は英語に一語で無い。感情ならhold it in、痛みならput up with、欲しい物ならresist。日本語は全部「我慢」で済む。何を我慢しているかで英語の動詞が変わるので、通訳は毎回対象を確認する必要がある。", category: 'reaction', month: '2026-09' },
    { daySlot: 5, japanese: 'もう我慢の限界', english: [
        "I've had it",
        "I have officially had it",
        "that's it, I've had it, I'm done",
        "I've had it. and I know I've said that before and then kept going, but this time the sentence came out flat instead of loud, and that's usually the difference."
    ], literal: "I've had it = もう十分持った(限界)", context: "「限界」をlimitと訳すと硬い。口語はI've had itで、haveの完了形だけで限界を出す。日本語は限界という名詞を立て、英語は動詞の時制で言う。名詞で言う日本語と、時制で言う英語の差がそのまま出る。", category: 'shutdown', month: '2026-09' },
    { daySlot: 5, japanese: '遠慮しとく', english: [
        "I'll pass",
        "I think I'll pass on this one",
        "I'll pass this time, but thanks for asking",
        "I'll pass. and it's not a soft no that means ask me again in ten minutes. it's the regular kind."
    ], context: "「遠慮する」は英語に無い。断りならI'll pass、控えるならhold back、気を遣うならdon't be shy。しかも「遠慮なくどうぞ」は逆にhelp yourself。一語が正反対の場面で使われるので、通訳者が最も詰まる語のひとつ。", category: 'reaction', month: '2026-09' },
    { daySlot: 5, japanese: '遠慮なくどうぞ', english: [
        "help yourself",
        "please, help yourself",
        "help yourself, seriously, don't hold back",
        "help yourself. there is more in the kitchen, there is no correct amount to take, and the worst outcome tonight is leftovers."
    ], context: "同じ「遠慮」が、こちらではhelp yourself。日本語は「遠慮を無くせ」と否定で勧め、英語は「自分で取れ」と行動で勧める。断りと勧めが同じ語の裏表になっているのは日本語だけで、英語はまったく別の語になる。", category: 'request', month: '2026-09' },
    { daySlot: 5, japanese: '気の毒に', english: [
        "that's rough",
        "man, that's rough",
        "that's rough, I'm sorry you're dealing with that",
        "that's rough. and I don't have anything useful to add, I just didn't want to say nothing and have it look like I didn't hear you."
    ], context: "「気の毒」はI'm sorryかthat's rough。英語のI'm sorryは謝罪と同じ形なので、日本人は同情で使うのをためらう。that's roughのほうが安全で口語的。日本語は「気の毒」で同情専用の語を持っているが、英語には無い。", category: 'reaction', month: '2026-09' },
    { daySlot: 5, japanese: '心苦しいんだけど', english: [
        "I hate to do this",
        "I really hate to do this to you",
        "I hate to do this to you, but I have to cancel",
        "I hate to do this to you. and I want you to know I looked for every other way out of it before I sent this message."
    ], context: "「心苦しい」はI hate to。英語のhateは憎むではなく「気が進まない」の合図で、to不定詞と組んで前置きになる。日本語は心が苦しいと内臓の感覚で言い、英語は嫌悪の動詞で言う。同じ躊躇を別の感情語で表す。", category: 'reaction', month: '2026-09' },
    { daySlot: 5, japanese: '割に合わない', english: [
        "it's not worth it",
        "honestly, it's just not worth it",
        "the amount of work isn't worth what you get back",
        "it's not worth it. I ran the numbers, I ran them twice, and every version ends with me doing a month of work for something I could have bought."
    ], literal: 'worth = 見合う価値', context: "「割に合う」は割合の語。英語はworth(価値がある)で、比率ではなく価値そのもので言う。日本語は労力と報酬の比を見て、英語は結果の価値を見る。比を言う日本語と、値を言う英語。", category: 'opinion', month: '2026-09' },
    { daySlot: 5, japanese: '思ってたのと違う', english: [
        "not what I expected",
        "that's really not what I expected",
        "it's not what I expected, and I mean that neutrally",
        "not what I expected. I'm not saying worse. I genuinely can't tell yet whether it's worse, I just know the thing in my head and the thing in front of me are two different objects."
    ], context: "「思ってたのと違う」はnot what I expected。日本語は「思う」で内心を言い、英語はexpect(予期する)で未来への構えを言う。thinkを使うと通じない。日本語の「思う」は英語ではthink/feel/expect/guessに割れる。", category: 'reaction', month: '2026-09' },
    { daySlot: 5, japanese: '腑に落ちない', english: [
        "something doesn't sit right",
        "something about it doesn't sit right with me",
        "I can't argue with it but something doesn't sit right",
        "something doesn't sit right. every individual piece checks out. I've been through it twice. but the whole thing put together makes a shape I don't trust."
    ], literal: "doesn't sit right = 座りが悪い", context: "「腑に落ちる」は内臓に落ちる、英語のsit rightは正しく座る。どちらも身体の中の収まりで言うが、日本語は落下、英語は着席。納得を「収まりの良さ」で言う発想は共通していて、動きの向きだけが違う。", category: 'reaction', month: '2026-09' },
    { daySlot: 5, japanese: 'いい人なんだけどね', english: [
        "he's nice, but",
        "he's a nice guy, but you know",
        "he's a nice guy, it's just that nice isn't the thing we needed here",
        "he's a nice guy. and that but is doing a lot of work in this sentence, and I think we both know what's on the other side of it, so I'll stop there."
    ], context: "「〜なんだけどね」の「ね」は言い切らずに相手に預ける終助詞。英語にはこの機能語が無いので、but you knowやI'll stop thereと、文を足して未完を作る。日本語は語尾一つで済むところを、英語は一文使う。", category: 'opinion', month: '2026-09' },
];
