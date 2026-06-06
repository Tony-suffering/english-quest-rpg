'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

function loadDay(key: string): number {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return 1;
        const s = JSON.parse(raw);
        return typeof s.currentDay === 'number' ? s.currentDay : 1;
    } catch { return 1; }
}

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
                <div style={{
                    fontSize: primary ? 19 : 15,
                    fontWeight: 900,
                    color: '#1C1917',
                    marginBottom: 4,
                    letterSpacing: '-0.01em',
                }}>
                    {title}
                </div>
                <div style={{ fontSize: 12, color: '#78716C', lineHeight: 1.6 }}>
                    {desc}
                </div>
            </div>
        </Link>
    );
}

export default function EnglishHomeHub() {
    const [yomi, setYomi] = useState(1);
    const [lis, setLis] = useState(1);

    useEffect(() => {
        setYomi(loadDay('yomique_stats'));
        setLis(loadDay('lisque_stats'));
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', padding: '28px 16px 64px' }}>
            <div style={{ maxWidth: 760, margin: '0 auto' }}>
                <div style={{ fontSize: 10, letterSpacing: '0.3em', color: '#A8A29E', fontWeight: 700, marginBottom: 8 }}>
                    TODAY
                </div>
                <h1 style={{
                    fontSize: 26,
                    fontWeight: 900,
                    color: '#1C1917',
                    margin: '0 0 6px',
                    letterSpacing: '-0.02em',
                }}>
                    今日、何をやる？
                </h1>
                <p style={{ fontSize: 13, color: '#78716C', margin: '0 0 24px', lineHeight: 1.7 }}>
                    好きなアプリから始める。あとでサイドバーから切り替えられる。
                </p>

                {/* Primary: 居酒屋TOEIC */}
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

                {/* Sub-apps grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: 12,
                    marginBottom: 14,
                }}>
                    {/* 商品を2本に集約: ネイティブ365 / ヨミクエ / リスクエ は一旦非表示。戻すときはこのコメントを外す。
                    <HubCard
                        href="/english/native365"
                        tagline="ADVANCED / 発音+文法"
                        title="ネイティブ365"
                        desc="英語の最後の1マイル。発音と文法を毎日1つずつ"
                        color="#8B5CF6"
                    />
                    <HubCard
                        href="/english/yomique"
                        tagline="READING / 30日"
                        title="ヨミクエ"
                        desc={`Day ${yomi} / 30 -- 読める脳を作る`}
                        color="#F97316"
                    />
                    <HubCard
                        href="/english/lisque"
                        tagline="LISTENING / 30日"
                        title="リスクエ"
                        desc={`Day ${lis} / 30 -- 聞ける耳を作る`}
                        color="#3B82F6"
                    />
                    */}
                    <HubCard
                        href="/english/harvest"
                        tagline="MOVIE / 毎日1本"
                        title="Movie Harvest"
                        desc="映画の名セリフ10個を分解"
                        color="#92400E"
                    />
                    <HubCard
                        href="/english/izakaya-toeic/kaiwa"
                        tagline="DAILY PHRASES"
                        title="英会話マスター365"
                        desc="毎日10フレーズ。今日も続ける。"
                        color="#10B981"
                    />
                    <HubCard
                        href="/english/story-vocab"
                        tagline="PRE-1 / 物語で覚える"
                        title="呪術廻戦で英検準1級"
                        desc="宿儺・五条・七海。好きな物語に単語を乗せる。"
                        color="#B91C1C"
                    />
                    <HubCard
                        href="/english/jp-yt"
                        tagline="JP→EN / 罪悪感ゼロ"
                        title="罪悪感ゼロ英語"
                        desc="ヒカキン見るの、もう罪悪感いらない。その日本語、英語に変えれば勉強になる。"
                        color="#0EA5E9"
                    />
                    <HubCard
                        href="/english/survival"
                        tagline="SURVIVAL / 会話シミュレーター"
                        title="修羅場英会話"
                        desc="空港で欠航、病院で激痛。崩れた英語のまま、その場を切り抜けろ。選ぶたび相手が変わる。"
                        color="#DC2626"
                    />
                </div>

                {/* ===== 英語ラボ v1〜v7 (でかでか) ===== */}
                <div style={{ marginTop: 30, marginBottom: 14 }}>
                    <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#DC2626', fontWeight: 800 }}>LAB ・ 実験版</div>
                    <h2 style={{ fontSize: 24, fontWeight: 900, color: '#1C1917', margin: '4px 0 4px', letterSpacing: '-0.02em' }}>英語ラボ — 7つの全く違う型</h2>
                    <p style={{ fontSize: 12.5, color: '#78716C', margin: 0, lineHeight: 1.7 }}>同じ「崩れた実英語」を、7つの違うやり方で。読む・聞く・話す・反射・没入・切り抜ける。全部ここに残してある。</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 14 }}>
                    <HubCard href="/english/jp-yt" tagline="v1 ・ 読む(カレンダー)" title="罪悪感ゼロ英語" desc="日本語YouTubeの言葉をネイティブ英語に。30日分の表現を月めくりで。" color="#0EA5E9" />
                    <HubCard href="/english/jp-yt-v2" tagline="v2 ・ 習慣(TODAY)" title="罪悪感ゼロ TODAY" desc="1日1本やり切る型。1表現ずつ自己採点、連続日数で続ける。" color="#0EA5E9" />
                    <HubCard href="/english/survival" tagline="v3 ・ 切り抜ける(分岐)" title="修羅場英会話" desc="高圧の会話を選択肢で切り抜けるシミュレーター。選ぶたび相手が変わる。" color="#DC2626" primary />
                    <HubCard href="/english/dictation" tagline="v4 ・ 聞く(打つ)" title="聞き取りディクテーション" desc="速い崩れた音を聞いて打つ。聞き間違えポイントを潰す。本丸。" color="#7C3AED" />
                    <HubCard href="/english/interpret" tagline="v5 ・ 話す(通訳)" title="同時通訳ジム" desc="日本語→3秒で英語を口に。通訳案内士・英検二次の筋トレ。" color="#0891B2" />
                    <HubCard href="/english/reflex" tagline="v6 ・ 反射(3秒)" title="3秒で返せ" desc="相手の一言に3秒で返す。会話は反射。詰まる前に何か言え。" color="#EA580C" />
                    <HubCard href="/english/story" tagline="v7 ・ 没入(物語)" title="物語没入チャット" desc="短い物語をチャットで読み進める。シーンごと体に入れる。" color="#DB2777" />
                    <HubCard href="/english/mistakes" tagline="復習 ・ 間違い帳" title="俺の英語エラー帳" desc="会話で出た文法ミスを溜めて見返す。同じパターンを何回やってるかも分かる。" color="#DC2626" />
                </div>

                <div style={{
                    marginTop: 8,
                    padding: '10px 14px',
                    background: '#fff',
                    border: '1px dashed #E7E5E4',
                    borderRadius: 10,
                    fontSize: 11,
                    color: '#A8A29E',
                    lineHeight: 1.7,
                }}>
                    すべて無料・登録不要。データは端末内に保存される。
                </div>
            </div>
        </div>
    );
}
