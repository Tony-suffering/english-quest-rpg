'use client';

// 英語動物園 — とにおワールドの正面玄関。
// 収蔵品は全部実データ: 捏造館26体・標本室65個・勤怠舎3体は tonio-saga.ts から、
// 館の分類と星個体は tonio-world.ts から読む。このページは執筆せず、展示だけする。
// デザイン方針: 紙の園内マップ(SVG) + 雑誌の密度(傾き・重なり・余白を殺す)。ライトテーマ。

import Link from 'next/link';
import { SAGA_BESTIARY, SAGA_SKILLS, SAGA_PARTY } from '@/data/english/tonio-saga';
import { CONCEPT, RAID_BOSSES, hall, CRYPTIDS, OBITUARIES, OBITUARY_LAW, HOUSE_RULES, WEATHER_LAW, ZOO_LEDGER, EXCHANGE_RATES, EXCHANGE_LAW, ZOO_CALENDAR } from '@/data/english/tonio-world';
import WorldMapButton from '@/components/english/WorldMapButton';

const INK = '#1c1917';
const MUTED = '#78716c';
const LINE = '#e7e5e4';
const CREAM = '#FAF8F2';
const CARD = '#FFFFFF';
const GOLD = '#B8941E';
const GOLD_SOFT = '#FBF6E3';
const GREEN = '#065F46';      // 園内サインの深緑
const GREEN_BR = '#10B981';
const RED = '#B3372B';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";

/** 園内サイン(深緑のプレート)。館の入口に立っている看板 */
function Sign({ no, name, en, tilt = 0 }: { no: string; name: string; en: string; tilt?: number }) {
    return (
        <div style={{ display: 'inline-block', transform: `rotate(${tilt}deg)`, marginBottom: 18 }}>
            <div style={{
                background: GREEN, color: '#F5F0E1', borderRadius: 10, padding: '10px 22px 12px',
                boxShadow: '0 3px 0 #04382a, 0 8px 18px rgba(6,95,70,0.25)',
                border: '2px solid #04382a',
            }}>
                <div style={{ fontSize: 10, letterSpacing: 4, color: '#A7D9C4', fontWeight: 700 }}>{en.toUpperCase()}</div>
                <div style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 900, letterSpacing: 2 }}>
                    <span style={{ color: '#E7C14B', marginRight: 10 }}>{no}</span>{name}
                </div>
            </div>
            {/* 看板の脚 */}
            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 30px' }}>
                <div style={{ width: 5, height: 14, background: '#7a6a4f' }} />
                <div style={{ width: 5, height: 14, background: '#7a6a4f' }} />
            </div>
        </div>
    );
}

/** 展示札(個体カード)。傾きは i で互い違い */
function Plate({ children, i }: { children: React.ReactNode; i: number }) {
    return (
        <div style={{
            background: CARD, border: `1px solid ${LINE}`, borderTop: `3px solid ${GOLD}`,
            borderRadius: 10, padding: '12px 14px', boxShadow: '0 2px 8px rgba(28,25,23,0.06)',
            transform: `rotate(${i % 3 === 0 ? -0.6 : i % 3 === 1 ? 0.5 : 0}deg)`,
        }}>
            {children}
        </div>
    );
}

