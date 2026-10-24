'use client';

// とにお村 — 実在の100人の村。
// 入場料は英語の恥1体。寄贈された恥は英語動物園に収蔵され、寄贈者として名前が残る。
// データは src/data/english/tonio-village.ts。村民が増えたらあちらに足すだけでこのページに並ぶ。

import Link from 'next/link';
import { VILLAGERS, VILLAGE_META, HALL_LABELS, villageStatus } from '@/data/english/tonio-village';
import WorldMapButton from '@/components/english/WorldMapButton';

const INK = '#1c1917';      // stone-900
const MUTED = '#78716c';    // stone-500
const LINE = '#e7e5e4';     // stone-200
const PAPER = '#fafaf9';    // stone-50
const GOLD = '#B8941E';
const GOLD_BG = '#FBF6E3';
const GREEN = '#10B981';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";

export default function VillagePage() {
    const st = villageStatus();

    return (
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px 80px', color: INK }}>

            {/* ===== 村の門 ===== */}
            <div style={{ textAlign: 'center', marginBottom: 14 }}>
                <div style={{ fontSize: 11, letterSpacing: 4, color: GOLD, fontWeight: 700 }}>
                    {VILLAGE_META.en.toUpperCase()}
                </div>
                <h1 style={{ fontFamily: SERIF, fontSize: 40, fontWeight: 900, margin: '6px 0 10px' }}>
                    {VILLAGE_META.name}
                </h1>
                <div style={{ fontSize: 14, color: MUTED, lineHeight: 2 }}>
                    実在の100人の村。{VILLAGE_META.entry}
                </div>
            </div>

            {/* ===== 定員メーター ===== */}
            <div style={{
                border: `1px solid ${LINE}`, borderRadius: 16, padding: '18px 22px',
                background: '#fff', marginBottom: 26,
            }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>
                        現在 <span style={{ fontFamily: SERIF, fontSize: 26, color: GOLD }}>{st.count}</span>
                        <span style={{ color: MUTED }}> / {st.capacity} 人</span>
                    </div>
                    <div style={{
                        fontSize: 11, fontWeight: 800, letterSpacing: 1,
                        color: st.isOpen ? '#fff' : GOLD,
                        background: st.isOpen ? GREEN : GOLD_BG,
                        border: st.isOpen ? 'none' : `1px solid ${GOLD}`,
                        borderRadius: 999, padding: '4px 12px',
                    }}>
                        {st.phase}{!st.isOpen && ` — あと${VILLAGE_META.openAt - st.count}人で開村`}
                    </div>
                </div>
                <div style={{ height: 8, background: PAPER, borderRadius: 999, marginTop: 12, overflow: 'hidden', border: `1px solid ${LINE}` }}>
                    <div style={{
                        height: '100%', width: `${Math.max(2, (st.count / st.capacity) * 100)}%`,
                        background: `linear-gradient(90deg, ${GOLD}, #E7C14B)`, borderRadius: 999,
                    }} />
                </div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 10, lineHeight: 1.9 }}>
                    {VILLAGE_META.note}
                </div>
            </div>

            {/* ===== 入村規約 ===== */}
            <div style={{
                border: `1px solid ${LINE}`, borderLeft: `4px solid ${GOLD}`, borderRadius: 12,
                background: '#fff', padding: '16px 20px', marginBottom: 34,
            }}>
                <div style={{ fontSize: 11, letterSpacing: 3, color: GOLD, fontWeight: 800, marginBottom: 8 }}>入村規約</div>
                <div style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{VILLAGE_META.law}</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: MUTED, lineHeight: 2.1 }}>
                    <li>入場料は、英語で言ってしまった最悪の一言を1体。実話に限る。</li>
                    <li>ハンドル名で構わない。掲載は本人の同意があるものだけ。削除依頼には即応じる。</li>
                    <li>寄贈された恥は英語動物園の該当館に収蔵され、寄贈者として村民番号が残る。</li>
                    <li>先着100人。10人で開村。満村になったら、この村は完成であり終了である。</li>
                </ul>
            </div>

            {/* ===== 村民名簿 ===== */}
            <div style={{ fontSize: 11, letterSpacing: 3, color: MUTED, fontWeight: 800, marginBottom: 14 }}>
                村民名簿 — REGISTRY
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {VILLAGERS.map((v) => (
                    <div key={v.no} style={{
                        border: `1px solid ${LINE}`, borderRadius: 16, background: '#fff',
                        padding: '20px 22px', position: 'relative', overflow: 'hidden',
                    }}>
                        {/* 村民番号 */}
                        <div style={{
                            position: 'absolute', top: 14, right: 18, fontFamily: SERIF,
                            fontSize: 30, fontWeight: 900, color: GOLD_BG,
                            WebkitTextStroke: `1.5px ${GOLD}`,
                        }}>
                            {String(v.no).padStart(3, '0')}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                            <div style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 800 }}>{v.handle}</div>
                            <div style={{ fontSize: 12, color: MUTED }}>{v.profile}</div>
                            <div style={{ fontSize: 11, color: MUTED }}>入村 {v.joined}</div>
                        </div>

                        {/* 寄贈された恥 */}
                        <div style={{
                            margin: '14px 0 10px', padding: '14px 18px', borderRadius: 12,
                            background: PAPER, border: `1px solid ${LINE}`,
                        }}>
                            <div style={{ fontSize: 10.5, letterSpacing: 2, color: GOLD, fontWeight: 800, marginBottom: 6 }}>
                                寄贈された恥 — 収蔵先: {HALL_LABELS[v.hall]}
                            </div>
                            <div style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 700, lineHeight: 1.6 }}>
                                “{v.worstLine}”
                            </div>
                        </div>

                        <div style={{ fontSize: 13.5, lineHeight: 2, marginBottom: 8 }}>{v.story}</div>
                        <div style={{ fontSize: 12.5, color: MUTED, marginBottom: 12 }}>
                            英語との今の関係 — {v.relation}
                        </div>

                        {/* 受領書 */}
                        <div style={{
                            borderTop: `1px dashed ${LINE}`, paddingTop: 10,
                            fontSize: 12.5, color: MUTED, lineHeight: 1.9,
                        }}>
                            <span style={{ color: GOLD, fontWeight: 800, marginRight: 6 }}>受領書(とにお)</span>
                            {v.receipt}
                        </div>
                    </div>
                ))}

                {/* 空き区画 */}
                <div style={{
                    border: `1.5px dashed ${LINE}`, borderRadius: 16, padding: '26px 22px',
                    textAlign: 'center', color: MUTED, fontSize: 13, lineHeight: 2.2, background: PAPER,
                }}>
                    <div style={{ fontFamily: SERIF, fontSize: 18, color: INK, fontWeight: 700, marginBottom: 4 }}>
                        残り {st.remaining} 区画
                    </div>
                    募集はnoteで告知する。恥を1体、用意して待っていてほしい。<br />
                    <span style={{ fontSize: 12 }}>
                        収蔵先の見学は
                        <Link href="/english/ridgeway" style={{ color: GOLD, fontWeight: 700, margin: '0 4px' }}>
                            TONIO TOWN 町民名鑑
                        </Link>
                        から(村民の恥が届く世界)。
                    </span>
                </div>
            </div>
            <WorldMapButton />
        </div>
    );
}
