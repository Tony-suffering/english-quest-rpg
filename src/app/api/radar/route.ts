import { NextResponse } from 'next/server';
import {
    initRadarTables, upsertRadarPeople, writeRadarHistory, listRadarPeople,
    listRadarMeta, radarHistoryRange, setRadarMeta, addRadarTouch, listRadarTouches,
    initRadarMissionTable, getRadarMission, saveRadarMission, completeRadarMission, listRadarMissions,
} from '@/lib/d1';

/**
 * RADAR -- 書き手レーダーの取り込み口
 *
 * 特定のSNSに縛らない作りにしてある。いまの取り込み器は note だけだが、
 * ADAPTERS に足せば別のプラットフォームを同じ表で扱える。
 *
 * GET  ?action=people                  … 表に出す全部 (人 + こちら側の情報 + 増減)
 * GET  ?action=touches                 … 接触の履歴
 * POST  action=sync-list               … フォロー関係だけ先に取り込む (速い)
 * POST  action=sync-stats&offset&limit … 成績を分割して取り込む (進捗を返す)
 * POST  action=search                  … プラットフォーム全体から探して取り込む
 * POST  action=meta / touch            … 段階・タグ・メモ・接触の記録
 *
 * source は "note:tonio_english" の形。増やせば別アカウント・別ジャンルを並行して持てる
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const HEADERS = {
    accept: 'application/json',
    referer: 'https://note.com/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
};

const DEFAULT_SOURCE = 'note:tonio_english';
const day = () => new Date().toISOString().slice(0, 10);

function parseSource(src: string) {
    const [platform, handle] = src.split(':');
    return { platform: (platform || 'note').replace(/[^a-z0-9]/g, ''), owner: (handle || '').replace(/[^A-Za-z0-9_-]/g, '') };
}

async function noteApi<T>(path: string): Promise<T | null> {
    try {
        const res = await fetch(`https://note.com/api/${path}`, { headers: HEADERS, cache: 'no-store' });
        if (!res.ok) return null;
        return (await res.json()) as T;
    } catch { return null; }
}

async function inBatches<T, R>(items: T[], size: number, fn: (x: T) => Promise<R>): Promise<R[]> {
    const out: R[] = [];
    for (let i = 0; i < items.length; i += size) out.push(...await Promise.all(items.slice(i, i + size).map(fn)));
    return out;
}

/* ---------- プラットフォームごとの取り込み器 ---------- */

interface RawPerson {
    handle: string; name: string; profile: string; followers: number; following: number;
}
interface RawStats {
    handle: string; posts: number; last_post: string | null; avg_like: number; avg_comment: number;
    title: string | null; url: string | null;
}
interface Adapter {
    relations(owner: string): Promise<{ people: RawPerson[]; mutual: Set<string> }>;
    stats(handle: string): Promise<RawStats>;
    search(q: string, start: number): Promise<{ people: RawPerson[]; total: number }>;
}

type NoteUser = {
    nickname?: string; name?: string; urlname: string; profile?: string | null;
    followerCount?: number; followingCount?: number; withdrawal?: boolean; hasPublishedNote?: boolean;
};
type FollowPage = { data?: { follows?: NoteUser[]; followers?: NoteUser[]; isLastPage?: boolean } };
type ContentsPage = { data?: { totalCount?: number; contents?: { name?: string; key?: string; publishAt?: string; likeCount?: number; commentCount?: number }[] } };
type SearchPage = { data?: { users?: { total_count?: number; contents?: { urlname: string; nickname?: string; profile?: string | null; follower_count?: number; following_count?: number }[] } } };

