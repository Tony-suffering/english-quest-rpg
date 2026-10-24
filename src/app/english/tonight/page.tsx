'use client';

// 今夜も、通じない。 — DMM英会話コメディシリーズの番組ページ。
// kenshi-lessons を大衆向けに再編集した dmm-show.ts を、深夜番組×週刊連載の
// パッケージで見せる。様式固定: コールドオープン → あらすじ → ボケ3本 →
// ベストプレー → 持ち帰り英語 → 次回予告。ライトテーマ、黒・赤・金はアクセントのみ。
//
// 【ブラウザ編集】(月刊TOLERANCY と同方式)
//   - 起動時に /api/tonight から meta + 全話を読む。DB が空なら静的 seed。
//   - 右上「編集」トグルで各話の全テキストがその場編集(contentEditable)になる。
//   - ボケ/持ち帰り/夜そのものを 追加・削除。REC座標も編集可。
//   - 「保存」で /api/tonight に meta + episodes を POST → D1 に永続化(削除も反映)。

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SHOW_META, showEpisodes, getGeneral, getNoteTitles, type ShowEpisode, type ShowGag, mergeEpisodes, latestNight } from '@/data/english/dmm-show';

const PAPER = '#F7F4EE';
const CARD = '#FFFFFF';
const INK = '#17130F';
const MUTED = '#6E6558';
const RED = '#C0392B';
const GOLD = '#B8941E';
const LINE = '#E5DECF';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";
const SANS = "'Helvetica Neue', Arial, 'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";

type ShowMeta = typeof SHOW_META;
interface TonightDraft { meta: ShowMeta; episodes: ShowEpisode[] }

// ===================== path ユーティリティ (magazine と同型) =====================
type Path = (string | number)[];
function getAt(root: unknown, path: Path): unknown {
    return path.reduce<unknown>((o, k) => (o == null ? undefined : (o as Record<string | number, unknown>)[k]), root);
}
function setAt(root: unknown, path: Path, value: unknown): unknown {
    if (path.length === 0) return value;
    const [head, ...rest] = path;
    const src = root as Record<string | number, unknown> | unknown[] | undefined;
    const clone: Record<string | number, unknown> | unknown[] = Array.isArray(src)
        ? [...src]
        : { ...(src as Record<string | number, unknown>) };
    (clone as Record<string | number, unknown>)[head] = setAt(src ? (src as Record<string | number, unknown>)[head] : undefined, rest, value);
    return clone;
}

// ===================== 追加テンプレート =====================
const T_gag: ShowGag = { scene: '何を言おうとした場面か', boke: '', bokeJa: '直訳', tsukkomi: '', correct: '', correctJa: '', point: '', clip: '' };
const T_takeaway = { en: '', ja: '', note: '', clip: '' };
const T_use = { scene: 'どんな場面で使うか', en: '', ja: '' };

// ===================== 編集可能テキスト =====================
function Editable({
    value, editing, onCommit, as = 'span', style, className,
}: {
    value: string; editing: boolean; onCommit: (v: string) => void;
    as?: keyof React.JSX.IntrinsicElements; style?: React.CSSProperties; className?: string;
}) {
    const ref = useRef<HTMLElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (editing && el && document.activeElement !== el && el.innerText !== value) {
            el.innerText = value ?? '';
        }
    });
    if (!editing) return React.createElement(as, { style, className }, value);
    return React.createElement(as, {
        ref, className, contentEditable: true, suppressContentEditableWarning: true,
        onBlur: (e: React.FocusEvent<HTMLElement>) => onCommit(e.currentTarget.innerText),
        style: {
            ...style, outline: '1px dashed rgba(192,57,43,0.5)', outlineOffset: '2px',
            borderRadius: '2px', cursor: 'text', minHeight: '1em', minWidth: '18px',
        } as React.CSSProperties,
    });
}

function MiniBtn({ onClick, children, tone = 'ink' }: { onClick: () => void; children: React.ReactNode; tone?: 'ink' | 'red' | 'green' }) {
    const bg = tone === 'red' ? RED : tone === 'green' ? '#10B981' : INK;
    return (
        <button onClick={onClick} style={{
            cursor: 'pointer', backgroundColor: bg, color: '#fff', border: 'none',
            borderRadius: '4px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px', lineHeight: 1.4,
        }}>{children}</button>
    );
}

function Kicker({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: RED, textTransform: 'uppercase', marginBottom: '14px' }}>
            {children}
        </div>
    );
}

