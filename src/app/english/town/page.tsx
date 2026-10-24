'use client';

// とにおワールド — 生きている町 TONIO TOWN (ポケモン型・見下ろしマップ)
//
// - 147人全員がドット絵で町に立っている。絵は id のハッシュから決定的に生成(全員違う顔、リロードしても同じ顔)
// - クリックで住民カード(ドット絵・住所・役割・出演シナリオ・人物像)
// - 「本日の町」は town-state.ts の TOWN_DAYS 先頭を表示。毎朝1件追記すれば町が生きて動く
// - 建物は既存プロダクトへの入口(新聞→newspaper / 動物園→zoo / 酒場→losers' table / 学校→FNL…)
// - 目撃情報(sightings)に載っている住民は金色に光る

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PEOPLE, type WorldPerson } from '@/data/english/requiem-world';
import { addressOf, hashStr, latestDay, FESTIVALS, personById, GRAMMAR_WEATHER } from '@/data/english/town-state';
import WorldMapButton from '@/components/english/WorldMapButton';

const INK = '#1c1917';
const MUTED = '#78716c';
const LINE = '#e7e5e4';
const CARD = '#ffffff';
const GOLD = '#B8941E';
const GOLD_HI = '#E7C14B';
const GREEN = '#065F46';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";

// ============ ドット絵の決定的生成 ============
const SKINS = ['#F5CBA7', '#EAB98F', '#D9A066', '#B07B4F', '#8C5A32'];
const HAIRS = ['#2C1B10', '#4A3320', '#7A5230', '#A8763E', '#5B5B5B', '#C7C7C7', '#8E3B2F', '#3B3B6B'];
const SHIRTS = ['#C0392B', '#2563EB', '#0E7490', '#7C3AED', '#B45309', '#166534', '#DB2777', '#475569', '#B8941E', '#0F766E'];
const PANTS = ['#334155', '#57534E', '#1E3A8A', '#3F3F46'];

function PixelSprite({ seed, px = 3, glow = false }: { seed: string; px?: number; glow?: boolean }) {
    const h = hashStr(seed);
    const skin = SKINS[h % SKINS.length];
    const hair = HAIRS[(h >> 3) % HAIRS.length];
    const shirt = SHIRTS[(h >> 6) % SHIRTS.length];
    const pants = PANTS[(h >> 10) % PANTS.length];
    const hairStyle = (h >> 13) % 3;      // 0=長め 1=短髪 2=帽子風
    const W = 8, H = 10;
    return (
        <svg width={W * px} height={H * px} viewBox={`0 0 ${W} ${H}`}
            style={{ imageRendering: 'pixelated', filter: glow ? `drop-shadow(0 0 ${px * 1.5}px ${GOLD_HI})` : 'drop-shadow(0 1px 1px rgba(0,0,0,0.35))' }}
            shapeRendering="crispEdges">
            {/* 髪 */}
            {hairStyle === 2
                ? <><rect x={1} y={0} width={6} height={1} fill={shirt} /><rect x={0} y={1} width={8} height={1} fill={shirt} /></>
                : <><rect x={1} y={0} width={6} height={1} fill={hair} /><rect x={hairStyle === 0 ? 0 : 1} y={1} width={hairStyle === 0 ? 8 : 6} height={1} fill={hair} /></>}
            {/* 顔 */}
            <rect x={1} y={2} width={6} height={2} fill={skin} />
            <rect x={2} y={2} width={1} height={1} fill={INK} />
            <rect x={5} y={2} width={1} height={1} fill={INK} />
            {/* 体 */}
            <rect x={1} y={4} width={6} height={3} fill={shirt} />
            <rect x={0} y={4} width={1} height={2} fill={skin} />
            <rect x={7} y={4} width={1} height={2} fill={skin} />
            {/* 脚・靴 */}
            <rect x={2} y={7} width={4} height={2} fill={pants} />
            <rect x={2} y={9} width={1} height={1} fill={INK} />
            <rect x={5} y={9} width={1} height={1} fill={INK} />
        </svg>
    );
}

// ============ 町のゾーン(circle → マップ上の居場所) ============
const ZONES: Record<string, { x: number; y: number; w: number; h: number }> = {
    'lincoln-high': { x: 90, y: 210, w: 230, h: 60 },
    'ridgeway-general': { x: 600, y: 205, w: 150, h: 55 },
    'courthouse': { x: 800, y: 335, w: 130, h: 50 },
    'dmv-branch': { x: 630, y: 345, w: 130, h: 50 },
    'vance': { x: 395, y: 430, w: 90, h: 45 },
    'boyd': { x: 255, y: 470, w: 90, h: 45 },
    'hoa': { x: 90, y: 430, w: 220, h: 130 },
    'chris-carol': { x: 790, y: 130, w: 150, h: 55 },
    'crew-cruise': { x: 820, y: 545, w: 140, h: 45 },
    'road': { x: 60, y: 622, w: 700, h: 30 },
    'campus': { x: 620, y: 622, w: 330, h: 30 },
};

