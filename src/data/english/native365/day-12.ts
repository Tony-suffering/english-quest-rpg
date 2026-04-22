import type { Native365Day } from '@/types/native365';

/**
 * Day 12
 *
 * 発音: 弱形 vs 強形 (can / at / for / and) -- 機能語の2面性
 * 文法: used to vs would -- 過去の習慣の2つの言い方
 */

export const DAY_12: Native365Day = {
    day: 12,
    week: 2,
    month: 1,

    // ══════════════════════════════════════════════════
    // 扉絵: カウンター奥
    // ══════════════════════════════════════════════════
    opening: {
        scene: "カウンター奥。ミナが \"I can swim\" を聞き取れずに can と can\\'t を取り違えた話で盛り上がる。",
        lines: [
            { char: 'mina',   text: "can と can't、聞き分け無理やん。両方「キャン」に聞こえる。" },
            { char: 'master', text: "can は普段 /kən/ って弱形。強形 /kæn/ で読む時は肯定の強調か、文末の時だけだ。" },
            { char: 'kenji',  text: "昔こういう時は used to やった、って話す時も、used to と would で意味違うんやろ?そこもまとめてくれ。" },
        ],
    },

    // ══════════════════════════════════════════════════
    // 発音: 弱形 vs 強形
    // ══════════════════════════════════════════════════
    pronunciation: {
        title: '弱形 vs 強形 (can / at / for / and) -- 機能語の2面性',
        subtitle: '同じ単語が、強勢を取る時と取らない時で別音になる。このスイッチが聴き取りの核。',
        intro: {
            question: "なぜ can と can\\'t が区別できないのか?",
            insight: "can は文中で機能語として使われる限り /kən/(弱形)で発音される。母音が schwa に化け、ほぼ「くん」に聞こえる。一方 can\\'t は否定の内容を伝えるため強勢を取り /kænt/(強形)で発音される。つまり「キャン」に聞こえたら肯定、「キャント」に聞こえたら否定、ではなく、「くん」=肯定、「キャン(ト)」=否定、が正しい耳の作り方。\\n\\nこれは can に限らず、英語の機能語(前置詞・接続詞・助動詞・冠詞)すべてに共通する現象。at は普段 /ət/、for は /fər/、and は /ən/ や /n/ にまで縮む。強勢を取る瞬間(対比・強調・文末)だけ本来の強形に戻る。\\n\\n日本語脳は単語ごとに「正しい発音」が1つだと思っている。英語は違う。同じ単語が文中の役割で2つの姿を持つ。この2面性を耳と口に刻むのが今日のミッション。",
        },
        tldr: 'can/at/for/and の弱形を耳と口に入れる。強形は強調・対比・文末の合図。',
        items: [
            {
                id: 'd12-p-01-can',
                label: 'can -- 弱形 /kən/ と強形 /kæn/',
                trigger: "'I can swim' を発音しろ。",
                points: {
                    core: { en: '/kən/ (weak) vs /kæn/ (strong)', ja: '通常は弱形 /kən/、強調や文末で強形 /kæn/。' },
                    nuance: { en: 'I kən SWIM. (weak) Yes I KÆN! (strong)', ja: '肯定文の中では can は弱く、強勢は本動詞に乗る。can\'t は常に強勢を取る。' },
                    shift: { en: 'Can you help? -- kən ya HELP? / Yes, I can. -- YES I KÆN.', ja: '文末に来る時は省略できないので強形に戻る。' },
                    native: { en: "I kən DO it -- not I KÆN do it.", ja: '強調したい時だけ強形。普段は弱形で動詞に主役を譲る。' },
                },
                trap: "can を常に /kæn/ で読む。その結果、can't との聞き分けも話し分けもできなくなる。",
                tip: "can が出たら口を脱力して /kən/、本動詞に力を込める。can\\'t は口をしっかり開けて強勢。",
                reactions: {
                    master: '助動詞は機能語なので原則弱形。強形に戻る条件は[文末][強調][対比]の3つ。',
                    lisa: "If you say 'I KAN do it' with the full vowel, I'll think you're being weirdly emphatic.",
                    takeshi: "can/can\\'t の聞き分け、これが分からない限り洋画は永遠に砂嵐。弱形から入れ。",
                    yuki: '弱形の存在を知らなかった…can がずっと /kæn/ だと思ってた。',
                    kenji: '現場で I can do it って言う時、kən で軽く出せば本動詞の do に力乗って自然。',
                    mina: "TikTok で \"I can\\'t even\" ってミーム、あれ can\\'t の強形やん。弱形の can と全然違うね。",
                },
            },
            {
                id: 'd12-p-02-at',
                label: 'at -- 弱形 /ət/、強形はほぼ使わない',
                trigger: "'at the station' を発音しろ。",
                points: {
                    core: { en: '/ət/ (weak, 99%) vs /æt/ (strong, rare)', ja: '前置詞 at はほぼ常に /ət/。強形はほぼ使われない。' },
                    nuance: { en: 'ət the STATION. at 自体は音をほとんど持たない。', ja: 'at は場所の目印としての情報量しかない。強勢は後ろの名詞。' },
                    shift: { en: 'fast: "the STATION" とほぼ at が消えることも。', ja: '特に場所が明白な時は at がほぼ聞こえなくなる。' },
                    native: { en: "Meet me ət the CAFÉ at SEVEN.", ja: 'at が2個あっても両方弱形。情報は CAFÉ と SEVEN にある。' },
                },
                trap: 'at を「アット」と2拍で読む。英語は1拍以下の /ət/。',
                tip: 'at を「ət」と飲み込む。後ろの名詞に全ての音量を乗せる。',
                reactions: {
                    master: '前置詞は典型的な機能語。通常弱形、強形は対比 (AT the door, not IN the house) の時のみ。',
                    lisa: "'At the station' sounds like 'ə-the-station'. The 't' barely touches.",
                    takeshi: '「アット」と言ってる間は、英語のリズムが体に来ない。ət、短く薄く。',
                    yuki: 'at が /ət/ なの、機能語だからって理由で納得できた。',
                    kenji: 'at seven, at home, at work、全部弱形で出せるだけで急にネイティブ度上がる。',
                    mina: 'SNS の "see u at 8" とか、at ほぼ書かれないくらい弱いよね。発音もそれや。',
                },
            },
            {
                id: 'd12-p-03-for',
                label: 'for -- 弱形 /fər/、強形 /fɔːr/',
                trigger: "'This is for you' を発音しろ。",
                points: {
                    core: { en: '/fər/ (weak) vs /fɔːr/ (strong)', ja: '通常は /fər/(f + schwa + r)、強調や対比で /fɔːr/。' },
                    nuance: { en: 'This is fər YOU. For と FOR は別音。', ja: '母音が ə か ɔː かでリズムが変わる。弱形だと「ふぁ」くらい。' },
                    shift: { en: 'Is this for me or for her? -- fər ME or fər HER?', ja: '文中の対比でも通常は弱形のまま、対比される名詞に強勢が乗る。' },
                    native: { en: "Thanks fər COMING.", ja: '感謝の定番。for は音を持たず、動詞に譲る。' },
                },
                trap: '「フォー」と長母音で読む。英語の for は短い /fər/ が基本。',
                tip: 'for が出たら「ふぁ(ə)」で通り抜ける。後ろの内容語に音量を集中。',
                reactions: {
                    master: 'for は for + 名詞 / for + -ing で超頻出。機能語として常時弱形、強形は強調の時のみ。',
                    lisa: "'Thanks fər coming' -- I probably say 'for' like 'fr' in fast speech. Almost no vowel.",
                    takeshi: 'for を「フォー」と伸ばすたびに、英語のリズムが1拍崩れる。ə で薄く。',
                    yuki: 'for が /fər/ なの意識したら、Thanks for coming が一気に英語っぽく聞こえた。',
                    kenji: 'for the meeting、fər the MEETING のリズムで、相手に意図が伝わる。',
                    mina: '"4U" って SNS 略語、あれ for = 4(fɔːr) の強形の音に寄せてるんやね。弱形とは別音。',
                },
            },
            {
                id: 'd12-p-04-and',
                label: "and -- 弱形 /ən/ や /n/ まで縮む",
                trigger: "'fish and chips' を発音しろ。",
                points: {
                    core: { en: '/ən/ or /n/ (weak) vs /ænd/ (strong)', ja: '通常は /ən/、さらに縮むと /n/ のみ。強形 /ænd/ は対比や強調のみ。' },
                    nuance: { en: 'FISH ən CHIPS. Or FISH\'n CHIPS with just a short n.', ja: 'and は子音だけで繋ぐ。d はほぼ落ちる。' },
                    shift: { en: 'rock and roll -> rock\'n\'roll / salt and pepper -> salt\'n\'pepper.', ja: '定型句では and が \'n\' と書かれるほど縮む。' },
                    native: { en: "I went to the store ən got some milk.", ja: '文中の and は /ən/ が普通。d の存在を忘れる。' },
                },
                trap: '「アンド」と3拍で読む。英語は d がほぼ落ちた /ən/。',
                tip: 'and を「ən」で通す。さらに早い会話では n だけ残してスルー。',
                reactions: {
                    master: '接続詞 and は典型的な機能語。通常弱形、強形は「A か B か」の対比で A AND B と強調する時のみ。',
                    lisa: "'Fish and chips' is 'fish-n-chips'. The 'a' and 'd' are basically gone.",
                    takeshi: '「アンド」で3拍使ってたら、英語のリズムが作れない。n だけでいい。',
                    yuki: "rock\\'n\\'roll の \\'n\\' って、弱形 and の表記やったんか…納得。",
                    kenji: '現場で A and B と言う時、ən でサラッと繋げたら格好ええ。',
                    mina: 'SNS の "salt n pepper" 表記、あれ発音そのまま書いてるだけやん。',
                },
            },
            {
                id: 'd12-p-05-of-from-have',
                label: "of / from / have -- 他の主要な弱形",
                trigger: "'a lot of them' / 'I have to go' を発音しろ。",
                points: {
                    core: { en: 'of /əv/, from /frəm/, have /əv/ or /ə/', ja: 'これらも典型的な弱形機能語。母音が schwa に化ける。' },
                    nuance: { en: "a LOT-əv THEM, FRəm HOME, I ə-GOT-ə...", ja: '機能語は情報を持たない。弱化して当然。' },
                    shift: { en: "I could have -> I could\'ve -> I coulda. have to -> hafta.", ja: 'have は助動詞として使われると /əv/ になり、さらに縮約形 -\'ve になる。' },
                    native: { en: "I should-ə told you. (I should have told you.)", ja: 'should have が should-ə まで縮むのが英語の自然形。書き言葉と音は別物。' },
                },
                trap: 'of を「オフ」、from を「フロム」、have を「ハヴ」と全部強形で読む。英語が硬くなる。',
                tip: 'これら機能語が出たら全て弱形 (ə を含む形) で処理する、とルール化する。',
                reactions: {
                    master: '英語の機能語は原則弱形、という1つのメタルールで処理すると発音もリスニングも安定する。',
                    lisa: "'I could have gone' -> 'I coulda gone' in real speech. Every single time.",
                    takeshi: '弱形のルール、1つ覚えれば全機能語に適用できる。個別に覚える必要なし。',
                    yuki: '機能語は全部弱形、ってシンプルなルールがあるって知って楽になった。',
                    kenji: '現場英語で from Monday、frəm MONDAY のリズムで出せたら、通じる率上がる。',
                    mina: "SNS で \"coulda shoulda woulda\" って歌詞あるやん。あれ全部弱形+of(ve) の縮約形やね。",
                },
            },
        ],
    },

    // ══════════════════════════════════════════════════
    // 文法: used to vs would
    // ══════════════════════════════════════════════════
    grammar: {
        title: 'used to vs would -- 過去の習慣の2つの言い方',
        subtitle: '「昔〜してた」の英訳、used to と would で意味範囲が違う。動詞の種類で選ぶ。',
        intro: {
            question: 'なぜ日本人は would で過去の習慣を表せないのか?',
            insight: '日本語は「昔〜していた」の1表現で、過去の状態と過去の反復行動を区別しない。「昔タバコ吸ってた」(反復行動 + 状態)も「昔背が低かった」(状態のみ)も同じ構造で言える。\n\n英語は違う。used to は状態・習慣どちらもカバーする万能選手。would(過去の習慣の would)は反復された行動のみをカバーし、状態には使えない。I used to live in Tokyo は OK だが、I would live in Tokyo は不自然(live は状態動詞)。\n\nさらに used to には「今はもうしていない / そうではない」という含みがある。would にはその含みは薄く、単に「当時の習慣」を述べるだけ。回想のトーンを出したい時は would、変化の意味を強調したい時は used to。この2軸で選ぶ。',
        },
        tldr: '動作動詞+習慣=used to / would 両方OK。状態動詞=used to のみ。',
        items: [
            {
                id: 'd12-g-01-smoke',
                label: 'used to smoke -- 動作動詞の習慣',
                trigger: '「昔タバコ吸ってた」を英語で。',
                points: {
                    core: { en: 'I used to smoke.', ja: '過去の習慣。今はもう吸っていない、という変化の含み。' },
                    nuance: { en: 'I would smoke after dinner every night.', ja: 'would は「当時の習慣」の回想。具体的な場面と一緒に使うのが自然。' },
                    shift: { en: 'used to = 今と対比、変化が焦点。would = 当時の様子、回想が焦点。', ja: '両方使える動作動詞でも、伝えたいニュアンスで選ぶ。' },
                    native: { en: "I used to smoke, but I quit last year.", ja: 'used to + quit / stop / changed の流れで、変化を明示するのが王道。' },
                },
                trap: '「昔〜してた」を全部 I was -ing で訳す。これは「ある時点の進行中」であって習慣ではない。',
                tip: '過去の反復習慣=used to または would。過去進行形は「ある時点で進行中」の別概念。',
                reactions: {
                    master: 'used to は状態・動作両方OKの万能形。would (習慣の would) は動作のみ。この2つの範囲の違いが鍵。',
                    lisa: "'I used to smoke' tells me you quit. 'I would smoke after dinner' is you painting a picture.",
                    takeshi: '「昔〜してた」の英訳、was -ing で逃げてる奴は今日卒業。used to / would の2択。',
                    yuki: 'would にこんな用法があったなんて…「だろう」で習ってたから混乱してた。',
                    kenji: '昔の現場の話する時、"we would work till midnight" で would 使えたら一気に語りの味出る。',
                    mina: 'SNS で "I used to..." から始まる投稿、あれ変化の含みがあって読者が先を気にする構文やね。',
                },
            },
            {
                id: 'd12-g-02-live',
                label: 'used to live -- 状態動詞には used to のみ',
                trigger: '「昔京都に住んでた」を英語で。',
                points: {
                    core: { en: 'I used to live in Kyoto.', ja: '住む=状態動詞。would は使えない。' },
                    nuance: { en: 'I would live in Kyoto. -- ungrammatical for past habit.', ja: 'would + 状態動詞は過去習慣にならない。「住むだろう」の仮定法的な意味になってしまう。' },
                    shift: { en: 'I used to have long hair. I used to be shy.', ja: 'have, be, know, like, love, own などの状態動詞は全部 used to 専用。' },
                    native: { en: "I used to live in Kyoto for three years back in my twenties.", ja: '今はもう住んでいないことが明確に伝わる。' },
                },
                trap: '過去の状態に would を使う。live / have / be / know などの状態動詞に would は不可。',
                tip: '動詞が状態動詞(-ing 化が不自然なもの)なら used to 一択、と覚える。',
                reactions: {
                    master: '状態動詞 = 変化しない状態を表す動詞 (live, have, know, be, like...)。would の反復習慣用法とは相性不可。',
                    lisa: "'I would live in Kyoto' sounds like you're describing a hypothetical future, not a past habit.",
                    takeshi: 'live に would を当てた瞬間、ネイティブは「え、今から住むの?」って混乱する。状態動詞は used to 一択。',
                    yuki: '状態動詞と動作動詞で分かれるの、整理できたらシンプルやね。',
                    kenji: '昔の経歴話す時、used to live / used to work で揃える。would は状態に使わない。',
                    mina: 'プロフで "used to be shy, now loud" みたいな対比、変化の含み活かせて刺さるな。',
                },
            },
            {
                id: 'd12-g-03-would',
                label: 'would -- 回想モードの合図',
                trigger: '「昔は日曜になるとよく海に行ってた」を英語で。',
                points: {
                    core: { en: 'On Sundays we would go to the beach.', ja: '回想の would。「よく〜したものだ」のトーン。' },
                    nuance: { en: 'On Sundays we used to go to the beach.', ja: 'used to でも意味は通るが、would の方が回想の味が濃い。' },
                    shift: { en: 'When I was a kid, I would spend hours reading.', ja: '時間の設定 (when I was young, back then, on weekends) があると would が映える。' },
                    native: { en: "Every summer, my grandpa would take us fishing.", ja: 'every / on + 時間 との組み合わせが would の王道。回想文学調。' },
                },
                trap: 'would を単独で文頭に置くと過去習慣か仮定法か分からない。時間設定(when, on, every)で回想を明示する。',
                tip: '時間の舞台設定+would で「あの頃はよく〜したもんだ」の回想モードを作る。',
                reactions: {
                    master: '回想の would は時間の舞台設定との組み合わせで強くなる。単独では仮定法と区別がつかない。',
                    lisa: "'Every summer, my dad would take us camping' -- this makes me instantly nostalgic. Pure storytelling.",
                    takeshi: 'would は回想のギア。舞台設定を添えないと仮定法に聞こえて場面が濁る。',
                    yuki: 'would にこんな情緒的な響きがあるんや。使えたら語りが豊かになりそう。',
                    kenji: '"back in the day, we would work from dawn" って昔話、ベテランの語り口や。真似したい。',
                    mina: 'SNS のノスタルジック投稿、"we would stay up all night" みたいな would 回想、刺さるやつ。',
                },
            },
            {
                id: 'd12-g-04-negative',
                label: "否定形 -- didn\\'t use to vs wouldn\\'t",
                trigger: '「昔は魚食べなかった」を英語で。',
                points: {
                    core: { en: "I didn't use to eat fish. / I didn't used to eat fish.", ja: '否定は didn\'t use to。used の d を落とす形と落とさない形、どちらも口語ではあり。' },
                    nuance: { en: "I wouldn't eat fish (= as a habit, I refused).", ja: 'wouldn\'t は「頑として〜しなかった」の拒否のニュアンス。強い。' },
                    shift: { en: "I never used to like fish (= same meaning, softer).", ja: 'never used to の形の方が口語では一般的で、響きが柔らかい。' },
                    native: { en: "I never used to eat fish, but now I love it.", ja: '変化の含みを強調するなら never used to + but now が王道。' },
                },
                trap: "否定の didn\\'t used to が文法的にダメと思い込む。口語ではどちらも通る。never used to も使える。",
                tip: "否定のニュアンス: 単に習慣がなかった=didn\\'t use to / never used to。頑なに拒否してた=wouldn\\'t。",
                reactions: {
                    master: "否定形は didn\\'t use to が規範文法、didn\\'t used to が口語慣用。never used to が最自然な口語形。",
                    lisa: "'I wouldn't eat fish' sounds like you were a stubborn kid. 'I never used to' is just a fact.",
                    takeshi: "wouldn\\'t は拒否のニュアンスが強い。単に習慣がなかった時は never used to の方が無難。",
                    yuki: "wouldn\\'t にこんな意味があるんや。学校で習わなかった。",
                    kenji: '昔の自分の話、"I never used to drink" の方が素直でええな。',
                    mina: "\"I wouldn\\'t be caught dead...\" みたいな強い否定、SNS の ネタで見るやつ、この wouldn\\'t やん。",
                },
            },
            {
                id: 'd12-g-05-question',
                label: '疑問形 -- did you use to + 動詞 の形',
                trigger: '「昔ピアノ習ってた?」を英語で。',
                points: {
                    core: { en: 'Did you use to play piano?', ja: '疑問形は did + 主語 + use to + 動詞。use の s と d が落ちる。' },
                    nuance: { en: 'Did you used to play piano? (口語では d 付きも聞く)', ja: 'd を付ける形も口語では普通。書き言葉では use to が規範。' },
                    shift: { en: 'Were you used to playing piano? (これは別の意味!)', ja: 'be used to + -ing は「〜に慣れている」の別構文。混同注意。' },
                    native: { en: "Didn't you use to play the guitar?", ja: '否定疑問で「昔〜してなかったっけ?」の確認。ネイティブ頻出。' },
                },
                trap: 'be used to + -ing(〜に慣れている)と used to + 動詞(昔〜してた)の混同。全く別の構文。',
                tip: 'used to の後が原形動詞なら過去習慣、-ing or 名詞なら「慣れている」。これだけで区別できる。',
                reactions: {
                    master: 'used to + 原形 (過去習慣) vs be used to + -ing / 名詞 (慣れ)。形で完全に区別できる。',
                    lisa: "'I'm used to waking up early' vs 'I used to wake up early' -- totally different. Watch the 'be'.",
                    takeshi: '"be used to" と "used to" の混同、ここ日本人の鉄板ミス。-ing が来たら慣れ、原形なら過去習慣。',
                    yuki: '2つの used to、形と意味を分けて覚えられた。もう混同しない。',
                    kenji: "\"I\\'m used to long shifts\" は現場で毎日使える。昔の話の used to と別物やな。",
                    mina: "\"I\\'m used to it\" って SNS でめっちゃ見る。あれ慣れの方、過去習慣じゃないんや。",
                },
            },
        ],
    },
};
