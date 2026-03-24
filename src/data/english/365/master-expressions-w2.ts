/**
 * 365 English Master -- Week 2: 慣れてきた (Getting Comfortable)
 * Days 8-14: 70 expressions
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 1 (2026-04) -- WEEK 2
// ============================================================

export const WEEK2_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 8: 自己紹介をもっと (More About Yourself)
    // Scene: 居酒屋の2回目。みんなが自分の話をもっと深くする夜。
    // ────────────────────────────────────────────────────

    {
        daySlot: 8, japanese: '出身は大阪です',
        english: [
            'I am from Osaka.',
            "I'm from Osaka, actually.",
            "I'm originally from Osaka. Moved here about five years ago.",
            "I'm from Osaka originally. Yeah, born and raised. Moved here for work and just... never went back, I guess. I still miss the food though.",
        ],
        context: 'originally from が「出身は」に一番近い。I am from だけだと「今住んでる」にも聞こえる。born and raised は「生まれも育ちも」のセットフレーズ。英語は出身の話をするときoriginally を足すだけで一気に自然になる。',
        character: 'takeshi', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 8, japanese: 'IT関係で働いてます',
        english: [
            'I work in IT.',
            "I'm in IT.",
            "I work in IT. Mostly backend stuff, nothing glamorous.",
            "I'm in IT. You know, the kind of job where everyone assumes you can fix their printer. I do backend development but yeah... I've become the family tech support too.",
        ],
        context: '「〜関係」は英語で I work in... か I am in... で十分。日本語の「関係」を直訳して related to と言うと変。I am in finance/marketing/IT が業界を伝える最短ルート。職種まで言うなら I work as a... を使う。',
        character: 'kenji', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 8, japanese: '家族は3人です',
        english: [
            'There are three of us.',
            "It's just the three of us.",
            "It's me, my wife, and our kid. Just the three of us.",
            "There's three of us. Me, my wife, and our five-year-old. He's at that age where everything is 'why?' Like, everything. I love it and I also want to hide sometimes.",
        ],
        context: '日本語の「家族は3人」は数字が先。英語は It is just the three of us とか There are three of us で、数字より「誰がいるか」を説明するのが普通。My family has 3 people は文法的にOKだけど不自然。英語は人数より構成を語る。',
        character: 'takeshi', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 8, japanese: '猫が好きなんです',
        english: [
            'I like cats.',
            "I'm a cat person.",
            "I'm totally a cat person. I have two at home.",
            "I'm a huge cat person. I have two — one's a tabby and the other one is just... pure chaos. Like, she knocks everything off every surface. But I love her. It's a problem.",
        ],
        context: 'cat person / dog person は英語独特の分類法。日本語の「猫派/犬派」と完全に同じ概念。I like cats より I am a cat person のほうがアイデンティティとして語れる。英語は「好き嫌い」を人格の一部として表現するのが好き。',
        character: 'mina', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 8, japanese: 'もう10年くらいになります',
        english: [
            'About ten years.',
            "It's been about ten years now.",
            "It's been about ten years. Time flies, honestly.",
            "Going on ten years now, I think? Maybe eleven. I honestly lost count. It does not feel that long but then you do the math and you're like... whoa.",
        ],
        context: '「〜年くらい」の about と going on の使い分け。going on ten years は「もうすぐ10年になる」のニュアンス。It has been... は経過を語る定番構文。Time flies は「時が経つのは早い」の鉄板フレーズ。日本語の「もう〜年」の感慨が英語でも出せる。',
        character: 'master', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 8, japanese: '英語を勉強してます',
        english: [
            'I study English.',
            "I'm studying English.",
            "I've been studying English. Still a work in progress though.",
            "I've been trying to learn English for... honestly forever. I can read it OK but the second someone talks to me I just freeze. It's so frustrating.",
        ],
        context: 'I study English は習慣。I am studying English は今取り組んでいる感じ。でも一番自然なのは I have been studying で「ずっとやってる」感。a work in progress は「まだ途中」の謙遜表現。英語学習者の自己紹介で使える最強フレーズ。',
        character: 'yuki', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 8, japanese: '横浜に住んでます',
        english: [
            'I live in Yokohama.',
            "I'm based in Yokohama.",
            "I live in Yokohama. It's about thirty minutes from here by train.",
            "I'm in Yokohama. It's close enough to Tokyo for work but far enough that rent does not completely destroy you. I like the waterfront area a lot.",
        ],
        context: 'I live in は定番だけど、I am based in は「拠点が〜」のニュアンスでビジネス寄り。カジュアルなら I am in Yokohama で十分。住んでる場所の説明に距離感や理由を足すのが英語の自己紹介の流儀。日本語の「〜に住んでます」はもっとシンプル。',
        character: 'lisa', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 8, japanese: '前は営業だったんです',
        english: [
            'I used to be in sales.',
            "I used to do sales, actually.",
            "I was in sales before. Switched careers a few years ago.",
            "I used to be in sales. Yeah, for like eight years. It was fine but I just hit a wall, you know? Wanted something different. So I made the jump and... here we are.",
        ],
        context: 'used to は「前は〜だった」の最重要フレーズ。I was in sales でもOKだけど、used to のほうが「もうやってない」が明確。made the jump は「思い切って飛んだ」。日本語の「前は〜」は軽いけど英語は転職の経緯まで語りがち。',
        character: 'kenji', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 8, japanese: '夢はカフェを開くことです',
        english: [
            'I want to open a cafe.',
            "My dream is to open my own cafe someday.",
            "I've always wanted to open a little cafe. Nothing fancy, just a cozy spot.",
            "My dream — and I know this sounds basic — is to open a cafe. Like a tiny one. Good coffee, some pastries, maybe a cat or two. I have the whole thing planned out in my head already.",
        ],
        context: 'My dream is to... は直球。I have always wanted to のほうが「ずっと思ってた」感があって自然。someday は「いつか」。nothing fancy は「大したものじゃなく」の謙遜。英語で夢を語るとき I know this sounds... と前置きするのが照れ隠しの定番。',
        character: 'mina', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 8, japanese: '自分では真面目なほうだと思います',
        english: [
            'I think I am serious.',
            "I'd say I'm the serious type.",
            "I'd like to think I'm pretty diligent. Maybe too much sometimes.",
            "I would say I'm on the serious side? Like, I'm not boring — at least I hope not — but I'm definitely the type who overthinks everything. My friends make fun of me for it.",
        ],
        context: 'I would say は「自分では〜だと思う」の便利な前置き。the serious type は「真面目なタイプ」。on the serious side は「どちらかというと真面目寄り」の柔らかい言い方。日本語の「〜なほうだと思う」の曖昧さは I would say が一番近い。断言を避ける日本語的感覚が英語にもある。',
        character: 'yuki', category: 'greeting', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 9: カフェで注文 (At a Cafe)
    // Scene: リサが常連たちをおしゃれカフェに連れて行く。
    //        タケシが意味不明なサイズ名にパニック。
    // ────────────────────────────────────────────────────

    {
        daySlot: 9, japanese: 'ホットでお願いします',
        english: [
            'Hot, please.',
            "Can I get that hot?",
            "Can I get that hot? I'm not really an iced coffee person.",
            "Hot, please. I know everyone does iced now but I just... I cannot. I need my coffee warm. It is a hill I will die on.",
        ],
        context: 'Can I get that hot? の get が英語の注文の核。日本語は「ホットで」だけで通じるけど英語は Can I get... か I will have... を頭につける。a hill I will die on は「絶対に譲れないこだわり」の面白い慣用句。',
        character: 'master', category: 'order', month: '2026-04',
    },
    {
        daySlot: 9, japanese: 'Mサイズで',
        english: [
            'Medium, please.',
            "I'll take a medium.",
            "A medium, please. Or... wait, what do you call it here — grande?",
            "Medium. Or grande. Or whatever you call it. Honestly, why can't coffee shops just say small, medium, large? Every place has their own naming thing and I panic every time.",
        ],
        context: 'スタバの tall/grande/venti に困惑するのは日本人だけじゃない。英語ネイティブもあれは意味不明だと思ってる。普通のカフェなら small/medium/large で通じる。what do you call it here? は「ここでは何て言うの？」の便利フレーズ。',
        character: 'takeshi', category: 'order', month: '2026-04',
    },
    {
        daySlot: 9, japanese: '砂糖なしでお願いします',
        english: [
            'No sugar, please.',
            "Without sugar, please.",
            "No sugar for me, thanks. Just black.",
            "No sugar. And no milk either, actually. Just give me the coffee as is. I went through a whole phase of adding stuff but honestly black is the way to go. Less is more.",
        ],
        context: 'without が「〜なし」の基本形。no sugar でもOK。as is は「そのまま」。less is more は「少ないほうがいい」の名言的フレーズ。日本語の「ブラックで」は英語でも just black で通じる。コーヒー用語は万国共通が多い。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 9, japanese: 'テイクアウトでお願いします',
        english: [
            'To go, please.',
            "Can I get this to go?",
            "I'll take this to go. I'm in a bit of a rush.",
            "To go, please. I would love to sit but I have to be somewhere in like twenty minutes and I already know I'm going to be late. Story of my life.",
        ],
        context: 'テイクアウトは和製英語寄り。アメリカは to go、イギリスは takeaway。for here or to go? と聞かれるのがアメリカのカフェの定番。日本語の「テイクアウト」は英語圏では通じにくい。to go の2語で覚えるのが正解。',
        character: 'lisa', category: 'order', month: '2026-04',
    },
    {
        daySlot: 9, japanese: '席空いてますか？',
        english: [
            'Is this seat taken?',
            "Excuse me, is this seat taken?",
            "Sorry to bother you — is anyone sitting here?",
            "Hey, sorry, is anyone sitting here? Or are you saving this for someone? I just need one spot. I promise I will be quiet. Well... I will try.",
        ],
        context: 'Is this seat taken? が定番。Is anyone sitting here? でもOK。日本語の「空いてますか」は空席に注目するけど、英語は「誰か座ってる？」と人に注目する。視点の違いが面白い。saving this for someone は「誰かのために取ってある？」。',
        character: 'yuki', category: 'order', month: '2026-04',
    },
    {
        daySlot: 9, japanese: 'Wi-Fiありますか？',
        english: [
            'Do you have Wi-Fi?',
            "Is there Wi-Fi here?",
            "Do you guys have Wi-Fi? I need to get some work done.",
            "Hey, do you have Wi-Fi? And is it one of those ones where you have to buy something to get the password, or is it just... open? Because I already ordered, so we're good either way.",
        ],
        context: 'Do you have Wi-Fi? で完結するシンプル表現。you guys は「あなたたち」ではなく「この店は」のカジュアルな言い方。password は聞かなくても壁やレシートに書いてあることが多い。日本語の「ありますか」は英語では have か is there の2択。',
        character: 'takeshi', category: 'order', month: '2026-04',
    },
    {
        daySlot: 9, japanese: 'おすすめのコーヒーは？',
        english: [
            'What do you recommend?',
            "What's good here?",
            "I'm not sure what to get. What would you recommend?",
            "OK so I'm looking at this menu and I have no idea what half of these are. What's your most popular one? Or like, if you had to pick one thing, what would it be?",
        ],
        context: 'What is good here? が最もカジュアル。What do you recommend? はやや丁寧。if you had to pick one は「1つ選ぶなら？」で選択肢を絞らせる上級テク。日本語の「おすすめは？」は一言だけど英語は聞き方のバリエーションが豊富。',
        character: 'mina', category: 'order', month: '2026-04',
    },
    {
        daySlot: 9, japanese: 'これ何が入ってますか？',
        english: [
            "What's in this?",
            "What's in this one?",
            "Can I ask what's in this? I have a nut allergy.",
            "What's actually in this? Like, the ingredients? I'm asking because last time I ordered something fancy and it had coconut in it and I was not prepared. At all.",
        ],
        context: 'What is in this? のシンプルさが最強。ingredients は「材料・成分」。アレルギーがある人は毎回確認が必須。英語圏のカフェはアレルギー対応に慣れてるので遠慮なく聞いてOK。日本語より気軽にアレルギーの話をする文化。',
        character: 'lisa', category: 'order', month: '2026-04',
    },
    {
        daySlot: 9, japanese: '注文の名前なんですか？',
        english: [
            'What name is it under?',
            "What name should I listen for?",
            "Sorry, was that my order? What name did they call?",
            "Wait, did they just call my name? I can never tell because they always butcher it. Like, every single time. I have just accepted it at this point.",
        ],
        context: '海外のカフェは名前で呼ぶシステム。日本人の名前はほぼ100%間違えられる。butcher は「めちゃくちゃにする」で名前の発音を崩されたときにぴったり。What name is it under? は「どの名前で？」。日本にはない文化なので最初は戸惑う。',
        character: 'takeshi', category: 'order', month: '2026-04',
    },
    {
        daySlot: 9, japanese: '甘さ控えめでお願いします',
        english: [
            'Less sweet, please.',
            "Not too sweet, please.",
            "Can you make it less sweet? Like, half the sugar or something.",
            "Less sweet, please. Actually, way less. I ordered something here once and it was like drinking candy. I mean it was good but my teeth were like... no. Half sweetness, maybe?",
        ],
        context: 'less sweet が「甘さ控えめ」の直訳で通じる。half the sugar は具体的で伝わりやすい。英語圏のドリンクは日本人の想像の3倍甘いことがある。not too sweet はやや曖昧だけどカジュアルに使える。light on the sugar もあり。',
        character: 'master', category: 'order', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 10: ドラッグストアで (At a Drugstore)
    // Scene: ケンジが海外出張前にドラッグストアで買い物。
    //        何をどう聞けばいいかわからない。
    // ────────────────────────────────────────────────────

    {
        daySlot: 10, japanese: '頭痛薬ありますか？',
        english: [
            'Do you have anything for headaches?',
            "I need something for a headache.",
            "Hi, I'm looking for something for headaches. What would you recommend?",
            "Hey, do you have anything for headaches? I woke up with this thing behind my eyes and it will not go away. I tried drinking water, I tried coffee... nothing. I just need something that works.",
        ],
        context: '「頭痛薬」を headache medicine と言っても通じるけど、Do you have anything for...? が薬局での万能フレーズ。症状を言えば店員が選んでくれる。something for a headache は「頭痛に効く何か」。日本のように商品名で指定するより症状で伝えるのが英語圏流。',
        character: 'kenji', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 10, japanese: 'これは何に効きますか？',
        english: [
            'What is this for?',
            "What does this one do?",
            "Can you tell me what this is for? I can't read the label.",
            "So what exactly does this do? Because the box has like fourteen different things listed and I do not know if it is for my headache or my back or what. The packaging here is confusing.",
        ],
        context: 'What is this for? が最短最強。What does this do? でもOK。英語の薬のラベルは成分名が専門用語だらけで英語ネイティブでも読めない人が多い。active ingredients=有効成分。日本の薬は絵や色で分かりやすいけど海外は文字の壁がすごい。',
        character: 'kenji', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 10, japanese: '1日何回飲みますか？',
        english: [
            'How many times a day?',
            "How often do I take this?",
            "How many times a day should I take this? And is it one pill or two?",
            "OK so how often do I take this? Because I always mess that up. Like, is it twice a day, three times a day? And do I need to eat first or can I just take it whenever? I always forget to ask.",
        ],
        context: 'take が薬を「飲む」の英語。drink medicine とは言わない。how often は頻度、how many times は回数。1日3回=three times a day。食後=after meals、空腹時=on an empty stomach。日本語の「飲む」がdrinkじゃなくtakeなのは英語学習者の最初の壁。',
        character: 'takeshi', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 10, japanese: '食後に飲むんですか？',
        english: [
            'After meals?',
            "Should I take it after eating?",
            "Do I need to take this with food? Or is it OK on an empty stomach?",
            "Wait, do I take this with food or without? Because some of them mess up your stomach if you take them on empty, right? I learned that the hard way once. Never again.",
        ],
        context: 'with food=食事と一緒に、on an empty stomach=空腹時。英語の薬の説明書には take with food と書いてあることが多い。日本語の「食後」は after meals だけど、英語は with food のほうが自然。the hard way=痛い目に遭って学んだ。',
        character: 'kenji', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 10, japanese: '副作用はありますか？',
        english: [
            'Any side effects?',
            "Does this have any side effects?",
            "Are there any side effects I should know about? Like drowsiness?",
            "Quick question — any side effects? Because I have a meeting tomorrow and I cannot show up looking like a zombie. Last time I took something it knocked me out cold. I need to function.",
        ],
        context: 'side effects=副作用。drowsiness=眠気はmost common side effect。knocked me out=完全に眠らせた。may cause drowsiness は薬のラベルの超定番文。日本語の「副作用」は堅い言葉だけど英語の side effects は日常会話で普通に使う。',
        character: 'lisa', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 10, japanese: '処方箋なしで買えますか？',
        english: [
            'Do I need a prescription?',
            "Can I get this without a prescription?",
            "Is this over the counter? Or do I need to see a doctor first?",
            "Can I just buy this or do I need a prescription? Because getting a doctor appointment takes forever and I need this now. Is there an over-the-counter version or something?",
        ],
        context: 'over the counter (OTC)=処方箋なし。prescription=処方箋。日本とアメリカでOTCの範囲が違う（アメリカのほうが広い）。behind the counter は処方箋は不要だけどレジの後ろにある薬。この3段階を知ってると海外の薬局で困らない。',
        character: 'kenji', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 10, japanese: '日焼け止めはどこですか？',
        english: [
            'Where is the sunscreen?',
            "Where can I find sunscreen?",
            "Excuse me, which aisle has sunscreen? I'm heading to the beach this weekend.",
            "Hey, where do you keep the sunscreen? I looked in like three aisles already and I cannot find it. Is it with the skincare stuff or the seasonal section? Every store puts it somewhere different.",
        ],
        context: 'aisle（アイル）=通路。which aisle? は薬局・スーパーで商品を探すときの必須フレーズ。sunscreen=日焼け止め（sunblock とも言う）。SPFは英語でもSPF。日本の日焼け止めは世界最高品質で、海外の人がお土産に買うレベル。',
        character: 'yuki', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 10, japanese: '虫除けスプレーがほしいです',
        english: [
            'I need bug spray.',
            "Do you have insect repellent?",
            "I'm looking for bug spray. Something strong — I get bitten like crazy.",
            "I need bug spray. The good kind. Mosquitoes love me for some reason. Like I am a five-star restaurant for them. Everyone else is fine and I come back looking like I lost a fight. With bugs.",
        ],
        context: 'bug spray がカジュアル、insect repellent が正式名称。I get bitten like crazy は「めちゃくちゃ刺される」。英語で「蚊に好かれる」は mosquitoes love me と言う。like crazy は「信じられないくらい」の万能強調語。',
        character: 'takeshi', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 10, japanese: '目薬ありますか？',
        english: [
            'Do you have eye drops?',
            "I need some eye drops.",
            "Do you have eye drops? My eyes are so dry from staring at screens all day.",
            "I need eye drops. My eyes are killing me. I think it is the air conditioning plus like ten hours of screen time. Do you have anything that actually works? Not just the basic saline stuff.",
        ],
        context: 'eye drops=目薬。日本語は「目薬」で1語だけど英語は eye drops と2語。saline=生理食塩水。my eyes are killing me は「目がめちゃくちゃ辛い」。英語の killing me は「死にそうなくらい辛い」の日常的な大げさ表現。',
        character: 'mina', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 10, japanese: 'これアレルギーに効きますか？',
        english: [
            'Is this for allergies?',
            "Does this work for allergies?",
            "Will this help with allergies? I get really bad hay fever.",
            "So does this actually work for allergies? Because I have tried everything and nothing really helps. My hay fever is brutal this year. Like, I go outside for five minutes and I'm done. Eyes, nose, everything.",
        ],
        context: 'hay fever=花粉症。allergy season=花粉の時期。英語圏でも花粉症はメジャーな悩み。brutal は「容赦ない」で症状のひどさを表現。Does this actually work? の actually は「本当に効くの？」の疑い混じりのニュアンス。薬が多すぎて選べない気持ちは万国共通。',
        character: 'master', category: 'shopping', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 11: ホテルで (At a Hotel)
    // Scene: ユキが初めての海外ホテル。チェックインからトラブルまで。
    // ────────────────────────────────────────────────────

    {
        daySlot: 11, japanese: 'チェックインお願いします',
        english: [
            'Checking in, please.',
            "Hi, I'm here to check in.",
            "Hi, I have a reservation under Tanaka. Checking in.",
            "Hi there. I'm checking in. Reservation should be under Tanaka. T-A-N-A-K-A. Yeah, I always have to spell it. It is just easier that way.",
        ],
        context: 'I am here to check in. がホテルの入口フレーズ。under Tanaka は「田中の名前で」。日本語の「お願いします」は万能だけど英語は状況ごとに言い方が変わる。名前を「スペルアウトする」は海外で日本人が必ず経験すること。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 11, japanese: '予約してあります',
        english: [
            'I have a reservation.',
            "I booked a room online.",
            "I have a reservation. I booked it through the app a couple weeks ago.",
            "I have a reservation. Booked it online — let me pull up the confirmation. Hold on, it is somewhere in my email... there it is. Here's the booking number.",
        ],
        context: 'reservation はホテルとレストランで使う。booking もほぼ同義。confirmation number=予約確認番号は必ずスクショしておくべき。日本語の「予約してあります」は一文だけど英語はどうやって予約したかまで言うのが親切。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 11, japanese: 'Wi-Fiのパスワードは？',
        english: [
            "What's the Wi-Fi password?",
            "Can I get the Wi-Fi password?",
            "Do you have a Wi-Fi card? Or is the password on the key holder?",
            "Hey, what's the Wi-Fi password? I looked everywhere in the room and I cannot find it. Is it one of those ones where you have to log in through a browser? Because those never work for me.",
        ],
        context: 'ホテルのWi-Fiは部屋番号+名前でログインするタイプと、パスワード式がある。It does not work は「繋がらない」のSOSフレーズ。日本のホテルより海外のWi-Fiは不安定なことが多い。complimentary Wi-Fi=無料Wi-Fi。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 11, japanese: '部屋を変えてほしいです',
        english: [
            'Can I change rooms?',
            "Would it be possible to switch rooms?",
            "I hate to be difficult, but could I get a different room? This one is right next to the elevator.",
            "So, um, I do not want to be that person, but is there any chance I could switch rooms? Mine is right by the elevator and I can hear it every time it opens. I know you are probably fully booked but... if anything opens up?",
        ],
        context: 'I hate to be difficult は「面倒な客ですみません」の丁寧な前置き。英語圏のホテルは部屋変更に意外と柔軟。Is there any chance...? は可能性を聞く万能フレーズ。日本語の「変えてほしい」は直接的だけど英語はクッション言葉をたくさん使う。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 11, japanese: 'タオルを追加でお願いします',
        english: [
            'Can I get extra towels?',
            "Could I get a couple more towels, please?",
            "Hi, could I get some extra towels sent to room 412?",
            "Hey, I was wondering if I could get a few more towels? There are only two in the room and there is three of us. Also, do you have bigger ones? These are kind of... small. No offense.",
        ],
        context: 'extra は「追加の」。a couple more は「あと2〜3枚」。sent to room 412 で部屋番号を伝える。no offense は「悪気はないけど」。英語圏のホテルは電話1本で何でも持ってきてくれる。日本語の「追加で」は英語では extra か more。',
        character: 'lisa', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 11, japanese: 'チェックアウトは何時ですか？',
        english: [
            'What time is checkout?',
            "When is checkout?",
            "What time do I need to check out by? Is there a late checkout option?",
            "Quick question — what time is checkout? And is there any way to do a late checkout? Our flight is not until the evening and I really do not want to drag our bags around the city all day.",
        ],
        context: 'check out by は「〜までにチェックアウト」。late checkout=レイトチェックアウトは聞くだけタダ。海外のホテルは11時か12時が標準。日本語の「何時ですか」に対して英語は what time...by? と期限を明示する。by の有無で意味が変わる重要な前置詞。',
        character: 'kenji', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 11, japanese: '荷物を預かってもらえますか？',
        english: [
            'Can you hold my bags?',
            "Can I leave my luggage here for a bit?",
            "We've checked out but our flight is not until tonight. Can we leave our bags with you?",
            "Hey, so we just checked out but we do not fly until like nine tonight. Is there somewhere we can leave our bags? I promise it is just two suitcases. We will be back by seven at the latest.",
        ],
        context: 'hold my bags か leave my luggage のどちらかで通じる。baggage storage=手荷物預かり所。at the latest=遅くとも。チェックアウト後の荷物預かりはほとんどのホテルが無料で対応してくれる。知ってるだけで旅行の自由度が上がる。',
        character: 'takeshi', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 11, japanese: 'エアコンが効きません',
        english: [
            "The AC isn't working.",
            "The air conditioning is not working.",
            "Excuse me, the AC in my room does not seem to be working. It is really hot.",
            "Hi, I think the AC in my room is broken? I have been pressing buttons for like thirty minutes and nothing is happening. It is not cold, it is not hot, it is just... blowing air. Room 412.",
        ],
        context: 'AC（エーシー）=エアコン。air conditioning の略。英語でエアコンとは言わない。not working は機械の故障全般に使える。it does not seem to be working は「動いてないっぽい」の柔らかい言い方。海外ホテルのACトラブルは本当に多い。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 11, japanese: '朝食は何時からですか？',
        english: [
            'What time is breakfast?',
            "When does breakfast start?",
            "What time does the breakfast buffet open? And where is it?",
            "What time does breakfast start? And is it included or do I have to pay extra? Because I booked through one of those discount sites and I am honestly not sure what is included anymore.",
        ],
        context: 'complimentary breakfast=無料朝食。included=含まれている。buffet はアメリカ英語で「バフェイ」（ビュッフェではない）。discount site=割引サイト。日本語の「何時から」は英語で when does it start? か what time does it open? の2パターン。',
        character: 'mina', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 11, japanese: 'この近くにコンビニありますか？',
        english: [
            'Is there a convenience store nearby?',
            "Is there a store nearby?",
            "Is there a convenience store or a bodega around here? I just need a few things.",
            "Is there like a convenience store or something nearby? I need water and maybe some snacks. Japan has a combini on every corner and I got spoiled. Now I am lost without one.",
        ],
        context: '日本のコンビニは世界最強なので、海外で同じレベルを期待すると裏切られる。アメリカは bodega（ボデガ）や corner store が近い存在。convenience store は通じるけど日本ほど便利ではない。spoiled は「甘やかされた」。日本のコンビニに慣れると海外で苦労する。',
        character: 'master', category: 'travel', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 12: 体調の話 (Talking About How You Feel)
    // Scene: 居酒屋で「今日しんどかった」から始まる体調トーク。
    // ────────────────────────────────────────────────────

    {
        daySlot: 12, japanese: 'ちょっと風邪気味で',
        english: [
            'I think I am getting a cold.',
            "I'm coming down with something.",
            "I think I'm coming down with a cold. My throat has been scratchy all day.",
            "I think I'm getting a cold. My throat is all scratchy and I have been sneezing since this morning. I do not want to get anyone sick so maybe I should keep my distance. But also I really wanted a drink so... here I am.",
        ],
        context: 'coming down with は「〜にかかりかけ」のネイティブ表現。catching a cold より進行形の感じ。scratchy throat=喉がイガイガ。日本語の「風邪気味」は絶妙な曖昧さ（風邪かもしれないし違うかも）で、英語の I think I am getting... が一番近い。',
        character: 'kenji', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 12, japanese: '二日酔いが最悪で',
        english: [
            'I am so hungover.',
            "I have the worst hangover.",
            "My hangover is brutal today. I should not have had that last drink.",
            "I am dying. Like, legitimately dying. My hangover is unreal. I told myself I would stop at three beers and then someone ordered sake and... yeah. I have no one to blame but myself. But also I blame the sake.",
        ],
        context: 'hangover=二日酔い。I am hungover=二日酔いだ。「二日酔い」は英語だと1語で言えるのに日本語は漢字3つ使うという珍しいパターン。I should not have は「〜しなければよかった」の後悔表現。have no one to blame but myself は自業自得の英語版。',
        character: 'takeshi', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 12, japanese: '寝不足です',
        english: [
            'I did not sleep well.',
            "I'm running on no sleep.",
            "I barely slept last night. Maybe three hours?",
            "I got like three hours of sleep. My neighbor was doing something at two in the morning — I do not know what and I do not want to know. So now I am running on coffee and vibes.",
        ],
        context: 'running on no sleep は「寝てないで動いてる」。barely=ほとんど〜ない。日本語の「寝不足」は名詞1つだけど英語は I did not sleep enough か I am sleep deprived と文で言う。running on coffee は「コーヒーだけで生きてる」の定番フレーズ。',
        character: 'mina', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 12, japanese: '肩こりがひどくて',
        english: [
            'My shoulders are stiff.',
            "My neck and shoulders are killing me.",
            "My shoulders are so tense. I think it is from sitting at a desk all day.",
            "My shoulders are destroyed. Like, I cannot even turn my head properly. I have been hunched over my laptop for eight hours straight and my body is just done. I need a massage or something.",
        ],
        context: '「肩こり」は英語に直訳がない日本語の代表格。stiff shoulders/neck が近いけど、英語圏では「肩こり」を独立した症状として認識する文化が薄い。shoulder tension, neck pain と部位+症状で言う。日本人が肩こりを語る頻度は世界的に異常らしい。',
        character: 'kenji', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 12, japanese: '花粉症がつらい',
        english: [
            'My allergies are bad.',
            "My hay fever is killing me.",
            "Allergy season is brutal this year. My eyes will not stop watering.",
            "My hay fever is out of control. I went through an entire box of tissues today. An entire box. And my eyes look like I have been crying for hours. People keep asking if I am OK and I have to explain that no, I am not sad, I am just... allergic to spring.",
        ],
        context: 'hay fever=花粉症。allergy season=花粉シーズン。日本の花粉症人口は世界トップクラス。英語圏にも花粉症はあるけど日本ほど「国民病」扱いされていない。allergic to spring は「春アレルギー」で笑いを取れる。マスク文化の説明にも使える話題。',
        character: 'yuki', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 12, japanese: 'ストレスたまってます',
        english: [
            'I am stressed.',
            "I'm so stressed out.",
            "I have been really stressed lately. Work has been insane.",
            "I am stressed to the max right now. Work is nonstop, I have not had a day off in like two weeks, and my boss keeps adding stuff to my plate. I need a vacation. Or a new job. Or both.",
        ],
        context: 'stressed out は stressed の強化版。to the max=限界まで。adding stuff to my plate は「仕事を追加する」の比喩。日本語の「ストレスたまる」は「蓄積する」イメージだけど英語は stressed out と「外に溢れ出る」イメージ。蓄積 vs 爆発の文化差。',
        character: 'lisa', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 12, japanese: '最近太った気がする',
        english: [
            'I think I gained weight.',
            "I've put on some weight lately.",
            "I think I put on a few kilos. My pants are getting tight.",
            "I have definitely put on weight. My jeans do not lie. I keep telling myself it is water weight but it has been 'water weight' for three months now so... yeah. I should probably do something about it.",
        ],
        context: 'put on weight=太る。gained weight も同じ。a few kilos/pounds で具体的に。英語圏では体重の話はやや繊細。自分の話はOKだけど他人に You gained weight とは絶対に言わない。日本より厳しいタブー。水太り=water weight は英語でも言い訳の定番。',
        character: 'takeshi', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 12, japanese: '運動不足だわ',
        english: [
            'I need to exercise more.',
            "I have not been moving enough.",
            "I'm so out of shape. I need to start working out again.",
            "I am so out of shape it is embarrassing. I tried to run for the train yesterday and I was breathing like I just ran a marathon. I keep saying I will start going to the gym but... I have been saying that for a year.",
        ],
        context: 'out of shape=体がなまってる。work out=運動する。「運動不足」は英語にぴったりの1語がない。I have not been active か out of shape で伝える。日本語は「不足」という名詞で済むけど英語は状態(out of shape)か行動(not exercising)で描写する。',
        character: 'master', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 12, japanese: '健康診断ヤバかった',
        english: [
            'My checkup was bad.',
            "My health checkup did not go well.",
            "I got my health checkup results back and they were not great. The doctor gave me a look.",
            "So I got my health checkup results and... let's just say the doctor was not thrilled. My cholesterol is up, my blood pressure is borderline, and apparently I need to 'reconsider my lifestyle choices.' That is doctor speak for 'stop eating garbage.'",
        ],
        context: '「健康診断」は annual checkup か health screening。日本の会社員は毎年受けるけど、アメリカは保険次第で受けない人も多い。gave me a look=微妙な顔をされた。doctor speak=医者語。英語は結果を物語風に語るのが面白い。',
        character: 'kenji', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 12, japanese: 'もう限界です',
        english: [
            'I am at my limit.',
            "I'm done. I cannot take anymore.",
            "I have hit my limit. I need to just crash tonight.",
            "I am done. Stick a fork in me, I am done. I cannot do one more thing today. My brain has left the building. I am going home, I am going to bed, and I am not talking to anyone until tomorrow.",
        ],
        context: 'I am done. が「もう限界」の最短形。Stick a fork in me は「もう焼けた=もう終わり」のユーモア表現(ステーキに刺すフォークの比喩)。my brain has left the building は Elvis has left the building のパロディ。英語は限界表現にユーモアを込めるのが上手い。',
        character: 'takeshi', category: 'feeling', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 13: 道を教える (Giving Directions)
    // Scene: タケシが駅で外国人に道を聞かれて、
    //        今度はちゃんと答えようとする。
    // ────────────────────────────────────────────────────

    {
        daySlot: 13, japanese: 'まっすぐ行ってください',
        english: [
            'Go straight.',
            "Just go straight ahead.",
            "Go straight down this road for about two blocks.",
            "OK so you want to go straight. Like, just keep walking this way and do not turn anywhere. You will see a big intersection — do not go there, just keep going straight past it. It is on this road the whole time.",
        ],
        context: 'go straight は道案内の基本中の基本。ahead を足すと「この先」が明確に。block は「区画」でアメリカの道案内では距離の単位として使う。日本の「〜メートル先」より blocks か minutes(歩いて何分)で伝えるのが英語圏流。',
        character: 'takeshi', category: 'request', month: '2026-04',
    },
    {
        daySlot: 13, japanese: '右に曲がってください',
        english: [
            'Turn right.',
            "Take a right here.",
            "Turn right at that traffic light up there.",
            "You want to take a right. See that traffic light? The one right there. When you get there, turn right and then you are basically there. It will be on your left side.",
        ],
        context: 'turn right と take a right は同じ意味。take a right のほうが会話的。at the traffic light=信号で。日本語は「右に曲がって」だけど英語は「どこで」右に曲がるかを具体的に言う。目印(landmark)をセットで伝えるのが英語の道案内のコツ。',
        character: 'takeshi', category: 'request', month: '2026-04',
    },
    {
        daySlot: 13, japanese: 'あの角を左に曲がってください',
        english: [
            'Turn left at that corner.',
            "Make a left at that corner.",
            "See that corner over there? Take a left there.",
            "OK, see that corner? The one with the coffee shop? Take a left right there. And then it is like a thirty-second walk from there. You cannot miss it. Well, you can, but it is pretty obvious.",
        ],
        context: 'make a left は take a left と同じ。corner=角。you cannot miss it は「見逃しようがない」の道案内定番フレーズ（ただし実際は見逃すことが多い）。over there=あそこ。英語の道案内は「見える目印」を使うのが鉄則。',
        character: 'lisa', category: 'request', month: '2026-04',
    },
    {
        daySlot: 13, japanese: '2つ目の信号を右です',
        english: [
            'Second light, turn right.',
            "At the second traffic light, turn right.",
            "Go until you hit the second traffic light and then turn right.",
            "So you are going to pass one traffic light — just keep going. And then the second one, that is where you turn right. Do not turn at the first one, that is the mistake everyone makes. Second light, right turn.",
        ],
        context: 'second light=2つ目の信号。hit は「着く・たどり着く」のカジュアルな言い方。日本語は「2つ目の信号」でシンプルだけど英語は「最初のは無視して2つ目で」と注意を足すのが親切。道案内で「やらないこと」も言うのが英語の特徴。',
        character: 'takeshi', category: 'request', month: '2026-04',
    },
    {
        daySlot: 13, japanese: '歩いて5分くらいです',
        english: [
            'About five minutes on foot.',
            "It's about a five-minute walk.",
            "It's a five-minute walk from here. Maybe less if you walk fast.",
            "It is like five minutes walking? Maybe seven? I do not know, I always underestimate these things. Let's say ten to be safe. But it is close. Definitely walkable.",
        ],
        context: 'a five-minute walk=歩いて5分。ハイフンでつなぐのがポイント（形容詞化）。on foot=歩きで。walkable=歩ける距離。英語ネイティブも道案内の時間は大体テキトー。I always underestimate は「いつも少なく見積もる」の正直な告白。',
        character: 'mina', category: 'request', month: '2026-04',
    },
    {
        daySlot: 13, japanese: 'この道沿いです',
        english: [
            'Along this road.',
            "It's along this street.",
            "Just follow this road and it will be on your right.",
            "Just stay on this road. Do not turn or anything, just keep following it. It is right along here. You will see it on your right side — there is a big sign so it is hard to miss.",
        ],
        context: 'along=〜に沿って。follow this road=この道を進む。on your right=右手に。日本語の「道沿い」は1語で便利だけど英語は along this road か on this street と言う。stay on this road は「この道から逸れるな」のニュアンスで迷わせない表現。',
        character: 'kenji', category: 'request', month: '2026-04',
    },
    {
        daySlot: 13, japanese: '反対側ですよ',
        english: [
            'It is on the other side.',
            "It's on the opposite side of the street.",
            "Actually, it is on the other side of the street. You need to cross over.",
            "Oh wait, it is actually on the other side. Yeah, you need to cross the street. There should be a crosswalk right over there — use that one. Do not just run across, it is pretty busy.",
        ],
        context: 'the other side=反対側。opposite side はもっと明確。cross the street=道を渡る。crosswalk=横断歩道。日本語の「反対側」は方向だけだけど英語は「渡り方」まで教えるのが親切な道案内。jaywalking（信号無視横断）は海外では罰金の地域もある。',
        character: 'master', category: 'request', month: '2026-04',
    },
    {
        daySlot: 13, japanese: '通り過ぎちゃいましたよ',
        english: [
            'You passed it.',
            "You went too far.",
            "I think you passed it. You need to turn around and go back a little.",
            "Oh no, you already passed it. Yeah, it was back there. Turn around and walk back like two minutes. It is on the left side — there's a blue awning. I think. Actually I am not sure about the awning but it is definitely on the left.",
        ],
        context: 'passed it=通り過ぎた。turn around=振り返る・Uターンする。go back=戻る。awning=ひさし。英語で道案内を間違えたとき You went too far が一番伝わる。日本語の「通り過ぎた」は英語では went past it / passed it の2パターン。',
        character: 'takeshi', category: 'request', month: '2026-04',
    },
    {
        daySlot: 13, japanese: '地図見せましょうか？',
        english: [
            'Want to see a map?',
            "Here, let me show you on the map.",
            "Hold on, let me pull it up on my phone. It will be easier to show you.",
            "You know what, let me just show you on the map. I am terrible at giving directions and I do not want to send you the wrong way. Here, look — we are here and you want to go... right there. See?",
        ],
        context: 'pull it up=スマホで調べる。let me show you on the map が現代の道案内の最終兵器。日本語の「見せましょうか」はオファーだけど英語は I am terrible at giving directions と自分の道案内力の低さを認めるのが正直で好感度が高い。',
        character: 'yuki', category: 'request', month: '2026-04',
    },
    {
        daySlot: 13, japanese: '一緒に行きましょうか？',
        english: [
            'I can take you there.',
            "Want me to walk you there?",
            "It's kind of hard to explain. I'm heading that way anyway, so let me just walk you there.",
            "You know what, this is getting complicated. I am actually going that direction so let me just walk you there. It is easier than me trying to explain it and you getting more lost. Come on, it is right this way.",
        ],
        context: '道案内で「もう連れて行ったほうが早い」パターン。I am heading that way=同じ方向に行く。let me walk you there=連れて行く。日本人のこの親切さは海外で感動される。英語では It is easier than explaining が「説明するより早い」の自然な言い方。',
        character: 'lisa', category: 'request', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 14: 食べ物の話 (Talking About Food)
    // Scene: 週末の居酒屋。「何が好き？何が嫌い？」食の好みバトル。
    // ────────────────────────────────────────────────────

    {
        daySlot: 14, japanese: '好き嫌いある？',
        english: [
            'Are you a picky eater?',
            "Are you picky about food?",
            "Are you a picky eater? Or are you the type that eats anything?",
            "So are you picky? Like, is there stuff you absolutely will not eat? Because I need to know before we order. I once ordered something for a friend and it did not go well. Trust issues were formed.",
        ],
        context: 'picky eater=好き嫌いが多い人。英語の picky は「選り好みする」で日本語の「好き嫌い」より人格の描写に近い。the type that eats anything=なんでも食べるタイプ。英語では食の好みを人のタイプとして語る。好き嫌いの有無が人物紹介の一部になる文化。',
        character: 'master', category: 'social', month: '2026-04',
    },
    {
        daySlot: 14, japanese: 'パクチーが苦手で',
        english: [
            'I do not like cilantro.',
            "I can't do cilantro.",
            "I'm one of those people who cannot stand cilantro. It tastes like soap to me.",
            "Cilantro is my enemy. I know people love it but to me it literally tastes like soap. And yes, I know it is a gene thing. My DNA said no and I am going to respect that. Keep it away from me.",
        ],
        context: 'cannot stand=我慢できない。it tastes like soap=石鹸の味がする。パクチー嫌いは遺伝子（OR6A2）で決まるのが科学的に証明されている。cilantro（アメリカ英語）=coriander（イギリス英語）。I cannot do... は「無理」のカジュアル表現で食べ物の話に最適。',
        character: 'kenji', category: 'social', month: '2026-04',
    },
    {
        daySlot: 14, japanese: 'めっちゃ辛いの好き',
        english: [
            'I love spicy food.',
            "I'm a huge fan of spicy food.",
            "I love spicy food. The hotter the better.",
            "I am obsessed with spicy food. Like, I want it to hurt. If I'm not sweating, it is not spicy enough. My friends think I'm crazy but there is something about that endorphin rush. It is basically a sport for me.",
        ],
        context: 'the hotter the better=辛ければ辛いほどいい。the 比較級, the 比較級 は英語の最重要構文の1つ。spicy と hot の使い分け: spicy=スパイス系、hot=唐辛子系の辛さ。日本語の「辛い」は1語だけど英語は辛さの種類を区別する。endorphin rush=快感物質放出。',
        character: 'takeshi', category: 'social', month: '2026-04',
    },
    {
        daySlot: 14, japanese: 'やっぱり和食が一番',
        english: [
            'Japanese food is the best.',
            "Nothing beats Japanese food.",
            "At the end of the day, Japanese food is still my number one. Nothing comes close.",
            "I have tried food from all over and honestly? Nothing beats Japanese food. It is not even close. The freshness, the balance, the presentation — everything is just on another level. I am biased but I do not care.",
        ],
        context: 'nothing beats=〜に勝るものはない。at the end of the day=結局のところ。on another level=レベルが違う。I am biased=偏ってる自覚あり。日本語の「やっぱり」は英語に直訳しにくい。at the end of the day か after all が一番近いけど完全一致はない。',
        character: 'master', category: 'social', month: '2026-04',
    },
    {
        daySlot: 14, japanese: 'ラーメン派？うどん派？',
        english: [
            'Ramen or udon?',
            "Are you more of a ramen person or an udon person?",
            "OK serious question — ramen or udon? You can only pick one.",
            "OK this is important. Ramen or udon. And do not say both, that is a cop-out. If you could only eat one for the rest of your life, which one? This tells me everything I need to know about a person.",
        ],
        context: 'Are you more of a... person? は「〜派？」の完璧な英訳。cop-out=逃げ・ずるい答え。英語の or questions（二択質問）は雑談の盛り上げ術。日本語の「〜派」は英語にぴったりの1語がないけど、a ... person が最も自然。team ramen も最近使う。',
        character: 'mina', category: 'social', month: '2026-04',
    },
    {
        daySlot: 14, japanese: '料理するの？',
        english: [
            'Do you cook?',
            "Do you cook at all?",
            "Do you cook? Or are you more of a takeout person?",
            "Do you cook? Like actually cook, not just heat stuff up in the microwave. Because I feel like everyone says they cook but half of them just mean they can make instant noodles. Which is valid but also... come on.",
        ],
        context: 'at all=そもそも（疑い混じり）。takeout person=外食・出前派。heat stuff up=温める。日本語の「料理する」は曖昧だけど英語では cook from scratch（ゼロから作る）vs heat something up（温めるだけ）の区別がある。自炊のレベルが問われる。',
        character: 'lisa', category: 'social', month: '2026-04',
    },
    {
        daySlot: 14, japanese: 'レシピ教えて',
        english: [
            'Can you share the recipe?',
            "You have to give me that recipe.",
            "That sounds amazing. You have to send me the recipe.",
            "Wait, you made that yourself? OK you have to send me the recipe. Like, the actual recipe, not the 'oh I just throw stuff in' thing. I need measurements. I need steps. I am a recipe follower, not a recipe improviser.",
        ],
        context: 'share the recipe=レシピを教える。send me the recipe はLINEやメールで送ってもらう現代版。throw stuff in=適当に入れる。英語の料理トークで I just eyeball it（目分量）は自慢フレーズ。日本語の「適当に」は英語で just wing it か eyeball it。',
        character: 'yuki', category: 'social', month: '2026-04',
    },
    {
        daySlot: 14, japanese: '食べ放題行きたい',
        english: [
            'I want to go to a buffet.',
            "Let's do all-you-can-eat.",
            "I'm in the mood for an all-you-can-eat place. I'm starving.",
            "Can we do all-you-can-eat? I am in one of those moods where I just want to eat without thinking about the price. Like, I want to go in hungry and come out regretting everything. That is the all-you-can-eat experience.",
        ],
        context: 'all-you-can-eat=食べ放題。buffet はビュッフェ式。日本の食べ放題は時間制限・品質ともに世界最高クラス。英語の all-you-can-eat は「可能な限り食べられる」の直訳で、日本語の「放題」の解放感が英語にもある。come out regretting は食べ放題の真理。',
        character: 'takeshi', category: 'social', month: '2026-04',
    },
    {
        daySlot: 14, japanese: '外食ばっかりだよ',
        english: [
            'I eat out all the time.',
            "I'm always eating out.",
            "I eat out way too much. My wallet is suffering.",
            "I eat out constantly. Like, I think my kitchen is just for decoration at this point. I have a stove I have not turned on in months. It is bad. My bank account knows. I know. Everyone knows. But here I am at a restaurant again.",
        ],
        context: 'eat out=外食する。way too much=あまりに多すぎ。my wallet is suffering は「財布が泣いてる」と同じユーモア。at this point=もはや・この時点で。日本語の「ばっかり」は英語で all the time / constantly / always で、頻度の強調はどの言語でも大げさに言うのが面白い。',
        character: 'mina', category: 'social', month: '2026-04',
    },
    {
        daySlot: 14, japanese: 'お腹すいた',
        english: [
            'I am hungry.',
            "I'm starving.",
            "I am so hungry I could eat anything right now.",
            "I am starving. Like, actually starving. My stomach has been making noises for the last hour and I think the person next to me on the train heard it. That was a fun moment. Can we please just order everything on the menu?",
        ],
        context: 'I am starving は I am hungry の10倍空腹バージョン。starving=餓死しそう、はネイティブの大げさ表現の典型。I could eat a horse（馬1頭食べられる）も定番。日本語の「お腹すいた」はカジュアルで短いけど、英語も I am starving の3語で同じ空気が出る。',
        character: 'master', category: 'social', month: '2026-04',
    },
];

// ============================================================
// WEEK 2 DAY THEMES
// ============================================================

export const WEEK2_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    8: {
        title: '自己紹介をもっと', titleEn: 'More About Yourself', category: 'greeting',
        scene: '居酒屋の2回目。みんなが自分の話をもっと深くする夜。',
        keywords: [
            { en: 'originally', ja: '元々は', pron: 'オリジナリー', example: "I'm originally from Osaka.", note: 'from だけだと「今住んでる」に聞こえる。originally を足すと「出身」が明確。' },
            { en: 'background', ja: '経歴', pron: 'バックグラウンド', example: "What's your background?", note: '学歴・職歴・出自すべてをカバーする便利な1語。自己紹介で重宝する。' },
            { en: 'career', ja: 'キャリア・仕事', pron: 'キャリア', example: 'I switched careers a few years ago.', note: 'job=今の仕事、career=職業人生全体。転職の話はswitched careersが自然。' },
            { en: 'passion', ja: '情熱・好きなこと', pron: 'パッション', example: "Cooking is my real passion.", note: '日本語の「情熱」より軽く使える。What is your passion? は「何が好き？」の上位版。' },
            { en: 'personality', ja: '性格', pron: 'パーソナリティ', example: "We have similar personalities.", note: 'character は「人格」寄り。日常会話の「性格」は personality のほうが自然。' },
        ],
    },
    9: {
        title: 'カフェで注文', titleEn: 'At a Cafe', category: 'order',
        scene: 'リサが常連たちをおしゃれカフェに連れて行く。タケシが意味不明なサイズ名にパニック。',
        keywords: [
            { en: 'medium', ja: '中サイズ', pron: 'ミディアム', example: "I'll take a medium.", note: 'スタバの grande は medium のこと。普通のカフェは small/medium/large で問題なし。' },
            { en: 'decaf', ja: 'カフェインなし', pron: 'ディキャフ', example: 'Can I get a decaf latte?', note: 'decaffeinated の略。夜カフェや妊婦さんの注文で頻出。1語で通じる。' },
            { en: 'oat milk', ja: 'オーツミルク', pron: 'オートミルク', example: 'Can I swap the milk for oat?', note: '海外カフェの牛乳代替品: oat / almond / soy。swap=交換する。追加料金が多い。' },
            { en: 'pastry', ja: '焼き菓子・パン類', pron: 'ペイストリー', example: 'What pastries do you have?', note: 'クロワッサン・マフィン・スコーンなどカフェの食べ物の総称。breadより広い。' },
            { en: 'refill', ja: 'おかわり', pron: 'リフィル', example: 'Can I get a refill?', note: 'アメリカのダイナーはコーヒーのrefill無料が多い。日本の「おかわり自由」に近い文化。' },
        ],
    },
    10: {
        title: 'ドラッグストアで', titleEn: 'At a Drugstore', category: 'shopping',
        scene: 'ケンジが海外出張前にドラッグストアで買い物。何をどう聞けばいいかわからない。',
        keywords: [
            { en: 'painkiller', ja: '鎮痛剤', pron: 'ペインキラー', example: 'Do you have any painkillers?', note: 'pain(痛み)+killer(殺す)=痛みを殺す薬。直訳が分かりやすい英語の好例。' },
            { en: 'prescription', ja: '処方箋', pron: 'プリスクリプション', example: 'Do I need a prescription?', note: '発音が難しいけど薬局で必須。OTC=over the counter=処方箋不要の薬。' },
            { en: 'dosage', ja: '服用量', pron: 'ドーセッジ', example: "What's the recommended dosage?", note: 'dose=1回分、dosage=服用量全体。薬のラベルにdosage instructionsと書いてある。' },
            { en: 'sunscreen', ja: '日焼け止め', pron: 'サンスクリーン', example: 'I need SPF 50 sunscreen.', note: 'sunscreen=日焼け止め全般。sunblock はより強力なもの。SPFは英語でもSPF。' },
            { en: 'symptoms', ja: '症状', pron: 'シンプトムズ', example: 'What are your symptoms?', note: '薬局で症状を伝えると店員が薬を選んでくれる。英語圏の薬局は対面相談が基本。' },
        ],
    },
    11: {
        title: 'ホテルで', titleEn: 'At a Hotel', category: 'travel',
        scene: 'ユキが初めての海外ホテル。チェックインからトラブルまで。',
        keywords: [
            { en: 'reservation', ja: '予約', pron: 'レザベイション', example: 'I have a reservation under Tanaka.', note: 'ホテル・レストランは reservation。予約する=make a reservation。book も同じ。' },
            { en: 'checkout', ja: 'チェックアウト', pron: 'チェックアウト', example: 'What time is checkout?', note: 'check out(動詞)vs checkout(名詞)。late checkout=遅めの退出。聞くだけタダ。' },
            { en: 'luggage', ja: '荷物', pron: 'ラゲッジ', example: 'Can you hold my luggage?', note: 'luggage=大きい旅行荷物（不可算）。bags=個々のバッグ（可算）。使い分けは微妙。' },
            { en: 'reception', ja: 'フロント', pron: 'レセプション', example: 'I will call reception.', note: '日本語の「フロント」は和製英語。英語は reception か front desk。' },
            { en: 'complimentary', ja: '無料の', pron: 'コンプリメンタリー', example: 'Is breakfast complimentary?', note: 'free より上品な「無料」。ホテルの朝食・Wi-Fi・水など。with compliments=サービスです。' },
        ],
    },
    12: {
        title: '体調の話', titleEn: 'Talking About How You Feel', category: 'feeling',
        scene: '居酒屋で「今日しんどかった」から始まる体調トーク。',
        keywords: [
            { en: 'hangover', ja: '二日酔い', pron: 'ハングオーバー', example: 'I have the worst hangover.', note: 'hung over(形容詞)で「二日酔いだ」。映画のタイトルにもなった。飲み会翌日の必須語。' },
            { en: 'stiff', ja: '凝っている', pron: 'スティフ', example: 'My neck is really stiff.', note: '肩こり=stiff shoulders。英語に「肩こり」ぴったりの1語はない。部位+stiffで表現。' },
            { en: 'hay fever', ja: '花粉症', pron: 'ヘイフィーバー', example: 'My hay fever is terrible.', note: 'hay(干し草)+fever(熱)が語源。seasonal allergies とも言う。春の定番トーク。' },
            { en: 'exhausted', ja: 'へとへと', pron: 'イグゾーステッド', example: 'I am absolutely exhausted.', note: 'tired の上位互換。tiredの3倍疲れてるイメージ。dead tired, wiped out も同義。' },
            { en: 'diet', ja: 'ダイエット・食生活', pron: 'ダイエット', example: 'I need to fix my diet.', note: '英語の diet は「食生活」全般。痩せることだけじゃない。go on a diet=ダイエットを始める。' },
        ],
    },
    13: {
        title: '道を教える', titleEn: 'Giving Directions', category: 'request',
        scene: 'タケシが駅で外国人に道を聞かれて、今度はちゃんと答えようとする。',
        keywords: [
            { en: 'intersection', ja: '交差点', pron: 'インターセクション', example: 'Turn right at the intersection.', note: '十字路=intersection、T字路=T-junction。日本語の「交差点」と同じ概念。' },
            { en: 'block', ja: '区画', pron: 'ブロック', example: "It's two blocks from here.", note: 'アメリカの道案内の距離単位。1 block=1区画分。日本語のメートルより感覚的。' },
            { en: 'straight', ja: 'まっすぐ', pron: 'ストレイト', example: 'Go straight for two blocks.', note: 'go straight=まっすぐ進む。straightforward=簡単、道案内以外でも超頻出。' },
            { en: 'opposite', ja: '反対側の', pron: 'オポジット', example: "It's on the opposite side.", note: 'across the street=道の向こう側。opposite=反対側。対面の意味で使う。' },
            { en: 'landmark', ja: '目印', pron: 'ランドマーク', example: 'Look for the big red sign.', note: '道案内では建物・看板などの目印を伝えるのが英語の基本。landmark=目立つ目印。' },
        ],
    },
    14: {
        title: '食べ物の話', titleEn: 'Talking About Food', category: 'social',
        scene: '週末の居酒屋。「何が好き？何が嫌い？」食の好みバトル。',
        keywords: [
            { en: 'picky', ja: '好き嫌いが多い', pron: 'ピッキー', example: "I'm not picky at all.", note: 'picky eater=好き嫌い多い人。pickは選ぶ→選り好みする。ネガティブ寄りの言葉。' },
            { en: 'crave', ja: '無性に食べたい', pron: 'クレイヴ', example: "I'm craving ramen.", note: '「食べたい」の最上級。want<feel like<crave の順で欲求が強い。craving=渇望。' },
            { en: 'cuisine', ja: '料理・料理法', pron: 'クイジーン', example: "What's your favorite cuisine?", note: 'food より上品。Japanese cuisine=和食（フォーマル）。What kind of food? がカジュアル版。' },
            { en: 'homemade', ja: '手作りの', pron: 'ホームメイド', example: 'Nothing beats homemade food.', note: 'home+made=家で作った。from scratch=ゼロから手作り。store-bought=市販品。' },
            { en: 'portion', ja: '量・盛り', pron: 'ポーション', example: 'The portions here are huge.', note: '1人前の量=portion。アメリカのportionは日本の2-3倍。portion control=量のコントロール。' },
        ],
    },
};
