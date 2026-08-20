'use client';

/**
 * 英語の玄関
 *
 * ■ 直した理由
 * ここには13枚のカードが並んでいた。作った側は全部違うものだと分かっているが、
 * 初めて来た人には13択でしかなく、**選べないので何もせずに帰る。**
 * 集客の入口に必要なのは選択肢ではなく、迷わず押せる1つと、押す理由になる1行。
 *
 * ■ 構成
 *  1. フック(実測した数字を1行)     — 止まる理由
 *  2. 無料の測定 1つだけ             — 登録なし / 5分 / 数字が出る
 *  3. メンバーシップ                 — 続きを一緒に作る
 *  4. これまでのアプリ(畳んで下に)  — 消さない。探しに来た人のために残す
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';

type CardProps = {
    href: string;
    tagline: string;
    title: string;
    desc: string;
    color: string;
    primary?: boolean;
};

function HubCard({ href, tagline, title, desc, color, primary = false }: CardProps) {
    return (
        <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{
                background: '#fff',
                border: `1px solid ${primary ? color + '55' : '#E7E5E4'}`,
                borderLeft: `4px solid ${color}`,
                borderRadius: 12,
                padding: primary ? '18px 20px' : '14px 16px',
                transition: 'all 0.15s ease',
                boxShadow: primary ? '0 2px 10px rgba(212,175,55,0.08)' : 'none',
                height: '100%',
            }}>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', color, fontWeight: 800, marginBottom: 6 }}>
                    {tagline}
                </div>
                <div style={{ fontSize: primary ? 19 : 15, fontWeight: 900, color: '#1C1917', marginBottom: 4, letterSpacing: '-0.01em' }}>
                    {title}
                </div>
                <div style={{ fontSize: 12, color: '#78716C', lineHeight: 1.6 }}>{desc}</div>
            </div>
        </Link>
    );
}

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';

export default function EnglishHomeHub() {
    const [earLv, setEarLv] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem('ear:result');
            if (raw) {
                const r = JSON.parse(raw);
                if (typeof r.lv === 'number') setEarLv(r.lv);
            }
        } catch { /* noop */ }
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', padding: '28px 16px 64px' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>

                {/* ===== 1. フック ===== */}
                <div style={{ fontSize: 10, letterSpacing: '0.3em', color: '#A8A29E', fontWeight: 700, marginBottom: 8 }}>
                    TONIO LAB ・ 英語
                </div>
                <h1 style={{ fontSize: 27, fontWeight: 900, color: INK, margin: '0 0 14px', letterSpacing: '-0.02em', lineHeight: 1.4 }}>
                    あなたは単語を知らないんじゃない。<br />
                    <span style={{ color: DEEPGOLD }}>並びを知らないだけ。</span>
                </h1>
                <p style={{ fontSize: 13.5, color: '#44403C', margin: '0 0 8px', lineHeight: 1.95 }}>
                    英語を話す人が <b style={{ fontFamily: 'Georgia, serif' }}>kind</b> に会う回数は一生で <b>131,909回</b>。
                    そのうち <b style={{ color: INK }}>89%が <span style={{ fontFamily: 'Georgia, serif' }}>kind of</span></b>(なんか、ちょっと)。
                    単語帳で「親切な」と覚えた人は、9割を取り逃します。
                </p>
                <p style={{ fontSize: 12, color: SUB, margin: '0 0 22px', lineHeight: 1.85 }}>
                    1億語の話し言葉コーパスを自分で作って数えた結果です。ここは、その数字で英語をやり直す実験場です。
                </p>

                {/* ===== 2. 無料の測定(唯一の主導線) ===== */}
                <Link href="/english/ear" style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{
                        background: INK, color: '#fff', borderRadius: 14,
                        padding: '22px 22px', marginBottom: 12,
                    }}>
                        <div style={{ fontSize: 9.5, letterSpacing: '0.24em', color: GOLD, fontWeight: 900, marginBottom: 8 }}>
                            まずここから ・ 無料 ・ 5分 ・ 登録不要
                        </div>
                        <div style={{ fontSize: 21, fontWeight: 900, letterSpacing: '-0.01em', marginBottom: 6 }}>
                            あなたの耳が、どこで壊れるか測る
                        </div>
                        <div style={{ fontSize: 12.5, opacity: 0.78, lineHeight: 1.75 }}>
                            速度と雑音を10段まで上げて、文が保てなくなる段を出します。
                            {earLv !== null && (
                                <span style={{ color: GOLD, fontWeight: 800 }}>　前回: Lv.{earLv} / 10</span>
                            )}
                        </div>
                        <div style={{
                            display: 'inline-block', marginTop: 14,
                            background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`,
                            padding: '11px 22px', borderRadius: 10, fontSize: 14, fontWeight: 900,
                        }}>
                            {earLv !== null ? 'もう一度測る' : '測定を始める'}
                        </div>
                    </div>
                </Link>

                {/* ===== 2.5 コーチング(募集中) ===== */}
                <Link href="/english/coach" style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{
                        background: '#fff', border: `1px solid ${LINE}`, borderLeft: '4px solid #DC2626',
                        borderRadius: 12, padding: '15px 17px', marginBottom: 12,
                    }}>
                        <div style={{ fontSize: 9, letterSpacing: '0.2em', color: '#DC2626', fontWeight: 800, marginBottom: 5 }}>
                            COACHING ・ メンバーシップ
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 900, color: INK, marginBottom: 4 }}>
                            話せないコーチが、28日つきあいます
                        </div>
                        <div style={{ fontSize: 12, color: SUB, lineHeight: 1.65 }}>
                            完璧な先生より、もがいてる先生のほうが効く。根拠のある研究と、28日の手順を全部公開しています。
                        </div>
                    </div>
                </Link>

                {/* ===== 3. メンバーシップ ===== */}
                <Link href="/membership" style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{
                        background: '#fff', border: `1px solid ${GOLD}55`, borderLeft: `4px solid ${GOLD}`,
                        borderRadius: 12, padding: '15px 17px', marginBottom: 30,
                    }}>
                        <div style={{ fontSize: 9, letterSpacing: '0.2em', color: DEEPGOLD, fontWeight: 800, marginBottom: 5 }}>
                            MEMBERSHIP ・ ¥980 / 月
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 900, color: INK, marginBottom: 4 }}>
                            続きを、一緒に作る
                        </div>
                        <div style={{ fontSize: 12, color: SUB, lineHeight: 1.65 }}>
                            毎日こちらが先に失敗を出します。作りかけも全部見せます。要望がそのまま次の機能になります。
                        </div>
                    </div>
                </Link>

                {/* ===== 4. これまでのアプリ(畳む) ===== */}
                <button
                    onClick={() => setShowAll(!showAll)}
                    style={{
                        width: '100%', background: '#fff', border: `1px solid ${LINE}`, borderRadius: 10,
                        padding: '13px 16px', textAlign: 'left', cursor: 'pointer',
                        fontSize: 13, fontWeight: 800, color: INK,
                    }}
                >
                    これまでに作ったアプリ(13本) {showAll ? '▲' : '▼'}
                    <span style={{ fontSize: 11, fontWeight: 600, color: SUB, marginLeft: 8 }}>
                        全部無料・登録不要
                    </span>
                </button>

                {showAll && (
                    <div style={{ marginTop: 14 }}>
                        <div style={{ marginBottom: 14 }}>
                            <HubCard
                                href="/english/toeic"
                                tagline="TOEIC / 30日でスコアUP"
                                title="居酒屋TOEIC"
                                desc="DUO式300例文 + 金フレ式310単語。居酒屋の6人と、30日。"
                                color="#D4AF37"
                                primary
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: 14 }}>
                            <HubCard href="/english/harvest" tagline="MOVIE / 毎日1本" title="Movie Harvest" desc="映画の名セリフ10個を分解" color="#92400E" />
                            <HubCard href="/english/izakaya-toeic/kaiwa" tagline="DAILY PHRASES" title="英会話マスター365" desc="毎日10フレーズ。今日も続ける。" color="#10B981" />
                            <HubCard href="/english/story-vocab" tagline="PRE-1 / 物語で覚える" title="呪術廻戦で英検準1級" desc="宿儺・五条・七海。好きな物語に単語を乗せる。" color="#B91C1C" />
                            <HubCard href="/english/jp-yt" tagline="JP→EN / 罪悪感ゼロ" title="罪悪感ゼロ英語" desc="ヒカキン見るの、もう罪悪感いらない。その日本語、英語に変えれば勉強になる。" color="#0EA5E9" />
                            <HubCard href="/english/survival" tagline="SURVIVAL / 会話シミュレーター" title="修羅場英会話" desc="空港で欠航、病院で激痛。崩れた英語のまま、その場を切り抜けろ。" color="#DC2626" />
                        </div>

                        <div style={{ marginTop: 24, marginBottom: 12 }}>
                            <div style={{ fontSize: 10.5, letterSpacing: '0.2em', color: '#DC2626', fontWeight: 800 }}>LAB ・ 実験版</div>
                            <h2 style={{ fontSize: 19, fontWeight: 900, color: INK, margin: '4px 0 4px', letterSpacing: '-0.02em' }}>7つの全く違う型</h2>
                            <p style={{ fontSize: 12, color: SUB, margin: 0, lineHeight: 1.7 }}>
                                同じ「崩れた実英語」を、7つの違うやり方で。読む・聞く・話す・反射・没入・切り抜ける。
                            </p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                            <HubCard href="/english/jp-yt-v2" tagline="v2 ・ 習慣(TODAY)" title="罪悪感ゼロ TODAY" desc="1日1本やり切る型。1表現ずつ自己採点、連続日数で続ける。" color="#0EA5E9" />
                            <HubCard href="/english/dictation" tagline="v4 ・ 聞く(打つ)" title="聞き取りディクテーション" desc="速い崩れた音を聞いて打つ。聞き間違えポイントを潰す。" color="#7C3AED" />
                            <HubCard href="/english/interpret" tagline="v5 ・ 話す(通訳)" title="同時通訳ジム" desc="日本語→3秒で英語を口に。通訳案内士・英検二次の筋トレ。" color="#0891B2" />
                            <HubCard href="/english/reflex" tagline="v6 ・ 反射(3秒)" title="3秒で返せ" desc="相手の一言に3秒で返す。会話は反射。詰まる前に何か言え。" color="#EA580C" />
                            <HubCard href="/english/story" tagline="v7 ・ 没入(物語)" title="物語没入チャット" desc="短い物語をチャットで読み進める。シーンごと体に入れる。" color="#DB2777" />
                            <HubCard href="/english/mistakes" tagline="復習 ・ 間違い帳" title="俺の英語エラー帳" desc="会話で出た文法ミスを溜めて見返す。同じパターンを何回やってるかも分かる。" color="#DC2626" />
                        </div>
                    </div>
                )}

                <div style={{
                    marginTop: 22, padding: '10px 14px', background: '#fff',
                    border: `1px dashed ${LINE}`, borderRadius: 10,
                    fontSize: 11, color: '#A8A29E', lineHeight: 1.7,
                }}>
                    すべて無料・登録不要。データは端末内に保存されます。
                </div>
            </div>
        </div>
    );
}
