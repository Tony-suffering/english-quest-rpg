// とにおワールド — 玄関(ハブ)。
// このページの唯一の仕事は「何の世界か」を10秒で伝えること。導線はその次。
// 順番は固定: コンセプト1行 → 揃っているもの4つ → 一枚絵 → 決まり3つ → 地図 → 行き先。
// 足したくなったら先にここを読む: 深い設定はエリア側に置く。玄関には置かない。
//   (2026-08-26 反省: 両替所・園の暦・未確認個体を玄関に積んで読めなくした。全部 /english/zoo へ移設)
// 各エリア側には WorldMapButton(固定「◆ ワールドマップ」)が置いてあり、常にここへ帰れる。

import Link from 'next/link';
import TonioPoster from '@/components/english/TonioPoster';
import { EXPERIMENTS, EXPERIMENT_LEDGER, type ExperimentStatus } from '@/data/english/tonio-experiments';
import { CONCEPT, ZOO_STATS } from '@/data/english/tonio-world';
import { showEpisodes } from '@/data/english/dmm-show';
import { EDITIONS } from '@/data/english/newspaper';
import { PEOPLE } from '@/data/english/requiem-world';
import { STATIONS } from '@/data/english/tonio-lifeline';

// 画面に出す数字は全部ここで数える。手打ちすると必ず腐る(2026-08-07: 第70夜/26号のまま放置されていた)
const NIGHT = Math.max(...showEpisodes.map(e => e.night));
const PAPERS = Object.keys(EDITIONS).length;
const POP = PEOPLE.length;

const EXP_STATUS: Record<ExperimentStatus, { label: string; color: string; bg: string }> = {
    live: { label: '稼働中', color: '#047857', bg: '#ECFDF5' },
    armed: { label: '装填済み', color: '#92400E', bg: '#FFFBEB' },
    gated: { label: '開村待ち', color: '#57534E', bg: '#F5F5F4' },
    failed: { label: '死亡(墓)', color: '#B3372B', bg: '#FEF2F2' },
    won: { label: '勝利', color: '#6D28D9', bg: '#F5F3FF' },
};

const INK = '#1c1917';
const MUTED = '#78716c';
const LINE = '#e7e5e4';
const CARD = '#ffffff';
const GOLD = '#B8941E';
const GREEN = '#065F46';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";

interface Dest {
    href: string;
    name: string;
    en: string;
    line: string;       // 1行だけ。増やさない
    side: '日本' | '境界' | 'アメリカ';
    building?: boolean; // 建設中
}

const DESTS: Dest[] = [
    { side: '日本', href: '/english/tonight', name: 'とにおの部屋', en: 'THE RECORD', line: `毎晩25分の実録。${NIGHT}夜ぶんの事故と、その検死。` },
    { side: '日本', href: '/english/365', name: '居酒屋 権藤', en: 'THE IZAKAYA', line: 'カウンター6席。英語が学ばれている場所。' },
    { side: '境界', href: '/english/newspaper', name: 'The Tonio Times', en: 'THE THREAD', line: '町で刷られ、店に置かれ、本人が読む日刊紙。' },
    { side: '境界', href: '/english/zoo', name: '英語動物園', en: 'THE ZOO', line: '口から出てしまったものの収蔵庫。6館 + 沈黙室は収蔵ゼロ。' },
    { side: '境界', href: '/english/podcast', name: '野生区', en: 'THE WILD', line: '実在の音声。捕獲禁止・観察のみ。' },
    { side: 'アメリカ', href: '/english/town', name: 'TONIO TOWN', en: 'THE LIVING TOWN', line: `人口${POP}人。毎朝の一言で今日の町が更新される。` },
    { side: 'アメリカ', href: '/english/ridgeway', name: '町民名鑑', en: 'THE REGISTRY', line: `${POP}人の顔・住所・相関図。` },
    { side: 'アメリカ', href: '/english/lifeline', name: 'ライフライン', en: 'THE LIFELINE', line: `生まれてから死ぬまでの${STATIONS.length}窓口。` },
    { side: 'アメリカ', href: '/english/village', name: 'とにお村', en: 'THE VILLAGE', line: '実在の100人の村。開村準備中。', building: true },
];

