'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const T = {
    bg: '#F0EFE9',
    surface: '#FFFFFF',
    text: '#1C1917',
    textSub: '#57534E',
    textMuted: '#A8A29E',
    gold: '#D4AF37',
    green: '#10B981',
    blue: '#3B82F6',
    purple: '#8B5CF6',
    orange: '#F97316',
    red: '#EF4444',
    shadow: '0 2px 8px rgba(0,0,0,0.06)',
    shadowMd: '0 4px 16px rgba(0,0,0,0.08)',
};

// ── Step Card for the main flow ──
function StepCard({ step, title, desc, href, color, tag, active }: {
    step: string; title: string; desc: string; href: string;
    color: string; tag: string; active?: boolean;
}) {
    return (
        <Link href={href} style={{ textDecoration: 'none' }}>
            <div style={{
                backgroundColor: T.surface,
                borderRadius: 16,
                padding: '24px 24px 20px',
                boxShadow: active ? `0 4px 20px ${color}25` : T.shadow,
                border: active ? `2px solid ${color}` : '1px solid #E7E5E4',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                position: 'relative',
                overflow: 'hidden',
            }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 6px 24px ${color}30`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = active ? `0 4px 20px ${color}25` : T.shadow; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
                {/* Step number watermark */}
                <div style={{
                    position: 'absolute', top: -8, right: 12,
                    fontSize: 64, fontWeight: 900, color: color + '08',
                    lineHeight: 1, pointerEvents: 'none',
                }}>{step}</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        backgroundColor: color, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 15, fontWeight: 800,
                    }}>{step}</div>
                    <div>
                        <div style={{ fontSize: 17, fontWeight: 700, color: T.text }}>{title}</div>
                        <div style={{ fontSize: 9, fontWeight: 700, color, letterSpacing: '0.15em' }}>{tag}</div>
                    </div>
                </div>
                <p style={{ fontSize: 13, color: T.textSub, margin: 0, lineHeight: 1.8, paddingLeft: 44 }}>
                    {desc}
                </p>
                <div style={{ paddingLeft: 44, marginTop: 12 }}>
                    <span style={{
                        fontSize: 12, fontWeight: 700, color,
                        letterSpacing: '0.05em',
                    }}>
                        {active ? 'ここから始める →' : '開く →'}
                    </span>
                </div>
            </div>
        </Link>
    );
}

// ── Small feature card ──
function FeatureCard({ href, title, desc, tag, tagColor = T.gold }: {
    href: string; title: string; desc: string; tag?: string; tagColor?: string;
}) {
    return (
        <Link href={href} style={{ textDecoration: 'none' }}>
            <div style={{
                backgroundColor: T.surface, borderRadius: 12, padding: '16px 18px',
                boxShadow: T.shadow, border: '1px solid #E7E5E4',
                cursor: 'pointer', transition: 'all 0.2s ease',
            }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = T.shadowMd; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = T.shadow; }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{title}</span>
                    {tag && (
                        <span style={{ fontSize: 9, fontWeight: 700, color: tagColor, backgroundColor: tagColor + '15', padding: '2px 8px', borderRadius: 4, letterSpacing: '0.1em' }}>
                            {tag}
                        </span>
                    )}
                </div>
                <p style={{ fontSize: 11, color: T.textSub, margin: 0, lineHeight: 1.6 }}>{desc}</p>
            </div>
        </Link>
    );
}

export default function EnglishHomePage() {
    const [completedDays, setCompletedDays] = useState(0);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem('5min-completed-days');
            if (raw) {
                const parsed = JSON.parse(raw);
                setCompletedDays(Array.isArray(parsed) ? parsed.length : 0);
            }
        } catch { /* */ }
    }, []);

    // Determine which step the user should be on
    const currentStep = completedDays === 0 ? 1 : completedDays < 5 ? 1 : 2;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: T.bg, padding: '32px 20px 80px' }}>
            <div style={{ maxWidth: 640, margin: '0 auto' }}>

                {/* ── HERO: 俺節 ── */}
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                    <div style={{
                        fontSize: 10, letterSpacing: '0.3em', color: T.gold,
                        fontWeight: 700, marginBottom: 16,
                    }}>
                        ENGLISH QUEST RPG
                    </div>
                    <h1 style={{
                        fontSize: 26, fontWeight: 300, color: T.text,
                        margin: '0 0 20px', lineHeight: 1.7,
                    }}>
                        英語、<span style={{ fontWeight: 700 }}>喋れないだろ？</span><br />
                        <span style={{ fontSize: 20, color: T.textSub }}>俺もだ。TOEIC 900あるのに。</span>
                    </h1>
                    <div style={{
                        fontSize: 14, color: T.textSub, lineHeight: 2.0,
                        maxWidth: 480, margin: '0 auto',
                    }}>
                        リーディング、リスニング、ライティング。<br />
                        4技能のうち3つはクリアした。<br />
                        最後の1つ、スピーキングで永遠に死んでる。<br />
                        <span style={{ color: T.text, fontWeight: 600 }}>
                            だから作った。自分で使いたいアプリを。
                        </span>
                    </div>
                </div>

                {/* ── MAIN CTA ── */}
                {completedDays === 0 && (
                    <div style={{ textAlign: 'center', marginBottom: 56 }}>
                        <Link href="/english/5min" style={{ textDecoration: 'none' }}>
                            <div style={{
                                display: 'inline-block',
                                padding: '18px 56px',
                                borderRadius: 14,
                                backgroundColor: T.gold,
                                color: '#fff',
                                fontSize: 18,
                                fontWeight: 700,
                                letterSpacing: '0.1em',
                                boxShadow: `0 4px 16px ${T.gold}40`,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}>
                                はじめる
                            </div>
                        </Link>
                        <div style={{ fontSize: 12, color: T.textMuted, marginTop: 12 }}>
                            1日5分。登録不要。すぐ始められる。
                        </div>
                    </div>
                )}

                {/* ── Progress bar (returning users) ── */}
                {completedDays > 0 && (
                    <div style={{
                        backgroundColor: T.surface, borderRadius: 14,
                        padding: '16px 24px', marginBottom: 40,
                        boxShadow: T.shadow, border: '1px solid #E7E5E4',
                        textAlign: 'center',
                    }}>
                        <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 8 }}>
                            あなたの進捗
                        </div>
                        <div style={{ fontSize: 28, fontWeight: 700, color: T.gold }}>
                            {completedDays}<span style={{ fontSize: 14, color: T.textMuted }}> / 30日</span>
                        </div>
                        <div style={{
                            height: 6, borderRadius: 3, backgroundColor: '#f0f0f0',
                            marginTop: 12, overflow: 'hidden',
                        }}>
                            <div style={{
                                height: '100%', borderRadius: 3,
                                backgroundColor: T.gold,
                                width: `${(completedDays / 30) * 100}%`,
                                transition: 'width 0.3s',
                            }} />
                        </div>
                    </div>
                )}

                {/* ── 3 STEPS ── */}
                <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <div style={{ width: 4, height: 24, backgroundColor: T.gold, borderRadius: 2 }} />
                        <h2 style={{ fontSize: 20, fontWeight: 700, color: T.text, margin: 0 }}>3ステップ</h2>
                    </div>
                    <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 20, paddingLeft: 16, letterSpacing: '0.05em' }}>
                        上から順にやるだけ。迷わない。
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
                    <StepCard
                        step="1"
                        title="5min 英会話"
                        desc="1日5分、フレーズ5個。会話シーンで実際に使う感覚をつかむ。全30日。ここが入口。何も考えずにここから始めろ。"
                        href="/english/5min"
                        color={T.green}
                        tag="BEGINNER -- まずここから"
                        active={currentStep === 1}
                    />

                    <div style={{ textAlign: 'center', color: T.textMuted, fontSize: 20, lineHeight: 1 }}>|</div>

                    <StepCard
                        step="2"
                        title="トレーニング"
                        desc="5minで出会ったフレーズを「カード」として育てる。タップするとスロットが回る。連続正解でフィーバー。ここがメインの遊び場。"
                        href="/english/training"
                        color={T.gold}
                        tag="CORE -- メインコンテンツ"
                        active={currentStep === 2}
                    />

                    <div style={{ textAlign: 'center', color: T.textMuted, fontSize: 20, lineHeight: 1 }}>|</div>

                    <StepCard
                        step="3"
                        title="Quest（冒険）"
                        desc="ストーリー仕立てで新しいフレーズに出会う。10カテゴリ、250フレーズ。「捕まえる」を押すとトレーニングに追加される。もっと集めて、もっと育てろ。"
                        href="/english/quest"
                        color={T.blue}
                        tag="EXPLORE -- もっと集める"
                    />
                </div>

                {/* ── ESSENTIALS ── */}
                <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <div style={{ width: 4, height: 24, backgroundColor: T.textMuted, borderRadius: 2 }} />
                        <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, margin: 0 }}>サポート</h2>
                    </div>
                    <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 16, paddingLeft: 16, letterSpacing: '0.05em' }}>
                        困ったらここ。設定もここ。
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, marginBottom: 56 }}>
                    <FeatureCard href="/english/training/guide" title="ガイド" desc="トレーニングの遊び方。チャクラレベル、スロット、カードの仕組みを全部解説。" tag="HELP" tagColor={T.green} />
                    <FeatureCard href="/english/dashboard" title="ダッシュボード" desc="XP推移グラフ、レビューヒートマップ、チャクラ分布。自分の成長を数字で見る。" />
                    <FeatureCard href="/english/training/card-preview" title="カードコレクション" desc="捕まえたフレーズをカードとして閲覧。3Dチルトエフェクト。ランク別に並ぶ。" />
                    <FeatureCard href="/english/settings" title="設定" desc="サウンド、エフェクト、データ管理。スロット演出のON/OFF、チュートリアルリセット。" tag="NEW" tagColor={T.gold} />
                </div>

                {/* ── MORE FEATURES (collapsible) ── */}
                <div style={{ marginBottom: 48 }}>
                    <button
                        onClick={() => setShowAll(!showAll)}
                        style={{
                            width: '100%', padding: '14px 24px',
                            backgroundColor: T.surface, borderRadius: 14,
                            border: '1px solid #E7E5E4', boxShadow: T.shadow,
                            cursor: 'pointer', display: 'flex',
                            alignItems: 'center', justifyContent: 'space-between',
                            fontSize: 14, fontWeight: 600, color: T.text,
                        }}
                    >
                        <span>もっと見る（上級者向け機能）</span>
                        <span style={{
                            fontSize: 18, color: T.textMuted,
                            transition: 'transform 0.2s',
                            transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}>v</span>
                    </button>

                    {showAll && (
                        <div style={{ marginTop: 16 }}>
                            {/* Listening & Speaking */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, letterSpacing: '0.15em', marginBottom: 12, paddingLeft: 4 }}>
                                    LISTENING / SPEAKING
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                                    <FeatureCard href="/memoria" title="Memoria" desc="ネイティブ会話リスニング。7シナリオ、40人以上のキャラ。日英対訳。" tag="LISTENING" tagColor={T.blue} />
                                    <FeatureCard href="/english/requiem" title="Requiem" desc="シナリオ別の単語復習。1シナリオ = 50単語 x 5日間。" />
                                    <FeatureCard href="/english/pro" title="Pro" desc="ジャーナルから抽出した表現を深掘り解説。各回4-6個。" />
                                    <FeatureCard href="/english/conversation" title="日常会話マスター" desc="場面別の会話パターン集。" />
                                    <FeatureCard href="/english/eikaiwa-lab" title="英会話Lab" desc="DMM英会話レッスンプラン。ChatGPT連携で予習。" />
                                    <FeatureCard href="/english/speaking-guide" title="スピーキングガイド" desc="ネイティブの音声構造分析。7ルールと10パターン。" />
                                </div>
                            </div>

                            {/* Vocabulary */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, letterSpacing: '0.15em', marginBottom: 12, paddingLeft: 4 }}>
                                    VOCABULARY / REFERENCE
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                                    <FeatureCard href="/english/goroku" title="俺語録" desc="310個の日本語表現を自然な英語に。カレンダーUIで毎日10個。" />
                                    <FeatureCard href="/english/tonio-words" title="TONIO WORDS" desc="TOEIC単語ブラウザ。レベル別。Talk Modeで会話練習。" />
                                    <FeatureCard href="/english/everyday-words" title="日常英単語" desc="毎日5単語。200日分のコンテンツ。" />
                                    <FeatureCard href="/english/nihongo" title="日本語から学ぶ" desc="日本語の発想から英語へ。逆引き辞書。" />
                                    <FeatureCard href="/english/training/card-preview" title="カードコレクション" desc="捕まえたフレーズをカードで閲覧。3Dチルトエフェクト。" />
                                </div>
                            </div>

                            {/* Tools */}
                            <div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: T.textMuted, letterSpacing: '0.15em', marginBottom: 12, paddingLeft: 4 }}>
                                    TOOLS
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                                    <FeatureCard href="/english/dashboard" title="ダッシュボード" desc="XP推移、レビューヒートマップ、チャクラ分布。成長の可視化。" />
                                    <FeatureCard href="/english/self-master" title="セルフマスター" desc="自分で話す練習。トピック別スピーキング課題。" />
                                    <FeatureCard href="/english/settings" title="設定" desc="スロットON/OFF、フィーバーモード、表示設定。" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── DEV STATUS ── */}
                <div style={{
                    backgroundColor: T.surface, borderRadius: 14, padding: 24,
                    boxShadow: T.shadow, border: '1px solid #E7E5E4', marginBottom: 48,
                }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: '0.15em', marginBottom: 12 }}>
                        DEV STATUS
                    </div>
                    <p style={{ fontSize: 13, color: T.textSub, lineHeight: 2, margin: '0 0 16px' }}>
                        このアプリはまだ<span style={{ fontWeight: 700, color: T.gold }}>全体の10分の1</span>もできてない。<br />
                        毎日何かが増える。毎日何かが壊れる。毎日何かが直る。<br />
                        完成を待ってたら永遠に喋れない。だから今のまま公開してる。
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {[
                            { label: 'Training', done: true },
                            { label: 'Quest', done: true },
                            { label: 'Slot Machine', done: true },
                            { label: 'Puzzle Battle', done: true },
                            { label: 'Mario Runner', done: true },
                            { label: 'Arena', done: true },
                            { label: 'Memoria', done: true },
                            { label: 'Card Collection', done: true },
                            { label: 'Dashboard', done: true },
                            { label: 'Goroku', done: true },
                            { label: '5min English', done: true },
                            { label: 'AI Tutor', done: false },
                            { label: 'Multiplayer', done: false },
                            { label: 'Story Mode', done: false },
                            { label: 'PvP Battle', done: false },
                            { label: 'Leaderboard', done: false },
                        ].map((item) => (
                            <span key={item.label} style={{
                                fontSize: 10, padding: '4px 10px', borderRadius: 6,
                                backgroundColor: item.done ? T.green + '12' : '#F5F5F4',
                                color: item.done ? T.green : T.textMuted,
                                fontWeight: 600, letterSpacing: '0.03em',
                                border: `1px solid ${item.done ? T.green + '30' : '#E7E5E4'}`,
                            }}>
                                {item.done ? 'LIVE' : 'SOON'} {item.label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div style={{ textAlign: 'center', padding: '24px 0', borderTop: '1px solid #E7E5E4' }}>
                    <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: '0.15em', marginBottom: 8 }}>
                        ENGLISH QUEST RPG -- TONIO LAB
                    </div>
                    <div style={{ fontSize: 11, color: T.textMuted }}>
                        Built with Vibe Coding + Claude AI
                    </div>
                </div>
            </div>
        </div>
    );
}
