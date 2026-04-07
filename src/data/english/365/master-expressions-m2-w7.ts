/**
 * 365 English Master -- Month 2 Week 7: 日常生活 (Daily Life)
 * Days 45-51: 70 expressions
 * Month: May 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 2 (2026-05) -- WEEK 7
// ============================================================

export const MONTH2_W7_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 45: 外食する (Eating Out)
    // Scene: タケシがお気に入りのレストランに連れて行く。注文から会計まで。
    // ────────────────────────────────────────────────────

    {
        daySlot: 45, japanese: '予約してあります',
        english: [
            'I have a reservation.',
            'I have a reservation under Takeshi.',
            'Hi, I have a reservation for two at seven under Takeshi.',
            "Hi there. I have a reservation for seven o'clock. It should be under Takeshi. Party of two. I called earlier today to make sure we could get a table by the window if possible. Hope that worked out.",
        ],
        context: 'under は「〜の名前で」。日本語では「田中で予約してます」だけど、英語は under を使う。party of two は「2名様」で、自分で言う場合にも使う。',
        character: 'takeshi', category: 'order', month: '2026-05',
    },
    {
        daySlot: 45, japanese: 'おすすめは何ですか？',
        english: [
            'What do you recommend?',
            'What would you recommend here?',
            "What do you recommend? We've never been here before.",
            "So this is our first time here. What would you recommend? We are not picky or anything but if there is something this place is known for we would love to try it. Also, are the portions big? Because I am kind of starving right now.",
        ],
        context: 'recommend が定番だけど What is good here? も超自然。known for は「〜で有名」。picky は「好き嫌いが多い」で、not picky は「何でも大丈夫」の意味になる。',
        character: 'yuki', category: 'order', month: '2026-05',
    },
    {
        daySlot: 45, japanese: 'これにします',
        english: [
            "I'll have this.",
            "I'll go with the pasta.",
            "I think I'll go with the pasta. And could I get a side salad with that?",
            "Okay, I think I will go with the seafood pasta. And can I get a side salad with that? Oh, and a glass of white wine. Actually, make that a beer. No wait, yeah wine is fine. Sorry, I always do this. Wine, please.",
        ],
        context: "I will have... と I will go with... が注文の2大定番。go with は「〜にする」で、迷った末に決めた感が出る。make that は「やっぱりそれに変更で」。注文で迷う人あるある。",
        character: 'lisa', category: 'order', month: '2026-05',
    },
    {
        daySlot: 45, japanese: 'お会計お願いします',
        english: [
            'Check, please.',
            'Could we get the check?',
            "Excuse me, could we get the check when you get a chance?",
            "Excuse me. Could we get the check when you get a chance? No rush at all. We are just about done here. Everything was amazing by the way. That pasta was incredible. We will definitely be back. Oh, and do you guys take credit cards?",
        ],
        context: 'check はアメリカ英語、bill はイギリス英語で同じ意味。when you get a chance は「お手すきのときに」で丁寧。no rush は「急がなくていいですよ」。日本はレジで払うけど、海外はテーブル会計が普通。',
        character: 'kenji', category: 'order', month: '2026-05',
    },
    {
        daySlot: 45, japanese: 'チップっていくら置くの？',
        english: [
            'How much should I tip?',
            'How much are we supposed to tip?',
            'How much are we supposed to tip here? Is fifteen percent okay?',
            "How much are we supposed to tip? I never know the right amount. I have heard twenty percent is standard now but honestly that feels like a lot on top of everything. But I also do not want to be that person who under-tips. What do you usually do?",
        ],
        context: 'tip は「チップを置く」の動詞にもなる。under-tip は「チップが少ない」。日本にチップ文化がないので、海外で一番戸惑うポイント。on top of は「〜に加えて」。',
        character: 'mina', category: 'order', month: '2026-05',
    },
    {
        daySlot: 45, japanese: 'アレルギーがあるんですけど',
        english: [
            'I have an allergy.',
            'I have a nut allergy, actually.',
            'Just so you know, I have a nut allergy. Does this have any nuts in it?',
            "Before we order, I should probably mention that I have a pretty serious nut allergy. It is not like a mild thing. So could you double-check with the kitchen if there are any tree nuts in the sauce? I just want to make sure because last time I did not ask and it did not go well.",
        ],
        context: 'allergy は英語では「アラジー」に近い発音。nut allergy は海外で超重要な情報。mention は「伝えておく」。it did not go well は「大変なことになった」の控えめな表現。',
        character: 'lisa', category: 'order', month: '2026-05',
    },
    {
        daySlot: 45, japanese: '持ち帰りできますか？',
        english: [
            'Can I get this to go?',
            'Can we get a box for the rest?',
            "Could we get a to-go box? We couldn't finish everything.",
            "Could we get a box for the leftovers? We ordered way too much and I hate wasting food. This pasta is too good to leave behind. I will probably have it for lunch tomorrow. My wife always says I have no self-control when it comes to ordering but then she eats the leftovers too so she cannot talk.",
        ],
        context: 'to-go box はアメリカの持ち帰り容器。leftovers は「食べ残り」でネガティブじゃない。doggy bag は古い言い方。she cannot talk は「人のこと言えない」の口語表現。',
        character: 'kenji', category: 'order', month: '2026-05',
    },
    {
        daySlot: 45, japanese: 'めっちゃ美味しかった',
        english: [
            'That was so good.',
            'That was amazing.',
            'That was hands down the best meal I have had in a while.',
            "Oh my god, that was incredible. The steak was cooked perfectly and that dessert at the end? I could eat three of those. I am so full I can barely move but it was totally worth it. We have to come back here. I am going to tell everyone about this place.",
        ],
        context: 'hands down は「文句なしに」。barely は「かろうじて」。I can barely move は「動けないくらい」の大げさ表現。worth it は「それだけの価値があった」で、高くても美味しければ使う。',
        character: 'takeshi', category: 'order', month: '2026-05',
    },
    {
        daySlot: 45, japanese: '別々でお願いします',
        english: [
            'Separate checks.',
            'Could we get separate checks?',
            'Could we get separate checks, please? We are paying individually.',
            "Excuse me, would it be possible to split the check? Or actually, could we just get separate checks? I know it is kind of a pain for you guys but we all had different things and figuring out who owes what is always a nightmare. Easier this way, right?",
        ],
        context: 'separate checks は「別会計」。split the check は「割り勘」。individually は「個別に」。a pain は「面倒」のカジュアル表現。nightmare は「悪夢」だけど日常会話では「超面倒」の意味。',
        character: 'yuki', category: 'order', month: '2026-05',
    },
    {
        daySlot: 45, japanese: '店員さんがすごく感じよかった',
        english: [
            'The staff was great.',
            'The service was really good here.',
            'The service was really good. Our server was super friendly.',
            "Can I just say, our server was awesome. She was so attentive but not in an annoying way. Like she checked on us at the perfect times and never rushed us. That makes such a difference. The food can be amazing but if the service is bad it ruins the whole experience, you know?",
        ],
        context: 'server はアメリカでウェイター/ウェイトレスの代わりに使うジェンダーニュートラルな言葉。attentive は「よく気がつく」。makes a difference は「大きな違いを生む」。日本の「感じいい」は英語で friendly + attentive の組み合わせ。',
        character: 'master', category: 'order', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 46: 美容院・床屋 (Hair Salon)
    // Scene: ユキとミナが美容院トーク。ケンジは床屋派。ヘアスタイルで盛り上がる。
    // ────────────────────────────────────────────────────

    {
        daySlot: 46, japanese: '少し切ってください',
        english: [
            'Just a trim, please.',
            'Just a trim. Not too short.',
            'Just a trim, please. Maybe an inch or so off the ends.',
            "I do not want anything drastic. Just a trim. Like maybe an inch off the ends to get rid of the split ends. Last time I said a little off the top and they took off way more than I expected. I almost cried in the chair. So just a little, please.",
        ],
        context: 'trim は「整える程度に切る」。cut よりも軽い。split ends は「枝毛」。an inch off は「1インチ切る」で、海外ではセンチじゃなくインチで言う。drastic は「大幅な変化」。',
        character: 'yuki', category: 'request', month: '2026-05',
    },
    {
        daySlot: 46, japanese: '前髪をもう少し短くしたい',
        english: [
            'Shorter bangs, please.',
            'Could you take the bangs up a bit?',
            'I want to go a little shorter on the bangs. Like right above my eyebrows.',
            "Could you go a little shorter on the bangs? I feel like they are getting in my eyes all the time. I want them to sit right above my eyebrows. But not too short because then I look like I cut them myself at two in the morning. You know that look? Yeah, not that.",
        ],
        context: 'bangs は「前髪」のアメリカ英語。イギリスでは fringe。take up は「短くする」。sit above は「〜の上にかかる」。前髪の長さは万国共通の悩み。',
        character: 'mina', category: 'request', month: '2026-05',
    },
    {
        daySlot: 46, japanese: 'いつもの感じでお願いします',
        english: [
            'The usual, please.',
            'Same as last time.',
            'Just do the same thing as last time. It was perfect.',
            "Just do whatever you did last time. I loved it. I do not even know what it is called technically but it looked great. You have my photos in the system, right? Just match that. I trust you. I am the worst at describing what I want so I just leave it to the professionals.",
        ],
        context: 'the usual は「いつもの」で美容院でもバーでもどこでも使える万能フレーズ。I trust you は「お任せします」のニュアンス。leave it to は「〜に任せる」。',
        character: 'kenji', category: 'request', month: '2026-05',
    },
    {
        daySlot: 46, japanese: '染めたいんだけど',
        english: [
            'I want to dye my hair.',
            'I am thinking about getting my hair colored.',
            'I have been thinking about dyeing my hair. Maybe something lighter.',
            "I have been going back and forth about dyeing my hair for months now. I want something lighter but I am scared it is going to look weird or damage my hair. What do you think? Would a light brown work with my skin tone? I do not want to look like I am trying too hard.",
        ],
        context: 'dye は「染める」。get my hair colored はサロンでやってもらう言い方。go back and forth は「迷っている」。skin tone は「肌の色味」。trying too hard は「頑張りすぎ感」で、自然に見せたいニュアンス。',
        character: 'yuki', category: 'request', month: '2026-05',
    },
    {
        daySlot: 46, japanese: '髪型変えたんだ、いいじゃん！',
        english: [
            'New haircut! Nice!',
            'You got a haircut! It looks great!',
            'Wait, did you change your hair? It looks really good on you!',
            "Whoa, hold on. Did you get a haircut? When did that happen? It looks amazing. Seriously, it really suits you. You should have done this ages ago. Makes you look like five years younger, not that you needed it. But yeah, it is a good look. Who does your hair?",
        ],
        context: 'suits you は「似合ってる」。looks good on you も同じ意味。ages ago は「ずっと前に」。Who does your hair? は「どこの美容院行ってるの？」の自然な聞き方。日本語の「いいじゃん」の軽さは Nice! で出せる。',
        character: 'takeshi', category: 'request', month: '2026-05',
    },
    {
        daySlot: 46, japanese: '失敗された...',
        english: [
            'They messed it up.',
            'They totally messed up my hair.',
            'I asked for a trim and they chopped off like three inches. I am devastated.',
            "I went in and showed them a picture of exactly what I wanted and I do not know what happened but I came out looking like a completely different person. And not in a good way. I wanted layers and somehow I got a bob. I literally went home and cried. I am not going back there ever.",
        ],
        context: 'messed up は「やらかした」。chopped off は「バッサリ切った」のニュアンス。devastated は「打ちのめされた」で、髪型の失敗に使うとドラマチック。layers は「レイヤー」、bob は「ボブ」。',
        character: 'mina', category: 'request', month: '2026-05',
    },
    {
        daySlot: 46, japanese: '美容院って高いよね',
        english: [
            'Salons are expensive.',
            'Getting your hair done is so expensive.',
            'Getting your hair done costs a fortune these days. I spend more on my hair than on food.',
            "I honestly cannot believe how much I spend on my hair. Between the cut, the color, and the treatment, it is like two hundred dollars every six weeks. My husband thinks I am insane. But have you seen what happens when I do not go? It is not pretty. It is a necessary expense as far as I am concerned.",
        ],
        context: 'getting your hair done は「美容院に行く」の自然な表現。costs a fortune は「めちゃくちゃ高い」。as far as I am concerned は「私に言わせれば」。necessary expense は「必要経費」。',
        character: 'lisa', category: 'request', month: '2026-05',
    },
    {
        daySlot: 46, japanese: '俺は1000円カットで十分',
        english: [
            'A quick cut is fine.',
            'I just go to the cheap place. In and out in ten minutes.',
            'I go to one of those quick-cut places. Ten bucks, no appointment, done in ten minutes.',
            "I do not understand why people pay so much for haircuts. I go to the barber down the street. Ten dollars, no appointment needed, and I am out of there in ten minutes. They do not wash my hair or give me coffee or any of that fancy stuff. They just cut it. And honestly? It looks fine. Nobody has ever looked at me and said, wow, bad haircut.",
        ],
        context: 'barber は「床屋」。barber shop は男性向け。quick-cut はQBハウス的な格安カット。in and out は「さっと入ってさっと出る」。bucks はドルの口語。fancy stuff は「おしゃれなやつ」。',
        character: 'kenji', category: 'request', month: '2026-05',
    },
    {
        daySlot: 46, japanese: '白髪が増えてきた',
        english: [
            'I am getting gray hairs.',
            'I have been finding more and more gray hairs lately.',
            'I keep finding gray hairs. I think the stress is getting to me.',
            "I found another gray hair this morning. That is the third one this week. I am only twenty-eight and I am already going gray. My mom says it is genetics but I blame work stress. I started pulling them out but someone told me two more grow back for every one you pull. That is probably not true but I stopped just in case.",
        ],
        context: 'gray hair はアメリカ英語、grey hair はイギリス英語。going gray は「白髪が増えている」の進行形。genetics は「遺伝」。just in case は「念のため」。白髪の都市伝説は英語圏にも存在する。',
        character: 'yuki', category: 'request', month: '2026-05',
    },
    {
        daySlot: 46, japanese: 'パーマかけようかな',
        english: [
            'Maybe I should get a perm.',
            'I am thinking about getting a perm.',
            'I have been thinking about getting a perm. Do you think it would suit me?',
            "I am kind of bored with my hair right now and I have been thinking about getting a perm. Not like a tight curly perm from the eighties. More like loose waves, you know? Natural-looking. But I am worried it is going to fry my hair. Lisa, you got one before, right? How long did it take to recover?",
        ],
        context: 'perm は日本語と同じだけど発音は「パーム」に近い。loose waves は「ゆるいウェーブ」。fry は「(髪を)傷める」のスラング。recover は「回復する」。tight curly は80年代のパーマのイメージ。',
        character: 'mina', category: 'request', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 47: 病院で (At the Doctor)
    // Scene: リサが体調不良で病院へ。待合室から診察まで。みんなの病院エピソード。
    // ────────────────────────────────────────────────────

    {
        daySlot: 47, japanese: '予約を取りたいんですけど',
        english: [
            'I need an appointment.',
            'I would like to make an appointment.',
            'Hi, I would like to make an appointment. Is there anything available this week?',
            "Hi, I would like to make an appointment with Dr. Tanaka if possible. It is not an emergency or anything but I have been feeling kind of off for the past week and I just want to get it checked out. Is there anything open this week? I can do mornings or afternoons, I am flexible.",
        ],
        context: 'make an appointment は「予約を取る」の定番。available は「空いている」。feeling off は「なんか調子悪い」の自然な表現。get it checked out は「診てもらう」。美容院は reservation、病院は appointment。',
        character: 'lisa', category: 'request', month: '2026-05',
    },
    {
        daySlot: 47, japanese: '熱がある気がする',
        english: [
            'I think I have a fever.',
            'I feel like I have a fever.',
            'I feel like I have a fever. I have been hot and cold all day.',
            "I think I might have a fever. I have been going back and forth between feeling really hot and really cold all day. I do not have a thermometer at home so I could not check. I also have this headache that will not go away. I took some medicine this morning but it did not really help.",
        ],
        context: 'have a fever は「熱がある」。temperature でもいいけど fever が一般的。hot and cold は「寒気と熱さの繰り返し」。thermometer は「体温計」で発音が「サモミター」と日本語と全然違う。',
        character: 'lisa', category: 'request', month: '2026-05',
    },
    {
        daySlot: 47, japanese: 'ここが痛いんです',
        english: [
            'It hurts here.',
            'I have this pain right here.',
            'I have had this sharp pain right here for about three days now.',
            "So I have had this pain right here on my lower right side for about three days. It is not constant but when it hits, it is really sharp. Like a stabbing kind of pain. It gets worse when I bend over or cough. I tried ignoring it but it is not going away so I figured I should come in.",
        ],
        context: 'sharp pain は「鋭い痛み」、dull pain は「鈍い痛み」。stabbing は「刺すような」。lower right side は「右下腹部」。figured は「〜だと思った」のカジュアル表現。come in は「来院する」。',
        character: 'lisa', category: 'request', month: '2026-05',
    },
    {
        daySlot: 47, japanese: '薬は何か飲んでますか？',
        english: [
            'Are you on any medication?',
            'Are you currently taking any medication?',
            'Are you currently on any medication? Anything over-the-counter counts too.',
            "Before we proceed, I need to know if you are currently taking any medication. Prescription or over-the-counter, it does not matter, just let me know everything. And are you allergic to any medications? I also want to know if you have taken anything for this pain in the last twenty-four hours.",
        ],
        context: 'on medication は「薬を服用中」。be on は「〜を使っている」の意味。over-the-counter (OTC) は「市販薬」。prescription は「処方箋」。日本語の「薬飲んでますか？」は英語では take medication。drink ではない。',
        character: 'master', category: 'request', month: '2026-05',
    },
    {
        daySlot: 47, japanese: '保険証持ってきました',
        english: [
            'I have my insurance card.',
            'Here is my insurance card.',
            'Here is my insurance card. Do I need to fill out any forms?',
            "Here is my insurance card. I also brought my ID just in case. Is there any paperwork I need to fill out? This is my first time at this clinic so I am guessing there is a new patient form or something. Also, do you guys do direct billing or do I pay upfront and get reimbursed?",
        ],
        context: 'insurance card は「保険証」。fill out は「記入する」で fill in でもOK。paperwork は「書類」の総称。direct billing は「直接精算」。reimbursed は「返金される」。海外の保険システムは日本と全然違う。',
        character: 'lisa', category: 'request', month: '2026-05',
    },
    {
        daySlot: 47, japanese: '検査した方がいいですか？',
        english: [
            'Should I get tested?',
            'Do you think I need to get some tests done?',
            'Do you think I should get some tests done? Blood work or anything?',
            "Should I get some tests done? I know it might be nothing but I would rather be safe than sorry. My family has a history of high blood pressure so I kind of want to check that too while I am here. Do I need to come back for blood work or can we do it today?",
        ],
        context: 'get tests done は「検査を受ける」。blood work は「血液検査」。rather be safe than sorry は「念には念を」。family history は「家族歴」。while I am here は「せっかく来たから」のニュアンス。',
        character: 'yuki', category: 'request', month: '2026-05',
    },
    {
        daySlot: 47, japanese: '3日分の薬を出しておきますね',
        english: [
            'I will prescribe medicine for three days.',
            "I'm going to prescribe something for three days.",
            "I'll write you a prescription for three days. Take it with meals.",
            "All right, I am going to write you a prescription for three days. Take it three times a day with meals. If your symptoms do not improve by then, come back and we will look into it further. In the meantime, get plenty of rest and stay hydrated. No alcohol until you finish the course.",
        ],
        context: 'prescribe は「処方する」。write a prescription は「処方箋を書く」。with meals は「食事と一緒に」。stay hydrated は「水分を取って」。finish the course は「(薬を)最後まで飲みきる」。',
        character: 'master', category: 'request', month: '2026-05',
    },
    {
        daySlot: 47, japanese: '待ち時間長すぎない？',
        english: [
            'The wait is so long.',
            'How long have we been waiting?',
            "We have been waiting for over an hour. This is ridiculous.",
            "I have been sitting here for almost two hours. This is insane. I had an appointment at ten and it is almost noon. At this point I think they forgot about me. I already read every magazine in the waiting room twice. I am about to just leave and come back another day.",
        ],
        context: 'waiting room は「待合室」。This is ridiculous は「ありえない」の定番の不満表現。at this point は「もうこうなったら」。about to は「もうすぐ〜する」。病院の待ち時間の愚痴は万国共通。',
        character: 'kenji', category: 'request', month: '2026-05',
    },
    {
        daySlot: 47, japanese: '注射が怖い',
        english: [
            'I hate needles.',
            'I am terrified of needles.',
            'I cannot handle needles. I always look away.',
            "Do not judge me but I am absolutely terrified of needles. I know I am a grown adult but I literally cannot look. I start sweating and getting dizzy the second I see one coming. One time I actually passed out during a blood draw. The nurse had to bring me juice and everything. It was embarrassing.",
        ],
        context: 'needles は「注射針」。terrified は scared の最上級。passed out は「気を失った」。blood draw は「採血」。Do not judge me は「引かないで」の前置き。grown adult は「いい大人」で自虐的に使う。',
        character: 'takeshi', category: 'request', month: '2026-05',
    },
    {
        daySlot: 47, japanese: 'お大事にね',
        english: [
            'Take care.',
            'Feel better soon.',
            'Take care of yourself. Let me know if you need anything.',
            "Make sure you rest up, okay? Do not push yourself. If you need anything, food, medicine, whatever, just text me and I will bring it over. Seriously, do not be stubborn about it. I know you hate asking for help but that is what friends are for. Just focus on getting better.",
        ],
        context: 'Take care は「お大事に」の万能表現。Feel better soon は「早く良くなってね」。rest up は「しっかり休む」。do not push yourself は「無理しないで」。That is what friends are for は「友達だろ」の定番。',
        character: 'yuki', category: 'request', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 48: 銀行・郵便局 (Bank & Post Office)
    // Scene: ケンジが銀行手続きの話。ミナが荷物を海外に送りたい。
    // ────────────────────────────────────────────────────

    {
        daySlot: 48, japanese: '口座を開きたいんですけど',
        english: [
            'I want to open an account.',
            'I would like to open a bank account.',
            'Hi, I would like to open a savings account. What do I need?',
            "Hi, I would like to open a new savings account. I just moved to the area and I need a local bank. What documents do I need to bring? I have my ID and a utility bill for proof of address. Is there a minimum deposit required? And what are the fees like?",
        ],
        context: 'open an account は「口座を開設する」。savings account は「普通預金」、checking account は「当座預金」。proof of address は「住所証明」。minimum deposit は「最低預入額」。英語圏の銀行は身分証明が厳しい。',
        character: 'kenji', category: 'request', month: '2026-05',
    },
    {
        daySlot: 48, japanese: '振り込みしたいんですけど',
        english: [
            'I need to make a transfer.',
            'I would like to transfer some money.',
            'I need to wire some money to another bank. How do I do that?',
            "I need to transfer some money to an account at a different bank. Can I do that from here or do I need to do it online? I have the account number and routing number. How long does it usually take? And is there a fee for the transfer? I need it to arrive by Friday if possible.",
        ],
        context: 'transfer は「振り込み」。wire は「送金する」でやや大きめの金額のニュアンス。routing number はアメリカの銀行の「支店番号」に相当。日本の振り込みは簡単だけど海外は routing number + account number のセットが必要。',
        character: 'kenji', category: 'request', month: '2026-05',
    },
    {
        daySlot: 48, japanese: 'この荷物を送りたいんですけど',
        english: [
            'I want to send this package.',
            'I would like to ship this package overseas.',
            'I need to send this to the US. What are my shipping options?',
            "Hi, I need to send this package to the United States. It is a birthday gift for my friend so I want it to get there in about a week. What are my options? I need tracking for sure. Also, do I need to fill out a customs form? I have never shipped anything internationally before so I am clueless.",
        ],
        context: 'ship は「発送する」で send よりもフォーマル。tracking は「追跡」。customs form は「税関申告書」。clueless は「全くわからない」。options は「選択肢」で、日本語の「どんな方法がありますか」にあたる。',
        character: 'mina', category: 'request', month: '2026-05',
    },
    {
        daySlot: 48, japanese: 'ATMが使えないんだけど',
        english: [
            'The ATM is not working.',
            'The ATM ate my card.',
            'The ATM just swallowed my card and I have no idea what to do.',
            "So the ATM just ate my card. I put it in to withdraw some cash and the screen froze and then it just kept my card. I pressed all the buttons and nothing happened. I do not even know who to call. Is there someone at the bank I can talk to? This is the worst timing because I need cash for dinner tonight.",
        ],
        context: 'ate my card / swallowed my card は「カードを飲み込んだ」で、ATMにカードが取られた時の定番表現。withdraw は「引き出す」。froze は freeze の過去形で「画面がフリーズした」。',
        character: 'takeshi', category: 'request', month: '2026-05',
    },
    {
        daySlot: 48, japanese: '手数料いくらですか？',
        english: [
            'What is the fee?',
            'How much is the service fee?',
            'How much is the fee for international transfers? Is it per transaction?',
            "Before I go ahead with this, can you tell me what the fees look like? I know there is probably a transfer fee but are there any hidden charges I should know about? Like currency exchange fees or anything? I got burned last time because nobody told me about the exchange rate markup. I just want to know the total cost upfront.",
        ],
        context: 'fee は「手数料」。hidden charges は「隠れた料金」。got burned は「痛い目にあった」。markup は「上乗せ」。upfront は「事前に・最初に」。海外送金の手数料は複雑で、聞かないと教えてくれないことが多い。',
        character: 'kenji', category: 'request', month: '2026-05',
    },
    {
        daySlot: 48, japanese: '書留で送ってください',
        english: [
            'Registered mail, please.',
            'I would like to send this by registered mail.',
            'Can I send this registered? It has some important documents inside.',
            "I would like to send this registered mail, please. There are some important documents inside and I need confirmation that it was delivered. Can I also get a tracking number? And how long does registered mail usually take domestically? I do not need it to be express but I want to make sure it does not get lost.",
        ],
        context: 'registered mail は「書留」。tracking number は「追跡番号」。domestically は「国内で」。get lost は「紛失する」。confirmation は「確認」。express は「速達」。certified mail はアメリカの書留。',
        character: 'lisa', category: 'request', month: '2026-05',
    },
    {
        daySlot: 48, japanese: '暗証番号忘れた',
        english: [
            'I forgot my PIN.',
            'I cannot remember my PIN number.',
            'I forgot my PIN. Is there a way to reset it?',
            "This is embarrassing but I completely forgot my PIN. I have not used this card in months and I guess my brain just deleted it. Is there a way to reset it? Do I need to come in with my ID or can I do it at the ATM? I swear I had it memorized but my brain has too many passwords to keep track of.",
        ],
        context: 'PIN は Personal Identification Number の略で、実は PIN number は重複表現（number が2回）だけどみんな言う。reset は「再設定する」。my brain deleted it は「脳がデータを消した」のユーモア表現。',
        character: 'takeshi', category: 'request', month: '2026-05',
    },
    {
        daySlot: 48, japanese: '両替できますか？',
        english: [
            'Can I exchange money?',
            'Can I exchange yen for dollars here?',
            'I need to exchange some yen for dollars. What is the rate today?',
            "I need to exchange some yen for US dollars. I am going on a trip next week and I want to have some cash on hand. What is your exchange rate today? I checked online and the rate was about one fifty to the dollar. Is yours close to that? I know banks usually have a small margin but I just want to make sure it is reasonable.",
        ],
        context: 'exchange は「両替する」。rate は「レート」。on hand は「手元に」。margin は「利ざや」。reasonable は「妥当な」。銀行の両替レートは市場レートより少し悪いのが普通。',
        character: 'mina', category: 'request', month: '2026-05',
    },
    {
        daySlot: 48, japanese: '届くまで何日かかりますか？',
        english: [
            'How long will it take?',
            'How many days until it arrives?',
            'How long does it usually take to arrive? I need it there by next Friday.',
            "How long is delivery going to take? I am sending a birthday gift and her birthday is on the fifteenth so it absolutely has to be there before then. If standard shipping is not fast enough I will do express. Whatever it takes. I should have done this two weeks ago but you know how it is.",
        ],
        context: 'delivery は「配達」。standard shipping は「通常配送」。express は「速達」。whatever it takes は「何が何でも」。you know how it is は「わかるでしょ」で言い訳のあとに添える定番フレーズ。',
        character: 'mina', category: 'request', month: '2026-05',
    },
    {
        daySlot: 48, japanese: 'ネットバンキングの方が楽だよ',
        english: [
            'Online banking is easier.',
            'Just do it online. Way easier.',
            'I do everything through the app now. Way easier than going to the bank.',
            "I have not been inside a bank in like two years. Everything is on the app now. Transfers, bill payments, even depositing checks. You just take a photo. It blows my mind that people still wait in line at the bank. The only thing I cannot do online is get coins, and honestly who even uses coins anymore?",
        ],
        context: 'app は「アプリ」。depositing checks は「小切手を入金する」。blows my mind は「信じられない」。wait in line は「列に並ぶ」で queue はイギリス英語。日本のATM文化は海外から見ると独特。',
        character: 'takeshi', category: 'request', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 49: ご近所付き合い (Neighbors)
    // Scene: ゴンドーが近所付き合いについて語る。引っ越しの挨拶から騒音問題まで。
    // ────────────────────────────────────────────────────

    {
        daySlot: 49, japanese: '引っ越してきたばかりです',
        english: [
            'I just moved in.',
            'I just moved in next door.',
            'Hi, I just moved in next door. I wanted to introduce myself.',
            "Hi there. I just moved into the apartment next door. I wanted to come by and introduce myself. I am Lisa. Sorry about all the noise yesterday with the moving boxes and everything. I tried to keep it down but you know how it is with moving. If you ever need anything, do not hesitate to knock.",
        ],
        context: 'moved in は「引っ越してきた」。moved out は「引っ越していった」。come by は「立ち寄る」。keep it down は「静かにする」。do not hesitate to は「遠慮なく」。日本の引越し挨拶文化は海外にはあまりない。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 49, japanese: '隣の部屋がうるさいんだよね',
        english: [
            'My neighbors are loud.',
            'The people next door are so noisy.',
            'My neighbors are so loud. They blast music every night until like midnight.',
            "I swear my neighbors have no concept of volume. Every single night they blast music until midnight. I have tried being nice about it and I even left a polite note but nothing changed. I do not want to be that person who files a complaint but I also need to sleep. What would you do?",
        ],
        context: 'blast music は「音楽をガンガンかける」。file a complaint は「苦情を出す」。have no concept of は「〜の概念がない」の面白い表現。that person は「あの嫌な人」的なニュアンス。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 49, japanese: 'ゴミの出し方がよくわからない',
        english: [
            'I do not know the trash rules.',
            'The garbage sorting rules are confusing.',
            'I still do not understand the trash rules here. Which day is for what?',
            "Can someone explain the garbage situation to me? I have been here for a month and I still cannot figure out which bag goes out on which day. I accidentally put recyclables in the regular trash and got a warning sticker on my bag. I felt like a criminal. In my old place it was so much simpler.",
        ],
        context: 'garbage と trash は同じ「ゴミ」。recyclables は「リサイクル品」。warning sticker は「警告シール」。日本のゴミ分別は世界一複雑と言われている。sort は「分別する」。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 49, japanese: 'お裾分けです',
        english: [
            'This is for you.',
            'I made too much. Would you like some?',
            'I made way too much curry. Would you like some? It is still warm.',
            "I made a huge pot of curry last night and I way overestimated how much we could eat. I was going to put it in the freezer but I thought hey, maybe the neighbors would want some. It is homemade so it is nothing fancy but it is pretty good if I do say so myself. Do you want some?",
        ],
        context: '「お裾分け」は英語に直訳がない日本文化。I made too much が一番自然な代替表現。overestimated は「多く見積もりすぎた」。if I do say so myself は「自分で言うのもなんだけど」の定番フレーズ。',
        character: 'master', category: 'social', month: '2026-05',
    },
    {
        daySlot: 49, japanese: '回覧板見た？',
        english: [
            'Did you see the notice?',
            'Did you check the neighborhood bulletin?',
            'Did you see the notice about the water shutoff next week?',
            "Hey, did you see the notice that went around? Apparently they are shutting off the water next Tuesday for maintenance. From like nine to three. I almost missed it because I never read those things but my wife caught it just in time. Make sure you stock up on water the night before.",
        ],
        context: 'notice は「お知らせ」。bulletin は「掲示板」。shutoff は「停止」。went around は「回ってきた」。stock up は「備蓄する」。回覧板は日本独自で、英語圏では neighborhood notice board や email list が代替。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 49, japanese: '挨拶だけはちゃんとしとけ',
        english: [
            'At least say hello.',
            'Always greet your neighbors.',
            'Even if you are not close with your neighbors, a simple hello goes a long way.',
            "Listen, I am not saying you have to be best friends with your neighbors. But at least say good morning when you see them in the hallway. It costs you nothing and it makes everything smoother. You never know when you might need their help. A little politeness goes a long way. I have lived in this building for thirty years and trust me, a friendly hello solves half the problems before they start.",
        ],
        context: 'goes a long way は「大きな効果がある」。costs you nothing は「タダでできる」。hallway は「廊下」。it makes everything smoother は「物事がスムーズに進む」。ゴンドーの人生経験が光るアドバイス。',
        character: 'master', category: 'social', month: '2026-05',
    },
    {
        daySlot: 49, japanese: '上の階の足音がすごい',
        english: [
            'The upstairs neighbor is loud.',
            'I can hear footsteps from the apartment above.',
            'The people upstairs stomp around all night. I can hear every single step.',
            "The apartment above me sounds like they are running a marathon every night. Constant footsteps. Heavy ones too. I think they might have kids but honestly it sounds like a full-grown adult doing jumping jacks at eleven at night. I bought earplugs but I can still feel the vibrations. It is driving me crazy.",
        ],
        context: 'stomp は「ドスドス歩く」。footsteps は「足音」。driving me crazy は「気が狂いそう」。earplugs は「耳栓」。vibrations は「振動」。マンションの騒音問題は万国共通の悩み。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 49, japanese: 'ペットOKなの？ここ',
        english: [
            'Are pets allowed here?',
            'Is this building pet-friendly?',
            'Do you know if this building allows pets? I have been thinking about getting a cat.',
            "Hey, do you know if the building allows pets? I have been thinking about getting a cat for a while now. I know some places have a no-pets policy and some charge extra for a pet deposit. I do not want to sneak one in and get in trouble with the landlord. Have you seen anyone with pets in the building?",
        ],
        context: 'pet-friendly は「ペットOK」。no-pets policy は「ペット禁止ルール」。pet deposit は「ペットの保証金」。sneak in は「こっそり持ち込む」。landlord は「大家」。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 49, japanese: '町内会の集まりがあるんだって',
        english: [
            'There is a neighborhood meeting.',
            'There is a community meeting this weekend.',
            'I heard there is a neighborhood association meeting this Sunday. Are you going?',
            "So apparently there is a neighborhood association meeting this Sunday at the community center. I think they are going to talk about the new park and the parking situation. I went once before and it was honestly kind of boring but free snacks. Plus it is good to know what is going on in the area. You should come.",
        ],
        context: 'neighborhood association は「町内会」に近い英語。community center は「公民館」。parking situation は「駐車場問題」。free snacks は参加のモチベーション。what is going on は「何が起きているか」。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 49, japanese: 'いい人たちでよかった',
        english: [
            'They are nice people.',
            'I got lucky with my neighbors.',
            'I am so glad my neighbors are nice. It makes such a difference.',
            "I honestly got so lucky with my neighbors. The couple next door is super friendly and the old lady downstairs always brings me vegetables from her garden. It really makes a difference. I have heard horror stories from friends about terrible neighbors and I am grateful I do not have to deal with that. Good neighbors are worth their weight in gold.",
        ],
        context: 'got lucky は「運が良かった」。horror stories は「恐怖話」。worth their weight in gold は「金の重さほどの価値がある」=「超貴重」。deal with は「対処する」。grateful は「感謝している」。',
        character: 'lisa', category: 'social', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 50: 映画・ドラマの話 (Movies & Shows)
    // Scene: 居酒屋で最近観た映画やドラマの話。ネタバレ注意の攻防戦。
    // ────────────────────────────────────────────────────

    {
        daySlot: 50, japanese: 'ネタバレしないでよ！',
        english: [
            'No spoilers!',
            'Do not spoil it for me!',
            'Wait, I have not seen it yet! No spoilers, please!',
            "Stop, stop, stop. I have not seen it yet. Do not say another word. I swear if you spoil it for me I will never forgive you. I have been saving it for this weekend and I want to go in completely blind. Not even a hint. I do not even want to know if it is good or bad. Just zip it.",
        ],
        context: 'spoiler は「ネタバレ」で、日本語に輸入された英語。go in blind は「何も知らない状態で観る」。zip it は「黙って」の口語。forgive は「許す」。ネタバレ問題は現代のグローバル共通テーマ。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 50, japanese: 'あのドラマ観てる？',
        english: [
            'Are you watching that show?',
            'Have you been watching that new show?',
            'Have you been watching that new show on Netflix? Everyone is talking about it.',
            "Have you started watching that new show everyone is talking about? I think it dropped like two weeks ago and I have already binged the whole thing. I could not stop. I watched like five episodes in one night. I am not proud of it but it was so good I literally could not turn it off.",
        ],
        context: 'dropped は「配信された」のネット用語。binge は「一気見する」。binge-watch はNetflix時代に生まれた言葉。I am not proud of it は「誇れることじゃないけど」の自虐。turn it off は「やめる」の二重の意味。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 50, japanese: 'あの映画泣いたわ',
        english: [
            'That movie made me cry.',
            'I cried so hard watching that movie.',
            'I am not going to lie, I sobbed during that movie. Like full-on ugly crying.',
            "Okay, I need to talk about that movie because I am still not over it. I cried. Like not just a single tear rolling down my cheek. I am talking full-on sobbing in the theater. My popcorn got soggy from my tears. The guy next to me looked genuinely concerned. I have never been so emotionally wrecked by a film in my life.",
        ],
        context: 'sobbed は「号泣した」で cried より激しい。ugly crying は「顔がぐちゃぐちゃになるほど泣く」。emotionally wrecked は「感情的に破壊された」。not over it は「まだ立ち直れていない」。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 50, japanese: '途中で寝ちゃった',
        english: [
            'I fell asleep.',
            'I fell asleep halfway through.',
            'I started watching it but I fell asleep like twenty minutes in.',
            "I tried watching it, I really did. But I was so tired from work that I knocked out about twenty minutes in. I woke up during the credits and had no idea what happened. My wife was like, you missed the best part. So now I have to rewatch the whole thing. This is the third time this month I have fallen asleep during a movie.",
        ],
        context: 'fell asleep は「寝落ちした」。knocked out は「気絶するように寝た」のカジュアル表現。halfway through は「途中で」。credits は「エンドロール」。rewatch は「見直す」。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 50, japanese: '原作の方がよかった',
        english: [
            'The book was better.',
            'The book was way better than the movie.',
            'I read the book first and honestly the movie did not do it justice.',
            "I am going to be that person. The book was better. Like, way better. The movie cut out all the best parts and changed the ending. Why do they always do that? If you are going to adapt something, at least be faithful to the source material. The book had so much depth that the movie just could not capture in two hours.",
        ],
        context: 'did not do it justice は「原作に見合っていなかった」の定番表現。adapt は「映像化する」。source material は「原作」。faithful は「忠実な」。be that person は「嫌われるのを承知で言う人」。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 50, japanese: 'あの俳優がめっちゃいい',
        english: [
            'That actor is so good.',
            'The lead actor was incredible.',
            'The lead actor absolutely crushed it. Best performance I have seen all year.',
            "Can we talk about the lead actor for a second? That performance was next level. The scene where they find out the truth? I got chills. Literal chills. If they do not get nominated for an Oscar I am going to riot. I looked them up after and apparently they did all their own stunts too. That is dedication.",
        ],
        context: 'crushed it は「最高の演技をした」。got chills は「鳥肌が立った」。nominated は「ノミネートされる」。riot は「暴動を起こす」で大げさ表現。stunts は「スタント」。dedication は「プロ意識」。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 50, japanese: '続編が楽しみ',
        english: [
            'I cannot wait for the sequel.',
            'I am so excited for the next one.',
            'I am dying for the sequel. That cliffhanger at the end was brutal.',
            "That ending left me screaming. You cannot just end it like that. How am I supposed to wait a whole year for the sequel? That cliffhanger was evil. Pure evil. I have already watched every fan theory on YouTube trying to figure out what is going to happen next. My prediction is the villain is actually the hero's brother. Calling it now.",
        ],
        context: 'sequel は「続編」。cliffhanger は「次回への引き」で崖にぶら下がるイメージ。dying for は「〜が待ちきれない」。fan theory は「ファンの考察」。calling it now は「今のうちに予言しとく」。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 50, japanese: 'サブスク何入ってる？',
        english: [
            'What streaming services do you have?',
            'What are you subscribed to?',
            'What streaming services do you use? I have too many and I need to cut some.',
            "How many streaming services are you paying for? I just added up mine and I am spending more on subscriptions than on my electricity bill. Netflix, Amazon, Disney, HBO, and I just signed up for another one because of that one show. I need to cancel some but every time I try there is something new I want to watch. It is a trap.",
        ],
        context: 'streaming service は「配信サービス」。subscribed to は「契約している」。added up は「合計した」。signed up for は「登録した」。It is a trap は「罠だ」。サブスク地獄は現代人の共通の悩み。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 50, japanese: '字幕派？吹替派？',
        english: [
            'Subtitles or dubbed?',
            'Do you watch with subtitles or dubbed?',
            'Are you a subtitles person or do you prefer dubbed?',
            "I always watch with subtitles. Always. Even in English. I feel like I miss things without them. My wife hates it because she says the text is distracting but I literally cannot follow the plot without subtitles on. Especially when people mumble. Like half the dialogue in that last show was just people whispering dramatically.",
        ],
        context: 'subtitles は「字幕」。dubbed は「吹替え」。distracting は「気が散る」。mumble は「ボソボソ言う」。plot は「ストーリー」。字幕なしで英語を聞き取るのは英語学習者の最終目標の1つ。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 50, japanese: '評価ほど面白くなかったなあ',
        english: [
            'It was overrated.',
            'It was kind of overrated, honestly.',
            'Everyone hyped it up but it was honestly kind of disappointing.',
            "Am I the only one who thought it was overhyped? Everyone kept saying it was the best thing ever and I went in with super high expectations and it was just... okay. It was not bad but it was not mind-blowing either. Maybe I would have liked it more if people had not built it up so much. Expectations really do ruin things sometimes.",
        ],
        context: 'overrated は「過大評価されている」。overhyped は「騒がれすぎ」。mind-blowing は「衝撃的な」。built it up は「期待を膨らませた」。expectations ruin things は「期待が台無しにする」で深い真理。',
        character: 'master', category: 'social', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 51: ペットの話 (Pets)
    // Scene: ミナの猫自慢から始まり、みんなのペットエピソードで盛り上がる。
    // ────────────────────────────────────────────────────

    {
        daySlot: 51, japanese: 'うちの猫が可愛すぎる',
        english: [
            'My cat is so cute.',
            'My cat is ridiculously cute.',
            'You have to see my cat. She is the most adorable thing in the world.',
            "Okay, let me show you my cat. Look at this face. Is this not the cutest thing you have ever seen? She does this thing where she sits in boxes that are way too small for her and just stares at me like she is proud of herself. I have like five hundred photos of her on my phone and I am not even exaggerating.",
        ],
        context: 'ridiculously は「おかしいくらい」。adorable は cute の上位互換。stares は「じっと見る」。I am not even exaggerating は「マジで大げさじゃない」。ペットの写真を見せるのは万国共通。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 51, japanese: '犬と猫、どっち派？',
        english: [
            'Dogs or cats?',
            'Are you a dog person or a cat person?',
            'Serious question. Are you a dog person or a cat person?',
            "Okay, I need to know. Are you a dog person or a cat person? Because this is important. I am a dog person through and through. Dogs love you unconditionally. Cats just tolerate your existence and occasionally let you pet them. A dog is happy to see you every single time. A cat looks at you like you are an inconvenience.",
        ],
        context: 'dog person / cat person は「犬派/猫派」の完璧な英語表現。through and through は「完全に」。unconditionally は「無条件に」。tolerate は「我慢する」。inconvenience は「迷惑」。犬猫論争は世界共通。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 51, japanese: '散歩が日課なんだ',
        english: [
            'I walk my dog every day.',
            'Walking my dog is part of my daily routine.',
            'I walk my dog every morning and every night. It keeps me active too.',
            "Walking my dog is honestly the best part of my day. We go out every morning at six and again after dinner. Rain or shine. He gets so excited when I grab the leash that he starts spinning in circles. It has been great for my health too. I have lost like five kilos since I got him just from the walks alone.",
        ],
        context: 'walk my dog は「犬の散歩をする」。rain or shine は「雨でも晴れでも」。leash は「リード」。spinning in circles は「グルグル回る」。犬の散歩は飼い主の健康にもいいという研究は多い。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 51, japanese: '動物病院に連れていかないと',
        english: [
            'I need to take him to the vet.',
            'I should bring her to the vet soon.',
            'My cat has not been eating well. I think I need to take her to the vet.',
            "I am a little worried about my cat. She has not been eating much the past couple of days and she is way less active than usual. She normally tears around the apartment at three in the morning like a maniac but she has just been sleeping. I think I need to take her to the vet this week just to be safe.",
        ],
        context: 'vet は veterinarian の略で「獣医」。tears around は「走り回る」。maniac は「狂ったように」。just to be safe は「念のため」。ペットの体調変化に気づくのは飼い主の責任。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 51, japanese: 'ペットは家族だからね',
        english: [
            'Pets are family.',
            'My dog is basically part of the family.',
            'To me, my pets are not just animals. They are family.',
            "People who say it is just an animal do not get it. My dog has been with me for ten years. He was there when I got married, when I changed jobs, when I moved twice. He has seen me at my worst and never judged me once. He is not just a pet. He is family. And honestly some days he is the only one in the house who is happy to see me.",
        ],
        context: 'just an animal は「たかが動物」。do not get it は「わかっていない」。at my worst は「一番つらい時」。judged は「批判した」。ペット = 家族 の考え方は英語圏でも日本でも同じ感覚。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 51, japanese: 'アレルギーで飼えないんだよね',
        english: [
            'I am allergic.',
            'I wish I could but I am allergic to cats.',
            'I would love to have a pet but I am allergic to pretty much everything with fur.',
            "I love animals but my body does not agree. I am allergic to basically anything with fur. Cats, dogs, rabbits, you name it. Within five minutes my eyes start watering and I cannot stop sneezing. I have tried taking allergy medicine but it makes me so drowsy I can barely function. So yeah, no pets for me.",
        ],
        context: 'allergic to は「〜のアレルギー」。you name it は「何でも」。watering は「涙が出る」。drowsy は「眠い」。my body does not agree は「体が受け付けない」のユーモア表現。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 51, japanese: '保護猫を引き取ったの',
        english: [
            'I adopted a rescue cat.',
            'She is a rescue. I got her from a shelter.',
            'I adopted her from a shelter about two years ago. Best decision I ever made.',
            "She is a rescue. I got her from the local shelter about two years ago. She was so scared when I first brought her home. Hid under the bed for three days straight. Would not eat, would not let me touch her. But slowly she warmed up and now she sleeps on my face every night. Literally on my face. I would not trade her for anything.",
        ],
        context: 'rescue は「保護動物」。shelter は「動物保護施設」。adopted は「引き取った」。warmed up は「心を開いた」。would not trade for anything は「何とも交換しない」=「かけがえのない」。保護動物を飼う文化は英語圏で強い。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 51, japanese: 'しつけが大変でさ',
        english: [
            'Training is tough.',
            'Training my dog has been a nightmare.',
            'House-training my puppy is so hard. He keeps having accidents everywhere.',
            "Training a puppy is no joke. He is adorable but he has zero discipline. He chews on everything. My shoes, the couch, the remote control. He ate my headphones last week. And house-training? Forget about it. I thought I had it figured out and then he went on the carpet right in front of me while making eye contact. I think he is doing it on purpose.",
        ],
        context: 'house-training は「トイレのしつけ」。accidents は「粗相」のやわらかい言い方。chews on は「噛む」。on purpose は「わざと」。no joke は「冗談じゃない・マジで大変」。making eye contact は「目を合わせながら」で笑いポイント。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 51, japanese: 'ペットロスってきついよね',
        english: [
            'Losing a pet is hard.',
            'Pet loss is really tough.',
            'When my dog passed away last year, I could not stop crying for weeks.',
            "I lost my dog last year and honestly it was one of the hardest things I have ever gone through. People say it is just a pet but the grief is real. I kept expecting to hear his paws on the floor when I came home. The house felt so empty. I still tear up sometimes when I see his leash by the door. It gets better but you never fully get over it.",
        ],
        context: 'passed away は「亡くなった」の婉曲表現。grief は「悲しみ」。tear up は「涙ぐむ」。get over it は「乗り越える」。ペットロスの悲しみは近年英語圏でも正式に認められるようになった。',
        character: 'master', category: 'social', month: '2026-05',
    },
    {
        daySlot: 51, japanese: '動物カフェ行ったことある？',
        english: [
            'Have you been to an animal cafe?',
            'Have you ever been to a cat cafe?',
            'Have you ever been to one of those cat cafes? They are so relaxing.',
            "Have you ever been to a cat cafe? I went for the first time last month and it was amazing. You just sit there drinking coffee and cats come up to you on their own. Some of them even fall asleep on your lap. It is like therapy but with cats and lattes. I went in for an hour and stayed for three. Best afternoon I have had in months.",
        ],
        context: 'cat cafe は日本発祥で英語にそのまま入った言葉。come up to you は「近づいてくる」。on their own は「自分から」。therapy は「セラピー」。日本の動物カフェ文化は海外でも人気急上昇中。',
        character: 'yuki', category: 'social', month: '2026-05',
    },

];

// ============================================================
// WEEK 7 DAY THEMES
// ============================================================

export const MONTH2_W7_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    45: {
        title: '外食する', titleEn: 'Eating Out', category: 'order',
        scene: 'タケシがお気に入りのレストランに連れて行く。注文から会計まで。',
        keywords: [
            { en: 'reservation', ja: '予約', pron: 'レザベーション', example: 'I have a reservation under Takeshi.', note: 'レストランの予約は reservation。make a reservation で「予約を取る」。under + 名前 が定番。' },
            { en: 'recommend', ja: 'おすすめする', pron: 'レコメンド', example: 'What do you recommend?', note: '店員に聞く鉄板フレーズ。What is good here? も同義。suggestion は名詞で「おすすめ」。' },
            { en: 'check', ja: '会計・お勘定', pron: 'チェック', example: 'Could we get the check?', note: 'アメリカは check、イギリスは bill。日本のようにレジに行くのではなくテーブルで払う文化。' },
            { en: 'tip', ja: 'チップ', pron: 'ティップ', example: 'How much should I tip?', note: '動詞でも名詞でも使える。アメリカでは15-20%が相場。日本にはない文化なので戸惑いポイント。' },
            { en: 'leftovers', ja: '食べ残り・残り物', pron: 'レフトオーバーズ', example: 'Can we get a box for the leftovers?', note: '持ち帰りの残り物。leftover は形容詞としても使える。doggy bag は古い言い方。' },
        ],
    },
    46: {
        title: '美容院・床屋', titleEn: 'Hair Salon', category: 'request',
        scene: 'ユキとミナが美容院トーク。ケンジは床屋派。ヘアスタイルで盛り上がる。',
        keywords: [
            { en: 'trim', ja: '整える・少し切る', pron: 'トリム', example: 'Just a trim, please.', note: 'cut より軽い。「ちょっとだけ切って」のニュアンス。trim the edges=端を整える。' },
            { en: 'bangs', ja: '前髪', pron: 'バングズ', example: 'I want shorter bangs.', note: 'アメリカ英語。イギリスでは fringe。必ず複数形で使う。' },
            { en: 'dye', ja: '染める', pron: 'ダイ', example: 'I am thinking about dyeing my hair.', note: '発音は die（死ぬ）と同じ。color でもOK。get my hair colored=美容院で染めてもらう。' },
            { en: 'suits', ja: '似合う', pron: 'スーツ', example: 'That really suits you.', note: 'looks good on you と同義。fits は服のサイズが合う。suits は見た目が似合う。' },
            { en: 'barber', ja: '床屋', pron: 'バーバー', example: 'I go to the barber down the street.', note: 'barber shop は男性向けカット店。salon / hair salon は男女兼用または女性向け。' },
        ],
    },
    47: {
        title: '病院で', titleEn: 'At the Doctor', category: 'request',
        scene: 'リサが体調不良で病院へ。待合室から診察まで。みんなの病院エピソード。',
        keywords: [
            { en: 'appointment', ja: '予約', pron: 'アポイントメント', example: 'I would like to make an appointment.', note: '病院の予約は appointment。レストランは reservation。使い分けが大事。' },
            { en: 'symptom', ja: '症状', pron: 'シンプトム', example: 'What are your symptoms?', note: '複数形 symptoms で聞かれることが多い。sign は医学的兆候、symptom は患者が感じる症状。' },
            { en: 'prescription', ja: '処方箋', pron: 'プリスクリプション', example: 'I will write you a prescription.', note: 'prescribe（動詞）で処方する。over-the-counter=市販薬、prescription=処方薬。' },
            { en: 'fever', ja: '熱', pron: 'フィーバー', example: 'I think I have a fever.', note: 'have a fever=熱がある。temperature も使えるがfeverが一般的。run a fever=熱を出す。' },
            { en: 'needle', ja: '注射針', pron: 'ニードル', example: 'I am terrified of needles.', note: 'shot=注射（行為）、needle=針。injection はフォーマル。get a shot=注射を受ける。' },
        ],
    },
    48: {
        title: '銀行・郵便局', titleEn: 'Bank & Post Office', category: 'request',
        scene: 'ケンジが銀行手続きの話。ミナが荷物を海外に送りたい。',
        keywords: [
            { en: 'transfer', ja: '振込・送金', pron: 'トランスファー', example: 'I need to make a transfer.', note: '動詞でも名詞でも使える。wire transfer=電信送金。bank transfer=銀行振込。' },
            { en: 'account', ja: '口座', pron: 'アカウント', example: 'I want to open an account.', note: 'savings account=普通預金、checking account=当座預金。open/close an account。' },
            { en: 'tracking', ja: '追跡', pron: 'トラッキング', example: 'Can I get a tracking number?', note: 'tracking number=追跡番号。track a package=荷物を追跡する。' },
            { en: 'fee', ja: '手数料', pron: 'フィー', example: 'What is the fee for this?', note: 'service fee=サービス料、transaction fee=取引手数料。charge も近いが fee がフォーマル。' },
            { en: 'PIN', ja: '暗証番号', pron: 'ピン', example: 'I forgot my PIN.', note: 'Personal Identification Number の略。PIN number は本来重複だがみんな言う。' },
        ],
    },
    49: {
        title: 'ご近所付き合い', titleEn: 'Neighbors', category: 'social',
        scene: 'ゴンドーが近所付き合いについて語る。引っ越しの挨拶から騒音問題まで。',
        keywords: [
            { en: 'neighbor', ja: '隣人・近所の人', pron: 'ネイバー', example: 'My neighbors are really nice.', note: 'next-door neighbor=お隣さん。neighborhood=近所。neighborly=近所付き合いのいい。' },
            { en: 'complaint', ja: '苦情', pron: 'コンプレイント', example: 'I do not want to file a complaint.', note: 'file a complaint=苦情を出す。complain(動詞)。noise complaint=騒音苦情。' },
            { en: 'landlord', ja: '大家', pron: 'ランドロード', example: 'I need to talk to the landlord.', note: 'land(土地)+lord(主人)=大家。tenant=借り手。lease=賃貸契約。' },
            { en: 'garbage', ja: 'ゴミ', pron: 'ガービッジ', example: 'When is garbage day?', note: 'garbage=生ゴミ中心、trash=一般ゴミ、rubbish=イギリス英語。recycle=リサイクル。' },
            { en: 'hallway', ja: '廊下', pron: 'ホールウェイ', example: 'I ran into them in the hallway.', note: 'hall + way=廊下。run into=ばったり会う。corridor はフォーマル寄り。' },
        ],
    },
    50: {
        title: '映画・ドラマの話', titleEn: 'Movies & Shows', category: 'social',
        scene: '居酒屋で最近観た映画やドラマの話。ネタバレ注意の攻防戦。',
        keywords: [
            { en: 'spoiler', ja: 'ネタバレ', pron: 'スポイラー', example: 'No spoilers!', note: '日本語にもなった英語。spoil=台無しにする。spoiler alert=ネタバレ注意。' },
            { en: 'binge', ja: '一気見する', pron: 'ビンジ', example: 'I binged the whole season.', note: 'binge-watch=一気見。binge eat=食べ過ぎ。Netflix時代に爆発的に広まった単語。' },
            { en: 'sequel', ja: '続編', pron: 'シークエル', example: 'When is the sequel coming out?', note: 'sequel=続編、prequel=前日譚、reboot=リブート、remake=リメイク。' },
            { en: 'overrated', ja: '過大評価', pron: 'オーバーレイテッド', example: 'I think it was overrated.', note: 'over+rated=評価されすぎ。underrated=過小評価。overhyped=騒がれすぎ。' },
            { en: 'subtitle', ja: '字幕', pron: 'サブタイトル', example: 'I always watch with subtitles.', note: '複数形 subtitles で使うことが多い。dubbed=吹替。closed captions (CC)=字幕(聴覚障害者向け含む)。' },
        ],
    },
    51: {
        title: 'ペットの話', titleEn: 'Pets', category: 'social',
        scene: 'ミナの猫自慢から始まり、みんなのペットエピソードで盛り上がる。',
        keywords: [
            { en: 'adopt', ja: '引き取る・養子にする', pron: 'アドプト', example: 'I adopted her from a shelter.', note: '動物にも人にも使える。shelter=保護施設。rescue=保護動物。foster=一時預かり。' },
            { en: 'vet', ja: '獣医', pron: 'ヴェット', example: 'I need to take her to the vet.', note: 'veterinarian の略。vet checkup=獣医の定期検診。go to the vet=動物病院に行く。' },
            { en: 'leash', ja: 'リード・引き綱', pron: 'リーシュ', example: 'He gets excited when I grab the leash.', note: '犬の散歩の必需品。on a leash=リードにつながれて。off-leash=リードなし。' },
            { en: 'adorable', ja: '可愛すぎる', pron: 'アドーラブル', example: 'Your puppy is adorable.', note: 'cute の上位互換。adore=大好き+able=できる→愛さずにいられない。' },
            { en: 'grief', ja: '深い悲しみ', pron: 'グリーフ', example: 'Pet loss grief is real.', note: 'sadness より深い悲しみ。grieve=悲しむ(動詞)。grief counseling=グリーフカウンセリング。' },
        ],
    },
};
