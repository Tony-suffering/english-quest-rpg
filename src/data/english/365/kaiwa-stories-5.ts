/**
 * 365 English Master -- Kaiwa Stories: Days 41-50
 *
 * Month 2 mid-arc. Stories venture beyond the izakaya -- phones, salons, clinics,
 * banks, sidewalks. The crew is practicing in the wild.
 *
 * Day 41: 約束する (Promises)
 * Day 42: 電話する (Phone Calls)
 * Day 43: 道案内 (Giving Directions)
 * Day 44: 週末の話 (Weekend Recap)
 * Day 45: 外食する (Eating Out)
 * Day 46: 美容院・床屋 (Salon)
 * Day 47: 病院で (At the Clinic)
 * Day 48: 銀行・郵便局 (Bank & Post)
 * Day 49: ご近所付き合い (Neighborhood)
 * Day 50: 映画・ドラマの話 (Movies & Shows)
 */

import type { KaiwaStory } from './kaiwa-stories';

export const KAIWA_STORIES_5: KaiwaStory[] = [

    // ────────────────────────────────────────────────────
    // DAY 41: 約束する (Promises)
    // タケシが温泉旅行を「絶対行く」と誓う夜。約束の重さの話
    // ────────────────────────────────────────────────────
    {
        daySlot: 41,
        title: '約束、何回破った？',
        titleEn: 'How Many Times Have You Bailed?',
        scene: '居酒屋。温泉旅行の前夜。タケシが「今度こそ絶対行く」と誓っている。',
        story: [
            { speaker: 'takeshi', japanese: 'みんな！明日の温泉、俺絶対行く！I promise! Cross my heart!', english: 'I promise! Cross my heart!', mood: 'excited' },
            { speaker: 'lisa', japanese: 'Cross my heart 出た。本気度高い。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'タケシさん、その「絶対」何回目ですか。', mood: 'thinking' },
            { speaker: 'takeshi', japanese: '...4回くらい。', mood: 'defeated' },
            { speaker: 'kenji', japanese: '俺は約束した時点で行く。It is a done deal.', english: 'It is a done deal.', mood: 'normal' },
            { speaker: 'mina', japanese: 'ケンジさん、約束破ったことありますか？', mood: 'thinking' },
            { speaker: 'kenji', japanese: '...娘の運動会、現場が長引いて行けなかった時がある。あの時の娘の顔が忘れられん。', mood: 'defeated' },
            { speaker: 'lisa', japanese: '...重い。約束って、信頼の貸し借りだもんね。', mood: 'thinking' },
            { speaker: 'master', japanese: 'A promise is a promise. それ以上の説明はいらない。', english: 'A promise is a promise.', mood: 'normal' },
            { speaker: 'yuki', japanese: '私、約束破るの怖くて、最初から約束しないタイプ...', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'それはそれで信頼されない可能性あるよ。Commitment phobic って言われる。', english: 'Commitment phobic.', mood: 'normal' },
            { speaker: 'mina', japanese: '私はLINEの返信遅くて、よく謝ります。Sorry for the late reply ばっかり言ってる。', english: 'Sorry for the late reply.', mood: 'defeated' },
            { speaker: 'takeshi', japanese: 'それは約束じゃなくて返信ね。違うよ。', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'でも「返信する」って暗黙の約束はあるよね。社会的なやつ。', mood: 'normal' },
            { speaker: 'kenji', japanese: '...小さい約束ほど守るのが大事だ。「今度飲みに行こう」を本当に行く奴は信頼される。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'I will hold you to that. ...これって「約束したからな」って意味でしたよね。', english: 'I will hold you to that.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'そう、相手の約束を「逃さないよ」って釘刺す言い方。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'OK! 明日朝10時、新宿南口！I will be there! ...あ、I will hold you to that ってみんな言って！俺が逃げないように！', english: 'I will be there!', mood: 'excited' },
            { speaker: 'mina', japanese: '...タケシさん、自分で釘刺してと頼んでる。', mood: 'normal' },
            { speaker: 'master', japanese: '...見たことない種類の自己管理だ。', mood: 'smug' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 42: 電話する (Phone Calls)
    // ケンジが英語で電話するの苦手。リサが特訓
    // ────────────────────────────────────────────────────
    {
        daySlot: 42,
        title: '声だけは怖い',
        titleEn: 'Voice-Only Terror',
        scene: 'ケンジが海外の取引先に英語電話。リサがイヤホンで横から助けるリアルタイム作戦。',
        story: [
            { speaker: 'narrator', japanese: '居酒屋の隅。ケンジがスマホを耳に当てて、もう片方の耳にイヤホン。リサが横でスタンバイ。' },
            { speaker: 'kenji', japanese: '...リサ、聞こえるか。', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'バッチリ。落ち着いて。まず Hello, this is Kenji from Sato Construction.', english: 'Hello, this is Kenji from Sato Construction.', mood: 'normal' },
            { speaker: 'kenji', japanese: '...かけるぞ。', mood: 'defeated', action: 'スマホの発信ボタンを押す' },
            { speaker: 'narrator', japanese: '呼び出し音3回。相手が出る。' },
            { speaker: 'kenji', japanese: 'Hello, this is Kenji from Sato Construction. Am I speaking with Mr. Garcia?', english: 'Hello, this is Kenji from Sato Construction. Am I speaking with Mr. Garcia?', mood: 'normal' },
            { speaker: 'lisa', japanese: 'いいよ、出だしパーフェクト。', mood: 'smug' },
            { speaker: 'kenji', japanese: '...あ、I am calling about the shipment scheduled for next week.', english: 'I am calling about the shipment scheduled for next week.', mood: 'normal' },
            { speaker: 'narrator', japanese: '相手の声が早口で何か言っている。ケンジ、固まる。' },
            { speaker: 'kenji', japanese: '...リサ、早すぎる。', mood: 'defeated' },
            { speaker: 'lisa', japanese: '聞き返して！Could you repeat that, please? と Could you slow down a bit?', english: 'Could you slow down a bit?', mood: 'excited' },
            { speaker: 'kenji', japanese: 'Sorry, could you slow down a bit? It is a bit hard to follow.', english: 'Sorry, could you slow down a bit? It is a bit hard to follow.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'It is a bit hard to follow いいね！丁寧で本音。', mood: 'smug' },
            { speaker: 'narrator', japanese: '相手が「ゆっくり」話し直す。ケンジ、メモを取る。' },
            { speaker: 'kenji', japanese: '...わかった。Got it. So the delivery is delayed by three days. I will let our team know.', english: 'Got it. I will let our team know.', mood: 'normal' },
            { speaker: 'narrator', japanese: '通話終了。ケンジが大きく息を吐く。' },
            { speaker: 'kenji', japanese: '...電話、画面ないから怖い。表情が見えない。', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'わかる。私もネイティブだけど電話は緊張する。声だけだと判断材料少ないから。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'ケンジさん、ナイス電話！えっ、それより俺、宅配の不在通知に英語で電話する練習してる！', mood: 'excited' },
            { speaker: 'yuki', japanese: '宅配の不在通知、日本語じゃないですか。', mood: 'thinking' },
            { speaker: 'takeshi', japanese: 'いいの！練習！I am calling about the delivery! って言いたい！', english: 'I am calling about the delivery!', mood: 'excited' },
            { speaker: 'master', japanese: '...電話できるやつは、たいてい腹が据わってる。お前はそこに足を踏み入れた。', mood: 'normal' },
            { speaker: 'kenji', japanese: '...マスター、もう1杯。今日は飲む。', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 43: 道案内 (Giving Directions)
    // 全員で「道聞かれた時の最強テンプレ」を作る
    // ────────────────────────────────────────────────────
    {
        daySlot: 43,
        title: '道案内テンプレ作戦会議',
        titleEn: 'The Universal Directions Cheat Sheet',
        scene: '居酒屋。タケシが「道聞かれた時の最強テンプレ作ろう」と提案。全員で考える。',
        story: [
            { speaker: 'takeshi', japanese: '今日のテーマ！道聞かれた時のテンプレ作る！I want a universal cheat sheet!', english: 'I want a universal cheat sheet!', mood: 'excited' },
            { speaker: 'lisa', japanese: 'タケシ、道案内Day 13で勝ったのに、まだ怖いの？', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'あれは奇跡！I got lucky! 次は再現できる自信ない！', english: 'I got lucky!', mood: 'defeated' },
            { speaker: 'mina', japanese: 'じゃあ基本パターン整理しましょう。Go straight, turn left, turn right.', english: 'Go straight, turn left, turn right.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'あとIt is on your left/right. 「左手にあります」。', english: 'It is on your left.', mood: 'normal' },
            { speaker: 'kenji', japanese: '距離はAbout 5 minutes on foot. 5分くらい歩く。', english: 'About 5 minutes on foot.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'みんな結構知ってんじゃん。', mood: 'smug' },
            { speaker: 'takeshi', japanese: '知ってる。でも本番出てこない。Like, my brain just freezes.', english: 'My brain just freezes.', mood: 'defeated' },
            { speaker: 'master', japanese: 'タケシ、聞け。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'はい！', mood: 'excited' },
            { speaker: 'master', japanese: 'わからないなら正直に言え。I am not from around here. これだけで全員許してくれる。', english: 'I am not from around here.', mood: 'normal' },
            { speaker: 'yuki', japanese: '「この辺の人間じゃない」!? それ便利すぎる。', mood: 'excited' },
            { speaker: 'lisa', japanese: 'これマジで使える。地元民でも「分からない」って堂々と言える呪文。', mood: 'normal' },
            { speaker: 'mina', japanese: '私もうそ言って Go straight! って間違った方向に案内したことあります...', mood: 'defeated' },
            { speaker: 'kenji', japanese: '...それ罪深いな。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'わからない時は Let me check on my phone. これも使える。スマホ見ながら答える。', english: 'Let me check on my phone.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'OK！俺のテンプレ完成！「I am not from around here, but let me check on my phone!」', english: 'I am not from around here, but let me check on my phone!', mood: 'excited' },
            { speaker: 'yuki', japanese: 'タケシさん、それ「俺は知らない、でもスマホで調べてやる」って意味で完璧です。', mood: 'normal' },
            { speaker: 'master', japanese: '...道を教えるってのは、本当に道を知ってるかじゃない。一緒に困ろうとする姿勢だ。', english: 'Directions are not about knowing. They are about caring.', mood: 'normal' },
            { speaker: 'mina', japanese: '...マスター、今日も名言ですね。', mood: 'thinking' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 44: 週末の話 (Weekend Recap)
    // 温泉旅行から帰った月曜。何があったか英語で報告
    // ────────────────────────────────────────────────────
    {
        daySlot: 44,
        title: '温泉旅行、英語で報告会',
        titleEn: 'Hot Spring Trip Debrief',
        scene: '月曜の夜、居酒屋。温泉旅行の翌日。マスターに英語で報告するルール。',
        story: [
            { speaker: 'master', japanese: '今日は温泉の報告を英語で。誰から行く。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '俺！俺！The trip was AMAZING! Like, life-changing amazing!', english: 'The trip was amazing! Life-changing amazing!', mood: 'excited' },
            { speaker: 'lisa', japanese: 'ライフチェンジングは盛りすぎ。お湯につかっただけでしょ。', mood: 'normal' },
            { speaker: 'yuki', japanese: '私からいいですか。Saturday morning we met at Shinjuku station. Takeshi was late by 15 minutes.', english: 'Takeshi was late by 15 minutes.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'I overslept! Sorry!', english: 'I overslept!', mood: 'defeated' },
            { speaker: 'mina', japanese: 'But once we got there, everything was perfect. The hotel was right by the river. すごく綺麗で。', english: 'But once we got there, everything was perfect.', mood: 'excited' },
            { speaker: 'kenji', japanese: 'I had three baths in one day. 朝風呂、昼風呂、夜風呂。生まれ変わった気分だ。', english: 'I had three baths in one day.', mood: 'normal' },
            { speaker: 'lisa', japanese: '"reborn" 使う？ I feel reborn. ...ケンジさんレベルアップしすぎ。', mood: 'normal' },
            { speaker: 'yuki', japanese: '夕食が豪華で。It was the best meal I have had in months.', english: 'It was the best meal I have had in months.', mood: 'normal' },
            { speaker: 'takeshi', japanese: '俺、3回お代わりした！ The waitress was like, "are you ok?"', english: 'The waitress was like, "are you ok?"', mood: 'excited' },
            { speaker: 'mina', japanese: '夜、みんなで卓球しました。タケシさん本気出して引いた。', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'タケシ、24歳のミナに本気で勝ちにいくの大人げない。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'I do not lose at ping pong! 卓球だけは譲れない！', english: 'I do not lose at ping pong!', mood: 'excited' },
            { speaker: 'kenji', japanese: '一番よかったのは、夜中の露天風呂。星が見えた。It was unreal.', english: 'It was unreal.', mood: 'normal' },
            { speaker: 'master', japanese: 'ケンジ、お前から「unreal」が出たのは初めて聞いた。', mood: 'smug' },
            { speaker: 'yuki', japanese: '帰りは全員疲れて電車で寝てました。We crashed on the train.', english: 'We crashed on the train.', mood: 'normal' },
            { speaker: 'master', japanese: '...いい週末だったな。Recharge は完了か。', english: 'Are you recharged?', mood: 'normal' },
            { speaker: 'mina', japanese: 'I am totally recharged. 明日からまた頑張れます。', english: 'I am totally recharged.', mood: 'normal' },
            { speaker: 'master', japanese: 'あ、温泉まんじゅう、忘れてないか。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '...あ。', mood: 'defeated' },
            { speaker: 'master', japanese: '...想定内だ。', mood: 'smug' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 45: 外食する (Eating Out)
    // 「何食べる？」が決まらない夜。リサが料理ボキャブを爆発させる
    // ────────────────────────────────────────────────────
    {
        daySlot: 45,
        title: '何食べる？問題',
        titleEn: 'What\'s for Dinner: The Endless Debate',
        scene: '居酒屋に集まる前のLINE。「何食べる？」で30分議論しているメンバー。',
        story: [
            { speaker: 'narrator', japanese: '金曜の夜、19時。グループLINEで30分前から始まった議論。' },
            { speaker: 'takeshi', japanese: 'みんな、今日何食べる？マスターのとこ行く前に腹ごしらえしたい。', mood: 'thinking' },
            { speaker: 'yuki', japanese: 'タケシさん、居酒屋でも食べるじゃないですか。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '足りない！I need a real meal first!', english: 'I need a real meal first!', mood: 'excited' },
            { speaker: 'lisa', japanese: 'What are you craving? 今何食べたい気分？', english: 'What are you craving?', mood: 'normal' },
            { speaker: 'mina', japanese: 'craving...急に食べたくなるやつですよね。私は甘いもの。I am craving something sweet.', english: 'I am craving something sweet.', mood: 'normal' },
            { speaker: 'kenji', japanese: '俺は何でもいい。I am easy.', english: 'I am easy.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'I am easy 使えるんだ。ケンジさん、いつの間にレベルアップ？', mood: 'smug' },
            { speaker: 'yuki', japanese: 'パスタ食べたい気分。I could go for some pasta.', english: 'I could go for some pasta.', mood: 'normal' },
            { speaker: 'takeshi', japanese: '焼肉！焼肉行こう！I am dying for some BBQ!', english: 'I am dying for some BBQ!', mood: 'excited' },
            { speaker: 'mina', japanese: 'タケシさん dying 使い方ハードすぎ。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'I am dying for は「死ぬほど食べたい」。タケシは合ってる。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'でもパスタは...って言ってる時点で意見割れてる。', mood: 'thinking' },
            { speaker: 'kenji', japanese: '...パスタも焼肉もある店なんてない。', mood: 'thinking' },
            { speaker: 'lisa', japanese: '結局こうなる。Let us just compromise. 妥協しよう。', english: 'Let us just compromise.', mood: 'normal' },
            { speaker: 'mina', japanese: '居酒屋でいいんじゃないですか？マスターのところで全部食べられるし。', mood: 'thinking' },
            { speaker: 'takeshi', japanese: 'ミナちゃん天才！Best idea ever!', english: 'Best idea ever!', mood: 'excited' },
            { speaker: 'yuki', japanese: '...結局最初からそこに行く予定じゃないですか。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'It always comes back to the izakaya. これが私たちの結論。', english: 'It always comes back to the izakaya.', mood: 'normal' },
            { speaker: 'master', japanese: '...聞こえてるぞ。今日は予約満員だ。早く来い。', mood: 'normal', action: 'LINEに既読' },
            { speaker: 'takeshi', japanese: 'マスター見てた!? Crap!', english: 'Crap!', mood: 'excited' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 46: 美容院・床屋 (Salon)
    // ユキが海外で初めて美容院。電話で居酒屋メンバーに実況
    // ────────────────────────────────────────────────────
    {
        daySlot: 46,
        title: 'シンガポールの美容院',
        titleEn: 'Salon, Singapore Edition',
        scene: 'ユキがシンガポール出張中、美容院で英語で注文する直前にLINE電話。',
        story: [
            { speaker: 'narrator', japanese: 'シンガポール、土曜の午後3時。ユキが美容院の前でスマホを耳に当てている。' },
            { speaker: 'yuki', japanese: '...リサ、ヘルプ。美容院。私の前髪、もう限界。', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'OK 落ち着いて。何したいの？', mood: 'normal' },
            { speaker: 'yuki', japanese: '前髪切るだけ。それだけ。Just a trim on the bangs.', english: 'Just a trim on the bangs.', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'Perfect! bangs って覚えてるじゃん。前髪。', mood: 'smug' },
            { speaker: 'yuki', japanese: 'でも...眉上にされたらどうしよう。怖い。', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'まず Do you take walk-ins? って聞いて、入店。', english: 'Do you take walk-ins?', mood: 'normal' },
            { speaker: 'yuki', japanese: 'walk-ins...予約なしで入る、ってやつ。', mood: 'thinking' },
            { speaker: 'lisa', japanese: '指示！I just want a trim on my bangs. Above my eyebrows, please. About an inch shorter.', english: 'I just want a trim on my bangs. Above my eyebrows, please.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'an inch...2.5センチくらい？', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'そう。指で長さ見せるのが一番安全。', mood: 'normal' },
            { speaker: 'narrator', japanese: '20分後。ユキから写真付きLINEが届く。' },
            { speaker: 'yuki', japanese: 'リサ！見て！普通の前髪！I survived!', english: 'I survived!', mood: 'excited' },
            { speaker: 'lisa', japanese: 'いいじゃん！普通！パーフェクト！', mood: 'excited' },
            { speaker: 'yuki', japanese: '指示通り言ったら、スタイリストが「Got it!」って言って、本当にその通りになった。', mood: 'excited' },
            { speaker: 'takeshi', japanese: '俺、美容院で英語使ったら「短くしすぎないで」って言いたかったのに「don\'t cut my hair」って言って、本当に切られなかったことある！', english: 'Don\'t cut my hair!', mood: 'excited' },
            { speaker: 'mina', japanese: 'タケシさん、それただの拒否です。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'Don\'t cut it too short. が正解ね。「短くしすぎないで」。', english: 'Don\'t cut it too short.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'あと、I want to keep the length. 「長さは残して」も使える？', english: 'I want to keep the length.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'Yes! 完璧。これと「Just a trim」覚えとけば、海外の美容院で泣くことはない。', mood: 'smug' },
            { speaker: 'master', japanese: '...海外の美容院で坊主にされたって話は、たいてい「Short, please」とだけ言ったやつだ。', mood: 'smug' },
            { speaker: 'takeshi', japanese: 'マスター経験者!?', mood: 'excited' },
            { speaker: 'master', japanese: '...想像だ。', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 47: 病院で (At the Clinic)
    // タケシが海外で腹痛。診察室で奮闘
    // ────────────────────────────────────────────────────
    {
        daySlot: 47,
        title: 'タケシ、海外でお腹痛い',
        titleEn: 'Takeshi\'s International Stomachache',
        scene: 'タケシがアメリカ出張中、ホテルで腹痛。クリニックでの会話。',
        story: [
            { speaker: 'narrator', japanese: 'シカゴのクリニック。診察室。タケシがベッドに横たわっている。' },
            { speaker: 'takeshi', japanese: 'Doctor, my stomach is killing me. Like, really really bad.', english: 'My stomach is killing me.', mood: 'defeated' },
            { speaker: 'narrator', japanese: '医者 "When did it start?"' },
            { speaker: 'takeshi', japanese: 'Uh...last night. After dinner. I ate...uh...big steak. Huge.', english: 'Last night. After dinner. I ate a huge steak.', mood: 'defeated' },
            { speaker: 'narrator', japanese: '医者 "Sharp pain or dull pain?"' },
            { speaker: 'takeshi', japanese: 'Sharp...? Dull...? えっと...', mood: 'thinking' },
            { speaker: 'narrator', japanese: '医者が指でチクチクするジェスチャーと、ぼやっと押すジェスチャーを見せる。' },
            { speaker: 'takeshi', japanese: 'OK OK! Dull! Dull pain! ずーんって痛い！', english: 'Dull pain!', mood: 'thinking' },
            { speaker: 'narrator', japanese: '医者 "Any nausea? Vomiting?"' },
            { speaker: 'takeshi', japanese: 'Nausea...? I feel like throwing up.', english: 'I feel like throwing up.', mood: 'defeated' },
            { speaker: 'narrator', japanese: '医者 "Where exactly does it hurt?" タケシ、腹を指す。' },
            { speaker: 'takeshi', japanese: 'Here. Right here. ...And I cannot stop running to the bathroom.', english: 'I cannot stop running to the bathroom.', mood: 'defeated' },
            { speaker: 'narrator', japanese: '医者が頷いて「Sounds like food poisoning」と言う。' },
            { speaker: 'takeshi', japanese: 'Food poisoning!? 食中毒!? 死ぬ!?', english: 'Food poisoning!?', mood: 'excited' },
            { speaker: 'narrator', japanese: '医者 "You will be fine. I will prescribe you something. Drink lots of water and rest."' },
            { speaker: 'takeshi', japanese: '...OK. Lots of water. Rest. Got it.', english: 'Lots of water. Rest. Got it.', mood: 'defeated' },
            { speaker: 'narrator', japanese: '夜、ホテル。タケシがグループLINEに長文。' },
            { speaker: 'takeshi', japanese: '生き残った。食中毒だった。でも、英語で症状言えた。Dull pain も throwing up も。マスターの「I need something for ___」が役に立った。', mood: 'defeated' },
            { speaker: 'master', japanese: '...生きてればそれでいい。次から肉は半分にしろ。', english: 'You are alive. Eat half next time.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'タケシ、I am proud of you. これ、本当の英語の試験。生き延びるための英語。', english: 'I am proud of you.', mood: 'normal' },
            { speaker: 'kenji', japanese: '...俺もメモした。Dull pain。Throwing up。万が一の時のために。', mood: 'normal' },
            { speaker: 'mina', japanese: 'タケシさん、お大事に。Feel better soon.', english: 'Feel better soon.', mood: 'normal' },
            { speaker: 'takeshi', japanese: '...みんな、ありがとう。マジで。Thanks, guys.', english: 'Thanks, guys.', mood: 'defeated' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 48: 銀行・郵便局 (Bank & Post)
    // 海外で銀行口座開設。書類が読めない問題
    // ────────────────────────────────────────────────────
    {
        daySlot: 48,
        title: '書類の山と戦う',
        titleEn: 'Drowning in Paperwork',
        scene: '居酒屋。リサが海外で口座開設した武勇伝。手続き英語の話。',
        story: [
            { speaker: 'lisa', japanese: '先週オーストラリアの友達が来てて、銀行行きたいって言うから付き添ったの。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'リサさんでも書類大変ですか？', mood: 'thinking' },
            { speaker: 'lisa', japanese: '英語自体は大丈夫。でも日本の書類用語って、英語に直訳できないやつ多い。', mood: 'thinking' },
            { speaker: 'kenji', japanese: 'たとえば？', mood: 'normal' },
            { speaker: 'lisa', japanese: '「印鑑」。英語で何て言う？', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'スタンプ！Stamp! ...違う？', mood: 'thinking' },
            { speaker: 'lisa', japanese: '日本特有だから "Hanko" or "personal seal" って説明することになる。', mood: 'normal' },
            { speaker: 'mina', japanese: '私、海外送金で30分窓口にいたことあります。Fill out this form. の form が複雑すぎて...', english: 'Fill out this form.', mood: 'defeated' },
            { speaker: 'yuki', japanese: 'fill out って書類記入の必須語ですよね。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'あと sign here. と Could you put your signature here? Could you initial here? 違いわかる？', mood: 'normal' },
            { speaker: 'kenji', japanese: '...signature はサイン、initial はイニシャル？', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'そう。海外の書類だと、各ページに initial here ってあって、フルサインじゃなくてイニシャルだけ書く。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'マジ？俺、海外契約書で毎ページフルネーム書いてたっす！手疲れた！', mood: 'defeated' },
            { speaker: 'master', japanese: '...タケシ、それ確認しろっていう警告だ。読まずに署名するな。', mood: 'normal' },
            { speaker: 'mina', japanese: '郵便も難しいです。Where can I send a package? と How much is it to send this to Japan? くらいは言えるんですけど。', english: 'How much is it to send this to Japan?', mood: 'normal' },
            { speaker: 'lisa', japanese: 'それで十分。あと tracking number. 追跡番号。これだけは絶対もらう。', english: 'Tracking number.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'なるほど。Can I get a tracking number? って聞けばいいんですね。', english: 'Can I get a tracking number?', mood: 'normal' },
            { speaker: 'kenji', japanese: '...俺、これからの海外出張のためにメモする。fill out, sign, initial, tracking number。', mood: 'normal' },
            { speaker: 'master', japanese: '...役所英語と居酒屋英語は別物だ。両方使えて初めて生活できる。', english: 'Office English and bar English are two different beasts.', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 49: ご近所付き合い (Neighborhood)
    // 居酒屋の常連同士の距離感の話。ミナがコンビニで話しかけられる
    // ────────────────────────────────────────────────────
    {
        daySlot: 49,
        title: 'コンビニ店員に名前覚えられた',
        titleEn: 'The Convenience Store Recognized Me',
        scene: '居酒屋。ミナが「近所のコンビニ店員に英語で挨拶された」と報告。',
        story: [
            { speaker: 'mina', japanese: '今日、ちょっと嬉しいことがあって...', mood: 'excited' },
            { speaker: 'yuki', japanese: 'ミナちゃん、なに？', mood: 'normal' },
            { speaker: 'mina', japanese: '近所のコンビニ、ネパール人の店員さんがいるんですけど、今日「Hi, you again!」って言われて。', english: 'Hi, you again!', mood: 'excited' },
            { speaker: 'takeshi', japanese: '常連認定！おめでとう！', mood: 'excited' },
            { speaker: 'mina', japanese: '最初ちょっと驚いたんですけど、私も「Hi, how are you?」って自然に返せて。', mood: 'excited' },
            { speaker: 'lisa', japanese: 'いいじゃん。それが近所付き合いの始まり。', mood: 'normal' },
            { speaker: 'kenji', japanese: '俺の家の周りには、毎朝散歩で挨拶するおじいさんがいる。「おはよう」だけだが、5年続いてる。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'ケンジさんっぽい関係。', mood: 'normal' },
            { speaker: 'lisa', japanese: '英語圏のご近所付き合いってさ、How are you? がすごく多い。深い意味なし。すれ違いで言う。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'え、毎回ちゃんと答えなくていいの？', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'Good, you? で終わり。Good. それだけでもOK。すれ違いざまだから。', english: 'Good, you?', mood: 'normal' },
            { speaker: 'mina', japanese: '私、毎回真剣に「I am tired but okay...」とか答えてた。重い人扱いだったかも...', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'ミナそれ、ちょっと面白い。重い客って思われてたかもね。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'タクシーの運転手に Have a good one! って言われて、Good what? って聞き返したことあります...', english: 'Have a good one!', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'それ最高。Have a good one! は Have a good day! のカジュアル版。one は「日」とか「夜」とか曖昧。', mood: 'normal' },
            { speaker: 'kenji', japanese: '...便利な言葉だな。何でもいい時に使える。', mood: 'thinking' },
            { speaker: 'takeshi', japanese: 'マスター！Have a good one! 帰りに言ってみる！', mood: 'excited' },
            { speaker: 'master', japanese: '...近所付き合いってのは、深さじゃなくて頻度だ。小さい挨拶を積み重ねた人だけが「あの人」って呼ばれる。', english: 'Neighborhood ties are about frequency, not depth.', mood: 'normal' },
            { speaker: 'mina', japanese: '...私も「あの人」になれるかな。', mood: 'thinking' },
            { speaker: 'master', japanese: 'もうなってる。今日 you again って言われた時点で。', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 50: 映画・ドラマの話 (Movies & Shows)
    // Netflixで何見てる？で全員バラバラ
    // ────────────────────────────────────────────────────
    {
        daySlot: 50,
        title: 'Netflix何見てる選手権',
        titleEn: 'What Are You Binging?',
        scene: '居酒屋。リサが「最近何見てる？」を英語で全員に振る。趣味バラバラで盛り上がる。',
        story: [
            { speaker: 'lisa', japanese: 'みんな、What have you been watching? 最近何見てる？英語で言って。', english: 'What have you been watching?', mood: 'normal' },
            { speaker: 'takeshi', japanese: '俺、コブラ会！I am binging Cobra Kai! 1日3話！', english: 'I am binging Cobra Kai!', mood: 'excited' },
            { speaker: 'lisa', japanese: 'binge 出た！「一気見」。タケシ、語彙が育ってる。', mood: 'smug' },
            { speaker: 'yuki', japanese: '私はFriendsをまた見てる。何回目だろ。It is my comfort show.', english: 'It is my comfort show.', mood: 'normal' },
            { speaker: 'mina', japanese: 'comfort show ですか。安心して見れる作品ですね。私は梨泰院クラスの再視聴です。', mood: 'normal' },
            { speaker: 'kenji', japanese: '俺は釣り番組とニュースだけ。ドラマは見ない。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'ケンジさん、たまにドラマも見たほうがいいよ。リスニングの教材になるから。', mood: 'normal' },
            { speaker: 'kenji', japanese: '...じゃあ何見ればいい？簡単なやつ。', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'Modern Family おすすめ。日常会話の宝庫。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '俺もそれ見て笑いの英語覚えた！例えば...えっと...忘れた！', mood: 'excited' },
            { speaker: 'mina', japanese: '...タケシさん何も覚えてないじゃないですか。', mood: 'normal' },
            { speaker: 'yuki', japanese: '英語のドラマ見る時、字幕どうしてます？', mood: 'thinking' },
            { speaker: 'lisa', japanese: '英語音声、英語字幕。これがゴールデンルール。', mood: 'normal' },
            { speaker: 'mina', japanese: '私、日本語字幕に頼っちゃって、結局耳が伸びない...', mood: 'defeated' },
            { speaker: 'lisa', japanese: '最初の2話だけ日本語字幕、それ以降は英語字幕。これでいいよ。', mood: 'normal' },
            { speaker: 'kenji', japanese: '最近のドラマって続きが気になって寝れないやつあるよな。What is that called...', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'cliffhanger! 「次回が気になりすぎる終わり方」。It is such a cliffhanger.', english: 'It is such a cliffhanger.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'クリフハンガー！がけにぶら下がるって意味ね！', mood: 'excited' },
            { speaker: 'master', japanese: '...フィクションの感想を共有できる相手がいるってのは、人生の財産だ。', english: 'Sharing fiction is a kind of friendship.', mood: 'normal' },
            { speaker: 'yuki', japanese: '...マスター、何見てるんですか。', mood: 'thinking' },
            { speaker: 'master', japanese: '...言わない。秘密だ。', mood: 'smug' },
            { speaker: 'takeshi', japanese: '気になる!?', mood: 'excited' },
        ],
    },

];
