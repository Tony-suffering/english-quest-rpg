// 出る順 日本語 — 例文の集計。自動生成。手で編集しない。
//   python scripts/build-ja-deru-examples.py
// 例文の本体は public/data/ja-deru-ex/YYYY-MM.json (配信月ごと)。
// 出どころ: JESC 日英字幕対訳 1,918,681 組(英語 2〜8 語に絞ったあと)。CC BY-SA 4.0

export const JA_DERU_EX_DIR = '/data/ja-deru-ex';

/** [英語(実際のセリフ), 字幕の日本語, 同じ語に当たった回数, 割れ先の番号(-1=訳語が入っていない)] */
export type JaDeruExample = [string, string, number, number];
export interface JaDeruExEntry { e: JaDeruExample[]; b: number[] }

export const JA_DERU_EX_STATS = {
    pairs: 1918681,
    words: 4915,
    examples: 13255,
    yama1: { with: 3454, total: 6924 },
    yama2: { with: 1461, total: 15816 },
} as const;
