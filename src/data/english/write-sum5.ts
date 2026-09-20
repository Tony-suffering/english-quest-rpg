// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/data/english/write-sum5.ts
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
/**
 * SUM 5 -- 英検の英文要約を「本文の形」で5つに畳んだ型。
 *
 * 【考え方】
 * 要約は作文ではない。本文の3段落を、決まった数の文に潰す作業である。
 * 潰し方は本文の形で決まる。そして本文の形は5つしかない。
 *
 *   1 FOR / AGAINST   賛否    P2 賛成する人 / P3 反対する人
 *   2 GAIN / COST     損得    P2 何をもたらしたか / P3 同時に何を失うか(主張者が本文にいない)
 *   3 WHY / SO        因果    P2 なぜ起きたか / P3 何が起きたか
 *   4 PROBLEM / FIX   対策    P2 どれだけ深刻か / P3 打った手と、その限界
 *   5 THEY FOUND      研究    P2 調査が示したこと / P3 その読み方の留保
 *
 * 【級によって当たる型が違う。ここは実測で決めてある(EVIDENCE)】
 *   1級   公開回はすべて型4(現状 -> 深刻さ -> 対策と限界)。1級は型4から始める
 *   準1級  型1・型2が多数、型3・型4が残り
 *   2級    公開回はすべて型1・型2(導入 -> 利点 -> 欠点)
 * 型5は公開回では確認できていない。保険として持つ型で、優先度は最後。
 *
 * 【型が決まると、文頭5つが全部決まる】
 * 本番で自分の言葉にするのは各文の「主語 + 動詞」だけ。文頭は型が持っている。
 * どの型でも最後の文は Overall, で始まる。結びだけは5型共通で、1文字も動かさない。
 *
 * 【判定は3秒。第2段落の1文目しか見ない】
 * DECISION の5段を上から当てる。上で当たった時点で確定するので、迷いが発生しない。
 * 迷ったときだけ第3段落の1文目で裏を取る(CONFIRM_STEP)。
 *
 * 【級が変わっても型は変わらない。落とす文が決まっているだけ】
 *   1級   90-110語 = 5文 / 準1級 60-70語 = 4文 / 2級 45-55語 = 3文
 * 落とす順は型ごとに違う(dropOrder)。段落と文の対応が型で違うからである。
 * 型4は第3段落に対策と限界の2文が要るので、先に落ちるのは結びのほうになる。
 * 語数は 2025年度に「目安」から「指定」に変わっている。枠を外すと内容以前に落ちる。
 *
 * 【段落を均等に割らない】
 * 1級の公式解答例は 第1段落21語 / 第2段落24語 / 第3段落48語 の計93語(OFFICIAL_SPLIT)。
 * 第3段落が要約のほぼ半分を持っていく。均等に割る型は現物と合わない。
 *
 * 【本文の語を写さない】
 * 採点の語彙観点はここで決まる。模範要約は本文と連続5語が1か所も重ならない。
 * scripts/verify-write-sum5.cjs が15本すべてで機械検査する。写した瞬間に落ちる。
 *
 * 【著作権】本文・要約はすべてオリジナル。実際の検定試験の問題は転載していない。
 * EVIDENCE と SOURCES は出題の「形」を数えたものであって、問題文の複製ではない。
 */

export type SumPatternId = 'forAgainst' | 'gainCost' | 'whySo' | 'problemFix' | 'theyFound';
export type Grade = 'g1' | 'gp1' | 'g2';

export interface GradeSpec {
    id: Grade;
    label: string;        // 級の表示名
    words: [number, number];
    sentences: number;
    passage: string;      // 本文の量(実測)
    perSentence: string;  // 1文あたりの目安
    drop: string;         // 何を落とすか
    real: string;         // この級で実際に出ている形
}

/** 級の仕様。型は同じで、落とす文の数だけが違う */
export const GRADES: GradeSpec[] = [
    {
        id: 'g1', label: '1級', words: [90, 110], sentences: 5,
        passage: '約300語 / 3段落',
        perSentence: '1文 18-22語',
        drop: '全部使う。5文で90-110語に収まる。',
        real: '実際に出ているのは型4(現状→深刻さ→対策と限界)。公式サンプルの砂採掘から2025年度第3回の献血まで、公開されている回はすべてこの形。1級の勉強は型4から始める。',
    },
    {
        id: 'gp1', label: '準1級', words: [60, 70], sentences: 4,
        passage: '約200語 / 3段落',
        perSentence: '1文 15-18語',
        drop: '型ごとに決まった1文を落とす。捨てる判断を本番でしない。',
        real: '実際に出ているのは型1・型2(導入→賛成/利点→反対/欠点)が多数で、型3・型4(現象→原因→対策)が残り。バイオロガー、地域熱供給、太陽放射改変など科技・環境のお題に賛否を載せてくる。',
    },
    {
        id: 'g2', label: '2級', words: [45, 55], sentences: 3,
        passage: '約150語 / 3段落',
        perSentence: '1文 15-18語',
        drop: 'さらにもう1文落として3文にする。3段落が3文になる。',
        real: '実際に出ているのは型1・型2(導入→利点→欠点)だけ。公開されている回はすべてこの形なので、2級は型1と型2だけ入れて行っていい。',
    },
];

/**
 * 実測 -- 公開されている出題の形。
 * 一次情報(協会の公開問題)と、それを数えた指導側の分析による。
 * 数えたのは公開されている回だけなので、非公開回で別の形が出る可能性は残る。
 */
export interface Evidence { grade: string; rounds: string; shape: string; topics: string; }

export const EVIDENCE: Evidence[] = [
    {
        grade: '1級', rounds: '公式サンプル + 2024年度第1回〜2025年度第3回',
        shape: '現状 → 重要性・深刻化 → 対策と限界（型4）が公開回のすべて',
        topics: '砂の採掘 / 埋め立て / 違法な野生動物取引 / 献血',
    },
    {
        grade: '準1級', rounds: '2024年度第1回〜2025年度第3回',
        shape: '導入 → 賛成・利点 → 反対・欠点（型1/型2）が多数。現象 → 原因 → 結果・対策（型3/型4）が残り',
        topics: '博物館の無料入場 / 太陽放射改変 / 地域熱供給 / バイオロガー',
    },
    {
        grade: '2級', rounds: '2024年度第1回〜2025年度第3回',
        shape: '導入 → 利点 → 欠点（型1/型2）が公開回のすべて',
        topics: '生活・社会寄りの身近なお題',
    },
];

/**
 * 1級の公式解答例の語数配分。第3段落が要約のほぼ半分を持っていく。
 * 段落を均等に割らない -- 対策と限界の両方が第3段落に入っているからである。
 */
export const OFFICIAL_SPLIT = { p1: 21, p2: 24, p3: 48, total: 93 };

/**
 * 協会の公式解答例を機械で測った(2026-09-12)。1級は2025年度第2回・第3回・2026年度第1回、準1級は2025年度第3回。
 * 本文と解答例は協会の公開PDFから取り、語数・文数・語長・本文との重なりを数えた。問題文そのものは載せていない。
 *
 * 見えたこと:
 *   1. 公式解答例は 1級3本とも110語、準1級は70語。上限ぴったり。1語多ければ枠外になる縁に立っている
 *   2. 本文より解答例のほうが難しい。1級 2025-3 は本文の平均語長5.5字に対して解答例6.7字、9字以上の語が19%から29%に増える。
 *      2026-1 の解答例は9字以上が39%。易しく書かれた本文を、難しく書き直すのが模範になっている
 *   3. 4本とも The passage explains / According to the passage を使っていない。本文の主語から直接始める
 *   4. 本文からの写し: 1級で連続5語ゼロ、連続4語は2か所(blood and blood products / networks of volunteer donors)。
 *      専門用語の名詞句は写してよく、節は書き換える、という線引きが読み取れる
 *   5. 指示文は "summarize it in your own words as far as possible"。言い換えは採点基準ではなく指示文に書いてある
 *   6. 文数は1級4-6文(1文18-27語)、準1級4文(1文16-20語)
 */
export const OFFICIAL_STYLE = {
    wordsAtCeiling: '1級 110 / 110 / 110、準1級 70。全部が上限ぴったり',
    harderThanSource: '本文の平均語長 5.5字 → 解答例 6.7字(1級 2025-3)。9字以上の語 19% → 29%。2026-1 の解答例は 39%',
    noMetaFrame: 'The passage explains / According to the passage は4本とも不使用。本文の主語から始める',
    copying: '連続5語の写しゼロ。連続4語は専門名詞句だけ(blood and blood products など)',
    instruction: 'summarize it in your own words as far as possible',
    sentences: '1級 4-6文 / 準1級 4文',
    /** 上限に張り付いた模範を真似ると、数え間違い1語で枠外になる。狙う帯は上限から4-5語下 */
    safeZone: { g1: [96, 106] as [number, number], gp1: [62, 68] as [number, number], g2: [47, 53] as [number, number] },
    /** 何を持ち帰るか */
    takeaways: [
        '文1の The passage explains that は必須ではない。1級は本文の主語から入ってよく、4語が浮く',
        '語数は上限ではなく、上限の4-5語下を狙う。公式解答例の110語は真似しない',
        '専門用語の名詞句(3-4語)は写してよい。書き換えるのは節と動詞',
        '本文より一段難しい語で書く。本文が lack the funds なら insufficient funding。本文が not so fortunate なら shortage',
    ],
};

