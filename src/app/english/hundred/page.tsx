'use client';

// THE HUNDRED — 読めば中学英語。聞けば別言語。
// LP + 100例文ビューア。背骨は「なぜ英語が聞こえないのか」。
// 1文で4技能(読む/聞く/音読/書く)を回す設計だが、主役はリスニング。

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
    HUNDRED_FULL,
    HUNDRED_PART_META,
    type HundredPart,
    type HundredEntry,
} from '@/data/english/hundred-100';
import {
    HUNDRED_COURSE,
    HUNDRED_PREREQ,
    getReviewForDay,
    COVERAGE_RECOVERED,
    COVERAGE_REMAINING,
} from '@/data/english/hundred-course';

const STORAGE_KEY = 'hundred100-done';

const PART_ORDER: HundredPart[] = ['weak', 'connected', 'ears', 'prosody', 'endings', 'pairs'];

function loadDone(): Set<number> {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
}
function saveDone(set: Set<number>) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...set])); } catch { /* noop */ }
}

function speak(text: string, rate: number, onEnd?: () => void) {
    if (typeof window === 'undefined') return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate;
    if (onEnd) u.onend = onEnd;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
}

// ============================================================
// 研究カード(LP用)
// ============================================================
const RESEARCH_CARDS = [
    {
        tag: 'Field (2008) TESOL Quarterly',
        title: '聞こえていないのは、難しい単語ではない',
        body: 'L2リスナーの聞き取りを調べると、機能語(of, than, him...)の認識率は内容語より有意に低い。しかもこの傾向は母語を問わず、習熟度が上がっても消えない。何年やっても聞こえない正体の一つは、the や of のような「一番簡単な単語」のほう。',
        color: '#B8860B',
    },
    {
        tag: 'Dupoux et al. (1999)',
        title: '日本語の耳は、無い音を聞く',
        body: '日本語話者は ebzo と ebuzo を区別できず、両方 ebuzo と知覚する。子音が連続すると、存在しない母音「ウ」を脳が勝手に挿入するから。フランス語話者には起きない。聞き逃しではなく、無い音が「聞こえてしまう」。これは努力量の問題ではなく、耳のOSの問題。',
        color: '#E11D48',
    },
    {
        tag: 'Munro & Derwing (2006)',
        title: 'th の練習は、後回しでいい',
        body: '音素対比には「間違えると会話が壊れるもの」と「間違えてもほぼ通じるもの」がある(functional load)。r/l や s/sh は前者。日本人が10年練習してきた th は後者。市販教材の優先順位は、実証研究の優先順位とかなりずれている。',
        color: '#D97706',
    },
];

const FOUR_SKILLS = [
    { label: '読む', en: 'READ', desc: '全文が中学英語。読んで分からない文は1本もない。だから聞けない原因が「音」に一意に絞れる。' },
    { label: '聞く', en: 'LISTEN', desc: '主役。崩れた実際の音を、崩れたまま聞く。1文ごとに「どこで・なぜ聞こえないか」の解説つき。' },
    { label: '音読', en: 'SPEAK', desc: '崩れた音の表記通りに自分の口で再現する。自分で出せる音は聞ける。弱形で言えれば話す速度も上がる。' },
    { label: '書く', en: 'WRITE', desc: '聞いて書き取れば穴が特定できる。100文は全部そのまま使える実用文なので、書けた文は明日の口から出る。' },
];

