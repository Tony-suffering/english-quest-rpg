'use client';

import Link from 'next/link';

const C = {
    gold: '#D4AF37', green: '#10B981', blue: '#3B82F6',
    bg: '#FAFAF9', card: '#FFFFFF', border: '#E7E5E4',
    textPrimary: '#1C1917', textSub: '#57534E', textDim: '#78716C', textFaint: '#A8A29E',
};

export default function Native365LP() {
    return (
        <div style={{ minHeight: '100vh', background: C.bg }}>
            {/* Hero */}
            <section style={{ padding: '48px 20px 32px', maxWidth: 760, margin: '0 auto' }}>
                <div style={{ fontSize: 10, letterSpacing: 3, color: C.textFaint, fontWeight: 800, marginBottom: 10 }}>
                    NATIVE 365 / ネイティブ365
                </div>
                <h1 style={{
                    fontSize: 30, fontWeight: 900, color: C.textPrimary,
                    margin: '0 0 10px', letterSpacing: '-0.02em', lineHeight: 1.3,
                }}>
                    TOEIC 900 でも、<br />
                    ネイティブに 3 秒でバレる。
                </h1>
                <p style={{ fontSize: 14, color: C.textSub, lineHeight: 1.8, margin: '0 0 20px' }}>
                    読める。聴ける。書ける。TOEIC は取った。英検も受かった。<br />
                    それでも、英語のネイティブは一瞬で日本人だと見抜く。<br />
                    理由は <strong style={{ color: C.textPrimary }}>発音の骨格と、文法のズレ</strong>。
                </p>
                <div style={{
                    background: '#fff', border: `1px solid ${C.border}`,
                    borderLeft: `4px solid ${C.gold}`,
                    borderRadius: 10, padding: '14px 16px', marginBottom: 20,
                    fontSize: 13, color: C.textSub, lineHeight: 1.8,
                }}>
                    教科書通りに発音してるつもりが「アバウト」と読んでる。
                    I lost my keys と I've lost my keys が使い分けできない。
                    この「最後の1マイル」を365日で潰す。
                </div>
            </section>

            {/* Structure */}
            <section style={{ padding: '20px', maxWidth: 760, margin: '0 auto' }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: C.textFaint, fontWeight: 800, marginBottom: 10 }}>
                    STRUCTURE / 1日の型
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 900, color: C.textPrimary, margin: '0 0 14px' }}>
                    毎日、発音1テーマ + 文法1テーマ。
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
                    <div style={{
                        background: '#fff', border: `1px solid ${C.gold}40`,
                        borderLeft: `4px solid ${C.gold}`,
                        borderRadius: 10, padding: '14px 16px',
                    }}>
                        <div style={{ fontSize: 9, fontWeight: 800, color: C.gold, letterSpacing: 2, marginBottom: 6 }}>発音</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>
                            schwa / 強勢 / 連結 / 縮約
                        </div>
                        <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.7 }}>
                            「アバウト」を u-BOUT に直すだけで、一気に英語のリズムになる。
                        </div>
                    </div>
                    <div style={{
                        background: '#fff', border: `1px solid ${C.green}40`,
                        borderLeft: `4px solid ${C.green}`,
                        borderRadius: 10, padding: '14px 16px',
                    }}>
                        <div style={{ fontSize: 9, fontWeight: 800, color: C.green, letterSpacing: 2, marginBottom: 6 }}>文法</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>
                            時制 / 冠詞 / 前置詞 / discourse
                        </div>
                        <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.7 }}>
                            学校文法は知ってる。でも使えない。「今への影響」1つで現在完了が腑に落ちる。
                        </div>
                    </div>
                </div>
            </section>

            {/* 4 levels */}
            <section style={{ padding: '20px', maxWidth: 760, margin: '0 auto' }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: C.textFaint, fontWeight: 800, marginBottom: 10 }}>
                    METHOD / 4段階メソッド
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 900, color: C.textPrimary, margin: '0 0 14px' }}>
                    1項目を CORE → NUANCE → SHIFT → NATIVE で深掘る。
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
                    {[
                        { label: 'CORE',   desc: '骨格ルール。辞書通りの「正解」',           color: '#78716C' },
                        { label: 'NUANCE', desc: 'なぜネイティブはそう感じるのか。理由',     color: C.gold },
                        { label: 'SHIFT',  desc: '文脈で何が変わるか。米英差・砕けた形',     color: C.green },
                        { label: 'NATIVE', desc: '実際に口から出る一言。明日から使える形',   color: C.blue },
                    ].map(m => (
                        <div key={m.label} style={{
                            background: '#fff', border: `1px solid ${m.color}30`,
                            borderLeft: `4px solid ${m.color}`,
                            borderRadius: 8, padding: '10px 14px',
                            display: 'flex', alignItems: 'center', gap: 14,
                        }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: m.color, letterSpacing: 1.5, minWidth: 60 }}>
                                {m.label}
                            </div>
                            <div style={{ fontSize: 12, color: C.textSub, lineHeight: 1.5 }}>
                                {m.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6 characters */}
            <section style={{ padding: '20px', maxWidth: 760, margin: '0 auto' }}>
                <div style={{ fontSize: 10, letterSpacing: 2, color: C.textFaint, fontWeight: 800, marginBottom: 10 }}>
                    CAST / 6人の視点
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 900, color: C.textPrimary, margin: '0 0 14px' }}>
                    居酒屋TOEIC の6人が、各項目を別角度で斬る。
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8 }}>
                    {[
                        { n: '権藤',   r: '構造',       c: '#78716C' },
                        { n: 'リサ',   r: 'ネイティブ', c: '#EC4899' },
                        { n: 'タケシ', r: '落とし穴',   c: '#3B82F6' },
                        { n: 'ユキ',   r: '学習者',     c: '#D4AF37' },
                        { n: '健二',   r: '現場',       c: '#92400E' },
                        { n: 'ミナ',   r: 'Z世代',      c: '#8B5CF6' },
                    ].map(ch => (
                        <div key={ch.n} style={{
                            background: '#fff', border: `1px solid ${ch.c}30`,
                            borderRadius: 10, padding: '10px 12px',
                        }}>
                            <div style={{ fontSize: 13, fontWeight: 800, color: C.textPrimary, marginBottom: 2 }}>
                                {ch.n}
                            </div>
                            <div style={{ fontSize: 10, color: ch.c, fontWeight: 700, letterSpacing: 0.5 }}>
                                {ch.r}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '32px 20px 48px', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
                <Link href="/english/native365" style={{
                    display: 'inline-block',
                    padding: '14px 28px', background: C.gold, color: '#fff',
                    fontSize: 14, fontWeight: 800, letterSpacing: 1,
                    borderRadius: 10, textDecoration: 'none',
                }}>
                    Day 1 を始める →
                </Link>
                <div style={{ fontSize: 11, color: C.textFaint, marginTop: 12 }}>
                    登録不要・無料・データは端末内
                </div>
            </section>
        </div>
    );
}
