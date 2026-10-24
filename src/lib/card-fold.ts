// トレーニングカードの「ほぼ同じ文」を1枚に畳む。登録スクリプトとレッスンページで同じ判定を使う。
//
// サーバの重複判定(addPhrase)は「同じ日付・英文が完全一致」だけ。
// 検死の fix は数文まとめて直した長い文になり、kenshi の drill はその中の1文を言い回しを変えて抜く。
// 文字列としては別物なので、そのまま登録すると同じ中身のカードが2〜3枚できる
// (第144夜: 158枚登録して、本人が73枚を消した)。
//
// node から直接読むので、型注釈以外の TS 構文(enum / namespace 等)は使わない。

// weak: 録音に無い文(外部AI分析・お題など)。畳むときに、録音の文を表から押しのけない
export interface CardInput { english: string; japanese: string; weak?: boolean }

/** 内容語の集合。冠詞や短い語は落として、実質の中身だけを見る */
// 代名詞・助動詞は中身ではない。数えると You don't need medicine と You don't need drugs が
// 「同じ文」になり、運動の話とメンタルコーチの話が1枚に畳まれた
const STOP = new Set(['you', 'your', 'they', 'them', 'their', 'she', 'her', 'his', 'him', 'are', 'was', 'were', 'the', 'and', 'but', 'for', 'with', 'that', 'this', 'not', 'don', "don't", 'can', "can't", 'have', 'has', 'its', "it's", 'just', 'like', 'yeah', 'very', 'really', 'all', 'our', 'out', 'there', "there's", 'what', 'who', 'would', 'could', 'should', 'will', 'from', 'about', 'some', 'too', 'also', 'then', 'than', 'because', "i'm", "you're", "they're", "that's"]);

function contentWords(s: string): Set<string> {
    return new Set(s.toLowerCase().replace(/[^a-z0-9' ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)));
}

/** 2文の重なり具合 (0〜1)。共通語 / 全体語 */
export function overlap(a: string, b: string): number {
    const A = contentWords(a);
    const B = contentWords(b);
    if (!A.size || !B.size) return 0;
    let both = 0;
    A.forEach((w) => { if (B.has(w)) both++; });
    return both / (A.size + B.size - both);
}

export function normEnglish(s: string): string {
    return s.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function sentences(s: string): string[] {
    return s.split(/(?<=[.!?])\s+/).map(normEnglish).filter((x) => x.split(' ').length >= 3);
}

/** 中身がほぼ同じ(全体で0.6以上) */
const SAME_LIMIT = 0.6;
/** 1文どうしが同じ(言い回し違い: I don't agree about lawyers / I don't agree with including lawyers) */
const SENTENCE_LIMIT = 0.5;

/** 片方の文のうち、もう片方に同じ文(言い回し違い含む)がある割合 */
function coverage(from: string[], to: string[]): number {
    if (!from.length) return 0;
    return from.filter((s) => to.some((t) => t === s || overlap(s, t) >= SENTENCE_LIMIT)).length / from.length;
}

/**
 * a と b は同じカードか。**両側から見て半分を超えて同じ**か、短い方が丸ごと2文までの長い方に入るときだけ同じとみなす。
 *
 * 片側だけで見ると、短い一言が長い段落を飲み込む(第144夜の試算で
 * 「Consultants, for example.」が別の中身の段落を、「You can't go wrong.」が
 * ヴィム・ホフの段落を抱えた)。段落の中の1文と同じ短いカードがあっても、
 * 段落の残りが別の中身なら、段落は段落で1枚に残す。
 * 4語未満の短い一言は、句読点違いの完全一致でしか畳まない。
 */
export function sameCard(a: string, b: string): boolean {
    const na = normEnglish(a);
    const nb = normEnglish(b);
    if (!na || !nb) return false;
    if (na === nb) return true;
    if (Math.min(na.split(' ').length, nb.split(' ').length) < 4) return false;
    const sa = sentences(a);
    const sb = sentences(b);
    const A = sa.length ? sa : [na];
    const B = sb.length ? sb : [nb];
    if (A.length <= 2 && B.length <= 2 && overlap(a, b) >= SAME_LIMIT) return true;
    const [S, L] = A.length <= B.length ? [A, B] : [B, A];
    // 短い方が丸ごと長い方に入っていて、長い方も2文まで(drill と、それを含む短い直し)
    if (coverage(S, L) === 1 && L.length <= 2) return true;
    // それ以外は、両側とも半分を超えて同じときだけ
    return coverage(S, L) > 0.5 && coverage(L, S) > 0.5;
}

/** english が、既に入っている英文のどれかと同じカードか(ページの「登録済」表示用) */
export function isCovered(english: string, existing: string[]): boolean {
    return existing.some((e) => sameCard(english, e));
}

/**
 * 同じカードを1枚に畳む。表には短い方を残す(1枚=覚えられる長さ)。
 * 長い方は捨てずに、裏に「全文:」で付ける。言い回し違いは「別の言い方:」。
 */
export function foldCards(cards: CardInput[]): { cards: CardInput[]; folded: number } {
    type Kept = { english: string; japanese: string; full: string[]; alts: string[]; weak: boolean };
    const kept: Kept[] = [];
    let folded = 0;
    // other を hit に畳む。表は短い方。長い方は全文、同じくらいの長さなら別の言い方として裏へ
    const absorb = (hit: Kept, other: Kept) => {
        if (normEnglish(hit.english) !== normEnglish(other.english)) {
            // 表は短い方。ただし録音に無い文(weak)は、録音の文を表から押しのけない
            const otherWins = other.weak === hit.weak ? other.english.length < hit.english.length : hit.weak;
            const [short, long] = otherWins ? [other, hit] : [hit, other];
            const longText = long.english;
            if (short === other) { hit.english = other.english; hit.weak = other.weak; if (other.japanese) hit.japanese = other.japanese; }
            if (normEnglish(longText).includes(normEnglish(short.english)) || longText.length > short.english.length * 1.5) hit.full.push(longText);
            else hit.alts.push(longText);
        }
        hit.full.push(...other.full);
        hit.alts.push(...other.alts);
    };
    for (const c of cards) {
        const english = (c.english || '').trim();
        if (english.length < 4) continue;
        const card: Kept = { english, japanese: (c.japanese || '').trim(), full: [], alts: [], weak: !!c.weak };
        // 畳む先は1枚だけ。複数につなぐと、1枚を橋にして別の中身どうしが連鎖でまとまる
        const hit = kept.find((k) => sameCard(k.english, english));
        if (!hit) { kept.push(card); continue; }
        folded++;
        absorb(hit, card);
    }
    return {
        folded,
        cards: kept.map((k) => ({
            english: k.english,
            japanese: [
                k.japanese,
                k.alts.length ? `別の言い方: ${k.alts.join(' / ')}` : '',
                k.full.length ? `全文: ${k.full.join(' / ')}` : '',
            ].filter(Boolean).join('\n\n'),
        })),
    };
}