/** 出典。数字を疑ったらここを見る */
// ============================================================
// 点は文頭ではなく動詞に付く -- 関係動詞10本 + つなぎ5本
//
// 【なぜここが本体か】
// 採点は 内容 / 構成 / 語彙 / 文法 の4観点。The passage explains that の4語は、どの観点にも1点も入らない。
// 点が付くのは「本文の名詞Aと名詞Bがどういう関係か」を書けたかどうかで、関係を運ぶのは動詞と接続詞だけ。
// 名詞は本文から借りてよい(協会の解答例も blood and blood products をそのまま使う)。
// **自分の言葉にするのは動詞と接続詞。in your own words はそこの話。**
//
// 【協会の解答例を数えた(2026-09-13)】
//   1級 2025-3  110語  接続詞4  関係動詞 9
//   1級 2025-2  110語  接続詞5  関係動詞11
//   1級 2026-1  110語  接続詞4  関係動詞15   ← As a result がゼロ。因果を全部 -ing の動詞で運ぶ
//   準1 2025-3   70語  接続詞2  関係動詞 7
//   7語に1つが関係動詞。接続詞はすべて1語(However / Consequently / Moreover / yet / therefore / thereby / while / despite)。
//   On the other hand / At the same time / As a result のような多語の接続詞は4本に1つも無い。
//
// 【動詞が接続詞を食う】
//   X happens. As a result, Y happens.   -> 2文、接続詞3語
//   X triggers Y.                        -> 1文、接続詞0語
//   X reduces income, thereby intensifying pressure.  -> 1文に関係が2つ
// 300語を110語に入れるからくりはこれ。段落を「文」にするのではなく「動詞」にする。
//
// 【型が決まると動詞の極性が決まる】
//   型1/型2  第2段落 +  第3段落 -        -> 対で持つ(enables/undermines, expands/limits)
//   型4      第2段落 -(悪化)  第3段落 要る/届かない  -> intensifies, calls for, falls short
//   型3      原因 -> 結果                  -> leads to / results in を軸に -ing でつなぐ
// だから動詞は話題で選ばない。関係の種類で選ぶ。5対で公式4本の動詞が全部落ちることを verify が確かめる。
// ============================================================

export interface RelationVerb {
    /** 関係の名前。動詞を「話題」ではなく「関係」で引くための見出し */
    relation: string;
    relationJa: string;
    /** + 側(支える・生む・広げる) */
    plus: { en: string; chain: string; ja: string };
    /** - 側(壊す・止める・狭める) */
    minus: { en: string; chain: string; ja: string };
    /** 公式解答例でこの対に落ちた動詞。verify が照合する */
    seen: string[];
    note: string;
}

/** 関係動詞 5対 = 10本。chain は接続詞を食う形(-ing で前の節にぶら下げる) */
export const RELATION_VERBS: RelationVerb[] = [
    {
        relation: 'CAUSE', relationJa: '生む / 止める',
        plus: { en: 'leads to', chain: 'leading to', ja: '〜を生む' },
        minus: { en: 'prevents X from -ing', chain: 'preventing X from -ing', ja: '〜が…するのを止める' },
        seen: ['results in', 'triggering', 'leading to', 'contributes to', 'prevents', 'prevent'],
        note: '型3の背骨。As a result を書く代わりに leading to で前の文にぶら下げると2語浮く。',
    },
    {
        relation: 'SUPPORT', relationJa: '支える / 壊す',
        plus: { en: 'enables', chain: 'enabling', ja: '〜を可能にする' },
        minus: { en: 'undermines', chain: 'undermining', ja: '〜を掘り崩す' },
        seen: ['allow', 'allows', 'allowing', 'helps', 'undermines', 'erodes', 'interfere with'],
        note: '型1/型2の第2段落と第3段落が、この対の + と - で書ける。damage より undermines のほうが「じわじわ」が出る。',
    },
    {
        relation: 'RANGE', relationJa: '広げる / 狭める',
        plus: { en: 'expands', chain: 'expanding', ja: '〜を広げる' },
        minus: { en: 'limits', chain: 'limiting', ja: '〜を狭める' },
        seen: ['limit', 'promote', 'investigate'],
        note: '本文の「より多くの人が」「より広い範囲で」は全部 expands。「〜にしか届かない」は limits。',
    },
    {
        relation: 'DEGREE', relationJa: '強める / 弱める',
        plus: { en: 'intensifies', chain: 'intensifying', ja: '〜を強める' },
        minus: { en: 'reduces', chain: 'reducing', ja: '〜を減らす' },
        seen: ['intensifying', 'reduce', 'alter', 'reshape'],
        note: '型4の第2段落(悪化)は intensifies 一語で書ける。thereby intensifying が公式の形。',
    },
    {
        relation: 'NEED', relationJa: '求める / 届かない',
        plus: { en: 'calls for', chain: 'calling for', ja: '〜を必要とする' },
        minus: { en: 'falls short of', chain: 'falling short of', ja: '〜に届かない' },
        seen: ['identify', 'remain', 'recommend', 'endure', 'making headway'],
        note: '型4の第3段落の入口と出口。there is an urgent need to は5語、calls for は2語。remain challenging は falls short の公式版。',
    },
];

/** 第3段落の入口に1本だけ要る「懸念」の動詞。対にならないので別枠 */
export const CONCERN_VERB = { en: 'raises concerns about', chain: 'raising concerns about', ja: '〜への懸念を生む', seen: ['raises concerns'] };

export interface Turn {
    en: string;
    role: string;
    roleJa: string;
    /** 同じ意味の多語版。書くとその分だけ語数が消える */
    longForm: string;
    saves: number;
}

/** つなぎ5本。全部1語。多語版は書かない */
export const TURNS: Turn[] = [
    { en: 'However,', role: 'turn', roleJa: '逆へ', longForm: 'On the other hand,', saves: 3 },
    { en: 'Consequently,', role: 'result', roleJa: '結果へ', longForm: 'As a result of this,', saves: 4 },
    { en: 'Moreover,', role: 'add', roleJa: '同じ側をもう1つ', longForm: 'In addition to this,', saves: 3 },
    { en: 'yet', role: 'concede', roleJa: '同じ文の中で逆へ', longForm: 'but at the same time', saves: 3 },
    { en: 'while', role: 'contrast', roleJa: '2つを1文に', longForm: 'On the one hand ... on the other', saves: 6 },
];

/** 接続詞を動詞に吸収する形。文を増やさずに関係を1つ足す */
export const CHAIN_MOVES: { before: string; after: string; saved: number; note: string }[] = [
    {
        before: 'Fares fall. As a result, pressure on the budget grows.',
        after: 'Falling fares intensify pressure on the budget.',
        saved: 3,
        note: '2文を1文に。As a result が消え、intensify が因果を運ぶ。',
    },
    {
        before: 'Services are cut. This changes how commuters behave.',
        after: 'Service cuts reshape commuter behaviour.',
        saved: 3,
        note: '主語を名詞化して、動詞1本で関係を言う。',
    },
    {
        before: 'Income drops, and therefore the pressure increases, and so cuts seem inevitable.',
        after: 'Income drops, thereby intensifying pressure and rendering cuts inevitable.',
        saved: 3,
        note: '関係を3つ、動詞3本、接続詞は thereby の1語。公式 2026-1 の形。',
    },
];

/** 公式解答例4本の実測。数字を疑ったら verify を回す */
export const VERB_DENSITY = [
    { round: '1級 2025-3', words: 110, turns: 4, verbs: 9 },
    { round: '1級 2025-2', words: 110, turns: 5, verbs: 11 },
    { round: '1級 2026-1', words: 110, turns: 4, verbs: 15 },
    { round: '準1級 2025-3', words: 70, turns: 2, verbs: 7 },
];

// ============================================================
// 名詞が一番大事。だがパターン化できるのは「どの名詞か」ではなく「どう包むか」
//
// 内容点は名詞で決まる。3段落のどれかの名詞を落とせば、その段落の内容点が消える。
// だから名詞は本文から借りる。頭の名詞(infrastructure / blood / testing / donors)は動かさない。
// 動かすのは包み方で、それは3手しかない。
//
// 【公式解答例で数えた(2026-09-13)】
//   of の出現率は本文2-3%、解答例も2-3%、準1級の解答例はゼロ。**of は手ではなく結果。**
//   名詞化語(-tion/-ment/-ance/-ity)は 25-3 が 8%、26-1 が 17%、25-2 は 2%。書き手の癖で、必須ではない。
//   必須なのは、節を名詞にすることで、関係動詞の主語と目的語が作れること。**動詞の層の前提がここ。**
//
//   本文13語 -> 解答6語  these countries lack the funds required to build and maintain the necessary infrastructure
//                       -> insufficient funding for essential medical infrastructure
//   本文 7語 -> 解答2語  They have a shortage of donated blood -> This shortage
//   本文 9語 -> 解答7語  One approach is to create networks of volunteer donors -> the establishment of networks of volunteer donors
// ============================================================

