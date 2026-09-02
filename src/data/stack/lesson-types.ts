/**
 * 作り直し版の型。
 *
 * 旧版 (types.ts / chapters.ts) との一番の違い:
 *   読者はコードを書かない。Claude Code に言うだけ。
 *   だから中身は「コード」ではなく「なんて言うか」になる。
 *
 * ブロックの種類:
 *   say    Claude Code にそのままコピペする言葉。これが主役
 *   type   自分の手でターミナルに打つもの。最初の1回だけ出てくる
 *   hand   自分の手で画面を触るもの。ボタンを押す、アカウントを作る等
 *   expect こうなったら成功、の見え方
 *   check  自分で確かめること。1手順につき1つだけ
 *   note   ひとこと。読み飛ばしていい
 */

export type BlockKind = 'say' | 'type' | 'hand' | 'expect' | 'check' | 'note';

export interface Block {
    kind: BlockKind;
    /** say / type はコピペする本文。それ以外は説明文 */
    text: string;
    /** なぜこう言うのか。say のときだけ書く */
    why?: string;
}

export interface LessonStep {
    /** 手順の見出し。動詞で終わらせる */
    heading: string;
    /** 見出しの下の導入。1-3文 */
    body: string[];
    blocks: Block[];
}

export interface Stuck {
    /** どうなったら、か */
    when: string;
    /** そのまま Claude Code に貼る文 */
    say: string;
}

export interface Lesson {
    no: number;
    slug: string;
    title: string;
    /** きょう何が起きるか。1行 */
    goal: string;
    /** 終わったとき手元にあるもの */
    result: string;
    time: string;
    free: boolean;
    /** 導入。やさしく、短く */
    intro: string[];
    steps: LessonStep[];
    /** うまくいかない時。症状 -> そのまま貼る文 */
    stuck: Stuck[];
    /** 今日はここまで、の一言 */
    closing: string;
}
