import type { Native365Day } from '@/types/native365';

/**
 * Day 1
 *
 * 発音: schwa /ə/        -- 映画の英語が砂嵐に聞こえる理由
 * 文法: 現在完了 vs 過去形 -- 日本語脳が時制で詰まる理由
 */

export const DAY_01: Native365Day = {
    day: 1,
    week: 1,
    month: 1,

    // ══════════════════════════════════════════════════
    // 扉絵: 夜の居酒屋
    // ══════════════════════════════════════════════════
    opening: {
        scene: '夜の居酒屋。カウンター。TOEIC 900 を取った翌週、ネイティブとの会話で3秒で詰んだ男の相談から始まった。',
        lines: [
            { char: 'lisa',    text: "お前、about の「ア」に力入れすぎ。英語はあそこ、消す音なんだよ。" },
            { char: 'master',  text: "それが schwa だ。英語の母音の40%が消える。これが分かれば、映画が聞き取れない理由の半分は解ける。" },
            { char: 'takeshi', text: "あと過去形と現在完了もな。「なくした」を日本語の一択で処理してる限り、英語の時間軸が見えねえ。" },
        ],
    },

    // ══════════════════════════════════════════════════
    // 発音: schwa /ə/
    // ══════════════════════════════════════════════════
    pronunciation: {
        title: 'schwa /ə/ -- 映画の英語が砂嵐に聞こえる正体',
        subtitle: '母音の40%が消えてる。全部拾おうとする限り、耳は追いつかない。',
        intro: {
            question: 'なぜネイティブの英語はこんなに速く聞こえるのか?',
            insight: '日本語はモーラ拍(mora-timed)。「あ・り・が・と・う」5拍すべてが等しい時間を取る。英語は強勢拍(stress-timed)。強勢のある音節だけが拍を刻み、他は時間的に圧縮される。\n\n結果、ネイティブの会話で母音の40%は /ə/(schwa) に化けてる。「about」は「u-BOUT」、「today」は「t-DAY」、「of」は「uhv」。あなたが全音節を均等に聴こうとする限り、リズムの骨格が掴めず、耳がパンクする。\n\n今日の5単語で、「弱化」という英語の核の動作を体に入れる。これが掴めれば、映画の1割が聞き取れるようになる。',
        },
        tldr: 'about / today / banana / of / to の5語で schwa の感覚を体に入れる。',
        items: [
            {
                id: 'd1-p-01-about',
                label: 'about -- 「ア」じゃなく「ə(脱力)」',
                trigger: "'about' を声に出して3回。",
                points: {
                    core: { en: '/əˈbaʊt/', ja: 'a- は schwa、-BOUT に強勢。' },
                    nuance: { en: "It's u-BOUT, not A-bout. Energy lives on BOUT.", ja: '最初の a に力を入れない。-BOUT だけ立てる。「アバウト」とは別物。' },
                    shift: { en: "Fast speech collapses to 'bout: 'Bout time you showed up.", ja: "カジュアル会話では a- が完全に消えて 'bout になる。頻出。" },
                    native: { en: "It's u-BOUT five minutes away.", ja: '道案内の定型。a を抜けるだけで一気にネイティブ度が上がる。' },
                },
                trap: 'カタカナ「アバウト」で2拍均等。英語は1拍 (BOUT) +脱力 (u) の波。',
                tip: 'a を「うぁ」の弱い最短版、と思ってそっと流す。ほぼ b から始まる気持ち。',
                reactions: {
                    master: 'schwa は英語最頻出の母音。機能語と接頭辞は原則ここに落ちる。これを制すのが発音の入口。',
                    lisa: "When I hear 'A-BOUT' with energy on the A, I know it's a Japanese speaker. Just drop it.",
                    takeshi: '「アバウト」の「ア」に力入れてる限り、ネイティブの波に乗れねえ。入口でつまずくな。',
                    yuki: 'え、今までずっと「アバウト」って均等に読んでた…今日から直す。',
                    kenji: '現場で about five minutes と言う機会、1日何度も出る。u-BOUT でいきたい。',
                    mina: "TikTok の字幕で \"'bout\" ってよく見る。あれ schwa が完全に落ちた表記やったんや。",
                },
            },
            {
                id: 'd1-p-02-today',
                label: 'today -- 「トゥ」はほぼ無音',
                trigger: "'today' を発音しろ。",
                points: {
                    core: { en: '/təˈdeɪ/', ja: 'to- は schwa、-DAY に強勢。' },
                    nuance: { en: "t-DAY. The 'o' is a ghost.", ja: 'to を「トゥ」と強く読むと too-day に聞こえる。' },
                    shift: { en: "'How ya doin' t-DAY?' -- 'to' almost vanishes.", ja: '日常会話では to- がほぼ消える。DAY だけが聞こえる。' },
                    native: { en: "t-DAY's the day.", ja: '決意の定型句。to- は発音しないに等しい。' },
                },
                trap: '「ト-ウ-デイ」と3拍。英語は2拍 (t-DAY)。',
                tip: 'to を「t+ə」と割って ə を最小にする。実質ほぼ t だけ残る。',
                reactions: {
                    master: 'to は前置詞でも不定詞でも schwa 化。content word 以外は原則弱化、と覚えろ。',
                    lisa: "When I say 'today' my 'to' is basically silent. Don't overthink it.",
                    takeshi: '「トゥデイ」の「トゥ」に力入れるほど、英語が遠ざかる。弱く、薄く。',
                    yuki: 'to- 飲み込むの、意識して練習する。',
                    kenji: '「今日中に」って言う時 today に力入れずに済むのか。楽になる。',
                    mina: "SNS で today が \"t'day\" になってる英語字幕、多い。省略のセンス磨ける。",
                },
            },
            {
                id: 'd1-p-03-banana',
                label: 'banana -- 強勢なしの母音は全部 schwa',
                trigger: "'banana' を3回、リズムを意識して。",
                points: {
                    core: { en: '/bəˈnænə/', ja: '強勢は真ん中の NA だけ。前後の a は両方 schwa。' },
                    nuance: { en: "b-NAN-uh. One strong syllable, two reduced.", ja: '山1つ・谷2つ。英単語の基本波形。' },
                    shift: { en: 'UK /bəˈnɑːnə/, US /bəˈnænə/ -- middle vowel differs, schwas stay.', ja: '英米で真ん中だけ違い、前後の schwa は共通。' },
                    native: { en: "I'll have a b-NAN-uh bread, please.", ja: 'カフェの定型。名詞1個でリズムが体に入る。' },
                },
                trap: '「バナナ」3音節等価。リズムが死ぬ。',
                tip: '真ん中だけ強く、前後は飲み込む。山を1つだけ作る意識。',
                reactions: {
                    master: '英語は stress-timed。強勢1箇所集中、他は時間的に圧縮される。banana はその見本。',
                    lisa: "BA-NA-NA with three equal beats sounds like a song, not a word. Middle one only.",
                    takeshi: '日本語は平坦、英語は山と谷。banana の波形で他の単語も削れるようになる。',
                    yuki: '中学で習った単語なのにリズムは全然違ったんや…悔しい。',
                    kenji: '海外現場でフルーツ頼む時、バナナで詰まったら恥ずかしい。メモ。',
                    mina: 'banana に schwa が2個入ってるって知ってから英語の見方ガラッと変わった。',
                },
            },
            {
                id: 'd1-p-04-of',
                label: "of -- 'uhv' か 'uh' だけ",
                trigger: "'a cup of tea' を発音しろ。",
                points: {
                    core: { en: '/əv/ or /ə/', ja: 'of は schwa + v。強勢は取らない。' },
                    nuance: { en: "CUP-uhv-TEA. 'Of' is glue.", ja: 'of は接着剤。音量を持たない機能語。' },
                    shift: { en: "Fast speech: 'CUP-a TEA' -- the 'v' drops entirely.", ja: '早い会話では v まで落ちて「a」だけ残る。' },
                    native: { en: "lotta / kinda / sorta / coulda / woulda / shoulda.", ja: 'a lot of / kind of / could have などの of/have は全部 schwa 化した表記。' },
                },
                trap: '「オフ」と読む。それは off。of は「uhv」か「uh」。',
                tip: 'of が出たら一切力を入れない。前後の content word に音を譲る。',
                reactions: {
                    master: 'function words (前置詞・冠詞・助動詞) は基本 schwa 化。content word だけが強勢を持つ。',
                    lisa: "I've literally never said 'of' with the full /ɒv/ in casual conversation. Always 'uhv' or 'uh'.",
                    takeshi: 'of を「オフ」と読む瞬間、英会話が紙になる音がする。ここで詰まるな。',
                    yuki: 'a cup of tea の of、全然力入れなくていいって知って肩の荷下りた。',
                    kenji: 'out of stock とか、out-uhv-stock のリズムで言えたら余裕感出る。',
                    mina: '「kinda」「sorta」って SNS でずっと見るやつ、全部 of/sort of の schwa 形やったんやな。',
                },
            },
            {
                id: 'd1-p-05-to',
                label: "to -- 「トゥー」じゃなく「tuh」",
                trigger: "'I want to go' を発音しろ。",
                points: {
                    core: { en: '/tə/ before consonants', ja: '子音の前では schwa /tə/、母音の前では /tu/。' },
                    nuance: { en: "WANT-tuh-GO. 'To' barely audible.", ja: '強勢なしの to は「tuh」。ほぼ飲み込まれる。' },
                    shift: { en: "want to -> wanna. have to -> hafta. got to -> gotta.", ja: 'to が前の動詞と融合して一音節化する。カジュアル口語の鉄板。' },
                    native: { en: "I WAN-uh-GO. (= I want to go.)", ja: 'ネイティブは wanna と書かなくても、音はこれ。' },
                },
                trap: 'to を「トゥー」と2拍で読む。英語は1拍の tuh。',
                tip: 'to が出たら「t+ə」で ə を最小に。結果ほぼ t だけ残る。',
                reactions: {
                    master: '不定詞の to、前置詞の to どちらも通常 schwa 化。強調・対比の時だけ強勢。',
                    lisa: "'I wanna' / 'I hafta' -- written that way but literally how I talk every day.",
                    takeshi: "'to' の発音1つで英語話者か日本人か一発で分かる。ここ攻略で世界が変わる。",
                    yuki: 'want to を wanna で習ったけど、to 全部 schwa 化する規則やったのね。',
                    kenji: 'need to do this、need-tuh-do-this で出せたら現場の英語。',
                    mina: 'wanna, gotta, gonna、SNS の字幕で見てたやつ、全部 to の schwa 化か。',
                },
            },
        ],
    },

    // ══════════════════════════════════════════════════
    // 文法: 現在完了 vs 過去形
    // ══════════════════════════════════════════════════
    grammar: {
        title: '現在完了 vs 過去形 -- 日本語脳が詰まる時間軸のズレ',
        subtitle: '「なくした」を日本語の一択で処理してる限り、I did と I\'ve done は選べない。',
        intro: {
            question: 'なぜ日本人は現在完了を使えないのか?',
            insight: '日本語には「過去」「現在」「未来」の3つの時間しかない。「〜した」で過去、「〜する」で現在と未来。完了形は存在しない。\n\n英語の現在完了 (have + 過去分詞) は時制ではなく「視点の置き方」。「今から振り返って過去の出来事を見る」という特殊な視線を動詞で表現する。この視線は日本語脳にない。だから I lost と I\'ve lost が同じ「なくした」に見えて、選べない。\n\n解決策は1つ。ルールの分類 (完了・経験・継続) を暗記しない。「今に影響が残ってるか?」この1軸だけで切り分ける。鍵を今も探してるなら現在完了、もう見つかって話題が終わってるなら過去形。それだけ。',
        },
        tldr: '「今に影響が残ってるか?」の1軸で I did / I\'ve done を切る。',
        items: [
            {
                id: 'd1-g-01-keys',
                label: "I lost vs I've lost -- 鍵の話",
                trigger: '「鍵なくした」を英語で。',
                points: {
                    core: { en: 'I lost my keys.', ja: '過去の出来事としての事実。今は見つかってるかもしれない。' },
                    nuance: { en: "I've lost my keys.", ja: '今も無い。今まさに困ってる。現在に影響を残している。' },
                    shift: { en: 'I lost them yesterday / last night / on Tuesday.', ja: '「いつ」を特定する語があると原則過去形。現在完了と specific time は相性が悪い。' },
                    native: { en: "I've lost my keys -- help me look.", ja: '現在の助けを求めるトーン。過去形だと「あ、なくしたんだ」で終わって助け要請にならない。' },
                },
                trap: 'どっちも「なくした」と訳せるから日本語からだと選べない。「今どうなってるか」で決まる。',
                tip: '「今も影響あるか?」Yes → 現在完了。No / 終わってる → 過去形。',
                reactions: {
                    master: '過去形は「出来事の時点」に焦点、現在完了は「現在への影響」に焦点。時制の視点位置が違う。',
                    lisa: "If you tell me 'I lost my keys' I assume the story's over. 'I've lost my keys' means you're still looking.",
                    takeshi: '日本語は「なくした」の一択だから、英語で選べずに止まる。「今も困ってる?」で切れ。',
                    yuki: '学校で完了・経験・継続って習ったけど、この「今への影響」一本のほうがしっくりくる。',
                    kenji: "現場で部品なくした時は I've lost the part、now の含みで助け呼べる。",
                    mina: 'DM で "I lost my phone" より "I\'ve lost my phone" の方が緊急感出て返信早いやん。',
                },
            },
            {
                id: 'd1-g-02-lived',
                label: "I lived in Tokyo vs I've lived in Tokyo",
                trigger: '「東京に住んでた/住んでる」を英語で。',
                points: {
                    core: { en: 'I lived in Tokyo for 5 years.', ja: '過去に住んでた。今はもう住んでいない。' },
                    nuance: { en: "I've lived in Tokyo for 5 years.", ja: '今も住んでる。5年間継続中。' },
                    shift: { en: "I've lived in Tokyo before.", ja: 'before を足すと「経験として住んだことがある (今は別)」。文脈が変わる。' },
                    native: { en: "I've lived in Tokyo my whole life.", ja: '生まれてから今まで。継続の極端な例。過去形では絶対ダメ。' },
                },
                trap: '「5年住んでました」を for 5 years + 過去形でしか言えないと、「まだ住んでる/もう住んでない」が区別できない。',
                tip: '期間 (for X years) + 今も続く → 現在完了。期間 + もう終わった → 過去形。',
                reactions: {
                    master: 'for + 期間 は過去形・現在完了どちらも取れる。動詞の時制で継続/終了が決まる。',
                    lisa: "If you say 'I lived in Tokyo for 5 years' I'll ask 'Where are you now?' -- I know you left.",
                    takeshi: '英語は「今住んでる」と「住んでた」を動詞1文字で区別する。日本語より正確で冷たい。',
                    yuki: '「住んでる」の英訳で動詞の時制で迷うの、ここでスッキリした。',
                    kenji: "自己紹介で I've lived in Tokyo for 10 years って言えれば、説明不要で状況伝わる。",
                    mina: 'Bio に "Tokyo-based" って書くのは便利やけど、会話では I\'ve lived 構文が王道やね。',
                },
            },
            {
                id: 'd1-g-03-news',
                label: 'Did you see the news? vs Have you seen the news?',
                trigger: '「あのニュース見た?」を英語で。',
                points: {
                    core: { en: 'Did you see the news?', ja: 'いつ？の感覚で、特定の時間枠 (今朝・昨日) を想定。' },
                    nuance: { en: 'Have you seen the news?', ja: 'いつでもいいから見た? の感覚。経験を聞いてる。' },
                    shift: { en: 'Did you see the news this morning? / Have you seen the news yet?', ja: 'this morning があれば過去形、yet があれば現在完了。時間副詞が時制を引っ張る。' },
                    native: { en: "Have you seen the news? -- Yeah, crazy right?", ja: '時事の話を振る時のテンプレ。開きっぱなしの時間枠。' },
                },
                trap: 'どっちも「見た?」だから日本語から選べない。時間枠を指定してるかどうかで決まる。',
                tip: '時間を指定してる (this morning, yesterday, last night) → 過去形。時間を開けっぱなし → 現在完了。',
                reactions: {
                    master: 'Yes/No 疑問文の時制選択も、時間枠の指定有無で決まる。副詞の選択が主動詞の時制を決定する。',
                    lisa: "I'll use 'Did you see...' when I mean something specific and recent. 'Have you seen...' is more open.",
                    takeshi: '「ニュース見た?」の日本語、時間枠があるかないか話者の頭次第。英語はそれを動詞で出す。',
                    yuki: '時間副詞で時制が動くの、パズルみたいで面白い。覚える。',
                    kenji: '朝礼で「昨日の会議見た?」は Did。「最新版、目通した?」は Have。分かりやすい。',
                    mina: 'SNS で "Did u see...?" の方が軽く、"Have you seen...?" の方がちょい重い感じわかる。',
                },
            },
            {
                id: 'd1-g-04-when',
                label: 'When + 現在完了は原則 NG',
                trigger: '「いつ彼に会ったの?」を英語で。',
                points: {
                    core: { en: 'When did you meet him?', ja: 'when は特定の時点を聞く語。過去形と組む。' },
                    nuance: { en: "When have you met him? -- unnatural.", ja: 'when + 現在完了は「時点が不定」と「時点を特定」が矛盾するのでネイティブには違和感。' },
                    shift: { en: 'How long have you known him? / Have you ever met him?', ja: '現在完了と組むのは how long (期間) / ever (経験) / yet (まだ) など「時点を特定しない」副詞。' },
                    native: { en: 'When did you meet him? -- A few years ago at a conference.', ja: '時点を知りたい時は 100% 過去形。' },
                },
                trap: 'when を使いたくて現在完了に乗せる。ネイティブは違和感で固まる。',
                tip: "when = 時点特定 → 過去形。how long = 期間 → 現在完了。ever = 経験の有無 → 現在完了。",
                reactions: {
                    master: '疑問副詞によって組める時制が決まる。when は 原則過去形専用、how long / ever は現在完了専用。',
                    lisa: "'When have you...?' just doesn't land for me. I'd ask 'When did you...?' every single time.",
                    takeshi: '日本語の「いつ」を機械的に when で訳しながら現在完了に乗せると、ここで全部崩れる。',
                    yuki: 'when + 現在完了がダメってルール、学校で教わった記憶ない。大事。',
                    kenji: '現場で「いつ来たの?」は When did you arrive? 一択。迷わなくなる。',
                    mina: '"When have u seen it" ってDM で送ったことある…過去形で正解やったのか。',
                },
            },
            {
                id: 'd1-g-05-just',
                label: "just now vs I've just -- 直前の話",
                trigger: '「今ちょうど終わった」を英語で。',
                points: {
                    core: { en: 'I finished it just now.', ja: '過去形+just now は米英どちらも OK。米語ではこちらが主流。' },
                    nuance: { en: "I've just finished it.", ja: '現在完了+just は英国英語で主流。米語でもフォーマル文脈ならOK。' },
                    shift: { en: "米 Just finished it. / 英 Just've finished it.", ja: '口語ではさらに主語が落ちる。米は過去形ベース、英は現在完了ベースで省略される。' },
                    native: { en: "I've just wrapped up. / Just wrapped up.", ja: '仕事終わった報告の口語形。wrap up は finish よりカジュアル。' },
                },
                trap: '「今」「ちょうど」で過去形と現在完了が競合する。米と英で好みが分かれるので、どっちも正解。',
                tip: '米英どっちのリズムに寄せるかで選ぶ。迷ったら過去形+just now (米寄り、どこでも通じる)。',
                reactions: {
                    master: '時制の好みは地域差 (米英) で揺れる。文法規則の厳密さだけで決まるわけではない。',
                    lisa: "I'm American and I'd say 'I just finished it' 90% of the time. Brits go with 'I've just finished'.",
                    takeshi: '米か英か選べ、と言われたら米寄りの方が世界的に通じる場面多い。迷ったら米。',
                    yuki: '英文法で現在完了が正解って習ったけど、米では過去形も自然って初めて知った。',
                    kenji: "現場でアメリカ人相手なら I just finished。イギリス人相手なら I've just finished。使い分け可。",
                    mina: 'SNSで "just dropped!" って見るの、あれ米語の主語省略+過去形の流れやん。',
                },
            },
        ],
    },
};
