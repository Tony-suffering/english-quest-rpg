'use client';

// 出る順 日本語 — 日本語から引く表。1日10語。
//
// 「裾上げって英語で何?」に答えるための表。既存の3枚とは役割が違う。
//   /english/corpus-ja  日本語表現ランキング。字幕280万ペアから掘った実測。生活の名詞を持っていない
//   /english/namahanka  1語が英語で何本に割れるかを、核ごとに書く読み物。12語ぶん
//   /english/nihongo    日本語の慣用句を英語の慣用句に置き換える表。310語を手で選んだ
//
// ここは「網羅」と「順番」を担当する。JMdict 21万見出しを在庫にして、
// 会話2.6億語の遭遇数で並べ、1日10語ずつ配る。全部やる必要は無いが、
// 端まで行けば終わる、という状態にするのが目的。

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
    JA_DERU_URL,
    JA_DERU_PER_DAY,
    JA_DERU_STATS,
    JA_DERU_COVERAGE,
    JA_DERU_YAMA,
    JA_DERU_SCENES,
    type JaDeruRow,
} from '@/data/english/ja-deru';
import { JA_DERU_EX_DIR, JA_DERU_EX_STATS, type JaDeruExEntry } from '@/data/english/ja-deru-ex';

const GOLD = '#D4AF37';
const GREEN = '#10B981';
const N = (v: number) => v.toLocaleString();
const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const STORAGE_KEY = 'ja-deru-done';
const REG_KEY = 'ja-deru-registered';

interface Item {
    rank: number;
    ja: string;
    yomi: string;
    yama: 1 | 2;
    hits: number;
    senses: number;
    glossN: number;
    dict: string;
    branches: string[];
    pos: string;
    scene: string;
    date: string;
}

function toItems(rows: JaDeruRow[]): Item[] {
    return rows.map((r, i) => ({
        rank: i + 1,
        ja: r[0], yomi: r[1], yama: r[2], hits: r[3], senses: r[4], glossN: r[5],
        dict: r[6], branches: r[7], pos: r[8], scene: r[9], date: r[10],
    }));
}

function monthKey(y: number, m: number) {
    return `${y}-${String(m + 1).padStart(2, '0')}`;
}
function buildGrid(y: number, m: number): (number | null)[] {
    const first = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < first; i++) cells.push(null);
    for (let d = 1; d <= days; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
}
function jstToday(): string {
    const jst = new Date(Date.now() + 9 * 3600 * 1000);
    return jst.toISOString().slice(0, 10);
}

function loadDone(): Set<string> {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch { return new Set(); }
}
function saveDone(s: Set<string>) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...s])); } catch { /* noop */ }
}

function loadRegistered(): Set<string> {
    try {
        const raw = localStorage.getItem(REG_KEY);
        return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch { return new Set(); }
}
function regKey(ja: string, english: string) {
    return `${ja}|${english.toLowerCase()}`;
}

function speak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
}

