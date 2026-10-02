// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/app/english/write/lesson/page.tsx
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
'use client';

/**
 * Day 1 インタラクティブ・レッスン(試作) -- オンライン英会話風。
 * 模範解答を「全文タップ辞書 + 語彙演習 + 文法重要事項」に。
 */

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { getEssayForDay } from '@/data/english/write-eiken1';
import { DAY1_GLOSSARY, DAY1_VOCAB, DAY1_GRAMMAR } from '@/data/english/write-lesson-day1';
import { EikenOutputNav, EikenOutputDisclaimer } from '@/components/english/EikenOutputChrome';

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

export default function WriteLessonDay1Page() {
    const [isMobile, setIsMobile] = useState(false);
    const [active, setActive] = useState<Active | null>(null);
    const closeRef = useRef<() => void>(() => {});

    const essay = getEssayForDay(1);

    useEffect(() => {
        const c = () => setIsMobile(window.innerWidth < 768);
        c(); window.addEventListener('resize', c);
        const close = () => setActive(null);
        closeRef.current = close;
        window.addEventListener('scroll', close, true);
        return () => { window.removeEventListener('resize', c); window.removeEventListener('scroll', close, true); };
    }, []);

    const paras = useMemo(
        () => (essay ? essay.essay.split(/\n\n+/).map(p => p.trim()).filter(Boolean) : []),
        [essay]
    );

    const onWord = useCallback((e: React.MouseEvent, key: string, word: string) => {
        e.stopPropagation();
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setActive({ key, word, x: r.left + r.width / 2, y: r.top });
    }, []);

    if (!essay) return null;

    const gloss = active ? DAY1_GLOSSARY[active.key] : null;

    // 本文をトークン化してグロッサリー語をタップ可能にする
    const renderParagraph = (text: string, pi: number) => {
        const tokens = text.split(/(\s+)/);
        return (
            <p key={pi} style={{ margin: pi === 0 ? 0 : '16px 0 0' }}>
                {tokens.map((tok, ti) => {
                    if (/^\s+$/.test(tok)) return tok;
                    const m = tok.match(/[A-Za-z][A-Za-z-]*/);
                    const key = m ? m[0].toLowerCase() : null;
                    if (key && DAY1_GLOSSARY[key]) {
                        const on = active?.key === key;
                        const hasGrammar = !!DAY1_GLOSSARY[key].grammar;
                        return (
                            <span key={ti}
                                onClick={(e) => onWord(e, key, m![0])}
                                style={{
                                    cursor: 'pointer',
                                    borderBottom: hasGrammar ? `2px solid ${GREEN}77` : `1.5px dotted ${GOLD}`,
                                    background: on ? (hasGrammar ? '#DCFCE7' : '#FEF3C7') : 'transparent',
                                    borderRadius: '3px',
                                    transition: 'background 0.12s',
                                }}>
                                {tok}
                            </span>
                        );
                    }
                    return <span key={ti}>{tok}</span>;
                })}
            </p>
        );
    };

    const SectionHead = ({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) => (
        <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: DEEPGOLD, letterSpacing: '2.5px', textTransform: 'uppercase' }}>{eyebrow}</div>
            <div style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 900, color: INK, marginTop: '4px', letterSpacing: '0.3px' }}>{title}</div>
            {sub && <div style={{ fontSize: '12px', color: FAINT, marginTop: '4px' }}>{sub}</div>}
        </div>
    );

    const speaker = (text: string, size = 24) => (
        <button onClick={(e) => { e.stopPropagation(); speak(text); }}
            style={{ flexShrink: 0, width: `${size}px`, height: `${size}px`, borderRadius: '50%', border: 'none', cursor: 'pointer', background: '#F5F3EC', color: SUB, fontSize: `${size * 0.4}px`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="読み上げ">▶</button>
    );

    return (
        <div onClick={() => setActive(null)} style={{ minHeight: '100vh', backgroundColor: '#FAF8F2', fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif' }}>
            <EikenOutputNav active="write" />

            {/* HEADER */}
            <div style={{ backgroundColor: '#fff', borderBottom: `1px solid ${LINE}`, padding: isMobile ? '16px' : '20px 32px' }}>
                <div style={{ maxWidth: '820px', margin: '0 auto' }}>
                    <Link href="/english/write/days" style={{ textDecoration: 'none', color: SUB, fontSize: '12px', fontWeight: 700 }}>← ライトパス 30日に戻る</Link>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '22px' : '26px', fontWeight: 900, color: GOLD, letterSpacing: '0.5px' }}>LESSON</span>
                        <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', background: INK, padding: '3px 8px', borderRadius: '6px' }}>Day 1 ・ 体験版</span>
                    </div>
                    <p style={{ margin: '8px 0 0', fontSize: isMobile ? '15px' : '16px', fontWeight: 800, color: INK }}>{essay.topic}</p>
                    <p style={{ margin: '3px 0 0', fontSize: '12px', color: FAINT }}>{essay.topicJa}</p>
                </div>
            </div>

            {/* EXERCISE 1: VOCABULARY */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: isMobile ? '20px 16px 0' : '28px 32px 0' }}>
                <SectionHead eyebrow="Exercise 1" title="Vocabulary" sub="単語・定義・例文を音読しよう。各行の ▶ で発音が聞ける。" />
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', overflow: 'hidden' }}>
                    {DAY1_VOCAB.map((v, i) => (
                        <div key={v.word} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                            <div style={{ width: isMobile ? 'auto' : '180px', flexShrink: 0, padding: '16px 18px', borderRight: isMobile ? 'none' : `1px dashed ${LINE}`, borderBottom: isMobile ? `1px dashed ${LINE}` : 'none' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ fontSize: '17px', fontWeight: 800, color: '#2563EB' }}>{v.word}</span>
                                    {speaker(v.word, 20)}
                                </div>
                                <span style={{ display: 'inline-block', marginTop: '8px', fontSize: '10px', fontWeight: 800, color: SUB, background: '#F5F3EC', padding: '2px 8px', borderRadius: '5px' }}>{v.pos}</span>
                            </div>
                            <div style={{ flex: 1, padding: '16px 18px' }}>
                                <div style={{ fontSize: '13px' }}>
                                    <span style={{ color: GOLD, fontWeight: 800, fontFamily: 'Georgia, serif' }}>{v.ipa}</span>
                                    <span style={{ color: '#57534E' }}> {v.def}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '12px', background: '#FAF8F2', borderRadius: '10px', padding: '12px 14px' }}>
                                    <span style={{ flex: 1, fontSize: '14px', color: INK, fontFamily: 'Georgia, serif', lineHeight: 1.6 }}>
                                        {renderExample(v.example, v.word)}
                                    </span>
                                    {speaker(v.example, 22)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* EXERCISE 2: READING */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: isMobile ? '24px 16px 0' : '32px 32px 0' }}>
                <SectionHead eyebrow="Exercise 2" title="Reading" sub="下線の単語をタップ → 意味と文法解説。金の点線=語の意味 / 緑の下線=なぜこの形か(文法ポイント)あり。" />
                <div style={{ background: CREAM, border: `1px solid ${GOLD}33`, borderRadius: '18px', boxShadow: '0 8px 30px rgba(212,175,55,0.08)', padding: isMobile ? '22px 20px' : '32px 36px' }}>
                    <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: isMobile ? '16px' : '18px', lineHeight: 2.0, color: INK, letterSpacing: '0.2px' }}>
                        {paras.map((p, i) => renderParagraph(p, i))}
                    </div>
                    <div style={{ marginTop: '20px', paddingTop: '14px', borderTop: `1px dashed ${LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <button onClick={(e) => { e.stopPropagation(); speak(essay.essay.replace(/\n+/g, ' ')); }}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: `1px solid ${LINE}`, background: '#fff', borderRadius: '10px', padding: '9px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: 700, color: '#57534E' }}>
                            ▶ 全文を読み上げる
                        </button>
                        <span style={{ fontSize: '11px', color: FAINT }}>{essay.wordCount} words</span>
                    </div>
                </div>
            </div>

            {/* EXERCISE 3: GRAMMAR */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: isMobile ? '24px 16px 0' : '32px 32px 0' }}>
                <SectionHead eyebrow="Exercise 3" title="Grammar 重要事項" sub="この回で押さえる文法・構文の型。" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {DAY1_GRAMMAR.map(g => (
                        <div key={g.no} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: isMobile ? '16px' : '18px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '10px' }}>
                                <span style={{ flexShrink: 0, width: '24px', height: '24px', borderRadius: '7px', background: GREEN, color: '#fff', fontSize: '12px', fontWeight: 900, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{g.no}</span>
                                <span style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: 800, color: INK }}>{g.title}</span>
                            </div>
                            <div style={{ background: '#FAF8F2', borderRadius: '10px', padding: '12px 14px', fontFamily: 'Georgia, serif', fontSize: '14px', lineHeight: 1.7, color: INK }}>
                                {renderHighlight(g.example, g.highlight)}
                            </div>
                            <div style={{ fontSize: '13px', color: '#57534E', lineHeight: 1.85, marginTop: '12px' }}>{g.explain}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ height: '32px' }} />
            <EikenOutputDisclaimer />

            {/* GLOSS TOOLTIP */}
            {active && gloss && (() => {
                const vw = typeof window !== 'undefined' ? window.innerWidth : 360;
                const below = active.y < 250;   // 画面上部の語は下に出す
                const accent = gloss.grammar ? GREEN : GOLD;
                return (
                    <div onClick={(e) => e.stopPropagation()} style={{
                        position: 'fixed', left: Math.min(Math.max(active.x, 150), vw - 150),
                        top: below ? active.y + 26 : active.y - 12,
                        transform: below ? 'translate(-50%, 0)' : 'translate(-50%, -100%)',
                        zIndex: 50, width: '288px', maxWidth: 'calc(100vw - 24px)',
                        background: '#fff', borderRadius: '14px', border: `1px solid ${accent}44`,
                        boxShadow: '0 12px 34px rgba(28,25,23,0.22)', padding: '14px 16px',
                        borderTop: `3px solid ${accent}`,
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

// 例文中の見出し語を太字にする
function renderExample(example: string, word: string) {
    const re = new RegExp(`\\b(${word}\\w*)\\b`, 'i');
    const parts = example.split(re);
    return parts.map((p, i) =>
        re.test(p) && p.toLowerCase().startsWith(word.toLowerCase())
            ? <strong key={i} style={{ color: '#1C1917' }}>{p}</strong>
            : <span key={i}>{p}</span>
    );
}

// 文法例文の重要部分をハイライト
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
