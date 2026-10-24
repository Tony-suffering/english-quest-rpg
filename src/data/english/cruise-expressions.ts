/**
 * The Honeymoon Cruise Expressions -- casual expressions from the Cruise scenario
 * 150 expressions across 10 days (15 per day), all commonly used in spoken English
 * Characters: Ben(29M), Kayla(28F), Marv(68M), Arlene(66F), Cheryl(54F), Julian(35M),
 *   plus crew guests Andres, Captain Lund, Tessa
 */

export interface CruiseExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const CRUISE_EXPRESSIONS: CruiseExpression[] = [
    // ============================================================
    // DAY 1 -- EMBARKATION DAY (15 expressions)
    // ============================================================
    { expression: "ahead of schedule", meaning: "予定より早い", meaningEn: "earlier than planned", day: 1, speaker: "Ben", example: "According to my spreadsheet we are eleven minutes ahead of schedule." },
    { expression: "Put the phone away", meaning: "スマホしまって", meaningEn: "telling someone to stop looking at their phone", day: 1, speaker: "Kayla", example: "Ben. Babe. Put the phone away." },
    { expression: "the whole point of", meaning: "～の一番の意義", meaningEn: "the main purpose of something", day: 1, speaker: "Kayla", example: "The whole point of a cruise is that the ship does the planning." },
    { expression: "the time of your lives", meaning: "人生最高の時間", meaningEn: "an extremely enjoyable experience", day: 1, speaker: "Julian", example: "My only job is making sure you have the time of your lives." },
    { expression: "No pressure", meaning: "プレッシャーなんてない(皮肉)", meaningEn: "ironically noting how much pressure there is", day: 1, speaker: "Julian", example: "No pressure on me at all!" },
    { expression: "can't tell if", meaning: "～かどうか分からない", meaningEn: "unable to decide between two impressions", day: 1, speaker: "Kayla", example: "I already can't tell if I love him or fear him." },
    { expression: "color-coded", meaning: "色分けした", meaningEn: "organized by colors", day: 1, speaker: "Ben", example: "It's all color-coded. Orange is mandatory events, green is meals." },
    { expression: "Trust me on that", meaning: "それは私を信じて", meaningEn: "insisting your advice is reliable", day: 1, speaker: "Marv", example: "The salmon here is a trap. Trust me on that." },
    { expression: "never let it go", meaning: "ずっと根に持つ", meaningEn: "refusing to stop bringing something up", day: 1, speaker: "Arlene", example: "That was one cruise, in 2019, and he's never let it go." },
    { expression: "that settles it", meaning: "それで決まりね", meaningEn: "declaring a decision is now final", day: 1, speaker: "Arlene", example: "Well, that settles it, you're ours now." },
    { expression: "sticks together", meaning: "一蓮托生・団結する", meaningEn: "staying loyal as a group", day: 1, speaker: "Arlene", example: "Table 12 sticks together. That's the rule of the sea." },
    { expression: "Amateur hour", meaning: "素人芸め", meaningEn: "dismissing something as unimpressive", day: 1, speaker: "Marv", example: "Four desserts. Amateur hour." },
    { expression: "get along just fine", meaning: "うまくやっていける", meaningEn: "predicting a good relationship", day: 1, speaker: "Marv", example: "Andres, my friend, we're going to get along just fine." },
    { expression: "Let go of the wheel", meaning: "ハンドルから手を放せ", meaningEn: "advice to stop trying to control everything", day: 1, speaker: "Marv", example: "Let go of the wheel and something good always happens." },
    { expression: "onto something", meaning: "いいところに気づいてる", meaningEn: "having a good idea or insight", day: 1, speaker: "Cheryl", example: "Maybe my sister was onto something." },

    // ============================================================
    // DAY 2 -- THE BUFFET (15 expressions)
    // ============================================================
    { expression: "gather around", meaning: "集まって", meaningEn: "calling people to come close", day: 2, speaker: "Marv", example: "All right, Table 12, gather around." },
    { expression: "That's rule one", meaning: "それがルール1だ", meaningEn: "stating the most basic principle", day: 2, speaker: "Marv", example: "You never commit to the first station. That's rule one." },
    { expression: "taking notes", meaning: "メモを取る", meaningEn: "writing down what someone says", day: 2, speaker: "Kayla", example: "Ben, why are you taking notes? Ben." },
    { expression: "I've been waiting my whole life", meaning: "人生ずっと待ってた", meaningEn: "exaggerating how long you wanted something", day: 2, speaker: "Ben", example: "I've been waiting my whole life for someone to treat breakfast with this level of seriousness." },
    { expression: "back and forth", meaning: "行ったり来たり", meaningEn: "repeatedly going between two places", day: 2, speaker: "Marv", example: "The rookies go back and forth like ping-pong balls." },
    { expression: "You'd think", meaning: "～と思うでしょ(のに違う)", meaningEn: "noting something surprisingly isn't the case", day: 2, speaker: "Arlene", example: "You'd think after 27 cruises he'd relax." },
    { expression: "It only gets worse", meaning: "悪化する一方", meaningEn: "warning that something keeps deteriorating", day: 2, speaker: "Arlene", example: "It only gets worse, kids." },
    { expression: "I'll be honest", meaning: "正直に言うと", meaningEn: "prefacing a frank admission", day: 2, speaker: "Cheryl", example: "I'll be honest, I was going to grab a yogurt and run back to my cabin." },
    { expression: "Say Marv sent you", meaning: "マーヴの紹介だと言え", meaningEn: "using someone's name to get special treatment", day: 2, speaker: "Marv", example: "Tell Manny extra mushrooms. Say Marv sent you." },
    { expression: "one on the way", meaning: "もうすぐ生まれる子が1人", meaningEn: "expecting a baby", day: 2, speaker: "Arlene", example: "He's been on this ship six years, two kids, one on the way." },
    { expression: "don't look so surprised", meaning: "そんなに驚いた顔しないで", meaningEn: "telling someone their shock is unwarranted", day: 2, speaker: "Arlene", example: "I know everything, dear, don't look so surprised." },
    { expression: "No excuses", meaning: "言い訳なし", meaningEn: "demanding attendance or compliance", day: 2, speaker: "Julian", example: "I expect all of you there! No excuses!" },
    { expression: "plan your whole day around it", meaning: "一日をそれ中心に組む", meaningEn: "organizing everything around one priority", day: 2, speaker: "Marv", example: "You see the good stuff early, you plan your whole day around it." },
    { expression: "cheaper than my therapist", meaning: "セラピストより安い", meaningEn: "joking something helps more than therapy", day: 2, speaker: "Cheryl", example: "This buffet is cheaper than my therapist and the portions are bigger." },
    { expression: "Already logged", meaning: "記録済み", meaningEn: "confirming something is already recorded", day: 2, speaker: "Ben", example: "Already logged. Right under Marv's buffet rules." },

    // ============================================================
    // DAY 3 -- THE POOL DECK (15 expressions)
    // ============================================================
    { expression: "organized crime", meaning: "組織犯罪(冗談)", meaningEn: "jokingly calling something a criminal operation", day: 3, speaker: "Ben", example: "Every chair. This is organized crime." },
    { expression: "Chair hogs", meaning: "席取り屋", meaningEn: "people who reserve deck chairs with towels", day: 3, speaker: "Arlene", example: "Chair hogs, honey. Oldest war at sea." },
    { expression: "watch and learn", meaning: "見て学びなさい", meaningEn: "inviting someone to observe your skill", day: 3, speaker: "Arlene", example: "But watch and learn -- I've been outmaneuvering these people since before you were born." },
    { expression: "never respected anyone more", meaning: "これほど尊敬したことない", meaningEn: "expressing maximum admiration", day: 3, speaker: "Kayla", example: "I have never respected anyone more in my entire life." },
    { expression: "still talk about it", meaning: "今もその話をする", meaningEn: "an event so memorable people keep retelling it", day: 3, speaker: "Marv", example: "The Norwegians still talk about it. Legendary morning." },
    { expression: "Fully earned", meaning: "正々堂々と勝ち取った", meaningEn: "insisting a reputation was deserved", day: 3, speaker: "Arlene", example: "Earned, dear. Fully earned." },
    { expression: "for the win", meaning: "優勝を懸けて", meaningEn: "the deciding moment of a game", day: 3, speaker: "Julian", example: "Final question, for the win! Table 12 leads by one point!" },
    { expression: "Write it down", meaning: "書け", meaningEn: "firmly telling someone to record an answer", day: 3, speaker: "Marv", example: "Flying squirrel. Write it down. Flying squirrel." },
    { expression: "My gut has never been wrong", meaning: "わしの勘は外れたことがない", meaningEn: "claiming your instincts are always right", day: 3, speaker: "Marv", example: "My gut has never been wrong at sea." },
    { expression: "It's over", meaning: "終わりだ", meaningEn: "declaring defeat is certain", day: 3, speaker: "Cheryl", example: "He wrote it and he's holding the card up. It's over. We lost to a squirrel." },
    { expression: "this is the man I chose", meaning: "これが私の選んだ男", meaningEn: "wryly lamenting your own partner choice", day: 3, speaker: "Arlene", example: "Forty-five years, and this is the man I chose." },
    { expression: "I stand by", meaning: "～を支持し続ける", meaningEn: "refusing to retract a statement", day: 3, speaker: "Marv", example: "And I stand by the squirrel." },
    { expression: "with total confidence", meaning: "全幅の自信を持って", meaningEn: "completely sure, even when wrong", day: 3, speaker: "Marv", example: "That's what leadership is, kids. Being wrong with total confidence." },
    { expression: "secretly our strongest player", meaning: "実は最強メンバー", meaningEn: "someone more capable than they realize", day: 3, speaker: "Kayla", example: "You are secretly our strongest player and you don't even know it." },
    { expression: "lost with honor", meaning: "名誉ある敗北をした", meaningEn: "losing in a respectable way", day: 3, speaker: "Kayla", example: "Andres says the room stewards heard we 'lost with honor.'" },

    // ============================================================
    // DAY 4 -- THE FIRST PORT (15 expressions)
    // ============================================================
    { expression: "listen up", meaning: "よく聞いて", meaningEn: "getting a group's attention for instructions", day: 4, speaker: "Ben", example: "Okay, listen up. The ship leaves at five thirty sharp." },
    { expression: "at five thirty sharp", meaning: "5時半きっかりに", meaningEn: "at exactly that time, no lateness", day: 4, speaker: "Ben", example: "The ship leaves at five thirty sharp." },
    { expression: "I've seen it happen", meaning: "実際に見たことがある", meaningEn: "warning from personal experience", day: 4, speaker: "Marv", example: "I've seen it happen. San Juan, 2011." },
    { expression: "for better or worse", meaning: "良くも悪くも(結婚の誓い)", meaningEn: "in all circumstances, from wedding vows", day: 4, speaker: "Kayla", example: "I've got Ben, obviously, for better or worse -- that's literally in the contract now." },
    { expression: "on my own", meaning: "一人で", meaningEn: "alone, without help or company", day: 4, speaker: "Cheryl", example: "I was thinking I might wander on my own for a bit?" },
    { expression: "going rogue", meaning: "単独行動に出る", meaningEn: "breaking away from the group or plan", day: 4, speaker: "Arlene", example: "Day four and she's going rogue. Go, honey." },
    { expression: "Get lost a little", meaning: "ちょっと迷子になってきなさい", meaningEn: "encouraging aimless exploration", day: 4, speaker: "Arlene", example: "Get lost a little. That's what ports are for." },
    { expression: "on principle", meaning: "念のため・主義として", meaningEn: "doing something because of your beliefs", day: 4, speaker: "Ben", example: "I'm setting three alarms for you on principle." },
    { expression: "Watch me work", meaning: "私の仕事ぶりを見てなさい", meaningEn: "announcing a display of skill", day: 4, speaker: "Arlene", example: "Now, this market. Watch me work, kids." },
    { expression: "throws in", meaning: "おまけに付ける", meaningEn: "adding something extra for free", day: 4, speaker: "Arlene", example: "We settle at eighteen and he throws in earrings." },
    { expression: "executive decision", meaning: "経営判断(独断)", meaningEn: "jokingly making a choice without consulting anyone", day: 4, speaker: "Marv", example: "Meanwhile, executive decision: I bought a sombrero." },
    { expression: "going straight to voicemail", meaning: "留守電に直行", meaningEn: "calls not being answered at all", day: 4, speaker: "Ben", example: "Her phone's going straight to voicemail." },
    { expression: "Nobody panic", meaning: "誰もパニックになるな", meaningEn: "telling everyone to stay calm while panicking", day: 4, speaker: "Ben", example: "Nobody panic. I'm panicking." },
    { expression: "I lost track of time", meaning: "時間を忘れてた", meaningEn: "not noticing how much time passed", day: 4, speaker: "Cheryl", example: "I lost track of time! They were playing my song!" },
    { expression: "Totally worth it", meaning: "完全に価値あり", meaningEn: "the reward justified the cost or risk", day: 4, speaker: "Cheryl", example: "Worth it. Totally worth it." },

    // ============================================================
    // DAY 5 -- FORMAL NIGHT (15 expressions)
    // ============================================================
    { expression: "Code red", meaning: "緊急事態", meaningEn: "announcing an emergency", day: 5, speaker: "Ben", example: "Kayla. Code red. The button just came off my tux jacket." },
    { expression: "don't spiral", meaning: "パニックの連鎖に入らないで", meaningEn: "telling someone not to descend into panic", day: 5, speaker: "Kayla", example: "Okay, don't spiral. This is a boat full of retirees." },
    { expression: "It's basic math", meaning: "単純な計算よ", meaningEn: "claiming a conclusion is obvious", day: 5, speaker: "Kayla", example: "Somebody within a hundred feet of us owns a sewing kit. It's basic math." },
    { expression: "Hand it over", meaning: "よこしなさい", meaningEn: "demanding someone give you something", day: 5, speaker: "Arlene", example: "Hand it over, Ben, and hold still." },
    { expression: "hold still", meaning: "じっとして", meaningEn: "telling someone not to move", day: 5, speaker: "Arlene", example: "Hand it over, Ben, and hold still." },
    { expression: "believe me", meaning: "本当なんだから", meaningEn: "emphasizing you're telling the truth", day: 5, speaker: "Arlene", example: "I've sewn buttons in rougher seas than this, believe me." },
    { expression: "sentimental nonsense", meaning: "感傷的なたわ言", meaningEn: "dismissing something as overly emotional", day: 5, speaker: "Marv", example: "Arlene says keeping it is sentimental nonsense." },
    { expression: "honest opinions", meaning: "正直な意見", meaningEn: "asking for frank feedback", day: 5, speaker: "Cheryl", example: "Okay, I need honest opinions. This dress." },
    { expression: "Is it a lot?", meaning: "やりすぎかな？", meaningEn: "asking if something is too bold or excessive", day: 5, speaker: "Cheryl", example: "My ex always said red was 'a lot.' Is it a lot?" },
    { expression: "exactly the right amount", meaning: "完璧にちょうどいい量", meaningEn: "reassuring that something isn't excessive", day: 5, speaker: "Kayla", example: "It is exactly the right amount. You look incredible." },
    { expression: "free of charge", meaning: "無料で", meaningEn: "at no cost", day: 5, speaker: "Andres", example: "Now, a professional secret, free of charge: you may order two." },
    { expression: "best-kept secret", meaning: "最大の秘密", meaningEn: "valuable information few people know", day: 5, speaker: "Andres", example: "It's the fleet's best-kept secret." },
    { expression: "Do you understand what you've done", meaning: "自分が何をしたか分かってるのか", meaningEn: "dramatically confronting someone", day: 5, speaker: "Marv", example: "Do you understand what you've done to me?" },
    { expression: "In my defense", meaning: "弁明させてもらうと", meaningEn: "prefacing an excuse for your behavior", day: 5, speaker: "Cheryl", example: "In my defense, the band was playing Fleetwood Mac." },
    { expression: "That's foreshadowing", meaning: "あれは伏線だ", meaningEn: "spotting a hint of trouble to come", day: 5, speaker: "Ben", example: "He said 'keep an eye on tomorrow.' That's foreshadowing. I know foreshadowing." },

    // ============================================================
    // DAY 6 -- THE STORM (15 expressions)
    // ============================================================
    { expression: "built for far worse", meaning: "はるかに悪い状況にも耐える設計", meaningEn: "designed to handle much harsher conditions", day: 6, speaker: "Captain Lund", example: "The ship is built for far worse." },
    { expression: "entirely calm", meaning: "完全に冷静", meaningEn: "totally composed and unworried", day: 6, speaker: "Captain Lund", example: "The crew is smiling, and I am entirely calm. Thank you." },
    { expression: "the opposite of calm", meaning: "冷静の正反対", meaningEn: "extremely agitated", day: 6, speaker: "Ben", example: "I'm not calm. I am the opposite of calm." },
    { expression: "swears by", meaning: "絶対効くと信じてる", meaningEn: "trusting a remedy completely", day: 6, speaker: "Ben", example: "I ate the green apple Arlene swears by. I'm still green." },
    { expression: "acts up", meaning: "荒れる・調子が悪くなる", meaningEn: "behaving badly or malfunctioning", day: 6, speaker: "Arlene", example: "When the sea acts up, you go low and center." },
    { expression: "You call this", meaning: "これが～だと？", meaningEn: "scoffing that something isn't impressive", day: 6, speaker: "Marv", example: "You call this a storm?" },
    { expression: "let me tell you about", meaning: "～の話をしてやろう", meaningEn: "launching into a story from the past", day: 6, speaker: "Marv", example: "Kids, let me tell you about the Atlantic crossing of 2009." },
    { expression: "in your imagination", meaning: "あなたの想像の中", meaningEn: "something remembered that never really happened", day: 6, speaker: "Arlene", example: "The piano moved four inches, Marvin, and the waves were in your imagination." },
    { expression: "showing off", meaning: "力を見せびらかす", meaningEn: "displaying power or skill boastfully", day: 6, speaker: "Cheryl", example: "The whole ocean's showing off." },
    { expression: "In sickness and in health", meaning: "病める時も健やかなる時も", meaningEn: "the wedding vow, quoted wryly", day: 6, speaker: "Kayla", example: "This is the man I married, everyone. In sickness and in health." },
    { expression: "have an understanding", meaning: "分かり合ってる", meaningEn: "an unspoken mutual agreement", day: 6, speaker: "Ben", example: "The floor and I have an understanding." },
    { expression: "the works", meaning: "何もかも全部", meaningEn: "everything available, the full set", day: 6, speaker: "Julian", example: "Cards, dominoes, the works!" },
    { expression: "deal me in", meaning: "わしも混ぜろ", meaningEn: "asking to join a game", day: 6, speaker: "Marv", example: "Fine, deal me in. Dominoes." },
    { expression: "Built-in excuse", meaning: "最初から用意された言い訳", meaningEn: "a ready-made justification for failure", day: 6, speaker: "Cheryl", example: "If we lose, we blame the waves. Built-in excuse." },
    { expression: "The worst is behind us", meaning: "最悪の区間は抜けた", meaningEn: "the hardest part is over", day: 6, speaker: "Captain Lund", example: "The worst is behind us. Seas will settle overnight." },

    // ============================================================
    // DAY 7 -- THE TALENT SHOW (15 expressions)
    // ============================================================
    { expression: "Don't make me", meaning: "～させないでよ", meaningEn: "playfully threatening a consequence", day: 7, speaker: "Julian", example: "I already wrote it. Don't make me un-glitter it." },
    { expression: "a completely different animal", meaning: "完全に別の生き物", meaningEn: "something of a totally different nature", day: 7, speaker: "Cheryl", example: "A theater with six hundred seats is a completely different animal." },
    { expression: "And whose fault is that?", meaning: "それは誰のせい？", meaningEn: "pointedly assigning blame", day: 7, speaker: "Arlene", example: "And whose fault is that? Twenty-six years of a man who kept the radio off." },
    { expression: "Sign the form", meaning: "申込書にサインしなさい", meaningEn: "firmly telling someone to commit", day: 7, speaker: "Arlene", example: "The stage didn't go anywhere. It's been waiting. Sign the form." },
    { expression: "Fair warning", meaning: "先に警告しておく", meaningEn: "alerting someone before it happens", day: 7, speaker: "Marv", example: "Fair warning: the scarf has never once disappeared." },
    { expression: "a crowd favorite", meaning: "観客の人気者", meaningEn: "someone the audience loves", day: 7, speaker: "Marv", example: "The crowd loves watching me fail. I'm a crowd favorite." },
    { expression: "for some reason", meaning: "なぜか", meaningEn: "without an obvious explanation", day: 7, speaker: "Kayla", example: "Ben's has a pie chart for some reason." },
    { expression: "cause a diversion", meaning: "注意をそらす", meaningEn: "creating a distraction", day: 7, speaker: "Cheryl", example: "You run on stage with that scarf and cause a diversion." },
    { expression: "Swear on the buffet", meaning: "ビュッフェに誓って", meaningEn: "swearing on what you hold most sacred", day: 7, speaker: "Cheryl", example: "Swear it. Swear on the buffet." },
    { expression: "go warm up", meaning: "ウォームアップしてこい", meaningEn: "telling a performer to prepare", day: 7, speaker: "Marv", example: "Now go warm up. Do the thing singers do." },
    { expression: "closing the show", meaning: "トリを飾る", meaningEn: "performing last, the honored slot", day: 7, speaker: "Julian", example: "And closing the show, direct from a pier bar in Cozumel, Miss CHERYL!" },
    { expression: "went quiet", meaning: "静まり返った", meaningEn: "everyone suddenly stopped talking", day: 7, speaker: "Kayla", example: "She walked out there in the red dress. Whole theater went quiet." },
    { expression: "I almost ran", meaning: "逃げ出しかけた", meaningEn: "nearly fleeing from fear", day: 7, speaker: "Cheryl", example: "I almost ran. My hands were shaking on the mic." },
    { expression: "fall in love that fast", meaning: "あんな速さで恋に落ちる", meaningEn: "being won over almost instantly", day: 7, speaker: "Marv", example: "I've never seen a room fall in love that fast." },
    { expression: "should be illegal", meaning: "法律で禁止すべき", meaningEn: "jokingly saying something is unfairly good", day: 7, speaker: "Arlene", example: "The comedian said following her should be illegal." },

    // ============================================================
    // DAY 8 -- THE SNORKEL TRIP (15 expressions)
    // ============================================================
    { expression: "keeps what it catches", meaning: "捕まえたものを返さない", meaningEn: "lost items are gone for good", day: 8, speaker: "Tessa", example: "Don't lose anything you love, because the ocean keeps what it catches." },
    { expression: "Witnessed and notarized", meaning: "目撃・公証済み", meaningEn: "jokingly confirming you saw it officially", day: 8, speaker: "Kayla", example: "Witnessed and notarized, babe." },
    { expression: "let me down", meaning: "わしを裏切る・期待を裏切る", meaningEn: "failing someone who relied on you", day: 8, speaker: "Marv", example: "And they've never let me down. Gear you trust is gear you keep." },
    { expression: "Write that down", meaning: "それメモしろ", meaningEn: "telling someone your words are worth recording", day: 8, speaker: "Marv", example: "Write that down, Ben, that's a life rule, not just a snorkel rule." },
    { expression: "emotionally prepared", meaning: "心の準備ができた", meaningEn: "ready for something emotional", day: 8, speaker: "Cheryl", example: "Just so everyone's emotionally prepared for that." },
    { expression: "stay calm", meaning: "落ち着いて", meaningEn: "keeping composed in a tense moment", day: 8, speaker: "Tessa", example: "If he shows up, stay calm and let him run his errands." },
    { expression: "run his errands", meaning: "彼の用事を済ませる", meaningEn: "humorously describing an animal's routine", day: 8, speaker: "Tessa", example: "Stay calm and let him run his errands." },
    { expression: "slow as a Sunday", meaning: "日曜日みたいにゆっくり", meaningEn: "moving in a leisurely, unhurried way", day: 8, speaker: "Arlene", example: "He swam right under Cheryl, slow as a Sunday, like he knew." },
    { expression: "Deep breaths", meaning: "深呼吸して", meaningEn: "coaching someone to breathe and calm down", day: 8, speaker: "Kayla", example: "Deep breaths. Babe. Look at me." },
    { expression: "Facts first", meaning: "まず事実から", meaningEn: "insisting on facts before emotions", day: 8, speaker: "Kayla", example: "Don't spiral into the pie-chart place. Facts first." },
    { expression: "on my watch", meaning: "わしの見てる前で", meaningEn: "while I'm responsible; under my supervision", day: 8, speaker: "Marv", example: "Nobody's lost a ring on my watch yet." },
    { expression: "It's a scientific fact", meaning: "科学的事実だ", meaningEn: "jokingly claiming certainty for an observation", day: 8, speaker: "Marv", example: "Men in a panic never check the second zipper. It's a scientific fact." },
    { expression: "cut the engine", meaning: "エンジンを切った", meaningEn: "turning off a motor, often for drama", day: 8, speaker: "Arlene", example: "The whole boat went silent. Tessa cut the engine." },
    { expression: "And there it is", meaning: "ほら、あった", meaningEn: "announcing you found what was lost", day: 8, speaker: "Marv", example: "...And there it is. Second compartment." },
    { expression: "ten out of ten", meaning: "10点満点で10点", meaningEn: "a perfect score; total approval", day: 8, speaker: "Ben", example: "Winston, the ring, the turtle, the whole day -- ten out of ten." },

    // ============================================================
    // DAY 9 -- THE VOW RENEWAL (15 expressions)
    // ============================================================
    { expression: "It's silly", meaning: "ばかみたいなんだけど", meaningEn: "downplaying something meaningful to you", day: 9, speaker: "Arlene", example: "It's silly, what I remember. We got married on a Tuesday lunch break, 1981." },
    { expression: "kept being life", meaning: "人生であり続けた", meaningEn: "ordinary life kept getting in the way", day: 9, speaker: "Arlene", example: "Then life just... kept being life." },
    { expression: "Objections?", meaning: "異議は？", meaningEn: "briskly asking for any disagreement", day: 9, speaker: "Kayla", example: "We're throwing them a wedding. Tonight. At sunset. Objections? Good." },
    { expression: "Way ahead of you", meaning: "とっくに動いてる", meaningEn: "having already done what was about to be asked", day: 9, speaker: "Ben", example: "Way ahead of you. I already talked to Julian." },
    { expression: "owes me a favor", meaning: "私に貸しがある", meaningEn: "someone obligated to help you back", day: 9, speaker: "Julian", example: "The string quartet owes me a favor." },
    { expression: "It was that or", meaning: "それか～かの二択だった", meaningEn: "explaining the only alternative", day: 9, speaker: "Julian", example: "It was that or the towel swan. Committee vote." },
    { expression: "Of course it is", meaning: "そりゃそうよね", meaningEn: "something being perfectly predictable", day: 9, speaker: "Cheryl", example: "He said 'Songbird.' Fleetwood Mac. Of course it is. Of course." },
    { expression: "Don't look at me", meaning: "こっち見ないで", meaningEn: "hiding embarrassment or tears", day: 9, speaker: "Cheryl", example: "Don't look at me, I'm already crying and it's only two in the afternoon." },
    { expression: "keep a secret", meaning: "秘密を守る", meaningEn: "not revealing hidden information", day: 9, speaker: "Marv", example: "You want ME to keep a secret from ARLENE?" },
    { expression: "she reads minds", meaning: "心が読める", meaningEn: "someone impossibly perceptive", day: 9, speaker: "Marv", example: "Kids, she reads minds. I give us four hours." },
    { expression: "You're the decoy", meaning: "あなたは囮", meaningEn: "assigning someone the distraction role", day: 9, speaker: "Kayla", example: "You're not keeping the secret, Marv. You're the decoy." },
    { expression: "Be yourself", meaning: "普段どおりにしてて", meaningEn: "acting naturally, no performance needed", day: 9, speaker: "Kayla", example: "Complain about the prices. Be yourself, basically." },
    { expression: "practically wearing a sign", meaning: "看板を下げて歩いてるようなもの", meaningEn: "making a secret completely obvious", day: 9, speaker: "Arlene", example: "The man was practically wearing a sign." },
    { expression: "the best decision I ever made", meaning: "人生最高の決断", meaningEn: "your wisest choice in life", day: 9, speaker: "Marv", example: "You're the best decision I ever made." },
    { expression: "shouldn't run on a schedule", meaning: "スケジュールで動かすべきじゃない", meaningEn: "some things must happen naturally", day: 9, speaker: "Ben", example: "Some things shouldn't run on a schedule." },

    // ============================================================
    // DAY 10 -- DISEMBARKATION (15 expressions)
    // ============================================================
    { expression: "on purpose", meaning: "わざと", meaningEn: "intentionally, not by accident", day: 10, speaker: "Ben", example: "Last spreadsheet of the trip. I made it slowly on purpose." },
    { expression: "What has this boat done to me", meaning: "この船、私に何をしたの", meaningEn: "marveling at how an experience changed you", day: 10, speaker: "Kayla", example: "Now watching him make the last tab is genuinely making me sad. What has this boat done to me." },
    { expression: "carry-on", meaning: "機内持ち込み", meaningEn: "luggage taken onto the plane with you", day: 10, speaker: "Cheryl", example: "The trophy flies carry-on. I've already decided." },
    { expression: "It was not close", meaning: "接戦ではなかった", meaningEn: "one side won by a huge margin", day: 10, speaker: "Andres", example: "Ten days, three hundred tables. It was not close, my friends." },
    { expression: "Don't you dare stop", meaning: "絶対やめちゃだめよ", meaningEn: "strongly insisting someone continue", day: 10, speaker: "Arlene", example: "Don't you dare stop, it works every time." },
    { expression: "works every time", meaning: "毎回効く", meaningEn: "a trick that never fails", day: 10, speaker: "Arlene", example: "Don't you dare stop, it works every time." },
    { expression: "business item", meaning: "業務連絡", meaningEn: "jokingly framing news as an agenda item", day: 10, speaker: "Marv", example: "Before anybody gets weepy, business item." },
    { expression: "The math works", meaning: "計算が合う", meaningEn: "the numbers or logic line up perfectly", day: 10, speaker: "Ben", example: "The math works. Our first anniversary is their forty-sixth." },
    { expression: "I'm calling it now", meaning: "今ここで宣言する", meaningEn: "making a confident prediction on record", day: 10, speaker: "Kayla", example: "I'm calling it now: this is the only standing appointment I will keep for the rest of my life." },
    { expression: "I regret nothing", meaning: "1ミリも後悔してない", meaningEn: "standing by a choice despite its cost", day: 10, speaker: "Cheryl", example: "It cost me eleven dollars a minute and I regret nothing." },
    { expression: "block traffic", meaning: "通行止めにする", meaningEn: "stopping the flow of people", day: 10, speaker: "Julian", example: "Don't listen to it on the gangway, you'll block traffic crying." },
    { expression: "that's a warning", meaning: "これは警告よ", meaningEn: "emphasizing a promise will definitely happen", day: 10, speaker: "Arlene", example: "That's not a promise, that's a warning." },
    { expression: "see you off", meaning: "見送る", meaningEn: "saying goodbye as someone departs", day: 10, speaker: "Captain Lund", example: "I came down to see you off myself." },
    { expression: "get on the boat", meaning: "船に乗りなさい(思い切れ)", meaningEn: "advice to take the leap despite fear", day: 10, speaker: "Cheryl", example: "If you're listening, past Cheryl: get on the boat. Always get on the boat." },
    { expression: "held it together", meaning: "持ちこたえた", meaningEn: "keeping composure under emotion", day: 10, speaker: "Kayla", example: "Then we all held it together right up until Arlene waved from the taxi line." },
];

export const CRUISE_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_CRUISE_EXPRESSIONS = CRUISE_EXPRESSIONS.length;

export const CRUISE_DAY_IDS: Record<number, string> = {
    1: 'cruise-day1',
    2: 'cruise-day2',
    3: 'cruise-day3',
    4: 'cruise-day4',
    5: 'cruise-day5',
    6: 'cruise-day6',
    7: 'cruise-day7',
    8: 'cruise-day8',
    9: 'cruise-day9',
    10: 'cruise-day10',
};

/**
 * Find which Memoria line an expression links to
 * Returns the line index in the conversation for deep-linking
 */
export function findCruiseExpressionLineIndex(
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
