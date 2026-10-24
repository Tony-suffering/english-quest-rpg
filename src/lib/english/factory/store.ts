'use client';

/**
 * カード工場 — 保管庫
 *
 * ■ 設計の一点だけ守る掟: **サーバを使わない。**
 *
 * 既存の /english/training は13本のAPIが全部D1に繋がっていて、しかも user_id が無い。
 * つまり単一ユーザー設計で、誰かが買っても「自分のカード」を作れない。
 * 売り物にするなら、この構造から降りるしかない。
 *
 * だからここは全部ブラウザの中で完結する。
 *   - カードは localStorage
 *   - AI は利用者自身の Gemini キーで、ブラウザから直接叩く
 *   - 書き出しは Anki が読めるTSV
 *
 * 結果として、売り手側のランニングコストがゼロになる。買い切りで売れる形はこれしかない。
 * (Anki の iOS 版が買い切りで成立しているのも、同じ理由による)
 */

export interface Card {
    id: string;
    /** 元にした日本語 */
    ja: string;
    /** 覚える英語 */
    en: string;
    /** 補足。AIの解説やニュアンス */
    note: string;
    /** 作った時刻 */
    at: number;
}

const KEY = 'factory:cards';
const KEY_API = 'factory:geminiKey';

export const loadCards = (): Card[] => {
    if (typeof window === 'undefined') return [];
    try { return JSON.parse(window.localStorage.getItem(KEY) || '[]'); } catch { return []; }
};

export const saveCards = (cards: Card[]) => {
    try { window.localStorage.setItem(KEY, JSON.stringify(cards)); } catch { /* noop */ }
};

export const loadKey = (): string => {
    if (typeof window === 'undefined') return '';
    try { return window.localStorage.getItem(KEY_API) || ''; } catch { return ''; }
};

export const saveKey = (k: string) => {
    try { window.localStorage.setItem(KEY_API, k.trim()); } catch { /* noop */ }
};

export const newId = (existing: Card[]): string => {
    // Math.random に頼らない(同一ミリ秒の連番衝突だけ避ければ十分)
    const base = Date.now();
    let n = base;
    const used = new Set(existing.map(c => c.id));
    while (used.has(String(n))) n++;
    return String(n);
};

// ------------------------------------------------------------------
// 外部の実音源へ飛ばす。ここが Anki の共有デッキに対する差になる
// ------------------------------------------------------------------

/**
 * 検索に投げる形に整える。
 *
 * YouGlish も PlayPhrase も「実際にその並びが喋られている動画」を探す仕組みなので、
 * 文末の句読点や引用符が付いたまま投げると当たらなくなる。
 * また長い文はそのままではヒットしないので、頭から6語に切る
 * (この2つのサービスは「短い並び」ほど実例が出る)。
 */
const searchable = (phrase: string): string => {
    const cleaned = phrase
        .replace(/[.,!?;:"“”‘’()\[\]]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    const words = cleaned.split(' ');
    return words.length > 6 ? words.slice(0, 6).join(' ') : cleaned;
};

/** 発音を実際の動画で確認する(YouGlish) */
export const youglishUrl = (phrase: string) =>
    `https://youglish.com/pronounce/${encodeURIComponent(searchable(phrase))}/english`;

/** 実際の映画のシーンで確認する(PlayPhrase.me) */
export const playphraseUrl = (phrase: string) =>
    `https://www.playphrase.me/#/search?q=${encodeURIComponent(searchable(phrase))}`;

// ------------------------------------------------------------------
// Anki へ渡す
// ------------------------------------------------------------------

/**
 * Anki が読めるTSVを作る。
 *
 * .apkg(SQLite)をブラウザで組み立てることもできるが、壊れたファイルを掴ませる事故の
 * ほうが怖い。Anki は「ファイル > 読み込み」でTSVを標準で受けるので、確実なほうを採る。
 * 3列: 表 / 裏 / タグ。裏に解説とリンクを畳んで入れる。
 */
export const toAnkiTsv = (cards: Card[]): string => {
    const esc = (s: string) => s.replace(/\t/g, ' ').replace(/\r?\n/g, '<br>');
    const rows = cards.map(c => {
        const back = [
            c.ja,
            c.note,
            `<a href="${youglishUrl(c.en)}">発音を動画で見る</a>`,
            `<a href="${playphraseUrl(c.en)}">映画のシーンで見る</a>`,
        ].filter(Boolean).join('<br><br>');
        return [esc(c.en), esc(back), 'factory'].join('\t');
    });
    // Anki の読み込み設定をファイル自身に持たせる(利用者が列指定で迷わないように)
    return ['#separator:tab', '#html:true', '#tags column:3', ...rows].join('\n');
};

export const download = (filename: string, text: string) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
};

// ------------------------------------------------------------------
// AI (利用者自身の鍵で、ブラウザから直接)
// ------------------------------------------------------------------

export interface Suggestion { en: string; note: string; }

const MODEL = 'gemini-2.0-flash';

/**
 * 日本語から、実際に使われる英語を3つ出す。
 *
 * 鍵は利用者のもので、この端末から出ない(こちらのサーバを経由しない)。
 * 無料枠で足りる量なので、買い切りの商品でも継続費用が発生しない。
 */
export const suggest = async (key: string, ja: string, context: string): Promise<Suggestion[]> => {
    const prompt = `日本語を、ネイティブが実際の会話で使う英語にしてください。

日本語: ${ja}
${context ? `場面: ${context}` : ''}

条件:
- 3つ出す。かしこまった言い方は避けて、実際に口から出る形にする
- 教科書的な直訳を避ける。決まり文句や句動詞があるならそれを使う
- note には「なぜその形なのか」「日本人が言いがちな形との違い」を1文で書く

JSONだけを返す。前後に説明を付けない:
[{"en":"...","note":"..."},{"en":"...","note":"..."},{"en":"...","note":"..."}]`;

    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.9, responseMimeType: 'application/json' },
            }),
        },
    );
    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(res.status === 400 ? 'キーが違うか、権限がありません' : `Gemini エラー ${res.status} ${body.slice(0, 120)}`);
    }
    const j = await res.json();
    const text = j?.candidates?.[0]?.content?.parts?.[0]?.text ?? '[]';
    let parsed: unknown;
    try { parsed = JSON.parse(text); } catch { throw new Error('AIの返答を読めませんでした。もう一度お試しください'); }
    if (!Array.isArray(parsed)) throw new Error('AIの返答の形が想定と違いました');
    return (parsed as Suggestion[])
        .filter(s => s && typeof s.en === 'string' && s.en.trim())
        .map(s => ({ en: s.en.trim(), note: String(s.note ?? '').trim() }))
        .slice(0, 3);
};
