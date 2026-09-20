// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/app/english/write/core5/page.tsx
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
'use client';

/**
 * CORE 5 — 指10本 × 子テーマ3つ × 幹の文(主語が良いもの4 + 悪いもの4)+ 補足の型20(ポジ10 + ネガ10、自由に組む)。
 *
 * 【2026-09-13 に全部書き替えた】
 * 前の版は「枝5本・動詞の板・蝶番と締めの組み立て機・模範解答5本」を1ページに積んでいて、
 * いまの仕組み(1テーマ5文 + 名詞だけが穴の補足)がどこにも無かった。
 * このページは、本番でやることの順番どおりに並べ直してある。
 *   1 手 — 指を3本立てる(両手をまたぐ)
 *   2 指1本 — 子テーマ3つ、動詞2本、幹の文 4+4、AIで補足した見本、段落の組み立て
 *   3 補足の型 — 動詞と前置詞は固定。考えるのは名詞2つ
 *   4 答案の枠 — 冒頭2文・本論の頭3つ・結び2文
 *   5 お題 — 押すと3本が立つ
 *   6 喋るとき — 蝶番5本と I think の代わり5本
 *
 * 英語が本体。日本語は小さく添える。/english/training への登録は前の版と同じ鍵で持つ(登録済みの印は消えない)。
 */

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
    ENGINES_BY_HAND, ENGINE_BY_ID, FINGERS, HANDS, CHANT, VERB_BY_ENGINE,
    PARAGRAPH_BY_ENGINE, SUPPORT_PATTERNS, SUPPORT_BY_ID, BACKED_AI, backedText, SUPPORT_FLOWS, buildParagraph, concedeSupport,
    TRUNK_KEYS_GOOD, TRUNK_KEYS_BAD, MODEL_ESSAYS, modelEssayBlocks, modelEssayWords,
    TOPIC_TEN, topicLineSentences, trunkBranchIndex, type TopicLine, phraseRegex,
    ESSAY_FRAME, BODY_OPENERS, TOPIC_TESTS, TOPIC_KINDS, SPEAKING_FIVE, INSTEAD_OF_I_THINK, I_THINK_COUNT,
    type EngineId, type Finger, type TopicKind, type TrunkKey, type BackedLine, type SupportSlot, type SupportId, type Polarity,
} from '@/data/english/write-core5';
import { EikenOutputNav, EikenOutputDisclaimer } from '@/components/english/EikenOutputChrome';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const RED = '#DC2626';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';
const CREAM = '#FAF8F2';
const VIOLET = '#7C3AED';

const REG_KEY = 'writeone-core5-registered';

/** 幹の文。主語が良いもの4文 / 悪いもの4文 */
const TRUNK_GOOD: TrunkKey[] = TRUNK_KEYS_GOOD;
const TRUNK_BAD: TrunkKey[] = TRUNK_KEYS_BAD;
const TRUNK_LABEL: Record<TrunkKey, { en: string; ja: string }> = {
    one: { en: 'SUB-THEME 1', ja: '子テーマ1(親指)' },
    two: { en: 'SUB-THEME 2', ja: '子テーマ2(人差し指)' },
    three: { en: 'SUB-THEME 3', ja: '子テーマ3(中指)' },
    pro: { en: 'CLOSE', ja: '締め — 守る動詞' },
    oneBad: { en: 'SUB-THEME 1', ja: '子テーマ1(親指)' },
    twoBad: { en: 'SUB-THEME 2', ja: '子テーマ2(人差し指)' },
    threeBad: { en: 'SUB-THEME 3', ja: '子テーマ3(中指)' },
    con: { en: 'CLOSE', ja: '締め — 壊す動詞' },
};

/** 指の長さの比率。実際の手に合わせると一目で手に見える */
const FINGER_RATIO: Record<Finger, number> = {
    thumb: 0.60, index: 0.87, middle: 1, ring: 0.90, little: 0.67,
};
/** 机に手のひらを伏せた並び。両手の親指が内側で向き合う */
const LEFT_ORDER: Finger[] = ['little', 'ring', 'middle', 'index', 'thumb'];
const RIGHT_ORDER: Finger[] = ['thumb', 'index', 'middle', 'ring', 'little'];

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
/** 指は縦に細い。一番長い語の文字数で級数を決め、語が途中で割れるのを防ぐ */
function labelSize(en: string, wide: boolean): number {
    const longest = Math.max(...en.split(' ').map((w) => w.length));
    const base = longest <= 5 ? 13 : longest === 6 ? 12 : longest === 7 ? 10.5 : 9.5;
    return wide ? base + 1.5 : base;
}

/** 穴(X / Y / Z / W / A / B)を枠付きで描く */
function Holes({ text, holes, color }: { text: string; holes: RegExp; color: string }) {
    return (
        <>
            {text.split(holes).map((part, i) => (
                i % 2 === 1
                    ? <span key={i} style={{
                        display: 'inline-block', minWidth: '22px', textAlign: 'center',
                        border: `1.5px solid ${color}`, borderRadius: '5px', color,
                        fontWeight: 900, fontSize: '0.85em', padding: '0 5px', margin: '0 2px',
                        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                    }}>{part}</span>
                    : <span key={i}>{part}</span>
            ))}
        </>
    );
}

/** 幹の文。X は穴、覚える表現は金の下地で目立たせる */
function TrunkText({ text, phrase }: { text: string; phrase?: string }) {
    const m = phrase ? phraseRegex(phrase).exec(text) : null;
    if (!m) return <Holes text={text} holes={/\b(X)\b/} color={DEEPGOLD} />;
    return (
        <>
            <Holes text={text.slice(0, m.index)} holes={/\b(X)\b/} color={DEEPGOLD} />
            <span style={{ background: '#FEF3C7', borderBottom: `2px solid ${GOLD}`, fontWeight: 700, padding: '0 2px', borderRadius: '3px' }}>{m[0]}</span>
            <Holes text={text.slice(m.index + m[0].length)} holes={/\b(X)\b/} color={DEEPGOLD} />
        </>
    );
}

/** 宣言(金) + 固定の型(黒) + 名詞(緑)。hideNouns で名詞を穴に戻す */
function BackedSentence({ engine, line, subject, hideNouns }: {
    engine: EngineId; line: BackedLine; subject?: string; hideNouns: boolean;
}) {
    const p = PARAGRAPH_BY_ENGINE[engine];
    const head = p[line.key].replace(/\bX\b/, subject ?? line.subject).replace(/\.$/, '');
    return (
        <span>
            <span style={{ color: DEEPGOLD, fontWeight: 700 }}>{head}</span>
            {line.steps.map((st, i) => {
                const s = SUPPORT_BY_ID[st.pattern];
                const joiner = s.join === 'sentence' ? '. ' : s.frame.startsWith(',') ? '' : ' ';
                const frame = i < line.steps.length - 1 ? s.frame.replace(/\.$/, '') : s.frame;
                return (
                    <span key={i}>
                        {joiner}
                        {frame.split(/\b(A|B|W)\b/).map((part, k) => {
                            if (!/^(A|B|W)$/.test(part)) return <span key={k}>{part}</span>;
                            const noun = st.slots[part as SupportSlot] ?? (part === 'W' ? 'it' : part);
                            return hideNouns
                                ? <span key={k} style={{
                                    display: 'inline-block', minWidth: '26px', textAlign: 'center',
                                    border: `1.5px dashed ${GREEN}`, borderRadius: '5px', color: GREEN,
                                    fontWeight: 900, fontSize: '0.8em', padding: '0 6px', margin: '0 2px',
                                    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                                }}>{part}</span>
                                : <span key={k} style={{ color: DEEPGREEN, fontWeight: 700, borderBottom: `2px solid ${GREEN}` }}>{noun}</span>;
                        })}
                    </span>
                );
            })}
        </span>
    );
}

/** 文の中の「その場で入れた名詞」を緑にする。hide で点線の枠に戻す */
function NounMarks({ text, nouns, hide }: { text: string; nouns: string[]; hide: boolean }) {
    const list = [...new Set(nouns.filter(Boolean))].sort((a, b) => b.length - a.length);
    if (list.length === 0) return <>{text}</>;
    const re = new RegExp(`(?<![\\w'])(${list.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\w])`, 'g');
    return (
        <>
            {text.split(re).map((part, i) => (
                i % 2 === 1
                    ? hide
                        ? <span key={i} style={{
                            display: 'inline-block', minWidth: `${Math.max(28, part.length * 6)}px`, height: '1.05em', verticalAlign: 'text-bottom',
                            border: `1.5px dashed ${GREEN}`, borderRadius: '5px', margin: '0 1px',
                        }} />
                        : <span key={i} style={{ color: DEEPGREEN, fontWeight: 700, borderBottom: `2px solid ${GREEN}` }}>{part}</span>
                    : <span key={i}>{part}</span>
            ))}
        </>
    );
}

