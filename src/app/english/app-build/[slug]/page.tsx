import Link from 'next/link';
import { notFound } from 'next/navigation';
import { curriculum, getAllSlugs, getWeek } from '@/data/app-build/curriculum';

export async function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const week = getWeek(slug);
    if (!week) return { title: 'Not found' };
    return {
        title: `Week ${week.number}: ${week.title} | アプリ作る部`,
        description: week.subtitle,
    };
}

export default async function WeekPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const week = getWeek(slug);
    if (!week) notFound();

    const idx = curriculum.findIndex((w) => w.slug === slug);
    const prev = idx > 0 ? curriculum[idx - 1] : null;
    const next = idx < curriculum.length - 1 ? curriculum[idx + 1] : null;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px 96px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1a1a1a' }}>
            {/* Breadcrumb */}
            <div style={{ marginBottom: '32px', fontSize: '13px', color: '#666' }}>
                <Link href="/english/app-build" style={{ color: '#666', textDecoration: 'none' }}>
                    アプリ作る部
                </Link>
                <span style={{ margin: '0 8px', color: '#bbb' }}>/</span>
                <span style={{ color: '#1a1a1a' }}>Week {week.number}</span>
            </div>

            {/* Header */}
            <header style={{ marginBottom: '40px' }}>
                <div style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#D4AF37', fontWeight: 700, marginBottom: '12px' }}>
                    WEEK {String(week.number).padStart(2, '0')}
                </div>
                <h1 style={{ fontSize: '32px', fontWeight: 800, lineHeight: 1.3, marginBottom: '16px', letterSpacing: '-0.01em' }}>
                    {week.title}
                </h1>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7, marginBottom: '24px' }}>
                    {week.subtitle}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', fontSize: '12px' }}>
                    <Meta label="所要時間" value={week.duration} />
                    <Meta label="ツール" value={week.tool} />
                    <Meta label="費用" value={week.cost} />
                </div>
            </header>

            {/* Intro - とにお voice */}
            <section style={{ marginBottom: '40px', padding: '24px 28px', backgroundColor: '#FAFAF9', borderLeft: '3px solid #D4AF37', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#888', fontWeight: 600, marginBottom: '10px' }}>
                    とにおのひとこと
                </div>
                <p style={{ fontSize: '15px', lineHeight: 1.9, color: '#333', margin: 0, whiteSpace: 'pre-line' }}>
                    {week.intro}
                </p>
            </section>

            {/* Why This Week */}
            <section style={{ marginBottom: '40px' }}>
                <SectionTitle>なぜ今週これをやるのか</SectionTitle>
                <div style={{ padding: '20px 24px', backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: '12px', fontSize: '14.5px', lineHeight: 1.85, color: '#333', whiteSpace: 'pre-line' }}>
                    {week.whyThisWeek}
                </div>
            </section>

            {/* Prerequisites */}
            <section style={{ marginBottom: '40px' }}>
                <SectionTitle>始める前に必要なもの</SectionTitle>
                <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', margin: 0 }}>
                    {week.prerequisites.map((p, i) => (
                        <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px 16px', backgroundColor: '#FAFAF9', borderRadius: '8px' }}>
                            <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: '1.5px solid #10B981', flexShrink: 0, marginTop: '3px' }} />
                            <span style={{ fontSize: '14px', lineHeight: 1.7, color: '#333' }}>{p}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* New Words Glossary */}
            <section style={{ marginBottom: '40px' }}>
                <SectionTitle>今週初めて出てくる言葉</SectionTitle>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px', lineHeight: 1.7 }}>
                    分からない言葉が出てきたら、ここに戻って確認していい。 全部覚えなくていい、使ってるうちに自然に身につく。
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {week.newWords.map((g, i) => (
                        <div key={i} style={{ padding: '16px 20px', backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: '10px' }}>
                            <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#1a1a1a', marginBottom: '6px' }}>
                                {g.term}
                            </div>
                            <div style={{ fontSize: '13.5px', lineHeight: 1.75, color: '#555' }}>
                                {g.plain}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Goal */}
            <section style={{ marginBottom: '40px' }}>
                <SectionTitle>今週の卒業条件</SectionTitle>
                <div style={{ padding: '20px 24px', backgroundColor: '#fff', border: '2px solid #10B981', borderRadius: '12px', fontSize: '15px', lineHeight: 1.75, color: '#333' }}>
                    {week.goal}
                </div>
            </section>

            {/* Days */}
            <section style={{ marginBottom: '40px' }}>
                <SectionTitle>日々の進め方</SectionTitle>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px', lineHeight: 1.7 }}>
                    各ステップに「なぜ」「やり方」「こうなれば成功」「詰まったら」がある。 焦らない、1日 1ステップでも OK。
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {week.days.map((day, di) => (
                        <div key={di} style={{ padding: '20px 24px', backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.05em' }}>
                                    {day.label}
                                </div>
                                <div style={{ fontSize: '12px', color: '#999' }}>{day.duration}</div>
                            </div>
                            <h3 style={{ fontSize: '17px', fontWeight: 700, margin: '0 0 20px 0', color: '#1a1a1a' }}>
                                {day.title}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {day.steps.map((step) => (
                                    <div key={step.num} style={{ paddingTop: step.num === 1 ? 0 : '20px', borderTop: step.num === 1 ? 'none' : '1px solid #F0EFED' }}>
                                        <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '10px' }}>
                                            <div style={{
                                                minWidth: '28px',
                                                height: '28px',
                                                borderRadius: '50%',
                                                backgroundColor: '#1a1a1a',
                                                color: '#D4AF37',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '13px',
                                                fontWeight: 700,
                                                flexShrink: 0,
                                            }}>
                                                {step.num}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.5 }}>
                                                    {step.title}
                                                    {step.duration && (
                                                        <span style={{ fontWeight: 400, color: '#999', marginLeft: '10px', fontSize: '11.5px' }}>
                                                            ({step.duration})
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ marginLeft: '42px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {step.why && (
                                                <SubBlock label="なぜ" color="#D4AF37" bg="#FFF9E6">
                                                    {step.why}
                                                </SubBlock>
                                            )}
                                            <SubBlock label="やり方" color="#1a1a1a" bg="#fff" border>
                                                {step.detail}
                                            </SubBlock>
                                            {step.success && (
                                                <SubBlock label="こうなれば成功" color="#10B981" bg="#ECFDF5">
                                                    {step.success}
                                                </SubBlock>
                                            )}
                                            {step.stuck && (
                                                <SubBlock label="詰まったら" color="#DC2626" bg="#FEF2F2">
                                                    {step.stuck}
                                                </SubBlock>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: '20px', padding: '12px 16px', backgroundColor: '#F5F5F4', borderRadius: '8px', fontSize: '13px', color: '#555' }}>
                                <strong style={{ color: '#1a1a1a' }}>成果物:</strong> {day.deliverable}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Troubles */}
            <section style={{ marginBottom: '40px' }}>
                <SectionTitle>つまずきポイント (先回り Q&A)</SectionTitle>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '16px', lineHeight: 1.7 }}>
                    詰まったらここを読む。 答えがなければ Discord か X で聞いていい。
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {week.troubles.map((t, i) => (
                        <div key={i} style={{ padding: '18px 22px', backgroundColor: '#fff', border: '1px solid #E7E5E4', borderRadius: '10px' }}>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>
                                Q. {t.q}
                            </div>
                            <div style={{ fontSize: '13.5px', lineHeight: 1.85, color: '#555', whiteSpace: 'pre-line' }}>
                                A. {t.a}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Graduation */}
            <section style={{ marginBottom: '40px' }}>
                <SectionTitle>卒業チェック</SectionTitle>
                <div style={{ padding: '20px 24px', backgroundColor: '#10B981', color: '#fff', borderRadius: '12px', fontSize: '15px', lineHeight: 1.75 }}>
                    {week.graduation}
                </div>
            </section>

            {/* Tonio note */}
            <section style={{ marginBottom: '40px', padding: '24px 28px', backgroundColor: '#1a1a1a', color: '#fff', borderRadius: '12px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#D4AF37', fontWeight: 600, marginBottom: '10px' }}>
                    週末のとにお
                </div>
                <p style={{ fontSize: '15px', lineHeight: 1.9, margin: 0, whiteSpace: 'pre-line' }}>
                    {week.toniosNote}
                </p>
            </section>

            {/* Next preview */}
            <section style={{ marginBottom: '40px' }}>
                <SectionTitle>次の週に向けて</SectionTitle>
                <p style={{ fontSize: '14px', lineHeight: 1.85, color: '#555', margin: 0 }}>
                    {week.nextWeek}
                </p>
            </section>

            {/* Nav */}
            <nav
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '12px',
                    paddingTop: '32px',
                    borderTop: '1px solid #E7E5E4',
                    flexWrap: 'wrap',
                }}
            >
                {prev ? (
                    <Link
                        href={`/english/app-build/${prev.slug}`}
                        style={{
                            flex: '1 1 240px',
                            padding: '16px 20px',
                            backgroundColor: '#fff',
                            border: '1px solid #E7E5E4',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            color: '#1a1a1a',
                        }}
                    >
                        <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>← Week {prev.number}</div>
                        <div style={{ fontSize: '13px', fontWeight: 600 }}>{prev.title}</div>
                    </Link>
                ) : (
                    <Link
                        href="/english/app-build"
                        style={{
                            flex: '1 1 240px',
                            padding: '16px 20px',
                            backgroundColor: '#fff',
                            border: '1px solid #E7E5E4',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            color: '#1a1a1a',
                        }}
                    >
                        <div style={{ fontSize: '11px', color: '#999', marginBottom: '4px' }}>← トップ</div>
                        <div style={{ fontSize: '13px', fontWeight: 600 }}>アプリ作る部</div>
                    </Link>
                )}
                {next && (
                    <Link
                        href={`/english/app-build/${next.slug}`}
                        style={{
                            flex: '1 1 240px',
                            padding: '16px 20px',
                            backgroundColor: '#1a1a1a',
                            color: '#fff',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            textAlign: 'right',
                        }}
                    >
                        <div style={{ fontSize: '11px', color: '#bbb', marginBottom: '4px' }}>Week {next.number} →</div>
                        <div style={{ fontSize: '13px', fontWeight: 600 }}>{next.title}</div>
                    </Link>
                )}
            </nav>
        </div>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#888', fontWeight: 700, marginBottom: '16px', textTransform: 'uppercase' }}>
            {children}
        </h2>
    );
}

function Meta({ label, value }: { label: string; value: string }) {
    return (
        <div style={{ padding: '10px 14px', backgroundColor: '#FAFAF9', borderRadius: '8px', border: '1px solid #F0EFED' }}>
            <div style={{ fontSize: '10px', color: '#999', letterSpacing: '0.1em', marginBottom: '4px', fontWeight: 600 }}>
                {label}
            </div>
            <div style={{ fontSize: '13px', color: '#1a1a1a', fontWeight: 500, lineHeight: 1.4 }}>
                {value}
            </div>
        </div>
    );
}

function SubBlock({ label, color, bg, border, children }: { label: string; color: string; bg: string; border?: boolean; children: React.ReactNode }) {
    return (
        <div style={{ padding: '12px 16px', backgroundColor: bg, borderRadius: '8px', border: border ? '1px solid #E7E5E4' : 'none' }}>
            <div style={{ fontSize: '10.5px', fontWeight: 700, color, letterSpacing: '0.1em', marginBottom: '6px', textTransform: 'uppercase' }}>
                {label}
            </div>
            <div style={{ fontSize: '13.5px', lineHeight: 1.85, color: '#333', whiteSpace: 'pre-line' }}>
                {children}
            </div>
        </div>
    );
}
