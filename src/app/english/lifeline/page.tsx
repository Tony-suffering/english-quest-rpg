'use client';

// THE LIFELINE — アメリカ一生分の窓口台帳。
// 上=幕の帯(人生の順)、下=窓口カード。カードを開くと必須6文が出る。
// 設計方針は tonio-world と同じく「清潔」。情報を詰めず、縦に一本の線で読ませる。

import { useMemo, useState } from 'react';
import Link from 'next/link';
import WorldMapButton from '@/components/english/WorldMapButton';
import { patternProgress, patternsByFn } from '@/data/english/lifeline/patterns';
import {
    ACTS, STATIONS, coverage, allPhrases, castOf, getAct, PROTAGONIST, TOWN,
    bankProgress, fullPhrases, bankOf, acousticsFor,
    type ActId, type Station,
} from '@/data/english/tonio-lifeline';

const INK = '#1c1917';
const MUTED = '#78716c';
const LINE = '#e7e5e4';
const GOLD = '#B8941E';
const PAPER = '#F7F5EF';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";

type Mode = 'patterns' | 'ledger' | 'phrases';

export default function LifelinePage() {
    const [mode, setMode] = useState<Mode>('patterns');
    const [act, setAct] = useState<ActId | 'all'>('all');
    const [open, setOpen] = useState<number | null>(null);
    const [onlyOpen, setOnlyOpen] = useState(false);
    const [q, setQ] = useState('');
    // 0 = 窓口順のまま。押すたびに増やして再シャッフルする(SSR とずれないよう初期は 0)
    const [shuffle, setShuffle] = useState(0);

    const cov = useMemo(() => coverage(), []);
    const phrases = useMemo(() => allPhrases(), []);
    const bank = useMemo(() => bankProgress(), []);
    const pat = useMemo(() => patternProgress(), []);

    const stations = useMemo(() => {
        let list = STATIONS;
        if (act !== 'all') list = list.filter(s => s.act === act);
        if (onlyOpen) list = list.filter(s => !s.built);
        const key = q.trim().toLowerCase();
        if (key) {
            list = list.filter(s =>
                s.en.toLowerCase().includes(key) || s.ja.includes(q.trim())
                || s.place.toLowerCase().includes(key)
                || s.phrases.some(p => p.en.toLowerCase().includes(key) || p.ja.includes(q.trim()))
            );
        }
        return list;
    }, [act, onlyOpen, q]);

    const shownPhrases = useMemo(() => {
        let list = phrases;
        if (act !== 'all') list = list.filter(p => p.act === act);
        const key = q.trim().toLowerCase();
        if (key) list = list.filter(p => p.en.toLowerCase().includes(key) || p.ja.includes(q.trim()) || p.note.includes(q.trim()));
        // shuffle > 0 のときだけ無作為に並べ替える。
        // 順番に意味は無いので、ここが本来の使い方になる。
        if (shuffle > 0) {
            const a = [...list];
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }
        return list;
    }, [phrases, act, q, shuffle]);

    return (
        <div style={{ background: PAPER, minHeight: '100vh' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '36px 16px 90px', color: INK }}>

                {/* ===== 題字 ===== */}
                <div style={{ textAlign: 'center', marginBottom: 22 }}>
                    <div style={{ fontSize: 11, letterSpacing: 6, color: GOLD, fontWeight: 800 }}>TONIO WORLD — THE LIFELINE</div>
                    <h1 style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 900, margin: '6px 0 10px', letterSpacing: 3 }}>
                        アメリカ一生分
                    </h1>
                    <p style={{ fontSize: 13.5, color: MUTED, lineHeight: 2, margin: 0 }}>
                        生まれてから死ぬまでの経験を、全部英語で通す。だから英語が全部揃う。<br />
                        これは表ではなく <strong style={{ color: INK }}>{PROTAGONIST.name} の一生</strong>である。
                        {TOWN} で生まれ、この町で死ぬ。<br />
                        {STATIONS.length}の窓口は彼が通る{STATIONS.length}の日で、147人の町民がそこを横切っていく。
                    </p>
                    <div style={{
                        marginTop: 12, display: 'inline-block', textAlign: 'left',
                        background: '#fff', border: `1px solid ${LINE}`, borderRadius: 10,
                        padding: '10px 14px', fontSize: 12, color: '#57534e', lineHeight: 1.9,
                    }}>
                        <div style={{ fontSize: 10.5, letterSpacing: 2, color: GOLD, fontWeight: 800, marginBottom: 4 }}>視点は途中で移る</div>
                        第1-2幕は Ken と Yuko の英語(移民の親。事故が多い)。<br />
                        第3幕から {PROTAGONIST.name} 本人の英語。第8幕では彼が Flo の店で一番年上になっている。
                    </div>
                </div>

                {/* ===== 台帳の数字 ===== */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10,
                    marginBottom: 22,
                }}>
                    <Stat label="窓口" value={String(cov.total)} sub="人生の順" />
                    <Stat label="表現" value={bank.total.toLocaleString()} sub={`目標 ${bank.goal.toLocaleString()} / ${bank.pct}%`} />
                    <Stat label="必須文" value={String(bank.core)} sub="1窓口6文" />
                    <Stat label="既存シナリオ" value={String(cov.built)} sub={`被覆 ${cov.pct}%`} />
                </div>

                {/* ===== 幕ごとの被覆(地図の穴を見せる) ===== */}
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 12, padding: '14px 16px', marginBottom: 22 }}>
                    <div style={{ fontSize: 11, letterSpacing: 3, color: MUTED, fontWeight: 800, marginBottom: 10 }}>被覆 — どこに穴があるか</div>
                    {cov.byAct.map(({ act: a, total, built }) => (
                        <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                            <div style={{ width: 86, fontSize: 11.5, fontWeight: 800, color: a.color, flexShrink: 0 }}>{a.ja}</div>
                            <div style={{ flex: 1, height: 8, background: '#F1EFE9', borderRadius: 999, overflow: 'hidden' }}>
                                <div style={{ width: `${(built / total) * 100}%`, height: '100%', background: a.color }} />
                            </div>
                            <div style={{ width: 46, textAlign: 'right', fontSize: 11, color: MUTED, flexShrink: 0 }}>{built}/{total}</div>
                        </div>
                    ))}
                </div>

                {/* ===== 操作 ===== */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
                    <Toggle on={mode === 'patterns'} onClick={() => setMode('patterns')}>型 {pat.total}</Toggle>
                    <Toggle on={mode === 'ledger'} onClick={() => setMode('ledger')}>窓口台帳</Toggle>
                    <Toggle on={mode === 'phrases'} onClick={() => setMode('phrases')}>全{phrases.length}文</Toggle>
                    {mode === 'ledger' && (
                        <Toggle on={onlyOpen} onClick={() => setOnlyOpen(v => !v)}>空席だけ</Toggle>
                    )}
                    {mode === 'phrases' && (
                        <Toggle on={shuffle > 0} onClick={() => setShuffle(n => n + 1)}>
                            {shuffle > 0 ? 'もう一度シャッフル' : 'ランダムに引く'}
                        </Toggle>
                    )}
                    {mode === 'phrases' && shuffle > 0 && (
                        <Toggle on={false} onClick={() => setShuffle(0)}>窓口順に戻す</Toggle>
                    )}
                    <input
                        value={q} onChange={e => setQ(e.target.value)}
                        placeholder="窓口・英文・日本語で検索"
                        style={{
                            flex: 1, minWidth: 160, border: `1px solid ${LINE}`, borderRadius: 999,
                            padding: '7px 14px', fontSize: 12.5, background: '#fff', color: INK, outline: 'none',
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 22 }}>
                    <Chip on={act === 'all'} color={INK} onClick={() => setAct('all')}>全幕</Chip>
                    {ACTS.map(a => (
                        <Chip key={a.id} on={act === a.id} color={a.color} onClick={() => setAct(a.id)}>
                            {a.ja} <span style={{ opacity: 0.6, fontWeight: 600 }}>{a.age}</span>
                        </Chip>
                    ))}
                </div>

                {/* ===== 本体 ===== */}
                {mode === 'patterns' ? (
                    <div>
                        <div style={{
                            background: '#fff', border: `1px solid ${LINE}`, borderRadius: 12,
                            padding: '14px 16px', marginBottom: 16, fontSize: 12.5, color: '#57534e', lineHeight: 2,
                        }}>
                            <div style={{ fontSize: 10.5, letterSpacing: 3, color: GOLD, fontWeight: 800, marginBottom: 6 }}>
                                層1 — 型(有限)
                            </div>
                            文をいくら集めても、覚えた文しか出てこない。話者が持っているのは文の一覧ではなく、
                            <strong style={{ color: INK }}>スロット付きの型</strong>と、そこに刺す語彙である。
                            型は会話を回すぶんなら千数百で<strong style={{ color: INK }}>有限</strong>。中身が数万。
                            <br />
                            進捗は「何文集めたか」ではなく<strong style={{ color: INK }}>「何個の型が、何場面で発火したか」</strong>で測る。
                            <div style={{ marginTop: 8, display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 12 }}>
                                <span>型 <strong style={{ color: INK }}>{pat.total}</strong> / 目標 {pat.goal}({pat.pct}%)</span>
                                <span>結線した窓口 <strong style={{ color: INK }}>{pat.stationsWired}</strong></span>
                                <span>1型あたり平均 <strong style={{ color: INK }}>{pat.avgStationsPerPattern}</strong> 場面</span>
                            </div>
                        </div>

                        {pat.byFn.map(g => (
                            <div key={g.fn} style={{ marginBottom: 20 }}>
                                <div style={{ fontSize: 11, letterSpacing: 3, color: MUTED, fontWeight: 800, marginBottom: 8 }}>
                                    {g.label.toUpperCase()} — {g.label} · {g.count}
                                </div>
                                {patternsByFn(g.fn).map(p => (
                                    <div key={p.id} style={{
                                        background: '#fff', border: `1px solid ${LINE}`, borderRadius: 12,
                                        padding: '13px 15px', marginBottom: 8,
                                    }}>
                                        <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                                            <code style={{
                                                fontSize: 15, fontWeight: 800, color: INK,
                                                background: '#F5F5F4', padding: '2px 8px', borderRadius: 6,
                                            }}>{p.frame}</code>
                                            <span style={{ fontSize: 12, color: '#57534e' }}>{p.ja}</span>
                                            <span style={{
                                                fontSize: 10, fontWeight: 800, borderRadius: 999, padding: '2px 7px',
                                                color: p.freq === 'core' ? '#047857' : p.freq === 'common' ? '#92400E' : '#57534e',
                                                background: p.freq === 'core' ? '#ECFDF5' : p.freq === 'common' ? '#FFFBEB' : '#F5F5F4',
                                            }}>{p.freq}</span>
                                        </div>
                                        <div style={{ marginTop: 7, fontSize: 12, lineHeight: 1.9 }}>
                                            <div><span style={{ color: GOLD, fontWeight: 800 }}>いつ撃つか</span> <span style={{ color: '#44403c' }}>{p.trigger}</span></div>
                                            <div style={{ color: MUTED, marginTop: 2 }}><span style={{ fontWeight: 800 }}>スロット</span> {p.slots}</div>
                                            {p.trap && <div style={{ color: '#B3372B', marginTop: 2 }}><span style={{ fontWeight: 800 }}>やりがち</span> {p.trap}</div>}
                                        </div>
                                        <div style={{ marginTop: 7, borderTop: `1px solid ${LINE}`, paddingTop: 7 }}>
                                            {p.examples.map((ex, i) => (
                                                <div key={i} style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.7 }}>{ex}</div>
                                            ))}
                                        </div>
                                        <div style={{ marginTop: 6, fontSize: 11, color: MUTED }}>
                                            発火する窓口: {p.stations.join(' / ')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : mode === 'ledger' ? (
                    <div>
                        {act !== 'all' && <ActHeader actId={act} />}
                        {stations.length === 0 && (
                            <div style={{ textAlign: 'center', color: MUTED, fontSize: 13, padding: '40px 0' }}>該当なし</div>
                        )}
                        {stations.map((s, i) => {
                            const prev = stations[i - 1];
                            const showBand = act === 'all' && (!prev || prev.act !== s.act);
                            return (
                                <div key={s.no}>
                                    {showBand && <ActHeader actId={s.act} />}
                                    <StationCard
                                        station={s}
                                        open={open === s.no}
                                        onToggle={() => setOpen(open === s.no ? null : s.no)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 12, overflow: 'hidden' }}>
                        {shownPhrases.map((p, i) => (
                            <div key={`${p.stationNo}-${i}`} style={{ padding: '12px 16px', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                                <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: 10.5, color: getAct(p.act).color, fontWeight: 800, flexShrink: 0 }}>
                                        {String(p.stationNo).padStart(2, '0')} {p.stationJa}
                                    </span>
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 700, margin: '4px 0 2px', lineHeight: 1.5 }}>{p.en}</div>
                                <div style={{ fontSize: 12.5, color: '#57534e' }}>{p.ja}</div>
                                <div style={{ fontSize: 11.5, color: MUTED, marginTop: 3, lineHeight: 1.7 }}>{p.note}</div>
                            </div>
                        ))}
                        {shownPhrases.length === 0 && (
                            <div style={{ textAlign: 'center', color: MUTED, fontSize: 13, padding: '40px 0' }}>該当なし</div>
                        )}
                    </div>
                )}

                {/* ===== 足元 ===== */}
                <div style={{ marginTop: 34, paddingTop: 18, borderTop: `1px solid ${LINE}`, display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 12.5 }}>
                    <Link href="/english/ridgeway" style={{ color: GOLD, fontWeight: 700, textDecoration: 'none' }}>町民名鑑 147人</Link>
                    <Link href="/english/requiem" style={{ color: GOLD, fontWeight: 700, textDecoration: 'none' }}>レクイエム 既存23シナリオ</Link>
                    <Link href="/english/town" style={{ color: GOLD, fontWeight: 700, textDecoration: 'none' }}>今日の町</Link>
                </div>
            </div>
            <WorldMapButton />
        </div>
    );
}

// ============================================================

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
    return (
        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontSize: 10.5, letterSpacing: 2, color: MUTED, fontWeight: 800 }}>{label}</div>
            <div style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 900, lineHeight: 1.2 }}>{value}</div>
            <div style={{ fontSize: 11, color: MUTED }}>{sub}</div>
        </div>
    );
}

function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button onClick={onClick} style={{
            border: `1px solid ${on ? INK : LINE}`, background: on ? INK : '#fff', color: on ? '#fff' : INK,
            borderRadius: 999, padding: '7px 14px', fontSize: 12, fontWeight: 800, cursor: 'pointer',
        }}>{children}</button>
    );
}

