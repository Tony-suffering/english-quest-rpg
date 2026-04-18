'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const NOW_BUILDING = [
    {
        status: 'LIVE',
        title: '英会話マスター365',
        desc: '毎日10フレーズ、365日で3650。日常会話を身体に叩き込む。',
        href: '/english/izakaya-toeic/kaiwa/lp',
    },
    {
        status: 'LIVE',
        title: '居酒屋TOEIC',
        desc: '6人の常連キャラがPart 5/6/7を解く。30エピソードのドラマ形式。',
        href: '/english/toeic/lp',
    },
    {
        status: 'BUILDING',
        title: 'Tokyo 52',
        desc: '52話の英語ドラマ。エピソード1を制作中。表現・単語・リスニングの3タブ構成。',
        href: '/journal',
    },
    {
        status: 'WRITING',
        title: 'バイブコーディング塾',
        desc: '毎週のnote記事にプログラミング経験ゼロでアプリを作るコツを載せる連載。',
        href: '/journal/vibe-coding',
    },
];

const WHAT_YOU_GET = [
    {
        title: '毎日のジャーナル',
        body: '今日作った機能、壊れた場所、諦めた案。開発と英語学習の全記録。フィルターはかけてない。カレンダーUIで日付ごとに読める。',
        href: '/journal',
        cta: 'ジャーナルへ',
    },
    {
        title: '英語構造分析シリーズ',
        body: 'ネイティブとノンネイティブの英語を秒速39bitsレベルまで分解する。#110-112で発見した7つのルールから、Miguel Rojasのスペイン語話者としての強みまで。',
        href: '/journal/110',
        cta: 'Entry #110を読む',
    },
    {
        title: 'バイブコーディング講座',
        body: 'プログラミング経験ゼロからAIと一緒にアプリを作る全過程。大工の例えで教えるClaude Codeの使い方。毎週のnoteで連載中。',
        href: '/journal/vibe-coding',
        cta: '講座を読む',
    },
    {
        title: 'Life -- 1日1録音',
        body: 'あなたの今日の一言を日本語で録音。とにおが翌日までに英語化して、あなたの名前クレジット付きで語録に載せる。参加するメンバーシップ。',
        href: '/membership/life',
        cta: '録音する',
    },
];

const LATEST = [
    { id: '135', title: '英会話マスター365 / 居酒屋TOEIC ローンチ', date: '2026-04-07' },
    { id: '134', title: 'Movie Harvest -- 映画から表現を収穫する', date: '2026-04-01' },
    { id: '133', title: 'Vercelを捨てた日', date: '2026-03-20' },
    { id: '132', title: 'Tokyo 52 -- 居酒屋TOEICの新シリーズ', date: '2026-03-19' },
    { id: '131', title: '俺語録310個の振り返り', date: '2026-03-18' },
];

const HIGHLIGHTS = [
    { id: '115', title: '会話の骨格 -- 10の会話パターン' },
    { id: '112', title: 'Miguel Rojasの英語を解剖する' },
    { id: '111', title: '6ステップ流暢性メソッド' },
    { id: '110', title: 'ネイティブの英語を構造分解する' },
    { id: '114', title: 'Goro Yamaguchiのリクエスト' },
];

const HAQ = [
    {
        q: 'なんで毎日書けるの？',
        a: '書かないと死ぬから。英語を話せないまま終わりたくないという単純な恐怖で続いてる。',
    },
    {
        q: '月100円って安すぎない？',
        a: '缶コーヒー1本分。傍聴席料金。1000人集まっても10万円。副業にもなってない。',
    },
    {
        q: 'メンバー何人？',
        a: '5人くらい。全員の名前と、何をリクエストしてくれたか覚えてる。人数を伸ばす気はあまりない。',
    },
    {
        q: '英語話せるようになった？',
        a: 'なってない。だから毎日作ってる。会話練習アプリを自分で使って自分で直してる。',
    },
    {
        q: 'Discord/Slack使わないの？',
        a: '1人運営が死ぬから使わない。リクエストはnoteのコメントかメンバー記事のコメントで全部回す。',
    },
];

// Typography -- editorial system
const SERIF = "'Noto Serif JP', 'Source Serif Pro', Georgia, 'Times New Roman', serif";
const SANS = "'Inter', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

// Colors -- gold 1% rule
const GOLD = '#D4AF37';
const INK = '#1C1917';
const TEXT = '#44403C';
const MUTE = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';
const BG = '#FAFAF9';

