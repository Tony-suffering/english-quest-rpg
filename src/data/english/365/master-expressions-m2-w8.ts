/**
 * 365 English Master -- Month 2 Week 8: 日常生活 (Daily Life)
 * Days 52-60: 90 expressions
 * Month: May 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 2 (2026-05) -- WEEK 8
// ============================================================

export const MONTH2_W8_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 52: 料理する (Cooking)
    // Scene: リサが最近ハマっている自炊トーク。ゴンドーの昭和メシ自慢が炸裂。
    // ────────────────────────────────────────────────────

    {
        daySlot: 52, japanese: '最近自炊にハマってるんだ',
        english: [
            'I have been cooking a lot.',
            'I have been really into cooking lately.',
            'I have been cooking at home almost every day. It is actually kind of fun.',
            "I started cooking at home more to save money but honestly I am kind of enjoying it now. There is something satisfying about making something from scratch. I made pasta from actual flour last weekend. It took three hours and tasted about the same as the boxed stuff but the point is I made it. With my own hands.",
        ],
        context: 'from scratch は「ゼロから」。材料から全部手作りする意味。boxed stuff は「箱入りの既製品」。the point is は「大事なのは」。自炊は英語で cook at home で、self-cook とは言わない。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 52, japanese: 'レシピ通りにやったのに失敗した',
        english: [
            'I followed the recipe but it failed.',
            'I followed the recipe exactly and it still turned out wrong.',
            'I followed the recipe step by step and it still came out terrible.',
            "I do not understand. I followed the recipe to the letter. Measured everything, set the timer, did exactly what it said. And it still came out looking like a science experiment. The recipe said golden brown. Mine was black. Not dark brown. Black. I think my oven hates me. Or maybe I need to accept that some people just were not meant to bake.",
        ],
        context: 'to the letter は「一字一句その通りに」。came out は「出来上がった」。science experiment は「理科の実験」で失敗作の比喩。golden brown は「きつね色」。were not meant to は「〜する運命じゃない」の自虐。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 52, japanese: '味見してみて',
        english: [
            'Try this.',
            'Here, taste this.',
            'Can you taste this and tell me if it needs more salt?',
            "Hey, can you taste this real quick? I have been cooking for two hours and I cannot tell anymore if it is good or not. My taste buds are completely shot. I think it needs more salt but I am scared of over-salting it. Just try a little and be honest. And by honest I mean tell me it is amazing even if it is not.",
        ],
        context: 'taste は「味見する」。taste buds は「味蕾（味覚）」。shot は「ダメになった」。over-salt は「塩を入れすぎる」。be honest は「正直に言って」。最後の1文が日本人の「正直に言って（でも褒めて）」の本音。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 52, japanese: '焦がしちゃった',
        english: [
            'I burned it.',
            'I totally burned the bottom.',
            'I looked away for one second and burned the whole thing.',
            "I burned the garlic again. I always do this. I put it in the pan, turn around to chop something, and by the time I look back it is black and smoking. Garlic goes from perfectly golden to completely charred in like five seconds. There is no in-between. I swear it does it on purpose.",
        ],
        context: 'burned は「焦がした」。charred は「真っ黒に焦げた」でburned より激しい。goes from A to B は「AからBになる」。in-between は「中間」。does it on purpose は「わざとやっている」の擬人化ユーモア。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 52, japanese: '昔は卵焼きしか作れなかったよ',
        english: [
            'I could only make eggs.',
            'I used to only know how to make scrambled eggs.',
            'When I first started, the only thing I could make was scrambled eggs.',
            "When I was young I could not cook at all. Literally the only thing I could make was tamagoyaki and instant ramen. My wife taught me everything. Now I can make a full meal from scratch. It took about thirty years but hey, better late than never. The secret is to just keep trying and not get discouraged when you mess up.",
        ],
        context: 'better late than never は「遅くてもやらないよりマシ」のことわざ。from scratch は「ゼロから」。get discouraged は「やる気をなくす」。mess up は「失敗する」。ゴンドーの人生哲学。',
        character: 'master', category: 'social', month: '2026-05',
    },
    {
        daySlot: 52, japanese: '調味料が足りない',
        english: [
            'I am out of seasoning.',
            'I ran out of soy sauce.',
            'I am in the middle of cooking and I just realized I am out of soy sauce.',
            "This always happens to me. I am right in the middle of cooking and I realize I am missing a key ingredient. Today it was soy sauce. The recipe calls for three tablespoons and I have like a drop left. I thought about substituting it with something else but I do not even know what would work. Now I have to run to the store with sauce on my hands.",
        ],
        context: 'ran out of は「切らした」。in the middle of は「〜の最中に」。calls for は「（レシピが）〜を要求する」。substituting は「代用する」。run to the store は「店にダッシュする」。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 52, japanese: '作り置きしておくと楽だよ',
        english: [
            'Meal prep saves time.',
            'Meal prepping on Sundays makes the whole week easier.',
            'I do meal prep every Sunday. It saves so much time during the week.',
            "The trick is to prep everything on Sunday. I spend like two or three hours cooking a bunch of stuff and portion it out for the whole week. Monday through Friday I just grab a container and heat it up. It sounds like a lot of work but it actually saves me time and money. Plus I eat way healthier because I am not ordering delivery every night.",
        ],
        context: 'meal prep は「作り置き」。portion out は「小分けにする」。container は「容器」。heat it up は「温める」。delivery は「出前」。meal prep は海外でも健康志向の人に大人気。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 52, japanese: '包丁研いだ方がいいよ',
        english: [
            'You should sharpen your knife.',
            'Your knife is dull. You should sharpen it.',
            'A sharp knife makes everything easier. You should invest in a good one.',
            "Listen, the most important thing in the kitchen is a sharp knife. A dull knife is actually more dangerous because you have to push harder and it slips. I sharpen mine every couple of weeks. Once you start cooking with a properly sharpened knife you will never go back. It cuts through everything like butter. Get yourself a good whetstone.",
        ],
        context: 'sharpen は「研ぐ」。dull は「鈍い」。slips は「滑る」。like butter は「バターのように」で切れ味の良さ。whetstone は「砥石」。日本の砥石は世界中の料理人に人気。',
        character: 'master', category: 'social', month: '2026-05',
    },
    {
        daySlot: 52, japanese: '料理動画見ながら作ってる',
        english: [
            'I cook while watching videos.',
            'I follow along with cooking videos.',
            'I watch cooking videos on YouTube and try to follow along step by step.',
            "I basically cannot cook without a YouTube video playing next to me. I pause it every ten seconds, do the thing, then play it again. It takes me twice as long as the video says it should but at least the result is edible. I found this one channel that explains everything so clearly that even I can follow it. That is saying something.",
        ],
        context: 'follow along は「一緒にやる」。edible は「食べられる」。That is saying something は「それだけですごいことだ」の自虐表現。pause は「一時停止する」。channel はYouTubeチャンネル。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 52, japanese: '片付けが面倒なんだよね',
        english: [
            'Cleaning up is the worst part.',
            'I hate doing the dishes after cooking.',
            'I love cooking but I absolutely hate the cleanup. The dishes pile up so fast.',
            "Cooking is fun. Eating is great. But the cleanup? That is where I die inside. I use like fifteen dishes and three pans to make one meal. My sink looks like a warzone afterward. I have seriously considered buying paper plates just so I never have to do dishes again. My wife says that is wasteful but I say it is self-preservation.",
        ],
        context: 'cleanup は「片付け」。pile up は「積み上がる」。warzone は「戦場」の比喩。paper plates は「紙皿」。wasteful は「もったいない」。self-preservation は「自己保存」のユーモア。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 53: 掃除・洗濯 (Cleaning & Laundry)
    // Scene: 週末の大掃除トーク。洗濯の失敗談で盛り上がる。
    // ────────────────────────────────────────────────────

    {
        daySlot: 53, japanese: '洗濯物がたまりすぎ',
        english: [
            'I have so much laundry.',
            'My laundry is piling up.',
            'I have not done laundry in two weeks and the pile is getting scary.',
            "My laundry situation is out of control. I have not done a load in like two weeks and at this point I am running out of clean underwear. I keep telling myself I will do it tomorrow but tomorrow never comes. The pile in the corner of my room has basically become furniture at this point. It has its own zip code.",
        ],
        context: 'do laundry は「洗濯する」。do a load は「1回分回す」。running out of は「なくなりかけている」。has its own zip code は「住所がつくほどデカい」のアメリカンジョーク。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 53, japanese: '色移りしちゃった',
        english: [
            'The colors bled.',
            'My white shirt turned pink.',
            'I accidentally washed a red sock with my whites and everything turned pink.',
            "So I did something stupid. I threw all my laundry in together without sorting it and my red shirt got mixed in with my white stuff. Everything came out pink. My work shirts, my undershirts, my socks. Everything. I looked up how to fix it and apparently bleach might work but I am scared I will make it worse.",
        ],
        context: 'bled は bleed（にじむ）の過去形。sort は「分ける」。whites は「白い洋服」。bleach は「漂白剤」。色移りは英語圏でも洗濯あるあるの鉄板ネタ。threw in は「ぶち込んだ」。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 53, japanese: '部屋が散らかりすぎ',
        english: [
            'My room is a mess.',
            'My apartment is a disaster.',
            'You cannot even see my floor right now. It is that bad.',
            "My apartment looks like a tornado went through it. There are clothes on every surface, dishes in the sink, and I am pretty sure there is a coffee cup somewhere that has been there for a week. I keep meaning to clean but every time I sit down to do it I get distracted by my phone and suddenly it is midnight.",
        ],
        context: 'a disaster は「惨状」。tornado は「竜巻」の比喩で「ぐちゃぐちゃ」。every surface は「あらゆる面」。keep meaning to は「やろうやろうと思っている」。get distracted は「気が散る」。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 53, japanese: '大掃除しないと',
        english: [
            'I need to deep clean.',
            'I really need to do a deep clean this weekend.',
            'This place needs a serious deep clean. I am dedicating the whole Saturday to it.',
            "I am declaring this Saturday a cleaning day. No excuses, no distractions. I am going room by room and getting rid of everything I do not need. I have been putting this off for months but I hit a point where I opened a closet and something fell on my head. That was my sign. It is time.",
        ],
        context: 'deep clean は「大掃除」。declaring は「宣言する」。getting rid of は「処分する」。putting off は「先延ばしにする」。hit a point は「ある時点に達した」。That was my sign は「それが合図だった」。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 53, japanese: '縮んじゃった',
        english: [
            'It shrank.',
            'My sweater shrank in the wash.',
            'I accidentally dried my wool sweater on high heat and it shrank two sizes.',
            "I put my favorite sweater in the dryer and it came out three sizes smaller. It went from a large to something my cat could wear. I did not even know fabric could shrink that much. I tried stretching it back but it is hopeless. That sweater cost me like eighty dollars and now it is a cat blanket. Lesson learned.",
        ],
        context: 'shrank は shrink の過去形。dryer は「乾燥機」。high heat は「高温」。stretch は「伸ばす」。lesson learned は「いい教訓になった」。wool + dryer = 大惨事は世界共通の知識。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 53, japanese: 'トイレ掃除が一番嫌い',
        english: [
            'I hate cleaning the toilet.',
            'Toilet cleaning is my least favorite chore.',
            'If there is one chore I could skip for the rest of my life, it would be cleaning the toilet.',
            "Can we all agree that cleaning the toilet is the worst household chore in existence? I would rather do dishes for three hours than scrub a toilet for five minutes. I know it has to be done but every time I do it I question my life choices. They need to invent a self-cleaning toilet. That would be worth any amount of money.",
        ],
        context: 'chore は「家事」。scrub は「ゴシゴシ洗う」。in existence は「この世で」。question my life choices は「人生の選択を疑う」の大げさ自虐。self-cleaning は「自動洗浄」。household chore は「家庭の雑事」。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 53, japanese: '換気しないとカビ生えるよ',
        english: [
            'You need to air it out.',
            'Open a window or you will get mold.',
            'You have to ventilate or you will get mold. Especially in the bathroom.',
            "Listen, if you do not open your windows and let the air circulate, you are going to get mold. Especially in the bathroom and kitchen. I learned this the hard way. I ignored a little patch of mold on my ceiling and three months later it had taken over the entire corner. Cost me a fortune to get it removed. Just crack a window every day.",
        ],
        context: 'ventilate は「換気する」。mold は「カビ」。learned the hard way は「痛い目にあって学んだ」。patch は「一部分」。crack a window は「窓を少し開ける」。日本の湿気問題は世界的にも有名。',
        character: 'master', category: 'social', month: '2026-05',
    },
    {
        daySlot: 53, japanese: '断捨離したい',
        english: [
            'I want to declutter.',
            'I need to get rid of a ton of stuff.',
            'I want to do a big declutter. I have way too much stuff I do not need.',
            "I watched one of those organizing shows and got inspired to declutter my whole apartment. The lady on the show says if it does not spark joy, throw it out. So I started with my closet and realized nothing in there sparks joy except my pajamas. I ended up with twelve garbage bags full of clothes and I still have too much stuff.",
        ],
        context: 'declutter は「断捨離する」。spark joy は近藤麻理恵の「ときめくかどうか」が英語になったもの。got inspired は「触発された」。ended up with は「結局〜になった」。断捨離の概念は Marie Kondo のおかげで英語圏に浸透。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 53, japanese: 'ルンバが家具にぶつかりまくってる',
        english: [
            'The robot vacuum keeps bumping into things.',
            'My Roomba keeps crashing into furniture.',
            'I got a robot vacuum but it just bumps into everything and gets stuck under the couch.',
            "I bought a robot vacuum thinking it would change my life but all it does is bump into furniture, eat my socks, and get stuck under the sofa. Yesterday it got tangled in a phone charger cable and just sat there screaming until I rescued it. It is basically a really expensive really dumb pet. I still have to vacuum myself anyway because it misses half the floor.",
        ],
        context: 'bump into は「ぶつかる」。get stuck は「ハマる」。get tangled は「絡まる」。screaming は擬人化で「ピーピー鳴っている」。rescued は「救出した」。ロボット掃除機あるあるは万国共通。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 53, japanese: '掃除すると気分がスッキリする',
        english: [
            'Cleaning feels good.',
            'I always feel better after cleaning.',
            'There is something about a clean room that just clears your mind.',
            "I know I complain about cleaning all the time but honestly once I actually do it I feel amazing. There is something about looking at a spotless room that just resets my brain. The air feels different, I can think clearly, I even sleep better. It is like therapy but free. The problem is motivating myself to start. That is the hardest part.",
        ],
        context: 'spotless は「ピカピカ」。resets my brain は「脳がリセットされる」。therapy but free は「無料のセラピー」。motivating myself は「自分にやる気を出させる」。掃除のメンタル効果は科学的にも証明されている。',
        character: 'lisa', category: 'social', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 54: 買い物リスト (Grocery Shopping)
    // Scene: スーパーでの買い物トーク。リスト作る派vs直感派の対決。
    // ────────────────────────────────────────────────────

    {
        daySlot: 54, japanese: '買い物リスト作った？',
        english: [
            'Did you make a list?',
            'Do you have a shopping list?',
            'Did you make a grocery list or are we just winging it?',
            "Do you have a shopping list? Because every time we go without one we end up buying a bunch of random stuff we do not need and forgetting the one thing we actually came for. Last time we went for milk and came home with fifteen bags and no milk. I am making a list this time.",
        ],
        context: 'winging it は「ノープランでやる」。end up は「結局〜になる」。random stuff は「適当なもの」。came for は「〜を買いに来た」。grocery list は「買い物リスト」。計画性の有無は買い物の永遠のテーマ。',
        character: 'lisa', category: 'shopping', month: '2026-05',
    },
    {
        daySlot: 54, japanese: 'これ賞味期限切れてる',
        english: [
            'This is expired.',
            'This is past the expiration date.',
            'Check the date on that. I think it might be expired.',
            "Wait, look at the date on this. It expired three days ago. How is this still on the shelf? I almost grabbed it without looking. I always check now because one time I bought yogurt that was a week past and did not realize until I opened it at home. The smell was... unforgettable. And not in a good way.",
        ],
        context: 'expired は「期限切れ」。expiration date は「賞味期限/消費期限」。best before は「賞味期限」。use by は「消費期限」で、こちらの方が厳密。on the shelf は「棚に」。unforgettable は皮肉で「忘れられない（ほど臭かった）」。',
        character: 'yuki', category: 'shopping', month: '2026-05',
    },
    {
        daySlot: 54, japanese: 'エコバッグ忘れた',
        english: [
            'I forgot my bag.',
            'I forgot my reusable bag again.',
            'I always forget my eco bag. I have like ten at home but never one with me.',
            "I forgot my reusable bag again. This is the fifth time this month. I have a drawer full of them at home. At this point I am collecting plastic bags faster than I can use them. I keep one in my car, one in my backpack, and somehow I still manage to forget. My brain just erases it the second I leave the house.",
        ],
        context: 'reusable bag は「エコバッグ」の英語。eco bag は和製英語で通じない。plastic bag は「ビニール袋」。manage to は「なんとか〜する」だが、ここでは still manage to forget で「それでも忘れる」の皮肉。',
        character: 'takeshi', category: 'shopping', month: '2026-05',
    },
    {
        daySlot: 54, japanese: 'セール品につられちゃった',
        english: [
            'I bought it because it was on sale.',
            'I got suckered by the sale price.',
            'It was on sale so I grabbed it even though I do not really need it.',
            "I was not going to buy it but the sign said fifty percent off and my brain just shut down. I grabbed three of them. I do not even like this brand but it was such a good deal. My wife is going to kill me. I always do this. I save money on things I do not need and then do not have enough for things I do. It is a gift.",
        ],
        context: 'on sale は「セール中」。suckered は「まんまとやられた」。such a good deal は「すごいお得」。It is a gift は「（皮肉で）才能だよ」。セール品に弱いのは万国共通の人間の弱点。',
        character: 'kenji', category: 'shopping', month: '2026-05',
    },
    {
        daySlot: 54, japanese: 'レジ並びすぎじゃない？',
        english: [
            'The line is so long.',
            'Why is the checkout line so long?',
            'Every single register has a huge line. Why does this always happen on weekends?',
            "Look at this line. It is wrapped around the aisle. Why do they only have two registers open when there are a hundred people in the store? I swear they do this on purpose. And of course I always pick the slowest line. Every time. The person in front of me has coupons, a price check, and is paying in exact change.",
        ],
        context: 'checkout line は「レジの列」。register は「レジ」。aisle は「通路」。coupons は「クーポン」。price check は「値段確認」。exact change は「ちょうどの小銭」。レジあるあるは世界共通。',
        character: 'takeshi', category: 'shopping', month: '2026-05',
    },
    {
        daySlot: 54, japanese: 'お惣菜で済まそう',
        english: [
            'Let us just get something ready-made.',
            'Let us grab some deli stuff.',
            "I'm too tired to cook. Let us just get something from the deli section.",
            "Honestly I do not have the energy to cook tonight. Can we just grab something from the deli section? They have those pre-made bentos and salads that are actually pretty good. It is not the healthiest option but it is better than ordering delivery for the third time this week. Plus it is way cheaper.",
        ],
        context: 'deli section は「お惣菜コーナー」。ready-made は「出来合いの」。pre-made は「あらかじめ作られた」。do not have the energy は「気力がない」。日本の弁当文化は海外のデリよりクオリティが高い。',
        character: 'yuki', category: 'shopping', month: '2026-05',
    },
    {
        daySlot: 54, japanese: '安い時にまとめ買いする',
        english: [
            'I stock up when it is cheap.',
            'I buy in bulk when there is a sale.',
            'When something I use a lot goes on sale, I stock up like crazy.',
            "I am a bulk buyer. When toilet paper or rice or anything I know I will use goes on sale, I buy enough to last me six months. My closet looks like a warehouse. My wife calls it hoarding, I call it being strategic. The math works out. I am saving money in the long run even if our apartment looks like a supply depot.",
        ],
        context: 'stock up は「まとめ買いする」。buy in bulk は「大量に買う」。warehouse は「倉庫」。hoarding は「ため込み」。strategic は「戦略的」。in the long run は「長い目で見れば」。supply depot は「補給基地」。',
        character: 'kenji', category: 'shopping', month: '2026-05',
    },
    {
        daySlot: 54, japanese: '有機野菜って高くない？',
        english: [
            'Organic is expensive.',
            'Is organic really worth the extra cost?',
            'Organic vegetables are like twice the price. Is it really worth it?',
            "Can someone explain to me why organic carrots are three times the price of regular ones? They look the same. They taste the same. I have done blind taste tests and I cannot tell the difference. Is it really healthier or is it just marketing? I want to do the right thing but my wallet has limits.",
        ],
        context: 'organic は「有機の」。blind taste test は「目隠し味覚テスト」。marketing は「マーケティング」。do the right thing は「正しいことをする」。my wallet has limits は「財布にも限界がある」のユーモア。',
        character: 'mina', category: 'shopping', month: '2026-05',
    },
    {
        daySlot: 54, japanese: 'ポイントカードありますか？',
        english: [
            'Do you have a rewards card?',
            'Are you a member? Do you have a points card?',
            'Do you have a loyalty card with us? You can earn points on every purchase.',
            "Do you have a loyalty card? If you sign up today you get ten percent off your first purchase. It is free. You just earn points every time you shop and eventually you can redeem them for discounts. I know it sounds like a lot of cards to carry around but honestly the savings add up. I saved like thirty dollars last month just from points.",
        ],
        context: 'loyalty card / rewards card / points card は全部「ポイントカード」。redeem は「(ポイントを)使う」。add up は「積み重なる」。sign up は「登録する」。日本のポイント文化は世界でもトップレベル。',
        character: 'master', category: 'shopping', month: '2026-05',
    },
    {
        daySlot: 54, japanese: '必要なもの以外買わないって決めたのに',
        english: [
            'I was not supposed to buy extra stuff.',
            'I told myself I would only get what I needed.',
            'I went in for three things and came out with a full cart. Every single time.',
            "I made a list. I told myself, stick to the list. Do not look at anything else. Just go in, get what you need, and get out. And yet here I am with a cart full of things I did not plan on buying. How does this happen? I think stores are designed to make you lose your willpower. It is like a trap you walk into voluntarily.",
        ],
        context: 'stick to は「守る・従う」。cart は「カート」。plan on は「〜するつもり」。willpower は「意志力」。voluntarily は「自分から」。スーパーの動線設計は購買行動を誘導するように作られている。',
        character: 'lisa', category: 'shopping', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 55: 子育ての話 (Parenting)
    // Scene: ケンジとリサが子育てトーク。独身組は驚きと尊敬のまなざし。
    // ────────────────────────────────────────────────────

    {
        daySlot: 55, japanese: '子供が言うこと聞かない',
        english: [
            'My kid does not listen.',
            'My kid never listens to me.',
            'No matter what I say, my kid just completely ignores me.',
            "I do not know where I went wrong but my kid has selective hearing. If I say come eat dinner, nothing. If I say let us go get ice cream, supersonic hearing. She can hear a candy wrapper opening from three rooms away but cannot hear me asking her to clean up when I am standing right next to her.",
        ],
        context: 'selective hearing は「都合のいい聴覚」。supersonic は「超音速の」。candy wrapper は「お菓子の包み」。right next to her は「真横にいるのに」。子供の選択的聴覚は親あるあるの最上位。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 55, japanese: '寝かしつけが大変',
        english: [
            'Bedtime is a struggle.',
            'Getting my kid to sleep is so hard.',
            'Bedtime takes forever. She always wants one more story, one more song.',
            "Putting my kid to bed is a two-hour negotiation every single night. First she needs water. Then she has to go to the bathroom. Then there is a monster under the bed. Then she needs a different blanket. Then one more story. Then one more hug. By the time she actually falls asleep I am more exhausted than she is. And then I have to do it all again tomorrow.",
        ],
        context: 'negotiation は「交渉」。putting to bed は「寝かしつける」。one more は「もう1つ」の無限ループ。by the time は「〜するまでに」。寝かしつけの戦いは全世界の親が共感する話題。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 55, japanese: '参観日に行ってきた',
        english: [
            'I went to the school open day.',
            'I attended the school observation day.',
            'I went to my kid is school open day today. It was actually really fun.',
            "I went to my daughter's school observation day and I almost cried watching her give a presentation in front of the class. She was so nervous but she did amazing. I was sitting there like a proud idiot trying not to tear up. All the other parents were filming on their phones. It hit me that she is growing up so fast.",
        ],
        context: 'observation day は「参観日」。school open day も使える。presentation は「発表」。proud idiot は「誇らしいバカ」の自虐。tear up は「涙ぐむ」。growing up so fast は親の定番セリフ。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 55, japanese: '反抗期がきた',
        english: [
            'The rebellious phase hit.',
            'My kid is going through a rebellious phase.',
            'My son just hit his rebellious phase and everything I say is wrong apparently.',
            "My son has entered his rebellious phase and I am not equipped for this. Everything I say is met with an eye roll or a whatever. He used to think I was the coolest person alive and now I am the most embarrassing human on the planet. I cannot even drop him off at school anymore. He makes me park around the corner. Around the corner.",
        ],
        context: 'rebellious phase は「反抗期」。eye roll は「目をぐるっと回す」軽蔑のジェスチャー。whatever は「どうでもいい」の反抗的な返事。drop off は「送っていく」。around the corner は「角を曲がったところに」。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 55, japanese: '子供がいると自由な時間がない',
        english: [
            'I have no free time.',
            'I have zero personal time since having kids.',
            'Since having kids, my personal time is basically nonexistent.',
            "What is free time? I genuinely do not remember what that feels like. Before kids I used to sleep in on weekends, go to movies on a whim, stay out late with friends. Now my weekends start at six in the morning with someone jumping on my stomach yelling I am hungry. Do not get me wrong, I love them. But I also miss silence.",
        ],
        context: 'on a whim は「思いつきで」。stay out late は「遅くまで外にいる」。Do not get me wrong は「勘違いしないで」の前置き。miss silence は「静寂が恋しい」。親の本音トークの名表現。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 55, japanese: '子供の成長って早いよね',
        english: [
            'Kids grow up fast.',
            'They grow up so fast.',
            'I feel like just yesterday she was a baby and now she is in middle school.',
            "I swear she was just learning to walk and now she is taller than me. Where did the time go? I was looking at old photos the other day and got emotional. She used to hold my hand everywhere we went and now she walks five steps ahead of me in public. I know it is normal but man, it hits different when it is your own kid.",
        ],
        context: 'Where did the time go? は「時間はどこへ行った？」で親の定番嘆き。hits different は「感じ方が違う」の新しいスラング。five steps ahead は「5歩先を歩く」で思春期の親子距離。got emotional は「感情的になった」。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 55, japanese: 'イクメンってかっこいいよね',
        english: [
            'Dads who help are great.',
            'Hands-on dads are awesome.',
            'I love seeing dads who are really involved with their kids.',
            "I think it is great that more dads are being hands-on with parenting now. When I was growing up, my dad never changed a diaper in his life. He was a good dad in other ways but that generation just did not do it. Now I see dads at the park, at school events, cooking lunch for their kids. That is how it should be. Parenting is a team sport.",
        ],
        context: 'hands-on は「積極的に関わる」。involved は「関与している」。changed a diaper は「おむつを替えた」。team sport は「チームスポーツ」の比喩。イクメンは和製語で英語では hands-on dad / involved dad が自然。',
        character: 'master', category: 'social', month: '2026-05',
    },
    {
        daySlot: 55, japanese: '子供に教わることもあるよね',
        english: [
            'Kids teach you things too.',
            'I learn from my kids more than I expected.',
            'Sometimes my kid says something so simple and it completely changes my perspective.',
            "My daughter said something the other day that stopped me in my tracks. I was stressed about work and she looked at me and said, Daddy, why are you mad at your phone? And I realized she was right. I was letting work control my mood at home. A five-year-old saw what I could not. Kids have this way of cutting through all the noise and hitting you with pure truth.",
        ],
        context: 'stopped me in my tracks は「ハッとさせられた」。cutting through the noise は「雑念を切り裂く」。pure truth は「純粋な真実」。perspective は「視点」。子供の言葉に気づかされる瞬間は親の特権。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 55, japanese: '保育園の送り迎えが地獄',
        english: [
            'Daycare pickup is a nightmare.',
            'The daycare commute is killing me.',
            'Dropping off and picking up from daycare takes up half my morning.',
            "The daycare drop-off and pickup routine is an absolute marathon. I have to get her dressed, fed, packed, and in the car by seven thirty or we are late. Then I fight traffic for forty minutes, drop her off, fight traffic again to get to work, and do the whole thing in reverse in the evening. By the time we get home I have nothing left. I am running on fumes.",
        ],
        context: 'daycare は「保育園」。drop-off は「送り」。pickup は「迎え」。running on fumes は「ガス欠寸前で走っている」=「限界」。in reverse は「逆の順番で」。marathon は「マラソン」の比喩。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 55, japanese: '子育ては大変だけど最高',
        english: [
            'Parenting is tough but worth it.',
            'It is hard but I would not trade it for anything.',
            'Parenting is the hardest thing I have ever done but also the most rewarding.',
            "Look, I am not going to sugarcoat it. Parenting is exhausting, stressful, and expensive. There are days when I seriously question my sanity. But then your kid hugs you for no reason and says I love you, Daddy, and everything just melts away. All the sleepless nights, the tantrums, the mess. None of it matters in that moment. I would do it all over again in a heartbeat.",
        ],
        context: 'sugarcoat は「オブラートに包む」。question my sanity は「正気を疑う」。melts away は「溶けてなくなる」。tantrums は「かんしゃく」。in a heartbeat は「即座に」。親の総括として完璧な表現。',
        character: 'kenji', category: 'social', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 56: 年齢の話 (Age & Getting Older)
    // Scene: ゴンドーの誕生日が近い。年齢トークで全員が自分の歳を嘆く。
    // ────────────────────────────────────────────────────

    {
        daySlot: 56, japanese: '歳取ったなって感じる瞬間',
        english: [
            'I feel old sometimes.',
            'I am starting to feel my age.',
            'There are moments where I suddenly realize I am not as young as I think.',
            "You know when you feel old? When you make a sound sitting down. I never used to do that. Now every time I sit on the couch I go ugh like it is a workout. And the other day I got excited about a new sponge. A sponge. That is the moment I knew. My youth is officially over. I am now a person who gets excited about cleaning supplies.",
        ],
        context: 'feel my age は「歳を感じる」。make a sound は「声が出る」。workout は「運動」。got excited about は「〜にテンションが上がった」。cleaning supplies は「掃除用品」。日常の小さな老いの自覚ネタ。',
        character: 'kenji', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 56, japanese: '最近の若い子はすごいよね',
        english: [
            'Young people these days are impressive.',
            'Kids today are on another level.',
            'I am constantly amazed by what young people can do with technology.',
            "I watched a twelve-year-old make a website in like thirty minutes the other day. When I was twelve I was still figuring out how to set the clock on the VCR. These kids today grew up with technology in their hands. They can code, edit videos, run businesses. Meanwhile I still ask my daughter how to change my phone settings. The future is in good hands though.",
        ],
        context: 'on another level は「別次元」。grew up with は「〜とともに育った」。run businesses は「ビジネスを運営する」。VCR は「ビデオデッキ」で世代がわかる。in good hands は「安心できる手に」。',
        character: 'master', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 56, japanese: '年齢は関係ないよ',
        english: [
            'Age is just a number.',
            "Age doesn't matter. It is how you feel.",
            'Honestly, age is just a number. What matters is how you live.',
            "People put too much weight on age. I know people in their sixties who have more energy than some twenty-year-olds. And I know people in their thirties who act like they are already retired. It is all about mindset. If you decide you are old then you are old. If you decide you still have things to do and learn, age is just a number on a piece of paper.",
        ],
        context: 'put too much weight on は「〜を重視しすぎる」。mindset は「考え方」。act like は「〜のように振る舞う」。piece of paper は「紙切れ」。age is just a number は英語の定番名言。',
        character: 'master', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 56, japanese: '健康診断の結果がやばかった',
        english: [
            'My checkup results were bad.',
            'I got some scary results from my health checkup.',
            'My annual health checkup came back and the numbers are not great.',
            "I got my health checkup results back and let us just say my doctor was not happy. Cholesterol is up, blood pressure is borderline, and apparently my liver is not thrilled with my lifestyle choices. The doctor told me to cut back on drinking and eat more vegetables. I nodded and then stopped at the convenience store for a beer on the way home.",
        ],
        context: 'checkup は「健康診断」。borderline は「ギリギリ」。not thrilled は「喜んでいない」の控えめな表現。cut back on は「控える」。lifestyle choices は「生活習慣」。健診あるあるの自虐ネタ。',
        character: 'kenji', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 56, japanese: '若い頃に戻りたい',
        english: [
            'I wish I were young again.',
            'I miss being in my twenties.',
            'If I could go back to my twenties knowing what I know now, that would be perfect.',
            "Sometimes I wish I could go back to my twenties with everything I know now. I would invest my money, take better care of my body, and actually study. But then I remember my twenties were also full of bad decisions and zero sleep and drama. So maybe not. Maybe I am right where I am supposed to be. But I do miss being able to eat anything without gaining weight.",
        ],
        context: 'knowing what I know now は「今の知識を持って」。take care of は「大切にする」。right where I am supposed to be は「今いるべき場所にいる」。gaining weight は「体重が増える」。retrospective wisdom の定番トーク。',
        character: 'yuki', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 56, japanese: '同窓会行ったらみんな変わってた',
        english: [
            'Everyone changed at the reunion.',
            'I went to a reunion and barely recognized anyone.',
            'I went to my high school reunion and some people looked completely different.',
            "I went to my twenty-year high school reunion last month and I am still processing it. Some people look exactly the same and some I did not recognize at all. This one guy who used to be the class clown is now a lawyer in a suit. And the quiet girl from the back of the class is running a company. Meanwhile I am just here. Same old me. It was surreal.",
        ],
        context: 'reunion は「同窓会」。barely recognized は「ほとんどわからなかった」。class clown は「クラスのお笑い担当」。surreal は「現実離れした」。processing は「消化中」。Same old me は「相変わらずの自分」。',
        character: 'takeshi', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 56, japanese: '白髪があると落ち着いて見えるよ',
        english: [
            'Gray hair looks distinguished.',
            'A little gray makes you look sophisticated.',
            'Honestly, gray hair suits you. It gives you a mature, sophisticated look.',
            "You know what, I think gray hair actually looks good. It gives you a distinguished look. Like, you have lived. You have stories to tell. George Clooney has gray hair and everyone thinks he is the most attractive man alive. Own it. Do not dye it, do not hide it. Wear it like a badge of honor.",
        ],
        context: 'distinguished は「品のある」。sophisticated は「洗練された」。own it は「堂々とする」。badge of honor は「名誉の勲章」。George Clooney は「グレイヘアのアイコン」。silver fox は白髪の魅力的な男性を指すスラング。',
        character: 'lisa', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 56, japanese: '階段で息切れする',
        english: [
            'I get out of breath on stairs.',
            'Stairs are my enemy now.',
            'I climbed three flights of stairs and I thought I was going to die.',
            "I took the stairs instead of the elevator today because I thought, hey, I should be healthier. Three flights. That is it. By the second floor I was breathing like I had just run a marathon. I got to the third floor and had to pretend I was checking my phone so my coworkers would not see me gasping. I am joining a gym this week. Probably.",
        ],
        context: 'out of breath は「息切れ」。flights of stairs は「階段の段数」。gasping は「あえいでいる」。pretend は「ふりをする」。Probably は「たぶん（やらないフラグ）」。体力低下の自覚ネタ。',
        character: 'takeshi', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 56, japanese: '誕生日を祝われるのが微妙になってきた',
        english: [
            'Birthdays feel different now.',
            'I am not that excited about birthdays anymore.',
            'At some point birthdays stopped being exciting and started being... a reminder.',
            "When I was a kid, birthdays were the best day of the year. Cake, presents, everyone singing. Now when someone says happy birthday I just feel time passing. It is not sad exactly, it is just... different. I do not need a party or presents. A quiet dinner with good people and good food is honestly all I want. That and maybe for my knees to stop hurting.",
        ],
        context: 'feel time passing は「時の流れを感じる」。a reminder は「思い出させるもの」。not sad exactly は「正確には悲しくはない」の微妙な感情表現。knees hurting は「膝の痛み」で歳を感じるオチ。',
        character: 'master', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 56, japanese: '歳を重ねるのも悪くない',
        english: [
            'Getting older is not all bad.',
            'There are good things about getting older too.',
            'Getting older means caring less about what people think. That is freedom.',
            "You know what the best thing about getting older is? You stop caring about stuff that does not matter. In my twenties I worried about everything. What people thought of me, whether I was cool enough, whether I was doing enough. Now? I wear what I want, say what I think, and go to bed at nine thirty without a shred of guilt. That is real freedom right there.",
        ],
        context: 'stop caring は「気にしなくなる」。shred of guilt は「一片の罪悪感」。freedom は「自由」。go to bed at nine thirty は歳を取った証拠でもあり、自由の象徴でもある。cool enough は「十分かっこいいか」。',
        character: 'master', category: 'feeling', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 57: お金の話 (Money Talk)
    // Scene: 給料日後の居酒屋。節約と散財の永遠のテーマ。
    // ────────────────────────────────────────────────────

    {
        daySlot: 57, japanese: '今月ピンチだわ',
        english: [
            'I am broke this month.',
            'I am really tight on money this month.',
            'My wallet is crying. I am so broke this month.',
            "I do not know how it happened but I looked at my bank account and I have like three thousand yen until payday. That is ten days away. I have no idea where my money went. I swear I did not buy anything crazy. It just... disappeared. Like magic but the depressing kind. I am going to be eating convenience store rice balls for the next week.",
        ],
        context: 'broke は「金欠」。tight on money は「お金がきつい」。payday は「給料日」。disappeared like magic は「魔法のように消えた」。depressing kind は「悲しい方の」。金欠トークは居酒屋の鉄板。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 57, japanese: '貯金してる？',
        english: [
            'Do you save money?',
            'Are you saving anything?',
            'Are you putting any money aside? Like for the future?',
            "Are you saving anything? I have been trying to put away a little every month but honestly it is hard. By the time I pay rent, bills, food, and my phone, there is barely anything left. I read somewhere that you should save twenty percent of your income but who does that? Whoever wrote that clearly does not live in Tokyo.",
        ],
        context: 'putting aside / putting away は「貯金する」。income は「収入」。barely anything left は「ほとんど残らない」。who does that? は「誰がそんなことするの？」の反語。東京の生活費の高さは世界的に有名。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 57, japanese: 'ボーナスで何買う？',
        english: [
            'What will you buy with your bonus?',
            'Got any plans for your bonus?',
            'Bonus is coming up. Have you decided what to do with it?',
            "Bonus season is coming and I have already mentally spent it three times over. I need a new laptop, I want to take a trip, and I should probably put some in savings. But realistically most of it is going to pay off my credit card from last month. It is like a bonus that is already spoken for before it even arrives. The cycle never ends.",
        ],
        context: 'mentally spent は「頭の中で使った」。three times over は「3回分」。spoken for は「すでに使い道が決まっている」。pay off は「返済する」。cycle は「サイクル」。ボーナスが来る前に消えるあるある。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 57, japanese: 'サブスク解約しないと',
        english: [
            'I need to cancel some subscriptions.',
            'I have too many subscriptions I do not use.',
            'I just realized I am paying for like five subscriptions I never use.',
            "I went through my credit card statement and I am paying for six different subscriptions. Six. I use maybe two of them. There is a gym membership I have not used in four months, a music app I forgot I had, and some meal kit thing I signed up for during a moment of weakness. I need to cancel all of them but every time I try there is a cancellation fee or they make it so hard to find the button.",
        ],
        context: 'statement は「明細書」。moment of weakness は「魔が差した瞬間」。cancellation fee は「解約料」。signed up for は「契約した」。サブスクの解約ボタンが見つけにくい問題は世界共通の怒り。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 57, japanese: '割り勘にしよう',
        english: [
            'Let us split it.',
            'Should we split the bill?',
            'Let us just split it evenly. Easier that way.',
            "Let us just split it evenly. I know everyone had different things but trying to figure out who had what is way too much math after three beers. Unless someone had way more than everyone else, in which case, you know who you are. Just kidding. Even split is fine. Who has the Venmo? I will send mine right now.",
        ],
        context: 'split evenly は「均等に割り勘」。figure out は「計算する」。you know who you are は「心当たりあるでしょ」のユーモア。Venmo はアメリカの送金アプリ。日本のPayPayに相当。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 57, japanese: '投資とか始めた方がいいのかな',
        english: [
            'Should I start investing?',
            'I have been thinking about getting into investing.',
            'Everyone keeps telling me to invest but I have no idea where to start.',
            "Everyone around me is talking about investing. Stocks, crypto, NISA, whatever. I feel like I should be doing something but I have no idea where to start and honestly I am scared of losing money. My friend started investing last year and talks about it like he is Warren Buffett. But he also lost fifty thousand yen last month so I am not convinced.",
        ],
        context: 'getting into は「始める」。stocks は「株」。crypto は「暗号通貨」。NISA は日本の少額投資非課税制度。not convinced は「納得していない」。Warren Buffett は投資の神様。投資初心者の本音。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 57, japanese: '衝動買いが止まらない',
        english: [
            'I cannot stop impulse buying.',
            'I keep buying things on impulse.',
            'I have a serious impulse buying problem. Especially online.',
            "Online shopping is my weakness. I see something at two in the morning and my sleep-deprived brain goes, you need this. I bought a bread maker last week. I do not even eat bread that much. But the reviews were so good and it was on sale and somehow it ended up in my cart and now it is sitting in my kitchen judging me. This happens at least twice a month.",
        ],
        context: 'impulse buying は「衝動買い」。sleep-deprived は「睡眠不足の」。ended up in my cart は「いつの間にかカートに入っていた」。judging me は「私を裁いている」の擬人化。深夜ネットショッピングは現代の罠。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 57, japanese: '今日は俺がおごるよ',
        english: [
            'It is on me.',
            "I'll get this one. My treat.",
            'Put your wallet away. This one is on me.',
            "Nope. Put your wallet away. This one is on me. You got it last time and I have been meaning to pay you back. Besides, it is payday. I feel rich for exactly twenty-four hours before all my bills hit. Let me enjoy this moment. Tomorrow I will be broke again but tonight I am a generous man.",
        ],
        context: 'on me は「私のおごり」。my treat は「私がご馳走する」。put your wallet away は「財布しまいなさい」。bills hit は「請求が来る」。generous は「気前のいい」。給料日後の一瞬の豊かさを楽しむ心理。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 57, japanese: '老後の資金が心配',
        english: [
            'I worry about retirement funds.',
            'I do not have nearly enough saved for retirement.',
            'I started calculating how much I need for retirement and now I cannot sleep.',
            "I made the mistake of using one of those retirement calculators online and now I am in a full panic. According to the calculator I need to save like two thousand dollars a month to retire comfortably. I can barely save two hundred. At this rate I will be working until I am ninety. My retirement plan is basically to hope that time travel gets invented so I can go back and tell twenty-year-old me to start saving.",
        ],
        context: 'retirement は「退職・老後」。comfortably は「余裕を持って」。at this rate は「このペースだと」。retirement plan は「老後の計画」だがここでは皮肉。retirement calculator は「老後資金シミュレーター」。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 57, japanese: 'お金より時間の方が大事',
        english: [
            'Time is more valuable than money.',
            'I would rather have more time than more money.',
            'At the end of the day, you cannot buy time. That is the one thing money cannot fix.',
            "Here is what I have learned in fifty-eight years. Money comes and goes. You earn it, you spend it, you earn it again. But time? Time only goes one direction. You cannot earn it back. I have never met a rich person on their deathbed who said I wish I had made more money. They all say I wish I had spent more time with the people I love. That tells you everything.",
        ],
        context: 'comes and goes は「行ったり来たりする」。deathbed は「死の床」。one direction は「一方通行」。tells you everything は「それが全てを物語っている」。ゴンドーの人生哲学の結晶。',
        character: 'master', category: 'social', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 58: SNS・ネットの話 (Social Media)
    // Scene: ミナがSNS疲れを告白。世代間のSNS感覚の違いで議論白熱。
    // ────────────────────────────────────────────────────

    {
        daySlot: 58, japanese: 'SNS疲れた',
        english: [
            'I am tired of social media.',
            'Social media is exhausting.',
            'I am thinking about taking a break from social media. It is draining.',
            "I need a break from social media. I am so tired of it. Every time I open Instagram I end up comparing myself to people who look like they have perfect lives. I know it is all curated and filtered but it still gets to me. I deactivated my account for a week once and it was the most peaceful week of my life. Maybe I should do it again.",
        ],
        context: 'draining は「消耗させる」。curated は「意図的に選ばれた」。filtered は「フィルター加工された」。gets to me は「心に刺さる」。deactivated は「一時停止した」。SNS疲れは現代の社会問題。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 58, japanese: 'いいね欲しさにやってない？',
        english: [
            'Are you doing it for likes?',
            'You are just doing it for the likes, right?',
            'Sometimes I wonder if people do things just to post about them.',
            "Have you noticed that some people do not actually experience things anymore? They go to a restaurant and spend twenty minutes taking photos before they even eat. They go to a concert and watch the whole thing through their phone screen. It is like the experience does not count unless you post it. What happened to just being in the moment?",
        ],
        context: 'for the likes は「いいねのために」。being in the moment は「今を生きる」。does not count は「カウントされない」。through their phone screen は「スマホの画面越しに」。デジタル時代の哲学的問い。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 58, japanese: 'バズりたい',
        english: [
            'I want to go viral.',
            'I want my post to blow up.',
            'I keep trying to make something go viral but nothing works.',
            "I have been posting videos for six months and my most viewed one has like forty-seven views. And I am pretty sure thirty of those are me checking if anyone watched it. Meanwhile some guy films his cat falling off a table and gets ten million views. What is the algorithm even looking for? I give up trying to understand it.",
        ],
        context: 'go viral は「バズる」。blow up は「爆発的に広まる」。algorithm は「アルゴリズム」。views は「再生数」。バズの法則は誰にもわからない永遠の謎。cat videos は「猫動画」で王道コンテンツ。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 58, japanese: 'ネットの情報って信じていいの？',
        english: [
            'Can you trust the internet?',
            'I do not know what to believe online anymore.',
            'There is so much misinformation online. How do you tell what is real?',
            "The internet is wild. You can find an article that says coffee is good for you and another one right next to it that says coffee will kill you. Who do you believe? I have started checking multiple sources before I believe anything now. It takes more effort but I got burned once by sharing something that turned out to be completely fake. Never again.",
        ],
        context: 'misinformation は「誤情報」。multiple sources は「複数の情報源」。got burned は「痛い目にあった」。turned out to be は「〜だとわかった」。ネットリテラシーは現代の必須スキル。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 58, japanese: 'レビューって当てになる？',
        english: [
            'Can you trust reviews?',
            'Online reviews are hit or miss.',
            'I never know if online reviews are real or if they are paid.',
            "I read reviews before buying anything but I do not trust them anymore. Half of them are obviously fake. Five stars, generic praise, broken grammar. Then you have the one-star people who are just angry about everything. The real reviews are usually the three and four star ones. Those people actually bought the product and have useful things to say.",
        ],
        context: 'hit or miss は「当たり外れがある」。generic praise は「テンプレの褒め言葉」。broken grammar は「文法がおかしい」。fake reviews は世界的な問題。3-4星のレビューが一番信頼できるという考え方は英語圏で浸透。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 58, japanese: '既読スルーされたんだけど',
        english: [
            'I got left on read.',
            'They left me on read again.',
            'I sent a message two days ago and they still have not replied. I know they saw it.',
            "I sent a message on Monday and it is now Wednesday and they have read it but not replied. I can see the blue check marks. I know they saw it. What am I supposed to do with that information? Is the conversation over? Are they thinking about it? Did I say something wrong? This is the modern form of torture. Just reply. Even if it is a thumbs up. Anything.",
        ],
        context: 'left on read は「既読スルー」の英語圏の表現。blue check marks は「既読マーク」。modern form of torture は「現代の拷問」。既読スルーの苦痛は日本語のLINE文化でも英語のiMessage文化でも同じ。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 58, japanese: 'TikTokの沼にハマった',
        english: [
            'I fell into a TikTok hole.',
            'I got sucked into TikTok for three hours.',
            'I opened TikTok for five minutes and next thing I knew it was two in the morning.',
            "I need someone to physically take my phone away from me because I cannot stop scrolling TikTok. I open it to check one thing and three hours later I am watching a video of someone making miniature furniture for hamsters. How did I get here? I do not even have a hamster. The algorithm knows exactly what I want to see and it is terrifying.",
        ],
        context: 'fell into a hole は「沼にハマった」。got sucked into は「吸い込まれた」。scrolling は「スクロールし続ける」。the algorithm knows は「アルゴリズムが知っている」。TikTokの中毒性は世界的な議論のテーマ。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 58, japanese: 'ネットがないと生きていけない',
        english: [
            'I cannot live without the internet.',
            'I am way too dependent on the internet.',
            'If the internet disappeared tomorrow, I genuinely do not know what I would do.',
            "I realized how dependent I am on the internet when my Wi-Fi went down for three hours last week. I could not work, I could not watch anything, I could not even look up a recipe to cook dinner. I just sat there staring at my phone waiting for it to come back. I felt like a caveman. It was genuinely disorienting. We are all one router malfunction away from a complete meltdown.",
        ],
        context: 'dependent on は「依存している」。went down は「落ちた」。disorienting は「混乱させる」。router malfunction は「ルーターの故障」。meltdown は「崩壊」。デジタル依存を自覚する瞬間。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 58, japanese: 'デジタルデトックスしたい',
        english: [
            'I want to do a digital detox.',
            'I should take a break from my phone.',
            'I am seriously considering a weekend without screens. Full digital detox.',
            "I am going to try a digital detox this weekend. No phone, no laptop, no tablet. Just me and actual human beings and maybe a book. I did it once before and the first few hours were brutal. My hand kept reaching for my phone like a phantom limb. But after that it was incredible. I talked to people, went for a walk, noticed things I normally miss. I slept like a baby.",
        ],
        context: 'digital detox は「デジタルデトックス」。phantom limb は「幻肢」で、ないのにある感じ。screens は「画面」。brutal は「きつかった」。slept like a baby は「ぐっすり眠った」。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 58, japanese: 'ネットは道具であって人生じゃない',
        english: [
            'The internet is a tool, not your life.',
            'Do not let the internet live your life for you.',
            'The internet should serve you, not the other way around.',
            "The internet is the most powerful tool humanity has ever created. But a tool is only useful if you control it, not the other way around. If you are checking your phone first thing in the morning and last thing at night, the tool is controlling you. Put it down once in a while. The real world is still out there. And it is more interesting than anything on a screen.",
        ],
        context: 'the other way around は「逆もまた然り」。first thing in the morning は「朝一番に」。put it down は「置く」。once in a while は「たまには」。ゴンドーのアナログ世代の知恵が光る締めの一言。',
        character: 'master', category: 'social', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 59: 季節の話 (Seasons & Holidays)
    // Scene: 梅雨入りの話題から、好きな季節トーク。思い出の季節イベント。
    // ────────────────────────────────────────────────────

    {
        daySlot: 59, japanese: 'もう梅雨か',
        english: [
            'Rainy season already?',
            'I cannot believe the rainy season is here already.',
            'It is only May and the rainy season is already starting. I am not ready.',
            "Ugh, it is rainy season already? I feel like summer just ended and here we are again. I hate this time of year. Everything is damp, my clothes never dry, and my hair turns into a disaster the second I step outside. The only good thing about rainy season is that it means summer is coming. But then summer is too hot. I am never satisfied.",
        ],
        context: 'rainy season は「梅雨」。梅雨は英語に直訳がなく rainy season が定番。damp は「じめじめした」。disaster は「惨状」。never satisfied は「絶対満足しない」の自虐。日本の梅雨は独特の季節感。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 59, japanese: '好きな季節は？',
        english: [
            'What is your favorite season?',
            'Which season do you like best?',
            'If you had to pick one season to live in forever, which would it be?',
            "I am an autumn person. One hundred percent. The weather is perfect. Not too hot, not too cold. The leaves change color. You can wear hoodies. Hot drinks feel right again. And there is Halloween and Thanksgiving. Fall has the best food and the best vibes. Spring is nice but allergies ruin it for me. Summer is way too humid. And winter? No thank you.",
        ],
        context: 'autumn / fall は「秋」でどちらも使う。hoodies は「パーカー」。vibes は「雰囲気」。allergies ruin it は「アレルギーが台無しにする」。humid は「蒸し暑い」。季節の好みトークは英語のsmall talkの定番。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 59, japanese: '花粉症がやばい',
        english: [
            'My allergies are killing me.',
            'Hay fever is destroying me right now.',
            'My hay fever is so bad this year. I cannot stop sneezing.',
            "I am dying. My hay fever is at an all-time high this year. My eyes are so itchy I want to take them out and wash them. I am sneezing like forty times a day. I have gone through an entire box of tissues since morning. I tried every allergy medicine on the market and nothing works. I am seriously considering moving to a place with no trees.",
        ],
        context: 'hay fever は「花粉症」。allergies でもOK。itchy は「かゆい」。gone through は「使い果たした」。all-time high は「過去最高」。花粉症は日本の国民病だが英語圏でも hay fever は一般的。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 59, japanese: '夏祭り楽しみだな',
        english: [
            'I love summer festivals.',
            'I am looking forward to the summer festivals.',
            'Summer is all about the festivals. I cannot wait for fireworks and street food.',
            "Summer festivals are my favorite thing about living in Japan. The yukata, the food stalls, the fireworks. There is something magical about standing in a crowd watching fireworks light up the sky. And the food. Yakisoba, kakigori, takoyaki. I eat way too much every time but it only happens once a year so I do not feel guilty. It is like a calorie-free zone.",
        ],
        context: 'food stalls は「屋台」。light up は「照らす」。calorie-free zone は「カロリーゼロ地帯」のジョーク。yukata はそのまま英語で通じる。日本の夏祭りは外国人にも大人気のイベント。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 59, japanese: 'クリスマスは何するの？',
        english: [
            'What are you doing for Christmas?',
            'Any plans for Christmas?',
            'Do you have plans for Christmas? I never know what to do.',
            "What are you doing for Christmas? In Japan it is all about couples and fried chicken, which still cracks me up. In the US it is a family holiday. My family used to do a big dinner on Christmas Eve with all the relatives. I kind of miss that. Now I just order a cake and watch movies by myself. It is peaceful but a little lonely if I am being honest.",
        ],
        context: 'cracks me up は「笑える」。Christmas Eve は「クリスマスイブ」。relatives は「親戚」。if I am being honest は「正直に言うと」。日本とアメリカのクリスマスの違いは鉄板ネタ。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 59, japanese: '紅葉見に行こうよ',
        english: [
            'Let us go see the autumn leaves.',
            'We should go leaf-peeping this weekend.',
            'The autumn colors should be peaking soon. We should plan a trip.',
            "The fall colors are supposed to peak this weekend in Nikko. We should definitely go. I went last year and it was unreal. The whole mountain turns red and gold and orange. It looks like a painting. If we leave early enough we can beat the crowds. Last time I went in the afternoon and it was so packed you could barely see the trees through the people.",
        ],
        context: 'leaf-peeping は「紅葉狩り」のアメリカ英語。peak は「見頃」。unreal は「信じられないほど綺麗」。beat the crowds は「混雑を避ける」。日本の紅葉は世界的に有名。autumn colors / fall colors が一般的。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 59, japanese: '年末年始ってあっという間だよね',
        english: [
            'The holidays fly by.',
            'The year-end holidays are over in a flash.',
            'Every year I plan to relax over the holidays and every year they are over before I know it.',
            "Is it just me or do the year-end holidays get shorter every year? By the time I actually start relaxing it is already January third and I have to go back to work. I never manage to do half the things I plan. I always say I will clean the house, read a book, organize my life. Instead I eat mochi, watch TV, and nap. And honestly? That is not the worst way to spend a holiday.",
        ],
        context: 'fly by は「あっという間に過ぎる」。in a flash は「一瞬で」。before I know it は「気づく前に」。year-end holidays は「年末年始」。mochi は英語でも mochi で通じる。nap は「昼寝」。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 59, japanese: '四季がある国っていいよね',
        english: [
            'Having four seasons is nice.',
            'I love that Japan has distinct seasons.',
            'One thing I love about Japan is that each season feels completely different.',
            "You know what I appreciate about living here? The four seasons. Like really distinct ones. Spring with the cherry blossoms, summer with the festivals and cicadas, fall with the colors, winter with the hot springs. Each one has its own food, its own events, its own mood. I lived in a tropical country for a while and I missed the seasons so much. You do not realize how special it is until it is gone.",
        ],
        context: 'distinct は「はっきりした」。cherry blossoms は「桜」。cicadas は「セミ」。mood は「雰囲気」。tropical は「熱帯の」。四季の魅力を語るのは日本文化の紹介でよく使うテーマ。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 59, japanese: '衣替えめんどくさい',
        english: [
            'Switching out clothes is such a hassle.',
            'I hate the seasonal wardrobe change.',
            'Every time the season changes I have to swap out my entire closet. It is a pain.',
            "Why do I have so many clothes? Every season change I have to pull out boxes from the closet, put away the old stuff, iron everything, and figure out what still fits. Spoiler alert, half of it does not. I find clothes I forgot I owned every single time. It is like shopping in my own closet. But also discovering that past me had terrible taste.",
        ],
        context: 'swap out は「入れ替える」。wardrobe は「衣類」。hassle は「面倒」。spoiler alert は「ネタバレ注意」だが日常会話で「お察しの通り」の意味で使う。terrible taste は「ひどいセンス」。衣替えは四季のある国の宿命。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 59, japanese: '季節の変わり目は体調崩しやすい',
        english: [
            'I always get sick between seasons.',
            'The change of seasons always gets me.',
            'Every time the season changes, I get a cold. Like clockwork.',
            "Without fail, every time the weather shifts between seasons, I get sick. It is like my immune system just gives up. The temperature goes from hot to cold in one day and my body cannot handle it. I always end up with a cold or a sore throat right when the seasons change. My doctor says to dress in layers but I am not good at that. I am either too hot or too cold.",
        ],
        context: 'like clockwork は「時計のように正確に」。immune system は「免疫システム」。gives up は「降参する」。dress in layers は「重ね着する」。季節の変わり目に体調を崩すのは日本人の定番だが英語圏でも共通。',
        character: 'kenji', category: 'social', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 60: 1ヶ月の振り返り (Monthly Reflection)
    // Scene: 居酒屋でMonth 2の振り返り。成長を実感して次の月へ。
    // ────────────────────────────────────────────────────

    {
        daySlot: 60, japanese: 'もう1ヶ月経ったんだ',
        english: [
            'It has been a month already.',
            'I cannot believe a whole month has passed.',
            'Has it really been a month? It feels like we just started.',
            "Wait, it has already been a month? That went by so fast. I feel like we were just talking about morning routines and commuting and here we are at the end of month two. Time really does fly when you are having fun. Or maybe I am just getting old. Either way, it has been a good month.",
        ],
        context: 'went by so fast は「あっという間に過ぎた」。time flies は「時が経つのは早い」の定番表現。either way は「いずれにせよ」。振り返りの第一声として最適。',
        character: 'yuki', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 60, japanese: '前より聞き取れるようになった',
        english: [
            'My listening got better.',
            'I can understand more than before.',
            'I feel like my listening comprehension has really improved this month.',
            "I noticed something the other day. I was watching a show in English and I understood like seventy percent without subtitles. A month ago that number was probably forty. I am not fluent or anything but the improvement is real. I can actually follow conversations now without getting lost every five seconds. That feels really good.",
        ],
        context: 'listening comprehension は「聴解力」。fluent は「流暢な」。follow conversations は「会話についていく」。getting lost は「迷子になる」。上達を実感する瞬間は学習モチベーションの最高の燃料。',
        character: 'mina', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 60, japanese: 'まだまだだけど、確実に成長してる',
        english: [
            'I am getting better.',
            'I still have a long way to go but I am improving.',
            'I know I am not there yet but I can see the progress and that keeps me going.',
            "Am I where I want to be? No. Not even close. But am I better than I was thirty days ago? Absolutely. And that is all that matters. Progress is not always obvious. Sometimes you do not notice it until you look back and realize, oh wow, I could not do that before. That is the thing about learning. It happens slowly and then all at once.",
        ],
        context: 'a long way to go は「まだまだ先は長い」。not there yet は「まだ到達していない」。keeps me going は「続けるモチベーションになる」。slowly and then all at once は「ゆっくり、そして突然」の名表現。',
        character: 'takeshi', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 60, japanese: 'このフレーズが一番使えた',
        english: [
            'This phrase was the most useful.',
            'This one came in handy the most.',
            'Out of everything I learned, this phrase saved me the most in real life.',
            "You know which phrase saved me the most this month? Could I get... I used it at restaurants, at the bank, at the post office, everywhere. One simple pattern and it works in like a hundred situations. That is what I love about chunk learning. You do not need to build sentences from scratch. You just grab a pre-made chunk and plug it in.",
        ],
        context: 'came in handy は「役に立った」。saved me は「助けてくれた」。chunk learning は「チャンク学習」。plug it in は「はめ込む」。from scratch は「ゼロから」。チャンク学習の威力を実感する瞬間。',
        character: 'lisa', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 60, japanese: '英語で考える瞬間が増えた',
        english: [
            'I think in English sometimes now.',
            'I catch myself thinking in English more often.',
            'Sometimes I think in English without realizing it. That never happened before.',
            "This is going to sound weird but the other day I was at the store and I thought to myself, I should grab some milk. In English. Without translating from Japanese first. It just came out naturally. I almost stopped in the aisle because I was so surprised. That has never happened to me before. It was only one sentence but it felt like a breakthrough.",
        ],
        context: 'catch myself は「気づいたら〜している」。without realizing は「気づかずに」。breakthrough は「突破口」。came out naturally は「自然に出てきた」。英語で考え始める瞬間は語学学習の重要なマイルストーン。',
        character: 'yuki', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 60, japanese: '続けることが一番大事',
        english: [
            'Consistency is key.',
            'The most important thing is to keep going.',
            'It does not matter how fast you learn. What matters is that you do not stop.',
            "I have started and quit so many things in my life. Diets, exercise routines, hobbies. But this is the first time I have stuck with something for two months straight. And I think the secret is that it does not feel like homework. It feels like hanging out and learning at the same time. If something feels fun, you keep doing it. That is the whole trick.",
        ],
        context: 'consistency is key は「継続が鍵」。stuck with は「続けた」。straight は「連続で」。feels like homework は「宿題みたい」。the whole trick は「コツの全て」。楽しいから続く、続くから上達する。',
        character: 'kenji', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 60, japanese: '失敗しても全然OK',
        english: [
            'Mistakes are fine.',
            'It is okay to make mistakes.',
            'I made so many mistakes this month but every single one taught me something.',
            "I used to be terrified of making mistakes in English. I would freeze up and say nothing because I was afraid of sounding dumb. But you know what? Nobody cares. Seriously. People appreciate the effort. Every mistake I made this month taught me something I will never forget. The embarrassing ones are the best teachers. You only learn by getting it wrong first.",
        ],
        context: 'freeze up は「固まる」。sounding dumb は「バカに聞こえる」。appreciate the effort は「努力を評価する」。the embarrassing ones は「恥ずかしい経験」。getting it wrong は「間違える」。失敗を恐れないマインドセット。',
        character: 'takeshi', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 60, japanese: '来月も頑張ろう',
        english: [
            'Let us keep going next month.',
            'Bring on month three.',
            'I am ready for the next chapter. Let us keep this momentum going.',
            "All right, month two is in the books. We covered everything from morning routines to money problems to pet stories. Month three is going to be even better. I can feel it. We are building something here, one day at a time, one expression at a time. Do not look at how far you have to go. Look at how far you have already come. That is what matters.",
        ],
        context: 'in the books は「完了した・記録に残った」。momentum は「勢い」。one day at a time は「一日ずつ」。how far you have come は「どこまで来たか」。ゴンドーの締めの名言。',
        character: 'master', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 60, japanese: 'みんながいるから続けられる',
        english: [
            'I can keep going because of everyone.',
            'Having this group makes all the difference.',
            'I honestly do not think I could have done this alone. Having you all here means a lot.',
            "I just want to say something real quick. I know this is just a bar and we are just drinking and talking. But this group has kept me going on days when I wanted to give up. Learning alone is hard. Learning with people who are on the same journey? That is completely different. So thanks. For showing up every day. For laughing at my terrible English. For not giving up on me.",
        ],
        context: 'means a lot は「とても意味がある」。kept me going は「続ける力をくれた」。showing up は「来ること・参加すること」。giving up on は「〜を見捨てる」。仲間への感謝で締めくくる。',
        character: 'mina', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 60, japanese: 'ここが俺たちの居場所だよ',
        english: [
            'This is where we belong.',
            'This place is our home base.',
            'This bar, this group. This is our place. I would not have it any other way.',
            "You know what makes this place special? It is not the food. Sorry, but it is not. It is the people. Every night, we sit here, we talk, we laugh, we learn. Some days are good, some days are rough, but we always come back. That is what matters. The world outside is busy and loud and complicated. But in here? In here it is simple. We are just friends trying to be a little better than yesterday. And that is enough.",
        ],
        context: 'where we belong は「俺たちの居場所」。home base は「拠点」。I would not have it any other way は「他のやり方は考えられない」。a little better than yesterday は「昨日より少しだけ良く」。ゴンドーの愛に満ちた締めくくり。',
        character: 'master', category: 'feeling', month: '2026-05',
    },

];

// ============================================================
// WEEK 8 DAY THEMES
// ============================================================

export const MONTH2_W8_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    52: {
        title: '料理する', titleEn: 'Cooking', category: 'social',
        scene: 'リサが最近ハマっている自炊トーク。ゴンドーの昭和メシ自慢が炸裂。',
        keywords: [
            { en: 'from scratch', ja: 'ゼロから・手作り', pron: 'フロムスクラッチ', example: 'I made pasta from scratch.', note: 'scratch=引っかき傷→何もない状態。from scratch=最初から全部手作り。料理以外にも使える万能表現。' },
            { en: 'recipe', ja: 'レシピ', pron: 'レシピー', example: 'I followed the recipe exactly.', note: '発音は「レシピー」で日本語の「レシピ」と微妙に違う。follow a recipe=レシピ通りに作る。' },
            { en: 'seasoning', ja: '調味料', pron: 'シーズニング', example: 'It needs more seasoning.', note: 'season は「味付けする」の動詞にもなる。well-seasoned=味付けがいい。spice は香辛料。' },
            { en: 'portion', ja: '1人前・分量', pron: 'ポーション', example: 'I always make too many portions.', note: 'portion control=量の管理。generous portion=たっぷりの量。serve は「盛り付ける」。' },
            { en: 'leftovers', ja: '残り物', pron: 'レフトオーバーズ', example: 'I will have the leftovers for lunch.', note: 'left(残った)+over(余った)。leftover curry=残りカレー。日本語の「残り物には福がある」的感覚。' },
        ],
    },
    53: {
        title: '掃除・洗濯', titleEn: 'Cleaning & Laundry', category: 'social',
        scene: '週末の大掃除トーク。洗濯の失敗談で盛り上がる。',
        keywords: [
            { en: 'laundry', ja: '洗濯・洗濯物', pron: 'ランドリー', example: 'I need to do laundry.', note: 'do laundry=洗濯する。laundry basket=洗濯かご。laundromat=コインランドリー。' },
            { en: 'shrink', ja: '縮む', pron: 'シュリンク', example: 'My sweater shrank in the dryer.', note: 'shrink-shrank-shrunk。dryer の高温が大敵。pre-shrunk=縮み加工済み。' },
            { en: 'declutter', ja: '断捨離する', pron: 'ディクラター', example: 'I need to declutter my closet.', note: 'clutter=散らかり。de(除去)+clutter=散らかりを除く。Marie Kondo のおかげで世界に浸透。' },
            { en: 'mold', ja: 'カビ', pron: 'モールド', example: 'There is mold in the bathroom.', note: '発音は「モールド」。moldy=カビ臭い。mold vs mould=アメリカ vs イギリス綴り。' },
            { en: 'chore', ja: '家事・雑用', pron: 'チョア', example: 'Cleaning is my least favorite chore.', note: 'household chores=家事全般。do chores=家事をする。日本語の「家事」より面倒くさいニュアンス。' },
        ],
    },
    54: {
        title: '買い物リスト', titleEn: 'Grocery Shopping', category: 'shopping',
        scene: 'スーパーでの買い物トーク。リスト作る派vs直感派の対決。',
        keywords: [
            { en: 'expired', ja: '期限切れ', pron: 'エクスパイアード', example: 'Check if it is expired.', note: 'expiration date=賞味期限。best before=おいしく食べられる期限。use by=消費期限。' },
            { en: 'aisle', ja: '通路', pron: 'アイル', example: 'It is in aisle three.', note: '発音注意：sは発音しない。「アイル」。スーパーの通路番号で商品の場所を案内する。' },
            { en: 'organic', ja: '有機の', pron: 'オーガニック', example: 'Is organic really worth it?', note: 'organic produce=有機野菜。non-GMO=遺伝子組み換えでない。label=表示ラベル。' },
            { en: 'bulk', ja: '大量・まとめ買い', pron: 'バルク', example: 'I buy in bulk to save money.', note: 'buy in bulk=まとめ買い。bulk discount=大量割引。Costco はbulk buyingの聖地。' },
            { en: 'checkout', ja: 'レジ・会計', pron: 'チェックアウト', example: 'The checkout line is so long.', note: 'self-checkout=セルフレジ。checkout counter=レジカウンター。check out=会計する。' },
        ],
    },
    55: {
        title: '子育ての話', titleEn: 'Parenting', category: 'social',
        scene: 'ケンジとリサが子育てトーク。独身組は驚きと尊敬のまなざし。',
        keywords: [
            { en: 'parenting', ja: '子育て', pron: 'ペアレンティング', example: 'Parenting is the hardest job.', note: 'parent が動詞になる。helicopter parenting=過干渉。co-parenting=共同子育て。' },
            { en: 'tantrum', ja: 'かんしゃく', pron: 'タントラム', example: 'She had a tantrum in the store.', note: 'throw/have a tantrum=かんしゃくを起こす。meltdown も同義。toddler の定番行動。' },
            { en: 'daycare', ja: '保育園', pron: 'デイケア', example: 'The daycare drop-off is hectic.', note: 'daycare=保育園。preschool=幼稚園（アメリカ）。nursery=保育園（イギリス）。kindergarten=幼稚園年長。' },
            { en: 'diaper', ja: 'おむつ', pron: 'ダイパー', example: 'I need to change the diaper.', note: 'アメリカ英語。イギリスでは nappy。change a diaper=おむつを替える。disposable=使い捨て。' },
            { en: 'milestone', ja: '成長の節目', pron: 'マイルストーン', example: 'Her first words were a big milestone.', note: 'mile+stone=道標。子供の成長過程の「初めて」を祝う文化が英語圏は強い。' },
        ],
    },
    56: {
        title: '年齢の話', titleEn: 'Age & Getting Older', category: 'feeling',
        scene: 'ゴンドーの誕生日が近い。年齢トークで全員が自分の歳を嘆く。',
        keywords: [
            { en: 'reunion', ja: '同窓会・再会', pron: 'リユニオン', example: 'I went to my high school reunion.', note: 're(再び)+union(結合)=再会。family reunion=親戚の集まり。class reunion=同窓会。' },
            { en: 'distinguished', ja: '品格のある', pron: 'ディスティングイッシュト', example: 'Gray hair looks distinguished.', note: 'distinguish=区別する→distinguished=際立った・品格のある。褒め言葉として使う。' },
            { en: 'cholesterol', ja: 'コレステロール', pron: 'コレステロール', example: 'My cholesterol is too high.', note: '発音は英語と日本語でほぼ同じ。high/low cholesterol。健康診断の定番項目。' },
            { en: 'mindset', ja: '考え方・心構え', pron: 'マインドセット', example: 'It is all about your mindset.', note: 'growth mindset=成長思考。fixed mindset=固定思考。attitude に近いがより深い思考パターン。' },
            { en: 'nostalgia', ja: '懐かしさ', pron: 'ノスタルジア', example: 'Looking at old photos fills me with nostalgia.', note: 'nostalgic(形容詞)=懐かしい。feel nostalgic=懐かしく感じる。bitter-sweet な感情。' },
        ],
    },
    57: {
        title: 'お金の話', titleEn: 'Money Talk', category: 'social',
        scene: '給料日後の居酒屋。節約と散財の永遠のテーマ。',
        keywords: [
            { en: 'broke', ja: '金欠', pron: 'ブロウク', example: 'I am completely broke.', note: 'break の過去分詞形が形容詞化。flat broke=完全に金欠。go broke=破産する。' },
            { en: 'budget', ja: '予算', pron: 'バジェット', example: 'I need to stick to my budget.', note: 'stick to a budget=予算を守る。on a budget=予算が限られている。budget-friendly=お手頃な。' },
            { en: 'impulse', ja: '衝動', pron: 'インパルス', example: 'It was an impulse buy.', note: 'impulse buying=衝動買い。on impulse=衝動的に。impulse control=衝動制御。' },
            { en: 'invest', ja: '投資する', pron: 'インヴェスト', example: 'Should I start investing?', note: 'investment=投資(名詞)。investor=投資家。invest in yourself=自己投資する。' },
            { en: 'subscription', ja: 'サブスク・定期購読', pron: 'サブスクリプション', example: 'I have too many subscriptions.', note: 'subscribe=登録する。monthly subscription=月額課金。cancel a subscription=解約する。' },
        ],
    },
    58: {
        title: 'SNS・ネットの話', titleEn: 'Social Media', category: 'social',
        scene: 'ミナがSNS疲れを告白。世代間のSNS感覚の違いで議論白熱。',
        keywords: [
            { en: 'viral', ja: 'バズる', pron: 'ヴァイラル', example: 'That video went viral.', note: 'virus(ウイルス)→viral(ウイルスのように広まる)。go viral=バズる。viral content=バズコンテンツ。' },
            { en: 'algorithm', ja: 'アルゴリズム', pron: 'アルゴリズム', example: 'The algorithm knows everything.', note: '推薦アルゴリズムが何を見せるか決める。beat the algorithm=アルゴリズムに勝つ。' },
            { en: 'scroll', ja: 'スクロールする', pron: 'スクロール', example: 'I kept scrolling for hours.', note: 'doom scrolling=延々とネガティブなニュースをスクロールすること。infinite scroll=無限スクロール。' },
            { en: 'curated', ja: '意図的に選ばれた', pron: 'キュレーテッド', example: 'Social media is all curated.', note: 'curator=学芸員→curate=意図的に選ぶ。curated feed=意図的に作られたタイムライン。' },
            { en: 'detox', ja: 'デトックス', pron: 'ディトックス', example: 'I need a digital detox.', note: 'de(除去)+tox(毒)=毒出し。digital detox=デジタルから離れること。social media detox も一般的。' },
        ],
    },
    59: {
        title: '季節の話', titleEn: 'Seasons & Holidays', category: 'social',
        scene: '梅雨入りの話題から、好きな季節トーク。思い出の季節イベント。',
        keywords: [
            { en: 'humid', ja: '蒸し暑い', pron: 'ヒューミッド', example: 'It is so humid today.', note: 'humidity=湿度。humid は「暑い+じめじめ」。hot and humid=蒸し暑い。日本の夏の定番表現。' },
            { en: 'hay fever', ja: '花粉症', pron: 'ヘイフィーバー', example: 'My hay fever is terrible.', note: 'hay=干し草+fever=熱。allergies でもOK。pollen=花粉。antihistamine=抗ヒスタミン薬。' },
            { en: 'fireworks', ja: '花火', pron: 'ファイアワークス', example: 'The fireworks were amazing.', note: '常に複数形。fireworks display=花火大会。set off fireworks=花火を上げる。sparkler=手持ち花火。' },
            { en: 'blossom', ja: '花・開花する', pron: 'ブラッサム', example: 'The cherry blossoms are beautiful.', note: 'cherry blossom=桜。blossom は名詞でも動詞でも使える。in full bloom=満開。' },
            { en: 'layer', ja: '重ね着・層', pron: 'レイヤー', example: 'Dress in layers this time of year.', note: 'dress in layers=重ね着する。layered look=レイヤードスタイル。peel off a layer=1枚脱ぐ。' },
        ],
    },
    60: {
        title: '1ヶ月の振り返り', titleEn: 'Monthly Reflection', category: 'feeling',
        scene: '居酒屋でMonth 2の振り返り。成長を実感して次の月へ。',
        keywords: [
            { en: 'progress', ja: '進歩・進捗', pron: 'プログレス', example: 'I can see real progress.', note: 'make progress=進歩する。work in progress (WIP)=進行中。progress は不可算名詞。' },
            { en: 'consistency', ja: '一貫性・継続', pron: 'コンシステンシー', example: 'Consistency is key.', note: 'consistent=一貫した。consistency beats intensity=継続は激しさに勝る。学習の最重要原則。' },
            { en: 'breakthrough', ja: '突破口', pron: 'ブレイクスルー', example: 'That felt like a real breakthrough.', note: 'break+through=壊して通る→突破。have a breakthrough=壁を超える瞬間。学習の転換点。' },
            { en: 'momentum', ja: '勢い', pron: 'モメンタム', example: 'Let us keep this momentum going.', note: '物理学の「運動量」から。gain/lose momentum=勢いを得る/失う。build momentum=勢いをつける。' },
            { en: 'fluent', ja: '流暢な', pron: 'フルーエント', example: 'I am not fluent yet but I am getting there.', note: 'fluency=流暢さ。getting there=そこに向かっている。fluent は最終目標だが完璧を意味しない。' },
        ],
    },
};
