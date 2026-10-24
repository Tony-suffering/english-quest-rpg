'use client';

// 「今夜も、通じない。」— note用スマホ縦パネル(全部入り) + 高解像度PNG書き出し + 編集。
//
// このページ1枚で1回分が完結する。上から順にPNGを書き出して note に貼れば記事になる:
//   扉 → あらすじ(定型) → 日本語だけの笑い → コールドオープン → ボケ×N →
//   ベストプレー → 持ち帰り → 成績(相場) → 成長曲線 → 次回予告(オッズ)
// 散らばっていた drama / curriculum / league / warau / recap をここに集約している。
//
// 編集: 右上「編集」で本文が contentEditable になり、/api/tonight に保存(tonight と同方式)。
// 手動スクショは粗いので、各パネルは html2canvas で約1440px幅のPNGに書き出す。

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { SHOW_META, showEpisodes, getGeneral, getNoteTitles, type ShowEpisode, mergeEpisodes, latestNight } from '@/data/english/dmm-show';
import { getNightMarket, getMainBet, getForm, getCommentary, getNextTease } from '@/data/english/tonio-league';
import { getAct } from '@/data/english/tonio-drama';
import { getThreadsForNight } from '@/data/english/tonio-threads';
import { getGrowthCurve, getLexiconOf } from '@/data/english/tonio-curriculum';
import { recapStandard, recapStatus } from '@/data/english/tonio-recap';
import { CONCEPT } from '@/data/english/tonio-basics';
import { getWaraiFeed } from '@/data/english/tonio-warai';
import { getSagaStateAfter } from '@/data/english/tonio-saga';
import { getTonightNoteText, getTonightNoteBody, toNotePasteBlocks } from '@/data/english/tonight-notes';

type ShowMeta = typeof SHOW_META;
interface Draft { meta: ShowMeta; episodes: ShowEpisode[]; overrides: Record<string, string> }

// 紙面には dmm-show 以外(相場・オッズ・あらまし・劇の幕など)から来る文字も多い。
// それらは元データを書き換えず、key -> テキストの上書きマップで編集する。
// key の付け方: 夜ごとに変わる文字は `n<夜>.` を前置し、全話共通の見出しは前置しない。
export type OverrideFn = (
    key: string, fallback: string,
    style?: React.CSSProperties, as?: keyof React.JSX.IntrinsicElements,
) => React.ReactNode;

const PAPER = '#F7F4EE';
const CARD = '#FFFFFF';
const INK = '#17130F';
const MUTED = '#6E6558';
const RED = '#C0392B';
const GOLD = '#B8941E';
const GOLD_HI = '#E7C14B';
const GREEN = '#2E9E6B';
const LINE = '#E5DECF';
const CREAM = '#FBF6E7';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";
const SANS = "'Helvetica Neue', Arial, 'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";

// 柱(全ページ右上)。番組名の繰り返しは単なる重複なので避ける。
// 「通じない」は事実として嘘(64夜ちゃんと会話は成立している)。
// かといって状況説明も弱い。一番のコンセプトは英会話の楽しさなので、
// 事実ではなく中毒を書く。差し替えはここ1箇所。
const RUNNING_HEAD = 'だから英会話はやめられない';

// ===================== path ユーティリティ (tonight と同型) =====================
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

// ===================== 編集可能テキスト =====================
function Editable({
    value, editing, onCommit, as = 'span', style,
}: {
    value: string; editing: boolean; onCommit: (v: string) => void;
    as?: keyof React.JSX.IntrinsicElements; style?: React.CSSProperties;
}) {
    const ref = useRef<HTMLElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (editing && el && document.activeElement !== el && el.innerText !== value) {
            el.innerText = value ?? '';
        }
    });
    if (!editing) return React.createElement(as, { style }, value);
    return React.createElement(as, {
        ref, contentEditable: true, suppressContentEditableWarning: true,
        onBlur: (e: React.FocusEvent<HTMLElement>) => onCommit(e.currentTarget.innerText),
        style: {
            ...style, outline: '1px dashed rgba(192,57,43,0.5)', outlineOffset: '2px',
            borderRadius: '2px', cursor: 'text', minHeight: '1em', minWidth: '18px',
        } as React.CSSProperties,
    });
}

// 1画面パネル。min-height を画面高にして、1枚=1セクションにする。
// note に10枚並んだとき1つの作品に見えるよう、柱(ランニングヘッド)を全ページ共通で入れる。
// ノンブル(ページ番号)と奥付は不要につき撤去。note では PNG を並べる順がそのまま順番になる。
function Panel({ bg = CARD, dark = false, dense = false, label, head, children }: {
    bg?: string; dark?: boolean; dense?: boolean;
    // 柱の文字も編集対象にするため ReactNode を受ける
    label?: React.ReactNode; head?: React.ReactNode;
    children: React.ReactNode;
}) {
    const faint = dark ? 'rgba(255,255,255,0.38)' : 'rgba(110,101,88,0.65)';
    const hair = dark ? 'rgba(255,255,255,0.14)' : 'rgba(229,222,207,0.9)';
    return (
        <section style={{
            scrollSnapAlign: 'start',
            minHeight: '100svh',
            boxSizing: 'border-box',
            display: 'flex', flexDirection: 'column',
            padding: dense ? '22px 24px 18px' : '30px 30px 18px',
            backgroundColor: bg,
            color: dark ? '#fff' : INK,
            borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : LINE}`,
            position: 'relative',
        }}>
            {/* 柱(上)。label が無い面でも柱は出す(ボケ面は赤バッジが見出しを兼ねる)。 */}
            {(label || head) && (
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    fontSize: '10px', letterSpacing: '2.5px', color: faint, fontWeight: 700,
                    borderBottom: `1px solid ${hair}`, paddingBottom: '8px', marginBottom: 'auto', flexShrink: 0,
                }}>
                    <span>{label}</span>
                    <span style={{ fontFamily: SERIF, letterSpacing: '1px' }}>{head ?? RUNNING_HEAD}</span>
                </div>
            )}

            {/* 本文(天地中央) */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2px', padding: '20px 0' }}>
                {children}
            </div>
        </section>
    );
}

function Rec({ clip }: { clip?: string }) {
    if (!clip) return null;
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            fontSize: '13px', fontWeight: 800, letterSpacing: '1px', color: '#fff',
            backgroundColor: '#B91C1C', padding: '4px 12px', borderRadius: '999px', whiteSpace: 'nowrap',
        }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '999px', backgroundColor: '#fff' }} />
            REC {clip}
        </span>
    );
}

function Kick({ children, color = RED }: { children: React.ReactNode; color?: string }) {
    return (
        <div style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '3px', color, textTransform: 'uppercase' }}>
            {children}
        </div>
    );
}

// ============ 成長曲線(パネル内・小さめ) ============
function MiniGrowth({ upToNight }: { upToNight: number }) {
    const curve = useMemo(() => getGrowthCurve(), []);
    const W = 320, H = 110, padB = 16;
    const n = curve.length;
    if (!n) return null;
    const max = curve[n - 1].total || 1;
    const x = (i: number) => (i * W) / Math.max(1, n - 1);
    const y = (v: number) => (1 - v / max) * (H - padB);
    const path = curve.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(p.total)}`).join(' ');
    const area = `${path} L${W},${H - padB} L0,${H - padB} Z`;
    const curIdx = Math.max(0, curve.findIndex((p) => p.night === upToNight));
    return (
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
            <defs>
                <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GREEN} stopOpacity="0.34" />
                    <stop offset="100%" stopColor={GREEN} stopOpacity="0.03" />
                </linearGradient>
            </defs>
            <path d={area} fill="url(#mg)" />
            <path d={path} fill="none" stroke={GREEN} strokeWidth={2.6} strokeLinejoin="round" />
            {curIdx >= 0 && <circle cx={x(curIdx)} cy={y(curve[curIdx].total)} r={4.5} fill={GREEN} />}
        </svg>
    );
}

