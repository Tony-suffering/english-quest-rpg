'use client';

/**
 * 英検1級 一次 形式 フル模試 (GRADEPASS) -- 印刷専用ページ。
 * 本番の問題冊子レイアウトを再現: A4縦・1段組み(語彙のみ2段)、大問1-5 + リスニング、巻末に解答/台本。
 * 記述(要約/エッセイ)は罫線付き解答欄を印字。両面印刷(長辺とじ)対応。
 */

import { useState } from 'react';
import EIKEN1_MOCK_01 from '@/data/english/eiken1-mock-01';
import type { Choice4, Q2Set } from '@/data/english/eiken1-types';

const INK = '#111';
const GREEN = '#046C4E';
const SUB = '#555';
const LINE = '#111';
const SOFT = '#999';

export default function Eiken1PrintPage() {
    const t = EIKEN1_MOCK_01;
    const [showAnswers, setShowAnswers] = useState(false);
    const [includeModels, setIncludeModels] = useState(true);

    const Ans = ({ a }: { a: string }) => showAnswers
        ? <span style={{ color: '#B00', fontWeight: 700, marginLeft: '4px' }}>[{a}]</span> : null;

    const Choices = ({ choices, inline }: { choices: Choice4[]; inline?: boolean }) => (
        <div style={{ marginTop: '1mm', paddingLeft: '4mm', display: inline ? 'grid' : 'block', gridTemplateColumns: inline ? '1fr 1fr' : undefined, columnGap: '6mm' }}>
            {choices.map(c => (
                <div key={c.label} style={{ fontSize: '9.3pt', lineHeight: 1.5, color: INK, display: 'flex', gap: '2mm' }}>
                    <span style={{ flexShrink: 0, fontWeight: 700 }}>{c.label}</span>
                    <span>{c.text}</span>
                </div>
            ))}
        </div>
    );

    const PassageBox = ({ title, body }: { title?: string; body: string }) => (
        <div style={{ border: `1px solid ${LINE}`, padding: '3mm 4mm', margin: '1.5mm 0 3mm', overflowWrap: 'anywhere' }}>
            {title && <div style={{ fontSize: '10.5pt', fontWeight: 700, fontStyle: 'italic', textAlign: 'center', marginBottom: '2mm', fontFamily: 'Georgia, serif' }}>{title}</div>}
            <div style={{ fontSize: '9.3pt', lineHeight: 1.7, whiteSpace: 'pre-line', fontFamily: 'Georgia, serif', color: INK }}>{body}</div>
        </div>
    );

    const Q2PassageBox = ({ set }: { set: Q2Set }) => {
        const parts = set.passage.split(/§(\d+)§/);
        return (
            <div style={{ border: `1px solid ${LINE}`, padding: '3mm 4mm', margin: '1.5mm 0 3mm', overflowWrap: 'anywhere' }}>
                <div style={{ fontSize: '10.5pt', fontWeight: 700, fontStyle: 'italic', textAlign: 'center', marginBottom: '2mm', fontFamily: 'Georgia, serif' }}>{set.title}</div>
                <div style={{ fontSize: '9.3pt', lineHeight: 1.9, whiteSpace: 'pre-line', fontFamily: 'Georgia, serif', color: INK }}>
                    {parts.map((p, i) => i % 2 === 1
                        ? <span key={i} style={{ display: 'inline-block', minWidth: '12mm', borderBottom: `1px solid ${INK}`, textAlign: 'center', fontFamily: 'sans-serif', fontSize: '8pt', fontWeight: 700, margin: '0 1px' }}>( {p} )</span>
                        : <span key={i}>{p}</span>)}
                </div>
            </div>
        );
    };

    const Directions = ({ text }: { text: string }) => (
        <div style={{ fontSize: '8.3pt', color: INK, border: `1px solid ${INK}`, padding: '2mm 3mm', margin: '1mm 0 3mm', breakInside: 'avoid', lineHeight: 1.55, fontStyle: 'italic' }}>
            {text}
        </div>
    );

    const DaimonTitle = ({ n, jp, en }: { n: string; jp: string; en: string }) => (
        <div style={{ marginTop: '6mm', marginBottom: '1.5mm', breakInside: 'avoid', breakAfter: 'avoid', display: 'flex', alignItems: 'baseline', gap: '3mm', borderBottom: `2px solid ${INK}`, paddingBottom: '1mm' }}>
            <span style={{ fontSize: '15pt', fontWeight: 900 }}>{n}</span>
            <span style={{ fontSize: '10pt', fontWeight: 700 }}>{jp}</span>
            <span style={{ fontSize: '8pt', color: SUB }}>{en}</span>
        </div>
    );

    const SectionBanner = ({ title, sub }: { title: string; sub: string }) => (
        <div style={{ background: INK, color: '#fff', padding: '2.5mm 4mm', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2mm', breakAfter: 'avoid' }}>
            <span style={{ fontSize: '13pt', fontWeight: 900, letterSpacing: '2px' }}>{title}</span>
            <span style={{ fontSize: '8.5pt' }}>{sub}</span>
        </div>
    );

    // 記述解答欄(罫線)
    const RuledBox = ({ lines }: { lines: number }) => (
        <div style={{ border: `1px solid ${INK}`, padding: '3mm 4mm', margin: '2mm 0' }}>
            {Array.from({ length: lines }, (_, i) => (
                <div key={i} style={{ borderBottom: `1px solid #bbb`, height: '7mm' }} />
            ))}
        </div>
    );

    return (
        <div style={{ background: '#E9E7E0', minHeight: '100vh', padding: '16px 8px 60px' }}>
            <style>{`
                @page { size: A4 portrait; margin: 12mm 10mm 15mm; }
                @page :right { margin-left: 15mm; margin-right: 9mm; }
                @page :left  { margin-left: 9mm;  margin-right: 15mm; }
                @media print {
                    html, body { background: #fff !important; }
                    .no-print { display: none !important; }
                    .pbook { width: auto !important; box-shadow: none !important; margin: 0 !important; padding: 0 !important; }
                    .pagebreak { break-before: page; }
                    .goon-fixed { display: block !important; }
                }
                .pbook { -webkit-print-color-adjust: exact; print-color-adjust: exact; overflow-wrap: break-word; }
                .cols2 { column-count: 2; column-gap: 8mm; }
                .goon-fixed {
                    display: none; position: fixed; bottom: 0; right: 0;
                    font-size: 8pt; font-weight: 800; font-style: italic; letter-spacing: 0.5px;
                    border-top: 2px solid #111; padding: 0.8mm 0 0 6mm; background: #fff;
                }
            `}</style>

            <div className="goon-fixed">GO ON TO THE NEXT PAGE <span style={{ fontStyle: 'normal' }}>▶▶</span></div>

            {/* toolbar */}
            <div className="no-print" style={{ maxWidth: '210mm', margin: '0 auto 12px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <a href="/english/eiken1-mock" style={{ textDecoration: 'none', color: '#444', fontSize: '13px', fontWeight: 700 }}>← 模試(画面版)に戻る</a>
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#444', fontWeight: 700, cursor: 'pointer' }}>
                        <input type="checkbox" checked={includeModels} onChange={e => setIncludeModels(e.target.checked)} />
                        模範解答/台本を印刷
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#444', fontWeight: 700, cursor: 'pointer' }}>
                        <input type="checkbox" checked={showAnswers} onChange={e => setShowAnswers(e.target.checked)} />
                        選択式の解答を問題面に印字
                    </label>
                    <button onClick={() => window.print()} style={{ padding: '10px 22px', borderRadius: '8px', border: 'none', background: INK, color: '#fff', fontSize: '14px', fontWeight: 800, cursor: 'pointer' }}>印刷 / PDF保存</button>
                </div>
            </div>
            <div className="no-print" style={{ maxWidth: '210mm', margin: '0 auto 12px', fontSize: '11px', color: '#666', lineHeight: 1.7 }}>
                A4縦の本番冊子レイアウト。印刷ダイアログ: 「背景のグラフィック」オン / 余白「既定」/ 両面印刷は<b>「長辺とじ」</b>。
            </div>

            {/* ===== BOOKLET ===== */}
            <div className="pbook" style={{ width: '210mm', margin: '0 auto', background: '#fff', boxShadow: '0 6px 30px rgba(0,0,0,0.18)', padding: '11mm', boxSizing: 'border-box', fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif', color: INK }}>

                {/* COVER */}
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '235mm' }}>
                    <div style={{ border: `2px solid ${INK}`, padding: '8mm', marginTop: '18mm' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: '30pt', fontWeight: 900, letterSpacing: '2px' }}>GRADEPASS</div>
                            <div style={{ fontSize: '13pt', fontWeight: 800, marginTop: '3mm' }}>実用英語技能検定 1級 一次 形式 フル模試</div>
                            <div style={{ fontSize: '10pt', color: SUB, marginTop: '1mm' }}>Test 01</div>
                        </div>
                        <div style={{ borderTop: `1px solid ${INK}`, marginTop: '6mm', paddingTop: '5mm', fontSize: '9pt', lineHeight: 1.8 }}>
                            <b>試験の構成</b><br />
                            筆記: 大問1 短文語彙(22) / 大問2 長文空所補充(6) / 大問3 長文内容一致(7) /
                            大問4 英語要約(記述) / 大問5 英作文(記述)。続いてリスニング(会話・文・Real-Life・インタビュー)。
                            選択式の解答は別紙の解答欄に記入し、要約・英作文は所定の欄に記述してください。
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12mm', marginTop: '12mm', fontSize: '10pt' }}>
                        <span>氏名 ________________________</span><span>日付 ______________</span>
                    </div>
                    <div style={{ marginTop: 'auto', fontSize: '7pt', lineHeight: 1.6, color: SOFT, borderTop: '1px solid #ccc', paddingTop: '2mm' }}>
                        非公式・自主制作のオリジナル模試。実用英語技能検定(英検)を実施する公益財団法人 日本英語検定協会 / 株式会社 日本英語検定協会(STEP) とは一切関係ありません。問題・本文・お題・解答例はすべてオリジナルで、実際の試験問題の転載ではありません。
                    </div>
                </div>

                {/* ===== 筆記 ===== */}
                <div className="pagebreak" />
                <SectionBanner title="筆記 (READING &amp; WRITING)" sub="大問 1 - 5" />

                {/* 大問1 */}
                <DaimonTitle n="1" jp="短文の語句空所補充" en="No. 1-22" />
                <Directions text="To complete each item, choose the best word or phrase from among the four choices. Then, on your answer sheet, mark your answer." />
                <div className="cols2">
                    {t.q1.map(q => (
                        <div key={q.no} style={{ breakInside: 'avoid', marginBottom: '4mm' }}>
                            <div style={{ fontSize: '9.5pt', lineHeight: 1.45, whiteSpace: 'pre-line' }}><b>({q.no})</b>&nbsp;{q.sentence}<Ans a={q.answer} /></div>
                            <Choices choices={q.choices} inline />
                        </div>
                    ))}
                </div>

                {/* 大問2 */}
                <div className="pagebreak" />
                <DaimonTitle n="2" jp="長文の語句空所補充" en="No. 23-28" />
                <Directions text="Read each passage and choose the best word or phrase from among the four choices for each blank. Then, on your answer sheet, mark your answer." />
                {t.q2.map(set => (
                    <div key={set.no} style={{ marginTop: '3mm' }}>
                        <Q2PassageBox set={set} />
                        <div className="cols2">
                            {set.blanks.map(b => (
                                <div key={b.no} style={{ breakInside: 'avoid', marginBottom: '3.5mm' }}>
                                    <div style={{ fontSize: '9.5pt' }}><b>({b.no})</b><Ans a={b.answer} /></div>
                                    <Choices choices={b.choices} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* 大問3 */}
                <div className="pagebreak" />
                <DaimonTitle n="3" jp="長文の内容一致選択" en="No. 29-35" />
                <Directions text="Read each passage and choose the best answer from among the four choices for each question. Then, on your answer sheet, mark your answer." />
                {t.q3.map(set => (
                    <div key={set.no} style={{ marginTop: '3mm' }}>
                        <PassageBox title={set.title} body={set.passage} />
                        {set.questions.map(q => (
                            <div key={q.no} style={{ breakInside: 'avoid', marginBottom: '4mm' }}>
                                <div style={{ fontSize: '9.5pt', lineHeight: 1.45 }}><b>({q.no})</b>&nbsp;{q.question}<Ans a={q.answer} /></div>
                                <Choices choices={q.choices} />
                            </div>
                        ))}
                    </div>
                ))}

                {/* 大問4 要約 */}
                <div className="pagebreak" />
                <DaimonTitle n="4" jp="英語要約" en="English Summary" />
                <div style={{ fontSize: '8.5pt', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '2mm' }}>
                    {t.q4.instructions.map((s, i) => <div key={i}>・ {s}</div>)}
                </div>
                {t.q4.articleTitle && <div style={{ fontSize: '11pt', fontWeight: 700, fontStyle: 'italic', textAlign: 'center', margin: '2mm 0' }}>{t.q4.articleTitle}</div>}
                <PassageBox body={t.q4.article} />
                <RuledBox lines={7} />

                {/* 大問5 英作文 */}
                <div className="pagebreak" />
                <DaimonTitle n="5" jp="英作文" en="English Composition" />
                <div style={{ fontSize: '8.5pt', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '2mm' }}>
                    {t.q5.instructions.map((s, i) => <div key={i}>・ {s}</div>)}
                </div>
                <div style={{ border: `1px solid ${INK}`, padding: '3mm 4mm', margin: '2mm 0' }}>
                    <div style={{ fontSize: '9pt', fontWeight: 800, letterSpacing: '1px', marginBottom: '1mm' }}>TOPIC</div>
                    <div style={{ fontSize: '10.5pt', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>{t.q5.topic}</div>
                    <div style={{ fontSize: '8.5pt', fontWeight: 800, marginTop: '2mm' }}>POINTS: <span style={{ fontWeight: 400 }}>{t.q5.points.join('　・　')}</span></div>
                </div>
                <RuledBox lines={14} />

                {/* ===== リスニング ===== */}
                <div className="pagebreak" />
                <SectionBanner title="リスニング (LISTENING)" sub="Part 1 - 4" />
                <div style={{ fontSize: '8.5pt', lineHeight: 1.6, marginBottom: '2mm' }}>
                    音声は画面版(GRADEPASS)の「読み上げ」機能を使用してください。台本は巻末に収録。設問と選択肢を読み、解答をマークします。
                </div>

                <DaimonTitle n="Part 1" jp="会話の内容一致選択" en={`No. ${t.listening.part1[0]?.question.no ?? ''}-`} />
                {t.listening.part1.map(s => (
                    <div key={s.no} style={{ breakInside: 'avoid', marginBottom: '4mm' }}>
                        <div style={{ fontSize: '9.5pt', lineHeight: 1.45 }}><b>No. {s.question.no}</b>&nbsp;{s.question.question}<Ans a={s.question.answer} /></div>
                        <Choices choices={s.question.choices} />
                    </div>
                ))}

                <DaimonTitle n="Part 2" jp="文の内容一致選択" en="" />
                {t.listening.part2.map(s => (
                    <div key={s.no} style={{ marginBottom: '3mm' }}>
                        <div style={{ fontSize: '8.5pt', fontWeight: 700, color: SUB }}>{s.title}</div>
                        {s.questions.map(q => (
                            <div key={q.no} style={{ breakInside: 'avoid', marginBottom: '3mm' }}>
                                <div style={{ fontSize: '9.5pt', lineHeight: 1.45 }}><b>No. {q.no}</b>&nbsp;{q.question}<Ans a={q.answer} /></div>
                                <Choices choices={q.choices} />
                            </div>
                        ))}
                    </div>
                ))}

                <DaimonTitle n="Part 3" jp="Real-Life 形式の内容一致選択" en="" />
                {t.listening.part3.map(s => (
                    <div key={s.no} style={{ breakInside: 'avoid', marginBottom: '4mm' }}>
                        <div style={{ border: `1px solid ${INK}`, padding: '2mm 3mm', marginBottom: '1.5mm' }}>
                            <div style={{ fontSize: '8.5pt', lineHeight: 1.5, fontFamily: 'Georgia, serif' }}>{s.situation}</div>
                            <div style={{ fontSize: '9pt', fontWeight: 700, marginTop: '1mm' }}>{s.question}</div>
                        </div>
                        <div style={{ fontSize: '9.5pt' }}><b>No. {s.no}</b><Ans a={s.answer} /></div>
                        <Choices choices={s.choices} />
                    </div>
                ))}

                <DaimonTitle n="Part 4" jp="インタビューの内容一致選択" en="" />
                {t.listening.part4.map(s => (
                    <div key={s.no} style={{ marginBottom: '3mm' }}>
                        <div style={{ fontSize: '8.5pt', fontWeight: 700, color: SUB }}>{s.title}</div>
                        {s.questions.map(q => (
                            <div key={q.no} style={{ breakInside: 'avoid', marginBottom: '3mm' }}>
                                <div style={{ fontSize: '9.5pt', lineHeight: 1.45 }}><b>No. {q.no}</b>&nbsp;{q.question}<Ans a={q.answer} /></div>
                                <Choices choices={q.choices} />
                            </div>
                        ))}
                    </div>
                ))}

                {/* Stop */}
                <div style={{ marginTop: '6mm', textAlign: 'center', fontWeight: 800, fontSize: '10pt', border: `2px solid ${INK}`, padding: '3mm 4mm', breakInside: 'avoid' }}>
                    以上で問題は終わりです。 (This is the end of the test.)
                </div>

                {/* ===== ANSWER KEY ===== */}
                <div className="pagebreak" />
                <SectionBanner title="ANSWER KEY" sub="解答一覧 (選択式)" />
                <div className="cols2" style={{ columnCount: 6 }}>
                    {t.answerKey.map(k => (
                        <div key={k.no} style={{ display: 'flex', justifyContent: 'space-between', breakInside: 'avoid', fontSize: '8.5pt', borderBottom: '1px dotted #ccc', padding: '0.6mm 2mm' }}>
                            <span style={{ color: SUB }}>{k.no}</span><b>{k.answer}</b>
                        </div>
                    ))}
                </div>

                {includeModels && (
                    <>
                        {/* MODEL ANSWERS */}
                        <div className="pagebreak" />
                        <SectionBanner title="MODEL ANSWERS" sub="記述 模範解答" />
                        <div style={{ fontSize: '9.5pt', fontWeight: 800, color: GREEN, margin: '2mm 0 1mm' }}>大問4 英語要約 ({t.q4.modelWordCount}語)</div>
                        <div style={{ fontSize: '9pt', lineHeight: 1.7, fontFamily: 'Georgia, serif', border: `1px solid #ccc`, padding: '3mm 4mm', whiteSpace: 'pre-line' }}>{t.q4.modelSummary}</div>
                        {t.q4.scoringNotes.length > 0 && <ul style={{ fontSize: '8pt', lineHeight: 1.6, color: SUB, marginTop: '1.5mm' }}>{t.q4.scoringNotes.map((n, i) => <li key={i}>{n}</li>)}</ul>}

                        <div style={{ fontSize: '9.5pt', fontWeight: 800, color: GREEN, margin: '4mm 0 1mm' }}>大問5 英作文 ({t.q5.modelWordCount}語)</div>
                        <div style={{ fontSize: '9pt', lineHeight: 1.7, fontFamily: 'Georgia, serif', border: `1px solid #ccc`, padding: '3mm 4mm', whiteSpace: 'pre-line' }}>{t.q5.modelEssay}</div>
                        {t.q5.scoringNotes.length > 0 && <ul style={{ fontSize: '8pt', lineHeight: 1.6, color: SUB, marginTop: '1.5mm' }}>{t.q5.scoringNotes.map((n, i) => <li key={i}>{n}</li>)}</ul>}

                        {/* SCRIPTS */}
                        <div className="pagebreak" />
                        <SectionBanner title="LISTENING SCRIPTS" sub="リスニング台本" />
                        <ScriptSection title="Part 1 ・ 会話" items={t.listening.part1.map(s => ({ h: `No. ${s.question.no}`, b: s.transcript }))} />
                        <ScriptSection title="Part 2 ・ 文" items={t.listening.part2.map(s => ({ h: s.title, b: s.transcript }))} />
                        <ScriptSection title="Part 3 ・ Real-Life" items={t.listening.part3.map(s => ({ h: `No. ${s.no}`, b: s.transcript }))} />
                        <ScriptSection title="Part 4 ・ インタビュー" items={t.listening.part4.map(s => ({ h: s.title, b: s.transcript }))} />
                    </>
                )}

                <div style={{ marginTop: '5mm', borderTop: '1px solid #ccc', paddingTop: '2mm', fontSize: '7pt', lineHeight: 1.6, color: SOFT }}>
                    非公式・自主制作のオリジナル模試。実用英語技能検定(英検)を実施する公益財団法人 日本英語検定協会 / 株式会社 日本英語検定協会(STEP) とは一切関係ありません。問題・本文・お題・解答例はすべてオリジナルで、実際の試験問題の転載ではありません。
                </div>
            </div>
        </div>
    );
}

function ScriptSection({ title, items }: { title: string; items: { h: string; b: string }[] }) {
    return (
        <div style={{ marginBottom: '3mm' }}>
            <div style={{ fontSize: '9pt', fontWeight: 800, color: GREEN, margin: '2mm 0 1mm' }}>{title}</div>
            {items.map((it, i) => (
                <div key={i} style={{ breakInside: 'avoid', marginBottom: '1.5mm' }}>
                    <span style={{ fontSize: '7.5pt', fontWeight: 700, color: '#777' }}>{it.h} </span>
                    <span style={{ fontSize: '8pt', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{it.b}</span>
                </div>
            ))}
        </div>
    );
}
