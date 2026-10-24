'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CINEPASS_CHUNKS, CINEPASS_STAGES } from '@/data/english/cinepass-chunks';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const CREAM = '#FFFDF8';
const INK = '#1C1917';
const SUB = '#78716C';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

// 科学セクションの引用データ (裏取り済みの数値のみ載せる)
const PAPERS = [
    {
        tag: 'カバレッジの壁',
        claim: '最頻3,000語ファミリーで映画セリフの95.76%、6,000語ファミリーで98.15%をカバー',
        detail: '映画318本・延べ284万語のスクリプトを実測した研究（固有名詞・um等の周辺語を既知とした場合）。つまり映画攻略に必要な単語は有限で、しかも上位に集中している。',
        cite: 'Webb, S., & Rodgers, M. P. H. (2009). The lexical coverage of movies. Applied Linguistics, 30(3), 407-427.',
    },
    {
        tag: 'リスニングの合格ライン',
        claim: '日常的な物語の聴解なら、95%カバレッジで理解のばらつきが大きく減る',
        detail: '90/95/98/100%の4条件の比較実験。読解で言われる「98%ルール」より、聞き取りは低いラインから成立し始める。まず95%ライン到達が現実的な最初のゴール。',
        cite: 'van Zeeland, H., & Schmitt, N. (2013). Lexical coverage in L1 and L2 listening comprehension. Applied Linguistics, 34(4), 457-479.',
    },
    {
        tag: 'セリフの正体',
        claim: 'ネイティブの話し言葉の58.6%は定型表現（チャンク）でできている',
        detail: 'コーパスの手作業分析（書き言葉は52.3%）。ネイティブは単語を組み立てていない。塊を貼り付けている。だから塊で覚えた分だけ、処理速度が追いつく。',
        cite: 'Erman, B., & Warren, B. (2000). The idiom principle and the open choice principle. Text, 20(1), 29-62.',
    },
    {
        tag: '最頻出チャンクは有限',
        claim: '英語の最頻出の句表現は505個のリストにまとまる',
        detail: 'BNC（1億語コーパス）から、最頻5,000語ファミリーに入るのと同等の頻度を持つ句表現を抽出した研究。5,000語リストに統合すると1割超が実は「句」。最初に入れるべき塊は無限ではない。',
        cite: 'Martinez, R., & Schmitt, N. (2012). A phrasal expressions list. Applied Linguistics, 33(3), 299-320.',
    },
    {
        tag: 'ロングテールの正体',
        claim: 'ネイティブの定型表現の在庫は数十万。全部覚えるのは不可能で、その必要もない',
        detail: 'ネイティブは「語彙化された文の型」を数十万単位で保持するとされ、固定表現の総数は単語の数に匹敵するという推定もある（Jackendoff, 1997）。ただし頻度は極端に偏っている。追うべきは上位だけ。',
        cite: 'Pawley, A., & Syder, F. H. (1983). Two puzzles for linguistic theory. In Language and Communication. Longman.',
    },
    {
        tag: '同じシリーズを観ろ',
        claim: '同一シリーズの連続視聴は、無関係な番組を観るより語彙負荷が低い',
        detail: 'テレビ288話・133万語の分析。同じシリーズ内では同じ語が再登場しやすく、繰り返し遭遇による定着に有利。チャンクを入れたら、1作品に絞って回すのが正しい使い方。',
        cite: 'Rodgers, M. P. H., & Webb, S. (2011). Narrow viewing: The vocabulary in related television programs. TESOL Quarterly, 45(4), 689-717.',
    },
];

