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
            "I do not know what it is but I have been getting this urge to just go somewhere. Anywhere. I do not even care where. I just need a change of scenery. Work has been so monotonous lately and I feel like if I do not plan something fun soon I am going to lose my mind. Do you guys ever get like that?",
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
            "So the long weekend is like two weeks away and I have not planned anything yet. I know I should have booked something earlier because everything is going to be crazy expensive now. But here we are. Have you guys figured out what you are doing? I am open to anything honestly. Road trip, beach, mountains, whatever.",
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
            "OK before we start dreaming about five-star resorts and business class flights, let us talk numbers. What is everyone actually comfortable spending? I do not want to plan this whole thing and then someone is like oh that is too much. Let us just be upfront about it. I am thinking maybe around five hundred bucks for the whole trip. Is that reasonable?",
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
            "Do people still buy guidebooks? I feel like the last time I bought one was maybe ten years ago and I did not even open it. Everything is on Google Maps and TripAdvisor now. But you know what, there is something nice about flipping through a physical book and discovering places you would never find online. Maybe I am old school but I kind of miss that.",
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
            "OK we have been talking about this for an hour and we still have not decided anything. That is so typical of us. Someone suggest a place, everyone says maybe, and then nobody commits. How about this. Everyone writes down their top pick on a napkin and we go with the majority. Done. No more debating. Life is too short to spend it planning a trip we never take.",
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
            "So when are we actually doing this? I need to check with my boss because if I do not put in my time off request at least two weeks in advance she gets all annoyed. And honestly everyone else at the office is probably trying to take the same days off. First come first served, right? So the sooner we decide the better. Can we nail it down tonight?",
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
            "Give me a day or two and I will put together a few options. I am actually pretty good at finding deals online. I have a bunch of travel apps and I always check multiple sites before booking anything. There is this one trick where you search in incognito mode so the prices do not go up every time you check. Saves you like twenty percent sometimes.",
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
            "So here is the big question. Do we want to stay in the country or go abroad? Going international sounds amazing but it is way more of a commitment. Passports, currency exchange, jet lag, the whole nine yards. Domestic is easier to plan and cheaper usually. But then again, when was the last time any of us left the country? Maybe it is time to do something bold.",
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
            "Here is the thing. Package tours are convenient because everything is planned for you. Hotels, meals, transportation, all taken care of. But you are stuck on their schedule and you can never just wander off and explore on your own. Independent travel is more work upfront but you have complete freedom. Personally I hate being herded around like cattle but I get why some people prefer the structure.",
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
            "You know what I realized? The best part of any trip is not the trip itself. It is this. Right now. Sitting around, throwing out ideas, getting excited about places we might go. The anticipation is the best part. Once you are actually there you are stressed about directions and schedules and making sure you do not miss anything. But right now it is all pure possibility. Enjoy this moment.",
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
            "Hi, good afternoon. I am hoping to make a reservation. I need a room for two nights, checking in on September fifteenth and checking out on the seventeenth. Do you have anything available? Preferably a non-smoking room with a nice view if possible. I know it is peak season so I totally understand if you are fully booked but I figured I would try.",
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
            "I know this is probably a long shot but do you happen to have any rooms available for the weekend of September twentieth? I have been checking every hotel in the area and they are all booked solid. A friend told me sometimes places have cancellations that do not show up online. Is there any chance something opened up? I will take literally anything at this point.",
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
            "Before I confirm, I just want to make sure I understand the cancellation policy. If something comes up and I need to cancel, is there a fee? And what is the cutoff? Like, can I cancel up to forty-eight hours before and still get a full refund? I have been burned before by hotels that charge you the full amount even if you cancel a week in advance. I just want to know what I am getting into.",
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
            "Here is a pro tip. Never just book the first thing you see on Expedia or Booking dot com. Always check the hotel website directly because they sometimes have exclusive rates that are not listed anywhere else. And if you find a lower price on a third-party site, call the hotel and ask if they will price match. Half the time they will. Also, sign up for their loyalty program. Even if you are only staying once, you sometimes get free upgrades.",
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
            "One more thing. Does the price include breakfast? Because honestly that makes a huge difference for me. If breakfast is included I do not have to worry about finding a place to eat every morning. And hotel breakfasts are usually pretty decent these days. Buffet style, right? But if it is like thirty dollars extra per person per day then forget it. I will just grab something at a convenience store.",
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
            "Excuse me, is it possible to get a window seat? I know I should have selected it when I booked online but I totally forgot. I always pick window because I love looking out during takeoff and landing. There is something about watching the city get smaller and smaller that just blows my mind every time. Plus I can lean against the wall and sleep without falling on the person next to me.",
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
            "Would it be possible to get a confirmation email with the booking details? I want to make sure I have everything in writing. The reservation number, the dates, the room type, the total price, everything. I have had situations before where I showed up and they had no record of my booking. It was a nightmare. So now I always get written confirmation and I keep a screenshot on my phone just in case.",
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
            "So our flight lands at like eight in the morning and I know check-in is usually not until three in the afternoon. Is there any chance we could check in early? Even if the room is not ready, can we at least drop off our bags? I do not want to drag suitcases around the city all day. That is the worst. If early check-in costs extra that is totally fine. I would happily pay for it.",
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
            "I spent an embarrassing amount of time reading reviews for this hotel. Like two hours. But I feel good about it. It has four point seven stars out of five and the recent reviews are all positive. The only complaints are about the pillows being too soft which honestly I do not even mind. One person said the breakfast buffet was life-changing. Another person said the location is perfect for sightseeing. I think we are going to be really happy with this place.",
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
            "Done. I just got the confirmation email. Two rooms, four nights, ocean view, breakfast included. Non-refundable but who cares, we are going no matter what. I already added it to my calendar and sent the details to the group chat. Everyone needs to pay me back by Friday. I am serious. I am not going to be the one chasing people for money. You know who you are. Venmo me tonight.",
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
            "It is the night before the trip and I have not even started packing. I know, I know. I always do this. I tell myself I will pack early and then I end up throwing everything in my suitcase at midnight. But honestly, I have a system. I lay everything out on the bed, take a picture, and then decide what to cut. The trick is to pack half of what you think you need. You always overpack.",
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
            "OK I am standing in front of my closet and I am completely overwhelmed. What do I actually need? Like, what is the weather going to be like? Do I need a jacket? Should I bring dress shoes in case we go somewhere nice? And toiletries, does the hotel provide those or should I bring my own? I always bring way too much stuff and then I do not use half of it. Help me out here.",
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
            "Here is my dilemma. We are going for five days but I do not want to check a bag. So I need to fit everything in a carry-on. That means I can probably bring three outfits max and do laundry once. Or I could just wear the same jeans every day and only change my shirt. Nobody notices anyway. Right? Or is that gross? I genuinely do not know where the line is. I am asking for real.",
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
            "I am going to say this now because someone always forgets. Bring. Your. Charger. And not just your phone charger. Your laptop charger, your camera charger, your earbuds charger. And a power bank. And a universal adapter if we are going abroad. Last trip someone forgot their charger and spent the whole vacation borrowing mine. Never again. I am putting this in the group chat right now.",
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
            "Listen to me very carefully. Go find your passport right now. Not tomorrow morning. Right now. Check the expiration date because some countries require at least six months validity. Put it in your carry-on bag, not your checked luggage, and do not touch it until we get to the airport. I once watched a guy at the terminal realize his passport was expired. He could not go. His wife went without him. The saddest thing I have ever seen.",
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
            "What is all that? You have two suitcases and a backpack for a four-day trip? How is that even possible? I went to Europe for two weeks with one carry-on. You do not need seven pairs of shoes. Pick two. And why do you have a hair dryer? The hotel has one. And is that a pillow? You are bringing your own pillow? I cannot. I literally cannot. You need to unpack half of this right now.",
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
            "Trust me on this one. Bring a small medicine kit. Headache pills, stomach medicine, band-aids, maybe some allergy medicine if you have allergies. You do not want to be stuck in a foreign country with a headache and not know how to read the medicine labels. I learned this the hard way in Thailand. I had food poisoning and the pharmacy did not have anything I recognized. It was not fun.",
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
            "I just weighed my suitcase on the bathroom scale and it is thirty-two kilos. The limit is twenty-three. I am nine kilos over. That means I either take stuff out or pay for overweight baggage which is like fifty dollars. I am going to wear my heaviest jacket on the plane and shove my books in my backpack. This is what happens when you buy souvenirs before you even leave. Wait, those are for a different trip. Never mind.",
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
            "I know you guys think I am Type A but hear me out. I made a packing checklist and I am sharing it with everyone. Passport, tickets, chargers, toiletries, medicine, underwear for each day plus two extras, one nice outfit for dinner, swimsuit, sunscreen, and a reusable water bottle. Print it out. Check things off as you pack them. You will thank me when you are not standing at the airport realizing you forgot your underwear.",
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
            "OK I am like ninety-five percent done. The only things left are my toothbrush and my phone charger because I still need those tonight. And my contact lenses. And my glasses case. I will just put them all in a little bag by the front door so I grab them on my way out. I have done this enough times to have a system. Set an alarm, grab the bag, do not think, just go. That is the key. Do not think.",
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
            "Oh my God, I thought we were going to miss our flight. The highway was completely jammed. Like bumper to bumper for forty minutes. I was checking the clock every thirty seconds. But we are here now. We still have two hours before boarding. I am going to find the check-in counter and then maybe grab a coffee. I need to calm down. My heart is still racing from that drive.",
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
            "Good morning. I am checking in for flight KE seven two six to Seoul departing at ten thirty. I have my passport and my booking confirmation right here. There are two of us traveling together. We were hoping to get seats next to each other if possible. And I have one checked bag and one carry-on each. Is there anything else you need from me? Oh, and could you check if there are any upgrade options available?",
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
            "I have this suitcase to check. It should be under twenty-three kilos. I weighed it at home. Also, there are some souvenirs inside that are pretty fragile so could you put a fragile sticker on it? I know it does not guarantee anything but it makes me feel better. And which carousel do I pick it up at when we land? Actually, that will be on the board. Never mind. Thank you.",
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
            "OK bags are checked. Now where do we go? I always get confused at big airports. Is security this way or that way? Last time I was here I walked in the completely wrong direction for like ten minutes before I realized I was heading toward arrivals instead of departures. I felt so stupid. Let me just follow the signs this time. Or we could ask someone. There is an information desk right there.",
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
            "I always forget about the belt. Every single time I go through security I set off the metal detector and then I have to go back and take my belt off and walk through again while everyone behind me is waiting. It is so embarrassing. Now I just take everything off before I even get in line. Belt, watch, coins, keys, phone. I basically undress in the middle of the airport. It is not a great look but it saves time.",
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
            "Wait, what gate are we again? I swear it said B twelve but now my boarding pass says B twenty-two. Did they change it? Let me check the departure board. Yeah they changed it. B twenty-two. That is on the other side of the terminal. We should probably head over there now. They start boarding in like forty minutes and I want to stop at the duty-free shop on the way. Is that enough time?",
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
            "I cannot go to the airport without stopping at duty-free. It is like a rule. I know most of the stuff is not actually that much cheaper but there is something about buying things at the airport that feels special. Like it does not count as real spending because you are on vacation. That is how my brain works anyway. I am going to look at the whiskey section. Do not let me buy more than one bottle. Seriously. Stop me.",
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
            "Did you hear that? They just called our flight. They are boarding zones one and two right now. We are zone three so we have maybe five more minutes. Let me finish this coffee. Actually forget the coffee. Let us just go. I hate being the last one on the plane because then there is no overhead bin space and you have to shove your bag under the seat in front of you. That is the worst. Come on, let us go.",
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
            "Are you kidding me. The board just changed to delayed. One hour. They said it is a maintenance issue which honestly scares me a little. I mean, I would rather they fix whatever needs fixing than take off in a broken plane. But still. An hour. That messes up our whole schedule. We were supposed to land at three and now it is going to be four. The shuttle to the hotel might be gone by then. Let me look up alternatives just in case.",
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
            "Thank God. They finally called our zone. I have been sitting here so long my butt is numb. I read every article on my phone, finished my book, ate two overpriced sandwiches from that cafe, and people-watched for about an hour. I am so ready to get on this plane, find my seat, put on my headphones, and not talk to anyone for the next five hours. That is my version of paradise right now.",
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
            "Hi, sorry to bother you, but I think you might be sitting in my seat. My boarding pass says fourteen A which is this window seat. Could you double-check yours? Oh, you are fourteen B? That is the middle seat right there. Yeah, it happens all the time. No worries at all. These seat numbers can be confusing. The letters go A, B, C from the window. Easy mistake.",
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
            "Attention passengers. We are experiencing some turbulence ahead so the captain has turned on the fasten seatbelt sign. Please return to your seats and make sure your seatbelts are securely fastened. Flight attendants, please be seated as well. We expect this to last about twenty minutes. There is nothing to worry about. This is perfectly normal. We will let you know when it is safe to move around the cabin again.",
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
            "Hi, sorry. I hate to be that person but could I possibly get a blanket? It is freezing back here. I do not know why planes are always so cold. I am wearing a hoodie and I am still shivering. Is the AC on full blast? I swear the people in business class probably have heated seats or something. Oh, you only have one left? That is fine, I will take it. Thank you so much. You are a lifesaver.",
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
            "Hi there. We are starting our beverage service. We have coffee, tea, orange juice, apple juice, tomato juice, Coke, Sprite, ginger ale, and water. For alcohol we have beer, red wine, white wine, and a few cocktails. Everything is complimentary on international flights. If you would like alcohol, I will need to see your boarding pass. What can I get for you today? Take your time. I will come back if you need a minute.",
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
            "Tomato juice please. No ice. I know it is a weird choice but for some reason I only drink tomato juice on planes. I never order it anywhere else. I read somewhere that the cabin pressure changes how things taste and that is why tomato juice tastes better in the air. Something about the umami. Is that true? I have no idea but it sounds scientific enough for me. Oh, and a water too. Thanks.",
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
            "So I really want to recline my seat but I always feel so guilty about it. The person behind me is going to lose like three inches of space. I know it is technically my right but it still feels rude. Some people do not even ask. They just slam it back without warning. I always turn around and ask first. It is basic courtesy. Plus the last time I reclined without asking the guy behind me kicked my seat for the rest of the flight.",
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
            "OK I do not want to be dramatic but that last bump felt like the plane dropped fifty feet. My stomach went up into my throat. I know turbulence is normal and planes are designed to handle way worse than this. My brain knows that. But my body does not care about facts right now. My knuckles are white from gripping the armrest. Can someone just tell me we are going to be fine? I just need to hear it out loud.",
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
            "I just looked at the screen and we still have four hours to go. Four hours. I have already watched two movies, eaten everything they gave me, gone to the bathroom twice, and tried to sleep for an hour. What am I supposed to do for four more hours? I finished my book. My phone is at thirty percent. I cannot watch another movie because my eyes hurt. This is what purgatory must feel like. Trapped in a metal tube with nowhere to go.",
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
            "I do not want to complain but what is this supposed to be? The menu said chicken teriyaki but this looks more like a science experiment. The rice is crunchy, the salad is soggy, and the bread roll is hard as a rock. I spent four hundred dollars on this ticket and this is what I get? I know airplane food has a reputation for being bad but this is next level. At least the cookie is edible. Barely. I am just going to eat my snacks from the airport.",
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
            "Did you hear that? The captain said we are starting our descent. Thirty minutes. I can see the coastline out the window. Look at that. It is beautiful. OK everyone, put your seats up, tray tables folded, window shades open. I am so ready to get off this plane and stretch my legs. Eleven hours in this seat. My back is killing me. But we made it. We are actually here. I cannot believe we are actually doing this trip.",
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
            "Why am I sweating? I have done nothing wrong. I have a valid passport, a return ticket, a hotel reservation, and enough money for the trip. But the moment I see that immigration line I turn into a nervous wreck. What if they ask me something I do not understand? What if I say the wrong thing? What if they pull me aside for extra screening? I know I am being irrational but I cannot help it. Just let me through. Please.",
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
            "Good afternoon. Passport please. What is the purpose of your visit? Sightseeing? How long are you staying? Five days. Where will you be staying? Do you have a hotel reservation? Can I see it? Do you have a return ticket? How much cash are you carrying? Do you have anything to declare? Any food items, plants, or agricultural products? OK. Welcome. Enjoy your stay. Next please.",
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
            "I am here for tourism. This is my first time visiting your country actually. I am staying for five days. I have a hotel reservation at the Hilton in the city center. My return flight is on September twenty-second. I am traveling with three friends. They are right behind me in the line. We are planning to visit some temples and try the local food. We are really excited to be here.",
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
            "I do not have anything to declare. No food items, no alcohol over the limit, no tobacco products, nothing restricted. Just clothes, toiletries, and a camera. Actually wait, does chocolate count as a food item? I bought some chocolate at duty-free. Is that OK? I am not trying to smuggle anything. I just did not think about it until right now. Please do not open my suitcase. It took me forever to pack everything.",
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
            "This might sound silly but could you stamp my passport? I know everything is digital now and some countries do not even stamp anymore. But I collect passport stamps. Every country I have been to is in here. It is like a travel diary. My passport is almost full because of all the stamps. See? Here is Thailand, here is France, here is Australia. I am running out of pages though. I might need a new passport soon.",
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
            "Oh I need to do fingerprints? OK. Which hand first? Left? All four fingers? Like this? Oh it did not register. Let me try again. Sorry, my hands are a little sweaty from being nervous. There we go. Now the right hand? OK. And now both thumbs? Got it. And look at the camera? Do I smile? No? OK. Straight face. This feels like a mugshot. I promise I am not a criminal. I just want to see your beautiful country.",
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
            "So they pulled me into this room and started asking me all these questions. Where am I staying, how much money do I have, what do I do for a living, do I have any contacts in the country. I was trying to stay calm but my English just completely froze up. I could not think of the right words. The officer was actually pretty nice about it. He said take your time. After like fifteen minutes they let me go. My hands were literally shaking. I have never been so relieved in my life.",
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
            "I am staring at this arrival card and I have no idea what half of these fields mean. Occupation? Can I just write company employee? And address in country, is that my hotel? And flight number, I do not remember. Let me check my boarding pass. And purpose of visit, there are like ten boxes. Which one do I check? Tourism? Sightseeing? Vacation? Are those the same thing? Why do they need to know my mother's maiden name? That feels excessive.",
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
            "I am through! Oh my God, I am so relieved. The officer barely looked at me. He just scanned my passport, asked me two questions, and said welcome. The whole thing took like thirty seconds. And I was standing in that line for forty-five minutes rehearsing answers in my head, imagining worst-case scenarios, mentally preparing for interrogation. For thirty seconds. I am such an overthinker. But hey, I am officially in a foreign country now. Let us go!",
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
            "Please tell me we do not need a visa. I completely forgot to check. Japanese passports have visa-free access to a lot of countries but not all of them. And some countries have this thing called an ETA or an ESTA where you have to apply online before you go. If I needed a visa and did not get one, we are in big trouble. Let me Google it right now. Oh wait, we already landed. It is a bit late for that. OK someone please check. I am panicking.",
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
            "OK we are through immigration. Now we need to find baggage claim. It should be downstairs. Let me check the monitors. Our flight number is KE seven two six. Carousel four. That way. Let us hurry because I want to grab our bags before the crowd gets there. Last time I waited forty minutes for my bag to come around and it was the absolute last one on the belt. I was convinced they lost it.",
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
            "No no no no no. The belt stopped. Everyone has their bags. Mine is not here. This cannot be happening. Everything I need is in that suitcase. My clothes, my toiletries, my charger, my snacks, everything. I did not even pack a change of clothes in my carry-on like everyone told me to. What do I do? Is there a lost baggage counter? Where do I go? This is literally my worst nightmare. This trip is ruined before it even started.",
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
            "Excuse me, could you tell me where the taxi stand is? Is it outside the terminal? And do you know roughly how much a taxi to downtown costs? I have heard that some airports have fixed-rate taxis to the city center. Is that the case here? Oh, and are ride-sharing apps like Uber available here? Sometimes those are cheaper. I just do not want to get ripped off by one of those unofficial taxi drivers who charge you triple the normal rate.",
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
            "I need to change some money. But I have heard the exchange rate at the airport is terrible. Like way worse than in the city. Should I just get a little bit now for the taxi and then exchange the rest at a bank downtown? Or should I just use my credit card for everything and get cash from an ATM? What do you guys usually do? I do not want to lose money on a bad rate but I also need some cash right now.",
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
            "First priority is getting a SIM card. I need data. Without my phone I am completely useless. I cannot check the map, I cannot translate anything, I cannot message anyone, I cannot even figure out the bus schedule. Is there a SIM card vending machine or a counter in the arrivals hall? I want at least five gigs for five days. Some places also do eSIM now which is even easier. You just scan a QR code and you are connected.",
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
            "OK so we have a few options. There is a taxi which is the most convenient but also the most expensive. Then there is the airport express train which goes to the city center in about thirty minutes. Or there is a shuttle bus that goes directly to our hotel area for like ten dollars. Honestly I think the train is the best bang for our buck. We can take the train to the main station and then grab a quick taxi from there. What do you guys think?",
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
            "I am trying to get on the airport Wi-Fi but it is not working. It says I need to register with my email or my phone number. But my phone number does not work here because I do not have a local SIM yet. Classic chicken-and-egg problem. I need Wi-Fi to set up my SIM but I need a SIM to register for Wi-Fi. Can you share your hotspot for a second? I just need to send a message to the hotel to let them know we landed.",
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
            "Fresh air. Finally. I have been inside that airport for what feels like forever. Between the flight, the immigration line, waiting for bags, going through customs, finding a SIM card, and figuring out transportation, it has been like three hours since we landed. But now we are here. Outside. In a completely different country. Smell that air. It even smells different here. Everything looks different. I love this feeling. The adventure starts now.",
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
            "What the hell? It is like forty degrees out here. The weather app said thirty-two. That was a lie. And the humidity is insane. I stepped outside and my glasses fogged up immediately. I am already drenched in sweat and we have been outside for two minutes. This is what I get for not checking the weather properly. I packed a jacket. A jacket! Who packs a jacket for a tropical country? Oh wait, I also packed jeans. I am an idiot.",
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
            "OK everyone. We have our bags, we have our SIM cards, we know how to get there. Let us go. I am exhausted, I am sweaty, I am hungry, and I desperately need a shower. The hotel is about forty minutes from here. Let me pull up the directions on my phone. Everyone stick together. I do not want anyone getting lost on the first day. We can figure out the sightseeing plan after we rest. First things first. Hotel. Shower. Food. In that order. Let us move.",
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
