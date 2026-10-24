// 出る順 日本語 — 集計とラベル。
// 本体は public/data/ja-deru.json (fetch で読む)。
// 自動生成。手で編集しない。
//   node scripts/build-ja-deru.mjs
//
// 出どころ:
//   網羅性と英訳 = JMdict (EDRDG, 210,364 見出し)
//   山1 の順番   = 会話2.6億語の生涯遭遇 (ja-chunk-ranking と同じ表)
//   山2 の順番   = 人の判定 (ja-deru-sieve.mjs)。機械で測れる「生活で要る度」が無いため

/** [語, 読み, 山(1|2), 会話頻度, 語義数, 訳語数, 辞書の答え, 割れ先, 品詞, 場面, 日付, 段(A|B|C|'')] */
export type JaDeruRow = [string, string, 1 | 2, number, number, number, string, string[], string, string, string, string];

export const JA_DERU_URL = '/data/ja-deru.json';
export const JA_DERU_PER_DAY = 10;
export const JA_DERU_START_MONTH = '2026-09';

export const JA_DERU_STATS = {
  /** JMdict の使える見出し(助詞・古語を落としたあと) */
  dictHeads: 210364,
  /** 配信に載せた総数 */
  total: 22890,
  /** 山1 = 会話に毎日出て、英語で割れる語 */
  yama1: 7040,
  /** 山2 = 会話コーパスに1件も無い生活語。配るのは判定した語だけ */
  yama2: 15850,
  /** 山2 の候補(機械のふるい後)。ここから人が判定する */
  yama2Pool: 88334,
  /** 判定済み(A+B+C+X) */
  yama2Judged: 27365,
  /** 未判定。これが減れば表が伸びる */
  yama2Unjudged: 60969,
  tiers: { A: 2468, B: 6130, C: 7252, X: 11515 },
} as const;

/** [上位N件, 山1の遭遇総量のうち覆える割合(%)] */
export const JA_DERU_COVERAGE: Array<[number, number]> = [[100,13.2],[310,26.7],[620,42.8],[930,58.4],[1240,68.6],[1860,84.1],[2480,91.8],[3100,95.5],[4650,99.1],[6200,99.9]];

export const JA_DERU_YAMA = [
  { name: '会話に出る', desc: '会話2.6億語に実際に出ていて、英語では2本以上に割れる語。出る順は遭遇数から' },
  { name: '辞書にしかない', desc: '会話コーパスに1件も無いのに、日常で使う語。裾上げ・花粉症・立ち仕事。順番は人の判定(A 毎週 / B 年に何度か / C 知っておく)' },
] as const;

export const JA_DERU_SCENES: Array<[string, number]> = [["食",589],["金",403],["体・病院",376],["家",359],["役所・法",216],["仕事",212],["交通",190],["人づきあい",187],["服",166],["現場",19],["外",5]];
