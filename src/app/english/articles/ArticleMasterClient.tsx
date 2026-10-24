'use client';

import { useMemo, useState } from 'react';
import {
    THREE_RULES,
    ROOT_LINE,
    MEANING_PRINCIPLE,
    SIGNATURE,
    CATALOG,
    CLASSES,
    type WordSection,
} from '@/data/english/article-mastery';

const GOLD = '#D4AF37';
const GREEN = '#10B981';
const INK = '#1c1917';
const SUB = '#57534e';
const LINE = '#e7e5e4';

// セクション別の色
const SECTION_COLOR: Record<string, { bg: string; bd: string; fg: string; chip: string }> = {
    bare: { bg: '#f0fdf4', bd: '#bbf7d0', fg: '#15803d', chip: '#dcfce7' },
    the: { bg: '#fffbeb', bd: '#fde68a', fg: '#b45309', chip: '#fef3c7' },
    a: { bg: '#eff6ff', bd: '#bfdbfe', fg: '#1d4ed8', chip: '#dbeafe' },
};

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
    return (
        <div style={{
            background: '#fff', border: `1px solid ${LINE}`, borderRadius: 16, padding: 24,
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)', ...style,
        }}>{children}</div>
    );
}

export default function ArticleMasterClient() {
    const [q, setQ] = useState('');
    const query = q.trim().toLowerCase();

    // 検索: 単語を横断フィルタ
    const filtered = useMemo<WordSection[]>(() => {
        if (!query) return CATALOG;
        return CATALOG.map(sec => ({
            ...sec,
            groups: sec.groups
                .map(g => ({
                    ...g,
                    items: g.items.filter(it =>
                        it.en.toLowerCase().includes(query) || it.jp.includes(q.trim())),
                }))
                .filter(g => g.items.length > 0),
        })).filter(sec => sec.groups.length > 0);
    }, [query, q]);

    const totalWords = useMemo(
        () => CATALOG.reduce((n, s) => n + s.groups.reduce((m, g) => m + g.items.length, 0), 0),
        []);

    return (
        <main style={{ maxWidth: 880, margin: '0 auto', padding: '40px 20px 96px', color: INK }}>
            {/* HERO */}
            <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: GOLD, letterSpacing: 3, marginBottom: 10 }}>
                    冠詞 a / the 撲滅
                </div>
                <h1 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.25, margin: '0 0 14px', letterSpacing: 0.5 }}>
                    抽象・物質は、裸。
                </h1>
                <p style={{ fontSize: 15, color: SUB, lineHeight: 1.9, margin: 0 }}>
                    {ROOT_LINE.body} 冠詞で迷う単語は無限じゃない。常連を顔で覚える、ただのカタログ。
                </p>
            </div>

            {/* フローチャート(印刷用) */}
            <Flowchart />

            {/* 3行ルール */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 28 }}>
                {THREE_RULES.map(r => {
                    const c = SECTION_COLOR[r.color];
                    return (
                        <div key={r.color} style={{ background: c.bg, border: `1px solid ${c.bd}`, borderRadius: 14, padding: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                <span style={{ fontSize: 13, fontWeight: 900, color: '#fff', background: c.fg, borderRadius: 6, padding: '2px 10px' }}>
                                    {r.article}
                                </span>
                                <span style={{ fontSize: 14.5, fontWeight: 800, color: INK }}>{r.rule}</span>
                            </div>
                            <div style={{ fontSize: 12.5, color: SUB, lineHeight: 1.7 }}>{r.detail}</div>
                        </div>
                    );
                })}
            </div>

            {/* マスターキー: 意味で冠詞が変わる */}
            <div style={{ marginBottom: 20, background: '#1c1917', borderRadius: 14, padding: 18 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: GOLD, marginBottom: 6 }}>
                    マスターキー — {MEANING_PRINCIPLE.headline}
                </div>
                <div style={{ fontSize: 12.5, color: '#d6d3d1', lineHeight: 1.75, marginBottom: 12 }}>
                    {MEANING_PRINCIPLE.body}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8 }}>
                    {MEANING_PRINCIPLE.rows.map((r, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#292524', borderRadius: 8, padding: '8px 12px' }}>
                            <span style={{ fontSize: 12.5, color: '#86efac', fontWeight: 700 }}>{r.bare}</span>
                            <span style={{ fontSize: 12, color: '#78716c' }}>／</span>
                            <span style={{ fontSize: 12.5, color: '#fcd34d', fontWeight: 700 }}>{r.plural}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 型で読める不可算 */}
            <div style={{ marginBottom: 28, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: 18 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#15803d', marginBottom: 4 }}>
                    覚えなくていい不可算（型で読める）
                </div>
                <div style={{ fontSize: 12.5, color: SUB, lineHeight: 1.7, marginBottom: 12 }}>
                    下のリストは「理屈じゃ読めない罠の不可算」。この6つの型に当てはまる語は、1個ずつ覚えなくても「不可算だな」と読める。
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 8 }}>
                    {CLASSES.map(c => (
                        <div key={c.tag} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 10, padding: '10px 12px' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                                <span style={{ fontSize: 13, fontWeight: 900, color: '#15803d', fontFamily: 'monospace' }}>{c.tag}</span>
                                <span style={{ fontSize: 11.5, color: '#a8a29e' }}>{c.note}</span>
                            </div>
                            <div style={{ fontSize: 12.5, color: INK, marginTop: 3 }}>{c.ex}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 検索 */}
            <div style={{ marginBottom: 24 }}>
                <input
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    placeholder={`単語を引く（英語 or 日本語）— 全${totalWords}語`}
                    style={{
                        width: '100%', padding: '14px 18px', fontSize: 15, borderRadius: 12,
                        border: `1px solid ${LINE}`, background: '#fff', color: INK, outline: 'none',
                        boxSizing: 'border-box',
                    }}
                />
            </div>

            {/* カタログ本体 */}
            {filtered.length === 0 && (
                <Card style={{ textAlign: 'center', color: SUB, fontSize: 14 }}>
                    「{q}」は常連リストにない。ということは、たぶん普通に数えられる名詞。a / 複数で素直に。
                </Card>
            )}

            {filtered.map(sec => {
                const c = SECTION_COLOR[sec.key];
                return (
                    <div key={sec.key} style={{ marginBottom: 28 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
                            <span style={{ fontSize: 18, fontWeight: 900, color: '#fff', background: c.fg, borderRadius: 8, padding: '4px 14px' }}>
                                {sec.article}
                            </span>
                            <h2 style={{ fontSize: 18, fontWeight: 800, color: INK, margin: 0 }}>{sec.headline}</h2>
                        </div>
                        <p style={{ fontSize: 13, color: SUB, lineHeight: 1.7, margin: '0 0 14px' }}>{sec.rule}</p>

                        <div style={{ display: 'grid', gap: 14 }}>
                            {sec.groups.map(g => (
                                <div key={g.label} style={{ border: `1px solid ${c.bd}`, borderRadius: 14, overflow: 'hidden' }}>
                                    <div style={{ padding: '10px 16px', background: c.bg, borderBottom: `1px solid ${c.bd}`, fontSize: 13, fontWeight: 800, color: c.fg }}>
                                        {g.label}
                                    </div>
                                    <div style={{ padding: 8 }}>
                                        {g.items.map(it => (
                                            <div key={it.en} style={{
                                                display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 10,
                                                padding: '9px 10px', borderRadius: 8,
                                            }}>
                                                <span style={{ fontSize: 15, fontWeight: 800, color: INK, minWidth: 140 }}>{it.en}</span>
                                                <span style={{ fontSize: 13, color: SUB }}>{it.jp}</span>
                                                {it.trap && (
                                                    <span style={{
                                                        marginLeft: 'auto', fontSize: 11.5, fontWeight: 700, color: '#b45309',
                                                        background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 6, padding: '3px 9px',
                                                    }}>
                                                        注 {it.trap}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}

            {/* あんたのクセ */}
            {!query && (
                <Card style={{ marginTop: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: GOLD, letterSpacing: 2, border: `1px solid ${GOLD}`, borderRadius: 6, padding: '3px 8px' }}>
                            実データ
                        </span>
                        <h2 style={{ fontSize: 18, fontWeight: 800, color: INK, margin: 0 }}>あんたのクセは3つだけ</h2>
                    </div>
                    <div style={{ display: 'grid', gap: 12 }}>
                        {SIGNATURE.map(s => (
                            <div key={s.key} style={{ border: `1px solid ${LINE}`, borderRadius: 12, padding: 14 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: 12, fontWeight: 900, color: '#fff', background: GOLD, borderRadius: 6, padding: '2px 8px' }}>型 #{s.rank}</span>
                                    <span style={{ fontSize: 15, fontWeight: 800 }}>{s.name}</span>
                                    <span style={{ fontSize: 12, color: GREEN, fontWeight: 700 }}>→ {s.fix}</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {s.realErrors.map((e, i) => (
                                        <span key={i} style={{ fontSize: 12.5, background: '#fafaf9', border: `1px solid ${LINE}`, borderRadius: 8, padding: '5px 10px' }}>
                                            <span style={{ color: '#b91c1c', textDecoration: 'line-through' }}>{e.said}</span>
                                            <span style={{ color: '#bbb', margin: '0 6px' }}>→</span>
                                            <span style={{ color: '#15803d', fontWeight: 700 }}>{e.right}</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </main>
    );
}

// ───────── フローチャート(印刷用) ─────────
function FBox({ children, accent, style }: { children: React.ReactNode; accent?: boolean; style?: React.CSSProperties }) {
    return (
        <div style={{
            border: `2px solid ${accent ? GOLD : '#d6d3d1'}`,
            background: accent ? '#fffbeb' : '#fff',
            borderRadius: 10, padding: '10px 14px', textAlign: 'center',
            fontSize: 14, fontWeight: 800, color: INK, lineHeight: 1.5,
            ...style,
        }}>{children}</div>
    );
}

function FArrow({ label }: { label?: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4px 0' }}>
            {label && <span style={{ fontSize: 11, fontWeight: 800, color: '#78716c', marginBottom: 2 }}>{label}</span>}
            <span style={{ color: '#a8a29e', fontSize: 14, lineHeight: 1 }}>↓</span>
        </div>
    );
}

function FLeaf({ result, ex, color }: { result: string; ex: string; color: 'bare' | 'the' | 'a' | 'plural' }) {
    const map = {
        bare: { bg: '#dcfce7', bd: '#86efac', fg: '#15803d' },
        the: { bg: '#fef3c7', bd: '#fcd34d', fg: '#b45309' },
        a: { bg: '#dbeafe', bd: '#93c5fd', fg: '#1d4ed8' },
        plural: { bg: '#ede9fe', bd: '#c4b5fd', fg: '#6d28d9' },
    }[color];
    return (
        <div style={{ background: map.bg, border: `2px solid ${map.bd}`, borderRadius: 10, padding: '10px 12px', textAlign: 'center', minWidth: 120 }}>
            <div style={{ fontSize: 15, fontWeight: 900, color: map.fg }}>{result}</div>
            <div style={{ fontSize: 12, color: '#57534e', marginTop: 3, fontFamily: 'monospace' }}>{ex}</div>
        </div>
    );
}

function Flowchart() {
    return (
        <div id="article-flowchart" style={{
            border: `1px solid ${LINE}`, borderRadius: 16, padding: 22, marginBottom: 28,
            background: '#fafaf9', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
            {/* 印刷用スタイル: この図だけ印刷 */}
            <style>{`@media print {
                body * { visibility: hidden !important; }
                #article-flowchart, #article-flowchart * { visibility: visible !important; }
                #article-flowchart { position: absolute; left: 0; top: 0; width: 100%; border: none !important; background: #fff !important; box-shadow: none !important; }
                #article-flowchart .no-print { display: none !important; }
            }`}</style>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ fontSize: 17, fontWeight: 900, color: INK }}>名詞を見たら、これを上から追うだけ</div>
                <button onClick={() => window.print()} className="no-print" style={{
                    fontSize: 12, fontWeight: 700, color: '#fff', background: GOLD, border: 'none',
                    borderRadius: 8, padding: '7px 14px', cursor: 'pointer',
                }}>この図を印刷</button>
            </div>

            <div style={{ maxWidth: 560, margin: '0 auto' }}>
                <FBox>名詞が来た</FBox>
                <FArrow />
                <FBox accent>① 数えられる？<br /><span style={{ fontSize: 12, fontWeight: 600, color: SUB }}>「1個・2個」って言える？</span></FBox>

                {/* 2分岐 */}
                <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
                    {/* NO = 不可算 */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <FArrow label="NO ＝ 抽象・物質" />
                        <FBox style={{ fontSize: 12.5, borderColor: '#86efac', background: '#f0fdf4' }}>
                            morality, water,<br />advice, furniture
                        </FBox>
                        <FArrow />
                        <FBox accent>② どれか決まる？<br /><span style={{ fontSize: 11, fontWeight: 600, color: SUB }}>2回目・of で限定</span></FBox>
                        <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
                            <div><div style={{ fontSize: 10.5, fontWeight: 800, color: '#78716c', textAlign: 'center', marginBottom: 3 }}>YES</div><FLeaf result="the ＋ 名詞" ex="the morality of war" color="the" /></div>
                            <div><div style={{ fontSize: 10.5, fontWeight: 800, color: '#78716c', textAlign: 'center', marginBottom: 3 }}>NO</div><FLeaf result="名詞だけ（裸）" ex="morality / water" color="bare" /></div>
                        </div>
                    </div>

                    {/* YES = 可算 */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <FArrow label="YES ＝ 数えられる" />
                        <FBox style={{ fontSize: 12.5, borderColor: '#93c5fd', background: '#eff6ff' }}>
                            cat, idea,<br />problem, book
                        </FBox>
                        <FArrow />
                        <FBox accent>③ どれか決まる？</FBox>
                        <div style={{ marginTop: 8 }}>
                            <div style={{ fontSize: 10.5, fontWeight: 800, color: '#78716c', textAlign: 'center', marginBottom: 3 }}>YES</div>
                            <FLeaf result="the ＋ 名詞" ex="the cat" color="the" />
                        </div>
                        <FArrow label="NO" />
                        <FBox accent>④ 1個？</FBox>
                        <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
                            <div><div style={{ fontSize: 10.5, fontWeight: 800, color: '#78716c', textAlign: 'center', marginBottom: 3 }}>1個</div><FLeaf result="a / an ＋ 名詞" ex="a cat" color="a" /></div>
                            <div><div style={{ fontSize: 10.5, fontWeight: 800, color: '#78716c', textAlign: 'center', marginBottom: 3 }}>複数</div><FLeaf result="名詞 ＋ s" ex="cats" color="plural" /></div>
                        </div>
                    </div>
                </div>

                {/* 結論 */}
                <div style={{ marginTop: 18, padding: '12px 14px', background: '#1c1917', borderRadius: 10, textAlign: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#fafaf9', lineHeight: 1.7 }}>
                        ①さえ即答できれば終わり。<span style={{ color: GOLD }}>「数えそうで数えない罠」</span>（information, advice, furniture…）だけ顔で覚えろ。
                    </span>
                </div>
            </div>
        </div>
    );
}
