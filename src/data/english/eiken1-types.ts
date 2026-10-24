/**
 * 英検1級 一次(筆記) 形式 フル模試 -- 型定義(手書き・安定)。
 *
 * ビジネス(集客)ライン。実用英語技能検定(英検)を実施する日本英語検定協会 / STEP とは
 * 一切無関係の非公式オリジナル模試。問題・本文・お題・解答例はすべてオリジナルで、
 * 実試験の転載ではない。データ本体(eiken1-mock-01.ts)は scripts/assemble-eiken1.cjs が生成する。
 *
 * 構成(本番と同一・2024リニューアル後):
 *  大問1  1-22    短文語句空所補充(22)
 *  大問2  23-28   長文語句空所補充(2長文 x 3)
 *  大問3  29-35   長文内容一致(2長文: 3 + 4)
 *  大問4  Summary  英語要約(記述 90-110語)
 *  大問5  Essay    英作文(記述 200-240語)
 *  リスニング L1-L4 (形式知識ベース・低確度)
 *
 * スタイル仕様: docs/eiken1-style-spec.md
 */

export type Num4 = '1' | '2' | '3' | '4';

export interface Choice4 {
    label: Num4;
    text: string;
}

// ---- 大問1: 短文語句空所補充 ----
export interface Q1Item {
    no: number;                 // 1-22
    sentence: string;           // 空所 ( ) を含む短文(会話形式は "A: ... / B: ..." を改行で)
    choices: Choice4[];         // 4択
    answer: Num4;
    tag: string;                // 単語-動詞 / 単語-名詞 / 単語-形容詞 / 句動詞 / 会話
    note: string;              // 日本語解説(正解語の定義+誤答の定義)
}

// ---- 大問2: 長文語句空所補充 ----
export interface Q2Blank {
    no: number;                 // 23-28
    choices: Choice4[];
    answer: Num4;
    note: string;
}
export interface Q2Set {
    no: number;                 // 1-2
    title: string;              // 斜体タイトル
    passage: string;            // 空所を [BLANK1]-[BLANK3] マーカーで含む(assembleで §番号§ に変換)
    intro: string;              // "Read the passage and choose..."
    theme: string;              // 科学 / 美術史 など
    blanks: Q2Blank[];          // 3
    range: string;              // "23-25"
}

// ---- 大問3: 長文内容一致 ----
export interface Q3Question {
    no: number;                 // 29-35
    question: string;
    choices: Choice4[];
    answer: Num4;
    note: string;
}
export interface Q3Set {
    no: number;                 // 1-2
    title: string;
    passage: string;            // 段落は \n\n 区切り
    theme: string;
    questions: Q3Question[];    // 3 または 4
    range: string;              // "29-31"
}

// ---- 大問4: 英語要約 ----
export interface Q4Summary {
    instructions: string[];     // 出題文言(箇条書き)
    article: string;            // 要約対象の記事(段落 \n\n 区切り)
    articleTitle?: string;
    wordRange: [number, number]; // [90, 110]
    modelSummary: string;       // 模範解答
    modelWordCount: number;
    scoringNotes: string[];     // 採点観点(日本語)
}

// ---- 大問5: 英作文 ----
export interface Q5Essay {
    instructions: string[];
    topic: string;
    points: string[];           // POINTS 4語
    wordRange: [number, number]; // [200, 240]
    modelEssay: string;
    modelWordCount: number;
    scoringNotes: string[];
}

// ---- リスニング(低確度) ----
export interface ListenQ {
    no: number;
    question: string;
    choices: Choice4[];
    answer: Num4;
    note: string;
}
export interface ListenConvSet {  // L1: 会話
    no: number;
    context: string;
    transcript: string;
    question: ListenQ;
}
export interface ListenPassageSet { // L2: パッセージ / L4: インタビュー
    no: number;
    title: string;
    transcript: string;
    questions: ListenQ[];
}
export interface ListenRealLifeSet { // L3: Real-Life
    no: number;
    situation: string;          // 状況カード(印字して黙読)
    question: string;
    transcript: string;
    choices: Choice4[];
    answer: Num4;
    note: string;
}

export interface EikenListening {
    part1: ListenConvSet[];     // 10
    part2: ListenPassageSet[];  // 5 sets x 2 = 10
    part3: ListenRealLifeSet[]; // 5
    part4: ListenPassageSet[];  // 1 set x 2 = 2
}

// ---- ルート ----
export interface EikenTest {
    id: string;
    title: string;
    q1: Q1Item[];
    q2: Q2Set[];
    q3: Q3Set[];
    q4: Q4Summary;
    q5: Q5Essay;
    listening: EikenListening;
    answerKey: { no: number; answer: string; tag?: string }[]; // 選択式のみ(1-35 + リスニング)
}
