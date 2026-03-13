'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EnglishSidebar from '@/components/EnglishSidebar';
import { installLocalApi } from '@/lib/local-api';

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

function WelcomeFlow({ onDone }: { onDone: () => void }) {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [phase, setPhase] = useState(0);
    const [closing, setClosing] = useState(false);

    const totalSteps = 7;

    useEffect(() => {
        setPhase(0);
        const t1 = setTimeout(() => setPhase(1), 100);
        const t2 = setTimeout(() => setPhase(2), 1800);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [step]);

    const next = () => {
        if (step === 0 && phase < 2) return;
        if (step < totalSteps - 1) {
            setStep(s => s + 1);
        }
    };

    const prev = () => { if (step > 0) setStep(s => s - 1); };

    const finish = (dest: string) => {
        setClosing(true);
        localStorage.setItem('tl_welcome_seen', 'true');
        setTimeout(() => { window.location.href = dest; }, 400);
    };

    if (closing) {
        return <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: '#000', opacity: 0, transition: 'opacity 0.5s ease' }} />;
    }

    const bg = 'rgba(0,0,0,0.92)';
    const gold = '#D4AF37';
    const green = '#10B981';
    const fadeIn = (delay = 0) => ({
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? 'translateY(0)' : 'translateY(16px)',
        transition: `all 0.7s ease-out ${delay}s`,
    });
    const slideIn = (i: number) => ({
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? 'translateX(0)' : 'translateX(-16px)',
        transition: `all 0.5s ease-out ${0.2 + i * 0.15}s`,
    });

    // Mock UI card for demonstration
    const MockCard = ({ en, ja }: { en: string; ja: string; showAnswer?: boolean }) => (
        <div style={{
            backgroundColor: '#fff', borderRadius: 16, padding: '20px 24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)', border: '1px solid #E7E5E4',
            maxWidth: 320, margin: '0 auto', textAlign: 'center',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 9, color: '#A8A29E', letterSpacing: '0.1em' }}>PHRASE</div>
                <div style={{ fontSize: 9, color: '#CD7F32', fontWeight: 700 }}>BRONZE 12GP</div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#1C1917', marginBottom: 8 }}>{en}</div>
            <div style={{ fontSize: 14, color: '#666', padding: '8px 0', borderTop: '1px solid #F5F5F4' }}>{ja}</div>
        </div>
    );

    // Mock slot result
    const MockSlot = ({ tier, dmg }: { tier: string; dmg: string }) => (
        <div style={{
            backgroundColor: '#1C1917', borderRadius: 14, padding: '16px 20px',
            border: `1px solid ${tier === 'LEGENDARY' ? gold : tier === 'MEGA' ? '#EF4444' : '#333'}`,
            maxWidth: 280, margin: '0 auto', textAlign: 'center',
        }}>
            <div style={{
                fontSize: 22, fontWeight: 900, letterSpacing: '0.1em',
                color: tier === 'LEGENDARY' ? gold : tier === 'MEGA' ? '#EF4444' : tier === 'SUPER' ? '#8B5CF6' : green,
                marginBottom: 8,
            }}>
                {tier}!
            </div>
            <div style={{ fontSize: 13, color: '#888' }}>{dmg} damage</div>
        </div>
    );

    // Mock chakra bar
    const MockChakra = () => (
        <div style={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
                { name: 'EGG', ja: 'タマゴ', color: '#DC2626' },
                { name: 'HATCH', ja: '孵化', color: '#EA580C' },
                { name: 'ROOKIE', ja: 'ルーキー', color: '#CA8A04' },
                { name: 'FIGHTER', ja: 'ファイター', color: '#16A34A' },
                { name: 'CHAMPION', ja: 'チャンピオン', color: '#2563EB' },
                { name: 'ELITE', ja: 'エリート', color: '#4F46E5' },
                { name: 'MASTER', ja: 'マスター', color: '#7C3AED' },
            ].map((s, i) => (
                <div key={s.name} style={{
                    padding: '4px 8px', borderRadius: 6, fontSize: 9, fontWeight: 700,
                    backgroundColor: i <= 2 ? s.color : '#333',
                    color: i <= 2 ? '#fff' : '#555',
                    letterSpacing: '0.05em',
                }}>
                    {s.name}
                </div>
            ))}
        </div>
    );

    // Navigation dots + buttons
    const Nav = ({ showPrev = true, nextLabel = '次へ', onNext = next }: { showPrev?: boolean; nextLabel?: string; onNext?: () => void }) => (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10000, padding: '20px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, background: 'linear-gradient(transparent, rgba(0,0,0,0.95) 40%)' }}>
            {/* Progress dots */}
            <div style={{ display: 'flex', gap: 6 }}>
                {Array.from({ length: totalSteps }, (_, i) => (
                    <div key={i} style={{
                        width: i === step ? 20 : 6, height: 6, borderRadius: 3,
                        backgroundColor: i === step ? gold : i < step ? green : '#333',
                        transition: 'all 0.3s ease',
                    }} />
                ))}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
                {showPrev && step > 0 && (
                    <button onClick={prev} style={{
                        padding: '10px 20px', borderRadius: 10, backgroundColor: 'transparent',
                        border: '1px solid #333', color: '#666', fontSize: 13, cursor: 'pointer',
                    }}>
                        戻る
                    </button>
                )}
                <button onClick={onNext} style={{
                    padding: '12px 32px', borderRadius: 10, backgroundColor: gold,
                    border: 'none', color: '#000', fontSize: 14, fontWeight: 700,
                    cursor: 'pointer', letterSpacing: '0.06em',
                    boxShadow: '0 4px 16px rgba(212,175,55,0.3)',
                    opacity: (step === 0 && phase < 2) ? 0.3 : 1,
                }}>
                    {nextLabel}
                </button>
            </div>
        </div>
    );

    const Screen = ({ children }: { children: React.ReactNode }) => (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', padding: '24px 24px 120px',
            overflowY: 'auto',
        }}>
            <div style={{ maxWidth: 440, width: '100%' }}>{children}</div>
        </div>
    );

    const Label = ({ children, color: c = gold }: { children: React.ReactNode; color?: string }) => (
        <div style={{ fontSize: 10, letterSpacing: '0.3em', color: c, fontWeight: 700, marginBottom: 16, textAlign: 'center', ...fadeIn() }}>
            {children}
        </div>
    );

    const Title = ({ children }: { children: React.ReactNode }) => (
        <div style={{ fontSize: 22, fontWeight: 300, color: '#fff', lineHeight: 1.7, marginBottom: 24, textAlign: 'center', ...fadeIn(0.1) }}>
            {children}
        </div>
    );

    // ── Step 0: Gratitude ──
    if (step === 0) return (
        <>
            <div onClick={next} style={{
                position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.88)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', cursor: phase >= 2 ? 'pointer' : 'default', padding: 24,
            }}>
                <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '2px solid ' + gold, opacity: phase >= 1 ? 0.5 : 0, transform: phase >= 2 ? 'scale(3)' : 'scale(0.5)', transition: 'all 2.5s ease-out', pointerEvents: 'none' }} />
                <div style={{ textAlign: 'center', ...fadeIn(0.3) }}>
                    <div style={{ fontSize: 14, letterSpacing: '0.3em', color: gold, fontWeight: 700, marginBottom: 16 }}>THANK YOU</div>
                    <div style={{ fontSize: 28, fontWeight: 300, color: '#fff', lineHeight: 1.6, marginBottom: 24 }}>開いてくれて、ありがとう。</div>
                </div>
                <div style={{ textAlign: 'center', maxWidth: 400, ...fadeIn(0.8) }}>
                    <div style={{ fontSize: 15, color: '#ccc', lineHeight: 2, fontWeight: 300, opacity: phase >= 2 ? 1 : 0, transition: 'opacity 1s ease' }}>
                        これはまだ完成品じゃない。<br />
                        全体の<span style={{ color: gold, fontWeight: 700 }}>10分の1</span>もできてない。<br />
                        バグもある。壊れてるところもある。<br />
                        それでも触ってくれるあなたの存在が、<br />
                        開発を続ける理由になってます。
                    </div>
                    <div style={{ fontSize: 13, color: '#666', marginTop: 20, opacity: phase >= 2 ? 1 : 0, transition: 'opacity 1s ease 0.5s' }}>
                        感想、バグ報告、「ここ好き」 -- 何でもください。
                    </div>
                </div>
                <Nav showPrev={false} nextLabel="タップして次へ" />
            </div>
        </>
    );

    // ── Step 1: What is this app? ──
    if (step === 1) return (
        <>
            <Screen>
                <Label>WHAT IS THIS?</Label>
                <Title>
                    英語フレーズを<span style={{ fontWeight: 700 }}>カード</span>にして、<br />
                    毎日タップして<span style={{ fontWeight: 700 }}>育てる</span>ゲーム。
                </Title>
                <div style={{ fontSize: 14, color: '#aaa', lineHeight: 2, textAlign: 'center', marginBottom: 24, ...fadeIn(0.3) }}>
                    教科書じゃない。テストでもない。<br />
                    カードをタップ → レベルが上がる → スロットが回る。<br />
                    毎日触ってたらフレーズが頭に残る。そういう設計。
                </div>
                <div style={{ backgroundColor: '#111', borderRadius: 14, padding: '20px 16px', border: '1px solid #222', ...fadeIn(0.5) }}>
                    <div style={{ fontSize: 10, color: '#555', letterSpacing: '0.15em', marginBottom: 12, textAlign: 'center' }}>TRAINING MODE</div>
                    {[
                        { icon: 'S', label: '3リールスロット', desc: 'レベルアップ → スロット回転。LEGENDARY出たら5倍ダメージ', c: gold },
                        { icon: 'B', label: '布陣バトル', desc: 'カードを落としてボスにダメージ。属性相性でダメージ倍率変化', c: '#EF4444' },
                        { icon: 'R', label: 'ランナーモード', desc: '横スクロール。XPを貯めてマイルストーン突破。GODモード到達で全解放', c: '#3B82F6' },
                        { icon: 'C', label: '連荘チェーン', desc: '3連続でフィーバー突入。10連続でGODモード。倍率が跳ね上がる', c: '#8B5CF6' },
                    ].map((f, i) => (
                        <div key={f.label} style={{ display: 'flex', gap: 12, marginBottom: 14, ...slideIn(i) }}>
                            <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: f.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{f.icon}</div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{f.label}</div>
                                <div style={{ fontSize: 11, color: '#666' }}>{f.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Screen>
            <Nav />
        </>
    );

    // ── Step 2: Training screen walkthrough ──
    if (step === 2) return (
        <>
            <Screen>
                <Label>HOW TO PLAY -- STEP 1</Label>
                <Title>フレーズカードが<br /><span style={{ fontWeight: 700 }}>表示される</span>。</Title>
                <div style={{ marginBottom: 20, ...fadeIn(0.3) }}>
                    <MockCard en="How's it going?" ja="調子どう？" showAnswer={true} />
                </div>
                <div style={{ fontSize: 13, color: '#aaa', lineHeight: 2, textAlign: 'center', ...fadeIn(0.5) }}>
                    トレーニング画面を開くと、<br />
                    英語と日本語がセットで表示される。<br /><br />
                    <span style={{ color: '#fff', fontWeight: 600 }}>声に出して読んでみて。</span><br />
                    意味を確認して、頭に入れる。<br /><br />
                    覚えた？ まだ怪しい？<br />
                    自分で判断して次のステップへ。
                </div>
            </Screen>
            <Nav />
        </>
    );

    // ── Step 3: Level-up button ──
    if (step === 3) return (
        <>
            <Screen>
                <Label>HOW TO PLAY -- STEP 2</Label>
                <Title>カードの下にある<br /><span style={{ fontWeight: 700 }}>レベルアップボタン</span>を押す。</Title>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', marginBottom: 20, ...fadeIn(0.3) }}>
                    {[
                        { lv: 'Lv.1', name: 'EGG', color: '#DC2626' },
                        { lv: 'Lv.2', name: 'HATCH', color: '#EA580C' },
                        { lv: 'Lv.3', name: 'ROOKIE', color: '#CA8A04' },
                    ].map((b) => (
                        <div key={b.name} style={{
                            padding: '12px 32px', borderRadius: 12, fontWeight: 700, fontSize: 14,
                            background: `linear-gradient(135deg, ${b.color}, ${b.color}99)`,
                            color: '#fff', textAlign: 'center', width: 240,
                        }}>
                            {b.lv} {b.name}
                        </div>
                    ))}
                </div>
                <div style={{ fontSize: 13, color: '#aaa', lineHeight: 2, textAlign: 'center', ...fadeIn(0.5) }}>
                    フレーズを覚えたと思ったら<span style={{ color: '#fff', fontWeight: 600 }}>ボタンをタップ</span>。<br />
                    タップするたびにレベルが上がる。<br /><br />
                    EGG → HATCH → ROOKIE → FIGHTER...<br />
                    <span style={{ color: '#7C3AED', fontWeight: 600 }}>MASTER</span>まで全7段階。<br /><br />
                    <span style={{ fontSize: 12, color: '#666' }}>
                        1日3回までレベルアップ可能。<br />
                        レベルアップするたびにスロットが回る。
                    </span>
                </div>
            </Screen>
            <Nav />
        </>
    );

    // ── Step 4: Slot machine ──
    if (step === 4) return (
        <>
            <Screen>
                <Label>HOW TO PLAY -- STEP 3</Label>
                <Title>レベルアップすると<br /><span style={{ fontWeight: 700 }}>3リールスロット</span>が回る。</Title>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                    <div style={fadeIn(0.2)}><MockSlot tier="BONUS" dmg="x1" /></div>
                    <div style={fadeIn(0.4)}><MockSlot tier="SUPER" dmg="x2" /></div>
                    <div style={fadeIn(0.6)}><MockSlot tier="LEGENDARY" dmg="x5" /></div>
                </div>
                <div style={{ fontSize: 13, color: '#aaa', lineHeight: 2, textAlign: 'center', ...fadeIn(0.7) }}>
                    揃った絵柄でダメージ倍率が変わる。<br />
                    カードが布陣バトルに<span style={{ color: '#fff', fontWeight: 600 }}>ドロップ</span>して<br />
                    ボスにダメージを与える。<br /><br />
                    6段階: MISS → BONUS → GREAT → SUPER → MEGA → <span style={{ color: gold }}>LEGENDARY</span><br /><br />
                    <span style={{ fontSize: 12, color: '#666' }}>
                        リーチ演出が入ることもある。<br />
                        連荘チェーン中はさらに倍率UP。
                    </span>
                </div>
            </Screen>
            <Nav />
        </>
    );

    // ── Step 5: Card evolution ──
    if (step === 5) return (
        <>
            <Screen>
                <Label color="#8B5CF6">CARD SYSTEM</Label>
                <Title>カードは<span style={{ fontWeight: 700 }}>2軸</span>で成長する。</Title>

                <div style={{ backgroundColor: '#111', borderRadius: 14, padding: 20, border: '1px solid #222', marginBottom: 20, ...fadeIn(0.2) }}>
                    <div style={{ fontSize: 10, color: '#555', letterSpacing: '0.15em', marginBottom: 12, textAlign: 'center' }}>EVOLUTION LEVEL（タップで上がる）</div>
                    <MockChakra />
                    <div style={{ fontSize: 12, color: '#666', textAlign: 'center', marginTop: 12, lineHeight: 1.8 }}>
                        タップ1回 = 1レベルUP（1日3回まで）<br />
                        EGG → HATCH → ROOKIE → FIGHTER → CHAMPION → ELITE → <span style={{ color: '#7C3AED' }}>MASTER</span>
                    </div>
                </div>

                <div style={{ backgroundColor: '#111', borderRadius: 14, padding: 20, border: '1px solid #222', marginBottom: 20, ...fadeIn(0.4) }}>
                    <div style={{ fontSize: 10, color: '#555', letterSpacing: '0.15em', marginBottom: 12, textAlign: 'center' }}>CARD RANK（GPで上がる）</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                        {[
                            { name: 'NORMAL', color: '#78716C' },
                            { name: 'BRONZE', color: '#CD7F32' },
                            { name: 'SILVER', color: '#94A3B8' },
                            { name: 'GOLD', color: '#F6C85F' },
                            { name: 'HOLO', color: '#A855F7' },
                            { name: 'LEGEND', color: gold },
                        ].map(r => (
                            <div key={r.name} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700, backgroundColor: r.color + '20', color: r.color, border: `1px solid ${r.color}40` }}>
                                {r.name}
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: 12, color: '#666', textAlign: 'center', marginTop: 12 }}>
                        バトルで獲得したGP（カードポイント）でランクアップ
                    </div>
                </div>

                <div style={{ fontSize: 13, color: '#888', textAlign: 'center', lineHeight: 1.8, ...fadeIn(0.6) }}>
                    最終目標: 全カードを<br />
                    <span style={{ color: '#7C3AED', fontWeight: 700 }}>MASTER</span> + <span style={{ color: gold, fontWeight: 700 }}>LEGENDARY</span> にすること。
                </div>
            </Screen>
            <Nav />
        </>
    );

    // ── Step 6: Chain & Let's go ──
    return (
        <>
            <Screen>
                <Label color={green}>READY?</Label>
                <Title>
                    あとは<span style={{ fontWeight: 700 }}>触るだけ</span>。
                </Title>

                <div style={{ backgroundColor: '#111', borderRadius: 14, padding: 20, border: '1px solid #222', marginBottom: 20, ...fadeIn(0.2) }}>
                    <div style={{ fontSize: 10, color: '#555', letterSpacing: '0.15em', marginBottom: 12, textAlign: 'center' }}>CHAIN SYSTEM（連荘）</div>
                    <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.9, textAlign: 'center' }}>
                        連続レベルアップでチェーンが積み上がる。<br />
                        <span style={{ color: '#EA580C' }}>3連荘</span> → 角変（1.5x）<br />
                        <span style={{ color: '#EF4444' }}>5連荘</span> → 激厚（2x）フィーバー突入<br />
                        <span style={{ color: gold }}>10連荘</span> → GOD（3x）全画面演出<br />
                        画面が光ってパーティクルが降る。
                    </div>
                </div>

                <div style={{ backgroundColor: '#111', borderRadius: 14, padding: 20, border: '1px solid #222', marginBottom: 24, ...fadeIn(0.4) }}>
                    <div style={{ fontSize: 10, color: '#555', letterSpacing: '0.15em', marginBottom: 12, textAlign: 'center' }}>TIPS</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            { text: '1日3回までレベルアップ可能。毎日来る理由がある', color: gold },
                            { text: '左のサイドバーから他の機能にもアクセスできる', color: '#3B82F6' },
                            { text: 'BGMが流れます。音量は設定から調整可能', color: green },
                            { text: 'スマホでもPCでも遊べる。データはブラウザに保存', color: '#8B5CF6' },
                        ].map((tip, i) => (
                            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', ...slideIn(i) }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: tip.color, marginTop: 6, flexShrink: 0 }} />
                                <div style={{ fontSize: 12, color: '#999', lineHeight: 1.7 }}>{tip.text}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ fontSize: 14, color: '#fff', textAlign: 'center', lineHeight: 1.8, marginBottom: 24, ...fadeIn(0.6) }}>
                    フレーズは<span style={{ color: gold, fontWeight: 700 }}>300個</span>入ってる。<br />
                    まずは1枚、レベルアップしてみよう。
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', ...fadeIn(0.7) }}>
                    <button onClick={() => finish('/english/training')} style={{
                        padding: '16px 48px', borderRadius: 14, backgroundColor: gold,
                        border: 'none', color: '#000', fontSize: 18, fontWeight: 800,
                        cursor: 'pointer', letterSpacing: '0.1em', width: '100%', maxWidth: 320,
                        boxShadow: '0 4px 24px rgba(212,175,55,0.5)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        START TRAINING
                    </button>
                    <button onClick={() => finish('/english')} style={{
                        padding: '10px 24px', backgroundColor: 'transparent',
                        border: '1px solid #333', borderRadius: 10, color: '#666',
                        fontSize: 13, cursor: 'pointer',
                    }}>
                        まず全体を見てみる
                    </button>
                </div>
            </Screen>
            <Nav nextLabel="START TRAINING" onNext={() => finish('/english/training')} />
        </>
    );
}

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
    const [showWelcome, setShowWelcome] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

    useEffect(() => {
        installLocalApi();
        const hasSeenWelcome = localStorage.getItem('tl_welcome_seen');
        if (!hasSeenWelcome) {
            setShowWelcome(true);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isLoading) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#f5f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Loading...
            </div>
        );
    }

    if (showWelcome) {
        return <WelcomeFlow onDone={() => setShowWelcome(false)} />;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f6fa' }}>
            <EnglishSidebar desktopOpen={desktopSidebarOpen} />

            {/* Desktop Sidebar Toggle - Middle Left Tab */}
            {!isMobile && (
                <button
                    onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
                    style={{
                        position: 'fixed',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: desktopSidebarOpen ? '240px' : '0',
                        zIndex: 1002,
                        backgroundColor: '#164038',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '0 12px 12px 0',
                        width: '24px',
                        height: '64px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
                        transition: 'left 0.25s ease',
                    }}
                    title={desktopSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                >
                    {desktopSidebarOpen ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
                </button>
            )}

            <div style={{
                flex: 1,
                marginLeft: isMobile ? 0 : (desktopSidebarOpen ? '240px' : '0'),
                paddingTop: isMobile ? '56px' : 0,
                transition: 'margin-left 0.25s ease',
            }}>
                {children}
            </div>
        </div>
    );
}
