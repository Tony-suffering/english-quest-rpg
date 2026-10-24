// 俺語録 2026年10月 その4 — Day 19-24
// 骨格: 主語を落とさない(総称の you/they) / 冠詞 a と the / 動詞+副詞で動きを言う / have で状況を言う / 「〜そう」/ 疑問詞+to

import type { GorokuSeed } from './goroku-seed';

export const GOROKU_OCT_D: GorokuSeed[] = [
    // ── Day 19 ── 主語を落とさない。日本語が省く「人は」「世間は」「誰か」を、英語は you / they / people で立てる
    { daySlot: 19, japanese: '慣れるよ', english: [
        "you get used to it",
        "you get used to it, trust me",
        "you get used to it faster than you'd think",
        "you get used to it. everyone says that and everyone's right. the first week you notice everything. the second week you notice half. by the third week you're the one telling someone else they'll get used to it, and you mean it."
    ], context: "「慣れるよ」に主語は無い。誰でも、という意味。英語は you を置く。この you は「あなた」ではなく「人は誰でも」。日本語が主語を省いて一般論を言うとき、英語は you で一般の人を立てる。主語席を空けられない言語の、一般論の言い方。", category: 'opinion', month: '2026-10' },
    { daySlot: 19, japanese: '今日は休みだって', english: [
        "they're closed today",
        "they're closed today, apparently",
        "they're closed today, apparently, I just checked",
        "they're closed. today. I drove there. I parked. I walked up to the door and read a sign that had clearly been there all week, and I stood there reading it twice like the second reading would change it. it didn't. they're closed."
    ], context: "「休みだって」は店が主語だが日本語は言わない。英語は they で店の人たちを立てる。it's closed でも通じるが、they're closed のほうが「あの人たちが閉めている」で口語。店や会社や役所を they で受けるのが英語の癖。", category: 'reaction', month: '2026-10' },
    { daySlot: 19, japanese: '値上げするらしい', english: [
        "they're raising prices",
        "they're raising prices, I heard",
        "I heard they're raising prices again next month",
        "they're raising prices. again. they sent an email that started with we value you, which is how you know. nobody who values you starts an email that way. the number's at the bottom. it's always at the bottom. it's bigger than last time."
    ], context: "「するらしい」の主語は会社だが、日本語は落とす。英語は they。they're raising prices で「あの人たちが値上げする」。誰か分からなくても they を置く。主語が特定できないとき、日本語は空席、英語は they。", category: 'reaction', month: '2026-10' },
    { daySlot: 19, japanese: 'そういうもんだよ', english: [
        "that's how it goes",
        "that's just how it goes",
        "that's just how it goes, nothing you can do about it",
        "that's how it goes. I'm not saying it's fair. it's not fair. I'm saying it's how it goes, which is a different thing, and once you stop expecting it to be fair you can start working with how it goes. it's a better use of the afternoon."
    ], context: "「そういうもん」は主語が無い一般論。英語は that's how it goes と、it で「物事」を立てる。how it goes、how it works、how it is。it は Day 1 のダミーの it で、世の中の仕組みを指す。日本語の「もん」を英語は it で受ける。", category: 'opinion', month: '2026-10' },
    { daySlot: 19, japanese: 'ここ、駐車できない', english: [
        "you can't park here",
        "you can't park here, they'll tow you",
        "you can't park here, they'll tow you in about five minutes",
        "you can't park here. I know it looks like you can. it looks like a spot. it's not a spot. it's a trap shaped like a spot, and a truck will come, and you'll spend the afternoon at a lot across town paying a man who doesn't care."
    ], context: "「駐車できない」の主語は「誰も」。英語は you can't park で、you が「誰でも」。it's not allowed to park とは言わない。禁止や規則を言うとき、英語は you を主語にして一般の人に語りかける形にする。", category: 'shutdown', month: '2026-10' },
    { daySlot: 19, japanese: '英語ではそう言わない', english: [
        "you don't say that",
        "you don't say that in English",
        "you don't really say that in English, it sounds off",
        "you don't say that. it's not wrong, exactly. every word is a real word. but they're in an order nobody uses, and a native speaker will hear it and know, the way you know when someone's wearing a shirt inside out. they'll be polite. they'll know."
    ], context: "「そう言わない」の主語は「人は」。英語は you don't say that。people don't say でもいい。we don't say だと自分を入れる。言語の習慣を言うとき、英語は you か people か we で主語を立てる。日本語のように主語無しで言えない。", category: 'opinion', month: '2026-10' },
    { daySlot: 19, japanese: 'ここ、料理うまいって', english: [
        "they say it's good",
        "they say the food's good here",
        "people say the food's really good here, I've never been",
        "they say it's good. I don't know who they are. they is always a crowd of people I've never met who have opinions I've inherited. but they've been right before. they were right about the other place. so. let's see if they're right about this one."
    ], context: "「うまいって」の「って」は伝聞。英語は they say で「世間が言うには」。they は特定の人ではなく、噂の主。日本語の「って」一語の伝聞を、英語は they say と主語と動詞で作る。主語の無い伝聞は英語に無い。", category: 'opinion', month: '2026-10' },
    { daySlot: 19, japanese: '雨降るって', english: [
        "they said rain",
        "they're saying rain later",
        "they're saying rain this afternoon, bring something",
        "they're saying rain. the app, the news, the guy on the radio who's wrong half the time. they're all saying rain. when they all agree, it usually doesn't happen, but when it does happen and you didn't bring anything, you look at the sky like it betrayed you. bring something."
    ], context: "天気予報も they。they're saying rain で「予報では雨」。the forecast says でもいいが、they のほうが口語。日本語は「降るって」で誰が言ったか落とすが、英語は they で予報の主を立てる。誰か分からないなら they、が英語の逃げ道。", category: 'reaction', month: '2026-10' },
    { daySlot: 19, japanese: '若いうちにやっとけ', english: [
        "do it while you're young",
        "do it while you're young, seriously",
        "do it while you're young, you won't want to later",
        "do it while you're young. I know that sounds like something old people say. I'm saying it. I'm the old person. and I'm saying it because I didn't, and I had reasons, and the reasons seemed good, and now I can't remember a single one of them. do it."
    ], context: "「やっとけ」は命令だが、「若いうちに」の主語は「人は」。英語は while you're young と you で受ける。この you も一般の人。命令文と総称の you が組み合わさると、格言のような響きになる。日本語の「うちに」は while。", category: 'suggestion', month: '2026-10' },
    { daySlot: 19, japanese: 'こういう時は待つしかない', english: [
        "you just have to wait",
        "you just have to wait it out",
        "in times like this, you just have to wait it out",
        "you just have to wait. there's nothing to push, nothing to call, nothing to fix. I looked. I looked hard. it's the kind of problem that only time solves, and time doesn't take requests. so you sit. you wait. you drink the coffee. it's not bad coffee."
    ], context: "「待つしかない」の主語は「自分たち」でも「人は」でもある。英語は you have to wait と you で一般化する。we have to wait だと自分たちの話。you にすると「こういう時は誰でも」の格言になる。主語の選び方で、個人の話が一般論に変わる。", category: 'opinion', month: '2026-10' },

    // ── Day 20 ── 冠詞 a と the。同じ名詞が、冠詞一つで別の物になる
    { daySlot: 20, japanese: 'コーヒー飲む？', english: [
        "coffee?",
        "want a coffee?",
        "want a coffee, I'm making one anyway",
        "want a coffee? I'm making one. I make one at this time every day and every day I ask and every day you say no and then drink half of mine. so this time I'm making two. one is yours. take it or I drink both."
    ], context: "「コーヒー飲む?」は a coffee で「一杯のコーヒー」。coffee だけだと液体の総称。a が付くと数えられる一杯になる。日本語は数を言わないが、英語は a で「一つ」と数える。この a が無いと、飲み物ではなく物質の話になる。", category: 'suggestion', month: '2026-10' },
    { daySlot: 20, japanese: 'そのコーヒー、俺の', english: [
        "that's my coffee",
        "hey, that's the coffee I made",
        "hey, that's the coffee I made, get your own",
        "that's the coffee I made. the one. I made one and it was for me and you're holding it. I'm not mad. I'm confused about how it got from the counter to your hand. that's a journey. explain the journey."
    ], context: "「その」は the。the coffee で「あの特定のコーヒー」。a coffee は不特定の一杯、the coffee は話に出た一杯。日本語の「その」「あの」を英語は the で言う。指せる物、話に出た物、一つしか無い物、が the。", category: 'shutdown', month: '2026-10' },
    { daySlot: 20, japanese: '駅で会おう', english: [
        "meet at the station",
        "let's meet at the station",
        "let's meet at the station, the usual spot",
        "meet at the station. the station. you know which one. there's only one in this conversation. if you go to a different station, that's not a misunderstanding, that's a choice, and I'll be at the station, waiting, thinking about your choice."
    ], context: "「駅」は the station。どの駅か分かっているから the。a station だと「どこかの駅」になり、待ち合わせにならない。日本語は「駅」で通じるが、英語は the が無いと場所が定まらない。共通の場所は the。", category: 'suggestion', month: '2026-10' },
    { daySlot: 20, japanese: '車で行く', english: [
        "I'll drive",
        "I'll take the car",
        "I'll take the car, it's easier with the bags",
        "I'll take the car. the train's fine but the bags aren't, and I'm not carrying three bags up two flights of stairs to save twenty minutes. the car sits in the garage all week. this is what it's for. this is its moment."
    ], context: "「車で」は take the car で、自分の車だから the。by car だと手段の総称で、冠詞が無い。the car は「うちの車」。日本語の「車で」は手段だが、英語は the car と「あの車」で言うか、by car と手段で言うか、二つの道がある。", category: 'suggestion', month: '2026-10' },
    { daySlot: 20, japanese: '犬飼いたい', english: [
        "I want a dog",
        "I really want a dog",
        "I really want a dog, but the apartment says no",
        "I want a dog. a dog. any dog. I'm not picky about the dog. I walk past the park and see people with dogs and something in my chest does a thing. the apartment doesn't allow dogs. the apartment doesn't know about the thing in my chest."
    ], context: "「犬飼いたい」は a dog。特定の犬ではなく、どれでも一匹。the dog だと「あの犬」で、話に出た犬になる。日本語は「犬」で済むが、英語は a で「どれか一匹」と言う。まだ存在しない物、決まっていない物は a。", category: 'opinion', month: '2026-10' },
    { daySlot: 20, japanese: '犬、元気？', english: [
        "how's the dog?",
        "how's the dog doing?",
        "how's the dog doing, is his leg better?",
        "how's the dog? the leg. the last time I saw him he was doing the thing where he pretends the leg is fine and then sits down very suddenly. is he still doing the thing. tell me he's not doing the thing."
    ], context: "相手の犬は the dog。お互いに知っている犬だから the。a dog だと「どこかの犬」で意味が通らない。同じ「犬」でも、まだ居ない犬は a、居る犬は the。日本語には無いこの区別が、英語では名詞のたびに発生する。", category: 'suggestion', month: '2026-10' },
    { daySlot: 20, japanese: '仕事探してる', english: [
        "looking for a job",
        "I'm looking for a job",
        "I'm looking for a job, anything at this point",
        "I'm looking for a job. a job. not the job. I gave up on the job a while ago. the job is a thing you see in a movie. a job is a thing that pays rent. I'll take a job. I'll take two. I'm not proud. I'm behind on rent."
    ], context: "「仕事探してる」は a job。まだ決まっていないから a。the job だと「あの仕事」で、特定の求人の話になる。a job(どれか)と the job(あれ)の差は、日本語には無い。英語はまだ無い物を a で、有る物を the で呼ぶ。", category: 'reaction', month: '2026-10' },
    { daySlot: 20, japanese: '仕事、どうだった？', english: [
        "how was work?",
        "how was work today?",
        "how was work today, you look tired",
        "how was work? you don't have to say. you have the face. the face says work was work. but sometimes the face is wrong, and sometimes there's a story, and I'd like the story if there is one. there's a story. I can tell."
    ], context: "「仕事」の総称は work で、冠詞が無い。a job は「一つの職」、work は「働くこと全般」。how was work? で「今日の仕事は」。日本語の「仕事」一語が、英語では a job と work に分かれる。数えるか数えないかで、冠詞の有無が決まる。", category: 'suggestion', month: '2026-10' },
    { daySlot: 20, japanese: '時間ある？', english: [
        "got a minute?",
        "got a minute?",
        "have you got a minute, I need to ask you something",
        "got a minute? one. I'm not asking for the afternoon. I'm asking for one minute, the length of one minute, and I'll set a timer if you want. it's a small question with a small answer. sixty seconds. go."
    ], context: "「時間ある?」は got a minute? と a minute で「一分」。time だと総称で冠詞が無い。got time? も言えるが、a minute のほうが「ちょっとだけ」が伝わる。数えられる一分を a で切り出すことで、頼みが小さく見える。", category: 'suggestion', month: '2026-10' },
    { daySlot: 20, japanese: '時間が解決する', english: [
        "time will tell",
        "give it time",
        "give it time, it'll sort itself out",
        "give it time. not a lot. not forever. but more than a week. a week is nothing. a week is the amount of time it takes to be sure you're upset. give it a month. things look different from a month. I don't know why. they just do."
    ], context: "「時間」の総称は time で冠詞無し。the time だと「その時刻」になる。time will tell、give it time。日本語の「時間」は一語だが、英語は time(総称)、the time(時刻)、a time(一回)と、冠詞で三つに割れる。", category: 'opinion', month: '2026-10' },

    // ── Day 21 ── 動詞+副詞で動きを言う。「入ってきた」「寄る」「出る」を、動詞と方向の語で組む
    { daySlot: 21, japanese: '入ってきた', english: [
        "walked in",
        "she just walked in",
        "she just walked in like nothing happened",
        "she walked in. like nothing happened. like there hadn't been a week of silence and three unanswered messages. just walked in, sat down, asked what's for lunch. and the thing is, it worked. I told her what's for lunch."
    ], context: "「入ってきた」は walk in。「歩く」と「中へ」を組む。enter は硬い。英語は動詞で「どう動いたか」、副詞で「どこへ」を言う。日本語は「入る」一語に方向が入っているが、英語は walk/run/come + in と分ける。この分解が骨格。", category: 'reaction', month: '2026-10' },
    { daySlot: 21, japanese: 'ちょっと寄ってく', english: [
        "I'll swing by",
        "I'll swing by later",
        "I'll swing by later if I'm in the area",
        "I'll swing by. not a visit. a swing. in and out. I won't take my jacket off. I'll say hi, I'll drop the thing, I'll look at the new couch, I'll say it looks great, and I'll be gone before the kettle boils. a swing."
    ], context: "「寄る」は swing by、drop by、stop by。by が「そばを通る」で、動詞が動き方。swing は「ふらっと」、drop は「落ちるように」、stop は「止まる」。日本語の「寄る」一語を、英語は動きの動詞と by で組む。", category: 'suggestion', month: '2026-10' },
    { daySlot: 21, japanese: 'もう出るね', english: [
        "heading out",
        "I'm heading out",
        "I'm heading out, see you tomorrow",
        "I'm heading out. I've been heading out for twenty minutes. I said it, I stood up, and then someone asked a question and I sat back down. I'm standing up again now. this time the standing is real. watch me leave."
    ], context: "「出る」は head out。head は「向かう」で、out が「外へ」。leave でも通じるが、head out は「そろそろ」の軽さがある。日本語の「出る」を英語は動詞+out で言い、動詞を変えると温度が変わる。", category: 'shutdown', month: '2026-10' },
    { daySlot: 21, japanese: 'こっち来て', english: [
        "come over",
        "come over here",
        "come over here for a second, I want to show you something",
        "come over. here. I'm not going to describe it. describing it would take longer than you walking. it's five steps. take the five steps and look at the screen and tell me I'm not imagining this. I might be imagining this."
    ], context: "「こっち来て」は come over。over が「こちら側へ」。come here でもいいが、come over は「向こうからこちらへ渡ってくる」の距離感。家に呼ぶときも come over。日本語の「来る」に over を足すと、英語の呼び方になる。", category: 'request', month: '2026-10' },
    { daySlot: 21, japanese: '通り過ぎた', english: [
        "drove past",
        "I drove right past it",
        "I drove right past it and had to turn around",
        "I drove past it. twice. it's a small sign and a big road and I was looking at the wrong side. the third time I slowed down enough to read every sign on the street, which annoyed the car behind me, which I understand."
    ], context: "「通り過ぎる」は drive past、walk past。past が「通り越して」。動詞は手段で、past が方向。pass by でも言える。日本語の「通り過ぎる」は一語だが、英語は「車で」「歩いて」と手段を動詞で言ってから past を付ける。", category: 'reaction', month: '2026-10' },
    { daySlot: 21, japanese: '戻ってきた', english: [
        "came back",
        "he came back, eventually",
        "he came back eventually, with no explanation",
        "he came back. no explanation. he'd been gone an hour and he walked in with a bag from the store, and the bag had one thing in it, and the thing was not something we needed. I didn't ask. some journeys you don't ask about."
    ], context: "「戻る」は come back。back が「元の場所へ」。return は硬い。go back なら「向こうへ戻る」、come back なら「こちらへ戻る」。日本語の「戻る」は方向が無いが、英語は come か go で、どちら向きの戻りか言う。", category: 'reaction', month: '2026-10' },
    { daySlot: 21, japanese: 'ちょっと外出てくる', english: [
        "stepping out",
        "I'm stepping out for a bit",
        "I'm stepping out for a bit, back in ten",
        "I'm stepping out. ten minutes. I need air that hasn't been in this room all day. I'll walk to the corner and back and look at a tree, and then I'll come back and be a person again. ten minutes. maybe fifteen. the tree's nice."
    ], context: "「外出てくる」は step out。step は「一歩」で、out が「外へ」。「ちょっと」の感じが step に入っている。go out だと「出かける」で長い。日本語の「ちょっと」を英語は動詞の選択で言う。step は小さく、head は普通、go は長い。", category: 'filler', month: '2026-10' },
    { daySlot: 21, japanese: '上がって', english: [
        "come on up",
        "come on up, door's open",
        "come on up, door's open, I'm on the third floor",
        "come on up. the door's open. I'd come down but I've got something on the stove and if I leave it, we'll both be eating something worse. third floor. the stairs are on your left. ignore the elevator. the elevator has opinions."
    ], context: "「上がって」は come up。up が「上へ」。日本の家の「上がる」も、階段を上がるのも、英語では同じ come up。on を挟んで come on up にすると、誘いが柔らかくなる。日本語の「上がる」一語を、英語は come + up で組む。", category: 'request', month: '2026-10' },
    { daySlot: 21, japanese: '通してください', english: [
        "let me through",
        "excuse me, let me through",
        "excuse me, can I get through, my stop's next",
        "let me through. please. I've been saying excuse me at a volume that doesn't work and I'm now saying it at a volume that does. my stop is next. the doors will open and close in about four seconds and I intend to be on the other side of them."
    ], context: "「通す」は let through。through が「突き抜けて」。let me through、get through、go through。日本語の「通る」を英語は動詞 + through で言う。動詞が変われば、頼みなのか自分の動きなのかが変わる。", category: 'request', month: '2026-10' },
    { daySlot: 21, japanese: 'ついてきて', english: [
        "follow me",
        "just follow me",
        "just follow me, it's easier than explaining",
        "follow me. I could explain it. left at the thing, right at the other thing, past the place that used to be a bank. or you could just walk behind me and we'll be there in four minutes. walk behind me. talking takes longer."
    ], context: "「ついてくる」は follow。along を足して come along だと「一緒に来る」。follow me は「後ろを」、come along は「並んで」。日本語の「ついてくる」は一語だが、英語は後ろか横かで動詞が変わる。方向の語が動きの質を決める。", category: 'request', month: '2026-10' },

    // ── Day 22 ── have で状況を言う。「会議がある」「風邪ひいてる」「ちょっと見る」を、全部 have で持つ
    { daySlot: 22, japanese: '会議ある', english: [
        "I have a meeting",
        "I've got a meeting",
        "I've got a meeting at two, but I'm free after",
        "I've got a meeting. at two. it's the kind of meeting that could have been an email, but someone decided it should be a room, so now it's a room, and I'm in it, and you're not, which I think makes you the winner here."
    ], context: "「会議がある」は I have a meeting。there's a meeting だと存在文になる。自分の予定は have で「持っている」と言う。日本語の「ある」を英語は have に変える、その一番よく出る形。予定、用事、約束、全部 have。", category: 'reaction', month: '2026-10' },
    { daySlot: 22, japanese: '風邪ひいてる', english: [
        "I have a cold",
        "I've got a cold",
        "I've got a cold, so I'll keep my distance",
        "I've got a cold. I'll stay over here. I know it's just a cold, but the last time I said just a cold, three people had it by Friday, and one of them still brings it up. so I'll wave from here. this is my wave."
    ], context: "「風邪ひいてる」は have a cold。catch a cold は「ひく」瞬間で、have a cold は「ひいている」状態。日本語の「ひいてる」を英語は have で持つ。病気は have。頭痛も have a headache。体の状態を持ち物として言う。", category: 'reaction', month: '2026-10' },
    { daySlot: 22, japanese: 'ちょっと見せて', english: [
        "let me have a look",
        "let me have a look at that",
        "let me have a look at that, I might know what it is",
        "let me have a look. I'm not saying I can fix it. I'm saying I've seen a lot of things that look like that, and some of them I fixed, and some of them I made worse, and I'd like to find out which kind this is. hand it over."
    ], context: "「見る」を have a look と言う。look だけでも通じるが、have a look は「ちょっと見る」の軽さがある。動詞を名詞にして have で持つ型。have a seat、have a try、have a think。日本語の「ちょっと〜する」を英語は have a + 名詞で言う。", category: 'request', month: '2026-10' },
    { daySlot: 22, japanese: '時間ない', english: [
        "I don't have time",
        "I don't have time for this",
        "I don't have time for this right now, can it wait?",
        "I don't have time. not today. today is full. today was full yesterday. if you'd asked last week, maybe. but you're asking now, and now is the middle of three things, and none of them are yours. tomorrow. ask tomorrow."
    ], context: "「時間ない」は I don't have time。there's no time は状況、I don't have time は自分の持ち分。同じ「ない」でも、主語を自分にするか状況にするかで動詞が変わる。時間を持ち物として言う、が have の骨格。", category: 'shutdown', month: '2026-10' },
    { daySlot: 22, japanese: '楽しかった', english: [
        "had a good time",
        "I had a great time",
        "I had a great time, thanks for having me",
        "I had a great time. I mean it. I usually say that and mean half of it. this time I mean the whole thing. the food, the people, the part where nobody talked about work for three hours. I didn't know that was possible. it's possible."
    ], context: "「楽しかった」は have a good time。it was fun とも言えるが、had a good time は「自分がその時間を持った」の形。時間を持ち物として言う。日本語の「楽しかった」は形容詞だが、英語は have + 名詞で経験を言う。", category: 'reaction', month: '2026-10' },
    { daySlot: 22, japanese: 'ちょっと座って', english: [
        "have a seat",
        "have a seat, please",
        "have a seat, this might take a minute",
        "have a seat. it's not bad news. I'm saying that first because your face just did the thing. it's not bad. it's just long, and long is easier sitting down, and I'd like you to be comfortable while I take a minute to get to the point."
    ], context: "「座って」は have a seat。sit down は命令に近く、have a seat は招く言い方。動詞を名詞にして have で持たせると、命令が招待に変わる。日本語の「どうぞ座って」の「どうぞ」を、英語は have a が担う。", category: 'request', month: '2026-10' },
    { daySlot: 22, japanese: '用事ある', english: [
        "I have plans",
        "I've got plans",
        "I've got plans tonight, but tomorrow's open",
        "I've got plans. I'm not going to say what. it's nothing exciting. it might be nothing at all. but I said I'd do it, and I've been the person who cancels before, and I'm trying to be the other person now. tomorrow's open."
    ], context: "「用事ある」は I have plans。plans は複数で、具体的な予定を持っている。I'm busy より「先約がある」の断り方として優しい。日本語の「用事」を英語は plans で受け、have で持つ。断る理由を持ち物にする。", category: 'shutdown', month: '2026-10' },
    { daySlot: 22, japanese: 'ちょっと考えてみる', english: [
        "let me have a think",
        "let me have a think about it",
        "let me have a think about it over the weekend",
        "let me have a think. a proper one. not the kind where I say I'll think and then don't. the kind where I sit with it and turn it over and see what falls out. the weekend. I'll come back Monday with something. probably a question."
    ], context: "「考えてみる」は have a think。英国寄りの言い方で、米語では think about it。動詞を名詞にして have で持つと、「ちょっと」が入る。think だと考える動作、have a think だと考える時間を持つ。日本語の「みる」が have に化ける。", category: 'request', month: '2026-10' },
    { daySlot: 22, japanese: '何か問題でも？', english: [
        "you have a problem with that?",
        "do you have a problem with that?",
        "do you have a problem with that, because you've got a face on",
        "do you have a problem with that? I'm asking because you haven't said anything, and you're usually the first to say something, and the not saying is louder than the saying would be. so. is there a problem. say the problem."
    ], context: "「問題でも?」は have a problem。there a problem? は状況、you have a problem? は相手の持ち物。相手の不満を「持っているか」と聞く。日本語の「問題でも」を英語は have で相手に持たせて問う。詰める言い方。", category: 'suggestion', month: '2026-10' },
    { daySlot: 22, japanese: 'ちょっと試してみる', english: [
        "have a go",
        "let me have a go",
        "let me have a go at it, what's the worst that could happen",
        "let me have a go. I've watched you do it four times. I've got the general shape of it. I'll probably get it wrong, but I'll get it wrong in a way that teaches me something, which is better than watching you get it right for a fifth time."
    ], context: "「試す」は have a go、have a try。try だけでもいいが、have a go は「一回やらせて」の軽さ。動詞を名詞にして have で持つ型の、もう一つ。日本語の「みる」を英語は have a + 名詞で、一回分の動作として切り出す。", category: 'request', month: '2026-10' },

    // ── Day 23 ── 「〜そう」。looks / sounds / seems / I bet で、見た目・聞いた話・推測を分ける
    { daySlot: 23, japanese: 'おいしそう', english: [
        "looks good",
        "that looks amazing",
        "that looks amazing, what is it?",
        "that looks amazing. I don't know what it is. I don't need to know what it is. it has a color and a shine and a smell that's reaching me from across the room, and my body has already decided. my body decided before my brain finished the sentence."
    ], context: "「おいしそう」は looks good。目で見て「そう」なら look。seems delicious とは言わない。日本語の「そう」は目・耳・推測を区別しないが、英語は感覚器官で動詞が変わる。見た目は look。", category: 'reaction', month: '2026-10' },
    { daySlot: 23, japanese: '楽しそう', english: [
        "sounds fun",
        "that sounds fun",
        "that sounds like fun, count me in",
        "that sounds fun. I haven't done anything that sounds fun in a while. I've done things that sound responsible. things that sound productive. this sounds fun, and I'd forgotten that was a category. count me in. what do I bring."
    ], context: "話を聞いて「そう」なら sound。sounds fun で「聞いた感じ楽しそう」。looks fun だと写真や様子を見て。日本語の「そう」を英語は、目なら look、耳なら sound と分ける。誘いへの返事は、話を聞いているので sound。", category: 'reaction', month: '2026-10' },
    { daySlot: 23, japanese: '疲れてそう', english: [
        "you look tired",
        "you look exhausted",
        "you look exhausted, when did you last sleep?",
        "you look tired. not regular tired. the other tired. the tired where your eyes are open but the person behind them left an hour ago. when did you sleep. and I mean sleep, not lie down with your phone. actual sleep."
    ], context: "人の様子は look。you look tired で「疲れて見える」。you seem tired だと「なんとなくそう感じる」で、根拠が薄い。look は見た目の証拠がある。日本語の「そう」は一つだが、英語は証拠の種類で look と seem を分ける。", category: 'reaction', month: '2026-10' },
    { daySlot: 23, japanese: 'なんか変そう', english: [
        "seems off",
        "something seems off",
        "something seems off about this, I can't put my finger on it",
        "something seems off. I can't say what. the numbers add up and the story makes sense and everyone's smiling, and that's the problem. everything's fine in a way that's too fine. I've seen too fine before. too fine is the thing before the thing."
    ], context: "根拠がはっきりしない「そう」は seem。seems off で「なんかおかしい気がする」。looks off だと見た目に理由がある。seem は印象、look は視覚、sound は聴覚。日本語の「なんか〜そう」の「なんか」が seem に入っている。", category: 'opinion', month: '2026-10' },
    { daySlot: 23, japanese: '絶対怒ってるよ', english: [
        "I bet she's mad",
        "I bet she's mad, honestly",
        "I bet she's mad, I would be",
        "I bet she's mad. I'd be mad. anyone would be mad. you don't do that to someone and get a thank you. you get quiet, and then you get a message a week later that starts with hey, and the hey is not friendly. I bet the hey is coming."
    ], context: "推測の「そう」は I bet。「賭けてもいい」で確信の推測。probably より口語で強い。she looks mad は見た目、she seems mad は印象、I bet she's mad は根拠無しの確信。日本語の「絶対〜そう」を英語は I bet で言う。", category: 'opinion', month: '2026-10' },
    { daySlot: 23, japanese: '雨降りそう', english: [
        "looks like rain",
        "it looks like rain",
        "it looks like rain, we should go now",
        "it looks like rain. the sky's doing the thing. the grey that's not clouds yet but is thinking about it. the birds have gone somewhere. birds know. we've got maybe twenty minutes. I'd rather use them walking than standing here debating the sky."
    ], context: "「降りそう」は looks like rain。look like + 名詞で「〜になりそうに見える」。it looks like it's going to rain の短い形。空を見て言うので look。日本語の「そう」を英語は look like で受け、後ろに名詞を置く。", category: 'reaction', month: '2026-10' },
    { daySlot: 23, japanese: '高そう', english: [
        "looks expensive",
        "that looks expensive",
        "that looks expensive, where did you get it?",
        "that looks expensive. I'm not asking how much. I'm not that person. I'm just observing that it has the look of a thing that cost more than it needed to, and observing that you're wearing it like it didn't. which means it did."
    ], context: "値段も見た目で判断するので look。looks expensive で「高そうに見える」。seems expensive だと根拠が薄く、sounds expensive だと値段を聞いた後。同じ「高そう」でも、何で判断したかで動詞が変わる。", category: 'reaction', month: '2026-10' },
    { daySlot: 23, japanese: '大変そうだね', english: [
        "sounds rough",
        "that sounds rough",
        "that sounds rough, I'm sorry, anything I can do?",
        "that sounds rough. I'm not going to say I understand, because I don't, I haven't been through that. but I'm here, and I've got time, and if you want to talk or not talk, both are fine. I'm good at not talking. ask anyone."
    ], context: "話を聞いて「大変そう」は sounds rough。相手の話への相槌はだいたい sound。looks rough だと相手の状態を見て言う。共感の相槌で、耳から入った話には sound。日本語の「そうだね」の相槌を、英語は sound が担う。", category: 'reaction', month: '2026-10' },
    { daySlot: 23, japanese: 'うまくいきそう', english: [
        "looks promising",
        "it's looking good",
        "it's looking good so far, fingers crossed",
        "it's looking good. so far. I'm saying so far because I've said it's looking good before and then it stopped looking good very quickly. but right now, this minute, the numbers are right and nobody's called, and that's as good as it gets."
    ], context: "進み具合は look。it's looking good で「いい感じに進んでる」。進行形にすると「今のところ」が入る。seems to be going well でもいいが長い。日本語の「いきそう」を英語は look で、進行形で今の様子として言う。", category: 'opinion', month: '2026-10' },
    { daySlot: 23, japanese: 'あの人、いい人そう', english: [
        "she seems nice",
        "she seems really nice",
        "she seems really nice, I only talked to her for a minute though",
        "she seems nice. I talked to her for a minute. a minute's not a lot. but in that minute she asked me a question and then listened to the answer, which is more than most people do in an hour. seems nice. I'll go with seems."
    ], context: "人柄は seem。she seems nice で「いい人に思える」。looks nice だと見た目が良い、になる。人柄は目で見えないので seem。日本語の「いい人そう」を英語は seem で言い、look にすると意味がずれる。証拠の種類が動詞を決める。", category: 'opinion', month: '2026-10' },

    // ── Day 24 ── 疑問詞+to。「どうすればいいか」「何を言えばいいか」を、節にせず短く言う
    { daySlot: 24, japanese: 'どうすればいいか分からない', english: [
        "I don't know what to do",
        "I honestly don't know what to do",
        "I honestly don't know what to do about it anymore",
        "I don't know what to do. I've tried the things. the obvious things, the less obvious things, the thing my mother suggested. none of them worked. I'm out of things. I'm standing here with no things, asking if you have any."
    ], context: "「どうすればいいか」は what to do。what I should do の短い形で、疑問詞の後ろに to 不定詞。主語と助動詞を落とせる。日本語の「〜すればいいか」を英語は疑問詞 + to で言い、節を作らない。短くて口語的。", category: 'reaction', month: '2026-10' },
    { daySlot: 24, japanese: '何て言えばいいか', english: [
        "I don't know what to say",
        "I don't know what to say to that",
        "I don't know what to say to that, give me a second",
        "I don't know what to say. that's not a figure of speech. I'm looking for words and the shelf is empty. give me a second. the words will come. they always come. they just come late, and by then the moment's moved on."
    ], context: "「何て言えば」は what to say。what should I say の短縮。疑問詞 + to で「〜すべきか」を言う。日本語の「〜すればいいか」の「いいか」は英語では to に畳まれている。should が消えて to だけが残る。", category: 'reaction', month: '2026-10' },
    { daySlot: 24, japanese: 'やり方教えて', english: [
        "show me how",
        "show me how to do it",
        "can you show me how to do it, just once",
        "show me how. once. I'll watch, I'll write nothing down, I'll remember it wrong, and I'll ask again tomorrow. but today, once. and tomorrow, once more. and by Thursday I'll be doing it and you'll wonder when I learned. Thursday. I learned Thursday."
    ], context: "「やり方」は how to。how to do it で「どうやるか」。the way to do it より短い。疑問詞 + to が名詞の役をする。日本語の「やり方」という名詞を、英語は how to という句で言う。名詞に見えて動詞が入っている。", category: 'request', month: '2026-10' },
    { daySlot: 24, japanese: 'どこ行けばいいの？', english: [
        "where to?",
        "where do I go?",
        "where am I supposed to go, nobody told me",
        "where do I go? nobody said. I got an email with a time and a floor and no room, and the floor has twelve rooms, and eleven of them have people in them who looked at me like I was lost. I was lost. I'm still lost. where."
    ], context: "「どこ行けば」は where to go。where should I go の短縮。where to? だけでタクシーの「どちらまで?」になる。疑問詞 + to は、動詞まで落とせることがある。日本語の「どこに?」が英語では where to? と、前置詞が付いて短くなる。", category: 'suggestion', month: '2026-10' },
    { daySlot: 24, japanese: 'いつ言えばいいか迷ってる', english: [
        "not sure when to tell her",
        "I'm not sure when to tell her",
        "I'm not sure when to tell her, there's never a good time",
        "I'm not sure when to tell her. there's no good time. there's before dinner, which ruins dinner. there's after dinner, which ruins the evening. there's tomorrow, which is what I said yesterday. it's going to be a bad time whenever it is. I'll pick one."
    ], context: "「いつ言えば」は when to tell。when I should tell の短縮。疑問詞 + to は what/how/where/when/who、全部同じ型で動く。日本語の「〜すればいいか」が全部この型で言える。節を作らずに済むので、口から出やすい。", category: 'opinion', month: '2026-10' },
    { daySlot: 24, japanese: '誰に聞けばいい？', english: [
        "who to ask?",
        "who do I ask?",
        "who do I ask about this, is there a person?",
        "who do I ask? is there a person? there's usually a person. a person who knows the thing and sits somewhere and answers questions about the thing. I've asked three people and all three pointed at each other. I'm going in a circle. who."
    ], context: "「誰に聞けば」は who to ask。who should I ask の短縮。who の後ろに to を置く。日本語の「誰に」の「に」が英語では消え、who to ask で「聞くべき相手」になる。前置詞が要らないのは ask が目的語を直接取るから。", category: 'suggestion', month: '2026-10' },
    { daySlot: 24, japanese: 'どれにするか決められない', english: [
        "can't decide which",
        "I can't decide which one",
        "I can't decide which one to get, they're both good",
        "I can't decide which one. I've been standing here so long the staff think I work here. someone asked me a question. I answered it. I was right. that's how long I've been here. which one. just tell me which one. I'll buy whatever you say."
    ], context: "「どれにするか」は which to get。which one to get で「どっちを買うか」。which の後ろに名詞を挟んで to を置ける。疑問詞 + 名詞 + to の型。日本語の「どれにするか」を英語は which one to で、動詞を変えれば何にでも使える。", category: 'reaction', month: '2026-10' },
    { daySlot: 24, japanese: 'どう返せばいいか', english: [
        "how to respond",
        "I don't know how to respond",
        "I don't know how to respond to that, it came out of nowhere",
        "I don't know how to respond. the message is sitting there. it's been sitting there an hour. every reply I write sounds wrong. too much, too little, too soon, too late. at some point the not responding becomes the response. I'm close to that point."
    ], context: "「どう返せば」は how to respond。how should I respond の短縮。how to は「やり方」だけでなく「どう〜すべきか」にも使える。日本語の「どう〜すれば」を英語は how to で言う。疑問詞 + to の中で一番出番が多い。", category: 'reaction', month: '2026-10' },
    { daySlot: 24, japanese: '何から始めればいいか', english: [
        "where to start",
        "I don't know where to start",
        "I don't know where to start, it's all connected",
        "I don't know where to start. everything's connected to everything. pull one thread and three others move. there's no first thing. there's only the pile, and the pile doesn't have a corner. so I'm going to pick a spot at random and pull. that's the plan."
    ], context: "「何から始めれば」は where to start。日本語は「何から」だが、英語は where で「どこから」。始点は場所として言う。where to begin も同じ。疑問詞の選び方が日本語とずれる例で、「何」を what と訳すと外れる。", category: 'reaction', month: '2026-10' },
    { daySlot: 24, japanese: '何持ってけばいい？', english: [
        "what to bring?",
        "what should I bring?",
        "what should I bring, and don't say nothing",
        "what do I bring? and don't say nothing. nothing means something, and I'll show up with nothing and everyone else will have something, and I'll be the person with nothing. give me a thing. a real thing. wine's a thing. is wine a thing."
    ], context: "「何持ってけば」は what to bring。what should I bring の短縮。招かれたときの定番の質問。日本語の「何持ってけばいい?」の「いい?」の部分が英語では to で済む。疑問詞 + to は質問にも使える。", category: 'suggestion', month: '2026-10' },
];
