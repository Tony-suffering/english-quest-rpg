// 俺語録 2026年10月 — 骨格の月 (Day 1-6)
//
// 9月まで俺語録は「日本語の口語 → 英語」で、日本語から学ぶ(/english/nihongo)と半分同じ仕事をしていた。
// 10月から役割を戻す。**1日1骨格 × 日本語10個。** 語彙ではなく構文のページ。
// 同じ型を10回、別の日本語で打つ。筋トレの名前に中身を合わせる。
//
// 骨格 = 日本語に無くて英語にはある文の組み立て方。ダミーの it、get+形容詞、物が主語、
// 前置詞で終わる文……。単語を知っていても口から出ないのは、この型が体に無いから。
//
// english は4段。[0]短い一撃 [1]態度つき [2]完全文 [3]独り言
// context は「この骨格が日本語に無い理由」だけ書く。語釈は書かない。
// g-dropping 禁止(-ing は省略しない)。PP検索に引っかからなくなるため。

import type { GorokuSeed } from './goroku-seed';

export const GOROKU_OCT_A: GorokuSeed[] = [
    // ── Day 1 ── ダミーの it。天気・時間・距離・状況。主語が無い日本語を英語はどう始めるか
    { daySlot: 1, japanese: '寒いな', english: [
        "it's cold",
        "it's freezing out",
        "it's freezing out there, where did autumn go",
        "it's freezing. I checked the weather this morning and it said mild. mild. I walked out in a t-shirt like a fool and the wind went straight through me. October is not mild. October is winter with better marketing."
    ], context: "「寒い」だけで文になる日本語に対し、英語は主語が無いと始められない。天気に主語は無いので、何も指さない it を置く。it's cold の it は誰でも何でもない。英語は「誰が?」に答える席を空けられない言語で、その席を埋める幽霊がダミーの it。", category: 'reaction', month: '2026-10' },
    { daySlot: 1, japanese: 'もう3時か', english: [
        "it's three already",
        "wait, it's three already?",
        "wait, it's already three, where did the day go",
        "it's three. I sat down at nine with a plan. I have done one thing on that plan and it was the easy one. the rest of the day apparently happened while I was answering messages about the plan."
    ], context: "時刻も同じ。日本語は「3時」で済むが、英語は it's three と主語を立てる。時間・距離・天気・明るさ、全部この it が引き受ける。it's far、it's dark、it's late。主語席を空けたまま喋れないので、空席に it を座らせる。", category: 'reaction', month: '2026-10' },
    { daySlot: 1, japanese: '遠いよ', english: [
        "it's far",
        "it's pretty far, honestly",
        "it's pretty far from here, you'd need a car",
        "it's far. not far like a long walk. far like you look at the map and the map zooms out on its own. by the time you get there you will have opinions about the bus system."
    ], context: "距離にも主語が要る。日本語の「遠い」は場所の性質を直接言うが、英語は it's far と「状況が遠い」という形にする。ここで主語を the place にすると急に硬くなる。場所を主語にせず状況を主語にする、それがこの it の働き。", category: 'opinion', month: '2026-10' },
    { daySlot: 1, japanese: '無理だって', english: [
        "it's not happening",
        "yeah, that's not happening",
        "that's not happening, not today and probably not this week",
        "it's not happening. I want to be clear that I am not saying no because I am tired, although I am tired. I am saying no because the thing you are describing requires a version of me that does not exist yet."
    ], context: "「無理」は日本語では誰の無理かを言わずに済む。英語は it's not happening と「その出来事は起きない」に変える。I can't と自分を主語にすると弱音になり、it を主語にすると事実の宣告になる。主語の選び方で温度が変わる。", category: 'shutdown', month: '2026-10' },
    { daySlot: 1, japanese: 'もう暗いね', english: [
        "it's dark already",
        "it's getting dark already",
        "it's getting dark already, the days are getting shorter",
        "it's dark at five now. I looked up from my desk and the window was black. I did not eat lunch. I did not notice the sun leave. this is what October does, it takes the afternoon while you are looking at something else."
    ], context: "明るさも it。it's dark、it's bright。日本語は「暗い」で状態だけ言うが、英語は状況を主語にした上で状態を述語に置く。it's getting dark と get を挟むと変化になる。ダミーの it は動詞の変化とも組み合わせられる。", category: 'reaction', month: '2026-10' },
    { daySlot: 1, japanese: 'ここからだと近い', english: [
        "it's close from here",
        "it's actually close from here",
        "it's actually pretty close from here, ten minutes on foot",
        "it's close. I know the address looks like another neighborhood but it's ten minutes on foot. I checked. twice. because the last time someone told me something was close I ended up on a highway."
    ], context: "「近い」も主語無しで言える日本語。英語は it's close と状況を主語にする。ここで it は場所ではなく「ここからそこまでの状況」を指している。距離の話をするとき、英語は場所ではなく間の状況を主語にする。", category: 'opinion', month: '2026-10' },
    { daySlot: 1, japanese: '静かだな', english: [
        "it's quiet",
        "it's weirdly quiet in here",
        "it's weirdly quiet in here, where is everyone",
        "it's quiet. too quiet. the kind of quiet where you check the calendar because maybe today is a holiday and nobody told you. it is not a holiday. everyone is just in a meeting you were not invited to."
    ], context: "場の雰囲気にも it。日本語は「静か」と場を直接言うが、英語は it's quiet と状況を主語にする。the room is quiet と言えなくはないが、部屋の性質になってしまう。今この場がどうか、を言うのがダミーの it の仕事。", category: 'reaction', month: '2026-10' },
    { daySlot: 1, japanese: '面倒くさいことになった', english: [
        "it got complicated",
        "yeah, it got complicated",
        "it got complicated fast, and now nobody knows who's in charge",
        "it got complicated. it started as one email. then someone replied all. then someone replied to the reply all to say please stop replying all. now there are three threads and a meeting about the threads."
    ], context: "「面倒なことになった」は何が面倒なのか言わなくていい。英語は it got complicated と「状況が」を主語にする。things got complicated でもいい。日本語が省く「状況」を、英語は it や things で名指ししてから文を始める。", category: 'reaction', month: '2026-10' },
    { daySlot: 1, japanese: 'まだ早いよ', english: [
        "it's still early",
        "come on, it's still early",
        "come on, it's still early, the night just started",
        "it's still early. I know your body is telling you it's late but your body is wrong. it's nine. nine is when people in other countries are deciding where to eat. we can stay for one more."
    ], context: "時間の早い遅いも it。日本語の「早い」は時刻にも動作にも使えるが、英語の it's early は時刻限定。you're early なら人が早く来た話。何を主語にするかで、時刻の話か人の話かが決まる。", category: 'suggestion', month: '2026-10' },
    { daySlot: 1, japanese: 'やばい状況だ', english: [
        "it's bad",
        "it's bad, I'm not going to lie",
        "it's bad, and I don't think anyone upstairs knows how bad",
        "it's bad. I say that as someone who usually says it's fine. it is not fine. the numbers are not fine, the timeline is not fine, and the person who was supposed to fix it just went on vacation."
    ], context: "「やばい状況」の「状況」を英語は it 一語で済ませる。the situation is bad と言うと説明調になる。it's bad で状況そのものを主語にすると、短くて重い。日本語の「状況」を英語は it に畳む。", category: 'reaction', month: '2026-10' },

    // ── Day 2 ── get+形容詞。「〜になる」「〜された」を全部 get で言う
    { daySlot: 2, japanese: '怒られた', english: [
        "got yelled at",
        "I got yelled at, big time",
        "I got yelled at this morning and honestly I had it coming",
        "I got yelled at. and the thing is, I saw it coming from a week away. I did the thing, I knew it was the wrong thing while I was doing it, and I still acted surprised when the consequences showed up on time."
    ], literal: 'got yelled at = 怒鳴られる状態を得た', context: "「怒られた」は受け身の一語。英語は get+過去分詞で「その状態に移った」と言う。was yelled at でも通じるが、get のほうが「起きた出来事」の感じが出る。日本語の「〜られた」を英語は get で受ける。", category: 'reaction', month: '2026-10' },
    { daySlot: 2, japanese: '慣れた', english: [
        "got used to it",
        "I got used to it, eventually",
        "I got used to it faster than I expected",
        "I got used to it. the noise, the schedule, the guy who microwaves fish. week one I was writing complaints in my head. week three I was microwaving fish. adaptation is not a virtue, it is a survival reflex."
    ], context: "「慣れる」は日本語では一語の動詞。英語に「慣れる」という動詞は無く、get used to と「慣れた状態を得る」と言う。get は「今の状態から別の状態に移った」の万能動詞で、日本語の10個の動詞が get 一つで済む。", category: 'reaction', month: '2026-10' },
    { daySlot: 2, japanese: '酔ってきた', english: [
        "getting tipsy",
        "okay, I'm getting tipsy",
        "okay, I'm getting a little tipsy, this is my last one",
        "I'm getting tipsy. not drunk. tipsy. the stage where everything is funnier than it is and I start telling people I love them. the stage before the stage I regret. I know where the line is. I am standing on it."
    ], context: "「酔う」は動詞だが、英語は get drunk、get tipsy と get+形容詞。酔った状態に移った、という言い方。日本語は状態変化を動詞に持たせるが、英語は変化の部分を get に任せて形容詞で状態を言う。", category: 'reaction', month: '2026-10' },
    { daySlot: 2, japanese: '腹減った', english: [
        "getting hungry",
        "I'm getting hungry over here",
        "I'm getting hungry, are we eating soon or what",
        "I'm getting hungry. I had a small breakfast because I thought lunch would be early. lunch was not early. lunch is currently a rumor. if this meeting goes another twenty minutes I am going to start eating the agenda."
    ], context: "「減った」は日本語では過去形だが、英語は I'm getting hungry と進行形で「今その状態に向かっている」と言える。get は瞬間ではなく移動を表すので、進行形にすると変化の途中を切り取れる。", category: 'reaction', month: '2026-10' },
    { daySlot: 2, japanese: '迷った', english: [
        "got lost",
        "I got lost, obviously",
        "I got completely lost, the map was no help",
        "I got lost. the map said turn left. there was no left. there was a wall and a man selling fruit. I asked the man. he pointed at the wall. I have been walking for forty minutes and I am now closer to where I started."
    ], context: "道に迷うは英語では lose の受け身。get lost で「失われた状態になる」。誰が失ったかは言わない。日本語の「迷う」は自分の動作だが、英語では自分が迷子という状態に落ちる。動作と状態の分け方が違う。", category: 'reaction', month: '2026-10' },
    { daySlot: 2, japanese: '寝坊した', english: [
        "overslept",
        "I overslept, don't ask",
        "I overslept and missed the first train, so I'm running late",
        "I overslept. I set three alarms. I remember turning off one. I do not remember the other two, which means the version of me that exists at six in the morning made a decision on behalf of all of us. he was wrong."
    ], context: "寝坊は get を使わない例外で、oversleep という動詞がある。ただ「遅れた」は get late ではなく be late か run late。get が効くのは「状態が変わる」場面だけで、動作そのものには使わない。この線引きが英語の get の使いどころ。", category: 'reaction', month: '2026-10' },
    { daySlot: 2, japanese: 'クビになった', english: [
        "got fired",
        "he got fired, just like that",
        "he got fired last week, nobody saw it coming",
        "he got fired. on a Tuesday. they walked him out at eleven and by noon his desk was clean. I had lunch with him the day before. we talked about his vacation plans. I do not know what to do with that information now."
    ], context: "解雇も get+過去分詞。was fired より get fired のほうが「その出来事が本人に起きた」感じが強い。英語の受け身は be と get の二種類あり、get は出来事、be は状態や結果を言う。日本語の「〜された」は両方を区別しない。", category: 'reaction', month: '2026-10' },
    { daySlot: 2, japanese: '濡れた', english: [
        "got soaked",
        "I got absolutely soaked",
        "I got absolutely soaked walking back from the station",
        "I got soaked. I looked at the sky, decided the sky was bluffing, and left the umbrella at home. the sky was not bluffing. the sky had been waiting for me specifically. my shoes are still making a sound."
    ], context: "「濡れた」は状態変化なので get wet、get soaked。日本語は「濡れる」という動詞を持つが、英語は wet や soaked という形容詞を get で得る。日本語の自動詞が、英語では get+形容詞に分解される典型。", category: 'reaction', month: '2026-10' },
    { daySlot: 2, japanese: '準備できた', english: [
        "got ready",
        "okay, I'm ready, let's go",
        "give me two minutes to get ready and then we can go",
        "I'm getting ready. I know I said five minutes twenty minutes ago. but ready is not a moment, it is a process. it involves finding keys, which involves finding the jacket, which involves remembering which jacket."
    ], context: "「準備する」は動詞だが、英語は get ready で「準備できた状態に移る」。prepare は物を準備する動詞で、自分の支度には使わない。自分の状態を変えるときは get+形容詞、が英語の癖。", category: 'request', month: '2026-10' },
    { daySlot: 2, japanese: '治った', english: [
        "got better",
        "I got better, finally",
        "I got better over the weekend, the fever broke on Saturday",
        "I got better. it took a week. a week of soup and lying down and watching the ceiling do nothing. and then Saturday morning I woke up and the ceiling was just a ceiling again. nothing dramatic. it just stopped."
    ], context: "「治る」も英語に一語の自動詞は無く、get better、get well と「良い状態を得る」と言う。recover はあるが硬い。日常の回復は get better。日本語が動詞一語で持つ変化を、英語は get と形容詞の組み合わせに割る。", category: 'reaction', month: '2026-10' },

    // ── Day 3 ── have / get + O + 過去分詞。「してもらった」「された」を動詞の後ろに畳む
    { daySlot: 3, japanese: '髪切った', english: [
        "got a haircut",
        "I got my hair cut, finally",
        "I got my hair cut yesterday, it was getting out of control",
        "I got my hair cut. I know it looks the same to you. it looks the same to everyone. but two inches came off and I feel like a different person. a lighter person. a person who can see."
    ], literal: 'got my hair cut = 髪を切られた状態にした', context: "「髪切った」は自分で切ったように聞こえるが、実際は切ってもらった。英語は I cut my hair だと自分で切った意味になるので、I got my hair cut と目的語の後ろに過去分詞を置く。誰が切ったかは言わず、切られた結果だけを言う型。", category: 'reaction', month: '2026-10' },
    { daySlot: 3, japanese: '直してもらった', english: [
        "had it fixed",
        "I had it fixed, cost a fortune",
        "I had it fixed last week, but it's already making the noise again",
        "I had it fixed. by a professional. a professional who charged me a professional amount of money and said it would never make that sound again. it is making that sound again. it is making that sound right now."
    ], context: "「直してもらった」の「もらった」を英語は had it fixed と言う。自分は直していない、直る手配をした。have+O+過去分詞は「その状態にさせた」で、頼んだ相手は言わない。日本語の「もらう」が英語では動詞の後ろの過去分詞に化ける。", category: 'reaction', month: '2026-10' },
    { daySlot: 3, japanese: '財布盗まれた', english: [
        "got my wallet stolen",
        "I got my wallet stolen, of all things",
        "I got my wallet stolen on the train, cards and everything",
        "I got my wallet stolen. I felt nothing. no bump, no tug. I got off the train and reached for it and my pocket was just a pocket. somewhere in this city a stranger knows my library card number."
    ], context: "被害も同じ型で言える。get my wallet stolen は「財布が盗まれた状態を得た」。my wallet was stolen でも通じるが、get のほうが出来事として自分に起きた感じが出る。「してもらう」と「される」が同じ型なのが英語の面白いところ。", category: 'reaction', month: '2026-10' },
    { daySlot: 3, japanese: '車、点検に出した', english: [
        "got the car checked",
        "I got the car checked, just in case",
        "I got the car checked before the trip, everything looks fine",
        "I got the car checked. they found nothing. I paid for them to find nothing. and I feel great about it, because the alternative was finding something on a mountain road with no signal and a trunk full of snacks."
    ], context: "「点検に出す」の「出す」を英語は get the car checked と言う。点検されるという結果を車に起こさせる。出す、預ける、頼む、全部この型で言える。日本語は手続きの動詞が多いが、英語は結果の過去分詞で済ませる。", category: 'reaction', month: '2026-10' },
    { daySlot: 3, japanese: '写真撮ってもらった', english: [
        "got our picture taken",
        "we got our picture taken by a stranger",
        "we got our picture taken by a nice guy who then took twelve more",
        "we got our picture taken. we asked one stranger. he took the job seriously. he crouched. he moved us into the light. he took fifteen photos and said the third one was the one. he was right. we never got his name."
    ], context: "「撮ってもらう」も have/get+O+過去分詞。we got our picture taken で、撮った人は by で足しても足さなくてもいい。日本語の「もらう」は恩の方向を含むが、英語のこの型は恩を含まず、結果が起きたことだけを言う。", category: 'reaction', month: '2026-10' },
    { daySlot: 3, japanese: '見積もり出してもらう', english: [
        "get a quote",
        "I'll get a quote first",
        "I'll get a quote from two places before I decide anything",
        "I'm getting a quote. two quotes actually. because the first guy said a number and then looked at my face to see if the number was okay. that is not how numbers work. numbers should exist before my face does."
    ], context: "「出してもらう」を英語は get a quote と目的語だけで言える。get+O+過去分詞の過去分詞が落ちた形で、「手に入れる」の get に戻っている。もらう系の日本語は、英語では get 一語で済むことが多い。", category: 'request', month: '2026-10' },
    { daySlot: 3, japanese: '歯、抜いた', english: [
        "had a tooth pulled",
        "I had a tooth pulled, it was awful",
        "I had a tooth pulled this morning so I'm on soup for a while",
        "I had a tooth pulled. the dentist said I would feel pressure. pressure. that is the word they use. it was not pressure. it was a man standing on my face with a wrench, and I paid him for it."
    ], context: "自分で抜いたわけではないので、I pulled a tooth とは言えない。had a tooth pulled で「抜かれた状態にした」。医者にしてもらう処置は全部この型。日本語は「抜いた」で済むが、英語は自分の手か他人の手かを文法で区別する。", category: 'reaction', month: '2026-10' },
    { daySlot: 3, japanese: '鍵、複製してもらった', english: [
        "got a key made",
        "I got a spare key made",
        "I got a spare key made so this never happens again",
        "I got a spare key made. I have locked myself out three times this year. three. the locksmith knows me. he waves. that is not a relationship anyone should have with a locksmith."
    ], context: "「複製してもらう」は get a key made。made は make の過去分詞で「作られた」。日本語は「複製する」と行為を言うが、英語は「鍵が作られた状態を得た」と結果を言う。動詞の後ろの過去分詞が、他人の手を表す。", category: 'reaction', month: '2026-10' },
    { daySlot: 3, japanese: '配達してもらえる？', english: [
        "can I get it delivered?",
        "can I get this delivered?",
        "can I get this delivered, or do I have to pick it up?",
        "can I get it delivered? because I looked at the size of the box and then I looked at the size of my car and then I looked at the size of my back, and none of those three things are compatible."
    ], context: "頼む形もこの型。can I get it delivered で「配達された状態にできますか」。deliver it to me より、結果だけを言うので短い。日本語の「してもらえる?」は依頼の敬語だが、英語は文法の型で依頼になる。", category: 'request', month: '2026-10' },
    { daySlot: 3, japanese: '確認してもらった', english: [
        "had it checked",
        "I had it checked by someone who knows",
        "I had it checked by a lawyer before I signed anything",
        "I had it checked. by a lawyer. a real one. because the last time I signed something without reading it I ended up paying for a gym I have never seen from the outside. never again. now everything gets read by someone who bills by the hour."
    ], context: "「確認してもらう」は had it checked。誰に頼んだかを by で足す。日本語の「もらう」は動詞に付くが、英語はその役目を過去分詞が担い、頼んだ相手は前置詞句に回る。文の骨格が「私 → 物 → 結果」の順になる。", category: 'reaction', month: '2026-10' },

    // ── Day 4 ── 物が主語。「〜すると腹立つ」「これで楽になる」を、物に動詞をやらせる
    { daySlot: 4, japanese: 'それ聞くと腹立つ', english: [
        "that pisses me off",
        "honestly, that pisses me off",
        "hearing that pisses me off every single time",
        "that pisses me off. not because it's wrong. because it's said like it's obvious. like I should have known. I did not know. nobody told me. and now the not knowing is somehow my fault."
    ], context: "日本語は「(私が)腹が立つ」で人が主語だが、英語は that pisses me off と、腹を立てさせた物が主語になる。原因を主語に、自分を目的語に置く。英語は感情の原因を主語席に座らせる言語で、日本語はそれをほとんどしない。", category: 'reaction', month: '2026-10' },
    { daySlot: 4, japanese: 'これで楽になる', english: [
        "this makes it easier",
        "this makes it so much easier",
        "this makes the whole thing so much easier, why didn't we do it before",
        "this makes it easier. I resisted it for a year. I said the old way was fine. the old way was not fine, the old way was four steps and a prayer. this is one step. I was wrong. write that down."
    ], context: "「これで楽になる」の「これで」は手段だが、英語は this を主語にして this makes it easier と言う。物が動作の主体になる。日本語なら「これを使うと楽になる」と人の動作を挟むところを、英語は物に make をやらせる。", category: 'opinion', month: '2026-10' },
    { daySlot: 4, japanese: '雨で行けなかった', english: [
        "the rain kept us home",
        "the rain kept us home all day",
        "the rain kept us home, so we never made it to the park",
        "the rain kept us home. we had a plan. sandwiches were made. and then the sky opened at nine and did not close. so we ate the sandwiches on the floor and called it a picnic. the kids bought it. I almost did."
    ], context: "「雨で」は理由だが、英語は the rain kept us home と雨が主語で、雨が私たちを家に留めた。because of the rain, we couldn't go でも言えるが、物を主語にするほうが英語らしく短い。原因を主語に、人を目的語に。", category: 'reaction', month: '2026-10' },
    { daySlot: 4, japanese: 'その曲聞くと思い出す', english: [
        "that song takes me back",
        "that song takes me right back",
        "that song takes me right back to that summer",
        "that song takes me back. two notes and I'm nineteen. bad haircut, worse car, a job I hated and friends I didn't deserve. I don't even like the song. I never liked the song. it doesn't matter. it has the keys."
    ], context: "「聞くと思い出す」は日本語では自分が思い出すが、英語は that song takes me back と曲が私を連れて行く。remind も同じ型で、it reminds me of と物が主語。記憶を呼ぶのは自分ではなく物、という発想が英語の骨格にある。", category: 'reaction', month: '2026-10' },
    { daySlot: 4, japanese: 'その一言で決めた', english: [
        "that sold me",
        "yeah, that sold me",
        "that one line sold me, I signed the next morning",
        "that sold me. one sentence. everything before it was noise, numbers, slides with arrows. and then she said one plain thing and I stopped taking notes. I did not need to think anymore. the thinking was done."
    ], context: "「決めた」は自分の動作だが、英語は that sold me と、決め手になった物が主語で私を売り落とす。convince も同じ。日本語で「私が決めた」と言うところを、英語は「それが私を動かした」と、動かした側を主語にする。", category: 'opinion', month: '2026-10' },
    { daySlot: 4, japanese: '仕事のせいで会えなかった', english: [
        "work got in the way",
        "work got in the way again",
        "work got in the way again, I'm sorry, I owe you",
        "work got in the way. I hate saying it. it sounds like an excuse because it is an excuse. but it's also true. something blew up at four and I was the only one there who knew where the fire extinguisher was."
    ], context: "「仕事のせいで」を英語は work got in the way と仕事を主語にする。仕事が道を塞いだ。人の事情を物の動作に変える。I was busy と自分を主語にすると言い訳に聞こえるが、work を主語にすると仕事が悪者になる。", category: 'reaction', month: '2026-10' },
    { daySlot: 4, japanese: 'この写真、いい感じに撮れてる', english: [
        "this photo works",
        "this photo really works",
        "this photo really works, the light is doing all the job",
        "this photo works. I don't know why. the framing is off and someone's elbow is in it. but the light is right and everyone is looking at the same thing for once. sometimes the bad photo is the good photo."
    ], context: "「撮れてる」は写真が主語のようで、実は撮った人の話。英語は this photo works と写真に動詞をやらせる。work は「機能する」で、物にも案にも人にも使う。日本語なら「うまくいく」と言うところを、英語は物が働く。", category: 'opinion', month: '2026-10' },
    { daySlot: 4, japanese: 'その値段なら買う', english: [
        "that price works for me",
        "that price works for me, deal",
        "that price works for me, where do I sign",
        "that price works. I came in ready to walk away. I had a face prepared for walking away. and then he said a number lower than the number in my head and I forgot the face. I just nodded. like a person who has never negotiated."
    ], context: "「その値段なら」は条件だが、英語は that price works for me と値段が主語。値段が私に対して機能する。if the price is that, I'll buy と条件文にするより、値段に動詞をやらせるほうが短く決まる。", category: 'opinion', month: '2026-10' },
    { daySlot: 4, japanese: 'その言い方はないだろ', english: [
        "that came out wrong",
        "that came out way wrong",
        "that came out way wrong, and you know it",
        "that came out wrong. I'm not saying the idea was wrong. the idea might be fine. but the sentence that carried it walked into the room wearing the wrong clothes and everyone is now looking at the clothes."
    ], context: "「言い方」を英語は that came out wrong と、言葉が出てきた様子を主語にする。you said it wrong と人を主語にすると責めになる。that を主語にすると、人ではなく出てきた言葉が悪かったことになり、当たりが柔らかい。", category: 'opinion', month: '2026-10' },
    { daySlot: 4, japanese: 'その案でだいぶ時間浮く', english: [
        "that saves a lot of time",
        "that saves us a ton of time",
        "that saves us a ton of time every single week",
        "that saves time. real time. not the kind of time you save and then spend on the thing that saved it. actual hours, given back, every week. I did the math twice because the first number looked like a lie."
    ], context: "「時間が浮く」は日本語では時間が主語だが、浮かせたのは案。英語は that saves us time と案が主語で、私たちに時間を節約させる。save は物が主語で「人に〜を節約させる」の型を取る。物 → 人 → 物、の順が英語の骨格。", category: 'opinion', month: '2026-10' },

    // ── Day 5 ── 前置詞で終わる文。「誰と?」「何のために?」を、前置詞を最後に残して聞く
    { daySlot: 5, japanese: '誰と行くの？', english: [
        "who with?",
        "who are you going with?",
        "who are you going with, anyone I know?",
        "who are you going with? not that it matters. it doesn't matter. I'm asking the way people ask about the weather. casually. with no stake in the answer. so. who is it."
    ], context: "「誰と」の「と」は日本語では名詞の後ろだが、英語は who ... with と前置詞が文末に残る。with whom と前に出すと堅い。話し言葉は前置詞を最後に置いて、その前に本体を並べる。日本語の助詞が英語では文末に転がる。", category: 'suggestion', month: '2026-10' },
    { daySlot: 5, japanese: '何のために？', english: [
        "what for?",
        "what's that for?",
        "what's that even for, you already have three",
        "what's it for? I'm not judging. I'm asking. because it's on the table and it's been on the table for a week and it has buttons and none of the buttons do anything I can see. so. what is it for."
    ], context: "「何のために」は for what だが、話し言葉では what for と for が後ろに来る。目的を聞くときの前置詞 for が、疑問詞から離れて文末に落ちる。日本語の「ために」と英語の for は同じ役だが、置き場所が正反対。", category: 'suggestion', month: '2026-10' },
    { daySlot: 5, japanese: '何の話？', english: [
        "what about?",
        "what's this about?",
        "what's this about, is everything okay?",
        "what's this about? because you said we need to talk, and nobody has ever said we need to talk before something good. so either tell me now or let me sit here and invent the worst version myself."
    ], context: "「何の話」の「の」を英語は about が担い、文末に来る。what is this about? が話し言葉の形。about what と前に出せなくはないが、聞き返しの短い形。日本語の助詞は名詞にくっつくが、英語の前置詞は文末で待つ。", category: 'suggestion', month: '2026-10' },
    { daySlot: 5, japanese: 'どこ出身？', english: [
        "where from?",
        "where are you from?",
        "where are you from originally, if you don't mind me asking",
        "where are you from? and I mean originally. everyone says here. nobody is from here. here is where people end up. I'm asking where you started, before here happened to you."
    ], context: "出身の from も文末。where are you from? は中学で習う形だが、これが前置詞文末の一番古い例。from where とは誰も言わない。疑問詞を頭に、前置詞を尻尾に。この形が身体に入ると、他の前置詞も同じ位置に置ける。", category: 'suggestion', month: '2026-10' },
    { daySlot: 5, japanese: '何探してんの？', english: [
        "what are you looking for?",
        "what are you looking for, exactly?",
        "what are you looking for, maybe I can help",
        "what are you looking for? you've opened that drawer four times. it's the same drawer. the contents have not changed between openings. so either tell me what it is or accept that it is not in the drawer."
    ], context: "「探す」は look for で、for が動詞とセットになっている。疑問文にすると what ... for と for が最後に残る。日本語の「探す」は一語の動詞だが、英語は look と for に割れ、割れた for が文末に落ちる。", category: 'suggestion', month: '2026-10' },
    { daySlot: 5, japanese: '誰に聞いたの？', english: [
        "who'd you hear that from?",
        "wait, who'd you hear that from?",
        "wait, who did you hear that from, because it's not public yet",
        "who did you hear that from? because I know who knows, and it's four people, and I'm one of them, and I didn't tell you. so that leaves three. and I'm going to find out which one, so you might as well say."
    ], context: "情報源の from も文末に来る。who did you hear it from? で「誰から」。日本語は「誰に」と助詞が名詞に付くが、英語は who を頭に出して from を最後に置く。文の頭と尻尾で一つの意味を作る型。", category: 'suggestion', month: '2026-10' },
    { daySlot: 5, japanese: '何に使うの？', english: [
        "what do you use it for?",
        "what do you even use it for?",
        "what do you even use it for, I've never seen you touch it",
        "what do you use it for? I have watched it sit on that shelf for two years. it has a cord. the cord has never been plugged in. it is either decorative or it is waiting, and I need to know which."
    ], context: "用途の for も同じ位置。what do you use it for? で「何に」。「使う」と「ために」を英語は use と for に分け、for を文末に置く。日本語は「何に」で一語だが、英語はその一語が文の両端に分かれる。", category: 'suggestion', month: '2026-10' },
    { daySlot: 5, japanese: '誰のこと言ってんの？', english: [
        "who are you talking about?",
        "who are you even talking about?",
        "who are you even talking about, I have no idea who that is",
        "who are you talking about? you keep saying he. he did this, he said that. there is no he. I have not met a he. if there is a he, this is the first I'm hearing of him, and I'd like a name."
    ], context: "「〜のこと」を英語は about で受け、文末に置く。who are you talking about? で「誰について話しているのか」。talk about が一組で、疑問文になると about だけ取り残される。取り残された前置詞が、英語の話し言葉の特徴。", category: 'suggestion', month: '2026-10' },
    { daySlot: 5, japanese: 'それ、何でできてんの？', english: [
        "what's it made of?",
        "what's this made of?",
        "what's this made of, it's lighter than it looks",
        "what's it made of? it weighs nothing. I picked it up expecting to use my back and my back was not needed. either it's hollow or it's made of something I've never held before. I'd like to know which."
    ], context: "材料の of も文末。what is it made of? で「何でできている」。made of が一組。日本語の「何で」は手段にも材料にも使えるが、英語は of で材料と決まる。前置詞が最後に残ることで、質問の種類が決まる。", category: 'suggestion', month: '2026-10' },
    { daySlot: 5, japanese: 'どこに住んでんの？', english: [
        "where do you live?",
        "so where do you live these days?",
        "so where do you live these days, still on the east side?",
        "where do you live? I ask because you said you'd host and then you said it's a bit of a walk from the station and then you said bring good shoes. so I'm starting to think the answer is a mountain."
    ], context: "live は前置詞を取らないので where do you live? で終わる。だが「どの辺に」と広げると where do you live around? のように前置詞が付く。動詞によって前置詞が要るか要らないかが決まり、要るなら文末に来る。この判断が骨格。", category: 'suggestion', month: '2026-10' },

    // ── Day 6 ── 進行形で柔らかく。「ちょっと聞きたいんだけど」を I was wondering で言う
    { daySlot: 6, japanese: 'ちょっと聞きたいんだけど', english: [
        "quick question",
        "I was wondering something",
        "I was wondering if I could ask you something",
        "I was wondering. and I know that's how every difficult question starts, with wondering. so let me say now that this is not that. this is a small thing. a small thing I have been wondering about for a week."
    ], literal: 'I was wondering = 気になっていた(過去進行形で距離を置く)', context: "「聞きたい」は現在だが、英語は I was wondering と過去進行形にして距離を作る。今すぐ答えを迫っていない、ずっと気になっていた、という体裁。時制を過去にずらし進行形にすることで、頼みの圧を下げる。日本語の「ちょっと」の役目を、英語は時制がやる。", category: 'request', month: '2026-10' },
    { daySlot: 6, japanese: '今ちょっと考えてるんだけど', english: [
        "I'm thinking",
        "I'm thinking about it",
        "I'm thinking about maybe moving next spring",
        "I'm thinking about it. not deciding. thinking. those are different rooms. deciding has a door that locks. thinking has a window you can look out of for months without anyone asking you to leave."
    ], context: "「考えてる」を I think と言うと意見になる。I'm thinking と進行形にすると、まだ途中で結論が無い、と伝わる。英語の進行形は動作の途中を切り取るので、決めていないことの表明になる。日本語の「〜てる」と似て非なる使い方。", category: 'opinion', month: '2026-10' },
    { daySlot: 6, japanese: '期待してたんだけど', english: [
        "I was hoping",
        "I was kind of hoping",
        "I was kind of hoping you'd say yes",
        "I was hoping. I didn't say anything, because saying it makes it real, and real things can be taken away. so I just hoped quietly, in the corner, like a reasonable adult. and now I'm telling you, which means I've given up on quiet."
    ], context: "「期待してた」を I hope と現在で言うと要求に近い。I was hoping と過去進行形にすると、「期待していたけど無理なら仕方ない」の含みが出る。時制を過去にすると、断られる余地を先に作れる。柔らかさを時制で作る英語の型。", category: 'request', month: '2026-10' },
    { daySlot: 6, japanese: 'それ、どうかなって', english: [
        "I'm not sure about that",
        "I'm not so sure about that one",
        "I'm not so sure about that one, can we look at it again",
        "I'm not sure about that. I'm not saying no. I'm saying my face did something when you said it, and I'm trying to figure out what my face knows that I don't. give me a minute with my face."
    ], context: "「どうかな」は判断を保留する言い方。英語では I'm not sure と現在形だが、この sure は状態なので進行形にしない。ここで型の境界が見える。進行形にできるのは動作(wonder, think, hope)で、状態(sure, know)は進行形にならない。", category: 'opinion', month: '2026-10' },
    { daySlot: 6, japanese: 'お願いしようと思ってたんだけど', english: [
        "I was going to ask",
        "I was actually going to ask you",
        "I was actually going to ask if you could cover Friday",
        "I was going to ask. I had the sentence ready. I practiced it in the car. and then you walked in looking like your morning had already been a week long, and the sentence went back in the drawer. but it's still in the drawer."
    ], context: "「しようと思ってた」は I was going to で言う。過去の予定を今言うことで、「今から頼む」の圧を下げる。be going to を過去にすると、予定だったが実行はまだ、という時間の隙間ができる。その隙間に相手の断る余地が入る。", category: 'request', month: '2026-10' },
    { daySlot: 6, japanese: '今それやってる最中', english: [
        "I'm on it",
        "I'm on it right now",
        "I'm on it right now, give me twenty minutes",
        "I'm on it. I know it doesn't look like I'm on it. it looks like I'm staring at a wall. but the wall is where the thinking happens. the typing comes after the wall. the wall is step one."
    ], context: "「やってる最中」は進行形の本来の使い方。I'm on it は「取り掛かっている」の決まり文句で、be+前置詞で進行を表す珍しい形。I'm doing it より短く、引き受けた感じが出る。進行形が「途中」を表す仕事は、動詞が無くてもできる。", category: 'reaction', month: '2026-10' },
    { daySlot: 6, japanese: '前から言おうと思ってたんだけど', english: [
        "I've been meaning to say",
        "I've been meaning to tell you",
        "I've been meaning to tell you this for a while",
        "I've been meaning to say this. for weeks. every time I see you I think, today. and then we talk about the weather and the moment closes. so I'm saying it now before the weather gets a chance."
    ], context: "「前から思ってた」は現在完了進行形。have been meaning to で「ずっと〜するつもりだった」。過去から今まで続いている途中の状態を、完了と進行の両方で言う。日本語は「前から」の一語で済ませる時間の幅を、英語は動詞の形で持つ。", category: 'filler', month: '2026-10' },
    { daySlot: 6, japanese: '誰か探してるんだけど', english: [
        "I'm looking for someone",
        "I'm looking for someone to help out",
        "I'm looking for someone who can help out on weekends",
        "I'm looking for someone. not desperately. I'm not desperate. I'm looking the way you look for a good coffee place, with standards and patience. but also the coffee place needs to exist by Saturday."
    ], context: "「探してる」は進行形で、探している最中。ここで I look for と現在形にすると習慣になり、変な文になる。動作の途中は進行形、が英語の鉄則。日本語の「〜てる」は習慣も途中も表せるが、英語は形で分ける。", category: 'request', month: '2026-10' },
    { daySlot: 6, japanese: 'それ、気になってたんだよね', english: [
        "I was curious about that",
        "yeah, I was curious about that too",
        "I was curious about that too, did you ever find out?",
        "I was curious about that. I didn't ask because it seemed like the kind of thing you'd tell me when you were ready. and then a month went by and you didn't, so now I'm asking, but casually. very casually."
    ], context: "「気になってた」も過去形で距離を作る。I'm curious と現在で言うと今知りたい、I was curious と過去にすると前から気になっていた、になる。時制を一つ戻すだけで、今の要求ではなく積もった関心に変わる。", category: 'filler', month: '2026-10' },
    { daySlot: 6, japanese: 'もう出るとこだった', english: [
        "I was just leaving",
        "I was just about to leave",
        "I was just about to leave, but I've got a minute",
        "I was just leaving. jacket on, keys in hand, one foot metaphorically out the door. but you're here now, and the door will still be there in five minutes. it's a very patient door."
    ], context: "「出るとこだった」は過去進行形で「その動作の途中だった」。just を足すと直前になる。was about to でも同じ。日本語の「〜とこだった」の「とこ」を、英語は進行形の途中性で表す。動作の手前を時制で切り取る型。", category: 'filler', month: '2026-10' },
];
