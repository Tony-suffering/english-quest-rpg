import Link from 'next/link';
import { notFound } from 'next/navigation';
import { T } from '@/data/stack/theme';
import { CHAPTERS, getChapter } from '@/data/stack/chapters';
import { CodeCard } from '@/components/stack/CodeCard';

export function generateStaticParams() {
    return CHAPTERS.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const c = getChapter(slug);
    return { title: c ? `${c.no}. ${c.title} | TONIO STACK` : 'TONIO STACK' };
}

export default async function StackChapter({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const c = getChapter(slug);
    if (!c) notFound();

    const prev = CHAPTERS.find(x => x.no === c.no - 1);
    const next = CHAPTERS.find(x => x.no === c.no + 1);

    return (
        <div style={{ backgroundColor: T.bg, minHeight: '100vh' }}>
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 20px 64px' }}>
                <Link
                    href="/english/stack"
                    style={{
                        fontSize: 11, fontWeight: 800, letterSpacing: '0.14em',
                        color: T.textMuted, textDecoration: 'none',
                    }}
                >
                    TONIO STACK
                </Link>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '16px 0 8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: T.gold }}>第{c.no}章</span>
                    <span style={{
                        fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 999,
                        color: c.free ? T.green : T.textMuted,
                        backgroundColor: c.free ? T.greenSoft : T.surfaceAlt,
                        border: `1px solid ${c.free ? T.green + '44' : T.border}`,
                    }}>
                        {c.free ? '無料' : '有料'}
                    </span>
                    <span style={{ fontSize: 12, color: T.textMuted }}>{c.time}</span>
                </div>

                <h1 style={{ fontSize: 27, fontWeight: 900, lineHeight: 1.4, margin: '0 0 10px', color: T.text }}>
                    {c.title}
                </h1>
                <p style={{ margin: '0 0 20px', fontSize: 15, color: T.textSub, lineHeight: 1.8 }}>{c.lead}</p>

                <div style={{
                    backgroundColor: T.goldSoft, border: `1px solid ${T.gold}55`,
                    borderRadius: T.radiusSm, padding: '11px 14px', fontSize: 13.5, marginBottom: 32,
                    lineHeight: 1.8,
                }}>
                    <span style={{ fontWeight: 800, color: '#92700F' }}>この章が終わると</span>
                    <span style={{ color: T.text, marginLeft: 8 }}>{c.goal}</span>
                </div>

                <Section label="なぜやるのか">
                    {c.why.map((w, i) => (
                        <p key={i} style={{ margin: '0 0 14px', fontSize: 15, lineHeight: 1.95, color: T.text }}>{w}</p>
                    ))}
                </Section>

                {c.steps.map((s, i) => (
                    <Section key={i} label={`手順 ${i + 1}`} title={s.heading}>
                        {s.body.map((b, k) => (
                            <p key={k} style={{ margin: '0 0 13px', fontSize: 15, lineHeight: 1.95, color: T.text }}>{b}</p>
                        ))}
                        {s.code?.map((b, k) => <CodeCard key={k} block={b} />)}
                    </Section>
                ))}

                <Section label="詰まる場所">
                    <div style={{ display: 'grid', gap: 10 }}>
                        {c.traps.map((t, i) => (
                            <div key={i} style={{
                                backgroundColor: T.surface, border: `1px solid ${T.border}`,
                                borderLeft: '3px solid #EF4444', borderRadius: T.radiusSm, padding: '13px 15px',
                            }}>
                                <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 6, color: T.text, lineHeight: 1.6 }}>
                                    {t.symptom}
                                </div>
                                <div style={{ fontSize: 13, color: T.textSub, marginBottom: 4, lineHeight: 1.8 }}>
                                    <b style={{ color: T.textMuted, fontWeight: 700 }}>原因</b>　{t.cause}
                                </div>
                                <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.8 }}>
                                    <b style={{ color: T.green, fontWeight: 700 }}>直し方</b>　{t.fix}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                <Section label="終わったかどうか">
                    <ul style={{ margin: 0, paddingLeft: 20, fontSize: 15, lineHeight: 2, color: T.text }}>
                        {c.done.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                </Section>

                <nav style={{
                    display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 44,
                    paddingTop: 20, borderTop: `1px solid ${T.border}`, fontSize: 13.5, fontWeight: 700,
                }}>
                    {prev ? (
                        <Link href={`/english/stack/${prev.slug}`} style={{ color: T.textSub, textDecoration: 'none' }}>
                            前 — {prev.title}
                        </Link>
                    ) : <span />}
                    {next ? (
                        <Link href={`/english/stack/${next.slug}`} style={{ color: T.gold, textDecoration: 'none', textAlign: 'right' }}>
                            次 — {next.title}
                        </Link>
                    ) : (
                        <Link href="/english/stack" style={{ color: T.gold, textDecoration: 'none' }}>
                            章一覧に戻る
                        </Link>
                    )}
                </nav>
            </div>
        </div>
    );
}

function Section({ label, title, children }: { label: string; title?: string; children: React.ReactNode }) {
    return (
        <section style={{ marginBottom: 38 }}>
            <div style={{
                fontSize: 11, fontWeight: 900, letterSpacing: '0.14em',
                color: T.textMuted, marginBottom: title ? 4 : 12,
            }}>
                {label.toUpperCase()}
            </div>
            {title && (
                <h2 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 14px', lineHeight: 1.5, color: T.text }}>
                    {title}
                </h2>
            )}
            {children}
        </section>
    );
}
