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

type StripCardProps = {
    href: string;
    tagline: string;
    title: string;
    sub: string;
    color: string;
};

function StripCard({ href, tagline, title, sub, color }: StripCardProps) {
    return (
        <Link href={href} style={{ textDecoration: 'none', display: 'block', flex: '1 1 180px', minWidth: 0 }}>
            <div style={{
                background: '#fff',
                border: '1px solid #E7E5E4',
                borderLeft: `3px solid ${color}`,
                borderRadius: 10,
                padding: '10px 12px',
                transition: 'all 0.15s ease',
                height: '100%',
            }}>
                <div style={{
                    fontSize: 9,
                    letterSpacing: '0.18em',
                    color,
                    fontWeight: 800,
                    marginBottom: 4,
                }}>
                    {tagline}
                </div>
                <div style={{
                    fontSize: 13,
                    fontWeight: 900,
                    color: '#1C1917',
                    marginBottom: 2,
                    letterSpacing: '-0.01em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {title}
                </div>
                <div style={{
                    fontSize: 11,
                    color: '#78716C',
                    lineHeight: 1.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {sub}
                </div>
            </div>
        </Link>
    );
}

export default function TodayOthersStrip() {
    const [yomi, setYomi] = useState(1);
    const [lis, setLis] = useState(1);

    useEffect(() => {
        setYomi(loadDay('yomique_stats'));
        setLis(loadDay('lisque_stats'));
    }, []);

    return (
        <div style={{ marginBottom: 14 }}>
            <div style={{
                fontSize: 10,
                letterSpacing: '0.2em',
                color: '#A8A29E',
                fontWeight: 700,
                marginBottom: 6,
            }}>
                今日のもう一本
            </div>
            <div style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
            }}>
                <StripCard
                    href="/english/yomique"
                    tagline="READING"
                    title="ヨミクエ"
                    sub={`Day ${yomi} / 30 -- 読める脳を作る`}
                    color="#F97316"
                />
                <StripCard
                    href="/english/lisque"
                    tagline="LISTENING"
                    title="リスクエ"
                    sub={`Day ${lis} / 30 -- 聞ける耳を作る`}
                    color="#3B82F6"
                />
                <StripCard
                    href="/english/harvest"
                    tagline="MOVIE"
                    title="Movie Harvest"
                    sub="名セリフ10個を分解"
                    color="#92400E"
                />
            </div>
        </div>
    );
}
