/**
 * The Great American Road Trip Expressions -- casual expressions from the Road Trip scenario
 * 150 expressions across 10 days (15 per day), all commonly used in spoken English
 * Characters: Walt(78M), Roy(49M), Lori(46F), Paige(16F), Sam(11M), Rhonda(52F),
 *   plus guests Flo, Bud, Pat, Ranger Kim, Duke
 */

export interface RoadTripExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const ROAD_TRIP_EXPRESSIONS: RoadTripExpression[] = [
    // ============================================================
    // DAY 1 -- LEAVING NEW JERSEY (15 expressions)
    // ============================================================
    { expression: "status check", meaning: "状況確認", meaningEn: "asking everyone to report if they're ready", day: 1, speaker: "Roy", example: "Okay, status check. Everybody used the bathroom?" },
    { expression: "no exceptions", meaning: "例外なし", meaningEn: "stating a rule allows no special cases", day: 1, speaker: "Roy", example: "This van is in motion for the next two hours, no exceptions." },
    { expression: "like a hostage situation", meaning: "立てこもり事件みたいに", meaningEn: "mocking someone for being too controlling", day: 1, speaker: "Lori", example: "You cannot run this trip like a hostage situation." },
    { expression: "In my day", meaning: "わしの時代は", meaningEn: "an older person comparing now to the past", day: 1, speaker: "Walt", example: "In my day we drove to Florida on one tank of gas." },
    { expression: "respected the journey", meaning: "旅というものを敬った", meaningEn: "valuing the experience of traveling itself", day: 1, speaker: "Walt", example: "You just held it and you respected the journey." },
    { expression: "I named the van", meaning: "車に名前をつけた", meaningEn: "a child personifying an object", day: 1, speaker: "Sam", example: "I named the van. Her name is Bessie." },
    { expression: "before coffee", meaning: "コーヒーの前に", meaningEn: "before being awake enough to deal with things", day: 1, speaker: "Roy", example: "Do not film me before coffee. That's the rule." },
    { expression: "That's the rule", meaning: "それがルールだ", meaningEn: "stating something is a firm policy", day: 1, speaker: "Roy", example: "Do not film me before coffee. That's the rule." },
    { expression: "a stranger in a box", meaning: "箱に入った他人", meaningEn: "dismissively describing a GPS or device", day: 1, speaker: "Walt", example: "The GPS is a stranger in a box." },
    { expression: "we're going right", meaning: "右に行く", meaningEn: "firmly deciding a direction despite objection", day: 1, speaker: "Roy", example: "We're going right, Walt. I love you, but we're going right." },
    { expression: "I love you, but", meaning: "愛してるけど", meaningEn: "softening a refusal to a loved one", day: 1, speaker: "Roy", example: "I love you, but we're going right." },
    { expression: "Are we there yet", meaning: "まだ着かないの", meaningEn: "a child's classic impatient travel question", day: 1, speaker: "Sam", example: "Are we there yet?" },
    { expression: "I called it", meaning: "僕が最初に言った", meaningEn: "claiming you said or predicted something first", day: 1, speaker: "Sam", example: "Now it's official. I called it." },
    { expression: "on a loop", meaning: "ループで", meaningEn: "the same thing repeating over and over", day: 1, speaker: "Paige", example: "Grandpa fighting the GPS and Sam asking if we're there yet, on a loop." },
    { expression: "Here we go", meaning: "さあ行くぞ", meaningEn: "announcing the start of something", day: 1, speaker: "Lori", example: "Everybody, say goodbye to New Jersey. Here we go." },

    // ============================================================
    // DAY 2 -- THE DINER (15 expressions)
    // ============================================================
    { expression: "making a noise", meaning: "音を出してる", meaningEn: "noticing a machine sounds wrong", day: 2, speaker: "Roy", example: "Okay, Bessie is making a noise. It's a clunk." },
    { expression: "I'd know it anywhere", meaning: "どこでも聞き分けられる", meaningEn: "claiming deep familiarity with something", day: 2, speaker: "Walt", example: "That's a transmission clunk. I'd know it anywhere." },
    { expression: "travel in pairs", meaning: "二つで一組", meaningEn: "two things always found together", day: 2, speaker: "Walt", example: "Diners and mechanics travel in pairs." },
    { expression: "Sit anywhere", meaning: "好きなとこに座って", meaningEn: "casually telling guests to seat themselves", day: 2, speaker: "Flo", example: "Sit anywhere, hon. Six of you?" },
    { expression: "let me guess", meaning: "当てましょうか", meaningEn: "playfully predicting what someone wants", day: 2, speaker: "Flo", example: "Coffee for the grownups, and let me guess -- chocolate milk?" },
    { expression: "read a kid like a menu", meaning: "子供をメニューみたいに読める", meaningEn: "claiming you can size someone up instantly", day: 2, speaker: "Flo", example: "I can read a kid like a menu. You're a rock man." },
    { expression: "store-bought", meaning: "市販品", meaningEn: "not homemade; bought from a shop", day: 2, speaker: "Walt", example: "Don't tell me it's store-bought, because I will know." },
    { expression: "I will know", meaning: "分かるからな", meaningEn: "warning you can detect a lie or cheat", day: 2, speaker: "Walt", example: "Don't tell me it's store-bought, because I will know." },
    { expression: "sorry to butt in", meaning: "割り込んでごめん", meaningEn: "apologizing for joining a conversation uninvited", day: 2, speaker: "Rhonda", example: "Hey -- sorry to butt in. I couldn't help overhearing." },
    { expression: "I couldn't help overhearing", meaning: "聞こえちゃって", meaningEn: "explaining you accidentally heard something", day: 2, speaker: "Rhonda", example: "Sorry to butt in. I couldn't help overhearing." },
    { expression: "more or less", meaning: "大体", meaningEn: "approximately; roughly the same", day: 2, speaker: "Rhonda", example: "I'm headed the same direction, more or less." },
    { expression: "saved the whole trip", meaning: "旅行ごと救った", meaningEn: "rescuing a situation completely", day: 2, speaker: "Roy", example: "You might've just saved the whole trip." },
    { expression: "coast to coast", meaning: "海岸から海岸まで", meaningEn: "across the whole country, ocean to ocean", day: 2, speaker: "Rhonda", example: "She and I are doing the whole country this summer, coast to coast." },
    { expression: "no schedule", meaning: "予定なし", meaningEn: "traveling freely without a fixed plan", day: 2, speaker: "Rhonda", example: "Coast to coast, no schedule. Just me and the road." },
    { expression: "fair warning", meaning: "先に言っとくけど", meaningEn: "alerting someone before they find out", day: 2, speaker: "Rhonda", example: "Sure, kid. But fair warning, I'm boring once you get to know me." },

    // ============================================================
    // DAY 3 -- THE BIG CITY (15 expressions)
    // ============================================================
    { expression: "circled this block", meaning: "このブロックを回った", meaningEn: "driving around repeatedly looking for parking", day: 3, speaker: "Roy", example: "I have circled this block four times. Four." },
    { expression: "There is no parking", meaning: "駐車場がない", meaningEn: "complaining no spaces are available", day: 3, speaker: "Roy", example: "There is no parking in this entire city." },
    { expression: "look up", meaning: "上を見て", meaningEn: "telling someone to raise their eyes in awe", day: 3, speaker: "Paige", example: "Dad, look UP. The buildings just keep going." },
    { expression: "the coolest place", meaning: "一番かっこいい場所", meaningEn: "a teen's highest praise for somewhere", day: 3, speaker: "Paige", example: "This is the coolest place I've ever been in my entire life." },
    { expression: "too tall", meaning: "高すぎる", meaningEn: "complaining buildings block the view", day: 3, speaker: "Walt", example: "It's too tall. The whole place is too tall." },
    { expression: "can't trust a place", meaning: "信用できない場所", meaningEn: "deeply distrusting somewhere unfamiliar", day: 3, speaker: "Walt", example: "You can't trust a place where you can't see the horizon." },
    { expression: "all happening at once", meaning: "全部いっぺんに起きてる", meaningEn: "many things occurring simultaneously", day: 3, speaker: "Lori", example: "A million different days, all happening at once." },
    { expression: "That's deep", meaning: "深いね", meaningEn: "acknowledging an unexpectedly profound remark", day: 3, speaker: "Paige", example: "That's deep, Mom. I'm using that." },
    { expression: "forget parking", meaning: "駐車場は諦めた", meaningEn: "giving up on a frustrating effort", day: 3, speaker: "Roy", example: "Okay forget parking, I'm paying for a garage." },
    { expression: "when I was your age", meaning: "わしが若い頃は", meaningEn: "an elder lecturing about how things used to be", day: 3, speaker: "Walt", example: "When I was your age you could see a movie, buy dinner, and still have change." },
    { expression: "I'll allow it", meaning: "認めてやる", meaningEn: "grudgingly granting approval", day: 3, speaker: "Walt", example: "Now THIS I'll allow. This city does one thing right." },
    { expression: "Documentary gold", meaning: "ドキュメンタリーの金脈", meaningEn: "a perfect moment to capture on film", day: 3, speaker: "Paige", example: "Grandpa's first compliment and it's about cheese. Documentary gold." },
    { expression: "You don't get it", meaning: "分かってないよ", meaningEn: "insisting someone fails to understand", day: 3, speaker: "Sam", example: "It's not the SAME rock. You don't get it." },
    { expression: "He's not wrong", meaning: "間違ってない", meaningEn: "conceding someone has a valid point", day: 3, speaker: "Walt", example: "...He's not wrong, you know. Kid's got a point." },
    { expression: "Kid's got a point", meaning: "一理ある", meaningEn: "admitting a child made a fair argument", day: 3, speaker: "Walt", example: "He's not wrong, you know. Kid's got a point." },

    // ============================================================
    // DAY 4 -- THE CORNFIELDS (15 expressions)
    // ============================================================
    { expression: "keeping count", meaning: "数えてる", meaningEn: "tracking a running total of something", day: 4, speaker: "Sam", example: "I have now seen one billion corns. I am keeping count." },
    { expression: "nothing to film", meaning: "撮るものがない", meaningEn: "complaining there's nothing interesting around", day: 4, speaker: "Paige", example: "There is genuinely nothing to film." },
    { expression: "new game", meaning: "新しいゲーム", meaningEn: "proposing a fresh activity to pass time", day: 4, speaker: "Roy", example: "Okay, new game. License plate game." },
    { expression: "Pull over", meaning: "車を停めろ", meaningEn: "telling the driver to stop at the roadside", day: 4, speaker: "Walt", example: "Pull over. Right there. That sign." },
    { expression: "the whole point", meaning: "肝心なところ", meaningEn: "the entire reason for doing something", day: 4, speaker: "Walt", example: "You stop for the frying pan. That's the whole point." },
    { expression: "a tourist trap", meaning: "観光客の罠", meaningEn: "an overpriced attraction that lures travelers", day: 4, speaker: "Roy", example: "Walt, it's a tourist trap." },
    { expression: "five dollars a head", meaning: "1人5ドル", meaningEn: "charging a price per person", day: 4, speaker: "Bud", example: "Five dollars a head, kids under ten are four-fifty." },
    { expression: "it's huge", meaning: "デカい", meaningEn: "exclaiming something is enormous", day: 4, speaker: "Sam", example: "It's HUGE. Dad, it's actually huge." },
    { expression: "I need to know everything", meaning: "全部知りたい", meaningEn: "a child's intense curiosity about a thing", day: 4, speaker: "Sam", example: "I need to know everything about this pan." },
    { expression: "made the local paper", meaning: "地元紙に載った", meaningEn: "being notable enough for the town newspaper", day: 4, speaker: "Bud", example: "Took six men to stir it. Made the local paper." },
    { expression: "real Americana", meaning: "本物のアメリカーナ", meaningEn: "an authentic slice of American culture", day: 4, speaker: "Paige", example: "I'm not even being sarcastic. This is real Americana." },
    { expression: "I'm not even being sarcastic", meaning: "皮肉抜きで", meaningEn: "clarifying you genuinely mean something", day: 4, speaker: "Paige", example: "This is the best thing I've filmed. I'm not even being sarcastic." },
    { expression: "a bucket list thing", meaning: "バケットリストの項目", meaningEn: "something you want to do before you die", day: 4, speaker: "Roy", example: "It's not a bucket list thing. We're finishing it." },
    { expression: "Funny what you put off", meaning: "先延ばしにするものは妙だ", meaningEn: "reflecting on how we delay important things", day: 4, speaker: "Walt", example: "Sixty years I've been meaning to go back. Funny what you put off." },
    { expression: "priorities straight", meaning: "優先順位がしっかり", meaningEn: "having the right things in the right order", day: 4, speaker: "Walt", example: "A boy who loves a frying pan is a boy with his priorities straight." },

    // ============================================================
    // DAY 5 -- THE FACES & THE MOTEL (15 expressions)
    // ============================================================
    { expression: "actually amazing", meaning: "本当にすごい", meaningEn: "admitting something exceeded low expectations", day: 5, speaker: "Paige", example: "Okay this is actually amazing. The scale is insane." },
    { expression: "The scale is insane", meaning: "スケールがやばい", meaningEn: "marveling at how huge something is", day: 5, speaker: "Paige", example: "Okay this is actually amazing. The scale is insane." },
    { expression: "put things in perspective", meaning: "物の見方が変わる", meaningEn: "making your own problems seem small", day: 5, speaker: "Lori", example: "It really does put things in perspective." },
    { expression: "getting dark", meaning: "暗くなってきた", meaningEn: "noticing nightfall is approaching", day: 5, speaker: "Roy", example: "Perspective's great, but it's getting dark." },
    { expression: "basically free", meaning: "実質タダ", meaningEn: "so cheap it's almost nothing", day: 5, speaker: "Roy", example: "For six people, fifty-nine dollars is basically free." },
    { expression: "Are we sure about this", meaning: "これ本当に大丈夫", meaningEn: "expressing doubt about a sketchy choice", day: 5, speaker: "Paige", example: "It now says 'eepy ine.' Are we sure about this." },
    { expression: "Don't ask about the pool", meaning: "プールのことは聞かないで", meaningEn: "deflecting a question about something broken", day: 5, speaker: "Pat", example: "The pool does not work. Don't ask about the pool." },
    { expression: "I call the crib", meaning: "ベビーベッドは僕の", meaningEn: "claiming something for yourself first", day: 5, speaker: "Sam", example: "This is kind of awesome, I call the crib." },
    { expression: "now you're talking", meaning: "それでこそだ", meaningEn: "showing enthusiastic approval of an idea", day: 5, speaker: "Walt", example: "Fifty-nine dollars. NOW you're talking, Roy." },
    { expression: "What more does a man need", meaning: "これ以上何が要る", meaningEn: "saying simple things are all you want", day: 5, speaker: "Walt", example: "A clean bed and a working ice machine. What more does a man need." },
    { expression: "the cross-country thing", meaning: "横断旅行ってやつ", meaningEn: "casually referring to a coast-to-coast trip", day: 5, speaker: "Pat", example: "You folks doing the cross-country thing? I get a lot of you in summer." },
    { expression: "never want it to end", meaning: "終わってほしくない", meaningEn: "wishing a good experience would continue", day: 5, speaker: "Pat", example: "Half of you want to go home, half of you never want it to end." },
    { expression: "How did you know", meaning: "なんで分かるの", meaningEn: "surprised someone read you correctly", day: 5, speaker: "Lori", example: "That's exactly it. How did you know that's exactly it?" },
    { expression: "We need a system", meaning: "システムが要る", meaningEn: "proposing an organized way to share something", day: 5, speaker: "Roy", example: "Six of us, one bathroom. We need a system." },
    { expression: "the closest we've all been in years", meaning: "ここ数年で一番近い", meaningEn: "noting a rare moment of family closeness", day: 5, speaker: "Lori", example: "This is the closest we've all been in years." },

    // ============================================================
    // DAY 6 -- YELLOWSTONE (15 expressions)
    // ============================================================
    { expression: "Is the earth okay", meaning: "地球大丈夫", meaningEn: "a child's worried reaction to nature", day: 6, speaker: "Sam", example: "There's a hole in the earth and it's breathing. Is the earth okay?" },
    { expression: "That's a geyser", meaning: "あれは間欠泉", meaningEn: "explaining what a natural feature is", day: 6, speaker: "Paige", example: "That's a geyser, dummy, it shoots boiling water a hundred feet up." },
    { expression: "the real thing", meaning: "本物", meaningEn: "the authentic version, not an imitation", day: 6, speaker: "Walt", example: "None of those tall buildings. This is the real thing." },
    { expression: "completely stopped", meaning: "完全に停まった", meaningEn: "at a total standstill in traffic", day: 6, speaker: "Roy", example: "Okay we're completely stopped. Total standstill." },
    { expression: "the hard way", meaning: "痛い目で", meaningEn: "learning a lesson through a bad experience", day: 6, speaker: "Ranger Kim", example: "Somebody tries to take a selfie and learns that the hard way." },
    { expression: "keep your windows up", meaning: "窓を閉めて", meaningEn: "a safety instruction near wildlife", day: 6, speaker: "Ranger Kim", example: "Folks, keep your windows up and stay in the vehicle." },
    { expression: "roll it up", meaning: "窓を閉めて", meaningEn: "telling someone to close a car window", day: 6, speaker: "Lori", example: "Roy, roll it up, roll the window up." },
    { expression: "They'll move when they move", meaning: "動くときに動く", meaningEn: "you can't rush something out of your control", day: 6, speaker: "Ranger Kim", example: "They'll move when they move. That's the rule out here." },
    { expression: "the best footage", meaning: "一番いい映像", meaningEn: "the most valuable thing filmed so far", day: 6, speaker: "Paige", example: "This is the best footage of the entire trip." },
    { expression: "I could not write this", meaning: "こんなの書けない", meaningEn: "amazed that real life beats anything scripted", day: 6, speaker: "Paige", example: "Grandpa being proven right by a buffalo. I could not write this." },
    { expression: "Grab all you want", meaning: "好きなだけどうぞ", meaningEn: "permission to take as much as you like", day: 6, speaker: "Ranger Kim", example: "Just outside the gate? Grab all you want." },
    { expression: "That's fair", meaning: "それは公平だ", meaningEn: "accepting something as reasonable", day: 6, speaker: "Sam", example: "That's fair. That's actually really fair." },
    { expression: "I respect that", meaning: "それは尊重する", meaningEn: "approving of someone's reasoning or choice", day: 6, speaker: "Sam", example: "The next kid should find their own Wyoming. I respect that." },
    { expression: "worth the wait", meaning: "待った甲斐があった", meaningEn: "saying a long delay was justified", day: 6, speaker: "Walt", example: "It was worth the wait just for this one valley." },
    { expression: "a little misty", meaning: "ちょっと目が潤んでる", meaningEn: "getting slightly teary with emotion", day: 6, speaker: "Lori", example: "Are you crying, Dad? You're a little misty." },

    // ============================================================
    // DAY 7 -- STRANDED (15 expressions)
    // ============================================================
    { expression: "a death rattle", meaning: "死に際の音", meaningEn: "the sound of a machine about to fail", day: 7, speaker: "Roy", example: "That's not a clunk anymore. That's a death rattle." },
    { expression: "We are coasting", meaning: "惰性で進んでる", meaningEn: "rolling with no engine power", day: 7, speaker: "Roy", example: "We are coasting. We are officially coasting." },
    { expression: "get us to the shoulder", meaning: "路肩に寄せて", meaningEn: "telling the driver to pull onto the roadside", day: 7, speaker: "Lori", example: "Roy, get us to the shoulder. Get us off the road." },
    { expression: "She's done", meaning: "もう終わりだ", meaningEn: "declaring a machine has completely failed", day: 7, speaker: "Walt", example: "This is the whole heart of her. She's done." },
    { expression: "Zero bars", meaning: "電波ゼロ本", meaningEn: "having no cell signal at all", day: 7, speaker: "Paige", example: "There's no signal. Zero bars. Anyone?" },
    { expression: "nobody panics", meaning: "誰もパニックにならない", meaningEn: "telling a group to stay calm in a crisis", day: 7, speaker: "Roy", example: "Okay, nobody panics. We have water and shade." },
    { expression: "white-knuckling", meaning: "気を張りつめて", meaningEn: "gripping with tension and anxiety", day: 7, speaker: "Lori", example: "You've been white-knuckling this whole trip about the budget." },
    { expression: "admit it's bad", meaning: "最悪だと認める", meaningEn: "acknowledging a situation is genuinely bad", day: 7, speaker: "Lori", example: "Can we just admit it's bad and then deal with it?" },
    { expression: "You can't budget your way out of the desert", meaning: "予算管理じゃ砂漠から抜け出せない", meaningEn: "some problems money can't solve", day: 7, speaker: "Roy", example: "You can't budget your way out of the desert. I'm sorry, everybody." },
    { expression: "so happy to see", meaning: "見られて嬉しい", meaningEn: "intensely relieved someone showed up", day: 7, speaker: "Roy", example: "I have never been so happy to see a person on a motorcycle." },
    { expression: "Sit tight", meaning: "じっとして", meaningEn: "telling someone to wait calmly where they are", day: 7, speaker: "Rhonda", example: "Sit tight, drink your water, I'll call him in." },
    { expression: "owes me a favor", meaning: "私に借りがある", meaningEn: "someone is obligated to help you back", day: 7, speaker: "Rhonda", example: "There's a tow guy named Duke, he owes me a favor." },
    { expression: "not gonna lie to you", meaning: "嘘はつかない", meaningEn: "prefacing an honest, often bad, truth", day: 7, speaker: "Duke", example: "I'm not gonna lie to you, this old girl's not driving anywhere again." },
    { expression: "She earned it", meaning: "その資格がある", meaningEn: "saying someone or something deserves it", day: 7, speaker: "Walt", example: "Say something for Bessie. She earned it." },
    { expression: "this far to quit", meaning: "ここまで来て諦める", meaningEn: "refusing to give up after coming so far", day: 7, speaker: "Rhonda", example: "You did not come this far to quit in Utah." },

    // ============================================================
    // DAY 8 -- LAS VEGAS (15 expressions)
    // ============================================================
    { expression: "almost died in a desert", meaning: "砂漠で死にかけた", meaningEn: "exaggerating a recent ordeal for contrast", day: 8, speaker: "Sam", example: "Yesterday we almost died in a desert and today everything is made of LIGHTS." },
    { expression: "The whiplash is unreal", meaning: "落差がありえない", meaningEn: "stunned by a sudden, jarring change", day: 8, speaker: "Paige", example: "The whiplash is unreal. Most natural place to most fake place in a day." },
    { expression: "Don't tell your mother", meaning: "母さんには言うな", meaningEn: "jokingly sharing a guilty admission", day: 8, speaker: "Walt", example: "I love it. Don't tell your mother I love it." },
    { expression: "I looked at the prices", meaning: "値段を見た", meaningEn: "reacting with shock to high costs", day: 8, speaker: "Roy", example: "Okay, I looked at the prices. A bottle of water is nine dollars." },
    { expression: "I cannot, I will not", meaning: "無理だ、絶対やらん", meaningEn: "dramatically refusing to accept something", day: 8, speaker: "Roy", example: "We crossed a country for less than one Vegas water. I cannot, I will not." },
    { expression: "You're completely right", meaning: "完全に正しい", meaningEn: "fully conceding the other person's point", day: 8, speaker: "Roy", example: "You're right. You're completely right. Give me the nine dollar water." },
    { expression: "tempt fate", meaning: "運を試す", meaningEn: "taking a risk and daring bad luck", day: 8, speaker: "Walt", example: "A man's allowed to sit down at one slot machine and tempt fate." },
    { expression: "Stand back", meaning: "下がってろ", meaningEn: "playfully telling people to give you room", day: 8, speaker: "Walt", example: "I've got twenty dollars and a feeling. Stand back." },
    { expression: "very good", meaning: "すごくいい", meaningEn: "strongly confirming something is positive", day: 8, speaker: "Walt", example: "That noise is VERY good, Sam." },
    { expression: "leaving immediately", meaning: "今すぐ出る", meaningEn: "deciding to quit while ahead, right now", day: 8, speaker: "Walt", example: "I have beaten Las Vegas. We are leaving immediately." },
    { expression: "cash out", meaning: "換金する", meaningEn: "collecting your winnings and stopping", day: 8, speaker: "Lori", example: "You're right. Cash out. We're taking your winnings and buying dinner." },
    { expression: "Dinner's on me", meaning: "夕飯はおごる", meaningEn: "offering to pay for everyone's meal", day: 8, speaker: "Walt", example: "Dinner's on me. First time this whole trip the old man's buying." },
    { expression: "the best night of my entire life", meaning: "人生で最高の夜", meaningEn: "a child declaring a peak moment", day: 8, speaker: "Sam", example: "TWO desserts? This is the best night of my entire life." },
    { expression: "quit while he was ahead", meaning: "勝ち逃げした", meaningEn: "stopping at the perfect winning moment", day: 8, speaker: "Lori", example: "The only man alive who beat this city and quit while he was ahead." },
    { expression: "understood the assignment", meaning: "任務を理解した", meaningEn: "did exactly what was needed, perfectly", day: 8, speaker: "Lori", example: "She got us to Vegas and then retired. A van that understood the assignment." },

    // ============================================================
    // DAY 9 -- THE LAST NIGHT (15 expressions)
    // ============================================================
    { expression: "crossed into California", meaning: "カリフォルニアに入った", meaningEn: "entering a new state on a journey", day: 9, speaker: "Roy", example: "We crossed into California. There's the sign." },
    { expression: "tired in a good way", meaning: "いい意味で疲れてる", meaningEn: "pleasantly worn out from a good experience", day: 9, speaker: "Paige", example: "I think we're tired in a good way." },
    { expression: "the whole trip in a sock", meaning: "旅行まるごとが靴下の中", meaningEn: "a child's quirky way of holding memories", day: 9, speaker: "Sam", example: "Then the collection's complete. The whole trip in a sock." },
    { expression: "stop here for the night", meaning: "今夜はここで泊まる", meaningEn: "deciding where to rest until morning", day: 9, speaker: "Lori", example: "Let's stop here for the night. One more cheap motel." },
    { expression: "Should I get the camera", meaning: "カメラ取ってこようか", meaningEn: "wondering whether to film a moment", day: 9, speaker: "Paige", example: "Should I get the camera? ...No. This one's just for us." },
    { expression: "just for us", meaning: "私たちだけのやつ", meaningEn: "a private moment not meant to be shared", day: 9, speaker: "Paige", example: "I'm not getting the camera. This one's just for us." },
    { expression: "ran out of next years", meaning: "来年が尽きた", meaningEn: "ran out of time to do a delayed plan", day: 9, speaker: "Walt", example: "We kept saying next year, and then we ran out of next years." },
    { expression: "kind of coming too", meaning: "なんか一緒に来てる", meaningEn: "a gentle way of saying someone is present in spirit", day: 9, speaker: "Sam", example: "So Grandma's kind of coming too? Because we're all there for her?" },
    { expression: "You understood it faster", meaning: "早く分かった", meaningEn: "praising someone for grasping it quickly", day: 9, speaker: "Walt", example: "You understood it faster than the grownups." },
    { expression: "Pick a good one", meaning: "いいのを選べ", meaningEn: "telling someone to choose carefully", day: 9, speaker: "Walt", example: "Bring a rock for her. Pick a good one." },
    { expression: "I should've asked sooner", meaning: "もっと早く聞くべきだった", meaningEn: "regretting not understanding earlier", day: 9, speaker: "Roy", example: "I'm sorry, Walt. I should've asked sooner why this mattered." },
    { expression: "You got us here", meaning: "ここまで連れてきた", meaningEn: "crediting someone for getting the group through", day: 9, speaker: "Walt", example: "You didn't miss it, son. You got us here." },
    { expression: "That's not nothing", meaning: "何でもなくない", meaningEn: "insisting something actually matters a lot", day: 9, speaker: "Walt", example: "That's not nothing. That's everything." },
    { expression: "Some things you just keep", meaning: "とっておくものもある", meaningEn: "some moments are private, not for sharing", day: 9, speaker: "Paige", example: "I'm really glad I didn't film that. Some things you just keep." },
    { expression: "Get some sleep", meaning: "寝なさい", meaningEn: "telling everyone to rest for the night", day: 9, speaker: "Lori", example: "Get some sleep, everybody. Last night on the road." },

    // ============================================================
    // DAY 10 -- THE PACIFIC (15 expressions)
    // ============================================================
    { expression: "the road's running out", meaning: "道が尽きてきた", meaningEn: "approaching the very end of the drive", day: 10, speaker: "Roy", example: "Okay, the road's running out. The GPS says four hundred feet." },
    { expression: "There it is", meaning: "あった", meaningEn: "pointing out the long-awaited destination", day: 10, speaker: "Roy", example: "Look straight ahead. There it is. That's the Pacific." },
    { expression: "I'm filming this and I'm crying", meaning: "撮ってて泣いてる", meaningEn: "overcome with emotion at a big moment", day: 10, speaker: "Paige", example: "I'm filming this and I'm crying and I can't keep the camera still." },
    { expression: "I waited sixty years", meaning: "60年待った", meaningEn: "stressing how long you longed for this", day: 10, speaker: "Walt", example: "No, I waited sixty years, I'm not doing it alone now." },
    { expression: "Take your shoes off", meaning: "靴を脱いで", meaningEn: "telling people to feel the moment barefoot", day: 10, speaker: "Lori", example: "Take your shoes off, Sam. You too, Dad." },
    { expression: "We made it", meaning: "着いた / やり遂げた", meaningEn: "celebrating finally reaching the goal", day: 10, speaker: "Lori", example: "Feel the water. We made it. We actually made it." },
    { expression: "It's cold", meaning: "冷たい", meaningEn: "reacting to chilly water touching you", day: 10, speaker: "Walt", example: "It's cold. Sixty years of waiting and it freezes my feet." },
    { expression: "She'd have loved that", meaning: "あいつは喜んだろう", meaningEn: "imagining how a lost loved one would react", day: 10, speaker: "Walt", example: "She'd have loved that. Your grandmother. She'd have laughed at me." },
    { expression: "You do it, Sam", meaning: "お前がやれ", meaningEn: "handing a meaningful task to someone else", day: 10, speaker: "Walt", example: "You do it, Sam. You understood this trip better than any of us." },
    { expression: "Took me long enough", meaning: "ずいぶんかかった", meaningEn: "wryly noting how long something took", day: 10, speaker: "Walt", example: "We made it, love. Took me long enough." },
    { expression: "right on time", meaning: "ちょうど間に合った", meaningEn: "arriving at the perfect moment", day: 10, speaker: "Rhonda", example: "Looks like I got here right on time. He made it, huh?" },
    { expression: "everybody who matters", meaning: "大事な人みんな", meaningEn: "all the people who are important to you", day: 10, speaker: "Paige", example: "Now everybody's here, everybody who matters." },
    { expression: "Get in the shot", meaning: "写真に入って", meaningEn: "telling people to join a photo", day: 10, speaker: "Paige", example: "Get in the shot, all of you, I'm setting the timer." },
    { expression: "I wouldn't change one wrong turn", meaning: "曲がり間違い一つも変えない", meaningEn: "saying even the mistakes were worth it", day: 10, speaker: "Roy", example: "Standing in the Pacific with my whole family. I wouldn't change one wrong turn." },
    { expression: "Same time next year", meaning: "来年も同じ時期に", meaningEn: "proposing to repeat a trip annually", day: 10, speaker: "Walt", example: "Same time next year. We'll need a new van." },
];

export const ROAD_TRIP_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_ROAD_TRIP_EXPRESSIONS = ROAD_TRIP_EXPRESSIONS.length;

export const ROAD_TRIP_DAY_IDS: Record<number, string> = {
    1: 'roadtrip-day1',
    2: 'roadtrip-day2',
    3: 'roadtrip-day3',
    4: 'roadtrip-day4',
    5: 'roadtrip-day5',
    6: 'roadtrip-day6',
    7: 'roadtrip-day7',
    8: 'roadtrip-day8',
    9: 'roadtrip-day9',
    10: 'roadtrip-day10',
};

/**
 * Find which Memoria line an expression links to
 * Returns the line index in the conversation for deep-linking
 */
export function findRoadTripExpressionLineIndex(
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
