/**
 * Home Inspection -- 5-day conversation series for Memoria
 * First-time homebuyers walk through a 40-year-old colonial with a grizzled inspector.
 * Water in the basement, a tired roof, a stubborn seller, and a termite twist.
 * 5 characters: Marcus (34M buyer), Jenna (32F buyer), Bob (58M inspector),
 *   Mrs. Patterson (72F seller), Karen (45F buyer's agent)
 * Mar 22 - Mar 26, 2026
 * Speech patterns: NO g-dropping (full -ing forms), contractions OK,
 *   fillers, hedges, real estate jargon mixed with civilian panic.
 * Shorter format: ~12-14 lines per day per language.
 */

export interface HomeInspectionEntry {
    id: string;
    date: string;
    title: string;
    titleJa: string;
    content: string;
    series: string;
    seriesTitle: string;
    conversation: {
        english: Array<{ speaker: 'male' | 'female'; text: string }>;
        japanese: Array<{ speaker: 'male' | 'female'; text: string }>;
        generatedAt: Date;
        tone: string;
    };
    tone: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const generatedAt = new Date('2026-03-22T12:00:00.000Z');

export const homeInspectionEntries: HomeInspectionEntry[] = [
    // ============================================================
    // DAY 1 (Mar 22) -- THE BASEMENT
    // ============================================================
    {
        id: 'homeinspection-day1',
        date: '2026-03-22',
        title: 'Day 1: The Basement',
        titleJa: 'Day 1: 地下室',
        content: 'マーカスとジェナが初めての家のインスペクション。地下室でボブの懐中電灯が壁のシミを照らす。パターソン夫人「あれは一度雨樋が詰まっただけ」。ボブ無言。カレンが空気を取り繕う。',
        series: 'home-inspection',
        seriesTitle: 'Home Inspection',
        tone: 'casual',
        tags: ['homebuying', 'inspection', 'real-estate', 'first-time-buyers', 'comedy'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Karen: Okay, so Bob is gonna do his thing, you guys just follow along, ask whatever you want -- there's no dumb question, right Bob?" },
                { speaker: 'male', text: "Bob: There's plenty of dumb questions. I just don't make people feel bad about asking them." },
                { speaker: 'female', text: "Jenna: That's... reassuring? I think?" },
                { speaker: 'male', text: "Marcus: Where do we start?" },
                { speaker: 'male', text: "Bob: Basement. Always the basement. House tells you everything down here." },
                { speaker: 'female', text: "Mrs. Patterson: It's perfectly dry. We've never had any issues. Forty-one years in this house." },
                { speaker: 'male', text: "Bob: Mm-hm. Hold on. Marcus, come look at this." },
                { speaker: 'male', text: "Marcus: That brown stain on the wall? Is that... what is that?" },
                { speaker: 'male', text: "Bob: That, my friend, is water. Old water. Goes about three feet up." },
                { speaker: 'female', text: "Mrs. Patterson: Oh, that was just one time. The gutter got clogged. It was years ago." },
                { speaker: 'male', text: "Bob: Ma'am, water leaves a record. This wasn't one time." },
                { speaker: 'female', text: "Jenna: Marcus." },
                { speaker: 'male', text: "Marcus: I know." },
                { speaker: 'female', text: "Karen: Okay, let's not jump to conclusions. We'll get the full report and figure out next steps. Bob, what are we looking at -- minor, moderate, major?" },
                { speaker: 'male', text: "Bob: Let's just say I'm taking a lot of pictures." },
            ],
            japanese: [
                { speaker: 'female', text: "Karen: それじゃ、ボブがいつもの流れでチェックしていくから、二人はついて回って何でも聞いてね。バカな質問なんてないから、ね、ボブ？" },
                { speaker: 'male', text: "Bob: バカな質問は山ほどある。聞いた人を悪く感じさせないだけだ。" },
                { speaker: 'female', text: "Jenna: それは... 安心、なのかな？" },
                { speaker: 'male', text: "Marcus: どこから始めます？" },
                { speaker: 'male', text: "Bob: 地下室だ。いつも地下室から。家はここで全部教えてくれる。" },
                { speaker: 'female', text: "Mrs. Patterson: ちゃんと乾いてるわよ。問題なんて一度もなかった。この家に41年住んでるんだから。" },
                { speaker: 'male', text: "Bob: ふん。ちょっと待った。マーカス、これ見に来な。" },
                { speaker: 'male', text: "Marcus: 壁のあの茶色いシミ？あれって... なんですか？" },
                { speaker: 'male', text: "Bob: あれはな、水だ。古い水。だいたい3フィートくらい上まで来てる。" },
                { speaker: 'female', text: "Mrs. Patterson: あら、あれは一度だけよ。雨樋が詰まったの。もう何年も前の話。" },
                { speaker: 'male', text: "Bob: 奥さん、水は痕跡を残すんだ。これは一度じゃない。" },
                { speaker: 'female', text: "Jenna: マーカス。" },
                { speaker: 'male', text: "Marcus: わかってる。" },
                { speaker: 'female', text: "Karen: ちょっと、結論を急がないで。報告書を見てから次のステップを考えよう。ボブ、これって -- 軽度？中度？重度？" },
                { speaker: 'male', text: "Bob: とりあえず写真をいっぱい撮ってる、とだけ言っとく。" },
            ],
            generatedAt,
            tone: 'casual',
        },
    },