const noteAdapter: Adapter = {
    async relations(owner) {
        const grab = async (kind: 'followings' | 'followers') => {
            const out: NoteUser[] = [];
            for (let page = 1; page <= 80; page++) {
                const json = await noteApi<FollowPage>(`v2/creators/${encodeURIComponent(owner)}/${kind}?page=${page}`);
                const rows = json?.data?.follows || json?.data?.followers || [];
                out.push(...rows);
                if (!rows.length || json?.data?.isLastPage) break;
            }
            return out;
        };
        const [following, followers] = await Promise.all([grab('followings'), grab('followers')]);
        const mutual = new Set(followers.map(u => u.urlname));
        const people = following
            .filter(u => !u.withdrawal && u.hasPublishedNote !== false)
            .map(u => ({
                handle: u.urlname,
                name: u.nickname || u.name || u.urlname,
                profile: (u.profile || '').replace(/\s+/g, ' ').slice(0, 300),
                followers: u.followerCount ?? 0,
                following: u.followingCount ?? 0,
            }));
        return { people, mutual };
    },

    async stats(handle) {
        const json = await noteApi<ContentsPage>(`v2/creators/${encodeURIComponent(handle)}/contents?kind=note&page=1`);
        const c = json?.data?.contents || [];
        if (!c.length) return { handle, posts: 0, last_post: null, avg_like: 0, avg_comment: 0, title: null, url: null };
        const s = c.slice(0, 6);
        const avg = (pick: (x: typeof c[number]) => number) => Math.round((s.reduce((a, x) => a + pick(x), 0) / s.length) * 10) / 10;
        return {
            handle,
            posts: json?.data?.totalCount ?? c.length,
            last_post: c[0].publishAt ?? null,
            avg_like: avg(x => x.likeCount ?? 0),
            avg_comment: avg(x => x.commentCount ?? 0),
            title: c[0].name ?? null,
            url: c[0].key ? `https://note.com/${handle}/n/${c[0].key}` : null,
        };
    },

    async search(q, start) {
        const json = await noteApi<SearchPage>(`v3/searches?context=user&q=${encodeURIComponent(q)}&size=20&start=${start}`);
        const rows = json?.data?.users?.contents || [];
        return {
            total: json?.data?.users?.total_count ?? rows.length,
            people: rows.map(r => ({
                handle: r.urlname,
                name: r.nickname || r.urlname,
                profile: (r.profile || '').replace(/\s+/g, ' ').slice(0, 300),
                followers: r.follower_count ?? 0,
                following: r.following_count ?? 0,
            })),
        };
    },
};

const ADAPTERS: Record<string, Adapter> = { note: noteAdapter };

/* ============================================================
 * 今日の指令
 *
 * 1日1件だけ「絶対にコメントする相手」を決める。
 * 英語の中だけで回していると、狭いところで同じ顔ぶれと擦り合うだけになる。
 * だから外の世界から引く回のほうを多くしてある。
 *
 * 選ぶ基準は2つ。
 *   返ってくるか   … 読者とやりとりが起きている場所か。規模が大きすぎないか
 *   後で効くか     … いま伸びているか。自分の畑の外か
 * ============================================================ */

// 外の世界。ここから引く回のほうが多い
const OUTER_GENRES = [
    '読書', '子育て', '起業', '写真', '詩', '旅', '料理', '映画', '哲学', '音楽',
    '筋トレ', 'プログラミング', '転職', '節約', '猫', '自転車', '建築', '演劇',
    '日本酒', '登山', '介護', '手帳', '喫茶店', '古着', '농', '陶芸', 'ラジオ',
    '自作キーボード', '銭湯', '天体観測', '書道', '盆栽', '将棋', 'キャンプ',
].filter(g => /^[ぁ-んァ-ヶ一-龠ーA-Za-z]+$/.test(g));

// 自分の畑。たまに引く
const INNER_GENRES = ['英語', 'TOEIC', '英検', '英語やり直し', 'オンライン英会話'];

/** 日付から決まる乱数。同じ日に何度開いても同じ指令が出る */
function seeded(seed: string) {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
    return () => {
        h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
        return ((h >>> 0) % 100000) / 100000;
    };
}

interface Candidate extends RawPerson { stats: RawStats }

