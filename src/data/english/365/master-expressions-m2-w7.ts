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
            "Ah yes, Takeshi, party of two. We've got you right by the window. Follow me.",
        ],
        jaTranslations: [
            '予約してあります。',
            'タケシで予約してるんですけど。',
            '7時に2名でタケシで予約してるんですけど。',
            'タケシ様、2名様ですね。窓際のお席をご用意しております。こちらへどうぞ。',
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
            "You can't go wrong with the seafood pasta. It's what we're known for. People come back just for that.",
        ],
        jaTranslations: [
            'おすすめは何ですか？',
            'ここのおすすめって何？',
            'おすすめ何ですか？初めて来たんですけど。',
            'シーフードパスタは間違いないですよ。うちの看板メニューで、それ目当てでリピートするお客さん多いんです。',
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
            "Great choice. The pasta comes with garlic bread too. I'll get that started for you.",
        ],
        jaTranslations: [
            'これにします。',
            'パスタにする。',
            'パスタにしようかな。あとサイドサラダもつけてもらえます？',
            'いいチョイスですね。パスタにはガーリックブレッドもつきますよ。すぐお作りしますね。',
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
            "Of course! I'll bring that right over. And yes, we take all major cards.",
        ],
        jaTranslations: [
            'お会計お願いします。',
            'お会計もらえますか？',
            'すみません、お手すきの時にお会計お願いできますか？',
            'もちろんです！すぐお持ちしますね。カードは主要なもの全部使えますよ。',
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
            "I usually just do twenty percent. The service was solid, so let's go with that.",
        ],
        jaTranslations: [
            'チップいくら置けばいいの？',
            'チップっていくら置くもんなの？',
            'ここチップいくら置けばいい？15%でいいかな？',
            '俺はいつも20%にしてる。サービスよかったし、それでいこう。',
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
            "Let me double-check with the kitchen for you. We take allergies seriously here, so just give me a sec.",
        ],
        jaTranslations: [
            'アレルギーがあるんです。',
            'ナッツアレルギーなんですよね、実は。',
            '一応言っておくと、ナッツアレルギーなんです。これナッツ入ってますか？',
            'キッチンに確認しますね。アレルギーはうちも気をつけてるんで、ちょっと待ってください。',
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
            "Sure thing, I'll grab a box. Yeah, that pasta reheats really well actually.",
        ],
        jaTranslations: [
            '持ち帰りできますか？',
            '残りの分、箱もらえます？',
            '持ち帰り用の箱もらえますか？全部食べきれなくて。',
            'もちろん、箱持ってきますね。そのパスタ、温め直しても美味しいですよ。',
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
            "Right? I'm stuffed but I regret nothing. We're definitely coming back here.",
        ],
        jaTranslations: [
            'めっちゃ美味しかった。',
            '最高だったわ。',
            '文句なしに久しぶりに一番うまい飯だった。',
            'だよな？もう腹パンパンだけど後悔ゼロ。絶対また来よう。',
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
            "No problem at all. I'll split it up by seat. Give me just a minute.",
        ],
        jaTranslations: [
            '別々でお願いします。',
            '別会計でもらえますか？',
            '別々のお会計でお願いできますか？個別に払うので。',
            '全然大丈夫ですよ。席ごとに分けますね。ちょっとだけお待ちください。',
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
            "Totally. She never hovered but always showed up at the right time. That's rare.",
        ],
        jaTranslations: [
            'スタッフがよかった。',
            'ここのサービスめっちゃよかったね。',
            'サービスすごくよかった。担当の人めちゃくちゃ感じよかったし。',
            'ほんとそれ。ベタベタ来ないのにちょうどいいタイミングで来るんだよな。あれレアだわ。',
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
            "Got it, just cleaning up the ends. I'll take off about an inch and we'll go from there.",
        ],
        jaTranslations: [
            '少し切ってください。',
            '整える程度で。短くしすぎないで。',
            '整える程度でお願いします。毛先を2センチくらい。',
            'わかりました、毛先を整える感じですね。2センチくらい切って様子見ましょう。',
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
            "Sure, right above the brows? That'll frame your face nicely. Let me show you in the mirror first.",
        ],
        jaTranslations: [
            '前髪もう少し短くしてください。',
            '前髪ちょっと上げてもらえる？',
            '前髪もうちょい短くしたくて。眉毛のすぐ上くらいで。',
            '眉上ですね？お顔の印象がきれいに出ますよ。先に鏡で見てもらいますね。',
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
            "Yep, I've got your file right here. Same length on the sides, a little longer on top. Easy.",
        ],
        jaTranslations: [
            'いつもので。',
            '前と同じで。',
            '前回と同じ感じでお願いします。あれ完璧だったんで。',
            'はいはい、カルテありますよ。サイド同じ長さでトップちょい長めですね。お任せください。',
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
            "Oh you should totally do it! A light brown would look amazing on you. Go for it.",
        ],
        jaTranslations: [
            '髪染めたいんだよね。',
            'カラーしようかなって思ってて。',
            '髪染めようかなってずっと思ってて。ちょっと明るめとか。',
            '絶対やりなよ！ライトブラウンとかめっちゃ似合うと思う。やっちゃえ。',
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
            "Aw, thanks! Yeah, I finally went for it. I'll send you my stylist's info, she's great.",
        ],
        jaTranslations: [
            '髪型変えたんだ！いいね！',
            '髪切った！めっちゃいいじゃん！',
            'え、髪変えた？すごい似合ってる！',
            'ありがとう！やっと思い切ったんだ。美容師さんの連絡先送るね、めっちゃ上手いよ。',
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
            "Oh no... honestly it's not that bad though. It'll grow out fast, I promise.",
        ],
        jaTranslations: [
            '失敗された。',
            '完全にやらかされた。',
            '整えるだけって言ったのに7センチくらいバッサリ切られた。ショックすぎる。',
            'うそ...でも正直そこまでひどくないよ。すぐ伸びるって、大丈夫。',
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
            "Tell me about it. I dropped a hundred and fifty last time and that was without color.",
        ],
        jaTranslations: [
            '美容院って高いよね。',
            '美容院行くのほんと金かかる。',
            '最近美容院ほんと高くない？食費より髪にかけてるわ。',
            'わかる。前回カラーなしで1万5千円飛んだわ。',
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
            "Must be nice being a guy. If I tried a ten-dollar cut I'd end up crying in the parking lot.",
        ],
        jaTranslations: [
            '安いとこで十分。',
            '俺は格安カットで済ませてる。10分で終わるし。',
            '俺QBハウス的なとこ行ってんだ。1000円、予約不要、10分で終わり。',
            '男はいいよなあ。私が1000円カット行ったら駐車場で泣くことになるわ。',
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
            "Wait, you're only twenty-eight? Don't stress it, gray hairs are in right now. Own it.",
        ],
        jaTranslations: [
            '白髪増えてきた。',
            '最近白髪がどんどん増えてて。',
            '白髪ばっか見つかる。ストレスかなあ。',
            'え、まだ28でしょ？気にしなくていいよ、今白髪おしゃれだし。堂々としてなよ。',
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
            "I got one last year and loved it, but yeah, it dried my hair out. Just make sure you deep condition after.",
        ],
        jaTranslations: [
            'パーマかけようかな。',
            'パーマかけようか迷ってて。',
            'パーマかけようかなって思ってるんだけど、似合うかな？',
            '私去年かけてめっちゃよかったよ、でも髪パサパサになるからトリートメントちゃんとやった方がいい。',
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
            "We have a slot open Thursday at ten. Does that work for you?",
        ],
        jaTranslations: [
            '予約を取りたいんですけど。',
            '予約したいんですが。',
            'すみません、予約を取りたいんですけど。今週空いてますか？',
            '木曜の10時が空いてますが、ご都合いかがですか？',
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
            "Let me take your temperature real quick. How long have you been feeling like this?",
        ],
        jaTranslations: [
            '熱がある気がする。',
            '熱っぽいんだよね。',
            '熱ある気がするんです。一日中寒気と熱さの繰り返しで。',
            'ちょっと体温測りますね。いつからこんな感じですか？',
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
            "Okay, I'm gonna press down gently. Tell me when it hurts. Does it get worse after eating?",
        ],
        jaTranslations: [
            'ここが痛いんです。',
            'ここにズキズキした痛みがあって。',
            'ここに鋭い痛みがあって、もう3日くらい続いてます。',
            'じゃあ軽く押しますね。痛かったら言ってください。食後にひどくなったりします？',
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
            "Just some ibuprofen for the pain. Nothing prescription. No allergies that I know of.",
        ],
        jaTranslations: [
            '何か薬飲んでますか？',
            '今飲んでる薬ありますか？',
            '今何か薬飲んでますか？市販薬も含めて教えてください。',
            'イブプロフェンを痛み止めで飲んでるくらいです。処方薬はなし。アレルギーも特にないです。',
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
            "Great, thanks. Since it's your first visit, I'll need you to fill out this form too. Won't take long.",
        ],
        jaTranslations: [
            '保険証持ってきました。',
            'これ保険証です。',
            '保険証です。何か書類の記入とかありますか？',
            'ありがとうございます。初診なのでこの用紙も記入お願いしますね。すぐ終わりますよ。',
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
            "Yeah, let's do some blood work just to rule things out. We can do it right now if you haven't eaten.",
        ],
        jaTranslations: [
            '検査した方がいいですか？',
            '検査とか受けた方がいいですかね？',
            '検査受けた方がいいですか？血液検査とか。',
            'そうですね、念のため血液検査しましょうか。食事まだなら今すぐできますよ。',
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
            "Got it, three times a day with meals. Should I come back if it doesn't get better?",
        ],
        jaTranslations: [
            '3日分の薬を出しておきますね。',
            '3日分の薬を処方しますね。',
            '3日分の処方箋出しますね。食事と一緒に飲んでください。',
            'わかりました、1日3回食事の時ですね。よくならなかったらまた来た方がいいですか？',
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
            "I know, right? I've been here since nine-thirty. At this point I might actually recover before they call my name.",
        ],
        jaTranslations: [
            '待ち時間長すぎない？',
            'どんだけ待たすの？',
            'もう1時間以上待ってるんだけど。ありえなくない？',
            'だよな？俺9時半から来てるんだけど。もう呼ばれる前に治りそうだわ。',
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
            "Dude, same. Last time I had to get a shot, the nurse made me lie down so I wouldn't pass out.",
        ],
        jaTranslations: [
            '注射が怖い。',
            '注射マジ無理なんだけど。',
            '注射ほんと無理。いつも絶対目そらす。',
            'わかるわ。俺もこの前注射打つ時、看護師さんに横にならされた。倒れるからって。',
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
            "Thanks, I appreciate it. Honestly, I just wanna sleep for like three days straight.",
        ],
        jaTranslations: [
            'お大事にね。',
            '早く良くなってね。',
            '体気をつけてね。何かあったら言って。',
            'ありがとう、助かる。正直3日くらいぶっ通しで寝たい。',
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
            "Sure, I can help with that. Just bring your ID and a proof of address. There's no minimum deposit.",
        ],
        jaTranslations: [
            '口座を開きたいんですけど。',
            '銀行口座を作りたいんですが。',
            '普通預金の口座を開きたいんですけど、何が必要ですか？',
            'もちろんです。身分証明書と住所確認書類をお持ちいただければ。最低預入額はありませんよ。',
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
            "You can do it right here. If you've got the routing number, it should go through in one to two business days.",
        ],
        jaTranslations: [
            '振り込みしたいんですけど。',
            '送金したいんですが。',
            '他の銀行に送金したいんですけど、どうやればいいですか？',
            'ここでできますよ。ルーティングナンバーがあれば、1〜2営業日で届きます。',
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
            "For the US, we've got standard or express. Express gets there in about five days. And yeah, you'll need to fill out a customs form.",
        ],
        jaTranslations: [
            'この荷物を送りたいんですけど。',
            'この荷物を海外に送りたいんですが。',
            'アメリカに送りたいんですけど、配送方法は何がありますか？',
            'アメリカ宛ては通常便と速達があります。速達だと5日くらいで届きますよ。あと税関申告書の記入が必要です。',
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
            "Oh man, that happened to me once. Go inside and talk to a teller. They can usually get it back for you.",
        ],
        jaTranslations: [
            'ATMが使えないんだけど。',
            'ATMにカード飲み込まれた。',
            'ATMにカード飲み込まれたんだけど、どうすればいいかわかんない。',
            'うわ、俺もそれ一回あった。中入って窓口の人に言えば大体返してくれるよ。',
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
            "There's a flat twenty-dollar fee for international transfers. No hidden charges, that covers everything.",
        ],
        jaTranslations: [
            '手数料いくらですか？',
            'サービス手数料はいくらですか？',
            '海外送金の手数料っていくらですか？1回ごとにかかるんですか？',
            '海外送金は一律20ドルです。隠れた料金はなくて、全部込みですよ。',
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
            "Registered mail takes about three to five days. You'll get a tracking number and a delivery confirmation.",
        ],
        jaTranslations: [
            '書留で送ってください。',
            '書留で出したいんですけど。',
            '書留で出せますか？大事な書類が入ってるので。',
            '書留は3〜5日ほどかかります。追跡番号と配達確認がつきますよ。',
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
            "No worries, happens all the time. If you've got your ID with you, we can reset it right now.",
        ],
        jaTranslations: [
            '暗証番号忘れた。',
            '暗証番号思い出せないんだけど。',
            '暗証番号忘れちゃったんですけど、再設定できますか？',
            '大丈夫ですよ、よくあることです。身分証お持ちでしたら今すぐ再設定できますよ。',
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
            "Today's rate is about one forty-eight to the dollar. How much did you want to exchange?",
        ],
        jaTranslations: [
            '両替できますか？',
            'ここで円をドルに両替できますか？',
            '円をドルに両替したいんですけど、今日のレートはいくらですか？',
            '今日のレートは1ドル148円くらいです。いくら両替されますか？',
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
            "Standard is seven to ten days. If you need it there sooner, express gets it there in three.",
        ],
        jaTranslations: [
            '届くまで何日かかりますか？',
            '届くまで何日くらいですか？',
            '届くまでだいたいどのくらいかかりますか？来週の金曜までに届いてほしいんですけど。',
            '通常便だと7〜10日です。もっと早くなら速達で3日で届きますよ。',
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
            "Yeah, I switched to the app last month and I don't know why I didn't do it sooner. So much faster.",
        ],
        jaTranslations: [
            'ネットバンキングの方が楽だよ。',
            'アプリでやればいいじゃん。全然楽だよ。',
            '俺もう全部アプリでやってるわ。銀行行くより全然楽。',
            'わかる、先月アプリに変えたけどなんでもっと早くやらなかったのか。めっちゃ速い。',
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
            "Oh, welcome! Don't worry about the noise at all. I'm Kenji, by the way. Let me know if you need anything.",
        ],
        jaTranslations: [
            '引っ越してきたばかりです。',
            '隣に引っ越してきたんです。',
            'こんにちは、隣に引っ越してきました。ご挨拶にと思って。',
            'あ、ようこそ！騒音とか全然気にしないでね。ケンジです。何かあったら言ってください。',
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
            "Have you tried talking to them face to face? If that doesn't work, I'd go straight to the landlord.",
        ],
        jaTranslations: [
            '隣の部屋がうるさいんだよね。',
            '隣の人まじうるさくて。',
            '隣の人めっちゃうるさくて。毎晩12時くらいまで音楽ガンガンかけてんの。',
            '直接話してみた？それでダメなら大家に直で言った方がいいよ。',
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
            "Burnables are Monday and Thursday, recyclables are Wednesday. I got the sticker too when I first moved in.",
        ],
        jaTranslations: [
            'ゴミの出し方がよくわからない。',
            'ゴミの分別ルールがわけわからん。',
            'ここのゴミのルールまだわかってなくて。何曜日に何出すの？',
            '可燃ごみが月曜と木曜、資源ごみが水曜だよ。俺も引っ越してきた時シール貼られた。',
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
            "Are you serious? That smells incredible. You really didn't have to, but I'm not gonna say no.",
        ],
        jaTranslations: [
            'これどうぞ。',
            '作りすぎちゃって。よかったらどうぞ。',
            'カレー作りすぎちゃって。よかったらどうです？まだ温かいですよ。',
            'えっマジで？めっちゃいい匂い。悪いなあ、でも遠慮なくもらうわ。',
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
            "Oh, I had no idea. Thanks for the heads up. I would've been so confused Tuesday morning.",
        ],
        jaTranslations: [
            '回覧板見た？',
            '近所のお知らせ見た？',
            '来週の断水のお知らせ見た？',
            'え、全然知らなかった。教えてくれてありがとう。火曜の朝パニックになるとこだった。',
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
            "You're right. I've been living here six months and I still haven't said a word to my neighbor across the hall.",
        ],
        jaTranslations: [
            'せめて挨拶はしとけ。',
            '近所の人にはちゃんと挨拶しろ。',
            '近所の人と親しくなくても、挨拶だけで全然違うぞ。',
            'そうだよな。俺半年住んでるのに向かいの人にまだ一言も話しかけてない。',
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
            "That's the worst. Have you thought about getting a white noise machine? It saved my sanity in my last apartment.",
        ],
        jaTranslations: [
            '上の階の人がうるさい。',
            '上の階の足音がすごいんだよね。',
            '上の人が夜中ずっとドスドス歩いてて。一歩一歩全部聞こえるの。',
            'それ最悪だな。ホワイトノイズマシン試した？前のアパートでそれに救われたわ。',
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
            "I think cats are fine but you'll need to pay a pet deposit. The guy on the third floor has two, so you should be good.",
        ],
        jaTranslations: [
            'ここペットOKなの？',
            'このマンションってペット飼えるの？',
            'ここってペット飼えるか知ってる？猫飼おうかなと思ってて。',
            '猫は大丈夫だと思うけど、ペット用の保証金がいるよ。3階の人は2匹飼ってるから、いけると思う。',
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
            "Free snacks? Say no more. I'll go. What time does it start?",
        ],
        jaTranslations: [
            '町内会の集まりがあるんだって。',
            '今週末に自治会の集まりがあるらしい。',
            '今度の日曜に町内会の集まりがあるらしいんだけど、行く？',
            'タダでお菓子もらえる？それだけで十分。行くわ。何時から？',
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
            "That's so nice. My last place was a nightmare. I could hear every argument through the walls.",
        ],
        jaTranslations: [
            'いい人たちでよかった。',
            '近所の人に恵まれたわ。',
            '近所の人がいい人で本当によかった。全然違うもん。',
            'いいなあ。前の家は最悪だった。壁越しにケンカ全部聞こえてたし。',
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
            "Okay, okay, my lips are sealed. But you seriously need to watch it this weekend. Trust me.",
        ],
        jaTranslations: [
            'ネタバレしないで！',
            'ネタバレすんなよ！',
            'ちょっと待って、まだ観てないの！ネタバレしないで！',
            'わかったわかった、口チャックする。でもマジ今週末に観ろ。信じて。',
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
            "I just started it last night! Only two episodes in but I can already tell I'm gonna binge the whole thing.",
        ],
        jaTranslations: [
            'あのドラマ観てる？',
            'あの新しいドラマ観てる？',
            'Netflixの新しいやつ観てる？みんな話題にしてるけど。',
            '昨日観始めた！まだ2話だけど、もう全部一気見する予感しかない。',
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
            "Same, I was a mess. My boyfriend looked over at me and was like, are you okay? No, I was not okay.",
        ],
        jaTranslations: [
            'あの映画泣いたわ。',
            'あの映画めっちゃ泣いた。',
            '正直に言うわ、あの映画で号泣した。ガチで顔ぐちゃぐちゃになるやつ。',
            'わかる、私もボロボロだった。彼氏に「大丈夫？」って言われたけど、全然大丈夫じゃなかった。',
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
            "Ha, classic. You always do that. Just watch it on a Saturday afternoon when you're actually awake.",
        ],
        jaTranslations: [
            '途中で寝ちゃった。',
            '途中で寝落ちした。',
            '観始めたんだけど20分くらいで寝落ちした。',
            'ハハ、出た。いつもそれじゃん。土曜の昼間に起きてる時に観ろよ。',
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
            "See, I haven't read the book, so I actually enjoyed the movie. Ignorance is bliss, I guess.",
        ],
        jaTranslations: [
            '原作の方がよかった。',
            '原作の方が全然よかったわ。',
            '先に原作読んだけど、正直映画は原作に全然追いついてなかった。',
            'そう、俺は原作読んでないから普通に映画楽しめたけどね。知らぬが仏ってやつ。',
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
            "For real. Apparently it took them six months to prep for that role. You can tell they went all in.",
        ],
        jaTranslations: [
            'あの俳優めっちゃいい。',
            '主演の俳優やばかった。',
            '主演の俳優マジですごかった。今年一の演技だわ。',
            'ほんとそれ。あの役の準備に半年かけたらしいよ。ガチで全力投入したのが伝わってくる。',
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
            "I saw a fan theory that the villain is actually the hero's brother. If that's true, I'm gonna lose it.",
        ],
        jaTranslations: [
            '続編が楽しみ。',
            '次のやつめっちゃ楽しみ。',
            '続編マジで待ちきれない。最後のあの引き、えぐかった。',
            'ファンの考察で悪役が実は主人公の兄弟ってやつ見たんだけど、あれが本当ならヤバい。',
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
            "I've got like four and I only use two of them. I keep saying I'll cancel but then a new show drops.",
        ],
        jaTranslations: [
            'サブスク何入ってる？',
            '配信サービスは何使ってる？',
            '配信サービス何使ってる？入りすぎて減らしたいんだけど。',
            '4つくらい入ってるけど使ってるの2つだけ。解約しようと思うたびに新しいの始まるんだよ。',
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
            "Subtitles all the way. Half the time actors just mumble and I can't catch a word they're saying.",
        ],
        jaTranslations: [
            '字幕派？吹替派？',
            '字幕で観る？吹替で観る？',
            '字幕派？それとも吹替派？',
            '断然字幕派。半分くらい俳優がボソボソ言ってて何言ってるか全然聞こえないし。',
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
            "Nah, I felt the same way. It was fine but people made it sound like the greatest thing ever. Totally overhyped.",
        ],
        jaTranslations: [
            '評価ほど面白くなかったなあ。',
            '正直、過大評価だと思う。',
            'みんな騒いでたけど、正直期待はずれだったわ。',
            'いや、俺も同じこと思った。悪くはないけど、みんなが言うほど最高ではなかったよな。完全に騒がれすぎ。',
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
            "Oh my god, she's adorable. Look at those little ears! You need to send me that photo right now.",
        ],
        jaTranslations: [
            'うちの猫可愛すぎる。',
            'うちの猫ほんとやばいくらい可愛い。',
            'うちの猫見て。世界で一番可愛い生き物だから。',
            'えっ可愛すぎ。この小さい耳見て！その写真今すぐ送って。',
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
            "Cat person, no contest. Dogs are too needy. My cat ignores me and I respect that energy.",
        ],
        jaTranslations: [
            '犬と猫、どっち派？',
            '犬派？猫派？',
            'マジな質問なんだけど。犬派？猫派？',
            '猫派一択。犬はかまってちゃんすぎ。うちの猫は俺のこと無視するけど、そのスタンスリスペクトしてる。',
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
            "That's awesome. I need that kind of motivation. My couch has too strong of a grip on me after work.",
        ],
        jaTranslations: [
            '毎日犬の散歩してるよ。',
            '犬の散歩が日課なんだ。',
            '毎朝毎晩犬の散歩してるよ。自分の運動にもなるし。',
            'いいなあ。俺もそういうモチベほしいわ。仕事終わるとソファの引力が強すぎて。',
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
            "Yeah, don't wait on that. Better safe than sorry. My vet does walk-ins on Wednesdays if you need a rec.",
        ],
        jaTranslations: [
            '動物病院に連れていかないと。',
            'そろそろ病院に連れてった方がいいかな。',
            'うちの猫最近あんまり食べなくて。動物病院連れてかないと。',
            'それは早めに行った方がいいよ。念のためね。うちの獣医さん水曜は予約なしでいけるよ。',
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
            "A hundred percent. My dog's been through more life changes with me than most people have. He's earned the title.",
        ],
        jaTranslations: [
            'ペットは家族だからね。',
            'うちの犬はもう完全に家族。',
            '俺にとってペットはただの動物じゃない。家族だよ。',
            '100%同意。うちの犬は誰よりも俺の人生の変化を一緒に乗り越えてきた。家族って呼ばれる資格ある。',
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
            "That sucks. Have you looked into hypoallergenic breeds? My friend's got a poodle and she's allergic too.",
        ],
        jaTranslations: [
            'アレルギーがあります。',
            '飼いたいけどアレルギーなんだよね、猫。',
            'ペット飼いたいんだけど、毛のある動物ほぼ全部アレルギーなんだよ。',
            'それきついな。低アレルギーの犬種調べた？友達プードル飼ってるけど、その子もアレルギー持ちだよ。',
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
            "Aw, rescue cats are the best. It's like they know you saved them. She's lucky to have you.",
        ],
        jaTranslations: [
            '保護猫を引き取りました。',
            '保護猫なんだ。シェルターからもらったの。',
            '2年前くらいにシェルターから引き取ったんだけど、人生で一番いい決断だった。',
            'えー、保護猫って最高だよね。助けてもらったの分かってるみたいで。その子も幸せだよ。',
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
            "Oh man, the carpet thing is the worst. Have you tried crate training? It worked wonders for mine.",
        ],
        jaTranslations: [
            'しつけが大変です。',
            'うちの犬のしつけ、マジで地獄。',
            '子犬のトイレトレーニングがほんと大変で。どこでも粗相しちゃうんだよ。',
            'あーカーペットはマジ最悪だよね。クレートトレーニング試した？うちのにはめっちゃ効いたよ。',
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
            "I'm so sorry. Take all the time you need. There's no timeline on that kind of thing.",
        ],
        jaTranslations: [
            'ペットを亡くすのはつらいです。',
            'ペットロスってほんとにきつい。',
            '去年うちの犬が死んだとき、何週間も泣き止まなかった。',
            'それは辛かったね。ゆっくりでいいから。そういうのに期限なんてないから。',
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
            "I went to one in Shibuya and almost walked out with a cat. They had to stop me at the door. So dangerous.",
        ],
        jaTranslations: [
            '動物カフェに行ったことありますか？',
            '猫カフェ行ったことある？',
            '猫カフェ行ったことある？めっちゃ癒されるよ。',
            '渋谷の猫カフェ行ったとき、猫連れて帰りそうになった。入り口で止められたもん。危険すぎる。',
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
