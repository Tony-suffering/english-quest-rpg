/**
 * 365 English Master -- Week 3: 困った！ (Trouble!)
 * Days 15-21: Apologizing, complaints, returns, emergencies, encouragement, helping, gossip
 *
 * Characters: yuki(28F), gondo(58M), takeshi(35M), lisa(32F), kenji(45M), mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 1 (2026-04) -- WEEK 3
// ============================================================

export const WEEK3_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 15: 謝る・許す (Apologizing & Forgiving)
    // Scene: タケシが大遅刻。謝り方と許し方の英語特訓。
    // ────────────────────────────────────────────────────

    {
        daySlot: 15, japanese: '遅れてすみません',
        english: [
            'Sorry I am late.',
            'So sorry I am late!',
            'I am so sorry I am late. Traffic was insane.',
            "Sorry, sorry, sorry. I know I am late. I swear I left on time but then the train just... sat there. For like twenty minutes. I am the worst, I know.",
        ],
        context: '英語のsorryは軽い。日本語の「すみません」ほど重くない。だから英語ネイティブはsorryを連発する。日本人が思う「謝りすぎ」は英語だとちょうどいい温度。',
        character: 'takeshi', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 15, japanese: '本当にごめん',
        english: [
            'I am really sorry.',
            'I am so sorry, seriously.',
            'I am genuinely sorry. I feel terrible about this.',
            "Look, I am genuinely sorry. Like, not just saying it. I actually feel bad. I know you were waiting and that is on me.",
        ],
        context: '英語で本気の謝罪はgenuinelyやtrulyを足す。I am sorry だけだと「あ、そう」レベル。日本語は「本当に」一発で本気度が上がるけど、英語は重ね方にバリエーションが必要。',
        character: 'takeshi', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 15, japanese: '悪気はなかったんです',
        english: [
            'I did not mean it.',
            'I did not mean to.',
            'I did not mean any harm. It was not intentional.',
            "Honestly, I did not mean anything by it. I was not trying to be rude or anything, it just... came out wrong. You know how I am.",
        ],
        context: '「悪気はない」をno bad intentionと直訳すると法廷みたい。I did not mean to が日常会話の鉄板。mean=「意味する」より「意図する」の用法のほうが会話では圧倒的に多い。',
        character: 'takeshi', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 15, japanese: '許してくれる？',
        english: [
            'Can you forgive me?',
            'Are we good?',
            'Can you forgive me? Or at least not hate me?',
            "So... are we good? Tell me we are good. I cannot handle the silent treatment, it destroys me.",
        ],
        context: 'forgiveはかなり重い単語。友達同士ならAre we good?で十分。日本語の「許して」は軽く使えるけど、英語のforgiveはキリスト教文化の影響で「赦し」のニュアンスがある。',
        character: 'takeshi', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 15, japanese: '次は気をつける',
        english: [
            'I will be careful.',
            'It will not happen again.',
            'I will make sure it does not happen again.',
            "I promise, next time I am setting like five alarms. No, six. And leaving an hour early. Okay maybe not an hour but you get the point.",
        ],
        context: '「気をつける」の直訳 I will be careful は子供っぽい。大人の英語は It will not happen again が定番。「二度としません」と未来を約束する形。日本語は「気をつけます」で済むのに英語は具体的な約束を求められる。',
        character: 'takeshi', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 15, japanese: 'もう怒ってない',
        english: [
            'I am not mad.',
            'I am not mad anymore.',
            'I am over it. No hard feelings.',
            "Honestly? I was annoyed for like two seconds but I am over it now. Life is too short to stay mad about stuff like this.",
        ],
        context: 'mad=怒ってる、はアメリカ英語。イギリス英語のmad=狂ってる、だから注意。No hard feelings は「恨みっこなし」の完璧な訳。日本語にはない便利フレーズ。',
        character: 'lisa', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 15, japanese: 'お互い様だよ',
        english: [
            'It happens.',
            'We have all been there.',
            'Do not worry about it. We have all been there.',
            "Please, do not even worry about it. I was late like three times last week. We have all been there. Nobody is keeping score.",
        ],
        context: '「お互い様」は英語に直訳不可能な日本語ベスト5に入る。We have all been there(みんな経験ある)が最も近い。It goes both ways も使えるけど、日本語の「お互い様」の温かさは出ない。',
        character: 'master', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 15, japanese: '大げさすぎ',
        english: [
            'You are overreacting.',
            'That is a bit much.',
            'Come on, you are totally overreacting.',
            "Okay, relax. You are making this way bigger than it needs to be. It is not that deep, I promise. Take a breath.",
        ],
        context: '英語のoverreactingは直球。日本語の「大げさ」より攻撃力が高い。柔らかく言うならThat is a bit much。It is not that deep は最近の口語で「そこまで深刻じゃない」。若者がよく使う。',
        character: 'mina', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 15, japanese: '謝るの下手で',
        english: [
            'I am bad at apologizing.',
            'I am not great at saying sorry.',
            'I am terrible at apologies. I never know what to say.',
            "I know I should say something better but honestly I am the worst at this. My brain just goes blank and I stand there like an idiot.",
        ],
        context: '英語はI am bad at ___で「苦手」を何でも表現できる。日本語の「下手」は技術に寄るけど、英語のbad atは性格・習慣にも使える。terrible at が「壊滅的に下手」で自虐に最適。',
        character: 'kenji', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 15, japanese: '水に流そう',
        english: [
            'Let us move on.',
            'Let us just forget about it.',
            'Water under the bridge. Let us move on.',
            "You know what, water under the bridge. Seriously. Let us just move on and get a drink. Life is too short for this.",
        ],
        context: '日本語の「水に流す」と英語のwater under the bridgeは奇跡的に同じ比喩。川の水で洗い流す→橋の下を流れ去った水。世界共通で「水」は「過去を流す」イメージなのが面白い。',
        character: 'yuki', category: 'greeting', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 16: レストランでクレーム (Restaurant Complaints)
    // Scene: ケンジが海外のレストランで注文と違うものが来る。
    // ────────────────────────────────────────────────────

    {
        daySlot: 16, japanese: '注文と違います',
        english: [
            'This is not what I ordered.',
            'Excuse me, this is not what I ordered.',
            'Sorry, I think there has been a mix-up. This is not what I ordered.',
            "Um, excuse me? Sorry to bother you but I am pretty sure I ordered the steak, not the fish. Unless the steak turned into fish somehow, which... would be impressive honestly.",
        ],
        context: '日本語は「違います」で済むけど、英語はI thinkやthere has been a mix-upでクッションを入れないと攻撃的に聞こえる。アメリカのレストランは客が偉いわけじゃない。対等な関係。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 16, japanese: 'これ頼んでない',
        english: [
            'I did not order this.',
            'Sorry, I did not order this.',
            'I do not think I ordered this. Could you double-check?',
            "Hey, sorry, this looks great and all but I definitely did not order this. I mean, maybe? No. No, I did not. I am like ninety-nine percent sure.",
        ],
        context: '英語で「頼んでない」を言うとき、could you double-check? を添えると上品。日本語は「頼んでません」で完結するけど、英語はワンクッション入れて相手のミスを責めない姿勢が大事。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 16, japanese: 'まだ来てない',
        english: [
            'It has not come yet.',
            'I am still waiting for my order.',
            'Excuse me, I have been waiting for a while. Is my order on the way?',
            "So, I ordered like... I do not even know, maybe thirty minutes ago? And I am still waiting. I do not want to be that person but, is it coming?",
        ],
        context: '「まだ来てない」をIt did not comeと過去形にすると「もう来ない」みたいに聞こえる。has not come yet と現在完了を使うのが正解。「まだ」=yetは文末に置く。中学英語が意外と重要。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 16, japanese: '冷めてる',
        english: [
            'This is cold.',
            'This is not hot enough.',
            'Excuse me, this is a little cold. Could you heat it up?',
            "I hate to say this but this is like... lukewarm at best. I am not trying to be difficult, I just... a hot meal should be hot, you know?",
        ],
        context: 'coldだと「冷たい」で攻撃的。lukewarm(ぬるい)が正確。英語にはcold/cool/lukewarm/warm/hotと温度表現が5段階あるのに日本語は「熱い・ぬるい・冷たい」の3段階。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 16, japanese: '髪の毛入ってる',
        english: [
            'There is a hair in this.',
            'Um, there is a hair in my food.',
            'Excuse me, I found a hair in my dish. Could I get a new one?',
            "Okay so I do not want to make a scene but there is definitely a hair in this and it is not mine. I mean, look at the color. That is not my hair.",
        ],
        context: '英語でhair in my foodは世界共通のクレーム。日本語は「入ってる」だけで伝わるけど、英語はI found...と自分が発見した形にすると穏やか。There is... で始めるとやや告発っぽい。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 16, japanese: '作り直してもらえる？',
        english: [
            'Can you remake this?',
            'Could I get a new one?',
            'Would it be possible to get this remade?',
            "I hate to ask but is there any chance you could remake this? I feel so bad asking but I really... yeah. I would appreciate it.",
        ],
        context: 'remakeは和製英語っぽいけど実際に英語でも使う。ただし Can I get a new one? のほうがレストランでは自然。Would it be possible は丁寧度MAXで、クレーム時の武器になる。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 16, japanese: 'マネージャー呼んで',
        english: [
            'Get the manager.',
            'Can I speak to a manager?',
            'I would like to speak with a manager, please.',
            "Look, I do not want to escalate this but nothing is getting resolved here so... could I talk to a manager? I am not trying to get anyone in trouble, I just want this sorted out.",
        ],
        context: '英語圏で Can I speak to the manager? は「最終兵器」。日本語の「店長呼んで」より10倍重い。これを言った瞬間に店の空気が変わる。最後の手段として使うべき。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 16, japanese: '会計間違ってない？',
        english: [
            'Is this right?',
            'I think the bill is wrong.',
            'Excuse me, could you double-check the bill? Something does not add up.',
            "Hey, sorry, I do not want to be annoying but I have been looking at this bill and something is off. Like, I definitely did not order three desserts. I wish I did, but I did not.",
        ],
        context: '英語で会計=bill(イギリス)かcheck(アメリカ)。something does not add up は「計算が合わない」の慣用句で、会計以外にも話の辻褄が合わないときに使う。超便利。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 16, japanese: 'チップは含まれてる？',
        english: [
            'Is the tip included?',
            'Does this include the tip?',
            'Is gratuity already included or should I add it?',
            "Quick question. Is the tip already in here? I never know with these things. Some places add it, some do not, and I just stand there looking confused.",
        ],
        context: 'チップ文化は日本にない最大のカルチャーショック。gratuity=チップの正式名。アメリカでは15-20%が標準。含まれてるか聞くのは恥ずかしくない。知らないほうが恥ずかしい。',
        character: 'lisa', category: 'order', month: '2026-04',
    },
    {
        daySlot: 16, japanese: 'もういいです',
        english: [
            'Never mind.',
            'Forget it, it is fine.',
            'You know what, do not worry about it. It is fine.',
            "You know what, just forget it. I do not even have the energy anymore. It is fine. I mean, it is not fine, but it is fine. Let us just go.",
        ],
        context: '「もういいです」は怒りと諦めの合体技。Never mind は状況で意味が真逆になる危険な言葉。丁寧に言えば「気にしないで」、怒りながら言えば「もういい！」。声のトーンが全て。',
        character: 'kenji', category: 'order', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 17: 返品・交換 (Returns & Exchanges)
    // Scene: ユキがネットで買った服のサイズが合わなくて返品しに行く。
    // ────────────────────────────────────────────────────

    {
        daySlot: 17, japanese: '返品したいんですが',
        english: [
            'I want to return this.',
            'I would like to return this, please.',
            'Hi, I would like to return this. I bought it online.',
            "Hi, so I bought this online and it is just... not what I expected. At all. Is there any way I could return it? I have the receipt and everything.",
        ],
        context: 'returnは「帰る」じゃなく「返す」が買い物の基本。I want to は直球すぎるから I would like to が無難。日本の返品は申し訳なさそうにするけど、海外は権利として堂々と返す。文化差。',
        character: 'yuki', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 17, japanese: 'レシートあります',
        english: [
            'I have the receipt.',
            'Here is my receipt.',
            'I have the receipt right here. I bought it last week.',
            "Let me just... hold on, it is in here somewhere. Okay here, got it. Here is the receipt. I bought it like five days ago so I should still be within the return window, right?",
        ],
        context: 'receiptの発音はリシート。pは読まない。英語の黙字(silent letter)の代表格。海外で返品するとき Do you have the receipt? は必ず聞かれる。レシートは命。',
        character: 'yuki', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 17, japanese: '交換できますか',
        english: [
            'Can I exchange this?',
            'Could I exchange this for a different size?',
            'Would it be possible to exchange this for a different size instead of a refund?',
            "So I do not necessarily want my money back, I just want a different size. Like, a medium. Is that something you can do? An exchange instead of a full return?",
        ],
        context: 'exchange=交換、return=返品、refund=返金。この3つは海外ショッピングの三種の神器。日本語は全部「返品」で済ませがちだけど、英語では明確に使い分けないと話が噛み合わない。',
        character: 'yuki', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 17, japanese: 'サイズが違った',
        english: [
            'Wrong size.',
            'It is the wrong size.',
            'It does not fit. I ordered a medium but this is more like a small.',
            "So I ordered a medium, right? And this thing shows up and it is like... did they send me a child's size? I could not even get my arm through the sleeve.",
        ],
        context: '海外のサイズ表記は国によってバラバラ。US、UK、EUで全部違う。さらにブランドでも変わる。It does not fit(合わない)が最も使える万能フレーズ。サイズ問題の8割はこれで解決。',
        character: 'yuki', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 17, japanese: '壊れてた',
        english: [
            'It is broken.',
            'It was defective.',
            'It arrived damaged. Look, there is a crack right here.',
            "I opened the box and it was already broken. Like, I did not do anything. It was just sitting there, cracked. I took photos just in case because, you know, I figured someone would ask.",
        ],
        context: 'broken=壊れた、defective=不良品、damaged=損傷。defectiveが返品時の最強ワード。これを言うと店側の責任が明確になる。broken だと「お前が壊したんじゃ？」と疑われる可能性がある。',
        character: 'yuki', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 17, japanese: '返金してほしい',
        english: [
            'I want a refund.',
            'I would like a refund, please.',
            'I would like a full refund if possible. A store credit does not really work for me.',
            "Honestly, I would rather just get my money back. I know some places do store credit but I am probably not going to shop here again anytime soon so... a refund would be ideal.",
        ],
        context: 'refund=返金、store credit=店舗ポイント。海外の店はstore creditで逃げようとすることが多い。full refund(全額返金)と明確に言わないとポイントで返される罠がある。',
        character: 'yuki', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 17, japanese: '期限内ですか？',
        english: [
            'Is it still within the return period?',
            'Am I still within the return window?',
            'I bought this two weeks ago. Am I still within the return policy?',
            "So I bought this like... two weeks ago, maybe? I do not remember the exact date. Am I still good? I mean, is there a deadline for returns or am I too late?",
        ],
        context: 'return window / return policy が返品期限の英語。windowは「窓」じゃなく「期間」。日本語の「期限」は一発だけど、英語は window(期間)、deadline(締切)、policy(規定)で場面が変わる。',
        character: 'yuki', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 17, japanese: '別のと交換',
        english: [
            'A different one, please.',
            'Can I swap it for a different one?',
            'Could I swap this for a different color? Same size is fine.',
            "I do not want to return it, I just want a different one. Like, same thing but in black maybe? Or whatever you have. I am not picky at this point.",
        ],
        context: 'swap=交換する、はexchangeよりカジュアル。友達同士で「交換しよう」はLet us swap。exchangeはビジネス寄り。日本語の「交換」は1つだけど、英語はフォーマル度で使い分ける。',
        character: 'mina', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 17, japanese: '元の箱ないんですけど',
        english: [
            'I do not have the box.',
            'I do not have the original packaging.',
            'I threw away the box, unfortunately. Is that going to be a problem?',
            "Okay so here is the thing. I threw out the box. I know, I know. I always do that and I always regret it. Is that a deal-breaker or can we still make this work?",
        ],
        context: 'original packaging=元の梱包。英語圏の返品は箱が必要なことが多い。deal-breaker=「それがダメなら全部ダメ」の意味で日常会話でも超使える。恋愛でもビジネスでも。',
        character: 'yuki', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 17, japanese: '送料はどっち持ち？',
        english: [
            'Who pays for shipping?',
            'Do I have to pay for return shipping?',
            'Is the return shipping on me or does the company cover it?',
            "Wait, one more thing. The shipping. Like, do I have to pay to send it back or is that on you guys? Because I already paid shipping to get it here and if I have to pay again to send it back, that is kind of... annoying.",
        ],
        context: '「どっち持ち」を英語にするとwho pays for / who covers / is it on me。on me=私の負担、on the company=会社持ち。飲み会の「ここは俺が」もIt is on me。「持つ」の概念が同じ。',
        character: 'yuki', category: 'shopping', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 18: 緊急事態 (Emergencies)
    // Scene: 権藤マスターが海外での緊急時対応を教える。実体験ベース。
    // ────────────────────────────────────────────────────

    {
        daySlot: 18, japanese: '助けて！',
        english: [
            'Help!',
            'Somebody help!',
            'Help! Somebody call 911!',
            "Help! Somebody! Anybody! I need help over here! Please, someone, I do not know what to do!",
        ],
        context: '英語のHelp!は1語で完結する最強の緊急フレーズ。日本語の「助けて」は2語。緊急時に短いほうが生存率が上がる。911はアメリカ、999はイギリス、110/119は日本。国別に覚えておく。',
        character: 'master', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 18, japanese: '警察呼んで',
        english: [
            'Call the police.',
            'Someone call the police!',
            'We need the police. Can someone call them right now?',
            "Can someone please call the police? Like, right now? I am not joking. This is serious. Does anyone have a phone? Mine is dead.",
        ],
        context: '海外で警察を呼ぶとき、policeは万国共通で通じる。ただし国によって番号が違う。アメリカ911、ヨーロッパ112。日本人が海外で一番困るのは「電話の仕方」より「英語で状況を説明すること」。',
        character: 'master', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 18, japanese: '財布盗まれた',
        english: [
            'My wallet was stolen.',
            'Someone stole my wallet!',
            'I just got pickpocketed. My wallet is gone.',
            "My wallet is gone. I had it like five minutes ago and now it is just... not there. I think someone took it on the train. All my cards, my cash, everything.",
        ],
        context: 'stolen(盗まれた)とlost(失くした)は全然違う。警察にstolen と言えば被害届、lost と言えば遺失届。間違えると保険がおりないことも。pickpocket=スリ、も覚えておくべき旅行英語。',
        character: 'master', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 18, japanese: 'パスポートなくした',
        english: [
            'I lost my passport.',
            'I cannot find my passport.',
            'I think I lost my passport. I have looked everywhere.',
            "I cannot find my passport anywhere. I have checked my bag like ten times, my pockets, the hotel room. It is just gone. What do I even do? This has never happened to me before.",
        ],
        context: 'パスポート紛失は海外トラブルの王様。I lost my passport の5語は旅行前に暗記すべき。大使館=embassy の場所も事前に調べておく。焦っているときに英語は出てこない。だから暗記。',
        character: 'master', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 18, japanese: '病院どこ？',
        english: [
            'Where is the hospital?',
            'Is there a hospital nearby?',
            'I need a hospital. Is there one close by?',
            "I need a hospital. Or a clinic. Anything. Is there something nearby? I do not care how far, just point me in the right direction. Please.",
        ],
        context: 'hospital=大きい病院、clinic=診療所。海外で軽い症状にhospitalと言うと大げさに聞こえることがある。ER(emergency room)=救急。Walk-in clinic=予約なしで行ける診療所。使い分けが重要。',
        character: 'master', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 18, japanese: '大使館に連絡したい',
        english: [
            'I need to contact the embassy.',
            'How do I reach the Japanese embassy?',
            'I need to get in touch with the Japanese embassy. It is urgent.',
            "I need the Japanese embassy. Like, the phone number, the address, anything. I do not even know where it is. Can you help me figure out how to get there? This is kind of an emergency.",
        ],
        context: 'embassy(大使館)とconsulate(領事館)は違う。大使館は首都に1つ、領事館は主要都市にある。旅行先が首都じゃない場合はconsulateのほうが近い。この違いを知らない日本人が多い。',
        character: 'master', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 18, japanese: '保険に入ってます',
        english: [
            'I have insurance.',
            'I have travel insurance.',
            'I have travel insurance. Here is my policy number.',
            "I have insurance, thank goodness. Let me pull it up on my phone. I have the policy number somewhere in my email. Just give me a second.",
        ],
        context: 'insurance=保険。旅行保険=travel insurance。policy number=保険番号。海外の病院はまず保険を確認する。日本の「保険証見せてください」と同じだけど、金額が桁違い。アメリカの救急車は数十万円。',
        character: 'lisa', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 18, japanese: '英語話せる人いますか',
        english: [
            'Does anyone speak English?',
            'Is there anyone who speaks English?',
            'Excuse me, does anyone here speak English? I am in trouble.',
            "I am sorry, I do not speak the language here. Does anyone speak English? Or Japanese? Honestly at this point I will take anything. Hand signals, whatever works.",
        ],
        context: '非英語圏で最初に言うべきフレーズ。Does anyone speak English? は世界中で通じる。でも本当に困ったときは言語よりジェスチャーのほうが速い。スマホの翻訳アプリも緊急時の味方。',
        character: 'takeshi', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 18, japanese: '迷子になった',
        english: [
            'I am lost.',
            'I am completely lost.',
            'I am totally lost. I have no idea where I am right now.',
            "I am so lost it is not even funny. I have been walking in circles for like an hour. Everything looks the same and my phone died so I cannot even use the map.",
        ],
        context: 'I am lost. は3語で世界を救う英語。「迷子」は子供のイメージだけど英語のlostは大人も普通に使う。道で迷う・話についていけない・人生で迷う、全部lostで表現できる。',
        character: 'takeshi', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 18, japanese: 'ここはどこ？',
        english: [
            'Where am I?',
            'Where exactly am I right now?',
            'Excuse me, can you tell me where I am? I am trying to get back to my hotel.',
            "Okay so this is embarrassing but I genuinely have no clue where I am. Like, I do not even know what neighborhood this is. Can you point me to a landmark or a station or something?",
        ],
        context: 'Where am I? は観光客の基本フレーズだけど、実際に使うと不思議な哲学感がある。Where is this? だと「ここは何？」になるので場所を聞くなら Where am I? が正しい。主語が自分なのがポイント。',
        character: 'mina', category: 'travel', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 19: 励ます・慰める (Encouraging & Comforting)
    // Scene: ユキが英語テストで撃沈。みんなで励ます居酒屋の夜。
    // ────────────────────────────────────────────────────

    {
        daySlot: 19, japanese: '大丈夫だよ',
        english: [
            'It is okay.',
            'Hey, it is going to be okay.',
            'It is going to be okay. Everyone has bad days.',
            "Hey, look at me. It is going to be fine. I know it does not feel like it right now but trust me, a week from now you will not even remember this. Okay, maybe you will, but still.",
        ],
        context: '英語は「気にするな」を5通りくらい持っておくと便利。It is okay / Do not worry / It is fine / You will be alright / No big deal。日本語の「大丈夫」並みの万能フレーズ群。場面で使い分けよう。',
        character: 'lisa', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 19, japanese: '気にしないで',
        english: [
            'Do not worry about it.',
            'Do not even worry about it.',
            'Seriously, do not beat yourself up over this.',
            "Hey, stop. Do not even go there. You are doing that thing where you replay everything in your head and make it ten times worse. Just... stop. It is done.",
        ],
        context: 'beat yourself up=自分を責める。日本語の「気にしないで」は相手に向けるけど、英語のDo not beat yourself upは「自分で自分を殴るな」という比喩。英語の励ましは格闘技の比喩が多い。',
        character: 'master', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 19, japanese: '次があるよ',
        english: [
            'There is always next time.',
            'You will get them next time.',
            'This is not the end of the world. There is always next time.',
            "Listen, this one test? It is nothing. You will have like a hundred more chances. And next time you will be ready because now you know what to expect. That is actually an advantage.",
        ],
        context: '日本語の「次がある」は励ましの定番だけど、英語ではYou will get them next timeが面白い。「次は相手を倒せ」というニュアンス。テストを「敵」として擬人化する英語の発想。',
        character: 'takeshi', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 19, japanese: 'よくやったよ',
        english: [
            'You did great.',
            'You did your best.',
            'I am proud of you. You gave it everything you had.',
            "You know what, you actually did great. No, seriously. I know you do not think so but the fact that you even went in there and tried? That takes guts. Most people do not even bother.",
        ],
        context: 'I am proud of you は英語の励ましで最も心に響くフレーズ。日本語の「誇りに思う」は大げさだけど、英語のproudは友達や同僚にも気軽に使う。「よくやった」以上の温かさがある。',
        character: 'lisa', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 19, japanese: '自分を責めないで',
        english: [
            'Do not blame yourself.',
            'Stop being so hard on yourself.',
            'You need to stop being so hard on yourself. It was not your fault.',
            "Okay, I need you to stop doing this. You are sitting there blaming yourself for something that half the people in that room probably failed too. You are not special in the bad way, you know?",
        ],
        context: 'hard on yourself=自分に厳しい。日本語の「自分を責めないで」は優しいけど、英語のStop being so hard on yourselfは「もうやめろ」と少し強い。英語の励ましは優しさの中に「命令」が入る。',
        character: 'kenji', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 19, japanese: '応援してるよ',
        english: [
            'I am rooting for you.',
            'I believe in you.',
            'We are all behind you. You have got this.',
            "Hey, we are all rooting for you. Every single person at this table. And not because we have to, because we actually think you can do it. So get out of your head and just go for it.",
        ],
        context: 'root for=応援する。日本語の「応援する」はsupportでも通じるけど硬い。I am rooting for you が最もアメリカ的で温かい。スポーツの応援が語源。I believe in you は泣ける重さ。',
        character: 'mina', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 19, japanese: '泣いてもいいよ',
        english: [
            'It is okay to cry.',
            'You can cry if you need to.',
            'Let it out. You do not have to hold it in.',
            "Hey, if you need to cry, just cry. Nobody here is going to judge you. I cried at a commercial last week so I am the last person to talk. Just let it out.",
        ],
        context: '英語のLet it out(出して)は感情解放の定番。日本語は「泣いてもいい」と許可を出す形だけど、英語はLet it outと「感情を外に出せ」という能動的な表現。感情を内に溜めるな、が英語圏の価値観。',
        character: 'lisa', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 19, japanese: '一人じゃないから',
        english: [
            'You are not alone.',
            'You do not have to go through this alone.',
            'We are here for you. You do not have to carry this by yourself.',
            "Hey, look around this table. You see all these people? We are here. You are not going through this alone, okay? That is not how this works. We are a team. A messy, loud team, but still.",
        ],
        context: 'You are not alone. は英語で最も感動的な励ましの一つ。日本語の「一人じゃない」と同じ構造だけど、英語ではI am here for you(そばにいるよ)と具体的に言うほうがさらに効く。',
        character: 'master', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 19, japanese: 'きっとうまくいく',
        english: [
            'It will work out.',
            'Things will work out.',
            'Everything is going to work out. I just know it.',
            "I know this sounds cliche but things always work out somehow. They do. Maybe not the way you planned, but they do. You will look back at this and laugh. Probably. Hopefully.",
        ],
        context: 'work out=うまくいく。ジムのワークアウトと同じ単語。「結果が出る→うまくいく」の派生。Things will work out. は英語の楽観主義を凝縮したフレーズ。日本語の「なんとかなる」に近い。',
        character: 'yuki', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 19, japanese: '俺もそうだった',
        english: [
            'I have been there.',
            'Same thing happened to me.',
            'I have been exactly where you are. It gets better, trust me.',
            "Dude, I have been there. Like, exactly there. I failed my first test so bad I wanted to quit. Seriously considered it. But I did not and now... well, I am still bad, but less bad. Progress.",
        ],
        context: 'I have been there. は現在完了の最高傑作。「そこに行ったことがある」じゃなく「その気持ちわかる」。場所じゃなく経験のthere。たった4語で共感を表現できる英語の奥深さ。',
        character: 'kenji', category: 'feeling', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 20: 手伝いを申し出る (Offering Help)
    // Scene: 居酒屋に外国人観光客が迷い込んでくる。みんなで助ける。
    // ────────────────────────────────────────────────────

    {
        daySlot: 20, japanese: '何かお手伝いしましょうか',
        english: [
            'Can I help you?',
            'Need any help?',
            'You look a little lost. Can I help you with anything?',
            "Hey, you look like you might need some help. No? Yes? I mean, you are staring at that menu like it just insulted you so I figured I would ask.",
        ],
        context: 'Can I help you? は店員の定番。友達っぽく言うなら Need a hand? が良い。日本語の「お手伝い」は丁寧だけど、英語のCan I help you? は距離感ゼロ。すぐ手を差し伸べる文化。',
        character: 'yuki', category: 'request', month: '2026-04',
    },
    {
        daySlot: 20, japanese: '道わかります？',
        english: [
            'Do you know the way?',
            'Are you looking for directions?',
            'Do you know where you are heading? I can help with directions.',
            "Are you trying to get somewhere? I grew up around here so I know these streets pretty well. Well, most of them. The back alleys are a mystery even to me.",
        ],
        context: '英語で道を聞く/教えるときはdirections(複数形)を使う。direction(単数)は「方向」、directions(複数)は「道順」。この単複の違いは日本人が間違えやすいポイント。',
        character: 'takeshi', category: 'request', month: '2026-04',
    },
    {
        daySlot: 20, japanese: '案内しましょうか',
        english: [
            'I can show you.',
            'Want me to walk you there?',
            'It is kind of hard to explain. Want me to just walk you there?',
            "You know what, it is really confusing to explain and honestly my directions are terrible. How about I just walk you there? It is like five minutes. No big deal.",
        ],
        context: '日本語の「案内する」はguide, show, walk you thereで全部訳せる。でもWant me to walk you there?が最も親切。「一緒に歩いて連れて行く」は英語圏でも嬉しいジェスチャー。',
        character: 'takeshi', category: 'request', month: '2026-04',
    },
    {
        daySlot: 20, japanese: '通訳しましょうか',
        english: [
            'I can translate.',
            'Need me to translate?',
            'I can translate for you if that helps. My English is not perfect but I will try.',
            "I speak a little English. Well, kind of. Enough to get by. Want me to try to translate? I cannot promise it will be perfect but it is better than nothing, right?",
        ],
        context: 'translateとinterpretは違う。translate=書き言葉の翻訳、interpret=口頭の通訳。でも日常会話ではtranslateで両方OK。この区別をするのは専門家だけ。使いやすいほうでいい。',
        character: 'mina', category: 'request', month: '2026-04',
    },
    {
        daySlot: 20, japanese: '荷物持ちましょうか',
        english: [
            'Let me help with that.',
            'Can I carry that for you?',
            'That looks heavy. Let me give you a hand.',
            "Whoa, that looks way too heavy for one person. Here, let me grab one of those. No, seriously, I insist. My arms are just sitting here doing nothing anyway.",
        ],
        context: 'give you a hand=手を貸す。lend a hand も同じ。日本語の「手伝う」は抽象的だけど、英語は「手を貸す」と身体の一部を使う比喩が多い。hand=助け、は英語圏の根本思想。',
        character: 'kenji', category: 'request', month: '2026-04',
    },
    {
        daySlot: 20, japanese: '写真撮りましょうか',
        english: [
            'Want me to take a photo?',
            'I can take a picture for you.',
            'Want me to take a picture of you guys? You look like you are trying to get a group shot.',
            "Hey, are you trying to take a group photo? I can take it for you if you want. Just tell me when you are ready. And I will take like ten because someone always blinks.",
        ],
        context: 'photo=フォーマル、picture=カジュアル、shot=写真好き。groupie はNG(selfieの団体版はgroup selfie)。外国人に写真を頼まれるのは国際交流の入り口。この一言で友達ができる。',
        character: 'yuki', category: 'request', month: '2026-04',
    },
    {
        daySlot: 20, japanese: 'タクシー呼びましょうか',
        english: [
            'Want me to call a taxi?',
            'Should I call a cab for you?',
            'Let me call you a cab. It will be easier than trying to find the station from here.',
            "Let me get you a cab. Actually, do you have Uber? That might be cheaper. No? Okay, regular taxi then. I will call one. Just wait here, it should be like five minutes.",
        ],
        context: 'taxi=世界共通、cab=アメリカ英語。イギリスではblack cab。今はUber/Lyftが主流の国も多い。call a cab は「電話する」じゃなく「呼ぶ」。get you a cab のほうがよりカジュアル。',
        character: 'master', category: 'request', month: '2026-04',
    },
    {
        daySlot: 20, japanese: 'おすすめ教えましょうか',
        english: [
            'Want some recommendations?',
            'I can recommend some places.',
            'If you are looking for good food around here, I know all the best spots.',
            "Oh, you are looking for somewhere to eat? You came to the right person. I know every good restaurant within a ten-block radius. It is basically my superpower. And my wallet's worst enemy.",
        ],
        context: 'spot=場所(カジュアル)。the best spots=おすすめの場所。日本語の「おすすめ」は英語でrecommendation だけど、I know some great spots のほうが地元民っぽくてかっこいい。',
        character: 'lisa', category: 'request', month: '2026-04',
    },
    {
        daySlot: 20, japanese: '席どうぞ',
        english: [
            'Please, sit.',
            'Here, have a seat.',
            'Please, take a seat. Make yourself comfortable.',
            "Oh, come on, sit down. You are standing there like you are about to give a speech. Relax, grab a chair. There is plenty of room. Scoot over, Takeshi.",
        ],
        context: 'have a seat と take a seat は同じ意味だけど、sit down はやや命令的。make yourself comfortable(楽にして)と合わせると最強のおもてなしフレーズ。日本語の「どうぞ」の万能さは英語にない。',
        character: 'master', category: 'request', month: '2026-04',
    },
    {
        daySlot: 20, japanese: '何か困ってますか',
        english: [
            'Is everything okay?',
            'Are you doing alright?',
            'Hey, is everything alright? You look like you could use some help.',
            "You okay? You have been standing there looking at your phone for a while and you seem kind of stressed. I do not want to be nosy but if there is anything I can do, just say the word.",
        ],
        context: 'You look like you could use some help. は天才的なフレーズ。「助けが必要そう」を「助けを使えそう」と表現する。could useは「あったら嬉しい」のニュアンスで、押しつけがましくない。',
        character: 'mina', category: 'request', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 21: 噂話・ドラマ (Gossip & Drama)
    // Scene: 金曜の夜。居酒屋で盛り上がる噂話タイム。
    // ────────────────────────────────────────────────────

    {
        daySlot: 21, japanese: '聞いた？',
        english: [
            'Did you hear?',
            'Did you hear about this?',
            'Oh my god, did you hear what happened?',
            "Okay wait wait wait. Before we order, did you hear about what happened? No? Oh, you are going to lose your mind. Sit down. This is going to take a minute.",
        ],
        context: '噂話は Did you hear? で始まるのが万国共通。日本語の「聞いた？」と完全に同じ構造。ここからの情報は100%楽しい話か衝撃の話。boring な話がDid you hear?で始まることはない。',
        character: 'mina', category: 'social', month: '2026-04',
    },
    {
        daySlot: 21, japanese: '信じられない',
        english: [
            'Unbelievable.',
            'I cannot believe it.',
            'I literally cannot believe this is real.',
            "I... no. No way. I refuse to believe it. You are making this up. There is no way. Okay tell me more because I need to hear every detail.",
        ],
        context: 'literally は本来「文字通り」だけど、現代英語では「マジで」の強調語。I literally cannot は文法的にはおかしいけど、ネイティブ全員が使う。言語は変化する生き物。',
        character: 'mina', category: 'social', month: '2026-04',
    },
    {
        daySlot: 21, japanese: 'マジで？',
        english: [
            'Seriously?',
            'Are you serious right now?',
            'You are kidding me. Are you serious?',
            "Wait, seriously? Like for real? You are not messing with me? Because I have been fooled before and I am not falling for it again. Okay fine, I believe you. That is insane.",
        ],
        context: '日本語の「マジ？」は Seriously? / For real? / No way! の3つでカバーできる。Really? は弱い。Are you serious? のほうが「マジ感」が出る。No way はさらに強い。衝撃度で使い分ける。',
        character: 'takeshi', category: 'social', month: '2026-04',
    },
    {
        daySlot: 21, japanese: '誰にも言わないでね',
        english: [
            'Do not tell anyone.',
            'Keep this between us.',
            'Okay, I am telling you but you have to promise not to tell anyone.',
            "Okay listen, I am only telling you this because I trust you. But you cannot tell anyone. I mean it. Not even Takeshi. Especially not Takeshi. That guy cannot keep a secret to save his life.",
        ],
        context: 'Keep this between us は映画でよく聞くかっこいいフレーズ。「ここだけの話」を英語にするとthis stays between us。日本語の「内緒ね」は可愛いけど、英語は「契約」に近い響きがある。',
        character: 'lisa', category: 'social', month: '2026-04',
    },
    {
        daySlot: 21, japanese: 'ここだけの話',
        english: [
            'Between you and me.',
            'Just between you and me.',
            'Okay, just between you and me? This is not something I should be sharing but...',
            "Alright, this is strictly between us. And I mean strictly. If this gets out I will know exactly who talked. I am looking at you. Okay anyway, so apparently...",
        ],
        context: 'between you and me は文法的に正しい(meは目的格)。between you and I と言う人が多いけど実は間違い。でもネイティブも間違える。正しさより「秘密を共有する空気」が大事な場面。',
        character: 'kenji', category: 'social', month: '2026-04',
    },
    {
        daySlot: 21, japanese: 'あの二人付き合ってるらしい',
        english: [
            'They are dating.',
            'Apparently those two are together.',
            'So I heard those two are actually dating. Like, officially.',
            "Okay so you know those two? Yeah, they are together. Like, together together. I saw them at the station last week holding hands and I almost dropped my coffee. I am still processing it honestly.",
        ],
        context: 'apparently=「らしい」は噂話の最強ワード。「自分は見てないけど」という責任回避のニュアンスがある。日本語の「らしい」と完全に同じ機能。噂話にはapparentlyを入れておけば安全。',
        character: 'yuki', category: 'social', month: '2026-04',
    },
    {
        daySlot: 21, japanese: 'まさか',
        english: [
            'No way.',
            'You have got to be kidding me.',
            'Shut up. No way that actually happened.',
            "Shut up. Shut up right now. No. No way. I called this like six months ago and everyone said I was crazy. I knew it! I knew something was going on!",
        ],
        context: 'Shut up! は噂話の文脈では「嘘でしょ！」の意味。「黙れ」ではない。声のトーンと状況で180度意味が変わる。日本語の「うそ！」と同じポジション。知らないと誤解する英語の代表格。',
        character: 'takeshi', category: 'social', month: '2026-04',
    },
    {
        daySlot: 21, japanese: 'それでどうなったの？',
        english: [
            'Then what happened?',
            'And then what?',
            'Wait, wait. Then what happened? Do not skip the good part.',
            "Hold on, you cannot just stop there. Then what? What did they say? What did you say? I need the whole thing. From the beginning. Actually no, start from the good part.",
        ],
        context: '噂話で最も大事なフレーズ=And then what? 相手に続きを促す魔法の言葉。日本語の「で？」「それで？」と同じだけど、英語のAnd then?にはもっとワクワク感がある。前のめりの姿勢が伝わる。',
        character: 'yuki', category: 'social', month: '2026-04',
    },
    {
        daySlot: 21, japanese: '嘘でしょ',
        english: [
            'No way.',
            'You are lying.',
            'There is absolutely no way. You are making this up.',
            "Stop it. You are lying. There is no way. I know you and I know when you are making stuff up and this has to be... wait, you are serious? Oh my god. This changes everything.",
        ],
        context: 'You are lying は直訳すると「嘘つき」だけど、噂話の中では「マジで!?」と同じ。嘘=lieは強い言葉のはずなのに、驚きの文脈では軽くなる。日本語の「嘘でしょ」も同じ現象。言語って面白い。',
        character: 'mina', category: 'social', month: '2026-04',
    },
    {
        daySlot: 21, japanese: 'もう一回言って',
        english: [
            'Say that again.',
            'Wait, say that one more time.',
            'Hold on, I need you to say that again. Slowly this time.',
            "Wait. Stop everything. Rewind. Say that again. Slower. Because I think I just heard something absolutely insane and I need to make sure my ears are not broken.",
        ],
        context: 'Say that again. は聞き返しにもなるし、噂話では「衝撃的すぎてもう一回聞きたい」の意味にもなる。Come again? はイギリス英語で同じ。日本語の「え、何？もう一回」と完全に同じリズム。',
        character: 'kenji', category: 'social', month: '2026-04',
    },
];

// ============================================================
// WEEK 3 DAY THEMES
// ============================================================

export const WEEK3_DAY_THEMES: Record<number, { title: string; titleEn: string; category: string; scene: string; keywords: KeyWord[] }> = {
    15: {
        title: '謝る・許す', titleEn: 'Apologizing & Forgiving', category: 'greeting',
        scene: 'タケシが大遅刻。謝り方と許し方の英語特訓。',
        keywords: [
            { en: 'apologize', ja: '謝る', pron: 'アポロジャイズ', example: 'I want to apologize for being late.', note: 'sorryは「ごめん」、apologizeは「お詫びする」。フォーマル度が全然違う。ビジネスではapologize一択。' },
            { en: 'sincere', ja: '誠実な', pron: 'シンシア', example: 'I am being sincere.', note: '発音はシンシア。「心からの」という意味。sincere apology=心からの謝罪。手紙の結びにSincerely(敬具)。' },
            { en: 'forgive', ja: '許す', pron: 'フォギヴ', example: 'Can you forgive me?', note: 'forgive=許す、forget=忘れる。Forgive and forget(許して忘れる)はセットの慣用句。' },
            { en: 'blame', ja: '責める', pron: 'ブレイム', example: 'Do not blame yourself.', note: 'blameは人に使う。criticize(批判する)とは違う。blame=「誰のせいか」の責任追及。' },
            { en: 'misunderstanding', ja: '誤解', pron: 'ミスアンダスタンディング', example: 'It was a misunderstanding.', note: '長い単語だけど分解すればmis+understanding=間違った理解。トラブル解決の鍵になる単語。' },
        ],
    },
    16: {
        title: 'レストランでクレーム', titleEn: 'Restaurant Complaints', category: 'order',
        scene: 'ケンジが海外のレストランで注文と違うものが来る。',
        keywords: [
            { en: 'wrong order', ja: '注文間違い', pron: 'ロング オーダー', example: 'I got the wrong order.', note: 'wrong=間違った。rightの反対。wrong order, wrong size, wrong person。超万能。' },
            { en: 'overcharged', ja: '多く請求された', pron: 'オーバーチャージド', example: 'I think I was overcharged.', note: 'over+charged=過剰に請求された。undercharged(少なく請求)は言わないのが人情。' },
            { en: 'manager', ja: 'マネージャー', pron: 'マネジャー', example: 'Can I speak to a manager?', note: '英語のmanagerは「店長」から「部長」まで幅広い。日本語のマネージャーより偉いイメージ。' },
            { en: 'tip', ja: 'チップ', pron: 'ティップ', example: 'How much should I tip?', note: 'tip=先端、ヒント、チップの3つの意味がある。チップ文化はアメリカ旅行の最大の壁。' },
            { en: 'receipt', ja: 'レシート', pron: 'リシート', example: 'Can I get a receipt?', note: '発音注意！pは読まない。re-ceit=リシート。日本語の「レシート」でも通じるけど発音は違う。' },
        ],
    },
    17: {
        title: '返品・交換', titleEn: 'Returns & Exchanges', category: 'shopping',
        scene: 'ユキがネットで買った服のサイズが合わなくて返品しに行く。',
        keywords: [
            { en: 'refund', ja: '返金', pron: 'リファンド', example: 'I would like a refund.', note: 'fund=資金、re+fund=資金を戻す=返金。full refund(全額返金)とpartial refund(一部返金)がある。' },
            { en: 'exchange', ja: '交換', pron: 'イクスチェンジ', example: 'Can I exchange this?', note: 'ex+change=外に出して変える。returnは「返す」、exchangeは「取り替える」。目的が違う。' },
            { en: 'receipt', ja: 'レシート', pron: 'リシート', example: 'I have the receipt.', note: '返品の必須アイテム。英語圏では No receipt, no return がルール。レシートは命綱。' },
            { en: 'defective', ja: '不良品の', pron: 'ディフェクティブ', example: 'This item is defective.', note: 'brokenより正式。defective=製造上の欠陥。この単語を使うと返品の成功率が上がる。' },
            { en: 'warranty', ja: '保証', pron: 'ウォランティ', example: 'Is it still under warranty?', note: 'under warranty=保証期間内。guarantee(保証する)と似ているけどwarrantyは書面の保証。' },
        ],
    },
    18: {
        title: '緊急事態', titleEn: 'Emergencies', category: 'travel',
        scene: '権藤マスターが海外での緊急時対応を教える。実体験ベース。',
        keywords: [
            { en: 'embassy', ja: '大使館', pron: 'エンバシー', example: 'I need the Japanese embassy.', note: 'embassy=大使館(首都に1つ)、consulate=領事館(主要都市)。旅行先でどちらが近いか事前に調べる。' },
            { en: 'insurance', ja: '保険', pron: 'インシュランス', example: 'I have travel insurance.', note: 'travel insurance=旅行保険、health insurance=健康保険。海外では保険なしの医療費は破産レベル。' },
            { en: 'stolen', ja: '盗まれた', pron: 'ストウルン', example: 'My wallet was stolen.', note: 'steal-stole-stolen。lost(失くした)と混同しない。stolen=被害届、lost=遺失届。保険に関わる。' },
            { en: 'emergency', ja: '緊急', pron: 'イマージェンシー', example: 'This is an emergency.', note: '最重要単語。emergency room(ER)=救急。emergency exit=非常口。emerge(出現する)が語源。' },
            { en: 'lost and found', ja: '遺失物取扱所', pron: 'ロスト アンド ファウンド', example: 'Where is the lost and found?', note: 'lost(失くした)+found(見つかった)。日本の「お忘れ物センター」に相当。空港・駅で必須。' },
        ],
    },
    19: {
        title: '励ます・慰める', titleEn: 'Encouraging & Comforting', category: 'feeling',
        scene: 'ユキが英語テストで撃沈。みんなで励ます居酒屋の夜。',
        keywords: [
            { en: 'hang in there', ja: 'がんばれ', pron: 'ハング イン ゼア', example: 'Hang in there, you got this.', note: '直訳は「そこにしがみついてろ」。崖からぶら下がってる猫のポスターが有名。アメリカ的励まし。' },
            { en: 'proud', ja: '誇りに思う', pron: 'プラウド', example: 'I am proud of you.', note: '日本語で「誇りに思う」は大げさだけど、英語のproudはカジュアルに使う。友達にも言える。' },
            { en: 'believe', ja: '信じる', pron: 'ビリーヴ', example: 'I believe in you.', note: 'believe=信じる、believe in=信頼する。inが付くと「可能性を信じる」になる。人を応援するときの最終兵器。' },
            { en: 'support', ja: '支える', pron: 'サポート', example: 'I will always support you.', note: '日本語の「サポート」より英語のsupportは感情面が強い。emotional support=精神的な支え。' },
            { en: 'tough', ja: 'つらい・タフな', pron: 'タフ', example: 'I know it is tough right now.', note: 'tough=困難な、丈夫な。That is tough(それはつらいね)は共感のフレーズ。日本語のタフとはニュアンスが違う。' },
        ],
    },
    20: {
        title: '手伝いを申し出る', titleEn: 'Offering Help', category: 'request',
        scene: '居酒屋に外国人観光客が迷い込んでくる。みんなで助ける。',
        keywords: [
            { en: 'assist', ja: '手伝う', pron: 'アシスト', example: 'How can I assist you?', note: 'helpよりフォーマル。空港やホテルで使われる。日本語の「アシスト」より丁寧な響き。' },
            { en: 'offer', ja: '申し出る', pron: 'オファー', example: 'Can I offer you a drink?', note: 'offer=差し出す。give(あげる)より丁寧。「よかったら」のニュアンスがあって押しつけがましくない。' },
            { en: 'guide', ja: '案内する', pron: 'ガイド', example: 'Let me guide you there.', note: '名詞(ガイドさん)にも動詞(案内する)にもなる。tour guide=観光ガイド。日本語と同じ使い方。' },
            { en: 'translate', ja: '翻訳する', pron: 'トランスレイト', example: 'I can translate for you.', note: 'translate=書面の翻訳、interpret=口頭の通訳。でもカジュアルにはtranslateで両方OK。' },
            { en: 'volunteer', ja: '自ら進んでやる', pron: 'ヴォランティア', example: 'I volunteered to help.', note: '名詞(ボランティア)だけじゃなく動詞(志願する)にもなる。volunteer to=進んで~する。' },
        ],
    },
    21: {
        title: '噂話・ドラマ', titleEn: 'Gossip & Drama', category: 'social',
        scene: '金曜の夜。居酒屋で盛り上がる噂話タイム。',
        keywords: [
            { en: 'rumor', ja: '噂', pron: 'ルーマー', example: 'I heard a rumor about them.', note: 'rumor has it that...=噂では~らしい。英語のrumor は日本語の「噂」と同じくらいネガティブ。' },
            { en: 'apparently', ja: 'らしい', pron: 'アパレントリー', example: 'Apparently they broke up.', note: '噂話の最重要ワード。「自分は見てないけど」の責任回避。文頭に置くだけで噂話モードに切り替わる。' },
            { en: 'secret', ja: '秘密', pron: 'シークレット', example: 'It is supposed to be a secret.', note: 'keep a secret=秘密を守る。open secret=公然の秘密。secretは名詞にも形容詞にもなる。' },
            { en: 'gossip', ja: '噂話', pron: 'ゴシップ', example: 'I do not like to gossip but...', note: '名詞(噂話)にも動詞(噂話をする)にもなる。I do not like to gossip, but... は噂話を始める定番フレーズ。' },
            { en: 'shocking', ja: '衝撃的な', pron: 'ショッキング', example: 'That is actually shocking.', note: '日本語のショッキングと同じだけど、英語は驚きの強さで使い分ける: surprising < shocking < mind-blowing。' },
        ],
    },
};
