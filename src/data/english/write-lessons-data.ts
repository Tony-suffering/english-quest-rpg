// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/data/english/write-lessons-data.ts
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
/**
 * 自動生成(_build_lessons.mts)。全30日のインタラクティブ・レッスンデータ。
 * 各 day: 本文タップ辞書(glossary, 文法解説つき) + 語彙演習(vocab) + 文法重要事項(grammar)。
 * 編集は元データ(write-lesson-day1.ts / 各エッセイ)側で行い再生成すること。
 */
export interface Gloss { pos: string; ja: string; tag?: string; grammar?: string; }
export interface VocabItem { word: string; pos: string; ipa: string; def: string; example: string; }
export interface GrammarPoint { no: number; title: string; example: string; highlight: string; explain: string; }
export interface DayLesson { glossary: Record<string, Gloss>; vocab: VocabItem[]; grammar: GrammarPoint[]; }

export const WRITE_LESSONS: Record<number, DayLesson> = {
  "1": {
    "glossary": {
      "debate": {
        "pos": "Noun",
        "ja": "議論、論争",
        "tag": "不可算",
        "grammar": "「議論」全般では不可算。much debate のように much が付くのが不可算の証拠(× many debates)。a heated debate(個別の討論会)なら可算化する。"
      },
      "enormous": {
        "pos": "Adjective",
        "ja": "莫大な、巨大な"
      },
      "sums": {
        "pos": "Noun",
        "ja": "金額、合計",
        "tag": "複数形",
        "grammar": "sum=「金額」。複数年・複数項目にわたる莫大な支出を指すので複数。sums of money(多額の金)が定番コロケーション。"
      },
      "spent": {
        "pos": "Verb",
        "ja": "費やす(spend の過去分詞)",
        "tag": "過去分詞・後置修飾",
        "grammar": "the sums (that are) spent on ... の関係詞+be 省略。「〜に費やされた金額」と名詞を後ろから修飾。spend money on の on がそのまま残る。"
      },
      "exploration": {
        "pos": "Noun",
        "ja": "探査、探検",
        "tag": "無冠詞・不可算",
        "grammar": "-tion の抽象名詞は基本不可算。space exploration で無冠詞のかたまり。an exploration(一回の探査)なら可算化。"
      },
      "justified": {
        "pos": "Verb",
        "ja": "正当化する(の過去分詞)",
        "tag": "受動",
        "grammar": "can be justified=助動詞+受動態で「正当化されうる」。justify A=Aを(理由を示して)正当化する。"
      },
      "expense": {
        "pos": "Noun",
        "ja": "費用、出費",
        "tag": "可算/不可算",
        "grammar": "「費用」一般は不可算(the expense is vast)。複数 expenses は「諸経費・出費項目」。意味で可算が切り替わる典型語。"
      },
      "undeniably": {
        "pos": "Adverb",
        "ja": "紛れもなく、否定できないほど",
        "tag": "語法",
        "grammar": "文全体を修飾する文副詞。形容詞 vast の前に置いて「紛れもなく莫大」と譲歩を強める。Admittedly と同じ役割。"
      },
      "vast": {
        "pos": "Adjective",
        "ja": "莫大な、広大な"
      },
      "firmly": {
        "pos": "Adverb",
        "ja": "固く、きっぱりと",
        "grammar": "I firmly believe that ... 立場を強く打ち出すテーゼの定番。動詞 believe を修飾。"
      },
      "believe": {
        "pos": "Verb",
        "ja": "信じる、〜だと思う"
      },
      "long-term": {
        "pos": "Adjective",
        "ja": "長期的な",
        "tag": "複合形容詞",
        "grammar": "ハイフンで2語を1つの形容詞に。名詞の前で使う限定用法では long-term、述語では in the long term と形が変わる。"
      },
      "benefits": {
        "pos": "Noun",
        "ja": "利益、恩恵",
        "tag": "複数形",
        "grammar": "benefit=利点は可算。複数の利点を列挙する論旨なので複数。the benefits ... は後ろの of/文脈で「この件の利点」と特定され the が付く。"
      },
      "far": {
        "pos": "Adverb",
        "ja": "はるかに(強調)",
        "tag": "比較の強調",
        "grammar": "比較表現の前に置いて「はるかに」。far outweigh / far more important のように much / significantly と同じく程度を強める。"
      },
      "outweigh": {
        "pos": "Verb",
        "ja": "〜を上回る、〜に勝る",
        "grammar": "out-(超える)+weigh(重さ)。天秤の比喩で「重要性・利益が勝る」。benefits outweigh the costs/drawbacks が結論の鉄板。"
      },
      "costs": {
        "pos": "Noun",
        "ja": "コスト、費用",
        "tag": "複数形",
        "grammar": "benefits と対にして複数で揃える。cost は「費用」では可算、the cost of living のように of で特定もする。"
      },
      "reasons": {
        "pos": "Noun",
        "ja": "理由",
        "tag": "複数形",
        "grammar": "three reasons なので当然複数。for three main reasons=序論末で本論3段落を予告する型。"
      },
      "plays": {
        "pos": "Verb",
        "ja": "(役割を)果たす",
        "tag": "三単現",
        "grammar": "主語 space exploration は不可算で単数扱い→ plays に -s。play a crucial role in -ing がかたまり。"
      },
      "crucial": {
        "pos": "Adjective",
        "ja": "極めて重要な",
        "grammar": "important の格上げ。play a crucial/pivotal/vital role in で重要性を述べる定番コロケーション。"
      },
      "role": {
        "pos": "Noun",
        "ja": "役割",
        "tag": "冠詞 a",
        "grammar": "play a role の a は必須。role は可算で「一つの役割」。a crucial role in driving ... と続く。"
      },
      "driving": {
        "pos": "Verb",
        "ja": "推進する、駆り立てる",
        "tag": "前置詞+動名詞",
        "grammar": "in driving=前置詞 in+動名詞で「〜を推進する点で」。role in (doing) の形。"
      },
      "technological": {
        "pos": "Adjective",
        "ja": "技術的な、科学技術の"
      },
      "innovation": {
        "pos": "Noun",
        "ja": "技術革新",
        "tag": "無冠詞・不可算",
        "grammar": "概念としての「革新」は不可算→無冠詞。an innovation なら「一つの新機軸」と可算化。technological innovation のかたまりで覚える。"
      },
      "challenges": {
        "pos": "Noun",
        "ja": "課題、難題",
        "tag": "冠詞 the+複数",
        "grammar": "The challenges of operating in space=of句で「どの困難か」が特定されるので the。challenge は可算で複数化。"
      },
      "operating": {
        "pos": "Verb",
        "ja": "活動する、操作する",
        "tag": "前置詞+動名詞",
        "grammar": "of operating in space=前置詞 of+動名詞。「宇宙で活動することの(困難)」。"
      },
      "force": {
        "pos": "Verb",
        "ja": "(無理に)〜させる、強いる",
        "tag": "語法 SVOC",
        "grammar": "force O to do=「Oに〜するのを強いる」。force + 人 + to不定詞の使役構文。make が to なしなのに対し force は to を取る。"
      },
      "scientists": {
        "pos": "Noun",
        "ja": "科学者",
        "tag": "無冠詞複数(総称)",
        "grammar": "無冠詞の複数形で「科学者というもの全般」を表す総称用法。論述で人・物を一般化するときの基本形。"
      },
      "develop": {
        "pos": "Verb",
        "ja": "開発する、発展させる"
      },
      "solutions": {
        "pos": "Noun",
        "ja": "解決策",
        "tag": "複数形",
        "grammar": "develop solutions=複数の解決策を生む。solution は可算。the solution to(〜の解決策)では to を取る。"
      },
      "transform": {
        "pos": "Verb",
        "ja": "一変させる、変革する",
        "grammar": "change の格上げ。transform everyday life=日常を根本から変える。"
      },
      "everyday": {
        "pos": "Adjective",
        "ja": "日常の、毎日の",
        "tag": "紛らわしい語",
        "grammar": "一語の everyday は形容詞「日常の」(everyday life)。二語の every day は副詞「毎日」。スペルで品詞が変わる頻出ミス。"
      },
      "prime": {
        "pos": "Adjective",
        "ja": "最も良い、主要な",
        "grammar": "a prime example of=「その好例」。For example の格上げ言い換え。"
      },
      "example": {
        "pos": "Noun",
        "ja": "例、実例",
        "tag": "冠詞 a",
        "grammar": "A prime example of this is ... 初出で不特定なので a。example は可算。"
      },
      "satellite": {
        "pos": "Noun",
        "ja": "人工衛星"
      },
      "navigation": {
        "pos": "Noun",
        "ja": "ナビ、位置測定",
        "tag": "冠詞 the",
        "grammar": "the satellite navigation we now rely on=後ろの関係詞節で「どのナビか」が限定されるので the。後置修飾→the の典型。"
      },
      "rely": {
        "pos": "Verb",
        "ja": "頼る、当てにする",
        "tag": "句動詞",
        "grammar": "rely on=〜に頼る。on とセット。前置詞 on を落とさない。(the navigation) we rely on の末尾に on が残るのは関係詞で目的語が前に出たため。"
      },
      "originated": {
        "pos": "Verb",
        "ja": "生まれた、始まった",
        "tag": "自動詞",
        "grammar": "originate from=〜から生まれる。自動詞なので受動にしない(× was originated)。"
      },
      "programs": {
        "pos": "Noun",
        "ja": "計画、プログラム",
        "tag": "複数形",
        "grammar": "space programs=各国の宇宙計画(複数)。program は可算。"
      },
      "essential": {
        "pos": "Adjective",
        "ja": "不可欠な、必須の",
        "grammar": "essential for/to=〜に不可欠。very important の格上げ。"
      },
      "survival": {
        "pos": "Noun",
        "ja": "生存、存続",
        "tag": "冠詞 the・不可算",
        "grammar": "survival は不可算だが、the survival of humanity と of句で限定されるので the が付く。"
      },
      "humanity": {
        "pos": "Noun",
        "ja": "人類",
        "tag": "無冠詞・不可算",
        "grammar": "人類全体を表す humanity は無冠詞不可算。mankind / humankind も同様。the human race だけ the を取る。"
      },
      "resources": {
        "pos": "Noun",
        "ja": "資源",
        "tag": "無冠詞複数(総称)",
        "grammar": "無冠詞複数で「資源全般」。resources on Earth=地球上の資源。単数 resource は「(一つの)資源・手段」。"
      },
      "increasingly": {
        "pos": "Adverb",
        "ja": "ますます",
        "grammar": "形容詞 strained を修飾し「だんだん逼迫して」。趨勢を示す論述頻出副詞。"
      },
      "strained": {
        "pos": "Adjective",
        "ja": "逼迫した、張りつめた",
        "tag": "過去分詞→形容詞",
        "grammar": "become strained=形容詞化した過去分詞。「(資源が)張りつめる=不足する」。"
      },
      "locating": {
        "pos": "Verb",
        "ja": "見つけ出す、位置を突き止める",
        "tag": "動名詞主語",
        "grammar": "Locating ... becomes vital=動名詞句が主語。主語の動名詞は単数扱い→ becomes に -s。"
      },
      "sources": {
        "pos": "Noun",
        "ja": "源、供給源",
        "tag": "複数形",
        "grammar": "new sources of materials=複数の供給源。source of=〜の源。"
      },
      "materials": {
        "pos": "Noun",
        "ja": "物資、材料",
        "tag": "複数形",
        "grammar": "ここでは「資材・物資(可算的)」で複数。material 単数は「素材」全般で不可算にもなる、意味で可算が変わる語。"
      },
      "potential": {
        "pos": "Adjective",
        "ja": "潜在的な、可能性のある"
      },
      "habitats": {
        "pos": "Noun",
        "ja": "生息地、居住地",
        "tag": "複数形"
      },
      "vital": {
        "pos": "Adjective",
        "ja": "極めて重要な、不可欠の",
        "grammar": "crucial / essential の言い換え。becomes vital=不可欠になる。手札を増やす同義語。"
      },
      "asteroid": {
        "pos": "Noun",
        "ja": "小惑星"
      },
      "mining": {
        "pos": "Noun",
        "ja": "採掘",
        "tag": "無冠詞・不可算",
        "grammar": "活動を表す -ing 名詞は不可算。asteroid mining で無冠詞のかたまり。"
      },
      "supply": {
        "pos": "Verb",
        "ja": "供給する",
        "grammar": "could supply=「供給しうる」。supply A with B / supply B(to A) の語法。"
      },
      "minerals": {
        "pos": "Noun",
        "ja": "鉱物",
        "tag": "複数形"
      },
      "scarce": {
        "pos": "Adjective",
        "ja": "乏しい、希少な",
        "tag": "語法",
        "grammar": "grow/become scarce=希少になる。growing scarce=だんだん不足してきている。物資が「手に入りにくい」の定番形容詞。"
      },
      "planet": {
        "pos": "Noun",
        "ja": "惑星(ここでは地球)",
        "tag": "所有格",
        "grammar": "our planet=「我々の惑星=地球」。the planet / our planet で Earth の言い換え。"
      },
      "inspires": {
        "pos": "Verb",
        "ja": "促す、鼓舞する",
        "tag": "三単現",
        "grammar": "主語 space exploration(不可算単数)→ inspires。inspire 物事=〜を呼び起こす。"
      },
      "international": {
        "pos": "Adjective",
        "ja": "国際的な"
      },
      "cooperation": {
        "pos": "Noun",
        "ja": "協力",
        "tag": "無冠詞・不可算",
        "grammar": "cooperation は不可算→無冠詞。international cooperation のかたまり。a cooperation とは言わない。"
      },
      "scientific": {
        "pos": "Adjective",
        "ja": "科学的な"
      },
      "ambition": {
        "pos": "Noun",
        "ja": "野心、大志",
        "tag": "可算/不可算",
        "grammar": "ここは「向上心」全般で無冠詞・不可算。an ambition なら「(具体的な)一つの野望」と可算化。"
      },
      "massive": {
        "pos": "Adjective",
        "ja": "巨大な、大規模な"
      },
      "projects": {
        "pos": "Noun",
        "ja": "事業、プロジェクト",
        "tag": "複数形"
      },
      "require": {
        "pos": "Verb",
        "ja": "必要とする、要求する",
        "tag": "語法 SVOC",
        "grammar": "require O to do=「Oに〜することを求める」。force と同じく to不定詞を取る使役系。"
      },
      "nations": {
        "pos": "Noun",
        "ja": "国家、国",
        "tag": "無冠詞複数(総称)",
        "grammar": "無冠詞複数で「国々一般」。nation は可算。the nation なら特定の一国(国民)。"
      },
      "pool": {
        "pos": "Verb",
        "ja": "(資源・知恵を)出し合う",
        "tag": "語法",
        "grammar": "名詞 pool(プール=溜め)から転じた動詞。pool their expertise=専門知識を結集する。お金・人材にも使う。"
      },
      "expertise": {
        "pos": "Noun",
        "ja": "専門知識、専門技術",
        "tag": "不可算",
        "grammar": "expertise は不可算。× an expertise / × expertises。much / considerable / technical expertise のように量で修飾する。"
      },
      "compete": {
        "pos": "Verb",
        "ja": "競争する",
        "tag": "並列・原形",
        "grammar": "rather than compete=to pool ... rather than (to) compete の並列。rather than の後は原形/動名詞。"
      },
      "demonstrates": {
        "pos": "Verb",
        "ja": "示す、証明する",
        "tag": "間接疑問",
        "grammar": "demonstrate how ...=how節(間接疑問)を目的語に取る。「いかに〜かを示す」。語順は平叙文(how rivals can collaborate)。"
      },
      "former": {
        "pos": "Adjective",
        "ja": "かつての、以前の",
        "grammar": "former rivals=かつての敵。the former / the latter(前者/後者)とは別用法。"
      },
      "rivals": {
        "pos": "Noun",
        "ja": "競争相手、敵対者",
        "tag": "複数形"
      },
      "collaborate": {
        "pos": "Verb",
        "ja": "協力する、共同で取り組む",
        "tag": "自動詞",
        "grammar": "collaborate with(人)/ on(事)/ toward(目標)。自動詞なので前置詞を伴う。cooperate と同義。"
      },
      "productively": {
        "pos": "Adverb",
        "ja": "生産的に",
        "grammar": "動詞 collaborate を修飾。collaborate productively=実りある形で協力する。"
      },
      "shared": {
        "pos": "Adjective",
        "ja": "共通の、共有された",
        "tag": "過去分詞→形容詞",
        "grammar": "a shared goal=共有された(=共通の)目標。share の過去分詞が形容詞化。"
      },
      "goal": {
        "pos": "Noun",
        "ja": "目標",
        "tag": "冠詞 a",
        "grammar": "a shared goal=初出・不特定なので a。goal は可算。toward a goal=目標に向けて。"
      },
      "conclusion": {
        "pos": "Noun",
        "ja": "結論",
        "grammar": "In conclusion=結論を切り出す決まり文句(無冠詞)。draw a conclusion なら a 付き。"
      },
      "financial": {
        "pos": "Adjective",
        "ja": "財政的な、金銭的な"
      },
      "burden": {
        "pos": "Noun",
        "ja": "負担、重荷",
        "tag": "冠詞 the",
        "grammar": "the financial burden of ...=of句で特定されるので the。a burden(一つの重荷)とも使う可算名詞。"
      },
      "considerable": {
        "pos": "Adjective",
        "ja": "かなりの、相当な",
        "grammar": "large の格上げ。不可算名詞・程度を「相当な」と上品に盛る。considerable expense/expertise。"
      },
      "drawbacks": {
        "pos": "Noun",
        "ja": "欠点、不利な点",
        "tag": "複数形",
        "grammar": "benefits と対で複数。benefits outweigh the drawbacks=利点が欠点を上回る、の結論の型。"
      },
      "advances": {
        "pos": "Noun",
        "ja": "進歩、前進",
        "tag": "複数形",
        "grammar": "advance=進歩は複数 advances で「(複数分野の)進歩」。technological advances が定番。動詞 advance(前進する)と区別。"
      },
      "prospects": {
        "pos": "Noun",
        "ja": "見込み、展望",
        "tag": "複数形",
        "grammar": "prospect=見込み。複数 prospects で「将来性・展望」。the prospects for(〜の見通し)。単数 a prospect は「見込み・候補者」。"
      },
      "fostering": {
        "pos": "Noun",
        "ja": "促進、育成",
        "tag": "the+動名詞+of",
        "grammar": "the fostering of global cooperation=「the+動名詞+of」で動詞を重厚な名詞句に。論述で「〜すること」を格調高く言う型。"
      },
      "confirm": {
        "pos": "Verb",
        "ja": "裏づける、確認する",
        "tag": "主述の一致",
        "grammar": "主語は3つの名詞句(advances, prospects, fostering)+all→複数扱いなので原形 confirm(三単現の -s なし)。"
      },
      "investment": {
        "pos": "Noun",
        "ja": "投資",
        "tag": "不可算・this で特定",
        "grammar": "行為としての investment は不可算。this investment=この投資(指示語で特定)。an investment なら個別の投資案件(可算)。"
      },
      "thoroughly": {
        "pos": "Adverb",
        "ja": "徹底的に、まったく",
        "grammar": "形容詞 worthwhile を強める。thoroughly worthwhile=「まったくもって価値がある」と断定を強調。"
      },
      "worthwhile": {
        "pos": "Adjective",
        "ja": "価値のある、やりがいのある",
        "grammar": "worth + while(時間)が語源。be worthwhile=(時間・金・労力に)見合う。結論の締めで投資を肯定。"
      }
    },
    "vocab": [
      {
        "word": "justify",
        "pos": "Verb",
        "ipa": "/ˈdʒʌstɪfaɪ/",
        "def": "to show that something is reasonable or necessary, and therefore right",
        "example": "The enormous sums spent on space exploration can be justified."
      },
      {
        "word": "undeniably",
        "pos": "Adverb",
        "ipa": "/ˌʌndɪˈnaɪəbli/",
        "def": "in a way that is clearly true and cannot be doubted",
        "example": "While the expense is undeniably vast, the benefits are greater."
      },
      {
        "word": "outweigh",
        "pos": "Verb",
        "ipa": "/ˌaʊtˈweɪ/",
        "def": "to be greater or more important than something else",
        "example": "The long-term benefits far outweigh the costs."
      },
      {
        "word": "crucial",
        "pos": "Adjective",
        "ipa": "/ˈkruːʃəl/",
        "def": "extremely important because it affects the result of something",
        "example": "Space exploration plays a crucial role in driving innovation."
      },
      {
        "word": "innovation",
        "pos": "Noun",
        "ipa": "/ˌɪnəˈveɪʃ(ə)n/",
        "def": "a new idea, method, or invention",
        "example": "It plays a crucial role in driving technological innovation."
      },
      {
        "word": "scarce",
        "pos": "Adjective",
        "ipa": "/skeəs/",
        "def": "not easy to find or get; existing only in small amounts",
        "example": "Asteroid mining could supply minerals that are growing scarce."
      },
      {
        "word": "expertise",
        "pos": "Noun",
        "ipa": "/ˌekspɜːˈtiːz/",
        "def": "special skill or knowledge in a particular field",
        "example": "Massive projects require nations to pool their expertise."
      },
      {
        "word": "worthwhile",
        "pos": "Adjective",
        "ipa": "/ˌwɜːθˈwaɪl/",
        "def": "worth the time, money, or effort that you spend on it",
        "example": "This investment is thoroughly worthwhile."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "譲歩の While 構文 — 反対を一度認めてから主張する",
        "example": "While the expense is undeniably vast, I firmly believe that the benefits far outweigh the costs.",
        "highlight": "While the expense is undeniably vast",
        "explain": "While + 譲歩 → 主節で自分の主張。反対意見を一度認めることで、視野の広さと説得力が出る。英検1級の序論で「両論併記(減点)」を避けつつ立場を強く打ち出す鉄板の型。Although でも代用可。"
      },
      {
        "no": 2,
        "title": "far + 比較表現で主張を強調する",
        "example": "The long-term benefits far outweigh the costs.",
        "highlight": "far outweigh",
        "explain": "outweigh(上回る)を far で強める。比較級・比較動詞の前に far / much / significantly を置くと「はるかに」の強調になる。benefits/advantages far outweigh the costs/drawbacks は賛成側の結論で天秤を一気に傾ける決め表現。"
      },
      {
        "no": 3,
        "title": "可算・不可算と冠詞 — なぜ複数形・無冠詞なのか",
        "example": "space exploration ... drives innovation ... and the benefits far outweigh the costs.",
        "highlight": "innovation",
        "explain": "exploration / innovation / cooperation のような -tion 抽象名詞は不可算で無冠詞。一方 benefits / costs / reasons / drawbacks は「数えられる複数の項目」を列挙するので複数形。of句や関係詞で特定されると the(the survival of humanity, the navigation we rely on)。この可算/冠詞の判断は /english/articles と同じ原理。"
      }
    ]
  },
  "2": {
    "glossary": {
      "argued": {
        "pos": "Verb",
        "ja": "主張される",
        "tag": "受動",
        "grammar": "It is often argued that ... =「〜とよく言われる」。形式主語 It + 受動で論を客観化する定番の書き出し。"
      },
      "humanity": {
        "pos": "Noun",
        "ja": "人類",
        "tag": "無冠詞・不可算",
        "grammar": "「人類」全体を集合的に指すときは無冠詞・不可算。a humanity とは言わない。mankind / humankind も同様。"
      },
      "eventually": {
        "pos": "Adverb",
        "ja": "いずれ、最終的に",
        "tag": "副詞"
      },
      "attain": {
        "pos": "Verb",
        "ja": "達成する",
        "grammar": "achieve より硬い語。目標・状態を「努力して得る」。attain peace / attain a goal。"
      },
      "lasting": {
        "pos": "Adjective",
        "ja": "永続する",
        "tag": "現在分詞→形容詞",
        "grammar": "last(続く)の現在分詞が形容詞化。lasting peace=「永続的な平和」。一過性でないニュアンス。"
      },
      "admirable": {
        "pos": "Adjective",
        "ja": "立派な、称賛に値する",
        "grammar": "-able は「〜され得る」。admire(称賛する)+able=「称賛され得る」。"
      },
      "aspiration": {
        "pos": "Noun",
        "ja": "熱望、大志",
        "tag": "冠詞 an",
        "grammar": "an admirable aspiration。具体的な一つの願望として可算化し an。「平和実現」という個別の理想を指すため。"
      },
      "notion": {
        "pos": "Noun",
        "ja": "考え、観念",
        "tag": "冠詞 the",
        "grammar": "the notion that ... =「〜という考え」。直後の that 節が中身を限定するので the。同格 that の典型。"
      },
      "achievable": {
        "pos": "Adjective",
        "ja": "達成可能な",
        "tag": "形容詞",
        "grammar": "achieve+able。realistically achievable=「現実的に達成可能」。副詞で度合いを限定。"
      },
      "offer": {
        "pos": "Verb",
        "ja": "提示する",
        "grammar": "offer three reasons=「3つの理由を挙げる」。give より「差し出す」ニュアンスで論述に合う。"
      },
      "competition": {
        "pos": "Noun",
        "ja": "競争",
        "tag": "無冠詞・不可算",
        "grammar": "competition over ... =「〜をめぐる争い」。抽象概念として不可算・無冠詞。a competition なら「(個別の)競技会」と意味が変わる。"
      },
      "limited": {
        "pos": "Adjective",
        "ja": "限られた",
        "tag": "過去分詞→形容詞",
        "grammar": "limit の過去分詞が形容詞化。limited resources=「限りある資源」。受動的に「限定された」状態を表す。"
      },
      "resources": {
        "pos": "Noun",
        "ja": "資源",
        "tag": "複数形",
        "grammar": "水・エネルギー等の複数種を念頭に複数形。resource は数えられる「資源(の種類)」。集合的に resources。"
      },
      "inevitable": {
        "pos": "Adjective",
        "ja": "避けられない",
        "grammar": "in-(否定)+evitable(避けられる)。makes conflict almost inevitable=「紛争をほぼ不可避にする」。SVOC 構文の C。"
      },
      "populations": {
        "pos": "Noun",
        "ja": "人口",
        "tag": "複数形",
        "grammar": "population は通常不可算/単数だが、複数国の人口を指すと複数化。ここでは「諸国の人口」で populations grow。"
      },
      "clash": {
        "pos": "Verb",
        "ja": "衝突する",
        "grammar": "nations clash over X=「XをめぐってXで衝突する」。over が「争いの対象」を導く前置詞。"
      },
      "disputes": {
        "pos": "Noun",
        "ja": "論争、紛争",
        "tag": "複数形",
        "grammar": "disputes over river access=「川の利用権をめぐる紛争」。複数の事例を想定し複数形。over がここでも対象を示す。"
      },
      "arid": {
        "pos": "Adjective",
        "ja": "乾燥した",
        "grammar": "arid regions=「乾燥地帯」。dry より地理・気候の専門的な語感。"
      },
      "provoke": {
        "pos": "Verb",
        "ja": "引き起こす、挑発する",
        "grammar": "provoke tension=「緊張を招く」。cause よりも「刺激して引き起こす」含み。"
      },
      "neighboring": {
        "pos": "Adjective",
        "ja": "隣接する",
        "tag": "現在分詞→形容詞",
        "grammar": "neighbor(隣接する)の分詞形。neighboring states=「近隣諸国」。"
      },
      "deep-rooted": {
        "pos": "Adjective",
        "ja": "根深い",
        "grammar": "複合形容詞。deep + rooted(根づいた)。deep-rooted differences=「根深い相違」。ハイフンで一語の修飾語に。"
      },
      "ideological": {
        "pos": "Adjective",
        "ja": "イデオロギーの、思想上の",
        "tag": "形容詞"
      },
      "reconcile": {
        "pos": "Verb",
        "ja": "和解させる、調和させる",
        "grammar": "difficult to reconcile=「調和させるのが困難」。tough-movement: 形容詞+to do の構文で目的語が主語位置に来る。"
      },
      "unwilling": {
        "pos": "Adjective",
        "ja": "気が進まない",
        "grammar": "un-+willing。be unwilling to do=「〜したがらない」。to 不定詞を取る。"
      },
      "compromise": {
        "pos": "Verb",
        "ja": "妥協する",
        "tag": "句動詞",
        "grammar": "compromise on ... =「〜について妥協する」。on とセットで「譲歩の対象」を示す。"
      },
      "persistence": {
        "pos": "Noun",
        "ja": "根強さ、持続",
        "tag": "冠詞 the・無冠詞化",
        "grammar": "The persistence of ... =「〜が根強く続いていること」。of 句で限定されるので the。persist の名詞形。"
      },
      "long-standing": {
        "pos": "Adjective",
        "ja": "長年続く",
        "grammar": "複合形容詞。long + standing(続いている)。long-standing conflicts=「長年の紛争」。"
      },
      "sectarian": {
        "pos": "Adjective",
        "ja": "宗派間の",
        "grammar": "sect(宗派)由来。sectarian conflicts=「宗派対立」。宗教・思想集団間の争いを指す専門語。"
      },
      "illustrates": {
        "pos": "Verb",
        "ja": "例証する",
        "tag": "三単現",
        "grammar": "主語 The persistence(単数の抽象名詞)に呼応し -s。「〜がこの現実をはっきり示す」。具体例で抽象を裏づける動詞。"
      },
      "stubborn": {
        "pos": "Adjective",
        "ja": "頑固な、根強い",
        "grammar": "this stubborn reality=「この根強い現実」。人だけでなく状況にも使い「変わりにくい」を表す。"
      },
      "existence": {
        "pos": "Noun",
        "ja": "存在",
        "tag": "冠詞 the",
        "grammar": "the existence of powerful weapons=「強力な兵器が存在すること」。of 句で限定→the。exist の名詞形。"
      },
      "distrust": {
        "pos": "Noun",
        "ja": "不信",
        "tag": "無冠詞・不可算",
        "grammar": "dis-(否定)+trust。感情・状態として不可算・無冠詞。mutual distrust=「相互不信」。"
      },
      "arsenals": {
        "pos": "Noun",
        "ja": "兵器庫、兵器の蓄え",
        "tag": "複数形",
        "grammar": "maintain large arsenals=「大規模な兵器を保有する」。各国それぞれの保有を念頭に複数形。"
      },
      "mutual": {
        "pos": "Adjective",
        "ja": "相互の",
        "grammar": "mutual suspicion=「相互不信」。両者が互いに向ける感情を表す。"
      },
      "suspicion": {
        "pos": "Noun",
        "ja": "疑念",
        "tag": "無冠詞・不可算",
        "grammar": "感情・心理状態として不可算・無冠詞。a suspicion なら「(個別の)嫌疑」と可算化する。"
      },
      "ongoing": {
        "pos": "Adjective",
        "ja": "進行中の",
        "grammar": "on going。the ongoing arms races=「現在進行中の軍拡競争」。継続している事態を表す。"
      },
      "arms races": {
        "pos": "Noun",
        "ja": "軍拡競争",
        "tag": "複数形・語法",
        "grammar": "arms=「武器」で常に複数。race(競争)を伴い arms race=「軍拡競争」。複数の対立で races と複数化。"
      },
      "rival": {
        "pos": "Adjective",
        "ja": "対立する、ライバルの",
        "grammar": "rival powers=「対立する大国」。名詞 rival が形容詞的に前置修飾。"
      },
      "perpetuate": {
        "pos": "Verb",
        "ja": "永続させる",
        "grammar": "perpetual(永続的な)と同語源。security concerns perpetuate hostility=「安全保障上の懸念が敵意を温存する」。"
      },
      "hostility": {
        "pos": "Noun",
        "ja": "敵意",
        "tag": "無冠詞・不可算",
        "grammar": "感情として不可算・無冠詞。hostilities と複数にすると「戦闘行為」の意味になる点に注意。"
      },
      "harmony": {
        "pos": "Noun",
        "ja": "調和",
        "tag": "無冠詞・不可算",
        "grammar": "global harmony=「世界の調和」。抽象概念として不可算・無冠詞。"
      },
      "noble": {
        "pos": "Adjective",
        "ja": "高潔な、立派な",
        "grammar": "the dream ... is noble=「その夢は高邁だ」。理想・志を称える形容詞。"
      },
      "irreconcilable": {
        "pos": "Adjective",
        "ja": "和解しがたい",
        "grammar": "ir-(否定)+reconcilable。reconcile(調和させる)由来。irreconcilable beliefs=「相容れない信条」。"
      },
      "persistent": {
        "pos": "Adjective",
        "ja": "根強い、執拗な",
        "grammar": "persist の形容詞形。persistent military distrust=「根深い軍事的不信」。"
      },
      "genuine": {
        "pos": "Adjective",
        "ja": "真の、本物の",
        "grammar": "genuine world peace=「真の世界平和」。real より「見せかけでない」を強調。"
      },
      "unattainable": {
        "pos": "Adjective",
        "ja": "達成不可能な",
        "grammar": "un-+attainable。attain の派生。an unattainable ideal=「達成不能な理想」。本論の結論キーワード。"
      },
      "ideal": {
        "pos": "Noun",
        "ja": "理想",
        "tag": "冠詞 an",
        "grammar": "an unattainable ideal。形容詞付きで「一つの理想像」として可算化、母音前なので an。"
      },
      "convinced": {
        "pos": "Adjective",
        "ja": "確信して",
        "tag": "過去分詞→形容詞",
        "grammar": "I am convinced that ... =「〜だと確信している」。convince の過去分詞が be 動詞と結び受動的状態を表す。"
      },
      "desirable": {
        "pos": "Adjective",
        "ja": "望ましい",
        "grammar": "desire+able=「望まれ得る」。however desirable=「どれほど望ましくとも」の譲歩挿入。"
      },
      "realistically": {
        "pos": "Adverb",
        "ja": "現実的に",
        "tag": "副詞",
        "grammar": "realistic+ly。cannot realistically be achieved=「現実的には達成され得ない」。助動詞と本動詞の間に挿入し動詞を限定。"
      }
    },
    "vocab": [
      {
        "word": "inevitable",
        "pos": "Adjective",
        "ipa": "/ɪnˈevɪtəbl/",
        "def": "certain to happen and impossible to avoid",
        "example": "Competition over limited resources makes conflict almost inevitable."
      },
      {
        "word": "reconcile",
        "pos": "Verb",
        "ipa": "/ˈrekənsaɪl/",
        "def": "to make two opposing ideas or beliefs agree or exist together",
        "example": "Deep-rooted ideological and religious differences are extremely difficult to reconcile."
      },
      {
        "word": "compromise",
        "pos": "Verb",
        "ipa": "/ˈkɒmprəmaɪz/",
        "def": "to give up part of what you want in order to reach an agreement",
        "example": "People are often unwilling to compromise on their core beliefs."
      },
      {
        "word": "perpetuate",
        "pos": "Verb",
        "ipa": "/pəˈpetʃueɪt/",
        "def": "to cause something, especially something bad, to continue for a long time",
        "example": "Security concerns perpetuate hostility."
      },
      {
        "word": "aspiration",
        "pos": "Noun",
        "ipa": "/ˌæspəˈreɪʃn/",
        "def": "a strong desire to achieve something important",
        "example": "While this is an admirable aspiration, I must disagree with the notion."
      },
      {
        "word": "mutual",
        "pos": "Adjective",
        "ipa": "/ˈmjuːtʃuəl/",
        "def": "felt or done equally by two or more people toward one another",
        "example": "As long as countries maintain large arsenals, mutual suspicion will remain."
      },
      {
        "word": "unattainable",
        "pos": "Adjective",
        "ipa": "/ˌʌnəˈteɪnəbl/",
        "def": "impossible to achieve or reach",
        "example": "Irreconcilable beliefs make genuine world peace an unattainable ideal."
      },
      {
        "word": "provoke",
        "pos": "Verb",
        "ipa": "/prəˈvəʊk/",
        "def": "to cause a particular reaction, especially a negative one",
        "example": "Disputes over river access in arid regions continue to provoke tension."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "形式主語 It + 受動による客観化",
        "example": "It is often argued that humanity can eventually attain complete and lasting world peace.",
        "highlight": "It is often argued that",
        "explain": "形式主語 It が that 節を受ける。argue を受動にすることで「誰が言うか」をぼかし、一般論として提示できる。エッセイの導入で「世間ではこう言われるが、自分は反対」と展開する定番の型。"
      },
      {
        "no": 2,
        "title": "make O C(SVOC)で因果を表す",
        "example": "Competition over limited resources makes conflict almost inevitable.",
        "highlight": "makes conflict almost inevitable",
        "explain": "make + O(conflict)+ C(inevitable 形容詞)で「OをCの状態にする」。「資源競争が紛争を不可避にする」と原因→結果を一文で凝縮。almost が形容詞 inevitable を和らげ言い過ぎを防ぐ。"
      },
      {
        "no": 3,
        "title": "譲歩の although + 主節での結論",
        "example": "In conclusion, although the dream of global harmony is noble, the competition for resources, irreconcilable beliefs, and persistent military distrust make genuine world peace an unattainable ideal.",
        "highlight": "although the dream of global harmony is noble",
        "explain": "although で反対意見(平和の夢は高邁)を一度認め、主節で自説(達成不可能)を述べる。譲歩→主張の流れが説得力を生む。主節は三つの名詞句が並列主語となり動詞 make を取る。"
      }
    ]
  },
  "3": {
    "glossary": {
      "question": {
        "pos": "Noun",
        "ja": "問題、問い",
        "tag": "冠詞 the",
        "grammar": "The question of whether ... =「〜かどうかという問題」。of 以下で中身が限定されるので the。whether 節が同格的に内容を説明。"
      },
      "whether": {
        "pos": "Conjunction",
        "ja": "〜かどうか",
        "tag": "接続詞",
        "grammar": "whether S can V=「SがVできるかどうか」。名詞節を導き、ここでは question of の目的語。if より硬く文頭・前置詞の後で好まれる。"
      },
      "replace": {
        "pos": "Verb",
        "ja": "取って代わる",
        "grammar": "replace A=「Aに取って代わる」。他動詞で前置詞不要。fully replace fossil fuels=「化石燃料を完全に置き換える」。"
      },
      "pressing": {
        "pos": "Adjective",
        "ja": "差し迫った",
        "tag": "現在分詞→形容詞",
        "grammar": "press(迫る)の分詞形。increasingly pressing=「ますます切実な」。urgent と同義。"
      },
      "capable": {
        "pos": "Adjective",
        "ja": "能力がある",
        "tag": "語法",
        "grammar": "be capable of doing=「〜する能力がある」。of の後は動名詞。able to do との使い分けに注意(capable は of+動名詞)。"
      },
      "essential": {
        "pos": "Adjective",
        "ja": "不可欠な",
        "grammar": "essential for our future=「未来に不可欠」。for が「〜にとって」の対象を導く。necessary より「本質的」の含み。"
      },
      "improved": {
        "pos": "Verb",
        "ja": "改善した",
        "tag": "過去形",
        "grammar": "have improved dramatically=「劇的に向上してきた」。現在完了で過去から現在への変化・継続を表す。"
      },
      "efficiency": {
        "pos": "Noun",
        "ja": "効率",
        "tag": "無冠詞・不可算",
        "grammar": "-cy の抽象名詞で不可算・無冠詞。in efficiency and affordability=「効率と手頃さの点で」。"
      },
      "affordability": {
        "pos": "Noun",
        "ja": "手頃さ、入手しやすさ",
        "tag": "無冠詞・不可算",
        "grammar": "afford(余裕がある)+ability。価格面で「買える度合い」。抽象名詞で不可算。"
      },
      "significant": {
        "pos": "Adjective",
        "ja": "重要な、意味のある",
        "grammar": "This is significant because ... =「これが重要なのは〜だから」。理由を続ける論述の型。"
      },
      "obstacle": {
        "pos": "Noun",
        "ja": "障害",
        "tag": "冠詞 the",
        "grammar": "the main obstacle to their adoption=「導入への主たる障害」。最上級的な main と to 句で限定され the。obstacle to+名詞の語法。"
      },
      "adoption": {
        "pos": "Noun",
        "ja": "導入、採用",
        "tag": "無冠詞・不可算",
        "grammar": "adopt の名詞形。their adoption=「それら(再エネ)の採用」で their が限定。-tion 抽象名詞で本来不可算。"
      },
      "sharply": {
        "pos": "Adverb",
        "ja": "急激に",
        "tag": "副詞",
        "grammar": "has fallen sharply=「急落した」。動詞 fall を修飾し下落の度合いを示す。"
      },
      "decade": {
        "pos": "Noun",
        "ja": "10年",
        "tag": "冠詞 the",
        "grammar": "over the past decade=「過去10年で」。past で「どの10年か」が特定されるので the。期間表現の定番。"
      },
      "viable": {
        "pos": "Adjective",
        "ja": "実行可能な、成り立つ",
        "grammar": "a viable competitor=「対抗しうる存在」。実現性・採算性がある、の意。"
      },
      "competitor": {
        "pos": "Noun",
        "ja": "競合相手",
        "tag": "冠詞 a",
        "grammar": "a viable competitor to conventional energy。形容詞付きの「一つの競合」として可算化、子音前で a。competitor to+名詞。"
      },
      "conventional": {
        "pos": "Adjective",
        "ja": "従来の、在来の",
        "grammar": "conventional energy=「従来型エネルギー(化石燃料等)」。traditional に近いが「慣例的・標準的」の含み。"
      },
      "cleaner": {
        "pos": "Adjective",
        "ja": "よりクリーンな",
        "tag": "比較級",
        "grammar": "clean の比較級。far cleaner=「はるかにクリーン」。far が比較級を強調(very は不可)。"
      },
      "combat": {
        "pos": "Verb",
        "ja": "対処する、戦う",
        "grammar": "help combat climate change=「気候変動と闘う一助となる」。help (to) do の原形不定詞。combat は他動詞で前置詞不要。"
      },
      "emissions": {
        "pos": "Noun",
        "ja": "排出物",
        "tag": "複数形",
        "grammar": "carbon emissions=「炭素排出」。複数種・複数回の排出を想定し複数形が標準。"
      },
      "operation": {
        "pos": "Noun",
        "ja": "稼働、運転",
        "tag": "無冠詞",
        "grammar": "during operation=「稼働中に」。「動作している状態」を抽象的に指すと無冠詞。in operation も同様。"
      },
      "generates": {
        "pos": "Verb",
        "ja": "生み出す、発電する",
        "tag": "三単現",
        "grammar": "主語 Denmark(単数国名)に呼応し -s。generate electricity=「発電する」のコロケーション。"
      },
      "share": {
        "pos": "Noun",
        "ja": "割合、シェア",
        "tag": "冠詞 a",
        "grammar": "a large share of its electricity=「電力の大きな割合」。share of+名詞で「〜のうちの一部」。一つのまとまりとして a。"
      },
      "footprint": {
        "pos": "Noun",
        "ja": "(環境)負荷、足跡",
        "tag": "冠詞 its",
        "grammar": "carbon footprint=「炭素排出量」の定型コロケーション。its で「その国の」と限定。"
      },
      "enhances": {
        "pos": "Verb",
        "ja": "高める",
        "tag": "三単現",
        "grammar": "主語 renewable energy(不可算で単数扱い)に呼応し -s。enhance security=「安全保障を強化する」。improve より「価値・程度を高める」。"
      },
      "domestically": {
        "pos": "Adverb",
        "ja": "国内で",
        "tag": "副詞",
        "grammar": "available domestically=「国内で入手できる」。形容詞 available を後置修飾。"
      },
      "facilitate": {
        "pos": "Verb",
        "ja": "促進する、容易にする",
        "grammar": "facilitate energy independence=「エネルギー自立を後押しする」。make easier の硬い一語。"
      },
      "independence": {
        "pos": "Noun",
        "ja": "自立、独立",
        "tag": "無冠詞・不可算",
        "grammar": "energy independence=「エネルギー自給」。状態を表す抽象名詞で不可算・無冠詞。"
      },
      "dependent": {
        "pos": "Adjective",
        "ja": "依存した",
        "tag": "語法",
        "grammar": "less dependent on imported fuel=「輸入燃料への依存が少ない」。be dependent on=「〜に依存する」。on とセット。"
      },
      "imported": {
        "pos": "Adjective",
        "ja": "輸入された",
        "tag": "過去分詞→形容詞",
        "grammar": "import の過去分詞が形容詞化。imported fuel=「輸入燃料」。受動的に「輸入された」状態。"
      },
      "invested": {
        "pos": "Verb",
        "ja": "投資した",
        "tag": "過去分詞",
        "grammar": "have invested heavily in renewables=「再エネに多額を投資してきた」。invest in=「〜に投資する」、現在完了で実績を示す。"
      },
      "consequently": {
        "pos": "Adverb",
        "ja": "その結果",
        "tag": "副詞・接続副詞",
        "grammar": "前文の帰結を導く接続副詞。文頭でカンマを伴い「したがって」。as a result と同義。"
      },
      "vulnerable": {
        "pos": "Adjective",
        "ja": "脆弱な、影響を受けやすい",
        "tag": "語法",
        "grammar": "less vulnerable to volatile markets=「不安定な市場の影響を受けにくい」。be vulnerable to=「〜に弱い」。to が対象を導く。"
      },
      "volatile": {
        "pos": "Adjective",
        "ja": "変動の激しい",
        "grammar": "volatile global oil markets=「乱高下する世界の石油市場」。価格などが不安定で予測しにくい状態。"
      },
      "markets": {
        "pos": "Noun",
        "ja": "市場",
        "tag": "複数形",
        "grammar": "oil markets=「石油市場」。地域・銘柄が複数あるため複数形が一般的。"
      },
      "thanks": {
        "pos": "Phrase",
        "ja": "〜のおかげで",
        "tag": "句・語法",
        "grammar": "thanks to+名詞=「〜のおかげで」。文頭で原因を肯定的に導く。to の後は名詞句(falling costs ...)。"
      },
      "falling": {
        "pos": "Adjective",
        "ja": "下落する",
        "tag": "現在分詞→形容詞",
        "grammar": "fall(下がる)の分詞形。falling costs=「下がりつつあるコスト」。進行的に減少している状態を能動で表す。"
      },
      "advantages": {
        "pos": "Noun",
        "ja": "利点",
        "tag": "複数形",
        "grammar": "environmental advantages=「環境面の利点」。複数の長所を列挙する文脈で複数形。"
      },
      "supplanting": {
        "pos": "Verb",
        "ja": "取って代わること",
        "tag": "動名詞",
        "grammar": "capable of supplanting ... =「〜に取って代わる能力がある」。capable of の後で動名詞化。supplant=replace の格上語。"
      },
      "confident": {
        "pos": "Adjective",
        "ja": "確信している",
        "tag": "語法",
        "grammar": "I am confident that ... =「〜だと確信している」。that 節を取り筆者の立場を明言。sure より硬い。"
      },
      "transition": {
        "pos": "Noun",
        "ja": "移行",
        "tag": "冠詞 a",
        "grammar": "a transition to clean energy=「クリーンエネルギーへの移行」。to 句付きの一つのプロセスとして可算化し a。transition to+名詞。"
      },
      "necessary": {
        "pos": "Adjective",
        "ja": "必要な",
        "grammar": "both possible and necessary=「可能でも必要でもある」。both A and B で二つの形容詞を並列強調。"
      },
      "dramatically": {
        "pos": "Adverb",
        "ja": "劇的に",
        "tag": "副詞",
        "grammar": "improved dramatically=「劇的に向上した」。変化の大きさを誇張気味に強調する副詞。"
      },
      "heavily": {
        "pos": "Adverb",
        "ja": "大量に、大きく",
        "tag": "副詞",
        "grammar": "invested heavily=「多額を投資した」。invest や depend を強める常用の副詞。"
      }
    },
    "vocab": [
      {
        "word": "viable",
        "pos": "Adjective",
        "ipa": "/ˈvaɪəbl/",
        "def": "able to work successfully or be done in a practical way",
        "example": "Falling prices have made solar power a viable competitor to conventional energy."
      },
      {
        "word": "facilitate",
        "pos": "Verb",
        "ipa": "/fəˈsɪlɪteɪt/",
        "def": "to make an action or process easier or more likely to happen",
        "example": "Sunlight and wind are available domestically, so they facilitate energy independence."
      },
      {
        "word": "vulnerable",
        "pos": "Adjective",
        "ipa": "/ˈvʌlnərəbl/",
        "def": "easily harmed or affected by something",
        "example": "Nations that have invested in renewables are less vulnerable to volatile oil markets."
      },
      {
        "word": "volatile",
        "pos": "Adjective",
        "ipa": "/ˈvɒlətaɪl/",
        "def": "likely to change suddenly and unexpectedly, especially in price",
        "example": "They become less vulnerable to volatile global oil markets."
      },
      {
        "word": "supplant",
        "pos": "Verb",
        "ipa": "/səˈplɑːnt/",
        "def": "to take the place of someone or something, especially by force or skill",
        "example": "Renewable sources are fully capable of supplanting fossil fuels."
      },
      {
        "word": "conventional",
        "pos": "Adjective",
        "ipa": "/kənˈvenʃənl/",
        "def": "traditional and ordinary, following what is usually done",
        "example": "Solar power has become a viable competitor to conventional energy."
      },
      {
        "word": "enhance",
        "pos": "Verb",
        "ipa": "/ɪnˈhɑːns/",
        "def": "to improve the quality, amount, or value of something",
        "example": "Renewable energy enhances national energy security."
      },
      {
        "word": "transition",
        "pos": "Noun",
        "ipa": "/trænˈzɪʃn/",
        "def": "the process of changing from one state or condition to another",
        "example": "A transition to clean energy is both possible and necessary."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "The question of whether で論点を名詞化",
        "example": "The question of whether renewable energy can fully replace fossil fuels has become increasingly pressing.",
        "highlight": "The question of whether renewable energy can fully replace fossil fuels",
        "explain": "whether 節を of でつなぎ「〜かどうかという問題」と論点を一つの主語にまとめる型。長い主語だが動詞は has(question に呼応した三単現)。導入で争点を提示するのに便利。"
      },
      {
        "no": 2,
        "title": "be capable of doing(of+動名詞)",
        "example": "Renewable sources are not only capable of replacing fossil fuels but are essential for our future.",
        "highlight": "not only capable of replacing fossil fuels but are essential",
        "explain": "capable は of+動名詞を取る(to 不定詞は不可)。さらに not only A but (also) B で「AだけでなくBも」と二点を強調。能力と必要性を畳みかける構文。"
      },
      {
        "no": 3,
        "title": "Unlike + 名詞による対比",
        "example": "Unlike fossil fuels, they produce little or no carbon emissions during operation.",
        "highlight": "Unlike fossil fuels",
        "explain": "前置詞 Unlike+名詞で「〜と違って」と対象を対比。文頭に置き旧情報(化石燃料)と新主張(再エネ)を鮮明に対照させる。little or no=「ほとんど、あるいは全く〜ない」の定型。"
      }
    ]
  },
  "4": {
    "glossary": {
      "developed": {
        "pos": "Adjective",
        "ja": "先進の",
        "tag": "過去分詞→形容詞",
        "grammar": "develop の過去分詞が形容詞化。developed nations=「先進国」。「発展し終えた」状態を表す。developing(発展途上の)と対。"
      },
      "nations": {
        "pos": "Noun",
        "ja": "国家",
        "tag": "複数形",
        "grammar": "複数国を一般化して指すため複数形・無冠詞。countries とほぼ同義だが「国民国家」の含み。"
      },
      "ought": {
        "pos": "Verb",
        "ja": "〜すべきだ",
        "tag": "語法",
        "grammar": "ought to do=「〜すべきだ」。should とほぼ同義だが to を伴う点が異なる。義務・当然を表す。"
      },
      "encourage": {
        "pos": "Verb",
        "ja": "促進する、奨励する",
        "grammar": "encourage immigration=「移民を奨励する」。encourage O to do の形もあるがここは名詞目的語。"
      },
      "controversial": {
        "pos": "Adjective",
        "ja": "物議を醸す",
        "grammar": "a controversial issue=「賛否の分かれる問題」。意見が対立するテーマを表す導入の定番語。"
      },
      "despite": {
        "pos": "Phrase",
        "ja": "〜にもかかわらず",
        "tag": "前置詞",
        "grammar": "despite+名詞=「〜にもかかわらず」。後ろは必ず名詞(句)。although(+節)との品詞の違いに注意。"
      },
      "concerns": {
        "pos": "Noun",
        "ja": "懸念",
        "tag": "複数形",
        "grammar": "the concerns frequently raised=「しばしば挙げられる懸念」。複数の懸念事項を想定し複数形。raised が後置修飾。"
      },
      "raised": {
        "pos": "Verb",
        "ja": "提起された",
        "tag": "過去分詞",
        "grammar": "concerns (which are) frequently raised=「頻繁に提起される懸念」。過去分詞の後置修飾で関係代名詞+be を省略。"
      },
      "welcome": {
        "pos": "Verb",
        "ja": "歓迎する",
        "grammar": "actively welcome immigrants=「移民を積極的に受け入れる」。副詞 actively が動詞を修飾。"
      },
      "defend": {
        "pos": "Verb",
        "ja": "擁護する",
        "grammar": "defend this view=「この見解を擁護する」。論を「守る・支持する」の意。with three reasons が手段を示す。"
      },
      "address": {
        "pos": "Verb",
        "ja": "対処する",
        "grammar": "address labor shortages=「労働力不足に対処する」。deal with の硬い一語。他動詞で前置詞不要。"
      },
      "shortages": {
        "pos": "Noun",
        "ja": "不足",
        "tag": "複数形",
        "grammar": "labor shortages=「人手不足」。複数分野・地域での不足を想定し複数形。shortage of+名詞も頻出。"
      },
      "confronting": {
        "pos": "Verb",
        "ja": "直面している",
        "tag": "現在分詞",
        "grammar": "are confronting=「直面しつつある」。現在進行形。confront は他動詞で「(問題)に立ち向かう」。"
      },
      "aging": {
        "pos": "Adjective",
        "ja": "高齢化する",
        "tag": "現在分詞→形容詞",
        "grammar": "aging populations=「高齢化する人口」。age(年をとる)の分詞形。進行的変化を能動で表す。"
      },
      "shrinking": {
        "pos": "Adjective",
        "ja": "縮小する",
        "tag": "現在分詞→形容詞",
        "grammar": "shrinking workforces=「縮小する労働力」。shrink の分詞形。steadily が「着実に」と程度を補足。"
      },
      "workforces": {
        "pos": "Noun",
        "ja": "労働人口",
        "tag": "複数形",
        "grammar": "複数国の労働力を指すため複数形。work+force の複合語。"
      },
      "depend": {
        "pos": "Verb",
        "ja": "依存する",
        "tag": "句動詞",
        "grammar": "depend on foreign workers=「外国人労働者に頼る」。depend on=「〜次第・〜に頼る」。on を落とさない。"
      },
      "functional": {
        "pos": "Adjective",
        "ja": "機能している",
        "grammar": "remain functional and competitive=「機能し競争力を保つ」。remain+形容詞で状態の継続。"
      },
      "drives": {
        "pos": "Verb",
        "ja": "推進する",
        "tag": "三単現",
        "grammar": "主語 immigration(不可算・単数扱い)に呼応し -s。drive growth=「成長を促す」の比喩的他動詞。"
      },
      "newcomers": {
        "pos": "Noun",
        "ja": "新参者、新規参入者",
        "tag": "複数形",
        "grammar": "ここでは移民を指す。複数の人を念頭に複数形。new+comer。"
      },
      "establish": {
        "pos": "Verb",
        "ja": "設立する",
        "grammar": "establish businesses=「事業を起こす」。set up の硬い語。"
      },
      "revenue": {
        "pos": "Noun",
        "ja": "歳入、収益",
        "tag": "無冠詞・不可算",
        "grammar": "tax revenue=「税収」。収入の総量を表す不可算名詞で無冠詞。revenues と複数にすると複数年度・複数源泉の意。"
      },
      "admittedly": {
        "pos": "Adverb",
        "ja": "確かに(認めるが)",
        "tag": "副詞・譲歩",
        "grammar": "文頭で「なるほど〜は認める」と反論を一旦受け入れる譲歩の合図。直後に However で切り返すのが定番。"
      },
      "strain": {
        "pos": "Noun",
        "ja": "負担",
        "tag": "冠詞 a",
        "grammar": "place a heavy strain on public services=「公共サービスに大きな負担をかける」。a が形容詞 heavy 付きの一つの負担を示す。put/place a strain on の語法。"
      },
      "numerous": {
        "pos": "Adjective",
        "ja": "多数の",
        "grammar": "numerous studies=「数多くの研究」。many より硬く「非常に多くの」。後ろは可算名詞の複数形。"
      },
      "consistently": {
        "pos": "Adverb",
        "ja": "一貫して",
        "tag": "副詞",
        "grammar": "consistently show=「一貫して示す」。研究結果が「ぶれずに」同じ結論を出すことを強調。"
      },
      "economically": {
        "pos": "Adverb",
        "ja": "経済的に",
        "tag": "副詞",
        "grammar": "contribute far more economically=「経済面ではるかに多く貢献する」。far が比較級 more を強調。"
      },
      "benefits": {
        "pos": "Noun",
        "ja": "給付、恩恵",
        "tag": "複数形",
        "grammar": "receive in benefits=「給付として受け取る」。社会保障の各種給付を指し複数形。文脈で「利益」とは別義。"
      },
      "enriches": {
        "pos": "Verb",
        "ja": "豊かにする",
        "tag": "三単現",
        "grammar": "主語 immigration(単数扱い)に呼応し -s。en-+rich=「豊かにする」。enrich society の比喩用法。"
      },
      "diversity": {
        "pos": "Noun",
        "ja": "多様性",
        "tag": "無冠詞・不可算",
        "grammar": "cultural diversity=「文化的多様性」。抽象概念で不可算・無冠詞。"
      },
      "exposure": {
        "pos": "Noun",
        "ja": "触れること、さらされること",
        "tag": "冠詞 無",
        "grammar": "Exposure to different perspectives=「異なる視点に触れること」。to 句を伴う抽象名詞で無冠詞。expose の名詞形。"
      },
      "perspectives": {
        "pos": "Noun",
        "ja": "視点、考え方",
        "tag": "複数形",
        "grammar": "different perspectives=「さまざまな視点」。複数の観点を想定し複数形。"
      },
      "fosters": {
        "pos": "Verb",
        "ja": "育む、促進する",
        "tag": "三単現",
        "grammar": "主語 Exposure(単数の動名詞的主語)に呼応し -s。foster creativity=「創造性を育む」。"
      },
      "tolerance": {
        "pos": "Noun",
        "ja": "寛容",
        "tag": "無冠詞・不可算",
        "grammar": "美徳・態度を表す抽象名詞で不可算・無冠詞。creativity, tolerance, understanding と並列。"
      },
      "vibrant": {
        "pos": "Adjective",
        "ja": "活気ある",
        "grammar": "the vibrant, multicultural character=「活気に満ちた多文化的な性格」。都市の躍動感を表す。"
      },
      "multicultural": {
        "pos": "Adjective",
        "ja": "多文化の",
        "grammar": "multi-(多)+cultural。multicultural character=「多文化的性格」。"
      },
      "demonstrates": {
        "pos": "Verb",
        "ja": "示す、例証する",
        "tag": "三単現",
        "grammar": "主語 The ... character(単数)に呼応し -s。demonstrates how ... =「いかに〜かを示す」。how 節が目的語。"
      },
      "strengthen": {
        "pos": "Verb",
        "ja": "強化する",
        "grammar": "strengthen rather than weaken=「弱めるどころか強める」。rather than で二動詞を対比。strong の動詞形。"
      },
      "reservations": {
        "pos": "Noun",
        "ja": "懸念、ためらい",
        "tag": "複数形",
        "grammar": "the reservations ... hold=「人々が抱く懸念」。複数の留保を想定し複数形。「予約」とは別義。"
      },
      "understandably": {
        "pos": "Adverb",
        "ja": "無理もなく、もっともなことに",
        "tag": "副詞",
        "grammar": "reservations that some people understandably hold=「もっともながら一部が抱く懸念」。話者が相手の心情に理解を示す譲歩的副詞。"
      },
      "substantial": {
        "pos": "Adjective",
        "ja": "かなりの、相当な",
        "grammar": "substantial benefits=「相当な利益」。large/considerable と同義の硬い語。"
      },
      "easing": {
        "pos": "Verb",
        "ja": "和らげること",
        "tag": "動名詞",
        "grammar": "by easing labor shortages=「労働力不足を緩和することで」。by+動名詞で手段。ease=「軽減する」の他動詞。"
      },
      "stimulating": {
        "pos": "Verb",
        "ja": "刺激すること",
        "tag": "動名詞",
        "grammar": "stimulating the economy=「経済を活性化すること」。easing/enhancing と並列の動名詞。"
      },
      "richness": {
        "pos": "Noun",
        "ja": "豊かさ",
        "tag": "無冠詞・不可算",
        "grammar": "cultural richness=「文化的豊かさ」。-ness 抽象名詞で不可算・無冠詞。rich の名詞形。"
      },
      "firmly": {
        "pos": "Adverb",
        "ja": "断固として、固く",
        "tag": "副詞",
        "grammar": "I am firmly convinced=「強く確信している」。convinced を強める副詞。立場を明言する締めの定番。"
      },
      "turn": {
        "pos": "Verb",
        "ja": "(turn away で)追い返す",
        "tag": "句動詞",
        "grammar": "turn them away=「彼らを追い返す」。turn away=「拒んで帰らせる」。welcome ... rather than turn them away で対比。"
      },
      "competitive": {
        "pos": "Adjective",
        "ja": "競争力のある",
        "grammar": "remain functional and competitive=「機能し競争力を保つ」。compete の形容詞形。"
      }
    },
    "vocab": [
      {
        "word": "address",
        "pos": "Verb",
        "ipa": "/əˈdres/",
        "def": "to deal with or give attention to a problem or issue",
        "example": "Immigrants help address serious labor shortages."
      },
      {
        "word": "shortage",
        "pos": "Noun",
        "ipa": "/ˈʃɔːtɪdʒ/",
        "def": "a situation in which there is not enough of something needed",
        "example": "Many developed nations are confronting steadily shrinking workforces and labor shortages."
      },
      {
        "word": "strain",
        "pos": "Noun",
        "ipa": "/streɪn/",
        "def": "pressure or demand that makes something difficult to manage",
        "example": "Some argue that immigrants place a heavy strain on public services."
      },
      {
        "word": "foster",
        "pos": "Verb",
        "ipa": "/ˈfɒstə/",
        "def": "to encourage the development of something, especially something good",
        "example": "Exposure to different perspectives fosters creativity, tolerance, and mutual understanding."
      },
      {
        "word": "enrich",
        "pos": "Verb",
        "ipa": "/ɪnˈrɪtʃ/",
        "def": "to improve the quality of something by adding something to it",
        "example": "Immigration enriches society through cultural diversity."
      },
      {
        "word": "substantial",
        "pos": "Adjective",
        "ipa": "/səbˈstænʃl/",
        "def": "large in amount, value, or importance",
        "example": "Encouraging immigration brings substantial benefits."
      },
      {
        "word": "diversity",
        "pos": "Noun",
        "ipa": "/daɪˈvɜːsəti/",
        "def": "the state of having many different types of people or things",
        "example": "Diversity can strengthen rather than weaken a nation."
      },
      {
        "word": "reservation",
        "pos": "Noun",
        "ipa": "/ˌrezəˈveɪʃn/",
        "def": "a feeling of doubt or a reason for not fully agreeing with something",
        "example": "Despite the reservations that some people understandably hold, immigration brings benefits."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "Despite + 名詞で譲歩を導入",
        "example": "Despite the concerns frequently raised, I strongly believe that developed countries should actively welcome immigrants.",
        "highlight": "Despite the concerns frequently raised",
        "explain": "Despite は前置詞なので後ろは名詞(句)。although(接続詞、後ろは節)との品詞差が頻出ミス。concerns を過去分詞 raised が後置修飾し「提起される懸念」とコンパクトに表現。"
      },
      {
        "no": 2,
        "title": "Admittedly ... However ... の譲歩反論",
        "example": "Admittedly, some argue that immigrants place a heavy strain on public services. However, numerous studies consistently show that immigrants contribute far more economically than they ever receive in benefits.",
        "highlight": "Admittedly, some argue ... However, numerous studies",
        "explain": "反対意見を Admittedly で一度認め、However で自説に切り返す譲歩→反論の型。1級ライティングで説得力と公平さを示す核となる構文。far more ... than で比較級を強調。"
      },
      {
        "no": 3,
        "title": "A rather than B(対比の並列)",
        "example": "Diversity can strengthen rather than weaken a nation.",
        "highlight": "strengthen rather than weaken",
        "explain": "rather than は前後を同じ品詞・形でそろえる(ここでは原形動詞 strengthen と weaken)。「BではなくAする」と対立概念を一文に圧縮し主張を際立たせる。結論でも welcome ... rather than turn them away と反復され一貫性を生む。"
      }
    ]
  },
  "5": {
    "glossary": {
      "recent": {
        "pos": "Adjective",
        "ja": "近年の、最近の",
        "tag": "無冠詞",
        "grammar": "in recent decades=「ここ数十年で」。decades が複数なので無冠詞の複数形。期間を表す定型。"
      },
      "decades": {
        "pos": "Noun",
        "ja": "数十年",
        "tag": "複数形",
        "grammar": "decade=10年。複数の十年間を指すので -s。in recent decades で「ここ数十年」。"
      },
      "globalization": {
        "pos": "Noun",
        "ja": "グローバル化",
        "tag": "無冠詞・不可算",
        "grammar": "-tion 抽象名詞で過程を指すため不可算→無冠詞。a/the を付けない。"
      },
      "reshaped": {
        "pos": "Verb",
        "ja": "作り変えた",
        "tag": "過去・受動なし",
        "grammar": "has reshaped=現在完了。過去から現在までの影響を表す。re-=「再び」+shape。"
      },
      "economies": {
        "pos": "Noun",
        "ja": "経済(複数の国の)",
        "tag": "複数形",
        "grammar": "economy=一国の経済。複数国を指すので economies と複数。語尾 -y→-ies。"
      },
      "societies": {
        "pos": "Noun",
        "ja": "社会(複数)",
        "tag": "複数形",
        "grammar": "society を複数国の社会として可算複数に。-y→-ies の綴り変化。"
      },
      "planet": {
        "pos": "Noun",
        "ja": "惑星、地球",
        "tag": "冠詞 the",
        "grammar": "across the planet=「世界中で」。唯一の地球なので定冠詞 the。"
      },
      "critics": {
        "pos": "Noun",
        "ja": "批判する人々",
        "tag": "複数形",
        "grammar": "not without its critics=「批判がないわけではない」。二重否定で控えめに認める表現。"
      },
      "strongly": {
        "pos": "Adverb",
        "ja": "強く",
        "grammar": "strongly agree=「強く同意する」。動詞 agree を修飾。主張の強度を出す副詞。"
      },
      "agree": {
        "pos": "Verb",
        "ja": "同意する",
        "tag": "語法",
        "grammar": "agree that S V で意見を述べる。agree with は人/意見に。ここは that 節。"
      },
      "balance": {
        "pos": "Noun",
        "ja": "釣り合い、総合",
        "tag": "冠詞 a",
        "grammar": "on balance=「総合すると」。差し引き考えた結論を導く定型句。冠詞は無し。"
      },
      "positive": {
        "pos": "Adjective",
        "ja": "肯定的な、良い",
        "grammar": "a positive force=「良い力」。名詞 force を修飾。negative の対義。"
      },
      "force": {
        "pos": "Noun",
        "ja": "力、原動力",
        "tag": "冠詞 a",
        "grammar": "可算名詞で「一つの力・要因」と数えるので a positive force。"
      },
      "justify": {
        "pos": "Verb",
        "ja": "正当化する、根拠づける",
        "tag": "語法",
        "grammar": "justify O=「Oを正当化する」。justify this position で「立場を裏付ける」。"
      },
      "position": {
        "pos": "Noun",
        "ja": "立場、主張",
        "tag": "冠詞 this",
        "grammar": "前述の立場を指すので this position。文脈で特定済みなので指示詞。"
      },
      "lifted": {
        "pos": "Verb",
        "ja": "引き上げた",
        "tag": "句動詞",
        "grammar": "lift A out of B=「AをBから抜け出させる」。lift out of poverty が定型。"
      },
      "millions": {
        "pos": "Noun",
        "ja": "数百万(の人)",
        "tag": "複数形",
        "grammar": "millions of people で「何百万もの人」。漠然と多数なので of の前は複数 millions。"
      },
      "poverty": {
        "pos": "Noun",
        "ja": "貧困",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。out of poverty で「貧困から抜け出す」。"
      },
      "opening": {
        "pos": "Verb",
        "ja": "開放すること",
        "tag": "動名詞",
        "grammar": "By opening markets=「市場を開放することで」。by+動名詞で手段を表す。"
      },
      "markets": {
        "pos": "Noun",
        "ja": "市場",
        "tag": "複数形",
        "grammar": "複数の市場を指すので markets。open markets で「市場を開放する」。"
      },
      "creating": {
        "pos": "Verb",
        "ja": "創出すること",
        "tag": "動名詞",
        "grammar": "and creating jobs と opening に並列。by の後の動名詞句。"
      },
      "jobs": {
        "pos": "Noun",
        "ja": "雇用、仕事",
        "tag": "複数形",
        "grammar": "create jobs=「雇用を生む」。数えられる仕事の複数。"
      },
      "developing": {
        "pos": "Adjective",
        "ja": "発展途上の",
        "grammar": "developing nations=「発展途上国」。現在分詞が形容詞化。developed(先進)と対。"
      },
      "participate": {
        "pos": "Verb",
        "ja": "参加する",
        "tag": "句動詞",
        "grammar": "participate in=「〜に参加する」。in とセットで前置詞を落とさない。"
      },
      "remarkable": {
        "pos": "Adjective",
        "ja": "目覚ましい",
        "grammar": "remarkable growth=「目覚ましい成長」。名詞 growth を修飾。"
      },
      "growth": {
        "pos": "Noun",
        "ja": "成長",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。economic growth と同様に数えない。"
      },
      "exporting": {
        "pos": "Verb",
        "ja": "輸出すること",
        "tag": "動名詞",
        "grammar": "by exporting goods=「商品を輸出することで」。by+動名詞で手段。"
      },
      "goods": {
        "pos": "Noun",
        "ja": "商品",
        "tag": "複数形・常に複数",
        "grammar": "goods=「商品」は常に複数形で使う。a good とはしない。"
      },
      "wealthier": {
        "pos": "Adjective",
        "ja": "より豊かな",
        "tag": "比較級",
        "grammar": "wealthy→wealthier。-y→-ier。wealthier markets で「より豊かな市場」。"
      },
      "accelerates": {
        "pos": "Verb",
        "ja": "加速させる",
        "tag": "三単現",
        "grammar": "主語 globalization が三人称単数なので accelerates と -s。"
      },
      "spread": {
        "pos": "Noun",
        "ja": "広がり、普及",
        "tag": "冠詞 the",
        "grammar": "the spread of knowledge=「知識の普及」。of で限定されるので the。"
      },
      "knowledge": {
        "pos": "Noun",
        "ja": "知識",
        "tag": "無冠詞・不可算",
        "grammar": "典型的な不可算名詞→無冠詞。a knowledge とはしない。"
      },
      "innovations": {
        "pos": "Noun",
        "ja": "技術革新(個々の)",
        "tag": "複数形",
        "grammar": "innovation は不可算だが、個々の革新を指すと可算化し複数 innovations に。"
      },
      "advances": {
        "pos": "Noun",
        "ja": "進歩",
        "tag": "複数形",
        "grammar": "medical advances=「医学の進歩」。個々の進歩を数えて複数。"
      },
      "distant": {
        "pos": "Adjective",
        "ja": "遠く離れた",
        "grammar": "distant regions=「遠隔地」。名詞 regions を修飾。"
      },
      "regions": {
        "pos": "Noun",
        "ja": "地域",
        "tag": "複数形",
        "grammar": "複数の地域を指すので regions。"
      },
      "distribution": {
        "pos": "Noun",
        "ja": "分配、流通",
        "tag": "冠詞 the",
        "grammar": "the global distribution of vaccines で of により特定→the。"
      },
      "vaccines": {
        "pos": "Noun",
        "ja": "ワクチン",
        "tag": "複数形",
        "grammar": "複数のワクチンを指すので vaccines。"
      },
      "crises": {
        "pos": "Noun",
        "ja": "危機(複数)",
        "tag": "複数形・不規則",
        "grammar": "crisis の複数は crises(不規則)。health crises で「健康危機」。"
      },
      "illustrates": {
        "pos": "Verb",
        "ja": "例証する",
        "tag": "三単現",
        "grammar": "主語 distribution が単数なので illustrates と -s。"
      },
      "vividly": {
        "pos": "Adverb",
        "ja": "鮮やかに、ありありと",
        "grammar": "動詞 illustrates を修飾。「はっきりと例証する」。"
      },
      "fosters": {
        "pos": "Verb",
        "ja": "育む、促進する",
        "tag": "三単現",
        "grammar": "主語 globalization が三単現なので fosters。foster=育てる。"
      },
      "exchange": {
        "pos": "Noun",
        "ja": "交流",
        "tag": "無冠詞・不可算",
        "grammar": "cultural exchange=「文化交流」。抽象的に交流全般を指し無冠詞。"
      },
      "mutual": {
        "pos": "Adjective",
        "ja": "相互の",
        "grammar": "mutual understanding=「相互理解」。両者間の意の形容詞。"
      },
      "understanding": {
        "pos": "Noun",
        "ja": "理解",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。mutual understanding で定型。"
      },
      "encounter": {
        "pos": "Verb",
        "ja": "出会う、触れる",
        "grammar": "encounter foreign ideas=「異国の考えに触れる」。他動詞で前置詞不要。"
      },
      "cuisines": {
        "pos": "Noun",
        "ja": "料理(各国の)",
        "tag": "複数形",
        "grammar": "cuisine=国・地域の料理様式。複数国を指すので cuisines。"
      },
      "customs": {
        "pos": "Noun",
        "ja": "習慣",
        "tag": "複数形",
        "grammar": "custom=慣習。複数を指すので customs。custom(s)=習慣、customs=税関の意もあり。"
      },
      "prejudice": {
        "pos": "Noun",
        "ja": "偏見",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。「偏見が薄れる」で総称的に使う。"
      },
      "diminish": {
        "pos": "Verb",
        "ja": "減る、薄れる",
        "grammar": "tends to diminish=「薄れる傾向にある」。自動詞で「徐々に減る」。"
      },
      "enrich": {
        "pos": "Verb",
        "ja": "豊かにする",
        "grammar": "enrich one another=「互いを豊かにする」。en-+rich=「豊かにする」他動詞。"
      },
      "evidence": {
        "pos": "Noun",
        "ja": "証拠",
        "tag": "無冠詞・不可算",
        "grammar": "不可算名詞→無冠詞。The evidence と特定する時のみ the。a evidence は不可。"
      },
      "supports": {
        "pos": "Verb",
        "ja": "支持する、裏付ける",
        "tag": "三単現",
        "grammar": "主語 evidence が単数扱いなので supports と -s。"
      },
      "reducing": {
        "pos": "Verb",
        "ja": "減らすこと",
        "tag": "動名詞",
        "grammar": "By reducing poverty=「貧困を減らすことで」。by+動名詞で手段を列挙。"
      },
      "spreading": {
        "pos": "Verb",
        "ja": "広めること",
        "tag": "動名詞",
        "grammar": "spreading valuable knowledge と reducing に並列の動名詞。"
      },
      "bringing": {
        "pos": "Verb",
        "ja": "近づけること",
        "tag": "動名詞",
        "grammar": "bringing diverse cultures closer together で「文化を近づける」。動名詞句。"
      },
      "diverse": {
        "pos": "Adjective",
        "ja": "多様な",
        "grammar": "diverse cultures=「多様な文化」。名詞 cultures を修飾。"
      },
      "engine": {
        "pos": "Noun",
        "ja": "原動力",
        "tag": "冠詞 a",
        "grammar": "a powerful engine of progress=「進歩の強力な原動力」。比喩。可算なので a。"
      },
      "progress": {
        "pos": "Noun",
        "ja": "進歩",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。engine of progress で「進歩の原動力」。"
      },
      "convinced": {
        "pos": "Adjective",
        "ja": "確信している",
        "tag": "受動",
        "grammar": "I remain convinced that=「確信し続けている」。be convinced=確信した状態(受動形)。"
      },
      "imperfections": {
        "pos": "Noun",
        "ja": "不完全さ、欠点",
        "tag": "複数形",
        "grammar": "despite its imperfections=「その欠点にもかかわらず」。個々の欠点で複数。"
      }
    },
    "vocab": [
      {
        "word": "globalization",
        "pos": "Noun",
        "ipa": "/ˌɡloʊbələˈzeɪʃən/",
        "def": "the process by which businesses and cultures spread across the world and become more connected",
        "example": "Globalization has reshaped economies and societies across the planet."
      },
      {
        "word": "on balance",
        "pos": "Phrase",
        "ipa": "/ɑn ˈbæləns/",
        "def": "after considering all the different facts or opinions",
        "example": "I strongly agree that globalization is, on balance, a positive force."
      },
      {
        "word": "lift out of poverty",
        "pos": "Phrase",
        "ipa": "/lɪft aʊt əv ˈpɑvərti/",
        "def": "to help people escape a state of being extremely poor",
        "example": "Globalization has lifted millions of people out of poverty."
      },
      {
        "word": "accelerate",
        "pos": "Verb",
        "ipa": "/ækˈsɛləreɪt/",
        "def": "to cause something to happen or develop more quickly",
        "example": "Globalization accelerates the spread of knowledge and technology."
      },
      {
        "word": "foster",
        "pos": "Verb",
        "ipa": "/ˈfɔstər/",
        "def": "to encourage the development of something, especially something good",
        "example": "Globalization fosters cultural exchange and mutual understanding."
      },
      {
        "word": "diminish",
        "pos": "Verb",
        "ipa": "/dɪˈmɪnɪʃ/",
        "def": "to become or make something become smaller or less important",
        "example": "As people encounter foreign ideas, prejudice tends to diminish."
      },
      {
        "word": "mutual",
        "pos": "Adjective",
        "ipa": "/ˈmjutʃuəl/",
        "def": "felt or done equally by two or more people",
        "example": "Globalization fosters cultural exchange and mutual understanding."
      },
      {
        "word": "imperfection",
        "pos": "Noun",
        "ipa": "/ˌɪmpərˈfɛkʃən/",
        "def": "a fault or weakness in something that makes it less than perfect",
        "example": "Despite its imperfections, globalization does far more good than harm."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "on balance による総合判断",
        "example": "Although it is not without its critics, I strongly agree that globalization is, on balance, a positive force, and I will justify this position with three reasons.",
        "highlight": "on balance",
        "explain": "on balance=「総合的に見て」。賛否両面を認めた上で結論を示す表現。直前の not without its critics(批判がないわけではない)で反対を一度認め、それでも全体としては肯定、と説得力を高めている。"
      },
      {
        "no": 2,
        "title": "By + 動名詞で「手段」を表す",
        "example": "By opening markets and creating jobs, it allows developing nations to participate in the global economy.",
        "highlight": "By opening markets and creating jobs",
        "explain": "by+動名詞(opening / creating)で「〜することによって」と手段を示す。前置詞 by の後ろは必ず -ing 形。allow O to do=「Oが〜するのを可能にする」の語法も押さえる。"
      },
      {
        "no": 3,
        "title": "tend to do で「〜する傾向がある」",
        "example": "As people encounter foreign ideas, cuisines, and customs, prejudice tends to diminish.",
        "highlight": "prejudice tends to diminish",
        "explain": "tend to do=「〜しがちだ」。断定を避け一般的傾向を述べる。主語 prejudice は不可算で三人称単数扱いなので tends と -s が付く。As S V は「〜するにつれて」の比例。"
      }
    ]
  },
  "6": {
    "glossary": {
      "global": {
        "pos": "Adjective",
        "ja": "世界的な",
        "grammar": "global populations=「世界の人口」。名詞 populations を修飾。globe(地球)の形容詞形。"
      },
      "populations": {
        "pos": "Noun",
        "ja": "人口",
        "tag": "複数形",
        "grammar": "population は通例単数だが、複数地域・国の人口を指すと populations と可算複数になる。"
      },
      "expand": {
        "pos": "Verb",
        "ja": "拡大する",
        "grammar": "populations expand=「人口が拡大する」。自動詞で「増える・広がる」。"
      },
      "economies": {
        "pos": "Noun",
        "ja": "経済(各国の)",
        "tag": "複数形",
        "grammar": "複数国の経済を指すので economies。語尾 -y→-ies。"
      },
      "industrialize": {
        "pos": "Verb",
        "ja": "工業化する",
        "grammar": "economies industrialize=「経済が工業化する」。自動詞。industry の動詞形。"
      },
      "consumption": {
        "pos": "Noun",
        "ja": "消費",
        "tag": "無冠詞・不可算",
        "grammar": "energy consumption=「エネルギー消費」。抽象・不可算で無冠詞。動詞 consume の名詞形。"
      },
      "rise": {
        "pos": "Verb",
        "ja": "上昇する",
        "grammar": "continues to rise=「上昇し続ける」。自動詞で目的語不要。raise(他動詞)と混同しない。"
      },
      "rapidly": {
        "pos": "Adverb",
        "ja": "急速に",
        "grammar": "動詞 rise を修飾。「急速に上昇する」。形容詞 rapid+ly。"
      },
      "debate": {
        "pos": "Noun",
        "ja": "議論",
        "tag": "無冠詞・不可算",
        "grammar": "much debate over=「〜をめぐる多くの議論」。ここでは不可算扱いで無冠詞、much で量を示す。"
      },
      "satisfy": {
        "pos": "Verb",
        "ja": "満たす",
        "grammar": "satisfy this growing demand=「この需要を満たす」。他動詞。satisfy demand が定型。"
      },
      "demand": {
        "pos": "Noun",
        "ja": "需要",
        "tag": "無冠詞・不可算",
        "grammar": "経済用語の demand は不可算で無冠詞。supply and demand と対で覚える。"
      },
      "keep pace": {
        "pos": "Verb",
        "ja": "遅れずについていく",
        "tag": "句動詞",
        "grammar": "keep pace (with)=「(〜に)遅れずついていく」。pace を落とさない。後ろは with。"
      },
      "support": {
        "pos": "Verb",
        "ja": "裏付ける、支持する",
        "grammar": "support this position=「この立場を裏付ける」。他動詞。論を補強する意。"
      },
      "rapid": {
        "pos": "Adjective",
        "ja": "急速な",
        "grammar": "rapid advances=「急速な進歩」。名詞 advances を修飾。副詞は rapidly。"
      },
      "advances": {
        "pos": "Noun",
        "ja": "進歩",
        "tag": "複数形",
        "grammar": "advance を「個々の進歩」として可算複数に。advances in technology が定型。"
      },
      "renewable": {
        "pos": "Adjective",
        "ja": "再生可能な",
        "grammar": "renewable technology=「再生可能エネルギー技術」。re-+new+able。"
      },
      "dramatically": {
        "pos": "Adverb",
        "ja": "劇的に",
        "grammar": "dramatically expanding=「劇的に拡大している」。現在分詞 expanding を修飾。"
      },
      "expanding": {
        "pos": "Verb",
        "ja": "拡大している",
        "tag": "動名詞・現在分詞",
        "grammar": "are dramatically expanding supply で現在進行形。be+-ing で進行中の変化。"
      },
      "supply": {
        "pos": "Noun",
        "ja": "供給",
        "tag": "無冠詞・不可算",
        "grammar": "経済用語の supply は不可算で無冠詞。expand supply で「供給を増やす」。"
      },
      "capacity": {
        "pos": "Noun",
        "ja": "能力、発電容量",
        "tag": "無冠詞・不可算",
        "grammar": "solar and wind capacity=「太陽光・風力の発電容量」。ここでは不可算で無冠詞。"
      },
      "increasing": {
        "pos": "Verb",
        "ja": "増えている",
        "tag": "現在分詞",
        "grammar": "is increasing every year で現在進行形。継続的な増加を表す。"
      },
      "costs": {
        "pos": "Noun",
        "ja": "コスト",
        "tag": "複数形",
        "grammar": "as costs fall=「コストが下がるにつれて」。複数の費用項目を指し複数。"
      },
      "fall": {
        "pos": "Verb",
        "ja": "下がる",
        "grammar": "costs fall=「コストが下がる」。自動詞。fall-fell-fallen。"
      },
      "installed": {
        "pos": "Verb",
        "ja": "設置した",
        "tag": "過去・現在完了",
        "grammar": "has installed=「設置してきた」。現在完了で過去から今までの累積を表す。"
      },
      "enormous": {
        "pos": "Adjective",
        "ja": "莫大な",
        "grammar": "enormous amounts of=「莫大な量の」。amounts を修飾。huge とほぼ同義。"
      },
      "amounts": {
        "pos": "Noun",
        "ja": "量",
        "tag": "複数形",
        "grammar": "amounts of solar power=「大量の太陽光発電」。不可算名詞の量は amount(s) of で。"
      },
      "surging": {
        "pos": "Adjective",
        "ja": "急増する",
        "grammar": "surging needs=「急増する需要」。動詞 surge(押し寄せる)の現在分詞が形容詞化。"
      },
      "needs": {
        "pos": "Noun",
        "ja": "需要、必要",
        "tag": "複数形",
        "grammar": "needs=「ニーズ・必要なもの」。複数で「諸々の必要」。meet its needs が定型。"
      },
      "improvements": {
        "pos": "Noun",
        "ja": "改善",
        "tag": "複数形",
        "grammar": "improvements in efficiency=「効率の改善」。個々の改善を数えて複数。"
      },
      "efficiency": {
        "pos": "Noun",
        "ja": "効率",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。energy efficiency で「省エネ」。"
      },
      "reducing": {
        "pos": "Verb",
        "ja": "減らしている",
        "tag": "現在分詞",
        "grammar": "are reducing waste で現在進行形。継続中の削減。"
      },
      "waste": {
        "pos": "Noun",
        "ja": "無駄、浪費",
        "tag": "無冠詞・不可算",
        "grammar": "reduce waste=「無駄を減らす」。不可算で無冠詞。a waste なら「無駄なこと」と可算化。"
      },
      "considerably": {
        "pos": "Adverb",
        "ja": "かなり、相当に",
        "grammar": "動詞 reducing を修飾。「相当に減らす」。形容詞 considerable+ly。"
      },
      "adopting": {
        "pos": "Verb",
        "ja": "採用すること",
        "tag": "動名詞",
        "grammar": "By adopting smarter appliances=「より賢い家電を採用することで」。by+動名詞で手段。"
      },
      "appliances": {
        "pos": "Noun",
        "ja": "家電製品",
        "tag": "複数形",
        "grammar": "appliance=家電。複数の機器を指すので appliances。"
      },
      "insulation": {
        "pos": "Noun",
        "ja": "断熱",
        "tag": "無冠詞・不可算",
        "grammar": "不可算名詞で無冠詞。better insulation で「より良い断熱」。"
      },
      "admittedly": {
        "pos": "Adverb",
        "ja": "確かに(認めると)",
        "tag": "接続副詞",
        "grammar": "文頭で「確かに〜だが」と譲歩。直後に However で反論する譲歩→反論の型。"
      },
      "outstrip": {
        "pos": "Verb",
        "ja": "上回る、しのぐ",
        "grammar": "outstrip efficiency gains=「効率改善を上回る」。out-=「〜を超えて」+strip。"
      },
      "regulations": {
        "pos": "Noun",
        "ja": "規制",
        "tag": "複数形",
        "grammar": "government regulations=「政府の規制」。個々の規則を数えて複数。"
      },
      "curbed": {
        "pos": "Verb",
        "ja": "抑制した",
        "tag": "過去・現在完了",
        "grammar": "have already curbed=「すでに抑えてきた」。現在完了。curb=抑える。"
      },
      "significantly": {
        "pos": "Adverb",
        "ja": "著しく",
        "grammar": "動詞 curbed を修飾。「著しく抑えた」。形容詞 significant+ly。"
      },
      "investing": {
        "pos": "Verb",
        "ja": "投資している",
        "tag": "現在分詞",
        "grammar": "are increasingly investing で現在進行形。invest in=「〜に投資する」。"
      },
      "research": {
        "pos": "Noun",
        "ja": "研究",
        "tag": "無冠詞・不可算",
        "grammar": "典型的な不可算名詞→無冠詞。a research は不可。研究1件は a piece of research。"
      },
      "sources": {
        "pos": "Noun",
        "ja": "源、供給源",
        "tag": "複数形",
        "grammar": "future energy sources=「将来のエネルギー源」。複数の供給源で複数。"
      },
      "fusion": {
        "pos": "Noun",
        "ja": "核融合",
        "tag": "無冠詞・不可算",
        "grammar": "nuclear fusion=「核融合」。物理現象を指し不可算で無冠詞。"
      },
      "storage": {
        "pos": "Noun",
        "ja": "貯蔵、蓄電",
        "tag": "無冠詞・不可算",
        "grammar": "advanced storage technologies で形容詞的に使用。storage 自体は不可算。"
      },
      "abundant": {
        "pos": "Adjective",
        "ja": "豊富な",
        "grammar": "abundant power=「豊富な電力」。名詞 power を修飾。scarce(乏しい)の対義。"
      },
      "substantial": {
        "pos": "Adjective",
        "ja": "かなりの",
        "grammar": "substantial public funding=「相当な公的資金」。量・規模が大きいこと。"
      },
      "funding": {
        "pos": "Noun",
        "ja": "資金提供",
        "tag": "無冠詞・不可算",
        "grammar": "不可算名詞で無冠詞。public funding で「公的資金」。fund の動名詞由来。"
      },
      "directed": {
        "pos": "Verb",
        "ja": "向けられた",
        "tag": "受動・過去分詞",
        "grammar": "funding now directed at fusion で過去分詞の後置修飾。「核融合に向けられた資金」。direct A at B の受動。"
      },
      "commitment": {
        "pos": "Noun",
        "ja": "関与、本気度",
        "tag": "冠詞 this",
        "grammar": "this serious commitment=「この真剣な取り組み」。前述を指す this。commit の名詞形。"
      },
      "positioned": {
        "pos": "Verb",
        "ja": "位置づけられて",
        "tag": "受動・過去分詞",
        "grammar": "are well positioned to do=「〜する good な立場にある」。be positioned で受動の状態。"
      },
      "sustained": {
        "pos": "Adjective",
        "ja": "持続的な",
        "grammar": "sustained effort=「持続的な努力」。動詞 sustain の過去分詞が形容詞化。"
      },
      "secure": {
        "pos": "Verb",
        "ja": "確保する",
        "grammar": "secure the energy=「エネルギーを確保する」。他動詞。形容詞「安全な」とは別用法。"
      },
      "requires": {
        "pos": "Verb",
        "ja": "必要とする",
        "tag": "三単現・関係詞内",
        "grammar": "the energy its future requires で関係詞節。先行詞 energy が目的語、主語 future が単数なので requires。"
      }
    },
    "vocab": [
      {
        "word": "keep pace with",
        "pos": "Phrase",
        "ipa": "/kip peɪs wɪð/",
        "def": "to manage to do something as fast as something else is happening",
        "example": "In my view, governments will indeed be able to keep pace."
      },
      {
        "word": "capacity",
        "pos": "Noun",
        "ipa": "/kəˈpæsəti/",
        "def": "the amount of electricity or power that can be produced",
        "example": "Solar and wind capacity is increasing every year as costs fall."
      },
      {
        "word": "outstrip",
        "pos": "Verb",
        "ipa": "/ˌaʊtˈstrɪp/",
        "def": "to become larger, more important, or better than something else",
        "example": "Some argue that demand will always outstrip efficiency gains."
      },
      {
        "word": "curb",
        "pos": "Verb",
        "ipa": "/kɜrb/",
        "def": "to control or limit something, especially something harmful",
        "example": "Government regulations on efficiency have already curbed consumption significantly."
      },
      {
        "word": "abundant",
        "pos": "Adjective",
        "ipa": "/əˈbʌndənt/",
        "def": "existing in large quantities; more than enough",
        "example": "Nuclear fusion and advanced storage technologies promise abundant power."
      },
      {
        "word": "substantial",
        "pos": "Adjective",
        "ipa": "/səbˈstænʃəl/",
        "def": "large in amount, value, or importance",
        "example": "The substantial public funding now directed at fusion research demonstrates this commitment."
      },
      {
        "word": "well positioned",
        "pos": "Phrase",
        "ipa": "/wɛl pəˈzɪʃənd/",
        "def": "in a good situation to be able to do something successfully",
        "example": "Governments are well positioned to meet rising energy demands."
      },
      {
        "word": "admittedly",
        "pos": "Adverb",
        "ipa": "/ədˈmɪtɪdli/",
        "def": "used to admit that something is true before making a contrasting point",
        "example": "Admittedly, some argue that demand will always outstrip efficiency gains."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "Admittedly + However の譲歩・反論",
        "example": "Admittedly, some argue that demand will always outstrip efficiency gains. However, government regulations on efficiency have already curbed consumption significantly in many nations.",
        "highlight": "Admittedly, some argue that",
        "explain": "Admittedly=「確かに〜だが」で反対意見を一度認め、次文の However で切り返す。英検1級ライティングで反論を処理する定番の2文セット。譲歩を入れることで論に厚みが出る。"
      },
      {
        "no": 2,
        "title": "By + 動名詞で手段を示す",
        "example": "By adopting smarter appliances and better insulation, societies can do more with less.",
        "highlight": "By adopting smarter appliances and better insulation",
        "explain": "by+動名詞で「〜することによって」と手段を表す。do more with less=「より少ない資源でより多くをこなす」は効率を語る決まり文句。"
      },
      {
        "no": 3,
        "title": "過去分詞の後置修飾",
        "example": "The substantial public funding now directed at fusion research demonstrates this serious commitment.",
        "highlight": "funding now directed at fusion research",
        "explain": "名詞 funding を過去分詞 directed が後ろから修飾(「核融合研究に向けられた資金」)。which is が省略された形。direct A at B(AをBに向ける)の受動関係。主語が単数 funding なので動詞は demonstrates と三単現。"
      }
    ]
  },
  "7": {
    "glossary": {
      "faces": {
        "pos": "Verb",
        "ja": "直面する",
        "tag": "三単現",
        "grammar": "主語 Humanity が三人称単数なので faces と -s。face=他動詞で前置詞不要。"
      },
      "array": {
        "pos": "Noun",
        "ja": "勢ぞろい、多数",
        "tag": "冠詞 a",
        "grammar": "a growing array of challenges=「増え続ける数々の課題」。an array of=「ずらりと並んだ」。可算で a。"
      },
      "challenges": {
        "pos": "Noun",
        "ja": "課題、難題",
        "tag": "複数形",
        "grammar": "複数の課題を指すので challenges。a challenge は一つの難題。"
      },
      "ranging": {
        "pos": "Verb",
        "ja": "及んでいる",
        "tag": "現在分詞",
        "grammar": "ranging from A to B=「AからBに及ぶ」。challenges を後置修飾する分詞。range from A to B の分詞形。"
      },
      "disease": {
        "pos": "Noun",
        "ja": "病気",
        "tag": "無冠詞・不可算",
        "grammar": "from disease to climate change で総称的に使い無冠詞。特定の病気なら a disease。"
      },
      "ongoing": {
        "pos": "Adjective",
        "ja": "進行中の、続いている",
        "grammar": "ongoing debate=「続いている議論」。名詞 debate を修飾。on+going。"
      },
      "debate": {
        "pos": "Noun",
        "ja": "議論",
        "tag": "無冠詞・不可算",
        "grammar": "ongoing debate over=「〜をめぐる議論」。ここでは不可算扱いで無冠詞。"
      },
      "entrusted": {
        "pos": "Verb",
        "ja": "委ねられる",
        "tag": "受動",
        "grammar": "be entrusted with=「〜を委ねられる」。en-+trust。受動で with を伴う。"
      },
      "relied": {
        "pos": "Verb",
        "ja": "頼られる",
        "tag": "受動・句動詞",
        "grammar": "be relied on=「頼られる」。rely on の受動。前置詞 on を残すのがポイント。"
      },
      "principal": {
        "pos": "Adjective",
        "ja": "主要な",
        "grammar": "the principal means=「主要な手段」。principle(原則)と綴り・意味が違う。"
      },
      "means": {
        "pos": "Noun",
        "ja": "手段",
        "tag": "単複同形",
        "grammar": "means=「手段」は単複同形。the principal means of doing で「〜する主要手段」。"
      },
      "addressing": {
        "pos": "Verb",
        "ja": "対処すること",
        "tag": "動名詞",
        "grammar": "means of addressing the problems で of の後の動名詞。address=「(問題に)取り組む」。"
      },
      "confronting": {
        "pos": "Verb",
        "ja": "立ちはだかる",
        "tag": "現在分詞",
        "grammar": "the problems confronting humankind=「人類に立ちはだかる問題」。problems を後置修飾する分詞。"
      },
      "offers": {
        "pos": "Verb",
        "ja": "提供する",
        "tag": "三単現",
        "grammar": "主語 science が三単現なので offers。offer=他動詞。"
      },
      "solutions": {
        "pos": "Noun",
        "ja": "解決策",
        "tag": "複数形",
        "grammar": "複数の解決策を指すので solutions。solution to=「〜の解決策」。"
      },
      "grounded": {
        "pos": "Verb",
        "ja": "基づいた",
        "tag": "受動・過去分詞",
        "grammar": "solutions grounded in evidence=「証拠に基づく解決策」。過去分詞の後置修飾。be grounded in の受動。"
      },
      "speculation": {
        "pos": "Noun",
        "ja": "憶測",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。rather than speculation で「憶測ではなく」。"
      },
      "intuition": {
        "pos": "Noun",
        "ja": "直感",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。tradition or intuition で対比的に列挙。"
      },
      "hypotheses": {
        "pos": "Noun",
        "ja": "仮説(複数)",
        "tag": "複数形・不規則",
        "grammar": "hypothesis の複数は hypotheses(不規則)。test hypotheses で「仮説を検証する」。"
      },
      "rigorously": {
        "pos": "Adverb",
        "ja": "厳密に",
        "grammar": "動詞 tests を修飾。「厳密に検証する」。形容詞 rigorous+ly。"
      },
      "conclusions": {
        "pos": "Noun",
        "ja": "結論",
        "tag": "複数形・受動内",
        "grammar": "before conclusions are accepted で複数。be accepted で受動「結論が受け入れられる」。"
      },
      "development": {
        "pos": "Noun",
        "ja": "開発",
        "tag": "冠詞 the",
        "grammar": "the rapid development of vaccines で of により特定→the。動詞 develop の名詞形。"
      },
      "vaccines": {
        "pos": "Noun",
        "ja": "ワクチン",
        "tag": "複数形",
        "grammar": "複数のワクチンを指すので vaccines。"
      },
      "pandemic": {
        "pos": "Noun",
        "ja": "パンデミック、世界的流行",
        "tag": "冠詞 the",
        "grammar": "the COVID-19 pandemic で特定の流行を指し the。a pandemic なら不特定の一つ。"
      },
      "demonstrated": {
        "pos": "Verb",
        "ja": "示した",
        "tag": "過去",
        "grammar": "demonstrated how=「いかに〜かを示した」。過去の事例なので過去形。"
      },
      "systematic": {
        "pos": "Adjective",
        "ja": "体系的な",
        "grammar": "systematic research=「体系的な研究」。名詞 research を修飾。system の形容詞。"
      },
      "remarkably": {
        "pos": "Adverb",
        "ja": "著しく、驚くほど",
        "grammar": "a remarkably short period で形容詞 short を修飾。「驚くほど短い」。"
      },
      "possesses": {
        "pos": "Verb",
        "ja": "持つ、備える",
        "tag": "三単現",
        "grammar": "主語 science が三単現なので possesses。-ss+es。possess=「所有する」。"
      },
      "capacity": {
        "pos": "Noun",
        "ja": "能力",
        "tag": "冠詞 a",
        "grammar": "a unique capacity for self-correction=「自己修正の独自の能力」。可算で a。capacity for=「〜の能力」。"
      },
      "self-correction": {
        "pos": "Noun",
        "ja": "自己修正",
        "tag": "無冠詞・不可算",
        "grammar": "self-+correction の複合名詞。抽象・不可算で無冠詞。科学の特性を表す。"
      },
      "errors": {
        "pos": "Noun",
        "ja": "誤り",
        "tag": "複数形",
        "grammar": "When errors emerge=「誤りが生じたとき」。複数の誤りで errors。"
      },
      "emerge": {
        "pos": "Verb",
        "ja": "現れる、生じる",
        "grammar": "errors emerge=「誤りが生じる」。自動詞。e-+merge。"
      },
      "peer review": {
        "pos": "Noun",
        "ja": "査読、相互評価",
        "tag": "無冠詞・不可算",
        "grammar": "学術用語で不可算扱い、無冠詞。peer(同業者)による review。"
      },
      "experimentation": {
        "pos": "Noun",
        "ja": "実験(の繰り返し)",
        "tag": "無冠詞・不可算",
        "grammar": "-tion 抽象名詞で不可算→無冠詞。repeated experimentation で「繰り返しの実験」。"
      },
      "refine": {
        "pos": "Verb",
        "ja": "洗練させる、改良する",
        "grammar": "refine our understanding=「理解を磨く」。re-+fine。徐々に精度を上げる意。"
      },
      "flawed": {
        "pos": "Adjective",
        "ja": "欠陥のある",
        "grammar": "flawed theories=「欠陥のある理論」。名詞 theories を修飾。flaw(欠点)の形容詞。"
      },
      "theories": {
        "pos": "Noun",
        "ja": "理論",
        "tag": "複数形",
        "grammar": "theory の複数 theories。-y→-ies。複数の理論を指す。"
      },
      "replaced": {
        "pos": "Verb",
        "ja": "取って代わられる",
        "tag": "受動",
        "grammar": "are eventually replaced by=「やがて取って代わられる」。be replaced by の受動。"
      },
      "replicate": {
        "pos": "Verb",
        "ja": "再現する、複製する",
        "grammar": "no other system can replicate=「他のどんな体系も再現できない」。他動詞。"
      },
      "comparable": {
        "pos": "Adjective",
        "ja": "匹敵する、同等の",
        "grammar": "with comparable reliability=「同等の信頼性で」。compare の形容詞。"
      },
      "reliability": {
        "pos": "Noun",
        "ja": "信頼性",
        "tag": "無冠詞・不可算",
        "grammar": "-ity 抽象名詞で不可算→無冠詞。reliable の名詞形。"
      },
      "pressing": {
        "pos": "Adjective",
        "ja": "差し迫った",
        "grammar": "the pressing scale=「差し迫った規模」。press(迫る)の現在分詞が形容詞化。urgent と近い。"
      },
      "scale": {
        "pos": "Noun",
        "ja": "規模",
        "tag": "冠詞 the",
        "grammar": "the pressing scale of modern problems で of により特定→the。"
      },
      "leaves": {
        "pos": "Verb",
        "ja": "残す",
        "tag": "三単現",
        "grammar": "主語 scale が単数なので leaves と -s。leave few alternatives で「ほとんど選択肢を残さない」。"
      },
      "alternatives": {
        "pos": "Noun",
        "ja": "代替案、選択肢",
        "tag": "複数形",
        "grammar": "few realistic alternatives=「現実的な選択肢はほとんどない」。複数で選択肢を数える。"
      },
      "standpoint": {
        "pos": "Noun",
        "ja": "観点",
        "tag": "冠詞 an",
        "grammar": "From an environmental standpoint=「環境の観点から」。可算で an。from a ... standpoint が定型。"
      },
      "capture": {
        "pos": "Noun",
        "ja": "回収、捕捉",
        "tag": "無冠詞・不可算",
        "grammar": "carbon capture=「炭素回収」。技術名で不可算的に無冠詞。"
      },
      "emissions": {
        "pos": "Noun",
        "ja": "排出(物)",
        "tag": "複数形",
        "grammar": "reduce emissions=「排出を減らす」。通例複数 emissions で温室効果ガス排出を指す。"
      },
      "innovation": {
        "pos": "Noun",
        "ja": "技術革新",
        "tag": "無冠詞・不可算",
        "grammar": "-tion 抽象名詞で不可算→無冠詞。scientific innovation で「科学的革新」。"
      },
      "lack": {
        "pos": "Verb",
        "ja": "欠く",
        "grammar": "would lack the tools=「手段を欠くだろう」。他動詞で前置詞不要(×lack of は名詞用法)。"
      },
      "confront": {
        "pos": "Verb",
        "ja": "立ち向かう",
        "grammar": "confront these threats=「これらの脅威に立ち向かう」。他動詞。face と近い。"
      },
      "threats": {
        "pos": "Noun",
        "ja": "脅威",
        "tag": "複数形",
        "grammar": "複数の脅威を指すので threats。threat to=「〜への脅威」。"
      },
      "evidence-based": {
        "pos": "Adjective",
        "ja": "証拠に基づく",
        "tag": "複合形容詞",
        "grammar": "evidence-based methods=「証拠に基づく方法」。名詞+過去分詞のハイフン複合語で形容詞化。"
      },
      "dependable": {
        "pos": "Adjective",
        "ja": "頼りになる、信頼できる",
        "grammar": "the most dependable instrument=「最も頼れる手段」。depend+able。reliable と近い。"
      },
      "instrument": {
        "pos": "Noun",
        "ja": "手段、道具",
        "tag": "冠詞 the",
        "grammar": "the most dependable instrument=「最も頼れる手段」。最上級なので the。比喩的に「手段」。"
      },
      "trust": {
        "pos": "Noun",
        "ja": "信頼",
        "tag": "無冠詞・不可算",
        "grammar": "place its trust in=「〜に信頼を置く」。抽象・不可算で(所有格 its の後)無冠詞。"
      }
    },
    "vocab": [
      {
        "word": "entrust",
        "pos": "Verb",
        "ipa": "/ɪnˈtrʌst/",
        "def": "to make someone responsible for doing something or caring for something",
        "example": "There is ongoing debate over whether science should be entrusted with solving them."
      },
      {
        "word": "grounded in",
        "pos": "Phrase",
        "ipa": "/ˈɡraʊndɪd ɪn/",
        "def": "based firmly on a particular thing or principle",
        "example": "Science offers solutions grounded in evidence rather than speculation."
      },
      {
        "word": "rigorously",
        "pos": "Adverb",
        "ipa": "/ˈrɪɡərəsli/",
        "def": "in a way that is careful, thorough, and exact",
        "example": "The scientific method tests hypotheses rigorously before conclusions are accepted."
      },
      {
        "word": "self-correction",
        "pos": "Noun",
        "ipa": "/sɛlf kəˈrɛkʃən/",
        "def": "the act of finding and fixing your own mistakes without outside help",
        "example": "Science possesses a unique capacity for self-correction."
      },
      {
        "word": "refine",
        "pos": "Verb",
        "ipa": "/rɪˈfaɪn/",
        "def": "to improve something by making small changes to it",
        "example": "Peer review and repeated experimentation gradually refine our understanding."
      },
      {
        "word": "replicate",
        "pos": "Verb",
        "ipa": "/ˈrɛplɪkeɪt/",
        "def": "to copy something exactly or produce the same result again",
        "example": "A process that no other system of knowledge can replicate with comparable reliability."
      },
      {
        "word": "pressing",
        "pos": "Adjective",
        "ipa": "/ˈprɛsɪŋ/",
        "def": "needing to be dealt with immediately; urgent",
        "example": "The pressing scale of modern problems leaves few realistic alternatives."
      },
      {
        "word": "dependable",
        "pos": "Adjective",
        "ipa": "/dɪˈpɛndəbəl/",
        "def": "able to be trusted to do what you need or expect",
        "example": "Its methods make it the most dependable instrument available."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "be entrusted with の受動態",
        "example": "There is ongoing debate over whether science should be entrusted with solving them.",
        "highlight": "science should be entrusted with solving them",
        "explain": "entrust A with B=「AにBを委ねる」を受動にすると A be entrusted with B(AがBを委ねられる)。前置詞 with を落とさないのがポイント。with の後は動名詞 solving。whether 節が debate over の目的語になっている。"
      },
      {
        "no": 2,
        "title": "過去分詞 grounded in の後置修飾",
        "example": "Science offers solutions grounded in evidence rather than speculation.",
        "highlight": "solutions grounded in evidence",
        "explain": "名詞 solutions を過去分詞句 grounded in evidence が後ろから修飾(which are の省略)。be grounded in=「〜に基づいている」の受動関係。A rather than B=「BではなくむしろA」で evidence と speculation を対比している。"
      },
      {
        "no": 3,
        "title": "When 節 + 受動による一般論",
        "example": "When errors emerge, peer review and repeated experimentation gradually refine our understanding.",
        "highlight": "When errors emerge",
        "explain": "When S V で「〜するとき(はいつでも)」と一般的条件を表す。主節は現在形で恒常的真理を述べる。errors emerge は自動詞で「誤りが生じる」。科学の自己修正という仕組みを淡々と一般論として描く構文。"
      }
    ]
  },
  "8": {
    "glossary": {
      "inequality": {
        "pos": "Noun",
        "ja": "不平等、格差",
        "tag": "無冠詞・不可算",
        "grammar": "in-+equality の抽象名詞で不可算→無冠詞。文頭主語に冠詞なしで立つ。social inequality で「社会的格差」。"
      },
      "remains": {
        "pos": "Verb",
        "ja": "〜のままである",
        "tag": "三単現",
        "grammar": "主語 Inequality は単数扱いの不可算名詞→ remain に -s。SVC で remain+補語(one of...)。"
      },
      "persistent": {
        "pos": "Adjective",
        "ja": "根強い、しつこい",
        "grammar": "persist(続く)の形容詞。the most persistent と最上級で「最も根強い」。"
      },
      "features": {
        "pos": "Noun",
        "ja": "特徴",
        "tag": "複数形",
        "grammar": "one of the most persistent features of... の of の後は複数。「最も〜な特徴の一つ」は of+複数が鉄則。"
      },
      "societies": {
        "pos": "Noun",
        "ja": "社会",
        "tag": "複数形",
        "grammar": "society を可算で「個々の社会」と捉え複数化。一般論で「諸社会」を指すときは複数。"
      },
      "governments": {
        "pos": "Noun",
        "ja": "政府",
        "tag": "複数形",
        "grammar": "特定の一国でなく各国政府を指すので無冠詞複数。一般論の主語の典型。"
      },
      "respond": {
        "pos": "Verb",
        "ja": "対応する",
        "tag": "句動詞",
        "grammar": "respond by doing で「〜することで対応する」。respond to なら「〜に応じる」。前置詞で意味が変わる。"
      },
      "introducing": {
        "pos": "Verb",
        "ja": "導入する",
        "tag": "動名詞",
        "grammar": "by introducing で「導入することによって」。前置詞 by の後は動名詞。手段を表す。"
      },
      "welfare": {
        "pos": "Noun",
        "ja": "福祉",
        "tag": "無冠詞・不可算",
        "grammar": "welfare は不可算→無冠詞。welfare programs / welfare systems と複合語で使う。"
      },
      "programs": {
        "pos": "Noun",
        "ja": "制度、施策",
        "tag": "複数形",
        "grammar": "social welfare programs で複数。制度群を指すので複数が自然。"
      },
      "effectiveness": {
        "pos": "Noun",
        "ja": "有効性",
        "tag": "無冠詞・不可算",
        "grammar": "-ness 抽象名詞は不可算→無冠詞。their effectiveness と所有格は付く。"
      },
      "reduce": {
        "pos": "Verb",
        "ja": "減らす",
        "grammar": "reduce inequality で「格差を減らす」。help (to) reduce の形で「減らすのに役立つ」。"
      },
      "provide": {
        "pos": "Verb",
        "ja": "提供する",
        "grammar": "provide A で「Aを与える」。provide A with B / provide B for A の語法も頻出。"
      },
      "net": {
        "pos": "Noun",
        "ja": "網、ネット",
        "tag": "冠詞 a",
        "grammar": "a safety net「安全網」。初出の可算単数なので不定冠詞 a。比喩的に「セーフティネット」。"
      },
      "prevents": {
        "pos": "Verb",
        "ja": "防ぐ",
        "tag": "語法 SVOC",
        "grammar": "prevent O from doing で「Oが〜するのを防ぐ」。from+動名詞を落とさない。"
      },
      "vulnerable": {
        "pos": "Adjective",
        "ja": "弱い立場の",
        "grammar": "the most vulnerable で「the+形容詞=最も弱い人々」。people を補わず複数の人を指す。"
      },
      "falling": {
        "pos": "Verb",
        "ja": "陥る",
        "tag": "動名詞",
        "grammar": "from falling into で前置詞 from の後の動名詞。prevent...from falling「陥るのを防ぐ」。"
      },
      "poverty": {
        "pos": "Noun",
        "ja": "貧困",
        "tag": "無冠詞・不可算",
        "grammar": "poverty は不可算→無冠詞。extreme poverty「極度の貧困」で形容詞が付いても冠詞不要。"
      },
      "unemployment": {
        "pos": "Noun",
        "ja": "失業",
        "tag": "無冠詞・不可算",
        "grammar": "不可算→無冠詞。unemployment benefits「失業給付」と名詞を修飾する。"
      },
      "benefits": {
        "pos": "Noun",
        "ja": "給付、利益",
        "tag": "複数形",
        "grammar": "unemployment benefits は複数で「給付金」。後段の economic benefits は「恩恵」。文脈で訳し分け。"
      },
      "ensure": {
        "pos": "Verb",
        "ja": "保証する",
        "grammar": "ensure that S V で「〜を確実にする」。that 節の中は確定的に述べる。"
      },
      "access": {
        "pos": "Verb",
        "ja": "利用する、手に入れる",
        "grammar": "ここでは動詞。can access basic necessities「基本的必需品を手に入れられる」。名詞 access to も頻出。"
      },
      "necessities": {
        "pos": "Noun",
        "ja": "必需品",
        "tag": "複数形",
        "grammar": "basic necessities で複数。「いくつもの必需品」を指すので複数が自然。"
      },
      "generous": {
        "pos": "Adjective",
        "ja": "手厚い、寛大な",
        "grammar": "generous welfare systems「手厚い福祉制度」。お金や制度の「気前のよさ」に使う。"
      },
      "gaps": {
        "pos": "Noun",
        "ja": "格差",
        "tag": "複数形",
        "grammar": "the smallest income gaps で複数。国ごとの複数の格差を比較するので複数。"
      },
      "promote": {
        "pos": "Verb",
        "ja": "促進する",
        "grammar": "promote equality of opportunity「機会の平等を促進する」。目的語は抽象名詞。"
      },
      "equality": {
        "pos": "Noun",
        "ja": "平等",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。equality of opportunity「機会の平等」、of+不可算も無冠詞。"
      },
      "opportunity": {
        "pos": "Noun",
        "ja": "機会",
        "tag": "無冠詞・不可算",
        "grammar": "ここでは「機会一般」で不可算的・無冠詞。an opportunity to do なら可算で「一つの好機」。"
      },
      "outcome": {
        "pos": "Noun",
        "ja": "結果",
        "tag": "無冠詞・不可算",
        "grammar": "equality of outcome「結果の平等」。対句で opportunity と並べ、どちらも無冠詞。"
      },
      "subsidized": {
        "pos": "Adjective",
        "ja": "補助金を受けた",
        "tag": "過去分詞",
        "grammar": "subsidize の過去分詞が形容詞化。subsidized education「補助された教育」=受動の意味を含む。"
      },
      "acquire": {
        "pos": "Verb",
        "ja": "習得する",
        "grammar": "acquire skills「技能を身につける」。learn より「努力して得る」硬い語。ライティング向き。"
      },
      "compete": {
        "pos": "Verb",
        "ja": "競争する",
        "grammar": "compete fairly in the labor market「労働市場で公正に競争する」。compete in/with/for と前置詞多彩。"
      },
      "labor": {
        "pos": "Noun",
        "ja": "労働",
        "tag": "無冠詞・不可算",
        "grammar": "the labor market「労働市場」。市場は特定の場として the。labor 自体は不可算。"
      },
      "talent": {
        "pos": "Noun",
        "ja": "才能",
        "tag": "無冠詞・不可算",
        "grammar": "talent rather than family wealth と対比。能力一般で不可算→無冠詞。"
      },
      "wealth": {
        "pos": "Noun",
        "ja": "富",
        "tag": "無冠詞・不可算",
        "grammar": "family wealth「家庭の資産」。wealth は不可算→無冠詞。複数化しない。"
      },
      "decisive": {
        "pos": "Adjective",
        "ja": "決定的な",
        "grammar": "the decisive factor「決定的要因」。becomes the decisive factor で「〜が決め手になる」。"
      },
      "stimulates": {
        "pos": "Verb",
        "ja": "刺激する、活性化させる",
        "tag": "三単現",
        "grammar": "主語 welfare spending(不可算)→三単現 -s。経済を「刺激する」の定番動詞。"
      },
      "spending": {
        "pos": "Noun",
        "ja": "支出",
        "tag": "無冠詞・不可算・動名詞",
        "grammar": "spend の動名詞が名詞化。welfare spending「福祉支出」で不可算→無冠詞。"
      },
      "purchasing": {
        "pos": "Noun",
        "ja": "購買(の)",
        "tag": "動名詞",
        "grammar": "purchasing power「購買力」。動名詞が名詞 power を修飾する複合語。"
      },
      "households": {
        "pos": "Noun",
        "ja": "世帯",
        "tag": "複数形",
        "grammar": "poorer households「より貧しい世帯」。世帯を数える可算名詞、複数で集団を指す。"
      },
      "distributed": {
        "pos": "Verb",
        "ja": "分配される",
        "tag": "受動・過去分詞",
        "grammar": "money distributed to...「〜に分配される金」。名詞 money を後ろから修飾する過去分詞=受動。"
      },
      "supports": {
        "pos": "Verb",
        "ja": "支える",
        "tag": "三単現",
        "grammar": "関係詞 which (=money の循環) を受け単数扱い→ support に -s。「雇用を支える」。"
      },
      "employment": {
        "pos": "Noun",
        "ja": "雇用",
        "tag": "無冠詞・不可算",
        "grammar": "不可算→無冠詞。supports employment「雇用を支える」。動詞 employ の名詞。"
      },
      "circulation": {
        "pos": "Noun",
        "ja": "循環",
        "tag": "冠詞 the",
        "grammar": "This circulation と前出の内容を指すので the(this)。お金が回ることを名詞化。"
      },
      "narrows": {
        "pos": "Verb",
        "ja": "狭める",
        "tag": "三単現",
        "grammar": "主語 circulation(単数)→ -s。narrow the gap「格差を狭める」=他動詞。"
      },
      "eliminate": {
        "pos": "Verb",
        "ja": "完全になくす",
        "grammar": "cannot eliminate inequality entirely「格差を完全には消せない」。reduce より強い「根絶」。"
      },
      "protective": {
        "pos": "Adjective",
        "ja": "保護的な",
        "grammar": "their protective function「保護機能」。protect の形容詞形。福祉の役割を表す。"
      },
      "disparities": {
        "pos": "Noun",
        "ja": "格差、不均衡",
        "tag": "複数形",
        "grammar": "social disparities で複数。inequality / gap の言い換え語彙。複数で諸格差。"
      },
      "indispensable": {
        "pos": "Adjective",
        "ja": "不可欠な",
        "grammar": "an indispensable tool「不可欠な手段」。in-+dispensable(なしで済む)=「欠かせない」。"
      },
      "fairer": {
        "pos": "Adjective",
        "ja": "より公平な",
        "grammar": "a fairer society「より公平な社会」。fair の比較級。building a fairer society で目的を表す。"
      }
    },
    "vocab": [
      {
        "word": "inequality",
        "pos": "Noun",
        "ipa": "/ˌɪnɪˈkwɒləti/",
        "def": "an unfair situation in which some groups have more money, power, or opportunities than others",
        "example": "Inequality remains one of the most persistent features of modern societies."
      },
      {
        "word": "vulnerable",
        "pos": "Adjective",
        "ipa": "/ˈvʌlnərəbl/",
        "def": "easily harmed or able to be hurt because of weak protection",
        "example": "Welfare programs prevent the most vulnerable from falling into extreme poverty."
      },
      {
        "word": "subsidized",
        "pos": "Adjective",
        "ipa": "/ˈsʌbsɪdaɪzd/",
        "def": "paid for partly by a government or organization so that it costs less",
        "example": "Free or subsidized education allows children from low-income families to acquire skills."
      },
      {
        "word": "decisive",
        "pos": "Adjective",
        "ipa": "/dɪˈsaɪsɪv/",
        "def": "having a major effect in determining the outcome of something",
        "example": "Talent rather than family wealth becomes the decisive factor in personal success."
      },
      {
        "word": "purchasing power",
        "pos": "Noun",
        "ipa": "/ˈpɜːtʃəsɪŋ ˈpaʊə/",
        "def": "the amount of goods and services that people are able to buy with their money",
        "example": "Welfare spending stimulates the economy by increasing the purchasing power of poorer households."
      },
      {
        "word": "disparities",
        "pos": "Noun",
        "ipa": "/dɪˈspærətiz/",
        "def": "differences, especially ones that are unfair, between groups of people",
        "example": "Their economic benefits clearly reduce social disparities."
      },
      {
        "word": "indispensable",
        "pos": "Adjective",
        "ipa": "/ˌɪndɪˈspensəbl/",
        "def": "too important to be without; absolutely necessary",
        "example": "Well-designed welfare systems are an indispensable tool for building a fairer society."
      },
      {
        "word": "eliminate",
        "pos": "Verb",
        "ipa": "/ɪˈlɪmɪneɪt/",
        "def": "to completely remove or get rid of something",
        "example": "Welfare programs cannot eliminate inequality entirely."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "prevent O from doing 構文",
        "example": "Welfare programs provide a safety net that prevents the most vulnerable from falling into extreme poverty.",
        "highlight": "prevents the most vulnerable from falling into extreme poverty",
        "explain": "prevent O from doing で「Oが〜するのを防ぐ」。from の後は動名詞 falling。from を落とすミスが多いので必ずセットで。「the+形容詞(vulnerable)」は「弱い立場の人々」と複数の人を指す。"
      },
      {
        "no": 2,
        "title": "not merely A but B(言い換えの強調)",
        "example": "These programs promote equality of opportunity, not merely equality of outcome.",
        "highlight": "not merely equality of outcome",
        "explain": "not merely A(but B)で「単にAだけでなく(Bも)」。A と B を対句で並べ主張を際立たせる。equality of opportunity と equality of outcome を対比し論点を明確化。抽象名詞 equality は無冠詞。"
      },
      {
        "no": 3,
        "title": "which 非制限用法で結果を述べる",
        "example": "Money distributed to low-income citizens is spent quickly on goods and services, which in turn supports employment.",
        "highlight": "which in turn supports employment",
        "explain": "コンマ+which で前の節全体(お金が使われること)を受け、「それが結果として雇用を支える」と展開する非制限用法。in turn「ひいては・順に」で因果の流れを示す。distributed は money を後置修飾する過去分詞(受動)。"
      }
    ]
  },
  "9": {
    "glossary": {
      "grapples": {
        "pos": "Verb",
        "ja": "取り組む、苦闘する",
        "tag": "三単現・句動詞",
        "grammar": "主語 Japan(単数)→ -s。grapple with「〜と格闘する」。with を伴う句動詞、難題に立ち向かう含み。"
      },
      "shrinking": {
        "pos": "Adjective",
        "ja": "縮小する",
        "tag": "動名詞",
        "grammar": "shrink の現在分詞が形容詞化。a shrinking population「減少する人口」=能動的に「縮みつつある」。"
      },
      "population": {
        "pos": "Noun",
        "ja": "人口",
        "tag": "冠詞 a",
        "grammar": "a shrinking population で形容詞付き単数に a。集合体だが一国の人口を一つの塊として可算扱い。"
      },
      "sluggish": {
        "pos": "Adjective",
        "ja": "低迷した、鈍い",
        "grammar": "sluggish growth「低成長」。経済の「のろさ・停滞」を表す硬めの語。ライティング向き。"
      },
      "growth": {
        "pos": "Noun",
        "ja": "成長",
        "tag": "無冠詞・不可算",
        "grammar": "不可算→無冠詞。economic growth「経済成長」。複数化せず形容詞で限定する。"
      },
      "investment": {
        "pos": "Noun",
        "ja": "投資",
        "tag": "無冠詞・不可算",
        "grammar": "foreign investment「外国投資」は概念として不可算→無冠詞。個別案件は an investment と可算化。"
      },
      "urgent": {
        "pos": "Adjective",
        "ja": "差し迫った",
        "grammar": "become increasingly urgent「ますます切迫する」。increasingly(副詞)が形容詞を修飾。"
      },
      "convinced": {
        "pos": "Adjective",
        "ja": "確信して",
        "tag": "受動",
        "grammar": "I am convinced that...「〜と確信している」。convince(納得させる)の受動=「納得させられた状態」。感情の受動表現。"
      },
      "essential": {
        "pos": "Adjective",
        "ja": "不可欠な",
        "grammar": "is indeed essential「実に不可欠だ」。be essential for/to で対象を示す。necessary より強い。"
      },
      "injects": {
        "pos": "Verb",
        "ja": "注入する",
        "tag": "三単現",
        "grammar": "主語 foreign investment(不可算単数)→ -s。inject A into B「AをBに注ぎ込む」。資本投入の比喩。"
      },
      "capital": {
        "pos": "Noun",
        "ja": "資本",
        "tag": "無冠詞・不可算",
        "grammar": "much-needed capital「待望の資本」。お金としての capital は不可算→無冠詞。"
      },
      "domestic": {
        "pos": "Adjective",
        "ja": "国内の",
        "grammar": "a domestic market「国内市場」、domestic caution「国内の慎重さ」。foreign(対外)と対をなす頻出語。"
      },
      "market": {
        "pos": "Noun",
        "ja": "市場",
        "tag": "冠詞 a",
        "grammar": "a domestic market suffering...「〜に苦しむ国内市場」。初出で形容詞付き単数に a。"
      },
      "suffering": {
        "pos": "Verb",
        "ja": "苦しんでいる",
        "tag": "動名詞",
        "grammar": "a market suffering from stagnation「停滞に苦しむ市場」。market を後置修飾する現在分詞。suffer from とセット。"
      },
      "chronic": {
        "pos": "Adjective",
        "ja": "慢性的な",
        "grammar": "chronic stagnation「慢性的停滞」。病気の「慢性」が転じて経済の長期的不調に。"
      },
      "stagnation": {
        "pos": "Noun",
        "ja": "停滞",
        "tag": "無冠詞・不可算",
        "grammar": "-tion 抽象名詞で不可算→無冠詞。chronic stagnation「慢性的停滞」。sluggish growth の言い換え。"
      },
      "caution": {
        "pos": "Noun",
        "ja": "慎重さ",
        "tag": "無冠詞・不可算",
        "grammar": "domestic caution「国内の慎重姿勢」。抽象名詞で不可算→無冠詞。動詞は caution。"
      },
      "hindering": {
        "pos": "Verb",
        "ja": "妨げる",
        "tag": "動名詞",
        "grammar": "with...caution often hindering growth「慎重さが成長を妨げて」。with+名詞+分詞の付帯状況構文。"
      },
      "overseas": {
        "pos": "Adjective",
        "ja": "海外の",
        "grammar": "overseas funds「海外資金」。foreign の言い換え。副詞でも使う(go overseas)。"
      },
      "funds": {
        "pos": "Noun",
        "ja": "資金",
        "tag": "複数形",
        "grammar": "overseas funds「海外資金」。fund を「複数の資金源・基金」として複数化。単数 a fund は「基金一つ」。"
      },
      "bolster": {
        "pos": "Verb",
        "ja": "支える、強化する",
        "grammar": "bolster new ventures「新事業を後押しする」。support の硬い言い換え。下から支えるイメージ。"
      },
      "ventures": {
        "pos": "Noun",
        "ja": "事業、ベンチャー",
        "tag": "複数形",
        "grammar": "new ventures「新規事業」。複数の事業を指すので複数。a venture なら一事業。"
      },
      "finance": {
        "pos": "Verb",
        "ja": "資金を出す",
        "grammar": "ここでは動詞。finance infrastructure「インフラに資金を出す」。名詞 finance(金融)と同形に注意。"
      },
      "infrastructure": {
        "pos": "Noun",
        "ja": "インフラ",
        "tag": "無冠詞・不可算",
        "grammar": "不可算→無冠詞。道路・電力など設備全体を一括りにする集合的不可算名詞。複数化しない。"
      },
      "acquisitions": {
        "pos": "Noun",
        "ja": "買収",
        "tag": "複数形",
        "grammar": "foreign acquisitions「外国による買収」。個別の買収案件を複数として数える。動詞は acquire。"
      },
      "revived": {
        "pos": "Verb",
        "ja": "再生させた",
        "tag": "過去分詞",
        "grammar": "have revived「再生させてきた」。現在完了の過去分詞。revive=死にかけたものを生き返らせる他動詞。"
      },
      "struggling": {
        "pos": "Adjective",
        "ja": "経営難の",
        "tag": "動名詞",
        "grammar": "struggling Japanese companies「苦境の日本企業」。struggle の現在分詞=「もがいている」。"
      },
      "collapsed": {
        "pos": "Verb",
        "ja": "崩壊する",
        "tag": "過去分詞",
        "grammar": "would otherwise have collapsed「さもなくば破綻していただろう」。仮定法過去完了 have+過去分詞。"
      },
      "innovative": {
        "pos": "Adjective",
        "ja": "革新的な",
        "grammar": "innovative management practices「革新的経営手法」。innovate の形容詞。technology を修飾する advanced と並列。"
      },
      "practices": {
        "pos": "Noun",
        "ja": "慣行、手法",
        "tag": "複数形",
        "grammar": "management practices「経営手法」。慣行を複数で。a practice(一つの慣習)と区別。"
      },
      "exposure": {
        "pos": "Noun",
        "ja": "さらされること",
        "tag": "無冠詞・不可算",
        "grammar": "exposure to global competition「国際競争にさらされること」。exposure to で「〜への接触」。不可算→無冠詞。"
      },
      "forces": {
        "pos": "Verb",
        "ja": "(無理に)〜させる",
        "tag": "語法 SVOC・三単現",
        "grammar": "force O to do。主語 exposure(単数)→ -s。make が to なしなのに対し force は to を取る。"
      },
      "efficiency": {
        "pos": "Noun",
        "ja": "効率",
        "tag": "無冠詞・不可算",
        "grammar": "-cy 抽象名詞で不可算→無冠詞。improve efficiency「効率を上げる」。"
      },
      "adopt": {
        "pos": "Verb",
        "ja": "採用する",
        "grammar": "adopt fresh ideas「新しい考えを取り入れる」。adapt(適応)と混同しやすいので注意。"
      },
      "productivity": {
        "pos": "Noun",
        "ja": "生産性",
        "tag": "無冠詞・不可算",
        "grammar": "不可算→無冠詞。productivity rises「生産性が上がる」。自動詞 rise の主語。"
      },
      "industries": {
        "pos": "Noun",
        "ja": "産業",
        "tag": "複数形",
        "grammar": "across entire industries「全産業にわたって」。industry を分野ごとに数え複数。-y→-ies の綴り。"
      },
      "creates": {
        "pos": "Verb",
        "ja": "生み出す",
        "tag": "三単現",
        "grammar": "主語 foreign investment(不可算単数)→ -s。create employment「雇用を生む」。"
      },
      "integrates": {
        "pos": "Verb",
        "ja": "組み込む",
        "tag": "語法 SVOC・三単現",
        "grammar": "integrate A into B「AをBに統合する」。主語単数→ -s。into を伴う。"
      },
      "chains": {
        "pos": "Noun",
        "ja": "連鎖、チェーン",
        "tag": "複数形",
        "grammar": "global supply chains「世界的供給網」。供給の連鎖を複数で。supply chain は定番複合語。"
      },
      "perspective": {
        "pos": "Noun",
        "ja": "視点",
        "tag": "冠詞 a",
        "grammar": "From a long-term perspective「長期的視点で見ると」。初出単数に a。論を転換する定型句。"
      },
      "connectivity": {
        "pos": "Noun",
        "ja": "つながり",
        "tag": "無冠詞・不可算",
        "grammar": "-ity 抽象名詞で不可算→無冠詞。this connectivity と前出を指すと the/this が付く。"
      },
      "vital": {
        "pos": "Adjective",
        "ja": "極めて重要な",
        "grammar": "is vital for「〜に不可欠だ」。essential / crucial の言い換え。生死に関わる強さ。"
      },
      "declining": {
        "pos": "Adjective",
        "ja": "減少する",
        "tag": "動名詞",
        "grammar": "demand is steadily declining「需要が着実に減っている」。decline の現在分詞、進行で継続を表す。"
      },
      "employ": {
        "pos": "Verb",
        "ja": "雇用する",
        "grammar": "employ millions of Japanese workers「数百万の日本人を雇う」。名詞は employment / employee。"
      },
      "tangible": {
        "pos": "Adjective",
        "ja": "具体的な、目に見える",
        "grammar": "their tangible contribution「具体的な貢献」。抽象的でなく「実感できる」の意。intangible が反意。"
      },
      "contribution": {
        "pos": "Noun",
        "ja": "貢献",
        "tag": "冠詞 their",
        "grammar": "their tangible contribution。所有格 their が付くので冠詞は不要。動詞は contribute to。"
      },
      "excessive": {
        "pos": "Adjective",
        "ja": "過度の",
        "grammar": "excessive dependence「過度の依存」。excess(超過)の形容詞。やりすぎを批判的に。"
      },
      "dependence": {
        "pos": "Noun",
        "ja": "依存",
        "tag": "無冠詞・不可算",
        "grammar": "dependence on foreign capital「外国資本への依存」。depend on と同じく on を取る。不可算→無冠詞。"
      },
      "inflow": {
        "pos": "Noun",
        "ja": "流入",
        "tag": "冠詞 the",
        "grammar": "the inflow of funds「資金の流入」。of で限定されるので the。outflow(流出)が反意。"
      },
      "transfer": {
        "pos": "Noun",
        "ja": "移転",
        "tag": "冠詞 the",
        "grammar": "the transfer of expertise「専門知識の移転」。of 句で限定→ the。動詞も同形 transfer。"
      },
      "expertise": {
        "pos": "Noun",
        "ja": "専門知識",
        "tag": "無冠詞・不可算",
        "grammar": "不可算→無冠詞。expert の名詞で「専門技能・ノウハウ」。複数化しない。"
      },
      "indispensable": {
        "pos": "Adjective",
        "ja": "不可欠な",
        "grammar": "make foreign investment indispensable「〜を不可欠にする」。make O C の C(補語)に形容詞。"
      },
      "prosperity": {
        "pos": "Noun",
        "ja": "繁栄",
        "tag": "無冠詞・不可算",
        "grammar": "-ity 抽象名詞で不可算→無冠詞。Japan の prosperity と所有格は付く。"
      },
      "secure": {
        "pos": "Verb",
        "ja": "確保する",
        "grammar": "ここでは動詞。secure its economic future「経済的未来を確保する」。形容詞「安全な」と同形。"
      }
    },
    "vocab": [
      {
        "word": "grapple with",
        "pos": "Verb",
        "ipa": "/ˈɡræpl wɪð/",
        "def": "to try hard to deal with or understand a difficult problem",
        "example": "As Japan grapples with a shrinking population and sluggish growth."
      },
      {
        "word": "sluggish",
        "pos": "Adjective",
        "ipa": "/ˈslʌɡɪʃ/",
        "def": "moving or developing slowly and with little energy",
        "example": "Japan grapples with a shrinking population and sluggish growth."
      },
      {
        "word": "inject",
        "pos": "Verb",
        "ipa": "/ɪnˈdʒekt/",
        "def": "to add something such as money or energy to make a situation better",
        "example": "Foreign investment injects much-needed capital into a domestic market."
      },
      {
        "word": "chronic",
        "pos": "Adjective",
        "ipa": "/ˈkrɒnɪk/",
        "def": "continuing for a long time and difficult to cure or stop",
        "example": "It injects capital into a market suffering from chronic stagnation."
      },
      {
        "word": "bolster",
        "pos": "Verb",
        "ipa": "/ˈbəʊlstə/",
        "def": "to support or strengthen something so it is more likely to succeed",
        "example": "Overseas funds bolster new ventures and finance infrastructure."
      },
      {
        "word": "expertise",
        "pos": "Noun",
        "ipa": "/ˌekspɜːˈtiːz/",
        "def": "a high level of knowledge or skill in a particular area",
        "example": "The inflow of funds and transfer of expertise make foreign investment indispensable."
      },
      {
        "word": "tangible",
        "pos": "Adjective",
        "ipa": "/ˈtændʒəbl/",
        "def": "real and able to be clearly seen or proven, not just imagined",
        "example": "Foreign-affiliated firms employ millions of workers, demonstrating their tangible contribution."
      },
      {
        "word": "indispensable",
        "pos": "Adjective",
        "ipa": "/ˌɪndɪˈspensəbl/",
        "def": "so important or useful that it is impossible to manage without",
        "example": "These factors make foreign investment indispensable to a nation prosperity."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "with + 名詞 + 分詞(付帯状況)",
        "example": "With domestic caution often hindering growth, overseas funds bolster new ventures and finance infrastructure.",
        "highlight": "With domestic caution often hindering growth",
        "explain": "with+名詞+現在分詞で「〜が…している状況で」と背景を添える付帯状況構文。caution が growth を hinder する関係なので能動の現在分詞 hindering。文頭に置いて理由・前提を簡潔に示せる上級表現。"
      },
      {
        "no": 2,
        "title": "would otherwise have+過去分詞(仮定法過去完了)",
        "example": "Foreign acquisitions have revived several struggling Japanese companies that would otherwise have collapsed.",
        "highlight": "would otherwise have collapsed",
        "explain": "otherwise=「もし(買収が)なかったら」という条件を一語で表し、would have collapsed で「破綻していただろう」と過去の反実仮想を述べる。実際は救われた事実と対比し、効果を強調する。if 節を使わず otherwise で代用する点が要。"
      },
      {
        "no": 3,
        "title": "force O to do(使役の語法)",
        "example": "There is no denying that exposure to global competition forces domestic firms to improve efficiency and adopt fresh ideas.",
        "highlight": "forces domestic firms to improve efficiency",
        "explain": "force O to do で「Oに(無理にでも)〜させる」。make は to なし(make O do)だが force は to 不定詞を取る。There is no denying that...「〜は否定できない」も譲歩・強調の定型。主語 exposure は単数なので forces と三単現。"
      }
    ]
  },
  "10": {
    "glossary": {
      "industrialization": {
        "pos": "Noun",
        "ja": "産業化",
        "tag": "無冠詞・不可算",
        "grammar": "-tion 抽象名詞で不可算→無冠詞。文頭主語に冠詞なしで立つ。本エッセイの中心語。"
      },
      "transformed": {
        "pos": "Verb",
        "ja": "一変させた",
        "tag": "過去分詞",
        "grammar": "has transformed「変えてきた」。現在完了の過去分詞で「過去から今までの変化」を表す。transform A「Aを変える」。"
      },
      "aspect": {
        "pos": "Noun",
        "ja": "側面",
        "tag": "無冠詞",
        "grammar": "nearly every aspect of...「ほぼあらゆる側面」。every+単数名詞は無冠詞・単数。every の後は必ず単数形。"
      },
      "emphasize": {
        "pos": "Verb",
        "ja": "強調する",
        "grammar": "some emphasize its costs「費用を強調する人もいる」。emphasize は他動詞で前置詞不要(× emphasize on)。"
      },
      "environmental": {
        "pos": "Adjective",
        "ja": "環境の",
        "grammar": "environmental costs「環境的費用」。environment の形容詞。harm the environment と名詞も頻出。"
      },
      "costs": {
        "pos": "Noun",
        "ja": "代償、費用",
        "tag": "複数形",
        "grammar": "environmental costs「環境への代償」。複数の負担を指すので複数。後段 drawbacks の言い換え。"
      },
      "beneficial": {
        "pos": "Adjective",
        "ja": "有益な",
        "grammar": "a beneficial effect「有益な効果」。benefit の形容詞。have a beneficial effect on で「〜に良い影響」。"
      },
      "effect": {
        "pos": "Noun",
        "ja": "影響、効果",
        "tag": "冠詞 an",
        "grammar": "an overall beneficial effect。初出の可算単数で形容詞付き→ an(母音前)。effect on「〜への影響」。"
      },
      "humankind": {
        "pos": "Noun",
        "ja": "人類",
        "tag": "無冠詞",
        "grammar": "humankind は集合的で無冠詞・単数扱い。mankind の中立的言い換え。複数化しない。"
      },
      "raised": {
        "pos": "Verb",
        "ja": "引き上げた",
        "tag": "過去分詞",
        "grammar": "has dramatically raised living standards「生活水準を引き上げた」。raise は他動詞(目的語を取る)。自動詞 rise と区別。"
      },
      "living": {
        "pos": "Adjective",
        "ja": "生活の",
        "tag": "動名詞",
        "grammar": "living standards「生活水準」。live の動名詞が名詞 standards を修飾する複合語。"
      },
      "standards": {
        "pos": "Noun",
        "ja": "水準",
        "tag": "複数形",
        "grammar": "living standards は慣用的に複数。複数の指標の集合を指す。a standard(一基準)と区別。"
      },
      "production": {
        "pos": "Noun",
        "ja": "生産",
        "tag": "無冠詞・不可算",
        "grammar": "mass production「大量生産」。-tion 抽象名詞で不可算→無冠詞。動詞 produce。"
      },
      "luxuries": {
        "pos": "Noun",
        "ja": "贅沢品",
        "tag": "複数形",
        "grammar": "goods that were once luxuries「かつて贅沢品だった物」。可算で複数の贅沢品を指す。-y→-ies。"
      },
      "affordable": {
        "pos": "Adjective",
        "ja": "手頃な",
        "grammar": "made goods affordable「物を手頃にした」。make O C の補語に形容詞。afford(余裕がある)の形容詞。"
      },
      "ordinary": {
        "pos": "Adjective",
        "ja": "普通の",
        "grammar": "ordinary people「一般の人々」。the majority の言い換え。extraordinary(並外れた)が反意。"
      },
      "items": {
        "pos": "Noun",
        "ja": "品目、品物",
        "tag": "複数形",
        "grammar": "items such as clothing「衣類などの品物」。such as の後に具体例を複数で列挙。"
      },
      "appliances": {
        "pos": "Noun",
        "ja": "家電",
        "tag": "複数形",
        "grammar": "clothing, appliances, and vehicles と並列。家電製品を複数で。an appliance なら一台。"
      },
      "vehicles": {
        "pos": "Noun",
        "ja": "乗り物、車",
        "tag": "複数形",
        "grammar": "複数で乗り物一般を指す。clothing(不可算)と並ぶが vehicles は可算複数。"
      },
      "formerly": {
        "pos": "Adverb",
        "ja": "かつては",
        "grammar": "formerly reserved for the wealthy「かつて富裕層向けだった」。挿入句で過去を説明。once の言い換え。"
      },
      "reserved": {
        "pos": "Verb",
        "ja": "取っておかれた",
        "tag": "受動・過去分詞",
        "grammar": "reserved for the wealthy「富裕層のために取っておかれた」。items を後置修飾する過去分詞=受動。be reserved for とセット。"
      },
      "wealthy": {
        "pos": "Noun",
        "ja": "富裕層",
        "tag": "冠詞 the",
        "grammar": "the wealthy「金持ちの人々」。the+形容詞で複数の人々を表す。the majority と対比される。"
      },
      "accessible": {
        "pos": "Adjective",
        "ja": "入手可能な",
        "grammar": "accessible to the majority「大多数が手に入れられる」。access の形容詞。accessible to で対象を示す。"
      },
      "majority": {
        "pos": "Noun",
        "ja": "大多数",
        "tag": "冠詞 the",
        "grammar": "the majority「大多数」。特定の集団の過半を指すので the。a majority of+複数も頻出。"
      },
      "comfort": {
        "pos": "Noun",
        "ja": "快適さ",
        "tag": "無冠詞・不可算",
        "grammar": "everyday comfort「日常の快適さ」。不可算→無冠詞。a comfort(慰め)なら可算で別義。"
      },
      "extended": {
        "pos": "Verb",
        "ja": "延ばした",
        "tag": "過去分詞",
        "grammar": "has extended life expectancy「寿命を延ばした」。現在完了。extend=長さ・期間を伸ばす他動詞。"
      },
      "expectancy": {
        "pos": "Noun",
        "ja": "見込み",
        "tag": "無冠詞・不可算",
        "grammar": "life expectancy「平均寿命」。慣用的に無冠詞の複合名詞。expect の名詞形。"
      },
      "sanitation": {
        "pos": "Noun",
        "ja": "衛生(設備)",
        "tag": "無冠詞・不可算",
        "grammar": "不可算→無冠詞。下水・清潔さの整備を指す集合的抽象名詞。medicine と並列。"
      },
      "owes": {
        "pos": "Verb",
        "ja": "負っている",
        "tag": "三単現・語法",
        "grammar": "owe much to...「〜に多くを負う」。owe A to B「BにAを借りている」。主語 development(単数)→ -s。"
      },
      "techniques": {
        "pos": "Noun",
        "ja": "技術、手法",
        "tag": "複数形",
        "grammar": "industrial techniques「産業技術」。具体的手法を複数で。technique(個別技法)と technology(技術一般・不可算)を区別。"
      },
      "curbed": {
        "pos": "Verb",
        "ja": "抑えられた",
        "tag": "受動・過去分詞",
        "grammar": "diseases have been curbed「病気が抑えられてきた」。have been+過去分詞=現在完了の受動態。curb=抑制する。"
      },
      "famines": {
        "pos": "Noun",
        "ja": "飢饉",
        "tag": "複数形",
        "grammar": "famines reduced「飢饉が減った」。複数の飢饉を指すので複数。a famine なら一件。"
      },
      "allowing": {
        "pos": "Verb",
        "ja": "可能にする",
        "tag": "動名詞・語法 SVOC",
        "grammar": "allowing populations to live...「人々が〜できるようにして」。allow O to do の分詞構文。前文の結果を添える。"
      },
      "populations": {
        "pos": "Noun",
        "ja": "人々、住民",
        "tag": "複数形",
        "grammar": "allowing populations to live longer「人々が長生きできるように」。複数地域の住民を指すので複数。"
      },
      "driven": {
        "pos": "Verb",
        "ja": "もたらした",
        "tag": "過去分詞",
        "grammar": "has driven remarkable advances「目覚ましい進歩をもたらした」。drive の過去分詞。現在完了。drive=推進する。"
      },
      "remarkable": {
        "pos": "Adjective",
        "ja": "目覚ましい",
        "grammar": "remarkable advances「目覚ましい進歩」。注目に値するほど顕著な、の意。remark(言及)由来。"
      },
      "advances": {
        "pos": "Noun",
        "ja": "進歩",
        "tag": "複数形",
        "grammar": "advances in knowledge「知識の進歩」。複数の進展を指すので複数。advance in で分野を示す。"
      },
      "communication": {
        "pos": "Noun",
        "ja": "通信、伝達",
        "tag": "無冠詞・不可算",
        "grammar": "不可算→無冠詞。advances in communication「通信の進歩」。複数 communications は「通信網・連絡」で別義。"
      },
      "factories": {
        "pos": "Noun",
        "ja": "工場",
        "tag": "複数形",
        "grammar": "the factories...it created「それが生んだ工場」。複数の工場を指す。-y→-ies の綴り。"
      },
      "funded": {
        "pos": "Verb",
        "ja": "資金を出した",
        "tag": "過去分詞",
        "grammar": "funded scientific research「科学研究に資金を出した」。fund の過去形・過去分詞。ここは過去時制の本動詞。"
      },
      "connectivity": {
        "pos": "Noun",
        "ja": "つながり",
        "tag": "無冠詞・不可算",
        "grammar": "global connectivity「世界的なつながり」。-ity 抽象名詞で不可算→無冠詞。"
      },
      "generated": {
        "pos": "Verb",
        "ja": "生み出した",
        "tag": "過去分詞",
        "grammar": "this progress has generated pollution「進歩が汚染を生んだ」。現在完了。generate=作り出す。"
      },
      "pollution": {
        "pos": "Noun",
        "ja": "汚染",
        "tag": "無冠詞・不可算",
        "grammar": "不可算→無冠詞。generate pollution「汚染を生む」。複数化しない集合的物質名詞。"
      },
      "capacity": {
        "pos": "Noun",
        "ja": "能力、生産力",
        "tag": "冠詞 the",
        "grammar": "the same industrial capacity「同じ産業力」。same が付くので the。capacity to do「〜する能力」も頻出。"
      },
      "enables": {
        "pos": "Verb",
        "ja": "可能にする",
        "tag": "語法 SVOC・三単現",
        "grammar": "enable O to do「Oが〜できるようにする」。主語 capacity(単数)→ -s。allow と同型の語法。"
      },
      "cleaner": {
        "pos": "Adjective",
        "ja": "よりクリーンな",
        "grammar": "cleaner technologies「より清潔な技術」。clean の比較級。過去の汚染と暗に対比。"
      },
      "technologies": {
        "pos": "Noun",
        "ja": "技術",
        "tag": "複数形",
        "grammar": "cleaner technologies「クリーンな技術群」。種類を数えるので可算複数。technology 全般は不可算。"
      },
      "harmed": {
        "pos": "Verb",
        "ja": "害した",
        "tag": "過去分詞",
        "grammar": "has undeniably harmed the environment「環境を害してきた」。現在完了。harm=害を与える他動詞。"
      },
      "undeniably": {
        "pos": "Adverb",
        "ja": "紛れもなく",
        "grammar": "has undeniably harmed「紛れもなく害した」。譲歩で「確かに害はあった」と一度認める副詞。-ably 語尾。"
      },
      "contributions": {
        "pos": "Noun",
        "ja": "貢献",
        "tag": "複数形",
        "grammar": "its contributions to prosperity「繁栄への貢献」。複数の貢献を列挙するので複数。contribution to で対象。"
      },
      "drawbacks": {
        "pos": "Noun",
        "ja": "欠点",
        "tag": "複数形",
        "grammar": "outweigh its drawbacks「欠点を上回る」。複数の難点を指すので複数。costs / disadvantages の言い換え。"
      },
      "maintain": {
        "pos": "Verb",
        "ja": "主張する",
        "grammar": "I firmly maintain that...「〜と強く主張する」。argue / contend の言い換え。「維持する」とは別義の「主張する」。"
      }
    },
    "vocab": [
      {
        "word": "industrialization",
        "pos": "Noun",
        "ipa": "/ɪnˌdʌstriəlaɪˈzeɪʃn/",
        "def": "the process by which an economy changes to one based on factories and manufacturing",
        "example": "Since the eighteenth century, industrialization has transformed nearly every aspect of human life."
      },
      {
        "word": "mass production",
        "pos": "Noun",
        "ipa": "/mæs prəˈdʌkʃn/",
        "def": "the process of making large quantities of a product cheaply using machinery",
        "example": "Mass production made goods that were once luxuries affordable to ordinary people."
      },
      {
        "word": "life expectancy",
        "pos": "Noun",
        "ipa": "/laɪf ɪkˈspektənsi/",
        "def": "the number of years that a person is likely to live",
        "example": "Industrialization has extended human life expectancy."
      },
      {
        "word": "sanitation",
        "pos": "Noun",
        "ipa": "/ˌsænɪˈteɪʃn/",
        "def": "systems for protecting public health, especially the removal of waste and dirty water",
        "example": "The development of modern medicine, sanitation, and food production owes much to industrial techniques."
      },
      {
        "word": "curb",
        "pos": "Verb",
        "ipa": "/kɜːb/",
        "def": "to control or limit something harmful",
        "example": "Deadly diseases have been curbed and famines reduced."
      },
      {
        "word": "outweigh",
        "pos": "Verb",
        "ipa": "/ˌaʊtˈweɪ/",
        "def": "to be greater or more important than something else",
        "example": "Its contributions to prosperity, health, and human progress far outweigh its drawbacks."
      },
      {
        "word": "undeniably",
        "pos": "Adverb",
        "ipa": "/ˌʌndɪˈnaɪəbli/",
        "def": "in a way that is clearly true and cannot be doubted",
        "example": "Although industrialization has undeniably harmed the environment."
      },
      {
        "word": "maintain",
        "pos": "Verb",
        "ipa": "/meɪnˈteɪn/",
        "def": "to strongly state that something is true",
        "example": "I firmly maintain that industrialization has, on balance, benefited humankind enormously."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "make O C(目的語+補語)の語法",
        "example": "Mass production made goods that were once luxuries affordable to ordinary people.",
        "highlight": "made goods that were once luxuries affordable",
        "explain": "make O C で「OをC(の状態)にする」。O=goods that were once luxuries(関係詞で長く修飾)、C=affordable(形容詞)。Oが長いと C が離れて見えづらいので、目的語のかたまりを正しく掴むのが要。"
      },
      {
        "no": 2,
        "title": "owe much to ~(〜に負う)",
        "example": "The development of modern medicine, sanitation, and food production owes much to industrial techniques.",
        "highlight": "owes much to industrial techniques",
        "explain": "owe A to B「BにAを負っている=Bのおかげである」。ここでは owe much to「〜に多くを負う」。主語の核は The development(単数)なので owes と三単現。長い of 句に惑わされず主語を単数と見抜く。"
      },
      {
        "no": 3,
        "title": "Admittedly + yet で譲歩・反論",
        "example": "Admittedly, this progress has generated pollution, yet the same industrial capacity now enables us to develop cleaner technologies to address it.",
        "highlight": "Admittedly, this progress has generated pollution, yet",
        "explain": "Admittedly「確かに〜だ」で反対意見を一度認め、yet「だが」で主張に切り返す譲歩構文。説得力を高める1級頻出パターン。enables us to develop は enable O to do(Oが〜できるようにする)の語法。"
      }
    ]
  },
  "11": {
    "glossary": {
      "argued": {
        "pos": "Verb",
        "ja": "主張される",
        "tag": "受動",
        "grammar": "It is often argued that ...=「〜とよく主張される」。形式主語 It + be argued で書き手をぼかし客観性を出す定番の書き出し。"
      },
      "human activity": {
        "pos": "Noun",
        "ja": "人間の活動",
        "tag": "無冠詞・不可算",
        "grammar": "activity は「活動全般」を漠然と指すと不可算→無冠詞。an activity なら「一つの活動」と可算化する。"
      },
      "inherently": {
        "pos": "Adverb",
        "ja": "本質的に、生まれつき",
        "grammar": "inherent(本質的な)の副詞形。be inherently destructive=「もともと破壊的だ」。動詞・形容詞の前に置く。"
      },
      "destructive": {
        "pos": "Adjective",
        "ja": "破壊的な"
      },
      "inevitably": {
        "pos": "Adverb",
        "ja": "必然的に、否応なく"
      },
      "damage": {
        "pos": "Verb",
        "ja": "損なう、傷つける",
        "grammar": "ここでは他動詞。damage the natural world で「自然界を損なう」。名詞の damage は不可算。"
      },
      "natural world": {
        "pos": "Noun",
        "ja": "自然界",
        "tag": "冠詞 the",
        "grammar": "the natural world=唯一の「自然界」を指すので the。world は基本 the world。"
      },
      "disagree": {
        "pos": "Verb",
        "ja": "反対する",
        "tag": "句動詞",
        "grammar": "disagree with〜=「〜に反対する」。with とセット。反対の object は前置詞 with で受ける。"
      },
      "claim": {
        "pos": "Noun",
        "ja": "主張",
        "grammar": "the claim that ...=「〜という主張」。claim の後ろは同格の that 節で中身を説明する。"
      },
      "negative effect": {
        "pos": "Noun",
        "ja": "悪影響",
        "tag": "冠詞 a",
        "grammar": "have a negative effect on〜=「〜に悪影響を及ぼす」。effect は可算で a を付け、対象は on で受ける。"
      },
      "environment": {
        "pos": "Noun",
        "ja": "環境",
        "tag": "冠詞 the",
        "grammar": "the environment=地球環境という唯一物なので必ず the。無冠詞 environment は別語義。"
      },
      "technological innovation": {
        "pos": "Noun",
        "ja": "技術革新",
        "tag": "無冠詞・不可算",
        "grammar": "-tion 抽象名詞 innovation は不可算→無冠詞。an innovation なら「一つの新機軸」と可算化。"
      },
      "steadily": {
        "pos": "Adverb",
        "ja": "着実に"
      },
      "reducing": {
        "pos": "Verb",
        "ja": "減らしている",
        "tag": "現在進行",
        "grammar": "is steadily reducing=「着実に減らしつつある」。進行形で「今まさに進行中の変化」を表す。"
      },
      "ecological footprint": {
        "pos": "Noun",
        "ja": "環境負荷、生態学的足跡",
        "tag": "所有格",
        "grammar": "humanity's ecological footprint=「人類の環境負荷」。所有格が付くので冠詞は不要。footprint は比喩的に環境への影響量を指す。"
      },
      "renewable energy": {
        "pos": "Noun",
        "ja": "再生可能エネルギー",
        "tag": "無冠詞・不可算",
        "grammar": "energy は不可算→無冠詞。renewable(再生可能な)が修飾しても可算化しない。"
      },
      "electric vehicles": {
        "pos": "Noun",
        "ja": "電気自動車",
        "tag": "複数形",
        "grammar": "一般論として電気自動車「全般」を指すので無冠詞の複数形。種類全体を表す総称用法。"
      },
      "recycling systems": {
        "pos": "Noun",
        "ja": "リサイクル設備",
        "tag": "複数形"
      },
      "consume": {
        "pos": "Verb",
        "ja": "消費する"
      },
      "resources": {
        "pos": "Noun",
        "ja": "資源",
        "tag": "複数形",
        "grammar": "resource は「資源」の意味では通例複数。natural resources など種類が複数あるので -s。"
      },
      "cleanly": {
        "pos": "Adverb",
        "ja": "環境を汚さずに、きれいに",
        "grammar": "consume resources cleanly=「環境を汚さずに資源を消費する」。形容詞 clean の副詞形で動詞 consume を修飾。"
      },
      "generate": {
        "pos": "Verb",
        "ja": "生み出す、発電する",
        "tag": "三単現なし",
        "grammar": "several nations now generate ...。主語 nations が複数なので原形 generate(三単現の s なし)。電気の「発電」によく使う動詞。"
      },
      "electricity": {
        "pos": "Noun",
        "ja": "電気",
        "tag": "無冠詞・不可算",
        "grammar": "electricity は物質名詞で不可算→無冠詞。an electricity とは言わない。"
      },
      "solar power": {
        "pos": "Noun",
        "ja": "太陽光発電",
        "tag": "無冠詞・不可算",
        "grammar": "power(動力・電力)は不可算→無冠詞。wind and solar power で「風力・太陽光発電」。"
      },
      "proving": {
        "pos": "Verb",
        "ja": "〜を証明しながら",
        "tag": "分詞構文",
        "grammar": "..., proving that ...=「そして〜を証明している」。文末の分詞構文で前文全体の結果・補足を述べる。"
      },
      "sustainability": {
        "pos": "Noun",
        "ja": "持続可能性",
        "tag": "無冠詞・不可算",
        "grammar": "-ity 抽象名詞は不可算→無冠詞。growth and sustainability で対概念を並列。"
      },
      "coexist": {
        "pos": "Verb",
        "ja": "共存する",
        "grammar": "co-(共に)+ exist。can coexist=「両立しうる」。自動詞なので目的語を取らない。"
      },
      "environmental awareness": {
        "pos": "Noun",
        "ja": "環境意識",
        "tag": "無冠詞・不可算",
        "grammar": "awareness(意識)は不可算→無冠詞。environmental が修飾しても可算化しない。"
      },
      "fundamentally": {
        "pos": "Adverb",
        "ja": "根本的に"
      },
      "public behavior": {
        "pos": "Noun",
        "ja": "人々の行動",
        "tag": "無冠詞・不可算",
        "grammar": "behavior は通例不可算→無冠詞。「世間の振る舞い」を一括りに捉える。"
      },
      "denying": {
        "pos": "Verb",
        "ja": "否定すること",
        "tag": "動名詞",
        "grammar": "There is no denying that ...=「〜は否定できない」。There is no + 動名詞 で「〜することはできない」の定型。"
      },
      "education": {
        "pos": "Noun",
        "ja": "教育",
        "tag": "無冠詞・不可算",
        "grammar": "education は不可算→無冠詞。decades of education で「数十年の教育」。"
      },
      "citizens": {
        "pos": "Noun",
        "ja": "市民",
        "tag": "複数形"
      },
      "demand": {
        "pos": "Verb",
        "ja": "強く求める",
        "grammar": "actively demand conservation=「保全を積極的に要求する」。demand は that 節や名詞を直接取り、to を挟まない。"
      },
      "conservation": {
        "pos": "Noun",
        "ja": "(自然)保護",
        "tag": "無冠詞・不可算"
      },
      "corporations": {
        "pos": "Noun",
        "ja": "企業",
        "tag": "複数形"
      },
      "mounting": {
        "pos": "Adjective",
        "ja": "高まりつつある",
        "grammar": "mounting pressure=「高まる圧力」。動詞 mount(増大する)の現在分詞が形容詞化。"
      },
      "greener": {
        "pos": "Adjective",
        "ja": "より環境に優しい",
        "tag": "比較級",
        "grammar": "green(環境配慮型の)の比較級。green→greener。「以前より環境に優しい」政策を指す。"
      },
      "policies": {
        "pos": "Noun",
        "ja": "政策",
        "tag": "複数形",
        "grammar": "policy→policies。子音+y は y を i に変え -es。複数の施策を指すので複数。"
      },
      "trend": {
        "pos": "Noun",
        "ja": "傾向、流れ",
        "tag": "冠詞 a",
        "grammar": "a trend that continues to strengthen=「強まり続ける傾向」。初出の数えられる名詞なので a。"
      },
      "strengthen": {
        "pos": "Verb",
        "ja": "強まる、強化する"
      },
      "uniquely": {
        "pos": "Adverb",
        "ja": "他に類を見ないほど",
        "grammar": "humans are uniquely capable of ...=「人間は他に類を見ないほど〜できる」。be capable of の前で強調。"
      },
      "restoring": {
        "pos": "Verb",
        "ja": "修復すること",
        "tag": "動名詞",
        "grammar": "capable of restoring=「修復できる」。be capable of の of は前置詞なので後ろは動名詞 -ing。"
      },
      "ecosystems": {
        "pos": "Noun",
        "ja": "生態系",
        "tag": "複数形"
      },
      "reforestation": {
        "pos": "Noun",
        "ja": "再植林",
        "tag": "無冠詞・不可算",
        "grammar": "re-(再び)+ forestation。-tion 抽象名詞で不可算→無冠詞。"
      },
      "alleviate": {
        "pos": "Verb",
        "ja": "緩和する",
        "grammar": "projects that alleviate ecological damage=「環境被害を和らげる事業」。関係代名詞 that の先行詞 projects(複数)を受けるので原形。"
      },
      "recovery": {
        "pos": "Noun",
        "ja": "回復",
        "tag": "冠詞 the",
        "grammar": "the recovery of endangered species=「絶滅危惧種の回復」。of で限定されるので the。"
      },
      "endangered species": {
        "pos": "Noun",
        "ja": "絶滅危惧種",
        "tag": "無冠詞",
        "grammar": "species は単複同形。endangered(絶滅の危機にある)は過去分詞由来の形容詞。総称なので無冠詞。"
      },
      "demonstrate": {
        "pos": "Verb",
        "ja": "示す、証明する"
      },
      "admittedly": {
        "pos": "Adverb",
        "ja": "確かに(認めるが)",
        "grammar": "文頭で「確かに〜だが」と一度譲歩し、後で反論する譲歩マーカー。"
      },
      "severe": {
        "pos": "Adjective",
        "ja": "深刻な、ひどい"
      },
      "undoubtedly": {
        "pos": "Adverb",
        "ja": "疑いなく"
      },
      "detrimental": {
        "pos": "Adjective",
        "ja": "有害な",
        "grammar": "have a detrimental effect on〜=「〜に有害な影響を与える」。negative より硬い語で論説向き。"
      },
      "shifting values": {
        "pos": "Noun",
        "ja": "変化する価値観",
        "tag": "複数形",
        "grammar": "shifting(動詞 shift の現在分詞)が values を修飾。価値観は複数で values。"
      },
      "restorative": {
        "pos": "Adjective",
        "ja": "修復的な、回復を促す",
        "grammar": "restorative efforts=「修復に向けた取り組み」。restore(修復する)の形容詞形。"
      },
      "efforts": {
        "pos": "Noun",
        "ja": "取り組み、努力",
        "tag": "複数形",
        "grammar": "effort は「具体的な取り組み」の意味では可算で複数化。make efforts のように使う。"
      },
      "maintain": {
        "pos": "Verb",
        "ja": "主張する、(意見を)保つ",
        "grammar": "I maintain that ...=「私は〜だと主張する」。「維持する」だけでなく「持論を堅持する」の語義に注意。"
      }
    },
    "vocab": [
      {
        "word": "inherently",
        "pos": "Adverb",
        "ipa": "/ɪnˈhɪərəntli/",
        "def": "in a way that exists as a permanent, essential characteristic of something",
        "example": "human activity is inherently destructive"
      },
      {
        "word": "ecological footprint",
        "pos": "Noun",
        "ipa": "/ˌiːkəˈlɒdʒɪkəl ˈfʊtprɪnt/",
        "def": "the amount of the environment that a person or activity uses up or damages",
        "example": "technological innovation is steadily reducing humanity's ecological footprint"
      },
      {
        "word": "coexist",
        "pos": "Verb",
        "ipa": "/ˌkəʊɪɡˈzɪst/",
        "def": "to exist together at the same time or in the same place",
        "example": "proving that growth and sustainability can coexist"
      },
      {
        "word": "awareness",
        "pos": "Noun",
        "ipa": "/əˈweənəs/",
        "def": "knowledge or understanding that something is happening or exists",
        "example": "environmental awareness has fundamentally changed public behavior"
      },
      {
        "word": "mounting",
        "pos": "Adjective",
        "ipa": "/ˈmaʊntɪŋ/",
        "def": "gradually increasing, often in a way that causes worry",
        "example": "governments and corporations face mounting pressure to adopt greener policies"
      },
      {
        "word": "alleviate",
        "pos": "Verb",
        "ipa": "/əˈliːvieɪt/",
        "def": "to make something bad less severe or less serious",
        "example": "reforestation projects that alleviate ecological damage"
      },
      {
        "word": "restorative",
        "pos": "Adjective",
        "ipa": "/rɪˈstɔːrətɪv/",
        "def": "having the ability to make something return to a former, better condition",
        "example": "technological progress, shifting values, and restorative efforts"
      },
      {
        "word": "detrimental",
        "pos": "Adjective",
        "ipa": "/ˌdetrɪˈmentl/",
        "def": "causing harm or damage to something",
        "example": "human societies have undoubtedly had a detrimental effect on nature in the past"
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "形式主語 It is argued that の客観表現",
        "example": "It is often argued that human activity is inherently destructive and that societies will inevitably damage the natural world.",
        "highlight": "It is often argued that",
        "explain": "It を形式主語に立て、本当の主語(that 節)を後ろへ。「〜とよく言われる」と書き手を表に出さず、一般論として論点を提示できる。受動態 is argued で客観性が増し、反論の前置きにも使える定番の書き出し。"
      },
      {
        "no": 2,
        "title": "There is no + 動名詞(否定の強調)",
        "example": "There is no denying that decades of education have produced citizens who actively demand conservation.",
        "highlight": "There is no denying that",
        "explain": "There is no + 動名詞 で「〜することはできない/〜は否定しようがない」。no の後ろは必ず動名詞(-ing)で、to 不定詞は不可。that 節を続けて「〜は明らかだ」と強く断言する譲歩・強調表現。"
      },
      {
        "no": 3,
        "title": "文末の分詞構文 ..., proving that",
        "example": "several nations now generate most of their electricity from wind and solar power, proving that growth and sustainability can coexist.",
        "highlight": "proving that growth and sustainability can coexist",
        "explain": "コンマ + 現在分詞(proving)で前の文全体を主語的に受け、「そしてそれが〜を証明している」と結果・補足を加える分詞構文。and it proves that を一語でまとめ、文をスマートに締めくくれる。"
      }
    ]
  },
  "12": {
    "glossary": {
      "genetic engineering": {
        "pos": "Noun",
        "ja": "遺伝子工学",
        "tag": "無冠詞・不可算",
        "grammar": "engineering(工学)は学問・分野名で不可算→無冠詞。genetic が修飾しても可算化しない。"
      },
      "advanced": {
        "pos": "Verb",
        "ja": "進歩した",
        "tag": "過去形",
        "grammar": "has advanced rapidly=「急速に進歩してきた」。現在完了で「過去から今に至る進展」を表す。"
      },
      "rapidly": {
        "pos": "Adverb",
        "ja": "急速に"
      },
      "recent decades": {
        "pos": "Noun",
        "ja": "ここ数十年",
        "tag": "複数形",
        "grammar": "in recent decades=「ここ数十年で」。複数の十年間を指すので decade を複数化。"
      },
      "prompting": {
        "pos": "Verb",
        "ja": "引き起こしながら",
        "tag": "分詞構文",
        "grammar": "..., prompting debate=「そして議論を呼び起こしている」。文末の分詞構文で前文の結果を述べる。"
      },
      "debate": {
        "pos": "Noun",
        "ja": "議論",
        "tag": "無冠詞・不可算",
        "grammar": "prompt debate over〜=「〜をめぐる議論を呼ぶ」。ここでは抽象的に「議論」全般を指し無冠詞。対象は over で受ける。"
      },
      "ramifications": {
        "pos": "Noun",
        "ja": "(複雑な)影響、波及",
        "tag": "複数形",
        "grammar": "far-reaching ramifications=「広範囲に及ぶ影響」。複数の波及効果を指すので通例複数形。"
      },
      "misuse": {
        "pos": "Noun",
        "ja": "悪用、誤用",
        "tag": "無冠詞・不可算",
        "grammar": "fear its misuse=「その悪用を恐れる」。mis-(誤った)+ use。抽象的な「悪用」で不可算・無冠詞。"
      },
      "positive influence": {
        "pos": "Noun",
        "ja": "良い影響",
        "tag": "冠詞 a",
        "grammar": "have a positive influence on〜=「〜に良い影響を与える」。influence は可算で a を付け、対象は on で受ける。"
      },
      "revolutionize": {
        "pos": "Verb",
        "ja": "大変革する",
        "grammar": "promises to revolutionize medicine=「医療を一変させると期待される」。revolution(革命)の動詞形。他動詞で目的語を直接取る。"
      },
      "medicine": {
        "pos": "Noun",
        "ja": "医療、医学",
        "tag": "無冠詞・不可算",
        "grammar": "ここでは「医学・医療分野」の意味で不可算→無冠詞。a medicine なら「(一つの)薬」と語義が変わる。"
      },
      "correcting": {
        "pos": "Verb",
        "ja": "修正すること",
        "tag": "動名詞",
        "grammar": "By correcting defective genes=「欠陥遺伝子を修正することで」。前置詞 by の後ろなので動名詞 -ing。"
      },
      "defective": {
        "pos": "Adjective",
        "ja": "欠陥のある",
        "grammar": "defective genes=「欠陥遺伝子」。defect(欠陥)の形容詞形。名詞の前に置く限定用法。"
      },
      "genes": {
        "pos": "Noun",
        "ja": "遺伝子",
        "tag": "複数形"
      },
      "cure": {
        "pos": "Verb",
        "ja": "治す、根治する",
        "grammar": "may cure inherited diseases=「遺伝病を治しうる」。cure は「病気を根治する」。treat(治療する)とニュアンスが異なる。"
      },
      "inherited diseases": {
        "pos": "Noun",
        "ja": "遺伝性疾患",
        "tag": "複数形",
        "grammar": "inherited(過去分詞=受け継がれた)が diseases を修飾。種類全般を指すので無冠詞の複数。"
      },
      "hopeless": {
        "pos": "Adjective",
        "ja": "絶望的な、見込みのない",
        "grammar": "considered hopeless=「絶望的とみなされた」。hope(希望)+ -less(〜がない)。consider O C の補語位置。"
      },
      "gene therapies": {
        "pos": "Noun",
        "ja": "遺伝子治療",
        "tag": "複数形",
        "grammar": "therapy→therapies。子音+y は y を i に変え -es。複数の治療法を指すので複数。"
      },
      "treat": {
        "pos": "Verb",
        "ja": "治療する",
        "tag": "受動",
        "grammar": "are already being used to treat ...=「すでに〜の治療に使われている」。treat は「治療を施す」で cure(根治)と区別。"
      },
      "cancers": {
        "pos": "Noun",
        "ja": "がん",
        "tag": "複数形",
        "grammar": "certain cancers=「特定のがん」。種類を指すと cancer は可算化し複数 cancers に。漠然と「がん」全般なら不可算。"
      },
      "blood disorders": {
        "pos": "Noun",
        "ja": "血液疾患",
        "tag": "複数形"
      },
      "countless": {
        "pos": "Adjective",
        "ja": "数え切れないほどの",
        "grammar": "countless patients=「無数の患者」。count + -less。後ろは必ず可算名詞の複数形。"
      },
      "patients": {
        "pos": "Noun",
        "ja": "患者",
        "tag": "複数形"
      },
      "strengthen": {
        "pos": "Verb",
        "ja": "強化する",
        "grammar": "can strengthen global food security=「世界の食料安全保障を強化しうる」。strong の動詞形(-en で動詞化)。"
      },
      "global food security": {
        "pos": "Noun",
        "ja": "世界の食料安全保障",
        "tag": "無冠詞・不可算",
        "grammar": "security は抽象名詞で不可算→無冠詞。food security で「食料の安定確保」を表す複合語。"
      },
      "long-term perspective": {
        "pos": "Noun",
        "ja": "長期的視点",
        "tag": "冠詞 a",
        "grammar": "From a long-term perspective=「長期的に見れば」。perspective は可算で a を付ける。文頭の論説定型句。"
      },
      "genetically modified crops": {
        "pos": "Noun",
        "ja": "遺伝子組換え作物",
        "tag": "複数形",
        "grammar": "genetically(副詞)が modified(過去分詞)を修飾し crops にかかる。総称なので無冠詞の複数。"
      },
      "resist": {
        "pos": "Verb",
        "ja": "〜に耐える、抵抗する",
        "grammar": "crops that resist pests and drought=「害虫と干ばつに耐える作物」。先行詞 crops(複数)を受けるので原形 resist。"
      },
      "pests": {
        "pos": "Noun",
        "ja": "害虫",
        "tag": "複数形"
      },
      "drought": {
        "pos": "Noun",
        "ja": "干ばつ",
        "tag": "無冠詞・不可算",
        "grammar": "ここでは現象としての「干ばつ」を漠然と指し不可算・無冠詞。a drought なら「一度の干ばつ」と可算化。"
      },
      "vulnerable": {
        "pos": "Adjective",
        "ja": "弱い、被害を受けやすい",
        "grammar": "regions vulnerable to famine=「飢饉に弱い地域」。be vulnerable to〜=「〜に対して脆弱」。to とセット。"
      },
      "famine": {
        "pos": "Noun",
        "ja": "飢饉",
        "tag": "無冠詞・不可算",
        "grammar": "ここでは「飢餓状態」全般を指し不可算・無冠詞。a famine なら「(一度の)飢饉」。"
      },
      "stable harvests": {
        "pos": "Noun",
        "ja": "安定した収穫",
        "tag": "複数形"
      },
      "dependence": {
        "pos": "Noun",
        "ja": "依存",
        "grammar": "reduce dependence on imports=「輸入への依存を減らす」。depend on の名詞形。対象は on で受ける。"
      },
      "imports": {
        "pos": "Noun",
        "ja": "輸入(品)",
        "tag": "複数形",
        "grammar": "名詞 import は「輸入品」の意味では可算で複数化。動詞 import(輸入する)と区別。"
      },
      "catalyst": {
        "pos": "Noun",
        "ja": "触媒、促進要因",
        "tag": "冠詞 a",
        "grammar": "serves as a catalyst for〜=「〜の促進剤として働く」。初出の可算名詞なので a。for で対象を受ける。"
      },
      "scientific progress": {
        "pos": "Noun",
        "ja": "科学の進歩",
        "tag": "無冠詞・不可算",
        "grammar": "progress は不可算→無冠詞。a progress とは言わない。「一つの進歩」は a step forward などで表す。"
      },
      "manipulating": {
        "pos": "Verb",
        "ja": "操作すること",
        "tag": "動名詞",
        "grammar": "knowledge gained from manipulating genes=「遺伝子操作から得られる知識」。前置詞 from の後ろなので動名詞 -ing。"
      },
      "deepens": {
        "pos": "Verb",
        "ja": "深める",
        "tag": "三単現",
        "grammar": "The knowledge ... deepens our understanding。主語 knowledge が三人称単数なので -s が付く。deep の動詞形。"
      },
      "understanding": {
        "pos": "Noun",
        "ja": "理解",
        "tag": "無冠詞・不可算",
        "grammar": "「理解」の意味では不可算→無冠詞。our が付くと冠詞は不要。"
      },
      "biology": {
        "pos": "Noun",
        "ja": "生物学",
        "tag": "無冠詞・不可算",
        "grammar": "学問名 biology は不可算→無冠詞。-logy で終わる学問名は基本この扱い。"
      },
      "ethical concerns": {
        "pos": "Noun",
        "ja": "倫理的懸念",
        "tag": "複数形",
        "grammar": "ethic(倫理)の形容詞 ethical。concern は「懸念」の意味では可算で複数化。"
      },
      "legitimate": {
        "pos": "Adjective",
        "ja": "正当な、もっともな",
        "grammar": "concerns ... are legitimate=「懸念はもっともだ」。be 動詞の補語位置で叙述用法。"
      },
      "regulation": {
        "pos": "Noun",
        "ja": "規制",
        "tag": "無冠詞・不可算",
        "grammar": "careful regulation=「慎重な規制」。ここでは「規制という営み」全般で不可算・無冠詞。具体的な個々の規則なら regulations と複数。"
      },
      "ensure": {
        "pos": "Verb",
        "ja": "確実にする、保証する",
        "grammar": "ensure that ...=「確実に〜であるようにする」。後ろは that 節。make sure より硬い論説語。"
      },
      "benefits": {
        "pos": "Verb",
        "ja": "〜の利益になる",
        "tag": "三単現",
        "grammar": "the technology benefits ... society。主語 technology が三人称単数なので benefits と -s。ここは動詞。名詞 benefit と混同しない。"
      },
      "raises": {
        "pos": "Verb",
        "ja": "提起する、引き起こす",
        "tag": "三単現",
        "grammar": "genetic engineering raises valid ethical questions=「正当な倫理的問題を提起する」。他動詞 raise(目的語を取る)で自動詞 rise と区別。"
      },
      "valid": {
        "pos": "Adjective",
        "ja": "妥当な、根拠のある"
      },
      "potential": {
        "pos": "Noun",
        "ja": "可能性、潜在力",
        "tag": "所有格",
        "grammar": "its potential to cure diseases=「病を治す可能性」。所有格 its が付くので冠詞不要。後ろは to 不定詞で内容を説明。"
      },
      "feed": {
        "pos": "Verb",
        "ja": "養う、食料を供給する",
        "grammar": "feed populations=「人々を養う」。to cure ..., feed ..., and accelerate ... と to 不定詞が並列し、2つ目以降は to が省略されている。"
      },
      "accelerate": {
        "pos": "Verb",
        "ja": "加速させる"
      },
      "outweigh": {
        "pos": "Verb",
        "ja": "上回る、勝る",
        "grammar": "the advantages outweigh the disadvantages=「利点が欠点を上回る」。out-(超えて)+ weigh(重さがある)。比較対象を直接目的語に取る。"
      },
      "disadvantages": {
        "pos": "Noun",
        "ja": "欠点、不利な点",
        "tag": "複数形"
      },
      "firmly": {
        "pos": "Adverb",
        "ja": "断固として、強く",
        "grammar": "I firmly believe that ...=「〜だと固く信じる」。believe を強める論説の決まり文句。"
      },
      "ultimately": {
        "pos": "Adverb",
        "ja": "最終的には"
      },
      "future generations": {
        "pos": "Noun",
        "ja": "未来の世代",
        "tag": "複数形",
        "grammar": "benefit future generations=「未来世代の利益になる」。総称的に複数世代を指すので無冠詞の複数。"
      }
    },
    "vocab": [
      {
        "word": "ramifications",
        "pos": "Noun",
        "ipa": "/ˌræmɪfɪˈkeɪʃənz/",
        "def": "the complicated and unwelcome results of an action or decision",
        "example": "prompting debate over its far-reaching ramifications for humanity"
      },
      {
        "word": "revolutionize",
        "pos": "Verb",
        "ipa": "/ˌrevəˈluːʃənaɪz/",
        "def": "to completely change the way something is done",
        "example": "genetic engineering promises to revolutionize medicine"
      },
      {
        "word": "defective",
        "pos": "Adjective",
        "ipa": "/dɪˈfektɪv/",
        "def": "having a fault or faults; not working correctly",
        "example": "By correcting defective genes, scientists may cure inherited diseases"
      },
      {
        "word": "food security",
        "pos": "Noun",
        "ipa": "/fuːd sɪˈkjʊərəti/",
        "def": "the state of having reliable access to enough affordable, nutritious food",
        "example": "this technology can strengthen global food security"
      },
      {
        "word": "vulnerable",
        "pos": "Adjective",
        "ipa": "/ˈvʌlnərəbl/",
        "def": "able to be easily harmed or affected by something bad",
        "example": "regions vulnerable to famine could achieve stable harvests"
      },
      {
        "word": "catalyst",
        "pos": "Noun",
        "ipa": "/ˈkætəlɪst/",
        "def": "an event or person that causes great change or speeds up progress",
        "example": "genetic engineering serves as a catalyst for broader scientific progress"
      },
      {
        "word": "legitimate",
        "pos": "Adjective",
        "ipa": "/lɪˈdʒɪtɪmət/",
        "def": "reasonable and acceptable; based on good reasons",
        "example": "ethical concerns regarding misuse are legitimate"
      },
      {
        "word": "outweigh",
        "pos": "Verb",
        "ipa": "/ˌaʊtˈweɪ/",
        "def": "to be greater or more important than something else",
        "example": "the advantages outweigh the disadvantages"
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "譲歩の Although で反論を先取り",
        "example": "Although some fear its misuse, I agree that genetic engineering will have a positive influence on society in the future.",
        "highlight": "Although some fear its misuse",
        "explain": "Although + 譲歩節 で「確かに〜だが」と反対意見を一度認め、主節で自分の主張を述べる。反論を先取りすることで説得力が増す。While でも同じ働き。主節の I agree that が論の核となる。"
      },
      {
        "no": 2,
        "title": "By + 動名詞(手段の表現)",
        "example": "By correcting defective genes, scientists may cure inherited diseases that were once considered hopeless.",
        "highlight": "By correcting defective genes",
        "explain": "By + 動名詞 で「〜することによって」と手段・方法を表す。前置詞 by の後ろは必ず動名詞(-ing)。文頭に置くと「どうやって実現するか」を先に示せ、続く主節の主張が具体的になる。"
      },
      {
        "no": 3,
        "title": "Admittedly ... , yet ... の譲歩→反論",
        "example": "Admittedly, ethical concerns regarding misuse are legitimate, yet careful regulation can ensure that the technology benefits rather than harms society.",
        "highlight": "Admittedly, ... , yet",
        "explain": "Admittedly(確かに)で一度相手の懸念を認め、yet(しかし)で切り返す譲歩構文。相手の正当性を認めたうえで反論するため、一方的でなく公平な印象を与える。rather than は「〜ではなく」で対比を作る。"
      }
    ]
  },
  "13": {
    "glossary": {
      "allocate": {
        "pos": "Verb",
        "ja": "(資源を)割り当てる",
        "grammar": "allocate resources to〜=「〜に資源を配分する」。allocate A to B の語法。予算・資源の配分でよく使う硬い動詞。"
      },
      "resources": {
        "pos": "Noun",
        "ja": "資源、財源",
        "tag": "複数形",
        "grammar": "ここでは「(予算・人材などの)資源」。複数種類あるので通例複数形 resources。"
      },
      "technological development": {
        "pos": "Noun",
        "ja": "技術開発",
        "tag": "無冠詞・不可算",
        "grammar": "development は「発展・開発」全般を指すと不可算→無冠詞。a development なら「一つの新展開」と可算化。"
      },
      "attracted": {
        "pos": "Verb",
        "ja": "集めた",
        "tag": "過去形",
        "grammar": "has attracted considerable attention=「相当な注目を集めてきた」。現在完了で「近年から今に至る状況」を表す。"
      },
      "considerable": {
        "pos": "Adjective",
        "ja": "かなりの、相当な",
        "grammar": "considerable attention=「相当な注目」。considerable は「量・程度が大きい」。considerate(思いやりのある)と混同しない。"
      },
      "attention": {
        "pos": "Noun",
        "ja": "注目、関心",
        "tag": "無冠詞・不可算",
        "grammar": "attention は不可算→無冠詞。attract attention で「注目を集める」の定番コロケーション。"
      },
      "priority": {
        "pos": "Noun",
        "ja": "優先事項",
        "tag": "冠詞 a",
        "grammar": "a bigger priority=「より大きな優先事項」。priority は可算で a を付ける。make O a priority の形も頻出。"
      },
      "perspectives": {
        "pos": "Noun",
        "ja": "観点、視点",
        "tag": "複数形",
        "grammar": "from the perspectives of A, B, and C=「A・B・C の観点から」。複数の視点を列挙するので複数形。"
      },
      "economic growth": {
        "pos": "Noun",
        "ja": "経済成長",
        "tag": "無冠詞・不可算",
        "grammar": "growth は不可算→無冠詞。economic が修飾しても可算化しない。"
      },
      "public welfare": {
        "pos": "Noun",
        "ja": "公共の福祉",
        "tag": "無冠詞・不可算",
        "grammar": "welfare は不可算→無冠詞。「人々の福利」全般を漠然と指す。"
      },
      "national competitiveness": {
        "pos": "Noun",
        "ja": "国家の競争力",
        "tag": "無冠詞・不可算",
        "grammar": "competitiveness(-ness 抽象名詞)は不可算→無冠詞。national が修飾しても可算化しない。"
      },
      "investment": {
        "pos": "Noun",
        "ja": "投資",
        "tag": "無冠詞・不可算",
        "grammar": "technological investment=「技術投資」。ここでは「投資という行為」全般で不可算・無冠詞。具体的な個別投資なら investments と複数。"
      },
      "pivotal": {
        "pos": "Adjective",
        "ja": "極めて重要な、中枢の",
        "grammar": "plays a pivotal role in〜=「〜で極めて重要な役割を果たす」。play a role in の role を強める形容詞。in の後ろは動名詞か名詞。"
      },
      "driving": {
        "pos": "Verb",
        "ja": "推進すること",
        "tag": "動名詞",
        "grammar": "a pivotal role in driving ... growth=「成長を牽引する役割」。in は前置詞なので後ろは動名詞 -ing。"
      },
      "emerging technologies": {
        "pos": "Noun",
        "ja": "新興技術",
        "tag": "複数形",
        "grammar": "emerging(動詞 emerge の現在分詞=台頭しつつある)が technologies を修飾。複数種類を指すので複数形。"
      },
      "generate": {
        "pos": "Verb",
        "ja": "生み出す",
        "grammar": "industries ... generate employment and tax revenue=「雇用と税収を生む」。先行詞 industries(複数)を受けるので原形 generate。"
      },
      "employment": {
        "pos": "Noun",
        "ja": "雇用",
        "tag": "無冠詞・不可算",
        "grammar": "employment は不可算→無冠詞。job(可算)と異なり「雇用全般」を抽象的に表す。"
      },
      "tax revenue": {
        "pos": "Noun",
        "ja": "税収",
        "tag": "無冠詞・不可算",
        "grammar": "revenue(歳入・収益)は不可算→無冠詞。tax revenue で「税による歳入」。"
      },
      "case in point": {
        "pos": "Noun",
        "ja": "好例、適例",
        "tag": "冠詞 a",
        "grammar": "A case in point is ...=「その好例が〜だ」。具体例を導入する論説の定型句。case は可算で a を付ける。"
      },
      "aggressive": {
        "pos": "Adjective",
        "ja": "積極的な、大胆な",
        "grammar": "aggressive government funding=「政府の大胆な資金投入」。ここでは攻撃的でなく「積極果敢な」の良い意味。"
      },
      "funding": {
        "pos": "Noun",
        "ja": "資金提供",
        "tag": "無冠詞・不可算",
        "grammar": "funding(資金供給)は不可算→無冠詞。fund の動名詞由来で「資金を出すこと」全般を指す。"
      },
      "semiconductor sector": {
        "pos": "Noun",
        "ja": "半導体産業",
        "tag": "冠詞 the",
        "grammar": "the semiconductor sector=「半導体部門」。特定の産業分野を指すので the。sector は「業界・部門」。"
      },
      "transformed": {
        "pos": "Verb",
        "ja": "一変させた",
        "tag": "過去形・語法 SVOC",
        "grammar": "transformed it into a global powerhouse=「それを世界的大国へと変えた」。transform A into B=「A を B に変える」。into とセット。"
      },
      "powerhouse": {
        "pos": "Noun",
        "ja": "強国、原動力",
        "tag": "冠詞 a",
        "grammar": "a global economic powerhouse=「世界的な経済大国」。比喩で「強大な存在」。初出の可算名詞なので a。"
      },
      "dramatically": {
        "pos": "Adverb",
        "ja": "劇的に"
      },
      "innovations": {
        "pos": "Noun",
        "ja": "技術革新、新機軸",
        "tag": "複数形",
        "grammar": "innovations in medicine, transportation, and energy=「各分野の革新」。具体的な複数の革新を指すので可算・複数。漠然と「革新」全般なら不可算 innovation。"
      },
      "transportation": {
        "pos": "Noun",
        "ja": "交通、輸送",
        "tag": "無冠詞・不可算",
        "grammar": "-tion 抽象名詞で不可算→無冠詞。「交通機関全般」を指す。"
      },
      "enhance": {
        "pos": "Verb",
        "ja": "高める、向上させる",
        "grammar": "directly enhance the quality of citizens daily lives=「市民の生活の質を直接高める」。improve より硬い論説向きの動詞。"
      },
      "quality": {
        "pos": "Noun",
        "ja": "質",
        "tag": "冠詞 the",
        "grammar": "the quality of ... lives=「生活の質」。of で限定されるので the。quality of life は定番表現。"
      },
      "government-backed": {
        "pos": "Adjective",
        "ja": "政府が支援する",
        "grammar": "government-backed research=「政府支援の研究」。名詞 + 過去分詞 backed のハイフン複合形容詞。名詞を前から修飾。"
      },
      "renewable energy": {
        "pos": "Noun",
        "ja": "再生可能エネルギー",
        "tag": "無冠詞・不可算",
        "grammar": "energy は不可算→無冠詞。renewable が修飾しても可算化しない。"
      },
      "pollution": {
        "pos": "Noun",
        "ja": "汚染",
        "tag": "無冠詞・不可算",
        "grammar": "reduces pollution=「汚染を減らす」。pollution は不可算→無冠詞。a pollution とは言わない。"
      },
      "secures": {
        "pos": "Verb",
        "ja": "確保する",
        "tag": "三単現",
        "grammar": "research ... secures a sustainable future。主語 research が三人称単数なので secures と -s。「安全にする」でなく「確保する」の語義。"
      },
      "sustainable future": {
        "pos": "Noun",
        "ja": "持続可能な未来",
        "tag": "冠詞 a",
        "grammar": "a sustainable future=「(一つの)持続可能な未来」。future は可算で a を付ける。"
      },
      "coming generations": {
        "pos": "Noun",
        "ja": "次世代、来たる世代",
        "tag": "複数形",
        "grammar": "coming(動詞 come の現在分詞=来たるべき)が generations を修飾。総称なので無冠詞の複数。"
      },
      "neglect": {
        "pos": "Verb",
        "ja": "おろそかにする、軽視する",
        "grammar": "nations that neglect technology=「技術を軽視する国」。先行詞 nations(複数)を受けるので原形 neglect。"
      },
      "risk": {
        "pos": "Verb",
        "ja": "〜する危険を冒す",
        "tag": "語法・動名詞",
        "grammar": "risk falling behind=「後れを取る危険を冒す」。risk は後ろに動名詞(-ing)を取る動詞。to 不定詞は不可。"
      },
      "falling behind": {
        "pos": "Verb",
        "ja": "後れを取ること",
        "tag": "句動詞・動名詞",
        "grammar": "fall behind=「(競争などで)後れを取る」。risk の目的語なので動名詞 falling。behind が後置する句動詞。"
      },
      "rivals": {
        "pos": "Noun",
        "ja": "競争相手、ライバル",
        "tag": "複数形"
      },
      "increasingly": {
        "pos": "Adverb",
        "ja": "ますます",
        "grammar": "in an increasingly globalized world=「ますますグローバル化する世界で」。形容詞 globalized を前から修飾する副詞。"
      },
      "globalized": {
        "pos": "Adjective",
        "ja": "グローバル化した",
        "tag": "過去分詞",
        "grammar": "globalized world=「グローバル化した世界」。動詞 globalize の過去分詞が形容詞化し、「〜された状態」を表す。"
      },
      "military": {
        "pos": "Adjective",
        "ja": "軍事の",
        "grammar": "military and economic security=「軍事・経済の安全保障」。ここでは形容詞で security を修飾。"
      },
      "security": {
        "pos": "Noun",
        "ja": "安全保障",
        "tag": "無冠詞・不可算",
        "grammar": "security は抽象名詞で不可算→無冠詞。military and economic security で2分野を一括。"
      },
      "depend": {
        "pos": "Verb",
        "ja": "依存する",
        "tag": "句動詞",
        "grammar": "depend heavily on〜=「〜に大きく依存する」。on とセット。前置詞を落とさない。heavily で程度を強める。"
      },
      "technological superiority": {
        "pos": "Noun",
        "ja": "技術的優位",
        "tag": "無冠詞・不可算",
        "grammar": "superiority(優越)は不可算→無冠詞。superior(優れた)の名詞形。"
      },
      "admittedly": {
        "pos": "Adverb",
        "ja": "確かに(認めるが)",
        "grammar": "文頭で「確かに〜だが」と一度譲歩し後で反論する譲歩マーカー。"
      },
      "costly": {
        "pos": "Adjective",
        "ja": "費用のかかる",
        "grammar": "such investment is costly=「その投資は高くつく」。cost + -ly だが副詞でなく形容詞。-ly で終わる形容詞に注意。"
      },
      "stagnation": {
        "pos": "Noun",
        "ja": "停滞",
        "tag": "冠詞 the",
        "grammar": "the price of stagnation=「停滞の代償」。of で限定されるので the。stagnant(停滞した)の名詞形で不可算。"
      },
      "contribution": {
        "pos": "Noun",
        "ja": "貢献",
        "tag": "所有格",
        "grammar": "given its contribution to〜=「〜への貢献を考えると」。所有格 its が付くので冠詞不要。対象は to で受ける。"
      },
      "economic prosperity": {
        "pos": "Noun",
        "ja": "経済的繁栄",
        "tag": "無冠詞・不可算",
        "grammar": "prosperity(-ity 抽象名詞)は不可算→無冠詞。"
      },
      "national strength": {
        "pos": "Noun",
        "ja": "国力",
        "tag": "無冠詞・不可算",
        "grammar": "strength は「力・強さ」の抽象的意味では不可算→無冠詞。"
      },
      "deserves": {
        "pos": "Verb",
        "ja": "〜に値する",
        "tag": "三単現",
        "grammar": "technology ... deserves greater priority=「より高い優先順位に値する」。主語 technology が三人称単数なので deserves。後ろは名詞または to 不定詞。"
      },
      "firmly": {
        "pos": "Adverb",
        "ja": "強く、断固として",
        "grammar": "I firmly believe that ...=「〜だと固く信じる」。believe を強める論説の決まり文句。"
      },
      "invest": {
        "pos": "Verb",
        "ja": "投資する",
        "tag": "句動詞",
        "grammar": "invest more heavily in〜=「〜にもっと重点的に投資する」。invest in の形。対象は in で受ける。"
      },
      "technological advancement": {
        "pos": "Noun",
        "ja": "技術の進歩",
        "tag": "無冠詞・不可算",
        "grammar": "advancement は「進歩」全般を指すと不可算→無冠詞。"
      }
    },
    "vocab": [
      {
        "word": "allocate",
        "pos": "Verb",
        "ipa": "/ˈæləkeɪt/",
        "def": "to officially give something such as money or resources to a particular purpose",
        "example": "whether governments should allocate more resources to technological development"
      },
      {
        "word": "pivotal",
        "pos": "Adjective",
        "ipa": "/ˈpɪvətl/",
        "def": "very important because other things depend on it",
        "example": "technological investment plays a pivotal role in driving long-term economic growth"
      },
      {
        "word": "a case in point",
        "pos": "Noun",
        "ipa": "/ə ˌkeɪs ɪn ˈpɔɪnt/",
        "def": "a clear example that proves what is being said is true",
        "example": "A case in point is South Korea, whose aggressive government funding of the semiconductor sector..."
      },
      {
        "word": "powerhouse",
        "pos": "Noun",
        "ipa": "/ˈpaʊəhaʊs/",
        "def": "a country, group, or person with great economic, political, or military strength",
        "example": "transformed it into a global economic powerhouse"
      },
      {
        "word": "enhance",
        "pos": "Verb",
        "ipa": "/ɪnˈhɑːns/",
        "def": "to improve the quality, amount, or value of something",
        "example": "Innovations in medicine, transportation, and energy directly enhance the quality of daily lives"
      },
      {
        "word": "neglect",
        "pos": "Verb",
        "ipa": "/nɪˈɡlekt/",
        "def": "to fail to give proper attention or care to something",
        "example": "nations that neglect technology risk falling behind their rivals"
      },
      {
        "word": "superiority",
        "pos": "Noun",
        "ipa": "/suːˌpɪəriˈɒrəti/",
        "def": "the state of being better, stronger, or more important than others",
        "example": "military and economic security depend heavily on technological superiority"
      },
      {
        "word": "stagnation",
        "pos": "Noun",
        "ipa": "/stæɡˈneɪʃn/",
        "def": "a state of no activity, growth, or development",
        "example": "the price of stagnation is far greater"
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "論点予告 from the perspectives of",
        "example": "I will support this view from the perspectives of economic growth, public welfare, and national competitiveness.",
        "highlight": "from the perspectives of economic growth, public welfare, and national competitiveness",
        "explain": "序論の最後で「どの観点から論じるか」を3点予告するテンプレ。perspectives は複数形にし、of の後ろに A, B, and C を並列。読み手に本論の構成を先に示し、論理的な印象を与える。各観点が後の3段落の主題となる。"
      },
      {
        "no": 2,
        "title": "whose を使う関係代名詞(所有格)",
        "example": "A case in point is South Korea, whose aggressive government funding of the semiconductor sector transformed it into a global economic powerhouse.",
        "highlight": "whose aggressive government funding",
        "explain": "whose は「〜の」を表す所有格の関係代名詞。先行詞 South Korea を受け「韓国の政府資金が」とつなぐ。transform A into B(A を B に変える)の語法も押さえる。"
      },
      {
        "no": 3,
        "title": "Admittedly ... . However ... の譲歩→主張",
        "example": "Admittedly, such investment is costly. However, the price of stagnation is far greater.",
        "highlight": "Admittedly, such investment is costly. However,",
        "explain": "Admittedly(確かに)で反対意見(コストが高い)を一度認め、However で「だが停滞の代償の方が大きい」と切り返す。短い2文に分けることでリズムが生まれ、結論直前で説得力を高める。far greater は比較級 + far で「はるかに大きい」と差を強調。"
      }
    ]
  },
  "14": {
    "glossary": {
      "rapid": {
        "pos": "Adjective",
        "ja": "急速な"
      },
      "spread": {
        "pos": "Noun",
        "ja": "普及、拡散",
        "tag": "無冠詞・不可算",
        "grammar": "the rapid spread of=「〜の急速な普及」。the spread of X の定型なので the。"
      },
      "digital technology": {
        "pos": "Noun",
        "ja": "デジタル技術",
        "tag": "無冠詞・不可算",
        "grammar": "technology は不可算なので無冠詞。digital が限定しても可算化しない。"
      },
      "wonder": {
        "pos": "Verb",
        "ja": "〜かと思う、疑問に思う",
        "tag": "語法",
        "grammar": "wonder whether/if=「〜かどうかと思う」。後ろに間接疑問文を取る。"
      },
      "personal information": {
        "pos": "Noun",
        "ja": "個人情報",
        "tag": "無冠詞・不可算",
        "grammar": "information は不可算→無冠詞。a/複数形にできない。much/a piece of で数える。"
      },
      "remains": {
        "pos": "Verb",
        "ja": "〜のままである",
        "tag": "三単現",
        "grammar": "remain は連結動詞でremain safe=「安全なままだ」。主語 information が不可算単数なので三単現の s。"
      },
      "safe": {
        "pos": "Adjective",
        "ja": "安全な"
      },
      "individual": {
        "pos": "Adjective",
        "ja": "個人の"
      },
      "privacy": {
        "pos": "Noun",
        "ja": "プライバシー",
        "tag": "無冠詞・不可算",
        "grammar": "privacy は抽象不可算名詞→無冠詞。individual が付いても可算化しない。"
      },
      "no longer": {
        "pos": "Adverb",
        "ja": "もはや〜ない",
        "grammar": "no longer=「もはや〜ない」。助動詞の後ろ、一般動詞の前に置く。can no longer be で「もはや〜され得ない」。"
      },
      "fully": {
        "pos": "Adverb",
        "ja": "完全に"
      },
      "protected": {
        "pos": "Verb",
        "ja": "守られる",
        "tag": "受動",
        "grammar": "be protected=「守られる」。主語 privacy は守る側でなく守られる側なので受動態。"
      },
      "modern world": {
        "pos": "Noun",
        "ja": "現代社会",
        "tag": "冠詞 the",
        "grammar": "the modern world=「現代という(唯一の)世界」。世界は一つに特定されるので the。"
      },
      "examining": {
        "pos": "Verb",
        "ja": "検討する",
        "tag": "動名詞",
        "grammar": "by examining=「〜を検討することで」。前置詞 by の後ろは動名詞 -ing。"
      },
      "data collection": {
        "pos": "Noun",
        "ja": "データ収集",
        "tag": "無冠詞・不可算",
        "grammar": "collection はここで「収集という行為」の不可算用法→無冠詞。"
      },
      "government surveillance": {
        "pos": "Noun",
        "ja": "政府による監視",
        "tag": "無冠詞・不可算",
        "grammar": "surveillance は不可算→無冠詞。government が修飾しても可算化しない。"
      },
      "human carelessness": {
        "pos": "Noun",
        "ja": "人間の不注意",
        "tag": "無冠詞・不可算",
        "grammar": "-ness 抽象名詞は不可算→無冠詞。"
      },
      "corporations": {
        "pos": "Noun",
        "ja": "企業",
        "tag": "複数形・無冠詞",
        "grammar": "企業一般を総称で指すので無冠詞の複数形。特定の会社ではない。"
      },
      "routinely": {
        "pos": "Adverb",
        "ja": "日常的に"
      },
      "collect": {
        "pos": "Verb",
        "ja": "収集する",
        "tag": "三単現なし",
        "grammar": "主語 corporations が複数なので原形(三単現の s なし)。"
      },
      "vast amounts of": {
        "pos": "Phrase",
        "ja": "膨大な量の",
        "tag": "語法",
        "grammar": "amounts of+不可算名詞=「大量の〜」。amount は不可算の量に使う(数なら number)。"
      },
      "personal data": {
        "pos": "Noun",
        "ja": "個人データ",
        "tag": "不可算扱い",
        "grammar": "data はここで集合的に不可算扱い→無冠詞。"
      },
      "search": {
        "pos": "Noun",
        "ja": "検索",
        "tag": "冠詞 a",
        "grammar": "Every online search=「あらゆるオンライン検索」。every+単数可算名詞。"
      },
      "purchase": {
        "pos": "Noun",
        "ja": "購入"
      },
      "click": {
        "pos": "Noun",
        "ja": "クリック"
      },
      "recorded": {
        "pos": "Verb",
        "ja": "記録される",
        "tag": "受動",
        "grammar": "is recorded=「記録される」。検索やクリックは記録される側なので受動態。"
      },
      "analyzed": {
        "pos": "Verb",
        "ja": "分析される",
        "tag": "受動",
        "grammar": "is recorded and analyzed と and で受動態を並列。be が共通。"
      },
      "profit": {
        "pos": "Noun",
        "ja": "利益",
        "tag": "無冠詞・不可算",
        "grammar": "for profit=「利益のために」。この成句では無冠詞不可算。"
      },
      "practice": {
        "pos": "Noun",
        "ja": "慣行、行為",
        "tag": "冠詞 the",
        "grammar": "the practice of doing=「〜するという(特定の)慣行」。of以下で限定されるので the。"
      },
      "tracking": {
        "pos": "Verb",
        "ja": "追跡すること",
        "tag": "動名詞",
        "grammar": "the practice of tracking=「追跡する慣行」。of の後ろは動名詞。"
      },
      "firms": {
        "pos": "Noun",
        "ja": "企業",
        "tag": "複数形",
        "grammar": "technology firms=「テクノロジー企業」一般を指すので複数形。"
      },
      "countless": {
        "pos": "Adjective",
        "ja": "無数の"
      },
      "eroding": {
        "pos": "Verb",
        "ja": "徐々に損なう",
        "tag": "分詞構文",
        "grammar": "eroding...=分詞構文で「そして〜を損なっている」。主節の結果を表す。"
      },
      "control": {
        "pos": "Noun",
        "ja": "支配、制御",
        "tag": "無冠詞・不可算",
        "grammar": "control over X=「Xに対する支配」。この意味では不可算、over とセット。"
      },
      "expanded": {
        "pos": "Verb",
        "ja": "拡大した",
        "tag": "過去分詞",
        "grammar": "has expanded=現在完了。過去から現在までの拡大の継続・結果を表す。"
      },
      "dramatically": {
        "pos": "Adverb",
        "ja": "劇的に"
      },
      "in the name of": {
        "pos": "Phrase",
        "ja": "〜の名のもとに",
        "grammar": "in the name of security=「安全の名のもとに」。この成句では security は無冠詞不可算。"
      },
      "security": {
        "pos": "Noun",
        "ja": "安全、治安",
        "tag": "無冠詞・不可算",
        "grammar": "security は抽象不可算→無冠詞。"
      },
      "facial recognition": {
        "pos": "Noun",
        "ja": "顔認証",
        "tag": "無冠詞・不可算",
        "grammar": "recognition は不可算→無冠詞。facial が修飾しても可算化しない。"
      },
      "commonplace": {
        "pos": "Adjective",
        "ja": "ありふれた、よくある",
        "tag": "語法",
        "grammar": "become commonplace=「ありふれたものになる」。叙述用法の形容詞で名詞commonplaceとは別。"
      },
      "consequently": {
        "pos": "Adverb",
        "ja": "その結果",
        "tag": "接続副詞",
        "grammar": "Consequently=「その結果」。前文を受けて結論を導く文頭の接続副詞、カンマを伴う。"
      },
      "observed": {
        "pos": "Verb",
        "ja": "監視される",
        "tag": "受動",
        "grammar": "are observed=「監視される」。市民は見られる側なので受動態。"
      },
      "boundary": {
        "pos": "Noun",
        "ja": "境界",
        "tag": "冠詞 the",
        "grammar": "the boundary between A and B=「AとBの間の(特定の)境界」。between以下で限定され the。"
      },
      "intrusion": {
        "pos": "Noun",
        "ja": "侵害、立ち入り",
        "tag": "無冠詞・不可算",
        "grammar": "ここでは抽象概念の不可算→無冠詞。safety と対比。"
      },
      "blurred": {
        "pos": "Adjective",
        "ja": "曖昧な、ぼやけた",
        "tag": "語法",
        "grammar": "grows blurred=「ますます曖昧になる」。grow+形容詞で状態変化。"
      },
      "practical standpoint": {
        "pos": "Noun",
        "ja": "実際的な観点",
        "tag": "冠詞 a",
        "grammar": "from a practical standpoint=「実際的な観点から」。standpoint は可算、一つの観点なので a。"
      },
      "ordinary": {
        "pos": "Adjective",
        "ja": "普通の、一般の"
      },
      "undermine": {
        "pos": "Verb",
        "ja": "損なう、台無しにする"
      },
      "willingly": {
        "pos": "Adverb",
        "ja": "自ら進んで"
      },
      "share": {
        "pos": "Verb",
        "ja": "共有する、公開する"
      },
      "details": {
        "pos": "Noun",
        "ja": "詳細情報",
        "tag": "複数形",
        "grammar": "personal details=「個人の詳細情報」。複数の項目を指すので複数形が普通。"
      },
      "social media": {
        "pos": "Noun",
        "ja": "ソーシャルメディア",
        "tag": "無冠詞・不可算",
        "grammar": "media は集合的に不可算扱い→無冠詞。"
      },
      "considering": {
        "pos": "Verb",
        "ja": "考慮すること",
        "tag": "動名詞",
        "grammar": "without considering=「〜を考慮せずに」。前置詞 without の後ろは動名詞。"
      },
      "autonomy": {
        "pos": "Noun",
        "ja": "自律、自主性",
        "tag": "無冠詞・不可算",
        "grammar": "personal autonomy は抽象不可算→無冠詞。"
      },
      "surrender": {
        "pos": "Verb",
        "ja": "明け渡す、手放す"
      },
      "admittedly": {
        "pos": "Adverb",
        "ja": "確かに（〜だが）",
        "tag": "譲歩",
        "grammar": "Admittedly=「確かに〜だ(が)」。反対意見を一旦認める譲歩の文頭副詞。次に However が来やすい。"
      },
      "evolves": {
        "pos": "Verb",
        "ja": "進化する",
        "tag": "三単現",
        "grammar": "主語 technology が不可算単数扱いなので三単現の s。"
      },
      "regulation": {
        "pos": "Noun",
        "ja": "規制",
        "tag": "無冠詞・不可算",
        "grammar": "ここでは規制という活動一般を指す不可算→無冠詞。具体的な規則なら可算 a regulation。"
      },
      "keep pace": {
        "pos": "Phrase",
        "ja": "遅れずについていく",
        "tag": "句動詞",
        "grammar": "keep pace (with)=「(〜に)遅れずついていく」。pace は無冠詞の成句。"
      },
      "relentless": {
        "pos": "Adjective",
        "ja": "容赦ない、絶え間ない"
      },
      "pervasive": {
        "pos": "Adjective",
        "ja": "広く行き渡った"
      },
      "widespread": {
        "pos": "Adjective",
        "ja": "広範囲の"
      },
      "interconnected": {
        "pos": "Adjective",
        "ja": "相互に結びついた"
      },
      "convinced": {
        "pos": "Adjective",
        "ja": "確信して",
        "tag": "語法",
        "grammar": "be convinced that=「〜だと確信している」。受動形の形容詞、that節を取る。"
      }
    },
    "vocab": [
      {
        "word": "erode",
        "pos": "Verb",
        "ipa": "/ɪˈroʊd/",
        "def": "to gradually destroy something or make it weaker over time",
        "example": "Tracking users across websites is eroding individuals' control over their own information."
      },
      {
        "word": "surveillance",
        "pos": "Noun",
        "ipa": "/sərˈveɪləns/",
        "def": "the careful watching of a person or place, especially by authorities",
        "example": "Government surveillance has expanded dramatically in the name of security."
      },
      {
        "word": "facial recognition",
        "pos": "Noun",
        "ipa": "/ˈfeɪʃəl ˌrekəɡˈnɪʃən/",
        "def": "technology that can identify a person from a digital image of their face",
        "example": "Cameras, facial recognition, and communication monitoring have become commonplace."
      },
      {
        "word": "commonplace",
        "pos": "Adjective",
        "ipa": "/ˈkɑːmənpleɪs/",
        "def": "happening or existing so often that it is not unusual",
        "example": "Such monitoring has become commonplace in many countries."
      },
      {
        "word": "intrusion",
        "pos": "Noun",
        "ipa": "/ɪnˈtruːʒən/",
        "def": "the act of entering a place or affecting a situation where you are not wanted",
        "example": "The boundary between safety and intrusion grows increasingly blurred."
      },
      {
        "word": "undermine",
        "pos": "Verb",
        "ipa": "/ˌʌndərˈmaɪn/",
        "def": "to gradually weaken or damage something",
        "example": "Ordinary people often undermine their own privacy."
      },
      {
        "word": "autonomy",
        "pos": "Noun",
        "ipa": "/ɔːˈtɑːnəmi/",
        "def": "the ability or freedom to govern oneself and make one's own decisions",
        "example": "They surrender personal autonomy without considering it."
      },
      {
        "word": "relentless",
        "pos": "Adjective",
        "ipa": "/rɪˈlentləs/",
        "def": "continuing without becoming weaker or stopping",
        "example": "Given relentless data collection, true privacy has become nearly impossible."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "no longer による否定",
        "example": "In my opinion, individual privacy can no longer be fully protected in the modern world.",
        "highlight": "can no longer be fully protected",
        "explain": "no longer=「もはや〜ない」。助動詞 can と本動詞の間に置く。受動態 be protected と組み合わせて「もはや完全には守られ得ない」。privacy は守られる側なので受動。"
      },
      {
        "no": 2,
        "title": "by + 動名詞（手段）",
        "example": "I will explain my position by examining data collection, government surveillance, and human carelessness.",
        "highlight": "by examining data collection, government surveillance, and human carelessness",
        "explain": "前置詞 by の後ろは動名詞 -ing。「〜を検討することによって」と手段・方法を表す。examining の目的語に3つの不可算名詞を並列し、いずれも無冠詞である点に注目。"
      },
      {
        "no": 3,
        "title": "譲歩の Admittedly → However",
        "example": "Admittedly, stronger laws can offer some protection. However, technology evolves far faster than regulation can keep pace.",
        "highlight": "Admittedly, stronger laws can offer some protection. However,",
        "explain": "Admittedly で反対意見を一度認め、However で自分の主張に戻す譲歩の型。比較級 faster than で「規制が追いつくより速く技術が進化する」と差を示す。説得力を高める英検1級の定石。"
      }
    ]
  },
  "15": {
    "glossary": {
      "international conflicts": {
        "pos": "Noun",
        "ja": "国際紛争",
        "tag": "複数形",
        "grammar": "conflict はここで「紛争」の可算名詞。複数の紛争一般を指すので複数形。"
      },
      "arise": {
        "pos": "Verb",
        "ja": "生じる、起こる",
        "tag": "三単現なし",
        "grammar": "主語 conflicts が複数なので原形。arise は自動詞で「(問題などが)生じる」。"
      },
      "governments": {
        "pos": "Noun",
        "ja": "政府",
        "tag": "複数形・無冠詞",
        "grammar": "各国政府一般を総称で指すので無冠詞の複数形。"
      },
      "frequently": {
        "pos": "Adverb",
        "ja": "しばしば、頻繁に"
      },
      "turn to": {
        "pos": "Verb",
        "ja": "〜に頼る",
        "tag": "句動詞",
        "grammar": "turn to A=「Aに頼る、Aに目を向ける」。to とセットの句動詞、前置詞を落とさない。"
      },
      "economic sanctions": {
        "pos": "Noun",
        "ja": "経済制裁",
        "tag": "複数形",
        "grammar": "sanction は「制裁」の意味では通例複数形 sanctions で使う。複数の措置の集合。"
      },
      "alternative": {
        "pos": "Noun",
        "ja": "代替手段",
        "tag": "冠詞 an",
        "grammar": "as an alternative to=「〜の代替として」。一つの選択肢を指す可算名詞、母音前なので an。"
      },
      "military action": {
        "pos": "Noun",
        "ja": "軍事行動",
        "tag": "無冠詞・不可算",
        "grammar": "action はここで抽象的な「行動」の不可算用法→無冠詞。military が修飾しても可算化しない。"
      },
      "genuinely": {
        "pos": "Adverb",
        "ja": "本当に、真に"
      },
      "useful": {
        "pos": "Adjective",
        "ja": "有用な"
      },
      "foreign-policy tool": {
        "pos": "Noun",
        "ja": "外交政策の手段",
        "tag": "冠詞 a",
        "grammar": "a foreign-policy tool=「一つの外交手段」。tool は可算、複合形容詞で限定された単数なので a。"
      },
      "justify": {
        "pos": "Verb",
        "ja": "正当化する、根拠づける"
      },
      "considering": {
        "pos": "Verb",
        "ja": "考慮すること",
        "tag": "動名詞",
        "grammar": "by considering=「〜を考慮することで」。前置詞 by の後ろは動名詞。"
      },
      "impact": {
        "pos": "Noun",
        "ja": "影響",
        "tag": "所有格",
        "grammar": "their impact on=「〜への(制裁の)影響」。所有格 their が付くので冠詞は不要。impact on X が定型。"
      },
      "ordinary citizens": {
        "pos": "Noun",
        "ja": "一般市民",
        "tag": "複数形",
        "grammar": "一般市民全体を指すので無冠詞の複数形。"
      },
      "limited": {
        "pos": "Adjective",
        "ja": "限られた"
      },
      "effectiveness": {
        "pos": "Noun",
        "ja": "有効性",
        "tag": "無冠詞・不可算",
        "grammar": "-ness 抽象名詞は不可算→無冠詞。their が付くと their (limited) effectiveness。"
      },
      "unintended consequences": {
        "pos": "Noun",
        "ja": "意図せぬ結果",
        "tag": "複数形",
        "grammar": "consequence は可算。複数の副作用を指すので複数形 consequences。"
      },
      "tend to": {
        "pos": "Verb",
        "ja": "〜しがちである",
        "tag": "語法",
        "grammar": "tend to do=「〜する傾向がある」。to不定詞を取る。"
      },
      "harm": {
        "pos": "Verb",
        "ja": "害する、傷つける"
      },
      "innocent civilians": {
        "pos": "Noun",
        "ja": "罪のない民間人",
        "tag": "複数形",
        "grammar": "civilian は可算。一般の民間人を指すので複数形。"
      },
      "leaders": {
        "pos": "Noun",
        "ja": "指導者",
        "tag": "複数形"
      },
      "responsible": {
        "pos": "Adjective",
        "ja": "責任のある",
        "tag": "後置修飾",
        "grammar": "the leaders responsible=「責任のある指導者たち」。responsible が名詞を後ろから修飾(responsible for...の省略)。"
      },
      "restrictions": {
        "pos": "Noun",
        "ja": "制限",
        "tag": "複数形",
        "grammar": "restriction は可算。複数の規制を指すので複数形。restrictions on X=「Xに対する制限」。"
      },
      "trade": {
        "pos": "Noun",
        "ja": "貿易",
        "tag": "無冠詞・不可算",
        "grammar": "trade は不可算→無冠詞。"
      },
      "shortages": {
        "pos": "Noun",
        "ja": "不足",
        "tag": "複数形",
        "grammar": "shortages of food and medicine。複数項目の不足を指すので複数形。shortage of X が定型。"
      },
      "medicine": {
        "pos": "Noun",
        "ja": "薬、医薬品",
        "tag": "無冠詞・不可算",
        "grammar": "ここでは「医薬品(全般)」の不可算用法→無冠詞。可算なら a medicine=ある薬。"
      },
      "vulnerable": {
        "pos": "Adjective",
        "ja": "弱い立場の、傷つきやすい"
      },
      "suffer": {
        "pos": "Verb",
        "ja": "苦しむ"
      },
      "prolonged": {
        "pos": "Adjective",
        "ja": "長引く、長期化した"
      },
      "poverty": {
        "pos": "Noun",
        "ja": "貧困",
        "tag": "無冠詞・不可算",
        "grammar": "poverty は抽象不可算→無冠詞。"
      },
      "deepened": {
        "pos": "Verb",
        "ja": "深まった",
        "tag": "過去形",
        "grammar": "poverty deepened=「貧困が深まった」。deepen は自動詞でも使える(深くなる)。例示の過去の事実なので過去形。"
      },
      "ruling elites": {
        "pos": "Noun",
        "ja": "支配層",
        "tag": "複数形",
        "grammar": "elite は可算。支配層の集団を指すので複数形。"
      },
      "unaffected": {
        "pos": "Adjective",
        "ja": "影響を受けない",
        "tag": "語法",
        "grammar": "remain unaffected=「影響を受けないままだ」。un-+過去分詞の形容詞。"
      },
      "rarely": {
        "pos": "Adverb",
        "ja": "めったに〜ない",
        "tag": "準否定",
        "grammar": "rarely=「めったに〜ない」。それ自体が否定の意味なので not は不要。"
      },
      "achieve": {
        "pos": "Verb",
        "ja": "達成する"
      },
      "intended": {
        "pos": "Adjective",
        "ja": "意図された",
        "tag": "過去分詞",
        "grammar": "intended goals=「意図された目標」。過去分詞が名詞を前から修飾。"
      },
      "targeted": {
        "pos": "Adjective",
        "ja": "標的にされた",
        "tag": "過去分詞",
        "grammar": "targeted regimes=「標的にされた政権」。過去分詞の前置修飾。"
      },
      "regimes": {
        "pos": "Noun",
        "ja": "政権",
        "tag": "複数形"
      },
      "alternative trading partners": {
        "pos": "Noun",
        "ja": "代替の貿易相手",
        "tag": "複数形",
        "grammar": "partner は可算。複数の相手を指すので複数形。"
      },
      "endure": {
        "pos": "Verb",
        "ja": "耐える、持ちこたえる"
      },
      "pressure": {
        "pos": "Noun",
        "ja": "圧力",
        "tag": "無冠詞・不可算",
        "grammar": "pressure は通例不可算→無冠詞。the pressure で「その(制裁の)圧力」と特定。"
      },
      "desired": {
        "pos": "Adjective",
        "ja": "望ましい、求められる",
        "tag": "過去分詞",
        "grammar": "the desired change=「望まれる変化」。過去分詞の前置修飾。"
      },
      "produce": {
        "pos": "Verb",
        "ja": "生み出す"
      },
      "push": {
        "pos": "Verb",
        "ja": "追いやる、押しやる",
        "tag": "語法",
        "grammar": "push A toward B=「AをBの方へ追いやる」。toward とセット。"
      },
      "isolated": {
        "pos": "Adjective",
        "ja": "孤立した",
        "tag": "過去分詞",
        "grammar": "isolated nations=「孤立した国々」。過去分詞の前置修飾。"
      },
      "rival powers": {
        "pos": "Noun",
        "ja": "対立する大国",
        "tag": "複数形",
        "grammar": "power はここで「大国」の可算用法。複数の国を指すので複数形。"
      },
      "thereby": {
        "pos": "Adverb",
        "ja": "それによって",
        "tag": "分詞構文",
        "grammar": "thereby strengthening=「それによって〜を強めて」。thereby+動名詞で結果を表す。"
      },
      "strengthening": {
        "pos": "Verb",
        "ja": "強めること",
        "tag": "動名詞",
        "grammar": "thereby の後ろは動名詞 -ing。"
      },
      "hostile alliances": {
        "pos": "Noun",
        "ja": "敵対的な同盟",
        "tag": "複数形"
      },
      "admittedly": {
        "pos": "Adverb",
        "ja": "確かに（〜だが）",
        "tag": "譲歩",
        "grammar": "Admittedly=反対意見を一旦認める文頭の譲歩副詞。次に However が来る型。"
      },
      "destructive": {
        "pos": "Adjective",
        "ja": "破壊的な"
      },
      "ineffective": {
        "pos": "Adjective",
        "ja": "効果のない"
      },
      "measures": {
        "pos": "Noun",
        "ja": "措置、手段",
        "tag": "複数形",
        "grammar": "measure は「措置」の意味では通例複数形 measures。"
      },
      "punish": {
        "pos": "Verb",
        "ja": "罰する"
      },
      "innocent": {
        "pos": "Noun",
        "ja": "無実の人々",
        "tag": "冠詞 the",
        "grammar": "the innocent=「罪のない人々」。the+形容詞で複数の人々を表す。"
      },
      "flawed": {
        "pos": "Adjective",
        "ja": "欠陥のある",
        "tag": "過去分詞",
        "grammar": "a deeply flawed tool=「ひどく欠陥のある手段」。過去分詞の形容詞用法。"
      },
      "side effects": {
        "pos": "Noun",
        "ja": "副作用",
        "tag": "複数形",
        "grammar": "effect は可算。複数の副作用を指すので複数形。"
      },
      "seldom": {
        "pos": "Adverb",
        "ja": "めったに〜ない",
        "tag": "準否定",
        "grammar": "seldom succeed=「めったに成功しない」。それ自体が否定なので not不要。"
      },
      "regard": {
        "pos": "Verb",
        "ja": "みなす",
        "tag": "語法 SVOC",
        "grammar": "regard A as B=「AをBとみなす」。as が必須、to不定詞は取らない。"
      },
      "instrument": {
        "pos": "Noun",
        "ja": "手段、道具",
        "tag": "冠詞 an",
        "grammar": "an instrument of foreign policy=「外交の(一つの)手段」。可算、母音前で an。"
      }
    },
    "vocab": [
      {
        "word": "sanction",
        "pos": "Noun",
        "ipa": "/ˈsæŋkʃən/",
        "def": "an official order limiting trade or contact with a country, used to make it change its behavior",
        "example": "Governments frequently turn to economic sanctions as an alternative to military action."
      },
      {
        "word": "civilian",
        "pos": "Noun",
        "ipa": "/səˈvɪljən/",
        "def": "a person who is not a member of the armed forces or police",
        "example": "Sanctions tend to harm innocent civilians rather than the leaders responsible."
      },
      {
        "word": "regime",
        "pos": "Noun",
        "ipa": "/reɪˈʒiːm/",
        "def": "a government, especially an authoritarian one",
        "example": "Targeted regimes frequently find alternative trading partners."
      },
      {
        "word": "endure",
        "pos": "Verb",
        "ipa": "/ɪnˈdʊr/",
        "def": "to suffer something difficult or unpleasant in a patient way over time",
        "example": "They endure the pressure for years."
      },
      {
        "word": "vulnerable",
        "pos": "Adjective",
        "ipa": "/ˈvʌlnərəbəl/",
        "def": "able to be easily harmed or hurt physically or emotionally",
        "example": "The most vulnerable people suffer the most."
      },
      {
        "word": "prolonged",
        "pos": "Adjective",
        "ipa": "/prəˈlɔːŋd/",
        "def": "continuing for a long time, longer than usual or expected",
        "example": "A case in point is the prolonged sanctions on certain nations."
      },
      {
        "word": "hostile",
        "pos": "Adjective",
        "ipa": "/ˈhɑːstəl/",
        "def": "unfriendly and ready to argue or fight",
        "example": "They may push isolated nations toward rival powers, strengthening hostile alliances."
      },
      {
        "word": "flawed",
        "pos": "Adjective",
        "ipa": "/flɔːd/",
        "def": "having a fault, mistake, or weakness",
        "example": "Economic sanctions are a deeply flawed tool."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "A rather than B（対比）",
        "example": "Sanctions tend to harm innocent civilians rather than the leaders responsible.",
        "highlight": "harm innocent civilians rather than the leaders responsible",
        "explain": "A rather than B=「BではなくむしろA」。前後は同じ品詞(ここでは名詞句)で並べる。tend to do=「〜しがち」の to不定詞も押さえる。the leaders responsible は responsible が後置修飾。"
      },
      {
        "no": 2,
        "title": "thereby + 動名詞（結果）",
        "example": "They may push isolated nations toward rival powers, thereby strengthening hostile alliances.",
        "highlight": "thereby strengthening hostile alliances",
        "explain": "thereby+動名詞=「それによって〜することになる」。主節の行為がもたらす結果を分詞でつなぐ硬めの書き言葉。push A toward B=「AをBへ追いやる」の語法も重要。"
      },
      {
        "no": 3,
        "title": "because による三点列挙",
        "example": "Because they harm civilians, seldom succeed, and create dangerous side effects, economic sanctions are a deeply flawed tool.",
        "highlight": "they harm civilians, seldom succeed, and create dangerous side effects",
        "explain": "結論部で because節に動詞句を3つ並列(harm / seldom succeed / create)し、本論の3理由を一気に回収する型。seldom は準否定の副詞で not を使わずに「めったに成功しない」を表す。"
      }
    ]
  },
  "16": {
    "glossary": {
      "argue": {
        "pos": "Verb",
        "ja": "主張する",
        "tag": "語法",
        "grammar": "Some argue that=「〜と主張する人もいる」。argue that節で意見を導く。"
      },
      "steady": {
        "pos": "Adjective",
        "ja": "着実な、絶え間ない"
      },
      "rise": {
        "pos": "Noun",
        "ja": "上昇、増加",
        "tag": "冠詞 the",
        "grammar": "the steady rise in=「〜における着実な増加」。in以下で限定されるので the。rise in X が定型。"
      },
      "population": {
        "pos": "Noun",
        "ja": "人口",
        "tag": "所有格",
        "grammar": "the world's population=「世界の人口」。所有格で特定されるので冠詞の役割を所有格が担う。"
      },
      "endangers": {
        "pos": "Verb",
        "ja": "危険にさらす",
        "tag": "三単現",
        "grammar": "主語 the rise が単数なので三単現の s。endanger は他動詞。"
      },
      "species": {
        "pos": "Noun",
        "ja": "種",
        "tag": "単複同形",
        "grammar": "species は単複同形。our species=「我々の種(=人類)」で単数扱い。"
      },
      "strongly": {
        "pos": "Adverb",
        "ja": "強く"
      },
      "overpopulation": {
        "pos": "Noun",
        "ja": "人口過剰",
        "tag": "無冠詞・不可算",
        "grammar": "over-+不可算 population=不可算→無冠詞。global が修飾しても可算化しない。"
      },
      "threat": {
        "pos": "Noun",
        "ja": "脅威",
        "tag": "冠詞 a",
        "grammar": "a serious threat to=「〜への深刻な(一つの)脅威」。threat は可算、threat to X が定型。"
      },
      "humankind": {
        "pos": "Noun",
        "ja": "人類",
        "tag": "無冠詞・不可算",
        "grammar": "humankind は集合的不可算→無冠詞。mankind/humanity も同様。"
      },
      "defend": {
        "pos": "Verb",
        "ja": "擁護する、弁護する",
        "tag": "語法",
        "grammar": "defend this position=「この立場を擁護する」。意見・主張を守る意味。"
      },
      "position": {
        "pos": "Noun",
        "ja": "立場、見解",
        "tag": "冠詞 this",
        "grammar": "this position=「この立場」。指示詞 this が付くので冠詞不要。"
      },
      "focusing on": {
        "pos": "Verb",
        "ja": "焦点を当てる",
        "tag": "句動詞・動名詞",
        "grammar": "by focusing on=「〜に焦点を当てることで」。focus on の句動詞、前置詞 by の後で動名詞。"
      },
      "resource depletion": {
        "pos": "Noun",
        "ja": "資源の枯渇",
        "tag": "無冠詞・不可算",
        "grammar": "depletion は不可算→無冠詞。resource が複合名詞の修飾語。"
      },
      "environmental destruction": {
        "pos": "Noun",
        "ja": "環境破壊",
        "tag": "無冠詞・不可算",
        "grammar": "destruction は不可算→無冠詞。"
      },
      "food insecurity": {
        "pos": "Noun",
        "ja": "食料不安、食料不足",
        "tag": "無冠詞・不可算",
        "grammar": "insecurity は抽象不可算→無冠詞。"
      },
      "growing": {
        "pos": "Adjective",
        "ja": "増加する、増え続ける",
        "tag": "現在分詞",
        "grammar": "a growing population=「増え続ける人口」。現在分詞が能動的に名詞を修飾。"
      },
      "places": {
        "pos": "Verb",
        "ja": "置く、かける",
        "tag": "三単現",
        "grammar": "places...strain on=「〜に負担をかける」。主語 population が単数なので三単現 s。place strain on X が定型。"
      },
      "enormous": {
        "pos": "Adjective",
        "ja": "膨大な、巨大な"
      },
      "strain": {
        "pos": "Noun",
        "ja": "負担、圧迫",
        "tag": "無冠詞・不可算",
        "grammar": "place strain on X=「Xに負担をかける」。この成句では無冠詞不可算。"
      },
      "limited": {
        "pos": "Adjective",
        "ja": "限られた",
        "tag": "過去分詞",
        "grammar": "limited natural resources=「限られた天然資源」。過去分詞の前置修飾。"
      },
      "natural resources": {
        "pos": "Noun",
        "ja": "天然資源",
        "tag": "複数形",
        "grammar": "resource は「資源」の意味では通例複数形 resources。"
      },
      "fossil fuels": {
        "pos": "Noun",
        "ja": "化石燃料",
        "tag": "複数形"
      },
      "arable land": {
        "pos": "Noun",
        "ja": "耕作可能な土地",
        "tag": "無冠詞・不可算",
        "grammar": "land は「土地」の意味では不可算→無冠詞。a land は使わない。"
      },
      "consumed": {
        "pos": "Verb",
        "ja": "消費される",
        "tag": "受動",
        "grammar": "are being consumed=「消費されつつある」。資源は消費される側なので受動、進行形で「今まさに」。"
      },
      "replenished": {
        "pos": "Verb",
        "ja": "補充される",
        "tag": "受動",
        "grammar": "than they can be replenished=「補充され得るよりも(速く)」。受動態の比較。"
      },
      "consequently": {
        "pos": "Adverb",
        "ja": "その結果",
        "tag": "接続副詞",
        "grammar": "Consequently=「その結果」。前文を受けて結論を導く文頭の接続副詞。"
      },
      "future generations": {
        "pos": "Noun",
        "ja": "将来の世代",
        "tag": "複数形・無冠詞",
        "grammar": "将来の世代一般を総称で指すので無冠詞の複数形。"
      },
      "inherit": {
        "pos": "Verb",
        "ja": "受け継ぐ"
      },
      "stripped of": {
        "pos": "Verb",
        "ja": "〜を奪われた",
        "tag": "過去分詞・語法",
        "grammar": "a planet stripped of X=「Xを奪われた惑星」。strip A of B の受動の過去分詞が後置修飾。of を落とさない。"
      },
      "essential": {
        "pos": "Adjective",
        "ja": "不可欠な",
        "tag": "語法",
        "grammar": "essential for X=「Xに不可欠な」。for とセット。resources essential for survival は形容詞句の後置修飾。"
      },
      "survival": {
        "pos": "Noun",
        "ja": "生存",
        "tag": "無冠詞・不可算",
        "grammar": "survival は抽象不可算→無冠詞。"
      },
      "accelerates": {
        "pos": "Verb",
        "ja": "加速させる",
        "tag": "三単現",
        "grammar": "主語 overpopulation が不可算単数なので三単現 s。他動詞で目的語を取る。"
      },
      "pollution": {
        "pos": "Noun",
        "ja": "汚染",
        "tag": "無冠詞・不可算",
        "grammar": "pollution は不可算→無冠詞。more pollution で「より多くの汚染」。"
      },
      "deforestation": {
        "pos": "Noun",
        "ja": "森林破壊",
        "tag": "無冠詞・不可算",
        "grammar": "-tion 抽象名詞は不可算→無冠詞。"
      },
      "greenhouse gas emissions": {
        "pos": "Noun",
        "ja": "温室効果ガス排出",
        "tag": "複数形",
        "grammar": "emission は「排出(物)」の意味で通例複数形 emissions。"
      },
      "urban expansion": {
        "pos": "Noun",
        "ja": "都市の拡大",
        "tag": "無冠詞・不可算",
        "grammar": "expansion は不可算→無冠詞。urban が修飾しても可算化しない。"
      },
      "developing regions": {
        "pos": "Noun",
        "ja": "発展途上の地域",
        "tag": "複数形・現在分詞",
        "grammar": "developing=「発展途上の」現在分詞の前置修飾。複数の地域で複数形。"
      },
      "habitats": {
        "pos": "Noun",
        "ja": "生息地",
        "tag": "複数形"
      },
      "destroyed": {
        "pos": "Verb",
        "ja": "破壊される",
        "tag": "受動",
        "grammar": "are destroyed=「破壊される」。生息地は破壊される側なので受動態。"
      },
      "accommodate": {
        "pos": "Verb",
        "ja": "収容する、対応する"
      },
      "feeding": {
        "pos": "Verb",
        "ja": "養うこと",
        "tag": "動名詞",
        "grammar": "feeding billions...poses=「数十億人を養うことは〜を突きつける」。動名詞句が主語、動詞は単数 poses。"
      },
      "billions of": {
        "pos": "Phrase",
        "ja": "数十億の",
        "tag": "複数形",
        "grammar": "billions of+複数名詞=「数十億の〜」。漠然と大量を表すとき billion は複数形+of。"
      },
      "poses": {
        "pos": "Verb",
        "ja": "(問題を)引き起こす、突きつける",
        "tag": "三単現",
        "grammar": "pose a challenge=「課題を突きつける」。動名詞主語は単数扱いなので三単現 s。"
      },
      "daunting": {
        "pos": "Adjective",
        "ja": "困難な、ひるませるような"
      },
      "challenge": {
        "pos": "Noun",
        "ja": "課題、難題",
        "tag": "冠詞 a",
        "grammar": "a daunting challenge=「困難な(一つの)課題」。challenge は可算、単数で a。"
      },
      "agricultural technology": {
        "pos": "Noun",
        "ja": "農業技術",
        "tag": "無冠詞・不可算",
        "grammar": "technology は不可算→無冠詞。"
      },
      "advanced": {
        "pos": "Verb",
        "ja": "進歩した",
        "tag": "現在完了",
        "grammar": "has advanced=現在完了。過去から現在までの進歩の結果を表す。"
      },
      "expand": {
        "pos": "Verb",
        "ja": "拡大する"
      },
      "indefinitely": {
        "pos": "Adverb",
        "ja": "無限に、際限なく"
      },
      "declining": {
        "pos": "Adjective",
        "ja": "低下する、減少する",
        "tag": "現在分詞",
        "grammar": "declining birthrates=「低下する出生率」。現在分詞の前置修飾。"
      },
      "birthrates": {
        "pos": "Noun",
        "ja": "出生率",
        "tag": "複数形",
        "grammar": "複数国の出生率を指すので複数形。"
      },
      "overall": {
        "pos": "Adjective",
        "ja": "全体的な"
      },
      "trend": {
        "pos": "Noun",
        "ja": "傾向",
        "tag": "冠詞 the",
        "grammar": "the overall trend=「全体的な(その)傾向」。文脈で特定される唯一の傾向なので the。"
      },
      "alarmingly": {
        "pos": "Adverb",
        "ja": "憂慮すべきほど",
        "tag": "語法",
        "grammar": "alarmingly upward=「憂慮すべきほど上向き」。副詞が形容詞 upward を修飾。"
      },
      "upward": {
        "pos": "Adjective",
        "ja": "上向きの"
      },
      "drains": {
        "pos": "Verb",
        "ja": "消耗させる、枯渇させる",
        "tag": "三単現",
        "grammar": "主語 it(=overpopulation)が単数なので三単現 s。drain=資源を使い尽くす。"
      },
      "devastates": {
        "pos": "Verb",
        "ja": "荒廃させる",
        "tag": "三単現",
        "grammar": "主語 it が単数なので三単現 s。"
      },
      "threatens": {
        "pos": "Verb",
        "ja": "脅かす",
        "tag": "三単現",
        "grammar": "drains / devastates / threatens と三単現を3つ並列。同じ主語 it を受ける。"
      },
      "food supplies": {
        "pos": "Noun",
        "ja": "食料供給",
        "tag": "複数形",
        "grammar": "supply は「供給(される物)」の意味で複数形 supplies。"
      },
      "represents": {
        "pos": "Verb",
        "ja": "〜である、表す",
        "tag": "三単現",
        "grammar": "主語 overpopulation が単数なので三単現 s。represent a danger=「危険である」。"
      },
      "genuine": {
        "pos": "Adjective",
        "ja": "本物の、真の"
      },
      "convinced": {
        "pos": "Adjective",
        "ja": "確信して",
        "tag": "語法",
        "grammar": "be firmly convinced that=「〜だと固く確信している」。受動形容詞、that節を取る。"
      }
    },
    "vocab": [
      {
        "word": "overpopulation",
        "pos": "Noun",
        "ipa": "/ˌoʊvərˌpɑːpjəˈleɪʃən/",
        "def": "the situation in which there are too many people living in a particular area",
        "example": "Global overpopulation is a serious threat to humankind."
      },
      {
        "word": "deplete",
        "pos": "Verb",
        "ipa": "/dɪˈpliːt/",
        "def": "to reduce the amount of something, especially a resource, until little is left",
        "example": "It drains resources faster than they can be replenished."
      },
      {
        "word": "replenish",
        "pos": "Verb",
        "ipa": "/rɪˈplenɪʃ/",
        "def": "to fill something up again or restore it to a previous level",
        "example": "Resources are being consumed faster than they can be replenished."
      },
      {
        "word": "arable",
        "pos": "Adjective",
        "ipa": "/ˈærəbəl/",
        "def": "suitable for growing crops",
        "example": "Water, fossil fuels, and arable land are being consumed rapidly."
      },
      {
        "word": "deforestation",
        "pos": "Noun",
        "ipa": "/diːˌfɔːrɪˈsteɪʃən/",
        "def": "the cutting down of forests over a large area",
        "example": "More people inevitably means more pollution, deforestation, and emissions."
      },
      {
        "word": "daunting",
        "pos": "Adjective",
        "ipa": "/ˈdɔːntɪŋ/",
        "def": "seeming difficult to deal with and making you feel worried",
        "example": "Feeding billions of additional people poses a daunting challenge."
      },
      {
        "word": "devastate",
        "pos": "Verb",
        "ipa": "/ˈdevəsteɪt/",
        "def": "to destroy something or damage it very badly",
        "example": "Overpopulation devastates the environment."
      },
      {
        "word": "inherit",
        "pos": "Verb",
        "ipa": "/ɪnˈherɪt/",
        "def": "to receive something from those who came before you",
        "example": "Future generations may inherit a planet stripped of essential resources."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "比較級 faster than + 受動態",
        "example": "Water, fossil fuels, and arable land are being consumed faster than they can be replenished.",
        "highlight": "are being consumed faster than they can be replenished",
        "explain": "現在進行受動態 are being consumed=「今まさに消費されつつある」。faster than they can be replenished で「補充され得る速度より速く」と消費と補充の速度差を示す。資源・環境テーマの定番表現。"
      },
      {
        "no": 2,
        "title": "動名詞主語 + 単数動詞",
        "example": "From a long-term perspective, feeding billions of additional people poses a daunting challenge.",
        "highlight": "feeding billions of additional people poses a daunting challenge",
        "explain": "動名詞句 feeding...people が主語。動名詞主語は単数扱いなので動詞は poses(三単現)。pose a challenge=「課題を突きつける」のコロケーションも頻出。"
      },
      {
        "no": 3,
        "title": "because による三動詞列挙の結論",
        "example": "Because it drains resources, devastates the environment, and threatens food supplies, overpopulation represents a genuine danger.",
        "highlight": "it drains resources, devastates the environment, and threatens food supplies",
        "explain": "結論部で because節に三単現の動詞を3つ並列(drains / devastates / threatens)し、本論の3理由を一文で回収する型。主語 it が単数なので全動詞に s が付く点が一致のポイント。"
      }
    ]
  },
  "17": {
    "glossary": {
      "ongoing": {
        "pos": "Adjective",
        "ja": "進行中の",
        "tag": "冠詞 the"
      },
      "debate": {
        "pos": "Noun",
        "ja": "議論",
        "tag": "不可算",
        "grammar": "debate=「議論」は不可算。much debate, ongoing debate のように a を付けず使うのが定番。a debate なら個別の討論会の意味になる。"
      },
      "effort": {
        "pos": "Noun",
        "ja": "労力、努力",
        "tag": "不可算",
        "grammar": "how much effort で量を問う形。effort は努力一般を指すとき不可算。an effort なら「一つの試み」と可算化する。"
      },
      "devote": {
        "pos": "Verb",
        "ja": "(時間・労力を)注ぐ",
        "tag": "語法 SVO",
        "grammar": "devote A to B=AをBに捧げる。to は前置詞なので後ろは名詞か動名詞。"
      },
      "neighbors": {
        "pos": "Noun",
        "ja": "近隣諸国、隣人",
        "tag": "複数形",
        "grammar": "複数の近隣国を指すので複数形。アメリカ綴り neighbors、英綴り neighbours。"
      },
      "improving": {
        "pos": "Verb",
        "ja": "改善すること",
        "tag": "動名詞",
        "grammar": "improving relations が主語。動名詞句が主語のとき動詞は単数扱い。"
      },
      "relations": {
        "pos": "Noun",
        "ja": "(国家間の)関係",
        "tag": "複数形",
        "grammar": "国家間・人間間の「関係」の意味では通例複数形 relations。relation(単数)は「関連性」など別の意味になりやすい。"
      },
      "priority": {
        "pos": "Noun",
        "ja": "優先事項",
        "tag": "冠詞 a",
        "grammar": "be a priority=優先事項である。数えられる「一つの優先項目」なので a が付く。"
      },
      "examining": {
        "pos": "Verb",
        "ja": "検討すること",
        "tag": "動名詞",
        "grammar": "by examining=〜を検討することによって。前置詞 by の後ろは動名詞。"
      },
      "benefits": {
        "pos": "Noun",
        "ja": "利益、恩恵",
        "tag": "複数形"
      },
      "stability": {
        "pos": "Noun",
        "ja": "安定",
        "tag": "無冠詞・不可算",
        "grammar": "-ity 抽象名詞は不可算→無冠詞。regional stability のように形容詞で限定しても a は付かない。"
      },
      "shared": {
        "pos": "Adjective",
        "ja": "共通の",
        "tag": "過去分詞",
        "grammar": "share の過去分詞が形容詞化。shared challenges=共有された(=共通の)課題。"
      },
      "challenges": {
        "pos": "Noun",
        "ja": "課題",
        "tag": "複数形"
      },
      "stronger": {
        "pos": "Adjective",
        "ja": "より強固な",
        "tag": "比較級",
        "grammar": "strong の比較級。ここでは「(現状より)強い結び付き」を示唆して使われている。"
      },
      "ties": {
        "pos": "Noun",
        "ja": "結び付き、絆",
        "tag": "複数形",
        "grammar": "国家間の「結び付き」の意味では複数 ties が定番。strengthen ties, closer ties のように使う。"
      },
      "substantial": {
        "pos": "Adjective",
        "ja": "相当な、かなりの"
      },
      "home to": {
        "pos": "Phrase",
        "ja": "〜の本拠地である",
        "tag": "語法",
        "grammar": "be home to=〜が存在する場所である。Asia is home to fast-growing markets のように土地が主語。"
      },
      "fastest-growing": {
        "pos": "Adjective",
        "ja": "最も急成長している",
        "tag": "最上級",
        "grammar": "fast の最上級 fastest+現在分詞 growing の複合形容詞。"
      },
      "markets": {
        "pos": "Noun",
        "ja": "市場",
        "tag": "複数形"
      },
      "depends": {
        "pos": "Verb",
        "ja": "依存する",
        "tag": "三単現・句動詞",
        "grammar": "depend on=〜に頼る。主語 Japan が三人称単数なので depends。on を落とさない。"
      },
      "heavily": {
        "pos": "Adverb",
        "ja": "大きく、深く",
        "grammar": "depend heavily on=〜に大きく依存する。depend と on の間に副詞を挟む語順が自然。"
      },
      "investment": {
        "pos": "Noun",
        "ja": "投資",
        "tag": "不可算",
        "grammar": "investment は活動一般を指すとき不可算で無冠詞。an investment なら「一件の投資」と可算化。"
      },
      "cooperation": {
        "pos": "Noun",
        "ja": "協力",
        "tag": "無冠詞・不可算",
        "grammar": "-tion 抽象名詞で不可算→無冠詞。closer cooperation のように形容詞が付いても a は不要。"
      },
      "opportunities": {
        "pos": "Noun",
        "ja": "機会",
        "tag": "複数形",
        "grammar": "opportunity は可算。複数の機会なので opportunities。new opportunities for〜 の形。"
      },
      "improved": {
        "pos": "Adjective",
        "ja": "改善された",
        "tag": "過去分詞",
        "grammar": "improve の過去分詞が名詞 relations を修飾。improved relations=改善された関係。"
      },
      "pivotal": {
        "pos": "Adjective",
        "ja": "極めて重要な",
        "grammar": "play a pivotal role in〜=〜で極めて重要な役割を果たす。crucial / vital と同義の高得点語。"
      },
      "ensuring": {
        "pos": "Verb",
        "ja": "確保すること",
        "tag": "動名詞",
        "grammar": "in ensuring=〜を確保する上で。role in の後ろは動名詞。"
      },
      "regional": {
        "pos": "Adjective",
        "ja": "地域の"
      },
      "historical": {
        "pos": "Adjective",
        "ja": "歴史的な"
      },
      "tensions": {
        "pos": "Noun",
        "ja": "緊張",
        "tag": "複数形",
        "grammar": "複数の対立点・緊張状態を指すとき複数 tensions。tension(不可算)は「張り詰めた状態」一般。"
      },
      "persist": {
        "pos": "Verb",
        "ja": "根強く残る",
        "tag": "三単現なし",
        "grammar": "主語 tensions が複数なので persist(s なし)。「消えずに続く」という否定的継続のニュアンス。"
      },
      "unresolved": {
        "pos": "Adjective",
        "ja": "未解決の",
        "tag": "過去分詞",
        "grammar": "un-+resolve の過去分詞。unresolved disputes=未解決の紛争。"
      },
      "disputes": {
        "pos": "Noun",
        "ja": "紛争、対立",
        "tag": "複数形"
      },
      "escalate": {
        "pos": "Verb",
        "ja": "激化する、エスカレートする",
        "tag": "自動詞",
        "grammar": "ここでは目的語をとらない自動詞「(事態が)悪化する」。could easily escalate=容易に激化しうる。"
      },
      "sustained": {
        "pos": "Adjective",
        "ja": "持続的な",
        "tag": "過去分詞",
        "grammar": "sustain の過去分詞。sustained dialogue=持続的な対話。一過性でなく続くことを示す。"
      },
      "dialogue": {
        "pos": "Noun",
        "ja": "対話",
        "tag": "不可算",
        "grammar": "外交的「対話」の意味では通例不可算で無冠詞。a dialogue なら一回の対話・作品中の会話。"
      },
      "reduces": {
        "pos": "Verb",
        "ja": "減らす",
        "tag": "三単現",
        "grammar": "主語 dialogue が単数なので reduces。"
      },
      "fosters": {
        "pos": "Verb",
        "ja": "育む、促進する",
        "tag": "三単現",
        "grammar": "foster=(関係・感情などを)育てる。fosters lasting peace=恒久的な平和を育む。"
      },
      "lasting": {
        "pos": "Adjective",
        "ja": "永続的な",
        "tag": "現在分詞",
        "grammar": "last(続く)の現在分詞が形容詞化。lasting peace=長く続く平和。"
      },
      "common": {
        "pos": "Adjective",
        "ja": "共通の"
      },
      "demand": {
        "pos": "Verb",
        "ja": "必要とする、要求する",
        "tag": "語法",
        "grammar": "ここでは「(物事が)〜を必要とする」。demand coordinated action=協調行動を必要とする。to は不要。"
      },
      "coordinated": {
        "pos": "Adjective",
        "ja": "協調した",
        "tag": "過去分詞",
        "grammar": "coordinate の過去分詞。coordinated action=足並みを揃えた行動。"
      },
      "grievances": {
        "pos": "Noun",
        "ja": "(根深い)不満、遺恨",
        "tag": "複数形",
        "grammar": "歴史的な複数の遺恨を指すので複数 grievances。deep historical grievances=根深い歴史的遺恨。"
      },
      "complicate": {
        "pos": "Verb",
        "ja": "複雑にする",
        "tag": "語法 SVO",
        "grammar": "他動詞。complicate cooperation=協力を難しくする。主語 grievances が複数なので s なし。"
      },
      "ignoring": {
        "pos": "Verb",
        "ja": "無視すること",
        "tag": "動名詞",
        "grammar": "動名詞句 ignoring neighbors が主語。「無視すること」が後続の would deepen を受ける。"
      },
      "deepen": {
        "pos": "Verb",
        "ja": "深める、悪化させる",
        "tag": "語法 SVO",
        "grammar": "形容詞 deep の動詞化。deepen mistrust=不信を深める。他動詞。"
      },
      "mistrust": {
        "pos": "Noun",
        "ja": "不信",
        "tag": "無冠詞・不可算",
        "grammar": "mis-+trust の不可算抽象名詞。無冠詞で用いる。distrust とほぼ同義。"
      },
      "boosts": {
        "pos": "Verb",
        "ja": "押し上げる",
        "tag": "三単現",
        "grammar": "主語 it(=improving relations)が単数扱いなので boosts。boost the economy=経済を押し上げる。"
      },
      "secures": {
        "pos": "Verb",
        "ja": "確保する",
        "tag": "三単現",
        "grammar": "secure stability=安定を確保する。動詞用法。形容詞「安全な」と同形。"
      },
      "enables": {
        "pos": "Verb",
        "ja": "可能にする",
        "tag": "語法 SVOC",
        "grammar": "enable O to do の形。enables joint solutions のように O+名詞で「〜を可能にする」とも使える。"
      },
      "joint": {
        "pos": "Adjective",
        "ja": "共同の",
        "grammar": "joint solutions=共同の解決策。複数国が一緒に取り組むことを示す。"
      },
      "deserves": {
        "pos": "Verb",
        "ja": "値する",
        "tag": "三単現",
        "grammar": "主語 improving relations が単数扱いなので deserves。deserve high priority=高い優先度に値する。"
      },
      "central": {
        "pos": "Adjective",
        "ja": "中心的な",
        "grammar": "a central focus=中心的な焦点。central=最重要の、という比喩的用法。"
      }
    },
    "vocab": [
      {
        "word": "devote",
        "pos": "Verb",
        "ipa": "/dɪˈvoʊt/",
        "def": "to give all or most of your time or effort to something",
        "example": "There is ongoing debate over how much effort Japan should devote to its neighbors."
      },
      {
        "word": "pivotal",
        "pos": "Adjective",
        "ipa": "/ˈpɪvətl/",
        "def": "extremely important because other things depend on it",
        "example": "Improved relations play a pivotal role in ensuring regional stability."
      },
      {
        "word": "tie",
        "pos": "Noun",
        "ipa": "/taɪ/",
        "def": "a close relationship or connection between people, groups, or countries",
        "example": "Stronger ties bring substantial economic benefits."
      },
      {
        "word": "escalate",
        "pos": "Verb",
        "ipa": "/ˈeskəleɪt/",
        "def": "to become or make something become more serious or intense",
        "example": "Unresolved disputes could easily escalate."
      },
      {
        "word": "persist",
        "pos": "Verb",
        "ipa": "/pərˈsɪst/",
        "def": "to continue to exist despite difficulty or opposition",
        "example": "Historical tensions persist in East Asia."
      },
      {
        "word": "foster",
        "pos": "Verb",
        "ipa": "/ˈfɔːstər/",
        "def": "to encourage the development of something good",
        "example": "Sustained dialogue reduces the risk of conflict and fosters lasting peace."
      },
      {
        "word": "grievance",
        "pos": "Noun",
        "ipa": "/ˈɡriːvəns/",
        "def": "a strong feeling that you have been treated unfairly",
        "example": "Admittedly, deep historical grievances complicate cooperation."
      },
      {
        "word": "substantial",
        "pos": "Adjective",
        "ipa": "/səbˈstænʃl/",
        "def": "large in amount, value, or importance",
        "example": "Stronger ties bring substantial economic benefits."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "動名詞句を主語にする",
        "example": "In my opinion, improving relations with other Asian nations should clearly be a priority for the Japanese government.",
        "highlight": "improving relations with other Asian nations should clearly be a priority",
        "explain": "動名詞句 improving relations... が文全体の主語。動名詞主語は単数扱いなので動詞は should be。To improve relations... と不定詞で書いてもよいが、英作文では動名詞主語のほうが据わりがよい場面が多い。"
      },
      {
        "no": 2,
        "title": "by + 動名詞で「方法」を示す",
        "example": "I will support this view by examining economic benefits, regional stability, and shared challenges.",
        "highlight": "by examining economic benefits, regional stability, and shared challenges",
        "explain": "by+動名詞=〜することによって、と手段・方法を表す。導入段落で論点を予告する定型。examining の目的語を3つ並列し、本論3パラグラフの見出しを宣言している。前置詞 by の後ろは必ず動名詞。"
      },
      {
        "no": 3,
        "title": "譲歩の Admittedly → However 構文",
        "example": "Admittedly, deep historical grievances complicate cooperation. However, ignoring neighbors would only deepen mistrust.",
        "highlight": "Admittedly, deep historical grievances complicate cooperation. However",
        "explain": "Admittedly で反対意見を一度認め、However で主張に引き戻す。一級ライティングで説得力を上げる反論処理の型。後半は仮定の含み(would)で「無視すれば〜だろう」と帰結を示している。"
      }
    ]
  },
  "18": {
    "glossary": {
      "interconnected": {
        "pos": "Adjective",
        "ja": "相互に結びついた",
        "tag": "過去分詞",
        "grammar": "inter-(相互)+connect の過去分詞。increasingly interconnected=ますます相互に結びついた。受動的な状態を表す。"
      },
      "experts": {
        "pos": "Noun",
        "ja": "専門家",
        "tag": "複数形"
      },
      "warn": {
        "pos": "Verb",
        "ja": "警告する",
        "tag": "語法",
        "grammar": "warn about=〜について警告する。warn somebody (about/of) の形もある。前置詞を伴う点に注意。"
      },
      "infectious": {
        "pos": "Adjective",
        "ja": "感染性の",
        "grammar": "infectious diseases=感染症。infect(感染させる)+-ious。disease を修飾する定番コロケーション。"
      },
      "diseases": {
        "pos": "Noun",
        "ja": "病気",
        "tag": "複数形",
        "grammar": "disease は可算。複数種類の病気を指すので diseases。総称的に不可算で使う場合もある。"
      },
      "undoubtedly": {
        "pos": "Adverb",
        "ja": "間違いなく",
        "grammar": "doubt の派生副詞。主張を強める。will undoubtedly become=間違いなく〜になるだろう。"
      },
      "coming": {
        "pos": "Adjective",
        "ja": "来たる、今後の",
        "tag": "現在分詞",
        "grammar": "come の現在分詞が形容詞化。the coming decades=今後数十年。in the years to come と同義。"
      },
      "decades": {
        "pos": "Noun",
        "ja": "数十年",
        "tag": "複数形",
        "grammar": "decade(10年)の複数。coming decades=今後数十年。"
      },
      "globalization": {
        "pos": "Noun",
        "ja": "グローバル化",
        "tag": "無冠詞・不可算",
        "grammar": "-ization 抽象名詞で不可算→無冠詞。現象を総称するので a を付けない。"
      },
      "resistance": {
        "pos": "Noun",
        "ja": "耐性、抵抗",
        "tag": "無冠詞・不可算",
        "grammar": "-ance 抽象名詞で不可算。antibiotic resistance=抗生物質耐性。冠詞なしで用いる。"
      },
      "unprecedented": {
        "pos": "Adjective",
        "ja": "前例のない",
        "grammar": "un-+precedent(先例)+-ed。the unprecedented scale=前例のない規模。強調の高得点語。"
      },
      "scale": {
        "pos": "Noun",
        "ja": "規模",
        "tag": "冠詞 the",
        "grammar": "the scale of〜=〜の規模。of 句で限定されるので the が付く。on a large scale のように a を取る用法もある。"
      },
      "accelerates": {
        "pos": "Verb",
        "ja": "加速させる",
        "tag": "三単現",
        "grammar": "主語 the scale が単数なので accelerates。他動詞で「〜を速める」。"
      },
      "spread": {
        "pos": "Noun",
        "ja": "拡散、広がり",
        "tag": "冠詞 the",
        "grammar": "the spread of disease=病気の拡散。of 句で限定され the。同形の動詞 spread と区別。"
      },
      "emerging": {
        "pos": "Verb",
        "ja": "発生している",
        "tag": "現在分詞",
        "grammar": "emerge の現在分詞が後置修飾。a virus emerging in one region=ある地域で発生するウイルス。能動の関係なので -ing。"
      },
      "continents": {
        "pos": "Noun",
        "ja": "大陸",
        "tag": "複数形"
      },
      "recent": {
        "pos": "Adjective",
        "ja": "最近の",
        "tag": "冠詞 the",
        "grammar": "the recent pandemic=最近のパンデミック。特定の出来事を指すので the。"
      },
      "pandemic": {
        "pos": "Noun",
        "ja": "パンデミック、世界的流行",
        "tag": "冠詞 the"
      },
      "overwhelmed": {
        "pos": "Verb",
        "ja": "圧倒した、機能不全にした",
        "tag": "過去形",
        "grammar": "spread と並列の過去形。overwhelmed health systems=医療体制を圧迫した(処理能力を超えさせた)。"
      },
      "overuse": {
        "pos": "Noun",
        "ja": "乱用、使いすぎ",
        "tag": "冠詞 the",
        "grammar": "the overuse of antibiotics=抗生物質の乱用。over-+use。of 句で限定され the。不可算的に用いる。"
      },
      "antibiotics": {
        "pos": "Noun",
        "ja": "抗生物質",
        "tag": "複数形",
        "grammar": "通例複数 antibiotics。種類・全般を指す。単数 antibiotic は形容詞的にも使う(antibiotic resistance)。"
      },
      "resistant": {
        "pos": "Adjective",
        "ja": "耐性のある",
        "grammar": "resist の形容詞形。resistant to〜=〜に耐性がある。ここでは resistant bacteria=耐性菌。"
      },
      "bacteria": {
        "pos": "Noun",
        "ja": "細菌",
        "tag": "複数形",
        "grammar": "bacteria は複数形(単数は bacterium)。動詞も複数で受けるのが原則。"
      },
      "medicines": {
        "pos": "Noun",
        "ja": "薬",
        "tag": "複数形",
        "grammar": "ここでは個々の薬剤を指して可算複数。「医学」の意味の medicine は不可算。"
      },
      "effectiveness": {
        "pos": "Noun",
        "ja": "効果、有効性",
        "tag": "無冠詞・不可算",
        "grammar": "effective+-ness の抽象名詞で不可算。lose their effectiveness=効果を失う。"
      },
      "once-treatable": {
        "pos": "Adjective",
        "ja": "かつては治療可能だった",
        "grammar": "once(かつて)+treatable(治療可能な)の複合形容詞。「以前は治せた」という対比を一語で表す。"
      },
      "infections": {
        "pos": "Noun",
        "ja": "感染症",
        "tag": "複数形"
      },
      "deadly": {
        "pos": "Adjective",
        "ja": "致命的な",
        "grammar": "-ly で終わるが形容詞。become deadly=命取りになる。副詞ではない点に注意。"
      },
      "humanity": {
        "pos": "Noun",
        "ja": "人類",
        "tag": "無冠詞・不可算",
        "grammar": "「人類」の意味では不可算で無冠詞。単数扱いで could lose のように受ける。"
      },
      "reliable": {
        "pos": "Adjective",
        "ja": "信頼できる",
        "grammar": "rely(頼る)+-able。most reliable defense=最も頼れる防御。"
      },
      "defense": {
        "pos": "Noun",
        "ja": "防御、守り",
        "tag": "所有格",
        "grammar": "its most reliable defense。所有格+最上級で限定されるので the ではなく its。米綴り defense、英綴り defence。"
      },
      "expands": {
        "pos": "Verb",
        "ja": "拡大させる",
        "tag": "三単現",
        "grammar": "主語 climate change が単数なので expands。expand the range=範囲を広げる(他動詞)。"
      },
      "range": {
        "pos": "Noun",
        "ja": "生息域、範囲",
        "tag": "冠詞 the",
        "grammar": "the range of disease-carrying insects。of 句で限定され the。生物の「分布域」の意味。"
      },
      "disease-carrying": {
        "pos": "Adjective",
        "ja": "病気を媒介する",
        "tag": "現在分詞",
        "grammar": "disease(目的語)+carry の現在分詞による複合形容詞。「病気を運ぶ」=媒介する。insects を修飾。"
      },
      "insects": {
        "pos": "Noun",
        "ja": "昆虫",
        "tag": "複数形"
      },
      "rising": {
        "pos": "Adjective",
        "ja": "上昇する",
        "tag": "現在分詞",
        "grammar": "rise の現在分詞。rising temperatures=上昇する気温。自動詞 rise(上がる)由来なので能動の -ing。"
      },
      "temperatures": {
        "pos": "Noun",
        "ja": "気温",
        "tag": "複数形",
        "grammar": "気温の数値・変動を指すとき複数 temperatures。rising temperatures は定番表現。"
      },
      "mosquitoes": {
        "pos": "Noun",
        "ja": "蚊",
        "tag": "複数形",
        "grammar": "mosquito の複数。-o で終わる語に -es を付ける綴り。"
      },
      "vectors": {
        "pos": "Noun",
        "ja": "媒介生物",
        "tag": "複数形",
        "grammar": "医学・生物学で「病原体を運ぶ生物」を vector と呼ぶ。other vectors=その他の媒介生物。"
      },
      "thrive": {
        "pos": "Verb",
        "ja": "繁栄する、はびこる",
        "tag": "自動詞",
        "grammar": "目的語をとらない自動詞「よく育つ」。allow O to thrive=Oがはびこるのを許す。"
      },
      "previously": {
        "pos": "Adverb",
        "ja": "以前は",
        "grammar": "previously unaffected regions=以前は影響を受けなかった地域。副詞が過去分詞 unaffected を修飾。"
      },
      "unaffected": {
        "pos": "Adjective",
        "ja": "影響を受けていない",
        "tag": "過去分詞",
        "grammar": "un-+affect の過去分詞。「(これまで)害を受けていない」状態を表す。"
      },
      "medical": {
        "pos": "Adjective",
        "ja": "医学の"
      },
      "advance": {
        "pos": "Verb",
        "ja": "進歩する",
        "tag": "自動詞",
        "grammar": "ここでは自動詞「進歩する」。continues to advance=進歩し続ける。名詞 advance(進歩)と同形。"
      },
      "pathogens": {
        "pos": "Noun",
        "ja": "病原体",
        "tag": "複数形",
        "grammar": "病気を引き起こす微生物。pathogens evolve=病原体は進化する。複数で総称。"
      },
      "evolve": {
        "pos": "Verb",
        "ja": "進化する",
        "tag": "自動詞",
        "grammar": "目的語をとらない自動詞。主語 pathogens が複数なので evolve(s なし)。"
      },
      "treatments": {
        "pos": "Noun",
        "ja": "治療法",
        "tag": "複数形",
        "grammar": "個々の治療法を指すとき可算複数。new treatments=新しい治療法。"
      },
      "relentless": {
        "pos": "Adjective",
        "ja": "容赦ない、絶え間ない",
        "grammar": "relentless globalization=止まらないグローバル化。「緩むことのない」という強い形容詞。"
      },
      "growing": {
        "pos": "Adjective",
        "ja": "増大する",
        "tag": "現在分詞",
        "grammar": "grow の現在分詞。growing drug resistance=増大する薬剤耐性。能動の進行的意味。"
      },
      "warming": {
        "pos": "Adjective",
        "ja": "温暖化する",
        "tag": "現在分詞",
        "grammar": "warm の現在分詞。a warming planet=温暖化する地球。a が付くのは planet が可算名詞だから。"
      },
      "escalating": {
        "pos": "Adjective",
        "ja": "増大する、深刻化する",
        "tag": "現在分詞",
        "grammar": "escalate の現在分詞。an escalating threat=増大する脅威。「だんだん大きくなる」進行のニュアンス。"
      },
      "threat": {
        "pos": "Noun",
        "ja": "脅威",
        "tag": "冠詞 an",
        "grammar": "an escalating threat。可算名詞で母音始まりの escalating が続くので an。"
      },
      "convinced": {
        "pos": "Adjective",
        "ja": "確信して",
        "tag": "受動・過去分詞",
        "grammar": "be convinced (that)=〜と確信している。convince(納得させる)の過去分詞からくる受動的状態表現。"
      },
      "ahead": {
        "pos": "Adverb",
        "ja": "この先、今後",
        "grammar": "in the decades ahead=今後数十年で。名詞 decades を後ろから修飾する副詞。"
      }
    },
    "vocab": [
      {
        "word": "interconnected",
        "pos": "Adjective",
        "ipa": "/ˌɪntərkəˈnektɪd/",
        "def": "having parts that are connected with and affect each other",
        "example": "As the world becomes increasingly interconnected, many experts warn about the future of public health."
      },
      {
        "word": "unprecedented",
        "pos": "Adjective",
        "ipa": "/ʌnˈpresɪdentɪd/",
        "def": "never having happened or existed before",
        "example": "The unprecedented scale of global travel accelerates the spread of disease."
      },
      {
        "word": "resistant",
        "pos": "Adjective",
        "ipa": "/rɪˈzɪstənt/",
        "def": "not affected by something, or able to withstand it",
        "example": "The overuse of antibiotics has produced increasingly resistant bacteria."
      },
      {
        "word": "thrive",
        "pos": "Verb",
        "ipa": "/θraɪv/",
        "def": "to grow, develop, or be successful",
        "example": "Rising temperatures allow mosquitoes and other vectors to thrive in previously unaffected regions."
      },
      {
        "word": "pathogen",
        "pos": "Noun",
        "ipa": "/ˈpæθədʒən/",
        "def": "a tiny organism, such as a bacterium, that causes disease",
        "example": "Pathogens evolve and spread faster than new treatments can be developed."
      },
      {
        "word": "relentless",
        "pos": "Adjective",
        "ipa": "/rɪˈlentləs/",
        "def": "never stopping or never becoming less intense",
        "example": "Because of relentless globalization, infectious diseases pose an escalating threat."
      },
      {
        "word": "overwhelm",
        "pos": "Verb",
        "ipa": "/ˌoʊvərˈwelm/",
        "def": "to be too much for someone or something to deal with",
        "example": "The recent pandemic spread worldwide and overwhelmed health systems everywhere."
      },
      {
        "word": "vector",
        "pos": "Noun",
        "ipa": "/ˈvektər/",
        "def": "an organism that carries and transmits a disease",
        "example": "Rising temperatures allow mosquitoes and other vectors to thrive."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "時を表す As 節（〜するにつれて）",
        "example": "As the world becomes increasingly interconnected, many experts warn about the future of public health.",
        "highlight": "As the world becomes increasingly interconnected",
        "explain": "As+S+V で「〜するにつれて」と並行的な変化を導く。導入で背景の変化を示す型。becomes と現在形で一般的傾向を述べ、主節 warn も現在形で揃える。increasingly が「ますます」と程度の進行を補強する。"
      },
      {
        "no": 2,
        "title": "A case in point is 〜（その好例が〜）",
        "example": "A case in point is the recent pandemic, which spread worldwide with alarming speed and overwhelmed health systems everywhere.",
        "highlight": "A case in point is the recent pandemic",
        "explain": "A case in point is〜=その典型例が〜だ、と具体例を導入する定型。For instance より引き締まった書き出し。続く which は非制限用法の関係代名詞で、pandemic に説明を補足する。spread と overwhelmed が and で並ぶ過去形の並列。"
      },
      {
        "no": 3,
        "title": "比較級 + than 節での速さ対比",
        "example": "However, pathogens evolve and spread faster than new treatments can be developed.",
        "highlight": "pathogens evolve and spread faster than new treatments can be developed",
        "explain": "faster than+S+V で「〜より速く」と二つの動きの速度を比較。反論を退ける決め手の文。than 以下は受動態 can be developed(treatments は「開発される」側)。evolve and spread が能動、treatments が受動という態の対比に注目すると訳がぶれない。"
      }
    ]
  },
  "19": {
    "glossary": {
      "widely": {
        "pos": "Adverb",
        "ja": "広く",
        "grammar": "it is widely believed that〜=〜と広く信じられている。受動態の動詞 believed を修飾。"
      },
      "believed": {
        "pos": "Verb",
        "ja": "信じられている",
        "tag": "受動",
        "grammar": "It is believed that〜の形式主語+受動態。「(一般に)〜と思われている」という客観的導入。"
      },
      "humanity": {
        "pos": "Noun",
        "ja": "人類",
        "tag": "無冠詞・不可算",
        "grammar": "「人類」の意味で不可算・無冠詞。should rid itself のように itself で受ける単数扱い。"
      },
      "rid": {
        "pos": "Verb",
        "ja": "取り除く",
        "tag": "語法 SVO",
        "grammar": "rid A of B=AからBを取り除く。rid itself of weapons=自らを兵器から解放する。of とセットで使う。"
      },
      "mass": {
        "pos": "Adjective",
        "ja": "大量の",
        "grammar": "weapons of mass destruction=大量破壊兵器(WMD)。mass が destruction を修飾する定型句。"
      },
      "destruction": {
        "pos": "Noun",
        "ja": "破壊",
        "tag": "無冠詞・不可算",
        "grammar": "-tion 抽象名詞で不可算→無冠詞。mass destruction で一つの固定表現。"
      },
      "noble": {
        "pos": "Adjective",
        "ja": "高潔な、立派な",
        "grammar": "a noble aspiration=立派な理想。理想を一度肯定して譲歩を作る語。"
      },
      "aspiration": {
        "pos": "Noun",
        "ja": "願望、大志",
        "tag": "冠詞 a",
        "grammar": "可算名詞。a noble aspiration=一つの高い理想。an unattainable goal と対をなす。"
      },
      "convinced": {
        "pos": "Adjective",
        "ja": "確信して",
        "tag": "受動・過去分詞",
        "grammar": "be convinced that〜=〜と確信している。convince の過去分詞からくる状態表現。主張表明の定型。"
      },
      "complete": {
        "pos": "Adjective",
        "ja": "完全な",
        "grammar": "a complete worldwide ban=完全な世界規模の禁止。後の reduction is not the same as elimination と呼応し「完全」を強調。"
      },
      "worldwide": {
        "pos": "Adjective",
        "ja": "世界規模の",
        "grammar": "ここでは名詞 ban を修飾する形容詞。副詞用法(spread worldwide)もある同形語。"
      },
      "ban": {
        "pos": "Noun",
        "ja": "禁止",
        "tag": "冠詞 a",
        "grammar": "可算名詞。a ban on〜=〜の禁止。動詞「禁止する」も同形。"
      },
      "unattainable": {
        "pos": "Adjective",
        "ja": "達成不可能な",
        "grammar": "un-+attain(達成する)+-able。an unattainable goal=達成しえない目標。結論で beyond our reach と言い換える。"
      },
      "foreseeable": {
        "pos": "Adjective",
        "ja": "予見できる",
        "tag": "冠詞 the",
        "grammar": "for the foreseeable future=当面の間。fore-+see+-able。慣用句として the を伴う。"
      },
      "weapons": {
        "pos": "Noun",
        "ja": "兵器",
        "tag": "複数形",
        "grammar": "複数の兵器を指すので weapons。such weapons / these weapons と指示語で受け直される。"
      },
      "function": {
        "pos": "Verb",
        "ja": "機能する",
        "tag": "三単現・句動詞",
        "grammar": "function as〜=〜として機能する。主語 weapons が複数なので s なし。名詞 function と同形。"
      },
      "deterrent": {
        "pos": "Noun",
        "ja": "抑止力",
        "tag": "冠詞 a",
        "grammar": "可算名詞。a powerful deterrent=強力な抑止力。動詞 deter(思いとどまらせる)の名詞形。"
      },
      "largely": {
        "pos": "Adverb",
        "ja": "主に",
        "grammar": "This is largely because〜=これは主に〜だからだ。理由文を導く副詞。because の前に置いて程度を限定。"
      },
      "nuclear": {
        "pos": "Adjective",
        "ja": "核の",
        "grammar": "nuclear powers=核保有国。power はここで「国家・強国」の意味の可算名詞。"
      },
      "powers": {
        "pos": "Noun",
        "ja": "(核)保有国、強国",
        "tag": "複数形",
        "grammar": "power が「強国・大国」の意味では可算。複数形 powers で複数の国を指す。rival powers も同じ用法。"
      },
      "regard": {
        "pos": "Verb",
        "ja": "みなす",
        "tag": "語法 SVOC",
        "grammar": "regard A as B=AをBとみなす。as を落とさない。主語 powers が複数なので regard(s なし)。"
      },
      "arsenals": {
        "pos": "Noun",
        "ja": "兵器庫、保有兵器",
        "tag": "複数形",
        "grammar": "各国の保有兵器を指すので複数 arsenals。their arsenals=各国の核戦力。"
      },
      "guarantee": {
        "pos": "Noun",
        "ja": "保証",
        "tag": "冠詞 a",
        "grammar": "可算名詞。a guarantee against invasion=侵略に対する歯止め。動詞も同形。"
      },
      "invasion": {
        "pos": "Noun",
        "ja": "侵略",
        "tag": "無冠詞・不可算",
        "grammar": "against invasion で抽象的・一般的な侵略を指すため無冠詞。an invasion なら特定の一回の侵攻。"
      },
      "possess": {
        "pos": "Verb",
        "ja": "保有する",
        "tag": "三単現なし",
        "grammar": "have より硬い「所有する」。states that possess these weapons=これらの兵器を持つ国。先行詞 states が複数なので possess。"
      },
      "rarely": {
        "pos": "Adverb",
        "ja": "めったに〜ない",
        "grammar": "準否定の副詞。have rarely been attacked=ほとんど攻撃されたことがない。否定語なので二重否定にしない。"
      },
      "directly": {
        "pos": "Adverb",
        "ja": "直接的に"
      },
      "reluctant": {
        "pos": "Adjective",
        "ja": "気が進まない",
        "tag": "語法",
        "grammar": "be reluctant to do=〜したがらない。後ろは to 不定詞。deeply reluctant to disarm=武装解除に極めて消極的。"
      },
      "disarm": {
        "pos": "Verb",
        "ja": "武装解除する",
        "tag": "自動詞",
        "grammar": "dis-+arm(武装する)。ここでは自動詞「軍備を放棄する」。名詞は disarmament。"
      },
      "verification": {
        "pos": "Noun",
        "ja": "検証",
        "tag": "無冠詞・不可算",
        "grammar": "-tion 抽象名詞で不可算→無冠詞。verify(検証する)の名詞形。文頭で主語になっても a は不要。"
      },
      "treaty": {
        "pos": "Noun",
        "ja": "条約",
        "tag": "冠詞 a",
        "grammar": "可算名詞。signed a treaty=条約に署名した。複数 treaties で「複数の条約」。"
      },
      "confirming": {
        "pos": "Verb",
        "ja": "確認すること",
        "tag": "動名詞",
        "grammar": "動名詞句 confirming that...が主語。「〜を確認することは深刻な問題になるだろう」。would pose を受ける。"
      },
      "hidden": {
        "pos": "Adjective",
        "ja": "隠された",
        "tag": "過去分詞",
        "grammar": "hide の過去分詞(hide-hid-hidden)が形容詞化。hidden stockpiles=隠された備蓄。受動の意味。"
      },
      "stockpiles": {
        "pos": "Noun",
        "ja": "備蓄、貯蔵",
        "tag": "複数形",
        "grammar": "stock+pile。兵器の備蓄を指すとき複数 stockpiles。"
      },
      "pose": {
        "pos": "Verb",
        "ja": "(問題を)引き起こす",
        "tag": "語法 SVO",
        "grammar": "pose a problem=問題を生じさせる。pose a threat も頻出。「(難題を)突きつける」イメージ。"
      },
      "inspectors": {
        "pos": "Noun",
        "ja": "査察官",
        "tag": "複数形",
        "grammar": "inspect(検査する)+-or の複数。条約の査察を行う人。"
      },
      "struggled": {
        "pos": "Verb",
        "ja": "苦労した",
        "tag": "過去形",
        "grammar": "struggle to do=〜しようと苦労する。have repeatedly struggled to access=何度もアクセスに苦労してきた。後ろは to 不定詞。"
      },
      "secretive": {
        "pos": "Adjective",
        "ja": "秘密主義の",
        "grammar": "secret+-ive。secretive facilities=秘匿された施設。「外に見せない」性質を表す。"
      },
      "facilities": {
        "pos": "Noun",
        "ja": "施設",
        "tag": "複数形",
        "grammar": "facility の複数。建物・設備を指すとき可算複数。"
      },
      "concealment": {
        "pos": "Noun",
        "ja": "隠蔽",
        "tag": "無冠詞・不可算",
        "grammar": "conceal(隠す)+-ment の抽象名詞で不可算。room for concealment=隠蔽の余地。"
      },
      "cheating": {
        "pos": "Noun",
        "ja": "不正、ごまかし",
        "tag": "動名詞",
        "grammar": "cheat の動名詞が名詞化。concealment and cheating=隠蔽と不正。前置詞 for の目的語として並列。"
      },
      "mutual": {
        "pos": "Adjective",
        "ja": "相互の",
        "grammar": "mutual distrust=相互不信。互いに向け合う感情を表す。mutual suspicion も同義。"
      },
      "distrust": {
        "pos": "Noun",
        "ja": "不信",
        "tag": "無冠詞・不可算",
        "grammar": "dis-+trust の不可算抽象名詞で無冠詞。mistrust とほぼ同義。本文では rival nations 間の不信。"
      },
      "rival": {
        "pos": "Adjective",
        "ja": "対立する、ライバルの",
        "grammar": "rival nations=対立国。名詞 rival(競争相手)が形容詞的に前置されている。"
      },
      "fragile": {
        "pos": "Adjective",
        "ja": "もろい、不安定な",
        "grammar": "make disarmament fragile=軍縮をもろくする。SVOC 構文の C(補語)。「壊れやすい」状態を表す。"
      },
      "abandon": {
        "pos": "Verb",
        "ja": "放棄する",
        "tag": "語法 SVO",
        "grammar": "他動詞。abandon its weapons=自国の兵器を放棄する。give up より硬い語。"
      },
      "retain": {
        "pos": "Verb",
        "ja": "保持する",
        "tag": "語法 SVO",
        "grammar": "他動詞「持ち続ける」。might retain theirs(=their weapons)=兵器を持ち続けるかもしれない。keep より硬い。"
      },
      "sincere": {
        "pos": "Adjective",
        "ja": "誠実な、本気の",
        "grammar": "sincere negotiations=誠実な交渉。「うわべでない」というニュアンス。"
      },
      "negotiations": {
        "pos": "Noun",
        "ja": "交渉",
        "tag": "複数形",
        "grammar": "交渉のやり取り全体を指すとき通例複数 negotiations。動詞 negotiate の名詞形。"
      },
      "collapse": {
        "pos": "Verb",
        "ja": "破綻する、崩れる",
        "tag": "自動詞",
        "grammar": "自動詞「崩壊する」。tend to collapse=破綻しがちだ。比喩的に交渉が決裂する意味。"
      },
      "betrayal": {
        "pos": "Noun",
        "ja": "裏切り",
        "tag": "無冠詞・不可算",
        "grammar": "betray(裏切る)+-al の抽象名詞。suspects betrayal=裏切りを疑う。ここでは不可算で無冠詞。"
      },
      "treaties": {
        "pos": "Noun",
        "ja": "条約",
        "tag": "複数形",
        "grammar": "treaty の複数(y→ies)。複数の条約による削減実績を指す。"
      },
      "reduction": {
        "pos": "Noun",
        "ja": "削減",
        "tag": "無冠詞・不可算",
        "grammar": "reduce の名詞形。ここでは概念としての「削減」で無冠詞。reduction is not the same as elimination=削減は廃絶と同じではない。"
      },
      "elimination": {
        "pos": "Noun",
        "ja": "廃絶、根絶",
        "tag": "無冠詞・不可算",
        "grammar": "eliminate(なくす)+-tion の抽象名詞で不可算。reduction との対比で「完全になくすこと」を表す。"
      },
      "underlying": {
        "pos": "Adjective",
        "ja": "根底にある",
        "tag": "現在分詞",
        "grammar": "underlie(下に横たわる)の現在分詞が形容詞化。the underlying incentives=根底にある誘因。「表に出ない根本の」の意味。"
      },
      "incentives": {
        "pos": "Noun",
        "ja": "動機、誘因",
        "tag": "複数形",
        "grammar": "incentive は可算。複数の動機を指すので incentives。incentive to do=〜する誘因。"
      },
      "entrenched": {
        "pos": "Adjective",
        "ja": "根深い、染み付いた",
        "tag": "過去分詞",
        "grammar": "entrench の過去分詞が形容詞化。entrenched distrust=根深い不信。「塹壕に埋まって動かない」イメージ。"
      },
      "impractical": {
        "pos": "Adjective",
        "ja": "非現実的な",
        "grammar": "im-+practical の反意語。make a ban impractical=禁止を非現実的にする。SVOC の補語。"
      },
      "abolishing": {
        "pos": "Verb",
        "ja": "廃止すること",
        "tag": "動名詞",
        "grammar": "動名詞句 completely abolishing them が主語。「それらを完全に廃止することは手の届かない範囲だ」。"
      },
      "regrettably": {
        "pos": "Adverb",
        "ja": "残念ながら",
        "grammar": "文修飾の副詞。is, regrettably, beyond our reach のように挿入して話者の評価を添える。"
      }
    },
    "vocab": [
      {
        "word": "deterrent",
        "pos": "Noun",
        "ipa": "/dɪˈtɜːrənt/",
        "def": "something that makes someone less likely to do something, especially to attack",
        "example": "Such weapons function as a powerful deterrent."
      },
      {
        "word": "arsenal",
        "pos": "Noun",
        "ipa": "/ˈɑːrsənl/",
        "def": "a collection of weapons and military equipment held by a country",
        "example": "Nuclear powers regard their arsenals as a guarantee against invasion."
      },
      {
        "word": "verification",
        "pos": "Noun",
        "ipa": "/ˌverɪfɪˈkeɪʃn/",
        "def": "the process of checking that something is true or accurate",
        "example": "Even if every nation signed a treaty, verification is extremely difficult."
      },
      {
        "word": "stockpile",
        "pos": "Noun",
        "ipa": "/ˈstɑːkpaɪl/",
        "def": "a large supply of something kept for future use",
        "example": "Confirming that hidden stockpiles had truly been destroyed would pose a serious problem."
      },
      {
        "word": "disarm",
        "pos": "Verb",
        "ipa": "/dɪsˈɑːrm/",
        "def": "to give up or reduce armed forces and weapons",
        "example": "States that possess these weapons are deeply reluctant to disarm."
      },
      {
        "word": "entrenched",
        "pos": "Adjective",
        "ipa": "/ɪnˈtrentʃt/",
        "def": "firmly established and very difficult to change",
        "example": "Deterrence, the difficulty of verification, and entrenched distrust make a worldwide ban impractical."
      },
      {
        "word": "abolish",
        "pos": "Verb",
        "ipa": "/əˈbɑːlɪʃ/",
        "def": "to officially end a law, system, or practice",
        "example": "Completely abolishing them is, regrettably, beyond our reach."
      },
      {
        "word": "reluctant",
        "pos": "Adjective",
        "ipa": "/rɪˈlʌktənt/",
        "def": "unwilling and hesitant to do something",
        "example": "This makes them deeply reluctant to disarm."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "形式主語 It is ～ that の客観的導入",
        "example": "It is widely believed that humanity should rid itself of weapons of mass destruction.",
        "highlight": "It is widely believed that humanity should rid itself of weapons of mass destruction",
        "explain": "It は形式主語で、真主語は that 節。It is widely believed that〜=〜と広く信じられている、と一般論を客観的に提示する導入の型。直後に While this is a noble aspiration と続け、一度認めてから反論する譲歩の流れを作っている。rid A of B(AからBを取り除く)の of も落とさない。"
      },
      {
        "no": 2,
        "title": "Even if + 仮定法での譲歩",
        "example": "Even if every nation signed a treaty, confirming that hidden stockpiles had truly been destroyed would pose a serious problem.",
        "highlight": "Even if every nation signed a treaty",
        "explain": "Even if+過去形 signed、主節 would pose と仮定法過去で「仮に〜しても」と非現実的譲歩を表す。最大限譲っても問題が残ることを示す論法。主節の主語は動名詞句 confirming that...で、that 節内は過去完了の受動 had been destroyed。"
      },
      {
        "no": 3,
        "title": "No 主語 will ～ while … での対比",
        "example": "No country will abandon its weapons while its enemies might retain theirs.",
        "highlight": "No country will abandon its weapons while its enemies might retain theirs",
        "explain": "No+名詞を主語に立て「どの国も〜しない」と全体否定を一語で表す。while は「〜する一方で・〜である限り」と対比・同時を導く接続詞。theirs は their weapons の繰り返しを避ける所有代名詞。abandon と retain の対義語を対置している。"
      }
    ]
  },
  "20": {
    "glossary": {
      "age": {
        "pos": "Noun",
        "ja": "時代",
        "tag": "冠詞 an",
        "grammar": "an age=「一つの時代」。可算名詞を「ある〜」と漠然と特定する初出なので a/an。dominated by が後ろから限定。"
      },
      "dominated": {
        "pos": "Verb",
        "ja": "支配された",
        "tag": "過去分詞",
        "grammar": "an age (which is) dominated by の過去分詞後置修飾。age を「〜に支配された」と受動で説明。"
      },
      "technology": {
        "pos": "Noun",
        "ja": "科学技術",
        "tag": "無冠詞・不可算"
      },
      "data": {
        "pos": "Noun",
        "ja": "データ",
        "tag": "無冠詞・不可算",
        "grammar": "data は抽象的に扱う時は不可算→無冠詞。dominated by technology and data と並列。"
      },
      "argue": {
        "pos": "Verb",
        "ja": "主張する",
        "tag": "三単現"
      },
      "studying": {
        "pos": "Verb",
        "ja": "学ぶこと",
        "tag": "動名詞",
        "grammar": "studying the Humanities=動名詞句が that 節の主語。「〜すること」。"
      },
      "humanities": {
        "pos": "Noun",
        "ja": "人文学",
        "tag": "複数形・冠詞 the",
        "grammar": "the Humanities=学問分野名は定冠詞+複数で固定。常に複数扱い。"
      },
      "worthwhile": {
        "pos": "Adjective",
        "ja": "価値のある"
      },
      "firmly": {
        "pos": "Adverb",
        "ja": "固く、強く",
        "grammar": "firmly believe=主張を強める定番コロケーション。動詞 believe の前に置く。"
      },
      "believe": {
        "pos": "Verb",
        "ja": "信じる、考える"
      },
      "degree": {
        "pos": "Noun",
        "ja": "学位",
        "tag": "冠詞 a",
        "grammar": "a university degree=「一つの学位」で初出なので a。in the Humanities が分野を限定。"
      },
      "retains": {
        "pos": "Verb",
        "ja": "保持する",
        "tag": "三単現",
        "grammar": "主語 a degree が三人称単数→retains。retain great relevance のコロケーション。"
      },
      "relevance": {
        "pos": "Noun",
        "ja": "関連性、意義",
        "tag": "無冠詞・不可算",
        "grammar": "relevance は抽象不可算→great relevance も無冠詞。retain relevance で「意義を保つ」。"
      },
      "cultivate": {
        "pos": "Verb",
        "ja": "養う、育む",
        "grammar": "cultivate critical thinking=「思考力を育む」。能力・資質を主語が育てる時の定番動詞。"
      },
      "critical": {
        "pos": "Adjective",
        "ja": "批判的な",
        "grammar": "critical thinking=批判的思考。complex problems とは別語義で「重大な」ではない。"
      },
      "thinking": {
        "pos": "Noun",
        "ja": "思考",
        "tag": "無冠詞・不可算"
      },
      "subjects": {
        "pos": "Noun",
        "ja": "科目",
        "tag": "複数形",
        "grammar": "such as の後は具体例を列挙→複数 subjects。philosophy and history がその中身。"
      },
      "philosophy": {
        "pos": "Noun",
        "ja": "哲学",
        "tag": "無冠詞・不可算",
        "grammar": "学問名は無冠詞・不可算。冠詞も複数語尾も付けない。"
      },
      "history": {
        "pos": "Noun",
        "ja": "歴史(学)",
        "tag": "無冠詞・不可算"
      },
      "train": {
        "pos": "Verb",
        "ja": "訓練する",
        "tag": "語法 SVOC",
        "grammar": "train O to do=「Oを〜するよう訓練する」。to question / weigh が目的語の行動。"
      },
      "question": {
        "pos": "Verb",
        "ja": "疑う、問い直す",
        "grammar": "ここでは名詞「質問」でなく動詞「疑う」。question assumptions=前提を疑う。"
      },
      "assumptions": {
        "pos": "Noun",
        "ja": "思い込み、前提",
        "tag": "複数形",
        "grammar": "一般論として複数の前提を指すので無冠詞複数。"
      },
      "weigh": {
        "pos": "Verb",
        "ja": "比較考量する",
        "grammar": "weigh evidence=証拠を吟味する。question と to 不定詞で並列(to question … and weigh)。"
      },
      "evidence": {
        "pos": "Noun",
        "ja": "証拠",
        "tag": "無冠詞・不可算",
        "grammar": "evidence は常に不可算→無冠詞。an evidence は誤り。"
      },
      "employers": {
        "pos": "Noun",
        "ja": "雇用主",
        "tag": "複数形・無冠詞",
        "grammar": "一般論の主語は無冠詞複数。「雇用主というもの一般」を指す。"
      },
      "value": {
        "pos": "Verb",
        "ja": "高く評価する",
        "tag": "三単現なし",
        "grammar": "主語 employers が複数→value(原形のまま)。「重んじる」の意。"
      },
      "graduates": {
        "pos": "Noun",
        "ja": "卒業生",
        "tag": "複数形"
      },
      "analyze": {
        "pos": "Verb",
        "ja": "分析する"
      },
      "complex": {
        "pos": "Adjective",
        "ja": "複雑な"
      },
      "follow instructions": {
        "pos": "Verb",
        "ja": "指示に従う",
        "tag": "句動詞・無冠詞",
        "grammar": "follow instructions=指示に従う。一般的な指示なので無冠詞複数。"
      },
      "disciplines": {
        "pos": "Noun",
        "ja": "学問分野",
        "tag": "複数形",
        "grammar": "these disciplines=前述の Humanities を言い換え。分野が複数なので複数。"
      },
      "develop": {
        "pos": "Verb",
        "ja": "伸ばす、培う",
        "grammar": "develop strong communication skills=「能力を培う」。cultivate と同系の語。"
      },
      "communication": {
        "pos": "Noun",
        "ja": "コミュニケーション",
        "tag": "無冠詞・不可算"
      },
      "skills": {
        "pos": "Noun",
        "ja": "技能",
        "tag": "複数形"
      },
      "furthermore": {
        "pos": "Adverb",
        "ja": "さらに",
        "tag": "接続副詞",
        "grammar": "前文に論拠を追加。文頭でカンマを伴う。"
      },
      "persuasively": {
        "pos": "Adverb",
        "ja": "説得力をもって",
        "grammar": "argue persuasively=説得力をもって論じる。動詞を後ろから修飾。"
      },
      "essential": {
        "pos": "Adjective",
        "ja": "不可欠な",
        "grammar": "be essential in〜=〜において不可欠。in almost every profession が範囲。"
      },
      "profession": {
        "pos": "Noun",
        "ja": "職業",
        "tag": "冠詞 every・単数",
        "grammar": "every profession=every は単数名詞を取る。「どの職業も」の意。"
      },
      "depend on": {
        "pos": "Verb",
        "ja": "依存する",
        "tag": "句動詞",
        "grammar": "depend on=〜に頼る。前置詞 on を落とさない。heavily が程度を強める。"
      },
      "expression": {
        "pos": "Noun",
        "ja": "表現(力)",
        "tag": "冠詞 the",
        "grammar": "the clear expression (that …)=関係詞 that で限定された特定の表現力なので the。"
      },
      "foster": {
        "pos": "Verb",
        "ja": "育てる、促す",
        "grammar": "foster ethical awareness=倫理的意識を育む。抽象的な資質を育てる動詞。"
      },
      "ethical": {
        "pos": "Adjective",
        "ja": "倫理的な"
      },
      "awareness": {
        "pos": "Noun",
        "ja": "意識",
        "tag": "無冠詞・不可算",
        "grammar": "awareness は不可算→無冠詞。ethical awareness で「倫理観」。"
      },
      "moreover": {
        "pos": "Adverb",
        "ja": "さらに",
        "tag": "接続副詞"
      },
      "artificial intelligence": {
        "pos": "Noun",
        "ja": "人工知能",
        "tag": "無冠詞・不可算",
        "grammar": "技術概念としての AI は不可算・無冠詞。"
      },
      "raises": {
        "pos": "Verb",
        "ja": "提起する",
        "tag": "三単現",
        "grammar": "主語 artificial intelligence が単数扱い→raises。raise questions=疑問を生む。"
      },
      "moral": {
        "pos": "Adjective",
        "ja": "道徳的な"
      },
      "urgently": {
        "pos": "Adverb",
        "ja": "切実に",
        "grammar": "urgently needs=切実に必要とする。need を強める副詞。"
      },
      "right from wrong": {
        "pos": "Noun",
        "ja": "善悪",
        "tag": "無冠詞",
        "grammar": "judge right from wrong=善悪を見分ける。慣用句で無冠詞固定。"
      },
      "debates": {
        "pos": "Noun",
        "ja": "議論",
        "tag": "複数形",
        "grammar": "debates over〜=〜をめぐる議論。複数の論争を指すので複数。"
      },
      "privacy": {
        "pos": "Noun",
        "ja": "プライバシー",
        "tag": "無冠詞・不可算"
      },
      "fairness": {
        "pos": "Noun",
        "ja": "公平さ",
        "tag": "無冠詞・不可算",
        "grammar": "-ness 抽象名詞は不可算→無冠詞。"
      },
      "reflective": {
        "pos": "Adjective",
        "ja": "熟考する、内省的な"
      },
      "insight": {
        "pos": "Noun",
        "ja": "洞察",
        "tag": "無冠詞・不可算",
        "grammar": "reflective insight=熟慮による洞察。ここでは不可算的に扱い無冠詞。"
      },
      "nurture": {
        "pos": "Verb",
        "ja": "育む",
        "tag": "三単現なし",
        "grammar": "these subjects nurture=主語が複数→原形。cultivate/foster と同系。"
      },
      "admittedly": {
        "pos": "Adverb",
        "ja": "確かに(〜だが)",
        "tag": "接続副詞",
        "grammar": "譲歩の signpost。反対意見を一度認める文頭副詞。"
      },
      "career paths": {
        "pos": "Noun",
        "ja": "キャリアの道筋",
        "tag": "複数形"
      },
      "salaries": {
        "pos": "Noun",
        "ja": "給与",
        "tag": "複数形",
        "grammar": "higher starting salaries=初任給。複数の人・職を想定し複数。"
      },
      "nevertheless": {
        "pos": "Adverb",
        "ja": "それでもなお",
        "tag": "接続副詞",
        "grammar": "Admittedly の譲歩を打ち消し主張へ戻す。逆接の signpost。"
      },
      "adaptable": {
        "pos": "Adjective",
        "ja": "適応力のある",
        "grammar": "adaptable thinking=柔軟な思考。後ろの durable と呼応。"
      },
      "durable": {
        "pos": "Adjective",
        "ja": "長持ちする",
        "grammar": "prove more durable=より長持ちだと分かる。over a career が期間。"
      },
      "sharpening": {
        "pos": "Verb",
        "ja": "磨くこと",
        "tag": "動名詞",
        "grammar": "by sharpening=「磨くことによって」。前置詞 by の後は動名詞。"
      },
      "judgment": {
        "pos": "Noun",
        "ja": "判断(力)",
        "tag": "無冠詞・不可算",
        "grammar": "ethical judgment=倫理的判断。不可算で無冠詞。米綴り judgment。"
      },
      "profoundly": {
        "pos": "Adverb",
        "ja": "深く",
        "grammar": "profoundly relevant=深く意義がある。形容詞 relevant を強調。"
      },
      "obsolete": {
        "pos": "Adjective",
        "ja": "時代遅れの",
        "grammar": "far from being obsolete=「時代遅れどころか」。far from+動名詞で強い否定。"
      },
      "equips": {
        "pos": "Verb",
        "ja": "備えさせる",
        "tag": "語法 SVOC・三単現",
        "grammar": "equip O to do=Oに〜する力を備えさせる。主語 education が単数→equips。"
      },
      "thrive": {
        "pos": "Verb",
        "ja": "成功する、活躍する",
        "grammar": "thrive in〜=〜で生き生きとやっていく。in a changing world が場。"
      }
    },
    "vocab": [
      {
        "word": "cultivate",
        "pos": "Verb",
        "ipa": "/ˈkʌltɪveɪt/",
        "def": "to develop a skill, quality, or attitude over time",
        "example": "The Humanities cultivate critical thinking."
      },
      {
        "word": "assumption",
        "pos": "Noun",
        "ipa": "/əˈsʌmpʃən/",
        "def": "something you accept as true without proof",
        "example": "Philosophy and history train students to question assumptions."
      },
      {
        "word": "persuasively",
        "pos": "Adverb",
        "ipa": "/pərˈsweɪsɪvli/",
        "def": "in a way that makes someone believe or agree with you",
        "example": "The ability to write and argue persuasively is essential."
      },
      {
        "word": "foster",
        "pos": "Verb",
        "ipa": "/ˈfɔːstər/",
        "def": "to encourage the development of something good",
        "example": "The Humanities foster ethical awareness."
      },
      {
        "word": "obsolete",
        "pos": "Adjective",
        "ipa": "/ˌɒbsəˈliːt/",
        "def": "no longer used or useful because something newer exists",
        "example": "Far from being obsolete, such education equips people to thrive."
      },
      {
        "word": "durable",
        "pos": "Adjective",
        "ipa": "/ˈdʊrəbəl/",
        "def": "able to last a long time without weakening",
        "example": "The adaptable thinking gained from the Humanities often proves more durable."
      },
      {
        "word": "equip",
        "pos": "Verb",
        "ipa": "/ɪˈkwɪp/",
        "def": "to give someone the skills or qualities they need",
        "example": "Such education equips people to thrive in a rapidly changing world."
      },
      {
        "word": "thrive",
        "pos": "Verb",
        "ipa": "/θraɪv/",
        "def": "to grow, develop, or succeed strongly",
        "example": "Such education equips people to thrive in a rapidly changing world."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "理由を導く This is largely because",
        "example": "This is largely because subjects such as philosophy and history train students to question assumptions and weigh evidence.",
        "highlight": "This is largely because",
        "explain": "主張の直後に置いて根拠を述べる定型。largely=「主に」で断定を少し和らげつつ理由を明示する。because 以下は完全な文(主語+動詞)を続ける。"
      },
      {
        "no": 2,
        "title": "train O to do の使役的語法",
        "example": "subjects such as philosophy and history train students to question assumptions and weigh evidence",
        "highlight": "train students to question assumptions",
        "explain": "train O to do=「Oを〜するよう訓練する」。to question と (to) weigh が and で並列。force/encourage と同じく to 不定詞を取るタイプ。make が to を取らないのと対照的。"
      },
      {
        "no": 3,
        "title": "譲歩 Admittedly … Nevertheless … の二段構え",
        "example": "Admittedly, technical skills offer clearer career paths and higher starting salaries. Nevertheless, the adaptable thinking gained from the Humanities often proves more durable over an entire career.",
        "highlight": "Admittedly … Nevertheless",
        "explain": "Admittedly で反対意見を一度認め、Nevertheless で自分の主張に引き戻す。1級ライティングの説得力を生む反論処理の型。proves more durable は prove+形容詞=「〜だと判明する」の用法。"
      }
    ]
  },
  "21": {
    "glossary": {
      "decision": {
        "pos": "Noun",
        "ja": "決定",
        "tag": "冠詞 the",
        "grammar": "The decision to host=「開催するという決定」。to 不定詞が内容を限定するので the。"
      },
      "host": {
        "pos": "Verb",
        "ja": "主催する",
        "grammar": "host the Olympics=五輪を開催する。to host で decision の内容を説明。"
      },
      "olympics": {
        "pos": "Noun",
        "ja": "オリンピック",
        "tag": "複数形・冠詞 the",
        "grammar": "the Olympics=大会名は the+複数で固定。動詞は単数扱いも複数扱いもされる。"
      },
      "prompted": {
        "pos": "Verb",
        "ja": "引き起こした",
        "tag": "過去形",
        "grammar": "prompt debate=議論を呼ぶ。has prompted で「呼んできた」と現在完了。ここは過去形 prompted。"
      },
      "lively": {
        "pos": "Adjective",
        "ja": "活発な",
        "grammar": "lively debate=活発な議論。-ly で終わるが形容詞。副詞ではない点に注意。"
      },
      "debate": {
        "pos": "Noun",
        "ja": "議論",
        "tag": "無冠詞・不可算",
        "grammar": "debate about〜=〜についての議論。ここでは漠然とした議論で無冠詞。"
      },
      "weighed": {
        "pos": "Verb",
        "ja": "比較検討した",
        "tag": "過去分詞",
        "grammar": "Having weighed=完了分詞構文。「検討し終えて」と主節より前の動作を示す。"
      },
      "arguments": {
        "pos": "Noun",
        "ja": "論点、主張",
        "tag": "複数形・冠詞 the",
        "grammar": "the arguments=賛否両論という既知の論点群を指すので the+複数。"
      },
      "benefit": {
        "pos": "Verb",
        "ja": "恩恵を受ける",
        "grammar": "benefit from〜=〜から利益を得る。overall=「全体として」が副詞で挟まる。"
      },
      "overall": {
        "pos": "Adverb",
        "ja": "全体として",
        "grammar": "benefit overall=総合的に見れば得をする。文全体の評価を示す副詞。"
      },
      "staging": {
        "pos": "Verb",
        "ja": "開催すること",
        "tag": "動名詞",
        "grammar": "from staging this event=「開催することから」。前置詞 from の後は動名詞。host の言い換え。"
      },
      "stimulate": {
        "pos": "Verb",
        "ja": "刺激する、活性化する",
        "grammar": "stimulate the economy=経済を活性化する。定番コロケーション。主語 the Olympics は複数扱いで原形。"
      },
      "economy": {
        "pos": "Noun",
        "ja": "経済",
        "tag": "冠詞 the",
        "grammar": "the economy=その国の経済という特定対象なので the。経済全体を指す時は常に the。"
      },
      "largely because": {
        "pos": "Conjunction",
        "ja": "主に〜だから",
        "tag": "接続詞",
        "grammar": "This is largely because+文。理由を導く定型。largely が理由の比重を示す。"
      },
      "influx": {
        "pos": "Noun",
        "ja": "流入",
        "tag": "冠詞 the",
        "grammar": "the influx of tourists=「観光客の流入」。of 句で限定されるので the。an influx でも可だがここは特定の流入。"
      },
      "tourists": {
        "pos": "Noun",
        "ja": "観光客",
        "tag": "複数形・無冠詞",
        "grammar": "不特定多数の観光客なので無冠詞複数。"
      },
      "boosts": {
        "pos": "Verb",
        "ja": "押し上げる",
        "tag": "三単現",
        "grammar": "主語 the influx が単数→boosts。boost spending=支出を増やす。"
      },
      "spending": {
        "pos": "Noun",
        "ja": "支出",
        "tag": "無冠詞・不可算",
        "grammar": "spending は不可算→無冠詞。on hotels … が対象を示す。"
      },
      "host cities": {
        "pos": "Noun",
        "ja": "開催都市",
        "tag": "複数形",
        "grammar": "host cities=複数の開催都市を一般論で語るので無冠詞複数。host が名詞を修飾。"
      },
      "report": {
        "pos": "Verb",
        "ja": "報告する",
        "tag": "三単現なし",
        "grammar": "主語 host cities が複数→report(原形)。report a rise=増加を報告する。"
      },
      "visitor numbers": {
        "pos": "Noun",
        "ja": "来場者数",
        "tag": "複数形"
      },
      "supports": {
        "pos": "Verb",
        "ja": "支える",
        "tag": "三単現",
        "grammar": "関係詞 which の先行詞 a sharp rise が単数→supports。"
      },
      "businesses": {
        "pos": "Noun",
        "ja": "企業、商店",
        "tag": "複数形",
        "grammar": "business が「商売」なら不可算だが「企業」の意では可算→local businesses と複数。"
      },
      "accelerate": {
        "pos": "Verb",
        "ja": "加速させる",
        "grammar": "accelerate infrastructure development=整備を加速する。主語 The Games が複数扱いで原形。"
      },
      "infrastructure": {
        "pos": "Noun",
        "ja": "インフラ",
        "tag": "無冠詞・不可算",
        "grammar": "infrastructure は常に不可算→無冠詞。複数形 infrastructures は通例避ける。"
      },
      "development": {
        "pos": "Noun",
        "ja": "開発、整備",
        "tag": "無冠詞・不可算"
      },
      "deadline": {
        "pos": "Noun",
        "ja": "締め切り",
        "tag": "冠詞 the",
        "grammar": "the deadline=開催という特定の期限なので the。"
      },
      "pressures": {
        "pos": "Verb",
        "ja": "圧力をかける",
        "tag": "語法 SVOC・三単現",
        "grammar": "pressure O to do=Oに〜するよう迫る。主語 the deadline が単数→pressures。"
      },
      "modernize": {
        "pos": "Verb",
        "ja": "近代化する",
        "grammar": "to modernize stadiums=施設を近代化するよう。pressures O to do の to do 部分。"
      },
      "stadiums": {
        "pos": "Noun",
        "ja": "競技場",
        "tag": "複数形"
      },
      "railways": {
        "pos": "Noun",
        "ja": "鉄道",
        "tag": "複数形"
      },
      "facilities": {
        "pos": "Noun",
        "ja": "施設",
        "tag": "複数形",
        "grammar": "public facilities=公共施設。複数の施設を指すので複数。"
      },
      "transport networks": {
        "pos": "Noun",
        "ja": "交通網",
        "tag": "複数形"
      },
      "residents": {
        "pos": "Noun",
        "ja": "住民",
        "tag": "複数形・無冠詞",
        "grammar": "serve residents=住民の役に立つ。不特定多数で無冠詞複数。"
      },
      "closing ceremony": {
        "pos": "Noun",
        "ja": "閉会式",
        "tag": "冠詞 the",
        "grammar": "the closing ceremony=その大会の唯一の閉会式なので the。"
      },
      "enhances": {
        "pos": "Verb",
        "ja": "高める",
        "tag": "三単現・動名詞主語",
        "grammar": "hosting enhances=動名詞 hosting が単数主語→enhances。enhance prestige=威信を高める。"
      },
      "prestige": {
        "pos": "Noun",
        "ja": "威信、名声",
        "tag": "無冠詞・不可算",
        "grammar": "prestige は不可算→無冠詞。national prestige で「国の威信」。"
      },
      "welcoming": {
        "pos": "Verb",
        "ja": "迎えること",
        "tag": "動名詞",
        "grammar": "welcoming athletes … strengthens=動名詞句が主語。「迎えることが〜を強める」。"
      },
      "athletes": {
        "pos": "Noun",
        "ja": "選手",
        "tag": "複数形"
      },
      "spectators": {
        "pos": "Noun",
        "ja": "観客",
        "tag": "複数形"
      },
      "strengthens": {
        "pos": "Verb",
        "ja": "強める",
        "tag": "三単現",
        "grammar": "動名詞主語 welcoming … は単数扱い→strengthens。"
      },
      "goodwill": {
        "pos": "Noun",
        "ja": "好意、親善",
        "tag": "無冠詞・不可算",
        "grammar": "goodwill は不可算→無冠詞。international goodwill で「国際的な親善」。"
      },
      "coverage": {
        "pos": "Noun",
        "ja": "報道",
        "tag": "無冠詞・不可算",
        "grammar": "media coverage は不可算→無冠詞。positive が修飾。"
      },
      "attract": {
        "pos": "Verb",
        "ja": "引き寄せる",
        "grammar": "attract tourism and investment=観光と投資を呼び込む。can attract で可能性。"
      },
      "tourism": {
        "pos": "Noun",
        "ja": "観光(業)",
        "tag": "無冠詞・不可算",
        "grammar": "tourism は不可算→無冠詞。tourist(可算)と区別。"
      },
      "investment": {
        "pos": "Noun",
        "ja": "投資",
        "tag": "無冠詞・不可算",
        "grammar": "foreign investment は不可算→無冠詞。an investment は「一件の投資」と可算化。"
      },
      "involve": {
        "pos": "Verb",
        "ja": "伴う",
        "tag": "三単現なし",
        "grammar": "主語 the Olympics が複数扱い→involve。involve costs=費用を伴う。"
      },
      "costs": {
        "pos": "Noun",
        "ja": "費用",
        "tag": "複数形",
        "grammar": "複数項目の出費を指すので複数。enormous が量を強める。"
      },
      "venues": {
        "pos": "Noun",
        "ja": "会場",
        "tag": "複数形",
        "grammar": "unused venues=使われない会場。複数の施設を想定し複数。"
      },
      "careful planning": {
        "pos": "Noun",
        "ja": "入念な計画",
        "tag": "無冠詞・不可算",
        "grammar": "planning は不可算→無冠詞。careful が修飾。"
      },
      "repurpose": {
        "pos": "Verb",
        "ja": "転用する",
        "grammar": "repurpose facilities=施設を別用途に転用する。can repurpose で可能性を示す。"
      },
      "long-term": {
        "pos": "Adjective",
        "ja": "長期的な",
        "tag": "冠詞 the",
        "grammar": "the long-term gains=長期的利益。形容詞で gains を修飾、特定の利益で the。"
      },
      "gains": {
        "pos": "Noun",
        "ja": "利益",
        "tag": "複数形",
        "grammar": "複数の便益を指すので複数。outweigh の主語。"
      },
      "outweigh": {
        "pos": "Verb",
        "ja": "上回る",
        "tag": "三単現なし",
        "grammar": "主語 gains が複数→outweigh。outweigh the expense=費用を上回る。利点比較の鉄板表現。"
      },
      "expense": {
        "pos": "Noun",
        "ja": "出費",
        "tag": "冠詞 the・不可算",
        "grammar": "the short-term expense=短期の出費。ここでは不可算的にまとめて the。"
      },
      "stimulus": {
        "pos": "Noun",
        "ja": "刺激",
        "tag": "無冠詞・不可算",
        "grammar": "economic stimulus=経済刺激。ラテン語系で不可算扱い、無冠詞。"
      },
      "heightened": {
        "pos": "Adjective",
        "ja": "高まった",
        "tag": "過去分詞",
        "grammar": "heightened prestige=高まった威信。heighten の過去分詞が形容詞化。"
      },
      "substantial": {
        "pos": "Adjective",
        "ja": "かなりの",
        "grammar": "substantial advantages=相当な利点。量・程度の大きさを示す硬めの語。"
      },
      "considerable": {
        "pos": "Adjective",
        "ja": "相当な",
        "grammar": "considerable costs=相当な費用。substantial と同系で量の多さを表す。"
      },
      "stands to": {
        "pos": "Verb",
        "ja": "〜する見込みだ",
        "tag": "句動詞",
        "grammar": "stand to benefit=利益を得る見込みだ。stand to do で「〜しそうだ」。"
      }
    },
    "vocab": [
      {
        "word": "influx",
        "pos": "Noun",
        "ipa": "/ˈɪnflʌks/",
        "def": "the arrival of a large number of people or things",
        "example": "The influx of tourists boosts spending on hotels and restaurants."
      },
      {
        "word": "accelerate",
        "pos": "Verb",
        "ipa": "/əkˈseləreɪt/",
        "def": "to make something happen faster or sooner",
        "example": "The Games accelerate infrastructure development."
      },
      {
        "word": "modernize",
        "pos": "Verb",
        "ipa": "/ˈmɒdərnaɪz/",
        "def": "to make something more modern or up to date",
        "example": "The deadline pressures governments to modernize stadiums and railways."
      },
      {
        "word": "prestige",
        "pos": "Noun",
        "ipa": "/preˈstiːʒ/",
        "def": "respect and admiration given to someone or something",
        "example": "Hosting enhances national prestige."
      },
      {
        "word": "goodwill",
        "pos": "Noun",
        "ipa": "/ˌɡʊdˈwɪl/",
        "def": "a feeling of friendliness and approval toward others",
        "example": "Welcoming athletes from around the world strengthens international goodwill."
      },
      {
        "word": "repurpose",
        "pos": "Verb",
        "ipa": "/ˌriːˈpɜːrpəs/",
        "def": "to use something for a different purpose than intended",
        "example": "Careful planning can repurpose these facilities."
      },
      {
        "word": "outweigh",
        "pos": "Verb",
        "ipa": "/ˌaʊtˈweɪ/",
        "def": "to be greater or more important than something else",
        "example": "The long-term gains generally outweigh the short-term expense."
      },
      {
        "word": "venue",
        "pos": "Noun",
        "ipa": "/ˈvenjuː/",
        "def": "a place where an event or activity happens",
        "example": "The Olympics involve enormous costs and the risk of unused venues."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "完了分詞構文 Having + 過去分詞",
        "example": "Having weighed the arguments, I agree that Japan will benefit overall from staging this global event.",
        "highlight": "Having weighed the arguments",
        "explain": "Having+過去分詞=主節より前に完了した動作を示す分詞構文。「論点を検討し終えた上で」。導入文で立場を述べる前の前置きとして使うと論理的に見える。主語(I)は主節と一致させる。"
      },
      {
        "no": 2,
        "title": "理由づけ This is largely because",
        "example": "This is largely because the influx of tourists boosts spending on hotels, restaurants, and transportation.",
        "highlight": "This is largely because",
        "explain": "各段落の主張文の後ろで根拠を導く定型。largely=「主として」で理由の比重を示す。because の後は完全文。First/Second/Finally の各論拠に繰り返し使われるテンプレ。"
      },
      {
        "no": 3,
        "title": "譲歩 Admittedly … Nevertheless … と outweigh",
        "example": "Admittedly, the Olympics involve enormous costs and the risk of unused venues. Nevertheless, careful planning can repurpose these facilities, and the long-term gains generally outweigh the short-term expense.",
        "highlight": "the long-term gains generally outweigh the short-term expense",
        "explain": "Admittedly で短所を認め Nevertheless で反論する譲歩の型。締めに outweigh(A が B を上回る)を使い「利点>欠点」を明言する。利益比較を一語で示せるため賛成意見の結論で多用される。"
      }
    ]
  },
  "22": {
    "glossary": {
      "commentators": {
        "pos": "Noun",
        "ja": "評論家、論者",
        "tag": "複数形・無冠詞",
        "grammar": "Some commentators=「一部の論者」。不特定の複数なので無冠詞複数。Some が数を漠然と示す。"
      },
      "urge": {
        "pos": "Verb",
        "ja": "強く促す",
        "tag": "語法 SVOC・三単現なし",
        "grammar": "urge O to do=Oに〜するよう促す。主語 commentators が複数→urge(原形)。to reconsider が促す内容。"
      },
      "reconsider": {
        "pos": "Verb",
        "ja": "見直す、再考する",
        "grammar": "reconsider its alliance=同盟を見直す。urge O to do の to do 部分。"
      },
      "long-standing": {
        "pos": "Adjective",
        "ja": "長年の",
        "grammar": "long-standing alliance=長年の同盟。複合形容詞で alliance を修飾。"
      },
      "alliance": {
        "pos": "Noun",
        "ja": "同盟",
        "tag": "所有格",
        "grammar": "its alliance with the United States=日本の同盟という特定対象。所有格 its で限定。"
      },
      "reflection": {
        "pos": "Noun",
        "ja": "熟考",
        "tag": "無冠詞・不可算",
        "grammar": "After careful reflection=「熟考の末」。reflection は不可算→無冠詞。前置きの定型句。"
      },
      "maintain": {
        "pos": "Verb",
        "ja": "維持する",
        "grammar": "maintain this relationship=関係を維持する。rather than rethink と対比される。"
      },
      "rather than": {
        "pos": "Conjunction",
        "ja": "〜よりむしろ",
        "tag": "接続詞",
        "grammar": "maintain … rather than rethink=「見直すよりむしろ維持する」。rather than の後は原形で並列。"
      },
      "rethink": {
        "pos": "Verb",
        "ja": "考え直す",
        "grammar": "fundamentally rethink it=抜本的に考え直す。rather than の後で原形のまま。"
      },
      "provides": {
        "pos": "Verb",
        "ja": "提供する",
        "tag": "三単現",
        "grammar": "主語 the alliance が単数→provides。provide security=安全を提供する。"
      },
      "essential": {
        "pos": "Adjective",
        "ja": "不可欠な",
        "grammar": "essential security=不可欠な安全保障。名詞 security を前から修飾。"
      },
      "security": {
        "pos": "Noun",
        "ja": "安全保障",
        "tag": "無冠詞・不可算",
        "grammar": "security は不可算→無冠詞。essential が修飾しても冠詞は付けない。"
      },
      "tensions": {
        "pos": "Noun",
        "ja": "緊張",
        "tag": "複数形",
        "grammar": "regional tensions=地域の緊張。複数の緊張要因を指すので複数。tension は不可算でもこの語義では複数可。"
      },
      "unstable": {
        "pos": "Adjective",
        "ja": "不安定な",
        "grammar": "an unstable neighborhood=不安定な近隣。母音前なので a でなく an。"
      },
      "neighborhood": {
        "pos": "Noun",
        "ja": "近隣、周辺地域",
        "tag": "冠詞 an",
        "grammar": "an unstable neighborhood=「ある不安定な周辺」。初出の可算名詞で an。米綴り neighborhood。"
      },
      "pose": {
        "pos": "Verb",
        "ja": "(脅威などを)もたらす",
        "tag": "三単現なし",
        "grammar": "pose a threat=脅威となる。主語 tensions and a neighborhood が複数→pose(原形)。定番コロケーション。"
      },
      "threat": {
        "pos": "Noun",
        "ja": "脅威",
        "tag": "冠詞 a",
        "grammar": "a serious threat=「ある深刻な脅威」。可算で初出なので a。pose a threat で固定。"
      },
      "guarantee": {
        "pos": "Noun",
        "ja": "保証",
        "tag": "冠詞 the",
        "grammar": "the American security guarantee=特定の安全保障の保証なので the。"
      },
      "deters": {
        "pos": "Verb",
        "ja": "抑止する",
        "tag": "三単現",
        "grammar": "主語 the guarantee が単数→deters。deter aggressors=侵略者を思いとどまらせる。"
      },
      "aggressors": {
        "pos": "Noun",
        "ja": "侵略者",
        "tag": "複数形・無冠詞",
        "grammar": "potential aggressors=潜在的侵略者。不特定多数で無冠詞複数。"
      },
      "confront": {
        "pos": "Verb",
        "ja": "立ち向かう",
        "grammar": "confront alone=単独で対峙する。could not confront で「対処できないだろう」。"
      },
      "partnership": {
        "pos": "Noun",
        "ja": "協力関係",
        "tag": "冠詞 the",
        "grammar": "the partnership=前述の alliance の言い換え。既出の特定関係なので the。"
      },
      "trading partners": {
        "pos": "Noun",
        "ja": "貿易相手国",
        "tag": "複数形",
        "grammar": "one of Japan's largest trading partners=最大級の貿易相手の一つ。one of+複数の型。"
      },
      "source": {
        "pos": "Noun",
        "ja": "供給源",
        "tag": "冠詞 a",
        "grammar": "a key source of investment=投資の重要な供給源。a source of〜の型。"
      },
      "cooperation": {
        "pos": "Noun",
        "ja": "協力",
        "tag": "無冠詞・不可算",
        "grammar": "close cooperation=緊密な協力。cooperation は不可算→無冠詞。"
      },
      "supply chains": {
        "pos": "Noun",
        "ja": "サプライチェーン",
        "tag": "複数形",
        "grammar": "stable supply chains=安定した供給網。複数の連鎖を指すので複数。"
      },
      "vital markets": {
        "pos": "Noun",
        "ja": "不可欠な市場",
        "tag": "複数形",
        "grammar": "access to vital markets=重要市場へのアクセス。複数の市場で複数。"
      },
      "values": {
        "pos": "Noun",
        "ja": "価値観",
        "tag": "複数形",
        "grammar": "fundamental values=基本的価値観。複数の理念を指すので複数。value(価値)とは語義が別。"
      },
      "democracy": {
        "pos": "Noun",
        "ja": "民主主義",
        "tag": "無冠詞・不可算",
        "grammar": "democracy は制度・理念として不可算→無冠詞。"
      },
      "rule of law": {
        "pos": "Noun",
        "ja": "法の支配",
        "tag": "冠詞 the",
        "grammar": "the rule of law=「法の支配」。of 句で限定される定型句で the 固定。"
      },
      "common ground": {
        "pos": "Noun",
        "ja": "共通点、共通の基盤",
        "tag": "無冠詞・不可算",
        "grammar": "this common ground=この共通基盤。ground はこの語義で不可算、指示詞 this で限定。"
      },
      "enables": {
        "pos": "Verb",
        "ja": "可能にする",
        "tag": "語法 SVOC・三単現",
        "grammar": "enable O to do=Oが〜できるようにする。主語 common ground が単数→enables。"
      },
      "coordinate": {
        "pos": "Verb",
        "ja": "協調する",
        "tag": "句動詞",
        "grammar": "coordinate on issues=問題で協調する。on とセット。enable O to do の to do 部分。"
      },
      "ranging from": {
        "pos": "Verb",
        "ja": "〜に及ぶ",
        "tag": "句動詞・現在分詞",
        "grammar": "ranging from A to B=AからBに及ぶ。issues を後置修飾する分詞句。range from … to の形。"
      },
      "diplomatic": {
        "pos": "Adjective",
        "ja": "外交的な",
        "grammar": "joint diplomatic efforts=共同の外交努力。efforts を修飾。"
      },
      "efforts": {
        "pos": "Noun",
        "ja": "取り組み、努力",
        "tag": "複数形",
        "grammar": "joint efforts=共同の取り組み。具体的な複数の取り組みなので複数。"
      },
      "carry weight": {
        "pos": "Verb",
        "ja": "重みを持つ、影響力がある",
        "tag": "句動詞・無冠詞",
        "grammar": "carry weight=重みがある。weight はこの慣用句で不可算・無冠詞。far greater が程度を強める。"
      },
      "isolation": {
        "pos": "Noun",
        "ja": "孤立",
        "tag": "無冠詞・不可算",
        "grammar": "in isolation=単独で。isolation は不可算→無冠詞。alone の硬い言い換え。"
      },
      "friction": {
        "pos": "Noun",
        "ja": "摩擦、軋轢",
        "tag": "無冠詞・不可算",
        "grammar": "not without friction=摩擦がないわけではない。friction はこの語義で不可算→無冠詞。"
      },
      "basing": {
        "pos": "Noun",
        "ja": "駐留、配置",
        "tag": "動名詞・冠詞 the",
        "grammar": "the basing of troops=軍の駐留。動名詞が of 句で限定され the。"
      },
      "troops": {
        "pos": "Noun",
        "ja": "軍隊、部隊",
        "tag": "複数形",
        "grammar": "troops は常に複数形で「軍隊」。a troop は単位の「一隊」で語義が異なる。"
      },
      "disputes": {
        "pos": "Noun",
        "ja": "紛争、対立",
        "tag": "複数形",
        "grammar": "such disputes=そうした対立。前述の friction を受け複数の事案として複数。"
      },
      "managed": {
        "pos": "Verb",
        "ja": "処理される",
        "tag": "受動・過去分詞",
        "grammar": "can be managed=処理されうる。be+過去分詞で受動態。主語 disputes が動作の対象。"
      },
      "dialogue": {
        "pos": "Noun",
        "ja": "対話",
        "tag": "無冠詞・不可算",
        "grammar": "through dialogue=対話を通じて。dialogue はこの語義で不可算→無冠詞。"
      },
      "discarding": {
        "pos": "Verb",
        "ja": "捨てること",
        "tag": "動名詞",
        "grammar": "without discarding the alliance=同盟を捨てることなく。前置詞 without の後は動名詞。"
      },
      "contributions": {
        "pos": "Noun",
        "ja": "貢献",
        "tag": "複数形",
        "grammar": "its contributions to security … =安全保障などへの諸貢献。複数分野への貢献で複数。"
      },
      "prosperity": {
        "pos": "Noun",
        "ja": "繁栄",
        "tag": "無冠詞・不可算",
        "grammar": "prosperity は不可算→無冠詞。security, prosperity, values の三本柱の一つ。"
      },
      "shared values": {
        "pos": "Noun",
        "ja": "共有された価値観",
        "tag": "複数形・過去分詞",
        "grammar": "shared=共有された(過去分詞の形容詞用法)。values が複数なので複数。"
      },
      "remains": {
        "pos": "Verb",
        "ja": "〜のままである",
        "tag": "三単現",
        "grammar": "主語 the alliance が単数→remains。remain in one の interest=利益にかなったままだ。"
      },
      "interest": {
        "pos": "Noun",
        "ja": "利益",
        "tag": "所有格",
        "grammar": "in Japan's interest=日本の利益にかなう。所有格で限定、慣用的に単数。"
      },
      "abandoning": {
        "pos": "Verb",
        "ja": "放棄すること",
        "tag": "動名詞",
        "grammar": "Rather than abandoning=放棄するよりむしろ。rather than の後の動名詞。文頭でも使える。"
      },
      "strengthen": {
        "pos": "Verb",
        "ja": "強化する",
        "grammar": "work to strengthen it=それを強化すべく努める。work to do で「〜しようと努力する」。"
      }
    },
    "vocab": [
      {
        "word": "reconsider",
        "pos": "Verb",
        "ipa": "/ˌriːkənˈsɪdər/",
        "def": "to think about a decision or opinion again",
        "example": "Some commentators urge Japan to reconsider its long-standing alliance."
      },
      {
        "word": "deter",
        "pos": "Verb",
        "ipa": "/dɪˈtɜːr/",
        "def": "to make someone decide not to do something, usually by fear",
        "example": "The American security guarantee deters potential aggressors."
      },
      {
        "word": "aggressor",
        "pos": "Noun",
        "ipa": "/əˈɡresər/",
        "def": "a person or country that attacks first without being provoked",
        "example": "The guarantee deters potential aggressors that Japan could not confront alone."
      },
      {
        "word": "coordinate",
        "pos": "Verb",
        "ipa": "/koʊˈɔːrdɪneɪt/",
        "def": "to work together with others in an organized way",
        "example": "This common ground enables them to coordinate on global issues."
      },
      {
        "word": "friction",
        "pos": "Noun",
        "ipa": "/ˈfrɪkʃən/",
        "def": "disagreement or tension between people or groups",
        "example": "The relationship is not without friction, particularly over the basing of troops."
      },
      {
        "word": "dialogue",
        "pos": "Noun",
        "ipa": "/ˈdaɪəlɔːɡ/",
        "def": "a discussion aimed at solving a problem or reaching agreement",
        "example": "Such disputes can be managed through dialogue."
      },
      {
        "word": "discard",
        "pos": "Verb",
        "ipa": "/dɪsˈkɑːrd/",
        "def": "to get rid of something you no longer want",
        "example": "Disputes can be managed without discarding the alliance itself."
      },
      {
        "word": "abandon",
        "pos": "Verb",
        "ipa": "/əˈbændən/",
        "def": "to leave or give up something completely",
        "example": "Rather than abandoning this partnership, Japan should work to strengthen it."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "maintain A rather than B の対比",
        "example": "I believe Japan should maintain this relationship rather than fundamentally rethink it.",
        "highlight": "maintain this relationship rather than fundamentally rethink it",
        "explain": "rather than は「BよりむしろA」。前後の動詞は同じ形(ここは原形 maintain / rethink)で揃える。立場表明文で「現状維持 vs 変更」の二択を一文で示せる便利な型。it は this relationship を指す。"
      },
      {
        "no": 2,
        "title": "後置修飾 ranging from A to B",
        "example": "this common ground enables them to coordinate on global issues ranging from trade rules to climate policy",
        "highlight": "ranging from trade rules to climate policy",
        "explain": "ranging from … to … は直前の名詞(issues)を後ろから説明する分詞句。「貿易ルールから気候政策まで及ぶ」と範囲を例示する。which range … の関係詞を分詞に縮めた形で、具体例を簡潔に盛り込める。"
      },
      {
        "no": 3,
        "title": "受動態 + 譲歩からの主張",
        "example": "Admittedly, the relationship is not without friction, particularly over the basing of troops. Nevertheless, such disputes can be managed through dialogue without discarding the alliance itself.",
        "highlight": "such disputes can be managed through dialogue",
        "explain": "can be managed は can be+過去分詞の受動態で「処理されうる」。動作主より対象(disputes)を主語に立てたい時に使う。Admittedly で摩擦を認め Nevertheless で反論する譲歩構文と組み合わせ、欠点を処理可能と示して主張を補強している。"
      }
    ]
  },
  "23": {
    "glossary": {
      "freedom of speech": {
        "pos": "Noun",
        "ja": "言論の自由",
        "tag": "無冠詞・不可算",
        "grammar": "freedom は抽象名詞で不可算→無冠詞。of speech が限定しても the は付けず freedom of speech で固定。speech も「話すこと」の意では不可算。"
      },
      "rightly": {
        "pos": "Adverb",
        "ja": "当然に、正しく",
        "tag": "副詞",
        "grammar": "right(形)+ -ly。is rightly regarded で「当然〜とみなされている」。受動態の動詞を修飾し話者の評価を添える。"
      },
      "regarded": {
        "pos": "Verb",
        "ja": "〜とみなされる",
        "tag": "受動・語法 SVOC",
        "grammar": "regard A as B の受動形 A is regarded as B。as を落とさない。be considered と違い regard は as 必須。"
      },
      "cornerstone": {
        "pos": "Noun",
        "ja": "礎、基盤",
        "tag": "冠詞 a",
        "grammar": "a cornerstone of democracy。「礎の一つ」として可算・初出で a。比喩的に「最も重要な土台」を指す定番表現。"
      },
      "democracy": {
        "pos": "Noun",
        "ja": "民主主義",
        "tag": "無冠詞・不可算",
        "grammar": "制度・概念としての民主主義は不可算→無冠詞。a democracy なら「一つの民主国家」と可算化する。"
      },
      "convinced": {
        "pos": "Adjective",
        "ja": "確信して",
        "tag": "受動・語法",
        "grammar": "be convinced that SV で「〜と確信している」。convince(説得する)の過去分詞が形容詞化。後ろに that 節。"
      },
      "restrictions": {
        "pos": "Noun",
        "ja": "制限",
        "tag": "複数形",
        "grammar": "restriction は数えられる「個々の制限」。複数の制限を総称するので複数形。restrictions on 〜 で「〜に対する制限」。"
      },
      "freedom": {
        "pos": "Noun",
        "ja": "自由",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算。ここでは this freedom と this が付き既出の自由を特定している。"
      },
      "circumstances": {
        "pos": "Noun",
        "ja": "状況、事情",
        "tag": "複数形",
        "grammar": "通例複数形 circumstances で「状況」。in certain circumstances=「ある状況下では」。in the circumstances との使い分けに注意。"
      },
      "justified": {
        "pos": "Verb",
        "ja": "正当化される",
        "tag": "受動",
        "grammar": "justify(正当化する)の受動 be justified=「正当化されうる」。can be justified で「正当化されうる」と可能性を示す。"
      },
      "limits": {
        "pos": "Noun",
        "ja": "制限",
        "tag": "複数形",
        "grammar": "limit は可算。複数の制限措置を指すので複数。restrictions の言い換えとして反復を避ける役割。"
      },
      "necessary": {
        "pos": "Adjective",
        "ja": "必要な",
        "tag": "形容詞",
        "grammar": "be necessary to do で「〜するために必要」。necessary は人を主語に取れず it/物が主語。"
      },
      "prevent": {
        "pos": "Verb",
        "ja": "防ぐ",
        "tag": "語法",
        "grammar": "prevent O (from) doing が基本だが、prevent direct harm のように名詞も目的語に取る。「未然に防ぐ」。"
      },
      "direct": {
        "pos": "Adjective",
        "ja": "直接の",
        "tag": "形容詞",
        "grammar": "direct harm で「直接的な危害」。harm を限定し、間接的でない切迫した害を指す。"
      },
      "harm": {
        "pos": "Noun",
        "ja": "危害、害",
        "tag": "無冠詞・不可算",
        "grammar": "harm は不可算→無冠詞。do harm / cause harm の形で使う。a harm とは言わない。"
      },
      "largely": {
        "pos": "Adverb",
        "ja": "主に、大部分は",
        "tag": "副詞",
        "grammar": "This is largely because 〜=「これは主に〜だからだ」。理由の中心を示す談話標識。mainly に近い。"
      },
      "incites": {
        "pos": "Verb",
        "ja": "扇動する",
        "tag": "三単現",
        "grammar": "speech that incites violence。先行詞 speech(三人称単数)を受け関係詞内の動詞に -s。incite O to do の形もある。"
      },
      "violence": {
        "pos": "Noun",
        "ja": "暴力",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。incite violence で「暴力を扇動する」。a violence とは言わない。"
      },
      "endanger": {
        "pos": "Verb",
        "ja": "危険にさらす",
        "tag": "語法",
        "grammar": "endanger O で他動詞。en-(〜にする)+ danger。endangered species(絶滅危惧種)でも頻出。"
      },
      "innocent": {
        "pos": "Adjective",
        "ja": "無実の、罪のない",
        "tag": "形容詞",
        "grammar": "innocent lives で「罪なき命」。limit O の名詞を限定。法的文脈では「無罪の」の意も。"
      },
      "calls": {
        "pos": "Noun",
        "ja": "呼びかけ",
        "tag": "複数形・語法",
        "grammar": "calls to attack で「攻撃の呼びかけ」。call to do=「〜せよという呼びかけ」。複数の扇動例を指すので複数形。"
      },
      "attack": {
        "pos": "Verb",
        "ja": "攻撃する",
        "tag": "不定詞",
        "grammar": "calls to attack の to attack は名詞 call を修飾する不定詞。「攻撃するための呼びかけ」。"
      },
      "particular": {
        "pos": "Adjective",
        "ja": "特定の",
        "tag": "形容詞",
        "grammar": "a particular group で「ある特定の集団」。漠然とでなく具体的対象を示す。"
      },
      "historically": {
        "pos": "Adverb",
        "ja": "歴史的に",
        "tag": "副詞",
        "grammar": "have historically triggered で現在完了を修飾。「歴史上繰り返し〜してきた」と過去から現在への継続を示す。"
      },
      "triggered": {
        "pos": "Verb",
        "ja": "引き起こした",
        "tag": "過去分詞",
        "grammar": "have triggered で現在完了。trigger=「(連鎖反応的に)引き起こす」。riots を目的語に取る他動詞。"
      },
      "riots": {
        "pos": "Noun",
        "ja": "暴動",
        "tag": "複数形",
        "grammar": "riot は可算。複数の暴動を指すので複数形。massacres と並列され「暴動や虐殺」。"
      },
      "massacres": {
        "pos": "Noun",
        "ja": "虐殺",
        "tag": "複数形",
        "grammar": "massacre は可算。複数事例を指すため複数形。riots and even massacres で害の深刻さを段階的に強調。"
      },
      "responsible": {
        "pos": "Adjective",
        "ja": "責任ある、良識ある",
        "tag": "形容詞",
        "grammar": "no responsible society で「良識ある社会なら(どこも)〜しない」。否定の no + 形容詞 + 名詞で全称否定。"
      },
      "tolerate": {
        "pos": "Verb",
        "ja": "容認する",
        "tag": "語法",
        "grammar": "should tolerate で他動詞。tolerate doing も可。「我慢して受け入れる」のニュアンス。"
      },
      "protect": {
        "pos": "Verb",
        "ja": "守る",
        "tag": "三単現",
        "grammar": "restrictions protect dignity。主語が複数 restrictions なので原形 protect(-s なし)。protect O from 〜 の形も頻出。"
      },
      "dignity": {
        "pos": "Noun",
        "ja": "尊厳",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。individual dignity / human dignity の形で使う。"
      },
      "hate speech": {
        "pos": "Noun",
        "ja": "ヘイトスピーチ",
        "tag": "無冠詞・不可算",
        "grammar": "speech が不可算なので hate speech も無冠詞・不可算。slander と並列で「ヘイトスピーチや中傷」。"
      },
      "slander": {
        "pos": "Noun",
        "ja": "中傷、誹謗",
        "tag": "無冠詞・不可算",
        "grammar": "口頭の名誉毀損で不可算→無冠詞。書面は libel。ここでは hate speech と並べ害の種類を列挙。"
      },
      "inflict": {
        "pos": "Verb",
        "ja": "(損害を)与える",
        "tag": "語法",
        "grammar": "inflict A on B=「BにAを負わせる」。inflict damage on people の形。harm/pain など好ましくない物に使う。"
      },
      "lasting": {
        "pos": "Adjective",
        "ja": "永続的な",
        "tag": "現在分詞",
        "grammar": "last(続く)の現在分詞が形容詞化。lasting damage で「長く残る損害」。能動的に「続いている」意味。"
      },
      "psychological": {
        "pos": "Adjective",
        "ja": "心理的な",
        "tag": "形容詞",
        "grammar": "psychological damage で「精神的損害」。physical(身体的)との対比で使われることが多い。"
      },
      "vulnerable": {
        "pos": "Adjective",
        "ja": "弱い立場の、傷つきやすい",
        "tag": "形容詞",
        "grammar": "vulnerable people で「傷つきやすい人々」。vulnerable to 〜=「〜に弱い」の形もある。"
      },
      "relentless": {
        "pos": "Adjective",
        "ja": "容赦ない、絶え間ない",
        "tag": "形容詞",
        "grammar": "relentless online abuse で「絶え間ないオンライン上の攻撃」。止まらず手加減のない様子。"
      },
      "abuse": {
        "pos": "Noun",
        "ja": "罵倒、虐待",
        "tag": "無冠詞・不可算",
        "grammar": "言葉の攻撃の意では不可算→無冠詞。online abuse で「ネット上の誹謗中傷」。動詞 abuse は発音が異なる。"
      },
      "despair": {
        "pos": "Noun",
        "ja": "絶望",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。drive O to despair=「Oを絶望に追い込む」。to の後でも冠詞なし。"
      },
      "demonstrating": {
        "pos": "Verb",
        "ja": "示しながら",
        "tag": "分詞構文",
        "grammar": "分詞構文。前文全体を受け「そのことが〜を示している」。, demonstrating that SV で結論を添える定型。"
      },
      "unlimited": {
        "pos": "Adjective",
        "ja": "無制限の",
        "tag": "形容詞",
        "grammar": "un-(否定)+ limited。unlimited speech で「制限のない言論」。limits を取り去った状態を指す。"
      },
      "genuine": {
        "pos": "Adjective",
        "ja": "本物の、真の",
        "tag": "形容詞",
        "grammar": "genuine suffering で「本物の苦しみ」。「見せかけでない」を強調。real の格調高い言い換え。"
      },
      "suffering": {
        "pos": "Noun",
        "ja": "苦しみ",
        "tag": "無冠詞・不可算",
        "grammar": "suffer(苦しむ)の動名詞由来の名詞。抽象的な苦痛は不可算→無冠詞。cause suffering の形。"
      },
      "safeguard": {
        "pos": "Verb",
        "ja": "保護する、守る",
        "tag": "語法",
        "grammar": "safeguard O で他動詞。safe + guard。protect の堅い言い換え。public order を目的語に取る。"
      },
      "public order": {
        "pos": "Noun",
        "ja": "公共の秩序",
        "tag": "無冠詞・不可算",
        "grammar": "order(秩序)は不可算→無冠詞。public が限定しても the は不要。「治安・秩序」の定型句。"
      },
      "misinformation": {
        "pos": "Noun",
        "ja": "誤情報",
        "tag": "無冠詞・不可算",
        "grammar": "information が不可算なので mis- が付いても不可算→無冠詞。dangerous misinformation で「危険なデマ」。"
      },
      "community": {
        "pos": "Noun",
        "ja": "地域社会、共同体",
        "tag": "冠詞 the",
        "grammar": "the entire community で「地域社会全体」。話者と読者が共有する特定の共同体なので the。"
      },
      "rumors": {
        "pos": "Noun",
        "ja": "噂、デマ",
        "tag": "複数形",
        "grammar": "rumor は可算。複数のデマを指すので複数形。false rumors で「事実無根の噂」。"
      },
      "panic": {
        "pos": "Noun",
        "ja": "パニック、恐慌",
        "tag": "無冠詞・不可算",
        "grammar": "感情・状態としては不可算→無冠詞。trigger panic で「パニックを引き起こす」。"
      },
      "reasonable": {
        "pos": "Adjective",
        "ja": "妥当な、合理的な",
        "tag": "形容詞",
        "grammar": "reasonable controls で「理にかなった規制」。過剰でなく筋の通った程度を示す。"
      },
      "silence": {
        "pos": "Verb",
        "ja": "黙らせる",
        "tag": "語法",
        "grammar": "silence(名詞=沈黙)が動詞化し「沈黙させる」。silence criticism で「批判を封じる」。他動詞。"
      },
      "legitimate": {
        "pos": "Adjective",
        "ja": "正当な",
        "tag": "形容詞",
        "grammar": "legitimate criticism で「正当な批判」。法的・道義的に認められる意。illegitimate が反意。"
      },
      "criticism": {
        "pos": "Noun",
        "ja": "批判",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。a criticism なら「個別の批判」と可算化。ここでは批判一般を指す。"
      },
      "argues": {
        "pos": "Verb",
        "ja": "〜を主張する、〜を示す",
        "tag": "三単現・語法",
        "grammar": "this risk argues for 〜=「この危険性は〜を支持する論拠になる」。主語 this risk が三人称単数で -s。argue for=「〜に賛成して論じる」。"
      },
      "narrowly": {
        "pos": "Adverb",
        "ja": "狭く、限定的に",
        "tag": "副詞",
        "grammar": "narrowly defined limits で「厳密に範囲を絞った制限」。broadly(広範に)の対義。"
      },
      "abandoning": {
        "pos": "Verb",
        "ja": "放棄すること",
        "tag": "動名詞",
        "grammar": "rather than abandoning の前置詞 than の後で動名詞。abandon=「(完全に)捨て去る」。regulation を目的語に。"
      },
      "regulation": {
        "pos": "Noun",
        "ja": "規制",
        "tag": "無冠詞・不可算",
        "grammar": "行為・概念としての規制は不可算→無冠詞。個々の規則は regulations と可算複数になる。"
      },
      "preserve": {
        "pos": "Verb",
        "ja": "保つ、維持する",
        "tag": "語法",
        "grammar": "preserve public order で「秩序を保つ」。in order to preserve の to 不定詞内。protect/maintain に近い。"
      },
      "expression": {
        "pos": "Noun",
        "ja": "表現",
        "tag": "無冠詞・不可算",
        "grammar": "free expression で「表現の自由」。意思表示の意では不可算→無冠詞。an expression なら「言い回し・表情」と可算。"
      }
    },
    "vocab": [
      {
        "word": "cornerstone",
        "pos": "Noun",
        "ipa": "/ˈkɔːrnərstoʊn/",
        "def": "an essential, fundamental basis on which something depends",
        "example": "Freedom of speech is rightly regarded as a cornerstone of democracy."
      },
      {
        "word": "incite",
        "pos": "Verb",
        "ipa": "/ɪnˈsaɪt/",
        "def": "to stir up or encourage someone to act, especially violently",
        "example": "Speech that incites violence can endanger innocent lives."
      },
      {
        "word": "massacre",
        "pos": "Noun",
        "ipa": "/ˈmæsəkər/",
        "def": "the brutal killing of a large number of people",
        "example": "Calls to attack a particular group have historically triggered riots and even massacres."
      },
      {
        "word": "dignity",
        "pos": "Noun",
        "ipa": "/ˈdɪɡnəti/",
        "def": "the quality of being worthy of honor and respect",
        "example": "Restrictions protect individual dignity."
      },
      {
        "word": "slander",
        "pos": "Noun",
        "ipa": "/ˈslændər/",
        "def": "the spoken statement of false damaging claims about someone",
        "example": "Hate speech and slander can inflict lasting psychological damage."
      },
      {
        "word": "vulnerable",
        "pos": "Adjective",
        "ipa": "/ˈvʌlnərəbəl/",
        "def": "easily hurt, harmed, or attacked, physically or emotionally",
        "example": "Hate speech can inflict lasting psychological damage on vulnerable people."
      },
      {
        "word": "safeguard",
        "pos": "Verb",
        "ipa": "/ˈseɪfɡɑːrd/",
        "def": "to protect something from harm or danger",
        "example": "Certain limits safeguard public order and security."
      },
      {
        "word": "legitimate",
        "pos": "Adjective",
        "ipa": "/lɪˈdʒɪtəmət/",
        "def": "conforming to accepted rules, standards, or law; valid",
        "example": "Governments can abuse such restrictions to silence legitimate criticism."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "譲歩の Even so 構文",
        "example": "Even so, I am convinced that restrictions on this freedom can, in certain circumstances, be justified.",
        "highlight": "Even so",
        "explain": "Even so=「そうは言っても」。前文で言論の自由の重要性を認めたうえで、それでも主張を通す譲歩→主張の流れ。文頭に置き直後にコンマ。Nevertheless と同義。"
      },
      {
        "no": 2,
        "title": "This is largely because による理由提示",
        "example": "This is largely because speech that incites violence can endanger innocent lives.",
        "highlight": "This is largely because",
        "explain": "主張の直後に理由の核心を述べる談話標識。largely=「主に」で理由の中心であることを示す。because 節内は speech that incites... と関係詞で先行詞を限定し、三単現 incites に注意。"
      },
      {
        "no": 3,
        "title": "in order to + 動詞の目的構文",
        "example": "In order to prevent harm, protect dignity, and preserve public order, restrictions on speech can indeed be justified.",
        "highlight": "In order to prevent harm, protect dignity, and preserve public order",
        "explain": "in order to do=「〜するために」。prevent / protect / preserve の3つの原形動詞を and で並列し、結論部で3つの論拠を一気に回収する。文頭に出して目的を前面に押し出す型。"
      }
    ]
  },
  "24": {
    "glossary": {
      "capital punishment": {
        "pos": "Noun",
        "ja": "死刑",
        "tag": "無冠詞・不可算",
        "grammar": "punishment(罰)は概念として不可算→無冠詞。capital=「死刑に値する」。the death penalty の堅い言い換え。"
      },
      "divisive": {
        "pos": "Adjective",
        "ja": "意見を二分する",
        "tag": "形容詞",
        "grammar": "a deeply divisive issue で「賛否が割れる問題」。divide(分ける)から派生。deeply で程度を強調。"
      },
      "issue": {
        "pos": "Noun",
        "ja": "問題、争点",
        "tag": "冠詞 a",
        "grammar": "a divisive issue。可算名詞で初出・一つの問題なので a。problem より中立的に「議論すべき論点」を指す。"
      },
      "weighing": {
        "pos": "Verb",
        "ja": "比較検討して",
        "tag": "動名詞",
        "grammar": "After weighing the evidence。前置詞 after の後で動名詞。weigh=「(証拠を)天秤にかける・吟味する」。"
      },
      "evidence": {
        "pos": "Noun",
        "ja": "証拠",
        "tag": "無冠詞・不可算",
        "grammar": "不可算名詞→無冠詞、複数形にもしない。「証拠1点」は a piece of evidence。an evidence / evidences は誤り。"
      },
      "convinced": {
        "pos": "Adjective",
        "ja": "確信して",
        "tag": "受動・語法",
        "grammar": "I am convinced that SV=「〜と確信している」。convince の過去分詞が形容詞化。直後に that 節を取る。"
      },
      "death penalty": {
        "pos": "Noun",
        "ja": "死刑",
        "tag": "冠詞 the",
        "grammar": "the death penalty。制度として唯一特定されるので the。penalty は本来可算だが制度名として the と固定。"
      },
      "abolished": {
        "pos": "Verb",
        "ja": "廃止される",
        "tag": "受動",
        "grammar": "should be abolished で受動。abolish=「(制度を)廃止する」。法律・制度を目的語に取る堅い語。"
      },
      "executing": {
        "pos": "Verb",
        "ja": "処刑すること",
        "tag": "動名詞",
        "grammar": "the risk of executing。前置詞 of の後で動名詞。execute=「死刑を執行する」。an innocent person を目的語に。"
      },
      "innocent": {
        "pos": "Adjective",
        "ja": "無実の",
        "tag": "形容詞",
        "grammar": "an innocent person で「無実の人」。発音は母音 /ɪ/ 始まりなので an。"
      },
      "unacceptable": {
        "pos": "Adjective",
        "ja": "容認できない",
        "tag": "形容詞",
        "grammar": "un-(否定)+ acceptable。is unacceptable で「許されない」。risk を主語に強い否定的評価を下す。"
      },
      "largely": {
        "pos": "Adverb",
        "ja": "主に",
        "tag": "副詞",
        "grammar": "This is largely because 〜=「主に〜だからだ」。理由の中心を示す談話標識。各段落で反復し論理を刻む。"
      },
      "judicial": {
        "pos": "Adjective",
        "ja": "司法の",
        "tag": "形容詞",
        "grammar": "no judicial system で「いかなる司法制度も〜ない」。judge と同語源。no + 名詞で全称否定。"
      },
      "immune": {
        "pos": "Adjective",
        "ja": "免れている",
        "tag": "語法",
        "grammar": "be immune to 〜=「〜を免れている」。immune to error で「誤りと無縁」。前置詞 to とセット。"
      },
      "error": {
        "pos": "Noun",
        "ja": "誤り",
        "tag": "無冠詞・不可算",
        "grammar": "immune to error の error は「誤りという概念」で不可算→無冠詞。個々のミスは an error と可算になる。"
      },
      "convictions": {
        "pos": "Noun",
        "ja": "有罪判決",
        "tag": "複数形",
        "grammar": "conviction は可算「有罪判決」。複数の判決事例を指すので複数形。convict(有罪にする)の名詞形。"
      },
      "overturned": {
        "pos": "Verb",
        "ja": "覆される",
        "tag": "受動・過去分詞",
        "grammar": "have been overturned で現在完了の受動。overturn=「(判決を)覆す」。後に再審で無罪になる事例を指す。"
      },
      "execution": {
        "pos": "Noun",
        "ja": "処刑、執行",
        "tag": "冠詞 an",
        "grammar": "an execution で「一件の処刑」。可算名詞で母音 /e/ 始まりなので an。execute の名詞形。"
      },
      "imprisonment": {
        "pos": "Noun",
        "ja": "投獄、懲役",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。unlike imprisonment で「投獄と違い」。lifelong imprisonment(終身刑)でも無冠詞。"
      },
      "reversed": {
        "pos": "Verb",
        "ja": "取り消される、元に戻される",
        "tag": "受動",
        "grammar": "can never be reversed で受動。reverse=「(処置を)元に戻す」。死刑は一度執行すると不可逆である点を強調。"
      },
      "reliably": {
        "pos": "Adverb",
        "ja": "確実に",
        "tag": "副詞",
        "grammar": "does not reliably deter で動詞 deter を修飾。「確実に〜するわけではない」と部分否定的に響く。rely 由来。"
      },
      "deter": {
        "pos": "Verb",
        "ja": "抑止する",
        "tag": "語法",
        "grammar": "deter crime で「犯罪を抑止する」。deter O from doing の形も。名詞は deterrence(抑止力)。"
      },
      "crime": {
        "pos": "Noun",
        "ja": "犯罪",
        "tag": "無冠詞・不可算",
        "grammar": "総称としての「犯罪」は不可算→無冠詞。deter crime / commit crime。個別の犯罪は a crime と可算。"
      },
      "comparing": {
        "pos": "Verb",
        "ja": "比較する",
        "tag": "現在分詞",
        "grammar": "studies comparing regions で studies を後ろから修飾する現在分詞(=which compare)。能動の関係を表す。"
      },
      "regions": {
        "pos": "Noun",
        "ja": "地域",
        "tag": "複数形",
        "grammar": "region は可算。死刑のある地域とない地域、複数を比べるので複数形。with and without で対比。"
      },
      "murder rates": {
        "pos": "Noun",
        "ja": "殺人発生率",
        "tag": "複数形",
        "grammar": "rate は可算「率」。地域ごとの率を比べるため複数形。murder が rate を限定する複合名詞。"
      },
      "surge": {
        "pos": "Noun",
        "ja": "急増",
        "tag": "冠詞 a",
        "grammar": "any surge in violent crime で「暴力犯罪の急増」。可算名詞、any+単数で「いかなる急増も(ない)」。a surge of/in の形。"
      },
      "violent": {
        "pos": "Adjective",
        "ja": "暴力的な",
        "tag": "形容詞",
        "grammar": "violent crime で「凶悪犯罪」。crime を限定。violence の形容詞形。"
      },
      "undermines": {
        "pos": "Verb",
        "ja": "〜を弱める、損なう",
        "tag": "三単現・語法",
        "grammar": "which undermines the deterrence argument。関係詞 which が前文の内容を受け三人称単数扱い→ -s。under + mine(掘り崩す)から「土台を崩す」。"
      },
      "deterrence": {
        "pos": "Noun",
        "ja": "抑止(力)",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。the deterrence argument で「抑止論」。deter の名詞形。"
      },
      "abolition": {
        "pos": "Noun",
        "ja": "廃止",
        "tag": "無冠詞・不可算",
        "grammar": "行為・概念としての廃止は不可算→無冠詞。abolish の名詞形。abolition reflects で文頭主語に立つ。"
      },
      "reflects": {
        "pos": "Verb",
        "ja": "反映する、示す",
        "tag": "三単現",
        "grammar": "abolition reflects values。主語 abolition が三人称単数→ -s。「〜を映し出す/体現する」。"
      },
      "humane": {
        "pos": "Adjective",
        "ja": "人道的な",
        "tag": "形容詞",
        "grammar": "a humane set of values で「人道的な価値観」。human(人間の)と綴りが近いが意味は「思いやりある」。発音 /hjuːˈmeɪn/。"
      },
      "values": {
        "pos": "Noun",
        "ja": "価値観",
        "tag": "複数形",
        "grammar": "value は「価値観」の意では通例複数形 values。a set of values で「一連の価値観」。単数 value は「価値・金額」。"
      },
      "majority": {
        "pos": "Noun",
        "ja": "大多数",
        "tag": "冠詞 the・語法",
        "grammar": "the majority of developed nations で「先進国の大半」。the majority of + 複数名詞は複数扱い。have already ended と複数動詞で受ける。"
      },
      "consensus": {
        "pos": "Noun",
        "ja": "合意、総意",
        "tag": "冠詞 the",
        "grammar": "this international consensus で「この国際的合意」。this で特定。本来不可算だが特定されると this/the が付く。"
      },
      "standing": {
        "pos": "Noun",
        "ja": "地位、評価",
        "tag": "無冠詞・不可算",
        "grammar": "Japan's standing as 〜=「〜としての日本の地位」。所有格 Japan's が付くので冠詞不要。「立場・名声」の意。"
      },
      "retribution": {
        "pos": "Noun",
        "ja": "報復、応報",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。demand retribution で「報復を求める」。vengeance と並べ justice と対比される。"
      },
      "vengeance": {
        "pos": "Noun",
        "ja": "復讐",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。rather than vengeance で「復讐ではなく」。retribution より感情的な「私的な復讐」。"
      },
      "fairness": {
        "pos": "Noun",
        "ja": "公正さ",
        "tag": "無冠詞・不可算",
        "grammar": "fair(公正な)+ -ness の抽象名詞。不可算→無冠詞。aim at fairness で「公正さを目指す」。"
      },
      "lifelong": {
        "pos": "Adjective",
        "ja": "終身の、生涯の",
        "tag": "形容詞",
        "grammar": "lifelong imprisonment で「終身刑」。life + long の複合形容詞。一語で名詞を限定。"
      },
      "accountable": {
        "pos": "Adjective",
        "ja": "責任を負うべき",
        "tag": "語法",
        "grammar": "hold O accountable=「Oに責任を取らせる」。hold ... accountable で SVOC。accountable for 〜 の形も。"
      },
      "irreversible": {
        "pos": "Adjective",
        "ja": "取り返しのつかない",
        "tag": "形容詞",
        "grammar": "ir-(否定)+ reversible。irreversible mistakes で「不可逆な過ち」。reverse できないこと、死刑の核心的論点。"
      },
      "mistakes": {
        "pos": "Noun",
        "ja": "過ち、誤り",
        "tag": "複数形",
        "grammar": "mistake は可算。複数の誤審を想定するので複数形。irreversible mistakes で「取り返しのつかない過ち」。"
      },
      "offenders": {
        "pos": "Noun",
        "ja": "犯罪者",
        "tag": "複数形",
        "grammar": "offender は可算。複数の犯罪者一般を指すので複数形。hold offenders accountable で「犯罪者に責任を取らせる」。"
      },
      "understandably": {
        "pos": "Adverb",
        "ja": "もっともなことに",
        "tag": "副詞",
        "grammar": "understandably demand で動詞を修飾。「(その心情は)理解できることに〜する」と譲歩段で相手に配慮を示す。"
      },
      "severe": {
        "pos": "Adjective",
        "ja": "厳しい、過酷な",
        "tag": "形容詞",
        "grammar": "severe retribution で「厳罰・過酷な報復」。retribution を限定。harsh に近い堅い語。"
      }
    },
    "vocab": [
      {
        "word": "abolish",
        "pos": "Verb",
        "ipa": "/əˈbɑːlɪʃ/",
        "def": "to formally put an end to a system, practice, or institution",
        "example": "I am convinced that the death penalty should be abolished."
      },
      {
        "word": "deter",
        "pos": "Verb",
        "ipa": "/dɪˈtɜːr/",
        "def": "to discourage someone from acting through fear of consequences",
        "example": "The death penalty does not reliably deter crime."
      },
      {
        "word": "irreversible",
        "pos": "Adjective",
        "ipa": "/ˌɪrɪˈvɜːrsəbəl/",
        "def": "impossible to change back to a previous state; permanent",
        "example": "An execution, unlike imprisonment, can never be reversed once carried out."
      },
      {
        "word": "conviction",
        "pos": "Noun",
        "ipa": "/kənˈvɪkʃən/",
        "def": "a formal declaration that someone is guilty of a crime",
        "example": "Several convictions in Japan have later been overturned."
      },
      {
        "word": "deterrence",
        "pos": "Noun",
        "ipa": "/dɪˈtɜːrəns/",
        "def": "the act of discouraging an action through fear or doubt",
        "example": "No clear difference in murder rates undermines the deterrence argument."
      },
      {
        "word": "humane",
        "pos": "Adjective",
        "ipa": "/hjuːˈmeɪn/",
        "def": "showing compassion and kindness toward people or animals",
        "example": "Abolition reflects a more humane and modern set of values."
      },
      {
        "word": "retribution",
        "pos": "Noun",
        "ipa": "/ˌretrɪˈbjuːʃən/",
        "def": "punishment inflicted as revenge for a wrong or crime",
        "example": "Victims' families understandably demand severe retribution."
      },
      {
        "word": "accountable",
        "pos": "Adjective",
        "ipa": "/əˈkaʊntəbəl/",
        "def": "required or expected to justify actions and take responsibility",
        "example": "Lifelong imprisonment can hold offenders fully accountable."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "unlike による対比の挿入",
        "example": "An execution, unlike imprisonment, can never be reversed once carried out.",
        "highlight": "unlike imprisonment",
        "explain": "unlike+名詞=「〜とは違って」。主語 an execution の直後にコンマで挿入し、投獄との決定的な差(不可逆性)を際立たせる。文末 once carried out は once (it is) carried out の省略で「いったん執行されると」。"
      },
      {
        "no": 2,
        "title": "no + 名詞による全称否定",
        "example": "This is largely because no judicial system is immune to error.",
        "highlight": "no judicial system is immune to error",
        "explain": "no + 単数名詞で「いかなる司法制度も〜ない」と全体を一括否定。not any より強く格調高い。be immune to 〜=「〜を免れている」で前置詞 to が必須、error は不可算で無冠詞。"
      },
      {
        "no": 3,
        "title": "Admittedly で始める譲歩段",
        "example": "Admittedly, victims' families understandably demand severe retribution.",
        "highlight": "Admittedly",
        "explain": "Admittedly=「確かに〜だ」と反対意見を一度認める譲歩の合図。次文の Nevertheless で主張に戻す。1級の説得力を生む譲歩→反論の型。understandably で相手の心情に配慮しつつ反論する。"
      }
    ]
  },
  "25": {
    "glossary": {
      "argue": {
        "pos": "Verb",
        "ja": "主張する",
        "tag": "原形・語法",
        "grammar": "some argue that SV=「〜と主張する人もいる」。主語 some(=some people)は複数扱いで原形 argue。argue that で意見を導く。"
      },
      "democratic": {
        "pos": "Adjective",
        "ja": "民主主義の",
        "tag": "形容詞",
        "grammar": "democratic nations で「民主主義国」。democracy の形容詞形。authoritarian(権威主義の)と対比される。"
      },
      "nations": {
        "pos": "Noun",
        "ja": "国家",
        "tag": "複数形",
        "grammar": "nation は可算。複数の国を総称するので複数形。countries の言い換えで反復を避ける。"
      },
      "bear": {
        "pos": "Verb",
        "ja": "(責任などを)負う",
        "tag": "原形・語法",
        "grammar": "bear a duty to do=「〜する義務を負う」。bear-bore-borne。主語 nations が複数なので原形 bear。「負担を担う」の堅い語。"
      },
      "duty": {
        "pos": "Noun",
        "ja": "義務",
        "tag": "冠詞 a",
        "grammar": "a duty to spread で「広める義務」。可算名詞で初出・一つの義務なので a。duty to do の不定詞が内容を説明。"
      },
      "spread": {
        "pos": "Verb",
        "ja": "広める",
        "tag": "不定詞・語法",
        "grammar": "a duty to spread の to spread は duty を修飾する不定詞。spread-spread-spread と無変化。他動詞で values を目的語に。"
      },
      "authoritarian": {
        "pos": "Adjective",
        "ja": "権威主義の、独裁的な",
        "tag": "形容詞",
        "grammar": "authoritarian states で「独裁国家」。author(権威)由来。democratic の対義語として論の軸になる。"
      },
      "firmly": {
        "pos": "Adverb",
        "ja": "固く、断固として",
        "tag": "副詞",
        "grammar": "I firmly believe that SV で動詞 believe を強調。「強く確信している」と立場を明確にする主張の定型。"
      },
      "promote": {
        "pos": "Verb",
        "ja": "促進する、広める",
        "tag": "原形・語法",
        "grammar": "should not actively promote democracy。should の後で原形。promote=「(価値などを)推し進める」。to non-democratic nations で対象を示す。"
      },
      "principal": {
        "pos": "Adjective",
        "ja": "主要な",
        "tag": "形容詞",
        "grammar": "three principal reasons で「3つの主要な理由」。principle(原則・名詞)と同音異義。principal=「主たる」。"
      },
      "imposed": {
        "pos": "Verb",
        "ja": "押し付けられた",
        "tag": "過去分詞",
        "grammar": "systems imposed from outside。過去分詞が systems を後ろから修飾(=which are imposed)。受動「外から課された」。impose A on B の形も。"
      },
      "take root": {
        "pos": "Verb",
        "ja": "根付く",
        "tag": "句動詞",
        "grammar": "take root=「根付く・定着する」。root に冠詞を付けない慣用句。rarely take root で「めったに根付かない」。"
      },
      "depends": {
        "pos": "Verb",
        "ja": "依存する",
        "tag": "三単現・句動詞",
        "grammar": "Democracy depends on 〜。主語 Democracy が三人称単数→ -s。depend on=「〜次第である」で前置詞 on を落とさない。"
      },
      "institutions": {
        "pos": "Noun",
        "ja": "制度、機関",
        "tag": "複数形",
        "grammar": "institution は可算。複数の制度を列挙するので複数形。civic traditions, public trust と並列される。"
      },
      "civic": {
        "pos": "Adjective",
        "ja": "市民の",
        "tag": "形容詞",
        "grammar": "civic traditions で「市民的伝統」。citizen と同語源。市民社会に根ざした慣習を指す。"
      },
      "traditions": {
        "pos": "Noun",
        "ja": "伝統",
        "tag": "複数形",
        "grammar": "tradition は可算。複数の伝統を指すので複数形。civic traditions で「市民社会の慣習」。"
      },
      "trust": {
        "pos": "Noun",
        "ja": "信頼",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。public trust で「(国民の)信頼」。a trust なら「信託」と別の可算名詞に。"
      },
      "internally": {
        "pos": "Adverb",
        "ja": "内部から、内的に",
        "tag": "副詞",
        "grammar": "develop internally で「内側から発展する」。externally(外から)と対比。民主主義は内発的という主張の核。"
      },
      "adopted": {
        "pos": "Verb",
        "ja": "採用した",
        "tag": "過去形",
        "grammar": "states that adopted structures。過去形で「(過去に)採り入れた」事例を述べる。adopt=「(制度を)導入する」。"
      },
      "structures": {
        "pos": "Noun",
        "ja": "構造、仕組み",
        "tag": "複数形",
        "grammar": "structure は可算。複数の制度的枠組みを指すので複数形。democratic structures で「民主的な仕組み」。"
      },
      "pressure": {
        "pos": "Noun",
        "ja": "圧力",
        "tag": "無冠詞・不可算",
        "grammar": "foreign pressure で「外圧」。抽象的な圧力は不可算→無冠詞。under pressure で「圧力下で」。"
      },
      "descended": {
        "pos": "Verb",
        "ja": "陥った",
        "tag": "過去形・句動詞",
        "grammar": "descended into instability=「不安定へと転落した」。descend into=「(悪い状態に)陥る」。過去の事例なので過去形。"
      },
      "instability": {
        "pos": "Noun",
        "ja": "不安定",
        "tag": "無冠詞・不可算",
        "grammar": "in-(否定)+ stability。抽象名詞で不可算→無冠詞。descend into instability で「混乱に陥る」。"
      },
      "demonstrating": {
        "pos": "Verb",
        "ja": "示しながら",
        "tag": "分詞構文",
        "grammar": "分詞構文。直前の事例全体を受け「そのことが〜を示している」。, demonstrating that SV で結論を添える定型。"
      },
      "externally": {
        "pos": "Adverb",
        "ja": "外部から",
        "tag": "副詞",
        "grammar": "externally driven reform で「外から推し進められた改革」。externally が過去分詞 driven を修飾。internally の対義。"
      },
      "driven": {
        "pos": "Verb",
        "ja": "推し進められた",
        "tag": "過去分詞",
        "grammar": "externally driven reform。過去分詞 driven が reform を前から限定し「外発的な改革」。drive(推進する)の受動。"
      },
      "reform": {
        "pos": "Noun",
        "ja": "改革",
        "tag": "無冠詞・不可算",
        "grammar": "抽象的な「改革」は不可算→無冠詞。具体的な個々の改革は a reform / reforms と可算化することもある。"
      },
      "collapse": {
        "pos": "Verb",
        "ja": "崩壊する",
        "tag": "原形",
        "grammar": "tends to collapse の to の後で原形。collapse=「(計画などが)頓挫する・崩れ落ちる」。自動詞。"
      },
      "provokes": {
        "pos": "Verb",
        "ja": "引き起こす、招く",
        "tag": "三単現",
        "grammar": "such promotion provokes resentment。主語 promotion が三人称単数→ -s。provoke=「(反感などを)誘発する」。"
      },
      "resentment": {
        "pos": "Noun",
        "ja": "反感、憤り",
        "tag": "無冠詞・不可算",
        "grammar": "抽象名詞で不可算→無冠詞。provoke resentment で「反感を買う」。怒りより根深い「恨み」のニュアンス。"
      },
      "perceived": {
        "pos": "Verb",
        "ja": "受け取られる、みなされる",
        "tag": "受動・語法",
        "grammar": "is perceived as 〜=「〜と受け取られる」。perceive A as B の受動。as を落とさない。regard as と同型。"
      },
      "cultural imperialism": {
        "pos": "Noun",
        "ja": "文化帝国主義",
        "tag": "無冠詞・不可算",
        "grammar": "imperialism(主義)は -ism で不可算→無冠詞。cultural が限定しても冠詞不要。「文化の押し付け」を批判する語。"
      },
      "intervention": {
        "pos": "Noun",
        "ja": "介入",
        "tag": "無冠詞・不可算",
        "grammar": "foreign intervention で「外国の介入」。行為としては不可算→無冠詞。intervene(介入する)の名詞形。"
      },
      "arrogant": {
        "pos": "Adjective",
        "ja": "傲慢な",
        "tag": "冠詞 an",
        "grammar": "an arrogant attempt で「傲慢な試み」。母音 /ˈærəɡənt/ 始まりなので an。「上から目線の」を表す否定的語。"
      },
      "attempt": {
        "pos": "Noun",
        "ja": "試み",
        "tag": "冠詞 an・語法",
        "grammar": "an attempt to dictate で「〜を押し付けようとする試み」。attempt to do の不定詞で内容を説明。可算で初出 an。"
      },
      "dictate": {
        "pos": "Verb",
        "ja": "(一方的に)指図する",
        "tag": "不定詞",
        "grammar": "an attempt to dictate の to dictate は attempt を修飾する不定詞。dictate=「命令する・押し付ける」。dictator(独裁者)と同語源。"
      },
      "entrench": {
        "pos": "Verb",
        "ja": "強固にする、根付かせる",
        "tag": "語法",
        "grammar": "entrench the very regimes で「まさにその体制を温存させる」。en-(〜にする)+ trench(塹壕)。「(悪いものを)定着させる」。"
      },
      "regimes": {
        "pos": "Noun",
        "ja": "政権、体制",
        "tag": "複数形",
        "grammar": "regime は可算。複数の独裁体制を指すので複数形。the very regimes で「他ならぬその体制」。"
      },
      "resources": {
        "pos": "Noun",
        "ja": "資源、財源",
        "tag": "複数形",
        "grammar": "resource は可算。資金・人員など複数の財源を指すので複数形。the resources devoted to 〜 で「〜に費やされる資源」。"
      },
      "devoted": {
        "pos": "Verb",
        "ja": "充てられた",
        "tag": "過去分詞・語法",
        "grammar": "resources devoted to spreading。過去分詞が resources を後置修飾(=which are devoted)。devote A to doing の受動、to は前置詞で動名詞 spreading が続く。"
      },
      "invested": {
        "pos": "Verb",
        "ja": "投じられる",
        "tag": "受動",
        "grammar": "could be invested で受動。invest=「(資金を)投じる」。invest A in B の形。more productively で「より有効に」。"
      },
      "productively": {
        "pos": "Adverb",
        "ja": "生産的に、有効に",
        "tag": "副詞",
        "grammar": "invested more productively で動詞を修飾。比較級 more + 副詞で「より生産的に」。"
      },
      "polarization": {
        "pos": "Noun",
        "ja": "分極化、対立の激化",
        "tag": "無冠詞・不可算",
        "grammar": "-tion 抽象名詞で不可算→無冠詞。political polarization で「政治的分断」。pole(極)由来。"
      },
      "prioritizing": {
        "pos": "Verb",
        "ja": "優先すること",
        "tag": "動名詞",
        "grammar": "文頭主語の動名詞。Prioritizing domestic challenges would 〜 で「国内問題を優先することは〜だろう」。priority の動詞形。"
      },
      "domestic": {
        "pos": "Adjective",
        "ja": "国内の",
        "tag": "形容詞",
        "grammar": "domestic challenges で「国内の課題」。foreign / overseas の対義語。論全体で「外より内」という主張を支える。"
      },
      "campaigns": {
        "pos": "Noun",
        "ja": "活動、運動",
        "tag": "複数形",
        "grammar": "campaign は可算。複数の海外活動を指すので複数形。overseas campaigns で「海外でのキャンペーン」。"
      },
      "uncertain": {
        "pos": "Adjective",
        "ja": "不確実な",
        "tag": "形容詞",
        "grammar": "of uncertain success で「成功するかわからない」。un-(否定)+ certain。campaigns を後ろから限定。"
      },
      "appealing": {
        "pos": "Adjective",
        "ja": "魅力的な",
        "tag": "現在分詞",
        "grammar": "is appealing で「魅力的だ」。appeal(訴える)の現在分詞が形容詞化。「人を引きつける」の意。"
      },
      "ineffective": {
        "pos": "Adjective",
        "ja": "効果のない",
        "tag": "形容詞",
        "grammar": "in-(否定)+ effective。is ineffective で「効果がない」。resented, wasteful と3語並列で結論を補強。"
      },
      "resented": {
        "pos": "Verb",
        "ja": "反感を持たれる",
        "tag": "受動・過去分詞",
        "grammar": "is resented で受動「(人々から)恨まれる」。resent(憤る)の過去分詞。形容詞的に補語で機能。"
      },
      "wasteful": {
        "pos": "Adjective",
        "ja": "無駄の多い",
        "tag": "形容詞",
        "grammar": "waste(浪費)+ -ful。is wasteful で「無駄である」。ineffective, resented と並べ三拍子で論拠を締める。"
      },
      "refrain": {
        "pos": "Verb",
        "ja": "差し控える",
        "tag": "句動詞",
        "grammar": "refrain from doing=「〜を控える」。from の後は動名詞 promoting。should refrain from で「〜すべきでない」と婉曲に。"
      },
      "sentiment": {
        "pos": "Noun",
        "ja": "感情、風潮",
        "tag": "無冠詞・不可算",
        "grammar": "anti-Western sentiment で「反西洋感情」。世論・気分の意では不可算→無冠詞。anti-(反)が付く複合語。"
      },
      "pressing": {
        "pos": "Adjective",
        "ja": "差し迫った、緊急の",
        "tag": "現在分詞",
        "grammar": "pressing problems で「喫緊の問題」。press(押す・迫る)の現在分詞が形容詞化。urgent に近い。"
      },
      "inequality": {
        "pos": "Noun",
        "ja": "不平等",
        "tag": "無冠詞・不可算",
        "grammar": "in-(否定)+ equality。抽象名詞で不可算→無冠詞。pressing problems such as inequality で例示。"
      }
    },
    "vocab": [
      {
        "word": "impose",
        "pos": "Verb",
        "ipa": "/ɪmˈpoʊz/",
        "def": "to force something on someone, especially without their consent",
        "example": "Political systems imposed from outside rarely take root."
      },
      {
        "word": "take root",
        "pos": "Phrase",
        "ipa": "/teɪk ruːt/",
        "def": "to become established and develop firmly over time",
        "example": "Political systems imposed from outside rarely take root."
      },
      {
        "word": "resentment",
        "pos": "Noun",
        "ipa": "/rɪˈzentmənt/",
        "def": "a feeling of bitter anger at being treated unfairly",
        "example": "Such promotion frequently provokes resentment."
      },
      {
        "word": "imperialism",
        "pos": "Noun",
        "ipa": "/ɪmˈpɪriəlɪzəm/",
        "def": "a policy of extending power and dominance over other nations",
        "example": "It is perceived as cultural imperialism."
      },
      {
        "word": "entrench",
        "pos": "Verb",
        "ipa": "/ɪnˈtrentʃ/",
        "def": "to establish something so firmly that change is difficult",
        "example": "These efforts can entrench the very regimes they aim to weaken."
      },
      {
        "word": "intervention",
        "pos": "Noun",
        "ipa": "/ˌɪntərˈvenʃən/",
        "def": "the act of becoming involved in a situation to alter it",
        "example": "Many citizens regard foreign intervention as arrogant."
      },
      {
        "word": "polarization",
        "pos": "Noun",
        "ipa": "/ˌpoʊlərɪˈzeɪʃən/",
        "def": "division into two sharply opposing groups or opinions",
        "example": "Democratic nations face problems such as political polarization."
      },
      {
        "word": "refrain",
        "pos": "Verb",
        "ipa": "/rɪˈfreɪn/",
        "def": "to stop oneself from doing something; to hold back",
        "example": "Democratic nations should refrain from actively promoting democracy."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "前置きの However で逆接の主張",
        "example": "However, I firmly believe that democracies should not actively promote democracy to non-democratic nations, for three principal reasons.",
        "highlight": "However, I firmly believe that",
        "explain": "前文 some argue that 〜(一般論)を However で覆し、自分の立場を提示する型。for three principal reasons を末尾に置き、本論の3点構成を予告する。firmly が主張の強さを補強。"
      },
      {
        "no": 2,
        "title": "過去分詞の後置修飾",
        "example": "Political systems imposed from outside rarely take root.",
        "highlight": "Political systems imposed from outside",
        "explain": "imposed from outside が名詞 systems を後ろから修飾(=which are imposed from outside)。受動の関係を分詞一語で圧縮し文を引き締める。take root は「根付く」の句動詞で root に冠詞を付けない。"
      },
      {
        "no": 3,
        "title": "the very + 名詞による強調",
        "example": "These efforts can strengthen anti-Western sentiment and entrench the very regimes they aim to weaken.",
        "highlight": "entrench the very regimes they aim to weaken",
        "explain": "the very + 名詞=「まさにその〜」。弱体化を狙ったはずの体制を逆に強化してしまう、という皮肉(逆説)を強調。regimes の後は関係代名詞 that/which が省略され they aim to weaken が修飾。"
      }
    ]
  },
  "26": {
    "glossary": {
      "free trade agreements": {
        "pos": "Noun",
        "ja": "自由貿易協定",
        "tag": "複数形",
        "grammar": "agreement は可算名詞。複数の協定一般を指すので複数形・無冠詞で総称。FTA の複数形。"
      },
      "praised": {
        "pos": "Verb",
        "ja": "称賛される",
        "tag": "受動・過去分詞",
        "grammar": "have been praised の過去分詞。「称賛されてきた」現在完了+受動。動作主が不特定なので受動が自然。"
      },
      "engines": {
        "pos": "Noun",
        "ja": "原動力、エンジン",
        "tag": "複数形",
        "grammar": "engines of prosperity=繁栄の原動力。比喩。複数の FTA を指すので複数形。"
      },
      "prosperity": {
        "pos": "Noun",
        "ja": "繁栄",
        "tag": "無冠詞・不可算",
        "grammar": "-ity 抽象名詞は不可算→無冠詞。状態を表す。"
      },
      "certainly": {
        "pos": "Adverb",
        "ja": "確かに、間違いなく",
        "tag": "譲歩",
        "grammar": "they certainly bring=「確かに〜はもたらす」と一旦認める譲歩の副詞。次の but で反論。"
      },
      "advantages": {
        "pos": "Noun",
        "ja": "利点",
        "tag": "複数形",
        "grammar": "advantage は可算。複数の利点を指すので複数形。"
      },
      "promote": {
        "pos": "Verb",
        "ja": "促進する",
        "grammar": "promote economic growth=成長を促進する。他動詞、目的語を直接取る。"
      },
      "economic growth": {
        "pos": "Noun",
        "ja": "経済成長",
        "tag": "無冠詞・不可算",
        "grammar": "growth は不可算→無冠詞。economic が限定する。抽象的な成長の概念。"
      },
      "sustainable": {
        "pos": "Adjective",
        "ja": "持続可能な",
        "grammar": "sustainable growth=持続可能な成長。sustain(維持する)+able。"
      },
      "depends": {
        "pos": "Verb",
        "ja": "左右される、依存する",
        "tag": "句動詞・三単現",
        "grammar": "depend on=〜次第である。on とセット。主語 growth が三人称単数なので depends。"
      },
      "primarily": {
        "pos": "Adverb",
        "ja": "主に",
        "grammar": "depends primarily on=主に〜に依存する。動詞を修飾。"
      },
      "innovation": {
        "pos": "Noun",
        "ja": "技術革新",
        "tag": "無冠詞・不可算",
        "grammar": "-tion 抽象名詞は不可算→無冠詞。an innovation なら一つの新機軸と可算化。"
      },
      "external": {
        "pos": "Adjective",
        "ja": "外部の、対外的な",
        "grammar": "external trade deals=対外的な貿易取引。internal の対義語。"
      },
      "trade deals": {
        "pos": "Noun",
        "ja": "貿易取引",
        "tag": "複数形",
        "grammar": "deal は可算。複数の取引を指すので複数形。trade が形容詞的に限定。"
      },
      "invests": {
        "pos": "Verb",
        "ja": "投資する",
        "tag": "句動詞・三単現",
        "grammar": "invest in=〜に投資する。in とセット。主語 nation が三単現なので invests。"
      },
      "research": {
        "pos": "Noun",
        "ja": "研究",
        "tag": "無冠詞・不可算",
        "grammar": "research は常に不可算→無冠詞・複数形にしない。a research は誤り。"
      },
      "high-value": {
        "pos": "Adjective",
        "ja": "高付加価値の",
        "grammar": "high-value industries=高付加価値産業。複合形容詞、名詞を修飾。"
      },
      "industries": {
        "pos": "Noun",
        "ja": "産業",
        "tag": "複数形",
        "grammar": "industry は可算。複数の産業を指すので複数形。語尾 y→ies。"
      },
      "endure": {
        "pos": "Verb",
        "ja": "持続する、耐える",
        "grammar": "industries that endure=持続する産業。ここは自動詞「長続きする」。"
      },
      "state-led": {
        "pos": "Adjective",
        "ja": "国家主導の",
        "tag": "過去分詞",
        "grammar": "state-led investment=国家主導の投資。led は lead の過去分詞、複合形容詞。"
      },
      "investment": {
        "pos": "Noun",
        "ja": "投資",
        "tag": "無冠詞・不可算",
        "grammar": "ここでは不可算で総称→無冠詞。an investment なら個別案件で可算化。"
      },
      "demonstrating": {
        "pos": "Verb",
        "ja": "証明している",
        "tag": "分詞構文",
        "grammar": "前文全体を主語にした分詞構文。「〜ということを示しながら」。, demonstrating that... の形。"
      },
      "internal": {
        "pos": "Adjective",
        "ja": "内部の、国内の",
        "grammar": "internal capacity=内部の能力。external の対義語。"
      },
      "capacity": {
        "pos": "Noun",
        "ja": "能力、容量",
        "tag": "無冠詞・不可算",
        "grammar": "ここでは能力の意味で不可算→無冠詞。"
      },
      "drives": {
        "pos": "Verb",
        "ja": "推し進める",
        "tag": "三単現",
        "grammar": "capacity drives prosperity=能力が繁栄を生む。主語 capacity が三単現で drives。"
      },
      "harm": {
        "pos": "Verb",
        "ja": "害する",
        "grammar": "harm domestic sectors=国内部門を害する。他動詞。名詞でも同形。"
      },
      "vulnerable": {
        "pos": "Adjective",
        "ja": "脆弱な、弱い立場の",
        "grammar": "vulnerable domestic sectors=脆弱な国内部門。打撃を受けやすい。"
      },
      "domestic": {
        "pos": "Adjective",
        "ja": "国内の",
        "grammar": "domestic sectors=国内部門。foreign/external の対義語。本文頻出キーワード。"
      },
      "sectors": {
        "pos": "Noun",
        "ja": "部門、分野",
        "tag": "複数形",
        "grammar": "sector は可算。複数の分野を指すので複数形。"
      },
      "opened": {
        "pos": "Verb",
        "ja": "開放される",
        "tag": "受動・過去分詞",
        "grammar": "markets are opened=市場が開放される。受動態。動作主より「開放される」状態に焦点。"
      },
      "abruptly": {
        "pos": "Adverb",
        "ja": "突然に、急に",
        "grammar": "opened abruptly=急に開放される。動詞を修飾。abrupt の副詞形。"
      },
      "manufacturers": {
        "pos": "Noun",
        "ja": "製造業者",
        "tag": "複数形",
        "grammar": "manufacturer は可算。複数の業者を指すので複数形。"
      },
      "compete": {
        "pos": "Verb",
        "ja": "競争する",
        "tag": "句動詞",
        "grammar": "compete with=〜と競争する。with とセット。be unable to compete で「競争できない」。"
      },
      "imports": {
        "pos": "Noun",
        "ja": "輸入品",
        "tag": "複数形",
        "grammar": "cheaper imports=より安い輸入品。import は可算、複数の品物で複数形。動詞だと「輸入する」。"
      },
      "collapse": {
        "pos": "Verb",
        "ja": "崩壊する",
        "grammar": "industries collapse=産業が崩壊する。自動詞。名詞でも同形。"
      },
      "unemployment": {
        "pos": "Noun",
        "ja": "失業",
        "tag": "無冠詞・不可算",
        "grammar": "un-+employ+-ment 抽象名詞は不可算→無冠詞。"
      },
      "inequality": {
        "pos": "Noun",
        "ja": "不平等",
        "tag": "無冠詞・不可算",
        "grammar": "-ity 抽象名詞は不可算→無冠詞。equality の否定。"
      },
      "undermines": {
        "pos": "Verb",
        "ja": "損なう、台無しにする",
        "tag": "三単現",
        "grammar": "which undermines growth=成長を損なう。関係詞 which が三単現で undermines。「土台を掘り崩す」のイメージ。"
      },
      "promise": {
        "pos": "Verb",
        "ja": "約束する",
        "tag": "三単現",
        "grammar": "agreements promise=協定が約束する。ここは複数主語なので原形 promise。"
      },
      "fundamental": {
        "pos": "Adjective",
        "ja": "根本的な",
        "grammar": "a more fundamental driver=より根本的な要因。比較級 more で修飾。"
      },
      "driver": {
        "pos": "Noun",
        "ja": "要因、原動力",
        "tag": "冠詞 a",
        "grammar": "初出の数えられる一つの要因なので a。driver は「推進力」の比喩。"
      },
      "advancement": {
        "pos": "Noun",
        "ja": "進歩、向上",
        "tag": "無冠詞・不可算",
        "grammar": "-ment 抽象名詞、ここでは不可算→無冠詞。economic advancement=経済の進歩。"
      },
      "skilled": {
        "pos": "Adjective",
        "ja": "熟練した",
        "tag": "過去分詞",
        "grammar": "a skilled workforce=熟練した労働力。skill の過去分詞が形容詞化。"
      },
      "adaptable": {
        "pos": "Adjective",
        "ja": "適応力のある",
        "grammar": "adaptable workforce=適応力のある労働力。adapt+able。"
      },
      "workforce": {
        "pos": "Noun",
        "ja": "労働力、労働人口",
        "tag": "冠詞 a",
        "grammar": "a skilled and adaptable workforce で一つの集合体として a。集合名詞。"
      },
      "enables": {
        "pos": "Verb",
        "ja": "可能にする",
        "tag": "語法 SVOC・三単現",
        "grammar": "enable O to do=Oが〜できるようにする。to 不定詞を取る。主語 workforce が三単現で enables。"
      },
      "seize": {
        "pos": "Verb",
        "ja": "つかむ、捉える",
        "grammar": "seize new opportunities=新たな機会をつかむ。他動詞。チャンスを「ものにする」。"
      },
      "opportunities": {
        "pos": "Noun",
        "ja": "機会",
        "tag": "複数形",
        "grammar": "opportunity は可算。複数の機会で複数形。語尾 y→ies。"
      },
      "human capital": {
        "pos": "Noun",
        "ja": "人的資本",
        "tag": "無冠詞・不可算",
        "grammar": "capital(資本)は不可算→無冠詞。「人材を資本とみなす」経済用語。"
      },
      "yields": {
        "pos": "Verb",
        "ja": "生み出す",
        "tag": "三単現",
        "grammar": "investing yields benefits=投資が利益を生む。主語が動名詞(単数扱い)なので yields。"
      },
      "resilient": {
        "pos": "Adjective",
        "ja": "強靭な、回復力のある",
        "grammar": "more resilient benefits=より強靭な利益。比較級 more で修飾。"
      },
      "tariff reductions": {
        "pos": "Noun",
        "ja": "関税の引き下げ",
        "tag": "複数形",
        "grammar": "reduction は可算、複数の引き下げで複数形。tariff が限定。"
      },
      "contribute": {
        "pos": "Verb",
        "ja": "貢献する",
        "tag": "句動詞",
        "grammar": "contribute to=〜に貢献する。to とセット。前置詞を落とさない。"
      },
      "effective": {
        "pos": "Adjective",
        "ja": "効果的な",
        "grammar": "the most effective path=最も効果的な道。最上級 the most で修飾。"
      },
      "reliable": {
        "pos": "Adjective",
        "ja": "信頼できる、確かな",
        "grammar": "a more reliable foundation=より確かな土台。比較級 more。rely の形容詞形。"
      },
      "foundation": {
        "pos": "Noun",
        "ja": "基盤、土台",
        "tag": "冠詞 a",
        "grammar": "a more reliable foundation で一つの土台として a。比較級+名詞でも冠詞は必要。"
      },
      "lasting": {
        "pos": "Adjective",
        "ja": "永続的な",
        "tag": "現在分詞",
        "grammar": "lasting prosperity=永続的な繁栄。last(続く)の現在分詞が形容詞化。"
      }
    },
    "vocab": [
      {
        "word": "sustainable",
        "pos": "Adjective",
        "ipa": "/səˈsteɪnəbl/",
        "def": "able to continue over a long period of time without being damaged or exhausted",
        "example": "Sustainable growth depends primarily on domestic innovation."
      },
      {
        "word": "innovation",
        "pos": "Noun",
        "ipa": "/ˌɪnəˈveɪʃn/",
        "def": "the introduction of new ideas, methods, or technologies",
        "example": "Sustainable growth depends primarily on domestic innovation."
      },
      {
        "word": "endure",
        "pos": "Verb",
        "ipa": "/ɪnˈdjʊə/",
        "def": "to continue to exist for a long time",
        "example": "A nation can create high-value industries that endure."
      },
      {
        "word": "abruptly",
        "pos": "Adverb",
        "ipa": "/əˈbrʌptli/",
        "def": "suddenly and unexpectedly",
        "example": "When markets are opened abruptly, local farmers may be unable to compete."
      },
      {
        "word": "undermine",
        "pos": "Verb",
        "ipa": "/ˌʌndəˈmaɪn/",
        "def": "to gradually weaken or damage something",
        "example": "Unemployment and inequality undermine the very growth such agreements promise."
      },
      {
        "word": "adaptable",
        "pos": "Adjective",
        "ipa": "/əˈdæptəbl/",
        "def": "able to change in order to deal with new situations",
        "example": "A skilled and adaptable workforce enables a country to seize new opportunities."
      },
      {
        "word": "seize",
        "pos": "Verb",
        "ipa": "/siːz/",
        "def": "to take hold of an opportunity eagerly and decisively",
        "example": "A workforce enables a country to seize new opportunities."
      },
      {
        "word": "resilient",
        "pos": "Adjective",
        "ipa": "/rɪˈzɪliənt/",
        "def": "able to recover quickly from difficult conditions",
        "example": "Investing in human capital yields broader and more resilient benefits."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "譲歩からの反論 (While + 主節)",
        "example": "While they certainly bring advantages, I do not believe they are the best way to promote economic growth.",
        "highlight": "While they certainly bring advantages",
        "explain": "While+譲歩節で相手の主張を一度認め、主節で自説を述べる型。certainly が「確かに」と譲歩を強める。利点を認めたうえで否定するので説得力が増す。Although でも代用可。"
      },
      {
        "no": 2,
        "title": "分詞構文による結果の補足",
        "example": "Countries such as South Korea achieved remarkable development mainly through state-led investment in technology, demonstrating that internal capacity drives lasting prosperity.",
        "highlight": "demonstrating that internal capacity drives lasting prosperity",
        "explain": "前の文全体を意味上の主語にした分詞構文。「〜し、その結果〜を示している」と結論を添える。, demonstrating that 節は英作文で根拠→帰結をつなぐ定番。which shows that に言い換え可。"
      },
      {
        "no": 3,
        "title": "受動態の時の節 (When + be opened)",
        "example": "When markets are opened abruptly, local farmers and small manufacturers may be unable to compete with cheaper imports.",
        "highlight": "When markets are opened abruptly",
        "explain": "市場を「開放する」主体(政府等)を明示せず、開放される側に焦点を当てるため受動態 are opened。be unable to compete with で「〜と競争できない」、compete は with とセットの自動詞。"
      }
    ]
  },
  "27": {
    "glossary": {
      "interconnected": {
        "pos": "Adjective",
        "ja": "相互につながった",
        "tag": "過去分詞",
        "grammar": "grow more interconnected=より相互連関する。connect の過去分詞が形容詞化、inter-(相互)が付く。"
      },
      "foreign aid": {
        "pos": "Noun",
        "ja": "対外援助",
        "tag": "無冠詞・不可算",
        "grammar": "aid(援助)は不可算→無冠詞。foreign が限定。「援助一般」を指す本文の主題語。"
      },
      "gained": {
        "pos": "Verb",
        "ja": "得た、増した",
        "tag": "過去分詞",
        "grammar": "has gained importance の過去分詞。現在完了で「重要性を増してきた」。"
      },
      "renewed": {
        "pos": "Adjective",
        "ja": "再び高まった、新たな",
        "tag": "過去分詞",
        "grammar": "renewed importance=改めて高まった重要性。renew の過去分詞が形容詞化。"
      },
      "importance": {
        "pos": "Noun",
        "ja": "重要性",
        "tag": "無冠詞・不可算",
        "grammar": "-ance 抽象名詞は不可算→無冠詞。importance of で「〜の重要性」。"
      },
      "firmly": {
        "pos": "Adverb",
        "ja": "固く、強く",
        "grammar": "I firmly believe=私は強く信じる。動詞 believe を修飾し主張を強める定型。"
      },
      "aid": {
        "pos": "Noun",
        "ja": "援助",
        "tag": "無冠詞・不可算",
        "grammar": "aid は常に不可算→無冠詞・複数形にしない。an aid は誤り。provide money as aid=援助として資金を出す。"
      },
      "compelling": {
        "pos": "Adjective",
        "ja": "説得力のある",
        "tag": "現在分詞",
        "grammar": "compelling reasons=説得力ある理由。compel(強いる)の現在分詞が形容詞化。「思わず納得させる」。"
      },
      "generous": {
        "pos": "Adjective",
        "ja": "気前のよい、手厚い",
        "grammar": "generous aid=手厚い援助。お金や量が「たっぷりした」。"
      },
      "strengthens": {
        "pos": "Verb",
        "ja": "強化する",
        "tag": "三単現",
        "grammar": "aid strengthens standing=援助が立場を強める。主語 aid が三単現で strengthens。strong→strengthen。"
      },
      "diplomatic": {
        "pos": "Adjective",
        "ja": "外交の",
        "grammar": "diplomatic standing=外交的地位。diplomacy(外交)の形容詞形。"
      },
      "standing": {
        "pos": "Noun",
        "ja": "地位、評判",
        "tag": "無冠詞・不可算",
        "grammar": "ここでは「地位・評判」の意味で不可算→無冠詞。動名詞ではない点に注意。"
      },
      "assisting": {
        "pos": "Verb",
        "ja": "支援すること",
        "tag": "動名詞",
        "grammar": "By assisting developing nations=途上国を支援することで。前置詞 by の後なので動名詞 -ing。"
      },
      "developing nations": {
        "pos": "Noun",
        "ja": "発展途上国",
        "tag": "複数形・現在分詞",
        "grammar": "developing は develop の現在分詞「発展しつつある」。複数の国で複数形。developed(先進)と対。"
      },
      "cultivates": {
        "pos": "Verb",
        "ja": "育む、培う",
        "tag": "三単現",
        "grammar": "Japan cultivates goodwill=日本が好意を培う。主語 Japan が三単現で cultivates。"
      },
      "goodwill": {
        "pos": "Noun",
        "ja": "好意、信用",
        "tag": "無冠詞・不可算",
        "grammar": "good+will の合成、不可算→無冠詞。「友好的な感情」。"
      },
      "reliable": {
        "pos": "Adjective",
        "ja": "信頼できる",
        "grammar": "reliable partners=頼れるパートナー。rely(頼る)の形容詞形。"
      },
      "infrastructure": {
        "pos": "Noun",
        "ja": "インフラ、社会基盤",
        "tag": "無冠詞・不可算",
        "grammar": "infrastructure は不可算→無冠詞・複数形にしない。道路・港など基盤設備の総称。"
      },
      "support": {
        "pos": "Noun",
        "ja": "支援",
        "tag": "無冠詞・不可算",
        "grammar": "ここでは名詞で不可算→無冠詞。infrastructure support=インフラ支援。"
      },
      "earned": {
        "pos": "Verb",
        "ja": "得た、獲得した",
        "tag": "過去分詞",
        "grammar": "has earned trust の過去分詞。現在完了で「信頼を勝ち取ってきた」。労力で「稼ぐ」イメージ。"
      },
      "considerable": {
        "pos": "Adjective",
        "ja": "かなりの、相当な",
        "grammar": "considerable trust=相当な信頼。量・程度が「無視できないほど大きい」。"
      },
      "trust": {
        "pos": "Noun",
        "ja": "信頼",
        "tag": "無冠詞・不可算",
        "grammar": "trust は不可算→無冠詞。a trust は別語義(信託)。"
      },
      "translates": {
        "pos": "Verb",
        "ja": "転化する、つながる",
        "tag": "句動詞・三単現",
        "grammar": "translate into=〜に転化する。into とセット。「援助が外交的影響力に変わる」。主語 aid が三単現で translates。"
      },
      "influence": {
        "pos": "Noun",
        "ja": "影響力",
        "tag": "無冠詞・不可算",
        "grammar": "ここでは不可算→無冠詞。diplomatic influence=外交的影響力。動詞だと「影響を与える」。"
      },
      "address": {
        "pos": "Verb",
        "ja": "対処する、取り組む",
        "grammar": "address global problems=世界的問題に対処する。他動詞、前置詞不要。「住所」とは別義。"
      },
      "ultimately": {
        "pos": "Adverb",
        "ja": "最終的には",
        "grammar": "ultimately affect Japan=最終的に日本に影響する。動詞を修飾。"
      },
      "borders": {
        "pos": "Noun",
        "ja": "国境",
        "tag": "複数形",
        "grammar": "recognize no borders=国境を認めない(=国境を越える)。複数の国境で複数形。"
      },
      "funding": {
        "pos": "Verb",
        "ja": "資金を出すこと",
        "tag": "動名詞",
        "grammar": "by funding clean water=きれいな水に資金を出すことで。前置詞 by の後で動名詞。"
      },
      "disaster relief": {
        "pos": "Noun",
        "ja": "災害救援",
        "tag": "無冠詞・不可算",
        "grammar": "relief(救援)は不可算→無冠詞。disaster が限定。"
      },
      "abroad": {
        "pos": "Adverb",
        "ja": "海外で",
        "grammar": "healthcare abroad=海外での医療。副詞なので前置詞 to/in は不要。go abroad と同じ用法。"
      },
      "contributes": {
        "pos": "Verb",
        "ja": "貢献する",
        "tag": "句動詞・三単現",
        "grammar": "contribute to=〜に貢献する。to とセット。主語 Japan が三単現で contributes。"
      },
      "stable": {
        "pos": "Adjective",
        "ja": "安定した",
        "grammar": "a more stable world=より安定した世界。比較級 more。stability の形容詞形。"
      },
      "benefits": {
        "pos": "Verb",
        "ja": "恩恵を受ける",
        "tag": "三単現",
        "grammar": "from which it also benefits=日本もそこから恩恵を受ける。benefit from=〜から利益を得る。主語 it が三単現で benefits。"
      },
      "stimulate": {
        "pos": "Verb",
        "ja": "刺激する、活性化する",
        "grammar": "stimulate the economy=経済を活性化する。他動詞。「刺激を与える」。"
      },
      "aid projects": {
        "pos": "Noun",
        "ja": "援助事業",
        "tag": "複数形",
        "grammar": "project は可算。複数の事業で複数形。aid が形容詞的に限定。"
      },
      "involve": {
        "pos": "Verb",
        "ja": "関与させる、巻き込む",
        "grammar": "involve Japanese companies=日本企業を巻き込む。他動詞。複数主語なので原形。"
      },
      "creating": {
        "pos": "Verb",
        "ja": "生み出して",
        "tag": "分詞構文",
        "grammar": "前文に続く分詞構文「〜を生み出しながら」。, creating business opportunities の形。"
      },
      "overseas": {
        "pos": "Adverb",
        "ja": "海外で",
        "grammar": "opportunities overseas=海外での機会。副詞、前置詞不要。abroad とほぼ同義。"
      },
      "assistance": {
        "pos": "Noun",
        "ja": "援助、支援",
        "tag": "無冠詞・不可算",
        "grammar": "-ance 抽象名詞は不可算→無冠詞。aid とほぼ同義の言い換え。"
      },
      "functions": {
        "pos": "Verb",
        "ja": "機能する、働く",
        "tag": "句動詞・三単現",
        "grammar": "function as=〜として機能する。as とセット。主語 assistance が三単現で functions。"
      },
      "charity": {
        "pos": "Noun",
        "ja": "慈善",
        "tag": "無冠詞・不可算",
        "grammar": "not merely as charity=単なる慈善としてではなく。ここでは抽象概念で不可算・無冠詞。a charity だと「慈善団体」。"
      },
      "strategic": {
        "pos": "Adjective",
        "ja": "戦略的な",
        "grammar": "a strategic investment=戦略的投資。strategy の形容詞形。"
      },
      "yields": {
        "pos": "Verb",
        "ja": "生み出す",
        "tag": "三単現",
        "grammar": "a investment that yields returns=利益を生む投資。関係詞 that(=investment)が三単現で yields。"
      },
      "returns": {
        "pos": "Noun",
        "ja": "見返り、利益",
        "tag": "複数形",
        "grammar": "economic returns=経済的見返り。投資用語では複数形が定番。「リターン」。"
      },
      "critics": {
        "pos": "Noun",
        "ja": "批判する人々",
        "tag": "複数形",
        "grammar": "critics may cite=批判者は挙げるかもしれない。critic は可算、複数で複数形。"
      },
      "cite": {
        "pos": "Verb",
        "ja": "引き合いに出す、挙げる",
        "grammar": "cite budget constraints=予算の制約を引き合いに出す。他動詞。「根拠として示す」。"
      },
      "budget constraints": {
        "pos": "Noun",
        "ja": "予算の制約",
        "tag": "複数形",
        "grammar": "constraint は可算。複数の制約で複数形。budget が限定。"
      },
      "undeniable": {
        "pos": "Adjective",
        "ja": "否定できない、明白な",
        "grammar": "are undeniable=否定しようがない。un-+deny+-able。「疑う余地がない」。"
      },
      "enhances": {
        "pos": "Verb",
        "ja": "高める、強化する",
        "tag": "三単現",
        "grammar": "it enhances diplomacy=外交を強化する。because 節の主語 it が三単現で enhances。"
      },
      "tackles": {
        "pos": "Verb",
        "ja": "取り組む",
        "tag": "三単現",
        "grammar": "tackles global threats=世界的脅威に取り組む。他動詞、前置詞不要。主語 it が三単現で tackles。"
      },
      "shared": {
        "pos": "Adjective",
        "ja": "共有された、共通の",
        "tag": "過去分詞",
        "grammar": "shared global threats=共通の世界的脅威。share の過去分詞が形容詞化。"
      },
      "threats": {
        "pos": "Noun",
        "ja": "脅威",
        "tag": "複数形",
        "grammar": "threat は可算。複数の脅威で複数形。"
      },
      "certainly": {
        "pos": "Adverb",
        "ja": "確かに、必ず",
        "grammar": "should certainly increase=必ず増やすべきだ。should を強める副詞で結論を断定。"
      }
    },
    "vocab": [
      {
        "word": "cultivate",
        "pos": "Verb",
        "ipa": "/ˈkʌltɪveɪt/",
        "def": "to develop or build up a relationship, attitude, or quality over time",
        "example": "By assisting developing nations, Japan cultivates goodwill and reliable partners."
      },
      {
        "word": "goodwill",
        "pos": "Noun",
        "ipa": "/ˌɡʊdˈwɪl/",
        "def": "friendly and helpful feelings toward another person or group",
        "example": "Japan cultivates goodwill and reliable international partners."
      },
      {
        "word": "translate",
        "pos": "Verb",
        "ipa": "/trænzˈleɪt/",
        "def": "to result in or lead to something else",
        "example": "Aid translates directly into lasting diplomatic influence."
      },
      {
        "word": "address",
        "pos": "Verb",
        "ipa": "/əˈdres/",
        "def": "to deal with or take action on a problem or issue",
        "example": "Increased aid helps address global problems that ultimately affect Japan itself."
      },
      {
        "word": "stimulate",
        "pos": "Verb",
        "ipa": "/ˈstɪmjʊleɪt/",
        "def": "to encourage activity or growth in something",
        "example": "Foreign aid can stimulate Japan's own economy."
      },
      {
        "word": "strategic",
        "pos": "Adjective",
        "ipa": "/strəˈtiːdʒɪk/",
        "def": "done as part of a long-term plan to achieve a particular goal",
        "example": "Assistance functions not merely as charity but as a strategic investment."
      },
      {
        "word": "undeniable",
        "pos": "Adjective",
        "ipa": "/ˌʌndɪˈnaɪəbl/",
        "def": "unable to be denied or disputed; clearly true",
        "example": "The advantages of expanded foreign aid are undeniable."
      },
      {
        "word": "compelling",
        "pos": "Adjective",
        "ipa": "/kəmˈpelɪŋ/",
        "def": "so convincing that it demands attention or agreement",
        "example": "The Japanese government should provide more aid, for three compelling reasons."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "not merely A but B (単なるAではなくB)",
        "example": "Well-designed assistance functions not merely as charity but as a strategic investment that yields long-term economic returns.",
        "highlight": "not merely as charity but as a strategic investment",
        "explain": "not merely A but B=「単にAというだけでなくBだ」。A を否定せず格上げして B を強調する型。merely の代わりに only/just も可。function as の as が A・B 両方にかかり構造が対になる。"
      },
      {
        "no": 2,
        "title": "関係詞 from which (前置詞+関係代名詞)",
        "example": "Japan contributes to a more stable world from which it also benefits.",
        "highlight": "from which it also benefits",
        "explain": "benefit from(〜から恩恵を受ける)の from を関係代名詞 which の前に出した形。先行詞は world。本来 it benefits from the world を一文に組み込む。前置詞を関係詞の前に置く格調高い書き方。"
      },
      {
        "no": 3,
        "title": "By + 動名詞 (手段の表現)",
        "example": "By assisting developing nations, Japan cultivates goodwill and reliable international partners.",
        "highlight": "By assisting developing nations",
        "explain": "by+動名詞 -ing で「〜することによって」と手段・方法を表す。前置詞 by の後は必ず動名詞。文頭に置くと理由づけの導入になり、エッセイの各段落冒頭で使いやすい。"
      }
    ]
  },
  "28": {
    "glossary": {
      "climate change": {
        "pos": "Noun",
        "ja": "気候変動",
        "tag": "無冠詞・不可算",
        "grammar": "change はここで不可算→無冠詞。climate が限定。本文の主題語、固有概念として無冠詞で総称。"
      },
      "gravest": {
        "pos": "Adjective",
        "ja": "最も深刻な",
        "tag": "最上級",
        "grammar": "grave(深刻な)の最上級。one of the gravest threats=最も深刻な脅威の一つ。one of the+最上級+複数形が定型。"
      },
      "threats": {
        "pos": "Noun",
        "ja": "脅威",
        "tag": "複数形",
        "grammar": "one of the gravest threats なので複数形。threat は可算。"
      },
      "era": {
        "pos": "Noun",
        "ja": "時代",
        "tag": "所有格",
        "grammar": "our era=我々の時代。所有格 our が付くので冠詞は不要。"
      },
      "combat": {
        "pos": "Verb",
        "ja": "闘う、対策する",
        "grammar": "combat it=それと闘う。他動詞、前置詞不要。fight against より硬い語。本文頻出。"
      },
      "endangers": {
        "pos": "Verb",
        "ja": "危険にさらす",
        "tag": "三単現",
        "grammar": "change endangers survival=変動が生存を脅かす。主語 change が三単現で endangers。en-+danger。"
      },
      "survival": {
        "pos": "Noun",
        "ja": "生存",
        "tag": "無冠詞・不可算",
        "grammar": "-al 抽象名詞は不可算→無冠詞。survive の名詞形。human survival=人類の生存。"
      },
      "rising": {
        "pos": "Adjective",
        "ja": "上昇する",
        "tag": "現在分詞",
        "grammar": "rising temperatures=上昇する気温。rise の現在分詞が形容詞化。「上がりつつある」進行の含み。"
      },
      "temperatures": {
        "pos": "Noun",
        "ja": "気温",
        "tag": "複数形",
        "grammar": "具体的な複数地点・時期の気温を指すので複数形。一般論の「温度」なら不可算もある。"
      },
      "exacerbate": {
        "pos": "Verb",
        "ja": "悪化させる",
        "grammar": "exacerbate droughts=干ばつを悪化させる。他動詞。複数主語 temperatures なので原形。worsen の硬い語。"
      },
      "droughts": {
        "pos": "Noun",
        "ja": "干ばつ",
        "tag": "複数形",
        "grammar": "drought は可算。複数の干ばつで複数形。"
      },
      "floods": {
        "pos": "Noun",
        "ja": "洪水",
        "tag": "複数形",
        "grammar": "flood は可算。複数の洪水で複数形。"
      },
      "extreme weather": {
        "pos": "Noun",
        "ja": "異常気象",
        "tag": "無冠詞・不可算",
        "grammar": "weather は常に不可算→無冠詞・複数形にしない。a weather は誤り。extreme が限定。"
      },
      "devastate": {
        "pos": "Verb",
        "ja": "壊滅させる",
        "grammar": "that devastate communities=地域社会を壊滅させる。関係詞 that の先行詞が複数(droughts等)なので原形 devastate。"
      },
      "communities": {
        "pos": "Noun",
        "ja": "地域社会",
        "tag": "複数形",
        "grammar": "community は可算。複数の地域社会で複数形。語尾 y→ies。"
      },
      "record": {
        "pos": "Adjective",
        "ja": "記録的な",
        "grammar": "record heatwaves=記録的な熱波。名詞 record が形容詞的に「過去最高の」を表す用法。"
      },
      "heatwaves": {
        "pos": "Noun",
        "ja": "熱波",
        "tag": "複数形",
        "grammar": "heatwave は可算。複数の熱波で複数形。"
      },
      "caused": {
        "pos": "Verb",
        "ja": "引き起こした",
        "tag": "過去形",
        "grammar": "heatwaves caused deaths=熱波が死をもたらした。過去の出来事なので過去形。"
      },
      "deaths": {
        "pos": "Noun",
        "ja": "死、死者",
        "tag": "複数形",
        "grammar": "thousands of deaths=何千もの死。具体的な複数の死亡例で複数形。death は文脈で可算化。"
      },
      "demonstrating": {
        "pos": "Verb",
        "ja": "示している",
        "tag": "分詞構文",
        "grammar": "前文を主語にした分詞構文「〜を示しながら」。, demonstrating that... の定型。結論を添える。"
      },
      "inaction": {
        "pos": "Noun",
        "ja": "無策、何もしないこと",
        "tag": "無冠詞・不可算",
        "grammar": "in-+action の抽象名詞、不可算→無冠詞。action の否定。"
      },
      "unacceptable": {
        "pos": "Adjective",
        "ja": "容認できない",
        "grammar": "an unacceptable human cost=容認できない人的代償。un-+accept+-able。"
      },
      "authority": {
        "pos": "Noun",
        "ja": "権限",
        "tag": "無冠詞・不可算",
        "grammar": "ここでは「権限」の意味で不可算→無冠詞。the authority to do=〜する権限。an authority だと「権威者」。"
      },
      "resources": {
        "pos": "Noun",
        "ja": "資源",
        "tag": "複数形",
        "grammar": "resource は通例複数形で「資金・資源・手段」。the resources to act=行動するための資源。"
      },
      "sufficient": {
        "pos": "Adjective",
        "ja": "十分な",
        "grammar": "a sufficient scale=十分な規模。enough より硬い語。on a sufficient scale=十分な規模で。"
      },
      "scale": {
        "pos": "Noun",
        "ja": "規模",
        "tag": "冠詞 a",
        "grammar": "on a sufficient scale=十分な規模で。on a ... scale で「〜の規模で」の定型、a が付く。"
      },
      "combating": {
        "pos": "Verb",
        "ja": "対策すること",
        "tag": "動名詞",
        "grammar": "Combating climate change requires...=気候変動と闘うには〜を要する。文頭の動名詞主語、単数扱いで requires。"
      },
      "requires": {
        "pos": "Verb",
        "ja": "必要とする",
        "tag": "三単現",
        "grammar": "主語が動名詞 Combating(単数扱い)なので requires。require O=Oを要する。"
      },
      "sweeping": {
        "pos": "Adjective",
        "ja": "広範囲な、抜本的な",
        "tag": "現在分詞",
        "grammar": "sweeping regulation=抜本的な規制。sweep の現在分詞が形容詞化。「全面的な」。"
      },
      "regulation": {
        "pos": "Noun",
        "ja": "規制",
        "tag": "無冠詞・不可算",
        "grammar": "ここでは制度・行為全般で不可算→無冠詞。regulations と複数なら個々の規則。"
      },
      "large-scale": {
        "pos": "Adjective",
        "ja": "大規模な",
        "grammar": "large-scale investment=大規模投資。複合形容詞、名詞を修飾。"
      },
      "renewable energy": {
        "pos": "Noun",
        "ja": "再生可能エネルギー",
        "tag": "無冠詞・不可算",
        "grammar": "energy は不可算→無冠詞。renewable が限定。"
      },
      "cooperation": {
        "pos": "Noun",
        "ja": "協力",
        "tag": "無冠詞・不可算",
        "grammar": "-tion 抽象名詞は不可算→無冠詞。international cooperation=国際協力。"
      },
      "achieve": {
        "pos": "Verb",
        "ja": "達成する",
        "grammar": "cannot achieve alone=単独では達成できない。他動詞。「努力して成し遂げる」。"
      },
      "decisive": {
        "pos": "Adjective",
        "ja": "断固たる、決定的な",
        "grammar": "decisive leadership=断固たる指導力。decide の形容詞形。「迷いのない」。"
      },
      "leadership": {
        "pos": "Noun",
        "ja": "指導力",
        "tag": "無冠詞・不可算",
        "grammar": "-ship 抽象名詞は不可算→無冠詞。government leadership=政府の指導力。"
      },
      "indispensable": {
        "pos": "Adjective",
        "ja": "不可欠な",
        "grammar": "is indispensable=不可欠だ。in-+dispensable(なしで済む)。「欠かせない」。"
      },
      "coordinate": {
        "pos": "Verb",
        "ja": "調整する、まとめる",
        "grammar": "to coordinate efforts=取り組みをまとめるために。他動詞。「足並みを揃える」。"
      },
      "economical": {
        "pos": "Adjective",
        "ja": "経済的な、無駄のない",
        "grammar": "far more economical=はるかに無駄がない。比較級 more。economic(経済の)と区別、こちらは「割安・倹約的」。"
      },
      "delay": {
        "pos": "Noun",
        "ja": "遅れ、先延ばし",
        "tag": "無冠詞・不可算",
        "grammar": "than delay=先延ばしより。ここでは行為全般で不可算・無冠詞。動詞だと「遅らせる」。"
      },
      "mitigate": {
        "pos": "Verb",
        "ja": "緩和する、和らげる",
        "grammar": "measures to mitigate effects=影響を緩和する手段。他動詞。「悪影響を軽くする」。"
      },
      "adverse": {
        "pos": "Adjective",
        "ja": "不利な、悪い",
        "grammar": "adverse effects=悪影響。「逆らう・不利に働く」。adverse effects はコロケーション。"
      },
      "effects": {
        "pos": "Noun",
        "ja": "影響、効果",
        "tag": "複数形",
        "grammar": "adverse effects=悪影響。複数の影響で複数形。effect(結果)と affect(動詞)を混同しない。"
      },
      "costly": {
        "pos": "Adjective",
        "ja": "費用のかかる",
        "grammar": "appear costly=高くつくように見える。cost+ly だが副詞でなく形容詞。"
      },
      "expense": {
        "pos": "Noun",
        "ja": "費用、出費",
        "tag": "冠詞 the",
        "grammar": "the expense of repairing=修復の費用。of 句で限定されるので特定の the。"
      },
      "repairing": {
        "pos": "Verb",
        "ja": "修復すること",
        "tag": "動名詞",
        "grammar": "the expense of repairing=修復する費用。前置詞 of の後なので動名詞 -ing。"
      },
      "damage": {
        "pos": "Noun",
        "ja": "損害、被害",
        "tag": "無冠詞・不可算",
        "grammar": "damage は不可算→無冠詞・複数形にしない。damages は別義(損害賠償金)。future damage=将来の被害。"
      },
      "rising sea levels": {
        "pos": "Noun",
        "ja": "海面上昇",
        "tag": "複数形",
        "grammar": "level は可算。各地・各時点の海面で複数形が定番。rising は現在分詞の形容詞用法。"
      },
      "vastly": {
        "pos": "Adverb",
        "ja": "はるかに、非常に",
        "grammar": "vastly greater=はるかに大きい。比較級 greater を強める副詞。much/far の類義。"
      },
      "prevention": {
        "pos": "Noun",
        "ja": "予防",
        "tag": "無冠詞・不可算",
        "grammar": "-tion 抽象名詞は不可算→無冠詞。investing in prevention=予防への投資。"
      },
      "prudent": {
        "pos": "Adjective",
        "ja": "賢明な、慎重な",
        "grammar": "a prudent choice=賢明な選択。「先を見越して用心深い」。"
      },
      "responsible": {
        "pos": "Adjective",
        "ja": "責任ある",
        "grammar": "a prudent and responsible choice=賢明で責任ある選択。respond の形容詞形。"
      },
      "overwhelming": {
        "pos": "Adjective",
        "ja": "圧倒的な",
        "tag": "現在分詞",
        "grammar": "the case is overwhelming=主張は圧倒的だ。overwhelm の現在分詞が形容詞化。「反論を許さない」。"
      },
      "unique": {
        "pos": "Adjective",
        "ja": "唯一の、独自の",
        "grammar": "the unique capacity of governments=政府にしかない能力。「他に代えがたい」。a unique と冠詞は a(母音字でも /juː/ 音なので a)。"
      },
      "capacity": {
        "pos": "Noun",
        "ja": "能力",
        "tag": "冠詞 the",
        "grammar": "the unique capacity of governments=政府の独自の能力。of 句で限定されるので the。"
      },
      "logic": {
        "pos": "Noun",
        "ja": "論理",
        "tag": "無冠詞・不可算",
        "grammar": "logic は不可算→無冠詞。economic logic=経済的論理。a logic は誤り。"
      },
      "unquestionably": {
        "pos": "Adverb",
        "ja": "疑いなく",
        "grammar": "should unquestionably do more=疑いなくもっとやるべきだ。should を強め結論を断定する副詞。"
      }
    },
    "vocab": [
      {
        "word": "exacerbate",
        "pos": "Verb",
        "ipa": "/ɪɡˈzæsəbeɪt/",
        "def": "to make a problem or bad situation worse",
        "example": "Rising temperatures exacerbate droughts, floods, and extreme weather."
      },
      {
        "word": "devastate",
        "pos": "Verb",
        "ipa": "/ˈdevəsteɪt/",
        "def": "to destroy or badly damage something completely",
        "example": "Extreme weather can devastate communities."
      },
      {
        "word": "inaction",
        "pos": "Noun",
        "ipa": "/ɪnˈækʃn/",
        "def": "the state of doing nothing about a problem",
        "example": "Recent heatwaves demonstrate that inaction carries an unacceptable human cost."
      },
      {
        "word": "indispensable",
        "pos": "Adjective",
        "ipa": "/ˌɪndɪˈspensəbl/",
        "def": "absolutely necessary and impossible to do without",
        "example": "Decisive government leadership is indispensable to coordinate such efforts."
      },
      {
        "word": "mitigate",
        "pos": "Verb",
        "ipa": "/ˈmɪtɪɡeɪt/",
        "def": "to make something harmful less serious or severe",
        "example": "Measures to mitigate these adverse effects appear costly now."
      },
      {
        "word": "prudent",
        "pos": "Adjective",
        "ipa": "/ˈpruːdnt/",
        "def": "sensible and careful, especially in avoiding risks",
        "example": "Investing in prevention today represents a prudent and responsible financial choice."
      },
      {
        "word": "overwhelming",
        "pos": "Adjective",
        "ipa": "/ˌəʊvəˈwelmɪŋ/",
        "def": "very great or strong, so as to be difficult to resist or argue against",
        "example": "The case for stronger climate action is overwhelming."
      },
      {
        "word": "sweeping",
        "pos": "Adjective",
        "ipa": "/ˈswiːpɪŋ/",
        "def": "wide in range or effect; affecting many things",
        "example": "Combating climate change requires sweeping regulation."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "動名詞主語 + 三単現",
        "example": "Combating climate change requires sweeping regulation, large-scale investment in renewable energy, and international cooperation that individuals and companies cannot achieve alone.",
        "highlight": "Combating climate change requires",
        "explain": "動名詞句 Combating climate change が文の主語。動名詞主語は単数扱いなので動詞は三単現 requires。「〜することは…を必要とする」と抽象的な行為を主語に立てる書き出しの型。To combat... でも可。"
      },
      {
        "no": 2,
        "title": "比較による説得 (more economical than)",
        "example": "Early action is far more economical than delay.",
        "highlight": "far more economical than delay",
        "explain": "比較級 more economical than で「先延ばしより無駄がない」と対比。far が比較級を強調。economical(割安・倹約的)は economic(経済の)と別語なので注意。短い断定文で主張を際立たせる。"
      },
      {
        "no": 3,
        "title": "譲歩の Although + 主節の逆接",
        "example": "Although measures to mitigate these adverse effects appear costly now, the expense of repairing future damage from disasters and rising sea levels will be vastly greater.",
        "highlight": "Although measures to mitigate these adverse effects appear costly now",
        "explain": "Although+譲歩節で「今は高くつくが」と一旦認め、主節で「将来の被害修復の方がはるかに高い」と切り返す。appear+形容詞=「〜に見える」。costly は名詞 cost+ly だが形容詞。While でも代用可。"
      }
    ]
  },
  "29": {
    "glossary": {
      "artificial": {
        "pos": "Adjective",
        "ja": "人工の",
        "tag": "コロケーション",
        "grammar": "artificial intelligence で「人工知能」。固定の複合名詞。intelligence は不可算なので無冠詞で扱う。"
      },
      "intelligence": {
        "pos": "Noun",
        "ja": "知能",
        "tag": "無冠詞・不可算",
        "grammar": "-ence 抽象名詞は不可算→無冠詞。an intelligence のような可算化はしない。"
      },
      "arguably": {
        "pos": "Adverb",
        "ja": "おそらく、間違いなく",
        "grammar": "arguably は「議論の余地はあるが恐らく」と主張を和らげる文修飾副詞。文頭または be 動詞の後に置く。"
      },
      "transforming": {
        "pos": "Verb",
        "ja": "一変させる",
        "tag": "現在進行形",
        "grammar": "is transforming と進行形にすることで「今まさに変えつつある」進行中の変化を示す。状態ではなく動的プロセスを強調。"
      },
      "aspect": {
        "pos": "Noun",
        "ja": "側面",
        "tag": "冠詞 every",
        "grammar": "every aspect of で「〜のあらゆる側面」。every の後は単数形。every aspects は誤り。"
      },
      "modern": {
        "pos": "Adjective",
        "ja": "現代の",
        "grammar": "modern life で「現代の生活」。life は総称・不可算なので無冠詞。"
      },
      "profound": {
        "pos": "Adjective",
        "ja": "深い、重大な",
        "tag": "コロケーション",
        "grammar": "profound implications=「重大な影響」。deep より格調の高い語で、影響・意味の深さに使う。"
      },
      "implications": {
        "pos": "Noun",
        "ja": "影響、含意",
        "tag": "複数形",
        "grammar": "影響が多方面に及ぶため複数。implications for 〜 で「〜への影響」。前置詞は for。"
      },
      "widespread": {
        "pos": "Adjective",
        "ja": "広範な",
        "tag": "コロケーション",
        "grammar": "widespread anxieties=「広く見られる不安」。spread の過去分詞由来で wide と一語化した形容詞。"
      },
      "anxieties": {
        "pos": "Noun",
        "ja": "不安、懸念",
        "tag": "複数形",
        "grammar": "anxiety は通常不可算だが、個々の具体的な不安を列挙する含みで可算複数 anxieties に。複数の懸念事項を指す。"
      },
      "firmly": {
        "pos": "Adverb",
        "ja": "固く、強く",
        "grammar": "firmly believe で「固く信じる」。意見表明を強める定番コロケーション。動詞の前に置く。"
      },
      "believe": {
        "pos": "Verb",
        "ja": "信じる、思う",
        "tag": "語法 that節",
        "grammar": "believe that S V で意見を述べる。that 節を目的語に取る。会話では that 省略可だが論文調では残す。"
      },
      "ultimately": {
        "pos": "Adverb",
        "ja": "最終的に、結局",
        "grammar": "ultimately=「最終的には」。長期的な帰結を示し、in the long run と同義で論を締める。"
      },
      "impact": {
        "pos": "Noun",
        "ja": "影響",
        "tag": "冠詞 a",
        "grammar": "a positive impact。impact は具体的な影響を指すとき可算で、形容詞が付くと a を伴う。have an impact on 〜 が定番。"
      },
      "society": {
        "pos": "Noun",
        "ja": "社会",
        "tag": "無冠詞",
        "grammar": "社会一般を総称で指すとき無冠詞・単数。a society は「ある一つの社会」と特定化される。"
      },
      "enhances": {
        "pos": "Verb",
        "ja": "高める、向上させる",
        "tag": "三単現",
        "grammar": "主語 AI が三人称単数なので enhances と -s。improve より格調高く、質や価値を高める意味。"
      },
      "productivity": {
        "pos": "Noun",
        "ja": "生産性",
        "tag": "無冠詞・不可算",
        "grammar": "-ity 抽象名詞は不可算→無冠詞。productivities とはしない。"
      },
      "automating": {
        "pos": "Verb",
        "ja": "自動化する",
        "tag": "動名詞",
        "grammar": "by automating で「自動化することによって」。前置詞 by の後は動名詞 -ing。手段を表す。"
      },
      "repetitive": {
        "pos": "Adjective",
        "ja": "反復的な、単調な",
        "grammar": "repetitive tasks=「反復作業」。repeat の派生形容詞。退屈な繰り返し作業を指す。"
      },
      "tasks": {
        "pos": "Noun",
        "ja": "作業、仕事",
        "tag": "複数形",
        "grammar": "複数の作業を総称するため複数。task は可算名詞。"
      },
      "frees": {
        "pos": "Verb",
        "ja": "解放する、〜できるようにする",
        "tag": "語法 SVOC",
        "grammar": "free O to do=「O が〜できるよう解放する」。free workers to concentrate の形。to 不定詞を取る。"
      },
      "concentrate": {
        "pos": "Verb",
        "ja": "集中する",
        "tag": "句動詞",
        "grammar": "concentrate on 〜=「〜に集中する」。前置詞 on とセットで落とさない。"
      },
      "creative": {
        "pos": "Adjective",
        "ja": "創造的な",
        "grammar": "creative and strategic activities と and で並列。同じ性質(形容詞)を結ぶ。"
      },
      "strategic": {
        "pos": "Adjective",
        "ja": "戦略的な",
        "grammar": "strategy の派生形容詞。-gy→-gic と語尾変化。"
      },
      "activities": {
        "pos": "Noun",
        "ja": "活動",
        "tag": "複数形",
        "grammar": "複数種類の活動を指すため複数。activity は具体的活動では可算。"
      },
      "handle": {
        "pos": "Verb",
        "ja": "処理する、扱う",
        "grammar": "use AI to handle 〜 で「〜を処理するために AI を使う」。to 不定詞で目的を示す。"
      },
      "routine": {
        "pos": "Adjective",
        "ja": "決まりきった、日常の",
        "grammar": "routine data processing=「定型的なデータ処理」。形容詞で「ありふれた、定型の」。"
      },
      "processing": {
        "pos": "Noun",
        "ja": "処理",
        "tag": "無冠詞・不可算",
        "grammar": "data processing は不可算の複合名詞。無冠詞で扱う。"
      },
      "devote": {
        "pos": "Verb",
        "ja": "充てる、捧げる",
        "tag": "語法 SVO to",
        "grammar": "devote A to B=「A を B に充てる」。devote their time to higher-value work。to の後は名詞・動名詞。"
      },
      "higher-value": {
        "pos": "Adjective",
        "ja": "より価値の高い",
        "grammar": "higher-value work。複合形容詞でハイフン結合。high の比較級 higher を含み「より価値ある」。"
      },
      "thereby": {
        "pos": "Adverb",
        "ja": "それによって",
        "grammar": "thereby boosting=「それによって押し上げる」。前文の内容を受け、結果を表す分詞構文を導く堅い副詞。"
      },
      "boosting": {
        "pos": "Verb",
        "ja": "押し上げる、高める",
        "tag": "動名詞",
        "grammar": "thereby boosting overall efficiency と分詞構文。前文全体を主語的に受けて結果を示す。"
      },
      "overall": {
        "pos": "Adjective",
        "ja": "全体的な",
        "grammar": "overall efficiency=「全体の効率」。名詞の前で「総合的な」の意。"
      },
      "efficiency": {
        "pos": "Noun",
        "ja": "効率",
        "tag": "無冠詞・不可算",
        "grammar": "-ency 抽象名詞は不可算→無冠詞。"
      },
      "revolutionizing": {
        "pos": "Verb",
        "ja": "革命的に変える",
        "tag": "現在進行形",
        "grammar": "is revolutionizing と進行形で「今まさに激変させつつある」。revolution の動詞化 -ize 形。"
      },
      "healthcare": {
        "pos": "Noun",
        "ja": "医療",
        "tag": "無冠詞・不可算",
        "grammar": "医療分野全般を指す不可算名詞。無冠詞で扱う。一語綴りが一般的。"
      },
      "advanced": {
        "pos": "Adjective",
        "ja": "高度な、先進的な",
        "grammar": "advanced algorithms=「高度なアルゴリズム」。advance の過去分詞由来の形容詞。"
      },
      "algorithms": {
        "pos": "Noun",
        "ja": "アルゴリズム",
        "tag": "複数形",
        "grammar": "複数の演算手法を総称するため複数。可算名詞。"
      },
      "detect": {
        "pos": "Verb",
        "ja": "検出する、見つける",
        "grammar": "can detect diseases で「病気を検出できる」。助動詞 can の後は原形。"
      },
      "diseases": {
        "pos": "Noun",
        "ja": "病気",
        "tag": "複数形",
        "grammar": "diseases such as cancer と複数で総称。個別の病名 cancer は不可算で無冠詞。"
      },
      "remarkable": {
        "pos": "Adjective",
        "ja": "目覚ましい、著しい",
        "grammar": "remarkable accuracy=「目覚ましい正確さ」。注目に値するほど優れた様子。"
      },
      "accuracy": {
        "pos": "Noun",
        "ja": "正確さ、精度",
        "tag": "無冠詞・不可算",
        "grammar": "-acy 抽象名詞は不可算→無冠詞。with remarkable accuracy で副詞句。"
      },
      "surpassing": {
        "pos": "Verb",
        "ja": "上回る、しのぐ",
        "tag": "動名詞",
        "grammar": "often surpassing human specialists と分詞構文。前の節に付随する様子を表す。surpass=超える。"
      },
      "specialists": {
        "pos": "Noun",
        "ja": "専門家",
        "tag": "複数形",
        "grammar": "human specialists と複数で総称。可算名詞。"
      },
      "countless": {
        "pos": "Adjective",
        "ja": "無数の",
        "grammar": "countless lives=「無数の命」。count + less で「数え切れない」。後は複数名詞。"
      },
      "lives": {
        "pos": "Noun",
        "ja": "命",
        "tag": "複数形",
        "grammar": "life の複数形は lives(f→v 変化)。saves countless lives で「無数の命を救う」。"
      },
      "contributing": {
        "pos": "Verb",
        "ja": "貢献する",
        "tag": "句動詞",
        "grammar": "contribute to 〜=「〜に貢献する」。to は前置詞で後に名詞。分詞構文で結果を示す。"
      },
      "welfare": {
        "pos": "Noun",
        "ja": "福祉",
        "tag": "無冠詞・不可算",
        "grammar": "public welfare=「公共の福祉」。welfare は不可算、無冠詞。"
      },
      "broadens": {
        "pos": "Verb",
        "ja": "広げる",
        "tag": "三単現",
        "grammar": "主語 AI が三人称単数で broadens。broad(広い)の動詞化。access を目的語に取る。"
      },
      "access": {
        "pos": "Noun",
        "ja": "アクセス、利用機会",
        "tag": "無冠詞・不可算",
        "grammar": "access to 〜=「〜へのアクセス」。不可算で無冠詞。前置詞は to。"
      },
      "tailor": {
        "pos": "Verb",
        "ja": "合わせて作る、仕立てる",
        "grammar": "tailor A to B=「A を B に合わせる」。tailor lessons to each learner で「各学習者に合わせる」。元は「服を仕立てる」。"
      },
      "learner": {
        "pos": "Noun",
        "ja": "学習者",
        "tag": "コロケーション",
        "grammar": "each learner's pace と所有格。each の後は単数。learn + er の派生名詞。"
      },
      "regardless": {
        "pos": "Adverb",
        "ja": "〜に関係なく",
        "tag": "句動詞",
        "grammar": "regardless of 〜=「〜に関わらず」。of とセットの定型句。後に名詞。"
      },
      "disadvantaged": {
        "pos": "Adjective",
        "ja": "恵まれない",
        "grammar": "disadvantaged areas=「恵まれない地域」。disadvantage の過去分詞由来。社会的・経済的に不利な意。"
      },
      "personalized": {
        "pos": "Adjective",
        "ja": "個別化された",
        "grammar": "personalized instruction=「個別指導」。personalize の過去分詞由来の形容詞。"
      },
      "instruction": {
        "pos": "Noun",
        "ja": "指導、教育",
        "tag": "無冠詞・不可算",
        "grammar": "「指導」の意では不可算→無冠詞。複数 instructions だと「指示書・命令」の別義になる。"
      },
      "privileged": {
        "pos": "Adjective",
        "ja": "特権的な、恵まれた",
        "grammar": "a privileged few=「一握りの特権層」。the few との対比。privilege の過去分詞由来。"
      },
      "outweigh": {
        "pos": "Verb",
        "ja": "上回る、勝る",
        "grammar": "benefits outweigh dangers=「利点が危険を上回る」。out + weigh で「重さで勝る」。賛否を比較する定番動詞。"
      },
      "dangers": {
        "pos": "Noun",
        "ja": "危険",
        "tag": "複数形",
        "grammar": "複数の危険を総称するため複数。danger は具体的危険では可算。"
      },
      "democratizes": {
        "pos": "Verb",
        "ja": "民主化する、万人に開放する",
        "tag": "三単現",
        "grammar": "主語 AI が三人称単数で democratizes。ここでは「学びを万人に開く」の比喩。democracy の動詞化 -ize。"
      },
      "undoubtedly": {
        "pos": "Adverb",
        "ja": "疑いなく、間違いなく",
        "grammar": "undoubtedly=「疑いなく」。結論を断定的に強める文修飾副詞。un + doubt + edly。"
      }
    },
    "vocab": [
      {
        "word": "enhance",
        "pos": "Verb",
        "ipa": "/ɪnˈhɑːns/",
        "def": "to increase or further improve the good quality, value, or status of something",
        "example": "AI dramatically enhances productivity by automating repetitive tasks."
      },
      {
        "word": "revolutionize",
        "pos": "Verb",
        "ipa": "/ˌrevəˈluːʃənaɪz/",
        "def": "to completely change the way something is done or thought about",
        "example": "AI is revolutionizing healthcare with advanced diagnostic algorithms."
      },
      {
        "word": "surpass",
        "pos": "Verb",
        "ipa": "/səˈpɑːs/",
        "def": "to be greater or better than someone or something else",
        "example": "These algorithms detect cancer with an accuracy often surpassing human specialists."
      },
      {
        "word": "tailor",
        "pos": "Verb",
        "ipa": "/ˈteɪlə/",
        "def": "to make or adapt something for a particular purpose or person",
        "example": "Intelligent tutoring systems can tailor lessons to each learner."
      },
      {
        "word": "outweigh",
        "pos": "Verb",
        "ipa": "/ˌaʊtˈweɪ/",
        "def": "to be greater or more important than something else",
        "example": "Its benefits far outweigh its dangers."
      },
      {
        "word": "implication",
        "pos": "Noun",
        "ipa": "/ˌɪmplɪˈkeɪʃən/",
        "def": "a possible future effect or result of an action or decision",
        "example": "AI is transforming modern life, with profound implications for the future."
      },
      {
        "word": "productivity",
        "pos": "Noun",
        "ipa": "/ˌprɒdʌkˈtɪvəti/",
        "def": "the rate at which goods are produced or work is completed",
        "example": "Automating routine work boosts overall productivity."
      },
      {
        "word": "democratize",
        "pos": "Verb",
        "ipa": "/dɪˈmɒkrətaɪz/",
        "def": "to make something available to all people rather than only a privileged few",
        "example": "AI democratizes learning by reaching students in remote areas."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "譲歩の Despite 句で反論を先取り",
        "example": "Despite widespread anxieties, I firmly believe that AI will ultimately have a positive impact on society.",
        "highlight": "Despite widespread anxieties",
        "explain": "Despite + 名詞句で「〜にもかかわらず」。反対意見をまず認めてから主節で自説を述べると説得力が増す。Despite の後は名詞・動名詞(節は不可、節なら Although を使う)。In spite of でも同義。"
      },
      {
        "no": 2,
        "title": "結果を表す分詞構文 (thereby / allowing)",
        "example": "Many companies now use AI to handle routine data processing, allowing employees to devote their time to higher-value work and thereby boosting overall efficiency.",
        "highlight": "allowing employees to devote their time to higher-value work and thereby boosting overall efficiency",
        "explain": "前の節の内容を受けて「その結果〜する」を表す分詞構文。主節の主語と結果が連動するときカンマ + -ing で続ける。allow O to do(O が〜できるようにする)、thereby + -ing(それによって〜する)はともに結果・帰結を示す英作文の必殺型。"
      },
      {
        "no": 3,
        "title": "Because 倒置 + 三要素列挙で締める",
        "example": "Because it raises productivity, advances medicine, and democratizes learning, artificial intelligence will undoubtedly have a positive impact on society.",
        "highlight": "it raises productivity, advances medicine, and democratizes learning",
        "explain": "結論で三つの理由を動詞 + 目的語の形で A, B, and C と並列。raises / advances / democratizes は全て三人称単数現在で時制・形を揃える。Because 節を文頭に置き本論の根拠を凝縮してから主張を断定する型。"
      }
    ]
  },
  "30": {
    "glossary": {
      "increasingly": {
        "pos": "Adverb",
        "ja": "ますます",
        "grammar": "increasingly interconnected で「ますます相互に結びついた」。形容詞を修飾し程度の増大を示す。increasing の副詞形。"
      },
      "interconnected": {
        "pos": "Adjective",
        "ja": "相互につながった",
        "grammar": "inter(相互) + connected(つながった)。世界が互いに依存し合う様子。過去分詞由来の形容詞。"
      },
      "responsibilities": {
        "pos": "Noun",
        "ja": "責任、責務",
        "tag": "複数形",
        "grammar": "複数の責務を指すため複数。responsibility は具体的な責務では可算。responsibilities toward 〜 で「〜に対する責任」。"
      },
      "wealthy": {
        "pos": "Adjective",
        "ja": "裕福な",
        "grammar": "wealthy nations=「裕福な国々」。wealth(富)の形容詞。rich より格調が高い。"
      },
      "nations": {
        "pos": "Noun",
        "ja": "国家、国",
        "tag": "複数形",
        "grammar": "複数の国を指すため複数。nation は可算名詞。country より「国家・国民」の意味合いが強い。"
      },
      "frequently": {
        "pos": "Adverb",
        "ja": "しばしば、頻繁に",
        "grammar": "are frequently debated で「しばしば論じられる」。頻度の副詞で be 動詞と過去分詞の間に置く。"
      },
      "debated": {
        "pos": "Verb",
        "ja": "議論される",
        "tag": "受動",
        "grammar": "are debated と受動態。「誰が議論するか」は不問で話題そのものを主語に立てる論文調の型。"
      },
      "firmly": {
        "pos": "Adverb",
        "ja": "固く、強く",
        "grammar": "firmly believe=「固く信じる」。意見表明を強める定番。動詞の直前に置く。"
      },
      "developed": {
        "pos": "Adjective",
        "ja": "先進の、発展した",
        "grammar": "developed nations=「先進国」。develop の過去分詞由来の形容詞。対義は developing nations(途上国)。"
      },
      "developing": {
        "pos": "Adjective",
        "ja": "発展途上の",
        "grammar": "developing nations=「途上国」。現在分詞由来で「発展しつつある」。developed との対比に注意。"
      },
      "compelling": {
        "pos": "Adjective",
        "ja": "説得力のある、有無を言わせぬ",
        "grammar": "compelling reasons=「説得力ある理由」。compel(強いる)の現在分詞由来で「納得させずにいられない」。"
      },
      "bear": {
        "pos": "Verb",
        "ja": "負う、担う",
        "tag": "語法 SVO",
        "grammar": "bear a responsibility=「責任を負う」。bear は「負う・担う」の意で responsibility や burden と結ぶ定番動詞。"
      },
      "moral": {
        "pos": "Adjective",
        "ja": "道徳的な、倫理上の",
        "grammar": "a moral responsibility=「道徳的責任」。moral + responsibility のコロケーション。"
      },
      "assist": {
        "pos": "Verb",
        "ja": "援助する、助ける",
        "grammar": "assist those in need で「困窮者を助ける」。help より堅い語。assist O(直接目的語)を取る。"
      },
      "prosperity": {
        "pos": "Noun",
        "ja": "繁栄",
        "tag": "無冠詞・不可算",
        "grammar": "-ity 抽象名詞は不可算→無冠詞。their prosperity と所有格は付くが a は付けない。"
      },
      "historically": {
        "pos": "Adverb",
        "ja": "歴史的に",
        "grammar": "was historically built で「歴史的に築かれた」。過去の経緯を示す副詞。be 動詞と過去分詞の間に置く。"
      },
      "built": {
        "pos": "Verb",
        "ja": "築かれた",
        "tag": "受動・過去分詞",
        "grammar": "was built upon 〜 で「〜の上に築かれた」。build の過去分詞。受動態 + upon で土台を示す。"
      },
      "resources": {
        "pos": "Noun",
        "ja": "資源",
        "tag": "複数形",
        "grammar": "多種の資源を総称するため複数。resource は可算で「資源・財源」。"
      },
      "labor": {
        "pos": "Noun",
        "ja": "労働",
        "tag": "無冠詞・不可算",
        "grammar": "労働力全般を指す不可算名詞。無冠詞。(英)labour、(米)labor の綴り。"
      },
      "drawn": {
        "pos": "Verb",
        "ja": "引き出された、得られた",
        "tag": "受動・過去分詞",
        "grammar": "drawn from 〜 で「〜から引き出された」。draw の過去分詞。resources and labor を後置修飾する受動の分詞。"
      },
      "former": {
        "pos": "Adjective",
        "ja": "以前の、かつての",
        "grammar": "former colonial powers=「かつての植民地大国」。名詞の前で「以前の」。the former と単独なら「前者」。"
      },
      "colonial": {
        "pos": "Adjective",
        "ja": "植民地の",
        "grammar": "colonial powers=「植民地支配国」。colony(植民地)の形容詞。"
      },
      "powers": {
        "pos": "Noun",
        "ja": "大国、強国",
        "tag": "複数形",
        "grammar": "colonial powers と複数で「列強・支配国」。この意味では可算。不可算の power(力)と区別。"
      },
      "exploitation": {
        "pos": "Noun",
        "ja": "搾取",
        "tag": "無冠詞・不可算",
        "grammar": "-tion 抽象名詞は不可算→無冠詞。through exploitation で「搾取によって」。exploit の名詞形。"
      },
      "demonstrating": {
        "pos": "Verb",
        "ja": "示している",
        "tag": "動名詞",
        "grammar": "demonstrating that 〜 と分詞構文。前文全体を受けて「〜を示している」と結論づける。that 節を取る。"
      },
      "meaningful": {
        "pos": "Adjective",
        "ja": "意義ある、実質的な",
        "grammar": "meaningful aid=「実のある援助」。meaning + ful で「意味・価値のある」。"
      },
      "generosity": {
        "pos": "Noun",
        "ja": "寛大さ、施し",
        "tag": "無冠詞・不可算",
        "grammar": "-ity 抽象名詞は不可算→無冠詞。not mere generosity で「単なる施しではない」。"
      },
      "repayment": {
        "pos": "Noun",
        "ja": "返済",
        "tag": "冠詞 a",
        "grammar": "a just repayment of 〜 で「〜の正当な返済」。repayment は具体的行為として可算。re + payment。"
      },
      "debt": {
        "pos": "Noun",
        "ja": "負債、借り",
        "grammar": "historical debt=「歴史的負債」。比喩で「返すべき借り」。発音は /det/ で b は黙字。"
      },
      "supporting": {
        "pos": "Verb",
        "ja": "支援すること",
        "tag": "動名詞",
        "grammar": "Supporting developing nations が文頭で動名詞主語(=「支援すること」)。主語なので述語動詞 promotes は三単現。"
      },
      "promotes": {
        "pos": "Verb",
        "ja": "促進する",
        "tag": "三単現",
        "grammar": "動名詞主語 Supporting 〜 は単数扱い→ promotes と -s。promote stability で「安定を促す」。"
      },
      "stability": {
        "pos": "Noun",
        "ja": "安定",
        "tag": "無冠詞・不可算",
        "grammar": "-ity 抽象名詞は不可算→無冠詞。global stability で「世界の安定」。"
      },
      "poverty": {
        "pos": "Noun",
        "ja": "貧困",
        "tag": "無冠詞・不可算",
        "grammar": "貧困状態を指す不可算名詞。無冠詞。a poverty とはしない。"
      },
      "inequality": {
        "pos": "Noun",
        "ja": "不平等、格差",
        "tag": "無冠詞・不可算",
        "grammar": "抽象概念として不可算→無冠詞。in + equality。具体的な格差を列挙する文脈では inequalities も可。"
      },
      "breed": {
        "pos": "Verb",
        "ja": "生む、引き起こす",
        "grammar": "breed conflict で「対立を生む」。元は「繁殖させる」だが比喩で「(問題を)生み出す」。目的語に conflict, migration 等。"
      },
      "conflict": {
        "pos": "Noun",
        "ja": "紛争、対立",
        "tag": "無冠詞・不可算",
        "grammar": "ここでは現象一般を指す不可算で無冠詞。個々の紛争を数える文脈では a conflict / conflicts と可算化。"
      },
      "migration": {
        "pos": "Noun",
        "ja": "移住、移民",
        "tag": "無冠詞・不可算",
        "grammar": "mass migration で「大量移住」。現象としては不可算→無冠詞。-tion 抽象名詞。"
      },
      "funding": {
        "pos": "Verb",
        "ja": "資金を出す、出資する",
        "tag": "動名詞",
        "grammar": "by funding 〜 で「〜に資金を出すことによって」。前置詞 by の後は動名詞。fund(資金を出す)の -ing 形。"
      },
      "infrastructure": {
        "pos": "Noun",
        "ja": "インフラ、社会基盤",
        "tag": "無冠詞・不可算",
        "grammar": "infrastructure は不可算→無冠詞・単数。infrastructures とは通常しない。"
      },
      "peaceful": {
        "pos": "Adjective",
        "ja": "平和な",
        "grammar": "a safer and more peaceful world と比較級を and で並列。peace + ful の形容詞。"
      },
      "assistance": {
        "pos": "Noun",
        "ja": "援助、支援",
        "tag": "無冠詞・不可算",
        "grammar": "-ance 抽象名詞は不可算→無冠詞。such assistance で「そうした援助」。aid とほぼ同義の堅い語。"
      },
      "donors": {
        "pos": "Noun",
        "ja": "援助国、提供者",
        "tag": "複数形",
        "grammar": "the donors themselves で「援助国自身」。複数を強調する再帰代名詞 themselves と呼応。donor は可算。"
      },
      "economies": {
        "pos": "Noun",
        "ja": "経済、経済圏",
        "tag": "複数形",
        "grammar": "developing economies と複数で「途上国の経済(圏)」。この意味では可算。economy の複数形。"
      },
      "valuable": {
        "pos": "Adjective",
        "ja": "価値ある、貴重な",
        "grammar": "valuable trading partners=「貴重な貿易相手」。value + able。発音注意 /ˈvæljuəbl/。"
      },
      "expanding": {
        "pos": "Adjective",
        "ja": "拡大する",
        "grammar": "expanding markets=「拡大する市場」。現在分詞由来で「広がりつつある」。expand の -ing 形。"
      },
      "markets": {
        "pos": "Noun",
        "ja": "市場",
        "tag": "複数形",
        "grammar": "複数の市場を指すため複数。market は可算名詞。"
      },
      "charity": {
        "pos": "Noun",
        "ja": "慈善、施し",
        "tag": "無冠詞・不可算",
        "grammar": "not merely as charity で「単なる慈善としてではなく」。慈善行為一般では不可算→無冠詞。a charity だと「慈善団体」の別義。"
      },
      "strategic": {
        "pos": "Adjective",
        "ja": "戦略的な",
        "grammar": "a strategic investment=「戦略的投資」。strategy の派生形容詞。-gy→-gic と変化。"
      },
      "investment": {
        "pos": "Noun",
        "ja": "投資",
        "tag": "冠詞 a",
        "grammar": "a strategic investment と可算。具体的な一件の投資を指し、形容詞が付くと a を伴う。一般論なら不可算で無冠詞も可。"
      },
      "substantial": {
        "pos": "Adjective",
        "ja": "かなりの、相当な",
        "grammar": "substantial returns=「相当な見返り」。big より格調高く「実質的に大きい」。"
      },
      "returns": {
        "pos": "Noun",
        "ja": "見返り、収益",
        "tag": "複数形",
        "grammar": "「収益・利益」の意では複数 returns。financial returns で「金銭的見返り」。単数 return(帰還・返却)と区別。"
      },
      "prioritize": {
        "pos": "Verb",
        "ja": "優先する",
        "grammar": "prioritize their own citizens で「自国民を優先する」。priority の動詞化 -ize。直接目的語を取る。"
      },
      "citizens": {
        "pos": "Noun",
        "ja": "国民、市民",
        "tag": "複数形",
        "grammar": "their own citizens と複数で「自国民」。citizen は可算。"
      },
      "undeniable": {
        "pos": "Adjective",
        "ja": "否定できない、明白な",
        "grammar": "the advantages are undeniable=「利点は否定しようがない」。un + deny + able。「議論の余地なく明らか」。"
      },
      "mutual": {
        "pos": "Adjective",
        "ja": "相互の",
        "grammar": "mutual prosperity=「相互の繁栄」。双方が利益を得る様子。mutual benefit も頻出。"
      },
      "certainly": {
        "pos": "Adverb",
        "ja": "確かに、間違いなく",
        "grammar": "should certainly do で「確かに〜すべきだ」。結論を断定的に強める文修飾副詞。"
      }
    },
    "vocab": [
      {
        "word": "compelling",
        "pos": "Adjective",
        "ipa": "/kəmˈpelɪŋ/",
        "def": "so strong or convincing that it cannot be resisted or ignored",
        "example": "Developed nations should do more, for three compelling reasons."
      },
      {
        "word": "exploitation",
        "pos": "Noun",
        "ipa": "/ˌeksplɔɪˈteɪʃən/",
        "def": "the unfair treatment of someone, or the use of a situation, in order to gain benefit",
        "example": "Many former colonial powers grew rich through exploitation."
      },
      {
        "word": "breed",
        "pos": "Verb",
        "ipa": "/briːd/",
        "def": "to cause something, especially something bad, to develop or happen",
        "example": "Poverty and inequality often breed conflict and mass migration."
      },
      {
        "word": "prosperity",
        "pos": "Noun",
        "ipa": "/prɒsˈperəti/",
        "def": "the state of being successful, especially financially",
        "example": "Much of their prosperity was historically built upon resources from poorer regions."
      },
      {
        "word": "strategic",
        "pos": "Adjective",
        "ipa": "/strəˈtiːdʒɪk/",
        "def": "planned carefully to achieve a particular long-term aim",
        "example": "Well-directed aid functions as a strategic investment."
      },
      {
        "word": "mutual",
        "pos": "Adjective",
        "ipa": "/ˈmjuːtʃuəl/",
        "def": "felt or done equally by two or more people or groups",
        "example": "Moral duty, global stability, and mutual prosperity all demand it."
      },
      {
        "word": "undeniable",
        "pos": "Adjective",
        "ipa": "/ˌʌndɪˈnaɪəbl/",
        "def": "certainly true; impossible to question or deny",
        "example": "The advantages of helping developing nations are undeniable."
      },
      {
        "word": "repayment",
        "pos": "Noun",
        "ipa": "/rɪˈpeɪmənt/",
        "def": "the act of paying back money or returning what is owed",
        "example": "Aid today is not mere generosity but a just repayment of historical debt."
      }
    ],
    "grammar": [
      {
        "no": 1,
        "title": "話題化のための受動態 (be debated)",
        "example": "In an increasingly interconnected world, the responsibilities of wealthy nations toward poorer ones are frequently debated.",
        "highlight": "the responsibilities of wealthy nations toward poorer ones are frequently debated",
        "explain": "「誰が議論するか」を伏せ、論点 the responsibilities を主語に立てる受動態。論文・エッセイの導入で話題を客観的に提示する常套手段。frequently のような頻度副詞は be 動詞と過去分詞 debated の間に置く。"
      },
      {
        "no": 2,
        "title": "相関接続詞 not (merely) A but B",
        "example": "Well-directed aid functions not merely as charity but as a strategic investment that yields substantial long-term returns.",
        "highlight": "not merely as charity but as a strategic investment",
        "explain": "not (merely) A but B=「A ではなく(単に A なだけでなく)B だ」で対比を際立たせる。A と B は文法的に対等な形(ここでは as + 名詞句)で揃えるのが鉄則。merely を入れると「単なる A にとどまらず B」と譲歩のニュアンスが加わる。"
      },
      {
        "no": 3,
        "title": "Because 節 + 三要素主語で結論を断定",
        "example": "Because moral duty, global stability, and mutual prosperity all demand it, developed nations should certainly do more to support the developing world.",
        "highlight": "moral duty, global stability, and mutual prosperity all demand it",
        "explain": "三つの根拠を A, B, and C と名詞で並列し、all で受けて demand(複数主語なので原形)に繋ぐ。Because 節を文頭に置いて本論の理由を凝縮し、主節で should + certainly により主張を断定する締めの定型。"
      }
    ]
  }
};
