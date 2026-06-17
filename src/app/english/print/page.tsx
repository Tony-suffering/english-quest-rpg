'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Question {
    n: number;
    q: string;
    choices: string[];
    answer: string;
}

interface ConvoLine {
    speaker: string;
    text: string;
}

interface Sheet {
    id: string;
    theme: string;
    toeic: Question[];
    eiken: Question[];
    convo: ConvoLine[];
    convoAnswers: { n: number; a: string }[];
}

const SHEETS: Sheet[] = [
    {
        id: 'Level 1-01',
        theme: '月曜の本音',
        toeic: [
            { n: 1, q: 'My manager ______ another pointless meeting next week.', choices: ['hold', 'holds', 'will hold', 'holding'], answer: 'C' },
            { n: 2, q: 'Please submit the report ______ Friday, or just pretend you forgot.', choices: ['in', 'by', 'until', 'at'], answer: 'B' },
            { n: 3, q: 'This printer is much ______ than my will to live on Monday.', choices: ['slow', 'slower', 'slowest', 'more slow'], answer: 'B' },
        ],
        eiken: [
            { n: 4, q: "I'm looking ______ to the weekend more than to my own job.", choices: ['forward', 'ahead', 'up', 'after'], answer: 'A' },
            { n: 5, q: 'I have worked here ______ 2015, and nobody knows my name.', choices: ['for', 'since', 'from', 'at'], answer: 'B' },
            { n: 6, q: 'Could you ______ me the file you "definitely sent last week"?', choices: ['send', 'take', 'bring', 'put'], answer: 'A' },
        ],
        convo: [
            { speaker: 'A', text: 'Hi! How ______ (7) your weekend?' },
            { speaker: 'B', text: 'Too short. I spent half of it dreading Monday.' },
            { speaker: 'A', text: 'Same. ______ (8) did you actually do?' },
            { speaker: 'B', text: 'I stared at the ceiling and called it self-care.' },
        ],
        convoAnswers: [{ n: 7, a: 'was' }, { n: 8, a: 'What' }],
    },
    {
        id: 'Level 1-02',
        theme: '人間関係',
        toeic: [
            { n: 1, q: 'Please ______ your camera off so nobody sees you cry.', choices: ['keep', 'keeps', 'kept', 'keeping'], answer: 'A' },
            { n: 2, q: 'The deadline was ______ the end of the day, which already passed.', choices: ['by', 'until', 'on', 'in'], answer: 'A' },
            { n: 3, q: 'My coworker is responsible ______ about half of my stress.', choices: ['of', 'for', 'to', 'with'], answer: 'B' },
        ],
        eiken: [
            { n: 4, q: 'It started raining, ______ my motivation died anyway.', choices: ['but', 'so', 'or', 'because'], answer: 'B' },
            { n: 5, q: 'This is the worst Monday I have ______ experienced, again.', choices: ['never', 'ever', 'yet', 'already'], answer: 'B' },
            { n: 6, q: 'Would you mind ______ talking during my lunch break?', choices: ['stop', 'to stop', 'stopping', 'stopped'], answer: 'C' },
        ],
        convo: [
            { speaker: 'A', text: 'Excuse me, ______ (7) is the meeting room?' },
            { speaker: 'B', text: 'Down the hall, past the dreams you gave up.' },
            { speaker: 'A', text: '...Thanks. How ______ (8) does this meeting last?' },
            { speaker: 'B', text: 'Spiritually? Forever.' },
        ],
        convoAnswers: [{ n: 7, a: 'where' }, { n: 8, a: 'long' }],
    },
    {
        id: 'Level 1-03',
        theme: 'キャリア',
        toeic: [
            { n: 1, q: 'My resume has a lot of ______ that I may have slightly invented.', choices: ['experience', 'experienced', 'experiences', 'experiencing'], answer: 'A' },
            { n: 2, q: 'We need to ______ a decision before everyone forgets why.', choices: ['do', 'make', 'take', 'have'], answer: 'B' },
            { n: 3, q: 'The project was ______ after three months of "almost done."', choices: ['cancel', 'canceled', 'canceling', 'cancels'], answer: 'B' },
        ],
        eiken: [
            { n: 4, q: 'If my boss ______ this, I am definitely getting fired.', choices: ['read', 'reads', 'reading', 'will read'], answer: 'B' },
            { n: 5, q: "I'm not good ______ pretending to be busy, but I try.", choices: ['at', 'in', 'on', 'for'], answer: 'A' },
            { n: 6, q: 'He lies on his timesheet as well ______ a professional.', choices: ['as', 'than', 'like', 'so'], answer: 'A' },
        ],
        convo: [
            { speaker: 'A', text: 'What ______ (7) you like to drink?' },
            { speaker: 'B', text: 'Something that makes this job tolerable.' },
            { speaker: 'A', text: '______ (8) you like anything to eat?' },
            { speaker: 'B', text: 'My words, from when I said "I love teamwork."' },
        ],
        convoAnswers: [{ n: 7, a: 'would' }, { n: 8, a: 'Would' }],
    },
];

const GOLD = '#D4AF37';
const GREEN = '#10B981';

