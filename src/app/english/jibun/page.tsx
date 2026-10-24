'use client';

import { useState, useMemo, useEffect } from 'react';
import {
    DIAG_QUESTIONS, TOTAL_QUESTIONS, computeResult,
    type DiagOption, type DiagResult,
} from '@/data/english/jibun-diagnostic';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const CREAM = '#FAF8F2';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#ECE7DA';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

type Phase = 'intro' | 'quiz' | 'result';
const SAVE_KEY = 'jibun-eigo30-result';

export default function JibunPage() {
    const [phase, setPhase] = useState<Phase>('intro');
    const [idx, setIdx] = useState(0);
    const [answers, setAnswers] = useState<(number | null)[]>(() => DIAG_QUESTIONS.map(() => null));
    const [isMobile, setIsMobile] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const c = () => setIsMobile(window.innerWidth < 768);
        c(); window.addEventListener('resize', c);
        return () => window.removeEventListener('resize', c);
    }, []);

    const q = DIAG_QUESTIONS[idx];
    const answered = answers.filter(a => a !== null).length;

    const result: DiagResult | null = useMemo(() => {
        if (phase !== 'result') return null;
        const selected: DiagOption[] = [];
        answers.forEach((a, i) => { if (a !== null) selected.push(DIAG_QUESTIONS[i].options[a]); });
        return computeResult(selected);
    }, [phase, answers]);

    useEffect(() => {
        if (result) { try { localStorage.setItem(SAVE_KEY, JSON.stringify({ archetypeKey: result.archetypeKey, archetypeName: result.archetypeName })); } catch { /* */ } }
    }, [result]);

    const pick = (optIdx: number) => {
        setAnswers(prev => { const n = [...prev]; n[idx] = optIdx; return n; });
        setTimeout(() => {
            if (idx < DIAG_QUESTIONS.length - 1) setIdx(idx + 1);
            else setPhase('result');
        }, 140);
    };

    const copyCaption = async () => {
        if (!result) return;
        const cap = `じぶん英語30 診断結果\n私のタイプ: ${result.archetypeName}「${result.tagline}」\n${result.fieldLabel} × ${result.skillLabel} を30日で。\n\n#じぶん英語30 #MyEnglish30 #英語学習 #英語垢`;
        try { await navigator.clipboard.writeText(cap); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* */ }
    };

    // ===== INTRO =====
    if (phase === 'intro') {
        return (
            <div style={{ minHeight: '100vh', background: `radial-gradient(900px 420px at 50% -10%, #FBF4DD, ${CREAM})`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif' }}>
                <div style={{ maxWidth: '560px', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '8px', marginBottom: '18px' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '26px' : '32px', fontWeight: 900, color: GOLD }}>MY ENGLISH</span>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '26px' : '32px', fontWeight: 900, color: INK }}>30</span>
                    </div>
                    <h1 style={{ fontFamily: SERIF, fontSize: isMobile ? '28px' : '40px', fontWeight: 900, lineHeight: 1.35, margin: '0 0 16px', color: INK }}>
                        100の質問で、<br /><span style={{ color: DEEPGOLD }}>あなただけの英語</span>を。
                    </h1>
                    <p style={{ fontSize: isMobile ? '14px' : '16px', color: SUB, lineHeight: 1.9, margin: '0 0 28px' }}>
                        2択中心の100問は、ほんの数分。あなたの目的・分野・性格を診断して、<strong style={{ color: INK }}>あなたの型</strong>に合った「30日で人生を変える英語」の方向性を出します。
                    </p>
                    <button onClick={() => { setPhase('quiz'); setIdx(0); }}
                        style={{ background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#fff', border: 'none', padding: isMobile ? '16px 40px' : '18px 56px', borderRadius: '14px', fontSize: '17px', fontWeight: 900, letterSpacing: '1px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(212,175,55,0.35)' }}>
                        診断をはじめる
                    </button>
                    <p style={{ fontSize: '12px', color: '#A8A29E', marginTop: '16px' }}>全{TOTAL_QUESTIONS}問 ・ 約3分 ・ 直感でOK</p>
                </div>
            </div>
        );
    }

    // ===== RESULT =====
    if (phase === 'result' && result) {
        const Row = ({ k, v, accent }: { k: string; v: string; accent?: string }) => (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px' }}>
                <span style={{ fontSize: '12px', color: SUB, fontWeight: 700 }}>{k}</span>
                <span style={{ fontSize: '14px', fontWeight: 800, color: accent || INK }}>{v}</span>
            </div>
        );
        return (
            <div style={{ minHeight: '100vh', background: CREAM, fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif', padding: isMobile ? '24px 16px 48px' : '40px 32px 56px' }}>
                <div style={{ maxWidth: '620px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '8px', fontSize: '11px', fontWeight: 800, color: DEEPGOLD, letterSpacing: '2px' }}>YOUR TYPE ・ 診断結果</div>
                    <div style={{ background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, borderRadius: '20px', padding: isMobile ? '28px 22px' : '36px 32px', color: '#fff', textAlign: 'center', boxShadow: '0 10px 30px rgba(212,175,55,0.3)', marginBottom: '18px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, opacity: 0.95, marginBottom: '6px' }}>あなたは</div>
                        <div style={{ fontFamily: SERIF, fontSize: isMobile ? '30px' : '38px', fontWeight: 900, lineHeight: 1.3 }}>{result.archetypeName}</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '8px', opacity: 0.97 }}>「{result.tagline}」</div>
                    </div>
                    <p style={{ fontSize: '14px', color: '#3F3A33', lineHeight: 1.9, margin: '0 0 22px', padding: '0 4px' }}>{result.description}</p>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
                        <Row k="レベル" v={result.levelLabel} />
                        <Row k="目的" v={result.goalLabel} accent={GREEN} />
                        <Row k="分野" v={result.fieldLabel} accent={GREEN} />
                        <Row k="伸ばす技能" v={result.skillLabel} />
                        <Row k="ペース" v={result.timeLabel} />
                        <Row k="トーン" v={result.styleSummary[4]} />
                    </div>

                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '16px 18px', marginBottom: '12px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 800, color: SUB, letterSpacing: '1px', marginBottom: '8px' }}>あなたのタイプ</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {result.styleSummary.map((s, i) => (
                                <span key={i} style={{ fontSize: '12px', fontWeight: 700, color: DEEPGOLD, background: '#FEF9E7', border: `1px solid ${GOLD}44`, padding: '5px 12px', borderRadius: '99px' }}>{s}</span>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: '#FEF9E7', border: `1px solid ${GOLD}33`, borderRadius: '14px', padding: '18px 20px', marginBottom: '24px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '1px', marginBottom: '8px' }}>あなたの30日教材の方向性</div>
                        <p style={{ fontSize: '14px', color: INK, lineHeight: 1.9, margin: 0 }}>{result.focus}</p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: '140px', padding: '15px', borderRadius: '12px', background: INK, color: '#fff', textAlign: 'center', fontSize: '14px', fontWeight: 900, opacity: 0.5 }}>
                            30日教材をはじめる（準備中）
                        </div>
                        <button onClick={copyCaption} style={{ flex: 1, minWidth: '140px', padding: '15px', borderRadius: '12px', border: `1px solid ${GOLD}55`, background: '#FEF9E7', color: DEEPGOLD, fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>
                            {copied ? 'コピーしました' : '結果をシェア'}
                        </button>
                    </div>
                    <button onClick={() => { setAnswers(DIAG_QUESTIONS.map(() => null)); setIdx(0); setPhase('intro'); }}
                        style={{ display: 'block', margin: '18px auto 0', background: 'none', border: 'none', color: SUB, fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}>
                        もう一度診断する
                    </button>
                </div>
            </div>
        );
    }

    // ===== QUIZ =====
    const pct = Math.round((idx / DIAG_QUESTIONS.length) * 100);
    return (
        <div style={{ minHeight: '100vh', background: CREAM, fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", sans-serif', display: 'flex', flexDirection: 'column' }}>
            {/* progress */}
            <div style={{ position: 'sticky', top: 0, background: 'rgba(250,248,242,0.95)', backdropFilter: 'blur(6px)', padding: isMobile ? '16px 16px 10px' : '20px 32px 12px', zIndex: 10 }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <button onClick={() => { if (idx > 0) setIdx(idx - 1); else setPhase('intro'); }} style={{ background: 'none', border: 'none', color: SUB, fontSize: '13px', cursor: 'pointer' }}>{'< 戻る'}</button>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: DEEPGOLD }}>{idx + 1} / {DIAG_QUESTIONS.length}</span>
                    <span style={{ fontSize: '11px', color: '#A8A29E' }}>{q.section}</span>
                </div>
                <div style={{ maxWidth: '600px', margin: '0 auto', height: '6px', background: '#EFEBDF', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${GOLD}, ${GREEN})`, transition: 'width 0.25s' }} />
                </div>
            </div>

            {/* question */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '20px 16px 40px' : '32px' }}>
                <div style={{ maxWidth: '600px', width: '100%' }}>
                    <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? '22px' : '28px', fontWeight: 900, color: INK, lineHeight: 1.5, textAlign: 'center', margin: '0 0 28px' }}>{q.text}</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {q.options.map((o, i) => {
                            const chosen = answers[idx] === i;
                            return (
                                <button key={i} onClick={() => pick(i)}
                                    style={{
                                        textAlign: 'left', padding: isMobile ? '16px 18px' : '18px 22px', borderRadius: '14px', cursor: 'pointer',
                                        border: chosen ? `2px solid ${GOLD}` : `1px solid ${LINE}`,
                                        background: chosen ? '#FEF9E7' : '#fff',
                                        fontSize: isMobile ? '15px' : '16px', fontWeight: 700, color: INK,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)', transition: 'all 0.12s',
                                    }}>
                                    {o.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
