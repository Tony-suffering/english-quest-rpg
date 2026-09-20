// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/app/english/write/sum5/page.tsx
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
'use client';

/**
 * SUM 5 -- 英検の英文要約を「本文の形」で5つに畳んだ型のページ。
 *
 * 使う順番:
 *   1 級を選ぶ(語数と文数が決まる)
 *   2 判定を上から当てる(第2段落の1文目しか読まない)
 *   3 型が決まる = 文頭が5つとも決まる
 *   4 各段落の1文目を潰して文頭の後ろに差す
 *   5 本文と同じ語が続いていたら言い換えの3手で崩す
 *   6 数える
 *
 * データは src/data/english/write-sum5.ts。
 * scripts/verify-write-sum5.cjs が語数・文頭一致・本文からの写しゼロを機械検査する。
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
    SUM_PATTERNS, GRADES, DECISION, CONFIRM_STEP, SENTENCE_ROLES,
    CUT_RULES, KEEP_RULES, SWAP_MOVES, SWAP_TABLE, BANNED, WALKTHROUGH,
    EVIDENCE, OFFICIAL_SPLIT, OFFICIAL_STYLE, SOURCES,
    RELATION_VERBS, CONCERN_VERB, TURNS, CHAIN_MOVES, VERB_DENSITY,
    NOUN_MOVES, NOUN_EVIDENCE,
    countWords, splitSentences, usesFor, patternsForGrade,
    type Grade, type SumPatternId,
} from '@/data/english/write-sum5';
import { EikenOutputNav, EikenOutputDisclaimer } from '@/components/english/EikenOutputChrome';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const SUB = '#57534E';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';
const PAPER = '#FAF8F2';

const REG_KEY = 'sum5-registered';

function loadReg(): Set<string> {
    try {
        const s = localStorage.getItem(REG_KEY);
        return s ? new Set(JSON.parse(s)) : new Set();
    } catch { return new Set(); }
}
function saveReg(set: Set<string>) {
    try { localStorage.setItem(REG_KEY, JSON.stringify([...set])); } catch { /* noop */ }
}
function todayStr(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function speak(text: string) {
    if (typeof window === 'undefined') return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
}

/** 模範要約を文に割り、opener の部分だけ色を変えて出す */
function ModelText({ text, openers, uses }: { text: string; openers: { n: number; en: string }[]; uses: number[] }) {
    const ss = splitSentences(text);
    return (
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 2.05, color: INK }}>
            {ss.map((s, i) => {
                const op = openers.find(o => o.n === uses[i])?.en ?? '';
                const head = s.startsWith(op) ? op : '';
                const rest = head ? s.slice(head.length) : s;
                return (
                    <span key={i}>
                        {head && (
                            <span style={{ background: '#FEF9E7', color: DEEPGOLD, fontWeight: 800, borderRadius: '4px', padding: '1px 3px' }}>
                                {head}
                            </span>
                        )}
                        {rest}{' '}
                    </span>
                );
            })}
        </p>
    );
}

