// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/data/english/write-lesson-day1.ts
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
/**
 * Day 1 インタラクティブ・レッスン(試作)。
 * 模範解答(意見論述)を「全文タップ辞書 + 語彙演習 + 文法重要事項」のレッスンに。
 *
 * グロッサリーは品詞+和訳だけでなく、「なぜ複数形か/なぜ無冠詞か/なぜ the か/
 * なぜこの時制・語法か」の気の利いた文法解説(grammar)とタグ(tag)を持つ。
 * /english/articles(冠詞撲滅エンジン)と同じ粒度で、可算・不可算・冠詞・語法を丁寧に。
 */

export interface Gloss {
    pos: string;       // Noun | Verb | Adjective | Adverb | Phrase | Conjunction
    ja: string;
    tag?: string;      // 複数形 / 不可算 / 冠詞 the / 冠詞 a / 無冠詞 / 受動 / 動名詞 / 語法 など
    grammar?: string;  // なぜこの形か、の踏み込んだ解説
}

// 出現形(小文字)でキー。本文の内容語を広めにカバーし、文法的に語れる語には grammar を付ける。
export const DAY1_GLOSSARY: Record<string, Gloss> = {
    debate: { pos: 'Noun', ja: '議論、論争', tag: '不可算', grammar: '「議論」全般では不可算。much debate のように much が付くのが不可算の証拠(× many debates)。a heated debate(個別の討論会)なら可算化する。' },
    enormous: { pos: 'Adjective', ja: '莫大な、巨大な' },
    sums: { pos: 'Noun', ja: '金額、合計', tag: '複数形', grammar: 'sum=「金額」。複数年・複数項目にわたる莫大な支出を指すので複数。sums of money(多額の金)が定番コロケーション。' },
    spent: { pos: 'Verb', ja: '費やす(spend の過去分詞)', tag: '過去分詞・後置修飾', grammar: 'the sums (that are) spent on ... の関係詞+be 省略。「〜に費やされた金額」と名詞を後ろから修飾。spend money on の on がそのまま残る。' },
    exploration: { pos: 'Noun', ja: '探査、探検', tag: '無冠詞・不可算', grammar: '-tion の抽象名詞は基本不可算。space exploration で無冠詞のかたまり。an exploration(一回の探査)なら可算化。' },
    justified: { pos: 'Verb', ja: '正当化する(の過去分詞)', tag: '受動', grammar: 'can be justified=助動詞+受動態で「正当化されうる」。justify A=Aを(理由を示して)正当化する。' },
    expense: { pos: 'Noun', ja: '費用、出費', tag: '可算/不可算', grammar: '「費用」一般は不可算(the expense is vast)。複数 expenses は「諸経費・出費項目」。意味で可算が切り替わる典型語。' },
    undeniably: { pos: 'Adverb', ja: '紛れもなく、否定できないほど', tag: '語法', grammar: '文全体を修飾する文副詞。形容詞 vast の前に置いて「紛れもなく莫大」と譲歩を強める。Admittedly と同じ役割。' },
    vast: { pos: 'Adjective', ja: '莫大な、広大な' },
    firmly: { pos: 'Adverb', ja: '固く、きっぱりと', grammar: 'I firmly believe that ... 立場を強く打ち出すテーゼの定番。動詞 believe を修飾。' },
    believe: { pos: 'Verb', ja: '信じる、〜だと思う' },
    'long-term': { pos: 'Adjective', ja: '長期的な', tag: '複合形容詞', grammar: 'ハイフンで2語を1つの形容詞に。名詞の前で使う限定用法では long-term、述語では in the long term と形が変わる。' },
    benefits: { pos: 'Noun', ja: '利益、恩恵', tag: '複数形', grammar: 'benefit=利点は可算。複数の利点を列挙する論旨なので複数。the benefits ... は後ろの of/文脈で「この件の利点」と特定され the が付く。' },
    far: { pos: 'Adverb', ja: 'はるかに(強調)', tag: '比較の強調', grammar: '比較表現の前に置いて「はるかに」。far outweigh / far more important のように much / significantly と同じく程度を強める。' },
    outweigh: { pos: 'Verb', ja: '〜を上回る、〜に勝る', grammar: 'out-(超える)+weigh(重さ)。天秤の比喩で「重要性・利益が勝る」。benefits outweigh the costs/drawbacks が結論の鉄板。' },
    costs: { pos: 'Noun', ja: 'コスト、費用', tag: '複数形', grammar: 'benefits と対にして複数で揃える。cost は「費用」では可算、the cost of living のように of で特定もする。' },
    reasons: { pos: 'Noun', ja: '理由', tag: '複数形', grammar: 'three reasons なので当然複数。for three main reasons=序論末で本論3段落を予告する型。' },
    plays: { pos: 'Verb', ja: '(役割を)果たす', tag: '三単現', grammar: '主語 space exploration は不可算で単数扱い→ plays に -s。play a crucial role in -ing がかたまり。' },
    crucial: { pos: 'Adjective', ja: '極めて重要な', grammar: 'important の格上げ。play a crucial/pivotal/vital role in で重要性を述べる定番コロケーション。' },
    role: { pos: 'Noun', ja: '役割', tag: '冠詞 a', grammar: 'play a role の a は必須。role は可算で「一つの役割」。a crucial role in driving ... と続く。' },
    driving: { pos: 'Verb', ja: '推進する、駆り立てる', tag: '前置詞+動名詞', grammar: 'in driving=前置詞 in+動名詞で「〜を推進する点で」。role in (doing) の形。' },
    technological: { pos: 'Adjective', ja: '技術的な、科学技術の' },
    innovation: { pos: 'Noun', ja: '技術革新', tag: '無冠詞・不可算', grammar: '概念としての「革新」は不可算→無冠詞。an innovation なら「一つの新機軸」と可算化。technological innovation のかたまりで覚える。' },
    challenges: { pos: 'Noun', ja: '課題、難題', tag: '冠詞 the+複数', grammar: 'The challenges of operating in space=of句で「どの困難か」が特定されるので the。challenge は可算で複数化。' },
    operating: { pos: 'Verb', ja: '活動する、操作する', tag: '前置詞+動名詞', grammar: 'of operating in space=前置詞 of+動名詞。「宇宙で活動することの(困難)」。' },
    force: { pos: 'Verb', ja: '(無理に)〜させる、強いる', tag: '語法 SVOC', grammar: 'force O to do=「Oに〜するのを強いる」。force + 人 + to不定詞の使役構文。make が to なしなのに対し force は to を取る。' },
    scientists: { pos: 'Noun', ja: '科学者', tag: '無冠詞複数(総称)', grammar: '無冠詞の複数形で「科学者というもの全般」を表す総称用法。論述で人・物を一般化するときの基本形。' },
    develop: { pos: 'Verb', ja: '開発する、発展させる' },
    solutions: { pos: 'Noun', ja: '解決策', tag: '複数形', grammar: 'develop solutions=複数の解決策を生む。solution は可算。the solution to(〜の解決策)では to を取る。' },
    transform: { pos: 'Verb', ja: '一変させる、変革する', grammar: 'change の格上げ。transform everyday life=日常を根本から変える。' },
    everyday: { pos: 'Adjective', ja: '日常の、毎日の', tag: '紛らわしい語', grammar: '一語の everyday は形容詞「日常の」(everyday life)。二語の every day は副詞「毎日」。スペルで品詞が変わる頻出ミス。' },
    prime: { pos: 'Adjective', ja: '最も良い、主要な', grammar: 'a prime example of=「その好例」。For example の格上げ言い換え。' },
    example: { pos: 'Noun', ja: '例、実例', tag: '冠詞 a', grammar: 'A prime example of this is ... 初出で不特定なので a。example は可算。' },
    satellite: { pos: 'Noun', ja: '人工衛星' },
    navigation: { pos: 'Noun', ja: 'ナビ、位置測定', tag: '冠詞 the', grammar: 'the satellite navigation we now rely on=後ろの関係詞節で「どのナビか」が限定されるので the。後置修飾→the の典型。' },
    rely: { pos: 'Verb', ja: '頼る、当てにする', tag: '句動詞', grammar: 'rely on=〜に頼る。on とセット。前置詞 on を落とさない。(the navigation) we rely on の末尾に on が残るのは関係詞で目的語が前に出たため。' },
    originated: { pos: 'Verb', ja: '生まれた、始まった', tag: '自動詞', grammar: 'originate from=〜から生まれる。自動詞なので受動にしない(× was originated)。' },
    programs: { pos: 'Noun', ja: '計画、プログラム', tag: '複数形', grammar: 'space programs=各国の宇宙計画(複数)。program は可算。' },
    essential: { pos: 'Adjective', ja: '不可欠な、必須の', grammar: 'essential for/to=〜に不可欠。very important の格上げ。' },
    survival: { pos: 'Noun', ja: '生存、存続', tag: '冠詞 the・不可算', grammar: 'survival は不可算だが、the survival of humanity と of句で限定されるので the が付く。' },
    humanity: { pos: 'Noun', ja: '人類', tag: '無冠詞・不可算', grammar: '人類全体を表す humanity は無冠詞不可算。mankind / humankind も同様。the human race だけ the を取る。' },
    resources: { pos: 'Noun', ja: '資源', tag: '無冠詞複数(総称)', grammar: '無冠詞複数で「資源全般」。resources on Earth=地球上の資源。単数 resource は「(一つの)資源・手段」。' },
    increasingly: { pos: 'Adverb', ja: 'ますます', grammar: '形容詞 strained を修飾し「だんだん逼迫して」。趨勢を示す論述頻出副詞。' },
    strained: { pos: 'Adjective', ja: '逼迫した、張りつめた', tag: '過去分詞→形容詞', grammar: 'become strained=形容詞化した過去分詞。「(資源が)張りつめる=不足する」。' },
    locating: { pos: 'Verb', ja: '見つけ出す、位置を突き止める', tag: '動名詞主語', grammar: 'Locating ... becomes vital=動名詞句が主語。主語の動名詞は単数扱い→ becomes に -s。' },
    sources: { pos: 'Noun', ja: '源、供給源', tag: '複数形', grammar: 'new sources of materials=複数の供給源。source of=〜の源。' },
    materials: { pos: 'Noun', ja: '物資、材料', tag: '複数形', grammar: 'ここでは「資材・物資(可算的)」で複数。material 単数は「素材」全般で不可算にもなる、意味で可算が変わる語。' },
    potential: { pos: 'Adjective', ja: '潜在的な、可能性のある' },
    habitats: { pos: 'Noun', ja: '生息地、居住地', tag: '複数形' },
    vital: { pos: 'Adjective', ja: '極めて重要な、不可欠の', grammar: 'crucial / essential の言い換え。becomes vital=不可欠になる。手札を増やす同義語。' },
    asteroid: { pos: 'Noun', ja: '小惑星' },
    mining: { pos: 'Noun', ja: '採掘', tag: '無冠詞・不可算', grammar: '活動を表す -ing 名詞は不可算。asteroid mining で無冠詞のかたまり。' },
    supply: { pos: 'Verb', ja: '供給する', grammar: 'could supply=「供給しうる」。supply A with B / supply B(to A) の語法。' },
    minerals: { pos: 'Noun', ja: '鉱物', tag: '複数形' },
    scarce: { pos: 'Adjective', ja: '乏しい、希少な', tag: '語法', grammar: 'grow/become scarce=希少になる。growing scarce=だんだん不足してきている。物資が「手に入りにくい」の定番形容詞。' },
    planet: { pos: 'Noun', ja: '惑星(ここでは地球)', tag: '所有格', grammar: 'our planet=「我々の惑星=地球」。the planet / our planet で Earth の言い換え。' },
    inspires: { pos: 'Verb', ja: '促す、鼓舞する', tag: '三単現', grammar: '主語 space exploration(不可算単数)→ inspires。inspire 物事=〜を呼び起こす。' },
    international: { pos: 'Adjective', ja: '国際的な' },
    cooperation: { pos: 'Noun', ja: '協力', tag: '無冠詞・不可算', grammar: 'cooperation は不可算→無冠詞。international cooperation のかたまり。a cooperation とは言わない。' },
    scientific: { pos: 'Adjective', ja: '科学的な' },
    ambition: { pos: 'Noun', ja: '野心、大志', tag: '可算/不可算', grammar: 'ここは「向上心」全般で無冠詞・不可算。an ambition なら「(具体的な)一つの野望」と可算化。' },
    massive: { pos: 'Adjective', ja: '巨大な、大規模な' },
    projects: { pos: 'Noun', ja: '事業、プロジェクト', tag: '複数形' },
    require: { pos: 'Verb', ja: '必要とする、要求する', tag: '語法 SVOC', grammar: 'require O to do=「Oに〜することを求める」。force と同じく to不定詞を取る使役系。' },
    nations: { pos: 'Noun', ja: '国家、国', tag: '無冠詞複数(総称)', grammar: '無冠詞複数で「国々一般」。nation は可算。the nation なら特定の一国(国民)。' },
    pool: { pos: 'Verb', ja: '(資源・知恵を)出し合う', tag: '語法', grammar: '名詞 pool(プール=溜め)から転じた動詞。pool their expertise=専門知識を結集する。お金・人材にも使う。' },
    expertise: { pos: 'Noun', ja: '専門知識、専門技術', tag: '不可算', grammar: 'expertise は不可算。× an expertise / × expertises。much / considerable / technical expertise のように量で修飾する。' },
    compete: { pos: 'Verb', ja: '競争する', tag: '並列・原形', grammar: 'rather than compete=to pool ... rather than (to) compete の並列。rather than の後は原形/動名詞。' },
    demonstrates: { pos: 'Verb', ja: '示す、証明する', tag: '間接疑問', grammar: 'demonstrate how ...=how節(間接疑問)を目的語に取る。「いかに〜かを示す」。語順は平叙文(how rivals can collaborate)。' },
    former: { pos: 'Adjective', ja: 'かつての、以前の', grammar: 'former rivals=かつての敵。the former / the latter(前者/後者)とは別用法。' },
    rivals: { pos: 'Noun', ja: '競争相手、敵対者', tag: '複数形' },
    collaborate: { pos: 'Verb', ja: '協力する、共同で取り組む', tag: '自動詞', grammar: 'collaborate with(人)/ on(事)/ toward(目標)。自動詞なので前置詞を伴う。cooperate と同義。' },
    productively: { pos: 'Adverb', ja: '生産的に', grammar: '動詞 collaborate を修飾。collaborate productively=実りある形で協力する。' },
    shared: { pos: 'Adjective', ja: '共通の、共有された', tag: '過去分詞→形容詞', grammar: 'a shared goal=共有された(=共通の)目標。share の過去分詞が形容詞化。' },
    goal: { pos: 'Noun', ja: '目標', tag: '冠詞 a', grammar: 'a shared goal=初出・不特定なので a。goal は可算。toward a goal=目標に向けて。' },
    conclusion: { pos: 'Noun', ja: '結論', grammar: 'In conclusion=結論を切り出す決まり文句(無冠詞)。draw a conclusion なら a 付き。' },
    financial: { pos: 'Adjective', ja: '財政的な、金銭的な' },
    burden: { pos: 'Noun', ja: '負担、重荷', tag: '冠詞 the', grammar: 'the financial burden of ...=of句で特定されるので the。a burden(一つの重荷)とも使う可算名詞。' },
    considerable: { pos: 'Adjective', ja: 'かなりの、相当な', grammar: 'large の格上げ。不可算名詞・程度を「相当な」と上品に盛る。considerable expense/expertise。' },
    drawbacks: { pos: 'Noun', ja: '欠点、不利な点', tag: '複数形', grammar: 'benefits と対で複数。benefits outweigh the drawbacks=利点が欠点を上回る、の結論の型。' },
    advances: { pos: 'Noun', ja: '進歩、前進', tag: '複数形', grammar: 'advance=進歩は複数 advances で「(複数分野の)進歩」。technological advances が定番。動詞 advance(前進する)と区別。' },
    prospects: { pos: 'Noun', ja: '見込み、展望', tag: '複数形', grammar: 'prospect=見込み。複数 prospects で「将来性・展望」。the prospects for(〜の見通し)。単数 a prospect は「見込み・候補者」。' },
    fostering: { pos: 'Noun', ja: '促進、育成', tag: 'the+動名詞+of', grammar: 'the fostering of global cooperation=「the+動名詞+of」で動詞を重厚な名詞句に。論述で「〜すること」を格調高く言う型。' },
    confirm: { pos: 'Verb', ja: '裏づける、確認する', tag: '主述の一致', grammar: '主語は3つの名詞句(advances, prospects, fostering)+all→複数扱いなので原形 confirm(三単現の -s なし)。' },
    investment: { pos: 'Noun', ja: '投資', tag: '不可算・this で特定', grammar: '行為としての investment は不可算。this investment=この投資(指示語で特定)。an investment なら個別の投資案件(可算)。' },
    thoroughly: { pos: 'Adverb', ja: '徹底的に、まったく', grammar: '形容詞 worthwhile を強める。thoroughly worthwhile=「まったくもって価値がある」と断定を強調。' },
    worthwhile: { pos: 'Adjective', ja: '価値のある、やりがいのある', grammar: 'worth + while(時間)が語源。be worthwhile=(時間・金・労力に)見合う。結論の締めで投資を肯定。' },
};

