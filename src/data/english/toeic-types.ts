/**
 * TOEIC(R) L&R 形式 フル模試 -- 型定義(手書き・安定)。
 *
 * ビジネス(集客)ライン。実際のTOEIC/ETSとは一切無関係の非公式オリジナル模試。
 * 問題・本文・スクリプトはすべて当サービスのオリジナルで、実試験の転載ではない。
 * データ本体(toeic-test-01.ts)は scripts/assemble-toeic.cjs が自動生成する。
 *
 * 構成(本番と同一): Listening 100問(Part1-4) + Reading 100問(Part5-7) = 200問。
 *  Part1  1-6     写真描写(6)
 *  Part2  7-31    応答問題(25)
 *  Part3  32-70   会話(13セット x 3)
 *  Part4  71-100  説明文(10セット x 3)
 *  Part5  101-130 短文穴埋め(30)
 *  Part6  131-146 長文穴埋め(4セット x 4)
 *  Part7  147-175 1つの文書(29) / 176-200 複数の文書(5セット x 5)
 */

export type Letter = 'A' | 'B' | 'C' | 'D';
export type Letter3 = 'A' | 'B' | 'C';

export interface Choice {
    label: Letter;
    text: string;
}

// ---- Listening ----
export interface Part1Q {
    no: number;                 // 1-6
    svg?: string;               // 線画イラスト(あれば)。なければ sceneDescription を枠表示
    sceneDescription: string;   // 写真の描写(解答面のみ表示)
    statements: Choice[];       // 4つの音声ステートメント
    answer: Letter;
    note: string;               // 日本語解説
    transcript: string;         // 読み上げ用スクリプト(4文)
}

export interface Part2Q {
    no: number;                 // 7-31
    prompt: string;             // 音声の質問/発言
    responses: { label: Letter3; text: string }[]; // 3つの応答
    answer: Letter3;
    note: string;
    /**
     * 正解の応答の型。難易度の核。
     *  direct   = 質問に直接答える
     *  indirect = 直接答えず状況・事情で返す (本番は25問中10問前後)
     *  echo     = 聞き返す・質問で返す
     * リントで indirect の本数を検証するため、生成側の自己申告として必須。
     */
    replyType?: 'direct' | 'indirect' | 'echo';
    /** 問いかけの型。リントで配分を検証する */
    promptType?: 'wh' | 'offer' | 'negative' | 'tag' | 'choice' | 'statement';
}

export interface ListenQ {
    no: number;
    question: string;           // 印刷される設問
    choices: Choice[];          // A-D
    answer: Letter;
    note: string;
    intentQ?: boolean;          // 意図問題 ("Why does the man say, ...?")
    graphicQ?: boolean;         // 図表問題 ("Look at the graphic." で始まる)
}

/**
 * Part 3/4 の図表問題 (Look at the graphic.) で使う図。
 *
 * 成立条件: 図は必ず2軸 (項目名 ↔ 値) を持ち、音声は**片方の軸だけ**に言及する。
 * 選択肢はもう片方の軸から作り、正解の値は音声中に一度も出さない。
 * これを破ると図を見ずに解けてしまい、図表問題として機能しない。
 */
export type Graphic =
    | { kind: 'table'; title?: string; headers?: string[]; rows: string[][] }
    | { kind: 'pie'; title?: string; slices: { label: string; pct: number }[] }
    | { kind: 'map'; title?: string; svg: string };

export interface Part34Set {
    no: number;                 // Part内の通し(会話/説明文の番号)
    kind: 'conversation' | 'talk';
    context: string;            // 状況ラベル(日本語)
    talkType?: string;          // Part4のトーク種別
    speakers?: number;
    transcript: string;         // 会話/トークの全文(話者ラベル付き)
    graphic?: Graphic;          // 図表問題のセットのみ。questions のどれか1問が graphicQ: true
    questions: ListenQ[];       // 3
    range: string;              // 例 "32-34"
}

// ---- Reading ----
export interface Part5Q {
    no: number;                 // 101-130
    sentence: string;           // ------- を1つ含む
    choices: Choice[];
    answer: Letter;
    tag: string;                // 出題ポイント
    note: string;
}

/**
 * Part 6 の空所タイプ。
 * 旧版は 'word' | 'sentence' の2値しか無く、文挿入以外の3問が何を問うているか
 * 検証できなかった (仕様 §3.1 のセット内訳がリントを素通りしていた)。
 *  sentence   = 文挿入 (各セット1問必須)
 *  verb       = 動詞形・時制・態
 *  pos        = 品詞 (語形変化)
 *  vocab      = 語彙
 *  transition = 接続副詞・転換語・前置詞
 * 'word' は旧データ互換のために残す。新規生成では使わない。
 */
export type Part6QType = 'sentence' | 'verb' | 'pos' | 'vocab' | 'transition' | 'word';

export interface Part6Q {
    no: number;
    choices: Choice[];
    answer: Letter;
    type: Part6QType;
    note: string;
}

export interface Part6Set {
    no: number;                 // 131-146 のセット番号(1-4)
    passageType: string;
    passage: string;            // 空所を §NNN§ マーカーで含む
    intro: string;             // "Questions 131-134 refer to the following email."
    questions: Part6Q[];        // 4
    range: string;
}

export interface Passage {
    heading?: string;
    body: string;
    type?: string;
}

