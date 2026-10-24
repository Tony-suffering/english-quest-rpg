/**
 * 教材(デッキ)の台帳
 *
 * 「今日の練習」が読む教材はここに登録する。
 * 教材の中身は既存のデータファイルをそのまま使い、必要になった時にだけ読み込む
 * (英会話マスター365 は 6.9MB あるので、最初から全部は積まない)。
 *
 * key は教材ごとに安定した id。配列の並び順ではなく中身の文字列から作るので、
 * 教材に表現が追加されても既存の記録とずれない。
 */

export type DeckId = 'course' | 'm365' | 'nihongo' | 'goroku' | 'mine';

export interface DeckItem {
    key: string;
    deck: DeckId;
    ja: string;
    en: string;
    note?: string;
    /** 別の言い方。ラベルつき */
    alt?: { label: string; en: string }[];
    /** 教材内での位置(表示用)。百日課程なら「n日目」 */
    position?: string;
}

export interface DeckDef {
    id: DeckId;
    name: string;
    tagline: string;
    desc: string;
    /** 目安の対象 */
    level: string;
    count: number;
    recommended?: boolean;
    /** 教材そのもののページ(進捗はそのページのまま) */
    detailHref?: string;
    detailLabel?: string;
    /** 利用者が自分で登録した表現など、中身が端末ごとに違う教材 */
    dynamic?: boolean;
}

export const DECKS: DeckDef[] = [
    {
        id: 'course',
        name: '百日課程',
        tagline: '会話で本当によく出る1,000表現',
        desc: '3億語の話し言葉を数えて、出会う回数が多い順に並べた1,000個。you know、come on のような短いかたまりから始まります。',
        level: '入門から。1日10個で100日',
        count: 1000,
        recommended: true,
        detailHref: '/english/course',
        detailLabel: '百日課程の海図を見る',
    },
    {
        id: 'm365',
        name: '英会話マスター365',
        tagline: '居酒屋の6人と毎日10表現',
        desc: '1つの日本語に4通りの英語。短く言う、気持ちをのせる、場面で言う、長く話す。物語に沿って365日分。',
        level: '日常・旅行の会話。初級から中級',
        count: 3650,
        detailHref: '/english/izakaya-toeic/kaiwa',
        detailLabel: '英会話マスター365 を開く',
    },
    {
        id: 'nihongo',
        name: '日本語から学ぶ',
        tagline: '図星・逆ギレ・空気読め を英語で',
        desc: '日本語の慣用句を、辞書の説明ではなく英語の慣用句で言い換える。会話で実際に使う文の形で出します。',
        level: '中級から。慣用句が中心',
        count: 1242,
        detailHref: '/english/nihongo',
        detailLabel: '日本語から学ぶ を開く',
    },
    {
        id: 'goroku',
        name: 'ひとこと英語帳',
        tagline: '独り言レベルの日本語を英語に',
        desc: '「暑いな」「ご飯食べた」「怒られた」。短い独り言を、英語の骨格のちがいごと覚える。解説つき。',
        level: '初級から中級。短い一言',
        count: 625,
        detailHref: '/english/goroku',
        detailLabel: 'ひとこと英語帳 を開く',
    },
    {
        id: 'mine',
        name: '自分で登録した表現',
        tagline: 'ほかの教材で「登録」した表現',
        desc: '英会話マスター365 や 居酒屋TOEIC などで登録ボタンを押した表現。登録がある人にだけ表示されます。',
        level: '自分で選んだ表現',
        count: 0,
        dynamic: true,
        detailHref: '/english/my-training',
        detailLabel: 'Daily Training を開く',
    },
];

export function getDeck(id: string): DeckDef | undefined {
    return DECKS.find(d => d.id === id);
}

export function deckOfKey(key: string): DeckId | null {
    const p = key.split(':')[0];
    switch (p) {
        case 'c1000': return 'course';
        case 'm365': return 'm365';
        case 'nihongo': return 'nihongo';
        case 'goroku': return 'goroku';
        case 'mine': return 'mine';
        default: return null;
    }
}

// ───────────────────────── 読み込み ─────────────────────────

const cache = new Map<DeckId, Promise<DeckItem[]>>();

/** 同じ key が二度出たら番号を足す(保存キーがぶつからないように) */
function uniq(items: DeckItem[]): DeckItem[] {
    const seen = new Map<string, number>();
    return items.map(it => {
        const n = seen.get(it.key) ?? 0;
        seen.set(it.key, n + 1);
        return n === 0 ? it : { ...it, key: `${it.key}#${n + 1}` };
    });
}

type CourseJson = { days: number; perDay: number; cards: { en: string; ja: string; note: string; kind: number; tier: number; hits: number }[] };

async function loadCourse(): Promise<DeckItem[]> {
    const res = await fetch('/data/course-1000.json');
    if (!res.ok) throw new Error(`course-1000.json ${res.status}`);
    const json = (await res.json()) as CourseJson;
    const perDay = json.perDay || 10;
    return uniq(json.cards.map((c, i) => ({
        key: `c1000:${c.en}`,
        deck: 'course' as const,
        ja: c.ja,
        en: c.en,
        note: c.note,
        position: `${Math.floor(i / perDay) + 1}日目`,
    })));
}

