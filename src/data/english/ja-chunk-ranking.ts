/**
 * 日本語コーパスから抽出した表現の集計。
 * 本体は public/data/ja-chunk-ranking.json (fetch で読む)。
 * 自動生成。手で編集しない。
 *   node scripts/ja-chunks-to-json.mjs
 *
 * 作り方と限界は docs/ja-corpus-spec.md
 */

/** [表現, 語数, 種類, 形(0=逐語 1=型), 生涯遭遇, 100万語あたり, 結束度, 層, ファイル数] */
export type JaChunkRow = [string, number, number, number, number, number, number, number, number];

/** [日本語, 種類, 生涯遭遇, 裏取りペア数, 英訳, 直訳不可度, 裏取り十分か] */
export type JaAlignRow = [string, number, number, number, string[], number, number];

export const JA_CHUNK_URL = '/data/ja-chunk-ranking.json';
export const JA_ALIGN_URL = '/data/ja-align.json';

export const JA_KIND_LABELS = [
    { name: '慣用句', desc: '腹が立つ / 気を使う。字面から意味が出ない固まり' },
    { name: '説明表現', desc: 'だから / つまり / 逆に。話を繋ぐ骨組み' },
    { name: '評価ぼかし', desc: '微妙 / 意外と / 別に。程度と評価をぼかす層' },
    { name: '型', desc: '[X]しとけばよかった。中身が入れ替わる形' },
    { name: '相槌', desc: 'はいはい / うんうん。相手に返す音' },
    { name: '語彙', desc: '仕事帰り / 二度手間。意味を持つ複合語' },
    { name: '活用', desc: 'してる / だった。活用そのもの' },
    { name: 'てにをは', desc: 'んだ / のに。単体では意味を持たない' },
] as const;

export const JA_TIER_LABELS = [
    { name: '浴びる', desc: '一生で3000回以上。話し言葉の骨格' },
    { name: 'よく出る', desc: '1000回以上' },
    { name: '出会う', desc: '300回以上' },
    { name: 'たまに', desc: '100回以上' },
    { name: '端', desc: '100回未満' },
] as const;

export const JA_FORM_LABELS = ['逐語形', '型'] as const;

export const JA_CHUNK_STATS = {
    total: 4628944,
    shown: 100000,
    corpusWords: 262231183,
    aligned: 98274,
    alignedSolid: 63777,
    byKind: [1151325, 369875, 686651, 1568538, 5514, 358606, 337734, 150701],
    byTier: [6025, 12306, 43155, 125296, 4442162],
    byForm: [2254847, 2374097],
} as const;

/**
 * [上位N件, その時点で覆える割合(%)]
 * 全部やる必要はない。どこで切るかを自分で決めるための数字。
 */
export const JA_COVERAGE_CURVE: Array<[number, number]> = [[100,7.1],[250,10.5],[500,13.7],[1000,17],[2000,20.8],[3000,23.3],[5000,26.7],[8000,30.1],[12000,33.2],[20000,37.4],[30000,41],[50000,45.8]];
