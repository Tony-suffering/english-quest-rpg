'use client';

import type {
    XTweet,
    WantedCard,
    ClinicCard,
    LieCard,
    BreakingCard,
    QuoteCard,
    PhilosophyCard,
    AppPromoCard,
} from '@/data/x-tweets';

// 名前 → 利用可能なアバター webp のマッピング
const AVATAR_MAP: Record<string, string> = {
    'タケシ': '/characters/takeshi.webp',
    'ユキ': '/characters/yuki.webp',
    'ミナ': '/characters/mina.webp',
    'リサ': '/characters/lisa.webp',
    '権藤': '/characters/master.webp',
    'ケンジ': '/characters/kenji.webp',
};

function avatarFor(name?: string): string | undefined {
    if (!name) return undefined;
    for (const [key, url] of Object.entries(AVATAR_MAP)) {
        if (name.includes(key)) return url;
    }
    return undefined;
}

export function CardPreview({ card }: { card: XTweet['card'] }) {
    switch (card.type) {
        case 'wanted':
            return <WantedCardView card={card} />;
        case 'clinic':
            return <ClinicCardView card={card} />;
        case 'lie':
            return <LieCardView card={card} />;
        case 'breaking':
            return <BreakingCardView card={card} />;
        case 'quote':
            return <QuoteCardView card={card} />;
        case 'philosophy':
            return <PhilosophyCardView card={card} />;
        case 'app-promo':
            return <AppPromoCardView card={card} />;
    }
}

function DangerStars({ level }: { level: number }) {
    return (
        <span style={{ color: '#F59E0B', letterSpacing: '2px', fontSize: '14px' }}>
            {'★'.repeat(level)}
            <span style={{ color: '#44403C' }}>{'★'.repeat(5 - level)}</span>
        </span>
    );
}

function WantedCardView({ card }: { card: WantedCard }) {
    const avatar = avatarFor(card.name);
    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#1c1917',
            color: '#ffffff',
            padding: '24px 22px',
            fontFamily: 'system-ui, sans-serif',
            border: '4px solid #DC2626',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                <div style={{ color: '#DC2626', fontSize: '11px', letterSpacing: '0.3em', fontWeight: 700 }}>WANTED</div>
                <div style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '0.15em', marginTop: '2px' }}>指 名 手 配</div>
            </div>

            <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
                <div style={{
                    width: '120px',
                    height: '150px',
                    backgroundColor: '#44403C',
                    borderRadius: '4px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    color: '#a8a29e',
                    border: '2px solid #57534e',
                    overflow: 'hidden',
                    backgroundImage: avatar ? `url('${avatar}')` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    {!avatar && 'PHOTO'}
                </div>
                <div style={{ flex: 1, fontSize: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 12px' }}>
                        <span style={{ color: '#a8a29e' }}>氏名</span>
                        <span style={{ fontWeight: 700, fontSize: '14px' }}>{card.name}・{card.age}歳</span>
                        <span style={{ color: '#a8a29e' }}>本籍</span>
                        <span>{card.job}</span>
                        <span style={{ color: '#DC2626' }}>罪状</span>
                        <span style={{ color: '#FCA5A5', fontWeight: 700 }}>{card.crime}</span>
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '10px', fontSize: '11px' }}>
                <div style={{ color: '#DC2626', marginBottom: '3px', fontWeight: 700, letterSpacing: '0.05em' }}>犯行手口</div>
                <div style={{ color: '#e7e5e4', lineHeight: 1.5 }}>{card.method}</div>
            </div>

            <div style={{ marginBottom: '10px', fontSize: '11px' }}>
                <div style={{ color: '#DC2626', marginBottom: '3px', fontWeight: 700, letterSpacing: '0.05em' }}>潜伏先</div>
                <div style={{ color: '#e7e5e4' }}>{card.hideout}</div>
            </div>

            <div style={{
                marginTop: 'auto',
                paddingTop: '10px',
                borderTop: '1px solid #44403C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '13px',
            }}>
                <span style={{ color: '#FCA5A5', fontWeight: 700 }}>危険度: <DangerStars level={card.danger} /></span>
                <span style={{ color: '#a8a29e', fontSize: '10px' }}>@tonio_english</span>
            </div>
        </div>
    );
}

