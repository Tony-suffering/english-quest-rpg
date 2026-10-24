'use client';

/**
 * THEME 30 -- 30のテーマと24の言い回しで、試験の全部を持つ。
 *
 * 画面は3つ:
 *   MOVES  24の言い回し。磨き抜く本体。各ムーブに「覚える根拠」と使用回数
 *   THEMES 30テーマ。全行にムーブタグ(=この行を覚える根拠)。各ブロックは
 *          1枚のカードとしてトレーニング(/api/phrases)に登録できる
 *   COMBOS 30に無いお題を在庫+新事実1つで組む実演。生成システムの証明
 */

import { useEffect, useMemo, useState } from 'react';
import { EikenOutputNav, EikenOutputDisclaimer } from '@/components/english/EikenOutputChrome';
import { MOVES, MOVE_BY_ID, MOVE_KINDS } from '@/data/english/eiken-moves';
import { THEMES, MOVE_USAGE, TOTAL_CARDS, DAYS_ABSORBED, allLines } from '@/data/english/eiken-theme30';
import { FIELDS, type Theme, type Side, type SpokenLine } from '@/data/english/eiken-theme30-types';
import { COMBOS } from '@/data/english/eiken-combos';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const BODY = '#44403C';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';
const PAPER = '#FAF8F2';

const REG_KEY = 'theme30-registered-v1';

function todayStr() {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export default function Theme30Page() {
    const [view, setView] = useState<'moves' | 'themes' | 'combos'>('themes');
    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(REG_KEY);
            if (raw) setRegistered(new Set(JSON.parse(raw)));
        } catch { /* 印が読めなくても登録はやり直せる */ }
    }, []);

    const register = async (en: string, ja: string, key: string) => {
        setBusy(key);
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english: en, japanese: ja, category: 'expression', date: todayStr() }),
            });
            if (res.ok || res.status === 409) {
                setRegistered((prev) => {
                    const next = new Set(prev);
                    next.add(key);
                    try { localStorage.setItem(REG_KEY, JSON.stringify([...next])); } catch { /* 印だけ */ }
                    return next;
                });
            }
        } catch { /* 失敗しても押し直せる */ }
        setBusy(null);
    };

    return (
        <div style={{ minHeight: '100vh', background: PAPER }}>
            <EikenOutputNav active="theme30" />
            <div style={{ maxWidth: '860px', margin: '0 auto', padding: '28px 16px 40px' }}>
                <Hero />
                <Tabs view={view} setView={setView} />
                <div style={{ marginTop: '18px' }}>
                    {view === 'moves' && <MovesView />}
                    {view === 'themes' && (
                        <ThemesView registered={registered} busy={busy} onRegister={register} />
                    )}
                    {view === 'combos' && <CombosView />}
                </div>
            </div>
            <EikenOutputDisclaimer />
        </div>
    );
}

// ============================================================

function Hero() {
    return (
        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', padding: '22px 20px', marginBottom: '14px' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 900, color: INK, letterSpacing: '1px' }}>
                THEME <span style={{ color: GOLD }}>30</span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: DEEPGOLD, marginTop: '4px' }}>
                30のテーマと24の言い回しで、試験の全部を持つ
            </div>
            <p style={{ margin: '12px 0 0', fontSize: '12.5px', lineHeight: 2, color: BODY }}>
                これだけやれば大丈夫、と言うための根拠を先に置く。
                人間の世界のイベントは30のテーマで尽きる。各テーマは自分が<strong style={{ color: INK }}>世界のどこを担当するか</strong>を宣言していて(owns)、
                30個の宣言を並べると世界が埋まる。試験のお題の言い回しは各テーマが4枚ずつ、計<strong style={{ color: INK }}>{TOTAL_CARDS}枚</strong>吸収している。
                やり終えたライティング30本も、{DAYS_ABSORBED.length}/30 本をどこかのテーマが素材として吸収済みだ。
            </p>
            <p style={{ margin: '10px 0 0', fontSize: '12.5px', lineHeight: 2, color: BODY }}>
                そして本当の暗記対象はテーマではなく<strong style={{ color: INK }}>24の言い回し(ムーブ)</strong>。
                全テーマの全行にムーブタグが付いていて、タグ = その行を覚える根拠だ。根拠のない行はこのパッケージに存在しない。
                30に無いお題が来ても、在庫の部品 + 小さな新事実1つで答えが組める。その実演が「組む」タブにある。
            </p>
            <a
                href="/english/theme30/sheet?day=1"
                style={{
                    display: 'inline-block', marginTop: '14px', padding: '10px 18px', borderRadius: '10px',
                    background: INK, color: '#fff', textDecoration: 'none', fontSize: '12px', fontWeight: 900, letterSpacing: '0.5px',
                }}
            >
                紙で回す(1日1枚・30テーマ×3周=90日)
            </a>
        </div>
    );
}

