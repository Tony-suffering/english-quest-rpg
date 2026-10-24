// 俺語録 2026年10月 その5 — Day 25-31
// 骨格: 命令形をやわらげる / 数えられない名詞と量 / 仮定法の軽い形 / 副詞で温度を付ける / 前置詞の時間感覚 / 強調の do と it-cleft / 総合

import type { GorokuSeed } from './goroku-seed';

export const GOROKU_OCT_E: GorokuSeed[] = [
    // ── Day 25 ── 命令形をやわらげる。just / go ahead / why don't you / feel free で、命令を頼みや許可に変える
    { daySlot: 25, japanese: 'とりあえず座って', english: [
        "just sit",
        "just sit down for a second",
        "just sit down for a second, you're making me nervous",
        "just sit. for a second. you've been standing since you walked in and standing means you're about to leave, and I'd like you to not be about to leave for at least the length of one coffee. sit. the chair's right there. it's a good chair."
    ], context: "命令形に just を足すと「とりあえず」「いいから」になる。sit down は命令、just sit down は促し。just は「他は置いといて、これだけ」の含みで、命令の圧を下げる。日本語の「とりあえず」の役目を、英語は just が担う。", category: 'request', month: '2026-10' },
    { daySlot: 25, japanese: 'どうぞ先に', english: [
        "go ahead",
        "go ahead, you first",
        "go ahead, you first, I'm still deciding",
        "go ahead. you first. I'm still deciding and I'll be deciding for a while and there's no reason your food should wait for my indecision. order. eat. I'll catch up. I always catch up. it's the one thing I'm reliable about."
    ], context: "「どうぞ」は go ahead。命令形だが、許可の意味になる。go ahead and + 動詞で「遠慮なく〜して」。命令の形をした許可。日本語の「どうぞ」を英語は go ahead という命令文で言う、という逆転。", category: 'request', month: '2026-10' },
    { daySlot: 25, japanese: '聞いてみれば？', english: [
        "why don't you ask?",
        "why don't you just ask her?",
        "why don't you just ask her, what's the worst she can say?",
        "why don't you just ask? the worst she can say is no, and no is a word you've heard before, and you survived it. the not asking is worse. the not asking is a no you gave yourself, and you don't even get to hear her voice."
    ], context: "「〜すれば?」は why don't you。疑問の形だが、中身は提案。「なぜしないの?」ではなく「したら?」。命令を疑問文に包むと、押し付けが消える。日本語の「〜すれば?」の軽さを、英語は why don't you で作る。", category: 'suggestion', month: '2026-10' },
    { daySlot: 25, japanese: '好きに使って', english: [
        "help yourself",
        "help yourself to whatever",
        "help yourself to whatever's in the fridge, I mean it",
        "help yourself. whatever's in there. I know people say that and don't mean it. I mean it. I bought too much and I'll throw half of it out if nobody eats it, so eating it is a favor. eat the favor. the good cheese is in the back."
    ], context: "「好きに使って」は help yourself。命令形だが、許可と歓迎。feel free to も同じ。命令の形で「遠慮するな」を言う。日本語の「好きに」の自由さを、英語は yourself で「自分で取れ」と言う。命令文が一番優しくなる形。", category: 'request', month: '2026-10' },
    { daySlot: 25, japanese: '遠慮なく言って', english: [
        "feel free",
        "feel free to say so",
        "feel free to say so if it's a problem, I won't be offended",
        "feel free to say so. I'm asking for the real answer, not the polite one. the polite one is nice and I'll nod and then I'll go home not knowing. the real one might sting and I'll go home knowing. I'd rather know. say it."
    ], context: "「遠慮なく」は feel free to。命令形の feel で「自由に感じろ」、つまり「遠慮するな」。命令なのに相手を解放する。日本語の「遠慮なく」を英語は feel free と、命令文の形で言う。命令が許可になる骨格。", category: 'request', month: '2026-10' },
    { daySlot: 25, japanese: 'ちょっと待ってて', english: [
        "hang on",
        "hang on a second",
        "hang on a second, I'm almost done",
        "hang on. a second. I'm almost done, and I know I said that before, but this time almost means almost and not the other thing almost sometimes means. thirty seconds. don't go. I'm right here. one more line."
    ], context: "「待って」は wait でもいいが、hang on、hold on のほうが柔らかい。「つかまってて」の比喩で、待たせる側の申し訳なさが入る。命令形だが、wait より角が無い。日本語の「ちょっと」を英語は動詞の選択で言う。", category: 'request', month: '2026-10' },
    { daySlot: 25, japanese: '気にしないで', english: [
        "don't worry about it",
        "don't worry about it, seriously",
        "don't worry about it, seriously, it's already handled",
        "don't worry about it. I can see you worrying. you've got the forehead. put the forehead away. it's handled. it was handled before you knew there was something to handle, and you finding out doesn't un-handle it. it's fine. it's done."
    ], context: "「気にしないで」は don't worry about it。否定の命令だが、相手を楽にする。never mind は「もういい」で、突き放す感じ。don't worry は寄り添う。命令の否定形が、英語では一番よく使う慰めになる。", category: 'shutdown', month: '2026-10' },
    { daySlot: 25, japanese: 'とにかく来て', english: [
        "just come",
        "just come, okay?",
        "just come, okay, you'll be glad you did",
        "just come. don't think about it. thinking about it is how you end up not coming. you'll think of a reason, and the reason will be good, and you'll stay home with your good reason. skip the reason. come. you'll be glad. I'll make sure of it."
    ], context: "just + 命令形で「とにかく」「いいから」。just come で「理由はいいから来い」。just が「他の全部を横に置いて」の意味を持つ。日本語の「とにかく」を英語は just で言う。Day 25 の一番目と同じ骨格の、強い側。", category: 'request', month: '2026-10' },
    { daySlot: 25, japanese: '先に行ってて', english: [
        "go on ahead",
        "go on ahead without me",
        "go on ahead without me, I'll catch up in a minute",
        "go on ahead. I'll catch up. I've got one thing to do and it's a two-minute thing and there's no reason six people should stand around watching me do a two-minute thing. go. I know where you're going. I'll be there before you order."
    ], context: "「先に行ってて」は go on ahead。ahead が「先へ」で、on が「そのまま続けて」。命令だが「私を待つな」の配慮。go ahead(どうぞ)と go on ahead(先に行け)は似て非なる。副詞が一つ増えると意味が動く。", category: 'request', month: '2026-10' },
    { daySlot: 25, japanese: '無理しないで', english: [
        "take it easy",
        "take it easy, okay?",
        "take it easy, okay, there's no rush on this",
        "take it easy. I'm not saying stop. I'm saying slow. you've been going at one speed for three weeks and it's the wrong speed for a thing this long. this is a walk, not a sprint. walk. drink water. sit down sometimes. it'll still be here."
    ], context: "「無理しないで」は take it easy。命令形だが、内容は「楽にしろ」。don't overdo it とも言うが、take it easy のほうが気遣いが出る。命令文の形で相手を緩める。日本語の「無理しないで」の否定を、英語は肯定の命令で言う。", category: 'suggestion', month: '2026-10' },

    // ── Day 26 ── 数えられない名詞と量。some / a bit of / a piece of / a cup of で、量の形を作る
    { daySlot: 26, japanese: '水ちょうだい', english: [
        "some water",
        "can I get some water?",
        "can I get some water, tap is fine",
        "can I get some water? tap's fine. I don't need the bottle. I don't need the bottle with the label and the story about the mountain. I need water, in a glass, from wherever water comes from in this building. thank you."
    ], context: "水は数えられないので a water とは言わない。some water で「いくらかの水」。日本語は「水」だけで通じるが、英語は量の語が要る。some、a bit of、a glass of。数えられない名詞に、量の器を付けるのが骨格。", category: 'request', month: '2026-10' },
    { daySlot: 26, japanese: 'アドバイスある？', english: [
        "any advice?",
        "got any advice?",
        "got any advice, I'm going in blind here",
        "any advice? I'm going in without a plan. I had a plan and the plan fell apart on the way here, so now I've got the walk from the car and whatever you say in the next thirty seconds. make it good. make it something I can remember under pressure."
    ], context: "advice は数えられない。an advice とは言えず、some advice か a piece of advice。日本語の「アドバイス一つ」を英語は a piece of で数える。information、news、furniture、全部同じ。日本語では数えられる物が、英語では数えられない。", category: 'suggestion', month: '2026-10' },
    { daySlot: 26, japanese: 'ちょっと時間ある', english: [
        "a bit of time",
        "I've got a bit of time",
        "I've got a bit of time, what do you need?",
        "I've got a bit of time. not a lot. a bit. the amount of time between one thing ending and the next thing starting, which is usually nothing and today is twenty minutes. what do you need. say it fast. I'm listening fast."
    ], context: "「ちょっと」の時間は a bit of time、a little time。a time とは言わない。time は数えられないので、a bit of で量を切る。日本語の「ちょっと」を英語は a bit of で、名詞の前に置く。量を器に入れてから渡す。", category: 'reaction', month: '2026-10' },
    { daySlot: 26, japanese: 'パン一切れ', english: [
        "a slice of bread",
        "just a slice of bread",
        "just a slice of bread is fine, I'm not that hungry",
        "a slice of bread. one. I'm not that hungry. I'm the kind of hungry where you eat one thing and then decide, and the one thing should be bread, because bread doesn't commit you to anything. a slice. maybe two. we'll see how the first one goes."
    ], context: "bread は数えられない。a bread ではなく a slice of bread、a loaf of bread。パンを切り分ける単位で数える。日本語の「一切れ」を英語は a slice of で言う。paper は a sheet of、cake は a piece of。器の語が名詞ごとに決まっている。", category: 'request', month: '2026-10' },
    { daySlot: 26, japanese: '情報少なすぎ', english: [
        "not enough info",
        "there's not enough information here",
        "there's not enough information here to decide anything",
        "there's not enough information. I've read it twice. it's three sentences and a number, and the number has no unit, and the sentences are about the number. I can't decide anything from this. I can't even ask a good question from this. who wrote this."
    ], context: "information は数えられないので、few informations とは言えない。not enough information、little information。量で言う。日本語の「情報が少ない」の「少ない」を英語は not enough か little で受ける。数えられない名詞は、数ではなく量で言う。", category: 'opinion', month: '2026-10' },
    { daySlot: 26, japanese: 'コーヒー一杯', english: [
        "a cup of coffee",
        "just a cup of coffee",
        "just a cup of coffee, black, no sugar",
        "a cup of coffee. black. no sugar, no milk, no syrup, no foam, no name written on the cup. coffee, in a cup, hot. I know that's not a thing anymore. I know the menu is a wall. but somewhere on the wall there's coffee. find it for me."
    ], context: "coffee は液体なら数えられず、a cup of coffee。ただし注文では a coffee と言え、これは「一杯」の省略。日本語の「一杯」を英語は a cup of か、省略の a で言う。同じ名詞が、場面で数えられたり数えられなかったりする。", category: 'request', month: '2026-10' },
    { daySlot: 26, japanese: '宿題多い', english: [
        "a lot of homework",
        "I've got a lot of homework",
        "I've got a lot of homework tonight, so I can't come",
        "I've got a lot of homework. not many homeworks. a lot. it's a pile, not a count. it's the kind of pile where you don't know where one ends and the next begins, and that's the point, that's why it's a lot and not a number. tonight's gone."
    ], context: "homework は数えられない。many homeworks とは言わず、a lot of homework。日本語の「宿題が多い」の「多い」を英語は a lot of か much で言う。数えられる名詞なら many、数えられないなら much。a lot of はどちらにも使えるので便利。", category: 'reaction', month: '2026-10' },
    { daySlot: 26, japanese: 'ニュースある', english: [
        "some news",
        "I've got some news",
        "I've got some news, and it's good for once",
        "I've got news. good news. I'm saying good first because my face does a thing when I have news and the thing looks the same for both kinds, and I've watched people brace. don't brace. it's good. sit down anyway. it's good and it's long."
    ], context: "news は s が付いていても単数で数えられない。a news とは言わず、some news、a piece of news。日本語の「ニュースが一つ」を英語は a piece of で言う。見た目が複数形で、中身が数えられない、英語の中で一番騙される名詞。", category: 'reaction', month: '2026-10' },
    { daySlot: 26, japanese: '家具、全部売った', english: [
        "sold all the furniture",
        "I sold all the furniture",
        "I sold all the furniture, the whole apartment's empty now",
        "I sold the furniture. all of it. the apartment's empty. it echoes now. I clapped once, to hear it, and then felt strange about clapping alone in an empty room, and stopped. it's a strange kind of free. I'm sitting on the floor. the floor's fine."
    ], context: "furniture は数えられない。furnitures とは言えず、a piece of furniture で数える。机、椅子、棚は数えられるが、まとめて「家具」にした瞬間に数えられなくなる。日本語には無いこの仕組みが、英語の名詞にはある。", category: 'reaction', month: '2026-10' },
    { daySlot: 26, japanese: '運がよかった', english: [
        "got lucky",
        "I just got lucky",
        "I just got lucky, that's all, don't read into it",
        "I got lucky. that's the whole explanation. I didn't plan it, I didn't see it coming, I was standing in the right place when the thing happened. luck. a lot of it. don't build a theory around it. there's no theory. there's a place and a time and me in it."
    ], context: "luck は数えられない。a luck とは言わず、some luck、a bit of luck、a stroke of luck。日本語の「運がいい」を英語は get lucky と形容詞で言うか、have some luck と量で言う。目に見えない物は、英語ではだいたい数えられない。", category: 'reaction', month: '2026-10' },

    // ── Day 27 ── 仮定法の軽い形。I'd / if I were you / would have / wish で、現実からずらして言う
    { daySlot: 27, japanese: '俺だったらやらない', english: [
        "I wouldn't",
        "I wouldn't, personally",
        "I wouldn't do it, personally, but it's your call",
        "I wouldn't. personally. and personally is doing a lot of work in that sentence, because it's your thing, and your thing gets your rules. but you asked. and if you're asking what I'd do, standing where you're standing, I'd walk. slowly. but I'd walk."
    ], context: "「俺だったら」は仮定なので would。I wouldn't で「自分なら、しない」。I don't だと現在の習慣。仮定法は would 一語で作れる。if I were you を足すと完全形になるが、口語は I wouldn't だけで通じる。現実と仮定を助動詞で分ける。", category: 'opinion', month: '2026-10' },
    { daySlot: 27, japanese: '俺だったら聞くけどな', english: [
        "I'd ask",
        "if I were you, I'd ask",
        "if I were you, I'd just ask her straight",
        "if I were you, I'd ask. straight. no build-up, no hint, no wondering if she noticed the hint. one question. and then whatever she says, you know, and knowing is better than this, and this is what you've been doing for a month. ask."
    ], context: "if I were you は仮定法の代表。were は「もし私があなたなら」で、現実にはあり得ないので was ではなく were。口語では was も聞くが、were が基本。日本語の「俺だったら」を英語は if I were you と、be 動詞を過去にずらして言う。", category: 'suggestion', month: '2026-10' },
    { daySlot: 27, japanese: 'もっと早く知ってたら', english: [
        "if I'd known",
        "if I'd known sooner",
        "if I'd known sooner, I would have done it differently",
        "if I'd known. that's the sentence. that's the whole sentence, and it doesn't finish, because the second half is a list, and the list is long. I'd have called. I'd have gone. I'd have said the thing. if I'd known. but I didn't. so I didn't."
    ], context: "過去への仮定は had + 過去分詞。if I had known で「知っていたら」。現実は知らなかった。日本語の「知ってたら」を英語は時制を一つ過去にずらして言う。現在の仮定なら過去形、過去の仮定なら過去完了。ずらす距離で時間が決まる。", category: 'reaction', month: '2026-10' },
    { daySlot: 27, japanese: 'やってればよかった', english: [
        "I would have",
        "I would have, if I'd had the chance",
        "I would have done it if anyone had asked me",
        "I would have. nobody asked. I was right there, with time and hands and nothing to do, and nobody said a word, and I don't volunteer, because volunteering is how you end up doing everything. but I would have. if anyone had asked. anyone."
    ], context: "「やってればよかった」は would have。過去にしなかったことを、仮定で言う。should have は後悔、would have は「条件が揃えば、していた」。日本語の「〜てれば」を英語は would have で受ける。助動詞 + have で、過去の仮定。", category: 'reaction', month: '2026-10' },
    { daySlot: 27, japanese: 'もっと時間があればなあ', english: [
        "I wish I had more time",
        "I wish I had more time for this",
        "I wish I had more time for this, it deserves better",
        "I wish I had more time. this deserves more than I'm giving it. it deserves a week and it's getting an evening, and I know the difference, and the difference is going to show. it'll be fine. fine's not what it deserves. but fine's what there's time for."
    ], context: "「あればなあ」は I wish + 過去形。I wish I had で「持っていたらいいのに」。現実は持っていない。願望を過去形で言うのが仮定法。日本語の「なあ」の嘆きを、英語は wish と時制のずれで作る。", category: 'reaction', month: '2026-10' },
    { daySlot: 27, japanese: '言わなきゃよかった', english: [
        "I wish I hadn't said that",
        "I wish I hadn't said that",
        "I wish I hadn't said that, it came out wrong",
        "I wish I hadn't said it. it was true, but true isn't the point. the point is her face after. I've been thinking about her face for two days. I could have not said it. the not saying was right there, free, and I walked past it."
    ], context: "過去の後悔は I wish + had + 過去分詞。I wish I hadn't said で「言わなければよかった」。現実は言った。Day 7 の should have と近いが、wish は願望、should は判断。日本語の「〜なきゃよかった」を英語は wish で言うと、嘆きが出る。", category: 'reaction', month: '2026-10' },
    { daySlot: 27, japanese: 'もし雨だったら？', english: [
        "what if it rains?",
        "what if it rains, though?",
        "what if it rains, though, do we have a backup?",
        "what if it rains? I'm not being negative. I'm being the person who checked the forecast, and the forecast has a cloud with lines under it, and I've been to enough outdoor things to know what the lines mean. is there a roof. anywhere. a tent. a big tree."
    ], context: "「もし〜だったら?」は what if。what if it rains? で「雨だったらどうする?」。動詞は現在形でいい。仮定法の中で一番軽い形で、if の前に what を置くだけ。日本語の「〜だったら?」を英語は what if で言う。", category: 'suggestion', month: '2026-10' },
    { daySlot: 27, japanese: '断ってもよかったのに', english: [
        "you could have said no",
        "you could have just said no",
        "you could have just said no, nobody would have minded",
        "you could have said no. it was an option. it was on the table, next to yes, the same size. nobody would have blinked. but you said yes, and now you're here, doing the thing, with the face of someone who wanted to say no. next time. no's right there."
    ], context: "「〜してもよかったのに」は could have。can の過去の仮定。you could have said no で「断ることもできた(のにしなかった)」。日本語の「のに」の含みを、英語は could have が持つ。仮定の助動詞 + have で、過去の選択肢を言う。", category: 'opinion', month: '2026-10' },
    { daySlot: 27, japanese: 'それは助かる', english: [
        "that'd help",
        "that would really help",
        "that would really help, actually, if you don't mind",
        "that would help. a lot. I didn't want to ask, because asking is a whole thing, but you offered, and offering changes the math. if you don't mind. and if you do mind, say so, and I'll pretend I never heard the offer. but you offered."
    ], context: "「助かる」は that would help。would は「もしそうしてくれたら」の仮定。that helps だと現在の事実になる。相手の申し出に対して、まだ実行されていないから would。日本語の「助かる」を英語は would で仮定の形にする。", category: 'reaction', month: '2026-10' },
    { daySlot: 27, japanese: 'もう少しで間に合ったのに', english: [
        "almost made it",
        "I almost made it",
        "I would have made it if the train hadn't stopped",
        "I would have made it. the train stopped. between stations. for nine minutes. nobody said why. the nine minutes were exactly the nine minutes I didn't have, and the doors closed on the other end while I was running at them. I saw them close. they saw me."
    ], context: "「間に合ったのに」は would have made it。条件が違えば間に合っていた。if の部分を hadn't stopped と過去完了にする。日本語の「のに」を英語は would have で言い、理由を if 節で足す。仮定法過去完了の完全形。", category: 'reaction', month: '2026-10' },

    // ── Day 28 ── 副詞で温度を付ける。kind of / pretty / way / a bit / at all で、同じ形容詞の温度を変える
    { daySlot: 28, japanese: 'なんか変', english: [
        "kind of weird",
        "it's kind of weird",
        "it's kind of weird, I can't explain it",
        "it's kind of weird. not weird weird. kind of weird. the kind where you notice and then decide you didn't notice. I noticed. I'm telling you I noticed. and now you're going to notice too, and we'll both have to live with it."
    ], context: "「なんか」は kind of。weird だけだと断定、kind of weird だと「なんとなく」。形容詞の前に置いて温度を下げる。sort of も同じ。日本語の「なんか」のぼかしを、英語は kind of で作る。副詞一つで、断定が印象に変わる。", category: 'opinion', month: '2026-10' },
    { daySlot: 28, japanese: 'けっこういい', english: [
        "pretty good",
        "it's pretty good, actually",
        "it's pretty good, actually, better than I expected",
        "it's pretty good. I went in expecting nothing. I'd heard things. the things were wrong. it's not great, I'm not saying great, but it's good in a way that doesn't need excuses, and that's rarer than great. great has excuses. this doesn't."
    ], context: "「けっこう」は pretty。pretty good で「まあまあ以上」。very good より控えめで、good より上。日本語の「けっこう」と温度が近い。pretty は「かわいい」ではなく、副詞で程度を言う。副詞で形容詞の温度を一段上げる。", category: 'opinion', month: '2026-10' },
    { daySlot: 28, japanese: '全然違う', english: [
        "way different",
        "it's way different",
        "it's way different from what I expected",
        "it's way different. I had a picture in my head, and the picture was wrong in every direction. not a little wrong. way wrong. the kind of wrong where you wonder what else you've been picturing incorrectly. probably a lot. probably everything."
    ], context: "「全然」を強調で使うなら way。way different で「まるで違う」。very different より口語で強い。way は「道」ではなく、程度の副詞。日本語の「全然〜」の肯定の強調を、英語は way で言う。否定の「全然」は not at all で、別の語。", category: 'opinion', month: '2026-10' },
    { daySlot: 28, japanese: 'ちょっと遅い', english: [
        "a bit late",
        "running a bit late",
        "I'm running a bit late, start without me",
        "I'm a bit late. a bit. not the kind of late where you order for me. the kind where you order for yourself and I show up as the food does. that's not late. that's timing. I'll be there. start. I'm close. I'm a bit close."
    ], context: "「ちょっと」は a bit、a little。a bit late で「少し遅れる」。late だけだと「遅刻」の重さ。a bit で軽くする。日本語の「ちょっと」を英語は a bit で言い、形容詞の前に置く。副詞で言い訳の温度を下げる。", category: 'reaction', month: '2026-10' },
    { daySlot: 28, japanese: '全然平気', english: [
        "not at all",
        "no, not at all",
        "no, not at all, it's no trouble",
        "not at all. I mean it. people say not at all and mean a little. I mean not at all. it's no trouble, it's on the way, it's the kind of favor that isn't a favor because it costs nothing. so stop apologizing. you've apologized four times. that's enough."
    ], context: "否定の「全然」は at all。not at all で「まったく〜ない」。否定文の最後に置いて強める。肯定の「全然いい」を英語で言うなら totally fine で、at all は使わない。日本語の「全然」は肯定と否定の両方に使えるが、英語は語が分かれる。", category: 'reaction', month: '2026-10' },
    { daySlot: 28, japanese: 'マジで疲れた', english: [
        "seriously tired",
        "I'm seriously tired",
        "I'm seriously tired, I might just go home",
        "I'm seriously tired. not dramatically. seriously. the kind of tired where the tiredness has a weight and the weight is in my shoulders and my shoulders are thinking about the couch. I might go home. I might go home and not get to the couch."
    ], context: "「マジで」は seriously、really。seriously tired で「本気で疲れた」。very tired より感情が乗る。副詞に話し手の態度が入る。日本語の「マジで」を英語は seriously で言い、形容詞の前に置いて温度を上げる。", category: 'reaction', month: '2026-10' },
    { daySlot: 28, japanese: 'めっちゃうまい', english: [
        "so good",
        "this is so good",
        "this is so good, you have to try it",
        "this is so good. I'm not exaggerating. I exaggerate, I know I do, but this is the real thing. I took a bite and stopped talking, and you know I don't stop talking. try it. take mine. I'll get another. try it before it's gone."
    ], context: "「めっちゃ」は so。so good で「すごくうまい」。very good より感情が出る。so は形容詞を強めるだけでなく、話し手の驚きを乗せる。日本語の「めっちゃ」の勢いを、英語は so で言う。短い副詞ほど温度が高い。", category: 'reaction', month: '2026-10' },
    { daySlot: 28, japanese: 'だいぶ良くなった', english: [
        "much better",
        "it's much better now",
        "it's much better now, whatever you did worked",
        "it's much better. I don't know what you did. I don't want to know. I want to enjoy the fact that the thing that was broken isn't, and not think about how, because thinking about how leads to thinking about why it broke, and I'm not ready for why."
    ], context: "「だいぶ」は much。比較級の前に置く much better で「かなり良くなった」。very better とは言えない。比較級を強めるのは much、a lot、way、far。日本語の「だいぶ」を英語は much で言い、比較級の前に置く。副詞の置き場が形容詞と比較級で違う。", category: 'opinion', month: '2026-10' },
    { daySlot: 28, japanese: 'ほぼ終わった', english: [
        "almost done",
        "I'm almost done",
        "I'm almost done, five more minutes",
        "I'm almost done. almost. the almost is honest. it's the last five percent, and the last five percent is always the longest five percent, and I know that, and I'm telling you five minutes anyway, because ten sounds like I'm not almost done. five."
    ], context: "「ほぼ」は almost。almost done で「もうすぐ終わる」。nearly も同じ。done の前に置いて、完了の一歩手前を言う。日本語の「ほぼ」を英語は almost で受ける。副詞で「まだ」を含んだ「もう」を言える。", category: 'reaction', month: '2026-10' },
    { daySlot: 28, japanese: 'ちょい高い', english: [
        "a little pricey",
        "it's a little pricey",
        "it's a little pricey, but it's worth it",
        "it's a little pricey. a little. I looked at the number and my eyebrows went up, but they came back down, which is the test. if the eyebrows stay up, walk. mine came down. so I bought it. and I'd buy it again. probably. don't quote me."
    ], context: "「ちょい」は a little。a little pricey で「ちょっと高め」。pricey は expensive の柔らかい版で、a little でさらに柔らかくする。副詞と形容詞の両方で温度を下げる。日本語の「ちょい〜」を英語は a little + 柔らかい形容詞で作る。", category: 'opinion', month: '2026-10' },

    // ── Day 29 ── 前置詞の時間感覚。in / on / at / by / until / for / since で、時間の形を選ぶ
    { daySlot: 29, japanese: '10分で戻る', english: [
        "back in ten",
        "I'll be back in ten",
        "I'll be back in ten minutes, don't touch anything",
        "I'll be back in ten. minutes, not hours. I've said ten before and it was an hour, I know, but that was a different ten. this is a real ten. don't touch anything. especially not the thing. you know the thing. ten minutes."
    ], context: "「10分で」は in ten minutes。in は「今から10分後に」。after ten minutes だと「10分経った後に」で、起点が今とは限らない。日本語の「〜で」を英語は in で言う。時間の in は「その時間が経ったら」の意味で、場所の in とは別物。", category: 'reaction', month: '2026-10' },
    { daySlot: 29, japanese: '金曜までに', english: [
        "by Friday",
        "I need it by Friday",
        "I need it by Friday, end of day is fine",
        "by Friday. end of day. I'm not asking for Monday morning, I'm asking for Friday, and Friday means before I close the laptop and forget you exist for two days. if it's Friday at eleven at night, that's still Friday. I'll be checking."
    ], context: "「までに」は by。by Friday で「金曜までのどこかで」。until Friday だと「金曜まで続く」で、締め切りにならない。日本語の「まで」と「までに」の違いが、英語では until と by。この二つを混ぜると、締め切りが消える。", category: 'request', month: '2026-10' },
    { daySlot: 29, japanese: '金曜まで休み', english: [
        "off until Friday",
        "I'm off until Friday",
        "I'm off until Friday, so don't expect a reply",
        "I'm off until Friday. off. not checking. not glancing at the phone at dinner. off. if the building's on fire, call someone else. if it's not on fire, it can wait, and it will wait, because I won't see it. Friday. I'll see everything Friday."
    ], context: "「まで」は until。off until Friday で「金曜まで休みが続く」。by Friday だと「金曜までに休む」で意味不明。until は継続の終点、by は期限。日本語の「まで」を英語は until と by に分けて言う。どちらを選ぶかで、文の意味が変わる。", category: 'reaction', month: '2026-10' },
    { daySlot: 29, japanese: '3年やってる', english: [
        "for three years",
        "I've been doing it for three years",
        "I've been doing it for three years, and I'm still not good at it",
        "I've been doing it for three years. three years and I'm still bad at it. not as bad as year one. year one was a disaster. but bad in a way that surprises people who've been told I've been doing it for three years. they expect more. so did I."
    ], context: "期間は for。for three years で「3年間」。since だと起点。for + 期間、since + 起点。日本語の「3年」は期間だが、「2023年から」は起点で、英語では for と since で分ける。現在完了とセットで使うのが基本。", category: 'reaction', month: '2026-10' },
    { daySlot: 29, japanese: '朝からずっと', english: [
        "since this morning",
        "I've been here since this morning",
        "I've been here since this morning, I haven't even eaten",
        "I've been here since this morning. since before the coffee place opened. I watched them open. I watched the first customer. I've seen three shifts change and I'm still in the same chair, and the chair has opinions about me now. I haven't eaten."
    ], context: "「朝から」は since this morning。since が起点で、今まで続いている。from this morning だと起点だけで、今も続いているかは言わない。日本語の「〜から」は起点だけだが、英語の since は「今まで」を含む。for と since で、期間と起点を分ける。", category: 'reaction', month: '2026-10' },
    { daySlot: 29, japanese: '週末に', english: [
        "on the weekend",
        "let's do it on the weekend",
        "let's do it on the weekend, when there's actually time",
        "on the weekend. not this week. this week is a wall. the weekend has a gap, a real one, Saturday afternoon, and I'm putting this in the gap. it's the only thing in the gap. that's how much I want to do it. it gets the whole gap."
    ], context: "曜日や日付は on。on the weekend、on Friday、on the 3rd。at the weekend は英国式。日本語の「〜に」は全部同じだが、英語は日なら on、時刻なら at、月や年なら in。時間の大きさで前置詞が変わる。日は on。", category: 'suggestion', month: '2026-10' },
    { daySlot: 29, japanese: '5時に', english: [
        "at five",
        "let's meet at five",
        "let's meet at five, the usual place",
        "at five. the usual place. the one with the good chairs and the bad coffee. you'll be late. you're always late. so I'll be there at five and you'll be there at five fifteen and we'll both call it five and move on with our lives. five."
    ], context: "時刻は at。at five、at noon、at midnight。時刻は点なので、点の前置詞 at。日本語の「5時に」の「に」を英語は at で言う。on five とは言わない。on は日、at は時刻。時間の粒度で前置詞が決まる、その一番小さい単位。", category: 'suggestion', month: '2026-10' },
    { daySlot: 29, japanese: '来年に', english: [
        "next year",
        "maybe next year",
        "maybe next year, when things calm down",
        "next year. I say that every year. next year, when things calm down. things don't calm down. things have never once calmed down. but I keep saying it, because saying it lets me not do it now, and not doing it now is the whole point. next year."
    ], context: "next、last、this が付くと前置詞が消える。next year、last week、this morning。in next year とは言わない。日本語の「に」が英語では消える場面。前置詞が要る時と要らない時があり、next/last/this が付いたら要らない、が一つの目安。", category: 'suggestion', month: '2026-10' },
    { daySlot: 29, japanese: '10月中に', english: [
        "in October",
        "sometime in October",
        "sometime in October, I'll let you know the date",
        "in October. sometime. I don't have a date. I have a month, and the month is October, and the date is somewhere in it, hiding, and I'll find it and tell you, but it's in October. that's the promise. the month. not the day. the month."
    ], context: "月は in。in October、in 2026、in the morning。幅のある時間は in。日本語の「10月中に」の「中に」が英語の in と近い。時刻は at、日は on、月と年は in。大きさの順に at → on → in と広がる。", category: 'suggestion', month: '2026-10' },
    { daySlot: 29, japanese: '朝のうちに', english: [
        "in the morning",
        "let's do it in the morning",
        "let's do it in the morning, before it gets busy",
        "in the morning. before the phones start. there's an hour, seven to eight, when the building's quiet and nobody wants anything, and that's the hour. after that it's noise until dark. seven. bring coffee. I'll bring the thing."
    ], context: "「朝のうちに」は in the morning。朝は幅があるので in。at night だけは例外で at。in the afternoon、in the evening、at night。日本語の「〜のうちに」を英語は in で言い、幅のある時間の中のどこかを指す。", category: 'suggestion', month: '2026-10' },

    // ── Day 30 ── 強調の do と it-cleft。「言ったって」「〜したのは俺だ」を、文の形で強める
    { daySlot: 30, japanese: 'ちゃんと言ったよ', english: [
        "I did tell you",
        "I did tell you, remember?",
        "I did tell you, on Monday, you just weren't listening",
        "I did tell you. Monday. you were looking at your phone and you said uh-huh, and uh-huh is not listening, uh-huh is a sound people make while not listening, and I knew it then and I said it anyway, and now here we are. I did tell you."
    ], context: "「ちゃんと」「本当に」の強調は do。I told you の前に did を足すと、I did tell you で「言ったんだって」になる。動詞は原形に戻る。日本語の「ちゃんと」「って」の念押しを、英語は助動詞 do で作る。否定されたことを肯定し返す形。", category: 'shutdown', month: '2026-10' },
    { daySlot: 30, japanese: '一応やったんだけど', english: [
        "I did do it",
        "I did do it, for the record",
        "I did do it, for the record, it just didn't work",
        "I did do it. for the record. I know it looks like I didn't, because the result looks like nothing happened, but something happened, I happened, I did the thing, and the thing didn't work, which is a different problem from not doing it. I did it."
    ], context: "do を強調で使うと、do do it という形が出る。変に見えるが正しい。「やった」を否定されそうな時に、did を足して念を押す。日本語の「一応」「ちゃんと」を英語は強調の do で言う。同じ動詞が二回続くのが、この骨格の見た目。", category: 'reaction', month: '2026-10' },
    { daySlot: 30, japanese: '好きだよ、ほんとに', english: [
        "I do like it",
        "no, I do like it",
        "no, I do like it, I'm just tired",
        "I do like it. I know my face said something else. my face is tired. my face has been tired since Tuesday and it says tired things about everything. but under the face, I like it. I do. the face is lying. listen to the words."
    ], context: "相手が疑っている時、I like it に do を足して I do like it。「本当に好き」。really を足すのと同じ働きを、助動詞で作る。日本語の「ほんとに」を英語は do で言える。副詞ではなく、文の骨格で強調する。", category: 'reaction', month: '2026-10' },
    { daySlot: 30, japanese: 'やったのは俺じゃない', english: [
        "it wasn't me",
        "it wasn't me who did it",
        "it wasn't me who did it, I wasn't even here",
        "it wasn't me. I know that's what everyone says. I know the person who did it is also saying it wasn't me. but I wasn't here. I have a receipt. I have a receipt from across town with a time on it, and the time is the time it happened."
    ], context: "「〜したのは俺じゃない」は it wasn't me who。it is/was + 強調したい語 + who/that で、一つの語を切り出す。it-cleft と呼ぶ。日本語の「〜のは〜だ」の構文と同じ働き。英語は it を頭に置いて、焦点を一語に絞る。", category: 'shutdown', month: '2026-10' },
    { daySlot: 30, japanese: '言い出したのはあいつ', english: [
        "it was him",
        "it was him who brought it up",
        "it was him who brought it up, not me, I was against it",
        "it was him. he brought it up. I want that on the record before anyone looks at me. I was against it. I said so. I said it twice, and the second time I said it louder, and he said it anyway, and now it's happening, and it was him."
    ], context: "it was him who で「あいつが」を切り出す。he brought it up だと平坦な報告。it was him who brought it up だと、「他の誰でもなくあいつ」になる。責任の所在を一語に絞る時、英語は it-cleft を使う。Day 11 の末尾焦点とは逆で、焦点を頭に置く。", category: 'opinion', month: '2026-10' },
    { daySlot: 30, japanese: '問題は金じゃなくて時間', english: [
        "it's not the money, it's the time",
        "it's not the money I'm worried about, it's the time",
        "it's not the money I'm worried about, it's the time, we don't have it",
        "it's not the money. we can find money. money's a phone call and a favor. it's the time. time isn't a phone call. time's just gone, and we're spending what's left of it talking about money, which is the one thing we have. it's the time."
    ], context: "it's not X, it's Y で「XじゃなくてY」。it-cleft の否定版。焦点を一つ否定して、もう一つに置く。日本語の「〜じゃなくて〜」を英語は it's not ... it's で言う。短い文を二つ並べるだけで、対比が立つ。", category: 'opinion', month: '2026-10' },
    { daySlot: 30, japanese: 'だから言ったんだよ', english: [
        "that's why I said it",
        "that's exactly why I said it",
        "that's exactly why I said it, and nobody listened",
        "that's why I said it. exactly this. this moment, this problem, this face you're making. I saw it coming and I said it and everyone nodded and nothing changed, and now it's here, and I'm not going to say I told you so. I'm going to say that's why."
    ], context: "「だから」は that's why。that's why I said it で「そのために言った」。理由を頭に置いて焦点にする。it-cleft の仲間で、that's + 疑問詞の型。that's what、that's where、that's when。日本語の「だから」を英語は that's why で言う。", category: 'shutdown', month: '2026-10' },
    { daySlot: 30, japanese: '会ったのはここ', english: [
        "this is where we met",
        "this is where we first met",
        "this is where we first met, right at that table",
        "this is where we met. that table. it was a different table then, the old one, the one with the wobble, but that spot. you were sitting there and I was standing here and neither of us knew anything about anything. that spot. same spot."
    ], context: "場所の強調は this is where。this is where we met で「会ったのはここ」。we met here だと平坦。this is where で場所を頭に置いて焦点にする。it-cleft の場所版。日本語の「〜のはここ」を英語は this is where で言う。", category: 'reaction', month: '2026-10' },
    { daySlot: 30, japanese: '本当に困ってるんだよ', english: [
        "I really do need help",
        "I really do need help here",
        "I really do need help here, I'm not just saying it",
        "I really do need help. I'm not being dramatic. I know I'm dramatic sometimes and you've learned to take half of what I say, but take all of this one. I need help. the real kind. the kind where someone shows up. can you show up."
    ], context: "really と do を重ねると、強調が二段になる。I really do need help で「本当に本当に」。副詞と助動詞の両方で押す。日本語の「本当に〜んだよ」の「んだよ」の念押しを、英語は do が担う。really だけより重い。", category: 'request', month: '2026-10' },
    { daySlot: 30, japanese: '欲しいのはそれだけ', english: [
        "that's all I want",
        "that's all I want, honestly",
        "that's all I want, honestly, nothing more",
        "that's all I want. one thing. I'm not asking for the list. I'm asking for the top of the list, the one line, and then you can throw the rest away. one thing. and if I get it, I'll stop asking. you know I'll stop. I always stop. eventually."
    ], context: "「〜だけ」は all + 文。that's all I want で「欲しいのはそれが全部」。all が「それだけ」の意味になる。焦点を that に置いて、後ろに文を続ける。it-cleft の仲間。日本語の「だけ」を英語は all で言う、という逆転。", category: 'shutdown', month: '2026-10' },

    // ── Day 31 ── 総合。30本の骨格から10本を混ぜる。型の名前を思い出しながら口に出す
    { daySlot: 31, japanese: 'もう遅いし帰ろ', english: [
        "it's late, let's go",
        "it's getting late, let's head out",
        "it's getting late, let's head out before the trains stop",
        "it's getting late. I know it doesn't feel late. it never feels late until the trains stop, and then it feels very late, very suddenly, in a taxi that costs what dinner cost. let's head out. we can do this again. the trains can't."
    ], context: "ダミーの it(Day 1)、get の変化(Day 2)、head out(Day 21)。三つの骨格が一文に入っている。it's getting late で状況の変化、let's head out で動き。日本語の「遅いし帰ろ」を英語で言うと、骨格が三つ重なる。", category: 'suggestion', month: '2026-10' },
    { daySlot: 31, japanese: 'こないだ話してた人、来てたよ', english: [
        "that guy you mentioned was there",
        "that guy you mentioned, he was there",
        "that guy you mentioned the other day, he showed up",
        "that guy you mentioned. the one from the thing. he showed up. I didn't know it was him until he said his name, and then I did the face, the face where you've heard about someone and now they're real. he's shorter than you said. everyone's shorter than you say."
    ], context: "関係詞の省略(Day 13)と、動詞+副詞の show up(Day 21)。that guy you mentioned で名詞に文を直付けし、showed up で「現れた」。日本語の「話してた人、来てた」の二つの動詞が、英語では二つの骨格になる。", category: 'reaction', month: '2026-10' },
    { daySlot: 31, japanese: '俺だったらもっと早く言うけどな', english: [
        "I'd have said something sooner",
        "if it were me, I'd have said something sooner",
        "if it were me, I'd have said something sooner, but that's just me",
        "if it were me, I'd have said something sooner. but it's not me. it's you, and you do things your way, and your way has worked before. I'm just saying, from over here, where it's easy to say things, I'd have said it sooner. that's all."
    ], context: "仮定法(Day 27)と比較級の省略(Day 16)。if it were me で仮定、I'd have said で過去の仮定、sooner で than you did を落とした比較。三つの骨格が一文に。日本語の「俺だったらもっと早く」は、英語では時制と比較の二重の操作になる。", category: 'opinion', month: '2026-10' },
    { daySlot: 31, japanese: '髪切ったの、気づいた？', english: [
        "notice I got my hair cut?",
        "did you notice I got my hair cut?",
        "did you notice I got my hair cut, or are you just being polite",
        "did you notice? the hair. I got it cut. two days ago. you've looked at me four times since and said nothing, and I've decided that's either politeness or blindness, and I'd like to know which, because they need different responses from me."
    ], context: "have/get + O + 過去分詞(Day 3)と、疑問文の語順を変えない疑問(Day 10)。I got my hair cut で「切ってもらった」、notice で始めて助動詞を落とす口語の疑問。日本語の「髪切った」を英語で言うと、他人の手が過去分詞に出る。", category: 'suggestion', month: '2026-10' },
    { daySlot: 31, japanese: '一応確認しとくけど、金曜までだよね？', english: [
        "just checking, it's by Friday, right?",
        "just to confirm, it's due by Friday, right?",
        "just to confirm, it's due by Friday, right, not Monday?",
        "just to confirm. Friday. by Friday. I'm asking because someone said Monday in the hallway and hallways are where wrong information lives. Friday. right. good. I'm going to write Friday on my hand now so the hallway can't change it."
    ], context: "命令形の just(Day 25)、期限の by(Day 29)、付加疑問の right?(Day 10)。just to confirm で圧を下げ、by Friday で締め切り、right? で確認。三つの骨格が短い一文に収まる。日本語の「一応〜だよね?」の全部が、英語では別々の道具になる。", category: 'suggestion', month: '2026-10' },
    { daySlot: 31, japanese: '問題は誰がやるかじゃなくて、いつやるか', english: [
        "it's not who, it's when",
        "the question isn't who, it's when",
        "the question isn't who does it, it's when it gets done",
        "it's not who. we know who. it's always been who. the question is when, and when has been the question for a month, and nobody's answered it because answering it means picking a day, and picking a day means the day arrives. pick the day."
    ], context: "it's not X, it's Y(Day 30)と、末尾焦点(Day 11)。焦点を否定して置き直す型に、疑問詞を乗せる。the question isn't who, it's when。日本語の「〜じゃなくて〜」を英語は it's not ... it's で言い、最後に置いた語が一番重くなる。", category: 'opinion', month: '2026-10' },
    { daySlot: 31, japanese: 'なんか変だなって思ってたんだよね', english: [
        "I thought something was off",
        "I kind of thought something was off",
        "I kind of thought something was off, but I didn't say anything",
        "I thought something was off. kind of. not enough to say. enough to notice, not enough to say, which is the worst amount, because now it's happened and I'm the person who noticed and said nothing. I'll say it next time. I always say that too."
    ], context: "kind of の温度(Day 28)、seems off の推測(Day 23)、過去形で距離を取る(Day 6)。I kind of thought で「なんとなく思ってた」。日本語の「なんか〜って思ってた」を英語で言うと、副詞・動詞・時制の三つで温度を作る。", category: 'reaction', month: '2026-10' },
    { daySlot: 31, japanese: '時間なくて、やろうと思ってたのにできなかった', english: [
        "ran out of time",
        "I was going to, but I ran out of time",
        "I was going to do it, but I ran out of time, I'm sorry",
        "I was going to. I had it on the list. it was near the top. and then the day happened, the way days do, and by the time I got to the top of the list the day was over and the list was still there. I ran out of time. I'll do it tomorrow. I mean it this time."
    ], context: "I was going to(Day 6)と、run out of(Day 21 の動詞+副詞)。予定だったが実行していない、を過去進行の形で言い、時間切れを run out で言う。日本語の「やろうと思ってたのに」の「のに」が、英語では was going to の中に入っている。", category: 'reaction', month: '2026-10' },
    { daySlot: 31, japanese: '誰かに見てもらったほうがいいよ、それ', english: [
        "you should get that looked at",
        "you should really get that looked at",
        "you should really get that looked at, it's been weeks",
        "you should get that looked at. by someone. someone with a coat and a degree. it's been three weeks and you keep saying it's fine and it keeps not being fine, and at some point fine stops being a word and starts being a wish. get it looked at."
    ], context: "should の助言(Day 7)と、get + O + 過去分詞(Day 3)。you should get that looked at で「診てもらえ」。日本語の「見てもらったほうがいい」を英語で言うと、助動詞と使役の骨格が重なる。二つの型が一つの文で動く。", category: 'suggestion', month: '2026-10' },
    { daySlot: 31, japanese: 'まあ、そういうもんだと思って慣れるしかないよ', english: [
        "that's how it is, you get used to it",
        "that's just how it is, you get used to it",
        "that's just how it is, you get used to it eventually",
        "that's how it is. I'm not saying it's right. I'm saying it's how it is, and how it is doesn't change because we're annoyed at it. you get used to it. not happy. used to. and used to is enough to get through the week, and the week is all we've got."
    ], context: "総称の you(Day 19)、ダミーの it(Day 1)、get + 形容詞(Day 2)。that's how it is で世の中の it、you get used to it で誰でもの you と変化の get。10月の最初と最後がつながる一文。日本語の「そういうもん」を英語で言うと、骨格が三つ要る。", category: 'opinion', month: '2026-10' },
];