function RecBadge({ clip }: { clip?: string }) {
    if (!clip) return null;
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800,
            letterSpacing: '1px', color: '#fff', backgroundColor: '#B91C1C', padding: '3px 10px',
            borderRadius: '999px', whiteSpace: 'nowrap', verticalAlign: 'middle',
        }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '999px', backgroundColor: '#fff' }} />
            REC {clip}
        </span>
    );
}

export default function TonightPage() {
    const [draft, setDraft] = useState<TonightDraft>(() => ({ meta: SHOW_META, episodes: showEpisodes }));
    const [night, setNight] = useState<number>(latestNight());
    const [editing, setEditing] = useState(false);
    const [pass, setPass] = useState('');
    const [status, setStatus] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        let alive = true;
        fetch('/api/tonight', { cache: 'no-store' })
            .then((r) => r.json())
            .then((json) => {
                if (!alive || !json?.episodes) return;
                // D1 の保存内容 + まだ保存されていない新しい夜(seed)。丸ごと置換しない。
                const episodes = mergeEpisodes(json.episodes);
                setDraft({ meta: json.meta ?? SHOW_META, episodes });
                const last = episodes[episodes.length - 1];
                if (last) setNight(last.night);
            })
            .catch(() => { /* seed で成立 */ })
            .finally(() => { if (alive) setLoaded(true); });
        return () => { alive = false; };
    }, []);

    const episodes = draft.episodes;
    const idx = Math.max(0, episodes.findIndex((e) => e.night === night));
    const ep = episodes[idx] ?? episodes[episodes.length - 1];

    const mutate = (path: Path, value: unknown) => setDraft((prev) => setAt(prev, path, value) as TonightDraft);
    const addItem = (path: Path, template: unknown) => {
        const arr = (getAt(draft, path) as unknown[]) ?? [];
        mutate(path, [...arr, structuredClone(template)]);
    };
    const removeItem = (path: Path, i: number) => {
        const arr = (getAt(draft, path) as unknown[]) ?? [];
        mutate(path, arr.filter((_, k) => k !== i));
    };

    const E = (path: Path, style?: React.CSSProperties, as: keyof React.JSX.IntrinsicElements = 'span') => (
        <Editable value={String(getAt(draft, path) ?? '')} editing={editing} onCommit={(v) => mutate(path, v)} as={as} style={style} />
    );

    // 今夜の型。書かれていない夜は gags から組み立てたものを出す。
    const gen = getGeneral(ep);
    // 編集に入った時点で、自動ぶんを draft に実体化する。
    // そうしないと「編集して1文字だけ直す」と、直さなかった行が空で保存される。
    useEffect(() => {
        if (!editing) return;
        const cur = episodes[idx];
        if (!cur) return;
        if (!cur.general) {
            const auto = getGeneral(cur);
            if (auto) {
                const { auto: _auto, ...body } = auto;
                setDraft((prev) => setAt(prev, ['episodes', idx, 'general'], body) as TonightDraft);
            }
        }
        if (!cur.noteTitles?.length) {
            setDraft((prev) => setAt(prev, ['episodes', idx, 'noteTitles'], getNoteTitles(cur)) as TonightDraft);
        }
    }, [editing, idx, episodes]);

    // 使う場面。編集で足したぶんがあれば draft、無ければ自動ぶん
    const genUses = ((getAt(draft, ['episodes', idx, 'general', 'uses']) as { scene: string; en: string; ja: string }[] | undefined)
        ?? gen?.uses ?? []);
    const noteTitles = ((getAt(draft, ['episodes', idx, 'noteTitles']) as string[] | undefined)?.length
        ? (getAt(draft, ['episodes', idx, 'noteTitles']) as string[])
        : getNoteTitles(ep));

    /** draft に値が無ければ fallback を表示する。編集して初めて draft に載る */
    const EF = (path: Path, fallback: string, style?: React.CSSProperties, as: keyof React.JSX.IntrinsicElements = 'span') => {
        const cur = getAt(draft, path);
        const val = cur == null || cur === '' ? fallback : String(cur);
        return <Editable value={val} editing={editing} onCommit={(v) => mutate(path, v)} as={as} style={style} />;
    };

    // REC座標: 表示は badge、編集時は常に赤ピルの中で編集可(空でも足せる)
    const clipField = (path: Path) => {
        const val = String(getAt(draft, path) ?? '');
        if (!editing) return <RecBadge clip={val} />;
        return (
            <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800,
                letterSpacing: '1px', color: '#fff', backgroundColor: '#B91C1C', padding: '3px 10px', borderRadius: '999px',
            }}>
                REC <Editable value={val} editing onCommit={(v) => mutate(path, v)} style={{ minWidth: '70px', color: '#fff' }} />
            </span>
        );
    };

    const addEpisode = () => {
        const nextNight = episodes.reduce((m, e) => Math.max(m, e.night), 0) + 1;
        const tmpl: ShowEpisode = {
            night: nextNight, date: '2026-07-01', title: `第${nextNight}夜`, catchcopy: '',
            coldOpen: { en: '', ja: '', note: '', clip: '' }, arasuji: '',
            gags: [structuredClone(T_gag)],
            bestPlay: { en: '', ja: '', note: '', clip: '' },
            takeaways: [structuredClone(T_takeaway)], jikai: '',
        };
        setDraft((prev) => ({ ...prev, episodes: [...prev.episodes, tmpl] }));
        setNight(nextNight);
    };
    const removeEpisode = () => {
        if (episodes.length <= 1) { setStatus('最後の1話は消せません'); setTimeout(() => setStatus(''), 2000); return; }
        const remaining = episodes.filter((_, k) => k !== idx);
        setDraft((prev) => ({ ...prev, episodes: remaining }));
        setNight(remaining[Math.min(idx, remaining.length - 1)].night);
    };

    const save = async () => {
        setStatus('保存中…');
        try {
            const res = await fetch('/api/tonight', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ meta: draft.meta, episodes: draft.episodes, pass }),
            });
            const json = await res.json();
            if (json.success) { setStatus('保存しました'); setTimeout(() => setStatus(''), 2500); }
            else setStatus('失敗: ' + (json.error || 'unknown'));
        } catch (err) { setStatus('失敗: ' + String(err)); }
    };
    const reload = async () => {
        setStatus('再読込中…');
        try {
            const json = await fetch('/api/tonight', { cache: 'no-store' }).then((r) => r.json());
            if (json?.episodes) setDraft({ meta: json.meta ?? SHOW_META, episodes: json.episodes });
            setStatus('');
        } catch { setStatus(''); }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: PAPER, padding: '0 0 90px', fontFamily: SANS, color: INK }}>
            {/* ===================== 編集ツールバー ===================== */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 20, backgroundColor: INK, color: '#fff',
                padding: '10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap',
            }}>
                <div style={{ fontSize: '12px', letterSpacing: '1px' }}>
                    今夜も、通じない。 — 第{ep.night}夜
                    {editing && <span style={{ color: GOLD, marginLeft: '10px', fontWeight: 700 }}>編集モード</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    {status && <span style={{ fontSize: '12px', color: GOLD }}>{status}</span>}
                    {editing && (
                        <>
                            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="パスワード(任意)"
                                style={{ fontSize: '12px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #444', backgroundColor: '#2a2622', color: '#fff', width: '130px' }} />
                            <button onClick={reload} style={{ cursor: 'pointer', backgroundColor: 'transparent', color: '#fff', border: '1px solid #555', borderRadius: '8px', padding: '7px 12px', fontSize: '12px', fontWeight: 600 }}>元に戻す</button>
                            <button onClick={save} style={{ cursor: 'pointer', backgroundColor: '#10B981', color: '#fff', border: 'none', borderRadius: '8px', padding: '7px 16px', fontSize: '12px', fontWeight: 700 }}>保存</button>
                        </>
                    )}
                    <button onClick={() => { if (editing) { void reload(); } setEditing((v) => !v); }}
                        style={{ cursor: 'pointer', backgroundColor: editing ? '#555' : GOLD, color: editing ? '#fff' : INK, border: 'none', borderRadius: '8px', padding: '7px 14px', fontSize: '12px', fontWeight: 700 }}>
                        {editing ? '編集を終える' : '編集'}
                    </button>
                </div>
            </div>

            {!loaded && <div style={{ maxWidth: '920px', margin: '0 auto', padding: '6px 18px', fontSize: '11px', color: MUTED }}>最新の内容を読み込み中…</div>}

            {/* ===================== HERO ===================== */}
            <div style={{ maxWidth: '920px', margin: '0 auto', padding: 'clamp(28px, 6vw, 60px) 18px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px', borderBottom: `3px solid ${INK}`, paddingBottom: '10px' }}>
                    {E(['meta', 'subtitle'], { fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: RED, textTransform: 'uppercase' })}
                    {E(['meta', 'broadcast'], { fontSize: '11px', letterSpacing: '1px', color: MUTED })}
                </div>

                <h1 style={{ fontFamily: SERIF, fontWeight: 900, margin: '26px 0 0', fontSize: 'clamp(46px, 9.5vw, 92px)', lineHeight: 1.12, letterSpacing: '0.02em' }}>
                    今夜も、<br /><span style={{ color: RED }}>通じない。</span>
                </h1>

                <div style={{ marginTop: '26px', backgroundColor: CARD, border: `1px solid ${LINE}`, borderLeft: `4px solid ${INK}`, padding: '18px 22px', fontSize: '13.5px', lineHeight: 2.1, color: INK, maxWidth: '680px' }}>
                    {E(['meta', 'premise'], { display: 'block' }, 'div')}
                </div>

                {/* ===== 番組メニュー(目的別に3束。フラットに並べると探せない) ===== */}
                <div style={{ marginTop: '30px' }}>
                    {[
                        {
                            group: '読む',
                            note: 'はじめて来た人はここから',
                            items: [
                                { href: '/english/tonight/warau', label: '英語ゼロで読む', desc: '英単語ゼロ。日本語だけで64夜ぶんの事故がわかる', hot: true },
                                { href: '/english/tonight/drama', label: 'とにお劇「解剖される男」', desc: '連載の背骨。敵役3体・5幕・夜をまたぐ糸7本' },
                                { href: '/english/tonight/story-lab', label: '物語 — 章ごとのあらすじ', desc: '全6章の要約と成長曲線。劇の補助線' },
                                { href: '/english/tonight/calendar', label: '日めくりカレンダー', desc: '全夜の索引。過去回を探す' },
                            ],
                        },
                        {
                            group: '喋る・覚える',
                            note: '自分もやってみる人へ',
                            items: [
                                { href: '/english/tonight/start', label: 'はじめる (初級/中級/上級)', desc: '今夜25分だけ喋ってみる。どのレベルからでも', hot: true },
                                { href: '/english/tonight/curriculum', label: 'とにお教材 (191表現)', desc: '難易度別 + 対比ドリル。減らない資産' },
                                { href: '/english/tsukkomi-cards', label: 'ツッコミカード', desc: '実録ボケ集のカード' },
                            ],
                        },
                        {
                            group: 'note に出す',
                            note: '制作用。ここだけで1本作れる',
                            items: [
                                { href: '/english/tonight/screens', label: '今回のPNG一式をつくる', desc: '全12枚。これ1つで記事が完成する。編集もここ', hot: true },
                                { href: '/english/tonight/note-guide', label: 'note投稿の型', desc: '構成・毎回のあらすじ・モデル記事' },
                                { href: '/english/tonight/cards', label: 'カード書き出し (横長)', desc: '横長画像が要るときの代替' },
                                { href: '/english/tonight/league', label: 'とにおリーグ (醜態相場)', desc: '芸指数・オッズ・成績の元データ' },
                                { href: '/english/tonight/career', label: '英会話芸人キャリア', desc: 'レベル・スキル・図鑑の積み上げ' },
                            ],
                        },
                    ].map((sec) => (
                        <div key={sec.group} style={{ marginBottom: '22px' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: RED, textTransform: 'uppercase' }}>{sec.group}</span>
                                <span style={{ fontSize: '11px', color: MUTED }}>{sec.note}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(215px, 1fr))', gap: '10px' }}>
                                {sec.items.map((m) => (
                                    <Link key={m.href} href={m.href} style={{ textDecoration: 'none' }}>
                                        <div style={{ backgroundColor: m.hot ? INK : CARD, color: m.hot ? '#fff' : INK, border: m.hot ? `2px solid ${INK}` : `1px solid ${LINE}`, boxShadow: m.hot ? '3px 3px 0 rgba(192,57,43,0.9)' : 'none', padding: '12px 14px', height: '100%' }}>
                                            <div style={{ fontSize: '13px', fontWeight: 800, color: m.hot ? GOLD : INK }}>{m.label}</div>
                                            <div style={{ fontSize: '11px', marginTop: '4px', lineHeight: 1.6, color: m.hot ? 'rgba(255,255,255,0.75)' : MUTED }}>{m.desc}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===================== 番組表(エピソード選択) ===================== */}
            <div style={{ maxWidth: '920px', margin: '38px auto 0', padding: '0 18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: RED, textTransform: 'uppercase', marginBottom: '12px' }}>
                    Episodes — 全{episodes.length}夜
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                    {episodes.map((e) => {
                        const on = e.night === night;
                        return (
                            <button key={e.night} onClick={() => setNight(e.night)}
                                style={{ cursor: 'pointer', textAlign: 'left', padding: '14px 16px', backgroundColor: on ? INK : CARD, color: on ? '#fff' : INK, border: on ? `2px solid ${INK}` : `1px solid ${LINE}`, boxShadow: on ? '4px 4px 0 rgba(192,57,43,0.9)' : 'none', transition: 'all 0.15s ease' }}>
                                <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: on ? GOLD : RED }}>
                                    第{e.night}夜 · {e.date.slice(5).replace('-', '/')}
                                </div>
                                <div style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 700, marginTop: '5px' }}>{e.title}</div>
                                <div style={{ fontSize: '11.5px', marginTop: '5px', lineHeight: 1.6, color: on ? 'rgba(255,255,255,0.75)' : MUTED }}>{e.catchcopy}</div>
                            </button>
                        );
                    })}
                </div>
                {editing && <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                    <MiniBtn tone="green" onClick={addEpisode}>+ 新しい夜を追加</MiniBtn>
                    <MiniBtn tone="red" onClick={removeEpisode}>表示中の第{ep.night}夜を削除</MiniBtn>
                </div>}
            </div>

            {/* ===================== エピソード本編 ===================== */}
            <div style={{ maxWidth: '920px', margin: '34px auto 0', padding: '0 18px' }}>
                {/* タイトルカード */}
                <div style={{ backgroundColor: INK, color: '#fff', padding: 'clamp(26px, 5vw, 44px) clamp(20px, 5vw, 44px)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '14px', right: '18px', fontSize: '11px', letterSpacing: '2px', color: 'rgba(255,255,255,0.55)' }}>
                        {E(['episodes', idx, 'date'], { color: 'rgba(255,255,255,0.7)' })}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '4px', color: GOLD }}>第{ep.night}夜</div>
                    {E(['episodes', idx, 'title'], { fontFamily: SERIF, fontSize: 'clamp(32px, 6.5vw, 56px)', fontWeight: 900, lineHeight: 1.2, marginTop: '8px', display: 'block' }, 'div')}
                    {E(['episodes', idx, 'catchcopy'], { fontSize: '13.5px', color: 'rgba(255,255,255,0.8)', marginTop: '12px', lineHeight: 1.8, display: 'block' }, 'div')}
                </div>

                {/* note に出すときのタイトル案。
                    第N夜の題は番組の中の見出しで、note の一覧に並ぶ名前としては
                    「何の記事か」が伝わらない。開くのが既読の人だけになるのを防ぐ層。 */}
                <div style={{ backgroundColor: '#FFFBEB', border: `1px solid #FDE68A`, borderTop: 'none', padding: '16px clamp(20px, 5vw, 44px)' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '10px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: '#92400E' }}>note のタイトル案</span>
                        <span style={{ fontSize: '11px', color: MUTED }}>押すとコピー。一覧で開かれる名前は番組の題と別に要る</span>
                    </div>
                    <div style={{ display: 'grid', gap: '7px' }}>
                        {noteTitles.map((t, i) => (
                            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', backgroundColor: CARD, border: `1px solid ${LINE}`, padding: '10px 13px' }}>
                                <span style={{ flex: 1, fontSize: '14px', fontWeight: 700, color: INK, lineHeight: 1.5 }}>
                                    {EF(['episodes', idx, 'noteTitles', i], t)}
                                </span>
                                {!editing && (
                                    <button onClick={() => { void navigator.clipboard?.writeText(t); setStatus('タイトルをコピーしました'); setTimeout(() => setStatus(''), 1800); }}
                                        style={{ cursor: 'pointer', backgroundColor: 'transparent', border: `1px solid ${LINE}`, borderRadius: '4px', padding: '4px 10px', fontSize: '11px', fontWeight: 700, color: MUTED, whiteSpace: 'nowrap' }}>
                                        コピー
                                    </button>
                                )}
                                {editing && <MiniBtn tone="red" onClick={() => removeItem(['episodes', idx, 'noteTitles'], i)}>削除</MiniBtn>}
                            </div>
                        ))}
                    </div>
                    {editing && <div style={{ marginTop: '9px' }}><MiniBtn tone="green" onClick={() => addItem(['episodes', idx, 'noteTitles'], '')}>+ タイトル案を追加</MiniBtn></div>}
                </div>

                {/* コールドオープン */}
                <div style={{ backgroundColor: CARD, border: `1px solid ${LINE}`, borderTop: 'none', padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 44px)' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Kicker>Cold Open — 冒頭の一言</Kicker>
                        <div style={{ marginBottom: '14px' }}>{clipField(['episodes', idx, 'coldOpen', 'clip'])}</div>
                    </div>
                    <div style={{ fontFamily: SERIF, fontSize: 'clamp(20px, 3.6vw, 28px)', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.6, color: INK }}>
                        “{E(['episodes', idx, 'coldOpen', 'en'])}”
                    </div>
                    {E(['episodes', idx, 'coldOpen', 'ja'], { fontSize: '13px', color: MUTED, marginTop: '8px', display: 'block' }, 'div')}
                    {E(['episodes', idx, 'coldOpen', 'note'], { fontSize: '13px', color: INK, marginTop: '14px', lineHeight: 1.9, borderTop: `1px solid ${LINE}`, paddingTop: '12px', display: 'block' }, 'div')}
                </div>

                {/* あらすじ */}
                <div style={{ backgroundColor: CARD, border: `1px solid ${LINE}`, borderTop: 'none', padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 44px)' }}>
                    <Kicker>今夜のあらすじ</Kicker>
                    {E(['episodes', idx, 'arasuji'], { fontFamily: SERIF, fontSize: '15.5px', lineHeight: 2.2, display: 'block' }, 'p')}
                </div>

                {/* ボケコーナー */}
                <div style={{ backgroundColor: CARD, border: `1px solid ${LINE}`, borderTop: 'none', padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 44px)' }}>
                    <Kicker>今夜のボケ — 全{ep.gags.length}本(すべて実際の発言)</Kicker>
                    {ep.gags.map((g, i) => (
                        <div key={i} style={{ borderTop: i === 0 ? `2px solid ${INK}` : `1px solid ${LINE}`, padding: '24px 0' }}>
                            <div style={{ display: 'flex', gap: '14px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '1px', color: '#fff', backgroundColor: RED, padding: '4px 12px', whiteSpace: 'nowrap' }}>ボケ {i + 1}</span>
                                {E(['episodes', idx, 'gags', i, 'scene'], { fontSize: '12.5px', color: MUTED })}
                                {clipField(['episodes', idx, 'gags', i, 'clip'])}
                                {editing && <MiniBtn tone="red" onClick={() => removeItem(['episodes', idx, 'gags'], i)}>削除</MiniBtn>}
                            </div>

                            <div style={{ fontFamily: SERIF, fontSize: 'clamp(19px, 3.4vw, 26px)', fontWeight: 700, fontStyle: 'italic', color: RED, margin: '16px 0 4px', lineHeight: 1.5 }}>
                                “{E(['episodes', idx, 'gags', i, 'boke'])}”
                            </div>
                            {E(['episodes', idx, 'gags', i, 'bokeJa'], { fontSize: '12.5px', color: MUTED, display: 'block' }, 'div')}

                            <div style={{ marginTop: '14px', backgroundColor: INK, color: '#fff', padding: '13px 18px', fontSize: '13.5px', lineHeight: 2 }}>
                                <span style={{ color: GOLD, fontWeight: 900, letterSpacing: '2px', fontSize: '11px', marginRight: '10px' }}>ツッコミ</span>
                                {E(['episodes', idx, 'gags', i, 'tsukkomi'])}
                            </div>

                            <div style={{ marginTop: '10px', backgroundColor: '#F0F7F1', border: '1px solid #CDE3D2', borderLeft: '4px solid #10B981', padding: '13px 18px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: '#166534', textTransform: 'uppercase' }}>で、正解は</span>
                                {E(['episodes', idx, 'gags', i, 'correct'], { fontFamily: SERIF, fontSize: '17px', fontWeight: 700, color: INK, marginTop: '6px', display: 'block' }, 'div')}
                                {E(['episodes', idx, 'gags', i, 'correctJa'], { fontSize: '12.5px', color: MUTED, marginTop: '2px', display: 'block' }, 'div')}
                                {E(['episodes', idx, 'gags', i, 'point'], { fontSize: '12.5px', color: '#166534', marginTop: '8px', lineHeight: 1.8, display: 'block' }, 'div')}
                            </div>
                        </div>
                    ))}
                    {editing && <div style={{ paddingTop: '18px' }}><MiniBtn tone="green" onClick={() => addItem(['episodes', idx, 'gags'], T_gag)}>+ ボケを追加</MiniBtn></div>}
                </div>

                {/* ベストプレー */}
                <div style={{ backgroundColor: '#FBF6E7', border: `1px solid #E8D9A8`, borderTop: 'none', padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 44px)' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '14px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: GOLD, textTransform: 'uppercase' }}>今夜のベストプレー — たまには決める</div>
                        {clipField(['episodes', idx, 'bestPlay', 'clip'])}
                    </div>
                    <div style={{ fontFamily: SERIF, fontSize: 'clamp(19px, 3.4vw, 26px)', fontWeight: 700, color: INK, lineHeight: 1.6 }}>
                        “{E(['episodes', idx, 'bestPlay', 'en'])}”
                    </div>
                    {E(['episodes', idx, 'bestPlay', 'ja'], { fontSize: '13px', color: MUTED, marginTop: '6px', display: 'block' }, 'div')}
                    {E(['episodes', idx, 'bestPlay', 'note'], { fontSize: '13px', color: INK, marginTop: '12px', lineHeight: 1.9, display: 'block' }, 'div')}
                </div>

                {/* 今夜の型 — 読者が自分の日常で使える層。ボケは本人の話、ここは読者の話 */}
                {gen && (
                    <div style={{ backgroundColor: '#F1F5F9', border: '1px solid #CBD5E1', borderTop: 'none', borderLeft: `4px solid ${INK}`, padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 44px)' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '6px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: '#0F766E' }}>今夜の型 — ここだけ持って帰れば元は取れる</span>
                            {gen.auto && editing && <span style={{ fontSize: '10px', color: RED, fontWeight: 700 }}>自動生成。書き直すと保存されます</span>}
                        </div>

                        <div style={{ fontFamily: SERIF, fontSize: 'clamp(24px, 4.6vw, 36px)', fontWeight: 900, color: INK, lineHeight: 1.35, margin: '10px 0 4px' }}>
                            {EF(['episodes', idx, 'general', 'pattern'], gen.pattern, {}, 'div')}
                        </div>
                        <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '2px', color: RED }}>
                            {EF(['episodes', idx, 'general', 'label'], gen.label)}
                        </div>

                        <div style={{ fontSize: '14.5px', lineHeight: 2, color: INK, marginTop: '16px', backgroundColor: CARD, border: `1px solid ${LINE}`, padding: '14px 18px' }}>
                            {EF(['episodes', idx, 'general', 'rule'], gen.rule, { display: 'block' }, 'div')}
                        </div>

                        <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: MUTED, margin: '22px 0 10px' }}>
                            あなたの場合はこう使う
                        </div>
                        <div style={{ display: 'grid', gap: '10px' }}>
                            {genUses.map((u, i) => (
                                <div key={i} style={{ backgroundColor: CARD, border: `1px solid ${LINE}`, padding: '13px 16px' }}>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                        {EF(['episodes', idx, 'general', 'uses', i, 'scene'], u.scene, { fontSize: '11.5px', color: '#0F766E', fontWeight: 700 })}
                                        {editing && <MiniBtn tone="red" onClick={() => removeItem(['episodes', idx, 'general', 'uses'], i)}>削除</MiniBtn>}
                                    </div>
                                    {EF(['episodes', idx, 'general', 'uses', i, 'en'], u.en, { fontFamily: SERIF, fontSize: '17px', fontWeight: 700, color: INK, marginTop: '6px', lineHeight: 1.5, display: 'block' }, 'div')}
                                    {EF(['episodes', idx, 'general', 'uses', i, 'ja'], u.ja, { fontSize: '12.5px', color: MUTED, marginTop: '4px', display: 'block' }, 'div')}
                                </div>
                            ))}
                        </div>
                        {editing && <div style={{ marginTop: '10px' }}><MiniBtn tone="green" onClick={() => addItem(['episodes', idx, 'general', 'uses'], T_use)}>+ 使う場面を追加</MiniBtn></div>}

                        {(gen.trap || editing) && (
                            <div style={{ marginTop: '16px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderLeft: `4px solid ${RED}`, padding: '13px 18px' }}>
                                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: RED }}>やりがちな外し方</span>
                                {EF(['episodes', idx, 'general', 'trap'], gen.trap ?? '', { fontSize: '13px', color: INK, marginTop: '6px', lineHeight: 1.9, display: 'block' }, 'div')}
                            </div>
                        )}
                    </div>
                )}

                {/* 持ち帰り英語 */}
                <div style={{ backgroundColor: CARD, border: `1px solid ${LINE}`, borderTop: 'none', padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 44px)' }}>
                    <Kicker>持ち帰り英語 — 今夜の3つだけ</Kicker>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '12px' }}>
                        {ep.takeaways.map((t, i) => (
                            <div key={i} style={{ border: `1px solid ${LINE}`, borderTop: `3px solid ${INK}`, padding: '16px 18px', backgroundColor: PAPER }}>
                                {editing && <div style={{ textAlign: 'right', marginBottom: '6px' }}><MiniBtn tone="red" onClick={() => removeItem(['episodes', idx, 'takeaways'], i)}>削除</MiniBtn></div>}
                                {E(['episodes', idx, 'takeaways', i, 'en'], { fontFamily: SERIF, fontSize: '16.5px', fontWeight: 700, color: INK, lineHeight: 1.5, display: 'block' }, 'div')}
                                {E(['episodes', idx, 'takeaways', i, 'ja'], { fontSize: '12.5px', color: MUTED, marginTop: '6px', display: 'block' }, 'div')}
                                {E(['episodes', idx, 'takeaways', i, 'note'], { fontSize: '12px', color: INK, marginTop: '10px', lineHeight: 1.8, borderTop: `1px solid ${LINE}`, paddingTop: '8px', display: 'block' }, 'div')}
                                <div style={{ marginTop: '8px' }}>{clipField(['episodes', idx, 'takeaways', i, 'clip'])}</div>
                            </div>
                        ))}
                    </div>
                    {editing && <div style={{ marginTop: '12px' }}><MiniBtn tone="green" onClick={() => addItem(['episodes', idx, 'takeaways'], T_takeaway)}>+ 持ち帰りを追加</MiniBtn></div>}
                </div>

                {/* 次回予告 */}
                <div style={{ backgroundColor: INK, color: '#fff', padding: 'clamp(26px, 5vw, 40px) clamp(20px, 5vw, 44px)', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '4px', color: GOLD, textTransform: 'uppercase', marginBottom: '14px' }}>次回予告</div>
                    {E(['episodes', idx, 'jikai'], { fontFamily: SERIF, fontSize: 'clamp(15px, 2.6vw, 19px)', fontStyle: 'italic', lineHeight: 2.1, maxWidth: '640px', margin: '0 auto', display: 'block' }, 'div')}
                    <div style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 900, color: RED, marginTop: '18px', letterSpacing: '6px' }}>つづく</div>
                </div>
            </div>

            {/* ===================== 提供クレジット ===================== */}
            <div style={{ maxWidth: '920px', margin: '50px auto 0', padding: '0 18px' }}>
                <div style={{ borderTop: `3px solid ${INK}`, paddingTop: '14px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', fontSize: '11px', letterSpacing: '1.5px', color: MUTED, textTransform: 'uppercase' }}>
                    <span>この番組は「恥とあきらめの英会話」の提供でお送りしました</span>
                    <span style={{ display: 'inline-flex', gap: '16px', flexWrap: 'wrap' }}>
                        <Link href="/english/tonight/calendar" style={{ color: GOLD, fontWeight: 700, textDecoration: 'none' }}>日めくりカレンダー</Link>
                        <Link href="/english/tonight/league" style={{ color: GOLD, fontWeight: 700, textDecoration: 'none' }}>とにおリーグ (醜態相場)</Link>
                        <Link href="/english/tonight/story-lab" style={{ color: GOLD, fontWeight: 700, textDecoration: 'none' }}>とにおリーグ 物語 (成長ストーリー)</Link>
                        <Link href={`/english/tonight/screens?night=${ep.night}`} style={{ color: GOLD, fontWeight: 700, textDecoration: 'none' }}>スマホ縦スクショ (note用)</Link>
                        <Link href="/english/tonight/cards" style={{ color: GOLD, fontWeight: 700, textDecoration: 'none' }}>note用カード書き出し</Link>
                        <Link href="/english/magazine" style={{ color: GOLD, fontWeight: 700, textDecoration: 'none' }}>姉妹誌: 月刊TOLERANCY</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}
