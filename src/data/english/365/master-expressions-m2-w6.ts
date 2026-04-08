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
            "Five years? That's solid. Don't you ever get lonely though, or are you totally used to it by now?",
        ],
        jaTranslations: [
            '一人暮らしは5年になる。',
            '一人暮らしもう5年くらいになるんだよね。',
            '一人で暮らして5年くらいになる。もう完全に慣れたわ。',
            '5年？なかなかだね。寂しくならない？もう完全に慣れた感じ？',
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
            "Ugh, moving is the worst though. Have you actually started looking, or is it still in the 'thinking about it' phase?",
        ],
        jaTranslations: [
            '引っ越したい。',
            '引っ越ししようかなって思ってるんだよね。',
            '引っ越し考えてるんだ。今の部屋、荷物に対して狭すぎて。',
            'えー、でも引っ越しって超面倒じゃん。もう物件探し始めてんの？それともまだ「考え中」ってやつ？',
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
            "Same! I just set alarms on my phone now. Got sick of finding my trash bag sitting outside with a rejection sticker on it.",
        ],
        jaTranslations: [
            'ゴミの日を忘れる。',
            'ゴミ出しの曜日いっつもごっちゃになるんだよね。',
            'どの曜日に何のゴミか全然覚えられない。ややこしすぎる。',
            'わかる！俺もうスマホにアラーム入れてる。ゴミ袋に「収集できません」シール貼られてるの見るの嫌すぎて。',
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
            "Tell me about it. I'm paying almost half my salary just for rent. At this point I'm seriously considering a roommate.",
        ],
        jaTranslations: [
            '家賃が高すぎる。',
            'うちの家賃マジでやばい。',
            'うちの家賃ほんとにやばい。もう家賃払うために働いてるようなもん。',
            'ほんとそれ。給料の半分くらい家賃で飛ぶんだけど。もうマジでルームメイト探そうかなって。',
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
            "Have you tried talking to the landlord? If knocking on their door isn't working, maybe a complaint from management would help.",
        ],
        jaTranslations: [
            '隣の人がうるさい。',
            '隣の部屋の人めっちゃうるさいんだけど。',
            '隣の部屋の人ほんとうるさくて。壁越しに全部聞こえるんだよ。',
            '大家さんに言った？直接言ってもダメなら、管理会社からクレーム入れてもらうのもありじゃない？',
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
            "You should try meal prepping on Sundays. I started doing that and it's a game changer -- you just heat stuff up after work.",
        ],
        jaTranslations: [
            '自炊する時間がない。',
            '自炊する時間ないんだよね。',
            '家で料理する時間が全然なくて。結局コンビニで済ませちゃう。',
            '日曜に作り置きしてみなよ。俺それ始めてからマジで変わった。仕事終わりはレンチンするだけだし。',
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
            "Just put on some music and blitz through it. Once you start it only takes like thirty minutes, I promise.",
        ],
        jaTranslations: [
            '掃除しなきゃ。',
            'マジで部屋掃除しなきゃ。',
            'ほんとに部屋片付けなきゃ。もう手に負えなくなってきた。',
            '音楽かけて一気にやっちゃいなよ。始めたら30分で終わるから、マジで。',
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
            "Have you tried just unplugging the router and plugging it back in? I know it sounds dumb but it works like half the time.",
        ],
        jaTranslations: [
            'Wi-Fiの調子が悪い。',
            'またWi-Fiの調子悪いんだけど。',
            '今日一日ずっとWi-Fiの調子悪くて。動画すらまともに見れない。',
            'ルーターの電源抜いて入れ直してみた？バカみたいだけど半分くらいそれで直るんだよ。',
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
            "Honestly, I'm jealous. The amount you're saving on rent alone is insane. No shame in that at all.",
        ],
        jaTranslations: [
            '実家が楽。',
            'やっぱ実家暮らしが楽だよね。',
            '正直、実家暮らしのほうが全然楽。飯もタダ、洗濯もタダ。',
            '正直うらやましいわ。家賃だけでもめちゃくちゃ浮くでしょ。全然恥ずかしいことじゃないし。',
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
            "The worst is when it says 'out for delivery' all day and then suddenly switches to 'delivery attempted' when you were literally home the whole time.",
        ],
        jaTranslations: [
            '荷物いつ届くかな？',
            '荷物いつ届くんだろう。',
            '一日中荷物待ってるんだけど。追跡だと「配達中」になってるんだよね。',
            '一番最悪なのは、ずっと「配達中」なのに急に「不在のため持ち帰り」になるやつ。ずっと家にいたのに。',
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
            "I've got a USB-C in my bag, hang on. You really need to get yourself a portable battery -- you're always running out.",
        ],
        jaTranslations: [
            'スマホの充電がない。',
            'スマホもう充電切れそう。',
            'スマホ残り3%なんだけど。誰か充電器持ってない？',
            'USB-Cならカバンに入ってるよ、ちょっと待って。てかモバイルバッテリー買いなよ。いっつも充電切れてるじゃん。',
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
            "Dude, just get a password manager. I used to forget mine constantly too, but now I only have to remember one.",
        ],
        jaTranslations: [
            'パスワード忘れた。',
            'パスワード思い出せないんだけど。',
            'またパスワード忘れた。今月これで3回目だよ。',
            'おい、パスワード管理アプリ入れろって。俺もしょっちゅう忘れてたけど、今は1個だけ覚えとけばいいし。',
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
            "Ninety percent is the danger zone. Whatever you do, don't force restart it or you'll brick the whole thing.",
        ],
        jaTranslations: [
            'アップデートが終わらない。',
            'アップデートめっちゃ時間かかってんだけど。',
            'このアプリのアップデートいつまで経っても終わんない。90%で10分止まってる。',
            '90%は危険ゾーンだぞ。何があっても強制再起動するな。下手したら壊れるから。',
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
            "Are you on Wi-Fi or data? Try switching to the other one. Sometimes my Wi-Fi is garbage but my data works fine.",
        ],
        jaTranslations: [
            'ネットが遅い。',
            '今ネットめっちゃ遅いんだけど。',
            '今日ネット激遅。普通のページすら開けない。',
            'Wi-Fiとモバイル通信どっち？切り替えてみなよ。うちもWi-Fiダメな時あるけどモバイルだと普通に繋がったりするし。',
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
            "Oh yeah? What's it called? I've been looking for something like that. Send me the link later?",
        ],
        jaTranslations: [
            'このアプリ便利だよ。',
            'このアプリめっちゃ便利なんだよね。',
            'このアプリ使ってみなよ。整理するのにめっちゃ便利だから。',
            'へえ、なんてやつ？ちょうどそういうの探してたんだよね。あとでリンク送って？',
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
            "Just go into your settings and turn off everything except calls and messages. Life-changing, trust me.",
        ],
        jaTranslations: [
            '通知が多すぎる。',
            '通知来すぎなんだけど。',
            'スマホひっきりなしにブーブー鳴ってる。通知多すぎ。',
            '設定で電話とメッセージ以外全部オフにしなよ。マジで世界変わるから。',
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
            "Honestly, no. I keep meaning to but I never get around to it. You're scaring me though -- I'll do it tonight.",
        ],
        jaTranslations: [
            'データのバックアップ取った？',
            'バックアップちゃんと取ってる？',
            '最近バックアップ取った？念のためやっといたほうがいいよ。',
            '正直やってない。やろうやろうと思って全然できてなくて。でも今の話怖いわ。今夜やる。',
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
            "Oh no, that's brutal. Does it still work at least? You might be able to get the screen replaced for cheaper at one of those repair shops.",
        ],
        jaTranslations: [
            '画面が割れた。',
            '画面バッキバキに割れてるんだけど。',
            'これ見て。画面完全にバキバキ。昨日落としてさ。',
            'うわ、それきつい。一応動くの？街の修理屋なら安く画面交換できるかもよ。',
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
            "Right? I used it to fix a work email the other day and it honestly sounded better than anything I'd write myself. Kinda scary.",
        ],
        jaTranslations: [
            'AIってすごいよね。',
            'AIってけっこうすごくない？',
            'AIやばいくらい進化してるよね。正直ちょっと怖い。',
            'だよね？この前仕事のメール直してもらったら自分で書くより全然良くて。ちょっと怖いわ。',
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
            "I deleted mine for a week once and just re-downloaded everything. It's honestly addicting. Maybe try setting a screen time limit first?",
        ],
        jaTranslations: [
            'SNSやめたい。',
            'SNSやめたいけどやめられないんだよね。',
            'SNSやめるやめるって言い続けて全然やめられない。',
            '俺も1回1週間消したけど全部入れ直したわ。ほんと中毒だよね。まずスクリーンタイム制限かけてみたら？',
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
            "Wait, really? I thought it was amazing. What part didn't work for you? Maybe we watched it with different expectations.",
        ],
        jaTranslations: [
            '正直に言うと...',
            'ぶっちゃけさ...',
            'ぶっちゃけ、そんなに楽しめなかったんだよね。',
            'え、マジで？俺めっちゃ良かったけど。どこがダメだった？期待値が違ったのかな。',
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
            "Fair enough. I hadn't really thought about it that way. What do you think is the bigger picture then?",
        ],
        jaTranslations: [
            '同意できない。',
            'ちょっと見方が違うかな。',
            '言いたいことはわかるけど、ちょっとそれとは違うと思うんだよね。',
            'なるほどね。そういう見方はしてなかったわ。じゃあ全体的にはどう思ってんの？',
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
            "See? I knew I wasn't the only one! Everyone keeps looking at me weird when I say that, but it's literally true.",
        ],
        jaTranslations: [
            '完全に同意。',
            'ほんとそれ。それ以上ない。',
            'ほんとそれ。まさに自分が思ってたこと。',
            'でしょ？俺だけじゃなかったんだ！みんなに変な目で見られるんだけど、マジでそうなんだって。',
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
            "Yeah, you're right. No point arguing about it. We just like different stuff and that's totally fine.",
        ],
        jaTranslations: [
            '人それぞれだよ。',
            '人それぞれじゃない？',
            '人それぞれだと思うよ。みんなが同じもの好きじゃなくていいし。',
            'まあそうだよな。争っても意味ないし。好みが違うだけで、それでいいんだよ。',
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
            "Ha, at least you're honest about it. Most people just pretend to care and nod along.",
        ],
        jaTranslations: [
            '興味ない。',
            'あんまりそういうの興味ないんだよね。',
            '正直に言うと、全然興味ないんだよね。',
            'はは、まあ正直でいいじゃん。大体の人はとりあえず興味あるフリして頷いてるだけだし。',
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
            "Oh nice, I've been on the fence about watching it. OK, you've convinced me -- I'll check it out this weekend.",
        ],
        jaTranslations: [
            'あの映画よかった。',
            'あの映画ほんとよかったよ。',
            'あの映画めっちゃよかった。そんなに期待してなかったのに完全にやられた。',
            'へー、気になってたんだよね。よし、説得された。今週末観てみるわ。',
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
            "That's the worst kind of movie honestly. I'd rather watch something terrible that's at least memorable.",
        ],
        jaTranslations: [
            'まあまあだった。',
            'なんか微妙だったんだよね。',
            'うーん...まあ悪くはなかったけど。特に何も残らない感じ。',
            'それが一番ダメなパターンだよな正直。ひどい映画のほうがまだ記憶に残るだけマシ。',
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
            "Ha, glad I could help! Sometimes you just need a fresh pair of eyes on it. Let me know if it actually works out.",
        ],
        jaTranslations: [
            'いい考えだね。',
            'それめっちゃいい考えじゃん。',
            'それマジでいい考えだわ。なんで自分で思いつかなかったんだろ。',
            'はは、役に立ててよかった！たまには違う人の目で見るのがいいんだよ。うまくいったら教えてね。',
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
            "No, that actually makes a lot of sense. I think you're more right than you give yourself credit for.",
        ],
        jaTranslations: [
            'よくわからない。',
            'あんまりよくわかんないけど...',
            'あんまり詳しくないんだけど、見た感じだと...',
            'いや、それめっちゃ的確だと思うよ。自分で思ってるより全然合ってるって。',
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
            "Yeah, I saw something about it but didn't really read the details. Fill me in -- what's the big deal?",
        ],
        jaTranslations: [
            'ニュース見た？',
            '最近のニュース見た？',
            '最近ニュース追ってる？いろいろ起きてるよね。',
            'うん、なんか見たけど詳しく読んでないわ。教えてよ、何がそんなに大事なの？',
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
            "Alright, I'm holding you to that. Don't make me regret trusting you on this one.",
        ],
        jaTranslations: [
            '約束する。',
            '約束する。俺の言葉を信じてくれ。',
            '約束する。俺を信じろ。絶対がっかりさせない。',
            'わかった、その言葉信じるからな。信じたこと後悔させんなよ。',
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
            "OK, Friday it is. I'm counting on you -- don't flake on me this time.",
        ],
        jaTranslations: [
            'ちゃんとやるよ。',
            'ちゃんとやるって、マジで。',
            'ちゃんとやるから。俺に任せとけって。',
            'OK、金曜ね。頼んだからな。今回はドタキャンすんなよ。',
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
            "It's OK, stuff happens. Just don't make a habit of it, alright? I was kinda counting on you.",
        ],
        jaTranslations: [
            'ごめん、忘れてた。',
            'ほんとごめん。完全に忘れてた。',
            'ほんとごめん。完全に頭から抜けてた。めっちゃ申し訳ない。',
            'まあいいよ、こういうこともあるし。でも癖にすんなよ？けっこう頼りにしてたんだから。',
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
            "Yeah, you're probably right. I'll have a backup plan just in case he doesn't come through.",
        ],
        jaTranslations: [
            'あてにしないほうがいいよ。',
            'それ、あんまりあてにしないほうがいいと思うよ。',
            '俺だったらあてにしないな。あいつそんなに信用できるタイプじゃないし。',
            'まあそうだよな。万が一のために別プランも考えとくわ。',
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
            "I mean it, I swear. Look, I already started on it last night. I'll show you what I've got so far.",
        ],
        jaTranslations: [
            '信じていいの？',
            'マジで信じていいの？',
            'それ本気で言ってる？ほんとにあてにしていいの？',
            'マジだって。もう昨日の夜から手つけてるし。ここまでやったの見せるよ。',
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
            "OK fine, you're right. I messed up last time. But this time I've already blocked off my schedule -- for real.",
        ],
        jaTranslations: [
            '前も同じこと言ったよね。',
            'それ前にも言ってたよね。',
            '前回も全く同じこと言って、結局何もしなかったよね。',
            'OK、確かにそうだわ。前回はやらかした。でも今回はもうスケジュール押さえてあるから、マジで。',
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
            "You don't have to do all that, but OK, I won't say no to free dinner. Somewhere nice though -- you owe me.",
        ],
        jaTranslations: [
            '埋め合わせするよ。',
            '埋め合わせさせて。',
            '埋め合わせさせてよ。今週末メシ奢るから。',
            'そこまでしなくていいけど、まあタダ飯は断らないよ。でもいい店な？借りがあるんだから。',
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
            "Thanks, that means a lot. I really am sorry though -- I'll make sure it doesn't happen again.",
        ],
        jaTranslations: [
            '大丈夫だよ。',
            'いいよいいよ。気にしないで。',
            'いいってほんとに。気にすんな。こういうことはあるよ。',
            'ありがとう、それ言ってもらえると助かる。ほんとにごめんね。もう絶対やらないから。',
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
            "I respect that. Honestly, there aren't enough people like that anymore. It's rare and I appreciate it.",
        ],
        jaTranslations: [
            '約束は守る。',
            '俺は約束は絶対守るから。',
            '俺は約束を守るタイプの人間だから。それ大事にしてるんだよね。',
            'それは尊敬するわ。正直そういう人もう少ないよ。貴重だし、ありがたい。',
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
            "Ha, I'll believe it when I see it. But yeah, a reminder is a good idea -- just don't ignore it when it goes off.",
        ],
        jaTranslations: [
            '次は忘れない。',
            '次は絶対覚えてるから。',
            '今リマインダー入れてるから、次は忘れないよ。',
            'はは、見てから信じるわ。でもまあリマインダーはいい案だな。鳴ったら無視すんなよ。',
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
            "Hi Yuki, yes this is the reservation line. Let me pull that up -- could you spell the last name for me?",
        ],
        jaTranslations: [
            'もしもし、○○です。',
            'もしもし、ユキですけど。',
            'もしもし、ユキです。予約の電話なんですけど、こちらで合ってますか？',
            'はい、ユキさん、予約窓口です。確認しますね。お名前のスペルお願いできますか？',
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
            "Sure, no problem. Take your time -- I'm not in a rush.",
        ],
        jaTranslations: [
            'お待ちください。',
            'ちょっと待ってもらえますか？',
            'ちょっとだけ待ってもらえます？確認しますね。',
            'はい、大丈夫ですよ。ゆっくりで構いません、急いでないんで。',
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
            "Can you hear me now? Let me try moving closer to the window. If this doesn't work I'll just text you instead.",
        ],
        jaTranslations: [
            '聞こえません。',
            'すみません、よく聞こえないんですけど。',
            'すみません、ちょっと途切れてて。もう一回言ってもらえますか？',
            '今聞こえる？窓の近くに移動してみるね。ダメだったらもうLINEにするわ。',
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
            "Of course, I'll pass the message along. Can I get your number? They should be free in about an hour.",
        ],
        jaTranslations: [
            '折り返し電話もらえますか？',
            '後で電話もらえますか？',
            '手が空いたら折り返してもらえますか？番号は...',
            'もちろん、伝えておきますね。番号教えてもらえます？1時間くらいで空くと思いますよ。',
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
            "Ha, fair. I'll just LINE you then. Honestly, I'm not a big phone person either.",
        ],
        jaTranslations: [
            'メッセージのほうがいい。',
            '電話よりLINEのほうがいいんだけど。',
            '電話じゃなくてメッセージにしてくれない？電話あんまり得意じゃなくて。',
            'はは、わかる。じゃあLINEするわ。正直俺も電話そんな好きじゃないし。',
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
            "Let me check our availability for Sunday. Same time and party size? Yeah, we can do that. I'll update it for you.",
        ],
        jaTranslations: [
            '予約を変更したいです。',
            '予約の変更をお願いしたいんですけど。',
            'すみません、予約の変更の電話なんですけど、可能ですか？',
            '日曜ですね、空き確認しますね。同じ時間と人数でいいですか？はい、大丈夫です。変更しておきますね。',
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
            "Oh, I'm so sorry about that! I must have dialed the wrong number. Sorry for bothering you.",
        ],
        jaTranslations: [
            '番号違いますよ。',
            '間違い電話だと思いますよ。',
            'すみません、番号違いますよ。そういう名前の人はここにはいません。',
            'あ、すみません！番号間違えました。ご迷惑おかけしました。',
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
            "You too? I thought I was the only one. I literally write a script before calling. It helps a little.",
        ],
        jaTranslations: [
            '電話は緊張する。',
            '電話するの緊張するんだよね。',
            '電話するのほんと緊張する、特に英語だと。',
            'わかる！俺もそう思ってたの自分だけかと。電話する前にカンペ書くんだよね。ちょっとはマシになる。',
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
            "No worries, take your time. Just shoot me a text when you're free and I'll pick up.",
        ],
        jaTranslations: [
            '後で電話するね。',
            '後でかけ直すね。',
            'ごめん、今ちょっと取り込み中で。20分くらいしたらかけ直していい？',
            '全然いいよ、ゆっくりで。空いたらLINEしてくれたら出るから。',
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
            "Of course! Happy I could help. Don't hesitate to call us again if anything comes up. Have a great day!",
        ],
        jaTranslations: [
            'お電話ありがとうございました。',
            'お電話ありがとうございました。',
            '本当にありがとうございました。すごく助かりました。',
            'とんでもない！お役に立てて嬉しいです。また何かあったらいつでもお電話くださいね。良い一日を！',
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
            "Oh sure, it's actually not far from here. Just go straight that way and take the second left. You'll see it in like five minutes.",
        ],
        jaTranslations: [
            '駅はどこですか？',
            'すみません、一番近い駅はどこですか？',
            'すみません、ここから駅までどう行けばいいですか？',
            'あ、はい、ここからそんなに遠くないですよ。あっちにまっすぐ行って2つ目を左で、5分くらいで着きますよ。',
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
            "Got it -- straight, then look for the park. Thanks so much, I really appreciate it!",
        ],
        jaTranslations: [
            'まっすぐ行って。',
            'この道をまっすぐ行ってください。',
            'この道を2ブロックくらいまっすぐ行けば、すぐわかりますよ。',
            'わかりました。まっすぐ行って公園を探せばいいんですね。ありがとうございます！',
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
            "Right at the traffic light, then straight -- got it. And there's a blue sign? OK, I think I can find it. Thanks a lot!",
        ],
        jaTranslations: [
            '次の角を右に。',
            '次の角を右に曲がってください。',
            '次の角、信号のあるところを右に曲がってください。',
            '信号のところ右で、まっすぐ。で、青い看板があると。OK、たぶん行けそうです。ありがとうございます！',
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
            "Oh, that's closer than I thought! I'll just walk then. Which direction do I head?",
        ],
        jaTranslations: [
            '5分くらいです。',
            '歩いて5分くらいですよ。',
            'ここから歩いて5分くらいです。全然遠くないですよ。',
            'え、思ったより近いんですね！じゃあ歩いて行きます。どっちの方向ですか？',
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
            "Oh, a map would be great actually. I've been going in circles and Google Maps keeps sending me to the wrong spot.",
        ],
        jaTranslations: [
            'ちょっと見つけにくいかも。',
            'ちょっとわかりにくいかもしれないです。',
            'ちょっとわかりにくいかも。地図で見せますね。',
            'あ、地図ありがたいです。ぐるぐる迷っちゃって、Googleマップもなんか変なとこに案内するし。',
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
            "Left at the intersection, then on my right. Big glass building. OK, I think I've got it now. Thank you!",
        ],
        jaTranslations: [
            '左に曲がれば見えます。',
            'そこを左に曲がればすぐ見えますよ。',
            'その交差点を左に曲がれば、すぐ右手に見えるはずですよ。',
            '交差点を左、で右手にあると。大きなガラス張りのビル。OK、たぶんわかります。ありがとうございます！',
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
            "Oh, that would be awesome! Yeah, if you could share the route that would save me. I'm terrible with verbal directions.",
        ],
        jaTranslations: [
            '地図見ますか？',
            '地図見せましょうか？',
            'あ、スマホで見せますね。説明するよりわかりやすいと思うので。',
            'うわ、それ助かります！ルート共有してもらえたら最高です。口で言われるとわかんなくなるタイプで。',
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
            "No worries at all! I'll ask someone else. Thanks anyway -- hope you enjoy your visit!",
        ],
        jaTranslations: [
            'この辺詳しくないんです。',
            'すみません、この辺あんまり詳しくなくて。',
            'すみません、この辺あんまり詳しくないんです。あまり来ないもので。',
            '全然大丈夫ですよ！他の人に聞いてみます。ありがとうございます。楽しんでくださいね！',
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
            "Really? That's so nice of you! Are you sure it's not out of your way? I don't want to be a bother.",
        ],
        jaTranslations: [
            '一緒に行けますよ。',
            '同じ方向なので一緒に行けますよ。',
            'あ、実は俺もそっち方面なんで。よかったら一緒に行きますよ。',
            'え、ほんとですか？ご迷惑じゃないですか？遠回りにならないといいんですけど。',
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
            "Thank you so much for all your help! Everyone here has been so kind. I really appreciate it!",
        ],
        jaTranslations: [
            'お気をつけて！',
            '気をつけて！良い一日を！',
            'ここからはもう大丈夫だと思います。気をつけて、滞在楽しんでくださいね！',
            '本当にありがとうございます！みんなすごく親切で感動です。ほんとに助かりました！',
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
            "It was actually pretty chill. I didn't do anything crazy -- just hung out at home mostly. How about yours?",
        ],
        jaTranslations: [
            '週末何してた？',
            'で、週末何してたの？',
            '週末どうだった？何か楽しいことした？',
            'まあまあかな。特に何もしてない、ほぼ家にいた。そっちは？',
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
            "Honestly, that sounds amazing. Sometimes doing nothing is exactly what you need. No shame in that.",
        ],
        jaTranslations: [
            '何もしてない。',
            'ずっとダラダラしてた。',
            '正直、ずっと家にいて何も生産的なことしてない。',
            '正直それ最高じゃん。何もしない日って必要なんだよ。全然恥じることないって。',
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
            "Oh nice, that sounds fun! Jealous -- I haven't been to a BBQ in ages. Next time you guys do one, count me in.",
        ],
        jaTranslations: [
            'BBQした。',
            '友達とBBQしたよ。',
            '公園で友達とBBQしたんだ。天気も最高だったし。',
            'いいなー、楽しそう！俺もう長いことBBQ行ってないわ。次やるとき俺も誘ってよ。',
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
            "I do the same thing all the time. Walk around, try stuff on, buy nothing. At least it gets you out of the house, right?",
        ],
        jaTranslations: [
            '買い物行っただけ。',
            'ちょっと買い物行っただけ。特に何も。',
            'モール行ってちょっと買い物しただけ。大して買ってないけど。',
            'あるある。うろうろして試着して、何も買わないやつ。でもまあ外に出るだけでもいいじゃん。',
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
            "Aw, that's nice. Nothing beats your mom's cooking. You should go back more often -- she probably misses you.",
        ],
        jaTranslations: [
            '実家に帰った。',
            '久しぶりに地元帰ったよ。',
            '今週末久しぶりに地元帰ったんだ。結構久しぶりだった。',
            'いいね。やっぱお母さんの飯が一番だよね。もっと頻繁に帰ってあげなよ、寂しがってるって。',
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
            "Oh no, what show? Don't tell me or I'll get sucked in too. Actually, tell me -- I need something to watch this weekend.",
        ],
        jaTranslations: [
            'Netflix観すぎた。',
            '週末ずっとドラマ一気見してた。',
            'Netflixで新しいシリーズにハマって全部観ちゃった。',
            'え、何のドラマ？言わないで、俺もハマっちゃうから。やっぱ教えて、今週末何か観たいし。',
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
            "Wait, nine thirty? On a Sunday? That's wild discipline. I'm usually still scrolling at midnight wondering where the weekend went.",
        ],
        jaTranslations: [
            '日曜は早く寝た。',
            '日曜は早めに寝たよ。',
            '日曜は早めに寝て月曜に備えたんだ。ちゃんとしようと思って。',
            'え、9時半？日曜に？すごい自制心だな。俺なんて夜中までスマホいじって週末どこ行ったんだろって思ってるのに。',
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
            "You always say that! How about we actually make plans right now so you can't bail? I'm free Saturday.",
        ],
        jaTranslations: [
            '来週末は何かしたい。',
            '来週末こそ絶対何かするぞ。',
            '来週末は絶対何かする。もう週末ムダにしたくない。',
            'いっつもそう言うじゃん！今ここで予定立てちゃおうよ、逃げられないように。土曜空いてるよ。',
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
            "Seriously. I feel like I just left the office on Friday and now I'm back. Three-day weekends should be the standard.",
        ],
        jaTranslations: [
            '週末短すぎ。',
            '週末ほんとあっという間だよね。',
            '週末短すぎない？最低3日は休みほしい。',
            'マジでそれ。金曜に会社出たと思ったらもう月曜だもん。3連休が標準になるべきだよ。',
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
            "That sounds perfect honestly. You look refreshed too. Where'd you go hiking? I've been wanting to get out more.",
        ],
        jaTranslations: [
            'いい週末だった。',
            'めっちゃ充実した週末だった。',
            '珍しく充実した週末だった。リフレッシュできたわ。',
            'いいね、それ理想的じゃん。なんかスッキリした顔してるし。ハイキングどこ行ったの？俺ももっと外出たいんだよね。',
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
