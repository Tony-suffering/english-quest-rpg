/**
 * THEME 30 -- 型定義 v2。
 *
 * 【パッケージの構造 = 覚える根拠の構造】
 *   MOVES (24)   = 磨き抜く言い回し。eiken-moves.ts。これが本当の暗記対象
 *   THEMES (30)  = 人間の世界を30に割った担当区。各テーマが「世界のどこを持つか」を
 *                  owns で宣言する。30の owns を並べると世界が埋まる = 網羅の証明
 *   COMBOS       = 30に無い新しいお題を、テーマの部品 + ムーブ + 小さな新事実で
 *                  組んで見せる実演。生成システムであることの証明
 *
 * 【行の根拠】
 * 全ての行(SpokenLine)は m: ムーブIDタグを1つ以上持つ。
 * タグ = その行が24本のうちどれの練習なのか = その行を覚える根拠。
 * タグを付けられない行は、どのムーブの練習にもならない行なので、存在してはいけない。
 *
 * 【なぜ100ではなく30か】
 * 英検2次は5枚から1枚選ぶ。深いテーマを30本持てば、どの5枚が来ても必ず1枚は
 * 殴れるし、外れてもムーブで組める。人間の世界のイベントは30程度で尽きる。
 *
 * 【文体】
 * 読む英語ではなく喋る英語。短いSVO、同じ形の反復、数字は丸めて1発、
 * 3音節以上のラテン語系は避ける。g-dropping禁止(full -ing)。
 *
 * 【著作権】お題・英文はすべてオリジナル。実際の検定試験の問題は転載していない。
 */

/** 1行 = 英文 + 訳 + ムーブタグ(覚える根拠)。タグなしの行は禁止 */
export interface SpokenLine {
    en: string;
    ja: string;
    /** eiken-moves.ts の Move.id。1〜3個 */
    m: string[];
}

export interface Angle {
    label: string;
    en: string;
    ja: string;
}

export interface Side {
    stance: string;
    stanceJa: string;
    lines: SpokenLine[];
}

/** 既存ライティング30本(write-eiken1.ts)の立場を口語に落としたもの */
export interface Origin extends Side {
    day: number;
    /** 元のエッセイが取っていた立場(記録) */
    essay: string;
}

/** 踏み込まれたときの再反論。ここで差がつく */
export interface Deeper {
    q: string;
    qJa: string;
    a: SpokenLine[];
}

export interface Joke {
    en: string;
    ja: string;
    note: string;
    m: string[];
}

export interface Theme {
    no: number;
    id: string;
    label: string;
    en: string;
    field: FieldId;
    /** このテーマが世界のどの部分を担当するか。30個の owns を並べると世界が埋まる */
    owns: string;
    /** 素材にした既存ライティングの回(write-eiken1.ts の day)。30本全部をどこかで使う */
    sourceDays: number[];
    /** 質問の掴み直し(reframe の実装)。理解した合図を最初に立てる */
    hook: string;
    hookJa: string;
    /** テーマの下にある普遍。出題が想定とずれてもここに降りれば接続できる */
    universal: string;
    universalEn: string;
    /** 同じテーマを見る4つの角度。広げずに深くする装置 */
    angles: Angle[];
    /** 既存エッセイの立場の口語版 */
    origin: Origin;
    yes: Side;
    no: Side;
    deeper: Deeper[];
    joke: Joke;
    /** このテーマが吸収する2次カードの言い回し(4本)。網羅の実体 */
    cards: string[];
}

export type FieldId =
    | 'money' | 'people' | 'work' | 'learn' | 'life'
    | 'power' | 'nature' | 'tech' | 'world' | 'self';

export const FIELDS: { id: FieldId; label: string; en: string; note: string }[] = [
    { id: 'money', label: '金と分配', en: 'Money', note: '誰が払い、誰が取るか' },
    { id: 'people', label: '人と居場所', en: 'People', note: '入れる・出る・住む・数' },
    { id: 'work', label: '仕事', en: 'Work', note: '働く時間と、仕事が消えること' },
    { id: 'learn', label: '学び', en: 'Learning', note: '何を教え、何で測るか' },
    { id: 'life', label: '生と死', en: 'Life & Death', note: '体・病・家族・終わり' },
    { id: 'power', label: '力と決定', en: 'Power', note: '誰が決め、どこまで許すか' },
    { id: 'nature', label: '自然', en: 'Nature', note: '資源・気候・他の生き物' },
    { id: 'tech', label: '技術', en: 'Technology', note: '道具が人間に何をするか' },
    { id: 'world', label: '国と国', en: 'Between Nations', note: '交易・同盟・戦争・援助' },
    { id: 'self', label: '自分', en: 'The Self', note: '時間・幸福・見せ方' },
];

export const FIELD_BY_ID: Record<FieldId, (typeof FIELDS)[number]> =
    Object.fromEntries(FIELDS.map((f) => [f.id, f])) as Record<FieldId, (typeof FIELDS)[number]>;

export const TOTAL_THEMES = 30;

// ============================================================
// COMBO -- 30に無いお題を組んで見せる実演
// ============================================================

/** 組み立ての1行。src = どのテーマのどの部品から借りたか(新規なら 'new') */
export interface ComboLine extends SpokenLine {
    /** 例: 't22:yes' 't1:no' 'new'。新規は1コンボ2行まで */
    src: string;
}

export interface Combo {
    no: number;
    q: string;
    qJa: string;
    /** 借りたテーマのid */
    themes: string[];
    /** 何を新しく足したか(小さな具体例1つのはず) */
    newFact: string;
    lines: ComboLine[];
    /** この組み立てが示すこと */
    note: string;
}