export interface NounMove { no: number; en: string; ja: string; shape: string; before: string; after: string; saved: number; note: string; }

export const NOUN_MOVES: NounMove[] = [
    {
        no: 1, en: 'PACK THE CLAUSE', ja: '節を名詞にする',
        shape: '[形容詞] + [動詞の名詞形] + of / for + [本文の名詞]',
        before: 'these countries lack the funds required to build the necessary infrastructure',
        after: 'insufficient funding for essential infrastructure',
        saved: 6,
        note: '本文の動詞(lack / build)が消え、名詞(funding / infrastructure)と形容詞(insufficient / essential)だけが残る。節が名詞になると、関係動詞の主語に置ける。動詞が接続詞を食うのは、この手のあと。',
    },
    {
        no: 2, en: 'POINT BACK', ja: '前の文を1語で受ける',
        shape: 'This / These / Such + [直前の内容を言う名詞1語]',
        before: 'They have a shortage of donated blood, and that shortage',
        after: 'This shortage',
        saved: 8,
        note: '前の文に書いたことを、次の文の主語として2語で受ける。公式は This shortage / this strategy / such practices を使う。一番安く語数が浮き、しかも構成点(文がつながっている)が付く。',
    },
    {
        no: 3, en: 'FOLD INTO THE ADJECTIVE', ja: '説明を形容詞に畳む',
        shape: '[本文の関係節・副詞] -> [形容詞1語] + 名詞',
        before: 'testing that is done carefully is essential',
        after: 'rigorous testing is indispensable',
        saved: 3,
        note: 'careful は rigorous、necessary は essential、required は insufficient の裏側に畳む。本文の関係節(that is ...)は全部この手で1語になる。語彙点はここで一段上がる。',
    },
];

/** 名詞化の実測。of は手ではなく結果、という証拠 */
export const NOUN_EVIDENCE = [
    { round: '1級 2025-3 本文', words: 310, of: 6, nominal: 19 },
    { round: '1級 2025-3 解答例', words: 110, of: 3, nominal: 9 },
    { round: '1級 2025-2 解答例', words: 110, of: 3, nominal: 2 },
    { round: '1級 2026-1 解答例', words: 110, of: 2, nominal: 19 },
    { round: '準1級 2025-3 解答例', words: 70, of: 0, nominal: 4 },
];

export const SOURCES: { label: string; url: string }[] = [
    { label: '日本英語検定協会 2024年度リニューアル', url: 'https://www.eiken.or.jp/eiken/2024renewal/' },
    { label: '日本英語検定協会 2025年4月15日 出題形式変更の告知', url: 'https://www.eiken.or.jp/eiken/info/2025/pdf/20250415_info_eiken.pdf' },
    { label: '1級 公式サンプル(砂の採掘)の段落分析', url: 'https://uribou-eigo.com/eiken-renewal-sample-1st/' },
    { label: '1級 要約の出題分析と語数配分', url: 'https://eigoful.com/eiken1-summary/' },
    { label: '1級 要約 出題回ごとの構造分析', url: 'https://www.haradaeigo.com/eiken1kyu-summary-perfect-guide-2026/' },
    { label: '準1級 要約 出題回ごとの構造分析', url: 'https://www.haradaeigo.com/eikenjun1-summary-technique/' },
    { label: '2級 要約 出題回ごとの構造分析', url: 'https://www.haradaeigo.com/eiken2kyu-summary-perfect-guide-2026/' },
    { label: '協会 1級 2025年度第3回 問題冊子(要約の本文)', url: 'https://www.eiken.or.jp/eiken/exam/kakomon/2025-3-1ji-1kyu.pdf' },
    { label: '協会 1級 2025年度第3回 解答(要約の解答例)', url: 'https://www.eiken.or.jp/eiken/result/pdf/202503F1kyu.pdf' },
    { label: '協会 1級 2025年度第2回 解答', url: 'https://www.eiken.or.jp/eiken/result/pdf/202502F1kyu.pdf' },
    { label: '協会 1級 2026年度第1回 解答', url: 'https://www.eiken.or.jp/eiken/result/pdf/202601F1kyu.pdf' },
    { label: '協会 準1級 2025年度第3回 問題冊子・解答', url: 'https://www.eiken.or.jp/eiken/exam/grade_p1/' },
];

/**
 * 文の5つの席。どの段落から取るかは型によって違う（opener の para が持つ）。
 * 1級の公式解答例が第3段落に48語を割いているのは、対策と限界の両方がそこに入っているからで、
 * 段落を均等に割る型は現物と合わない。
 */
export interface SentenceRole { n: number; en: string; ja: string; note: string; }

export const SENTENCE_ROLES: SentenceRole[] = [
    { n: 1, en: 'THE SUBJECT', ja: '何の話か', note: '本文が何を取り上げているかだけを言う。良し悪しはまだ言わない。' },
    { n: 2, en: 'THE FIRST MOVE', ja: '一つ目の動き', note: '第2段落が持ち出したものを丸ごと1文にする。例と数字は捨てる。' },
    { n: 3, en: 'THE SECOND MOVE', ja: '二つ目の動き', note: '型によって、第2段落の続きか、第3段落の前半。落とす順の中では先に消える席。' },
    { n: 4, en: 'THE TURN', ja: '向きが変わる', note: '逆側、あるいは対策の限界。ここが一番長くなる。並列は and で数珠つなぎにしてよい。' },
    { n: 5, en: 'THE SHAPE', ja: '形', note: '本文が結局どういう話だったかを1文で言う。新しい情報は入れない。Overall, で始める。' },
];

/** 判定。上から当てて、当たった時点で確定 */
export interface DecisionStep {
    step: number;
    look: string;
    lookJa: string;
    signals: string[];
    then: SumPatternId;
}

export const DECISION: DecisionStep[] = [
    {
        step: 1, look: 'Does paragraph 2 bring in a study, a survey or researchers?',
        lookJa: '第2段落が調査・研究を持ち出しているか',
        signals: ['researchers', 'a study', 'a survey', 'evidence shows', 'work on ~ has'],
        then: 'theyFound',
    },
    {
        step: 2, look: 'Is the subject of paragraph 2 a group of people who take a side?',
        lookJa: '第2段落の主語が「側に立つ人」か',
        signals: ['supporters', 'those in favour', 'advocates', 'proponents', 'many welcome'],
        then: 'forAgainst',
    },
    {
        step: 3, look: 'Does paragraph 2 give reasons for what paragraph 1 described?',
        lookJa: '第2段落が第1段落の原因を述べているか',
        signals: ['the reasons', 'because', 'due to', 'stems from', 'is driven by', 'lies in'],
        then: 'whySo',
    },
    {
        step: 4, look: 'Does paragraph 2 say how much harm is being done, or what is at stake?',
        lookJa: '第2段落が「どれだけ深刻か・何が失われるか」を述べているか',
        signals: ['the damage', 'the harm', 'is not only', 'at stake', 'threatens', 'depends on'],
        then: 'problemFix',
    },
    {
        step: 5, look: 'None of the above: paragraph 2 says what the thing has brought.',
        lookJa: 'どれでもない。第2段落は「もたらした良いもの」を述べている',
        signals: ['the technology has', 'it has brought', 'the system allows'],
        then: 'gainCost',
    },
];

/** 型4かどうかは第3段落の1文目で裏が取れる。対策が来ていれば型4で確定 */
export const CONFIRM_STEP = {
    lookJa: '迷ったら第3段落の1文目も見る。そこに「打った手」が来ていれば型4で確定する。',
    look: 'If paragraph 3 opens with a measure that has been introduced, it is PROBLEM / FIX.',
    signals: ['measures have been introduced', 'in response', 'has banned', 'governments have'],
};

export interface SumOpener {
    n: number;
    en: string;     // 固定の文頭。丸暗記する対象
    ja: string;
    para: 1 | 2 | 3 | 0;  // 本文のどの段落から取るか(0 = 全体)
    slotJa: string;       // その席に何を入れるか
}

export interface SumModel {
    grade: Grade;
    text: string;
    textJa: string;
    words: number;      // 実測語数。verify が数え直す
}

export interface SumPattern {
    id: SumPatternId;
    no: number;
    en: string;
    short: string;
    ja: string;
    shape: string;      // P1 / P2 / P3 の中身
    shapeJa: string;
    why: string;        // なぜこの型を独立させるのか
    wrongIf: string;    // 賛否型で書くと何点落ちるか
    seen: string;       // 実際の出題で見えているか
    seenGrades: Grade[];// 公開回でこの形が出ている級
    dropOrder: number[];// 語数を落とすとき、どの文から消すか(準1級で1本目、2級で2本目まで)
    topic: string;
    topicJa: string;
    tell: string;       // 判定の合図(第2段落1文目)
    passage: string;
    passageJa: string;
    openers: SumOpener[];
    models: SumModel[];
}

// ============================================================
// 型1 FOR / AGAINST -- 賛否
// ============================================================

