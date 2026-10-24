/**
 * 実測コーパスから抽出した多語表現ランキングの型と集計。
 * 本体は public/data/chunk-ranking.json (fetchで読む)。
 * 自動生成。手で編集しない。
 *   node scripts/chunks-to-ts.mjs
 *
 * 作り方と限界は docs/chunk-corpus-spec.md
 */

/** [表現, 種類, 区分, 語域, 生活頻度/100万語, 生涯遭遇, 結束度, 層, YouTube, 字幕, 映画, 論説, 古典] */
export type ChunkRow = [string, number, number, number, number, number, number, number, number, number, number, number, number];

/**
 * 区分。日常会話と語彙は覚え方が違うので混ぜない。
 * junk food と take care of ~ を同じ表に並べても使えない。
 */
export const GROUP_LABELS = [
    { name: '会話表現', desc: '組み立てて口から出す形。覚える本体' },
    { name: '語彙', desc: '意味を持つ複合語。junk food / mental health' },
    { name: '固有名', desc: '地名・人名。名前なので覚える対象ではない' },
] as const;

/**
 * 種類。語数で分けるのは機械の都合であって、
 * at the end of the day を5語の表現だと思う人間はいない。
 */
export const KIND_LABELS = [
    { name: '句動詞', desc: '動詞と副詞の組。figure out / hang out' },
    { name: 'イディオム', desc: '字面から意味が出ない固まり。keep an eye on' },
    { name: '文まるごと', desc: '主語と述語がある文の形。ことわざもここ。proof is in the pudding' },
    { name: '会話フレーズ', desc: '会話の型。what do you mean / wait a minute' },
    { name: '定番の組み合わせ', desc: 'よく一緒に使う語。high school / social media' },
] as const;

export const CHUNK_DATA_URL = '/data/chunk-ranking.json';

export const REGISTER_LABELS = ['話し言葉', '両方', '書き言葉'] as const;

export const TIER_LABELS = [
    { name: '浴びる', desc: '一生で3000回以上。会話の骨格。まずここ' },
    { name: 'よく会う', desc: '800回以上。主戦場' },
    { name: 'ときどき', desc: '200回以上。知らないと詰まる' },
    { name: 'たまに', desc: '50回以上。知っていると効く' },
    { name: '稀', desc: '50回未満。顕著性で覚える層' },
] as const;

export const CHUNK_STATS = {
    total: 379475,
    corpusWords: 333745818,
    byTier: [938, 4764, 15291, 32788, 325694],
    byRegister: [379475, 0, 0],
    byKind: [35617, 92881, 1109, 74231, 175637],
    byGroup: [302256, 64560, 12659],
} as const;

/**
 * [上位N件, その時点で覆える割合(%)]
 * 全部やる必要はない。どこで切るかを自分で決められるようにするための数字。
 */
export const COVERAGE_CURVE: Array<[number, number]> = [[100,10.2],[250,14.3],[500,18.8],[1000,24.5],[2000,31.7],[3000,36.7],[5000,44],[8000,51.5],[12000,58.5],[20000,68.1],[30000,74],[50000,80]];
