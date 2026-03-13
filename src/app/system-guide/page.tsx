'use client'

import { motion } from 'framer-motion'
import Header from '@/components/lp/Header'
import Footer from '@/components/lp/Footer'
import { Section, Label, GoldLabel, H2, P, Accent, Code, Feature, Stat, f, PageHeader } from '@/components/lp/shared'

export default function SystemGuidePage() {
    return (
        <div className="min-h-screen bg-white text-[#252423]">
            <Header />
            <PageHeader label="SYSTEM" title="カード進化、エレメント、レベルシステム。全部の仕組み。" />

            {/* ━━━ CARD EVOLUTION & RANKS ━━━ */}
            <div id="cards" className="scroll-mt-20" />
            <Section bg="bg-[#F5F5F7]">
                <GoldLabel>CARD EVOLUTION & RANKS</GoldLabel>
                <H2>フレーズは「育てる」もの。</H2>

                <P>1つのフレーズ = 1枚のカード。7段階の進化（SEED → HATCH → ROOKIE → FIGHTER → CHAMPION → ELITE → MASTER）。合計100XPで完全進化。</P>

                <motion.p variants={f} className="text-xs text-[#D4AF37] tracking-widest font-bold mb-4 mt-8">CHAKRA EVOLUTION</motion.p>
                <motion.div variants={f} className="space-y-0 mb-8">
                    {[
                        { stage: 0, lv: 1, name: 'SEED', ja: '種', color: '#B91C1C', xp: '5XP', desc: '登録しただけ。まだ知らない。' },
                        { stage: 1, lv: 2, name: 'HATCH', ja: '孵化', color: '#C2410C', xp: '5XP', desc: '初回レビュー。存在を認識した。' },
                        { stage: 2, lv: 3, name: 'ROOKIE', ja: 'ルーキー', color: '#A16207', xp: '10XP', desc: '記憶に定着し始めた。' },
                        { stage: 3, lv: 4, name: 'FIGHTER', ja: 'ファイター', color: '#166534', xp: '15XP', desc: '考えなくても出てくる。' },
                        { stage: 4, lv: 5, name: 'CHAMPION', ja: 'チャンピオン', color: '#1E40AF', xp: '20XP', desc: 'ボイスレコーディング達成。' },
                        { stage: 5, lv: 6, name: 'ELITE', ja: 'エリート', color: '#3730A3', xp: '20XP', desc: 'コンテキストリンク追加済み。' },
                        { stage: 6, lv: 7, name: 'MASTER', ja: 'マスター', color: '#6B21A8', xp: '30XP', desc: '完全習得。宣言が必要。' },
                    ].map((row) => (
                        <div key={row.stage} className="flex items-center gap-2 py-2.5 border-b border-[#DAE2E8] last:border-0">
                            <span className="font-mono text-[#252423]/30 w-16 shrink-0 text-xs">Stage {row.stage} Lv.{row.lv}</span>
                            <span className="font-black w-24 shrink-0 text-sm">{row.name}</span>
                            <span className="text-[#252423]/30 w-10 shrink-0 text-xs">{row.ja}</span>
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                            <span className="font-mono text-[#D4AF37] w-14 shrink-0 text-xs">{row.xp}</span>
                            <span className="text-[11px] text-[#252423]/50">{row.desc}</span>
                        </div>
                    ))}
                </motion.div>

                <P>同日ゲート: lastLeveledマップで「同じ日に同じフレーズを2回レベルアップさせない」。1日1レベルまで。毎日来る理由。</P>

                <motion.p variants={f} className="text-xs text-gray-400 tracking-widest font-bold mb-4 mt-10">CARD RANKS</motion.p>

                <P>ランク（見た目の希少度）はGP蓄積で決まる。進化（英語力）とは完全に独立。</P>

                <motion.div variants={f} className="space-y-0 mb-8">
                    {[
                        { name: 'NORMAL', gp: '0-4GP', desc: 'グレーのフラットフレーム。グロウなし。' },
                        { name: 'BRONZE', gp: '5+GP', desc: '銅のグラデーション。subtle glow。' },
                        { name: 'SILVER', gp: '20+GP', desc: 'シルバーグラデーション。シマーインセット。' },
                        { name: 'GOLD', gp: '50+GP', desc: 'ゴールドグラデーション。warm glow。' },
                        { name: 'HOLOGRAPHIC', gp: '100+GP', desc: 'パープル/プリズム。マルチカラーグロウ。レインボーオーバーレイ。' },
                        { name: 'LEGENDARY', gp: '250+GP', desc: 'ダークコズミック+ゴールド。ヘビーシャドウ。オーラアニメーション。' },
                    ].map((row) => (
                        <div key={row.name} className="flex items-center gap-2 py-2.5 border-b border-[#DAE2E8] last:border-0">
                            <span className="font-black w-28 shrink-0 text-sm">{row.name}</span>
                            <span className="font-mono text-[#D4AF37] w-16 shrink-0 text-xs">{row.gp}</span>
                            <span className="text-[11px] text-[#252423]/50">{row.desc}</span>
                        </div>
                    ))}
                </motion.div>

                <Feature title="3Dティルトエフェクト" sub="CARD TILT">
                    <P>perspective: 800px。NORMAL(6deg) → BRONZE(8deg) → SILVER(10deg) → GOLD(14deg) → HOLOGRAPHIC(18deg) → LEGENDARY(22deg)。</P>
                </Feature>

                <Feature title="BSTティアシステム" sub="BASE STAT TOTAL TIERS">
                    <motion.div variants={f} className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                        {[
                            { name: 'HP', label: '汎用度' },
                            { name: 'ATK', label: '衝撃度' },
                            { name: 'DEF', label: '安定度' },
                            { name: 'SPA', label: '表現力' },
                            { name: 'SPD', label: '理解度' },
                            { name: 'SPE', label: '反射度' },
                        ].map((stat) => (
                            <div key={stat.name} className="bg-[#F5F5F7] border border-[#DAE2E8] p-3">
                                <p className="font-black text-sm">{stat.name}</p>
                                <p className="text-[11px] text-[#252423]/50">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div variants={f} className="space-y-0 mb-8">
                        {[
                            { tier: 'S', range: '600+', label: '600族', color: '#D4AF37', pct: '0.5%' },
                            { tier: 'A', range: '530-599', label: 'エース', color: '#A855F7', pct: '10%' },
                            { tier: 'B', range: '470-529', label: '主力', color: '#3B82F6', pct: '30%' },
                            { tier: 'C', range: '400-469', label: '標準', color: '#10B981', pct: '41%' },
                            { tier: 'D', range: '330-399', label: 'ルーキー', color: '#78716C', pct: '17%' },
                            { tier: 'F', range: '0-329', label: 'コイキング', color: '#EF4444', pct: '2%' },
                        ].map((row) => (
                            <div key={row.tier} className="flex items-center gap-2 py-2.5 border-b border-[#DAE2E8] last:border-0">
                                <span className="font-black w-6 shrink-0 text-sm" style={{ color: row.color }}>{row.tier}</span>
                                <span className="font-mono text-[#252423]/40 w-20 shrink-0 text-xs">{row.range}</span>
                                <span className="text-sm w-20 shrink-0">{row.label}</span>
                                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                                <span className="font-mono text-[#252423]/30 text-xs">{row.pct}</span>
                            </div>
                        ))}
                    </motion.div>

                    <P>IDのnanoidから決定論的に計算。永遠に変わらない。コイキングは逆にレア。</P>
                </Feature>
            </Section>

            {/* ━━━ ELEMENT SYSTEM ━━━ */}
            <div id="elements" className="scroll-mt-20" />
            <Section bg="bg-white">
                <GoldLabel>ELEMENT SYSTEM</GoldLabel>
                <H2>火 &gt; 風 &gt; 地 &gt; 雷 &gt; 水 &gt; 火。</H2>

                <P>5つのエレメントが循環する。相性有利で+25%ダメージ。</P>

                <motion.div variants={f} className="space-y-0 mb-8">
                    {[
                        { en: 'Flame', ja: '火', color: '#EF4444', desc: '熱い表現。強い主張。感情的なフレーズ。' },
                        { en: 'Wind', ja: '風', color: '#10B981', desc: '軽い表現。フィラー。つなぎ言葉。' },
                        { en: 'Earth', ja: '地', color: '#A16207', desc: '堅い表現。基礎単語。安定感。' },
                        { en: 'Thunder', ja: '雷', color: '#EAB308', desc: 'インパクト。スラング。驚き表現。' },
                        { en: 'Aqua', ja: '水', color: '#3B82F6', desc: '流れる表現。接続詞。丁寧な言い回し。' },
                    ].map((row) => (
                        <div key={row.en} className="flex items-center gap-2 py-2.5 border-b border-[#DAE2E8] last:border-0">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                            <span className="font-black w-16 shrink-0 text-sm">{row.en}</span>
                            <span className="text-[#252423]/30 w-6 shrink-0 text-xs">{row.ja}</span>
                            <span className="text-[11px] text-[#252423]/50">{row.desc}</span>
                        </div>
                    ))}
                </motion.div>

                <P>RAINBOWシナジー(全5属性揃い)はx2.0倍。</P>
            </Section>

            {/* ━━━ DAILY LEVEL SYSTEM ━━━ */}
            <div id="daily" className="scroll-mt-20" />
            <Section bg="bg-[#F5F5F7]">
                <GoldLabel>DAILY LEVEL SYSTEM</GoldLabel>
                <H2>毎日リセット。毎日やり直し。</H2>

                <motion.div variants={f} className="space-y-0 mb-8">
                    {[
                        { lv: 1, xp: '0XP', name: '寝起き', desc: 'ボーナスなし。' },
                        { lv: 2, xp: '4XP', name: '起動', desc: 'ガチャアニメーションランダム化ON。' },
                        { lv: 3, xp: '28XP', name: '準備OK', desc: 'Card XP +10%。' },
                        { lv: 4, xp: '72XP', name: 'エンジン全開', desc: 'Card XP +20%。' },
                        { lv: 5, xp: '167XP', name: 'ゾーン', desc: 'Card XP +30%。進化アニメーション豪華。' },
                        { lv: 6, xp: '351XP', name: '無双', desc: 'Card XP +50%。ラックブースト。' },
                        { lv: 7, xp: '588XP', name: '覚醒', desc: 'GP x1.5。' },
                        { lv: 8, xp: '873XP', name: '鬼神', desc: 'GP x2。全アニメーション最大。' },
                        { lv: 9, xp: '1,310XP', name: '本日の神', desc: '全ボーナスMAX。翼が生える。' },
                    ].map((row) => (
                        <div key={row.lv} className="flex items-center gap-2 py-2.5 border-b border-[#DAE2E8] last:border-0">
                            <span className="font-mono text-[#D4AF37] w-10 shrink-0 text-xs">Lv.{row.lv}</span>
                            <span className="font-mono text-[#252423]/40 w-16 shrink-0 text-xs">{row.xp}</span>
                            <span className="font-bold w-20 shrink-0 text-sm">{row.name}</span>
                            <span className="text-[11px] text-[#252423]/50">{row.desc}</span>
                        </div>
                    ))}
                </motion.div>

                <P>本日の神到達に約80-120回レビュー、2-3時間の集中レビュー。</P>
            </Section>

            {/* ━━━ PLAYER LEVEL ━━━ */}
            <div id="player" className="scroll-mt-20" />
            <Section bg="bg-white">
                <GoldLabel>PLAYER LEVEL</GoldLabel>
                <H2>Lv.100 = 英語の神。</H2>

                <motion.div variants={f} className="space-y-0 mb-8">
                    {[
                        { range: '1-5', ja: '新人トレーナー', en: 'Rookie' },
                        { range: '6-15', ja: 'コレクター', en: 'Collector' },
                        { range: '16-30', ja: 'バトラー', en: 'Battler' },
                        { range: '31-50', ja: 'エキスパート', en: 'Expert' },
                        { range: '51-70', ja: 'エリート', en: 'Elite' },
                        { range: '71-89', ja: 'チャンピオン', en: 'Champion' },
                        { range: '90-99', ja: 'レジェンド', en: 'Legend' },
                        { range: '100', ja: '英会話マスター', en: 'Master' },
                    ].map((row) => (
                        <div key={row.range} className="flex items-center gap-2 py-2.5 border-b border-[#DAE2E8] last:border-0">
                            <span className="font-mono text-[#D4AF37] w-14 shrink-0 text-xs">Lv.{row.range}</span>
                            <span className="font-bold w-28 shrink-0 text-sm">{row.ja}</span>
                            <span className="text-[11px] text-[#252423]/50">{row.en}</span>
                        </div>
                    ))}
                </motion.div>

                <P>XP計算式: 13 * Lv^2.3。</P>

                <P>5つの冒険地方 (ヒヨコ地方 Lv.1-15 etc.)</P>

                <motion.p variants={f} className="text-xs text-[#D4AF37] tracking-widest font-bold mb-4 mt-8">WORLD MAP</motion.p>
                <motion.div variants={f} className="space-y-0 mb-8">
                    {[
                        { city: 'Tokyo', scenario: 'College Party Recap', badge: '火のバッジ', color: '#EF4444' },
                        { city: 'Los Angeles', scenario: 'Monster Under the Bed', badge: '幽霊バッジ', color: '#8B5CF6' },
                        { city: 'Seattle', scenario: 'Mariners Trade Talk', badge: '野球バッジ', color: '#3B82F6' },
                        { city: 'New York', scenario: 'First Movie Without Parents', badge: '映画バッジ', color: '#F97316' },
                        { city: 'London', scenario: 'Game Night Gone Wrong', badge: 'サイコロバッジ', color: '#10B981' },
                        { city: 'Paris', scenario: 'Antiques House Call', badge: '王冠バッジ', color: '#D4AF37' },
                    ].map((row) => (
                        <div key={row.city} className="flex items-center gap-2 py-2.5 border-b border-[#DAE2E8] last:border-0">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
                            <span className="font-bold w-24 shrink-0 text-sm">{row.city}</span>
                            <span className="text-xs text-[#252423]/60 w-48 shrink-0">{row.scenario}</span>
                            <span className="text-[11px] text-[#252423]/40">{row.badge}</span>
                        </div>
                    ))}
                </motion.div>

                <P>D3-zoomのインタラクティブ地図。SVGドットマトリクス。</P>
            </Section>

            {/* ━━━ SOUND SYSTEM ━━━ */}
            <div id="sound" className="scroll-mt-20" />
            <Section bg="bg-[#F5F5F7]">
                <GoldLabel>SOUND SYSTEM</GoldLabel>
                <H2>全部WebAudioで鳴る。外部ファイルはBGMの1つだけ。</H2>

                <P>16以上のSFX関数。全てOscillatorNode。</P>

                <motion.p variants={f} className="text-xs text-[#D4AF37] tracking-widest font-bold mb-4 mt-8">LEVEL-UP FREQUENCIES</motion.p>
                <motion.div variants={f} className="space-y-2 mb-8">
                    {[
                        { lv: 0, freq: '220Hz single tone', dur: '0.2s', wave: 'triangle' },
                        { lv: 1, freq: '330/440Hz duet', dur: '0.25s', wave: '' },
                        { lv: 2, freq: '392/494/587Hz triad', dur: '0.3s', wave: '' },
                        { lv: 3, freq: '523/659/784Hz chord', dur: '0.4s', wave: 'sine' },
                        { lv: 4, freq: '587/740/880/1109Hz', dur: '0.5s', wave: 'VOICE' },
                        { lv: 5, freq: '659/831/988/1245/1480Hz', dur: '0.6s', wave: '' },
                        { lv: 6, freq: '440/554/659/880/1109/1319/1760Hz', dur: '0.9s', wave: 'MASTER fanfare' },
                    ].map((row) => (
                        <Code key={row.lv}>
                            <span className="text-[#D4AF37] font-bold">Lv.{row.lv}</span>{' '}
                            <span className="text-[#252423]/80">{row.freq}</span>{' '}
                            <span className="text-[#252423]/40">{row.dur}</span>
                            {row.wave && <span className="text-[#252423]/30"> {row.wave}</span>}
                        </Code>
                    ))}
                </motion.div>

                <motion.p variants={f} className="text-xs text-[#D4AF37] tracking-widest font-bold mb-4 mt-8">ELEMENT SPELL SOUNDS</motion.p>
                <motion.div variants={f} className="space-y-2 mb-8">
                    {[
                        { element: 'Flame', color: '#EF4444', sound: '300Hz sawtooth' },
                        { element: 'Aqua', color: '#3B82F6', sound: '600→800Hz sine sweep' },
                        { element: 'Thunder', color: '#EAB308', sound: '100Hz square + noise' },
                        { element: 'Wind', color: '#10B981', sound: '500Hz triangle + whoosh' },
                        { element: 'Earth', color: '#A16207', sound: '80Hz square + resonance' },
                    ].map((row) => (
                        <Code key={row.element}>
                            <span className="font-bold" style={{ color: row.color }}>{row.element}</span>{' '}
                            <span className="text-[#252423]/60">{row.sound}</span>
                        </Code>
                    ))}
                </motion.div>

                <P>MYTHICの聖歌隊。SHINYのプリズマティック。PHANTOMの逆リバーブ。</P>
            </Section>

            <Footer />
        </div>
    )
}