export interface VocabItem {
    word: string;
    pos: string;
    ipa: string;
    def: string;
    example: string;
}

export const DAY1_VOCAB: VocabItem[] = [
    { word: 'justify', pos: 'Verb', ipa: '/ˈdʒʌstɪfaɪ/', def: 'to show that something is reasonable or necessary, and therefore right', example: 'The enormous sums spent on space exploration can be justified.' },
    { word: 'undeniably', pos: 'Adverb', ipa: '/ˌʌndɪˈnaɪəbli/', def: 'in a way that is clearly true and cannot be doubted', example: 'While the expense is undeniably vast, the benefits are greater.' },
    { word: 'outweigh', pos: 'Verb', ipa: '/ˌaʊtˈweɪ/', def: 'to be greater or more important than something else', example: 'The long-term benefits far outweigh the costs.' },
    { word: 'crucial', pos: 'Adjective', ipa: '/ˈkruːʃəl/', def: 'extremely important because it affects the result of something', example: 'Space exploration plays a crucial role in driving innovation.' },
    { word: 'innovation', pos: 'Noun', ipa: '/ˌɪnəˈveɪʃ(ə)n/', def: 'a new idea, method, or invention', example: 'It plays a crucial role in driving technological innovation.' },
    { word: 'scarce', pos: 'Adjective', ipa: '/skeəs/', def: 'not easy to find or get; existing only in small amounts', example: 'Asteroid mining could supply minerals that are growing scarce.' },
    { word: 'expertise', pos: 'Noun', ipa: '/ˌekspɜːˈtiːz/', def: 'special skill or knowledge in a particular field', example: 'Massive projects require nations to pool their expertise.' },
    { word: 'worthwhile', pos: 'Adjective', ipa: '/ˌwɜːθˈwaɪl/', def: 'worth the time, money, or effort that you spend on it', example: 'This investment is thoroughly worthwhile.' },
];