export default function DeruPage() {
    const [rows, setRows] = useState<JaDeruRow[] | null>(null);
    const [err, setErr] = useState<string | null>(null);
    const [done, setDone] = useState<Set<string>>(new Set());
    const today = jstToday();
    const [viewYear, setViewYear] = useState(() => Number(today.slice(0, 4)));
    const [viewMonth, setViewMonth] = useState(() => Number(today.slice(5, 7)) - 1);
    const [selected, setSelected] = useState<string>(today);
    const [openId, setOpenId] = useState<string | null>(null);
    const [sceneFilter, setSceneFilter] = useState<string>('');

    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);

    // 例文は配信月ごとのファイル。選んだ日の月だけ読む。例文の無い月はファイルが無い
    const [exMonth, setExMonth] = useState<Record<string, JaDeruExEntry>>({});
    const selMonth = selected.slice(0, 7);
    useEffect(() => {
        let alive = true;
        setExMonth({});
        fetch(`${JA_DERU_EX_DIR}/${selMonth}.json`)
            .then(r => (r.ok ? r.json() : {}))
            .then((d: Record<string, JaDeruExEntry>) => { if (alive) setExMonth(d); })
            .catch(() => { /* 例文なしで出す */ });
        return () => { alive = false; };
    }, [selMonth]);

    useEffect(() => { setDone(loadDone()); setRegistered(loadRegistered()); }, []);
    useEffect(() => {
        let alive = true;
        fetch(JA_DERU_URL)
            .then(r => { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
            .then((d: JaDeruRow[]) => { if (alive) setRows(d); })
            .catch(e => { if (alive) setErr(String(e)); });
        return () => { alive = false; };
    }, []);

    const items = useMemo(() => (rows ? toItems(rows) : []), [rows]);
    const byDate = useMemo(() => {
        const m = new Map<string, Item[]>();
        for (const it of items) {
            if (!m.has(it.date)) m.set(it.date, []);
            m.get(it.date)!.push(it);
        }
        return m;
    }, [items]);

    const firstDate = items.length ? items[0].date : today;
    const lastDate = items.length ? items[items.length - 1].date : today;
    const grid = useMemo(() => buildGrid(viewYear, viewMonth), [viewYear, viewMonth]);
    const dayItems = byDate.get(selected) || [];
    const shown = sceneFilter ? dayItems.filter(i => i.scene === sceneFilter) : dayItems;

    const toggle = useCallback((key: string) => {
        setDone(prev => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key); else next.add(key);
            saveDone(next);
            return next;
        });
    }, []);

    // トレーニング(/english/training)のカードにする。表=英語、裏=日本語(読み)
    const addToTraining = useCallback(async (it: Item, english: string, japanese?: string) => {
        const key = regKey(it.ja, english);
        if (registered.has(key) || busy) return;
        setBusy(key);
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english,
                    japanese: japanese ?? (it.yomi ? `${it.ja}（${it.yomi}）` : it.ja),
                    date: today,
                }),
            });
            if (res.ok || res.status === 409) {
                setRegistered(prev => {
                    const next = new Set(prev);
                    next.add(key);
                    try { localStorage.setItem(REG_KEY, JSON.stringify([...next])); } catch { /* noop */ }
                    return next;
                });
            }
        } catch { /* noop */ } finally {
            setBusy(null);
        }
    }, [registered, busy, today]);

    const AddBtn = ({ it, english, japanese }: { it: Item; english: string; japanese?: string }) => {
        const key = regKey(it.ja, english);
        const on = registered.has(key);
        const loading = busy === key;
        return (
            <button onClick={() => addToTraining(it, english, japanese)} disabled={on || loading} style={{
                fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', flexShrink: 0,
                border: `1px solid ${on ? GREEN : GOLD}`,
                background: on ? '#F0FDF4' : '#FEF9E7',
                color: on ? '#047857' : '#92400E', cursor: on ? 'default' : 'pointer',
            }}>{on ? '登録済み' : loading ? '追加中' : 'トレーニングに追加'}</button>
        );
    };

    const doneCount = done.size;
    const pct = items.length ? (doneCount / items.length) * 100 : 0;

    const step = (delta: number) => {
        const d = new Date(viewYear, viewMonth + delta, 1);
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#fafaf9', color: '#1c1917' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 20px 80px' }}>

                {/* ---- 見出し ---- */}
                <div style={{ marginBottom: '22px' }}>
                    <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#a8a29e', fontWeight: 600 }}>
                        DERU-JUN / JAPANESE FIRST
                    </div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '6px 0 8px', letterSpacing: '-0.5px' }}>
                        出る順 日本語
                    </h1>
                    <p style={{ fontSize: '13px', color: '#57534e', lineHeight: 1.8, margin: 0, maxWidth: '760px' }}>
                        「裾上げって英語で何」に、順番をつけて答える表。辞書<strong>{N(JA_DERU_STATS.dictHeads)}見出し</strong>を在庫にして、
                        会話2.6億語の遭遇数で並べた。1日{JA_DERU_PER_DAY}語。全部やる必要は無いが、端まで行けば終わる。
                    </p>
                </div>

                {/* ---- 出どころ ---- */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                    gap: '10px', marginBottom: '18px',
                }}>
                    {[
                        { k: '配信中', v: N(JA_DERU_STATS.total), n: `JMdict ${N(JA_DERU_STATS.dictHeads)}見出しから。1日${JA_DERU_PER_DAY}語(山1から6・山2から4)` },
                        { k: '山1 会話に出る', v: N(JA_DERU_STATS.yama1), n: '英語で2本以上に割れる語。順番は遭遇数(実測)' },
                        { k: '山2 辞書にしかない', v: N(JA_DERU_STATS.yama2), n: `人が見て要ると判定した語。A ${JA_DERU_STATS.tiers.A} / B ${JA_DERU_STATS.tiers.B} / C ${JA_DERU_STATS.tiers.C}` },
                        { k: '山2 未判定の在庫', v: N(JA_DERU_STATS.yama2Unjudged), n: `候補 ${N(JA_DERU_STATS.yama2Pool)} のうち、まだ人が見ていない語。これが減れば表が伸びる` },
                    ].map(c => (
                        <div key={c.k} style={{
                            background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '12px 14px',
                        }}>
                            <div style={{ fontSize: '10px', color: '#a8a29e', fontWeight: 700, letterSpacing: '0.5px' }}>{c.k}</div>
                            <div style={{ fontSize: '22px', fontWeight: 800, margin: '2px 0 3px' }}>{c.v}</div>
                            <div style={{ fontSize: '10px', color: '#78716c', lineHeight: 1.5 }}>{c.n}</div>
                        </div>
                    ))}
                </div>

                {/* ---- なぜ2つ突き合わせるのか ---- */}
                <details style={{
                    background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px',
                    padding: '12px 16px', marginBottom: '18px', fontSize: '12px', color: '#57534e',
                }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#1c1917' }}>
                        数字の出どころと、この表の限界
                    </summary>
                    <div style={{ marginTop: '10px', lineHeight: 1.9 }}>
                        <p style={{ margin: '0 0 8px' }}>
                            <strong>在庫は辞書から、順番は会話から取った。</strong>
                            JMdict（EDRDG、無料）には頻度帯が入っているが、中身は毎日新聞のもので、
                            上位が「安保 委員会 委員長 違反」になる。会話の順番ではないので使っていない。
                            逆に会話コーパスだけだと網羅性が無く、<strong>裾上げ・花粉症・立ち仕事が1件も入っていない</strong>。
                            だから2つ突き合わせている。
                        </p>
                        <p style={{ margin: '0 0 8px' }}>
                            <strong>山2 の順番だけは実測ではない。</strong>
                            会話コーパスに出てこない語には遭遇数が無く、辞書の priority タグは新聞由来なので、
                            通すと上告・送検・国税庁が上に来る。説明の長さで並べると、英語に単語が無い語（猫舌・知恵熱）が上に来て、
                            英語に単語がある語（裾上げ = hemming）が下に沈む。だが後者も言えないことに変わりはない。
                            <strong>「英語に無い」と「生活で要る」は別の軸で、この表は後者の実測値を持っていない。</strong>
                            だから山2 の先頭は人が決めた順で、そう書いてある。測れないものを測ったふりはしない。
                        </p>
                        <div style={{ marginTop: '10px' }}>
                            <div style={{ fontWeight: 700, color: '#1c1917', marginBottom: '4px' }}>山1 のカバー率</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {JA_DERU_COVERAGE.map(([n, p]) => (
                                    <span key={n} style={{
                                        fontSize: '11px', background: '#f5f5f4', borderRadius: '6px', padding: '3px 8px',
                                    }}>
                                        上位{N(n)}件 <strong>{p}%</strong>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </details>

                {/* ---- 進捗 ---- */}
                <div style={{
                    background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px',
                    padding: '12px 16px', marginBottom: '18px',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                        <span style={{ fontWeight: 700 }}>潰した数</span>
                        <span style={{ color: '#78716c' }}>
                            {N(doneCount)} / {N(items.length)}　残り {N(Math.max(0, items.length - doneCount))}
                        </span>
                    </div>
                    <div style={{ height: '8px', background: '#f5f5f4', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${Math.min(100, pct)}%`, background: GOLD, transition: 'width .3s' }} />
                    </div>
                    <div style={{ fontSize: '10px', color: '#a8a29e', marginTop: '5px' }}>
                        配信は {firstDate} 〜 {lastDate}。この端末にだけ残る
                    </div>
                </div>

                {err && (
                    <div style={{ padding: '14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', fontSize: '12px' }}>
                        表を読み込めなかった（{err}）。<code>node scripts/build-ja-deru.mjs</code> を走らせると作られる。
                    </div>
                )}
                {!rows && !err && (
                    <div style={{ padding: '30px', textAlign: 'center', color: '#a8a29e', fontSize: '13px' }}>読み込み中…</div>
                )}

                {rows && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 380px) 1fr', gap: '18px', alignItems: 'start' }}>

                        {/* ---- カレンダー ---- */}
                        <div style={{ background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', padding: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <button onClick={() => step(-1)} style={navBtn}>{'<'}</button>
                                <div style={{ fontWeight: 800, fontSize: '14px' }}>{viewYear}年{viewMonth + 1}月</div>
                                <button onClick={() => step(1)} style={navBtn}>{'>'}</button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                                {WEEK.map(w => (
                                    <div key={w} style={{ fontSize: '9px', textAlign: 'center', color: '#a8a29e', fontWeight: 700, padding: '2px 0' }}>{w}</div>
                                ))}
                                {grid.map((d, i) => {
                                    if (d === null) return <div key={`e${i}`} />;
                                    const key = `${monthKey(viewYear, viewMonth)}-${String(d).padStart(2, '0')}`;
                                    const list = byDate.get(key);
                                    const has = !!list?.length;
                                    const doneHere = list ? list.filter(x => done.has(String(x.rank))).length : 0;
                                    const all = has && doneHere === list!.length;
                                    const isSel = key === selected;
                                    const isToday = key === today;
                                    return (
                                        <div
                                            key={key}
                                            onClick={() => has && setSelected(key)}
                                            style={{
                                                minHeight: '42px', borderRadius: '7px', padding: '3px',
                                                cursor: has ? 'pointer' : 'default',
                                                background: isSel ? '#FEF9E7' : all ? '#F0FDF4' : has ? '#fff' : '#fafaf9',
                                                border: isSel ? `2px solid ${GOLD}` : isToday ? `2px solid ${GREEN}` : '1px solid #f0efee',
                                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                            }}
                                        >
                                            <span style={{ fontSize: '10px', fontWeight: 700, color: has ? '#57534e' : '#d6d3d1' }}>{d}</span>
                                            {has && (
                                                <span style={{ fontSize: '9px', color: all ? GREEN : '#d6d3d1', fontWeight: 800 }}>
                                                    {all ? '済' : `${doneHere}/${list!.length}`}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{ marginTop: '12px', borderTop: '1px solid #f0efee', paddingTop: '10px' }}>
                                <div style={{ fontSize: '10px', color: '#a8a29e', fontWeight: 700, marginBottom: '5px' }}>場面でしぼる</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                    <button onClick={() => setSceneFilter('')} style={chip(sceneFilter === '')}>ぜんぶ</button>
                                    {JA_DERU_SCENES.slice(0, 12).map(([s, n]) => (
                                        <button key={s} onClick={() => setSceneFilter(sceneFilter === s ? '' : s)} style={chip(sceneFilter === s)}>
                                            {s} <span style={{ opacity: 0.55 }}>{n}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginTop: '12px', borderTop: '1px solid #f0efee', paddingTop: '10px', fontSize: '10px', color: '#78716c', lineHeight: 1.7 }}>
                                {JA_DERU_YAMA.map((y, i) => (
                                    <div key={y.name} style={{ marginBottom: '5px' }}>
                                        <span style={yamaBadge(i === 0 ? 1 : 2)}>山{i + 1}</span> {y.desc}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ---- その日の10語 ---- */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '10px' }}>
                                <h2 style={{ fontSize: '16px', fontWeight: 800, margin: 0 }}>{selected}</h2>
                                <span style={{ fontSize: '12px', color: '#78716c' }}>{shown.length}語</span>
                                {sceneFilter && <span style={{ fontSize: '11px', color: GOLD, fontWeight: 700 }}>{sceneFilter} だけ</span>}
                            </div>

                            {shown.length === 0 && (
                                <div style={{ padding: '26px', background: '#fff', border: '1px solid #e7e5e4', borderRadius: '12px', color: '#a8a29e', fontSize: '13px' }}>
                                    この日の配信は無い。カレンダーで色の付いた日を選ぶ。
                                </div>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {shown.map(it => {
                                    const key = String(it.rank);
                                    const isDone = done.has(key);
                                    const open = openId === key;
                                    const ex = exMonth[it.ja];
                                    // 割れ先は、字幕で当たった数があればその順に並べる(辞書は古い意味が先に来る)
                                    const brOrder = it.branches.map((b, i) => ({ b, i, n: ex?.b[i] ?? 0 }));
                                    if (ex) brOrder.sort((a, z) => z.n - a.n || a.i - z.i);
                                    const top = brOrder[0];
                                    return (
                                        <div key={key} style={{
                                            background: '#fff',
                                            border: `1px solid ${isDone ? '#bbf7d0' : '#e7e5e4'}`,
                                            borderRadius: '12px', padding: '13px 15px',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', flexWrap: 'wrap' }}>
                                                <span style={yamaBadge(it.yama)}>山{it.yama}</span>
                                                <span style={{ fontSize: '19px', fontWeight: 800 }}>{it.ja}</span>
                                                {it.yomi && <span style={{ fontSize: '11px', color: '#a8a29e' }}>{it.yomi}</span>}
                                                {it.scene && <span style={sceneBadge}>{it.scene}</span>}
                                                <span style={{ marginLeft: 'auto', display: 'flex', gap: '6px', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '10px', color: '#a8a29e' }}>出る順 {N(it.rank)}位</span>
                                                    <button onClick={() => toggle(key)} style={{
                                                        fontSize: '10px', fontWeight: 800, padding: '4px 9px', borderRadius: '7px',
                                                        border: `1px solid ${isDone ? GREEN : '#e7e5e4'}`,
                                                        background: isDone ? '#F0FDF4' : '#fff',
                                                        color: isDone ? GREEN : '#78716c', cursor: 'pointer',
                                                    }}>{isDone ? '潰した' : '潰す'}</button>
                                                </span>
                                            </div>

                                            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span style={{ fontSize: '10px', color: '#a8a29e', fontWeight: 700, minWidth: '52px' }}>辞書の答え</span>
                                                <span style={{ fontSize: '14px', fontWeight: 600 }}>{it.dict}</span>
                                                <button onClick={() => speak(it.dict.split(' / ')[0])} style={speakBtn}>音</button>
                                                <AddBtn it={it} english={it.dict} />
                                            </div>
                                            {ex && top && top.i !== 0 && top.n > 0 && (
                                                <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                    <span style={{ fontSize: '10px', color: GREEN, fontWeight: 700, minWidth: '52px' }}>字幕では</span>
                                                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{top.b}</span>
                                                    <span style={{ fontSize: '10px', color: '#a8a29e' }}>が一番多い ({top.n}回)</span>
                                                </div>
                                            )}

                                            {ex && ex.e.length > 0 && (
                                                <div style={{
                                                    marginTop: '10px', padding: '9px 11px', borderRadius: '9px',
                                                    background: '#F7FBF9', border: '1px solid #D1FAE5',
                                                }}>
                                                    <div style={{ fontSize: '10px', color: GREEN, fontWeight: 800, marginBottom: '5px' }}>
                                                        ネイティブはこう言った
                                                        <span style={{ color: '#a8a29e', fontWeight: 500, marginLeft: '6px' }}>英語の映画・ドラマのセリフと、その字幕</span>
                                                    </div>
                                                    {ex.e.map(([en, sub, c, bi]) => (
                                                        <div key={en} style={{ padding: '4px 0', borderTop: '1px dashed #E7F5EE' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                                <span style={{ fontSize: '14px', fontWeight: 700, color: '#1c1917' }}>{en}</span>
                                                                <button onClick={() => speak(en)} style={speakBtn}>音</button>
                                                                <AddBtn it={it} english={en} japanese={`${sub}（${it.ja}）`} />
                                                            </div>
                                                            <div style={{ fontSize: '11px', color: '#78716c', marginTop: '1px' }}>
                                                                {sub}
                                                                <span style={{ color: '#a8a29e', marginLeft: '8px', fontSize: '10px' }}>
                                                                    {c > 1 ? `${c}回 ` : ''}
                                                                    {bi >= 0 ? `訳語 ${it.branches[bi]?.split(' / ')[0] ?? ''}` : '訳語なしで当たった'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            <div style={{ marginTop: '7px', display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '10px', color: '#78716c' }}>
                                                <span>英語で <strong style={{ color: it.senses >= 3 ? GOLD : '#57534e' }}>{it.senses}本</strong>に割れる</span>
                                                <span>訳語 {it.glossN}</span>
                                                {it.hits > 0
                                                    ? <span>会話で一生に <strong>{N(it.hits)}回</strong></span>
                                                    : <span style={{ color: '#a8a29e' }}>会話コーパスに出てこない語</span>}
                                                {it.pos && <span style={{ color: '#a8a29e' }}>{it.pos}</span>}
                                            </div>

                                            {it.branches.length > 1 && (
                                                <button onClick={() => setOpenId(open ? null : key)} style={{
                                                    marginTop: '8px', fontSize: '11px', fontWeight: 700, color: GOLD,
                                                    background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                                                }}>
                                                    {open ? '割れ先をとじる' : `割れ先を見る (${it.branches.length})`}
                                                </button>
                                            )}
                                            {open && (
                                                <ol style={{ margin: '8px 0 0', paddingLeft: '18px', fontSize: '12px', color: '#44403c', lineHeight: 1.8 }}>
                                                    {brOrder.map(({ b, i, n }) => (
                                                        <li key={i} style={{ marginBottom: '2px' }}>
                                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                                {b}
                                                                {ex && <span style={{ fontSize: '10px', color: n > 0 ? GREEN : '#d6d3d1' }}>字幕 {n}</span>}
                                                                {b !== it.dict && <AddBtn it={it} english={b} />}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ol>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <div style={{ marginTop: '16px', fontSize: '11px', color: '#a8a29e', lineHeight: 1.8 }}>
                                割れ方を核まで割った読み物は <Link href="/english/namahanka" style={{ color: GOLD, fontWeight: 700 }}>生半可</Link>、
                                慣用句どうしの置き換えは <Link href="/english/nihongo" style={{ color: GOLD, fontWeight: 700 }}>日本語から学ぶ</Link>、
                                字幕から掘った実測は <Link href="/english/corpus-ja" style={{ color: GOLD, fontWeight: 700 }}>日本語表現ランキング</Link>。
                                <br />
                                「ネイティブはこう言った」は JESC 日英字幕対訳(Stanford / Google / 楽天, CC BY-SA 4.0)から、英語が2〜8語の行だけ拾った。
                                付いている語は 山1 {N(JA_DERU_EX_STATS.yama1.with)}/{N(JA_DERU_EX_STATS.yama1.total)}、山2 {N(JA_DERU_EX_STATS.yama2.with)}/{N(JA_DERU_EX_STATS.yama2.total)}。
                                字幕は1行ずれることがあるので、訳語が入っていない行は同じ組が2回以上出たものだけ出している。
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

const navBtn: React.CSSProperties = {
    width: '26px', height: '26px', borderRadius: '7px', border: '1px solid #e7e5e4',
    background: '#fff', cursor: 'pointer', fontSize: '12px', color: '#57534e', fontWeight: 700,
};
const speakBtn: React.CSSProperties = {
    fontSize: '10px', padding: '2px 7px', borderRadius: '6px', border: '1px solid #e7e5e4',
    background: '#fff', cursor: 'pointer', color: '#78716c',
};
const sceneBadge: React.CSSProperties = {
    fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '6px',
    background: '#F0FDFA', color: '#0D9488',
};
function yamaBadge(y: 1 | 2): React.CSSProperties {
    return {
        fontSize: '9px', fontWeight: 800, padding: '2px 6px', borderRadius: '5px',
        background: y === 1 ? '#FEF3C7' : '#EDE9FE',
        color: y === 1 ? '#92400E' : '#5B21B6',
    };
}
function chip(active: boolean): React.CSSProperties {
    return {
        fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '999px',
        border: `1px solid ${active ? GOLD : '#e7e5e4'}`,
        background: active ? '#FEF9E7' : '#fff',
        color: active ? '#92400E' : '#78716c', cursor: 'pointer',
    };
}
