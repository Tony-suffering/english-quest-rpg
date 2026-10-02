// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/components/english/WriteLesson.tsx
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
'use client';

/**
 * 読解レッスン(全30日) -- /english/write に統合する「タップ辞書つき本文 + 語彙演習 + 文法重要事項」。
 * WRITE_LESSONS[day] と getEssayForDay(day) からデータを引く。day のレッスンが無ければ何も描画しない。
 */

import { useState, useCallback } from 'react';
import { getEssayForDay } from '@/data/english/write-eiken1';
import { WRITE_LESSONS, type Gloss } from '@/data/english/write-lessons-data';
import { WRITE_SENTENCE_NOTES } from '@/data/english/write-sentence-notes';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';
const CREAM = '#FFFDF8';

function speak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US'; u.rate = 0.9;
    window.speechSynthesis.speak(u);
}

interface Active { key: string; word: string; x: number; y: number; }

export default function WriteLesson({ day, isMobile = false }: { day: number; isMobile?: boolean }) {
    const [active, setActive] = useState<Active | null>(null);
    const [openSentences, setOpenSentences] = useState<Set<number>>(new Set());
    const essay = getEssayForDay(day);
    const lesson = WRITE_LESSONS[day];
    const sentences = WRITE_SENTENCE_NOTES[day] ?? [];
    if (!essay || !lesson) return null;

    const toggleSentence = (i: number) => {
        setOpenSentences(prev => {
            const next = new Set(prev);
            if (next.has(i)) next.delete(i); else next.add(i);
            return next;
        });
    };

    const { glossary, vocab, grammar } = lesson;
    const paras = essay.essay.split(/\n\n+/).map(p => p.trim()).filter(Boolean);

    const onWord = useCallback((e: React.MouseEvent, key: string, word: string) => {
        e.stopPropagation();
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setActive({ key, word, x: r.left + r.width / 2, y: r.top });
    }, []);

    const gloss: Gloss | null = active ? glossary[active.key] : null;

    const speaker = (text: string, size = 22) => (
        <button onClick={(e) => { e.stopPropagation(); speak(text); }}
            style={{ flexShrink: 0, width: `${size}px`, height: `${size}px`, borderRadius: '50%', border: 'none', cursor: 'pointer', background: '#F5F3EC', color: SUB, fontSize: `${size * 0.4}px`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="読み上げ">▶</button>
    );

    const SectionHead = ({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) => (
        <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: DEEPGOLD, letterSpacing: '2.5px', textTransform: 'uppercase' }}>{eyebrow}</div>
            <div style={{ fontSize: isMobile ? '19px' : '22px', fontWeight: 900, color: INK, marginTop: '4px' }}>{title}</div>
            {sub && <div style={{ fontSize: '12px', color: FAINT, marginTop: '4px', lineHeight: 1.6 }}>{sub}</div>}
        </div>
    );

    const renderParagraph = (text: string, pi: number) => {
        const tokens = text.split(/(\s+)/);
        return (
            <p key={pi} style={{ margin: pi === 0 ? 0 : '16px 0 0' }}>
                {tokens.map((tok, ti) => {
                    if (/^\s+$/.test(tok)) return tok;
                    const m = tok.match(/[A-Za-z][A-Za-z-]*/);
                    const key = m ? m[0].toLowerCase() : null;
                    if (key && glossary[key]) {
                        const on = active?.key === key;
                        const hasGrammar = !!glossary[key].grammar;
                        return (
                            <span key={ti} onClick={(e) => onWord(e, key, m![0])}
                                style={{
                                    cursor: 'pointer',
                                    borderBottom: hasGrammar ? `2px solid ${GREEN}77` : `1.5px dotted ${GOLD}`,
                                    background: on ? (hasGrammar ? '#DCFCE7' : '#FEF3C7') : 'transparent',
                                    borderRadius: '3px', transition: 'background 0.12s',
                                }}>{tok}</span>
                        );
                    }
                    return <span key={ti}>{tok}</span>;
                })}
            </p>
        );
    };

    return (
        <div onClick={() => setActive(null)}>
            {/* TAP READING */}
            <SectionHead eyebrow="Lesson" title="読解 ー タップ辞書" sub="下線の単語をタップ → 意味と文法解説。金の点線=語の意味 / 緑=なぜこの形か(文法ポイント)あり。" />
            <div style={{ background: CREAM, border: `1px solid ${GOLD}33`, borderRadius: '16px', padding: isMobile ? '20px 18px' : '28px 32px' }}>
                <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: isMobile ? '16px' : '17px', lineHeight: 2.0, color: INK, letterSpacing: '0.2px' }}>
                    {paras.map((p, i) => renderParagraph(p, i))}
                </div>
                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: `1px dashed ${LINE}` }}>
                    <button onClick={(e) => { e.stopPropagation(); speak(essay.essay.replace(/\n+/g, ' ')); }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: `1px solid ${LINE}`, background: '#fff', borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', fontSize: '12px', fontWeight: 700, color: '#57534E' }}>
                        ▶ 全文を読み上げる
                    </button>
                </div>
            </div>

            {/* SENTENCE BY SENTENCE */}
            {sentences.length > 0 && (
                <div style={{ marginTop: '24px' }}>
                    <SectionHead eyebrow="Lesson" title="一文ずつ完全解説"
                        sub={`全${sentences.length}文。各文をタップ → 和訳・文の骨格・完全文法解説・英作ポイント。`} />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpenSentences(prev => prev.size === sentences.length
                                    ? new Set()
                                    : new Set(sentences.map((_, i) => i)));
                            }}
                            style={{ border: `1px solid ${LINE}`, background: '#fff', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '11px', fontWeight: 700, color: '#57534E' }}>
                            {openSentences.size === sentences.length ? 'すべて閉じる' : 'すべて開く'}
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {sentences.map((s, i) => {
                            const open = openSentences.has(i);
                            return (
                                <div key={i} style={{ background: '#fff', border: `1px solid ${open ? `${GOLD}66` : LINE}`, borderRadius: '14px', overflow: 'hidden', transition: 'border-color 0.15s' }}>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); toggleSentence(i); }}
                                        style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', width: '100%', textAlign: 'left', border: 'none', background: open ? CREAM : 'transparent', cursor: 'pointer', padding: isMobile ? '12px 14px' : '13px 16px' }}>
                                        <span style={{ flexShrink: 0, minWidth: '24px', height: '24px', borderRadius: '7px', background: open ? GOLD : '#F5F3EC', color: open ? '#fff' : SUB, fontSize: '11px', fontWeight: 900, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                                        <span style={{ flex: 1, fontFamily: 'Georgia, "Times New Roman", serif', fontSize: isMobile ? '14px' : '15px', lineHeight: 1.7, color: INK }}>{s.en}</span>
                                        <span style={{ flexShrink: 0, fontSize: '11px', color: FAINT, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', marginTop: '4px' }}>▼</span>
                                    </button>
                                    {open && (
                                        <div style={{ padding: isMobile ? '0 14px 14px' : '0 16px 16px', borderTop: `1px dashed ${LINE}` }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                                                {speaker(s.en, 24)}
                                                <span style={{ fontSize: '13px', color: '#3F3A33', lineHeight: 1.7 }}>{s.ja}</span>
                                            </div>
                                            <div style={{ marginTop: '12px', background: '#FAF8F2', borderRadius: '10px', padding: '10px 12px' }}>
                                                <div style={{ fontSize: '9px', fontWeight: 800, color: DEEPGOLD, letterSpacing: '1.5px', marginBottom: '4px' }}>文の骨格</div>
                                                <div style={{ fontSize: '12.5px', color: '#3F3A33', lineHeight: 1.75 }}>{s.structure}</div>
                                            </div>
                                            <div style={{ marginTop: '10px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '10px 12px' }}>
                                                <div style={{ fontSize: '9px', fontWeight: 800, color: '#15803D', letterSpacing: '1.5px', marginBottom: '4px' }}>文法解説</div>
                                                <div style={{ fontSize: '12.5px', color: '#3F3A33', lineHeight: 1.85 }}>{s.grammar}</div>
                                            </div>
                                            <div style={{ marginTop: '10px', background: '#FFFBEB', border: `1px solid ${GOLD}44`, borderRadius: '10px', padding: '10px 12px' }}>
                                                <div style={{ fontSize: '9px', fontWeight: 800, color: DEEPGOLD, letterSpacing: '1.5px', marginBottom: '4px' }}>英作ポイント</div>
                                                <div style={{ fontSize: '12.5px', color: '#3F3A33', lineHeight: 1.85 }}>{s.writing}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* VOCABULARY */}
            <div style={{ marginTop: '24px' }}>
                <SectionHead eyebrow="Exercise" title="Vocabulary" sub="重要語の発音・英英定義・例文。各 ▶ で音声。" />
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', overflow: 'hidden' }}>
                    {vocab.map((v, i) => (
                        <div key={v.word + i} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                            <div style={{ width: isMobile ? 'auto' : '170px', flexShrink: 0, padding: '14px 16px', borderRight: isMobile ? 'none' : `1px dashed ${LINE}`, borderBottom: isMobile ? `1px dashed ${LINE}` : 'none' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '16px', fontWeight: 800, color: '#2563EB' }}>{v.word}</span>
                                    {speaker(v.word, 20)}
                                </div>
                                <span style={{ display: 'inline-block', marginTop: '6px', fontSize: '10px', fontWeight: 800, color: SUB, background: '#F5F3EC', padding: '2px 8px', borderRadius: '5px' }}>{v.pos}</span>
                            </div>
                            <div style={{ flex: 1, padding: '14px 16px' }}>
                                <div style={{ fontSize: '13px' }}>
                                    <span style={{ color: GOLD, fontWeight: 800, fontFamily: 'Georgia, serif' }}>{v.ipa}</span>
                                    <span style={{ color: '#57534E' }}> {v.def}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '10px', background: '#FAF8F2', borderRadius: '10px', padding: '10px 12px' }}>
                                    <span style={{ flex: 1, fontSize: '13.5px', color: INK, fontFamily: 'Georgia, serif', lineHeight: 1.6 }}>{v.example}</span>
                                    {speaker(v.example, 20)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* GRAMMAR */}
            <div style={{ marginTop: '24px' }}>
                <SectionHead eyebrow="Exercise" title="Grammar 重要事項" sub="この回で押さえる構文の型。" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {grammar.map(g => (
                        <div key={g.no} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: isMobile ? '14px' : '16px 18px' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '10px' }}>
                                <span style={{ flexShrink: 0, width: '22px', height: '22px', borderRadius: '7px', background: GREEN, color: '#fff', fontSize: '12px', fontWeight: 900, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{g.no}</span>
                                <span style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: 800, color: INK }}>{g.title}</span>
                            </div>
                            <div style={{ background: '#FAF8F2', borderRadius: '10px', padding: '11px 13px', fontFamily: 'Georgia, serif', fontSize: '13.5px', lineHeight: 1.7, color: INK }}>
                                {renderHighlight(g.example, g.highlight)}
                            </div>
                            <div style={{ fontSize: '13px', color: '#57534E', lineHeight: 1.85, marginTop: '11px' }}>{g.explain}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* TOOLTIP */}
            {active && gloss && (() => {
                const vw = typeof window !== 'undefined' ? window.innerWidth : 360;
                const below = active.y < 250;
                const accent = gloss.grammar ? GREEN : GOLD;
                return (
                    <div onClick={(e) => e.stopPropagation()} style={{
                        position: 'fixed', left: Math.min(Math.max(active.x, 150), vw - 150),
                        top: below ? active.y + 26 : active.y - 12,
                        transform: below ? 'translate(-50%, 0)' : 'translate(-50%, -100%)',
                        zIndex: 60, width: '288px', maxWidth: 'calc(100vw - 24px)',
                        background: '#fff', borderRadius: '14px', border: `1px solid ${accent}44`,
                        boxShadow: '0 12px 34px rgba(28,25,23,0.22)', padding: '14px 16px', borderTop: `3px solid ${accent}`,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '16px', fontWeight: 800, color: INK, fontFamily: 'Georgia, serif' }}>{active.word}</span>
                            <span style={{ fontSize: '10px', fontWeight: 800, color: SUB, background: '#F5F3EC', padding: '2px 7px', borderRadius: '5px' }}>{gloss.pos}</span>
                            {gloss.tag && <span style={{ fontSize: '10px', fontWeight: 800, color: '#15803D', background: '#DCFCE7', padding: '2px 7px', borderRadius: '5px' }}>{gloss.tag}</span>}
                            {speaker(active.word, 22)}
                        </div>
                        <div style={{ fontSize: '13.5px', color: '#3F3A33', lineHeight: 1.6 }}>{gloss.ja}</div>
                        {gloss.grammar && (
                            <div style={{ marginTop: '10px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '9px 11px' }}>
                                <div style={{ fontSize: '9px', fontWeight: 800, color: '#15803D', letterSpacing: '1.5px', marginBottom: '4px' }}>なぜこの形?</div>
                                <div style={{ fontSize: '12px', color: '#3F3A33', lineHeight: 1.7 }}>{gloss.grammar}</div>
                            </div>
                        )}
                        <div style={{
                            position: 'absolute', left: '50%', width: '12px', height: '12px', background: '#fff',
                            transform: 'translateX(-50%) rotate(45deg)',
                            ...(below
                                ? { top: '-7px', borderLeft: `1px solid ${accent}44`, borderTop: `1px solid ${accent}44` }
                                : { bottom: '-7px', borderRight: `1px solid ${accent}44`, borderBottom: `1px solid ${accent}44` }),
                        }} />
                    </div>
                );
            })()}
        </div>
    );
}

function renderHighlight(example: string, highlight: string) {
    const idx = example.indexOf(highlight);
    if (idx === -1) return example;
    return (
        <>
            {example.slice(0, idx)}
            <span style={{ background: '#FEF3C7', color: '#9A7B16', fontWeight: 700, padding: '1px 4px', borderRadius: '4px' }}>{highlight}</span>
            {example.slice(idx + highlight.length)}
        </>
    );
}
