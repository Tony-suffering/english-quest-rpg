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
            "I finished that RPG I was telling you about and now I have nothing to play. I have been scrolling through the store for like an hour every night and nothing looks good. What have you been playing? I need someone to just tell me what to download because I have zero motivation to figure it out myself. I just want something I can pick up and play without watching a twenty-minute tutorial first.",
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
            "I am not even exaggerating, I played for six hours straight last night. I looked at the clock and it was three AM and I had to be up at seven. This game is ruining my life in the best way possible. My girlfriend keeps getting mad at me because I am always on my phone but I cannot help it. The gameplay loop is just too good. Every time I say I will stop after this round, I end up doing five more.",
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
            "We should totally squad up tonight. I will be on after dinner, probably around nine. Just add me and we can run some matches together. I have been looking for someone to play with because solo queue is driving me insane. Every time I get matched with randoms they either rage quit or do not know what they are doing. At least if we play together we can actually coordinate.",
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
            "I checked my purchase history the other day and I almost had a heart attack. I have spent over three hundred dollars on this free-to-play game in the past two months. Three hundred dollars on a game that is supposed to be free. The gacha system is designed to take your money and I keep falling for it every single time. I tell myself I will just do one pull and then I end up doing twenty because the rates are so bad.",
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
            "I do not understand people who enjoy grinding. I have been fighting the same enemies for three days straight and I am still not high enough level to do the next boss. The game basically forces you to grind or pay to skip it which feels like such a scam. Whatever happened to games where you just played the story and had fun? Now everything is about putting in a hundred hours of busywork before you get to the good stuff.",
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
            "I cannot believe I died there again. That is the exact same spot that killed me last time. I know exactly what I need to do but my fingers will not cooperate. This boss has this one attack that comes out of nowhere and every time I see it coming I panic and dodge the wrong way. I watched a guide on YouTube and the guy made it look so easy. He beat it on his first try and here I am on attempt number fifty-something still getting destroyed.",
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
            "My mom used to have this rule when I was a kid. One hour of games per day, that is it. And you know what, I tried to do the same thing as an adult. I set a timer on my phone and everything. The problem is, when the timer goes off I am always in the middle of something. I cannot just stop mid-mission. So one hour turns into two, two turns into three, and before I know it the entire evening is gone. Self-control and video games do not mix.",
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
            "You know what I did last weekend? I dug out my old console from the closet and spent the whole afternoon playing games from the nineties. And honestly? They were more fun than half the stuff that comes out now. The graphics are terrible by today's standards but the gameplay was just pure fun. No microtransactions, no updates, no online servers going down. You just put in the cartridge and played. Sometimes simpler is better.",
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
            "Is it weird that I enjoy watching other people play games more than playing them myself? There is this one streamer I watch every night and he is hilarious. His reactions when something unexpected happens are so funny. I know it sounds strange but it is kind of like watching sports. You do not have to play to enjoy it. Plus I do not have to deal with the frustration of dying over and over. I just get to sit back and watch someone who is actually good at the game.",
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
            "Did you know that the top esports players make millions of dollars? Like actual millions. There are these tournaments with prize pools bigger than some golf tournaments. Kids these days are growing up wanting to be professional gamers instead of baseball players. My nephew told me he wants to drop out of school and go pro in some game I have never even heard of. I did not know whether to laugh or be concerned. The world has changed so much.",
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
            "Wait, I do not think I follow you on anything. Are you on Instagram? Or are you more of a Twitter person? I feel like everyone our age is on at least one platform. Even my dad has Facebook now which is kind of terrifying because he keeps commenting on all my posts. I had to show him how to send a private message because he was writing personal stuff on my wall for everyone to see.",
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
            "Oh I saw that thing you posted yesterday. I liked it right away. The photo of the sunset was gorgeous. Where was that? I almost commented but then I got distracted and forgot. I am terrible at actually engaging with posts. I just scroll and like and move on. I am what they call a lurker. I consume content but I rarely post anything myself. I think my last post was like three months ago.",
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
            "OK this is kind of a weird question but how many followers do you have? I ask because I have been stuck at like two hundred for months and I cannot figure out what I am doing wrong. Meanwhile there are people posting the most random stuff and getting thousands of followers. My coworker has ten thousand followers and all she posts is pictures of her lunch. I do not get it. What is the algorithm looking for?",
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
            "Hold on, do not touch your food yet. I need to take a picture first. This is way too pretty to just eat without documenting it. The lighting in here is actually perfect right now. OK angle it a little this way. No wait, that shadow is weird. Let me try from above. OK got it. I am going to post this with one of those warm filters and watch the likes roll in. This is peak Instagram content right here.",
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
            "Did you see what happened on Twitter today? This influencer posted something really tone-deaf and now everyone is going after her. The quote tweets are brutal. She tried to apologize but it just made things worse because the apology was clearly written by her PR team. It did not sound genuine at all. I have been refreshing the thread all day. I know it is not healthy but internet drama is my guilty pleasure. I cannot look away.",
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
            "I texted her at like ten this morning and she read it immediately. I could see the little read receipt. And then nothing. No reply. It has been seven hours. Seven hours of just sitting there knowing she read my message and chose not to respond. I have checked my phone probably fifty times today. Am I being dramatic? Probably. But there is something about being left on read that hits different from just not getting a reply at all.",
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
            "I have been seriously thinking about deleting all my accounts. I spend way too much time scrolling and comparing myself to people who are probably faking half their life anyway. Every time I open Instagram I end up feeling worse about myself. But then I think about all the connections I would lose. Like there are people I only keep in touch with through social media. If I delete it, those relationships are basically gone. So I am stuck in this cycle of wanting to leave but being afraid to.",
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
            "So I posted this random photo of my cat sleeping in a weird position and it went completely viral. I woke up to like fifty thousand likes and ten thousand shares. My phone would not stop buzzing. I gained three thousand followers in one day. The crazy part is I have posted what I thought were really good photos before and they got like twenty likes. But a blurry picture of my cat? That is what the internet wants apparently. You cannot predict what is going to blow up.",
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
            "Wait, this moment is too perfect. Can I take a quick video and post it on my story? I promise I will not tag you if you do not want me to. Actually let me check the angle first because I do not want to post something where I look terrible. OK the lighting is good. Everyone smile. Actually no, act natural. Candid photos are way better than posed ones. Nobody wants to see another group photo where everyone is doing the same peace sign.",
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
            "I had to unfollow this one person because every single post was either a humble brag about their amazing life or some motivational quote that nobody asked for. You know the type. They post a sunset and write three paragraphs about their spiritual journey. I wanted to mute them but honestly unfollowing felt more satisfying. The best part is they probably will not even notice because they have like fifty thousand followers. One less is not going to ruin their day.",
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
            "I have not turned on my TV in like two months. Everything I watch is on YouTube. I start with one video and then the algorithm just keeps feeding me more stuff and three hours disappear. I have watched videos about everything from how to fix a leaky faucet to the history of the Roman Empire at two AM. YouTube is both the best and worst thing that has ever happened to me. It is an endless rabbit hole.",
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
            "Before we wrap up, if you enjoyed this video, please hit that subscribe button. It really helps the channel grow. And do not forget to tap the bell icon so you get notified every time I upload. I know everyone says this but it actually makes a huge difference. Also leave a comment and let me know what you want to see next. I read every single comment. Well, I try to. Some of them are kind of weird but most of you guys are awesome.",
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
            "I just saw your video hit a million views. A million. That is absolutely insane. When you first uploaded it I thought it would maybe get a few thousand because it is kind of a niche topic. But then it must have gotten picked up by the algorithm because the views just kept climbing. Do you get money from that many views? I always wondered how the whole monetization thing works. Like at what point does YouTube actually start paying you real money?",
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
            "I was talking to this YouTuber friend of mine and she said she spends more time on the thumbnail than on the actual video. I thought she was joking but she was dead serious. She makes like ten different versions and tests which one gets the most clicks. Apparently the ones with a surprised face and big text always perform better. It sounds kind of ridiculous but the data does not lie. People really do judge a video by its thumbnail.",
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
            "I swear YouTube used to have one ad at the beginning and that was it. Now there are ads in the beginning, in the middle, at the end, and sometimes two in a row that you cannot skip. I was watching a twenty-minute video the other day and it had seven ad breaks. Seven. At that point just make the whole thing a commercial. I know they need to make money but it is getting out of hand. I finally caved and got Premium because I could not take it anymore.",
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
            "I feel like I am stuck in a YouTube rut. The algorithm keeps showing me the same type of content over and over. I need some fresh recommendations. What are you guys watching? I am open to anything. Cooking channels, tech reviews, comedy, whatever. Just something different from what I have been watching. Oh but not those reaction videos where someone just sits there and watches another video. I do not understand the appeal of those at all.",
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
            "I was watching this livestream last night and it went on for like four hours. I told myself I would just check in for a few minutes but the chat was so fun and the streamer kept interacting with everyone so I could not leave. There is something about live content that is way more engaging than regular videos. You feel like you are actually part of something. Plus if you donate, they might read your message on air and that is kind of exciting even though I know it is silly.",
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
            "You know what I do? I watch the video and then I immediately scroll down to the comments because that is where the real entertainment is. People are so witty in comment sections. There is always that one person who writes the perfect joke and it has like twenty thousand likes. And then someone replies with something even funnier. I have spent entire evenings just reading comments and not even watching videos. The comment section is an art form.",
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
            "I downloaded a free editing app and tried to make a simple two-minute video and it took me six hours. Six hours for two minutes of content. I have no idea how YouTubers pump out videos every single day. The cutting, the transitions, the sound mixing, the color grading. There is so much that goes into it that you do not even think about when you are just watching. And then people leave comments like this is boring as if they could do any better. Content creators do not get enough credit.",
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
            "I used to not notice when videos were sponsored but now I can spot them from a mile away. The YouTuber will be talking about something completely unrelated and then suddenly it is like oh by the way I have been using this amazing product and I think you guys would really love it. The transition is always so awkward. At least some creators are honest about it and just say hey this is a paid promotion. I respect that more than trying to pretend it is a genuine recommendation.",
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
            "I have completely stopped buying things in stores unless I absolutely have to try them on. Everything is cheaper online. I found the exact same jacket at the mall for eighty dollars and then I looked it up on Amazon and it was forty-five. Forty-five dollars. Almost half the price. And it came with free shipping. I felt bad for the store but not bad enough to pay thirty-five dollars more for the same exact thing. That is just math.",
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
            "My cart right now has like thirty items in it and I am never going to buy any of them. I add things when I am bored late at night and then the next morning I look at it and wonder what I was thinking. There is a pair of bright red cowboy boots in there. I do not even wear cowboy boots. But at two AM they seemed like a great idea. I think adding things to your cart without buying is the online version of window shopping. All the fun, none of the guilt.",
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
            "I am one of those people who reads like fifty reviews before buying a ten-dollar item. I sort by most critical first because I want to know the worst-case scenario. If the one-star reviews are all about the same problem, that is a red flag. But if they are just people complaining about shipping or saying it was a gift and they have not used it yet, then those do not count. I have a whole system for filtering out the fake reviews too. If it sounds too perfect, it is probably paid.",
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
            "I ordered this thing ten days ago and the tracking has said in transit for the past week. In transit from where? The moon? I called customer service and they said to wait another five business days. Five business days on top of the ten days I have already waited. At that point I might as well have driven to the warehouse and picked it up myself. The worst part is when the status says out for delivery and then you wait all day and nothing shows up.",
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
            "OK so I ordered this sweater and in the photos it looked like this beautiful, thick, luxurious knit. When it arrived it was literally see-through. Like I could read a newspaper through it. The color was also completely off. I ordered navy blue and what I got was more like faded purple. And the size chart was a total lie. I ordered a medium and it fits like a child's extra large. I have never felt more betrayed by a product photo in my life. I am returning this immediately.",
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
            "Drop everything. Amazon just started their summer sale and some of the deals are insane. I already saved like two hundred dollars on stuff I was going to buy anyway. Well, stuff I was probably going to buy. OK fine, stuff I did not need at all but the prices were so good I could not say no. There is this thing that happens to me during sales where I convince myself I am saving money by spending money. I know it does not make sense but in the moment it feels completely logical.",
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
            "I need to figure out how to return this thing I bought online. The return policy says thirty days but I bought it like twenty-eight days ago so I am cutting it really close. And I already opened it and used it once. It says must be in original packaging which is a problem because I threw the box away the second it arrived. Who keeps the box? I always throw it away immediately. Maybe I can find a different box and just stuff it in there. Do they actually check?",
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
            "I have been hoarding points for like a year and I finally have enough to get something good. I have thirty thousand points which is basically three hundred dollars. I was so tempted to use them on little things throughout the year but I kept telling myself to save them for something big. And now there is this camera I have been wanting and with my points it would be almost free. This is what discipline feels like. A whole year of patience and it is finally paying off.",
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
            "I blame the one-click buy button. It is way too easy to spend money when all you have to do is tap your finger once. There is no friction. No time to think about it. Before credit cards and online shopping, you had to physically hand over cash and that made you think twice. Now it is just tap, done, congratulations you just spent eighty dollars on a sandwich press you are going to use once and forget about. I have a drawer full of impulse buys that I have used exactly zero times.",
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
            "I sat down and added up all my monthly subscriptions and I almost fell off my chair. Netflix, Spotify, Amazon Prime, YouTube Premium, iCloud storage, that meditation app I used once, and some fitness app I forgot I signed up for. That is like seventy dollars a month on stuff I barely use. Eight hundred and forty dollars a year. I could have taken a trip somewhere with that money. The problem is every single one of them feels like it is only ten dollars so you do not notice. But they add up fast.",
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
            "OK so I downloaded this app the other day and it has completely changed the way I do things. It sounds dramatic but I am serious. You know how we always struggle with splitting the bill at dinner? This app does it automatically. You just scan the receipt and it figures out who ordered what and calculates everyone's share including tax and tip. I used to spend ten minutes doing the math on my phone calculator and now it takes five seconds. I do not know how I lived without it.",
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
            "This is the third time this app has crashed on me today. I was right in the middle of typing a long message and it just closed. No warning, no auto-save, nothing. Everything I typed for the past ten minutes just vanished. I tried reopening it and it crashed again immediately. I updated it last night so maybe the new version has a bug. This is why I hate when apps force you to update. The old version was working perfectly fine. Why did they have to go and break it?",
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
            "I finally went into my settings and turned off notifications for almost everything. I was getting like a hundred notifications a day and ninety-five of them were completely useless. Hey, you have not opened our app in three days. Hey, your friend just posted something. Hey, we have a special deal for you. Nobody asked. The only notifications I keep on are texts and phone calls. Everything else can wait until I decide to check it. My phone has been so quiet and it is amazing.",
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
            "My phone keeps telling me I am almost out of storage and I have no idea what is taking up all the space. I only have like twenty apps installed but somehow my phone is ninety-five percent full. I went into the settings and apparently my photos are taking up forty gigabytes. Forty. I did not even know I had that many photos. I have photos from like five years ago that I will never look at again but I cannot bring myself to delete them because what if I need them someday? I know I will not but still.",
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
            "I just want to know who approved this redesign because they should be fired. The old version was perfect. I knew where everything was. I could do everything with my eyes closed. And then they pushed this update and moved every single button to a different place. It took me twenty minutes to find the settings menu. Twenty minutes. And they changed the color scheme too for no reason. It went from a nice clean design to this ugly mess. If it is not broken, do not fix it. Someone needs to tattoo that on the forehead of every app developer.",
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
            "I have been using the free version for like six months and it is fine but there are all these features locked behind a paywall. Like I can only save five files and I need to save way more than that. The premium version is ten dollars a month which is not that much but it adds up. I already have too many subscriptions. Has anyone here tried the paid version? Is it actually better or is it one of those things where you pay and then realize you did not need it?",
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
            "Every single time I try to log in to anything I have to reset my password. I have a different password for everything because they all have different requirements. This one needs a capital letter, this one needs a special character, this one needs to be at least twelve characters. And then they tell me I cannot use a password I have used before. So I make up a new one and immediately forget it. I know I should use a password manager but I forgot the password to that too. I am not even joking.",
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
            "I was about to download this app and then I looked at the permissions it was asking for and I immediately backed out. It wanted access to my camera, my microphone, my contacts, my location, my photos, and my calendar. It is a calculator app. Why does a calculator need my contacts? That is a massive red flag. I do not care how many five-star reviews it has. If a simple app is asking for permission to access everything on my phone, something shady is going on. Hard pass.",
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
            "I have absolutely zero sense of direction. Without Google Maps I could not find my way out of a parking lot. I use it even when I kind of know where I am going because I want to know the fastest route and avoid traffic. My friends make fun of me because I will use the map app to go somewhere I have been to fifty times. But you know what, it told me about a traffic jam last week and saved me thirty minutes. So who is laughing now? I will keep using it until the day I die.",
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
            "I cleaned out my closet last weekend and put everything on a resale app. I was not expecting much but this jacket I bought three years ago and wore maybe twice sold for almost what I paid for it. I made like two hundred dollars in one weekend just selling stuff I did not want anymore. Now I am looking around my apartment like a maniac trying to find more things to sell. My girlfriend said if I try to sell the couch she is moving out. I told her I already got an offer on it. I was joking. Mostly.",
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
            "I just read that and I am crying laughing in the middle of the train. Everyone is staring at me and I do not even care. I tried to hold it in but the more I tried the worse it got. You know when something is so funny that you cannot even breathe? That is where I am right now. I had to get off at the wrong station because I was laughing so hard I missed my stop. This is going to be one of those things I randomly think about at three AM and start laughing again.",
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
            "OK I need someone to explain this to me because I see it everywhere and I have been too embarrassed to ask. What does based mean? And no cap? And slay? I tried looking them up but the definitions online do not make any sense. They just use more slang to explain the slang. I feel like I need a translator for the internet at this point. When did English get so complicated? I thought I was pretty good at English but the internet makes me feel like I do not speak the language at all.",
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
            "So I was scrolling through my feed last night and I came across this post that completely changed the way I think about cooking pasta. Apparently you are supposed to save some of the pasta water and add it to the sauce. I have been making pasta my entire life and nobody told me this. The comment section was full of people having the same realization. It is crazy how you can learn something life-changing from a random post by a stranger on the internet at eleven PM on a Tuesday.",
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
            "That meme is literally inescapable right now. Every platform I open, there it is in a slightly different format. Someone used it to describe their morning commute, someone else used it for their relationship, and somehow it works for everything. That is the sign of a great meme. The best ones are so versatile that you can apply them to any situation. I tried to explain it to my mom and she just stared at me like I was speaking a foreign language. Memes are a generational thing I guess.",
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
            "Hold on, where did you read that? Because I have seen so many fake stories going around lately that I do not believe anything anymore until I verify it from at least two different sources. Someone shared this article last week that sounded completely believable and it turned out to be from a satire site. Everyone was sharing it like it was real. The problem is fake news is designed to trigger an emotional reaction so you share it before you even think about checking if it is true.",
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
            "I do not understand people who ask random questions when they have a phone in their hand. You literally have access to all of human knowledge and you are asking me what the capital of Peru is? Google it. It takes three seconds. I am not a search engine. Although to be fair, I do the same thing sometimes. There is something about asking a real person that feels more satisfying than looking it up yourself. Maybe it is the social aspect. Or maybe I am just lazy.",
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
            "I have tried everything to go viral. I have posted at peak hours, used trending hashtags, made reels, done collaborations, and nothing works. Meanwhile someone posts a ten-second video of their cat falling off a table and it gets twenty million views. There is no formula for virality. You cannot force it. The things that go viral are usually the most random, unplanned moments. Maybe I should just stop trying and let it happen naturally. But then again, the people who say that are usually the ones who are already famous.",
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
            "It is kind of funny how we text each other every single day but I have not seen your face in person in like three months. We literally live twenty minutes apart. I feel like social media tricks you into thinking you are maintaining friendships when all you are really doing is liking each other's posts. That is not the same as sitting across from someone and having a real conversation. Let us actually get together this weekend. No phones. Just talking. Like people used to do in the old days.",
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
            "My uncle shares the most ridiculous articles on Facebook and treats them like gospel. Last week he told me that drinking hot water with lemon cures everything. I asked him where he read that and he said someone shared it online. That was his source. Someone shared it. I tried to explain that anyone can post anything online and it does not make it a fact but he looked at me like I was the crazy one. We really need to teach people media literacy because the amount of nonsense that gets passed around as truth is terrifying.",
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
            "Think about it. Everything runs on the internet now. Banking, communication, entertainment, work, navigation, shopping, even ordering food. If the internet disappeared tomorrow, most people would not know how to do basic things. I could not even call a cab because I do not know the phone number for a taxi company. I do not even know how to read a paper map. We have built our entire lives around something that did not exist thirty years ago and now we cannot function without it. That is kind of scary if you think about it.",
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
            "I downloaded one of those screen time tracking apps and I regretted it immediately. It told me I spend an average of seven hours a day on my phone. Seven hours. That is almost a full workday. And the worst part is I cannot even tell you what I was doing for seven hours. I was just scrolling. Endlessly scrolling through nothing. I pick up my phone to check one thing and forty-five minutes later I am watching a video about how they make paper clips. How did I get there? I do not know. Nobody knows.",
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
            "So last weekend I decided to try a digital detox. I put my phone in a drawer on Friday night and did not take it out until Sunday evening. The first few hours were awful. I kept reaching for my phone and then remembering it was not there. It felt like a phantom limb. But by Saturday afternoon something shifted. I started noticing things. Like the sound of birds outside my window. I read an actual paper book for the first time in years. I cooked a meal without looking at a recipe on my phone. It was honestly the most relaxing weekend I have had in months.",
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
            "The hardest part of the detox was the FOMO. The fear of missing out is real. What if someone texted me something important? What if something happened at work? What if there was breaking news? My brain kept inventing reasons why I needed my phone. I even had this moment where I felt my pocket vibrate and reached for my phone before I remembered I did not have it. Phantom vibrations. Apparently that is a real thing. My brain is so trained to expect notifications that it makes them up.",
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
            "My doctor told me the blue light from screens messes with your melatonin and makes it harder to fall asleep. I know this. I have read like ten articles about it. And yet every single night I am lying in bed scrolling through social media until one AM wondering why I cannot fall asleep. It is the definition of insanity. Doing the same thing over and over expecting a different result. I have tried putting my phone on the other side of the room but then I just get up and get it. I am hopeless.",
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
            "After the detox weekend I realized something. The world did not end just because I was offline for two days. Nobody died. Nothing exploded. All those notifications I was so worried about missing? Ninety percent of them were completely irrelevant. The emails could wait. The group chat was just memes. The breaking news was not actually breaking. We have convinced ourselves that we need to be connected twenty-four seven but we really do not. Taking a break from screens is like taking a deep breath you did not know you needed.",
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
            "I went to the eye doctor last month because my vision has been getting worse and the first thing she asked was how much time I spend looking at screens. I said maybe eight hours at work plus a few hours at home. She gave me this look. She told me to follow the twenty-twenty-twenty rule. Every twenty minutes, look at something twenty feet away for twenty seconds. I have tried to do it but I always forget. By the end of the day my eyes feel like they are on fire and I get these headaches that start right behind my eyeballs.",
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
            "Is anyone else having trouble with the Wi-Fi or is it just me? I have restarted my phone, turned Wi-Fi off and on, forgotten the network and reconnected, and it still will not work. At this point I am using my mobile data which is going to cost me a fortune because I am on the cheapest plan. I am one of those people who completely loses it when the Wi-Fi goes down. It is like a survival instinct kicks in. No Wi-Fi equals danger in my brain. We are so dependent on this invisible signal that the second it disappears we panic.",
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
            "I am at two percent battery right now and I can feel my heart rate going up. This should not be this stressful but it is. I left my charger at home and nobody here has the same type. I have been trying to conserve battery by turning down the brightness and closing all my apps but it is still draining. If my phone dies right now I will not be able to get home because my train pass is on my phone and my map app is on my phone and my wallet is on my phone. Everything is on my phone. Why did we put everything on one device?",
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
            "I started writing in a physical journal last month and it has changed my whole perspective. There is something about writing with a pen on paper that forces you to slow down and actually think about what you are saying. You cannot delete and rewrite. You cannot copy and paste. Every word is permanent. It sounds old-fashioned but that is kind of the point. Not everything needs to be digital and instant. Sometimes the slower, messier, more human way of doing things is exactly what we need. We lost something when we went all digital and I think people are starting to realize that.",
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
            "I think the goal is not to get rid of technology but to be more intentional about how we use it. Instead of mindlessly scrolling for two hours, open the app with a purpose and close it when you are done. Instead of checking your phone first thing in the morning, spend the first thirty minutes of your day without any screens. Small changes like that can make a huge difference. I am not perfect at it. I still catch myself doom scrolling at midnight sometimes. But I am getting better. And that is enough for now.",
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