export default function CinepassLP() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const c = () => setIsMobile(window.innerWidth < 768);
        c(); window.addEventListener('resize', c);
        return () => window.removeEventListener('resize', c);
    }, []);

    const pad = isMobile ? '0 18px' : '0 32px';
    const sectionPad = isMobile ? '52px 0' : '88px 0';

    const Cta = ({ label, sub }: { label: string; sub?: string }) => (
        <Link href="/english/cinepass/program" style={{ textDecoration: 'none' }}>
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
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '26px' : '32px', fontWeight: 900, color: GOLD, letterSpacing: '1px' }}>CINE</span>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '26px' : '32px', fontWeight: 900, color: INK, letterSpacing: '1px' }}>PASS</span>
                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: INK, padding: '3px 8px', borderRadius: '5px', letterSpacing: '1px' }}>映画リスニング</span>
                    </div>
                    <h1 style={{ fontFamily: SERIF, fontSize: isMobile ? '30px' : '50px', fontWeight: 900, lineHeight: 1.3, margin: '0 0 18px', letterSpacing: '0.5px' }}>
                        映画が聞き取れないのは、<br />才能ではなく<span style={{ color: DEEPGOLD }}>「数字」</span>の問題。
                    </h1>
                    <p style={{ fontSize: isMobile ? '15px' : '18px', color: SUB, lineHeight: 1.8, maxWidth: '640px', margin: '0 auto 14px' }}>
                        ネイティブの話し言葉の<strong style={{ color: INK }}>58.6%は定型表現の塊</strong>でできている。そして最頻出の塊は<strong style={{ color: INK }}>数百個</strong>しかない。第二言語習得研究が特定した「実用ライン」だけを、30日で入れる。
                    </p>
                    <p style={{ fontSize: '13px', color: '#A8A29E', margin: '0 0 30px' }}>頻出チャンク510 ｜ 3ステージ ｜ 論文ベースの設計</p>
                    <Cta label="Day 1 を始める" sub="無料・30日プログラム" />
                    <div style={{ display: 'flex', gap: isMobile ? '8px' : '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '30px' }}>
                        {['研究ベース設計', '1日17チャンク', '和訳隠しテスト', 'ロングテール排除', '完全自作例文'].map(b => (
                            <span key={b} style={{ fontSize: '12px', fontWeight: 700, color: DEEPGOLD, background: '#FEF9E7', border: `1px solid ${GOLD}44`, padding: '7px 14px', borderRadius: '99px' }}>{b}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== STATS BAR ===================== */}
            <section style={{ background: INK, color: '#fff', padding: isMobile ? '28px 0' : '34px 0' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: pad, display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)', gap: isMobile ? '22px 12px' : '16px' }}>
                    {[
                        { n: '58.6%', u: '話し言葉に占める定型表現' },
                        { n: '95.76%', u: '3,000語族での映画カバー率' },
                        { n: '505', u: '最頻出チャンク (研究)' },
                        { n: '510', u: '収録チャンク' },
                        { n: '30', u: '日で完走' },
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
                    <Eyebrow>Why movies feel impossible</Eyebrow>
                    <H>単語帳を何冊やっても、<br />映画が聞こえない理由。</H>
                    <p style={{ fontSize: '15px', color: SUB, lineHeight: 1.9, margin: '18px 0 36px', maxWidth: '640px' }}>
                        TOEICで点が取れるのに映画で全滅する人は多い。原因は努力不足ではなく、狙う場所のズレだ。
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
                        {[
                            { t: '単語で聞いている', d: 'ネイティブは単語を並べていない。セリフの半分以上は塊の貼り付けだ。塊を知らないと、知っている単語の連続すら聞き取れない。' },
                            { t: 'カバレッジが足りない', d: '「20語に1語知らない」= 95%未満の状態では、推測が追いつかず理解が崩壊する。これは実験で確認されている数字の壁。' },
                            { t: 'ロングテールを追っている', d: 'かっこいい珍しい表現から覚えるのは最悪の順番。頻度は極端に偏っていて、二度と遭遇しない表現に時間を溶かすことになる。' },
                        ].map((p, i) => (
                            <div key={i} style={{ background: CREAM, border: '1px solid #EFEBDF', borderRadius: '16px', padding: '24px' }}>
                                <div style={{ fontFamily: SERIF, fontSize: '15px', fontWeight: 900, color: '#B91C1C', marginBottom: '10px' }}>0{i + 1}. {p.t}</div>
                                <p style={{ fontSize: '13px', color: SUB, lineHeight: 1.8, margin: 0 }}>{p.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== SCIENCE ===================== */}
            <section style={{ padding: sectionPad }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: pad }}>
                    <Eyebrow>The science</Eyebrow>
                    <H>感想ではなく、論文で設計した。</H>
                    <p style={{ fontSize: '15px', color: SUB, lineHeight: 1.9, margin: '18px 0 36px', maxWidth: '640px' }}>
                        CINEPASSの構成は全て第二言語習得研究の実測値に基づく。出典は全て明記する。
                    </p>
                    <div style={{ display: 'grid', gap: '14px' }}>
                        {PAPERS.map((p, i) => (
                            <div key={i} style={{ background: '#fff', border: '1px solid #EFEBDF', borderRadius: '16px', padding: isMobile ? '20px' : '26px 30px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: DEEPGOLD, padding: '4px 10px', borderRadius: '99px', letterSpacing: '1px' }}>{p.tag}</span>
                                </div>
                                <div style={{ fontFamily: SERIF, fontSize: isMobile ? '16px' : '18px', fontWeight: 900, color: INK, lineHeight: 1.6, marginBottom: '8px' }}>{p.claim}</div>
                                <p style={{ fontSize: '13px', color: SUB, lineHeight: 1.8, margin: '0 0 12px' }}>{p.detail}</p>
                                <div style={{ fontSize: '11px', color: '#A8A29E', fontStyle: 'italic', borderTop: '1px dashed #EFEBDF', paddingTop: '10px' }}>{p.cite}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== ZIPF / STRATEGY ===================== */}
            <section style={{ padding: sectionPad, background: '#fff' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: pad }}>
                    <Eyebrow>The strategy</Eyebrow>
                    <H>ロングテールは、捨てる。</H>
                    <p style={{ fontSize: '15px', color: SUB, lineHeight: 1.9, margin: '18px 0 30px', maxWidth: '680px' }}>
                        言語の頻度分布は極端に偏っている。実測では、最頻1,000語だけで話し言葉の89.25%が埋まり（Adolphs & Schmitt, 2003）、最頻1,000語族で書き言葉の78〜81%が埋まる（Nation, 2006）。ネイティブの塊の在庫が数十万あっても、実際に耳に届く塊の大半は上位の数百〜数千だ。だからCINEPASSは上位だけを収録し、遭遇率の低い表現は最初から入れていない。「全部覚える」のではなく「遭遇の大半を先回りする」。
                    </p>
                    <div style={{ background: CREAM, border: `1px solid ${GOLD}44`, borderRadius: '16px', padding: isMobile ? '20px' : '28px 32px' }}>
                        {[
                            { label: '最頻出の数百チャンク', width: 100, note: '遭遇の大半はここ。CINEPASSの守備範囲' },
                            { label: '中頻度の数千', width: 38, note: '映画を観続ければ勝手に貯まる' },
                            { label: 'ロングテール数十万', width: 8, note: '追わない。出会ったときに拾えばいい' },
                        ].map((b, i) => (
                            <div key={i} style={{ marginBottom: i < 2 ? '18px' : 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: INK, marginBottom: '6px' }}>
                                    <span>{b.label}</span>
                                    <span style={{ color: '#A8A29E', fontWeight: 400 }}>{b.note}</span>
                                </div>
                                <div style={{ background: '#F5F5F4', borderRadius: '99px', height: '14px', overflow: 'hidden' }}>
                                    <div style={{ width: `${b.width}%`, height: '100%', borderRadius: '99px', background: i === 0 ? `linear-gradient(90deg, ${GOLD}, #E6C75E)` : i === 1 ? '#D6D3D1' : '#E7E5E4' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== PROGRAM ===================== */}
            <section style={{ padding: sectionPad }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: pad }}>
                    <Eyebrow>The program</Eyebrow>
                    <H>3ステージ × 30日 × 510チャンク</H>
                    <p style={{ fontSize: '15px', color: SUB, lineHeight: 1.9, margin: '18px 0 36px', maxWidth: '640px' }}>
                        1日17個。骨格 → 動詞 → 場面の順に、聞こえる範囲を外側へ広げていく。
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
                        {CINEPASS_STAGES.map(s => (
                            <div key={s.key} style={{ background: '#fff', border: '1px solid #EFEBDF', borderRadius: '16px', padding: '26px' }}>
                                <div style={{ fontSize: '11px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '2px', marginBottom: '8px' }}>STAGE {s.key} ｜ DAY {s.days[0]}-{s.days[1]}</div>
                                <div style={{ fontFamily: SERIF, fontSize: '19px', fontWeight: 900, marginBottom: '4px' }}>{s.title}</div>
                                <div style={{ fontSize: '10px', color: '#A8A29E', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>{s.subtitle}</div>
                                <p style={{ fontSize: '13px', color: SUB, lineHeight: 1.8, margin: 0 }}>{s.description}</p>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: '12px', color: '#A8A29E', marginTop: '18px' }}>
                        収録 {CINEPASS_CHUNKS.length} チャンク。例文は全て自作（実在映画のセリフの転載なし）。
                    </p>
                </div>
            </section>

            {/* ===================== FINAL CTA ===================== */}
            <section style={{ background: `radial-gradient(900px 400px at 50% 110%, #FBF4DD, ${CREAM})`, padding: isMobile ? '64px 0 80px' : '96px 0 110px', textAlign: 'center' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto', padding: pad }}>
                    <H>何万回やるかじゃない。<br />どこを狙うかだ。</H>
                    <p style={{ fontSize: '15px', color: SUB, lineHeight: 1.9, margin: '20px 0 34px' }}>
                        ネイティブの在庫数十万を追えば終わりはない。だが遭遇の大半を占める上位510なら、30日は「終わりの見える数字」になる。
                    </p>
                    <Cta label="Day 1 を始める" sub="無料・登録不要" />
                </div>
            </section>
        </div>
    );
}
