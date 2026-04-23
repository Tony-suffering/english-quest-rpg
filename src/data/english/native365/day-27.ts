import type { Native365Day } from '@/types/native365';

/**
 * Day 27
 *
 * 発音: I mean の発音と用法 -- ah-meen、自己訂正・言い換え・強調
 * 文法: 関係副詞 where / when / why -- 先行詞の種類で自動的に決まる
 */

export const DAY_27: Native365Day = {
    day: 27,
    week: 4,
    month: 1,

    // ══════════════════════════════════════════════════
    // 扉絵: 土曜の昼、タケシが英会話アプリで I mean 連発の添削を受けた話
    // ══════════════════════════════════════════════════
    opening: {
        scene: "土曜の昼、タケシが英会話アプリで 'I mean' を毎文のように出してネイティブ講師に「意味わかって使ってる?」と指摘された話から。I mean の4役と、関係副詞 where / when / why の使い分けに入る。",
        lines: [
            { char: 'takeshi', text: "昨日の英会話で I mean を文頭に毎回つけてたら、'Do you know what I mean means?' って突っ込まれた。知らんかった、ほぼフィラーで使ってた。" },
            { char: 'lisa',    text: "Honestly, 'I mean' isn't filler -- it's ah-meen, and it's specifically a self-correction or clarification signal. If you're just stalling, use 'like' instead." },
            { char: 'master',  text: "今日はその I mean の4役と、関係副詞 where / when / why。先行詞が「場所」か「時」か「理由」で自動的に決まる。ここは案外落とされる基礎の急所だ。" },
        ],
    },

    // ══════════════════════════════════════════════════
    // 発音: I mean の発音と用法
    // ══════════════════════════════════════════════════
    pronunciation: {
        title: 'I mean -- 発音 ah-meen、自己訂正と言い換えの signal',
        subtitle: 'filler じゃない。「つまりな」「いや違う、〜」の意図をもつ discourse marker。',
        intro: {
            question: 'なぜ I mean を便利に使えないのか?',
            insight: 'I mean は直訳すれば「私が意味するのは」。しかし会話での本当の機能は (1) 自己訂正「いや、違う、〜」(2) 言い換え「つまり〜」(3) 強調「マジで」(4) 話の追加「というか〜」の4役。like や you know と違って、I mean には明確な「方向性」がある。前の発言を修正するか、言い換えるか、強めるか、補足するか。\n\n発音は /aɪ miːn/ の理論形から /ahˈmiːn/ に崩れる。I が /ə/ に近づき、mean が残る。日本人が「アイ・ミーン」と丁寧に2拍で読む間に、ネイティブは /ah-meen/ の1拍半で出す。音が重くなると存在感が出すぎるので、軽く滑らせるのが自然。\n\nlike や you know との違いを一言で。like = 近似・引用・filler。you know = 共感確認・filler。I mean = 訂正・言い換え。用途が重ならない。日本人は3つ全部 filler として一緒くたにしてるから、使うべき場面で出せない。今日の5項目で I mean の全機能を固める。',
        },
        tldr: 'I mean = ah-meen。自己訂正・言い換え・強調・追加の4役。filler じゃなく方向性のある signal。',
        items: [
            {
                id: 'd27-p-01-i-mean-correction',
                label: "I mean -- 自己訂正「いや、違う」",
                trigger: "'She's 25, I mean 26.' を発音しろ。",
                points: {
                    core: { en: '/ahˈmiːn/ -- self-correction', ja: '直前の発言が間違っていた時の訂正サイン。' },
                    nuance: { en: "She's 25, I mean 26. (correcting myself)", ja: '「25歳、あ、違う26歳」の切り替え。事実の更新。' },
                    shift: { en: "'No wait, I mean...' (stronger reversal)", ja: 'No wait を足すと訂正の強度が増す。完全に前言撤回。' },
                    native: { en: "She's literally 25, I mean 26, I can never keep track of birthdays -- my bad, she'd kill me if she heard that.", ja: '彼女マジで25歳、あ違う26歳、誕生日覚えるの本当無理なんよ、ごめん、本人聞いたら殺されるわ。' },
                },
                trap: "発言を訂正する時に 'Sorry, I said 25, it's 26' と長く説明する。I mean 一語で同じことができる。",
                tip: "数字・名前・事実を言い間違えた瞬間、反射的に I mean + 正しい情報 で訂正。",
                reactions: {
                    master: 'I mean の自己訂正用法は repair marker。発話された誤情報を即座に修正する metalinguistic signal。',
                    lisa: "'She's 25, I mean 26' -- super natural. I correct myself like this constantly.",
                    takeshi: "事実を訂正するたび Sorry って謝ると重くなる。I mean でサッと切り替えるのがスマート。",
                    yuki: 'I mean で即訂正、便利。今まで長く説明してた。',
                    kenji: "プレゼンで数字間違えた瞬間 'I mean, $50,000' って訂正入れるとプロ感。",
                    mina: 'DM で \"wait I mean 3pm\" って書くの、まさに I mean の自己訂正。瞬時に伝わる。',
                },
            },
            {
                id: 'd27-p-02-i-mean-paraphrase',
                label: "I mean -- 言い換え「つまり」",
                trigger: "'It's complicated. I mean, it's not impossible.' を発音しろ。",
                points: {
                    core: { en: 'I mean, + paraphrase', ja: '前の発言を言い換える、より精密にする、別の角度から説明する時の signal。' },
                    nuance: { en: "It's complicated. I mean, it's not impossible. (clarifying)", ja: '「複雑、っていうか、不可能ではない」の言い直し。ニュアンス調整。' },
                    shift: { en: "'What I mean is...' (expanded paraphrase form)", ja: 'What I mean is を使うとより明示的な言い換えになる。' },
                    native: { en: "Look, it's complicated. I mean, it's not impossible, we just need to like genuinely sit down and figure out a plan first.", ja: 'いや、複雑なんよ。というか不可能ではないけど、一回ちゃんと座って計画練らんとって話。' },
                },
                trap: "I mean を「私は意味する」と訳す。『言い換えると』『つまり』のサイン、と即理解。",
                tip: "自分の発言を言い換えたくなったら I mean, で入る。内容の精密化に使う。",
                reactions: {
                    master: 'I mean の paraphrase 用法は reformulation marker。先行発話を再表現する metadiscursive device。',
                    lisa: "'I mean, it's not impossible' -- softening my previous statement without fully taking it back.",
                    takeshi: "'I mean' で言い換えに入るの、日本語の「っていうか」に近い感覚。自然に出せれば一人前。",
                    yuki: '言い換えの I mean、説明足したい時に効く。覚えとく。',
                    kenji: "'The deadline is tight. I mean, we can still make it, but...' って条件付けで説得力。",
                    mina: 'SNS で \"I mean, kinda...\" って続ける時、前言をちょい柔らげる効果ある。',
                },
            },
            {
                id: 'd27-p-03-i-mean-emphasis',
                label: "I mean -- 強調「マジで、やっぱ」",
                trigger: "'I mean, it was incredible.' を発音しろ。",
                points: {
                    core: { en: 'I mean, + strong statement', ja: '強い感情・意見の前置きで「マジで」「やっぱ」の強調。' },
                    nuance: { en: "I mean, it was incredible. (really emphasizing)", ja: '単なる「すごい」ではなく、感情込みで「マジですごかった」を伝える。' },
                    shift: { en: "'I mean, come on!' (incredulous emphasis)", ja: 'Come on と組むと「冗談だろ」「無理でしょ」の強い感情。' },
                    native: { en: "I mean, the view from the top was literally unreal -- I've seen a lot of mountains and this one honestly broke me.", ja: 'いや、山頂からの景色マジで現実離れしてた。いろんな山見てきたけど、この山はマジで俺を打ち砕いた。' },
                },
                trap: '強調の I mean をフィラーと取って聞き流す。直後に重要な発言が来る予兆。',
                tip: '文頭 I mean + 形容詞 (incredible / ridiculous / insane) は強い感情の前置き。続く内容に集中する。',
                reactions: {
                    master: 'I mean の強調用法は emphatic marker。後続する評価命題の情感的重みを予告する。',
                    lisa: "'I mean, it was incredible' -- this 'I mean' adds way more punch than just 'It was incredible'.",
                    takeshi: "強調の I mean、感情を出す時の前置き。感情の量を倍にする装置。",
                    yuki: '強調の I mean、シンプルに感情乗せられる。使ってみる。',
                    kenji: "レビューで 'I mean, this product delivered' って書けば信頼性の強調になる。",
                    mina: '"I mean, the VIBES were off" って SNS でよく見るやつ、典型の強調 I mean。',
                },
            },
            {
                id: 'd27-p-04-i-mean-addition',
                label: "I mean -- 追加「というか、しかも」",
                trigger: "'He's smart. I mean, he graduated top of his class.' を発音しろ。",
                points: {
                    core: { en: 'I mean, + supporting detail', ja: '前の発言の裏付けや追加情報を出す時のサイン。' },
                    nuance: { en: "He's smart. I mean, he graduated top of his class. (adding evidence)", ja: '「頭いい。しかも首席で卒業」の追加。証拠・根拠の提示。' },
                    shift: { en: "'I mean, just look at...' (pointing to evidence)", ja: 'just look at と組むと「〜を見てみろよ」の証拠提示モード。' },
                    native: { en: "He's genuinely brilliant. I mean, he graduated top of his class at MIT at nineteen -- that alone tells you everything you need to know.", ja: 'あの人マジで頭いいんよ。というか、19歳で MIT を主席卒業してる、それだけで全部わかるやろ。' },
                },
                trap: '追加の I mean を言い換えの I mean と混同する。「前の発言を裏付ける情報を足す」が追加、「前の発言を別の言葉にする」が言い換え。',
                tip: 'I mean の後が証拠・例・事実なら追加、前の発言の別言葉なら言い換え。直後の内容で判定。',
                reactions: {
                    master: '追加の I mean は elaboration marker。先行発話を subsequent evidence で補強する論証装置。',
                    lisa: "'He's smart, I mean, top of his class' -- I'm backing up what I just said.",
                    takeshi: "言い換えと追加、微妙に違うけどネイティブは自然に使い分けてる。聞き分け意識しろ。",
                    yuki: '追加の I mean、証拠提示の signal。覚えると説得力アップ。',
                    kenji: "'This plan works. I mean, we tested it last quarter' って根拠出しでプロ感。",
                    mina: "DM で 'she's amazing, I mean, she literally saved my life' って書くと説得力抜群。",
                },
            },
            {
                id: 'd27-p-05-i-mean-vs-like',
                label: "I mean vs like vs you know -- 使い分け",
                trigger: "3つの discourse marker の違いを1文で。",
                points: {
                    core: { en: 'I mean = correct/clarify. like = approximate/quote/filler. you know = seek agreement/filler.', ja: '3者の機能は重ならない。I mean は方向性あり、like と you know は filler 寄り。' },
                    nuance: { en: "I mean adds precision, like adds vagueness, you know seeks connection.", ja: 'I mean は精度追加、like は曖昧化、you know は関係確認。' },
                    shift: { en: "'Like, I mean, you know...' stacked = heavy informal register", ja: '3つ重ねて使うとカジュアル度が最大。Z 世代の会話で頻出。' },
                    native: { en: "Look, I was like, you know, kinda annoyed -- I mean, she showed up two hours late without even texting me, so yeah.", ja: 'いや、なんかさ、ちょっとイラついてたんよ、分かるやろ。というか、連絡もなしに2時間も遅れて来たし、そりゃな。' },
                },
                trap: '3つの discourse marker を全部「フィラー」で一緒くたにする。役割が全く違うから使い分ける。',
                tip: "訂正したい → I mean、ぼかしたい → like、共感が欲しい → you know。3つの 'why' で選ぶ。",
                reactions: {
                    master: '3つの discourse marker は機能的に distinct。混同すると発話意図が聞き手に伝わらない。',
                    lisa: "I use all three in one sentence sometimes. But each one's doing a different job.",
                    takeshi: "この3つ混同するの日本人の十八番。機能別に分けて、使い分ける。",
                    yuki: '3つの使い分け、初めて整理された。I mean は意識して使う。',
                    kenji: "会議で 'I mean' を主に使うと知的、'like / you know' を抑えると信頼感アップ。",
                    mina: 'SNS で "like I mean you know" って書く時、全部違う意味で乗ってるのわかる。',
                },
            },
        ],
    },

    // ══════════════════════════════════════════════════
    // 文法: 関係副詞 where / when / why
    // ══════════════════════════════════════════════════
    grammar: {
        title: '関係副詞 where / when / why -- 先行詞で自動的に決まる',
        subtitle: '場所なら where、時なら when、理由なら why。関係代名詞との違いは「副詞」として節をつなぐこと。',
        intro: {
            question: 'なぜ関係代名詞は覚えたのに、関係副詞で詰まるのか?',
            insight: '関係代名詞 (who, which, that) は名詞の代わり。主語・目的語の役を取る。関係副詞 (where, when, why) は副詞の代わり。場所・時・理由の修飾役を取る。\n\n見分けは簡単。関係節の中で (1) 主語・目的語が抜けている → 関係代名詞、(2) 副詞 (場所・時・理由) が抜けている → 関係副詞。例: the place I met him (I と him が揃ってる、抜けてるのは場所の副詞 → where 必要)。the man I met (主語 I はある、met の目的語が抜けてる → whom / that 必要)。\n\n日本人が落ちる最大の罠は which との混同。the place which I went と the place where I went、どちらも一見正しく見える。前者は went which for (来れるように) の意味で、which が went の目的語扱い。違和感が残る。where を使うと「そこへ行った」で綺麗に収まる。先行詞が場所なら迷わず where を選ぶ。\n\nさらに why は the reason だけが先行詞。This is why (これが理由だ) は先行詞省略の慣用形。今日の5つで全パターン潰す。',
        },
        tldr: '先行詞が場所→where、時→when、理由→why。関係節の中で副詞が抜けてれば関係副詞。',
        items: [
            {
                id: 'd27-g-01-relative-where',
                label: "The place where I met her -- 場所は where",
                trigger: '「私が彼女と出会った場所」を英語で。',
                points: {
                    core: { en: 'the place where I met her', ja: '先行詞が場所 → where で関係節をつなぐ。場所の副詞の代わり。' },
                    nuance: { en: "I met her there → I met her where (relativized)", ja: 'there を where に変えて前に出した形。副詞が関係副詞化。' },
                    shift: { en: "'The place I met her' (where dropped, casual)", ja: '口語では where 省略可。ただし書き言葉では保持するのが無難。' },
                    native: { en: "The cafe where we first met literally closed down last month -- honestly, I haven't been able to walk past that corner without getting emotional.", ja: '初めて出会ったあのカフェ、先月マジで閉店したんよ。あの角通るたびに、感情抑えられんわ。' },
                },
                trap: 'the place which I met を書く。met の目的語は her なので which は余分。where が正解。',
                tip: '先行詞が place / city / country / room など場所 → 反射的に where を選ぶ。',
                reactions: {
                    master: '関係副詞 where は場所の副詞 (there, in that place) を relativize したもの。関係節内で副詞位置を占める。',
                    lisa: "'The cafe where we first met' -- where fits naturally. 'The cafe which we first met' sounds off.",
                    takeshi: '先行詞が場所なら where 一択。which にすると英語として不自然。ここ間違えるな。',
                    yuki: 'where と which の違い、先行詞でシンプルに決まるんや。スッキリ。',
                    kenji: "'the office where we work' って言えたら自然。'the office which we work' はおかしい。",
                    mina: 'SNS bio で "Tokyo, where I grew up" って書くの、関係副詞の典型例。',
                },
            },
            {
                id: 'd27-g-02-relative-when',
                label: "The day when we met -- 時は when",
                trigger: '「私たちが出会った日」を英語で。',
                points: {
                    core: { en: 'the day when we met', ja: '先行詞が時 → when で関係節をつなぐ。時の副詞の代わり。' },
                    nuance: { en: "We met on that day → We met when (relativized)", ja: 'on that day を when に変えて前に出した形。' },
                    shift: { en: "'The day we met' (when dropped, casual)", ja: '口語では when も省略可。会話では省略が普通。' },
                    native: { en: "I literally still remember the day when we first met -- I was wearing that ridiculous yellow jacket and you couldn't stop laughing at me.", ja: 'マジで初めて会った日、今でも覚えてる。あの馬鹿みたいな黄色いジャケット着てて、お前ずっと俺のこと笑ってたやろ。' },
                },
                trap: 'the day which we met と書く。met の目的語がないわけではなく時の副詞が抜けてるので which は違う。when が正解。',
                tip: '先行詞が day / year / moment / time → 反射的に when を選ぶ。',
                reactions: {
                    master: '関係副詞 when は時の副詞 (then, on that day) を relativize した形。時間的修飾を関係節に吸収する。',
                    lisa: "'The day when we met' -- sounds formal. 'The day we met' is more casual. Both work.",
                    takeshi: "先行詞が時なら when。which にするとおかしい。'The year when I moved' で覚えろ。",
                    yuki: 'when と where の使い分け、先行詞で決まるからシンプル。',
                    kenji: "'The quarter when we broke even' って報告で使えば時期の明示できる。",
                    mina: "DM で \"remember the day when we...?\" って書くの、ロマンチックな使い方。",
                },
            },
            {
                id: 'd27-g-03-relative-why',
                label: "The reason why -- 理由は why",
                trigger: '「私が彼を好きな理由」を英語で。',
                points: {
                    core: { en: 'the reason why I like him', ja: '先行詞が the reason → why。「その理由で〜する」の副詞的意味。' },
                    nuance: { en: "I like him for that reason → I like him why (relativized)", ja: 'for that reason を why に変えた形。理由の副詞が抜ける。' },
                    shift: { en: "'The reason I like him' (why dropped, common)", ja: 'why は省略されることが多い。両方正しい。' },
                    native: { en: "Honestly, the reason why I quit that job is literally because I was working 80-hour weeks and nobody even said thank you -- ever.", ja: '正直、あの仕事辞めた理由はな、マジで週80時間働いて誰ひとり「ありがとう」も言わんかったからや、一回も。' },
                },
                trap: "'the reason because' と書く。because は関係副詞ではないので間違い。why か省略が正解。",
                tip: '先行詞が reason → why 一択。because は別機能の接続詞。混同しない。',
                reactions: {
                    master: '関係副詞 why は先行詞 reason とのみ共起する。因果副詞 (because, since) の関係節版。',
                    lisa: "'The reason why I love her' -- I'd drop the 'why' in casual speech: 'The reason I love her'.",
                    takeshi: 'why の代わりに because を入れる日本人ミス、頻出。reason why 一択。',
                    yuki: 'the reason why のフル形、学校で習ったけど省略多いの知らんかった。',
                    kenji: "'The reason why we chose this vendor' って言えば根拠説明で信頼される。",
                    mina: 'TikTok で "the reason why I..." って動画タイトル多いやん。典型的な関係副詞構文。',
                },
            },
            {
                id: 'd27-g-04-where-vs-which',
                label: "where vs in which -- 堅い vs 自然",
                trigger: "'the house where I live' と 'the house in which I live' どちらが自然?",
                points: {
                    core: { en: 'where = in which (same meaning)', ja: 'where は in which / at which などの前置詞+関係代名詞と等価。' },
                    nuance: { en: "'the house where I live' (natural) vs 'the house in which I live' (formal/stiff)", ja: 'where の方が自然。in which は文学的・堅い書き言葉。' },
                    shift: { en: "'the country in which I was born' = 'the country where I was born' / 'the country I was born in'", ja: '3通りの言い方。会話では where か文末 in、書き言葉では in which。' },
                    native: { en: "The apartment where I grew up is like a ten-minute walk from here -- I could literally show you the kitchen window I used to stare out of for hours.", ja: '育った家、ここから歩いて10分くらい。毎日何時間も眺めてたキッチンの窓、マジで今でも見せられるで。' },
                },
                trap: "'the house which I live' と書く。live は目的語を取らないので which だけだと間違い。where か in which 必要。",
                tip: "場所 + 'I live' のように関係節内で場所副詞が必要な時、where か 'in which' か '...which I live in'。",
                reactions: {
                    master: '関係副詞 where は前置詞+関係代名詞 (in which, at which) の口語的等価形。register によって選択される。',
                    lisa: "'The house in which I live' sounds like a 1900s novel. I'd always say 'the house where I live' or 'the house I live in'.",
                    takeshi: "where のほうが自然。'in which' は論文・契約書で使う。場面で選ぶ。",
                    yuki: 'where = in which って等価なの知らんかった。書き分けできるようになった。',
                    kenji: "'the room where the meeting is held' は自然、'in which' は堅すぎる。",
                    mina: '"the spot where we hang out" って言うのが普通。in which なんて絶対書かん。',
                },
            },
            {
                id: 'd27-g-05-this-is-why',
                label: "This is why ... -- 先行詞省略の慣用形",
                trigger: '「だからあなたが必要なんだ」を英語で。',
                points: {
                    core: { en: 'This is why I need you.', ja: 'This is why は the reason why の reason 省略形。「これが理由で〜だ」の慣用句。' },
                    nuance: { en: "This is why... introduces a conclusion or key takeaway.", ja: '結論や重要な主張を導入する strong marker。' },
                    shift: { en: "'That's why...' / 'This is how...' / 'This is where...' -- same pattern for other relative adverbs.", ja: 'why だけでなく how / where にも適用。This is how = これがやり方だ、This is where = ここが〜だ。' },
                    native: { en: "This is exactly why I told you not to book the earlier flight -- we literally would've been stuck in Chicago for six hours.", ja: 'これこそがあの早い便予約するなって言った理由や。マジでシカゴで6時間足止め食らってたで。' },
                },
                trap: "'The reason is why I need you' と冗長に書く。This is why で the reason は不要 (反復)。",
                tip: "結論を強調したい時 This is why / That's why / This is where のテンプレで入る。",
                reactions: {
                    master: "'This is why' は 'This is the reason why' の reason 省略形で、conclusion marker として固定化されている。",
                    lisa: "'This is why I love you' -- super common, super emotional. I say this all the time.",
                    takeshi: "This is why の定型、結論を出す時の王道。覚えろ。",
                    yuki: 'This is why、シンプルで強い。結論言う時に使える。',
                    kenji: "プレゼンで 'This is why we need to act now' って言えば、行動促せる。",
                    mina: "SNS で 'this is why she's my best friend' 系の投稿、定番の結論 This is why。",
                },
            },
        ],
    },
};