// 玄関で出す数字は4つだけ。全部データから数える(手打ちは必ず腐る)
const PILLARS = [
    { href: '/english/lifeline', what: '一生の言い方', name: 'ライフライン', num: String(STATIONS.length), unit: '窓口' },
    { href: '/english/town', what: 'それを使う人', name: 'TONIO TOWN', num: String(POP), unit: '人' },
    { href: '/english/newspaper', what: '毎日の一枚', name: 'The Tonio Times', num: String(PAPERS), unit: '号' },
    { href: '/english/zoo', what: '自分の壊し方', name: '英語動物園', num: String(ZOO_STATS.halls), unit: '館' },
];

// 世界の決まり。3つ以上に増やさない。増えた分はエリア側の正典に書く
const RULES = [
    {
        head: '日本側は英語を「学ぶ」場所。アメリカ側は英語が「使われている」場所。',
        body: '同じ英語でも、置かれている土地が違えば別のものになる。だから両方いる。',
    },
    { head: CONCEPT.borderLaw, body: '夜、日本の部屋で口から出てしまった間違いだけが海を渡って着弾する。人は行き来しない。' },
    { head: CONCEPT.doomClause, body: '上達すると輸入が細り、町が静かになる。だから失敗が、この世界の唯一の燃料になる。' },
];

const SIDE_COLOR: Record<Dest['side'], string> = { '日本': '#7C3AED', '境界': GOLD, 'アメリカ': GREEN };

