'use client';

// 「今夜、25分だけ喋ってみる」— どのレベルからでも入れる入口。
// 一番のコンセプトは英会話の楽しさ。文法(中1教室)は主役にせず、下に補足として置く。
// 上級を消さずに初級・中級を足し、レベルを自己申告で選ばせる。
// 実例はすべて番組内の実発言。ライト基調・絵文字なし。

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
    BASICS_META, LEVEL_GUIDES, LEVEL_PICKER_NOTE, BASIC_LESSONS, type TalkLevel,
} from '@/data/english/tonio-basics';
import { getCurriculumStats } from '@/data/english/tonio-curriculum';

const PAPER = '#F4F0E6';
const CARD = '#FFFFFF';
const INK = '#17130F';
const MUTED = '#6E6558';
const RED = '#C0392B';
const GOLD = '#B8941E';
const GOLD_HI = '#E7C14B';
const GREEN = '#2E9E6B';
const LINE = '#E5DECF';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";
const SANS = "'Helvetica Neue', Arial, 'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";

const LEVEL_COLOR: Record<TalkLevel, string> = { basic: GREEN, mid: '#3E7AB8', hard: GOLD };

function SectionH({ children }: { children: React.ReactNode }) {
    return <h2 style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 900, color: INK, margin: '0 0 4px' }}>{children}</h2>;
}
function Card({ children }: { children: React.ReactNode }) {
    return <div style={{ backgroundColor: CARD, border: `1px solid ${LINE}`, borderRadius: '14px', padding: 'clamp(18px, 4vw, 28px)', marginTop: '16px' }}>{children}</div>;
}

// ============ フレーズ1件(トレーニング登録つき) ============
function Starter({ en, ja, when, color }: { en: string; ja: string; when: string; color: string }) {
    const [state, setState] = useState<'idle' | 'saving' | 'done' | 'dup'>('idle');
    const add = async () => {
        if (state !== 'idle') return;
        setState('saving');
        try {
            const today = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' });
            const r = await fetch('/api/phrases', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english: en, japanese: ja, date: today }),
            });
            const j = await r.json();
            const p = j.phrase || j;
            setState(p?.duplicate ? 'dup' : 'done');
        } catch { setState('idle'); }
    };
    return (
        <div style={{ border: `1px solid ${LINE}`, borderLeft: `4px solid ${color}`, borderRadius: '10px', padding: '13px 15px', backgroundColor: PAPER }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: SERIF, fontSize: '16.5px', fontWeight: 700, color: INK, lineHeight: 1.5 }}>{en}</div>
                    <div style={{ fontSize: '12.5px', color: MUTED, marginTop: '3px' }}>{ja}</div>
                </div>
                <button onClick={add} disabled={state === 'saving'}
                    style={{
                        cursor: state === 'idle' ? 'pointer' : 'default', whiteSpace: 'nowrap', flexShrink: 0,
                        backgroundColor: state === 'done' ? GREEN : state === 'dup' ? '#B7AE9E' : '#fff',
                        color: state === 'done' || state === 'dup' ? '#fff' : INK,
                        border: `1px solid ${state === 'done' ? GREEN : LINE}`, borderRadius: '7px',
                        padding: '5px 11px', fontSize: '11px', fontWeight: 800,
                    }}>
                    {state === 'saving' ? '登録中' : state === 'done' ? '登録した' : state === 'dup' ? '既出' : '+ 覚える'}
                </button>
            </div>
            <div style={{ fontSize: '11.5px', color: '#5a5a5a', marginTop: '8px', lineHeight: 1.7, borderTop: `1px solid ${LINE}`, paddingTop: '7px' }}>
                {when}
            </div>
        </div>
    );
}