function Section({ label, color, questions }: { label: string; color: string; questions: Question[] }) {
    return (
        <div style={{ marginBottom: 22 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color, marginBottom: 12 }}>{label}</div>
            <ol style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
                {questions.map((item) => (
                    <li key={item.n} style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 15, lineHeight: 1.6, color: '#1C1917' }}>
                            <span style={{ fontWeight: 800, color: '#A8A29E', marginRight: 8 }}>{item.n}.</span>
                            {item.q}
                        </div>
                        <div style={{ marginTop: 4, marginLeft: 22, fontSize: 13, color: '#78716C', display: 'flex', flexWrap: 'wrap', gap: '4px 18px' }}>
                            {item.choices.map((c, i) => (
                                <span key={i}>({String.fromCharCode(65 + i)}) {c}</span>
                            ))}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default function EnglishPrintPage() {
    const [index, setIndex] = useState(0);
    const [showAnswers, setShowAnswers] = useState(false);
    const sheet = SHEETS[index];

    const answerStrip = [
        ...sheet.toeic.map((q) => `${q.n}-${q.answer}`),
        ...sheet.eiken.map((q) => `${q.n}-${q.answer}`),
        ...sheet.convoAnswers.map((c) => `${c.n}-${c.a}`),
    ].join('   ');

    const tabBtn = (active: boolean): React.CSSProperties => ({
        borderRadius: 10,
        border: `1px solid ${active ? GOLD + '99' : '#E7E5E4'}`,
        background: active ? '#FBF7E9' : '#fff',
        color: active ? '#8A6D1B' : '#78716C',
        fontWeight: active ? 800 : 500,
        fontSize: 13,
        padding: '7px 12px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
    });

    return (
        <div style={{ minHeight: '100vh', background: '#F5F5F4', padding: '40px 16px' }}>
            <style>{`@media print { .no-print { display: none !important; } .sheet { box-shadow: none !important; border: none !important; border-radius: 0 !important; padding: 0 !important; } }`}</style>
            <div style={{ maxWidth: 640, margin: '0 auto' }}>

                <header className="no-print" style={{ marginBottom: 22 }}>
                    <Link href="/english/home" style={{ fontSize: 12, color: '#A8A29E', textDecoration: 'none' }}>← English home</Link>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: GOLD, margin: '12px 0 6px' }}>1日1枚、たぶん続かない</div>
                    <h1 style={{ fontSize: 30, fontWeight: 900, color: '#1C1917', margin: '0 0 8px', letterSpacing: '-0.02em' }}>TOEICのプリント学習</h1>
                    <p style={{ fontSize: 14, color: '#57534E', lineHeight: 1.7, margin: 0 }}>
                        文法はガチ、例文は会社で言えない本音。TOEIC・英検・簡単な英会話を1枚に。
                        恥とあきらめながら、毎日1枚。
                    </p>
                </header>

                <div className="no-print" style={{ marginBottom: 22, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {SHEETS.map((s, i) => (
                            <button key={s.id} style={tabBtn(i === index)} onClick={() => setIndex(i)}>{s.id}</button>
                        ))}
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                        <button
                            style={{ borderRadius: 10, border: '1px solid #E7E5E4', background: '#fff', color: '#57534E', fontSize: 13, padding: '7px 12px', cursor: 'pointer' }}
                            onClick={() => setShowAnswers((v) => !v)}
                        >
                            {showAnswers ? '解答を隠す' : '解答を表示'}
                        </button>
                        <button
                            style={{ borderRadius: 10, border: `1px solid ${GREEN}`, background: GREEN, color: '#fff', fontSize: 13, fontWeight: 800, padding: '7px 16px', cursor: 'pointer' }}
                            onClick={() => window.print()}
                        >
                            印刷する
                        </button>
                    </div>
                </div>

                <article className="sheet" style={{ borderRadius: 16, border: '1px solid #E7E5E4', background: '#fff', padding: 32, boxShadow: '0 2px 14px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: `2px solid ${GOLD}`, paddingBottom: 8, marginBottom: 22 }}>
                        <div style={{ fontSize: 17, fontWeight: 900, color: '#1C1917' }}>
                            TOEIC・英検・英会話 <span style={{ fontSize: 13, fontWeight: 700, color: '#A8A29E' }}>／ {sheet.theme}</span>
                        </div>
                        <div style={{ fontFamily: 'monospace', fontSize: 13, color: '#A8A29E' }}>{sheet.id}</div>
                    </div>

                    <Section label="A. TOEIC Part 5 — 短文穴埋め" color={GREEN} questions={sheet.toeic} />
                    <Section label="B. 英検 — 語彙・文法" color={GREEN} questions={sheet.eiken} />

                    <div style={{ marginBottom: 22 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: GREEN, marginBottom: 12 }}>C. 簡単な英会話 — 穴埋め</div>
                        <div style={{ borderRadius: 12, background: '#FAFAF9', padding: 16 }}>
                            {sheet.convo.map((line, i) => (
                                <div key={i} style={{ fontSize: 15, color: '#1C1917', lineHeight: 1.7, marginBottom: 4 }}>
                                    <span style={{ fontWeight: 800, color: '#A8A29E', marginRight: 8 }}>{line.speaker}:</span>
                                    {line.text}
                                </div>
                            ))}
                        </div>
                    </div>

                    {showAnswers && (
                        <div style={{ borderTop: '1px dashed #D6D3D1', paddingTop: 12 }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: '#8A6D1B', marginBottom: 4 }}>解答</div>
                            <div style={{ fontFamily: 'monospace', fontSize: 13, color: '#57534E' }}>{answerStrip}</div>
                        </div>
                    )}
                </article>

                <p className="no-print" style={{ marginTop: 16, textAlign: 'center', fontSize: 11, color: '#A8A29E' }}>
                    toniolab — 恥とあきらめの英会話 / 1日1枚のプリント学習
                </p>
            </div>
        </div>
    );
}