function Tabs({ view, setView }: { view: string; setView: (v: 'moves' | 'themes' | 'combos') => void }) {
    const tab = (key: 'moves' | 'themes' | 'combos', label: string, sub: string) => {
        const on = view === key;
        return (
            <button key={key} onClick={() => setView(key)} style={{
                flex: 1, padding: '10px 6px', borderRadius: '12px', cursor: 'pointer',
                border: on ? `2px solid ${GOLD}` : `1px solid ${LINE}`,
                background: on ? '#FEF9E7' : '#fff', textAlign: 'center',
            }}>
                <div style={{ fontSize: '12.5px', fontWeight: 900, color: on ? DEEPGOLD : SUB }}>{label}</div>
                <div style={{ fontSize: '10px', color: FAINT, marginTop: '2px' }}>{sub}</div>
            </button>
        );
    };
    return (
        <div style={{ display: 'flex', gap: '8px' }}>
            {tab('moves', 'ムーブ 24', '磨き抜く言い回し')}
            {tab('themes', 'テーマ 30', '世界の担当区')}
            {tab('combos', '組む', '知らないお題を作る実演')}
        </div>
    );
}

// ============================================================

function MoveChips({ ids }: { ids: string[] }) {
    return (
        <span style={{ display: 'inline-flex', gap: '3px', flexWrap: 'wrap', verticalAlign: 'middle' }}>
            {ids.map((id) => {
                const mv = MOVE_BY_ID[id];
                if (!mv) return null;
                return (
                    <span key={id} title={`${mv.sig} -- ${mv.why}`} style={{
                        fontSize: '9px', fontWeight: 900, color: DEEPGOLD, background: '#FEF9E7',
                        border: '1px solid #EBD9A0', borderRadius: '999px', padding: '1px 7px', whiteSpace: 'nowrap',
                    }}>
                        {mv.no} {mv.label}
                    </span>
                );
            })}
        </span>
    );
}

function LineRow({ line }: { line: SpokenLine }) {
    return (
        <div style={{ padding: '7px 0', borderTop: `1px solid ${PAPER}` }}>
            <div style={{ fontSize: '13px', lineHeight: 1.8, color: INK }}>
                {line.en} <MoveChips ids={line.m} />
            </div>
            <div style={{ fontSize: '11px', lineHeight: 1.8, color: SUB, marginTop: '2px' }}>{line.ja}</div>
        </div>
    );
}

// ============================================================

