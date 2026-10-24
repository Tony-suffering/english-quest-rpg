/**
 * THE STORY — 製品本体。
 *
 * ■ 位置づけ(2026-08-07 の設計確定)
 * 学習者が読むのは **物語だけ**。型の台帳(patterns/)も表現バンク(bank/)も、
 * 学習者に見せるためのものではなく、**この物語が全部を含んでいるかを検算するための仕様書**である。
 *
 * ハリーポッターは110万語あるが網羅を設計していないので穴が出る。
 * こちらは **網羅から逆算して書く**。だから「これを追えば、ネイティブが最低限触れる
 * 英語に全部触れた」と言い切れる。言い切るための装置が scripts/story-coverage.mjs。
 *
 * ■ 規模
 *   1章 = 1窓口 = 1,500〜3,000語 × 137章 → **20万〜40万語**
 *   足りなければ同じ窓口の別の日を書いて章を増やす。数百万語まで伸ばせる構造にしてある。
 *
 * ■ 書き方の規則
 *   1. 英語で書く。日本語は intro(章の入口・1〜2行)だけ。訳は付けない
 *   2. 会話が主。地の文は場面を動かす最小限。ネイティブが実際に浴びる比率に合わせる
 *   3. 登場人物は町民147人 + 職能38人から。新キャラを作らない
 *   4. **台帳の型を意識して書く。書いてから検査機にかけ、出ていない型を次の章で回収する**
 *   5. 不自然な英語を書いてまで型を詰め込まない。詰まらなければ章を足す
 */

export interface StoryLine {
    /** 話者。地の文は 'narration' */
    who: string;
    /** 英語。ここが本体 */
    text: string;
}

export interface Chapter {
    no: number;
    /** 対応する窓口(Station の en)。物語と台帳の接続点 */
    station: string;
    /** 章題(英語) */
    title: string;
    /** 章題(日本語) */
    titleJa: string;
    /** 章の入口。1〜2行の日本語。ここだけ日本語を許す */
    intro: string;
    /** 物語の時点。Sota の年齢 */
    when: string;
    lines: StoryLine[];
}

/** 章の英語の総語数。被覆率と一緒に見るための数字 */
export function chapterWordCount(ch: Chapter): number {
    return ch.lines.reduce((n, l) => n + l.text.trim().split(/\s+/).filter(Boolean).length, 0);
}

/** 章の英語を1本のテキストにする。検査機が食うのはこれ */
export function chapterText(ch: Chapter): string {
    return ch.lines.map(l => l.text).join('\n');
}