function spotOf(p: WorldPerson): { x: number; y: number } {
    const z = ZONES[p.circle] ?? { x: 400, y: 300, w: 200, h: 80 };
    const h = hashStr(p.id + ':pos');
    return { x: z.x + (h % z.w), y: z.y + ((h >> 7) % z.h) };
}

// ============ 建物 ============
function Building({ x, y, w, h, roof, wall, label, href }: {
    x: number; y: number; w: number; h: number; roof: string; wall: string; label: string; href?: string;
}) {
    const body = (
        <g style={href ? { cursor: 'pointer' } : undefined}>
            <rect x={x} y={y + 14} width={w} height={h - 14} fill={wall} stroke={INK} strokeWidth={1.5} />
            <polygon points={`${x - 6},${y + 16} ${x + w / 2},${y} ${x + w + 6},${y + 16}`} fill={roof} stroke={INK} strokeWidth={1.5} />
            <rect x={x + w / 2 - 7} y={y + h - 16} width={14} height={16} fill={INK} opacity={0.75} />
            <rect x={x + 8} y={y + 22} width={12} height={10} fill="#EFF6FF" stroke={INK} strokeWidth={1} />
            <rect x={x + w - 20} y={y + 22} width={12} height={10} fill="#EFF6FF" stroke={INK} strokeWidth={1} />
            <text x={x + w / 2} y={y + h + 13} textAnchor="middle" fontSize={11} fontWeight={900} fill={INK}>{label}</text>
        </g>
    );
    return href ? <Link href={href}>{body}</Link> : body;
}

