// AREA POSTERS — エリアごとの一枚絵。TonioPoster と同じ6色・同じ様式で揃える。
//
// ディズニーのアトラクション看板が効くのは、1枚が上手いからではなく **並んでいるから**。
// 様式と色が完全に揃った看板が横に並ぶと、そこが1つの世界だと脳が判断する。
// だからここは「良い絵を1枚」ではなく「同じ規格の絵を複数」を目的にしている。
//
// 規格(破らない):
//   色は6色のみ / 空は上から下へ4段 / シルエットは3層 / 灯りは1箇所だけ強い
//   文字は上に小さいラベル、中央に大きいセリフ体、下に一行
//   動くのは1枚につき1種類だけ

import Link from 'next/link';

const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";

const CREAM = '#F3ECDC';
const GOLD = '#EFC65B';
const INK = '#141019';

export interface AreaPosterProps {
    href: string;
    kicker: string;       // 上の小さいラベル
    title: string;        // 中央の大きい文字
    line: string;         // 下の一行
    palette: [string, string, string, string]; // 空4段(上→下)
    silhouette: 'stadium' | 'zoo' | 'diner' | 'harbor';
    lamp: string;         // 灯りの色
}

export const AREA_POSTERS: AreaPosterProps[] = [
    {
        href: '/english/tonight', kicker: 'FRIDAY NIGHT', title: 'THE LIGHTS',
        line: '町の全員が来る。ここで英雄になると、以後15年やらされる。',
        palette: ['#101B33', '#2C2249', '#5C2F49', '#8A4A52'],
        silhouette: 'stadium', lamp: '#EFC65B',
    },
    {
        href: '/english/zoo', kicker: 'ON THE EDGE OF TOWN', title: 'THE ZOO',
        line: '口から出てしまったものの収蔵庫。檻に入れた個体は、二度と人を襲わない。',
        palette: ['#12202E', '#1F3A3C', '#3E5A3A', '#7E7A38'],
        silhouette: 'zoo', lamp: '#9BD17A',
    },
    {
        href: '/english/365', kicker: 'MONDAY NIGHT', title: "THE LOSERS' TABLE",
        line: 'その週に失ったものを申告する。一番損していない者が全員分払う。',
        palette: ['#160F22', '#2A1A33', '#4A2436', '#8A3A2C'],
        silhouette: 'diner', lamp: '#EFC65B',
    },
    {
        href: '/english/newspaper', kicker: 'CROSSING NIGHTLY', title: 'THE TONIO TIMES',
        line: '町で刷られ、店に置かれ、海の向こうで読まれる。人は渡れない。',
        palette: ['#0E1B2E', '#243B52', '#4A5C6E', '#B08A54'],
        silhouette: 'harbor', lamp: '#EFC65B',
    },
];

function Silhouette({ kind, lamp }: { kind: AreaPosterProps['silhouette']; lamp: string }) {
    const dark = '#150F1E';
    if (kind === 'stadium') {
        return (
            <g>
                <path d="M0 258 L520 258 L520 340 L0 340 Z" fill={dark} />
                {/* 観客席 */}
                <path d="M40 258 L120 214 L400 214 L480 258 Z" fill="#241A33" />
                {/* 照明塔 4本 */}
                {[70, 170, 330, 440].map((x, i) => (
                    <g key={i}>
                        <rect x={x} y={96 + (i % 2) * 14} width="6" height={162 - (i % 2) * 14} fill={dark} />
                        <rect x={x - 17} y={80 + (i % 2) * 14} width="40" height="18" fill={dark} />
                        <rect className="pulse" x={x - 15} y={82 + (i % 2) * 14} width="36" height="14" fill={lamp}
                            filter="url(#ap-glow)" style={{ animationDelay: `${i * 0.7}s` }} />
                    </g>
                ))}
                {/* フィールドの光 */}
                <ellipse cx="260" cy="250" rx="180" ry="26" fill={lamp} opacity="0.18" />
            </g>
        );
    }
    if (kind === 'zoo') {
        return (
            <g>
                <path d="M0 268 L520 268 L520 340 L0 340 Z" fill={dark} />
                {/* 門 */}
                <rect x="176" y="150" width="14" height="118" fill={dark} />
                <rect x="330" y="150" width="14" height="118" fill={dark} />
                <path d="M164 150 L356 150 L356 136 L164 136 Z" fill={dark} />
                <path d="M176 136 Q 260 96 344 136 Z" fill={dark} />
                <rect className="pulse" x="236" y="112" width="48" height="16" fill={lamp} filter="url(#ap-glow)" />
                {/* 檻の柵 */}
                {Array.from({ length: 11 }).map((_, i) => (
                    <rect key={i} x={196 + i * 14} y="188" width="3" height="80" fill="#241A33" />
                ))}
                {/* 木 */}
                {[46, 92, 430, 478].map((x, i) => (
                    <g key={i}><rect x={x} y="212" width="7" height="56" fill={dark} />
                        <circle cx={x + 3} cy="204" r={26 - (i % 2) * 6} fill={dark} /></g>
                ))}
            </g>
        );
    }
    if (kind === 'diner') {
        return (
            <g>
                <path d="M0 276 L520 276 L520 340 L0 340 Z" fill={dark} />
                <rect x="120" y="186" width="280" height="90" fill="#1A1226" />
                <rect x="120" y="186" width="280" height="10" fill="#8A3A2C" />
                {[0, 1, 2, 3, 4, 5].map(i => (
                    <rect key={i} x={140 + i * 44} y="216" width="30" height="38" fill={lamp} opacity="0.92" filter="url(#ap-glow)" />
                ))}
                <g className="pulse">
                    <rect x="196" y="140" width="128" height="30" fill="#1A1226" stroke={lamp} strokeWidth="2" />
                    <text x="260" y="161" textAnchor="middle" fontFamily={SERIF} fontSize="15" letterSpacing="5" fill={lamp}>OPEN</text>
                </g>
                <rect x="256" y="170" width="6" height="16" fill="#1A1226" />
                {/* 駐車中の車 */}
                <g fill={dark}>
                    <path d="M40 262 L60 244 L104 244 L120 262 L120 276 L40 276 Z" />
                    <path d="M410 264 L426 248 L466 248 L482 264 L482 276 L410 276 Z" />
                </g>
            </g>
        );
    }
    return (
        <g>
            {/* 港 */}
            <path d="M0 286 L520 286 L520 340 L0 340 Z" fill="#101B2C" />
            <path d="M0 286 L520 286 L520 292 L0 292 Z" fill="#24384E" />
            {/* 桟橋 */}
            <rect x="0" y="268" width="180" height="8" fill={dark} />
            {[16, 56, 96, 136].map((x, i) => <rect key={i} x={x} y="276" width="6" height="18" fill={dark} />)}
            {/* 船 */}
            <g>
                <path d="M286 268 L378 268 L362 292 L302 292 Z" fill={dark} />
                <rect x="330" y="186" width="5" height="82" fill={dark} />
                <path d="M336 190 L392 214 L336 236 Z" fill={CREAM} opacity="0.92" />
                <path d="M328 200 L288 220 L328 240 Z" fill={CREAM} opacity="0.7" />
                <rect className="pulse" x="322" y="176" width="20" height="10" fill={lamp} filter="url(#ap-glow)" />
            </g>
            {/* 灯台 */}
            <g>
                <path d="M462 196 L482 196 L490 286 L454 286 Z" fill={dark} />
                <rect className="pulse" x="460" y="178" width="24" height="18" fill={lamp} filter="url(#ap-glow)" />
            </g>
            {/* 波 */}
            {[300, 316, 332].map((y, i) => (
                <path key={i} d={`M${-20 + i * 30} ${y} q 22 -7 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0 t 44 0`}
                    fill="none" stroke="#33506B" strokeWidth="2" opacity={0.6 - i * 0.15} />
            ))}
        </g>
    );
}

