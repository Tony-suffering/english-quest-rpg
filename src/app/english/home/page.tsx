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

                {/* Primary: 365 */}
                <div style={{ marginBottom: 14 }}>
                    <HubCard
                        href="/english/izakaya-toeic/kaiwa"
                        tagline="DAILY PHRASES"
                        title="英会話マスター365"
                        desc="毎日10フレーズ。今日も続ける。"
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
                        href="/english/toeic"
                        tagline="TOEIC DRAMA / 30話"
                        title="居酒屋TOEIC"
                        desc="連続ドラマでスコアUP"
                        color="#10B981"
                    />
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
