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
            "That's awesome! Homemade stuff always hits different, even if it takes forever.",
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
            "Ugh, that's the worst. Maybe your oven runs hot? I'd try lowering the temp next time.",
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
            "Mmm, that's pretty good actually. Maybe a tiny bit more salt but honestly it's almost there.",
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
            "Oh no, again? You gotta keep stirring it. Don't walk away from the stove!",
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
            "Wow, that's a solid glow-up. Thirty years of practice and now you're basically a chef, huh?",
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
            "Classic. You could try Worcestershire sauce as a sub, or just skip it and add extra salt.",
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
            "I've been wanting to try that! Do your meals still taste good by Friday though?",
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
            "You're right, I've been putting it off. My knife can barely cut a tomato at this point.",
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
            "Ha, same here. I pause like every ten seconds. Send me the channel link though!",
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
            "Seriously, the dishes pile up so fast. Just clean as you go, it makes a huge difference.",
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
            "Dude, two weeks? Just throw a load in tonight. It takes like five minutes to start.",
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
            "Oh no, the red sock trick. Try soaking them in OxiClean overnight, that usually works.",
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
            "I feel you. Try setting a timer for just fifteen minutes. You'd be surprised how much you can get done.",
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
            "Good luck with that! If you need help getting rid of stuff, I'll take whatever you don't want.",
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
            "Ouch, that hurts. Wool and dryers don't mix. Always check the label before tossing stuff in.",
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
            "Agreed, it's brutal. But those fizzy toilet cleaning tablets help a ton. You just drop one in and walk away.",
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
            "Yeah, I learned that the hard way. My bathroom ceiling got so moldy I had to repaint the whole thing.",
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
            "Me too! Start with one drawer though. If you try to do everything at once you'll burn out.",
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
            "Ha, mine does the exact same thing. Pick up all the cables before you run it, trust me.",
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
            "So true. The hardest part is starting, but once you get going it's actually kinda satisfying.",
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
            "Nah, let's just wing it. We always figure it out once we're there.",
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
            "Ew, put it back. I can't believe they still have that on the shelf. Let's grab one from the back.",
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
            "Again? Just leave one in your car permanently. Problem solved.",
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
            "It's not a deal if you didn't need it in the first place. Put two of those back.",
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
            "Let's just use the self-checkout. It's way faster than waiting in this mess.",
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
            "Fine by me. Their chicken karaage bento is actually really good. Let's grab that.",
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
            "That's smart if you've got the space. I tried that once and my apartment turned into a warehouse.",
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
            "Honestly, I can't tell the difference either. I just buy regular and wash everything really well.",
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
            "Oh, yeah I do! Almost forgot. Thanks for reminding me, I always forget to scan it.",
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
            "Every. Single. Time. The trick is to not go when you're hungry. That's when it all falls apart.",
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
            "Ha, they all do that. Suddenly deaf until you mention ice cream, then supersonic hearing kicks in.",
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
            "The 'one more story' loop is real. You gotta set a hard limit or it never ends.",
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
            "Aw, that's sweet. Those moments hit you out of nowhere. Did you get any video?",
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
            "Don't take it personally. Every kid goes through it. He'll come around eventually.",
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
            "I can't even imagine. I take my quiet weekends for granted. You deserve a day off, seriously.",
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
            "Right? One day they're on your lap, next day they don't even wanna be seen with you.",
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
            "For real. Times have changed. My dad didn't even know where the kitchen was.",
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
            "Kids are brutally honest like that. They see right through you. That's a wake-up call for sure.",
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
            "That sounds exhausting. Can your partner take some of the morning shifts at least?",
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
            "That's beautiful, man. You can tell how much you love being a dad. Your kids are lucky.",
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
            "Oh man, same. I threw my back out picking up a sock last week. We're falling apart.",
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
            "Tell me about it. My nephew taught me how to use AirDrop. He's eight. I felt so old.",
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
            "You're living proof of that. You've got more energy than half the people here.",
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
            "Yikes, that's a wake-up call. At least now you know what to work on, right?",
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
            "Honestly, the eating-anything-without-gaining-weight part is what I miss most too.",
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
            "That's wild. Reunions always mess with your head. Did you reconnect with anyone?",
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
            "Thanks, that actually makes me feel better about it. I was thinking about dyeing it but maybe I won't.",
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
            "Three flights? That's nothing! You really need to start walking more, dude.",
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
            "I get that. At some point it stops being a party and starts being a reminder. But hey, quiet dinners are underrated.",
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
            "Going to bed at nine thirty guilt-free sounds like the dream, honestly. I want that energy.",
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
            "Been there. Check your card statement, it's probably a bunch of small stuff that added up.",
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
            "A little. I set up auto-transfer so it goes to savings before I can spend it. Try that.",
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
            "I'm saving half and blowing the other half on a trip. Life's too short to save all of it.",
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
            "Do it right now while you're thinking about it. I'll wait. Seriously, open your phone.",
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
            "Works for me. I'll PayPay you my share right now. Easier than dealing with cash.",
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
            "Start with NISA, it's low-risk and tax-free. Don't jump into crypto, that's gambling.",
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
            "Delete the shopping apps from your phone. If you have to open a browser and type it in, you'll think twice.",
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
            "You sure? All right, thanks man. I'll get the next one then. Cheers!",
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
            "Don't look at those calculators, they're designed to scare you. Just start small and stay consistent.",
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
            "That's real talk right there. I needed to hear that tonight. Cheers to that, Gondo-san.",
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
            "You should totally take a break. I deleted Instagram for a month and honestly didn't miss it at all.",
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
            "Guilty as charged. But hey, sometimes I just wanna remember the moment. Nothing wrong with a quick pic.",
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
            "Just keep posting, man. Most viral stuff blows up randomly. You never know which one will hit.",
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
            "Right? I always check at least two or three sources now. You can't just believe the first thing you see.",
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
            "Pro tip: sort by three stars. Those are the honest ones. Five-star reviews are almost always fake.",
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
            "Ugh, I hate that. Don't overthink it though. They're probably just busy. Or bad at texting.",
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
            "Set a screen time limit on the app. It won't stop you completely but at least it's a reality check.",
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
            "So true. My Wi-Fi died last weekend and I literally didn't know what to do with myself. It's scary.",
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
            "I'd love to try that but I know I'd cave in like two hours. Let me know how it goes!",
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
            "That's deep, Gondo-san. I'm putting my phone away right now. Well, after I finish this drink.",
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
            "I know, right? Time to dig out the umbrella. At least it's not as humid as August yet.",
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
            "Fall for me too. Hoodie weather is the best. Plus pumpkin spice everything, can't beat it.",
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
            "Have you tried that nose spray? The prescription one. It was a game-changer for me last spring.",
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
            "Me too! The fireworks and street food are the best combo. Let's all go together this year.",
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
            "No big plans yet. Wanna do a Christmas party at the bar? We could do a gift exchange or something.",
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
            "I'm so down! Let's leave early though, last time I went it was packed by noon.",
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
            "Totally. I blink and it's already January third. The mochi and napping plan sounds perfect though.",
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
            "We definitely take it for granted. Each season having its own food is honestly one of the best parts.",
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
            "Just keep a capsule wardrobe. Fewer clothes, less hassle. You don't need half that stuff anyway.",
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
            "Same here, every single time. Stock up on vitamin C and get more sleep. That's what works for me.",
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
            "Crazy, right? Feels like we just started but we've actually covered so much. Time flies.",
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
            "That's huge progress! Seventy percent without subs? You should be proud of that.",
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
            "That's the right mindset. Don't compare yourself to others, just compare to where you were last month.",
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
            "Oh yeah, 'Could I get...' is a lifesaver. I use it everywhere now. Simple but so useful.",
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
            "That's a legit breakthrough! Once you start thinking in English, everything speeds up. Keep it going.",
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
            "Two months straight, that's no joke. The fact that it's fun is exactly why it works.",
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
            "Exactly. The embarrassing mistakes are the ones you never forget. That's how you learn fastest.",
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
            "Let's go! Month three, bring it on. I'm actually excited to see what's next.",
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
            "Aw, stop, you're gonna make me cry. We all feel the same way. This group is everything.",
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
            "Cheers to that. Same time tomorrow, everyone? I wouldn't miss it for the world.",
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
