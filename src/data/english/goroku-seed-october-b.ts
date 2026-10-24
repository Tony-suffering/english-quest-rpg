// 俺語録 2026年10月 その2 — Day 7-12
// 骨格: 助動詞の温度 / 現在完了 / 名詞化を避ける / 否定疑問と付加疑問 / 末尾焦点 / There's

import type { GorokuSeed } from './goroku-seed';

export const GOROKU_OCT_B: GorokuSeed[] = [
    // ── Day 7 ── 助動詞の温度。would / could / might / should で、同じ動詞の温度を変える
    { daySlot: 7, japanese: 'やろうかな', english: [
        "I might",
        "I might, actually",
        "I might actually do it this time",
        "I might. I said might. might is a word that commits to nothing and I chose it on purpose. if I said will, you'd hold me to it. might is a door I can walk through or not, and either way I told the truth."
    ], context: "「かな」は迷いの語尾で、英語には無い。代わりに might が迷いを担う。will が100%、might が40%くらい。日本語は語尾で確度を変え、英語は助動詞で変える。動詞は同じ do のまま、前に置く一語で温度が決まる。", category: 'opinion', month: '2026-10' },
    { daySlot: 7, japanese: 'できなくもない', english: [
        "I could",
        "I could, in theory",
        "I could do it, but I'd rather not",
        "I could. technically. the way a person could run a marathon tomorrow if they really had to. the ability exists somewhere in me. whether it should be woken up for this is a separate question."
    ], context: "「できなくもない」の二重否定を英語は could 一語で言う。can が能力、could が「やろうと思えば」。過去形にすることで現実から一歩引き、可能性だけ置く。日本語は否定を重ねて曖昧にし、英語は助動詞を過去形にして曖昧にする。", category: 'opinion', month: '2026-10' },
    { daySlot: 7, japanese: 'そうしたほうがいいよ', english: [
        "you should",
        "you should, honestly",
        "you should, honestly, before it gets worse",
        "you should. I'm not telling you what to do. I'm telling you what I would do, standing where you're standing, knowing what you know. and I would do it today. not because it's fun. because tomorrow it costs more."
    ], context: "「したほうがいい」は should。had better は「さもないと」の脅しが入るので日常では強すぎる。should は助言の標準温度。日本語の「ほうがいい」は比較の形だが、英語は比較ではなく助動詞一語で助言になる。", category: 'suggestion', month: '2026-10' },
    { daySlot: 7, japanese: 'それは無いわ', english: [
        "I wouldn't",
        "yeah, I wouldn't do that",
        "I wouldn't do that if I were you",
        "I wouldn't. and I say that as someone who has done it. twice. it seemed like a good idea both times, right up until the part where it wasn't. you can learn from my two times or you can have your own. I recommend mine."
    ], context: "「無いわ」を英語は I wouldn't と言える。仮定の would を否定して「自分ならしない」。don't だと現在の習慣、wouldn't だと仮定の判断。日本語は「無い」で切り捨てるが、英語は仮定の助動詞で「自分の場合は」と一歩引いて切る。", category: 'opinion', month: '2026-10' },
    { daySlot: 7, japanese: '〜なんじゃない？', english: [
        "could be",
        "could be, yeah",
        "could be the battery, have you checked it?",
        "could be the battery. could be the cable. could be the thing where it just decides not to work on Mondays. I'm not a technician. I'm a person who has owned things that stopped working. it's usually the battery."
    ], context: "「〜なんじゃない?」の推測を英語は could be で言う。is だと断定、could be だと候補の一つ。主語の it まで落として could be だけで返せる。日本語は語尾の「じゃない?」で確度を下げ、英語は助動詞で下げる。", category: 'opinion', month: '2026-10' },
    { daySlot: 7, japanese: '来るはずだよ', english: [
        "she should be here",
        "she should be here any minute",
        "she should be here any minute, she texted from the station",
        "she should be here. should. the word is doing a lot of work. it means she said she'd come and she usually does and nothing has happened to suggest otherwise. it does not mean I can see her. I cannot see her."
    ], context: "「はず」を英語は should で言う。助言の should と同じ語で、ここでは「順当なら」の期待。日本語は「はず」という名詞で予測を作るが、英語は助動詞の温度で予測にする。must だと確信、should だと期待、might だと願望。", category: 'opinion', month: '2026-10' },
    { daySlot: 7, japanese: 'それは言えないな', english: [
        "I can't say",
        "I really can't say",
        "I can't really say, it's not mine to share",
        "I can't say. and I know can't sounds like won't with a better lawyer. but there's a difference. won't means I chose. can't means someone else chose and I'm honoring it. I'd tell you if it were mine. it isn't."
    ], context: "「言えない」を can't で言うと「言うことが許されていない」。won't だと「言う気が無い」。日本語の「言えない」はどちらにも取れるが、英語は助動詞で立場を明かす。can't は外の事情、won't は自分の意思。", category: 'shutdown', month: '2026-10' },
    { daySlot: 7, japanese: 'やっとけばよかった', english: [
        "should have",
        "I should have, I know",
        "I should have done it when I had the chance",
        "I should have. I had the time, I had the tools, I had the whole afternoon. and I spent the afternoon deciding whether to start. the deciding took the afternoon. there is a lesson here and I refuse to learn it."
    ], context: "後悔は should have。助動詞に have を足すと過去への判断になる。日本語は「〜ばよかった」と条件の形で後悔を言うが、英語は should を過去に向けるだけ。動詞は変えず、助動詞の後ろに have を足す型。", category: 'reaction', month: '2026-10' },
    { daySlot: 7, japanese: 'そのはずだったんだけど', english: [
        "it was supposed to",
        "it was supposed to, yeah",
        "it was supposed to be done by Friday",
        "it was supposed to be done. supposed to. everyone's favorite phrase for a plan that met reality and lost. the plan was good. reality was not consulted. reality never is. that's the thing about plans."
    ], context: "「はずだった」は was supposed to。should と近いが、supposed to は「そう決まっていた」という外の取り決めを含む。日本語の「はず」は一語だが、英語は自分の期待(should)と外の予定(supposed to)を分ける。", category: 'reaction', month: '2026-10' },
    { daySlot: 7, japanese: 'よかったら', english: [
        "if you want",
        "if you want to, no pressure",
        "you could join us later if you want to, no pressure",
        "you could come. if you want. I'm putting could and if in the same sentence so you understand there is no obligation here. this is an open door, not a summons. walk through it or don't. we'll be there either way."
    ], context: "「よかったら」は誘いの温度を下げる語。英語は you could と could を使うことで、命令でも要求でもない提案になる。you can join だと許可、you could join だと選択肢の提示。助動詞の過去形が、相手の自由を残す。", category: 'suggestion', month: '2026-10' },

    // ── Day 8 ── 現在完了。「もう」「まだ」「ずっと」を、過去と今をつなぐ形で言う
    { daySlot: 8, japanese: 'もう食べた', english: [
        "already ate",
        "I've already eaten, thanks",
        "I've already eaten, but I'll sit with you",
        "I've eaten. I know it's only eleven. I ate at ten because I was hungry at ten and I have stopped apologizing for my body's schedule. sit down. I'll have a coffee and watch you eat, which is its own kind of meal."
    ], context: "「もう食べた」は過去のようで、今の状態(腹が満ちている)を言っている。英語は I've eaten と現在完了で「食べた結果が今ある」を表す。I ate だと過去の出来事だけ。日本語の「もう」が、英語では have が担う。", category: 'reaction', month: '2026-10' },
    { daySlot: 8, japanese: 'まだ来てない', english: [
        "not here yet",
        "she's not here yet",
        "she hasn't shown up yet, I'll give her ten more minutes",
        "she hasn't shown up. yet. I'm holding onto the yet. yet means the door could still open. the moment I drop the yet, it's a different sentence, and I'm not ready for that sentence. ten more minutes."
    ], context: "「まだ」は yet で、現在完了とセット。hasn't come yet で「来ていない状態が今も続いている」。didn't come だと来なかった過去の事実で終わる。日本語の「まだ〜ない」は今に開いた否定で、英語ではそれを現在完了が引き受ける。", category: 'reaction', month: '2026-10' },
    { daySlot: 8, japanese: '3年住んでる', english: [
        "three years now",
        "I've been here three years now",
        "I've lived here for three years, and I still get lost",
        "I've been here three years. three years and I still can't tell you which exit to take at the big station. I take the wrong one, walk outside, look up, and walk back in. every time. the station has won."
    ], context: "「住んでる」は進行のように聞こえるが、3年前から今まで続いている。英語は I've lived here for three years と現在完了で期間をつなぐ。I live here だと今の事実だけで期間が言えない。日本語の「〜てる」が過去からの継続を表すとき、英語は完了形になる。", category: 'reaction', month: '2026-10' },
    { daySlot: 8, japanese: '一回も行ったことない', english: [
        "never been",
        "I've never been, actually",
        "I've never been there, is it worth it?",
        "I've never been. everyone assumes I have. it's close, it's famous, it's the thing you do. and I've just never done it. at this point it's become a personality. I'm the guy who hasn't been. I'm not sure I want to lose that."
    ], context: "経験の「〜したことがある/ない」は現在完了の代表。I've never been で「これまでの人生に一度も無い」。I didn't go だと特定の日に行かなかった話。日本語の「ことがある」は名詞で経験を作るが、英語は have で人生の幅を持たせる。", category: 'reaction', month: '2026-10' },
    { daySlot: 8, japanese: '今終わったとこ', english: [
        "just finished",
        "I just finished, actually",
        "I've just finished, give me a second to breathe",
        "I just finished. thirty seconds ago. my hands are still in the shape of the keyboard. give me a minute before you hand me the next thing, because right now the next thing would bounce off."
    ], context: "「終わったとこ」は just と現在完了。I've just finished で「終わった直後で、その状態が今ある」。米語では I just finished と過去形でも言う。日本語の「とこ」を英語は just が担い、直後の今を指す。", category: 'reaction', month: '2026-10' },
    { daySlot: 8, japanese: 'ずっと気になってた', english: [
        "always wondered",
        "I've always wondered about that",
        "I've always wondered about that, since I was a kid",
        "I've always wondered. not every day. but it comes back. I'll be doing something completely unrelated and the question walks in, sits down, and waits. it's been doing that for twenty years. it's very patient."
    ], context: "「ずっと」を always で言い、現在完了で過去から今までを一本につなぐ。I always wondered と過去形にすると、昔の話になり今は気にしていないように聞こえる。日本語の「ずっと」の幅を、英語は have が支える。", category: 'filler', month: '2026-10' },
    { daySlot: 8, japanese: 'なんか変わった？', english: [
        "something's different",
        "wait, something's different",
        "wait, has something changed, the room looks different",
        "something's changed. I can't say what. the chairs are the same, the desk is the same, but the room is doing something it wasn't doing yesterday. did you move a plant. you moved a plant. that's it. it's the plant."
    ], context: "「変わった?」は過去のようで、今の違いを聞いている。英語は has something changed? と現在完了で「変化の結果が今あるか」を問う。did something change? だと出来事の有無だけ。今との違いを聞くなら完了形。", category: 'suggestion', month: '2026-10' },
    { daySlot: 8, japanese: '鍵なくした', english: [
        "lost my keys",
        "I've lost my keys again",
        "I've lost my keys and I have no idea where to even start",
        "I've lost my keys. present tense of a past event. they are gone now. I don't care when it happened. I care that right now, standing at this door, they are not in any pocket I own, and I own a lot of pockets."
    ], context: "「なくした」の結果として今、鍵が無い。英語は I've lost my keys で「無くした状態が今続いている」。I lost my keys だと過去の出来事で、今見つかっているかは分からない。今困っているなら現在完了、が英語の使い分け。", category: 'reaction', month: '2026-10' },
    { daySlot: 8, japanese: 'もう決めた', english: [
        "I've decided",
        "I've made up my mind",
        "I've made up my mind, and I'm not going back on it",
        "I've decided. it took a while. weeks of lists and pros and cons and asking people who didn't care. and then this morning I just knew. no list. no reason I can point at. the decision was done and I found out last."
    ], context: "「決めた」の結果が今の意思。英語は I've decided と完了形で「決めた状態が今ある」。I decided だと過去のある時点の話。今の意思表示として言うなら完了。日本語の「もう」は、英語では時制に化ける。", category: 'shutdown', month: '2026-10' },
    { daySlot: 8, japanese: '久しぶりだね', english: [
        "it's been a while",
        "it's been a while, hasn't it",
        "it's been a while, what have you been up to",
        "it's been a while. I was going to say how long but I did the math and the math was rude. let's not count. let's just say a while and pretend it was shorter than it was. you look the same. that's a lie. you look better."
    ], context: "「久しぶり」を英語は it's been a while と現在完了で言う。前回から今までの時間が積もった、という意味。it was a while だと過去の話になる。会えていない時間が今に届いているから、完了形。日本語の一語が英語では時制で表される。", category: 'reaction', month: '2026-10' },

    // ── Day 9 ── 名詞化を避ける。「検討する」「確認する」「対応する」を、英語は具体的な動詞で言う
    { daySlot: 9, japanese: '検討します', english: [
        "I'll look into it",
        "I'll look into it and get back to you",
        "let me look into it and get back to you by Thursday",
        "I'll look into it. that's not a no. it's also not a yes. it's a promise to spend real time with the question, which is more than most questions get. Thursday. you'll have something by Thursday."
    ], literal: 'look into = 中を覗く(調べる)', context: "「検討」は名詞だが、英語は consideration とは言わず look into と動詞で言う。日本語は動作を名詞にして「〜する」を付ける癖があり、英語はそのまま動詞にする。名詞化すると硬く抽象になるので、英語の話し言葉は動詞で具体に落とす。", category: 'request', month: '2026-10' },
    { daySlot: 9, japanese: '確認します', english: [
        "let me check",
        "let me check on that",
        "let me check on that and I'll let you know",
        "let me check. I think the answer is yes but I've been wrong before, loudly, in front of people. so now I check. it takes two minutes and saves me a week of apologizing. two minutes. don't go anywhere."
    ], context: "「確認」を confirmation と名詞にせず、check と動詞で言う。日本語の「〜します」は名詞に動詞を足す構造だが、英語は動詞一語。let me check、I'll double-check。名詞化を外すと、文が短くなり動きが出る。", category: 'request', month: '2026-10' },
    { daySlot: 9, japanese: '対応します', english: [
        "I'll handle it",
        "I'll handle it, don't worry",
        "I'll handle it, you don't need to do anything",
        "I'll handle it. I don't know how yet. but I know it'll be handled, because the alternative is it not being handled, and that option isn't available. so. handled. by me. details to follow."
    ], context: "「対応」は英語で最も名詞化しにくい語の一つ。handle、deal with、take care of と、全部動詞。日本語は「対応する」で何をするか言わずに済むが、英語は具体的な動詞を選ばされる。この選択を避けられないのが英語の骨格。", category: 'request', month: '2026-10' },
    { daySlot: 9, japanese: '共有します', english: [
        "I'll send it over",
        "I'll send it your way",
        "I'll send it your way as soon as it's ready",
        "I'll send it over. not share. send. sharing is what you do with a pizza. this is a file, and files get sent, and you'll have it in your inbox before you finish this coffee."
    ], context: "「共有」を share と言えなくはないが、話し言葉は send it over と動作で言う。日本語の「共有します」は行為を抽象化しているが、英語は「送る」という具体の動詞に落とす。抽象を具体に、名詞を動詞に。", category: 'request', month: '2026-10' },
    { daySlot: 9, japanese: '調整します', english: [
        "I'll work it out",
        "I'll work it out with them",
        "I'll work it out with the vendor and let you know",
        "I'll work it out. it's a puzzle, not a wall. puzzles have solutions. they're annoying and they take time and someone always loses a piece, but they get solved. give me a day with the pieces."
    ], context: "「調整」は adjustment ではなく work out、sort out と句動詞で言う。日本語の「調整する」は結果を言わない便利語だが、英語は「うまく組み立てる」という動作を言う。名詞化された日本語ほど、英語は句動詞が当たる。", category: 'request', month: '2026-10' },
    { daySlot: 9, japanese: '説明が必要', english: [
        "you'll need to explain",
        "that's going to need some explaining",
        "that's going to need some explaining before anyone signs off",
        "that's going to need explaining. not because it's wrong. because it's new, and new things look wrong until someone walks you through them. so walk them through it. slowly. with the pictures."
    ], context: "「説明が必要」は名詞が主語だが、英語は need explaining と動名詞で言う。explanation is needed と名詞にすると硬い。英語は名詞を動詞に戻して文を作る。「〜が必要」を英語は「〜することを必要とする」に変換する。", category: 'opinion', month: '2026-10' },
    { daySlot: 9, japanese: '判断をお願いします', english: [
        "you decide",
        "your call",
        "it's your call, I'll go with whatever you pick",
        "it's your call. I've said what I think. I've said it twice, once with a chart. now it's yours. pick one, and I'll back it, even the one I argued against. that's the deal with calls. you make them, we follow."
    ], context: "「判断」を decision ではなく decide、your call と言う。日本語は「判断をお願い」と名詞で頼むが、英語は「決めて」と動詞で言うか、call という短い名詞で言う。抽象名詞を避け、動作か短い口語名詞にする。", category: 'request', month: '2026-10' },
    { daySlot: 9, japanese: '把握してます', english: [
        "I'm aware",
        "I'm aware of it",
        "I'm aware of the issue, we're already on it",
        "I'm aware. I've been aware since Tuesday. I was aware before the email that made everyone else aware. awareness isn't the problem. the problem is the thing we're aware of, and that one's harder to email about."
    ], context: "「把握」を grasp や understanding と名詞にせず、I'm aware と形容詞で言う。日本語は状態を名詞化して「〜してます」にするが、英語は状態の形容詞を be に付ける。名詞化を外すと、文が軽くなる。", category: 'reaction', month: '2026-10' },
    { daySlot: 9, japanese: '連絡します', english: [
        "I'll reach out",
        "I'll reach out to them",
        "I'll reach out to them tomorrow and set something up",
        "I'll reach out. tomorrow. today is gone, today was meetings about meetings. tomorrow morning, before the inbox wakes up, I'll write the email. it'll be short. short emails get answered."
    ], context: "「連絡」を contact と名詞にすると硬い。reach out、get in touch と句動詞で言うのが話し言葉。日本語の「連絡します」は行為の種類を言わないが、英語は手を伸ばす、触れる、と身体の動きで言う。", category: 'request', month: '2026-10' },
    { daySlot: 9, japanese: '改善します', english: [
        "I'll fix it",
        "I'll fix it, I promise",
        "I'll fix it, you'll see the difference next week",
        "I'll fix it. not improve. fix. improve is a word for slides. fix is a word for things that are broken, and this is broken, and I'm the one with the tools. next week it works. that's the whole plan."
    ], context: "「改善」は improvement という名詞があるが、話し言葉は fix、make it better と動詞で言う。日本語の「改善します」は行為を抽象化して約束にするが、英語は「直す」という具体の動詞で約束する。抽象名詞を動詞に戻す、が英語の骨格。", category: 'request', month: '2026-10' },

    // ── Day 10 ── 否定疑問と付加疑問。「〜じゃない?」「〜だよね?」を、疑問の形で同意を取る
    { daySlot: 10, japanese: '寒くない？', english: [
        "cold, right?",
        "isn't it cold in here?",
        "isn't it cold in here, or is it just me?",
        "isn't it cold? I keep asking because nobody else is wearing a jacket and I'm wearing two. either the room is cold or I'm dying. I'd prefer the room. can someone confirm the room."
    ], context: "「〜じゃない?」は否定疑問。isn't it cold? で「寒いよね、同意して」。it's cold と言い切るより、否定疑問にすると相手を巻き込める。日本語の「ない?」と英語の isn't は同じ働きで、否定の形をした同意の求め。", category: 'suggestion', month: '2026-10' },
    { daySlot: 10, japanese: 'いいよね、これ', english: [
        "nice, right?",
        "this is nice, isn't it?",
        "this is really nice, isn't it, I could stay here all day",
        "this is nice, isn't it. I'm asking but I'm not really asking. I'm saying it out loud so you'll say it back and then we'll both have said it and it'll be true. that's how nice works. it needs a witness."
    ], context: "「〜だよね」は付加疑問。this is nice, isn't it? で、言い切った後に短い疑問を足して同意を求める。主語と動詞を否定にして繰り返す型。日本語は「ね」一語で済むところを、英語は文末に小さな疑問文を作る。", category: 'opinion', month: '2026-10' },
    { daySlot: 10, japanese: '言ったよね？', english: [
        "I told you, didn't I?",
        "I told you this, didn't I?",
        "I told you this would happen, didn't I?",
        "I told you, didn't I. I'm not going to say it again. I'm just going to stand here with the face of someone who told you. you know the face. you've seen it before. you'll see it again."
    ], context: "過去形の付加疑問は didn't。I told you, didn't I? で「言ったよね?」。動詞に合わせて付加の助動詞を選ぶ、が骨格。日本語は「ね」一つだが、英語は元の文の動詞・時制を尻尾で反射させる。", category: 'shutdown', month: '2026-10' },
    { daySlot: 10, japanese: '来ないの？', english: [
        "not coming?",
        "aren't you coming?",
        "aren't you coming, we're all waiting for you",
        "aren't you coming? we've been standing outside for ten minutes. someone said you were getting your coat. that was ten minutes ago. how far away is the coat. is the coat in another building."
    ], context: "「来ないの?」は否定疑問で、「来ると思っていたのに」の含みがある。aren't you coming? で驚きと確認。are you coming? だと純粋な質問。日本語の「ないの?」と英語の aren't は、期待が裏切られそうな時の同じ形。", category: 'suggestion', month: '2026-10' },
    { daySlot: 10, japanese: 'できるよね？', english: [
        "you can, right?",
        "you can do it, can't you?",
        "you can handle this, can't you, I'm counting on you",
        "you can do this, can't you. I'm asking in the way where the answer is yes. I don't have a plan for no. no would require a different afternoon and I've already given this afternoon away. so. yes. right."
    ], context: "can の付加疑問は can't。you can, can't you? で「できるよね?」。助動詞があればその助動詞で反射する。日本語の「よね」は万能だが、英語は元の文に合わせて形が変わる。この反射の仕組みが付加疑問の骨格。", category: 'request', month: '2026-10' },
    { daySlot: 10, japanese: '知らなかったの？', english: [
        "you didn't know?",
        "wait, you didn't know?",
        "wait, you didn't know, I thought everyone knew",
        "you didn't know? I thought it was common knowledge. I thought it was the kind of thing that's in the air, that people just absorb. apparently not. apparently I've been walking around assuming things about the air."
    ], context: "「知らなかったの?」は否定疑問で驚きを表す。didn't you know? が正式だが、話し言葉は you didn't know? と平叙文を上げ調子で言う。語順を変えずに疑問にするのは、英語の話し言葉の骨格の一つ。", category: 'reaction', month: '2026-10' },
    { daySlot: 10, japanese: 'まずくない？', english: [
        "that's bad, right?",
        "that's not good, is it?",
        "that's not good, is it, should we tell someone?",
        "that's not good, is it. I'm looking at you because you know more than me and your face isn't doing the thing faces do when things are fine. your face is doing a different thing. say the thing your face is saying."
    ], context: "否定文の付加疑問は肯定で返す。that's not good, is it? で「まずいよね?」。元の文が否定なら尻尾は肯定、肯定なら否定。この裏返しが型。日本語の「ない?」は一方向だが、英語は元の文の極性を反転させる。", category: 'opinion', month: '2026-10' },
    { daySlot: 10, japanese: '行ったことあるよね？', english: [
        "you've been, right?",
        "you've been there, haven't you?",
        "you've been there before, haven't you, what's it like?",
        "you've been, haven't you. I feel like you told me about it. or someone told me. or I dreamed it. either way you're the person I associate with that place, so you're the person I'm asking. what's it like."
    ], context: "現在完了の付加疑問は haven't。you've been, haven't you? で「行ったことあるよね?」。have を反射させる。日本語は「よね?」だが、英語は文の助動詞をそのまま尻尾で使う。助動詞が何かを見抜けば、付加疑問は自動で作れる。", category: 'suggestion', month: '2026-10' },
    { daySlot: 10, japanese: '嘘でしょ？', english: [
        "no way",
        "you're kidding, right?",
        "you're kidding, right, tell me you're kidding",
        "you're kidding. right. you're kidding and in a second you'll laugh and I'll laugh and we'll move on. any second now. I'm waiting for the laugh. the laugh isn't coming. why isn't the laugh coming."
    ], context: "「嘘でしょ?」は英語では you're kidding, right? と、断定してから right? で確認する。right? は万能の付加疑問で、助動詞を考えずに済む簡易版。正式な付加疑問が作れなくても、right? を足せば同じ働きをする。", category: 'reaction', month: '2026-10' },
    { daySlot: 10, japanese: 'そう思わない？', english: [
        "don't you think?",
        "don't you think so?",
        "don't you think so, or am I the only one?",
        "don't you think? I've been saying it for a week and everyone nods and nobody agrees. nodding isn't agreeing. nodding is waiting for me to finish. so I'm asking directly. do you actually think so. or are you nodding."
    ], context: "「そう思わない?」は否定疑問の代表。don't you think? で「思うよね?」と同意を求める。do you think? だと意見を聞くだけ。否定を頭に置くことで、自分はそう思っていると先に示す。日本語の「ない?」と完全に同じ骨格。", category: 'suggestion', month: '2026-10' },

    // ── Day 11 ── 末尾焦点。新しい情報、重い情報を文の最後に置く
    { daySlot: 11, japanese: '来たの、田中さんだった', english: [
        "it was Tanaka",
        "the one who showed up was Tanaka",
        "the one who showed up at the door was Tanaka, of all people",
        "it was Tanaka. I opened the door expecting the delivery guy. I had the face ready for the delivery guy. and standing there, in the rain, holding nothing, was Tanaka. I haven't seen Tanaka in four years."
    ], context: "日本語は「田中さんだった」と最後に人を置く。英語も同じで、the one who showed up was Tanaka と、新情報の Tanaka を文末に置く。Tanaka showed up だと平坦。英語は文末に一番重い情報を置く言語で、この点は日本語と一致する。", category: 'reaction', month: '2026-10' },
    { daySlot: 11, japanese: '問題は金だよ', english: [
        "the problem is money",
        "the problem, as always, is money",
        "the problem isn't the plan, the problem is money",
        "the problem is money. it's always money. we have the people, we have the idea, we have a room with a whiteboard and the whiteboard is full. what we don't have is the thing that turns the whiteboard into a building."
    ], context: "「問題は金」は英語でも the problem is money。既知の「問題」を頭に、新情報の「金」を最後に。money is the problem と逆にすると、金が話題で問題が新情報になる。何を最後に置くかで、何を伝えたいかが決まる。", category: 'opinion', month: '2026-10' },
    { daySlot: 11, japanese: '欲しいのはそれじゃない', english: [
        "that's not it",
        "that's not what I want",
        "that's not what I want, what I want is something simpler",
        "that's not what I want. I know I said it was. I was wrong about what I wanted, which happens more than I'd like. what I want is simpler than that. smaller. the kind of thing you'd overlook. that one."
    ], context: "「欲しいのは」を what I want と名詞節にして頭に置き、中身を最後に置く。what I want is X で、X が焦点になる。I want X だと平坦。日本語の「〜のは〜だ」の強調構文と、英語の what 節は同じ末尾焦点の骨格。", category: 'shutdown', month: '2026-10' },
    { daySlot: 11, japanese: '一番大事なのは時間', english: [
        "what matters is time",
        "what matters most is time",
        "what matters most here isn't money, it's time",
        "what matters is time. we can find money. money is annoying but it exists somewhere. time doesn't exist somewhere. time is the thing that's leaving while we talk about money. so. time. that's the one."
    ], context: "「一番大事なのは」を what matters most と頭に置き、答えを最後に置く。time matters most と言うと、time が話題になり強調が消える。英語は答えを文末に置くことで強調する。日本語の「〜のは〜」と同じ骨格が、英語では what 節。", category: 'opinion', month: '2026-10' },
    { daySlot: 11, japanese: 'やったの、俺', english: [
        "that was me",
        "yeah, that was me",
        "that was me, sorry, I should have said something",
        "that was me. I'm saying it now because you're about to blame the wrong person and the wrong person looks nervous. it was me. I did the thing. I did it on Tuesday and I've been quiet since. quiet's over."
    ], context: "「やったの、俺」は日本語でも俺が最後。英語も that was me と me を文末に置く。I did it だと I が頭に来て軽い。自白でも自慢でも、英語は名指しを最後に回す。文末に置くだけで、その語が重くなる。", category: 'reaction', month: '2026-10' },
    { daySlot: 11, japanese: '会ったの、駅で', english: [
        "at the station",
        "we ran into each other at the station",
        "we ran into each other at the station, of all places",
        "at the station. of all places. I've walked through that station a thousand times and never seen anyone I know. and today, at the worst possible moment, with the worst possible hair, there she was. by the ticket machine."
    ], context: "「駅で」を最後に置いて場所を焦点にする。at the station, we ran into each other だと場所が背景になる。we ran into each other at the station だと場所が落ちてくる。同じ語順の中で、最後に来た語が一番重い。", category: 'reaction', month: '2026-10' },
    { daySlot: 11, japanese: '足りないのは人手', english: [
        "we're short on people",
        "what we're short on is people",
        "what we're short on isn't ideas, it's people",
        "what we're short on is people. not ideas. we have ideas. we have a folder of ideas nobody has time to open. what we don't have is the hands to open the folder. so before we add to the folder, let's find hands."
    ], context: "「足りないのは」も what 節で頭に出し、答えを最後に。what we're short on is people。people are what we're short on と逆にもできるが、焦点が変わる。英語は語順を組み替えて、最後に置く語を選ぶ。", category: 'opinion', month: '2026-10' },
    { daySlot: 11, japanese: '言いたいのはそこじゃない', english: [
        "that's not the point",
        "that's not the point I'm making",
        "that's not the point, the point is we never asked",
        "that's not the point. you're arguing with a sentence I didn't say. the sentence I said is smaller. the point is we never asked. that's it. not who, not why. we didn't ask. everything else is noise."
    ], context: "「言いたいのは」を the point is と置き、中身を最後に。the point is X で、X が焦点。日本語の「そこじゃない」の「そこ」は英語では the point で、頭に置いて話の重心を示してから、最後に本当の重心を落とす。", category: 'shutdown', month: '2026-10' },
    { daySlot: 11, japanese: '選んだのは自分だから', english: [
        "I chose this",
        "this was my choice",
        "this was my choice, so I'm not going to complain",
        "this was my choice. nobody pushed me. I looked at the options, I looked at this one, and I said this one. so when it's hard, and it's hard now, I don't get to act surprised. I get to keep going. that's what choosing buys you."
    ], context: "「選んだのは自分」は日本語では自分が最後。英語は this was my choice と choice を最後に置く。I chose this でも通じるが、my choice を文末に置くと責任の所在が重くなる。誰の、を最後に置く英語の骨格。", category: 'opinion', month: '2026-10' },
    { daySlot: 11, japanese: '驚いたのはそこ', english: [
        "that's the surprising part",
        "that's what surprised me",
        "that's what surprised me, not the price, the timing",
        "that's what surprised me. not the price. I expected the price. what I didn't expect was that they'd tell me on a Friday at five, like they'd been holding it all week waiting for the moment I'd have no one to call."
    ], context: "「驚いたのは」も what 節。what surprised me was the timing で、timing が焦点。the timing surprised me だと平坦。英語は主語を長くして答えを短く最後に置くことで、焦点を作る。日本語の「〜のは〜」構文が英語では what 節に対応する。", category: 'reaction', month: '2026-10' },

    // ── Day 12 ── There's。「ある」「いる」を、存在で文を始める
    { daySlot: 12, japanese: '問題がある', english: [
        "there's a problem",
        "there's a bit of a problem",
        "there's a bit of a problem with the schedule",
        "there's a problem. I'm going to say it plainly because the last time I softened it, nobody heard it. the schedule doesn't work. it never worked. we've been pretending, and the pretending has a deadline, and the deadline is Friday."
    ], context: "「問題がある」の「ある」を英語は there's で言う。a problem exists とは言わない。there は場所を指さず、存在を切り出すだけの文頭語。日本語の「〜がある」と英語の there's は同じ役だが、英語は文頭に来る。存在を宣言してから中身を言う型。", category: 'opinion', month: '2026-10' },
    { daySlot: 12, japanese: '誰かいる？', english: [
        "anyone there?",
        "is anyone there?",
        "hello, is anyone there, I'm looking for the manager",
        "is anyone there? I've been standing at this counter for five minutes. there's a bell. I rang the bell. the bell made a sound and nothing else happened. so either the bell is decorative or everyone left. hello."
    ], context: "「誰かいる?」は is there anyone? で、there を疑問にする。is anyone? とは言えない。存在を聞くときは there が要る。日本語は「いる?」で済むが、英語は there と主語の二つで存在の疑問を作る。", category: 'suggestion', month: '2026-10' },
    { daySlot: 12, japanese: '時間ないよ', english: [
        "there's no time",
        "there's no time for that",
        "there's no time for that, we leave in five minutes",
        "there's no time. I know you want to check it again. I know checking feels responsible. but the car is outside, the driver is looking at his watch, and the thing you want to check has been checked. by me. twice."
    ], context: "「時間がない」は there's no time。no を there's の後ろに置いて、存在の否定にする。we don't have time でも通じるが、there's no time のほうが「時間という物が存在しない」で強い。存在の否定は there's no で始める。", category: 'shutdown', month: '2026-10' },
    { daySlot: 12, japanese: 'やることあるんだよね', english: [
        "there's stuff to do",
        "there's a lot to do",
        "there's a lot to do before Friday, so I can't stay long",
        "there's a lot to do. not a lot like a full day. a lot like the list has a second page and the second page has small handwriting. so I'll stay for one drink. one. and then the second page and I have a date."
    ], context: "「やることある」は there's a lot to do。存在文に to 不定詞を足して「するべきことがある」。I have things to do より、there's のほうが「状況としてやることが存在する」感じ。自分の都合を、存在の形にして言える。", category: 'shutdown', month: '2026-10' },
    { daySlot: 12, japanese: 'いい店あるよ', english: [
        "there's a good place",
        "there's a good place near here",
        "there's a good place near here, I'll take you sometime",
        "there's a place. small, no sign, you'd walk past it. I walked past it for a year. and then someone dragged me in and now I go twice a week. I'll take you. but you have to promise not to tell anyone. it's small for a reason."
    ], context: "「いい店ある」は there's a good place。I know a good place と自分を主語にもできるが、there's だと店の存在そのものを差し出す形。何かを勧めるとき、英語は there's で存在を先に置く。", category: 'suggestion', month: '2026-10' },
    { daySlot: 12, japanese: 'もう一つあって', english: [
        "there's one more thing",
        "oh, and there's one more thing",
        "oh, and there's one more thing, and you're not going to like it",
        "there's one more thing. I saved it for last because it's the one you'll react to, and I wanted the other things to land first. they landed. now. this one. sit down. it's not terrible. it's just not small."
    ], context: "「もう一つ」を there's one more thing と存在文で切り出す。話を足すときの決まり文句。I have one more thing でも通じるが、there's のほうが「事実として一つ残っている」の客観性が出る。存在文は話題の追加にも使う。", category: 'filler', month: '2026-10' },
    { daySlot: 12, japanese: '理由があるんだよ', english: [
        "there's a reason",
        "there's a reason for that",
        "there's a reason for that, and it's not what you think",
        "there's a reason. I know it looks random. I know it looks like I forgot. I didn't forget. I chose. and the choosing had a reason behind it, and the reason is boring, but it's a reason, and if you sit down I'll tell you."
    ], context: "「理由がある」は there's a reason。I have a reason だと自分の理由、there's a reason だと理由が客観的に存在する。存在文にすることで、自分の弁解ではなく事実の提示に見える。同じ内容でも、there's は一歩引いた形になる。", category: 'opinion', month: '2026-10' },
    { daySlot: 12, japanese: '違いがわからない', english: [
        "there's no difference",
        "I can't see the difference",
        "I can't see any difference, are you sure they're not the same?",
        "there's no difference. you've shown me both three times and I've nodded three times and I'm done nodding. they're the same. one is the other. if there's a difference, it's a difference for people with better eyes than mine."
    ], context: "「違いがない」は there's no difference。存在の否定で「違いが存在しない」。they're the same と言い換えることもできるが、there's no で存在を消すほうが直接的。日本語の「〜がない」を英語は there's no に置き換える、が基本の骨格。", category: 'opinion', month: '2026-10' },
    { daySlot: 12, japanese: '手はある', english: [
        "there's a way",
        "there's always a way",
        "there's always a way, we just haven't found it yet",
        "there's a way. I don't know it yet. but I've been in rooms like this before, rooms where everyone's quiet because the obvious way just died, and something always shows up. it's ugly and it works. give it an hour."
    ], context: "「手はある」の「ある」も there's。there's a way で「方法が存在する」。we can find a way だと自分たちの動作になるが、there's a way は方法そのものの存在を宣言する。希望を言うとき、英語は there's で存在から入る。", category: 'opinion', month: '2026-10' },
    { daySlot: 12, japanese: '何かあった？', english: [
        "something wrong?",
        "is something wrong?",
        "is something wrong, you've been quiet all morning",
        "is something wrong? you don't have to say. but you've been staring at the same page for an hour and the page hasn't changed and neither have you. so if something's there, I'm here. and if nothing's there, I'll shut up."
    ], context: "「何かあった?」は is something wrong? で、存在文の疑問。is there something wrong? が完全形で、there を落とした短い形が口語。日本語の「あった?」は過去形だが、英語は今の状態を聞くので現在形。存在を今の形で問う。", category: 'suggestion', month: '2026-10' },
];
