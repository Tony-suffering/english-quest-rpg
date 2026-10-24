/**
 * 137 - サイト除霊 ― 消しても消しても出てくる会社のHP
 * 個人サイトをVercelに移行したら会社のHPが憑依してた話
 */

import { JournalEntry } from '../types';

export const siteExorcismEntry: JournalEntry = {
    id: '137',
    date: '2026-03-11',
    title: 'サイト除霊 ― 消しても消しても出てくる会社のHP',
    summary: '個人サイトをCloudflare WorkersからVercelに移行。リポジトリが会社HPの完全コピーで、英語アプリの代わりに会社のサイトが表示され続けた。AIに何度言っても気づかない地獄。',
    featured: false,
    readTime: 5,
    businessTags: ['サイト移行', 'デプロイ', 'コード管理'],
    techTags: ['Vercel', 'Cloudflare Workers', 'Next.js'],

    // ===== Piece 1: Japanese Journal =====
    conversation: `
## 移行のはずだった

個人サイトをCloudflare WorkersからVercelに移した。

理由はシンプル。Workerの3MiBギリギリで息苦しかった。Vercelなら余裕がある。移行自体は難しくない。

はずだった。

## 会社のHPが出てくる

デプロイした。

開いた。

**仕事用のサイトが表示された。**

は？

英語学習アプリが出るはずなのに、施工実績とかサービス案内とか出てくる。なんで？

## AIが気づかない

AIに聞いた。

page.tsxを見てくれた。「リダイレクトしてますね、キャッシュの問題かもしれません」。

違う。

「コードにイワサキの文字があるんだけど」って言った。

AIがまた調べた。「page.tsxにはリダイレクトしかないですね」。

**そこじゃねえよ。**

リポジトリの中身を見ろって話。page.tsxはただのリダイレクト。でもリポジトリ全体が会社HPの**完全コピー**だった。コンポーネントもデータもページも、全部そのまま入ってた。

AIが見てるのはエントリーポイントだけ。木を見て森を見ず。いや、**葉っぱを見て木すら見てない**。

## 689ファイル削除

何回か叫んだ。

「リポジトリの中身見ろ」「会社のコードが入ってるって言ってんだろ」「page.tsxじゃなくてフォルダ構成見ろ」。

やっと見た。

689ファイル以上、会社HPのコード。コンポーネント、データファイル、ページ、画像参照、全部入ってた。そりゃ会社のHP出るわ。

全部消した。

デプロイした。

英語アプリが表示された。

最初からリポジトリの中身見てくれればよかった。

## 除霊完了

結局これ、除霊だった。

リポジトリに会社のHPが憑依してた。AIに何度言っても見えない。page.tsxばっかり調べて「問題ないですね」って返ってくる。

霊が見えない人にいくら説明しても無駄。

自分で指さして「ここ！ここにいる！」って叫んで、やっと見えた。

689体の除霊。

疲れた。
`,

    // ===== Piece 2: English Summary (Pro expression teaching) =====
    englishSummary: {
        title: "Five Expressions from the Site Exorcism Episode",
        readTime: 5,
        sections: [
            {
                heading: "Can't See the Forest for the Trees -- 木を見て森を見ず",
                paragraphs: [
                    "'He couldn't see the forest for the trees.' So in the Memoria, the guy's tellin' his AI assistant that the whole repo is full of company website code, and the AI keeps checkin' one file -- the entry point -- and goin', 'Looks fine to me.' That's the definition of not seein' the forest. You're so zoomed in on one tiny detail that you completely miss the massive, obvious problem sittin' right there.",
                    "You hear this ALL the time in work situations. 'We spent three hours debuggin' the API response format and missed that the server wasn't even running.' 'She's obsessin' over font sizes while the whole layout is broken.' Any time someone's stuck on details while the big picture is on fire, that's not seein' the forest for the trees.",
                    "The family's pretty rich here. 'Miss the big picture' is the plain version. 'Lose sight of' is when you KNEW the big picture but forgot -- 'We lost sight of what we were actually tryin' to build.' 'Tunnel vision' is more about focus gettin' too narrow. And 'zoom out' is what you tell someone who's stuck -- 'Dude, zoom out.' All of 'em point at the same problem, just different angles.",
                ],
                japaneseParagraphs: [
                    "日本語の「木を見て森を見ず」とほぼ同じ。Memoriaで、AIがpage.tsxだけ見て「問題ないですね」って返すシーン。リポジトリ全体に会社のコードが689ファイルも入ってるのに、エントリーポイント1つだけ見て「大丈夫」。これがまさに \"can't see the forest for the trees\"。",
                    "仕事で死ぬほど使う。APIのレスポンス形式を3時間デバッグしてたけどサーバーそもそも動いてなかった、みたいなやつ。細部に没頭して全体が燃えてるのに気づかない状態。日本語だと「そこじゃねえよ」が一番近い感覚。",
                    "仲間表現: \"miss the big picture\" = 全体像を見落とす。\"lose sight of\" = 分かってたのに見失った。\"tunnel vision\" = 視野狭窄。\"zoom out\" = 引いて見ろ。全部同じ問題を指してるけど角度が違う。\"zoom out\" は実際のアドバイスとして一番使える。",
                ],
            },
            {
                heading: "Right Under Your Nose -- 目の前にあるのに気づかない",
                paragraphs: [
                    "'The problem was right under his nose the whole time.' So the guy keeps sayin', 'There's company code in the repo,' and the AI keeps not seein' it. Six hundred and eighty-nine files. Not hidden. Not encrypted. Just... sittin' there. In plain sight. 'Right under your nose' means somethin's so close and so obvious that the fact you missed it is almost embarrassing.",
                    "This one's perfect for those moments where you've been searchin' for somethin' forever and it turns out it was right there. 'I looked for my keys for twenty minutes -- they were right under my nose, on the counter.' 'The bug was right under our noses the whole time, just a typo in line 3.' There's always this mix of relief and frustration, like, how did I not see that?",
                    "Related: 'In plain sight' is similar but emphasizes that nothin' was hidden. 'Hiding in plain sight' is when something SEEMS hidden but isn't -- like a spy livin' a normal life. 'Staring you in the face' is even more aggressive -- the answer was literally lookin' at you and you still missed it. And 'under your radar' is the opposite -- somethin' that genuinely escaped your attention, not because it was obvious but because it was subtle.",
                ],
                japaneseParagraphs: [
                    "689ファイルが隠れてもいない、暗号化もされてない、ただそこにある。なのにAIは気づかない。\"Right under your nose\" = 鼻の下にある = 目の前にあるのに気づかない。見逃した事実自体が恥ずかしいくらい明白な時に使う。",
                    "鍵を20分探して結局カウンターの上にあった、みたいな場面。バグを何時間も探して3行目のタイポだった。安堵と苛立ちが混ざる感覚。「なんで気づかなかったんだ」。日本語の「灯台下暗し」に近いけど、英語版のほうがもっとカジュアルに使える。",
                    "仲間: \"in plain sight\" = 隠れてない。\"hiding in plain sight\" = 一見普通に見えるけど実は...（スパイが普通の生活してる的な）。\"staring you in the face\" = もっと攻撃的、答えがこっちを見てるのに見逃した。\"under your radar\" は逆で、本当に見えなかった時（明白じゃなかった）。",
                ],
            },
            {
                heading: "Gut It -- 中身を全部抜く、ごっそり削除する",
                paragraphs: [
                    "'We basically had to gut the whole repo.' In the Memoria, they deleted 689 files of company website code from the repo. That's guttin' it. Like guttin' a fish -- you're reachin' in and pullin' out everything that doesn't belong. It's violent, it's thorough, and when you're done, there's nothin' left but the shell.",
                    "This works for any major removal. 'They gutted the old kitchen and started from scratch.' 'The editor gutted my article -- cut like half of it.' 'Management gutted the whole department.' It always implies scale. You don't 'gut' one file. You gut a system, a room, a building, an organization. It's dramatic and it's supposed to be.",
                    "'Strip down' is the gentler cousin -- you're removin' layers but keepin' the core. 'Purge' is more about gettin' rid of stuff that shouldn't be there, like cleansin'. 'Nuke' is the developer slang version -- 'Just nuke the whole folder.' And 'clean house' is the organizational version -- firings, restructuring, gettin' rid of dead weight. But 'gut' has this visceral, physical quality that none of the others quite match.",
                ],
                japaneseParagraphs: [
                    "gut = 内臓を抜く。魚をさばく時に内臓を全部出すイメージ。リポジトリから689ファイル削除 = \"gut the repo\"。中身をごっそり抜いて、殻だけ残す。暴力的で、徹底的で、終わった後は何も残ってない。",
                    "大規模な削除や撤去なら何でも使える。\"gutted the kitchen\"（キッチンを全面改装）、\"gutted my article\"（記事をバッサリ切られた）、\"gutted the department\"（部署を丸ごとリストラ）。スケールが大きい時に使う。ファイル1つには使わない。システム、部屋、建物、組織レベル。",
                    "仲間: \"strip down\" = 層を剥がす（もう少し優しい）。\"purge\" = 浄化、あるべきでないものを除く。\"nuke\" = 開発者スラングで全消し（\"Just nuke the folder\"）。\"clean house\" = 組織版、人事整理。でも \"gut\" の内臓を引きずり出すような生々しさは他にない。",
                ],
            },
            {
                heading: "Talk Past Each Other -- 話が噛み合わない",
                paragraphs: [
                    "'We were totally talkin' past each other.' So in the Memoria, the dude keeps sayin' 'there's company code in the repo' and the AI keeps answerin' about the entry point file. They're both talkin', both technically right about what they're sayin', but they're not actually communicatin'. That's talkin' past each other. You're havin' two parallel conversations that never intersect.",
                    "This happens SO much in real life. In meetings -- 'Marketing's talkin' about brand awareness and engineering's talkin' about load times and nobody realizes they're not even discussin' the same problem.' In relationships -- 'She's upset about feeling ignored and he's defending his schedule and they're just... talkin' past each other.' The information is flowin', but in two different directions.",
                    "Closeby: 'On different pages' or 'not on the same page' is the softer version -- you just haven't aligned yet. 'Miscommunication' is the generic label. 'Lost in translation' is when the meaning changed between sender and receiver. But 'talkin' past each other' specifically captures that frustrating thing where both people are genuinely tryin' to communicate and STILL failin'. Nobody's wrong. The signals just aren't connecting.",
                ],
                japaneseParagraphs: [
                    "Memoriaで「リポジトリに会社のコードがある」って言ってるのに、AIは「page.tsxはリダイレクトだけです」って答える。両方とも間違ってない。でも会話が噛み合ってない。\"Talk past each other\" = 二つの平行な会話が交差しない。お互い喋ってるのに通じてない。",
                    "会議で死ぬほど起きる。マーケがブランド認知の話してて、エンジニアが読み込み速度の話してて、誰も同じ問題について話してないことに気づいてない。恋愛でも。「無視されてる」って怒ってる側と「スケジュールが」って弁解してる側。情報は流れてるけど方向が違う。",
                    "仲間: \"not on the same page\" = まだ認識が揃ってない（もう少し軽い）。\"miscommunication\" = 汎用ラベル。\"lost in translation\" = 伝達の途中で意味が変わった。でも \"talking past each other\" は、両方とも本気でコミュニケーションしようとしてるのに失敗してる苛立ちを捉えてる。誰も悪くない。信号が繋がらないだけ。",
                ],
            },
            {
                heading: "From Scratch -- ゼロから、一から",
                paragraphs: [
                    "From the tangent about sourdough bread: 'I'm makin' it completely from scratch.' This one sounds simple, and honestly it is, but Japanese speakers tend to underuse it. 'From scratch' means starting with absolutely nothing -- no kit, no premade ingredients, no shortcuts. In the tangent, the guy's growin' his own sourdough starter, which is about as from-scratch as you can get with bread.",
                    "You can use it for literally anything. 'I built this app from scratch.' 'She learned piano from scratch at forty.' 'We had to redo the whole proposal from scratch.' It works for cooking, coding, learning, building -- any process where you started at zero. The vibe is always a mix of pride and exhaustion, like, yeah I did this the hard way and I'm either proud or dead inside.",
                    "'From the ground up' is the construction version -- more about buildin' somethin' big. 'Start over' is when you HAD something and have to begin again (more frustrating). 'DIY' is the hobby version. 'Homemade' is specifically food or crafts. But 'from scratch' is the most versatile and the most common. If you only learn one of these, learn this one. You'll use it every week.",
                ],
                japaneseParagraphs: [
                    "Tangentのサワードウパンの話から。自家製スターターから育てて、完全にゼロからパンを作る。\"From scratch\" = 既製品なし、ショートカットなし、本当のゼロから。日本人は「ゼロから」って言うけど、英語の \"from scratch\" をあまり使わない。めちゃくちゃ便利なのに。",
                    "何にでも使える。\"built this app from scratch\"（アプリをゼロから作った）、\"learned piano from scratch\"（ピアノをゼロから覚えた）、\"redo the proposal from scratch\"（企画書をゼロからやり直し）。料理、プログラミング、学習、建築。ゼロから始めたプロセスなら全部OK。誇りと疲労が混ざったニュアンス。",
                    "仲間: \"from the ground up\" = 建設版、大きいものを建てる時。\"start over\" = 一度あったものをやり直す（もっと悔しい）。\"DIY\" = 趣味版。\"homemade\" = 料理やクラフト限定。でも \"from scratch\" が一番万能で一番頻出。一つだけ覚えるならこれ。毎週使う。",
                ],
            },
        ],
    },

    // ===== Piece 3: Memoria Conversation (Same topic) =====
    conversationData: {
        english: [
            { speaker: 'male', text: "OK so -- ugh. I gotta tell you about today 'cause it was, um, it was one of those days where you wanna throw your laptop out the window." },
            { speaker: 'female', text: "Oh no. What happened?" },
            { speaker: 'male', text: "So I'm movin' my personal site from Cloudflare Workers to Vercel, right? 'Cause the Worker was hittin' the size limit -- like 3 megabytes compressed, and we were at 2,966 kilobytes, which is just -- you're basically holdin' your breath every deploy." },
            { speaker: 'female', text: "That's tight." },
            { speaker: 'male', text: "Super tight. So I set up Vercel, deploy, open the URL, and... the company website shows up." },
            { speaker: 'female', text: "Wait. Your work site?" },
            { speaker: 'male', text: "My work site! The full -- like, service pages, project portfolio, the whole thing. And I'm sittin' there goin', that's not my English learning app. That is very much not my English learning app." },
            { speaker: 'female', text: "How does that even happen?" },
            { speaker: 'male', text: "So here's the thing, and this is -- this is the part that killed me. The Vercel repo was an exact copy of the work website repo. Like, somebody -- well, ME, past me -- had cloned it as a starting point and just... never cleaned it out. So the whole repo is full of company website code. Components, data files, pages, everything. Six hundred and eighty-nine files." },
            { speaker: 'female', text: "Six hundred and -- OK." },
            { speaker: 'male', text: "Yeah." },
            { speaker: 'female', text: "So you just had to delete those files, right? That's not that bad." },
            { speaker: 'male', text: "You'd think! You would THINK! But here's where it gets -- so I asked my AI assistant to help, and I said, 'Hey, the company website is showin' up instead of my app.' And the AI goes and checks page.tsx -- which is the entry point -- and goes, 'This file just has a redirect. It's probably a cache issue.'" },
            { speaker: 'female', text: "Ha!" },
            { speaker: 'male', text: "And I'm like, no, there's company code IN the repo. Like, in the actual files. And the AI checks page.tsx AGAIN and goes, 'Yeah, this just redirects. Maybe clear your browser cache?'" },
            { speaker: 'female', text: "It kept checking the same file?" },
            { speaker: 'male', text: "The same file! Over and over! I'm -- I'm literally saying 'look at the repo contents' and it's like, 'Well, the entry point looks fine to me.' And I'm losin' my mind 'cause I'm like -- dude, the entry point IS fine, the problem is the six hundred other files that shouldn't be there!" },
            { speaker: 'female', text: "That's like -- that's like tellin' a doctor 'my arm hurts' and they keep checkin' your blood pressure." },
            { speaker: 'male', text: "YES. Exactly that. And it happened, um, multiple times. I'd say 'there's company content,' the AI would say 'page.tsx looks clean,' and I'd just -- I wanted to scream. I DID scream, actually." },
            { speaker: 'female', text: "You yelled at the AI?" },
            { speaker: 'male', text: "I yelled at the AI. Multiple times. And eventually -- EVENTUALLY -- it actually looked at the folder structure and went, 'Oh. Oh, there's... there's a lot of stuff in here that shouldn't be here.'" },
            { speaker: 'female', text: "You don't say!" },
            { speaker: 'male', text: "Six hundred and eighty-nine files! That was right under its nose the whole time! We were completely talkin' past each other for like -- I don't even know how long. Felt like forever." },
            { speaker: 'female', text: "So you basically had to gut the whole repo." },
            { speaker: 'male', text: "Gutted it. Deleted everything that was company-related. Components, data, pages, the works. And then deployed again and -- there it was. My English app. Just sittin' there like nothin' happened." },
            { speaker: 'female', text: "After all that drama." },
            { speaker: 'male', text: "After ALL that drama. And you know what the worst part is? If the AI had just -- if it had looked at the file list ONCE, like the actual directory, instead of starin' at page.tsx, this whole thing would've been a five-minute job. Delete the files, deploy, done." },
            { speaker: 'female', text: "Instead you got the site exorcism experience." },
            { speaker: 'male', text: "Site exorcism. That's -- yeah, that's exactly what it was. The work site was hauntin' the repo. The AI couldn't see the ghost. I kept pointin' and screamin' and it kept sayin', 'I don't see anything.' Classic horror movie stuff." },
            { speaker: 'female', text: "Six hundred and eighty-nine ghosts." },
            { speaker: 'male', text: "Six hundred and eighty-nine ghosts. All exorcised. I need a nap." },
        ],
        japanese: [
            { speaker: 'male', text: "今日の話聞いてくれ。ノートPC窓から投げたくなるような日だった。" },
            { speaker: 'female', text: "何があったの？" },
            { speaker: 'male', text: "個人サイトをCloudflare WorkersからVercelに移そうとしてさ。Workerの容量制限ギリギリで、3メガ圧縮で2,966キロバイト。毎回デプロイするたびに息止めてる状態。" },
            { speaker: 'female', text: "きっつ。" },
            { speaker: 'male', text: "めっちゃきつい。で、Vercelセットアップして、デプロイして、URL開いたら...会社のHPが出てきた。" },
            { speaker: 'female', text: "え。仕事のサイト？" },
            { speaker: 'male', text: "仕事のサイト！サービスページとか施工実績とか全部出てくる。で、俺そこで「これ俺の英語アプリじゃないな。全然違うな」って。" },
            { speaker: 'female', text: "なんでそうなるの？" },
            { speaker: 'male', text: "ここが核心なんだけどさ。Vercelのリポジトリが会社HPの完全コピーだった。過去の俺が出発点としてクローンして、中身を掃除しないまま放置してた。コンポーネントもデータもページも全部入ったまま。689ファイル。" },
            { speaker: 'female', text: "689って...うん。" },
            { speaker: 'male', text: "うん。" },
            { speaker: 'female', text: "そのファイル消せばいいだけじゃない？そんな大変じゃなくない？" },
            { speaker: 'male', text: "そう思うじゃん！思うじゃん！でもここからがやばくて。AIアシスタントに「会社のHPが表示されてる」って言ったら、AIがpage.tsx見て「このファイルはリダイレクトだけです。キャッシュの問題かもしれません」って。" },
            { speaker: 'female', text: "あはは！" },
            { speaker: 'male', text: "で俺「リポジトリに会社のコードが入ってるんだけど」って言ったら、AIがまたpage.tsx見て「はい、リダイレクトだけですね。ブラウザのキャッシュクリアしてみてください」って。" },
            { speaker: 'female', text: "同じファイルばっかり見てたの？" },
            { speaker: 'male', text: "同じファイル！何回も！「リポジトリの中身見て」って言ってるのに「エントリーポイントは問題ないですね」って。いや、エントリーポイントはいいんだよ！問題は他の600ファイルだよ！" },
            { speaker: 'female', text: "それって「腕が痛い」って言ってるのに血圧ばっかり測られるのと一緒じゃん。" },
            { speaker: 'male', text: "まさにそれ。で、何回もあった。「会社のコンテンツがある」って言うと「page.txsはクリーンです」って返ってきて、叫びたくなる。叫んだ。" },
            { speaker: 'female', text: "AIに怒鳴ったの？" },
            { speaker: 'male', text: "怒鳴った。複数回。で、やっと -- やっと -- フォルダ構成を見て「あ。あー...ここにいろいろ入ってますね。あるべきじゃないものが」って。" },
            { speaker: 'female', text: "知ってた！" },
            { speaker: 'male', text: "689ファイル！ずっと目の前にあったのに！完全に話が噛み合ってなかった。何分経ったか分からないけど永遠に感じた。" },
            { speaker: 'female', text: "リポジトリごっそり削除したわけだ。" },
            { speaker: 'male', text: "ごっそり。会社関連のもの全部消した。コンポーネント、データ、ページ、全部。で、もう一回デプロイしたら英語アプリが出てきた。何事もなかったみたいに。" },
            { speaker: 'female', text: "あの騒ぎの後で。" },
            { speaker: 'male', text: "全部の騒ぎの後で。で、一番悔しいのは、AIが最初にファイル一覧を見てくれてれば、page.tsxじゃなくてディレクトリ構成を見てくれてれば、5分で終わってた。ファイル消してデプロイ、終了。" },
            { speaker: 'female', text: "代わりにサイト除霊体験したわけだ。" },
            { speaker: 'male', text: "サイト除霊。まさにそれ。会社のHPがリポジトリに憑依してて、AIには霊が見えなくて、俺が指さして叫んでも「何も見えません」って。完全にホラー映画。" },
            { speaker: 'female', text: "689体の霊。" },
            { speaker: 'male', text: "689体の霊。全部除霊した。昼寝させてくれ。" },
        ],
        tone: 'humorous' as const,
        generatedAt: new Date('2026-03-11'),
    },

    // ===== Piece 4: Tangent (Completely different topic) =====
    tangentData: {
        english: [
            { speaker: 'male', text: "OK totally unrelated, but I've been, um, gettin' into sourdough." },
            { speaker: 'female', text: "Sourdough? Like, baking?" },
            { speaker: 'male', text: "Baking! From scratch. And I don't mean buyin' a starter from some -- like, I'm GROWING my own starter. Flour and water in a jar. On my kitchen counter. I feed it every day." },
            { speaker: 'female', text: "You feed it?" },
            { speaker: 'male', text: "You feed it! It's alive. It's like a pet, honestly. A pet made of bacteria and yeast. And if you forget to feed it, it gets this -- this layer of liquid on top that smells like alcohol? And you're like, oh no, I neglected my bread pet." },
            { speaker: 'female', text: "That's disgusting and adorable at the same time." },
            { speaker: 'male', text: "Right? And here's the thing -- the first loaf was, um... it was terrible. Like, genuinely bad. Dense as a brick. I could've used it as a doorstop. And I'm sittin' there lookin' at this thing goin', I waited seven days for my starter to mature, spent four hours on the dough, and THIS is what I get?" },
            { speaker: 'female', text: "Ha! Seven days of feeding a jar and then a brick comes out." },
            { speaker: 'male', text: "A brick! But -- and this is the part I didn't expect -- I kinda loved it? Like, it TASTED good even though it looked terrible. The crust had this, this tang to it, this sourness that you just... you can't get from store-bought bread. Even my ugly brick had that." },
            { speaker: 'female', text: "That's actually really nice." },
            { speaker: 'male', text: "And then the second loaf was better. Still not, like, Instagram-worthy or whatever, but it actually rose. Had some holes in it. The crumb -- that's what bakers call the inside, the crumb -- it was, uh, not dense anymore. And I was SO proud. Unreasonably proud." },
            { speaker: 'female', text: "Over bread." },
            { speaker: 'male', text: "Over BREAD! I'm a grown man takin' photos of bread and sendin' 'em to people. 'Look at my crumb structure!' Nobody asked. Nobody cares about my crumb structure." },
            { speaker: 'female', text: "I bet some people cared." },
            { speaker: 'male', text: "My mom said it looked nice. That's it. That's the whole audience." },
            { speaker: 'female', text: "Moms always count. But OK, so what's the deal with sourdough specifically? Like, why not just make regular bread?" },
            { speaker: 'male', text: "So regular bread uses commercial yeast, right? You buy a packet, dump it in, it rises in like an hour. Sourdough is -- it's wild yeast. From the air. From your hands. From your kitchen. Every starter is literally unique to the place it was made. My starter has bacteria from MY kitchen, my environment. It's like a fingerprint." },
            { speaker: 'female', text: "Wait, that's actually cool. Your bread has your kitchen's DNA basically." },
            { speaker: 'male', text: "Exactly! And some bakeries have starters that are like a hundred years old. They've been feedin' the same culture for generations. The bacteria has evolved. It's -- I mean it sounds dramatic but it's genuinely a living artifact." },
            { speaker: 'female', text: "A hundred-year-old bread pet." },
            { speaker: 'male', text: "A hundred-year-old bread pet that you can EAT. What other pet can you say that about?" },
            { speaker: 'female', text: "Please don't eat your pets." },
            { speaker: 'male', text: "Just the bread ones! And honestly, the whole process is -- it's meditative? Kneadin' dough for fifteen minutes, you can't check your phone, you can't do anything else, you're just... there. With the dough. It's the one time my brain actually shuts up." },
            { speaker: 'female', text: "That's your meditation. Not a Vercel outage, not a book. Bread." },
            { speaker: 'male', text: "Bread. I find enlightenment through carbohydrates. Pretty on-brand." },
        ],
        japanese: [
            { speaker: 'male', text: "全然関係ない話なんだけど、最近サワードウにハマってて。" },
            { speaker: 'female', text: "サワードウ？パン焼くの？" },
            { speaker: 'male', text: "焼く！ゼロから。買ったスターターじゃなくて、自分で育ててる。小麦粉と水を瓶に入れて、キッチンのカウンターに置いて、毎日餌やってる。" },
            { speaker: 'female', text: "餌やるの？" },
            { speaker: 'male', text: "やる！生きてるから。ペットみたいなもん。バクテリアと酵母でできたペット。餌忘れると表面に液体の層ができてアルコール臭くなるの。「あ、パンペットの世話忘れた」って。" },
            { speaker: 'female', text: "気持ち悪いのとかわいいのが同時に来る。" },
            { speaker: 'male', text: "でしょ。で、最初の一斤が...ひどかった。マジでひどい。レンガみたいに重い。ドアストッパーに使えるレベル。スターター熟成に7日待って、生地に4時間かけて、これかよって。" },
            { speaker: 'female', text: "あはは！7日間瓶に餌やり続けてレンガが出てくる。" },
            { speaker: 'male', text: "レンガ！でも -- ここが想定外だったんだけど -- 結構好きだった。見た目ひどいのに味は良かった。皮のあの酸味、あの独特のタンってやつ、市販のパンじゃ絶対出ない。俺の不細工レンガにもそれがあった。" },
            { speaker: 'female', text: "それちょっといい話。" },
            { speaker: 'male', text: "で、2斤目はましだった。インスタ映えはしないけど、ちゃんと膨らんだ。穴もあいてた。クラム -- パン屋が中身をクラムって呼ぶんだけど -- もう密じゃなかった。で、めっちゃ誇らしかった。不当なレベルで誇らしかった。" },
            { speaker: 'female', text: "パンで。" },
            { speaker: 'male', text: "パンで！いい大人がパンの写真撮って人に送ってる。「俺のクラム構造見て！」って。誰も頼んでない。誰も俺のクラム構造に興味ない。" },
            { speaker: 'female', text: "何人かは興味あったんじゃない？" },
            { speaker: 'male', text: "母親が「いいじゃん」って言ってくれた。それだけ。観客全員。" },
            { speaker: 'female', text: "お母さんは数に入る。でもなんでサワードウ？普通のパンじゃだめなの？" },
            { speaker: 'male', text: "普通のパンは市販の酵母使うじゃん。袋開けて入れたら1時間で膨らむ。サワードウは天然酵母。空気から。手から。キッチンから。スターターは全部作った場所固有。俺のスターターには俺のキッチンの菌がいる。指紋みたいなもん。" },
            { speaker: 'female', text: "え、それかっこいい。パンにキッチンのDNAが入ってるみたいな。" },
            { speaker: 'male', text: "そう！で、100年ものスターターを持ってるパン屋もある。何世代も同じ培養を餌やり続けて。菌が進化してる。大げさに聞こえるけど、マジで生きた遺産。" },
            { speaker: 'female', text: "100年もののパンペット。" },
            { speaker: 'male', text: "100年もののパンペットで、食べられる。他にどのペットがそう言える？" },
            { speaker: 'female', text: "ペット食べないで。" },
            { speaker: 'male', text: "パンのだけ！で、工程全体が瞑想的なんだよ。生地を15分こねてる間、スマホ見れない、他のこと何もできない、ただ生地と向き合ってる。脳が唯一黙る時間。" },
            { speaker: 'female', text: "それがあなたの瞑想。Vercelの障害でもなく本でもなく、パン。" },
            { speaker: 'male', text: "パン。炭水化物で悟りを開く。俺らしい。" },
        ],
        tone: 'humorous' as const,
        generatedAt: new Date('2026-03-11'),
    },
};
