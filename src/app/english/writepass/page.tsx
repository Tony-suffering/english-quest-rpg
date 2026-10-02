// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/app/english/writepass/page.tsx
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { EIKEN1_ESSAYS } from '@/data/english/write-eiken1';
import { WRITE_TOOLKIT, essayBlob, toolkitMatches } from '@/data/english/write-eiken1-toolkit';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const CREAM = '#FFFDF8';
const INK = '#1C1917';
const SUB = '#78716C';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

export default function WritePassLP() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const c = () => setIsMobile(window.innerWidth < 768);
        c(); window.addEventListener('resize', c);
        return () => window.removeEventListener('resize', c);
    }, []);

    const pad = isMobile ? '0 18px' : '0 32px';
    const sectionPad = isMobile ? '52px 0' : '88px 0';

    // 「ただのAI生成と何が違うか」の根拠を実データから計算
    const ev = useMemo(() => {
        const items = WRITE_TOOLKIT.flatMap(c => c.items);
        const vocab = WRITE_TOOLKIT.filter(c => c.kind !== 'function').reduce((n, c) => n + c.items.length, 0);
        const fns = WRITE_TOOLKIT.filter(c => c.kind === 'function').reduce((n, c) => n + c.items.length, 0);
        const blobs = EIKEN1_ESSAYS.map(e => essayBlob([e.topic, e.essay, e.tip, ...e.keyExpressions.map(k => `${k.en} ${k.note}`)]));
        const covered = items.filter(it => blobs.some(b => toolkitMatches(it, b))).length;
        return { total: items.length, vocab, fns, covered, pct: Math.round((covered / items.length) * 100) };
    }, []);

    const Cta = ({ label, sub }: { label: string; sub?: string }) => (
        <Link href="/english/write/days" style={{ textDecoration: 'none' }}>
            <div style={{
                display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
                background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#fff',
                padding: isMobile ? '16px 36px' : '18px 56px', borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(212,175,55,0.35)', cursor: 'pointer',
            }}>
                <span style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 900, letterSpacing: '1px' }}>{label}</span>
                {sub && <span style={{ fontSize: '11px', opacity: 0.92, marginTop: '3px', fontWeight: 600 }}>{sub}</span>}
            </div>
        </Link>
    );

    const Eyebrow = ({ children }: { children: React.ReactNode }) => (
        <div style={{ fontSize: '11px', fontWeight: 800, color: DEEPGOLD, letterSpacing: '3px', marginBottom: '14px', textTransform: 'uppercase' }}>{children}</div>
    );

    const H = ({ children }: { children: React.ReactNode }) => (
        <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? '24px' : '34px', fontWeight: 900, color: INK, lineHeight: 1.35, margin: 0, letterSpacing: '0.5px' }}>{children}</h2>
    );

    return (
        <div style={{ background: CREAM, minHeight: '100vh', fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif', color: INK, overflowX: 'hidden' }}>

            {/* ===================== HERO ===================== */}
            <section style={{ background: `radial-gradient(1200px 500px at 50% -10%, #FBF4DD, ${CREAM})`, padding: isMobile ? '56px 0 40px' : '96px 0 70px', textAlign: 'center' }}>
                <div style={{ maxWidth: '880px', margin: '0 auto', padding: pad }}>
                    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '10px', marginBottom: '22px' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '26px' : '32px', fontWeight: 900, color: GOLD, letterSpacing: '1px' }}>WRITE</span>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '26px' : '32px', fontWeight: 900, color: INK, letterSpacing: '1px' }}>PASS</span>
                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: INK, padding: '3px 8px', borderRadius: '5px', letterSpacing: '1px' }}>英検1級対策</span>
                    </div>
                    <h1 style={{ fontFamily: SERIF, fontSize: isMobile ? '30px' : '50px', fontWeight: 900, lineHeight: 1.3, margin: '0 0 18px', letterSpacing: '0.5px' }}>
                        英検1級の英作文は、<br /><span style={{ color: DEEPGOLD }}>「型」</span>で受かる。
                    </h1>
                    <p style={{ fontSize: isMobile ? '15px' : '18px', color: SUB, lineHeight: 1.8, maxWidth: '640px', margin: '0 auto 14px' }}>
                        模範解答を写して<strong style={{ color: INK }}>「型」</strong>を入れ、自分で書いて、<strong style={{ color: INK }}>型の表</strong>と見比べる。過去10年の頻出傾向を分析したオリジナル設問で、意見論述も要約も1日1本、30日。
                    </p>
                    <p style={{ fontSize: '13px', color: '#A8A29E', margin: '0 0 30px' }}>英検1級 ライティング（意見論述 200-240語 ＋ 英文要約 90-110語）完全攻略</p>
                    <Cta label="今日の Day 1 を始める" sub="無料・30日プログラム" />
                    <div style={{ display: 'flex', gap: isMobile ? '8px' : '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px' }}>
                        {['頻出傾向ベース', '逆の立場つき', '30日完成', '意見論述＋要約', 'A4映え答案用紙'].map(b => (
                            <span key={b} style={{ fontSize: '12px', fontWeight: 700, color: DEEPGOLD, background: '#FEF9E7', border: `1px solid ${GOLD}44`, padding: '7px 14px', borderRadius: '99px' }}>{b}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== STATS BAR ===================== */}
            <section style={{ background: INK, color: '#fff', padding: isMobile ? '28px 0' : '34px 0' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: pad, display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', gap: isMobile ? '22px 12px' : '16px' }}>
                    {[
                        { n: '30', u: '日完成' },
                        { n: '60', u: '本の模範解答' },
                        { n: '27', u: 'の頻出テーマ実戦' },
                        { n: '300+', u: '必須表現＋解説' },
                        { n: '5', u: 'デザインの答案用紙' },
                    ].map(s => (
                        <div key={s.u} style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: SERIF, fontSize: isMobile ? '30px' : '38px', fontWeight: 900, color: GOLD, lineHeight: 1 }}>{s.n}</div>
                            <div style={{ fontSize: '11px', color: '#C9C0AC', marginTop: '6px', letterSpacing: '0.5px' }}>{s.u}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===================== PROBLEM ===================== */}
            <section style={{ padding: sectionPad, background: '#fff' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: pad }}>
                    <Eyebrow>Why you get stuck</Eyebrow>
                    <H>英作文で落ちる人は、<br />実力ではなく「型」がないだけ。</H>
                    <p style={{ fontSize: '15px', color: SUB, lineHeight: 1.9, margin: '18px 0 36px', maxWidth: '640px' }}>
                        単語も文法も足りている。それでも本番で手が止まる。理由はいつも同じ、この3つだ。
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
                        {[
                            { t: '型がない', d: '序論・本論・結論をどう並べ、3つの理由をどう展開するか。設計図がないまま書き始めて、時間切れになる。' },
                            { t: 'ネタが出ない', d: '「環境問題に賛成?」と言われても、英語で根拠と具体例が浮かばない。日本語でも詰まる。' },
                            { t: '誰も直さない', d: '独学だと、自分の英作文が合格レベルか分からない。お手本と比べる機会がそもそもない。' },
                        ].map((p, i) => (
                            <div key={i} style={{ background: CREAM, border: '1px solid #EFEBDF', borderRadius: '16px', padding: '24px' }}>
                                <div style={{ fontFamily: SERIF, fontSize: '15px', fontWeight: 900, color: '#B91C1C', marginBottom: '10px' }}>0{i + 1}. {p.t}</div>
                                <p style={{ fontSize: '13px', color: SUB, lineHeight: 1.8, margin: 0 }}>{p.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== SOLUTION ===================== */}
            <section style={{ padding: sectionPad, background: `linear-gradient(180deg, #FBF4DD, ${CREAM})` }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: pad, textAlign: 'center' }}>
                    <Eyebrow>The answer</Eyebrow>
                    <H>受かる人は、毎回ゼロから考えていない。<br /><span style={{ color: DEEPGOLD }}>「型」に当てはめているだけ。</span></H>
                    <p style={{ fontSize: '15px', color: SUB, lineHeight: 1.9, margin: '20px auto 0', maxWidth: '660px' }}>
                        ライトパスは、その「型」を完成された模範解答ごと手渡す。写して型を入れ、同じお題を自分で書き、型の表と照らして直す。読むだけでは型は残らない。<strong style={{ color: INK }}>写して、書いて、型で詰める。だから本番で勝手に出てくる。</strong>
                    </p>
                </div>
            </section>

            {/* ===================== EVIDENCE / 根拠 ===================== */}
            <section style={{ padding: sectionPad, background: '#fff' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: pad }}>
                    <div style={{ textAlign: 'center', marginBottom: '44px' }}>
                        <Eyebrow>Built on real exams</Eyebrow>
                        <H>感覚ではなく、傾向が設計図。</H>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '16px' }}>
                        {[
                            { t: '2016〜2025を全分析', d: '過去10年・約30回の意見論述を分析。出題は「環境/科学技術/経済/政治/社会/教育/グローバル」の7分野に収束していた。ヤマではなく、傾向で設計している。' },
                            { t: '1日1テーマで全分野を網羅', d: '30日で7分野すべてを一巡。本番でどの分野が来ても「これ、書いたことある」に持ち込む。' },
                            { t: '2024新形式の要約にも対応', d: '新設された英文要約（約300語→90-110語）も30日分。本文の言い換え・論理の追い方・構成まで模範解答で示す。' },
                            { t: '現行フォーマットに完全準拠', d: '意見論述は200-240語・理由3つ・序論本論結論。要約は90-110語。採点観点（内容・構成・語彙・文法）を満たす書き方だけを載せる。' },
                        ].map((e, i) => (
                            <div key={i} style={{ display: 'flex', gap: '16px', background: CREAM, border: '1px solid #EFEBDF', borderRadius: '16px', padding: '22px 24px' }}>
                                <div style={{ flexShrink: 0, width: '38px', height: '38px', borderRadius: '50%', background: '#FEF9E7', border: `1px solid ${GOLD}55`, color: DEEPGOLD, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SERIF }}>{i + 1}</div>
                                <div>
                                    <div style={{ fontSize: '15px', fontWeight: 800, color: INK, marginBottom: '6px' }}>{e.t}</div>
                                    <p style={{ fontSize: '13px', color: SUB, lineHeight: 1.8, margin: 0 }}>{e.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== CURRICULUM (real data) ===================== */}
            <section style={{ padding: sectionPad, background: `linear-gradient(180deg, ${CREAM}, #FBF4DD)` }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: pad }}>
                    <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                        <Eyebrow>30 days · 1 theme a day</Eyebrow>
                        <H>1日ずつ、テーマが変わる。</H>
                        <p style={{ fontSize: '14px', color: SUB, lineHeight: 1.8, margin: '16px auto 0', maxWidth: '620px' }}>
                            Day 1-5 で「型」を解剖し、Day 6-30 は頻出テーマのオリジナル設問で実戦。意見論述30本・要約30本、すべて模範解答つき。
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? '6px' : '6px 20px', marginTop: '34px' }}>
                        {EIKEN1_ESSAYS.map(e => (
                            <div key={e.day} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '9px 14px', background: '#fff', border: '1px solid #EFEBDF', borderRadius: '10px' }}>
                                <span style={{ flexShrink: 0, fontFamily: SERIF, fontSize: '13px', fontWeight: 900, color: GOLD, width: '46px' }}>Day {e.day}</span>
                                <span style={{ flex: 1, fontSize: '12.5px', color: INK, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis' }}>{e.topic}</span>
                                <span style={{ flexShrink: 0, fontSize: '9px', fontWeight: 700, color: '#A8A29E', border: '1px solid #E7E0CE', borderRadius: '4px', padding: '2px 5px' }}>{e.exam}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== FEATURES ===================== */}
            <section style={{ padding: sectionPad, background: '#fff' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: pad }}>
                    <div style={{ textAlign: 'center', marginBottom: '44px' }}>
                        <Eyebrow>What's inside</Eyebrow>
                        <H>合格に必要なものだけ、全部。</H>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
                        {[
                            { t: '頻出テーマで実戦', d: '過去10年の傾向を分析した頻出分野のオリジナル設問。ヤマではなく、よく問われるテーマで書く。' },
                            { t: '完璧な模範解答', d: '全60本。序論→本論3→結論まで、合格答案の論理展開をそのまま示す。' },
                            { t: '作文に効く必須表現', d: 'どのテーマでも使い回せるテンプレ表現を、各日5〜6個。「なぜ使うか」まで解説。' },
                            { t: 'A4カラー答案用紙', d: '書いて、撮って、晒したくなる。5デザインから選べる印刷用答案用紙つき。' },
                            { t: '全文を型に分解', d: '模範解答の全文を「役割＋穴あきの型」に分けて表にした。自分の答案のどこで型が抜けたか、並べれば分かる。' },
                            { t: '意見論述＋要約 両対応', d: '2024新形式の要約も完備。1級ライティングの2問を、どちらも30日で。' },
                        ].map((f, i) => (
                            <div key={i} style={{ background: CREAM, border: '1px solid #EFEBDF', borderRadius: '16px', padding: '24px', borderTop: `3px solid ${GOLD}` }}>
                                <div style={{ fontFamily: SERIF, fontSize: '16px', fontWeight: 900, color: INK, marginBottom: '10px' }}>{f.t}</div>
                                <p style={{ fontSize: '13px', color: SUB, lineHeight: 1.8, margin: 0 }}>{f.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== HOW IT WORKS ===================== */}
            <section style={{ padding: sectionPad, background: `linear-gradient(180deg, #FBF4DD, ${CREAM})` }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: pad }}>
                    <div style={{ textAlign: 'center', marginBottom: '44px' }}>
                        <Eyebrow>3 steps a day</Eyebrow>
                        <H>1日10分の、勝ち癖。</H>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
                        {[
                            { n: '1', t: '模範解答を写す', d: '完成形を手でなぞり、合格の型と必須表現を体に入れる。誰でもでき、書いた答案はそのままSNS映え。' },
                            { n: '2', t: '自分で書く', d: '同じお題を、今度は自分の言葉で。型が手に残っているから、ゼロから考えるより速く書ける。' },
                            { n: '3', t: '型の表と見比べる', d: '模範解答を分解した型の表と、自分の答案を並べる。足りない役割が1行ずつ見える。' },
                        ].map(s => (
                            <div key={s.n} style={{ background: '#fff', border: '1px solid #EFEBDF', borderRadius: '16px', padding: '28px 24px', textAlign: 'center' }}>
                                <div style={{ width: '46px', height: '46px', margin: '0 auto 14px', borderRadius: '50%', background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#fff', fontFamily: SERIF, fontSize: '20px', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.n}</div>
                                <div style={{ fontSize: '16px', fontWeight: 900, color: INK, marginBottom: '8px' }}>{s.t}</div>
                                <p style={{ fontSize: '13px', color: SUB, lineHeight: 1.8, margin: 0 }}>{s.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== TWO AUDIENCES ===================== */}
            <section style={{ padding: sectionPad, background: '#fff' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: pad }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <Eyebrow>For everyone</Eyebrow>
                        <H>写すだけでもいい。<br />本気なら、書いて型と並べる。</H>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '16px' }}>
                        <div style={{ background: CREAM, border: '1px solid #EFEBDF', borderRadius: '16px', padding: '28px', borderTop: `3px solid ${GOLD}` }}>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: DEEPGOLD, letterSpacing: '1px', marginBottom: '8px' }}>LIGHT</div>
                            <div style={{ fontFamily: SERIF, fontSize: '18px', fontWeight: 900, color: INK, marginBottom: '10px' }}>とりあえず続けたい人へ</div>
                            <p style={{ fontSize: '13.5px', color: SUB, lineHeight: 1.9, margin: 0 }}>模範解答を写すだけ。考えなくていい。きれいなA4答案用紙に書いて、撮って、晒す。1日10分の習慣と「やってる感」が、まず手に入る。</p>
                        </div>
                        <div style={{ background: '#ECFDF5', border: `1px solid ${GREEN}33`, borderRadius: '16px', padding: '28px', borderTop: `3px solid ${GREEN}` }}>
                            <div style={{ fontSize: '11px', fontWeight: 800, color: '#0E9F6E', letterSpacing: '1px', marginBottom: '8px' }}>SERIOUS</div>
                            <div style={{ fontFamily: SERIF, fontSize: '18px', fontWeight: 900, color: INK, marginBottom: '10px' }}>本気で受かりたい人へ</div>
                            <p style={{ fontSize: '13.5px', color: SUB, lineHeight: 1.9, margin: 0 }}>写して型を入れたら、同じお題を自分で書く。型の表と並べて、抜けた役割を埋める。「書く→見比べる」の往復が、独学では届かない合格ラインへ運ぶ。</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== WHY HANDWRITING (御託) ===================== */}
            <section style={{ padding: sectionPad, background: '#fff' }}>
                <div style={{ maxWidth: '760px', margin: '0 auto', padding: pad, textAlign: 'center' }}>
                    <Eyebrow>Why it works</Eyebrow>
                    <H>「読んだ」は忘れる。<br />「書いた」は残る。</H>
                    <p style={{ fontSize: '15px', color: SUB, lineHeight: 2, margin: '22px 0 0' }}>
                        受験英作文の本質は、ひらめきではなく再現性だ。本番で必要なのは、考える時間ではなく、手が覚えた「型」を取り出す速さ。だからライトパスは、眺めるアプリではなく、書かせるアプリにした。模範解答を一度なぞり切り、同じお題を自分で書き、AIに出して直す。この往復が、合格答案の感覚を最短で体に入れる。30日後、お題を見た瞬間にペンが動く——それがゴールだ。
                    </p>
                </div>
            </section>

            {/* ===================== WHY NOT JUST AI ===================== */}
            <section style={{ padding: sectionPad, background: INK, color: '#fff' }}>
                <div style={{ maxWidth: '880px', margin: '0 auto', padding: pad }}>
                    <Eyebrow>Why not just AI</Eyebrow>
                    <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? '24px' : '34px', fontWeight: 900, color: '#fff', lineHeight: 1.35, margin: 0 }}>
                        AIに作文を30個書かせただけ<br />——それとは、ここが違う。
                    </h2>
                    <p style={{ fontSize: isMobile ? '14px' : '16px', color: '#C9C0AC', lineHeight: 1.9, margin: '20px 0 0' }}>
                        誰でもAIに「英検1級の作文を書いて」と30回打てる。でもそれは、必要な表現が揃っている保証がどこにもない、バラバラの30本だ。ライトパスは逆から作っている。<strong style={{ color: '#fff' }}>先に「1級作文に必要な武器」を定義し、それが30本すべてに漏れなく入るように設計した。</strong>
                    </p>

                    {/* 計算で出した根拠 */}
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '14px', margin: '32px 0 0' }}>
                        {[
                            { n: `${ev.total}`, t: '選定した必須表現', d: `機能別の「型」${ev.fns}種(導入→立場→理由→例示→譲歩→因果→対比→結論)＋ 品詞別の格上げ語彙 ${ev.vocab}語(動詞・形容詞・副詞・名詞)。先に武器を定義した。` },
                            { n: `${ev.pct}%`, t: '30本に実在(証明済み)', d: `その${ev.total}表現が、30本の模範解答のどこに出るかを機械的にスキャン。${ev.covered}/${ev.total}が実際の文の中に埋まっている。主張ではなく、コードが数えた数字。` },
                            { n: '1→Day', t: '反復で定着する設計', d: '重要な表現ほど複数のDayに繰り返し出る。単語帳の暗記ではなく、文脈と反復ごと手に入る。だから本番で勝手に出てくる。' },
                        ].map(c => (
                            <div key={c.t} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '14px', padding: '20px' }}>
                                <div style={{ fontFamily: 'Georgia, serif', fontSize: '34px', fontWeight: 900, color: GOLD, lineHeight: 1 }}>{c.n}</div>
                                <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', margin: '8px 0 6px' }}>{c.t}</div>
                                <div style={{ fontSize: '12px', color: '#A8A29E', lineHeight: 1.8 }}>{c.d}</div>
                            </div>
                        ))}
                    </div>

                    <p style={{ fontSize: '12px', color: '#8A8170', lineHeight: 1.8, margin: '20px 0 0' }}>
                        ※ お題・模範解答はすべてオリジナル(過去問の転載ではありません)。だからこそ、表現の網羅を自分たちで設計・保証できます。
                    </p>

                    <div style={{ marginTop: '26px' }}>
                        <Link href="/english/write/master" style={{ display: 'inline-block', textDecoration: 'none', fontSize: '14px', fontWeight: 800, color: INK, background: GOLD, padding: '13px 26px', borderRadius: '12px' }}>
                            表現マスターを見る ー 全{ev.total}表現の被覆マップ →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===================== FAQ ===================== */}
            <section style={{ padding: sectionPad, background: `linear-gradient(180deg, ${CREAM}, #FBF4DD)` }}>
                <div style={{ maxWidth: '760px', margin: '0 auto', padding: pad }}>
                    <div style={{ textAlign: 'center', marginBottom: '36px' }}><Eyebrow>FAQ</Eyebrow><H>よくある質問</H></div>
                    {[
                        { q: '本当に30日で効果がありますか?', a: '1日1テーマ・全7分野を一巡する設計です。30日で「お題を見て構成が浮かぶ」状態を目指します。型は反復で身につくので、2周目はさらに速くなります。' },
                        { q: '1級にはまだ早いのですが。', a: '型と必須表現は級が上がっても共通です。まず1級の完成形を浴びることで、準1級・2級の英作文も逆算で見えるようになります。' },
                        { q: '意見論述と要約、両方できますか?', a: 'はい。2024新形式の要約も30日分。アプリ内のタブで切り替えて、両方を並行で進められます。' },
                        { q: '何を用意すればいい?', a: 'ペンと紙だけ。専用のA4カラー答案用紙を印刷して書くと、続けやすく、SNS映えもします。' },
                    ].map((f, i) => (
                        <div key={i} style={{ background: '#fff', border: '1px solid #EFEBDF', borderRadius: '14px', padding: '20px 24px', marginBottom: '12px' }}>
                            <div style={{ fontSize: '15px', fontWeight: 800, color: INK, marginBottom: '8px' }}>Q. {f.q}</div>
                            <p style={{ fontSize: '13px', color: SUB, lineHeight: 1.8, margin: 0 }}>{f.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===================== FINAL CTA ===================== */}
            <section style={{ padding: isMobile ? '64px 0' : '100px 0', background: INK, color: '#fff', textAlign: 'center' }}>
                <div style={{ maxWidth: '760px', margin: '0 auto', padding: pad }}>
                    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '8px', marginBottom: '20px' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 900, color: GOLD }}>WRITE</span>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 900, color: '#fff' }}>PASS</span>
                    </div>
                    <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? '26px' : '38px', fontWeight: 900, lineHeight: 1.4, margin: '0 0 16px' }}>
                        30日後、お題を見た瞬間に<br />ペンが動く。
                    </h2>
                    <p style={{ fontSize: '15px', color: '#C9C0AC', lineHeight: 1.8, margin: '0 0 32px' }}>
                        今日が Day 1。傾向分析でつかんだ「型」を、今から手に入れる。
                    </p>
                    <Cta label="今日の Day 1 を始める" sub="意見論述 ＋ 要約 / 30日プログラム" />
                    <div style={{ marginTop: '20px' }}>
                        <Link href="/english/write/sheet?mode=essay&day=1&tpl=A" style={{ color: '#C9C0AC', fontSize: '13px', textDecoration: 'underline' }}>A4答案用紙を見てみる</Link>
                    </div>
                </div>
            </section>

            <footer style={{ background: '#14110C', color: '#8A8170', textAlign: 'center', padding: '28px 0', fontSize: '11px' }}>
                <div>WRITEPASS（ライトパス） ・ 英検1級 ライティング 30日プログラム</div>
                <div style={{ maxWidth: '680px', margin: '12px auto 0', padding: '0 20px', fontSize: '10px', lineHeight: 1.8, color: '#6F6755' }}>
                    本サービスは非公式の自主教材です。公益財団法人 日本英語検定協会とは一切関係がなく、お題・模範解答はすべてオリジナルで、実際の過去問の転載ではありません。「英検」は同協会の登録商標です。
                </div>
            </footer>
        </div>
    );
}
