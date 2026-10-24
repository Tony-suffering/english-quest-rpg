'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

/* ============================================================
 * RADAR -- 書き手レーダー
 *
 * note の英語界隈を最初の1インスタンスにしているが、中身は特定のSNSにも
 * ジャンルにも縛っていない。source を増やせば別アカウント・別ジャンルを並行して持てる。
 *
 * 今日の5人 … 読んでコメントする順番
 * 成績表   … 数字で並べ替えて掘る。列の出し入れ・保存ビュー・CSV
 * 探す     … プラットフォーム全体から新しい書き手を拾う
 * ============================================================ */

const PAPER = '#FDFCF8';
const INK = '#1A1714';
const SUB = '#6B635A';
const FAINT = '#A9A196';
const RULE = '#E4DFD4';
const RULE2 = '#F1EDE4';
const GOLD = '#C9A227';
const DEEPGOLD = '#8C6D0F';
const GREEN = '#0F8A5F';
const RED = '#A4453A';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';
const NUM = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';

const VIEW_KEY = 'radar_views_v1';
const PREF_KEY = 'radar_pref_v1';

/** 段階。ジャンルに依存しない一般的な流れにしてある */
const STAGES: { id: string; label: string; color: string }[] = [
    { id: 'new', label: '未接触', color: FAINT },
    { id: 'watch', label: '見てる', color: SUB },
    { id: 'read', label: '読んだ', color: '#B08A2E' },
    { id: 'talk', label: 'やりとり中', color: GOLD },
    { id: 'crew', label: '仲間', color: GREEN },
    { id: 'lead', label: '見込み', color: '#1F6FB2' },
    { id: 'customer', label: '顧客', color: '#6B3FA0' },
    { id: 'skip', label: '対象外', color: '#C9C2B6' },
];
const stageOf = (id?: string) => STAGES.find(s => s.id === id) || STAGES[0];

type Meta = { handle: string; stage: string; tags: string; memo: string; next_at: string | null };
type Person = {
    source: string; platform: string; handle: string; name: string; profile: string;
    followers: number; following: number; posts: number; last_post: string | null;
    avg_like: number; avg_comment: number; mutual: number;
    first_seen: string; updated_at: string;
    meta: Meta | null;
    d_followers: number | null; d_posts: number | null; d_days: number | null; points: number;
    known?: boolean;
};
type Touch = { id: string; handle: string; kind: string; at: string; memo: string };
type Mission = {
    day: string; handle: string; name: string; genre: string; reason: string;
    article_title: string | null; article_url: string | null;
    followers: number; avg_comment: number; status: string; rerolls: number; done_at: string | null;
};
type SortKey = 'name' | 'stage' | 'rel' | 'followers' | 'd_followers' | 'following' | 'ff' | 'posts' | 'd_posts' | 'last' | 'avg_like' | 'rate' | 'avg_comment' | 'tags';

const COLS: { key: SortKey; label: string; hint: string; w: number; num?: boolean; desc?: boolean; opt?: boolean }[] = [
    { key: 'name', label: '書き手', hint: '名前。クリックで note が開く', w: 240 },
    { key: 'stage', label: '段階', hint: '未接触 → 見てる → 読んだ → やりとり中 → 仲間 → 見込み → 顧客', w: 104 },
    { key: 'rel', label: '関係', hint: '相互 / 片想い / 未フォロー', w: 60 },
    { key: 'followers', label: 'FLW', hint: 'フォロワー数', w: 62, num: true, desc: true },
    { key: 'd_followers', label: 'ΔFLW', hint: '前回同期からのフォロワー増減。同期を重ねるほど正確になる', w: 62, num: true, desc: true },
    { key: 'following', label: 'FLG', hint: 'その人がフォローしている数', w: 60, num: true, desc: true, opt: true },
    { key: 'ff', label: 'FF比', hint: 'フォロワー ÷ フォロー中。1未満は返礼で数を作っている型', w: 56, num: true, desc: true },
    { key: 'posts', label: '本', hint: '公開記事数', w: 50, num: true, desc: true },
    { key: 'd_posts', label: 'Δ本', hint: '前回同期からの投稿数', w: 52, num: true, desc: true, opt: true },
    { key: 'last', label: '最終', hint: '最終投稿からの経過。書いた直後ほどコメントが届く', w: 56, num: true },
    { key: 'avg_like', label: 'スキ', hint: '直近6本の平均スキ', w: 54, num: true, desc: true },
    { key: 'rate', label: '反応%', hint: '平均スキ ÷ フォロワー。読者が実際に読んでいる割合', w: 58, num: true, desc: true },
    { key: 'avg_comment', label: 'コメ', hint: '直近6本の平均コメント。少ないほど、こちらのコメントが目立つ', w: 50, num: true, desc: true },
    { key: 'tags', label: 'タグ', hint: '自分で付けた分類', w: 130, opt: true },
];

const daysSince = (iso: string | null | undefined) => {
    if (!iso) return null;
    const t = new Date(iso).getTime();
    if (Number.isNaN(t)) return null;
    return Math.max(0, Math.floor((Date.now() - t) / 86400000));
};
const ago = (iso: string | null | undefined) => {
    const d = daysSince(iso);
    if (d === null) return '-';
    if (d === 0) return '今日';
    if (d === 1) return '昨日';
    if (d < 30) return `${d}日`;
    if (d < 365) return `${Math.floor(d / 30)}ヶ月`;
    return `${Math.floor(d / 365)}年`;
};
const nf = (v: number) => v.toLocaleString('ja-JP');
const today = () => new Date().toISOString().slice(0, 10);