export default function TonioWorldHub() {
    return (
        <div style={{ background: '#F7F5EF', minHeight: '100vh' }}>
            <div style={{ maxWidth: 980, margin: '0 auto', padding: '38px 18px 80px', color: INK }}>

                {/* ===== 題字 + コンセプト。ここだけ読めば、この世界が何かが分かる ===== */}
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 11, letterSpacing: 6, color: GOLD, fontWeight: 800 }}>TONIO WORLD</div>
                    <h1 style={{ fontFamily: SERIF, fontSize: 42, fontWeight: 900, margin: '4px 0 16px', letterSpacing: 4 }}>とにおワールド</h1>
                    <div style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 900, lineHeight: 1.55, letterSpacing: 1 }}>
                        英語の一生が、全部ここにある。
                    </div>
                    <div style={{ fontSize: 13.5, color: MUTED, lineHeight: 2.1, maxWidth: 600, margin: '12px auto 0' }}>
                        生まれてから死ぬまでの言い方。それを使う{POP}人の町。毎日届く新聞。
                        そして、自分が壊した英語だけを集めた動物園。<br />
                        <b style={{ color: INK }}>教材ではなく、住める場所として作った。</b>だから続く。
                    </div>
                </div>

                {/* ===== 揃っているもの。4つだけ出す。増やさない ===== */}
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 10, marginBottom: 26,
                }}>
                    {PILLARS.map((p) => (
                        <Link key={p.href} href={p.href} style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: CARD, border: `1px solid ${LINE}`, borderTop: `3px solid ${GOLD}`,
                                borderRadius: 12, padding: '14px 16px', color: INK, height: '100%',
                            }}>
                                <div style={{ fontSize: 10.5, letterSpacing: 2, color: GOLD, fontWeight: 900 }}>{p.what}</div>
                                <div style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 900, margin: '3px 0 6px' }}>{p.name}</div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                                    <span style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 900, lineHeight: 1 }}>{p.num}</span>
                                    <span style={{ fontSize: 12, color: MUTED, fontWeight: 800 }}>{p.unit}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <TonioPoster />

                {/* ===== 決まりは3つだけ。地図の読み方でもある ===== */}
                <div style={{ marginBottom: 26 }}>
                    <div style={{ fontSize: 11, letterSpacing: 3, fontWeight: 900, color: MUTED, marginBottom: 10 }}>
                        決まりは3つだけ — THE THREE RULES
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
                        {RULES.map((r, i) => (
                            <div key={r.head} style={{
                                background: CARD, border: `1px solid ${LINE}`,
                                borderLeft: `4px solid ${i === 2 ? '#B3372B' : GOLD}`,
                                borderRadius: 12, padding: '13px 16px',
                            }}>
                                <div style={{ fontSize: 10.5, color: MUTED, fontWeight: 900, letterSpacing: 2 }}>{i + 1}</div>
                                <div style={{ fontFamily: SERIF, fontSize: 15.5, fontWeight: 900, lineHeight: 1.65, margin: '2px 0 5px' }}>{r.head}</div>
                                <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.9 }}>{r.body}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===== 世界地図 =====
                    銅版画の海図の様式。角丸の箱と平面のブロブをやめた。
                    - 海は塗りではなく細いハッチング。紙は生成りで、青くしない
                    - 海岸線は3本重ねて等深線に見せる(銅版画の海岸陰影)
                    - 羅針線(rhumb lines)を1点から放射させる。これが一番「地図に見える」要素
                    - 地名は箱に入れず、罫線の上に置く。活版の組み方に寄せる
                */}
                <div style={{
                    background: '#F3ECDC', border: `1px solid ${INK}`, overflow: 'hidden',
                    boxShadow: '0 2px 0 rgba(28,25,23,0.9), 0 18px 40px rgba(28,25,23,0.18)',
                    marginBottom: 26,
                }}>
                    <svg viewBox="0 0 1000 560" style={{ width: '100%', height: 'auto', display: 'block' }}>
                        <defs>
                            {/* 海のハッチング。線の粗さで水域を出す */}
                            <pattern id="sea" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
                                <line x1="0" y1="0" x2="0" y2="7" stroke="#1c1917" strokeWidth="0.4" opacity="0.16" />
                            </pattern>
                            {/* 陸のごく薄い点描 */}
                            <pattern id="land" width="6" height="6" patternUnits="userSpaceOnUse">
                                <circle cx="1.5" cy="1.5" r="0.45" fill="#1c1917" opacity="0.13" />
                            </pattern>
                            {/* 紙のムラ */}
                            <filter id="grain">
                                <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="n" />
                                <feColorMatrix in="n" type="saturate" values="0" result="g" />
                                <feComponentTransfer in="g" result="a">
                                    <feFuncA type="linear" slope="0.05" />
                                </feComponentTransfer>
                                <feComposite in="a" in2="SourceGraphic" operator="over" />
                            </filter>
                        </defs>

                        {/* 紙 */}
                        <rect x={0} y={0} width={1000} height={560} fill="#F3ECDC" />
                        <rect x={0} y={0} width={1000} height={560} fill="url(#sea)" />
                        <rect x={0} y={0} width={1000} height={560} filter="url(#grain)" opacity="0.5" fill="none" />

                        {/* 羅針線 — 1点から放射。地図に見える最大の要素 */}
                        <g stroke={GOLD} strokeWidth="0.5" opacity="0.34">
                            {Array.from({ length: 32 }).map((_, i) => {
                                const a = (i * Math.PI * 2) / 32;
                                return <line key={i} x1={500} y1={286} x2={500 + Math.cos(a) * 1100} y2={286 + Math.sin(a) * 1100} />;
                            })}
                        </g>
                        <circle cx={500} cy={286} r={116} fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.4" />
                        <circle cx={500} cy={286} r={168} fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.28" />

                        {/* 罫囲み(二重罫) */}
                        <rect x={14} y={14} width={972} height={532} fill="none" stroke={INK} strokeWidth="2.2" />
                        <rect x={22} y={22} width={956} height={516} fill="none" stroke={INK} strokeWidth="0.7" />

                        {/* ───────── 日本(夜) ───────── */}
                        <g>
                            {/* 海岸陰影: 同じ形を3本重ねる */}
                            <path id="jp" d="M 96 132 Q 62 190 88 268 Q 70 372 124 428 Q 214 468 292 424 Q 356 384 342 288 Q 358 180 292 130 Q 190 96 96 132 Z"
                                fill="#EFE6D2" stroke={INK} strokeWidth="1.6" />
                            <use href="#jp" fill="none" stroke={INK} strokeWidth="0.5" opacity="0.5" transform="translate(0,0) scale(1.012) translate(-2.6,-3.3)" />
                            <use href="#jp" fill="none" stroke={INK} strokeWidth="0.4" opacity="0.28" transform="scale(1.026) translate(-5.6,-7.1)" />
                            <path d="M 96 132 Q 62 190 88 268 Q 70 372 124 428 Q 214 468 292 424 Q 356 384 342 288 Q 358 180 292 130 Q 190 96 96 132 Z" fill="url(#land)" />

                            <text x={219} y={116} textAnchor="middle" fontFamily={SERIF} fontSize={13} letterSpacing={7} fill="#5B21B6">JAPAN</text>
                            <text x={219} y={455} textAnchor="middle" fontFamily={SERIF} fontSize={10.5} letterSpacing={3} fill={MUTED}>NIGHT — 21:00</text>

                            {/* とにおの部屋 */}
                            <Link href="/english/tonight"><g style={{ cursor: 'pointer' }}>
                                <rect x={214} y={192} width={10} height={10} fill={INK} transform="rotate(45 219 197)" />
                                <line x1={132} y1={216} x2={306} y2={216} stroke={INK} strokeWidth="0.8" />
                                <text x={219} y={234} textAnchor="middle" fontFamily={SERIF} fontSize={17} fill={INK}>とにおの部屋</text>
                                <text x={219} y={250} textAnchor="middle" fontFamily={SERIF} fontSize={9} letterSpacing={3.5} fill="#7C3AED">THE RECORD</text>
                                <text x={219} y={265} textAnchor="middle" fontFamily={SERIF} fontSize={9.5} fill={MUTED}>毎晩25分 — 第{NIGHT}夜</text>
                            </g></Link>

                            {/* 居酒屋 */}
                            <Link href="/english/365"><g style={{ cursor: 'pointer' }}>
                                <rect x={214} y={316} width={10} height={10} fill={INK} transform="rotate(45 219 321)" />
                                <line x1={140} y1={340} x2={298} y2={340} stroke={INK} strokeWidth="0.8" />
                                <text x={219} y={358} textAnchor="middle" fontFamily={SERIF} fontSize={17} fill={INK}>居酒屋 権藤</text>
                                <text x={219} y={374} textAnchor="middle" fontFamily={SERIF} fontSize={9} letterSpacing={3.5} fill="#B33A2B">THE IZAKAYA</text>
                                <text x={219} y={389} textAnchor="middle" fontFamily={SERIF} fontSize={9.5} fill={MUTED}>カウンター6席</text>
                            </g></Link>
                        </g>

                        {/* ───────── 海路 ───────── */}
                        <g>
                            <path d="M 358 268 Q 500 214 648 268" fill="none" stroke={INK} strokeWidth="0.9" strokeDasharray="5 6" />
                            <text x={500} y={196} textAnchor="middle" fontFamily={SERIF} fontSize={12.5} letterSpacing={1} fill={INK}>人は渡れない。事故だけが渡る。</text>
                            <Link href="/english/newspaper"><g style={{ cursor: 'pointer' }}>
                                <path d="M 476 286 L 524 286 L 515 300 L 485 300 Z" fill={INK} />
                                <line x1={500} y1={258} x2={500} y2={286} stroke={INK} strokeWidth="1.4" />
                                <path d="M 502 260 L 528 272 L 502 281 Z" fill="#F3ECDC" stroke={INK} strokeWidth="1" />
                                <line x1={430} y1={318} x2={570} y2={318} stroke={INK} strokeWidth="0.8" />
                                <text x={500} y={336} textAnchor="middle" fontFamily={SERIF} fontSize={14} fill={INK}>The Tonio Times</text>
                                <text x={500} y={351} textAnchor="middle" fontFamily={SERIF} fontSize={9.5} fill={MUTED}>3つの土地を貫く唯一の糸 — {PAPERS}号</text>
                            </g></Link>
                        </g>

                        {/* ───────── アメリカ(朝) ───────── */}
                        <g>
                            <path id="us" d="M 668 118 Q 622 178 650 262 Q 632 378 690 436 Q 796 480 892 434 Q 962 380 948 276 Q 966 162 894 116 Q 782 82 668 118 Z"
                                fill="#EFE6D2" stroke={INK} strokeWidth="1.6" />
                            <use href="#us" fill="none" stroke={INK} strokeWidth="0.5" opacity="0.5" transform="scale(1.012) translate(-9.6,-3.2)" />
                            <use href="#us" fill="none" stroke={INK} strokeWidth="0.4" opacity="0.28" transform="scale(1.026) translate(-20.5,-7.0)" />
                            <path d="M 668 118 Q 622 178 650 262 Q 632 378 690 436 Q 796 480 892 434 Q 962 380 948 276 Q 966 162 894 116 Q 782 82 668 118 Z" fill="url(#land)" />

                            <text x={800} y={104} textAnchor="middle" fontFamily={SERIF} fontSize={13} letterSpacing={7} fill={GREEN}>AMERICA</text>
                            <text x={800} y={464} textAnchor="middle" fontFamily={SERIF} fontSize={10.5} letterSpacing={3} fill={MUTED}>MORNING — 7:00</text>

                            {/* TONIO TOWN */}
                            <Link href="/english/town"><g style={{ cursor: 'pointer' }}>
                                <circle cx={800} cy={162} r={5.5} fill="none" stroke={INK} strokeWidth="1.4" />
                                <circle cx={800} cy={162} r={1.8} fill={INK} />
                                <line x1={700} y1={182} x2={900} y2={182} stroke={INK} strokeWidth="0.8" />
                                <text x={800} y={202} textAnchor="middle" fontFamily={SERIF} fontSize={19} letterSpacing={2} fill={INK}>TONIO TOWN</text>
                                <text x={800} y={218} textAnchor="middle" fontFamily={SERIF} fontSize={9} letterSpacing={3.5} fill={GREEN}>THE LIVING TOWN</text>
                                <text x={800} y={233} textAnchor="middle" fontFamily={SERIF} fontSize={9.5} fill={MUTED}>人口{POP}人 — 毎朝更新</text>
                            </g></Link>

                            {/* 動物園 */}
                            <Link href="/english/zoo"><g style={{ cursor: 'pointer' }}>
                                <rect x={716} y={272} width={9} height={9} fill="none" stroke={INK} strokeWidth="1.3" />
                                <line x1={676} y1={296} x2={790} y2={296} stroke={INK} strokeWidth="0.7" />
                                <text x={733} y={312} textAnchor="middle" fontFamily={SERIF} fontSize={14} fill={INK}>英語動物園</text>
                                <text x={733} y={326} textAnchor="middle" fontFamily={SERIF} fontSize={8.5} letterSpacing={3} fill={GOLD}>THE ZOO</text>
                            </g></Link>

                            {/* ライフライン */}
                            <Link href="/english/lifeline"><g style={{ cursor: 'pointer' }}>
                                <rect x={874} y={272} width={9} height={9} fill="none" stroke={INK} strokeWidth="1.3" />
                                <line x1={824} y1={296} x2={936} y2={296} stroke={INK} strokeWidth="0.7" />
                                <text x={880} y={312} textAnchor="middle" fontFamily={SERIF} fontSize={14} fill={INK}>ライフライン</text>
                                <text x={880} y={326} textAnchor="middle" fontFamily={SERIF} fontSize={8.5} letterSpacing={3} fill={GOLD}>141 WINDOWS</text>
                            </g></Link>

                            {/* 町民名鑑 */}
                            <Link href="/english/ridgeway"><g style={{ cursor: 'pointer' }}>
                                <line x1={676} y1={368} x2={790} y2={368} stroke={INK} strokeWidth="0.7" />
                                <text x={733} y={384} textAnchor="middle" fontFamily={SERIF} fontSize={13} fill={INK}>町民名鑑</text>
                                <text x={733} y={397} textAnchor="middle" fontFamily={SERIF} fontSize={8.5} letterSpacing={3} fill={MUTED}>THE REGISTRY</text>
                            </g></Link>

                            {/* 村(未開村) */}
                            <Link href="/english/village"><g style={{ cursor: 'pointer' }}>
                                <line x1={824} y1={368} x2={936} y2={368} stroke={INK} strokeWidth="0.7" strokeDasharray="4 4" />
                                <text x={880} y={384} textAnchor="middle" fontFamily={SERIF} fontSize={13} fill={MUTED}>とにお村</text>
                                <text x={880} y={397} textAnchor="middle" fontFamily={SERIF} fontSize={8.5} letterSpacing={2} fill={MUTED}>UNSETTLED — 定員100</text>
                            </g></Link>
                        </g>

                        {/* ───────── 方位盤 ───────── */}
                        <g transform="translate(84,468)">
                            <circle r={30} fill="none" stroke={INK} strokeWidth="0.9" />
                            <circle r={22} fill="none" stroke={INK} strokeWidth="0.5" opacity="0.6" />
                            {Array.from({ length: 8 }).map((_, i) => {
                                const a = (i * Math.PI) / 4;
                                return <line key={i} x1={Math.cos(a) * 22} y1={Math.sin(a) * 22} x2={Math.cos(a) * 30} y2={Math.sin(a) * 30} stroke={INK} strokeWidth="0.7" />;
                            })}
                            <path d="M 0 -26 L 6 0 L 0 26 L -6 0 Z" fill={INK} />
                            <path d="M 0 -26 L 6 0 L 0 0 Z" fill="#F3ECDC" />
                            <text y={-34} textAnchor="middle" fontFamily={SERIF} fontSize={10} letterSpacing={2} fill={INK}>N</text>
                        </g>

                        {/* ───────── 標題(カルトゥーシュ) ───────── */}
                        <g>
                            <rect x={636} y={484} width={330} height={48} fill="#F3ECDC" stroke={INK} strokeWidth="1.4" />
                            <rect x={641} y={489} width={320} height={38} fill="none" stroke={INK} strokeWidth="0.5" />
                            <text x={801} y={506} textAnchor="middle" fontFamily={SERIF} fontSize={12.5} letterSpacing={4} fill={INK}>TONIO WORLD</text>
                            <text x={801} y={521} textAnchor="middle" fontFamily={SERIF} fontSize={9} letterSpacing={2} fill={MUTED}>A CHART OF THE ENGLISH ECOSYSTEM</text>
                        </g>

                        {/* 縮尺 */}
                        <g transform="translate(160,506)">
                            <line x1={0} y1={0} x2={120} y2={0} stroke={INK} strokeWidth="1.2" />
                            {[0, 30, 60, 90, 120].map((x) => <line key={x} x1={x} y1={-4} x2={x} y2={4} stroke={INK} strokeWidth="1" />)}
                            <rect x={0} y={-4} width={30} height={8} fill={INK} />
                            <rect x={60} y={-4} width={30} height={8} fill={INK} />
                            <text x={60} y={20} textAnchor="middle" fontFamily={SERIF} fontSize={8.5} letterSpacing={2} fill={MUTED}>ONE LESSON = 25 MINUTES</text>
                        </g>
                    </svg>
                </div>

                {/* ===== 個別アクセス(確実な導線。ここが本体) ===== */}
                {(['日本', '境界', 'アメリカ'] as const).map((side) => (
                    <div key={side} style={{ marginBottom: 18 }}>
                        <div style={{ fontSize: 11, letterSpacing: 3, fontWeight: 900, color: SIDE_COLOR[side], marginBottom: 8 }}>
                            {side === '日本' ? '日本側 — 英語が学ばれている' : side === '境界' ? '境界 — 事故だけが渡る' : 'アメリカ側 — 英語が使われている'}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                            {DESTS.filter((d) => d.side === side).map((d) => (
                                <Link key={d.href} href={d.href} style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        background: CARD, border: `1px solid ${LINE}`, borderLeft: `4px solid ${SIDE_COLOR[side]}`,
                                        borderRadius: 12, padding: '12px 16px', color: INK,
                                        display: 'flex', alignItems: 'center', gap: 12,
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                                                <span style={{ fontFamily: SERIF, fontSize: 16.5, fontWeight: 900 }}>{d.name}</span>
                                                <span style={{ fontSize: 9, letterSpacing: 1.5, color: MUTED, fontWeight: 800 }}>{d.en}</span>
                                                {d.building && <span style={{ fontSize: 9.5, fontWeight: 900, color: GOLD, border: `1px solid ${GOLD}`, borderRadius: 999, padding: '1px 8px' }}>準備中</span>}
                                            </div>
                                            <div style={{ fontSize: 11.5, color: MUTED, marginTop: 2, lineHeight: 1.7 }}>{d.line}</div>
                                        </div>
                                        <span style={{ color: SIDE_COLOR[side], fontWeight: 900 }}>→</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}

                {/* ===== 実験台帳 ===== */}
                {/* 玄関に常時出す情報ではない。読みたい人だけ開く */}
                <details style={{ marginTop: 26, border: `1px solid ${LINE}`, borderRadius: 12, background: CARD, padding: '12px 16px' }}>
                    <summary style={{ cursor: 'pointer', fontSize: 12.5, fontWeight: 900, color: INK, listStyle: 'revert' }}>
                        実験台帳 — この世にない試み {EXPERIMENT_LEDGER.total}本を見る
                    </summary>
                <div style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 11, letterSpacing: 3, fontWeight: 900, color: MUTED, marginBottom: 4 }}>
                        実験台帳 — この世にない試み {EXPERIMENT_LEDGER.total}本
                    </div>
                    <div style={{ fontSize: 11.5, color: MUTED, marginBottom: 12, lineHeight: 1.8 }}>
                        前例を探せなかった仕組みだけを載せる。失敗の墓は消さない。
                        (稼働 {EXPERIMENT_LEDGER.live} / 装填 {EXPERIMENT_LEDGER.armed} / 待機 {EXPERIMENT_LEDGER.gated} / 死亡 {EXPERIMENT_LEDGER.failed})
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 10 }}>
                        {EXPERIMENTS.map((e) => {
                            const st = EXP_STATUS[e.status];
                            return (
                                <div key={e.id} style={{
                                    background: CARD, border: `1px solid ${LINE}`, borderTop: `3px solid ${st.color}`,
                                    borderRadius: 12, padding: '13px 15px', opacity: e.status === 'failed' ? 0.85 : 1,
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                                        <span style={{ fontSize: 10, fontWeight: 900, color: st.color, backgroundColor: st.bg, border: `1px solid ${st.color}`, borderRadius: 999, padding: '2px 9px' }}>{st.label}</span>
                                    </div>
                                    <div style={{ fontFamily: SERIF, fontSize: 14.5, fontWeight: 900, lineHeight: 1.6, marginBottom: 6 }}>{e.name}</div>
                                    <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.85, marginBottom: 8 }}>{e.novelty}</div>
                                    <div style={{ fontSize: 11, color: '#44403C', lineHeight: 1.8, borderTop: `1px dashed ${LINE}`, paddingTop: 7 }}>
                                        {e.log[e.log.length - 1]}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                </details>

                <div style={{ textAlign: 'center', fontSize: 12, color: MUTED, marginTop: 24, lineHeight: 2 }}>
                    世界の法則はひとつ — {CONCEPT.law}<br />
                    通貨・園則・暦・訃報などの細かい正典は <Link href="/english/zoo" style={{ color: GOLD, fontWeight: 800 }}>英語動物園</Link> にまとめてある。<br />
                    各エリアの左下にある「◆ ワールドマップ」で、いつでもここへ戻れる。
                </div>
            </div>
        </div>
    );
}