function ClinicCardView({ card }: { card: ClinicCard }) {
    const avatar = avatarFor(card.patientName);
    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #292524 0%, #1c1917 100%)',
            color: '#ffffff',
            padding: '26px 24px',
            fontFamily: 'system-ui, sans-serif',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid #44403C' }}>
                <div>
                    <div style={{ color: '#a8a29e', fontSize: '10px', letterSpacing: '0.2em' }}>JAPANESE ENGLISH CLINIC</div>
                    <div style={{ color: '#e7e5e4', fontSize: '13px', fontWeight: 700, marginTop: '2px' }}>日本人英語クリニック</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#a8a29e', fontSize: '10px' }}>症例</div>
                    <div style={{ color: '#FCA5A5', fontSize: '14px', fontWeight: 700 }}>{card.caseNo}</div>
                </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ color: '#FCA5A5', fontSize: '10px', backgroundColor: '#7F1D1D', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
                        致死率 {card.fatalityRate}%
                    </span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, lineHeight: 1.2, marginBottom: '4px' }}>{card.diseaseJa}</div>
                <div style={{ fontSize: '13px', color: '#a8a29e', fontStyle: 'italic' }}>{card.diseaseEn}</div>
            </div>

            <div style={{ backgroundColor: '#0c0a09', padding: '12px 14px', borderRadius: '6px', marginBottom: '14px', display: 'flex', gap: 12, alignItems: 'center' }}>
                {avatar && (
                    <div style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        backgroundImage: `url('${avatar}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: '2px solid #44403C',
                        flexShrink: 0,
                    }} />
                )}
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '10px', color: '#a8a29e', marginBottom: '4px', letterSpacing: '0.1em' }}>患者情報</div>
                    <div style={{ fontSize: '13px', color: '#e7e5e4' }}>{card.patientName} {card.patientAge}歳・{card.patientJob}</div>
                </div>
            </div>

            <div>
                <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: 700, marginBottom: '8px', letterSpacing: '0.05em' }}>主症状 (実録)</div>
                {card.symptoms.map((s, i) => (
                    <div key={i} style={{ fontSize: '13px', color: '#e7e5e4', marginBottom: '4px', lineHeight: 1.5 }}>
                        {s}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '12px', textAlign: 'right', color: '#a8a29e', fontSize: '10px' }}>
                @tonio_english
            </div>
        </div>
    );
}

function LieCardView({ card }: { card: LieCard }) {
    const colors: Record<number, string> = {
        1: '#10B981',
        2: '#7C3AED',
        3: '#DB2777',
        4: '#D4AF37',
        5: '#DC2626',
    };
    const bannerColor = colors[card.lieNo % 5 || 5] ?? '#DB2777';
    const avatar = avatarFor(card.translator);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fafaf9',
            color: '#1c1917',
            fontFamily: 'system-ui, sans-serif',
            border: '1px solid #e7e5e4',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{
                backgroundColor: bannerColor,
                color: '#ffffff',
                padding: '20px 22px',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', letterSpacing: '0.2em', opacity: 0.9 }}>嘘 #{card.lieNo}</span>
                    <span style={{ fontSize: '11px' }}>危険度 {'★'.repeat(card.danger)}</span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, fontStyle: 'italic', lineHeight: 1.2 }}>
                    &quot;{card.phrase}&quot;
                </div>
            </div>

            <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {card.translator && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '14px' }}>
                        {avatar && (
                            <div style={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                backgroundImage: `url('${avatar}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                border: '1px solid #e7e5e4',
                                flexShrink: 0,
                            }} />
                        )}
                        <span style={{ fontSize: '11px', color: '#888' }}>翻訳者: {card.translator}</span>
                    </div>
                )}

                <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '11px', color: '#16A34A', fontWeight: 700, marginBottom: '4px', letterSpacing: '0.05em' }}>表向き</div>
                    <div style={{ fontSize: '15px', color: '#1c1917' }}>「{card.surface}」</div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: 700, marginBottom: '4px', letterSpacing: '0.05em' }}>真意</div>
                    <div style={{ fontSize: '17px', color: '#DC2626', fontWeight: 800, lineHeight: 1.3 }}>「{card.truth}」</div>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                        <div style={{ fontSize: '11px', color: '#888', fontWeight: 600, marginBottom: '2px' }}>頻度</div>
                        <div style={{ fontSize: '13px', color: '#525252' }}>{card.frequency}</div>
                    </div>
                    <div style={{ fontSize: '10px', color: '#aaa', letterSpacing: '0.1em' }}>@tonio_english</div>
                </div>
            </div>
        </div>
    );
}

function BreakingCardView({ card }: { card: BreakingCard }) {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#f1f5f9',
            padding: '20px 18px',
            fontFamily: 'system-ui, sans-serif',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{ marginBottom: '12px', fontSize: '11px', color: '#0891B2', fontWeight: 700, letterSpacing: '0.2em' }}>
                警視庁・英語事犯対策課
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flex: 1 }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#0891B2',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 800,
                    flexShrink: 0,
                }}>
                    900
                </div>
                <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '14px',
                    padding: '14px 16px',
                    flex: 1,
                    fontSize: '13px',
                    color: '#1c1917',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    border: '1px solid #e7e5e4',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}>
                    <div style={{ fontWeight: 800, color: '#0891B2', marginBottom: '6px', fontSize: '15px' }}>
                        【{card.headline}】
                    </div>
                    <div style={{ color: '#525252', fontSize: '11px', marginBottom: '10px' }}>
                        {card.timestamp}
                    </div>
                    <div>{card.body}</div>
                    {card.bounty && (
                        <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #e7e5e4', color: '#D4AF37', fontWeight: 700, fontSize: '12px' }}>
                            {card.bounty}
                        </div>
                    )}
                </div>
            </div>

            <div style={{ marginTop: '10px', textAlign: 'right', color: '#888', fontSize: '10px' }}>
                @tonio_english
            </div>
        </div>
    );
}

