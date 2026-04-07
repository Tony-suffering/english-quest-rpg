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
            'Done! I booked us a table for seven.',
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
            'Oh, you gotta try the daily special. It\'s amazing.',
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
            'Hmm, good question. What do you think?',
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
            'I got this one. You can get the next round.',
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
            'Hmm, let me check the price real quick.',
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
            'Good to know! I\'ll make sure we avoid that.',
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
            'Let\'s do it! I\'m right behind you.',
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
            'Ha, that\'s so true! Love it.',
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
            'Leave it to me! Consider it done.',
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
            'Let\'s do it! I\'m right behind you.',
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
            'Huh, I never thought about it that way!',
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
            'Say no more! Let\'s make it happen.',
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
            'Leave it to me! Consider it done.',
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
            'Hmm, good question. What do you think?',
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
            'No worries, take your time!',
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
            'Me too! Great minds think alike.',
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
            'Yeah, that\'s pricey. Try the shop down the block.',
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
            'Yeah, we should get moving! Let\'s go.',
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
            'Hmm, good question. What do you think?',
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
            'Hmm, good question. What do you think?',
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
            'Done! I booked us a table for seven.',
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
            'Oh no, take it easy. Want me to grab you some medicine?',
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
            'Yeah, totally! That\'s a great point.',
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
            'Did you take it already? Don\'t skip doses.',
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
            'Say no more! Let\'s make it happen.',
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
            'Hmm, good question. What do you think?',
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
            'Did you take it already? Don\'t skip doses.',
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
            'Yeah, let\'s figure out a time that works.',
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
            'Say no more! Let\'s make it happen.',
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
            'Couldn\'t agree more. That\'s so important.',
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
            'Say no more! Let\'s make it happen.',
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
            'Say no more! Let\'s make it happen.',
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
            'Say no more! Let\'s make it happen.',
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
            'Oh, that\'s actually genius. Let\'s try it.',
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
            'Hmm, let me check the price real quick.',
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
            'Of course! Go right ahead.',
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
            'Let\'s do it! I\'m right behind you.',
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
            'Say no more! Let\'s make it happen.',
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
            'Say no more! Let\'s make it happen.',
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
            'Let me check... try this password.',
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
            'Where to? That\'s a big change!',
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
            'Yeah, totally! I was just thinking that.',
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
            'No worries! Let me break it down for you.',
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
            'Me too! Great minds think alike.',
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
            'Oh wow, you\'re right! Good eye.',
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
            'Let\'s do it! I\'m right behind you.',
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
            'Yeah, I heard about that. Wild, right?',
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
            'Aw, you gotta show me pictures!',
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
            'Let\'s do it! I\'m right behind you.',
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
            'You know what, you\'re absolutely right.',
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
            'No worries, take your time!',
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
            'Have you seen it yet? No spoilers!',
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
            'Aw, that\'s beautiful. I might tear up too.',
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
            'Me too! Great minds think alike.',
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
            'I appreciate that. Seriously.',
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
            'Yeah, we should get moving! Let\'s go.',
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
            'Same here! Can\'t wait.',
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
            'Say no more! Let\'s make it happen.',
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
            'Interesting! Tell me more about that.',
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
            'I appreciate that. Seriously.',
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
            'Aw, you gotta show me pictures!',
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
            'Aw, you gotta show me pictures!',
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
            'Nice! The weather\'s perfect for it.',
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
            'You should go. Better safe than sorry.',
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
            'That\'s great! My family\'s about the same size.',
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
            'Good to know! I\'ll make sure we avoid that.',
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
            'Aw, you gotta show me pictures!',
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
            'That sounds rough. Hang in there.',
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
            'Aw, you gotta show me pictures!',
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
            'Ha, that\'s a great way to put it!',
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
