/**
 * 365 English Master -- Month 5 Week 18: 健康と体 (Health and Body)
 * Days 128-134: 70 expressions
 * Month: August 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 5 (2026-08) -- WEEK 18
// ============================================================

export const MONTH5_W18_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 128: 体調が悪い (Feeling Sick)
    // Scene: タケシが二日酔いで居酒屋に登場。みんなが体調の英語を教える夜
    // ────────────────────────────────────────────────────

    {
        daySlot: 128, japanese: '体調悪いんだよね',
        english: [
            'I am not feeling well.',
            'I have been feeling off all day. Something is not right.',
            'Honestly, I have been feeling terrible since this morning. I think I might be coming down with something.',
            "Yeah, you don't look so hot. Why'd you even come out tonight? Go home and get some rest, man.",
        ],
        jaTranslations: [
            '体調がよくない。',
            '一日中なんか調子悪いんだよね。なんかおかしい。',
            '正直、今朝からずっと最悪で。なんかうつったかも。',
            'うわ、顔色ヤバいな。なんで来たんだよ今日。帰って寝ろって。',
        ],
        context: 'feeling off は「なんか調子悪い」の絶妙な表現。日本語では「体調悪い」で全部済むけど、英語では程度に応じてunder the weather(軽い)、feeling off(なんか変)、feeling terrible(かなりヤバい)と使い分ける。',
        character: 'takeshi', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: '熱があるみたい',
        english: [
            'I think I have a fever.',
            'I feel hot. I think I might have a fever.',
            'My forehead is burning up. I am pretty sure I have a fever. Does anyone have a thermometer?',
            "Whoa, you're burning up. Sit down, I'll get you some water. You should probably head home.",
        ],
        jaTranslations: [
            '熱があると思う。',
            'なんか熱い。熱あるかも。',
            'おでこ燃えてるんだけど。絶対熱あるわ。誰か体温計持ってない？',
            'うわ、めっちゃ熱いじゃん。座れ、水持ってくるから。帰った方がいいぞ。',
        ],
        context: 'アメリカは華氏(Fahrenheit)で体温を測る。37度C=98.6度F。「38度ある」と言っても通じない。a hundred and two feverは約39度C。have a fever=熱がある。run a fever も同義。',
        character: 'mina', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: '風邪ひいたっぽい',
        english: [
            'I think I caught a cold.',
            'I might be coming down with a cold. My throat is scratchy.',
            'I have been sneezing all day and my nose is running. I definitely caught something.',
            "There's something going around the office. Don't sit too close to me, I can't afford to catch it too.",
        ],
        jaTranslations: [
            '風邪ひいたと思う。',
            '風邪ひきかけかも。喉がイガイガする。',
            '一日中くしゃみ止まんないし鼻水ダラダラ。絶対なんかもらったわ。',
            '会社で流行ってるやつだろ。近寄んな、俺にうつしたら許さんぞ。',
        ],
        context: 'catch a cold は「風邪をひく」。日本語では「ひく」だけど英語では「つかまえる」。coming down with は「〜になりかけている」で、まだ確定していないニュアンス。I have a cold(確定) vs I am coming down with something(まだ怪しい)。',
        character: 'yuki', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: 'お腹壊した',
        english: [
            'I have a stomachache.',
            'My stomach is killing me. I think I ate something bad.',
            'I have had an upset stomach since lunch. I should not have eaten that leftover sushi.',
            "Dude, was it that convenience store sushi? I told you not to eat that. You need some stomach medicine or something?",
        ],
        jaTranslations: [
            'お腹が痛い。',
            'お腹マジで痛い。なんか変なもの食ったかも。',
            '昼からずっとお腹の調子悪くて。あの残り物の寿司、食うんじゃなかった。',
            'おい、コンビニの寿司だろ？やめとけって言ったじゃん。胃薬いる？',
        ],
        context: 'upset stomach は「お腹の調子が悪い」の最も自然な表現。stomachacheはやや子供っぽい。日本語の「お腹壊した」は直訳できない。my stomach is killingme は「死ぬほど痛い」でかなりカジュアル。',
        character: 'takeshi', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: '薬飲んだ？',
        english: [
            'Did you take medicine?',
            'Have you taken anything for it? You should take some medicine.',
            'You look terrible. Have you taken any medicine? I have some ibuprofen in my bag if you need it.',
            "Not yet. I keep forgetting. You got any ibuprofen on you? I'll take whatever at this point.",
        ],
        jaTranslations: [
            '薬飲んだ？',
            'なんか飲んだ？薬飲んだ方がいいよ。',
            '顔色ヤバいよ。薬飲んだ？カバンにイブプロフェンあるけど、いる？',
            'まだ。いつも忘れるんだよね。イブプロフェン持ってる？もうなんでもいいから飲むわ。',
        ],
        context: 'take medicine は「薬を飲む」。英語ではdrink medicineとは言わない。液体の薬でもtake。over-the-counter=市販薬、prescription=処方薬。kick in は「効き始める」でよく使うイディオム。',
        character: 'lisa', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: '無理しないでね',
        english: [
            'Take it easy.',
            'Do not push yourself. Get some rest.',
            'Seriously, do not overdo it. Go home and get some rest. We will be here next week.',
            "Thanks, Master. I appreciate it. I'll head out after this drink, I promise.",
        ],
        jaTranslations: [
            '無理すんな。',
            '無理すんなよ。ちゃんと休めって。',
            'マジで無茶すんなよ。帰ってゆっくり寝ろ。来週もいるからさ。',
            'ありがとう、マスター。この一杯飲んだら帰るわ、約束する。',
        ],
        context: '「無理しないで」は日本語特有の優しさがある表現。英語ではtake it easy、do not push yourself、do not overdo it で言い分けるけど、どれも日本語ほどの温かみが出にくい。get some rest が一番近い。',
        character: 'master', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: 'ずっと頭痛い',
        english: [
            'I have a headache.',
            'I have had a headache all day. It will not go away.',
            'This headache has been going on since this morning. No amount of water or coffee is helping.',
            "Have you tried drinking more water? You might just be dehydrated. That's usually what does it for me.",
        ],
        jaTranslations: [
            '頭が痛い。',
            '一日中頭痛いんだよね。全然治んない。',
            '今朝からずっと頭痛くて。水飲んでもコーヒー飲んでも全然ダメ。',
            '水もっと飲んでみた？脱水かもよ。俺はだいたいそれで治るんだけど。',
        ],
        context: 'headache は「頭痛」。migraine=偏頭痛（もっと重い）。日本語では「頭が痛い」の一種類だけど、英語ではdull(鈍い)、throbbing(ズキズキ)、splitting(割れるような)と痛み方を形容詞で表現する文化がある。',
        character: 'kenji', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: '声が出ない',
        english: [
            'I lost my voice.',
            'I can barely talk. I totally lost my voice.',
            'My voice is completely gone. I have been whispering all day and my coworkers think it is hilarious.',
            "Oh no, you sound terrible! Don't try to talk, just rest your voice. I'll get you some hot tea with honey.",
        ],
        jaTranslations: [
            '声が出なくなった。',
            'ほとんど喋れない。完全に声枯れた。',
            '声が完全に出ない。一日中ヒソヒソ声で、同僚にめっちゃ笑われてる。',
            'うわ、声ヤバいね。無理に喋んないで。はちみつ入りのお茶持ってくるから。',
        ],
        context: 'lose my voice は「声が出なくなる」。日本語の「声が枯れる」はmy voice is hoarseで、完全に出ないのとは違う。英語ではvoice is gone(完全)、voice is hoarse(ガラガラ)、voice is cracking(裏返る)と段階がある。',
        character: 'mina', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: '寒気がする',
        english: [
            'I have the chills.',
            'I keep getting the chills. I cannot stop shivering.',
            'I am wearing three layers and I still have the chills. Can someone turn up the heat?',
            "Here, take my jacket. You're shaking like crazy. That's definitely a fever, not just the cold in here.",
        ],
        jaTranslations: [
            '寒気がする。',
            'ずっと寒気がして、震えが止まんない。',
            '3枚重ね着してるのにまだ寒気がする。誰か暖房上げてくんない？',
            'ほら、俺のジャケット着ろよ。ガタガタ震えてんじゃん。それ絶対熱だろ、ここが寒いんじゃなくて。',
        ],
        context: 'the chills は風邪の症状の「寒気」。単にcold(寒い)とは違って、体調不良の震え。goosebumps=鳥肌（寒さや感動）。shiverは「震える」。日本語の「ゾクゾクする」が一番近いのはthe chills。',
        character: 'takeshi', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 128, japanese: '早退した',
        english: [
            'I left work early.',
            'I left work early today. I just could not take it anymore.',
            'I ended up leaving the office early because I felt so bad. My boss told me to go home.',
            "Good call. Nobody wants you spreading that around the office. Did your boss give you a hard time about it?",
        ],
        jaTranslations: [
            '仕事早退した。',
            '今日仕事早退したんだ。もう限界だった。',
            '結局具合悪すぎて早退した。上司に帰れって言われて。',
            '正解だろ。会社でばらまかれたら迷惑だし。上司になんか言われた？',
        ],
        context: 'leave work early は「早退する」。日本語の「早退」は一語で済むけど、英語では文で説明する。call in sick=病欠の電話をする。take a sick day=病欠を取る。work from home=在宅勤務（体調微妙な時の選択肢）。',
        character: 'yuki', category: 'feeling', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 129: 病院で (At the Doctor)
    // Scene: タケシが病院に行った報告。海外で病院に行く時の英語をみんなで練習
    // ────────────────────────────────────────────────────

    {
        daySlot: 129, japanese: '予約を取りたいんですけど',
        english: [
            'I would like to make an appointment.',
            'Hi, I need to see a doctor. Can I make an appointment?',
            'I have been feeling sick for a few days. Could I schedule an appointment as soon as possible?',
            "Sure, we can fit you in at two thirty today. Can I get your name and insurance info?",
        ],
        jaTranslations: [
            '予約を取りたいんですけど。',
            'すみません、診てもらいたいんですけど。予約できますか？',
            '数日前から体調悪くて。できるだけ早く予約取れますか？',
            'はい、今日の2時半なら空いてますよ。お名前と保険証お願いします。',
        ],
        context: '病院の予約はappointment。レストランはreservation。この使い分けは日本語にはない。make an appointment=予約を入れる。walk-in=予約なしで行く。same-day appointment=当日予約。海外では予約なしで医者に会えないことが多い。',
        character: 'takeshi', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: 'どこが痛いですか？',
        english: [
            'Where does it hurt?',
            'Can you show me where exactly it hurts?',
            'On a scale of one to ten, how bad is the pain? And can you point to where it hurts the most?',
            "Right here, on the left side. It's more of a dull ache, and it gets worse when I bend over.",
        ],
        jaTranslations: [
            'どこが痛いですか？',
            '具体的にどこが痛いか教えてもらえますか？',
            '痛みは10段階でどのくらい？一番痛いところを指さしてもらえますか？',
            'ここです、左側。鈍い痛みで、前かがみになると悪化します。',
        ],
        context: 'Where does it hurt? は医者の定番フレーズ。日本語の「どこが痛いですか」とほぼ同じ。ただし英語では痛みの種類を聞かれることが多い。sharp(鋭い)、dull(鈍い)、throbbing(ズキズキ)、aching(疼く)。日本語の擬音語のほうが便利。',
        character: 'lisa', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: 'アレルギーはありますか？',
        english: [
            'Do you have any allergies?',
            'Before I prescribe anything, do you have any drug allergies?',
            'I need to check -- are you allergic to any medications? Penicillin, ibuprofen, anything like that?',
            "Not that I know of. I've never had a reaction to anything, but I've never taken antibiotics before either.",
        ],
        jaTranslations: [
            'アレルギーはありますか？',
            '薬を出す前に確認ですが、薬のアレルギーはありますか？',
            '確認させてください。薬のアレルギーはありますか？ペニシリン、イブプロフェンとか。',
            '特にないと思います。今まで反応出たことないんですけど、抗生物質は飲んだことないです。',
        ],
        context: 'allergic to は「〜にアレルギーがある」。drug allergy=薬のアレルギー。日本語では「アレルギー」だけで通じるけど、英語では何に対するアレルギーかを必ず明示する。peanut allergy, shellfish allergy など。',
        character: 'master', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: '保険証を見せてください',
        english: [
            'Can I see your insurance card?',
            'Do you have your insurance card with you? I will need to see it.',
            'Before we get started, I will need a copy of your insurance card and a photo ID please.',
            "Yeah, here you go. Do you need both sides? I'm not sure if my plan changed since last time.",
        ],
        jaTranslations: [
            '保険証を見せてもらえますか？',
            '保険証お持ちですか？確認させてください。',
            '始める前に保険証のコピーと身分証明書をお願いします。',
            'はい、どうぞ。両面いりますか？前回からプラン変わったかわかんないんですけど。',
        ],
        context: 'insurance card は「保険証」。日本の国民皆保険とアメリカの民間保険は全然違う。copay=自己負担額、deductible=免責額、premium=保険料。アメリカで病院に行くと最初に聞かれるのが保険の話。medical bill(医療費)が破産原因No.1の国。',
        character: 'kenji', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: '処方箋出しますね',
        english: [
            'I will write you a prescription.',
            'I am going to prescribe something for the pain.',
            'Let me write you a prescription. Take it to the pharmacy downstairs and they will fill it for you.',
            "Got it. Is there a pharmacy nearby, or should I just go to the one at the drugstore down the street?",
        ],
        jaTranslations: [
            '処方箋を出しますね。',
            '痛み止めを処方しますね。',
            '処方箋を書きますので、下の薬局に持っていってください。',
            'わかりました。近くに薬局ありますか？それとも先の通りのドラッグストアに行った方がいいですか？',
        ],
        context: 'prescription=処方箋。fill a prescription=処方箋を薬に換える（薬局で）。日本では病院と薬局が分かれているのが普通だけど、アメリカの pharmacy は Walgreens や CVS のような大型ドラッグストアに併設されている。',
        character: 'lisa', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: '何か薬飲んでますか？',
        english: [
            'Are you taking any medication?',
            'Are you currently on any medication? Anything I should know about?',
            'Before I prescribe this, are you taking any other medications right now? Including supplements or vitamins.',
            "Just some allergy pills and a daily vitamin. Nothing serious. Should I have mentioned that earlier?",
        ],
        jaTranslations: [
            '何か薬飲んでますか？',
            '今何か薬飲んでますか？知っておくべきことありますか？',
            'この薬を出す前に、今飲んでる薬はありますか？サプリやビタミン剤も含めて。',
            'アレルギーの薬とビタミン剤くらいです。大したものじゃないです。先に言うべきでした？',
        ],
        context: 'be on medication は「薬を服用中」。日本語の「薬飲んでる？」は英語ではAre you on anything?とも言える。drug interaction=薬の飲み合わせ。サプリも含めて聞くのがアメリカの医者の基本。',
        character: 'master', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: '注射されるのが怖い',
        english: [
            'I am afraid of needles.',
            'I really hate needles. Can we do something else?',
            'I know this is silly but I have a serious fear of needles. Is there an alternative?',
            "Don't worry, we get that a lot. I'll count to three and it'll be over before you know it. Just don't look.",
        ],
        jaTranslations: [
            '注射が怖い。',
            '注射マジで無理なんです。他の方法ないですか？',
            'バカみたいなんですけど、注射が本当に怖くて。代わりの方法ありますか？',
            '大丈夫ですよ、そういう方多いので。3つ数えますね、あっという間ですから。見ないでね。',
        ],
        context: 'needle=注射針。shot=注射（カジュアル）、injection=注射（フォーマル）。fear of needles は英語圏でもよくある。trypanophobia=注射恐怖症。pass out=気絶する。日本語の「注射が怖い」はそのままで通じるけどneedlesが自然。',
        character: 'mina', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: '具合がよくならない',
        english: [
            'I am not getting better.',
            'It has been a week and I still do not feel better.',
            'I took the medicine you prescribed but honestly, I am not seeing any improvement at all.',
            "Hmm, let me take another look. Sometimes it takes a while to kick in, but we might need to switch you to something stronger.",
        ],
        jaTranslations: [
            'よくならないんです。',
            '一週間経ったけどまだ良くならない。',
            '処方された薬飲んでるけど、正直全然改善してないんです。',
            'うーん、もう一回診ましょうか。効くまで時間かかることもあるけど、もっと強い薬に変えた方がいいかも。',
        ],
        context: 'not getting better は「よくならない」。improvement は「改善」。日本語の「効かない」はit is not working。英語では時間経過を伝えるのが重要。It has been a weekと期間を言わないと医者が判断できない。follow-up=経過観察。',
        character: 'takeshi', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: '検査の結果はいつ出ますか？',
        english: [
            'When will I get the results?',
            'How long until the test results come back?',
            'I am a bit nervous about the test. When should I expect the results? Can you call me?',
            "It usually takes about three to five business days. We'll give you a call either way, so don't stress about it.",
        ],
        jaTranslations: [
            '結果はいつ出ますか？',
            '検査結果、どのくらいで出ますか？',
            'ちょっと心配で。結果いつ頃出ますか？電話もらえますか？',
            'だいたい3〜5営業日ですね。どちらにせよお電話しますので、心配しないでください。',
        ],
        context: 'test results は「検査結果」。blood work=血液検査、lab results=検査結果(正式)。日本語では「結果いつ出ますか」で済むけど、英語ではcome back(返ってくる)というイメージ。no news is good news=便りがないのはいい知らせ。',
        character: 'yuki', category: 'request', month: '2026-08',
    },
    {
        daySlot: 129, japanese: 'お大事に',
        english: [
            'Take care.',
            'Take care of yourself. I hope you feel better soon.',
            'Get well soon. And please, do not come back to work until you are actually better.',
            "Thanks, Kenji. I really appreciate it. I'll try not to overdo it this time, I swear.",
        ],
        jaTranslations: [
            'お大事にね。',
            '体に気をつけてね。早く良くなるといいね。',
            '早く良くなれよ。ちゃんと治るまで仕事来んなよ。',
            'ありがとう、ケンジ。マジ感謝。今回は無理しないようにするわ、マジで。',
        ],
        context: '「お大事に」は日本語の完璧なフレーズだけど英語には一語の等価がない。Take care、Get well soon、Feel better を組み合わせて使う。Get well soon はカードに書く定番。Hope you feel better soon が一番近い。',
        character: 'kenji', category: 'request', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 130: ダイエット (Diet Talk)
    // Scene: ケンジがダイエットを宣言。みんなが色々言う居酒屋の夜
    // ────────────────────────────────────────────────────

    {
        daySlot: 130, japanese: 'ダイエット始めたんだ',
        english: [
            'I started a diet.',
            'I am on a diet. Started last week, actually.',
            'I finally decided to get serious about my diet. No more late-night ramen runs.',
            "Wait, for real? Didn't you say the exact same thing like two months ago? How long is it gonna last this time?",
        ],
        jaTranslations: [
            'ダイエット始めた。',
            'ダイエット中なんだ。先週から始めた。',
            'ついに本気でダイエットすることにした。もう深夜のラーメンはなしだ。',
            'え、マジで？2ヶ月前にも同じこと言ってなかった？今回はいつまで持つの？',
        ],
        context: 'be on a diet は「ダイエット中」。日本語の「ダイエット」は痩せることだけど、英語の diet は「食事内容」全般。I am on a diet=食事制限中。dietだけだと「食習慣」の意味もある。lose weight=痩せる が「ダイエット」の直訳。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: '糖質制限してる',
        english: [
            'I am cutting carbs.',
            'I am doing a low-carb diet. No rice, no bread, no pasta.',
            'I have been on a low-carb diet for two weeks now. It is harder than I thought, especially in Japan.',
            "No carbs in Japan? Good luck with that. What are you even eating then, just meat and salad every day?",
        ],
        jaTranslations: [
            '糖質減らしてる。',
            '低糖質ダイエットやってんの。米もパンもパスタもなし。',
            '低糖質ダイエット2週間目なんだけど、思ったよりキツい。特に日本では。',
            '日本で糖質制限？無理だろ。何食ってんの、毎日肉とサラダだけ？',
        ],
        context: 'carbs は carbohydrates の略で日常会話ではこっちが主流。cut carbs=糖質を減らす。low-carb=低糖質。keto=ケトジェニック(超低糖質)。日本語の「糖質制限」は英語圏でも大流行中で、cut carbsで通じる。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: 'リバウンドが怖い',
        english: [
            'I am scared of gaining it back.',
            'My biggest fear is gaining all the weight back after I stop.',
            'Every time I diet, I lose weight and then gain it all back. I am tired of the yo-yo effect.',
            "That's the hard part, right? Losing it is one thing, but keeping it off is a whole different battle.",
        ],
        jaTranslations: [
            '戻るのが怖い。',
            '一番怖いのは、やめた後に全部戻ること。',
            'ダイエットするたびに痩せてまた全部戻る。このヨーヨー現象もう嫌だ。',
            'そこが難しいんだよな。痩せるのはまだいいけど、維持するのは全然別の戦いだよ。',
        ],
        context: '「リバウンド」は和製英語。英語では gain the weight back か yo-yo dieting。bounce back は「回復する」で意味が違う。weight fluctuation=体重の変動。英語圏でも yo-yo effect は通じるけど、gain it back のほうが自然。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: 'カロリー気にしてるの？',
        english: [
            'Are you watching your calories?',
            'Wait, are you counting calories now? Since when?',
            'Are you seriously tracking your calories? You? The guy who eats two bowls of rice with every meal?',
            "Yeah, I downloaded this app. It's actually kinda eye-opening how many calories are in beer. Don't tell me the number.",
        ],
        jaTranslations: [
            'カロリー気にしてるの？',
            'え、カロリー計算してんの？いつから？',
            'マジでカロリー記録してんの？お前が？毎食ごはん2杯食う男が？',
            'うん、アプリ入れたんだ。ビールのカロリー見てビビった。数字は言わないで。',
        ],
        context: 'watch your calories は「カロリーに気をつける」。count calories=カロリーを計算する。track calories=カロリーを記録する。日本語の「カロリー気にする」は英語ではwatch(注意する)が一番カジュアルで自然。',
        character: 'yuki', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: '最近太った気がする',
        english: [
            'I think I gained weight.',
            'I feel like I have put on a few pounds recently.',
            'I do not know what happened but my clothes are getting tighter. I definitely gained weight.',
            "Join the club. I think everyone puts on a little weight in winter. Don't worry about it too much.",
        ],
        jaTranslations: [
            '太ったと思う。',
            '最近ちょっと太った気がするんだよね。',
            '何があったか分かんないけど服がキツくなってきた。絶対太った。',
            '仲間じゃん。冬はみんな太るって。あんま気にすんなよ。',
        ],
        context: 'gain weight=太る、lose weight=痩せる、put on weight=太る（イギリス寄り）。日本語の「太った」はgot fatだけど、これは超失礼。I gained a little weight、put on a few pounds と控えめに言うのが英語のマナー。',
        character: 'master', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: 'お菓子がやめられない',
        english: [
            'I cannot stop eating snacks.',
            'I have a serious snacking problem. I just cannot stop.',
            'I know I should stop eating snacks but every time I try, I last about two hours before I cave.',
            "Same here. Have you tried just not buying them? If they're not in the house, you can't eat 'em. Kinda works for me.",
        ],
        jaTranslations: [
            'お菓子が止められない。',
            '間食がマジでヤバい。止まんないんだよ。',
            'お菓子やめなきゃって分かってるけど、やめようとしても2時間で負ける。',
            '分かる。買わないようにしてみた？家になければ食えないし。俺はそれでなんとかなってる。',
        ],
        context: 'snacking は「おやつを食べること」。munchies=何か食べたい欲求。sweet tooth=甘いもの好き。cave(in)=負けて食べちゃう。日本語の「間食」は英語ではsnacking。snack attack=急にお菓子が食べたくなること。',
        character: 'mina', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: 'チートデイにしよう',
        english: [
            'Let us have a cheat day.',
            'Today is my cheat day. I can eat whatever I want.',
            'I have been so good all week. I deserve a cheat day. Someone order the fried chicken.',
            "You've earned it! One cheat day won't kill your progress. I'll split the karaage with you.",
        ],
        jaTranslations: [
            'チートデイにしよう。',
            '今日はチートデイ。好きなもん食っていい日。',
            '今週ずっと頑張ったんだ。チートデイくらいいいだろ。誰か唐揚げ頼んで。',
            '頑張ったじゃん！チートデイ1日で崩れないって。唐揚げ半分こしよう。',
        ],
        context: 'cheat day はダイエット用語で「食べていい日」。英語でもそのままcheat dayで通じる。cheat meal=一食だけ好きなものを食べる。日本語でも「チートデイ」は定着しているが、英語発の概念。indulge=好きなものを我慢しないで食べる。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: '痩せた？なんかスッキリしたね',
        english: [
            'Did you lose weight? You look good.',
            'Have you lost weight? Something about you looks different. In a good way.',
            'Wait, have you been working out or something? You look slimmer. Your face looks thinner too.',
            "Oh, thanks for noticing! Yeah, I dropped about three kilos. It's not much, but my jeans finally fit again.",
        ],
        jaTranslations: [
            '痩せた？いい感じじゃん。',
            '痩せた？なんか変わったよね。いい意味で。',
            'え、なんか運動してる？スリムになったし、顔もシュッとしたよね。',
            'お、気づいてくれた！うん、3キロくらい落とした。大したことないけど、ジーンズがやっと入るようになった。',
        ],
        context: '「痩せた？」は英語圏では注意が必要。体重の話は超デリケート。You look great!は安全。Have you lost weight?は相手次第で失礼になることも。You look different は無難。日本語では褒め言葉でも英語圏では body shaming になりかねない。',
        character: 'yuki', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: '食べ過ぎた...',
        english: [
            'I ate too much.',
            'I totally overate. I feel so full I might explode.',
            'I cannot believe I ate all of that. I am so stuffed I can barely move.',
            "I mean, I tried to warn you after the second plate. You wanna walk it off? A little stroll might help.",
        ],
        jaTranslations: [
            '食べ過ぎた。',
            '完全に食い過ぎた。腹パンで破裂しそう。',
            'よくあんだけ食ったな自分。満腹すぎて動けない。',
            '2皿目のとき止めようとしたじゃん。歩いて消化する？ちょっと散歩したら楽になるかもよ。',
        ],
        context: 'stuffed は「お腹パンパン」のカジュアル表現。full は普通の「お腹いっぱい」。bloated=膨れた(不快感あり)。food coma=食べ過ぎて眠くなること。日本語の「食べ過ぎた」は反省込みだけど、英語のI ate too muchは事実報告に近い。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 130, japanese: '体重計乗りたくない',
        english: [
            'I do not want to weigh myself.',
            'I refuse to step on a scale right now. Ignorance is bliss.',
            'Do not even mention the scale. I am in denial and I am perfectly happy staying here.',
            "Honestly, the number doesn't matter that much. If your clothes fit better and you feel good, that's what counts.",
        ],
        jaTranslations: [
            '体重計に乗りたくない。',
            '今は絶対体重計に乗らない。知らぬが仏。',
            '体重計の話すんな。現実逃避中だけど幸せだからいいの。',
            '正直、数字はそんな大事じゃないよ。服がいい感じで体調いいなら、それでいいんだよ。',
        ],
        context: 'scale は「体重計」。step on a scale=体重計に乗る。weigh yourself=体重を測る。日本語の「体重計」は英語ではscale一語。bathroom scale=家庭用体重計。ignorance is bliss=知らぬが仏。',
        character: 'lisa', category: 'social', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 131: 運動習慣 (Exercise Habits)
    // Scene: マスターがジム通いを始めたと告白。常連たちの運動事情トーク
    // ────────────────────────────────────────────────────

    {
        daySlot: 131, japanese: 'ジム通い始めた',
        english: [
            'I joined a gym.',
            'I finally signed up for a gym membership. About time, right?',
            'So I actually joined a gym last week. First time in my life. I have no idea what I am doing.',
            "No way, Master! That's awesome. Did they show you around? Those machines can be pretty confusing at first.",
        ],
        jaTranslations: [
            'ジムに入会した。',
            'ついにジムの会員になった。そろそろだよな。',
            '先週マジでジム入会したんだ。人生初。何していいか全然分かんない。',
            'え、マスターが！？すげえ。案内してもらった？最初はマシンの使い方分かんないよな。',
        ],
        context: 'join a gym は「ジムに入会する」。sign up for=登録する。gym membership=ジムの会員権。日本語では「ジムに通い始めた」だけど、英語ではjoin(入会する行為)とgo to the gym(通う行為)を分ける。',
        character: 'master', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: '筋トレしてる？',
        english: [
            'Do you work out?',
            'Do you lift weights? You look like you have been working out.',
            'Are you into weight training? I have been thinking about starting but I do not know where to begin.',
            "A little bit, yeah. Mostly just dumbbells and push-ups at home. Nothing crazy, but it adds up.",
        ],
        jaTranslations: [
            '筋トレしてる？',
            'ウエイトやってる？なんか鍛えてる感じするけど。',
            'ウエイトトレーニングとかやってる？始めたいんだけど何からやればいいか分かんなくて。',
            'ちょっとだけな。家でダンベルと腕立てくらい。大したことないけど、積み重ねだよ。',
        ],
        context: 'work out は「運動する・トレーニングする」。lift weights=ウエイトを上げる。hit the gym=ジムに行く(スラング)。日本語の「筋トレ」はweight training だけど、カジュアルにはlift(ing)だけでも通じる。',
        character: 'yuki', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: '走るの苦手',
        english: [
            'I am not a runner.',
            'Running is not my thing. I get out of breath way too fast.',
            'I tried running last week and I lasted about three minutes before I thought I was going to die.',
            "Then don't run! Swimming's way easier on your knees, and you still get a solid workout.",
        ],
        jaTranslations: [
            '走るの向いてない。',
            '走るの苦手なんだよね。すぐ息切れする。',
            '先週走ってみたけど3分で死ぬかと思った。',
            'なら走らなくていいじゃん！水泳のが膝に優しいし、ちゃんと運動になるよ。',
        ],
        context: 'not my thing は「自分には合わない」「苦手」。日本語の「苦手」は英語ではnot good at(下手)、not my thing(好みじゃない)、I cannot stand(大嫌い)で使い分ける。out of breath=息切れ。cardio=有酸素運動。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: '毎朝ストレッチしてる',
        english: [
            'I stretch every morning.',
            'I do a quick stretching routine every morning. It really helps.',
            'The first thing I do when I wake up is stretch for about ten minutes. It makes a huge difference.',
            "Ten minutes? That's it? Maybe I should try that. My back's been killing me every morning lately.",
        ],
        jaTranslations: [
            '毎朝ストレッチしてる。',
            '毎朝ちょっとだけストレッチしてるんだ。結構いいよ。',
            '起きたらまずストレッチ10分。これだけで全然違う。',
            '10分？それだけ？俺もやろうかな。最近毎朝腰が痛くて。',
        ],
        context: 'stretch は「ストレッチする」。stretching routine=ストレッチの習慣。warm up=ウォームアップ。cool down=クールダウン。日本語の「ストレッチ」はそのまま通じるけど、英語ではflexibility(柔軟性)と結びつけて話すことが多い。',
        character: 'lisa', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: '筋肉痛がヤバい',
        english: [
            'I am so sore.',
            'My muscles are killing me. I can barely walk.',
            'I overdid it at the gym yesterday and now I cannot go up stairs without crying.',
            "That means it's working though! Take a hot bath tonight, it'll loosen everything up.",
        ],
        jaTranslations: [
            'めっちゃ筋肉痛。',
            '筋肉痛で死にそう。まともに歩けない。',
            '昨日ジムで張り切りすぎて、階段上がるたびに泣きそうになる。',
            'それ効いてる証拠じゃん！今夜お風呂ゆっくり入れ。ほぐれるから。',
        ],
        context: 'sore は「筋肉痛の」。日本語の「筋肉痛」は英語では muscle soreness。DOMS(Delayed Onset Muscle Soreness)は翌日以降に来る筋肉痛の正式名称。be sore は「痛い」全般にも使えるけど、運動後の文脈では筋肉痛の意味になる。',
        character: 'master', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: '最近サボってる',
        english: [
            'I have been slacking off.',
            'I have not been to the gym in weeks. I keep making excuses.',
            'I was doing so well for a while but lately I have been skipping workouts left and right.',
            "The hardest part is just showing up. Go once, even for twenty minutes, and you'll get back into it.",
        ],
        jaTranslations: [
            '最近サボってる。',
            'もう何週間もジム行ってない。言い訳ばっかしてる。',
            'しばらく頑張ってたのに、最近トレーニング片っ端からサボってる。',
            '一番難しいのは行くことだよ。1回でいいから行ってみ、20分でも。戻れるから。',
        ],
        context: 'slack off は「サボる」。skip=休む(一回)。fall off the wagon=続けていたことをやめちゃう。日本語の「サボる」はフランス語のsabotage由来だけど、英語のslack offはもっとゆるい「怠ける」のニュアンス。',
        character: 'mina', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: '歩くだけでも違うよ',
        english: [
            'Even walking helps.',
            'You do not have to run. Just walking makes a difference.',
            'Seriously, even a thirty-minute walk every day can do wonders for your health.',
            "You're right. I started taking the stairs at work and honestly I already feel a little better.",
        ],
        jaTranslations: [
            '歩くだけでも違うよ。',
            '走らなくていいから。歩くだけでも全然違う。',
            'マジで毎日30分歩くだけでもすごい効果あるんだって。',
            'それな。会社で階段使うようにしたら、もうちょっと楽になった気がする。',
        ],
        context: 'make a difference は「効果がある」。do wonders=すごい効果がある。日本語の「歩くだけでも違う」はmake a differenceが完璧な訳。gym rat=ジム通いの人。couch potato=運動しない人。10,000 steps は英語圏でも健康の基準。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: 'ヨガやってみたい',
        english: [
            'I want to try yoga.',
            'I have been thinking about trying yoga. Is it hard?',
            'Everyone keeps telling me to try yoga. They say it is great for stress and flexibility.',
            "You should! There's a beginner class near the station. I'll send you the link. It's super chill, no pressure.",
        ],
        jaTranslations: [
            'ヨガやってみたい。',
            'ヨガ気になってるんだよね。難しい？',
            'みんなにヨガいいよって言われるんだけど、ストレスにも柔軟性にもいいらしい。',
            'やってみなよ！駅の近くに初心者クラスあるよ。リンク送る。ゆるい感じだから大丈夫。',
        ],
        context: 'try yoga は「ヨガを試す」。get into yoga=ヨガにハマる。flexible=体が柔らかい。stiff=体が硬い。日本語の「体硬い」は英語ではI am not flexible。inflexible よりnot flexibleの方がカジュアルで自然。',
        character: 'yuki', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: '体力落ちたな...',
        english: [
            'I am out of shape.',
            'I am so out of shape. I used to be able to run without dying.',
            'Man, when did I get this out of shape? I used to play soccer every weekend in my twenties.',
            "It comes back faster than you think though. Just start small and be consistent. You'll see a difference in a couple weeks.",
        ],
        jaTranslations: [
            '体力落ちたな。',
            'マジで体力落ちた。昔は走っても死ななかったのに。',
            'いつからこんな体力なくなったんだ。20代の頃は毎週サッカーしてたのに。',
            '思ったより早く戻るって。小さく始めて続ければ、2週間で変わるよ。',
        ],
        context: 'out of shape は「体力が落ちた・体型が崩れた」。in shape=健康的。get in shape=体を鍛える。stamina=スタミナ。get winded=息が切れる。日本語の「体力落ちた」は直訳しにくいけど、out of shapeが一番近い。',
        character: 'kenji', category: 'social', month: '2026-08',
    },
    {
        daySlot: 131, japanese: '一緒にジム行かない？',
        english: [
            'Want to go to the gym with me?',
            'Hey, do you want to be my gym buddy? I need someone to go with.',
            'I always quit when I go alone. Would you be down to go together? We can motivate each other.',
            "Sure, I'm down. I've been wanting to go but I keep chickening out. Having a buddy would definitely help.",
        ],
        jaTranslations: [
            '一緒にジム行かない？',
            'ジム仲間にならない？一人だと続かなくて。',
            '一人だといつもやめちゃうんだよね。一緒に行ってくれない？お互い励まし合おうよ。',
            'いいよ。俺も行きたかったけどビビって行けなかった。誰かいると絶対続くよな。',
        ],
        context: 'gym buddy は「一緒にジムに行く人」。workout partner=トレーニング仲間。be down to=〜する気がある(カジュアル)。accountability partner=サボらないように見張り合う相手。英語圏ではbuddy systemでモチベーションを保つ文化がある。',
        character: 'takeshi', category: 'social', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 132: 睡眠 (Sleep Talk)
    // Scene: みんなが睡眠の質について語り始める。現代人の永遠の悩み
    // ────────────────────────────────────────────────────

    {
        daySlot: 132, japanese: '全然寝れなかった',
        english: [
            'I could not sleep at all.',
            'I barely slept last night. Maybe two hours at most.',
            'I was up all night tossing and turning. I do not know what is wrong with me.',
            "Ugh, that's the worst. Have you tried putting your phone away earlier? That helped me a ton.",
        ],
        jaTranslations: [
            '全然寝れなかった。',
            '昨日ほぼ寝てない。多くて2時間くらい。',
            '一晩中ゴロゴロ寝返り打ってた。自分でも何が悪いのか分かんない。',
            'うわ、それ最悪だよな。寝る前にスマホ離してみた？俺はそれでだいぶ変わった。',
        ],
        context: 'tossing and turning は「寝返りを繰り返す」。直訳は「投げて回って」だけど、眠れない夜の定番表現。doze off=うとうとする。insomnia=不眠症。日本語の「寝れなかった」は英語ではcould not sleep、could not fall asleepの両方OK。',
        character: 'kenji', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: '寝坊した！',
        english: [
            'I overslept!',
            'I overslept this morning. My alarm did not go off.',
            'I cannot believe I overslept. I set three alarms and somehow slept through all of them.',
            "It happens. At least you made it. Grab some coffee and we'll pretend you were on time.",
        ],
        jaTranslations: [
            '寝坊した！',
            '今朝寝坊した。アラーム鳴んなかったんだよ。',
            '寝坊したの信じらんない。アラーム3つセットしたのに全部寝過ごした。',
            'あるある。でも間に合ったんだからいいじゃん。コーヒー飲んで、来てなかったことにしとくから。',
        ],
        context: 'oversleep は「寝過ごす」。sleep through the alarm=アラームに気づかず寝続ける。hit snooze=スヌーズを押す。sleep in=ゆっくり寝る（意図的）。oversleepは「事故」、sleep inは「幸せ」。この違いが日本語にはない。',
        character: 'mina', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: 'いびきがうるさいって言われた',
        english: [
            'I was told I snore.',
            'My wife says I snore really loud. I do not believe her.',
            'Apparently I snore like a freight train. My partner recorded me and it is honestly terrifying.',
            "You might wanna get that checked. My uncle had the same thing and it turned out to be sleep apnea.",
        ],
        jaTranslations: [
            'いびきかくって言われた。',
            '嫁にいびきうるさいって言われた。信じてないけど。',
            'いびきが貨物列車レベルらしい。嫁に録音されて聞いたら自分でもビビった。',
            'それ一回診てもらった方がいいかも。うちのおじさん同じ症状で睡眠時無呼吸症候群だった。',
        ],
        context: 'snore は「いびきをかく」。日本語では「いびき」は名詞だけど、英語では snore が動詞としても使える。sleep apnea=睡眠時無呼吸症候群。heavy snorer=いびきがひどい人。snoring problem は英語圏でも夫婦喧嘩の原因トップクラス。',
        character: 'master', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: 'スマホ見ちゃって寝れない',
        english: [
            'My phone keeps me up.',
            'I stay up way too late scrolling through my phone.',
            'I know I should put my phone down before bed but I always end up scrolling for hours.',
            "Try charging your phone in another room. It sounds extreme, but if it's not next to your bed, you can't scroll.",
        ],
        jaTranslations: [
            'スマホのせいで寝れない。',
            '寝る前にスマホいじりすぎて夜更かしする。',
            'スマホ置かなきゃって分かってるのに、毎晩何時間もスクロールしちゃう。',
            'スマホを別の部屋で充電してみ。極端だけど、ベッドの横にないとイジれないから。',
        ],
        context: 'doom scrolling は「目的もなくスマホをスクロールし続ける」こと。2020年頃から定着した新語。screen time=スクリーンを見ている時間。blue light=ブルーライト。put down your phone=スマホを置く。英語圏でも同じ問題が社会問題化している。',
        character: 'yuki', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: '昼寝したい',
        english: [
            'I want to take a nap.',
            'I could really use a nap right now. Even twenty minutes would help.',
            'I am fighting to keep my eyes open. If I do not nap soon I am going to pass out at my desk.',
            "Just do it. Find a quiet spot and set a timer for twenty minutes. You'll feel like a new person after.",
        ],
        jaTranslations: [
            '昼寝したい。',
            'マジで昼寝したい。20分でもいいから。',
            '目を開けてるのがもう限界。今すぐ寝ないとデスクで気絶する。',
            'もう寝ちゃえよ。静かなとこ見つけて20分タイマーかけろ。起きたら別人だから。',
        ],
        context: 'power nap は「短い昼寝」。15-20分が理想的とされる。cat nap=ちょっとうとうとする。siesta はスペイン語由来の昼寝。日本語の「昼寝」は英語では nap が最も自然。afternoon nap と言わなくても nap だけでOK。',
        character: 'takeshi', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: '夜型なんだよね',
        english: [
            'I am a night owl.',
            'I have always been a night person. I do my best work after midnight.',
            'I cannot function before noon but once the sun goes down I am suddenly full of energy.',
            "I'm the total opposite. I'm useless after ten p.m. but I get so much done at five a.m. Funny how different people are wired.",
        ],
        jaTranslations: [
            '夜型なんだよね。',
            'ずっと夜型で、深夜過ぎてからが一番調子いい。',
            '昼前はまともに動けないけど、日が沈むと急にエネルギー湧いてくるんだよね。',
            '俺は真逆。夜10時過ぎたら使い物にならないけど、朝5時はめっちゃ捗る。人って面白いよな。',
        ],
        context: 'night owl は「夜型の人」。early bird=朝型の人。morning person=朝型。The early bird gets the worm=早起きは三文の得。日本語の「夜型」は英語では night owl か night person。chronotype=体内時計のタイプ（科学用語）。',
        character: 'lisa', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: '最近よく夢を見る',
        english: [
            'I have been dreaming a lot.',
            'I keep having weird dreams lately. Every single night.',
            'My dreams have been so vivid recently. I wake up exhausted because it feels like I lived another life.',
            "Weird dreams usually mean you're stressed. Are you sleeping enough? Maybe your brain's just processing a lot right now.",
        ],
        jaTranslations: [
            '最近よく夢を見る。',
            '最近毎晩変な夢見るんだよね。',
            '最近の夢がやたらリアルで、起きた時にもう一つの人生生きたみたいに疲れてる。',
            '変な夢ってストレスのサインらしいよ。ちゃんと寝れてる？脳が色々処理してるのかも。',
        ],
        context: 'vivid dream は「鮮明な夢」。nightmare=悪夢。lucid dream=明晰夢（夢の中で夢と気づいている）。daydream=空想。日本語の「夢を見る」は英語では have a dream か dream。see a dream は日本語英語で、英語ではhaveを使う。',
        character: 'mina', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: '目覚ましが鳴らなかった',
        english: [
            'My alarm did not go off.',
            'I swear I set my alarm but it never went off.',
            'My alarm completely failed me this morning. Either that or I turned it off in my sleep.',
            "Put your phone across the room so you actually have to get up to turn it off. Works every time.",
        ],
        jaTranslations: [
            '目覚まし鳴らなかった。',
            '絶対セットしたのに目覚まし鳴らなかったんだけど。',
            '今朝目覚まし完全に裏切られた。セットし忘れたか寝ぼけて消したか。',
            'スマホを部屋の向こうに置いて、起き上がらないと消せないようにしろ。毎回これで起きれるから。',
        ],
        context: 'go off は「鳴る」（アラーム）。ring はどちらかというと電話。set an alarm=アラームをセットする。hit snooze=スヌーズを押す。snooze button=スヌーズボタン。日本語の「鳴る」は英語ではgo offが自然。ringだとやや古い。',
        character: 'kenji', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: '寝る前にストレッチすると違う',
        english: [
            'Stretching before bed helps.',
            'I started stretching before bed and I fall asleep so much faster now.',
            'Try doing a light stretch before bed. It sounds silly but it genuinely improved my sleep quality.',
            "I've heard that before but never tried it. What kind of stretches do you do? Like yoga stuff?",
        ],
        jaTranslations: [
            '寝る前のストレッチ、効くよ。',
            '寝る前にストレッチ始めたら、寝つき全然違うんだよね。',
            '寝る前の軽いストレッチ試してみ。バカにしてたけどマジで睡眠の質変わったから。',
            '聞いたことはあるけど試したことない。どんなストレッチ？ヨガ的なやつ？',
        ],
        context: 'sleep quality は「睡眠の質」。bedtime routine=寝る前のルーティン。wind down=リラックスして寝る準備をする。日本語の「寝つきが良くなった」はI fall asleep faster now。sleep hygiene=睡眠衛生（良い睡眠のための習慣）は最近の流行語。',
        character: 'lisa', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 132, japanese: '週末は寝だめする',
        english: [
            'I sleep in on weekends.',
            'I always sleep in on weekends. It is the only time I can catch up on sleep.',
            'Saturdays are my recovery day. I sleep until noon and I refuse to feel guilty about it.',
            "They say you can't actually catch up on sleep though. But honestly, I do the same thing. Saturday mornings are sacred.",
        ],
        jaTranslations: [
            '週末は寝だめする。',
            '週末はいつも昼まで寝てる。唯一寝だめできる時間だから。',
            '土曜は回復日。昼まで寝て、罪悪感はゼロ。',
            '寝だめって実は意味ないらしいけどな。でも俺もやってる。土曜の朝は聖域だよ。',
        ],
        context: 'sleep in は「朝ゆっくり寝る（意図的）」。catch up on sleep=寝だめ。sleep debt=睡眠負債。科学的には寝だめは効果がないと言われているが、英語でもcatch up on sleepは普通に使う。日本語の「寝だめ」はsleep in が一番近い。',
        character: 'master', category: 'feeling', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 133: ストレス (Stress)
    // Scene: 仕事と生活のストレスについて本音トーク。マスターが優しく聞く夜
    // ────────────────────────────────────────────────────

    {
        daySlot: 133, japanese: 'ストレスやばい',
        english: [
            'I am so stressed.',
            'My stress level is through the roof right now.',
            'I am completely stressed out. Work, life, everything is piling up at the same time.',
            "That sounds rough. Wanna talk about it? Sometimes just saying it out loud helps take the edge off.",
        ],
        jaTranslations: [
            'めっちゃストレス溜まってる。',
            'ストレスが天井突き破ってる。',
            '完全にストレスでやられてる。仕事も生活も全部同時に押し寄せてきてる。',
            'キツそうだな。話す？口に出すだけでちょっと楽になることもあるから。',
        ],
        context: 'stressed out は「ストレスでやられている」。through the roof=限界突破。overwhelmed=圧倒されている。burnt out=燃え尽きた。日本語の「ストレスやばい」は英語ではstressed out が一番カジュアルで近い。',
        character: 'yuki', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: '息抜きが必要',
        english: [
            'I need a break.',
            'I seriously need to take a break and just breathe.',
            'If I do not get some time off soon I am going to lose it. I need to recharge.',
            "When's the last time you took a real vacation? Even a three-day weekend somewhere would do you good.",
        ],
        jaTranslations: [
            '休憩が必要。',
            'マジで一回休まないとダメだ。一息つかせて。',
            'もうすぐ休み取らないとマジで壊れる。充電しないと。',
            '最後にちゃんと休んだのいつ？3連休でもどっか行ったら全然違うよ。',
        ],
        context: 'take a break は「休憩する」。recharge は「充電する」で、人間にも使う。decompress=リラックスする(圧力を抜く)。unwind=くつろぐ。日本語の「息抜き」は直訳できないけど、breather が一番近い。I need a breather。',
        character: 'kenji', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: '愚痴聞いてくれる？',
        english: [
            'Can I vent for a minute?',
            'Do you mind if I vent? I just need to get this off my chest.',
            'I know nobody wants to hear someone complain but I really need to vent. Just for five minutes.',
            "Of course. Go for it, I'm all ears. No judgment, no advice, just listening. Let it out.",
        ],
        jaTranslations: [
            'ちょっと愚痴っていい？',
            '愚痴言ってもいい？ちょっと吐き出したくて。',
            '愚痴なんか聞きたくないよな、分かってる。でも5分だけ吐かせて。',
            'もちろん。全部聞くよ。ジャッジもアドバイスもなし、ただ聞くから。吐き出せ。',
        ],
        context: 'vent は「愚痴を言う・不満を吐き出す」。get it off my chest=胸のつかえを取る。bottled up=溜め込んでいる。日本語の「愚痴」は英語ではvent、complain、gripeなど。ventは「吐き出す」で最もカジュアルで前向き。',
        character: 'mina', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: '考えすぎちゃう',
        english: [
            'I overthink everything.',
            'I know I overthink things but I cannot help it.',
            'My problem is I analyze everything to death. I cannot just let things go.',
            "I do the same thing. Writing stuff down before bed helps me let go of it. Gets it outta your head, at least.",
        ],
        jaTranslations: [
            '考えすぎちゃう。',
            '考えすぎるって分かってるけど、止められない。',
            '俺の問題は何でも分析しすぎること。流せないんだよ。',
            '俺もそう。寝る前に紙に書き出すと楽になるよ。頭の中から出すだけでも違う。',
        ],
        context: 'overthink は「考えすぎる」。overanalyze=分析しすぎる。spiral=思考がぐるぐるする。ruminate=反芻する（心理学用語）。日本語の「考えすぎ」は英語ではoverthinkingが定着している。get in your own head=自分で自分を追い込む。',
        character: 'yuki', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: '気分転換に何かしたい',
        english: [
            'I need to do something to clear my head.',
            'I want to do something fun to take my mind off things.',
            'I need a change of pace. Something to break this cycle of work, eat, sleep, repeat.',
            "How about we all go hiking this weekend? Fresh air and a change of scenery might be exactly what you need.",
        ],
        jaTranslations: [
            '気分転換に何かしたい。',
            '楽しいことして嫌なこと忘れたい。',
            '気分変えたいんだよ。仕事、飯、寝るの無限ループから抜け出したい。',
            '今週末みんなでハイキング行かない？新鮮な空気と景色変わるだけで全然違うよ。',
        ],
        context: 'change of pace は「気分転換」。take my mind off things=嫌なことを忘れる。shake things up=変化をつける。日本語の「気分転換」は英語で一語では表現できない。change of pace、change of scenery(場所を変える)、switch it up(やり方を変える)を使い分ける。',
        character: 'takeshi', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: '仕事辞めたい...',
        english: [
            'I want to quit my job.',
            'Honestly? I have been thinking about quitting. I am that fed up.',
            'I fantasize about quitting at least three times a day. The only thing stopping me is rent.',
            "Have you thought about just looking around? Even having options makes you feel less trapped. Doesn't mean you have to actually quit.",
        ],
        jaTranslations: [
            '仕事辞めたい。',
            '正直？辞めようかなって考えてる。もう限界。',
            '1日3回は辞める妄想してる。止めてるのは家賃だけ。',
            'とりあえず他を見てみたら？選択肢があるだけで追い詰められた感じ減るよ。辞めなくてもいいし。',
        ],
        context: 'quit my job は「仕事を辞める」。resign はフォーマル。hand in my notice=辞表を出す。fed up=もう限界。burn out=燃え尽きる。日本語の「辞めたい」は願望だけど、英語のI want to quitはかなり強い意思表示に聞こえる。',
        character: 'mina', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: '深呼吸して',
        english: [
            'Take a deep breath.',
            'Hey, just take a deep breath. It is going to be okay.',
            'Hold on. Stop for a second. Take a deep breath in and slowly let it out. Better?',
            "Okay, okay. You're right. That actually helps. I forget to just stop and breathe sometimes.",
        ],
        jaTranslations: [
            '深呼吸して。',
            'ほら、深呼吸して。大丈夫だから。',
            'ちょっと待って。一回止まれ。大きく吸って、ゆっくり吐いて。ほら、マシになった？',
            'うん...そうだな。実際ちょっと楽になった。止まって呼吸するの忘れるんだよな。',
        ],
        context: 'Take a deep breath は「深呼吸して」。breathe=呼吸する。calm down は場合によっては逆効果（「落ち着けって言われると余計イラつく」問題）。英語圏ではtake a deep breathの方がcalm downより寄り添い感がある。',
        character: 'master', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: '最近イライラしやすい',
        english: [
            'I have been irritable lately.',
            'I keep snapping at people for no reason. I think I need help.',
            'I have been so on edge lately. The smallest things set me off and I feel bad about it.',
            "That's usually a sign you're running on empty. When's the last time you did something nice just for yourself?",
        ],
        jaTranslations: [
            '最近イライラしやすい。',
            '意味もなく人に当たっちゃう。助けが必要かも。',
            '最近ずっとピリピリしてて、些細なことでキレちゃう。自分でも申し訳ないと思う。',
            'それ、電池切れのサインだよ。最後に自分のために何かしたのいつ？',
        ],
        context: 'irritable は「イライラしやすい」。on edge=神経が張り詰めている。snap at=八つ当たりする。short-tempered=短気。日本語の「イライラ」は擬態語で英語にはない。frustrated、annoyed、irritated で使い分けるけど、どれも「イライラ」の一部しかカバーしない。',
        character: 'lisa', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: '趣味の時間がない',
        english: [
            'I have no time for hobbies.',
            'I used to have hobbies but now I literally have no time for anything.',
            'When is the last time I did something just for fun? I cannot even remember. That is depressing.',
            "You gotta schedule it like a meeting. Block out an hour, put it on your calendar, and guard it. Otherwise it never happens.",
        ],
        jaTranslations: [
            '趣味の時間がない。',
            '昔は趣味あったのに、今はマジで何もする時間ない。',
            '最後に楽しいことしたのいつだっけ？思い出せない。それって結構ヤバいよな。',
            '予定みたいにブロックしろ。1時間カレンダーに入れて死守。じゃないと一生やらないから。',
        ],
        context: 'hobby は「趣味」だけど、英語のhobbyはやや堅い。what do you do for fun?=趣味は何？のカジュアル版。pastime=暇つぶし。side project=副業的な趣味。日本語の「趣味」ほど気軽に使える一語が英語にはない。',
        character: 'kenji', category: 'feeling', month: '2026-08',
    },
    {
        daySlot: 133, japanese: 'もう限界かも',
        english: [
            'I think I have reached my limit.',
            'I am at my breaking point. I cannot take much more of this.',
            'Something has to change because I am hitting a wall and I do not know how much longer I can keep going.',
            "Hey, it's okay to ask for help. Seriously. You don't have to do everything on your own. We're here for you.",
        ],
        jaTranslations: [
            'もう限界かもしれない。',
            '限界点だよ。もうこれ以上無理。',
            '何か変えないとダメだ。壁にぶち当たってて、あとどれくらい持つか分かんない。',
            'なあ、助け求めていいんだぞ。マジで。全部一人でやらなくていいから。俺たちいるし。',
        ],
        context: 'breaking point は「限界点」。at my limit=限界。hit a wall=壁にぶつかる。burn out=燃え尽きる。日本語の「限界」は英語ではbreaking point が最もドラマチック。reach my limit はそのまま通じるが、hit a wall の方が自然に使われる。',
        character: 'yuki', category: 'feeling', month: '2026-08',
    },

    // ────────────────────────────────────────────────────
    // DAY 134: 美容 (Beauty and Skincare)
    // Scene: ミナが新しいスキンケアの話を始める。リサも参戦して美容トーク
    // ────────────────────────────────────────────────────

    {
        daySlot: 134, japanese: '肌荒れがひどい',
        english: [
            'My skin is breaking out.',
            'My skin has been so bad lately. I keep getting breakouts.',
            'I do not know what happened but my skin just freaked out. I have breakouts everywhere.',
            "Could be stress-related. My skin always freaks out when I'm not sleeping well. Maybe try keeping it simple for a few days.",
        ],
        jaTranslations: [
            '肌が荒れてる。',
            '最近ずっと肌の調子悪くて。吹き出物止まんない。',
            '何があったか分かんないけど肌が大暴れ。あちこちに吹き出物できてる。',
            'ストレスかもね。寝不足だと俺も肌荒れる。数日シンプルなケアに戻してみたら？',
        ],
        context: 'break out は「肌荒れする・吹き出物ができる」。breakout=吹き出物。acne=ニキビ（医学用語）。pimple=ニキビ（日常語）。日本語の「肌荒れ」は英語ではbreaking outが最もカジュアル。skin issues は肌トラブル全般。',
        character: 'mina', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: '日焼け止め塗った？',
        english: [
            'Did you put on sunscreen?',
            'Are you wearing sunscreen? The sun is really strong today.',
            'Please tell me you are wearing sunscreen. UV damage is no joke, even on cloudy days.',
            "Oh shoot, I totally forgot. I always skip it when it's cloudy but I know I shouldn't. Got any extra?",
        ],
        jaTranslations: [
            '日焼け止め塗った？',
            '日焼け止め塗ってる？今日めっちゃ日差し強いよ。',
            '日焼け止め塗ってるよね？紫外線ナメたらダメだよ、曇りの日でも。',
            'やば、完全に忘れてた。曇りだとつい塗らないんだよね。予備ある？',
        ],
        context: 'sunscreen=日焼け止め。SPF=Sun Protection Factor。日本語の「日焼け止め」はsunscreen、sunblock どちらでもOK。apply sunscreen=塗る。reapply=塗り直す。日本は美白文化だけど、英語圏では日焼け止めは「健康のため」という位置づけ。',
        character: 'lisa', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: 'スキンケアのルーティン教えて',
        english: [
            'What is your skincare routine?',
            'Your skin looks amazing. What is your skincare routine?',
            'Okay, I need your entire skincare routine. Step by step. My skin needs help.',
            "Aw thanks! Honestly it's pretty simple. Cleanser, toner, moisturizer, sunscreen. That's basically it. Consistency is key.",
        ],
        jaTranslations: [
            'スキンケアのルーティンは？',
            '肌めっちゃ綺麗じゃん。スキンケア何してるの？',
            'スキンケアのルーティン全部教えて。ステップごとに。俺の肌が助けを求めてる。',
            'ありがとう！正直めっちゃシンプルだよ。洗顔、化粧水、乳液、日焼け止め。基本それだけ。続けるのが大事。',
        ],
        context: 'skincare routine は「スキンケアのルーティン」。英語でもroutineはそのまま使う。cleanser=洗顔料、toner=化粧水、moisturizer=乳液/保湿剤、serum=美容液。日本語の「化粧水」は英語ではtoner が近いが、概念が微妙に違う。',
        character: 'yuki', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: '髪切りたいな',
        english: [
            'I want to get a haircut.',
            'I need a haircut so bad. My hair is getting out of control.',
            'I have not had a haircut in three months and I am starting to look like a wild animal.',
            "Just bring a photo of what you want. It's so much easier than trying to explain it. That's what I always do.",
        ],
        jaTranslations: [
            '髪切りたいな。',
            'マジで髪切らなきゃ。収拾つかなくなってきた。',
            '3ヶ月切ってなくて、野生動物みたいになってきた。',
            '写真持ってけ。説明するより全然楽だから。俺はいつもそうしてる。',
        ],
        context: 'get a haircut は「髪を切ってもらう」。cut my hair は「自分で切る」にも聞こえるので注意。trim=少し整える、layer=段を入れる、bangs=前髪（アメリカ英語）、fringe=前髪（イギリス英語）。美容院=salon/hair salon。barber=床屋（主に男性向け）。',
        character: 'takeshi', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: 'この化粧水いいよ',
        english: [
            'This toner is really good.',
            'You should try this toner. It has been a game changer for my skin.',
            'I switched to this toner last month and my skin has never been better. It is worth every penny.',
            "Ooh, what brand is it? Send me the link. I've been looking for a new one 'cause mine's not doing anything.",
        ],
        jaTranslations: [
            'この化粧水いいよ。',
            'この化粧水試してみ。肌が劇的に変わった。',
            '先月この化粧水に変えたら、肌が今までで一番いい。値段の価値はある。',
            'え、何のブランド？リンク送って。今使ってるやつ全然効かないから新しいの探してたんだ。',
        ],
        context: 'toner は英語で「化粧水」に最も近い。ただし英語のtonerは「汚れを落とす」イメージが強く、日本語の「化粧水」の「潤す」ニュアンスとはズレがある。essence=美容液（韓国コスメ影響）。game changer=すごく良い（口語）。',
        character: 'mina', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: 'クマがひどい',
        english: [
            'I have dark circles.',
            'Look at these dark circles under my eyes. I look like a raccoon.',
            'My dark circles are so bad that people keep asking me if I am sick. I just need sleep.',
            "Have you tried that eye cream from the drugstore? The one in the blue tube. It actually works pretty well for dark circles.",
        ],
        jaTranslations: [
            '目のクマがひどい。',
            'このクマ見てよ。アライグマみたいになってる。',
            'クマがひどすぎて、会う人みんなに具合悪いのって聞かれる。ただの寝不足なのに。',
            'ドラッグストアのアイクリーム試した？青いチューブのやつ。クマに結構効くよ。',
        ],
        context: 'dark circles は「目のクマ」。bags under your eyes=目の下のたるみ。puffy eyes=腫れぼったい目。concealer=コンシーラー。日本語の「クマ」は動物の「熊」と同じ字だけど、英語ではdark circlesで全然違うイメージ。',
        character: 'kenji', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: '乾燥肌なんだよね',
        english: [
            'I have dry skin.',
            'My skin is so dry, especially in winter. It gets flaky and itchy.',
            'I have always had dry skin. I go through moisturizer like water. Nothing seems to keep it hydrated.',
            "Try putting on moisturizer right after you shower, while your skin's still damp. It locks in way more moisture that way.",
        ],
        jaTranslations: [
            '乾燥肌なんだよね。',
            '肌がめっちゃ乾燥するんだ。特に冬。カサカサで痒い。',
            'ずっと乾燥肌で、保湿剤を水みたいに使ってる。何塗っても潤わない。',
            'シャワー上がったらすぐ、肌が湿ってるうちに塗れ。保湿の閉じ込め方が全然違うから。',
        ],
        context: 'dry skin=乾燥肌。oily skin=脂性肌。combination skin=混合肌。sensitive skin=敏感肌。moisturize=保湿する。hydrate=水分を与える。日本語の「乾燥肌」は英語でdry skinでそのまま通じる。flaky=皮がめくれる。',
        character: 'lisa', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: 'ネイル変えたの気づいた？',
        english: [
            'Did you notice my new nails?',
            'Hey, did you notice I got my nails done? I love this color.',
            'Nobody has noticed my new nails all day and I am personally offended. Look! What do you think?',
            "Oh wow, those are cute! I love that color. Is that gel? It looks really nice on you.",
        ],
        jaTranslations: [
            '新しいネイル気づいた？',
            'ねえ、ネイル変えたの気づいた？この色めっちゃ好き。',
            '今日一日誰もネイルに気づいてくれなくて個人的に傷ついてるんだけど。見て！どう？',
            'えー、かわいい！その色好き。ジェル？すごく似合ってるよ。',
        ],
        context: 'get my nails done は「ネイルをしてもらう」。manicure=手のネイル、pedicure=足のネイル。nail salon=ネイルサロン。gel nails=ジェルネイル。日本語の「ネイル」はそのまま通じるけど、英語ではnails(爪)かnail art(ネイルアート)。',
        character: 'mina', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: 'エステ行きたい',
        english: [
            'I want to go to a spa.',
            'I could really use a spa day. A facial and a massage would be heaven.',
            'I have been so stressed lately. I think I deserve a full spa day. Facial, massage, the works.',
            "Let's go together! There's a new place in Omotesando that has a girls' day package. I'll book it.",
        ],
        jaTranslations: [
            'スパに行きたい。',
            'スパの日が欲しい。フェイシャルとマッサージしたら天国だろうな。',
            '最近ストレスヤバいから、スパで全部やってほしい。フェイシャル、マッサージ、全コース。',
            '一緒に行こうよ！表参道に新しいとこできて、レディースプランあるんだ。予約するね。',
        ],
        context: '日本語の「エステ」は和製英語。英語ではspa、beauty salon、aesthetic clinic で意味が分かれる。spa=リラクゼーション、beauty salon=美容施術、dermatologist=皮膚科。facial=フェイシャルエステ。pamper=甘やかす。the works=全部セット。',
        character: 'yuki', category: 'shopping', month: '2026-08',
    },
    {
        daySlot: 134, japanese: '最近白髪増えた',
        english: [
            'I am getting gray hairs.',
            'I keep finding gray hairs. I pulled out three this morning.',
            'I am officially getting gray hair and I am not sure how I feel about it. Should I dye it?',
            "Honestly, I think gray hair looks cool on you. Own it! The silver fox look is totally in right now.",
        ],
        jaTranslations: [
            '白髪が増えてきた。',
            '白髪見つけまくってる。今朝3本抜いた。',
            '正式に白髪が生えてきた。染めるべきか悩んでる。',
            '正直、白髪似合ってると思うけどな。堂々としてろよ。ロマンスグレーって今カッコいいんだから。',
        ],
        context: 'gray hair は「白髪」。go gray=白髪になる。dye your hair=髪を染める。silver fox=白髪がかっこいい男性。distinguished=品がある（白髪を褒める時に使う）。日本語の「白髪」は英語ではgray(灰色)。white hairとは普通言わない。',
        character: 'kenji', category: 'shopping', month: '2026-08',
    },
];

// ============================================================
// DAY THEMES -- MONTH 5 (2026-08) -- WEEK 18
// ============================================================

export const MONTH5_W18_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    128: {
        title: '体調が悪い', titleEn: 'Feeling Sick', category: 'feeling',
        scene: 'タケシが二日酔いで居酒屋に登場。みんなが体調の英語を教える夜。',
        keywords: [
            { en: 'fever', ja: '熱', pron: 'フィーヴァー', example: 'I think I have a fever.', note: '日本は摂氏(Celsius)だけどアメリカは華氏(Fahrenheit)。37度C=98.6度F。海外で熱を伝える時に単位を間違えると大変。' },
            { en: 'symptom', ja: '症状', pron: 'シンプトム', example: 'What are your symptoms?', note: '複数形symptomsで使うことが多い。sign=兆候（客観的）、symptom=症状（主観的）。医者に説明する時の必須単語。' },
            { en: 'medicine', ja: '薬', pron: 'メディスン', example: 'Did you take your medicine?', note: '薬を「飲む」はtake。drinkとは言わない。medication=処方薬（フォーマル）。over-the-counter=市販薬。' },
            { en: 'rest', ja: '休む', pron: 'レスト', example: 'You need to get some rest.', note: 'get some rest=ゆっくり休んで。take a rest はやや不自然。bed rest=安静にする。rest up=しっかり休む。' },
            { en: 'contagious', ja: 'うつる', pron: 'コンテイジャス', example: 'Is it contagious?', note: '感染する病気にはcontagious。infectious も同義だが医学用語寄り。日本語の「うつる」の一語で済む便利さは英語にはない。' },
        ],
    },
    129: {
        title: '病院で', titleEn: 'At the Doctor', category: 'request',
        scene: 'タケシが病院に行った報告。海外で病院に行く時の英語をみんなで練習。',
        keywords: [
            { en: 'appointment', ja: '予約（病院）', pron: 'アポイントメント', example: 'I need to make an appointment.', note: '病院=appointment、レストラン=reservation。この使い分けは日本語にない。walk-in=予約なし。same-day=当日予約。' },
            { en: 'prescription', ja: '処方箋', pron: 'プリスクリプション', example: 'The doctor wrote me a prescription.', note: 'fill a prescription=処方箋の薬をもらう。refill=おかわり処方。OTC(Over The Counter)=処方箋なしで買える薬。' },
            { en: 'insurance', ja: '保険', pron: 'インシュランス', example: 'Do you have health insurance?', note: 'health insurance=健康保険。日本は国民皆保険だけど、アメリカでは無保険の人も多い。copay=自己負担額。' },
            { en: 'diagnosis', ja: '診断', pron: 'ダイアグノシス', example: 'What is the diagnosis?', note: '複数形はdiagnoses。misdiagnosis=誤診。second opinion=セカンドオピニオン。日本語でも「セカンドオピニオン」は定着。' },
            { en: 'side effect', ja: '副作用', pron: 'サイドエフェクト', example: 'Are there any side effects?', note: '薬の副作用=side effect。adverse reaction=有害反応（重い副作用）。日本語の「副作用」と同じ概念で覚えやすい。' },
        ],
    },
    130: {
        title: 'ダイエット', titleEn: 'Diet Talk', category: 'social',
        scene: 'ケンジがダイエットを宣言。みんなが色々言う居酒屋の夜。',
        keywords: [
            { en: 'calorie', ja: 'カロリー', pron: 'キャラリー', example: 'How many calories is this?', note: '日本語の「カロリー」と発音が違う。英語は「キャラリー」。count calories=カロリーを数える。calorie deficit=カロリー不足（ダイエット用語）。' },
            { en: 'carb', ja: '炭水化物', pron: 'カーブ', example: 'I am cutting carbs.', note: 'carbohydrate の略。low-carb=低糖質。no-carb=糖質ゼロ。net carbs=正味糖質。日本語の「糖質制限」はcarb restriction。' },
            { en: 'weight', ja: '体重', pron: 'ウェイト', example: 'I need to lose weight.', note: 'gain weight=太る、lose weight=痩せる。weigh=体重を量る。body weight=体重。dead weight=重荷（比喩）。' },
            { en: 'portion', ja: '一人前の量', pron: 'ポーション', example: 'I need to control my portions.', note: 'portion control=量のコントロール。serving size=一食分。helping=盛り。second helping=おかわり。' },
            { en: 'metabolism', ja: '代謝', pron: 'メタバリズム', example: 'My metabolism is really slow.', note: 'boost your metabolism=代謝を上げる。basal metabolic rate=基礎代謝。日本語と概念は同じ。高い=fast、低い=slow。' },
        ],
    },
    131: {
        title: '運動習慣', titleEn: 'Exercise Habits', category: 'social',
        scene: 'マスターがジム通いを始めたと告白。常連たちの運動事情トーク。',
        keywords: [
            { en: 'workout', ja: 'トレーニング', pron: 'ワークアウト', example: 'I need a good workout.', note: 'work out(動詞)=運動する。workout(名詞)=運動・トレーニング。日本語の「トレーニング」よりworkoutの方がカジュアル。' },
            { en: 'cardio', ja: '有酸素運動', pron: 'カーディオ', example: 'I hate cardio but I need it.', note: 'cardiovascular exercise の略。running, cycling, swimming など。筋トレ=weight training/strength training。' },
            { en: 'sore', ja: '筋肉痛の', pron: 'ソアー', example: 'I am so sore today.', note: '筋肉痛=muscle soreness。sore throat=喉が痛い。sore は「痛い」全般に使えるけど運動後の文脈では筋肉痛の意味になる。' },
            { en: 'flexible', ja: '体が柔らかい', pron: 'フレキシブル', example: 'I am not flexible at all.', note: 'flexibility=柔軟性。stretch=ストレッチ。limber=しなやか。体が硬い=stiff, not flexible。' },
            { en: 'stamina', ja: 'スタミナ・体力', pron: 'スタミナ', example: 'I need to build my stamina.', note: '日本語の「スタミナ」とほぼ同じ。endurance=持久力（フォーマル）。build stamina=体力をつける。run out of stamina=スタミナ切れ。' },
        ],
    },
    132: {
        title: '睡眠', titleEn: 'Sleep Talk', category: 'feeling',
        scene: 'みんなが睡眠の質について語り始める。現代人の永遠の悩み。',
        keywords: [
            { en: 'insomnia', ja: '不眠症', pron: 'インソムニア', example: 'I think I have insomnia.', note: '医学的な不眠症。I cannot sleep は日常表現。insomnia は「病気としての不眠」。chronic insomnia=慢性不眠。' },
            { en: 'nap', ja: '昼寝', pron: 'ナップ', example: 'I need a quick nap.', note: 'power nap=短い昼寝(15-20分)。cat nap=ちょっとうとうと。take a nap=昼寝する。nap time=お昼寝の時間。' },
            { en: 'snore', ja: 'いびきをかく', pron: 'スノアー', example: 'My partner snores really loud.', note: '動詞も名詞もsnore。heavy snorer=いびきがひどい人。sleep apnea=睡眠時無呼吸症候群。いびきの擬音は英語ではZzz。' },
            { en: 'alarm', ja: 'アラーム・目覚まし', pron: 'アラーム', example: 'I slept through my alarm.', note: 'go off=鳴る（アラームはgo off）。set an alarm=セットする。hit snooze=スヌーズを押す。sleep through=気づかず寝続ける。' },
            { en: 'drowsy', ja: '眠い・うとうと', pron: 'ドラウジー', example: 'This medicine makes me drowsy.', note: 'sleepy より「眠気でぼんやり」のニュアンス。薬の副作用で眠くなる時によく使う。groggy=寝起きでぼーっとしている。' },
        ],
    },
    133: {
        title: 'ストレス', titleEn: 'Stress', category: 'feeling',
        scene: '仕事と生活のストレスについて本音トーク。マスターが優しく聞く夜。',
        keywords: [
            { en: 'overwhelmed', ja: '圧倒されている', pron: 'オーヴァーウェルムド', example: 'I feel completely overwhelmed.', note: '「やることが多すぎてパンクしそう」。stressed outより強い。日本語の「いっぱいいっぱい」が近い。' },
            { en: 'burnout', ja: '燃え尽き', pron: 'バーンアウト', example: 'I think I am experiencing burnout.', note: '2019年にWHOが正式に定義。burn out(動詞)=燃え尽きる。burnout(名詞)=燃え尽き症候群。日本語でも「バーンアウト」は定着しつつある。' },
            { en: 'vent', ja: '愚痴を言う', pron: 'ヴェント', example: 'I just need to vent for a minute.', note: 'ventilation(換気)と同じ語源。感情を「換気」するイメージ。complain=不満を言う(ネガティブ寄り)、vent=吐き出す(前向き寄り)。' },
            { en: 'cope', ja: '対処する', pron: 'コープ', example: 'How do you cope with stress?', note: 'coping mechanism=対処法。cope with=〜に対処する。deal with も同義だがcopeの方が精神的なニュアンスが強い。' },
            { en: 'deadline', ja: '締め切り', pron: 'デッドライン', example: 'I have three deadlines this week.', note: 'meet a deadline=締め切りに間に合う。miss a deadline=締め切りを逃す。tight deadline=厳しい締め切り。日本語でも「デッドライン」は使うが、英語ほど日常的ではない。' },
        ],
    },
    134: {
        title: '美容', titleEn: 'Beauty and Skincare', category: 'shopping',
        scene: 'ミナが新しいスキンケアの話を始める。リサも参戦して美容トーク。',
        keywords: [
            { en: 'moisturizer', ja: '保湿剤・乳液', pron: 'モイスチャライザー', example: 'I need a good moisturizer.', note: 'moisturize=保湿する。hydrate=水分を与える。日本語の「乳液」は英語ではlotion、「クリーム」はcream。moisturizerは両方を含む広い概念。' },
            { en: 'sunscreen', ja: '日焼け止め', pron: 'サンスクリーン', example: 'Always wear sunscreen.', note: 'SPF(Sun Protection Factor)=紫外線防御力。sunblock も同義。日本は美白文化、欧米は健康のためにsunscreenを塗る。動機が違う。' },
            { en: 'wrinkle', ja: 'シワ', pron: 'リンクル', example: 'I am starting to get wrinkles.', note: 'fine lines=小じわ。crow\'s feet=目尻のシワ。laugh lines=笑いジワ。anti-aging=アンチエイジング。日本語の「シワ」はwrinkleだけで済むが英語は部位別に名前がある。' },
            { en: 'complexion', ja: '肌の色・肌質', pron: 'コンプレクション', example: 'She has a beautiful complexion.', note: 'skin tone=肌の色。complexion は色+質感+状態を含む総合的な「肌」。clear complexion=きれいな肌。dull complexion=くすんだ肌。' },
            { en: 'glow', ja: 'ツヤ・輝き', pron: 'グロウ', example: 'Your skin is glowing today.', note: 'glowing skin=ツヤ肌。radiant=輝いている。dewy=うるおいのある。日本語の「ツヤ肌」は英語ではglowing skinが最も近い。You are glowing は最高の褒め言葉。' },
        ],
    },
};