function MovesView() {
    return (
        <div>
            <Note>
                この24本が本当の暗記対象。テーマは的で、ムーブが弾だ。各ムーブの下の数字は
                「30テーマの中で何回働いているか」。使用回数はタグから自動集計している。
                署名の一行(sig)をそのまま口に焼き付け、詰まったら vars の別の出だしへ逃げる。
            </Note>
            {MOVE_KINDS.map((k) => (
                <div key={k.kind} style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 900, color: FAINT, letterSpacing: '1px', margin: '14px 0 8px' }}>
                        {k.label} <span style={{ fontWeight: 700 }}>-- {k.note}</span>
                    </div>
                    {MOVES.filter((m) => m.kind === k.kind).map((m) => (
                        <div key={m.id} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '14px 16px', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 900, color: GOLD }}>
                                    {String(m.no).padStart(2, '0')}
                                </span>
                                <span style={{ fontSize: '13.5px', fontWeight: 900, color: INK }}>{m.label}</span>
                                <span style={{ fontSize: '10px', color: FAINT, fontFamily: 'Georgia, serif' }}>{m.en}</span>
                                <span style={{ marginLeft: 'auto', fontSize: '10.5px', fontWeight: 900, color: DEEPGREEN, background: '#D1FAE5', padding: '2px 8px', borderRadius: '999px' }}>
                                    {MOVE_USAGE[m.id] ?? 0}回働く
                                </span>
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: 800, color: INK, lineHeight: 1.7, marginTop: '9px', fontFamily: 'Georgia, serif' }}>
                                {m.sig}
                            </div>
                            <div style={{ fontSize: '11.5px', color: SUB, marginTop: '3px' }}>{m.sigJa}</div>
                            <div style={{ marginTop: '8px', fontSize: '11.5px', color: BODY, lineHeight: 1.8 }}>
                                {m.vars.map((v, i) => (
                                    <div key={i} style={{ color: SUB, fontStyle: 'italic' }}>-- {v}</div>
                                ))}
                            </div>
                            <div style={{ borderTop: `1px solid ${PAPER}`, marginTop: '9px', paddingTop: '8px', fontSize: '11px', color: BODY, lineHeight: 1.85 }}>
                                <span style={{ fontWeight: 900, color: FAINT }}>いつ: </span>{m.when}
                            </div>
                            <div style={{ fontSize: '11px', color: BODY, lineHeight: 1.85, marginTop: '4px' }}>
                                <span style={{ fontWeight: 900, color: FAINT }}>覚える根拠: </span>{m.why}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

// ============================================================

function ThemesView({
    registered, busy, onRegister,
}: {
    registered: Set<string>; busy: string | null;
    onRegister: (en: string, ja: string, key: string) => void;
}) {
    const [open, setOpen] = useState<number | null>(null);
    const byField = useMemo(() => {
        const map = new Map<string, Theme[]>();
        for (const f of FIELDS) map.set(f.id, []);
        for (const t of THEMES) map.get(t.field)?.push(t);
        return map;
    }, []);

    return (
        <div>
            <Note>
                各テーマの owns が「世界のどこを担当するか」の宣言。開くと 掴み直し / 普遍 / 4つの角度 /
                元エッセイの口語版 / 賛成 / 反対 / 掘り下げ / 一撃 が出る。全行の金色チップがムーブタグ =
                その行を覚える根拠(触ると署名と理由が出る)。各ブロックは1枚のカードとしてトレーニングに登録できる。
            </Note>
            {FIELDS.map((f) => {
                const list = byField.get(f.id) ?? [];
                if (!list.length) return null;
                return (
                    <div key={f.id} style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 900, color: FAINT, letterSpacing: '1px', margin: '14px 0 8px' }}>
                            {f.label} <span style={{ fontWeight: 700 }}>-- {f.note}</span>
                        </div>
                        {list.map((t) => (
                            <ThemeCard
                                key={t.no} theme={t} open={open === t.no}
                                onToggle={() => setOpen(open === t.no ? null : t.no)}
                                registered={registered} busy={busy} onRegister={onRegister}
                            />
                        ))}
                    </div>
                );
            })}
        </div>
    );
}