const P1_FOR_AGAINST: SumPattern = {
    id: 'forAgainst', no: 1, en: 'FOR / AGAINST', short: 'FOR', ja: '賛否',
    shape: 'P1 the issue -> P2 those in favour -> P3 those against',
    shapeJa: '第1段落 論点 / 第2段落 賛成する人 / 第3段落 反対する人',
    why: '本文に「側に立つ人」が出てくる型。人が言っていることなので、要約でも人を主語にする。人を消して「〜は良い」と書くと、本文が主張していない断定を足したことになる。',
    wrongIf: '損得型(型2)で書くと、本文が「賛成派の主張」として書いたものを事実として断定することになり、内容の観点が落ちる。',
    seen: '2級と準1級の主力。公開回の2級はすべてこの形か型2で、準1級も多数がここ。1級では見えていない。',
    seenGrades: ['gp1', 'g2'],
    dropOrder: [3, 5],
    topic: 'Free university tuition', topicJa: '大学の学費無償化',
    tell: 'Those in favour present the policy as a matter of basic fairness.',
    passage: "In recent years the question of who should pay for higher education has moved to the centre of political debate in many wealthy nations. Several European countries already charge students little or nothing to attend public universities, while elsewhere fees have climbed steadily and graduates leave with substantial debt. Campaigners in a growing number of countries now insist that tuition ought to be covered entirely by the state, and the proposal has become a fixture of election campaigns.\n\nThose in favour present the policy as a matter of basic fairness. They contend that talented young people from low-income households are currently discouraged from applying by the prospect of years of repayment, and that removing fees would widen the pool of students who reach their potential. Those in favour also invoke the wider economy: a workforce with more advanced qualifications, they say, is more productive and adapts more readily to technological change. Graduates released from debt, moreover, are able to start businesses, buy homes and raise families earlier than they otherwise would.\n\nOpponents question both the fairness and the affordability of the plan. They observe that university graduates tend to earn far more over a lifetime than those who never attend, so funding their education from general taxation obliges lower-paid workers to subsidise the future rich. There is also concern that institutions starved of fee income would be forced to enlarge class sizes and abandon less popular subjects, lowering the quality of what students receive. Finally, opponents maintain that the sums involved might do more good if they were directed at early schooling, where the gap between rich and poor children first opens.",
    passageJa: "近年、高等教育の費用を誰が負担すべきかという問いが、多くの富裕国で政治論争の中心に移ってきた。いくつかのヨーロッパ諸国ではすでに公立大学の学費はほとんど無料である一方、他の国では学費が着実に上がり、卒業生は多額の負債を抱えて社会に出る。学費を全額国が負担すべきだと主張する運動が各国で広がり、この提案は選挙の定番になっている。\n\n賛成する側は、この政策を基本的な公平さの問題として示す。低所得世帯の優秀な若者が、何年もの返済を思って進学をあきらめている現状があり、学費をなくせば能力を発揮できる学生の層が広がる、と論じる。賛成する側はより広い経済も持ち出す。高度な資格を持つ労働力のほうが生産的で、技術変化にも適応しやすいという。さらに、負債から解放された卒業生は、そうでない場合より早く起業し、家を買い、家庭を持てるとする。\n\n反対する側は、この計画の公平さと財政的な実現可能性の両方を疑う。大学卒業生は生涯で進学しなかった人よりはるかに多く稼ぐ傾向があるため、その教育費を一般税でまかなうことは、低賃金の労働者に将来の富裕層を支援させることになる、と指摘する。また、学費収入を断たれた大学が、クラスの規模を拡大し、人気のない科目を廃止せざるを得なくなり、学生が受け取る教育の質が下がるという懸念もある。最後に反対派は、その資金は、貧富の差が最初に開く初等教育に向けたほうが役に立つかもしれないと主張する。",
    openers: [
        { n: 1, en: 'The passage explains that', ja: '本文は〜と説明している', para: 1, slotJa: '何が論点になっているか' },
        { n: 2, en: 'Supporters argue that', ja: '賛成派は〜と主張する', para: 2, slotJa: '賛成側の一番大きい主張' },
        { n: 3, en: 'They also point out that', ja: '賛成派はまた〜とも指摘する', para: 2, slotJa: '賛成側の2つ目の主張' },
        { n: 4, en: 'Critics, however, warn that', ja: 'しかし反対派は〜と警告する', para: 3, slotJa: '反対側を全部まとめて' },
        { n: 5, en: 'Overall, the passage presents', ja: '全体として本文は〜として示している', para: 0, slotJa: '本文が結局どういう話だったか' },
    ],
    models: [
        {
            grade: 'g1', words: 101,
            text: "The passage explains that many governments are debating whether the state should cover university fees entirely. Supporters argue that removing fees would stop able students from poorer homes being deterred by years of repayment. They also point out that a better-qualified workforce lifts the economy and that graduates without debt settle into adult life sooner. Critics, however, warn that taxing everyone to educate future high earners is unjust, that universities would lose income and cut subjects, and that the money would achieve more in primary schools. Overall, the passage presents the policy as one whose fairness turns on who finally pays.",
            textJa: "本文は、大学の学費を国が全額負担すべきかどうかを多くの政府が議論していると説明している。賛成派は、学費をなくせば、貧しい家庭の有能な学生が何年もの返済を恐れて進学をあきらめずに済むと主張する。賛成派はまた、より高い資格を持つ労働力が経済を押し上げ、負債のない卒業生は早く自立すると指摘する。しかし反対派は、将来の高所得者の教育費を全員の税で払うのは不公平であり、大学は収入を失って科目を削ることになり、その資金は初等教育に使ったほうが役立つと警告する。全体として本文は、この政策を、公平さが最終的な負担者次第で決まるものとして示している。",
        },
        {
            grade: 'gp1', words: 65,
            text: "The passage explains that governments are debating whether the state should cover all university fees. Supporters argue that free places would encourage able students from poor families and raise national skill levels. Critics, however, warn that ordinary taxpayers would fund future high earners while universities lose income and cut subjects. Overall, the passage presents the policy as one whose fairness turns on who finally pays.",
            textJa: "本文は、大学の学費をすべて国が負担すべきかどうかを各国政府が議論していると説明している。賛成派は、無償の枠があれば貧しい家庭の有能な学生を後押しし、国全体の技能水準も上がると主張する。しかし反対派は、普通の納税者が将来の高所得者を支える一方で、大学は収入を失い科目を削ることになると警告する。全体として本文は、この政策を、公平さが最終的な負担者次第で決まるものとして示している。",
        },
        {
            grade: 'g2', words: 47,
            text: "The passage explains that some governments want the state to cover all university fees. Supporters argue that free places would help poorer students apply and raise national skill levels. Critics, however, warn that ordinary taxpayers would fund future high earners while universities lose income and cut subjects.",
            textJa: "本文は、大学の学費をすべて国が負担することを一部の政府が望んでいると説明している。賛成派は、無償の枠があれば貧しい家庭の学生が出願しやすくなり、国全体の技能水準も上がると主張する。しかし反対派は、普通の納税者が将来の高所得者を支える一方で、大学は収入を失い科目を削ることになると警告する。",
        },
    ],
};

// ============================================================
// 型2 GAIN / COST -- 損得
// ============================================================