export default function TownPage() {
    const day = latestDay();
    const [sel, setSel] = useState<string | null>(null);
    // ぐちゃぐちゃ防止: 既定は「今日の目撃者だけ」を地図に出す。全員(147人)はワンタップで
    const [showAll, setShowAll] = useState(false);
    const selected = sel ? PEOPLE.find((p) => p.id === sel) ?? null : null;
    const glowing = useMemo(() => new Set(day.sightings.map((s) => s.personId)), [day]);
    const shown = useMemo(
        () => (showAll ? PEOPLE : PEOPLE.filter((p) => glowing.has(p.id) || p.id === sel)),
        [showAll, glowing, sel],
    );
    const selSighting = sel ? day.sightings.find((s) => s.personId === sel) : undefined;

    return (
        <div style={{ background: '#F3F6EC', minHeight: '100vh' }}>
            <div style={{ maxWidth: 1040, margin: '0 auto', padding: '34px 16px 90px', color: INK }}>

                {/* ===== ヘッダー ===== */}
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                    <div style={{ fontSize: 11, letterSpacing: 6, color: GREEN, fontWeight: 800 }}>TONIO WORLD — A LIVING TOWN</div>
                    <h1 style={{ fontFamily: SERIF, fontSize: 42, fontWeight: 900, margin: '4px 0 6px', letterSpacing: 3 }}>TONIO TOWN</h1>
                    <div style={{ fontSize: 13, color: MUTED }}>
                        人口147人・全員に住所と顔がある。金色に光っている住民は、今日どこかで目撃されている。
                    </div>
                </div>

                {/* ===== 本日の町 ===== */}
                <div style={{ background: CARD, border: `1px solid ${LINE}`, borderRadius: 16, padding: '16px 20px', marginBottom: 18, boxShadow: '0 3px 14px rgba(28,25,23,0.07)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 11, letterSpacing: 3, color: GOLD, fontWeight: 900 }}>本日の町 — {day.date}</span>
                        <span style={{ fontSize: 12, color: MUTED }}>{day.weather}</span>
                    </div>
                    <div style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 800, margin: '8px 0 6px', lineHeight: 1.7 }}>
                        号外: {day.headline}
                    </div>
                    <ul style={{ margin: '4px 0 0', paddingLeft: 18, fontSize: 12.5, color: MUTED, lineHeight: 2 }}>
                        {day.gossip.map((g, i) => <li key={i}>{g}</li>)}
                    </ul>
                    {day.event && (
                        <div style={{ marginTop: 8, fontSize: 12, color: GREEN, fontWeight: 700 }}>{day.event}</div>
                    )}
                </div>

                {/* ===== 表示切替(清潔第一) ===== */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 8 }}>
                    <button onClick={() => setShowAll(false)} style={{
                        fontSize: 12, fontWeight: 800, borderRadius: 999, padding: '6px 14px', cursor: 'pointer',
                        border: `2px solid ${GOLD}`, background: !showAll ? GOLD : CARD, color: !showAll ? '#fff' : INK,
                    }}>今日の目撃者({day.sightings.length}人)</button>
                    <button onClick={() => setShowAll(true)} style={{
                        fontSize: 12, fontWeight: 800, borderRadius: 999, padding: '6px 14px', cursor: 'pointer',
                        border: `2px solid ${GOLD}`, background: showAll ? GOLD : CARD, color: showAll ? '#fff' : INK,
                    }}>町の全員(147人)</button>
                </div>

                {/* ===== 町マップ ===== */}
                <div style={{ background: '#CDE3B0', border: `3px solid ${INK}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 6px 24px rgba(28,25,23,0.18)' }}>
                    <svg viewBox="0 0 1000 680" style={{ width: '100%', height: 'auto', display: 'block' }}>
                        {/* 草タイル */}
                        {Array.from({ length: 120 }).map((_, i) => {
                            const gx = (i * 83) % 990, gy = 40 + ((i * 173) % 600);
                            return <g key={i} opacity={0.35}>
                                <rect x={gx} y={gy} width={3} height={3} fill="#8FBF6A" />
                                <rect x={gx + 5} y={gy + 3} width={3} height={3} fill="#8FBF6A" />
                            </g>;
                        })}

                        {/* 道路 */}
                        <rect x={0} y={295} width={1000} height={34} fill="#D9CBA8" stroke="#B7A67F" strokeWidth={2} />
                        <rect x={370} y={0} width={30} height={620} fill="#D9CBA8" stroke="#B7A67F" strokeWidth={2} />
                        <rect x={0} y={606} width={1000} height={30} fill="#C9BA93" />
                        <text x={12} y={626} fontSize={11} fontWeight={800} fill={INK} opacity={0.7}>Route 66 — 町の外へ(ロードトリップ / 空港 / 大学2時間)</text>

                        {/* 川と港 */}
                        <path d="M 960 380 Q 900 430 930 500 Q 955 555 900 610 L 1000 610 L 1000 380 Z" fill="#7FB7D9" stroke="#4E88AC" strokeWidth={2} />
                        <text x={905} y={540} fontSize={10} fontWeight={800} fill="#1E3A5F">港(クルーズ)</text>

                        {/* 建物群 = 既存プロダクトへの入口 */}
                        <Building x={120} y={120} w={170} h={80} roof="#B33A2B" wall="#F2E4C9" label="LINCOLN HIGH" />
                        <rect x={95} y={210} width={220} height={8} fill="#7FA85C" />
                        <Building x={620} y={130} w={120} h={70} roof="#5B7FA6" wall="#EDEFF2" label="RIDGEWAY GENERAL" />
                        <Building x={800} y={70} w={110} h={62} roof="#8C6239" wall="#F4E9D2" label="RICKの農場" />
                        <Building x={420} y={190} w={140} h={78} roof={GREEN} wall="#F7F2E2" label="THE TONIO TIMES" href="/english/newspaper" />
                        <Building x={455} y={352} w={120} h={70} roof="#4A3320" wall="#E8D9B8" label="LOSERS' TABLE" />
                        <Building x={655} y={352} w={100} h={58} roof="#57534E" wall="#E7E5E4" label="DMV" />
                        <Building x={810} y={342} w={110} h={64} roof="#94794A" wall="#F0EAD8" label="裁判所" />
                        {/* 動物園ゲート */}
                        <Link href="/english/zoo">
                            <g style={{ cursor: 'pointer' }}>
                                <rect x={70} y={330} width={120} height={54} fill="#F7F2E2" stroke={INK} strokeWidth={1.5} rx={4} />
                                <rect x={70} y={330} width={120} height={14} fill={GREEN} />
                                <text x={130} y={341} textAnchor="middle" fontSize={9.5} fontWeight={900} fill="#F5F0E1">RIDGEWAY MUNICIPAL</text>
                                <text x={130} y={362} textAnchor="middle" fontSize={13} fontWeight={900} fill={INK}>英語動物園</text>
                                <text x={130} y={376} textAnchor="middle" fontSize={8.5} fill={MUTED}>捏造26体・標本65個</text>
                            </g>
                        </Link>
                        {/* HOA住宅 */}
                        {[0, 1, 2, 3, 4].map((i) => (
                            <g key={i}>
                                <rect x={95 + i * 46} y={452} width={34} height={26} fill={['#F2D8C9', '#DCE8F2', '#F2EFD8', '#E8DCF2', '#DCF2E4'][i]} stroke={INK} strokeWidth={1.2} />
                                <polygon points={`${92 + i * 46},454 ${112 + i * 46},442 ${132 + i * 46},454`} fill="#A65B3F" stroke={INK} strokeWidth={1.2} />
                            </g>
                        ))}
                        <text x={200} y={500} textAnchor="middle" fontSize={10.5} fontWeight={800} fill={INK} opacity={0.75}>Alder Court (HOA住宅地)</text>
                        {/* Marcus と Boyd の家 */}
                        <rect x={410} y={445} width={40} height={30} fill="#F2E8D8" stroke={INK} strokeWidth={1.3} />
                        <polygon points="406,447 430,433 454,447" fill="#6B4A2F" stroke={INK} strokeWidth={1.3} />
                        <text x={430} y={492} textAnchor="middle" fontSize={9.5} fontWeight={800} fill={INK} opacity={0.75}>Vance家(地下室に染み)</text>
                        <rect x={280} y={485} width={40} height={30} fill="#E8F2D8" stroke={INK} strokeWidth={1.3} />
                        <polygon points="276,487 300,473 324,487" fill="#8C3B2F" stroke={INK} strokeWidth={1.3} />
                        <text x={300} y={532} textAnchor="middle" fontSize={9.5} fontWeight={800} fill={INK} opacity={0.75}>Boyd家(BBQの庭)</text>

                        {/* フットボール場 */}
                        <rect x={128} y={228} width={150} height={36} fill="#6FA34F" stroke="#F5F0E1" strokeWidth={2} rx={4} />
                        {[1, 2, 3].map((i) => <line key={i} x1={128 + i * 37.5} y1={228} x2={128 + i * 37.5} y2={264} stroke="#F5F0E1" strokeWidth={1} />)}

                        {/* 住民(既定は今日の目撃者のみ。全員表示はトグルで) */}
                        {shown.map((p) => {
                            const { x, y } = spotOf(p);
                            const g = glowing.has(p.id);
                            return (
                                <g key={p.id} transform={`translate(${x}, ${y})`}
                                    onClick={() => setSel(p.id === sel ? null : p.id)}
                                    style={{ cursor: 'pointer' }}>
                                    <title>{`${p.name} — ${p.role}`}</title>
                                    <foreignObject x={-12} y={-15} width={24} height={30}>
                                        <PixelSprite seed={p.id} px={3} glow={g} />
                                    </foreignObject>
                                    {sel === p.id && <circle cx={0} cy={18} r={10} fill="none" stroke={GOLD} strokeWidth={2.5} />}
                                </g>
                            );
                        })}
                    </svg>
                </div>

                {/* ===== 住民カード ===== */}
                {selected ? (
                    <div style={{ background: CARD, border: `2px solid ${GOLD}`, borderRadius: 16, padding: '18px 22px', marginTop: 16, boxShadow: '0 4px 18px rgba(184,148,30,0.18)', display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ background: '#F3F6EC', border: `1px solid ${LINE}`, borderRadius: 12, padding: 12 }}>
                                <PixelSprite seed={selected.id} px={9} />
                            </div>
                            <div style={{ fontSize: 10, color: MUTED, marginTop: 6 }}>住民登録 {String(PEOPLE.indexOf(selected) + 1).padStart(3, '0')} / 147</div>
                        </div>
                        <div style={{ flex: 1, minWidth: 260 }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                                <span style={{ fontFamily: SERIF, fontSize: 22, fontWeight: 900 }}>{selected.name}</span>
                                {selected.age && <span style={{ fontSize: 12, color: MUTED }}>{selected.age}</span>}
                            </div>
                            <div style={{ fontSize: 12.5, color: GOLD, fontWeight: 800, margin: '2px 0 8px' }}>{selected.role}</div>
                            <div style={{ fontSize: 12.5, lineHeight: 1.6, marginBottom: 6 }}>
                                <b>住所:</b> {addressOf(selected)}
                            </div>
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                                {selected.scenarios.map((s) => (
                                    <span key={s} style={{ fontSize: 10.5, fontWeight: 800, background: '#F3F6EC', border: `1px solid ${LINE}`, borderRadius: 999, padding: '2px 10px', color: GREEN }}>{s}</span>
                                ))}
                            </div>
                            <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.95 }}>{selected.note}</div>
                            {selSighting && (
                                <div style={{ marginTop: 10, background: '#FBF6E3', border: `1px solid ${GOLD}`, borderRadius: 10, padding: '8px 12px', fontSize: 12.5, lineHeight: 1.8 }}>
                                    <b style={{ color: GOLD }}>本日の目撃:</b> {selSighting.spot} — {selSighting.doing}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', fontSize: 12.5, color: MUTED, marginTop: 14 }}>
                        住民をクリックすると、顔・住所・人物像が出る。光っている{day.sightings.length}人は今日の目撃情報つき。
                    </div>
                )}

                {/* ===== 目撃ボード ===== */}
                <div style={{ marginTop: 26 }}>
                    <div style={{ fontSize: 11, letterSpacing: 3, color: MUTED, fontWeight: 800, marginBottom: 10 }}>本日の目撃情報 — SIGHTINGS</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
                        {day.sightings.map((s) => {
                            const p = personById(s.personId);
                            if (!p) return null;
                            return (
                                <button key={s.personId} onClick={() => setSel(s.personId)} style={{
                                    textAlign: 'left', background: CARD, border: `1px solid ${LINE}`, borderRadius: 10,
                                    padding: '10px 12px', cursor: 'pointer', display: 'flex', gap: 10, alignItems: 'center',
                                }}>
                                    <PixelSprite seed={p.id} px={4} glow />
                                    <span style={{ fontSize: 12, lineHeight: 1.6 }}>
                                        <b>{p.name}</b> <span style={{ color: MUTED }}>@ {s.spot}</span><br />
                                        <span style={{ color: MUTED }}>{s.doing}</span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ===== 文法物理学(実験 town-physics) ===== */}
                <div style={{ marginTop: 26 }}>
                    <div style={{ fontSize: 11, letterSpacing: 3, color: MUTED, fontWeight: 800, marginBottom: 4 }}>この町の物理法則 — 文法気象の写像表</div>
                    <div style={{ fontSize: 11.5, color: MUTED, marginBottom: 10, lineHeight: 1.8 }}>
                        この町の自然法則は、地球の裏の男のその夜の英語の誤りで決まる。捏造は禁止 — 本日の現象は、必ず昨夜実際に起きた誤りに対応している。
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 10 }}>
                        {GRAMMAR_WEATHER.map((w) => (
                            <div key={w.error} style={{ background: CARD, border: `1px solid ${LINE}`, borderLeft: `4px solid ${GREEN}`, borderRadius: 10, padding: '10px 14px' }}>
                                <div style={{ fontSize: 11, fontWeight: 900, color: GREEN, marginBottom: 4 }}>{w.error}</div>
                                <div style={{ fontSize: 12, color: '#44403C', lineHeight: 1.85 }}>{w.weather}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===== 町の行事 ===== */}
                <div style={{ marginTop: 26 }}>
                    <div style={{ fontSize: 11, letterSpacing: 3, color: MUTED, fontWeight: 800, marginBottom: 10 }}>町の年中行事 — 22シナリオがそのまま祭りである</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                        {FESTIVALS.map((f) => (
                            <div key={f.name} style={{ background: CARD, border: `1px solid ${LINE}`, borderLeft: `4px solid ${GOLD}`, borderRadius: 10, padding: '10px 14px' }}>
                                <span style={{ fontSize: 10.5, fontWeight: 900, color: GOLD }}>{f.month}</span>
                                <div style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 800 }}>{f.name}</div>
                                <div style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.8 }}>{f.note}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: 30, textAlign: 'center', fontSize: 12.5, color: MUTED, lineHeight: 2.2 }}>
                    この町は毎朝更新される。仕組みはAPIではなく、飼育員への朝の一言である。<br />
                    <Link href="/english/ridgeway" style={{ color: GOLD, fontWeight: 800 }}>町民名鑑(相関図)</Link> ·
                    <Link href="/english/zoo" style={{ color: GOLD, fontWeight: 800, marginLeft: 8 }}>英語動物園</Link> ·
                    <Link href="/english/newspaper" style={{ color: GOLD, fontWeight: 800, marginLeft: 8 }}>The Tonio Times</Link> ·
                    <Link href="/english/village" style={{ color: GOLD, fontWeight: 800, marginLeft: 8 }}>とにお村(開村準備中)</Link>
                </div>
            </div>
            <WorldMapButton />
        </div>
    );
}
