/**
 * 365 English Master -- Month 3 Week 12: 人間関係の英語 (Talking About People)
 * Days 82-90: 90 expressions
 * Month: June 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 3 (2026-06) -- WEEK 12
// ============================================================

export const MONTH3_W12_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 82: 誘い方 (Making Plans)
    // Scene: タケシが外国人同僚を飲みに誘いたい
    // ────────────────────────────────────────────────────

    {
        daySlot: 82, japanese: '今度飲みに行きませんか？',
        english: [
            'Want to grab drinks?',
            'Hey, want to grab drinks sometime?',
            'I was thinking we should grab drinks after work one of these days.',
            'Count me in! What are we having?',
        ],
        context: 'grab drinks は「飲みに行く」のカジュアル表現。go for drinks より軽い。sometime は「そのうち」で逃げ道を作れる便利ワード。ただし英語圏では sometime だけだと社交辞令に聞こえる。How about Friday? と具体的に言って初めて本気。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 82, japanese: '金曜日空いてる？',
        english: [
            'Are you free Friday?',
            'Hey, are you free this Friday?',
            'I was wondering if you are free this Friday evening. A few of us are going out.',
            'Hmm, good question. What do you think?',
        ],
        context: 'Are you free? は最もストレートな誘い方。I was wondering if は丁寧バージョン。wrap up は「お開きにする」。no rush は「急がなくていいよ」。英語の誘い方は具体的な日時+場所+何するかの3点セットが基本。曖昧に誘うと断られやすい。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 82, japanese: '行きたいけど予定確認するね',
        english: [
            'Sounds good. Let me check.',
            'That sounds great, let me check my schedule real quick.',
            'I would love to, but let me check my calendar and get back to you.',
            'Aw, that\'s sweet. You\'re the best.',
        ],
        context: 'let me check は即答を避ける万能フレーズ。get back to you は「後で返事する」。not a hundred percent sure は「100%確実じゃない」。make it は「行ける・間に合う」。英語では曖昧に「多分」と言うより、いつまでに返事するか伝えるのがマナー。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 82, japanese: 'ごめん、その日はちょっと無理',
        english: [
            'Sorry, I cannot make it.',
            'I wish I could but I have plans that day.',
            'I am really sorry but I already have something on Friday. Rain check?',
            'Don\'t worry about it! Seriously.',
        ],
        context: 'rain check は「また今度」の超便利フレーズ。元は野球の雨天中止チケット。I am down for は「やりたい」のカジュアル表現。blow someone off は「ドタキャンする・無視する」。英語で断るときは理由+代替案がセット。ただ No だと冷たく聞こえる。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 82, japanese: 'みんなで行こうよ',
        english: [
            'Let us all go together.',
            'We should all go together. The more the merrier.',
            'Why do you not invite everyone? It is way more fun with a bigger group.',
            'Interesting! Tell me more about that.',
        ],
        context: 'the more the merrier は「多ければ多いほど楽しい」の定番フレーズ。safety in numbers は「数の安全」で大人数だと気楽という意味。awkward は「気まずい」。keep the conversation going は「会話を途切れさせない」。',
        character: 'lisa', category: 'social', month: '2026-06',
    },
    {
        daySlot: 82, japanese: '何時に集合？',
        english: [
            'What time?',
            'What time should we meet up?',
            'What time are we meeting? And where should I go?',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'meet up は「集合する」。walk-in は「予約なしで入れる」。make a reservation は「予約する」。end up は「結局〜になる」。待ち合わせの確認は具体的にするのが英語圏のスタイル。場所・時間・目印の3つを確認する習慣をつけると楽。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 82, japanese: '俺が予約しとくよ',
        english: [
            'I will book it.',
            'Leave it to me. I will make a reservation.',
            'Do not worry about it, I will call ahead and reserve a table for us.',
            'Done! I booked us a table for seven.',
        ],
        context: 'call ahead は「事前に電話する」。hooks me up は「いい感じにしてくれる」のスラング。show up は「現れる」。take care of は「〜を処理する・面倒見る」。幹事の英語。I will take care of everything は頼もしいフレーズ。',
        character: 'master', category: 'social', month: '2026-06',
    },
    {
        daySlot: 82, japanese: 'ドタキャンしないでね',
        english: [
            'Do not cancel last minute.',
            'You better not bail on us.',
            'Promise me you will not flake out like last time.',
            'I\'ll hold you to that! Ha.',
        ],
        context: 'bail on は「ドタキャンする」。flake out も同義でより口語的。last minute は「直前に」。half joking は「半分冗談」。ドタキャンは英語でも嫌われる。特にレストランの予約人数に影響するから余計に。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 82, japanese: '会計はどうする？',
        english: [
            'How are we splitting it?',
            'Should we split the bill or go Dutch?',
            'How do you want to handle the bill? Split it evenly or pay for what we ordered?',
            'I got this one. You can get the next round.',
        ],
        context: 'split the bill は「割り勘にする」。go Dutch も同義。pay for what you ordered は「自分が頼んだ分だけ払う」。real talk は「マジな話」。英語圏では割り勘が普通だが、日本のように「先輩が出す」文化はあまりない。事前に決めるのがスマート。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 82, japanese: '楽しみにしてるね',
        english: [
            'Looking forward to it.',
            'I am really looking forward to it.',
            'Cannot wait. It has been a while since we all got together.',
            'Same here! Can\'t wait.',
        ],
        context: 'looking forward to は「楽しみにしている」の超定番。falls through は「流れる・ダメになる」。pumped は「テンション上がっている」。on dinner duty は「夕食当番」。この表現はメールの締めにも使える万能フレーズ。',
        character: 'lisa', category: 'social', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 83: 約束する (Making Promises)
    // Scene: 英語の約束表現。「今度飲もう」は社交辞令かどうか
    // ────────────────────────────────────────────────────

    {
        daySlot: 83, japanese: '約束するよ',
        english: [
            'I promise.',
            'I give you my word.',
            'I promise. You have my word on this one.',
            'Got it! I\'ll be there for sure.',
        ],
        context: 'you have my word は「約束する」のフォーマル寄り表現。give my word も同じ。hold me to it は「約束を守らせてくれ」。back out は「撤回する・逃げる」。英語の promise は日本語の「約束」より重い。軽々しく使うと信用を失う。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 83, japanese: '今度飲もうよ（社交辞令）',
        english: [
            'We should hang out sometime.',
            'Let us grab coffee sometime, for real.',
            'We should totally get together soon. It has been way too long.',
            'Oh yeah, that makes a lot of sense.',
        ],
        context: '英語の We should do this sometime は80%社交辞令。日本語の「今度飲もう」と同じ構造。follow through は「最後までやり遂げる」。本気なら具体的な日時を提案する。Let us do Tuesday 7pm at the usual spot -- これが本気の誘い。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 83, japanese: 'それ本気で言ってる？',
        english: [
            'Are you serious?',
            'Wait, do you actually mean that?',
            'Hold on. Are you being serious right now or is that just one of those things?',
            'Good read? What\'s it about?',
        ],
        context: 'do you actually mean that は「それ本気？」の直球。get my hopes up は「期待させる」。just being polite は「ただの礼儀」。英語圏でも社交辞令かどうかの見分けは難しい。具体的な日時を提案してくるかどうかがリトマス試験紙。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 83, japanese: '絶対守るから',
        english: [
            'I will keep my promise.',
            'I swear I will follow through this time.',
            'This time I am dead serious. I am not going to flake.',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'dead serious は「超本気」。track record は「実績・過去の記録」。locked in は「確定した・逃げられない」。cleared my schedule は「予定を空けた」。英語で「本気度」を伝えるには具体的な行動を言うのが一番効果的。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 83, japanese: '口だけじゃん',
        english: [
            'You are all talk.',
            'You always say that but never follow through.',
            'I have heard that one before. Actions speak louder than words, you know.',
            'Oh really? Tell me more!',
        ],
        context: 'all talk and no action は「口だけで行動しない」。actions speak louder than words は「行動は言葉より雄弁」のことわざ。broken record は「壊れたレコード」で同じことを繰り返す人。prove me wrong は「俺が間違ってると証明してみろ」。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 83, japanese: '前もそう言ってたよね',
        english: [
            'You said that last time.',
            'That is exactly what you said last time too.',
            'Funny, because I am pretty sure you said the exact same thing three months ago.',
            'Yeah, you\'re so right about that.',
        ],
        context: 'Groundhog Day は映画「恋はデジャ・ヴ」のことで「同じことの繰り返し」の比喩。notice a pattern は「パターンに気づく」。get all enthusiastic は「やたらテンション上がる」。英語で「また同じこと言ってる」を伝える皮肉表現。',
        character: 'lisa', category: 'social', month: '2026-06',
    },
    {
        daySlot: 83, japanese: '約束は守る男だよ、俺は',
        english: [
            'I keep my promises.',
            'A man is only as good as his word.',
            'In my generation, your word was your bond. You did not need a contract.',
            'Got it! I\'ll be there for sure.',
        ],
        context: 'your word is your bond は「約束は絆」の格言。shake hands は「握手する」。my old man は「親父」のカジュアル表現。it is a shame は「残念だ」。ゴンドーの昭和気質が炸裂する場面。英語にも「男の約束」的な価値観はしっかりある。',
        character: 'master', category: 'social', month: '2026-06',
    },
    {
        daySlot: 83, japanese: 'ピンキースウェアって知ってる？',
        english: [
            'Do you know pinky swear?',
            'Have you ever heard of a pinky swear?',
            'In America, kids do this thing called a pinky swear when they make a promise.',
            'I\'ll hold you to that! Ha.',
        ],
        context: 'pinky swear は「小指をかけた約束」。日本語の「指切りげんまん」と文化的に対応する。sacred は「神聖な」。dead to that person は「その人にとっては死んだも同然」。escalated quickly は「急にエスカレートした」のネットミーム由来表現。',
        character: 'lisa', category: 'social', month: '2026-06',
    },
    {
        daySlot: 83, japanese: 'じゃあカレンダーに入れとこう',
        english: [
            'Let me put it in my calendar.',
            'OK, I am adding it to my calendar right now.',
            'You know what, let me just put it in my calendar so I do not forget.',
            'It happens! Don\'t beat yourself up.',
        ],
        context: 'put it in my calendar は「カレンダーに入れる」。alert は「通知」。zero excuses は「言い訳ゼロ」。drag me out は「引きずり出す」。committed は「本気で取り組んでいる」。英語で約束を確定させるには「今この場でカレンダーに入れる」が最強ムーブ。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 83, japanese: '約束破ったら奢りね',
        english: [
            'If you break the promise, you are buying.',
            'If you bail, you owe us drinks next time.',
            'Tell you what. If you flake again, you are paying for everyone next time. Deal?',
            'Got it! I\'ll be there for sure.',
        ],
        context: 'you are buying は「おごりだよ」。owe は「借りがある」。the penalty doubles は「罰則2倍」。first round は「最初の一杯」。think of it as は「〜だと思えば」。罰ゲーム的な約束の仕方は英語でも友達同士で普通にやる。',
        character: 'yuki', category: 'social', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 84: 噂話 (Gossip and Rumors)
    // Scene: 居酒屋で近所の噂話。英語でのゴシップ表現
    // ────────────────────────────────────────────────────

    {
        daySlot: 84, japanese: 'ちょっと聞いた？',
        english: [
            'Did you hear?',
            'Hey, did you hear about this?',
            'OK do not tell anyone but did you hear what happened?',
            'Go on, I\'m listening!',
        ],
        context: 'did you hear は噂話の定番オープナー。gets back to me は「自分に返ってくる」。deny everything は「全否定する」。apparently は「どうやら」で伝聞のニュアンス。英語の噂話も日本語と同じで「言わないで」と言いながら全員に広まる。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 84, japanese: 'マジで？誰から聞いたの？',
        english: [
            'Seriously? Who told you?',
            'No way. Where did you hear that?',
            'Wait, are you serious? Who is your source? That sounds too crazy to be true.',
            'Wait, for real?! Tell me everything.',
        ],
        context: 'source は「情報源」。firsthand は「直接の・一次情報の」。too crazy to be true は「信じるには突飛すぎる」。英語では情報の信頼性を確認する表現が豊富。secondhand=又聞き、hearsay=伝聞、reliable source=信頼できる筋。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 84, japanese: 'ここだけの話なんだけど',
        english: [
            'Between you and me...',
            'This stays between us, OK?',
            'I am telling you this in confidence. Please do not spread it around.',
            'Go on, I\'m listening!',
        ],
        context: 'between you and me は「ここだけの話」。in confidence は「内密に」。spread it around は「言いふらす」。you know nothing は「何も知らない」のお約束。leaks は「漏れる」。HR=Human Resources（人事部）。秘密を打ち明ける英語には段階がある。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 84, japanese: 'あの二人付き合ってるらしいよ',
        english: [
            'They are dating apparently.',
            'I heard those two are together now.',
            'Word on the street is they have been seeing each other for months.',
            'Oh wow, you\'re right! Good eye.',
        ],
        context: 'word on the street は「街の噂では」。seeing each other は「付き合っている」の遠回し表現。sneaky は「こそこそした」。dead giveaway は「バレバレ」。subtle は「さりげない」。英語の恋愛ゴシップは日本語と同じくらい盛り上がる。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 84, japanese: '噂なんて信じないよ',
        english: [
            'I do not believe rumors.',
            'I will take that with a grain of salt.',
            'I am not going to believe it until I hear it from the person themselves.',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'take it with a grain of salt は「話半分に聞く」の名フレーズ。salt（塩）を一粒加えるイメージ。twisted は「歪められた」。exaggerated は「大げさにされた」。taken out of context は「文脈無視で伝えられた」。ゴンドーの大人の姿勢。',
        character: 'master', category: 'social', month: '2026-06',
    },
    {
        daySlot: 84, japanese: '噂が広まるの早いよね',
        english: [
            'Rumors spread so fast.',
            'Gossip travels at the speed of light.',
            'It is amazing how fast rumors get around. I just told one person.',
            'Whoa, already? That was fast!',
        ],
        context: 'spread は「広まる」。get around は「広まる」のカジュアル版。common knowledge は「周知の事実」。underground information network は「地下情報網」のジョーク表現。英語にも「壁に耳あり」的な感覚はある。walls have ears という表現がまさにそれ。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 84, japanese: '火のないところに煙は立たぬ',
        english: [
            'Where there is smoke there is fire.',
            'There might be some truth to it. Where there is smoke, there is fire.',
            'I mean, these things do not just come out of nowhere. Where there is smoke, there is fire.',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'where there is smoke there is fire は英語にもある完全一致のことわざ。kernel of truth は「真実の核」。out of thin air は「何もないところから」。distorted は「歪められた」。日英で同じことわざがあるのは珍しい。覚えやすいボーナスフレーズ。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 84, japanese: 'あんまり人のこと言えないけどね',
        english: [
            'I am one to talk.',
            'Not that I am in any position to judge.',
            'I probably should not be talking though. I have my own skeletons in the closet.',
            'Oh, for sure. I\'ve noticed that too.',
        ],
        context: 'who am I to judge は「自分が偉そうに言えない」。skeletons in the closet は「人に言えない秘密」の超定番イディオム。the key word は「ポイントはそこ」。英語でも「人のこと言えない」自覚を示す表現はたくさんあり、使うと大人に聞こえる。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 84, japanese: '誰にも言わないでね',
        english: [
            'Do not tell anyone.',
            'Keep this to yourself, OK?',
            'I am trusting you with this. Please do not tell a soul.',
            'Go on, I\'m listening!',
        ],
        context: 'not a soul は「誰にも」。take it to the grave は「墓まで持っていく」。keep it to yourself は「自分の中にしまっておく」。got out は「漏れた」。英語の「言わないで」にも強さのレベルがある。do not tell anyone < keep it to yourself < take it to the grave。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 84, japanese: '噂話はほどほどにな',
        english: [
            'That is enough gossip.',
            'OK let us change the subject before this gets out of hand.',
            'Alright, I think we have had enough gossip for one night. Let us talk about something else.',
            'Hmm, good question. What do you think?',
        ],
        context: 'out of hand は「収拾がつかなくなる」。mean-spirited は「意地の悪い」。the full picture は「全体像」。cringe は「いたたまれない気持ちになる」。マスターが場の空気を変える一言。噂話を切り上げるのも大人の英語スキル。',
        character: 'master', category: 'social', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 85: お世辞と本音 (Flattery vs Honesty)
    // Scene: アメリカ人の褒め言葉は本気なのか問題
    // ────────────────────────────────────────────────────

    {
        daySlot: 85, japanese: 'その服めっちゃいいね',
        english: [
            'I love your outfit.',
            'That outfit looks amazing on you.',
            'Oh my god, I love what you are wearing. Where did you get that?',
            'Aw, that\'s sweet. You\'re the best.',
        ],
        context: 'I love your outfit はアメリカ人の日常褒め言葉。日本人の感覚だと「お世辞？」と思うが、英語圏では思ったことをストレートに言うのが礼儀。looks amazing on you は「あなたに似合ってる」。fit は「サイズ感」。カジュアルな褒め言葉は会話の潤滑油。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 85, japanese: 'お世辞でしょ？',
        english: [
            'You are just being nice.',
            'Come on, you are just saying that.',
            'Are you serious or are you just being polite? Because I cannot always tell.',
            'Go on, I\'m listening!',
        ],
        context: '日本人が一番困惑するアメリカ文化の一つ。英語圏の褒め言葉はデフォルトで「本気」。嘘じゃないけどハードル低い。日本語の褒め言葉はレアだから重い。英語の褒め言葉は軽いけど本心。この温度差を理解するのが異文化コミュニケーションの核。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 85, japanese: '本当にそう思ってるよ',
        english: [
            'I mean it.',
            'No, I genuinely mean it.',
            'I am not just saying that to be nice. I really think so.',
            'Hmm, good question. What do you think?',
        ],
        context: 'I mean it は「本気で言っている」。fake compliments は「嘘のお世辞」。diplomatic は「外交的な」つまり「黙っているのが優しさ」。英語圏のコミュニケーションルール：褒める＝本心、何も言わない＝微妙、直接否定＝よほどのこと。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 85, japanese: '褒められると照れる',
        english: [
            'I get embarrassed.',
            'I never know how to react to compliments.',
            'I always get so awkward when someone compliments me. I never know what to say.',
            'Oh really? Tell me more!',
        ],
        context: 'deflect は「そらす」。this old thing は「こんな古いやつ」の謙遜。英語圏では褒められたら Thank you が正解。日本語の「いえいえそんな」は英語では逆効果。相手の褒め言葉を否定するのは「あなたの目は節穴」と言っているのと同じに聞こえる。',
        character: 'mina', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 85, japanese: '日本人は謙遜しすぎだよね',
        english: [
            'Japanese people are too modest.',
            'Japanese people have a hard time accepting compliments.',
            'I feel like Japanese culture makes it really hard to just say thank you to a compliment.',
            'Yeah, totally! I was just thinking that.',
        ],
        context: 'downplay は「控えめに言う」。comes across as は「〜に見える」。rejecting は「拒否する」。made my day は「今日一番嬉しい」。英語の謙遜は I got lucky くらい。日本語の「いえいえ全然です」レベルの謙遜は英語では自己否定に聞こえる。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 85, japanese: '素直にありがとうって言えばいいんだよ',
        english: [
            'Just say thank you.',
            'The easiest thing is to just say thank you.',
            'Here is a life hack. When someone compliments you, just smile and say thank you.',
            'No problem! Anytime.',
        ],
        context: 'that means a lot は「それすごく嬉しい」の返し。bonus points は「おまけポイント」。life hack は「ライフハック」。ゴンドーの人生哲学。英語の褒め返しは Thank you → That means a lot → You made my day の3段階で完璧。',
        character: 'master', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 85, japanese: 'お世辞が上手いね',
        english: [
            'You are smooth.',
            'You sure know how to sweet-talk someone.',
            'You are such a smooth talker. Do you say that to everyone?',
            'Yeah, it\'s pretty wild when you think about it.',
        ],
        context: 'smooth talker は「口が上手い人」。sweet-talk は「甘い言葉で丸め込む」。on the spot は「その場で」。charmer は「人を魅了する人」。it is working は「効いてる」。日本語の「口が上手い」は皮肉にも本気にもなるが、英語もまったく同じ。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 85, japanese: '正直に言っていい？',
        english: [
            'Can I be honest?',
            'Can I be brutally honest with you for a second?',
            'OK do not take this the wrong way but can I give you some honest feedback?',
            'Ha, that\'s a tricky one! Depends on the situation.',
        ],
        context: 'brutally honest は「残酷なほど正直」。do not take this the wrong way は「悪く取らないで」。the other way around は「逆の立場だったら」。英語では正直な意見を言う前にクッション言葉を入れるのが普通。これなしで言うと喧嘩になる。',
        character: 'takeshi', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 85, japanese: 'それはちょっと違うと思う',
        english: [
            'I do not think so.',
            'Hmm, I am not sure I agree with that.',
            'I see where you are coming from but I think you might be off on this one.',
            'Oh wait, my bad. What do you mean?',
        ],
        context: 'I see where you are coming from は「あなたの言いたいことはわかる」の超便利フレーズ。off on this one は「この件では間違っている」。just my perspective は「あくまで私の見方」。英語で反論するときは相手の意見を認めてから自分の意見を言う。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 85, japanese: '本音で話せる関係っていいよね',
        english: [
            'I like that we can be real.',
            'It is nice to have people you can be honest with.',
            'I really value that we can talk to each other without putting on a show.',
            'Good read? What\'s it about?',
        ],
        context: 'keep it real は「本音で行く」。walking on eggshells は「卵の殻の上を歩く」で「腫れ物に触るように」。put on a show は「演技する」。no filters は「フィルターなし」。ゴンドーの居酒屋が本音で話せる場所であることを大切にする場面。',
        character: 'master', category: 'feeling', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 86: 別れ際の挨拶 (Saying Goodbye)
    // Scene: See you の後に何を言う？別れ際の自然な表現
    // ────────────────────────────────────────────────────

    {
        daySlot: 86, japanese: 'じゃあ、そろそろ帰るね',
        english: [
            'I should get going.',
            'Well, I should probably head out.',
            'OK I think it is about time I head home. I have an early morning tomorrow.',
            'Hmm, good question. What do you think?',
        ],
        context: 'head out/head home は「帰る」のカジュアル表現。it has been real は「楽しかった」のスラング。get going は「そろそろ行く」。I should probably は「そろそろ〜したほうがいい」の柔らかい切り出し。別れ際の英語は「まだいたい」感を出すのがポイント。',
        character: 'takeshi', category: 'greeting', month: '2026-06',
    },
    {
        daySlot: 86, japanese: 'もう帰るの？早くない？',
        english: [
            'Already? It is still early.',
            'You are leaving already? The night is still young.',
            'Come on, one more drink. It is not even ten yet.',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'the night is still young は「夜はまだ始まったばかり」の超定番フレーズ。one more round は「もう一杯」。bribing は「賄賂で買収する」のジョーク。英語圏でも帰りたい人を引き止めるのは万国共通。引き止め方にはユーモアを入れるのがコツ。',
        character: 'yuki', category: 'greeting', month: '2026-06',
    },
    {
        daySlot: 86, japanese: '気をつけて帰ってね',
        english: [
            'Get home safe.',
            'Be careful on your way home.',
            'Text me when you get home so I know you made it back safe.',
            'Oh really? Tell me more!',
        ],
        context: 'get home safe は「気をつけて帰ってね」の一番自然な表現。sketchy は「怪しい」。made it back は「無事に戻った」。text me when you get home は英語圏でも友達同士で普通に言う。特に飲みの後は。「着いた」の連絡文化は日本語も英語も同じ。',
        character: 'lisa', category: 'greeting', month: '2026-06',
    },
    {
        daySlot: 86, japanese: '今日はありがとう、楽しかった',
        english: [
            'Thanks, I had fun.',
            'Thanks for tonight. I had a really good time.',
            'Seriously, thank you for organizing this. I had such a great time.',
            'No problem! Anytime.',
        ],
        context: 'took my mind off は「気が紛れた」。good company は「いい仲間」。what more can you ask for は「これ以上何を望む」の満足表現。英語の感謝表現は具体的に何が良かったか言うと心がこもって聞こえる。just thanks だけだと軽い。',
        character: 'mina', category: 'greeting', month: '2026-06',
    },
    {
        daySlot: 86, japanese: 'また来週ね',
        english: [
            'See you next week.',
            'See you next week. Same time, same place?',
            'Alright, see you next week. Let us make this a regular thing.',
            'Oh wow, you\'re right! Good eye.',
        ],
        context: 'a regular thing は「定例化」。standing thing は「恒例のもの」。no worries は「心配いらない」。group chat debates は「グルチャの議論」。hangout は「集まり」。定期的な飲み会を英語で提案するパターン。same time same place は簡潔で覚えやすい。',
        character: 'kenji', category: 'greeting', month: '2026-06',
    },
    {
        daySlot: 86, japanese: '終電何時？',
        english: [
            'When is the last train?',
            'What time is your last train?',
            'Hold on, we should probably check when the last train is before we order another round.',
            'Ha, that\'s so true! Love it.',
        ],
        context: 'lost track of time は「時間の感覚を失った」。costs more than my rent は「家賃より高い」の大げさ表現。oh shoot は「やばい」のマイルド版（shitの代用）。終電問題は日本の飲み文化特有。英語圏でもlast call（ラストオーダー）が同じ緊張感。',
        character: 'takeshi', category: 'greeting', month: '2026-06',
    },
    {
        daySlot: 86, japanese: 'またね、おやすみ',
        english: [
            'Bye, good night.',
            'Alright, good night everyone.',
            'OK, good night guys. Get home safe and I will see you soon.',
            'Night! Sleep well.',
        ],
        context: 'I am out は「帰るよ」のカジュアル表現。a blast は「最高に楽しかった」。drink some water は「水飲んでね」の友達同士の優しさ。for real this time は「今度こそ本当に」。英語の別れ際は長い。一度 goodbye と言ってから5分話し続けるのはあるある。',
        character: 'yuki', category: 'greeting', month: '2026-06',
    },
    {
        daySlot: 86, japanese: 'お会計お願いします',
        english: [
            'Check please.',
            'Excuse me, can we get the bill?',
            'Whenever you get a chance, could we get the check? We are wrapping up.',
            'I got this one. You can get the next round.',
        ],
        context: 'check/bill は「お会計」で両方使える。アメリカは check、イギリスは bill が主流。whenever you have a moment は「お手すきの時に」の丁寧表現。Venmo は送金アプリ。split it evenly は「均等に割る」。会計のやりとりは旅行で必須の英語。',
        character: 'kenji', category: 'greeting', month: '2026-06',
    },
    {
        daySlot: 86, japanese: '今日は俺がおごるよ',
        english: [
            'It is on me.',
            'I got this. My treat tonight.',
            'Put your wallet away. Tonight is on me. I insist.',
            'Let\'s make the most of it!',
        ],
        context: 'it is on me は「俺のおごり」の定番。my treat は同義。I insist は「どうしても」。put your wallet away は「財布しまいな」。I got this は「俺が払う」のカジュアル表現。英語圏でも「おごりの攻防」はあるが日本ほど激しくない。',
        character: 'master', category: 'greeting', month: '2026-06',
    },
    {
        daySlot: 86, japanese: 'じゃあ次は私がおごるからね',
        english: [
            'Next time is on me.',
            'OK but next time I am paying. No arguments.',
            'Fine, but I am getting the next one. That is non-negotiable.',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'non-negotiable は「交渉の余地なし」。mark my words は「覚えておけ」。return the favor は「お返しする」。I am not taking no for an answer は「ノーとは言わせない」。you have been warned は「警告したからね」のジョーク。おごりの仕返し宣言。',
        character: 'lisa', category: 'greeting', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 87: SNSの英語 (Social Media English)
    // Scene: ミナがInstagramのコメントを英語で返したい
    // ────────────────────────────────────────────────────

    {
        daySlot: 87, japanese: 'いいね押しといたよ',
        english: [
            'I liked your post.',
            'I liked your post. That photo was gorgeous.',
            'I saw your post this morning and liked it. That sunset shot was incredible.',
            'Me too! Great minds think alike.',
        ],
        context: 'double-tap は「ダブルタップ」でInstagramのいいね動作。feed は「タイムライン」。stunning は「息を呑むほど美しい」。fire emojis は英語圏のSNSで「最高」の意味。英語のSNSコメントは短くても感情を込めるのがポイント。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 87, japanese: 'フォローしてもいい？',
        english: [
            'Can I follow you?',
            'Mind if I follow you on Instagram?',
            'Hey, would it be OK if I followed you on Instagram? I love your posts.',
            'Aw, that\'s sweet. You\'re the best.',
        ],
        context: 'stalking は「ストーキング」だがSNS文脈では「チェックしてた」の冗談。etiquette は「マナー」。creepy は「気持ち悪い」。anonymously は「匿名で」。英語圏でもSNSのフォロー問題は微妙。会ったばかりの人をフォローするかどうかは悩みどころ。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 87, japanese: 'この写真映えるね',
        english: [
            'That is so Instagrammable.',
            'That would make an amazing Instagram post.',
            'Hold on, do not eat yet. I need to take a photo first. This is so photogenic.',
            'Let me see! Oh that\'s a great shot.',
        ],
        context: 'Instagrammable は「インスタ映えする」の英語版。photogenic は「写真映えする」。get likes は「いいねをもらう」。英語の Instagrammable は日本語の「映える」とほぼ同じニュアンスで完全定着した新語。2015年頃から使われ始めた。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 87, japanese: '英語でコメント返したいんだけど',
        english: [
            'How do I reply in English?',
            'I want to reply in English but I do not know what to say.',
            'Someone commented on my post in English and I want to reply but I am blanking.',
            'Your English is great! Keep it up.',
        ],
        context: 'blanking は「頭が真っ白になる」。trying too hard は「頑張りすぎ」。middle ground は「中間」。英語のSNSコメント返しは短くてOK。Thanks, that means a lot! とか Glad you liked it! で十分。長文返信はむしろ珍しい。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 87, japanese: 'バズった',
        english: [
            'It went viral.',
            'My post blew up overnight.',
            'I woke up this morning and my post had like ten thousand likes. It completely blew up.',
            'Me too! Great minds think alike.',
        ],
        context: 'blew up は「バズった」のSNS英語。went viral も同義。explore page は「発見ページ」。buzzing は「通知が鳴り続ける」。nonstop は「止まらない」。バズるの語源は virus（ウイルス）で、コンテンツがウイルスのように広がるイメージ。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 87, japanese: 'アンチコメントが来た',
        english: [
            'I got a hate comment.',
            'Some troll left a nasty comment on my post.',
            'I posted something and this random person left the rudest comment. It really got to me.',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'troll は「荒らし」。nasty は「意地の悪い」。got to me は「心に刺さった」。hater は「アンチ」。do not feed the trolls は「荒らしに餌を与えるな」のネット格言。英語圏のSNSアンチは日本語以上に攻撃的なこともある。無視が最善策。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 87, japanese: '気にしなくていいよ',
        english: [
            'Do not worry about it.',
            'Ignore them. They are not worth your energy.',
            'Haters are going to hate. Do not waste your time responding to that garbage.',
            'Yeah, I can see why. That\'s frustrating.',
        ],
        context: 'haters are going to hate は「アンチはアンチ」の超定番フレーズ。tear down は「けなす」。block は「ブロックする」。living well is the best revenge は古い英語の格言。SNS時代に「気にするな」を英語で言うバリエーションは覚えておくと便利。',
        character: 'master', category: 'social', month: '2026-06',
    },
    {
        daySlot: 87, japanese: 'DM送ってもいい？',
        english: [
            'Can I DM you?',
            'Is it cool if I send you a DM?',
            'Would it be alright if I messaged you directly? I do not want to put this in the comments.',
            'Say no more! Let\'s make it happen.',
        ],
        context: 'slide into DMs は「DMに滑り込む」で、元々はナンパの意味だったが今は普通に使う。intentions は「意図」。purely は「純粋に」。英語圏では知らない人にDMを送るのはまだ少しハードルが高い。一言断ってから送るのが丁寧。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 87, japanese: 'SNS疲れた',
        english: [
            'I am so over social media.',
            'I need a break from social media. It is exhausting.',
            'I have been thinking about taking a social media break. It is starting to affect my mental health.',
            'You look beat. Sit down, I\'ll get you something.',
        ],
        context: 'digital detox は「デジタルデトックス」。curated は「意図的に選ばれた」。comparing は「比較する」。affect my mental health は「メンタルに影響する」。SNS疲れは世界共通の現代病。doom scrolling（延々とネガティブ情報を見続ける）も覚えておきたい。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 87, japanese: '昔はSNSなんてなかったんだよ',
        english: [
            'We did not have social media back then.',
            'Back in my day there was no social media.',
            'When I was young we actually had to talk to people face to face. Imagine that.',
            'Send me the link! I\'ll follow you.',
        ],
        context: 'back in my day は「俺の時代は」の年配者フレーズ。yelling at clouds は「雲に怒鳴る」でシンプソンズ由来のミームで「老人の愚痴」の意味。check in は「位置情報を投稿する」。ゴンドーの昭和トークだが、英語圏の年配者もまったく同じことを言う。',
        character: 'master', category: 'social', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 88: 人間関係の悩み (Relationship Problems)
    // Scene: マスターが「人間関係こそ英語の本番」と語る
    // ────────────────────────────────────────────────────

    {
        daySlot: 88, japanese: '人間関係って難しいよね',
        english: [
            'Relationships are hard.',
            'People are complicated, you know?',
            'The older I get, the more I realize how hard it is to maintain relationships.',
            'Yeah, you\'re so right about that.',
        ],
        context: 'messy は「面倒くさい」。unpredictable は「予測不可能」。at the end of the day は「結局のところ」。connect with は「つながる」。ゴンドーの哲学。英語学習の本質は人と人のコミュニケーションであり、テストの点数ではない。',
        character: 'master', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 88, japanese: '最近友達と気まずくて',
        english: [
            'Things are awkward with my friend.',
            'I have been having issues with a friend lately.',
            'I got into it with one of my close friends and now things are really awkward between us.',
            'Oh yeah? What\'s been going on?',
        ],
        context: 'falling out は「仲違い」。reach out は「連絡する」。break the silence は「沈黙を破る」。drift apart は「徐々に疎遠になる」。got into it は「揉めた」。英語の人間関係表現は distance（距離）のメタファーが多い。close, distant, drifting, growing apart。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 88, japanese: '自分から謝った方がいいよ',
        english: [
            'You should apologize first.',
            'Just be the bigger person and apologize.',
            'I know it is hard but sometimes you just have to swallow your pride and say sorry.',
            'Honestly, don\'t even worry about it. We\'re good.',
        ],
        context: 'be the bigger person は「大人になる」。swallow your pride は「プライドを飲み込む」。value は「大切にする」。ego は「エゴ」。stubborn は「頑固な」。英語の謝罪論は「先に謝った方が偉い」というのが主流。日本語の「先に謝ったら負け」とは真逆。',
        character: 'master', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 88, japanese: '距離を置いた方がいいのかな',
        english: [
            'Maybe I need some space.',
            'I think I need to take a step back from this.',
            'I have been thinking maybe I should distance myself a little. Just to get some perspective.',
            'Hmm, good question. What do you think?',
        ],
        context: 'take a step back は「一歩引く」。distance myself は「距離を置く」。perspective は「視点・客観的な見方」。see the whole picture は「全体像を見る」。英語の distance の使い方は日本語の「距離を置く」とほぼ同じ感覚で使える。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 88, japanese: '人に気を使いすぎて疲れる',
        english: [
            'I am a people pleaser.',
            'I am tired of always worrying about what other people think.',
            'I spend so much energy trying to make everyone happy that I forget about myself.',
            'You look beat. Sit down, I\'ll get you something.',
        ],
        context: 'people pleaser は「人の顔色を伺う人」。bend over backwards は「全力で尽くす」。drained は「消耗した」。set boundaries は「境界線を引く」。short-circuits は「ショートする」。people pleaser は日本人に多いが、英語圏にもたくさんいる。',
        character: 'mina', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 88, japanese: '断れない性格なんだよね',
        english: [
            'I cannot say no.',
            'I have the hardest time saying no to people.',
            'Every time someone asks me for something I say yes even when I do not want to.',
            'Yeah, totally! I was just thinking that.',
        ],
        context: 'have a hard time は「〜するのが苦手」。the word no does not come out は「ノーが口から出ない」。how I got here は「なぜこんなことに」。英語で「断る」のは日本語より楽だと思われがちだが、英語圏にも断れない人はたくさんいる。',
        character: 'takeshi', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 88, japanese: 'ノーって言う練習しよう',
        english: [
            'Practice saying no.',
            'You need to learn to say no. It is a complete sentence.',
            'No is a full sentence. You do not owe anyone an explanation.',
            'That\'s awesome! How\'s it going so far?',
        ],
        context: 'no is a complete sentence は「ノーは完全な文だ」の名言。you do not owe anyone an explanation は「誰にも説明する義務はない」。harsh は「厳しい」。この考え方は英語圏のセルフヘルプで超有名。日本語にはない発想だからこそ学ぶ価値がある。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 88, japanese: '本当の友達ってなんだろう',
        english: [
            'What is a real friend?',
            'What does it even mean to be a real friend?',
            'Sometimes I wonder what separates a real friend from someone who is just around.',
            'Hmm, good question. What do you think?',
        ],
        context: 'to your face は「面と向かって」。behind your back は「陰で」。keep score は「点数をつける」。acquaintance は「知り合い」。with extra steps は「余計な手間をかけた」のミーム表現。ゴンドーの友情論。英語にも「真の友」を語る名言は多い。',
        character: 'master', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 88, japanese: '相談に乗ってくれてありがとう',
        english: [
            'Thanks for listening.',
            'Thank you for hearing me out.',
            'I really appreciate you taking the time to listen. It helped more than you know.',
            'No problem! Anytime.',
        ],
        context: 'hear me out は「最後まで聞いてくれて」。vent は「愚痴を吐き出す」。going on and on は「延々と話す」。without judging は「批判せずに」。I hear you は「わかるよ」。英語の感謝は具体的に「何が嬉しかったか」言うと深みが出る。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 88, japanese: 'いつでも話聞くよ',
        english: [
            'I am always here.',
            'You can always talk to me, you know that right?',
            'Whenever you need to talk, I am here. Day or night, no questions asked.',
            'Say no more! Let\'s make it happen.',
        ],
        context: 'no questions asked は「理由は聞かない」。that is what friends are for は「それが友達ってもんだ」。go through stuff alone は「一人で抱え込む」。we are in this together は「一緒にいるから」。英語の友情表現は直球。言われると泣きそうになるやつ。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 89: 人間関係総復習1 (People Review Day 1)
    // Scene: 全員で居酒屋ロールプレイ：外国人客の接待
    // ────────────────────────────────────────────────────

    {
        daySlot: 89, japanese: 'ようこそ、初めてですか？',
        english: [
            'Welcome. First time here?',
            'Welcome to our place. Is this your first time?',
            'Hey, welcome. Have you been here before or is this your first visit?',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'come as you are は「そのまま来てください」。grab a seat は「適当に座って」。no dress code は「ドレスコードなし」。take your time は「ゆっくりどうぞ」。居酒屋の接客英語は堅すぎず、フレンドリーすぎずのバランスが大事。',
        character: 'master', category: 'social', month: '2026-06',
    },
    {
        daySlot: 89, japanese: 'おすすめは何ですか？',
        english: [
            'What do you recommend?',
            'What is good here? Any recommendations?',
            'We are new here so we do not really know the menu. What would you recommend?',
            'Oh, you gotta try the daily special. It\'s amazing.',
        ],
        context: 'walk us through は「案内してくれる」。highlights は「おすすめ」。authentic は「本物の」。the tourist version は「観光客向け」。外国人客がよく使うフレーズ。居酒屋では chef is recommendation より today is special の方が自然。',
        character: 'lisa', category: 'social', month: '2026-06',
    },
    {
        daySlot: 89, japanese: 'これはどうやって食べるの？',
        english: [
            'How do I eat this?',
            'How am I supposed to eat this? Is there a special way?',
            'This looks amazing but I have no idea how to eat it. Can you show me?',
            'Oh, that\'s actually genius. Let\'s try it.',
        ],
        context: 'supposed to は「〜するべき」。dip は「つける」。decoration は「飾り」。quick tutorial は「簡単な説明」。figure it out は「なんとかする」。外国人が居酒屋で最も聞くフレーズの一つ。Do I eat the whole thing? もよく聞かれる。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 89, japanese: '乾杯しましょう',
        english: [
            'Cheers.',
            'Let us raise our glasses. Cheers.',
            'Before we start, let us do a proper toast. To new friends and good food.',
            'Cheers! Here\'s to a great night!',
        ],
        context: 'raise our glasses は「グラスを上げる」。toast は「乾杯」。dig in は「食べ始める」。dry the cup は「杯を乾かす」で乾杯の直訳。Kanpai は英語圏でも知名度が上がっている。乾杯の前に一言スピーチを入れるのが英語圏のスタイル。',
        character: 'master', category: 'social', month: '2026-06',
    },
    {
        daySlot: 89, japanese: '日本語少し話せますよ',
        english: [
            'I speak a little Japanese.',
            'I know some Japanese actually. Not much though.',
            'I have been studying Japanese for about a year. My level is still pretty basic but I am trying.',
            'Go for it! Nothing to lose, right?',
        ],
        context: 'Duolingo は世界最大の語学学習アプリ。pronunciation は「発音」。at least try は「少なくとも試す」。英語圏の人が日本語を話そうとしてくれるのは嬉しいし、逆に自分が英語を話そうとする姿勢も相手に好印象を与える。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 89, japanese: 'もう少しゆっくり話してもらえますか？',
        english: [
            'Can you speak slower?',
            'Sorry, could you speak a little slower please?',
            'I am so sorry but my English is not great. Could you slow down just a bit?',
            'Honestly, don\'t even worry about it. We\'re good.',
        ],
        context: 'slow down は「ゆっくり話す」。a tiny bit は「ほんの少し」。two-second delay は「2秒の遅延」。this-is-a-pen level は日本人だけが笑えるジョーク。英語で「ゆっくり話して」と頼むのは恥ずかしくない。むしろ積極的にコミュニケーションを取る姿勢。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 89, japanese: 'また来てくださいね',
        english: [
            'Please come again.',
            'You are always welcome here.',
            'It was great meeting you. You are welcome here anytime.',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'you are welcome here anytime は「いつでもどうぞ」。walk through that door は「あの扉をくぐる」。feel like family は「家族のように感じる」。take care of yourselves は「気をつけて」。ゴンドーの人柄が出る別れ際。居酒屋の看板フレーズ。',
        character: 'master', category: 'social', month: '2026-06',
    },
    {
        daySlot: 89, japanese: '名刺交換しましょう',
        english: [
            'Let me give you my card.',
            'Here is my card. Do you have one?',
            'Let me give you my business card. Feel free to reach out anytime.',
            'Oh yeah, the business card thing! That\'s a whole ritual.',
        ],
        context: 'business card は「名刺」。old school は「古い・昔ながらの」。a slap in the face は「侮辱」。pun intended は「ダジャレのつもり」。名刺交換の文化の違いは日英ビジネスで必ず出る話題。英語圏では LinkedIn の交換が主流になりつつある。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 89, japanese: '連絡先教えてもらえますか？',
        english: [
            'Can I get your contact info?',
            'Can I get your number? Or your LINE?',
            'Would it be OK if we exchanged contact info? I would love to stay in touch.',
            'Sure! Ask me anything.',
        ],
        context: 'too forward は「図々しい」。keep in touch は「連絡を取り合う」。a waste は「もったいない」。exchange contact info は「連絡先を交換する」。LINE vs WhatsApp の話は日本人と外国人の出会いで必ず出る。国によってメインアプリが違う。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 89, japanese: '今夜は楽しかったです、ありがとう',
        english: [
            'Tonight was great. Thanks.',
            'I had an amazing time tonight. Thank you so much.',
            'Thank you for everything tonight. The food, the drinks, the conversation. It was all perfect.',
            'No problem! Anytime.',
        ],
        context: 'from the bottom of my heart は「心の底から」。exceeded my expectations は「期待を超えた」。warm heart は「温かい気持ち」。truly は「本当に」。英語の感謝は具体的+感情的にすると心に刺さる。food, drinks, conversation の3つ列挙がコツ。',
        character: 'lisa', category: 'social', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 90: 人間関係総復習2 (People Review Day 2)
    // Scene: マスターが出す「英語で人を紹介する」最終テスト
    // ────────────────────────────────────────────────────

    {
        daySlot: 90, japanese: '紹介させてください',
        english: [
            'Let me introduce you.',
            'I would like to introduce you to someone.',
            'There is someone I want you to meet. Let me introduce you.',
            'Nice to meet you! I\'ve heard good things.',
        ],
        context: 'perfect timing は「ちょうどいいタイミング」。get along は「仲良くなる」。be yourself は「自分らしくいて」。英語の紹介では紹介される人の情報を先に少し伝えるのがマナー。何も言わずに「こちら〜です」だけだと会話のきっかけがない。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 90, japanese: 'こちらは私の同僚の〜です',
        english: [
            'This is my coworker.',
            'This is my colleague, Tanaka. We work together.',
            'I would like you to meet my colleague Tanaka. We have been working together for about three years.',
            'You\'ve got a good team? That makes all the difference.',
        ],
        context: 'colleague は coworker より少しフォーマル。take over は「引き継ぐ」。embarrass myself は「恥をかく」。紹介にジョークを混ぜるのは英語圏では普通。ただしフォーマルな場ではストレートに。カジュアルな場では軽い自虐が好印象。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 90, japanese: 'お噂はかねがね',
        english: [
            'I have heard a lot about you.',
            'I have heard so much about you. It is great to finally meet you.',
            'Wow, I have heard nothing but good things about you. It is such a pleasure to finally put a face to the name.',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'put a face to the name は「名前に顔がつく」つまり「やっと会えた」。nothing but good things は「いいことしか聞いていない」。in person は「直接」。exaggerating は「大げさに言う」。このフレーズは初対面の定番中の定番。',
        character: 'lisa', category: 'social', month: '2026-06',
    },
    {
        daySlot: 90, japanese: '初めまして、よろしくお願いします',
        english: [
            'Nice to meet you.',
            'It is really nice to meet you. Please call me Yuki.',
            'Hi, it is so nice to finally meet you. Yuki here. Please feel free to call me by my first name.',
            'Hey, welcome! Great to have you here.',
        ],
        context: 'please call me は「〜と呼んでください」。feel free は「遠慮なく」。getting used to は「慣れてきている」。日本語の「よろしくお願いします」は英語に直訳できない。Nice to meet you + 自分の情報 + 質問 の3ステップが英語版の「よろしく」。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 90, japanese: '何のお仕事をされてるんですか？',
        english: [
            'What do you do?',
            'So what do you do for work?',
            'If you do not mind me asking, what do you do for a living?',
            'I feel you. Work never stops, does it?',
        ],
        context: 'what do you do for a living は「お仕事は何をされていますか」の自然な聞き方。judgmental は「批判的な」。cheese taster は「チーズの味見係」。英語圏では What do you do? は会話の定番第一質問。ただし最近は「仕事で人を測る」という批判もある。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 90, japanese: '趣味は何ですか？',
        english: [
            'What are your hobbies?',
            'What do you do for fun?',
            'Outside of work, what do you like to do? Any hobbies or interests?',
            'Oh cool! How long have you been into that?',
        ],
        context: 'what do you do for fun は what are your hobbies より自然な聞き方。英語で hobbies と聞くとやや堅い。pays the bills は「生活費を稼ぐ」。who you actually are は「本当の自分」。趣味の話は共通点を見つける最大のチャンス。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 90, japanese: '共通点があるね',
        english: [
            'We have something in common.',
            'Oh we have that in common. That is awesome.',
            'No way, you like that too? Small world. We have so much in common.',
            'Me too! Great minds think alike.',
        ],
        context: 'get out of here は「嘘でしょ」の驚き表現。small world は「世界って狭いね」。what are the chances は「なんて確率だ」。shared interests は「共通の趣味」。英語での盛り上がりは大げさなくらいがちょうどいい。リアクションが薄いとつまらない人に見える。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 90, japanese: '人見知りだから緊張する',
        english: [
            'I am shy around new people.',
            'I am kind of an introvert so this is hard for me.',
            'I get really nervous meeting new people. It takes me a while to warm up.',
            'Deep breaths! You\'ve got this.',
        ],
        context: 'introvert は「内向的な人」。warm up は「打ち解ける」。self-conscious は「自意識過剰な」。despite は「〜にもかかわらず」。sweaty hands は「手汗」。人見知りの英語表現は shy だけじゃない。introvert, reserved, socially anxious など段階がある。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 90, japanese: '英語が下手ですみません',
        english: [
            'Sorry about my English.',
            'I apologize in advance for my English. It is a work in progress.',
            'Please bear with me. My English is not great but I am trying my best.',
            'Your English is great! Keep it up.',
        ],
        context: 'work in progress は「進行中」。bear with me は「我慢してね」。upfront は「最初に言っておくと」。cooperate は「協力する」。pat your head and rub your stomach は「頭なでておなかさすり」の同時作業比喩。先に謝ると相手も優しくしてくれる。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 90, japanese: '今日ここに来れてよかった',
        english: [
            'I am glad I came.',
            'I am really glad I came tonight.',
            'I almost did not come but I am so glad I did. This has been the best night.',
            'Let\'s make the most of it!',
        ],
        context: 'this close は「これくらい近かった」で親指と人差し指を近づけるジェスチャー付き。making up excuses は「言い訳を考える」。having the time of my life は「人生最高の時間」。showing up is ninety percent は「出席することが9割」。Month 3の締めくくりにふさわしいマスターの言葉。',
        character: 'master', category: 'social', month: '2026-06',
    },

];

// ============================================================
// WEEK 12 DAY THEMES
// ============================================================

export const MONTH3_W12_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    82: {
        title: '誘い方', titleEn: 'Making Plans', category: 'social',
        scene: 'タケシが外国人同僚を飲みに誘いたい',
        keywords: [
            { en: 'grab drinks', ja: '飲みに行く', pron: 'グラブドリンクス', example: 'Want to grab drinks after work?', note: 'grab は「つかむ」だが grab drinks/grab coffee/grab lunch は「軽く〜する」の超カジュアル表現。go for drinks よりさらに軽い。' },
            { en: 'rain check', ja: 'また今度', pron: 'レインチェック', example: 'Can I take a rain check?', note: '野球の雨天中止チケットが語源。後日改めて使えるチケット=「今回はダメだけどまた今度」。断りつつ次回の含みを残す万能表現。' },
            { en: 'reservation', ja: '予約', pron: 'リザベーション', example: 'I will make a reservation for seven.', note: 'make/have a reservation=予約する/している。booking はイギリス英語寄り。walk-in=予約なし。no reservation needed=予約不要。' },
            { en: 'split the bill', ja: '割り勘にする', pron: 'スプリットザビル', example: 'Should we split the bill?', note: '英語圏の割り勘は split evenly（均等割り）が基本。go Dutch も「割り勘」だがやや古い表現。separate checks=別会計。' },
            { en: 'bail', ja: 'ドタキャンする', pron: 'ベイル', example: 'Do not bail on us.', note: 'bail は元々「保釈」。bail on=ドタキャンする。flake out も同義。bail と flake は友達同士のカジュアルな場面で使う。' },
        ],
    },
    83: {
        title: '約束する', titleEn: 'Making Promises', category: 'social',
        scene: '英語の約束表現。「今度飲もう」は社交辞令かどうか',
        keywords: [
            { en: 'follow through', ja: '最後までやり遂げる', pron: 'フォロースルー', example: 'He never follows through on his promises.', note: 'ゴルフのフォロースルーと同じ。振り始めたら最後まで振り切る=言ったことは最後まで実行する。on one is promise で「約束を」。' },
            { en: 'pinky swear', ja: '指切り', pron: 'ピンキースウェア', example: 'Pinky swear you will come.', note: 'pinky=小指。swear=誓う。英語圏でも子供がやる約束の儀式。大人が冗談で使うと可愛い。日本の指切りげんまんの英語版。' },
            { en: 'keep one is word', ja: '約束を守る', pron: 'キープワンズワード', example: 'He always keeps his word.', note: 'word=言葉=約束。your word is your bond=約束は絆。a man of his word=約束を守る男。break one is word=約束を破る。' },
            { en: 'committed', ja: '本気の・コミットした', pron: 'コミッテッド', example: 'I am fully committed to this.', note: 'commit=約束する→committed=本気で取り組んでいる。commitment=覚悟。最近の日本語でも「コミットする」が浸透中。' },
            { en: 'back out', ja: '撤回する・逃げる', pron: 'バックアウト', example: 'You cannot back out now.', note: 'back(後ろに)+out(出る)=後退して出る=約束から逃げる。pull out も同義。no backing out=もう逃げられない。' },
        ],
    },
    84: {
        title: '噂話', titleEn: 'Gossip and Rumors', category: 'social',
        scene: '居酒屋で近所の噂話。英語でのゴシップ表現',
        keywords: [
            { en: 'gossip', ja: '噂話・ゴシップ', pron: 'ゴシップ', example: 'I heard some juicy gossip.', note: 'juicy gossip=面白い噂話。gossip は動詞にもなる。gossip about=〜の噂をする。office gossip=社内のゴシップ。' },
            { en: 'rumor', ja: '噂', pron: 'ルーマー', example: 'It is just a rumor.', note: 'rumor has it that=噂によると。spread a rumor=噂を広める。unconfirmed rumor=未確認の噂。gossip は行為、rumor は内容。' },
            { en: 'apparently', ja: 'どうやら・らしい', pron: 'アパレントリー', example: 'Apparently they broke up.', note: '伝聞の「〜らしい」を一語で表せる最強ワード。文頭に置くだけでOK。evidently, supposedly も同義だがapparently が圧倒的に日常的。' },
            { en: 'grain of salt', ja: '話半分に', pron: 'グレインオブソルト', example: 'Take it with a grain of salt.', note: 'grain=一粒。塩一粒を加えて味わう=鵜呑みにしない。紀元前ローマの博物学者プリニウスが語源とされる由緒正しいフレーズ。' },
            { en: 'behind someone is back', ja: '陰で', pron: 'ビハインドサムワンズバック', example: 'She said it behind my back.', note: '背中の後ろで=陰で。talk behind someone is back=陰口を言う。対義語は to one is face=面と向かって。' },
        ],
    },
    85: {
        title: 'お世辞と本音', titleEn: 'Flattery vs Honesty', category: 'feeling',
        scene: 'アメリカ人の褒め言葉は本気なのか問題',
        keywords: [
            { en: 'compliment', ja: '褒め言葉', pron: 'コンプリメント', example: 'That is a nice compliment.', note: 'give/pay a compliment=褒める。take a compliment=褒められたことを受け入れる。日本人は take a compliment が苦手。' },
            { en: 'genuine', ja: '本物の・心からの', pron: 'ジェニュイン', example: 'It was a genuine compliment.', note: 'genuine=本物の。genuine smile=本心からの笑顔。fake の反対語。人にもモノにも使える。authenticity と近い意味。' },
            { en: 'humble', ja: '謙虚な', pron: 'ハンブル', example: 'She is so humble about her success.', note: 'stay humble=謙虚でいる。humble brag=謙虚を装った自慢。英語圏では humble は美徳だが、行きすぎると自信がないと見られる。' },
            { en: 'flattery', ja: 'お世辞', pron: 'フラタリー', example: 'Flattery will get you nowhere.', note: 'flattery will get you nowhere=お世辞は通用しないよ。flatter=おだてる。I am flattered=光栄です（お世辞でも本気でも使える）。' },
            { en: 'tactful', ja: '気遣いのある', pron: 'タクトフル', example: 'She is very tactful with criticism.', note: 'tact=気転。tactful=気遣いができる。tactless=無神経な。diplomaticと近い意味。本音を言うときのクッション力。' },
        ],
    },
    86: {
        title: '別れ際の挨拶', titleEn: 'Saying Goodbye', category: 'greeting',
        scene: 'See you の後に何を言う？別れ際の自然な表現',
        keywords: [
            { en: 'head out', ja: '出発する・帰る', pron: 'ヘッドアウト', example: 'I should probably head out.', note: 'head=向かう+out=外に。head home=家に向かう。head out は leave よりカジュアル。I am heading out=帰るね。' },
            { en: 'wrap up', ja: '終わりにする', pron: 'ラップアップ', example: 'Let us wrap things up.', note: 'wrap=包む+up=完了。会議を終わらせる、飲み会を切り上げる、仕事を片付ける。汎用性が高い。' },
            { en: 'last call', ja: 'ラストオーダー', pron: 'ラストコール', example: 'Last call for drinks.', note: '英語圏のバーでの「ラストオーダー」。日本語の「ラストオーダー」は和製英語ではないが、英語では last call がより一般的。' },
            { en: 'treat', ja: 'おごり', pron: 'トリート', example: 'It is my treat tonight.', note: 'my treat=私のおごり。treat someone=誰かにおごる。trick or treat のtreatも同じ語源。I will treat you=おごるよ。' },
            { en: 'get home safe', ja: '気をつけて帰ってね', pron: 'ゲットホームセイフ', example: 'Text me when you get home safe.', note: 'get home safe は別れ際の定番。drive safe=運転気をつけて。take care も同じ場面で使える。友達同士の優しさ表現。' },
        ],
    },
    87: {
        title: 'SNSの英語', titleEn: 'Social Media English', category: 'social',
        scene: 'ミナがInstagramのコメントを英語で返したい',
        keywords: [
            { en: 'go viral', ja: 'バズる', pron: 'ゴーヴァイラル', example: 'That video went viral.', note: 'viral=ウイルスのように広がる。blow up も同義。get traction=注目を集め始める。viral の前段階。' },
            { en: 'troll', ja: '荒らし・アンチ', pron: 'トロール', example: 'Do not feed the trolls.', note: 'troll は北欧神話の怪物が語源。do not feed the trolls=荒らしに餌を与えるな。trolling=荒らし行為。' },
            { en: 'DM', ja: 'ダイレクトメッセージ', pron: 'ディーエム', example: 'Check your DMs.', note: 'slide into DMs=DMに滑り込む。元はナンパの意味だが今は普通に使う。DM me=DMして。open DMs=DM開放中。' },
            { en: 'influencer', ja: 'インフルエンサー', pron: 'インフルエンサー', example: 'She is a food influencer.', note: 'influence=影響→influencer=影響力のある人。micro influencer=小規模インフルエンサー。content creator とも呼ぶ。' },
            { en: 'curated', ja: '意図的に作り込まれた', pron: 'キュレーテッド', example: 'Her feed is so curated.', note: 'curator=学芸員が展示を選ぶように、SNSの投稿を意図的にセレクトすること。curated feed=作り込まれたタイムライン。' },
        ],
    },
    88: {
        title: '人間関係の悩み', titleEn: 'Relationship Problems', category: 'feeling',
        scene: 'マスターが「人間関係こそ英語の本番」と語る',
        keywords: [
            { en: 'drift apart', ja: '疎遠になる', pron: 'ドリフトアパート', example: 'We slowly drifted apart.', note: 'drift=漂う+apart=離れて。ゆっくりと自然に離れていくイメージ。grow apart も同義。意図的ではなく時間と共に起こる。' },
            { en: 'boundaries', ja: '境界線', pron: 'バウンダリーズ', example: 'You need to set boundaries.', note: 'set boundaries=境界線を引く。healthy boundaries=健全な境界線。英語圏のセルフヘルプで最重要ワードの一つ。' },
            { en: 'vent', ja: '愚痴を吐く', pron: 'ヴェント', example: 'I just need to vent for a minute.', note: 'vent=換気口→感情の換気。I need to vent=愚痴らせて。vent to someone=誰かに愚痴る。アドバイスは求めずただ聞いてほしい時に使う。' },
            { en: 'people pleaser', ja: '人の顔色を伺う人', pron: 'ピープルプリーザー', example: 'I am such a people pleaser.', note: 'please=喜ばせる+people=人々。他人の期待に応えすぎて自分を犠牲にする人。recovering people pleaser=元人の顔色伺い（回復中）。' },
            { en: 'toxic', ja: '有害な', pron: 'トキシック', example: 'That was a toxic friendship.', note: 'toxic relationship=有害な関係。toxic positivity=行きすぎたポジティブ思考。2018年オックスフォード英語辞典「今年の単語」に選出。' },
        ],
    },
    89: {
        title: '人間関係総復習1', titleEn: 'People Review Day 1', category: 'social',
        scene: '全員で居酒屋ロールプレイ：外国人客の接待',
        keywords: [
            { en: 'authentic', ja: '本物の・本格的な', pron: 'オーセンティック', example: 'I want the authentic experience.', note: 'authentic=偽物でない本物の。authentic Japanese food=本格的な日本料理。authenticity=本物であること。観光客がよく使うワード。' },
            { en: 'hospitality', ja: 'おもてなし', pron: 'ホスピタリティ', example: 'Japanese hospitality is world-famous.', note: 'host=主人→hospitality=もてなし。hospital も同じ語源（旅人を泊める場所）。omotenashi は英語圏でもじわじわ浸透中。' },
            { en: 'etiquette', ja: 'マナー・作法', pron: 'エチケット', example: 'What is the chopstick etiquette?', note: 'フランス語由来。table etiquette=食事のマナー。business etiquette=ビジネスマナー。protocol はよりフォーマルな場面。' },
            { en: 'cheers', ja: '乾杯', pron: 'チアーズ', example: 'Cheers to new friends.', note: 'cheers=乾杯。イギリスでは「ありがとう」「さようなら」の意味でも使う。cheers to=〜に乾杯。toast も同義だがより改まった感じ。' },
            { en: 'stay in touch', ja: '連絡を取り合う', pron: 'ステイインタッチ', example: 'Let us stay in touch.', note: 'keep in touch も同義。touch=接触=つながり。lose touch=連絡が途絶える。get in touch=連絡する。SNS時代の必須フレーズ。' },
        ],
    },
    90: {
        title: '人間関係総復習2', titleEn: 'People Review Day 2', category: 'social',
        scene: 'マスターが出す「英語で人を紹介する」最終テスト',
        keywords: [
            { en: 'introduce', ja: '紹介する', pron: 'イントロデュース', example: 'Let me introduce you to my friend.', note: 'introduce A to B=AをBに紹介する。self-introduction=自己紹介。introduction=紹介・導入。初対面の場で最初に使うスキル。' },
            { en: 'first impression', ja: '第一印象', pron: 'ファーストインプレッション', example: 'First impressions matter.', note: 'make a good first impression=良い第一印象を与える。You never get a second chance to make a first impression=第一印象は一度きり。' },
            { en: 'small talk', ja: '雑談', pron: 'スモールトーク', example: 'I am bad at small talk.', note: 'small talk=たわいもない雑談。英語圏では small talk はコミュニケーションの潤滑油。天気、週末、スポーツが定番テーマ。' },
            { en: 'have in common', ja: '共通点がある', pron: 'ハブインコモン', example: 'We have a lot in common.', note: 'in common=共通して。common ground=共通の基盤。初対面で共通点を見つけると距離が一気に縮まる。' },
            { en: 'show up', ja: '現れる・参加する', pron: 'ショウアップ', example: 'Just showing up is half the battle.', note: 'show up=姿を現す。half the battle=半分は勝ったも同然。Showing up is 90 percent of life -- ウディ・アレンの名言。行動することの大切さ。' },
        ],
    },
};
