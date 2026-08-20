'use client';

/**
 * コーピング式 — メソッドの説明 兼 募集ページ
 *
 * 英語コーチングに固有のメソッドは無い。各社が売っているのは行動変容の技術なので、
 * 根拠は英語教育ではなく自己効力感と習慣形成の研究から取る。
 * このページは、その研究と手順を1対1で結んで見せるためにある。
 *
 * 売り物は「話せるようになること」ではない。**話せない人間が毎日先に転ぶこと**である。
 */

import Link from 'next/link';
import {
    EVIDENCE, PRINCIPLES, PROTOCOL, NOT_PROMISED, PRICE,
    METHOD_NAME, METHOD_SUB,
} from '@/data/english/coach-method';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';
const BG = '#FAFAF9';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

const WAITLIST = 'https://x.com/tonio_english';

export default function CoachMethodPage() {
    return (
        <div style={{ minHeight: '100vh', background: BG, color: INK, padding: '30px 16px 80px' }}>
            <div style={{ maxWidth: 780, margin: '0 auto' }}>

                {/* ===== HERO ===== */}
                <div style={{ fontSize: 10, letterSpacing: '0.3em', color: '#A8A29E', fontWeight: 700, marginBottom: 8 }}>
                    METHOD ・ {METHOD_NAME}
                </div>
                <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(25px, 5vw, 38px)', fontWeight: 900, lineHeight: 1.4, margin: '0 0 16px', letterSpacing: '-0.01em' }}>
                    英語コーチを始めます。<br />
                    話せません。<span style={{ color: DEEPGOLD }}>そのほうが効くので。</span>
                </h1>
                <p style={{ fontSize: 14, lineHeight: 2, color: '#44403C', margin: '0 0 14px' }}>
                    TOEIC900はあります。15年やってます。それでも、ネイティブ2人が被せて喋る85分のポッドキャストは今でも音の壁です。
                    そういう人間がコーチをやります。
                </p>
                <p style={{
                    fontSize: 14.5, lineHeight: 1.95, color: INK, fontWeight: 800,
                    borderLeft: `4px solid ${GOLD}`, paddingLeft: 15, margin: '0 0 26px',
                }}>
                    完璧にこなす手本より、つまずいて直る過程を見せる手本のほうが、学習者は伸びる。
                    しかも<b style={{ color: DEEPGOLD }}>手本が自分に似ているほど強く効く</b>。
                    これは言い訳ではなく、40年前から実証されている所見です。
                </p>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
                    <a href={WAITLIST} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <div style={{
                            background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#fff',
                            padding: '15px 26px', borderRadius: 11, fontSize: 15, fontWeight: 900,
                        }}>メンバーシップに入る</div>
                    </a>
                    <Link href="/english/ear" style={{ textDecoration: 'none' }}>
                        <div style={{
                            background: '#fff', border: `1px solid ${LINE}`, color: INK,
                            padding: '15px 24px', borderRadius: 11, fontSize: 14.5, fontWeight: 900,
                        }}>先に耳を測る(無料)</div>
                    </Link>
                </div>

                {/* ===== 根拠 ===== */}
                <Section eyebrow="EVIDENCE" title="根拠を先に置きます。">
                    <P>
                        英語コーチングに固有のメソッドは存在しません。各社が売っているのは学習計画と進捗管理と面談で、
                        これは英語の技術ではなく<b>行動変容の技術</b>です。だから根拠は英語教育ではなく、
                        自己効力感と習慣形成の研究から取ります。そこには40年ぶんの蓄積があります。
                    </P>
                    {EVIDENCE.map(e => (
                        <div key={e.id} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: '20px 20px', marginBottom: 11 }}>
                            <div style={{ display: 'inline-block', fontSize: 10, fontWeight: 900, color: '#fff', background: DEEPGOLD, padding: '4px 10px', borderRadius: 99, letterSpacing: '0.08em', marginBottom: 11 }}>
                                {e.tag}
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 900, lineHeight: 1.7, marginBottom: 9 }}>{e.claim}</div>
                            <div style={{ fontSize: 12.5, lineHeight: 1.95, color: SUB, marginBottom: 11 }} dangerouslySetInnerHTML={{ __html: bold(e.detail) }} />
                            <a href={e.url} target="_blank" rel="noopener noreferrer" style={{
                                display: 'block', fontSize: 11, color: SUB, lineHeight: 1.7,
                                paddingTop: 10, borderTop: `1px dashed ${LINE}`, textDecoration: 'none',
                            }}>{e.cite}</a>
                        </div>
                    ))}
                    <div style={{ fontSize: 11.5, color: SUB, lineHeight: 1.9, marginTop: 12 }}>
                        根拠のない技法は混ぜません。世に出回るコーチング理論の一部は、提唱者本人の考えだけを土台にしていて
                        実験データがありません。<b>1つ混ぜた瞬間に、本物の部分まで疑われます。</b>
                    </div>
                </Section>

                {/* ===== 原則 ===== */}
                <Section eyebrow="PRINCIPLES" title="5つの原則。全部、業界と逆です。">
                    <P>
                        原則は、根拠に紐付くものだけを置いています。紐付かない思いつきは入れません。
                        そして5つとも、たまたま業界の一般的なやり方と逆になりました。
                    </P>
                    {PRINCIPLES.map(p => (
                        <div key={p.n} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: '20px 20px', marginBottom: 11 }}>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap', marginBottom: 9 }}>
                                <span style={{
                                    flexShrink: 0, width: 26, height: 26, borderRadius: 8, background: GOLD, color: '#fff',
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900,
                                }}>{p.n}</span>
                                <span style={{ fontSize: 17, fontWeight: 900 }}>{p.name}</span>
                            </div>
                            <div style={{ fontSize: 13.5, fontWeight: 800, lineHeight: 1.8, marginBottom: 10 }}>{p.rule}</div>
                            <div style={{ fontSize: 12.5, lineHeight: 1.95, color: SUB, marginBottom: 12 }} dangerouslySetInnerHTML={{ __html: bold(p.why) }} />
                            <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', background: '#FAFAF9', borderRadius: 9, padding: '10px 12px' }}>
                                <span style={{ flexShrink: 0, fontSize: 10, fontWeight: 900, color: '#DC2626' }}>業界</span>
                                <span style={{ fontSize: 12, color: SUB, lineHeight: 1.7 }}>{p.industry}</span>
                            </div>
                        </div>
                    ))}
                </Section>

                {/* ===== 手順 ===== */}
                <Section eyebrow="PROTOCOL" title="28日、やることの全部。">
                    <P>
                        隠す部分はありません。中身を見て、自分でできると思ったら自分でやってください。
                        それでも人がついてしまうのが、このメソッドの核心なので。
                    </P>
                    {PROTOCOL.map(s => (
                        <div key={s.when} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: '20px 20px', marginBottom: 11 }}>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap', marginBottom: 10 }}>
                                <span style={{ fontSize: 11, fontWeight: 900, color: DEEPGOLD, letterSpacing: '0.12em' }}>{s.when}</span>
                                <span style={{ fontSize: 16, fontWeight: 900 }}>{s.title}</span>
                            </div>
                            <Lane label="受ける人" color={INK} items={s.student} />
                            <Lane label="こちら" color={GREEN} items={s.coach} />
                            {s.tool && (
                                <Link href={s.tool} style={{ textDecoration: 'none' }}>
                                    <div style={{ marginTop: 11, fontSize: 12, fontWeight: 800, color: GREEN }}>
                                        使う道具: {s.tool} →
                                    </div>
                                </Link>
                            )}
                        </div>
                    ))}
                </Section>

                {/* ===== 約束しないこと ===== */}
                <Section eyebrow="NOT PROMISED" title="約束しないことを、先に書きます。">
                    <P>ここを曖昧にする商品は、だいたい中身がありません。</P>
                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, overflow: 'hidden' }}>
                        {NOT_PROMISED.map(([t, b]) => (
                            <div key={t} style={{ padding: '18px 20px', borderBottom: `1px solid ${LINE}` }}>
                                <div style={{ fontSize: 13.5, fontWeight: 900, marginBottom: 7 }}>
                                    <span style={{ color: '#DC2626', marginRight: 9 }}>×</span>{t}
                                </div>
                                <div style={{ fontSize: 12.5, lineHeight: 1.95, color: SUB, paddingLeft: 22 }} dangerouslySetInnerHTML={{ __html: bold(b) }} />
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ===== 値段 ===== */}
                <Section eyebrow="PRICE" title={`最初の1名。${PRICE.monthlyLabel}。`}>
                    <div style={{ background: '#fff', border: `2px solid ${GOLD}`, borderRadius: 16, padding: '30px 22px', textAlign: 'center', marginBottom: 16 }}>
                        <div style={{ fontFamily: 'Georgia, serif', fontSize: 44, fontWeight: 900, lineHeight: 1 }}>{PRICE.monthlyLabel}</div>
                        <div style={{ fontSize: 12.5, color: SUB, fontWeight: 700, margin: '11px 0 22px' }}>{PRICE.monthlyNote}</div>
                        <a href={WAITLIST} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#fff',
                                padding: 16, borderRadius: 12, fontSize: 15.5, fontWeight: 900,
                            }}>応募する</div>
                        </a>
                    </div>

                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
                        {PRICE.compare.map(c => (
                            <div key={c.name} style={{
                                display: 'flex', gap: 12, padding: '15px 18px', borderBottom: `1px solid ${LINE}`,
                                flexWrap: 'wrap', background: c.me ? '#FEFCF2' : '#fff',
                            }}>
                                <div style={{ flex: '1 1 160px', fontSize: 13, fontWeight: c.me ? 900 : 800, color: c.me ? DEEPGOLD : INK }}>{c.name}</div>
                                <div style={{ flex: '0 0 150px', fontSize: 12.5, fontWeight: 800, color: SUB }}>{c.price}</div>
                                <div style={{ flex: '1 1 180px', fontSize: 12, color: SUB, lineHeight: 1.7 }}>{c.note}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ background: '#FEF9E7', border: `1px solid ${GOLD}55`, borderRadius: 12, padding: '18px 20px' }}>
                        <div style={{ fontSize: 11, fontWeight: 900, color: DEEPGOLD, letterSpacing: '0.15em', marginBottom: 9 }}>なぜ安いのか</div>
                        <div style={{ fontSize: 13, lineHeight: 2, color: '#44403C' }}>{PRICE.whyCheap}</div>
                    </div>
                </Section>

                <div style={{ marginTop: 34, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <Link href="/english/ear" style={{ textDecoration: 'none' }}>
                        <div style={{ background: INK, color: '#fff', padding: '14px 22px', borderRadius: 11, fontSize: 13.5, fontWeight: 900 }}>
                            まず耳を測る(無料・5分)
                        </div>
                    </Link>
                    <Link href="/membership" style={{ textDecoration: 'none' }}>
                        <div style={{ background: '#fff', border: `1px solid ${LINE}`, color: SUB, padding: '14px 22px', borderRadius: 11, fontSize: 13.5, fontWeight: 900 }}>
                            メンバーシップ(¥100 / 月)
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// ============================================================

/** データ側に書いた ** ** を太字にする。文章はデータに置いておきたいので、ここで変換する */
function bold(s: string): string {
    return s
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\*\*(.+?)\*\*/g, '<b style="color:#1C1917">$1</b>');
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
    return (
        <section style={{ marginBottom: 42 }}>
            <div style={{ fontSize: 10.5, letterSpacing: '0.24em', color: DEEPGOLD, fontWeight: 900, marginBottom: 10 }}>{eyebrow}</div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(20px, 3.6vw, 27px)', fontWeight: 900, lineHeight: 1.45, margin: '0 0 15px' }}>{title}</h2>
            {children}
        </section>
    );
}

function P({ children }: { children: React.ReactNode }) {
    return <p style={{ fontSize: 13.5, lineHeight: 2.05, color: '#44403C', margin: '0 0 18px' }}>{children}</p>;
}

function Lane({ label, color, items }: { label: string; color: string; items: string[] }) {
    return (
        <div style={{ marginTop: 11 }}>
            <div style={{ fontSize: 10.5, fontWeight: 900, color, letterSpacing: '0.1em', marginBottom: 6 }}>{label}</div>
            {items.map(t => (
                <div key={t} style={{ fontSize: 12.5, lineHeight: 1.9, paddingLeft: 15, position: 'relative', marginBottom: 3 }}>
                    <span style={{ position: 'absolute', left: 0, color, fontWeight: 900 }}>·</span>
                    <span dangerouslySetInnerHTML={{ __html: bold(t) }} />
                </div>
            ))}
        </div>
    );
}
