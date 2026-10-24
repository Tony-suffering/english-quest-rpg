/**
 * 解説ビュー -- 市販問題集の解説編と同じ誌面を再現する。
 *
 * 誌面の規格 (市販問題集の構造分析より):
 *  - 本文は英日2段組。英語に【n】マーカーを打ち、和訳の同じ位置にも同じ番号を打つ
 *  - 各設問: 英語の設問+選択肢 | 和訳。正解の選択肢は緑
 *  - 正解バッジ (緑) + 根拠。根拠は本文の【n】を引く
 *  - 不正解には1つずつ「外し方」を付ける
 *  - セット末尾に語注ボックス
 *
 * マーカーは英日で同じ番号が同じ内容を指す。クリックで対応箇所がハイライトされる。
 */
'use client';

import { useState } from 'react';
import type { BridgeItem, Choice, Gloss, QExplain, SetExplain } from '@/data/english/toeic-types';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E2D5';

const MARK_RE = /(【\d+】)/g;

/** 【n】を丸番号のチップにして描く。クリックで同じ番号を光らせる */
function Marked({ text, active, onPick, serif }: {
    text: string; active: number | null; onPick: (n: number) => void; serif?: boolean;
}) {
    return (
        <span style={{ whiteSpace: 'pre-wrap', fontFamily: serif ? 'Georgia, serif' : 'inherit' }}>
            {text.split(MARK_RE).map((part, i) => {
                const m = part.match(/^【(\d+)】$/);
                if (!m) return <span key={i}>{part}</span>;
                const n = Number(m[1]);
                const on = active === n;
                return (
                    <button
                        key={i}
                        onClick={() => onPick(n)}
                        title={`根拠 ${n} を照合`}
                        style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: '17px', height: '17px', borderRadius: '50%', margin: '0 3px',
                            border: `1.5px solid ${on ? DEEPGREEN : GOLD}`,
                            background: on ? GREEN : '#FEF9E7',
                            color: on ? '#fff' : DEEPGOLD,
                            fontSize: '10px', fontWeight: 800, cursor: 'pointer', verticalAlign: 'middle',
                            padding: 0, lineHeight: 1, flexShrink: 0,
                        }}
                    >{n}</button>
                );
            })}
        </span>
    );
}

export function GlossBox({ gloss }: { gloss: Gloss[] }) {
    if (!gloss?.length) return null;
    return (
        <div style={{
            border: `1px solid ${GREEN}66`, background: '#F0FDF9', borderRadius: '8px',
            padding: '10px 14px', marginTop: '14px',
        }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: DEEPGREEN, letterSpacing: '1px', marginBottom: '7px' }}>
                語注
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 18px', fontSize: '12px', lineHeight: 1.7 }}>
                {gloss.map((g, i) => (
                    <span key={i} style={{ color: INK }}>
                        <b style={{ color: DEEPGREEN, fontFamily: 'Georgia, serif' }}>{g.w}</b>
                        <span style={{ color: SUB, marginLeft: '5px' }}>{g.m}</span>
                        {g.star && <span style={{ color: DEEPGOLD, marginLeft: '4px' }}>★{g.star}</span>}
                    </span>
                ))}
            </div>
        </div>
    );
}

/**
 * つながらない語。
 *
 * 語注(GlossBox)と並べない。あれは「知らない語を引く」ための一覧で、
 * こちらは「知っている語で読み違えた」ことに気づかせるための対比なので、
 * 直訳 → 実際 を横並びにして、間違いのほうを先に見せる。
 */