const P2_GAIN_COST: SumPattern = {
    id: 'gainCost', no: 2, en: 'GAIN / COST', short: 'GAIN', ja: '損得',
    shape: 'P1 the thing -> P2 what it brought -> P3 what it costs',
    shapeJa: '第1段落 対象 / 第2段落 それが何をもたらしたか / 第3段落 同時に何を失うか',
    why: '本文に主張者が一人も出てこない型。良い面も悪い面も、モノそのものの働きとして書かれている。だから要約でも主語はモノで、It has 〜 が2回続く。',
    wrongIf: '賛否型(型1)で書くと、本文のどこにもいない Supporters と Critics を作り出すことになる。本文にない情報を足したと見なされ、内容の観点が落ちる。',
    seen: '2級と準1級の主力。出題の見出しでは型1と一緒に「導入→利点→欠点」と数えられているが、本文に主張者がいるかどうかで書き方が変わるので分けてある。',
    seenGrades: ['gp1', 'g2'],
    dropOrder: [3, 5],
    topic: 'Machine translation', topicJa: '機械翻訳',
    tell: 'The technology has removed obstacles that stood for centuries.',
    passage: "Machine translation has improved more in the past decade than in the fifty years before it. Programs that once produced sentences no native speaker would accept can now handle ordinary conversation, printed signs and business correspondence with reasonable accuracy, and they run on an ordinary phone. Travellers point a camera at a menu and read it in their own language; hospitals, courts and classrooms increasingly reach for the same software when no interpreter is available.\n\nThe technology has removed obstacles that stood for centuries. Small firms that could never have afforded a translator now correspond with customers on the other side of the world. Doctors can take a basic history from a patient who speaks no local language, and newly arrived families can complete official forms without waiting days for help. Written material once locked inside a single language -- safety instructions, weather warnings, scientific findings -- reaches a far wider readership within minutes and at almost no cost.\n\nThe same tools carry losses that are easy to overlook. Fluency on the screen conceals errors of nuance, and a mistranslated dose or legal term can do serious harm precisely because the output reads so smoothly. Languages with few speakers are thinly represented in the material these systems learn from, so the communities that would gain most are served worst. Teachers report that pupils see less reason to master a foreign language when a phone will do the work, and the institutions of the world now lean on software owned by a handful of companies.",
    passageJa: "機械翻訳は、この十年で、その前の五十年より大きく進歩した。かつては母語話者が受け入れられない文しか作れなかったプログラムが、いまでは日常会話、印刷された標識、商用の文書をそれなりの精度で処理し、しかも普通の携帯電話で動く。旅行者はメニューにカメラを向けて自分の言語で読み、病院、法廷、教室でも、通訳がいないときには同じソフトが使われることが増えている。\n\nこの技術は、何世紀も立ちはだかっていた障害を取り除いた。翻訳者を雇う余裕のなかった小企業が、地球の裏側の顧客とやり取りする。医師は現地の言語を話さない患者から基本的な問診を取れるし、来たばかりの家族は何日も助けを待たずに公的書類を記入できる。安全上の指示、気象警報、科学的知見といった、かつて一つの言語の中に閉じ込められていた文書が、数分のうちに、ほとんど費用をかけずにはるかに広い読者に届く。\n\n同じ道具は、見落としやすい損失も伴う。画面上の流暢さがニュアンスの誤りを覆い隠し、薬の用量や法律用語の誤訳は、出力がなめらかに読めるからこそ重大な害を生みうる。話者の少ない言語は、これらのシステムが学習する資料の中で扱いが薄く、最も恩恵を受けるはずの共同体が最も粗末に扱われる。教師は、携帯が仕事をしてくれるなら外国語を習得する理由を生徒が感じなくなると報告しており、世界の諸機関はいまや、ひと握りの企業が所有するソフトに寄りかかっている。",
    openers: [
        { n: 1, en: 'The passage describes', ja: '本文は〜を述べている', para: 1, slotJa: '何がどこまで広がったか' },
        { n: 2, en: 'It has made it possible for', ja: 'それによって〜ができるようになった', para: 2, slotJa: 'できるようになったことを3つまで' },
        { n: 3, en: 'It has also', ja: 'それはまた〜もした', para: 2, slotJa: '2つ目の利点' },
        { n: 4, en: 'At the same time, it', ja: '同時にそれは〜', para: 3, slotJa: '失うものを全部まとめて' },
        { n: 5, en: 'Overall, the passage presents', ja: '全体として本文は〜として示している', para: 0, slotJa: '本文が結局どういう話だったか' },
    ],
    models: [
        {
            grade: 'g1', words: 100,
            text: "The passage describes how quickly automatic translation has advanced and how widely phones now carry it. It has made it possible for tiny firms to trade abroad, for doctors to question patients who share no language, and for urgent writing to reach readers cheaply. It has also let newcomers handle official paperwork without waiting for help. At the same time, it buries errors of nuance under smooth wording, serves small languages worst, weakens the reason to study one, and leaves public bodies dependent on a few firms. Overall, the passage presents the tool as widening access while creating fresh dependence.",
            textJa: "本文は、自動翻訳がどれほど速く進歩し、携帯がそれをどれほど広く運ぶようになったかを述べている。それによって、ごく小さな企業が海外と取引し、医師が言語を共有しない患者に問診し、急ぎの文書が安く読者に届くようになった。それはまた、新しく来た人が助けを待たずに公的書類を処理できるようにもした。同時にそれは、ニュアンスの誤りをなめらかな言い回しの下に埋め、話者の少ない言語を最も粗末に扱い、言語を学ぶ理由を弱め、公的機関をわずかな企業に依存させる。全体として本文は、この道具を、入り口を広げながら新たな依存を生むものとして示している。",
        },
        {
            grade: 'gp1', words: 66,
            text: "The passage describes how far automatic translation has advanced and how widely phones carry it. It has made it possible for firms to trade abroad and for doctors to question foreign patients. At the same time, it hides errors of nuance behind fluent wording and leaves public bodies dependent on a few firms. Overall, the passage presents the tool as widening access while creating fresh dependence.",
            textJa: "本文は、自動翻訳がどこまで進歩し、携帯がそれをどれほど広く運ぶようになったかを述べている。それによって、企業が海外と取引し、医師が外国語話者の患者に問診できるようになった。同時にそれは、ニュアンスの誤りを流暢な言い回しの陰に隠し、公的機関をわずかな企業に依存させる。全体として本文は、この道具を、入り口を広げながら新たな依存を生むものとして示している。",
        },
        {
            grade: 'g2', words: 51,
            text: "The passage describes how far automatic translation has advanced and how widely phones carry it. It has made it possible for small firms to trade abroad and for doctors to question foreign patients. At the same time, it hides errors of nuance and leaves public bodies dependent on a few firms.",
            textJa: "本文は、自動翻訳がどこまで進歩し、携帯がそれをどれほど広く運ぶようになったかを述べている。それによって、小さな企業が海外と取引し、医師が外国語話者の患者に問診できるようになった。同時にそれは、ニュアンスの誤りを隠し、公的機関をわずかな企業に依存させる。",
        },
    ],
};

// ============================================================
// 型3 WHY / SO -- 因果
// ============================================================

const P3_WHY_SO: SumPattern = {
    id: 'whySo', no: 3, en: 'WHY / SO', short: 'WHY', ja: '因果',
    shape: 'P1 what changed -> P2 why it changed -> P3 what it caused',
    shapeJa: '第1段落 何が変わったか / 第2段落 なぜ変わったか / 第3段落 それが何を引き起こすか',
    why: '賛否も損得も無く、時間の向きだけがある型。第2段落は過去を向き、第3段落は未来を向く。要約でもその向きを落とさない。',
    wrongIf: '賛否型(型1)で書くと、原因を「賛成派の主張」、結果を「反対派の懸念」に読み替えることになる。本文には賛成も反対もないので、構成の観点が落ちる。',
    seen: '準1級で出ている。現象→原因→結果・対策の形で、環境・資源のお題に乗ってくることが多い。',
    seenGrades: ['gp1'],
    dropOrder: [3, 5],
    topic: 'Falling birth rates', topicJa: '出生率の低下',
    tell: 'The reasons lie mainly in the cost and the timing of adult life.',
    passage: "The number of children born to the average woman has fallen below the level needed to keep a population stable in a large and growing list of countries. The decline is no longer confined to the wealthiest nations: it is now recorded across much of Asia, Latin America and southern Europe, and in several places the figure has halved within a single generation. Statisticians who once expected the world's population to rise indefinitely now describe a peak followed by a long contraction.\n\nThe reasons lie mainly in the cost and the timing of adult life. Housing in the cities where jobs are concentrated has grown expensive enough to delay the move to a home large enough for children. Working hours remain long, childcare is scarce or costly, and in most households both partners must earn. Women now stay in education longer and enter careers they are reluctant to interrupt, so first births occur later, and a later start leaves less room for a second or third child.\n\nThe consequences reach far beyond the family. As smaller generations follow larger ones, the number of workers supporting each pensioner falls, placing strain on pension schemes and health services that were designed on the assumption of continuous growth. Rural schools close, and the villages around them empty as the young move away. Some governments respond with payments to parents or with immigration, but cash incentives have produced modest results at best, and immigration is politically contested in many of the countries that would benefit most.",
    passageJa: "女性一人あたりの出生数が、人口を維持するのに必要な水準を下回った国が、多く、そして増え続けている。この低下はもはや最富裕国に限られない。アジア、ラテンアメリカ、南欧の多くで記録されており、一世代のうちに数値が半減した地域もある。かつて世界人口は無限に増えると考えていた統計学者たちが、いまはピークとその後の長い縮小を語る。\n\n理由は主に、大人としての生活の費用とその時期にある。仕事が集中する都市の住居は、子どもを育てられる広さの家に移るのを遅らせるほど高くなった。労働時間は依然として長く、保育は足りないか高く、たいていの世帯では夫婦の両方が稼がなければならない。女性は以前より長く教育を受け、中断したくない職業に就くため、第一子の出産は遅くなり、遅い出発は第二子・第三子の余地を狭める。\n\n結果は家族の範囲をはるかに超える。小さい世代が大きい世代の後に続くにつれ、年金受給者一人を支える労働者の数が減り、継続的な成長を前提に設計された年金制度や医療サービスに負荷がかかる。地方の学校は閉鎖され、若者が去ってその周囲の村は空になる。政府の中には親への給付や移民で応じるところもあるが、現金の誘因はせいぜい小さな成果しか出しておらず、移民は、最も恩恵を受けるはずの多くの国で政治的な争点になっている。",
    openers: [
        { n: 1, en: 'The passage reports that', ja: '本文は〜と報じている', para: 1, slotJa: '何がどう変わったか' },
        { n: 2, en: 'This shift stems largely from', ja: 'この変化は主に〜から生じている', para: 2, slotJa: '一番大きい原因' },
        { n: 3, en: 'Another factor is that', ja: 'もう一つの要因は〜ということである', para: 2, slotJa: '2つ目の原因' },
        { n: 4, en: 'As a result,', ja: 'その結果〜', para: 3, slotJa: '起きた結果を全部まとめて' },
        { n: 5, en: 'Overall, the passage presents', ja: '全体として本文は〜として示している', para: 0, slotJa: '本文が結局どういう話だったか' },
    ],
    models: [
        {
            grade: 'g1', words: 105,
            text: "The passage reports that births have fallen beneath the rate required to hold populations steady in many countries, so demographers now expect a long decline. This shift stems largely from what adult life now costs and when it begins: homes near work are dear, hours are long, and childcare is scarce. Another factor is that women study and work longer, which pushes a first child later and narrows the room for more. As a result, fewer workers support each pensioner, straining pensions and hospitals, while country schools shut and villages empty. Overall, the passage presents the trend as economic in origin and hard to reverse.",
            textJa: "本文は、人口を一定に保つのに必要な水準を下回る出生が多くの国で起きており、人口学者はいまや長い減少を見込んでいると報じている。この変化は主に、大人としての生活が何にいくらかかり、いつ始まるかから生じている。職場の近くの住居は高く、労働時間は長く、保育は足りない。もう一つの要因は、女性がより長く学び働くことで、第一子が遅くなり、それ以降の余地が狭まることである。その結果、年金受給者一人を支える労働者はますます減り、年金と病院に負荷がかかり、地方の学校は閉じ、村は空になる。全体として本文は、この傾向を、原因が経済にあり、反転させにくいものとして示している。",
        },
        {
            grade: 'gp1', words: 68,
            text: "The passage reports that births have fallen beneath the rate required to hold populations steady in many countries. This shift stems largely from what adult life now costs, and from women studying and working longer. As a result, fewer workers support each pensioner, straining pensions and hospitals, while country schools shut and villages empty. Overall, the passage presents the trend as economic in origin and hard to reverse.",
            textJa: "本文は、人口を一定に保つのに必要な水準を下回る出生が、多くの国で起きていると報じている。この変化は主に、大人としての生活にかかる費用から、そして女性がより長く学び働くことから生じている。その結果、年金受給者一人を支える労働者は減り、年金と病院に負荷がかかり、地方の学校は閉じ、村は空になる。全体として本文は、この傾向を、原因が経済にあり、反転させにくいものとして示している。",
        },
        {
            grade: 'g2', words: 49,
            text: "The passage reports that births have fallen beneath the rate needed to hold populations steady in many countries. This shift stems largely from what adult life now costs and from women studying and working longer. As a result, fewer workers support each pensioner, and country schools and villages empty.",
            textJa: "本文は、人口を一定に保つのに必要な水準を下回る出生が、多くの国で起きていると報じている。この変化は主に、大人としての生活にかかる費用から、そして女性がより長く学び働くことから生じている。その結果、年金受給者一人を支える労働者は減り、地方の学校と村は空になる。",
        },
    ],
};

