/**
 * 365 English Master -- Month 4 Week 15: エンタメ英語 (Entertainment English)
 * Days 105-111: 70 expressions
 * Month: July 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 4 (2026-07) -- WEEK 15
// ============================================================

export const MONTH4_W15_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 105: ゲームする (Gaming)
    // Scene: タケシが居酒屋でスマホゲームをやりながら飲んでいる。ケンジが「いい歳して」と突っ込むが、自分もハマっている。
    // ────────────────────────────────────────────────────

    {
        daySlot: 105, japanese: '最近何のゲームやってる？',
        english: [
            'What are you playing these days?',
            'So what have you been playing lately?',
            'I need a new game. What have you been playing these days?',
            "Oh dude, you gotta try this new roguelike. I've been hooked for like two weeks straight.",
        ],
        context: 'what are you playing は「何やってるの」のゲーム版。日本語だと「何のゲームやってる？」とゲームを明示するけど、英語は文脈でplayingだけでゲームと分かる。pick up and play は「すぐ遊べる」。カジュアルゲーマーの口癖。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 105, japanese: 'ガチでハマってる',
        english: [
            'I am so into it.',
            'I am seriously addicted to this game.',
            'I have been playing nonstop for two weeks. I think I have a problem.',
            "Ha, I can tell. You've had your face glued to your phone all night. What level are you on?",
        ],
        context: 'I am so into it は「超ハマってる」。addicted は「中毒」でhooked より強い。gameplay loop は「ゲームのプレイサイクル」。ruining my life in the best way possible は矛盾した褒め方でゲーマーがよく使う。日本語の「廃人になってる」に近い。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 105, japanese: 'オンラインでやろうよ',
        english: [
            'Let us play online.',
            'We should play together online sometime.',
            'Do you want to hop on tonight? I will send you a friend request.',
            "Yeah, I'm down. Send me your username and I'll add you when I get home.",
        ],
        context: 'hop on は「ログインする」のカジュアル表現。squad up は「チームを組む」。solo queue は「一人でマッチングに並ぶ」。rage quit は「キレて途中でやめる」。randoms は「知らない人」。ゲーマー英語は独自の世界があるけど日常にも浸透している。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 105, japanese: 'このゲーム課金やばい',
        english: [
            'This game is a money pit.',
            'I have spent way too much money on this game.',
            'Do not even ask how much I have spent. The microtransactions are out of control.',
            "Bro, same. I told myself 'just one more pull' and dropped fifty bucks last night.",
        ],
        context: 'money pit は「金食い虫」（直訳は金の穴）。microtransactions は「少額課金」。free-to-play は「基本無料」。gacha は日本語のガチャがそのまま英語になった珍しい例。pull は「ガチャを引く」。rates は「排出率」。ゲーム課金の悩みは世界共通。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 105, japanese: 'レベル上げがだるい',
        english: [
            'Grinding is so boring.',
            'I am tired of grinding. It takes forever to level up.',
            'I have been stuck on the same level for a week. The grind is real.',
            "Just use the auto-battle feature and let it run while you're eating. That's what I do.",
        ],
        context: 'grinding は「レベル上げの単純作業」。the grind is real は「マジでだるい」のスラング。busywork は「意味のない作業」。pay to skip は「金で飛ばす」。RPGの「レベル上げ」は英語でもgrinding が完全に定着している。日本語のグラインドはまだ一般的じゃない。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 105, japanese: 'ゲームオーバーになった',
        english: [
            'I died.',
            'I just died again. This boss is impossible.',
            'I have died like fifty times on this part. I am about to throw my controller.',
            "Wait, you're still on that boss? There's a trick to it. You gotta dodge left, not right.",
        ],
        context: '英語ではゲームオーバーよりI diedと言うのが自然。game over は実際のゲーム画面の表示で、会話では使わない。throw my controller は「コントローラーを投げる」で、frustration の定番表現。dodge は「避ける」。attempt は「挑戦」。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 105, japanese: 'ゲームは一日一時間',
        english: [
            'One hour a day max.',
            'I try to limit myself to one hour a day.',
            'My rule is one hour a day but I never actually follow it.',
            "Yeah right, since when? You were online at two AM last night. I saw your status.",
        ],
        context: '「ゲームは一日一時間」は高橋名人の名言だけど、英語圏には同じような有名フレーズはない。limit myself to は「自分を制限する」。mid-mission は「ミッションの途中」。self-control and X do not mix は「自制心とXは両立しない」の定型パターン。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 105, japanese: '懐かしいゲームやりたくなった',
        english: [
            'I want to play some old games.',
            'I am feeling nostalgic. I want to play something retro.',
            'I suddenly got the urge to play those games I grew up with.',
            "Oh man, me too. I just bought a retro console off Amazon. Wanna come over and play some old-school stuff?",
        ],
        context: 'nostalgic は「懐かしい」だけど英語では形容詞（I feel nostalgic）。日本語の「懐かしい」は感嘆詞的にも使えるけど英語は文を作る必要がある。retro は「レトロな」。dug out は「引っ張り出した」。cartridge は「カセット」。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 105, japanese: 'ゲーム実況見てる方が楽しい',
        english: [
            'Watching is more fun than playing.',
            'I would rather watch someone else play than play myself.',
            'I spend more time watching streamers than actually playing games.',
            "Honestly, same. Who's your favorite streamer? I need someone new to watch.",
        ],
        context: 'streamer は「配信者」。日本語の「実況者」に近い。I would rather は「むしろ～したい」。sit back は「リラックスして見る」。ゲーム実況を見る文化は日本発祥に近いけど、英語圏のTwitchで爆発的に広がった。watching > playing は今や世界的な現象。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 105, japanese: 'eスポーツってすごいらしいね',
        english: [
            'Esports is huge now.',
            'I heard esports is getting really big these days.',
            'Apparently esports players make more money than some professional athletes.',
            "Right? My nephew wants to go pro. The prize money for some tournaments is insane.",
        ],
        context: 'esports は e-sports とも書く。go pro は「プロになる」。prize pool は「賞金総額」。drop out は「中退する」。日本語では「eスポーツ」とカタカナだけど英語の発音は「イースポーツ」。some professional athletes の some は「一部の」で全員じゃないニュアンスが大事。',
        character: 'kenji', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 106: SNSの話 (Social Media Talk)
    // Scene: リサが居酒屋でインスタの写真を見せながらSNSあるあるを語る。全員それぞれのSNS事情を暴露。
    // ────────────────────────────────────────────────────

    {
        daySlot: 106, japanese: 'SNSやってる？',
        english: [
            'Are you on social media?',
            'Do you use social media at all?',
            'Are you on Instagram or anything? I want to follow you.',
            "Yeah, I'm on Instagram mostly. Here, I'll pull it up. Just don't judge my old posts.",
        ],
        context: '日本語の「SNS」は和製英語に近い。英語では social media と言う。SNSと言っても通じない。Are you on は「やってる？」の定番。platform は「プラットフォーム」。wall は Facebookの投稿欄。my dad has Facebook now は世代あるある。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 106, japanese: 'いいね押しといたよ',
        english: [
            'I liked your post.',
            'I saw your post and liked it.',
            'I liked your post from yesterday. That photo was great.',
            "Oh thanks! That was from the trip last weekend. I almost didn't post it 'cause the filter looked kinda weird.",
        ],
        context: 'liked は「いいねした」。英語では like が動詞としてそのまま使える。lurker は「見る専」。engaging with は「反応する」。scroll and like and move on は現代のSNS行動を完璧に表現。日本語の「いいね押す」は push/press じゃなくて like。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 106, japanese: 'フォロワー何人いる？',
        english: [
            'How many followers do you have?',
            'Wait, how many followers do you have?',
            'Just curious, how many followers do you have? I bet you have a lot.',
            "Like four hundred, I think? Honestly I stopped checking. It's mostly people I actually know.",
        ],
        context: 'followers は「フォロワー」。stuck at は「で止まっている」。algorithm は「アルゴリズム」で、SNSの表示順を決めるシステム。英語圏では What is the algorithm looking for? が口癖になっている。フォロワー数を聞くのはちょっとデリケートな話題。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 106, japanese: 'それ映える',
        english: [
            'That is so Instagrammable.',
            'That is super photogenic. You should post it.',
            'That would look amazing on Instagram. Take a picture before you eat it.',
            "Wait, don't eat yet! Let me get a pic first. The lighting here is perfect right now.",
        ],
        context: '「映える」は英語では Instagrammable が一番近い。photogenic は「写真映えする」で人にも物にも使える。watch the likes roll in は「いいねが集まるのを見る」。peak Instagram は「インスタの極み」。食べ物の写真を撮る文化は日本が元祖だけど今は世界共通。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 106, japanese: '炎上してるの見た？',
        english: [
            'Did you see the drama?',
            'Did you see that thing that blew up online?',
            'Have you seen what is going on? Someone is getting absolutely destroyed on Twitter.',
            "Oh yeah, I've been following that all day. The replies are absolutely brutal. Can't look away.",
        ],
        context: '「炎上」は英語だと blow up, go viral (for bad reasons), get canceled, internet drama など状況で変わる。tone-deaf は「空気読めない」。quote tweet は「引用RT」。guilty pleasure は「やめられない罪悪感のある楽しみ」。refreshing the thread は「スレッドを更新し続ける」。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 106, japanese: '既読スルーされた',
        english: [
            'I got left on read.',
            'They left me on read. It has been three hours.',
            'I sent a message this morning and they still have not replied. I can see they read it though.',
            "Ugh, that's the worst. Maybe they're just busy? I wouldn't overthink it.",
        ],
        context: 'left on read は「既読スルー」の英語版。read receipt は「既読通知」。hits different は「なんか違う刺さり方をする」のスラング。日本語の「既読スルー」はLINE文化から来たけど、英語圏でもiMessage のread receipts で同じ問題が発生している。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 106, japanese: 'アカウント消そうかな',
        english: [
            'I might delete my account.',
            'I am thinking about deleting my social media.',
            'I am so tired of social media. I might just delete everything and disappear.',
            "You say that every week. Just take a break for like a month and see how you feel.",
        ],
        context: 'delete my account は「アカウントを消す」。deactivate は「一時停止」で完全削除じゃない。comparing myself to は「自分と比べる」。keep in touch with は「連絡を取り合う」。SNS疲れは世界共通の問題で、英語では social media fatigue と呼ぶ。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 106, japanese: 'バズった',
        english: [
            'It went viral.',
            'My post went viral overnight.',
            'I posted something random and it blew up. I have no idea why.',
            "No way, how many likes did you get? Show me, show me!",
        ],
        context: 'went viral は「バズった」の英語。virus（ウイルス）のように広がるイメージ。blew up も同じ意味。buzz は「通知が鳴り続ける」。日本語の「バズる」は英語の buzz から来ているけど、英語では go viral の方がよく使う。buzzった のは和製用法。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 106, japanese: 'ストーリーに上げていい？',
        english: [
            'Can I post this on my story?',
            'Is it OK if I put this on my story?',
            'This is too good not to share. Can I post it on my story real quick?',
            "Sure, go ahead. Just make sure I don't look weird in it or I'll make you take it down.",
        ],
        context: 'story は Instagram や Snapchat の24時間で消える投稿。英語では put it on my story か post on my story。tag は「タグ付けする」。candid は「自然体の」（posed の反対）。peace sign は日本のVサインのこと。英語圏では peace sign と呼ぶ。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 106, japanese: 'あの人フォロー外した',
        english: [
            'I unfollowed them.',
            'I finally unfollowed that person.',
            'Their posts were annoying me so I just unfollowed them. No regrets.',
            "Good call. I should do the same. Half my feed is just people I don't even talk to anymore.",
        ],
        context: 'unfollow は「フォローを外す」。mute は「ミュートにする」（フォローしたまま非表示）。humble brag は「謙虚なフリした自慢」。nobody asked for は「誰も頼んでない」。one less は「一人減っても」。英語圏でもフォロー外すのはちょっとした決断。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 107: 動画配信 (YouTube and Streaming)
    // Scene: ミナがYouTuberになりたいと言い出して、居酒屋で企画会議が始まる。マスターが「わしも出るぞ」と張り切る。
    // ────────────────────────────────────────────────────

    {
        daySlot: 107, japanese: 'YouTubeばっかり見てる',
        english: [
            'I watch YouTube all day.',
            'I spend way too much time on YouTube.',
            'I do not even watch TV anymore. YouTube is all I need.',
            "Tell me about it. I went down a rabbit hole last night about how airports work and didn't sleep till three.",
        ],
        context: 'rabbit hole は「沼」。不思議の国のアリスのウサギの穴が語源。the algorithm keeps feeding me は「アルゴリズムが次々出してくる」。leaky faucet は「水漏れの蛇口」。YouTube を「テレビの代わり」として語るのは世代を超えた世界共通の現象。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 107, japanese: 'チャンネル登録してね',
        english: [
            'Subscribe to my channel.',
            'If you like this, subscribe and hit the bell.',
            'Make sure you subscribe so you do not miss the next video.',
            "Done! I just subscribed. Make sure you post regularly though, I hate dead channels.",
        ],
        context: 'subscribe は「チャンネル登録」。hit the bell は「ベルマークを押す」。wrap up は「終わりにする」。YouTuber が動画の最後に必ず言うテンプレ。日本語の「チャンネル登録よろしく」と全く同じ構造。hit that subscribe button は世界共通のお約束。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 107, japanese: '再生回数すごいね',
        english: [
            'That got a lot of views.',
            'Wow, that video has so many views.',
            'How did you get that many views? That is insane.',
            "I know, right? I think the algorithm picked it up. It just kept climbing overnight.",
        ],
        context: 'views は「再生回数」。hits/plays とも言う。niche は「ニッチ」（狭い分野）。picked up by the algorithm は「アルゴリズムに拾われた」。monetization は「収益化」。日本語の「再生回数」は play count だけど英語では views が圧倒的に自然。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 107, japanese: 'サムネが大事だよね',
        english: [
            'The thumbnail matters a lot.',
            'A good thumbnail makes all the difference.',
            'Nobody clicks on a boring thumbnail. You have to make it eye-catching.',
            "For real. I always click on the ones with a surprised face and big text. Works every time.",
        ],
        context: 'thumbnail は「サムネイル」。日本語では「サムネ」と略すけど英語では略さない。eye-catching は「目を引く」。dead serious は「超真剣」。judge a video by its thumbnail は「表紙で本を判断するな」(do not judge a book by its cover)のYouTube版。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 107, japanese: '広告多すぎ',
        english: [
            'Too many ads.',
            'There are way too many ads on this video.',
            'I cannot watch anything without getting hit with five ads first.',
            "Just get Premium already. I caved last month and honestly it's worth every penny.",
        ],
        context: 'ads は advertisements の略。ad break は「CM休憩」。skip は「スキップする」。out of hand は「手に負えない」。caved は「折れた・負けた」。Premium は「有料版」。英語圏でも YouTube の広告の多さは最大の不満の一つ。I finally caved は「ついに負けた」で課金した時の定番。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 107, japanese: 'おすすめの動画ある？',
        english: [
            'Any video recommendations?',
            'Can you recommend a good channel?',
            'I need something new to watch. What channels are you into?',
            "Oh, you'd love this one cooking channel I found. The guy's hilarious and the recipes are super easy.",
        ],
        context: 'in a rut は「マンネリ」。直訳は「轍にはまった」。fresh は「新鮮な」。reaction videos は「リアクション動画」。appeal は「魅力」。日本語の「おすすめ」は recommendation だけど、口語では What are you into? や What are you watching? の方が自然。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 107, japanese: '生配信見てた',
        english: [
            'I was watching a livestream.',
            'I caught a livestream earlier. It was really good.',
            'I stayed up way too late watching a live stream last night.',
            "Which streamer? I wanna check them out. Was it on Twitch or YouTube?",
        ],
        context: 'livestream は「生配信」。check in は「ちょっと見る」。chat は「コメント欄」。donate は「投げ銭する」。on air は「配信中に」。日本語の「生配信」は live stream で、生放送は live broadcast。streamer が viewer と interact するのが配信の醍醐味。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 107, japanese: 'コメント欄が面白い',
        english: [
            'The comments are hilarious.',
            'The comment section is the best part of the video.',
            'I always read the comments. Sometimes they are funnier than the actual video.',
            "Right? Sometimes the top comment is funnier than the whole video. I always scroll down first.",
        ],
        context: 'comment section は「コメント欄」。comments section でもOK。witty は「機知に富んだ」。art form は「芸術」と大げさに褒める表現。英語のYouTube コメント欄は独自の文化がある。pinned comment は「固定コメント」。top comment は「一番いいねが多いコメント」。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 107, japanese: '動画編集って大変そう',
        english: [
            'Video editing looks hard.',
            'Editing videos seems like so much work.',
            'I tried editing a video once and it took me forever. I have so much respect for creators.',
            "Yeah, my friend does YouTube and he spends like ten hours editing a five-minute video. It's no joke.",
        ],
        context: 'pump out は「大量に出す」。cutting は「カット編集」。transitions は「場面転換」。color grading は「色補正」。content creators は「クリエイター」。do not get enough credit は「正当に評価されていない」。日本語の「編集」は一語だけど英語は作業別に細かい名前がある。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 107, japanese: '案件動画っぽいな',
        english: [
            'This feels like a sponsored video.',
            'I think this is sponsored. They are definitely getting paid for this.',
            'You can always tell when a video is sponsored because they suddenly start talking about some random product.',
            "Oh, a hundred percent. The second they say 'speaking of which,' you know the ad is coming.",
        ],
        context: 'sponsored は「スポンサード・案件」。paid promotion は「有料プロモーション」。spot from a mile away は「すぐ見抜ける」。genuine は「本物の」。日本語の「案件」はビジネス用語だけど英語の sponsored はSNS文脈でほぼ「案件」専用。#ad のタグも義務。',
        character: 'master', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 108: オンラインショッピング (Online Shopping)
    // Scene: ユキがネットで買い物しすぎて後悔している。居酒屋で「またやっちゃった」と告白。みんな同罪。
    // ────────────────────────────────────────────────────

    {
        daySlot: 108, japanese: 'ネットで買った方が安い',
        english: [
            'It is cheaper online.',
            'Why would I buy it in a store when it is cheaper online?',
            'I always check online first because nine times out of ten it is cheaper.',
            "Totally. I saw these shoes at the mall for eighty bucks and got the same ones online for half that.",
        ],
        context: 'nine times out of ten は「十中八九」。try them on は「試着する」。free shipping は「送料無料」。looked it up は「調べた」。That is just math は「計算すれば分かる」のユーモア表現。英語圏でもネットvs店舗の価格差は最大の購買動機。',
        character: 'yuki', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 108, japanese: 'カートに入れたまま忘れてた',
        english: [
            'I left stuff in my cart.',
            'I have had things in my cart for like two weeks.',
            'I keep adding things to my cart but I never actually buy them. It is like window shopping.',
            "Ha, I do that too. My cart's basically a wish list at this point. I'll never actually check out.",
        ],
        context: 'cart は「カート」。日本語と同じ。window shopping は「ウインドウショッピング」だけど英語ではネットでもこの表現を使う。what I was thinking は「何考えてたんだろう」。all the fun, none of the guilt は対比表現でリズムが良い。',
        character: 'lisa', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 108, japanese: 'レビュー見てから決める',
        english: [
            'I check the reviews first.',
            'I always read the reviews before buying anything.',
            'I do not buy anything without checking the reviews. I have been burned too many times.',
            "Smart. I bought a charger without checking and it died in like two days. Never again.",
        ],
        context: 'reviews は「レビュー」。been burned は「痛い目にあった」。sort by most critical は「低評価順に並べる」。red flag は「危険信号」。fake reviews は「やらせレビュー」。日本語の「レビュー」と英語の review はほぼ同じだけど、英語では動詞としても使える。',
        character: 'kenji', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 108, japanese: '届くの遅すぎ',
        english: [
            'The shipping is so slow.',
            'I ordered it a week ago and it still has not arrived.',
            'I am tracking my package every five minutes like it is going to make it come faster.',
            "Have you tried checking the tracking? Mine said 'in transit' for a week and then just showed up randomly.",
        ],
        context: 'in transit は「輸送中」。tracking は「追跡」。five business days は「営業日5日」（土日祝を含まない）。out for delivery は「配達中」。customer service は「カスタマーサービス」。might as well は「いっそ～した方がいい」。配送の遅さへの怒りは万国共通。',
        character: 'takeshi', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 108, japanese: '思ってたのと違った',
        english: [
            'It was not what I expected.',
            'It looked completely different in the photos.',
            'When it arrived, it looked nothing like the pictures. I want my money back.',
            "Ugh, that happens all the time. Just return it and leave a one-star review so others don't fall for it.",
        ],
        context: 'looked nothing like は「全然似てなかった」。see-through は「透ける」。size chart は「サイズ表」。total lie は「完全に嘘」。returning は「返品する」。英語では期待と現実のギャップを expectation vs reality と呼ぶ。ネットショッピングの永遠のテーマ。',
        character: 'yuki', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 108, japanese: 'セール始まってるよ',
        english: [
            'The sale just started.',
            'Hey, there is a huge sale going on right now.',
            'I just got a notification that the sale started. I need to check it before everything sells out.',
            "Oh no, don't tell me that. I'm trying to save money this month. How long does it last?",
        ],
        context: 'sells out は「売り切れる」。deals は「お得な商品」。saving money by spending money は英語でもジョークとして定番。convince myself は「自分を納得させる」。notification は「通知」。日本語の「ポチる」に当たる英語はないけど add to cart や one-click buy が近い。',
        character: 'mina', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 108, japanese: '返品できる？',
        english: [
            'Can I return this?',
            'Do you know if this is returnable?',
            'I need to return this but I already threw away the box. Do you think they will still take it?',
            "Check the return policy first. Most places give you thirty days, but you might need the original box.",
        ],
        context: 'return は「返品する」。return policy は「返品規定」。cutting it close は「ギリギリ」。original packaging は「元の包装」。returnable は「返品可能な」。日本と比べて英語圏（特にアメリカ）の返品文化はかなり寛容。used it once でも返品できることが多い。',
        character: 'lisa', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 108, japanese: 'ポイント貯まってる',
        english: [
            'I have a lot of points saved up.',
            'I have been saving my points for this moment.',
            'I have enough points to get this for free. This is the happiest day of my life.',
            "Nice! What are you gonna spend them on? You should get something good if you've been saving that long.",
        ],
        context: 'points は「ポイント」。saved up は「貯めた」。hoarding は「溜め込む」（ちょっとネガティブなニュアンス）。paying off は「報われる」。日本のポイント文化は世界でもトップクラスだけど、英語圏でも rewards points, loyalty points は一般的。',
        character: 'kenji', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 108, japanese: '衝動買いしちゃった',
        english: [
            'I bought it on impulse.',
            'It was a total impulse buy. I do not even need it.',
            'I was not planning to buy anything but then I saw this deal and I could not resist.',
            "What'd you get? Please tell me it's not another kitchen gadget you'll use once.",
        ],
        context: 'impulse buy は「衝動買い」。friction は「摩擦・障壁」。think twice は「よく考える」。one-click buy は Amazon の「1-Click注文」。hand over cash は「現金を手渡す」。日本語の「衝動買い」と impulse buy は完全に同じ概念。ネットの手軽さが原因なのも同じ。',
        character: 'master', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 108, japanese: 'サブスク増えすぎた',
        english: [
            'I have too many subscriptions.',
            'I just realized I am paying for like seven subscriptions.',
            'I need to cancel some of these subscriptions. I am bleeding money every month.',
            "Same here. I found out I was still paying for an app I hadn't opened in six months. Canceled it right away.",
        ],
        context: 'subscriptions は「サブスク」。bleeding money は「金が出血している」（大量に出ていく比喩）。add up は「積み重なる」。signed up for は「登録した」。日本語の「サブスク」は英語 subscription の略だけど、英語では略さない。sub とも言わない。',
        character: 'takeshi', category: 'shopping', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 109: アプリの話 (Talking About Apps)
    // Scene: ケンジが新しいアプリを見つけたと興奮して居酒屋に来る。みんなでおすすめアプリ交換会が始まる。
    // ────────────────────────────────────────────────────

    {
        daySlot: 109, japanese: 'このアプリ便利だよ',
        english: [
            'This app is really useful.',
            'You should try this app. It is super handy.',
            'I found this app that makes everything so much easier. Let me show you.',
            "Wait, really? Send me the link. I've been looking for something like that.",
        ],
        context: 'handy は「便利な」で useful より口語的。splitting the bill は「割り勘」。scan the receipt は「レシートをスキャンする」。how I lived without it は「なしでどうやって生きてたのか」の定番表現。日本語の「便利」は一語で済むけど英語は useful, handy, convenient と場面で使い分ける。',
        character: 'kenji', category: 'request', month: '2026-07',
    },
    {
        daySlot: 109, japanese: 'アプリが落ちた',
        english: [
            'The app crashed.',
            'The app just crashed on me right in the middle of something.',
            'I was doing something important and the app crashed. I lost everything.',
            "Did you try closing it and reopening? Mine does that too. I think the latest update is buggy.",
        ],
        context: 'crashed は「落ちた・強制終了した」。crashed on me の on me は「自分に対して」で被害者感を出す。auto-save は「自動保存」。bug は「バグ」。force you to update は「強制アップデートさせる」。go and break it は「わざわざ壊す」のニュアンス。',
        character: 'mina', category: 'request', month: '2026-07',
    },
    {
        daySlot: 109, japanese: '通知多すぎてオフにした',
        english: [
            'I turned off the notifications.',
            'The notifications were driving me crazy so I turned them all off.',
            'I could not take it anymore. My phone was buzzing every five minutes with useless notifications.',
            "Honestly, best decision ever. I did the same thing last month and my phone's been so peaceful.",
        ],
        context: 'notifications は「通知」。driving me crazy は「イライラさせる」。buzzing は「ブブッと鳴る」。Nobody asked は「誰も頼んでない」。日本語の「通知オフ」は英語で turn off notifications。push notifications は「プッシュ通知」。通知疲れは世界共通の現代病。',
        character: 'kenji', category: 'request', month: '2026-07',
    },
    {
        daySlot: 109, japanese: 'ストレージがいっぱい',
        english: [
            'My storage is full.',
            'I cannot download anything. My phone says storage is full.',
            'I need to delete some apps but I do not know which ones to get rid of.',
            "Try clearing your cache first. That freed up like five gigs on mine without deleting anything.",
        ],
        context: 'storage is full は「ストレージがいっぱい」。out of storage は「容量がない」。taking up は「占めている」。bring myself to は「～する気になる」。what if は「もし～だったら」。ストレージ不足は iPhone あるあるで世界共通の悩み。写真を消せないのも同じ。',
        character: 'yuki', category: 'request', month: '2026-07',
    },
    {
        daySlot: 109, japanese: 'アップデートしたら使いにくくなった',
        english: [
            'The update made it worse.',
            'They updated the app and now I hate it.',
            'Why do they keep changing things that were working fine? The new layout is terrible.',
            "Ugh, same thing happened with my banking app. Took me forever to find the transfer button.",
        ],
        context: 'pushed this update は「アップデートを配信した」。redesign は「デザイン変更」。if it is not broken, do not fix it は英語のことわざで「壊れてないなら直すな」。layout は「レイアウト」。color scheme は「配色」。アプリのアップデートへの不満は英語圏でも最も共感される話題の一つ。',
        character: 'master', category: 'request', month: '2026-07',
    },
    {
        daySlot: 109, japanese: '課金する価値ある？',
        english: [
            'Is it worth paying for?',
            'Should I get the paid version? Is it worth it?',
            'I have been using the free version but I am wondering if the upgrade is worth it.',
            "I got the paid version and honestly it's night and day. The free one is so limited.",
        ],
        context: 'worth paying for は「課金する価値がある」。paywall は「課金の壁」。locked behind は「の裏に隠されている」。premium は「有料版」。adds up は「積み重なる」。日本語の「課金」は英語で in-app purchase や premium upgrade。worth it? は判断を仰ぐ時の超定番。',
        character: 'lisa', category: 'request', month: '2026-07',
    },
    {
        daySlot: 109, japanese: 'パスワード忘れた',
        english: [
            'I forgot my password.',
            'I cannot log in. I forgot my password again.',
            'This is like the tenth time I have reset my password. I can never remember it.',
            "Dude, just get a password manager. It remembers everything so you don't have to.",
        ],
        context: 'reset my password は「パスワードをリセットする」。capital letter は「大文字」。special character は「特殊文字」。password manager は「パスワード管理アプリ」。日本語の「パスワード忘れた」は I forgot my password でそのまま。パスワード地獄は世界共通の悩み。',
        character: 'takeshi', category: 'request', month: '2026-07',
    },
    {
        daySlot: 109, japanese: 'このアプリ怪しくない？',
        english: [
            'This app looks sketchy.',
            'I do not trust this app. It is asking for too many permissions.',
            'Why does a flashlight app need access to my contacts and microphone?',
            "Yeah, hard pass. If a simple app asks for that many permissions, something shady's going on.",
        ],
        context: 'sketchy は「怪しい」のカジュアル表現。suspicious より口語的。permissions は「アクセス権限」。red flag は「危険信号」。backed out は「やめた」。shady は「怪しい」。hard pass は「絶対やらない」。アプリの権限問題はプライバシー意識の高い英語圏で特に議論される。',
        character: 'kenji', category: 'request', month: '2026-07',
    },
    {
        daySlot: 109, japanese: '地図アプリないと無理',
        english: [
            'I cannot go anywhere without a map app.',
            'I am hopeless without Google Maps.',
            'If my phone dies while I am navigating, I am completely lost. Literally.',
            "Same. I used it to go to the convenience store the other day. My sense of direction is that bad.",
        ],
        context: 'sense of direction は「方向感覚」。navigating は「ナビを使って移動中」。traffic jam は「渋滞」。who is laughing now は「今笑ってるのは誰？」の勝利宣言。日本語の「方向音痴」は英語で have no sense of direction。map app は地図アプリ。GPS に頼る生活は世界共通。',
        character: 'yuki', category: 'request', month: '2026-07',
    },
    {
        daySlot: 109, japanese: 'フリマアプリで売れた',
        english: [
            'It sold on the app.',
            'I listed it and it sold within an hour.',
            'I put it on a selling app and someone bought it right away. I could not believe it.',
            "Wait, already? How much did you sell it for? I've got a bunch of stuff I should list too.",
        ],
        context: 'resale app は「フリマアプリ」。listed は「出品した」。cleaned out は「整理した」。sold for は「で売れた」。日本語の「メルカリ」に当たる英語圏のアプリは Mercari(米国にもある), eBay, Poshmark, Facebook Marketplace など。フリマの英語は flea market だけどアプリ文脈では resale app。',
        character: 'mina', category: 'request', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 110: ネット用語 (Internet Slang)
    // Scene: マスターがネットスラングを全く理解できず、若者たちに翻訳してもらう。世代間ギャップが笑いを生む。
    // ────────────────────────────────────────────────────

    {
        daySlot: 110, japanese: 'それ草',
        english: [
            'That is hilarious.',
            'I am dying. That is so funny.',
            'I literally cannot stop laughing. Send help.',
            "I know, right? I almost spit out my drink when I saw it. Send it to the group chat.",
        ],
        context: '日本語の「草」は笑いの意味だけど英語にはwwwに当たるスラングが複数ある。lol, lmao, I am dead, I am dying, crying laughing など。テキストでは lol が一番近いけど口頭では I am dying が自然。「草」の由来（www=草に見える）は日本独自のネット文化。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 110, japanese: 'それってどういう意味？',
        english: [
            'What does that mean?',
            'Wait, what does that even mean?',
            'I keep seeing that word online but I have no idea what it means.',
            "Oh, it basically means you agree with someone's bold take. Like 'that's a based opinion.' Don't worry, I had to look it up too.",
        ],
        context: 'based は「自分の意見を堂々と言う（褒め言葉）」。no cap は「マジで（嘘じゃなく）」。slay は「最高にイケてる」。ネットスラングは変化が早くて非ネイティブには追いつけない。looking them up は「調べた」。use more slang to explain the slang は辞書あるある。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 110, japanese: 'ネットで見た',
        english: [
            'I saw it online.',
            'I saw this thing online the other day.',
            'I came across this post online and I have not been able to stop thinking about it.',
            "Oh yeah? What was it about? I always end up down some random rabbit hole at midnight.",
        ],
        context: 'I saw it online は日本語の「ネットで見た」の直訳で完璧に通じる。came across は「偶然見つけた」。feed は「タイムライン」。realization は「気づき」。life-changing from a random post は現代のインターネットの本質を表す表現。scrolling は「スクロールする」で動詞として完全に定着。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 110, japanese: 'ミームで見たことある',
        english: [
            'I have seen that meme.',
            'Oh I know that meme. It is everywhere right now.',
            'That meme has been all over my feed. Everyone is using it.',
            "Ha, I literally sent that to like ten people today. It fits everything going on right now.",
        ],
        context: 'meme は「ミーム」で発音は「ミーム」（メメじゃない）。all over my feed は「タイムライン中に」。versatile は「汎用性のある」。inescapable は「逃げられない」。日本語では「ミーム」が定着してきたけど、英語のmeme はリチャード・ドーキンスの造語で元は文化的遺伝子の意味。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 110, japanese: 'フェイクニュースじゃない？',
        english: [
            'That sounds like fake news.',
            'Are you sure that is real? It might be fake news.',
            'I would double-check that before believing it. There is a lot of misinformation out there.',
            "Yeah, I saw that too. Turns out it was from a satire site. People were sharing it like it was real.",
        ],
        context: 'fake news は「フェイクニュース」でそのまま英語。double-check は「再確認する」。misinformation は「誤情報」（意図なし）。disinformation は「偽情報」（意図あり）。satire site は「風刺サイト」。verify は「確認する」。trigger an emotional reaction は「感情的な反応を引き起こす」。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 110, japanese: 'ググればいいじゃん',
        english: [
            'Just Google it.',
            'Why are you asking me? Just Google it.',
            'You know you have the entire internet in your pocket, right? Just look it up.',
            "I know, I know. But asking you is more fun than staring at a screen. Come on, just tell me.",
        ],
        context: 'Google it は動詞として完全に定着。「ググる」の英語版。look it up は「調べる」の汎用表現。I am not a search engine は「私は検索エンジンじゃない」のユーモア。日本語の「ググれ」と Just Google it は文化的にも完全に同じ使い方。to be fair は「でも正直」の前置き。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 110, japanese: 'バズりたい',
        english: [
            'I want to go viral.',
            'I wish one of my posts would go viral.',
            'I have been trying to make a viral post but nothing I do works.',
            "Just post something random and stop trying so hard. The stuff that blows up is never the stuff you plan.",
        ],
        context: 'go viral は「バズる」。virality は「バズり」の名詞形。peak hours は「投稿が見られやすい時間帯」。trending hashtags は「トレンドのハッシュタグ」。reels は Instagram の短い動画。日本語の「バズる」は buzz から来ているけど英語では go viral が主流。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 110, japanese: 'オフラインで会おうよ',
        english: [
            'Let us meet in person.',
            'We should actually hang out in real life.',
            'We talk online all the time but we never actually see each other. Let us fix that.',
            "You're right, it's been way too long. How about this Saturday? Let's grab dinner somewhere.",
        ],
        context: 'in person は「直接会って」。IRL (in real life) もよく使う。hang out は「遊ぶ」。maintaining friendships は「友情を維持する」。英語の meet up は「会う」のカジュアル版。日本語の「リアルで会おう」は Let us meet IRL か in person。online vs offline の対比は現代の定番テーマ。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 110, japanese: 'ネットの情報鵜呑みにするな',
        english: [
            'Do not believe everything online.',
            'Take what you read online with a grain of salt.',
            'Just because it is on the internet does not mean it is true.',
            "Ha, tell that to my dad. He believes everything he reads on Facebook. It drives me nuts.",
        ],
        context: 'with a grain of salt は「話半分に聞く」の英語。直訳は「塩一粒と一緒に」。gospel は「福音書・絶対的真実」。media literacy は「メディアリテラシー」。日本語の「鵜呑みにする」は「鵜が魚を丸呑みする」イメージだけど英語は「塩を添えて」のイメージ。全く違う比喩で同じ意味。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 110, japanese: 'ネットがないと生きていけない',
        english: [
            'I cannot live without the internet.',
            'I honestly do not know what I would do without the internet.',
            'If the internet went down for a week I think society would collapse.',
            "For real. When the Wi-Fi went out last week I just sat there staring at the wall like a lost puppy.",
        ],
        context: 'cannot live without は「なしでは生きられない」。went down は「ダウンした」。collapse は「崩壊する」。function は「機能する」。paper map は「紙の地図」。日本語の「ネットがないと無理」は英語でそのまま I cannot live without the internet。依存の自覚は世界共通。',
        character: 'lisa', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 111: デジタルデトックス (Digital Detox)
    // Scene: リサが「週末スマホ断ちした」と報告。みんな興味津々だけど、できる気がしない。
    // ────────────────────────────────────────────────────

    {
        daySlot: 111, japanese: 'スマホ見すぎだよね',
        english: [
            'I look at my phone too much.',
            'I know I spend way too much time on my phone.',
            'I checked my screen time report and it was embarrassing. Seven hours a day.',
            "Seven hours? That's brutal. Mine said five and I was already in denial about it.",
        ],
        context: 'screen time は「スクリーンタイム」。tracking app は「計測アプリ」。endlessly scrolling は「エンドレスにスクロール」。日本語の「スマホ見すぎ」は英語で I spend too much time on my phone。「スクリーンタイム」は iPhone の機能名としても定着。7時間は世界平均に近い数字。',
        character: 'yuki', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 111, japanese: 'デジタルデトックスしてみた',
        english: [
            'I tried a digital detox.',
            'I went the whole weekend without my phone.',
            'I did a digital detox last weekend. No phone, no laptop, no screens at all.',
            "No way. The whole weekend? I'd last maybe three hours before caving. How'd you survive?",
        ],
        context: 'digital detox は「デジタルデトックス」で日英同じ。phantom limb は「幻肢」（切断した手足がまだあるように感じる現象）。shifted は「変わった」。paper book は「紙の本」。reaching for は「手を伸ばす」。スマホ依存からの解放体験を語る定番パターン。',
        character: 'lisa', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 111, japanese: '通知が気になって仕方ない',
        english: [
            'I keep thinking about my notifications.',
            'I cannot stop wondering what I am missing.',
            'Even without my phone, I keep imagining it buzzing in my pocket.',
            "That's literally FOMO. Your brain tricks you into thinking you're missing something important, but you're really not.",
        ],
        context: 'FOMO は Fear Of Missing Out の略で「取り残される恐怖」。phantom vibrations は「ファントムバイブレーション」で実際に研究されている現象。breaking news は「速報」。makes them up は「作り上げる」。FOMO は現代英語の必須語彙。日本語でも「フォーモ」と使い始めている。',
        character: 'takeshi', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 111, japanese: '寝る前のスマホやめたい',
        english: [
            'I should stop using my phone before bed.',
            'I know scrolling before bed is bad but I cannot stop.',
            'Every night I tell myself I will put my phone down at eleven and every night I fail.',
            "Try putting your phone across the room before bed. It's annoying at first but it actually works.",
        ],
        context: 'blue light は「ブルーライト」。melatonin は「メラトニン」。the definition of insanity は「狂気の定義」（同じことを繰り返して違う結果を期待すること）。アインシュタインの言葉として有名だけど実際の出典は不明。寝る前スマホの悪循環は世界共通。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 111, japanese: 'たまにはオフラインもいいよ',
        english: [
            'Being offline is nice sometimes.',
            'It is actually nice to disconnect once in a while.',
            'I forgot how good it feels to just be present without checking my phone every five minutes.',
            "I should really try that. Even just a few hours without my phone sounds kinda nice right now.",
        ],
        context: 'disconnect は「つながりを切る」。once in a while は「たまに」。be present は「今この瞬間にいる」（マインドフルネス的な概念）。twenty-four seven は「24時間7日＝常に」。日本語の「オフライン」は英語でもoffline。being offline has its perks も使える表現。',
        character: 'lisa', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 111, japanese: '目が疲れる',
        english: [
            'My eyes are so tired.',
            'I have been staring at screens all day and my eyes are killing me.',
            'I need to give my eyes a break. Everything is starting to look blurry.',
            "Have you tried those blue light glasses? I got a pair last month and my headaches went away almost immediately.",
        ],
        context: '20-20-20 rule は眼科医が推奨する目の休め方。my eyes are killing me は「目がめちゃくちゃ疲れる」。blurry は「ぼやける」。on fire は「燃えるように痛い」。screen fatigue は「画面疲れ」。日本語の「目が疲れた」は My eyes are tired でOKだけど、killing me の方がリアルな訴え方。',
        character: 'kenji', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 111, japanese: 'Wi-Fiが繋がらない',
        english: [
            'The Wi-Fi is not working.',
            'Why is the Wi-Fi not connecting? This is so frustrating.',
            'I have been trying to connect for ten minutes. I think the router needs to be restarted.',
            "Have you tried restarting the router? That usually fixes it. Just unplug it for like ten seconds.",
        ],
        context: 'Wi-Fi is not working は「Wi-Fiが繋がらない」の最も自然な英語。日本語では「繋がる」だけど英語は working か connecting。forgotten the network は「ネットワークを削除した」（設定の操作）。mobile data は「モバイルデータ」。restart the router は「ルーターを再起動する」。全世界共通のIT対処法。',
        character: 'yuki', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 111, japanese: '充電がもうない',
        english: [
            'My battery is dying.',
            'I am at three percent. Does anyone have a charger?',
            'My phone is about to die and I do not have my charger. This is an emergency.',
            "Here, use mine. I've got a portable charger in my bag. You can borrow it till we leave.",
        ],
        context: 'my battery is dying は「充電がなくなりそう」の定番。at three percent は「3%」。charger は「充電器」。conserve battery は「バッテリーを節約する」。draining は「減っていく」。日本語の「充電ない」は My battery is dead（完全切れ）か dying（切れそう）で区別する。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 111, japanese: 'アナログな時間も大事だよ',
        english: [
            'Analog time is important too.',
            'We need more time away from screens.',
            'There is something special about doing things the old-fashioned way once in a while.',
            "You sound like my grandpa. But honestly, you've got a point. Maybe I'll try reading a real book this weekend.",
        ],
        context: 'analog は「アナログ」だけど英語の発音は「アナログ」じゃなくて「アナラグ」。old-fashioned は「昔ながらの」。permanent は「永続的な」。went all digital は「全てデジタルにした」。日本語の「アナログ」は人に対しても使うけど（アナログ人間）、英語では old school とか not tech-savvy と言う。',
        character: 'master', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 111, japanese: 'ネットと上手く付き合いたい',
        english: [
            'I want a healthy relationship with tech.',
            'I need to find a balance with technology.',
            'I do not want to quit the internet. I just want to use it more intentionally.',
            "That's a good way to put it. I don't wanna quit everything, I just wanna stop doom scrolling at two AM.",
        ],
        context: 'intentionally は「意識的に」。mindlessly は「無意識に」。doom scrolling は「悪いニュースを延々とスクロールし続けること」。catch myself は「自分がやっているのに気づく」。日本語の「上手く付き合う」は英語で healthy relationship with で表現。balance が大事というメッセージは全世界共通のデジタル時代のテーマ。',
        character: 'lisa', category: 'feeling', month: '2026-07',
    },
];

// ============================================================
// DAY THEMES -- MONTH 4 WEEK 15
// ============================================================

export const MONTH4_W15_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    105: {
        title: 'ゲームする', titleEn: 'Gaming', category: 'social',
        scene: 'タケシが居酒屋でスマホゲームをやりながら飲んでいる。ケンジが「いい歳して」と突っ込むが、自分もハマっている。',
        keywords: [
            { en: 'grind', ja: 'レベル上げ', pron: 'グラインド', example: 'I have been grinding all week to reach max level.', note: '元は「すり潰す」。退屈な反復作業の意味。ゲーム以外でも仕事の単調作業に使う。the daily grind=日々の仕事。' },
            { en: 'rage quit', ja: 'キレてやめる', pron: 'レイジクイット', example: 'He rage quit after dying three times in a row.', note: 'rage=激怒+quit=やめる。ゲーマー用語が日常語に。仕事をキレて辞めるにも使う。' },
            { en: 'lag', ja: '遅延', pron: 'ラグ', example: 'The lag is so bad I cannot play.', note: '通信遅延のこと。日本語でも「ラグい」と言うけど英語ではlaggy。jet lag=時差ボケ も同じ語源。' },
            { en: 'microtransaction', ja: '少額課金', pron: 'マイクロトランザクション', example: 'The microtransactions in this game are ridiculous.', note: 'micro=小さい+transaction=取引。100円200円の小さい課金が積み重なる仕組み。略してMTXとも。' },
            { en: 'noob', ja: '初心者', pron: 'ヌーブ', example: 'I am such a noob at this game.', note: 'newbieの変形。初心者をバカにするニュアンスもあるけど自虐でも使う。反対語はpro, veteran。' },
        ],
    },
    106: {
        title: 'SNSの話', titleEn: 'Social Media Talk', category: 'social',
        scene: 'リサが居酒屋でインスタの写真を見せながらSNSあるあるを語る。全員それぞれのSNS事情を暴露。',
        keywords: [
            { en: 'viral', ja: 'バズった', pron: 'ヴァイラル', example: 'My post went viral overnight.', note: 'virus(ウイルス)のように広がるイメージ。go viral=バズる。日本語の「バズる」はbuzzから来ているけど英語ではviralが主流。' },
            { en: 'follower', ja: 'フォロワー', pron: 'フォロワー', example: 'I gained a thousand followers in one day.', note: 'follow=ついていく+er=人。following=フォロー中の人数。mutual=相互フォロー。英語でもfollower数は社会的通貨。' },
            { en: 'influencer', ja: 'インフルエンサー', pron: 'インフルエンサー', example: 'She is a food influencer with a million followers.', note: 'influence=影響力+er。micro influencer=小規模インフルエンサー。日本語と英語でほぼ同じ使い方。' },
            { en: 'algorithm', ja: 'アルゴリズム', pron: 'アルゴリズム', example: 'The algorithm keeps showing me cat videos.', note: 'SNSの表示順を決めるシステム。beat the algorithm=アルゴリズムに勝つ。feed=タイムラインもセット語彙。' },
            { en: 'lurker', ja: '見る専', pron: 'ラーカー', example: 'I am mostly a lurker. I rarely post anything.', note: 'lurk=潜む。投稿せず見るだけの人。lurking=ROMってる。日本語の「ROM」に近い。英語圏でも半数以上がlurker。' },
        ],
    },
    107: {
        title: '動画配信', titleEn: 'YouTube and Streaming', category: 'social',
        scene: 'ミナがYouTuberになりたいと言い出して、居酒屋で企画会議が始まる。マスターが「わしも出るぞ」と張り切る。',
        keywords: [
            { en: 'subscribe', ja: '登録する', pron: 'サブスクライブ', example: 'Subscribe to my channel for weekly updates.', note: 'sub=下+scribe=書く。元は「署名して購読する」。subscriber=登録者。unsubscribe=登録解除。日本語の「サブスク」はここから。' },
            { en: 'thumbnail', ja: 'サムネイル', pron: 'サムネイル', example: 'A good thumbnail can double your views.', note: 'thumb=親指+nail=爪。親指の爪サイズの小さい画像が語源。日本語では「サムネ」と略すけど英語では略さない。' },
            { en: 'monetize', ja: '収益化する', pron: 'マネタイズ', example: 'You need a thousand subscribers to monetize your channel.', note: 'money→monetize。YouTubeの収益化条件は国によって違う。demonetize=収益化剥奪。ad revenue=広告収入。' },
            { en: 'content creator', ja: 'クリエイター', pron: 'コンテントクリエイター', example: 'Being a content creator is harder than it looks.', note: 'YouTuber, streamer, influencer の上位概念。creator economy=クリエイター経済。日本語の「クリエイター」より範囲が広い。' },
            { en: 'clickbait', ja: '釣りタイトル', pron: 'クリックベイト', example: 'That title is total clickbait.', note: 'click=クリック+bait=餌。クリックさせるための大げさなタイトル。日本語の「釣り」と全く同じ発想。bait and switch=おとり商法。' },
        ],
    },
    108: {
        title: 'オンラインショッピング', titleEn: 'Online Shopping', category: 'shopping',
        scene: 'ユキがネットで買い物しすぎて後悔している。居酒屋で「またやっちゃった」と告白。みんな同罪。',
        keywords: [
            { en: 'cart', ja: 'カート', pron: 'カート', example: 'I have thirty items in my cart but I am not buying any of them.', note: 'shopping cart=買い物カゴ。add to cart=カートに入れる。checkout=レジに進む。abandon cart=カートを放棄する（マーケ用語）。' },
            { en: 'refund', ja: '返金', pron: 'リファンド', example: 'I requested a full refund.', note: 're=戻す+fund=資金。full refund=全額返金。partial refund=一部返金。refundable=返金可能。no refund=返金不可。' },
            { en: 'coupon', ja: 'クーポン', pron: 'クーポン', example: 'I found a coupon code online and saved twenty percent.', note: '英語の発音は「クーパン」に近い。coupon code=クーポンコード。promo code=プロモコード。discount=割引はもっと広い意味。' },
            { en: 'shipping', ja: '配送', pron: 'シッピング', example: 'Free shipping on orders over fifty dollars.', note: 'ship=船→送る。free shipping=送料無料。express shipping=速達。tracking number=追跡番号。日本語の「送料」は shipping fee/cost。' },
            { en: 'impulse buy', ja: '衝動買い', pron: 'インパルスバイ', example: 'That jacket was a total impulse buy.', note: 'impulse=衝動+buy=買う。impulse purchase も同じ。buyer\'s remorse=買った後の後悔。retail therapy=買い物でストレス発散。' },
        ],
    },
    109: {
        title: 'アプリの話', titleEn: 'Talking About Apps', category: 'request',
        scene: 'ケンジが新しいアプリを見つけたと興奮して居酒屋に来る。みんなでおすすめアプリ交換会が始まる。',
        keywords: [
            { en: 'crash', ja: '落ちる', pron: 'クラッシュ', example: 'The app crashed right in the middle of my work.', note: '元は「衝突する」。アプリが落ちる=crash。freeze=固まる。bug=不具合。glitch=一時的な不具合。crash は最も深刻。' },
            { en: 'update', ja: 'アップデート', pron: 'アップデイト', example: 'I need to update the app to the latest version.', note: 'up+date=最新にする。auto-update=自動更新。forced update=強制更新。patch=小さい修正。日本語の「アプデ」は英語にはない略語。' },
            { en: 'notification', ja: '通知', pron: 'ノティフィケイション', example: 'I turned off all notifications except messages.', note: 'notify=知らせる→notification。push notification=プッシュ通知。pop-up=ポップアップ。badge=アプリの赤い数字。alert=警告通知。' },
            { en: 'permission', ja: 'アクセス権限', pron: 'パーミッション', example: 'This app is asking for too many permissions.', note: 'permit=許可する→permission。location permission=位置情報の許可。camera access=カメラアクセス。privacy settings=プライバシー設定。' },
            { en: 'password', ja: 'パスワード', pron: 'パスワード', example: 'I forgot my password for the fifth time this month.', note: 'pass+word=通行のための言葉。two-factor authentication=二段階認証。biometric=生体認証。reset password=パスワードリセット。' },
        ],
    },
    110: {
        title: 'ネット用語', titleEn: 'Internet Slang', category: 'social',
        scene: 'マスターがネットスラングを全く理解できず、若者たちに翻訳してもらう。世代間ギャップが笑いを生む。',
        keywords: [
            { en: 'meme', ja: 'ミーム', pron: 'ミーム', example: 'That meme is all over my feed right now.', note: 'リチャード・ドーキンスの造語。文化の遺伝子。発音は「ミーム」で「メメ」ではない。dank meme=最高のミーム（スラング）。' },
            { en: 'troll', ja: '荒らし', pron: 'トロール', example: 'Do not feed the trolls. Just ignore them.', note: '元は北欧神話の怪物。ネットで人を怒らせる行為。do not feed the trolls=荒らしに反応するな。trolling=荒らし行為。' },
            { en: 'FOMO', ja: '取り残される恐怖', pron: 'フォーモー', example: 'I have major FOMO when I see my friends posting from vacation.', note: 'Fear Of Missing Out の略。反対語はJOMO=Joy Of Missing Out。FOMO は正式な心理学用語にもなりつつある。' },
            { en: 'ghosting', ja: '既読無視・音信不通', pron: 'ゴースティング', example: 'She ghosted me after our second date.', note: 'ghost=幽霊→消える。突然連絡を絶つこと。主にデート文脈で使うけど友人や仕事でも。ghosted=された側。' },
            { en: 'flex', ja: '自慢する', pron: 'フレックス', example: 'He is always flexing on social media.', note: '元は「筋肉を見せつける」。humble flex=さりげない自慢。no flex=自慢じゃないけど。weird flex but OK=謎の自慢だけどまあいいか。' },
        ],
    },
    111: {
        title: 'デジタルデトックス', titleEn: 'Digital Detox', category: 'feeling',
        scene: 'リサが「週末スマホ断ちした」と報告。みんな興味津々だけど、できる気がしない。',
        keywords: [
            { en: 'screen time', ja: 'スクリーンタイム', pron: 'スクリーンタイム', example: 'My average screen time is seven hours a day.', note: '画面を見ている時間。iPhoneの機能名でもある。daily screen time=1日の画面時間。reduce screen time=スクリーンタイムを減らす。' },
            { en: 'unplug', ja: 'デジタルから離れる', pron: 'アンプラグ', example: 'I need to unplug for a while and just relax.', note: 'un+plug=プラグを抜く。disconnect と同じ意味。unplugged=アコースティックの意味もある（MTV Unplugged）。' },
            { en: 'doom scrolling', ja: '悪いニュースを延々見る', pron: 'ドゥームスクローリング', example: 'I was doom scrolling until two AM last night.', note: 'doom=破滅+scrolling。悪いニュースを止められずにスクロールし続けること。2020年のコロナ禍で広まった新語。' },
            { en: 'blue light', ja: 'ブルーライト', pron: 'ブルーライト', example: 'Blue light from screens can mess with your sleep.', note: '画面から出る青い光。blue light glasses=ブルーライトカットメガネ。night mode=ナイトモード。科学的効果は議論中。' },
            { en: 'mindful', ja: '意識的な', pron: 'マインドフル', example: 'I am trying to be more mindful about my phone usage.', note: 'mind+ful=心がいっぱい。mindfulness=マインドフルネス。mindless scrolling=無意識のスクロール。mindful vs mindless は対の概念。' },
        ],
    },
};