function Asterism() {
    return (
        <div style={{
            textAlign: 'center',
            fontFamily: SERIF,
            fontSize: 14,
            color: FAINT,
            letterSpacing: '1em',
            padding: '0 0 0 1em',
            margin: '72px 0',
            userSelect: 'none' as const,
        }}>
            * * *
        </div>
    );
}

function Eyebrow({ children, color = GOLD }: { children: React.ReactNode; color?: string }) {
    return (
        <p style={{
            fontSize: 10,
            letterSpacing: '0.35em',
            textTransform: 'uppercase' as const,
            color,
            fontFamily: SANS,
            fontWeight: 700,
            marginBottom: 20,
            margin: 0,
        }}>
            {children}
        </p>
    );
}

export default function MembershipPage() {
    const [mounted, setMounted] = useState(false);
    const [openHaqIndex, setOpenHaqIndex] = useState<number | null>(null);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: BG, fontFamily: SANS }}>
            {/* Header */}
            <header style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backgroundColor: 'rgba(250,250,249,0.95)',
                backdropFilter: 'blur(12px)',
                borderBottom: `1px solid ${LINE}`,
                padding: '14px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Link href="/" style={{ fontSize: 11, color: FAINT, textDecoration: 'none', letterSpacing: '0.12em', fontWeight: 600 }}>TONIO LAB</Link>
                    <span style={{ color: LINE, fontSize: 11 }}>/</span>
                    <span style={{ fontSize: 11, color: GOLD, fontWeight: 700, letterSpacing: '0.14em' }}>MEMBERS</span>
                </div>
                <Link href="/" style={{ fontSize: 11, color: FAINT, textDecoration: 'none', letterSpacing: '0.08em' }}>← TOP</Link>
            </header>

            {/* HERO */}
            <section style={{
                maxWidth: 720,
                margin: '0 auto',
                padding: '80px 24px 40px',
            }}>
                <Eyebrow>Membership · ¥100 / Month</Eyebrow>

                <h1 style={{
                    fontFamily: SERIF,
                    fontSize: 44,
                    fontWeight: 700,
                    color: INK,
                    lineHeight: 1.25,
                    letterSpacing: '-0.01em',
                    margin: '28px 0 28px',
                    maxWidth: 620,
                }}>
                    TOEIC 900点、<br />しゃべれない男のクラブ。
                </h1>

                <div style={{
                    fontSize: 16,
                    color: TEXT,
                    lineHeight: 1.95,
                    maxWidth: 560,
                    marginBottom: 36,
                }}>
                    <p style={{ margin: '0 0 16px' }}>
                        4技能のうち3つクリアして、最後の1つで永遠に死んでる男が、自分の英語を救うために毎日アプリを作ってます。
                    </p>
                    <p style={{ margin: 0 }}>
                        完成したから売ってるんじゃない。作ってる最中を見せるために売ってる。
                    </p>
                </div>

                {/* Stats inline */}
                <div style={{
                    display: 'flex',
                    gap: 40,
                    padding: '20px 0',
                    borderTop: `1px solid ${LINE}`,
                    borderBottom: `1px solid ${LINE}`,
                    flexWrap: 'wrap',
                }}>
                    {[
                        ['135+', 'Journal Entries'],
                        ['130+', 'Days Streak'],
                        ['2', 'Live Apps'],
                        ['¥100', 'Per Month'],
                    ].map(([value, label]) => (
                        <div key={label}>
                            <p style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 700, color: INK, margin: 0, lineHeight: 1 }}>{value}</p>
                            <p style={{ fontSize: 10, color: FAINT, letterSpacing: '0.12em', textTransform: 'uppercase' as const, margin: '6px 0 0' }}>{label}</p>
                        </div>
                    ))}
                </div>

                {/* Journal CTA */}
                <Link href="/journal" style={{ textDecoration: 'none' }}>
                    <div style={{
                        background: `linear-gradient(135deg, ${INK} 0%, #292524 100%)`,
                        borderRadius: 16,
                        padding: '44px 36px',
                        marginTop: 40,
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: GOLD }} />
                        <p style={{
                            fontSize: 10,
                            letterSpacing: '0.4em',
                            color: GOLD,
                            fontWeight: 700,
                            margin: '0 0 16px',
                            textTransform: 'uppercase' as const,
                        }}>
                            Main Content
                        </p>
                        <h2 style={{
                            fontFamily: SERIF,
                            fontSize: 32,
                            fontWeight: 700,
                            color: '#fff',
                            lineHeight: 1.25,
                            margin: '0 0 14px',
                        }}>
                            とにおのジャーナル
                        </h2>
                        <p style={{
                            fontSize: 14,
                            color: 'rgba(255,255,255,0.65)',
                            lineHeight: 1.8,
                            margin: '0 0 28px',
                            maxWidth: 480,
                        }}>
                            開発と英語学習の全記録。没ネタ、反省文、未公開コンテンツ。カレンダーUIで日付ごとに読める。
                        </p>
                        <div style={{
                            display: 'inline-block',
                            padding: '14px 28px',
                            background: GOLD,
                            color: INK,
                            borderRadius: 8,
                            fontSize: 14,
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                        }}>
                            ジャーナルを開く →
                        </div>
                    </div>
                </Link>
            </section>

            <Asterism />

            {/* NOW BUILDING */}
            <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
                <Eyebrow color={FAINT}>Now Building</Eyebrow>
                <h2 style={{
                    fontFamily: SERIF,
                    fontSize: 28,
                    fontWeight: 700,
                    color: INK,
                    margin: '20px 0 32px',
                    letterSpacing: '-0.005em',
                }}>
                    いま走ってる4本。
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {NOW_BUILDING.map((item, i) => (
                        <Link key={item.title} href={item.href} style={{ textDecoration: 'none' }}>
                            <div style={{
                                padding: '24px 0',
                                borderTop: `1px solid ${LINE}`,
                                borderBottom: i === NOW_BUILDING.length - 1 ? `1px solid ${LINE}` : 'none',
                                display: 'flex',
                                gap: 24,
                                alignItems: 'flex-start',
                            }}>
                                <span style={{
                                    fontSize: 9,
                                    fontWeight: 700,
                                    color: item.status === 'LIVE' ? GOLD : item.status === 'BUILDING' ? INK : MUTE,
                                    letterSpacing: '0.18em',
                                    flexShrink: 0,
                                    width: 80,
                                    paddingTop: 4,
                                }}>
                                    {item.status}
                                </span>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{
                                        fontFamily: SERIF,
                                        fontSize: 19,
                                        fontWeight: 700,
                                        color: INK,
                                        margin: '0 0 6px',
                                        lineHeight: 1.4,
                                    }}>
                                        {item.title}
                                    </h3>
                                    <p style={{
                                        fontSize: 14,
                                        color: TEXT,
                                        lineHeight: 1.75,
                                        margin: 0,
                                    }}>
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Asterism />

            {/* WHAT YOU GET */}
            <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
                <Eyebrow color={FAINT}>What You Get</Eyebrow>
                <h2 style={{
                    fontFamily: SERIF,
                    fontSize: 28,
                    fontWeight: 700,
                    color: INK,
                    margin: '20px 0 40px',
                    letterSpacing: '-0.005em',
                }}>
                    月100円で届くもの。
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
                    {WHAT_YOU_GET.map((item, i) => (
                        <article key={item.title}>
                            <p style={{
                                fontFamily: SERIF,
                                fontSize: 13,
                                color: GOLD,
                                margin: '0 0 8px',
                                fontStyle: 'italic' as const,
                            }}>
                                {String(i + 1).padStart(2, '0')}.
                            </p>
                            <h3 style={{
                                fontFamily: SERIF,
                                fontSize: 22,
                                fontWeight: 700,
                                color: INK,
                                margin: '0 0 14px',
                                lineHeight: 1.35,
                            }}>
                                {item.title}
                            </h3>
                            <p style={{
                                fontSize: 15,
                                color: TEXT,
                                lineHeight: 1.9,
                                margin: '0 0 16px',
                            }}>
                                {item.body}
                            </p>
                            <Link href={item.href} style={{
                                fontSize: 13,
                                color: INK,
                                textDecoration: 'underline',
                                textDecorationColor: GOLD,
                                textUnderlineOffset: 4,
                                fontWeight: 600,
                                letterSpacing: '0.02em',
                            }}>
                                {item.cta} →
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

            <Asterism />

            {/* CO-BUILT */}
            <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
                <Eyebrow>Co-Built with Members</Eyebrow>
                <h2 style={{
                    fontFamily: SERIF,
                    fontSize: 28,
                    fontWeight: 700,
                    color: INK,
                    margin: '20px 0 28px',
                    letterSpacing: '-0.005em',
                }}>
                    5人の開発委員会。
                </h2>
                <div style={{
                    fontSize: 15,
                    color: TEXT,
                    lineHeight: 1.95,
                    marginBottom: 24,
                }}>
                    <p style={{ margin: '0 0 16px' }}>
                        メンバー5人くらいで回してる小さい委員会です。「これ作ってほしい」「この作品やってほしい」があったら送ってください。
                    </p>
                    <p style={{ margin: 0 }}>
                        実際に動いてる例があります。Goro YamaguchiさんからBlackadderとMr. Beanのリクエストをもらって、合計20表現の教材を組みました。皮肉の教科書です。
                    </p>
                </div>

                <Link href="/membership/requests" style={{ textDecoration: 'none' }}>
                    <div style={{
                        padding: '20px 24px',
                        border: `1px solid ${LINE}`,
                        borderLeft: `3px solid ${GOLD}`,
                        background: '#fff',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 16,
                    }}>
                        <div>
                            <p style={{ fontSize: 10, letterSpacing: '0.25em', color: GOLD, fontWeight: 700, margin: '0 0 6px', textTransform: 'uppercase' as const }}>
                                Member Request #001
                            </p>
                            <p style={{ fontSize: 15, color: INK, fontFamily: SERIF, fontWeight: 700, margin: 0 }}>
                                Blackadder / Mr. Bean -- 20 expressions
                            </p>
                            <p style={{ fontSize: 12, color: MUTE, margin: '4px 0 0', fontStyle: 'italic' as const }}>
                                Requested by Goro Yamaguchi
                            </p>
                        </div>
                        <span style={{ fontSize: 18, color: INK }}>→</span>
                    </div>
                </Link>

                <p style={{
                    fontSize: 12,
                    color: MUTE,
                    lineHeight: 1.8,
                    margin: '20px 0 0',
                }}>
                    送り先: <a href="https://note.com/tonio_english" target="_blank" rel="noopener noreferrer" style={{ color: INK, textDecoration: 'underline', textDecorationColor: GOLD, textUnderlineOffset: 3 }}>note.com/tonio_english</a> のコメント、またはメンバー記事のコメント欄。Discord・Slackは使いません。
                </p>
            </section>

            <Asterism />

            {/* LATEST */}
            <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
                <Eyebrow color={FAINT}>Latest</Eyebrow>
                <h2 style={{
                    fontFamily: SERIF,
                    fontSize: 28,
                    fontWeight: 700,
                    color: INK,
                    margin: '20px 0 32px',
                    letterSpacing: '-0.005em',
                }}>
                    直近のジャーナル。
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {LATEST.map((entry, i) => (
                        <Link key={entry.id} href={`/journal/${entry.id}`} style={{
                            textDecoration: 'none',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            gap: 16,
                            padding: '14px 0',
                            borderTop: `1px solid ${LINE}`,
                            borderBottom: i === LATEST.length - 1 ? `1px solid ${LINE}` : 'none',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flex: 1, minWidth: 0 }}>
                                <span style={{ fontSize: 11, color: GOLD, fontWeight: 700, fontFamily: SANS, letterSpacing: '0.08em', flexShrink: 0 }}>
                                    #{entry.id}
                                </span>
                                <span style={{ fontSize: 14, color: INK, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>
                                    {entry.title}
                                </span>
                            </div>
                            <span style={{ fontSize: 11, color: FAINT, fontFamily: SANS, letterSpacing: '0.04em', flexShrink: 0 }}>
                                {entry.date}
                            </span>
                        </Link>
                    ))}
                </div>

                <p style={{
                    fontSize: 11,
                    color: MUTE,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase' as const,
                    margin: '48px 0 20px',
                    fontWeight: 600,
                }}>
                    Highlights
                </p>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {HIGHLIGHTS.map((entry, i) => (
                        <Link key={entry.id} href={`/journal/${entry.id}`} style={{
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: 16,
                            padding: '12px 0',
                            borderTop: i === 0 ? `1px solid ${LINE}` : 'none',
                            borderBottom: `1px solid ${LINE}`,
                        }}>
                            <span style={{ fontSize: 11, color: GOLD, fontWeight: 700, letterSpacing: '0.08em', flexShrink: 0 }}>
                                #{entry.id}
                            </span>
                            <span style={{ fontSize: 14, color: INK, fontWeight: 500 }}>
                                {entry.title}
                            </span>
                        </Link>
                    ))}
                </div>

                <div style={{ textAlign: 'center' as const, marginTop: 32 }}>
                    <Link href="/journal" style={{
                        fontSize: 12,
                        color: INK,
                        textDecoration: 'underline',
                        textDecorationColor: GOLD,
                        textUnderlineOffset: 4,
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                    }}>
                        全エントリを見る →
                    </Link>
                </div>
            </section>

            <Asterism />

            {/* HAQ */}
            <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
                <Eyebrow color={FAINT}>Hypothetically Asked Questions</Eyebrow>
                <h2 style={{
                    fontFamily: SERIF,
                    fontSize: 28,
                    fontWeight: 700,
                    color: INK,
                    margin: '20px 0 8px',
                    letterSpacing: '-0.005em',
                }}>
                    聞かれてないけど答えます。
                </h2>
                <p style={{
                    fontSize: 13,
                    color: MUTE,
                    fontStyle: 'italic' as const,
                    margin: '0 0 32px',
                }}>
                    FAQではない。誰も聞いてない。でも書いておく。
                </p>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {HAQ.map((item, i) => {
                        const isOpen = openHaqIndex === i;
                        return (
                            <div key={i} style={{
                                borderTop: `1px solid ${LINE}`,
                                borderBottom: i === HAQ.length - 1 ? `1px solid ${LINE}` : 'none',
                            }}>
                                <button
                                    onClick={() => setOpenHaqIndex(isOpen ? null : i)}
                                    style={{
                                        width: '100%',
                                        padding: '20px 0',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: 16,
                                        textAlign: 'left' as const,
                                        fontFamily: SANS,
                                    }}
                                >
                                    <span style={{
                                        fontFamily: SERIF,
                                        fontSize: 17,
                                        fontWeight: 600,
                                        color: INK,
                                        lineHeight: 1.4,
                                    }}>
                                        {item.q}
                                    </span>
                                    <span style={{
                                        fontSize: 14,
                                        color: GOLD,
                                        flexShrink: 0,
                                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                                        transition: 'transform 0.2s ease',
                                        fontWeight: 700,
                                    }}>
                                        +
                                    </span>
                                </button>
                                {isOpen && (
                                    <p style={{
                                        fontSize: 14,
                                        color: TEXT,
                                        lineHeight: 1.9,
                                        margin: '0 0 24px',
                                        paddingRight: 40,
                                    }}>
                                        {item.a}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            <Asterism />

            {/* Final CTA */}
            <section style={{
                maxWidth: 720,
                margin: '0 auto',
                padding: '0 24px 80px',
                textAlign: 'center' as const,
            }}>
                <h2 style={{
                    fontFamily: SERIF,
                    fontSize: 22,
                    fontWeight: 600,
                    color: INK,
                    margin: '0 0 20px',
                    lineHeight: 1.5,
                    fontStyle: 'italic' as const,
                }}>
                    完成したから売ってるんじゃない。<br />作ってる最中を見せるために売ってる。
                </h2>
                <p style={{
                    fontSize: 13,
                    color: MUTE,
                    margin: '0 0 28px',
                }}>
                    -- とにお
                </p>
                <Link href="/journal" style={{
                    display: 'inline-block',
                    padding: '16px 40px',
                    background: INK,
                    color: '#fff',
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textDecoration: 'none',
                }}>
                    ジャーナルを開く
                </Link>
            </section>

            {/* Footer */}
            <footer style={{
                borderTop: `1px solid ${LINE}`,
                padding: '40px 24px 32px',
                maxWidth: 720,
                margin: '0 auto',
            }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 24,
                    marginBottom: 24,
                }}>
                    <Link href="/journal" style={{ fontSize: 12, color: MUTE, textDecoration: 'none', letterSpacing: '0.04em' }}>Journal</Link>
                    <Link href="/journal/vibe-coding" style={{ fontSize: 12, color: MUTE, textDecoration: 'none', letterSpacing: '0.04em' }}>Vibe Coding</Link>
                    <Link href="/english/izakaya-toeic/kaiwa/lp" style={{ fontSize: 12, color: MUTE, textDecoration: 'none', letterSpacing: '0.04em' }}>365</Link>
                    <Link href="/english/toeic/lp" style={{ fontSize: 12, color: MUTE, textDecoration: 'none', letterSpacing: '0.04em' }}>居酒屋TOEIC</Link>
                    <a href="https://note.com/tonio_english" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: MUTE, textDecoration: 'none', letterSpacing: '0.04em' }}>note.com</a>
                    <Link href="/" style={{ fontSize: 12, color: MUTE, textDecoration: 'none', letterSpacing: '0.04em' }}>TONIO LAB</Link>
                </div>
                <p style={{
                    textAlign: 'center' as const,
                    fontSize: 10,
                    color: FAINT,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase' as const,
                    margin: 0,
                }}>
                    Tonio Lab Membership
                </p>
            </footer>
        </div>
    );
}
