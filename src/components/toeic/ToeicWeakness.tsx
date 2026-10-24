'use client';

/**
 * 弱点レポート -- 採点後に「この人が何を落としたか」を出す。
 *
 * 模試は解いて点を見て終わりになりがちなので、誤答から
 *   (1) どの型で落としているか (タイプ別失点)
 *   (2) その問題に出てきた要注意の単語
 *   (3) 戻るべき設問
 * の3つを機械的に取り出し、単語はそのまま Words (/api/user-words) に登録できるようにする。
 *
 * 単語の出どころは2系統。解説データ(語注)がある回はそれが主。無い回でも
 * 各設問の日本語 note に「absenteeism(欠勤)」の形で語義が書かれているので、
 * そこから拾う。どちらも既にあるデータで、新しい生成は要らない。
 */

import { useMemo, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import type { Choice, Gloss, ToeicExplain, ToeicGlossary, ToeicTest } from '@/data/english/toeic-types';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E2D5';
const RED = '#DC2626';

const REG_KEY = 'toeic-registered-words';

/**
 * トレーニング画面は Word / Phrase の表示モードを localStorage で覚えている。
 * ここから飛ぶときは登録先である Word に合わせておかないと、
 * 「登録したのに出てこない」に見える。
 */
function toWordMode() {
    try { localStorage.setItem('training-data-mode', 'words'); } catch { /* noop */ }
}

/* ================================================================
   設問タイプのラベル付け
   ================================================================ */

const P2_LABEL: Record<string, string> = {
    direct: '直接の応答',
    indirect: '間接の応答',
    echo: '聞き返し',
};

const P6_LABEL: Record<string, string> = {
    sentence: '文挿入',
    verb: '動詞形・時制',
    pos: '品詞',
    vocab: '語彙',
    transition: '接続語・転換',
    word: '語彙・語形',
};

const P7_LABEL: Record<string, string> = {
    purpose: '目的',
    detail: '詳細',
    infer: '推論',
    person: '人物推論',
    not: 'NOT問',
    synonym: '同義語',
    insert: '文挿入',
    intent: '発言の意図',
};

/** qType を持たない回(01-03)のための、設問文からの型推定 */
function classifyPart7(question: string): string {
    const q = question.toLowerCase();
    if (/\bnot\b|\bexcept\b/.test(question)) return 'NOT問';
    if (/closest in meaning|refers? to/.test(q)) return '同義語';
    if (/belong|following sentence|\[1\]/.test(q)) return '文挿入';
    if (/purpose|why was|why did .* (write|send)/.test(q)) return '目的';
    if (/most likely mean|why does .* (write|say)/.test(q)) return '発言の意図';
    if (/who /.test(q)) return '人物推論';
    if (/suggest|indicate|imply|most likely|probably/.test(q)) return '推論';
    return '詳細';
}

interface QMeta {
    no: number;
    part: number;
    labels: string[];   // 1問が複数の型に属することがある (例: 推論 + 複数文書の参照)
    note?: string;
    text: string;       // 語注の絞り込みに使う、その設問まわりの英文
}

function choiceText(cs: Choice[] | { label: string; text: string }[]): string {
    return (cs as { text: string }[]).map(c => c.text).join(' ');
}

/* ================================================================
   単語の抽出
   ================================================================ */

/** note 中の「absenteeism(欠勤)」形の語義ペアを拾う */
const PAIR_RE = /([A-Za-z][A-Za-z'’-]*(?:\s+[A-Za-z'’-]+){0,2})\s*[（(]([^)）]{1,30})[）)]/g;
const HAS_JP = /[ぁ-んァ-ヶ一-龥]/;

function minePairs(note: string): { w: string; m: string }[] {
    const out: { w: string; m: string }[] = [];
    for (const m of note.matchAll(PAIR_RE)) {
        const w = m[1].trim();
        const mean = m[2].trim();
        if (w.length < 3) continue;              // (A) のような選択肢ラベルを除く
        if (!HAS_JP.test(mean)) continue;        // 意味が日本語でないものは語義ではない
        if (HAS_JP.test(w)) continue;
        out.push({ w, m: mean });
    }
    return out;
}

interface WordItem {
    w: string;
    m: string;
    star?: string;
    from: number;     // 出典の設問番号
    tier: 1 | 2 | 3;  // 1=設問が直接問うた語 / 2=その設問に出てくる語 / 3=同じ文書の語注
}

