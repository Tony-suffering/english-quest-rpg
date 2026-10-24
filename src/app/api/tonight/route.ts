import { NextResponse } from 'next/server';
import {
    initTonightTable,
    getAllTonightDocs,
    upsertTonightDoc,
    replaceTonightEpisodes,
} from '@/lib/d1';
import { SHOW_META, showEpisodes, type ShowEpisode } from '@/data/english/dmm-show';

// 「今夜も、通じない。」番組データをブラウザから編集/永続化する API。
// 保存先は D1 の tonight_docs (key='meta' + key='night:<n>')。
// DB が空(初回)の場合は静的 seed (dmm-show.ts) を返す。

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ShowMeta = typeof SHOW_META;

// GET /api/tonight            -- meta + 全話(DB優先, 無ければ seed)
// GET /api/tonight?init=true  -- テーブル作成
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        if (url.searchParams.get('init') === 'true') {
            await initTonightTable();
            return NextResponse.json({ success: true, message: 'Table ready' });
        }

        const docs = await getAllTonightDocs();
        const metaDoc = docs.find((d) => d.key === 'meta');
        const overridesDoc = docs.find((d) => d.key === 'overrides');
        const nightDocs = docs.filter((d) => d.key.startsWith('night:'));

        let episodes: ShowEpisode[];
        if (nightDocs.length > 0) {
            // DB にある回だけで構成(削除も反映される完全な状態)
            episodes = nightDocs
                .map((d) => JSON.parse(d.data) as ShowEpisode)
                .sort((a, b) => a.night - b.night);
        } else {
            episodes = showEpisodes;
        }

        const meta: ShowMeta = metaDoc ? (JSON.parse(metaDoc.data) as ShowMeta) : SHOW_META;
        // 紙面の「地の文」上書き。別データ由来(相場/オッズ/あらまし等)の文字も
        // ここに載せることで全文編集できる。key -> テキストの平坦なマップ。
        const overrides: Record<string, string> = overridesDoc ? (JSON.parse(overridesDoc.data) as Record<string, string>) : {};
        return NextResponse.json({ success: true, meta, episodes, overrides });
    } catch (err) {
        // D1 不通でも読み取りは seed で成立させる
        return NextResponse.json({ success: true, meta: SHOW_META, episodes: showEpisodes, overrides: {}, warning: String(err) });
    }
}

// POST /api/tonight
// body: { meta?: ShowMeta, episodes?: ShowEpisode[], pass? }
// episodes を渡すと DB を丸ごと置換(削除も反映)。TONIGHT_ADMIN_PASS 未設定なら素通し。
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const meta = body?.meta as ShowMeta | undefined;
        const episodes = body?.episodes as ShowEpisode[] | undefined;
        const overrides = body?.overrides as Record<string, string> | undefined;

        const expected = process.env.TONIGHT_ADMIN_PASS;
        if (expected && body?.pass !== expected) {
            return NextResponse.json({ success: false, error: 'wrong password' }, { status: 401 });
        }

        if (meta) {
            await upsertTonightDoc('meta', meta);
        }

        if (overrides && typeof overrides === 'object') {
            await upsertTonightDoc('overrides', overrides);
        }

        if (Array.isArray(episodes)) {
            for (const ep of episodes) {
                if (typeof ep?.night !== 'number') continue;
                await upsertTonightDoc(`night:${ep.night}`, ep);
            }
            await replaceTonightEpisodes(episodes.map((e) => e.night));
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
    }
}
