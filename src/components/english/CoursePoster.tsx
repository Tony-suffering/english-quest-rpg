// 百日課程 — 入口の一枚絵。
//
// 表を先に見せると教材になる。教材は買われない。
// 先に「渡りたい」を作って、表はその後ろに置く。
//
// 様式は1930年代のアメリカ国立公園ポスター(WPA)。理由は3つ:
//   1. 平面のベタ塗りと限定色。グラデを使わないので、絵が下手でも成立する
//   2. シルエットの層で奥行きを出す。手前ほど暗く、遠いほど淡い。これだけで空気が出る
//   3. 巨大なセリフ体の文字が絵の一部になる。文字が主役の構図は、旅のポスターの発明
//
// 絵の意味:
//   海   = 37万9,475の表現。全部は渡れない
//   航路 = そのうち出会う回数の多い1,000個
//   陸   = 百日目。出現回数の18.11%
//
// 動くのは3つだけ。日の光の帯、波の揺れ、船。
// 全部が動くと安っぽくなる。止まっているものが多いほど、動くものが効く。

const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";

// 限定色。ここから外れた色を1つでも足すと、一気に素人の絵になる
const DEEP = '#0E2A3F';
const SEA = '#1B4C68';
const TEAL = '#2C6F7C';
const DUSK = '#7A4356';
const HORIZON = '#C0682F';
const SUN = '#E39B38';
const GOLD = '#EFC65B';
const CREAM = '#F3ECDC';
const INK = '#101820';