function Chip({ on, color, onClick, children }: { on: boolean; color: string; onClick: () => void; children: React.ReactNode }) {
    return (
        <button onClick={onClick} style={{
            border: `1px solid ${on ? color : LINE}`, background: on ? color : '#fff', color: on ? '#fff' : color,
            borderRadius: 999, padding: '6px 12px', fontSize: 11.5, fontWeight: 800, cursor: 'pointer',
        }}>{children}</button>
    );
}

function ActHeader({ actId }: { actId: ActId }) {
    const a = getAct(actId);
    return (
        <div style={{ margin: '26px 0 12px', paddingLeft: 2 }}>
            <div style={{ fontSize: 10.5, letterSpacing: 4, color: a.color, fontWeight: 800 }}>
                ACT {a.no} — {a.en} · {a.age}
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 900, margin: '2px 0 4px' }}>{a.ja}</div>
            <div style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.9 }}>{a.line}</div>
        </div>
    );
}

function StationCard({ station: s, open, onToggle }: { station: Station; open: boolean; onToggle: () => void }) {
    const a = getAct(s.act);
    const cast = castOf(s);
    return (
        <div style={{
            background: '#fff', border: `1px solid ${open ? a.color : LINE}`, borderRadius: 12,
            marginBottom: 8, overflow: 'hidden',
        }}>
            <button onClick={onToggle} style={{
                width: '100%', textAlign: 'left', background: 'none', border: 'none',
                padding: '14px 16px', cursor: 'pointer', display: 'flex', gap: 12, alignItems: 'flex-start',
            }}>
                <div style={{
                    fontFamily: SERIF, fontSize: 19, fontWeight: 900, color: a.color,
                    width: 30, flexShrink: 0, lineHeight: 1.2,
                }}>{String(s.no).padStart(2, '0')}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 15, fontWeight: 800 }}>{s.ja}</span>
                        <span style={{ fontSize: 11.5, color: MUTED, fontWeight: 600 }}>{s.en}</span>
                        {s.built ? (
                            <span style={{
                                fontSize: 10, fontWeight: 800, color: '#047857', background: '#ECFDF5',
                                border: '1px solid #A7F3D0', borderRadius: 999, padding: '2px 8px',
                            }}>#{s.built.no} 作成済</span>
                        ) : (
                            <span style={{
                                fontSize: 10, fontWeight: 800, color: '#92400E', background: '#FFFBEB',
                                border: '1px solid #FDE68A', borderRadius: 999, padding: '2px 8px',
                            }}>空席</span>
                        )}
                    </div>
                    <div style={{ fontSize: 11.5, color: MUTED, marginTop: 3 }}>
                        {s.age} · {s.place}
                    </div>
                    {!open && (
                        <div style={{ fontSize: 12.5, color: '#57534e', marginTop: 5, lineHeight: 1.8 }}>{s.what}</div>
                    )}
                </div>
                <div style={{ fontSize: 11, color: MUTED, flexShrink: 0, paddingTop: 4 }}>{open ? '閉じる' : '開く'}</div>
            </button>

            {open && (
                <div style={{ padding: '0 16px 18px 58px' }}>
                    <div style={{ fontSize: 13, color: '#44403c', lineHeight: 1.95, marginBottom: 12 }}>{s.what}</div>

                    <div style={{ display: 'grid', gap: 8, marginBottom: 14 }}>
                        <Note label="日本人が必ずやること" body={s.trap} color="#B3372B" />
                    </div>

                    <div style={{
                        background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 10,
                        padding: '10px 13px', marginBottom: 10,
                    }}>
                        <div style={{ fontSize: 10.5, letterSpacing: 2, color: '#075985', fontWeight: 800, marginBottom: 4 }}>
                            音響条件 — この窓口の音はこう壊れている
                        </div>
                        {acousticsFor(s).map(ac => (
                            <div key={ac.id} style={{ marginTop: 5 }}>
                                <span style={{ fontSize: 12.5, fontWeight: 800, color: '#0C4A6E' }}>{ac.ja}</span>
                                <span style={{ fontSize: 11.5, color: '#0369A1', marginLeft: 8 }}>{ac.signal}</span>
                                <div style={{ fontSize: 11.5, color: '#075985', lineHeight: 1.8 }}>{ac.why}</div>
                                <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.8 }}>鍛えるもの: {ac.trains}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 10,
                        padding: '10px 13px', marginBottom: 14,
                    }}>
                        <div style={{ fontSize: 10.5, letterSpacing: 2, color: '#92400E', fontWeight: 800, marginBottom: 3 }}>
                            この窓口で落ちた爆弾
                        </div>
                        <div style={{ fontSize: 12.5, color: '#78350F', lineHeight: 1.9 }}>{s.bomb}</div>
                    </div>

                    {cast.length > 0 && (
                        <div style={{ marginBottom: 14 }}>
                            <div style={{ fontSize: 10.5, letterSpacing: 2, color: MUTED, fontWeight: 800, marginBottom: 6 }}>ここにいる人</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                                {cast.map(p => (
                                    <span key={p.id} title={p.role} style={{
                                        fontSize: 11, border: `1px solid ${LINE}`, borderRadius: 999,
                                        padding: '3px 9px', color: '#57534e', background: '#FAFAF9',
                                    }}>{p.name}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ fontSize: 10.5, letterSpacing: 2, color: MUTED, fontWeight: 800, marginBottom: 6 }}>
                        通過に必要な6文
                        {bankOf(s).length > 0 && (
                            <span style={{ marginLeft: 8, color: a.color }}>
                                + 表現バンク {bankOf(s).length}
                            </span>
                        )}
                    </div>
                    <div style={{ border: `1px solid ${LINE}`, borderRadius: 10, overflow: 'hidden' }}>
                        {fullPhrases(s).map((p, i) => (
                            <div key={i} style={{ padding: '10px 13px', borderTop: i === 0 ? 'none' : `1px solid ${LINE}`, background: i % 2 ? '#FCFCFB' : '#fff' }}>
                                <div style={{ fontSize: 14.5, fontWeight: 700, lineHeight: 1.5 }}>{p.en}</div>
                                <div style={{ fontSize: 12.5, color: '#57534e', marginTop: 2 }}>{p.ja}</div>
                                <div style={{ fontSize: 11.5, color: MUTED, marginTop: 3, lineHeight: 1.7 }}>{p.note}</div>
                            </div>
                        ))}
                    </div>

                    {s.built && (
                        <div style={{ marginTop: 12, fontSize: 12 }}>
                            <Link href="/english/requiem" style={{ color: GOLD, fontWeight: 700, textDecoration: 'none' }}>
                                レクイエム #{s.built.no} {s.built.title} を読む
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function Note({ label, body, color }: { label: string; body: string; color: string }) {
    return (
        <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 10 }}>
            <div style={{ fontSize: 10.5, letterSpacing: 2, color, fontWeight: 800 }}>{label}</div>
            <div style={{ fontSize: 12.5, color: '#44403c', lineHeight: 1.85, marginTop: 2 }}>{body}</div>
        </div>
    );
}
