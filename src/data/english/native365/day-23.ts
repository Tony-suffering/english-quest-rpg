import type { Native365Day } from '@/types/native365';

/**
 * Day 23
 *
 * 発音: so の発音と用法 -- 強調・結果・間つなぎの3役
 * 文法: 強調構文 It is ... that -- 仮主語との区別と使い分け
 */

export const DAY_23: Native365Day = {
    day: 23,
    week: 4,
    month: 1,

    // ══════════════════════════════════════════════════
    // 扉絵: 平日の夜、リサが新入社員の話をしてる
    // ══════════════════════════════════════════════════
    opening: {
        scene: "火曜の夜9時。リサが会社の新人を指導してる話をしてる。「\\'so\\' を「ソー」と全部同じ長さで読むから英語が単調になる」と指摘が入る。",
        lines: [
            { char: 'lisa',    text: "The new intern says 'so' like 'SOU'. Every time. Even when it should be stretched like soooo." },
            { char: 'takeshi', text: "\"so good\" の so を感情込めて伸ばせない日本人、めっちゃ多い。あれ発音のせいで感情の幅が半減してる。" },
            { char: 'master',  text: "あと It is ... that の強調構文。昨日の仮主語と形が同じで混乱する人が多い。今日はそこを切り分ける。" },
        ],
    },

    // ══════════════════════════════════════════════════
    // 発音: so の発音と用法
    // ══════════════════════════════════════════════════
    pronunciation: {
        title: 'so の発音と用法 -- 強調・結果・間つなぎの3役',
        subtitle: '短く切る so、伸ばす so、接続する so。役で長さが変わる。',
        intro: {
            question: 'なぜ日本人の "so good" は "good" の部分だけ伸びるのか?',
            insight: '日本語の「とても」は副詞として固定の長さを持ち、後続の形容詞を修飾する。英語の so は副詞だが、感情の強度に応じて音の長さを自由に伸ばせる。so good を中立なら /soʊˈɡʊd/、感動してるなら /soʊːːɡʊd/ と so を長く引っ張る。この「長さの伸縮」が感情の指標になる。\n\nさらに so は「だから」の接続詞 (結果)、「〜するほど」の従属接続詞、文頭の「というわけで」のフィラーと、少なくとも4つの役を持つ。副詞の so は強勢あり、接続詞の so は弱化、フィラーの so は中程度と、役で音量・音長が変わる。\n\n日本語の「ソー」一択で全部処理してる限り、あなたの英語は感情も論理も平坦。so の使い分けができると、英語の表情筋が動き始める。',
        },
        tldr: 'so を副詞なら伸縮、接続詞なら弱く、フィラーなら中程度で出し分ける。',
        items: [
            {
                id: 'd23-p-01-so-good',
                label: "So good -- 感情の強度は長さに乗る",
                trigger: "'It\\'s so good!' を感動込めて発音しろ。",
                points: {
                    core: { en: '/soʊ/ normally, /soʊːː/ for emphasis', ja: '副詞の so は感情に応じて母音を伸ばす。長さが強度。' },
                    nuance: { en: "It's SOOOO good! The more you stretch, the bigger the feeling.", ja: '伸ばす長さ = 感動の大きさ。ネイティブは自然にこれをやる。' },
                    shift: { en: "so good (neutral) / SO good (mild emphasis) / SOOO good (strong)", ja: '3段階の伸ばし方で感情の階調を出せる。' },
                    native: { en: "This pizza is soooo good, oh my god.", ja: '美味しい時の定型。SNS でも oooooo で同じ感覚を綴る。' },
                },
                trap: '「ソー・グッド」と so を一定長で読む。感情の階調が完全に死ぬ。',
                tip: '感情が強ければ強いほど so を引き伸ばす。物理的に口の中で「ソー」を長くする練習。',
                reactions: {
                    master: '副詞 so の持続時間は感情強度と正の相関を持つ。prosody (音律) が意味の一部。',
                    lisa: "'It's SOOOO good' with the stretched SO -- that's how Americans do excitement.",
                    takeshi: '日本人は so の長さで感情出さん。「so good」と「soooo good」は別物の情報量や。',
                    yuki: 'so を伸ばすの、恥ずかしいけど意識せんと英語の感情出ないんや。',
                    kenji: "現場で 'This coffee is so good' の so を3秒伸ばせたら、めっちゃ満足してる感出る。",
                    mina: "SNS で \"soooo good\" って書くの、音でもまんま同じ伸ばし方や。直感的。",
                },
            },
            {
                id: 'd23-p-02-so-that',
                label: "I was tired, so I left -- 接続詞の so は弱く",
                trigger: "'I was tired, so I left.' を発音しろ。",
                points: {
                    core: { en: '/səʊ/ or /soʊ/ reduced (conjunction)', ja: '接続詞「だから」の so は機能語として軽く、前後の content word が強勢を取る。' },
                    nuance: { en: "I was TIRED, so I LEFT. The 'so' is a connector, not a beat.", ja: '2つの節をつなぐ役で、so 自体は情報を持たない。' },
                    shift: { en: "..., so... might reduce to 'suh' in very fast speech.", ja: '早口では so の母音がさらに弱まり、sə に近くなる。' },
                    native: { en: "It was raining, so we stayed in.", ja: '定型の結果表現。so は流れるように出す。' },
                },
                trap: '接続詞の so を副詞のつもりで強く読む。文の論理が不自然に強調される。',
                tip: '結果の so は schwa 寄り。前の節で一旦間をとり、so をサラッと挟む。',
                reactions: {
                    master: '接続詞 so は機能語。content word (tired, left) が強勢を取り、接続詞は音量を譲る。',
                    lisa: "When I say 'I was tired so I left', the SO is barely there. It's just glue.",
                    takeshi: "接続詞の so を「ソー!」と強く出すと、理屈っぽく聞こえる。流せ、流せ。",
                    yuki: '接続詞と副詞で so の音量違うの、意識せんと出せないな。',
                    kenji: "'Rain was heavy, so we stopped' の so を弱くで出せると自然や。",
                    mina: 'DM で "so I left" の so は軽く、"SOOOO tired" の so は伸ばす。役の違い直感で分かる。',
                },
            },
            {
                id: 'd23-p-03-so-filler',
                label: "So, ... -- 文頭フィラーの so",
                trigger: "'So, what do you think?' を発音しろ。",
                points: {
                    core: { en: "So, ... = SO (mid-length), pause", ja: '文頭で話題を切り出す so。中程度の長さで、ポーズを挟む。' },
                    nuance: { en: "So... what do you think? The so sets up the question.", ja: '「で?」「さてと」の談話標識。相手の注意を引く。' },
                    shift: { en: "So... (trailing, hesitant) / So! (clipped, decisive)", ja: '伸ばせば躊躇、切れば決断。イントネーションで印象が変わる。' },
                    native: { en: "So, here's what I think.", ja: '自分の意見を切り出す定型。英会話頻出。' },
                },
                trap: '文頭の so を副詞のつもりで強く伸ばす。話題切り出しのリズムが崩れる。',
                tip: 'So の後にかならず間をあける。間を作るのが本来の役目。',
                reactions: {
                    master: '談話標識 so は話題導入・話題継続の機能を持つ。意味的内容はなく、構造的機能のみ。',
                    lisa: "I start so many sentences with 'So...'. It's just a way to grab attention before I talk.",
                    takeshi: '文頭の so、「で?」の感覚。日本語でもそうやから感覚は近い。音だけ合わせろ。',
                    yuki: 'So, から始めるの、プレゼンでも見かける。実用度高いな。',
                    kenji: "'So, here's the plan' で現場の話し始め、一発で全員こっち向く。",
                    mina: '"So anyway..." って YouTuber よく言うやん。あれ典型的なフィラー so。',
                },
            },
            {
                id: 'd23-p-04-so-that-result',
                label: "so ... that -- 結果の強調構文",
                trigger: "'I was so tired that I fell asleep.' を発音しろ。",
                points: {
                    core: { en: "so + adj + that + 結果", ja: '「〜すぎて〜する」の定型。so が副詞、that が接続詞。' },
                    nuance: { en: "I was SO tired THAT I fell asleep. The so gets emphasis.", ja: 'so は強勢、that は弱化。副詞の so と接続詞の that で音量が違う。' },
                    shift: { en: "Casual: I was so tired I fell asleep. (that drops)", ja: '口語では that が省略されることが多い。so だけで「〜すぎて」を出す。' },
                    native: { en: "He talks so fast I can't follow.", ja: 'that なしの口語版。so の長さだけで結果を匂わす。' },
                },
                trap: 'so も that も両方強く読む。so が強、that が弱、のコントラストが崩れる。',
                tip: 'so で形容詞を強調、that は次の節への橋と割り切る。',
                reactions: {
                    master: 'so ... that 構文は副詞 so が程度副詞として機能、that は関係詞的。音量配分は so > that。',
                    lisa: "'I was SO tired I fell asleep' -- I almost always drop the 'that' in speech.",
                    takeshi: '「〜すぎて〜」の構文、that 省略で短く出せる。日本語の「〜てしまうほど」の感覚。',
                    yuki: "so ... that で結果が出せる構文、that 省略できるの知らんかった。",
                    kenji: "'I was so busy I forgot' とか現場で便利。that 無しの方が自然か。",
                    mina: "DM で \"it's so loud I can't think\" 的なん、that なしで書くのが Z 世代やね。",
                },
            },
            {
                id: 'd23-p-05-so-so',
                label: "so-so -- ハイフンで1語、中間の評価",
                trigger: "'How was it? So-so.' を発音しろ。",
                points: {
                    core: { en: '/ˈsoʊsoʊ/ (compound, equal stress)', ja: 'so-so は1語化した副詞。両方の so に軽い強勢、間にハイフン。' },
                    nuance: { en: "It was so-so. (= not great, not bad)", ja: '「まあまあ」の中立評価。良くも悪くもない。' },
                    shift: { en: "米: so-so (neutral). 英: not bad / all right (slightly positive).", ja: '英米で中立表現の微妙な好みの差。so-so は米語寄り。' },
                    native: { en: "The movie was so-so, nothing special.", ja: '感想の定型。強い評価を避けたい時の選択肢。' },
                },
                trap: '「ソーソー」と平坦に読む。so-so は両方にわずかに山を作って1語として出す。',
                tip: 'so と so の間に手を軽く横に振るジェスチャーのつもりで出す。',
                reactions: {
                    master: 'so-so は副詞の重複形。程度表現として「どちらとも言えない」を示す。音声上は1語扱い。',
                    lisa: "'So-so' is what I say when I don't want to commit. Neutral, noncommittal.",
                    takeshi: "「まあまあ」の英語で so-so 使える。how was it? の返しで便利。",
                    yuki: '「so-so」ってハイフンで1語なんや。1つの副詞として覚えた方が楽。',
                    kenji: '現場で成果聞かれた時 so-so で返せば、誇張も卑下も避けられる。',
                    mina: '"so-so" はちょい古風やけど、DM で "mehhh" て書くのと同じ温度感やね。',
                },
            },
        ],
    },

    // ══════════════════════════════════════════════════
    // 文法: 強調構文 It is ... that
    // ══════════════════════════════════════════════════
    grammar: {
        title: '強調構文 It is ... that -- 仮主語と混同しやすい双子',
        subtitle: '「〜こそが〜だ」を出す強調構文は形が仮主語と酷似する。見分ける軸は1つ。',
        intro: {
            question: 'なぜ It is ... that の2つの構文 (仮主語と強調) が区別できないのか?',
            insight: 'Day 21 でやった仮主語 It is ... that (It is important that you come) と、今日の強調構文 It is ... that (It was yesterday that he came) は形が完全に同じ。違いは中身。仮主語の「...」には形容詞が入り、強調の「...」には名詞・副詞などが入る。\n\nもう一つの見分け方が決定的。仮主語は it が意味を持たず「訳さない」。強調は「〜こそ」と訳す。そして、強調構文は that 以下を主節に戻すと元の文になる。It was yesterday that he came → He came yesterday. 戻して文が成立すれば強調、成立しなければ仮主語。\n\n強調構文は「〜こそ」の感情を英語で出す唯一の文法手段。日本語の「〜こそ」「〜なんだ」を英語に移す時、これを使えないと一段落ちる。今日の5つで主語・目的語・副詞・時・場所、全部のパターンを潰す。',
        },
        tldr: 'It is/was + 強調したい要素 + that + 残り。元に戻せば強調、戻せなければ仮主語。',
        items: [
            {
                id: 'd23-g-01-cleft-subject',
                label: 'It was Tom that broke it -- 主語を強調',
                trigger: '「それを壊したのはトムだ」を英語で。',
                points: {
                    core: { en: 'It was Tom that broke it.', ja: '主語 Tom を強調する強調構文。「こそ」のニュアンス。' },
                    nuance: { en: "It was Tom WHO broke it. (who is also fine for people)", ja: '人の場合 that の代わりに who も使える。どちらも自然。' },
                    shift: { en: "Tom is the one who broke it. (alternative cleft)", ja: '英語には the one who 系の別の強調形もある。' },
                    native: { en: "It was Tom -- not me -- that told her.", ja: '誰かを特定したい時の定型。犯人捜しの文脈で頻出。' },
                },
                trap: "'Tom broke it.' と普通の文で「強調」しようとする。強勢だけでは弱い。",
                tip: "「〜したのは〜だ」の日本語が出たら反射的に It was X that Y 構文で出す。",
                reactions: {
                    master: '強調構文 (cleft sentence) は焦点を前景化する統語装置。主語、目的語、補語、副詞句、全てが cleft 可能。',
                    lisa: "'It was Tom who told her' -- yeah, I use this all the time in arguments. Very pointed.",
                    takeshi: '日本語の「〜こそ」を英語でやりたい時、これ一択。Tom broke it じゃ弱いんや。',
                    yuki: "It was Tom that〜、強調構文ってこんなに使える場面多いんや。",
                    kenji: "現場で 'It was Kenji that found it' とか、功績はっきりさせたい時便利。",
                    mina: 'SNS で "It was HIM that ghosted me" ってパターン、まさに Z 世代の cleft やね。',
                },
            },
            {
                id: 'd23-g-02-cleft-object',
                label: "It's this book that I want -- 目的語を強調",
                trigger: '「私が欲しいのはこの本だ」を英語で。',
                points: {
                    core: { en: "It's this book that I want.", ja: '目的語 (this book) を強調。that の後ろに動詞だけ残す。' },
                    nuance: { en: "It's this book that I WANT, not that one.", ja: '対比を出すのが定石。not X で続けて差別化。' },
                    shift: { en: "This is the book (that) I want. (another way to cleft)", ja: '同じ意味を this is 構文で出すこともできる。強調度はやや落ちる。' },
                    native: { en: "It's the thought that counts.", ja: '諺。「気持ちこそが大事」。強調構文の文例。' },
                },
                trap: '目的語の強調を普通文 I want this book の強勢だけで出そうとする。cleft の方が圧倒的に明示的。',
                tip: "「欲しいのは〜」「選んだのは〜」と日本語で出たら cleft で出す癖をつける。",
                reactions: {
                    master: '目的語の cleft は強調語順を文頭に移動する機能。情報構造上の焦点移動。',
                    lisa: "'It's the chocolate one that I want' -- if someone's confused about my order, I\'d use this exact form.",
                    takeshi: '「欲しいのは〜」の日本語、cleft で一瞬で強調できる。対比の not X もセットで。',
                    yuki: "It's the thought that counts の諺、強調構文で出来てたんや。",
                    kenji: "'It's this tool that I need' って現場で言えば一発で正解の工具渡してもらえる。",
                    mina: "\"It\\'s this one I want\" って店で指差しながら言うの、cleft が直感的に出るな。",
                },
            },
            {
                id: 'd23-g-03-cleft-time',
                label: "It was yesterday that ... -- 時を強調",
                trigger: '「彼が来たのは昨日だ」を英語で。',
                points: {
                    core: { en: 'It was yesterday that he came.', ja: '時の副詞 (yesterday) を強調。that 以下は補足。' },
                    nuance: { en: "Not today, it was YESTERDAY that he came.", ja: '対比を匂わせることで強調が効く。' },
                    shift: { en: "It was at 3 PM that the meeting started.", ja: '時刻、時期、曜日など時の表現すべて cleft 可能。' },
                    native: { en: "It wasn't until yesterday that I realized.", ja: "not until X that Y の形で「Xになって初めてY」を出す。" },
                },
                trap: "'He came yesterday.' で強勢をかけるだけ。副詞を前景化したいなら cleft が明確。",
                tip: "「〜したのは (時) だ」の形を意識的に cleft にする練習。",
                reactions: {
                    master: '時の副詞の cleft は時間的焦点化。イベントの発生時点を情報構造の頂点に置く。',
                    lisa: "'It wasn't until yesterday that I realized' sounds kinda dramatic, but very natural.",
                    takeshi: "「気づいたのは昨日だ」を It wasn\\'t until yesterday で出すと、ドラマ性がプラスされる。",
                    yuki: 'not until X that Y って形、めっちゃ英語らしい。',
                    kenji: "現場で 'It was yesterday that we finished' って報告、時制がはっきりしていい。",
                    mina: "SNS で \"it wasn\\'t until last week that I got it\" 的な言い回し、大人っぽく決まるやん。",
                },
            },
            {
                id: 'd23-g-04-cleft-place',
                label: "It was in Tokyo that ... -- 場所を強調",
                trigger: '「彼と出会ったのは東京だ」を英語で。',
                points: {
                    core: { en: 'It was in Tokyo that I met him.', ja: '場所の前置詞句 (in Tokyo) を強調する cleft。' },
                    nuance: { en: "It was THERE that the accident happened.", ja: '場所の副詞 (there) でも cleft 可能。' },
                    shift: { en: "It was at the station that we ran into each other.", ja: 'at / in / on + 場所、すべて前景化可能。' },
                    native: { en: "It was in Paris that we first met.", ja: 'ロマンスの定型。場所を強調して思い出を立たせる。' },
                },
                trap: "'I met him in Tokyo' の普通文で終わらせる。場所を強調したいなら cleft。",
                tip: "場所を「〜こそが出会った場所」風に強調したい時、反射的に It was in X that で出す。",
                reactions: {
                    master: '場所の副詞句の cleft は空間的焦点化。発話意図上「場所」が情報の頂点となる時に使う。',
                    lisa: "'It was in Tokyo that we first met' -- totally something I'd say when telling a story.",
                    takeshi: '日本語の「〜で出会った」を cleft にすると、物語性が一気に上がる。',
                    yuki: "場所の強調、ストーリーテリングで超使える。",
                    kenji: "'It was on the third floor that we found it' って報告で場所伝える時明確。",
                    mina: '"It was in NYC that I realized..." って Vlog のナレーションで聞くやん。まさにこれ。',
                },
            },
            {
                id: 'd23-g-05-cleft-vs-dummy',
                label: '強調構文 vs 仮主語 -- 見分け方',
                trigger: "次のうち、強調構文はどっち? (a) It is important that he comes. (b) It was he that came.",
                points: {
                    core: { en: '(b) is cleft. (a) is dummy-it.', ja: '(b) は that 以下を戻すと He came で成立 → 強調。(a) は戻せない → 仮主語。' },
                    nuance: { en: "Cleft: remove 'It is' and 'that', sentence still works.", ja: '強調は It is と that を取って戻すと元の文になる。これが判定基準。' },
                    shift: { en: "Dummy-it: 'It is important' is the main claim. That節は内容.", ja: '仮主語は「it is + 形容詞」が主張、that 節は内容物。戻せない。' },
                    native: { en: "It's you I'm worried about. (cleft) vs It's obvious you're lying. (dummy)", ja: "前者は I'm worried about you に戻る、後者は戻らない。" },
                },
                trap: '両方とも it is ... that だからと同じ構文だと思う。中身を戻して成立するかで判定。',
                tip: 'that 以下の内容を元の普通文に戻してみる。戻れば強調、戻らなければ仮主語。',
                reactions: {
                    master: '二つの構文は表層形は同じだが深層構造が違う。復元テスト (undo transformation) で一発判定できる。',
                    lisa: "Native speakers don't consciously think about this -- we just feel the focus. But the test works.",
                    takeshi: '見分けるの難しいと思われがちだが、「戻して成立するか?」テスト1本で終わる。',
                    yuki: '戻して成立するかで見分けるの、シンプルでいい。機械的に判定できる。',
                    kenji: "現場で迷った時も、'戻せるか?' だけチェックすれば cleft か仮主語か分かる。",
                    mina: "構文の見分け、いつも感覚でやってたけど、この判定法あれば DM で書く時も安心。",
                },
            },
        ],
    },
};