function QuoteCardView({ card }: { card: QuoteCard }) {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #fef3c7 0%, #d1fae5 100%)',
            padding: '36px 32px',
            fontFamily: 'system-ui, sans-serif',
            color: '#1c1917',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{ fontSize: '26px', fontWeight: 800, lineHeight: 1.3, marginBottom: '20px', whiteSpace: 'pre-wrap' }}>
                {card.headline}
            </div>
            <div style={{ borderLeft: '4px solid #D4AF37', paddingLeft: '14px', marginBottom: '20px' }}>
                {card.lines.map((line, i) => (
                    <div key={i} style={{ fontSize: '15px', color: '#44403C', lineHeight: 1.7, marginBottom: '6px' }}>
                        {line}
                    </div>
                ))}
            </div>
            {card.cta && (
                <div style={{ fontSize: '13px', color: '#16A34A', fontWeight: 700, marginBottom: '12px' }}>
                    {card.cta}
                </div>
            )}
            <div style={{ marginTop: 'auto', fontSize: '11px', color: '#888', letterSpacing: '0.15em', textAlign: 'right' }}>
                @tonio_english
            </div>
        </div>
    );
}

function AppPromoCardView({ card }: { card: AppPromoCard }) {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(160deg, #fffbeb 0%, #fef3c7 100%)',
            padding: '36px 32px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#1c1917',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #fcd34d',
        }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#D4AF37', fontWeight: 700, marginBottom: '14px' }}>
                APP BUILD CLUB / アプリ作る部
            </div>

            <div style={{
                fontSize: '30px',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '6px',
                color: '#1c1917',
                fontStyle: 'italic',
                letterSpacing: '-0.01em',
            }}>
                &quot;{card.idiom}&quot;
            </div>
            <div style={{ fontSize: '13px', color: '#78716c', marginBottom: '24px' }}>
                = {card.idiomJa}
            </div>

            <div style={{
                fontSize: '20px',
                fontWeight: 700,
                lineHeight: 1.5,
                color: '#1c1917',
                borderLeft: '4px solid #D4AF37',
                paddingLeft: '14px',
                marginBottom: '24px',
            }}>
                {card.headline}
            </div>

            <div style={{
                marginTop: 'auto',
                padding: '14px 16px',
                backgroundColor: '#fff',
                border: '1px dashed #fcd34d',
                borderRadius: '6px',
                fontSize: '11px',
                color: '#78716c',
                marginBottom: '12px',
            }}>
                <div style={{ fontWeight: 700, color: '#D4AF37', marginBottom: '4px', letterSpacing: '0.05em' }}>SCREENSHOT</div>
                <div>{card.screenshotHint}</div>
            </div>

            <div style={{
                fontSize: '13px',
                color: '#16A34A',
                fontWeight: 700,
                letterSpacing: '0.02em',
                marginBottom: '6px',
            }}>
                → {card.cta}
            </div>

            <div style={{ fontSize: '10px', color: '#a8a29e', letterSpacing: '0.15em', textAlign: 'right' }}>
                @tonio_english
            </div>
        </div>
    );
}

function PhilosophyCardView({ card }: { card: PhilosophyCard }) {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fafaf9',
            color: '#1c1917',
            padding: '60px 50px',
            fontFamily: '"Noto Serif JP", "Hiragino Mincho ProN", "YuMincho", serif',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            borderLeft: '1px solid #e7e5e4',
            borderRight: '1px solid #e7e5e4',
        }}>
            <div style={{
                fontSize: '34px',
                fontWeight: 700,
                lineHeight: 1.4,
                color: '#1c1917',
                whiteSpace: 'pre-wrap',
                marginBottom: '36px',
                textAlign: 'left',
            }}>
                {card.headline}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {card.lines.map((line, i) => (
                    <div
                        key={i}
                        style={{
                            fontSize: '17px',
                            lineHeight: 1.9,
                            color: '#525252',
                            letterSpacing: '0.02em',
                        }}
                    >
                        {line}
                    </div>
                ))}
            </div>

            {card.source && (
                <div style={{
                    marginTop: 'auto',
                    paddingTop: '24px',
                    fontSize: '11px',
                    color: '#a8a29e',
                    textAlign: 'right',
                    letterSpacing: '0.1em',
                    fontStyle: 'italic',
                }}>
                    -- {card.source}
                </div>
            )}

            <div style={{
                position: 'absolute',
                bottom: '16px',
                right: '20px',
                fontSize: '10px',
                color: '#a8a29e',
                letterSpacing: '0.15em',
            }}>
                @tonio_english
            </div>
        </div>
    );
}