    // ============================================================
    // DAY 2 (Mar 23) -- THE ROOF & HVAC
    // ============================================================
    {
        id: 'homeinspection-day2',
        date: '2026-03-23',
        title: 'Day 2: The Roof & HVAC',
        titleJa: 'Day 2: 屋根とエアコン',
        content: 'ボブが屋根に登る。柔らかい箇所が複数。HVACは1998年製。パターソン夫人「まだ普通に動いてるわよ！」。マーカスは頭の中で修理費を計算し続ける。',
        series: 'home-inspection',
        seriesTitle: 'Home Inspection',
        tone: 'casual',
        tags: ['homebuying', 'inspection', 'real-estate', 'first-time-buyers', 'comedy'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'male', text: "Bob: All right, I'm going up. You two stay down here. Last thing I need is somebody breaking an ankle." },
                { speaker: 'female', text: "Jenna: How long has it been since the roof was replaced, Mrs. Patterson?" },
                { speaker: 'female', text: "Mrs. Patterson: Oh, let me think. My husband did it the year the twins started middle school, so... 2003? 2004?" },
                { speaker: 'male', text: "Marcus: That's over twenty years." },
                { speaker: 'female', text: "Karen: Asphalt shingle, typical life is 20 to 30. So we're at the back half." },
                { speaker: 'male', text: "Bob: Hey -- I can hear you down there. You're at the back half, all right. I'm finding three soft spots already." },
                { speaker: 'male', text: "Marcus: Soft spots meaning...?" },
                { speaker: 'male', text: "Bob: Meaning your decking is starting to rot. Meaning a full tear-off, not a patch job." },
                { speaker: 'female', text: "Jenna: How much is a full tear-off?" },
                { speaker: 'female', text: "Karen: For a roof this size? Probably twelve, fifteen thousand. Could be more." },
                { speaker: 'male', text: "Marcus: Okay. Cool. And the HVAC?" },
                { speaker: 'female', text: "Mrs. Patterson: The furnace works perfectly! We just had someone look at it last spring." },
                { speaker: 'male', text: "Bob: Ma'am, the label on your furnace says 1998. I respect that it's still running. I do. But it's not gonna be running much longer." },
                { speaker: 'female', text: "Jenna: Marcus, you're doing math in your head, aren't you?" },
                { speaker: 'male', text: "Marcus: I am drowning in my head. Yes." },
            ],
            japanese: [
                { speaker: 'male', text: "Bob: よし、登るぞ。二人はここにいてくれ。誰かが足首折るのが一番面倒だからな。" },
                { speaker: 'female', text: "Jenna: パターソンさん、屋根を葺き替えたのっていつ頃ですか？" },
                { speaker: 'female', text: "Mrs. Patterson: ええっと、考えさせて。双子が中学に上がった年に夫がやったから... 2003年？2004年？" },
                { speaker: 'male', text: "Marcus: 20年以上経ってる。" },
                { speaker: 'female', text: "Karen: アスファルトシングルの寿命は普通20年から30年。だから後半に入ってる。" },
                { speaker: 'male', text: "Bob: おーい、下まで聞こえてるぞ。後半ってのは合ってる。もう3か所、柔らかい箇所を見つけた。" },
                { speaker: 'male', text: "Marcus: 柔らかい箇所って...？" },
                { speaker: 'male', text: "Bob: 下地が腐り始めてるってことだ。部分補修じゃなくて全面葺き替えだな。" },
                { speaker: 'female', text: "Jenna: 全面葺き替えっていくらかかるんですか？" },
                { speaker: 'female', text: "Karen: このサイズの屋根なら... 12,000から15,000ドルくらい。もっと行くかも。" },
                { speaker: 'male', text: "Marcus: はい。最高。でHVACは？" },
                { speaker: 'female', text: "Mrs. Patterson: 暖房は完璧に動いてるわよ！去年の春に業者に見てもらったばかり。" },
                { speaker: 'male', text: "Bob: 奥さん、ラベルに1998年って書いてある。まだ動いてることは尊敬する。本当に。でも、そう長くは持たない。" },
                { speaker: 'female', text: "Jenna: マーカス、頭の中で計算してるでしょ？" },
                { speaker: 'male', text: "Marcus: 頭の中で溺れてる。うん。" },
            ],
            generatedAt,
            tone: 'casual',
        },
    },

    // ============================================================
    // DAY 3 (Mar 24) -- THE NEGOTIATION
    // ============================================================
    {
        id: 'homeinspection-day3',
        date: '2026-03-24',
        title: 'Day 3: The Negotiation',
        titleJa: 'Day 3: 価格交渉',
        content: 'カレンの事務所。マーカスとジェナがインスペクション報告書を片手に25,000ドル値引きを要求。パターソン夫人がスピーカーホン越しに拒否。最終的に18,000ドル値引き＋屋根クレジットで合意。',
        series: 'home-inspection',
        seriesTitle: 'Home Inspection',
        tone: 'casual',
        tags: ['homebuying', 'negotiation', 'real-estate', 'first-time-buyers', 'comedy'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Karen: Okay, before we get on the phone, what's your number? What are we asking for?" },
                { speaker: 'male', text: "Marcus: Twenty-five thousand off." },
                { speaker: 'female', text: "Karen: That's an ambitious opening." },
                { speaker: 'female', text: "Jenna: It's the basement and the roof and the furnace. We could justify more." },
                { speaker: 'female', text: "Karen: I'm not saying you can't. I'm saying she's gonna lose her mind. Okay, putting her on now." },
                { speaker: 'female', text: "Mrs. Patterson: Hello, Karen? Are the kids there?" },
                { speaker: 'female', text: "Karen: We're all here, Patty. So -- after reviewing the inspection report, Marcus and Jenna are asking for a twenty-five thousand dollar credit at closing." },
                { speaker: 'female', text: "Mrs. Patterson: ...I'm sorry, twenty-five WHAT? Absolutely not. That house is worth every penny." },
                { speaker: 'male', text: "Marcus: Mrs. Patterson, the roof alone is fifteen --" },
                { speaker: 'female', text: "Mrs. Patterson: That roof has another ten years on it, easily. Bob doesn't know what he's talking about." },
                { speaker: 'female', text: "Karen: Patty, Bob is the best inspector in the county. You know that." },
                { speaker: 'female', text: "Mrs. Patterson: I'll do eight thousand. And not a dollar more." },
                { speaker: 'female', text: "Jenna: Eighteen. Eighteen plus you cover the roof inspection contingency." },
                { speaker: 'female', text: "Mrs. Patterson: ...Fine. Eighteen. But I want it closed by the end of the month." },
                { speaker: 'female', text: "Karen: Done. I'll send the addendum tonight. Patty, you're a saint." },
                { speaker: 'female', text: "Mrs. Patterson: I'm a tired old woman, Karen. That's what I am." },
            ],
            japanese: [
                { speaker: 'female', text: "Karen: じゃあ、電話する前に -- いくらで行く？何を要求する？" },
                { speaker: 'male', text: "Marcus: 25,000ドル値引き。" },
                { speaker: 'female', text: "Karen: それは強気な初手ね。" },
                { speaker: 'female', text: "Jenna: 地下室と屋根と暖房だよ。もっと取ってもいいくらい。" },
                { speaker: 'female', text: "Karen: ダメとは言ってない。彼女はキレるって言ってるだけ。じゃあ、電話するわよ。" },
                { speaker: 'female', text: "Mrs. Patterson: もしもし、カレン？子供たちもいる？" },
                { speaker: 'female', text: "Karen: みんないるよ、パティ。それでね -- インスペクション報告書を確認した結果、マーカスとジェナがクロージング時に25,000ドルのクレジットを希望してる。" },
                { speaker: 'female', text: "Mrs. Patterson: ...ごめんなさい、いくらですって？絶対に無理。あの家はビタ一文値引きする必要なんてない。" },
                { speaker: 'male', text: "Marcus: パターソンさん、屋根だけで15,000かかるんです --" },
                { speaker: 'female', text: "Mrs. Patterson: あの屋根はあと10年は余裕で持つわよ。ボブは何もわかってない。" },
                { speaker: 'female', text: "Karen: パティ、ボブはこの郡で一番のインスペクターよ。あなたも知ってるでしょ。" },
                { speaker: 'female', text: "Mrs. Patterson: 8,000ドルなら。それ以上は1ドルも出さない。" },
                { speaker: 'female', text: "Jenna: 18,000。18,000＋屋根のインスペクション特約はそちら持ち。" },
                { speaker: 'female', text: "Mrs. Patterson: ...わかった。18,000。ただし月末までにクロージングを終わらせて。" },
                { speaker: 'female', text: "Karen: 了解。今夜契約書追加分を送るね。パティ、あなたは天使よ。" },
                { speaker: 'female', text: "Mrs. Patterson: 私はただの疲れたババアよ、カレン。それだけ。" },
            ],
            generatedAt,
            tone: 'casual',
        },
    },

    // ============================================================
    // DAY 4 (Mar 25) -- THE TERMITE TWIST
    // ============================================================
    {
        id: 'homeinspection-day4',
        date: '2026-03-25',
        title: 'Day 4: The Termite Twist',
        titleJa: 'Day 4: シロアリの追撃',
        content: 'ボブから電話。撮影した写真を見直して気になる箇所があるとのこと。再訪して床下に潜ると -- 活動中のシロアリ・コロニー。全部が宙に浮く。マーカスは「もう降りる」モード、ジェナがなだめる。',
        series: 'home-inspection',
        seriesTitle: 'Home Inspection',
        tone: 'casual',
        tags: ['homebuying', 'termites', 'real-estate', 'first-time-buyers', 'drama'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'male', text: "Bob: Marcus. It's Bob. I need you and Jenna to meet me at the house. Today if possible." },
                { speaker: 'male', text: "Marcus: Bob, we just finalized the price yesterday. What's going on?" },
                { speaker: 'male', text: "Bob: I was reviewing the crawl space photos last night. I want to take another look. Bring Karen if you can." },
                { speaker: 'female', text: "Karen: Okay, what are we looking at? Tell me it's not what I think it is." },
                { speaker: 'male', text: "Bob: Crawl space. Northeast corner. Come see for yourself." },
                { speaker: 'female', text: "Jenna: Oh my god. Are those... is that --" },
                { speaker: 'male', text: "Bob: Active termites. Look at the mud tubes. This colony's been here a while." },
                { speaker: 'male', text: "Marcus: How is this not in the original report?" },
                { speaker: 'male', text: "Bob: Because I take pictures and review them later. That's why I'm worth what you're paying me. The damage is structural, Marcus. We're talking about replacing joists." },
                { speaker: 'female', text: "Karen: I'll call Patty. We have to disclose this whether she likes it or not." },
                { speaker: 'male', text: "Marcus: Karen, I'm done. I'm walking. We're walking." },
                { speaker: 'female', text: "Jenna: Marcus. Slow down." },
                { speaker: 'male', text: "Marcus: Jenna, the basement, the roof, the furnace, and now this? At what point do we admit this is a money pit?" },
                { speaker: 'female', text: "Jenna: I hear you. I do. But every house has stuff. Let's see what Bob says it costs to fix before we throw away earnest money." },
                { speaker: 'male', text: "Bob: Treatment plus structural repair, probably ten to fifteen. Manageable. Just not free." },
                { speaker: 'female', text: "Karen: I'll get Patty on board. She wants this closed as bad as you two do." },
            ],
            japanese: [
                { speaker: 'male', text: "Bob: マーカス。ボブだ。ジェナと家に来てくれ。できれば今日。" },
                { speaker: 'male', text: "Marcus: ボブ、昨日価格を確定したばかりですよ。何があったんですか？" },
                { speaker: 'male', text: "Bob: 昨夜、床下の写真を見直してた。もう一度確認したい。カレンも連れて来られるなら一緒に。" },
                { speaker: 'female', text: "Karen: いいわよ、何があったの？私が思ってる通りじゃないって言って。" },
                { speaker: 'male', text: "Bob: 床下。北東の角。自分の目で見てくれ。" },
                { speaker: 'female', text: "Jenna: うわ、なにこれ。これって... まさか --" },
                { speaker: 'male', text: "Bob: 活動中のシロアリだ。蟻道を見ろ。このコロニーはしばらくここにいる。" },
                { speaker: 'male', text: "Marcus: なんで最初の報告書に載ってないんですか？" },
                { speaker: 'male', text: "Bob: 俺は写真を撮って後で見返すからだ。だから俺に金を払う価値があるんだよ。被害は構造的だ、マーカス。根太を入れ替える話になる。" },
                { speaker: 'female', text: "Karen: パティに電話する。彼女が好むと好まざるとに関わらず、これは開示しなきゃいけない。" },
                { speaker: 'male', text: "Marcus: カレン、もう終わりだ。降りる。降りるよ。" },
                { speaker: 'female', text: "Jenna: マーカス。落ち着いて。" },
                { speaker: 'male', text: "Marcus: ジェナ、地下室、屋根、暖房、そしてこれだぞ？どの時点でこれが金食い虫だって認めるんだよ？" },
                { speaker: 'female', text: "Jenna: 言いたいことはわかる。本当に。でもどの家にも何かしらある。手付金を捨てる前にボブが修理費を見積もるのを聞こう。" },
                { speaker: 'male', text: "Bob: 駆除＋構造修理で、たぶん10,000から15,000。なんとかなる範囲だ。タダじゃないだけだ。" },
                { speaker: 'female', text: "Karen: パティを説得する。彼女もあなたたちと同じくらい早くクロージングしたいはずよ。" },
            ],
            generatedAt,
            tone: 'casual',
        },
    },

    // ============================================================
    // DAY 5 (Mar 26) -- CLOSING DAY
    // ============================================================
    {
        id: 'homeinspection-day5',
        date: '2026-03-26',
        title: 'Day 5: Closing Day',
        titleJa: 'Day 5: 引き渡し',
        content: 'タイトル会社の会議室。47枚の書類にサイン。パターソン夫人はちょっと寂しそう。カレンは満面の笑み。鍵を渡されながら家の思い出話を聞く。マーカスとジェナ、ついに家主になる。',
        series: 'home-inspection',
        seriesTitle: 'Home Inspection',
        tone: 'casual',
        tags: ['homebuying', 'closing', 'real-estate', 'first-time-buyers', 'bittersweet'],
        createdAt: generatedAt,
        updatedAt: generatedAt,
        conversation: {
            english: [
                { speaker: 'female', text: "Karen: All right, this is the disclosure packet, this is the deed of trust, this is the loan estimate, and these forty-three pages are... mostly initials." },
                { speaker: 'male', text: "Marcus: My hand is going to fall off." },
                { speaker: 'female', text: "Jenna: Just keep signing. Don't think about it." },
                { speaker: 'female', text: "Mrs. Patterson: I brought you both a little something. It's silly, but -- here. A bottle of olive oil. From the tree in the backyard. We pressed it ourselves the last three years." },
                { speaker: 'female', text: "Jenna: Mrs. Patterson. That is not silly at all. Thank you." },
                { speaker: 'female', text: "Mrs. Patterson: The trick with that tree is you have to prune it before March. My husband always said the tree was smarter than the calendar." },
                { speaker: 'male', text: "Marcus: I'll remember that." },
                { speaker: 'female', text: "Mrs. Patterson: And the basement -- yes, water came in once. In 1998. The boys were running through sprinklers and they left the hose on for six hours. I should have told Bob. I just... didn't want it to be a thing." },
                { speaker: 'female', text: "Jenna: It's okay. We figured it out." },
                { speaker: 'female', text: "Mrs. Patterson: The keys. Two front, one back, one garage, and one to the shed. The shed key is a little sticky. You have to jiggle it." },
                { speaker: 'male', text: "Marcus: Thank you. Really." },
                { speaker: 'female', text: "Mrs. Patterson: Be good to it. It's been a good house." },
                { speaker: 'female', text: "Karen: Okay you two -- congratulations. You are officially homeowners. Now get out of my conference room. I have another closing in twenty minutes." },
                { speaker: 'female', text: "Jenna: We did it." },
                { speaker: 'male', text: "Marcus: We did. With termites." },
            ],
            japanese: [
                { speaker: 'female', text: "Karen: それじゃ、これが開示書類一式、これが信託証書、これがローン見積書、で、この43ページは... ほとんどイニシャルだけ。" },
                { speaker: 'male', text: "Marcus: 手が落ちる。" },
                { speaker: 'female', text: "Jenna: サインし続けて。考えないで。" },
                { speaker: 'female', text: "Mrs. Patterson: 二人にちょっとしたものを持ってきたの。バカみたいなんだけど -- これ。オリーブオイル。裏庭の木から。この3年は自分たちで搾ってたの。" },
                { speaker: 'female', text: "Jenna: パターソンさん。バカみたいなんかじゃない。ありがとうございます。" },
                { speaker: 'female', text: "Mrs. Patterson: あの木のコツはね、3月の前に剪定すること。夫がいつも、あの木はカレンダーより賢いって言ってた。" },
                { speaker: 'male', text: "Marcus: 覚えておきます。" },
                { speaker: 'female', text: "Mrs. Patterson: それと地下室 -- ええ、一度水が入ったことがあるの。1998年。子供たちがスプリンクラーで遊んでて、ホースを6時間出しっぱなしにしたの。ボブに言うべきだった。ただ... 大事にしたくなくて。" },
                { speaker: 'female', text: "Jenna: いいんですよ。私たちで気づきましたから。" },
                { speaker: 'female', text: "Mrs. Patterson: 鍵ね。玄関2つ、裏口1つ、ガレージ1つ、物置1つ。物置の鍵はちょっと引っかかる。揺らさないと開かない。" },
                { speaker: 'male', text: "Marcus: ありがとうございます。本当に。" },
                { speaker: 'female', text: "Mrs. Patterson: 大切にしてね。いい家だったから。" },
                { speaker: 'female', text: "Karen: はい二人とも -- おめでとう。これで正式に家主よ。さあ、私の会議室から出てって。20分後に次のクロージングがあるから。" },
                { speaker: 'female', text: "Jenna: やったね。" },
                { speaker: 'male', text: "Marcus: やった。シロアリ付きで。" },
            ],
            generatedAt,
            tone: 'casual',
        },
    },
];
