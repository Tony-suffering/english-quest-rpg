'use client';

/**
 * TOPIC 100 の「100行」と「100日」ビュー。
 *
 * 100行 = 暗記の本体。読み物ではないので /api/phrases に流し込むのが主役の画面。
 *
 * 【登録の単位はヴァース】
 * 意味を成す最小の塊は1行ではなく5行(= 掴み/仕組み/証拠/着地/刺し で1つの論述)。
 * 1行ずつバラしてカードにすると、断片は覚えられてもまとまった意見が作れない。
 * だから既定の登録は「ヴァース1つ = カード1枚」。行単位の登録は、そのうち
 * 特定の行だけ毎回詰まるときの穴埋め用に残してある。
 *
 * 100日 = 20ヴァース x 5周。紙に書く周から始めて、最後は紙を離して口だけにする。
 */

import { useEffect, useMemo, useState } from 'react';
import {
    VERSES, BEATS, ALL_LINES, TOTAL_LINES, LAPS, planFor,
    type Verse, type Beat,
} from '@/data/english/eiken-spine100';
import { ENGINE_BY_ID, ENGINE_COVERAGE, TOPIC_BY_NO } from '@/data/english/eiken-topic100';

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

const REG_KEY = 'topic100-spine-registered-v1';

const BEAT_COLOR: Record<Beat, string> = {
    hook: '#D6D3D1',
    why: '#E7D9A8',
    proof: '#EBD9A0',
    so: '#D4AF37',
    sting: '#10B981',
};

/** ヴァース = 5行で1つの論述。カード1枚はこの単位 */
function blockOf(v: Verse) {
    return {
        en: v.lines.map((l) => l.en).join(' '),
        ja: v.lines.map((l) => l.ja).join(''),
    };
}

function todayStr() {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function Label({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ fontSize: '10px', fontWeight: 900, color: FAINT, letterSpacing: '1px', marginBottom: '5px' }}>
            {children}
        </div>
    );
}

function Note({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '12px 15px', marginBottom: '12px' }}>
            <p style={{ margin: 0, fontSize: '11.5px', lineHeight: 2, color: BODY }}>{children}</p>
        </div>
    );
}

// ============================================================
// 100行
// ============================================================