function scoreCandidate(c: Candidate) {
    const d = c.stats.last_post ? Math.floor((Date.now() - new Date(c.stats.last_post).getTime()) / 86400000) : null;
    if (d === null || d > 21) return { s: -1, why: [] as string[] };
    if (c.followers < 15) return { s: -1, why: [] };

    // 宣伝だけの場所は関係が育たない。会話の起きない配信専用アカウントを弾く
    const AD = /(アフィリエイト|PR案件|広告|副収入|稼ぐ方法|レビュー投稿|モニター募集|集客代行)/;
    if (AD.test(c.profile)) return { s: -1, why: [] };

    const why: string[] = [];
    let s = 0;

    // 返ってくるか。ここが一番重い。コメントが実際に付いている場所は、返事も返ってくる
    if (c.stats.avg_comment >= 3) { s += 55; why.push(`平均コメント ${c.stats.avg_comment}。読者と当たり前に会話している人だ`); }
    else if (c.stats.avg_comment >= 1) { s += 38; why.push(`平均コメント ${c.stats.avg_comment}。会話が起きている場所`); }
    else if (c.stats.avg_comment > 0) { s += 14; why.push(`平均コメント ${c.stats.avg_comment}。たまに会話がある`); }
    else if (c.followers <= 120) { s += 6; why.push('コメントが付いていない。ただ規模が小さいので、一つ入れると必ず気づかれる'); }
    else { s -= 20; why.push('コメントが付いていない。読まれてはいるが会話が起きていない場所'); }

    if (c.followers <= 800) { s += 25; why.push(`フォロワー ${c.followers}人。コメントが埋もれない規模`); }
    else if (c.followers <= 3000) { s += 12; why.push(`フォロワー ${c.followers}人。届く上限あたり`); }
    else { s -= 10; why.push(`フォロワー ${c.followers}人。気づかれない可能性はある`); }

    // 読者が実際に読んでいるか
    const rate = c.followers > 0 ? (c.stats.avg_like / c.followers) * 100 : 0;
    if (rate >= 15) { s += 20; why.push(`反応率 ${rate.toFixed(0)}%。読者が本当に読んでいる`); }

    // 熱が残っているか
    if (d <= 2) { s += 22; why.push(`${d === 0 ? '今日' : `${d}日前`}に投稿。まだ書いた熱が残っている`); }
    else if (d <= 7) { s += 12; why.push(`${d}日前に投稿`); }

    // 続けている人か
    if (c.stats.posts >= 20) { s += 8; why.push(`これまで ${c.stats.posts}本。続けている人だ`); }

    return { s, why };
}

async function buildMission(source: string, dayStr: string, reroll: number) {
    const { platform } = parseSource(source);
    const ad = ADAPTERS[platform];
    const rnd = seeded(`${source}|${dayStr}|${reroll}`);

    // 3回に2回は外の世界から引く
    const outer = rnd() < 0.68;
    const pool = outer ? OUTER_GENRES : INNER_GENRES;
    const genre = pool[Math.floor(rnd() * pool.length)] || pool[0];
    const start = Math.floor(rnd() * 4) * 20;

    const { people } = await ad.search(genre, start);
    const known = new Set((await listRadarPeople(source)).map(p => p.handle));
    const past = new Set((await listRadarMissions(source)).map(m => m.handle));
    const fresh = people.filter(p => !past.has(p.handle));
    if (!fresh.length) return null;

    const stats = await inBatches(fresh.map(p => p.handle), 6, h => ad.stats(h));
    const byHandle = new Map(stats.map(s => [s.handle, s]));
    const scored = fresh
        .map(p => ({ ...p, stats: byHandle.get(p.handle)! }))
        .filter(c => c.stats)
        .map(c => ({ c, ...scoreCandidate(c) }))
        .filter(x => x.s > 0)
        .sort((a, b) => b.s - a.s);

    if (!scored.length) return null;
    const pick = scored[0];
    const head = outer
        ? `${genre}の人。英語の外だ。ここで一人つながると、英語の話が英語の外に出る`
        : `${genre}の人。同じ畑だが、まだ接点がない`;
    const tail = known.has(pick.c.handle) ? 'すでにフォローしている相手。放置していたことになる' : '';

    return {
        day: dayStr, source, handle: pick.c.handle, name: pick.c.name, genre,
        reason: [head, ...pick.why, tail].filter(Boolean).join(' / '),
        article_title: pick.c.stats.title, article_url: pick.c.stats.url,
        followers: pick.c.followers, avg_comment: pick.c.stats.avg_comment,
        rerolls: reroll,
    };
}

/* ---------- 関係の一覧はキャッシュしておく。分割取り込みのたびに取り直さないため ---------- */
const relCache = new Map<string, { at: number; people: RawPerson[]; mutual: Set<string> }>();
const REL_TTL = 30 * 60 * 1000;

