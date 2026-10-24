'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TonioGoWidget from './TonioGoWidget';

type NavItem = { id: string; label: string; children?: { id: string; label: string }[] };

export default function EnglishSidebar({ desktopOpen = true }: { desktopOpen?: boolean }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [proAllDone, setProAllDone] = useState(false);
    const [memoriaAllDone, setMemoriaAllDone] = useState(false);
    const [showLists, setShowLists] = useState(false);
    const [showExams, setShowExams] = useState(false);
    const [showArchive, setShowArchive] = useState(false);
    const [showWorldMaps, setShowWorldMaps] = useState(false);
    const [openGroups, setOpenGroups] = useState<string[]>([]);
    const [isPublicMode, setIsPublicMode] = useState(false);

    // Port 3004 = 公開RPG。個人データページを非表示にする
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const port = window.location.port;
            setIsPublicMode(port === '3004');
        }
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Check if all items are completed
    useEffect(() => {
        let pro = 0, mem = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (!key) continue;
            if (key.startsWith('pro_') && key.endsWith('_completed') && localStorage.getItem(key) === 'true') pro++;
            if (key.startsWith('memoria_') && key.endsWith('_completed') && localStorage.getItem(key) === 'true') mem++;
        }
        const proTotal = parseInt(localStorage.getItem('pro_total') || '0', 10);
        const memTotal = parseInt(localStorage.getItem('memoria_total') || '0', 10);
        setProAllDone(proTotal > 0 && pro >= proTotal);
        setMemoriaAllDone(memTotal > 0 && mem >= memTotal);
    }, [pathname]);

    // Close menu on navigation
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // 3004公開RPGで見せるページだけ
    const publicItems: NavItem[] = [
        { id: '/english/quest', label: 'Quest (冒険)' },
        { id: '/english/rpg-guide', label: 'RPGガイド' },
        { id: '/english/strategy', label: 'RPG Strategy' },
    ];

    // Main nav: daily use items (3001個人用 全部)
    // children を持つ項目は折りたたみ。親はそのままリンクとして押せる
    const allMainItems: NavItem[] = [
        { id: '/english/dashboard', label: 'ダッシュボード' },
        { id: '/english/blueprint', label: '英語の設計図 (全体LP)' },
        { id: '/english/consult/inbox', label: '相談の受信箱' },
        { id: '/english/reading', label: '今日読む人 (note)' },
        {
            id: '/english/corpus', label: '英語表現ランキング (紹介)', children: [
                { id: '/english/corpus/level', label: '課程 レベル1-100' },
                { id: '/english/corpus/list', label: '課程の一覧' },
                { id: '/english/corpus/full', label: '網羅版 (絞る前の全在庫)' },
                { id: '/english/corpus/words', label: '単語の生涯遭遇' },
                { id: '/english/corpus/report', label: '作り方と、次にやること' },
            ]
        },
        { id: '/english/deru', label: '出る順 日本語 (1日10語)' },
        {
            id: '/english/corpus-ja', label: '日本語表現ランキング (紹介)', children: [
                { id: '/english/corpus-ja/full', label: '網羅版 (絞る前の全在庫)' },
                { id: '/english/corpus-ja/align', label: '実測の英訳と直訳不可度' },
            ]
        },
        { id: '/english/namahanka', label: '生半可 (辞書が1語で返す日本語)' },
        { id: '/english/okikae', label: '置き換え (日本語の塊→しゃべる英語 1日1本)' },
        { id: '/english/akapen', label: '赤ペン台帳 (AIの英語に先生が入れた赤)' },
        { id: '/english/listen', label: 'LISTEN (音声だけの書き取り)' },
        { id: '/english/newspaper', label: '今日の新聞 (The Tonio Times)' },
        { id: '/english/training/dmm', label: 'DMM英会話' },
        { id: '/english/tonight', label: '今夜も通じない (DMM劇場)' },
        { id: '/memoria', label: 'メモリア日記' },
        { id: '/english/requiem', label: 'レクイエム鎮魂歌' },
        { id: '/english/tonio-world', label: 'とにおワールド (全体マップ)' },
        { id: '/english/nihongo', label: '日本語から学ぶ' },
        { id: '/english/goroku', label: '英語筋トレ' },
        { id: '/english/goroku-log', label: '俺語録 (1日5個)' },
        { id: '/english/note', label: 'note記事' },
        { id: '/english/everyday-words', label: '日常英単語' },
        { id: '/english/grown', label: 'Grown-Up 1000' },
        { id: '/english/podcast', label: 'JRE' },
        { id: '/english/interview', label: 'エンタメ' },
        { id: '/english/casual', label: 'ドラマ' },
    ];

    const mainItems = isPublicMode ? publicItems : allMainItems;

    // Exam / mock tests (試験) - grouped under one toggle
    // section が変わるところで小見出しが入る。10項目がベタ並びだと何の道具か見分けがつかないため
    const examItems = [
        { id: '/english/writepass', label: 'ライトパス (LP)', section: '英検 書く (1次)' },
        { id: '/english/writepass/koryaku', label: 'ライトパス 攻略読本', section: '英検 書く (1次)' },
        { id: '/english/write', label: 'ライトパス 30日', section: '英検 書く (1次)' },
        { id: '/english/write/core5/sheet', label: 'CORE 5 — 1枚 (英作文)', section: '英検 書く (1次)' },
        { id: '/english/write/sum5', label: 'SUM 5 — 要約の型', section: '英検 書く (1次)' },
        { id: '/english/speak', label: 'スピークパス 2次', section: '英検 話す (2次)' },
        { id: '/english/speak/five', label: 'SPEAK 5 — 5本の指で2分 (10テーマ)', section: '英検 話す (2次)' },
        { id: '/english/topic100', label: 'トピック100 (20の弾で全題)', section: '英検 話す (2次)' },
        { id: '/english/eiken1-mock', label: '英検1級 一次 フル模試 (GRADEPASS)', section: '模試' },
        { id: '/english/toeic', label: 'TOEIC L&R フル模試 (SCOREPASS)', section: '模試' },
        { id: '/english/toeic/doctor', label: 'SCOREPASS ドクター (診断書)', section: '模試' },
    ];

    // Reference lists - actively used
    const listItems = [
        { id: '/english/nihongo-list', label: '日本語リスト' },
        { id: '/english/expressions', label: 'レクイエム: 表現集' },
        { id: '/english/idiom-list', label: 'レクイエム: イディオム帳' },
        { id: '/english/phrases-lab', label: 'Phrases Lab' },
        { id: '/english/us-map', label: 'US States' },
        { id: '/english/speaking-guide', label: 'スピーキングガイド' },
    ];

    const worldMapItems = [
        { id: '/english/world-map', label: 'World Map 1' },
        { id: '/english/world-map-2', label: 'World Map 2' },
        { id: '/english/world-map-3', label: 'World Map 3' },
        { id: '/english/world-map-4', label: 'World Map 4' },
        { id: '/english/world-map-6', label: 'Conquest' },
    ];

    // Archive - historical records only (記録 toggle)
    const archiveItems = [
        { id: '/english/hundred', label: 'THE HUNDRED (最強の100文)' },
        { id: '/english/rawpass', label: 'RAW PASS (商品LP ¥4,980)' },
        { id: '/english/rawpass/program', label: 'RAW PASS 30日の中身' },
        { id: '/english/rawpass/ear', label: 'RAW PASS 耳の実測 (無料の入口)' },
        { id: '/english/access', label: 'ACCESS (動画に順番をつける)' },
        { id: '/english/wordbook', label: '話し言葉の単語帳 (1,200語)' },
        { id: '/english/magazine', label: '月刊TOLERANCY (検死マガジン)' },
        { id: '/english/yochi', label: '文法災害予知 (次に何が壊れるか)' },
        { id: '/english/eiken1-daily', label: '英検1級英単語' },
        { id: '/english/dock', label: '英語ドック (診断→教材)' },
        { id: '/english/mlb', label: 'MLB専門紙 (The Ballpark Times)' },
        { id: '/english/training/card-preview', label: 'カードコレクション' },
        { id: '/english/cinepass', label: 'CINEPASS (映画がわかる)' },
        { id: '/english/world', label: '世界の内側 (ポッドキャスト)' },
        { id: '/english/dev', label: 'DEV' },
        { id: '/english/c2-vs-native', label: 'C2 vs ネイティブ (英語の正体)' },
        { id: '/english/articles', label: '冠詞 a/the 撲滅' },
        { id: '/english/south-africa', label: '南アフリカ・ドシエ' },
        { id: '/english/world/south-africa-borders-and-the-deadline', label: '南アフリカ: 国境と締切' },
        { id: '/english/distinction', label: 'Native 1000' },
        { id: '/english/lens', label: 'Lens (英語オンリーSNS)' },
        { id: '/english/jibun', label: 'じぶん英語30 (診断)' },
        { id: '/english/onbase', label: 'MLB (On Base)' },
        { id: '/english/app-build', label: 'アプリ作る部 (バイブコーディング教材)' },
        { id: '/english/writing', label: '英作文→トレーニング登録' },
        { id: '/english/youtube', label: 'YouTube' },
        { id: '/english/pro', label: 'プロの解説' },
        { id: '/life', label: 'Life (俺の英語)' },
        { id: '/english/jp-yt', label: '罪悪感ゼロ英語 (JP→EN)' },
        { id: '/english/pp', label: 'PP Studio (PlayPhrase)' },
        { id: '/english/conversation', label: '日常会話マスター' },
        { id: '/english/self-master', label: '俺語録' },
        { id: '/english/vocabulary', label: 'ボキャブラリー' },
        { id: '/english/quest', label: 'Quest (冒険)' },
        { id: '/english/training/card-slot', label: 'CARD SLOT' },
        { id: '/english/fujin-story', label: '会話ガチャ' },
        { id: '/english/eikaiwa-lab', label: '英会話Lab' },
        { id: '/english/phrases', label: 'デイリーフレーズ' },
        { id: '/english', label: '旧ダッシュボード' },
        { id: '/english/dashboard-v2', label: '積み上げ' },
        { id: '/english/goroku-v2', label: '俺語録 V2' },
        { id: '/english/anki', label: 'Anki' },
        { id: '/english/sessions', label: 'セッション音声' },
        { id: '/podcast', label: 'Podcast' },
    ];

    const allSecondaryItems = [...examItems, ...listItems, ...worldMapItems, ...archiveItems];

    const isActive = (path: string) => {
        if (!pathname) return false;
        if (path === '/life') return pathname === '/life';
        if (path === '/english') return pathname === '/english';
        if (path === '/english/dashboard') return pathname === '/english/dashboard';
        if (path === '/english/training') return pathname === '/english/training' || pathname === '/english/training/guide';
        if (path === '/english/write') return pathname === '/english/write' || pathname.startsWith('/english/write/');
        if (path === '/english/writepass') return pathname === '/english/writepass';
        if (path === '/english/phrases') return pathname.startsWith('/english/phrases');
        if (path === '/memoria') return pathname.startsWith('/memoria');
        if (path === '/podcast') return pathname.startsWith('/podcast');
        if (path === '/english/world') return pathname === '/english/world' || pathname.startsWith('/english/world/');
        // 子ページを別項目として並べているものは完全一致にする。
        // startsWith のままだと親子が同時に光って、どちらを開いているのか分からなくなる。
        if (path === '/english/goroku') return pathname === '/english/goroku';
        if (path === '/english/toeic') return pathname.startsWith('/english/toeic') && !pathname.startsWith('/english/toeic/doctor');
        // corpus と corpus-ja は前方一致だと親が子で光る。
        // '/english/corpus-ja'.startsWith('/english/corpus') が真になるため
        if (path === '/english/rawpass') return pathname === '/english/rawpass';
        if (path === '/english/corpus') return pathname === '/english/corpus';
        if (path === '/english/corpus-ja') return pathname === '/english/corpus-ja';
        return pathname.startsWith(path);
    };

    // Auto-expand sections if current page is in them
    useEffect(() => {
        const openable = allMainItems
            .filter(item => item.children?.some(c => isActive(c.id)))
            .map(item => item.id);
        if (openable.length) setOpenGroups(prev => [...new Set([...prev, ...openable])]);
        if (listItems.some(item => isActive(item.id)) || worldMapItems.some(item => isActive(item.id))) {
            setShowLists(true);
            if (worldMapItems.some(item => isActive(item.id))) setShowWorldMaps(true);
        }
        if (examItems.some(item => isActive(item.id))) {
            setShowExams(true);
        }
        if (archiveItems.some(item => isActive(item.id))) {
            setShowArchive(true);
        }
    }, [pathname]);

    const renderNavItem = (item: { id: string; label: string }, compact = false) => {
        const allDone = item.id === '/english/pro' ? proAllDone
            : item.id === '/memoria' ? memoriaAllDone
            : false;
        const active = isActive(item.id);
        return (
            <Link key={item.id} href={item.id} style={{ textDecoration: 'none' }}>
                <div style={{
                    padding: compact ? '7px 24px' : '10px 24px',
                    color: active ? '#1a1a1a' : compact ? '#999' : '#666',
                    backgroundColor: active ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                    borderLeft: active ? '3px solid #D4AF37' : '3px solid transparent',
                    fontSize: compact ? '12px' : '13px',
                    fontWeight: active ? '600' : '400',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    {item.label}
                    {allDone && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                    )}
                </div>
            </Link>
        );
    };

    // 親リンク + 子の折りたたみ。矢印だけがトグルで、ラベルは普通のリンクのまま
    const renderNavGroup = (item: NavItem) => {
        const open = openGroups.includes(item.id);
        return (
            <div key={item.id}>
                <div style={{ display: 'flex', alignItems: 'stretch' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>{renderNavItem(item)}</div>
                    <button
                        onClick={() => setOpenGroups(prev => open ? prev.filter(id => id !== item.id) : [...prev, item.id])}
                        aria-label={open ? '閉じる' : '開く'}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0 16px',
                            color: '#bbb',
                            fontSize: '9px',
                            lineHeight: 1,
                        }}
                    >
                        <span style={{
                            display: 'inline-block',
                            transition: 'transform 0.2s ease',
                            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                        }}>
                            ▶
                        </span>
                    </button>
                </div>
                {open && item.children?.map(child => (
                    <Link key={child.id} href={child.id} style={{ textDecoration: 'none' }}>
                        <div style={{
                            padding: '7px 24px 7px 40px',
                            color: isActive(child.id) ? '#1a1a1a' : '#999',
                            backgroundColor: isActive(child.id) ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                            borderLeft: isActive(child.id) ? '3px solid #D4AF37' : '3px solid transparent',
                            fontSize: '12px',
                            fontWeight: isActive(child.id) ? '600' : '400',
                            transition: 'all 0.15s ease',
                        }}>
                            {child.label}
                        </div>
                    </Link>
                ))}
            </div>
        );
    };

    return (
        <>
            {/* Mobile Header */}
            {isMobile && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '56px',
                    backgroundColor: '#F5F5F4',
                    borderBottom: '1px solid #e5e5e5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 16px',
                    zIndex: 1001,
                }}>
                    <Link href="/english/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '18px', fontWeight: '900', color: '#D4AF37', letterSpacing: '-0.5px' }}>英語魂</span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                        }}
                    >
                        <span style={{
                            display: 'block',
                            width: '22px',
                            height: '2px',
                            backgroundColor: '#999',
                            transition: 'all 0.2s ease',
                            transform: isOpen ? 'rotate(45deg) translateY(7px)' : 'none',
                        }} />
                        <span style={{
                            display: 'block',
                            width: '22px',
                            height: '2px',
                            backgroundColor: '#999',
                            opacity: isOpen ? 0 : 1,
                            transition: 'opacity 0.2s ease',
                        }} />
                        <span style={{
                            display: 'block',
                            width: '22px',
                            height: '2px',
                            backgroundColor: '#999',
                            transition: 'all 0.2s ease',
                            transform: isOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
                        }} />
                    </button>
                </div>
            )}

            {/* Overlay */}
            {isMobile && isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 999,
                    }}
                />
            )}

            {/* Sidebar */}
            <div style={{
                width: '240px',
                backgroundColor: '#F5F5F4',
                borderRight: '1px solid #e5e5e5',
                padding: isMobile ? '72px 0 24px' : '24px 0',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                overflowY: 'auto',
                zIndex: 1000,
                left: isMobile ? (isOpen ? 0 : '-240px') : (desktopOpen ? 0 : '-240px'),
                transition: 'left 0.25s ease',
            }}>
                {/* Logo - Desktop only */}
                {!isMobile && (
                    <div style={{ padding: '0 24px', marginBottom: '32px' }}>
                        <Link href="/english/dashboard" style={{ textDecoration: 'none' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'baseline',
                                gap: '8px',
                            }}>
                                <span style={{
                                    fontSize: '22px',
                                    fontWeight: '900',
                                    color: '#D4AF37',
                                    letterSpacing: '0.05em',
                                }}>
                                    英語魂
                                </span>
                                <span style={{
                                    fontSize: '10px',
                                    fontWeight: '600',
                                    color: '#bbb',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                }}>
                                    EIGODAMASHII
                                </span>
                            </div>
                            <div style={{
                                fontSize: '10px',
                                color: '#bbb',
                                marginTop: '6px',
                                letterSpacing: '0.5px',
                            }}>
                                止まらない英語を、ここから。
                            </div>
                        </Link>
                    </div>
                )}

                {/* とにおGO (実験) — DMM出席をポケモンGO文法で監視 */}
                {!isPublicMode && <TonioGoWidget />}

                {/* Navigation */}
                <nav style={{ flex: 1 }}>
                    {/* トレーニング — 毎日ここから始まるので最上段に固定 */}
                    <Link href="/english/training" style={{ textDecoration: 'none' }}>
                        <div style={{
                            margin: '0 16px 16px',
                            padding: '14px 16px',
                            borderRadius: '12px',
                            background: isActive('/english/training')
                                ? 'linear-gradient(135deg, #D4AF37 0%, #C19B2E 100%)'
                                : 'linear-gradient(135deg, #E4C55A 0%, #D4AF37 100%)',
                            color: '#fff',
                            boxShadow: '0 2px 8px rgba(212, 175, 55, 0.35)',
                            transition: 'all 0.15s ease',
                        }}>
                            <div style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '0.05em' }}>
                                トレーニング
                            </div>
                            <div style={{ fontSize: '10px', marginTop: '3px', opacity: 0.85, letterSpacing: '0.05em' }}>
                                今日の分をここで
                            </div>
                        </div>
                    </Link>

                    {/* Main Items */}
                    {mainItems.map(item => item.children ? renderNavGroup(item) : renderNavItem(item))}

                    {/* Reference Lists, Archive, etc. - 個人用のみ */}
                    {!isPublicMode && (<>
                    {/* 試験 (Exams / Mock tests) */}
                    <button
                        onClick={() => setShowExams(!showExams)}
                        style={{
                            width: '100%',
                            padding: '16px 24px 8px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#aaa',
                            fontSize: '10px',
                            fontWeight: '600',
                            letterSpacing: '1px',
                            textAlign: 'left',
                        }}
                    >
                        <span style={{
                            display: 'inline-block',
                            transition: 'transform 0.2s ease',
                            transform: showExams ? 'rotate(90deg)' : 'rotate(0deg)',
                            fontSize: '9px',
                        }}>
                            ▶
                        </span>
                        試験 / 模試
                    </button>
                    {showExams && examItems.map((item, i) => (
                        <div key={item.id}>
                            {item.section !== examItems[i - 1]?.section && (
                                <div style={{
                                    padding: '10px 24px 3px',
                                    color: '#c9c0ac',
                                    fontSize: '9px',
                                    fontWeight: 700,
                                    letterSpacing: '1.5px',
                                }}>
                                    {item.section}
                                </div>
                            )}
                            {renderNavItem(item, true)}
                        </div>
                    ))}

                    <button
                        onClick={() => setShowLists(!showLists)}
                        style={{
                            width: '100%',
                            padding: '16px 24px 8px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#aaa',
                            fontSize: '10px',
                            fontWeight: '600',
                            letterSpacing: '1px',
                            textAlign: 'left',
                        }}
                    >
                        <span style={{
                            display: 'inline-block',
                            transition: 'transform 0.2s ease',
                            transform: showLists ? 'rotate(90deg)' : 'rotate(0deg)',
                            fontSize: '9px',
                        }}>
                            ▶
                        </span>
                        リスト / 辞書
                    </button>
                    {showLists && (
                        <>
                            {listItems.map(item => renderNavItem(item, true))}
                            {/* World Maps - sub-toggle */}
                            <button
                                onClick={() => setShowWorldMaps(!showWorldMaps)}
                                style={{
                                    width: '100%',
                                    padding: '7px 24px 7px 36px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    color: '#999',
                                    fontSize: '12px',
                                    textAlign: 'left',
                                }}
                            >
                                <span style={{
                                    display: 'inline-block',
                                    transition: 'transform 0.2s ease',
                                    transform: showWorldMaps ? 'rotate(90deg)' : 'rotate(0deg)',
                                    fontSize: '8px',
                                }}>
                                    ▶
                                </span>
                                World Map ({worldMapItems.length})
                            </button>
                            {showWorldMaps && worldMapItems.map(item => renderNavItem(item, true))}
                        </>
                    )}

                    {/* Archive */}
                    <button
                        onClick={() => setShowArchive(!showArchive)}
                        style={{
                            width: '100%',
                            padding: '12px 24px 6px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#ccc',
                            fontSize: '9px',
                            fontWeight: '600',
                            letterSpacing: '1px',
                            textAlign: 'left',
                        }}
                    >
                        <span style={{
                            display: 'inline-block',
                            transition: 'transform 0.2s ease',
                            transform: showArchive ? 'rotate(90deg)' : 'rotate(0deg)',
                            fontSize: '8px',
                        }}>
                            ▶
                        </span>
                        記録
                    </button>
                    {showArchive && archiveItems.map(item => (
                        <Link key={item.id} href={item.id} style={{ textDecoration: 'none' }}>
                            <div style={{
                                padding: '4px 24px',
                                color: isActive(item.id) ? '#999' : '#ccc',
                                backgroundColor: isActive(item.id) ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                                borderLeft: isActive(item.id) ? '2px solid #D4AF37' : '2px solid transparent',
                                fontSize: '10px',
                                fontWeight: isActive(item.id) ? '600' : '400',
                                transition: 'all 0.15s ease',
                            }}>
                                {item.label}
                            </div>
                        </Link>
                    ))}
                    </>)}
                </nav>

                {/* Settings Link - 個人用のみ */}
                {!isPublicMode && (
                <Link href="/english/settings" style={{ textDecoration: 'none' }}>
                    <div style={{
                        padding: '10px 24px',
                        color: isActive('/english/settings') ? '#1a1a1a' : '#aaa',
                        backgroundColor: isActive('/english/settings') ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                        borderLeft: isActive('/english/settings') ? '3px solid #D4AF37' : '3px solid transparent',
                        fontSize: '13px',
                        fontWeight: isActive('/english/settings') ? '600' : '400',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.15s ease',
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        設定
                    </div>
                </Link>
                )}

                {/* Home Link - 個人用のみ */}
                {!isPublicMode && (
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <div style={{ padding: '16px 24px', color: '#aaa', fontSize: '13px' }}>
                        ← ホームに戻る
                    </div>
                </Link>
                )}
            </div>

            {/* Spacer for mobile header */}
            {isMobile && <div style={{ height: '56px' }} />}
        </>
    );
}