// ============================================================
// 型4 PROBLEM / FIX -- 対策
// ============================================================

const P4_PROBLEM_FIX: SumPattern = {
    id: 'problemFix', no: 4, en: 'PROBLEM / FIX', short: 'FIX', ja: '対策',
    shape: 'P1 what is happening -> P2 how much is at stake -> P3 the measures and their limits',
    shapeJa: '第1段落 現状 / 第2段落 どれだけ深刻か / 第3段落 打った手と、その限界',
    why: '1級の要約はこの形で来る。公式サンプルの砂の採掘も、埋め立ても、違法な野生動物取引も、献血も、全部この形だった。反対する人は出てこない。全員が問題だと思っていて、それでも解けていない。',
    wrongIf: '賛否型(型1)で書くと、第3段落を Critics warn と書くことになる。本文には対策に反対する人は出てこないので、存在しない対立を作ったことになり内容の観点が落ちる。第2段落を「利点」と読むのも同じ事故で、そこに書いてあるのは深刻さである。',
    seen: '1級の公開回はすべてこの形。公式サンプル(砂の採掘)から2025年度第3回(献血)まで、確認できる回で例外が無い。準1級でも現象→原因→対策の形で出ている。',
    seenGrades: ['g1', 'gp1'],
    dropOrder: [5, 2],
    topic: 'Food waste', topicJa: '食品ロス',
    tell: 'What is thrown out is not only the food.',
    passage: "Roughly a third of the food produced for people is never eaten. Some of it is left in the fields because it does not match the appearance standards of supermarkets. Some spoils on the road, or in warehouses that have no cooling. The rest sits unsold on shelves, or goes into the bin at home once the date printed on the packet has passed. The loss is spread thinly across every stage of the chain, which is part of why it has been so easy to ignore.\n\nWhat is thrown out is not only the food. Every wasted loaf carries with it the ground that was cleared to grow the wheat, the water drawn to irrigate it, the fuel burned to move it and the hours of work that went into it. Buried in a landfill, the same loaf gives off methane, a gas that traps heat far more effectively than carbon dioxide, so the harm continues long after the meal was missed. Meanwhile hundreds of millions of people do not have enough to eat, and the demand created by what is later binned pushes prices upward for everyone.\n\nMeasures have been introduced, though none has yet turned the figures around. France forbids large supermarkets to destroy unsold but edible stock and obliges them to hand it to charities, a rule several countries have since adopted. Date marks are being simplified so that shoppers can tell a safety warning from a guess about flavour, and applications now sell surplus restaurant meals cheaply at closing time. Yet the largest share of the loss happens on farms and in kitchens, where no inspector calls. Moving surplus food requires cooling, storage and volunteers, and donors fear being blamed if somebody falls ill. Above all, food in rich countries is cheap against income, so putting it in the bin costs the individual almost nothing.",
    passageJa: "人のために生産される食料のおよそ三分の一は、一度も食べられない。一部はスーパーの外見基準に合わないために畑に残される。一部は輸送中に、あるいは冷却設備のない倉庫で傷む。残りは棚で売れ残るか、包装に印刷された日付が過ぎたあと家庭でゴミ箱に入る。この損失は流通のあらゆる段階に薄く広がっており、それがこの問題を無視しやすかった理由の一つでもある。\n\n捨てられているのは食料だけではない。無駄になったパン一つには、小麦を育てるために切り開かれた土地、それを潤すために引かれた水、運ぶために燃やされた燃料、そこに注がれた労働の時間が付いてくる。埋立地に埋められれば、同じパンがメタンを出す。二酸化炭素よりはるかに強く熱を閉じ込める気体であり、食事が失われたずっとあとまで害が続く。その一方で、数億の人が十分に食べられておらず、あとで捨てられるものが生む需要が、みなの価格を押し上げている。\n\n対策は導入されてきたが、数字をまだ反転させたものは一つもない。フランスは大型スーパーが売れ残った可食の在庫を廃棄することを禁じ、慈善団体へ渡すよう義務づけており、この規則はその後いくつかの国が採り入れた。日付表示は、安全上の警告と風味についての目安を買い物客が区別できるよう簡素化されつつあり、アプリは閉店時にレストランの余剰の食事を安く売る。しかし損失の最大の部分は農場と台所で起きており、そこには検査官が来ない。余剰食料を動かすには冷却・保管・人手が要り、提供する側は誰かが体調を崩したときに責められることを恐れる。何より、豊かな国では食料が所得に比べて安いので、ゴミ箱に入れても個人にはほとんど損がない。",
    openers: [
        { n: 1, en: 'The passage observes that', ja: '本文は〜を指摘している', para: 1, slotJa: 'いま何が起きているか' },
        { n: 2, en: 'The damage runs deeper because', ja: '被害がより深いのは〜だからである', para: 2, slotJa: '何が一緒に失われているか' },
        { n: 3, en: 'To address this,', ja: 'これに対処するため〜', para: 3, slotJa: '打った手を並べる' },
        { n: 4, en: 'Concerns persist, however, because', ja: 'それでも懸念が残るのは〜だからである', para: 3, slotJa: 'その手が届かない場所' },
        { n: 5, en: 'Overall, the passage presents', ja: '全体として本文は〜として示している', para: 0, slotJa: '本文が結局どういう話だったか' },
    ],
    models: [
        {
            grade: 'g1', words: 101,
            text: "The passage observes that roughly a third of all food grown is never eaten. The damage runs deeper because each discarded item also wastes the land, water and labour behind it, and rots into a warming gas. To address this, France now requires large stores to donate edible surplus, date marks are being clarified, and apps resell unsold meals. Concerns persist, however, because most waste occurs on farms and in home kitchens beyond inspection, redistribution needs cooling and volunteers, and cheap food costs little to bin. Overall, the passage presents the loss as a problem whose remedies miss where it happens.",
            textJa: "本文は、生産される食料のおよそ三分の一が一度も食べられていないことを指摘している。被害がより深いのは、捨てられる一つ一つが、その背後にある土地・水・労働も無駄にし、腐って温室効果のある気体になるからである。これに対処するため、フランスは大型店に可食の余剰の寄付を義務づけ、日付表示は明確にされつつあり、アプリは売れ残った食事を売り直している。それでも懸念が残るのは、損失の大半が検査の及ばない農場と台所で起き、再配分には冷却と人手が要り、安い食料は捨てても損が小さいからである。全体として本文は、この損失を、対策が起きている場所を外している問題として示している。",
        },
        {
            grade: 'gp1', words: 68,
            text: "The passage observes that roughly a third of all food grown is never eaten. The damage runs deeper because each discarded item also wastes the land, water and labour behind it. To address this, France now requires large stores to donate edible surplus, and apps resell unsold meals. Concerns persist, however, because most waste occurs on farms and in home kitchens, and cheap food costs little to bin.",
            textJa: "本文は、生産される食料のおよそ三分の一が一度も食べられていないことを指摘している。被害がより深いのは、捨てられる一つ一つが、その背後にある土地・水・労働も無駄にするからである。これに対処するため、フランスは大型店に可食の余剰の寄付を義務づけ、アプリは売れ残った食事を売り直している。それでも懸念が残るのは、損失の大半が農場と台所で起き、安い食料は捨てても損が小さいからである。",
        },
        {
            grade: 'g2', words: 51,
            text: "The passage observes that roughly a third of all food grown is never eaten. To address this, France now requires large stores to donate edible surplus, and apps resell unsold meals. Concerns persist, however, because most waste occurs on farms and in home kitchens, and cheap food costs little to bin.",
            textJa: "本文は、生産される食料のおよそ三分の一が一度も食べられていないことを指摘している。これに対処するため、フランスは大型店に可食の余剰の寄付を義務づけ、アプリは売れ残った食事を売り直している。それでも懸念が残るのは、損失の大半が農場と台所で起き、安い食料は捨てても損が小さいからである。",
        },
    ],
};