export default function Sum5Page() {
    const [grade, setGrade] = useState<Grade>('g1');
    const [pid, setPid] = useState<SumPatternId>('forAgainst');
    const [showPassage, setShowPassage] = useState(false);
    const [showJa, setShowJa] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [reg, setReg] = useState<{ status: 'idle' | 'running' | 'done'; done: number; total: number; added: number }>(
        { status: 'idle', done: 0, total: 0, added: 0 }
    );

    useEffect(() => {
        setRegistered(loadReg());
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const g = GRADES.find(x => x.id === grade)!;
    const p = SUM_PATTERNS.find(x => x.id === pid)!;
    const model = p.models.find(m => m.grade === grade)!;
    /** 使う文の番号。落とす順は型ごとに違う */
    const uses = usesFor(pid, grade);
    /** その級で実際に出ている型を先に並べる */
    const ordered = useMemo(() => patternsForGrade(grade), [grade]);

    /** 文頭の在庫。文5は5型共通なので1本にまとまる */
    const allOpeners = useMemo(() => {
        const seen = new Set<string>();
        const out: { en: string; ja: string }[] = [];
        for (const pat of SUM_PATTERNS) {
            for (const o of pat.openers) {
                if (seen.has(o.en)) continue;
                seen.add(o.en);
                out.push({ en: o.en, ja: o.ja });
            }
        }
        return out;
    }, []);

    const registerAll = useCallback(async () => {
        setReg({ status: 'running', done: 0, total: allOpeners.length, added: 0 });
        let added = 0;
        const next = new Set(registered);
        for (let i = 0; i < allOpeners.length; i++) {
            const o = allOpeners[i];
            try {
                const res = await fetch('/api/phrases', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ english: o.en, japanese: o.ja, category: 'expression', date: todayStr() }),
                });
                const data = await res.json();
                if (data?.success) added++;
                if (data?.success || data?.duplicate) next.add(o.en);
            } catch { /* 1件失敗しても次に進む */ }
            setReg(r => ({ ...r, done: i + 1, added }));
        }
        setRegistered(next);
        saveReg(next);
        setReg({ status: 'done', done: allOpeners.length, total: allOpeners.length, added });
    }, [allOpeners, registered]);

    const pad = isMobile ? '16px' : '20px 32px';
    const wrap: React.CSSProperties = { maxWidth: '820px', margin: '0 auto', padding: pad };

    const card: React.CSSProperties = {
        background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px',
        padding: isMobile ? '16px' : '20px 22px',
    };
    const h2: React.CSSProperties = {
        margin: '0 0 4px', fontSize: '11px', fontWeight: 900, letterSpacing: '2px', color: FAINT,
    };
    const h2main: React.CSSProperties = {
        margin: '0 0 14px', fontSize: isMobile ? '17px' : '19px', fontWeight: 900, color: INK, lineHeight: 1.5,
    };

    return (
        <div style={{ minHeight: '100vh', background: PAPER, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            <EikenOutputNav active="write" />

            {/* ===== HEADER ===== */}
            <div style={{ background: '#fff', borderBottom: `1px solid ${LINE}`, padding: pad }}>
                <div style={{ maxWidth: '820px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '24px' : '28px', fontWeight: 900, color: GOLD, letterSpacing: '1px' }}>SUM</span>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '24px' : '28px', fontWeight: 900, color: INK, letterSpacing: '1px' }}>5</span>
                        <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', background: INK, padding: '3px 8px', borderRadius: '6px', letterSpacing: '1px' }}>要約の型</span>
                    </div>
                    <p style={{ margin: '10px 0 0', fontSize: isMobile ? '16px' : '18px', fontWeight: 900, color: INK, lineHeight: 1.6 }}>
                        要約は作文ではない。本文の3段落を、決まった数の文に潰す作業である。
                    </p>
                    <p style={{ margin: '6px 0 0', fontSize: '13px', color: SUB, lineHeight: 1.9 }}>
                        潰し方は本文の形で決まり、本文の形は5つしかない。型が決まった瞬間に文頭が5つとも決まるので、
                        本番で自分の言葉にするのは<strong style={{ color: INK }}>各文の主語と動詞だけ</strong>になる。
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                        <Link href="/english/write"
                            style={{ textDecoration: 'none', fontSize: '12px', fontWeight: 800, color: DEEPGOLD, background: '#FEF9E7', border: `1px solid ${GOLD}55`, padding: '7px 14px', borderRadius: '99px' }}>
                            ← 英作文の玄関にもどる
                        </Link>
                        <Link href="/english/write/core5"
                            style={{ textDecoration: 'none', fontSize: '12px', fontWeight: 800, color: DEEPGREEN, background: '#ECFDF5', border: `1px solid ${GREEN}55`, padding: '7px 14px', borderRadius: '99px' }}>
                            CORE 5 ー 意見論述の型 →
                        </Link>
                    </div>
                </div>
            </div>

            {/* ===== 級 ===== */}
            <div style={wrap}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {GRADES.map(x => {
                        const on = x.id === grade;
                        return (
                            <button key={x.id} onClick={() => setGrade(x.id)}
                                style={{
                                    flex: 1, cursor: 'pointer', padding: '11px 8px', borderRadius: '12px', textAlign: 'center',
                                    border: on ? `2px solid ${GOLD}` : `1px solid ${LINE}`,
                                    background: on ? '#FEF9E7' : '#fff', transition: 'all 0.15s',
                                }}>
                                <div style={{ fontSize: '14px', fontWeight: 900, color: on ? DEEPGOLD : SUB }}>{x.label}</div>
                                <div style={{ fontSize: '10px', color: FAINT, marginTop: '2px' }}>{x.words[0]}-{x.words[1]}語 / {x.sentences}文</div>
                            </button>
                        );
                    })}
                </div>

                {/* この級で実際に出ている形 */}
                <div style={{ marginTop: '10px', background: '#fff', border: `2px solid ${GOLD}`, borderRadius: '12px', padding: '13px 15px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1px', color: DEEPGOLD, marginBottom: '5px' }}>
                        {g.label}で実際に出ている形 ・ 本文は{g.passage}
                    </div>
                    <div style={{ fontSize: '12.5px', color: INK, lineHeight: 1.95 }}>{g.real}</div>
                </div>

                <div style={{ marginTop: '10px', background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.95 }}>
                        <strong style={{ color: INK }}>級が変わっても型は変わらない。落とす文が決まっているだけ。</strong>{' '}
                        {g.drop}（{g.perSentence}）落とす順は型ごとに違う ー いま選んでいる型{p.no}では
                        <strong style={{ color: INK }}>文{p.dropOrder[0]} → 文{p.dropOrder[1]}</strong> の順に消える。
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                        {SENTENCE_ROLES.map(r => {
                            const on = uses.includes(r.n);
                            const op = p.openers.find(o => o.n === r.n);
                            return (
                                <div key={r.n} style={{
                                    flex: '1 1 120px', padding: '8px 10px', borderRadius: '10px',
                                    background: on ? '#FEF9E7' : '#F5F5F4',
                                    border: `1px solid ${on ? GOLD + '55' : LINE}`,
                                    opacity: on ? 1 : 0.5,
                                }}>
                                    <div style={{ fontSize: '9.5px', fontWeight: 900, letterSpacing: '1px', color: on ? DEEPGOLD : FAINT }}>
                                        文{r.n} {on ? '' : '/ 使わない'}
                                    </div>
                                    <div style={{ fontSize: '12px', fontWeight: 800, color: on ? INK : FAINT, marginTop: '2px' }}>{r.ja}</div>
                                    <div style={{ fontSize: '10px', color: FAINT, marginTop: '2px' }}>
                                        {op ? (op.para === 0 ? '本文全体' : `第${op.para}段落`) : ''}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.9, marginTop: '10px', paddingTop: '10px', borderTop: `1px solid ${LINE}` }}>
                        <strong style={{ color: INK }}>段落は均等に割らない。</strong>
                        1級の公式解答例は 第1段落{OFFICIAL_SPLIT.p1}語 / 第2段落{OFFICIAL_SPLIT.p2}語 / 第3段落{OFFICIAL_SPLIT.p3}語 の計{OFFICIAL_SPLIT.total}語。
                        第3段落がほぼ半分を持っていく。対策とその限界の両方がそこに入っているからで、3等分する書き方は現物と合わない。
                    </div>
                </div>
            </div>

            {/* ===== 判定 ===== */}
            <div style={wrap}>
                <div style={card}>
                    <div style={h2}>STEP 1 / THE TELL</div>
                    <h2 style={h2main}>判定は3秒。第2段落の1文目しか読まない。</h2>
                    <p style={{ margin: '0 0 14px', fontSize: '12.5px', color: SUB, lineHeight: 1.95 }}>
                        上から当てて、当たった時点で確定する。下まで落ちなければ下は読まない。ここで型が決まると、文頭が5つとも決まる。
                    </p>
                    {DECISION.map(d => {
                        const pat = SUM_PATTERNS.find(x => x.id === d.then)!;
                        const on = pat.id === pid;
                        return (
                            <button key={d.step} onClick={() => setPid(pat.id)}
                                style={{
                                    display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer',
                                    marginBottom: '8px', padding: '12px 14px', borderRadius: '12px',
                                    border: on ? `2px solid ${GOLD}` : `1px solid ${LINE}`,
                                    background: on ? '#FEF9E7' : PAPER, transition: 'all 0.15s',
                                }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 900, color: FAINT, letterSpacing: '1px' }}>{d.step}</span>
                                    <span style={{ fontSize: '13px', fontWeight: 800, color: INK }}>{d.lookJa}</span>
                                    <span style={{ fontSize: '11px', fontWeight: 900, color: on ? DEEPGOLD : FAINT, marginLeft: 'auto' }}>
                                        → 型{pat.no} {pat.en}
                                    </span>
                                </div>
                                <div style={{ fontSize: '11.5px', color: SUB, marginTop: '6px', fontStyle: 'italic' }}>{d.look}</div>
                                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '7px' }}>
                                    {d.signals.map(s => (
                                        <span key={s} style={{
                                            fontSize: '10.5px', fontWeight: 700, color: DEEPGREEN, background: '#ECFDF5',
                                            border: `1px solid ${GREEN}33`, borderRadius: '6px', padding: '2px 7px',
                                        }}>{s}</span>
                                    ))}
                                </div>
                            </button>
                        );
                    })}
                    <div style={{ marginTop: '10px', background: PAPER, border: `1px solid ${LINE}`, borderRadius: '10px', padding: '10px 12px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: INK, lineHeight: 1.85 }}>{CONFIRM_STEP.lookJa}</div>
                        <div style={{ fontSize: '11px', color: FAINT, fontStyle: 'italic', marginTop: '4px' }}>{CONFIRM_STEP.look}</div>
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '7px' }}>
                            {CONFIRM_STEP.signals.map(s => (
                                <span key={s} style={{
                                    fontSize: '10.5px', fontWeight: 700, color: DEEPGOLD, background: '#FEF9E7',
                                    border: `1px solid ${GOLD}44`, borderRadius: '6px', padding: '2px 7px',
                                }}>{s}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== 型 ===== */}
            <div style={wrap}>
                <div style={{ fontSize: '11px', color: FAINT, fontWeight: 800, letterSpacing: '1px', marginBottom: '8px' }}>
                    {g.label}で実際に出ている型を左に並べてある
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {ordered.map(x => {
                        const on = x.id === pid;
                        const real = x.seenGrades.includes(grade);
                        return (
                            <button key={x.id} onClick={() => { setPid(x.id); setShowPassage(false); }}
                                style={{
                                    flex: '1 1 130px', cursor: 'pointer', padding: '10px 6px', borderRadius: '12px', textAlign: 'center',
                                    border: on ? `2px solid ${INK}` : `1px solid ${real ? GOLD + '77' : LINE}`,
                                    background: on ? INK : real ? '#FEF9E7' : '#fff', transition: 'all 0.15s',
                                }}>
                                <div style={{ fontSize: '9.5px', fontWeight: 900, letterSpacing: '1px', color: on ? GOLD : FAINT }}>型{x.no}</div>
                                <div style={{ fontSize: '12px', fontWeight: 900, color: on ? '#fff' : INK, marginTop: '2px' }}>{x.en}</div>
                                <div style={{ fontSize: '10px', color: on ? '#D6D3D1' : FAINT, marginTop: '1px' }}>{x.ja}</div>
                                <div style={{ fontSize: '9px', fontWeight: 900, marginTop: '4px', color: on ? (real ? GOLD : '#A8A29E') : (real ? DEEPGOLD : '#C9C0AC') }}>
                                    {real ? `${g.label}で出ている` : '実績なし'}
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div style={card}>
                    <div style={h2}>STEP 2 / THE SHAPE</div>
                    <h2 style={{ ...h2main, marginBottom: '8px' }}>型{p.no} {p.en} ー {p.ja}</h2>
                    <div style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.9, marginBottom: '4px' }}>{p.shapeJa}</div>
                    <div style={{ fontSize: '11.5px', color: FAINT, fontStyle: 'italic', marginBottom: '14px' }}>{p.shape}</div>

                    <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: '12px', padding: '12px 14px', marginBottom: '14px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1px', color: FAINT, marginBottom: '5px' }}>
                            判定の合図 ー この本文の第2段落1文目
                        </div>
                        <div style={{ fontSize: '13px', color: INK, lineHeight: 1.8 }}>{p.tell}</div>
                    </div>

                    <div style={{ background: '#fff', border: `1px solid ${GOLD}55`, borderRadius: '12px', padding: '12px 14px', marginBottom: '12px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1px', color: DEEPGOLD, marginBottom: '5px' }}>出題実績</div>
                        <div style={{ fontSize: '12px', color: INK, lineHeight: 1.9 }}>{p.seen}</div>
                    </div>

                    <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', marginBottom: '16px' }}>
                        <div style={{ background: '#ECFDF5', border: `1px solid ${GREEN}33`, borderRadius: '12px', padding: '12px 14px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1px', color: DEEPGREEN, marginBottom: '5px' }}>なぜ独立させるのか</div>
                            <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.9 }}>{p.why}</div>
                        </div>
                        <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '12px', padding: '12px 14px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1px', color: '#B91C1C', marginBottom: '5px' }}>型を間違えると</div>
                            <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.9 }}>{p.wrongIf}</div>
                        </div>
                    </div>

                    {/* 文頭5つ */}
                    <div style={h2}>STEP 3 / THE FIVE MOUTHS</div>
                    <h2 style={{ ...h2main, marginBottom: '10px' }}>型が決まる = 文頭が5つとも決まる</h2>
                    {p.openers.map(o => {
                        const used = uses.includes(o.n);
                        return (
                            <div key={o.n} style={{
                                display: 'flex', gap: '10px', alignItems: 'flex-start',
                                padding: '10px 12px', marginBottom: '6px', borderRadius: '10px',
                                background: used ? '#fff' : '#F5F5F4',
                                border: `1px solid ${used ? LINE : '#E7E5E4'}`,
                                opacity: used ? 1 : 0.5,
                            }}>
                                <div style={{
                                    minWidth: '26px', height: '26px', borderRadius: '8px', background: used ? INK : FAINT,
                                    color: used ? GOLD : '#fff', fontSize: '12px', fontWeight: 900,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}>{o.n}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: '14px', fontWeight: 800, color: INK, lineHeight: 1.6 }}>
                                        {o.en} <span style={{ color: FAINT, fontWeight: 400 }}>＿＿＿＿.</span>
                                    </div>
                                    <div style={{ fontSize: '11px', color: SUB, marginTop: '2px' }}>
                                        {o.ja} ／ <span style={{ color: DEEPGOLD, fontWeight: 800 }}>{o.para === 0 ? '本文全体' : `第${o.para}段落`}</span>
                                        <span style={{ color: FAINT }}>・{o.slotJa}</span>
                                        {!used && <span style={{ color: FAINT }}> ／ {g.label}では使わない</span>}
                                    </div>
                                </div>
                                <button onClick={() => speak(o.en)}
                                    style={{ cursor: 'pointer', border: `1px solid ${LINE}`, background: '#fff', borderRadius: '8px', fontSize: '10px', color: SUB, padding: '4px 8px', flexShrink: 0 }}>
                                    音
                                </button>
                            </div>
                        );
                    })}
                    <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.9, marginTop: '10px', background: PAPER, border: `1px solid ${LINE}`, borderRadius: '10px', padding: '10px 12px' }}>
                        文5の <strong style={{ color: INK }}>Overall, the passage presents</strong> は5つの型すべてで同じ。結びだけは型が変わっても1文字も動かさない。
                    </div>
                </div>
            </div>

            {/* ===== 模範要約 ===== */}
            <div style={wrap}>
                <div style={card}>
                    <div style={h2}>STEP 4 / THE ANSWER</div>
                    <h2 style={{ ...h2main, marginBottom: '6px' }}>
                        {p.topicJa} ー {g.label}の模範要約
                    </h2>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: DEEPGOLD, background: '#FEF9E7', borderRadius: '99px', padding: '4px 10px' }}>
                            {countWords(model.text)}語 / 枠 {g.words[0]}-{g.words[1]}
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: DEEPGREEN, background: '#ECFDF5', borderRadius: '99px', padding: '4px 10px' }}>
                            {splitSentences(model.text).length}文
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: SUB, background: '#F5F5F4', borderRadius: '99px', padding: '4px 10px' }}>
                            本文からの連続5語 0
                        </span>
                    </div>

                    <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: '12px', padding: '16px 18px' }}>
                        <ModelText text={model.text} openers={p.openers} uses={uses} />
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                        <button onClick={() => speak(model.text)}
                            style={{ cursor: 'pointer', border: `1px solid ${LINE}`, background: '#fff', borderRadius: '99px', fontSize: '11px', fontWeight: 800, color: SUB, padding: '6px 14px' }}>
                            読み上げ
                        </button>
                        <button onClick={() => setShowJa(v => !v)}
                            style={{ cursor: 'pointer', border: `1px solid ${LINE}`, background: '#fff', borderRadius: '99px', fontSize: '11px', fontWeight: 800, color: SUB, padding: '6px 14px' }}>
                            {showJa ? '訳を隠す' : '訳を見る'}
                        </button>
                        <button onClick={() => setShowPassage(v => !v)}
                            style={{ cursor: 'pointer', border: `1px solid ${LINE}`, background: '#fff', borderRadius: '99px', fontSize: '11px', fontWeight: 800, color: SUB, padding: '6px 14px' }}>
                            {showPassage ? '本文を閉じる' : '本文を読む'}
                        </button>
                    </div>
                    {showJa && (
                        <div style={{ marginTop: '10px', fontSize: '12.5px', color: SUB, lineHeight: 2, background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '14px 16px' }}>
                            {model.textJa}
                        </div>
                    )}
                    {showPassage && (
                        <div style={{ marginTop: '10px', background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '14px 16px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1px', color: FAINT, marginBottom: '8px' }}>
                                本文 {countWords(p.passage)}語 ・ 3段落（各段落の1文目が要約の文1・2・4になる）
                            </div>
                            {p.passage.split('\n\n').map((para, i) => (
                                <div key={i} style={{ marginBottom: '12px' }}>
                                    <div style={{ fontSize: '9.5px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '1px', marginBottom: '3px' }}>P{i + 1}</div>
                                    <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.95, color: INK }}>{para}</p>
                                </div>
                            ))}
                            <details style={{ marginTop: '4px' }}>
                                <summary style={{ cursor: 'pointer', fontSize: '11px', fontWeight: 800, color: SUB }}>本文の訳</summary>
                                <div style={{ marginTop: '8px', fontSize: '12px', color: SUB, lineHeight: 2 }}>
                                    {p.passageJa.split('\n\n').map((para, i) => (
                                        <p key={i} style={{ margin: '0 0 10px' }}>{para}</p>
                                    ))}
                                </div>
                            </details>
                        </div>
                    )}
                </div>
            </div>

            {/* ===== 圧縮 ===== */}
            <div style={wrap}>
                <div style={card}>
                    <div style={h2}>STEP 5 / WHAT GOES</div>
                    <h2 style={h2main}>切るものは5つ、残すものは3つ</h2>
                    <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
                        <div>
                            <div style={{ fontSize: '11px', fontWeight: 900, color: '#B91C1C', letterSpacing: '1px', marginBottom: '8px' }}>切る</div>
                            {CUT_RULES.map(r => (
                                <div key={r.en} style={{ marginBottom: '7px', padding: '10px 12px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '10px' }}>
                                    <div style={{ fontSize: '12.5px', fontWeight: 800, color: INK }}>{r.ja} <span style={{ color: FAINT, fontWeight: 400, fontSize: '11px' }}>{r.en}</span></div>
                                    <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.85, marginTop: '3px' }}>{r.note}</div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div style={{ fontSize: '11px', fontWeight: 900, color: DEEPGREEN, letterSpacing: '1px', marginBottom: '8px' }}>残す</div>
                            {KEEP_RULES.map(r => (
                                <div key={r.en} style={{ marginBottom: '7px', padding: '10px 12px', background: '#ECFDF5', border: `1px solid ${GREEN}33`, borderRadius: '10px' }}>
                                    <div style={{ fontSize: '12.5px', fontWeight: 800, color: INK }}>{r.ja} <span style={{ color: FAINT, fontWeight: 400, fontSize: '11px' }}>{r.en}</span></div>
                                    <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.85, marginTop: '3px' }}>{r.note}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== 言い換え ===== */}
            <div style={wrap}>
                <div style={card}>
                    <div style={h2}>STEP 6 / THE SWAP</div>
                    <h2 style={h2main}>語彙の観点は、言い換えの3手で取りに行く</h2>
                    <p style={{ margin: '0 0 14px', fontSize: '12.5px', color: SUB, lineHeight: 1.95 }}>
                        本文と同じ語が続いている箇所は必ず出る。3手のどれかを当てて崩す。
                        <strong style={{ color: INK }}>連続5語が本文と重なったら、その1か所で語彙の観点が落ちる。</strong>
                    </p>
                    {SWAP_MOVES.map(m => (
                        <div key={m.no} style={{ marginBottom: '10px', padding: '12px 14px', background: PAPER, border: `1px solid ${LINE}`, borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '11px', fontWeight: 900, color: GOLD }}>手{m.no}</span>
                                <span style={{ fontSize: '13.5px', fontWeight: 900, color: INK }}>{m.ja}</span>
                                <span style={{ fontSize: '10.5px', color: FAINT, letterSpacing: '1px' }}>{m.en}</span>
                            </div>
                            <div style={{ marginTop: '8px', fontSize: '12.5px', lineHeight: 1.9 }}>
                                <div style={{ color: SUB }}><span style={{ color: FAINT, fontSize: '10px', fontWeight: 900, marginRight: '6px' }}>本文</span>{m.before}</div>
                                <div style={{ color: DEEPGREEN, fontWeight: 700 }}><span style={{ color: FAINT, fontSize: '10px', fontWeight: 900, marginRight: '6px' }}>要約</span>{m.after}</div>
                            </div>
                            <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.85, marginTop: '6px' }}>{m.note}</div>
                        </div>
                    ))}

                    <div style={{ marginTop: '16px', overflowX: 'auto' }}>
                        <div style={{ fontSize: '11px', fontWeight: 900, color: FAINT, letterSpacing: '1px', marginBottom: '8px' }}>
                            よく出る言い回しの置き換え {SWAP_TABLE.length}組
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '480px' }}>
                            <thead>
                                <tr style={{ background: PAPER }}>
                                    <th style={{ textAlign: 'left', padding: '8px 10px', color: FAINT, fontSize: '10px', fontWeight: 900, letterSpacing: '1px', borderBottom: `1px solid ${LINE}` }}>本文に出る形</th>
                                    <th style={{ textAlign: 'left', padding: '8px 10px', color: FAINT, fontSize: '10px', fontWeight: 900, letterSpacing: '1px', borderBottom: `1px solid ${LINE}` }}>要約で使う形</th>
                                    <th style={{ textAlign: 'left', padding: '8px 10px', color: FAINT, fontSize: '10px', fontWeight: 900, letterSpacing: '1px', borderBottom: `1px solid ${LINE}` }}>意味</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SWAP_TABLE.map(s => (
                                    <tr key={s.from}>
                                        <td style={{ padding: '8px 10px', color: SUB, borderBottom: `1px solid ${LINE}`, lineHeight: 1.7 }}>{s.from}</td>
                                        <td style={{ padding: '8px 10px', color: INK, fontWeight: 800, borderBottom: `1px solid ${LINE}`, lineHeight: 1.7 }}>{s.to}</td>
                                        <td style={{ padding: '8px 10px', color: FAINT, borderBottom: `1px solid ${LINE}`, lineHeight: 1.7 }}>{s.ja}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ===== 禁止 ===== */}
            <div style={wrap}>
                <div style={{ ...card, background: '#FEF2F2', border: '1px solid #FCA5A5' }}>
                    <div style={{ ...h2, color: '#B91C1C' }}>NEVER</div>
                    <h2 style={h2main}>書いた瞬間に落ちるもの</h2>
                    {BANNED.map(b => (
                        <div key={b.en} style={{ marginBottom: '7px', padding: '10px 12px', background: '#fff', border: '1px solid #FECACA', borderRadius: '10px' }}>
                            <div style={{ fontSize: '12.5px', fontWeight: 800, color: INK }}>
                                {b.ja} <span style={{ color: FAINT, fontWeight: 400, fontSize: '11px' }}>{b.en}</span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.85, marginTop: '3px' }}>{b.note}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== 動詞 ===== */}
            <div style={wrap}>
                <div style={{ ...card, border: `2px solid ${GOLD}` }}>
                    <div style={h2}>STEP 7 / THE VERBS</div>
                    <h2 style={h2main}>点は文頭ではなく、動詞と接続詞に付く</h2>
                    <p style={{ margin: '0 0 12px', fontSize: '12.5px', color: SUB, lineHeight: 1.95 }}>
                        採点は内容・構成・語彙・文法。<strong style={{ color: INK }}>The passage explains that の4語は、どの観点にも1点も入らない。</strong>
                        点が付くのは、本文の名詞Aと名詞Bの関係を書けたかどうかで、関係を運ぶのは動詞と接続詞だけ。
                        名詞は本文から借りてよい（協会の解答例も専門名詞句はそのまま使う）。自分の言葉にするのは動詞と接続詞。
                    </p>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                        {VERB_DENSITY.map(v => (
                            <div key={v.round} style={{ flex: '1 1 140px', background: PAPER, border: `1px solid ${LINE}`, borderRadius: '10px', padding: '8px 10px' }}>
                                <div style={{ fontSize: '9.5px', fontWeight: 900, letterSpacing: '1px', color: FAINT }}>{v.round}</div>
                                <div style={{ fontSize: '12px', color: INK, marginTop: '2px' }}>
                                    {v.words}語 ／ 接続詞 <strong>{v.turns}</strong> ／ 関係動詞 <strong style={{ color: DEEPGOLD }}>{v.verbs}</strong>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.9, marginBottom: '16px' }}>
                        協会の解答例は7語に1つが関係動詞。接続詞は4本すべて1語。2026-1 は As a result がゼロで、因果を全部 -ing の動詞で運んでいる。
                    </div>

                    <div style={h2}>関係動詞 5対 = 10本</div>
                    <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.9, marginBottom: '10px' }}>
                        動詞は話題で選ばない。関係の種類で選ぶ。型が決まると極性が決まる：型1・2は第2段落が＋、第3段落が−。型4は第2段落が「強める」、第3段落が「求める／届かない」。
                    </div>
                    {RELATION_VERBS.map(r => (
                        <div key={r.relation} style={{ marginBottom: '8px', padding: '10px 12px', background: PAPER, border: `1px solid ${LINE}`, borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                                <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1px', color: DEEPGOLD }}>{r.relation}</span>
                                <span style={{ fontSize: '12.5px', fontWeight: 900, color: INK }}>{r.relationJa}</span>
                            </div>
                            <div style={{ display: 'grid', gap: '6px', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
                                <div style={{ background: '#ECFDF5', border: `1px solid ${GREEN}33`, borderRadius: '8px', padding: '7px 10px' }}>
                                    <div style={{ fontSize: '13.5px', fontWeight: 900, color: DEEPGREEN }}>{r.plus.en}</div>
                                    <div style={{ fontSize: '11px', color: SUB }}>{r.plus.ja} ／ つなぐ形: <span style={{ fontWeight: 700 }}>{r.plus.chain}</span></div>
                                </div>
                                <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '7px 10px' }}>
                                    <div style={{ fontSize: '13.5px', fontWeight: 900, color: '#B91C1C' }}>{r.minus.en}</div>
                                    <div style={{ fontSize: '11px', color: SUB }}>{r.minus.ja} ／ つなぐ形: <span style={{ fontWeight: 700 }}>{r.minus.chain}</span></div>
                                </div>
                            </div>
                            <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.85, marginTop: '6px' }}>{r.note}</div>
                            <div style={{ fontSize: '10.5px', color: FAINT, marginTop: '3px' }}>公式解答例でこの対に落ちた動詞: {r.seen.join(' / ')}</div>
                        </div>
                    ))}
                    <div style={{ marginBottom: '16px', padding: '10px 12px', background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1px', color: FAINT }}>+1 第3段落の入口</span>
                        <span style={{ fontSize: '13.5px', fontWeight: 900, color: INK, marginLeft: '8px' }}>{CONCERN_VERB.en}</span>
                        <span style={{ fontSize: '11px', color: SUB, marginLeft: '8px' }}>{CONCERN_VERB.ja} ／ つなぐ形: {CONCERN_VERB.chain}</span>
                    </div>

                    <div style={h2}>つなぎ 5本。全部1語</div>
                    <div style={{ overflowX: 'auto', marginBottom: '14px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '440px' }}>
                            <thead>
                                <tr style={{ background: PAPER }}>
                                    {['書く', '役割', '書かない多語版', '浮く語数'].map(h => (
                                        <th key={h} style={{ textAlign: 'left', padding: '7px 10px', color: FAINT, fontSize: '10px', fontWeight: 900, letterSpacing: '1px', borderBottom: `1px solid ${LINE}` }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {TURNS.map(t => (
                                    <tr key={t.en}>
                                        <td style={{ padding: '7px 10px', color: INK, fontWeight: 900, borderBottom: `1px solid ${LINE}` }}>{t.en}</td>
                                        <td style={{ padding: '7px 10px', color: SUB, borderBottom: `1px solid ${LINE}` }}>{t.roleJa}</td>
                                        <td style={{ padding: '7px 10px', color: FAINT, textDecoration: 'line-through', borderBottom: `1px solid ${LINE}` }}>{t.longForm}</td>
                                        <td style={{ padding: '7px 10px', color: DEEPGREEN, fontWeight: 800, borderBottom: `1px solid ${LINE}` }}>+{t.saves}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={h2}>動詞が接続詞を食う</div>
                    <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.9, marginBottom: '10px' }}>
                        300語を110語に入れるからくりはここ。段落を「文」にするのではなく「動詞」にする。文を増やさずに関係を1つ足す。
                    </div>
                    {CHAIN_MOVES.map((c, i) => (
                        <div key={i} style={{ marginBottom: '8px', padding: '10px 12px', background: PAPER, border: `1px solid ${LINE}`, borderRadius: '12px' }}>
                            <div style={{ fontSize: '12.5px', color: FAINT, textDecoration: 'line-through', lineHeight: 1.8 }}>{c.before}</div>
                            <div style={{ fontSize: '13px', color: INK, fontWeight: 800, lineHeight: 1.8 }}>{c.after} <span style={{ fontSize: '11px', color: DEEPGREEN }}>+{c.saved}語</span></div>
                            <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.85, marginTop: '4px' }}>{c.note}</div>
                        </div>
                    ))}
                    <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.9, marginTop: '10px', background: '#FEF9E7', border: `1px solid ${GOLD}55`, borderRadius: '10px', padding: '9px 12px' }}>
                        <strong style={{ color: INK }}>文頭の枠は補助輪。</strong>本番で語数が詰まったら、文1の The passage explains that と文5の Overall を先に捨てる。動詞と接続詞は捨てない。
                        このページの模範要約はまだ At the same time / As a result を使っている箇所があり、verify が警告として出している。次に直す。
                    </div>
                </div>
            </div>

            {/* ===== 名詞 ===== */}
            <div style={wrap}>
                <div style={card}>
                    <div style={h2}>STEP 8 / THE NOUNS</div>
                    <h2 style={h2main}>名詞が一番大事。パターン化できるのは「どの名詞か」ではなく「どう包むか」</h2>
                    <p style={{ margin: '0 0 12px', fontSize: '12.5px', color: SUB, lineHeight: 1.95 }}>
                        内容点は名詞で決まる。3段落のどれかの名詞を落とせば、その段落の内容点が消える。だから名詞は本文から借りる。
                        <strong style={{ color: INK }}>頭の名詞は動かさない。動かすのは包み方で、それは3手しかない。</strong>
                    </p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                        {NOUN_EVIDENCE.map(v => (
                            <div key={v.round} style={{ flex: '1 1 120px', background: PAPER, border: `1px solid ${LINE}`, borderRadius: '10px', padding: '8px 10px' }}>
                                <div style={{ fontSize: '9.5px', fontWeight: 900, letterSpacing: '1px', color: FAINT }}>{v.round}</div>
                                <div style={{ fontSize: '12px', color: INK, marginTop: '2px' }}>
                                    of <strong>{v.of}</strong> ／ 名詞化語 <strong style={{ color: DEEPGOLD }}>{v.nominal}</strong> <span style={{ color: FAINT }}>/ {v.words}語</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.9, marginBottom: '16px' }}>
                        of の出現率は本文も解答例も2-3%で、準1級の解答例はゼロ。<strong style={{ color: INK }}>of は手ではなく結果。</strong>
                        名詞化語は書き手で 2% から 17% までばらつく。必須ではない。必須なのは、節を名詞にすることで関係動詞の主語と目的語が作れること。動詞の層の前提がここにある。
                    </div>
                    {NOUN_MOVES.map(m => (
                        <div key={m.no} style={{ marginBottom: '10px', padding: '12px 14px', background: PAPER, border: `1px solid ${LINE}`, borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '11px', fontWeight: 900, color: GOLD }}>手{m.no}</span>
                                <span style={{ fontSize: '13.5px', fontWeight: 900, color: INK }}>{m.ja}</span>
                                <span style={{ fontSize: '10.5px', color: FAINT, letterSpacing: '1px' }}>{m.en}</span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: DEEPGOLD, fontWeight: 700, marginTop: '4px' }}>{m.shape}</div>
                            <div style={{ marginTop: '8px', fontSize: '12.5px', lineHeight: 1.9 }}>
                                <div style={{ color: FAINT, textDecoration: 'line-through' }}>{m.before}</div>
                                <div style={{ color: INK, fontWeight: 800 }}>{m.after} <span style={{ fontSize: '11px', color: DEEPGREEN }}>+{m.saved}語</span></div>
                            </div>
                            <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.85, marginTop: '6px' }}>{m.note}</div>
                        </div>
                    ))}
                    <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.9, marginTop: '10px', background: '#FEF9E7', border: `1px solid ${GOLD}55`, borderRadius: '10px', padding: '9px 12px' }}>
                        <strong style={{ color: INK }}>順番はこう。</strong>本文の頭の名詞を借りる → 節を名詞に包む（手1） → 関係動詞でつなぐ（STEP 7） → 次の文は This + 名詞で受ける（手2）。
                        名詞は借りる、包み方は型、動詞は対、接続詞は1語。自分で考えるのは「どの名詞を落とすか」だけになる。
                    </div>
                </div>
            </div>

            {/* ===== 実演 ===== */}
            <div style={wrap}>
                <div style={card}>
                    <div style={h2}>THE ORDER</div>
                    <h2 style={h2main}>本番の手順は6つ</h2>
                    {WALKTHROUGH.map(w => (
                        <div key={w.no} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '10px' }}>
                            <div style={{
                                minWidth: '28px', height: '28px', borderRadius: '50%', background: INK, color: GOLD,
                                fontSize: '12px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            }}>{w.no}</div>
                            <div style={{ flex: 1, minWidth: 0, paddingTop: '2px' }}>
                                <div style={{ fontSize: '13.5px', fontWeight: 900, color: INK }}>{w.title}</div>
                                <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.95, marginTop: '3px' }}>{w.body}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== 登録 ===== */}
            <div style={wrap}>
                <div style={card}>
                    <div style={h2}>TRAINING</div>
                    <h2 style={{ ...h2main, marginBottom: '8px' }}>文頭{allOpeners.length}本をトレーニングに登録する</h2>
                    <p style={{ margin: '0 0 12px', fontSize: '12.5px', color: SUB, lineHeight: 1.95 }}>
                        5つの型が使う文頭は、重複を除くと{allOpeners.length}本しかない。この{allOpeners.length}本が口に入っていれば、
                        本番で書き出しに迷う時間がゼロになる。ページで読むだけでは覚えないので、カードにして毎日の復習に入れる。
                    </p>
                    <button onClick={registerAll} disabled={reg.status === 'running'}
                        style={{
                            cursor: reg.status === 'running' ? 'default' : 'pointer',
                            border: 'none', borderRadius: '99px', padding: '11px 22px',
                            background: reg.status === 'running' ? FAINT : INK, color: GOLD,
                            fontSize: '13px', fontWeight: 900, letterSpacing: '0.5px',
                        }}>
                        {reg.status === 'running' ? `登録中 ${reg.done}/${reg.total}` : reg.status === 'done' ? '登録し直す' : `文頭${allOpeners.length}本を登録`}
                    </button>
                    {reg.status === 'done' && (
                        <span style={{ marginLeft: '12px', fontSize: '12px', color: DEEPGREEN, fontWeight: 800 }}>
                            新規{reg.added}本 / 既登録{reg.total - reg.added}本
                        </span>
                    )}
                    <div style={{ marginTop: '14px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {allOpeners.map(o => {
                            const on = registered.has(o.en);
                            return (
                                <span key={o.en} style={{
                                    fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '99px',
                                    color: on ? DEEPGREEN : SUB,
                                    background: on ? '#ECFDF5' : PAPER,
                                    border: `1px solid ${on ? GREEN + '44' : LINE}`,
                                }}>{o.en}</span>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ===== 実測 ===== */}
            <div style={wrap}>
                <div style={card}>
                    <div style={h2}>THE RECORD</div>
                    <h2 style={h2main}>型の数は思いつきではなく、実際に出た形を数えた結果</h2>
                    <p style={{ margin: '0 0 14px', fontSize: '12.5px', color: SUB, lineHeight: 1.95 }}>
                        2024年度第1回のリニューアルで要約が新設されてから、公開されている回の本文がどの形だったかを級ごとに並べる。
                        <strong style={{ color: INK }}>1級と2級はほぼ一本道で、準1級だけが割れている。</strong>
                        数えたのは公開回だけなので、非公開回で別の形が出る可能性は残る。
                    </p>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '520px' }}>
                            <thead>
                                <tr style={{ background: PAPER }}>
                                    {['級', '数えた回', '本文の形', '実際のお題'].map(h => (
                                        <th key={h} style={{ textAlign: 'left', padding: '8px 10px', color: FAINT, fontSize: '10px', fontWeight: 900, letterSpacing: '1px', borderBottom: `1px solid ${LINE}` }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {EVIDENCE.map(e => (
                                    <tr key={e.grade}>
                                        <td style={{ padding: '10px', color: INK, fontWeight: 900, borderBottom: `1px solid ${LINE}`, whiteSpace: 'nowrap' }}>{e.grade}</td>
                                        <td style={{ padding: '10px', color: FAINT, borderBottom: `1px solid ${LINE}`, lineHeight: 1.7 }}>{e.rounds}</td>
                                        <td style={{ padding: '10px', color: SUB, borderBottom: `1px solid ${LINE}`, lineHeight: 1.7 }}>{e.shape}</td>
                                        <td style={{ padding: '10px', color: SUB, borderBottom: `1px solid ${LINE}`, lineHeight: 1.7 }}>{e.topics}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ marginTop: '14px', background: '#FEF9E7', border: `1px solid ${GOLD}55`, borderRadius: '12px', padding: '12px 14px' }}>
                        <div style={{ fontSize: '12.5px', color: INK, lineHeight: 1.95 }}>
                            <strong>1級を受けるなら型4から入る。</strong>
                            公式サンプルの砂の採掘は「現状 → 被害の深刻さ → 規制と、それでも採掘地が移るだけという限界」だった。
                            埋め立ても、違法な野生動物取引も、献血も同じ形で来ている。
                            ここを賛否型で書くと、本文にいない反対派を作ったうえ、第2段落の深刻さを「利点」と読み違える二重の事故になる。
                        </div>
                    </div>
                    {/* 公式解答例の実測 */}
                    <div style={{ marginTop: '16px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1px', color: FAINT, marginBottom: '6px' }}>協会の公式解答例を測った</div>
                        <div style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.95, marginBottom: '10px' }}>
                            1級3回分と準1級1回分の解答例を、本文と並べて数えた。
                            <strong style={{ color: INK }}>4本すべて語数が上限ぴったり</strong>で、本文より難しい語で書かれ、The passage explains は1本も使っていない。
                        </div>
                        <div style={{ display: 'grid', gap: '8px', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
                            {[
                                ['語数', OFFICIAL_STYLE.wordsAtCeiling],
                                ['本文より難しい', OFFICIAL_STYLE.harderThanSource],
                                ['文頭', OFFICIAL_STYLE.noMetaFrame],
                                ['写し', OFFICIAL_STYLE.copying],
                                ['指示文', OFFICIAL_STYLE.instruction],
                                ['文数', OFFICIAL_STYLE.sentences],
                            ].map(([k, v]) => (
                                <div key={k} style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: '10px', padding: '9px 12px' }}>
                                    <div style={{ fontSize: '9.5px', fontWeight: 900, letterSpacing: '1px', color: DEEPGOLD }}>{k}</div>
                                    <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.8, marginTop: '2px' }}>{v}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '10px', background: '#fff', border: `1px solid ${GOLD}55`, borderRadius: '12px', padding: '12px 14px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '1px', color: DEEPGOLD, marginBottom: '6px' }}>持ち帰るもの</div>
                            {OFFICIAL_STYLE.takeaways.map(t => (
                                <div key={t} style={{ fontSize: '12px', color: INK, lineHeight: 1.9, paddingLeft: '12px', textIndent: '-12px' }}>・{t}</div>
                            ))}
                            <div style={{ fontSize: '11px', color: FAINT, lineHeight: 1.85, marginTop: '8px' }}>
                                このページの模範要約は、上限ではなく安全帯（1級 {OFFICIAL_STYLE.safeZone.g1[0]}-{OFFICIAL_STYLE.safeZone.g1[1]} / 準1級 {OFFICIAL_STYLE.safeZone.gp1[0]}-{OFFICIAL_STYLE.safeZone.gp1[1]} / 2級 {OFFICIAL_STYLE.safeZone.g2[0]}-{OFFICIAL_STYLE.safeZone.g2[1]}）に置いてある。
                                公式解答例のように上限に張り付くと、数え間違い1語で枠外になる。
                            </div>
                        </div>
                    </div>
                    <details style={{ marginTop: '12px' }}>
                        <summary style={{ cursor: 'pointer', fontSize: '11px', fontWeight: 800, color: SUB }}>出典 {SOURCES.length}件</summary>
                        <ul style={{ margin: '8px 0 0', paddingLeft: '18px' }}>
                            {SOURCES.map(s => (
                                <li key={s.url} style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.9 }}>
                                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: DEEPGREEN }}>{s.label}</a>
                                </li>
                            ))}
                        </ul>
                        <div style={{ fontSize: '11px', color: FAINT, lineHeight: 1.85, marginTop: '8px' }}>
                            協会の公開情報と、それを数えた指導側の分析による。数えたのは出題の「形」であって、問題文は一切転載していない。
                            このページの本文・模範要約はすべて自作である。
                        </div>
                    </details>
                </div>
            </div>

            {/* ===== 検査 ===== */}
            <div style={wrap}>
                <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: '12px', padding: '14px 16px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 900, color: FAINT, letterSpacing: '1px', marginBottom: '6px' }}>この型が機械検査していること</div>
                    <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.95 }}>
                        模範要約{SUM_PATTERNS.length * 3}本すべてで、級ごとの語数の枠・文数・文頭の完全一致・
                        <strong style={{ color: INK }}>本文からの連続5語ゼロ</strong>・禁止表現ゼロ・型をまたいだ文頭の重複ゼロを
                        <code style={{ fontSize: '11px', background: '#fff', border: `1px solid ${LINE}`, borderRadius: '4px', padding: '1px 5px', margin: '0 3px' }}>scripts/verify-write-sum5.cjs</code>
                        が検査している。しょぼい語を後から混ぜると落ちる。落ちたら語を直す。検査は緩めない。
                    </div>
                </div>
            </div>

            <EikenOutputDisclaimer />
        </div>
    );
}
