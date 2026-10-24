/**
 * とにお 日本語だけで笑える層 — 既存データからの抽出のみ(追加、変更なし)。
 *
 * 本体は日本語のコメディで、英語はおまけ。だが今の見せ方は英文が先に来るので、
 * 英語力ゼロの人が入口で弾かれる。そこで、既存の64夜から
 * 「英語を1文字も使わずに笑える部分」だけを抜き出して並べ直す。
 *
 * dmm-show / tonio-league のデータは一切書き換えていない。読み替えるだけ。
 * 素材:
 *   - headline(リーグの見出し) … 全64本が日本語
 *   - catchcopy(番組表の一行)  … 日本語
 *   - gags[].tsukkomi           … 185本中52本が英語ゼロ
 *   - gags[].scene              … 日本語の場面説明
 */

import { showEpisodes } from './dmm-show';
import { getLeagueNights } from './tonio-league';

export interface WaraiItem {
    night: number;
    date: string;
    /** 見出し(日本語だけ) */
    headline: string;
    /** 一行の煽り。英語を含む場合は空にする(英語ゼロを保証するため) */
    catchcopy: string;
    /** その夜のいちばん濃い日本語ツッコミ。英語を含むものは採らない。 */
    punch: string | null;
    /** ツッコミが指している場面(日本語) */
    scene: string | null;
    /** 見出し以外に日本語だけの本文があるか(パネルの厚みの判断用) */
    hasBody: boolean;
    /**
     * 表示する全文が英語ゼロか。見出しに固有名詞(ChatGPT等)や引用(Oh boy)が
     * 残る夜があるので、「英単語ゼロ」と名乗ってよいかはこれで判定する。
     */
    englishFree: boolean;
}

/** 英語らしい語(3文字以上の連続アルファベット)を含むか。含むものは英語ゼロ層から外す。 */
function hasEnglish(s: string): boolean {
    return /[A-Za-z]{3,}/.test(s);
}

let _cache: WaraiItem[] | null = null;

/** 全夜の「日本語だけで笑える」層。英語ゼロを保証する。 */
export function getWaraiFeed(): WaraiItem[] {
    if (_cache) return _cache;
    const league = new Map(getLeagueNights().map((c) => [c.night, c]));
    const out: WaraiItem[] = [];

    for (const ep of [...showEpisodes].sort((a, b) => b.night - a.night)) {
        const c = league.get(ep.night);
        // 英語ゼロのツッコミだけを候補に。長い=中身が濃いので優先。
        const candidates = (ep.gags ?? [])
            .filter((g) => g.tsukkomi && !hasEnglish(g.tsukkomi))
            .sort((a, b) => b.tsukkomi.length - a.tsukkomi.length);
        const best = candidates[0] ?? null;

        const headline = c?.headline && !hasEnglish(c.headline) ? c.headline : ep.title;
        // ツッコミが全部英文引用入りだった夜は、場面説明(日本語)で代替する。
        const fallbackScene = best ? null
            : (ep.gags ?? []).map((g) => g.scene).find((s) => s && !hasEnglish(s) && s.length >= 8) ?? null;
        const catchcopy = ep.catchcopy && !hasEnglish(ep.catchcopy) ? ep.catchcopy : '';
        const punch = best ? best.tsukkomi : null;

        const finalHeadline = hasEnglish(headline) ? ep.title : headline;
        const finalScene = best && best.scene && !hasEnglish(best.scene) ? best.scene : fallbackScene;
        const shown = [finalHeadline, catchcopy, finalScene ?? '', punch ?? ''];

        out.push({
            night: ep.night,
            date: ep.date,
            headline: finalHeadline,
            catchcopy,
            punch,
            scene: finalScene,
            hasBody: Boolean(punch || catchcopy || fallbackScene),
            englishFree: !shown.some((s) => s && hasEnglish(s)),
        });
    }
    _cache = out;
    return out;
}

/** ツッコミまで英語ゼロで揃った夜(=初心者にそのまま出せる回)。 */
export function getFullyJapaneseNights(): WaraiItem[] {
    return getWaraiFeed().filter((w) => w.punch !== null);
}

export function getWaraiStats() {
    const feed = getWaraiFeed();
    const withPunch = feed.filter((w) => w.punch !== null).length;
    const englishFree = feed.filter((w) => w.englishFree).length;
    return {
        nights: feed.length,
        withPunch,
        englishFree,
        ratio: feed.length ? Math.round((withPunch / feed.length) * 100) : 0,
    };
}

export const WARAI_META = {
    title: '英語ゼロで読む',
    hook: '本体は日本語のコメディ。英語はおまけ。',
    pitch:
        'ここには英単語が1つも出てこない。それでも、この番組で何が起きているかは全部わかる。' +
        '毎晩どこかの外国人と喋って事故っている男の、事故だけを日本語で並べた。' +
        '英語に興味が無くても読める。むしろ、そっちが本体だ。',
    note: '気になった夜をタップすると、そこで実際に何と言ったのか(英語)まで見にいける。おまけは、欲しい人だけ。',
};