// ============================================================
// 型5 THEY FOUND -- 研究
// ============================================================

const P5_THEY_FOUND: SumPattern = {
    id: 'theyFound', no: 5, en: 'THEY FOUND', short: 'FOUND', ja: '研究',
    shape: 'P1 the old assumption -> P2 what the research showed -> P3 how far it goes',
    shapeJa: '第1段落 それまでの通念 / 第2段落 研究が示したこと / 第3段落 その読み方の留保',
    why: '第3段落が「反対意見」ではなく「同じ研究者による留保」になっている型。研究を否定する人はいない。分かったことの範囲が狭いだけである。',
    wrongIf: '賛否型(型1)で書くと、留保を Critics warn として書くことになり、研究者自身が付けた条件を「批判者の反論」にすり替えることになる。内容の観点が落ちる。',
    seen: '公開回では確認できていない。保険として持っておく型で、優先度は最後。ただし本文が研究の話で来たとき、賛否型で書くと留保が「批判者の反論」に化けるので、置いておく価値はある。',
    seenGrades: [],
    dropOrder: [3, 5],
    topic: 'School start times', topicJa: '始業時刻と睡眠',
    tell: 'Work on adolescent sleep has overturned that assumption.',
    passage: "Teenagers who cannot keep their eyes open during a first-period lesson have traditionally been treated as lazy or badly disciplined. Parents are told to enforce an earlier bedtime, and schools open the day at whatever hour suits the buses and the working adults. For most of the last century the question of when the school day ought to begin attracted almost no attention at all, and the timetable was built around everything except the pupils themselves.\n\nWork on adolescent sleep has overturned that assumption. The internal clock that governs sleep shifts later during puberty, so a fifteen-year-old sent to bed at ten will often lie awake, biologically unready for sleep. Teams of scientists have tracked districts that moved the opening bell from around half past seven to after half past eight. Pupils in those districts slept longer rather than simply going to bed later; attendance improved, reported symptoms of depression declined, and morning road accidents involving young drivers fell.\n\nThe same teams urge caution before a later start is treated as a cure. Gains in test scores were real but modest, and it is difficult to separate the effect of the clock from other reforms introduced at the same time. A later opening pushes sport, part-time jobs and family routines into the evening, and parents who leave for work at seven must arrange supervision. Bus fleets that serve several schools in sequence cannot be rearranged without cost. Most of these studies also ran for only a year or two, leaving it unclear whether the benefits last.",
    passageJa: "一時間目の授業で目を開けていられない十代は、これまで怠惰か、しつけが悪いと見なされてきた。親はもっと早く寝かせるよう言われ、学校はバスと働く大人の都合に合う時刻に一日を始める。前世紀のほとんどを通じて、学校の一日をいつ始めるべきかという問いは、ほとんど注意を引かなかった。\n\n思春期の睡眠の研究が、その前提をくつがえした。睡眠を司る体内時計は思春期に後ろへずれるので、十時に寝かされた十五歳は、生物学的にまだ眠る準備ができておらず、横になったまま目を覚ましていることが多い。科学者たちは、始業の鐘を七時半ごろから八時半すぎに動かした学区を追跡した。それらの学区の生徒は、単に就寝を遅らせたのではなく睡眠時間そのものが伸び、出席率は改善し、抑うつの訴えは減り、若い運転者が関わる朝の交通事故も減った。\n\n同じ研究班が、始業を遅らせることを万能薬として扱う前に慎重であるよう促している。学力試験の伸びは実在したが小さく、時計の効果を、同時に導入された他の改革から切り分けるのは難しい。始業が遅れれば、スポーツ、アルバイト、家族の生活が夜に押し出され、七時に出勤する親は見守りの手配をしなければならない。複数の学校を順番に回るバスの車両は、費用なしには組み替えられない。これらの研究の多くは一、二年しか続いておらず、恩恵が持続するかどうかは分かっていない。",
    openers: [
        { n: 1, en: 'The passage examines', ja: '本文は〜を検討している', para: 1, slotJa: 'それまで何が信じられていたか' },
        { n: 2, en: 'Researchers found that', ja: '研究者たちは〜を明らかにした', para: 2, slotJa: '研究が示した一番大きいこと' },
        { n: 3, en: 'The studies also showed that', ja: '研究はまた〜も示した', para: 2, slotJa: '2つ目の結果' },
        { n: 4, en: 'The authors caution, however, that', ja: 'ただし著者たちは〜と注意を促す', para: 3, slotJa: '留保を全部まとめて' },
        { n: 5, en: 'Overall, the passage presents', ja: '全体として本文は〜として示している', para: 0, slotJa: '本文が結局どういう話だったか' },
    ],
    models: [
        {
            grade: 'g1', words: 106,
            text: "The passage examines the old belief that adolescents who doze through early lessons are simply idle. Researchers found that the body clock governing sleep drifts later through puberty, so a teenager put to bed at ten cannot fall asleep. The studies also showed that where the bell was delayed, pupils gained sleep, attended more often and crashed less on the way in. The authors caution, however, that score gains were small and tangled with other reforms, that evenings grow crowded for families, and that few trials ran beyond two years. Overall, the passage presents a later bell as well supported yet narrow in what it delivers.",
            textJa: "本文は、早い時間の授業でうとうとする十代は単に怠けているのだという古い通念を検討している。研究者たちは、睡眠を司る体内時計が思春期を通じて後ろへずれるので、十時に寝かされた十代はそもそも眠れないことを明らかにした。研究はまた、鐘を遅らせた場所では、生徒の睡眠が増え、出席が増え、登校途中の事故も減ったことを示した。ただし著者たちは、点数の伸びは小さく他の改革と絡み合っていること、家族にとって夜が混み合うこと、二年を超えて続いた試みはほとんどないことに注意を促す。全体として本文は、鐘を遅らせることを、根拠は十分だが届く範囲は狭いものとして示している。",
        },
        {
            grade: 'gp1', words: 68,
            text: "The passage examines the old belief that adolescents who doze through early lessons are simply idle. Researchers found that the body clock drifts later through puberty and that a delayed bell gave pupils more sleep. The authors caution, however, that the gains were small and that few trials ran beyond two years. Overall, the passage presents a later bell as well supported yet narrow in what it delivers.",
            textJa: "本文は、早い時間の授業でうとうとする十代は単に怠けているのだという古い通念を検討している。研究者たちは、体内時計が思春期を通じて後ろへずれること、そして鐘を遅らせれば生徒の睡眠が増えることを明らかにした。ただし著者たちは、その伸びは小さく、二年を超えて続いた試みはほとんどないことに注意を促す。全体として本文は、鐘を遅らせることを、根拠は十分だが届く範囲は狭いものとして示している。",
        },
        {
            grade: 'g2', words: 52,
            text: "The passage examines the old belief that adolescents who doze through early lessons are simply idle. Researchers found that the body clock drifts later through puberty and that a delayed bell gave pupils more sleep. The authors caution, however, that the gains were small and that few trials ran beyond two years.",
            textJa: "本文は、早い時間の授業でうとうとする十代は単に怠けているのだという古い通念を検討している。研究者たちは、体内時計が思春期を通じて後ろへずれること、そして鐘を遅らせれば生徒の睡眠が増えることを明らかにした。ただし著者たちは、その伸びは小さく、二年を超えて続いた試みはほとんどないことに注意を促す。",
        },
    ],
};

export const SUM_PATTERNS: SumPattern[] = [
    P1_FOR_AGAINST, P2_GAIN_COST, P3_WHY_SO, P4_PROBLEM_FIX, P5_THEY_FOUND,
];

// ============================================================
// 圧縮 -- 何を切って何を残すか
// ============================================================

export interface Rule { en: string; ja: string; note: string; }

