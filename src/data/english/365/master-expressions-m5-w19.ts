/**
 * 365 English Master -- Month 5 Week 19: 家と暮らし (Home and Living)
 * Days 135-141: 70 expressions
 * Month: August 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 5 (2026-08) -- WEEK 19
// ============================================================

export const MONTH5_W19_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 135: 部屋探し (Apartment Hunting)
    // Scene: タケシが引っ越し先を探していて、居酒屋で物件の条件を相談する
    // ────────────────────────────────────────────────────

    {
        daySlot: 135, japanese: '駅から近い物件を探してるんだけど',
        english: [
            'I am looking for a place near the station.',
            'I need a place within walking distance of the station.',
            'I have been looking for apartments near the station, but everything decent is way over my budget.',
            "Yeah, anything within walking distance gets snatched up fast. Have you tried looking one stop over? Rents drop a lot.",
        ],
        context: 'within walking distance は「徒歩圏内」。日本語では「駅近」の一言で済むけど、英語ではwithin walking distance of the stationと具体的に言う必要がある。close to the stationでもOKだけど、距離感が曖昧。',
        character: 'takeshi', category: 'request', month: '2026-08',
    },
    {
        daySlot: 135, japanese: '家賃はいくらまで出せる？',
        english: [
            'What is your budget for rent?',
            'How much can you afford per month for rent?',
            'So what is your max budget for rent? Are you including utilities in that number?',
            "Honestly, around eighty thousand yen tops. But that's before utilities, so I guess I need some wiggle room.",
        ],
        context: 'budget は「予算」。日本語の「家賃」は rent だけど、英語では utilities(光熱費)を別に聞くのが普通。日本のように管理費込みの感覚がないので、What does it include? と聞くのが大事。',
        character: 'kenji', category: 'request', month: '2026-08',
    },
    {
        daySlot: 135, japanese: '内見って予約いるの？',
        english: [
            'Do I need to book a viewing?',
            'Should I schedule a viewing first, or can I just show up?',
            'I found a place online that looks perfect. Do I need to make an appointment to see it, or do they do walk-ins?',
            "You'll definitely want to book one. Just call the agent and they'll set it up, usually same week.",
        ],
        context: 'viewing は「内見」。日本語の「内見」は不動産用語だけど、英語の viewing はもっと広く使える。showing もアメリカではよく使う。open house は予約不要の自由内見会のこと。',
        character: 'yuki', category: 'request', month: '2026-08',
    },
    {
        daySlot: 135, japanese: '日当たりはどう？',
        english: [
            'How is the sunlight?',
            'Does it get good natural light?',
            'What direction does it face? I really need a place with good natural light.',
            "It's south-facing, so you'll get great light all afternoon. The windows are pretty big too.",
        ],
        context: '日本語では「日当たり」一語で済むけど、英語では natural light が一番自然。sunlight でも通じるけど、不動産の文脈では natural light の方が標準。south-facing=南向き。日本と同じく南向きが人気。',
        character: 'mina', category: 'request', month: '2026-08',
    },
    {
        daySlot: 135, japanese: '初期費用ってどれくらい？',
        english: [
            'How much are the move-in costs?',
            'What are the upfront costs? Like deposit and everything.',
            'Before I get too excited about this place, how much do I need to pay upfront? First and last month plus deposit?',
            "For this one it's first month plus a two-month deposit. No key money, which is pretty rare around here.",
        ],
        context: 'upfront costs は「初期費用」。英語圏では first month + security deposit が一般的。日本の敷金=security deposit, 礼金=key money。key money は海外ではほぼ存在しないので、説明が必要になる概念。',
        character: 'takeshi', category: 'request', month: '2026-08',
    },
    {
        daySlot: 135, japanese: 'ペット飼える物件ある？',
        english: [
            'Are pets allowed?',
            'Do you have any pet-friendly apartments available?',
            'I have a small dog, so I need a place that allows pets. Are there any options in my price range?',
            "There are a couple of pet-friendly units in that building, actually. You'd just need to pay an extra deposit.",
        ],
        context: 'pet-friendly は「ペット可」。日本語では「ペット可」だけど、英語では pets allowed, pet-friendly の他に、no pets policy という表現もある。pet deposit=ペット保証金。海外ではペット用の追加料金が一般的。',
        character: 'lisa', category: 'request', month: '2026-08',
    },
    {
        daySlot: 135, japanese: '隣の部屋の音って聞こえる？',
        english: [
            'Can you hear the neighbors?',
            'How thin are the walls? Can you hear the neighbors?',
            'Be honest with me. Can you hear your neighbors through the walls? Because noise is a dealbreaker for me.',
            "It's a concrete building, so you shouldn't hear much. Way better than those wooden ones where you hear everything.",
        ],
        context: 'soundproofing は「防音」。thin walls=壁が薄い。日本語の「壁が薄い」はそのまま thin walls で通じる。noise complaint=騒音苦情。日本のアパートの壁の薄さは海外の人が驚くレベル。',
        character: 'kenji', category: 'request', month: '2026-08',
    },
    {
        daySlot: 135, japanese: 'いつから入居できますか？',
        english: [
            'When can I move in?',
            'What is the earliest I can move in?',
            'If I sign the lease today, when would I be able to move in? I need a place by the end of the month.',
            "They said it's available from the first, but if you push a little they might let you grab the keys a few days early.",
        ],
        context: 'move in は「入居する」、move out は「退去する」。lease=賃貸契約。sign the lease=契約書にサインする。日本語の「入居日」は move-in date。available は「入居可能」の意味でも使う。',
        character: 'mina', category: 'request', month: '2026-08',
    },
    {
        daySlot: 135, japanese: 'この辺って治安どう？',
        english: [
            'Is this area safe?',
            'How is the safety around here? Is it okay at night?',
            'I want to ask honestly, is this neighborhood safe? Especially for a woman walking alone at night.',
            "I've lived here for three years and never had any issues. It's well-lit and there's a convenience store open late, so it feels pretty safe.",
        ],
        context: 'neighborhood は「近所・地域」。日本語の「治安」にぴったりの英語はない。safety, safe area, crime rate あたりで表現する。sketchy=怪しい雰囲気。It looks sketchy. は「ちょっとヤバそう」。',
        character: 'yuki', category: 'request', month: '2026-08',
    },
    {
        daySlot: 135, japanese: '引っ越し業者って頼んだ方がいい？',
        english: [
            'Should I hire movers?',
            'Is it worth it to hire a moving company, or should I do it myself?',
            'I am trying to figure out if I should hire professional movers or just rent a truck and ask friends for help.',
            "Definitely hire them. It's worth every yen. I tried doing it myself once and threw my back out carrying the sofa.",
        ],
        context: 'movers は「引っ越し業者」。hire movers=業者を頼む。moving company も同じ意味。日本の引っ越し業者のサービスレベル（靴下履き替え、養生テープ）は海外では考えられない丁寧さ。',
        character: 'master', category: 'request', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 136: インテリア (Home Decor)
    // Scene: リサとミナが家具屋でインテリアを見ながら理想の部屋について語る
    // ────────────────────────────────────────────────────

    {
        daySlot: 136, japanese: 'このソファいい感じじゃない？',
        english: [
            'This sofa looks nice.',
            'Hey, what do you think about this sofa? It looks really nice.',
            'Oh, come look at this one. The color is perfect and it looks super comfortable. What do you think?',
            "Oh wow, that's gorgeous. The color's great too. Sit down and try it before you decide!",
        ],
        context: 'sofa と couch はほぼ同じ意味。アメリカでは couch の方がカジュアルで日常的。What do you think? は「どう思う？」の定番。日本語のように「いい感じ」一語でニュアンスを伝えるのが英語では難しい。',
        character: 'lisa', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 136, japanese: '部屋のテイストに合うかな',
        english: [
            'Does it match my room?',
            'Do you think this would go with the rest of my apartment?',
            'I love it on its own, but I am not sure it fits with the style of my room. Everything else is pretty minimalist.',
            "Hmm, it might be a bit bold for your place. What if you got it in a neutral color instead?",
        ],
        context: 'go with は「合う」。match より柔らかい表現。日本語の「テイスト」は英語の taste ではなく style や aesthetic が近い。statement piece=主役になる目立つ家具。インテリア英語の定番。',
        character: 'mina', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 136, japanese: '組み立て式って面倒じゃない？',
        english: [
            'Is it hard to assemble?',
            'It is flat-pack, right? How hard is it to put together?',
            'I love the price, but it says assembly required. How bad is it? I am terrible at that stuff.',
            "It's not that bad if you follow the instructions. Grab a buddy and you can knock it out in an hour.",
        ],
        context: 'flat-pack は「組み立て式」。IKEAの家具で有名になった言葉。assembly required=組み立てが必要。Allen wrench=六角レンチ。日本語の「組み立て式」より flat-pack の方が具体的なイメージがある。',
        character: 'takeshi', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 136, japanese: 'カーテンの丈が足りない',
        english: [
            'The curtains are too short.',
            'These curtains do not reach the floor. I need longer ones.',
            'I measured wrong again. The curtains are like ten centimeters too short and it looks terrible.',
            "Can you exchange them? Just bring the receipt and get the next size up. Problem solved.",
        ],
        context: 'too short は「短すぎる」。curtain の長さは length。日本語では「丈」だけど、英語では length を使う。floor-length curtains=床まで届くカーテン。hemming=丈を詰める。裾上げの hem は服にもカーテンにも使える。',
        character: 'yuki', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 136, japanese: '照明を変えるだけで雰囲気変わるよ',
        english: [
            'Just changing the lights makes a big difference.',
            'You would be surprised how much the lighting changes the whole feel of a room.',
            'Honestly, you do not need to buy new furniture. Just upgrade the lighting and the room will feel completely different.',
            "That's so true. I switched to warm bulbs last month and my place feels completely different now.",
        ],
        context: 'lighting は「照明」。light は「光」や「電気」。warm light=暖色照明、cool light=寒色照明。overhead light=天井照明。日本語の「雰囲気」は英語では vibe, feel, atmosphere と場面で使い分ける。',
        character: 'master', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 136, japanese: 'これ返品できますか？',
        english: [
            'Can I return this?',
            'If it does not fit, can I return it? What is your return policy?',
            'I want to buy this but I am not a hundred percent sure about the size. What is your return policy?',
            "Sure, you've got thirty days with the receipt. Just keep the original packaging and you're good.",
        ],
        context: 'return policy は「返品ポリシー」。return window=返品可能期間。receipt=レシート。日本語の「返品」は英語では return。exchange=交換。refund=返金。return the item and get a refund=返品して返金してもらう。',
        character: 'lisa', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 136, japanese: '収納が全然足りない',
        english: [
            'There is not enough storage.',
            'I have zero storage space. I do not know where to put anything.',
            'My apartment has almost no closet space and I am running out of places to put things. I need more storage solutions.',
            "Have you tried those vertical shelf units? They don't take up much floor space and you can fit a ton of stuff on them.",
        ],
        context: 'storage は「収納」。closet=クローゼット（衣類用）、cabinet=棚（キッチンなど）。日本語の「収納」は全部まとめて一語だけど、英語では場所と用途によって使い分ける。storage solution=収納の工夫。',
        character: 'mina', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 136, japanese: 'DIYって得意？',
        english: [
            'Are you good at DIY?',
            'Are you handy? Can you do DIY stuff?',
            'I need to put up some shelves but I have never done anything like that. Are you good with tools?',
            "I'm decent with a drill. Bring the shelves over this weekend and I'll help you put them up.",
        ],
        context: 'handy は「器用な・手先が使える」。DIY は英語でもそのまま使う。good with tools=道具の扱いが上手い。floating shelves=壁付け棚。日本語の「得意」は英語では good at, skilled at, handy で表現。',
        character: 'kenji', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 136, japanese: 'ここに観葉植物置きたいな',
        english: [
            'I want to put a plant here.',
            'I think a houseplant would look great right here.',
            'This corner feels empty. I think a nice tall houseplant would really bring the space together.',
            "A monstera would look amazing there. They're pretty hard to kill too, so even you should be fine.",
        ],
        context: 'houseplant は「観葉植物」。fiddle-leaf fig=ウンベラータ、monstera=モンステラ。英語では indoor plant とも言う。green thumb=植物を育てるのが上手い人。I have a black thumb.=植物を枯らす人。',
        character: 'yuki', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 136, japanese: '模様替えしたいんだよね',
        english: [
            'I want to rearrange my room.',
            'I am thinking about rearranging my room. It needs a change.',
            'I have had the same layout for over a year and I am bored. I want to rearrange everything and give it a fresh feel.',
            "Do it! Even just swapping the couch and desk around can make the whole room feel brand new.",
        ],
        context: '「模様替え」は英語では rearrange the room。redecorate は壁紙やカーテンを変えるレベル。rearrange は家具の配置を変えるだけ。layout=配置。traffic flow=動線。日本語の「動線」は英語のインテリア用語でも重要。',
        character: 'takeshi', category: 'shopping', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 137: 掃除と片付け (Cleaning and Organizing)
    // Scene: 年末の大掃除の話題。ケンジが掃除嫌いで居酒屋のみんなにからかわれる
    // ────────────────────────────────────────────────────

    {
        daySlot: 137, japanese: '大掃除いつやる？',
        english: [
            'When do you do spring cleaning?',
            'When are you going to do your big yearly cleaning?',
            'Have you started your deep clean yet? I always wait until the last minute and then panic.',
            "I'm planning to start this weekend. Last year I put it off till the 30th and it was a nightmare.",
        ],
        context: 'spring cleaning は「大掃除」。英語圏では春にやる習慣。日本の年末大掃除の概念は year-end cleaning と説明するしかない。deep clean=徹底的な掃除。英語には「大掃除」にぴったりの一語がない。',
        character: 'yuki', category: 'request', month: '2026-08',
    },
    {
        daySlot: 137, japanese: '断捨離しなきゃ',
        english: [
            'I need to declutter.',
            'I really need to go through my stuff and get rid of things I do not need.',
            'My apartment is full of stuff I have not touched in years. I need a serious decluttering session.',
            "Same here. I've got boxes I haven't opened since my last move. If I haven't needed it in two years, it's going.",
        ],
        context: 'declutter は「片付ける・物を減らす」。Marie Kondo の影響で英語圏でも KonMari, spark joy が通じるようになった。断捨離は英語に訳せない概念だったけど、declutter が一番近い。purge=一気に処分する。',
        character: 'kenji', category: 'request', month: '2026-08',
    },
    {
        daySlot: 137, japanese: 'ゴミの分別って面倒だよね',
        english: [
            'Sorting trash is such a hassle.',
            'I hate sorting garbage. It takes forever to figure out what goes where.',
            'Sorting recyclables is one of those things I know I should do properly, but honestly it is so confusing sometimes.',
            "Tell me about it. I moved to a new ward and now I've got a whole different set of rules to memorize.",
        ],
        context: 'sort は「分別する」。recyclables=リサイクル品。日本のゴミ分別の細かさは海外の人が驚愕するレベル。英語圏はrecycling(リサイクル)とtrash(その他)の2種類が一般的。burnable/non-burnableは日本独自の概念。',
        character: 'mina', category: 'request', month: '2026-08',
    },
    {
        daySlot: 137, japanese: '掃除機かけた？',
        english: [
            'Did you vacuum?',
            'Have you vacuumed yet? The floor looks dusty.',
            'When was the last time you vacuumed? Because I can see dust bunnies forming a civilization under the couch.',
            "Uh... define 'recently.' I ran the robot vacuum on Tuesday, does that count?",
        ],
        context: 'vacuum は「掃除機をかける」。動詞としてそのまま使えるのが便利。dust bunny=ホコリの塊。日本語の「ホコリ」は英語では dust。「掃除機」は vacuum cleaner だけど、日常会話では vacuum だけで通じる。',
        character: 'lisa', category: 'request', month: '2026-08',
    },
    {
        daySlot: 137, japanese: '水回りの掃除が一番嫌い',
        english: [
            'I hate cleaning the bathroom.',
            'Cleaning the bathroom is the worst. I would rather do anything else.',
            'If there is one chore I absolutely cannot stand, it is scrubbing the bathroom. The mold, the grime, everything about it.',
            "Get one of those daily shower sprays. You just spritz it after every shower and it keeps the grime from building up.",
        ],
        context: '「水回り」は英語にない概念。bathroom, kitchen sink, laundry area とバラバラに言うしかない。scrub=ゴシゴシ洗う。mold=カビ。grout=タイルの目地。soap scum=石鹸カス。英語の掃除用語は意外と専門的。',
        character: 'kenji', category: 'request', month: '2026-08',
    },
    {
        daySlot: 137, japanese: '洗濯物たまってるんだよな',
        english: [
            'I have a pile of laundry.',
            'My laundry has been piling up all week. I really need to do it.',
            'I have been putting off laundry for way too long. I think I am down to my last clean shirt.',
            "Just throw a load in before bed tonight. It takes like five minutes to start and you'll have clean stuff in the morning.",
        ],
        context: 'do the laundry は「洗濯する」。pile up=たまる。英語では laundry は洗う前の服と洗い終わった服の両方を指す。dirty laundry=汚れた洗濯物。fold the laundry=洗濯物をたたむ。hang out=干す。',
        character: 'takeshi', category: 'request', month: '2026-08',
    },
    {
        daySlot: 137, japanese: 'どこに何があるか分からない',
        english: [
            'I cannot find anything.',
            'My place is so messy I cannot find anything anymore.',
            'I spent twenty minutes looking for my keys this morning because my apartment is a disaster. I need a system.',
            "You need a designated spot for everything. Start with your keys and wallet, and the rest will follow.",
        ],
        context: 'messy は「散らかっている」。cluttered は物が多くて散らかっている状態。organized=整理されている。a place for everything and everything in its place=全部に定位置を決める。整理整頓のスローガン。',
        character: 'mina', category: 'request', month: '2026-08',
    },
    {
        daySlot: 137, japanese: 'これまだ使う？捨てていい？',
        english: [
            'Do you still use this? Can I throw it out?',
            'When was the last time you used this? If you cannot remember, it is time to toss it.',
            'Seriously, do you actually need this or are you keeping it just in case? Because just in case never comes.',
            "Toss it. If you haven't touched it in six months, you don't need it. Stop overthinking it.",
        ],
        context: 'throw out, throw away, toss は全部「捨てる」。just in case=念のために。hoarder=物をため込む人。英語圏では Hoarders というリアリティ番組があるほど、物をため込む文化がある。keep or toss はシンプルで使える。',
        character: 'yuki', category: 'request', month: '2026-08',
    },
    {
        daySlot: 137, japanese: 'カビが生えてきたんだけど',
        english: [
            'I found mold.',
            'There is mold growing in the corner of my bathroom. What should I do?',
            'I noticed some mold on the ceiling in my bathroom. It was not there last month. Is this a ventilation problem?',
            "That's probably a ventilation issue. Call your landlord -- that's their responsibility to fix, not yours.",
        ],
        context: 'mold(アメリカ) / mould(イギリス)は「カビ」。日本語の「カビ」は一語だけど、英語では mold(カビ全般), mildew(表面の白いカビ), black mold(黒カビ・有害)と種類がある。ventilation=換気。humid=湿気が多い。',
        character: 'kenji', category: 'request', month: '2026-08',
    },
    {
        daySlot: 137, japanese: '掃除のコツってある？',
        english: [
            'Any cleaning tips?',
            'Do you have any cleaning hacks? I feel like I am doing it wrong.',
            'How do you keep your place so clean? Do you have a routine or do you just clean everything at once?',
            "Honestly, I just do ten minutes a day. Wipe the counter, sweep the floor. It never piles up that way.",
        ],
        context: 'cleaning hack は「掃除の裏技」。hack は「ライフハック」のhack。spotless=一点のシミもない。routine=習慣。日本語の「コツ」は英語では tip, trick, hack, secret あたり。know-how もあるけどフォーマル寄り。',
        character: 'lisa', category: 'request', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 138: 近所付き合い (Neighborhood)
    // Scene: マスターが引っ越してきた新しい住人の話をする。近所のトラブルあるある
    // ────────────────────────────────────────────────────

    {
        daySlot: 138, japanese: 'お隣に引っ越してきた人いるみたい',
        english: [
            'Someone new moved in next door.',
            'I think we have new neighbors. I saw them moving boxes in yesterday.',
            'Looks like someone finally moved into the empty apartment next door. I saw a moving truck this morning.',
            "Oh nice, it's been empty forever. You should bring over some snacks and say hi. People still appreciate that.",
        ],
        context: 'next door は「隣の」。neighbor=隣人。introduce yourself=自己紹介する。日本語の「引っ越しの挨拶」は英語圏では housewarming gift を持っていく文化がある。ただし、最近はやらない人も多い。',
        character: 'master', category: 'social', month: '2026-08',
    },
    {
        daySlot: 138, japanese: '上の階の足音がうるさい',
        english: [
            'The upstairs neighbor is noisy.',
            'I can hear footsteps from the apartment above me all night. It is driving me crazy.',
            'My upstairs neighbor must be training for a marathon at midnight because the footsteps never stop.',
            "Have you tried talking to them about it? Sometimes people genuinely don't realize how loud they are.",
        ],
        context: 'upstairs neighbor は「上の階の住人」。footsteps=足音。It is driving me crazy.=気が狂いそう。passive-aggressive note=遠回しに不満を伝えるメモ。英語圏では直接言わずにメモを貼る文化がある。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 138, japanese: 'ゴミ出しのルール知ってる？',
        english: [
            'Do you know the trash rules?',
            'Do you know what day each type of trash goes out?',
            'I just moved here and I have no idea about the garbage schedule. Which day is which?',
            "There should be a chart on the city's website. I'll send you the link -- it's way clearer than the one in the lobby.",
        ],
        context: 'garbage schedule は「ゴミ出しスケジュール」。curb=路上・歩道の縁。curbside pickup=路上回収。日本のゴミ出しルールは世界一細かいかもしれない。英語圏では trash day が週1-2回で、分別もシンプル。',
        character: 'mina', category: 'social', month: '2026-08',
    },
    {
        daySlot: 138, japanese: '回覧板って英語で何て言うの？',
        english: [
            'What is a circular notice in English?',
            'How do you explain the neighborhood bulletin that gets passed around in English?',
            'We have this thing in Japan where a notice gets passed from house to house. Is there anything like that where you are from?',
            "We don't really have that in the US. The closest thing would be a neighborhood newsletter, but nobody passes it house to house.",
        ],
        context: '回覧板に完全に対応する英語はない。circular notice, neighborhood bulletin が近いけど、家を順番に回す仕組み自体が海外にない。neighborhood association=町内会も英語では homeowners association(HOA)が近いけど別物。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 138, japanese: '町内会の集まりがあるんだって',
        english: [
            'There is a neighborhood meeting.',
            'The neighborhood association is having a meeting. Are you going?',
            'I got a notice about a neighborhood association meeting this weekend. Do we have to go?',
            "You should probably go at least once so people know your face. It's usually over in an hour anyway.",
        ],
        context: 'neighborhood association=町内会。community meeting=集まり。mandatory=義務的。attendance is strongly encouraged=出席を強く推奨=ほぼ強制。日本の「任意参加」は英語のvoluntaryだけど、実際は空気で行かざるを得ないニュアンスが英語にない。',
        character: 'yuki', category: 'social', month: '2026-08',
    },
    {
        daySlot: 138, japanese: '挨拶くらいはするよね',
        english: [
            'You at least say hi, right?',
            'I always say hi to my neighbors when I see them. Basic manners.',
            'Even if you do not know your neighbors well, you should at least acknowledge them when you pass by.',
            "Right? A quick nod or a 'morning' goes a long way. It doesn't cost anything to be friendly.",
        ],
        context: 'acknowledge は「認識する・挨拶する」。nod=会釈。日本語の「挨拶」は英語では greeting だけど、日本の「すれ違う時の会釈」に当たるのは give a nod。目を合わせて nod するだけでもOK。',
        character: 'master', category: 'social', month: '2026-08',
    },
    {
        daySlot: 138, japanese: '宅配便が来る時間に家にいない',
        english: [
            'I am never home when deliveries come.',
            'I keep missing my deliveries because I am never home during the day.',
            'The delivery guy came three times this week and I missed it every single time. I need to set up a redelivery.',
            "Just set it up for delivery to a pickup locker. Way easier than playing phone tag with the driver.",
        ],
        context: 'delivery は「配達」。sorry we missed you=不在連絡票。redelivery=再配達。日本の再配達システムは海外では珍しい。英語圏では玄関に置き配(leave it at the door)が一般的。porch pirate=置き配を盗む人。',
        character: 'lisa', category: 'social', month: '2026-08',
    },
    {
        daySlot: 138, japanese: 'この辺に美味しい店ある？',
        english: [
            'Any good restaurants around here?',
            'Do you know any good places to eat in this neighborhood?',
            'I am still new to the area. What are the must-try restaurants around here? Any hidden gems?',
            "There's this tiny curry place two blocks east. No sign out front, but the lunch set is amazing and only eight hundred yen.",
        ],
        context: 'hidden gem は「隠れた名店」。must-try=絶対行くべき。hole-in-the-wall=小さくて目立たないけど美味い店。spot=場所・店。日本語の「穴場」は英語では hidden gem か hole-in-the-wall が近い。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 138, japanese: '防災訓練ってやってる？',
        english: [
            'Do you do disaster drills?',
            'Does your building have disaster drills? Like earthquake or fire drills?',
            'I got a notice about a disaster preparedness drill in our building. Have you ever participated in one?',
            "I went last year, actually. It's worth going once just to know where the emergency exits are in your building.",
        ],
        context: 'disaster drill=防災訓練。evacuation route=避難経路。fire extinguisher=消火器。日本は地震大国なので防災意識が高いけど、英語圏では fire drill(避難訓練)くらいしか経験しない人が多い。preparedness=備え。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 138, japanese: '騒音の苦情ってどうやって言えばいい？',
        english: [
            'How do I complain about noise?',
            'What is the best way to file a noise complaint? Should I talk to them directly?',
            'My neighbor plays music at midnight every weekend. Should I go talk to them or complain to the landlord first?',
            "I'd go to the landlord first. They can send a general notice to the building so it doesn't get personal.",
        ],
        context: 'noise complaint は「騒音苦情」。file a complaint=苦情を申し立てる。confrontation=対立。put up with=我慢する。日本では管理会社経由が多いけど、英語圏では直接言うか、landlord(大家)に相談するのが一般的。',
        character: 'mina', category: 'social', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 139: ペットの話 (Pet Talk)
    // Scene: リサが飼っている犬の話から、ペットあるある話で盛り上がる居酒屋の夜
    // ────────────────────────────────────────────────────

    {
        daySlot: 139, japanese: 'うちの犬がさ、最近太ってきて',
        english: [
            'My dog has been gaining weight.',
            'My dog is getting a little chubby. I think I have been overfeeding him.',
            'I took my dog to the vet last week and she said he needs to lose a couple of kilos. I felt like a bad pet parent.',
            "Aw, poor guy. Maybe swap the treats for extra walks? He'd probably love the attention just as much.",
        ],
        context: 'chubby は「ぽっちゃり」。overweight=太りすぎ。gain weight=太る、lose weight=痩せる。vet=veterinarian の略で「獣医」。treat=おやつ。日本語の「おやつ」は英語では snack(人間)と treat(ペット)で分ける。',
        character: 'lisa', category: 'social', month: '2026-08',
    },
    {
        daySlot: 139, japanese: '猫と犬どっち派？',
        english: [
            'Are you a cat person or a dog person?',
            'So which one are you, cat person or dog person? You cannot say both.',
            'I have always been curious. Are you a dog person or a cat person? Because it says a lot about someone.',
            "Cat person, no contest. They're low-maintenance and they don't need you to walk them at six AM in the rain.",
        ],
        context: 'dog person / cat person は「犬派/猫派」。cop-out=逃げ。lean=傾く。日本語の「〜派」は英語では person を使う。morning person=朝型の人、night person=夜型の人。この表現パターンは超便利。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 139, japanese: '散歩の時に他の犬に吠えるんだよね',
        english: [
            'He barks at other dogs on walks.',
            'Every time we go for a walk, my dog barks at every single dog we pass.',
            'Walking my dog is so stressful because he goes crazy every time he sees another dog. He just barks nonstop.',
            "Have you tried a trainer? My friend's dog was the same way, but after a few sessions he calmed down a lot.",
        ],
        context: 'bark は「吠える」。leash=リード。reactive=反応的（犬のしつけ用語）。aggressive=攻撃的。日本語の「リード」は英語では leash。lead もイギリス英語では使うけど、アメリカでは leash が標準。',
        character: 'lisa', category: 'social', month: '2026-08',
    },
    {
        daySlot: 139, japanese: 'ペットって飼い主に似るよね',
        english: [
            'Pets look like their owners.',
            'They say pets start to look like their owners. I think it is true.',
            'Have you noticed how dogs start to resemble their owners after a while? It is the funniest thing.',
            "So true. My coworker and his poodle have the exact same haircut. I can't unsee it.",
        ],
        context: 'resemble は「似ている」。look alike=そっくり。日本語の「飼い主に似る」は英語でも pets resemble their owners として知られている。実際にこれを研究した論文もある。waddle=よちよち歩く。',
        character: 'yuki', category: 'social', month: '2026-08',
    },
    {
        daySlot: 139, japanese: '動物病院って高いよね',
        english: [
            'Vet bills are expensive.',
            'Going to the vet is so expensive. It costs more than going to the doctor myself.',
            'I took my cat to the vet for a routine checkup and it cost more than my own health insurance copay. Pet care is not cheap.',
            "You should look into pet insurance. I pay about three thousand yen a month and it covers most of the big stuff.",
        ],
        context: 'vet bill は「動物病院代」。copay=自己負担額。pet insurance=ペット保険。英語圏ではペット保険が一般的になりつつある。日本語の「動物病院」は英語では vet clinic / veterinary clinic。bill=請求書。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 139, japanese: '留守番させるの申し訳ないんだよね',
        english: [
            'I feel bad leaving him home alone.',
            'I always feel guilty leaving my dog alone when I go to work.',
            'Every time I leave for work, my dog gives me this look like I am abandoning him forever. The guilt is real.',
            "Get a pet camera so you can check on him during the day. You'll see he just sleeps the whole time -- it'll make you feel better.",
        ],
        context: 'feel guilty は「罪悪感を感じる」。leave him home alone=一人でお留守番させる。separation anxiety=分離不安。日本語の「申し訳ない」は英語では feel bad, feel guilty が近い。sorry はこの文脈では弱い。',
        character: 'mina', category: 'social', month: '2026-08',
    },
    {
        daySlot: 139, japanese: 'うちの猫、夜中に暴れるんだよね',
        english: [
            'My cat goes crazy at night.',
            'My cat runs around the apartment like a maniac every night at three AM.',
            'Every night around three AM, my cat suddenly gets this burst of energy and sprints around the apartment like something is chasing her.',
            "That's the zoomies! Try playing with her more before bed so she burns off that energy earlier.",
        ],
        context: 'zoomies は猫や犬が突然走り回る現象。正式名称は FRAP(Frenetic Random Activity Period)。日本語の「運動会」に近い。sprint=全力疾走。go crazy/go wild=暴れる。nocturnal=夜行性。猫は本来夜行性動物。',
        character: 'master', category: 'social', month: '2026-08',
    },
    {
        daySlot: 139, japanese: 'ペットショップで買うのってどうなの？',
        english: [
            'What do you think about pet shops?',
            'Do you think buying from a pet shop is okay, or should you always adopt?',
            'There is a big debate about buying from pet shops versus adopting from shelters. Where do you stand?',
            "Honestly, I'd always say adopt. There are so many amazing animals at shelters that just need a chance.",
        ],
        context: 'adopt は「引き取る」。shelter=保護施設。breeder=ブリーダー。Adopt, do not shop.=買わずに引き取ろう。frown upon=眉をひそめる。日本のペットショップ文化は海外から批判されることが多いトピック。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 139, japanese: 'うちの子、芸を覚えたんだよ',
        english: [
            'My pet learned a new trick.',
            'I finally taught my dog to shake hands. It only took three months.',
            'After weeks of training, my dog finally learned to roll over. I am so proud I might cry.',
            "No way, that's awesome! How long did it take? I've been trying to teach mine to stay but he just walks off.",
        ],
        context: 'trick は「芸」。sit=おすわり、shake=お手、stay=待て、roll over=ゴロン。command=号令。日本語の「お手」は英語では shake, paw, give me your paw など。treat=ご褒美のおやつ。positive reinforcement=正の強化。',
        character: 'lisa', category: 'social', month: '2026-08',
    },
    {
        daySlot: 139, japanese: 'いつか犬を飼いたいな',
        english: [
            'I want to get a dog someday.',
            'I have always wanted a dog, but my apartment does not allow pets.',
            'When I finally move to a bigger place, the first thing I am doing is getting a dog. I have wanted one my whole life.',
            "You'd be a great dog owner. When you move, let me know and I'll help you find a rescue.",
        ],
        context: 'get a dog は「犬を飼う」。日本語の「飼う」は英語では have a pet, get a pet, own a pet。adopt は「保護犬を引き取る」。golden retriever はゴールデンレトリバー。yard=庭。conspire against=結託して邪魔する。',
        character: 'yuki', category: 'social', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 140: 節約 (Saving Money)
    // Scene: 給料日前のピンチ。居酒屋で節約術を共有し合う。ケンジの独自理論が炸裂
    // ────────────────────────────────────────────────────

    {
        daySlot: 140, japanese: '今月もう金ないわ',
        english: [
            'I am broke this month.',
            'I have no money left this month. I spent too much.',
            'We are only halfway through the month and I am already completely broke. I need to seriously rethink my spending.',
            "Already? It's only the fifteenth! What did you spend it all on? Let me guess -- convenience stores again.",
        ],
        context: 'broke は「金欠」。超カジュアル。I am broke. は若者の定番。paycheck=給料。burn through=使い果たす。日本語の「金がない」は I have no money だけど、broke の方が口語的でネイティブっぽい。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 140, japanese: '自炊した方が安いよね',
        english: [
            'Cooking at home is cheaper.',
            'Eating out is so expensive. I should really start cooking more.',
            'If I actually cooked at home instead of buying convenience store food every day, I would save so much money.',
            "Try meal prepping on Sundays. Cook a big batch of curry or stew and you're set for the whole week.",
        ],
        context: 'cook at home=自炊する。eat out=外食する。groceries=食材・食料品。meal prep=作り置き。日本語の「自炊」は英語では cook at home, cook for yourself。meal prep は週末にまとめて作り置きすること。',
        character: 'mina', category: 'social', month: '2026-08',
    },
    {
        daySlot: 140, japanese: 'ポイントカードって使ってる？',
        english: [
            'Do you use reward points?',
            'Are you good about using your points? I always forget I have them.',
            'I just realized I had ten thousand points on my store card that I never used. That is basically free money I left on the table.',
            "Use them! That's literally free money sitting there. I use mine every time I hit a thousand points.",
        ],
        context: 'loyalty points=ポイント。rewards program=ポイントプログラム。redeem=使う・引き換える。日本のポイント文化は世界一複雑かもしれない。英語圏では cashback(キャッシュバック)の方が一般的。leave money on the table=もらえるはずの金を逃す。',
        character: 'yuki', category: 'social', month: '2026-08',
    },
    {
        daySlot: 140, japanese: '固定費を見直した方がいいよ',
        english: [
            'You should review your fixed expenses.',
            'Have you looked at your monthly subscriptions lately? You might be paying for things you do not even use.',
            'The fastest way to save money is to cut your fixed costs. Phone plan, subscriptions, insurance. Check them all.',
            "You're right, I just checked and I'm still paying for two streaming services I haven't opened in months. Canceling them now.",
        ],
        context: 'fixed costs=固定費。subscription=月額サブスクリプション。cut costs=コストを削る。日本語の「見直す」は英語では review, look at, go over。「固定費」は monthly fixed costs, recurring expenses とも言う。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 140, japanese: '衝動買いがやめられない',
        english: [
            'I cannot stop impulse buying.',
            'I keep buying things on impulse and regretting it the next day.',
            'Every time I open a shopping app late at night, I end up buying something I absolutely do not need.',
            "Delete the app from your phone. Seriously. If you have to go to the actual website, you'll think twice before buying.",
        ],
        context: "impulse buying は「衝動買い」。英語ではそのまま impulse buy/impulse purchase。retail therapy=買い物でストレス発散。buyer's remorse=買った後の後悔。late-night shopping=深夜のネットショッピング。危険な行為。",
        character: 'lisa', category: 'social', month: '2026-08',
    },
    {
        daySlot: 140, japanese: '給料日まであと何日？',
        english: [
            'How many days until payday?',
            'When is payday? I am literally counting the days.',
            'I just checked and payday is still ten days away. I do not know how I am going to survive until then.',
            "Same, I've got eight days left and I'm living off rice and eggs. Hang in there, we'll make it.",
        ],
        context: 'payday は「給料日」。paycheck=給料の小切手・振込。直訳は「支払い日」。live paycheck to paycheck=給料ギリギリの生活。count the days=日数を数える（待ち遠しい）。日本語の「給料日前の金欠」は universal な苦悩。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 140, japanese: 'セールの時しか買わないようにしてる',
        english: [
            'I only buy stuff on sale.',
            'I never pay full price for anything. I always wait for a sale.',
            'My rule is to never buy anything at full price. If it is not on sale, I do not need it that badly.',
            "That takes serious discipline. I always tell myself I'll wait but then I cave after like two days.",
        ],
        context: 'on sale は「セール中」。full price=定価。wishlist=欲しい物リスト。flash sale=タイムセール。日本語の「定価」は英語では full price, regular price, retail price。「割引」は discount, markdown, deal。',
        character: 'master', category: 'social', month: '2026-08',
    },
    {
        daySlot: 140, japanese: 'コンビニって便利だけど高いよね',
        english: [
            'Convenience stores are handy but expensive.',
            'I love convenience stores but everything costs way more than at the supermarket.',
            'The problem with convenience stores is they are too convenient. You end up going every day and spending way more than you planned.',
            "I know, right? I started walking a different route to avoid passing one and my spending dropped immediately.",
        ],
        context: 'convenient は「便利な」。handy も同じ意味でよりカジュアル。日本のコンビニは海外の convenience store と全然クオリティが違う。英語圏の convenience store は日本でいうキオスクに近い。convenience tax=便利さの代償。',
        character: 'mina', category: 'social', month: '2026-08',
    },
    {
        daySlot: 140, japanese: '家計簿つけてる？',
        english: [
            'Do you keep a budget?',
            'Do you track your spending? Like, do you use a budgeting app or anything?',
            'I started using a budgeting app last month and honestly it was terrifying seeing where my money actually goes.',
            "I tried one of those apps but I stopped checking it because the numbers were too depressing. Maybe I should give it another shot.",
        ],
        context: 'budget は「予算」で、keep a budget=家計簿をつける。track spending=支出を追跡する。budgeting app=家計簿アプリ。日本語の「家計簿」に直訳はないけど、expense tracker, household budget が近い。pie chart=円グラフ。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 140, japanese: '安いのには理由がある',
        english: [
            'Cheap things have a reason.',
            'If something is really cheap, there is usually a reason for it.',
            'I have learned the hard way that you get what you pay for. Cheap stuff always breaks or falls apart.',
            "Totally. I bought cheap boots twice before I finally splurged on a good pair, and they've lasted three years.",
        ],
        context: 'you get what you pay for は「安かろう悪かろう」に近い定番フレーズ。日本語の「安物買いの銭失い」がまさにこれ。buy cheap, buy twice=安物は2回買う羽目になる。quality over quantity=量より質。英語の方が直接的。',
        character: 'yuki', category: 'social', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 141: 生活のルーティン (Daily Routines)
    // Scene: 朝型vs夜型の論争が居酒屋で勃発。マスターの驚きのルーティンが明らかに
    // ────────────────────────────────────────────────────

    {
        daySlot: 141, japanese: '朝何時に起きてる？',
        english: [
            'What time do you wake up?',
            'What time do you usually get up in the morning?',
            'I am curious, what time does your alarm go off? Are you a morning person or do you hit snooze ten times?',
            "Around seven, but honestly I don't fully wake up until my second cup of coffee. So like... nine?",
        ],
        context: 'wake up は「目が覚める」、get up は「起き上がる」。hit snooze=スヌーズを押す。morning person=朝型の人。night owl=夜型の人。日本語の「起きる」は英語では wake up と get up の2段階がある。',
        character: 'yuki', category: 'social', month: '2026-08',
    },
    {
        daySlot: 141, japanese: '朝ごはんは食べる派？',
        english: [
            'Do you eat breakfast?',
            'Do you actually eat breakfast or are you a coffee-only person?',
            'I know they say breakfast is the most important meal but honestly I never have time. Do you eat every morning?',
            "I grab a banana and coffee on my way out. It's not much, but if I skip it entirely I'm useless before lunch.",
        ],
        context: '英語圏では breakfast person / not a breakfast person という言い方がある。grab=素早く取る。on the go=移動中に。skip breakfast=朝食を抜く。日本語の「〜派」は英語では person で表現するのが自然。',
        character: 'mina', category: 'social', month: '2026-08',
    },
    {
        daySlot: 141, japanese: '通勤時間どれくらい？',
        english: [
            'How long is your commute?',
            'How long does it take you to get to work?',
            'My commute is about an hour each way. I feel like I waste so much time on the train every day.',
            "An hour? That's rough. At least you can read or listen to podcasts. I'd go crazy just staring out the window.",
        ],
        context: 'commute は「通勤」。名詞でも動詞でも使える。door to door=ドアツードア。each way=片道。日本語の「通勤時間」は commute time, commute。英語圏では commute が1時間超えると long commute と言われる。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 141, japanese: '夜型だから朝がつらい',
        english: [
            'I am a night person, so mornings are hard.',
            'I stay up late every night, so waking up early is torture for me.',
            'I am a total night owl. My brain does not start working until after noon. Mornings are just survival mode.',
            "Same. I don't schedule anything important before noon if I can help it. My brain just isn't there yet.",
        ],
        context: 'night owl は「夜型の人」。early bird=朝型の人。survival mode=サバイバルモード。function=機能する。日本語の「夜型」は直訳すると night type だけど、night owl の方が圧倒的にネイティブっぽい。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 141, japanese: '寝る前にスマホ見ちゃうんだよね',
        english: [
            'I always look at my phone before bed.',
            'I know I should not, but I always end up scrolling my phone in bed.',
            'Every night I tell myself I will put the phone down by eleven and every night I fail. I end up scrolling until one AM.',
            "Try leaving your phone in the other room. It's brutal for the first week, but you'll sleep so much better.",
        ],
        context: 'scroll は「スクロールする」。doom scrolling=延々とネガティブなニュースを見続けること。blue light=ブルーライト。screen time=画面を見ている時間。日本語の「スマホを見る」は英語では be on my phone, scroll through my phone。',
        character: 'lisa', category: 'social', month: '2026-08',
    },
    {
        daySlot: 141, japanese: '休みの日こそ早起きする',
        english: [
            'I wake up early on my days off.',
            'I actually prefer getting up early on weekends. You get so much more done.',
            'Call me crazy, but I set an alarm even on Saturdays. If I sleep in, I feel like I wasted the whole day.',
            "I wish I could do that. Every time I try, I just end up scrolling my phone in bed until noon anyway.",
        ],
        context: 'sleep in は「寝坊する・遅くまで寝る」。days off=休みの日。cheat code=裏技。日本語の「寝坊」は英語では oversleep(寝過ごす)と sleep in(ゆっくり寝る)で意味が分かれる。sleep in はポジティブなニュアンス。',
        character: 'master', category: 'social', month: '2026-08',
    },
    {
        daySlot: 141, japanese: '運動する習慣がどうしてもつかない',
        english: [
            'I cannot get into the habit of exercising.',
            'I keep trying to exercise regularly but it never sticks.',
            'I have started and stopped going to the gym so many times. The membership card is basically a donation at this point.',
            "Start with something small, like a twenty-minute walk. If you aim too high from the start, it never sticks.",
        ],
        context: 'stick は「続く・定着する」。It never sticks.=長続きしない。work out=運動する。gym membership=ジム会員。日本語の「三日坊主」は英語にない概念。I never stick with anything. が近い。quit は「やめる」でネガティブ。',
        character: 'mina', category: 'social', month: '2026-08',
    },
    {
        daySlot: 141, japanese: 'お風呂に浸かる時間が至福',
        english: [
            'Bath time is the best.',
            'Soaking in the bath after a long day is my favorite thing.',
            'Nothing beats a long hot bath at the end of the day. It is the only time I actually relax.',
            "I'm jealous. My apartment only has a shower. I miss having a proper bathtub so much.",
        ],
        context: 'soak は「浸かる」。take a bath vs take a shower は文化の違い。日本の入浴文化は英語圏にない。bath=浴槽に入ること、shower=シャワー。英語圏では毎日バスに入る人は少数派。onsen=温泉は今や英語でも通じる。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 141, japanese: '毎日同じことの繰り返しだよね',
        english: [
            'Every day is the same.',
            'It feels like I do the same thing every single day. Wake up, work, eat, sleep, repeat.',
            'Sometimes I wonder if my life is just an endless loop. Same train, same desk, same lunch, same everything.',
            "That's why you need a hobby or something to break it up. Even one new thing a week makes a huge difference.",
        ],
        context: 'groundhog day は「毎日同じことの繰り返し」を表す英語の定番表現。映画Groundhog Dayから。routine=ルーティン、rat race=毎日の競争。日本語の「繰り返し」は英語では loop, cycle, routine で表現する。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 141, japanese: '夜更かしがやめられない',
        english: [
            'I cannot stop staying up late.',
            'I know I should go to bed early but I keep staying up past midnight.',
            'Every night I tell myself tonight I will go to bed by eleven. And every night at one AM I am still wide awake doing absolutely nothing productive.',
            "I read that's called revenge bedtime procrastination. Knowing the name doesn't help me stop doing it, though.",
        ],
        context: 'revenge bedtime procrastination=報復性夜更かし。中国語のネット用語が英語圏でバズった概念。日本語の「夜更かし」は stay up late。pull an all-nighter=徹夜する。wide awake=完全に目が冴えている。self-sabotage=自滅行為。',
        character: 'yuki', category: 'social', month: '2026-08',
    },
];

// ============================================================
// DAY THEMES -- MONTH 5 (2026-08) -- WEEK 19
// ============================================================

export const MONTH5_W19_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    135: {
        title: '部屋探し', titleEn: 'Apartment Hunting', category: 'request',
        scene: 'タケシが引っ越し先を探していて、居酒屋で物件の条件を相談する。',
        keywords: [
            { en: 'lease', ja: '賃貸契約', pron: 'リース', example: 'If I sign the lease today, when can I move in?', note: 'sign the lease=契約書にサインする。日本語の「賃貸契約」は英語では lease 一語。rental agreement も同じ意味。' },
            { en: 'deposit', ja: '敷金・保証金', pron: 'デポジット', example: 'How much is the security deposit?', note: 'security deposit=敷金。日本の礼金(key money)は英語圏にはほぼ存在しない概念で、説明が必要。' },
            { en: 'utilities', ja: '光熱費', pron: 'ユーティリティーズ', example: 'Are utilities included in the rent?', note: '水道・ガス・電気をまとめてutilities。日本語の「光熱費」は直訳すると光と熱だけど、英語のutilitiesは水道も含む。' },
            { en: 'landlord', ja: '大家', pron: 'ランドロード', example: 'I need to call the landlord about the leak.', note: '男女問わずlandlordが一般的。landlady は古い表現。property manager=管理会社の担当者。' },
            { en: 'neighborhood', ja: '近所・地域', pron: 'ネイバーフッド', example: 'Is this neighborhood safe?', note: 'area より具体的でコミュニティ感がある。in the neighborhood=この辺で。good neighborhood=治安のいい地域。' },
        ],
    },
    136: {
        title: 'インテリア', titleEn: 'Home Decor', category: 'shopping',
        scene: 'リサとミナが家具屋でインテリアを見ながら理想の部屋について語る。',
        keywords: [
            { en: 'furniture', ja: '家具', pron: 'ファーニチャー', example: 'I need new furniture for my living room.', note: '不可算名詞。a piece of furniture=家具一点。furnitures は間違い。a furniture も間違い。英語学習者の定番ミス。' },
            { en: 'cozy', ja: '居心地がいい', pron: 'コージー', example: 'This room feels so cozy.', note: '暖かくて居心地がいい感覚。日本語の「居心地がいい」にぴったり。comfortableより温かみがある。' },
            { en: 'shelf', ja: '棚', pron: 'シェルフ', example: 'I need a shelf for my books.', note: '複数形はshelves。bookshelf=本棚。shelving unit=棚ユニット。floating shelf=壁付け棚。' },
            { en: 'curtain', ja: 'カーテン', pron: 'カートゥン', example: 'The curtains are too short.', note: '発音注意。日本語の「カーテン」とは違い、tainの部分は「トゥン」に近い。blinds=ブラインド。shades=シェード。' },
            { en: 'rearrange', ja: '配置を変える', pron: 'リアレインジ', example: 'I want to rearrange the living room.', note: 're(再び)+arrange(配置する)。模様替えのメイン動詞。redecorate は壁紙やカーテンまで変えるレベル。' },
        ],
    },
    137: {
        title: '掃除と片付け', titleEn: 'Cleaning and Organizing', category: 'request',
        scene: '年末の大掃除の話題。ケンジが掃除嫌いで居酒屋のみんなにからかわれる。',
        keywords: [
            { en: 'vacuum', ja: '掃除機をかける', pron: 'ヴァキューム', example: 'Have you vacuumed yet?', note: '名詞(掃除機)も動詞(掃除機をかける)も同じ形。vacuum cleaner とは言うけど、日常会話ではvacuumだけで通じる。' },
            { en: 'declutter', ja: '片付ける・物を減らす', pron: 'ディクラター', example: 'I need to declutter my closet.', note: 'clutter(散らかり)+de(除去)。Marie Kondoの影響で英語圏でも超メジャーになった単語。断捨離に最も近い英語。' },
            { en: 'mold', ja: 'カビ', pron: 'モウルド', example: 'There is mold on the ceiling.', note: 'アメリカ英語=mold、イギリス英語=mould。black mold=黒カビは健康に有害。mildew=白カビ(表面のみ)。' },
            { en: 'scrub', ja: 'ゴシゴシ洗う', pron: 'スクラブ', example: 'I need to scrub the bathtub.', note: 'wipe=拭く、scrub=ゴシゴシこする、rinse=すすぐ。掃除の動詞は力の入れ方で使い分ける。' },
            { en: 'laundry', ja: '洗濯・洗濯物', pron: 'ローンドリー', example: 'I have a pile of laundry to do.', note: 'do the laundry=洗濯する。laundryは洗う前も洗った後も両方指す。laundromat=コインランドリー。' },
        ],
    },
    138: {
        title: '近所付き合い', titleEn: 'Neighborhood', category: 'social',
        scene: 'マスターが引っ越してきた新しい住人の話をする。近所のトラブルあるある。',
        keywords: [
            { en: 'neighbor', ja: '隣人', pron: 'ネイバー', example: 'I think we have new neighbors.', note: 'アメリカ=neighbor、イギリス=neighbour。next-door neighbor=隣の家の人。upstairs/downstairs neighbor=上/下の階の人。' },
            { en: 'complaint', ja: '苦情', pron: 'コンプレイント', example: 'I want to file a noise complaint.', note: 'file a complaint=苦情を申し立てる。complain(動詞)とcomplaint(名詞)を使い分ける。日本語の「苦情」より英語のcomplaintは公式感がある。' },
            { en: 'delivery', ja: '配達', pron: 'デリバリー', example: 'I keep missing my deliveries.', note: 'package delivery=荷物配達。food delivery=出前。deliver(動詞)、delivery(名詞)。日本語のデリバリーは食べ物限定のイメージだけど、英語は全般。' },
            { en: 'community', ja: '地域社会', pron: 'コミュニティ', example: 'This is a nice community.', note: 'neighborhood=地理的エリア、community=そこに住む人の集まり。sense of community=地域のつながり感。' },
            { en: 'noise', ja: '騒音', pron: 'ノイズ', example: 'The noise from upstairs is driving me crazy.', note: 'noise=不快な音。sound=音全般。music=音楽。同じ音でもnoiseと呼ぶかsoundと呼ぶかで印象が180度変わる。' },
        ],
    },
    139: {
        title: 'ペットの話', titleEn: 'Pet Talk', category: 'social',
        scene: 'リサが飼っている犬の話から、ペットあるある話で盛り上がる居酒屋の夜。',
        keywords: [
            { en: 'adopt', ja: '引き取る', pron: 'アドプト', example: 'We adopted our cat from a shelter.', note: 'adopt a pet=ペットを引き取る。adopt a child=養子にする。adoption=引き取り。shelter=保護施設。rescue=保護する。' },
            { en: 'vet', ja: '獣医', pron: 'ヴェット', example: 'I need to take my dog to the vet.', note: 'veterinarian の略。日常会話では vet だけで100%通じる。vet bill=獣医代。go to the vet=動物病院に行く。' },
            { en: 'breed', ja: '犬種・品種', pron: 'ブリード', example: 'What breed is your dog?', note: '名詞(品種)と動詞(繁殖させる)の両方。breeder=ブリーダー。mixed breed=雑種。purebred=純血種。' },
            { en: 'bark', ja: '吠える', pron: 'バーク', example: 'My dog barks at every stranger.', note: 'bark=犬が吠える。meow=猫が鳴く。purr=猫がゴロゴロ。動物の鳴き声は日本語と英語で全然違う。' },
            { en: 'treat', ja: 'おやつ(ペット用)', pron: 'トリート', example: 'I give him a treat when he is a good boy.', note: 'ペットのおやつ=treat。人間のおやつ=snack。trick or treat のtreatは「ごほうび」の意味。treat yourself=自分へのご褒美。' },
        ],
    },
    140: {
        title: '節約', titleEn: 'Saving Money', category: 'social',
        scene: '給料日前のピンチ。居酒屋で節約術を共有し合う。ケンジの独自理論が炸裂。',
        keywords: [
            { en: 'budget', ja: '予算・家計', pron: 'バジェット', example: 'I need to stick to my budget this month.', note: 'on a budget=予算内で。over budget=予算オーバー。budget-friendly=お手頃。stick to a budget=予算を守る。日常超頻出。' },
            { en: 'save', ja: '節約する・貯金する', pron: 'セイヴ', example: 'I am trying to save money for a trip.', note: 'save money=節約する/貯金する。savings=貯金。savings account=普通預金口座。save up=コツコツ貯める。' },
            { en: 'subscription', ja: '月額サービス', pron: 'サブスクリプション', example: 'I need to cancel some subscriptions.', note: '日本語の「サブスク」は英語のsubscription。subscribe=登録する。unsubscribe=解約する。monthly subscription=月額会員。' },
            { en: 'discount', ja: '割引', pron: 'ディスカウント', example: 'Is there a student discount?', note: 'on sale=セール中。discount=割引。deal=お買い得。clearance=在庫一掃セール。markdown=値下げ。使い分けが重要。' },
            { en: 'expense', ja: '出費・費用', pron: 'エクスペンス', example: 'My biggest expense is rent.', note: 'fixed expenses=固定費。variable expenses=変動費。expense report=経費報告。living expenses=生活費。costly=高くつく。' },
        ],
    },
    141: {
        title: '生活のルーティン', titleEn: 'Daily Routines', category: 'social',
        scene: '朝型vs夜型の論争が居酒屋で勃発。マスターの驚きのルーティンが明らかに。',
        keywords: [
            { en: 'commute', ja: '通勤', pron: 'コミュート', example: 'My commute is about an hour each way.', note: '名詞(通勤)も動詞(通勤する)も同じ形。commuter=通勤者。rush hour=ラッシュアワー。each way=片道。' },
            { en: 'habit', ja: '習慣', pron: 'ハビット', example: 'I am trying to build better habits.', note: 'good habit=良い習慣、bad habit=悪い習慣。routine=ルーティン(決まった手順)。habit=意識しなくてもやること。' },
            { en: 'snooze', ja: 'スヌーズ', pron: 'スヌーズ', example: 'I hit snooze ten times every morning.', note: 'hit snooze=スヌーズを押す。snooze button=スヌーズボタン。snooze は「うたた寝する」の意味も。日本語にそのまま入った珍しい英語。' },
            { en: 'productive', ja: '生産的な', pron: 'プロダクティヴ', example: 'I feel most productive in the morning.', note: 'productivity=生産性。unproductive=非生産的。日本語の「生産的」より英語のproductiveは日常会話で頻繁に使う。' },
            { en: 'routine', ja: '日課・ルーティン', pron: 'ルーティーン', example: 'My morning routine takes about forty minutes.', note: '発音は「ルーティーン」で日本語の「ルーティン」と微妙に違う。daily routine=日課。skincare routine=スキンケアの手順。' },
        ],
    },
};
