// 俺語録 2026年9月 その2 — Day 6-16
// 語の選び方と書き方は goroku-seed-september.ts の頭を参照。

import type { GorokuSeed } from './goroku-seed';

export const GOROKU_SEP_B: GorokuSeed[] = [
    // ── Day 6 ── 結局・要するに・つまり。話をまとめる語
    { daySlot: 6, japanese: '結局どうなったの', english: [
        "so what happened",
        "so what actually ended up happening",
        "so what ended up happening in the end?",
        "so what ended up happening. because I heard three versions of this from three people and none of them agree on the part I actually care about."
    ], context: "「結局」はend up。日本語は結末を名詞で言い、英語はend up ~ingと動詞句で言う。in the endは時間の終わり、end upは着地点。日本語の「結局」は時間と着地の両方を持つので、英語では毎回どちらかを選ぶ。", category: 'request', month: '2026-09' },
    { daySlot: 6, japanese: '要するに金がない', english: [
        "basically, no money",
        "basically it comes down to money",
        "basically what it comes down to is we don't have the money",
        "basically it comes down to money. we can talk about scope and timeline all afternoon but every branch of this conversation ends at the same wall."
    ], literal: 'come down to = 煎じ詰めるとそこに行き着く', context: "「要するに」はbasicallyかit comes down to。come down toは下りてきて最後にそこに着くという縦の動き。日本語の「要する」は要点を握る手の動き。まとめるという行為を、落下と把握で別々に言う。", category: 'opinion', month: '2026-09' },
    { daySlot: 6, japanese: 'つまりこういうこと', english: [
        "so you're saying",
        "so basically you're saying",
        "so what you're saying is that we start over?",
        "so what you're saying is we start over. I want to say that out loud before anybody agrees to anything, because it sounded much smaller when you said it."
    ], context: "「つまり」を確認に使うとso you're saying。英語は相手の発言を自分の口で言い直す型を持っていて、これが会話の基本装備。日本語は「つまり」一語で済ませられるが、英語はyou're sayingと相手を主語にして返す。", category: 'request', month: '2026-09' },
    { daySlot: 6, japanese: '話が長い', english: [
        "get to the point",
        "can you get to the point",
        "I need you to get to the point, we've got ten minutes",
        "get to the point. I'm not being rude, I'm being efficient, and in about four minutes those two things are going to look identical anyway."
    ], literal: 'get to the point = 要点に到達する', context: "「話が長い」を英語でlong storyと言うと通じない。get to the point(要点に着く)と、聞き手が話し手に移動を要求する形になる。日本語は話の長さ、英語は到達までの距離。時間と距離の差。", category: 'shutdown', month: '2026-09' },
    { daySlot: 6, japanese: '話にならない', english: [
        "this is going nowhere",
        "honestly this is going nowhere",
        "we're not getting anywhere like this, let's stop",
        "this is going nowhere. we've been circling the same three sentences for twenty minutes and neither of us has moved an inch."
    ], context: "「話にならない」は水準に達しないの意味だが、英語のgoing nowhereは進まないの意味。厳密には違うが、口論の場面ではこれが一番近い。out of the questionは論外の側。同じ日本語が場面で二つの英語に割れる。", category: 'shutdown', month: '2026-09' },
    { daySlot: 6, japanese: '話が違う', english: [
        "that's not what you said",
        "hold on, that's not what you said",
        "that's not what we agreed on, we said next week",
        "that's not what we agreed on. I have it written down. I wrote it down specifically because I had a feeling this conversation was going to happen."
    ], context: "「話が違う」の「話」は約束のこと。英語はthat's not what you saidかnot what we agreed onと、言った内容を直接指す。日本語は「話」という抽象名詞で約束を包めるが、英語は誰が何と言ったかまで開く必要がある。", category: 'shutdown', month: '2026-09' },
    { daySlot: 6, japanese: 'そういう問題じゃない', english: [
        "that's not the point",
        "that is really not the point",
        "that's not the point, the point is you didn't tell me",
        "that's not the point. you're answering a question I didn't ask, and doing it well, and I think that's on purpose."
    ], context: "「問題」をproblemと訳すと外れる。ここはpoint(要点)。日本語の「問題」は課題・要点・論点を全部持つが、英語はproblem/point/issueに割れる。that's not the problemだと困っていないの意味になり、意図が反転する。", category: 'shutdown', month: '2026-09' },
    { daySlot: 6, japanese: 'そこじゃない', english: [
        "that's not it",
        "no, that's not the part",
        "that's not the part I'm worried about",
        "that's not the part I'm worried about. you fixed the thing that was easy to see. I'm asking about the thing underneath it."
    ], context: "「そこ」は場所ではなく論点を指す。英語もthat's not itと代名詞で受けられるが、the partを足すほうが誤解が少ない。日本語は指示語の守備範囲が広く、物・場所・論点・時点を全部「そこ」で言える。", category: 'shutdown', month: '2026-09' },
    { daySlot: 6, japanese: '要は慣れ', english: [
        "it's just practice",
        "honestly it's just practice",
        "it's just practice, you do it fifty times and it stops being hard",
        "it's just practice. there's no trick, there's no secret setting, you just do the boring version enough times that your hands stop asking your brain for permission."
    ], context: "「慣れ」は名詞だが英語のpracticeは行為。get used to itだと状態。日本語は「慣れ」という結果の名詞を持つが、英語は練習という行為か、慣れた状態かに分かれる。名詞で持てるかどうかの差。", category: 'opinion', month: '2026-09' },
    { daySlot: 6, japanese: 'まとまらない', english: [
        "I can't pull it together",
        "I can't seem to pull it together",
        "I've got all the pieces, I just can't pull it together",
        "I can't pull it together. every part of this is fine on its own. the moment I try to put them in one document they start disagreeing with each other."
    ], literal: 'pull together = 引き寄せてまとめる', context: "「まとまる」は自動詞で、勝手にまとまる形が言える。英語はpull it togetherと必ず誰かが引っ張る他動詞になる。日本語は物事が自分でまとまり、英語は人がまとめる。主語の有無がそのまま出る。", category: 'reaction', month: '2026-09' },

    // ── Day 7 ── 立派・見事・大したもんだ。褒めの層
    { daySlot: 7, japanese: '立派になったな', english: [
        "you turned out well",
        "you really turned out well",
        "look at you, you turned out pretty well",
        "you turned out well. and I say that as somebody who saw the version of you that ate cereal for dinner four nights in a row."
    ], context: "「立派」は英語に一語で無い。人ならturned out well、建物ならimpressive、行いならadmirable。日本語は人にも物にも行いにも同じ語を当てられるが、英語は三つとも別語。通訳者が最初に詰まる語の代表格。", category: 'reaction', month: '2026-09' },
    { daySlot: 7, japanese: '大したもんだ', english: [
        "that's impressive",
        "honestly, that's impressive",
        "that's genuinely impressive, I couldn't have done that",
        "that's impressive. and I don't hand that word out much, so take it, because I'm not going to say it again in front of other people."
    ], context: "「大した」は否定と組むと「大したことない」で正反対になる。英語のimpressiveにはこの反転が無い。日本語は同じ語幹が肯定と否定で意味を反転させるが、英語は語ごと替える。not impressiveでは大したことないの軽さが出ない。", category: 'reaction', month: '2026-09' },
    { daySlot: 7, japanese: '見事だった', english: [
        "that was clean",
        "that was really clean work",
        "that was clean, start to finish, no wasted movement",
        "that was clean. no wasted movement, no second attempt, and you made it look like the obvious way to do it, which is the part that takes years."
    ], context: "「見事」はbeautifulやcleanで、手際の良さを言う。英語のcleanは無駄がないで汚れの反対ではない。日本語は見る事と書いて視覚、英語は清潔さで言う。同じ賛辞を視覚と衛生の語で別々に作っている。", category: 'reaction', month: '2026-09' },
    { daySlot: 7, japanese: 'さすがだね', english: [
        "of course you did",
        "of course you did, why am I even surprised",
        "of course you pulled it off, I don't know why I doubted it",
        "of course you pulled it off. I had a whole backup plan ready and I never got to use it, which is both a relief and slightly annoying."
    ], context: "「さすが」は英語に無い。期待通りという含みをof course you didで作る。日本語は一語で予想通りでしかも見事を出すが、英語は予想の部分と賞賛の部分を別々に組み立てる。", category: 'reaction', month: '2026-09' },
    { daySlot: 7, japanese: '素晴らしい出来', english: [
        "that's great work",
        "that's genuinely great work",
        "that's great work, seriously, top to bottom",
        "that's great work. and I mean actually great, not the kind of great people say when they've stopped reading halfway."
    ], context: "「素晴らしい」をwonderfulと訳すと大げさになる。口語ではgreatかniceで足りる。日本語の褒め言葉は書き言葉と話し言葉の落差が小さいが、英語はwonderful/excellentが書き言葉に寄るので、話すと浮く。", category: 'reaction', month: '2026-09' },
    { daySlot: 7, japanese: 'よくやった', english: [
        "nice work",
        "hey, nice work",
        "nice work, that can't have been easy",
        "nice work. and I know what it took, because I watched you do the boring part for three weeks before anybody else noticed there was a boring part."
    ], context: "「よくやった」は目上から目下の語だが、英語のnice workには上下が無い。good jobは相手によっては子供扱いに聞こえる。日本語は上下を語彙に埋め込むが、英語は言い方と場面で決まる。上下の情報が語に乗らない。", category: 'reaction', month: '2026-09' },
    { daySlot: 7, japanese: '助かった', english: [
        "that saved me",
        "that seriously saved me",
        "you have no idea how much that helped",
        "that saved me. I was forty minutes from having to tell everybody it wasn't going to be ready, and then it was ready."
    ], context: "「助かった」は自分が主語の自動詞。英語はyou helped meかthat saved meと、助けた側を主語にする。日本語は助けられた側だけで文が完結するが、英語は誰が助けたかを立てないと文にならない。", category: 'reaction', month: '2026-09' },
    { daySlot: 7, japanese: 'おかげさまで', english: [
        "thanks to you",
        "all thanks to you, honestly",
        "it went well, thanks in large part to you",
        "thanks to you. and I don't say that as a formality, I mean the specific thing you did on Tuesday that nobody asked you to do."
    ], context: "「おかげさま」は相手が何もしていなくても言える挨拶。英語のthanks to youは実際の貢献を指すので、挨拶として使うとずれる。日本語は感謝の形式が独立しているが、英語は感謝に必ず対象が要る。", category: 'reaction', month: '2026-09' },
    { daySlot: 7, japanese: '恐れ入ります', english: [
        "much appreciated",
        "that's much appreciated",
        "that's much appreciated, thank you for handling it",
        "much appreciated. that was not your job, it was not going to become your job, and you did it anyway."
    ], context: "「恐れ入る」は恐縮と感謝が混ざった語で、英語に対応が無い。much appreciatedが一番近いが、恐縮の部分は落ちる。日本語は感謝の中に自分を下げる動作を含められるが、英語の感謝は水平のまま。", category: 'reaction', month: '2026-09' },
    { daySlot: 7, japanese: 'とんでもないです', english: [
        "not at all",
        "no no, not at all",
        "not at all, it was nothing, seriously",
        "not at all. you would have done the same, and I'd like the record to show that I'm counting on that."
    ], context: "「とんでもない」は否定の強い語だが、謙遜で使うとnot at all。英語のnot at allは礼への返しとして定型化している。日本語は「とんでもない」が驚きと謙遜の両方に使えるが、英語は場面ごとに語が変わる。", category: 'reaction', month: '2026-09' },

    // ── Day 8 ── 面倒・億劫・気が進まない。やりたくない層
    { daySlot: 8, japanese: '面倒くさい', english: [
        "it's a hassle",
        "honestly it's just a hassle",
        "it's not hard, it's just a hassle",
        "it's not hard, it's a hassle. those are different problems and only one of them gets fixed by trying harder."
    ], context: "「面倒くさい」はa hassleかI can't be bothered。前者は物事が主語、後者は自分が主語。日本語は「面倒くさい」で両方言えるが、英語は面倒の所在を決める。物が面倒なのか、自分にやる気が無いのか。", category: 'reaction', month: '2026-09' },
    { daySlot: 8, japanese: '気が進まない', english: [
        "I'm not into it",
        "I'm honestly not into it",
        "I'm not really into it, I'll do it, but I'm not into it",
        "I'm not into it. I'll still do it. I just want it on the record that the enthusiasm you're about to see is manufactured."
    ], context: "「気が進む」は気が前に動く。英語のbe intoは中に入る。前進と侵入で方向が違う。日本語は気持ちが対象に向かって進み、英語は自分が対象の中に入る。乗り気を空間で言うのは共通だが向きが逆。", category: 'reaction', month: '2026-09' },
    { daySlot: 8, japanese: '腰が重い', english: [
        "I keep putting it off",
        "I keep putting it off for some reason",
        "I know I should do it, I just keep putting it off",
        "I keep putting it off. it takes twenty minutes. I have spent more than twenty minutes this week thinking about not doing it."
    ], literal: 'put off = 先に押しやる(先延ばす)', context: "「腰が重い」は身体、英語のput offは物を先に押す動作。日本語は自分の重さ、英語は対象の移動。同じ先延ばしを、自分が動かないことと、物を動かすことで別々に言う。", category: 'reaction', month: '2026-09' },
    { daySlot: 8, japanese: '後回しにする', english: [
        "I'll deal with it later",
        "I'll just deal with it later",
        "I'm going to deal with it later, it's not urgent",
        "I'll deal with it later. and later is doing a lot of work in that sentence, because later has historically meant never in about half of these cases."
    ], context: "「後回し」は順番の語。英語はdeal with it later(後で対処する)と時間の語。日本語は列の中の位置で言い、英語は時刻で言う。順番を空間で持てるのが日本語で、英語は時間軸に置き直す。", category: 'reaction', month: '2026-09' },
    { daySlot: 8, japanese: '明日でいいや', english: [
        "tomorrow's fine",
        "eh, tomorrow's fine",
        "it can wait, tomorrow's fine",
        "tomorrow's fine. nothing about this is time sensitive and I have exactly enough energy left to make bad decisions, so I'd rather not make them now."
    ], context: "「〜でいい」は妥協の許可。英語はthat's fineかit can wait。日本語は「いい」一語で許可と妥協と評価を出せるが、英語はfine(妥協)、good(評価)、okay(許可)に割れる。「いい」は最も訳し分けが要る語のひとつ。", category: 'reaction', month: '2026-09' },
    { daySlot: 8, japanese: '気が乗らない日もある', english: [
        "some days you're just off",
        "some days you're just off, that's all",
        "some days you're just off and there's no reason for it",
        "some days you're just off. no reason, no trigger, nothing you did wrong the night before. the machine doesn't start and you wait for tomorrow."
    ], context: "「気が乗らない」は気が乗り物に乗らないイメージ。英語のbe offは調子が外れている。日本語は乗る乗らないの二値、英語は基準からのズレ。offという小さい語が本来の状態から外れたを全部引き受けている。", category: 'opinion', month: '2026-09' },
    { daySlot: 8, japanese: 'やる気が出ない', english: [
        "I've got no motivation",
        "I've got zero motivation today",
        "I know what I need to do, I just have no motivation",
        "I've got no motivation. I know exactly what to do, the list is right there, and every time I look at it my brain goes somewhere else entirely."
    ], context: "「やる気」は英語だとmotivationだが、motivationは理由や動機の意味が強い。日本語の「やる気」は体温のような内側のエネルギー。だからI'm not feeling itのほうが近い場面も多い。名詞で持つか、感覚で言うかの差。", category: 'reaction', month: '2026-09' },
    { daySlot: 8, japanese: 'サボりたい', english: [
        "I want to skip it",
        "I really want to just skip it",
        "I want to skip it and pretend I forgot",
        "I want to skip it and pretend I forgot. I won't. but I want to, and I think acknowledging that is healthier than pretending the thought never showed up."
    ], context: "「サボる」はsabotageから来た日本語だが、意味は英語のskipやslack off。語源が英語でも意味がずれている。日本人がsabotageと言うと破壊工作になるので通じない。借用語が別の意味で定着した例。", category: 'reaction', month: '2026-09' },
    { daySlot: 8, japanese: '正直しんどい', english: [
        "honestly, it's rough",
        "honestly, it's been rough",
        "honestly it's been rough, I'm just not saying it much",
        "honestly it's been rough. I'm functioning. things are getting done. but the amount of effort it takes to look normal has gone up a lot."
    ], context: "「正直」はhonestlyだが、英語のhonestlyは本当はの前置き。日本語の「正直」は言いにくいことの合図で、英語のto be honestに近い。どちらも本音の予告だが、英語はto beと不定詞で節にする。", category: 'reaction', month: '2026-09' },
    { daySlot: 8, japanese: '限界まで頑張った', english: [
        "I gave it everything",
        "I gave it absolutely everything",
        "I gave it everything I had, it just wasn't enough",
        "I gave it everything I had. and it wasn't enough, and I've had a week to sit with that, and I think I'm okay with it now."
    ], context: "「頑張る」は英語に無い。give it everythingは全力、try my bestは努力、hang in thereは耐える。日本語の「頑張る」は努力と忍耐と応援の三つを一語で持つ。応援のガンバレに当たる英語が無いのはそのため。", category: 'reaction', month: '2026-09' },

    // ── Day 9 ── 意外・まさか・案の定。予想とのズレ
    { daySlot: 9, japanese: '意外といけた', english: [
        "that went better than expected",
        "honestly that went better than expected",
        "that actually went way better than I expected",
        "that went better than expected. I had prepared an apology in advance and I did not get to use it, which is the best kind of wasted preparation."
    ], context: "「意外と」はbetter than expected。日本語は一語だが、英語は比較級とthan expectedの二つが要る。日本語は予想を言わずに済ませ、英語は必ず予想よりと比較の相手を出す。比較の対象を省けるかどうかの差。", category: 'reaction', month: '2026-09' },
    { daySlot: 9, japanese: 'まさかと思った', english: [
        "I couldn't believe it",
        "I honestly couldn't believe it",
        "I genuinely could not believe it when I saw it",
        "I could not believe it. I read the message twice, put the phone down, picked it up, and read it a third time to make sure the first two weren't a mistake."
    ], context: "「まさか」は英語に無い。no wayは驚き、I couldn't believe itは事後の報告。日本語の「まさか」は否定の推量で、あり得ないと思う気持ちが語そのものに入っている。英語は動詞believeを否定して同じことをする。", category: 'reaction', month: '2026-09' },
    { daySlot: 9, japanese: '案の定だった', english: [
        "figures",
        "yeah, figures",
        "of course it did, I figured that would happen",
        "figures. I said this would happen, I said it out loud, and I was told I was being negative. I would like that noted."
    ], literal: 'figures = やっぱりな(計算どおりだ)', context: "「案の定」はfiguresの一語で出せる。figureは計算するの意味で、それ単独で計算通りの皮肉になる。日本語の「案の定」は案(予想)の通り。どちらも予想の的中を言うが、英語は動詞、日本語は名詞句。", category: 'reaction', month: '2026-09' },
    { daySlot: 9, japanese: '思ってたより早い', english: [
        "that was faster than I thought",
        "that was way faster than I thought",
        "that was faster than I thought it'd be, nice",
        "that was faster than I thought. either you're better at this than I assumed, or the thing was easier than it looked, and I'd rather it be the first one."
    ], context: "「思ったより」はthan I thought。ここは形が揃う珍しい例。ただし英語はthan I thought it would beまで開くほうが正確で、日本語は「思ったより」で止められる。省略できる範囲が日本語のほうが広い。", category: 'reaction', month: '2026-09' },
    { daySlot: 9, japanese: 'そんな気がしてた', english: [
        "I had a feeling",
        "yeah, I had a feeling",
        "I had a feeling that was going to happen",
        "I had a feeling. I couldn't have told you why, I had nothing concrete, but when the message came in I wasn't surprised for even a second."
    ], context: "「気がする」はhave a feeling。日本語は「気」という語が主語になって、気がするという自動詞になる。英語はIが主語でfeelingを持つ。感覚が勝手に起きるのが日本語、自分が所有するのが英語。", category: 'reaction', month: '2026-09' },
    { daySlot: 9, japanese: '嫌な予感がする', english: [
        "I've got a bad feeling",
        "I've got a really bad feeling about this",
        "I've got a bad feeling about this and I can't place why",
        "I've got a bad feeling about this. nothing has gone wrong. every indicator is green. and I have been doing this long enough to know that's exactly when to start checking things."
    ], context: "「予感」はfeelingかhunch。英語のprecognitionは超能力になってしまうので使えない。日本語は予め感じると書いて日常語だが、英語は日常の勘をfeelingという普通の語で言う。大げさな語を持たない。", category: 'reaction', month: '2026-09' },
    { daySlot: 9, japanese: 'やっぱりね', english: [
        "called it",
        "yep, called it",
        "called it, I said this would happen",
        "called it. and I'm not going to be smug about it, I'm just going to say the two words and then let everybody sit with them for a moment."
    ], literal: 'called it = 言った通りだった(宣言しておいた)', context: "「やっぱり」はcalled itかI knew it。callには予告するの意味があり、called itだけで言った通りになる。日本語の「やっぱり」は元の予想に戻る動きで、英語は予告した行為そのものを指す。", category: 'reaction', month: '2026-09' },
    { daySlot: 9, japanese: '運が良かっただけ', english: [
        "I just got lucky",
        "honestly I just got lucky",
        "I just got lucky, it could have gone either way",
        "I just got lucky. and I'd like to be humble about this but it's not humility, it's accuracy, because I can point at the exact moment where it could have gone the other way."
    ], context: "「運」はluckだが、「運が良かっただけ」の「だけ」が難しい。英語はjustで受ける。justはただ〜だけで謙遜も限定も皮肉も担う小さな語。日本語の「だけ」と守備範囲が近く、珍しく対応がいい。", category: 'opinion', month: '2026-09' },
    { daySlot: 9, japanese: '偶然だよ', english: [
        "just a coincidence",
        "it's just a coincidence, honestly",
        "it's a coincidence, there's no plan behind it",
        "it's a coincidence. I know it looks arranged. I would also think it was arranged if I were standing where you're standing. it isn't."
    ], context: "「偶然」はcoincidenceだが、英語のcoincidenceは二つの出来事が重なることに限る。「偶然会った」はran into。日本語は偶然という状態を名詞で持ち、英語は出来事の重なりか、出会いの動詞かに分かれる。", category: 'opinion', month: '2026-09' },
    { daySlot: 9, japanese: 'たまたま見つけた', english: [
        "I found it by chance",
        "I just came across it by chance",
        "I came across it completely by accident",
        "I came across it completely by accident. I was looking for something else, I was in the wrong folder, and there it was."
    ], literal: 'come across = 横切って出くわす', context: "「たまたま」はby chanceかby accident。見つけるほうはcome acrossという句動詞で、横切って出会うという移動のメタファー。日本語は偶然性を副詞で言い、英語は動詞そのものに偶然性を入れる。", category: 'reaction', month: '2026-09' },

    // ── Day 10 ── 微妙・怪しい・胡散臭い。断定を避ける層
    { daySlot: 10, japanese: '微妙だな', english: [
        "I'm not sure about that",
        "honestly I'm not sure about that",
        "it's not bad, it's just... I'm not sure about it",
        "I'm not sure about it. and I can't give you a reason, which is the annoying part, because a reason is what you'd actually be able to fix."
    ], context: "「微妙」は英語に無い。subtleは繊細の意味で、日本語の「微妙」の否定的な含みが出ない。iffyやI'm not sureが近い。日本語の「微妙」は評価を保留したまま否定を匂わせる語で、英語はこの位置に語を持たない。", category: 'opinion', month: '2026-09' },
    { daySlot: 10, japanese: 'なんか怪しい', english: [
        "something's off",
        "something about it feels off",
        "something's off about it, I just can't say what",
        "something's off. I've read it three times looking for the specific sentence that's bothering me and it's not one sentence, it's the whole tone."
    ], context: "「怪しい」はsuspiciousだが硬い。口語ではsomething's off。offという小さい語が基準からずれているを担う。日本語は怪しいという形容詞一語、英語はbe offという句。形容詞と句動詞の差。", category: 'opinion', month: '2026-09' },
    { daySlot: 10, japanese: '胡散臭い', english: [
        "that sounds shady",
        "that whole thing sounds shady",
        "that sounds shady, I wouldn't touch it",
        "that sounds shady. it might be completely legitimate. but everything about the way it's presented is designed to stop you from asking the next question."
    ], literal: 'shady = 日陰の(後ろ暗い)', context: "「胡散臭い」はshady。日陰という光のメタファーで、日本語は臭いという嗅覚。同じ不信を、光と匂いで別々に言う。英語の不信は視覚と光の語が多く、日本語は臭いが多い。感覚の担当が違う。", category: 'opinion', month: '2026-09' },
    { daySlot: 10, japanese: 'なんとも言えない', english: [
        "hard to say",
        "honestly it's hard to say",
        "it's hard to say, I'd need to see more",
        "it's hard to say. I could give you an answer right now and it would sound confident and it would be worth nothing."
    ], context: "「なんとも言えない」は主語なしで成立する。英語はit's hard to sayと形式主語itを立てる。誰にとって難しいのかを英語は空欄にできず、itという幽霊の主語を置く。判断保留の型そのものが違う。", category: 'opinion', month: '2026-09' },
    { daySlot: 10, japanese: '一概には言えない', english: [
        "it depends",
        "it really depends",
        "it depends, there's no single answer to that",
        "it depends. and I know that's the least satisfying answer available, but every version where I give you a rule instead is a version where the rule is wrong half the time."
    ], context: "「一概に」は英語に無い。it dependsで受ける。dependは吊り下がるが原義で、条件にぶら下がっているイメージ。日本語は一括りを否定し、英語は条件への依存を言う。否定と依存で別々に同じ場所へ行く。", category: 'opinion', month: '2026-09' },
    { daySlot: 10, japanese: '人によるよね', english: [
        "depends on the person",
        "it really depends on the person",
        "it depends on the person, some people love it",
        "it depends on the person. I've watched two people do the exact same thing with the exact same setup and get completely different results, so I've stopped predicting."
    ], context: "「〜による」はdepend on。日本語は「よる」だけで済むが、英語はonという前置詞が必須。depend単独では文にならない。日本語は助詞「に」で受け、英語は前置詞onで受ける。似ているようで必須度が違う。", category: 'opinion', month: '2026-09' },
    { daySlot: 10, japanese: 'どっちもどっち', english: [
        "they're both at fault",
        "honestly, they're both at fault",
        "they're both at fault, I'm not picking a side",
        "they're both at fault. I've heard both versions now and each one is convincing right up until the other person starts talking."
    ], context: "「どっちもどっち」は同じ語を二回並べるだけで成立する。英語にこの反復の型が無く、both at faultと言い換える。日本語は反復で意味を作れる。同語反復が文法として働くのは日本語の特徴。", category: 'opinion', month: '2026-09' },
    { daySlot: 10, japanese: 'まだ何とも言えない', english: [
        "too early to say",
        "it's still too early to say",
        "it's too early to say, give it a week",
        "it's too early to say. we have three days of data and two of those days were a holiday, so what we actually have is one day of data."
    ], context: "「まだ何とも」は文が途中で終わる。英語は必ずtoo early to sayと文を完成させる。日本語は言い差しで意味が伝わるが、英語は言い差しが失礼か不明瞭になる。文を終えないという型が使えない。", category: 'opinion', month: '2026-09' },
    { daySlot: 10, japanese: '好みの問題', english: [
        "it's a matter of taste",
        "honestly it's just a matter of taste",
        "it's a matter of taste, there's no right answer",
        "it's a matter of taste. which means we can argue about it forever and at the end we'll both still be right, so let's just flip a coin."
    ], context: "「好み」はtaste。味覚の語を趣味に使うのは英語も同じ。ただし日本語の「好みの問題」は議論を終わらせる決まり文句で、英語のa matter of tasteも同じ働きをする。珍しく機能まで揃っている例。", category: 'opinion', month: '2026-09' },
    { daySlot: 10, japanese: '悪くはない', english: [
        "it's not bad",
        "it's not bad, actually",
        "it's not bad, I just wouldn't go out of my way for it",
        "it's not bad. and I want to be careful here because not bad and good are different countries, and I'm standing in the first one."
    ], context: "「悪くはない」の「は」が難しい。取り立ての助詞で、悪いという評価だけを取り出して否定している。英語のnot badにはこの取り立てが無く、単なる否定。だからI just wouldn'tと後ろで含みを足す。", category: 'opinion', month: '2026-09' },

    // ── Day 11 ── 気を使う・察する・建前。相手の内側を読む層
    { daySlot: 11, japanese: '気を使わせちゃった', english: [
        "I made them feel obligated",
        "I think I made them feel obligated",
        "I think I made them feel like they had to do something",
        "I think I made them feel like they had to do something. that's the outcome I was specifically trying to avoid and I walked right into it."
    ], context: "「気を使う」は英語に無い。be considerateは思いやり、walk on eggshellsは緊張、feel obligatedは義務感。日本語は相手の心を読んで先回りする行為を一語で持つが、英語はどの側面を言うかで語が変わる。", category: 'reaction', month: '2026-09' },
    { daySlot: 11, japanese: '察してよ', english: [
        "read between the lines",
        "come on, read between the lines",
        "I'm not going to spell it out, read between the lines",
        "I'm not going to spell it out. if I say it directly it becomes a thing I said, and then it's a whole conversation, and I would rather it stayed a look."
    ], literal: 'read between the lines = 行間を読む', context: "「察する」はread between the lines。行という書き物のメタファーで、日本語の「察」は視ることが元。どちらも読み取る比喩だが、英語は文字の隙間、日本語は気配。文字文化と気配文化の差がそのまま出る。", category: 'request', month: '2026-09' },
    { daySlot: 11, japanese: '言わなくてもわかるでしょ', english: [
        "you know what I mean",
        "you know exactly what I mean",
        "I shouldn't have to say it, you know what I mean",
        "I shouldn't have to say it. and the fact that you're making me say it is itself part of what I'm annoyed about, which I realize is not fair, and I'm saying it anyway."
    ], context: "「言わなくてもわかる」は前提の共有を求める型。英語のyou know what I meanは確認の相槌としても使われ、強さが弱い。日本語のこの型は詰問にもなるが、英語で同じ強さを出すにはI shouldn't have to say itが要る。", category: 'shutdown', month: '2026-09' },
    { daySlot: 11, japanese: '気が利くね', english: [
        "you thought of everything",
        "wow, you thought of everything",
        "you thought of everything, I didn't even ask for half of this",
        "you thought of everything. and the part that gets me is that most of it I wouldn't have noticed if you hadn't done it, which means you've probably been doing it for years."
    ], context: "「気が利く」は英語に一語で無い。thoughtfulは思いやり深い、on the ballは有能。日本語の「気が利く」は察して先に動くことで、英語はthought of everythingと結果で言う。過程を言うか結果を言うかの差。", category: 'reaction', month: '2026-09' },
    { daySlot: 11, japanese: '気を悪くしないで', english: [
        "no offense",
        "no offense, but",
        "don't take this the wrong way, but I think you're wrong",
        "don't take this the wrong way. I'm about to say something that sounds like a criticism of you and it's actually a criticism of the plan, and I need you to hold onto that distinction."
    ], context: "「気を悪くする」は気が悪くなる自動詞。英語はtake it the wrong wayと、受け取り方を相手の行為にする。日本語は気持ちが勝手に悪くなり、英語は相手が誤って受け取る。責任の置き場所が違う。", category: 'request', month: '2026-09' },
    { daySlot: 11, japanese: '本音を言うと', english: [
        "if I'm being honest",
        "okay, if I'm being honest",
        "if I'm being honest, I never really agreed with it",
        "if I'm being honest, I never agreed with it. I went along with it because arguing would have cost more than being wrong, and I made that trade knowingly."
    ], context: "「本音」と「建前」の対が英語に無い。if I'm being honestで本音側だけを言う。建前はthe official lineと説明的になる。二枚の顔を名詞で持つのは日本語で、英語は文で説明する。", category: 'opinion', month: '2026-09' },
    { daySlot: 11, japanese: '建前ではそうだけど', english: [
        "officially, yes",
        "officially yes, but",
        "officially that's the policy, but nobody actually does it",
        "officially that's the policy. in practice nobody has followed it since before I got here, and if you followed it exactly you would be the problem."
    ], context: "「建前」はofficiallyやin theory。日本語は建前という名詞を立てるが、英語は副詞で処理する。しかもin practice(実際は)と対にして初めて意味が出る。名詞一語と副詞の対で、構造が違う。", category: 'opinion', month: '2026-09' },
    { daySlot: 11, japanese: '空気が重い', english: [
        "the mood is heavy",
        "the mood in there is really heavy",
        "the mood in that room is heavy, something happened",
        "the mood in there is heavy. nobody's said anything about it, everybody's working, and the whole floor is about twenty percent quieter than normal."
    ], context: "「空気が重い」はthe mood is heavy。空気をmoodに置き換える。英語で言うairは物理の空気に限られ、場の雰囲気には使えない。日本語の「空気」は場の状態を丸ごと指すが、英語はmoodやatmosphereに分ける。", category: 'reaction', month: '2026-09' },
    { daySlot: 11, japanese: '触れないでおこう', english: [
        "let's not bring it up",
        "let's just not bring it up",
        "let's not bring it up, it'll only make things worse",
        "let's not bring it up. it will get dealt with eventually, by somebody, on a day that isn't today, and today I would like to just get through the meeting."
    ], literal: 'bring up = 持ち上げる(話題に出す)', context: "「触れる」は接触の語、英語のbring upは持ち上げる。話題にするという行為を、日本語は触ること、英語は上に持ってくることで言う。話題が地面に埋まっているという英語の感覚が、句動詞upに出ている。", category: 'suggestion', month: '2026-09' },
    { daySlot: 11, japanese: 'そっとしておこう', english: [
        "leave them alone",
        "let's just leave them alone",
        "just leave them alone for now, they'll come around",
        "just leave them alone for now. some people want company when it's bad and some people want the room, and this one wants the room."
    ], context: "「そっとしておく」はleave alone。日本語は「そっと」という様態の副詞が主役だが、英語はaloneという状態の語。静かにするのが日本語、独りにするのが英語。優しさの中身が、音か距離かで分かれている。", category: 'suggestion', month: '2026-09' },

    // ── Day 12 ── 手・目・腹。身体で言う日本語
    { daySlot: 12, japanese: '手を出すな', english: [
        "don't touch it",
        "seriously, don't touch it",
        "don't touch it, you'll make it worse",
        "don't touch it. I know it looks like it needs help. the last three people who thought that are the reason it looks like this."
    ], context: "「手を出す」は関与すること全般。触るのはtouch、事業ならget involved、恋愛ならmake a move。日本語は「手」一語で全部言えるが、英語は場面ごとに動詞が変わる。身体語を抽象に使えるのが日本語。", category: 'shutdown', month: '2026-09' },
    { daySlot: 12, japanese: '手に負えない', english: [
        "it's out of my hands",
        "honestly it's out of my hands now",
        "it's out of my hands at this point, someone else has to take it",
        "it's out of my hands. and I don't say that to duck it, I say it because the decision moved to a room I don't get invited to."
    ], literal: 'out of one\'s hands = 手を離れた', context: "珍しく手の比喩が両言語で揃う。ただし日本語は負えないと重さで言い、英語はout ofと位置で言う。手に持てない重さと、手の外にあること。同じ手を使っても、重量と空間で分かれる。", category: 'reaction', month: '2026-09' },
    { daySlot: 12, japanese: '目が離せない', english: [
        "I can't look away",
        "I genuinely can't look away",
        "I can't look away from it, it's too good",
        "I can't look away. I have things to do. the things are still there. I have simply decided that they can wait until this finishes."
    ], context: "「目が離せない」は目が主語。英語はIが主語でlook away。日本語は身体の部位が勝手に動き、英語は人が動く。「腹が立つ」「気が済む」と同じ構造で、日本語は臓器や部位を主語にできる。", category: 'reaction', month: '2026-09' },
    { daySlot: 12, japanese: '腹が立つ', english: [
        "that makes me angry",
        "honestly that makes me angry",
        "it makes me angry every time I think about it",
        "it makes me angry every time I think about it, which is why I've been actively not thinking about it for two days."
    ], context: "「腹が立つ」は腹が主語で勝手に立つ。英語はit makes me angryと、原因を主語にして自分を目的語にする。日本語は怒りが自分の中で発生し、英語は外から自分にさせられる。感情の因果の向きが逆。", category: 'reaction', month: '2026-09' },
    { daySlot: 12, japanese: '腹をくくる', english: [
        "I'm committing to it",
        "alright, I'm committing to it",
        "I'm committing to it, no more hedging",
        "I'm committing to it. no more hedging, no more keeping one foot out the door, because the hedging is costing more than the risk ever would."
    ], context: "「腹をくくる」は身体を締める動作。英語はcommit(委ねる)で、身体が出てこない。日本語の覚悟は腹に集まるが、英語の覚悟は約束や献身の語彙になる。内臓で言う文化と、契約で言う文化。", category: 'opinion', month: '2026-09' },
    { daySlot: 12, japanese: '耳が痛い', english: [
        "that hits close to home",
        "ouch, that hits close to home",
        "that hits a little close to home, honestly",
        "that hits close to home. I'd like to argue with it and the reason I can't is exactly why it stings."
    ], literal: 'hit close to home = 家の近くに当たる(身に覚えがある)', context: "「耳が痛い」は聴覚、英語のclose to homeは距離。日本語は聞くのが辛いと器官で言い、英語は自分の領域に近いと空間で言う。痛みを感じる場所が、耳と家で違っている。", category: 'reaction', month: '2026-09' },
    { daySlot: 12, japanese: '足を引っ張る', english: [
        "I'm holding everyone back",
        "I feel like I'm holding everyone back",
        "I'm holding the team back and I know it",
        "I feel like I'm holding everyone back. and nobody has said anything, which somehow makes it worse, because it means they've all quietly adjusted around me."
    ], context: "「足を引っ張る」はhold back。日本語は足を引く、英語は後ろに保つ。どちらも前進を妨げる比喩だが、日本語は具体的な部位を掴み、英語は方向だけを言う。身体の解像度が日本語のほうが高い。", category: 'reaction', month: '2026-09' },
    { daySlot: 12, japanese: '顔から火が出る', english: [
        "I want to disappear",
        "I honestly want to disappear",
        "I wanted to disappear right there on the spot",
        "I wanted to disappear right there. not leave. disappear. leaving would have required walking past people."
    ], context: "「顔から火が出る」は熱、英語のI want to disappearは消失。恥ずかしさを温度で言う日本語と、存在の消去で言う英語。英語にもcringeがあるが縮む動作で、火は出ない。恥の感じ方が体温か存在かで分かれる。", category: 'reaction', month: '2026-09' },
    { daySlot: 12, japanese: '肩の荷が下りた', english: [
        "that's a weight off",
        "that is a huge weight off",
        "that's a huge weight off my shoulders",
        "that's a weight off. I didn't realize how much I'd been carrying it until it stopped, and now I'm just tired instead of tense."
    ], context: "重荷の比喩は両言語で揃う。日本語は肩の荷、英語はweight off my shoulders。ここまで一致するのは珍しい。ただし英語はoffという方向の小語が要り、日本語は「下りる」という自動詞で済む。", category: 'reaction', month: '2026-09' },
    { daySlot: 12, japanese: '首が回らない', english: [
        "I'm buried in debt",
        "I'm completely buried in debt",
        "I'm buried, I can't take on anything else",
        "I'm buried. every month the same amount goes out before I've touched any of it, and there is no version of the next six months where that changes."
    ], context: "「首が回らない」は借金で身動きが取れない状態。英語はburied(埋まっている)で、地面のメタファー。日本語は首の可動域、英語は埋没。同じ行き詰まりを、身体の自由と地中で別々に言う。", category: 'reaction', month: '2026-09' },

    // ── Day 13 ── 一応・とりあえず・念のため。保険をかける層
    { daySlot: 13, japanese: '念のため確認', english: [
        "just to confirm",
        "just to confirm real quick",
        "just to confirm, we're still meeting at three?",
        "just to confirm. I'm not doubting you, I'm doubting my own memory of a conversation that happened while I was doing something else."
    ], context: "「念のため」はjust to confirmかjust in case。念という心の語を、英語は目的のtoで言う。日本語は用心という気持ちの名詞を持ち、英語は行為の目的を述べる。心を名詞にするか、行為で示すか。", category: 'request', month: '2026-09' },
    { daySlot: 13, japanese: '一応持ってく', english: [
        "I'll bring it just in case",
        "I'll bring it along just in case",
        "I'll bring it just in case, it weighs nothing",
        "I'll bring it just in case. worst case I carry it around all day for nothing. best case I'm the only person in the room who has one."
    ], context: "「一応」の三つの顔のうち、これはjust in case。念のため側。同じ「一応」でも「一応できてる」はtechnically、「一応やっとく」はfor now。日本語は一語、英語は三語。この使い分けが通訳の詰まりどころ。", category: 'reaction', month: '2026-09' },
    { daySlot: 13, japanese: '一応できてる', english: [
        "technically it works",
        "technically it works, yes",
        "technically it works, but I wouldn't show it to anyone",
        "technically it works. and I want that word technically to carry as much weight as it possibly can, because everything after it is held together with tape."
    ], context: "同じ「一応」がここではtechnically。形式上は満たしているが実質は怪しい、という含み。日本語は「一応」で足りるが、英語のtechnicallyは法律や規則の匂いがする語で、日常会話でも皮肉として働く。", category: 'opinion', month: '2026-09' },
    { daySlot: 13, japanese: 'とりあえず出しとく', english: [
        "I'll send it for now",
        "I'll just send it for now",
        "I'll send what I have for now and fix it later",
        "I'll send what I have for now. it's not finished. it's visible, which today is the more important property."
    ], context: "「とりあえず」はfor now。日本語は「取り敢えず」で、取るものも取らずに急ぐという語源。英語のfor nowは時間の区切りだけ。急ぐという含みは英語に無いので、必要ならquicklyを足す。", category: 'reaction', month: '2026-09' },
    { daySlot: 13, japanese: '保険かけとく', english: [
        "I'll hedge a bit",
        "I'm going to hedge a little",
        "I'll hedge it, I don't want to promise something I can't do",
        "I'll hedge it. if I promise Friday and deliver Friday, nobody notices. if I say Monday and deliver Friday, I'm a hero. same work."
    ], literal: 'hedge = 生垣を作る(逃げ道を残す)', context: "「保険をかける」は保険という制度の比喩。英語のhedgeは生垣で囲うで、賭けの用語から来ている。日本語は金融、英語は農地。逃げ道を作るという同じ行為を、制度と地形で別々に言う。", category: 'opinion', month: '2026-09' },
    { daySlot: 13, japanese: '様子を見てから決める', english: [
        "I'll decide after I see how it goes",
        "I'd rather decide after I see how it goes",
        "let me see how it goes first, then I'll decide",
        "let me see how it goes first. I can make the decision now and be wrong, or make it Thursday and be right, and nothing bad happens between now and Thursday."
    ], context: "「様子を見る」はsee how it goes。goesという移動の動詞が入るのが英語で、日本語は「様子」という静止した名詞。物事が進むと見るのが英語、状態を眺めるのが日本語。動と静の差。", category: 'suggestion', month: '2026-09' },
    { daySlot: 13, japanese: '最悪の場合', english: [
        "worst case",
        "worst case scenario",
        "worst case, we push it a week and nobody dies",
        "worst case we push it a week. I've said the worst case out loud now and it turns out the worst case is fine, which usually means we've been scared of the wrong thing."
    ], context: "「最悪の場合」はworst case。日本語は「場合」という条件の名詞、英語はcaseで同じ。ここは形が揃う。ただし英語は冠詞なしでworst caseと副詞的に投げられ、日本語は「〜の場合」と助詞が要る。", category: 'opinion', month: '2026-09' },
    { daySlot: 13, japanese: '念には念を', english: [
        "better safe than sorry",
        "better safe than sorry, honestly",
        "better safe than sorry, let's just double check it",
        "better safe than sorry. checking twice costs four minutes. not checking costs a phone call on a Saturday, and I have plans."
    ], context: "「念には念を」は同じ語を重ねる型。英語はbetter safe than sorryと比較で言う。日本語は反復で強調し、英語は二つの結果を比べる。反復か比較かという、強調の作り方そのものが違う。", category: 'suggestion', month: '2026-09' },
    { daySlot: 13, japanese: '確認だけしとく', english: [
        "let me just double check",
        "let me just double check that",
        "let me double check before we commit to anything",
        "let me just double check. it takes thirty seconds and it removes the version of tomorrow where somebody asks me if I checked and I have to say probably."
    ], context: "「確認」はconfirmとcheckに割れる。confirmは相手に確かめる、checkは自分で見る。日本語は「確認」一語で両方できるが、英語は誰に対する動作かで語が変わる。ここは自分で見るのでcheck。", category: 'request', month: '2026-09' },
    { daySlot: 13, japanese: '無いとは言い切れない', english: [
        "I can't rule it out",
        "I honestly can't rule it out",
        "I can't rule it out, but it's unlikely",
        "I can't rule it out. I'd put it low. but low is not zero, and the difference between low and zero is the entire reason we have a backup."
    ], literal: 'rule out = 線を引いて除外する', context: "「言い切れない」は断言の否定。英語はrule out(除外する)の否定で、可能性の一覧から消せないと言う。日本語は発話の限界、英語は判断の操作。言えないと除外できないで、否定している対象が違う。", category: 'opinion', month: '2026-09' },

    // ── Day 14 ── 相手・向こう・先方。人を指さずに指す層
    { daySlot: 14, japanese: '向こうがどう出るか', english: [
        "how they'll react",
        "depends how they react",
        "it depends on how they react to it",
        "it depends how they react. we've done our part. everything from here is a response to a response, and I can't script that."
    ], context: "「向こう」は方向で人を指す。英語はtheyと人称代名詞で言う。日本語は相手を名指さずに位置で示せるが、英語は誰かを代名詞で指す必要がある。人を方角で呼べるかどうかの差。", category: 'opinion', month: '2026-09' },
    { daySlot: 14, japanese: '相手にしないほうがいい', english: [
        "don't engage",
        "seriously, don't engage",
        "don't engage, that's exactly what they want",
        "don't engage. every reply gives it another day of life and the whole thing dies on its own by Thursday if we let it."
    ], context: "「相手にする」は関わること。英語はengage(交戦する)で、軍事の語が日常に降りてきている。日本語は相手という名詞、英語は交戦という動詞。関わりを人で言うか、行為で言うか。", category: 'suggestion', month: '2026-09' },
    { daySlot: 14, japanese: '先方の都合', english: [
        "it's on their schedule",
        "it's really on their schedule",
        "it depends on their schedule, not ours",
        "it's on their schedule. which means the date will change twice, we'll find out about it late, and we'll rearrange around it because that's the arrangement."
    ], context: "「都合」は英語に無い。scheduleは予定、convenienceは便利さで、日本語の「都合」が持つ事情全体は出ない。at your convenienceは丁寧すぎる。日本語は事情を一語で丸めるが、英語は何の事情かを言う。", category: 'opinion', month: '2026-09' },
    { daySlot: 14, japanese: 'あっちの言い分', english: [
        "their side of it",
        "their side of the story",
        "I've only heard their side of the story so far",
        "I've only heard their side. and their side was convincing, which tells me nothing, because the first version of any story is always convincing."
    ], context: "「言い分」はtheir side。英語は側面という空間の語で、日本語は言う分という発話の量。主張を場所で言うのが英語、発言で言うのが日本語。sideには公平さの含みも入る。", category: 'opinion', month: '2026-09' },
    { daySlot: 14, japanese: '人のせいにするな', english: [
        "don't blame other people",
        "don't put it on other people",
        "don't put this on somebody else, it was your call",
        "don't put this on somebody else. it was your call. I was in the room when you made it and I remember it being a call."
    ], context: "「せい」は原因と責任が混ざった語。英語はblame(非難)かput it on(置く)。日本語は「せい」という名詞で責任の所在を丸ごと持てるが、英語は責める行為か、押し付ける動作かに割れる。", category: 'shutdown', month: '2026-09' },
    { daySlot: 14, japanese: '巻き込まれた', english: [
        "I got dragged into it",
        "I got dragged into the whole thing",
        "I got dragged into it, I wasn't even there",
        "I got dragged into it. I wasn't in the meeting, I wasn't on the email, and somehow my name is on the summary."
    ], literal: 'drag into = 引きずり込む', context: "「巻き込む」は巻くという回転の動き、英語のdrag intoは引きずるという直線の動き。どちらも不本意な参加を言うが、渦と牽引で形が違う。日本語は台風のような巻き込み、英語は綱引き。", category: 'reaction', month: '2026-09' },
    { daySlot: 14, japanese: '板挟み', english: [
        "I'm stuck in the middle",
        "I'm stuck in the middle of it",
        "I'm stuck in the middle and both sides think I'm on the other one",
        "I'm stuck in the middle. both sides have told me things in confidence and both sides assume I'm reporting to the other one, and honestly neither assumption is unreasonable."
    ], context: "「板挟み」は二枚の板に挟まれる物理。英語はstuck in the middleと位置で言う。日本語は圧力、英語は座標。挟まれる痛みを言うか、どちらにも動けない位置を言うか。", category: 'reaction', month: '2026-09' },
    { daySlot: 14, japanese: '顔を合わせづらい', english: [
        "it's awkward seeing them",
        "it's honestly awkward seeing them",
        "it's awkward running into them now",
        "it's awkward running into them now. nothing happened exactly. it's just that we both know what almost happened and neither of us has mentioned it."
    ], context: "「顔を合わせる」は顔という部位、英語はseeやrun intoで視覚と移動。日本語は互いの顔が向き合う相互性を持つが、英語は片方が見る一方向。相互を一語で言えるのが日本語。", category: 'reaction', month: '2026-09' },
    { daySlot: 14, japanese: '角が立つ', english: [
        "it'll cause friction",
        "it'll just cause friction",
        "saying it that way is going to cause friction",
        "saying it that way is going to cause friction. the content is fine. the phrasing is going to cost us two weeks of somebody being quietly difficult."
    ], context: "「角が立つ」は角という形状、英語のfrictionは摩擦という力。日本語は物の形が尖ることで対立を言い、英語は擦れる力で言う。形で言うか、力で言うか。日本語の比喩は静的で、英語は動的。", category: 'opinion', month: '2026-09' },
    { daySlot: 14, japanese: '丸く収める', english: [
        "smooth it over",
        "let's just smooth it over",
        "let's smooth it over before it becomes a thing",
        "let's smooth it over before it becomes a thing. right now it's a misunderstanding. in three days it becomes a position, and positions don't move."
    ], literal: 'smooth over = ならして平らにする', context: "「丸く収める」は丸という形、英語のsmooth overは平らにする。角が立つの対で、日本語は角と丸、英語はroughとsmooth。形状の対比で対立と和解を言うのは両言語共通だが、丸いか平らかで違う。", category: 'suggestion', month: '2026-09' },

    // ── Day 15 ── 時間・期限・締切。急ぎの層
    { daySlot: 15, japanese: 'ギリギリだった', english: [
        "that was close",
        "that was way too close",
        "that was close, we made it with about a minute to spare",
        "that was close. and I know we made it, and making it is what counts, but I'd like the next one to not require running."
    ], context: "「ギリギリ」は擬音語。英語に擬音の副詞が無いのでthat was closeと距離で言う。日本語はオノマトペで状態を丸ごと表せるが、英語は形容詞で言い直す必要がある。オノマトペが翻訳で必ず落ちる例。", category: 'reaction', month: '2026-09' },
    { daySlot: 15, japanese: '間に合わない', english: [
        "we won't make it",
        "we're not going to make it",
        "we're not going to make it, we need to tell them now",
        "we're not going to make it. and the sooner we say that the more options we have, because right now it's a schedule problem and in two days it becomes a trust problem."
    ], context: "「間に合う」は間に合うと書いて、時間の隙間に収まること。英語はmake itで、到達する動詞。日本語は空間に収まり、英語は目的地に着く。時間を容器と見るか、道と見るか。", category: 'reaction', month: '2026-09' },
    { daySlot: 15, japanese: '押してる', english: [
        "we're running behind",
        "we're running a bit behind",
        "we're running behind, let's cut the last section",
        "we're running behind. we can either cut something or run over, and running over means half the room leaves before the part that matters."
    ], context: "「押してる」は後ろに押される感覚。英語はrunning behindで、走って後ろにいる。日本語は押される受動、英語は走る能動。遅れを、押されるか自分が走るかで言い分ける。", category: 'reaction', month: '2026-09' },
    { daySlot: 15, japanese: '前倒しにしよう', english: [
        "let's move it up",
        "let's just move it up",
        "let's move it up a week, we've got the room",
        "let's move it up a week. we have the capacity now and we definitely won't in October, and future us will be grateful in a way they will never express."
    ], literal: 'move up = 前に動かす(前倒し)', context: "「前倒し」は前に倒す、英語はmove upで上に動かす。日本語の時間は水平で前後、英語のスケジュールは垂直で上下。カレンダーが縦に並ぶ英語圏の感覚が、upという語に残っている。", category: 'suggestion', month: '2026-09' },
    { daySlot: 15, japanese: '後ろ倒しになった', english: [
        "it got pushed back",
        "it got pushed back again",
        "it got pushed back to next month, third time now",
        "it got pushed back to next month. that's the third time, and at this point the date is less a plan and more a rumor."
    ], context: "「後ろ倒し」はpush back。日本語は倒す、英語は押す。ここは前倒しのmove upと対になっていないのが英語の面白いところで、上に動かすと後ろに押すが対になっている。方向の軸が途中で変わる。", category: 'reaction', month: '2026-09' },
    { daySlot: 15, japanese: 'そろそろ出ないと', english: [
        "I should get going",
        "I should probably get going",
        "I should get going, I've got a thing at seven",
        "I should get going. and I've said that twice now without moving, which is usually the sign that I need to stand up mid-sentence."
    ], context: "「そろそろ」は英語に無い。about toやI shouldで近づける。日本語のオノマトペ的な副詞で、動作が始まる直前の時間を指す。英語は助動詞shouldや進行形で同じ位置を作る。副詞か助動詞かの差。", category: 'reaction', month: '2026-09' },
    { daySlot: 15, japanese: '急がなくていいよ', english: [
        "no rush",
        "seriously, no rush",
        "no rush at all, whenever you get to it",
        "no rush at all. and I mean it, this is not the polite version of a deadline, there is genuinely no date attached to this."
    ], context: "「急がなくていい」は否定命令。英語はno rushと名詞一語で済む。日本語は動詞を否定して許可を出し、英語は名詞を否定する。同じ内容を、動詞句と名詞句で作る典型的な差。", category: 'reaction', month: '2026-09' },
    { daySlot: 15, japanese: '今更だけど', english: [
        "I know it's late, but",
        "I know it's late to bring this up, but",
        "I know it's late to bring this up, but did we check the dates?",
        "I know it's late to bring this up. and I'd have said it earlier if I'd thought of it earlier, and I didn't, and I'm saying it now because late is still better than after."
    ], context: "「今更」は時機を逃した感覚を一語で持つ。英語はit's lateかat this pointと説明が要る。日本語は今と更でこの一語を作るが、英語は時点を指すだけで、遅すぎるという評価は別に足す。", category: 'opinion', month: '2026-09' },
    { daySlot: 15, japanese: '早めに言ってよ', english: [
        "tell me sooner next time",
        "please tell me sooner next time",
        "next time can you tell me sooner, I could have moved things",
        "next time tell me sooner. not because I'm angry, but because with two days I have options and with two hours I have one."
    ], context: "「早めに」はsooner。日本語は早いに「め」を付けて、少し早くという幅を作る。英語は比較級soonerで、何より早いかを暗に含む。日本語は程度をぼかす接尾辞を持ち、英語は比較で処理する。", category: 'request', month: '2026-09' },
    { daySlot: 15, japanese: '時間の無駄', english: [
        "that's a waste of time",
        "honestly that's a waste of time",
        "that's a waste of time, we already know the answer",
        "that's a waste of time. we already know the answer, everybody in the room knows the answer, and the meeting exists so that the answer has witnesses."
    ], context: "「無駄」はwaste。ここは対応が良い。ただし日本語の「無駄」は結果が出ないこと全般で、英語のwasteは消費してしまうこと。日本語は成果の不在、英語は資源の消失。同じ場面を別の角度で言う。", category: 'opinion', month: '2026-09' },

    // ── Day 16 ── 苦手・下手・向いてない。できなさの層
    { daySlot: 16, japanese: 'それ苦手なんだよね', english: [
        "I'm not good at that",
        "I'm honestly not good at that",
        "I'm not good at that, never have been",
        "I'm not good at that. and I've tried the thing where you practice until you're good at it, and what I got was mediocre and resentful."
    ], context: "「苦手」は嫌いと下手が混ざった語。英語はnot good at(下手)とnot a fan of(嫌い)に割れる。日本語は能力と好悪を一語で言えるので、逃げ道としても使える。英語はどちらかを名指すことになる。", category: 'reaction', month: '2026-09' },
    { daySlot: 16, japanese: '向いてない', english: [
        "it's not for me",
        "it's just not for me",
        "it's not for me, and that's fine",
        "it's not for me. I can do it. I've done it for two years. but doing it and being suited for it turned out to be different questions."
    ], context: "「向いてない」は方向の語。英語はnot for meと所有の語。日本語は自分が対象に向かっているかを言い、英語は対象が自分のためのものかを言う。主語と目的語が入れ替わっている。", category: 'opinion', month: '2026-09' },
    { daySlot: 16, japanese: '不器用なんで', english: [
        "I'm not great with my hands",
        "I'm honestly not great with my hands",
        "I'm not great with my hands, it always takes me twice as long",
        "I'm not great with my hands. everything I build works and nothing I build looks like it should be photographed."
    ], context: "「不器用」は器用の否定で、手先だけでなく世渡りにも使える。英語はclumsy(動作)やawkward(社交)に割れる。日本語は器用という一語が技術と社交を横断するが、英語は場面ごとに別語。", category: 'reaction', month: '2026-09' },
    { daySlot: 16, japanese: 'できる気がしない', english: [
        "I don't think I can",
        "I honestly don't think I can",
        "I don't think I can pull that off, not by Friday",
        "I don't think I can pull that off. not by Friday. give me the same task and two more weeks and it's a different conversation."
    ], context: "「気がしない」は気という主語が動かない。英語はI don't thinkと自分の判断で言う。日本語は感覚が来ないことで不可能を言い、英語は思考の否定で言う。感覚か判断か。", category: 'reaction', month: '2026-09' },
    { daySlot: 16, japanese: '手も足も出ない', english: [
        "I'm completely out of my depth",
        "I'm honestly out of my depth here",
        "I'm out of my depth, I don't even know where to start",
        "I'm out of my depth. it's not that it's hard, it's that I can't tell which parts are the hard parts, and that's a different kind of stuck."
    ], literal: 'out of one\'s depth = 足の立たない深さ', context: "「手も足も出ない」は身体、英語のout of one's depthは水深。日本語は四肢が動かせない、英語は足が底に着かない。どちらも身体だが、日本語は動作、英語は深さ。水のメタファーは英語に多い。", category: 'reaction', month: '2026-09' },
    { daySlot: 16, japanese: '慣れてないだけ', english: [
        "I'm just not used to it",
        "I'm just not used to it yet",
        "I'm just not used to it yet, give me a week",
        "I'm just not used to it yet. every individual step makes sense, I just haven't done them in this order enough times for my hands to know the order."
    ], context: "「慣れる」はget used to。英語はusedという過去分詞で状態を作り、toで対象を取る。日本語は慣れるという動詞一語。英語のbe used toは形が難しく、used to(かつて)と混同されるので日本人が最も間違える型。", category: 'reaction', month: '2026-09' },
    { daySlot: 16, japanese: '要領が悪い', english: [
        "I do things the hard way",
        "I always do things the hard way",
        "I do everything the hard way, I can't help it",
        "I do everything the hard way. there's usually a shortcut and I usually find it about ten minutes after I've finished doing it the long way."
    ], context: "「要領」は英語に無い。要領がいいはefficientやknows the ropes、悪いはdoes it the hard way。日本語は要領という技能の名詞を持ち、英語は効率や道の知識で言う。名詞で持てるかどうか。", category: 'reaction', month: '2026-09' },
    { daySlot: 16, japanese: '一から覚え直し', english: [
        "back to square one",
        "so it's back to square one",
        "we're back to square one, all of it",
        "we're back to square one. two weeks of work, and the useful part of it is that I now know one specific way that doesn't work."
    ], literal: 'square one = 振り出しのマス', context: "「一から」は数の始まり、英語のsquare oneは盤上の最初のマス。日本語は数え直し、英語はすごろくの振り出し。同じやり直しを、数字とゲーム盤で別々に言う。英語の比喩は具体物が多い。", category: 'reaction', month: '2026-09' },
    { daySlot: 16, japanese: '身につかない', english: [
        "it's not sticking",
        "it's just not sticking",
        "I keep studying it and it's just not sticking",
        "it's just not sticking. I understand it while I'm reading it and by the next morning I've got the shape of it and none of the contents."
    ], literal: 'stick = くっつく(定着する)', context: "「身につく」は身体に付く、英語のstickはくっつく。どちらも接着の比喩だが、日本語は自分の身体に、英語は対象が自分に。付く方向が逆。習得を接着で言うのは共通している。", category: 'reaction', month: '2026-09' },
    { daySlot: 16, japanese: '向き不向きがある', english: [
        "some people are built for it",
        "some people are just built for it",
        "some people are built for it, some aren't, that's all it is",
        "some people are built for it and some aren't. that's not an excuse, it's just a thing to know before you spend three years finding out."
    ], context: "「向き不向き」は肯定と否定を並べた対の語。英語はsome are, some aren'tと文で並べる。日本語は名詞のペアで概念を作れるが、英語は文にほどける。対の名詞が作れるのは日本語の強み。", category: 'opinion', month: '2026-09' },
];