// ===================== 全パネル =====================
// 文字は全て E(draft内のフィールド) か O(上書きマップ) 経由で描く。
// どちらも編集状態を内包しているので、ここで editing/meta を直接持つ必要はない。
function ScreensView({ ep, E, O }: {
    ep: ShowEpisode;
    E: (path: Path, style?: React.CSSProperties, as?: keyof React.JSX.IntrinsicElements) => React.ReactNode;
    O: OverrideFn;
}) {
    const idx = showEpisodes.findIndex((e) => e.night === ep.night);
    // 夜ごとに中身が変わる文字の key 前置。共通見出しは前置しない(全話で一括編集になる)。
    const K = (k: string) => `n${ep.night}.${k}`;
    // 柱・ノンブルは全ページ共通。同じ key なので1箇所直せば全ページ変わる。
    const chrome = { head: O('brand.head', RUNNING_HEAD) };
    const c = getCommentary(ep.night);
    const mkt = useMemo(() => (c ? getNightMarket(ep.night) : null), [ep.night, c]);
    // 賭けは1点のみ。今夜の答え合わせ用と、次回に張る用の2本だけ持つ。
    const bet = useMemo(() => (c ? getMainBet(ep.night) : null), [ep.night, c]);
    const nextBet = useMemo(() => (c ? getMainBet(ep.night + 1) : null), [ep.night, c]);
    const form = useMemo(() => (c ? getForm(ep.night) : null), [ep.night, c]);
    const tease = useMemo(() => (c ? getNextTease(ep.night) : null), [ep.night, c]);
    const gen = getGeneral(ep);
    const act = getAct(ep.night);
    const threads = getThreadsForNight(ep.night);
    const gained = getLexiconOf(ep.night);
    const growth = useMemo(() => getGrowthCurve(), []);
    const totalNow = growth.find((g) => g.night === ep.night)?.total ?? growth[growth.length - 1]?.total ?? 0;

    // 英語ゼロの層(本体)。この夜のぶんだけ取り出す。
    const warai = useMemo(() => getWaraiFeed().find((w) => w.night === ep.night) ?? null, [ep.night]);
    // 積み上げ(Lv / 図鑑)
    const saga = useMemo(() => getSagaStateAfter(ep.night), [ep.night]);
    // 前夜が存在するか(オッズを「前回の予想の答え合わせ」と呼べるのはこの時だけ)
    const hasPrev = useMemo(() => showEpisodes.some((e) => e.night === ep.night - 1), [ep.night]);
    // 第1夜 = 連載の入口(固定記事)。ここだけ自己紹介と誘いを足す。
    const isOpener = !hasPrev;

    return (
        <>
            {/* 1. 表紙 */}
            <Panel bg={INK} dark>
                <div>
                    {/* 誌名 */}
                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.18)', paddingBottom: '14px' }}>
                        <div style={{ fontFamily: SERIF, fontSize: '30px', fontWeight: 900, letterSpacing: '1px', lineHeight: 1.25 }}>
                            {O('cover.brand1', '今夜も、')}<span style={{ color: RED }}>{O('cover.brand2', '通じない。')}</span>
                        </div>
                        <div style={{ fontSize: '10px', letterSpacing: '3.5px', color: 'rgba(255,255,255,0.45)', marginTop: '7px' }}>
                            {E(['meta', 'subtitle'])}
                        </div>
                    </div>

                    {/* 号数 */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '30px' }}>
                        <span style={{ fontFamily: SERIF, fontSize: '76px', fontWeight: 900, color: GOLD, lineHeight: 0.9 }}>{O(K('cover.no'), String(ep.night))}</span>
                        <div style={{ paddingBottom: '6px' }}>
                            <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', fontWeight: 700, letterSpacing: '2px' }}>{O('cover.unit', '夜')}</div>
                            <div style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', marginTop: '3px' }}>{E(['episodes', idx, 'date'])}</div>
                        </div>
                    </div>

                    {/* 主題 */}
                    <div style={{ fontFamily: SERIF, fontSize: '40px', fontWeight: 900, lineHeight: 1.32, margin: '26px 0 0', letterSpacing: '0.5px' }}>
                        {E(['episodes', idx, 'title'], { display: 'block' }, 'div')}
                    </div>

                    <div style={{ width: '46px', height: '3px', backgroundColor: RED, margin: '24px 0' }} />

                    <div style={{ fontFamily: SERIF, fontSize: '17.5px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.85 }}>
                        {E(['episodes', idx, 'catchcopy'], { display: 'block' }, 'div')}
                    </div>
                </div>
            </Panel>

            {/* 2. 今夜のあらまし。
                 punch(ツッコミの最長1本)は後段のボケ面と一字一句同じになるので出さない。
                 代わりに、その夜だけの日本語リード文である arasuji を置く。
                 見出し1本だと画面がほぼ空になる上、「今夜が何の夜か」が読者に伝わらない。 */}
            {warai && (
                <Panel {...chrome} bg={PAPER} label={O('warai.label', '今夜のあらまし')}>
                    <div style={{ fontFamily: SERIF, fontSize: '30px', fontWeight: 900, color: INK, lineHeight: 1.45 }}>
                        {O(K('warai.headline'), warai.headline)}
                    </div>
                    <div style={{ width: '46px', height: '3px', backgroundColor: RED, margin: '22px 0' }} />
                    <div style={{ fontSize: '16.5px', lineHeight: 2.05, color: INK }}>
                        {E(['episodes', idx, 'arasuji'], { display: 'block' }, 'div')}
                    </div>
                </Panel>
            )}

            <Panel {...chrome} bg={CARD} label={O('recap.label', 'この連載について')}>
                <div style={{ fontSize: '16.5px', lineHeight: 2.05, color: INK, whiteSpace: 'pre-wrap' }}>
                    {O(K('recap.standard'), recapStandard(ep.night))}
                </div>
                <div style={{ fontSize: '13.5px', color: MUTED, marginTop: '20px', lineHeight: 1.9, borderTop: `1px solid ${LINE}`, paddingTop: '16px' }}>
                    {O(K('recap.status'), recapStatus(ep.night))}
                </div>
                {/* 商品のコンセプト。毎回ここで言い切る。 */}
                <div style={{ backgroundColor: CREAM, border: '1px solid #E8D9A8', borderLeft: `4px solid ${GOLD}`, borderRadius: '8px', padding: '15px 17px', marginTop: '20px' }}>
                    <div style={{ fontFamily: SERIF, fontSize: '16px', fontWeight: 700, color: INK, lineHeight: 1.85 }}>
                        {O('recap.concept', CONCEPT)}
                    </div>
                </div>
            </Panel>

            {/* 第1夜だけの2枚。ここは固定記事(入口)になるので、番組の説明だけで終わらせず
                「誰が」「なぜ」やっているかと、読者への誘いまでを1話に入れておく。
                2夜目以降は本編のテンポを殺すので出さない。 */}
            {isOpener && (
                <Panel {...chrome} bg={CARD} label={O('hello.label', 'はじめまして')}>
                    <div style={{ fontFamily: SERIF, fontSize: '27px', fontWeight: 900, color: INK, lineHeight: 1.5 }}>
                        {O('hello.headline', 'TOEIC900点。でも英会話、めちゃくちゃです(笑)')}
                    </div>
                    <div style={{ fontSize: '16px', lineHeight: 2.05, color: INK, marginTop: '20px' }}>
                        {O('hello.body1', '英語、もう何回挫折したか分からん。アプリ入れて消して、参考書買って積んで、毎年「今年こそ」って言ってる側の人間です。')}
                    </div>
                    <div style={{ fontSize: '16px', lineHeight: 2.05, color: INK, marginTop: '16px' }}>
                        {O('hello.body2', '理由はもう分かってて、一人だから。一人だとサボっても誰も困らんし、間違えても恥ずかしくない。続ける理由がどこにもない。')}
                    </div>
                    <div style={{ backgroundColor: CREAM, border: '1px solid #E8D9A8', borderLeft: `4px solid ${GOLD}`, borderRadius: '8px', padding: '15px 17px', marginTop: '22px' }}>
                        <div style={{ fontFamily: SERIF, fontSize: '16px', fontWeight: 700, color: INK, lineHeight: 1.85 }}>
                            {O('hello.pull', 'できない自分を、ごまかさない。言い訳もしない。全部ギャグにして、でも攻略は本気。')}
                        </div>
                    </div>
                </Panel>
            )}

            {/* 3. 今夜の位置(劇のどこか)。
                 act.situation はその幕(最長17夜)を丸ごと要約した文なので、幕の途中の夜に出すと
                 まだ起きていない事件まで書いてある。第2夜の紙面に money cow(第4夜)や
                 TOLERANCY(第6夜)が並ぶのはネタバレで、しかも同じ文が13夜ぶん同じ顔で出る。
                 1夜の紙面に要るのは「幕のどこにいるか」だけなので、位置と賭けに絞る。
                 幕そのものの要約は /english/tonight/drama の仕事。 */}
            {act && (
                <Panel {...chrome} bg={PAPER} label={O(K('act.label'), `第${act.no}幕 ${act.title}`)}>
                    <Kick color={GOLD}>{O('act.kick', '今夜の位置')}</Kick>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '18px' }}>
                        <span style={{ fontFamily: SERIF, fontSize: '52px', fontWeight: 900, color: INK, lineHeight: 1 }}>
                            {O(K('act.nth'), String(ep.night - act.nights[0] + 1))}
                        </span>
                        <span style={{ fontSize: '15px', color: MUTED, lineHeight: 1.7 }}>
                            {O(K('act.span'), `夜目 ／ 第${act.no}幕は全${act.nights[1] - act.nights[0] + 1}夜`)}
                        </span>
                    </div>
                    <div style={{ fontSize: '14px', color: RED, fontWeight: 700, marginTop: '18px', lineHeight: 1.8 }}>
                        {O(K('act.stake'), `賭かっているもの — ${act.stake}`)}
                    </div>
                    {threads.length > 0 && (
                        <div style={{ marginTop: '20px', borderTop: `1px solid ${LINE}`, paddingTop: '14px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '2px', color: MUTED, marginBottom: '9px' }}>{O('act.threadsLabel', 'この夜が乗っている糸')}</div>
                            {threads.map((t, i) => (
                                <div key={i} style={{ fontSize: '14px', color: INK, marginBottom: '7px', lineHeight: 1.7 }}>
                                    <span style={{ color: t.thread.color, fontWeight: 800 }}>{O(K(`act.thread${i}.title`), t.thread.title)}</span>
                                    <span style={{ color: MUTED }}> — {O(K(`act.thread${i}.beat`), t.beat.label)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </Panel>
            )}

            {/* 4. コールドオープン */}
            <Panel {...chrome} bg={CARD} label={O('cold.label', 'COLD OPEN')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    <Kick>{O('cold.kick', '今夜の第一声')}</Kick>
                    <Rec clip={ep.coldOpen.clip} />
                </div>
                <div style={{ fontFamily: SERIF, fontSize: '30px', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.5, color: INK }}>
                    “{E(['episodes', idx, 'coldOpen', 'en'])}”
                </div>
                <div style={{ fontSize: '16px', color: MUTED, marginTop: '14px' }}>{E(['episodes', idx, 'coldOpen', 'ja'])}</div>
                <div style={{ fontSize: '16px', color: INK, marginTop: '22px', lineHeight: 1.95, borderTop: `1px solid ${LINE}`, paddingTop: '18px' }}>
                    {E(['episodes', idx, 'coldOpen', 'note'])}
                </div>
            </Panel>

            {/* 5. ボケ 各本 */}
            {ep.gags.map((g, i) => (
                <Panel {...chrome} key={i} bg={CARD} dense>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '4px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 900, letterSpacing: '1px', color: '#fff', backgroundColor: RED, padding: '5px 14px', whiteSpace: 'nowrap' }}>
                            {O(K(`gag${i}.badge`), `ボケ ${i + 1}／${ep.gags.length}`)}
                        </span>
                        <Rec clip={g.clip} />
                    </div>
                    <div style={{ fontSize: '13.5px', color: MUTED, marginBottom: '10px' }}>{E(['episodes', idx, 'gags', i, 'scene'])}</div>

                    {/* 英文は事故の物証。読めなくても、下の日本語だけで笑いが完結するようにする。 */}
                    <div style={{ fontFamily: SERIF, fontSize: '21px', fontWeight: 700, fontStyle: 'italic', color: RED, lineHeight: 1.4 }}>
                        “{E(['episodes', idx, 'gags', i, 'boke'])}”
                    </div>
                    <div style={{ fontSize: '16px', color: INK, marginTop: '7px', lineHeight: 1.7, fontWeight: 600 }}>
                        {E(['episodes', idx, 'gags', i, 'bokeJa'])}
                    </div>

                    <div style={{ marginTop: '13px', backgroundColor: INK, color: '#fff', padding: '13px 16px', fontSize: '15px', lineHeight: 1.75, borderRadius: '2px' }}>
                        <div style={{ color: GOLD, fontWeight: 900, letterSpacing: '2px', fontSize: '12px', marginBottom: '6px' }}>{O('gag.tsukkomiLabel', 'ツッコミ')}</div>
                        {E(['episodes', idx, 'gags', i, 'tsukkomi'])}
                    </div>

                    <div style={{ marginTop: '10px', backgroundColor: '#F0F7F1', border: '1px solid #CDE3D2', borderLeft: '5px solid #10B981', padding: '13px 16px', borderRadius: '2px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '2px', color: '#166534' }}>{O('gag.correctLabel', 'で、正解は')}</span>
                        <div style={{ fontFamily: SERIF, fontSize: '17px', fontWeight: 700, color: INK, marginTop: '7px', lineHeight: 1.45 }}>{E(['episodes', idx, 'gags', i, 'correct'])}</div>
                        <div style={{ fontSize: '15px', color: INK, marginTop: '5px', lineHeight: 1.7, fontWeight: 600 }}>{E(['episodes', idx, 'gags', i, 'correctJa'])}</div>
                        <div style={{ fontSize: '13.5px', color: '#166534', marginTop: '8px', lineHeight: 1.75 }}>{E(['episodes', idx, 'gags', i, 'point'])}</div>
                    </div>
                </Panel>
            ))}

            {/* 6. ベストプレー */}
            <Panel {...chrome} bg={CREAM} label={O('best.label', '今夜のベストプレー')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    <Kick color={GOLD}>{O('best.kick', 'たまには決める')}</Kick>
                    <Rec clip={ep.bestPlay.clip} />
                </div>
                <div style={{ fontFamily: SERIF, fontSize: '30px', fontWeight: 700, color: INK, lineHeight: 1.5 }}>
                    “{E(['episodes', idx, 'bestPlay', 'en'])}”
                </div>
                <div style={{ fontSize: '16px', color: MUTED, marginTop: '12px' }}>{E(['episodes', idx, 'bestPlay', 'ja'])}</div>
                <div style={{ fontSize: '16px', color: INK, marginTop: '20px', lineHeight: 1.95, borderTop: '1px solid #E8D9A8', paddingTop: '18px' }}>{E(['episodes', idx, 'bestPlay', 'note'])}</div>
            </Panel>

            {/* 6.5 今夜の型 — 読者が自分の話として持ち帰れる唯一の面。
                ボケは本人の固有事情なので、ここが無いと「面白かった」で終わって何も残らない。 */}
            {gen && (
                <Panel {...chrome} bg="#F1F5F9" label={O('gen.label', '今夜の型')}>
                    <Kick color="#0F766E">{O('gen.kick', 'ここだけ持って帰れば元は取れる')}</Kick>
                    <div style={{ fontFamily: SERIF, fontSize: '34px', fontWeight: 900, color: INK, lineHeight: 1.35, marginTop: '18px' }}>
                        {gen.pattern}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '2px', color: RED, marginTop: '6px' }}>{gen.label}</div>
                    <div style={{ fontSize: '16px', lineHeight: 1.95, color: INK, marginTop: '18px', backgroundColor: CARD, border: `1px solid ${LINE}`, padding: '16px 18px' }}>
                        {gen.rule}
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '2px', color: MUTED, margin: '22px 0 10px' }}>
                        {O('gen.uses', 'あなたの場合はこう使う')}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {gen.uses.map((u, i) => (
                            <div key={i} style={{ backgroundColor: CARD, border: `1px solid ${LINE}`, padding: '13px 16px' }}>
                                <div style={{ fontSize: '12.5px', color: '#0F766E', fontWeight: 700 }}>{u.scene}</div>
                                <div style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 700, color: INK, marginTop: '6px', lineHeight: 1.5 }}>{u.en}</div>
                                <div style={{ fontSize: '13.5px', color: MUTED, marginTop: '4px' }}>{u.ja}</div>
                            </div>
                        ))}
                    </div>
                    {gen.trap && (
                        <div style={{ marginTop: '18px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderLeft: `4px solid ${RED}`, padding: '14px 18px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '2px', color: RED }}>{O('gen.trap', 'やりがちな外し方')}</div>
                            <div style={{ fontSize: '14px', color: INK, marginTop: '7px', lineHeight: 1.9 }}>{gen.trap}</div>
                        </div>
                    )}
                </Panel>
            )}

            {/* 7. 持ち帰り英語 */}
            <Panel {...chrome} bg={PAPER} label={O('take.label', '持ち帰り英語')}>
                <Kick>{O(K('take.kick'), `今夜の${ep.takeaways.length}つだけ`)}</Kick>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '20px' }}>
                    {ep.takeaways.map((t, i) => (
                        <div key={i} style={{ border: `1px solid ${LINE}`, borderTop: `3px solid ${INK}`, padding: '16px 18px', backgroundColor: CARD }}>
                            <div style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 700, color: INK, lineHeight: 1.5 }}>{E(['episodes', idx, 'takeaways', i, 'en'])}</div>
                            <div style={{ fontSize: '14px', color: MUTED, marginTop: '6px' }}>{E(['episodes', idx, 'takeaways', i, 'ja'])}</div>
                            <div style={{ fontSize: '14px', color: INK, marginTop: '10px', lineHeight: 1.8 }}>{E(['episodes', idx, 'takeaways', i, 'note'])}</div>
                        </div>
                    ))}
                </div>
            </Panel>

            {/* 8. 今夜の成績(相場) */}
            {mkt && c && (
                <Panel {...chrome} bg={INK} dark label={O('mkt.label', '今夜の成績')}>
                    {/* 初夜は比較対象が無い。前夜比も自己最高も「自分自身」を指してしまい、
                        いちばん大事な1話目が壊れた数字で埋まるので、初値として出す。 */}
                    <Kick color={GOLD_HI}>{O(K('mkt.kick'), hasPrev ? `醜態相場 — 第${ep.night}夜 終値` : '醜態相場 — 初値')}</Kick>
                    <div style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.6)', marginTop: '10px', lineHeight: 1.7 }}>
                        {O(K('mkt.opponent'), `今夜の相手 — ${c.opponent}`)}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '14px' }}>
                        <span style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '68px', color: GOLD_HI, lineHeight: 1 }}>
                            {O(K('mkt.index'), mkt.index.toLocaleString())}
                        </span>
                        {hasPrev && (
                            <span style={{ fontSize: '17px', color: mkt.delta >= 0 ? '#7BE0AF' : '#F0A199', fontWeight: 900 }}>
                                {O(K('mkt.delta'), `${mkt.delta >= 0 ? '▲+' : '▼'}${mkt.delta.toLocaleString()}`)}
                            </span>
                        )}
                    </div>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>
                        {O(K('mkt.sub'), hasPrev
                            ? `前夜比 ${mkt.delta >= 0 ? '+' : ''}${mkt.pct}% ／ `
                                + (mkt.allTimeHigh > mkt.index
                                    ? `自己最高 ${mkt.allTimeHigh.toLocaleString()}`
                                    : '自己最高を更新')
                            : 'ここが基準点。以後、この数字とだけ比べる。')}
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginTop: '20px', backgroundColor: 'rgba(255,255,255,0.08)', border: `1px solid ${GOLD_HI}`, borderRadius: '8px', padding: '8px 16px', alignSelf: 'flex-start' }}>
                        <span style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '34px', color: GOLD_HI, lineHeight: 1 }}>{O(K('mkt.rating'), c.rating)}</span>
                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)' }}>{O(K('mkt.ratingWord'), c.ratingWord)}</span>
                    </div>

                    {/* 採点コメント。数字だけの面は「で、何があったの」に答えていない。
                        全ボケを見た後に読む講評なので、ここが唯一の置き場所になる
                        (前に置くとボケ面のオチを先に言ってしまう)。 */}
                    <div style={{
                        fontSize: '15px', lineHeight: 2, color: 'rgba(255,255,255,0.9)', marginTop: '22px',
                        borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: '18px',
                    }}>
                        {O(K('mkt.announcer'), c.announcer)}
                    </div>
                    {/* 積み上げ(Lv / 図鑑)。まだ0のものは並べない —
                        「0体」「0」が並ぶと、積み上がっていないことだけが目立つ。 */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '22px' }}>
                        {([
                            ['レベル', `Lv.${saga.level}`, true],
                            ['捏造語 図鑑', `${saga.monsters.length}体`, saga.monsters.length > 0],
                            ['習得スキル', `${saga.skills.length}`, saga.skills.length > 0],
                        ] as [string, string, boolean][]).filter(([, , show]) => show).map(([k, v], i) => (
                            <div key={k} style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(231,193,75,0.3)', borderRadius: '9px', padding: '9px 14px' }}>
                                <div style={{ fontSize: '10px', letterSpacing: '1px', color: 'rgba(255,255,255,0.5)' }}>{O(`saga${i}.k`, k)}</div>
                                <div style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 900, color: GOLD_HI }}>{O(K(`saga${i}.v`), v)}</div>
                            </div>
                        ))}
                    </div>

                    {form && form.recent.length > 1 && (
                        <div style={{ marginTop: '22px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>{O('form.label', '直近フォーム')}</div>
                            <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
                                {form.recent.map((r) => (
                                    <span key={r.night} style={{
                                        width: '34px', height: '34px', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontFamily: SERIF, fontWeight: 900, fontSize: '16px',
                                        color: r.night === ep.night ? INK : GOLD_HI,
                                        backgroundColor: r.night === ep.night ? GOLD_HI : 'rgba(255,255,255,0.08)',
                                        border: `1.5px solid ${GOLD_HI}`,
                                    }}>{O(K(`form.${r.night}`), r.rating)}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </Panel>
            )}

            {/* 答え合わせ。前夜に本命を出していない初夜には存在しない面なので出さない。
                賭けは1点だけ。4本並べた瞬間これは一覧表になり、賭けの熱が消える。
                倍率と的中/はずれをとにかく大きく出す(1点なので大きく出せる)。 */}
            {hasPrev && bet && (
                <Panel {...chrome} bg={PAPER} label={O('odds.label', '答え合わせ')}>
                    <Kick>{O('odds.kick', '前回の本命 — 今夜の結果')}</Kick>

                    <div style={{ border: `3px solid ${INK}`, backgroundColor: CARD, marginTop: '18px' }}>
                        <div style={{ padding: '20px 20px 18px' }}>
                            <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '4px', color: MUTED }}>
                                {O('odds.tanshou', '単勝 1点')}
                            </div>
                            <div style={{ fontFamily: SERIF, fontSize: '84px', fontWeight: 900, color: INK, lineHeight: 0.9, letterSpacing: '-2px', marginTop: '6px' }}>
                                {O(K('bet.odds'), `×${bet.odds.toFixed(1)}`)}
                            </div>
                            <div style={{ fontFamily: SERIF, fontSize: '29px', fontWeight: 900, color: INK, marginTop: '12px', lineHeight: 1.35 }}>
                                {O(K('bet.label'), bet.label)}
                            </div>
                        </div>
                        <div style={{ backgroundColor: bet.hit ? GREEN : RED, padding: '16px 20px', textAlign: 'center' }}>
                            <span style={{ fontFamily: SERIF, fontSize: '44px', fontWeight: 900, color: '#fff', letterSpacing: '14px', paddingLeft: '14px' }}>
                                {O(K('bet.hit'), bet.hit ? '的中' : 'はずれ')}
                            </span>
                        </div>
                    </div>

                    <div style={{ fontSize: '17px', color: INK, marginTop: '22px', lineHeight: 1.95, fontWeight: 600 }}>
                        {O(K('bet.result'), bet.result)}
                    </div>
                </Panel>
            )}

            {/* 9. 読者の成長曲線 */}
            <Panel {...chrome} bg={CARD} label={O('growth.label', '読者の積み上げ')}>
                <Kick color={GREEN}>{O('growth.kick', 'あなたの積み上げ')}</Kick>
                <div style={{ fontFamily: SERIF, fontSize: '26px', fontWeight: 900, color: INK, marginTop: '16px', lineHeight: 1.5 }}>
                    {O('growth.line1', '彼は上手くならない。')}<br />{O('growth.line2', 'あなたは、上手くなる。')}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '20px' }}>
                    <span style={{ fontFamily: SERIF, fontSize: '52px', fontWeight: 900, color: GREEN, lineHeight: 1 }}>{O(K('growth.total'), String(totalNow))}</span>
                    <span style={{ fontSize: '15px', color: MUTED }}>{O(K('growth.unit'), `表現(第${ep.night}夜まで)`)}</span>
                </div>
                {gained.length > 0 && gained.length !== totalNow && (
                    <div style={{ fontSize: '14px', color: INK, marginTop: '8px' }}>
                        {O(K('growth.gainLabel'), '今夜の追加 ')}<b style={{ color: GREEN }}>{O(K('growth.gain'), `+${gained.length}`)}</b>
                    </div>
                )}
                <div style={{ marginTop: '22px' }}>
                    <MiniGrowth upToNight={ep.night} />
                </div>
                <div style={{ fontSize: '13.5px', color: MUTED, marginTop: '14px', lineHeight: 1.9 }}>
                    {O('growth.note', 'この線は一度も下がっていない。主人公が負け続けるほど、読者が強くなる。')}
                </div>
            </Panel>

            {/* 第1夜だけ。固定記事の締めとして、読者を誘うところまで入れる。 */}
            {isOpener && (
                <Panel {...chrome} bg={CREAM} label={O('invite.label', '一緒にやりませんか')}>
                    <Kick color={GREEN}>{O('invite.kick', '一人だと、また挫折するので')}</Kick>
                    <div style={{ fontFamily: SERIF, fontSize: '27px', fontWeight: 900, color: INK, marginTop: '16px', lineHeight: 1.5 }}>
                        {O('invite.headline', '一緒に勉強してくれる仲間がほしい')}
                    </div>
                    <div style={{ fontSize: '15.5px', lineHeight: 2, color: INK, marginTop: '18px' }}>
                        {O('invite.body', '集まって、下手な英語で喋って、間違えて、笑って、ついでに最近しんどいことも喋って終わり。テストも宿題もノルマもなし。英語の悩みも、ただの愚痴も、日本語でOK。')}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginTop: '20px' }}>
                        {([
                            ['ひとつ', '声で喋る'],
                            ['ふたつ', 'コメントだけ'],
                            ['みっつ', '聞くだけ'],
                        ] as [string, string][]).map(([n, t], i) => (
                            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: CARD, border: `1px solid ${LINE}`, borderRadius: '8px', padding: '11px 14px' }}>
                                <span style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '14px', color: GREEN, minWidth: '46px' }}>{O(`invite.way${i}.n`, n)}</span>
                                <span style={{ fontSize: '15px', fontWeight: 700, color: INK }}>{O(`invite.way${i}.t`, t)}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: '14px', lineHeight: 1.95, color: MUTED, marginTop: '18px' }}>
                        {O('invite.note', 'レベルはチョー初心者でOK。むしろ歓迎。俺も生徒側で、教える立場じゃないです。一緒に「これ何て言うんだ」で詰まりたいだけ。')}
                    </div>
                </Panel>
            )}

            {/* 10. 次回予告(オッズ) */}
            <Panel {...chrome} bg={INK} dark label={O('next.label', '次回予告')}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: SERIF, fontSize: '20px', fontStyle: 'italic', lineHeight: 2.05, marginTop: '24px' }}>
                        {E(['episodes', idx, 'jikai'], { display: 'block' }, 'div')}
                    </div>

                    {/* 次回の本命も1点。答え合わせの面と同じ札・同じ倍率が出る(同じ規則で選ぶ)ので、
                        向こうは結果、こちらは「何に賭けるのか」を書いて役割を分ける。 */}
                    {nextBet && (
                        <div style={{ marginTop: '30px', textAlign: 'left' }}>
                            <div style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px', textAlign: 'center' }}>
                                {O(K('next.betLabel'), `第${tease?.night ?? ep.night + 1}夜 本命`)}
                            </div>
                            <div style={{ border: `3px solid ${GOLD_HI}`, backgroundColor: 'rgba(231,193,75,0.07)', padding: '22px 20px' }}>
                                <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '4px', color: 'rgba(255,255,255,0.5)' }}>
                                    {O('next.tanshou', '単勝 1点')}
                                </div>
                                <div style={{ fontFamily: SERIF, fontSize: '88px', fontWeight: 900, color: GOLD_HI, lineHeight: 0.9, letterSpacing: '-2px', marginTop: '6px' }}>
                                    {O(K('next.bet.odds'), `×${nextBet.odds.toFixed(1)}`)}
                                </div>
                                <div style={{ fontFamily: SERIF, fontSize: '28px', fontWeight: 900, color: '#fff', marginTop: '12px', lineHeight: 1.35 }}>
                                    {O(K('next.bet.label'), nextBet.label)}
                                </div>
                                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', marginTop: '12px', lineHeight: 1.85 }}>
                                    {O(K('next.bet.note'), nextBet.note)}
                                </div>
                            </div>
                            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '14px', lineHeight: 1.8, textAlign: 'center' }}>
                                {O('next.betDesc', 'ここに張っておけ。次回の記事が、そのまま答え合わせになる。')}
                            </div>
                        </div>
                    )}

                    <div style={{ fontFamily: SERIF, fontSize: '26px', fontWeight: 900, color: RED, marginTop: '30px', letterSpacing: '6px' }}>{O('next.tsuzuku', 'つづく')}</div>
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginTop: '26px', lineHeight: 1.9 }}>
                        {O('next.cta1', 'スキを押すと、男は明日も恥をかきに行きます。')}<br />{O('next.cta2', 'フォローすると、毎晩それが届きます。')}
                    </div>
                </div>
            </Panel>
        </>
    );
}