function ThemeCard({
    theme: t, open, onToggle, registered, busy, onRegister,
}: {
    theme: Theme; open: boolean; onToggle: () => void;
    registered: Set<string>; busy: string | null;
    onRegister: (en: string, ja: string, key: string) => void;
}) {
    const sideBlock = (side: Side, label: string, key: string) => {
        const en = side.lines.map((l) => l.en).join(' ');
        const ja = side.lines.map((l) => l.ja).join('');
        const done = registered.has(key);
        return (
            <div style={{ marginTop: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '10px', fontWeight: 900, color: FAINT, letterSpacing: '1px' }}>{label}</span>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: INK }}>{side.stance}</span>
                </div>
                <div style={{ fontSize: '10.5px', color: SUB, marginTop: '1px' }}>{side.stanceJa}</div>
                <div style={{ marginTop: '6px' }}>
                    {side.lines.map((l, i) => <LineRow key={i} line={l} />)}
                </div>
                <button
                    onClick={() => onRegister(en, ja, key)}
                    disabled={done || busy !== null}
                    style={{
                        width: '100%', marginTop: '8px', padding: '9px', borderRadius: '10px',
                        cursor: done || busy ? 'default' : 'pointer',
                        border: done ? `1px solid ${GREEN}` : 'none',
                        background: done ? '#D1FAE5' : INK,
                        color: done ? DEEPGREEN : '#fff', fontSize: '11.5px', fontWeight: 900,
                    }}
                >
                    {busy === key ? '登録中' : done ? '1枚のカードとして登録済み' : 'このブロックを1枚のカードとして登録'}
                </button>
            </div>
        );
    };

    return (
        <div style={{ background: '#fff', border: `1px solid ${open ? GOLD : LINE}`, borderRadius: '14px', marginBottom: '8px', overflow: 'hidden' }}>
            <button onClick={onToggle} style={{ width: '100%', textAlign: 'left', padding: '13px 15px', background: open ? '#FEF9E7' : '#fff', border: 'none', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 900, color: GOLD, minWidth: '22px' }}>
                        {String(t.no).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '13.5px', fontWeight: 900, color: INK }}>{t.label}</span>
                    <span style={{ fontSize: '10px', color: FAINT, fontFamily: 'Georgia, serif' }}>{t.en}</span>
                    <span style={{ marginLeft: 'auto', fontSize: '10.5px', fontWeight: 900, color: DEEPGREEN, background: '#D1FAE5', padding: '2px 8px', borderRadius: '999px' }}>
                        カード{t.cards.length}枚を吸収
                    </span>
                </div>
                <div style={{ fontSize: '10.5px', color: SUB, marginTop: '6px', lineHeight: 1.7 }}>
                    <span style={{ fontWeight: 900, color: FAINT }}>担当: </span>{t.owns}
                </div>
            </button>

            {open && (
                <div style={{ padding: '0 15px 15px' }}>
                    <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: '10px', padding: '11px 13px', marginTop: '4px' }}>
                        <div style={{ fontSize: '12.5px', color: INK, fontStyle: 'italic', lineHeight: 1.8 }}>{t.hook}</div>
                        <div style={{ fontSize: '10.5px', color: SUB, marginTop: '2px' }}>{t.hookJa}</div>
                        <div style={{ borderTop: `1px solid ${LINE}`, marginTop: '8px', paddingTop: '8px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 900, color: FAINT, letterSpacing: '1px' }}>このテーマの下にある普遍</div>
                            <div style={{ fontSize: '12px', color: INK, lineHeight: 1.85, marginTop: '3px' }}>{t.universalEn}</div>
                            <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.85, marginTop: '2px' }}>{t.universal}</div>
                        </div>
                    </div>

                    <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '6px' }}>
                        {t.angles.map((a, i) => (
                            <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: '10px', padding: '9px 11px' }}>
                                <div style={{ fontSize: '9.5px', fontWeight: 900, color: DEEPGOLD }}>{a.label}</div>
                                <div style={{ fontSize: '11.5px', color: INK, lineHeight: 1.7, marginTop: '3px' }}>{a.en}</div>
                                <div style={{ fontSize: '10px', color: FAINT, lineHeight: 1.7, marginTop: '2px' }}>{a.ja}</div>
                            </div>
                        ))}
                    </div>

                    {sideBlock(t.origin, `元エッセイの口語版 (Day ${t.origin.day || '--'})`, `t${t.no}-origin`)}
                    {sideBlock(t.yes, '賛成', `t${t.no}-yes`)}
                    {sideBlock(t.no, '反対', `t${t.no}-no`)}

                    <div style={{ marginTop: '14px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 900, color: FAINT, letterSpacing: '1px', marginBottom: '6px' }}>掘り下げ(試験官の追い討ち)</div>
                        {t.deeper.map((d, i) => (
                            <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: '12px', padding: '11px 13px', marginTop: '7px' }}>
                                <div style={{ fontSize: '12.5px', fontWeight: 800, color: INK, lineHeight: 1.6 }}>{d.q}</div>
                                <div style={{ fontSize: '10.5px', color: FAINT }}>{d.qJa}</div>
                                <div style={{ marginTop: '4px' }}>
                                    {d.a.map((l, j) => <LineRow key={j} line={l} />)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ background: '#ECFDF5', border: `1px solid ${GREEN}`, borderRadius: '12px', padding: '12px 14px', marginTop: '12px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 900, color: DEEPGREEN, letterSpacing: '1px', marginBottom: '4px' }}>一撃</div>
                        <div style={{ fontSize: '13.5px', fontWeight: 800, color: DEEPGREEN, lineHeight: 1.7, fontFamily: 'Georgia, serif' }}>
                            {t.joke.en} <MoveChips ids={t.joke.m} />
                        </div>
                        <div style={{ fontSize: '11px', color: SUB, marginTop: '4px', lineHeight: 1.8 }}>{t.joke.ja}</div>
                        <div style={{ fontSize: '10.5px', color: BODY, marginTop: '7px', lineHeight: 1.85, borderTop: '1px solid #A7F3D0', paddingTop: '7px' }}>
                            {t.joke.note}
                        </div>
                    </div>

                    <div style={{ marginTop: '12px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 900, color: FAINT, letterSpacing: '1px', marginBottom: '5px' }}>このテーマが吸収するカード</div>
                        {t.cards.map((c, i) => (
                            <div key={i} style={{ fontSize: '11.5px', color: BODY, lineHeight: 1.9, fontStyle: 'italic' }}>-- {c}</div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// ============================================================

function CombosView() {
    return (
        <div>
            <Note>
                「30に無いお題が来たらどうする」への答えがこれ。各行の右端に出どころ(src)が付いていて、
                t1:no = テーマ1の反対側から借りた、new = このお題のために新しく足した、を意味する。
                新規は1コンボ2行まで。つまり答えの8割は在庫で、足すのは小さな具体例1つだけ。
                ちなみに CEO報酬(Are high CEO compensation packages warranted?)はコンボですらなく、テーマ22の直撃弾だ。
            </Note>
            {COMBOS.map((c) => (
                <div key={c.no} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '15px 17px', marginBottom: '10px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: INK, lineHeight: 1.6, fontFamily: 'Georgia, serif' }}>{c.q}</div>
                    <div style={{ fontSize: '11px', color: SUB, marginTop: '2px' }}>{c.qJa}</div>
                    <div style={{ fontSize: '10.5px', color: DEEPGOLD, fontWeight: 800, marginTop: '7px' }}>
                        新しく足したもの: <span style={{ fontWeight: 700, color: BODY }}>{c.newFact}</span>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        {c.lines.map((l, i) => (
                            <div key={i} style={{ padding: '7px 0', borderTop: `1px solid ${PAPER}` }}>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '13px', lineHeight: 1.8, color: INK }}>
                                            {l.en} <MoveChips ids={l.m} />
                                        </div>
                                        <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.8, marginTop: '2px' }}>{l.ja}</div>
                                    </div>
                                    <span style={{
                                        flexShrink: 0, fontSize: '9.5px', fontWeight: 900, fontFamily: 'Georgia, serif',
                                        color: l.src === 'new' ? DEEPGREEN : FAINT,
                                        background: l.src === 'new' ? '#D1FAE5' : PAPER,
                                        border: `1px solid ${l.src === 'new' ? GREEN : LINE}`,
                                        borderRadius: '999px', padding: '2px 8px',
                                    }}>
                                        {l.src}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: '10.5px', color: BODY, lineHeight: 1.85, marginTop: '9px', borderTop: `1px solid ${LINE}`, paddingTop: '8px' }}>
                        {c.note}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ============================================================

function Note({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '12px 15px', marginBottom: '12px' }}>
            <p style={{ margin: 0, fontSize: '11.5px', lineHeight: 2, color: BODY }}>{children}</p>
        </div>
    );
}
