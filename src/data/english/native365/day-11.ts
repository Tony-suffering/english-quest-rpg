import type { Native365Day } from '@/types/native365';

/**
 * Day 11
 *
 * 発音: r と l の母音化        -- 子音なのに母音のように鳴る音
 * 文法: 関係代名詞 that / which / who -- 使い分けと省略の判断
 */

export const DAY_11: Native365Day = {
    day: 11,
    week: 2,
    month: 1,

    // ══════════════════════════════════════════════════
    // 扉絵: 雨の夜の居酒屋
    // ══════════════════════════════════════════════════
    opening: {
        scene: '雨の夜。傘を畳みながら入ってきたユキが、girl と world の発音の違いで現場で詰まった話を切り出す。',
        lines: [
            { char: 'yuki',   text: "girl が言えない。l が飲み込まれて、girl が gull みたいになっちゃう。" },
            { char: 'lisa',   text: "それ r も l も、子音だけど母音みたいに鳴らす音なのよ。舌の位置で母音になる。" },
            { char: 'master', text: "それと関係代名詞の that / which / who。日本人が誰でも迷う1問。今日はこの2本だ。" },
        ],
    },

    // ══════════════════════════════════════════════════
    // 発音: r と l の母音化
    // ══════════════════════════════════════════════════
    pronunciation: {
        title: 'r と l の母音化 -- 子音なのに母音のように鳴る音',
        subtitle: 'girl / world / little / people の r・l は、舌を置くだけで音が鳴る「半母音」。',
        intro: {
            question: 'なぜ girl や world の最後の音が、日本人には存在しないのか?',
            insight: '日本語の子音は、必ず母音とセットで1拍を作る。「ガール」は「ga・a・ru」で、ru は必ず u 母音が乗って終わる。英語の girl の末尾の /l/ は違う。母音が付かない。舌先を歯茎に付けた、その「舌の位置そのもの」が音になる。\n\nこれを syllabic consonant(音節を担う子音)と言う。/r/ も同じで、bird の /ɜːr/ は口を「ア」の形にしながら舌先を奥に引く、その状態が持続して1音節になる。母音 + r ではない。r が母音の役をしている。\n\n日本語脳は「ru」「ra」「ri」と母音を足しに行くクセがある。これが girl が gull に、world が warudo に化ける原因。今日の5語で、舌の位置を決めたまま音を持続する感覚を入れる。',
        },
        tldr: 'girl / world / little / people / bird -- 舌位置で鳴らす r・l を体に入れる。',
        items: [
            {
                id: 'd11-p-01-girl',
                label: 'girl -- r と l を連続で母音化',
                trigger: "'girl' を声に出して3回。",
                points: {
                    core: { en: '/ɡɜːrl/', ja: 'g → /ɜːr/(舌を奥に引いた母音化 r)→ /l/(舌先を歯茎に付けたまま持続)。1音節。' },
                    nuance: { en: 'Not "ga-ru". The r and l both do vowel work.', ja: 'ru を足さない。r の状態から l の状態へ、舌がスライドするだけ。' },
                    shift: { en: 'Casual: almost just /ɡɜːl/ with a hint of r.', ja: '米語ではしっかり r、英語ではほぼ r が消えて /ɡɜːl/ に近づく。' },
                    native: { en: "She's a smart girl.", ja: 'girl で止める練習。最後の l の舌を歯茎に付けたまま音を切る。' },
                },
                trap: '「ガール」と3拍で読む。u 母音が入って英語の1音節構造が崩壊する。',
                tip: 'g から始めて、舌を奥に引く (r) → そのまま舌先を歯茎に付ける (l)。1ストロークで終わらせる。',
                reactions: {
                    master: 'syllabic consonant は英語発音の核の1つ。r/l/n/m が母音なしで音節を担える。',
                    lisa: "When you say 'girl' with a 'u' between r and l, it's two syllables. I want one. One.",
                    takeshi: '「ガール」と読むたびに英語の1音節が2音節になる。母音を足す癖、今日で切れ。',
                    yuki: '舌を動かさずに r と l を繋ぐって、生まれて初めての動きかも。',
                    kenji: 'girl、現場でそんなに使わんけど、world や careful 全部同じ構造やろ。まとめて楽になる。',
                    mina: 'TikTok の "girl" ってセリフ、全部 1拍で爆速やん。これ真似せなあかんね。',
                },
            },
            {
                id: 'd11-p-02-world',
                label: 'world -- 舌を奥に引いたまま l へ',
                trigger: "'world' を発音しろ。",
                points: {
                    core: { en: '/wɜːrld/', ja: 'w → /ɜːr/(母音化 r)→ /l/(dark L)→ /d/。1音節。' },
                    nuance: { en: 'wərld. Tongue stays curled, then tip taps for l and d.', ja: '舌を奥に引いたまま、l と d で舌先だけ歯茎に付ける。本体は動かない。' },
                    shift: { en: 'Fast: "wərl" with the d almost dropped.', ja: '早い会話だと d がほぼ消えて wərl になる。the whole world が "whole wərl" に。' },
                    native: { en: "It's a small world.", ja: '世間話の定番。small と world の l が連続する難所。' },
                },
                trap: '「ワールド」と4拍で読む。w・a・ru・do と母音を3つも足している。',
                tip: 'w で唇を丸めた瞬間に舌を奥に引く。そのまま l・d まで舌先だけ動かす。舌の本体は固定。',
                reactions: {
                    master: 'r + l + d の子音連続を1音節で処理するのが英語の骨格。母音を挟んだ時点で別言語。',
                    lisa: "'World' should feel like one smooth roll of the tongue. If you're stopping in the middle, start over.",
                    takeshi: 'world でモタつくと、Hello world すら英語として成立しねえ。1拍で出す意識。',
                    yuki: '4拍で読んでた。4拍が1拍になるって、別の単語に聞こえる…これが正解。',
                    kenji: '現場で world-class って言うとき、1音節で出せたら格上がるな。練習する。',
                    mina: "Disney の Small World、あれ歌で聞くと確かに 1拍やん。耳でも納得できた。",
                },
            },
            {
                id: 'd11-p-03-little',
                label: 'little -- 末尾の l は母音なしで鳴る',
                trigger: "'little' を発音しろ。",
                points: {
                    core: { en: '/ˈlɪt.l̩/', ja: 'LIT-l。末尾の /l/ は母音なし、舌先を歯茎に付けたまま鳴らす syllabic l。' },
                    nuance: { en: 'LIT-l, not LIT-tuh-l. The second syllable is just the l itself.', ja: '2音節目は l だけ。母音は存在しない。舌の位置が音そのもの。' },
                    shift: { en: 'US: "LIT-l" with a flap t. UK: "LIT-uhl" with a clearer t.', ja: '米語では t が flap になって d ぽく聞こえ、l だけが残る。英語では t が立つ。' },
                    native: { en: "A little bit of sugar.", ja: 'little bit は a lil bit とまで縮むことも。l の母音化の極致。' },
                },
                trap: '「リトル」と3拍で読む。ri・to・ru、母音が3つ。英語は2音節 (LIT + l)。',
                tip: 't まで言った後、舌先を歯茎から離さずにそのまま l を鳴らす。口を開けない。',
                reactions: {
                    master: 'syllabic l は -le / -el で終わる単語に共通。table / apple / people 全部同じ構造。',
                    lisa: "When I say 'little,' my mouth barely opens for the ending. It's all tongue.",
                    takeshi: '「リトル」を「リトゥ」に変える訓練。母音を切り落とす勇気がいる。',
                    yuki: 'little に u 母音が入ってないって知らなかった…table も apple もそうか。',
                    kenji: 'a little more please、現場で毎日使うやつ。LIT-l で出せたら通じ方変わる。',
                    mina: '"lil" って SNS 表記、あれ発音そのまま書いてるだけやん。納得。',
                },
            },
            {
                id: 'd11-p-04-people',
                label: 'people -- p-pl で終わる syllabic l',
                trigger: "'people' を発音しろ。",
                points: {
                    core: { en: '/ˈpiː.pl̩/', ja: 'PEE-pl。末尾は母音なしの l。唇を閉じた p の直後に舌先を歯茎に付けて l を鳴らす。' },
                    nuance: { en: 'PEE-pl, not PEE-poh. The ending is p then l, nothing in between.', ja: 'p と l の間に o / u 母音を入れない。唇を開いた瞬間に舌先が歯茎。' },
                    shift: { en: 'Fast: "peepl" blurs into near one syllable.', ja: '早い会話ではほぼ1音節化。many people = "many peepl"。' },
                    native: { en: "Good people are hard to find.", ja: 'p で唇を閉じ、開いた瞬間に舌先が歯茎にある状態で l を出す。' },
                },
                trap: '「ピープル」と3拍で読む。最後が ru になって日本語の1単語になる。',
                tip: '口を閉じる (p) → 開けながら舌先を歯茎に付ける → 舌先を離さずに l を鳴らす。口は開けない。',
                reactions: {
                    master: 'people / apple / simple / people, 全部 -ple で同じ形。1つマスターで全部通る。',
                    lisa: "'Peh-puh-ru' is 3 syllables in Japanese. In English, 'people' is 2. Cut the middle vowel.",
                    takeshi: 'people の最後を「プル」で読む癖、ここで卒業。口を開けずに l。',
                    yuki: 'people を3拍で言ってた。2拍で出すと急に英語っぽい響きになる。',
                    kenji: 'young people / local people、ワンセットの定型句。2拍でリズムを作る。',
                    mina: '"ppl" って略、見たことある。あれ母音ない発音そのままやん。',
                },
            },
            {
                id: 'd11-p-05-bird',
                label: 'bird -- 母音化 r の代表例',
                trigger: "'bird' を発音しろ。",
                points: {
                    core: { en: '/bɜːrd/', ja: 'b → /ɜːr/(舌を奥に引いた母音化 r)→ /d/。1音節。' },
                    nuance: { en: 'The vowel IS the r. Tongue curls and that curl makes the sound.', ja: 'r の前に別の母音があるのではない。舌を引いた状態そのものが母音。' },
                    shift: { en: 'UK: /bɜːd/ with almost no r. US: /bɜːrd/ with strong r color.', ja: '英語では r が弱く bəd に近い、米語では r が強く bird。' },
                    native: { en: "An early bird catches the worm.", ja: 'bird / word / world / work / heard 全部同じ母音化 r。' },
                },
                trap: '「バード」と3拍。ba・a・do と母音を足して別単語にしている。',
                tip: 'b で唇を閉じ、開いた瞬間に舌を奥に引いた状態で音を鳴らす。舌の位置がキープされれば r が勝手に鳴る。',
                reactions: {
                    master: '/ɜːr/ は nurse vowel とも呼ばれる。bird / work / word / girl / turn, 全部この母音。',
                    lisa: "When I say 'bird,' my jaw barely moves. It's all about where the tongue is.",
                    takeshi: 'bird で「バー・ド」と分けた瞬間に英語が死ぬ。1拍、舌位置で勝負。',
                    yuki: '舌の位置で母音が決まるって、日本語にない感覚。ここが英語の発音の肝か。',
                    kenji: 'early bird 出社、bird を1拍で出せたらクオリティ上がる。',
                    mina: 'Twitter の bird アイコン、読むとき 1音節で出せてる人、英語慣れしてる感じするわ。',
                },
            },
        ],
    },

    // ══════════════════════════════════════════════════
    // 文法: 関係代名詞 that / which / who
    // ══════════════════════════════════════════════════
    grammar: {
        title: '関係代名詞 that / which / who -- 使い分けと省略の判断',
        subtitle: '先行詞が人か物か、制限か非制限か、省略できるか。迷いやすい3点を1枚に。',
        intro: {
            question: 'なぜ日本人は関係代名詞で that を連発してしまうのか?',
            insight: '日本語には関係代名詞がない。「私が昨日会った人」は前から修飾するだけで、接続の目印がない。英語は必ず関係代名詞で「ここから修飾が始まる」と宣言する。この宣言のノイズが日本語脳には気持ち悪く、安全牌の that で全部流したくなる。\n\nしかし that は万能ではない。非制限用法(コンマで挟んで補足する形)では that は使えない。物には which、人には who、という基本の住み分けがある。さらに目的格なら that / which / who(m) を省略できる。逆に主格では省略できない。\n\n今日の5題で、「人 / 物」「制限 / 非制限」「主格 / 目的格」の3軸を一度に整理する。この3軸の交差点を理解すれば、関係代名詞で迷う時間がゼロになる。',
        },
        tldr: '人=who、物=which、どっちも可=that。ただし コンマ付き(非制限)では that 禁止。',
        items: [
            {
                id: 'd11-g-01-who-vs-that',
                label: 'who vs that -- 人を指すときの使い分け',
                trigger: '「昨日会った人」を英語で。',
                points: {
                    core: { en: 'the person who I met yesterday', ja: '人が先行詞なら who が第1選択。that でも通じるが who の方が自然。' },
                    nuance: { en: 'the person that I met yesterday (also fine, slightly more neutral)', ja: 'that は人にも物にも使える万能だが、人に使うと少しぶっきらぼうな響き。' },
                    shift: { en: 'Casual: "the person I met yesterday" -- drop the relative entirely.', ja: '目的格なら完全省略できる。会話ではこれが一番自然。' },
                    native: { en: "He's the guy I was telling you about.", ja: '関係代名詞を省略した形が最もネイティブ的。省略できる場面では省略する。' },
                },
                trap: '人にも that を機械的に当てる癖。間違いではないが、who の方が自然。',
                tip: '迷ったら人=who、物=which、口語で目的格なら省略、の3択で判断。',
                reactions: {
                    master: '人には who、物には which、が文法書の基本。that は両方に使える万能だがフォーマルではない。',
                    lisa: "If I'm talking about a person, 'who' feels warmer. 'That' feels like I'm describing an object.",
                    takeshi: '人を that で受ける英語は、どこか冷たい。who を選べる場面では who を選ぶ癖を付けろ。',
                    yuki: '人には who、って今まで意識してなかった…that で全部済ませてた。',
                    kenji: '現場で "the guy who..." って出せるだけで、相手が人として扱われてる感出る。',
                    mina: 'DM で "the guy that..." より "the guy who..." の方が、ちゃんと人として見てる感じやな。',
                },
            },
            {
                id: 'd11-g-02-which-vs-that',
                label: 'which vs that -- 物を指すときの使い分け',
                trigger: '「私が昨日買った本」を英語で。',
                points: {
                    core: { en: 'the book that I bought yesterday', ja: '物が先行詞で制限用法なら that が最頻出。which より口語的。' },
                    nuance: { en: 'the book which I bought yesterday (also fine, slightly more formal)', ja: 'which は書き言葉でより好まれる。口語ではやや硬い。' },
                    shift: { en: "Casual: 'the book I bought yesterday' -- drop it entirely.", ja: '目的格なら関係代名詞ごと省略。会話で最自然。' },
                    native: { en: "This is the book I was telling you about.", ja: '口語では関係代名詞を省略するのがデフォルト。' },
                },
                trap: 'which を乱用して文章が重くなる。口語では that か、省略の方が自然。',
                tip: 'カジュアル = 省略、中間 = that、フォーマル = which、の3段階で使い分け。',
                reactions: {
                    master: '制限用法の物先行詞では、カジュアル順に [省略] > that > which。which はフォーマル寄り。',
                    lisa: "'Which' in casual speech sounds like I'm writing a legal document. I'll use 'that' or drop it.",
                    takeshi: '英作文で which を多用してる間は、硬さが抜けない。会話では that か省略で勝負。',
                    yuki: 'which の方が正解だと思ってた。口語では that か省略がデフォルトって初耳。',
                    kenji: '日常会話で which を連発するとインテリぶった感出る。that でええわ。',
                    mina: 'SNS の投稿で which 使ってる人あんま見ない。みんな that か省略やね。',
                },
            },
            {
                id: 'd11-g-03-non-restrictive',
                label: '非制限用法(コンマ付き)では that は使えない',
                trigger: '「東京に住んでる兄は医者だ」を英語で。',
                points: {
                    core: { en: 'My brother, who lives in Tokyo, is a doctor.', ja: '非制限用法(補足情報)。コンマで挟む。that は使えない。' },
                    nuance: { en: 'My brother, that lives in Tokyo, is a doctor. -- ungrammatical.', ja: 'コンマの後に that は文法的に誤り。必ず who / which を使う。' },
                    shift: { en: 'The Eiffel Tower, which is in Paris, is 324m tall.', ja: '物でも同じルール。非制限では which のみ。that 不可。' },
                    native: { en: 'My wife, who you met last week, loves that restaurant.', ja: '補足情報をサラッと挟む構文。ネイティブの定番。' },
                },
                trap: '制限と非制限の区別がない日本語脳では、コンマを付けずに全部 that で済ませがち。',
                tip: 'コンマで挟めるなら非制限 → that 禁止。挟めない(本質情報)なら制限 → that OK。',
                reactions: {
                    master: '制限用法 = どの〜か特定する、非制限用法 = 補足情報を添える。後者では that は文法的に不可。',
                    lisa: "'My brother, that lives in Tokyo' -- that sentence makes me stop reading. Just wrong.",
                    takeshi: 'コンマの後に that を置いた瞬間、ネイティブは違和感で止まる。ここはルール厳守。',
                    yuki: '制限と非制限、学校で習ったけど使い分け意識できてなかった。コンマが鍵か。',
                    kenji: '現場でちょっと補足したい時、"my boss, who..." でコンマ挟む癖付ける。',
                    mina: 'SNS の自己紹介で "my dog, who is super cute" ってコンマ使うと、補足のリズムが出るね。',
                },
            },
            {
                id: 'd11-g-04-omission',
                label: '主格は省略不可、目的格は省略可',
                trigger: '「向こうに座ってる男は弟だ」を英語で。',
                points: {
                    core: { en: 'The man who is sitting over there is my brother.', ja: '主格の関係代名詞 (who / which / that) は省略できない。is が動詞なので who が主語として必要。' },
                    nuance: { en: 'The man I met is my brother. (OK -- 目的格は省略可)', ja: '目的格なら関係代名詞ごと省略できる。met の主語が I なので man は目的語。' },
                    shift: { en: "The man sitting over there is my brother. (分詞で言い換え可)", ja: '「who is + 現在分詞」は who is を省略して分詞1語で表せる。よりネイティブ的。' },
                    native: { en: "The guy sitting at the bar is my brother.", ja: '関係代名詞+be 動詞を省略して分詞だけにするのが口語の鉄板。' },
                },
                trap: '「関係代名詞は省略できる」とだけ覚えて、主格まで省略してしまう。文として壊れる。',
                tip: '動詞が続くなら主格 → 省略不可。代名詞+動詞が続くなら目的格 → 省略可。',
                reactions: {
                    master: '主格 (who/which/that + V) は省略不可、目的格 (who(m)/which/that + S + V) は省略可。分詞化は主格の代替。',
                    lisa: "If you drop the subject, the sentence breaks. 'The man is sitting there' isn't the same as 'The man sitting there'.",
                    takeshi: '省略できるのは目的格だけ。主格まで削ると文が壊れる。ここ覚えとけ。',
                    yuki: '省略可能の条件、初めて整理できた。主格か目的格か見てから削る。',
                    kenji: '"the guy sitting over there"、分詞だけで済ませるのカッコいい。明日から使う。',
                    mina: 'SNS で "the girl posting reels" みたいに分詞で繋ぐ書き方、見てみるとスッキリしてるね。',
                },
            },
            {
                id: 'd11-g-05-whose-whom',
                label: 'whose / whom -- 使える人と使えない人',
                trigger: '「父親が医者の友人」を英語で。',
                points: {
                    core: { en: 'my friend whose father is a doctor', ja: '所有格の関係代名詞は whose。人にも物にも使える。' },
                    nuance: { en: 'the person whom I met -- formal. whom I met with -- also formal.', ja: 'whom は目的格だが、会話ではほぼ who か省略に置き換わる。whom はフォーマルの合図。' },
                    shift: { en: 'Casual: "my friend with a doctor dad" -- whose を避けて with で言い換え.', ja: 'whose は口語で重い。with + 名詞で言い換えると自然。' },
                    native: { en: "I have a friend whose dad's a doctor.", ja: 'whose は口語でも使うが、of + 名詞や with + 名詞で逃げることも多い。' },
                },
                trap: 'whom を現代の会話で使うと急に古臭い響きになる。論文・ビジネス文書以外では who で OK。',
                tip: '所有なら whose、目的格はほぼ省略か who、whom はフォーマル限定、と覚える。',
                reactions: {
                    master: 'whose は所有格、whom は目的格。whom は現代英語ではフォーマル限定、会話では who / 省略が主流。',
                    lisa: "If someone says 'whom' in casual conversation, I assume they just finished reading Shakespeare.",
                    takeshi: 'whom はエッセイ用。会話で使うと急にインテリぶった響きになる。who で十分。',
                    yuki: 'whose と whom を混同してた。所有格と目的格、全然違う役割なんや。',
                    kenji: '現場で whom は使わん。who か省略か with で逃げる、が実用的。',
                    mina: 'SNS で whom 使ってる人ほぼ見ない。whose はたまに見るけど、with で書き換える人多いね。',
                },
            },
        ],
    },
};