/**
 * Part 7 の設問タイプ。リントで本数を検証する。
 *  purpose  = 目的  / detail = 詳細 / infer = 推論 (suggested, indicated)
 *  person   = 人物推論 (Who most likely) / not = NOT問
 *  synonym  = 同義語 (closest in meaning) / insert = 文挿入 ([1]-[4])
 *  intent   = meaning-in-context (チャットの引用の意図)
 */
export type Part7QType = 'purpose' | 'detail' | 'infer' | 'person' | 'not' | 'synonym' | 'insert' | 'intent';

export interface Part7Q {
    no: number;
    question: string;
    choices: Choice[];
    answer: Letter;
    crossRef?: boolean;
    qType?: Part7QType;
    note: string;
}

export interface Part7Set {
    no: number;
    kind: 'single' | 'double' | 'triple';
    passageType: string;
    passages: Passage[];
    intro: string;
    questions: Part7Q[];
    range: string;
}

export interface ToeicTest {
    id: string;
    title: string;
    part1: Part1Q[];
    part2: Part2Q[];
    part3: Part34Set[];
    part4: Part34Set[];
    part5: Part5Q[];
    part6: Part6Set[];
    part7single: Part7Set[];
    part7multiple: Part7Set[];
    answerKey: { no: number; answer: string; tag?: string }[];
}

// ---------------------------------------------------------------------------
// 解説データ (toeic-explain-NN.ts)
//
// 問題本体(ToeicTest)とは別ファイルに持つ。理由は2つ:
//  1. 問題を解く画面が解説データを読み込まずに済む (初期表示を軽くする)
//  2. 問題の再生成(assemble)で解説が消し飛ぶ事故を防ぐ
//
// 市販問題集の解説編と同じ情報量を目標にする。1問あたり必ず:
//   設問の和訳 / 全選択肢の和訳 / 正解の根拠 / 不正解3つそれぞれの外し方
// セット単位で: 本文の全訳 + 語注。
// 本文中の 【1】【2】 マーカーが解説の参照先になる (bodyEn と bodyJp で対応)。
// ---------------------------------------------------------------------------

/** 語注 1件 */
export interface Gloss {
    w: string;        // 見出し語・句
    m: string;        // 意味
    star?: string;    // ★ 補足 (背景知識・使い分けの注意)
}

/** 選択肢1つぶんの和訳と、外し方 */
export interface ChoiceExplain {
    label: Letter;
    jp: string;       // 選択肢の和訳
    why?: string;     // 誤答の理由。正解の選択肢では省略する
}

/** 設問1問ぶんの解説 */
export interface QExplain {
    no: number;
    questionJp?: string;    // 設問の和訳 (Part1/6 のように設問文が無い場合は省略)
    correct: string;        // 正解の根拠。本文の 【n】 マーカーを引いて示す
    choices: ChoiceExplain[];
}

/**
 * セット単位の解説。
 * Part5 のように本文が無いものは bodyEn/bodyJp を空にし、questions だけを持つ。
 */
export interface SetExplain {
    key: string;            // "p3-32-34" / "p5-101" など。ページ側の参照キー
    bodyEn?: string;        // 【n】マーカーを挿入した英語本文。マーカーを除くと原文と完全一致する
    bodyJp?: string;        // 同じマーカーを持つ全訳
    gloss: Gloss[];
    questions: QExplain[];
}

export interface ToeicExplain {
    id: string;             // 対応する ToeicTest の id
    sets: SetExplain[];
}

// ---------------------------------------------------------------------------
// 語注データ (toeic-gloss-NN.ts)
//
// 解説編(ToeicExplain)を持たない回のための、語注だけの軽いデータ。
// 弱点レポート(ToeicWeakness)が「落とした問題に出てきた単語」を出すのに使う。
// 解く画面は読み込まないので、初期表示には影響しない。
//
// scripts/build-toeic-gloss.cjs が、共通の語彙辞書を各セットの英文に
// 突き合わせて生成する。手で編集しない。
// ---------------------------------------------------------------------------

/** 語注1セット。nos はこの語注が担当する設問番号 */
export interface GlossSet {
    key: string;        // "p7-147-148" など
    nos: number[];
    gloss: Gloss[];
}

export interface ToeicGlossary {
    id: string;         // 対応する ToeicTest の id
    sets: GlossSet[];
}

// ---------------------------------------------------------------------------
// つながらない語 (toeic-bridge-NN.ts)
//
// 語注(Gloss)とは狙いが違う。語注は「知らない単語の意味」を埋める。
// こちらは**単語は全部知っているのに文の意味が通らない**箇所を埋める。
//   - 中学単語なのに、学校で習った訳を当てると文が壊れる (run a piece, hold off)
//   - 日本語に同じ発想の言い方が無くて、直訳すると意味不明になる (make the case)
//   - カタカナ語として輸入されていて、英語の意味とずれている (claim, service)
//   - 訳語は合っているのに、その語が文中で果たす役割が日本語と違う (given, once)
//
// 解像度が上がらない原因はほぼここにある。1セット3-5件。
// ---------------------------------------------------------------------------

/** つながらない語 1件 */
export interface BridgeItem {
    /** 引っかかる語・句。本文の表記のまま抜く */
    en: string;
    /** 学校英語の訳を当てるとこうなる、という直訳。ここで詰まる */
    lit: string;
    /** この文での実際の意味 */
    real: string;
    /** なぜそうなるのか / 次に出たときの見分け方 */
    why: string;
}

export interface BridgeSet {
    key: string;        // SetExplain.key と同じ ("p7-147-148" など)
    items: BridgeItem[];
}

export interface ToeicBridge {
    id: string;         // 対応する ToeicTest の id
    sets: BridgeSet[];
}