export function SpineView({ onOpenTopic }: { onOpenTopic: (no: number) => void }) {
    const [open, setOpen] = useState<number | null>(1);
    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);
    const [runthrough, setRunthrough] = useState(false);
    const [hideJa, setHideJa] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(REG_KEY);
            if (raw) setRegistered(new Set(JSON.parse(raw)));
        } catch {
            // 登録済みの印が読めなくても、登録そのものは何度でもやり直せる
        }
    }, []);

    const persist = (next: Set<string>) => {
        setRegistered(next);
        try {
            localStorage.setItem(REG_KEY, JSON.stringify([...next]));
        } catch {
            // 印が残らないだけで API 側には入っている
        }
    };

    const register = async (items: { en: string; ja: string }[], busyKey: string) => {
        setBusy(busyKey);
        const next = new Set(registered);
        for (const it of items) {
            if (next.has(it.en)) continue;
            try {
                const res = await fetch('/api/phrases', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        english: it.en,
                        japanese: it.ja,
                        category: 'expression',
                        date: todayStr(),
                    }),
                });
                // 409 = 既に同じ文が入っている。登録済みとして扱う
                if (res.ok || res.status === 409) next.add(it.en);
            } catch {
                // 1行失敗しても残りは続ける
            }
        }
        persist(next);
        setBusy(null);
    };

    /** ヴァース1つを1枚のカードにする。これが既定の登録単位 */
    const doneVerses = useMemo(
        () => VERSES.filter((v) => registered.has(blockOf(v).en)).length,
        [registered],
    );

    return (
        <div>
            <Note>
                これが暗記の本体。20ヴァース × 5行 = {TOTAL_LINES}行。通しで読むと約10分。
                どのヴァースも 掴み → 仕組み → 証拠 → 着地 → 刺し の同じ5拍で並んでいるので、20回まわると拍のほうが先に体に入る。
                <strong style={{ color: INK }}>覚える単位は1行ではなくヴァース</strong>。5行で1つの論述が完成する形にしてあるから、
                トレーニングにもヴァース1つ = カード1枚で入る。1行ずつバラすと断片は覚えられても、まとまった意見にならない。
                行単位の登録は、特定の行だけ毎回詰まるときの穴埋めに使う。
            </Note>

            <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '13px 15px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '12px', fontWeight: 900, color: INK }}>
                        トレーニング登録 <span style={{ color: DEEPGREEN }}>{doneVerses}</span>
                        <span style={{ color: FAINT, fontWeight: 700 }}> / {VERSES.length} ヴァース</span>
                    </div>
                    <button
                        onClick={() => register(VERSES.map(blockOf), 'all')}
                        disabled={busy !== null}
                        style={{
                            marginLeft: 'auto', padding: '8px 16px', borderRadius: '10px',
                            cursor: busy ? 'default' : 'pointer', border: 'none',
                            background: busy === 'all' ? SUB : INK, color: '#fff', fontSize: '11.5px', fontWeight: 900,
                        }}
                    >
                        {busy === 'all' ? '登録中' : '20ヴァースすべてを登録'}
                    </button>
                </div>
                <div style={{ display: 'flex', gap: '14px', marginTop: '10px', flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: SUB, cursor: 'pointer' }}>
                        <input type="checkbox" checked={runthrough} onChange={(e) => setRunthrough(e.target.checked)} />
                        通し読み(100行を一列に)
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: SUB, cursor: 'pointer' }}>
                        <input type="checkbox" checked={hideJa} onChange={(e) => setHideJa(e.target.checked)} />
                        日本語を隠す
                    </label>
                </div>
            </div>

            {runthrough ? (
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '16px 18px' }}>
                    {ALL_LINES.map((l) => (
                        <div key={l.no} style={{ display: 'flex', gap: '10px', padding: '7px 0', borderBottom: l.no % 5 === 0 ? `1px solid ${LINE}` : 'none' }}>
                            <span style={{ fontFamily: 'Georgia, serif', fontSize: '10px', color: FAINT, minWidth: '24px', paddingTop: '3px' }}>
                                {String(l.no).padStart(3, '0')}
                            </span>
                            <span style={{ width: '3px', background: BEAT_COLOR[l.beat], borderRadius: '2px', flexShrink: 0 }} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '13px', lineHeight: 1.75, color: INK }}>{l.en}</div>
                                {!hideJa && <div style={{ fontSize: '11px', lineHeight: 1.75, color: SUB, marginTop: '2px' }}>{l.ja}</div>}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                VERSES.map((v) => (
                    <VerseCard
                        key={v.no}
                        verse={v}
                        open={open === v.no}
                        onToggle={() => setOpen(open === v.no ? null : v.no)}
                        registered={registered}
                        busy={busy}
                        hideJa={hideJa}
                        onRegister={register}
                        onOpenTopic={onOpenTopic}
                    />
                ))
            )}
        </div>
    );
}

