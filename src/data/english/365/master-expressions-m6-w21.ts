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
            'I appreciate that. Seriously.',
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
            'Nice! Any plans?',
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
            'Yeah, I can totally see that.',
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
            'I appreciate that. Seriously.',
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
            'Born ready! Let\'s go.',
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
            'Say no more! Let\'s make it happen.',
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
            'Wait, really?! That\'s fascinating.',
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
            'Oh, international? That\'s exciting!',
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
            'Oh nice! Where are you going?',
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
            'Same here! Can\'t wait.',
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
            'Done! I booked us a table for seven.',
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
            'Say no more! Let\'s make it happen.',
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
            'Interesting! Tell me more about that.',
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
            'Done! I booked us a table for seven.',
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
            'I\'m so hungry. Let\'s order right away.',
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
            'Leave it to me! Consider it done.',
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
            'Got it! I\'ll get back to you ASAP.',
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
            'Of course! Right this way.',
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
            'Me too! Great minds think alike.',
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
            'Done! I booked us a table for seven.',
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
            'Born ready! Let\'s go.',
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
            'Welcome! You\'re gonna love it.',
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
            'Yeah, I can totally see that.',
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
            'Here, use my charger. I\'ve got one.',
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
            'Yeah, totally! That\'s a great point.',
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
            'Me too! Great minds think alike.',
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
            'Did you take it already? Don\'t skip doses.',
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
            'Say no more! Let\'s make it happen.',
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
            'It happens! Don\'t beat yourself up.',
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
            'Sounds like a plan! See you tomorrow then.',
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
            'When\'s your flight? Don\'t cut it too close!',
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
            'Leave it to me! Consider it done.',
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
            'Sure! We\'ll keep them safe for you.',
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
            'No worries! What can I do for you?',
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
            'No worries! What can I do for you?',
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
            'Oh wow, you\'re right! Good eye.',
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
            'I know, right? It gets confusing.',
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
            'Ha, that\'s so true! Love it.',
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
            'You\'re fine! Don\'t stress about it.',
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
            'Ha, that\'s a great way to put it!',
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
            'Don\'t worry about it! Seriously.',
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
            'Ha, that\'s a great way to put it!',
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
            'Honestly, don\'t even worry about it. We\'re good.',
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
            'Count me in! What are we having?',
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
            'Of course! Go right ahead.',
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
            'Say no more! Let\'s make it happen.',
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
            'Hey, relax. Everything\'s going to be fine.',
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
            'Wow, I had no idea! That\'s cool.',
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
            'Me too! Great minds think alike.',
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
            'Yeah, totally! That\'s a great point.',
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
            'Deep breaths! You\'ve got this.',
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
            'Go for it! Nothing to lose, right?',
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
            'There\'s so much to see! Where do you wanna start?',
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
            'Huh, I never thought about it that way!',
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
            'Of course! Go right ahead.',
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
            'You know what, you\'re absolutely right.',
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
            'Oh, for sure. I\'ve noticed that too.',
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
            'No worries! Let me break it down for you.',
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
            'Say no more! Let\'s make it happen.',
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
            'Oh really? Tell me more!',
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
            'Hmm, good question. What do you think?',
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
            'Hmm, good question. What do you think?',
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
            'Want me to call one? It\'ll be faster.',
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
            'Say no more! Let\'s make it happen.',
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
            'There\'s a shop nearby that can sort that out.',
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
            'How\'s your place? Mine\'s a quick walk from here.',
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
            'Let me check... try this password.',
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
            'Oh, for sure. I\'ve noticed that too.',
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
            'Ugh, it\'s boiling out there. Stay hydrated!',
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
            'How\'s your place? Mine\'s a quick walk from here.',
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
