import { NextResponse } from 'next/server';

/**
 * note.com の公開APIを中継して「書き手の成績」を返す。
 * ブラウザから直接叩くと CORS で落ちるのでサーバ側で取る。
 *
 * stage=list     … フォロー中 + 相互かどうか (6時間キャッシュ)
 * stage=stats    … フォロー中 全員の成績 (6時間キャッシュ。初回は時間がかかる)
 * stage=latest   … 指定した書き手の成績だけ (今日の5人用)
 * stage=search   … note 全体からキーワードで探して、成績まで付けて返す
 *
 * 取るのは全部公開情報。ログインは要らない。
 * ただし CDN が素っ気ない User-Agent を 403 で弾くので、実ブラウザの UA を送る
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const HEADERS = {
    accept: 'application/json',
    referer: 'https://note.com/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
};
const TTL = 6 * 60 * 60 * 1000;

interface Creator {
    name: string;
    urlname: string;
    profile: string;
    followers: number;
    following: number;
    mutual: boolean;
}

/** 書き手の成績。MLB でいう打撃成績にあたる部分 */
interface Stats {
    urlname: string;
    notes: number;        // 公開記事数
    last: string | null;  // 最終投稿
    avgLike: number;      // 直近数本の平均スキ
    avgComment: number;   // 直近数本の平均コメント
    title: string | null; // 最新記事
    url: string | null;
    likes: number;        // 最新記事のスキ
    comments: number;
}

interface NoteUser {
    nickname?: string;
    name?: string;
    urlname: string;
    profile?: string | null;
    followerCount?: number;
    followingCount?: number;
    withdrawal?: boolean;
    hasPublishedNote?: boolean;
}

const listCache = new Map<string, { at: number; data: Creator[] }>();
const statsCache = new Map<string, { at: number; data: Stats[] }>();

async function noteApi<T>(path: string): Promise<T | null> {
    try {
        const res = await fetch(`https://note.com/api/${path}`, { headers: HEADERS, cache: 'no-store' });
        if (!res.ok) return null;
        return (await res.json()) as T;
    } catch {
        return null;
    }
}

type FollowPage = { data?: { follows?: NoteUser[]; followers?: NoteUser[]; isLastPage?: boolean } };

async function collect(user: string, kind: 'followings' | 'followers'): Promise<NoteUser[]> {
    const out: NoteUser[] = [];
    for (let page = 1; page <= 60; page++) {
        const json = await noteApi<FollowPage>(`v2/creators/${encodeURIComponent(user)}/${kind}?page=${page}`);
        const rows = json?.data?.follows || json?.data?.followers || [];
        out.push(...rows);
        if (!rows.length || json?.data?.isLastPage) break;
    }
    return out;
}

async function getList(user: string): Promise<Creator[]> {
    const hit = listCache.get(user);
    if (hit && Date.now() - hit.at < TTL) return hit.data;

    const [following, followers] = await Promise.all([
        collect(user, 'followings'),
        collect(user, 'followers'),
    ]);
    const back = new Set(followers.map(u => u.urlname));
    const data: Creator[] = following
        .filter(u => !u.withdrawal && u.hasPublishedNote !== false)
        .map(u => ({
            name: u.nickname || u.name || u.urlname,
            urlname: u.urlname,
            profile: (u.profile || '').replace(/\s+/g, ' ').slice(0, 200),
            followers: u.followerCount ?? 0,
            following: u.followingCount ?? 0,
            mutual: back.has(u.urlname),
        }));
    listCache.set(user, { at: Date.now(), data });
    return data;
}

type ContentsPage = {
    data?: {
        totalCount?: number;
        contents?: { name?: string; key?: string; publishAt?: string; likeCount?: number; commentCount?: number }[];
    };
};

const EMPTY = (urlname: string): Stats =>
    ({ urlname, notes: 0, last: null, avgLike: 0, avgComment: 0, title: null, url: null, likes: 0, comments: 0 });

