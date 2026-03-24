/**
 * 365 English Master -- Kaiwa Stories: Days 11-20
 * Short izakaya scenes where characters naturally use the day's expressions.
 *
 * Day 11: ホテルで (At a Hotel)
 * Day 12: 体調の話 (Talking About How You Feel)
 * Day 13: 道を教える (Giving Directions)
 * Day 14: 食べ物の話 (Talking About Food)
 * Day 15: 謝る・許す (Apologizing & Forgiving)
 * Day 16: レストランでクレーム (Restaurant Complaints)
 * Day 17: 返品・交換 (Returns & Exchanges)
 * Day 18: 緊急事態 (Emergencies)
 * Day 19: 励ます・慰める (Encouraging & Comforting)
 * Day 20: 手伝いを申し出る (Offering Help)
 */

import type { KaiwaStory } from './kaiwa-stories';

export const KAIWA_STORIES_2: KaiwaStory[] = [

    // ============================================================
    // DAY 11: ホテルで (At a Hotel)
    // ============================================================
    {
        daySlot: 11,
        title: '初めてのチェックイン',
        titleEn: 'First Check-In',
        scene: 'ロサンゼルスのビジネスホテル。ユキが初めての海外出張でフロントに立つ。電話の向こうでリサがリアルタイム指導。',
        story: [
            { speaker: '', japanese: 'LAのホテル、午後3時。ユキがスーツケースを引きずりながらフロントに近づく。', action: 'ユキ、スマホを耳に当てたまま深呼吸' },
            { speaker: 'yuki', japanese: '...リサ、フロントの人が見てる。どうしよう。', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'まず "Hi, I am here to check in" でいいから。笑顔忘れないでね。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'Hi... I am here to check in.', mood: 'normal' },
            { speaker: '', japanese: 'フロント係がにっこり笑う。', action: 'フロント係 "Of course! Name?"' },
            { speaker: 'yuki', japanese: 'I... I booked a room online. Under Tanaka.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'いいじゃん！完璧。次、Wi-Fiのパスワード聞いといて。仕事で使うでしょ。', mood: 'excited' },
            { speaker: 'yuki', japanese: 'Um... can I get the Wi-Fi password?', mood: 'normal' },
            { speaker: '', japanese: 'フロント係がカードを渡してくれる。ユキ、小さくガッツポーズ。' },
            { speaker: 'yuki', japanese: '通じた...！あと、What time is breakfast?', mood: 'excited' },
            { speaker: '', japanese: 'フロント係 "Six to ten, ma\'am." と答える。' },
            { speaker: 'yuki', japanese: 'リサ、朝食6時から10時だって！あ、あと一個聞きたい。', mood: 'excited' },
            { speaker: 'lisa', japanese: 'どうぞどうぞ。', mood: 'smug' },
            { speaker: 'yuki', japanese: 'Excuse me, is there a convenience store nearby?', mood: 'normal' },
            { speaker: '', japanese: 'フロント係が丁寧に道を教えてくれる。ユキ、全部聞き取れてないけど頷く。' },
            { speaker: 'yuki', japanese: '...半分わかんなかったけど、3つ質問できた。3つだよ、リサ！', mood: 'excited' },
            { speaker: 'lisa', japanese: 'ね？死なないでしょ、英語。', mood: 'smug' },
            { speaker: 'yuki', japanese: '...部屋のエアコン、効かなかったらまた電話する。', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'その時は "The AC is not working" ね。...まあ大丈夫でしょ。多分。', mood: 'normal' },
        ],
    },

    // ============================================================
    // DAY 12: 体調の話 (Talking About How You Feel)
    // ============================================================
    {
        daySlot: 12,
        title: '全員しんどい夜',
        titleEn: 'Everyone Is Dying Tonight',
        scene: '金曜の夜、権藤の居酒屋。全員が疲れ果てた顔で集まる。誰が一番しんどいか選手権が自然発生。',
        story: [
            { speaker: '', japanese: '金曜21時。全員がカウンターに突っ伏している。', action: '権藤がお通しを並べる' },
            { speaker: 'takeshi', japanese: 'I am so hungover. 昨日クライアントと飲みすぎた。', mood: 'defeated' },
            { speaker: 'lisa', japanese: '金曜の夜にhungoverって、昨日何時まで飲んだの。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '...覚えてない。That is the problem.', mood: 'defeated' },
            { speaker: 'kenji', japanese: '俺は肩こりがひどくて。My shoulders are killing me. 現場で重いもの運んだ。', mood: 'defeated' },
            { speaker: 'yuki', japanese: '私は寝不足です。I am running on no sleep. 資料作りで朝4時まで...', mood: 'defeated' },
            { speaker: 'mina', japanese: '私は花粉症が...My hay fever is killing me. 目がかゆい。', mood: 'defeated' },
            { speaker: 'master', japanese: '...全員 "killing me" 使ってるな。いい傾向だ。', mood: 'smug', action: 'グラスを拭きながら' },
            { speaker: 'takeshi', japanese: 'マスター、これ授業じゃないから！みんな本当にdyingだから！', mood: 'angry' },
            { speaker: 'kenji', japanese: '最近太った気がする。健康診断ヤバかった。I have put on some weight.', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'ケンジさん、それ英語で言えるの地味にすごいよ。', mood: 'normal' },
            { speaker: 'kenji', japanese: '言いたくなかったけどな。', mood: 'defeated' },
            { speaker: 'yuki', japanese: '...あと、I am so stressed out. 来月のプレゼン英語でやれって言われた。', mood: 'defeated' },
            { speaker: 'takeshi', japanese: 'えっ、ユキちゃんプレゼン英語!? ...俺もう限界。I cannot take anymore.', mood: 'defeated' },
            { speaker: 'master', japanese: '全員、顔上げろ。', mood: 'normal', action: 'カウンターをトンと叩く' },
            { speaker: 'master', japanese: '今夜は「しんどい」を英語で10個言えた。立派な勉強だ。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '...勉強のつもりなかったのに。', mood: 'thinking' },
            { speaker: 'mina', japanese: '...でもちょっと楽になったかも。', mood: 'normal' },
        ],
    },

    // ============================================================
    // DAY 13: 道を教える (Giving Directions)
    // ============================================================
    {
        daySlot: 13,
        title: 'タケシ、リベンジ案内',
        titleEn: 'Takeshi\'s Revenge Guide',
        scene: '下北沢の駅前。前回外国人に道を聞かれて撃沈したタケシが、今度こそちゃんと案内しようとする。ユキとミナが偶然目撃。',
        story: [
            { speaker: '', japanese: '土曜の午後、下北沢駅前。タケシが外国人カップルに話しかけられる。', action: 'タケシ、今回は逃げない' },
            { speaker: 'takeshi', japanese: '...OK。今度は大丈夫。Just go straight ahead.', mood: 'excited' },
            { speaker: '', japanese: '外国人が "The ramen place?" と聞く。' },
            { speaker: 'takeshi', japanese: 'Yes yes! ええと... at the second traffic light, turn right.', mood: 'excited' },
            { speaker: '', japanese: '物陰からユキとミナが見ている。' },
            { speaker: 'yuki', japanese: '...タケシさん、道案内してる。', mood: 'excited', action: 'スマホで撮影しようとする' },
            { speaker: 'mina', japanese: 'すごい。ちゃんと英語で言えてる。', mood: 'excited' },
            { speaker: 'takeshi', japanese: 'It is about a five-minute walk. えーと、It is along this street.', mood: 'normal' },
            { speaker: '', japanese: '外国人カップルが地図を見せる。反対方向を指している。' },
            { speaker: 'takeshi', japanese: 'No no, it is on the opposite side. You went too far! ...あ、You passed it.', mood: 'excited' },
            { speaker: '', japanese: '外国人が困った顔をする。' },
            { speaker: 'takeshi', japanese: '...OK, here. Let me show you on the map.', mood: 'normal', action: 'スマホのGoogle Mapを見せる' },
            { speaker: '', japanese: '外国人カップルが笑顔になる。' },
            { speaker: 'takeshi', japanese: 'Actually... want me to walk you there? It is close.', mood: 'excited' },
            { speaker: '', japanese: 'タケシが外国人を連れて歩き出す。ユキとミナ、拍手。' },
            { speaker: 'yuki', japanese: '...前は "go, go, that way!" しか言えなかったのに。', mood: 'excited' },
            { speaker: 'mina', japanese: '権藤マスターに報告しなきゃ。', mood: 'excited' },
            { speaker: '', japanese: 'その夜の居酒屋で、タケシは5回この話をした。', action: '全員が「もう聞いた」の顔' },
        ],
    },

    // ============================================================
    // DAY 14: 食べ物の話 (Talking About Food)
    // ============================================================
    {
        daySlot: 14,
        title: '好き嫌いバトル',
        titleEn: 'The Great Food Fight',
        scene: '居酒屋のカウンター。権藤が新メニュー試食会を開催。食の好みが全員バラバラで大喧嘩。',
        story: [
            { speaker: '', japanese: '権藤が新メニューの試作品をカウンターに並べる。', action: 'パクチーサラダ、激辛手羽先、クリームコロッケ' },
            { speaker: 'master', japanese: '今日は英語で食の話をしてもらう。まず、Are you picky about food?', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'I love spicy food! 激辛、bring it on!', mood: 'excited', action: '手羽先に飛びつく' },
            { speaker: 'mina', japanese: '...I cannot do cilantro. パクチー見ただけで無理。', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'え、パクチー最高じゃん。Nothing beats fresh cilantro on tacos.', mood: 'excited' },
            { speaker: 'kenji', japanese: '俺はやっぱり和食が一番。Nothing beats Japanese food.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'ケンジさんまでnothing beats使ってる。進歩。', mood: 'smug' },
            { speaker: 'yuki', japanese: 'ラーメン派？うどん派？ Are you more of a ramen person or an udon person?', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'ラーメン！100% ramen! 毎日food。I eat out all the time.', mood: 'excited' },
            { speaker: 'mina', japanese: '...takeshi、"every day food" じゃなくてevery dayだけでいいと思う。', mood: 'normal' },
            { speaker: 'kenji', japanese: '俺も外食ばっかり。嫁に怒られる。Do you cook? って聞かれたら... no.', mood: 'defeated' },
            { speaker: 'master', japanese: '権藤特製のクリームコロッケ、誰か食べないのか。', mood: 'normal', action: 'コロッケを指さす' },
            { speaker: 'takeshi', japanese: 'マスター、recipe教えて！You have to give me that recipe!', mood: 'excited' },
            { speaker: 'master', japanese: '企業秘密だ。', mood: 'smug' },
            { speaker: 'yuki', japanese: 'I am starving. 全部食べていい？', mood: 'excited' },
            { speaker: 'lisa', japanese: 'ユキ、それ完璧な英語だったよ。お腹空くと英語上手くなるタイプ？', mood: 'smug' },
            { speaker: 'yuki', japanese: '...もしかしたらそうかも。', mood: 'thinking' },
        ],
    },

    // ============================================================
    // DAY 15: 謝る・許す (Apologizing & Forgiving)
    // ============================================================
    {
        daySlot: 15,
        title: 'タケシ45分遅刻事件',
        titleEn: 'The 45-Minute Disaster',
        scene: '居酒屋。英語練習会の開始時刻を45分過ぎてタケシが到着。全員が冷たい目で見ている。',
        story: [
            { speaker: '', japanese: '20時45分。全員が腕時計を見ている。ドアが勢いよく開く。', action: 'タケシが息を切らして入ってくる' },
            { speaker: 'takeshi', japanese: 'Sorry, sorry, sorry! I know I am late. 電車が止まって...', mood: 'defeated' },
            { speaker: 'lisa', japanese: '45分だよ、タケシ。', mood: 'angry' },
            { speaker: 'takeshi', japanese: 'I am genuinely sorry. I feel terrible about this. ほんとに。', mood: 'defeated' },
            { speaker: 'kenji', japanese: '...俺なんて30分前から待ってた。', mood: 'angry' },
            { speaker: 'takeshi', japanese: 'I did not mean to! 悪気はなかったんです！I will make sure it does not happen again!', mood: 'defeated' },
            { speaker: 'yuki', japanese: 'タケシさん...ちょっと大げさすぎない？', mood: 'normal' },
            { speaker: 'mina', japanese: 'That is a bit much. 落ち着いて。', mood: 'normal' },
            { speaker: 'master', japanese: 'タケシ。英語で謝れてるぞ。', mood: 'normal', action: 'ビールを出す' },
            { speaker: 'takeshi', japanese: '...え？あ、ほんとだ。今全部英語だった。', mood: 'excited' },
            { speaker: 'lisa', japanese: '...許す。No hard feelings. でも次やったら店出禁ね。', mood: 'normal' },
            { speaker: 'kenji', japanese: '俺もI am over it. 謝るの下手だけど、I am terrible at apologies。お互い様だ。', mood: 'normal' },
            { speaker: 'master', japanese: 'We have all been there. ...まあ45分は新記録だが。', mood: 'smug' },
            { speaker: 'yuki', japanese: 'Water under the bridge. Let us move on. ...ね？', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'ユキちゃん...！Are we good?', mood: 'excited' },
            { speaker: 'yuki', japanese: '...ビール奢ってくれたらgood。', mood: 'smug' },
            { speaker: 'takeshi', japanese: '全員分！全員分奢ります！', mood: 'excited' },
            { speaker: 'master', japanese: '...遅刻すると出費が増える。いい教訓だ。', mood: 'smug' },
        ],
    },

    // ============================================================
    // DAY 16: レストランでクレーム (Restaurant Complaints)
    // ============================================================
    {
        daySlot: 16,
        title: 'ケンジ、ステーキを取り戻せ',
        titleEn: 'Kenji Wants His Steak',
        scene: 'アメリカ出張中のケンジ。レストランで注文した料理が全然違う。居酒屋メンバーにLINEで実況中継。',
        story: [
            { speaker: '', japanese: 'ニューヨークのレストラン。ケンジの前に魚料理が置かれる。', action: 'ケンジ、LINEグループに「たすけて」と送信' },
            { speaker: 'kenji', japanese: '...This is not what I ordered. 俺はステーキを頼んだんだ。', mood: 'angry' },
            { speaker: '', japanese: 'ウェイターが "Oh, sorry about that" と言う。' },
            { speaker: '', japanese: '居酒屋のカウンター。全員がスマホを見ている。', action: 'LINE実況開始' },
            { speaker: 'lisa', japanese: '次は "I think there has been a mix-up" って言って。丁寧に。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '「俺のステーキどこ！」でいいだろ！Where is my steak!', mood: 'excited' },
            { speaker: 'yuki', japanese: 'タケシさん、それケンカになる。', mood: 'normal' },
            { speaker: '', japanese: 'ケンジからボイスメッセージ。', action: '"Sorry, I think there has been a mix-up. I ordered the steak."' },
            { speaker: 'mina', japanese: 'ケンジさん、発音いい...。緊張すると逆に丁寧になるタイプ？', mood: 'excited' },
            { speaker: '', japanese: 'ウェイターが料理を下げて、新しいステーキを持ってくる。が、焼き加減が違う。' },
            { speaker: 'kenji', japanese: '...I asked for medium rare. This is well done.', mood: 'angry' },
            { speaker: 'master', japanese: '"Could you redo this?" と言え。怒るな。丁寧にだ。', mood: 'normal' },
            { speaker: '', japanese: 'ケンジからのボイスメッセージ第2弾。', action: '"Sorry, could you redo this? I wanted medium rare."' },
            { speaker: 'takeshi', japanese: 'ケンジさん、英語のクレーム完璧じゃん！日本語より丁寧！', mood: 'excited' },
            { speaker: 'kenji', japanese: '...英語だと怒鳴れないから逆に丁寧になる。', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'それ、実は一番正しいアプローチなんだよね。', mood: 'smug' },
            { speaker: 'master', japanese: '英語が下手で助かることもある。皮肉なもんだ。', mood: 'smug' },
        ],
    },

    // ============================================================
    // DAY 17: 返品・交換 (Returns & Exchanges)
    // ============================================================
    {
        daySlot: 17,
        title: 'ユキの返品大作戦',
        titleEn: 'Operation Return',
        scene: '居酒屋。ユキがネットで買った海外ブランドの服のサイズが合わなかった。明日返品に行く前に英語のリハーサル。',
        story: [
            { speaker: '', japanese: 'ユキがショッピングバッグをカウンターに置く。', action: '中から明らかにサイズの大きいワンピース' },
            { speaker: 'yuki', japanese: 'これ、Mサイズのはずなのにブカブカ。明日返品しに行く。', mood: 'angry' },
            { speaker: 'lisa', japanese: 'まず "I would like to return this" ね。want よりwouldのほうが店員ウケいいよ。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'I would like to return this... OK。で、理由は？', mood: 'normal' },
            { speaker: 'master', japanese: '"The size is wrong" でいい。シンプルに。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'レシートは？ "I have the receipt!" って見せればOKでしょ！', mood: 'excited' },
            { speaker: 'yuki', japanese: 'ある。I have the receipt. ...交換できるかな。Can I exchange this for a smaller size?', mood: 'thinking' },
            { speaker: 'mina', japanese: '期限大丈夫？ Is it still within the return period?', mood: 'normal' },
            { speaker: 'yuki', japanese: '買って3日だから大丈夫。...でも箱捨てちゃった。', mood: 'defeated' },
            { speaker: 'kenji', japanese: '箱なしはキツいぞ。I do not have the original box って正直に言うしかない。', mood: 'normal' },
            { speaker: 'lisa', japanese: '大丈夫、服は箱なくても返品できるところ多い。タグ付いてれば。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'もし交換できなかったら？ "I want a refund!" ドーン！', mood: 'excited' },
            { speaker: 'master', japanese: '..."I would like a refund" だ。want は子供。would like が大人。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'OK、整理する。I would like to return this, the size is wrong, I have the receipt, can I exchange this for a smaller size. ...いける気がする。', mood: 'excited' },
            { speaker: 'lisa', japanese: 'あとは送料ね。Who pays for shipping って聞いて。ネットの場合は大事。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'Who pays for shipping... メモした。明日頑張る。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '俺も行こうか？通訳...いや、邪魔か。', mood: 'thinking' },
            { speaker: 'yuki', japanese: '一人で行く。...多分。', mood: 'thinking' },
        ],
    },

    // ============================================================
    // DAY 18: 緊急事態 (Emergencies)
    // ============================================================
    {
        daySlot: 18,
        title: '権藤マスターのNY武勇伝',
        titleEn: 'Gondo\'s New York War Stories',
        scene: '居酒屋。権藤がNYバーテンダー時代の緊急事態エピソードを語る。全員が真剣に聞いている。',
        story: [
            { speaker: '', japanese: '深夜0時。権藤が珍しく昔話を始める。', action: '全員がカウンターに身を乗り出す' },
            { speaker: 'master', japanese: 'NYで財布をすられたことがある。My wallet was stolen. 地下鉄で。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'えっ、マスターが？ あのマスターが？', mood: 'excited' },
            { speaker: 'master', japanese: 'パスポートも一緒に入ってた。I lost my passport. 頭が真っ白になった。', mood: 'normal' },
            { speaker: 'yuki', japanese: '...それ最悪じゃないですか。', mood: 'defeated' },
            { speaker: 'master', japanese: 'まず警察に行った。Call the police. ...だが当時の俺の英語じゃ説明できなかった。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'マスターでも？', mood: 'excited' },
            { speaker: 'master', japanese: 'TOEICの英語と、警察署で使う英語は別物だ。"Does anyone speak Japanese?" と聞いた。誰もいなかった。', mood: 'normal' },
            { speaker: 'kenji', japanese: '...それで、どうしたんですか。', mood: 'thinking' },
            { speaker: 'master', japanese: '紙に書いた。"My wallet was stolen. I need to contact the embassy. I have insurance." この3文だけ書いて見せた。', mood: 'normal' },
            { speaker: 'mina', japanese: '...書くっていう手があるんだ。', mood: 'thinking' },
            { speaker: 'master', japanese: '話せなくても伝えられる。大事なのは、緊急時に使う英語を事前に知っておくことだ。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'Help! と Call the police! と Where is the hospital! ...これだけ覚えとく！', mood: 'excited' },
            { speaker: 'master', japanese: 'あと "I am lost" と "Where am I" だ。迷子になったら、この2つ。', mood: 'normal' },
            { speaker: 'yuki', japanese: '...メモしていいですか。本気で。', mood: 'normal' },
            { speaker: 'master', japanese: '全員、スマホのメモに入れておけ。使わないのが一番だが、備えは必要だ。', mood: 'normal' },
            { speaker: 'kenji', japanese: '...マスター、パスポートはどうなったんですか。', mood: 'thinking' },
            { speaker: 'master', japanese: '3日後に大使館で仮パスポートをもらった。...あの3日間が、俺の英語人生を変えた。', mood: 'thinking' },
        ],
    },

    // ============================================================
    // DAY 19: 励ます・慰める (Encouraging & Comforting)
    // ============================================================
    {
        daySlot: 19,
        title: 'ユキ、英検で撃沈',
        titleEn: 'After the Storm',
        scene: '居酒屋。ユキが英検準1級に落ちて号泣寸前。居酒屋メンバー全員で励ます夜。',
        story: [
            { speaker: '', japanese: '水曜の夜。ユキが無言で居酒屋に入ってくる。全員が空気を察する。', action: 'ユキ、カウンターに突っ伏す' },
            { speaker: 'mina', japanese: '...ユキさん？', mood: 'normal' },
            { speaker: 'yuki', japanese: '英検、落ちた。リスニングが壊滅。もうダメ。', mood: 'defeated' },
            { speaker: 'takeshi', japanese: 'Do not worry about it! 俺なんて3回落ちた！', mood: 'excited' },
            { speaker: 'lisa', japanese: '...タケシ、それ励ましになってない。', mood: 'normal' },
            { speaker: 'kenji', japanese: 'ユキさん。You did great. 受けただけでも偉い。俺なんて受ける勇気もない。', mood: 'normal' },
            { speaker: 'yuki', japanese: '...でも3ヶ月も勉強したのに。', mood: 'defeated' },
            { speaker: 'mina', japanese: 'Do not blame yourself. 3ヶ月で準1は本当にすごいことだよ。', mood: 'normal' },
            { speaker: 'master', japanese: 'There is always next time. だが、それは建前だ。', mood: 'normal' },
            { speaker: '', japanese: '全員が権藤を見る。' },
            { speaker: 'master', japanese: '本音を言う。試験の英語と、ここで喋ってる英語は別物だ。お前は喋れるようになってる。試験が追いついてないだけだ。', mood: 'normal' },
            { speaker: 'yuki', japanese: '...本当に？', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'マスターの言う通り。You are not alone. みんなここで一緒に練習してるじゃん。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'I am rooting for you! 全力で応援してる！次は絶対受かる！', mood: 'excited' },
            { speaker: 'kenji', japanese: 'I have been there. 落ちた時の気持ちは痛いほどわかる。...でも、It will work out.', mood: 'normal' },
            { speaker: 'mina', japanese: '泣いてもいいよ。It is okay to cry.', mood: 'normal' },
            { speaker: 'yuki', japanese: '...泣かない。泣かないけど...ありがとう。みんな。', mood: 'normal', action: '目をこする' },
            { speaker: 'master', japanese: '...今夜は全部俺の奢りだ。黙って飲め。', mood: 'normal', action: '全員分のビールを並べる' },
        ],
    },

    // ============================================================
    // DAY 20: 手伝いを申し出る (Offering Help)
    // ============================================================
    {
        daySlot: 20,
        title: '迷える観光客を救え',
        titleEn: 'Tourist Rescue Mission',
        scene: '居酒屋。外国人観光客カップルが「Excuse me...」と入ってくる。全員で助ける総力戦。',
        story: [
            { speaker: '', japanese: '土曜の夜。居酒屋のドアが開き、大きなバックパックを背負った外国人カップルが入ってくる。', action: '"Excuse me... is this a restaurant?"' },
            { speaker: '', japanese: '全員が固まる。3秒の沈黙。' },
            { speaker: 'yuki', japanese: '...Can I help you?', mood: 'normal', action: '自分でも驚いた顔で立ち上がる' },
            { speaker: '', japanese: '外国人 "We are trying to find our hotel but we are completely lost."' },
            { speaker: 'takeshi', japanese: 'Lost! OK OK! Do you know the way? ホテルの名前は？', mood: 'excited' },
            { speaker: 'lisa', japanese: 'タケシ落ち着いて。...Is everything okay? ホテルの名前見せてもらえる？', mood: 'normal' },
            { speaker: '', japanese: '外国人がスマホでホテル名を見せる。歩いて15分の場所。' },
            { speaker: 'mina', japanese: '...I can show you on the map. これ、ここから近いですよ。', mood: 'normal', action: 'Google Mapを開く' },
            { speaker: 'kenji', japanese: '荷物重そうだな。Let me help with that.', mood: 'normal', action: 'バックパックに手を伸ばす' },
            { speaker: '', japanese: '外国人カップルが恐縮する。' },
            { speaker: 'master', japanese: '...まず座れ。Please, sit. 道は教えるから、先に水でも飲め。', mood: 'normal', action: '水を2つ出す' },
            { speaker: 'takeshi', japanese: 'Want some recommendations? この辺のおすすめ教えるよ！ラーメンとか！', mood: 'excited' },
            { speaker: 'lisa', japanese: 'タケシ、今はホテルの場所が先。', mood: 'normal' },
            { speaker: 'yuki', japanese: '...Want me to call a taxi? タクシー呼びましょうか。荷物もあるし。', mood: 'normal' },
            { speaker: '', japanese: '外国人カップルが "You are all so kind!" と笑顔になる。' },
            { speaker: 'mina', japanese: 'Want me to take a photo? 記念に撮りましょうか。', mood: 'excited' },
            { speaker: '', japanese: '全員と外国人カップルで記念撮影。タケシがピースサイン。', action: 'パシャ' },
            { speaker: 'master', japanese: '...いい夜だ。こういう英語が、一番大事だ。', mood: 'normal' },
            { speaker: 'yuki', japanese: '...テストより楽しかった。', mood: 'excited' },
        ],
    },

];