export default function RadarPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [people, setPeople] = useState<Person[]>([]);
    const [found, setFound] = useState<Person[]>([]);
    const [touches, setTouches] = useState<Touch[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [tab, setTab] = useState<'mission' | 'queue' | 'table' | 'find'>('mission');

    // 今日の指令
    const [mission, setMission] = useState<Mission | null>(null);
    const [missions, setMissions] = useState<Mission[]>([]);
    const [missionBusy, setMissionBusy] = useState(false);

    // 同期
    const [sync, setSync] = useState<{ on: boolean; done: number; total: number; label: string }>({ on: false, done: 0, total: 0, label: '' });

    // フィルタ
    const [src, setSrc] = useState<'mine' | 'search'>('mine');
    const [fStage, setFStage] = useState('all');
    const [fRel, setFRel] = useState('all');
    const [fAct, setFAct] = useState('all');
    const [fSize, setFSize] = useState('all');
    const [kw, setKw] = useState('');
    const [fTag, setFTag] = useState('all');
    const [sort, setSort] = useState<{ key: SortKey; asc: boolean }>({ key: 'last', asc: true });
    const [hidden, setHidden] = useState<string[]>(['following', 'd_posts']);
    const [views, setViews] = useState<{ name: string; conf: string }[]>([]);

    // 探す
    const [q, setQ] = useState('英語');
    const [findLoading, setFindLoading] = useState(false);
    const [findStart, setFindStart] = useState(0);
    const [findTotal, setFindTotal] = useState(0);

    // 右の引き出し
    const [openHandle, setOpenHandle] = useState<string | null>(null);
    const [draft, setDraft] = useState<{ memo: string; tags: string; next_at: string }>({ memo: '', tags: '', next_at: '' });
    const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const c = () => setIsMobile(window.innerWidth < 900);
        c(); window.addEventListener('resize', c);
        return () => window.removeEventListener('resize', c);
    }, []);

    useEffect(() => {
        try { setViews(JSON.parse(localStorage.getItem(VIEW_KEY) || '[]')); } catch { /* noop */ }
        try {
            const p = JSON.parse(localStorage.getItem(PREF_KEY) || '{}');
            if (Array.isArray(p.hidden)) setHidden(p.hidden);
        } catch { /* noop */ }
    }, []);
    useEffect(() => {
        try { localStorage.setItem(PREF_KEY, JSON.stringify({ hidden })); } catch { /* noop */ }
    }, [hidden]);

    const load = useCallback(async () => {
        try {
            const [a, b] = await Promise.all([
                fetch('/api/radar?action=people').then(r => r.json()),
                fetch('/api/radar?action=touches').then(r => r.json()),
            ]);
            if (a.success) setPeople(a.people); else setError(a.error || '読み込めなかった');
            if (b.success) setTouches(b.touches);
        } catch (e) { setError(String(e)); }
        finally { setLoading(false); }
    }, []);
    useEffect(() => { load(); }, [load]);

    const post = useCallback(async (body: Record<string, unknown>) => {
        const res = await fetch('/api/radar', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        return res.json();
    }, []);

    /* ---------- 今日の指令 ---------- */
    const drawMission = useCallback(async (reroll = 0) => {
        setMissionBusy(true);
        try {
            const r = await post({ action: 'mission', reroll });
            if (r.success) setMission(r.mission);
            else setError(r.error || '指令を引けなかった');
            const list = await fetch('/api/radar?action=missions').then(x => x.json());
            if (list.success) setMissions(list.missions);
        } catch (e) { setError(String(e)); }
        finally { setMissionBusy(false); }
    }, [post]);

    const finishMission = useCallback(async () => {
        if (!mission) return;
        setMissionBusy(true);
        try {
            const r = await post({ action: 'mission-done', day: mission.day });
            if (r.success) setMission(r.mission);
            const list = await fetch('/api/radar?action=missions').then(x => x.json());
            if (list.success) setMissions(list.missions);
        } catch (e) { setError(String(e)); }
        finally { setMissionBusy(false); }
    }, [mission, post]);

    useEffect(() => {
        (async () => {
            try {
                const list = await fetch('/api/radar?action=missions').then(x => x.json());
                if (list.success) {
                    setMissions(list.missions);
                    const t = new Date().toISOString().slice(0, 10);
                    const m = (list.missions as Mission[]).find(x => x.day === t);
                    if (m) setMission(m);
                }
            } catch { /* noop */ }
        })();
    }, []);

    /* ---------- 同期 ---------- */
    const runSync = useCallback(async () => {
        setSync({ on: true, done: 0, total: 0, label: 'フォロー関係を取り込んでいる' });
        try {
            const list = await post({ action: 'sync-list' });
            if (!list.success) throw new Error(list.error);
            const total: number = list.total;
            setSync({ on: true, done: 0, total, label: '成績を取り込んでいる' });
            for (let off = 0; off < total; off += 40) {
                const r = await post({ action: 'sync-stats', offset: off, limit: 40 });
                if (!r.success) throw new Error(r.error);
                setSync({ on: true, done: r.done, total: r.total, label: '成績を取り込んでいる' });
            }
            await load();
            setSync({ on: false, done: total, total, label: '' });
        } catch (e) {
            setError(`同期に失敗した: ${String(e)}`);
            setSync({ on: false, done: 0, total: 0, label: '' });
        }
    }, [post, load]);

    /* ---------- 探す ---------- */
    const search = useCallback(async (start: number) => {
        if (!q.trim()) return;
        setFindLoading(true);
        try {
            const r = await post({ action: 'search', q: q.trim(), start });
            if (!r.success) throw new Error(r.error);
            const rows: Person[] = (r.found as Person[]).map(f => ({
                ...f, meta: null, d_followers: null, d_posts: null, d_days: null, points: 0,
                first_seen: '', updated_at: '',
            }));
            setFound(prev => start === 0 ? rows : [...prev, ...rows]);
            setFindStart(start); setFindTotal(r.total || 0);
            setSrc('search');
        } catch (e) { setError(String(e)); }
        finally { setFindLoading(false); }
    }, [q, post]);

    /* ---------- こちら側の情報 ---------- */
    const metaOf = useCallback((h: string) => people.find(p => p.handle === h)?.meta || null, [people]);

    const patchMeta = useCallback(async (handle: string, patch: Partial<Meta>) => {
        setPeople(prev => prev.map(p => p.handle === handle
            ? { ...p, meta: { handle, stage: 'new', tags: '', memo: '', next_at: null, ...(p.meta || {}), ...patch } as Meta }
            : p));
        await post({ action: 'meta', handle, ...patch });
    }, [post]);

    const logTouch = useCallback(async (handle: string, kind: string, memo = '') => {
        setTouches(prev => [{ id: `tmp${Date.now()}`, handle, kind, at: new Date().toISOString(), memo }, ...prev]);
        await post({ action: 'touch', handle, kind, memo });
    }, [post]);

    const lastTouch = useMemo(() => {
        const m = new Map<string, Touch>();
        touches.forEach(t => { if (!m.has(t.handle)) m.set(t.handle, t); });
        return m;
    }, [touches]);

    const allTags = useMemo(() => {
        const s = new Set<string>();
        people.forEach(p => (p.meta?.tags || '').split(',').map(t => t.trim()).filter(Boolean).forEach(t => s.add(t)));
        return [...s].sort();
    }, [people]);

    /* ---------- 絞り込みと並べ替え ---------- */
    const base = src === 'search' ? found : people;

    const rel = (p: Person) => p.known === false ? 'new' : p.mutual ? 'mutual' : 'oneway';
    const relLabel = (p: Person) => p.known === false ? '未' : p.mutual ? '相互' : '片想い';

    const rows = useMemo(() => {
        const k = kw.trim();
        return base.filter(p => {
            if (fStage !== 'all' && (p.meta?.stage || 'new') !== fStage) return false;
            if (fRel !== 'all' && rel(p) !== fRel) return false;
            if (fTag !== 'all' && !(p.meta?.tags || '').split(',').map(t => t.trim()).includes(fTag)) return false;
            if (k && !(p.name + ' ' + p.profile + ' ' + (p.meta?.memo || '')).includes(k)) return false;
            if (fSize !== 'all') {
                const f = p.followers;
                if (fSize === 's' && f >= 100) return false;
                if (fSize === 'm' && (f < 100 || f >= 1000)) return false;
                if (fSize === 'l' && (f < 1000 || f >= 10000)) return false;
                if (fSize === 'xl' && f < 10000) return false;
            }
            if (fAct !== 'all') {
                const d = daysSince(p.last_post);
                if (fAct === 'dead') { if (d !== null && d <= 90) return false; }
                else if (d === null || d > Number(fAct)) return false;
            }
            return true;
        });
    }, [base, fStage, fRel, fTag, kw, fSize, fAct]);

    const val = useCallback((p: Person, key: SortKey): number | string => {
        switch (key) {
            case 'name': return p.name;
            case 'stage': return STAGES.findIndex(s => s.id === (p.meta?.stage || 'new'));
            case 'rel': return relLabel(p);
            case 'followers': return p.followers;
            case 'd_followers': return p.d_followers ?? -999999;
            case 'following': return p.following;
            case 'ff': return p.following > 0 ? p.followers / p.following : 999999;
            case 'posts': return p.posts;
            case 'd_posts': return p.d_posts ?? -999999;
            case 'last': return daysSince(p.last_post) ?? 99999;
            case 'avg_like': return p.avg_like;
            case 'rate': return p.followers > 0 ? p.avg_like / p.followers : 0;
            case 'avg_comment': return p.avg_comment;
            case 'tags': return p.meta?.tags || '';
        }
    }, []);

    const sorted = useMemo(() => {
        const arr = [...rows];
        arr.sort((a, b) => {
            const x = val(a, sort.key), y = val(b, sort.key);
            const c = typeof x === 'string' || typeof y === 'string'
                ? String(x).localeCompare(String(y), 'ja') : (x as number) - (y as number);
            return sort.asc ? c : -c;
        });
        return arr;
    }, [rows, sort, val]);

    /* ---------- 今日の5人 ---------- */
    const queue = useMemo(() => {
        const score = (p: Person) => {
            const d = daysSince(p.last_post);
            if (d === null || d > 60) return -1;
            const t = daysSince(lastTouch.get(p.handle)?.at);
            const st = p.meta?.stage || 'new';
            if (st === 'skip') return -1;
            let s = 100 - Math.min(60, d) * 1.6;              // 書いたばかりを最優先
            if (st === 'crew' || st === 'talk') s += 30;       // 続いている関係を切らさない
            if (st === 'lead' || st === 'customer') s += 20;
            s += t === null ? 25 : Math.min(25, t / 2);       // まだ返していない or 間が空いた
            if (p.mutual) s += 8;
            if (p.avg_comment <= 3) s += 8;                    // コメントが少ない = 目立つ
            if (p.followers >= 20 && p.followers <= 3000) s += 6;
            return s;
        };
        return people.map(p => ({ p, s: score(p) })).filter(x => x.s > 0)
            .sort((a, b) => b.s - a.s).slice(0, 5).map(x => x.p);
    }, [people, lastTouch]);

    /* ---------- 保存ビュー ---------- */
    const conf = () => JSON.stringify({ fStage, fRel, fAct, fSize, fTag, kw, sort, hidden });
    const saveView = () => {
        const name = window.prompt('このビューの名前');
        if (!name) return;
        const next = [...views.filter(v => v.name !== name), { name, conf: conf() }];
        setViews(next);
        try { localStorage.setItem(VIEW_KEY, JSON.stringify(next)); } catch { /* noop */ }
    };
    const applyView = (c: string) => {
        try {
            const v = JSON.parse(c);
            setFStage(v.fStage); setFRel(v.fRel); setFAct(v.fAct); setFSize(v.fSize);
            setFTag(v.fTag ?? 'all'); setKw(v.kw); setSort(v.sort); setHidden(v.hidden || []);
        } catch { /* noop */ }
    };
    const dropView = (name: string) => {
        const next = views.filter(v => v.name !== name);
        setViews(next);
        try { localStorage.setItem(VIEW_KEY, JSON.stringify(next)); } catch { /* noop */ }
    };
    const reset = () => {
        setFStage('all'); setFRel('all'); setFAct('all'); setFSize('all'); setFTag('all');
        setKw(''); setSort({ key: 'last', asc: true });
    };

    /* ---------- 書き出し ---------- */
    const exportCsv = () => {
        const cols = COLS.filter(c => !hidden.includes(c.key));
        const head = ['handle', ...cols.map(c => c.label), 'memo', 'url'];
        const line = (p: Person) => [
            p.handle,
            ...cols.map(c => {
                switch (c.key) {
                    case 'name': return p.name;
                    case 'stage': return stageOf(p.meta?.stage).label;
                    case 'rel': return relLabel(p);
                    case 'ff': return p.following > 0 ? (p.followers / p.following).toFixed(2) : '';
                    case 'last': return p.last_post ? p.last_post.slice(0, 10) : '';
                    case 'rate': return p.followers > 0 ? ((p.avg_like / p.followers) * 100).toFixed(1) : '';
                    case 'tags': return p.meta?.tags || '';
                    default: return String(val(p, c.key) ?? '');
                }
            }),
            (p.meta?.memo || '').replace(/[\r\n]+/g, ' '),
            `https://note.com/${p.handle}`,
        ];
        const esc = (s: string) => `"${String(s).replace(/"/g, '""')}"`;
        const csv = '﻿' + [head, ...sorted.map(line)].map(r => r.map(esc).join(',')).join('\r\n');
        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
        const a = document.createElement('a');
        a.href = url; a.download = `radar-${today()}.csv`; a.click();
        URL.revokeObjectURL(url);
    };

    /* ---------- 引き出し ---------- */
    const openPerson = (p: Person) => {
        setOpenHandle(p.handle);
        setDraft({ memo: p.meta?.memo || '', tags: p.meta?.tags || '', next_at: p.meta?.next_at || '' });
    };
    const current = openHandle ? base.find(p => p.handle === openHandle) || null : null;
    const onDraft = (patch: Partial<typeof draft>) => {
        const next = { ...draft, ...patch };
        setDraft(next);
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => {
            if (openHandle) patchMeta(openHandle, { memo: next.memo, tags: next.tags, next_at: next.next_at || null });
        }, 700);
    };

    const stats = useMemo(() => {
        const byStage: Record<string, number> = {};
        people.forEach(p => { const s = p.meta?.stage || 'new'; byStage[s] = (byStage[s] || 0) + 1; });
        const week = Date.now() - 7 * 86400000;
        return {
            total: people.length,
            mutual: people.filter(p => p.mutual).length,
            active: people.filter(p => { const d = daysSince(p.last_post); return d !== null && d <= 30; }).length,
            weekTouch: touches.filter(t => new Date(t.at).getTime() >= week).length,
            byStage,
        };
    }, [people, touches]);

    const pad = isMobile ? '0 14px' : '0 26px';
    const wrap: React.CSSProperties = { maxWidth: '1560px', margin: '0 auto', padding: pad };

    const css = `
        .rb { border: 1px solid ${RULE}; background: #fff; color: ${INK}; padding: 8px 14px; font-size: 12.5px;
            font-weight: 700; cursor: pointer; font-family: inherit; border-radius: 2px;
            transition: border-color .15s, background .15s, color .15s; }
        .rb:hover:not(:disabled) { border-color: ${GOLD}; }
        .rb:disabled { opacity: .45; cursor: default; }
        .rb.p { background: ${INK}; color: ${PAPER}; border-color: ${INK}; }
        .rb.g { background: ${GREEN}; border-color: ${GREEN}; color: #fff; }
        .rs { border: 1px solid ${RULE}; background: #fff; color: ${INK}; padding: 8px 10px; font-size: 12.5px;
            font-family: inherit; border-radius: 2px; outline: none; cursor: pointer; }
        .ri { border: 1px solid ${RULE}; background: #fff; color: ${INK}; padding: 8px 11px; font-size: 13px;
            font-family: inherit; border-radius: 2px; outline: none; }
        .rs:focus, .ri:focus { border-color: ${GOLD}; }
        .rtab { background: none; border: none; font-family: inherit; cursor: pointer; padding: 12px 2px;
            font-size: 13.5px; font-weight: 700; color: ${FAINT}; letter-spacing: 1px; border-bottom: 2px solid transparent; }
        .rtab.sel { color: ${INK}; border-bottom-color: ${GOLD}; }
        .rscroll { overflow: auto; border: 1px solid ${RULE}; background: #fff; max-height: 72vh; }
        table.rt { border-collapse: separate; border-spacing: 0; width: 100%; font-size: 12.5px; }
        table.rt th { position: sticky; top: 0; z-index: 3; background: #F6F2E9; text-align: right;
            padding: 9px 8px; font-size: 10.5px; font-weight: 800; color: ${SUB}; letter-spacing: .5px;
            border-bottom: 1px solid ${RULE}; cursor: pointer; white-space: nowrap; user-select: none; }
        table.rt th:hover { color: ${INK}; background: #F1EBDD; }
        table.rt th.sel { color: ${INK}; background: #FBF3DA; box-shadow: inset 0 -2px 0 ${GOLD}; }
        table.rt th.l, table.rt td.l { text-align: left; }
        table.rt td { padding: 8px; border-bottom: 1px solid ${RULE2}; text-align: right; white-space: nowrap; }
        table.rt tbody tr { cursor: pointer; }
        table.rt tbody tr:hover td { background: #FCFAF4; }
        table.rt tbody tr.sel td { background: #FBF3DA; }
        table.rt td.num { font-family: ${NUM}; }
        .rnm { font-size: 13px; font-weight: 700; color: ${INK}; text-decoration: none; }
        .rnm:hover { color: ${DEEPGOLD}; text-decoration: underline; }
        .rsub { font-size: 10.5px; color: ${FAINT}; margin-top: 2px; max-width: 230px; overflow: hidden;
            text-overflow: ellipsis; white-space: nowrap; }
        .rchip { font-size: 10px; border: 1px solid ${RULE}; padding: 2px 6px; color: ${SUB}; border-radius: 2px; }
        .rdrawer { position: fixed; top: 0; right: 0; bottom: 0; width: min(430px, 92vw); background: ${PAPER};
            border-left: 1px solid ${RULE}; box-shadow: -18px 0 40px rgba(0,0,0,.07); z-index: 60; overflow-y: auto; }
        .rbar { height: 3px; background: #EFEBE1; overflow: hidden; }
        .rbar > i { display: block; height: 100%; background: ${GOLD}; transition: width .3s ease; }
    `;

    const Sel = ({ label, value, onChange, options, w }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][]; w?: number }) => (
        <label style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <span style={{ fontSize: '9.5px', letterSpacing: '1.5px', color: FAINT, fontWeight: 700 }}>{label}</span>
            <select className="rs" value={value} onChange={e => onChange(e.target.value)} style={{ minWidth: w }}>
                {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
        </label>
    );

    const visible = COLS.filter(c => !hidden.includes(c.key));

    return (
        <div style={{ background: PAPER, minHeight: '100vh', color: INK, fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif' }}>
            <style>{css}</style>

            <header style={{ borderBottom: `1px solid ${RULE}` }}>
                <div style={{ ...wrap, paddingTop: '22px', paddingBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap' }}>
                    <div>
                        <div style={{ fontSize: '10px', letterSpacing: '3px', color: DEEPGOLD, fontWeight: 700, marginBottom: '7px' }}>RADAR ・ note:tonio_english</div>
                        <h1 style={{ fontFamily: SERIF, fontSize: isMobile ? '24px' : '30px', fontWeight: 700, margin: 0, lineHeight: 1.4 }}>書き手レーダー</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        {[['把握', stats.total], ['相互', stats.mutual], ['活動中', stats.active], ['今週の接触', stats.weekTouch]].map(([k, v]) => (
                            <div key={String(k)}>
                                <div style={{ fontSize: '9.5px', letterSpacing: '1.5px', color: FAINT, fontWeight: 700 }}>{k}</div>
                                <div style={{ fontFamily: NUM, fontSize: '20px', fontWeight: 700 }}>{v}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            <div style={{ borderBottom: `1px solid ${RULE}`, background: '#fff' }}>
                <div style={{ ...wrap, display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <button className={`rtab${tab === 'mission' ? ' sel' : ''}`} onClick={() => setTab('mission')}>
                            今日の指令{mission && mission.status !== 'done' ? ' ・' : ''}
                        </button>
                        <button className={`rtab${tab === 'queue' ? ' sel' : ''}`} onClick={() => setTab('queue')}>今日の5人</button>
                        <button className={`rtab${tab === 'table' ? ' sel' : ''}`} onClick={() => { setTab('table'); setSrc('mine'); }}>成績表</button>
                        <button className={`rtab${tab === 'find' ? ' sel' : ''}`} onClick={() => { setTab('find'); setSrc('search'); }}>探す</button>
                    </div>
                    <div style={{ display: 'flex', gap: '9px', alignItems: 'center', flexWrap: 'wrap', padding: '7px 0' }}>
                        {sync.on
                            ? <span style={{ fontSize: '11.5px', color: DEEPGOLD }}>{sync.label} {sync.total ? `${sync.done}/${sync.total}` : ''}</span>
                            : <button className="rb p" onClick={runSync}>同期する</button>}
                        <span style={{ fontSize: '10.5px', color: FAINT }}>
                            {people[0]?.updated_at ? `最終同期 ${ago(people[0].updated_at)}前` : '未同期'}
                        </span>
                    </div>
                </div>
                {sync.on && <div className="rbar"><i style={{ width: `${sync.total ? (sync.done / sync.total) * 100 : 4}%` }} /></div>}
            </div>

            <div style={{ ...wrap, paddingTop: '18px', paddingBottom: '70px' }}>
                {error && <div style={{ background: '#FDF2F0', border: '1px solid #E7C4BD', color: '#8C3A2B', padding: '12px 15px', fontSize: '13px', marginBottom: '14px' }}>{error}</div>}
                {loading && <div style={{ fontSize: '14px', color: SUB, padding: '30px 0' }}>読み込んでいる。</div>}

                {/* ============ 今日の指令 ============ */}
                {tab === 'mission' && (
                    <>
                        <div style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.95, marginBottom: '18px', maxWidth: '660px' }}>
                            1日に1人だけ、<strong style={{ color: INK }}>絶対にコメントする相手</strong>が出る。
                            英語の人とは限らない。3回に2回は、まったく違うジャンルから引く。
                            選ぶ基準は、返ってくるかどうかと、後で効くかどうかの2つだけ。
                        </div>

                        {!mission && (
                            <div style={{ border: `1px solid ${RULE}`, background: '#fff', padding: '40px 30px', textAlign: 'center' }}>
                                <div style={{ fontFamily: SERIF, fontSize: '21px', fontWeight: 700, marginBottom: '12px' }}>今日の指令はまだ引いていない</div>
                                <div style={{ fontSize: '13px', color: SUB, lineHeight: 2, marginBottom: '20px' }}>
                                    引いたら、その相手にコメントするまで終わらない。<br />同じ日に何度開いても同じ相手が出る。
                                </div>
                                <button className="rb p" onClick={() => drawMission(0)} disabled={missionBusy}>
                                    {missionBusy ? '探している' : '引く'}
                                </button>
                            </div>
                        )}

                        {mission && (
                            <div style={{ border: `1px solid ${mission.status === 'done' ? GREEN : GOLD}`, background: '#fff', padding: isMobile ? '22px' : '30px 34px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap', alignItems: 'baseline', marginBottom: '16px' }}>
                                    <div style={{ fontSize: '10px', letterSpacing: '3px', fontWeight: 700, color: mission.status === 'done' ? GREEN : DEEPGOLD }}>
                                        {mission.day} ・ {mission.genre} ・ {mission.status === 'done' ? '達成' : '未達成'}
                                        {mission.rerolls > 0 ? ` ・ ${mission.rerolls}回引き直し` : ''}
                                    </div>
                                    <div style={{ fontSize: '11px', color: FAINT }}>
                                        フォロワー {nf(mission.followers)} ・ 平均コメント {mission.avg_comment}
                                    </div>
                                </div>

                                <a href={`https://note.com/${mission.handle}`} target="_blank" rel="noopener noreferrer"
                                    style={{ fontFamily: SERIF, fontSize: isMobile ? '24px' : '32px', fontWeight: 700, color: INK, textDecoration: 'none', lineHeight: 1.4 }}>
                                    {mission.name}
                                </a>

                                {mission.article_url && (
                                    <div style={{ marginTop: '18px', paddingTop: '18px', borderTop: `1px solid ${RULE}` }}>
                                        <div style={{ fontSize: '9.5px', letterSpacing: '1.5px', color: FAINT, fontWeight: 700, marginBottom: '8px' }}>この記事を読む</div>
                                        <a href={mission.article_url} target="_blank" rel="noopener noreferrer"
                                            style={{ fontFamily: SERIF, fontSize: isMobile ? '17px' : '20px', fontWeight: 700, color: DEEPGOLD, textDecoration: 'none', lineHeight: 1.6 }}>
                                            {mission.article_title || '(無題)'}
                                        </a>
                                    </div>
                                )}

                                <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: `1px solid ${RULE}` }}>
                                    <div style={{ fontSize: '9.5px', letterSpacing: '1.5px', color: FAINT, fontWeight: 700, marginBottom: '9px' }}>なぜこの人か</div>
                                    {mission.reason.split(' / ').map((r, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', color: SUB, lineHeight: 1.95, padding: '4px 0' }}>
                                            <span style={{ color: GOLD }}>—</span><span>{r}</span>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginTop: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <a className="rb p" href={mission.article_url || `https://note.com/${mission.handle}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>記事を開く</a>
                                    {mission.status !== 'done'
                                        ? <button className="rb g" onClick={finishMission} disabled={missionBusy}>コメントした</button>
                                        : <span style={{ fontSize: '12.5px', color: GREEN, fontWeight: 700 }}>達成した</span>}
                                    {mission.status !== 'done' && (
                                        <button className="rb" onClick={() => drawMission(1)} disabled={missionBusy}>別の人を引く</button>
                                    )}
                                    <span style={{ fontSize: '11px', color: FAINT }}>
                                        通算 {missions.filter(m => m.status === 'done').length} 件 / 引いた {missions.length} 件
                                    </span>
                                </div>
                            </div>
                        )}

                        {missions.length > 1 && (
                            <div style={{ marginTop: '30px' }}>
                                <div style={{ fontSize: '9.5px', letterSpacing: '1.5px', color: FAINT, fontWeight: 700, marginBottom: '8px' }}>これまでの指令</div>
                                {missions.filter(m => m.day !== mission?.day).map(m => (
                                    <div key={m.day} style={{ display: 'flex', gap: '12px', alignItems: 'baseline', padding: '9px 0', borderTop: `1px solid ${RULE2}`, flexWrap: 'wrap' }}>
                                        <span style={{ fontFamily: NUM, fontSize: '11.5px', color: FAINT, minWidth: '78px' }}>{m.day}</span>
                                        <span className="rchip" style={{ color: SUB }}>{m.genre}</span>
                                        <a className="rnm" href={`https://note.com/${m.handle}`} target="_blank" rel="noopener noreferrer" style={{ flex: '1 1 auto' }}>{m.name}</a>
                                        <span style={{ fontSize: '11px', color: m.status === 'done' ? GREEN : RED }}>{m.status === 'done' ? '達成' : '未達成'}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {!loading && !people.length && tab !== 'find' && tab !== 'mission' && (
                    <div style={{ border: `1px solid ${RULE}`, background: '#fff', padding: '30px', textAlign: 'center' }}>
                        <div style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 700, marginBottom: '10px' }}>まだ何も入っていない</div>
                        <div style={{ fontSize: '13px', color: SUB, lineHeight: 2, marginBottom: '18px' }}>
                            同期するを押すと、フォロー関係と全員の成績を取り込む。1〜2分かかる。<br />
                            2回目からは前回との増減も出る。
                        </div>
                        <button className="rb p" onClick={runSync} disabled={sync.on}>同期する</button>
                    </div>
                )}

                {/* ============ 今日の5人 ============ */}
                {tab === 'queue' && !loading && people.length > 0 && (
                    <>
                        <div style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.9, marginBottom: '18px', maxWidth: '640px' }}>
                            書いたばかりで、こちらがしばらく返していない人から出す。段階が仲間・やりとり中の人は切らさないよう上に来る。
                        </div>
                        {queue.map(p => {
                            const t = lastTouch.get(p.handle);
                            const st = stageOf(p.meta?.stage);
                            return (
                                <div key={p.handle} style={{ borderTop: `1px solid ${RULE}`, padding: '18px 0', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                                    <div style={{ flex: '1 1 380px', minWidth: 0 }}>
                                        <div style={{ display: 'flex', gap: '9px', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '6px' }}>
                                            <a href={`https://note.com/${p.handle}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', fontWeight: 800, color: INK, textDecoration: 'none' }}>{p.name}</a>
                                            <span className="rchip" style={{ color: st.color, borderColor: `${st.color}55` }}>{st.label}</span>
                                            <span style={{ fontSize: '11px', color: FAINT }}>{nf(p.followers)}人 ・ 平均スキ {p.avg_like} ・ コメ {p.avg_comment}</span>
                                            {p.mutual ? <span className="rchip" style={{ color: GREEN, borderColor: `${GREEN}55` }}>相互</span> : null}
                                        </div>
                                        <div style={{ fontFamily: SERIF, fontSize: '17px', fontWeight: 700, lineHeight: 1.6 }}>
                                            <a href={`https://note.com/${p.handle}`} target="_blank" rel="noopener noreferrer" style={{ color: INK, textDecoration: 'none' }}>
                                                最新は {ago(p.last_post)}前
                                            </a>
                                        </div>
                                        <div style={{ fontSize: '11.5px', color: FAINT, marginTop: '6px' }}>
                                            {t ? `前に接触したのは ${t.at.slice(0, 10)}` : 'まだ一度も接触していない'}
                                            {p.meta?.memo ? ` ・ ${p.meta.memo.slice(0, 40)}` : ''}
                                        </div>
                                        {p.profile && <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.85, marginTop: '8px', maxWidth: '640px' }}>{p.profile.slice(0, 120)}</div>}
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                        <a className="rb" href={`https://note.com/${p.handle}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>開く</a>
                                        <button className="rb" onClick={() => { logTouch(p.handle, 'read'); patchMeta(p.handle, { stage: 'read' }); }}>読んだ</button>
                                        <button className="rb g" onClick={() => { logTouch(p.handle, 'comment'); patchMeta(p.handle, { stage: 'talk' }); }}>コメントした</button>
                                        <button className="rb" onClick={() => openPerson(p)}>カード</button>
                                    </div>
                                </div>
                            );
                        })}
                        {!queue.length && <div style={{ fontSize: '13px', color: SUB, padding: '20px 0' }}>候補がいない。同期するか、対象外を見直してくれ。</div>}
                    </>
                )}

                {/* ============ 成績表 / 探す ============ */}
                {(tab === 'table' || tab === 'find') && !loading && (
                    <>
                        {tab === 'find' && (
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '14px', paddingBottom: '14px', borderBottom: `1px solid ${RULE}` }}>
                                <label style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                    <span style={{ fontSize: '9.5px', letterSpacing: '1.5px', color: FAINT, fontWeight: 700 }}>キーワード</span>
                                    <input className="ri" value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') search(0); }} style={{ width: '210px' }} />
                                </label>
                                <button className="rb p" onClick={() => search(0)} disabled={findLoading}>{findLoading ? '探している' : '探す'}</button>
                                {['英語', 'TOEIC', '英検', '英語やり直し', 'オンライン英会話', '海外駐在', 'おうち英語'].map(k => (
                                    <button key={k} className="rb" style={{ fontWeight: 400 }} onClick={() => { setQ(k); setTimeout(() => search(0), 0); }}>{k}</button>
                                ))}
                                {findTotal > 0 && <span style={{ fontSize: '11.5px', color: FAINT }}>該当 {nf(findTotal)} 人中 {found.length} 人を取得</span>}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '9px', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '12px' }}>
                            <Sel label="段階" value={fStage} onChange={setFStage} options={[['all', 'すべて'], ...STAGES.map(s => [s.id, s.label] as [string, string])]} w={104} />
                            <Sel label="関係" value={fRel} onChange={setFRel} options={[['all', 'すべて'], ['mutual', '相互'], ['oneway', '片想い'], ['new', '未フォロー']]} />
                            <Sel label="活動" value={fAct} onChange={setFAct} options={[['all', 'すべて'], ['7', '7日以内'], ['30', '30日以内'], ['90', '90日以内'], ['dead', '90日超']]} />
                            <Sel label="規模" value={fSize} onChange={setFSize} options={[['all', 'すべて'], ['s', '〜99'], ['m', '100〜999'], ['l', '1000〜9999'], ['xl', '10000〜']]} />
                            {allTags.length > 0 && <Sel label="タグ" value={fTag} onChange={setFTag} options={[['all', 'すべて'], ...allTags.map(t => [t, t] as [string, string])]} />}
                            <label style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                <span style={{ fontSize: '9.5px', letterSpacing: '1.5px', color: FAINT, fontWeight: 700 }}>絞り込み</span>
                                <input className="ri" value={kw} onChange={e => setKw(e.target.value)} placeholder="プロフ・メモを検索" style={{ width: '160px' }} />
                            </label>
                            <button className="rb" onClick={reset} style={{ color: DEEPGOLD }}>リセット</button>
                            <button className="rb" onClick={saveView}>ビューを保存</button>
                            <button className="rb" onClick={exportCsv}>CSV</button>
                        </div>

                        {views.length > 0 && (
                            <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginBottom: '12px', alignItems: 'center' }}>
                                <span style={{ fontSize: '10px', letterSpacing: '1.5px', color: FAINT, fontWeight: 700 }}>保存ビュー</span>
                                {views.map(v => (
                                    <span key={v.name} style={{ display: 'inline-flex', border: `1px solid ${RULE}`, background: '#fff' }}>
                                        <button className="rb" style={{ border: 'none' }} onClick={() => applyView(v.conf)}>{v.name}</button>
                                        <button className="rb" style={{ border: 'none', color: FAINT, padding: '8px 8px' }} onClick={() => dropView(v.name)} title="消す">×</button>
                                    </span>
                                ))}
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px', alignItems: 'center' }}>
                            <span style={{ fontSize: '10px', letterSpacing: '1.5px', color: FAINT, fontWeight: 700 }}>列</span>
                            {COLS.map(c => {
                                const on = !hidden.includes(c.key);
                                return (
                                    <button key={c.key} className="rb" title={c.hint}
                                        style={{ fontWeight: 400, fontSize: '11px', padding: '5px 9px', opacity: on ? 1 : .45, borderColor: on ? GOLD : RULE }}
                                        onClick={() => setHidden(h => on ? [...h, c.key] : h.filter(x => x !== c.key))}>
                                        {c.label}
                                    </button>
                                );
                            })}
                            <span style={{ fontSize: '12px', color: SUB, marginLeft: '8px' }}>
                                <strong style={{ fontFamily: NUM, fontSize: '15px', color: INK }}>{sorted.length}</strong> 人
                            </span>
                        </div>

                        <div className="rscroll">
                            <table className="rt">
                                <thead>
                                    <tr>
                                        {visible.map(c => (
                                            <th key={c.key} title={c.hint} style={{ minWidth: c.w }}
                                                className={`${['name', 'stage', 'rel', 'tags'].includes(c.key) ? 'l' : ''}${sort.key === c.key ? ' sel' : ''}`}
                                                onClick={() => setSort(s => s.key === c.key ? { key: c.key, asc: !s.asc } : { key: c.key, asc: !c.desc })}>
                                                {c.label}{sort.key === c.key ? (sort.asc ? ' ▲' : ' ▼') : ''}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {sorted.map(p => {
                                        const st = stageOf(p.meta?.stage);
                                        const ff = p.following > 0 ? p.followers / p.following : null;
                                        const rate = p.followers > 0 ? (p.avg_like / p.followers) * 100 : null;
                                        const d = daysSince(p.last_post);
                                        const cell = (key: SortKey) => {
                                            switch (key) {
                                                case 'name': return (
                                                    <td key={key} className="l">
                                                        <a className="rnm" href={`https://note.com/${p.handle}`} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>{p.name}</a>
                                                        {p.profile && <div className="rsub">{p.profile}</div>}
                                                    </td>);
                                                case 'stage': return (
                                                    <td key={key} className="l">
                                                        <select className="rs" style={{ fontSize: '11px', padding: '4px 6px', color: st.color, borderColor: `${st.color}44` }}
                                                            value={p.meta?.stage || 'new'} onClick={e => e.stopPropagation()}
                                                            onChange={e => patchMeta(p.handle, { stage: e.target.value })}>
                                                            {STAGES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                                                        </select>
                                                    </td>);
                                                case 'rel': return <td key={key} className="l" style={{ fontSize: '11px', color: p.known === false ? DEEPGOLD : p.mutual ? GREEN : FAINT }}>{relLabel(p)}</td>;
                                                case 'followers': return <td key={key} className="num">{nf(p.followers)}</td>;
                                                case 'd_followers': return <td key={key} className="num" style={{ color: (p.d_followers ?? 0) > 0 ? GREEN : (p.d_followers ?? 0) < 0 ? RED : FAINT }}>
                                                    {p.d_followers === null ? '-' : p.d_followers > 0 ? `+${p.d_followers}` : p.d_followers}</td>;
                                                case 'following': return <td key={key} className="num" style={{ color: SUB }}>{nf(p.following)}</td>;
                                                case 'ff': return <td key={key} className="num" style={{ color: ff !== null && ff >= 2 ? DEEPGOLD : SUB }}>{ff === null ? '-' : ff >= 100 ? '99+' : ff.toFixed(1)}</td>;
                                                case 'posts': return <td key={key} className="num" style={{ color: SUB }}>{p.posts ? nf(p.posts) : '-'}</td>;
                                                case 'd_posts': return <td key={key} className="num" style={{ color: (p.d_posts ?? 0) > 0 ? GREEN : FAINT }}>{p.d_posts === null ? '-' : p.d_posts > 0 ? `+${p.d_posts}` : '0'}</td>;
                                                case 'last': return <td key={key} className="num" style={{ color: d !== null && d <= 7 ? GREEN : d !== null && d > 90 ? '#CFC8BC' : SUB }}>{ago(p.last_post)}</td>;
                                                case 'avg_like': return <td key={key} className="num">{p.posts ? p.avg_like : '-'}</td>;
                                                case 'rate': return <td key={key} className="num" style={{ color: rate !== null && rate >= 20 ? DEEPGOLD : SUB, fontWeight: rate !== null && rate >= 20 ? 700 : 400 }}>{rate === null ? '-' : rate.toFixed(0)}</td>;
                                                case 'avg_comment': return <td key={key} className="num" style={{ color: p.avg_comment >= 1 ? DEEPGOLD : SUB }}>{p.posts ? p.avg_comment : '-'}</td>;
                                                case 'tags': return <td key={key} className="l" style={{ fontSize: '11px', color: SUB }}>{p.meta?.tags || ''}</td>;
                                            }
                                        };
                                        return (
                                            <tr key={p.handle} className={openHandle === p.handle ? 'sel' : ''} onClick={() => openPerson(p)}>
                                                {visible.map(c => cell(c.key))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {!sorted.length && <div style={{ padding: '30px', fontSize: '13px', color: FAINT }}>条件に合う人がいない。</div>}
                        </div>

                        {tab === 'find' && found.length > 0 && (
                            <div style={{ paddingTop: '16px' }}>
                                <button className="rb" onClick={() => search(findStart + 20)} disabled={findLoading}>さらに20人</button>
                            </div>
                        )}

                        <div style={{ fontSize: '11px', color: FAINT, lineHeight: 2, marginTop: '16px', borderTop: `1px solid ${RULE}`, paddingTop: '14px', maxWidth: '900px' }}>
                            ΔFLW は前回の同期からの増減。<strong style={{ color: SUB }}>伸びている人と止まっている人がここで分かれる。</strong>
                            FF比が1未満は返礼フォローで数を作っている型。反応% が20を超えると濃い読者がいる。
                            コメが少ないほど、こちらのコメントは目立つ。行を押すとカードが開く。
                        </div>
                    </>
                )}
            </div>

            {/* ============ カード ============ */}
            {current && (
                <div className="rdrawer">
                    <div style={{ padding: '20px 22px', borderBottom: `1px solid ${RULE}`, display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start' }}>
                        <div style={{ minWidth: 0 }}>
                            <a href={`https://note.com/${current.handle}`} target="_blank" rel="noopener noreferrer"
                                style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 700, color: INK, textDecoration: 'none' }}>{current.name}</a>
                            <div style={{ fontSize: '11px', color: FAINT, marginTop: '4px' }}>@{current.handle}</div>
                        </div>
                        <button className="rb" onClick={() => setOpenHandle(null)}>閉じる</button>
                    </div>

                    <div style={{ padding: '18px 22px', borderBottom: `1px solid ${RULE}`, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                        {[
                            ['フォロワー', nf(current.followers)],
                            ['増減', current.d_followers === null ? '-' : (current.d_followers > 0 ? `+${current.d_followers}` : String(current.d_followers))],
                            ['記事', current.posts ? nf(current.posts) : '-'],
                            ['最終投稿', ago(current.last_post)],
                            ['平均スキ', String(current.avg_like)],
                            ['反応%', current.followers > 0 ? ((current.avg_like / current.followers) * 100).toFixed(0) : '-'],
                        ].map(([k, v]) => (
                            <div key={k}>
                                <div style={{ fontSize: '9.5px', letterSpacing: '1.5px', color: FAINT, fontWeight: 700 }}>{k}</div>
                                <div style={{ fontFamily: NUM, fontSize: '17px', fontWeight: 700, marginTop: '3px' }}>{v}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '18px 22px', borderBottom: `1px solid ${RULE}` }}>
                        <div style={{ fontSize: '9.5px', letterSpacing: '1.5px', color: FAINT, fontWeight: 700, marginBottom: '7px' }}>段階</div>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {STAGES.map(s => {
                                const on = (current.meta?.stage || 'new') === s.id;
                                return (
                                    <button key={s.id} className="rb" style={{ fontSize: '11px', padding: '6px 10px', fontWeight: on ? 700 : 400, background: on ? s.color : '#fff', color: on ? '#fff' : SUB, borderColor: on ? s.color : RULE }}
                                        onClick={() => patchMeta(current.handle, { stage: s.id })}>{s.label}</button>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ padding: '18px 22px', borderBottom: `1px solid ${RULE}` }}>
                        <div style={{ fontSize: '9.5px', letterSpacing: '1.5px', color: FAINT, fontWeight: 700, marginBottom: '7px' }}>タグ（カンマ区切り）</div>
                        <input className="ri" style={{ width: '100%', boxSizing: 'border-box' }} value={draft.tags}
                            onChange={e => onDraft({ tags: e.target.value })} placeholder="TOEIC, 40代, 講師" />
                        <div style={{ fontSize: '9.5px', letterSpacing: '1.5px', color: FAINT, fontWeight: 700, margin: '16px 0 7px' }}>次にやる日</div>
                        <input className="ri" type="date" value={draft.next_at || ''} onChange={e => onDraft({ next_at: e.target.value })} />
                        <div style={{ fontSize: '9.5px', letterSpacing: '1.5px', color: FAINT, fontWeight: 700, margin: '16px 0 7px' }}>メモ（自分用）</div>
                        <textarea className="ri" rows={5} style={{ width: '100%', boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.9 }}
                            value={draft.memo} onChange={e => onDraft({ memo: e.target.value })}
                            placeholder="何を書いている人か。何を悩んでいるか。前に何を話したか" />
                        <div style={{ fontSize: '10.5px', color: FAINT, marginTop: '6px' }}>入力は自動で保存される</div>
                    </div>

                    <div style={{ padding: '18px 22px' }}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                            <a className="rb" href={`https://note.com/${current.handle}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>note を開く</a>
                            <button className="rb" onClick={() => logTouch(current.handle, 'read')}>読んだ</button>
                            <button className="rb g" onClick={() => { logTouch(current.handle, 'comment'); patchMeta(current.handle, { stage: 'talk' }); }}>コメントした</button>
                        </div>
                        <div style={{ fontSize: '9.5px', letterSpacing: '1.5px', color: FAINT, fontWeight: 700, marginBottom: '7px' }}>接触の履歴</div>
                        {touches.filter(t => t.handle === current.handle).slice(0, 20).map(t => (
                            <div key={t.id} style={{ fontSize: '12px', color: SUB, padding: '7px 0', borderBottom: `1px solid ${RULE2}` }}>
                                {t.at.slice(0, 10)} ・ {t.kind === 'comment' ? 'コメント' : t.kind === 'read' ? '読んだ' : t.kind}
                                {t.memo ? ` ・ ${t.memo}` : ''}
                            </div>
                        ))}
                        {!touches.some(t => t.handle === current.handle) && <div style={{ fontSize: '12px', color: FAINT }}>まだない</div>}
                    </div>
                </div>
            )}
        </div>
    );
}