export default function CoursePoster({
    days = 100,
    total = 1000,
    coverage = 18.11,
    chunks = 379475,
}: {
    days?: number;
    total?: number;
    coverage?: number;
    chunks?: number;
}) {
    return (
        <div
            style={{
                border: `1px solid ${INK}`,
                boxShadow: '0 2px 0 rgba(16,24,32,0.9), 0 22px 50px rgba(16,24,32,0.28)',
                overflow: 'hidden',
                background: DEEP,
            }}
        >
            <svg
                viewBox="0 0 1200 760"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                role="img"
                aria-label="百日課程 — 千の表現を渡る航海のポスター"
            >
                <style>{`
                    @keyframes shimmer { 0%,100% { opacity:.30 } 50% { opacity:.78 } }
                    @keyframes swell   { 0%,100% { transform: translateY(0) }   50% { transform: translateY(4px) } }
                    @keyframes sail    { 0%,100% { transform: translate(0,0) rotate(-1.2deg) } 50% { transform: translate(0,-7px) rotate(1.2deg) } }
                    .shimmer { animation: shimmer 3.6s ease-in-out infinite }
                    .swell   { animation: swell 6.5s ease-in-out infinite }
                    .sail    { animation: sail 4.8s ease-in-out infinite; transform-origin: 560px 600px }
                    @media (prefers-reduced-motion: reduce) {
                        .shimmer,.swell,.sail { animation: none }
                    }
                `}</style>

                <defs>
                    {/* 空。夜明け前から朝へ、色を5段だけで渡す */}
                    <linearGradient id="cp-sky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={DEEP} />
                        <stop offset="34%" stopColor="#26405C" />
                        <stop offset="62%" stopColor={DUSK} />
                        <stop offset="84%" stopColor={HORIZON} />
                        <stop offset="100%" stopColor={SUN} />
                    </linearGradient>
                    {/* 紙のざらつき。これが無いとデジタル臭が消えない */}
                    <filter id="cp-paper">
                        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="n" />
                        <feColorMatrix in="n" type="saturate" values="0" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.075" />
                        </feComponentTransfer>
                    </filter>
                    <clipPath id="cp-frame">
                        <rect x="0" y="0" width="1200" height="760" />
                    </clipPath>
                </defs>

                <g clipPath="url(#cp-frame)">
                    {/* ───── 空 ───── */}
                    <rect width="1200" height="760" fill="url(#cp-sky)" />

                    {/* 星。上空だけ。まばたかせない(動くのは3つの約束) */}
                    {[[88, 62], [186, 118], [274, 54], [364, 106], [452, 74], [566, 120], [654, 58],
                    [760, 110], [864, 68], [962, 124], [1068, 80], [1148, 116], [322, 166], [706, 170]].map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.1 : 1.4} fill={CREAM} opacity={0.42} />
                    ))}

                    {/* 太陽。帯で切るのがポスターの作法。円のままだと絵文字に見える */}
                    <g>
                        <circle cx="880" cy="404" r="140" fill={GOLD} opacity="0.95" />
                        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                            <rect
                                key={i}
                                x="700"
                                y={306 + i * 24}
                                width="380"
                                height={4 + i * 1.5}
                                fill={DUSK}
                                opacity={0.5 - i * 0.06}
                            />
                        ))}
                    </g>

                    {/* ───── 遠い陸。百日目 ───── */}
                    <path
                        d="M980 452 L1032 418 L1074 446 L1118 410 L1160 444 L1200 424 L1200 470 L980 470 Z"
                        fill="#8A4A52"
                        opacity="0.55"
                    />
                    <path
                        d="M1010 466 L1058 440 L1102 464 L1150 434 L1200 462 L1200 486 L1010 486 Z"
                        fill="#5C2F49"
                        opacity="0.72"
                    />

                    {/* ───── 海 3層。遠いほど淡く、手前ほど暗く ───── */}
                    {/* 水平線の光の帯 */}
                    <g className="shimmer">
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <rect key={i} x={760 + (i % 2) * 22} y={492 + i * 15} width={300 - i * 26} height={4} fill={GOLD} opacity={0.5 - i * 0.05} />
                        ))}
                    </g>

                    <path d="M0 486 L1200 486 L1200 760 L0 760 Z" fill={TEAL} opacity="0.9" />
                    <g className="swell">
                        <path
                            d="M0 528 C 140 512, 260 546, 400 530 C 540 514, 660 548, 800 532 C 940 516, 1060 550, 1200 534 L1200 760 L0 760 Z"
                            fill={SEA}
                        />
                    </g>
                    <path
                        d="M0 596 C 160 578, 280 614, 440 596 C 600 578, 720 614, 880 596 C 1040 578, 1120 612, 1200 600 L1200 760 L0 760 Z"
                        fill={DEEP}
                    />

                    {/* 波の白抜き。線を引くだけで海に見える */}
                    {[[70, 556], [250, 572], [470, 560], [700, 576], [930, 562], [1120, 578],
                    [150, 640], [400, 652], [660, 638], [900, 654], [1130, 640]].map(([x, y], i) => (
                        <g key={i} opacity={0.5}>
                            <path d={`M${x} ${y} q 16 -7 32 0`} stroke={CREAM} strokeWidth="2.4" fill="none" strokeLinecap="round" />
                            <path d={`M${x + 40} ${y + 9} q 12 -6 24 0`} stroke={CREAM} strokeWidth="2" fill="none" strokeLinecap="round" />
                        </g>
                    ))}

                    {/* ───── 航路。渡ってきた線 ───── */}
                    <path
                        d="M150 690 C 380 660, 520 612, 700 574 C 860 540, 960 512, 1080 492"
                        stroke={GOLD}
                        strokeWidth="3"
                        strokeDasharray="12 9"
                        fill="none"
                        opacity="0.85"
                    />

                    {/* ───── 船。手前なので真っ黒のシルエット ───── */}
                    <g className="sail">
                        <g transform="translate(560,600) scale(1.5)">
                            {/* 船体 */}
                            <path d="M-46 18 L46 18 L30 40 L-30 40 Z" fill={INK} />
                            {/* 帆柱 */}
                            <line x1="0" y1="18" x2="0" y2="-64" stroke={INK} strokeWidth="4" />
                            {/* 主帆 */}
                            <path d="M4 -60 L52 -6 L4 -6 Z" fill={CREAM} stroke={INK} strokeWidth="2.5" />
                            {/* 前帆 */}
                            <path d="M-4 -52 L-40 -6 L-4 -6 Z" fill={GOLD} stroke={INK} strokeWidth="2.5" />
                            {/* 旗 */}
                            <path d="M0 -64 L24 -57 L0 -50 Z" fill={HORIZON} stroke={INK} strokeWidth="1.6" />
                        </g>
                    </g>

                    {/* ───── 題字。文字が絵の一部になる ───── */}
                    <text
                        x="80"
                        y="196"
                        fontFamily={SERIF}
                        fontSize="30"
                        letterSpacing="16"
                        fill={GOLD}
                        fontWeight="700"
                    >
                        THE VOYAGE OF
                    </text>
                    <text
                        x="76"
                        y="330"
                        fontFamily={SERIF}
                        fontSize="132"
                        letterSpacing="4"
                        fill={CREAM}
                        fontWeight="900"
                    >
                        百日課程
                    </text>
                    <text
                        x="80"
                        y="382"
                        fontFamily={SERIF}
                        fontSize="24"
                        letterSpacing="7"
                        fill={CREAM}
                        opacity="0.86"
                        fontWeight="700"
                    >
                        ONE HUNDRED DAYS AT SEA
                    </text>
                    <line x1="80" y1="404" x2="470" y2="404" stroke={GOLD} strokeWidth="2" />
                    <text x="80" y="438" fontFamily={SERIF} fontSize="21" fill={CREAM} opacity="0.9">
                        {chunks.toLocaleString()}の表現という海を、
                    </text>
                    <text x="80" y="470" fontFamily={SERIF} fontSize="21" fill={CREAM} opacity="0.9">
                        出会う回数の多い{total.toLocaleString()}個だけで渡る。
                    </text>

                    {/* ───── 下の帯。数字を看板にする ───── */}
                    <rect x="0" y="672" width="1200" height="88" fill={INK} opacity="0.94" />
                    <line x1="0" y1="672" x2="1200" y2="672" stroke={GOLD} strokeWidth="2" />
                    {[
                        { v: total.toLocaleString(), l: 'EXPRESSIONS', j: '渡す表現' },
                        { v: '10', l: 'A DAY', j: '1日あたり' },
                        { v: String(days), l: 'DAYS', j: '日数' },
                        { v: `${coverage}%`, l: 'COVERAGE', j: '到達点' },
                    ].map((s, i) => {
                        const x = 150 + i * 300;
                        return (
                            <g key={s.l}>
                                {i > 0 && <line x1={x - 150} y1="692" x2={x - 150} y2="742" stroke={CREAM} strokeWidth="0.6" opacity="0.35" />}
                                <text x={x} y="712" textAnchor="middle" fontFamily={SERIF} fontSize="34" fontWeight="900" fill={i === 3 ? GOLD : CREAM}>
                                    {s.v}
                                </text>
                                <text x={x} y="732" textAnchor="middle" fontFamily={SERIF} fontSize="11" letterSpacing="5" fill={CREAM} opacity="0.62">
                                    {s.l}
                                </text>
                                <text x={x} y="748" textAnchor="middle" fontSize="10" fill={CREAM} opacity="0.42">
                                    {s.j}
                                </text>
                            </g>
                        );
                    })}

                    {/* 紙のざらつきを最後に一枚かぶせる */}
                    <rect width="1200" height="760" filter="url(#cp-paper)" opacity="0.55" style={{ mixBlendMode: 'multiply' }} />
                    {/* 四隅の暗み。印刷物の縁の落ち */}
                    <rect x="0" y="0" width="1200" height="760" fill="none" stroke={INK} strokeWidth="14" opacity="0.22" />
                </g>
            </svg>
        </div>
    );
}
