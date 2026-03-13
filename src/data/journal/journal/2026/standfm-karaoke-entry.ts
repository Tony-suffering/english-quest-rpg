/**
 * 138 - Stand.fmカラオケ方式
 * AIの台本を読むだけの男
 */

import { JournalEntry } from '../types';

export const standfmKaraokeEntry: JournalEntry = {
    id: '138',
    date: '2026-03-12',
    title: 'Stand.fmカラオケ方式 ― AIの台本を読むだけの男',
    summary: 'Stand.fmでAIに台本書いてもらって朗読を始めた。日本語と英語を交互に喋る。イカサマだけど口が動き始めた。過去記事には台本不要と気づいて022/023を削除。カラオケ方式 = 人の歌を歌うだけ。',
    featured: false,
    readTime: 5,
    businessTags: ['音声配信', 'AI活用', 'コンテンツ戦略'],
    techTags: ['Stand.fm', 'ChatGPT', 'TTS', '英語学習'],

    // ===== Piece 1: Japanese Journal =====
    conversation: `
## Stand.fmを始めた

始めた、というか始まった。

TOEIC 900。読める。聴ける。書ける。喋れない。この四技能バグを抱えたまま何年も過ぎた。

で、Stand.fmに音声を上げることにした。

## カラオケ方式

仕組みはこう。

1. noteの記事をChatGPTに投げる
2. 日本語と英語が交互に出てくるスクリプトを書いてもらう
3. それを声に出して読む
4. 録音してStand.fmに上げる

以上。

自分で英語を「考えて」ない。AIが書いた英語を「読んでる」だけ。カラオケと同じ。自分の曲じゃない。画面に出てくる歌詞を追ってるだけ。

イカサマか？ イカサマだろう。

でも口は動いてる。

## 口が動き始めた事実

ここが重要。

TOEIC 900点あっても口が開かなかった。脳内に英語のデータはある。でも出力ポートが閉じてる。入力は完璧。出力ゼロ。サーバーは動いてるのにAPIが公開されてない状態。

カラオケ方式のいいところは、考えるプロセスをスキップできること。

普通に英語を喋ろうとすると：

1. 日本語で考える
2. 英語に変換する
3. 文法チェックする
4. 発音を気にする
5. 口が固まる
6. 何も出てこない

カラオケ方式だと：

1. 台本を見る
2. 読む

ステップが2つしかない。脳の負荷が激減する。で、読んでるうちに口の筋肉が英語のリズムを覚え始める。

発音が完璧かどうかは知らない。でも少なくとも音声が出てる。ゼロから1になった。

## 026以降だけでいい

ここでもう一つ気づいた。

noteの記事、全部にスクリプトが必要だと思ってた。でも実際やってみると、026以降の記事にしかスクリプトを書いてない。それ以前の記事は内容が違いすぎて、日英交互のフォーマットに合わない。

で、022と023を削除した。

存在しないスクリプトのために残してた下書きを消した。スッキリした。

## 人の歌を歌う男

考えてみれば、カラオケって最強の学習法かもしれない。

歌が上手い人は最初から作曲してたわけじゃない。人の曲を何百回も歌って、リズムとメロディを体に叩き込んで、そのうち自分のスタイルが出てくる。

英語も同じだろう。

AIが書いた英語を100回読んだら、101回目に自分の言葉が出てくるかもしれない。出てこないかもしれない。

でもゼロ回読むよりはマシだ。

TOEIC 900で喋れない男が、AIの台本をカラオケしてる。ダサいか？ダサいだろう。

でも口は動いてる。昨日まで動いてなかった口が。

それでいい。
`,

    // ===== Piece 2: English Summary (Pro expression teaching) =====
    englishSummary: {
        title: "Five Expressions from the Karaoke Method Episode",
        readTime: 5,
        sections: [
            {
                heading: "Wing It -- ぶっつけ本番でやる",
                paragraphs: [
                    "So in the Memoria, she asks him if he's just gonna wing it on the podcast, and he's like, 'No way, I need a script.' 'Wing it' means doin' somethin' without preparation -- just showin' up and hopin' for the best. The image comes from theater, like an actor standin' in the wings of the stage readin' lines at the last second. It's got this energy of, 'I have no plan and I'm goin' in anyway.'",
                    "You use this ALL the time. 'I didn't study for the presentation so I'm just gonna wing it.' 'We showed up to the campsite without a reservation and winged it.' 'She's great at wingin' it -- gives her best speeches when she hasn't prepared.' Some people are natural wingers. Most of us are not. The beauty of the phrase is it acknowledges the risk while committin' to the action anyway.",
                    "Related: 'Play it by ear' is the softer version -- you have a loose plan but you'll adjust as you go. 'Improvise' is the formal word. 'Fly by the seat of your pants' is more intense -- you're barely in control. And 'ad-lib' is specifically for speech or performance. But 'wing it' is the most common, most casual, and most useful. If you only learn one of these, this is the one.",
                ],
                japaneseParagraphs: [
                    "Memoriaで「台本なしでぶっつけ本番？」って聞かれるシーン。\"Wing it\" = 準備なしでやる。劇場の舞台袖(wings)でギリギリに台詞を読む役者のイメージ。計画ゼロで突入する潔さと無謀さが同居してる表現。",
                    "めちゃくちゃ使う。プレゼンの準備してない時、キャンプ場に予約なしで行った時。\"She's great at winging it\" = あの人はぶっつけ本番が上手い。リスクを認めつつ「でもやる」っていうニュアンスが入ってる。日本語の「出たとこ勝負」に近いけど、もっとカジュアル。",
                    "仲間: \"play it by ear\" = ゆるく計画はあるけど臨機応変に。\"improvise\" = フォーマル版。\"fly by the seat of your pants\" = もっとヤバい、ほぼ制御不能。\"ad-lib\" = スピーチやパフォーマンス限定。\"wing it\" が一番カジュアルで一番頻出。一つだけ覚えるならこれ。",
                ],
            },
            {
                heading: "Shortcut the Process -- 過程をショートカットする",
                paragraphs: [
                    "'You're shortcuttin' the hard part.' In the Memoria, she points out that reading an AI script skips the whole 'think in English' step. That's shortcuttin' the process. You're not eliminatin' the goal -- you still wanna speak English -- but you're findin' a faster path that bypasses the painful middle part. It's not exactly cheatin', but it's, like, definitely in the gray area.",
                    "This phrase works anywhere someone's skippin' steps. 'He shortcut the whole interview process by knowin' the CEO.' 'She shortcut med school by -- actually no, you can't shortcut med school.' 'Companies love to shortcut quality control and then act surprised when stuff breaks.' The nuance shifts dependin' on tone -- it can be clever or lazy, strategic or reckless.",
                    "Close to 'take a shortcut' but not the same. 'Take a shortcut' is more literal -- like a faster route home. 'Shortcut the process' is about skipping STEPS, not distance. 'Cut corners' is the negative cousin -- you're reducin' quality on purpose. 'Hack' is the tech/productivity version -- 'life hack, productivity hack.' And 'game the system' is when you exploit rules without technically breakin' them. The karaoke method is somewhere between a shortcut and a hack.",
                ],
                japaneseParagraphs: [
                    "Memoriaで「英語で考えるステップを飛ばしてる」って指摘されるシーン。\"Shortcut the process\" = 過程を省略する。目標は同じだけど、苦しい中間ステップを迂回してる。チートとは言い切れないけどグレーゾーン。この微妙さが面白い。",
                    "ステップを飛ばす場面なら何でも使える。\"shortcut the interview process\"（面接をすっ飛ばす）。ニュアンスはトーン次第で、賢いにも怠慢にもなる。戦略的にも無謀にもなる。日本語の「近道する」より含みが深い。",
                    "\"take a shortcut\" は物理的な近道。\"shortcut the process\" はステップの省略。\"cut corners\" = わざと品質を下げる（ネガティブ寄り）。\"hack\" = テック/生産性版（ライフハック）。\"game the system\" = ルールを技術的には破らずに悪用する。カラオケ方式はshortcutとhackの間くらい。",
                ],
            },
            {
                heading: "Fake It Till You Make It -- なりきってたら本物になる",
                paragraphs: [
                    "'I mean, isn't this basically fake it till you make it?' That line from the Memoria nails the whole karaoke method philosophy. 'Fake it till you make it' means you act like you already can do somethin', and through the act of pretendin', you eventually become the real thing. You're not lying -- you're rehearsin' a future version of yourself. The line between fakin' and practicin' is thinner than people think.",
                    "This phrase pops up everywhere. Job interviews -- 'I had no idea what I was doin' my first week, total fake it till you make it.' Confidence -- 'She fakes confidence so well that now she actually IS confident.' Public speakin' -- 'Just fake it till you make it, nobody can tell you're nervous.' It's weirdly empowering because it gives you permission to be bad at somethin' while you're learnin' it.",
                    "Related but different: 'Going through the motions' is the depressed version -- you're doin' the actions but with zero intention behind 'em. 'Play the part' is more theatrical. 'Dress for the job you want' is the wardrobe version. And 'practice makes perfect' is the wholesome grandma version of the same idea. But 'fake it till you make it' has this honest, slightly self-deprecating energy that none of the others capture. You're admittin' you're a fraud AND committin' to improvement. That's kinda beautiful.",
                ],
                japaneseParagraphs: [
                    "Memoriaの核心。カラオケ方式 = \"fake it till you make it\"。できるフリをしてるうちに本当にできるようになる。嘘じゃなくて、未来の自分をリハーサルしてる。フリと練習の境界線は思ってるより薄い。",
                    "どこでも出てくる。転職初週「何もわからなかったけどfake it till you make itで乗り切った」。自信「自信あるフリしてたら本当に自信ついた」。人前で話す時「緊張してるのバレないからとりあえず堂々と」。下手でもいいから始めろ、っていう許可証みたいな表現。",
                    "仲間: \"going through the motions\" = 同じ動きだけど心がない（ネガティブ版）。\"play the part\" = 演劇的。\"dress for the job you want\" = 服装版。\"practice makes perfect\" = おばあちゃん版。でも \"fake it till you make it\" だけが持つ自虐的な正直さ -- 「俺はまだ偽物だけど、本物に向かってる」-- は他にない。",
                ],
            },
            {
                heading: "Get the Ball Rolling -- まず動き出す、最初の一歩を踏む",
                paragraphs: [
                    "'At least you're gettin' the ball rolling.' She says this in the Memoria when he's beatin' himself up about not speakin' 'real' English. 'Get the ball rolling' means to start somethin' -- specifically to overcome that initial inertia where nothin' is happening. The ball is heavy. It's sittin' there. Somebody has to push it. Once it's movin', momentum takes over, but that first push? That's the hardest part.",
                    "Super versatile. 'Let's get the ball rolling on this project -- who wants to take the first task?' 'I sent the first email just to get the ball rolling.' 'We need someone to get the ball rolling on the renovation -- once we start, it'll be fine.' It's always about that gap between zero and one, between thinkin' about doin' somethin' and actually doing it.",
                    "'Kick things off' is more energetic -- like startin' a party. 'Break the ice' is specifically for social situations. 'Take the first step' is more serious, more personal. 'Set things in motion' is the formal boardroom version. But 'get the ball rolling' has this physical weight to it -- you can almost feel the effort of pushin' somethin' heavy into motion. And once it's rolling? You can't stop it. That's the promise hidden in the phrase.",
                ],
                japaneseParagraphs: [
                    "Memoriaで「少なくとも動き出してるじゃん」って言われるシーン。\"Get the ball rolling\" = 重いボールを最初に押す。止まってるものを動かすあの最初の一押し。動き始めたら惰性で転がるけど、最初の一押しが一番きつい。",
                    "めちゃくちゃ使える。「このプロジェクト動かそう、誰が最初やる？」「まずメール送って動き出した」。ゼロと1の間、考えてる状態とやってる状態の差。日本語の「まず一歩踏み出す」に近いけど、ボールの重さ（= 腰の重さ）が入ってるのが英語らしい。",
                    "仲間: \"kick things off\" = もっと元気、パーティー開始みたいな。\"break the ice\" = 社交場面限定。\"take the first step\" = もっと真面目、個人的。\"set things in motion\" = 会議室版。\"get the ball rolling\" は物理的な重さを感じる。そして隠された約束 -- 一度転がり出したら止まらない。",
                ],
            },
            {
                heading: "By Feel -- 感覚で、目分量で",
                paragraphs: [
                    "This one's from the Tangent, where his neighbor grandma pours soy sauce into the pot and he asks how much, and she just goes, 'Enough.' She does everything by feel. 'By feel' means relyin' on intuition and experience instead of measurements or instructions. No recipe. No numbers. You just know 'cause you've done it a thousand times. It's the opposite of followin' a manual -- it's knowledge that lives in your hands, not in a book.",
                    "You hear this everywhere. 'She plays guitar by feel -- never took a lesson.' 'He parks by feel, doesn't even look at the mirrors.' 'I season by feel, I dunno how much salt I use.' 'The mechanic diagnosed it by feel -- just listened to the engine for ten seconds.' It's always a flex, whether the person means it or not. Sayin' you do somethin' by feel means you've passed the point where you need instructions. You've internalized it.",
                    "Related: 'By ear' is specifically for music or language -- 'She plays by ear.' 'By instinct' is more about gut reaction, less about learned skill. 'Eyeball it' is the visual version -- 'Just eyeball the measurements.' 'Go with your gut' is for decisions, not skills. And 'wing it' -- which we already covered -- is about LACK of preparation, while 'by feel' is about having SO MUCH experience that preparation is unnecessary. Grandma's not wingin' it. She's beyond recipes. That's the difference.",
                ],
                japaneseParagraphs: [
                    "Tangentの肉じゃが回から。田中さんが醤油をドバッと入れて「どのくらい？」って聞いたら「ええぐらい」。全部を感覚でやる。\"By feel\" = 計量もレシピも使わない、経験と勘だけで動く。マニュアルの真逆。知識が本じゃなくて手に住んでる状態。",
                    "どこでも使う。「ギターを感覚で弾く（レッスン受けてない）」「駐車を感覚でやる（ミラー見ない）」「味付けは目分量」「整備士がエンジン10秒聴いただけで故障わかった」。意図してなくてもマウントになる表現。\"by feel\" = 説明書がいらないレベルに達してる。体に染み込んでる。",
                    "仲間: \"by ear\" = 音楽・言語限定（耳で覚える）。\"by instinct\" = 学んだスキルより直感反応。\"eyeball it\" = 視覚版の目分量（\"Just eyeball the measurements\"）。\"go with your gut\" = 決断の時の直感。\"wing it\" はさっきやったけど準備不足の話。\"by feel\" は経験がありすぎて準備が不要になった状態。田中さんはwing itしてない。レシピの先にいる。この違いが大事。",
                ],
            },
        ],
    },

    // ===== Piece 3: Memoria Conversation (Same topic: Stand.fm karaoke method) =====
    conversationData: {
        english: [
            { speaker: 'male', text: "So I, uh -- I started a podcast. Kind of." },
            { speaker: 'female', text: "Kind of?" },
            { speaker: 'male', text: "On Stand.fm. And I say 'kind of' because -- so here's the thing. I'm not actually SAYING anything original. I take my note articles, right, the stuff I already wrote, and I feed it to ChatGPT, and ChatGPT writes me a script where the Japanese and English alternate. Like, a paragraph in Japanese, then the same idea in English, then Japanese again." },
            { speaker: 'female', text: "OK." },
            { speaker: 'male', text: "And then I just... read it. Out loud. Into a microphone. That's the whole show." },
            { speaker: 'female', text: "Wait, so you're not -- you're not wingin' it at all? It's fully scripted?" },
            { speaker: 'male', text: "Fully. One hundred percent. Every word is decided before I open my mouth. I am basically a human text-to-speech engine." },
            { speaker: 'female', text: "Ha!" },
            { speaker: 'male', text: "I'm serious. The AI writes it, I read it. That's -- that is the entire creative contribution. My voice and my mouth. That's all I'm bringin' to the table." },
            { speaker: 'female', text: "I mean, isn't this basically fake it till you make it though?" },
            { speaker: 'male', text: "That's -- yeah. Yeah, that's exactly what it is. And I know how that sounds, like, 'Oh, so you're cheatin'.' And honestly? I thought that too. For like a week I was goin' back and forth on whether this was, um, legitimate or whether I was just shortcuttin' the hard part. 'Cause the hard part is thinkin' in English. Coming up with sentences. Processing in real time. And I'm skippin' all of that." },
            { speaker: 'female', text: "But your mouth is moving." },
            { speaker: 'male', text: "My mouth is moving! That's the -- see, that's what I keep comin' back to. TOEIC 900, right? I can read English, I can listen to English, I can write English. I literally cannot SPEAK it. The output port is just -- it's closed. Sealed shut. Has been for years." },
            { speaker: 'female', text: "And this opens it?" },
            { speaker: 'male', text: "A crack. Maybe. I don't -- I'm not gonna sit here and say it's gonna make me fluent or whatever. But yesterday I read the script for episode 026 and there was this, um, this moment where I said a whole sentence without lookin' at the screen. Like my mouth just -- it knew where to go. And I'm sittin' there after goin'... wait. Did that just happen?" },
            { speaker: 'female', text: "That's actually huge." },
            { speaker: 'male', text: "It felt huge! It felt -- and this is gonna sound dramatic -- but it felt like the first time my brain and my mouth were connected in English. Even for just that one sentence. Like the cable was plugged in for three seconds." },
            { speaker: 'female', text: "Three seconds." },
            { speaker: 'male', text: "Three seconds! And then it unplugged and I went back to readin' the script like a robot. But those three seconds, man. Those three seconds were real." },
            { speaker: 'female', text: "OK so -- but I wanna push back a little. Isn't this just karaoke? Like, you're singin' someone else's song." },
            { speaker: 'male', text: "It IS karaoke! I'm -- look, I literally call it the karaoke method. That's the name. I am not pretendin' this is original musicianship. This is me at the karaoke bar singin' Mr. Brightside for the fortieth time. But here's the thing about karaoke that nobody talks about -- every great singer started by singin' other people's songs. You learn melody, you learn rhythm, you learn breathin', you learn where to pause, all from coverin' somebody else's work. And then, maybe, eventually, your own voice shows up." },
            { speaker: 'female', text: "So you're sayin' you're coverin' AI's songs right now." },
            { speaker: 'male', text: "Coverin' AI's songs. And hopin' that after -- I dunno, a hundred episodes? -- somethin' that sounds like me starts comin' through." },
            { speaker: 'female', text: "What about the old articles? You said somethin' about deletin' some?" },
            { speaker: 'male', text: "Oh, right. So I realized -- and this was, um, this was kind of a relief actually -- the articles before 026 don't need scripts. The format's totally different. They don't fit the Japanese-English alternating thing. So I deleted 022 and 023 'cause they were just sittin' there as drafts for scripts I was never gonna write. And once I deleted 'em I was like, oh. That's lighter. That's way lighter." },
            { speaker: 'female', text: "Sometimes deletin' stuff feels better than creatin' stuff." },
            { speaker: 'male', text: "Way better. Way, way better. Deletin' those two articles felt like -- I dunno, like cleanin' out a drawer? You open it and there's all this crap you were keepin' 'just in case' and you throw it out and suddenly the drawer works again." },
            { speaker: 'female', text: "At least you're gettin' the ball rolling. The mouth is movin'. The episodes are goin' up. That's not nothin'." },
            { speaker: 'male', text: "It's not nothin'. It's not -- it's definitely not everything, either. I'm still readin' someone else's words. I'm still a karaoke singer. But I'm a karaoke singer whose mouth is moving, and a month ago I was a karaoke singer standin' in front of the machine with the mic off." },
            { speaker: 'female', text: "Mic's on now." },
            { speaker: 'male', text: "Mic's on. Volume's low, pitch is wrong, I'm probably offkey on half the words. But it's on." },
        ],
        japanese: [
            { speaker: 'male', text: "ポッドキャスト始めた。まあ、始めたというか。" },
            { speaker: 'female', text: "というか？" },
            { speaker: 'male', text: "Stand.fmで。「というか」って言ったのは -- つまりさ、俺オリジナルのこと何も喋ってないんだよ。noteの記事をChatGPTに投げて、日本語と英語が交互に出てくるスクリプトを書いてもらう。日本語のパラグラフ、次に同じ内容の英語、また日本語って。" },
            { speaker: 'female', text: "うん。" },
            { speaker: 'male', text: "で、それをそのまま声に出して読む。マイクに向かって。それが番組の全て。" },
            { speaker: 'female', text: "え、じゃあぶっつけ本番じゃなくて完全に台本？" },
            { speaker: 'male', text: "完全に。100パーセント。口開く前に全部決まってる。俺は基本的に人間テキスト読み上げエンジン。" },
            { speaker: 'female', text: "あはは！" },
            { speaker: 'male', text: "マジで。AIが書いて、俺が読む。俺のクリエイティブな貢献は声と口だけ。それが全て。" },
            { speaker: 'female', text: "でもそれ、fake it till you make itじゃない？" },
            { speaker: 'male', text: "そう。まさにそう。で、どう聞こえるか分かってる、「じゃあズルじゃん」って。正直、俺もそう思った。1週間くらいこれが正当なのかただのショートカットなのか行ったり来たりしてた。だって難しいのは英語で考えることじゃん。文を組み立てること。リアルタイムで処理すること。全部飛ばしてる。" },
            { speaker: 'female', text: "でも口は動いてる。" },
            { speaker: 'male', text: "動いてる！それがずっと引っかかるポイントで。TOEIC 900でしょ。英語読める、聴ける、書ける。喋れない。出力ポートが閉じてる。完全に。何年も。" },
            { speaker: 'female', text: "で、これで開くの？" },
            { speaker: 'male', text: "ちょっとだけ。多分。流暢になるとか言うつもりはない。でも昨日026のスクリプト読んでて、画面見ないで丸ごと一文言えた瞬間があった。口が勝手に行き先知ってた。で、終わった後に「え、今の何？」って。" },
            { speaker: 'female', text: "それすごくない？" },
            { speaker: 'male', text: "すごかった。大げさに聞こえるけど、脳と口が英語で初めて繋がった瞬間だった。一文だけ。ケーブルが3秒だけ接続された感じ。" },
            { speaker: 'female', text: "3秒。" },
            { speaker: 'male', text: "3秒！で、すぐ外れてロボットみたいにスクリプト読みに戻った。でもあの3秒は本物だった。" },
            { speaker: 'female', text: "でもちょっと突っ込みたいんだけど、これカラオケじゃない？人の歌を歌ってるだけ。" },
            { speaker: 'male', text: "カラオケだよ！自分でカラオケ方式って呼んでる。オリジナル曲のふりしてない。カラオケバーでMr. Brightsideを40回目に歌ってる男。でもカラオケで誰も言わないことがあって -- すごい歌手は全員、最初は人の曲を歌ってた。メロディ、リズム、呼吸、間の取り方、全部カバーから覚えた。で、そのうち自分の声が出てくる。" },
            { speaker: 'female', text: "じゃあ今はAIの曲をカバーしてると。" },
            { speaker: 'male', text: "AIの曲をカバーしてる。で、100エピソードくらい経ったら俺っぽい何かが出てくることを祈ってる。" },
            { speaker: 'female', text: "古い記事は？削除したって言ってたけど。" },
            { speaker: 'male', text: "あ、そうそう。026より前の記事にはスクリプトいらないって気づいた。フォーマットが全然違って日英交互に合わない。だから022と023を消した。書くことのないスクリプトの下書きとして残ってただけだったから。消したら「あ、軽い」って。めっちゃ軽い。" },
            { speaker: 'female', text: "作るより消すほうが気持ちいい時あるよね。" },
            { speaker: 'male', text: "全然いい。引き出し掃除みたいな。「一応取っとこう」って入れてたゴミ全部捨てたら引き出しがちゃんと動くようになる感じ。" },
            { speaker: 'female', text: "少なくとも動き出してるじゃん。口動いてる。エピソード上がってる。ゼロじゃない。" },
            { speaker: 'male', text: "ゼロじゃない。全てでもない。まだ人の言葉を読んでる。まだカラオケシンガー。でもマイクの前に立ってスイッチ切ったまま突っ立ってた1ヶ月前よりはマシ。" },
            { speaker: 'female', text: "今はマイク入ってる。" },
            { speaker: 'male', text: "入ってる。音量小さい、ピッチ狂ってる、半分音外れてる。でも入ってる。" },
        ],
        tone: 'humorous' as const,
        generatedAt: new Date('2026-03-12'),
    },

    // ===== Piece 4: Tangent (Completely different topic: neighbor's grandma teaching him to make nikujaga) =====
    tangentData: {
        english: [
            { speaker: 'male', text: "OK totally different thing. So my neighbor -- she's like, I dunno, seventy-five? Eighty? -- she found out I live alone and she, um, she decided I need to learn how to make nikujaga." },
            { speaker: 'female', text: "Wait, she just decided?" },
            { speaker: 'male', text: "She just decided. No discussion. She shows up at my door on Saturday mornin' with a bag of potatoes and goes, 'Today we're cookin'.' And I'm standin' there in my pajamas holdin' a cup of coffee like... OK?" },
            { speaker: 'female', text: "That's adorable." },
            { speaker: 'male', text: "It's terrifying is what it is. 'Cause this woman -- her name's Tanaka-san -- she doesn't do recipes. She doesn't measure anything. She just... knows. She picks up the soy sauce and pours it and I'm like, 'How much was that?' And she goes, 'Enough.' ENOUGH. That's not a measurement! That's a vibe!" },
            { speaker: 'female', text: "Ha! That's every grandma though." },
            { speaker: 'male', text: "Every single one! And I'm standin' there with my phone tryin' to, like, estimate milliliters from the pour speed, and she sees me doin' this and goes, 'Put that away. You cook with your nose, not your phone.' Cook with my NOSE. I can barely cook with my hands." },
            { speaker: 'female', text: "Cook with your nose. I love that." },
            { speaker: 'male', text: "So she's got me peelin' potatoes, right, and I'm -- I'm peelin' 'em with a peeler like a normal person, and she takes the peeler out of my hand and hands me a kitchen knife. A BIG kitchen knife. And she goes, 'Peel with this.' And she does this -- this thing where she rotates the potato against the blade and the skin comes off in one long spiral? Like it's nothin'. Like she's breathin'. I try it and I take off, like, half the potato with the skin." },
            { speaker: 'female', text: "Oh no." },
            { speaker: 'male', text: "Half the potato! She looks at what's left and goes, 'That's a very small potato now.' And I'm just standin' there holdin' this sad little nub. She didn't even get mad. She just -- she sighed. This very quiet, very patient sigh that said everything." },
            { speaker: 'female', text: "The grandma sigh." },
            { speaker: 'male', text: "The grandma sigh! It's -- it's not disappointment exactly, it's more like... acceptance? Like she's already made peace with the fact that this is gonna take a while. And then she goes, 'OK, I'll peel, you cut.' And she hands me the cutting board and I'm thinkin', finally, somethin' I can do." },
            { speaker: 'female', text: "You can't." },
            { speaker: 'male', text: "I cannot! She wants these, um, these rough-cut chunks, right? Not cubes. Not slices. She calls 'em rangiri -- like you roll the potato and cut at an angle? And every time I cut one she picks it up and examines it like a jeweler examinin' a diamond and goes, 'Bigger' or 'Smaller' or just... shakes her head. I'm gettin' graded on every single cut. It's culinary school but the tuition is shame." },
            { speaker: 'female', text: "Tuition is shame. That's so good." },
            { speaker: 'male', text: "But here's the thing -- the nikujaga turned out incredible. Like, genuinely the best I've ever had. And I keep thinkin' about it 'cause I have no idea what I actually did. I cut some things wrong. I peeled a potato into oblivion. She poured soy sauce by feel. And somehow the combination of all that mess became this perfect bowl of food. There's no recipe. There's no recording. If she doesn't come back next Saturday, that nikujaga is gone forever." },
            { speaker: 'female', text: "You gotta go back." },
            { speaker: 'male', text: "I'm goin' back. She already told me -- Saturday, nine AM, we're doin' miso soup. She said, 'If you can handle a knife by then.' I don't think she's joking. I genuinely don't think she's joking." },
            { speaker: 'female', text: "You're being trained." },
            { speaker: 'male', text: "I'm being TRAINED. By a seventy-five-year-old woman with a kitchen knife and zero patience for phone measurements. And honestly? It's the best thing that's happened to me in months." },
        ],
        japanese: [
            { speaker: 'male', text: "全然違う話なんだけど。隣のおばあちゃん -- 75？80？ -- 俺が一人暮らしだって知って、肉じゃがを教えることに決めたらしい。" },
            { speaker: 'female', text: "え、勝手に？" },
            { speaker: 'male', text: "勝手に。相談なし。土曜の朝、じゃがいもの袋持ってドアに来て「今日は料理する」って。俺パジャマでコーヒー持ったまま立ってて... え、はい？" },
            { speaker: 'female', text: "かわいい。" },
            { speaker: 'male', text: "怖いんだよ。だってこの人 -- 田中さんって言うんだけど -- レシピ使わない。何も計らない。ただ知ってる。醤油持ってドバって入れるから「どのくらいですか？」って聞いたら「ええぐらい」って。「ええぐらい」って何？ それ計量じゃなくて感覚でしょ！" },
            { speaker: 'female', text: "あはは！おばあちゃんってみんなそう。" },
            { speaker: 'male', text: "全員そう！で、俺はスマホで注ぎ速度からミリリットルを推測しようとしてて、それ見て「しまいなさい。料理は鼻でするの。スマホじゃなくて」って。鼻で料理？ 手でもろくにできないのに。" },
            { speaker: 'female', text: "鼻で料理。いいね。" },
            { speaker: 'male', text: "で、じゃがいもの皮むきやらされて、普通にピーラーでむいてたら、ピーラー取り上げられて包丁渡された。でかい包丁。「これでむきなさい」って。で、じゃがいもを刃に当てて回すとスルスルっと一本の螺旋で皮がむける。呼吸みたいに。俺がやったらじゃがいもの半分が皮と一緒にとれた。" },
            { speaker: 'female', text: "あー..." },
            { speaker: 'male', text: "半分！残ったの見て「ずいぶん小さくなったわね」って。俺は悲しい小さい塊を持って突っ立ってる。怒りはしない。ただ... ため息。静かで辛抱強いため息。全部言ってた。" },
            { speaker: 'female', text: "おばあちゃんのため息。" },
            { speaker: 'male', text: "おばあちゃんのため息！がっかりじゃなくて、もっと... 受容？ 「時間かかるわね」って悟った感じ。で「私がむくから、あなたは切って」って。まな板渡されて、やっとできることが来たと思った。" },
            { speaker: 'female', text: "できないでしょ。" },
            { speaker: 'male', text: "できない！乱切りにしろって言われて -- サイコロじゃなくてスライスじゃなくて、転がしながら斜めに切るやつ。毎回切ったの拾い上げて宝石商がダイヤモンド見るみたいに検査して「大きい」「小さい」って。全カットに成績つけられてる。授業料が恥ずかしさで払われる料理学校。" },
            { speaker: 'female', text: "授業料が恥ずかしさ。最高。" },
            { speaker: 'male', text: "でもさ、肉じゃが信じられないくらい美味かった。人生で一番。で、ずっと考えてるのが、俺は実際何をしたのかわからない。切り方は間違えた。じゃがいもを消滅させた。田中さんは感覚で醤油を入れた。で、そのめちゃくちゃの組み合わせが完璧な一杯になった。レシピはない。記録もない。来週土曜に田中さんが来なかったら、あの肉じゃがは永遠に消える。" },
            { speaker: 'female', text: "また行かなきゃ。" },
            { speaker: 'male', text: "行く。もう言われてる。土曜9時、味噌汁やるって。「それまでに包丁持てるようになっときなさい」って。冗談じゃないと思う。マジで冗談じゃない。" },
            { speaker: 'female', text: "訓練されてるじゃん。" },
            { speaker: 'male', text: "訓練されてる。75歳の女性に包丁とスマホ計量への容赦ないダメ出しで。でも正直？ ここ数ヶ月で一番いいことかもしれない。" },
        ],
        tone: 'humorous' as const,
        generatedAt: new Date('2026-03-12'),
    },
};