async function statsOf(urlname: string): Promise<Stats> {
    const json = await noteApi<ContentsPage>(`v2/creators/${encodeURIComponent(urlname)}/contents?kind=note&page=1`);
    const c = json?.data?.contents || [];
    if (!c.length) return EMPTY(urlname);
    const head = c[0];
    const sample = c.slice(0, 6);
    const avg = (pick: (x: typeof head) => number) =>
        Math.round((sample.reduce((s, x) => s + pick(x), 0) / sample.length) * 10) / 10;
    return {
        urlname,
        notes: json?.data?.totalCount ?? c.length,
        last: head.publishAt ?? null,
        avgLike: avg(x => x.likeCount ?? 0),
        avgComment: avg(x => x.commentCount ?? 0),
        title: head.name ?? null,
        url: head.key ? `https://note.com/${urlname}/n/${head.key}` : `https://note.com/${urlname}`,
        likes: head.likeCount ?? 0,
        comments: head.commentCount ?? 0,
    };
}

async function inBatches<T, R>(items: T[], size: number, fn: (x: T) => Promise<R>): Promise<R[]> {
    const out: R[] = [];
    for (let i = 0; i < items.length; i += size) {
        out.push(...await Promise.all(items.slice(i, i + size).map(fn)));
    }
    return out;
}

type SearchPage = {
    data?: {
        users?: {
            total_count?: number;
            contents?: { urlname: string; nickname?: string; profile?: string | null; follower_count?: number; following_count?: number }[];
        };
    };
};

export async function GET(request: Request) {
    const url = new URL(request.url);
    const user = (url.searchParams.get('user') || 'tonio_english').replace(/[^A-Za-z0-9_-]/g, '');
    const stage = url.searchParams.get('stage') || 'list';

    try {
        if (stage === 'list') {
            return NextResponse.json({ success: true, creators: await getList(user) });
        }

        if (stage === 'stats') {
            const hit = statsCache.get(user);
            if (hit && Date.now() - hit.at < TTL) {
                return NextResponse.json({ success: true, stats: hit.data, cached: true });
            }
            const creators = await getList(user);
            const stats = await inBatches(creators.map(c => c.urlname), 8, statsOf);
            statsCache.set(user, { at: Date.now(), data: stats });
            return NextResponse.json({ success: true, stats, cached: false });
        }

        if (stage === 'latest') {
            const names = (url.searchParams.get('users') || '')
                .split(',').map(s => s.trim().replace(/[^A-Za-z0-9_-]/g, '')).filter(Boolean).slice(0, 16);
            if (!names.length) return NextResponse.json({ success: false, error: 'users がない' }, { status: 400 });
            return NextResponse.json({ success: true, stats: await inBatches(names, 4, statsOf) });
        }

        if (stage === 'search') {
            const q = (url.searchParams.get('q') || '').trim().slice(0, 60);
            if (!q) return NextResponse.json({ success: false, error: 'キーワードがない' }, { status: 400 });
            const start = Math.max(0, Math.min(400, Number(url.searchParams.get('start') || 0)));
            const json = await noteApi<SearchPage>(
                `v3/searches?context=user&q=${encodeURIComponent(q)}&size=20&start=${start}`
            );
            const rows = json?.data?.users?.contents || [];
            const mine = new Map((await getList(user)).map(c => [c.urlname, c] as const));
            const stats = await inBatches(rows.map(r => r.urlname), 6, statsOf);
            const byName = new Map(stats.map(s => [s.urlname, s]));
            const found = rows.map(r => ({
                name: r.nickname || r.urlname,
                urlname: r.urlname,
                profile: (r.profile || '').replace(/\s+/g, ' ').slice(0, 200),
                followers: r.follower_count ?? 0,
                following: r.following_count ?? 0,
                mutual: mine.get(r.urlname)?.mutual ?? false,
                already: mine.has(r.urlname) || r.urlname === user,
            }));
            return NextResponse.json({
                success: true,
                found,
                stats: stats.filter(s => byName.has(s.urlname)),
                total: json?.data?.users?.total_count ?? found.length,
                start,
            });
        }

        return NextResponse.json({ success: false, error: 'stage が違う' }, { status: 400 });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
