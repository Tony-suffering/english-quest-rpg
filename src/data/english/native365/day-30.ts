import type { Native365Day } from '@/types/native365';

/**
 * Day 30
 *
 * 発音: 実戦パック -- 発音 (5つの高頻度シーンで全要素を使う)
 * 文法: 実戦パック -- 文法 (5つの高頻度会話で全要素を使う)
 *
 * Day 30 は FINAL TEST / 卒業。各 item は実際のシーン (office / date / emergency / reunion / negotiation) で
 * Month 1 で積み上げた全要素を応用する。
 */

export const DAY_30: Native365Day = {
    day: 30,
    week: 5,
    month: 1,

    // ══════════════════════════════════════════════════
    // 扉絵: 月末の最終夜、卒業前
    // ══════════════════════════════════════════════════
    opening: {
        scene: '月末の水曜夜。Month 1 の最終日。カウンターに6人全員。マスターが「今日は理屈も終わり。5つの実戦シーンで、これまでの全部を使い倒して卒業する」と言った。',
        lines: [
            { char: 'master',  text: '今日で Month 1 終わり。理屈の時間は昨日で終わった。今日は実戦。オフィス、デート、緊急、再会、交渉。5つのシーンで、Month 1 の総力を出す。' },
            { char: 'takeshi', text: 'シーン無しの文法と発音は、脳内の博物館に飾られて終わる。シーンに乗った瞬間、はじめて筋肉になる。今日でそこまで持ってく。' },
            { char: 'lisa',    text: "Real speech happens in scenes, not in isolation. Today I'm gonna give you the lines I actually use -- every day, with real people." },
        ],
    },

    // ══════════════════════════════════════════════════
    // 発音: 実戦パック -- 発音 (5つの高頻度シーン)
    // ══════════════════════════════════════════════════
    pronunciation: {
        title: '実戦パック -- 発音の全要素を5つのリアルシーンで使う',
        subtitle: 'オフィス・デート・緊急・再会・交渉、それぞれの最頻出フレーズで Month 1 を試す。',
        intro: {
            question: 'ルールは全部分かった。でも実際のシーンで本当に出せるのか?',
            insight: 'Month 1 の 28 日で schwa から filler まで全てやった。Day 29 で統合もやった。今日は最終関門。脳内で練習する発音と、オフィスの会議中・デートの最中・緊急連絡の1秒前・10年ぶりの再会・値段交渉の瀬戸際で出る発音は、別物だ。\n\nシーンの重みが脳の処理リソースを食う。「言う内容」「相手の反応予測」「自分の感情処理」に注意が取られた瞬間、発音の reduction や linking が崩れて、カタカナ英語に戻る。これが実戦の難しさ。\n\n解決策は「シーンごとの定型を音声ごと丸ごと覚える」こと。シーンに入った瞬間、そのシーン用のフレーズが音声ごと再生される状態を作る。今日の5つは全て実際の会話で毎週出るシーンだけ。ここで全部の発音要素を最後のテストとして通す。',
        },
        tldr: 'オフィス・デート・緊急・再会・交渉、5シーンの定型フレーズで全発音要素を実戦運用する。',
        items: [
            {
                id: 'd30-p-01-office',
                label: 'オフィスの会議前 -- 調整フレーズの実戦',
                trigger: '会議前に5分遅れると同僚に伝える。',
                points: {
                    core: { en: "I'm gonna be like five minutes late -- could you hold the meeting for me?", ja: 'gonna (縮約) + like (filler) + five-minutes (linking) + could-you (yod coalescence)。' },
                    nuance: { en: "I'm gonna be like five minutes late...five reductions in one line.", ja: '1文に縮約・filler・linking・融合の4要素が詰まる。オフィスの毎日。' },
                    shift: { en: "Formal: 'I'll be a few minutes late. Could you please hold the meeting?' (no reductions)", ja: 'フォーマルでも意味は同じだが、reduction がないと同僚間では逆に固く聞こえる。' },
                    native: { en: "Hey, so I'm gonna be like five minutes late -- the elevator's literally stuck on the third floor and, honestly, I might just take the stairs, could you hold the meeting for me?", ja: 'あのさ、5分くらい遅れる。エレベーターがマジで3階で止まっててさ、正直、階段で行くかも。会議、ちょっと待っといて。' },
                },
                trap: 'I will be five minutes late. と完全形で出す。オフィスのカジュアル度では gonna / like を使わないと浮く。',
                tip: 'オフィスシーン専用フレーズとして丸暗記。gonna / like / could-you は外さない。',
                reactions: {
                    master: 'オフィス内調整の定型文。縮約・filler・yod coalescence の3要素が1文で同時運用される典型例。',
                    lisa: "I say this exact sentence like three times a week. It's the most used phrase in American office life, I swear.",
                    takeshi: "I will be late は固い。gonna be late + like 5 minutes で、ちょうどいいオフィスの温度や。",
                    yuki: "オフィス英語って堅いもんやと思ってたけど、gonna / like 入れていいんや。",
                    kenji: "現場で 'I'm gonna be like five minutes late' 即出せたら、信頼される英語者に見える。",
                    mina: "Slack で書く時は 'I'll be 5 min late' やけど、口頭では絶対 gonna + like が入る。媒体差。",
                },
            },
            {
                id: 'd30-p-02-date',
                label: 'デートの別れ際 -- 気持ちを出す縮約',
                trigger: "デートの帰りに「また会いたい」と伝える。",
                points: {
                    core: { en: "I had such a good time tonight -- I wanna do this again soon, if you're down.", ja: 'wanna (縮約) + if-you-are → if-yer (linking + reduction) + down (カジュアル語彙)。' },
                    nuance: { en: "I wanna do this again soon, if yer down. Casual and warm.", ja: 'want to → wanna で感情の柔らかさを出す。if you want より if you\'re down の方がカジュアル。' },
                    shift: { en: "Formal: 'I enjoyed our time together. I would like to see you again.' (way too stiff)", ja: 'フォーマルにすると逆に距離感が出てデートで不自然。' },
                    native: { en: "Honestly, I had such a good time tonight -- like, I seriously wanna do this again soon, if you're down, 'cause I feel like we barely scratched the surface.", ja: 'マジで、今夜めっちゃ楽しかった。ていうか、近いうちにまたしたいな、もしよかったら。まだ全然喋り足りん感じやし。' },
                },
                trap: 'I would like to see you again. と丁寧に言う。デートの温度にはwanna / if you\'re down の砕け方が合う。',
                tip: "デートシーン専用フレーズ。wanna + if you're down + 'cause の3点セットで温度を作る。",
                reactions: {
                    master: "インフォーマル場面 (デート・友人) では縮約度が上がる。wanna / gonna / cuz / yer などが自然に出る register。",
                    lisa: "'I wanna do this again' -- say it with a little smile. It lands. 'I would like to see you again' sounds like a business proposal.",
                    takeshi: "デートで I would like to see you again. 言うた瞬間、次ないで。wanna まで砕けてちょうどいい。",
                    yuki: "if you're down って初めて聞いた。カジュアルな「もしよかったら」なんやね。",
                    kenji: "現場関係ないけど、こういう場面でも砕ける英語出せないと、距離縮まらん。",
                    mina: "\"I wanna do this again soon\" って Vlog のエンディングでもよう聞く。余韻残す定番フレーズ。",
                },
            },
            {
                id: 'd30-p-03-emergency',
                label: '緊急連絡 -- 短く強く伝える発音',
                trigger: "会社で何か起きた。すぐ上司に電話して状況を伝える。",
                points: {
                    core: { en: "Hey, I gotta talk to you -- something's seriously wrong with the system and I can't fix it on my own.", ja: "gotta (have got to → gotta) + something's (縮約) + seriously (強調副詞) + can't (kæn(t) で t 脱落)。" },
                    nuance: { en: "I-gotta-talk-to-ya...something's-seriously-wrong. Urgency through reductions.", ja: '緊急時ほど縮約が増える。時間がないから音を削ぎ落とす本能的動作。' },
                    shift: { en: "Calm: 'I need to speak with you about an issue with the system.' (polite but slow)", ja: '落ち着いてる時の形。緊急時には gotta / seriously が入って速度と危機感が出る。' },
                    native: { en: "Hey, I gotta talk to you right now -- something's seriously wrong with the system, like, I've been trying to fix it for an hour and I honestly can't figure out what's causing it.", ja: 'ちょっと、今すぐ話したい。システムがマジでおかしい。1時間直そうとしてるけど、正直、原因が全然分からん。' },
                },
                trap: "I need to speak with you. と冷静な語彙で出す。緊急シーンでは I gotta talk to you の方が危機感が伝わる。",
                tip: "緊急シーン専用。gotta + seriously + can't は3点セットで緊迫感を音に出す。",
                reactions: {
                    master: '緊急場面では reduction が強化される。言語の経済性 (time-critical speech) が音声短縮を促進する。',
                    lisa: "'I gotta talk to you' -- the 'gotta' signals urgency. 'I need to speak with you' sounds like HR is coming.",
                    takeshi: '緊急時こそ縮約や。丁寧語で出すと「緊急じゃないやん」と判断されて対応が遅れる。',
                    yuki: 'I gotta talk to you で緊急感出るの、映画でよう見る構図や。',
                    kenji: "'Something's seriously wrong' は現場で即通じる。seriously が危機度のゲージ。",
                    mina: "\"Dude, I gotta talk to you\" って LINE じゃなく電話やん。緊急やとテキスト飛ばして音声に来るのと同じ。",
                },
            },
            {
                id: 'd30-p-04-reunion',
                label: '10年ぶりの再会 -- 感情が濃いシーンの間',
                trigger: "10年ぶりに友達に会った。最初の一言。",
                points: {
                    core: { en: "Dude, it's been like ten years -- you haven't changed at all, I swear to god.", ja: "it's-been (現在完了縮約) + like (近似 filler) + haven't-changed (完了形縮約) + I-swear (強調)。" },
                    nuance: { en: "It's-been-like-ten-years...haven't-changed. Time + disbelief in one line.", ja: '時間の持続 (it\'s been) + 驚き (haven\'t changed) + 強調 (swear to god) が3層で重なる。' },
                    shift: { en: "Neutral: 'It's been a long time. You look the same.' (flat, unemotional)", ja: '感情を入れない言い方。再会シーンでは like / I swear が感情を厚くする。' },
                    native: { en: "Dude, it's literally been like ten years -- you haven't changed at all, I swear to god, it's like we just saw each other yesterday.", ja: 'いや、マジで10年ぶりやん。お前、全然変わってない、誓って。昨日会ったばっかみたいや。' },
                },
                trap: "It has been ten years. と完全形で淡々と言う。再会の感情濃度は like / I swear / dude で作る。",
                tip: "再会シーン専用。dude + it's been like + I swear to god で感情の層を積む。",
                reactions: {
                    master: '再会場面の発話は現在完了 (継続時制) + filler (like) + 強調表現 (I swear to god) で感情的 intensity を作る。',
                    lisa: "'It's been like ten years, I swear' -- the 'like' and 'I swear' are where the emotion lives. Without them it's robotic.",
                    takeshi: "10年ぶりに「久しぶりやね」を英語で淡々と言ったら、感動ゼロ。like + swear で感情の湯気出せ。",
                    yuki: "I swear to god、誇張じゃなく感情強調やったんや。連発して使える。",
                    kenji: "再会シーンは仕事でもある。元上司と10年ぶりとか。dude は使えんけど man とかで代用できる。",
                    mina: "\"you haven't changed at all\" って恋愛ドラマでも再会の鉄板セリフやん。感情の厚みが出る。",
                },
            },
            {
                id: 'd30-p-05-negotiation',
                label: '値段交渉 -- 丁寧だが強く押す発音',
                trigger: "買い物で値段交渉する。丁寧に、でもはっきり。",
                points: {
                    core: { en: "Look, I really wanna make this work -- is there any way you could come down a little on the price?", ja: "look (話題導入) + wanna (縮約) + could-you (yod coalescence) + come-down (句動詞)。" },
                    nuance: { en: "I-really-wanna-make-this-work. Persistent but polite.", ja: '「やる気あるよ、でも価格が」の二段構え。英語交渉の定番。' },
                    shift: { en: "Direct: 'Can you lower the price?' (too blunt for negotiation)", ja: '直球すぎると交渉で角が立つ。make it work の前置きで relational を守る。' },
                    native: { en: "Look, I really wanna make this work -- is there any way you could come down a little on the price? I'm seriously ready to close today if we can just meet in the middle.", ja: 'あのさ、マジで前向きに考えたい。価格、少しだけでも下げてもらえる方法ってある? 今日、決める気ある。真ん中で合意できるなら。' },
                },
                trap: 'Can you lower the price? とストレートに聞く。交渉では make it work の前置きと meet in the middle の締めで印象を作る。',
                tip: "交渉シーン専用。Look + I really wanna + is there any way + meet in the middle で4手構えて押す。",
                reactions: {
                    master: '交渉場面の語用論。前置き (look) + 意欲表明 (wanna make this work) + 丁寧な提案 (is there any way) で relational politeness を維持。',
                    lisa: "'Is there any way you could come down?' -- this is like the magic phrase at markets. Sellers respond way better to this than to 'lower the price'.",
                    takeshi: "'Lower the price' は敵対的。'come down a little' は協力的。英語でも言葉1つで温度変わる。",
                    yuki: "is there any way、交渉の黄金フレーズやな。",
                    kenji: "現場で仕入先と交渉する時、この型が使える。直球じゃなく丁寧な押しが効く。",
                    mina: "eBay の DM で \"any way u could come down?\" って書いたら、売り手のトーンがガラッと変わった経験ある。言葉の魔法。",
                },
            },
        ],
    },

    // ══════════════════════════════════════════════════
    // 文法: 実戦パック -- 文法 (5つの高頻度会話)
    // ══════════════════════════════════════════════════
    grammar: {
        title: '実戦パック -- 文法の全要素を5つのリアル会話で使う',
        subtitle: 'オフィス会議・デート後・緊急報告・再会の小話・値段交渉、全部で時制・仮定法・関係詞・cleft を総動員。',
        intro: {
            question: '文法は頭で分かってる。でも実際の会話の速度で、瞬時に出せるのか?',
            insight: 'Month 1 の 28 日で時制・仮定法・関係詞・前置詞・句動詞・冠詞、全部やった。Day 29 で複合構文もやった。最後の関門は「シーン中の発話速度で、正しい時制と構文を瞬時に選べるか」。\n\n文法のテストと会話の違いは、時間制限。テストなら2分悩める問題を、会話では1秒で選ぶ。現在完了か過去形か、仮定法か直説法か、that か which か。瞬時判断の精度は、シーン慣れでしか上がらない。「このシーンではこの構文」のパターンを事前に脳に埋める作業が必要。\n\n今日の5つは、オフィス・デート後・緊急・再会・交渉の各シーンで最も頻出する文法構文だけを集めた。シーンに入った瞬間、反射で出るレベルまで体に叩き込む。ここまで来れば Month 1 の文法は卒業。',
        },
        tldr: 'オフィス・デート・緊急・再会・交渉、各シーンで頻出する文法構文を反射レベルまで運用する。',
        items: [
            {
                id: 'd30-g-01-office-modal',
                label: 'オフィスの会議後 -- 提案の仮定法+助動詞',
                trigger: "「もっと早く言ってたら、違うアプローチ取れたかも」を英語で。",
                points: {
                    core: { en: "If you'd told me earlier, we could've taken a different approach.", ja: "仮定法過去完了 (If you had told) + could have (可能性の過去) の合体。提案・軽い非難の定型。" },
                    nuance: { en: "If-you'd-told-me...we could've taken. Regret + alternative past possibility.", ja: 'オフィスでは直接的非難を避けつつ「もっと早く言って欲しかった」を伝える型。' },
                    shift: { en: "Softer: 'It would've helped to know earlier.' (avoids 'you')", ja: "you を主語にしない言い方で、相手を責めるトーンを完全に消せる。" },
                    native: { en: "Honestly, if you'd told me earlier, we could've taken a different approach -- like, I'm not trying to blame you, but the timing really made this way harder than it had to be.", ja: '正直、もっと早く言ってくれてたら、違うやり方できたかも。いや、責めてるわけじゃないけど、タイミングが悪くて、必要以上に面倒なことになった。' },
                },
                trap: "You should have told me. と非難調で出す。仮定法 + could have に変えると、非難が「惜しかった」のトーンに変わる。",
                tip: "オフィスの「もっと早く〜してくれてたら」は If you'd VP + we could've VP の型で固定。",
                reactions: {
                    master: '仮定法過去完了による counterfactual + could have による能力・可能性の過去。提案と軽い非難のバランスを取る語用論的装置。',
                    lisa: "'If you'd told me earlier, we could've...' -- this is how you complain at work without actually complaining. Very useful.",
                    takeshi: "You should have told me! って直球出したら関係終わる。仮定法で「惜しかった」に変換すると角が取れる。",
                    yuki: "仮定法過去完了、オフィスでこんなに使えるんや。責めずに気持ち伝えられる。",
                    kenji: "現場で頻出。'If you'd flagged this earlier, we could've ordered more stock' とか。反復練習する。",
                    mina: "\"if u'd told me earlier\" って DM でも見る。責めずに気持ち伝える大人の構文。",
                },
            },
            {
                id: 'd30-g-02-date-relative',
                label: 'デートの翌日 -- 関係詞+現在完了で感想',
                trigger: "「昨日行ったレストラン、今まで行った中で一番良かった」を英語で。",
                points: {
                    core: { en: "That restaurant we went to last night was probably the best one I've ever been to.", ja: "関係詞省略 (we went to = [that] we went to) + 最上級 (the best) + 現在完了 (I've ever been to) の合体。" },
                    nuance: { en: "The best one I've ever been to. Lived experience marked by present perfect.", ja: '経験の最上級は現在完了と相性が良い。「今までで一番」の英語型。' },
                    shift: { en: "Past tense: 'The best one I went to.' -- loses the lifetime scope.", ja: '単純過去だと「今までで」の範囲が出ない。現在完了が必須。' },
                    native: { en: "Honestly, that restaurant we went to last night was probably the best one I've ever been to -- like, I'm still thinking about the dessert, it was seriously that good.", ja: '正直、昨日のレストラン、マジで今までで一番かも。デザートまだ頭から離れんし、それくらい良かった。' },
                },
                trap: "The best I went to で済ませる。「今までで」を出すには現在完了 I've ever been to が必須。",
                tip: "「今までで一番〜」は the best X (that) I've ever VP の型。関係詞は省略して話すとカジュアル。",
                reactions: {
                    master: '最上級 + 現在完了 (経験) + 関係詞省略の3要素。lifetime experience を referring するための定型構造。',
                    lisa: "'The best X I've ever had' -- if you want to compliment anything, use this exact pattern.",
                    takeshi: "最上級 + ever + 現在完了、この3点セットが決まると、感想が熱く聞こえる。",
                    yuki: "the best I've ever、褒め方の基本型や。感情の強さが伝わる。",
                    kenji: "取引先に 'The best product I've ever worked with' と言えれば、営業的にも効く。",
                    mina: "SNS で \"best thing I've ever eaten\" って投稿する時、全員これの型やね。",
                },
            },
            {
                id: 'd30-g-03-emergency-passive',
                label: '緊急報告 -- 受動態+現在完了で事実を告げる',
                trigger: "「システムがハックされた、いつかは分からない」を英語で。",
                points: {
                    core: { en: "The system's been hacked -- we don't know when it happened, but we just noticed now.", ja: '現在完了受動態 (has been hacked) + 時間副詞節 (when it happened) + 現在進行 (we just noticed)。' },
                    nuance: { en: "It's-been-hacked...we-don't-know-when. Passive + present perfect emphasizes the current state.", ja: '受動態+現在完了で「やられた状態が今ある」を強調。主語は責任の転嫁を避けるため受動。' },
                    shift: { en: "Active: 'Someone hacked the system.' (focuses on attacker, not state)", ja: '能動態は加害者に焦点。緊急報告では状態 (受動) を先に出す方が効率的。' },
                    native: { en: "Look, the system's literally been hacked -- we honestly don't know when it happened, but we just noticed now and I seriously think we need to get IT involved in the next five minutes.", ja: 'ちょっと、システムがマジでハックされた。正直、いつやられたか分からん。今気づいたばっかで、IT に5分以内に連絡せなあかん。' },
                },
                trap: "Someone hacked our system. と能動態で出す。緊急報告では has been hacked で「現状ある被害」をまず伝える。",
                tip: "緊急受動態は have been + PP の型を反射で出す。加害者特定は後回し。",
                reactions: {
                    master: '現在完了受動態 (has been + past participle) は「現時点での被害状態」を表現する。緊急報告の情報構造として最適。',
                    lisa: "'The system's been hacked' -- I'd use this before 'someone hacked us'. The passive puts the emergency front and center.",
                    takeshi: "'Someone hacked our system' は物語調。'The system's been hacked' は緊急報告調。トーンが全然違う。",
                    yuki: "現在完了受動態、緊急時にこう使えるんや。型で覚える。",
                    kenji: "現場で 'The machine's been damaged' とか、状態先出しの報告スタイルが通じやすい。",
                    mina: "ニュースの見出し、\"X has been hacked\" って形ばっかやん。緊急性を出す受動態。",
                },
            },
            {
                id: 'd30-g-04-reunion-usedto',
                label: '再会での昔話 -- used to + would の習慣表現',
                trigger: "「昔、毎日一緒に食堂で昼食べてたよね」を英語で。",
                points: {
                    core: { en: "Remember when we used to eat lunch together in the cafeteria every day? We'd sit at that same corner table by the window.", ja: 'used to VP (過去の習慣) + would VP (過去の反復行為) の合体。時間的同じ過去を二重にマーク。' },
                    nuance: { en: "We used to eat...we'd sit. Used to establishes the period, would fills in the habits.", ja: 'used to で過去の一区切り (もう今はやってない) を設定し、would で中の繰り返し行動を描写。' },
                    shift: { en: "Simple past: 'We ate lunch together every day.' -- loses the nostalgic lens.", ja: '単純過去だと事実のみ。used to + would で懐かしさのレンズが掛かる。' },
                    native: { en: "Dude, remember when we used to eat lunch together in the cafeteria every day? We'd sit at that same corner table by the window -- honestly, I still think about those afternoons sometimes.", ja: 'なあ、昔、毎日食堂で一緒に昼食べてたやん。窓際のあの角の席でさ。正直、たまにあの頃の午後のこと思い出すわ。' },
                },
                trap: 'We ate lunch every day. と単純過去で出す。used to + would で「懐かしい昔」の枠組みを作る。',
                tip: "「昔〜だった」の懐かしさは used to で枠を設定し、個別習慣を would で入れる2段構え。",
                reactions: {
                    master: "used to は terminative habit (今は終わった習慣)、would は iterative past (過去の反復行為)。組み合わせで「懐かしい時代」の物語を作る。",
                    lisa: "'Remember when we used to...' is like THE nostalgia opener. Every reunion convo starts with this.",
                    takeshi: "used to と would の合体、再会で絶対出る。これ使えないと昔話が平板に終わる。",
                    yuki: "used to と would が両方使えるの知らんかった。使い分け練習する。",
                    kenji: "旧同僚との再会で 'We used to grab drinks after work, didn't we?' で過去を共有できる。温まる。",
                    mina: "\"we used to...\" って TikTok の思い出系動画で超よく出る。ノスタルジアの起動スイッチ。",
                },
            },
            {
                id: 'd30-g-05-negotiation-conditional',
                label: '値段交渉 -- if + would の条件提示',
                trigger: "「50ドルまでなら今日買う」を英語で。",
                points: {
                    core: { en: "If you could do fifty, I'd buy it right now -- like, I've got the cash on me and we can close this today.", ja: '仮定法現在 (If you could) + 主節の would (I would buy) + 現在完了 (I\'ve got) の3層。' },
                    nuance: { en: "If-you-could-do-fifty...I'd-buy-it-right-now. Conditional offer with immediate payoff.", ja: '条件提示 + 即決の提案で売り手に「今決めれば取れる」感を作る。' },
                    shift: { en: "Direct: 'I'll pay fifty.' (no room for negotiation)", ja: '直球だと価格を押し付けてる形。if conditional で選択権を相手に残す。' },
                    native: { en: "Honestly, if you could do fifty, I'd buy it right now -- like, I've literally got the cash on me and we can close this today, no need to overthink it.", ja: '正直、50にしてくれるなら、今すぐ買う。マジで現金持ってるし、今日で決めれるから、考えすぎなくていい。' },
                },
                trap: "I'll pay fifty dollars. と一方的に提示。仮定法 if you could + I'd で相手に選択権を与える型が交渉の肝。",
                tip: "交渉の仮定法。If you could + 数字 + I'd buy の型で「条件 + 即決」を1文に収める。",
                reactions: {
                    master: '仮定法 (If you could) + 条件法 (would buy) + 現在完了 (have got) の3層。条件提示と immediate commitment の情報構造。',
                    lisa: "'If you could do fifty, I'd buy it right now' -- sellers at markets respond to this like magic. It shows you're serious but respectful.",
                    takeshi: "交渉で一方的に価格提示するな。'If you could do X, I'd VP' の型で相手に選択させるのが大人の交渉。",
                    yuki: "仮定法が交渉で使えるの、目から鱗や。",
                    kenji: "仕入れ交渉で 'If you could match their price, we'd go with you' で使える。即実戦。",
                    mina: "メルカリの値下げ交渉で \"if you could do 3000, I'd buy it tonight\" 的な DM、割と刺さる。",
                },
            },
        ],
    },
};
