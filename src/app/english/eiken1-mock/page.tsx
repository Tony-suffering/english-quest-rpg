'use client';

/**
 * 実用英語技能検定 1級 一次 形式 フル模試 (GRADEPASS) -- 画面版。
 * 大問1-5 + リスニング。選択式(1-35 + L)は自己採点、記述(要約/エッセイ)は模範解答+語数カウンタ。
 * 非公式オリジナル模試。docs/eiken1-style-spec.md
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import EIKEN1_MOCK_01 from '@/data/english/eiken1-mock-01';
import type {
    Choice4, Q2Set, Q3Set, ListenConvSet, ListenPassageSet, ListenRealLifeSet,
} from '@/data/english/eiken1-types';

const GREEN = '#0E9F6E';
const DEEPGREEN = '#046C4E';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E5E3DC';
const PAPER = '#FFFFFF';
const RED = '#DC2626';

const ANSWERS_KEY = 'eiken1-mock-01-answers';
const WRITE_KEY = 'eiken1-mock-01-writing';

function speak(text: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text.replace(/\n+/g, '. '));
    u.lang = 'en-US';
    u.rate = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
}
function stopSpeak() {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
}
const countWords = (s: string) => (s || '').trim().split(/\s+/).filter(Boolean).length;

export default function Eiken1MockPage() {
    const t = EIKEN1_MOCK_01;
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [writing, setWriting] = useState<{ summary: string; essay: string }>({ summary: '', essay: '' });
    const [graded, setGraded] = useState(false);
    const [reveal, setReveal] = useState(false);
    const [showScripts, setShowScripts] = useState(false);
    const [showModels, setShowModels] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        try {
            const s = localStorage.getItem(ANSWERS_KEY);
            if (s) setAnswers(JSON.parse(s));
            const w = localStorage.getItem(WRITE_KEY);
            if (w) setWriting(JSON.parse(w));
        } catch { /* noop */ }
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => { window.removeEventListener('resize', check); stopSpeak(); };
    }, []);

    const select = useCallback((no: number, label: string) => {
        setAnswers(prev => {
            const next = { ...prev, [no]: label };
            try { localStorage.setItem(ANSWERS_KEY, JSON.stringify(next)); } catch { /* noop */ }
            return next;
        });
    }, []);
    const setWrite = useCallback((k: 'summary' | 'essay', v: string) => {
        setWriting(prev => {
            const next = { ...prev, [k]: v };
            try { localStorage.setItem(WRITE_KEY, JSON.stringify(next)); } catch { /* noop */ }
            return next;
        });
    }, []);

    const score = useMemo(() => {
        let written = 0, listening = 0;
        t.answerKey.forEach(k => {
            if (answers[k.no] === k.answer) { if (k.no <= 35) written++; else listening++; }
        });
        return { written, listening, total: written + listening };
    }, [answers, t]);
    const writtenTotal = 35;
    const listeningTotal = t.answerKey.length - 35;

    const reset = () => {
        setAnswers({});
        setGraded(false);
        try { localStorage.removeItem(ANSWERS_KEY); } catch { /* noop */ }
        stopSpeak();
    };
    const showMark = graded || reveal;

    // ---- shared renderers ----
    const ChoiceList = ({ no, choices, answer, compact }: { no: number; choices: Choice4[]; answer: string; compact?: boolean }) => (
        <div style={{ display: compact && !isMobile ? 'grid' : 'flex', gridTemplateColumns: compact && !isMobile ? '1fr 1fr' : undefined, flexDirection: 'column', gap: compact ? '4px 14px' : '4px', marginTop: '6px' }}>
            {choices.map(c => {
                const chosen = answers[no] === c.label;
                const isCorrect = answer === c.label;
                let bg = '#fff', bd = LINE, col = INK, ring = 'transparent';
                if (chosen) { ring = GREEN; bg = '#ECFDF5'; }
                if (showMark && isCorrect) { bg = '#ECFDF5'; bd = GREEN; col = DEEPGREEN; }
                if (showMark && chosen && !isCorrect) { bg = '#FEF2F2'; bd = RED; col = '#991B1B'; }
                return (
                    <button key={c.label} onClick={() => select(no, c.label)} className="choice-row"
                        style={{
                            display: 'flex', alignItems: 'flex-start', gap: '8px', textAlign: 'left',
                            padding: '6px 10px', borderRadius: '8px', cursor: 'pointer',
                            border: `1px solid ${bd}`, background: bg, boxShadow: chosen ? `0 0 0 1.5px ${ring}` : 'none',
                        }}>
                        <span style={{
                            flexShrink: 0, width: '20px', height: '20px', borderRadius: '50%',
                            border: `1.5px solid ${showMark && isCorrect ? GREEN : showMark && chosen && !isCorrect ? RED : chosen ? GREEN : '#C9C4B5'}`,
                            color: showMark && isCorrect ? GREEN : showMark && chosen && !isCorrect ? RED : chosen ? DEEPGREEN : SUB,
                            fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>{c.label}</span>
                        <span style={{ fontSize: '13.5px', lineHeight: 1.5, color: col }}>{c.text}</span>
                    </button>
                );
            })}
        </div>
    );
    const Explain = ({ note, tag }: { note?: string; tag?: string }) => (
        reveal && note ? (
            <div style={{ marginTop: '6px', fontSize: '11.5px', lineHeight: 1.7, color: SUB, background: '#F5FBF8', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '7px 10px' }}>
                {tag && <b style={{ color: DEEPGREEN }}>[{tag}] </b>}{note}
            </div>
        ) : null
    );
    const QNo = ({ no }: { no: number }) => (
        <span style={{ display: 'inline-flex', minWidth: '30px', height: '22px', alignItems: 'center', justifyContent: 'center', background: INK, color: '#fff', borderRadius: '6px', fontSize: '12px', fontWeight: 800, padding: '0 6px' }}>{no}</span>
    );
    const PlayBtn = ({ text, label = '音声' }: { text: string; label?: string }) => (
        <button onClick={() => speak(text)} className="no-print"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', border: `1px solid ${LINE}`, background: '#fff', color: SUB, borderRadius: '99px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}>
            <span style={{ fontSize: '9px' }}>{'▶'}</span> {label}
        </button>
    );
    const SectionHeader = ({ id, tag, title, jp, dir }: { id: string; tag: string; title: string; jp: string; dir: string }) => (
        <div id={id} style={{ marginTop: '34px', scrollMarginTop: '90px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '18px', fontWeight: 900, color: INK, letterSpacing: '0.5px' }}>{tag}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: DEEPGREEN }}>{title}</span>
                <span style={{ fontSize: '11px', color: SUB }}>{jp}</span>
            </div>
            <p style={{ margin: '6px 0 0', fontSize: '11.5px', lineHeight: 1.6, color: SUB, fontStyle: 'italic', background: '#F2F9F5', border: `1px solid ${LINE}`, borderRadius: '8px', padding: '7px 11px' }}>
                <b style={{ color: INK, fontStyle: 'normal' }}>指示: </b>{dir}
            </p>
        </div>
    );
    const PassageBox = ({ title, body }: { title?: string; body: string }) => (
        <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#FCFCFA', padding: '14px 16px', marginBottom: '10px' }}>
            {title && <div style={{ fontSize: '14px', fontWeight: 700, fontStyle: 'italic', color: INK, marginBottom: '8px', fontFamily: 'Georgia, serif', textAlign: 'center' }}>{title}</div>}
            <div style={{ fontSize: '13.5px', lineHeight: 1.85, color: '#292524', whiteSpace: 'pre-line', fontFamily: 'Georgia, serif' }}>{body}</div>
        </div>
    );
    const Q2PassageBox = ({ set }: { set: Q2Set }) => {
        const parts = set.passage.split(/§(\d+)§/);
        return (
            <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#FCFCFA', padding: '14px 16px', marginBottom: '10px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, fontStyle: 'italic', color: INK, marginBottom: '8px', fontFamily: 'Georgia, serif', textAlign: 'center' }}>{set.title}</div>
                <div style={{ fontSize: '13.5px', lineHeight: 2, color: '#292524', whiteSpace: 'pre-line', fontFamily: 'Georgia, serif' }}>
                    {parts.map((p, i) => i % 2 === 1
                        ? <span key={i} style={{ display: 'inline-block', minWidth: '48px', textAlign: 'center', borderBottom: `2px solid ${GREEN}`, color: DEEPGREEN, fontWeight: 800, fontFamily: 'sans-serif', fontSize: '12px', margin: '0 2px' }}>({p})</span>
                        : <span key={i}>{p}</span>)}
                </div>
            </div>
        );
    };

    return (
        <div style={{ minHeight: '100vh', background: '#EDECE6', fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif' }}>
            <style>{`.choice-row:hover { border-color: ${GREEN} !important; }`}</style>

            {/* ===== TOOLBAR ===== */}
            <div className="no-print" style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(28,25,23,0.97)', color: '#fff', padding: isMobile ? '10px 12px' : '12px 20px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 900, color: GREEN, letterSpacing: '1px' }}>GRADE<span style={{ color: '#fff' }}>PASS</span></span>
                        <span style={{ fontSize: '10px', color: '#C9C0AC' }}>1級 一次 形式 フル模試</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {!graded
                            ? <button onClick={() => { setGraded(true); stopSpeak(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={btnStyle(GREEN, '#fff')}>採点する</button>
                            : <button onClick={() => setGraded(false)} style={btnStyle('#57534E', '#fff')}>採点を隠す</button>}
                        <button onClick={() => setReveal(v => !v)} style={btnStyle(reveal ? GREEN : '#3F3B38', '#fff')}>{reveal ? '解説ON' : '解答解説'}</button>
                        <button onClick={() => setShowModels(v => !v)} style={btnStyle(showModels ? GREEN : '#3F3B38', '#fff')}>模範解答</button>
                        <button onClick={() => setShowScripts(v => !v)} style={btnStyle('#3F3B38', '#fff')}>台本</button>
                        <button onClick={() => window.open('/english/eiken1-mock/print', '_blank')} style={btnStyle('#fff', INK)}>印刷 / PDF</button>
                        <button onClick={reset} style={btnStyle('transparent', '#C9C0AC', true)}>リセット</button>
                    </div>
                </div>
                <div style={{ maxWidth: '900px', margin: '8px auto 0', display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <a href="#q1" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '6px', fontSize: '12px', fontWeight: 900, color: INK, background: GREEN, textDecoration: 'none', borderRadius: '7px', padding: '5px 12px' }}>筆記 <span style={{ fontSize: '10px', fontWeight: 800, color: DEEPGREEN }}>1-35</span></a>
                    {[['q2', '大問2'], ['q3', '大問3'], ['q4', '要約'], ['q5', '英作文']].map(([id, l]) => (
                        <a key={id} href={`#${id}`} style={{ fontSize: '11px', fontWeight: 700, color: '#C9C0AC', textDecoration: 'none', border: '1px solid #4b4641', borderRadius: '6px', padding: '3px 8px' }}>{l}</a>
                    ))}
                    <a href="#listening" style={{ display: 'inline-flex', alignItems: 'baseline', gap: '6px', fontSize: '12px', fontWeight: 900, color: '#fff', background: '#3F3B38', textDecoration: 'none', borderRadius: '7px', padding: '5px 12px' }}>リスニング</a>
                    <a href="#answerkey" style={{ fontSize: '11px', fontWeight: 700, color: '#C9C0AC', textDecoration: 'none', border: '1px solid #4b4641', borderRadius: '6px', padding: '3px 9px' }}>解答</a>
                </div>
            </div>

            {/* ===== SCORE BAR ===== */}
            {graded && (
                <div className="no-print" style={{ background: '#fff', borderBottom: `1px solid ${LINE}` }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '14px 20px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                        {[
                            { label: '筆記(選択)', v: score.written, max: writtenTotal },
                            { label: 'リスニング', v: score.listening, max: listeningTotal },
                            { label: '選択式 合計', v: score.total, max: writtenTotal + listeningTotal },
                        ].map(s => (
                            <div key={s.label} style={{ flex: 1, minWidth: '120px', textAlign: 'center', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '10px' }}>
                                <div style={{ fontSize: '22px', fontWeight: 900, color: INK }}>{s.v}<span style={{ fontSize: '12px', color: SUB, fontWeight: 700 }}> / {s.max}</span></div>
                                <div style={{ fontSize: '10px', color: SUB, letterSpacing: '1px' }}>{s.label} 正答</div>
                            </div>
                        ))}
                        <div style={{ fontSize: '11px', color: SUB, flexBasis: '100%', textAlign: 'center' }}>
                            大問4(要約)・大問5(英作文)は記述式のため自動採点対象外。「模範解答」で採点観点を確認してください。
                        </div>
                    </div>
                </div>
            )}

            {/* ===== BOOKLET ===== */}
            <div style={{ maxWidth: '900px', margin: '18px auto', background: PAPER, boxShadow: '0 8px 40px rgba(0,0,0,0.12)', borderRadius: '4px', padding: isMobile ? '22px 16px 60px' : '40px 48px 70px' }}>
                {/* cover */}
                <div style={{ textAlign: 'center', borderBottom: `2px solid ${INK}`, paddingBottom: '18px' }}>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 900, color: INK, letterSpacing: '1px' }}>
                        <span style={{ color: GREEN }}>GRADE</span>PASS
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: SUB, marginTop: '4px' }}>実用英語技能検定 1級 一次 形式 フル模試 &mdash; Test 01</div>
                    <div style={{ fontSize: '11px', color: SUB, marginTop: '8px' }}>筆記(語彙・読解・要約・英作文) + リスニング</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', marginTop: '14px', fontSize: '11px', color: SUB }}>
                        <span>氏名 __________________</span><span>日付 ____________</span>
                    </div>
                </div>

                {/* ===== 大問1 ===== */}
                <SectionHeader id="q1" tag="大問 1" title="短文の語句空所補充" jp="22問" dir="To complete each item, choose the best word or phrase from among the four choices." />
                {t.q1.map(q => (
                    <div key={q.no} style={{ marginTop: '14px' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                            <QNo no={q.no} />
                            <span style={{ fontSize: '13.5px', color: INK, lineHeight: 1.6, paddingTop: '1px', whiteSpace: 'pre-line' }}>{q.sentence}</span>
                        </div>
                        <div style={{ marginLeft: isMobile ? 0 : '38px' }}>
                            <ChoiceList no={q.no} choices={q.choices} answer={q.answer} compact />
                            <Explain note={q.note} tag={q.tag} />
                        </div>
                    </div>
                ))}

                {/* ===== 大問2 ===== */}
                <SectionHeader id="q2" tag="大問 2" title="長文の語句空所補充" jp="6問 (2長文)" dir="Read each passage and choose the best word or phrase from among the four choices for each blank." />
                {t.q2.map(set => (
                    <div key={set.no} style={{ marginTop: '18px', borderTop: `1px dashed ${LINE}`, paddingTop: '14px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: DEEPGREEN, marginBottom: '8px' }}>Questions {set.range}</div>
                        <Q2PassageBox set={set} />
                        {set.blanks.map(b => (
                            <div key={b.no} style={{ marginBottom: '12px' }}>
                                <QNo no={b.no} />
                                <ChoiceList no={b.no} choices={b.choices} answer={b.answer} compact />
                                <Explain note={b.note} />
                            </div>
                        ))}
                    </div>
                ))}

                {/* ===== 大問3 ===== */}
                <SectionHeader id="q3" tag="大問 3" title="長文の内容一致選択" jp="7問 (2長文)" dir="Read each passage and choose the best answer from among the four choices for each question." />
                {t.q3.map(set => (
                    <div key={set.no} style={{ marginTop: '18px', borderTop: `1px dashed ${LINE}`, paddingTop: '14px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: DEEPGREEN, marginBottom: '8px' }}>Questions {set.range}</div>
                        <PassageBox title={set.title} body={set.passage} />
                        {set.questions.map(q => (
                            <div key={q.no} style={{ marginBottom: '14px' }}>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                                    <QNo no={q.no} />
                                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: INK, lineHeight: 1.5, paddingTop: '1px' }}>{q.question}</span>
                                </div>
                                <ChoiceList no={q.no} choices={q.choices} answer={q.answer} />
                                <Explain note={q.note} />
                            </div>
                        ))}
                    </div>
                ))}

                {/* ===== 大問4 要約 ===== */}
                <SectionHeader id="q4" tag="大問 4" title="英語要約 (Summary)" jp="記述 90-110語" dir={t.q4.instructions.join(' ')} />
                {t.q4.articleTitle && <div style={{ fontSize: '14px', fontWeight: 700, fontStyle: 'italic', color: INK, margin: '10px 0 4px', textAlign: 'center', fontFamily: 'Georgia, serif' }}>{t.q4.articleTitle}</div>}
                <PassageBox body={t.q4.article} />
                <WriteArea value={writing.summary} onChange={v => setWrite('summary', v)} range={t.q4.wordRange} placeholder="ここに英語で要約を書く (90-110語)..." />
                {showModels && <ModelBox title="模範解答 (要約)" body={t.q4.modelSummary} wc={t.q4.modelWordCount} notes={t.q4.scoringNotes} />}

                {/* ===== 大問5 英作文 ===== */}
                <SectionHeader id="q5" tag="大問 5" title="英作文 (Essay)" jp="記述 200-240語" dir={t.q5.instructions.join(' ')} />
                <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#FCFCFA', padding: '14px 16px', marginBottom: '10px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: DEEPGREEN, letterSpacing: '1px', marginBottom: '6px' }}>TOPIC</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: INK, lineHeight: 1.6, fontFamily: 'Georgia, serif' }}>{t.q5.topic}</div>
                    <div style={{ marginTop: '10px', fontSize: '11px', fontWeight: 800, color: SUB, letterSpacing: '1px' }}>POINTS</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                        {t.q5.points.map(p => <span key={p} style={{ fontSize: '12px', color: DEEPGREEN, background: '#ECFDF5', border: `1px solid ${GREEN}44`, borderRadius: '99px', padding: '3px 12px' }}>{p}</span>)}
                    </div>
                </div>
                <WriteArea value={writing.essay} onChange={v => setWrite('essay', v)} range={t.q5.wordRange} placeholder="ここに英語でエッセイを書く (200-240語)..." rows={12} />
                {showModels && <ModelBox title="模範解答 (エッセイ)" body={t.q5.modelEssay} wc={t.q5.modelWordCount} notes={t.q5.scoringNotes} />}

                {/* ===== LISTENING ===== */}
                <div id="listening" style={{ marginTop: '36px', scrollMarginTop: '90px', background: INK, color: '#fff', borderRadius: '8px', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '16px', fontWeight: 900, letterSpacing: '2px' }}>LISTENING</span>
                    <span style={{ fontSize: '11px', color: '#C9C0AC' }}>音声は「読み上げ」ボタン (試作)</span>
                </div>

                <SectionHeader id="l1" tag="Part 1" title="会話の内容一致選択" jp={`${t.listening.part1.length}問`} dir="Listen to each conversation and choose the best answer. (Play the audio; the questions are printed.)" />
                {t.listening.part1.map(s => <L1Card key={s.no} set={s} QNo={QNo} PlayBtn={PlayBtn} ChoiceList={ChoiceList} Explain={Explain} />)}

                <SectionHeader id="l2" tag="Part 2" title="文の内容一致選択" jp={`${t.listening.part2.reduce((a, s) => a + s.questions.length, 0)}問`} dir="Listen to each passage and choose the best answer to each question." />
                {t.listening.part2.map(s => <LPassageCard key={s.no} set={s} QNo={QNo} PlayBtn={PlayBtn} ChoiceList={ChoiceList} Explain={Explain} />)}

                <SectionHeader id="l3" tag="Part 3" title="Real-Life 形式の内容一致選択" jp={`${t.listening.part3.length}問`} dir="Read the situation and question, then listen and choose the best action." />
                {t.listening.part3.map(s => <L3Card key={s.no} set={s} QNo={QNo} PlayBtn={PlayBtn} ChoiceList={ChoiceList} Explain={Explain} />)}

                <SectionHeader id="l4" tag="Part 4" title="インタビューの内容一致選択" jp={`${t.listening.part4.reduce((a, s) => a + s.questions.length, 0)}問`} dir="Listen to the interview and choose the best answer to each question." />
                {t.listening.part4.map(s => <LPassageCard key={s.no} set={s} QNo={QNo} PlayBtn={PlayBtn} ChoiceList={ChoiceList} Explain={Explain} />)}

                {/* ===== ANSWER KEY ===== */}
                <div id="answerkey" style={{ marginTop: '36px', scrollMarginTop: '90px' }}>
                    <div style={{ background: INK, color: '#fff', borderRadius: '8px', padding: '10px 16px', fontSize: '15px', fontWeight: 900, letterSpacing: '1px' }}>ANSWER KEY ・ 解答一覧 (選択式)</div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(5, 1fr)' : 'repeat(10, 1fr)', gap: '4px', marginTop: '12px' }}>
                        {t.answerKey.map(k => {
                            const ok = answers[k.no] === k.answer;
                            const done = answers[k.no] != null;
                            return (
                                <div key={k.no} style={{ border: `1px solid ${LINE}`, borderRadius: '6px', padding: '4px 2px', textAlign: 'center', background: graded && done ? (ok ? '#ECFDF5' : '#FEF2F2') : '#fff' }}>
                                    <div style={{ fontSize: '9px', color: SUB }}>{k.no}</div>
                                    <div style={{ fontSize: '13px', fontWeight: 800, color: graded && done ? (ok ? GREEN : RED) : INK }}>{k.answer}</div>
                                </div>
                            );
                        })}
                    </div>

                    {showScripts && (
                        <div style={{ marginTop: '20px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '10px' }}>LISTENING SCRIPTS ・ リスニング台本</div>
                            <ScriptBlock title="Part 1 ・ 会話" items={t.listening.part1.map(s => ({ head: `No. ${s.question.no} (${s.context})`, body: s.transcript }))} />
                            <ScriptBlock title="Part 2 ・ 文" items={t.listening.part2.map(s => ({ head: `${s.title}`, body: s.transcript }))} />
                            <ScriptBlock title="Part 3 ・ Real-Life" items={t.listening.part3.map(s => ({ head: `No. ${s.no}`, body: `[Situation] ${s.situation}\n[Audio] ${s.transcript}` }))} />
                            <ScriptBlock title="Part 4 ・ インタビュー" items={t.listening.part4.map(s => ({ head: `${s.title}`, body: s.transcript }))} />
                        </div>
                    )}
                </div>

                {/* ===== DISCLAIMER ===== */}
                <div style={{ marginTop: '30px', background: '#F5FBF8', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '14px 16px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: SUB, letterSpacing: '1px', marginBottom: '6px' }}>ご利用にあたって</div>
                    <p style={{ margin: 0, fontSize: '10.5px', lineHeight: 1.85, color: SUB }}>
                        本テストは英語学習者向けの非公式・自主制作のオリジナル模試です。実用英語技能検定(英検)を実施する公益財団法人 日本英語検定協会 および 株式会社 日本英語検定協会 (STEP) とは一切関係がなく、これらの団体が監修・公認・推奨するものではありません。掲載している問題文・本文・お題・解答例はすべて当サービスが独自に作成したオリジナルであり、実際の試験問題(いわゆる過去問)を転載・複製したものではありません。得点はあくまで自己採点の正答数であり、公式スコア(CSEスコア)の換算・合否を保証するものではありません。
                    </p>
                </div>
            </div>
        </div>
    );
}

function btnStyle(bg: string, fg: string, ghost = false): React.CSSProperties {
    return {
        padding: '7px 14px', borderRadius: '8px', border: ghost ? '1px solid #5b554f' : 'none',
        background: bg, color: fg, fontSize: '12px', fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap',
    };
}

function WriteArea({ value, onChange, range, placeholder, rows = 6 }: { value: string; onChange: (v: string) => void; range: [number, number]; placeholder: string; rows?: number }) {
    const wc = countWords(value);
    const ok = wc >= range[0] && wc <= range[1];
    return (
        <div className="no-print" style={{ marginBottom: '10px' }}>
            <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows}
                style={{ width: '100%', boxSizing: 'border-box', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '12px', fontSize: '14px', lineHeight: 1.7, fontFamily: 'Georgia, serif', resize: 'vertical' }} />
            <div style={{ fontSize: '11px', color: wc === 0 ? SUB : ok ? DEEPGREEN : RED, fontWeight: 700, marginTop: '4px', textAlign: 'right' }}>
                {wc} 語 / 目標 {range[0]}-{range[1]} 語 {wc > 0 && (ok ? '✓ 範囲内' : wc < range[0] ? '(不足)' : '(超過)')}
            </div>
        </div>
    );
}

function ModelBox({ title, body, wc, notes }: { title: string; body: string; wc: number; notes: string[] }) {
    return (
        <div style={{ border: `1px solid ${GREEN}55`, borderRadius: '10px', background: '#F2F9F5', padding: '14px 16px', marginBottom: '14px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: DEEPGREEN, marginBottom: '8px' }}>{title} <span style={{ fontWeight: 600, color: SUB }}>({wc}語)</span></div>
            <div style={{ fontSize: '13.5px', lineHeight: 1.85, color: '#292524', whiteSpace: 'pre-line', fontFamily: 'Georgia, serif' }}>{body}</div>
            {notes.length > 0 && (
                <div style={{ marginTop: '10px', borderTop: `1px solid ${LINE}`, paddingTop: '8px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: SUB, letterSpacing: '1px', marginBottom: '4px' }}>採点観点</div>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '11.5px', lineHeight: 1.7, color: SUB }}>
                        {notes.map((n, i) => <li key={i}>{n}</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
}

type SharedProps = {
    QNo: (p: { no: number }) => React.ReactElement;
    PlayBtn: (p: { text: string; label?: string }) => React.ReactElement;
    ChoiceList: (p: { no: number; choices: Choice4[]; answer: string; compact?: boolean }) => React.ReactElement;
    Explain: (p: { note?: string; tag?: string }) => React.ReactElement | null;
};

function L1Card({ set, QNo, PlayBtn, ChoiceList, Explain }: { set: ListenConvSet } & SharedProps) {
    return (
        <div style={{ marginTop: '14px', borderTop: `1px dashed ${LINE}`, paddingTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <QNo no={set.question.no} />
                <span style={{ fontSize: '11px', color: SUB }}>{set.context}</span>
                <PlayBtn text={set.transcript} label="会話を聞く" />
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 600, color: INK, lineHeight: 1.5 }}>{set.question.question}</div>
            <ChoiceList no={set.question.no} choices={set.question.choices} answer={set.question.answer} />
            <Explain note={set.question.note} />
        </div>
    );
}

function LPassageCard({ set, QNo, PlayBtn, ChoiceList, Explain }: { set: ListenPassageSet } & SharedProps) {
    return (
        <div style={{ marginTop: '16px', borderTop: `1px dashed ${LINE}`, paddingTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: DEEPGREEN }}>{set.title}</span>
                <PlayBtn text={set.transcript} label="読み上げ" />
            </div>
            {set.questions.map(q => (
                <div key={q.no} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <QNo no={q.no} />
                        <span style={{ fontSize: '13.5px', fontWeight: 600, color: INK, lineHeight: 1.5, paddingTop: '1px' }}>{q.question}</span>
                    </div>
                    <ChoiceList no={q.no} choices={q.choices} answer={q.answer} />
                    <Explain note={q.note} />
                </div>
            ))}
        </div>
    );
}

function L3Card({ set, QNo, PlayBtn, ChoiceList, Explain }: { set: ListenRealLifeSet } & SharedProps) {
    return (
        <div style={{ marginTop: '16px', borderTop: `1px dashed ${LINE}`, paddingTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <QNo no={set.no} />
                <PlayBtn text={set.transcript} label="放送を聞く" />
            </div>
            <div style={{ border: `1px solid ${LINE}`, borderRadius: '8px', background: '#FCFCFA', padding: '10px 12px', marginBottom: '8px' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: SUB, letterSpacing: '1px' }}>SITUATION</div>
                <div style={{ fontSize: '13px', lineHeight: 1.6, color: '#292524', fontFamily: 'Georgia, serif' }}>{set.situation}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: INK, marginTop: '6px' }}>{set.question}</div>
            </div>
            <ChoiceList no={set.no} choices={set.choices} answer={set.answer} />
            <Explain note={set.note} />
        </div>
    );
}

function ScriptBlock({ title, items }: { title: string; items: { head: string; body: string }[] }) {
    return (
        <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, color: DEEPGREEN, marginBottom: '6px' }}>{title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {items.map((it, i) => (
                    <div key={i} style={{ border: `1px solid ${LINE}`, borderRadius: '8px', padding: '9px 12px', background: '#fff' }}>
                        <div style={{ fontSize: '10px', fontWeight: 800, color: SUB, marginBottom: '3px' }}>{it.head}</div>
                        <div style={{ fontSize: '12px', lineHeight: 1.7, color: '#292524', whiteSpace: 'pre-line' }}>{it.body}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
