'use client';
// レッスン統合ビュー (旧: 一文ずつ解説)。会話 + 検死 + 解説を 1 ページに集約。
// 各行: 元発言 / ネイティブなら(alt⊕fix) / 解説(fixWhy⊕spice) / 盗む(pick) / 豆知識(know) / 深掘り(engaged)。
// 直しと言換は2行に分けない。見出しは常に「ネイティブが実際に言う形」で、金具だけ直した形は
// その下に小さく残す(文法は別皿として残すが、主役ではない)。
// ネイティブ行・金具・盗む・深掘りは /api/phrases に登録できる(同一英文は登録前に dedup、既出はサーバ判定)。
// 登録済みは localStorage で記憶。会話ページ /dmm/[id] はこのページへ統合(転送)。
// 開いただけでは登録しない。登録の入口は会話を貼った時点の scripts/register-lesson-cards.mjs 1本。
// 「登録済」はその日の D1 の英文(inTraining)と、スクリプトと同じ畳む判定(card-fold)で照らす。

import { useEffect, useState, useMemo, Fragment } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import type { LessonReview, ReviewLine } from '@/data/english/lesson-reviews';
import type { LessonAspiration } from '@/data/english/lesson-aspirations';
import type { DmmConversation } from '@/lib/d1';
import { isCovered } from '@/lib/card-fold';

// **強調** だけを太字にする。解説の本文はデータ側で ** を使って書かれているので、
// そのまま出すと記号が読者に見えてしまう。番組ページ(/english/yochi)と同じ扱いに揃える。
function Rich({ text }: { text: string }): ReactNode {
    // 正規表現を使わない。** で割って、奇数番目だけ太字にする。
    return text.split('**').map((part, i) =>
        i % 2 === 1
            ? <strong key={i} style={{ fontWeight: 800 }}>{part}</strong>
            : <Fragment key={i}>{part}</Fragment>
    );
}

function key(reviewId: string, i: number, kind: 'alt' | 'fix' | 'pick' | 'eng' | 'aspmine' | 'aspbn') {
    return `lesson-review-reg:${reviewId}:${i}:${kind}`;
}

