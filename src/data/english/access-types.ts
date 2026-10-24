/**
 * ACCESS -- 「この動画を聞くために、何をどの順番で覚えるか」の型
 *
 * 初学者の罠は量ではない。1本の動画に出てくる語は多くても2,000種程度で、
 * 上位500語で8割が埋まる。詰まる本当の理由は「順番が示されていないこと」。
 *
 * なので ACCESS が出すのは語彙リストではなく順番と、
 * 「そこまでやると何%届くか」という実測の数字。
 */

/** [コーパス順位, 表現, この動画での回数, 種類, 区分, 生涯遭遇, 層, 実例, 秒, 最難語の順位] */
export type AccessChunk = [number, string, number, number, number, number, number, string, number, number];

/**
 * 商品の芯 — 「部品の単語は、もう知っている」の証明。
 * 上位N表現のうち、何%が「上位M語」だけで出来ているか。
 *
 * 初心者が英語を諦める理由は「単語が足りない」という思い込みで、
 * この表はそれが事実でないことを、その人が聞きたい動画そのもので示す。
 */
export interface BandRow { top: number; w1000: number; w2000: number; w3000: number; }

export interface AccessVideo {
    id: string;
    title: string;
    channel: string;
    /** 秒 */
    duration: number;
    /** YYYYMMDD */
    uploadDate: string;
    /** 字幕から取れた総語数 */
    tokens: number;
    /** 異なり語数 */
    distinctWords: number;
    /** 語毎分 */
    wpm: number;
    /** コーパスと一致した表現の種類数 */
    chunkKinds: number;
    /** その延べ出現回数 */
    chunkInstances: number;
    /** [上位N表現, この動画の表現出現の何%を覆うか] */
    chunkCurve: Array<[number, number]>;
    /** [上位N語, この動画の総語数の何%を覆うか] */
    wordCurve: Array<[number, number]>;
    /** 8,000語リストに無い語が総語数に占める割合。ほぼ固有名詞 */
    oovShare: number;
    /** リスト外の頻出語 [語, 回数] */
    oovTop: Array<[string, number]>;
    /** 部品の単語が既知である割合。商品の芯 */
    bandTable: BandRow[];
    chunks: AccessChunk[];
}

export const CH = {
    rank: 0, chunk: 1, n: 2, kind: 3, group: 4, life: 5, tier: 6, ex: 7, at: 8,
} as const;

/**
 * 覚える順番のブロック分け。
 * 上位から均等に切るのではなく「1ブロックで届く量」が体感できる幅で切る。
 * 数字(到達%)は動画ごとに実測から埋める。
 */
export interface AccessBlock {
    no: number;
    from: number;   // 1-indexed
    to: number;
    name: string;
    why: string;
}

export const BLOCKS: AccessBlock[] = [
    { no: 1, from: 1, to: 25, name: '骨組み', why: 'you know / i think / kind of の層。会話の関節そのもので、意味は薄いのに一番出る。ここを知らないと、知っている単語すら流れの中で見つけられない' },
    { no: 2, from: 26, to: 100, name: '主戦場', why: '生涯で数万回会う塊。中学英語の語で出来ているのに日本人の口からは出ない。聞き取りが「点」から「線」になるのはここ' },
    { no: 3, from: 101, to: 250, name: '肉付け', why: '話の展開を作る表現。ここまで入ると、聞き取れない部分があっても話が追える' },
    { no: 4, from: 251, to: 600, name: '半分', why: 'この動画で使われた表現の半分に届く帯。字幕を消して大意が取れる境目' },
    { no: 5, from: 601, to: 1000, name: '仕上げ', why: '個別の話題に寄った表現。この動画に固有のものが増えるので、他の動画への効きは落ちる' },
    { no: 6, from: 1001, to: 99999, name: '残り', why: '1回しか出ない表現が大半。覚えなくていい。ここを追い始めると終わらない' },
];

/** ブロックの到達率をカバー曲線から線形で読む */
export const reachAt = (curve: Array<[number, number]>, n: number): number => {
    if (!curve.length) return 0;
    if (n <= curve[0][0]) return +(curve[0][1] * (n / curve[0][0])).toFixed(1);
    for (let i = 1; i < curve.length; i++) {
        const [n0, p0] = curve[i - 1], [n1, p1] = curve[i];
        if (n <= n1) return +(p0 + (p1 - p0) * ((n - n0) / (n1 - n0))).toFixed(1);
    }
    return curve[curve.length - 1][1];
};
