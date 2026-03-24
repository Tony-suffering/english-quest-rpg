/**
 * 365 English Master -- Month 2 Week 6: 日常生活 (Daily Life)
 * Days 38-44: 70 expressions
 * Month: May 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 2 (2026-05) -- WEEK 6
// ============================================================

export const MONTH2_W6_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 38: 家のこと (Home Life)
    // Scene: みんなの住まい事情。一人暮らし、同棲、実家暮らし。リアルな家トーク。
    // ────────────────────────────────────────────────────

    {
        daySlot: 38, japanese: '一人暮らしはもう5年になる',
        english: [
            'I have lived alone for five years.',
            "I've been living alone for about five years now.",
            "I have been living on my own for about five years. I am so used to it now.",
            "I have been living on my own for about five years now and honestly I cannot imagine going back. I mean, I do whatever I want. I eat dinner at midnight, I leave dishes in the sink for a day or two, nobody complains. It is freedom. Lonely sometimes, sure, but mostly freedom.",
        ],
        context: 'on my own は「一人で」で alone より前向きなニュアンス。by myself もOK。used to it は「慣れた」。日本語の「一人暮らし」は living alone/on my own で、live by oneself はやや寂しい響き。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 38, japanese: '引っ越ししたいんだよね',
        english: [
            'I want to move.',
            "I've been thinking about moving.",
            "I have been thinking about moving. My place is too small for all my stuff.",
            "I have been thinking about moving for a while now. My apartment is tiny. Like, my kitchen is basically a hallway with a stove in it. And the walls are so thin I can hear my neighbor snoring. But moving is such a hassle. Packing, cleaning, finding a new place, key money... I get tired just thinking about it.",
        ],
        context: 'move は「引っ越す」の1語。relocate はフォーマル。hassle は「面倒」のネイティブ頻出語。key money は日本の「礼金」で海外では理解されにくい概念。I get tired just thinking about it は「考えるだけで疲れる」の共感フレーズ。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 38, japanese: 'ゴミ出しの曜日がわからなくなる',
        english: [
            'I forget trash day.',
            'I always mix up which day is trash day.',
            'I can never remember which day is which for trash collection. It is confusing.',
            "I can never keep track of the garbage schedule. Monday is burnable, Thursday is recyclables, and I think plastic is... Friday? Or is that cans? I have a chart on my fridge and I still get it wrong. My neighbors must think I am an idiot. I have gotten the passive-aggressive note in my mailbox twice now.",
        ],
        context: 'keep track of は「把握する」。garbage / trash はどちらも「ゴミ」でアメリカ英語。rubbish はイギリス英語。passive-aggressive note は「やんわり嫌味な手紙」。日本のゴミ分別の細かさは世界的に有名。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 38, japanese: '家賃高すぎて泣ける',
        english: [
            'Rent is too high.',
            'My rent is insane.',
            'My rent is absolutely insane. I am basically working just to pay for my apartment.',
            "My rent is criminal. Like, I am paying this much for a place where I can touch both walls if I stretch my arms out. And it goes up every time I renew the lease. At this rate I am going to be paying my entire salary just to have a roof over my head. Maybe I should move to the countryside and become a farmer.",
        ],
        context: 'insane / criminal は rent の高さを大げさに表現する定番。lease は「賃貸契約」。at this rate は「この調子だと」。a roof over my head は「住む場所」の比喩表現。家賃の愚痴は万国共通の話題。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 38, japanese: '隣の部屋の人がうるさい',
        english: [
            'My neighbor is noisy.',
            'My neighbor is so loud.',
            'My next-door neighbor is so loud. I can hear everything through the wall.',
            "My neighbor is driving me crazy. They play music at like eleven at night and the bass goes right through the wall. I have knocked on their door twice and they are super nice about it but then two days later it starts again. I am this close to buying noise-canceling headphones for sleeping. Is that a thing? It should be a thing.",
        ],
        context: 'driving me crazy は「頭がおかしくなりそう」の口語表現。next-door neighbor は「隣の部屋の人」。this close は指でギリギリを示すジェスチャー付きの表現。noise-canceling は「ノイズキャンセリング」。Is that a thing? は「そんなのあるの？」の現代英語。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 38, japanese: '自炊する時間がない',
        english: [
            'No time to cook.',
            "I don't have time to cook.",
            "I never have time to cook at home. I end up just getting convenience store stuff.",
            "I barely cook anymore. By the time I get home from work I am too tired to do anything. So it is either a convenience store bento or cup noodles. I know it is not healthy. My mom keeps telling me to eat better. I keep telling her I will start next week. I have been saying that for about two years.",
        ],
        context: 'barely は「ほとんど〜ない」。by the time は「〜する頃には」の時間表現。end up doing は「結局〜してしまう」。日本語の「自炊」に直訳はなく、cook at home / cook for myself が近い。convenience store bento は日本文化として英語でも通じ始めている。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 38, japanese: '掃除しなきゃ...',
        english: [
            'I need to clean.',
            'I really need to clean my place.',
            "I really need to clean my apartment. It's getting out of hand.",
            "I really need to clean my apartment. It is getting out of hand. There is a pile of clothes on my chair that I have been meaning to put away for like a week. And my bathroom... I do not even want to talk about my bathroom. I always tell myself I will do it on the weekend but then the weekend comes and I suddenly have better things to do.",
        ],
        context: 'getting out of hand は「手に負えなくなってきた」。pile は「山積み」。have been meaning to は「しようと思っていた（まだしてない）」の完璧な先延ばし表現。better things to do は「もっと大事なこと」の皮肉。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 38, japanese: 'Wi-Fiの調子が悪い',
        english: [
            'My Wi-Fi is bad.',
            "My Wi-Fi is acting up again.",
            "My Wi-Fi has been acting up all day. I cannot even stream anything.",
            "My Wi-Fi has been terrible lately. It keeps cutting out in the middle of everything. I was on a video call yesterday and I froze for like thirty seconds. My face was stuck in the worst possible expression. Everyone saw it. I need to call my provider but you know how fun that is. Two hours on hold just to be told to restart the router.",
        ],
        context: 'acting up は「調子が悪い」の万能表現（機械にも体にも使える）。cutting out は「途切れる」。froze は「フリーズした」。on hold は「電話で保留中」。restart the router は世界共通のIT対策の定番。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 38, japanese: 'やっぱり実家が楽',
        english: [
            'Home is easier.',
            "Living at home is just easier.",
            "Living with my parents is honestly way easier. Free food, free laundry.",
            "I know people judge me for still living with my parents but honestly it is just easier. Free food, free laundry, someone to talk to when I get home. I save a ton on rent. My mom still does not knock before coming into my room though. That part I could do without. But everything else? No complaints.",
        ],
        context: 'living at home / with my parents が「実家暮らし」。英語圏では adult still living with parents にスティグマがあるけど、日本ではそこまでではない。could do without は「なくていい」。No complaints は「文句なし」。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 38, japanese: '宅配便いつ届くかな',
        english: [
            'When will my package arrive?',
            "I wonder when my package is coming.",
            "I have been waiting for my package all day. The tracking says it is out for delivery.",
            "I have been waiting for this package all day and the tracking just says out for delivery. What does that even mean? It has said that since eight this morning. I am scared to leave the house in case I miss it. Last time I missed a delivery they left one of those redelivery slips and the next available slot was three days later. Three days!",
        ],
        context: 'out for delivery は「配達中」の物流英語。tracking は「追跡」。redelivery slip は「再配達の不在票」。日本の再配達システムの便利さは世界一と言われる。miss a delivery は「配達を受け取り損ねる」。',
        character: 'yuki', category: 'social', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 39: テクノロジー (Tech Talk)
    // Scene: スマホが壊れた！PCが遅い！デジタル生活のあるある。
    // ────────────────────────────────────────────────────

    {
        daySlot: 39, japanese: 'スマホの充電がない',
        english: [
            'My phone is dead.',
            "My phone is about to die.",
            "My phone is at like three percent. Does anyone have a charger?",
            "My phone is about to die and I do not have my charger. Does anyone have a Lightning cable? Or USB-C? I do not even know which one I need anymore, they keep changing it. I am at two percent right now. If it dies I literally cannot get home because my train pass is on my phone. This is a crisis.",
        ],
        context: 'My phone is dead は「充電が切れた」。die/dead を使うのが英語流。about to die は「もうすぐ切れる」。「充電がない」を直訳して no charge と言うと不自然。battery is low / phone is dying が自然な表現。',
        character: 'mina', category: 'request', month: '2026-05',
    },
    {
        daySlot: 39, japanese: 'パスワード忘れた',
        english: [
            'I forgot my password.',
            'I cannot remember my password.',
            'I forgot my password again. This is the third time this month.',
            "I forgot my password again. I have like fifty different accounts and they all want a different password with uppercase, lowercase, numbers, special characters... I wrote them all down somewhere but I cannot find where I wrote them down. So now I am locked out of my email and I need my email to reset the password. It is a beautiful cycle of despair.",
        ],
        context: 'locked out は「ロックアウトされた」。cycle of despair は「絶望のサイクル」のユーモア。reset は「リセットする」。パスワード地獄は現代人の共通の悩み。英語では password fatigue（パスワード疲れ）という言葉まである。',
        character: 'takeshi', category: 'request', month: '2026-05',
    },
    {
        daySlot: 39, japanese: 'アプリのアップデートが終わらない',
        english: [
            'The update is not done.',
            "The update is taking forever.",
            "This app update is taking forever. It has been stuck at ninety percent for ten minutes.",
            "This update has been stuck at like ninety percent for the last twenty minutes. I swear updates always do this. They fly through the first eighty percent and then that last bit takes longer than everything else combined. And it says do not turn off your device. So I am just sitting here. Watching a progress bar. Living my best life.",
        ],
        context: 'stuck at は「〜で止まっている」。progress bar は「進捗バー」。living my best life は本来ポジティブな表現だけどここでは皮肉。do not turn off your device は「デバイスの電源を切らないで」のアップデート定番表示。',
        character: 'kenji', category: 'request', month: '2026-05',
    },
    {
        daySlot: 39, japanese: 'ネットが遅すぎる',
        english: [
            'The internet is slow.',
            'The internet is so slow right now.',
            'The internet is crawling today. I cannot even load a basic web page.',
            "The internet speed right now is absolutely painful. I am trying to load one page and it is taking thirty seconds. I ran a speed test and I am getting like two megabits. I am paying for a hundred. I am going to call my provider and have a very calm and reasonable conversation. By which I mean I am going to complain until they give me a discount.",
        ],
        context: 'crawling は「這うように遅い」。speed test はネット速度テスト。provider は「回線業者」。have a very calm and reasonable conversation は皮肉。日本語の「遅すぎる」はシンプルだけど英語では遅さを比喩で表現するのが楽しい。',
        character: 'takeshi', category: 'request', month: '2026-05',
    },
    {
        daySlot: 39, japanese: 'このアプリ便利だよ',
        english: [
            'This app is useful.',
            'This app is really handy.',
            "You should try this app. It's super handy for organizing stuff.",
            "You should try this app. It is super handy. I use it for everything — grocery lists, to-do lists, random notes. It syncs across all my devices so I can check it anywhere. I used to write stuff on sticky notes and then lose them. Now I just lose my phone instead. Progress, right?",
        ],
        context: 'handy は「便利な」で useful よりカジュアル。come in handy は「役に立つ」。syncs は「同期する」。sticky notes は「付箋」。Progress, right? は「進歩だよね？」の自虐。日本語の「便利」は handy が一番近い温度感。',
        character: 'lisa', category: 'request', month: '2026-05',
    },
    {
        daySlot: 39, japanese: '通知がうるさい',
        english: [
            'Too many notifications.',
            'I get way too many notifications.',
            'My phone is buzzing nonstop. I get way too many notifications.',
            "My phone will not stop buzzing. Every app thinks it needs to notify me about something. This one wants me to check out a sale. That one says someone I do not know liked something. I turned off most of them but somehow they keep finding ways to sneak back in. Technology is supposed to make life easier but I feel like I am just managing notifications all day.",
        ],
        context: 'buzzing は「ブーブー鳴る」。nonstop は「ひっきりなしに」。sneak back in は「こっそり戻ってくる」。technology is supposed to は「テクノロジーは本来〜のはず」。managing notifications は現代人の新しい「仕事」。',
        character: 'kenji', category: 'request', month: '2026-05',
    },
    {
        daySlot: 39, japanese: 'データのバックアップ取った？',
        english: [
            'Did you back up your data?',
            'Have you backed up your stuff?',
            "Have you backed up your data recently? You really should, just in case.",
            "Have you backed up your stuff recently? Seriously, do it today. My coworker lost everything last month — photos, documents, everything — because her laptop just died one day. No warning. She had not backed up in like two years. She cried at her desk. It was heartbreaking. That is when I set up automatic backups. Learn from other people's tragedies.",
        ],
        context: 'back up は「バックアップを取る」。stuff は data のカジュアル版。just in case は「念のため」。learn from other people\'s tragedies は「他人の悲劇から学べ」のブラックユーモア。日本語の「バックアップ」はそのまま通じるけど動詞は back up と2語。',
        character: 'lisa', category: 'request', month: '2026-05',
    },
    {
        daySlot: 39, japanese: '画面バキバキなんだけど',
        english: [
            'My screen is cracked.',
            'My screen is completely cracked.',
            'Look at my screen. It is completely shattered. I dropped it yesterday.',
            "Look at my screen. It is completely shattered. I dropped it face-down on concrete yesterday and I just heard that horrible cracking sound. You know that sound? It is the most expensive sound in the world. I picked it up and did that thing where you slowly turn it over hoping it survived. It did not survive. Getting it fixed costs almost as much as a new phone.",
        ],
        context: 'cracked は「ヒビが入った」。shattered は「バキバキに割れた」で cracked の上位。face-down は「画面を下にして」。the most expensive sound in the world は「世界で一番高い音」のネイティブジョーク。スマホあるある。',
        character: 'takeshi', category: 'request', month: '2026-05',
    },
    {
        daySlot: 39, japanese: 'AIってすごいよね',
        english: [
            'AI is amazing.',
            'AI is pretty impressive, right?',
            'AI is getting crazy good. It is kind of scary honestly.',
            "AI is getting insanely good and I do not know how I feel about it. Like, I used it to write an email yesterday and it was better than anything I could have written myself. Which is cool but also kind of depressing. Where does it end? Are we all going to be replaced by robots? Or is it just going to do the boring stuff so we can focus on the fun stuff? I honestly have no idea.",
        ],
        context: 'getting crazy good は「ヤバいくらいすごくなってる」。kind of scary は「ちょっと怖い」。where does it end は「どこまでいくの」。replaced by robots は AI 話の定番フレーズ。日本語の「すごいよね」の共感を求める形は right? で出す。',
        character: 'mina', category: 'request', month: '2026-05',
    },
    {
        daySlot: 39, japanese: 'SNSやめたいけどやめられない',
        english: [
            'I want to quit social media.',
            "I want to quit social media but I can't.",
            "I keep saying I am going to quit social media but I never actually do it.",
            "I keep saying I am going to delete all my social media but then I open Instagram without even thinking about it. It is like my thumb has a mind of its own. I will be lying in bed telling myself to go to sleep and then suddenly it is one in the morning and I am watching a video of a dog wearing sunglasses. How did I get here? What am I doing with my life?",
        ],
        context: 'has a mind of its own は「勝手に動く」の擬人化表現。without even thinking about it は「無意識に」。doom scrolling は「延々とスクロールし続ける」の現代語。日本語の「やめたいけどやめられない」は英語でも完全に同じジレンマ。',
        character: 'yuki', category: 'request', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 40: 意見を言う (Sharing Opinions)
    // Scene: 居酒屋で映画の感想からまじめな話まで。意見を言う練習。
    // ────────────────────────────────────────────────────

    {
        daySlot: 40, japanese: '正直に言うとさ',
        english: [
            'Honestly...',
            'To be honest...',
            'To be honest, I did not really enjoy it that much.',
            "To be honest — and I know this is an unpopular opinion — I did not really get the hype. Everyone kept saying it was amazing but I watched it and I was like, that is it? Maybe I need to watch it again. Sometimes things grow on you the second time. But first impression? Not for me.",
        ],
        context: 'to be honest (TBH) は意見を言う前の定番クッション。unpopular opinion は「少数派の意見」。get the hype は「盛り上がりがわからない」。grow on you は「だんだん好きになる」。日本語の「正直に言うと」と完全に同じ使い方。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 40, japanese: 'それはちょっと違うと思う',
        english: [
            'I disagree.',
            'I see it a little differently.',
            'I see what you mean, but I think it is a little different from that.',
            "I see what you are saying and I get your point, but I think it is a little more complicated than that. It is not just black and white. There are a lot of factors that people tend to overlook. I am not saying you are wrong, I just think there is another side to it that is worth considering.",
        ],
        context: 'I see what you are saying は「言いたいことはわかる」で反論の前に置くクッション。black and white は「白黒はっきり」。overlook は「見落とす」。worth considering は「考える価値がある」。日本語の「ちょっと違う」の柔らかい反論が英語でも出せる。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 40, japanese: 'めっちゃ共感する',
        english: [
            'I totally agree.',
            "I could not agree more.",
            "I could not agree more. That is exactly how I feel.",
            "Oh my god, yes. That is exactly what I have been thinking. I could not agree more. Nobody around me seems to get it but you just put it into words perfectly. I feel like I have been trying to explain this to people for years and they just look at me like I am crazy. Thank you for making me feel sane.",
        ],
        context: 'I could not agree more は「これ以上同意できないくらい同意」=「完全に同感」の最強表現。put it into words は「言葉にする」。feel sane は「正気だと感じる」。日本語の「めっちゃ共感」のテンションは I could not agree more で出せる。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 40, japanese: 'それぞれだよね',
        english: [
            'Everyone is different.',
            'To each their own.',
            'To each their own, I guess. Not everyone has to like the same things.',
            "I mean, to each their own, right? What works for one person does not work for everyone. I have learned to stop trying to convince people. If you like it, great. If you do not, that is fine too. Life is too short to argue about stuff that does not really matter in the end.",
        ],
        context: 'To each their own は「人それぞれ」のドンピシャ表現。英語のことわざで議論を穏やかに終わらせるのに最適。What works for one person は「ある人にはうまくいくこと」。Life is too short は「人生は短い」の定番フレーズ。',
        character: 'master', category: 'social', month: '2026-05',
    },
    {
        daySlot: 40, japanese: 'ぶっちゃけ興味ない',
        english: [
            'Not interested.',
            "I'm not really into that.",
            "Not going to lie, I am not really interested in that at all.",
            "Honestly? I could not care less. I know that sounds harsh but I have tried to get into it and it just does not do anything for me. Everyone keeps telling me I should give it another chance but at some point you have to accept that it is just not your thing. And that is OK.",
        ],
        context: 'could not care less は「1ミリも興味ない」の最強表現。could care less と間違える人が多い（意味が逆になる）。does not do anything for me は「何も感じない」。not your thing は「自分向きじゃない」。ぶっちゃけ=honestly/not going to lie。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 40, japanese: 'あの映画よかったよ',
        english: [
            'That movie was good.',
            'That movie was really good.',
            "That movie was so good. I was not expecting much but it totally surprised me.",
            "That movie was way better than I expected. I went in with zero expectations because the trailer looked kind of meh, but wow. The story was great, the acting was incredible, and the ending actually made me tear up a little. I do not cry at movies usually but this one got me. I want to watch it again already.",
        ],
        context: 'way better than I expected は「思ったより全然よかった」。went in with zero expectations は「期待ゼロで行った」。meh は「微妙」の擬態語。tear up は「うるっとする」で cry より軽い。got me は「やられた」。映画の感想を語る英語表現の宝庫。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 40, japanese: 'なんか微妙だった',
        english: [
            'It was OK.',
            "It was kind of meh.",
            "It was... fine, I guess. Nothing special. Just kind of forgettable.",
            "It was fine. Like, it was not bad but it was not good either. It was just kind of there. I watched the whole thing and I cannot even remember what happened. It is one of those movies where you are like, OK, that was two hours of my life I am never getting back. Not the worst way to spend it but definitely not the best either.",
        ],
        context: 'meh は「微妙」のスラング。forgettable は「記憶に残らない」。kind of there は「存在するだけ」の表現。not the worst ... but not the best は「最悪じゃないけど最高でもない」の曖昧評価。日本語の「微妙」は英語で一番訳しにくい単語の1つ。meh が一番近い。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 40, japanese: 'それはいい考えだね',
        english: [
            'Good idea.',
            "That's a great idea.",
            "That is actually a really good idea. Why did I not think of that?",
            "That is actually brilliant. Why did I not think of that? It is so obvious now that you say it. I feel like I have been overcomplicating this whole thing. Sometimes you just need someone else to look at it with fresh eyes. You should be a consultant or something. Seriously, I would pay you for that kind of advice.",
        ],
        context: 'brilliant は good idea の最上級。Why did I not think of that は「なんで思いつかなかったんだろう」。overcomplicating は「複雑に考えすぎる」。fresh eyes は「新鮮な視点」。日本語の「いい考え」より英語は褒め方のバリエーションが多い。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 40, japanese: 'よくわかんないけど',
        english: [
            'I am not sure.',
            "I don't really know, but...",
            "I do not really know much about it, but from what I can tell...",
            "I am no expert on this, so take what I say with a grain of salt, but from what I have heard and read it seems like the situation is more complicated than people make it out to be. I could be completely wrong though. I need to look into it more before I form a real opinion.",
        ],
        context: 'take it with a grain of salt は「話半分に聞いて」の素晴らしいイディオム。塩一粒=その程度の信憑性。make it out to be は「〜のように見せかける」。I am no expert は「専門家じゃないけど」。日本語の「よくわかんないけど」の前置き文化は英語にもある。',
        character: 'master', category: 'social', month: '2026-05',
    },
    {
        daySlot: 40, japanese: '最近のニュース見た？',
        english: [
            'Did you see the news?',
            'Did you see the news lately?',
            'Have you been following the news lately? There is a lot going on.',
            "Have you been following the news? There is so much going on right now I cannot keep up. Every time I open my phone there is something new. I try to stay informed but honestly it is exhausting. Sometimes I just need a break from it all. Is it bad that I get most of my news from social media? Probably. Do I care? Not really.",
        ],
        context: 'following the news は「ニュースを追っている」。a lot going on は「色々起きている」。keep up は「ついていく」。stay informed は「情報を把握する」。Is it bad that...? は「〜ってダメかな？」の自問自答パターン。',
        character: 'kenji', category: 'social', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 41: 約束する (Making & Keeping Promises)
    // Scene: 約束を守る、破る、謝る。信頼関係を築く英語。
    // ────────────────────────────────────────────────────

    {
        daySlot: 41, japanese: '約束するよ',
        english: [
            'I promise.',
            'I promise. You have my word.',
            'I promise. You have my word. I will not let you down.',
            "I promise. And I mean it this time. I know I have said that before but this time it is different. You have my word. I will not let you down. If I break this promise you can officially never trust me again. Deal? I am putting my reputation on the line here.",
        ],
        context: 'You have my word は「俺の言葉を信じてくれ」の男気フレーズ。let you down は「がっかりさせる」。put my reputation on the line は「評判を賭ける」。deal は「約束だよ」の口語表現。日本語の「約束する」より英語は重みの出し方が多様。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 41, japanese: 'ちゃんとやるから',
        english: [
            'I will do it.',
            "I'll get it done, I swear.",
            "I will get it done. You can count on me.",
            "I will get it done, I swear. I know you are skeptical because of last time but I have already started. Look, I will send you proof tonight. Just give me until Friday and it will be ready. You can count on me. I am not going to let this one slip through the cracks.",
        ],
        context: 'count on me は「頼りにして」。slip through the cracks は「見逃す/漏れる」。skeptical は「疑っている」。send you proof は「証拠を送る」。日本語の「ちゃんとやる」の「ちゃんと」に直訳はないが、I swear / you can count on me で誠意を出す。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 41, japanese: 'ごめん、忘れてた',
        english: [
            'Sorry, I forgot.',
            "I'm so sorry. I completely forgot.",
            "I am so sorry. It completely slipped my mind. I feel terrible.",
            "I am so sorry. It completely slipped my mind. I do not even have a good excuse. I had it in my head and then something else came up and it just vanished. I feel terrible about it. How can I make it up to you? Seriously, tell me what I can do. I know sorry is not enough.",
        ],
        context: 'slipped my mind は「うっかり忘れてた」の定番。forgot より「意図せず抜けた」ニュアンス。make it up to you は「埋め合わせをする」の超重要フレーズ。sorry is not enough は「ごめんだけじゃ足りない」。日本語の「忘れてた」より英語は謝り方が具体的。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 41, japanese: 'あてにしないほうがいいよ',
        english: [
            'Do not count on it.',
            "I wouldn't count on that.",
            "I would not count on that if I were you. He is not exactly reliable.",
            "I would not hold my breath if I were you. You know how he is. He means well but follow-through is not exactly his strong suit. Every time he says he will do something there is like a fifty percent chance it actually happens. I love the guy but I would always have a backup plan.",
        ],
        context: 'would not hold my breath は「あてにしない方がいい」の皮肉表現。strong suit は「得意分野」。follow-through は「最後までやり遂げること」。have a backup plan は「代替案を持つ」。日本語の「あてにしない」は英語でバリエーション豊富。',
        character: 'master', category: 'social', month: '2026-05',
    },
    {
        daySlot: 41, japanese: '信じていいの？',
        english: [
            'Can I trust you?',
            'Are you sure I can trust you on this?',
            "Are you being serious right now? Like, can I actually count on this?",
            "Are you being for real right now? Because the last three times you said this I ended up doing everything myself. I want to believe you, I really do. But you have to understand why I am a little hesitant. Show me, do not just tell me. Actions speak louder than words, right?",
        ],
        context: 'for real は「マジで」のスラング。hesitant は「ためらっている」。actions speak louder than words は「行動は言葉より雄弁」のことわざ。show me, do not just tell me は「口だけじゃなく見せてくれ」。信頼の英語は日本語より直球。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 41, japanese: '前も同じこと言ったよね',
        english: [
            'You said that before.',
            "You've said that before.",
            "You said the exact same thing last time and nothing happened.",
            "You literally said the exact same thing two weeks ago. Word for word. And what happened? Nothing. I am not trying to be mean but at some point I have to protect myself. I would rather you tell me you cannot do it than make a promise and not follow through. At least then I can plan accordingly.",
        ],
        context: 'word for word は「一語一句同じ」。I am not trying to be mean は「意地悪で言ってるんじゃない」の前置き。follow through は「最後までやる」。plan accordingly は「それに合わせて計画する」。日本語の「前も言ったよね」の冷静な怒りが出せる。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 41, japanese: '埋め合わせするから',
        english: [
            'I will make it up to you.',
            "Let me make it up to you.",
            "Let me make it up to you. Dinner is on me this weekend.",
            "Let me make it up to you. I know I messed up and I feel genuinely bad about it. How about dinner this weekend? My treat, anywhere you want. Or if you would rather do something else I am open to suggestions. I just want you to know that I value our friendship and I do not take it for granted.",
        ],
        context: 'make it up to you は「埋め合わせする」の最重要フレーズ。messed up は「やらかした」。my treat は「おごり」。take it for granted は「当たり前だと思う」。value our friendship は「友情を大切にしている」。日本語の「埋め合わせ」にドンピシャ。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 41, japanese: 'もういいよ、気にしないで',
        english: [
            'It is OK.',
            "It's fine. Do not worry about it.",
            "It is fine, seriously. Do not even worry about it. These things happen.",
            "Honestly, it is fine. Do not beat yourself up over it. Everybody forgets stuff. It is not like it was the end of the world. I was a little annoyed at first but I got over it. We are good. Seriously. Stop apologizing. If you apologize one more time I am going to get actually annoyed.",
        ],
        context: 'beat yourself up は「自分を責める」。got over it は「乗り越えた/もう大丈夫」。we are good は「俺たちは大丈夫」= 仲直りの合図。these things happen は「こういうことはある」の寛大フレーズ。日本語の「もういいよ」の温かさが出せる。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 41, japanese: '約束は守る主義だから',
        english: [
            'I keep my promises.',
            'I always keep my word.',
            'I am the kind of person who keeps their word. It is important to me.',
            "I am the kind of person who takes promises seriously. If I say I am going to do something, I do it. I got that from my dad. He always said your word is the only thing nobody can take away from you. It sounds old-fashioned but I believe it. If I ever break a promise it is going to bother me more than it bothers you.",
        ],
        context: 'keep my word は「約束を守る」。the kind of person who は「〜するタイプの人間」。your word is the only thing nobody can take away は格言的表現。old-fashioned は「古風な」。bother は「気になる」。日本語の「主義」は英語で I am the kind of person who で表現。',
        character: 'master', category: 'social', month: '2026-05',
    },
    {
        daySlot: 41, japanese: '次は絶対忘れないから',
        english: [
            'I will not forget next time.',
            'I will definitely remember next time.',
            'I am setting a reminder right now so I do not forget next time.',
            "I am putting it in my phone right now. Look — alarm set, notification on, calendar event created. I have three separate reminders so there is literally no way I am forgetting this time. Unless my phone dies. Or I lose my phone. Actually, let me write it on my hand too just in case. I am covering all my bases.",
        ],
        context: 'covering all my bases は「あらゆる対策を取る」の野球由来の表現。just in case は「念のため」。there is no way は「絶対にありえない」。日本語の「絶対」は英語で definitely, no way, literally で強調する。リマインダー3つ設定は現代のユーモア。',
        character: 'mina', category: 'social', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 42: 電話する (Phone Calls)
    // Scene: 電話の英語。予約、問い合わせ、友達への電話。
    // ────────────────────────────────────────────────────

    {
        daySlot: 42, japanese: 'もしもし、○○ですけど',
        english: [
            'Hello, this is...',
            "Hi, this is Yuki.",
            "Hi, this is Yuki calling. Is this the right number for reservations?",
            "Hi, this is Yuki. I am calling about a reservation I made for this Saturday. I think it was under my name but I might have put it under my friend's name by accident. Is there any way you could check? The last name would be either Tanaka or Suzuki. Sorry for the confusion.",
        ],
        context: 'This is... は電話の「もしもし、○○です」の英語版。my name is と言わない。calling about は「〜の件で電話してます」。under my name は「私の名前で」。sorry for the confusion は「ややこしくてすみません」の定番。',
        character: 'yuki', category: 'request', month: '2026-05',
    },
    {
        daySlot: 42, japanese: '少々お待ちください',
        english: [
            'Please hold.',
            'Could you hold on for a moment?',
            'Could you hold on for just a second? Let me check that for you.',
            "Sure, let me look that up for you. Could you hold on for just a moment? It should not take long. I just need to pull it up in the system. Bear with me here... OK, I found it. Yes, I can see your reservation right here. Everything looks good.",
        ],
        context: 'hold on は「待ってて」の電話用語。bear with me は「ちょっと待って（我慢して）」の丁寧版。pull it up は「画面に出す」。let me look that up は「調べますね」。日本語の「少々お待ちください」の丁寧さは英語では could you で出す。',
        character: 'lisa', category: 'request', month: '2026-05',
    },
    {
        daySlot: 42, japanese: '電話が遠いんですけど',
        english: [
            'I cannot hear you.',
            "Sorry, I can't hear you very well.",
            "Sorry, you are breaking up a little. Can you say that again?",
            "Sorry, I think the connection is really bad on my end. You are breaking up and I can only hear every other word. Can you repeat that? Actually, hold on, let me move to a different spot. Is this better? How about now? I think I might just need to call you back from a landline.",
        ],
        context: 'breaking up は「音声が途切れる」の電話定番。on my end は「こちら側では」。every other word は「一語おきに」。call you back は「かけ直す」。landline は「固定電話」。日本語の「電話が遠い」は直訳できないので breaking up を使う。',
        character: 'kenji', category: 'request', month: '2026-05',
    },
    {
        daySlot: 42, japanese: '折り返し電話もらえますか？',
        english: [
            'Can you call me back?',
            'Could you call me back later?',
            'Could you have them call me back when they are free? My number is...',
            "Could you have someone call me back when they get a chance? I will be available all afternoon. My number is... actually, should I just give you my cell? That is probably easier. And if I do not answer just leave a voicemail and I will call back as soon as I can.",
        ],
        context: 'call me back は「折り返し電話する」。when they get a chance は「手が空いたら」の丁寧表現。leave a voicemail は「留守電を残す」。as soon as I can は「できるだけ早く」。日本語の「折り返し」は英語で call back が完璧に対応。',
        character: 'yuki', category: 'request', month: '2026-05',
    },
    {
        daySlot: 42, japanese: '電話よりLINEのほうがいい',
        english: [
            'I prefer texting.',
            "I'd rather just text.",
            "Can you just message me instead? I am not great on the phone.",
            "Can you just text me? I am terrible on the phone. Like, genuinely bad at it. I panic when it rings. I never know when to talk, when to listen, how to end the conversation. With messaging I can think about what I want to say. Plus I have a record of it so I do not forget anything. Calling is for emergencies only in my book.",
        ],
        context: 'text me は「メッセージ送って」。not great on the phone は「電話が苦手」。in my book は「私の中では」。phone anxiety は若い世代の共通の悩み。英語圏でも若者は電話を避けてテキスト派が多い。日本のLINE文化と同じ。',
        character: 'mina', category: 'request', month: '2026-05',
    },
    {
        daySlot: 42, japanese: '予約の変更をしたいんですけど',
        english: [
            'I want to change my reservation.',
            "I'd like to change my reservation, please.",
            "Hi, I am calling to change a reservation. Is that possible?",
            "Hi, I am calling about a reservation I made for this Saturday. Something came up and I need to push it back a day. Would Sunday work instead? Same time, same number of people. I am really sorry about the short notice. I know it is kind of last minute but I would really appreciate it if you could accommodate us.",
        ],
        context: 'push it back は「後ろにずらす」。short notice は「急な連絡」。accommodate は「対応する」の丁寧語。last minute は「直前の」。日本語の「変更したい」は I would like to change が丁寧。something came up は万能の言い訳。',
        character: 'kenji', category: 'request', month: '2026-05',
    },
    {
        daySlot: 42, japanese: '間違い電話です',
        english: [
            'Wrong number.',
            "I think you have the wrong number.",
            "Sorry, I think you have the wrong number. There is nobody by that name here.",
            "Sorry, I think you might have the wrong number. There is no one here by that name. What number were you trying to reach? Yeah, that is not this number. It is close though, just one digit off. No problem at all. It happens. Have a good one.",
        ],
        context: 'wrong number は「間違い電話」。one digit off は「1桁違い」。Have a good one は「よい一日を」の超カジュアル版。日本語の「間違い電話です」は英語で You have the wrong number が丁寧版。It happens は「よくあること」の寛大フレーズ。',
        character: 'master', category: 'request', month: '2026-05',
    },
    {
        daySlot: 42, japanese: '電話するの緊張する',
        english: [
            'Phone calls make me nervous.',
            'I get nervous making phone calls.',
            'I get really nervous making phone calls, especially in English.',
            "Phone calls stress me out so much, especially when I have to speak English. I rehearse what I am going to say like ten times before I dial. And then the other person says something I did not expect and my whole script falls apart. My mind just goes blank. I end up saying yes to everything even when I do not understand what they are saying.",
        ],
        context: 'stress me out は「ストレスを感じさせる」。rehearse は「リハーサルする」。script falls apart は「台本が崩壊する」。mind goes blank は「頭が真っ白になる」。電話の英語は日本人学習者の最大の壁。共感度100%のフレーズ。',
        character: 'yuki', category: 'request', month: '2026-05',
    },
    {
        daySlot: 42, japanese: '後でかけ直すね',
        english: [
            'I will call you later.',
            "I'll call you back later.",
            "Hey, I am kind of in the middle of something. Can I call you back in like twenty minutes?",
            "Hey, sorry, I am in the middle of dinner right now. Can I call you back in maybe thirty minutes? Or actually, would it be easier if I just texted you later tonight? I know this is not urgent so I do not want you to wait around. Whatever works for you. I will reach out as soon as I am free.",
        ],
        context: 'in the middle of something は「今ちょっと取り込み中」の丁寧な断り。reach out は「連絡する」で contact よりカジュアル。wait around は「待ちぼうけする」。whatever works for you は「あなたの都合に合わせるよ」。',
        character: 'takeshi', category: 'request', month: '2026-05',
    },
    {
        daySlot: 42, japanese: '電話ありがとうございました',
        english: [
            'Thanks for calling.',
            'Thank you for calling.',
            'Thank you so much for calling. You have been really helpful.',
            "Thank you so much for your help. I really appreciate you taking the time to walk me through everything. You have been incredibly patient and I know I asked a lot of questions. I feel much better about everything now. Thanks again and have a great rest of your day.",
        ],
        context: 'walk me through は「丁寧に説明してくれる」。taking the time は「時間を取ってくれて」。have a great rest of your day は「残りの一日も良い日を」の電話締めの定番。日本語の「ありがとうございました」より英語は具体的に何にありがたいかを述べる。',
        character: 'yuki', category: 'request', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 43: 道案内 (Giving Directions)
    // Scene: 外国人に道を聞かれた！パニックしながらも英語で案内する。
    // ────────────────────────────────────────────────────

    {
        daySlot: 43, japanese: 'すみません、駅はどこですか？',
        english: [
            'Where is the station?',
            'Excuse me, where is the nearest station?',
            'Excuse me, could you tell me how to get to the station from here?',
            "Excuse me, sorry to bother you. I am completely lost. Could you tell me how to get to the train station from here? I have been walking around for like twenty minutes and I keep ending up back at the same convenience store. My phone GPS is not helping at all. I think it wants me to walk through a building.",
        ],
        context: 'how to get to は「〜への行き方」の基本。completely lost は「完全に迷った」。keep ending up は「何度も戻ってしまう」。walk through a building は GPS あるあるのジョーク。sorry to bother you は「お忙しいところすみません」の英語版。',
        character: 'yuki', category: 'travel', month: '2026-05',
    },
    {
        daySlot: 43, japanese: 'この道をまっすぐ行って',
        english: [
            'Go straight.',
            'Go straight down this road.',
            'Go straight down this road for about two blocks. You cannot miss it.',
            "OK, so you want to go straight down this road. Just keep walking for about two blocks. You will pass a big convenience store on your right and then a park on your left. Once you see the park you are almost there. The station entrance is right after it. You cannot miss it. If you hit the river you have gone too far.",
        ],
        context: 'go straight down は「まっすぐ進む」。block は区画で、アメリカの道案内の基本単位。you cannot miss it は「絶対わかる」の道案内定番フレーズ。if you hit the river は「川まで行ったら行きすぎ」の目安表現。',
        character: 'takeshi', category: 'travel', month: '2026-05',
    },
    {
        daySlot: 43, japanese: '次の角を右に曲がって',
        english: [
            'Turn right at the corner.',
            'Take a right at the next corner.',
            'Take a right at the next corner, the one with the traffic light.',
            "OK, so at the next corner — the one with the traffic light — take a right. You will see a bakery on the corner. If you can smell the bread you are in the right place. Then just keep going straight for maybe a hundred meters and it will be on your left side. There is a big blue sign so it is pretty hard to miss.",
        ],
        context: 'take a right は turn right のカジュアル版。the one with は「〜のある方の」で目印を伝える技術。on your left side は「左手にある」。hard to miss は「見逃しにくい」。道案内は目印（landmark）を使うのが英語の基本。',
        character: 'lisa', category: 'travel', month: '2026-05',
    },
    {
        daySlot: 43, japanese: '歩いて5分くらいです',
        english: [
            'About five minutes.',
            "It's about a five-minute walk.",
            "It is about a five-minute walk from here. Not far at all.",
            "It is about a five-minute walk from here. Maybe seven if you walk at a normal pace. I would say it is like three hundred meters or so. You could also take the bus if you do not feel like walking. There is a bus stop right over there and it stops right in front of it. But honestly, walking is probably faster by the time you wait for the bus.",
        ],
        context: 'a five-minute walk はハイフンでつなぐ複合形容詞。not far at all は「全然遠くない」。at a normal pace は「普通の速さで」。by the time は「〜する頃には」。日本語の「歩いて5分」は英語で a five-minute walk が最もコンパクト。',
        character: 'kenji', category: 'travel', month: '2026-05',
    },
    {
        daySlot: 43, japanese: 'ちょっとわかりにくいかも',
        english: [
            'It is hard to find.',
            "It's a little tricky to find.",
            "It is a little tricky to find. Let me show you on the map.",
            "It is kind of hidden, to be honest. Even locals have trouble finding it. Here, let me pull it up on my phone and show you. See this alley right here? You have to go through there and then it is behind the building. I know it sounds sketchy but trust me, it is there. It took me three tries the first time I went.",
        ],
        context: 'tricky to find は「見つけにくい」。hidden は「隠れた」。pull it up は「（地図を）表示する」。sketchy は「怪しい」のスラング。It took me three tries は「3回かかった」。日本語の「わかりにくい」は tricky / hard to find が最適。',
        character: 'mina', category: 'travel', month: '2026-05',
    },
    {
        daySlot: 43, japanese: 'そこを左に曲がると見えます',
        english: [
            'Turn left and you will see it.',
            "Hang a left there and you'll see it.",
            "Hang a left at that intersection and you should see it right away on the right side.",
            "When you get to that intersection just hang a left and it should be right there on your right. It is a big building with a glass front. You really cannot miss it. If you see a blue sign that says the name in English you are in the right spot. If you end up at a parking lot you went one street too far.",
        ],
        context: 'hang a left は turn left のスラング。should be right there は「すぐそこにあるはず」。glass front は「ガラス張りの正面」。in the right spot は「正しい場所にいる」。one street too far は「1本先に行きすぎ」。hang a left/right はアメリカ口語。',
        character: 'takeshi', category: 'travel', month: '2026-05',
    },
    {
        daySlot: 43, japanese: '地図見せましょうか？',
        english: [
            'Want to see a map?',
            'Do you want me to show you on the map?',
            'Here, let me show you on my phone. It might be easier than trying to explain.',
            "Here, let me just show you on my phone. Directions are way easier to follow when you can actually see them. OK, so we are right here, and you want to get to... here. See? It is not that far. You basically go this way, turn here, and then it is right there. I can even share the route with you if you want.",
        ],
        context: 'way easier は「ずっと簡単」の口語。directions は「道案内」。share the route は「ルートを共有する」の現代表現。日本語の「見せましょうか？」はDo you want me to...? が丁寧で自然。スマホの地図を見せるのが最も実用的な道案内。',
        character: 'lisa', category: 'travel', month: '2026-05',
    },
    {
        daySlot: 43, japanese: 'この辺あんまり詳しくないんです',
        english: [
            'I am not from here.',
            "Sorry, I'm not familiar with this area.",
            "Sorry, I am not really familiar with this area. I do not come here often.",
            "Sorry, I wish I could help but I am not really from around here. I am just visiting a friend and I honestly have no idea where anything is. I got lost myself earlier. But hey, if you pull it up on your phone I can try to help you figure it out. Two lost people are better than one, right?",
        ],
        context: 'not from around here は「この辺の人間じゃない」の道案内断り定番。familiar with は「詳しい」。I wish I could help は「助けたいけど」の丁寧な断り。two lost people are better than one は「二人で迷ったほうがマシ」のユーモア。',
        character: 'yuki', category: 'travel', month: '2026-05',
    },
    {
        daySlot: 43, japanese: '一緒に行きましょうか？途中まで同じ方向です',
        english: [
            'I can walk with you.',
            "I'm going that way. I can walk with you.",
            "Actually, I am heading that way too. I can walk you there if you want.",
            "Actually, I am going in the same direction. How about I just walk with you? It is easier than trying to explain it. I am going to the station anyway so it is literally on my way. I would hate for you to get lost again, especially since the streets around here are kind of confusing even for locals.",
        ],
        context: 'heading that way は「そっちに向かってる」。walk you there は「そこまで一緒に歩く」。on my way は「通り道」。日本語の「途中まで同じ方向」は I am going in the same direction が最も自然。道案内より一緒に歩くほうが確実で親切。',
        character: 'kenji', category: 'travel', month: '2026-05',
    },
    {
        daySlot: 43, japanese: 'お気をつけて！',
        english: [
            'Take care!',
            "Have a good one! Take care!",
            "You should be all set from here. Take care and enjoy your stay!",
            "OK, so you should be all set from here. Just keep going straight and you will see it. If you get lost again feel free to ask anyone. People around here are pretty friendly. Have a great day and enjoy your time in Japan! Safe travels!",
        ],
        context: 'you should be all set は「もう大丈夫なはず」の安心フレーズ。feel free to は「遠慮なく」。safe travels は「よい旅を」。enjoy your stay は「滞在を楽しんで」。日本語の「お気をつけて」は Take care で十分だが、enjoy your stay を足すと外国人へのおもてなし感が出る。',
        character: 'master', category: 'travel', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 44: 週末の話 (Weekend Plans)
    // Scene: 月曜の居酒屋。「週末何してた？」の報告大会。
    // ────────────────────────────────────────────────────

    {
        daySlot: 44, japanese: '週末何してた？',
        english: [
            'What did you do this weekend?',
            'So, what did you do this weekend?',
            'How was your weekend? Do anything fun?',
            "So, how was your weekend? Do anything fun? Mine was... honestly pretty boring. I had all these plans but then Saturday morning came and I just could not get off the couch. I think I watched an entire season of a show I do not even like that much. But sometimes those weekends are exactly what you need, you know?",
        ],
        context: 'Do anything fun? は「何か楽しいことした？」のカジュアル質問。could not get off the couch は「ソファから出られなかった」。an entire season は「シーズン全部」。sometimes those weekends are exactly what you need は「そういう週末も必要」の大人の言い訳。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 44, japanese: 'ダラダラしてた',
        english: [
            'I did nothing.',
            'I just lazed around all weekend.',
            'Honestly, I just stayed home and did absolutely nothing productive.',
            "I basically just existed. I did not leave my apartment once the entire weekend. I lived in my pajamas, ordered delivery twice, and watched random stuff on YouTube. I know it sounds pathetic but honestly I have zero regrets. Sometimes you just need a weekend where you do absolutely nothing and recharge.",
        ],
        context: 'lazed around は「ダラダラする」のドンピシャ。just existed は「ただ存在してた」のユーモア。zero regrets は「後悔ゼロ」。recharge は「充電する」で人にも使える。日本語の「ダラダラ」は英語で lazed around, bummed around, vegged out など表現豊富。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 44, japanese: '友達とBBQした',
        english: [
            'I had a barbecue.',
            'I went to a BBQ with friends.',
            'We had a barbecue at the park. The weather was perfect for it.',
            "We did a BBQ at the park on Sunday and the weather was absolutely perfect. We had like fifteen people show up. Way more than we expected. We ran out of meat halfway through so someone had to do an emergency convenience store run. It was chaotic but so much fun. I got a little sunburned though. Worth it.",
        ],
        context: 'show up は「現れる/来る」。ran out of は「なくなった」。emergency run は「緊急の買い出し」。chaotic は「カオスな」。worth it は「その価値があった」。日本語の「BBQした」は had a BBQ が自然。did a BBQ もカジュアルでOK。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 44, japanese: '買い物に行っただけ',
        english: [
            'I just went shopping.',
            'I just did some shopping. Nothing exciting.',
            'I just went to the mall and did some shopping. Did not even buy much.',
            "I went to the mall but I did not even end up buying anything. I walked around for like two hours, tried on a bunch of stuff, and then put it all back. I do that a lot actually. Window shopping, I guess you would call it. My wallet was happy about it at least. My closet did not need anything new anyway.",
        ],
        context: 'end up buying は「結局買う」。tried on は「試着する」。put it all back は「全部戻す」。window shopping は「ウィンドウショッピング」=見るだけ。my wallet was happy は「財布は喜んでる」の擬人化ユーモア。shopping と buying は別物。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 44, japanese: '久しぶりに実家に帰った',
        english: [
            'I went home.',
            'I went back to my hometown for the first time in a while.',
            'I went back to my hometown this weekend. It had been a while.',
            "I went back home this weekend for the first time in like six months. Everything was exactly the same. My room, the neighborhood, even the stray cat that hangs out by the station. My mom cooked all my favorite stuff. I ate so much I could barely move. I always tell myself I should go back more often but then life gets busy and months just fly by.",
        ],
        context: 'went back home は「実家に帰った」。for the first time in a while は「久しぶりに」。stray cat は「野良猫」。life gets busy は「忙しくなる」。months fly by は「月日が飛ぶように過ぎる」。日本語の「久しぶりに」は for the first time in... が最も汎用的。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 44, japanese: 'Netflix観すぎた',
        english: [
            'I watched too much Netflix.',
            'I totally binge-watched a show all weekend.',
            'I got sucked into a new series on Netflix and watched the whole thing.',
            "I found this new show on Netflix on Friday night and I thought I would just watch one episode. One episode turned into five. Five turned into the entire season. I did not go to bed until four in the morning. Saturday I woke up at noon and continued watching. I have a problem. But that cliffhanger at the end... I need season two immediately.",
        ],
        context: 'binge-watch は「一気見する」の現代英語。got sucked into は「吸い込まれた」。cliffhanger は「ハラハラする終わり方」（崖からぶら下がる=次が気になる）。one episode turned into five は「1話のつもりが5話」のNetflixあるある。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 44, japanese: '日曜は早めに寝た',
        english: [
            'I went to bed early on Sunday.',
            'I had an early night on Sunday.',
            'I went to bed early on Sunday to get ready for the week. Trying to be responsible.',
            "I actually went to bed at like nine thirty on Sunday. I know, grandma hours. But I wanted to start the week fresh for once. Usually I stay up too late on Sunday and then hate myself on Monday morning. This time I was in bed early, got a full eight hours, woke up before my alarm. It felt amazing. I should do this every week. I will not, but I should.",
        ],
        context: 'grandma hours は「おばあちゃんみたいな早寝」のジョーク。start the week fresh は「すっきりした状態で週を始める」。hate myself は「自分を恨む」の自虐。I will not, but I should は「やらないけどやるべき」の正直すぎる自白。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 44, japanese: '来週末こそ何かしたい',
        english: [
            'I want to do something next weekend.',
            "I definitely want to do something next weekend.",
            "Next weekend I am definitely doing something. I refuse to waste another weekend.",
            "Next weekend I am going to actually do something. I say that every week but this time I mean it. I have a whole list of places I want to go and things I want to try but I never actually get around to it. Maybe I will finally check out that new museum everyone has been talking about. Or maybe I will just end up on my couch again. Who am I kidding.",
        ],
        context: 'get around to it は「やっとそれに手をつける」の超重要フレーズ。check out は「見に行く」。who am I kidding は「誰を騙してるんだ」=「自分に正直になろう」の自虐の極み。refuse to は「断固として〜しない」。英語の自虐表現は世界共通のユーモア。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 44, japanese: 'やっぱ週末は短いよね',
        english: [
            'Weekends are too short.',
            'Weekends go by so fast.',
            'Weekends are way too short. I need at least three days off.',
            "How is it Monday already? Weekends go by in like five seconds. Friday night you are all excited thinking about all the things you are going to do, and then you blink and it is Sunday night and you are ironing your shirt for work. Someone needs to invent a three-day weekend. Permanently. Not like a holiday, just every week. Is that too much to ask?",
        ],
        context: 'go by は「過ぎ去る」。blink は「まばたきする」= 一瞬。ironing your shirt は「シャツにアイロンをかける」= 月曜の準備の象徴。is that too much to ask は「それって贅沢？」。日本語の「やっぱ短い」のため息感は how is it Monday already で完璧に出せる。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 44, japanese: '充実した週末だった',
        english: [
            'Good weekend.',
            'I had a really great weekend.',
            'I had a really fulfilling weekend for once. I feel recharged.',
            "I actually had a really great weekend for a change. I went hiking on Saturday, had dinner with friends Saturday night, and then Sunday I just had a slow morning with coffee and a book. No screens, no rushing, just existing. I felt so recharged this morning. It is amazing what two good days can do for your mental health. I need to do this more often.",
        ],
        context: 'fulfilling は「充実した」。recharged は「充電された」。for a change は「たまには」。slow morning は「ゆっくりした朝」。no screens, no rushing, just existing は三拍子のリズムで英語的に美しい。mental health は現代英語で超重要ワード。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
];

// ============================================================
// WEEK 6 DAY THEMES
// ============================================================

export const MONTH2_W6_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    38: {
        title: '家のこと', titleEn: 'Home Life', category: 'social',
        scene: 'みんなの住まい事情。一人暮らし、同棲、実家暮らし。リアルな家トーク。',
        keywords: [
            { en: 'rent', ja: '家賃', pron: 'レント', example: 'My rent is absolutely insane.', note: '名詞でも動詞でも使える。for rent=貸し出し中。renter=借りる人、landlord=大家。' },
            { en: 'hassle', ja: '面倒なこと', pron: 'ハッスル', example: 'Moving is such a hassle.', note: 'trouble より日常的。what a hassle=面倒だなあ。hustle(急ぐ)と似てるけど別物。' },
            { en: 'lease', ja: '賃貸契約', pron: 'リース', example: 'My lease expires next month.', note: 'sign a lease=契約する、renew a lease=更新する。車のリースも同じ語。' },
            { en: 'delivery', ja: '配達', pron: 'デリバリー', example: 'The tracking says out for delivery.', note: 'food delivery=出前。package delivery=宅配。日本の再配達システムは世界一便利。' },
            { en: 'neighbor', ja: '隣人', pron: 'ネイバー', example: 'My neighbor is driving me crazy.', note: '隣の家/部屋の人=neighbor。neighborhood=近所・地域。Good Neighbor Policy はアメリカ外交用語でもある。' },
        ],
    },
    39: {
        title: 'テクノロジー', titleEn: 'Tech Talk', category: 'request',
        scene: 'スマホが壊れた！PCが遅い！デジタル生活のあるある。',
        keywords: [
            { en: 'charger', ja: '充電器', pron: 'チャージャー', example: 'Does anyone have a charger?', note: 'charge=充電する。charger=充電器。battery=バッテリー。英語ではスマホの充電切れを phone died と言う。' },
            { en: 'update', ja: 'アップデート', pron: 'アップデイト', example: 'The update is taking forever.', note: '名詞も動詞も同じ形。software update=ソフト更新。keep me updated=進捗教えて。' },
            { en: 'notification', ja: '通知', pron: 'ノティフィケイション', example: 'I get too many notifications.', note: 'push notification=プッシュ通知。notify=知らせる。日本語の「通知」より英語のほうが長い。' },
            { en: 'shattered', ja: 'バキバキに割れた', pron: 'シャタード', example: 'My screen is completely shattered.', note: 'crack(ヒビ)<shatter(粉々)。ガラスが割れる段階で使い分ける。emotionally shattered=精神的にボロボロ。' },
            { en: 'backup', ja: 'バックアップ', pron: 'バックアップ', example: 'Have you backed up your data?', note: '名詞=backup(1語)、動詞=back up(2語)。Plan B の意味でも使う。have a backup plan=代替案。' },
        ],
    },
    40: {
        title: '意見を言う', titleEn: 'Sharing Opinions', category: 'social',
        scene: '居酒屋で映画の感想からまじめな話まで。意見を言う練習。',
        keywords: [
            { en: 'honest', ja: '正直な', pron: 'オネスト', example: 'To be honest, I did not enjoy it.', note: 'to be honest (TBH)=正直に言うと。honestly は副詞。Hの発音は消える。' },
            { en: 'opinion', ja: '意見', pron: 'オピニオン', example: 'That is just my opinion.', note: 'in my opinion (IMO)=私の意見では。unpopular opinion=少数派の意見。日本語より英語のほうが意見を述べるのが普通。' },
            { en: 'hype', ja: '盛り上がり・宣伝', pron: 'ハイプ', example: "I didn't get the hype.", note: 'hyped=興奮した。overhyped=宣伝しすぎ。live up to the hype=期待に応える。SNS時代の必須語。' },
            { en: 'grain', ja: '粒', pron: 'グレイン', example: 'Take it with a grain of salt.', note: 'a grain of salt=塩一粒。「話半分に聞いて」の意味。古代ローマ由来のイディオム。' },
            { en: 'tear up', ja: 'うるっとする', pron: 'ティアアップ', example: 'The ending made me tear up.', note: 'cry(泣く)の手前。tear=涙。泣くほどじゃないけど目が潤む。感動表現のちょうどいい温度。' },
        ],
    },
    41: {
        title: '約束する', titleEn: 'Making & Keeping Promises', category: 'social',
        scene: '約束を守る、破る、謝る。信頼関係を築く英語。',
        keywords: [
            { en: 'promise', ja: '約束', pron: 'プロミス', example: 'I promise. You have my word.', note: 'make a promise=約束する。keep/break a promise=守る/破る。pinky promise=指切り。' },
            { en: 'reliable', ja: '信頼できる', pron: 'リライアブル', example: 'He is not exactly reliable.', note: 'rely on=頼る。reliable=頼れる。dependable も同義。unreliable=当てにならない。' },
            { en: 'slip', ja: '抜ける・滑る', pron: 'スリップ', example: 'It completely slipped my mind.', note: 'slipped my mind=うっかり忘れた。let it slip=口を滑らせた。物理的にも比喩的にも使う。' },
            { en: 'make up', ja: '埋め合わせる', pron: 'メイクアップ', example: 'Let me make it up to you.', note: '化粧のmake-upと全く別の意味。make up for=埋め合わせる。make up a story=話をでっち上げる。' },
            { en: 'trust', ja: '信頼する', pron: 'トラスト', example: 'Can I trust you on this?', note: '名詞も動詞も同じ形。trust me=信じて。trust issues=信頼問題。earn trust=信頼を勝ち取る。' },
        ],
    },
    42: {
        title: '電話する', titleEn: 'Phone Calls', category: 'request',
        scene: '電話の英語。予約、問い合わせ、友達への電話。',
        keywords: [
            { en: 'hold', ja: '待つ（電話）', pron: 'ホールド', example: 'Could you hold on for a moment?', note: 'hold on=待って。on hold=保留中。put someone on hold=保留にする。電話のholdは待機の意味。' },
            { en: 'voicemail', ja: '留守番電話', pron: 'ヴォイスメール', example: 'Just leave a voicemail.', note: 'leave a voicemail=留守電を残す。check your voicemail=留守電を確認する。若者は留守電を嫌う傾向。' },
            { en: 'connection', ja: '回線・接続', pron: 'コネクション', example: 'The connection is really bad.', note: '電話の接続=connection。internet connection=ネット接続。人脈の意味でも使う。' },
            { en: 'reach', ja: '連絡がつく', pron: 'リーチ', example: 'You can reach me on my cell.', note: 'reach=届く→連絡がつく。reach out=連絡を取る(能動的)。unreachable=連絡がつかない。' },
            { en: 'dial', ja: '電話をかける', pron: 'ダイアル', example: 'I rehearse before I dial.', note: 'ダイヤル式電話の名残り。dial a number=番号をかける。最近はcallのほうが一般的だがdialも現役。' },
        ],
    },
    43: {
        title: '道案内', titleEn: 'Giving Directions', category: 'travel',
        scene: '外国人に道を聞かれた！パニックしながらも英語で案内する。',
        keywords: [
            { en: 'block', ja: '区画', pron: 'ブロック', example: "It's about two blocks from here.", note: 'アメリカの距離単位。1 block=建物1区画分の距離。日本語のメートルと違い感覚的。' },
            { en: 'intersection', ja: '交差点', pron: 'インターセクション', example: 'Turn right at the intersection.', note: 'inter(間)+section(区間)=交わる場所。T字路=T-junction。roundabout=ロータリー。' },
            { en: 'landmark', ja: '目印', pron: 'ランドマーク', example: 'Look for a big blue sign.', note: '道案内の基本は landmark を使うこと。建物、看板、コンビニが使いやすい。' },
            { en: 'GPS', ja: 'ジーピーエス', pron: 'ジーピーエス', example: 'My GPS keeps sending me in circles.', note: 'Global Positioning System。英語ではGPSを動詞的に使うことも。GPS it=ナビで調べて。' },
            { en: 'shortcut', ja: '近道', pron: 'ショートカット', example: "There's a shortcut through the park.", note: 'short+cut=近道。take a shortcut=近道する。PCのショートカットキーも同じ語。' },
        ],
    },
    44: {
        title: '週末の話', titleEn: 'Weekend Plans', category: 'social',
        scene: '月曜の居酒屋。「週末何してた？」の報告大会。',
        keywords: [
            { en: 'binge-watch', ja: '一気見する', pron: 'ビンジウォッチ', example: 'I binge-watched an entire season.', note: 'binge=暴飲暴食→binge-watch=暴視。Netflix時代に生まれた動詞。binge-read=一気読み。' },
            { en: 'recharge', ja: '充電する・回復する', pron: 'リチャージ', example: 'I feel completely recharged.', note: 'スマホだけでなく人にも使う。recharge my batteries=エネルギーを回復する。' },
            { en: 'laze', ja: 'ダラダラする', pron: 'レイズ', example: 'I just lazed around all weekend.', note: 'lazy(怠惰な)の動詞形。laze around=ダラダラ過ごす。似た表現：veg out, bum around。' },
            { en: 'cliffhanger', ja: 'ハラハラする終わり方', pron: 'クリフハンガー', example: 'That cliffhanger ending killed me.', note: 'cliff(崖)+hanger(ぶら下がる)=続きが気になる結末。ドラマ・映画のレビューで超頻出。' },
            { en: 'fulfilling', ja: '充実した', pron: 'フルフィリング', example: 'I had a really fulfilling weekend.', note: 'fulfill=満たす。fulfilling=充実した。productive(生産的)とは違い、心が満たされる感覚。' },
        ],
    },
};
