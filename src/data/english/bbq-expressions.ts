/**
 * BBQ Expressions -- casual expressions from Neighborhood Barbecue scenario
 * Tracked separately from idiom list (no overlap with used-idioms.json)
 * 75 expressions across 5 days, all commonly used in spoken English
 * Characters: Big Dave(45M), Tammy(43F), Ken(42M), Yuko(39F), Sota(10M),
 *             Hank(62M), Cheryl(58F), Tyler(16M), Brenda(50F), Captain(7,dog)
 */

export interface BbqExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const BBQ_EXPRESSIONS: BbqExpression[] = [
    // ============================================================
    // DAY 1 -- ARRIVALS (15 expressions)
    // Introductions, food sharing, first impressions, settling in
    // ============================================================
    { expression: "glad y'all could make it", meaning: "来てくれて嬉しいよ", meaningEn: "expressing genuine happiness that someone accepted an invitation", day: 1, speaker: "Big Dave", example: "Hey, glad y'all could make it! Grab a plate, we got plenty." },
    { expression: "we brought a little somethin'", meaning: "ちょっとしたもの持ってきました", meaningEn: "casually offering a food contribution to the host", day: 1, speaker: "Yuko", example: "Hi! We brought a little somethin'. It's edamame. Hope that's okay." },
    { expression: "you shouldn't have", meaning: "気を使わなくてよかったのに", meaningEn: "polite appreciation when someone brings a gift or food", day: 1, speaker: "Tammy", example: "Oh, you shouldn't have! These look gorgeous. What are they?" },
    { expression: "make yourselves comfortable", meaning: "楽にしてね", meaningEn: "telling guests to relax and feel at ease", day: 1, speaker: "Big Dave", example: "Lawn chairs are right over there. Make yourselves comfortable." },
    { expression: "I don't think we've met", meaning: "初めましてですよね", meaningEn: "politely initiating an introduction with someone new", day: 1, speaker: "Brenda", example: "Hi there! I don't think we've met. I'm Brenda, two doors down." },
    { expression: "we just moved in", meaning: "引っ越してきたばかりです", meaningEn: "explaining that you recently relocated to the neighborhood", day: 1, speaker: "Ken", example: "Yes, ah, we just moved in. Last month. Nice to meet you." },
    { expression: "welcome to the neighborhood", meaning: "ご近所へようこそ", meaningEn: "greeting someone who recently moved into the area", day: 1, speaker: "Cheryl", example: "Oh how wonderful! Welcome to the neighborhood, honey. Wine?" },
    { expression: "I'll take you up on that", meaning: "お言葉に甘えます", meaningEn: "accepting an offer someone has made", day: 1, speaker: "Yuko", example: "Wine? I'll take you up on that. It's been a long week." },
    { expression: "don't mind him", meaning: "気にしないで", meaningEn: "telling someone to ignore another person's behavior", day: 1, speaker: "Tammy", example: "Don't mind him. Dave gets real intense about his grill." },
    { expression: "he means well", meaning: "悪気はないんです", meaningEn: "defending someone's awkward behavior by highlighting good intentions", day: 1, speaker: "Cheryl", example: "Hank and his clipboard. He means well, trust me." },
    { expression: "just a formality", meaning: "ただの形式的なものです", meaningEn: "downplaying something official or bureaucratic as routine", day: 1, speaker: "Hank", example: "I just need a quick signature here. Just a formality. HOA stuff." },
    { expression: "you're gonna love it here", meaning: "ここ絶対気に入るよ", meaningEn: "assuring newcomers that the area is great", day: 1, speaker: "Brenda", example: "Oh, you're gonna love it here. Best block in the whole subdivision." },
    { expression: "what do you do", meaning: "お仕事は何を?", meaningEn: "asking someone about their occupation", day: 1, speaker: "Hank", example: "So, Ken, what do you do? Tammy said somethin' about engineering?" },
    { expression: "somethin' like that", meaning: "まあそんな感じです", meaningEn: "vaguely confirming without getting into details", day: 1, speaker: "Ken", example: "Ah, yes, somethin' like that. Software. Very... computer." },
    { expression: "the more the merrier", meaning: "多ければ多いほど楽しい", meaningEn: "welcoming additional people to join an activity", day: 1, speaker: "Big Dave", example: "Bring the whole family next time. The more the merrier!" },

    // ============================================================
    // DAY 2 -- GRILL WARS (15 expressions)
    // Rare vs well-done, competitive cooking, kids playing
    // ============================================================
    { expression: "how do you like yours", meaning: "焼き加減はどうする?", meaningEn: "asking someone's preference for how their food is cooked", day: 2, speaker: "Big Dave", example: "Alright Ken, how do you like yours? Medium? Medium rare?" },
    { expression: "I'll have whatever's good", meaning: "おすすめでお願いします", meaningEn: "deferring to someone else's judgment on what to choose", day: 2, speaker: "Ken", example: "Ah, I'll have whatever's good. I trust you." },
    { expression: "that's what I like to hear", meaning: "いいね、その答え", meaningEn: "approving of someone's response enthusiastically", day: 2, speaker: "Big Dave", example: "Medium rare it is. That's what I like to hear." },
    { expression: "you're not seriously", meaning: "まさか本気じゃないよね", meaningEn: "expressing disbelief at someone's choice or action", day: 2, speaker: "Tammy", example: "You're not seriously puttin' ketchup on that steak, Hank." },
    { expression: "don't knock it till you try it", meaning: "やってみないとわからないよ", meaningEn: "defending something by saying you shouldn't judge without trying", day: 2, speaker: "Hank", example: "Don't knock it till you try it. Ketchup on steak is underrated." },
    { expression: "I'm not even gonna touch that", meaning: "それにはノーコメントで", meaningEn: "refusing to engage with a controversial statement", day: 2, speaker: "Big Dave", example: "I'm not even gonna touch that. My grill, my rules." },
    { expression: "can I get seconds", meaning: "おかわりもらっていい?", meaningEn: "asking for another serving of food", day: 2, speaker: "Sota", example: "Mom, can I get seconds? The corn is SO good." },
    { expression: "that's my boy", meaning: "さすが俺の息子", meaningEn: "proud approval of someone's behavior, especially a child's", day: 2, speaker: "Big Dave", example: "Kid likes my corn. That's my boy! Here, take two." },
    { expression: "he's not your boy", meaning: "あなたの息子じゃないでしょ", meaningEn: "playfully correcting someone claiming another's child", day: 2, speaker: "Tammy", example: "Dave. He's not your boy. Let his parents feed him." },
    { expression: "I'm just gonna say it", meaning: "言っちゃうけど", meaningEn: "announcing a blunt opinion is coming", day: 2, speaker: "Brenda", example: "I'm just gonna say it. Dave, your ribs are better than Smokey Joe's." },
    { expression: "now you're talkin'", meaning: "いいこと言うね!", meaningEn: "enthusiastic approval of what someone just said", day: 2, speaker: "Big Dave", example: "Now you're talkin'! See, Tammy? Brenda gets it." },
    { expression: "don't let it go to your head", meaning: "調子に乗らないでね", meaningEn: "warning someone not to become arrogant from praise", day: 2, speaker: "Tammy", example: "Don't let it go to your head. You burned the first batch." },
    { expression: "we don't talk about that", meaning: "その話はナシで", meaningEn: "humorously refusing to acknowledge an embarrassing incident", day: 2, speaker: "Big Dave", example: "We don't talk about that. Those were... practice burgers." },
    { expression: "get off your phone", meaning: "スマホ見るのやめなさい", meaningEn: "telling someone to stop looking at their phone and engage", day: 2, speaker: "Tammy", example: "Tyler, get off your phone. Go play with Sota." },
    { expression: "I'm good", meaning: "大丈夫(やんわり断る)", meaningEn: "politely declining something or indicating you don't need anything", day: 2, speaker: "Tyler", example: "I'm good. He's like, ten." },

    // ============================================================
    // DAY 3 -- SIDE DISHES & CULTURE CLASH (15 expressions)
    // Edamame education, wine flowing, cultural curiosity
    // ============================================================
    { expression: "what in the world is that", meaning: "なにそれ!?", meaningEn: "expressing surprised curiosity about something unfamiliar", day: 3, speaker: "Hank", example: "What in the world is that? Little green beans in a pod?" },
    { expression: "just try one", meaning: "一個食べてみて", meaningEn: "encouraging someone to taste something new", day: 3, speaker: "Yuko", example: "Just try one. You squeeze the bean out. Like this." },
    { expression: "I'll be darned", meaning: "まじか、びっくり", meaningEn: "mild exclamation of pleasant surprise", day: 3, speaker: "Hank", example: "I'll be darned. These are actually pretty good." },
    { expression: "told you so", meaning: "だから言ったでしょ", meaningEn: "pointing out that your prediction or advice was correct", day: 3, speaker: "Cheryl", example: "Told you so. You always say no before you even try." },
    { expression: "you learn somethin' new every day", meaning: "毎日新しい発見があるね", meaningEn: "acknowledging that you just discovered something new", day: 3, speaker: "Brenda", example: "Edamame! You learn somethin' new every day." },
    { expression: "back home we have", meaning: "地元だと〜があるんです", meaningEn: "referencing customs or things from where you grew up", day: 3, speaker: "Ken", example: "Back home we have... ah, many kind of bean. Edamame is... summer thing." },
    { expression: "that's so interesting", meaning: "めっちゃ面白い", meaningEn: "expressing genuine curiosity about new cultural information", day: 3, speaker: "Brenda", example: "That's so interesting! Do you eat 'em at barbecues in Japan too?" },
    { expression: "pour me another", meaning: "もう一杯お願い", meaningEn: "asking for another drink, usually alcohol", day: 3, speaker: "Cheryl", example: "Pour me another, would ya? This Chardonnay is dangerous." },
    { expression: "pace yourself", meaning: "ペース配分考えて", meaningEn: "advising someone to slow down, usually with food or drinks", day: 3, speaker: "Hank", example: "Cheryl, pace yourself. We gotta walk home." },
    { expression: "it's fifty feet", meaning: "すぐそこじゃん", meaningEn: "pointing out that a distance is trivially short", day: 3, speaker: "Cheryl", example: "Hank, it's fifty feet. I think I can manage." },
    { expression: "she's got a point", meaning: "確かに", meaningEn: "acknowledging that a woman's argument is valid", day: 3, speaker: "Big Dave", example: "She's got a point, Hank. Y'all live right there." },
    { expression: "this is to die for", meaning: "これ最高すぎる", meaningEn: "saying food or something is incredibly good", day: 3, speaker: "Brenda", example: "Tammy, this potato salad is to die for. What's your secret?" },
    { expression: "a lady never tells", meaning: "秘密です", meaningEn: "playfully refusing to share a secret or recipe", day: 3, speaker: "Tammy", example: "A lady never tells. But I'll say this -- extra dill." },
    { expression: "I knew it", meaning: "やっぱり!", meaningEn: "confirming a suspicion you already had", day: 3, speaker: "Brenda", example: "I knew it! I could taste somethin' different. Dill. Genius." },
    { expression: "where'd you learn to cook like that", meaning: "どこでこんな料理覚えたの", meaningEn: "complimenting someone's cooking by asking about its origin", day: 3, speaker: "Yuko", example: "Tammy, where'd you learn to cook like that? Everything is amazing." },

    // ============================================================
    // DAY 4 -- BEER TRUTHS & DOG CHAOS (15 expressions)
    // Broken-English comedy, Captain steals food, Hank loosens up
    // ============================================================
    { expression: "who let the dog out", meaning: "誰が犬放した?", meaningEn: "asking who allowed the dog to roam free", day: 4, speaker: "Tammy", example: "Who let the dog out?! Captain! Drop it! DROP IT!" },
    { expression: "too late", meaning: "もう遅い", meaningEn: "something has already happened and can't be undone", day: 4, speaker: "Tyler", example: "Too late. He already ate like three hot dogs." },
    { expression: "that dog is somethin' else", meaning: "あの犬ほんとヤバい", meaningEn: "saying someone or something is remarkably unusual", day: 4, speaker: "Hank", example: "That dog is somethin' else. Fastest thief on the block." },
    { expression: "between you and me", meaning: "ここだけの話", meaningEn: "sharing something in confidence", day: 4, speaker: "Big Dave", example: "Between you and me, Ken, this is the good stuff. Not that light beer crap." },
    { expression: "my English is not so good", meaning: "英語あんまり上手じゃなくて", meaningEn: "apologizing for limited language ability", day: 4, speaker: "Ken", example: "Sorry, my English is not so good. I want to say... this beer is... wow." },
    { expression: "your English is fine", meaning: "英語全然いけてるよ", meaningEn: "reassuring someone that their language skills are adequate", day: 4, speaker: "Big Dave", example: "Dude, your English is fine. You said 'wow.' That's all you need." },
    { expression: "I'll drink to that", meaning: "それに乾杯", meaningEn: "toasting in agreement with something just said", day: 4, speaker: "Hank", example: "Good beer, good neighbors. I'll drink to that." },
    { expression: "who are you and what have you done with", meaning: "あんた誰?本物の〜はどこ?", meaningEn: "joking that someone is acting so differently they must be replaced", day: 4, speaker: "Cheryl", example: "Wait, Hank without his clipboard? Who are you and what have you done with my husband?" },
    { expression: "even I need a day off", meaning: "俺だって休みは必要だよ", meaningEn: "admitting that even you need to relax sometimes", day: 4, speaker: "Hank", example: "Even I need a day off. Don't tell the HOA board." },
    { expression: "your secret's safe with me", meaning: "秘密は守るよ", meaningEn: "promising not to reveal someone's secret", day: 4, speaker: "Big Dave", example: "Your secret's safe with me, buddy. Have another beer." },
    { expression: "he's a natural", meaning: "あの子天才肌だね", meaningEn: "saying someone has innate talent at something", day: 4, speaker: "Brenda", example: "Look at Sota out there. He's a natural. Already runnin' the show." },
    { expression: "kids adapt so fast", meaning: "子供の適応力すごいよね", meaningEn: "observing that children adjust to new situations quickly", day: 4, speaker: "Tammy", example: "Kids adapt so fast. He's already got like five friends." },
    { expression: "I wish I could do that", meaning: "俺もああなりたいよ", meaningEn: "envying someone's ability or situation", day: 4, speaker: "Ken", example: "I wish I could do that. He just... talks. No thinking. Just talks." },
    { expression: "you're doin' great", meaning: "十分やれてるよ", meaningEn: "encouraging someone who doubts themselves", day: 4, speaker: "Brenda", example: "Ken, you're doin' great. Seriously. You're out here, you're tryin'. That's everything." },
    { expression: "that means a lot", meaning: "その言葉嬉しいです", meaningEn: "expressing that someone's kind words deeply affect you", day: 4, speaker: "Ken", example: "Thank you. That means a lot. Really." },

    // ============================================================
    // DAY 5 -- SUNSET & BELONGING (15 expressions)
    // Fireworks, friendship, goodbyes, feeling at home
    // ============================================================
    { expression: "I can't believe it's already", meaning: "もうこんな時間なんて信じられない", meaningEn: "expressing surprise at how fast time has passed", day: 5, speaker: "Yuko", example: "I can't believe it's already dark. Time flew." },
    { expression: "time flies when you're havin' fun", meaning: "楽しいと時間あっという間だよね", meaningEn: "classic saying about enjoyable time passing quickly", day: 5, speaker: "Big Dave", example: "Time flies when you're havin' fun. Who wants s'mores?" },
    { expression: "I'm stuffed", meaning: "もうお腹いっぱい", meaningEn: "saying you're completely full from eating", day: 5, speaker: "Hank", example: "I'm stuffed. Couldn't eat another bite. ...Okay maybe one s'more." },
    { expression: "there's always room for dessert", meaning: "デザートは別腹", meaningEn: "the idea that you can always eat more when it's sweets", day: 5, speaker: "Cheryl", example: "There's always room for dessert. That's science, Hank." },
    { expression: "we should do this more often", meaning: "もっと頻繁にやろうよ", meaningEn: "suggesting that a fun gathering should be repeated regularly", day: 5, speaker: "Brenda", example: "Seriously, we should do this more often. I missed this." },
    { expression: "you're always welcome", meaning: "いつでも来てね", meaningEn: "assuring someone they can visit or join anytime", day: 5, speaker: "Big Dave", example: "Ken, Yuko, you're always welcome. And I mean that." },
    { expression: "that means the world to us", meaning: "本当に嬉しいです", meaningEn: "expressing deep gratitude for someone's kindness", day: 5, speaker: "Yuko", example: "That means the world to us. We were so nervous movin' here." },
    { expression: "nervous about what", meaning: "何が心配だったの?", meaningEn: "asking someone to elaborate on their anxiety", day: 5, speaker: "Tammy", example: "Nervous about what? Y'all are the sweetest family." },
    { expression: "fitting in", meaning: "馴染めるかどうか", meaningEn: "the challenge of being accepted in a new social group", day: 5, speaker: "Yuko", example: "You know... fitting in. New country, new street, new everything." },
    { expression: "you already fit right in", meaning: "もう完全に馴染んでるよ", meaningEn: "assuring someone they're already accepted by the group", day: 5, speaker: "Brenda", example: "Honey, you already fit right in. Look around. This is your block now." },
    { expression: "who's got the fireworks", meaning: "花火持ってるの誰?", meaningEn: "asking who brought fireworks for the celebration", day: 5, speaker: "Tyler", example: "Yo, who's got the fireworks? Sota and me wanna set 'em off." },
    { expression: "be careful with those", meaning: "気をつけてね", meaningEn: "warning someone to handle something safely", day: 5, speaker: "Tammy", example: "Be careful with those! Dave, go supervise." },
    { expression: "I got it, I got it", meaning: "わかったわかった、任せて", meaningEn: "reassuring someone that you'll handle the situation", day: 5, speaker: "Big Dave", example: "I got it, I got it. Boys, follow me. Safety briefing." },
    { expression: "same time next weekend", meaning: "来週の同じ時間にまた", meaningEn: "proposing to repeat the gathering soon", day: 5, speaker: "Hank", example: "Same time next weekend? I'll bring my famous brisket." },
    { expression: "wouldn't miss it", meaning: "絶対行く", meaningEn: "enthusiastic commitment to attend a future event", day: 5, speaker: "Ken", example: "Wouldn't miss it. I bring edamame again. And... maybe beer this time." },
];

export const BBQ_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_BBQ_EXPRESSIONS = BBQ_EXPRESSIONS.length;

export const BBQ_DAY_IDS: Record<number, string> = {
    1: 'bbq-day1',
    2: 'bbq-day2',
    3: 'bbq-day3',
    4: 'bbq-day4',
    5: 'bbq-day5',
};

/**
 * Find the conversation line index where an expression is spoken by its speaker.
 * Returns the array index or -1 if not found.
 */
export function findBbqExpressionLineIndex(
    expression: string,
    speaker: string,
    conversationLines: Array<{ speaker: string; text: string }>
): number {
    const exprLower = expression.toLowerCase();
    return conversationLines.findIndex(line => {
        const textLower = line.text.toLowerCase();
        return textLower.includes(exprLower) && textLower.startsWith(`${speaker.toLowerCase()}:`);
    });
}
