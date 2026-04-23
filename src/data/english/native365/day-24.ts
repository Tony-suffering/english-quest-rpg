import type { Native365Day } from '@/types/native365';

/**
 * Day 24
 *
 * 発音: like の発音と4用法 -- 動詞・比較・引用・filler
 * 文法: 条件文の時制調整 -- If X happens / If X happened / If X had happened
 */

export const DAY_24: Native365Day = {
    day: 24,
    week: 4,
    month: 1,

    // ══════════════════════════════════════════════════
    // 扉絵: 水曜の夜、ユキが友達との会話で固まった話
    // ══════════════════════════════════════════════════
    opening: {
        scene: "水曜の夜、ユキが英会話カフェで 'She was like, no way' という英語を聞いて意味が取れず固まった話から。like の4用法と条件文の時制が一気に来る。",
        lines: [
            { char: 'yuki',    text: "昨日ネイティブが 'she was like, no way' って言うてて、like の意味が全く取れんかった。好き? 似てる? 違うやろ?" },
            { char: 'lisa',    text: "Honestly? That like is literally just quotation marks. 'She was like no way' = 'She said no way'. Same exact thing." },
            { char: 'master',  text: "like は4つ働きがある。動詞・比較・引用・filler。そして今日はもう一つ、If X happens と If X happened の時制差もやる。日本人が「もし〜なら」で混乱する本丸だ。" },
        ],
    },

    // ══════════════════════════════════════════════════
    // 発音: like の発音と4用法
    // ══════════════════════════════════════════════════
    pronunciation: {
        title: 'like -- 1語で4役、日本人が最後まで使いこなせない単語',
        subtitle: '動詞の like、比較の like、引用の like、filler の like。役で音量も文法も変わる。',
        intro: {
            question: 'なぜ若いネイティブの会話で like がこんなに頻繁に出てくるのか?',
            insight: 'like は英語の中で最も「過労働」な単語の一つ。動詞 (I like coffee)、前置詞 (like a child)、引用マーカー (she was like "no way")、discourse marker / filler (I was, like, so tired) の4役をこなす。さらに approximator (like 5 minutes = 約5分) の役もある。\n\n日本人は学校で「like = 好き / 〜のような」の2つしか教わらない。だからネイティブの会話で like が5秒に1回出てくると、全部「好き」か「のような」で処理しようとして意味不明になる。実際には大半が引用マーカーか filler か approximator。\n\n音声面でも役で違う。動詞の like は強勢あり /laɪk/、比較の like はやや弱化、filler と引用の like は音長が短く /laɪk/ が /lʌk/ に近く潰れる。今日の5項目で全役を潰す。これが終われば若いネイティブの会話が一気に聞けるようになる。',
        },
        tldr: 'like = 好き/のような だけじゃない。引用・filler・approximator の3役を足して聞き分ける。',
        items: [
            {
                id: 'd24-p-01-like-verb',
                label: "動詞の like -- 強勢あり、はっきり /laɪk/",
                trigger: "'I like coffee.' を発音しろ。",
                points: {
                    core: { en: '/laɪk/ with stress', ja: '動詞の like は content word。強勢あり、母音 /aɪ/ を完全に出す。' },
                    nuance: { en: "I LIKE coffee. The 'like' is a full beat.", ja: '文の中で like が情報を持つ場合、音を落とさない。' },
                    shift: { en: "'I really like it' -- like gets even more emphasis when intensified.", ja: 'really / totally などの強意副詞が付くと like の強勢がさらに立つ。' },
                    native: { en: "Dude, I genuinely like this place more than any other cafe in the city -- the espresso is unreal.", ja: 'マジでこの街のどのカフェよりここ好きなんだよ、俺。エスプレッソがヤバい。' },
                },
                trap: '動詞の like も filler like と同じく軽く読んでしまう。動詞は content word、強く読め。',
                tip: '「好き」の意味の時は母音 /aɪ/ をしっかり出す。感情の色を乗せる。',
                reactions: {
                    master: '動詞 like は content word。情報を持つ語は強勢を取る、が英語の基本原則。',
                    lisa: "When I say 'I like it', the LIKE carries weight. That's the one that really means 'like'.",
                    takeshi: 'like が4役あるから、どの役でも同じ音量で読むと情報が死ぬ。動詞はしっかり出せ。',
                    yuki: '動詞の like は強く読むって意識してなかった。他の like と区別するため大事。',
                    kenji: "現場で 'I like this approach' って言う時 like に力入れられると説得力出る。",
                    mina: "DM で \"I really like you\" の like、太字にしたくなるやん。あの感覚で音出す。",
                },
            },
            {
                id: 'd24-p-02-like-preposition',
                label: "比較の like -- 前置詞、やや弱化",
                trigger: "'He acts like a child.' を発音しろ。",
                points: {
                    core: { en: '/laɪk/ reduced, function word', ja: '前置詞 like は機能語。やや弱化、前後の content word に音を譲る。' },
                    nuance: { en: "He ACTS like a CHILD. Stress on acts and child, like is glue.", ja: '前置詞は文の骨格ではなく接着剤。音量を持たない。' },
                    shift: { en: "'Like a pro' / 'like a boss' -- in idioms like still reduces.", ja: 'like a + 名詞 の慣用句でも like は弱く、後ろの名詞が強勢を取る。' },
                    native: { en: "Honestly, my boss has been acting like a total maniac ever since the merger was announced.", ja: 'マジで、合併発表されてから上司、完全に狂人みたいになってるんだけど。' },
                },
                trap: '前置詞の like を動詞 like と同じ強さで読む。前後の単語が立たない。',
                tip: '比較の like は「のような」という意味は持つが音は軽く。次の名詞に山を移す。',
                reactions: {
                    master: '前置詞 like は function word。意味はあるが情報の焦点ではなく、音量配分は後続名詞が上。',
                    lisa: "'He acts like a child' -- like almost disappears when I say it fast. The emphasis is on CHILD.",
                    takeshi: '前置詞 like は弱化。日本人は意味で覚えるから、音まで動詞 like と同じに読みがち。',
                    yuki: '比較の like と動詞 like、音量違うんや。意識的に使い分ける練習必要やな。',
                    kenji: "'like a professional' って言う時、like 弱く pro に寄せると自然に聞こえる。",
                    mina: 'Instagram で "like a dream" とかタグ付ける時、like 軽い感じでちょうどいい。',
                },
            },
            {
                id: 'd24-p-03-like-quotative',
                label: "引用の like -- 'she was like...' は『〜って言った』",
                trigger: "'She was like, no way.' を発音しろ。",
                points: {
                    core: { en: 'was/were + like + quoted speech/feeling', ja: 'be動詞 + like で「〜って言った/思った」の引用マーカー。口語の定番。' },
                    nuance: { en: "She was like, 'no way.' = She said 'no way' / reacted with 'no way'.", ja: '動詞 say よりカジュアル。セリフそのものを引っ張ってくる生き生きした感じ。' },
                    shift: { en: "'I was like, wait, what?' -- captures not just words but the vibe.", ja: '言葉だけでなく反応全体 (表情・トーン) を含めて伝える機能。' },
                    native: { en: "So I walked in and he was like, 'where have you been?' -- I literally just stood there, I had no answer.", ja: '入った瞬間あの人「どこ行ってたの?」って。マジで立ち尽くしたわ、答えようがなくて。' },
                },
                trap: "'be like' を「〜が好き」「〜のような」と訳そうとして意味不明になる。引用マーカーと認識しろ。",
                tip: "was/were like が出たら、直後の言葉はそのまま発言・反応のセリフ。say と機械的に置き換えて意味を取る。",
                reactions: {
                    master: '引用マーカー like は be動詞と組んで発話・思考・感情を導入する。say より広い範囲 (非言語的反応も) をカバーする。',
                    lisa: "'She was like, no way' -- so natural for me, but I know it throws off learners who only know 'like = love'.",
                    takeshi: 'この like が聞き取れないと、若いネイティブの会話の半分が理解不能。ここ必ず取れ。',
                    yuki: "was like が『〜って言った』って知らんかった。これ知ってるだけで会話の解像度変わる。",
                    kenji: "会議の報告で 'He was like, we need more data' って言えたらリアル感出る。",
                    mina: 'SNS の "and I was like 😭" ってパターン、引用の like そのもの。超カジュアル。',
                },
            },
            {
                id: 'd24-p-04-like-filler',
                label: "filler の like -- 'I was, like, so tired'",
                trigger: "'I was, like, so tired.' を発音しろ。",
                points: {
                    core: { en: 'like as discourse filler, reduced /lʌk/', ja: 'filler の like は音が潰れて /lʌk/ に近くなる。意味はほぼ持たない。' },
                    nuance: { en: "I was, like, so tired. The 'like' buys thinking time.", ja: 'filler は思考の間埋め。日本語の「なんか」「みたいな」に近い。' },
                    shift: { en: "Overused filler like can sound unintelligent -- use sparingly.", ja: '使いすぎると知的に聞こえない。ネイティブでも多すぎると批判対象になる。' },
                    native: { en: "I was, like, seriously considering just quitting right there -- but I didn't wanna make a scene.", ja: 'あそこでマジで辞めようかと思ったんだよね。でも、そこで騒ぎ起こしたくなかったし。' },
                },
                trap: 'filler の like を意味ある単語として解釈しようとする。無視してよい飾りと割り切る。',
                tip: '発音は短く、音を落として挟む。長く読むと文の意味が壊れる。',
                reactions: {
                    master: 'filler like は談話標識。意味的貢献はゼロで、思考時間の確保と発話リズムの調整が機能。',
                    lisa: "I catch myself saying 'like' way too much. It just fills space while I think.",
                    takeshi: "filler の like、使いすぎると学生っぽく聞こえる。使う頻度は控えめに、でも使えないと不自然。",
                    yuki: 'filler の like、全部無視していいんや。気が楽になった。',
                    kenji: "現場でプロ同士だと filler like は少ないほうが信頼される。場面を選ぶ。",
                    mina: 'Z 世代は like を1文に3回くらい挟む。でも、それ込みで世代マーカーやから開き直ってる。',
                },
            },
            {
                id: 'd24-p-05-like-approximator',
                label: "approximator の like -- 'like 5 minutes' = 約5分",
                trigger: "'It took like 5 minutes.' を発音しろ。",
                points: {
                    core: { en: 'like + number = approximately', ja: '数字の前の like は「約」「だいたい」。about の口語版。' },
                    nuance: { en: "It took like 5 minutes. = It took about 5 minutes.", ja: 'about より軽く、曖昧さを強調。正確さを保証しないことの明示。' },
                    shift: { en: "'like a hundred times' -- approximator like exaggerates too.", ja: '誇張表現にも使う。「100回くらい」で頻度を盛る口語。' },
                    native: { en: "Wait, so you told him like a thousand times already? Honestly, at this point I'd just give up.", ja: 'ちょっと、お前もう何千回も言ったんやろ? 正直もう諦めるわ、そこまで来たら。' },
                },
                trap: '数字の前の like を「好き」「のような」で読もうとする。「約」と即訳する癖をつける。',
                tip: '数字が続く like は即 about に置き換えて理解。発音は軽く、数字に音を譲る。',
                reactions: {
                    master: '数詞修飾の like は approximator (近似副詞) として機能。about の口語変異として定着。',
                    lisa: "'It took like 5 minutes' -- so normal in speech. Nobody actually means EXACTLY 5.",
                    takeshi: '数字の前の like、approximator だと知ってれば一瞬で取れる。知らんと全部意味不明になる。',
                    yuki: "like + 数字 = 約、シンプルなルール。覚えたら一気に聞けるようになりそう。",
                    kenji: "見積もりで 'like 3 days' って言われたら3日前後か、って理解できる。",
                    mina: "SNS で \"wait like 5 min\" って書くの、まさに approximator like。瞬時に伝わる。",
                },
            },
        ],
    },

    // ══════════════════════════════════════════════════
    // 文法: 条件文の時制調整
    // ══════════════════════════════════════════════════
    grammar: {
        title: '条件文の時制調整 -- 3段階の「もし〜なら」を時制で切る',
        subtitle: 'If X happens / If X happened / If X had happened。形ではなく「距離」で選ぶ。',
        intro: {
            question: 'なぜ If I were rich と If I am rich の違いが感覚として掴めないのか?',
            insight: '日本語の「もし〜なら」は形が1つ。未来の条件も、ありえない仮定も、過去の後悔も、全部「もし」で処理できる。英語はこれを3つの時制構造で切り分ける。\n\nルールは時制シフト。(1) 現実的な未来条件 → 現在形 + will。(2) ありえない/起きにくい現在の仮定 → 過去形 + would。(3) 過去の反実仮想 → 過去完了 + would have。1段階時制を過去に引くと「距離」が生まれ、距離が「現実との乖離」を示す。\n\n最大の罠は「今 / 未来」の事の時に If I am (現在形) を書こうとすること。If I were (過去形) にした方が「ありえないけど」のニュアンスが出る。時制の過去形化は時間を過去に送ってるのではなく、心理的距離を作ってる。今日の5つでこの3段階と主な例外を全て潰す。',
        },
        tldr: 'If + 現在 + will / If + 過去 + would / If + 過去完了 + would have。時制シフトは距離。',
        items: [
            {
                id: 'd24-g-01-real-future',
                label: "If it rains, we'll cancel -- 現実的な未来",
                trigger: '「雨が降ったら中止にしよう」を英語で。',
                points: {
                    core: { en: "If it rains, we'll cancel.", ja: 'if 節は現在形、主節は will。未来のことだが if 節で will を使わない。' },
                    nuance: { en: "It's a real possibility. 50-50. Either outcome is on the table.", ja: 'ありうる未来。話者は「起きるかもしれない」と思ってる。' },
                    shift: { en: "If it rains tomorrow, we'll cancel. (specific time OK)", ja: 'tomorrow 等の未来時点を入れても、if 節の動詞は現在形のまま。' },
                    native: { en: "If the weather holds up tomorrow, we're totally doing the BBQ -- if not, we'll just order pizza again.", ja: '明日の天気が持てば、絶対 BBQ やる。ダメなら、またピザ頼むだけ。' },
                },
                trap: "'If it will rain...' と if 節に will を入れる。これは英語として不自然。",
                tip: "未来を話していても if 節は現在形。will は主節だけ、が鉄則。",
                reactions: {
                    master: '第1条件文 (real conditional) は if 節現在形・主節 will。if 節が意志・要請を含む場合のみ will が入る例外あり。',
                    lisa: "'If it will rain' sounds really wrong to me. Native speakers just say 'if it rains'.",
                    takeshi: "if 節で will は原則アウト。未来でも現在形。ここ最初の関門。",
                    yuki: 'if 節で will 使わないの、学校で習ったけどスッと出ないんや。反復で体に入れる。',
                    kenji: "'If the client calls, I'll handle it' って言える現場英語、一発で信頼感出る。",
                    mina: '"If you see this, like it" って SNS の定型、if 節に will 入れない好例や。',
                },
            },
            {
                id: 'd24-g-02-unreal-present',
                label: "If I were rich -- ありえない現在の仮定",
                trigger: '「もし金持ちだったら世界旅行するのに」を英語で。',
                points: {
                    core: { en: "If I were rich, I would travel the world.", ja: 'if 節は過去形 (were / had 等)、主節は would。現実と反対の現在の仮定。' },
                    nuance: { en: "I'm not rich. This is pure fantasy. Time-shifted to past to show distance.", ja: '「今は金持ちじゃない」が前提。過去形にすることで現実からの距離を出す。' },
                    shift: { en: "If I was rich (casual) / If I were rich (formal/traditional). Both common.", ja: 'was / were どちらも口語では許容。伝統文法は were、口語は was も頻出。' },
                    native: { en: "Honestly, if I had a trust fund, I'd literally just travel forever and never touch a spreadsheet again.", ja: 'マジで、信託財産でもあったら、永遠に旅して二度と表計算触らん。' },
                },
                trap: "'If I am rich, I will travel' と現在形で書く。これだと「金持ちの可能性ある」の意味になって変。",
                tip: "「ありえない/起きにくい」現在の仮定は if 節を過去形に。現実との距離を動詞で出す。",
                reactions: {
                    master: '第2条件文 (unreal conditional) は時制シフトで現実との乖離を表現。be動詞は伝統的に were だが was も許容。',
                    lisa: "'If I were you' vs 'If I was you' -- both fine in casual speech. I use both.",
                    takeshi: "ありえない仮定で現在形使うと、可能性ある話になっちゃう。過去形で距離出せ。",
                    yuki: "時制を過去にずらすの、時間じゃなくて距離を出すためなんや。腑に落ちた。",
                    kenji: "'If I were the CEO, I'd restructure this' って会議で言えたら一段上の英語。",
                    mina: '"If I were you..." って典型の若者英語でも出る。カジュアルでも were がちょい知的。',
                },
            },
            {
                id: 'd24-g-03-unreal-past',
                label: "If I had known -- 過去の反実仮想",
                trigger: '「知ってたら助けてたのに」を英語で。',
                points: {
                    core: { en: "If I had known, I would have helped.", ja: 'if 節は過去完了 (had + 過去分詞)、主節は would have + 過去分詞。過去の後悔。' },
                    nuance: { en: "I didn't know, so I didn't help. Pure counterfactual about the past.", ja: '「実際は知らなかった/助けなかった」が前提。過去の事実と反対の想定。' },
                    shift: { en: "Casual: If I'd known, I would've helped. Very frequent in speech.", ja: "口語では 'd / would've に縮約されるのが普通。フル形は書き言葉寄り。" },
                    native: { en: "If I'd known you were struggling this much, I would've literally dropped everything and come over -- I'm so sorry.", ja: 'そこまで大変やって知ってたら、マジで全部放り出して行ってた。本当ごめん。' },
                },
                trap: "'If I knew, I would help' と第2条件文にする。過去の話は had known + would have が正解。",
                tip: "過去の後悔は if + had + pp / would have + pp。縮約形 (I'd, would've) で口語に乗せる。",
                reactions: {
                    master: '第3条件文 (past unreal) は二重の時制シフト。if 節が過去完了、主節が would have + 過去分詞。',
                    lisa: "'If I'd known' -- I say this all the time. The full 'If I had known' sounds formal.",
                    takeshi: "「知ってれば」の日本語、had known と would have のセット。これ出せれば英語の後悔が言える。",
                    yuki: "過去の反実仮想、had + pp と would have + pp のセットで覚える。",
                    kenji: "'If I'd known about the deadline, I would've started earlier' って謝罪の定型。",
                    mina: "DM で \"if I'd known sooner...\" って書くの、過去の後悔そのもの。文法的にも正解。",
                },
            },
            {
                id: 'd24-g-04-mixed-conditional',
                label: "If I had studied, I would be rich now -- 混合条件文",
                trigger: '「もっと勉強してたら今金持ちなのに」を英語で。',
                points: {
                    core: { en: "If I had studied harder, I would be rich now.", ja: 'if 節は過去完了 (過去の反実)、主節は would + 動詞原形 (現在の結果)。' },
                    nuance: { en: "Past cause, present result. Two different time points in one sentence.", ja: '過去の原因が現在の結果に繋がる構造。時制が混在する。' },
                    shift: { en: "If you had left earlier, you'd be there by now.", ja: '過去の行動 → 現在の状況。旅程・スケジュール系で頻出。' },
                    native: { en: "Okay honestly, if I'd taken that job offer back in college, I'd probably be running a team in San Francisco right now.", ja: '正直、大学の頃あのオファー受けてたら、今ごろサンフランシスコでチーム率いてたろうな。' },
                },
                trap: 'if 節も主節も全部過去完了 / would have にする。過去と現在をつなぐ場合は混合形にする必要がある。',
                tip: "過去の原因 → 現在の結果、は混合条件文。if 節 had + pp、主節 would + 動詞原形。",
                reactions: {
                    master: '混合条件文 (mixed conditional) は時制の異なる2節を組み合わせる高度な構造。原因の時点と結果の時点を別扱いする。',
                    lisa: "'If I'd studied more, I'd be a lot further along' -- I genuinely think this one every day.",
                    takeshi: "混合条件、知らんと無理に単一時制で押し込もうとして全部崩れる。過去と現在を別々に扱え。",
                    yuki: '過去の原因と現在の結果、別々の時制で出すって発想、なかったわ。',
                    kenji: "'If we'd ordered earlier, we'd have it by now' って現場でよく使う。混合条件の典型。",
                    mina: "\"If I'd known better, I'd be in a better place now\" って思う事、誰でもあるやん。",
                },
            },
            {
                id: 'd24-g-05-if-i-were-you',
                label: "If I were you -- 助言の定型",
                trigger: '「私ならそうしない」を英語で。',
                points: {
                    core: { en: "If I were you, I wouldn't do that.", ja: '第2条件文の定型。「私があなたなら」は常に were (was よりフォーマル)。' },
                    nuance: { en: "Used to give advice without sounding bossy. Softens the suggestion.", ja: '直接「やめろ」と言わず、仮定を挟むことで柔らかい助言になる。' },
                    shift: { en: "Were I you, ... (inversion, very formal) / If I was you (casual).", ja: '倒置形 Were I you は文学的。If I was you は非常にカジュアル。' },
                    native: { en: "Dude, if I were you, I'd honestly just quit and take a month off -- you literally look exhausted.", ja: 'お前、俺なら正直もう辞めて1か月休む。マジで死にそうな顔してるぞ。' },
                },
                trap: 'If I am you で言いたくなる。be 動詞は were が伝統、was も口語なら OK だが am はアウト。',
                tip: "助言で「私なら」を出したい時は反射的に If I were you, I'd ... のテンプレを使う。",
                reactions: {
                    master: "If I were you は第2条件文の慣用化された型。助言機能に特化し、直接命令を避ける diplomatic device。",
                    lisa: "'If I were you' is softer than 'You should'. I use it when I care about not being pushy.",
                    takeshi: '「私ならこうする」の日本語、If I were you で出せると助言のトーンが一気に柔らかくなる。',
                    yuki: 'If I were you、助言の定型として覚えとくと迷わん。',
                    kenji: "'If I were you, I'd double-check that' って先輩感出せる言い方。現場で有効。",
                    mina: '"If I were you, I would not text him back" ってアドバイス系の DM で超使う。',
                },
            },
        ],
    },
};
