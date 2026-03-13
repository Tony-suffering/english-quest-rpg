'use client';

import { useState } from 'react';
import Link from 'next/link';

interface GuideSection {
    id: string;
    title: string;
    icon: string;
    color: string;
    content: React.ReactNode;
}

export default function RPGGuidePage() {
    const [activeSection, setActiveSection] = useState('overview');

    const sections: GuideSection[] = [
        {
            id: 'overview', title: 'ゲームの全体像', icon: '1', color: '#D4AF37',
            content: (
                <div>
                    <p style={{ fontSize: '14px', color: '#E7E5E4', lineHeight: 1.8, marginBottom: '20px' }}>
                        English Quest RPG は英語フレーズを「ポケモン」のように捕まえて、育てて、戦わせるゲーム。
                        毎日プレイすることで、自然に英語が身につく。
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                        {[
                            { step: '1. 冒険に出る', desc: 'Questでフレーズと出会い、クイズで捕まえる', page: 'Quest', color: '#EF4444', link: '/english/quest' },
                            { step: '2. カードを育てる', desc: 'Trainingでパズルバトル。GPを稼いでカードを進化', page: 'Training', color: '#D4AF37', link: '/english/training' },
                            { step: '3. バトルで試す', desc: 'Arenaで腕試し。クイズやカードバトル', page: 'Arena', color: '#3B82F6', link: '/english/arena' },
                            { step: '4. 世界を制覇する', desc: 'World Mapでステージを解放。バッジを集める', page: 'World Map', color: '#10B981', link: '/english/world-map' },
                        ].map((item, i) => (
                            <Link key={i} href={item.link} style={{
                                display: 'flex', alignItems: 'center', gap: '14px',
                                padding: '14px 16px', backgroundColor: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none',
                            }}>
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '50%',
                                    backgroundColor: item.color, display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    color: '#fff', fontWeight: 900, fontSize: '14px', flexShrink: 0,
                                }}>
                                    {i + 1}
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#FAFAF9' }}>{item.step}</div>
                                    <div style={{ fontSize: '12px', color: '#78716C', marginTop: '2px' }}>{item.desc}</div>
                                </div>
                                <div style={{ marginLeft: 'auto', fontSize: '11px', color: item.color, fontWeight: 600, flexShrink: 0 }}>
                                    {item.page} →
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div style={{
                        padding: '12px 16px', backgroundColor: 'rgba(212,175,55,0.08)',
                        border: '1px solid rgba(212,175,55,0.15)', textAlign: 'center',
                        fontSize: '12px', color: '#D4AF37',
                    }}>
                        このループを毎日繰り返す = 英語力が上がる
                    </div>
                </div>
            ),
        },
        {
            id: 'quest', title: 'Quest -- 冒険モード', icon: '2', color: '#EF4444',
            content: (
                <div>
                    <p style={{ fontSize: '14px', color: '#E7E5E4', lineHeight: 1.8, marginBottom: '20px' }}>
                        ポケモンでいう「草むらでポケモンに出会う」パート。英語フレーズがワイルドに出現する。
                    </p>

                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#EF4444', marginBottom: '10px', letterSpacing: '1px' }}>遊び方</h4>
                        {[
                            'ステージを選ぶ（東京、LA、シアトル...）',
                            'シナリオの説明を読む',
                            'フレーズが「Wild phrase appeared!」で出現',
                            'Catch! を押してクイズに挑戦',
                            '正解 = GET! 不正解 = もう一度',
                            '全フレーズGET後、ジムリーダー戦',
                            '5問中3問正解でバッジ獲得!',
                        ].map((text, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: '10px', padding: '6px 0',
                                fontSize: '13px', color: '#A8A29E',
                            }}>
                                <span style={{ color: '#EF4444', fontWeight: 700, width: '20px', flexShrink: 0 }}>{i + 1}.</span>
                                <span>{text}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        padding: '12px 16px', backgroundColor: 'rgba(239,68,68,0.05)',
                        border: '1px solid rgba(239,68,68,0.15)',
                        fontSize: '12px', color: '#78716C', lineHeight: 1.6,
                    }}>
                        各ステージ = 50フレーズ + ジムリーダー。6ステージで300フレーズ。
                    </div>
                </div>
            ),
        },
        {
            id: 'training', title: 'Training -- 育成', icon: '3', color: '#D4AF37',
            content: (
                <div>
                    <p style={{ fontSize: '14px', color: '#E7E5E4', lineHeight: 1.8, marginBottom: '20px' }}>
                        ポケモンでいう「レベル上げ」。パズルボードバトルとガチャでカードを育てる。
                    </p>

                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#D4AF37', marginBottom: '10px', letterSpacing: '1px' }}>パズルボードバトル</h4>
                    <div style={{ marginBottom: '20px', fontSize: '13px', color: '#A8A29E', lineHeight: 1.7 }}>
                        2x2 / 3x3 / 4x4 のグリッドにカードを配置。カードの組み合わせで「シナジー」が発動。
                        ボスを倒すとGP(ガチャポイント)を獲得。
                    </div>

                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#D4AF37', marginBottom: '10px', letterSpacing: '1px' }}>シナジー例</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '20px' }}>
                        {[
                            { name: 'RAINBOW', desc: '全5属性', mult: 'x2.5' },
                            { name: 'MONO', desc: '60%同属性', mult: 'x1.8' },
                            { name: 'ELITE SQUAD', desc: 'GOLD以上3枚', mult: 'x1.5' },
                            { name: 'S-TIER ARMY', desc: 'BST600族2枚', mult: 'x2.0' },
                        ].map(s => (
                            <div key={s.name} style={{
                                padding: '8px 10px', backgroundColor: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                            }}>
                                <div style={{ fontSize: '11px', fontWeight: 700, color: '#D4AF37' }}>{s.name}</div>
                                <div style={{ fontSize: '11px', color: '#78716C' }}>{s.desc}</div>
                                <div style={{ fontSize: '12px', fontWeight: 700, color: '#FAFAF9', marginTop: '2px' }}>{s.mult}</div>
                            </div>
                        ))}
                    </div>

                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#D4AF37', marginBottom: '10px', letterSpacing: '1px' }}>ガチャシステム</h4>
                    <div style={{ fontSize: '13px', color: '#A8A29E', lineHeight: 1.7, marginBottom: '12px' }}>
                        バトル後にスロットマシンが回転。9段階の当たり（凡→PHANTOM）。
                        チェインが続くと確率アップ（確変→激熱→神モード）。
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {[
                            { tier: 'PHANTOM', color: '#fff', bg: '#1C1917' },
                            { tier: 'SHINY', color: '#06B6D4', bg: '#164E63' },
                            { tier: 'MYTHIC', color: '#EC4899', bg: '#831843' },
                            { tier: 'LEGENDARY', color: '#D4AF37', bg: '#422006' },
                            { tier: 'MEGA', color: '#8B5CF6', bg: '#3B0764' },
                            { tier: 'SUPER', color: '#EF4444', bg: '#450A0A' },
                        ].map(t => (
                            <span key={t.tier} style={{
                                fontSize: '9px', fontWeight: 700, padding: '3px 6px',
                                backgroundColor: t.bg, color: t.color, border: `1px solid ${t.color}30`,
                            }}>
                                {t.tier}
                            </span>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: 'cards', title: 'カードシステム', icon: '4', color: '#8B5CF6',
            content: (
                <div>
                    <p style={{ fontSize: '14px', color: '#E7E5E4', lineHeight: 1.8, marginBottom: '20px' }}>
                        各フレーズ = 1枚のカード。ポケモンカードのように属性、ステータス、ランクがある。
                    </p>

                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#8B5CF6', marginBottom: '10px', letterSpacing: '1px' }}>カードランク</h4>
                    <div style={{ marginBottom: '20px' }}>
                        {[
                            { rank: 'NORMAL', gp: '0', color: '#78716C', desc: '無地' },
                            { rank: 'BRONZE', gp: '5', color: '#CD7F32', desc: '銅枠' },
                            { rank: 'SILVER', gp: '20', color: '#94A3B8', desc: '銀枠+微光' },
                            { rank: 'GOLD', gp: '50', color: '#F6C85F', desc: '金枠+光沢' },
                            { rank: 'HOLOGRAPHIC', gp: '100', color: '#A855F7', desc: 'ホロ+プリズム' },
                            { rank: 'LEGENDARY', gp: '250', color: '#D4AF37', desc: '宇宙枠+パーティクル' },
                        ].map(r => (
                            <div key={r.rank} style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
                            }}>
                                <span style={{
                                    fontSize: '10px', fontWeight: 700, padding: '2px 8px',
                                    color: r.color, border: `1px solid ${r.color}40`,
                                    backgroundColor: `${r.color}10`, width: '100px',
                                }}>
                                    {r.rank}
                                </span>
                                <span style={{ fontSize: '12px', color: '#78716C', width: '40px' }}>{r.gp} GP</span>
                                <span style={{ fontSize: '12px', color: '#A8A29E' }}>{r.desc}</span>
                            </div>
                        ))}
                    </div>

                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#8B5CF6', marginBottom: '10px', letterSpacing: '1px' }}>属性 (5種)</h4>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                        {[
                            { name: '火', color: '#EF4444' },
                            { name: '水', color: '#3B82F6' },
                            { name: '風', color: '#10B981' },
                            { name: '地', color: '#A16207' },
                            { name: '雷', color: '#EAB308' },
                        ].map(e => (
                            <div key={e.name} style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                backgroundColor: `${e.color}20`, border: `2px solid ${e.color}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '14px', fontWeight: 700, color: e.color,
                            }}>
                                {e.name}
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: '12px', color: '#78716C', lineHeight: 1.6 }}>
                        相性: 火→風→地→雷→水→火 (有利なら+25%ダメージ)
                    </div>

                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#8B5CF6', marginBottom: '10px', marginTop: '20px', letterSpacing: '1px' }}>BST (種族値)</h4>
                    <div style={{ fontSize: '13px', color: '#A8A29E', lineHeight: 1.7 }}>
                        HP / ATK / DEF / SPA / SPD / SPE の6ステータス。
                        カードID(nanoid)の最初の6文字から自動算出。ポケモンのように「生まれた時から決まってる」。
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                        {[
                            { tier: 'S (600族)', color: '#D4AF37' },
                            { tier: 'A (530+)', color: '#A855F7' },
                            { tier: 'B (470+)', color: '#3B82F6' },
                            { tier: 'C (400+)', color: '#10B981' },
                            { tier: 'D (330+)', color: '#78716C' },
                            { tier: 'F (コイキング)', color: '#EF4444' },
                        ].map(t => (
                            <span key={t.tier} style={{
                                fontSize: '10px', fontWeight: 600, padding: '3px 8px',
                                color: t.color, border: `1px solid ${t.color}30`,
                            }}>
                                {t.tier}
                            </span>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: 'arena', title: 'Arena -- バトル', icon: '5', color: '#3B82F6',
            content: (
                <div>
                    <p style={{ fontSize: '14px', color: '#E7E5E4', lineHeight: 1.8, marginBottom: '20px' }}>
                        育てたカードで戦う。クイズバトルとカードバトルの2モード。
                    </p>

                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#3B82F6', marginBottom: '10px', letterSpacing: '1px' }}>クイズバトル</h4>
                    <div style={{ fontSize: '13px', color: '#A8A29E', lineHeight: 1.7, marginBottom: '20px' }}>
                        4種類のクイズ（意味/逆引き/穴埋め/リスニング）で連続正解を目指す。
                        正解でSP(スパーク)獲得。SPが溜まるとカードランクが上がる。
                    </div>

                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#3B82F6', marginBottom: '10px', letterSpacing: '1px' }}>5v5カードバトル</h4>
                    <div style={{ fontSize: '13px', color: '#A8A29E', lineHeight: 1.7, marginBottom: '12px' }}>
                        5枚のカードを選んでCPUと対戦。4つの軸で勝負:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                        {[
                            { axis: '属性相性', desc: '火→風→地→雷→水の有利不利', color: '#EF4444' },
                            { axis: 'BST', desc: '種族値の合計で比較', color: '#D4AF37' },
                            { axis: 'チャクラLv', desc: '学習段階(EGG→MASTER)', color: '#8B5CF6' },
                            { axis: 'SP', desc: '蓄積ガチャポイント', color: '#10B981' },
                        ].map(a => (
                            <div key={a.axis} style={{
                                display: 'flex', gap: '10px', padding: '8px 12px',
                                backgroundColor: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                            }}>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: a.color, width: '70px', flexShrink: 0 }}>{a.axis}</span>
                                <span style={{ fontSize: '12px', color: '#78716C' }}>{a.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            id: 'worldmap', title: 'World Map -- 冒険の地図', icon: '6', color: '#10B981',
            content: (
                <div>
                    <p style={{ fontSize: '14px', color: '#E7E5E4', lineHeight: 1.8, marginBottom: '20px' }}>
                        ポケモンのタウンマップ。各都市がステージ。クリアするとバッジが手に入る。
                    </p>

                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#10B981', marginBottom: '10px', letterSpacing: '1px' }}>ステージ一覧</h4>
                    {[
                        { id: 1, city: '東京', title: '大学パーティー', leader: 'Tyler' },
                        { id: 2, city: 'ロサンゼルス', title: 'モンスター退治', leader: 'Timmy' },
                        { id: 3, city: 'シアトル', title: '野球トレード談義', leader: 'Kai' },
                        { id: 4, city: 'ニューヨーク', title: '映画デビュー', leader: 'Jayden' },
                        { id: 5, city: 'ロンドン', title: 'ゲームナイト', leader: 'Jess' },
                        { id: 6, city: 'パリ', title: '骨董鑑定', leader: 'Uncle Ray' },
                    ].map(s => (
                        <div key={s.id} style={{
                            display: 'flex', gap: '12px', padding: '8px 0',
                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                            fontSize: '13px',
                        }}>
                            <span style={{ color: '#D4AF37', fontWeight: 700, width: '20px' }}>{s.id}</span>
                            <span style={{ color: '#FAFAF9', width: '90px' }}>{s.city}</span>
                            <span style={{ color: '#78716C', flex: 1 }}>{s.title}</span>
                            <span style={{ color: '#A8A29E', fontWeight: 600 }}>{s.leader}</span>
                        </div>
                    ))}

                    <div style={{
                        marginTop: '20px', padding: '12px 16px',
                        backgroundColor: 'rgba(16,185,129,0.05)',
                        border: '1px solid rgba(16,185,129,0.15)',
                        fontSize: '12px', color: '#78716C', lineHeight: 1.6,
                    }}>
                        各ステージ50フレーズ。全50語GET + ジムリーダー撃破 = バッジ獲得。
                        6バッジ集めたら...?
                    </div>
                </div>
            ),
        },
        {
            id: 'evolution', title: 'チャクラ進化', icon: '7', color: '#EC4899',
            content: (
                <div>
                    <p style={{ fontSize: '14px', color: '#E7E5E4', lineHeight: 1.8, marginBottom: '20px' }}>
                        ポケモンの進化。各カードは学習段階に応じて7段階に進化する。
                    </p>

                    {[
                        { lv: 0, name: 'EGG', ja: 'タマゴ', xp: 0, action: 'フレーズ登録', color: '#78716C' },
                        { lv: 1, name: 'HATCH', ja: '孵化', xp: 5, action: '初回タップ', color: '#B91C1C' },
                        { lv: 2, name: 'ROOKIE', ja: 'ルーキー', xp: 15, action: '2回目タップ', color: '#C2410C' },
                        { lv: 3, name: 'FIGHTER', ja: 'ファイター', xp: 30, action: '3回目+録音', color: '#A16207' },
                        { lv: 4, name: 'CHAMPION', ja: 'チャンピオン', xp: 60, action: 'リンク追加+継続', color: '#166534' },
                        { lv: 5, name: 'ELITE', ja: 'エリート', xp: 80, action: '実戦で使用', color: '#1E40AF' },
                        { lv: 6, name: 'MASTER', ja: 'マスター', xp: 100, action: '完全習得宣言', color: '#6B21A8' },
                    ].map(stage => (
                        <div key={stage.lv} style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
                        }}>
                            <div style={{
                                width: '28px', height: '28px', borderRadius: '50%',
                                backgroundColor: `${stage.color}30`, border: `2px solid ${stage.color}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '11px', fontWeight: 900, color: stage.color, flexShrink: 0,
                            }}>
                                {stage.lv}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#FAFAF9' }}>
                                    {stage.name} <span style={{ color: '#78716C', fontWeight: 400 }}>({stage.ja})</span>
                                </div>
                                <div style={{ fontSize: '11px', color: '#78716C' }}>{stage.action}</div>
                            </div>
                            <span style={{ fontSize: '11px', color: '#D4AF37', fontWeight: 700 }}>{stage.xp} XP</span>
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    const activeData = sections.find(s => s.id === activeSection) || sections[0];

    return (
        <div style={{
            minHeight: '100vh', backgroundColor: '#0F0F0F', color: '#FAFAF9',
            display: 'flex', flexDirection: 'column',
        }}>
            {/* Header */}
            <div style={{
                padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
                <div>
                    <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#D4AF37', letterSpacing: '2px' }}>
                        RPG GUIDE
                    </h1>
                    <p style={{ fontSize: '11px', color: '#78716C', letterSpacing: '1px', marginTop: '2px' }}>
                        English Quest RPG
                    </p>
                </div>
                <Link href="/english/training" style={{
                    color: '#78716C', fontSize: '12px', textDecoration: 'none',
                    padding: '6px 12px', border: '1px solid rgba(255,255,255,0.1)',
                }}>
                    Training →
                </Link>
            </div>

            <div style={{ display: 'flex', flex: 1 }}>
                {/* Sidebar nav */}
                <div style={{
                    width: '200px', borderRight: '1px solid rgba(255,255,255,0.06)',
                    padding: '16px 0', flexShrink: 0,
                    display: 'flex', flexDirection: 'column',
                }}>
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '10px 16px', border: 'none', cursor: 'pointer',
                                backgroundColor: activeSection === section.id ? 'rgba(212,175,55,0.08)' : 'transparent',
                                borderLeft: activeSection === section.id ? `3px solid ${section.color}` : '3px solid transparent',
                                textAlign: 'left', width: '100%',
                            }}
                        >
                            <span style={{
                                width: '22px', height: '22px', borderRadius: '50%',
                                backgroundColor: activeSection === section.id ? section.color : 'rgba(255,255,255,0.06)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '10px', fontWeight: 900,
                                color: activeSection === section.id ? '#fff' : '#78716C',
                                flexShrink: 0,
                            }}>
                                {section.icon}
                            </span>
                            <span style={{
                                fontSize: '12px', fontWeight: activeSection === section.id ? 700 : 400,
                                color: activeSection === section.id ? '#FAFAF9' : '#78716C',
                            }}>
                                {section.title}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: '24px 32px', maxWidth: '600px' }}>
                    <h2 style={{
                        fontSize: '18px', fontWeight: 800, color: activeData.color,
                        marginBottom: '20px', letterSpacing: '0.5px',
                    }}>
                        {activeData.title}
                    </h2>
                    {activeData.content}
                </div>
            </div>
        </div>
    );
}
