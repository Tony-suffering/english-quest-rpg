import type { Native365Day } from '@/types/native365';

/**
 * Day 28
 *
 * 発音: filler / hedging の発音 -- um / uh / like / sort of / kind of / I guess
 * 文法: 名詞を動詞化 -- google it / DM me / Zoom me / ghost someone / message me
 */

export const DAY_28: Native365Day = {
    day: 28,
    week: 5,
    month: 1,

    // ══════════════════════════════════════════════════
    // 扉絵: 週末の夕方、ミナが動画編集してる
    // ══════════════════════════════════════════════════
    opening: {
        scene: '土曜の夕方。ミナがインタビュー動画の字幕を付けながら「英語のネイティブってum とか like めっちゃ入れるけど、日本人がやると変になるの何で?」と質問してる。',
        lines: [
            { char: 'mina',    text: "ネイティブの YouTuber、um とか like めっちゃ入ってるのに全然違和感ないやん。自分が入れたら「えっと」連発で素人感出るんやけど、何が違うん?" },
            { char: 'lisa',    text: "Filler isn't just 'um'. It's a whole rhythm thing -- placement, length, and what comes after. You can't just sprinkle it." },
            { char: 'master',  text: 'あと今日は名詞をそのまま動詞で使う話もする。google it とか DM me とか、TOEIC の参考書には絶対載らないが、実際の会話では毎分出てくる。' },
        ],
    },

    // ══════════════════════════════════════════════════
    // 発音: filler / hedging の発音
    // ══════════════════════════════════════════════════
    pronunciation: {
        title: 'filler / hedging -- 「えっと」の英語版はリズム装置',
        subtitle: 'um / uh / like / sort of は雑音じゃなく、思考と思いやりを示す機能語。',
        intro: {
            question: 'なぜネイティブの um や like は自然に聞こえるのに、日本人が入れると素人臭くなるのか?',
            insight: '日本語の「えっと」「あのー」は沈黙を埋める消極的フィラー。一方、英語の um / uh / like / kind of / sort of / I guess は積極的な discourse marker (談話標識) として機能する。思考中を示す (um)、次の語を探してる (uh)、例示が続く (like)、断定を避ける (sort of / kind of)、自信の低さを示す (I guess)。役が分かれてる。\n\nさらに決定的なのが「位置」と「長さ」。ネイティブは um を文頭か節の切れ目に置き、母音をやや伸ばす /əːm/。日本人は単語の直前にポッと挟むことが多く、長さも均等で、結果的に雑音に聞こえる。like も名詞の前に0.2秒ポーズ+短く /laɪk/ と出すのが正解。\n\n今日は5つの最頻出フィラーで、位置・長さ・役割を体に入れる。これができると、英語の間が人間らしくなる。',
        },
        tldr: 'um / uh / like / sort of / I guess を役割で使い分け、位置と長さで自然なリズムを作る。',
        items: [
            {
                id: 'd28-p-01-um',
                label: 'um -- 思考中を示す、文頭の /əːm/',
                trigger: "'Um, I think we should leave.' を発音しろ。",
                points: {
                    core: { en: '/əːm/ (elongated schwa + m)', ja: 'schwa をやや伸ばして /əːm/。単なる「ア」ではない。' },
                    nuance: { en: "Um... it's a thinking-out-loud sound. The length signals how much I'm deliberating.", ja: '長さ = 考えてる時間の長さ。0.5秒で軽い迷い、1秒で深い迷い。' },
                    shift: { en: "Um goes at the start of a clause. 'I um think' sounds weird -- 'Um, I think' works.", ja: '文頭・節頭に置く。単語の途中に挟むと不自然になる。' },
                    native: { en: "Um, honestly, I'm not totally sure we should go tonight -- like, the weather's been kinda sketchy all day.", ja: "えっとさ、正直、今夜行くべきかちょっと分からん。ていうか、天気が一日ずっと怪しいし。" },
                },
                trap: '「アム」と短く日本語の「あのー」感覚で挟む。英語は母音を伸ばして考えてる時間を可視化。',
                tip: '口を半開きにして「んんんっ」を英語寄りにしたイメージ。口を閉じて終わる m で締める。',
                reactions: {
                    master: "um は stall marker (時間稼ぎ標識)。planning phase を言語化する機能を持つ。沈黙回避ではなく、思考の可視化。",
                    lisa: "When I say 'um' I'm literally buying myself time to think. It's totally normal, not a weakness.",
                    takeshi: '日本人は um 入れると「自信ない」と思い込むけど逆。入れないほうが機械っぽくて不自然や。',
                    yuki: 'um を入れない練習ばっかしてたけど、入れ方の練習の方が本当は大事やったんや。',
                    kenji: '現場で商談中の um、ちゃんと使えたら「熟考してる」印象を与えられる。プラスや。',
                    mina: "Podcast 編集してると um は切りがちやけど、多少残したほうが人間味出て再生数伸びるんよね。",
                },
            },
            {
                id: 'd28-p-02-uh',
                label: 'uh -- 語を探してる、短い /ʌ/',
                trigger: "'His name is, uh, Michael.' を発音しろ。",
                points: {
                    core: { en: '/ʌ/ (short, clipped)', ja: 'um より短く、口を少し広めに開けた /ʌ/。um よりカジュアル。' },
                    nuance: { en: "Uh... it's when I'm searching for a specific word, like a name.", ja: '特定の単語 (固有名詞・専門用語) を思い出してる時に出る。' },
                    shift: { en: "Uh can replace um in casual speech. 'Uh, yeah' > 'Um, yeah' among friends.", ja: 'カジュアルな場では um より uh のほうが多い。' },
                    native: { en: "Wait, his name is, uh, Michael? No, Mitchell -- sorry, I literally just met the guy five minutes ago.", ja: "えっと、あの人の名前、えっと、マイケル? 違う、ミッチェルや。悪い、5分前に会ったばっかでさ。" },
                },
                trap: '「アー」と長く伸ばす。uh は短く、単語の手前でポンと出す。長いと um に寄って役割が変わる。',
                tip: '固有名詞の直前で一瞬口を開けて /ʌ/ を出す。咳払いの半分くらいの短さ。',
                reactions: {
                    master: 'uh は word retrieval (語彙検索) 中に生じるフィラー。um より短く、特定の語を探すシグナル。',
                    lisa: "I drop 'uh' before names I'm blanking on. It tells the other person 'I know this, just give me a sec'.",
                    takeshi: "uh と um の違い、日本人ほぼ全員スルーしてる。uh は「単語探し中」、um は「考え中」で役が別や。",
                    yuki: 'uh と um の使い分け、知らんかった。次から意識する。',
                    kenji: "取引先の名前が出ない時、'uh' でつなげば「知ってるけど一瞬出ない」感が伝わる。便利やな。",
                    mina: "TikTok の字幕で \"uh\" が単独で出てくるの、あれ語を探してる瞬間を切り取ってるんやね。",
                },
            },
            {
                id: 'd28-p-03-like',
                label: "like -- 近似・例示・引用の万能フィラー",
                trigger: "'He was like, super angry.' を発音しろ。",
                points: {
                    core: { en: '/laɪk/ (short, unstressed)', ja: '普通の like より短く、強勢を抜いて出す。機能語として弱化。' },
                    nuance: { en: "He was like, super angry. = approximately / sort of / kind of.", ja: '「〜って感じ」「マジで〜」の近似マーカー。数字や形容詞の前で頻出。' },
                    shift: { en: "He was like, 'What?!' = quotation marker, replaces 'said'.", ja: "'was like' で引用を導く用法。said の代わりに使える。若年層で主流。" },
                    native: { en: "So I walk in and he's like, literally yelling at the intern over some tiny typo -- I was like, dude, chill.", ja: "入ってったらさ、マジでインターンの小さい誤字で怒鳴ってんの。こっちは、いや落ち着けよって感じ。" },
                },
                trap: '「ライク」と強く読む。フィラーの like は弱化して短く、前後に0.1-0.2秒のポーズ。',
                tip: 'like の前後にわずかに間をあける。like 自体は小さく、schwa に近い母音で流す。',
                reactions: {
                    master: 'like は approximator (近似副詞) と quotative marker (引用標識) の両機能を持つ。Z 世代以降で使用頻度が爆増してる。',
                    lisa: "I say 'like' probably 50 times a day and I don't even hear myself doing it. It's oxygen.",
                    takeshi: '「like」を抜こうとするな。入れ方を覚えろ。過剰に入れると軽いし、全く入れないと固い。バランス。',
                    yuki: "ネイティブの like、数えたらめっちゃ出てくる。あれ全部機能してたんや。",
                    kenji: "現場で 'it was like 30 minutes' のように数字の前に like 入れると柔らかくなる。便利。",
                    mina: "\"He was like, 'what?'\" って言い方、もう said の代わりに完全に定着してるよな。Z 世代マーカー。",
                },
            },
            {
                id: 'd28-p-04-sort-of',
                label: "sort of / kind of -- 断定を和らげる",
                trigger: "'It's sort of complicated.' を発音しろ。",
                points: {
                    core: { en: "sorta /ˈsɔːɾə/ or kinda /ˈkaɪnɾə/ (contracted)", ja: "口語では sort of → sorta、kind of → kinda と flap + schwa で短縮。" },
                    nuance: { en: "It's sorta complicated = I'm softening the claim, not fully committing.", ja: '断定を避ける hedge (緩衝材)。主張の強さを1段階下げる装置。' },
                    shift: { en: "I sorta liked it / kinda tired / sort of agree -- all same register.", ja: '形容詞・動詞・副詞の前に置ける。前置の位置はほぼ自由。' },
                    native: { en: "It's kinda complicated -- like, I sort of agreed but I'm not totally on board, you know what I mean?", ja: "ちょっと複雑でさ。一応同意はしたんだけど、完全には乗り気じゃない、って感じ、分かる?" },
                },
                trap: '「ソート・オブ」と2語ではっきり分けて読む。口語では sorta で1語化、flap で t が d に近い音。',
                tip: 'sort of → sorta の短縮を口で覚える。t の音を軽く tap して schwa へ流す。',
                reactions: {
                    master: 'sort of / kind of は hedging device。断定の強度を調整するモーダル的機能を持つ。論理ではなく対人配慮。',
                    lisa: "'Kinda' and 'sorta' are how I avoid sounding pushy. Without them, I'd come off way too strong.",
                    takeshi: '日本人は断定回避を苦手としてるくせに kinda / sorta を使わない。宝の持ち腐れや。',
                    yuki: "I sort of agree、意見を柔らかく出す時めっちゃ使えそう。",
                    kenji: "会議で 'I kinda disagree' で反対意見を柔らかく出せる。角が立たん。",
                    mina: "DM で \"kinda into it\" って書くやん。あれ断定しないことで逃げ道残してる Z 世代の処世術。",
                },
            },
            {
                id: 'd28-p-05-i-guess',
                label: "I guess -- 自信の低さを示す終止フィラー",
                trigger: "'It's fine, I guess.' を発音しろ。",
                points: {
                    core: { en: '/aɪ ɡes/ (unstressed, trailing)', ja: '文末で軽く添える。強勢を置かず、尻すぼみに流す。' },
                    nuance: { en: "It's fine, I guess. = I'm not 100% convinced but I'll go with it.", ja: '「まあ、いいか」の自信のなさ・消極的同意を示す。' },
                    shift: { en: "I guess so / I guess not -- short reply versions.", ja: "Yes / No を直接言わずに guess で濁す応答形式もある。" },
                    native: { en: "It's fine, I guess -- I mean, it's not what I wanted, but honestly, I don't have the energy to fight over it.", ja: "まあ、いいか。欲しかったのとは違うけど、正直、これで揉める元気もないし。" },
                },
                trap: '「アイ・ゲス」と強く読む。I guess は文末で尻すぼみ、ほぼ独り言くらいの音量。',
                tip: '文の本体を言い終えた後、一拍おいて小さく添える。口を閉じ気味にして出す。',
                reactions: {
                    master: 'I guess は epistemic hedge。発話者の確信度を下げる。assert の強度を弱める機能を持つ。',
                    lisa: "'I guess' at the end of a sentence = I'm not thrilled but I'm not gonna fight it. Classic passive agreement.",
                    takeshi: 'I guess で「まあいいか」が出せる。これ1つで日本語の曖昧さを英語で再現できる。',
                    yuki: "文末の I guess、ネイティブめっちゃ使ってる。自信なさを英語で出すのこれやったんや。",
                    kenji: "現場で合意に納得いかん時、'OK, I guess' で消極的承認を伝えられる。角立たん。",
                    mina: "DM で \"sure, I guess\" って返ってきたら、「別に嬉しくないけど OK」って意味やん。温度感はっきり。",
                },
            },
        ],
    },

    // ══════════════════════════════════════════════════
    // 文法: 名詞を動詞化 (verbing)
    // ══════════════════════════════════════════════════
    grammar: {
        title: '名詞を動詞化 -- google it / DM me / Zoom me / ghost someone',
        subtitle: '辞書に載る前にネイティブは名詞を動詞にする。TOEICには絶対出ない、でも会話の半分。',
        intro: {
            question: 'なぜ英語では名詞がそのまま動詞になるのに、日本語ではそれが難しいのか?',
            insight: '英語は conversion (品詞転換) を極端に許容する言語。名詞 Google → 動詞 google、名詞 DM → 動詞 DM、名詞 Zoom → 動詞 Zoom。形を変えずに機能だけ変える。日本語は「グーグルする」「DMする」のように「する」を付けないと動詞化できない。\n\nこの conversion は会話で爆発的に出現する。新しいツール・サービス・行動が生まれるたびに、名詞がそのまま動詞として使われる。ghost (無視する)、friend (友達になる)、unfriend (友達解除する)、DM、text、Slack、Venmo -- すべて名詞から動詞化した。TOEIC などの試験英語には出ない。でも実際の英会話の20-30%はこれが占める。\n\n今日は5つの最頻出 verbing で、この「名詞をそのまま動詞で使う」感覚を体に入れる。Google it が言えるだけで、英語の距離感が1段近くなる。',
        },
        tldr: 'Google / DM / Zoom / ghost / message を動詞として自然に使えるようにする。',
        items: [
            {
                id: 'd28-g-01-google',
                label: 'google it -- 検索する、小文字で動詞',
                trigger: '「ググって」を英語で。',
                points: {
                    core: { en: 'Google it. / Just google it.', ja: 'Google を動詞として使う。小文字 google で書くのが口語。' },
                    nuance: { en: "Just google it. = Don't ask me, search it yourself.", ja: 'ちょっと突き放したニュアンスも含む。「自分で調べて」の軽い棘。' },
                    shift: { en: "I googled it last night. / I'm gonna google that.", ja: '過去形 googled、進行形 googling、すべて規則変化。' },
                    native: { en: "Dude, just google it -- it's literally the first result, I'm not doing your homework for you.", ja: "いや、ググれって。マジで一発目に出てくるから。宿題手伝う気ないし。" },
                },
                trap: 'Search it. と文法優等生的に言う。ネイティブの会話では99% google it。search は固い。',
                tip: "「ググる」の日本語が浮かんだら反射で google it。過去形は googled (ed は /d/)。",
                reactions: {
                    master: '商標 Google が一般動詞化した代表例 (genericization)。名詞 → 動詞の conversion が社会的に定着した。',
                    lisa: "I say 'google it' like 10 times a day. Nobody says 'search for it' in casual speech anymore.",
                    takeshi: "Search it は教科書英語。実戦では Google it や。品詞を変える感覚で覚えろ。",
                    yuki: "google を動詞で使うの、書くときに小文字でいいのが意外。",
                    kenji: "現場で 'Let me google that' で即確認、楽な一言や。",
                    mina: "SNS で \"lemme google real quick\" ってよく見る。動詞化が完全定着してる証拠。",
                },
            },
            {
                id: 'd28-g-02-dm',
                label: 'DM me -- メッセージ送って、SNS の動詞',
                trigger: '「DM ちょうだい」を英語で。',
                points: {
                    core: { en: 'DM me. / DM me the link.', ja: 'DM (direct message) を動詞として使う。大文字で書くのが一般的。' },
                    nuance: { en: 'DM me = private message me, not a public post.', ja: '公開投稿じゃなく個別メッセで、のニュアンス。プライバシー込み。' },
                    shift: { en: "I'll DM you. / DM'd her yesterday.", ja: "過去形は DM'd / DMed どちらも見る。アポストロフィ付きが口語寄り。" },
                    native: { en: "Just DM me the address -- honestly I don't want it in the group chat where everyone can see it.", ja: "住所 DM で送って。正直、グループチャットに晒したくないし。" },
                },
                trap: 'Send me a direct message. と長く言う。DM me. で全く同じ意味、3語で済む。',
                tip: '「DM」が名詞として口から出るなら、動詞でも出せる。SNS 文化なら全員通じる。',
                reactions: {
                    master: '略語 DM (direct message) の動詞化。SNS プラットフォーム由来の語が conversion で動詞化する典型例。',
                    lisa: "'Just DM me' is like the default way to ask for private info now. Nobody writes out 'direct message'.",
                    takeshi: 'DM me、これ1つで「公開したくない、個別で」が全部伝わる。便利や。',
                    yuki: "DM me、過去形が DM'd ってアポストロフィ付きなの SNS ぽくて面白い。",
                    kenji: "現場で名刺交換せずに 'DM me on LinkedIn' で済む場面増えた。時代やな。",
                    mina: "\"DM me 🙏\" って SNS で毎日見るやん。動詞化の完全形、これ。",
                },
            },
            {
                id: 'd28-g-03-zoom',
                label: 'Zoom me -- オンライン通話で話そう、ツール名が動詞',
                trigger: '「Zoom で話そう」を英語で。',
                points: {
                    core: { en: "Zoom me. / Let's Zoom.", ja: "ツール名 Zoom を動詞として使う。大文字のまま動詞化。" },
                    nuance: { en: "Let's Zoom tomorrow = let's have a Zoom call. Tool name becomes verb.", ja: "have a Zoom call の省略形。Zoom だけで「オンライン通話する」の意味。" },
                    shift: { en: "Slack me / Venmo me / Uber there -- same pattern.", ja: 'Slack (メッセージ)、Venmo (送金)、Uber (車で移動) も同じパターンで動詞化。' },
                    native: { en: "Wait, can we just Zoom tomorrow morning instead? I'm honestly too fried to drive out there tonight.", ja: "ちょっと、明日の朝 Zoom でいい? マジで疲れすぎて、今夜そこまで運転する気力ない。" },
                },
                trap: 'Let us have a Zoom meeting. と長く言う。Let\'s Zoom. で済む。',
                tip: 'ツール名が出てきたら「そのまま動詞化できるか?」と考える。多くは YES。',
                reactions: {
                    master: "プラットフォーム名 (Zoom / Slack / Venmo / Uber) の動詞化。tool-as-verb は21世紀英語の主要な生産的プロセス。",
                    lisa: "'Zoom me at 3' -- totally normal. We don't say 'have a video call' anymore unless we're being formal.",
                    takeshi: "ツール名を動詞にするの、日本語でも「ZOOMる」とか出てきてるが、英語は3年先行してる。",
                    yuki: "Let's Zoom、簡単で覚えやすい。使う。",
                    kenji: "現場で 'Slack me the file' とか 'Venmo me later' とか、全部動詞で済むのが効率的。",
                    mina: "\"just Uber there\" とか \"can you Venmo me?\" とか、動詞化した瞬間から会話のテンポが2倍になる。",
                },
            },
            {
                id: 'd28-g-04-ghost',
                label: 'ghost someone -- 返事せず消える、SNS 時代の動詞',
                trigger: '「彼に音信不通にされた」を英語で。',
                points: {
                    core: { en: 'He ghosted me.', ja: 'ghost (幽霊) → 動詞化「急に連絡を絶つ」。デート文脈で誕生、今はビジネスでも使う。' },
                    nuance: { en: "He ghosted me = stopped replying with no explanation, just vanished.", ja: '理由説明なく突然消える。SNS 時代の行動様式を動詞化。' },
                    shift: { en: 'I got ghosted. / He totally ghosted me.', ja: '受動態 get ghosted もよく使う。被害者の視点で語る時定番。' },
                    native: { en: "We had like three great dates and then he literally just ghosted me -- no text, no nothing, I'm seriously so over it.", ja: "最高のデート3回した後、いきなり音信不通。連絡一切なし。マジでもう嫌。" },
                },
                trap: "'He disappeared without contact.' と説明的に訳す。ghost 1語で全部出る。",
                tip: "「音信不通」の日本語が浮かんだら反射で ghost。過去形 ghosted、受け身 got ghosted。",
                reactions: {
                    master: "ghost の動詞化は 2010年代後半の造語。デートアプリ文化の産物で、辞書にも正式登録されてる。",
                    lisa: "'He ghosted me' is the only way to say it now. 'He stopped contacting me' sounds like a police report.",
                    takeshi: '「音信不通にされた」の日本語、英語で1語。ghost。短く、かつ感情込み。',
                    yuki: 'ghost を動詞で使うの初めて知った。SNS 時代の英語って感じ。',
                    kenji: "ビジネスでも相手から返事来ない時 'The client's ghosting us' で通じる。便利。",
                    mina: "\"I got ghosted\" で悲しみと怒り全部入りや。動詞1個で感情のパッケージ完了。",
                },
            },
            {
                id: 'd28-g-05-message',
                label: 'message me -- 連絡して、中立的な動詞',
                trigger: '「何か分かったら連絡して」を英語で。',
                points: {
                    core: { en: 'Message me. / Text me. / Hit me up.', ja: 'message / text が動詞。SMS・アプリどちらも。hit me up はカジュアル。' },
                    nuance: { en: "Message me when you know = reach out in any way. Message is the most neutral.", ja: 'メディア非特定の中立的な「連絡して」。message が最も汎用。' },
                    shift: { en: "Text me (SMS) / DM me (SNS) / Hit me up (casual) -- all different registers.", ja: 'メディアとカジュアル度で使い分け。text は SMS、DM は SNS、hit me up は友達間。' },
                    native: { en: "Message me as soon as you hear back from them -- I don't care how late it is, I seriously need to know.", ja: "向こうから返事来たらすぐ連絡して。何時でもいいから。マジで知っとかなあかん。" },
                },
                trap: 'Please contact me. と固く言う。contact は履歴書・フォーマル書類用。会話は message me / text me。',
                tip: 'メディアが決まってれば text / DM、不明なら message、親密なら hit me up。',
                reactions: {
                    master: 'message / text は名詞からの conversion で動詞化。contact は動詞だが register がフォーマル寄り。',
                    lisa: "I say 'text me' or 'hit me up' way more than 'contact me'. Contact sounds like a business form.",
                    takeshi: 'contact me と言う日本人多いけど、あれ冷たい。message me や text me の方が温度感ある。',
                    yuki: "hit me up、初めて聞いた。友達間で使える表現増えた。",
                    kenji: "現場で 'Text me the details' で指示出せる。短くて伝わる。",
                    mina: "\"hit me up anytime\" って Z 世代の社交辞令やん。めっちゃカジュアルで便利。",
                },
            },
        ],
    },
};