export function AreaPoster({ href, kicker, title, line, palette, silhouette, lamp }: AreaPosterProps) {
    const id = href.replace(/\W/g, '');
    return (
        <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{
                border: `1px solid ${INK}`, overflow: 'hidden', background: palette[0],
                boxShadow: '0 2px 0 rgba(20,16,25,0.85), 0 12px 26px rgba(20,16,25,0.2)',
            }}>
                <svg viewBox="0 0 520 460" style={{ width: '100%', height: 'auto', display: 'block' }}>
                    <style>{`
                        @keyframes ap { 0%,100% { opacity:.6 } 50% { opacity:1 } }
                        .pulse { animation: ap 3s ease-in-out infinite }
                        @media (prefers-reduced-motion: reduce) { .pulse { animation: none } }
                    `}</style>
                    <defs>
                        <linearGradient id={`sky${id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={palette[0]} />
                            <stop offset="42%" stopColor={palette[1]} />
                            <stop offset="74%" stopColor={palette[2]} />
                            <stop offset="100%" stopColor={palette[3]} />
                        </linearGradient>
                        <filter id="ap-glow" x="-140%" y="-140%" width="380%" height="380%">
                            <feGaussianBlur stdDeviation="5" result="b" />
                            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                        <filter id={`grain${id}`}>
                            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="n" />
                            <feColorMatrix in="n" type="saturate" values="0" />
                            <feComponentTransfer><feFuncA type="linear" slope="0.07" /></feComponentTransfer>
                        </filter>
                    </defs>

                    <rect width="520" height="460" fill={`url(#sky${id})`} />
                    {[[54, 46], [138, 78], [232, 40], [318, 84], [404, 52], [470, 92]].map(([x, y], i) => (
                        <circle key={i} className="pulse" cx={x} cy={y} r="1.6" fill={CREAM}
                            style={{ animationDelay: `${i * 0.5}s` }} />
                    ))}

                    <Silhouette kind={silhouette} lamp={lamp} />

                    {/* 文字帯 */}
                    <rect x="0" y="340" width="520" height="120" fill={INK} opacity="0.94" />
                    <text x="260" y="368" textAnchor="middle" fontFamily={SERIF} fontSize="10.5" letterSpacing="6" fill={GOLD}>{kicker}</text>
                    <text x="260" y="404" textAnchor="middle" fontFamily={SERIF} fontSize="30" letterSpacing="1.5" fill={CREAM}>{title}</text>
                    <line x1="120" y1="418" x2="400" y2="418" stroke={GOLD} strokeWidth="1" opacity="0.7" />
                    <text x="260" y="440" textAnchor="middle" fontFamily={SERIF} fontSize="11" fill={CREAM} opacity="0.78">{line}</text>

                    <rect width="520" height="460" filter={`url(#grain${id})`} opacity="0.55" />
                    <rect x="9" y="9" width="502" height="442" fill="none" stroke={CREAM} strokeWidth="1.2" opacity="0.36" />
                </svg>
            </div>
        </Link>
    );
}

export default function AreaPosterRow() {
    return (
        <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: 14, marginBottom: 26,
        }}>
            {AREA_POSTERS.map(p => <AreaPoster key={p.href} {...p} />)}
        </div>
    );
}