export function BridgeBox({ items, isMobile }: { items?: BridgeItem[]; isMobile: boolean }) {
    if (!items?.length) return null;
    return (
        <div style={{
            border: `1px solid ${GOLD}`, background: '#FFFCF2', borderRadius: '10px',
            padding: '11px 14px 12px', marginTop: '12px',
        }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: DEEPGOLD, letterSpacing: '1px', marginBottom: '9px' }}>
                つながらない語 ・ 単語は簡単なのに意味が通らないところ
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {items.map((it, i) => (
                    <div key={i} style={{ borderTop: i === 0 ? 'none' : `1px dotted ${LINE}`, paddingTop: i === 0 ? 0 : '10px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: INK, fontFamily: 'Georgia, serif', marginBottom: '4px' }}>
                            {it.en}
                        </div>
                        <div style={{
                            display: isMobile ? 'block' : 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? '4px' : '12px',
                            fontSize: '12px', lineHeight: 1.6,
                        }}>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <span style={{ flexShrink: 0, fontSize: '10px', fontWeight: 800, color: '#B45309', background: '#FEF3C7', borderRadius: '4px', padding: '1px 6px', height: 'fit-content', marginTop: '2px' }}>直訳</span>
                                <span style={{ color: SUB, textDecoration: 'line-through', textDecorationColor: '#D6A76F' }}>{it.lit}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <span style={{ flexShrink: 0, fontSize: '10px', fontWeight: 800, color: '#fff', background: GREEN, borderRadius: '4px', padding: '1px 6px', height: 'fit-content', marginTop: '2px' }}>実際</span>
                                <span style={{ color: INK, fontWeight: 600 }}>{it.real}</span>
                            </div>
                        </div>
                        <div style={{ fontSize: '11.5px', lineHeight: 1.75, color: SUB, marginTop: '5px' }}>{it.why}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/** 設問1問ぶんの解説。英日2段 + 正解バッジ + 選択肢ごとの外し方 */
export function QView({ q, choices, answer, question, active = null, onPick = () => { }, isMobile }: {
    q: QExplain; choices: Choice[]; answer: string; question?: string;
    active?: number | null; onPick?: (n: number) => void; isMobile: boolean;
}) {
    const jpOf = (label: string) => q.choices.find(c => c.label === label)?.jp || '';
    const whyOf = (label: string) => q.choices.find(c => c.label === label)?.why;

    return (
        <div style={{ borderTop: `1px dashed ${LINE}`, paddingTop: '14px', marginTop: '14px' }}>
            {/* 設問: 英 | 日 */}
            <div style={{ display: isMobile ? 'block' : 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                    {question && (
                        <div style={{ display: 'flex', gap: '7px', alignItems: 'flex-start', marginBottom: '5px' }}>
                            <span style={{
                                flexShrink: 0, minWidth: '24px', height: '20px', borderRadius: '4px',
                                background: INK, color: '#fff', fontSize: '11px', fontWeight: 800,
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            }}>{q.no}</span>
                            <span style={{ fontSize: '13.5px', fontWeight: 600, color: INK, lineHeight: 1.5 }}>{question}</span>
                        </div>
                    )}
                    {!question && (
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            minWidth: '24px', height: '20px', borderRadius: '4px', marginBottom: '5px',
                            background: INK, color: '#fff', fontSize: '11px', fontWeight: 800, padding: '0 5px',
                        }}>{q.no}</div>
                    )}
                    <div style={{ paddingLeft: question ? '31px' : 0 }}>
                        {choices.map(c => {
                            const ok = c.label === answer;
                            return (
                                <div key={c.label} style={{
                                    fontSize: '12.5px', lineHeight: 1.6, display: 'flex', gap: '6px',
                                    color: ok ? DEEPGREEN : INK, fontWeight: ok ? 700 : 400,
                                    fontFamily: 'Georgia, serif',
                                }}>
                                    <span style={{ flexShrink: 0 }}>({c.label})</span>
                                    <span>{c.text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div style={{ marginTop: isMobile ? '8px' : 0 }}>
                    {q.questionJp && (
                        <div style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.6, marginBottom: '5px' }}>{q.questionJp}</div>
                    )}
                    <div>
                        {choices.map(c => {
                            const ok = c.label === answer;
                            return (
                                <div key={c.label} style={{
                                    fontSize: '12px', lineHeight: 1.6, display: 'flex', gap: '6px',
                                    color: ok ? DEEPGREEN : SUB, fontWeight: ok ? 700 : 400,
                                }}>
                                    <span style={{ flexShrink: 0 }}>({c.label})</span>
                                    <span>{jpOf(c.label)}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 正解の根拠 */}
            <div style={{
                display: 'flex', gap: '10px', alignItems: 'flex-start', marginTop: '10px',
                background: '#F0FDF9', border: `1px solid ${GREEN}44`, borderRadius: '8px', padding: '9px 12px',
            }}>
                <span style={{
                    flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '5px',
                    background: GREEN, color: '#fff', borderRadius: '5px', padding: '3px 8px',
                    fontSize: '11px', fontWeight: 800, letterSpacing: '0.5px',
                }}>
                    正解 <b style={{ fontSize: '13px' }}>{answer}</b>
                </span>
                <span style={{ fontSize: '12.5px', lineHeight: 1.75, color: INK }}>
                    <Marked text={q.correct} active={active} onPick={onPick} />
                </span>
            </div>

            {/* 誤答の外し方 */}
            <div style={{ marginTop: '7px', paddingLeft: '4px' }}>
                {choices.filter(c => c.label !== answer).map(c => {
                    const why = whyOf(c.label);
                    if (!why) return null;
                    return (
                        <div key={c.label} style={{ display: 'flex', gap: '7px', fontSize: '12px', lineHeight: 1.7, color: SUB, marginBottom: '2px' }}>
                            <span style={{ flexShrink: 0, color: '#B45309', fontWeight: 700 }}>({c.label})</span>
                            <span><Marked text={why} active={active} onPick={onPick} /></span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/**
 * セット1つぶんの解説。
 * questionsMeta で問題本体 (設問文・選択肢・正解) を渡す。解説データは本体を持たない。
 */
export default function ToeicExplainView({ set, meta, isMobile }: {
    set: SetExplain;
    meta: { no: number; question?: string; choices: Choice[]; answer: string }[];
    isMobile: boolean;
}) {
    const [active, setActive] = useState<number | null>(null);
    const pick = (n: number) => setActive(v => (v === n ? null : n));
    const byNo = new Map(meta.map(m => [m.no, m]));

    return (
        <div>
            {/* 本文: 英 | 日 */}
            {set.bodyEn && set.bodyJp && (
                <div style={{
                    display: isMobile ? 'block' : 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px',
                    border: `1px solid ${LINE}`, borderRadius: '10px', padding: '12px 14px', background: '#FEFDFB',
                }}>
                    <div style={{ fontSize: '12.5px', lineHeight: 1.9, color: INK }}>
                        <Marked text={set.bodyEn} active={active} onPick={pick} serif />
                    </div>
                    <div style={{
                        fontSize: '12px', lineHeight: 1.9, color: SUB,
                        borderLeft: isMobile ? 'none' : `1px solid ${LINE}`,
                        borderTop: isMobile ? `1px solid ${LINE}` : 'none',
                        paddingLeft: isMobile ? 0 : '18px', paddingTop: isMobile ? '10px' : 0,
                        marginTop: isMobile ? '10px' : 0,
                    }}>
                        <Marked text={set.bodyJp} active={active} onPick={pick} />
                    </div>
                </div>
            )}

            {set.questions.map(q => {
                const m = byNo.get(q.no);
                if (!m) return null;
                return (
                    <QView key={q.no} q={q} choices={m.choices} answer={m.answer} question={m.question}
                        active={active} onPick={pick} isMobile={isMobile} />
                );
            })}

            <GlossBox gloss={set.gloss} />
        </div>
    );
}