// ============================================================
// Page
// ============================================================
export default function HundredPage() {
    const [done, setDone] = useState<Set<number>>(new Set());
    const [activePart, setActivePart] = useState<HundredPart | 'all'>('all');
    const [expandedNo, setExpandedNo] = useState<number | null>(null);
    const [speakingNo, setSpeakingNo] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setDone(loadDone());
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleDone = useCallback((no: number) => {
        setDone(prev => {
            const next = new Set(prev);
            if (next.has(no)) next.delete(no); else next.add(no);
            saveDone(next);
            return next;
        });
    }, []);

    const handleSpeak = useCallback((entry: HundredEntry, rate: number) => {
        setSpeakingNo(entry.no);
        speak(entry.sentence, rate, () => setSpeakingNo(null));
    }, []);

    const visible = useMemo(() => {
        if (activePart === 'all') return HUNDRED_FULL;
        return HUNDRED_FULL.filter(e => e.part === activePart);
    }, [activePart]);

    const total = HUNDRED_FULL.length;
    const doneCount = done.size;

    return (
        <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', color: '#1c1917' }}>

            {/* ============ HERO ============ */}
            <section style={{
                padding: isMobile ? '64px 24px 56px' : '110px 48px 90px',
                maxWidth: '980px',
                margin: '0 auto',
                textAlign: 'center',
            }}>
                <div style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.35em',
                    color: '#B8860B',
                    marginBottom: '28px',
                }}>
                    LISTENING-FIRST 100 SENTENCES
                </div>
                <h1 style={{
                    fontSize: isMobile ? '40px' : '72px',
                    fontWeight: 900,
                    letterSpacing: '0.02em',
                    lineHeight: 1.05,
                    margin: 0,
                }}>
                    THE <span style={{ color: '#D4AF37' }}>HUNDRED</span>
                </h1>
                <p style={{
                    fontSize: isMobile ? '20px' : '30px',
                    fontWeight: 800,
                    margin: '30px 0 0',
                    lineHeight: 1.5,
                }}>
                    読めば、中学英語。<br />聞けば、別言語。
                </p>
                <p style={{
                    fontSize: isMobile ? '14px' : '16px',
                    color: '#57534e',
                    maxWidth: '620px',
                    margin: '26px auto 0',
                    lineHeight: 2,
                }}>
                    英語が聞こえない原因を、音声学の研究に基づいて100の現象に分解した。
                    1現象=1例文。全文、読めば100%分かる中学英語。
                    それでも聞こえない。<strong>その「聞こえない仕組み」ごと覚える100文。</strong>
                </p>
                <div style={{ marginTop: '40px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="#sentences" style={{
                        display: 'inline-block',
                        padding: '15px 36px',
                        backgroundColor: '#1c1917',
                        color: '#fff',
                        borderRadius: '9999px',
                        fontSize: '14px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        letterSpacing: '0.05em',
                    }}>
                        100文を見る
                    </a>
                    <a href="#why" style={{
                        display: 'inline-block',
                        padding: '15px 36px',
                        backgroundColor: '#fff',
                        color: '#1c1917',
                        border: '1.5px solid #d6d3d1',
                        borderRadius: '9999px',
                        fontSize: '14px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        letterSpacing: '0.05em',
                    }}>
                        なぜ聞こえないのか
                    </a>
                </div>

                {/* Stats strip */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: '1px',
                    backgroundColor: '#e7e5e4',
                    border: '1px solid #e7e5e4',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    marginTop: '64px',
                }}>
                    {[
                        { n: '100', label: '音声現象 = 例文' },
                        { n: '40', label: '弱形語を全潰し (Roach)' },
                        { n: '12', label: '日本人の耳・専用パート' },
                        { n: '0', label: '未知語 (全文が中学英語)' },
                    ].map(s => (
                        <div key={s.label} style={{ backgroundColor: '#fafaf9', padding: '22px 12px' }}>
                            <div style={{ fontSize: '34px', fontWeight: 900, color: '#B8860B' }}>{s.n}</div>
                            <div style={{ fontSize: '11px', color: '#78716c', fontWeight: 600, marginTop: '4px' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============ 落差デモ ============ */}
            <section style={{ backgroundColor: '#1c1917', color: '#fff', padding: isMobile ? '56px 24px' : '80px 48px' }}>
                <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#D4AF37', marginBottom: '28px' }}>
                        THE GAP
                    </div>
                    <p style={{ fontSize: isMobile ? '13px' : '15px', color: '#a8a29e', margin: 0 }}>目で見た英語</p>
                    <p style={{
                        fontSize: isMobile ? '26px' : '44px',
                        fontWeight: 800,
                        margin: '10px 0 34px',
                        letterSpacing: '0.01em',
                    }}>
                        What did you get at the shop?
                    </p>
                    <p style={{ fontSize: isMobile ? '13px' : '15px', color: '#a8a29e', margin: 0 }}>耳に届く英語</p>
                    <p style={{
                        fontSize: isMobile ? '26px' : '44px',
                        fontWeight: 800,
                        color: '#D4AF37',
                        margin: '10px 0 0',
                        letterSpacing: '0.02em',
                    }}>
                        wuh-dih-juh-geh-duh-thuh-shop
                    </p>
                    <p style={{ fontSize: isMobile ? '14px' : '15px', color: '#d6d3d1', maxWidth: '600px', margin: '40px auto 0', lineHeight: 2 }}>
                        7語のうち、辞書通りに発音される語は <strong style={{ color: '#fff' }}>shop 1語だけ</strong>。
                        単語を7個知っていることと、この音の連なりが取れることは、別のスキル。
                        あなたに足りないのは語彙でも努力でもなく、<strong style={{ color: '#D4AF37' }}>この変換表</strong>。
                    </p>
                </div>
            </section>

            {/* ============ WHY: 研究 ============ */}
            <section id="why" style={{ padding: isMobile ? '64px 24px' : '96px 48px', maxWidth: '1060px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '52px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#B8860B', marginBottom: '16px' }}>
                        EVIDENCE
                    </div>
                    <h2 style={{ fontSize: isMobile ? '26px' : '38px', fontWeight: 900, margin: 0, lineHeight: 1.4 }}>
                        何年やっても聞こえないのは、<br />あなたのせいではない
                    </h2>
                    <p style={{ fontSize: '14px', color: '#78716c', marginTop: '18px', lineHeight: 2 }}>
                        感覚論ではなく、研究で分かっていることから設計した。
                    </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
                    {RESEARCH_CARDS.map(c => (
                        <div key={c.tag} style={{
                            border: '1px solid #e7e5e4',
                            borderTop: `3px solid ${c.color}`,
                            borderRadius: '16px',
                            padding: '28px 24px',
                            backgroundColor: '#fff',
                        }}>
                            <div style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                letterSpacing: '0.08em',
                                color: c.color,
                                marginBottom: '14px',
                            }}>
                                {c.tag}
                            </div>
                            <h3 style={{ fontSize: '17px', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.6 }}>{c.title}</h3>
                            <p style={{ fontSize: '13px', color: '#57534e', lineHeight: 1.9, margin: 0 }}>{c.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============ 4技能 ============ */}
            <section style={{ backgroundColor: '#fafaf9', borderTop: '1px solid #e7e5e4', borderBottom: '1px solid #e7e5e4', padding: isMobile ? '64px 24px' : '96px 48px' }}>
                <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '52px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#059669', marginBottom: '16px' }}>
                            ONE SENTENCE, FOUR SKILLS
                        </div>
                        <h2 style={{ fontSize: isMobile ? '26px' : '38px', fontWeight: 900, margin: 0, lineHeight: 1.4 }}>
                            1文で4技能。<br />ただし背骨はリスニング
                        </h2>
                        <p style={{ fontSize: '14px', color: '#78716c', marginTop: '18px', lineHeight: 2, maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
                            例文は全部、明日そのまま使える実用文。だから音読すればスピーキングの、
                            書き取ればライティングの練習に自動的になる。よくばりでいい。
                            ただし設計の中心は一つ:<strong>「なぜこの文が聞こえないのか」を1文ずつ説明できること。</strong>
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '16px' }}>
                        {FOUR_SKILLS.map((s, i) => (
                            <div key={s.en} style={{
                                backgroundColor: i === 1 ? '#1c1917' : '#fff',
                                color: i === 1 ? '#fff' : '#1c1917',
                                border: '1px solid #e7e5e4',
                                borderRadius: '16px',
                                padding: '26px 20px',
                            }}>
                                <div style={{
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    letterSpacing: '0.2em',
                                    color: i === 1 ? '#D4AF37' : '#a8a29e',
                                    marginBottom: '10px',
                                }}>
                                    {s.en}{i === 1 ? ' — 主役' : ''}
                                </div>
                                <div style={{ fontSize: '20px', fontWeight: 900, marginBottom: '10px' }}>{s.label}</div>
                                <p style={{ fontSize: '12px', lineHeight: 1.9, margin: 0, color: i === 1 ? '#d6d3d1' : '#57534e' }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ 構成 ============ */}
            <section style={{ padding: isMobile ? '64px 24px' : '96px 48px', maxWidth: '1060px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '52px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#B8860B', marginBottom: '16px' }}>
                        STRUCTURE
                    </div>
                    <h2 style={{ fontSize: isMobile ? '26px' : '38px', fontWeight: 900, margin: 0, lineHeight: 1.4 }}>
                        100文の中身
                    </h2>
                    <p style={{ fontSize: '14px', color: '#78716c', marginTop: '18px', lineHeight: 2 }}>
                        配分は思いつきではなく、日本語話者の実損の大きい順。
                    </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {PART_ORDER.map(p => {
                        const meta = HUNDRED_PART_META[p];
                        const count = meta.range[1] - meta.range[0] + 1;
                        return (
                            <div key={p} style={{
                                display: 'flex',
                                flexDirection: isMobile ? 'column' : 'row',
                                gap: isMobile ? '10px' : '24px',
                                alignItems: isMobile ? 'stretch' : 'center',
                                border: '1px solid #e7e5e4',
                                borderRadius: '16px',
                                padding: '22px 24px',
                                backgroundColor: meta.bg,
                            }}>
                                <div style={{ minWidth: isMobile ? 'auto' : '190px' }}>
                                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: meta.color }}>{meta.labelEn}</div>
                                    <div style={{ fontSize: '20px', fontWeight: 900 }}>
                                        {meta.label}
                                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#78716c', marginLeft: '8px' }}>
                                            #{meta.range[0]}-{meta.range[1]}
                                        </span>
                                    </div>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        height: '8px',
                                        borderRadius: '9999px',
                                        backgroundColor: 'rgba(0,0,0,0.06)',
                                        overflow: 'hidden',
                                        marginBottom: '10px',
                                    }}>
                                        <div style={{ width: `${count}%`, height: '100%', backgroundColor: meta.color, borderRadius: '9999px' }} />
                                    </div>
                                    <p style={{ fontSize: '13px', color: '#44403c', margin: 0, lineHeight: 1.8 }}>{meta.desc}</p>
                                    <p style={{ fontSize: '11px', color: '#78716c', margin: '6px 0 0', lineHeight: 1.7 }}>根拠: {meta.evidence}</p>
                                </div>
                                <div style={{ fontSize: '30px', fontWeight: 900, color: meta.color, minWidth: '70px', textAlign: isMobile ? 'left' : 'right' }}>
                                    {count}<span style={{ fontSize: '13px', color: '#78716c' }}>本</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ============ 30日コース (学ぶ順番) ============ */}
            <section id="course" style={{ padding: isMobile ? '64px 24px' : '96px 48px', maxWidth: '1060px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '44px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#2563EB', marginBottom: '16px' }}>
                        THE ORDER
                    </div>
                    <h2 style={{ fontSize: isMobile ? '26px' : '38px', fontWeight: 900, margin: 0, lineHeight: 1.4 }}>
                        番号順にやってはいけない
                    </h2>
                    <p style={{ fontSize: '14px', color: '#57534e', marginTop: '20px', lineHeight: 2, maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto' }}>
                        カード番号は現象の分類順。そのまま上から順にやると弱形が40連発する、いわゆる
                        blocked practice になる。<strong>Taylor &amp; Rohrer (2010)</strong> は、同種を固めるより混ぜたほうが
                        練習中の出来は落ちるのに翌日テストが<strong>2倍</strong>になることを示した。効いた理由は
                        「どの問題にどの手続きを当てるかの判別力が上がったから」。
                        いま起きているのが弱形なのか脱落なのかフラップなのかを、その場で当てる力。
                        リスニングで要求されるのはまさにそれなので、<strong>1日の中で必ず複数パートを混ぜている。</strong>
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '10px',
                }}>
                    {HUNDRED_COURSE.map(d => {
                        const review = getReviewForDay(d.day);
                        const isConsolidation = d.items.length === 0;
                        return (
                            <div key={d.day} style={{
                                border: '1px solid #e7e5e4',
                                borderRadius: '14px',
                                padding: '16px 18px',
                                backgroundColor: isConsolidation ? '#fafaf9' : '#fff',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '11px', fontWeight: 900, color: '#2563EB', letterSpacing: '0.05em' }}>
                                        DAY {String(d.day).padStart(2, '0')}
                                    </span>
                                    <span style={{ fontSize: '14px', fontWeight: 800 }}>{d.theme}</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '8px' }}>
                                    {d.items.map(no => {
                                        const e = HUNDRED_FULL.find(x => x.no === no);
                                        const meta = e ? HUNDRED_PART_META[e.part] : null;
                                        const req = HUNDRED_PREREQ[no];
                                        return (
                                            <span key={no} title={e ? e.phenomenon : ''} style={{
                                                fontSize: '10px',
                                                fontWeight: 700,
                                                padding: '3px 8px',
                                                borderRadius: '9999px',
                                                color: meta ? meta.color : '#78716c',
                                                backgroundColor: meta ? meta.bg : '#f5f5f4',
                                                border: `1px solid ${meta ? meta.color + '33' : '#e7e5e4'}`,
                                            }}>
                                                #{no}{req ? ` ←${req.join('/')}` : ''}
                                            </span>
                                        );
                                    })}
                                    {isConsolidation && (
                                        <span style={{ fontSize: '11px', color: '#78716c', fontWeight: 600 }}>{d.mix}</span>
                                    )}
                                </div>
                                {!isConsolidation && (
                                    <div style={{ fontSize: '10px', color: '#a8a29e', lineHeight: 1.7 }}>
                                        混合: {d.mix}
                                        {review.length > 0 && <> ／ 復習: {review.map(n => `#${n}`).join(' ')}</>}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <p style={{ fontSize: '11px', color: '#a8a29e', marginTop: '18px', lineHeight: 1.9, textAlign: 'center' }}>
                    ←付きの番号は前提つき。フラップTを知らないと get a は取れないし、h脱落を知らないと him は取れない。
                    全18本の前提関係がこの順序で満たされていることは、コードで検証してある。
                    Day11 / 17 / 21 だけは意図的に1パートで固めた。-ed の3分岐や強勢の4種類は、並べて比べること自体が判別訓練になるため。
                </p>
            </section>

            {/* ============ カバレッジの正直な話 ============ */}
            <section style={{ backgroundColor: '#1c1917', color: '#fff', padding: isMobile ? '64px 24px' : '90px 48px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '44px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#D4AF37', marginBottom: '16px' }}>
                            COVERAGE
                        </div>
                        <h2 style={{ fontSize: isMobile ? '24px' : '34px', fontWeight: 900, margin: 0, lineHeight: 1.5 }}>
                            100で全部かというと、全部ではない
                        </h2>
                        <p style={{ fontSize: '14px', color: '#a8a29e', marginTop: '20px', lineHeight: 2 }}>
                            初版を音声学の標準リストと突き合わせたら、穴が10個あった。
                            埋めたものと、まだ空いているものを両方書いておく。
                        </p>
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#10B981', marginBottom: '14px', letterSpacing: '0.08em' }}>
                            回収した10項目 — 各場面の返し行に副次ターゲットとして埋め込み
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '8px' }}>
                            {COVERAGE_RECOVERED.map(g => (
                                <div key={g.item} style={{
                                    backgroundColor: 'rgba(16,185,129,0.08)',
                                    border: '1px solid rgba(16,185,129,0.25)',
                                    borderRadius: '10px',
                                    padding: '12px 14px',
                                }}>
                                    <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>{g.item}</div>
                                    <div style={{ fontSize: '11px', color: '#a8a29e', lineHeight: 1.7 }}>{g.note}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: '#E11D48', marginBottom: '14px', letterSpacing: '0.08em' }}>
                            まだ空いている穴 — 100では扱わないと決めたもの
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '8px' }}>
                            {COVERAGE_REMAINING.map(g => (
                                <div key={g.item} style={{
                                    backgroundColor: 'rgba(225,29,72,0.07)',
                                    border: '1px solid rgba(225,29,72,0.22)',
                                    borderRadius: '10px',
                                    padding: '12px 14px',
                                }}>
                                    <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>{g.item}</div>
                                    <div style={{ fontSize: '11px', color: '#a8a29e', lineHeight: 1.7 }}>{g.note}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============ 使い方 ============ */}
            <section style={{ backgroundColor: '#fafaf9', borderTop: '1px solid #e7e5e4', borderBottom: '1px solid #e7e5e4', padding: isMobile ? '64px 24px' : '96px 48px' }}>
                <div style={{ maxWidth: '860px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '52px' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#059669', marginBottom: '16px' }}>
                            DAILY ROUTINE
                        </div>
                        <h2 style={{ fontSize: isMobile ? '26px' : '38px', fontWeight: 900, margin: 0, lineHeight: 1.4 }}>
                            1日3文、1文3分
                        </h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {[
                            { step: '01', title: 'スクリプトを見ずに聞く', body: '再生ボタンで音だけ聞く。取れなくていい。「どこが取れなかったか」を自分で言えることが目的。' },
                            { step: '02', title: 'スクリプトを開いて、落差を見る', body: '「えっ、これが聞き取れなかったの?」の瞬間が本体。解説で「どこで・なぜ」音が崩れたかを確認する。' },
                            { step: '03', title: '崩れた音の表記どおりに音読する', body: 'きれいに読まない。wuh-dih-juh のまま10回口に乗せる。自分の口で出せる崩れは、次から耳が拾う。ここがスピーキング練習を兼ねる。' },
                            { step: '04', title: 'もう一度、目を閉じて聞く', body: '同じ音源が別物に聞こえたら、その現象は攻略済み。チェックをつけて次へ。数日後にもう一度戻ってくると定着する。' },
                        ].map(s => (
                            <div key={s.step} style={{
                                display: 'flex',
                                gap: '20px',
                                backgroundColor: '#fff',
                                border: '1px solid #e7e5e4',
                                borderRadius: '16px',
                                padding: '24px',
                                alignItems: 'flex-start',
                            }}>
                                <div style={{ fontSize: '24px', fontWeight: 900, color: '#D4AF37', lineHeight: 1 }}>{s.step}</div>
                                <div>
                                    <div style={{ fontSize: '16px', fontWeight: 800, marginBottom: '6px' }}>{s.title}</div>
                                    <p style={{ fontSize: '13px', color: '#57534e', lineHeight: 1.9, margin: 0 }}>{s.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ 100文ビューア ============ */}
            <section id="sentences" style={{ padding: isMobile ? '64px 16px' : '96px 48px', maxWidth: '1060px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', color: '#B8860B', marginBottom: '16px' }}>
                        THE HUNDRED
                    </div>
                    <h2 style={{ fontSize: isMobile ? '26px' : '38px', fontWeight: 900, margin: 0 }}>
                        最強の100文
                    </h2>
                    <p style={{ fontSize: '13px', color: '#78716c', marginTop: '14px' }}>
                        進捗 {doneCount} / {total}
                    </p>
                    <div style={{
                        maxWidth: '360px',
                        margin: '10px auto 0',
                        height: '6px',
                        borderRadius: '9999px',
                        backgroundColor: '#e7e5e4',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            width: total > 0 ? `${(doneCount / total) * 100}%` : '0%',
                            height: '100%',
                            backgroundColor: '#D4AF37',
                            borderRadius: '9999px',
                            transition: 'width 0.3s ease',
                        }} />
                    </div>
                </div>

                {/* Part filter */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginBottom: '36px',
                }}>
                    <button
                        onClick={() => setActivePart('all')}
                        style={{
                            padding: '8px 18px',
                            borderRadius: '9999px',
                            border: activePart === 'all' ? '1.5px solid #1c1917' : '1.5px solid #d6d3d1',
                            backgroundColor: activePart === 'all' ? '#1c1917' : '#fff',
                            color: activePart === 'all' ? '#fff' : '#57534e',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                        }}
                    >
                        ALL 100
                    </button>
                    {PART_ORDER.map(p => {
                        const meta = HUNDRED_PART_META[p];
                        const active = activePart === p;
                        return (
                            <button
                                key={p}
                                onClick={() => setActivePart(p)}
                                style={{
                                    padding: '8px 18px',
                                    borderRadius: '9999px',
                                    border: `1.5px solid ${active ? meta.color : '#d6d3d1'}`,
                                    backgroundColor: active ? meta.color : '#fff',
                                    color: active ? '#fff' : '#57534e',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                }}
                            >
                                {meta.label} {meta.range[1] - meta.range[0] + 1}
                            </button>
                        );
                    })}
                </div>

                {HUNDRED_FULL.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 24px',
                        border: '1.5px dashed #d6d3d1',
                        borderRadius: '16px',
                        color: '#78716c',
                        fontSize: '14px',
                    }}>
                        100例文を準備中
                    </div>
                )}

                {/* Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {visible.map(entry => {
                        const meta = HUNDRED_PART_META[entry.part];
                        const isExpanded = expandedNo === entry.no;
                        const isDone = done.has(entry.no);
                        const isSpeaking = speakingNo === entry.no;
                        return (
                            <div key={entry.no} style={{
                                border: `1px solid ${isExpanded ? meta.color : '#e7e5e4'}`,
                                borderRadius: '16px',
                                backgroundColor: isDone ? '#fafaf9' : '#fff',
                                overflow: 'hidden',
                                transition: 'border-color 0.15s ease',
                            }}>
                                {/* Card header */}
                                <div
                                    onClick={() => setExpandedNo(isExpanded ? null : entry.no)}
                                    style={{
                                        display: 'flex',
                                        alignItems: isMobile ? 'flex-start' : 'center',
                                        gap: '14px',
                                        padding: isMobile ? '16px' : '18px 22px',
                                        cursor: 'pointer',
                                        flexDirection: isMobile ? 'column' : 'row',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: isMobile ? 'auto' : '200px' }}>
                                        <span style={{
                                            fontSize: '13px',
                                            fontWeight: 900,
                                            color: '#a8a29e',
                                            minWidth: '34px',
                                        }}>
                                            {String(entry.no).padStart(3, '0')}
                                        </span>
                                        <span style={{
                                            fontSize: '10px',
                                            fontWeight: 700,
                                            color: meta.color,
                                            backgroundColor: meta.bg,
                                            padding: '3px 10px',
                                            borderRadius: '9999px',
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {entry.phenomenon}
                                        </span>
                                    </div>
                                    <div style={{ flex: 1, fontSize: isMobile ? '16px' : '18px', fontWeight: 700, opacity: isDone ? 0.5 : 1 }}>
                                        {entry.sentence}
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleSpeak(entry, 1.0); }}
                                            style={{
                                                padding: '7px 16px',
                                                borderRadius: '9999px',
                                                border: 'none',
                                                backgroundColor: isSpeaking ? '#D4AF37' : '#1c1917',
                                                color: '#fff',
                                                fontSize: '11px',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {isSpeaking ? '再生中' : '聞く'}
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleDone(entry.no); }}
                                            title="攻略済みにする"
                                            style={{
                                                width: '30px',
                                                height: '30px',
                                                borderRadius: '9999px',
                                                border: isDone ? 'none' : '1.5px solid #d6d3d1',
                                                backgroundColor: isDone ? '#10B981' : '#fff',
                                                color: '#fff',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '14px',
                                                fontWeight: 900,
                                                flexShrink: 0,
                                            }}
                                        >
                                            {isDone ? 'v' : ''}
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded body */}
                                {isExpanded && (
                                    <div style={{ borderTop: '1px solid #f5f5f4', padding: isMobile ? '18px 16px' : '24px 22px 26px' }}>
                                        {/* 実際の音 */}
                                        <div style={{
                                            backgroundColor: '#1c1917',
                                            borderRadius: '12px',
                                            padding: '20px 22px',
                                            marginBottom: '18px',
                                        }}>
                                            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: '#a8a29e', marginBottom: '8px' }}>
                                                実際の音
                                            </div>
                                            <div style={{
                                                fontSize: isMobile ? '19px' : '24px',
                                                fontWeight: 800,
                                                color: '#D4AF37',
                                                letterSpacing: '0.02em',
                                                wordBreak: 'break-word',
                                            }}>
                                                {entry.sound}
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                                                <button
                                                    onClick={() => handleSpeak(entry, 1.0)}
                                                    style={{
                                                        padding: '7px 18px', borderRadius: '9999px', border: 'none',
                                                        backgroundColor: '#D4AF37', color: '#1c1917',
                                                        fontSize: '11px', fontWeight: 800, cursor: 'pointer',
                                                    }}
                                                >
                                                    通常速
                                                </button>
                                                <button
                                                    onClick={() => handleSpeak(entry, 0.75)}
                                                    style={{
                                                        padding: '7px 18px', borderRadius: '9999px',
                                                        border: '1.5px solid #57534e', backgroundColor: 'transparent',
                                                        color: '#d6d3d1', fontSize: '11px', fontWeight: 800, cursor: 'pointer',
                                                    }}
                                                >
                                                    ゆっくり
                                                </button>
                                            </div>
                                        </div>

                                        <div style={{ fontSize: '14px', color: '#44403c', marginBottom: '16px' }}>
                                            <span style={{ fontWeight: 800 }}>訳:</span> {entry.ja}
                                            <span style={{ fontSize: '11px', color: '#a8a29e', marginLeft: '10px' }}>{entry.scene}</span>
                                        </div>

                                        {/* 掛け合い場面 */}
                                        {entry.dialogue && (
                                            <div style={{
                                                border: '1px solid #e7e5e4',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                                marginBottom: '16px',
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '10px 16px',
                                                    backgroundColor: '#fafaf9',
                                                    borderBottom: '1px solid #e7e5e4',
                                                }}>
                                                    <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.12em', color: '#78716c' }}>
                                                        場面で聞く (3行)
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            const lines = entry.dialogue!.map(l => l.line);
                                                            let i = 0;
                                                            const next = () => {
                                                                if (i >= lines.length) { setSpeakingNo(null); return; }
                                                                speak(lines[i++], 1.0, next);
                                                            };
                                                            setSpeakingNo(entry.no);
                                                            next();
                                                        }}
                                                        style={{
                                                            padding: '5px 14px', borderRadius: '9999px', border: 'none',
                                                            backgroundColor: '#1c1917', color: '#fff',
                                                            fontSize: '10px', fontWeight: 800, cursor: 'pointer',
                                                        }}
                                                    >
                                                        3行つづけて再生
                                                    </button>
                                                </div>
                                                {entry.dialogue.map((l, i) => (
                                                    <div key={i} style={{
                                                        display: 'flex',
                                                        gap: '12px',
                                                        padding: '12px 16px',
                                                        borderTop: i === 0 ? 'none' : '1px solid #f5f5f4',
                                                        backgroundColor: l.target ? meta.bg : '#fff',
                                                    }}>
                                                        <button
                                                            onClick={() => speak(l.line, 1.0)}
                                                            title="この行だけ再生"
                                                            style={{
                                                                flexShrink: 0,
                                                                width: '52px',
                                                                height: '22px',
                                                                borderRadius: '9999px',
                                                                border: 'none',
                                                                backgroundColor: l.target ? meta.color : '#e7e5e4',
                                                                color: l.target ? '#fff' : '#57534e',
                                                                fontSize: '10px',
                                                                fontWeight: 800,
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            {l.sp}
                                                        </button>
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <div style={{ fontSize: '14px', fontWeight: l.target ? 800 : 600, lineHeight: 1.6 }}>
                                                                {l.line}
                                                            </div>
                                                            <div style={{ fontSize: '12px', color: meta.color, fontWeight: 700, marginTop: '3px', wordBreak: 'break-word' }}>
                                                                {l.sound}
                                                            </div>
                                                            <div style={{ fontSize: '11px', color: '#78716c', marginTop: '3px' }}>{l.ja}</div>
                                                        </div>
                                                        {l.target && (
                                                            <span style={{
                                                                flexShrink: 0, alignSelf: 'flex-start',
                                                                fontSize: '9px', fontWeight: 800, color: meta.color,
                                                                border: `1px solid ${meta.color}`, borderRadius: '9999px', padding: '2px 7px',
                                                            }}>
                                                                狙い
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* 自分で使う版 */}
                                        {entry.youVersion && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                backgroundColor: 'rgba(16,185,129,0.07)',
                                                border: '1px solid rgba(16,185,129,0.25)',
                                                borderRadius: '12px',
                                                padding: '14px 16px',
                                                marginBottom: '16px',
                                            }}>
                                                <span style={{ fontSize: '10px', fontWeight: 800, color: '#059669', letterSpacing: '0.08em', flexShrink: 0 }}>
                                                    明日使う版
                                                </span>
                                                <span style={{ flex: 1, fontSize: '14px', fontWeight: 700 }}>{entry.youVersion}</span>
                                                <button
                                                    onClick={() => speak(entry.youVersion!, 1.0)}
                                                    style={{
                                                        padding: '5px 14px', borderRadius: '9999px', border: 'none',
                                                        backgroundColor: '#10B981', color: '#fff',
                                                        fontSize: '10px', fontWeight: 800, cursor: 'pointer', flexShrink: 0,
                                                    }}
                                                >
                                                    聞く
                                                </button>
                                            </div>
                                        )}

                                        {/* 副次的に含まれる現象 */}
                                        {entry.alsoCovers && entry.alsoCovers.length > 0 && (
                                            <div style={{ marginBottom: '16px' }}>
                                                <span style={{ fontSize: '10px', fontWeight: 800, color: '#78716c', letterSpacing: '0.08em', marginRight: '8px' }}>
                                                    この場面に同時に入っている音
                                                </span>
                                                {entry.alsoCovers.map(c => (
                                                    <span key={c} style={{
                                                        display: 'inline-block',
                                                        fontSize: '10px', fontWeight: 700, color: '#57534e',
                                                        backgroundColor: '#f5f5f4', border: '1px solid #e7e5e4',
                                                        borderRadius: '9999px', padding: '3px 9px', marginRight: '5px', marginTop: '4px',
                                                    }}>
                                                        {c}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                                            <div style={{ backgroundColor: meta.bg, borderRadius: '12px', padding: '16px 18px' }}>
                                                <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em', color: meta.color, marginBottom: '6px' }}>
                                                    何が起きているか
                                                </div>
                                                <p style={{ fontSize: '13px', color: '#44403c', lineHeight: 1.9, margin: 0 }}>{entry.focus}</p>
                                            </div>
                                            <div style={{ backgroundColor: 'rgba(225, 29, 72, 0.06)', borderRadius: '12px', padding: '16px 18px' }}>
                                                <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em', color: '#E11D48', marginBottom: '6px' }}>
                                                    日本人の耳はこう間違える
                                                </div>
                                                <p style={{ fontSize: '13px', color: '#44403c', lineHeight: 1.9, margin: 0 }}>{entry.trap}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.1em', color: '#78716c', marginBottom: '8px' }}>
                                                同じ現象はここでも起きる
                                            </div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                {entry.extras.map((ex, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => speak(ex, 1.0)}
                                                        title="タップで再生"
                                                        style={{
                                                            padding: '8px 14px',
                                                            borderRadius: '9999px',
                                                            border: '1px solid #e7e5e4',
                                                            backgroundColor: '#fafaf9',
                                                            color: '#44403c',
                                                            fontSize: '12px',
                                                            fontWeight: 600,
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        {ex}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ============ FOOTER CTA ============ */}
            <section style={{ backgroundColor: '#1c1917', color: '#fff', padding: isMobile ? '64px 24px' : '90px 48px', textAlign: 'center' }}>
                <h2 style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: 900, margin: 0, lineHeight: 1.5 }}>
                    知らない単語は、1つもなかったはず。
                </h2>
                <p style={{ fontSize: '14px', color: '#a8a29e', maxWidth: '560px', margin: '22px auto 0', lineHeight: 2 }}>
                    それでも聞こえなかったなら、原因は語彙でも年齢でも才能でもなく、音の変換表を持っていなかったこと。
                    表はこの100文で全部渡した。あとは毎日3文、口と耳に通すだけ。
                </p>
                <a href="#sentences" style={{
                    display: 'inline-block',
                    marginTop: '36px',
                    padding: '15px 40px',
                    backgroundColor: '#D4AF37',
                    color: '#1c1917',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                }}>
                    No.001 から始める
                </a>
            </section>
        </div>
    );
}