/** 本文から必ず切るもの */
export const CUT_RULES: Rule[] = [
    { en: 'Examples', ja: '例', note: 'for example / such as / including / like は「ここから先は例」の合図。後ろを切り、その合図語の直前にある抽象語を残す。残すのは例ではなく、例がくっついていた語のほう。1級は抽象化が必須で、such as ごと持ち込むと語彙の観点が落ちる。' },
    { en: 'Numbers and names', ja: '数字と固有名詞', note: 'その段落の主張が、その数字や名前なしで成り立つなら切る。成り立たないなら1つだけ残す(型4のフランスがその1つ)。' },
    { en: 'Quotes and sources', ja: '引用と出典', note: '誰が言ったかは要約の情報ではない。according to a report by ~ は丸ごと消える。' },
    { en: 'Hedging run-ups', ja: '前置き', note: 'It is often said that / While it is true that は中身がない。後ろの節だけ残す。' },
    { en: 'Second sayings', ja: '同じことの二度目', note: '英語の段落は同じ主張を語を変えて2回書く。要約は1回だけ書く。' },
];

/** 必ず残すもの */
export const KEEP_RULES: Rule[] = [
    { en: 'The topic sentence of each paragraph', ja: '各段落の1文目', note: '3つの段落の1文目が、そのまま要約の文1・2・4になる。ここが背骨。' },
    { en: 'The turn', ja: '向きの変わり目', note: 'however / at the same time / as a result。段落の関係そのものなので、消すと構成の観点が落ちる。' },
    { en: 'One extra point per side', ja: '各側の2つ目の論点', note: '1級だけ。語数が足りないときに文3で足す。準1級・2級では切る。' },
];

/** 言い換えの3手。語彙の観点はここで取る */
export interface SwapMove { no: number; en: string; ja: string; before: string; after: string; note: string; }

export const SWAP_MOVES: SwapMove[] = [
    {
        no: 1, en: 'CHANGE THE PART OF SPEECH', ja: '品詞を変える',
        before: 'employees save considerable time and money by not commuting',
        after: 'commuting costs disappear',
        note: '動詞を名詞に、名詞を動詞にするだけで、写したことにならなくなる。一番安全で一番速い。',
    },
    {
        no: 2, en: 'GO ONE LEVEL UP', ja: '上位語に上げる',
        before: 'video conferencing and cloud-based collaboration tools',
        after: 'digital communication',
        note: '並んだ具体を、それを含む1語に置き換える。要約は上から見る文章なので、上位語のほうが正しい。',
    },
    {
        no: 3, en: 'COUNT THE LIST', ja: '並列を数える',
        before: 'it raises anxiety, damages sleep, and lowers self-esteem',
        after: 'it harms mental health in three ways',
        note: '3つ並んでいたら3語使わず「3つ」と数える。一番語数が減る手。ただし何の3つかを1語で言えるときだけ使う。',
    },
];

/** 本文でよく出る言い回しと、要約側の短い動詞 */
export const SWAP_TABLE: { from: string; to: string; ja: string }[] = [
    { from: 'has risen sharply / has grown steadily', to: 'has climbed', ja: '増えた' },
    { from: 'has fallen considerably / has declined', to: 'has sunk', ja: '減った' },
    { from: 'makes it possible for ~ to do', to: 'lets ~ do / enables', ja: '可能にする' },
    { from: 'has a negative effect on', to: 'harms / damages / strains', ja: '悪くする' },
    { from: 'has a positive effect on', to: 'improves / lifts / eases', ja: '良くする' },
    { from: 'is regarded as / is seen as', to: 'is treated as', ja: '〜と見なされる' },
    { from: 'express concern about', to: 'raise concerns about', ja: '懸念する' },
    { from: 'is caused by / results from', to: 'stems from', ja: '〜に由来する' },
    { from: 'is closely connected with', to: 'is linked to', ja: '〜と結びつく' },
    { from: 'cannot manage without', to: 'relies on / depends on', ja: '〜に頼る' },
    { from: 'a range of advantages', to: 'several benefits', ja: 'いくつもの利点' },
    { from: 'serious drawbacks / grave problems', to: 'real costs', ja: '重い欠点' },
    { from: 'are calling for stricter rules', to: 'demand tighter regulation', ja: '規制強化を求める' },
    { from: 'in an attempt to reduce', to: 'to curb', ja: '抑えようとして' },
    { from: 'there is a growing tendency to', to: 'more people now', ja: '〜する人が増えている' },
];

/** 書いた瞬間に落ちるもの */
export const BANNED: Rule[] = [
    { en: 'I think / In my opinion', ja: '自分の意見', note: '要約に意見は1語も入らない。意見論述と混ぜた時点で内容0点の可能性がある。' },
    { en: 'For example / such as', ja: '例', note: '例を足すのは要約ではなく敷衍。本文にある例すら切るのに、自分で足すのは逆走。' },
    { en: 'Information not in the passage', ja: '本文にない情報', note: '知っている事実でも、本文が言っていなければ書かない。' },
    { en: 'Copying five words in a row', ja: '連続5語の写し', note: '語彙の観点が直撃する。写しそうになったら SWAP_MOVES の3手のどれかを当てる。' },
    { en: 'Missing the word count', ja: '語数外し', note: '2025年度から「目安」ではなく「指定」。枠を外すと中身を読まれる前に落ちる。2025年度第3回の全観点0点の報告はここが原因と見られている。' },
    { en: 'Repeating one content word three times', ja: '同じ語を3回', note: '同じ内容語を3回以上使うと語彙の観点が下がる。2回目で SWAP_TABLE を引く。' },
    { en: 'Dropping a whole paragraph', ja: '1段落まるごと落とす', note: '3段落のうち1つでも要約に現れないと内容の観点が大きく落ちる。語数が苦しいときも、段落を捨てるのではなく1文を短くする。' },
];

// ============================================================
// 実演 -- 本文から要約までを1本通す
// ============================================================

export interface WalkStep { no: number; title: string; body: string; }

export const WALKTHROUGH: WalkStep[] = [
    {
        no: 1, title: '第2段落の1文目だけ読む',
        body: 'まだ全部読まない。第2段落の1文目を読んで DECISION を上から当てる。当たった時点で型が確定し、5つの文頭が全部決まる。ここまで20秒。',
    },
    {
        no: 2, title: '各段落の1文目に印を付ける',
        body: '3つの段落の1文目が、要約の文1・文2・文4になる。この3文だけで2級の要約は終わる。残りの文は、語数が足りないときの在庫である。',
    },
    {
        no: 3, title: '例・数字・固有名詞を消す',
        body: 'CUT_RULES の5つを当てて、印を付けた文から飾りを落とす。残るのは「誰が(何が) どうする」だけになる。',
    },
    {
        no: 4, title: '文頭を置いて、主語と動詞を入れる',
        body: '型の openers を順に書き、その後ろに主語と動詞を差す。ここで初めて自分の英語を書く。書くのは各文の後半だけ。',
    },
    {
        no: 5, title: '本文と同じ語が3語続いていないか見る',
        body: '写している箇所は必ずある。SWAP_MOVES の3手(品詞を変える / 上位語に上げる / 並列を数える)のどれかを当てて崩す。',
    },
    {
        no: 6, title: '数える',
        body: '級の枠に入っているか数える。多いなら文3を削る。少ないなら文3を足す。型は動かさない。動かすのは文の数だけ。',
    },
];

// ============================================================
// 取り出し
// ============================================================

export function getPattern(id: SumPatternId): SumPattern | undefined {
    return SUM_PATTERNS.find(p => p.id === id);
}

export function getModel(id: SumPatternId, grade: Grade): SumModel | undefined {
    return getPattern(id)?.models.find(m => m.grade === grade);
}

/**
 * その型・その級で使う文の番号。
 * 型ごとに落とす順(dropOrder)が違うのは、段落と文の対応が型で違うからである。
 * 型4は第3段落に対策と限界の2文が要るので、先に落ちるのは結び(文5)のほうになる。
 */
export function usesFor(id: SumPatternId, grade: Grade): number[] {
    const p = getPattern(id);
    if (!p) return [];
    const cut = grade === 'g1' ? 0 : grade === 'gp1' ? 1 : 2;
    const dropped = new Set(p.dropOrder.slice(0, cut));
    return [1, 2, 3, 4, 5].filter(n => !dropped.has(n));
}

/** その級で実際に出ている型を先に出す */
export function patternsForGrade(grade: Grade): SumPattern[] {
    return [...SUM_PATTERNS].sort((a, b) => {
        const av = a.seenGrades.includes(grade) ? 0 : 1;
        const bv = b.seenGrades.includes(grade) ? 0 : 1;
        return av - bv || a.no - b.no;
    });
}

export function getGrade(id: Grade): GradeSpec {
    return GRADES.find(g => g.id === id) as GradeSpec;
}

export function countWords(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

export function splitSentences(text: string): string[] {
    return (text.match(/[^.!?]+[.!?]+/g) ?? []).map(s => s.trim()).filter(Boolean);
}

export const TOTAL_PATTERNS = SUM_PATTERNS.length;
export const TOTAL_MODELS = SUM_PATTERNS.reduce((n, p) => n + p.models.length, 0);