export default function WriteCore5Page() {
    const [openEngine, setOpenEngine] = useState<EngineId | null>(null);
    const [raised, setRaised] = useState<EngineId[]>([]);
    const [raisedFrom, setRaisedFrom] = useState<string | null>(null);
    const [kind, setKind] = useState<TopicKind | 'all'>('exam');
    const [hideNouns, setHideNouns] = useState(false);
    const [paraN, setParaN] = useState<1 | 2 | 3>(1);
    const [paraSide, setParaSide] = useState<'good' | 'bad'>('good');
    const [picked, setPicked] = useState<SupportId[]>(['by', 'means', 'example']);
    const [modelIdx, setModelIdx] = useState(0);
    const [modelHide, setModelHide] = useState(false);
    const [topicIdx, setTopicIdx] = useState(0);
    const [topicHide, setTopicHide] = useState(false);
    const [colWidth, setColWidth] = useState(760);
    const [stuck, setStuck] = useState(false);

    const handsRef = useRef<HTMLDivElement>(null);
    const detailRef = useRef<HTMLDivElement>(null);
    const isMobile = colWidth < 620;

    // ---- /english/training への登録 ----
    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [pending, setPending] = useState<Set<string>>(new Set());
    const [bulk, setBulk] = useState<{ label: string; done: number; total: number } | null>(null);
    useEffect(() => { setRegistered(loadReg()); }, []);

    const registerOne = useCallback(async (english: string, japanese: string) => {
        const en = english.trim();
        if (!en) return;
        let skip = false;
        setPending((p) => {
            if (p.has(en)) { skip = true; return p; }
            return new Set(p).add(en);
        });
        if (skip) return;
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english: en, japanese, category: 'expression', date: todayStr() }),
            });
            const data = await res.json();
            if (data?.success || data?.duplicate) {
                setRegistered((prev) => {
                    const next = new Set(prev).add(en);
                    saveReg(next);
                    return next;
                });
            }
        } catch { /* 1件失敗しても次に進む */ }
        setPending((p) => {
            const next = new Set(p);
            next.delete(en);
            return next;
        });
    }, []);

    const registerMany = useCallback(async (items: { en: string; ja: string }[], label: string) => {
        if (items.length === 0) return;
        setBulk({ label, done: 0, total: items.length });
        for (let i = 0; i < items.length; i++) {
            await registerOne(items[i].en, items[i].ja);
            setBulk({ label, done: i + 1, total: items.length });
        }
        window.setTimeout(() => setBulk(null), 2600);
    }, [registerOne]);

    useEffect(() => {
        const el = handsRef.current;
        if (!el) return;
        const apply = () => {
            const w = el.getBoundingClientRect().width;
            if (w > 0) setColWidth(w);
        };
        apply();
        window.addEventListener('resize', apply);
        const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(apply) : null;
        ro?.observe(el);
        return () => {
            window.removeEventListener('resize', apply);
            ro?.disconnect();
        };
    }, []);

    useEffect(() => {
        const el = handsRef.current;
        if (!el) return;
        const onScroll = () => setStuck(el.getBoundingClientRect().bottom < 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const openFinger = useCallback((id: EngineId) => {
        setOpenEngine((prev) => (prev === id ? null : id));
        window.setTimeout(() => {
            detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
    }, []);

    const raiseFor = useCallback((ids: EngineId[], label: string) => {
        setRaised((prev) => (prev.join() === ids.join() ? [] : ids));
        setRaisedFrom((prev) => (prev === label ? null : label));
        setOpenEngine(null);
        window.setTimeout(() => {
            handsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 60);
    }, []);

    const filteredTopics = useMemo(
        () => (kind === 'all' ? TOPIC_TESTS : TOPIC_TESTS.filter((t) => t.kind === kind)),
        [kind]
    );
    const handBase = isMobile ? 132 : 150;

    // ---------------------------------------------------------------- ボタン
    const addBtn = (en: string, ja: string) => {
        const on = registered.has(en.trim());
        const busy = pending.has(en.trim());
        return (
            <button
                onClick={() => registerOne(en, ja)}
                disabled={on || busy}
                title={on ? 'トレーニングに登録済み' : 'トレーニングに登録'}
                style={{
                    cursor: on || busy ? 'default' : 'pointer', borderRadius: '6px',
                    padding: '3px 8px', fontSize: '9px', fontWeight: 900, letterSpacing: '0.5px',
                    whiteSpace: 'nowrap', font: 'inherit',
                    border: `1px solid ${on ? '#15803D' : LINE}`,
                    background: on ? '#DCFCE7' : '#fff',
                    color: on ? '#15803D' : SUB,
                    opacity: busy ? 0.5 : 1,
                }}
            >{on ? 'IN TRAINING' : busy ? '...' : '+ TRAIN'}</button>
        );
    };
    const playBtn = (en: string) => (
        <button
            onClick={() => speak(en)}
            style={{
                cursor: 'pointer', border: `1px solid ${LINE}`, background: '#fff', font: 'inherit',
                borderRadius: '6px', padding: '3px 8px', fontSize: '9px',
                fontWeight: 900, color: SUB, letterSpacing: '0.5px',
            }}
        >PLAY</button>
    );
    const addAllBtn = (items: { en: string; ja: string }[], label: string, text: string) => {
        const left = items.filter((i) => !registered.has(i.en.trim())).length;
        return (
            <button
                onClick={() => registerMany(items, label)}
                disabled={left === 0 || bulk !== null}
                style={{
                    cursor: left === 0 || bulk ? 'default' : 'pointer', font: 'inherit',
                    fontSize: '9px', fontWeight: 900, letterSpacing: '0.5px', whiteSpace: 'nowrap',
                    border: `1px solid ${left === 0 ? '#15803D' : LINE}`,
                    background: left === 0 ? '#DCFCE7' : '#fff',
                    color: left === 0 ? '#15803D' : SUB,
                    borderRadius: '999px', padding: '4px 11px',
                }}
            >{left === 0 ? 'ALL IN TRAINING' : `${text} (${left})`}</button>
        );
    };
    const sectionTitle = (en: string, ja: string, n: string) => (
        <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '2px', color: GOLD }}>{n}</div>
            <h2 style={{ margin: '3px 0 2px', fontFamily: 'Georgia, serif', fontSize: '21px', fontWeight: 900, color: INK }}>{en}</h2>
            <div style={{ fontSize: '11.5px', color: FAINT }}>{ja}</div>
        </div>
    );

    // ---------------------------------------------------------------- 指1本(手の上)
    const renderFinger = (handId: 'left' | 'right', f: Finger) => {
        const hand = ENGINES_BY_HAND.find((h) => h.id === handId);
        const eng = hand?.engines.find((e) => e.finger === f);
        if (!eng) return null;
        const isOpen = openEngine === eng.id;
        const isUp = raised.includes(eng.id);
        const dim = raised.length > 0 && !isUp;
        const fj = FINGERS.find((x) => x.id === f);
        return (
            <button
                key={`${handId}-${f}`}
                onClick={() => openFinger(eng.id)}
                style={{
                    flex: 1, minWidth: 0, cursor: 'pointer', font: 'inherit',
                    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    padding: 0, border: 'none', background: 'none',
                    opacity: dim ? 0.32 : 1, transition: 'opacity 0.2s',
                }}
            >
                <div style={{
                    height: `${Math.round(handBase * FINGER_RATIO[f])}px`,
                    borderRadius: '999px 999px 7px 7px',
                    background: isOpen ? eng.color : isUp ? `${eng.color}44` : `${eng.color}18`,
                    border: isOpen || isUp ? `2px solid ${eng.color}` : `1px solid ${eng.color}55`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'space-between', paddingTop: '9px', paddingBottom: '8px',
                    transition: 'all 0.18s',
                }}>
                    <span style={{ fontSize: '9px', fontWeight: 900, color: isOpen ? '#fff' : eng.color, opacity: 0.8 }}>{fj?.short}</span>
                    <span lang="en" style={{
                        fontFamily: 'Georgia, serif', fontSize: `${labelSize(eng.en, isMobile)}px`, fontWeight: 900,
                        color: isOpen ? '#fff' : INK, lineHeight: 1.2, padding: '0 3px', textAlign: 'center',
                        overflowWrap: 'break-word', hyphens: 'auto',
                    }}>{eng.en}</span>
                </div>
                <div style={{ textAlign: 'center', fontSize: '9.5px', color: FAINT, marginTop: '5px', lineHeight: 1.3 }}>{eng.ja}</div>
            </button>
        );
    };

    // ---------------------------------------------------------------- 開いた指
    const renderDetail = (id: EngineId) => {
        const eng = ENGINE_BY_ID[id];
        const fj = FINGERS.find((x) => x.id === eng.finger);
        const p = PARAGRAPH_BY_ENGINE[id];
        const v = VERB_BY_ENGINE[id];
        const holds = v ? (v.holds === 'verb' ? v.verb : v.counter) : '';
        const breaks = v ? (v.holds === 'verb' ? v.counter : v.verb) : '';
        const holdsJa = v ? (v.holds === 'verb' ? v.ja : v.counterJa) : '';
        const breaksJa = v ? (v.holds === 'verb' ? v.counterJa : v.ja) : '';
        const lines = BACKED_AI[id];
        const plainItems = [...TRUNK_GOOD, ...TRUNK_BAD].map((k) => ({ en: p[k], ja: `${p[`${k}Ja` as const]}(表現: ${p.phrases[k][0]} = ${p.phrases[k][1]})` }));
        const backedItems = [...TRUNK_GOOD, ...TRUNK_BAD].map((k) => {
            const l = lines.find((x) => x.key === k) as BackedLine;
            return { en: backedText(id, l), ja: `${p[`${k}Ja` as const]}(補足の型: ${l.steps.map((st) => SUPPORT_BY_ID[st.pattern].asksJa).join(' + ')})` };
        });

        return (
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '18px 16px 0' }}>
                <div style={{
                    border: `2px solid ${eng.color}`, borderRadius: '14px', padding: '15px 16px',
                    background: '#fff', boxShadow: `0 4px 18px ${eng.color}14`,
                }}>
                    {/* 見出し */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{
                            fontSize: '9px', fontWeight: 900, color: '#fff', background: eng.color,
                            borderRadius: '4px', padding: '3px 7px', letterSpacing: '0.5px',
                        }}>{eng.hand === 'left' ? 'LEFT' : 'RIGHT'} {fj?.en.toUpperCase()}</span>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 900, color: INK }}>{eng.en}</span>
                        <span style={{ fontSize: '11px', color: FAINT }}>{eng.ja}</span>
                        <button
                            onClick={() => setOpenEngine(null)}
                            style={{
                                marginLeft: 'auto', cursor: 'pointer', font: 'inherit', fontSize: '10px', fontWeight: 900,
                                color: SUB, background: '#fff', border: `1px solid ${LINE}`, borderRadius: '999px', padding: '3px 10px',
                            }}
                        >CLOSE</button>
                    </div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '14.5px', color: INK, lineHeight: 1.65, marginTop: '9px' }}>
                        {eng.question}
                    </div>
                    <div style={{ fontSize: '11px', color: FAINT, lineHeight: 1.6 }}>{eng.questionJa}</div>

                    {/* 子テーマ3つ + 動詞2本 */}
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: '9px', marginTop: '12px' }}>
                        <div style={{ background: CREAM, border: `1px solid ${LINE}`, borderRadius: '10px', padding: '10px 12px' }}>
                            <div style={{ fontSize: '9px', fontWeight: 900, color: FAINT, letterSpacing: '1px', marginBottom: '6px' }}>
                                THREE SUB-THEMES ・ 子テーマ3つ
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                {eng.branches.map((b, i) => (
                                    <div key={b.en} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                        <span style={{ fontSize: '9px', fontWeight: 900, color: eng.color, minWidth: '14px' }}>{i + 1}</span>
                                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 900, color: INK }}>{b.en}</span>
                                        <span style={{ fontSize: '10.5px', color: FAINT }}>{b.ja}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '10px 12px' }}>
                            <div style={{ fontSize: '9px', fontWeight: 900, color: FAINT, letterSpacing: '1px', marginBottom: '6px' }}>
                                TWO VERBS ・ 動詞2本
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                <span style={{ fontSize: '9px', fontWeight: 900, color: DEEPGREEN, minWidth: '46px' }}>HOLDS</span>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '17px', fontWeight: 900, color: DEEPGREEN }}>{holds}</span>
                                <span style={{ fontSize: '10.5px', color: FAINT }}>{holdsJa}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '3px' }}>
                                <span style={{ fontSize: '9px', fontWeight: 900, color: RED, minWidth: '46px' }}>BREAKS</span>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '17px', fontWeight: 900, color: RED }}>{breaks}</span>
                                <span style={{ fontSize: '10.5px', color: FAINT }}>{breaksJa}</span>
                            </div>
                        </div>
                    </div>

                    {/* 幹の文 — 主語が良いもの4文 / 悪いもの4文 */}
                    <div style={{ marginTop: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                            <span style={{ fontSize: '9px', fontWeight: 900, color: eng.color, letterSpacing: '1px' }}>TRUNK SENTENCES</span>
                            <span style={{ fontSize: '10.5px', color: FAINT }}>主語が良いものか悪いものかで4文ずつ。金の下地 = 議論でそのまま使える表現。X にお題の名詞を入れる</span>
                            <span style={{ marginLeft: 'auto' }}>{addAllBtn(plainItems, `${eng.en} の幹の文`, '+ TRAIN ALL')}</span>
                        </div>
                        {([
                            { side: 'good', keys: TRUNK_GOOD, title: 'WHEN X IS GOOD', sub: 'X を支持する・良いもの(AI / 教育 / 規制 など)', col: DEEPGREEN, bg: '#ECFDF5', demo: 'AI' },
                            { side: 'bad', keys: TRUNK_BAD, title: 'WHEN X IS BAD', sub: 'X が脅威・自分が反対するもの(感染症 / 偽情報 / 全面禁止 など)', col: RED, bg: '#FEF2F2', demo: 'Misinformation' },
                        ]).map((grp) => (
                            <div key={grp.side} style={{ marginTop: '8px', border: `1px solid ${LINE}`, borderLeft: `3px solid ${grp.col}`, borderRadius: '8px', padding: '6px 10px', background: '#fff' }}>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '9px', fontWeight: 900, color: grp.col, background: grp.bg, borderRadius: '3px', padding: '2px 6px', letterSpacing: '0.5px' }}>{grp.title}</span>
                                    <span style={{ fontSize: '10px', color: FAINT }}>{grp.sub}</span>
                                </div>
                                {grp.keys.map((k) => (
                                    <div key={k} style={{ padding: '7px 0', borderTop: `1px solid ${LINE}`, marginTop: '5px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <span style={{ fontSize: '8.5px', fontWeight: 900, color: k === 'pro' || k === 'con' ? grp.col : SUB, letterSpacing: '0.5px' }}>{TRUNK_LABEL[k].en}</span>
                                            <span style={{ fontSize: '10px', color: FAINT }}>{TRUNK_LABEL[k].ja}</span>
                                            <span style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                                                {addBtn(p[k], `${p[`${k}Ja` as const]}(表現: ${p.phrases[k][0]} = ${p.phrases[k][1]})`)}
                                                {playBtn(p[k].replace(/\bX\b/, grp.demo))}
                                            </span>
                                        </div>
                                        <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '15px' : '16px', color: INK, lineHeight: 1.7, marginTop: '3px' }}>
                                            <TrunkText text={p[k]} phrase={p.phrases[k][0]} />
                                        </div>
                                        <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline', flexWrap: 'wrap', marginTop: '3px' }}>
                                            <span style={{ fontSize: '10.5px', fontWeight: 900, color: DEEPGOLD, background: '#FEF3C7', borderRadius: '4px', padding: '1px 7px' }}>{p.phrases[k][0]}</span>
                                            <span style={{ fontSize: '11px', color: SUB }}>{p.phrases[k][1]}</span>
                                        </div>
                                        <div style={{ fontSize: '11px', color: FAINT, lineHeight: 1.6, marginTop: '2px' }}>{p[`${k}Ja` as const]}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* 補足つき(AI) */}
                    <div style={{ marginTop: '14px', background: '#F7FDF9', border: `1px solid ${GREEN}44`, borderRadius: '10px', padding: '10px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                            <span style={{ fontSize: '9px', fontWeight: 900, color: DEEPGREEN, letterSpacing: '1px' }}>BACKED — X = AI</span>
                            <span style={{ fontSize: '10.5px', color: SUB }}>金 = 暗記した文 / 黒 = 固定の型 / 緑 = その場で考える名詞</span>
                            <span style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                                <button
                                    onClick={() => setHideNouns((h) => !h)}
                                    style={{
                                        cursor: 'pointer', font: 'inherit', fontSize: '9px', fontWeight: 900, letterSpacing: '0.5px',
                                        borderRadius: '999px', padding: '4px 11px',
                                        border: `1px solid ${hideNouns ? GREEN : LINE}`,
                                        background: hideNouns ? GREEN : '#fff', color: hideNouns ? '#fff' : SUB,
                                    }}
                                >{hideNouns ? 'SHOW NOUNS' : 'HIDE NOUNS'}</button>
                                {addAllBtn(backedItems, `${eng.en} の補足つき`, '+ TRAIN ALL')}
                            </span>
                        </div>
                        <div style={{ fontSize: '10.5px', color: FAINT, marginBottom: '4px' }}>
                            名詞は見本。HIDE NOUNS で穴に戻して、自分の名詞を入れて言う
                        </div>
                        {[...TRUNK_GOOD, ...TRUNK_BAD].map((k, idx) => {
                            const l = lines.find((x) => x.key === k) as BackedLine;
                            const en = backedText(id, l);
                            const good = TRUNK_GOOD.includes(k);
                            return (
                                <div key={k} style={{ padding: '8px 0', borderTop: `1px solid ${GREEN}22` }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '8.5px', fontWeight: 900, color: good ? DEEPGREEN : RED, letterSpacing: '0.5px' }}>{good ? 'X IS GOOD' : 'X IS BAD'}</span>
                                        {l.steps.map((st) => (
                                            <span key={st.pattern} style={{ fontSize: '8.5px', fontWeight: 900, color: '#fff', background: good ? DEEPGREEN : RED, borderRadius: '3px', padding: '2px 6px' }}>
                                                {SUPPORT_BY_ID[st.pattern].n} {SUPPORT_BY_ID[st.pattern].label}
                                            </span>
                                        ))}
                                        <span style={{ fontSize: '10px', color: FAINT }}>{l.steps.map((st) => SUPPORT_BY_ID[st.pattern].asksJa).join(' + ')} ・ {TRUNK_LABEL[k].ja}</span>
                                        <span style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                                            {addBtn(en, backedItems[idx].ja)}
                                            {playBtn(en)}
                                        </span>
                                    </div>
                                    <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '14.5px' : '15.5px', color: INK, lineHeight: 1.75, marginTop: '3px' }}>
                                        <BackedSentence engine={id} line={l} hideNouns={hideNouns} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* 段落の組み立て — 1段落 = 幹の文 + 型3つ(自由に組む) + 自分の1文 */}
                    <div style={{ marginTop: '14px', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '10px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '9px', fontWeight: 900, color: eng.color, letterSpacing: '1px' }}>AS AN ESSAY PARAGRAPH</span>
                            <span style={{ fontSize: '10.5px', color: FAINT }}>
                                型を3つ押す。押した順につながる。反対側の型は Admittedly, の譲歩になり、次の型は However, で戻る
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', margin: '7px 0' }}>
                            {([1, 2, 3] as const).map((n) => (
                                <button key={n} onClick={() => setParaN(n)} style={{
                                    cursor: 'pointer', font: 'inherit', fontSize: '9px', fontWeight: 900, borderRadius: '999px', padding: '3px 10px',
                                    border: `1px solid ${paraN === n ? INK : LINE}`, background: paraN === n ? INK : '#fff', color: paraN === n ? '#fff' : SUB,
                                }}>{n === 1 ? 'FIRST' : n === 2 ? 'SECOND' : 'FINALLY'}</button>
                            ))}
                            <span style={{ width: '8px' }} />
                            {(['good', 'bad'] as const).map((sd) => (
                                <button key={sd} onClick={() => setParaSide(sd)} style={{
                                    cursor: 'pointer', font: 'inherit', fontSize: '9px', fontWeight: 900, borderRadius: '999px', padding: '3px 10px',
                                    border: `1px solid ${paraSide === sd ? (sd === 'good' ? DEEPGREEN : RED) : LINE}`,
                                    background: paraSide === sd ? (sd === 'good' ? '#ECFDF5' : '#FEF2F2') : '#fff',
                                    color: paraSide === sd ? (sd === 'good' ? DEEPGREEN : RED) : SUB,
                                }}>{sd === 'good' ? 'X IS GOOD' : 'X IS BAD'}</button>
                            ))}
                            {picked.length > 0 && (
                                <button onClick={() => setPicked([])} style={{
                                    cursor: 'pointer', font: 'inherit', fontSize: '9px', fontWeight: 900, borderRadius: '999px', padding: '3px 10px',
                                    border: `1px solid ${LINE}`, background: '#fff', color: SUB, marginLeft: 'auto',
                                }}>CLEAR</button>
                            )}
                        </div>
                        {(['pos', 'neg'] as const).map((pol) => (
                            <div key={pol} style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center', marginTop: '4px' }}>
                                <span style={{ fontSize: '8.5px', fontWeight: 900, color: pol === 'pos' ? DEEPGREEN : RED, minWidth: '30px' }}>{pol === 'pos' ? 'POS' : 'NEG'}</span>
                                {SUPPORT_PATTERNS.filter((sp) => sp.polarity === pol).map((sp) => {
                                    const at = picked.indexOf(sp.id);
                                    const col = pol === 'pos' ? DEEPGREEN : RED;
                                    return (
                                        <button
                                            key={sp.id}
                                            onClick={() => setPicked((cur) => (cur.includes(sp.id)
                                                ? cur.filter((x) => x !== sp.id)
                                                : cur.length >= 3 ? [...cur.slice(1), sp.id] : [...cur, sp.id]))}
                                            style={{
                                                cursor: 'pointer', font: 'inherit', fontSize: '9px', fontWeight: 900, borderRadius: '5px', padding: '3px 7px',
                                                border: `1px solid ${at >= 0 ? col : LINE}`, background: at >= 0 ? col : '#fff', color: at >= 0 ? '#fff' : SUB,
                                            }}
                                        >{at >= 0 ? `${at + 1}. ` : ''}{sp.n} {sp.label}</button>
                                    );
                                })}
                            </div>
                        ))}
                        {(() => {
                            const opener = BODY_OPENERS[paraN - 1].frame.replace('W', eng.slotNoun);
                            const polarity: Polarity = paraSide === 'good' ? 'pos' : 'neg';
                            const claim = (paraSide === 'good' ? p.one : p.oneBad).replace(/\bX\b/, 'AI');
                            const sentences = buildParagraph(`${opener} ${claim}`, polarity, picked.map((pt) => ({ pattern: pt, slots: {} })));
                            return (
                                <>
                                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '15px', color: INK, lineHeight: 1.9, background: CREAM, borderRadius: '8px', padding: '10px 12px', marginTop: '8px' }}>
                                        {sentences.map((t, k) => (
                                            <span key={k} style={{ color: k === 0 && picked.length === 0 ? DEEPGOLD : INK }}>
                                                {k > 0 ? ' ' : ''}<Holes text={t} holes={/\b(A|B)\b/} color={GREEN} />
                                            </span>
                                        ))}
                                        {' '}<span style={{ color: SUB, fontStyle: 'italic', fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontSize: '12px' }}>+ 自分の1文</span>
                                    </div>
                                    <div style={{ fontSize: '10.5px', color: FAINT, marginTop: '6px', lineHeight: 1.7 }}>
                                        {picked.length}/3 ・ 付ける型は、同じ側の直前の文に2つまで付く(by / because が先、カンマの型が後ろ)。X = AI / 緑の枠 = その場で入れる名詞
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{ background: '#fff', minHeight: '100vh' }}>
            <EikenOutputNav active="write" />

            {/* ============ 貼り付く10語のバー ============ */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 40, background: 'rgba(255,255,255,0.96)',
                borderBottom: stuck ? `1px solid ${LINE}` : '1px solid transparent',
                maxHeight: stuck ? '52px' : '0px', overflow: 'hidden', transition: 'max-height 0.2s',
            }}>
                <div style={{
                    maxWidth: '760px', margin: '0 auto', padding: '9px 16px',
                    display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center',
                }}>
                    {CHANT.map((cid, i) => {
                        const eng = ENGINE_BY_ID[cid];
                        return (
                            <span key={cid} style={{ display: 'inline-flex', alignItems: 'center' }}>
                                {i === 5 && <span style={{ color: LINE, fontSize: '12px', margin: '0 5px' }}>|</span>}
                                <button onClick={() => openFinger(cid)} style={{
                                    cursor: 'pointer', font: 'inherit', fontFamily: 'Georgia, serif', fontSize: '11px', fontWeight: 900,
                                    color: eng.color, background: raised.includes(cid) || openEngine === cid ? `${eng.color}1A` : 'none',
                                    border: 'none', borderRadius: '4px', padding: '2px 5px',
                                }}>{eng.en}</button>
                            </span>
                        );
                    })}
                </div>
            </div>

            {/* ============ HERO ============ */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '26px 16px 0' }}>
                <div style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '2px', color: GOLD }}>WRITE PASS / CORE 5</div>
                <h1 style={{
                    margin: '8px 0 8px', fontFamily: 'Georgia, serif', fontSize: isMobile ? '30px' : '42px',
                    fontWeight: 900, color: INK, lineHeight: 1.12,
                }}>
                    Ten reasons.<br />Ten fingers.
                </h1>
                <p style={{ margin: 0, fontSize: isMobile ? '14px' : '15px', lineHeight: 1.8, color: SUB }}>
                    A prompt arrives. Raise three fingers across both hands. Each finger already carries eight short
                    sentences, four for when the subject is good and four for when it is bad. Each reason is four sentences: three come from twenty fixed frames, in any order, and one is yours. The only thing left to think of is
                    two nouns.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '7px', marginTop: '14px' }}>
                    {[
                        ['10', 'fingers', '指 — 賛否の理由は10個しかない'],
                        ['3', 'sub-themes each', '指1本に子テーマ3つ'],
                        ['4+4', 'trunk sentences', '主語が良いもの4文 + 悪いもの4文'],
                        ['20', 'frames to back them', 'ポジ10 + ネガ10。自由に組む。反対側は譲歩で使う'],
                    ].map(([num, en, ja]) => (
                        <div key={en} style={{ border: `1px solid ${LINE}`, borderRadius: '10px', padding: '9px 11px', background: CREAM }}>
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: '24px', fontWeight: 900, color: INK, lineHeight: 1 }}>{num}</div>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: INK, marginTop: '3px' }}>{en}</div>
                            <div style={{ fontSize: '10px', color: FAINT, lineHeight: 1.5 }}>{ja}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ============ 1 HANDS ============ */}
            <div ref={handsRef} style={{ maxWidth: '760px', margin: '0 auto', padding: '26px 16px 0' }}>
                <div style={{
                    display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '22px' : '30px',
                    alignItems: isMobile ? 'stretch' : 'flex-end', justifyContent: 'center',
                }}>
                    {HANDS.map((h) => (
                        <div key={h.id} style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                                textAlign: 'center', marginBottom: '9px', fontFamily: 'Georgia, serif', fontSize: '14px',
                                fontWeight: 900, letterSpacing: '1px', color: h.id === 'left' ? DEEPGOLD : VIOLET,
                            }}>{h.sub}</div>
                            <div style={{ display: 'flex', gap: isMobile ? '5px' : '6px', alignItems: 'flex-end' }}>
                                {(h.id === 'left' ? LEFT_ORDER : RIGHT_ORDER).map((f) => renderFinger(h.id, f))}
                            </div>
                            <div style={{
                                marginTop: '9px', textAlign: 'center', padding: '6px 8px', borderRadius: '8px', fontSize: '10px', color: SUB,
                                background: h.id === 'left' ? '#FEF9E7' : '#F5F3FF',
                                border: `1px solid ${h.id === 'left' ? `${GOLD}55` : `${VIOLET}55`}`,
                            }}>{h.en} ・ {h.ja}</div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '12px', textAlign: 'center' }}>
                    {raised.length > 0 ? (
                        <span style={{ fontSize: '11px', color: SUB }}>
                            Three raised for <b style={{ color: INK }}>{raisedFrom}</b>{' '}
                            <button onClick={() => { setRaised([]); setRaisedFrom(null); }} style={{
                                cursor: 'pointer', font: 'inherit', fontSize: '10px', fontWeight: 900, color: SUB, background: '#fff',
                                border: `1px solid ${LINE}`, borderRadius: '999px', padding: '3px 10px', marginLeft: '6px',
                            }}>CLEAR</button>
                        </span>
                    ) : (
                        <span style={{ fontSize: '11px', color: FAINT, lineHeight: 1.7 }}>
                            Palms down, thumbs facing each other. Tap a finger for its trunk sentences and how to back them.
                        </span>
                    )}
                </div>
            </div>

            {/* ============ 2 ONE FINGER ============ */}
            <div ref={detailRef} style={{ scrollMarginTop: '60px' }}>
                {openEngine && renderDetail(openEngine)}
            </div>

            {/* ============ 3 TWENTY FRAMES ============ */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '34px 16px 0' }}>
                {sectionTitle('Say it short, then back it up', '補足の型20 — ポジ10 + ネガ10。同じ番号が対。組み合わせは自由', 'THE FRAMES')}
                <p style={{ margin: '0 0 12px', fontSize: '12.5px', color: SUB, lineHeight: 1.85 }}>
                    A short claim on its own sounds empty — a teacher called one of these sentences jargon because nothing
                    came after it. There are ten positive frames and ten negative ones, paired by number. The claim never
                    changes, the frame never changes, and only the nouns in the boxes do.
                </p>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '4px 16px 12px' }}>
                    {SUPPORT_PATTERNS.filter((sp) => sp.polarity === 'pos').map((sp, i) => (
                        <div key={sp.id} style={{ padding: '11px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: INK, borderRadius: '4px', padding: '1px 7px' }}>{sp.n}</span>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 900, color: INK }}>{sp.asks}</span>
                                <span style={{ fontSize: '11px', color: FAINT }}>{sp.asksJa}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '10px', marginTop: '6px' }}>
                                {[sp, SUPPORT_BY_ID[sp.mirror]].map((f) => {
                                    const col = f.polarity === 'pos' ? DEEPGREEN : RED;
                                    return (
                                        <div key={f.id} style={{ borderLeft: `3px solid ${col}`, padding: '2px 0 2px 9px' }}>
                                            <div style={{ fontSize: '8.5px', fontWeight: 900, color: col, letterSpacing: '0.5px' }}>{f.polarity === 'pos' ? 'POS' : 'NEG'} {f.n} ・ {f.label}</div>
                                            <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '15px' : '15.5px', color: INK, lineHeight: 1.75, marginTop: '2px' }}>
                                                <span style={{ color: FAINT }}>{f.join === 'sentence' ? '[claim]. ' : '[claim]'}</span>
                                                <Holes text={f.frame} holes={/\b(A|B)\b/} color={GREEN} />
                                            </div>
                                            <div style={{ fontFamily: 'Georgia, serif', fontSize: '12.5px', color: SUB, lineHeight: 1.6, marginTop: '2px' }}>
                                                <span style={{ fontFamily: 'ui-sans-serif, system-ui, sans-serif', fontSize: '9px', fontWeight: 900, color: FAINT, marginRight: '5px' }}>譲歩</span>
                                                <Holes text={concedeSupport(f.id, {})} holes={/\b(A|B)\b/} color={FAINT} />
                                            </div>
                                            <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.65, marginTop: '2px' }}>{f.slotsJa}</div>
                                            <div style={{ fontSize: '10.5px', color: FAINT, lineHeight: 1.65 }}>{f.trapJa}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ margin: '16px 0 0', border: `1px solid ${LINE}`, borderRadius: '12px', background: CREAM, padding: '10px 14px 12px' }}>
                    <div style={{ fontSize: '9px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '1px' }}>FLOWS — ANY ORDER</div>
                    <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.75, margin: '3px 0 8px' }}>
                        全部を型にはしない。<b style={{ color: INK }}>1段落 = 幹の文 + 型3つ + 自分の1文。型3つの組み合わせは自由。</b>決まりは3つだけ。
                        <b style={{ color: INK }}>① 付ける型は1文に2つまで ② 1本の答案で同じ型は1回だけ ③ 反対側の型は Admittedly, で譲歩にして、次の文を However, で戻す。</b>
                        だから20個全部が、賛成の答案にも反対の答案にも入る。
                    </div>
                    {SUPPORT_FLOWS.map((f, i) => {
                        const claim = PARAGRAPH_BY_ENGINE[f.engine][f.key].replace(/\bX\b/, f.subject);
                        const s = buildParagraph(claim, f.polarity, f.steps, f.own);
                        const text = s.join(' ');
                        return (
                            <div key={f.label} style={{ padding: '8px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                                <div style={{ display: 'flex', gap: '5px', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '9px', fontWeight: 900, color: '#fff', background: f.polarity === 'pos' ? INK : RED, borderRadius: '4px', padding: '2px 7px' }}>{f.label}</span>
                                    {f.steps.map((st, k) => {
                                        const sp = SUPPORT_BY_ID[st.pattern];
                                        return (
                                            <span key={st.pattern} style={{ fontSize: '10px', fontWeight: 900, color: sp.polarity === 'pos' ? DEEPGREEN : RED }}>
                                                {k > 0 && <span style={{ color: FAINT, margin: '0 3px' }}>→</span>}
                                                {sp.n} {sp.label}
                                            </span>
                                        );
                                    })}
                                    <span style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                                        {addBtn(text, `流れの見本: ${f.noteJa}`)}
                                        {playBtn(text)}
                                    </span>
                                </div>
                                <div style={{ fontSize: '10.5px', color: FAINT, marginTop: '2px' }}>{f.noteJa}</div>
                                <div style={{ fontFamily: 'Georgia, serif', fontSize: '14.5px', color: INK, lineHeight: 1.8, marginTop: '3px' }}>
                                    {s.slice(0, -1).join(' ')} <span style={{ color: SUB, fontStyle: 'italic' }}>{s[s.length - 1]}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ============ 4 THE FIXED ESSAY ============ */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '34px 16px 0' }}>
                {sectionTitle('The essay around them', '答案の枠 — 冒頭2文・本論の頭3つ・結び2文は動かさない', 'THE FIXED FRAME')}
                <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '4px 16px 12px' }}>
                    {[
                        ...ESSAY_FRAME.slice(0, 2).map((f) => ({ tag: f.role.toUpperCase(), frame: f.frame, ja: f.jobJa })),
                        ...BODY_OPENERS.map((o) => ({ tag: `BODY ${o.n}`, frame: `${o.frame} [trunk sentence, backed]`, ja: o.frameJa })),
                        ...ESSAY_FRAME.slice(2).map((f) => ({ tag: f.role.toUpperCase(), frame: f.frame, ja: f.jobJa })),
                    ].map((row, i) => (
                        <div key={`${row.tag}-${i}`} style={{ padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                            <span style={{ fontSize: '8.5px', fontWeight: 900, letterSpacing: '0.5px', color: row.tag.startsWith('BODY') ? DEEPGREEN : DEEPGOLD }}>{row.tag}</span>
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: '14.5px', color: INK, lineHeight: 1.75, marginTop: '2px' }}>
                                <Holes text={row.frame} holes={/\b([XYZW])\b/} color={DEEPGOLD} />
                            </div>
                            <div style={{ fontSize: '11px', color: FAINT, lineHeight: 1.65 }}>{row.ja.replace(/\*\*/g, '')}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ============ 5 MODEL ESSAYS ============ */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '34px 16px 0' }}>
                {sectionTitle('Five model essays', '模範解答5本 — 30問から形式の違う5問を、幹の文 + 補足の型 + 自分の1文で', 'MODEL ESSAYS')}

                {/* 5問のタブ */}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)', gap: '6px' }}>
                    {MODEL_ESSAYS.map((m, i) => {
                        const on = i === modelIdx;
                        return (
                            <button key={m.id} onClick={() => setModelIdx(i)} style={{
                                cursor: 'pointer', font: 'inherit', textAlign: 'left', borderRadius: '10px', padding: '8px 10px',
                                border: `1.5px solid ${on ? INK : LINE}`, background: on ? INK : '#fff', color: on ? '#fff' : INK,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '4px' }}>
                                    <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.5px', color: on ? GOLD : DEEPGOLD }}>#{m.id} {m.shape}</span>
                                    <span style={{ fontSize: '9px', fontWeight: 900, color: on ? '#fff' : m.answer === 'Yes' ? DEEPGREEN : RED }}>{m.answer.toUpperCase()}</span>
                                </div>
                                <div style={{ fontSize: '11px', fontWeight: 700, lineHeight: 1.45, marginTop: '3px' }}>{m.questionJa}</div>
                            </button>
                        );
                    })}
                </div>

                {(() => {
                    const m = MODEL_ESSAYS[modelIdx];
                    const blocks = modelEssayBlocks(m);
                    const words = modelEssayWords(m);
                    const whole = blocks.map((b) => b.sentences.map((s) => s.en).join(' ')).join('\n\n');
                    const bodyLabel = ['FIRST', 'SECOND', 'FINALLY'];
                    return (
                        <div style={{ marginTop: '10px', border: `1px solid ${LINE}`, borderRadius: '14px', background: '#fff', overflow: 'hidden' }}>
                            {/* 見出し */}
                            <div style={{ padding: '14px 16px 12px', borderBottom: `1px solid ${LINE}`, background: CREAM }}>
                                <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '18px' : '20px', fontWeight: 900, color: INK, lineHeight: 1.35 }}>{m.question}</div>
                                <div style={{ fontSize: '11.5px', color: SUB, marginTop: '3px' }}>{m.questionJa}</div>
                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', marginTop: '9px' }}>
                                    {m.paragraphs.map((p) => (
                                        <span key={p.finger} style={{ fontSize: '9.5px', fontWeight: 900, color: ENGINE_BY_ID[p.finger].color, border: `1px solid ${ENGINE_BY_ID[p.finger].color}66`, borderRadius: '999px', padding: '2px 8px', background: '#fff' }}>
                                            {ENGINE_BY_ID[p.finger].en}
                                        </span>
                                    ))}
                                    <span style={{ fontSize: '10px', fontWeight: 800, color: words >= 200 && words <= 240 ? DEEPGREEN : RED }}>{words} words</span>
                                    <span style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                                        <button onClick={() => setModelHide((h) => !h)} style={{
                                            cursor: 'pointer', font: 'inherit', fontSize: '9px', fontWeight: 900, letterSpacing: '0.5px', borderRadius: '999px', padding: '4px 11px',
                                            border: `1px solid ${modelHide ? GREEN : LINE}`, background: modelHide ? GREEN : '#fff', color: modelHide ? '#fff' : SUB,
                                        }}>{modelHide ? 'SHOW NOUNS' : 'HIDE NOUNS'}</button>
                                        {playBtn(whole)}
                                    </span>
                                </div>
                                <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.7, marginTop: '8px' }}>{m.noteJa}</div>
                            </div>

                            {/* 凡例 */}
                            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', padding: '8px 16px', borderBottom: `1px solid ${LINE}`, fontSize: '10.5px', color: SUB }}>
                                <span><b style={{ color: INK }}>黒</b> 用意した文(枠・幹の文・補足の型)</span>
                                <span><b style={{ color: DEEPGREEN, borderBottom: `2px solid ${GREEN}` }}>緑</b> その場で入れた名詞</span>
                                <span><b style={{ color: VIOLET, fontStyle: 'italic' }}>紫</b> 自分で書いた1文</span>
                            </div>

                            {/* 本文 */}
                            {blocks.map((b, bi) => {
                                const p = b.paragraph;
                                const text = b.sentences.map((s) => s.en).join(' ');
                                const label = b.kind === 'intro' ? 'INTRODUCTION' : b.kind === 'conclusion' ? 'CONCLUSION' : bodyLabel[bi - 1];
                                return (
                                    <div key={bi} style={{ padding: '12px 16px', borderTop: bi === 0 ? 'none' : `1px solid ${LINE}` }}>
                                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '6px' }}>
                                            <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '1px', color: FAINT, minWidth: '64px' }}>{label}</span>
                                            {p && (
                                                <>
                                                    <span style={{ fontSize: '9px', fontWeight: 900, color: '#fff', background: ENGINE_BY_ID[p.finger].color, borderRadius: '4px', padding: '2px 7px' }}>{ENGINE_BY_ID[p.finger].en}</span>
                                                    <span style={{ fontSize: '9px', fontWeight: 900, color: p.polarity === 'pos' ? DEEPGREEN : RED }}>{p.polarity === 'pos' ? 'X IS GOOD' : 'X IS BAD'}</span>
                                                    <span style={{ fontSize: '9.5px', fontWeight: 900, color: DEEPGOLD, background: '#FEF3C7', borderRadius: '4px', padding: '1px 6px' }}>{PARAGRAPH_BY_ENGINE[p.finger].phrases[p.key][0]}</span>
                                                </>
                                            )}
                                            <span style={{ marginLeft: 'auto' }}>{addBtn(text, `模範解答 #${m.id} ${label}: ${m.questionJa}`)}</span>
                                        </div>
                                        {p && (
                                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '7px' }}>
                                                {p.steps.map((st) => {
                                                    const sp = SUPPORT_BY_ID[st.pattern];
                                                    const conceded = sp.polarity !== p.polarity;
                                                    const col = sp.polarity === 'pos' ? DEEPGREEN : RED;
                                                    return (
                                                        <span key={st.pattern} style={{ fontSize: '9px', fontWeight: 800, color: col, background: sp.polarity === 'pos' ? '#ECFDF5' : '#FEF2F2', borderRadius: '4px', padding: '2px 6px' }}>
                                                            {sp.polarity === 'pos' ? 'POS' : 'NEG'} {sp.n} {sp.label}{conceded ? ' ・ 譲歩' : ''}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        )}
                                        <p style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: isMobile ? '15px' : '16px', lineHeight: 1.85, color: INK }}>
                                            {b.sentences.map((s, si) => (
                                                <span key={si}>
                                                    {si > 0 ? ' ' : ''}
                                                    {s.mine && b.kind === 'body'
                                                        ? <span style={{ color: VIOLET, fontStyle: 'italic' }}>{s.en}</span>
                                                        : <NounMarks text={s.en} nouns={b.nouns} hide={modelHide} />}
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })()}
            </div>

            {/* ============ 6 ONE TOPIC, TEN FINGERS ============ */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '34px 16px 0' }}>
                {sectionTitle('One topic, ten fingers', 'お題1つを10本の指で — 30の子テーマ全部を、このお題の文にする', 'TEN FINGERS')}
                {(() => {
                    const T = TOPIC_TEN;
                    const tf = T.fingers[topicIdx];
                    const eng = ENGINE_BY_ID[tf.finger];
                    const lineText = (l: TopicLine) => topicLineSentences(tf.finger, l).join(' ');
                    const nounsOf = (l: TopicLine) => [l.subject, ...l.steps.flatMap((st) => [st.slots.A ?? '', st.slots.B ?? ''])].filter(Boolean);
                    const allItems = [tf.main, ...tf.others, tf.close].map((l) => ({ en: lineText(l), ja: l.ja }));
                    const hideBtn = (
                        <button onClick={() => setTopicHide((h) => !h)} style={{
                            cursor: 'pointer', font: 'inherit', fontSize: '9px', fontWeight: 900, letterSpacing: '0.5px', borderRadius: '999px', padding: '4px 11px',
                            border: `1px solid ${topicHide ? GREEN : LINE}`, background: topicHide ? GREEN : '#fff', color: topicHide ? '#fff' : SUB,
                        }}>{topicHide ? 'SHOW NOUNS' : 'HIDE NOUNS'}</button>
                    );
                    const frameChips = (l: TopicLine) => (
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {l.steps.map((st) => {
                                const sp = SUPPORT_BY_ID[st.pattern];
                                const conceded = sp.polarity !== l.polarity;
                                return (
                                    <span key={st.pattern} style={{
                                        fontSize: '9px', fontWeight: 800, borderRadius: '4px', padding: '2px 6px',
                                        color: sp.polarity === 'pos' ? DEEPGREEN : RED, background: sp.polarity === 'pos' ? '#ECFDF5' : '#FEF2F2',
                                    }}>
                                        {sp.polarity === 'pos' ? 'POS' : 'NEG'} {sp.n} {sp.label} ・ {sp.asks}{conceded ? ' ・ 譲歩' : ''}
                                    </span>
                                );
                            })}
                        </div>
                    );
                    const subjectChip = (l: TopicLine) => (
                        <span style={{ fontSize: '9px', fontWeight: 900, color: l.polarity === 'pos' ? DEEPGREEN : RED }}>
                            {l.polarity === 'pos' ? 'X IS GOOD' : 'X IS BAD'} ・ X = {l.subject}
                        </span>
                    );
                    const phraseChip = (l: TopicLine) => {
                        const ph = PARAGRAPH_BY_ENGINE[tf.finger].phrases[l.key];
                        return (
                            <span style={{ fontSize: '9.5px', color: SUB }}>
                                <b style={{ color: DEEPGOLD, background: '#FEF3C7', borderRadius: '4px', padding: '1px 6px', marginRight: '4px' }}>{ph[0]}</b>{ph[1]}
                            </span>
                        );
                    };
                    const sentenceBody = (l: TopicLine, big: boolean) => {
                        const s = topicLineSentences(tf.finger, l);
                        const nouns = nounsOf(l);
                        return (
                            <p style={{ margin: '5px 0 0', fontFamily: 'Georgia, serif', fontSize: big ? (isMobile ? '15.5px' : '16.5px') : (isMobile ? '14.5px' : '15px'), lineHeight: 1.85, color: INK }}>
                                {s.map((t, k) => (
                                    <span key={k}>
                                        {k > 0 ? ' ' : ''}
                                        {l.own && k === s.length - 1
                                            ? <span style={{ color: VIOLET, fontStyle: 'italic' }}>{t}</span>
                                            : <NounMarks text={t} nouns={nouns} hide={topicHide} />}
                                    </span>
                                ))}
                            </p>
                        );
                    };
                    const branchLabel = (l: TopicLine) => {
                        const bi = trunkBranchIndex(l.key);
                        return bi >= 0 ? `SUB-THEME ${bi + 1} ・ ${eng.branches[bi].en}` : 'CLOSE ・ VERB';
                    };
                    const mainBi = trunkBranchIndex(tf.main.key);
                    const nav = (d: number) => {
                        const n = topicIdx + d;
                        if (n < 0 || n > 9) return <span />;
                        const ne = ENGINE_BY_ID[T.fingers[n].finger];
                        return (
                            <button onClick={() => setTopicIdx(n)} style={{
                                cursor: 'pointer', font: 'inherit', fontSize: '10px', fontWeight: 900, color: ne.color,
                                background: '#fff', border: `1px solid ${LINE}`, borderRadius: '999px', padding: '5px 12px',
                            }}>{d < 0 ? `← ${n + 1} ${ne.en}` : `${n + 1} ${ne.en} →`}</button>
                        );
                    };
                    return (
                        <>
                            {/* お題 */}
                            <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: CREAM, padding: '12px 16px' }}>
                                <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '18px' : '20px', fontWeight: 900, color: INK, lineHeight: 1.35 }}>{T.question}</div>
                                <div style={{ fontSize: '11.5px', color: SUB, marginTop: '2px' }}>{T.questionJa}</div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', marginTop: '8px' }}>
                                    <span style={{ fontSize: '9.5px', fontWeight: 900, color: '#fff', background: DEEPGREEN, borderRadius: '999px', padding: '3px 10px' }}>ALL TEN ON THE YES SIDE</span>
                                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '13.5px', color: INK }}>{T.stance}</span>
                                </div>
                                <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.7, marginTop: '7px' }}>
                                    番号を言って1本ずつ読む。1本の指 = <b style={{ color: INK }}>段落1つ</b>(子テーマ1つ + 型3つ + 自分の1文) + <b style={{ color: INK }}>残りの子テーマ2つ</b>(型1つずつ) + <b style={{ color: INK }}>締めの動詞文</b>。
                                    主語は1文ごとに選ぶ。制限そのものなら X IS GOOD、制限を正当化する害なら X IS BAD。
                                </div>
                            </div>

                            {/* 10本の指 — 左手 / 右手 */}
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                                {(['left', 'right'] as const).map((hand) => (
                                    <div key={hand} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px' }}>
                                        {T.fingers.map((f, i) => ({ f, i })).filter(({ f }) => ENGINE_BY_ID[f.finger].hand === hand).map(({ f, i }) => {
                                            const e = ENGINE_BY_ID[f.finger];
                                            const on = i === topicIdx;
                                            return (
                                                <button key={f.finger} onClick={() => setTopicIdx(i)} style={{
                                                    cursor: 'pointer', font: 'inherit', borderRadius: '9px', padding: '6px 2px', textAlign: 'center',
                                                    border: `1.5px solid ${on ? e.color : LINE}`, background: on ? e.color : '#fff', color: on ? '#fff' : e.color,
                                                }}>
                                                    <div style={{ fontSize: '14px', fontWeight: 900, fontFamily: 'Georgia, serif', lineHeight: 1 }}>{i + 1}</div>
                                                    <div style={{ fontSize: '8px', fontWeight: 900, letterSpacing: '0.3px', marginTop: '3px' }}>{e.en}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>

                            {/* 選んだ指 */}
                            <div style={{ marginTop: '10px', border: `2px solid ${eng.color}`, borderRadius: '14px', background: '#fff', overflow: 'hidden' }}>
                                {/* 見出し + 子テーマ3つ */}
                                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LINE}` }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 900, color: eng.color }}>{topicIdx + 1}</span>
                                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 900, color: INK }}>{eng.en}</span>
                                        <span style={{ fontSize: '11px', color: FAINT }}>{eng.ja}</span>
                                        <span style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                                            {hideBtn}
                                            {addAllBtn(allItems, `${eng.en}(言論の自由)`, '+ TRAIN ALL')}
                                        </span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '5px', marginTop: '9px' }}>
                                        {eng.branches.map((b, bi) => (
                                            <div key={b.en} style={{
                                                borderRadius: '8px', padding: '6px 9px',
                                                border: `1px solid ${bi === mainBi ? eng.color : LINE}`, background: bi === mainBi ? `${eng.color}12` : CREAM,
                                            }}>
                                                <div style={{ fontSize: '8.5px', fontWeight: 900, color: bi === mainBi ? eng.color : FAINT, letterSpacing: '0.5px' }}>
                                                    SUB-THEME {bi + 1}{bi === mainBi ? ' ・ PARAGRAPH' : ''}
                                                </div>
                                                <div style={{ fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 900, color: INK }}>{b.en}</div>
                                                <div style={{ fontSize: '10px', color: FAINT }}>{b.ja}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 凡例 */}
                                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', padding: '7px 16px', borderBottom: `1px solid ${LINE}`, fontSize: '10.5px', color: SUB, background: CREAM }}>
                                    <span><b style={{ color: INK }}>黒</b> 幹の文と補足の型</span>
                                    <span><b style={{ color: DEEPGREEN, borderBottom: `2px solid ${GREEN}` }}>緑</b> その場で入れた名詞</span>
                                    <span><b style={{ color: VIOLET, fontStyle: 'italic' }}>紫</b> 自分で書いた1文</span>
                                </div>

                                {/* 段落 */}
                                <div style={{ padding: '12px 16px', borderBottom: `1px solid ${LINE}` }}>
                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '9px', fontWeight: 900, color: '#fff', background: eng.color, borderRadius: '4px', padding: '2px 7px' }}>PARAGRAPH</span>
                                        <span style={{ fontSize: '9px', fontWeight: 900, color: eng.color, letterSpacing: '0.5px' }}>{branchLabel(tf.main)}</span>
                                        <span style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                                            {addBtn(lineText(tf.main), tf.main.ja)}
                                            {playBtn(lineText(tf.main))}
                                        </span>
                                    </div>
                                    <div style={{ marginTop: '5px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'baseline' }}>{subjectChip(tf.main)}{phraseChip(tf.main)}</div>
                                    <div style={{ marginTop: '5px' }}>{frameChips(tf.main)}</div>
                                    {sentenceBody(tf.main, true)}
                                    <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.75, marginTop: '5px' }}>{tf.main.ja}</div>
                                </div>

                                {/* 残りの子テーマ2つ + 締め */}
                                <div style={{ padding: '4px 16px 8px' }}>
                                    {[...tf.others, tf.close].map((l, k) => (
                                        <div key={l.key} style={{ padding: '10px 0', borderTop: k === 0 ? 'none' : `1px solid ${LINE}` }}>
                                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                                                <span style={{ fontSize: '9px', fontWeight: 900, color: l.key === 'pro' || l.key === 'con' ? SUB : eng.color, letterSpacing: '0.5px' }}>{branchLabel(l)}</span>
                                                {subjectChip(l)}
                                                <span style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                                                    {addBtn(lineText(l), l.ja)}
                                                    {playBtn(lineText(l))}
                                                </span>
                                            </div>
                                            <div style={{ marginTop: '3px' }}>{phraseChip(l)}</div>
                                            <div style={{ marginTop: '4px' }}>{frameChips(l)}</div>
                                            {sentenceBody(l, false)}
                                            <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.7, marginTop: '3px' }}>{l.ja}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* 前後の指 */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderTop: `1px solid ${LINE}`, background: CREAM }}>
                                    {nav(-1)}
                                    {nav(1)}
                                </div>
                            </div>
                        </>
                    );
                })()}
            </div>

            {/* ============ 7 PROMPTS ============ */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '34px 16px 0' }}>
                {sectionTitle('Raise three fingers for a prompt', 'お題 — 押すと手の上で3本が立つ', 'PROMPTS')}
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '9px' }}>
                    {[...TOPIC_KINDS.map((k) => ({ id: k.id as TopicKind | 'all', label: k.ja })), { id: 'all' as const, label: 'すべて' }].map((k) => (
                        <button key={k.id} onClick={() => setKind(k.id)} style={{
                            cursor: 'pointer', font: 'inherit', fontSize: '10px', fontWeight: 900, borderRadius: '999px', padding: '4px 12px',
                            border: `1px solid ${kind === k.id ? INK : LINE}`, background: kind === k.id ? INK : '#fff', color: kind === k.id ? '#fff' : SUB,
                        }}>{k.label}</button>
                    ))}
                </div>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '2px 14px' }}>
                    {filteredTopics.map((t, i) => {
                        const isUp = raisedFrom === t.topic;
                        return (
                            <button key={t.topic} onClick={() => raiseFor(t.engines, t.topic)} style={{
                                display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer', font: 'inherit',
                                background: isUp ? CREAM : 'none', border: 'none',
                                borderTop: i === 0 ? 'none' : `1px solid ${LINE}`, padding: '9px 4px',
                            }}>
                                <div style={{ fontFamily: 'Georgia, serif', fontSize: '14px', color: INK, lineHeight: 1.6 }}>{t.topic}</div>
                                <div style={{ display: 'flex', gap: '5px', alignItems: 'center', flexWrap: 'wrap', marginTop: '3px' }}>
                                    <span style={{ fontSize: '10.5px', color: FAINT, marginRight: '4px' }}>{t.topicJa}</span>
                                    {t.engines.map((eid) => (
                                        <span key={eid} style={{
                                            fontSize: '9px', fontWeight: 900, color: ENGINE_BY_ID[eid].color,
                                            border: `1px solid ${ENGINE_BY_ID[eid].color}55`, borderRadius: '4px', padding: '1px 6px',
                                        }}>{ENGINE_BY_ID[eid].en}</span>
                                    ))}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ============ 6 SPEAKING ============ */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '34px 16px 0' }}>
                {sectionTitle('When you say it out loud', '喋るとき — 蝶番5本と、I think の代わり5本', 'SPEAKING')}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '9px' }}>
                    {[
                        { title: 'FIVE HINGES', ja: '話題を立てる5本', list: SPEAKING_FIVE },
                        { title: 'INSTEAD OF I THINK', ja: `I think の代わり(作者の録音${I_THINK_COUNT.lessons}レッスンで${I_THINK_COUNT.total}回)`, list: INSTEAD_OF_I_THINK },
                    ].map((box) => (
                        <div key={box.title} style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '10px 13px' }}>
                            <div style={{ fontSize: '9px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '1px' }}>{box.title}</div>
                            <div style={{ fontSize: '10.5px', color: FAINT, marginBottom: '5px' }}>{box.ja}</div>
                            {box.list.map((sp) => (
                                <div key={sp.en} style={{ display: 'flex', alignItems: 'baseline', gap: '8px', padding: '5px 0', borderTop: `1px solid ${LINE}` }}>
                                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 700, color: INK }}>
                                        <Holes text={sp.en} holes={/\b(X)\b/} color={DEEPGOLD} />
                                    </span>
                                    <span style={{ fontSize: '10.5px', color: FAINT, marginLeft: 'auto', textAlign: 'right' }}>{sp.ja}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* ============ LINKS ============ */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '30px 16px 0', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                    { href: '/english/write/core5/demo', label: 'DEMO — 講師に見せる英語版' },
                    { href: '/english/write/core5/sheet', label: '1枚 — 日本語で全体を見る' },
                    { href: '/english/write/core5/talk', label: 'TALK — 1つの話を80表現で話し切る(生保 / 金融業界)' },
                ].map((l) => (
                    <Link key={l.href} href={l.href} style={{
                        fontSize: '11px', fontWeight: 900, color: INK, textDecoration: 'none',
                        border: `1px solid ${LINE}`, borderRadius: '999px', padding: '6px 14px', background: '#fff',
                    }}>{l.label} →</Link>
                ))}
            </div>

            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '30px 16px 50px' }}>
                <EikenOutputDisclaimer />
            </div>

            {bulk && (
                <div style={{
                    position: 'fixed', bottom: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 60,
                    background: INK, color: '#fff', borderRadius: '999px', padding: '8px 16px', fontSize: '11px', fontWeight: 800,
                }}>
                    {bulk.label}: {bulk.done} / {bulk.total}
                </div>
            )}
        </div>
    );
}