function VerseCard({
    verse, open, onToggle, registered, busy, hideJa, onRegister, onOpenTopic,
}: {
    verse: Verse;
    open: boolean;
    onToggle: () => void;
    registered: Set<string>;
    busy: string | null;
    hideJa: boolean;
    onRegister: (items: { en: string; ja: string }[], key: string) => void;
    onOpenTopic: (no: number) => void;
}) {
    const engine = ENGINE_BY_ID[verse.engineId];
    const cover = ENGINE_COVERAGE[verse.engineId] ?? [];
    const block = blockOf(verse);
    const blockDone = registered.has(block.en);
    const lineDone = verse.lines.filter((l) => registered.has(l.en)).length;
    const key = `v${verse.no}`;

    return (
        <div style={{ background: '#fff', border: `1px solid ${open ? GOLD : LINE}`, borderRadius: '14px', marginBottom: '9px', overflow: 'hidden' }}>
            <button
                onClick={onToggle}
                style={{ width: '100%', textAlign: 'left', padding: '13px 15px', background: open ? '#FEF9E7' : '#fff', border: 'none', cursor: 'pointer' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 900, color: GOLD, minWidth: '22px' }}>
                        {String(verse.no).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '13.5px', fontWeight: 900, color: INK }}>{verse.label}</span>
                    <span style={{ marginLeft: 'auto', fontSize: '10.5px', fontWeight: 900, color: DEEPGREEN, background: '#D1FAE5', padding: '2px 8px', borderRadius: '999px' }}>
                        {cover.length}題に効く
                    </span>
                    <span style={{ fontSize: '10.5px', fontWeight: 900, color: blockDone ? DEEPGREEN : FAINT }}>
                        {blockDone ? '登録済' : '未登録'}
                        {lineDone > 0 && <span style={{ color: FAINT, fontWeight: 700 }}> ・行{lineDone}</span>}
                    </span>
                </div>
                {!open && (
                    <div style={{ fontSize: '11.5px', color: SUB, marginTop: '6px', lineHeight: 1.7, fontStyle: 'italic' }}>
                        {verse.lines[4].en}
                    </div>
                )}
            </button>

            {open && (
                <div style={{ padding: '0 15px 15px' }}>
                    {verse.lines.map((l, i) => {
                        const beat = BEATS.find((b) => b.key === l.beat)!;
                        const isDone = registered.has(l.en);
                        return (
                            <div key={i} style={{ display: 'flex', gap: '10px', padding: '9px 0', borderTop: i === 0 ? 'none' : `1px solid ${PAPER}` }}>
                                <div style={{ minWidth: '38px' }}>
                                    <div style={{ fontSize: '9.5px', fontWeight: 900, color: FAINT, letterSpacing: '0.5px' }}>{i + 1} {beat.label}</div>
                                    <div style={{ height: '3px', background: BEAT_COLOR[l.beat], borderRadius: '2px', marginTop: '3px' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '13.5px', lineHeight: 1.8, color: INK, fontWeight: l.beat === 'sting' ? 800 : 400 }}>{l.en}</div>
                                    {!hideJa && <div style={{ fontSize: '11.5px', lineHeight: 1.8, color: SUB, marginTop: '3px' }}>{l.ja}</div>}
                                </div>
                                <button
                                    onClick={() => onRegister([{ en: l.en, ja: l.ja }], `${key}-${i}`)}
                                    disabled={isDone || busy !== null}
                                    title="この行だけ毎回詰まるときの穴埋め登録"
                                    style={{
                                        alignSelf: 'flex-start', flexShrink: 0, padding: '3px 4px', borderRadius: '6px',
                                        cursor: isDone || busy ? 'default' : 'pointer',
                                        border: 'none', background: 'transparent',
                                        color: isDone ? DEEPGREEN : '#D6D3D1', fontSize: '9.5px', fontWeight: 800,
                                        textDecoration: isDone ? 'none' : 'underline',
                                        textUnderlineOffset: '2px',
                                    }}
                                >
                                    {isDone ? '行 登録済' : '行だけ'}
                                </button>
                            </div>
                        );
                    })}

                    <button
                        onClick={() => onRegister([block], key)}
                        disabled={blockDone || busy !== null}
                        style={{
                            width: '100%', marginTop: '10px', padding: '11px', borderRadius: '10px',
                            cursor: blockDone || busy ? 'default' : 'pointer',
                            border: blockDone ? `1px solid ${GREEN}` : 'none',
                            background: blockDone ? '#D1FAE5' : INK,
                            color: blockDone ? DEEPGREEN : '#fff', fontSize: '12px', fontWeight: 900,
                        }}
                    >
                        {busy === key ? '登録中' : blockDone ? 'この5行は1枚のカードとして登録済み' : 'この5行を1枚のカードとして登録'}
                    </button>

                    {engine && (
                        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: '10px', padding: '11px 13px', marginTop: '12px' }}>
                            <Label>長い版(1本の段落として撃つとき)</Label>
                            <p style={{ margin: 0, fontSize: '12px', lineHeight: 1.9, color: BODY }}>{engine.ammo}</p>
                            <div style={{ fontSize: '11px', color: SUB, marginTop: '8px', lineHeight: 1.8 }}>{engine.swap}</div>
                        </div>
                    )}

                    <div style={{ marginTop: '10px' }}>
                        <Label>このヴァースが効く的</Label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                            {cover.map((no) => (
                                <button
                                    key={no}
                                    onClick={() => onOpenTopic(no)}
                                    title={TOPIC_BY_NO[no]?.ja}
                                    style={{
                                        fontSize: '10.5px', fontWeight: 800, fontFamily: 'Georgia, serif',
                                        padding: '3px 8px', borderRadius: '999px', cursor: 'pointer',
                                        border: `1px solid ${LINE}`, background: '#fff', color: SUB,
                                    }}
                                >
                                    {no}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ============================================================
// 100日
// ============================================================

export function ProgramView() {
    const [day, setDay] = useState(1);
    const plan = planFor(day);

    return (
        <div>
            <Note>
                20ヴァースを5周する100日。1周ごとに紙の使い方が変わり、最後の周で紙を離す。
                狙いは理解ではなく、考えずに勝手に口が動く状態まで持っていくこと。
                1日分は1枚に収まるので、印刷して机に置くか、ノートに同じ3段を引けばいい。
            </Note>

            {LAPS.map((l) => (
                <div key={l.lap} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '13px 15px', marginBottom: '9px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 900, color: GOLD }}>{l.days}</span>
                        <span style={{ fontSize: '14px', fontWeight: 900, color: INK }}>{l.title}</span>
                        <span style={{ marginLeft: 'auto', fontSize: '10px', color: FAINT, fontWeight: 800 }}>第{l.lap}周</span>
                    </div>
                    <div style={{ marginTop: '10px', display: 'grid', gap: '6px' }}>
                        <Row k="紙" v={l.paper} />
                        <Row k="口" v={l.mouth} />
                    </div>
                    <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.85, marginTop: '9px', borderTop: `1px solid ${PAPER}`, paddingTop: '8px' }}>
                        {l.why}
                    </div>
                </div>
            ))}

            <div style={{ background: '#fff', border: `2px solid ${GOLD}`, borderRadius: '16px', padding: '18px', marginTop: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <Label>何日目をやる</Label>
                    <input
                        type="range" min={1} max={100} value={day}
                        onChange={(e) => setDay(Number(e.target.value))}
                        style={{ flex: 1, minWidth: '160px' }}
                    />
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 900, color: INK }}>Day {day}</span>
                </div>
                {plan && (
                    <div style={{ marginTop: '14px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 900, color: DEEPGOLD }}>
                            第{plan.lap.lap}周 「{plan.lap.title}」 ・ ヴァース {String(plan.verse.no).padStart(2, '0')} {plan.verse.label}
                        </div>
                        <div style={{ marginTop: '10px', display: 'grid', gap: '6px' }}>
                            <Row k="紙" v={plan.lap.paper} />
                            <Row k="口" v={plan.lap.mouth} />
                        </div>
                        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: '10px', padding: '11px 13px', marginTop: '12px' }}>
                            {plan.verse.lines.map((l, i) => (
                                <div key={i} style={{ display: 'flex', gap: '8px', padding: '4px 0' }}>
                                    <span style={{ width: '3px', background: BEAT_COLOR[l.beat], borderRadius: '2px', flexShrink: 0 }} />
                                    <span style={{ fontSize: '12.5px', lineHeight: 1.75, color: INK }}>{l.en}</span>
                                </div>
                            ))}
                        </div>
                        <a
                            href={`/english/topic100/sheet?day=${day}`}
                            style={{
                                display: 'block', textAlign: 'center', marginTop: '12px', padding: '11px',
                                borderRadius: '10px', background: INK, color: '#fff', textDecoration: 'none',
                                fontSize: '12px', fontWeight: 900, letterSpacing: '0.5px',
                            }}
                        >
                            この日の紙を開く(印刷用)
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

function Row({ k, v }: { k: string; v: string }) {
    return (
        <div style={{ display: 'flex', gap: '9px', alignItems: 'flex-start' }}>
            <span style={{
                flexShrink: 0, fontSize: '10px', fontWeight: 900, color: DEEPGOLD, background: '#FEF9E7',
                border: '1px solid #EBD9A0', borderRadius: '6px', padding: '2px 7px', marginTop: '1px',
            }}>
                {k}
            </span>
            <span style={{ fontSize: '12px', color: BODY, lineHeight: 1.8 }}>{v}</span>
        </div>
    );
}