/**
 * note に貼る本文テキストを組み立てる。
 *
 * PNG だけを並べると、記事の中でテキストとして存在するのはタイトル1行だけになる。
 * 画像の中の文字は検索に拾われないので、本文から引ける語がゼロになり、
 * 検索からの流入が立たない。note 側の推しも「文章が自己完結してる」を見ている。
 *
 * 画像をやめる必要はない。同じ中身をテキストでも置いて、画像は目を止める役に回す。
 * 素材は既に全部あるので、ここで組み直して貼れる形にするだけでいい。
 */
function buildNoteText(ep: ShowEpisode): string {
    // 手書き本文(tonight-notes.ts)がある夜はそれを使う。自動生成はカードと中身が
    // 100%重なるうえ英語も上級のままなので、書けた夜から手書きに置き換えていく。
    const hand = getTonightNoteText(ep.night);
    if (hand) return hand;

    const gen = getGeneral(ep);
    const L: string[] = [];
    const img = (label: string) => L.push('', `<!-- ここに画像: ${label} -->`, '');

    L.push(`${getNoteTitles(ep)[0]}`, '');
    L.push(`第${ep.night}夜「${ep.title}」`, '');
    L.push(ep.catchcopy, '');
    L.push(ep.arasuji, '');
    img('表紙');

    L.push('## 今夜の最初の一言', '');
    L.push(`> ${ep.coldOpen.en}`, '');
    L.push(ep.coldOpen.ja, '');
    if (ep.coldOpen.note) L.push(ep.coldOpen.note, '');
    img('コールドオープン');

    L.push('## 今夜のボケ', '');
    ep.gags.forEach((g, i) => {
        L.push(`### ${i + 1}. ${g.scene}`, '');
        L.push(`実際に言った英語:`, '', `> ${g.boke}`, '');
        L.push(`直訳すると「${g.bokeJa}」`, '');
        if (g.tsukkomi) L.push(g.tsukkomi, '');
        L.push(`**通じる言い方: ${g.correct}**`, '');
        L.push(g.correctJa, '');
        if (g.point) L.push(g.point, '');
        img(`ボケ${i + 1}`);
    });

    if (ep.bestPlay?.en) {
        L.push('## 今夜のベストプレー', '');
        L.push(`> ${ep.bestPlay.en}`, '');
        L.push(ep.bestPlay.ja, '');
        if (ep.bestPlay.note) L.push(ep.bestPlay.note, '');
        img('ベストプレー');
    }

    if (gen) {
        L.push(`## 今夜の型 — ${gen.label}`, '');
        L.push(`**${gen.pattern}**`, '');
        L.push(gen.rule, '');
        L.push('あなたの場合はこう使う。', '');
        gen.uses.forEach((u) => L.push(`- ${u.scene}: **${u.en}** — ${u.ja}`));
        L.push('');
        if (gen.trap) L.push(`やりがちな外し方: ${gen.trap}`, '');
        img('今夜の型');
    }

    if (ep.takeaways?.length) {
        L.push('## 持ち帰り英語', '');
        ep.takeaways.forEach((t) => {
            L.push(`**${t.en}** — ${t.ja}`, '');
            if (t.note) L.push(t.note, '');
        });
        img('持ち帰り英語');
    }

    if (ep.jikai) {
        L.push('## 次回予告', '');
        L.push(ep.jikai, '');
    }

    return L.join('\n');
}