export default function ZooPage() {
    const coinage = hall('coinage');
    const slip = hall('slip');
    const direction = hall('direction');
    const silence = hall('silence');

    return (
        <div style={{ background: CREAM, minHeight: '100vh' }}>
            <div style={{ maxWidth: 920, margin: '0 auto', padding: '38px 18px 90px', color: INK }}>

                {/* ================= 正門 ================= */}
                <div style={{ textAlign: 'center', position: 'relative', marginBottom: 8 }}>
                    <div style={{ fontSize: 11, letterSpacing: 6, color: GREEN, fontWeight: 800 }}>RIDGEWAY MUNICIPAL</div>
                    <h1 style={{ fontFamily: SERIF, fontSize: 46, fontWeight: 900, margin: '4px 0 2px', letterSpacing: 4 }}>
                        英語動物園
                    </h1>
                    <div style={{ fontSize: 11, letterSpacing: 5, color: MUTED }}>THE ENGLISH ZOO — EST. NIGHT 4</div>

                    <div style={{
                        maxWidth: 620, margin: '18px auto 0', fontSize: 14.5, lineHeight: 2.15,
                        fontFamily: SERIF,
                    }}>
                        {CONCEPT.line} {CONCEPT.body}
                    </div>

                    {/* 掟の額 */}
                    <div style={{
                        display: 'inline-block', marginTop: 18, padding: '12px 30px',
                        border: `2px solid ${GOLD}`, borderRadius: 4, background: GOLD_SOFT,
                        transform: 'rotate(-0.7deg)', boxShadow: '3px 3px 0 rgba(184,148,30,0.25)',
                    }}>
                        <div style={{ fontSize: 10, letterSpacing: 3, color: GOLD, fontWeight: 800 }}>園の掟 — THE LAW OF THE CAGE</div>
                        <div style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 800, marginTop: 3 }}>{CONCEPT.zooLaw}</div>
                        <div style={{ fontSize: 11.5, color: MUTED, marginTop: 4 }}>名前を付けて記録した間違いは、同じ形では戻ってこない。記録が治療である。</div>
                    </div>
                </div>

                {/* ================= 園内マップ ================= */}
                <div style={{ margin: '30px 0 40px', border: `1px solid ${LINE}`, borderRadius: 18, background: CARD, padding: '14px 10px 6px', boxShadow: '0 4px 20px rgba(28,25,23,0.07)' }}>
                    <div style={{ textAlign: 'center', fontSize: 10.5, letterSpacing: 4, color: MUTED, fontWeight: 800 }}>園内マップ — 押すとその館へ飛ぶ</div>
                    <svg viewBox="0 0 880 430" style={{ width: '100%', height: 'auto', display: 'block' }}>
                        {/* 巨獣の山(園外・地平線) */}
                        <g opacity={0.9}>
                            <path d="M 60 78 L 130 30 L 200 78 Z" fill="#D6D0C4" />
                            <path d="M 180 78 L 260 18 L 345 78 Z" fill="#C9C2B2" />
                            <path d="M 330 78 L 400 40 L 470 78 Z" fill="#D6D0C4" />
                            <text x="130" y="66" textAnchor="middle" fontSize="11" fill={MUTED} fontWeight="bold">TOEIC</text>
                            <text x="262" y="52" textAnchor="middle" fontSize="11" fill={MUTED} fontWeight="bold">英検</text>
                            <text x="400" y="68" textAnchor="middle" fontSize="10" fill={MUTED} fontWeight="bold">J.ROGAN</text>
                            <text x="640" y="50" fontSize="11" fill={MUTED} fontStyle="italic">← 巨獣。倒せなくても物語になる</text>
                        </g>
                        <line x1="20" y1="82" x2="860" y2="82" stroke={LINE} strokeWidth="2" />

                        {/* 野生区(柵の向こう) */}
                        <a href="#wild">
                            <g style={{ cursor: 'pointer' }}>
                                <rect x="600" y="96" width="250" height="86" rx="14" fill="#EFF6F1" stroke={GREEN_BR} strokeDasharray="7 5" strokeWidth="2" />
                                <text x="725" y="128" textAnchor="middle" fontSize="15" fontWeight="900" fill={GREEN}>野 生 区</text>
                                <text x="725" y="148" textAnchor="middle" fontSize="10" fill={MUTED}>実在の音声 — 捕獲禁止・観察のみ</text>
                                <text x="725" y="166" textAnchor="middle" fontSize="10" fill={MUTED}>JRE / 実在インタビュー</text>
                            </g>
                        </a>

                        {/* 園の敷地 */}
                        <path d="M 40 140 Q 30 110 70 106 L 540 96 Q 580 94 578 130 L 574 360 Q 574 396 534 398 L 90 406 Q 44 408 44 366 Z"
                            fill="#F4F1E7" stroke="#D9D2C0" strokeWidth="2.5" />

                        {/* 園路 */}
                        <path d="M 300 402 Q 300 350 220 330 Q 120 306 130 250 Q 138 206 240 200 Q 340 196 350 250 Q 358 300 460 292 Q 540 284 530 220 Q 524 170 440 160"
                            fill="none" stroke="#E0D8C2" strokeWidth="14" strokeLinecap="round" />
                        <path d="M 300 402 Q 300 350 220 330 Q 120 306 130 250 Q 138 206 240 200 Q 340 196 350 250 Q 358 300 460 292 Q 540 284 530 220 Q 524 170 440 160"
                            fill="none" stroke="#CBBF9F" strokeWidth="2" strokeDasharray="2 8" />

                        {/* 各館 */}
                        <a href="#hall-coinage"><g style={{ cursor: 'pointer' }}>
                            <rect x="150" y="290" width="130" height="58" rx="10" fill={CARD} stroke={GOLD} strokeWidth="2.5" transform="rotate(-2 215 319)" />
                            <text x="215" y="314" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK} transform="rotate(-2 215 319)">1. 捏造館</text>
                            <text x="215" y="334" textAnchor="middle" fontSize="10" fill={MUTED} transform="rotate(-2 215 319)">存在しない単語 26体</text>
                        </g></a>
                        <a href="#hall-slip"><g style={{ cursor: 'pointer' }}>
                            <rect x="72" y="180" width="120" height="54" rx="10" fill={CARD} stroke={GOLD} strokeWidth="2.5" transform="rotate(1.5 132 207)" />
                            <text x="132" y="202" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK} transform="rotate(1.5 132 207)">2. 訛り館</text>
                            <text x="132" y="221" textAnchor="middle" fontSize="10" fill={MUTED} transform="rotate(1.5 132 207)">音が滑った個体</text>
                        </g></a>
                        <a href="#hall-direction"><g style={{ cursor: 'pointer' }}>
                            <rect x="228" y="140" width="128" height="54" rx="10" fill={CARD} stroke={GOLD} strokeWidth="2.5" transform="rotate(-1 292 167)" />
                            <text x="292" y="162" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK} transform="rotate(-1 292 167)">3. 方向館</text>
                            <text x="292" y="181" textAnchor="middle" fontSize="10" fill={MUTED} transform="rotate(-1 292 167)">感情の向きが逆</text>
                        </g></a>
                        <a href="#hall-attendance"><g style={{ cursor: 'pointer' }}>
                            <rect x="392" y="215" width="128" height="54" rx="10" fill={CARD} stroke={GREEN_BR} strokeWidth="2.5" transform="rotate(1 456 242)" />
                            <text x="456" y="237" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK} transform="rotate(1 456 242)">4. 勤怠舎</text>
                            <text x="456" y="256" textAnchor="middle" fontSize="10" fill={MUTED} transform="rotate(1 456 242)">常設3体 — 檻ではなく出勤簿</text>
                        </g></a>
                        <a href="#hall-specimen"><g style={{ cursor: 'pointer' }}>
                            <rect x="404" y="118" width="150" height="54" rx="10" fill={CARD} stroke={GOLD} strokeWidth="2.5" transform="rotate(-1.5 479 145)" />
                            <text x="479" y="140" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK} transform="rotate(-1.5 479 145)">5. 標本室</text>
                            <text x="479" y="159" textAnchor="middle" fontSize="10" fill={MUTED} transform="rotate(-1.5 479 145)">着地した言い回し 65個</text>
                        </g></a>

                        <a href="#hall-silence"><g style={{ cursor: 'pointer' }}>
                            <rect x="394" y="304" width="152" height="56" rx="10" fill="#F5F3EE" stroke="#A8A29E" strokeWidth="2.5" strokeDasharray="6 4" transform="rotate(1.2 470 332)" />
                            <text x="470" y="327" textAnchor="middle" fontSize="14" fontWeight="900" fill={INK} transform="rotate(1.2 470 332)">6. 沈黙室</text>
                            <text x="470" y="346" textAnchor="middle" fontSize="10" fill={MUTED} transform="rotate(1.2 470 332)">収蔵ゼロ — 空の台座だけ</text>
                        </g></a>

                        {/* 柵の外の掲示板(未確認個体) */}
                        <a href="#cryptids"><g style={{ cursor: 'pointer' }}>
                            <rect x="612" y="212" width="228" height="48" rx="6" fill="#FFFDF7" stroke={RED} strokeWidth="2" strokeDasharray="5 4" transform="rotate(-1 726 236)" />
                            <text x="726" y="233" textAnchor="middle" fontSize="12.5" fontWeight="900" fill={RED} transform="rotate(-1 726 236)">未確認個体の掲示板</text>
                            <text x="726" y="250" textAnchor="middle" fontSize="9.5" fill={MUTED} transform="rotate(-1 726 236)">目撃例のみ — 檻はまだ無い</text>
                        </g></a>

                        {/* 訃報の石 */}
                        <a href="#obituaries"><g style={{ cursor: 'pointer' }}>
                            <path d="M 92 344 q 0 -16 15 -16 q 15 0 15 16 l 0 30 l -30 0 Z" fill="#DED8CA" stroke="#B9B0A0" strokeWidth="1.6" />
                            <text x="107" y="362" textAnchor="middle" fontSize="10" fontWeight="900" fill="#6B6355">訃報</text>
                            <text x="107" y="390" textAnchor="middle" fontSize="9" fill={MUTED}>死亡 = 上達</text>
                        </g></a>

                        {/* 門3つ */}
                        <g>
                            <rect x="268" y="392" width="66" height="26" rx="6" fill={GREEN} />
                            <text x="301" y="409" textAnchor="middle" fontSize="11" fontWeight="900" fill="#F5F0E1">正面口</text>
                            <text x="301" y="428" textAnchor="middle" fontSize="9" fill={MUTED}>入園料: 損 — 町民用</text>
                        </g>
                        <g>
                            <rect x="30" y="252" width="18" height="34" rx="3" fill={GREEN_BR} />
                            <text x="18" y="304" fontSize="9" fill={MUTED}>緑の扉</text>
                            <text x="6" y="316" fontSize="8.5" fill={MUTED}>(居酒屋の裏)</text>
                        </g>
                        <g>
                            <rect x="566" y="300" width="16" height="30" rx="3" fill="#A8A29E" />
                            <text x="590" y="314" fontSize="9" fill={MUTED}>飼育員通用口</text>
                            <text x="590" y="326" fontSize="8.5" fill={MUTED}>通行料: 恥(常に黒字)</text>
                        </g>

                        {/* 現在地 */}
                        <circle cx="301" cy="384" r="5" fill={RED} />
                        <text x="313" y="381" fontSize="9.5" fill={RED} fontWeight="bold">現在地</text>
                    </svg>
                </div>

                {/* ================= 1. 捏造館 ================= */}
                <section id="hall-coinage" style={{ marginBottom: 54 }}>
                    <Sign no="1" name="捏造館" en="The Coinage House" tilt={-0.8} />
                    <div style={{ fontSize: 13, color: MUTED, lineHeight: 2, marginBottom: 16, maxWidth: 640 }}>
                        {coinage?.holds} ここは産科病棟に近い。全個体がこの世に存在せず、しかし善意から生まれた。
                        収蔵 <b style={{ color: INK }}>{SAGA_BESTIARY.length}体</b>。番号は発生した夜。
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))', gap: 12 }}>
                        {SAGA_BESTIARY.map((m, i) => (
                            <Plate key={m.name} i={i}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                                    <span style={{ fontSize: 10, fontWeight: 900, color: '#fff', background: GOLD, borderRadius: 4, padding: '1px 7px' }}>第{m.summonedNight}夜</span>
                                    <span style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 800 }}>{m.name}</span>
                                </div>
                                <div style={{ fontSize: 11.5, color: GREEN, margin: '7px 0 6px', fontStyle: 'italic', lineHeight: 1.6 }}>
                                    召喚の呪文: “{m.spoke}”
                                </div>
                                <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.8 }}>{m.note}</div>
                            </Plate>
                        ))}
                    </div>
                </section>

                {/* ================= 2. 訛り館 ================= */}
                <section id="hall-slip" style={{ marginBottom: 54 }}>
                    <Sign no="2" name="訛り館" en="The Slipped Sounds" tilt={0.6} />
                    <div style={{ fontSize: 13, color: MUTED, lineHeight: 2, marginBottom: 16, maxWidth: 640 }}>
                        {slip?.holds} 名物は錆びた扇風機である。
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))', gap: 12 }}>
                        {slip?.stars.map((s, i) => (
                            <Plate key={s.name} i={i + 1}>
                                <div style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 800 }}>{s.name}</div>
                                <div style={{ fontSize: 10.5, color: GOLD, fontWeight: 800, margin: '3px 0 6px' }}>{s.born}</div>
                                <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.8 }}>{s.note}</div>
                            </Plate>
                        ))}
                    </div>
                </section>

                {/* ================= 3. 方向館 ================= */}
                <section id="hall-direction" style={{ marginBottom: 54 }}>
                    <Sign no="3" name="方向館" en="The Hall of Reversed Feeling" tilt={-0.5} />
                    <div style={{ fontSize: 13, color: MUTED, lineHeight: 2, marginBottom: 16, maxWidth: 640 }}>
                        {direction?.holds} 同館では入れ替えが1晩に4回観測されたことがある。
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))', gap: 12 }}>
                        {direction?.stars.map((s, i) => (
                            <Plate key={s.name} i={i + 2}>
                                <div style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 800 }}>{s.name}</div>
                                <div style={{ fontSize: 10.5, color: GOLD, fontWeight: 800, margin: '3px 0 6px' }}>{s.born}</div>
                                <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.8 }}>{s.note}</div>
                            </Plate>
                        ))}
                    </div>
                </section>

                {/* ================= 4. 勤怠舎 ================= */}
                <section id="hall-attendance" style={{ marginBottom: 54 }}>
                    <Sign no="4" name="勤怠舎" en="The Attendance Shed" tilt={0.8} />
                    <div style={{ fontSize: 13, color: MUTED, lineHeight: 2, marginBottom: 16, maxWidth: 640 }}>
                        常設。ここだけは檻ではなく出勤簿で管理されている。飼育の問題ではなく、勤怠の問題だからである。
                    </div>
                    <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 10px rgba(28,25,23,0.06)' }}>
                        <div style={{ background: '#F3F0E8', padding: '10px 18px', fontSize: 11, letterSpacing: 3, color: MUTED, fontWeight: 800, borderBottom: `1px solid ${LINE}` }}>
                            出 勤 簿 — 第70夜 時点
                        </div>
                        {SAGA_PARTY.map((p) => (
                            <div key={p.name} style={{ display: 'flex', gap: 16, padding: '16px 18px', borderBottom: `1px dashed ${LINE}`, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                <div style={{ minWidth: 118 }}>
                                    <div style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 900 }}>{p.name}</div>
                                    <div style={{ fontSize: 11, color: GOLD, fontWeight: 800 }}>{p.role}</div>
                                </div>
                                <div style={{ flex: 1, minWidth: 240, fontSize: 12.5, color: MUTED, lineHeight: 1.9 }}>{p.status}</div>
                                <div style={{
                                    alignSelf: 'center', fontSize: 12, fontWeight: 900, color: RED,
                                    border: `2px solid ${RED}`, borderRadius: '50%', width: 52, height: 52,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transform: 'rotate(-12deg)', opacity: 0.85,
                                }}>
                                    欠勤
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ================= 5. 標本室 ================= */}
                <section id="hall-specimen" style={{ marginBottom: 54 }}>
                    <Sign no="5" name="標本室" en="The Specimen Room" tilt={-0.6} />
                    <div style={{ fontSize: 13, color: MUTED, lineHeight: 2, marginBottom: 16, maxWidth: 640 }}>
                        実戦で仕留めた言い回しの剥製。持っているだけの個体は入れない。口から出て着地した
                        <b style={{ color: INK }}> {SAGA_SKILLS.length}個</b>だけが並ぶ。番号は捕獲した夜。
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(215px, 1fr))', gap: 10 }}>
                        {SAGA_SKILLS.map((s, i) => (
                            <div key={s.en + s.acquiredNight} style={{
                                background: CARD, border: `1px solid ${LINE}`, borderRadius: 8, padding: '10px 12px',
                                boxShadow: '0 1px 5px rgba(28,25,23,0.05)',
                                transform: `rotate(${i % 4 === 0 ? -0.5 : i % 4 === 2 ? 0.5 : 0}deg)`,
                                position: 'relative',
                            }}>
                                {/* 標本ピン */}
                                <div style={{ position: 'absolute', top: -4, left: '50%', width: 8, height: 8, borderRadius: '50%', background: GOLD, boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }} />
                                <div style={{ fontSize: 13, fontWeight: 800, fontFamily: SERIF, lineHeight: 1.5 }}>{s.en}</div>
                                <div style={{ display: 'flex', gap: 6, alignItems: 'baseline', marginTop: 4 }}>
                                    <span style={{ fontSize: 10, color: '#fff', background: GREEN_BR, borderRadius: 4, padding: '1px 6px', fontWeight: 800 }}>第{s.acquiredNight}夜</span>
                                    <span style={{ fontSize: 11.5, color: MUTED, fontWeight: 700 }}>{s.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: 11.5, color: MUTED, marginTop: 12, lineHeight: 1.9 }}>
                        標本室からの脱走(=物忘れ)は捜索願が出る。give the benefit of the doubt は一度姿を消し、
                        21夜後にNRA相手の議論の現場で再捕獲された。逃げた個体ほど、二度目の檻は破られない。復習とは追跡である。
                    </div>
                </section>

                {/* ================= 6. 沈黙室 ================= */}
                <section id="hall-silence" style={{ marginBottom: 54 }}>
                    <Sign no="6" name="沈黙室" en="The Silence Room" tilt={0.4} />
                    <div style={{ fontSize: 13, color: MUTED, lineHeight: 2, marginBottom: 16, maxWidth: 660 }}>
                        {silence?.holds} 台座の上には何も無く、日本語の札だけが置いてある。
                        園で唯一、<b style={{ color: INK }}>収蔵数がゼロのまま増え続ける</b>館である。
                    </div>
                    <div style={{
                        background: '#F5F3EE', border: `1px solid ${LINE}`, borderRadius: 14,
                        padding: '22px 18px 26px', boxShadow: 'inset 0 2px 14px rgba(28,25,23,0.05)',
                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 18 }}>
                            {(silence?.stars ?? []).map((s, i) => (
                                <div key={s.name} style={{ textAlign: 'center' }}>
                                    {/* 空の台座 */}
                                    <div style={{
                                        height: 66, background: 'linear-gradient(#EFEBE1, #DED8CA)',
                                        border: `1px solid #CFC7B4`, borderRadius: '4px 4px 2px 2px',
                                        margin: '0 auto', width: '78%',
                                        boxShadow: '0 3px 0 #C4BCA8', position: 'relative',
                                        transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)`,
                                    }}>
                                        <div style={{
                                            position: 'absolute', top: 20, left: 0, right: 0,
                                            fontSize: 10.5, letterSpacing: 3, color: '#A79E8B', fontWeight: 800,
                                        }}>
                                            （空）
                                        </div>
                                    </div>
                                    {/* 札 */}
                                    <div style={{
                                        background: CARD, border: `1px solid ${LINE}`, borderTop: `3px solid ${MUTED}`,
                                        borderRadius: 8, padding: '10px 12px', marginTop: 10, textAlign: 'left',
                                    }}>
                                        <div style={{ fontFamily: SERIF, fontSize: 13.5, fontWeight: 800, lineHeight: 1.6 }}>{s.name}</div>
                                        <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.85, marginTop: 4 }}>{s.note}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.95, marginTop: 18, textAlign: 'center', maxWidth: 620, marginLeft: 'auto', marginRight: 'auto' }}>
                            言えた間違いは檻に入る。言わなかったものは檻に入れられない。
                            <b style={{ color: INK }}>この館だけが、上達しても小さくならない。</b>
                        </div>
                    </div>
                </section>

                {/* ================= 野生区 ================= */}
                <section id="wild" style={{ marginBottom: 54 }}>
                    <Sign no="—" name="野生区" en="The Wild" tilt={0.5} />
                    <div style={{
                        border: `2px dashed ${GREEN_BR}`, borderRadius: 14, background: '#F2F8F4',
                        padding: '18px 22px', display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center',
                    }}>
                        <div style={{ flex: 1, minWidth: 260, fontSize: 13, lineHeight: 2, color: MUTED }}>
                            柵の切れ目に双眼鏡が並ぶ。実在のポッドキャストの崩れた実音が観察できる。
                            <b style={{ color: GREEN }}> 捕獲禁止。餌やり禁止。</b>
                            あれは展示ではなく、外の生態そのものである。
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <Link href="/english/podcast" style={{ background: GREEN, color: '#F5F0E1', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>JRE観察窓</Link>
                            <Link href="/english/interview" style={{ background: GREEN, color: '#F5F0E1', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>字幕観察窓</Link>
                        </div>
                    </div>
                </section>

                {/* ================= 未確認個体 ================= */}
                <section id="cryptids" style={{ marginBottom: 54 }}>
                    <div style={{ fontSize: 11, letterSpacing: 4, color: RED, fontWeight: 900, marginBottom: 4 }}>
                        柵の外の掲示板 — 未確認個体 {ZOO_LEDGER.cryptids}件
                    </div>
                    <div style={{ fontSize: 13, color: MUTED, lineHeight: 2, marginBottom: 14, maxWidth: 680 }}>
                        目撃例だけがあり、まだ檻に入っていないもの。園則第二条により名前の無い個体は展示できないため、
                        ここには檻が無く、<b style={{ color: INK }}>目撃証言だけが貼ってある</b>。
                        動物園で唯一、未来を扱う区画である。
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
                        {CRYPTIDS.map((c, i) => (
                            <div key={c.id} style={{
                                background: '#FFFDF7', border: `1px dashed ${RED}`, borderRadius: 10,
                                padding: '14px 16px', transform: `rotate(${i % 3 === 0 ? -0.7 : i % 3 === 1 ? 0.6 : 0}deg)`,
                                boxShadow: '0 2px 8px rgba(28,25,23,0.06)',
                            }}>
                                <div style={{ fontSize: 9.5, letterSpacing: 3, color: RED, fontWeight: 900 }}>UNCAPTURED</div>
                                <div style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 900, marginTop: 2 }}>{c.name}</div>
                                <div style={{ fontSize: 10, letterSpacing: 2, color: MUTED, fontWeight: 700, marginBottom: 8 }}>{c.en.toUpperCase()}</div>
                                <div style={{ fontSize: 11.5, color: INK, lineHeight: 1.9 }}>
                                    <b style={{ color: RED }}>目撃 — </b>{c.sighting}
                                </div>
                                <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.9, marginTop: 7, borderTop: `1px dashed ${LINE}`, paddingTop: 7 }}>
                                    <b>捕獲できない理由 — </b>{c.whyUncaught}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ================= 訃報欄 ================= */}
                <section id="obituaries" style={{ marginBottom: 54 }}>
                    <div style={{
                        background: CARD, border: `1px solid ${LINE}`, borderRadius: 14, overflow: 'hidden',
                        boxShadow: '0 2px 12px rgba(28,25,23,0.07)',
                    }}>
                        <div style={{ background: INK, color: '#EFEAE0', padding: '14px 20px' }}>
                            <div style={{ fontSize: 10, letterSpacing: 5, color: '#B9AE97', fontWeight: 800 }}>THE OBITUARIES</div>
                            <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 900, letterSpacing: 2 }}>訃 報</div>
                            <div style={{ fontSize: 11.5, color: '#C6BCA6', lineHeight: 1.9, marginTop: 5 }}>
                                {OBITUARY_LAW.rule} {OBITUARY_LAW.cause}
                            </div>
                        </div>
                        {OBITUARIES.map((o) => (
                            <div key={o.name} style={{ padding: '16px 20px', borderBottom: `1px dashed ${LINE}` }}>
                                <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}>
                                    <span style={{ fontFamily: SERIF, fontSize: 16.5, fontWeight: 900 }}>{o.name}</span>
                                    <span style={{ fontSize: 11, color: MUTED, fontWeight: 700 }}>{o.born} — {o.died}</span>
                                    {o.revoked && (
                                        <span style={{ fontSize: 10, fontWeight: 900, color: RED, border: `1px solid ${RED}`, borderRadius: 999, padding: '1px 9px' }}>宣告撤回</span>
                                    )}
                                    {o.cause !== '——' && !o.revoked && (
                                        <span style={{ fontSize: 10, fontWeight: 900, color: '#fff', background: INK, borderRadius: 999, padding: '2px 9px' }}>死亡確認</span>
                                    )}
                                    {o.cause === '——' && (
                                        <span style={{ fontSize: 10, fontWeight: 900, color: GOLD, border: `1px solid ${GOLD}`, borderRadius: 999, padding: '1px 9px' }}>審査中</span>
                                    )}
                                </div>
                                {o.cause !== '——' && (
                                    <div style={{ fontSize: 11.5, color: RED, fontWeight: 800, marginTop: 4 }}>死因 — {o.cause}</div>
                                )}
                                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.95, marginTop: 5 }}>{o.note}</div>
                            </div>
                        ))}
                        <div style={{ padding: '16px 20px', background: '#FBF9F3' }}>
                            <div style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 900, marginBottom: 5 }}>{OBITUARY_LAW.paradox}</div>
                            <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.95 }}>{OBITUARY_LAW.whyNotFrontPage}</div>
                        </div>
                    </div>
                </section>

                {/* ================= 気象法則 ================= */}
                <section id="weather-law" style={{ marginBottom: 54 }}>
                    <div style={{ fontSize: 11, letterSpacing: 4, color: GREEN, fontWeight: 900, marginBottom: 4 }}>
                        新聞との連動 — THE WEATHER LAW
                    </div>
                    <div style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 900, marginBottom: 10 }}>{WEATHER_LAW.line}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginBottom: 12 }}>
                        {WEATHER_LAW.table.map((w, i) => (
                            <div key={w.sky} style={{
                                background: CARD, border: `1px solid ${LINE}`, borderLeft: `4px solid ${i === 2 ? RED : GREEN_BR}`,
                                borderRadius: 10, padding: '11px 14px',
                            }}>
                                <div style={{ fontSize: 12.5, fontWeight: 900 }}>{w.sky}</div>
                                <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.85, marginTop: 4 }}>{w.means}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.95, maxWidth: 680 }}>
                        {WEATHER_LAW.note}{' '}
                        <Link href="/english/newspaper" style={{ color: GOLD, fontWeight: 800 }}>気象欄を確かめる →</Link>
                    </div>
                </section>

                {/* ================= 園則 ================= */}
                <section id="house-rules" style={{ marginBottom: 54 }}>
                    <div style={{ fontSize: 11, letterSpacing: 4, color: MUTED, fontWeight: 900, marginBottom: 10 }}>
                        正門の内側に掛かっている板 — 園則 全{ZOO_LEDGER.rules}条
                    </div>
                    <div style={{
                        background: '#F3F0E8', border: `2px solid #D9D2C0`, borderRadius: 8,
                        padding: '18px 20px', boxShadow: '4px 4px 0 rgba(28,25,23,0.10)', transform: 'rotate(-0.3deg)',
                    }}>
                        {HOUSE_RULES.map((r) => (
                            <div key={r.no} style={{ display: 'flex', gap: 12, padding: '9px 0', borderBottom: `1px dashed #DDD6C4`, alignItems: 'baseline', flexWrap: 'wrap' }}>
                                <span style={{ fontFamily: SERIF, fontSize: 12.5, fontWeight: 900, color: GOLD, minWidth: 46 }}>{r.no}</span>
                                <span style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 800, minWidth: 200, flex: '0 1 auto' }}>{r.text}</span>
                                {r.note && <span style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.85, flex: 1, minWidth: 220 }}>{r.note}</span>}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ================= 両替所 ================= */}
                <section id="exchange" style={{ marginBottom: 54 }}>
                    <div style={{ fontSize: 11, letterSpacing: 4, color: GOLD, fontWeight: 900, marginBottom: 4 }}>
                        正門脇の窓口 — THE EXCHANGE
                    </div>
                    <div style={{ fontFamily: SERIF, fontSize: 21, fontWeight: 900, marginBottom: 6 }}>{EXCHANGE_LAW.headline}</div>
                    <div style={{ fontSize: 12.5, color: MUTED, lineHeight: 2, marginBottom: 14, maxWidth: 700 }}>
                        {EXCHANGE_LAW.body}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 10 }}>
                        {EXCHANGE_RATES.map((r) => {
                            const dead = r.rate === '両替不可';
                            return (
                                <div key={r.from + r.to} style={{
                                    background: CARD, border: `1px solid ${LINE}`,
                                    borderLeft: `4px solid ${dead ? RED : GOLD}`,
                                    borderRadius: 12, padding: '13px 15px',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                                        <span style={{ fontFamily: SERIF, fontSize: 14.5, fontWeight: 900 }}>{r.from}</span>
                                        <span style={{ color: MUTED, fontWeight: 900 }}>→</span>
                                        <span style={{ fontFamily: SERIF, fontSize: 14.5, fontWeight: 900 }}>{r.to}</span>
                                        <span style={{
                                            marginLeft: 'auto', fontSize: 11, fontWeight: 900,
                                            color: dead ? RED : GREEN, border: `1px solid ${dead ? RED : GREEN}`,
                                            borderRadius: 999, padding: '1px 9px', whiteSpace: 'nowrap',
                                        }}>{r.rate}</span>
                                    </div>
                                    <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.9, marginTop: 6 }}>{r.condition}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ fontSize: 11.5, color: MUTED, marginTop: 10, fontWeight: 700 }}>{EXCHANGE_LAW.fee}</div>
                </section>

                {/* ================= 園の暦 ================= */}
                <section id="calendar" style={{ marginBottom: 54 }}>
                    <div style={{ fontSize: 11, letterSpacing: 4, color: GREEN, fontWeight: 900, marginBottom: 10 }}>
                        受付に貼ってある紙 — THE ZOO CALENDAR
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 10 }}>
                        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 12, padding: '14px 16px' }}>
                            <div style={{ fontSize: 10.5, letterSpacing: 2, color: MUTED, fontWeight: 900, marginBottom: 6 }}>休 園 日</div>
                            {ZOO_CALENDAR.closed.map((c) => (
                                <div key={c.when} style={{ marginBottom: 8 }}>
                                    <div style={{ fontFamily: SERIF, fontSize: 14, fontWeight: 900 }}>{c.when}</div>
                                    <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.85 }}>{c.why}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 12, padding: '14px 16px' }}>
                            <div style={{ fontSize: 10.5, letterSpacing: 2, color: MUTED, fontWeight: 900, marginBottom: 6 }}>週 の 回 り</div>
                            {ZOO_CALENDAR.weekly.map((w) => (
                                <div key={w.day} style={{ display: 'flex', gap: 10, marginBottom: 7, alignItems: 'baseline' }}>
                                    <span style={{ fontFamily: SERIF, fontSize: 14, fontWeight: 900, color: GOLD, minWidth: 34 }}>{w.day}</span>
                                    <span style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.85 }}>{w.event}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 10, marginTop: 10 }}>
                        {ZOO_CALENDAR.annual.map((a) => (
                            <div key={a.name} style={{ background: CARD, border: `1px solid ${LINE}`, borderTop: `3px solid ${GREEN}`, borderRadius: 12, padding: '13px 15px' }}>
                                <div style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 900, marginBottom: 5 }}>{a.name}</div>
                                <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.9 }}>{a.what}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{
                        marginTop: 10, border: `1px dashed ${LINE}`, borderRadius: 12, background: '#FBF9F3',
                        padding: '12px 16px', fontSize: 11.5, color: MUTED, lineHeight: 1.9,
                    }}>
                        <b style={{ color: INK }}>閉園日 — </b>{ZOO_CALENDAR.closingDay}
                    </div>
                </section>

                {/* ================= 巨獣 ================= */}
                <section style={{ marginBottom: 54 }}>
                    <div style={{ fontSize: 11, letterSpacing: 4, color: MUTED, fontWeight: 800, marginBottom: 12 }}>園外 — 地平線の巨獣</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 12 }}>
                        {RAID_BOSSES.map((b, i) => (
                            <div key={b.id} style={{
                                background: '#F3F0E8', border: `1px solid #D9D2C0`, borderRadius: 12, padding: '14px 16px',
                                transform: `rotate(${i === 1 ? 0.6 : -0.4}deg)`,
                            }}>
                                <div style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 900 }}>{b.name}</div>
                                <div style={{ fontSize: 10.5, color: GOLD, fontWeight: 800, margin: '2px 0 6px' }}>{b.declared} に宣戦布告</div>
                                <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.8 }}>{b.note}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ================= 終末条項の銘板 ================= */}
                <div style={{
                    marginBottom: 54, border: `2px solid ${INK}`, borderRadius: 6, background: CARD,
                    padding: '20px 24px', textAlign: 'center', transform: 'rotate(-0.4deg)',
                    boxShadow: '4px 4px 0 rgba(28,25,23,0.15)',
                }}>
                    <div style={{ fontSize: 10, letterSpacing: 4, color: RED, fontWeight: 900 }}>園の正門の裏にだけ掛かっている銘板</div>
                    <div style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 900, margin: '10px 0', letterSpacing: 1 }}>
                        {CONCEPT.doomClause}
                    </div>
                    <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 2, maxWidth: 620, margin: '0 auto' }}>
                        {CONCEPT.doomClauseNote}
                    </div>
                </div>

                {/* ================= 出口(売店) ================= */}
                <div style={{
                    borderTop: `2px solid ${LINE}`, paddingTop: 22, textAlign: 'center',
                    fontSize: 13, color: MUTED, lineHeight: 2.2,
                }}>
                    <div style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 800, color: INK, marginBottom: 6 }}>
                        出口は売店を通ります
                    </div>
                    毎晩の新入りは<Link href="/english/tonight" style={{ color: GOLD, fontWeight: 800, margin: '0 4px' }}>今夜も、通じない。</Link>で発生し、
                    収蔵の経緯は<Link href="/english/training/dmm" style={{ color: GOLD, fontWeight: 800, margin: '0 4px' }}>検死室</Link>に記録される。<br />
                    園の周辺には<Link href="/english/ridgeway" style={{ color: GOLD, fontWeight: 800, margin: '0 4px' }}>TONIO TOWN(147人)</Link>があり、
                    寄贈者の<Link href="/english/village" style={{ color: GOLD, fontWeight: 800, margin: '0 4px' }}>とにお村</Link>は開村準備中。
                </div>
            </div>
            <WorldMapButton />
        </div>
    );
}
