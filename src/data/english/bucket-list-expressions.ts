/**
 * Bucket List Trip Expressions -- casual expressions from Bucket List Trip scenario
 * Tracked separately from idiom list (no overlap with used-idioms.json)
 * 75 expressions across 5 days, all commonly used in spoken English
 * Characters: Gary(55M), Linda(53F), Javi(24M), Earl(63M), Dot(61F), Megan(28F)
 */

export interface BucketListExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const BUCKET_LIST_EXPRESSIONS: BucketListExpression[] = [
    // ============================================================
    // DAY 1 -- VEGAS TO THE RIM (15 expressions)
    // Drive from Vegas, arrival, first Canyon view, meeting Earl & Dot
    // ============================================================
    { expression: "I can't believe we waited this long", meaning: "なんでもっと早く来なかったんだろ", meaningEn: "regretting not doing something sooner", day: 1, speaker: "Gary", example: "Thirty years of marriage and we never came here. I can't believe we waited this long." },
    { expression: "are we there yet", meaning: "まだ着かないの", meaningEn: "impatient question during a long trip, often humorous from adults", day: 1, speaker: "Linda", example: "Gary, it's been four hours. Are we there yet or did you miss the turn again?" },
    { expression: "I printed out the whole thing", meaning: "全部プリントアウトしてきた", meaningEn: "over-preparing by printing documents in a digital age", day: 1, speaker: "Gary", example: "Hotel confirmation, park map, restaurant list. I printed out the whole thing. Laminated." },
    { expression: "you're such a control freak", meaning: "ほんと仕切りたがりだよね", meaningEn: "someone who needs to manage every detail", day: 1, speaker: "Linda", example: "A laminated itinerary with time stamps? You're such a control freak." },
    { expression: "oh my god, look at that", meaning: "うわ、あれ見て", meaningEn: "spontaneous reaction to something visually stunning", day: 1, speaker: "Linda", example: "Oh my god, look at that. It just goes on forever. I can't even see the bottom." },
    { expression: "I wasn't ready for this", meaning: "こんなの想像してなかった", meaningEn: "something exceeded expectations in an overwhelming way", day: 1, speaker: "Gary", example: "Pictures don't do it justice. I wasn't ready for this." },
    { expression: "don't look down", meaning: "下見るなよ", meaningEn: "warning someone at a height, or self-reassurance", day: 1, speaker: "Gary", example: "Okay. Railing. Good. Solid railing. Don't look down, don't look down." },
    { expression: "you must be first-timers", meaning: "初めてでしょ", meaningEn: "recognizing newcomers by their behavior or reactions", day: 1, speaker: "Earl", example: "The way your husband's grippin' that railing -- you must be first-timers." },
    { expression: "forty-seven countries and counting", meaning: "47ヶ国、まだ増えるよ", meaningEn: "boasting about travel experience with implied continuation", day: 1, speaker: "Earl", example: "Machu Picchu, the Serengeti, Kyoto in cherry blossom season. Forty-seven countries and counting." },
    { expression: "he's been saying that since breakfast", meaning: "朝からずっとそれ言ってる", meaningEn: "someone keeps repeating the same thing, playful annoyance", day: 1, speaker: "Dot", example: "Don't get him started on Patagonia. He's been saying that since breakfast." },
    { expression: "we should grab dinner together", meaning: "一緒にご飯行きません？", meaningEn: "casual invitation to share a meal with new acquaintances", day: 1, speaker: "Linda", example: "You two are hilarious. We should grab dinner together tonight." },
    { expression: "she never meets a stranger", meaning: "あの人誰とでもすぐ仲良くなる", meaningEn: "describing someone extremely sociable who befriends everyone", day: 1, speaker: "Gary", example: "Five minutes and she's already exchanged numbers. She never meets a stranger." },
    { expression: "I need to sit down for a second", meaning: "ちょっと座らせて", meaningEn: "needing a break, often from physical or emotional overwhelm", day: 1, speaker: "Gary", example: "My knees are doin' this thing. I need to sit down for a second." },
    { expression: "get a picture of me right here", meaning: "ここで写真撮って", meaningEn: "requesting a photo at a specific scenic spot", day: 1, speaker: "Linda", example: "The light is perfect. Get a picture of me right here. No, vertical. VERTICAL." },
    { expression: "this was worth every penny", meaning: "来てよかった、1円も無駄じゃない", meaningEn: "something expensive was completely justified by the experience", day: 1, speaker: "Gary", example: "The flights, the hotel, the rental car. This was worth every penny." },

    // ============================================================
    // DAY 2 -- THE MORNING HIKE (15 expressions)
    // Javi leads the hike, Gary's height fear, geology nerd-out
    // ============================================================
    { expression: "everybody hydrated?", meaning: "みんな水分とった？", meaningEn: "checking if everyone has enough water before activity", day: 2, speaker: "Javi", example: "Before we head down -- everybody hydrated? It's already ninety out here." },
    { expression: "how steep are we talkin'", meaning: "どれくらい急なの", meaningEn: "asking about difficulty level with mild anxiety", day: 2, speaker: "Gary", example: "When you say 'moderate trail,' how steep are we talkin'? Like, stairs steep or cliff steep?" },
    { expression: "you'll be fine", meaning: "大丈夫だって", meaningEn: "reassuring someone who's nervous, sometimes dismissively", day: 2, speaker: "Linda", example: "Gary, you walked the dog up that hill last week. You'll be fine." },
    { expression: "that's not the same thing", meaning: "それとこれは話が違う", meaningEn: "rejecting a comparison as irrelevant or misleading", day: 2, speaker: "Gary", example: "A hill in our neighborhood does NOT have a thousand-foot drop. That's not the same thing." },
    { expression: "fun fact", meaning: "ちなみに豆知識", meaningEn: "introducing an interesting piece of trivia", day: 2, speaker: "Javi", example: "Fun fact -- this layer right here is older than the dinosaurs. Like, way older." },
    { expression: "I did NOT sign up for this", meaning: "こんなの聞いてない", meaningEn: "protesting that a situation is harder than expected", day: 2, speaker: "Gary", example: "There's no guardrail here. I did NOT sign up for this." },
    { expression: "just don't look to your left", meaning: "左は見ないで", meaningEn: "warning about a scary view on one side of a path", day: 2, speaker: "Javi", example: "The trail narrows here. Just don't look to your left and you're golden." },
    { expression: "you're golden", meaning: "全然いけるよ", meaningEn: "assuring someone they're in a good position, nothing to worry about", day: 2, speaker: "Javi", example: "Stick to the inside of the path, you're golden. I've done this a thousand times." },
    { expression: "my legs are gonna hate me tomorrow", meaning: "明日足やばいだろうな", meaningEn: "anticipating soreness after physical exertion", day: 2, speaker: "Linda", example: "This switchback is brutal. My legs are gonna hate me tomorrow." },
    { expression: "that's what she said", meaning: "それ別の意味にとれるぞ(下ネタ)", meaningEn: "immature joke implying a double meaning, classic dad humor", day: 2, speaker: "Earl", example: "Javi said 'it gets harder the deeper you go.' That's what she said." },
    { expression: "really, Earl?", meaning: "マジでそれ言う？アール", meaningEn: "deadpan disapproval of someone's inappropriate joke", day: 2, speaker: "Dot", example: "We're on a nature hike with a college kid. Really, Earl?" },
    { expression: "I've got a rock joke for that", meaning: "それ石のダジャレあるよ", meaningEn: "announcing an incoming pun, typically geology-related", day: 2, speaker: "Javi", example: "You think this sedimentary layer is boring? I've got a rock joke for that. It's pretty gneiss." },
    { expression: "I'm not going any further", meaning: "ここから先は行かない", meaningEn: "setting a firm boundary, refusing to continue", day: 2, speaker: "Gary", example: "See that overhang? I'm not going any further. You all go ahead." },
    { expression: "we'll wait right here", meaning: "ここで待ってるからね", meaningEn: "staying behind with someone who can't continue", day: 2, speaker: "Linda", example: "It's fine, hon. We'll wait right here. Take your time." },
    { expression: "I'll catch up", meaning: "後から追いつくから", meaningEn: "telling others to go ahead while you follow at your own pace", day: 2, speaker: "Gary", example: "Go see the viewpoint. I'll catch up. Just... slowly." },

    // ============================================================
    // DAY 3 -- THE BONDING DAY (15 expressions)
    // Deeper trail, Linda-Dot wine bonding, Gary-Earl "dragged here" bonding
    // ============================================================
    { expression: "I smuggled in a bottle", meaning: "こっそり1本持ってきた", meaningEn: "sneaking prohibited or unexpected items into a location", day: 3, speaker: "Dot", example: "Don't tell the ranger but I smuggled in a bottle of Pinot Grigio in my CamelBak." },
    { expression: "you're my kind of people", meaning: "あんた気が合うわ", meaningEn: "expressing immediate kinship with someone's style or attitude", day: 3, speaker: "Linda", example: "Wine in a hydration pack at the Grand Canyon? You're my kind of people." },
    { expression: "she dragged me here", meaning: "嫁に引っ張ってこられた", meaningEn: "claiming to have been brought somewhere against one's will", day: 3, speaker: "Gary", example: "Between you and me, she dragged me here. I was fine with the couch." },
    { expression: "same here, brother", meaning: "俺もだよ、兄弟", meaningEn: "expressing solidarity with someone's shared experience", day: 3, speaker: "Earl", example: "My wife made me climb Kilimanjaro at sixty. Same here, brother." },
    { expression: "happy wife, happy life", meaning: "嫁が幸せなら全部うまくいく", meaningEn: "humorous cliche about keeping one's spouse satisfied", day: 3, speaker: "Gary", example: "I learned that one early. Happy wife, happy life. So here I am, terrified." },
    { expression: "oh please, you're loving it", meaning: "やめてよ、楽しんでるくせに", meaningEn: "calling out someone who pretends not to enjoy something", day: 3, speaker: "Linda", example: "You teared up at the sunset yesterday. Oh please, you're loving it." },
    { expression: "I had something in my eye", meaning: "目にゴミ入っただけだし", meaningEn: "classic excuse for being caught getting emotional", day: 3, speaker: "Gary", example: "I was NOT tearing up. I had something in my eye. It's the desert. There's dust." },
    { expression: "how long have you two been married", meaning: "結婚何年目？", meaningEn: "standard question between couples getting to know each other", day: 3, speaker: "Dot", example: "You bicker like us. How long have you two been married?" },
    { expression: "thirty years this October", meaning: "今年の10月で30年", meaningEn: "stating a marriage anniversary milestone with quiet pride", day: 3, speaker: "Gary", example: "Thirty years this October. Don't ask me how. She's a saint and I'm a mess." },
    { expression: "the secret is lowered expectations", meaning: "秘訣はハードル下げること", meaningEn: "self-deprecating marriage advice about not expecting perfection", day: 3, speaker: "Earl", example: "People ask how we lasted. The secret is lowered expectations. Right, Dot?" },
    { expression: "he's not wrong", meaning: "間違ってないんだよね", meaningEn: "reluctantly admitting someone's unflattering point is true", day: 3, speaker: "Dot", example: "I stopped expecting him to remember anniversaries in year five. He's not wrong." },
    { expression: "you guys crack me up", meaning: "あんたら最高に面白い", meaningEn: "telling people they're genuinely hilarious", day: 3, speaker: "Linda", example: "You two are like a sitcom. You guys crack me up." },
    { expression: "I could get used to this", meaning: "こういう生活慣れちゃいそう", meaningEn: "finding an experience so pleasant you'd want it regularly", day: 3, speaker: "Linda", example: "Wine, canyon views, no emails. I could get used to this." },
    { expression: "don't give her ideas", meaning: "余計なこと言わないでよ", meaningEn: "warning someone not to suggest something your spouse will want", day: 3, speaker: "Gary", example: "Don't tell her about the RV park. Don't give her ideas." },
    { expression: "what happens at the Canyon stays at the Canyon", meaning: "キャニオンでの出来事はキャニオンだけの秘密", meaningEn: "Vegas-style pact about keeping shared moments private", day: 3, speaker: "Dot", example: "If anyone asks, this was water. What happens at the Canyon stays at the Canyon." },

    // ============================================================
    // DAY 4 -- FACING THE FEAR (15 expressions)
    // Sunset viewpoint, Gary faces fear, Megan FaceTime, emotional moment
    // ============================================================
    { expression: "you don't have to do this", meaning: "無理しなくていいよ", meaningEn: "giving someone permission to back out without judgment", day: 4, speaker: "Linda", example: "Gary, you don't have to do this. Nobody's gonna think less of you." },
    { expression: "no, I want to", meaning: "いや、やりたいんだ", meaningEn: "quietly insisting on doing something despite fear", day: 4, speaker: "Gary", example: "No, I want to. I didn't come all this way to stare at it from the parking lot." },
    { expression: "one step at a time", meaning: "一歩ずつだよ", meaningEn: "encouraging someone to progress slowly and steadily", day: 4, speaker: "Javi", example: "Don't think about the edge. One step at a time. You're doin' great, Gary." },
    { expression: "I've got you", meaning: "俺がついてるから", meaningEn: "assuring someone you'll support or catch them", day: 4, speaker: "Linda", example: "Hold my hand. I've got you. I'm not lettin' go." },
    { expression: "my hands are shaking", meaning: "手が震えてる", meaningEn: "physical symptom of fear or adrenaline", day: 4, speaker: "Gary", example: "Can you tell? My hands are shaking. Don't put that on Instagram." },
    { expression: "are you CRYING right now", meaning: "え、今泣いてるの？", meaningEn: "surprised reaction to someone getting emotional", day: 4, speaker: "Linda", example: "Gary. Are you CRYING right now? At the sunset?" },
    { expression: "it's just a lot to take in", meaning: "ちょっと感動しすぎて", meaningEn: "being overwhelmed by beauty or significance of a moment", day: 4, speaker: "Gary", example: "I'm fine. It's just a lot to take in. Fifty-five years and I never did anything like this." },
    { expression: "I'm so proud of you", meaning: "ほんとに誇りに思う", meaningEn: "expressing genuine admiration for someone's courage", day: 4, speaker: "Linda", example: "You walked to the edge. YOU. I'm so proud of you, you stubborn man." },
    { expression: "Dad, can you hear me?", meaning: "パパ、聞こえる？", meaningEn: "opening line of a shaky video call", day: 4, speaker: "Megan", example: "Dad, can you hear me? The connection's terrible. Turn the phone around, show me!" },
    { expression: "please be careful", meaning: "お願いだから気をつけて", meaningEn: "worried plea from someone who can't be there in person", day: 4, speaker: "Megan", example: "Mom said you hiked to a ledge? Please be careful. You're giving me a heart attack." },
    { expression: "I wish you were here", meaning: "ここにいてほしかったな", meaningEn: "missing someone's presence at a meaningful moment", day: 4, speaker: "Gary", example: "Megs, the sky is orange and purple and I wish you were here. Next time, okay?" },
    { expression: "you're making me cry", meaning: "泣かせないでよ", meaningEn: "someone's words or actions are triggering your tears", day: 4, speaker: "Megan", example: "Dad, stop. You're making me cry at work. My mascara." },
    { expression: "this is the best day of my life", meaning: "今日は人生最高の日だ", meaningEn: "declaring a day as a peak life experience", day: 4, speaker: "Gary", example: "I'm standin' at the Grand Canyon with my girl, watchin' the sun go down. This is the best day of my life." },
    { expression: "I didn't think I had it in me", meaning: "自分にできると思ってなかった", meaningEn: "surprised by your own courage or capability", day: 4, speaker: "Gary", example: "I've been scared of heights since I was eight. I didn't think I had it in me." },
    { expression: "you've always had it in you", meaning: "ずっとできる人だったよ", meaningEn: "telling someone their courage was always there, just untapped", day: 4, speaker: "Linda", example: "Gary, you raised a kid, worked thirty years, and never complained. You've always had it in you." },

    // ============================================================
    // DAY 5 -- THE GOODBYE (15 expressions)
    // Gift shop, reflection, 30 years of marriage, tearful goodbye
    // ============================================================
    { expression: "do we really need another magnet", meaning: "ほんとにまたマグネット買うの", meaningEn: "questioning a spouse's souvenir purchases", day: 5, speaker: "Gary", example: "We have magnets from every state. Do we really need another magnet?" },
    { expression: "it's for the fridge collection", meaning: "冷蔵庫のコレクション用だから", meaningEn: "justifying a purchase by referencing an ongoing collection", day: 5, speaker: "Linda", example: "It's for the fridge collection. Don't give me that look." },
    { expression: "I don't wanna leave", meaning: "帰りたくない", meaningEn: "reluctance to end a wonderful experience", day: 5, speaker: "Linda", example: "Can we just stay one more day? I don't wanna leave." },
    { expression: "we'll come back", meaning: "また来るよ", meaningEn: "promising a return visit, sincere or aspirational", day: 5, speaker: "Gary", example: "We'll come back. Maybe bring Megan and the grandkids next time." },
    { expression: "you always say that", meaning: "いっつもそう言うよね", meaningEn: "pointing out someone makes promises they rarely keep", day: 5, speaker: "Linda", example: "You said that about Hawaii too. You always say that." },
    { expression: "this time I mean it", meaning: "今回はマジだから", meaningEn: "insisting a promise is genuine, implying past ones weren't", day: 5, speaker: "Gary", example: "I'm already lookin' at flights for Thanksgiving. This time I mean it." },
    { expression: "I can't believe it's already over", meaning: "もう終わりなんて信じられない", meaningEn: "disbelief at how quickly a good experience ended", day: 5, speaker: "Linda", example: "Five days felt like five minutes. I can't believe it's already over." },
    { expression: "keep in touch", meaning: "連絡取り合おうね", meaningEn: "parting request to maintain a new friendship", day: 5, speaker: "Linda", example: "Dot, I mean it. Keep in touch. I need your wine recommendations." },
    { expression: "you two are the real deal", meaning: "あんたたちほんと本物のカップルだよ", meaningEn: "complimenting a couple's genuine, lasting relationship", day: 5, speaker: "Earl", example: "Thirty years and she still holds his hand on a cliff. You two are the real deal." },
    { expression: "I married up", meaning: "俺にはもったいない嫁だよ", meaningEn: "admitting your spouse is better than you deserve", day: 5, speaker: "Gary", example: "She's smarter, funnier, braver. I married up and I know it." },
    { expression: "oh stop it", meaning: "もうやめてよ（照）", meaningEn: "deflecting a compliment while secretly pleased", day: 5, speaker: "Linda", example: "Oh stop it. You're just sayin' that 'cause Earl's watchin'." },
    { expression: "who knew we needed this", meaning: "こんなに必要だったとはね", meaningEn: "realizing a trip or experience was more important than expected", day: 5, speaker: "Gary", example: "I thought it was just a trip. Who knew we needed this." },
    { expression: "thank you for making me come", meaning: "連れてきてくれてありがとう", meaningEn: "thanking someone for pushing you into something you resisted", day: 5, speaker: "Gary", example: "I fought you on this for three years. Thank you for making me come." },
    { expression: "that's the nicest thing you've said in thirty years", meaning: "30年で一番いいこと言ったね", meaningEn: "exaggerated praise for a rare sentimental statement from a partner", day: 5, speaker: "Linda", example: "Gary. That's the nicest thing you've said in thirty years. I'm screenshotting this moment." },
    { expression: "same time next year?", meaning: "来年も同じ時期に来る？", meaningEn: "proposing a reunion or repeat trip, implying the experience was life-changing", day: 5, speaker: "Dot", example: "Yellowstone's on our list. Same time next year? All four of us." },
];

export const BUCKET_LIST_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_BUCKET_LIST_EXPRESSIONS = BUCKET_LIST_EXPRESSIONS.length;

export const BUCKET_LIST_DAY_IDS: Record<number, string> = {
    1: 'bucketlist-day1',
    2: 'bucketlist-day2',
    3: 'bucketlist-day3',
    4: 'bucketlist-day4',
    5: 'bucketlist-day5',
};

/**
 * Find which Memoria line an expression links to
 * Returns the line index in the conversation for deep-linking
 */
export function findBucketListExpressionLineIndex(
    expressionText: string,
    conversationLines: Array<{ text: string }>
): number {
    const clean = expressionText.toLowerCase();
    const idx = conversationLines.findIndex(line =>
        line.text.toLowerCase().includes(clean)
    );
    return idx >= 0 ? idx : 0;
}
