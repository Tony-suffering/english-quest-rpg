/**
 * 教材の型。章の中身は chapters.ts に書く。
 *
 * コードは全部 iwasaki-naisou-website / english-quest-rpg で実際に動いているものを
 * そのまま持ってきている。動かないコードは1行も載せない。
 */

export interface CodeBlock {
    /** 何のコードか。ファイルパスをそのまま書く */
    file: string;
    lang: 'ts' | 'tsx' | 'sql' | 'bash' | 'json' | 'text';
    code: string;
    /** コードの下に置く一言。無くてもいい */
    note?: string;
}

export interface Step {
    heading: string;
    /** 段落。1要素 = 1段落 */
    body: string[];
    code?: CodeBlock[];
}

export interface Trap {
    /** どう見えるか */
    symptom: string;
    /** 何が起きているか */
    cause: string;
    /** どう直すか */
    fix: string;
}

export interface Chapter {
    no: number;
    slug: string;
    title: string;
    /** 一行でこの章が何か */
    lead: string;
    /** この章が終わった時に手元に残るもの */
    goal: string;
    /** かかる時間の目安 */
    time: string;
    /** note の無料部分に載せる章か */
    free: boolean;
    /** なぜこれをやるのか。ここが一番大事 */
    why: string[];
    steps: Step[];
    traps: Trap[];
    /** 終わったかどうかの判定 */
    done: string[];
}
