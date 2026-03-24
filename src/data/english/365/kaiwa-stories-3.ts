/**
 * 365 English Master -- Kaiwa Stories: Days 21-30
 *
 * Short izakaya scenes where characters naturally use the day's expressions.
 * Month 1 finale arc: from gossip nights to emotional goodbyes.
 */

import type { KaiwaStory } from './kaiwa-stories';

export const KAIWA_STORIES_3: KaiwaStory[] = [

    // ────────────────────────────────────────────────────
    // DAY 21: 噂話・ドラマ (Gossip & Drama)
    // ────────────────────────────────────────────────────
    {
        daySlot: 21,
        title: '金曜のゴシップナイト',
        titleEn: 'Friday Gossip Night',
        scene: '金曜の夜。居酒屋のカウンターで、タケシが爆弾ニュースを持ってくる。',
        story: [
            { speaker: 'narrator', japanese: '金曜日の夜9時。権藤の居酒屋はいつもより賑やかだった。', action: 'タケシがドアを勢いよく開ける' },
            { speaker: 'takeshi', japanese: '聞いた!? 聞いた!? みんな聞いた!?', mood: 'excited' },
            { speaker: 'yuki', japanese: '何、どうしたの。そんな息切らして。', mood: 'thinking' },
            { speaker: 'takeshi', japanese: 'うちの会社の山田課長、来月からニューヨーク転勤だって！', mood: 'excited' },
            { speaker: 'lisa', japanese: 'マジで？ あの英語全然喋れない山田さんが？', english: 'Are you serious? That Yamada who cannot speak English at all?', mood: 'excited' },
            { speaker: 'takeshi', japanese: '信じられないでしょ！ 俺も最初ウソかと思った。', mood: 'excited' },
            { speaker: 'kenji', japanese: '...人の噂もなんとやらだ。そっとしておけ。', mood: 'thinking' },
            { speaker: 'mina', japanese: 'でも...ちょっと気になる。ここだけの話、山田さんって英語どのくらいなんですか？', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'TOEIC 350。マジで。俺より低い。', mood: 'smug' },
            { speaker: 'lisa', japanese: '...それでニューヨーク？ 誰にも言わないでねって前提で言うけど、大丈夫なの？', mood: 'thinking' },
            { speaker: 'master', japanese: '...', action: 'グラスを磨きながら黙って聞いている' },
            { speaker: 'yuki', japanese: '私だったら怖くて無理。英語できないのに海外とか...', mood: 'defeated' },
            { speaker: 'master', japanese: 'ユキ。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'はい？', mood: 'normal' },
            { speaker: 'master', japanese: '山田さんは怖くても行くんだろう。怖いから行かない人と、怖くても行く人。どっちが1年後に英語喋れてると思う？', mood: 'normal' },
            { speaker: 'narrator', japanese: '居酒屋が一瞬静まった。噂話のつもりが、全員の胸に刺さっていた。' },
            { speaker: 'takeshi', japanese: '...マスター、今の名言すぎて酔いが覚めた。', mood: 'defeated' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 22: 褒める (Giving Compliments)
    // ────────────────────────────────────────────────────
    {
        daySlot: 22,
        title: '褒め方を知らない大人たち',
        titleEn: 'Adults Who Cannot Compliment',
        scene: 'リサが「英語で褒める」ミニ授業を開催。日本人の褒め下手が炸裂する。',
        story: [
            { speaker: 'lisa', japanese: '今日のテーマは「褒める」。英語で誰かを褒めてみて。', english: 'Today we are practicing compliments. Try giving one in English.', mood: 'normal' },
            { speaker: 'kenji', japanese: '...You are...not bad.', english: 'You are... not bad.', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'ケンジさん、それ褒めてないです。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'OK! Lisa! You are...えーと...very...nice face!', english: 'You are very nice face!', mood: 'excited' },
            { speaker: 'lisa', japanese: '...ありがとう？ でも英語として壊れてる。', mood: 'thinking' },
            { speaker: 'narrator', japanese: 'リサがホワイトボードに「That looks great on you!」と書く。' },
            { speaker: 'lisa', japanese: 'いい？ 英語の褒め方はストレートでいいの。似合ってるよ、それいいね、センスいいね。素直に言うだけ。', mood: 'normal' },
            { speaker: 'mina', japanese: 'あ、ユキさん、その髪型いいですね。えっと...I love your hair!', english: 'I love your hair!', mood: 'normal' },
            { speaker: 'yuki', japanese: 'えっ...いやいや、全然...ただ切っただけで...', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'ユキ！ 今のが問題！ 英語で褒められたらThank you! の一言でいいの。謙遜は英語だと褒めた人を否定してることになる。', mood: 'normal' },
            { speaker: 'yuki', japanese: '...Thank you! ...こう？', mood: 'thinking' },
            { speaker: 'master', japanese: 'リサ。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'はい？', mood: 'normal' },
            { speaker: 'master', japanese: 'You have really improved as a teacher. I can tell you have been putting in the work.', english: 'You have really improved as a teacher. I can tell you have been putting in the work.', mood: 'normal' },
            { speaker: 'lisa', japanese: '...マスター、ずるい。今の完璧じゃないですか。', mood: 'excited' },
            { speaker: 'takeshi', japanese: 'さすがマスター。...って、さすがって英語で何て言うの？', mood: 'thinking' },
            { speaker: 'master', japanese: 'That is so you. ...自分で調べなさい。', mood: 'smug' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 23: 予約する (Making Reservations)
    // ────────────────────────────────────────────────────
    {
        daySlot: 23,
        title: '電話の向こうのアメリカ',
        titleEn: 'America on the Other End of the Line',
        scene: 'ケンジが海外出張のため英語でレストラン予約の練習。権藤が電話相手役。',
        story: [
            { speaker: 'narrator', japanese: 'ケンジの海外出張が来週に迫っていた。居酒屋で「電話予約」の特訓が始まる。' },
            { speaker: 'master', japanese: 'じゃあ私がレストランのスタッフ役をやる。ケンジ、電話して。', action: 'カウンターの端に移動して背を向ける' },
            { speaker: 'kenji', japanese: '...Hello. I want...えっと...予約...reservation...', english: 'Hello. I want... reservation...', mood: 'defeated' },
            { speaker: 'master', japanese: 'Good evening, how can I help you?', english: 'Good evening, how can I help you?', mood: 'normal' },
            { speaker: 'kenji', japanese: '...I would like to make a reservation, please. 2名で...for two.', english: 'I would like to make a reservation, please. For two.', mood: 'thinking' },
            { speaker: 'master', japanese: 'Certainly. What day and time?', english: 'Certainly. What day and time?', mood: 'normal' },
            { speaker: 'kenji', japanese: 'Saturday. Around seven, if possible.', english: 'Saturday. Around seven, if possible.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'おお！ ケンジさんスムーズ！', mood: 'excited' },
            { speaker: 'kenji', japanese: 'うるさい、集中させろ。', mood: 'angry' },
            { speaker: 'master', japanese: 'Would you prefer indoor or outdoor seating?', english: 'Would you prefer indoor or outdoor seating?', mood: 'normal' },
            { speaker: 'kenji', japanese: '...Any chance we could get a table by the window?', english: 'Any chance we could get a table by the window?', mood: 'thinking' },
            { speaker: 'mina', japanese: 'ケンジさん、今のかっこよかった...！', mood: 'excited' },
            { speaker: 'master', japanese: 'May I have a name for the reservation?', english: 'May I have a name for the reservation?', mood: 'normal' },
            { speaker: 'kenji', japanese: 'Under Kenji. ...It is actually someone\'s birthday.', english: 'Under Kenji. It is actually someone\'s birthday.', mood: 'normal' },
            { speaker: 'master', japanese: 'Perfect.', action: '振り返って普通の顔に戻る', mood: 'normal' },
            { speaker: 'master', japanese: '合格。本番もそのままやれ。', mood: 'normal' },
            { speaker: 'kenji', japanese: '...手、めっちゃ震えてるんだけど。', mood: 'defeated' },
            { speaker: 'yuki', japanese: '私も来週までに予約の練習しなきゃ...', mood: 'thinking' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 24: お土産を選ぶ (Souvenir Shopping)
    // ────────────────────────────────────────────────────
    {
        daySlot: 24,
        title: 'お土産選びの文化衝突',
        titleEn: 'The Souvenir Culture Clash',
        scene: 'ミナが外国人の友達へのお土産を居酒屋で相談。何を買えばいいかみんなで議論。',
        story: [
            { speaker: 'mina', japanese: 'アメリカの友達にお土産買いたいんですけど、何がいいですかね...', mood: 'thinking' },
            { speaker: 'takeshi', japanese: '富士山のキーホルダーでしょ！ THE 日本！', mood: 'excited' },
            { speaker: 'lisa', japanese: 'それ、引き出しに入れて一生出てこないやつ。', mood: 'normal' },
            { speaker: 'mina', japanese: '日本っぽいものがいいんです。Something that screams Japan...って言えばいいんですよね？', english: 'Something that screams Japan.', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'Perfect. で、予算は？', mood: 'normal' },
            { speaker: 'mina', japanese: '一人3000円くらい...えっと、around thirty bucks each?', english: 'Around thirty bucks each?', mood: 'normal' },
            { speaker: 'kenji', japanese: 'おかし系は？ 賞味期限いつまでとか確認して...', mood: 'thinking' },
            { speaker: 'mina', japanese: 'あ、How long does this keep? って聞けばいいんですよね。でも20人に配りたくて...', english: 'How long does this keep?', mood: 'normal' },
            { speaker: 'lisa', japanese: 'ちょっと待って。20人？ お土産を20人に配る？', mood: 'excited' },
            { speaker: 'mina', japanese: '職場のみんなに...普通じゃないですか？', mood: 'normal' },
            { speaker: 'lisa', japanese: 'ミナ、英語圏でそれやると「なんでこの人全員に買ってきたの？」って逆に驚かれるよ。', mood: 'normal' },
            { speaker: 'mina', japanese: 'えっ...!?', mood: 'excited' },
            { speaker: 'master', japanese: '日本の「配る文化」は世界的に特殊だよ。親しい人に1つ2つで十分。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'えっ、俺も海外出張で20人分買ってたんだけど...あれ変だったの？', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'かなり。', mood: 'smug' },
            { speaker: 'narrator', japanese: 'ミナは結局、親しい友達3人だけにお茶と和菓子を選ぶことにした。20人分より心がこもった。' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 25: 空港で (At the Airport)
    // ────────────────────────────────────────────────────
    {
        daySlot: 25,
        title: 'ユキの初フライト',
        titleEn: 'Yuki\'s First Flight',
        scene: 'ユキの初海外出発前夜。居酒屋で空港英語の最終チェック。みんなからのアドバイスが止まらない。',
        story: [
            { speaker: 'narrator', japanese: 'ユキの初海外出発は明日。居酒屋で最終レクチャーが開かれている。' },
            { speaker: 'yuki', japanese: '搭乗口ってgateでいいんですよね...？ あとconnecting flightは乗り継ぎで...', english: 'Where is gate twelve? I have a connecting flight.', mood: 'thinking' },
            { speaker: 'takeshi', japanese: 'ユキ、一番大事なこと教えてやる。機内で毛布もらう方法。', mood: 'excited' },
            { speaker: 'yuki', japanese: 'Could I get a blanket, please...?', english: 'Could I get a blanket, please?', mood: 'thinking' },
            { speaker: 'takeshi', japanese: 'そう！ あと「It is freezing in here」って大げさに言うと早く持ってきてくれる。', mood: 'smug' },
            { speaker: 'lisa', japanese: '入国審査は短く答えてね。Sightseeing. That is it. 余計なこと言わない。', mood: 'normal' },
            { speaker: 'kenji', japanese: '荷物が出てこなかったらどうする？ My luggage did not come out...って言えばいいのか？', english: 'My bag is missing.', mood: 'thinking' },
            { speaker: 'master', japanese: 'ケンジ、それは自分が聞かれるかもしれないということか？', mood: 'normal' },
            { speaker: 'kenji', japanese: '来月の出張が怖くて...', mood: 'defeated' },
            { speaker: 'mina', japanese: 'ユキさん、席が嫌だったらIs it possible to switch seats? って聞けますよ。', english: 'Would it be possible to move to a different seat?', mood: 'normal' },
            { speaker: 'yuki', japanese: 'みんな...ありがとう。でも情報量が多すぎて頭がパンクしそう...', mood: 'defeated' },
            { speaker: 'master', japanese: 'ユキ。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'はい。', mood: 'normal' },
            { speaker: 'master', japanese: '覚えるのは3つでいい。Excuse me. Could you help me? Thank you. この3つで空港は生き残れる。', mood: 'normal' },
            { speaker: 'yuki', japanese: '...マスター、なんか泣きそう。', mood: 'defeated' },
            { speaker: 'takeshi', japanese: '泣くのは飛行機の中にしろ！ 隣の人に心配されて会話が始まるから！', mood: 'excited' },
            { speaker: 'narrator', japanese: '翌朝、ユキは権藤からのLINEで目が覚めた。「You will be fine. 行ってこい。」' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 26: 思い出を語る (Sharing Memories)
    // ────────────────────────────────────────────────────
    {
        daySlot: 26,
        title: 'マスターのニューヨーク',
        titleEn: 'Master\'s New York',
        scene: '思い出を語る夜。権藤が珍しくニューヨーク時代の話をする。',
        story: [
            { speaker: 'narrator', japanese: '日曜の夜。常連だけの静かな居酒屋。なぜか思い出話が始まった。' },
            { speaker: 'takeshi', japanese: 'マスターってさ、ニューヨークにいたんでしょ？ あの時は楽しかった？', mood: 'normal' },
            { speaker: 'master', japanese: '...楽しかった、とは少し違うな。忘れられない、のほうが近い。', mood: 'thinking' },
            { speaker: 'mina', japanese: '初めてニューヨークに行った時のこと覚えてますか？', mood: 'normal' },
            { speaker: 'master', japanese: '1995年。26歳。英語は教科書でしか勉強したことなかった。バーテンダーの仕事が決まって、成田から飛んだ。', mood: 'normal' },
            { speaker: 'yuki', japanese: '26歳で...英語できないのにニューヨーク？', mood: 'excited' },
            { speaker: 'master', japanese: '最初の1ヶ月は地獄だった。客の注文が聞き取れない。同僚のジョークがわからない。懐かしいな...That takes me back.', english: 'That takes me back.', mood: 'thinking' },
            { speaker: 'kenji', japanese: 'あれからもう30年か。Time flies...ってやつだな。', english: 'Time flies.', mood: 'thinking' },
            { speaker: 'master', japanese: 'あの頃に戻りたいとは思わない。でも、あの頃の自分がいなかったら、今の自分はいない。', mood: 'normal' },
            { speaker: 'lisa', japanese: '一番嬉しかったことは？', mood: 'normal' },
            { speaker: 'master', japanese: '...客に初めて「Your English is great」と言われた日。1年かかった。帰り道に泣いた。', mood: 'normal' },
            { speaker: 'narrator', japanese: '居酒屋が静まった。権藤マスターが過去を語ることは、めったにない。' },
            { speaker: 'yuki', japanese: '...マスターでも1年かかったんだ。', mood: 'thinking' },
            { speaker: 'master', japanese: '1年は早いほうだ。その代わり毎日16時間英語漬けだった。覚えてる？ なんて聞くまでもない。体が覚えてる。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '...俺もいつか、そういう思い出作りたいな。Those were the days、って言えるような。', english: 'Those were the days.', mood: 'thinking' },
            { speaker: 'master', japanese: '今がその「あの頃」だ。気づくのは、いつも後からだけどな。', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 27: 約束する (Making & Keeping Plans)
    // ────────────────────────────────────────────────────
    {
        daySlot: 27,
        title: '6人の旅行計画',
        titleEn: 'Six People, One Trip',
        scene: 'みんなで温泉旅行を計画。約束の仕方がバラバラで全くまとまらない。',
        story: [
            { speaker: 'takeshi', japanese: 'みんなで温泉行かない!? いつがいい？ When works for everyone?', english: 'When works for everyone?', mood: 'excited' },
            { speaker: 'lisa', japanese: '来月の第2週末なら空いてる。Saturday works for me.', english: 'Saturday works for me.', mood: 'normal' },
            { speaker: 'yuki', japanese: '予定確認するね...Let me check my schedule...', english: 'Let me check my schedule.', mood: 'thinking' },
            { speaker: 'kenji', japanese: '何時に集合？ 場所は？ 俺は具体的じゃないと動けない。', mood: 'normal' },
            { speaker: 'mina', japanese: 'リマインドしてくださいね...Send me a reminder. 絶対忘れるので...', english: 'Send me a reminder.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'OK! じゃあ4月12日の土曜、朝10時、新宿集合！', mood: 'excited' },
            { speaker: 'lisa', japanese: '...ちょっと待って。予定変更していい？ Something came up for that weekend...', english: 'Something came up.', mood: 'thinking' },
            { speaker: 'takeshi', japanese: '出た！ リサのドタキャン！ You better not bail on me!', english: 'You better not bail on me!', mood: 'angry' },
            { speaker: 'lisa', japanese: 'まだキャンセルしてない！ 日程ずらせないかなって言ってるだけ！', mood: 'angry' },
            { speaker: 'kenji', japanese: '約束したじゃん。You gave us your word, Lisa.', english: 'You gave us your word.', mood: 'normal' },
            { speaker: 'lisa', japanese: '...すみません。確認して金曜までに連絡する。', mood: 'defeated' },
            { speaker: 'master', japanese: '...私は店があるから行けないが、温泉土産は期待している。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'マスターも来てよ！ 一日くらい休めるでしょ！', mood: 'excited' },
            { speaker: 'master', japanese: 'この店は365日営業だ。', mood: 'normal' },
            { speaker: 'mina', japanese: 'でもみんなで行けたら...I cannot wait! 楽しみ！', english: 'I cannot wait!', mood: 'excited' },
            { speaker: 'narrator', japanese: '結局、日程が決まったのはこの3週間後だった。6人の予定を合わせるのは、英語より難しい。' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 28: 夢を語る (Talking About Dreams)
    // ────────────────────────────────────────────────────
    {
        daySlot: 28,
        title: '酔った夜の本音',
        titleEn: 'Drunk Confessions',
        scene: '居酒屋で「将来何したい？」。酔った勢いで全員の本音が出る。',
        story: [
            { speaker: 'narrator', japanese: '夜11時。全員ほろ酔い。タケシが突然聞く。' },
            { speaker: 'takeshi', japanese: 'なあ、みんな夢ある？ 子供の頃の夢じゃなくて、今の夢。', mood: 'thinking' },
            { speaker: 'yuki', japanese: 'いつか海外で仕事したい。...It has always been a dream of mine.', english: 'It has always been a dream of mine.', mood: 'normal' },
            { speaker: 'takeshi', japanese: '俺は起業。現実的じゃないけど。I know it sounds crazy, but...', english: 'I know it sounds crazy, but...', mood: 'drunk' },
            { speaker: 'lisa', japanese: '全然crazy じゃないよ。で、何の会社？', mood: 'normal' },
            { speaker: 'takeshi', japanese: '......まだ決めてない。', mood: 'defeated' },
            { speaker: 'kenji', japanese: '俺はな...まだ間に合うかな。Is it too late for me?', english: 'Is it too late for me?', mood: 'thinking' },
            { speaker: 'mina', japanese: '何がですか？', mood: 'normal' },
            { speaker: 'kenji', japanese: '...娘と英語で話すこと。中学から留学してて、帰ってくるたびに英語が増える。俺だけ取り残されてる。', mood: 'defeated' },
            { speaker: 'narrator', japanese: '居酒屋が静かになった。ケンジが英語を勉強している本当の理由を、誰も知らなかった。' },
            { speaker: 'mina', japanese: '...私は歌手になりたかった。今でもたまに思う。What if I just went for it?', english: 'What if I just went for it?', mood: 'thinking' },
            { speaker: 'master', japanese: '何歳からでも遅くない。It is never too late. 私がニューヨークに行ったのは26の時だ。', english: 'It is never too late.', mood: 'normal' },
            { speaker: 'yuki', japanese: '一歩踏み出したい。でも怖い...', mood: 'defeated' },
            { speaker: 'master', japanese: '怖いのは正常だ。怖くないなら、それは夢じゃない。ただの予定だ。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '......マスター、もう一杯。やるしかないって気分になってきた。', english: 'What do I have to lose?', mood: 'drunk' },
            { speaker: 'kenji', japanese: '俺も。諦めたくない。I refuse to give up.', english: 'I refuse to give up.', mood: 'normal' },
            { speaker: 'narrator', japanese: 'その夜、誰も早く帰ろうとしなかった。' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 29: お祝い (Celebrating)
    // ────────────────────────────────────────────────────
    {
        daySlot: 29,
        title: 'ケンジの奇跡',
        titleEn: 'Kenji\'s Miracle',
        scene: 'ケンジが海外出張から帰還。英語でプレゼンを成功させた報告に、居酒屋が爆発する。',
        story: [
            { speaker: 'narrator', japanese: '水曜の夜。ケンジが居酒屋のドアを開けた瞬間、全員が立ち上がった。' },
            { speaker: 'takeshi', japanese: 'ケンジさん！ 出張どうだった!?', mood: 'excited' },
            { speaker: 'kenji', japanese: '...プレゼン、英語でやった。全部。', mood: 'normal' },
            { speaker: 'yuki', japanese: '...えっ？', mood: 'excited' },
            { speaker: 'kenji', japanese: '15分。原稿なし。質疑応答も。...拍手もらった。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'Congratulations! You deserve it! 本当に！', english: 'Congratulations! You deserve it!', mood: 'excited' },
            { speaker: 'takeshi', japanese: 'お祝いだ！ This calls for a celebration! First round is on me!', english: 'This calls for a celebration! First round is on me!', mood: 'excited' },
            { speaker: 'master', japanese: '乾杯。Cheers to the hardest working man I know.', english: 'Cheers to the hardest working man I know.', action: 'グラスを掲げる', mood: 'normal' },
            { speaker: 'narrator', japanese: 'グラスがぶつかる音が響く。ケンジの目が赤い。' },
            { speaker: 'mina', japanese: 'ケンジさん、これ。みんなで選んだんです。', action: '小さな紙袋を渡す', mood: 'normal' },
            { speaker: 'kenji', japanese: '...プレゼント？', mood: 'normal' },
            { speaker: 'mina', japanese: 'I saw it and thought of you. ...英語の万年筆です。', english: 'I saw it and thought of you.', mood: 'normal' },
            { speaker: 'kenji', japanese: '...みんなのおかげだ。I could not have done it without you guys. 本当に。', english: 'I could not have done it without you guys.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'ケンジさん...You put in the work and it paid off. 本当によく頑張った。', english: 'You put in the work and it paid off.', mood: 'normal' },
            { speaker: 'kenji', japanese: '泣きそう。いや、泣いてる。45歳のおっさんが泣いてる。', mood: 'defeated' },
            { speaker: 'takeshi', japanese: '泣け泣け！ 最高の夜だ！ Best night ever!', english: 'Best night ever!', mood: 'excited' },
            { speaker: 'lisa', japanese: 'Did you have any idea we were planning this? Your face is priceless!', english: 'Your face is priceless!', mood: 'excited' },
            { speaker: 'kenji', japanese: '全然知らなかった...嬉しすぎる。This means the world to me.', english: 'This means the world to me.', mood: 'defeated' },
            { speaker: 'master', japanese: 'ケンジ。15分のプレゼンのために何時間練習した？', mood: 'normal' },
            { speaker: 'kenji', japanese: '...200時間くらい。', mood: 'normal' },
            { speaker: 'master', japanese: '才能じゃない。努力だ。それが一番かっこいい。', mood: 'normal' },
            { speaker: 'narrator', japanese: 'その夜、居酒屋は午前2時まで開いていた。権藤マスターは一度も「閉店」と言わなかった。' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 30: さよなら、またね (Goodbyes & See You Again)
    // Month 1 FINALE
    // ────────────────────────────────────────────────────
    {
        daySlot: 30,
        title: 'また来月',
        titleEn: 'See You Next Month',
        scene: 'Month 1最終日。居酒屋を出る夜。30日前とは全員少しだけ変わっている。',
        story: [
            { speaker: 'narrator', japanese: '4月30日。月末の水曜日。6人全員が権藤の居酒屋にいた。最初の1ヶ月が、今夜で終わる。' },
            { speaker: 'takeshi', japanese: '1ヶ月か。...早かったな。', mood: 'thinking' },
            { speaker: 'yuki', japanese: '初めてここに来た日、自己紹介すらできなかった。My name is...で止まった。', mood: 'thinking' },
            { speaker: 'lisa', japanese: '今は？', mood: 'normal' },
            { speaker: 'yuki', japanese: '...まだ下手。でも、止まらなくなった。下手でも喋り続けられるようになった。', mood: 'normal' },
            { speaker: 'kenji', japanese: '俺は娘にLINEした。英語で。「I am proud of you.」って。', mood: 'normal' },
            { speaker: 'mina', japanese: 'ケンジさん...! 返事は？', mood: 'excited' },
            { speaker: 'kenji', japanese: '「Dad, your English is getting better!」...だって。You have come a long way って言われた。娘に。', english: 'You have come a long way.', mood: 'normal' },
            { speaker: 'narrator', japanese: 'ケンジが鼻をすする。タケシが肩を叩く。' },
            { speaker: 'takeshi', japanese: '俺なんか、先週外国人に道聞かれて、初めて逃げなかったからな！ No problem! って言えた！', english: 'No problem!', mood: 'excited' },
            { speaker: 'lisa', japanese: '...私もこの1ヶ月で変わった。教えることで自分の英語を見直せた。You guys taught me more than I taught you.', english: 'You guys taught me more than I taught you.', mood: 'thinking' },
            { speaker: 'mina', japanese: '私は...全部聞き取れるけど返せなかった。でも最近、返せるようになってきた。少しだけ。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'そろそろ帰るね...I should probably get going.', english: 'I should probably get going.', mood: 'normal' },
            { speaker: 'takeshi', japanese: '寂しくなるな。I am going to miss this.', english: 'I am going to miss this.', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'Do not be a stranger, OK? We are staying in touch.', english: 'Do not be a stranger. We are staying in touch.', mood: 'normal' },
            { speaker: 'mina', japanese: '忘れないでね、みんな。Promise you will not forget.', english: 'Promise you will not forget.', mood: 'normal' },
            { speaker: 'kenji', japanese: 'また来月な。Same time, same place. I am putting it in my calendar.', english: 'Same time, same place.', mood: 'normal' },
            { speaker: 'yuki', japanese: '今日はありがとう。I really needed this tonight. ...最高の1ヶ月だった。', english: 'I really needed this tonight.', mood: 'normal' },
            { speaker: 'narrator', japanese: '全員が立ち上がり、コートを着る。権藤だけがカウンターの中にいる。' },
            { speaker: 'yuki', japanese: 'マスター。次はもっと話せるようになります。Give me one more month. Watch me.', english: 'Give me one more month. Watch me.', mood: 'normal' },
            { speaker: 'master', japanese: '...', action: 'グラスを磨く手を止める', mood: 'normal' },
            { speaker: 'master', japanese: 'This is just the beginning.', english: 'This is just the beginning.', mood: 'normal' },
            { speaker: 'narrator', japanese: '権藤が英語で言った。珍しく、笑っていた。' },
            { speaker: 'master', japanese: '30日前、ここに来た自分を思い出せ。あの自分に、今の自分を見せてやれ。...Take care of yourselves. 来月も待ってる。', english: 'Take care of yourselves.', mood: 'normal' },
            { speaker: 'narrator', japanese: '下北沢の夜風が冷たかった。でも誰も急いで帰ろうとしなかった。1ヶ月前は他人だった6人が、居酒屋の前で「See you」と言い合っていた。' },
            { speaker: 'narrator', japanese: '英語は、まだ全然うまくない。でも、もう怖くない。それが30日間の成果だった。' },
            { speaker: 'narrator', japanese: '-- Month 1: Complete. Month 2 starts tomorrow. --' },
        ],
    },
];
