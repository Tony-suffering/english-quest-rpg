// TONIO TOWN — 入口の一枚絵。
//
// 地図は「どこに何があるか」を正確に出すためのもので、行きたくさせる装置ではない。
// これはその逆で、情報を減らして「行きたい」だけを作る。
// 様式は1930年代のアメリカ国立公園ポスター(WPA)。理由は3つ:
//   1. 平面のベタ塗りと限定色。グラデを使わないので、絵が下手でも成立する
//   2. シルエットの層で奥行きを出す。手前ほど暗く、遠いほど淡い。これだけで空気が出る
//   3. 巨大なセリフ体の文字が絵の一部になる。文字が主役の構図は、旅のポスターの発明
//
// 動くのは3つだけ。星のまたたき、ダイナーの看板、スタジアムの光。
// 全部が動くと安っぽくなる。止まっているものが多いほど、動くものが効く。

import Link from 'next/link';

const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";

// 限定色。ここから外れた色を1つでも足すと、一気に素人の絵になる
const NIGHT = '#16233F';
const PLUM = '#3A2650';
const DUSK = '#6E3B54';
const EMBER = '#C4562F';
const AMBER = '#E4A03C';
const GOLD = '#EFC65B';
const CREAM = '#F3ECDC';
const INK = '#141019';

