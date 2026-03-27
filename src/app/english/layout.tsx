'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import EnglishSidebar from '@/components/EnglishSidebar';
import InstallBanner from '@/components/InstallBanner';
import { installLocalApi } from '@/lib/local-api';
import { getSettings } from '@/lib/settings';

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

function WelcomeFlow({ onDone }: { onDone: () => void }) {
    const [step, setStep] = useState(0);
    const [phase, setPhase] = useState(0);
    const [closing, setClosing] = useState(false);
    const [detectedPlatform, setDetectedPlatform] = useState<'ios' | 'android' | 'desktop'>('desktop');

    const totalSteps = 5;

    useEffect(() => {
        const ua = navigator.userAgent;
        if (/iPad|iPhone|iPod/.test(ua)) setDetectedPlatform('ios');
        else if (/Android/.test(ua)) setDetectedPlatform('android');
        else setDetectedPlatform('desktop');
    }, []);

    useEffect(() => {
        setPhase(0);
        const t1 = setTimeout(() => setPhase(1), 100);
        const t2 = setTimeout(() => setPhase(2), 1800);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [step]);

    const next = () => {
        if (step === 0 && phase < 2) return;
        if (step < totalSteps - 1) setStep(s => s + 1);
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

    const Nav = ({ showPrev = true, nextLabel = '次へ', onNext = next }: { showPrev?: boolean; nextLabel?: string; onNext?: () => void }) => (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10000, padding: '20px 24px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, background: 'linear-gradient(transparent, rgba(0,0,0,0.95) 40%)' }}>
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

    // ── Step 0: Welcome + What is this ──
    if (step === 0) return (
        <>
            <div onClick={next} style={{
                position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.88)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', cursor: phase >= 2 ? 'pointer' : 'default', padding: 24,
            }}>
                <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '2px solid ' + gold, opacity: phase >= 1 ? 0.5 : 0, transform: phase >= 2 ? 'scale(3)' : 'scale(0.5)', transition: 'all 2.5s ease-out', pointerEvents: 'none' }} />
                <div style={{ textAlign: 'center', ...fadeIn(0.3) }}>
                    <div style={{ fontSize: 10, letterSpacing: '0.3em', color: gold, fontWeight: 700, marginBottom: 16 }}>EIGODAMASHII</div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', lineHeight: 1.4, marginBottom: 8 }}>英語魂</div>
                    <div style={{ fontSize: 15, color: '#aaa', lineHeight: 1.8, fontWeight: 300 }}>
                        ネイティブの「本物の英語」を学ぶアプリ
                    </div>
                </div>
                <div style={{ textAlign: 'center', maxWidth: 400, marginTop: 32, ...fadeIn(0.8) }}>
                    <div style={{ fontSize: 14, color: '#ccc', lineHeight: 2, fontWeight: 300, opacity: phase >= 2 ? 1 : 0, transition: 'opacity 1s ease' }}>
                        教科書の英語じゃない。<br />
                        ネイティブが実際に喋ってる構造を分析して、<br />
                        <span style={{ color: gold, fontWeight: 700 }}>15,000フレーズ</span>に落とし込んだ。<br />
                        毎日タップして、スロット回して、<br />
                        気づいたら英語が頭に残ってる。
                    </div>
                </div>
                <Nav showPrev={false} nextLabel="タップして次へ" />
            </div>
        </>
    );

    // ── Step 1: What's inside ──
    if (step === 1) return (
        <>
            <Screen>
                <Label>WHAT YOU GET</Label>
                <Title>
                    これが全部、<span style={{ fontWeight: 700 }}>無料</span>で入ってる。
                </Title>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, ...fadeIn(0.3) }}>
                    {[
                        { icon: 'S', label: 'スロット+バトル', desc: 'フレーズを覚える → スロットが回る → ボスにダメージ', c: gold },
                        { icon: 'T', label: 'TOEIC 30日プログラム', desc: 'ストーリーで学ぶTOEIC対策。Part 1-7完全対応', c: '#10B981' },
                        { icon: 'M', label: 'メモリア(会話リスニング)', desc: '7つのシナリオ、40人以上のキャラ。ネイティブの会話を聴く', c: '#3B82F6' },
                        { icon: 'G', label: '俺語録(310表現)', desc: '日本語の感覚を、ネイティブならこう言う、に変換', c: '#8B5CF6' },
                        { icon: 'R', label: '毎日レビュー(15,000語)', desc: '日めくりで単語+イディオム+例文。365日分', c: '#EF4444' },
                    ].map((f, i) => (
                        <div key={f.label} style={{ display: 'flex', gap: 12, padding: '12px 14px', backgroundColor: '#111', borderRadius: 12, border: '1px solid #222', ...slideIn(i) }}>
                            <div style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: f.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{f.icon}</div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{f.label}</div>
                                <div style={{ fontSize: 11, color: '#666', lineHeight: 1.5 }}>{f.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Screen>
            <Nav />
        </>
    );

    // ── Step 2: Why add to home screen ──
    if (step === 2) return (
        <>
            <Screen>
                <Label>ONE MORE THING</Label>
                <Title>
                    ホーム画面に追加すると、<br />
                    <span style={{ fontWeight: 700 }}>もっと使いやすくなる</span>。
                </Title>
                <div style={{ fontSize: 14, color: '#aaa', lineHeight: 2, textAlign: 'center', marginBottom: 24, ...fadeIn(0.3) }}>
                    App Store からのダウンロードは不要。<br />
                    今開いてるブラウザから<span style={{ color: '#fff', fontWeight: 600 }}>3ステップ</span>で追加できる。
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, ...fadeIn(0.5) }}>
                    {[
                        { text: 'ホーム画面のアイコンからワンタップ起動', color: gold },
                        { text: 'ブラウザのバーが消えてフルスクリーン表示', color: '#3B82F6' },
                        { text: '容量ほぼゼロ。スマホのストレージを食わない', color: green },
                        { text: 'アプリストアの審査なし。毎日最新版が使える', color: '#8B5CF6' },
                    ].map((tip, i) => (
                        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', backgroundColor: '#111', borderRadius: 10, border: '1px solid #222', ...slideIn(i) }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: tip.color, marginTop: 7, flexShrink: 0 }} />
                            <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.7 }}>{tip.text}</div>
                        </div>
                    ))}
                </div>
            </Screen>
            <Nav />
        </>
    );

    // ── Step 3: Platform-specific install instructions ──
    if (step === 3) return (
        <>
            <Screen>
                <Label color={green}>HOW TO INSTALL</Label>
                {detectedPlatform === 'ios' ? (
                    <>
                        <Title>Safari で<span style={{ fontWeight: 700 }}>3ステップ</span>。</Title>
                        <div style={{ padding: '10px 14px', backgroundColor: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 10, marginBottom: 20, ...fadeIn(0.2) }}>
                            <div style={{ fontSize: 12, color: '#F97316', fontWeight: 700, marginBottom: 2 }}>Safari で開いてください</div>
                            <div style={{ fontSize: 11, color: '#aaa', lineHeight: 1.6 }}>Chrome や LINE のブラウザではインストールできません。</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, ...fadeIn(0.4) }}>
                            {[
                                { n: 1, title: '画面下の共有ボタンをタップ', desc: '四角に上矢印のアイコン' },
                                { n: 2, title: '「ホーム画面に追加」を選択', desc: 'メニューを下にスクロールすると見つかる' },
                                { n: 3, title: '右上の「追加」をタップ', desc: 'ホーム画面に英語魂のアイコンが出る' },
                            ].map(s => (
                                <div key={s.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                    <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: gold, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{s.n}</div>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{s.title}</div>
                                        <div style={{ fontSize: 12, color: '#666' }}>{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : detectedPlatform === 'android' ? (
                    <>
                        <Title>Chrome で<span style={{ fontWeight: 700 }}>3ステップ</span>。</Title>
                        <div style={{ padding: '10px 14px', backgroundColor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, marginBottom: 20, ...fadeIn(0.2) }}>
                            <div style={{ fontSize: 12, color: green, fontWeight: 700, marginBottom: 2 }}>自動バナーが出る場合</div>
                            <div style={{ fontSize: 11, color: '#aaa', lineHeight: 1.6 }}>画面下部に「インストール」が出たらそのままタップでOK。</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, ...fadeIn(0.4) }}>
                            {[
                                { n: 1, title: '右上のメニュー(3点)をタップ', desc: 'Chrome のメニューボタン' },
                                { n: 2, title: '「アプリをインストール」を選択', desc: '確認画面で「インストール」をタップ' },
                                { n: 3, title: 'ホーム画面から起動', desc: '自動でアイコンが追加される' },
                            ].map(s => (
                                <div key={s.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                    <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: gold, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{s.n}</div>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{s.title}</div>
                                        <div style={{ fontSize: 12, color: '#666' }}>{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <Title>Chrome アドレスバーから<span style={{ fontWeight: 700 }}>追加</span>。</Title>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, ...fadeIn(0.4) }}>
                            {[
                                { n: 1, title: 'アドレスバー右のインストールアイコン', desc: 'モニタに下矢印のマークをクリック' },
                                { n: 2, title: '「インストール」をクリック', desc: '独立ウインドウで起動するショートカットが作成される' },
                            ].map(s => (
                                <div key={s.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                    <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: gold, color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{s.n}</div>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{s.title}</div>
                                        <div style={{ fontSize: 12, color: '#666' }}>{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                <div style={{ textAlign: 'center', marginTop: 28, ...fadeIn(0.6) }}>
                    <div style={{ fontSize: 12, color: '#555' }}>
                        詳しい手順は <a href="/install" style={{ color: gold, textDecoration: 'underline' }}>こちら</a> でも確認できます
                    </div>
                </div>
            </Screen>
            <Nav />
        </>
    );

    // ── Step 4: Let's go ──
    return (
        <>
            <Screen>
                <Label color={green}>READY?</Label>
                <Title>
                    あとは<span style={{ fontWeight: 700 }}>触るだけ</span>。
                </Title>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28, ...fadeIn(0.3) }}>
                    {[
                        { text: '1日3回までレベルアップ可能。毎日来る理由がある', color: gold },
                        { text: '左のサイドバーから全機能にアクセスできる', color: '#3B82F6' },
                        { text: 'スマホでもPCでも使える。データはブラウザに保存', color: '#8B5CF6' },
                    ].map((tip, i) => (
                        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', backgroundColor: '#111', borderRadius: 10, border: '1px solid #222', ...slideIn(i) }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: tip.color, marginTop: 7, flexShrink: 0 }} />
                            <div style={{ fontSize: 13, color: '#ccc', lineHeight: 1.7 }}>{tip.text}</div>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', ...fadeIn(0.5) }}>
                    <button onClick={() => finish('/english')} style={{
                        padding: '16px 48px', borderRadius: 0, backgroundColor: gold,
                        border: 'none', color: '#000', fontSize: 16, fontWeight: 800,
                        cursor: 'pointer', letterSpacing: '0.1em', width: '100%', maxWidth: 320,
                        boxShadow: '0 4px 24px rgba(212,175,55,0.5)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        HOME
                    </button>
                    <button onClick={() => finish('/english/training')} style={{
                        padding: '10px 24px', backgroundColor: 'transparent',
                        border: '1px solid #333', borderRadius: 0, color: '#666',
                        fontSize: 13, cursor: 'pointer',
                    }}>
                        すぐトレーニングを始める
                    </button>
                </div>
            </Screen>
            <Nav nextLabel="HOME" onNext={() => finish('/english')} />
        </>
    );
}

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
    const [showWelcome, setShowWelcome] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
    const bgmRef = useRef<HTMLAudioElement | null>(null);
    const bgmStartedRef = useRef(false);

    // Start BGM on first user interaction (autoplay policy requires gesture)
    const startBGM = useCallback(() => {
        if (bgmStartedRef.current) return;
        const st = getSettings();
        if (!st.bgmEnabled || !st.soundEnabled) return;
        bgmStartedRef.current = true;

        const audio = new Audio('/audio/bgm-main.mp3');
        audio.loop = true;
        // Keep volume low: multiply by 0.15 cap
        audio.volume = Math.min((st.bgmVolume / 100) * (st.volume / 100) * 0.15, 0.15);
        audio.play().catch(() => { bgmStartedRef.current = false; });
        bgmRef.current = audio;

        // Poll settings every 2 seconds
        const interval = setInterval(() => {
            const s = getSettings();
            if (!s.bgmEnabled || !s.soundEnabled) {
                audio.pause();
            } else {
                audio.volume = Math.min((s.bgmVolume / 100) * (s.volume / 100) * 0.15, 0.15);
                if (audio.paused) audio.play().catch(() => {});
            }
        }, 2000);
        window.addEventListener('beforeunload', () => { clearInterval(interval); audio.pause(); });
    }, []);

    useEffect(() => {
        installLocalApi();
        const hasSeenWelcome = localStorage.getItem('tl_welcome_seen');
        if (!hasSeenWelcome) {
            setShowWelcome(true);
        }
        setIsLoading(false);

        // Start BGM on first click/tap/keydown anywhere
        const handler = () => { startBGM(); window.removeEventListener('click', handler); window.removeEventListener('keydown', handler); };
        window.addEventListener('click', handler);
        window.addEventListener('keydown', handler);
        return () => { window.removeEventListener('click', handler); window.removeEventListener('keydown', handler); };
    }, [startBGM]);

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
                        left: desktopSidebarOpen ? '260px' : '0',
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
                marginLeft: isMobile ? 0 : (desktopSidebarOpen ? '260px' : '0'),
                paddingTop: isMobile ? '56px' : 0,
                transition: 'margin-left 0.25s ease',
            }}>
                {children}
            </div>

            <InstallBanner />
        </div>
    );
}
