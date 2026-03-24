/**
 * 会話マスター365 -- Story Scenes (Days 1-10)
 *
 * Short izakaya scenes (15-25 lines) where characters naturally use
 * each day's expressions. Funny, character-consistent, never textbook-y.
 *
 * Characters:
 *   yuki (28F) - TOEIC 620, reads OK, freezes when speaking
 *   gondo (58M) - Master, ex-NYC bartender, TOEIC 990, speaks truth
 *   takeshi (35M) - TOEIC 550, broken English, unstoppable energy
 *   lisa (32F) - TOEIC 860, returnee, natural but prideful
 *   kenji (45M) - TOEIC 480, director, learning for his team
 *   mina (24F) - TOEIC 730, shy, killer listening from K-pop
 */

// ============================================================
// TYPES
// ============================================================

export interface KaiwaStoryLine {
    speaker: string;
    japanese: string;
    english?: string;
    mood?: 'normal' | 'drunk' | 'angry' | 'excited' | 'thinking' | 'smug' | 'defeated';
    action?: string;
}

export interface KaiwaStory {
    daySlot: number;
    title: string;
    titleEn: string;
    scene: string;
    story: KaiwaStoryLine[];
}

// ============================================================
// STORIES: DAYS 1-10
// ============================================================

export const KAIWA_STORIES: KaiwaStory[] = [

    // ────────────────────────────────────────────────────
    // DAY 1: はじめまして (Meeting People)
    // ユキが居酒屋で権藤マスターと初対面
    // ────────────────────────────────────────────────────
    {
        daySlot: 1,
        title: 'はじめまして',
        titleEn: 'Meeting People',
        scene: '雨の金曜夜。ユキが初めて権藤マスターの居酒屋の暖簾をくぐる。',
        story: [
            { speaker: 'narration', japanese: '下北沢の路地裏。小さな居酒屋の暖簾が雨に揺れている。' },
            { speaker: 'yuki', japanese: 'すみません...ここ、まだ入れますか？', action: '傘をたたみながら恐る恐る入る' },
            { speaker: 'master', japanese: 'いらっしゃい。カウンター空いてるよ。', mood: 'normal', action: 'グラスを拭きながら' },
            { speaker: 'yuki', japanese: 'あ、はじめまして。友達に聞いて...いい店だって。', english: 'Nice to meet you. I heard about this place from a friend.', mood: 'normal' },
            { speaker: 'master', japanese: 'そりゃどうも。で、お名前は？', english: 'I appreciate that. And your name is...?', mood: 'normal' },
            { speaker: 'yuki', japanese: 'ユキです。よろしくお願いします。', english: 'I am Yuki. Looking forward to it.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'マスター！とりあえずビール！...あれ、新しいお客さん？', english: "Master! Beer first! ...Oh, new face?", mood: 'excited', action: '奥のカウンター席から身を乗り出す' },
            { speaker: 'master', japanese: 'タケシ、先に自己紹介しろ。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'あ、はいはい！タケシっす！IT関係！ここ、いい店ですよ。マスターの英語がマジですごい。', english: "I am Takeshi! IT guy! This place is great. Master's English is, like, for real amazing.", mood: 'excited' },
            { speaker: 'yuki', japanese: '英語...？居酒屋なのに？', mood: 'thinking' },
            { speaker: 'master', japanese: 'うちは「英語で注文できたら一杯サービス」なんだ。何がおすすめかって？...まず自分の言葉で聞いてみな。', english: 'We do "order in English, get one free." What do I recommend? Try asking me yourself.', mood: 'smug', action: 'メニューを差し出す' },
            { speaker: 'yuki', japanese: 'え...What do you...recommend...?', mood: 'defeated', action: '声が消え入りそうになる' },
            { speaker: 'master', japanese: '聞こえたよ。完璧だ。ちょっと聞いてよユキさん、ここの連中はみんな最初そうだった。', english: 'I heard you. Perfect. Listen, Yuki, everyone here started the same way.', mood: 'normal' },
            { speaker: 'takeshi', japanese: '俺なんて最初 "Nice to meet you" を "Nice to meat you" って書いて肉の話だと思われたっすからね！', english: "Dude, I once wrote 'Nice to meat you' and they thought I was talking about beef!", mood: 'excited' },
            { speaker: 'yuki', japanese: '...ぷっ。仕事帰りですか、タケシさん？', english: 'Did you just finish work?', mood: 'normal', action: '少しだけ笑う' },
            { speaker: 'takeshi', japanese: '毎日仕事帰りっすよ！ここが俺のセカンドオフィス！', english: "Every day after work! This is my second office!", mood: 'excited' },
            { speaker: 'master', japanese: 'ユキさん、ビールでいいか？', mood: 'normal' },
            { speaker: 'yuki', japanese: '...I will start with a beer.', english: 'I will start with a beer.', mood: 'normal', action: '自分の英語に少し驚く' },
            { speaker: 'master', japanese: 'ほら、もう言えてる。', english: 'See? You already said it.', mood: 'smug', action: 'ビールを注ぎながら' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 2: 注文する (Ordering)
    // 居酒屋で英語メニューに挑戦。タケシが暴走
    // ────────────────────────────────────────────────────
    {
        daySlot: 2,
        title: '注文する',
        titleEn: 'Ordering',
        scene: 'マスターが英語メニューを導入した夜。タケシがいきなりフル英語で注文しようとする。',
        story: [
            { speaker: 'narration', japanese: 'カウンターに見慣れない英語メニューが並んでいる。' },
            { speaker: 'takeshi', japanese: 'マスター！今日から英語メニュー？俺やるっす！全部英語で注文する！', mood: 'excited', action: 'メニューを掴む' },
            { speaker: 'master', japanese: '...どうぞ。', mood: 'normal', action: '腕を組んで見守る' },
            { speaker: 'takeshi', japanese: 'OK! I want...chicken...uh...fire? Fire chicken?', english: 'I want... chicken... fire? Fire chicken?', mood: 'excited' },
            { speaker: 'yuki', japanese: 'それ唐揚げのこと...？', mood: 'thinking' },
            { speaker: 'master', japanese: 'タケシ、Is this spicy? って聞いてみろ。', english: 'Takeshi, try asking: Is this spicy?', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'Is this SUPER spicy? Because I am STRONG spicy man!', english: 'Is this super spicy? Because I am strong spicy man!', mood: 'excited' },
            { speaker: 'yuki', japanese: '...strong spicy man って何。', mood: 'normal', action: 'ビールを吹きそうになる' },
            { speaker: 'master', japanese: '意味は伝わる。それでいい。ユキさんは？', mood: 'smug' },
            { speaker: 'yuki', japanese: 'えっと...Can I get...the edamame...and...', english: 'Can I get the edamame and...', mood: 'normal', action: 'メニューを指差しながら' },
            { speaker: 'master', japanese: '枝豆は英語でもedamameだ。そのまま通じる。', english: 'Edamame is edamame in English. It works.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'え、マジ？じゃあ寿司もsushi、ラーメンもramen？日本語最強じゃん！', mood: 'excited' },
            { speaker: 'yuki', japanese: 'あと...これってアレルギー表示ありますか？友達が来週来るんですけど...', english: 'Do you have allergy information? My friend is coming next week...', mood: 'thinking' },
            { speaker: 'master', japanese: 'I have a food allergy. これ言えたら海外で命を守れる。allergyの発音、アレルギーじゃなくてアラジーな。', english: 'Saying "I have a food allergy" can save your life abroad. Pronounce it ah-luh-jee, not ah-reh-gee.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'アラジー...アラ...アラジン？', english: 'Ah-luh... Aladdin?', mood: 'thinking' },
            { speaker: 'yuki', japanese: 'それディズニー。', mood: 'normal' },
            { speaker: 'narration', japanese: '2時間後。テーブルに空き皿が積み上がっている。' },
            { speaker: 'takeshi', japanese: 'マスター！Can I get the check? ...あ、これ合ってる？', english: 'Can I get the check?', mood: 'excited' },
            { speaker: 'master', japanese: '完璧。英語で注文できたから一杯サービスだ。', english: 'Perfect. You ordered in English, so one drink on the house.', mood: 'smug' },
            { speaker: 'takeshi', japanese: 'やった！That was AMAZING! 英語で飲むビール、うまさ2倍っす！', english: 'Yes! That was amazing! Beer tastes twice as good in English!', mood: 'excited' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 3: 買い物する (Shopping)
    // ユキがコンビニで外国人観光客に話しかけられる
    // ────────────────────────────────────────────────────
    {
        daySlot: 3,
        title: '買い物する',
        titleEn: 'Shopping',
        scene: '翌日の昼休み。ユキがコンビニでお弁当を選んでいると外国人観光客に話しかけられる。',
        story: [
            { speaker: 'narration', japanese: 'オフィス近くのコンビニ。ユキの後ろで外国人カップルが困っている。' },
            { speaker: 'yuki', japanese: '（あ...外国人だ...目を合わせなければ...）', mood: 'defeated', action: 'お弁当コーナーに逃げようとする' },
            { speaker: 'narration', japanese: '目が合った。' },
            { speaker: 'yuki', japanese: '（終わった）', mood: 'defeated' },
            { speaker: 'yuki', japanese: 'あ...Can I...help...you?', english: 'Can I help you?', mood: 'normal', action: '心臓バクバク' },
            { speaker: 'narration', japanese: '観光客が「お土産にお菓子を買いたいけど何がいいかわからない」とジェスチャーで伝えてくる。' },
            { speaker: 'yuki', japanese: 'Oh...you are just browsing? Or...looking for something?', english: 'Oh, are you just browsing? Or looking for something?', mood: 'thinking' },
            { speaker: 'narration', japanese: '観光客がスマホで「gift」と見せてくる。' },
            { speaker: 'yuki', japanese: 'Gift! OK! This is popular...and this one is...good for gift...', english: 'Gift! OK! This one is popular, and this one is good for a gift.', mood: 'normal', action: 'お菓子コーナーに案内する' },
            { speaker: 'narration', japanese: '観光客がたくさん選び始めて予算を気にしている様子。' },
            { speaker: 'yuki', japanese: '（えーと、予算オーバーって何て言うんだっけ...マスターが言ってた...）It is a little over your budget...maybe?', english: 'That might be a little over your budget, maybe?', mood: 'thinking' },
            { speaker: 'narration', japanese: '観光客が笑って3つに減らす。ラッピングを指差して聞いてくる。' },
            { speaker: 'yuki', japanese: 'あ、Can you gift wrap this? ...あ、私店員じゃないです。I am not...I do not work here!', english: 'Oh, "can you gift wrap this" is what you say to the cashier. I do not work here though!', mood: 'excited', action: '慌てて手を振る' },
            { speaker: 'narration', japanese: '全員で笑う。観光客がお礼を言って去っていく。' },
            { speaker: 'yuki', japanese: '（...あれ、今の、英語で会話できてた...？）', mood: 'thinking', action: 'コンビニの前で立ち尽くす' },
            { speaker: 'narration', japanese: 'その夜、居酒屋にて。' },
            { speaker: 'yuki', japanese: 'マスター、今日コンビニで外国人と喋れたんです。ちょっとだけど。', mood: 'excited' },
            { speaker: 'master', japanese: '「ちょっと」で十分だ。昨日まではゼロだったんだから。', english: 'A little is enough. Yesterday it was zero.', mood: 'normal', action: 'ビールを出す' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 4: 移動する (Getting Around)
    // タケシが駅で道を聞かれてパニック。リサが助ける
    // ────────────────────────────────────────────────────
    {
        daySlot: 4,
        title: '移動する',
        titleEn: 'Getting Around',
        scene: '渋谷駅。タケシが外国人に道を聞かれてフリーズ。偶然リサが通りかかる。',
        story: [
            { speaker: 'narration', japanese: '渋谷駅ハチ公口。タケシの前に地図を持った外国人が立っている。' },
            { speaker: 'takeshi', japanese: '（やばいやばいやばい道聞かれてる英語英語英語）', mood: 'defeated', action: '額に汗が浮かぶ' },
            { speaker: 'takeshi', japanese: 'Ah...you...lost? You are lost?', english: 'You... lost? You are lost?', mood: 'normal' },
            { speaker: 'narration', japanese: '外国人が「新宿に行きたい」とスマホの画面を見せる。' },
            { speaker: 'takeshi', japanese: 'Shinjuku! OK! You go...that...train...uh...change? No, transfer! Transfer!', english: 'Shinjuku! OK! You go... that... train... transfer!', mood: 'excited', action: '両手で電車の動きを再現する' },
            { speaker: 'lisa', japanese: 'タケシ？何やってんの？', action: '通りすがりに立ち止まる' },
            { speaker: 'takeshi', japanese: 'リサ！！助けて！！道聞かれた！！', mood: 'excited' },
            { speaker: 'lisa', japanese: 'Is this the right platform? って聞きたいんだと思うよ、この人。', english: 'They probably want to know: is this the right platform?', mood: 'normal' },
            { speaker: 'lisa', japanese: 'Take the Yamanote Line. It is about fifteen minutes. Walking distance from the station.', english: 'Take the Yamanote Line. About fifteen minutes. The place is walking distance from the station.', mood: 'normal', action: '外国人にスマホの地図を見せながら' },
            { speaker: 'takeshi', japanese: 'リサ...かっこよすぎない？', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'タケシ、platformって知ってた？日本語のホームは英語じゃ通じないからね。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'え、ホームって英語じゃないの！？home...家じゃん！', mood: 'excited' },
            { speaker: 'lisa', japanese: 'そう、英語のhomeは家。駅のホームはplatform。Nothing looks familiar? って言ったら「見覚えない？」って意味。', english: '"Nothing looks familiar" means you do not recognize anything around you.', mood: 'smug' },
            { speaker: 'takeshi', japanese: 'ファミリア...ファミリー...みたいな？', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'そう、同じ語源。馴染みがある、って意味。', mood: 'normal' },
            { speaker: 'narration', japanese: 'その夜、居酒屋にて。' },
            { speaker: 'takeshi', japanese: 'マスター、今日駅でI am lostの人に会って、俺もI am lostだった。', english: "Master, today I met someone who was lost, and I was also lost.", mood: 'defeated' },
            { speaker: 'master', japanese: '迷ったって認められるやつが一番強い。I am lost. 3語で完結する最強のSOS。', english: '"I am lost." Three words. The strongest SOS in English.', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 5: 気持ちを伝える (Expressing Feelings)
    // 居酒屋で全員が英語学習の本音を語る夜
    // ────────────────────────────────────────────────────
    {
        daySlot: 5,
        title: '気持ちを伝える',
        titleEn: 'Expressing Feelings',
        scene: '金曜の夜。全員が集まった居酒屋で、英語学習の本音がこぼれ始める。',
        story: [
            { speaker: 'narration', japanese: '珍しく全員が揃った金曜日。3杯目のビールあたりから空気が変わる。' },
            { speaker: 'kenji', japanese: '...正直に言っていいか。俺、もう限界かもしれん。', mood: 'defeated', action: 'ジョッキを置く' },
            { speaker: 'yuki', japanese: 'ケンジさん...？', mood: 'normal' },
            { speaker: 'kenji', japanese: '45歳で英語。部下の前で恥かくだけだ。I am exhausted...で合ってるか？疲れた、って。', english: 'I am exhausted.', mood: 'defeated' },
            { speaker: 'master', japanese: '合ってる。tiredの3倍くらい疲れてる感じだ。', english: 'That is right. It sounds about three times more tired than just "tired."', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'ケンジさん、わかりますよ。俺だって英語出てこないときマジでイライラする。It is so...frustrating!', english: 'It is so frustrating!', mood: 'normal' },
            { speaker: 'mina', japanese: '...私も。聞き取れるのに返せない。頭の中で英語が渋滞してて。', mood: 'defeated', action: '小さな声で' },
            { speaker: 'lisa', japanese: '私はさ、逆に自信ありすぎて痛い目見たことある。英語できるって思ってたのにニューヨークで全然通じなくて。I was not feeling confident at all.', english: 'I was not feeling confident at all.', mood: 'thinking' },
            { speaker: 'yuki', japanese: 'リサさんでも...？', mood: 'normal' },
            { speaker: 'lisa', japanese: 'TOEIC 860でも、電話でピザ注文できなかった夜があるよ。', mood: 'normal' },
            { speaker: 'kenji', japanese: '...それ聞いて少し安心した。What a relief...って言うんだよな？', english: 'What a relief.', mood: 'normal' },
            { speaker: 'master', japanese: 'ケンジ、今お前は英語で自分の気持ちを言えた。exhausted も frustrating も relief も。それができないやつはこの店に来ない。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'なんか...Something shifted? って感じっすね。空気変わった。', english: 'Something just shifted.', mood: 'thinking' },
            { speaker: 'master', japanese: 'そう。shiftは微妙な変化だ。changeより小さい。でもその小さい変化が一番大事だ。', english: 'A shift is a small change. Smaller than change. But the most important kind.', mood: 'normal' },
            { speaker: 'mina', japanese: '...私、ここに来てよかったです。', mood: 'normal', action: '少し泣きそうになる' },
            { speaker: 'kenji', japanese: '俺も。...もう1杯もらえるか、マスター。', mood: 'normal' },
            { speaker: 'master', japanese: '何杯でも出す。お前らが英語で注文する限りはな。', english: 'As many as you want. As long as you order in English.', mood: 'smug' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 6: 頼む・断る (Requests and Declining)
    // リサが丁寧な頼み方と断り方を実演する
    // ────────────────────────────────────────────────────
    {
        daySlot: 6,
        title: '頼む・断る',
        titleEn: 'Requests and Declining',
        scene: 'リサが「頼み方と断り方」のロールプレイを始める。タケシの断り方がひどい。',
        story: [
            { speaker: 'narration', japanese: 'リサがカウンターの前に立ち、ホワイトボードを持ち出す。' },
            { speaker: 'lisa', japanese: '今日のテーマ、「頼む」と「断る」。英語は断り方にめちゃくちゃ気を使う言語なの。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '断る？ "No" でよくない？', mood: 'normal' },
            { speaker: 'lisa', japanese: '...それ会社でやったら一発で関係終わるよ。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'まず頼むとき。Sorry to bother you, but... から始める。「お忙しいところすみません」に相当するやつ。', english: 'Start with "Sorry to bother you, but..." It softens everything.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'I have a favor to ask...って言い方もありますよね？', english: 'I have a favor to ask.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'そう！それ使えたらかなりいい。じゃあロールプレイ。タケシ、私に何か頼んで。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'OK! Lisa! Give me...uh...your pen!', english: 'Give me your pen!', mood: 'excited' },
            { speaker: 'lisa', japanese: '...はい0点。命令じゃん。', mood: 'normal' },
            { speaker: 'master', japanese: 'Could you...から始めろ、タケシ。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'Could you...give me...your pen...please?', english: 'Could you give me your pen, please?', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'OK! 70点。じゃあ今度は私が断る。I am going to have to pass. 「ごめん、遠慮するね」。', english: 'I am going to have to pass.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'pass...パスってスポーツの？', mood: 'thinking' },
            { speaker: 'lisa', japanese: '「パスする」って日本語でも言うでしょ。同じよ。柔らかい断り方。', mood: 'normal' },
            { speaker: 'kenji', japanese: '仕事で使えそうだな。I will handle it. って言えたら、部下に任せるときに使えるか？', english: 'I will handle it.', mood: 'thinking' },
            { speaker: 'master', japanese: 'ケンジ、それ完璧。handleは「対処する」。I got this. と同じだ。', mood: 'normal' },
            { speaker: 'yuki', japanese: '断るときに I just cannot swing it. って聞いたことあるんですけど...', english: 'I just cannot swing it.', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'カジュアルな「都合がつかない」ね。swingって振るっていう意味から来てるの。やりくりする、みたいな。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'じゃあ俺、明日の合コンの断り方。I cannot swing it because I am...uh...busy with English?', english: 'I cannot swing it because I am busy with English.', mood: 'excited' },
            { speaker: 'master', japanese: '初めてまともな断り方ができたな。成長だ。', mood: 'smug' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 7: 雑談する (Small Talk)
    // 週末の居酒屋。全員で英語雑談に初挑戦
    // ────────────────────────────────────────────────────
    {
        daySlot: 7,
        title: '雑談する',
        titleEn: 'Small Talk',
        scene: '土曜の夕方。マスターが「今日は全部英語で雑談」ルールを発動する。',
        story: [
            { speaker: 'master', japanese: '今日のルール。日本語禁止。雑談だけでいい。英語で。', mood: 'normal', action: 'カウンターにENGLISH ONLYの札を置く' },
            { speaker: 'takeshi', japanese: 'えー！？', mood: 'excited' },
            { speaker: 'master', japanese: 'ほら、もう日本語出た。罰金100円。', mood: 'smug' },
            { speaker: 'lisa', japanese: '...OK, I will start. So, what is a typical day for you guys?', english: 'What is a typical day for you guys?', mood: 'normal' },
            { speaker: 'yuki', japanese: '...I...wake up...go to office...work...come here.', english: 'I wake up, go to the office, work, and come here.', mood: 'defeated', action: '指を折りながら' },
            { speaker: 'takeshi', japanese: 'Me too! Same same! We have so much in common!', english: 'Me too! We have so much in common!', mood: 'excited' },
            { speaker: 'lisa', japanese: 'タケシ、that is not really having things in common. Everyone does that.', english: 'That is not really having things in common. Everyone works and eats.', mood: 'normal' },
            { speaker: 'kenji', japanese: '...My...hobby...is...', english: 'My hobby is...', mood: 'thinking', action: '必死に単語を探す' },
            { speaker: 'mina', japanese: 'What are you into, Kenji-san?', english: 'What are you into?', mood: 'normal' },
            { speaker: 'kenji', japanese: 'Into...? Fishing. I like fishing.', english: 'Fishing. I like fishing.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'See? What are you into? のほうが hobby より自然でしょ。あ、日本語使っちゃった。100円。', mood: 'normal', action: '自分で罰金箱に入れる' },
            { speaker: 'takeshi', japanese: 'Want to exchange numbers? I mean, LINE! Exchange LINE!', english: 'Want to exchange numbers? I mean, LINE!', mood: 'excited' },
            { speaker: 'yuki', japanese: 'We already have a group chat, Takeshi...', english: 'We already have a group chat.', mood: 'normal' },
            { speaker: 'master', japanese: 'いい空気だ。Let us stay in touch. This is what small talk is about. 完璧な英語じゃなくていい。繋がろうとする気持ちだ。', english: 'Let us stay in touch. Small talk is not about perfect English. It is about wanting to connect.', mood: 'normal' },
            { speaker: 'mina', japanese: '...This is fun. I like this.', english: 'This is fun. I like this.', mood: 'normal', action: '小さく微笑む' },
            { speaker: 'kenji', japanese: '...Me too.', english: 'Me too.', mood: 'normal' },
            { speaker: 'narration', japanese: '罰金箱には1200円貯まっていた。ほとんどタケシのぶんだった。' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 8: 自己紹介をもっと (More About Yourself)
    // 居酒屋の2回目。みんなが自分の話をもっと深くする夜
    // ────────────────────────────────────────────────────
    {
        daySlot: 8,
        title: '自己紹介をもっと',
        titleEn: 'More About Yourself',
        scene: '2週目の月曜。マスターが「名前と仕事以外の自己紹介」を課題に出す。',
        story: [
            { speaker: 'master', japanese: '先週は名前と仕事だけだった。今日はもっと深くいこう。趣味、家族、出身、何でもいい。英語で。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'OK! I am originally from Osaka! Born and raised! I moved here for...uh...work!', english: "I am originally from Osaka. Born and raised. Moved here for work.", mood: 'excited' },
            { speaker: 'master', japanese: 'originally from、いいぞ。I am from だけだと今住んでるところにも聞こえる。', mood: 'normal' },
            { speaker: 'kenji', japanese: '...I am in construction. Going on ten years now.', english: 'I am in construction. Going on ten years now.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'Kenji-san, that was really natural. Going on ten years, perfect.', english: 'That was really natural.', mood: 'normal' },
            { speaker: 'kenji', japanese: '...ドラマで覚えた。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'It is just the three of us! Me, my wife, and our kid! He is five! He says "why" to EVERYTHING!', english: "It is just the three of us. Me, my wife, and our kid. He is five and says 'why' to everything.", mood: 'excited' },
            { speaker: 'mina', japanese: '...I am a cat person. I have two.', english: 'I am a cat person. I have two at home.', mood: 'normal', action: 'スマホの猫写真をそっと見せる' },
            { speaker: 'takeshi', japanese: 'かわいい！！あ、Cute!! So cute!!', english: 'Cute! So cute!', mood: 'excited' },
            { speaker: 'yuki', japanese: 'I have been studying English for... honestly forever. I can read it OK but...', english: "I have been studying English for, honestly, forever. I can read it but I freeze when someone talks to me.", mood: 'defeated' },
            { speaker: 'master', japanese: 'have been studying。「ずっとやってる」。その言い方で十分伝わるよ。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'I am based in Yokohama. Close enough to Tokyo for work, far enough that rent does not destroy me.', english: 'I am based in Yokohama. Close enough for work, far enough that rent is manageable.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'Destroy! 家賃がdestroy！わかる！東京の家賃はdestroy！', english: 'Destroy! Rent is destroy!', mood: 'excited' },
            { speaker: 'yuki', japanese: '...タケシさんの英語、文法めちゃくちゃなのに意味だけは完璧に伝わるの何なんですか。', mood: 'thinking' },
            { speaker: 'master', japanese: '伝えたい気持ちが強いからだ。文法は後からついてくる。気持ちは後から足せない。', english: 'It is because his desire to communicate is strong. Grammar follows. Desire does not.', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 9: カフェで注文 (At a Cafe)
    // リサが常連たちをおしゃれカフェに連れて行く
    // ────────────────────────────────────────────────────
    {
        daySlot: 9,
        title: 'カフェで注文',
        titleEn: 'At a Cafe',
        scene: '日曜の午後。リサが「たまには居酒屋以外で英語使おう」とカフェに全員を召集。',
        story: [
            { speaker: 'narration', japanese: '表参道のおしゃれカフェ。メニューが全部英語。タケシが固まっている。' },
            { speaker: 'takeshi', japanese: 'Flat white...Cortado...Affogato...これ全部コーヒー？', mood: 'defeated', action: 'メニューを裏返してみる' },
            { speaker: 'lisa', japanese: 'ここ、外国人のバリスタだから注文は英語だよ。いい練習でしょ？', mood: 'smug' },
            { speaker: 'kenji', japanese: '俺はコーヒーが飲めればそれでいい。Black coffee, please。これで通じるか？', english: 'Black coffee, please.', mood: 'normal' },
            { speaker: 'lisa', japanese: '通じる。十分。Can I get a flat white? って言えたらもっとカフェっぽいけど。', english: 'Can I get a flat white?', mood: 'normal' },
            { speaker: 'yuki', japanese: 'Could I get an iced latte? ...With oat milk, please.', english: 'Could I get an iced latte with oat milk?', mood: 'normal' },
            { speaker: 'lisa', japanese: 'ユキ、今の完璧。couldを使えてる。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'OK my turn! I want...big...coffee...very sweet...with...milk bubble!', english: 'I want a big coffee, very sweet, with milk bubble!', mood: 'excited', action: '手でホイップを表現する' },
            { speaker: 'mina', japanese: '...whipped cream?', english: 'Whipped cream.', mood: 'normal', action: 'ぼそっと' },
            { speaker: 'takeshi', japanese: 'That! That thing! Whipped cream! ミナちゃん天才！', mood: 'excited' },
            { speaker: 'narration', japanese: '注文が届く。タケシのカップに名前が書いてある。「TAKESI」。' },
            { speaker: 'takeshi', japanese: 'TAKESI...Hが消えた...', mood: 'defeated' },
            { speaker: 'lisa', japanese: '海外あるある。スタバで名前間違えられないアメリカ人はいない。', mood: 'normal' },
            { speaker: 'kenji', japanese: '...This is good. I like this place.', english: 'This is good. I like this place.', mood: 'normal', action: 'ブラックコーヒーをすする' },
            { speaker: 'yuki', japanese: 'ケンジさん、カフェでも英語出てきてますよ。', mood: 'normal' },
            { speaker: 'kenji', japanese: '居酒屋で3杯飲んだ後よりシラフのほうが英語出るかもしれん。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'Excuse me! Can I get another one? Same thing! TAKESHI, with an H!', english: 'Can I get another one? Same thing! Takeshi, with an H!', mood: 'excited', action: 'バリスタに向かって' },
            { speaker: 'narration', japanese: '2杯目のカップには「TAKEHI」と書いてあった。' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 10: ドラッグストアで (At a Drugstore)
    // ケンジが海外出張前にドラッグストアで買い物
    // ────────────────────────────────────────────────────
    {
        daySlot: 10,
        title: 'ドラッグストアで',
        titleEn: 'At a Drugstore',
        scene: '木曜の夜。ケンジが来週の海外出張で必要なものをドラッグストアで買いたいが英語のラベルが読めない。',
        story: [
            { speaker: 'narration', japanese: '居酒屋にケンジが大きな紙袋を持って現れる。' },
            { speaker: 'kenji', japanese: '来週シンガポール出張なんだが...ドラッグストアで何買えばいいかわからん。', mood: 'defeated', action: '紙袋をカウンターに置く' },
            { speaker: 'takeshi', japanese: 'ケンジさん、海外！？いいなー！何日？', mood: 'excited' },
            { speaker: 'kenji', japanese: '3日。でも英語で薬も買えない男が海外って笑い話だろ。', mood: 'defeated' },
            { speaker: 'master', japanese: 'headache、stomachache、cold。この3つ覚えとけ。', english: 'Headache, stomachache, cold. Learn these three.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'Do you have anything for a headache? って言えたらOKですよね？', english: 'Do you have anything for a headache?', mood: 'normal' },
            { speaker: 'kenji', japanese: 'Do you have anything for... stomachache?', english: 'Do you have anything for a stomachache?', mood: 'thinking', action: '紙にメモする' },
            { speaker: 'takeshi', japanese: '俺、前に海外のドラッグストアで日焼け止め買おうとして "sun block face cream fire protection" って言ったっすよ。', english: 'Sun block face cream fire protection!', mood: 'excited' },
            { speaker: 'lisa', japanese: '...fire protection は防火だよ。sunscreen で通じるよ。', mood: 'normal' },
            { speaker: 'mina', japanese: 'ケンジさん、Is this for allergies? って書いてあるパッケージは花粉症用ですよ。allergyの発音、アラジーです。', english: 'Look for "Is this for allergies?" on the package.', mood: 'normal' },
            { speaker: 'kenji', japanese: 'アラジー...アレルギーじゃなくてアラジー...', mood: 'thinking', action: 'メモに書き足す' },
            { speaker: 'master', japanese: 'あと1つ。I need something for... って言えたら何でも買える。forの後に症状を入れるだけだ。', english: '"I need something for..." plus the symptom. That is the pattern.', mood: 'normal' },
            { speaker: 'kenji', japanese: 'I need something for...jet lag?', english: 'I need something for jet lag.', mood: 'thinking' },
            { speaker: 'master', japanese: '...時差ボケに効く薬は売ってないが、英語は完璧だ。', mood: 'smug' },
            { speaker: 'takeshi', japanese: 'ケンジさん！お土産よろしく！I want...Singapore...thing!', english: 'I want a Singapore thing!', mood: 'excited' },
            { speaker: 'lisa', japanese: '...souvenir ね。お土産は souvenir。', mood: 'normal' },
            { speaker: 'kenji', japanese: '...I will try my best.', english: 'I will try my best.', mood: 'normal', action: 'メモをポケットにしまう' },
            { speaker: 'master', japanese: 'ケンジ、シンガポールから帰ったら英語で報告しろよ。', english: 'When you get back, report in English.', mood: 'smug' },
            { speaker: 'kenji', japanese: '...考えとく。', mood: 'normal' },
        ],
    },

];
