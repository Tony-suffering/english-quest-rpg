/**
 * 365 English Master -- Month 6 Week 21: 旅の英語 (Travel English)
 * Days 151-157: 70 expressions
 * Month: September 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 6 (2026-09) -- WEEK 21
// ============================================================

export const MONTH6_W21_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 151: 旅行を計画する (Planning a Trip)
    // Scene: ユキが秋の連休にどこか行きたいと言い出す
    // ────────────────────────────────────────────────────

    {
        daySlot: 151, japanese: 'どこか行きたいなあ',
        english: [
            'I want to go somewhere.',
            'I really want to go somewhere fun.',
            'I have been dying to go on a trip. Anywhere, honestly.',
            "Same here. I've been stuck in the same routine for weeks and it's driving me crazy.",
        ],
        jaTranslations: [
            'どこかに行きたい。',
            'どこか楽しいとこ行きたいなあ。',
            'もう旅行行きたくて死にそう。正直どこでもいい。',
            'わかる。ずっと同じ毎日で気が狂いそう。',
        ],
        context: 'dying to は「死ぬほど〜したい」。change of scenery は「気分転換」の英語的言い方で、直訳は「景色の変化」。monotonous は「単調な」。lose my mind は「おかしくなる」。英語では「どこでもいい」と言いつつ結局こだわるのは万国共通。',
        character: 'yuki', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 151, japanese: '連休どうする？',
        english: [
            'What are you doing for the long weekend?',
            'Got any plans for the long weekend?',
            'The long weekend is coming up. Have you thought about what you want to do?',
            "Not yet, but I'm down for anything. Road trip, beach, you name it.",
        ],
        jaTranslations: [
            '連休何するの？',
            '連休の予定ある？',
            'もうすぐ連休だけど、何したいか考えた？',
            'まだ。でも何でもいいよ。ドライブでも海でも何でも。',
        ],
        context: 'long weekend は「連休」。coming up は「近づいている」。figured out は「決めた」。open to anything は「何でもいい」。英語で連休の予定を聞くのは定番の会話スターター。I should have booked は「予約しておくべきだった」の後悔。',
        character: 'takeshi', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 151, japanese: '予算どのくらい？',
        english: [
            'What is the budget?',
            'How much are we looking to spend?',
            'Before we get too excited, what is everyone comfortable spending?',
            "Good call. I'd say around five hundred bucks total? That sound reasonable to everyone?",
        ],
        jaTranslations: [
            '予算いくら？',
            'いくらくらい使う感じ？',
            '盛り上がる前に聞くけど、みんないくらまでなら出せる？',
            'いい質問。合計5万くらい？みんなそれでいい？',
        ],
        context: 'budget は「予算」。comfortable spending は「無理なく出せる金額」。be upfront about は「正直に言う」。bucks はドルの口語。日本語では予算の話を避けがちだが、英語圏では最初にオープンに話すのが普通。reasonable は「妥当な」。',
        character: 'kenji', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 151, japanese: 'ガイドブック買った？',
        english: [
            'Did you get a guidebook?',
            'Have you picked up a guidebook yet?',
            'I was thinking about grabbing a guidebook but honestly I just use my phone for everything now.',
            "Honestly, I just use Google Maps now. But yeah, there's something nice about flipping through a real book.",
        ],
        jaTranslations: [
            'ガイドブック買った？',
            'もうガイドブック買った？',
            'ガイドブック買おうかと思ったけど、正直もう全部スマホで済ませてるわ。',
            '正直もうGoogleマップしか使ってない。でもまあ、紙の本パラパラめくるのもいいよな。',
        ],
        context: 'pick up は「買う」のカジュアル版。old school は「古風な」。flip through は「パラパラめくる」。TripAdvisor は英語圏の旅行口コミサイト。guidebook は日本では「ガイドブック」だが英語では travel guide とも言う。紙の地図を使う人はもうほぼいない。',
        character: 'master', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 151, japanese: '行き先を決めよう',
        english: [
            'Let us pick a destination.',
            'Come on, let us just pick a place and go.',
            'We have been going back and forth forever. Let us just decide on a destination already.',
            "For real. Let's just each write a place on a napkin and go with the majority.",
        ],
        jaTranslations: [
            '行き先決めよう。',
            'もうどっか決めて行こうよ。',
            'いつまでもグダグダ言ってないで、もう行き先決めようよ。',
            'ほんとそれ。ナプキンに書いて多数決でいこう。',
        ],
        context: 'go back and forth は「ああだこうだ言う」。commit は「決める・コミットする」。go with は「〜にする」。typical of us は「私たちらしい」。majority は「多数決」。napkin は「ナプキン」で居酒屋らしい演出。英語では決断を促すときに just が多用される。',
        character: 'lisa', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 151, japanese: 'いつがいい？',
        english: [
            'When works for you?',
            'When is good for everyone?',
            'What dates work best? I need to request time off soon.',
            "Yeah, I need at least two weeks' notice for my boss. Can we nail it down tonight?",
        ],
        jaTranslations: [
            'いつがいい？',
            'みんないつなら大丈夫？',
            '何日がいい？そろそろ休み申請出さないと。',
            'うちも2週間前に言わないとダメなんだよね。今夜中に決めない？',
        ],
        context: 'works for you は「都合がいい」の超頻出フレーズ。request time off は「休暇を申請する」。put in は「提出する」。first come first served は「早い者勝ち」。nail it down は「確定させる」。英語圏の会社では time off request が正式な手続き。',
        character: 'mina', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 151, japanese: '調べてみるね',
        english: [
            'I will look into it.',
            'Let me do some research and get back to you.',
            'I will check out some options and send everyone a link later tonight.',
            "That'd be awesome. Send it to the group chat when you find something good.",
        ],
        jaTranslations: [
            '調べてみるね。',
            'ちょっと調べてまた連絡する。',
            'いくつか候補見て、今夜みんなにリンク送るわ。',
            'ありがたい。いいの見つけたらグループに送って。',
        ],
        context: 'look into は「調べる」。get back to you は「後で連絡する」。check out は「見てみる」。incognito mode は「シークレットモード」。deals は「お得な情報」。英語では I will look into it が「検討します」の意味で使われることもあるが、友達同士なら本気で調べる宣言。',
        character: 'yuki', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 151, japanese: '海外と国内どっちがいい？',
        english: [
            'Domestic or international?',
            'Are we thinking domestic or international?',
            'Should we keep it simple and stay domestic or go all out and fly somewhere abroad?',
            "Honestly, let's just keep it domestic. Less hassle and we can still have a blast.",
        ],
        jaTranslations: [
            '国内？海外？',
            '国内と海外どっちの方向？',
            'シンプルに国内にする？それとも思い切って海外飛ぶ？',
            '正直、国内でよくない？面倒少ないし、十分楽しめるよ。',
        ],
        context: 'domestic は「国内」、international は「海外」。go all out は「思い切りやる」。commitment は「大変さ」。the whole nine yards は「全部」のイディオム。bold は「大胆な」。go abroad は「海外に行く」。currency exchange は「両替」。',
        character: 'takeshi', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 151, japanese: 'ツアーか自由旅行か',
        english: [
            'Tour or independent?',
            'Should we do a package tour or plan it ourselves?',
            'I am torn between booking a tour and just winging it on our own.',
            "Let's wing it. I hate being stuck on someone else's schedule the whole time.",
        ],
        jaTranslations: [
            'ツアー？自由旅行？',
            'パッケージツアーにする？自分たちで計画する？',
            'ツアー予約するかぶっつけで行くか迷ってる。',
            'ぶっつけでいこう。人のスケジュールに縛られるの嫌なんだよね。',
        ],
        context: 'wing it は「ぶっつけ本番でやる」。torn between は「迷っている」。taken care of は「手配済み」。wander off は「ふらっと離れる」。herded around like cattle は「牛みたいに連れ回される」。package tour は日本語の「パッケージツアー」と同じだが英語では guided tour のほうが一般的。',
        character: 'kenji', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 151, japanese: '旅行って計画してる時が一番楽しい',
        english: [
            'Planning is half the fun.',
            'Honestly, planning the trip is half the fun.',
            'Is it just me or is the planning part almost better than the actual trip?',
            "Totally. The anticipation is the best part. Once you're there it's all stress and schedules.",
        ],
        jaTranslations: [
            '計画するのも楽しみのうち。',
            '正直、旅行は計画してる時が一番楽しい。',
            '俺だけ？計画の段階のほうが実際の旅行より楽しくない？',
            'わかる。ワクワクしてる時が最高。着いたらストレスとスケジュールだけ。',
        ],
        context: 'half the fun は「楽しみの半分」。anticipation は「期待・ワクワク」。possibility は「可能性」。throw out ideas は「アイデアを出す」。Is it just me は「私だけ？」の定番フレーズ。英語圏でも planning is half the fun はよく言われる。旅行前の準備期間が一番テンション高い現象は万国共通。',
        character: 'master', category: 'travel', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 152: 予約する (Making Reservations)
    // Scene: ユキがホテルと飛行機を予約しようとする
    // ────────────────────────────────────────────────────

    {
        daySlot: 152, japanese: '予約したいんですけど',
        english: [
            'I would like to make a reservation.',
            'Hi, I would like to book a room please.',
            'I am calling to make a reservation for two nights starting September fifteenth.',
            "Of course. Let me check availability for those dates. Non-smoking with a view, right?",
        ],
        jaTranslations: [
            '予約したいのですが。',
            'すみません、部屋を予約したいんですけど。',
            '9月15日から2泊で予約をお願いしたいんですが。',
            'かしこまりました。その日程の空きを確認しますね。禁煙の眺望付きでよろしいですか？',
        ],
        context: 'make a reservation は「予約する」の正式表現。book a room はよりカジュアル。checking in/out は「チェックイン/アウト」。peak season は「繁忙期」。fully booked は「満室」。figured I would try は「ダメ元で聞いてみた」。電話予約は英語力が試される場面。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 152, japanese: '空いてますか？',
        english: [
            'Do you have any availability?',
            'Is there anything available for those dates?',
            'I checked online and it said no vacancy but I wanted to call just in case.',
            "Actually, we just had a cancellation this morning. You're in luck. Want me to hold it for you?",
        ],
        jaTranslations: [
            '空きはありますか？',
            'その日程で空いてるのありますか？',
            'ネットでは満室だったんですけど、念のため電話してみました。',
            '実は今朝キャンセルが出たんです。ラッキーですね。押さえておきましょうか？',
        ],
        context: 'availability は「空き状況」。no vacancy は「満室」でホテルの看板でよく見る。long shot は「可能性は低いけど」。booked solid は「完全に埋まっている」。cancellation は「キャンセル」。opened up は「空きが出た」。I will take anything は必死感が出る表現。',
        character: 'mina', category: 'request', month: '2026-09',
    },
    {
        daySlot: 152, japanese: 'キャンセル料はかかりますか？',
        english: [
            'Is there a cancellation fee?',
            'What is your cancellation policy?',
            'Just to be safe, can you walk me through the cancellation policy?',
            "Sure. You can cancel up to forty-eight hours before for a full refund. After that it's one night's charge.",
        ],
        jaTranslations: [
            'キャンセル料かかりますか？',
            'キャンセルポリシーはどうなってますか？',
            '念のため聞きたいんですけど、キャンセル規定を教えてもらえますか？',
            'はい。48時間前までなら全額返金です。それ以降は1泊分いただきます。',
        ],
        context: 'cancellation policy は「キャンセルポリシー」。walk me through は「順を追って説明して」。cutoff は「締め切り」。refund は「返金」。been burned は「痛い目にあった」。what I am getting into は「どういう条件か」。海外ホテルはキャンセル料が厳しいことが多い。',
        character: 'kenji', category: 'request', month: '2026-09',
    },
    {
        daySlot: 152, japanese: 'ネットで予約したほうが安い',
        english: [
            'It is cheaper to book online.',
            'You can usually get a better deal booking online.',
            'I always check the hotel website directly because sometimes it is cheaper than third-party sites.',
            "Oh really? I never thought to check directly. I'll try that before I book anything.",
        ],
        jaTranslations: [
            'ネットで予約したほうが安いよ。',
            'ネット予約のほうがだいたい安くなるよ。',
            'いつもホテルの公式サイト直接見るんだけど、予約サイトより安いことあるんだよね。',
            'え、マジで？直接見るって発想なかった。予約する前に試してみる。',
        ],
        context: 'deal は「お得な料金」。third-party site は「第三者サイト」（予約サイトのこと）。price match は「価格を合わせてくれる」。loyalty program は「ポイントプログラム」。pro tip は「上級者のコツ」。upgrades は「アップグレード」。ネット予約は今や常識だが直接予約のほうが安い場合も多い。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
    {
        daySlot: 152, japanese: '朝食付きですか？',
        english: [
            'Does it include breakfast?',
            'Is breakfast included in the rate?',
            'Quick question. Does the room rate include breakfast or is that extra?',
            "Yep, it's a buffet. Included in the rate, so you don't have to worry about it.",
        ],
        jaTranslations: [
            '朝食付きですか？',
            '料金に朝食は含まれてますか？',
            'ちょっと聞きたいんですけど、宿泊料金に朝食は入ってますか？別料金ですか？',
            'はい、ビュッフェです。料金込みなので心配いりませんよ。',
        ],
        context: 'included in the rate は「料金に含まれている」。extra は「別料金」。buffet は「ビュッフェ」で英語の発音は「バフェイ」に近い。decent は「まあまあいい」。grab something は「さっと買う」。海外ホテルの朝食は高いことが多い。convenience store はアメリカでは日本ほど充実していない。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },
    {
        daySlot: 152, japanese: '窓側の席をお願いしたい',
        english: [
            'I would like a window seat.',
            'Can I request a window seat please?',
            'If it is not too much trouble, could I get a window seat? I really like watching the clouds.',
            "Let me see what I can do. Looks like fourteen A is still open. I'll assign that for you.",
        ],
        jaTranslations: [
            '窓側の席がいいです。',
            '窓側の席をお願いできますか？',
            'ご迷惑でなければ窓側がいいんですけど。雲を見るのが好きで。',
            '確認しますね。14Aがまだ空いてます。そちらにしておきますね。',
        ],
        context: 'window seat は「窓側の席」。aisle seat は「通路側」。takeoff は「離陸」、landing は「着陸」。blows my mind は「感動する」。lean against は「もたれかかる」。飛行機の座席は window/middle/aisle の3択。middle seat は最も不人気。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 152, japanese: '確認のメールを送ってもらえますか？',
        english: [
            'Can you send a confirmation email?',
            'Could you send me a confirmation email please?',
            'Just to be safe, could you email me a confirmation with all the details?',
            "Absolutely. I'll send it right over. You should have it in your inbox within a few minutes.",
        ],
        jaTranslations: [
            '確認メールを送ってもらえますか？',
            '確認メールをいただけますか？',
            '念のため、詳細が書かれた確認メールを送っていただけますか？',
            'もちろんです。すぐ送りますね。数分以内に届くと思います。',
        ],
        context: 'confirmation は「確認」。in writing は「書面で」。booking details は「予約の詳細」。no record は「記録がない」。nightmare は「悪夢」。just in case は「念のため」。screenshot は「スクリーンショット」。海外では予約のトラブルが本当に多い。確認メールは生命線。',
        character: 'kenji', category: 'request', month: '2026-09',
    },
    {
        daySlot: 152, japanese: 'チェックイン何時からですか？',
        english: [
            'What time is check-in?',
            'What is the earliest I can check in?',
            'We are arriving pretty early. Is there any way to do an early check-in?',
            "We can't guarantee the room, but you're welcome to drop off your bags at the front desk anytime.",
        ],
        jaTranslations: [
            'チェックインは何時からですか？',
            '最短で何時にチェックインできますか？',
            'かなり早く着くんですけど、アーリーチェックインってできますか？',
            'お部屋の保証はできませんが、荷物はいつでもフロントでお預かりしますよ。',
        ],
        context: 'early check-in は「アーリーチェックイン」。drop off は「預ける」。drag は「引きずる」。suitcase は「スーツケース」。that is the worst は「それが最悪」。costs extra は「追加料金がかかる」。海外ホテルのチェックインは3PM、チェックアウトは11AMが標準。',
        character: 'mina', category: 'request', month: '2026-09',
    },
    {
        daySlot: 152, japanese: 'レビューがいいから安心',
        english: [
            'The reviews are good.',
            'It has great reviews so I feel pretty confident.',
            'I read through like fifty reviews and everyone says the staff is super friendly.',
            "Nice, that's reassuring. If the staff is friendly, that's honestly all I care about.",
        ],
        jaTranslations: [
            'レビューがいいよ。',
            'レビューがすごくいいから安心。',
            'レビュー50件くらい読んだけど、みんなスタッフがめっちゃ親切って書いてる。',
            'いいね、安心だわ。スタッフが親切なら正直それだけでいい。',
        ],
        context: 'reviews は「レビュー・口コミ」。stars は「星（評価）」。complaints は「苦情」。life-changing は「人生が変わる」（大げさに褒める表現）。location は「立地」。embarrassing amount of time は「恥ずかしいくらい長い時間」。レビューを読み込むのは現代の旅行準備の必須作業。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
    {
        daySlot: 152, japanese: '予約完了！',
        english: [
            'Booked!',
            'All booked. We are good to go.',
            'I just confirmed the reservation. It is official. We are really doing this.',
            "Wait, it's actually happening? I'm so hyped. I'll Venmo you my share tonight.",
        ],
        jaTranslations: [
            '予約完了！',
            '予約取れた。準備万端。',
            '予約確定した。マジで決まり。ほんとに行くぞこれ。',
            'え、マジで決まったの？テンション上がる。今夜自分の分送金するわ。',
        ],
        context: 'good to go は「準備OK」。official は「正式に決まった」。non-refundable は「返金不可」。who cares は「気にしない」。group chat は「グループチャット」。Venmo は米国の送金アプリ。pay me back は「返金して」。幹事あるある。',
        character: 'master', category: 'request', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 153: パッキング (Packing)
    // Scene: 出発前日、何を持っていくか相談
    // ────────────────────────────────────────────────────

    {
        daySlot: 153, japanese: '荷造り終わった？',
        english: [
            'Are you packed?',
            'Have you finished packing yet?',
            'Please tell me you have already packed. We leave in like twelve hours.',
            "Not even close. I haven't even opened my suitcase yet. I'll figure it out at midnight.",
        ],
        jaTranslations: [
            '荷造り終わった？',
            'もうパッキング終わった？',
            '頼むからもう荷造り終わってると言ってくれ。出発まであと12時間だぞ。',
            '全然。まだスーツケースすら開けてない。夜中にどうにかするわ。',
        ],
        context: 'packed は「荷造り済み」。throwing everything in は「全部突っ込む」。lay out は「広げる」。overpack は「詰め込みすぎる」。英語では Are you packed? と形容詞的に使う。日本語の「荷造り」に直接対応する英語はなく、packing がそのまま使われる。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 153, japanese: '何持っていけばいい？',
        english: [
            'What should I bring?',
            'What do I need to bring? I have no idea what to pack.',
            'This is my first time going somewhere like this. What is essential to bring?',
            "Just bring layers and comfortable shoes. You can buy anything else you need over there.",
        ],
        jaTranslations: [
            '何持っていけばいい？',
            '何持ってく？何パッキングすればいいかわかんない。',
            'こういうとこ行くの初めてなんだけど、絶対必要なもの何？',
            '重ね着できる服と歩きやすい靴だけ持ってけ。あとは現地で買えるから。',
        ],
        context: 'essential は「必須」。overwhelmed は「圧倒されている」。toiletries は「洗面用具」（歯ブラシ、シャンプーなど）。dress shoes は「おしゃれな靴」。help me out は「助けて」。英語圏では toiletries を1つの単語でまとめるのが便利。日本語では1つずつ言いがち。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },
    {
        daySlot: 153, japanese: '着替え何日分持ってく？',
        english: [
            'How many changes of clothes?',
            'How many outfits are you bringing?',
            'I am debating how many changes of clothes to pack. Three days worth or should I plan to do laundry?',
            "Three should be plenty. Just wear the same jeans every day and swap out your tops.",
        ],
        jaTranslations: [
            '着替え何日分？',
            '着替え何セット持ってく？',
            '着替え何日分パッキングするか迷ってる。3日分？それとも洗濯する前提？',
            '3日分で十分。ジーンズ毎日同じの履いてトップスだけ替えろ。',
        ],
        context: 'changes of clothes は「着替え」。outfits は「コーディネート一式」。check a bag は「荷物を預ける」。carry-on は「機内持ち込み」。do laundry は「洗濯する」。gross は「汚い・きたない」。where the line is は「境界線はどこか」。carry-on only は節約旅行の基本。',
        character: 'mina', category: 'request', month: '2026-09',
    },
    {
        daySlot: 153, japanese: '充電器忘れないでね',
        english: [
            'Do not forget your charger.',
            'Make sure you pack your charger.',
            'Whatever you do, do not forget your phone charger. And bring a portable battery too.',
            "Oh shoot, thanks for the reminder. I almost left my power bank on the kitchen counter.",
        ],
        jaTranslations: [
            '充電器忘れないでね。',
            '充電器ちゃんと入れてね。',
            '何があっても充電器だけは忘れるな。あとモバイルバッテリーも持ってけ。',
            'やば、ありがと。モバイルバッテリー台所に置きっぱなしにするとこだった。',
        ],
        context: 'charger は「充電器」。portable battery / power bank は「モバイルバッテリー」。universal adapter は「変換プラグ」。borrowing は「借りる」。Make sure は「確実に〜して」。Never again は「二度とごめん」。海外旅行で充電器を忘れるのは致命的。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
    {
        daySlot: 153, japanese: 'パスポートは持った？',
        english: [
            'Got your passport?',
            'Do you have your passport ready?',
            'Triple check that you have your passport. I am not joking.',
            "Yep, already in my bag. Checked the expiration date too. We're good for another three years.",
        ],
        jaTranslations: [
            'パスポート持った？',
            'パスポート準備できてる？',
            'パスポート三重チェックしろよ。マジで冗談じゃないからな。',
            'うん、もうカバンに入れた。有効期限も確認済み。あと3年大丈夫。',
        ],
        context: 'triple check は「三重チェックする」。expiration date は「有効期限」。validity は「有効性」。checked luggage は「預け荷物」。terminal は「ターミナル」。expired は「期限切れ」。パスポートの残存有効期間（6ヶ月以上）を要求する国は多い。日本人が忘れがちなポイント。',
        character: 'master', category: 'request', month: '2026-09',
    },
    {
        daySlot: 153, japanese: '荷物多すぎない？',
        english: [
            'That is way too much stuff.',
            'Are you seriously bringing all of that?',
            'You are packing like you are moving there permanently. We are going for four days.',
            "I know, I know. But I swear I need all of it. OK maybe not the third pair of shoes.",
        ],
        jaTranslations: [
            '荷物多すぎない？',
            'マジでそれ全部持ってくの？',
            '永住するみたいな荷物の量だな。4日間だぞ。',
            'わかってるわかってる。でも全部必要なの。…靴3足目はいらないかも。',
        ],
        context: 'way too much は「あまりにも多すぎる」。moving there permanently は「永住する」（大げさな表現）。carry-on は「機内持ち込み」。I cannot は「もう無理（呆れ）」。unpack は「荷ほどきする」だがここでは「荷物を減らす」の意味。overpacker は英語でも嫌われる。',
        character: 'kenji', category: 'request', month: '2026-09',
    },
    {
        daySlot: 153, japanese: '薬持っていったほうがいいよ',
        english: [
            'Bring some medicine.',
            'You should bring some medicine just in case.',
            'Pack some basic medicine. You never know when you might need it abroad.',
            "Good thinking. I'll throw in some headache pills and stomach medicine just in case.",
        ],
        jaTranslations: [
            '薬持っていきな。',
            '念のため薬も持っていったほうがいいよ。',
            '基本的な薬は入れとけ。海外でいつ必要になるかわかんないから。',
            'たしかに。頭痛薬と胃薬突っ込んどくわ、念のため。',
        ],
        context: 'medicine kit は「薬セット」。band-aids は「絆創膏」（米ブランド名が一般名化）。allergy medicine は「アレルギーの薬」。the hard way は「痛い経験で」。food poisoning は「食中毒」。pharmacy は「薬局」。海外の薬は日本と成分が違うので自前が安心。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 153, japanese: 'スーツケース重すぎ',
        english: [
            'My suitcase is too heavy.',
            'I cannot even lift this thing. It weighs a ton.',
            'I seriously need to take some stuff out. There is no way this is under the weight limit.',
            "Dude, just take some stuff out. Wear your heaviest jacket on the plane, that saves like two kilos.",
        ],
        jaTranslations: [
            'スーツケース重すぎ。',
            'こんなの持ち上がんない。めちゃくちゃ重い。',
            'マジで何か出さないと。絶対重量オーバーだろこれ。',
            'おい、何か出せって。一番重いジャケット飛行機で着てけ、2キロくらい浮くから。',
        ],
        context: 'weighs a ton は「めちゃくちゃ重い」。weight limit は「重量制限」。overweight baggage は「超過荷物」。shove は「突っ込む」。bathroom scale は「体重計」で荷物を量る裏技。souvenirs は「お土産」。航空各社の重量制限は23kgが標準。超えると追加料金がかなり高い。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },
    {
        daySlot: 153, japanese: '忘れ物チェックリスト作った',
        english: [
            'I made a checklist.',
            'I put together a packing checklist. Want to see it?',
            'I always make a packing checklist so I do not forget anything important.',
            "Oh, send it to me! I was just throwing stuff in randomly and hoping for the best.",
        ],
        jaTranslations: [
            'チェックリスト作った。',
            'パッキングのチェックリスト作った。見る？',
            'いつも忘れ物しないようにチェックリスト作るんだよね。',
            'え、送って！適当に突っ込んでただけだから助かる。',
        ],
        context: 'Type A は「几帳面な性格」。hear me out は「聞いてくれ」。check off は「チェックを入れる」。reusable は「再利用可能な」。sunscreen は「日焼け止め」。thank me は「感謝するよ」。チェックリスト派とギリギリ派の対立は万国共通。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
    {
        daySlot: 153, japanese: 'あとは明日の朝入れるだけ',
        english: [
            'Almost done packing.',
            'I am basically done. Just a few things to add in the morning.',
            'Everything is packed except the stuff I need tonight. I will toss those in tomorrow morning.',
            "Smart. I always forget my toothbrush because I leave it till the last second. Bag-by-the-door trick is genius.",
        ],
        jaTranslations: [
            'もうほとんど終わった。',
            'ほぼ終わり。朝にちょっと入れるだけ。',
            '今夜使うもの以外は全部詰めた。残りは明日の朝放り込むだけ。',
            '賢いな。俺いつもギリギリまで歯ブラシ使うから忘れるんだよ。玄関に置いとく作戦天才だな。',
        ],
        context: 'toss in は「放り込む」。contact lenses は「コンタクトレンズ」。on my way out は「出るとき」。set an alarm は「アラームをセットする」。system は「自分なりのやり方」。朝に入れるものを玄関に置いておくのは英語圏でも定番のテクニック。',
        character: 'mina', category: 'request', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 154: 空港で (At the Airport)
    // Scene: 空港に到着、チェックインから保安検査まで
    // ────────────────────────────────────────────────────

    {
        daySlot: 154, japanese: '空港に着いた',
        english: [
            'We are at the airport.',
            'We made it to the airport. Finally.',
            'We are here. Traffic was insane but we made it with time to spare.',
            "That was way too close. Let's find the check-in counter and then grab a coffee. I need to calm down.",
        ],
        jaTranslations: [
            '空港に着いた。',
            'やっと空港着いた。',
            '着いた。渋滞やばかったけどギリ間に合った。',
            'マジで危なかった。チェックインカウンター探してからコーヒー飲もう。落ち着きたい。',
        ],
        context: 'made it は「間に合った」。time to spare は「余裕がある」。jammed は「渋滞している」。bumper to bumper は「バンパーがくっつくほどの渋滞」。boarding は「搭乗」。check-in counter は「チェックインカウンター」。heart is racing は「心臓がドキドキ」。空港到着の安堵感は万国共通。',
        character: 'yuki', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 154, japanese: 'チェックインお願いします',
        english: [
            'I would like to check in.',
            'Hi, I am checking in for the ten thirty flight to Seoul.',
            'Good morning. I have a reservation under Tanaka for the ten thirty departure to Seoul.',
            "Perfect, I've got your reservation right here. Window or aisle preference for you and your travel companion?",
        ],
        jaTranslations: [
            'チェックインお願いします。',
            'すみません、10時半のソウル行きでチェックインしたいんですが。',
            'おはようございます。10時半出発のソウル行き、田中の名前で予約してるんですが。',
            'はい、ご予約確認できました。お連れ様とご一緒に窓側と通路側、ご希望はありますか？',
        ],
        context: 'checking in for は「〜のチェックインをする」。under Tanaka は「田中の名前で」（予約名を伝えるフレーズ）。departure は「出発」。booking confirmation は「予約確認書」。upgrade options は「アップグレードの選択肢」。空港チェックインは定型表現を覚えるだけで乗り切れる。',
        character: 'takeshi', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 154, japanese: '荷物を預けたい',
        english: [
            'I want to check my bag.',
            'I need to check this bag. Is it within the weight limit?',
            'I have one bag to check. Could you also put a fragile tag on it?',
            "Sure thing. Let me weigh it real quick. Twenty-one kilos, you're all good. I'll add a fragile tag for you.",
        ],
        jaTranslations: [
            '荷物預けたいんですけど。',
            'この荷物預けたいんですが。重量制限大丈夫ですか？',
            '預け荷物1つあるんですけど。壊れ物注意のタグもつけてもらえますか？',
            'はい。ちょっと量りますね。21キロ、大丈夫です。壊れ物タグつけておきますね。',
        ],
        context: 'check a bag は「荷物を預ける」。fragile は「壊れ物注意」で発音は「フラジャイル」。carousel は「ベルトコンベア」（荷物受取所の回転台）。tag/sticker は「シール」。within the weight limit は「重量制限内」。fragile sticker を貼っても雑に扱われるのは空港あるある。',
        character: 'mina', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 154, japanese: '保安検査どこ？',
        english: [
            'Where is security?',
            'Which way to security?',
            'Excuse me, could you point me toward the security checkpoint?',
            "Just follow the signs. It's straight ahead and to the left, past the escalators.",
        ],
        jaTranslations: [
            '保安検査どこ？',
            '保安検査場どっち？',
            'すみません、保安検査場はどちらですか？',
            '案内に従って進んでください。まっすぐ行ってエスカレーター過ぎたら左です。',
        ],
        context: 'security は「保安検査」。checkpoint は「検査場」。point me toward は「方向を教えて」。arrivals/departures は「到着/出発」。information desk は「案内カウンター」。大きな空港では迷うのが普通。follow the signs は「案内標識に従う」。',
        character: 'kenji', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 154, japanese: 'ベルト外してください',
        english: [
            'Please remove your belt.',
            'You need to take off your belt and put it in the tray.',
            'Excuse me sir, please remove your belt, watch, and any metal items and place them in the bin.',
            "Oh right, I totally forgot. Hang on, let me dump everything in the tray before I set off the detector again.",
        ],
        jaTranslations: [
            'ベルト外してください。',
            'ベルト外してトレーに入れてください。',
            'お客様、ベルト、時計、金属類を外してトレーに入れてください。',
            'あ、そうだった忘れてた。ちょっと待って、探知機鳴る前に全部トレーに出すわ。',
        ],
        context: 'remove は「外す」。tray/bin は「トレー」。metal detector は「金属探知機」。set off は「鳴らす」。go through は「通過する」。in line は「列に」。saves time は「時間の節約になる」。保安検査のルールは国によって違い、アメリカは特に厳しい。靴も脱ぐ必要がある。',
        character: 'master', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 154, japanese: '搭乗口どこだっけ？',
        english: [
            'What gate are we?',
            'Which gate is our flight? I forgot already.',
            'I just looked at my boarding pass and our gate is B twelve. Is that far?',
            "B twelve isn't bad. It's only a five-minute walk from here. We've still got plenty of time.",
        ],
        jaTranslations: [
            '搭乗口どこ？',
            'うちらのフライト何番ゲート？もう忘れた。',
            '搭乗券見たらゲートB12なんだけど、遠い？',
            'B12ならそんな遠くない。ここから歩いて5分。まだ全然余裕あるよ。',
        ],
        context: 'gate は「搭乗口」。boarding pass は「搭乗券」。departure board は「出発案内板」。terminal は「ターミナル」。duty-free は「免税店」。head over は「向かう」。搭乗口が変更になるのは空港あるある。常にアナウンスと電光掲示板をチェックすること。',
        character: 'yuki', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 154, japanese: '免税店で何か買う？',
        english: [
            'Want to check out duty-free?',
            'Should we swing by duty-free before we board?',
            'I want to take a quick look at duty-free. I heard they have good deals on sunglasses.',
            "Sure, let's take a quick look. But we gotta be fast, they start boarding in thirty minutes.",
        ],
        jaTranslations: [
            '免税店見る？',
            '搭乗前に免税店寄ってく？',
            '免税店ちょっと見たい。サングラスが安いって聞いた。',
            'いいよ、ちょっとだけな。あと30分で搭乗開始だから急げよ。',
        ],
        context: 'duty-free は「免税店」。swing by は「立ち寄る」。deals は「お得品」。does not count は「カウントしない」。stop me は「止めてくれ」。免税店の「安く感じる」心理は万国共通。実際は市中価格と変わらないことも多い。でもつい買ってしまう。',
        character: 'takeshi', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 154, japanese: '搭乗開始だって',
        english: [
            'They are boarding.',
            'They just announced boarding. Let us go.',
            'They are calling our flight. Zone three. That is us. Let us line up.',
            "Already? That was fast. Let me grab my stuff. Don't wanna lose our overhead bin space.",
        ],
        jaTranslations: [
            '搭乗始まってる。',
            '搭乗のアナウンス来た。行くぞ。',
            'うちらのフライト呼ばれてる。ゾーン3。俺らだ。並ぼう。',
            'もう？早くない？荷物取るわ。頭上の荷物棚の場所取られたくない。',
        ],
        context: 'boarding は「搭乗」。zone は「ゾーン」で搭乗順序の区分け。overhead bin は「頭上の荷物棚」。shove は「押し込む」。Come on は「早く」。英語圏の航空会社はゾーン制搭乗が主流。ビジネスクラスや上級会員が先に乗る。エコノミーは後ろの席から。',
        character: 'lisa', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 154, japanese: '飛行機遅れてるらしい',
        english: [
            'The flight is delayed.',
            'Looks like our flight is delayed by about an hour.',
            'They just announced a one-hour delay. Something about maintenance they said.',
            "Ugh, seriously? Well, at least it's only an hour. Let's grab some food while we wait.",
        ],
        jaTranslations: [
            '飛行機遅れてるって。',
            'うちらのフライト、1時間くらい遅れてるみたい。',
            '1時間遅延だってアナウンスあった。整備がどうとか言ってた。',
            'うわ、マジかよ。まあ1時間だけならいいか。待ってる間に何か食べよう。',
        ],
        context: 'delayed は「遅延」。maintenance issue は「整備上の問題」。messes up は「台無しにする」。take off は「離陸する」。shuttle は「シャトルバス」。Are you kidding me は「マジかよ」。飛行機の遅延は英語で最もストレスのかかる場面。理由を聞いても具体的に教えてくれないことが多い。',
        character: 'kenji', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 154, japanese: 'やっと搭乗できる',
        english: [
            'Finally boarding.',
            'Finally. I thought we would never get on this plane.',
            'About time. I have been sitting in this uncomfortable chair for three hours.',
            "I know, right? My back is killing me from these chairs. Let's get on and never sit in this airport again.",
        ],
        jaTranslations: [
            'やっと搭乗だ。',
            'やっとだよ。もう一生乗れないかと思った。',
            'やっとか。この座り心地最悪な椅子に3時間座ってたわ。',
            'ほんとだよな。この椅子のせいで腰やばい。乗ろう。もうこの空港二度と座りたくない。',
        ],
        context: 'about time は「やっとか」。numb は「しびれた」。overpriced は「高すぎる」。people-watched は「人間観察した」。paradise は「天国」。Thank God は「神様ありがとう」（宗教関係なく使う）。空港での待ち時間の過ごし方は人それぞれだが、退屈は万国共通。',
        character: 'mina', category: 'travel', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 155: 飛行機の中 (On the Plane)
    // Scene: 機内での会話、CAとのやりとり
    // ────────────────────────────────────────────────────

    {
        daySlot: 155, japanese: 'すみません、ここ私の席です',
        english: [
            'Excuse me, this is my seat.',
            'Sorry, I think you might be in my seat.',
            'Excuse me, I think there might be a mix-up. My boarding pass says fourteen A.',
            "Oh, my bad! Let me check. Yep, I'm fourteen B. Sorry about that, I always mix up the letters.",
        ],
        jaTranslations: [
            'すみません、ここ私の席です。',
            'すみません、そこ私の席だと思うんですけど。',
            'すみません、何かの間違いかもしれないんですけど、搭乗券には14Aって書いてあるんですが。',
            'あ、ごめんなさい！確認するね。あ、俺14Bだ。すみません、いつもアルファベット間違えるんです。',
        ],
        context: 'mix-up は「間違い・取り違え」。double-check は「再確認する」。no worries は「大丈夫です」。easy mistake は「よくある間違い」。他人の席に座ってしまうのは飛行機あるある。怒らずに穏やかに指摘するのが英語圏のマナー。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 155, japanese: 'シートベルト締めてください',
        english: [
            'Please fasten your seatbelt.',
            'The seatbelt sign is on. Please buckle up.',
            'Ladies and gentlemen, the captain has turned on the fasten seatbelt sign. Please return to your seats.',
            "Copy that. I was just about to get up, too. Guess I'm staying put for a while.",
        ],
        jaTranslations: [
            'シートベルト締めてください。',
            'シートベルトサイン点灯してます。締めてください。',
            'お客様、機長よりシートベルト着用サインが出ております。お席にお戻りください。',
            '了解。ちょうど立とうとしてたのに。しばらくここにいるしかないな。',
        ],
        context: 'fasten は「締める」。buckle up も同じ意味でよりカジュアル。turbulence は「乱気流」。flight attendant は「客室乗務員」。cabin は「機内」。securely は「しっかりと」。機内アナウンスの英語は定型文なので慣れれば聞き取れる。nothing to worry about は安心させるフレーズ。',
        character: 'master', category: 'request', month: '2026-09',
    },
    {
        daySlot: 155, japanese: 'ブランケットもらえますか？',
        english: [
            'Can I get a blanket?',
            'Excuse me, could I get a blanket please?',
            'Sorry to bother you, but do you have any extra blankets? It is really cold in here.',
            "Sure, let me grab one for you. We've only got a few left, so you're just in time.",
        ],
        jaTranslations: [
            'ブランケットもらえますか？',
            'すみません、毛布もらえますか？',
            'お手数なんですけど、毛布余ってたらいただけますか？めちゃくちゃ寒くて。',
            'はい、お持ちしますね。残り少ないのでギリギリセーフでしたよ。',
        ],
        context: 'blanket は「毛布」。sorry to bother you は「お手数ですが」。freezing は「凍えるほど寒い」。full blast は「最大」。lifesaver は「命の恩人」（大げさに感謝する表現）。機内が寒いのは航空会社の定番クレーム。LCCでは毛布が有料のことも。',
        character: 'mina', category: 'request', month: '2026-09',
    },
    {
        daySlot: 155, japanese: 'お飲み物はいかがですか？',
        english: [
            'Anything to drink?',
            'Can I get you something to drink?',
            'Good afternoon. We have coffee, tea, juice, beer, and wine. What would you like?',
            "Ooh, I'll have a ginger ale and some water please. Wait, is the wine free too? Make it a red.",
        ],
        jaTranslations: [
            'お飲み物は？',
            '何かお飲み物いかがですか？',
            'こんにちは。コーヒー、紅茶、ジュース、ビール、ワインございますが、いかがですか？',
            'おっ、ジンジャーエールと水ください。え、ワインも無料？じゃあ赤で。',
        ],
        context: 'beverage service は「飲み物サービス」。complimentary は「無料の」（free よりフォーマル）。ginger ale は「ジンジャーエール」で機内で人気の飲み物。take your time は「ゆっくりどうぞ」。国際線では飲み物が無料だが、国内線やLCCでは有料のことが多い。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
    {
        daySlot: 155, japanese: 'トマトジュースください',
        english: [
            'Tomato juice please.',
            'Can I have a tomato juice? No ice please.',
            'I will have a tomato juice with no ice. And could I get some extra napkins?',
            "Tomato juice? Really? I don't get it, but you do you. I'll stick with coffee.",
        ],
        jaTranslations: [
            'トマトジュースください。',
            'トマトジュースを氷なしでお願いします。',
            'トマトジュース氷なしで。あとナプキン多めにもらえますか？',
            'トマトジュース？マジで？理解できんけど好きにしろ。俺はコーヒーでいいわ。',
        ],
        context: 'no ice は「氷なし」。napkins は「ナプキン」。cabin pressure は「気圧」。umami は英語でも「ウマミ」が通じる。実際に機内では味覚が変わる研究がある。トマトジュースが機内で人気なのは世界共通の現象。ドイツのルフトハンザでは最も注文される飲み物。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },
    {
        daySlot: 155, japanese: '座席倒してもいいですか？',
        english: [
            'Mind if I recline?',
            'Do you mind if I recline my seat a little?',
            'Hey, I am going to recline my seat a bit. Is that OK with you? I do not want to squish your space.',
            "Yeah, no problem at all. Thanks for asking, most people just slam it back without warning.",
        ],
        jaTranslations: [
            '倒してもいいですか？',
            'シート少し倒してもいいですか？',
            'ちょっとシート倒したいんですけど大丈夫ですか？スペース潰したくないので。',
            'うん、全然大丈夫。聞いてくれてありがとう、大体みんな何も言わずにバーンて倒すから。',
        ],
        context: 'recline は「リクライニングする」。mind if は「〜してもいいですか」。squish は「潰す」。courtesy は「礼儀」。slam は「バーンと倒す」。kicked my seat は「座席を蹴った」。リクライニング問題は飛行機の永遠の論争。聞いてから倒すのがマナー。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 155, japanese: '揺れてるね',
        english: [
            'It is bumpy.',
            'Whoa, that was some serious turbulence.',
            'Is it just me or has the plane been shaking a lot? I am starting to get nervous.',
            "We'll be fine. Planes are built to handle way worse than this. Just keep your seatbelt on.",
        ],
        jaTranslations: [
            '揺れてる。',
            'うわ、今の揺れやばかった。',
            '俺だけ？ずっと揺れてない？ちょっと怖くなってきた。',
            '大丈夫だって。飛行機はこんなもんじゃ壊れない設計になってるから。シートベルトだけしとけ。',
        ],
        context: 'bumpy は「揺れる」。turbulence は「乱気流」。dramatic は「大げさ」。knuckles are white は「握りしめて指が白くなる」。armrest は「肘掛け」。gripping は「握る」。飛行機の揺れに対する反応は人それぞれだが、統計的には飛行機は最も安全な乗り物。',
        character: 'kenji', category: 'request', month: '2026-09',
    },
    {
        daySlot: 155, japanese: 'あと何時間？',
        english: [
            'How much longer?',
            'How many hours left?',
            'I keep checking the flight map. We are only halfway there.',
            "Four more hours. Try to sleep. That's literally the only way to survive a long flight.",
        ],
        jaTranslations: [
            'あと何時間？',
            'あと何時間残ってる？',
            'フライトマップずっと見てるけど、まだ半分だよ。',
            'あと4時間。寝ろ。長距離フライト乗り切るにはマジでそれしかない。',
        ],
        context: 'how much longer は「あとどれくらい」。flight map は「フライトマップ」（画面に表示されるルート）。halfway は「半分」。purgatory は「煉獄」（大げさ表現）。metal tube は飛行機の俗語。長距離フライトの退屈さを表現する英語は豊富。trapped は「閉じ込められた」。',
        character: 'mina', category: 'request', month: '2026-09',
    },
    {
        daySlot: 155, japanese: '機内食おいしくない',
        english: [
            'The food is not great.',
            'This airplane food is pretty terrible honestly.',
            'I was excited about the meal but it tastes like cardboard. I should have eaten at the airport.',
            "Yeah, mine's pretty rough too. At least the cookie's decent. Should've grabbed something at the airport.",
        ],
        jaTranslations: [
            '機内食おいしくない。',
            'この機内食、正直ひどい。',
            '機内食楽しみにしてたのにダンボール食ってるみたい。空港で食っとけばよかった。',
            'うん、俺のもかなりきつい。クッキーだけはまあまあ。空港で買っとけばよかったな。',
        ],
        context: 'cardboard は「ダンボール」（味がないものの比喩）。soggy は「ベチャベチャ」。hard as a rock は「石のように硬い」。edible は「食べられる」。next level は「異次元の」。機内食の質は航空会社によって差が大きい。reputation は「評判」。',
        character: 'master', category: 'request', month: '2026-09',
    },
    {
        daySlot: 155, japanese: 'もうすぐ着陸だって',
        english: [
            'We are about to land.',
            'The pilot just said we are beginning our descent.',
            'They announced we will be landing in about thirty minutes. Finally.',
            "Oh thank God. I can see the coastline. Put your seat up, we're almost there!",
        ],
        jaTranslations: [
            'もうすぐ着陸だって。',
            '機長がもう降下始めるって言ってた。',
            'あと30分で着陸だってアナウンスあった。やっとだ。',
            'やった。海岸線見えてきた。シート戻せ、もうすぐだぞ！',
        ],
        context: 'descent は「降下」。coastline は「海岸線」。tray table は「テーブル」。window shade は「窓のシェード」。stretch my legs は「足を伸ばす」。killing me は「めちゃくちゃ痛い」。着陸前のアナウンスは seats in the upright position, tray tables stowed が定番。',
        character: 'lisa', category: 'request', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 156: 入国審査 (Immigration)
    // Scene: 外国の空港で入国審査を受ける
    // ────────────────────────────────────────────────────

    {
        daySlot: 156, japanese: '入国審査緊張する',
        english: [
            'Immigration makes me nervous.',
            'I always get so nervous at immigration.',
            'Even though I have nothing to hide, going through immigration stresses me out every time.',
            "Relax, you'll be fine. Just say sightseeing, five days, and smile. That's literally all they ask.",
        ],
        jaTranslations: [
            '入国審査緊張する。',
            '入国審査っていつも緊張するんだよね。',
            '何もやましいことないのに、入国審査って毎回ストレスなんだよな。',
            '落ち着け。観光です、5日間です、って言って笑っとけ。聞かれるのマジでそれだけだから。',
        ],
        context: 'immigration は「入国審査」。nervous wreck は「ガチガチに緊張した人」。pull aside は「別室に連れていく」。screening は「検査」。irrational は「理不尽な」。入国審査で緊張するのは非ネイティブの永遠の悩み。何も悪いことしていないのにドキドキする。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 156, japanese: '渡航の目的は？',
        english: [
            'What is the purpose of your visit?',
            'Business or pleasure?',
            'What brings you to the country? How long are you planning to stay?',
            "Sightseeing, five days. I've got my hotel reservation and return ticket right here if you need them.",
        ],
        jaTranslations: [
            '渡航の目的は何ですか？',
            'ビジネスですか、観光ですか？',
            '今回の渡航の目的は何ですか？滞在期間はどのくらいですか？',
            '観光です、5日間です。ホテルの予約確認書と帰りのチケットもここにあります。',
        ],
        context: 'purpose of your visit は「渡航目的」。sightseeing は「観光」。business or pleasure は入国審査官の定番質問。declare は「申告する」。agricultural products は「農産物」。return ticket は「帰りの航空券」。入国審査は質問が決まっているので事前に練習しておくと楽。',
        character: 'master', category: 'request', month: '2026-09',
    },
    {
        daySlot: 156, japanese: '観光です。5日間です',
        english: [
            'Sightseeing. Five days.',
            'I am here for sightseeing. I am staying for five days.',
            'I am here on vacation. I will be staying for five days at the Hilton downtown.',
            "Sounds good. Welcome to the country. Enjoy your stay and have a great time.",
        ],
        jaTranslations: [
            '観光です。5日間です。',
            '観光で来ました。5日間滞在します。',
            '休暇で来ました。ダウンタウンのヒルトンに5泊します。',
            'はい、大丈夫です。ようこそ。素敵な滞在をお過ごしください。',
        ],
        context: 'sightseeing/tourism は「観光」。on vacation は「休暇で」。city center/downtown は「市中心部」。入国審査では簡潔に答えるのが鉄則。聞かれていないことまで話す必要はない。でも緊張すると逆にベラベラ喋ってしまう人もいる。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },
    {
        daySlot: 156, japanese: '申告するものはありません',
        english: [
            'Nothing to declare.',
            'I do not have anything to declare.',
            'No food, no plants, no large amounts of cash. Nothing to declare.',
            "Alright, go ahead through. Green lane is on your left. Welcome and enjoy your trip.",
        ],
        jaTranslations: [
            '申告するものはありません。',
            '申告するものは何もありません。',
            '食品、植物、多額の現金もないです。申告するものはありません。',
            'はい、どうぞお通りください。左手のグリーンレーンからどうぞ。良い旅を。',
        ],
        context: 'declare は「申告する」。restricted は「制限品」。smuggle は「密輸する」。food items は「食品類」。税関申告でチョコレートが引っかかるかどうかは国による。duty-free で買った物は基本OK。でも不安になるのが日本人あるある。',
        character: 'mina', category: 'request', month: '2026-09',
    },
    {
        daySlot: 156, japanese: 'スタンプ押してもらえますか？',
        english: [
            'Can I get a stamp?',
            'Could I get a passport stamp please?',
            'I know a lot of countries do it electronically now but could I get a physical stamp in my passport?',
            "Ha, sure thing. Not many people ask for stamps anymore. There you go. Nice collection you've got.",
        ],
        jaTranslations: [
            'スタンプもらえますか？',
            'パスポートにスタンプ押してもらえますか？',
            '最近電子化してる国多いのはわかってるんですけど、パスポートにスタンプ押してもらえますか？',
            'はは、いいですよ。最近スタンプ欲しがる人少ないんだけどね。はいどうぞ。いいコレクションだね。',
        ],
        context: 'stamp は「スタンプ」。electronically/digitally は「電子的に」。running out of pages は「ページが足りなくなる」。パスポートスタンプは記念になるが、最近は電子化で押さない国が増えている。日本のパスポートは査証ページを増補できる。collect は「集める」。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 156, japanese: '指紋取るの？',
        english: [
            'Fingerprints?',
            'Do I need to give my fingerprints?',
            'Is this where I scan my fingerprints? Which hand first?',
            "Left hand first, all four fingers flat on the scanner. Now the right. Good. Now both thumbs. Perfect, you're all set.",
        ],
        jaTranslations: [
            '指紋取るの？',
            '指紋取る必要あるんですか？',
            'ここで指紋スキャンするんですか？どっちの手から？',
            '左手から。4本の指をスキャナーに平らに置いて。次は右手。はい。次は両方の親指。完了です。',
        ],
        context: 'fingerprints は「指紋」。register は「認識される」。sweaty は「汗ばんだ」。mugshot は「犯罪者の顔写真」。straight face は「真顔」。アメリカやブラジルなどでは入国時に全10指の指紋を取る。日本の入国審査でも外国人の指紋を取る。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },
    {
        daySlot: 156, japanese: '別室に呼ばれた',
        english: [
            'They pulled me aside.',
            'I got pulled into a secondary screening room.',
            'They asked me to step into a separate room for additional questions. I am freaking out.',
            "Oh no, are you OK? What did they ask? I'm glad they let you through. You look super pale.",
        ],
        jaTranslations: [
            '別室に呼ばれた。',
            '二次審査の部屋に連れていかれた。',
            '別室で追加の質問があるって言われた。めちゃくちゃビビってる。',
            'うわ、大丈夫？何聞かれた？通してもらえてよかった。めっちゃ顔色悪いよ。',
        ],
        context: 'pulled aside は「別室送りになった」。secondary screening は「二次審査」。freaking out は「パニックになる」。froze up は「固まった」。take your time は「ゆっくりどうぞ」。relieved は「ホッとした」。別室送りは怖いが珍しくない。ランダムに選ばれることもある。',
        character: 'kenji', category: 'request', month: '2026-09',
    },
    {
        daySlot: 156, japanese: '入国カードの書き方わからない',
        english: [
            'How do I fill this out?',
            'Excuse me, how do I fill out this arrival card?',
            'I am not sure what to put for address in country. Can I just write my hotel name?',
            "Just put your hotel name for the address and check the tourism box. That's all they really care about.",
        ],
        jaTranslations: [
            'これどうやって書くの？',
            'すみません、この入国カードの書き方がわからないんですけど。',
            '滞在先住所って何書けばいいのかわかんない。ホテル名でいい？',
            '住所のとこはホテル名書いて、観光にチェック入れとけ。見てるのそこだけだから。',
        ],
        context: 'fill out は「記入する」。arrival card は「入国カード」。occupation は「職業」。maiden name は「旧姓」。fields は「記入欄」。入国カードは事前にネットで記入例を調べておくと安心。最近はオンラインで事前入力できる国も増えている。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
    {
        daySlot: 156, japanese: '無事通過した',
        english: [
            'I made it through.',
            'I passed immigration. What a relief.',
            'I am through. That was way more stressful than it needed to be.',
            "See? I told you it'd be fine. Now let's go find our bags before the carousel gets crowded.",
        ],
        jaTranslations: [
            '通過した。',
            '入国審査通った。ホッとした。',
            '通った。必要以上にストレスかかったわ。',
            'ほら、大丈夫って言っただろ。混む前に荷物取りに行こう。',
        ],
        context: 'made it through は「通過した」。relief は「安堵」。rehearsing は「リハーサルする」。worst-case scenarios は「最悪のシナリオ」。interrogation は「取り調べ」。overthinker は「考えすぎる人」。入国審査後の解放感は格別。45分並んで30秒で終わるのはあるある。',
        character: 'mina', category: 'request', month: '2026-09',
    },
    {
        daySlot: 156, japanese: 'ビザいるんだっけ？',
        english: [
            'Do I need a visa?',
            'Wait, do we need a visa for this country?',
            'I just realized I never checked if Japanese passport holders need a visa. Does anyone know?',
            "Don't worry, I checked. Japanese passports don't need a visa here. We're good for up to ninety days.",
        ],
        jaTranslations: [
            'ビザいるんだっけ？',
            'ちょっと待って、この国ビザいるの？',
            '今気づいたんだけど日本のパスポートでビザいるか確認してなかった。誰か知ってる？',
            '大丈夫、調べた。日本のパスポートはここビザ不要。90日までOK。',
        ],
        context: 'visa は「ビザ」。visa-free access は「ビザ免除」。ESTA は米国の電子渡航認証。ETA はカナダやオーストラリアの同様のシステム。apply online は「オンラインで申請する」。panicking は「パニックになっている」。日本のパスポートは世界最強クラスでビザ免除国が多い。',
        character: 'master', category: 'request', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 157: 到着 (Arrival)
    // Scene: 入国後、荷物を受け取って外に出る
    // ────────────────────────────────────────────────────

    {
        daySlot: 157, japanese: '荷物どこで受け取るの？',
        english: [
            'Where is baggage claim?',
            'Which way to baggage claim?',
            'We need to find the baggage carousel. I think it is this way. Follow the signs.',
            "I think it's downstairs. The monitors say carousel four for our flight. Let's head over before it gets packed.",
        ],
        jaTranslations: [
            '荷物どこで受け取るの？',
            '手荷物受取所どっち？',
            '荷物のベルトコンベア探さないと。こっちだと思う。標識に従おう。',
            '下の階じゃない？モニターにうちらのフライトはカルーセル4って出てる。混む前に行こう。',
        ],
        context: 'baggage claim は「手荷物受取所」。carousel は「回転コンベア」。monitors は「モニター」。come around は「回ってくる」。convinced は「確信した」。lost it は「紛失した」。自分の荷物が最後に出てくるときの不安は世界共通。belt は carousel と同義。',
        character: 'yuki', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 157, japanese: '荷物が出てこない',
        english: [
            'My bag is not here.',
            'I do not see my bag anywhere. Everyone else has left.',
            'The carousel stopped and my bag never came out. I think they lost my luggage.',
            "Don't panic yet. Go to the lost baggage counter over there. They usually find it within a day or two.",
        ],
        jaTranslations: [
            '荷物がない。',
            '俺の荷物どこにもないんだけど。みんなもう行っちゃったし。',
            'ベルト止まったのに俺の荷物出てこなかった。ロストバゲージだと思う。',
            'まだパニックになるな。あそこの手荷物紛失カウンター行け。大体1-2日で見つかるから。',
        ],
        context: 'lost luggage/baggage は「ロストバゲージ」。carousel stopped は「ベルトが止まった」。lost baggage counter は「手荷物紛失カウンター」。worst nightmare は「最悪の悪夢」。ruined は「台無し」。ロストバゲージは統計的に1000個に6個くらいの確率。ほとんどは1-2日で届く。',
        character: 'takeshi', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 157, japanese: 'タクシー乗り場どこですか？',
        english: [
            'Where is the taxi stand?',
            'Excuse me, where can I catch a taxi?',
            'We need to get to our hotel. Is there an official taxi stand or should we use a ride app?',
            "It's right outside exit three. There's a flat rate to downtown, around thirty bucks. Stick to the official line.",
        ],
        jaTranslations: [
            'タクシー乗り場どこですか？',
            'すみません、タクシーはどこで乗れますか？',
            'ホテルまで行きたいんですけど、公式のタクシー乗り場ありますか？配車アプリのほうがいい？',
            '出口3の外にあるよ。市内まで定額で30ドルくらい。公式の列に並べ。',
        ],
        context: 'taxi stand は「タクシー乗り場」。catch a taxi は「タクシーを捕まえる」。ride app/ride-sharing は「配車アプリ」。ripped off は「ぼったくられる」。fixed-rate は「定額」。unofficial は「非公式の」。空港タクシーのぼったくりは世界中で問題。公式タクシー乗り場を使うのが安全。',
        character: 'kenji', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 157, japanese: '両替したい',
        english: [
            'I need to exchange money.',
            'Where can I exchange money? Is there a good rate here?',
            'I want to exchange some yen to dollars. Is the rate better here or in the city?',
            "Just grab a little bit here for the taxi and use your credit card for the rest. The airport rate is awful.",
        ],
        jaTranslations: [
            '両替したい。',
            'どこで両替できる？レートいいとこある？',
            '円をドルに替えたいんだけど、空港と市内どっちがレートいい？',
            'タクシー代くらいだけここで替えて、あとはクレカ使え。空港のレートは最悪だから。',
        ],
        context: 'exchange money は「両替する」。rate は「レート」。ATM は「ATM」（海外ではキャッシングが便利）。空港の両替レートは悪いのが定説。クレジットカードが最もレートがいい場合が多い。ただし海外ATM手数料に注意。downtown は「市内中心部」。',
        character: 'mina', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 157, japanese: 'SIMカード買いたい',
        english: [
            'I need a SIM card.',
            'Where can I buy a local SIM card?',
            'Is there a shop here where I can get a prepaid SIM? I need data for maps and translation.',
            "There's a counter right past customs. Five gigs for five days should run you about fifteen bucks.",
        ],
        jaTranslations: [
            'SIMカード買いたい。',
            '現地のSIMカードどこで買える？',
            'プリペイドSIM買えるとこある？地図と翻訳アプリ用にデータ通信が必要で。',
            '税関過ぎたとこにカウンターあるよ。5日間5ギガで15ドルくらい。',
        ],
        context: 'SIM card は「SIMカード」。prepaid は「プリペイド」。data は「データ通信」。eSIM は「eSIM」で物理SIM不要。gigs は gigabytes の略。arrivals hall は「到着ロビー」。vending machine は「自動販売機」。海外旅行でのSIMカード確保は現代の最優先事項。',
        character: 'lisa', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 157, japanese: 'ホテルまでどうやって行く？',
        english: [
            'How do we get to the hotel?',
            'What is the best way to get to our hotel from here?',
            'Should we take a taxi, the train, or the airport shuttle to the hotel?',
            "I vote train. It's cheap, fast, and way less stressful than dealing with traffic right now.",
        ],
        jaTranslations: [
            'ホテルまでどうやって行く？',
            'ここからホテルまで一番いい行き方は？',
            'タクシー、電車、空港シャトル、ホテルまでどれがいい？',
            '電車に一票。安いし速いし、今の時間帯渋滞に巻き込まれるよりよっぽど楽。',
        ],
        context: 'airport express は「空港特急」。shuttle bus は「シャトルバス」。bang for our buck は「コスパが良い」。grab a taxi は「タクシーに乗る」。空港から市内への移動手段は旅の最初の関門。事前に調べておくのが鉄則。初めての国だと電車の券売機すら難しい。',
        character: 'master', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 157, japanese: 'Wi-Fiつながる？',
        english: [
            'Is there Wi-Fi here?',
            'Can you find a Wi-Fi signal? I cannot connect.',
            'I am trying to connect to the airport Wi-Fi but it keeps asking for a password.',
            "Here, use my hotspot. The password is all lowercase. Just send your message real quick.",
        ],
        jaTranslations: [
            'Wi-Fiあるここ？',
            'Wi-Fiの電波見つかる？つながらないんだけど。',
            '空港のWi-Fiにつなごうとしてるんだけどパスワード聞かれてつながらない。',
            'ほら、俺のテザリング使え。パスワード全部小文字。とりあえずメッセージだけ送れ。',
        ],
        context: 'Wi-Fi は「ワイファイ」。connect は「接続する」。hotspot は「テザリング」。chicken-and-egg problem は「鶏と卵の問題」（どちらが先か）。register は「登録する」。空港の無料Wi-Fiはメールアドレス登録が必要なことが多い。通信確保は到着直後の最優先事項。',
        character: 'yuki', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 157, japanese: 'やっと外に出た',
        english: [
            'We are finally outside.',
            'We finally made it out of the airport.',
            'After two hours of immigration, baggage, and customs, we are finally free.',
            "Man, that took forever. But we're here now. Smell that air, it's totally different. I love it.",
        ],
        jaTranslations: [
            'やっと外に出た。',
            'やっと空港から出られた。',
            '入国審査、荷物受取、税関で2時間かかったけど、やっと自由だ。',
            'いやー長かった。でもついに来たぞ。この空気嗅いでみ、全然違う。最高だな。',
        ],
        context: 'made it out は「出られた」。customs は「税関」。fresh air は「新鮮な空気」。adventure は「冒険」。到着してから外に出るまでが長いのは国際線あるある。外に出た瞬間の解放感と異国感は旅行の醍醐味。空気の匂いが違うのは本当。',
        character: 'takeshi', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 157, japanese: '暑い！聞いてたのと違う',
        english: [
            'It is so hot!',
            'Wow, it is way hotter than I expected.',
            'Nobody told me it would be this humid. I am already sweating through my shirt.',
            "Told you to check the humidity, not just the temperature. Let's find some AC before we melt.",
        ],
        jaTranslations: [
            '暑っ！',
            'うわ、想像よりめちゃくちゃ暑い。',
            'こんなに蒸し暑いなんて誰も言ってなかったんだけど。もう服に汗染みてる。',
            '湿度もチェックしろって言っただろ、気温だけじゃなくて。溶ける前にエアコンあるとこ探そう。',
        ],
        context: 'humid は「蒸し暑い」。humidity は「湿度」。sweating through は「汗が染みる」。drenched は「びしょ濡れ」。fogged up は「曇った」。tropical は「熱帯の」。天気予報と実際の体感温度の差は海外で特に大きい。湿度を考慮していないことが原因。',
        character: 'mina', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 157, japanese: 'ホテルに向かおう',
        english: [
            'Let us head to the hotel.',
            'Come on, let us get to the hotel. I need a shower.',
            'I cannot wait to check in and take a shower. Let us go. The sooner the better.',
            "Yes please. I'm dying for a shower. Let's figure out sightseeing after we crash for a bit.",
        ],
        jaTranslations: [
            'ホテル行こう。',
            'ホテル行こう。シャワー浴びたい。',
            'もうチェックインしてシャワー浴びたくてたまらない。行こう。早ければ早いほどいい。',
            'マジで頼む。シャワー浴びたくて死にそう。観光の計画はちょっと休んでからにしよう。',
        ],
        context: 'head to は「向かう」。desperately は「切実に」。pull up は「表示する」。stick together は「一緒にいる」。first things first は「まずは大事なことから」。到着後はホテルで休むのが最優先。疲れた状態で観光しても楽しめない。let us move は「行くぞ」の号令。',
        character: 'kenji', category: 'travel', month: '2026-09',
    },

];

// ============================================================
// WEEK 21 DAY THEMES
// ============================================================

export const MONTH6_W21_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    151: {
        title: '旅行を計画する', titleEn: 'Planning a Trip', category: 'travel',
        scene: 'ユキが秋の連休にどこか行きたいと言い出し、みんなで行き先を相談する',
        keywords: [
            { en: 'destination', ja: '行き先', pron: 'デスティネーション', example: 'Let us pick a destination.', note: '旅行の「目的地」。Where are you going? よりも destination と言えると一気にこなれた感じになる。' },
            { en: 'budget', ja: '予算', pron: 'バジェット', example: 'What is the budget for this trip?', note: '旅行から日常まで使える。budget-friendly=お手頃な、on a tight budget=予算がきつい。' },
            { en: 'itinerary', ja: '旅程表', pron: 'アイティナラリー', example: 'I put together a rough itinerary.', note: '発音が難しい単語No.1。アイ・ティ・ナ・ラ・リー。schedule より旅行っぽい。' },
            { en: 'long weekend', ja: '連休', pron: 'ロングウィーケンド', example: 'Got any plans for the long weekend?', note: '3連休。golden week のような大型連休は holiday week, vacation week と言う。' },
            { en: 'wing it', ja: 'ぶっつけ本番で行く', pron: 'ウィングイット', example: 'Let us just wing it and see what happens.', note: '計画なしで行く。improvise に近いが wing it のほうがカジュアル。旅行でよく使う。' },
        ],
    },
    152: {
        title: '予約する', titleEn: 'Making Reservations', category: 'request',
        scene: 'ユキがホテルと飛行機をネットと電話で予約する',
        keywords: [
            { en: 'availability', ja: '空き状況', pron: 'アベイラビリティ', example: 'Do you have any availability for September?', note: '「空いていますか」を一語で。available は形容詞、availability は名詞。ホテル、レストラン、病院、何でも使える。' },
            { en: 'confirmation', ja: '確認', pron: 'コンファメーション', example: 'Can you send me a confirmation email?', note: 'confirm=確認する の名詞形。confirmation number=予約番号。海外旅行では確認メールのスクショが命。' },
            { en: 'cancellation policy', ja: 'キャンセル規定', pron: 'キャンセレーションポリシー', example: 'What is your cancellation policy?', note: '予約時に必ず確認すべき項目。non-refundable=返金不可。free cancellation=無料キャンセル。' },
            { en: 'check-in / check-out', ja: 'チェックイン/チェックアウト', pron: 'チェックイン/チェックアウト', example: 'What time is check-in?', note: '標準は check-in 3PM, check-out 11AM。early check-in, late check-out は追加料金の場合が多い。' },
            { en: 'complimentary', ja: '無料の', pron: 'コンプリメンタリー', example: 'Breakfast is complimentary.', note: 'free よりフォーマルで上品。ホテル、航空会社がよく使う。complimentary Wi-Fi, complimentary shuttle など。' },
        ],
    },
    153: {
        title: 'パッキング', titleEn: 'Packing', category: 'request',
        scene: '出発前日、みんなで荷造りの相談。何を持っていくか議論',
        keywords: [
            { en: 'carry-on', ja: '機内持ち込み', pron: 'キャリーオン', example: 'Can I fit this in my carry-on?', note: '機内持ち込み荷物。carry-on bag, carry-on luggage。checked bag=預け荷物と対になる。' },
            { en: 'toiletries', ja: '洗面用具', pron: 'トイレトリーズ', example: 'Do not forget your toiletries.', note: '歯ブラシ、シャンプー、石鹸などの総称。日本語では一つずつ言うが英語はこの一語でまとめる。' },
            { en: 'overpack', ja: '荷物を詰め込みすぎる', pron: 'オーバーパック', example: 'I always overpack on vacation.', note: 'over + pack で「詰めすぎ」。反対は pack light=身軽に。overpacker は「荷物が多い人」。' },
            { en: 'weight limit', ja: '重量制限', pron: 'ウェイトリミット', example: 'My bag is over the weight limit.', note: '航空会社の預け荷物は通常23kg。overweight baggage=超過荷物で追加料金が高い。' },
            { en: 'checklist', ja: 'チェックリスト', pron: 'チェックリスト', example: 'I made a packing checklist.', note: 'check off=チェックを入れる。packing list とも言う。忘れ物防止の基本ツール。' },
        ],
    },
    154: {
        title: '空港で', titleEn: 'At the Airport', category: 'travel',
        scene: '空港到着からチェックイン、保安検査、搭乗まで',
        keywords: [
            { en: 'boarding pass', ja: '搭乗券', pron: 'ボーディングパス', example: 'Can I see your boarding pass?', note: '搭乗券。boarding time=搭乗時間。boarding gate=搭乗口。最近はスマホの電子版が主流。' },
            { en: 'gate', ja: '搭乗口', pron: 'ゲート', example: 'What gate is our flight?', note: '搭乗口。gate change=搭乗口変更は空港あるある。常に出発案内板をチェック。' },
            { en: 'security checkpoint', ja: '保安検査場', pron: 'セキュリティチェックポイント', example: 'The line at security is crazy long.', note: '略して security。TSA はアメリカの保安検査機関。液体は100ml以下のジップロック袋に入れる。' },
            { en: 'duty-free', ja: '免税店', pron: 'デューティーフリー', example: 'Let us swing by duty-free.', note: 'duty=関税。tax-free は消費税免除、duty-free は関税免除で厳密には違うが日常では混同される。' },
            { en: 'delayed', ja: '遅延', pron: 'ディレイド', example: 'Our flight is delayed by an hour.', note: 'delay の過去分詞。on time=定刻通り。canceled=欠航。delayed は受動態で使うのが自然。' },
        ],
    },
    155: {
        title: '飛行機の中', titleEn: 'On the Plane', category: 'request',
        scene: '機内での会話。座席トラブル、CAとのやりとり、揺れへの反応',
        keywords: [
            { en: 'recline', ja: 'リクライニングする', pron: 'リクライン', example: 'Do you mind if I recline my seat?', note: '座席を倒すこと。recline は「後ろに倒す」。upright position=背もたれを元に戻す。' },
            { en: 'turbulence', ja: '乱気流', pron: 'タービュランス', example: 'We hit some turbulence over the Pacific.', note: '乱気流。bumpy は形容詞で「揺れる」。clear-air turbulence=晴天乱流は予測困難。' },
            { en: 'beverage', ja: '飲み物', pron: 'ベバレッジ', example: 'We are starting our beverage service.', note: 'drink のフォーマル版。機内アナウンスでよく聞く。beverage service=飲み物サービス。' },
            { en: 'overhead bin', ja: '頭上の荷物棚', pron: 'オーバーヘッドビン', example: 'There is no space in the overhead bin.', note: '機内の上の棚。compartment とも言う。満席だと空きがなくなる。早めに搭乗するのがコツ。' },
            { en: 'descent', ja: '降下', pron: 'ディセント', example: 'We are beginning our descent.', note: '飛行機の降下。ascent=上昇の反対。final approach=最終着陸態勢。着陸準備のアナウンスで聞く。' },
        ],
    },
    156: {
        title: '入国審査', titleEn: 'Immigration', category: 'request',
        scene: '外国の空港で入国審査を受ける。質問への受け答え',
        keywords: [
            { en: 'immigration', ja: '入国審査', pron: 'イミグレーション', example: 'The immigration line is so long.', note: '入国審査。immigration officer=入国審査官。customs=税関とは別。immigration は人、customs は物のチェック。' },
            { en: 'declare', ja: '申告する', pron: 'ディクレア', example: 'I have nothing to declare.', note: '税関で使う。declaration form=申告書。anything to declare は税関の定番質問。' },
            { en: 'purpose of visit', ja: '渡航目的', pron: 'パーパスオブビジット', example: 'What is the purpose of your visit?', note: '入国審査の最頻出質問。sightseeing/tourism/business/visiting family のどれかで答える。' },
            { en: 'visa', ja: 'ビザ', pron: 'ビザ', example: 'Do Japanese citizens need a visa?', note: '査証。visa-free=ビザ不要。ESTA(米)、ETA(加)、eVisitor(豪)は電子渡航認証で厳密にはビザではない。' },
            { en: 'valid', ja: '有効な', pron: 'バリッド', example: 'Make sure your passport is valid for at least six months.', note: 'valid=有効、expired=期限切れ。validity=有効性。残存有効期間6ヶ月以上を要求する国は多い。' },
        ],
    },
    157: {
        title: '到着', titleEn: 'Arrival', category: 'travel',
        scene: '入国後、荷物を受け取り、両替やSIMカードを手配して外へ',
        keywords: [
            { en: 'baggage claim', ja: '手荷物受取所', pron: 'バゲッジクレーム', example: 'Follow the signs to baggage claim.', note: 'baggage carousel=荷物が回るベルト。lost luggage=ロストバゲージ。claim は「請求する」が語源。' },
            { en: 'exchange rate', ja: '為替レート', pron: 'エクスチェンジレート', example: 'The exchange rate at the airport is terrible.', note: '空港の両替レートは悪いのが世界共通。ATMキャッシングかクレジットカード払いが最もレートが良い場合が多い。' },
            { en: 'shuttle', ja: 'シャトルバス', pron: 'シャトル', example: 'Is there a shuttle to the hotel?', note: '空港⇔ホテル、空港⇔市内を往復する送迎バス。complimentary shuttle=無料送迎もある。' },
            { en: 'SIM card', ja: 'SIMカード', pron: 'シムカード', example: 'I need to buy a local SIM card.', note: 'prepaid SIM=プリペイドSIM。eSIM は物理カード不要でQRコード設定。data plan=データプラン。' },
            { en: 'jet lag', ja: '時差ボケ', pron: 'ジェットラグ', example: 'The jet lag is going to hit me hard.', note: 'jet lag は名詞、jet-lagged は形容詞。hit me hard=ひどくやられる。東行きのほうが西行きよりキツいと言われる。' },
        ],
    },
};