/* ================================================================
   Component
   ================================================================ */

export default function ToeicWeakness({
    test, explain, glossary, answers, isMobile, anchorTop,
}: {
    test: ToeicTest;
    /** 解説編がある回 (Test 04)。語注はこの中に入っている */
    explain?: ToeicExplain;
    /** 解説編が無い回 (Test 01-03) の、語注だけのデータ */
    glossary?: ToeicGlossary;
    answers: Record<number, string>;
    isMobile: boolean;
    anchorTop: string;
}) {
    const [registered, setRegistered] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);
    const [bulk, setBulk] = useState<{ done: number; total: number } | null>(null);
    const [showAllWords, setShowAllWords] = useState(false);

    useEffect(() => {
        try {
            const s = localStorage.getItem(REG_KEY);
            if (s) setRegistered(new Set(JSON.parse(s)));
        } catch { /* noop */ }
    }, []);

    const markRegistered = useCallback((keys: string[]) => {
        setRegistered(prev => {
            const next = new Set(prev);
            keys.forEach(k => next.add(k));
            try { localStorage.setItem(REG_KEY, JSON.stringify([...next])); } catch { /* noop */ }
            return next;
        });
    }, []);

    /* ---- 設問インデックス ---- */
    const index = useMemo(() => {
        const m = new Map<number, QMeta>();
        test.part1.forEach(q => m.set(q.no, {
            no: q.no, part: 1, labels: ['写真描写'], note: q.note, text: `${q.sceneDescription} ${choiceText(q.statements)}`,
        }));
        test.part2.forEach(q => m.set(q.no, {
            no: q.no, part: 2, labels: [q.replyType ? P2_LABEL[q.replyType] : '応答'], note: q.note,
            text: `${q.prompt} ${choiceText(q.responses)}`,
        }));
        ([[3, test.part3], [4, test.part4]] as const).forEach(([part, sets]) => {
            sets.forEach(s => s.questions.forEach(q => m.set(q.no, {
                no: q.no, part,
                labels: [q.intentQ ? '発言の意図' : q.graphicQ ? '図表問題' : part === 3 ? '会話の聞き取り' : '説明文の聞き取り'],
                note: q.note, text: `${q.question} ${choiceText(q.choices)} ${s.transcript}`,
            })));
        });
        test.part5.forEach(q => m.set(q.no, {
            no: q.no, part: 5, labels: [q.tag || 'その他'], note: q.note,
            text: `${q.sentence} ${choiceText(q.choices)}`,
        }));
        test.part6.forEach(s => s.questions.forEach(q => m.set(q.no, {
            no: q.no, part: 6, labels: [P6_LABEL[q.type] || '語彙・語形'], note: q.note,
            text: `${choiceText(q.choices)} ${s.passage}`,
        })));
        [...test.part7single, ...test.part7multiple].forEach(s => s.questions.forEach(q => {
            const labels = [q.qType ? P7_LABEL[q.qType] : classifyPart7(q.question)];
            if (q.crossRef) labels.push('複数文書の参照');
            m.set(q.no, {
                no: q.no, part: 7, labels, note: q.note,
                text: `${q.question} ${choiceText(q.choices)}`,
            });
        }));
        return m;
    }, [test]);

    /**
     * 設問番号 -> その設問が属する文書の語注。
     * 解説編を持つ回は解説編から、持たない回は語注データから引く。どちらも無い回は空。
     */
    const glossByNo = useMemo(() => {
        const m = new Map<number, Gloss[]>();
        (explain?.sets || []).forEach(s => s.questions.forEach(q => m.set(q.no, s.gloss || [])));
        (glossary?.sets || []).forEach(s => s.nos.forEach(no => {
            if (!m.has(no)) m.set(no, s.gloss || []);
        }));
        return m;
    }, [explain, glossary]);

    /* ---- 誤答 / 未回答 ---- */
    const { wrongNos, blankNos } = useMemo(() => {
        const wrongNos: number[] = [];
        const blankNos: number[] = [];
        test.answerKey.forEach(k => {
            const a = answers[k.no];
            if (a == null) blankNos.push(k.no);
            else if (a !== k.answer) wrongNos.push(k.no);
        });
        return { wrongNos, blankNos };
    }, [answers, test]);

    /* ---- タイプ別の失点 ---- */
    const buckets = useMemo(() => {
        const total = new Map<string, number>();
        index.forEach(meta => meta.labels.forEach(l => total.set(l, (total.get(l) || 0) + 1)));
        const wrong = new Map<string, number[]>();
        wrongNos.forEach(no => {
            index.get(no)?.labels.forEach(l => {
                const arr = wrong.get(l) || [];
                arr.push(no);
                wrong.set(l, arr);
            });
        });
        return [...wrong.entries()]
            .map(([label, nos]) => ({ label, nos, total: total.get(label) || nos.length }))
            .sort((a, b) => (b.nos.length / b.total) - (a.nos.length / a.total) || b.nos.length - a.nos.length);
    }, [index, wrongNos]);

    /* ---- 要注意の単語 ---- */
    const words = useMemo(() => {
        const seen = new Map<string, WordItem>();
        const put = (item: WordItem) => {
            const key = item.w.toLowerCase();
            const prev = seen.get(key);
            if (!prev || item.tier < prev.tier) seen.set(key, item);
        };
        wrongNos.forEach(no => {
            const meta = index.get(no);
            if (!meta) return;

            // tier 1: note に書かれた語義 = その設問が直接問うた語。
            // Part 5/6 の note は「absenteeism(欠勤)」の形が守られているが、Part 3/4/7 は
            // 根拠を述べる地の文で、英語の引用に日本語が続くだけの箇所を語義と誤読する。
            if (meta.part === 5 || meta.part === 6) {
                minePairs(meta.note || '').forEach(p => put({ ...p, from: no, tier: 1 }));
            }

            // tier 2/3: 語注。セット単位(設問5問ぶん)なので、この設問の英文に実際に
            // 出る語だけを前に出す。先頭語だけの一致にすると by / as が何にでも当たる。
            const hay = meta.text.toLowerCase();
            (glossByNo.get(no) || []).forEach(g => {
                const inThisQuestion = hay.includes(g.w.toLowerCase());
                put({ w: g.w, m: g.m, star: g.star, from: no, tier: inThisQuestion ? 2 : 3 });
            });
        });
        const all = [...seen.values()].sort((a, b) => a.tier - b.tier || a.from - b.from);
        return { focus: all.filter(w => w.tier <= 2), rest: all.filter(w => w.tier === 3) };
    }, [wrongNos, index, glossByNo]);

    /* ---- 登録 ---- */
    const registerOne = useCallback(async (item: WordItem): Promise<boolean> => {
        try {
            const res = await fetch('/api/user-words', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english: item.w,
                    japanese: item.m,
                    note: item.star ? item.star.replace(/^★/, '') : undefined,
                    category: 'toeic',
                }),
            });
            // 409 = 既に登録済み。こちらの目的は達成しているので成功として扱う
            return res.ok || res.status === 409;
        } catch {
            return false;
        }
    }, []);

    const addOne = useCallback(async (item: WordItem) => {
        const key = item.w.toLowerCase();
        if (registered.has(key) || busy) return;
        setBusy(key);
        const ok = await registerOne(item);
        if (ok) markRegistered([key]);
        setBusy(null);
    }, [registered, busy, registerOne, markRegistered]);

    const addMany = useCallback(async (items: WordItem[]) => {
        const targets = items.filter(i => !registered.has(i.w.toLowerCase()));
        if (targets.length === 0 || bulk) return;
        setBulk({ done: 0, total: targets.length });
        const done: string[] = [];
        for (let i = 0; i < targets.length; i++) {
            const ok = await registerOne(targets[i]);
            if (ok) done.push(targets[i].w.toLowerCase());
            setBulk({ done: i + 1, total: targets.length });
        }
        markRegistered(done);
        setBulk(null);
    }, [registered, bulk, registerOne, markRegistered]);

    /* ================================================================
       描画
       ================================================================ */

    const answered = test.answerKey.length - blankNos.length;

    if (wrongNos.length === 0) {
        return (
            <div id="weak" style={{ marginTop: '30px', scrollMarginTop: anchorTop, border: `1px solid ${GREEN}55`, background: '#F0FDF9', borderRadius: '12px', padding: '18px 18px' }}>
                <div style={{ fontSize: '14px', fontWeight: 900, color: DEEPGREEN }}>弱点なし</div>
                <p style={{ margin: '6px 0 0', fontSize: '12px', lineHeight: 1.8, color: SUB }}>
                    {answered === 0
                        ? 'まだ1問も解答がありません。解いてから「採点する」を押すと、落とした型と単語がここに出ます。'
                        : `解答した ${answered} 問はすべて正解です。落とした問題が出ると、その型と語がここに並びます。`}
                </p>
            </div>
        );
    }

    const focusUnregistered = words.focus.filter(w => !registered.has(w.w.toLowerCase()));
    const shownRest = showAllWords ? words.rest : [];

    const WordRow = ({ item }: { item: WordItem }) => {
        const key = item.w.toLowerCase();
        const done = registered.has(key);
        const loading = busy === key;
        return (
            <div style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '9px 11px',
                border: `1px solid ${done ? `${GREEN}66` : LINE}`, borderRadius: '9px',
                background: done ? '#F0FDF9' : '#fff',
            }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: INK }}>{item.w}</span>
                        <span style={{ fontSize: '12.5px', color: '#44403C' }}>{item.m}</span>
                        <span style={{ fontSize: '10px', color: SUB }}>No.{item.from}</span>
                    </div>
                    {item.star && (
                        <div style={{ fontSize: '11px', lineHeight: 1.7, color: SUB, marginTop: '3px' }}>{item.star}</div>
                    )}
                </div>
                <button
                    onClick={() => addOne(item)}
                    disabled={done || loading || bulk != null}
                    style={{
                        flexShrink: 0, padding: '6px 11px', fontSize: '11px', fontWeight: 800, borderRadius: '7px',
                        cursor: done ? 'default' : 'pointer',
                        border: `1px solid ${done ? GREEN : GOLD}`,
                        background: done ? 'rgba(16,185,129,0.10)' : 'rgba(212,175,55,0.12)',
                        color: done ? DEEPGREEN : DEEPGOLD,
                        whiteSpace: 'nowrap',
                    }}>
                    {done ? '登録済み' : loading ? '追加中' : '追加'}
                </button>
            </div>
        );
    };

    return (
        <div id="weak" className="no-print" style={{ marginTop: '30px', scrollMarginTop: anchorTop }}>
            <div style={{ background: INK, color: '#fff', borderRadius: '8px', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                <span style={{ fontSize: '15px', fontWeight: 900, letterSpacing: '1px' }}>弱点レポート</span>
                <span style={{ fontSize: '11px', color: '#C9C0AC' }}>
                    誤答 {wrongNos.length} 問{blankNos.length > 0 && ` ・ 未回答 ${blankNos.length} 問`}
                </span>
            </div>

            {/* ---- 1. タイプ別の失点 ---- */}
            <section style={{ marginTop: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '12px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '1px' }}>
                    どの型で落としたか
                </h3>
                <p style={{ margin: '4px 0 10px', fontSize: '11px', color: SUB, lineHeight: 1.7 }}>
                    誤答率の高い順。上にあるものほど、次に潰す価値がある。
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {buckets.map(b => {
                        const rate = b.nos.length / b.total;
                        return (
                            <div key={b.label} style={{ border: `1px solid ${LINE}`, borderRadius: '9px', padding: '9px 11px', background: '#fff' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '10px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 800, color: INK }}>{b.label}</span>
                                    <span style={{ fontSize: '11px', color: SUB, whiteSpace: 'nowrap' }}>
                                        <b style={{ color: rate >= 0.5 ? RED : INK, fontSize: '13px' }}>{b.nos.length}</b> / {b.total} 問ミス
                                    </span>
                                </div>
                                <div style={{ height: '5px', borderRadius: '99px', background: '#F1EFE7', marginTop: '6px', overflow: 'hidden' }}>
                                    <div style={{ width: `${Math.round(rate * 100)}%`, height: '100%', background: rate >= 0.5 ? RED : GOLD }} />
                                </div>
                                <div style={{ marginTop: '6px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                    {b.nos.map(no => (
                                        <a key={no} href={`#q${no}`} style={{ fontSize: '10.5px', fontWeight: 700, color: SUB, textDecoration: 'none', border: `1px solid ${LINE}`, borderRadius: '5px', padding: '2px 6px' }}>
                                            {no}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ---- 2. 要注意の単語 ---- */}
            <section style={{ marginTop: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0, fontSize: '12px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '1px' }}>
                        落とした問題に出てきた単語
                    </h3>
                    <span style={{ fontSize: '11px', color: SUB }}>{words.focus.length} 語</span>
                </div>
                <p style={{ margin: '4px 0 10px', fontSize: '11px', color: SUB, lineHeight: 1.7 }}>
                    登録すると <Link href="/english/training" onClick={toWordMode} style={{ color: DEEPGREEN, fontWeight: 700 }}>トレーニングの Word</Link> に入って、毎日の復習に混ざる。
                </p>

                {words.focus.length === 0 ? (
                    <div style={{ border: `1px dashed ${LINE}`, borderRadius: '9px', padding: '14px', fontSize: '11.5px', color: SUB, lineHeight: 1.8 }}>
                        落とした問題の英文に、語注の付いた語が1つも無かった。
                        語を足すには src/data/english/toeic-gloss-words.ts に書いて
                        build-toeic-gloss を回し直す。
                    </div>
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {words.focus.map(item => <WordRow key={item.w.toLowerCase()} item={item} />)}
                            {shownRest.map(item => <WordRow key={item.w.toLowerCase()} item={item} />)}
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => addMany([...words.focus, ...shownRest])}
                                disabled={bulk != null || focusUnregistered.length === 0}
                                style={{
                                    padding: '9px 16px', fontSize: '12px', fontWeight: 900, borderRadius: '8px',
                                    border: 'none', cursor: bulk ? 'default' : 'pointer',
                                    background: focusUnregistered.length === 0 ? '#E7E5E4' : GOLD,
                                    color: focusUnregistered.length === 0 ? SUB : INK,
                                }}>
                                {bulk ? `登録中 ${bulk.done} / ${bulk.total}`
                                    : focusUnregistered.length === 0 ? 'すべて登録済み'
                                        : `未登録の ${focusUnregistered.length} 語をまとめて登録`}
                            </button>
                            {words.rest.length > 0 && (
                                <button
                                    onClick={() => setShowAllWords(v => !v)}
                                    style={{
                                        padding: '9px 14px', fontSize: '12px', fontWeight: 700, borderRadius: '8px',
                                        border: `1px solid ${LINE}`, background: '#fff', color: SUB, cursor: 'pointer',
                                    }}>
                                    {showAllWords ? '同じ文書の語注を隠す' : `同じ文書の語注も見る (${words.rest.length} 語)`}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </section>

            {/* ---- 3. 戻る設問 ---- */}
            <section style={{ marginTop: '22px' }}>
                <h3 style={{ margin: 0, fontSize: '12px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '1px' }}>
                    間違えた設問
                </h3>
                <p style={{ margin: '4px 0 10px', fontSize: '11px', color: SUB, lineHeight: 1.7 }}>
                    番号を押すとその問題に飛ぶ。「解答解説」を ON にしてから飛ぶと解説が付いた状態で読める。
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '6px' }}>
                    {wrongNos.map(no => {
                        const meta = index.get(no);
                        const key = test.answerKey.find(k => k.no === no);
                        return (
                            <a key={no} href={`#q${no}`} style={{
                                display: 'block', textDecoration: 'none', border: `1px solid ${LINE}`,
                                borderLeft: `3px solid ${RED}`, borderRadius: '8px', padding: '7px 9px', background: '#fff',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{no}</span>
                                    <span style={{ fontSize: '10.5px', color: RED, fontWeight: 700 }}>{answers[no]}</span>
                                    <span style={{ fontSize: '10px', color: SUB }}>→</span>
                                    <span style={{ fontSize: '10.5px', color: DEEPGREEN, fontWeight: 700 }}>{key?.answer}</span>
                                </div>
                                <div style={{ fontSize: '10.5px', color: SUB, marginTop: '2px' }}>
                                    Part {meta?.part} ・ {meta?.labels.join(' / ')}
                                </div>
                            </a>
                        );
                    })}
                </div>

                {blankNos.length > 0 && (
                    <p style={{ margin: '10px 0 0', fontSize: '11px', color: SUB, lineHeight: 1.8 }}>
                        未回答が {blankNos.length} 問ある ({blankNos.slice(0, 12).join(', ')}{blankNos.length > 12 ? ' ...' : ''})。
                        未回答は誤答に数えていないので、上の数字は実力より甘く出ている。
                    </p>
                )}
            </section>
        </div>
    );
}