export default function TonioPoster() {
    return (
        <div style={{
            border: `1px solid ${INK}`,
            boxShadow: '0 2px 0 rgba(20,16,25,0.9), 0 22px 50px rgba(20,16,25,0.28)',
            overflow: 'hidden', marginBottom: 26, background: NIGHT,
        }}>
            <svg viewBox="0 0 1200 720" style={{ width: '100%', height: 'auto', display: 'block' }} role="img"
                aria-label="TONIO TOWN — 夜明けの町のポスター">
                <style>{`
                    @keyframes tw { 0%,100% { opacity:.15 } 50% { opacity:.9 } }
                    @keyframes sign { 0%,100% { opacity:.55 } 55% { opacity:1 } }
                    @keyframes lamp { 0%,100% { opacity:.75 } 40% { opacity:1 } }
                    .tw   { animation: tw 3.4s ease-in-out infinite }
                    .sign { animation: sign 2.6s ease-in-out infinite }
                    .lamp { animation: lamp 5s ease-in-out infinite }
                    @media (prefers-reduced-motion: reduce) {
                        .tw,.sign,.lamp { animation: none }
                    }
                `}</style>

                <defs>
                    {/* 空。夜から夜明けへ、色を4段だけで渡す */}
                    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={NIGHT} />
                        <stop offset="38%" stopColor={PLUM} />
                        <stop offset="66%" stopColor={DUSK} />
                        <stop offset="88%" stopColor={EMBER} />
                        <stop offset="100%" stopColor={AMBER} />
                    </linearGradient>
                    {/* 紙のざらつき。これが無いとデジタル臭が消えない */}
                    <filter id="paper">
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="n" />
                        <feColorMatrix in="n" type="saturate" values="0" />
                        <feComponentTransfer><feFuncA type="linear" slope="0.075" /></feComponentTransfer>
                    </filter>
                    {/* 灯りのにじみ */}
                    <filter id="glow" x="-120%" y="-120%" width="340%" height="340%">
                        <feGaussianBlur stdDeviation="7" result="b" />
                        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <clipPath id="frame"><rect x="0" y="0" width="1200" height="720" /></clipPath>
                </defs>

                <g clipPath="url(#frame)">
                    {/* ───── 空 ───── */}
                    <rect width="1200" height="720" fill="url(#sky)" />

                    {/* 星。上空だけ */}
                    {[[92, 66], [178, 122], [262, 58], [352, 104], [438, 72], [548, 118], [636, 62],
                    [742, 108], [846, 70], [944, 126], [1052, 82], [1136, 118], [312, 168], [688, 172], [1006, 176]]
                        .map(([x, y], i) => (
                            <circle key={i} className="tw" cx={x} cy={y} r={i % 3 === 0 ? 2.2 : 1.5} fill={CREAM}
                                style={{ animationDelay: `${(i % 7) * 0.45}s` }} />
                        ))}

                    {/* 太陽。帯で切るのがポスターの作法。円のままだと絵文字に見える */}
                    <g>
                        <circle cx="905" cy="392" r="132" fill={GOLD} opacity="0.95" />
                        {[0, 1, 2, 3, 4, 5].map(i => (
                            <rect key={i} x="750" y={300 + i * 22} width="320" height={4 + i * 1.6} fill={DUSK} opacity={0.55 - i * 0.07} />
                        ))}
                    </g>

                    {/* ───── 山 3層。遠いほど淡く、手前ほど暗く ───── */}
                    <path d="M0 452 L150 392 L268 438 L392 366 L520 430 L648 384 L790 440 L918 396 L1050 442 L1200 402 L1200 720 L0 720 Z"
                        fill="#8A4A52" opacity="0.55" />
                    <path d="M0 496 L128 452 L246 492 L380 436 L512 490 L640 448 L784 498 L910 456 L1046 500 L1200 462 L1200 720 L0 720 Z"
                        fill="#5C2F49" opacity="0.8" />

                    {/* ───── 町のシルエット ───── */}
                    <g fill="#241A33">
                        {/* 地面 */}
                        <path d="M0 566 L1200 566 L1200 720 L0 720 Z" />
                        {/* 給水塔。アメリカの小さな町の記号 */}
                        <g>
                            <path d="M196 468 L242 468 L236 500 L202 500 Z" />
                            <rect x="200" y="500" width="6" height="66" />
                            <rect x="232" y="500" width="6" height="66" />
                            <rect x="196" y="518" width="46" height="5" />
                            <rect x="216" y="452" width="6" height="18" />
                        </g>
                        {/* 教会の尖塔 */}
                        <g>
                            <path d="M372 400 L390 372 L408 400 L408 566 L372 566 Z" />
                            <rect x="382" y="404" width="16" height="20" fill={AMBER} opacity="0.85" />
                            <rect x="386" y="352" width="8" height="24" />
                            <rect x="378" y="362" width="24" height="6" />
                        </g>
                        {/* 家並み */}
                        {[[70, 512, 84, 54], [292, 520, 66, 46], [456, 506, 96, 60], [576, 524, 72, 42],
                        [668, 512, 80, 54], [1046, 518, 88, 48], [1148, 524, 60, 42]].map(([x, y, w, h], i) => (
                            <g key={i}>
                                <rect x={x} y={y} width={w} height={h + 6} />
                                <path d={`M${x - 8} ${y} L${x + w / 2} ${y - 26} L${x + w + 8} ${y} Z`} />
                            </g>
                        ))}
                        {/* 学校 */}
                        <g>
                            <rect x="778" y="498" width="128" height="68" />
                            <path d="M770 498 L842 464 L914 498 Z" />
                        </g>
                        {/* スタジアムの照明塔 */}
                        {[[962, 402], [1010, 396]].map(([x, y], i) => (
                            <g key={i}>
                                <rect x={x} y={y} width="5" height={566 - y} />
                                <rect x={x - 13} y={y - 16} width="31" height="16" />
                            </g>
                        ))}
                    </g>

                    {/* 灯り */}
                    <g filter="url(#glow)">
                        {/* スタジアム */}
                        <rect className="lamp" x="949" y="386" width="31" height="16" fill={GOLD} opacity="0.9" />
                        <rect className="lamp" x="997" y="380" width="31" height="16" fill={GOLD} opacity="0.9" style={{ animationDelay: '1.4s' }} />
                        {/* 家の窓 */}
                        {[[86, 528], [118, 528], [304, 534], [472, 522], [504, 522], [588, 536],
                        [684, 526], [716, 526], [800, 516], [832, 516], [864, 516], [1060, 532], [1160, 538]]
                            .map(([x, y], i) => (
                                <rect key={i} x={x} y={y} width="13" height="15" fill={AMBER} opacity={0.9} />
                            ))}
                    </g>

                    {/* ───── ダイナー。手前で一番明るい。ここが世界の心臓 ───── */}
                    <Link href="/english/365"><g style={{ cursor: 'pointer' }}>
                        <rect x="76" y="586" width="230" height="94" fill="#1A1226" />
                        <rect x="76" y="586" width="230" height="9" fill={EMBER} />
                        {[0, 1, 2, 3, 4].map(i => (
                            <rect key={i} x={94 + i * 44} y="612" width="30" height="34" fill={GOLD} opacity="0.92" filter="url(#glow)" />
                        ))}
                        <g className="sign">
                            <rect x="118" y="548" width="146" height="30" fill="#1A1226" stroke={GOLD} strokeWidth="2" />
                            <text x="191" y="569" textAnchor="middle" fontFamily={SERIF} fontSize="17" letterSpacing="5" fill={GOLD}>DINER</text>
                        </g>
                        <rect x="188" y="578" width="6" height="10" fill="#1A1226" />
                    </g></Link>

                    {/* 道。1点に収束させると奥行きが出る */}
                    <path d="M470 566 L560 720 L816 720 L742 566 Z" fill="#2E2140" />
                    {[0, 1, 2, 3].map(i => (
                        <rect key={i} x={597 + i * 3} y={588 + i * 34} width={7 + i * 2.6} height={16 + i * 6} fill={GOLD} opacity="0.5" />
                    ))}

                    {/* 電柱。手前ほど大きく */}
                    {[[352, 556, 1], [418, 566, 1.25], [888, 560, 1.1], [960, 572, 1.4]].map(([x, y, s], i) => (
                        <g key={i} fill="#150F1E" transform={`translate(${x},${y}) scale(${s})`}>
                            <rect x="0" y="-84" width="5" height="84" />
                            <rect x="-15" y="-80" width="35" height="4" />
                            <rect x="-11" y="-66" width="27" height="3.5" />
                        </g>
                    ))}

                    {/* ───── 文字。ポスターは文字が主役 ───── */}
                    <g>
                        <text x="76" y="222" fontFamily={SERIF} fontSize="20" letterSpacing="14" fill={GOLD}>VISIT</text>
                        <text x="72" y="330" fontFamily={SERIF} fontSize="104" fontWeight="700" letterSpacing="2" fill={CREAM}>TONIO TOWN</text>
                        <line x1="76" y1="356" x2="666" y2="356" stroke={GOLD} strokeWidth="2" />
                        <text x="76" y="392" fontFamily={SERIF} fontSize="19" letterSpacing="5" fill={CREAM} opacity="0.92">
                            POPULATION 147 — OPEN ALL YEAR
                        </text>
                        <text x="76" y="424" fontFamily={SERIF} fontSize="15" letterSpacing="2.5" fill={CREAM} opacity="0.72">
                            141 windows. One lifetime. Every word you will ever need.
                        </text>
                    </g>

                    {/* 下の帯 */}
                    <rect x="0" y="686" width="1200" height="34" fill={INK} opacity="0.92" />
                    <text x="76" y="708" fontFamily={SERIF} fontSize="12" letterSpacing="4" fill={CREAM} opacity="0.85">
                        THE TONIO TIMES — PRINTED IN TOWN, READ ACROSS THE SEA
                    </text>
                    <text x="1124" y="708" textAnchor="end" fontFamily={SERIF} fontSize="12" letterSpacing="4" fill={GOLD}>
                        EST. 2026
                    </text>

                    {/* 紙のざらつきと、四隅の落ち */}
                    <rect width="1200" height="720" filter="url(#paper)" opacity="0.5" />
                    <radialGradient id="vig" cx="50%" cy="46%" r="72%">
                        <stop offset="60%" stopColor="#000" stopOpacity="0" />
                        <stop offset="100%" stopColor="#000" stopOpacity="0.42" />
                    </radialGradient>
                    <rect width="1200" height="720" fill="url(#vig)" />

                    {/* 縁 */}
                    <rect x="14" y="14" width="1172" height="692" fill="none" stroke={CREAM} strokeWidth="1.6" opacity="0.42" />
                </g>
            </svg>
        </div>
    );
}