async function relations(source: string) {
    const hit = relCache.get(source);
    if (hit && Date.now() - hit.at < REL_TTL) return hit;
    const { platform, owner } = parseSource(source);
    const ad = ADAPTERS[platform];
    if (!ad) throw new Error(`知らないプラットフォーム: ${platform}`);
    const r = await ad.relations(owner);
    const entry = { at: Date.now(), ...r };
    relCache.set(source, entry);
    return entry;
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const source = url.searchParams.get('source') || DEFAULT_SOURCE;
    const action = url.searchParams.get('action') || 'people';

    try {
        await initRadarTables();

        if (action === 'touches') {
            return NextResponse.json({ success: true, touches: await listRadarTouches() });
        }

        if (action === 'missions') {
            await initRadarMissionTable();
            return NextResponse.json({ success: true, missions: await listRadarMissions(source) });
        }

        // 人 + こちら側の情報 + 増減 をまとめて返す。表はこれ1本で描ける
        const [people, meta, hist] = await Promise.all([
            listRadarPeople(source),
            listRadarMeta(),
            radarHistoryRange(new Date(Date.now() - 40 * 86400000).toISOString().slice(0, 10)),
        ]);
        const metaBy = new Map(meta.map(m => [m.handle, m]));
        const past = new Map<string, { day: string; followers: number; posts: number }[]>();
        hist.forEach(h => {
            const arr = past.get(h.handle) || [];
            arr.push(h);
            past.set(h.handle, arr);
        });
        const cut7 = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);

        const rows = people.map(p => {
            const h = past.get(p.handle) || [];
            // 7日より前でいちばん新しい記録。無ければいちばん古い記録を基準にする
            const before = [...h].reverse().find(x => x.day <= cut7) || h[0];
            return {
                ...p,
                meta: metaBy.get(p.handle) || null,
                d_followers: before ? p.followers - before.followers : null,
                d_posts: before ? p.posts - before.posts : null,
                d_days: before ? Math.max(1, Math.round((Date.now() - new Date(before.day).getTime()) / 86400000)) : null,
                points: h.length,
            };
        });
        return NextResponse.json({ success: true, source, people: rows, synced: rows.length });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}));
        const url = new URL(request.url);
        const action = String(body.action || url.searchParams.get('action') || '');
        const source = String(body.source || url.searchParams.get('source') || DEFAULT_SOURCE);
        const { platform } = parseSource(source);
        await initRadarTables();

        if (action === 'sync-list') {
            const { people, mutual } = await relations(source);
            await upsertRadarPeople(people.map(p => ({
                source, platform, handle: p.handle, name: p.name, profile: p.profile,
                followers: p.followers, following: p.following, mutual: mutual.has(p.handle) ? 1 : 0,
            })));
            return NextResponse.json({ success: true, total: people.length });
        }

        if (action === 'sync-stats') {
            const offset = Math.max(0, Number(body.offset ?? 0));
            const limit = Math.min(60, Math.max(1, Number(body.limit ?? 40)));
            const { people, mutual } = await relations(source);
            const slice = people.slice(offset, offset + limit);
            const ad = ADAPTERS[platform];
            const stats = await inBatches(slice.map(s => s.handle), 8, h => ad.stats(h));
            const byHandle = new Map(stats.map(s => [s.handle, s]));

            await upsertRadarPeople(slice.map(p => {
                const s = byHandle.get(p.handle);
                return {
                    source, platform, handle: p.handle, name: p.name, profile: p.profile,
                    followers: p.followers, following: p.following, mutual: mutual.has(p.handle) ? 1 : 0,
                    posts: s?.posts ?? 0, last_post: s?.last_post ?? null,
                    avg_like: s?.avg_like ?? 0, avg_comment: s?.avg_comment ?? 0,
                };
            }));
            await writeRadarHistory(
                slice.map(p => {
                    const s = byHandle.get(p.handle);
                    return { handle: p.handle, followers: p.followers, posts: s?.posts ?? 0, avg_like: s?.avg_like ?? 0 };
                }),
                day()
            );
            return NextResponse.json({ success: true, done: Math.min(offset + limit, people.length), total: people.length });
        }

        if (action === 'search') {
            const q = String(body.q || '').trim().slice(0, 60);
            if (!q) return NextResponse.json({ success: false, error: 'キーワードがない' }, { status: 400 });
            const start = Math.max(0, Math.min(400, Number(body.start ?? 0)));
            const ad = ADAPTERS[platform];
            const { people, total } = await ad.search(q, start);
            const { mutual } = await relations(source).catch(() => ({ mutual: new Set<string>() }));
            const known = new Set((await listRadarPeople(source)).map(p => p.handle));
            const stats = await inBatches(people.map(p => p.handle), 6, h => ad.stats(h));
            const byHandle = new Map(stats.map(s => [s.handle, s]));

            // 検索で拾った人は別 source に入れる。フォロー中の一覧と混ざらないように
            const searchSource = `${source}#search`;
            await upsertRadarPeople(people.map(p => {
                const s = byHandle.get(p.handle);
                return {
                    source: searchSource, platform, handle: p.handle, name: p.name, profile: p.profile,
                    followers: p.followers, following: p.following, mutual: mutual.has(p.handle) ? 1 : 0,
                    posts: s?.posts ?? 0, last_post: s?.last_post ?? null,
                    avg_like: s?.avg_like ?? 0, avg_comment: s?.avg_comment ?? 0,
                };
            }));
            const found = people.map(p => {
                const s = byHandle.get(p.handle);
                return {
                    source: searchSource, platform, handle: p.handle, name: p.name, profile: p.profile,
                    followers: p.followers, following: p.following,
                    posts: s?.posts ?? 0, last_post: s?.last_post ?? null,
                    avg_like: s?.avg_like ?? 0, avg_comment: s?.avg_comment ?? 0,
                    mutual: mutual.has(p.handle) ? 1 : 0,
                    known: known.has(p.handle),
                };
            });
            return NextResponse.json({ success: true, found, total, start, q });
        }

        if (action === 'mission') {
            await initRadarMissionTable();
            const dayStr = day();
            const reroll = Number(body.reroll ?? 0);
            const existing = await getRadarMission(dayStr, source);
            if (existing && !body.reroll) return NextResponse.json({ success: true, mission: existing });
            if (existing?.status === 'done') return NextResponse.json({ success: true, mission: existing });

            // 条件に合う人が見つかるまで、引き直しの種を変えて数回試す
            let built = null;
            for (let i = 0; i < 4 && !built; i++) {
                built = await buildMission(source, dayStr, (existing?.rerolls ?? 0) + reroll + i);
            }
            if (!built) return NextResponse.json({ success: false, error: '条件に合う相手が見つからなかった。もう一度引いてくれ' }, { status: 404 });
            await saveRadarMission(built);
            return NextResponse.json({ success: true, mission: await getRadarMission(dayStr, source) });
        }

        if (action === 'mission-done') {
            await initRadarMissionTable();
            const dayStr = String(body.day || day());
            await completeRadarMission(dayStr, source);
            const m = await getRadarMission(dayStr, source);
            if (m) await addRadarTouch(m.handle, 'mission', `指令: ${m.genre}`);
            return NextResponse.json({ success: true, mission: m });
        }

        if (action === 'meta') {
            const handle = String(body.handle || '').replace(/[^A-Za-z0-9_-]/g, '');
            if (!handle) return NextResponse.json({ success: false, error: 'handle がない' }, { status: 400 });
            await setRadarMeta(handle, {
                stage: body.stage !== undefined ? String(body.stage) : undefined,
                tags: body.tags !== undefined ? String(body.tags) : undefined,
                memo: body.memo !== undefined ? String(body.memo).slice(0, 2000) : undefined,
                next_at: body.next_at !== undefined ? (body.next_at ? String(body.next_at) : null) : undefined,
            });
            return NextResponse.json({ success: true });
        }

        if (action === 'touch') {
            const handle = String(body.handle || '').replace(/[^A-Za-z0-9_-]/g, '');
            if (!handle) return NextResponse.json({ success: false, error: 'handle がない' }, { status: 400 });
            await addRadarTouch(handle, String(body.kind || 'comment'), String(body.memo || '').slice(0, 500));
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, error: `知らない action: ${action}` }, { status: 400 });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
