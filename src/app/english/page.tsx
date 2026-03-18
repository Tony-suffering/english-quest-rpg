'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const T = {
    bg: '#FFFBEB',
    bgMain: '#F0EFE9',
    surface: '#FFFFFF',
    text: '#1C1917',
    textSub: '#57534E',
    textMuted: '#A8A29E',
    gold: '#D4AF37',
    goldBg: '#D4AF3710',
    goldBorder: '#D4AF3730',
    green: '#10B981',
    blue: '#3B82F6',
    purple: '#8B5CF6',
    red: '#EF4444',
    pink: '#EC4899',
    orange: '#F97316',
    shadow: '0 2px 8px rgba(0,0,0,0.06)',
    shadowMd: '0 4px 16px rgba(0,0,0,0.08)',
};

const WEEK_PREVIEW = [
    { week: 1, title: 'Part 2 -- カウンターに座る', desc: '間接応答・WH疑問文・提案/申し出・付加疑問', color: T.gold, days: '1-7' },
    { week: 2, title: 'Part 3 -- 常連になる', desc: 'パラフレーズ・3人会話・先読み・推測', color: T.green, days: '8-14' },
    { week: 3, title: 'Part 4 -- 一人で聞ける', desc: 'アナウンス・留守電・グラフィック・意図', color: T.blue, days: '15-21' },
    { week: 4, title: '総合力 -- 聞くから使うへ', desc: 'パラフレーズ発話・音変化・スピーキング・模試', color: T.purple, days: '22-30' },
];

const SKILL_CARDS = [
    {
        icon: 'L', color: T.gold, label: 'Listening',
        title: 'TOEIC L&R リスニング',
        desc: '30エピソードのストーリーで全Partを攻略。罠パターン・パラフレーズ・音変化を体系的に学ぶ。',
    },
    {
        icon: 'S', color: T.green, label: 'Speaking',
        title: 'スピーキング力',
        desc: '会話ストーリーをシャドーイング。Part 2の応答パターンはそのまま会話の型になる。音変化の練習は発音矯正。',
    },
    {
        icon: 'W', color: T.blue, label: 'Writing',
        title: 'ライティング力',
        desc: '167のパラフレーズパターンは言い換え作文の武器。語彙150フレーズを使って書く練習。正確な表現選択力。',
    },
];