export default function StartPage() {
    const stats = useMemo(() => getCurriculumStats(), []);
    const [level, setLevel] = useState<TalkLevel>('basic');
    const [openLesson, setOpenLesson] = useState<string | null>(null);
    const guide = LEVEL_GUIDES.find((g) => g.level === level)!;
    const color = LEVEL_COLOR[level];

    return (
        <div style={{ minHeight: '100vh', backgroundColor: PAPER, fontFamily: SANS, color: INK, padding: '0 0 90px' }}>
            {/* ツールバー */}
            <div style={{ backgroundColor: INK, color: '#fff', padding: '10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Link href="/english/tonight" style={{ color: GOLD_HI, textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>← 番組へ</Link>
                    <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '2px' }}>はじめる</span>
                </div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>初級 / 中級 / 上級</span>
            </div>

            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 14px' }}>
                {/* ===== 主題: 楽しさ ===== */}
                <div style={{ backgroundColor: INK, color: '#fff', borderRadius: '0 0 16px 16px', padding: 'clamp(26px, 6vw, 44px) clamp(20px, 5vw, 38px)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: GOLD_HI }}>この番組がやっていること</div>
                    <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 7.5vw, 46px)', fontWeight: 900, lineHeight: 1.2, margin: '10px 0 0' }}>
                        {BASICS_META.title}
                    </h1>
                    <p style={{ fontFamily: SERIF, fontSize: 'clamp(15px, 3.2vw, 18px)', fontWeight: 700, color: GOLD_HI, margin: '12px 0 0', lineHeight: 1.75 }}>
                        {BASICS_META.hook}
                    </p>
                    <p style={{ fontSize: '13.5px', lineHeight: 2, color: 'rgba(255,255,255,0.86)', margin: '14px 0 0' }}>
                        {BASICS_META.pitch}
                    </p>
                    <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '13px', fontSize: '12.5px', color: GOLD_HI, fontWeight: 700 }}>
                        {BASICS_META.promise}
                    </div>
                </div>

                {/* ===== レベル選択 ===== */}
                <Card>
                    <SectionH>どこから始めてもいい</SectionH>
                    <p style={{ fontSize: '12.5px', color: MUTED, margin: '4px 0 12px', lineHeight: 1.8 }}>{LEVEL_PICKER_NOTE}</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {LEVEL_GUIDES.map((g) => (
                            <button key={g.level} onClick={() => setLevel(g.level)}
                                style={{
                                    cursor: 'pointer', flex: '1 1 150px', textAlign: 'left',
                                    borderRadius: '11px', padding: '13px 15px',
                                    backgroundColor: level === g.level ? LEVEL_COLOR[g.level] : '#fff',
                                    color: level === g.level ? '#fff' : INK,
                                    border: `2px solid ${level === g.level ? LEVEL_COLOR[g.level] : LINE}`,
                                }}>
                                <div style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 900 }}>{g.label}</div>
                                <div style={{ fontSize: '11px', marginTop: '4px', lineHeight: 1.6, color: level === g.level ? 'rgba(255,255,255,0.9)' : MUTED }}>
                                    {g.who}
                                </div>
                            </button>
                        ))}
                    </div>
                </Card>

                {/* ===== 選んだレベルの中身 ===== */}
                <Card>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '2px', color: '#fff', backgroundColor: color, borderRadius: '999px', padding: '3px 12px' }}>{guide.label}</span>
                        <SectionH>今夜のゴール</SectionH>
                    </div>
                    <p style={{ fontFamily: SERIF, fontSize: '15.5px', fontWeight: 700, color: INK, margin: '8px 0 0', lineHeight: 1.75 }}>{guide.goal}</p>

                    <div style={{ backgroundColor: '#F0F7F1', border: '1px solid #CDE3D2', borderLeft: `4px solid ${GREEN}`, borderRadius: '9px', padding: '13px 15px', marginTop: '14px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '2px', color: '#166534' }}>このレベルの楽しさ</div>
                        <p style={{ fontSize: '13px', color: INK, margin: '5px 0 0', lineHeight: 1.9 }}>{guide.fun}</p>
                    </div>

                    <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: RED, margin: '20px 0 10px' }}>今夜そのまま使う3フレーズ</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {guide.starters.map((s) => <Starter key={s.en} {...s} color={color} />)}
                    </div>

                    {/* 実際に通じた証拠 */}
                    <Link href={`/english/tonight/league?night=${guide.proof.night}`} style={{ textDecoration: 'none' }}>
                        <div style={{ backgroundColor: '#FBF6E7', border: '1px solid #E8D9A8', borderRadius: '9px', padding: '13px 15px', marginTop: '16px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '2px', color: GOLD }}>実際に通じた例 — 第{guide.proof.night}夜</div>
                            <div style={{ fontFamily: SERIF, fontSize: '15px', fontWeight: 700, color: INK, marginTop: '5px', lineHeight: 1.55 }}>&ldquo;{guide.proof.en}&rdquo;</div>
                            <div style={{ fontSize: '12px', color: MUTED, marginTop: '5px', lineHeight: 1.75 }}>{guide.proof.what}</div>
                        </div>
                    </Link>

                    <div style={{ fontSize: '12px', color: MUTED, marginTop: '12px', lineHeight: 1.8, borderTop: `1px solid ${LINE}`, paddingTop: '10px' }}>
                        つまずきやすい所 — {guide.watchOut}
                    </div>
                </Card>

                {/* ===== 補足: 中1教室(笑いの入口) ===== */}
                <Card>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                        <SectionH>おまけ — 中1教室</SectionH>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: GOLD }}>{BASICS_META.grammarHook}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: INK, margin: '6px 0 14px', lineHeight: 1.9 }}>{BASICS_META.grammarPitch}</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        {BASIC_LESSONS.map((l) => {
                            const open = openLesson === l.id;
                            return (
                                <div key={l.id} style={{ border: `1px solid ${LINE}`, borderRadius: '10px', overflow: 'hidden' }}>
                                    <button onClick={() => setOpenLesson(open ? null : l.id)}
                                        style={{ width: '100%', textAlign: 'left', cursor: 'pointer', backgroundColor: open ? '#FAF7F1' : '#fff', border: 'none', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ fontFamily: SERIF, fontSize: '16px', fontWeight: 800, color: INK }}>{l.nickname}</span>
                                        <span style={{ fontSize: '11px', color: MUTED }}>{open ? '閉じる' : '見る'}</span>
                                    </button>
                                    {open && (
                                        <div style={{ padding: '0 14px 14px' }}>
                                            <p style={{ fontSize: '12.5px', color: INK, lineHeight: 1.9, margin: '0 0 8px' }}>{l.plain}</p>
                                            <div style={{ backgroundColor: '#FBF1F0', border: '1px solid #EBD3D0', borderRadius: '8px', padding: '10px 13px', marginBottom: '10px' }}>
                                                <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1.5px', color: RED }}>なぜ日本人が落とすのか</div>
                                                <p style={{ fontSize: '12.5px', color: INK, margin: '4px 0 0', lineHeight: 1.85 }}>{l.whyJp}</p>
                                            </div>
                                            <div style={{ backgroundColor: '#F0F7F1', border: '1px solid #CDE3D2', borderRadius: '8px', padding: '10px 13px' }}>
                                                <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1.5px', color: '#166534' }}>覚えるルールは1つだけ</div>
                                                <p style={{ fontSize: '12.5px', color: INK, margin: '4px 0 7px', lineHeight: 1.85 }}>{l.rule}</p>
                                                <div style={{ fontSize: '12.5px', fontFamily: SERIF }}>
                                                    <span style={{ color: RED, textDecoration: 'line-through' }}>{l.ruleExample.wrong}</span>
                                                    <span style={{ color: MUTED, margin: '0 8px' }}>→</span>
                                                    <span style={{ color: '#166534', fontWeight: 700 }}>{l.ruleExample.right}</span>
                                                </div>
                                            </div>

                                            <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1.5px', color: MUTED, margin: '14px 0 7px' }}>この番組で実際に落とした夜</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                                {l.cases.map((c, i) => (
                                                    <Link key={i} href={`/english/tonight/league?night=${c.night}`} style={{ textDecoration: 'none' }}>
                                                        <div style={{ border: `1px solid ${LINE}`, borderRadius: '8px', padding: '9px 12px', backgroundColor: PAPER }}>
                                                            <div style={{ fontSize: '10.5px', fontWeight: 700, color: GOLD }}>第{c.night}夜</div>
                                                            <div style={{ fontFamily: SERIF, fontSize: '13px', marginTop: '3px' }}>
                                                                <span style={{ color: RED }}>{c.said}</span>
                                                                <span style={{ color: MUTED, margin: '0 7px' }}>→</span>
                                                                <span style={{ color: '#166534', fontWeight: 700 }}>{c.should}</span>
                                                            </div>
                                                            <div style={{ fontSize: '11.5px', color: MUTED, marginTop: '4px', lineHeight: 1.7 }}>{c.why}</div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>

                                            <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1.5px', color: MUTED, margin: '14px 0 7px' }}>今日そのまま使える形</div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {l.useToday.map((u) => <Starter key={u.en} en={u.en} ja={u.ja} when="この形で口に出しておけば、本番で迷わない。" color={GREEN} />)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Card>

                {/* ===== 導線 ===== */}
                <div style={{ marginTop: '20px', backgroundColor: INK, color: '#fff', borderRadius: '14px', padding: 'clamp(20px, 4vw, 30px)' }}>
                    <p style={{ fontFamily: SERIF, fontSize: '15px', lineHeight: 1.9, margin: '0 0 16px', color: 'rgba(255,255,255,0.92)' }}>
                        フレーズを1つ持って、今夜25分だけ喋ってみる。通じなくても、それがこの番組の第1夜と同じ景色だ。
                    </p>
                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                        <Link href="/english/tonight" style={{ backgroundColor: GOLD, color: INK, fontWeight: 900, fontSize: '13px', padding: '10px 20px', borderRadius: '9px', textDecoration: 'none' }}>番組を読む</Link>
                        <Link href="/english/tonight/curriculum" style={{ color: GOLD_HI, fontWeight: 800, fontSize: '13px', padding: '10px 0', textDecoration: 'none' }}>教材({stats.total}表現) →</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