/** 内容語の集合。冠詞や短い語は落として、実質の中身だけを見る */
function contentWords(s: string) {
    return new Set(s.toLowerCase().replace(/[^a-z0-9' ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
}

/** 2文の重なり具合 (0〜1)。共通語 / 全体語 */
function overlap(a: string, b: string) {
    const A = contentWords(a);
    const B = contentWords(b);
    if (!A.size || !B.size) return 0;
    let both = 0;
    A.forEach((w) => { if (B.has(w)) both++; });
    return both / (A.size + B.size - both);
}

/**
 * 言換(alt)を出すか。
 *
 * 直し(fix)と中身が被るなら出さない。完全一致だけを見ても足りない —
 * 「Air fryer -- sorry, I heard hair dryer.」と
 * 「Air fryer! Sorry -- my ears went straight to hair dryer.」は別の文字列だが、
 * 読む側にとっては同じ1つの情報で、2行あるぶんだけ迷う。
 * 実測すると fix と alt の両方がある 689 行のうち 194 行がこの状態だった。
 */

const ALT_OVERLAP_LIMIT = 0.5;

function altIsRedundant(line: ReviewLine) {
    if (!line.alt) return true;
    if (!line.fix) return false;
    return overlap(line.alt, line.fix) >= ALT_OVERLAP_LIMIT;
}

/**
 * トレーニングに流し込む対象。**選り分けない。この回で英語として出た形は全部入れる。**
 *
 * 以前は「必要なやつだけ = fix + 印を立てた alt」と「言換も」の2段構えだった。
 * だが、どれが本命かを毎回こちらが決める必要はない。1レッスンで50枚前後にしかならないし、
 * 復習側(/training)は出題を間引く仕組みを自前で持っている。**選ぶコストのほうが高い。**
 *
 *   fix      誤りを直した形
 *   alt      ネイティブならこう言う形(fix と中身が被る行だけ落とす)
 *   pick     先生の口から実際に出た形
 *   engaged  違う角度から返すネイティブ版
 *
 * 同一英文はまとめて1回だけ POST し、既出はサーバ側が弾く。
 */
function allItems(review: LessonReview, engagedByIndex: Record<number, string>) {
    const out: { k: string; english: string; japanese: string }[] = [];
    review.lines.forEach((l, i) => {
        if (l.fix) out.push({ k: key(review.id, i, 'fix'), english: l.fix, japanese: l.fixWhy || '' });
        if (l.alt && !altIsRedundant(l)) {
            out.push({
                k: key(review.id, i, 'alt'),
                english: l.alt,
                japanese: l.altChunk ? `${l.altChunk} — ${l.spice || ''}` : (l.spice || ''),
            });
        }
        if (l.pick) out.push({ k: key(review.id, i, 'pick'), english: l.pick, japanese: l.pickWhy || '' });
        const eng = engagedByIndex[i];
        if (eng) out.push({ k: key(review.id, i, 'eng'), english: eng, japanese: l.spice || '' });
    });
    return out;
}

export default function ReviewBoard({ review, conversation, aspiration, inTraining }: { review: LessonReview; conversation?: DmmConversation | null; aspiration?: LessonAspiration | null; inTraining?: string[] }) {
    const [registered, setRegistered] = useState<Record<string, string>>({});
    const [dup, setDup] = useState<Record<string, boolean>>({});
    const [busy, setBusy] = useState<Record<string, boolean>>({});
    const [bulk, setBulk] = useState(false);
    const [fixOnly, setFixOnly] = useState(false);
    // localStorage からの復元が終わったか。終わる前に D1 の照合を足すと、復元で上書きされる
    const [hydrated, setHydrated] = useState(false);

    const diag = conversation?.diagnosis || null;

    // engaged(深掘り): review 行が自前で持っていればそれを優先。無ければ会話の生徒ターン順に対応づけ(後方互換)。
    const engagedByIndex = useMemo(() => {
        const m: Record<number, string> = {};
        const se = conversation ? conversation.turns.filter((t) => t.role === 'student').map((t) => (t.engaged || t.comedian || '').trim()) : [];
        let si = 0;
        review.lines.forEach((l, i) => {
            if (l.role === 'student') {
                if (l.engaged) m[i] = l.engaged;
                else if (se[si]) m[i] = se[si];
                si++;
            }
        });
        return m;
    }, [review, conversation]);

    useEffect(() => {
        const map: Record<string, string> = {};
        const dupMap: Record<string, boolean> = {};
        review.lines.forEach((l, i) => {
            (['alt', 'fix', 'pick', 'eng'] as const).forEach((k) => {
                try {
                    const v = localStorage.getItem(key(review.id, i, k));
                    if (v) map[key(review.id, i, k)] = v;
                    if (localStorage.getItem(`${key(review.id, i, k)}:dup`) === '1') dupMap[key(review.id, i, k)] = true;
                } catch { /* ignore */ }
            });
        });
        if (aspiration) {
            aspiration.items.forEach((_, n) => {
                (['aspmine', 'aspbn'] as const).forEach((k) => {
                    try {
                        const v = localStorage.getItem(key(review.id, n, k));
                        if (v) map[key(review.id, n, k)] = v;
                        if (localStorage.getItem(`${key(review.id, n, k)}:dup`) === '1') dupMap[key(review.id, n, k)] = true;
                    } catch { /* ignore */ }
                });
            });
        }
        setRegistered(map);
        setDup(dupMap);
        setHydrated(true);
    }, [review, aspiration]);

    function markRegistered(k: string, id: string, isDup: boolean) {
        setRegistered((r) => ({ ...r, [k]: id }));
        if (isDup) setDup((d) => ({ ...d, [k]: true }));
        try {
            localStorage.setItem(k, id);
            if (isDup) localStorage.setItem(`${k}:dup`, '1');
        } catch { /* ignore */ }
    }

    // D1 は日によって一時的に 500 を返す(無料枠の行読み上限)。
    // 1発で諦めると全自動登録が半分しか入らないので、短い間隔で 3 回まで叩く。
    const REG_TRIES = 3;

    async function register(k: string, english: string, japanese: string): Promise<string | null> {
        if (!english || registered[k] || busy[k]) return registered[k] || null;
        setBusy((b) => ({ ...b, [k]: true }));
        try {
            for (let attempt = 0; attempt < REG_TRIES; attempt++) {
                if (attempt > 0) await new Promise((r) => setTimeout(r, 700 * attempt));
                try {
                    const res = await fetch('/api/phrases', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ english, japanese: japanese || '', date: review.date }),
                    });
                    const data = await res.json();
                    if (data.success && data.phrase?.id) {
                        markRegistered(k, data.phrase.id, !!data.duplicate);
                        return data.phrase.id;
                    }
                } catch { /* 次の attempt へ */ }
            }
        } finally {
            setBusy((b) => ({ ...b, [k]: false }));
        }
        return null;
    }

    // 一括登録。同一英文はまとめて 1 回だけ POST する。
    async function registerBatch(items: { k: string; english: string; japanese: string }[]) {
        if (bulk) return;
        setBulk(true);

        const groups = new Map<string, { k: string; english: string; japanese: string }[]>();
        for (const it of items) {
            const norm = it.english.trim().toLowerCase();
            if (!groups.has(norm)) groups.set(norm, []);
            groups.get(norm)!.push(it);
        }

        // D1 が落ちている日に 50 回叩き続けても意味がない。
        // 連続で失敗したらその場でやめて、残りは次に開いたときに回す。
        const GIVE_UP_AFTER = 5;
        let miss = 0;
        for (const group of groups.values()) {
            const known = group.find((g) => registered[g.k]);
            if (known) {
                const id = registered[known.k];
                group.forEach((g) => { if (!registered[g.k]) markRegistered(g.k, id, !!dup[known.k]); });
                continue;
            }
            const first = group[0];
            const id = await register(first.k, first.english, first.japanese);
            if (id) {
                miss = 0;
                group.slice(1).forEach((g) => markRegistered(g.k, id, true));
            } else if (++miss >= GIVE_UP_AFTER) {
                break;
            }
        }
        setBulk(false);
    }

    const fixes = review.lines.filter((l) => l.fix).length;
    const everything = useMemo(() => allItems(review, engagedByIndex), [review, engagedByIndex]);
    const doneCount = everything.filter((it) => registered[it.k]).length;
    const everythingDone = everything.length > 0 && doneCount === everything.length;

    // 開いただけでは登録しない(以前は開くたびに全部を POST していて、貼った時点の登録と
    // 言い回し違いのカードが二重にできた)。D1 に既にある英文と同じカードは「登録済」にする。
    useEffect(() => {
        if (!hydrated || !inTraining?.length) return;
        setRegistered((r) => {
            const next = { ...r };
            for (const it of everything) if (!next[it.k] && isCovered(it.english, inTraining)) next[it.k] = 'd1';
            return next;
        });
    }, [hydrated, inTraining, everything]);

    const visible = useMemo(
        () => review.lines.map((l, i) => ({ l, i })).filter(({ l }) => (fixOnly ? !!l.fix : true)),
        [review.lines, fixOnly],
    );

    const RegBtn = ({ k, english, japanese, accent }: { k: string; english: string; japanese: string; accent: string }) => {
        const done = !!registered[k];
        const isDup = !!dup[k];
        const isBusy = !!busy[k];
        const label = done ? (isDup ? '既出' : '済') : isBusy ? '…' : '＋';
        return (
            <button onClick={() => register(k, english, japanese)} disabled={done || isBusy}
                title={done ? (isDup ? '既に同じカードあり' : '登録済み') : 'training に登録'}
                style={{
                    flexShrink: 0, width: done ? 'auto' : 28, height: 28, minWidth: 28,
                    fontSize: 11, fontWeight: 800, lineHeight: 1, whiteSpace: 'nowrap', padding: done ? '0 8px' : 0,
                    color: done ? '#78716c' : accent, background: done ? '#f5f5f4' : '#fff',
                    border: `1px solid ${done ? '#e7e5e4' : accent}`, borderRadius: 7,
                    cursor: done ? 'default' : isBusy ? 'wait' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                {label}
            </button>
        );
    };

    return (
        <main style={{ maxWidth: 720, margin: '0 auto', padding: '24px 16px 110px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1c1917' }}>
            <header style={{ marginBottom: 14 }}>
                <Link href="/english/training/dmm" style={{ fontSize: 12, color: '#78716c', textDecoration: 'none' }}>← DMM 一覧</Link>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: '#0e7490', margin: '10px 0 5px' }}>LESSON ・ 会話 + 検死 + 解説</div>
                <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0, lineHeight: 1.6 }}><Rich text={review.title} /></h1>
                {conversation && (
                    <div style={{ fontSize: 12, color: '#78716c', marginTop: 6, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <span>{conversation.date}</span>
                        {conversation.teacher_name && <span>講師: {conversation.teacher_name}</span>}
                        {conversation.duration_minutes && <span>{conversation.duration_minutes} 分</span>}
                    </div>
                )}
            </header>

            {/* 検死パネル(ノイズ要約) — 各行の「直し」が grammar ノイズ。ここは横断要約 */}
            {diag && (
                <details open style={{ marginBottom: 16, background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 10, padding: '10px 12px' }}>
                    <summary style={{ cursor: 'pointer', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: '#b45309' }}>検死レポート（ノイズ＝直すべき癖）</summary>
                    {diag.summary && <div style={{ fontSize: 12.5, color: '#78350f', lineHeight: 1.7, marginTop: 8 }}><Rich text={diag.summary} /></div>}
                    {!!(diag.nonnative && diag.nonnative.length) && (
                        <div style={{ marginTop: 10 }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color: '#92760a', marginBottom: 4 }}>ネイティブらしくない癖</div>
                            {diag.nonnative.map((n, j) => (
                                <div key={j} style={{ fontSize: 12, color: '#44403c', lineHeight: 1.5, marginBottom: 4 }}>
                                    <span style={{ color: '#a8a29e' }}>{n.habit} →</span> <strong>{n.drill}</strong>
                                </div>
                            ))}
                        </div>
                    )}
                    {!!(diag.divergences && diag.divergences.length) && (
                        <div style={{ marginTop: 10 }}>
                            <div style={{ fontSize: 10, fontWeight: 800, color: '#92760a', marginBottom: 4 }}>乖離（短いSVOで言い切る練習）</div>
                            {diag.divergences.map((d, j) => (
                                <div key={j} style={{ fontSize: 12, color: '#44403c', lineHeight: 1.5, marginBottom: 6 }}>
                                    <span style={{ color: '#a8a29e' }}>{d.scene}:</span> {(d.chunks || []).join(' / ')}
                                </div>
                            ))}
                        </div>
                    )}
                </details>
            )}

            {/* 言いたかったこと — 多層比較コーナー (生徒の実発話 / Gemini学術版 / 俺の話せる版 + 英語コメント) */}
            {aspiration && aspiration.items.length > 0 && (
                <details open style={{ marginBottom: 16, background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: 10, padding: '10px 12px' }}>
                    <summary style={{ cursor: 'pointer', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', color: '#6d28d9' }}>
                        言いたかったこと — 多層比較（実発話 → Gemini学術版 → 俺の話せる版）
                    </summary>
                    <div style={{ fontSize: 11.5, color: '#6d28d9', lineHeight: 1.6, margin: '8px 0 4px' }}>
                        言えなかった概念を「外部AIの理想形」と「実際に口から出せる版」で並べた。コメントは、どこを盗んでどこを置いていくか。
                    </div>
                    {aspiration.critique && (
                        <div style={{ fontSize: 12.5, color: '#4c1d95', lineHeight: 1.75, background: '#fff', border: '1px solid #ddd6fe', borderRadius: 8, padding: '10px 12px', margin: '8px 0 4px' }}>
                            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', color: '#7c3aed', marginBottom: 4 }}>全体評論</div>
                            <Rich text={aspiration.critique} />
                        </div>
                    )}
                    {aspiration.items.map((it, n) => (
                        <div key={n} style={{ borderTop: '1px solid #ede9fe', paddingTop: 10, marginTop: 10 }}>
                            <div style={{ fontSize: 12.5, fontWeight: 700, color: '#4c1d95', lineHeight: 1.55, marginBottom: 6 }}>
                                {it.concept}
                            </div>

                            {/* 生徒の実発話 (崩れたまま, 控えめ) */}
                            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                                <span style={{ flexShrink: 0, fontSize: 9, fontWeight: 800, color: '#a8a29e', border: '1px solid #e7e5e4', borderRadius: 4, padding: '2px 5px', marginTop: 2 }}>実発話</span>
                                <div style={{ flex: 1, minWidth: 0, fontSize: 13, color: '#a8a29e', lineHeight: 1.5 }}>{it.attempt}</div>
                            </div>

                            {/* Gemini 学術版 (beyond-native) */}
                            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                                <span style={{ flexShrink: 0, fontSize: 9, fontWeight: 800, color: '#7c3aed', border: '1px solid #ddd6fe', background: '#f5f3ff', borderRadius: 4, padding: '2px 5px', marginTop: 2 }}>学術</span>
                                <div style={{ flex: 1, minWidth: 0, fontSize: 13.5, color: '#5b21b6', fontWeight: 500, lineHeight: 1.5 }}>{it.beyondNative}</div>
                                <RegBtn k={key(review.id, n, 'aspbn')} english={it.beyondNative} japanese={it.concept} accent="#7c3aed" />
                            </div>

                            {/* 俺の話せる版 (mine) */}
                            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                                <span style={{ flexShrink: 0, fontSize: 9, fontWeight: 800, color: '#0e7490', border: '1px solid #a5f3fc', background: '#ecfeff', borderRadius: 4, padding: '2px 5px', marginTop: 2 }}>話せる</span>
                                <div style={{ flex: 1, minWidth: 0, fontSize: 14.5, color: '#155e75', fontWeight: 600, lineHeight: 1.5 }}>{it.mine}</div>
                                <RegBtn k={key(review.id, n, 'aspmine')} english={it.mine} japanese={it.concept} accent="#0e7490" />
                            </div>

                            {/* 比較コメント (EN) */}
                            <div style={{ fontSize: 12, color: '#78716c', fontStyle: 'italic', lineHeight: 1.55, background: '#fafaf9', borderRadius: 8, padding: '7px 9px' }}>
                                {it.comment}
                            </div>
                        </div>
                    ))}
                </details>
            )}

            {/* フィルタ */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                {([['全部', false], ['ミスだけ', true]] as const).map(([label, v]) => {
                    const on = fixOnly === v;
                    return (
                        <button key={label} onClick={() => setFixOnly(v)}
                            style={{
                                fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 999,
                                border: `1px solid ${on ? '#0e7490' : '#e7e5e4'}`,
                                background: on ? '#0e7490' : '#fff', color: on ? '#fff' : '#78716c', cursor: 'pointer',
                            }}>
                            {label}{v ? ` (${fixes})` : ''}
                        </button>
                    );
                })}
            </div>

            {visible.map(({ l: line, i }: { l: ReviewLine; i: number }) => {
                const isStudent = line.role === 'student';
                const accent = isStudent ? '#0e7490' : '#92760a';
                const engaged = engagedByIndex[i];
                // 直し(fix)と言換(alt)の統合。見出しは常に「ネイティブが実際に言う形」。
                const useAlt = !altIsRedundant(line);
                const headline = useAlt ? line.alt : line.fix;
                const showFixBelow = useAlt && !!line.fix;
                return (
                    <div key={i} style={{ borderLeft: `3px solid ${isStudent ? '#0e7490' : '#e7e5e4'}`, paddingLeft: 12, marginBottom: 14 }}>
                        {/* 元発言: 控えめ */}
                        <div style={{ display: 'flex', gap: 7, alignItems: 'baseline', marginBottom: 6 }}>
                            <span style={{ flexShrink: 0, fontSize: 9, fontWeight: 800, letterSpacing: 1, color: accent, marginTop: 2 }}>{isStudent ? '生徒' : '先生'}</span>
                            <span style={{ fontSize: 13.5, lineHeight: 1.55, color: '#a8a29e' }}>{line.original}</span>
                        </div>

                        {/* ネイティブなら: 直し(fix)と言換(alt)を1本にまとめた本命行。
                            見出しは常に「その場でネイティブが実際に言う形」。alt があれば alt、
                            無ければ fix。金具だけ直した形は消さずに下へ小さく置く(文法は別皿として残す)。 */}
                        {headline && (
                            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', background: '#ecfeff', border: '1px solid #cffafe', borderRadius: 8, padding: '8px 10px', marginBottom: 7 }}>
                                <span style={{ flexShrink: 0, fontSize: 9, fontWeight: 800, color: '#fff', background: '#0e7490', borderRadius: 4, padding: '2px 5px', marginTop: 2, letterSpacing: 0.5 }}>ネイティブなら</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 15, color: '#155e75', fontWeight: 700, lineHeight: 1.45 }}>{headline}</div>
                                    {/* この行が運んでいる新しい部品。長い文のどこが新しいのかを毎回探させない */}
                                    {line.altChunk && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginTop: 5 }}>
                                            <span style={{ fontSize: 9, fontWeight: 800, color: '#0e7490', letterSpacing: 0.5 }}>NEW</span>
                                            <span style={{
                                                fontSize: 13, fontWeight: 800, color: '#155e75',
                                                background: '#cffafe', border: '1px solid #67e8f9',
                                                borderRadius: 5, padding: '2px 8px',
                                            }}>{line.altChunk}</span>
                                        </div>
                                    )}
                                    {/* 金具だけ直した形。本命ではないので小さく、ただし登録はできる */}
                                    {showFixBelow && (
                                        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginTop: 6, paddingTop: 6, borderTop: '1px dashed #a5f3fc' }}>
                                            <span style={{ flexShrink: 0, fontSize: 9, fontWeight: 800, color: '#dc2626', marginTop: 2 }}>金具だけ</span>
                                            <span style={{ flex: 1, minWidth: 0, fontSize: 12.5, color: '#78716c', lineHeight: 1.45 }}>{line.fix}</span>
                                            <RegBtn k={key(review.id, i, 'fix')} english={line.fix as string} japanese={line.fixWhy || ''} accent="#dc2626" />
                                        </div>
                                    )}
                                </div>
                                <RegBtn k={key(review.id, i, useAlt ? 'alt' : 'fix')} english={headline} japanese={line.altChunk ? line.altChunk + ' — ' + (line.fixWhy || line.spice || '') : (line.fixWhy || line.spice || '')} accent="#0e7490" />
                            </div>
                        )}

                        {/* 解説: 文法の理由(fixWhy)と中身へのツッコミ(spice)を1本の解説として流す。
                            ここが一番価値のある欄なので、薄い脇役の見た目にしない。 */}
                        {(line.fixWhy || line.spice) && (
                            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 7 }}>
                                <span style={{ flexShrink: 0, fontSize: 9, fontWeight: 800, color: '#57534e', border: '1px solid #e7e5e4', borderRadius: 4, padding: '2px 5px', marginTop: 2 }}>解説</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    {line.fixWhy && <div style={{ fontSize: 12.5, color: '#b91c1c', lineHeight: 1.6 }}><Rich text={line.fixWhy} /></div>}
                                    {line.spice && <div style={{ fontSize: 12.5, color: '#57534e', lineHeight: 1.6, marginTop: line.fixWhy ? 5 : 0 }}><Rich text={line.spice} /></div>}
                                </div>
                            </div>
                        )}

                        {/* 盗む(pick): 先生が言った形のうち、そのまま在庫にする価値があるもの */}
                        {line.pick && (
                            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 8, padding: '8px 10px', marginBottom: 7 }}>
                                <span style={{ flexShrink: 0, fontSize: 9, fontWeight: 800, color: '#fff', background: '#92760a', borderRadius: 4, padding: '2px 5px', marginTop: 2 }}>盗む</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 14.5, color: '#78350f', fontWeight: 700, lineHeight: 1.45 }}>{line.pick}</div>
                                    {line.pickWhy && <div style={{ fontSize: 12.5, color: '#92400e', lineHeight: 1.6, marginTop: 4 }}><Rich text={line.pickWhy} /></div>}
                                </div>
                                <RegBtn k={key(review.id, i, 'pick')} english={line.pick} japanese={line.pickWhy || ''} accent="#92760a" />
                            </div>
                        )}

                        {/* 豆知識(know): 話の中身から派生した知識。英語の外側だが、次に同じ話題が来たとき喋れる */}
                        {line.know && (
                            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', background: '#f5f5f4', borderRadius: 8, padding: '8px 10px', marginBottom: 7 }}>
                                <span style={{ flexShrink: 0, fontSize: 9, fontWeight: 800, color: '#44403c', border: '1px solid #d6d3d1', background: '#fff', borderRadius: 4, padding: '2px 5px', marginTop: 2 }}>豆知識</span>
                                <div style={{ flex: 1, minWidth: 0, fontSize: 12.5, color: '#44403c', lineHeight: 1.7 }}><Rich text={line.know} /></div>
                            </div>
                        )}

                        {/* 深掘り(engaged): ネイティブが違う角度から返すバージョン */}
                        {engaged && (
                            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                <span style={{ flexShrink: 0, fontSize: 9, fontWeight: 800, color: '#7c3aed', border: '1px solid #ddd6fe', background: '#f5f3ff', borderRadius: 4, padding: '2px 5px', marginTop: 2 }}>深掘</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 13.5, color: '#5b21b6', fontWeight: 500, lineHeight: 1.5 }}>{engaged}</div>
                                </div>
                                <RegBtn k={key(review.id, i, 'eng')} english={engaged} japanese={''} accent="#7c3aed" />
                            </div>
                        )}

                    </div>
                );
            })}

            {/* 下部固定: 一括登録バー */}
            <div style={{
                position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 20,
                background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(8px)', borderTop: '1px solid #e7e5e4',
            }}>
                <div style={{ maxWidth: 720, margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <div style={{ fontSize: 12.5, color: '#57534e', fontWeight: 700, lineHeight: 1.3 }}>
                        {bulk ? '登録中' : everythingDone ? 'この回は全部トレーニングに入っている' : 'トレーニング'} {doneCount}/{everything.length}
                        <span style={{ color: '#a8a29e', fontWeight: 600 }}> ・ ミス {fixes}</span>
                    </div>
                    <button onClick={() => registerBatch(everything)} disabled={bulk || everythingDone}
                        title="この回で出た英語を全部 training に入れる。選り分けない"
                        style={{
                            marginLeft: 'auto', fontSize: 13, fontWeight: 800, color: '#fff',
                            background: bulk || everythingDone ? '#a8a29e' : '#0e7490',
                            border: 'none', borderRadius: 9, padding: '11px 18px',
                            cursor: bulk || everythingDone ? 'default' : 'pointer', whiteSpace: 'nowrap',
                        }}>
                        {bulk ? `登録中… (${doneCount}/${everything.length})` : everythingDone ? '登録済' : `残りを登録 (${everything.length - doneCount})`}
                    </button>
                </div>
            </div>
        </main>
    );
}
