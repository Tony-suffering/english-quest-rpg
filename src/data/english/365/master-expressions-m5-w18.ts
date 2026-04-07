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
            'I appreciate that. Seriously.',
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
            'Oh no, take it easy. Want me to grab you some medicine?',
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
            'Oh no, take it easy. Want me to grab you some medicine?',
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
            'Oh, for sure. I\'ve noticed that too.',
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
            'Did you take it already? Don\'t skip doses.',
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
            'Hey, don\'t push it. Take it one step at a time.',
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
            'Of course! What do you need?',
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
            'Hmm, good question. What do you think?',
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
            'Ha, that\'s so true! Love it.',
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
            'Let\'s do it! I\'m right behind you.',
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
            'Done! I booked us a table for seven.',
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
            'Ha, for real? That\'s interesting!',
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
            'Good to know! I\'ll make sure we avoid that.',
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
            'Say no more! Let\'s make it happen.',
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
            'Got it! Let me check what we have.',
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
            'Did you take it already? Don\'t skip doses.',
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
            'Oh really? Tell me more!',
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
            'That\'s the spirit! Keep it up.',
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
            'Hey, relax. Everything\'s going to be fine.',
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
            'Couldn\'t agree more. That\'s so important.',
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
            'Ha, you and me both. Let\'s start tomorrow.',
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
            'Oh, good to know! I\'ll keep that in mind.',
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
            'Huh, I never thought about it that way!',
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
            'Ha, you\'re not wrong about that!',
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
            'Oh yeah? What\'s been going on?',
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
            'Go for it! Nothing to lose, right?',
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
            'Let\'s do it! I\'m right behind you.',
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
            'No worries, take your time!',
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
            'Ha, that\'s so true! Love it.',
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
            'Nailed it! Couldn\'t agree more.',
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
            'Nice! I should start working out too.',
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
            'Hmm, good question. What do you think?',
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
            'Let\'s do it! I\'m right behind you.',
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
            'Yeah, totally! That\'s a great point.',
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
            'Wait, good yabai or bad yabai?',
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
            'Oh yeah? What\'s been going on?',
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
            'Oh wait, my bad. What do you mean?',
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
            'Go for it! Nothing to lose, right?',
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
            'Ha, that\'s so true! Love it.',
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
            'Nice! I should start working out too.',
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
            'Oh really? Tell me more!',
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
            'Yeah, it\'s pretty wild when you think about it.',
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
            'I appreciate that. Seriously.',
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
            'Here, use my charger. I\'ve got one.',
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
            'Let\'s do it! I\'m right behind you.',
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
            'Let\'s do it! I\'m right behind you.',
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
            'Oh yeah? What\'s been going on?',
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
            'Yeah, I can totally see that.',
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
            'Oh wait, my bad. What do you mean?',
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
            'Sounds good! I\'m in.',
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
            'Yeah, that\'ll do it. You need a break.',
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
            'Say no more! Let\'s make it happen.',
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
            'Oh really? Tell me more!',
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
            'Let me take a look. Maybe I can help.',
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
            'Say no more! Let\'s make it happen.',
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
            'Seriously? What\'s the plan after?',
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
            'Yeah, it\'s pretty wild when you think about it.',
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
            'Whoa, what happened? That sounds awful.',
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
            'Oh cool! How long have you been into that?',
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
            'Let me check... it\'s about that much, yeah.',
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
            'Oh really? Tell me more!',
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
            'Aisle three, I think. Let me show you.',
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
            'Sure! Ask me anything.',
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
            'Me too! Great minds think alike.',
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
            'Yeah, totally! That\'s a great point.',
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
            'Say no more! Let\'s make it happen.',
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
            'Me too! Great minds think alike.',
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
            'Hmm, good question. What do you think?',
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
            'Hmm, good question. What do you think?',
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
            'Oh yeah? What\'s been going on?',
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
