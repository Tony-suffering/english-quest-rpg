/**
 * 365 English Master -- Kaiwa Stories: Days 31-40
 *
 * Month 2 begins. The crew is sharper now -- yuki pushes herself, kenji has tasted
 * a real win, mina speaks up more often, takeshi is still takeshi.
 *
 * Day 31: 朝の会話 (Morning Talk)
 * Day 32: 仕事の英語 (Work English)
 * Day 33: ランチタイム (Lunch Decisions)
 * Day 34: 天気の話 (Weather)
 * Day 35: 予定を立てる (Making Plans)
 * Day 36: 体調の話 (Body Aches)
 * Day 37: 趣味の話 (Hobbies)
 * Day 38: 家のこと (Home Life)
 * Day 39: テクノロジー (Tech & Apps)
 * Day 40: 意見を言う (Sharing Opinions)
 */

import type { KaiwaStory } from './kaiwa-stories';

export const KAIWA_STORIES_4: KaiwaStory[] = [

    // ────────────────────────────────────────────────────
    // DAY 31: 朝の会話 (Morning Talk)
    // Month 2 開幕。朝、各自バラバラの場所で。LINEで繋がっている
    // ────────────────────────────────────────────────────
    {
        daySlot: 31,
        title: 'Month 2、朝のLINE',
        titleEn: 'Month 2 Begins on LINE',
        scene: '5月1日、朝7時。グループLINEに突然タケシが「Good morning everyone!」と投下。全員寝起きで反応する。',
        story: [
            { speaker: 'narrator', japanese: '5月1日、午前7時2分。グループLINE「居酒屋イングリッシュ」に通知。' },
            { speaker: 'takeshi', japanese: 'Good morning everyone! Month 2スタート！朝から英語で挨拶しよう！', english: 'Good morning everyone! Month 2 starts today!', mood: 'excited' },
            { speaker: 'yuki', japanese: 'タケシさん...朝7時にテンション高すぎ。', mood: 'defeated', action: 'まだ布団の中' },
            { speaker: 'lisa', japanese: 'Did you even sleep? You up already?', english: 'Did you even sleep?', mood: 'normal' },
            { speaker: 'takeshi', japanese: '5時起き！息子が "Daddy! Daddy!" って起こしてきた！I am running on caffeine.', english: 'I am running on caffeine.', mood: 'excited' },
            { speaker: 'kenji', japanese: '俺は4時起きだ。現場が遠い。電車で英語のニュース聞いてる。Just on the train now.', english: 'Just on the train now.', mood: 'normal' },
            { speaker: 'mina', japanese: 'おはようございます...I just woke up. まだ目が開かない。', english: 'I just woke up.', mood: 'defeated' },
            { speaker: 'yuki', japanese: 'ミナちゃんも？私もまだ寝てた。Five more minutes...って気分。', english: 'Five more minutes.', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'みんなの朝の第一声って何？日本語でいいから。', mood: 'thinking' },
            { speaker: 'takeshi', japanese: '「あー、今日も生きてる」。', mood: 'normal' },
            { speaker: 'kenji', japanese: '「腰が痛い」。', mood: 'defeated' },
            { speaker: 'yuki', japanese: '...無言でスマホ見る。', mood: 'thinking' },
            { speaker: 'mina', japanese: '...猫に「おはよう」って言う。猫しかいないので。', mood: 'normal' },
            { speaker: 'lisa', japanese: '英語だとね、I am not a morning person. 朝苦手な人ってこう言うの。', english: 'I am not a morning person.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'それ私だ。I am NOT a morning person. 強調する。', english: 'I am not a morning person.', mood: 'normal' },
            { speaker: 'master', japanese: '...全員、朝から元気だな。', english: 'You guys are up early.', mood: 'normal', action: 'マスターが既読をつける' },
            { speaker: 'takeshi', japanese: 'マスター！朝も英語で話せる！Have a great day everyone!', english: 'Have a great day, everyone!', mood: 'excited' },
            { speaker: 'master', japanese: '朝の挨拶は1日のトーンを決める。日本語でも英語でも、最初の一言を雑にするな。', english: 'The first words of the day set the tone.', mood: 'normal' },
            { speaker: 'kenji', japanese: '...マスター、朝から重い。', mood: 'defeated' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 32: 仕事の英語 (Work English)
    // ユキが「自分の仕事を英語で説明できない」問題に直面
    // ────────────────────────────────────────────────────
    {
        daySlot: 32,
        title: '自分の仕事、英語でどう言う？',
        titleEn: 'What Do You Even Do?',
        scene: '居酒屋。ユキが「外国人に職業聞かれて答えられなかった」と落ち込んで現れる。',
        story: [
            { speaker: 'narrator', japanese: '月曜の夜。ユキがビールを一気に半分飲んでから話し始める。' },
            { speaker: 'yuki', japanese: '今日エレベーターで外国人に "What do you do?" って聞かれて...固まった。', mood: 'defeated' },
            { speaker: 'takeshi', japanese: 'え、ユキちゃん何やってる人だっけ？', mood: 'thinking' },
            { speaker: 'yuki', japanese: '...タケシさんも知らないんだ。マーケティングです。', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'マーケって幅広いじゃん。何のマーケ？', mood: 'normal' },
            { speaker: 'yuki', japanese: 'BtoBのSaaS企業でデジタル広告運用とウェビナー企画とリード獲得を...', mood: 'thinking' },
            { speaker: 'kenji', japanese: '...日本語でも何言ってるかわからん。', mood: 'defeated' },
            { speaker: 'master', japanese: 'ユキ。エレベーターは何秒だ？', mood: 'normal' },
            { speaker: 'yuki', japanese: '...30秒くらい？', mood: 'thinking' },
            { speaker: 'master', japanese: '30秒で全部説明しようとするな。I work in marketing. それだけでいい。', english: 'I work in marketing. That is the whole answer.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'もうちょっと足すなら、I work in B2B marketing. We help companies get more customers. これくらい。', english: 'We help companies get more customers.', mood: 'normal' },
            { speaker: 'mina', japanese: '...私もずっと考えてた。「事務職」って英語で何て言うんだろうって。', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'I work in admin. or I do back-office work. これでいいよ。', english: 'I do back-office work.', mood: 'normal' },
            { speaker: 'takeshi', japanese: '俺は I work in IT! 完璧！...あ、でもその先聞かれたら困る。', mood: 'excited' },
            { speaker: 'master', japanese: '聞かれてから考えろ。先回りして難しくするな。', mood: 'normal' },
            { speaker: 'kenji', japanese: 'I am in construction. Going on 22 years. ...この間覚えた言い方が一番楽だ。', english: 'I am in construction. Going on 22 years.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'なるほど...短く。次エレベーターで聞かれたら、I work in marketing. Nice to meet you. これで終わらせる。', english: 'I work in marketing. Nice to meet you.', mood: 'normal' },
            { speaker: 'master', japanese: 'いい。仕事の話で長く喋れるやつは、たいてい面白くない。', english: 'People who talk long about their job are usually boring.', mood: 'smug' },
            { speaker: 'takeshi', japanese: '...マスター、それ俺のこと？', mood: 'defeated' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 33: ランチタイム (Lunch Decisions)
    // 平日の昼、グループLINEで「何食べる？」が始まる
    // ────────────────────────────────────────────────────
    {
        daySlot: 33,
        title: '昼の決断疲れ',
        titleEn: 'Lunch Decision Fatigue',
        scene: '平日12時05分。グループLINEに「お腹空いた」が連投される昼休み。',
        story: [
            { speaker: 'narrator', japanese: '火曜、12時05分。誰かが「お腹空いた」と打った瞬間、LINEが爆発する。' },
            { speaker: 'takeshi', japanese: 'お腹空いた。I am starving. 何食べよう。', english: 'I am starving.', mood: 'defeated' },
            { speaker: 'yuki', japanese: 'わかる。Same here. でも決められない。', english: 'Same here.', mood: 'defeated' },
            { speaker: 'mina', japanese: '私もう4日連続コンビニのおにぎり...', mood: 'defeated' },
            { speaker: 'lisa', japanese: '4日連続!? You need real food. ちゃんと食べな。', english: 'You need real food.', mood: 'angry' },
            { speaker: 'kenji', japanese: '俺は弁当だ。嫁の弁当。文句言えない。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'ラーメンか牛丼か...What are you in the mood for? って自分に聞いてる。', english: 'What are you in the mood for?', mood: 'thinking' },
            { speaker: 'yuki', japanese: 'タケシさん、毎日それで結局ラーメン食べてるじゃん。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'バレた。I always end up at the ramen place.', english: 'I always end up at the ramen place.', mood: 'defeated' },
            { speaker: 'mina', japanese: '今日は思い切って...サラダボウルにします。Something light.', english: 'Something light.', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'いいね。私は今日カフェでサンドイッチ。I am grabbing a sandwich.', english: 'I am grabbing a sandwich.', mood: 'normal' },
            { speaker: 'yuki', japanese: '"grab" って便利。サクッと食べる感じ。', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'そう。grab a coffee, grab lunch, grab a bite. 全部「サクッと」のニュアンス。', english: 'Grab a coffee, grab lunch, grab a bite.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'OK決めた！ I am going to grab some ramen!', english: 'I am going to grab some ramen!', mood: 'excited' },
            { speaker: 'kenji', japanese: 'タケシ、お前のはgrabのレベル超えてる。1時間かけて食べるじゃないか。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'スープまで飲むから...I cannot leave it.', english: 'I cannot leave it.', mood: 'excited' },
            { speaker: 'yuki', japanese: '私もコンビニ寄ってから戻る。Talk to you later. みんな午後も頑張ろう。', english: 'Talk to you later.', mood: 'normal' },
            { speaker: 'mina', japanese: 'はい。Catch you later.', english: 'Catch you later.', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 34: 天気の話 (Weather Talk)
    // 5月の異常気象。全員が天気の話で繋がる
    // ────────────────────────────────────────────────────
    {
        daySlot: 34,
        title: '5月なのに32度',
        titleEn: 'Thirty-Two Degrees in May',
        scene: '5月なのに真夏日。居酒屋に汗だくで集まるメンバー。誰もまともに会話してない。',
        story: [
            { speaker: 'narrator', japanese: '5月7日。気温32度。タケシが汗だくで居酒屋に入ってくる。' },
            { speaker: 'takeshi', japanese: 'マスター！冷たいビール！死にそう！', mood: 'defeated' },
            { speaker: 'master', japanese: '5月でこの暑さか。It is way too hot for May.', english: 'It is way too hot for May.', mood: 'normal' },
            { speaker: 'yuki', japanese: '電車の冷房が壊れてた。地獄。It was unbearable.', english: 'It was unbearable.', mood: 'defeated' },
            { speaker: 'kenji', japanese: '現場は40度近かった。部下が3人熱中症。Stay hydrated って言いまくった。', english: 'Stay hydrated.', mood: 'defeated' },
            { speaker: 'mina', japanese: '私は寒いんです。エアコン効きすぎでガクガク。I am freezing.', english: 'I am freezing.', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'オフィスあるあるね。It is freezing inside, boiling outside. 温度差で死ぬ。', english: 'Freezing inside, boiling outside.', mood: 'normal' },
            { speaker: 'takeshi', japanese: '外boilingで中freezing。日本のオフィスを一言で表してる。', mood: 'normal' },
            { speaker: 'yuki', japanese: '梅雨もすぐ来ますよね。Rainy season is just around the corner.', english: 'Rainy season is just around the corner.', mood: 'thinking' },
            { speaker: 'kenji', japanese: '梅雨...rainy season。直訳で通じるんだな。', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'でも英語圏に「梅雨」の概念ない国も多いから、説明することになる。Japan has a rainy season in June. これで十分。', english: 'Japan has a rainy season in June.', mood: 'normal' },
            { speaker: 'mina', japanese: '海外の友達に「梅雨」って説明してもピンとこないって言われました。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'マスター、夏ニューヨークどうだった？', mood: 'thinking' },
            { speaker: 'master', japanese: '...湿気はない。でも8月のNYは灼熱地獄だ。アスファルトから熱気が上がる。It is a different kind of hot.', english: 'It is a different kind of hot.', mood: 'normal' },
            { speaker: 'yuki', japanese: '「違う種類の暑さ」って表現、いい。', mood: 'thinking' },
            { speaker: 'master', japanese: '天気の話は世界共通の挨拶だ。Lovely weather, isn\'t it? がイギリスの定番。皮肉のときもある。', english: 'Lovely weather, isn\'t it?', mood: 'smug' },
            { speaker: 'takeshi', japanese: '皮肉？天気いいねって嫌味で言うの？', mood: 'thinking' },
            { speaker: 'master', japanese: '土砂降りの中で言う。それがイギリス英語だ。', mood: 'smug' },
            { speaker: 'yuki', japanese: '...奥が深い。', mood: 'thinking' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 35: 予定を立てる (Making Plans)
    // 温泉旅行(Day 27)の延期分。リサが今度こそ日程出す
    // ────────────────────────────────────────────────────
    {
        daySlot: 35,
        title: '温泉旅行、リベンジ',
        titleEn: 'Hot Spring Trip, Take Two',
        scene: 'グループLINE。先月延期された温泉旅行の日程調整を、今度こそ決める夜。',
        story: [
            { speaker: 'narrator', japanese: '木曜の夜10時。グループLINEにリサから通知。' },
            { speaker: 'lisa', japanese: 'OK みんな、温泉リベンジしたい。今月の最終週末どう？', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'Yes! Finally! I am in!', english: 'I am in!', mood: 'excited' },
            { speaker: 'yuki', japanese: '私もいけそう。Sounds good to me.', english: 'Sounds good to me.', mood: 'normal' },
            { speaker: 'mina', japanese: '土曜なら大丈夫です。日曜は猫の病院...', mood: 'thinking' },
            { speaker: 'kenji', japanese: '土曜から日曜、1泊2日でいいか？俺は現場が月曜朝から。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'OK 土日1泊で決まり。Let me check on hotels.', english: 'Let me check on hotels.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'Pencil me in! 俺の予定もう確保！', english: 'Pencil me in!', mood: 'excited' },
            { speaker: 'yuki', japanese: 'タケシさん前回ドタキャンしなかった？', mood: 'thinking' },
            { speaker: 'takeshi', japanese: 'それリサ！I am NOT a flaky guy!', english: 'I am not a flaky guy!', mood: 'angry' },
            { speaker: 'lisa', japanese: '...flaky使えるんだ。意外。', mood: 'smug' },
            { speaker: 'mina', japanese: 'flakyって、ドタキャンする人のことですよね？', mood: 'normal' },
            { speaker: 'lisa', japanese: 'そう。約束守らないタイプ。He is flaky. っていうと「あいつ信用できない」って意味。', english: 'He is flaky.', mood: 'normal' },
            { speaker: 'kenji', japanese: '...宿は俺が探す。前回も俺が候補出した。学習してる。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'ケンジさんありがとう！I owe you one.', english: 'I owe you one.', mood: 'normal' },
            { speaker: 'yuki', japanese: '集合時間と場所、リマインドお願いします。私絶対忘れる。Send me a reminder the day before, please.', english: 'Send me a reminder the day before, please.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'マスターも来ないの？店休んで！', mood: 'excited' },
            { speaker: 'master', japanese: '...日曜の夜の予約が入ってる。土産の温泉まんじゅう、待ってる。', english: 'I will be expecting souvenirs.', mood: 'normal' },
            { speaker: 'mina', japanese: '了解です。I am looking forward to it!', english: 'I am looking forward to it!', mood: 'excited' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 36: 体調の話 (Body Aches)
    // Day 12の続編。今度は具体的に痛い場所を英語で言う
    // ────────────────────────────────────────────────────
    {
        daySlot: 36,
        title: 'デスクワーカーの墓場',
        titleEn: 'Death by Desk Job',
        scene: '居酒屋。全員が体のどこかが痛い。整体に行く決意をする夜。',
        story: [
            { speaker: 'narrator', japanese: '水曜の夜。ユキが首を回しながら入ってくる。' },
            { speaker: 'yuki', japanese: '...首が痛い。My neck is stiff. パソコン1日10時間見すぎた。', english: 'My neck is stiff.', mood: 'defeated' },
            { speaker: 'mina', japanese: '私は肩こりが...My shoulders are so tight. マッサージ行かないと無理。', english: 'My shoulders are so tight.', mood: 'defeated' },
            { speaker: 'takeshi', japanese: '俺は腰！I threw my back out! 先週ぎっくり腰になりかけた！', english: 'I threw my back out!', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'I threw my back out って結構強い表現だよ。ぎっくり腰がドンピシャ。', mood: 'normal' },
            { speaker: 'kenji', japanese: '俺は全部痛い。Everything hurts. 朝起きる時が一番つらい。', english: 'Everything hurts.', mood: 'defeated' },
            { speaker: 'yuki', japanese: '...全員ボロボロじゃないですか。', mood: 'defeated' },
            { speaker: 'master', japanese: '...デスクワーカーの墓場だな、ここは。', english: 'This place is a graveyard for desk workers.', mood: 'smug' },
            { speaker: 'mina', japanese: '目も疲れます。My eyes are killing me. ブルーライトカットメガネ買ったのに効いてる気がしない。', english: 'My eyes are killing me.', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'I have been getting headaches lately. 私も最近頭痛が...', english: 'I have been getting headaches lately.', mood: 'defeated' },
            { speaker: 'takeshi', japanese: 'リサもか！ストレス？', mood: 'thinking' },
            { speaker: 'lisa', japanese: '寝不足。It is probably from lack of sleep.', english: 'It is probably from lack of sleep.', mood: 'thinking' },
            { speaker: 'yuki', japanese: 'ストレッチくらいするしかないですよね。I should stretch more.', english: 'I should stretch more.', mood: 'thinking' },
            { speaker: 'kenji', japanese: '...30代までは寝れば治ってた。40過ぎたら寝ても治らない。', mood: 'defeated' },
            { speaker: 'mina', japanese: '私24歳ですけど寝ても治りません...', mood: 'defeated' },
            { speaker: 'takeshi', japanese: 'ミナちゃん24!? 一番若いのに体ボロボロ！', mood: 'excited' },
            { speaker: 'master', japanese: '...体は嘘をつかない。English も同じだ。無理して喋ると喉が痛くなる。', english: 'Your body does not lie. Neither does your English.', mood: 'normal' },
            { speaker: 'yuki', japanese: '...マスター、深い話に持っていこうとしてるけど、今夜は体の話だけで満腹です。', mood: 'defeated' },
            { speaker: 'master', japanese: '...そうか。じゃあビール冷えてるぞ。', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 37: 趣味の話 (Hobbies)
    // 「無意味な時間」をどう英語で愛おしく語るか
    // ────────────────────────────────────────────────────
    {
        daySlot: 37,
        title: 'どうでもいい時間の話',
        titleEn: 'Stuff I Do for No Reason',
        scene: '居酒屋。リサが「みんなの一番どうでもいい趣味、英語で言って」と振る。',
        story: [
            { speaker: 'lisa', japanese: '今日のテーマ。趣味じゃなくて、「どうでもいい時間」。何で時間溶かしてる？英語で。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'YouTube。1日2時間。意味なく見てる。I waste so much time on YouTube.', english: 'I waste so much time on YouTube.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'wasteって自己否定の言い方だね。I love losing myself on YouTube. のほうが愛がある。', english: 'I love losing myself on YouTube.', mood: 'normal' },
            { speaker: 'mina', japanese: '私はK-popのライブ映像。同じ曲を50回見ます。I am obsessed.', english: 'I am obsessed.', mood: 'normal' },
            { speaker: 'yuki', japanese: '私はネットでカフェ巡りの動画。行かないけど見る。It is my guilty pleasure.', english: 'It is my guilty pleasure.', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'guilty pleasure 出た！「やめられない罪悪感ある楽しみ」。完璧。', mood: 'smug' },
            { speaker: 'kenji', japanese: '俺は釣り番組見てる。釣りには行かない。見るだけ。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'ケンジさん、それ「I watch fishing shows」？でも釣らない？', mood: 'thinking' },
            { speaker: 'kenji', japanese: 'I watch fishing shows but I do not fish. It is relaxing.', english: 'It is relaxing.', mood: 'normal' },
            { speaker: 'mina', japanese: 'わかります。見るだけって贅沢ですよね。', mood: 'normal' },
            { speaker: 'lisa', japanese: '英語で趣味聞かれて「読書」「映画鑑賞」って答える日本人が多いけど、もっと具体的なほうが会話弾むよ。', mood: 'normal' },
            { speaker: 'yuki', japanese: '「読書」って言うと、What kind of books? って絶対聞かれて固まる。', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'そう。最初から I am into Japanese mystery novels. とか具体的に言ったほうが楽。', english: 'I am into Japanese mystery novels.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'I am really into watching salarymen get yelled at on TV! ...これは？', english: 'I am really into watching salarymen get yelled at on TV!', mood: 'excited' },
            { speaker: 'lisa', japanese: '...何の番組？', mood: 'thinking' },
            { speaker: 'takeshi', japanese: 'いや、ニュースとかドキュメンタリーとか...', mood: 'defeated' },
            { speaker: 'mina', japanese: 'タケシさん、それ趣味じゃなくて性癖です。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'ミナちゃん辛辣!?', mood: 'excited' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 38: 家のこと (Home Life)
    // 家の中の話をすると、その人の生活が見える
    // ────────────────────────────────────────────────────
    {
        daySlot: 38,
        title: '一人暮らしと実家と、家族と',
        titleEn: 'Where We Crash',
        scene: '居酒屋。タケシが家のリフォームの愚痴から、全員の住環境の話に発展。',
        story: [
            { speaker: 'takeshi', japanese: 'うちのトイレ壊れた。My toilet is broken. もう3日。', english: 'My toilet is broken.', mood: 'defeated' },
            { speaker: 'lisa', japanese: '3日!? どうしてんの？', mood: 'excited' },
            { speaker: 'takeshi', japanese: 'コンビニ。1日3回行く。店員にI live nearby って言って通る。', english: 'I live nearby.', mood: 'defeated' },
            { speaker: 'yuki', japanese: '...タケシさん、業者呼ばないんですか。', mood: 'thinking' },
            { speaker: 'takeshi', japanese: '高い！The plumber wants 30,000 yen!', english: 'The plumber wants 30,000 yen!', mood: 'angry' },
            { speaker: 'mina', japanese: 'plumber...水道屋さんですよね。発音「プラマー」でしたっけ。', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'そう、bは発音しない。「プラマー」。', mood: 'normal' },
            { speaker: 'kenji', japanese: '一軒家か、賃貸か。', mood: 'thinking' },
            { speaker: 'takeshi', japanese: '賃貸。3LDKで月13万。郊外だから安い。', mood: 'normal' },
            { speaker: 'yuki', japanese: '私は1Kで都心。家賃9万でカツカツ。Rent is brutal.', english: 'Rent is brutal.', mood: 'defeated' },
            { speaker: 'mina', japanese: '私はワンルームです。実家から1時間半。たまに実家帰ります。I crash at my parents\' place on weekends sometimes.', english: 'I crash at my parents\' place on weekends sometimes.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'crash at...いいね。「泊まり込む」って意味。家の話で自然に使える。', mood: 'normal' },
            { speaker: 'kenji', japanese: '俺は持ち家。ローン残り18年。生きてるか分からん。', mood: 'defeated' },
            { speaker: 'takeshi', japanese: 'ケンジさん持ち家！？すげー！I am still renting forever.', english: 'I am still renting forever.', mood: 'excited' },
            { speaker: 'lisa', japanese: '私は実家暮らし。32歳。Yes, I still live with my parents. 言うと外国人にびっくりされる。', english: 'Yes, I still live with my parents.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'え、リサさん実家!? 都心のおしゃれな1LDKに住んでそう。', mood: 'excited' },
            { speaker: 'lisa', japanese: 'イメージって怖いね。実際は実家の2階で猫と母に挟まれて寝てる。', mood: 'normal' },
            { speaker: 'master', japanese: '家は生活の匂いがする場所だ。完璧な家なんて存在しない。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'うちは今、トイレの匂いがしてます。', mood: 'defeated' },
            { speaker: 'lisa', japanese: '早く直しなって!', mood: 'angry' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 39: テクノロジー (Tech & Apps)
    // ChatGPTやAIとの距離感、全員バラバラ
    // ────────────────────────────────────────────────────
    {
        daySlot: 39,
        title: 'ChatGPTで翻訳しちゃダメですか',
        titleEn: 'Can\'t I Just Use ChatGPT?',
        scene: '居酒屋。ユキが「英語勉強する意味あるの？AIで全部できるよね？」と本音をこぼす。',
        story: [
            { speaker: 'narrator', japanese: '木曜の夜。ユキが3杯目のビールに手を伸ばしながら静かに言った。' },
            { speaker: 'yuki', japanese: '...最近思うんですけど。ChatGPTに翻訳させればよくない？私たちが英語勉強する意味って何ですか。', mood: 'thinking' },
            { speaker: 'takeshi', japanese: 'ユキちゃん酔ってる？それ言っちゃダメなやつ！', mood: 'excited' },
            { speaker: 'lisa', japanese: '...真面目な質問だね。私もたまに思う。', mood: 'thinking' },
            { speaker: 'kenji', japanese: '俺は思わない。AIに頼ったら娘と話せん。', mood: 'normal' },
            { speaker: 'mina', japanese: '私もAI使います。メールとか。It saves me so much time.', english: 'It saves me so much time.', mood: 'normal' },
            { speaker: 'lisa', japanese: '私の意見ね。AIは便利。でも、リアルタイムの会話では使えない。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'スマホに通訳アプリ入れとけば！', mood: 'excited' },
            { speaker: 'lisa', japanese: 'タケシ、外国人とデートしてアプリ通すか？相手が冗談言った時にスマホ取り出すか？', mood: 'normal' },
            { speaker: 'takeshi', japanese: '...あ。それは、ちょっと、嫌だ。', mood: 'defeated' },
            { speaker: 'yuki', japanese: '...確かに。', mood: 'thinking' },
            { speaker: 'master', japanese: 'ユキ、聞け。', mood: 'normal', action: 'カウンターに肘をつく' },
            { speaker: 'yuki', japanese: 'はい。', mood: 'normal' },
            { speaker: 'master', japanese: '翻訳できる英語と、自分の体から出る英語は別物だ。AIは代わりに考えられても、お前の代わりに笑ったり泣いたりはできない。', english: 'AI can translate, but it cannot laugh or cry for you.', mood: 'normal' },
            { speaker: 'yuki', japanese: '...マスター、そういうの本当にずるい。', mood: 'thinking' },
            { speaker: 'mina', japanese: 'AIは下書きには使うけど、最終的に話すのは自分ですもんね。', mood: 'normal' },
            { speaker: 'kenji', japanese: '...俺、ChatGPTで娘へのLINE書いたことある。でも送信前に消して、自分の言葉で書き直した。AIの英語は俺じゃない。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'ケンジさんかっこいい...!', mood: 'excited' },
            { speaker: 'takeshi', japanese: 'よし！俺はAIに頼らない！...あ、でもメールはAI使う！それは譲れない！', mood: 'excited' },
            { speaker: 'master', japanese: '...道具は道具だ。使うのは人間だ。それを忘れるな。', english: 'Tools are tools. The user is human.', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 40: 意見を言う (Sharing Opinions)
    // 会議で意見を言えない問題。リサが秘密兵器を教える
    // ────────────────────────────────────────────────────
    {
        daySlot: 40,
        title: '会議で黙る病',
        titleEn: 'The Meeting Silence Disease',
        scene: '居酒屋。ミナが「英語会議で一度も発言できなかった」と落ち込んでいる。',
        story: [
            { speaker: 'narrator', japanese: '金曜の夜。ミナが珍しく早めに来て、カウンターに突っ伏している。' },
            { speaker: 'mina', japanese: '...今日、英語会議で一言も喋れなかった。1時間半。', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'あー、それね。あるある。みんな何回もやってる。', mood: 'normal' },
            { speaker: 'mina', japanese: '聞き取れてはいたんです。意見もあった。でも言うタイミングがわからなくて。', mood: 'defeated' },
            { speaker: 'yuki', japanese: 'わかる...日本語の会議でも難しいのに英語だと無理。', mood: 'defeated' },
            { speaker: 'takeshi', japanese: '俺は会議で喋りすぎて怒られる。Maybe I am the opposite problem.', english: 'Maybe I am the opposite problem.', mood: 'excited' },
            { speaker: 'lisa', japanese: 'ミナ、聞いて。秘密兵器がある。', mood: 'smug' },
            { speaker: 'mina', japanese: '...教えてください。', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'Can I add something? この一言を覚えて。割り込みの呪文。', english: 'Can I add something?', mood: 'normal' },
            { speaker: 'yuki', japanese: 'Can I add something? シンプル...', mood: 'thinking' },
            { speaker: 'lisa', japanese: '相手が話してる途中でも使える。失礼にならない。これ言ってから意見言うと、相手はちゃんと聞く体勢になる。', mood: 'normal' },
            { speaker: 'kenji', japanese: '俺は I just want to say one thing. を使ってる。', english: 'I just want to say one thing.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'ケンジさんそれもいい！「ちょっと一言だけ」って意味。', mood: 'normal' },
            { speaker: 'master', japanese: '...意見は持ってるか持ってないかじゃない。出すか出さないかだ。', english: 'Opinions are not about having them. They are about voicing them.', mood: 'normal' },
            { speaker: 'mina', japanese: '...持ってはいるんですけど、出すのが怖い。What if I am wrong?', english: 'What if I am wrong?', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'I think... って前置きすればいい。「私はこう思う」って言えば、間違いじゃなくて意見になる。', english: 'I think...', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'I think Japan should have more pizza variety! ...どう？意見！', english: 'I think Japan should have more pizza variety!', mood: 'excited' },
            { speaker: 'mina', japanese: '...タケシさんの意見は、いつも意見じゃなくて主張です。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'ミナちゃん、最近言うようになったよね。前なら絶対言わなかった。', mood: 'excited' },
            { speaker: 'mina', japanese: '...あ。本当だ。', mood: 'thinking', action: '自分でも驚いている' },
            { speaker: 'master', japanese: '...意見は筋肉と同じだ。使わないと萎える。今夜お前は1個使った。明日は2個だ。', mood: 'normal' },
        ],
    },

];