async function loadM365(): Promise<DeckItem[]> {
    const mod = await import('@/data/english/365/master-expressions');
    return uniq(mod.MASTER_EXPRESSIONS.map(e => ({
        key: `m365:${e.daySlot}:${e.japanese}`,
        deck: 'm365' as const,
        ja: e.japanese,
        en: e.english[0],
        note: e.context,
        alt: [
            { label: '気持ちをのせて', en: e.english[1] },
            { label: '場面で', en: e.english[2] },
        ].filter(a => a.en && a.en !== e.english[0]),
        position: `Day ${e.daySlot}`,
    })));
}

async function loadNihongo(): Promise<DeckItem[]> {
    const mod = await import('@/data/english/nihongo-seed');
    return uniq(mod.NIHONGO_SEEDS.map(e => ({
        key: `nihongo:${e.japanese}`,
        deck: 'nihongo' as const,
        ja: e.japanese,
        en: e.english,
        note: e.context ?? (e.literal ? `直訳: ${e.literal}` : undefined),
        position: `Day ${e.daySlot}`,
    })));
}

async function loadGoroku(): Promise<DeckItem[]> {
    const mod = await import('@/data/english/goroku-seed');
    return uniq(mod.GOROKU_SEEDS.map(e => ({
        key: `goroku:${e.daySlot}:${e.japanese}`,
        deck: 'goroku' as const,
        ja: e.japanese,
        en: e.english[1] || e.english[0],
        note: e.context,
        alt: [
            { label: '短く', en: e.english[0] },
            { label: '文で', en: e.english[2] },
        ].filter(a => a.en && a.en !== (e.english[1] || e.english[0])),
        position: `Day ${e.daySlot}`,
    })));
}

type StoredPhrase = { id?: string; english?: string; japanese?: string; category?: string; situation?: string; context?: string };

/** 他のアプリが端末に登録した表現。読むだけで、書き換えない */
export function readMyPhrases(): DeckItem[] {
    if (typeof window === 'undefined') return [];
    const out = new Map<string, DeckItem>();
    for (const k of ['my-training-phrases', 'rpg_custom_phrases']) {
        try {
            const raw = window.localStorage.getItem(k);
            if (!raw) continue;
            const arr = JSON.parse(raw);
            if (!Array.isArray(arr)) continue;
            for (const p of arr as StoredPhrase[]) {
                if (!p || typeof p.english !== 'string' || typeof p.japanese !== 'string' || !p.id) continue;
                const key = `mine:${p.id}`;
                if (out.has(key)) continue;
                out.set(key, {
                    key, deck: 'mine', ja: p.japanese, en: p.english,
                    note: p.context || p.situation || undefined,
                });
            }
        } catch { /* 読めないキーは飛ばす */ }
    }
    return [...out.values()];
}

export function loadDeck(id: DeckId): Promise<DeckItem[]> {
    if (id === 'mine') return Promise.resolve(readMyPhrases());
    let p = cache.get(id);
    if (!p) {
        p = (id === 'course' ? loadCourse() : id === 'm365' ? loadM365() : id === 'nihongo' ? loadNihongo() : loadGoroku())
            .catch(err => { cache.delete(id); throw err; });
        cache.set(id, p);
    }
    return p;
}

/** 複数教材の key をまとめて解決する。見つからない key は落とす */
export async function resolveItems(keys: string[]): Promise<Map<string, DeckItem>> {
    const byDeck = new Map<DeckId, string[]>();
    for (const k of keys) {
        const d = deckOfKey(k);
        if (!d) continue;
        if (!byDeck.has(d)) byDeck.set(d, []);
        byDeck.get(d)!.push(k);
    }
    const out = new Map<string, DeckItem>();
    await Promise.all([...byDeck.keys()].map(async d => {
        try {
            const items = await loadDeck(d);
            const idx = new Map(items.map(it => [it.key, it]));
            for (const k of byDeck.get(d)!) {
                const it = idx.get(k);
                if (it) out.set(k, it);
            }
        } catch { /* その教材が読めなければ、その分の復習は今回出さない */ }
    }));
    return out;
}

// ───────────────────────── 百日課程の動画クリップ(任意) ─────────────────────────

type Clip = { v: string; t: number; s: string };
let clipsPromise: Promise<Record<string, Clip[]>> | null = null;

export function loadCourseClips(): Promise<Record<string, Clip[]>> {
    if (!clipsPromise) {
        clipsPromise = fetch('/data/course-clips.json')
            .then(r => (r.ok ? r.json() : {}))
            .catch(() => ({}));
    }
    return clipsPromise;
}

export function youtubeUrl(clip: Clip): string {
    return `https://www.youtube.com/watch?v=${clip.v}&t=${Math.max(0, Math.floor(clip.t))}s`;
}