export interface GrammarPoint {
    no: number;
    title: string;
    example: string;
    highlight: string;
    explain: string;
}

export const DAY1_GRAMMAR: GrammarPoint[] = [
    {
        no: 1,
        title: '譲歩の While 構文 — 反対を一度認めてから主張する',
        example: 'While the expense is undeniably vast, I firmly believe that the benefits far outweigh the costs.',
        highlight: 'While the expense is undeniably vast',
        explain: 'While + 譲歩 → 主節で自分の主張。反対意見を一度認めることで、視野の広さと説得力が出る。英検1級の序論で「両論併記(減点)」を避けつつ立場を強く打ち出す鉄板の型。Although でも代用可。',
    },
    {
        no: 2,
        title: 'far + 比較表現で主張を強調する',
        example: 'The long-term benefits far outweigh the costs.',
        highlight: 'far outweigh',
        explain: 'outweigh(上回る)を far で強める。比較級・比較動詞の前に far / much / significantly を置くと「はるかに」の強調になる。benefits/advantages far outweigh the costs/drawbacks は賛成側の結論で天秤を一気に傾ける決め表現。',
    },
    {
        no: 3,
        title: '可算・不可算と冠詞 — なぜ複数形・無冠詞なのか',
        example: 'space exploration ... drives innovation ... and the benefits far outweigh the costs.',
        highlight: 'innovation',
        explain: 'exploration / innovation / cooperation のような -tion 抽象名詞は不可算で無冠詞。一方 benefits / costs / reasons / drawbacks は「数えられる複数の項目」を列挙するので複数形。of句や関係詞で特定されると the(the survival of humanity, the navigation we rely on)。この可算/冠詞の判断は /english/articles と同じ原理。',
    },
];
