import Link from 'next/link';
import { notFound } from 'next/navigation';
import { T } from '@/data/stack/theme';
import { LESSONS, getLesson } from '@/data/stack/lessons';
import { SayBlock } from '@/components/stack/SayBlock';

export function generateStaticParams() {
    return LESSONS.map(l => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const l = getLesson(slug);
    return { title: l ? `第${l.no}回 ${l.title} | TONIO STACK` : 'TONIO STACK' };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const l = getLesson(slug);
    if (!l) notFound();

    const next = LESSONS.find(x => x.no === l.no + 1);
    const prev = LESSONS.find(x => x.no === l.no - 1);

    return (
        <div style={{ backgroundColor: T.bg, minHeight: '100vh' }}>
            <div style={{ maxWidth: 780, margin: '0 auto', padding: '30px 20px 64px' }}>

                <Link href="/english/stack/demo" style={{
                    fontSize: 11, fontWeight: 800, letterSpacing: '0.12em',
                    color: T.textMuted, textDecoration: 'none',
                }}>
                    TONIO STACK ・ 作り直し版
                </Link>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '16px 0 8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: T.gold }}>第{l.no}回</span>
                    <span style={{ fontSize: 12, color: T.textMuted }}>{l.time}</span>
                </div>

                <h1 style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.45, margin: '0 0 18px', color: T.text }}>
                    {l.title}
                </h1>

                <div style={{
                    backgroundColor: T.goldSoft, border: `1px solid ${T.gold}55`,
                    borderRadius: 10, padding: '13px 15px', marginBottom: 30,
                }}>
                    <div style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: '0.12em', color: '#92700F', marginBottom: 5 }}>
                        きょうのゴール
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.text, lineHeight: 1.8, marginBottom: 8 }}>
                        {l.goal}
                    </div>
                    <div style={{ fontSize: 12.5, color: T.textSub, lineHeight: 1.8 }}>
                        終わったとき手元にあるもの　{l.result}
                    </div>
                </div>

                {l.intro.map((p, i) => (
                    <p key={i} style={{ margin: '0 0 15px', fontSize: 15.5, lineHeight: 2, color: T.text }}>{p}</p>
                ))}

                {l.steps.map((s, i) => (
                    <section key={i} style={{ marginTop: 40 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                            <span style={{
                                width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                                backgroundColor: T.gold, color: '#FFF',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 13, fontWeight: 900,
                            }}>
                                {i + 1}
                            </span>
                            <h2 style={{ fontSize: 20, fontWeight: 900, margin: 0, lineHeight: 1.5, color: T.text }}>
                                {s.heading}
                            </h2>
                        </div>
                        {s.body.map((b, k) => (
                            <p key={k} style={{ margin: '0 0 13px', fontSize: 15, lineHeight: 2, color: T.text }}>{b}</p>
                        ))}
                        {s.blocks.map((b, k) => <SayBlock key={k} block={b} />)}
                    </section>
                ))}

                {/* うまくいかない時 */}
                <section style={{ marginTop: 48 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 6px', color: T.text }}>
                        うまくいかない時
                    </h2>
                    <p style={{ margin: '0 0 16px', fontSize: 14, color: T.textSub, lineHeight: 1.9 }}>
                        原因を自分で探さなくていい。下から近いものを選んで、そのまま Claude Code に貼る。それで大体片付く。
                    </p>
                    <div style={{ display: 'grid', gap: 14 }}>
                        {l.stuck.map((s, i) => (
                            <div key={i} style={{
                                backgroundColor: T.surface, border: `1px solid ${T.border}`,
                                borderRadius: 10, padding: '14px 16px',
                            }}>
                                <div style={{ fontSize: 14.5, fontWeight: 800, color: T.text, marginBottom: 10, lineHeight: 1.7 }}>
                                    {s.when}
                                </div>
                                <SayBlock block={{ kind: 'say', text: s.say }} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* 締め */}
                <div style={{
                    marginTop: 44, padding: '16px 18px', borderRadius: 10,
                    backgroundColor: '#F0FDF4', border: '1px solid #86EFAC',
                }}>
                    <div style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: '0.12em', color: '#166534', marginBottom: 6 }}>
                        きょうはここまで
                    </div>
                    <div style={{ fontSize: 14.5, color: T.text, lineHeight: 1.9 }}>{l.closing}</div>
                </div>

                <nav style={{
                    display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 36,
                    paddingTop: 18, borderTop: `1px solid ${T.border}`, fontSize: 13.5, fontWeight: 700,
                }}>
                    {prev ? (
                        <Link href={`/english/stack/demo/${prev.slug}`} style={{ color: T.textSub, textDecoration: 'none' }}>
                            前 — 第{prev.no}回
                        </Link>
                    ) : <span />}
                    {next ? (
                        <Link href={`/english/stack/demo/${next.slug}`} style={{ color: T.gold, textDecoration: 'none', textAlign: 'right' }}>
                            次 — 第{next.no}回 {next.title}
                        </Link>
                    ) : (
                        <Link href="/english/stack/demo" style={{ color: T.gold, textDecoration: 'none', textAlign: 'right' }}>
                            目次に戻る
                        </Link>
                    )}
                </nav>
            </div>
        </div>
    );
}