export default function EnglishHomePage() {
    const [progress, setProgress] = useState({ completed: 0, total: 30 });

    useEffect(() => {
        try {
            const raw = localStorage.getItem('izakaya_30day_progress');
            if (raw) {
                const days = JSON.parse(raw) as number[];
                setProgress({ completed: days.length, total: 30 });
            }
        } catch {}
    }, []);

    const pct = Math.round((progress.completed / progress.total) * 100);

    return (
        <div style={{ minHeight: '100vh', background: T.bgMain }}>
            <style>{`
                @keyframes izk-fadein { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes izk-glow { 0%, 100% { box-shadow: 0 0 20px rgba(212,175,55,0.15); } 50% { box-shadow: 0 0 40px rgba(212,175,55,0.3); } }
            `}</style>

            {/* Hero */}
            <div style={{
                background: `linear-gradient(180deg, ${T.bg} 0%, ${T.bgMain} 100%)`,
                borderBottom: '1px solid #E7E5E4',
                padding: '48px 20px 40px',
                textAlign: 'center',
                animation: 'izk-fadein 0.6s ease-out',
            }}>
                <div style={{
                    display: 'inline-block', padding: '3px 14px',
                    background: T.goldBg, border: `1px solid ${T.goldBorder}`,
                    borderRadius: 4, fontSize: 10, fontWeight: 700, color: T.gold,
                    letterSpacing: 3, marginBottom: 16,
                }}>
                    30-DAY PROGRAM
                </div>

                <h1 style={{
                    fontSize: 'clamp(32px, 8vw, 48px)', fontWeight: 900,
                    margin: '0 0 4px', letterSpacing: -1, lineHeight: 1.2,
                }}>
                    <span style={{ color: '#92400E' }}>TOEIC</span>
                    <span style={{ color: T.gold }}>酒場</span>
                </h1>
                <p style={{ fontSize: 12, color: T.textMuted, margin: '0 0 16px', fontStyle: 'italic' }}>
                    -- 路地裏の居酒屋「のれん」 --
                </p>

                <p style={{
                    fontSize: 16, fontWeight: 600, color: T.text,
                    maxWidth: 480, margin: '0 auto 8px', lineHeight: 1.8,
                }}>
                    30日でTOEICの点数UP。
                </p>
                <p style={{
                    fontSize: 14, color: T.textSub,
                    maxWidth: 480, margin: '0 auto 24px', lineHeight: 1.8,
                }}>
                    しかもスピーキングとライティングも同時に鍛わる。<br />
                    居酒屋の常連たちと一緒に、笑いながら。
                </p>

                <Link href="/english/izakaya-toeic/program" style={{
                    display: 'inline-block', padding: '14px 36px',
                    background: T.gold, color: '#fff', borderRadius: 10,
                    fontWeight: 800, fontSize: 16, textDecoration: 'none',
                    boxShadow: `0 4px 20px ${T.gold}40`,
                    animation: 'izk-glow 3s ease-in-out infinite',
                }}>
                    {progress.completed > 0
                        ? `Day ${progress.completed + 1} から続ける`
                        : '30日間プログラムを始める'
                    }
                </Link>

                {progress.completed > 0 && (
                    <div style={{ marginTop: 16 }}>
                        <div style={{ fontSize: 10, color: T.textMuted, marginBottom: 4 }}>PROGRESS</div>
                        <div style={{
                            width: 200, height: 4, background: '#E7E5E4', borderRadius: 2,
                            margin: '0 auto', overflow: 'hidden',
                        }}>
                            <div style={{
                                height: '100%', width: `${pct}%`,
                                background: `linear-gradient(90deg, ${T.gold}, #F59E0B)`,
                                borderRadius: 2, transition: 'width 0.6s',
                            }} />
                        </div>
                        <div style={{ fontSize: 11, color: T.gold, fontWeight: 700, marginTop: 4 }}>
                            {progress.completed}/30 days ({pct}%)
                        </div>
                    </div>
                )}
            </div>

            <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 16px 60px' }}>

                {/* Concept: 3 Skills */}
                <div style={{ marginBottom: 24 }}>
                    <div style={{
                        fontSize: 10, fontWeight: 700, color: T.gold, letterSpacing: 2, marginBottom: 12,
                    }}>
                        WHY TOEIC酒場?
                    </div>
                    <p style={{ fontSize: 14, color: T.textSub, lineHeight: 1.8, margin: '0 0 16px' }}>
                        普通のTOEICアプリは問題を解くだけ。点数は上がるけど、喋れない。書けない。<br />
                        TOEIC酒場は違う。<strong style={{ color: T.text }}>ストーリーで学ぶから、3つのスキルが同時に伸びる。</strong>
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {SKILL_CARDS.map(card => (
                            <div key={card.label} style={{
                                display: 'flex', gap: 14, alignItems: 'flex-start',
                                padding: '16px', background: T.surface, borderRadius: 12,
                                border: `1px solid #E7E5E4`, boxShadow: T.shadow,
                            }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: 8,
                                    background: card.color + '10', border: `1.5px solid ${card.color}30`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 900, fontSize: 14, color: card.color, flexShrink: 0,
                                }}>{card.icon}</div>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 2 }}>
                                        {card.title}
                                    </div>
                                    <div style={{ fontSize: 12, color: T.textSub, lineHeight: 1.7 }}>
                                        {card.desc}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 30-Day Roadmap Preview */}
                <div style={{
                    background: T.surface, borderRadius: 14, border: `1px solid #E7E5E4`,
                    overflow: 'hidden', boxShadow: T.shadowMd, marginBottom: 24,
                }}>
                    <div style={{
                        padding: '16px 18px 12px',
                        borderBottom: `1px solid #E7E5E4`,
                    }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: T.gold, letterSpacing: 2, marginBottom: 4 }}>
                            30-DAY ROADMAP
                        </div>
                        <div style={{ fontSize: 13, color: T.textSub }}>
                            30日間のストーリーで全Partを攻略
                        </div>
                    </div>
                    {WEEK_PREVIEW.map(w => (
                        <div key={w.week} style={{
                            display: 'flex', gap: 12, alignItems: 'center',
                            padding: '14px 18px',
                            borderBottom: '1px solid #f5f5f4',
                        }}>
                            <div style={{
                                width: 32, height: 32, borderRadius: 8,
                                background: w.color + '10', border: `1.5px solid ${w.color}30`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 900, fontSize: 12, color: w.color, flexShrink: 0,
                            }}>W{w.week}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{w.title}</div>
                                <div style={{ fontSize: 11, color: T.textMuted }}>{w.desc}</div>
                            </div>
                            <span style={{ fontSize: 10, color: T.textMuted, fontWeight: 600, flexShrink: 0 }}>
                                Day {w.days}
                            </span>
                        </div>
                    ))}
                    <div style={{ padding: '12px 18px', textAlign: 'center' }}>
                        <Link href="/english/izakaya-toeic/program" style={{
                            fontSize: 13, fontWeight: 700, color: T.gold, textDecoration: 'none',
                        }}>
                            カレンダーを見る {'>'}
                        </Link>
                    </div>
                </div>

                {/* Content Stats */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
                    marginBottom: 24,
                }}>
                    {[
                        { num: '30', label: 'エピソード', sub: 'ストーリー' },
                        { num: '167', label: 'パラフレーズ', sub: 'パターン' },
                        { num: '150+', label: 'TOEIC頻出', sub: 'フレーズ' },
                    ].map(stat => (
                        <div key={stat.label} style={{
                            textAlign: 'center', padding: '16px 8px',
                            background: T.surface, borderRadius: 10,
                            border: '1px solid #E7E5E4', boxShadow: T.shadow,
                        }}>
                            <div style={{ fontSize: 24, fontWeight: 900, color: T.gold }}>{stat.num}</div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{stat.label}</div>
                            <div style={{ fontSize: 9, color: T.textMuted }}>{stat.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Quick Access */}
                <div style={{ marginBottom: 24 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: 2, marginBottom: 10 }}>
                        QUICK ACCESS
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {[
                            { href: '/english/izakaya-toeic/program', icon: '30', iconColor: '#fff', iconBg: T.gold, title: '30日間プログラム', sub: 'カレンダーで進捗管理' },
                            { href: '/english/izakaya-toeic', icon: 'EP', iconColor: T.gold, iconBg: T.goldBg, title: 'エピソード一覧', sub: '30話のストーリーとクイズ' },
                            { href: '/english/izakaya-toeic/drills', icon: 'R', iconColor: T.pink, iconBg: T.pink + '08', title: 'Part 2 速射ドリル', sub: '130問 -- 反射で答える特訓' },
                            { href: '/english/training', icon: 'T', iconColor: T.green, iconBg: T.green + '08', title: '単語トレーニング', sub: 'スロットで語彙を鍛える' },
                            { href: '/english/izakaya-toeic/paraphrase', icon: 'P', iconColor: T.gold, iconBg: T.goldBg, title: 'パラフレーズ辞典', sub: '167パターン -- スピーキング&ライティングの武器' },
                            { href: '/english/izakaya-toeic/sounds', icon: 'W', iconColor: T.blue, iconBg: T.blue + '08', title: '音変化辞典', sub: '90パターン -- 聞こえない理由がわかる' },
                            { href: '/english/izakaya-toeic/guide', icon: 'G', iconColor: T.purple, iconBg: T.purple + '08', title: 'Part別攻略ガイド', sub: 'Part 1-4のテクニックと頻出パターン' },
                            { href: '/english/izakaya-toeic/traps', icon: 'X', iconColor: T.red, iconBg: T.red + '08', title: '罠パターン', sub: '17種の引っかけを完全分類' },
                            { href: '/english/izakaya-toeic/score', icon: 'D', iconColor: T.purple, iconBg: T.purple + '08', title: 'スコア診断', sub: '弱点分析・学習プラン' },
                            { href: '/english/izakaya-toeic/achievements', icon: 'B', iconColor: T.gold, iconBg: T.goldBg, title: '実績バッジ', sub: '23個の居酒屋の勲章' },
                        ].map(item => (
                            <Link key={item.href} href={item.href} style={{
                                display: 'flex', gap: 10, alignItems: 'center',
                                padding: '10px 12px', borderRadius: 8,
                                textDecoration: 'none', color: T.text,
                                transition: 'background 0.15s',
                            }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: 7,
                                    background: item.iconBg, border: `1.5px solid ${item.iconColor}30`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 11, fontWeight: 900, color: item.iconColor, flexShrink: 0,
                                }}>{item.icon}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 700, fontSize: 13 }}>{item.title}</div>
                                    <div style={{ fontSize: 11, color: T.textMuted }}>{item.sub}</div>
                                </div>
                                <span style={{ fontSize: 11, color: T.textMuted }}>{'>'}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Master Quote */}
                <div style={{
                    padding: '18px 20px', background: T.surface, borderRadius: 12,
                    borderLeft: `3px solid ${T.gold}`, boxShadow: T.shadow, marginBottom: 24,
                }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: '#78350F15', border: '2px solid #78350F',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 900, fontSize: 13, color: '#78350F', flexShrink: 0,
                        }}>権</div>
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: '#78350F', marginBottom: 4 }}>マスター</div>
                            <div style={{ fontSize: 14, color: T.text, lineHeight: 1.8, fontWeight: 500 }}>
                                「TOEICを『解く』から『使う』に変えろ。
                                そうすればリスニングもスピーキングも同時に伸びる。」
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{ textAlign: 'center', padding: '24px 0', borderTop: '1px solid #E7E5E4' }}>
                    <div style={{ fontSize: 10, color: T.textMuted, letterSpacing: '0.15em', marginBottom: 4 }}>
                        TOEIC酒場 -- TONIO LAB
                    </div>
                    <div style={{ fontSize: 11, color: T.textMuted }}>
                        Built with Vibe Coding + Claude AI
                    </div>
                </div>
            </div>
        </div>
    );
}