// 1パネルを高解像度PNGで書き出す(手動スクショの粗さ対策)。
async function sectionToPng(section: HTMLElement, filename: string) {
    const html2canvas = (await import('html2canvas')).default;
    const prevMin = section.style.minHeight;
    const prevBorder = section.style.borderBottom;
    section.style.minHeight = '0';
    section.style.borderBottom = 'none';
    try {
        const scale = Math.max(2, Math.min(4, 1440 / (section.offsetWidth || 440)));
        const canvas = await html2canvas(section, { scale, backgroundColor: null, logging: false, useCORS: true });
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = filename;
        a.click();
    } finally {
        section.style.minHeight = prevMin;
        section.style.borderBottom = prevBorder;
    }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function readNightFromUrl(): number | null {
    if (typeof window === 'undefined') return null;
    const q = Number(new URLSearchParams(window.location.search).get('night'));
    return Number.isFinite(q) && q > 0 ? q : null;
}

export default function TonightScreensPage() {
    const [draft, setDraft] = useState<Draft>(() => ({ meta: SHOW_META, episodes: showEpisodes, overrides: {} }));
    const [night, setNight] = useState<number>(() => {
        const urlN = readNightFromUrl();
        if (urlN && showEpisodes.some((e) => e.night === urlN)) return urlN;
        return latestNight();
    });
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [saving, setSaving] = useState('');
    const [editing, setEditing] = useState(false);
    const [pass, setPass] = useState('');
    const [status, setStatus] = useState('');
    /**
     * note に貼る本文は最初から開いておく。ボタンの中に隠すと、この画面を開いた人には
     * PNGしか見えない。「テキストがどこにあるか分からない」の原因はここだった。
     */
    const [noteOpen, setNoteOpen] = useState(true);
    /** 貼り付けモード: 本文を画像の位置で割って、1ブロックずつコピーする */
    const [pasteMode, setPasteMode] = useState(false);
    const [pasted, setPasted] = useState<Record<number, boolean>>({});

    const episodes = draft.episodes;
    const ep = episodes.find((e) => e.night === night) ?? episodes[episodes.length - 1];
    // 夜を変えれば ep が変わり、本文も自動で入れ替わる(state に溜めると前の夜が残る)
    const noteText = useMemo(() => buildNoteText(ep), [ep]);
    const pasteBlocks = useMemo(
        () => toNotePasteBlocks(noteText, getTonightNoteBody(ep.night)?.hashtags),
        [noteText, ep.night],
    );

    // 編集セル
    const E = (path: Path, style?: React.CSSProperties, as: keyof React.JSX.IntrinsicElements = 'span') => (
        <Editable
            value={String(getAt(draft, path) ?? '')}
            editing={editing}
            onCommit={(v) => setDraft((d) => setAt(d, path, v) as Draft)}
            as={as}
            style={style}
        />
    );

    // 上書きセル。保存済みの上書きがあればそれを、無ければ元データの文字を出す。
    const O: OverrideFn = (key, fallback, style, as = 'span') => (
        <Editable
            value={draft.overrides?.[key] ?? fallback}
            editing={editing}
            onCommit={(v) => setDraft((d) => ({ ...d, overrides: { ...d.overrides, [key]: v } }))}
            as={as}
            style={style}
        />
    );

    useEffect(() => {
        let alive = true;
        fetch('/api/tonight', { cache: 'no-store' })
            .then((r) => r.json())
            .then((json) => {
                if (!alive || !json?.episodes?.length) return;
                const eps = mergeEpisodes(json.episodes as ShowEpisode[]);
                setDraft({ meta: json.meta ?? SHOW_META, episodes: eps, overrides: json.overrides ?? {} });
                const urlN = readNightFromUrl();
                const target = urlN && eps.some((e) => e.night === urlN) ? urlN : eps[eps.length - 1].night;
                setNight(target);
            })
            .catch(() => { /* seed で成立 */ });
        return () => { alive = false; };
    }, []);

    useEffect(() => {
        const sc = scrollerRef.current;
        const first = sc?.querySelector('section');
        if (sc && first) sc.scrollTo({ top: (first as HTMLElement).offsetTop, behavior: 'instant' });
    }, [night]);

    const changeNight = (n: number) => {
        setNight(n);
        setPasted({});
        if (typeof window !== 'undefined') {
            const u = new URL(window.location.href);
            u.searchParams.set('night', String(n));
            window.history.replaceState(null, '', u);
        }
    };

    const save = async () => {
        setStatus('保存中…');
        try {
            const res = await fetch('/api/tonight', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ meta: draft.meta, episodes: draft.episodes, overrides: draft.overrides, pass }),
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
            if (json?.episodes) setDraft({ meta: json.meta ?? SHOW_META, episodes: mergeEpisodes(json.episodes as ShowEpisode[]), overrides: json.overrides ?? {} });
            setStatus('');
        } catch { setStatus(''); }
    };

    const saveAll = async () => {
        const sc = scrollerRef.current;
        if (!sc || saving) return;
        const secs = Array.from(sc.querySelectorAll('section')) as HTMLElement[];
        for (let i = 0; i < secs.length; i++) {
            setSaving(`保存中… ${i + 1}/${secs.length}`);
            await sectionToPng(secs[i], `tonight-n${night}-${String(i + 1).padStart(2, '0')}.png`);
            await sleep(450);
        }
        setSaving(`全${secs.length}枚 保存完了`);
        setTimeout(() => setSaving(''), 2200);
    };

    const saveCurrent = async () => {
        const sc = scrollerRef.current;
        if (!sc || saving) return;
        const secs = Array.from(sc.querySelectorAll('section')) as HTMLElement[];
        const mid = sc.scrollTop + sc.clientHeight / 2;
        let best = secs[0], bestD = Infinity, bestIdx = 0;
        secs.forEach((s, i) => {
            const cy = s.offsetTop + s.offsetHeight / 2;
            const d = Math.abs(cy - mid);
            if (d < bestD) { bestD = d; best = s; bestIdx = i; }
        });
        setSaving('保存中…');
        await sectionToPng(best, `tonight-n${night}-${String(bestIdx + 1).padStart(2, '0')}.png`);
        setSaving('保存完了');
        setTimeout(() => setSaving(''), 1500);
    };

    // 本文は必ず画面に出す。コピーボタンの中に隠れていると、貼る前に中身を確認できず
    // 「何を貼るのか分からない」状態になる。コピーは、見えているものに対して押す。
    const isHandWritten = getTonightNoteText(night) !== null;

    // 1ブロックコピー。押した順にどこまで貼ったかが分かるよう、済みを残す。
    // クリップボードは画面が非フォーカスだと拒否される。そのときはブロックを範囲選択して
    // Ctrl+C で取れる状態にする。押したのに何も起きない、を作らない。
    const copyBlock = async (i: number, text: string) => {
        const done = () => {
            setPasted((p) => ({ ...p, [i]: true }));
            setStatus(`${text.length} 字をコピー`);
            setTimeout(() => setStatus(''), 1800);
        };
        try {
            await navigator.clipboard.writeText(text);
            done();
            return;
        } catch { /* 次の手段へ */ }
        const el = document.querySelector(`[data-paste-block="${i}"]`);
        if (el) {
            const range = document.createRange();
            range.selectNodeContents(el);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
            setStatus('選択した。Ctrl+C で取れる');
            return;
        }
        setStatus('コピーできなかった');
    };

    // クリップボードは権限や非HTTPSで落ちることがある。落ちても本文は画面に出ているので、
    // 手で選択すれば済む。コピーできませんでした、で終わらせない。
    const copyNoteText = async () => {
        setNoteOpen(true);
        try {
            await navigator.clipboard.writeText(noteText);
            setStatus(`本文 ${noteText.length} 字をコピー`);
            setTimeout(() => setStatus(''), 2500);
        } catch {
            setStatus('コピーできないので手で選択して');
        }
    };

    return (
        <div style={{ backgroundColor: '#211D18', height: '100svh', fontFamily: SANS, display: 'flex', justifyContent: 'center' }}>
            <div style={{
                width: '100%', maxWidth: '440px', height: '100svh',
                display: 'flex', flexDirection: 'column',
                boxShadow: '0 0 40px rgba(0,0,0,0.4)',
                backgroundColor: CARD,
            }}>
                {/* 操作バー。スクロール領域の「外」に置くこと。中に入れると
                    scroll-snap-type: y mandatory がスナップ点でない操作バーを
                    第1パネルへ吸い上げてしまい、ボタンが押せなくなる。
                    PNG は section 単位で撮るのでここは映らない。 */}
                <div style={{ flexShrink: 0, backgroundColor: '#17130F', color: '#fff', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                        <Link href="/english/tonight" style={{ color: GOLD, textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>← 番組へ</Link>
                        <select value={night} onChange={(e) => changeNight(Number(e.target.value))}
                            style={{ fontSize: '13px', padding: '7px 10px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#2a2622', color: '#fff', maxWidth: '58vw' }}>
                            {episodes.map((e) => <option key={e.night} value={e.night}>第{e.night}夜 {e.title}</option>)}
                        </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
                        <button onClick={saveAll} disabled={!!saving}
                            style={{ cursor: saving ? 'default' : 'pointer', backgroundColor: GOLD, color: INK, border: 'none', borderRadius: '8px', padding: '7px 14px', fontSize: '12px', fontWeight: 800, opacity: saving ? 0.6 : 1 }}>
                            全ページPNG保存
                        </button>
                        <button onClick={() => setNoteOpen((v) => !v)}
                            title="画像だけだと本文のテキストが0字になり、検索から拾われない"
                            style={{ cursor: 'pointer', backgroundColor: noteOpen ? '#0d7f5f' : '#10B981', color: '#fff', border: 'none', borderRadius: '8px', padding: '7px 14px', fontSize: '12px', fontWeight: 800 }}>
                            {noteOpen ? '本文を隠してPNGを見る' : 'note本文を出す'}
                        </button>
                        <button onClick={() => { if (editing) { void reload(); } setEditing((v) => !v); }}
                            style={{ cursor: 'pointer', backgroundColor: editing ? '#555' : 'transparent', color: '#fff', border: '1px solid #555', borderRadius: '8px', padding: '7px 12px', fontSize: '12px', fontWeight: 700 }}>
                            {editing ? '編集を終える' : '編集'}
                        </button>
                        {editing && (
                            <>
                                <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="パスワード(任意)"
                                    style={{ fontSize: '12px', padding: '6px 9px', borderRadius: '6px', border: '1px solid #444', backgroundColor: '#2a2622', color: '#fff', width: '110px' }} />
                                <button onClick={save}
                                    style={{ cursor: 'pointer', backgroundColor: '#10B981', color: '#fff', border: 'none', borderRadius: '8px', padding: '7px 14px', fontSize: '12px', fontWeight: 700 }}>保存</button>
                            </>
                        )}
                        {status && <span style={{ fontSize: '11.5px', color: GOLD }}>{status}</span>}
                    </div>
                </div>

                {/* note に貼る本文。読める大きさで出す。PNGはこの下のパネルから保存する */}
                {noteOpen && (
                    <div style={{ flexShrink: 0, backgroundColor: '#17130F', padding: '10px 10px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px', flexWrap: 'wrap' }}>
                            <span style={{
                                fontSize: '10.5px', fontWeight: 800, letterSpacing: '0.5px',
                                color: isHandWritten ? INK : '#fff',
                                backgroundColor: isHandWritten ? GOLD : '#8a3b32',
                                borderRadius: '999px', padding: '3px 9px',
                            }}>
                                {isHandWritten ? '手書き / 中学英語' : '自動生成 / 上級 (要手書き)'}
                            </span>
                            <span style={{ fontSize: '11px', color: '#C9C0AC' }}>{noteText.length} 字</span>
                            <button onClick={() => setPasteMode((v) => !v)}
                                title="本文を画像の位置で割って、1ブロックずつ貼る"
                                style={{ marginLeft: 'auto', cursor: 'pointer', backgroundColor: pasteMode ? GOLD : 'transparent', color: pasteMode ? INK : '#EDE7DA', border: `1px solid ${pasteMode ? GOLD : '#555'}`, borderRadius: '7px', padding: '6px 12px', fontSize: '11.5px', fontWeight: 800 }}>
                                {pasteMode ? '全文に戻す' : '1ブロックずつ貼る'}
                            </button>
                            <button onClick={copyNoteText}
                                style={{ cursor: 'pointer', backgroundColor: '#10B981', color: '#fff', border: 'none', borderRadius: '7px', padding: '6px 13px', fontSize: '11.5px', fontWeight: 800 }}>
                                全文コピー
                            </button>
                        </div>

                        {pasteMode ? (
                            <div style={{ height: '46svh', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '9px', paddingRight: '2px' }}>
                                {pasteBlocks.map((b, i) => (
                                    <div key={i} style={{
                                        backgroundColor: '#221E19', border: `1px solid ${pasted[i] ? '#2E7D5B' : '#3a352e'}`,
                                        borderRadius: '8px', padding: '9px 10px', opacity: pasted[i] ? 0.55 : 1,
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                            <span style={{ fontSize: '10.5px', fontWeight: 800, color: b.isTitle ? GOLD : '#9A9184', letterSpacing: '0.5px' }}>
                                                {b.label}
                                            </span>
                                            <button onClick={() => copyBlock(i, b.text)}
                                                style={{
                                                    marginLeft: 'auto', cursor: 'pointer',
                                                    backgroundColor: pasted[i] ? 'transparent' : '#10B981',
                                                    color: pasted[i] ? '#7FBF9F' : '#fff',
                                                    border: pasted[i] ? '1px solid #2E7D5B' : 'none',
                                                    borderRadius: '6px', padding: '5px 12px', fontSize: '11px', fontWeight: 800,
                                                }}>
                                                {pasted[i] ? 'コピー済' : 'コピー'}
                                            </button>
                                        </div>
                                        <div data-paste-block={i}
                                            style={{ fontSize: '11.5px', lineHeight: 1.75, color: '#EDE7DA', whiteSpace: 'pre-wrap', maxHeight: '124px', overflowY: 'auto' }}>
                                            {b.text}
                                        </div>
                                        {b.imageAfter && (
                                            <div style={{ marginTop: '7px', paddingTop: '7px', borderTop: '1px dashed #4a443b', fontSize: '11px', fontWeight: 800, color: GOLD }}>
                                                ↑ 貼ったら、このあとに「{b.imageAfter}」のPNGを入れる
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <textarea readOnly value={noteText} onFocus={(e) => e.currentTarget.select()}
                                style={{ width: '100%', height: '46svh', fontSize: '12.5px', lineHeight: 1.85, padding: '11px 12px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#221E19', color: '#EDE7DA', resize: 'vertical' }} />
                        )}

                        <div style={{ fontSize: '10.5px', color: '#8E8577', marginTop: '6px', lineHeight: 1.7 }}>
                            {pasteMode
                                ? 'markdownの記号(## と **)は落としてある。見出しと太字はnote側のボタンで付ける。'
                                : `noteに貼ったあと、${'<!-- ここに画像: X -->'} の行を、下のパネルで保存したPNGに差し替える。`}
                        </div>
                    </div>
                )}

                {/* パネル本体だけをスナップ対象にする。position:relative は
                    saveCurrent の offsetTop 計算をこの要素基準に固定するため。 */}
                <div ref={scrollerRef} style={{
                    flex: 1, minHeight: 0, position: 'relative',
                    overflowY: 'auto', scrollSnapType: 'y mandatory',
                }}>
                    <ScreensView key={night} ep={ep} E={E} O={O} />
                </div>
            </div>

            {/* この画面だけ保存(撮影対象外) */}
            <button onClick={saveCurrent} disabled={!!saving}
                style={{
                    position: 'fixed', right: '18px', bottom: '20px', zIndex: 10,
                    cursor: saving ? 'default' : 'pointer', backgroundColor: '#17130F', color: '#fff',
                    border: `1.5px solid ${GOLD}`, borderRadius: '999px', padding: '12px 18px',
                    fontSize: '13px', fontWeight: 800, boxShadow: '0 6px 20px rgba(0,0,0,0.4)', opacity: saving ? 0.6 : 1,
                }}>
                この画面をPNG保存
            </button>

            {saving && (
                <div style={{
                    position: 'fixed', left: '50%', bottom: '20px', transform: 'translateX(-50%)', zIndex: 11,
                    backgroundColor: GOLD, color: INK, borderRadius: '999px', padding: '8px 18px',
                    fontSize: '12.5px', fontWeight: 800, boxShadow: '0 6px 20px rgba(0,0,0,0.4)', whiteSpace: 'nowrap',
                }}>
                    {saving}
                </div>
            )}
        </div>
    );
}
