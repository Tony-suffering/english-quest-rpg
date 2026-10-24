/**
 * 142 - TOEIC酒場
 * TOEIC 900点の男が「TOEIC酒場」というアプリを作り始めた話。スコアはあるのに喋れない矛盾。
 */

import { JournalEntry } from '../types';

export const toeicBarLaunchEntry: JournalEntry = {
    id: '142',
    date: '2026-03-18',
    title: 'TOEIC酒場 ― 900点なのに喋れない男がアプリを作り始めた',
    summary: 'TOEIC 900点。リーディング満点近い。リスニングもほぼ完璧。でも目の前のアメリカ人に「Where are you from?」って聞かれて3秒フリーズした。テストの点数と実力は別物。だからアプリを作ることにした。',
    featured: false,
    readTime: 6,
    businessTags: ['英語学習', 'プロダクト開発', '自己投資'],
    techTags: ['TOEIC', 'Next.js', 'ゲーミフィケーション'],

    // ===== Piece 1: Japanese Journal =====
    conversation: `
## 900点の壁

TOEIC 900点。

言うと「すごい」って言われる。「英語ペラペラじゃん」って。

ペラペラじゃない。全然ペラペラじゃない。

---

## 4技能のうち3つはクリアした

リーディング。問題ない。英語のドキュメントは毎日読んでる。技術文書、Reddit、ニュース。読む分には困らない。

リスニング。まあまあ。ポッドキャストは7割聞き取れる。ネイティブ同士の雑談だと5割に落ちる。でもTOEICのリスニングは余裕。あれは綺麗すぎる英語。

ライティング。仕事で毎日書いてる。メール、PR、ドキュメント。英語で書くのは日常。

スピーキング。**死んでる。**

---

## フリーズ事件

先月、居酒屋で隣に座ったアメリカ人。

「Hey, where are you from?」

3秒フリーズした。

3秒。Where are you from。中1レベルの質問に3秒。

頭の中では答えがある。「I'm from Osaka.」簡単。でも口が動かない。音声出力のパイプラインが詰まってる。脳内にはデータがあるのに、APIが500返してる。

結局「Ah... Osaka.」って出た。主語なし。3秒遅延。

900点の実力。

---

## テストの点数と実力は別物

TOEICは**受信テスト**。聞く。読む。マークシートを塗る。それだけ。

**発信テスト**がない。喋る、書くはL&Rに含まれてない。

900点は「英語を受信する力が高い」という証明。受信だけ。

FMラジオの性能がいい車みたいなもん。電波はバリバリ受信する。でもクラクションが壊れてる。相手に何も伝えられない。

---

## なぜアプリを作るのか

自分が欲しいから。

TOEIC対策アプリは山ほどある。英会話アプリも山ほどある。でも「TOEICのスコアを取りつつ、同時にスピーキングの基礎も叩き込む」アプリがない。

「TOEICの語彙をそのまま会話で使えるようにする」アプリがない。

TOEICで覚えた "probationary" を、実際の会話でどう使うか教えてくれるアプリがない。

なければ作る。プログラマーの正しい反応。

---

## TOEIC酒場というコンセプト

名前は「TOEIC酒場」にした。

なぜ酒場か。

居酒屋で英語を教わる感覚。教科書じゃなくて、隣の席の帰国子女が「あー、それはこう言うんだよ」って教えてくれる感じ。

堅くない。テストっぽくない。でも中身はガチ。

コルクじじいとAIタクミっていうキャラクターが掛け合いで教える。じじいが経験で語り、タクミがデータで補足する。

居酒屋だからBGMも流れる。勉強してる感覚がない。飲みながら英語の話聞いてる感覚。

---

## 600個のフレーズ

30日分。1日20個。合計600。

TOEICに出る単語とフレーズを、全部会話で使える形に変換した。

"probationary" → 「試用期間の」って覚えるんじゃなくて、実際の会話シーンで使う文ごと覚える。

"amenity" → ホテルのアメニティじゃなくて、「この街はamenityが充実してる」みたいな使い方まで。

テストで点を取るためだけの英語じゃない。使える英語にする。

---

## ランダムシャッフルという設計判断

最初は「今日はDay 5の20個」みたいにしてた。

やめた。ランダムシャッフルにした。

理由：1日サボると「今日の分」と「昨日の分」が溜まる。2日サボると3日分。この**借金感**が人を殺す。

ランダムなら借金がない。開いた瞬間にシャッフルされた20個が出る。昨日やってなくても関係ない。今日開いた。それだけでいい。

継続のハードルを下げる設計。サボっても罪悪感ゼロ。

---

## 今日やったこと

朝から晩までコーディング。

チュートリアル作った。BGM入れた。音量調整した。キャラクター詳細ページ直した。IS_PUBLICのバグ直した。Welcome Flowの誘導先変えた。演出の表示/非表示を切り替えた。

全部1人。デザインも実装もデバッグも。

パチンコ式学習の応用。スロット演出。レベルアップ。連荘チェーン。全部入り。

**900点の男が、900点じゃ足りないから、自分でアプリを作ってる。**

これが答え。
`,

    // ===== Piece 2: Memoria (SAME topic as journal) =====
    conversationData: {
        english: [
            { speaker: 'male', text: "So I got a TOEIC score back." },
            { speaker: 'female', text: "Oh yeah? How'd you do?" },
            { speaker: 'male', text: "Nine hundred." },
            { speaker: 'female', text: "That's amazing!" },
            { speaker: 'male', text: "Is it though?" },
            { speaker: 'female', text: "...what?" },
            { speaker: 'male', text: "Like -- OK so on paper, right, nine hundred is great. Reading's basically perfect, listening's -- I mean, I can follow along fine. Tests are clean. But then, um, last month I'm sittin' in an izakaya, and this American dude sits down next to me and goes, 'Hey, where are you from?'" },
            { speaker: 'female', text: "And?" },
            { speaker: 'male', text: "Three seconds. I froze for three full seconds." },
            { speaker: 'female', text: "On 'where are you from'?" },
            { speaker: 'male', text: "On 'where are you from.' That's -- that's a middle school question. First year. And my brain just... buffered. Like, I had the answer, it's right there, 'I'm from Osaka,' but the words wouldn't -- they just wouldn't come out." },
            { speaker: 'female', text: "Wait, so your reading and listening are that high, but you can't actually speak?" },
            { speaker: 'male', text: "That's exactly it. And I think -- I've been thinkin' about this a lot, actually. TOEIC L&R is a receiving test. You listen, you read, you bubble in answers. There's no output. Zero." },
            { speaker: 'female', text: "It's like -- what, a radio that can't broadcast?" },
            { speaker: 'male', text: "That's -- yeah, that's actually perfect. Great antenna, broken microphone. I can pick up every station, can't send a signal. And people see nine hundred and they go, 'Oh you must be fluent,' and I'm standin' there like... define fluent. 'Cause if fluent means understanding, sure. If fluent means speakin', I'm, uh -- I'm cooked." },
            { speaker: 'female', text: "Ha! So what are you doin' about it?" },
            { speaker: 'male', text: "Building an app." },
            { speaker: 'female', text: "Of course you are." },
            { speaker: 'male', text: "I looked at what's out there, right? There's TOEIC prep apps -- flash cards, mock tests, vocabulary lists. And there's conversation apps -- shadowing, chatbots, whatever. But nobody's connectin' the two. Nobody's takin' TOEIC vocabulary and showin' you how to actually USE it in a real conversation." },
            { speaker: 'female', text: "Like, the word comes up on the test, but you never practice sayin' it." },
            { speaker: 'male', text: "Exactly. You learn 'probationary' for the test. You know it means trial period. But can you -- have you ever actually SAID that word out loud? In a sentence? With a real human?" },
            { speaker: 'female', text: "Probationary. Um, no. Probably not." },
            { speaker: 'male', text: "Right? And there's six hundred of these. Six hundred words and phrases that TOEIC tests you on, and I'm repackaging all of 'em into, like, situations. Actual conversation contexts. Not 'probationary means trial period, memorize it.' More like, 'your coworker says the new hire's still on probation, and here's how you respond.'" },
            { speaker: 'female', text: "That's actually cool. What's the app called?" },
            { speaker: 'male', text: "TOEIC酒場." },
            { speaker: 'female', text: "Izakaya TOEIC?" },
            { speaker: 'male', text: "Yeah. 'Cause the whole vibe is -- it's not a classroom. It's like sittin' at a bar and the person next to you happens to be really good at English, and they're just casually teachin' you stuff while you drink. That's the energy." },
            { speaker: 'female', text: "I love that. So it doesn't FEEL like studying." },
            { speaker: 'male', text: "It shouldn't feel like studying. BGM plays, there's characters bantering, you're tappin' cards, slot machines are goin' off -- it's half game, half bar, zero percent textbook." },
            { speaker: 'female', text: "Hold on -- slot machines?" },
            { speaker: 'male', text: "So, um, I kinda went overboard. Every time you level up a card, a slot machine spins. You can hit LEGENDARY at like half a percent odds. Chain enough level-ups and you trigger FEVER MODE, screen goes gold, special BGM kicks in --" },
            { speaker: 'female', text: "You built a pachinko parlor inside a study app." },
            { speaker: 'male', text: "I -- yeah. I did. And it works. People actually keep tappin' because they wanna see what the slot lands on." },
            { speaker: 'female', text: "That's insane. In a good way." },
            { speaker: 'male', text: "The key decision I made today was the shuffle thing though." },
            { speaker: 'female', text: "Shuffle?" },
            { speaker: 'male', text: "Originally it was 'Day 5, here's your twenty words.' Structured. Sequential. And then I realized -- if you skip a day, now you've got yesterday's batch PLUS today's. Skip two days, three batches. That guilt piles up fast and people just... quit." },
            { speaker: 'female', text: "The debt spiral." },
            { speaker: 'male', text: "The debt spiral! That's exactly -- so I scrapped the daily thing. Now it's random shuffle. Open the app, boom, twenty random cards. Don't matter if you haven't opened it in a week. No backlog. No guilt. Just... here's today's batch, tap away." },
            { speaker: 'female', text: "Smart. So there's no punishment for skippin'." },
            { speaker: 'male', text: "Zero. And that's the whole point. The TOEIC grind already feels like punishment. The app should feel like relief." },
        ],
        japanese: [
            { speaker: 'male', text: "TOEICの結果が返ってきた。" },
            { speaker: 'female', text: "おー、どうだった？" },
            { speaker: 'male', text: "900点。" },
            { speaker: 'female', text: "すごいじゃん！" },
            { speaker: 'male', text: "...すごいかな？" },
            { speaker: 'female', text: "...え？" },
            { speaker: 'male', text: "いや、紙の上ではさ、900って立派なんだけど。リーディングはほぼ満点、リスニングも -- まあ普通に聞き取れる。テストは問題ない。でも先月、居酒屋に座ってたら、隣のアメリカ人が「Hey, where are you from?」って。" },
            { speaker: 'female', text: "で？" },
            { speaker: 'male', text: "3秒フリーズした。" },
            { speaker: 'female', text: "「where are you from」で？" },
            { speaker: 'male', text: "「where are you from」で。中1レベル。1年生の質問。脳がバッファリングした。答えは頭にある、「I'm from Osaka」、あるのに、口から -- 出てこない。" },
            { speaker: 'female', text: "え、リーディングとリスニングはそんなに高いのに、喋れないの？" },
            { speaker: 'male', text: "そう。で、ずっと考えてたんだけど。TOEIC L&Rって受信テストなんだよ。聞いて、読んで、マークシート塗る。出力がゼロ。" },
            { speaker: 'female', text: "つまり -- 何、電波は受信するけど放送できないラジオ？" },
            { speaker: 'male', text: "それ完璧。アンテナ最高、マイク故障。全局受信できるけど、信号が送れない。で、みんな900点って聞くと「ペラペラでしょ」って。いや、ペラペラの定義による。理解がペラペラなら、うん。喋りがペラペラかって言われたら... 終わってる。" },
            { speaker: 'female', text: "あはは！で、どうすんの？" },
            { speaker: 'male', text: "アプリ作る。" },
            { speaker: 'female', text: "やっぱり。" },
            { speaker: 'male', text: "既存のアプリ調べたんだけどさ。TOEIC対策アプリはある。フラッシュカード、模試、単語帳。英会話アプリもある。シャドーイング、チャットボット。でもその2つを繋いでるやつがない。TOEICの語彙を実際の会話でどう使うか見せてくれるやつが。" },
            { speaker: 'female', text: "テストには出るけど、実際に口にしたことはない、みたいな。" },
            { speaker: 'male', text: "そう。「probationary」をテストのために覚える。試用期間って意味だって分かる。でも、その単語を実際に声に出したことある？文の中で？人間相手に？" },
            { speaker: 'female', text: "probationary。うーん、ないかも。" },
            { speaker: 'male', text: "でしょ。で、こういうのが600個ある。TOEICが出す600個の語彙とフレーズを全部、状況に変換してる。会話の文脈に。「probationary = 試用期間、暗記」じゃなくて、「同僚が新入社員のこと話してて、まだprobationだって、そこにどう返す？」みたいな。" },
            { speaker: 'female', text: "それ面白い。名前は？" },
            { speaker: 'male', text: "TOEIC酒場。" },
            { speaker: 'female', text: "居酒屋TOEIC？" },
            { speaker: 'male', text: "そう。雰囲気が教室じゃなくて、バーで隣に座った人がたまたま英語うまくて、飲みながら教えてくれる感じ。そのエネルギー。" },
            { speaker: 'female', text: "いいね。勉強してる感じがしない。" },
            { speaker: 'male', text: "勉強感ゼロ。BGM流れてて、キャラクターが掛け合いしてて、カードタップして、スロット回って -- 半分ゲーム、半分バー、教科書ゼロパーセント。" },
            { speaker: 'female', text: "ちょっと待って -- スロット？" },
            { speaker: 'male', text: "あー、ちょっとやりすぎた。カードのレベル上げるたびにスロット回る。LEGENDARYが0.5%で出る。連続レベルアップでFEVER MODEに入って、画面金色、専用BGM --" },
            { speaker: 'female', text: "勉強アプリの中にパチンコ屋を作った。" },
            { speaker: 'male', text: "...うん。作った。で、効くんだよ。みんなスロットの結果見たくてタップし続ける。" },
            { speaker: 'female', text: "やばい。いい意味で。" },
            { speaker: 'male', text: "でも今日の一番大事な判断はシャッフル。" },
            { speaker: 'female', text: "シャッフル？" },
            { speaker: 'male', text: "最初は「Day 5、今日の20個」みたいにしてた。順番通り。でも気づいた -- 1日サボると昨日の分と今日の分が溜まる。2日サボると3日分。その罪悪感がどんどん積み上がって、みんな... やめる。" },
            { speaker: 'female', text: "借金スパイラル。" },
            { speaker: 'male', text: "借金スパイラル！それ。だから日別をやめた。ランダムシャッフル。アプリ開く、ドン、ランダム20枚。1週間開いてなくても関係ない。溜まらない。罪悪感なし。今日の分、タップしろ、以上。" },
            { speaker: 'female', text: "賢い。サボっても罰がない。" },
            { speaker: 'male', text: "ゼロ。で、それが全て。TOEICの勉強はもう十分罰ゲーム。アプリは救いであるべき。" },
        ],
        tone: 'humorous' as const,
        generatedAt: new Date('2026-03-18'),
    },

    // ===== Piece 3: Tangent (COMPLETELY DIFFERENT topic) =====
    tangentData: {
        english: [
            { speaker: 'male', text: "I've been thinking about laundromats." },
            { speaker: 'female', text: "Laundromats?" },
            { speaker: 'male', text: "Yeah. Like, um, specifically the ones that are open twenty-four hours. I went to one last night at like two in the morning." },
            { speaker: 'female', text: "Why were you doin' laundry at two AM?" },
            { speaker: 'male', text: "Because I ran out of clean socks. And I'm sittin' there, right, at two AM in this fluorescent-lit laundromat, and there's -- it's just me and this one old guy readin' a newspaper. At two AM. A newspaper." },
            { speaker: 'female', text: "Who reads a newspaper at two AM?" },
            { speaker: 'male', text: "That's what I'm sayin'. And I started -- I couldn't stop thinkin' about, like, what's everyone's story? The people who are at a laundromat at two in the mornin'. 'Cause it's not by choice, right? Nobody PLANS a two AM laundry run." },
            { speaker: 'female', text: "Something went wrong in their day." },
            { speaker: 'male', text: "Exactly. Something broke. And that's, um -- I think laundromats are like the most honest places? Everyone's there because something in their life needs cleaning. It's not glamorous. Nobody posts 'night out at the laundromat' on Instagram." },
            { speaker: 'female', text: "The anti-Instagram spot." },
            { speaker: 'male', text: "Totally. And there's this, uh -- the sound. You ever just sit in a laundromat and listen? The tumbling. It's like -- I dunno, it's almost meditative? This rhythmic thumping, and the machines humming, and the occasional coin clinking. It's weirdly peaceful." },
            { speaker: 'female', text: "You're romanticizing laundry." },
            { speaker: 'male', text: "I am one hundred percent romanticizing laundry and I'm not gonna apologize for it. 'Cause here's the thing -- when you're sittin' there at two AM waitin' for your socks, you've got nothin' to do. No deadlines. No code to push. No one's Slacking you. It's, like, enforced stillness." },
            { speaker: 'female', text: "Enforced stillness. That's... actually nice." },
            { speaker: 'male', text: "Right? And I was thinkin' -- we never give ourselves that. We fill every gap with a phone. Elevator? Phone. Waiting room? Phone. But at the laundromat, my phone was at twelve percent, so I just... sat there. Watched my clothes spin. For forty minutes." },
            { speaker: 'female', text: "Forty minutes of just watching clothes spin." },
            { speaker: 'male', text: "And I thought about things. Like, actually thought. Not scrolled, not consumed, not reacted. Just... sat with my own brain for the first time in maybe a month." },
            { speaker: 'female', text: "That's kinda sad." },
            { speaker: 'male', text: "It IS sad. That it took runnin' out of socks at two AM to force me into sittin' still with my own thoughts. But you know what? I came up with three ideas in that forty minutes. Three actual, usable ideas. 'Cause my brain finally had space." },
            { speaker: 'female', text: "The sock crisis led to creativity." },
            { speaker: 'male', text: "The sock crisis led to creativity! And now I'm, like -- I kinda wanna go back? Not for the laundry. Just for the quiet. And the tumbling sound. And that old guy with his newspaper. He didn't look up once. Not once. I wanna be that guy." },
            { speaker: 'female', text: "Your role model is a two AM laundromat newspaper man." },
            { speaker: 'male', text: "Unbothered. Completely present. Readin' a physical newspaper at two AM while his whites tumble. That man has figured somethin' out that I haven't." },
            { speaker: 'female', text: "Or he just has weird hours." },
            { speaker: 'male', text: "Either way, I respect it. And my socks are clean." },
            { speaker: 'female', text: "The important thing." },
            { speaker: 'male', text: "The only thing that matters." },
        ],
        japanese: [
            { speaker: 'male', text: "コインランドリーについて考えてた。" },
            { speaker: 'female', text: "コインランドリー？" },
            { speaker: 'male', text: "うん、特に24時間営業のやつ。昨日の夜中2時に行ったんだけど。" },
            { speaker: 'female', text: "なんで夜中2時に洗濯してんの？" },
            { speaker: 'male', text: "靴下が尽きたから。で、座ってるわけ、夜中2時に蛍光灯のコインランドリーで。俺と、新聞読んでるおじいさん1人だけ。2時に。新聞。" },
            { speaker: 'female', text: "誰が2時に新聞読むの？" },
            { speaker: 'male', text: "そうなんだよ。で、考え始めちゃって。みんなどういう事情なんだろうって。夜中2時にコインランドリーにいる人たち。自分から来るわけないじゃん。2時に洗濯の予定を立てる人はいない。" },
            { speaker: 'female', text: "その日に何か狂ったんだよ。" },
            { speaker: 'male', text: "そう。何かが壊れた。で、コインランドリーって一番正直な場所だと思う。みんな何かを洗う必要があるから来てる。華やかさゼロ。「今夜はコインランドリー」ってインスタに載せる人いない。" },
            { speaker: 'female', text: "アンチ・インスタスポット。" },
            { speaker: 'male', text: "完全に。で、あの音。コインランドリーに座って聴いたことある？あの回転。なんか -- 瞑想的っていうか。リズミカルなドンドン、機械のブーン、たまにコインのチャリン。不思議と落ち着く。" },
            { speaker: 'female', text: "洗濯をロマンチックにしてる。" },
            { speaker: 'male', text: "100パーセント洗濯をロマンチックにしてて謝る気はない。だってさ、夜中2時に靴下待ってる時、何もすることがない。締め切りない。プッシュするコードない。Slackも来ない。強制的な静寂。" },
            { speaker: 'female', text: "強制的な静寂。それ... 実はいいかも。" },
            { speaker: 'male', text: "でしょ？で、思ったんだけど -- 俺ら自分にそれを与えないよね。隙間は全部スマホで埋める。エレベーター？スマホ。待合室？スマホ。でもコインランドリーではスマホが12%だったから、ただ... 座ってた。洗濯物が回るの見てた。40分間。" },
            { speaker: 'female', text: "40分間、ただ洗濯物が回るのを見てた。" },
            { speaker: 'male', text: "で、考えた。ちゃんと考えた。スクロールじゃなくて、消費じゃなくて、反応じゃなくて。自分の脳とただ座った。たぶん1ヶ月ぶり。" },
            { speaker: 'female', text: "それちょっと悲しいね。" },
            { speaker: 'male', text: "悲しい。夜中2時に靴下が切れないと自分の思考と向き合えないって。でもさ、あの40分で3つアイデア出た。3つの使える、まともなアイデア。脳にやっとスペースができたから。" },
            { speaker: 'female', text: "靴下危機が創造性を生んだ。" },
            { speaker: 'male', text: "靴下危機が創造性を！で、なんか -- また行きたくなってる。洗濯のためじゃなくて。あの静けさのために。回転音。新聞のおじいさん。あの人、一回も顔上げなかった。一回も。あの人になりたい。" },
            { speaker: 'female', text: "ロールモデルが夜中2時のコインランドリーの新聞おじさん。" },
            { speaker: 'male', text: "動じない。完全に今に生きてる。夜中2時に紙の新聞読みながら白い服が回ってる。あの人は俺がまだ分かってない何かを分かってる。" },
            { speaker: 'female', text: "もしくは単に生活リズムが変なだけ。" },
            { speaker: 'male', text: "どっちにしろ尊敬する。で、靴下は綺麗になった。" },
            { speaker: 'female', text: "大事なこと。" },
            { speaker: 'male', text: "それだけが大事。" },
        ],
        tone: 'introspective' as const,
        generatedAt: new Date('2026-03-18'),
    },

    // ===== Piece 4: Pro (Expression Teaching) =====
    englishSummary: {
        title: "Five Expressions from the TOEIC Bar Episode",
        readTime: 6,
        sections: [
            {
                heading: "I'm cooked -- 終わってる、詰んだ",
                paragraphs: [
                    "'I'm cooked.' In today's Memoria, the guy's describin' his speaking ability after scorin' 900 on TOEIC, and he goes, 'If fluent means speakin', I'm cooked.' It's slang that blew up on social media around 2023-2024, but it's been around in Black English for way longer. The image is literally -- you've been cooked. Done. Like a steak that's been on the grill too long. There's no comin' back from that.",
                    "You hear it everywhere now. 'I forgot to save my file and my laptop died. I'm cooked.' 'She asked me what the capital of France was and I said London. Cooked.' It works for any situation where you've failed so completely that there's nothin' left to do. It's resignation with humor. You're not angry, you're not upset -- you're just... done.",
                    "Related: 'I'm toast' (same vibe, slightly older), 'I'm done for' (more dramatic), 'it's over' (final, no humor). Stack 'em by severity: 'I'm toast' is mild, 'I'm cooked' is medium, 'it's over for me' is maximum despair. All casual, all funny, all usable in daily conversation.",
                ],
                japaneseParagraphs: [
                    "\"I'm cooked\" -- 今日のMemoriaで、TOEIC 900取った男がスピーキングについて「If fluent means speakin', I'm cooked」って。2023-2024年にSNSで爆発的に広まったスラングだけど、元々はBlack Englishで昔から使われてた。イメージは文字通り「焼き上がった」。ステーキを焼きすぎた状態。もう戻れない。",
                    "今はどこでも聞く。\"I forgot to save and my laptop died. I'm cooked.\"（保存忘れてPC落ちた。終わった。）完全に失敗して、もうどうしようもない場面で使う。怒りでも悲しみでもない -- ただの諦め。ユーモア付きの敗北宣言。",
                    "仲間の表現: \"I'm toast\"（同じノリ、ちょっと古い）、\"I'm done for\"（もっとドラマチック）、\"it's over\"（最終宣告）。深刻度順: toast < cooked < it's over for me。全部カジュアル、全部面白い、全部日常会話で使える。",
                ],
            },
            {
                heading: "The debt spiral -- 借金スパイラル、負の連鎖",
                paragraphs: [
                    "'The debt spiral.' In the Memoria, they're talkin' about why daily study schedules fail, and she nails it -- 'The debt spiral.' Skip one day, now you owe two days' worth. Skip two, three days' worth. The guilt accumulates, and eventually you just... quit. It's originally a financial term, but people use it for ANYTHING that compounds when you ignore it.",
                    "This pattern -- takin' a financial term and applyin' it to everyday life -- is super common in English. 'I'm emotionally bankrupt.' 'My sleep debt is insane.' 'I'm investin' in this friendship.' English speakers think about EVERYTHING in terms of money, even when no money's involved. If you can do this naturally, you sound incredibly fluent.",
                    "The opposite is 'virtuous cycle' -- where good actions compound into more good actions. 'Exercise gives me energy, which makes me sleep better, which makes me want to exercise. Virtuous cycle.' Debt spiral = things get worse. Virtuous cycle = things get better. Know both.",
                ],
                japaneseParagraphs: [
                    "\"The debt spiral\" -- Memoriaで、なぜ日別の勉強スケジュールが失敗するかの話で彼女が一言。1日サボると2日分の借金。2日サボると3日分。罪悪感が積み上がって、最終的に...やめる。元は金融用語だけど、放置すると複利で膨らむもの全般に使う。",
                    "金融用語を日常に転用するパターン -- 英語では超一般的。\"I'm emotionally bankrupt\"（感情的に破産）。\"My sleep debt is insane\"（睡眠負債がやばい）。\"I'm investin' in this friendship\"（この友情に投資してる）。英語話者はお金が絡まなくても全部お金で考える。これが自然にできると、めちゃくちゃ流暢に聞こえる。",
                    "反対語は \"virtuous cycle\"（好循環）。\"Exercise gives me energy, which makes me sleep better, which makes me want to exercise. Virtuous cycle.\" Debt spiral = 悪くなる。Virtuous cycle = 良くなる。両方セットで覚えておくと便利。",
                ],
            },
            {
                heading: "Went overboard -- やりすぎた、暴走した",
                paragraphs: [
                    "'I kinda went overboard.' In the Memoria, the guy's explainin' his slot machine system and sheepishly admits he went overboard. The image? Literally fallin' over the board -- the side of a ship. You went too far. You crossed the line. You didn't mean to, but here you are, in the water.",
                    "It's the perfect phrase for when you DID too much but you're not really sorry about it. 'I went a little overboard with the decorations.' 'She went overboard on the seasoning.' 'We might've gone overboard with the budget.' There's always this, like, sheepish energy. You know you did too much. You're kinda proud of it. But you're acknowledgin' it wasn't... necessary.",
                    "Variations: 'went a little overboard' (soft), 'went way overboard' (extreme), 'went completely overboard' (no regrets). The word 'kinda' before it is key -- 'I kinda went overboard' has this beautiful ambiguity. Did you go overboard a little? Or are you underselling how much you went overboard? Usually the second one.",
                ],
                japaneseParagraphs: [
                    "\"I kinda went overboard\" -- Memoriaでスロットマシンシステムを説明しながら照れ笑いで「やりすぎた」。イメージは文字通り船の縁(board)から落ちること。行きすぎた。線を越えた。悪気はないけど、気づいたら海の中。",
                    "やりすぎたけど実は反省してない時に最適。\"I went a little overboard with the decorations\"（飾り付けちょっとやりすぎた）。必ずこの「照れ笑い」のエネルギーがある。やりすぎたって分かってる。ちょっと誇りに思ってる。でも必要じゃなかったことは認める。",
                    "バリエーション: \"went a little overboard\"（軽め）、\"went way overboard\"（極端）、\"went completely overboard\"（後悔なし）。前につく \"kinda\" が鍵。\"I kinda went overboard\" -- ちょっとだけやりすぎた？それとも「やりすぎ」を控えめに言ってる？大体後者。",
                ],
            },
            {
                heading: "Enforced stillness -- 強制的な静寂",
                paragraphs: [
                    "From the laundromat Tangent -- 'It's enforced stillness.' He's sittin' in a laundromat at two AM with a dead phone, and he realizes: this is the first time in a month he's been FORCED to be still. Not by choice. By circumstance. Twelve percent battery, nothin' to scroll, just him and his thoughts.",
                    "This isn't a common set phrase you'll find in a dictionary. It's more like -- this is how native speakers BUILD phrases on the fly. 'Enforced' + any noun = 'forced into that state against your will.' 'Enforced fun' -- when your company makes everyone do team building. 'Enforced socializing' -- when you're stuck at a party you didn't wanna go to. 'Enforced simplicity' -- when your budget forces you to keep things basic.",
                    "The key pattern is adjective stacking before nouns. English lets you pile up modifiers in a way Japanese doesn't. 'Weirdly peaceful enforced two-AM stillness.' Every word adds a layer. Get comfortable buildin' these chains and your spoken English gets way more expressive.",
                ],
                japaneseParagraphs: [
                    "Tangentのコインランドリーから -- \"enforced stillness\"（強制的な静寂）。夜中2時にスマホ死にかけで座ってる。1ヶ月ぶりに「動けない」状態を強制された。選んだんじゃない。状況に強制された。12%のバッテリー、スクロールするものなし、自分と思考だけ。",
                    "これは辞書に載ってるセットフレーズじゃない。ネイティブがその場でフレーズを組み立てる方法。\"enforced\" + 名詞 = 「その状態を強制される」。\"Enforced fun\"（会社のチームビルディング）。\"Enforced socializing\"（行きたくないパーティー）。\"Enforced simplicity\"（予算の制約でシンプルにせざるを得ない）。",
                    "核心パターンは名詞の前の修飾語の積み上げ。英語は日本語にない形で修飾語を重ねられる。\"Weirdly peaceful enforced two-AM stillness.\" 一語ごとにレイヤーが増える。この連鎖を組み立てることに慣れると、スピーキングの表現力が一気に上がる。",
                ],
            },
            {
                heading: "Something went wrong in their day -- 何か狂った",
                paragraphs: [
                    "'Something went wrong in their day.' This tiny line from the Tangent is a masterclass in understatement. Why is someone at a laundromat at two AM? Not because they planned it. Because 'something went wrong.' It doesn't specify WHAT. And that vagueness is the entire point.",
                    "English is incredible at this -- sayin' just enough to imply everything. 'Things happened.' 'It didn't go as planned.' 'There was a situation.' These are all ways of acknowledging that something bad occurred WITHOUT getting into details. It's social shorthand. The listener fills in the blanks. And honestly? The imagined version is usually worse than reality, which makes it kinda funny.",
                    "Use this pattern when you don't wanna explain the full story. 'Why are you up at three AM?' -- 'Things... went sideways.' 'Why'd you leave that job?' -- 'Let's just say it didn't work out.' Japanese tends to explain reasons in detail. English lets you leave the mystery. Learn to embrace the vague. It's a superpower.",
                ],
                japaneseParagraphs: [
                    "\"Something went wrong in their day\" -- Tangentのこの一言、アンダーステートメント（控えめな表現）の教科書。なぜ夜中2時にコインランドリーにいるのか？計画したわけじゃない。「何かが狂った」から。何が狂ったかは言わない。その曖昧さが全て。",
                    "英語はこれが天才的にうまい。\"Things happened.\"（色々あった）\"It didn't go as planned.\"（予定通りにいかなかった）\"There was a situation.\"（事態が発生した）。全部「悪いことが起きた」を詳細抜きで認める方法。社会的な速記法。聞き手が空白を埋める。想像の方が大体現実より悪いから、逆に面白い。",
                    "フルで説明したくない時に使うパターン。\"Why are you up at three AM?\" -- \"Things went sideways.\"（色々あって。）日本語は理由を詳しく説明する傾向がある。英語はミステリーを残せる。曖昧さを受け入れることを覚えよう。これはスーパーパワー。",
                ],
            },
        ],
    },
};
