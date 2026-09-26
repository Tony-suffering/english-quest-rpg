'use client';

/**
 * DMM英会話 無料公開 — 1レッスン
 *
 * 上から: 題 → 音源(note) → 方法 → 物語 → 原稿(1行ずつの解説つき) → 持ち帰る英語。
 * 原稿は「原稿だけ」と「解説つき」を切り替えられる。原稿だけで一度通して読み、
 * それから解説つきで自分ならどう言うかを確かめる、という読み方を想定している。
 */

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getOpenLesson, OPEN_SERIES, type OpenLine } from '@/data/english/dmm-open';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const SUB = '#57534E';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';
const SERIF = 'Georgia, "Times New Roman", serif';

function Kicker({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ fontSize: '10px', letterSpacing: '0.22em', color: FAINT, fontWeight: 800, marginBottom: '6px' }}>
            {children}
        </div>
    );
}

function H2({ children }: { children: React.ReactNode }) {
    return <h2 style={{ margin: '0 0 14px', fontSize: '20px', fontWeight: 900, color: INK, lineHeight: 1.5 }}>{children}</h2>;
}

function LineRow({ l, withNotes }: { l: OpenLine; withNotes: boolean }) {
    const me = l.role === 'student';
    const hasNotes = withNotes && (l.fix || l.native || l.note || l.pick || l.know);
    return (
        <div style={{
            padding: '12px 0', borderTop: `1px solid ${LINE}`,
            background: withNotes && l.star ? 'linear-gradient(90deg, #FFFBEB, rgba(255,251,235,0))' : 'transparent',
        }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <span style={{
                    flexShrink: 0, width: '34px', fontSize: '10px', fontWeight: 800, letterSpacing: '0.08em',
                    color: me ? DEEPGOLD : DEEPGREEN, paddingTop: '3px',
                }}>{me ? '俺' : '講師'}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: SERIF, fontSize: '15px', lineHeight: 1.7, color: INK }}>{l.original}</div>
                    {hasNotes && (
                        <div style={{ marginTop: '8px', display: 'grid', gap: '6px' }}>
                            {l.fix && (
                                <div style={{ fontSize: '13px', lineHeight: 1.6 }}>
                                    <span style={{ fontSize: '10px', fontWeight: 800, color: DEEPGOLD, marginRight: '6px' }}>直すと</span>
                                    <span style={{ fontFamily: SERIF, color: INK }}>{l.fix}</span>
                                </div>
                            )}
                            {l.native && (
                                <div style={{ fontSize: '13px', lineHeight: 1.6 }}>
                                    <span style={{ fontSize: '10px', fontWeight: 800, color: DEEPGREEN, marginRight: '6px' }}>ネイティブなら</span>
                                    <span style={{ fontFamily: SERIF, color: INK }}>{l.native}</span>
                                    {l.chunk && (
                                        <span style={{ marginLeft: '6px', fontSize: '11px', color: DEEPGREEN, border: `1px solid ${GREEN}66`, borderRadius: '4px', padding: '0 5px' }}>{l.chunk}</span>
                                    )}
                                </div>
                            )}
                            {l.pick && (
                                <div style={{ fontSize: '13px', lineHeight: 1.6 }}>
                                    <span style={{ fontSize: '10px', fontWeight: 800, color: DEEPGREEN, marginRight: '6px' }}>盗む</span>
                                    <span style={{ fontFamily: SERIF, fontWeight: 700, color: INK }}>{l.pick}</span>
                                    {l.pickNote && <div style={{ fontSize: '12.5px', color: SUB, marginTop: '2px' }}>{l.pickNote}</div>}
                                </div>
                            )}
                            {l.note && <div style={{ fontSize: '13px', lineHeight: 1.85, color: SUB }}>{l.note}</div>}
                            {l.know && (
                                <div style={{ fontSize: '12.5px', lineHeight: 1.8, color: SUB, background: '#FAFAF9', borderRadius: '8px', padding: '6px 10px' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 800, color: FAINT, marginRight: '6px' }}>豆知識</span>{l.know}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function DmmOpenLessonPage() {
    const params = useParams<{ slug: string }>();
    const lesson = getOpenLesson(params.slug);
    const [withNotes, setWithNotes] = useState(true);

    if (!lesson) {
        return (
            <div style={{ minHeight: '100vh', background: '#FAFAF9', padding: '60px 16px', textAlign: 'center', color: SUB }}>
                このレッスンは見つかりませんでした。<Link href="/english/dmm-open" style={{ color: DEEPGOLD }}>一覧へ</Link>
            </div>
        );
    }

    const myLines = lesson.lines.filter((l) => l.role === 'student').length;
    const fixed = lesson.lines.filter((l) => l.fix).length;

    const toggle = (on: boolean, label: string) => (
        <button onClick={() => setWithNotes(on)} style={{
            border: `1px solid ${withNotes === on ? INK : LINE}`, background: withNotes === on ? INK : '#fff',
            color: withNotes === on ? '#fff' : SUB, borderRadius: '999px', padding: '6px 14px',
            fontSize: '12px', fontWeight: 700, cursor: 'pointer',
        }}>{label}</button>
    );

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 16px 80px' }}>
                {/* 題 */}
                <Kicker>DMM英会話 · 無料公開 · {lesson.date.replace(/-/g, '.')} · {lesson.minutes}分</Kicker>
                <h1 style={{ margin: '0 0 10px', fontSize: '24px', fontWeight: 900, color: INK, lineHeight: 1.5 }}>{OPEN_SERIES.title}</h1>
                <div style={{ fontSize: '13px', color: SUB, marginBottom: '22px', lineHeight: 1.7 }}>{OPEN_SERIES.subtitle}</div>

                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderTop: `3px solid ${GOLD}`, borderRadius: '14px', padding: '20px 18px', marginBottom: '28px' }}>
                    <div style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 700, color: INK, lineHeight: 1.5, marginBottom: '10px' }}>{lesson.title}</div>
                    <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.95, color: SUB }}>{lesson.catchcopy}</p>
                    {lesson.noteUrl && (
                        <a href={lesson.noteUrl} target="_blank" rel="noopener noreferrer" style={{
                            display: 'inline-block', marginTop: '14px', background: INK, color: '#fff', textDecoration: 'none',
                            borderRadius: '10px', padding: '10px 16px', fontSize: '13px', fontWeight: 700,
                        }}>音源を聴く(note)</a>
                    )}
                </div>

                {/* 方法 */}
                <section style={{ marginBottom: '34px' }}>
                    <Kicker>THE ONLY WAY</Kicker>
                    <H2>方法は1つしかない</H2>
                    {OPEN_SERIES.method.map((p, i) => (
                        <p key={i} style={{ margin: '0 0 12px', fontSize: '14.5px', lineHeight: 2, color: INK }}>{p}</p>
                    ))}
                </section>

                {/* 物語 */}
                <section style={{ marginBottom: '34px' }}>
                    <Kicker>THE STORY</Kicker>
                    <H2>この夜の25分</H2>
                    {lesson.story.map((s, i) => (
                        <div key={i} style={{ marginBottom: '22px' }}>
                            <h3 style={{ margin: '0 0 10px', fontSize: '16px', fontWeight: 800, color: INK, borderLeft: `3px solid ${GOLD}`, paddingLeft: '10px', lineHeight: 1.5 }}>{s.heading}</h3>
                            {s.paragraphs.map((p, j) => {
                                // 英文だけの段落は、声に出した1文として浮かせる
                                const quote = /^[A-Za-z"'.\s,?!…]+$/.test(p);
                                return quote ? (
                                    <p key={j} style={{ margin: '0 0 12px', fontFamily: SERIF, fontSize: '18px', fontStyle: 'italic', color: DEEPGOLD, textAlign: 'center' }}>{p}</p>
                                ) : (
                                    <p key={j} style={{ margin: '0 0 12px', fontSize: '14.5px', lineHeight: 2, color: INK }}>{p}</p>
                                );
                            })}
                        </div>
                    ))}
                </section>

                {/* 原稿 */}
                <section style={{ marginBottom: '34px' }}>
                    <Kicker>THE SCRIPT</Kicker>
                    <H2>原稿 — 25分を1行ずつ</H2>
                    <p style={{ margin: '0 0 12px', fontSize: '13.5px', lineHeight: 1.9, color: SUB }}>
                        書き起こしは言いよどみも崩れもそのまま。俺の発言 {myLines} 行のうち {fixed} 行に直しを付けた。
                        「直すと」は俺の単語のまま文法だけ直した形、「ネイティブなら」は俺が持っていなかった言い方、「盗む」は講師の言葉から持ち帰る形。
                        色の付いた行がこの夜の山場。
                    </p>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                        {toggle(true, '解説つき')}
                        {toggle(false, '原稿だけ')}
                    </div>
                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '4px 16px' }}>
                        {lesson.lines.map((l, i) => <LineRow key={i} l={l} withNotes={withNotes} />)}
                    </div>
                </section>

                {/* 持ち帰る英語 */}
                <section style={{ marginBottom: '34px' }}>
                    <Kicker>TAKE HOME</Kicker>
                    <H2>講師が置いていった英語</H2>
                    <div style={{ display: 'grid', gap: '10px' }}>
                        {lesson.takeaways.map((t, i) => (
                            <div key={i} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '12px 14px' }}>
                                <div style={{ fontFamily: SERIF, fontSize: '16px', fontWeight: 700, color: INK }}>{t.en}</div>
                                <div style={{ fontSize: '13px', color: SUB, marginTop: '3px', lineHeight: 1.7 }}>{t.ja}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <div style={{ textAlign: 'center', fontSize: '12px', color: FAINT }}>
                    <Link href="/english/dmm-open" style={{ color: DEEPGOLD, textDecoration: 'none', fontWeight: 700 }}>公開したレッスンの一覧</Link>
                </div>
            </div>
        </div>
    );
}
