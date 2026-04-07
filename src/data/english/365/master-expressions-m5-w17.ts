/**
 * 365 English Master -- Month 5 Week 17: 食と暮らしの英語 (Food and Lifestyle)
 * Days 121-127: 70 expressions
 * Month: August 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 5 (2026-08) -- WEEK 17
// ============================================================

export const MONTH5_W17_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 121: レストランで (At a Restaurant)
    // Scene: 居酒屋の常連たちが新しくできたイタリアンに行く。英語メニューしかない
    // ────────────────────────────────────────────────────

    {
        daySlot: 121, japanese: 'ここ何がおいしいですか？',
        english: [
            'What is good here?',
            'What do you recommend here? We have never been before.',
            'Excuse me, this is our first time here. What would you recommend for first-timers?',
            "So we have never been here before and honestly the menu looks incredible but there is way too much to choose from. What do people usually get? Like, is there a signature dish or something that keeps people coming back? We are totally open to suggestions because we have no idea what we are doing.",
        ],
        context: '日本語では「おすすめは？」が万能だけど、英語ではWhat is good here?が最もカジュアル。recommendはフォーマル寄り。ネイティブはWhat should I get?もよく使う。「何がいい？」くらいの軽さ。',
        character: 'yuki', category: 'order', month: '2026-08',
    },
    {
        daySlot: 121, japanese: '予約してあります、権藤です',
        english: [
            'I have a reservation. Gondo.',
            'Hi, I have a reservation under Gondo.',
            'Good evening. We have a reservation for six under the name Gondo.',
            "Hi there, we have a reservation. It should be under Gondo. G-O-N-D-O. I booked it a couple of days ago for six people. Actually, we might be a little early but I figured we would grab a seat and wait for the rest of the group. Is that okay? We can order drinks in the meantime.",
        ],
        context: 'under the name は「〜の名前で」。日本語では「権藤で予約してます」で通じるけど、英語ではunder the nameを入れないと「権藤さんがいる？」と勘違いされることもある。スペルアウトするのも海外では必須スキル。',
        character: 'master', category: 'order', month: '2026-08',
    },
    {
        daySlot: 121, japanese: 'もう少し時間もらえますか？',
        english: [
            'Can we have a few more minutes?',
            'We are not quite ready yet. Can we have a few more minutes?',
            'Sorry, we are still deciding. Could you give us a few more minutes please?',
            "Sorry, we are not ready yet. There are just so many options and we literally cannot decide. Could you give us like five more minutes? Actually, maybe ten. We are that group that takes forever to order. I apologize in advance. I promise we will be worth the wait. Well, tip-wise at least.",
        ],
        context: 'Can we have a few more minutes? は注文を急かされた時の定番。日本語では「もうちょっと待ってください」だけど、英語では a few more minutes と具体的な時間の感覚を入れるのが自然。',
        character: 'mina', category: 'order', month: '2026-08',
    },
    {
        daySlot: 121, japanese: 'これ2つシェアしていい？',
        english: [
            'Can we share this?',
            'Is it okay if we share a couple of dishes?',
            'We were thinking of sharing a few plates. Is that okay, or are the portions more individual-sized?',
            "So, we like to order a bunch of stuff and share everything. Is that cool here? I know some restaurants are not really set up for that. Like, are the portions big enough to split? Because if they are small plates then we probably need to order more. We do this thing where everyone picks one dish and we all try everything. Is that going to be a problem?",
        ],
        context: 'share は「分ける」。日本語の「シェアする」はそのまま通じるけど、英語では split もよく使う。split the check=割り勘。share a plate=一皿を分ける。家族や友達で食べる時はfamily-styleという言い方もある。',
        character: 'takeshi', category: 'order', month: '2026-08',
    },
    {
        daySlot: 121, japanese: 'アレルギーがあるんですけど',
        english: [
            'I have a food allergy.',
            'Just a heads up, I have a nut allergy.',
            'Before we order, I should mention I have a pretty serious nut allergy. Could you check if any of these contain nuts?',
            "So I hate being that person but I have a nut allergy and it is actually pretty severe. Like, not just oh I feel a little funny, more like I could end up in the hospital severe. Could you double-check with the kitchen for me? I know it is annoying but I have had some bad experiences and I would rather ask a hundred times than risk it. Better safe than sorry, right?",
        ],
        context: '英語ではアレルギーの申告は命に関わるので超重要。heads up は「事前に言っておくね」。日本語の「アレルギー」と英語の allergy は発音が全然違う。アラジーが近い。allergyの発音ミスは海外旅行での事故の原因になる。',
        character: 'lisa', category: 'order', month: '2026-08',
    },
    {
        daySlot: 121, japanese: 'お水もらえますか？',
        english: [
            'Can I get some water?',
            'Could we get some water for the table, please?',
            'Excuse me, could we get a pitcher of water for the table? Still water is fine.',
            "Excuse me, could we get some water when you have a chance? Still is fine, we do not need sparkling. Oh, and actually, could we get a couple of extra glasses too? We have more people coming. No rush though, whenever is convenient. Thanks so much. Oh wait, do you have lemon? I am that person who always asks for lemon. Sorry.",
        ],
        context: '海外では水が有料の場合がある。still water=普通の水、sparkling water=炭酸水。tap water=水道水。日本みたいに座ったら自動的に水が出てくる文化は実は珍しい。',
        character: 'kenji', category: 'order', month: '2026-08',
    },
    {
        daySlot: 121, japanese: 'これ抜きでお願いします',
        english: [
            'Without this, please.',
            'Could I get this without the onions?',
            'I would like the pasta but could you hold the olives? I really cannot stand them.',
            "Okay so I want the pasta but could you leave out the olives? I know that probably messes up the whole dish but I genuinely cannot eat them. Like, it is not even a taste thing, it is a texture thing. They are just so... slimy? Is that the right word? Anyway, no olives. Everything else is fine. Actually, could you add extra cheese instead? Is that weird?",
        ],
        context: 'hold the ~ は「〜を抜いてください」のアメリカ英語。Hold the pickles. はマクドナルドの注文でも使う超定番。without も使えるけど、hold the の方がレストラン英語としてこなれている。',
        character: 'mina', category: 'order', month: '2026-08',
    },
    {
        daySlot: 121, japanese: 'おいしそう！',
        english: [
            'That looks good!',
            'Oh wow, that looks amazing!',
            'Look at that! That looks incredible. I should have ordered what you got.',
            "Oh my god, look at your plate. That looks absolutely incredible. Why did I not order that? Every single time I go to a restaurant, I order something and then I see what someone else got and I immediately regret my decision. It is like a curse. The food on other people's plates always looks better. There should be a word for that.",
        ],
        context: '日本語の「おいしそう」は食べる前専用だけど、英語の That looks good は見た目全般に使える。食べ物以外にも That looks fun, That looks cool と応用可能。looks + 形容詞 は最強の褒め構文。',
        character: 'yuki', category: 'order', month: '2026-08',
    },
    {
        daySlot: 121, japanese: 'お会計お願いします',
        english: [
            'Check, please.',
            'Could we get the check when you have a moment?',
            'Whenever you are ready, could we get the bill? No rush at all.',
            "Excuse me, could we get the check whenever you get a chance? No hurry. We are not in a rush or anything, just wanted to let you know we are wrapping up. Oh, and before I forget, could we split it three ways? Two couples and then me and Mina separate. Actually, wait, let me check with everyone first. Hold on. Does anyone want to just split it evenly? That might be easier.",
        ],
        context: 'check はアメリカ英語、bill はイギリス英語。日本語の「お会計」は「計算してください」のニュアンスだけど、英語では「紙を持ってきて」のイメージ。split the check=割り勘。go Dutch も「割り勘」だけどやや古い。',
        character: 'master', category: 'order', month: '2026-08',
    },
    {
        daySlot: 121, japanese: 'チップってどれくらい？',
        english: [
            'How much should I tip?',
            'What is the standard tip here? I never know.',
            'So what is the tipping situation here? Is fifteen percent okay or should we do more?',
            "Okay, so I am always confused about tipping. Is it fifteen percent? Twenty? I have heard it depends on the restaurant. And do you tip before or after tax? And what if the service was just okay, not great but not terrible? Do you still tip twenty percent? In Japan we do not tip at all so this whole system makes my brain hurt. Someone please just tell me what to do.",
        ],
        context: 'アメリカではチップは義務に近い。15-20%が標準。日本にはチップ文化がないので、海外で一番戸惑うポイント。tip jar=チップ入れ。leave a tip=チップを残す。stiff someone=チップを払わない（失礼）。',
        character: 'takeshi', category: 'order', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 122: 料理する (Cooking)
    // Scene: ユキがマスターに料理を教わる。英語でレシピを説明する練習
    // ────────────────────────────────────────────────────

    {
        daySlot: 122, japanese: '何作ってるの？',
        english: [
            'What are you making?',
            'Hey, what are you cooking? It smells amazing in here.',
            'Something smells incredible. What are you making? Can I watch?',
            "Oh my god, what is that smell? I could smell it from the hallway. It smells like garlic and butter and something else I cannot identify but it is making me so hungry. What are you making? I always love watching you cook because you make it look so easy. Like, you do not even measure anything. You just throw stuff in and it turns out perfect every time.",
        ],
        context: '「何作ってるの？」は英語だとWhat are you making?が一番自然。What are you cooking?でもいいけど、makeの方が広い。bake=オーブンで焼く、fry=揚げる/炒める、grill=直火焼き。日本語の「焼く」が英語では4種類に分かれる。',
        character: 'yuki', category: 'request', month: '2026-08',
    },
    {
        daySlot: 122, japanese: '下ごしらえが大事なんだ',
        english: [
            'Prep work is important.',
            'The key is in the prep. You cannot rush the prep work.',
            'Listen, most of cooking is just preparation. If your prep is done right, the actual cooking is easy.',
            "Here is the thing about cooking that nobody tells you. Ninety percent of it is prep work. Washing, chopping, measuring, getting everything ready before you even turn on the stove. Mise en place, the French call it. Everything in its place. If you do that right, the actual cooking part is almost automatic. But if you skip the prep? Disaster. Every single time. Trust me, I have been doing this for thirty years.",
        ],
        context: 'prep は preparation の略で料理用語として定着。mise en place はフランス語で「全部所定の位置に」。料理番組でもよく聞く。日本語の「仕込み」に近いけど、英語の prep はもっとカジュアルに使える。',
        character: 'master', category: 'request', month: '2026-08',
    },
    {
        daySlot: 122, japanese: 'これ何分くらい煮るの？',
        english: [
            'How long do I simmer this?',
            'How many minutes should I let this simmer?',
            'So I just let it simmer on low heat? For how long? I do not want to burn it.',
            "Okay, so it is simmering now. How long do I leave it? Because I am the kind of person who walks away from the stove and completely forgets about it. Like, last week I was boiling eggs and I went to check my phone and forty minutes later the pot was completely dry and the eggs were basically rocks. So should I set a timer or something? How many minutes exactly?",
        ],
        context: 'simmer=弱火でコトコト煮る、boil=沸騰させる。日本語の「煮る」は一語だけど、英語では火力と状態によって使い分けが必要。stew=煮込む、braise=蒸し煮。「煮る」の世界は英語の方が細かい。',
        character: 'mina', category: 'request', month: '2026-08',
    },
    {
        daySlot: 122, japanese: '味見してみて',
        english: [
            'Try it.',
            'Here, taste this and tell me what you think.',
            'Can you taste this for me? I feel like it needs something but I cannot figure out what.',
            "Okay, taste this. Be honest. Like, actually honest, not Japanese polite honest where you say it is delicious even if it tastes like cardboard. I need real feedback because something feels off but I cannot put my finger on it. Does it need more salt? Or maybe acid? I read somewhere that when something tastes flat you add acid. Like lemon juice or vinegar. Does it taste flat to you?",
        ],
        context: 'taste は「味見する」。try は「食べてみる」。taste this は料理中の味見、try this は完成品を食べてみて。日本語ではどちらも「食べてみて」で済むけど、英語では使い分ける。',
        character: 'takeshi', category: 'request', month: '2026-08',
    },
    {
        daySlot: 122, japanese: '火加減これでいい？',
        english: [
            'Is the heat okay?',
            'Is this the right heat? Should it be higher or lower?',
            'I am never sure about the heat. Is medium okay or should I go lower?',
            "Okay, is this the right temperature? Because I feel like it is either too hot or not hot enough. I never get the heat right. At home I basically have two settings: nuclear and off. Medium heat to me could mean anything. And every stove is different so medium on this one might be high on mine. Can you just look at it and tell me if it looks right?",
        ],
        context: '英語の火加減は low, medium-low, medium, medium-high, high の5段階。日本語の「弱火」「中火」「強火」は3段階。英語の方が細かい。turn up=火を強くする、turn down=火を弱くする。',
        character: 'yuki', category: 'request', month: '2026-08',
    },
    {
        daySlot: 122, japanese: 'いい匂い！',
        english: [
            'Smells good!',
            'That smells so good. I am already hungry.',
            'Whatever you are making in there smells absolutely incredible. My mouth is watering.',
            "Oh my god, that smell. I swear you could sell tickets to just stand in your kitchen and breathe. Seriously though, every time I walk in here and something is cooking, I lose all self-control. My brain just goes straight to hungry mode. I do not even care what it is. It could be boiled socks and if it smelled like this I would still want to eat it. What is in there?",
        ],
        context: 'smells good は料理の匂いを褒める定番。It smells amazing. の方がより感動が伝わる。my mouth is watering は「よだれが出そう」の英語版。日本語の「いい匂い」は英語では smell を使うけど、smell は「臭い」のネガティブな意味もあるので文脈注意。',
        character: 'kenji', category: 'request', month: '2026-08',
    },
    {
        daySlot: 122, japanese: '切り方ってこれでいい？',
        english: [
            'Am I cutting this right?',
            'Is this the right way to cut it? Am I doing it wrong?',
            'I have no idea if I am cutting this correctly. Should the pieces be thinner or is this fine?',
            "Okay, be honest with me. Is this the right way to cut an onion? Because every time I see a chef on TV they do it in like three seconds and it comes out perfect. Meanwhile I am here for five minutes and my pieces look like someone attacked the onion with a hammer. Am I holding the knife wrong? Is there a technique? Also, why am I crying so much? Is that normal?",
        ],
        context: 'dice=さいの目切り、chop=ざく切り、slice=薄切り、mince=みじん切り、julienne=千切り。日本語も切り方の名前は多いけど、英語の料理動詞はもっと日常会話に入り込んでくる。',
        character: 'mina', category: 'request', month: '2026-08',
    },
    {
        daySlot: 122, japanese: '焦げちゃった！',
        english: [
            'I burned it!',
            'Oh no, I think I burned it. Is it ruined?',
            'I got distracted for one second and it burned. Can we save it or is it a lost cause?',
            "No no no no no. I looked away for literally thirty seconds. Thirty seconds! How does something burn that fast? Is it completely ruined? Can we scrape off the burned part and pretend it did not happen? I read online that a little char adds flavor. That is a real thing, right? Someone please tell me I did not just destroy the entire dish. I knew I should have set a timer.",
        ],
        context: 'burn は「焦がす」。char は「表面を焦がす」で、barbecueでは良い意味でも使う。scorchは「焦げ跡をつける」。日本語の「焦げた」は一語だけど、英語は焦げ具合で使い分ける。is it a lost cause=もうダメ？',
        character: 'takeshi', category: 'request', month: '2026-08',
    },
    {
        daySlot: 122, japanese: '片付けは俺がやるよ',
        english: [
            'I will clean up.',
            'Leave the mess to me. I will handle the cleanup.',
            'You cooked, so I will take care of the dishes. It is only fair.',
            "Hey, do not even think about touching those dishes. You did all the cooking so the least I can do is clean up. That is the rule, right? The person who cooks does not clean. I actually do not mind doing dishes. It is weirdly relaxing. Just me, the sponge, some hot water, and my thoughts. It is like meditation but productive. Go sit down and relax. I have got this.",
        ],
        context: 'clean up は「片付ける」の万能表現。do the dishes=皿洗い。The person who cooks does not clean. は英語圏でよく聞くルール。日本語では「料理した人は洗い物免除」的な暗黙ルールは家庭による。',
        character: 'kenji', category: 'request', month: '2026-08',
    },
    {
        daySlot: 122, japanese: 'また作ってよ、これ最高',
        english: [
            'Make this again. It is great.',
            'This is so good. You have to make this again sometime.',
            'Seriously, this is incredible. Promise me you will make it again. I could eat this every day.',
            "Okay, I need you to promise me something. You have to make this again. Like, this exact dish. Do not change a single thing. Do not try to improve it. It is perfect exactly as it is. I am not exaggerating when I say this is one of the best things I have ever eaten. Can you write down the recipe? Actually, no, I will just come back and you can make it for me. That is easier for everyone.",
        ],
        context: '「また作って」は英語では Make this again で直訳OK。ただし promise me は「約束して」でかなり強い。You have to は「絶対〜して」。日本語の「また作ってよ」よりプレッシャーが強い言い方になるので、カジュアルに言いたいなら You should make this again の方がいい。',
        character: 'lisa', category: 'request', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 123: 味の表現 (Describing Flavors)
    // Scene: 常連たちがマスターの新メニューの感想を英語で伝える練習
    // ────────────────────────────────────────────────────

    {
        daySlot: 123, japanese: 'ちょっとしょっぱい',
        english: [
            'It is a bit salty.',
            'This is a little on the salty side for me.',
            'I do not know if it is just me, but this seems a bit salty. Maybe it needs a little more water?',
            "Hmm, okay, do not get mad but I think this might be a tiny bit salty. Like, it is not bad, it is still good, but if I had to give one note it would be the salt. But honestly, I am probably the wrong person to ask because my family barely uses salt so my threshold is really low. Everyone else might think it is perfect. Let me try another bite. Yeah, a little salty for me. But good!",
        ],
        context: 'on the salty side は「しょっぱい寄り」で、直接的にIt is too saltyと言うより柔らかい。英語圏では味の批判を「ちょっと〜寄り」と表現するのが大人のマナー。日本語でも「ちょっと濃いかな」と同じ感覚。',
        character: 'yuki', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 123, japanese: '甘すぎず辛すぎずちょうどいい',
        english: [
            'Not too sweet, not too spicy. Perfect.',
            'It is the perfect balance. Not too sweet, not too spicy.',
            'This is spot on. It has just the right amount of sweetness and heat. Really well balanced.',
            "You know what I love about this? It is perfectly balanced. It is sweet enough that you notice it but not so sweet that it takes over. And there is this gentle heat in the background that creeps up on you. It does not hit you right away, it builds gradually. And then the sweetness comes back and calms everything down. It is like a little flavor journey in your mouth. How did you get this so perfectly balanced?",
        ],
        context: 'spot on は「完璧に当たっている」。well balanced は味のバランスが取れている時の万能表現。heat は「辛さ」の意味もある。spicy heat=辛い熱さ。日本語の「辛い」は spicy(香辛料) と hot(温度) の区別がないけど英語では別物。',
        character: 'lisa', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 123, japanese: 'コクがあるね',
        english: [
            'It is rich.',
            'Wow, this has a really rich, deep flavor.',
            'There is this amazing depth of flavor. It tastes like it has been simmered for hours.',
            "This is... wow. There are so many layers of flavor going on. It is rich and deep and complex and I keep discovering new tastes with every bite. Like, first I get the umami, then there is this smokiness, and then something slightly sweet at the end. How many ingredients are in this? Because it tastes like you spent three days making it. This is the kind of flavor that only comes from patience.",
        ],
        context: '日本語の「コク」は英語にしにくい。rich は一番近いけど「濃い」のニュアンス。depth of flavor=味の深み。umami は英語圏でもそのまま使われるようになった。「コク」は rich + depth + complexity を全部合わせた概念。一語では訳せない。',
        character: 'kenji', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 123, japanese: 'さっぱりしてる',
        english: [
            'It is refreshing.',
            'This is really light and refreshing. Perfect for summer.',
            'I love how clean and refreshing this is. It does not sit heavy in your stomach at all.',
            "This is exactly what I needed. It is so light and refreshing. You know how some dishes make you feel like you need a nap afterward? This is the opposite. I feel like I could eat this and then go for a run. Not that I would, but I could. It is clean and bright and it does not weigh you down. On a hot day like this, heavy food is the last thing you want. This is just perfect.",
        ],
        context: '「さっぱり」は英語で一番苦労する日本語の一つ。refreshing=爽やか、light=軽い、clean=すっきり。全部組み合わせてやっと「さっぱり」に近づく。crisp も使える。日本語の感覚的な味の表現は英語では分解して説明が必要。',
        character: 'mina', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 123, japanese: 'これちょっとクセがあるね',
        english: [
            'This has a strong taste.',
            'This is... interesting. It has a very unique flavor.',
            'I am not going to lie, this is an acquired taste. It is not bad, just very distinctive.',
            "Okay, I am going to be diplomatic here. This is very... distinctive. It is not bad, per se. It is just that my taste buds were not prepared for whatever just happened. It has got this funk to it that I was not expecting. Is that normal? Like, is it supposed to taste like that? Because if it is, then I just need to adjust my expectations. Sometimes the best foods are the ones that surprise you. Let me try one more bite.",
        ],
        context: 'acquired taste は「慣れると好きになる味」。日本語の「クセがある」にかなり近い。distinctive=独特な。funky=クセのある（チーズなどに使う）。「まずい」と言わずに「独特だね」と表現するのは日英共通の大人スキル。',
        character: 'takeshi', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 123, japanese: '何入ってるの？この味',
        english: [
            'What is in this?',
            'What is this flavor? I cannot figure out what it is.',
            'There is something in here I cannot quite place. What did you put in this?',
            "Okay, there is a flavor in here that I cannot identify and it is driving me crazy. I keep tasting it and I know I have had it before but I cannot put my finger on it. Is it ginger? No, it is not ginger. Is it some kind of herb? Lemongrass? Wait, is it yuzu? No, that is not it either. Just tell me what it is because it is going to bother me all night if I do not figure it out.",
        ],
        context: 'I cannot place it は「何か分からない」の大人な表現。put my finger on it は「これだと特定できない」。日本語の「何入ってるの？」は好奇心だけど、英語で What did you put in this? は場合によっては疑っている響きになるので注意。',
        character: 'yuki', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 123, japanese: 'ご飯がすすむ味だね',
        english: [
            'This goes great with rice.',
            'This is the kind of dish that makes you eat way too much rice.',
            'You know a dish is good when you cannot stop eating rice with it. I am on my third bowl already.',
            "This is dangerous. Like, actually dangerous. Because the flavor is so strong and so good that I just keep shoveling rice into my mouth without thinking. Before I know it I have eaten three bowls and I am already eyeing the rice cooker for a fourth. This is the kind of dish that ruins your diet in the best possible way. My nutritionist would be horrified but I do not care. Pass me the rice.",
        ],
        context: '「ご飯がすすむ」は日本語特有の概念。英語には直訳がない。goes great with rice が一番近いけど、「止まらない」のニュアンスは入らない。I cannot stop eating は「止まらない」。日本語の食感覚表現は翻訳泣かせが多い。',
        character: 'master', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 123, japanese: '見た目もきれいだね',
        english: [
            'It looks beautiful.',
            'The presentation is gorgeous. Almost too pretty to eat.',
            'Wow, look at this plating. It is like art. I feel bad messing it up.',
            "Hold on, let me take a picture before anyone touches it. Look at this. The colors, the arrangement, the little garnish on top. This is not just food, this is art. Seriously, you could put this in a gallery. I always say you eat with your eyes first and this is proof. It almost seems wrong to stick a fork in it. Almost. I am still going to eat it though. Beauty is temporary. Flavor is forever. Well, no, that is also temporary. Whatever, let me eat.",
        ],
        context: 'presentation は「盛り付け」。plating も同じ意味で料理番組でよく使う。you eat with your eyes first は「目で食べる」という英語のことわざ。日本語の「目で楽しむ」に近い。garnish=飾り付け。',
        character: 'lisa', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 123, japanese: '口に合わないかも',
        english: [
            'It is not really for me.',
            'To be honest, this is not really my thing.',
            'I appreciate the effort but I think this one is just not my cup of tea.',
            "Okay, I do not want to be rude but I think this particular dish is just not for me. And that is totally fine. It is not that it is bad or anything. It is clearly well made. It is just that my palate is not sophisticated enough for this. I am a simple person. I like simple flavors. Give me a bowl of rice with some furikake and I am happy. This is too complex for my basic taste buds.",
        ],
        context: 'not my thing は「自分には合わない」のカジュアル版。not my cup of tea は同じ意味のイギリス英語。日本語の「口に合わない」は味の話限定だけど、英語の not my thing は何にでも使える万能断り文句。',
        character: 'kenji', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 123, japanese: 'おかわり！',
        english: [
            'Another one, please!',
            'Can I get seconds? This is too good to stop.',
            'I am definitely going back for seconds. Actually, make it thirds. I have no shame.',
            "I need more. I am not even full yet and even if I was full I would still want more. Can I get another serving? Actually, you know what, just leave the pot here. I will serve myself. I know it is embarrassing to eat this much but I stopped caring about embarrassment a long time ago. When food is this good, pride goes out the window. More please. And do not judge me.",
        ],
        context: 'seconds は「おかわり」。go back for seconds は「おかわりしに行く」。日本語の「おかわり」は一語だけど、英語は seconds, another serving, another helping, refill(飲み物) と場面で変わる。refill は飲み物専用。',
        character: 'takeshi', category: 'feeling', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 124: 食の好み (Food Preferences)
    // Scene: リサが「日本の食文化は世界一複雑」と議論を始める
    // ────────────────────────────────────────────────────

    {
        daySlot: 124, japanese: '好き嫌い多いんだよね',
        english: [
            'I am a picky eater.',
            'I will be honest, I am pretty picky when it comes to food.',
            'I know I am a picky eater. I have been this way since I was a kid and I cannot help it.',
            "I am the worst person to go out to eat with because I am incredibly picky. Like, embarrassingly picky. I do not eat seafood, I do not like mushrooms, raw tomatoes freak me out, and do not even get me started on cilantro. It tastes like soap to me. Apparently that is genetic? But the point is, I am that person who spends twenty minutes looking at a menu and then orders chicken. Every single time. Chicken.",
        ],
        context: 'picky eater は「好き嫌いが多い人」の定番表現。fussy eater も同じ意味。日本語の「好き嫌いが多い」はネガティブだけど、英語では I am a picky eater と自分で言うのは普通。食の好みにオープンな文化。',
        character: 'mina', category: 'social', month: '2026-08',
    },
    {
        daySlot: 124, japanese: '何でも食べるよ',
        english: [
            'I eat anything.',
            'I am not picky at all. I will eat pretty much anything.',
            'I have never been a picky eater. If it is edible, I am going to try it.',
            "I will literally eat anything. And I mean anything. I have tried bugs in Thailand, fermented shark in Iceland, and century eggs in China. Nothing scares me. My philosophy is that if millions of people in some country eat it and enjoy it, then there is probably something good about it. I might not love everything, but I will always try it. Life is too short to eat the same thing every day.",
        ],
        context: '「何でも食べる」は I will eat anything が自然。adventurous eater は「冒険的な食べ手」で、新しい食べ物に挑戦する人のこと。「食わず嫌い」は英語では You will never know until you try it. が近い。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 124, japanese: 'ベジタリアンなんだ',
        english: [
            'I am vegetarian.',
            'I am actually vegetarian. Is that going to be a problem?',
            'I went vegetarian about two years ago. It was hard at first but now I do not even miss meat.',
            "So I am vegetarian, which I know in Japan can be a little tricky. People always ask me why and honestly it started as a health thing but now it is more of an ethical thing. But I am not one of those preachy vegetarians who lectures people about eating meat. You do you. I just do not want it on my plate. The hardest part is traveling. In Japan, dashi is in literally everything so truly vegetarian food is surprisingly hard to find here.",
        ],
        context: 'vegetarian=肉を食べない、vegan=動物性食品を一切食べない、pescatarian=魚は食べる。日本ではvegetarian対応が遅れていて、出汁にかつお節が入っている時点でアウト。hidden ingredients=隠れ材料 の問題。',
        character: 'lisa', category: 'social', month: '2026-08',
    },
    {
        daySlot: 124, japanese: '苦手なものある？',
        english: [
            'Is there anything you do not eat?',
            'Any foods you cannot stand? Just so I know.',
            'Before I order for the table, is there anything anyone absolutely cannot eat? Allergies or things you hate?',
            "Before we order a bunch of stuff, let me ask. Is there anything anyone does not eat? And I mean both cannot eat and will not eat. Because last time I ordered a plate of natto without checking and half the table almost threw up. I felt so bad. So let us just get it all out there now. Allergies, dislikes, vegetarian, vegan, I do not care what it is, just tell me so we do not have another natto incident.",
        ],
        context: '「苦手なもの」は英語では Is there anything you do not eat? が一番自然。can not eat はアレルギー、will not eat は好き嫌い。日本語の「苦手」は両方をカバーする便利な言葉。英語はどっちか聞かないと伝わらない。',
        character: 'master', category: 'social', month: '2026-08',
    },
    {
        daySlot: 124, japanese: 'パクチーだけは無理',
        english: [
            'I cannot do cilantro.',
            'The one thing I absolutely cannot eat is cilantro.',
            'I will eat anything except cilantro. Just the smell makes me gag.',
            "I have a very short list of foods I do not eat and at the top of that list, in bold, underlined, with stars around it, is cilantro. I know some people love it but to me it tastes like soap mixed with aluminum foil. And it is not in my head. It is literally genetic. There is a gene that makes cilantro taste like soap to some people. So it is not my fault. Blame my DNA. Everything else I am fine with though.",
        ],
        context: 'cilantro はアメリカ英語、coriander はイギリス英語。パクチーが石鹸味に感じるのは OR6A2 という遺伝子の変異が原因で、科学的に証明されている。makes me gag=えずく。I cannot do ~ は「〜は無理」のカジュアル表現。',
        character: 'yuki', category: 'social', month: '2026-08',
    },
    {
        daySlot: 124, japanese: '食べ物の話で盛り上がるよね',
        english: [
            'Food always gets people talking.',
            'Nothing brings people together like talking about food.',
            'It is funny how food is the one topic everyone has an opinion on. No one is neutral about food.',
            "Is it not weird how food is the universal conversation topic? Like, you can put any group of strangers together and within five minutes someone will bring up food. What they ate, what they want to eat, what they had last week. Everyone has opinions about food. Nobody says I do not really care about food. And if they do, I do not trust them. Tell me what you eat and I will tell you who you are. That is not a real saying but it should be.",
        ],
        context: 'brings people together は「人をまとめる」。food は世界共通の話題で、初対面でも盛り上がる。conversation starter=話のきっかけ。日本語の「食べ物の話は盛り上がる」は、英語圏でも全く同じ。食の話題は文化を超える。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 124, japanese: '甘いもの別腹',
        english: [
            'I always have room for dessert.',
            'I do not care how full I am, there is always room for dessert.',
            'My stomach might be full but my dessert stomach has plenty of space. They are separate.',
            "You know what, I am stuffed. Like, genuinely cannot eat another bite of actual food. But dessert? Absolutely. Bring it on. I firmly believe that the human body has a separate compartment specifically designed for sweets. It is science. Okay, it is not science, but it should be. The real stomach says no but the dessert stomach says yes. And the dessert stomach always wins. Always. What do they have for dessert here?",
        ],
        context: '「別腹」は日本語特有の表現で、英語には直訳がない。I always have room for dessert が一番近い。separate stomach for dessert と説明すると外国人にウケる。dessert stomach は造語だけど通じる。',
        character: 'mina', category: 'social', month: '2026-08',
    },
    {
        daySlot: 124, japanese: 'これハマるやつ',
        english: [
            'This is addictive.',
            'Oh no, this is one of those things you cannot stop eating.',
            'I am warning you right now, this is incredibly addictive. Once you start, you cannot stop.',
            "Do not try this. I am serious. Do not try it. Because the moment you put it in your mouth you are going to understand why I said that. It is addictive in the truest sense of the word. I found this stuff last month and I have eaten it every single day since. My wallet is crying. My waistline is crying. But my taste buds are throwing a party. One bite. That is all it takes. One bite and you are hooked for life.",
        ],
        context: 'addictive は「中毒性がある」。hooked は「ハマった」。日本語の「ハマる」は英語では get hooked on か get into が近い。can not stop eating は「止まらない」。moreish はイギリス英語で「もっと食べたくなる」。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 124, japanese: 'それ食べたことないなあ',
        english: [
            'I have never tried that.',
            'Really? I have never had that before. What is it like?',
            'I have never tried that in my life. Is it good? What does it taste like?',
            "Wait, what is that? I have literally never seen that before. What even is it? Is it a fruit? A vegetable? Some kind of grain? It looks like something from another planet. I am not saying it looks bad, it just looks unfamiliar. What does it taste like? Is it sweet? Sour? Can you compare it to something I might know? Because I have zero frame of reference here and I am trying to decide if I want to try it.",
        ],
        context: 'I have never tried that が一番自然。What is it like? は「どんな感じ？」。What does it taste like? は「どんな味？」。frame of reference=参照点。味を説明する時は「〜に似てる」(It tastes like ~) が一番伝わる。',
        character: 'lisa', category: 'social', month: '2026-08',
    },
    {
        daySlot: 124, japanese: 'こっちの方が好み',
        english: [
            'I like this one better.',
            'I think I prefer this one actually.',
            'If I had to choose between the two, I would go with this one. It is more my style.',
            "Okay so I have tried both and honestly they are both good but if you are forcing me to pick one, I am going with this one. It is just more my speed. The other one was too heavy for me and the flavors were kind of fighting each other. This one is cleaner, simpler, and it just tastes more like what I was in the mood for. But that is totally personal preference. I would not be mad if you preferred the other one.",
        ],
        context: 'I prefer は「〜の方が好き」だけどやや硬い。I like this one better の方がカジュアル。more my style=自分好み。more my speed も同じ意味。日本語の「好み」はpreference だけど日常会話では I like ~ better で十分。',
        character: 'master', category: 'social', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 125: レシピを教える (Sharing Recipes)
    // Scene: マスターが常連に唐揚げのレシピを英語で伝授する
    // ────────────────────────────────────────────────────

    {
        daySlot: 125, japanese: 'レシピ教えてよ',
        english: [
            'Can you give me the recipe?',
            'I would love the recipe for this. Can you share it?',
            'Okay, you have to share this recipe with me. I want to try making it at home.',
            "I am begging you. Please give me this recipe. I have tried to recreate this at home like five times and it never turns out the same. What am I doing wrong? Is it a secret recipe? Because I promise I will not share it with anyone. Well, maybe my mom. But that is it. I just want to be able to eat this whenever I want without having to come here. Although, let us be honest, I would still come here anyway.",
        ],
        context: 'share a recipe は「レシピを教える」の英語版。give me the recipe より share the方が柔らかい。secret recipe=秘伝のレシピ。family recipe=家族のレシピ。日本語の「作り方教えて」は How do you make this? でもOK。',
        character: 'yuki', category: 'request', month: '2026-08',
    },
    {
        daySlot: 125, japanese: 'まず下味をつけて',
        english: [
            'First, season the meat.',
            'Start by marinating the chicken. That is the most important step.',
            'The first thing you want to do is season the meat really well and let it sit for at least thirty minutes.',
            "Alright, listen carefully because this is where most people mess up. Before you do anything else, you need to season the chicken. And I do not mean just sprinkle some salt on it. I mean really get in there. Soy sauce, ginger, garlic, a little sake. Mix it all together with your hands and make sure every piece is coated. Then put it in the fridge for at least thirty minutes. An hour is better. Overnight is best. Patience makes the flavor.",
        ],
        context: 'season は「味付けする」。marinate は「漬け込む」。seasoning=調味料。日本語の「下味をつける」は英語では marinate が一番近い。season は表面に味をつける、marinate は液体に漬ける。工程の違い。',
        character: 'master', category: 'request', month: '2026-08',
    },
    {
        daySlot: 125, japanese: '目分量でいいよ',
        english: [
            'Just eyeball it.',
            'You do not need to measure. Just eyeball it.',
            'I never measure anything. Just go by feel. A handful of this, a pinch of that.',
            "Forget the measuring cups. Throw them away. Real cooking is not about exact measurements. It is about feeling. You taste as you go and adjust. A little more salt? A splash of soy sauce? You will know. Your tongue will tell you. That is how every grandmother in the world cooks. They do not use recipes. They use instinct. Just eyeball everything and trust your gut. Well, trust your taste buds. Your gut is for digesting.",
        ],
        context: 'eyeball it は「目分量でやる」の英語版。go by feel=感覚でやる。a pinch of=ひとつまみ。a splash of=少量の液体。日本語の「適量」は英語では to taste（味を見ながら）。料理は感覚が万国共通。',
        character: 'master', category: 'request', month: '2026-08',
    },
    {
        daySlot: 125, japanese: '二度揚げするとサクサクになる',
        english: [
            'Fry it twice for extra crunch.',
            'The trick is to double-fry it. That is what makes it crispy.',
            'If you want that perfect crunch, you have to fry it twice. Once on lower heat, rest it, then fry again on high.',
            "Okay, here is the secret that most people do not know. You fry it twice. The first time at a lower temperature to cook it through. Then you take it out, let it rest for a few minutes, and then fry it again at a higher temperature. The second fry is what gives it that insane crunch that stays crispy even after it cools down. It is the difference between good karaage and incredible karaage. Double fry. Remember that. It will change your life.",
        ],
        context: 'double-fry=二度揚げ。crispy=サクサク、crunchy=カリカリ。日本語の「サクサク」は英語では crispy か crunchy だけど、正確には crispy=薄いサクサク、crunchy=厚いカリカリ。食感の擬音が英語は少ない。',
        character: 'master', category: 'request', month: '2026-08',
    },
    {
        daySlot: 125, japanese: 'コツは何？',
        english: [
            'What is the trick?',
            'What is the secret? There has to be a trick to it.',
            'Come on, there must be a secret to making it this good. What am I missing?',
            "Level with me. What is the trick? Because I have followed the recipe exactly and it does not taste the same. I used the same ingredients, the same amounts, the same timing. Everything. And it comes out fine but not this level of fine. There has to be something you are not telling me. Some little trick or technique that makes all the difference. Chefs always have one. Spill it. What is the secret?",
        ],
        context: 'trick は「コツ」。secret は「秘訣」。What is the trick? は日本語の「コツは？」に完璧に対応する。level with me=正直に教えて。spill it=白状して。料理のコツを聞く時のカジュアル英語。',
        character: 'yuki', category: 'request', month: '2026-08',
    },
    {
        daySlot: 125, japanese: '分量メモっていい？',
        english: [
            'Can I write this down?',
            'Hold on, let me write this down before I forget.',
            'Wait, slow down. Let me grab my phone and take notes. I do not want to miss anything.',
            "Wait wait wait. Slow down. You are going way too fast. I need to write this down because I have the memory of a goldfish. Hold on, let me open my notes app. Okay, ready. From the top. And this time, can you be specific? Last time you said a little bit of this and some of that and I had no idea what you meant. Actual amounts please. Well, approximate amounts. I know you said eyeball it but my eyeballs are not calibrated for cooking.",
        ],
        context: 'write this down=メモする。take notes=ノートを取る。from the top=最初から。日本語の「メモっていい？」は軽いけど、英語で Can I write this down? はレシピ以外にもビジネスや勉強で使える万能フレーズ。',
        character: 'mina', category: 'request', month: '2026-08',
    },
    {
        daySlot: 125, japanese: '失敗しても気にしないで',
        english: [
            'Do not worry if you mess up.',
            'If it does not turn out perfect the first time, do not sweat it.',
            'Do not be discouraged if your first attempt is not great. Cooking is all about trial and error.',
            "Listen, I am going to tell you something important. Your first attempt is going to be terrible. Accept that right now. It will not look like mine, it will not taste like mine, and you will probably burn something. And that is completely fine. That is how everyone starts. Cooking is not about getting it right the first time. It is about getting it wrong, figuring out what went wrong, and doing it better next time. I burned so many things when I started. So many.",
        ],
        context: 'mess up=失敗する。do not sweat it=気にするな。trial and error=試行錯誤。日本語の「失敗しても大丈夫」より英語は「最初から完璧を求めるな」のニュアンスが強い。完璧主義への警告が文化的に込められている。',
        character: 'master', category: 'request', month: '2026-08',
    },
    {
        daySlot: 125, japanese: '代わりにこれ使ってもいい？',
        english: [
            'Can I substitute this?',
            'If I do not have mirin, can I use something else instead?',
            'I probably will not be able to find all these ingredients. What can I substitute?',
            "So here is my problem. I live in a small town and the closest Asian grocery store is like an hour away. Can I use regular rice vinegar instead of mirin? What about soy sauce? Is there a difference between Japanese soy sauce and the one I get at the regular supermarket? And sake? Can I use cooking wine? I know it is not the same but will it be close enough? I feel like half of cooking is finding acceptable substitutes for things you do not have.",
        ],
        context: 'substitute は「代用する」。代わりのものは substitute か replacement。日本語の「代わりにこれ使える？」は Can I use this instead? でもOK。instead は「代わりに」の万能単語。味噌、醤油、みりんなど日本の調味料は海外では入手困難。',
        character: 'lisa', category: 'request', month: '2026-08',
    },
    {
        daySlot: 125, japanese: '何人前の量？',
        english: [
            'How many servings?',
            'Is this recipe for how many people?',
            'This recipe, how many servings does it make? I need to know if I should double it.',
            "Quick question. When you say these amounts, is that for one person? Two people? A family of five? Because I need to scale this up. When I cook at home it is usually for me and my roommate, but sometimes I have friends over and suddenly I need to feed eight people. Is it safe to just double everything? Or do some things not scale well? Like, I have heard spices do not scale linearly. Is that true? Too much complexity for my brain.",
        ],
        context: 'servings=人前。How many servings? は「何人前？」の直訳で完璧に通じる。scale up=量を増やす、scale down=量を減らす。double=2倍にする。日本語の「何人前？」は英語でもそのままの概念。',
        character: 'kenji', category: 'request', month: '2026-08',
    },
    {
        daySlot: 125, japanese: '作ったら写真送るね',
        english: [
            'I will send you a picture when I make it.',
            'When I try making it, I will send you a photo of the result.',
            'I am definitely going to try this at home this weekend. I will send you a picture so you can judge it.',
            "I am making this tomorrow. One hundred percent. And I am going to document the entire process. Every step. Every mistake. And then at the end I will send you a side-by-side comparison of yours and mine. It is going to be hilarious because mine will look like a disaster. But that is okay because the journey is more important than the destination, right? That is what people say about cooking. Or maybe that is about life. Same thing probably.",
        ],
        context: '「写真送るね」は I will send you a picture/photo で直訳OK。judge it=評価してくれ。side-by-side comparison=並べて比較。日本語の「作ったら送るね」は英語でも同じテンポで言える珍しいケース。',
        character: 'takeshi', category: 'request', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 126: 外食 vs 自炊 (Eating Out vs Cooking)
    // Scene: 自炊派のケンジと外食派のタケシが激論
    // ────────────────────────────────────────────────────

    {
        daySlot: 126, japanese: '自炊した方が安いよ',
        english: [
            'Cooking at home is cheaper.',
            'Eating out is expensive. Cooking at home saves you a lot of money.',
            'If you are trying to save money, cooking at home is a no-brainer. Eating out adds up fast.',
            "Do the math. A single meal at a decent restaurant is what, two thousand yen? Three thousand? I can buy groceries for the same amount and make like four or five meals. That is four or five days of food versus one meal. The savings are insane. And I am not talking about eating ramen every day. I mean actual proper meals with vegetables and protein. People say they do not have time to cook but they have time to sit in a restaurant for an hour?",
        ],
        context: 'no-brainer は「考えるまでもない」。adds up=積み重なる。do the math=計算してみろ。日本語の「自炊の方が安い」は英語でも同じ議論がある。ただしアメリカでは外食の方が安い場合もあり、国による。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 126, japanese: '時間がないから外食しちゃう',
        english: [
            'I eat out because I have no time.',
            'I would love to cook but I just do not have the time after work.',
            'By the time I get home from work, the last thing I want to do is cook. So I end up eating out most nights.',
            "Look, I know cooking is cheaper and healthier and all that. I get it. But when I get home at nine at night after working a twelve-hour shift, the idea of standing in the kitchen for another hour is just not happening. My brain is fried, my body is tired, and the couch is calling my name. So I order delivery or grab something on the way home. Is it ideal? No. Is it reality? Absolutely. Not everyone has the luxury of time.",
        ],
        context: 'the last thing I want to do は「一番したくないこと」。I end up ~ing は「結局〜してしまう」。日本語の「〜しちゃう」のニュアンスに近い。my brain is fried=頭がフライ状態=疲れ切っている、のスラング。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 126, japanese: 'たまには外食もいいよね',
        english: [
            'Eating out once in a while is nice.',
            'I think eating out is fine as long as you do not do it every day.',
            'Cooking every single day is exhausting. Sometimes you just need to treat yourself and eat out.',
            "I think the key is balance. I cook at home most days but every once in a while I just need someone else to make the food. And clean up. Especially clean up. That is honestly the worst part of cooking for me. Not the actual cooking but the mountain of dishes afterward. So when I eat out, it is not just about the food. It is about the experience of not having to do dishes. That alone is worth the extra money.",
        ],
        context: 'once in a while=たまに。treat yourself=自分にご褒美をあげる。every once in a while は once in a while をさらにカジュアルにした表現。日本語の「たまには」を英語にする時、once in a while が一番自然。sometimes は頻度が高すぎる。',
        character: 'yuki', category: 'social', month: '2026-08',
    },
    {
        daySlot: 126, japanese: '作り置きしてるよ',
        english: [
            'I meal prep.',
            'I do meal prep on Sundays. It saves me so much time during the week.',
            'I spend a few hours on Sunday cooking everything for the week. That way I never have to think about what to eat.',
            "Meal prep changed my life. Every Sunday I spend about three hours in the kitchen and I make all my meals for the entire week. Lunch and dinner, five days, packed in containers in the fridge. It sounds like a lot of work but it actually saves me so much time and money. And the best part is that when I come home tired, I just grab a container, heat it up, and I am eating within five minutes. No thinking, no deciding, no cooking. Just eating.",
        ],
        context: 'meal prep は「作り置き」。英語圏、特にアメリカでは大流行中のライフハック。batch cooking=まとめて料理 も同じ概念。日本語の「作り置き」は昔からあるけど、英語ではSNS時代に meal prep として再発見された。',
        character: 'lisa', category: 'social', month: '2026-08',
    },
    {
        daySlot: 126, japanese: 'コンビニ弁当飽きた',
        english: [
            'I am tired of convenience store food.',
            'I am so sick of convenience store bentos. I need real food.',
            'I have been eating convenience store food for two weeks straight and I think my body is starting to protest.',
            "I think I have hit my limit with convenience store food. Like, the first week it was fine. Onigiri here, a sandwich there, maybe a bento box when I was feeling fancy. But after two weeks of it, everything tastes the same. The rice is always a little dry, the chicken always has that same sauce, and the salads always have that weird dressing. My body is literally crying for something freshly made. A home-cooked meal sounds like heaven right now.",
        ],
        context: 'sick of は「飽きた」「うんざり」。tired of と同じ意味だけど sick of の方が強い。日本のコンビニ弁当は世界的に見るとレベルが高いけど、それでも毎日は飽きる。convenience store food は海外では「質が低い」イメージ。日本だけ例外。',
        character: 'mina', category: 'social', month: '2026-08',
    },
    {
        daySlot: 126, japanese: 'ウーバーの方が楽じゃん',
        english: [
            'Delivery is easier.',
            'Why cook when you can just get delivery? It is so much easier.',
            'I am not going to lie, food delivery apps have completely ruined my motivation to cook.',
            "Okay but hear me out. Why would I spend an hour cooking and then thirty minutes cleaning up when I can tap three buttons on my phone and food appears at my door in twenty minutes? I know it costs more but you are paying for convenience. And honestly, the delivery apps have gotten so good. You can get anything. Sushi, curry, pizza, Thai food. At two in the morning. In your pajamas. Without leaving the couch. Technology is beautiful.",
        ],
        context: 'delivery apps=出前アプリ。hear me out=最後まで聞いて。convenience=利便性。日本語の「楽」は英語では easy, convenient, effortless と場面で変わる。「楽じゃん」のカジュアルさは easier で十分。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 126, japanese: '料理できる男子はモテるよ',
        english: [
            'Guys who can cook are attractive.',
            'Trust me, being able to cook is a huge plus when you are dating.',
            'Nothing impresses people more than someone who can cook a great meal. It is an instant charm boost.',
            "I am telling you, learn to cook. Not because it is healthy or because it saves money, but because it is the most attractive skill a person can have. When someone invites you over and they actually cook for you? With real ingredients? From scratch? That is more romantic than any fancy restaurant. There is something about the effort, the vulnerability of someone saying here, I made this for you. And if it is actually good? Game over. You win at life.",
        ],
        context: 'a huge plus=大きなプラスポイント。from scratch=ゼロから手作り。日本語の「モテる」は英語に直訳できない。attractive, popular, have game, get attention などで言い換えが必要。「モテる」一語の便利さは日本語の強み。',
        character: 'mina', category: 'social', month: '2026-08',
    },
    {
        daySlot: 126, japanese: '一人暮らしだと自炊めんどくさい',
        english: [
            'Cooking for one is annoying.',
            'It is so hard to motivate yourself to cook when you live alone.',
            'The worst part about living alone is cooking. Everything comes in family-sized portions and half of it goes bad.',
            "Nobody talks about how depressing it is to cook for one person. You buy a whole cabbage because they do not sell half cabbages. You cook a pot of curry that could feed four people. And then you eat curry for four days straight until you never want to see curry again. And the worst part is eating alone. You put in all this effort and then you sit at a table by yourself eating in silence. At least at a restaurant there are other humans around. Cooking alone is lonely.",
        ],
        context: 'cooking for one=一人分の料理。family-sized=ファミリーサイズ。goes bad=腐る。日本語の「めんどくさい」は annoying, pain, hassle, tedious と英語では状況によって使い分ける。一語で全部カバーする英語はない。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 126, japanese: '男の料理って感じだね',
        english: [
            'That is such a guy dish.',
            'That is very much a man cooking kind of meal. Big and simple.',
            'I love how guys always go straight for the most intense flavors. No subtlety at all. Just maximum seasoning.',
            "That is the most masculine plate of food I have ever seen. There are no vegetables, the portions are enormous, and everything is either fried or covered in sauce. And I mean that as a compliment. When men cook, they do not mess around with delicate flavors and artistic plating. They just go full power on taste and quantity. It is chaotic but also kind of impressive in a caveman sort of way. Needs a salad on the side though. Just saying.",
        ],
        context: '「男の料理」は英語では man cooking, dude food, bro cooking などと言う。guy dish は「男っぽい料理」。英語圏でも「男の料理=大胆で雑」のステレオタイプはある。ただし最近はジェンダーの観点からこの表現はデリケート。',
        character: 'lisa', category: 'social', month: '2026-08',
    },
    {
        daySlot: 126, japanese: '結局どっちが正解なの？',
        english: [
            'So which is better?',
            'At the end of the day, which wins? Eating out or cooking?',
            'We have been going back and forth forever. Is there even a right answer here?',
            "We have been debating this for an hour and we are exactly where we started. Team cook-at-home says it is cheaper and healthier. Team eat-out says it is easier and more fun. And the truth is, both sides are right. There is no winner. The best answer is probably somewhere in the middle. Cook at home when you can, eat out when you want to. Balance. Everything in life comes down to balance. Can we eat now? All this food talk is making me hungry.",
        ],
        context: 'at the end of the day は「結局のところ」。going back and forth=行ったり来たり（議論）。both sides are right は「どちらも正しい」。日本語の「結局」は英語では at the end of the day, ultimately, after all と選択肢が多い。',
        character: 'master', category: 'social', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 127: 食文化 (Food Culture)
    // Scene: リサが日本の食文化と海外の違いについて語る夜
    // ────────────────────────────────────────────────────

    {
        daySlot: 127, japanese: 'いただきます、って英語でなんて言うの？',
        english: [
            'There is no English equivalent for itadakimasu.',
            'We do not really have a word for itadakimasu. We just start eating.',
            'In English, we do not say anything before eating. Well, some people say grace, but that is religious.',
            "This is one of those things that really shows the difference between cultures. In Japan, everyone says itadakimasu before eating. It is automatic. But in English? We just pick up our forks and go. There is no universal phrase. Some families say a prayer, some families say bon appetit which is actually French, and some families just dive in. The concept of expressing gratitude for the food before eating is beautiful but it does not really exist in English-speaking culture in the same way.",
        ],
        context: '「いただきます」は英語に訳せない日本語の代表格。Let us eat, Dig in, Bon appetit は近いけど「いただきます」の感謝のニュアンスがない。say grace は食前の祈り。文化的に同等の表現がないのは、食への感謝の仕方が違うから。',
        character: 'lisa', category: 'social', month: '2026-08',
    },
    {
        daySlot: 127, japanese: '日本のコンビニは最強だよ',
        english: [
            'Japanese convenience stores are the best.',
            'Honestly, Japanese convenience stores put every other country to shame.',
            'There is nothing in the world like a Japanese convenience store. The food quality is on a completely different level.',
            "I will die on this hill. Japanese convenience stores are the greatest achievement in human civilization. I am not even joking. You walk in and there are fresh onigiri, sandwiches with no crust, egg salad that is actually good, fried chicken that tastes like a restaurant made it, and desserts that would cost fifteen dollars at a bakery anywhere else. And everything costs like two hundred yen. In America, convenience store food is gas station hot dogs and questionable sushi. It is not even in the same universe.",
        ],
        context: 'I will die on this hill は「この意見は絶対に曲げない」。put to shame=恥をかかせるほど上。on a completely different level=レベルが全然違う。日本のコンビニの品質は外国人が最も驚くポイントの一つ。gas station food はアメリカでは「まずい食べ物」の代名詞。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 127, japanese: '食べ歩きが楽しい',
        english: [
            'Street food is fun.',
            'I love trying street food. Every city has its own specialties.',
            'One of the best parts of traveling is eating your way through the local street food scene.',
            "Street food is the real food of a country. Forget the fancy restaurants. You want to know what people actually eat? Go to the street vendors. The night markets in Taiwan, the hawker centers in Singapore, the food stalls in Thailand. That is where the magic happens. The food is cheap, it is authentic, and it is made by people who have been perfecting the same recipe for thirty years. Plus, there is something special about eating while standing in the street surrounded by strangers.",
        ],
        context: 'street food=屋台料理。食べ歩き は英語では eating your way through か food hopping。日本語の「食べ歩き」は一語だけど英語では概念の説明が必要。hawker center はシンガポールの屋台街。night market は台湾の夜市。',
        character: 'lisa', category: 'social', month: '2026-08',
    },
    {
        daySlot: 127, japanese: '麺をすするのは日本だけ？',
        english: [
            'Is slurping noodles just a Japan thing?',
            'Do only Japanese people slurp noodles? I thought everyone did.',
            'I was shocked to learn that slurping noodles is considered rude in most countries.',
            "Okay, this blew my mind when I first heard it. In Japan, slurping your noodles is not just acceptable, it is expected. It shows you are enjoying the food. But in basically every other country? It is rude. Like, really rude. When I first went abroad and slurped my pasta, everyone at the table stared at me like I had committed a crime. Nobody told me. I wish someone had warned me. Now I have to consciously stop myself from slurping when I eat abroad. It is harder than you think.",
        ],
        context: 'slurp=すする。日本では麺をすするのはOKだけど、欧米では table manners 違反。blew my mind=衝撃を受けた。table manners=食事マナー。文化の違いで最も身近に感じるギャップの一つ。逆に欧米人がすする練習をするのが面白い。',
        character: 'yuki', category: 'social', month: '2026-08',
    },
    {
        daySlot: 127, japanese: '食べ残すのは失礼？',
        english: [
            'Is it rude to leave food on your plate?',
            'In Japan, leaving food is considered wasteful. Is it the same in other countries?',
            'I was taught to always finish everything on my plate, but I heard in some cultures it means you want more.',
            "This is such an interesting cultural thing. In Japan and a lot of Asian countries, finishing everything on your plate is the polite thing to do. It shows respect for the food. But in some Middle Eastern and Chinese cultures, leaving a little bit of food on your plate signals that you are satisfied and the host gave you enough. If you finish everything, they think you are still hungry and they bring more. So the same action means opposite things depending on where you are. Culture is wild.",
        ],
        context: '日本では「もったいない」精神で残さないのが礼儀。中東や中国の一部では少し残すのがマナー。clean plate=空の皿。mottainai は英語圏でも知名度が上がっている日本語。wasteful=もったいない、に近いけど精神性が違う。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 127, japanese: 'ラーメンは世界を制覇した',
        english: [
            'Ramen has gone global.',
            'Ramen has completely taken over the world. You can find it everywhere now.',
            'It is crazy how ramen went from a cheap Japanese fast food to a global phenomenon.',
            "Twenty years ago, if you said ramen to an American, they would think of those dried instant noodle packs you get for fifty cents. Now there are ramen shops in every major city charging twenty dollars a bowl and people wait in line for an hour. That is one of the craziest food transformations in history. Sushi went through the same thing. First it was weird and scary, then it was trendy, and now it is everywhere. Japanese food keeps conquering the world one dish at a time.",
        ],
        context: 'gone global=世界に広がった。taken over=制覇した。phenomenon=現象。日本語の「世界を制覇した」は英語では taken over the world がピッタリ。instant noodles=インスタント麺。ramen revolution は英語メディアでよく使われるフレーズ。',
        character: 'master', category: 'social', month: '2026-08',
    },
    {
        daySlot: 127, japanese: '日本酒って海外で人気あるの？',
        english: [
            'Is sake popular overseas?',
            'I heard sake is getting popular in other countries. Is that true?',
            'I am curious whether the sake boom overseas is real or just something I see on the news.',
            "I keep reading articles about how sake is having a moment abroad but I am never sure if it is actually mainstream or just a niche thing for food nerds. Like, can you walk into a regular bar in New York and order a sake? Or is it still something you only find in Japanese restaurants? Because if it has really gone mainstream, that is huge. Wine took centuries to become global. Beer is everywhere. But sake? That would be amazing. I want the world to appreciate good Japanese sake the way we do.",
        ],
        context: 'having a moment=今注目されている。mainstream=主流。niche=ニッチ。sake は英語でもそのまま sake で通じる。ただし発音は「サキ」になることが多く、日本人の「さけ」とは違う。sake bomb はアメリカ特有の飲み方で日本人は知らない。',
        character: 'mina', category: 'social', month: '2026-08',
    },
    {
        daySlot: 127, japanese: '食の安全基準が全然違う',
        english: [
            'Food safety standards are so different.',
            'The food safety standards between countries are shocking.',
            'I never realized how different food safety standards are until I traveled abroad.',
            "You know what shocked me the most about eating in other countries? The food safety standards are completely different. In Japan, we take it for granted that everything is clean and safe. Raw eggs? No problem. Raw fish? Every day. But in a lot of countries, eating a raw egg could actually make you sick. And the expiration dates are different too. In Japan, it means the day the quality starts declining. In other countries, it means the day the food might actually be dangerous. Two very different concepts under the same label.",
        ],
        context: 'food safety=食の安全。take it for granted=当たり前だと思う。expiration date=賞味期限。best before=品質保持期限。use by=消費期限。日本の食品衛生基準は世界トップクラスで、海外在住日本人が最もカルチャーショックを受けるポイント。',
        character: 'lisa', category: 'social', month: '2026-08',
    },
    {
        daySlot: 127, japanese: '食は文化そのものだよね',
        english: [
            'Food is culture.',
            'What you eat says so much about who you are and where you come from.',
            'I truly believe that if you want to understand a country, you start by understanding its food.',
            "Think about it. Everything about a culture is reflected in its food. The climate, the geography, the history, the religion, the values. Why does Japan eat so much fish? Island nation. Why does India have so many vegetarian dishes? Religious beliefs. Why does America eat such big portions? Because they can. Food tells you everything about a place without anyone having to say a word. It is the most honest expression of a culture. You can lie about your history but you cannot fake your food.",
        ],
        context: '「食は文化」は日英共通の感覚。You are what you eat は英語の有名なことわざ。tell me what you eat and I will tell you who you are はフランスの美食家ブリア=サヴァランの言葉。食べ物を通じて文化を語るのは万国共通の哲学。',
        character: 'master', category: 'social', month: '2026-08',
    },
    {
        daySlot: 127, japanese: '来週は健康と体の話だぞ',
        english: [
            'Next week we talk about health.',
            'Next week is all about health and body topics. Get ready.',
            'We are moving on to health and body talk next week. It is going to be useful stuff.',
            "Alright everyone, good week. We covered food from every angle. Restaurants, cooking, flavors, preferences, recipes, eating out versus cooking, and food culture. That is a lot of food talk. But next week we are shifting gears. Health and body. How to talk about feeling sick, going to the doctor, exercise, sleep, stress. The kind of English you need when something goes wrong with your body. Less fun than food talk, but way more important. See you next week.",
        ],
        context: 'shifting gears は「ギアチェンジ=話題を変える」。less fun but more important は権藤マスターらしいまとめ方。日本語の「来週は〜だぞ」の「だぞ」は英語では強調より予告のトーンが自然。Get ready. が一番近い。',
        character: 'master', category: 'social', month: '2026-08',
    },
];

// ============================================================
// DAY THEMES -- MONTH 5 (2026-08) -- WEEK 17
// ============================================================

export const MONTH5_W17_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    121: {
        title: 'レストランで', titleEn: 'At a Restaurant', category: 'order',
        scene: '居酒屋の常連たちが新しくできたイタリアンに行く。英語メニューしかない。',
        keywords: [
            { en: 'reservation', ja: '予約', pron: 'レザヴェイション', example: 'I have a reservation under Gondo.', note: 'book a reservation=予約する。日本語の「予約」は英語ではbookingかreservation。レストラン・ホテル=reservation、美容院=appointment。' },
            { en: 'recommend', ja: 'おすすめする', pron: 'レコメンド', example: 'What do you recommend?', note: 'カジュアルならWhat is good here?で十分。recommendはフォーマル寄り。suggestは「提案する」で少し違う。' },
            { en: 'allergy', ja: 'アレルギー', pron: 'アラジー', example: 'I have a nut allergy.', note: '日本語の「アレルギー」とは発音が全然違う。海外で命を守る単語なので正しい発音を覚えるべし。' },
            { en: 'split', ja: '割り勘にする', pron: 'スプリット', example: 'Can we split the check?', note: 'split the check=割り勘。go Dutch は古い表現。separate checks=別会計。日本の「割り勘」文化は海外では珍しい。' },
            { en: 'tip', ja: 'チップ', pron: 'ティップ', example: 'How much should I tip?', note: 'アメリカでは15-20%が標準。日本にはない文化。leave a tip=チップを残す。tip jar=チップ入れ。' },
        ],
    },
    122: {
        title: '料理する', titleEn: 'Cooking', category: 'request',
        scene: 'ユキがマスターに料理を教わる。英語でレシピを説明する練習。',
        keywords: [
            { en: 'simmer', ja: '弱火で煮る', pron: 'シマー', example: 'Let it simmer for twenty minutes.', note: 'boil=沸騰、simmer=コトコト。日本語の「煮る」は英語では火力によってboil/simmer/stew/braiseに分かれる。' },
            { en: 'chop', ja: '切る・刻む', pron: 'チョップ', example: 'Chop the onions finely.', note: 'chop=ざく切り、dice=さいの目、slice=薄切り、mince=みじん切り。日本語と同じく切り方の動詞が豊富。' },
            { en: 'season', ja: '味付けする', pron: 'シーズン', example: 'Season it with salt and pepper.', note: 'seasoning=調味料。season は「味をつける」全般。marinate は「液体に漬ける」。下味=marinate、仕上げ=season。' },
            { en: 'stir', ja: 'かき混ぜる', pron: 'スター', example: 'Stir it so it does not burn.', note: 'stir=かき混ぜる、whisk=泡立てる、fold=さっくり混ぜる。日本語の「混ぜる」は英語では混ぜ方で3種類に分かれる。' },
            { en: 'crispy', ja: 'サクサク', pron: 'クリスピー', example: 'The outside is perfectly crispy.', note: 'crispy=薄いサクサク、crunchy=厚いカリカリ。日本語の擬音語「サクサク」「カリカリ」は英語圏の人が羨ましがる表現力。' },
        ],
    },
    123: {
        title: '味の表現', titleEn: 'Describing Flavors', category: 'feeling',
        scene: '常連たちがマスターの新メニューの感想を英語で伝える練習。',
        keywords: [
            { en: 'bland', ja: '味が薄い', pron: 'ブランド', example: 'It is a bit bland. Needs more salt.', note: 'bland=味気ない（ネガティブ）。mild=マイルド（中立〜ポジティブ）。subtle=繊細（ポジティブ）。同じ「薄い」でもニュアンスが全然違う。' },
            { en: 'savory', ja: 'しょっぱい系・おかず系', pron: 'セイバリー', example: 'I prefer savory over sweet.', note: '甘い=sweet の反対語。日本語にない概念。savory=甘くない食べ物全般。salty は「塩辛い」でネガティブにもなる。' },
            { en: 'rich', ja: '濃厚な', pron: 'リッチ', example: 'This sauce is incredibly rich.', note: '日本語の「コク」に一番近い。depth of flavor=味の深み。rich and creamy=濃厚でクリーミー。' },
            { en: 'refreshing', ja: 'さっぱりした', pron: 'リフレッシング', example: 'This salad is so refreshing.', note: '日本語の「さっぱり」は直訳不可能。refreshing+light+cleanで近づく。crisp も清涼感を表す。' },
            { en: 'texture', ja: '食感', pron: 'テクスチャー', example: 'The texture is perfect.', note: '日本語は食感の擬音が世界一多い（サクサク、もちもち、ネバネバ等）。英語はchewy, crunchy, creamy 程度。表現力の差が大きい。' },
        ],
    },
    124: {
        title: '食の好み', titleEn: 'Food Preferences', category: 'social',
        scene: 'リサが「日本の食文化は世界一複雑」と議論を始める。',
        keywords: [
            { en: 'picky', ja: '好き嫌いが多い', pron: 'ピッキー', example: 'I am a picky eater.', note: 'picky eater は自分で言ってもOK。fussy は少しネガティブ寄り。selective は上品な言い方。' },
            { en: 'craving', ja: '無性に食べたい', pron: 'クレイヴィング', example: 'I am craving chocolate right now.', note: 'I want とは強さが違う。craving は我慢できないレベルの欲求。pregnancy cravings=妊婦の食べ物の衝動。' },
            { en: 'vegetarian', ja: 'ベジタリアン', pron: 'ヴェジテリアン', example: 'I went vegetarian last year.', note: 'vegetarian=肉なし、vegan=動物性なし、pescatarian=魚OK。plant-based は最近の流行語。' },
            { en: 'addictive', ja: '中毒性がある', pron: 'アディクティブ', example: 'These chips are so addictive.', note: '食べ物の「ハマる」「止まらない」はaddictive。get hooked on も同じ。moreishはイギリス英語。' },
            { en: 'comfort food', ja: 'ほっとする料理', pron: 'コンフォートフード', example: 'Ramen is my ultimate comfort food.', note: '疲れた時や落ち込んだ時に食べたくなる料理。日本語にはない概念で、英語特有の食文化用語。soul food はアフリカ系アメリカ人の伝統料理。' },
        ],
    },
    125: {
        title: 'レシピを教える', titleEn: 'Sharing Recipes', category: 'request',
        scene: 'マスターが常連に唐揚げのレシピを英語で伝授する。',
        keywords: [
            { en: 'recipe', ja: 'レシピ', pron: 'レサピー', example: 'Can you share the recipe?', note: '日本語の「レシピ」と発音が違う。英語は「レサピー」。follow a recipe=レシピ通りに作る。家庭料理はoften no recipe（目分量）。' },
            { en: 'ingredient', ja: '材料', pron: 'イングリーディエント', example: 'What ingredients do I need?', note: '料理の材料。日本語の「素材」はmaterial（工業用）。食べ物はingredient。secret ingredient=隠し味。' },
            { en: 'marinate', ja: '漬け込む', pron: 'マリネイト', example: 'Marinate the chicken overnight.', note: '液体に漬ける=marinate。brine=塩水に漬ける。rub=スパイスを擦り込む。漬け方の動詞が英語は細かい。' },
            { en: 'substitute', ja: '代用する', pron: 'サブスティテュート', example: 'Can I substitute butter for oil?', note: 'A for B=AでBの代わり。海外で和食の材料が手に入らない時の必須動詞。replacement も同義。' },
            { en: 'serving', ja: '一人前', pron: 'サーヴィング', example: 'This makes four servings.', note: 'serving size=一食分の量。portion=盛り付け量。helping=おかわり。second helping=おかわり。' },
        ],
    },
    126: {
        title: '外食 vs 自炊', titleEn: 'Eating Out vs Cooking', category: 'social',
        scene: '自炊派のケンジと外食派のタケシが激論。',
        keywords: [
            { en: 'meal prep', ja: '作り置き', pron: 'ミールプレップ', example: 'I do meal prep on Sundays.', note: 'アメリカで大流行中。batch cooking も同義。日本では昔からある概念だけど、英語圏ではSNS時代に再発見された。' },
            { en: 'delivery', ja: '出前・デリバリー', pron: 'デリバリー', example: 'Let us just order delivery.', note: 'food delivery apps=出前アプリ。takeout=持ち帰り（アメリカ）、takeaway（イギリス）。日本語の「出前」はdeliveryでOK。' },
            { en: 'leftovers', ja: '残り物', pron: 'レフトオーバーズ', example: 'I ate leftovers for lunch.', note: '作り置きの残り物。doggy bag=持ち帰り容器（やや古い）。to-go box が今は主流。' },
            { en: 'convenience', ja: '便利さ', pron: 'コンヴィーニエンス', example: 'I eat out for convenience.', note: '日本語の「コンビニ」はこの単語から。convenient=便利な。for convenience=便利だから。' },
            { en: 'budget', ja: '予算', pron: 'バジェット', example: 'Eating out is not in my budget.', note: 'on a budget=予算内で。tight budget=厳しい予算。over budget=予算オーバー。食費はfood budget。' },
        ],
    },
    127: {
        title: '食文化', titleEn: 'Food Culture', category: 'social',
        scene: 'リサが日本の食文化と海外の違いについて語る夜。',
        keywords: [
            { en: 'etiquette', ja: 'マナー・作法', pron: 'エチケット', example: 'Table etiquette varies by country.', note: '日本語の「エチケット」より英語のetiquetteは堅い。table manners=食事マナー。「マナー」は和製英語的に範囲が広い。' },
            { en: 'cuisine', ja: '料理（体系）', pron: 'クイジーン', example: 'Japanese cuisine is world-famous.', note: 'food=食べ物、dish=料理一品、cuisine=料理体系。French cuisine=フランス料理。日常会話ではfoodで十分だがcuisineは格が上がる。' },
            { en: 'authentic', ja: '本場の', pron: 'オーセンティック', example: 'This is authentic Italian food.', note: 'authentic=本場の・本物の。genuine に近いが食べ物にはauthenticを使う。the real deal も「本物」のスラング。' },
            { en: 'portion', ja: '量・盛り', pron: 'ポーション', example: 'American portions are huge.', note: 'portion size=一食分の量。日本語の「ポーション」はゲーム用語だけど英語では食事の量が主な意味。' },
            { en: 'street food', ja: '屋台料理', pron: 'ストリートフード', example: 'The street food in Thailand is amazing.', note: '食べ歩き=eating your way through。food stall=屋台。vendor=売り手。night market=夜市。hawker center はシンガポール特有。' },
        ],
    },
};
