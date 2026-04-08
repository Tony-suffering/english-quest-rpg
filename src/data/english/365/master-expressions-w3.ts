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
            "Dude, you are forty minutes late. I already ordered without you.",
        ],
        jaTranslations: [
            '遅れてすみません。',
            'ほんと遅れてごめん！',
            'マジごめん遅れた。道がありえないくらい混んでて。',
            'おい、40分遅刻だぞ。もう先に頼んだからな。',
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
            "Okay, okay, I can tell you mean it. We're good.",
        ],
        jaTranslations: [
            '本当にごめんなさい。',
            'マジでごめん、ほんとに。',
            '心から申し訳ない。自分でも最悪だと思ってる。',
            'わかったわかった、本気なのは伝わったよ。もういいから。',
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
            "Yeah, I get it. Just maybe think before you say stuff like that next time.",
        ],
        jaTranslations: [
            'そういうつもりじゃなかった。',
            'わざとじゃないんだ。',
            '悪気はなかったんだ。わざとじゃないから。',
            'うん、わかってるよ。でも次からちょっと考えてから言ってくれ。',
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
            "Yeah, we're good. Just don't make it a habit.",
        ],
        jaTranslations: [
            '許してくれる？',
            '俺たち大丈夫？',
            '許してくれない？せめて嫌いにならないで。',
            'うん、大丈夫だよ。でも癖にすんなよ。',
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
            "I'll believe it when I see it. But alright, fresh start.",
        ],
        jaTranslations: [
            '気をつけます。',
            '二度としない。',
            '絶対にもう繰り返さないようにする。',
            '信じるのは行動を見てからな。まあいいや、仕切り直しだ。',
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
            "Good, 'cause I was already planning how to make it up to you.",
        ],
        jaTranslations: [
            '怒ってないよ。',
            'もう怒ってない。',
            'もう気にしてない。恨みっこなしだよ。',
            'よかった。もう埋め合わせ計画立ててたからさ。',
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
            "Thanks, that actually makes me feel a lot better.",
        ],
        jaTranslations: [
            'よくあることだよ。',
            '誰でもあるって。',
            '気にすんな。誰だってそういう経験あるから。',
            'ありがとう、それ聞いてだいぶ楽になった。',
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
            "I'm not overreacting! ...Okay, maybe a little.",
        ],
        jaTranslations: [
            '大げさだって。',
            'ちょっとやりすぎじゃない？',
            'いやいや、完全にリアクション大げさすぎだろ。',
            '大げさじゃないし！……まあ、ちょっとだけかも。',
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
            "Hey, the fact that you're trying counts for something. Don't overthink it.",
        ],
        jaTranslations: [
            '謝るの苦手なんだ。',
            'ごめんって言うの得意じゃなくて。',
            '謝るのほんと壊滅的に下手で。何て言えばいいかわかんない。',
            'いいんだよ、謝ろうとしてるだけで十分だから。考えすぎんな。',
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
            "Deal. First round's on me then.",
        ],
        jaTranslations: [
            'もう先に進もう。',
            'もう忘れようぜ。',
            '終わったことだ。水に流して先に行こう。',
            'よし決まり。じゃあ一杯目は俺のおごりな。',
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
            "Oh, I'm so sorry about that! Let me check with the kitchen real quick.",
        ],
        jaTranslations: [
            'これは注文したものと違います。',
            'すみません、注文と違うんですが。',
            'あの、行き違いがあったみたいで。これ頼んだのと違うんです。',
            'あ、大変申し訳ございません！すぐキッチンに確認してきますね。',
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
            "My bad, that might be for table six. Let me grab the right one.",
        ],
        jaTranslations: [
            'これは頼んでません。',
            'すみません、これ頼んでないです。',
            'これ頼んでないと思うんですけど、確認してもらえます？',
            'あ、すみません。6番テーブルのかも。正しいの持ってきますね。',
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
            "I'll look into that right away. Sorry for the wait, we're slammed tonight.",
        ],
        jaTranslations: [
            'まだ来てません。',
            'まだ注文したもの待ってるんですが。',
            'すみません、だいぶ待ってるんですけど、注文通ってます？',
            'すぐ確認します。お待たせしてすみません、今夜めちゃくちゃ混んでて。',
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
            "You're right, that shouldn't have gone out like that. I'll have them fire a new one.",
        ],
        jaTranslations: [
            'これ冷たいです。',
            'これあんまり温かくないんですけど。',
            'すみません、ちょっと冷めてるんですが、温め直してもらえます？',
            'おっしゃる通りですね、こんな状態で出しちゃダメですよね。新しいの作り直させます。',
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
            "Oh no, I'm really sorry about that. We'll replace it right away, no charge.",
        ],
        jaTranslations: [
            'これに髪の毛が入ってます。',
            'あの、料理に髪の毛が入ってるんですが。',
            'すみません、料理に髪の毛が入ってたんですけど、新しいのもらえます？',
            'うわ、本当に申し訳ございません。すぐ新しいのお出しします、お代はいただきません。',
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
            "Absolutely. Give us five minutes and we'll have a fresh one out.",
        ],
        jaTranslations: [
            '作り直してもらえます？',
            '新しいのもらえますか？',
            '作り直していただくことは可能ですか？',
            'もちろんです。5分いただければ新しいのお出しします。',
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
            "Of course. Let me get them for you. One moment, please.",
        ],
        jaTranslations: [
            '店長呼んで。',
            '責任者と話せますか？',
            '責任者の方とお話しさせていただけますか。',
            'かしこまりました。お呼びしてまいります。少々お待ちください。',
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
            "Let me take another look. Yeah, that's not right. I'll fix it for you.",
        ],
        jaTranslations: [
            'これ合ってます？',
            '会計間違ってると思うんですけど。',
            'すみません、会計もう一度確認してもらえます？なんか計算合わないんですが。',
            'もう一度見させてください。あ、確かに間違ってますね。直します。',
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
            "For parties of six or more it's included. You guys are fine though, it's not on there.",
        ],
        jaTranslations: [
            'チップは含まれてます？',
            'これチップ込みですか？',
            'サービス料はもう入ってますか、それとも別で足す感じですか？',
            '6人以上のグループは込みなんですけど、お客様は大丈夫ですよ、入ってないです。',
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
            "Are you sure? I can still get the manager if you want.",
        ],
        jaTranslations: [
            'もういいです。',
            'いいよ、忘れて。',
            'あー、もういい、気にしないで。大丈夫だから。',
            '本当にいいんですか？店長呼びましょうか？',
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
            "Sure, no problem. Do you have the receipt with you?",
        ],
        jaTranslations: [
            'これ返品したいです。',
            'これ返品したいんですが。',
            'こんにちは、これ返品したくて。ネットで買ったんですけど。',
            'はい、大丈夫ですよ。レシートはお持ちですか？',
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
            "Great, you're still within the thirty-day window. We can process that right now.",
        ],
        jaTranslations: [
            'レシートあります。',
            'はい、レシートこれです。',
            'レシートここにあります。先週買ったんです。',
            'いいですね、まだ30日以内なんで。今すぐ手続きできますよ。',
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
            "Yeah, we can do an exchange. Let me check if we have your size in stock.",
        ],
        jaTranslations: [
            'これ交換できますか？',
            '別のサイズに交換できますか？',
            '返金じゃなくて、別のサイズに交換してもらうことは可能ですか？',
            'はい、交換できますよ。在庫にサイズがあるか見てきますね。',
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
            "Ugh, online sizing is the worst. Did you check if they have a size chart?",
        ],
        jaTranslations: [
            'サイズ違い。',
            'サイズが違うんです。',
            '合わないんだよね。M頼んだのにどう見てもSサイズなんだけど。',
            'ネットのサイズほんと当てにならないよね。サイズ表あったか確認した？',
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
            "That's definitely on us. We'll send a replacement out today.",
        ],
        jaTranslations: [
            '壊れてます。',
            '不良品でした。',
            '届いた時点で損傷してて。ほら、ここにヒビが入ってる。',
            'それは完全にこちらの不手際ですね。今日中に代わりの品を発送します。',
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
            "I can do a full refund back to your card. It usually takes three to five business days.",
        ],
        jaTranslations: [
            '返金してほしいです。',
            '返金をお願いしたいんですが。',
            'できれば全額返金でお願いしたいです。ポイントでの返金はちょっと困るんで。',
            'カードへの全額返金で対応できますよ。通常3〜5営業日かかります。',
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
            "You've got until the end of the month, so you're still good.",
        ],
        jaTranslations: [
            'まだ返品期間内ですか？',
            'まだ返品できる期間ですか？',
            '2週間前に買ったんですけど、まだ返品の規定内ですか？',
            '月末までOKなんで、まだ大丈夫ですよ。',
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
            "We've got black and navy left in your size. Want to take a look?",
        ],
        jaTranslations: [
            '別のをお願いします。',
            '別のと交換できる？',
            'これ、色違いに交換できますか？サイズは同じでいいんで。',
            'お客様のサイズだと黒とネイビーが残ってますよ。見てみます？',
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
            "That's fine, we just need the item and the receipt. Don't worry about the box.",
        ],
        jaTranslations: [
            '箱がないんです。',
            '元の箱はもうないんですけど。',
            '箱捨てちゃったんですけど、まずいですかね？',
            '大丈夫ですよ、商品とレシートがあればOKです。箱は気にしないで。',
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
            "Since it was defective, we'll cover return shipping. I'll email you a prepaid label.",
        ],
        jaTranslations: [
            '送料はどっちが払うんですか？',
            '返品の送料って自分持ちですか？',
            '返品の送料って自分負担ですか、それとも会社持ちですか？',
            '不良品なんでこちらで送料負担します。着払いの伝票をメールで送りますね。',
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
            "I'm calling 911 right now! Hang in there!",
        ],
        jaTranslations: [
            '助けて！',
            '誰か助けて！',
            '助けて！誰か救急車呼んで！',
            '今すぐ電話してる！頑張れ！',
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
            "Already on it. Stay right here and don't touch anything.",
        ],
        jaTranslations: [
            '警察呼んで。',
            '誰か警察呼んで！',
            '警察が必要だ。誰か今すぐ電話してくれない？',
            'もうかけてる。ここにいて、何も触るな。',
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
            "Did you cancel your cards yet? Do that first, then we'll go to the police station.",
        ],
        jaTranslations: [
            '財布盗まれた。',
            '誰かに財布盗まれた！',
            'スリにやられた。財布なくなってる。',
            'カード止めた？まずそれが先。それから警察行こう。',
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
            "Okay, don't panic. You need to go to your embassy first thing in the morning.",
        ],
        jaTranslations: [
            'パスポートなくした。',
            'パスポートが見つからない。',
            'パスポートなくしたかも。どこ探してもない。',
            '落ち着け。明日一番に大使館に行くんだ。',
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
            "There's a clinic two blocks that way. I can walk you there if you want.",
        ],
        jaTranslations: [
            '病院どこ？',
            '近くに病院ある？',
            '病院行きたい。この辺にある？',
            '2ブロック先にクリニックあるよ。一緒に行こうか？',
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
            "I'll look up the number for you. Do you have your passport number written down somewhere?",
        ],
        jaTranslations: [
            '大使館に連絡したい。',
            '日本大使館にはどうやって連絡するの？',
            '日本大使館に連絡取りたいんだ。急ぎで。',
            '番号調べてあげる。パスポート番号どっかにメモしてない？',
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
            "Good, that'll make things a lot easier. Just show them the policy number at the front desk.",
        ],
        jaTranslations: [
            '保険入ってます。',
            '旅行保険入ってるよ。',
            '旅行保険あるんだ。これ保険証番号。',
            'よかった、それなら話が早い。受付で保険証番号見せれば大丈夫。',
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
            "A little! How can I help you? Speak slowly, please.",
        ],
        jaTranslations: [
            '英語話せる人いますか？',
            '英語がわかる方いますか？',
            'すみません、ここに英語話せる人いませんか？困ってるんです。',
            'ちょっとだけ！どうしました？ゆっくり話してください。',
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
            "Where are you trying to go? I can pull it up on my phone for you.",
        ],
        jaTranslations: [
            '迷子になった。',
            '完全に迷った。',
            'マジで迷った。今どこにいるか全然わからない。',
            'どこ行きたいの？スマホで調べてあげるよ。',
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
            "You're in Shibuya. The station's right over there, past that big intersection.",
        ],
        jaTranslations: [
            'ここどこ？',
            '今ここ正確にどこ？',
            'すみません、ここがどこか教えてもらえます？ホテルに戻りたいんですけど。',
            '渋谷だよ。駅はあの大きい交差点の向こうにあるよ。',
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
            "I know, I know. I'm just so frustrated with myself right now.",
        ],
        jaTranslations: [
            '大丈夫だよ。',
            'ねえ、大丈夫だって。',
            '大丈夫だよ。誰にだってダメな日はあるから。',
            'わかってる、わかってる。でも今ほんと自分にイライラしてて。',
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
            "You're right. I need to stop spiraling. Thanks for saying that.",
        ],
        jaTranslations: [
            '気にすんな。',
            'マジで気にすんなって。',
            'ほんとに、そんな自分を責めるなよ。',
            'そうだよな。ぐるぐる考えるのやめないと。言ってくれてありがと。',
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
            "Yeah, you're right. At least now I know what the format's like.",
        ],
        jaTranslations: [
            '次があるよ。',
            '次はいけるって。',
            'この世の終わりじゃないんだから。次があるよ。',
            'うん、そうだよな。少なくとも形式はわかったし。',
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
            "Stop, you're gonna make me cry. But seriously, thank you.",
        ],
        jaTranslations: [
            'よくやったよ。',
            'ベスト尽くしたじゃん。',
            '誇りに思うよ。全力出し切ったんだから。',
            'やめて、泣きそうになるから。でもほんとにありがとう。',
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
            "I needed to hear that. I keep thinking it's all my fault but maybe it's not.",
        ],
        jaTranslations: [
            '自分を責めるな。',
            'そんな自分に厳しくすんなよ。',
            'そこまで自分を追い込むなって。お前のせいじゃない。',
            'それ聞きたかった。全部自分のせいだと思ってたけど、そうじゃないのかも。',
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
            "That means a lot, honestly. I won't let you guys down.",
        ],
        jaTranslations: [
            '応援してるよ。',
            'お前ならできる。',
            'みんなついてるから。絶対いける。',
            'ほんとに嬉しい。みんなの期待裏切らないから。',
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
            "Okay now I'm actually crying. Hand me a napkin.",
        ],
        jaTranslations: [
            '泣いてもいいんだよ。',
            '泣きたかったら泣いていいから。',
            '出しちまえよ。我慢しなくていいから。',
            'やばい、ほんとに泣いてきた。ナプキンとって。',
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
            "You guys are the best. I don't know what I'd do without you.",
        ],
        jaTranslations: [
            '一人じゃないよ。',
            '一人で抱え込まなくていいんだよ。',
            '俺たちがいるから。一人で背負わなくていい。',
            'お前ら最高だわ。みんながいなかったらどうなってたか。',
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
            "I really hope so. I'm gonna trust you on this one.",
        ],
        jaTranslations: [
            'うまくいくよ。',
            'なんとかなるって。',
            '絶対うまくいく。確信してる。',
            'ほんとにそうだといいな。お前の言葉信じるわ。',
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
            "Wait, really? You always seem so confident though. That actually helps to hear.",
        ],
        jaTranslations: [
            'その経験あります。',
            '俺も同じことあった。',
            'お前と全く同じ状況だったよ。良くなるから、信じろ。',
            'え、マジ？いつも自信ありそうなのに。それ聞いてちょっと救われた。',
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
            "Oh, yes please! I can't read any of this. What do you recommend?",
        ],
        jaTranslations: [
            '何かお手伝いできますか？',
            '何か手伝おうか？',
            'ちょっと迷ってそうだけど、何か手伝えることある？',
            'あ、お願いします！何も読めなくて。おすすめって何ですか？',
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
            "Actually, yeah! I'm trying to find the shrine. My map app keeps taking me in circles.",
        ],
        jaTranslations: [
            '道はわかりますか？',
            '道探してます？',
            'どこに向かってるかわかる？道案内できるよ。',
            'あ、実は！神社探してるんだけど、地図アプリがぐるぐる回るだけで。',
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
            "That would be amazing! Are you sure it's not out of your way?",
        ],
        jaTranslations: [
            '案内できますよ。',
            '歩いて連れてこうか？',
            '説明するのちょっと難しいから、一緒に歩いて連れてくよ。',
            'マジで！？遠回りにならない？',
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
            "Oh my god, that would be a lifesaver. I've been pointing at things for the last twenty minutes.",
        ],
        jaTranslations: [
            '通訳できますよ。',
            '通訳しようか？',
            'よかったら通訳するよ。英語完璧じゃないけど頑張る。',
            'え、マジで助かる！20分くらいずっと指差しでやってたんだよ。',
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
            "Oh, thank you so much! I was about to drop everything. You're a lifesaver.",
        ],
        jaTranslations: [
            '手伝いましょう。',
            'それ持とうか？',
            '重そうだね。手貸すよ。',
            'え、ありがとう！全部落としそうだった。命の恩人だわ。',
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
            "Would you? That'd be great! Just hit the button on the side. Thanks so much!",
        ],
        jaTranslations: [
            '写真撮りましょうか？',
            '写真撮ってあげようか。',
            'グループ写真撮りたそうだね。撮ってあげようか？',
            'いいの？ありがとう！横のボタン押すだけだから。ほんとありがとう！',
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
            "That'd be great, thank you. I have no idea how to get one around here.",
        ],
        jaTranslations: [
            'タクシー呼びましょうか？',
            'タクシー呼ぼうか？',
            'タクシー呼んであげるよ。ここから駅探すよりその方が楽だから。',
            'ありがとう、助かる。この辺でどうやって呼ぶか全然わかんなくて。',
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
            "Yes, please! We're starving. Anything with good ramen nearby?",
        ],
        jaTranslations: [
            'おすすめを教えましょうか？',
            'いい場所教えてあげようか。',
            'この辺のいい飯屋探してるなら、全部知ってるよ。',
            'お願い！お腹ペコペコで。この辺に美味しいラーメンある？',
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
            "Are you sure? I don't want to intrude. ...Okay, thank you. This place is really nice.",
        ],
        jaTranslations: [
            'どうぞ座ってください。',
            'はい、座って座って。',
            'どうぞ座って。楽にしてね。',
            'いいの？邪魔じゃない？…じゃあ、ありがとう。ここすごくいいお店だね。',
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
            "Actually, yeah. My train got canceled and I have no idea what to do.",
        ],
        jaTranslations: [
            '大丈夫ですか？',
            '何かあった？大丈夫？',
            'ねえ、大丈夫？ちょっと助けが必要そうに見えるけど。',
            'あ、実は。電車が運休になって、どうすればいいか全然わかんなくて。',
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
            "No, what happened? Tell me everything.",
        ],
        jaTranslations: [
            '聞きましたか？',
            'これ聞いた？',
            'ちょっと、何があったか聞いた？',
            'いや聞いてない。何があったの？全部話して。',
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
            "I know, right? I had the same reaction when I first heard.",
        ],
        jaTranslations: [
            '信じられません。',
            'マジで信じられない。',
            'これが現実とか、ガチで信じられないんだけど。',
            'だよね？俺も最初聞いたとき同じリアクションだった。',
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
            "Dead serious. I saw it with my own eyes.",
        ],
        jaTranslations: [
            '本気ですか？',
            '今マジで言ってる？',
            'うそだろ。マジで言ってる？',
            'ガチだよ。自分の目で見たんだから。',
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
            "My lips are sealed. But you know I'm dying to know now, so spill.",
        ],
        jaTranslations: [
            '誰にも言わないでください。',
            'これ、内緒にしてね。',
            'いい、言うけど、絶対誰にも言わないって約束して。',
            '口チャックする。でももう気になりすぎて死にそうだから、早く言って。',
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
            "Okay, okay, I promise I won't say a word. Now tell me.",
        ],
        jaTranslations: [
            'ここだけの話ですが。',
            'ここだけの話ね。',
            'ここだけの話なんだけど、本当は言っちゃダメなんだけどさ…',
            'わかったわかった、絶対言わない。で、早く教えて。',
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
            "I knew it! The way they look at each other, it was so obvious.",
        ],
        jaTranslations: [
            'あの二人は付き合っています。',
            'あの二人、どうやら付き合ってるらしい。',
            'あの二人、実は付き合ってるって聞いたんだけど。しかも公式に。',
            'やっぱり！あの二人の目線の合わせ方見てたら、バレバレだったよ。',
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
            "I'm not even kidding. It happened right in front of everyone.",
        ],
        jaTranslations: [
            'まさか。',
            'うそだろ。',
            'おい嘘だろ。そんなことマジで起きたの。',
            '冗談じゃなくて。みんなの目の前で起きたんだよ。',
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
            "So basically, she just walked out. Didn't say a single word.",
        ],
        jaTranslations: [
            'それでどうなったんですか？',
            'で、それからどうなったの？',
            'ちょっと待って待って。それでどうなった？いいとこ飛ばすなよ。',
            'で、結局彼女そのまま出て行ったの。一言も言わずに。',
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
            "I swear I'm not. Ask anyone who was there, they'll tell you the same thing.",
        ],
        jaTranslations: [
            'まさか。',
            '嘘でしょ。',
            'ありえないって。作り話でしょ。',
            'マジだって。その場にいた誰に聞いても同じこと言うから。',
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
            "He quit. On the spot. Just handed in his badge and left.",
        ],
        jaTranslations: [
            'もう一回言ってください。',
            'ちょっと待って、もう一回言って。',
            'ちょっと待って、もう一回言って。今度はゆっくり。',
            'あいつ辞めたの。その場で。バッジ返してそのまま帰った。',
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
