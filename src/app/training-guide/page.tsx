'use client'

import { motion } from 'framer-motion'
import Header from '@/components/lp/Header'
import Footer from '@/components/lp/Footer'
import { Section, Label, GoldLabel, H2, P, Accent, Code, Feature, PageHeader, f } from '@/components/lp/shared'

export default function TrainingGuidePage() {
    return (
        <div className="min-h-screen bg-white text-[#252423]">
            <Header />
            <PageHeader label="TRAINING" title="スロットマシンでレビュー。パズルバトルで育成。" />

            {/* ━━━ SLOT MACHINE ━━━ */}
            <div id="slot" className="scroll-mt-20" />
            <Section bg="bg-[#F5F5F7]">
                <GoldLabel>SLOT MACHINE</GoldLabel>
                <H2>3リール。9段階 + 3ウルトラレア。</H2>
                <P>Trainingページはこのアプリの中核。カレンダーから日を選んでフレーズをレビューすると、3リールのスロットマシンが回る。結果は9段階 + 3ウルトラレア。MISS, BONUS, GREAT, SUPER, MEGA, LEGENDARY, MYTHIC, SHINY, PHANTOM。PHANTOMの確率は1/8192。ポケモンの色違いと同じ。</P>

                <motion.p variants={f} className="text-xs text-[#D4AF37] tracking-widest font-bold mb-4 mt-8">GACHA PROBABILITY TABLE</motion.p>

                <motion.div variants={f} className="space-y-0 mb-8">
                    {[
                        { tier: 'MISS', prob: '50.0%', sp: '0 SP', gp: '0 GP', desc: 'ハズレ。でも+1XPは入る。ゼロは存在しない。' },
                        { tier: 'BONUS', prob: '25.0%', sp: '+3 SP', gp: '+2 GP', desc: 'grape x3。最低ライン。音はシンプルなチャイム。' },
                        { tier: 'GREAT', prob: '15.0%', sp: '+10 SP', gp: '+5 GP', desc: 'bell x3。8パーティクル、2.2秒の演出。' },
                        { tier: 'SUPER', prob: '7.0%', sp: '+20 SP', gp: '+10 GP', desc: 'bar x3。16パーティクル、3.2秒。テキストが大きくなる。' },
                        { tier: 'MEGA', prob: '2.5%', sp: '+50 SP', gp: '+25 GP', desc: 'seven-red x3。40パーティクル、6秒。放射状の光線。' },
                        { tier: 'LEGENDARY', prob: '0.5%', sp: '+100 SP', gp: '+50 GP', desc: 'seven-gold x3。60パーティクル、8.5秒。画面が暗転してフラッシュ。' },
                        { tier: 'MYTHIC', prob: '---', sp: '+200 SP', gp: '+75 GP', desc: 'god x3。80パーティクル、10秒。ピンクのハートが20個降ってくる。' },
                        { tier: 'SHINY', prob: '---', sp: '+350 SP', gp: '+100 GP', desc: 'rainbow x3。120パーティクル、13秒。プリズマティックな色変化オーバーレイ。' },
                        { tier: 'PHANTOM', prob: '1/8192', sp: '+500 SP', gp: '+150 GP', desc: 'ghost x3。150パーティクル、15秒。画面ホワイトアウト+逆転エフェクト。' },
                    ].map((row) => (
                        <div key={row.tier} className="flex items-baseline gap-2 py-2 border-b border-[#DAE2E8] last:border-0">
                            <span className="font-black w-24 shrink-0 text-sm">{row.tier}</span>
                            <span className="font-mono text-[#D4AF37] w-12 shrink-0 text-xs">{row.prob}</span>
                            <span className="font-mono text-[#252423]/40 w-14 shrink-0 text-xs">{row.sp}</span>
                            <span className="font-mono text-[#252423]/40 w-12 shrink-0 text-xs">{row.gp}</span>
                            <span className="text-[11px] text-[#252423]/50">{row.desc}</span>
                        </div>
                    ))}
                </motion.div>

                <Accent>PHANTOMの確率 1/8192 はポケモンの色違いと同じ。意図的にこの数字にした。</Accent>

                <motion.p variants={f} className="text-xs text-gray-400 tracking-widest font-bold mb-3 mt-8">SLOT SYMBOLS</motion.p>
                <Code>
                    seven-gold (金7)  seven-red (赤7)  bar (BAR)<br />
                    bell (鈴)  grape (星)  cherry (桜)  blank (x)<br />
                    god (神)  rainbow (虹)  ghost (幻) -- ULTRA RARE ONLY
                </Code>

                <Feature title="リーチ演出" sub="REACH MECHANICS">
                    <P>リール1は800msで停止。リール2は1400msで停止。2つ一致でリーチ発動。</P>
                    <P>リール3の回転速度はティアで変わる。通常180ms/symbol。MEGA以上280ms。ウルトラレア400ms。</P>
                    <P>ターゲットシンボルが約20%でチラ見え。パチンコの「チラリズム」。</P>
                </Feature>

                <Feature title="天井システム" sub="PITY COUNTER">
                    <P>200回レビューでLEGENDARY確定。</P>
                    <P>HPバースタイル: パープル → オレンジ → レッド。</P>
                    <P>期待値: 1回あたり平均SP約3.5。天井含めた長期期待値約4.2SP/回。</P>
                </Feature>

                <P>連荘チェーンシステム: 3連で確変x1.5、5連で激熱x2、10連で神モードx3。MISSで即リセット。フィーバー中は専用ドローンBGM。</P>
            </Section>

            {/* ━━━ PUZZLE BATTLE ━━━ */}
            <div id="battle" className="scroll-mt-20" />
            <Section>
                <Label>PUZZLE BATTLE</Label>
                <H2>10体のボス。シナジーで倒す。</H2>
                <P>カードをパズルボード(3x3 or 4x4)に配置 → ボスとバトル。日替わりボス。</P>

                <motion.p variants={f} className="text-xs text-[#D4AF37] tracking-widest font-bold mb-4 mt-8">DAILY BOSS ROSTER</motion.p>

                <motion.div variants={f} className="space-y-0 mb-8">
                    {[
                        { ja: '朱雀', en: 'Red Phoenix', element: 'Flame', skill: 'Water Seal' },
                        { ja: '玄武', en: 'Black Turtle', element: 'Aqua', skill: 'Fire Seal' },
                        { ja: '白虎', en: 'White Tiger', element: 'Wind', skill: 'Earth Seal' },
                        { ja: '青龍', en: 'Blue Dragon', element: 'Thunder', skill: 'Wind Seal' },
                        { ja: '麒麟', en: 'Qilin', element: 'Earth', skill: 'Thunder Seal' },
                        { ja: '鬼', en: 'Oni Demon', element: 'Flame', skill: 'ランクフロア -- BRONZE以下BST 50%ダウン' },
                        { ja: '天狗', en: 'Tengu', element: 'Wind', skill: 'ウィーケン -- 全カードBST -20%' },
                        { ja: '河童', en: 'Kappa', element: 'Aqua', skill: 'シナジーシール -- エレメントボーナス全無効' },
                        { ja: '龍王', en: 'Dragon King', element: 'Thunder', skill: 'エクストリームHP -- ベースHP 5,500' },
                        { ja: '大蛇', en: 'Hydra', element: 'Earth', skill: 'カオス -- シナジー全無効、純粋火力勝負' },
                    ].map((row) => (
                        <div key={row.ja} className="flex items-baseline gap-2 py-2 border-b border-[#DAE2E8] last:border-0">
                            <span className="font-black w-10 shrink-0 text-sm">{row.ja}</span>
                            <span className="text-[#252423]/30 w-24 shrink-0 text-xs">{row.en}</span>
                            <span className="text-[#D4AF37] font-mono w-16 shrink-0 text-xs">{row.element}</span>
                            <span className="text-[11px] text-[#252423]/50">{row.skill}</span>
                        </div>
                    ))}
                </motion.div>

                <Feature title="シナジー倍率" sub="SYNERGY MULTIPLIERS">
                    <motion.div variants={f} className="space-y-0 mb-4">
                        {[
                            { name: 'RAINBOW', mult: 'x2.0' },
                            { name: 'ELEMENTAL FORCE', mult: 'x1.6' },
                            { name: 'DUAL CORE', mult: 'x1.3' },
                            { name: 'TRIANGLE', mult: 'x1.4' },
                            { name: 'KILL CHAIN', mult: 'x1.3' },
                            { name: 'LEGEND', mult: 'x1.5' },
                            { name: 'ELITE SQUAD', mult: 'x1.0-1.8' },
                            { name: 'UNIFORM', mult: 'x1.2' },
                            { name: 'S-TIER ARMY', mult: 'x1.25-2.0' },
                            { name: 'POWER HOUSE', mult: 'x1.3' },
                            { name: 'SP SURGE', mult: 'x1.0-1.8' },
                        ].map((s) => (
                            <div key={s.name} className="flex items-baseline gap-3 py-1.5 border-b border-[#DAE2E8] last:border-0">
                                <span className="font-bold text-xs w-32 shrink-0">{s.name}</span>
                                <span className="font-mono text-[#D4AF37] text-xs">{s.mult}</span>
                            </div>
                        ))}
                    </motion.div>
                    <P>ダメージ計算: 配置カードの合計BST x シナジー倍率 x エレメント相性。グレード判定で最終評価。</P>
                </Feature>

                <Feature title="バトル演出" sub="BATTLE SEQUENCE">
                    <P>ワイプイン → ボス登場 → カードアタック → ラッシュモード → フィニッシャー → シナジー判定 → グレード発表。</P>
                </Feature>

                <Feature title="グレード判定" sub="GRADE SCORING">
                    <P>S: 3.0x+, A: 2.0-2.99x, B: 1.5-1.99x, C: 1.2-1.49x, D: {'<'}1.2x。</P>
                </Feature>
            </Section>

            {/* ━━━ MARIO RUNNER ━━━ */}
            <div id="runner" className="scroll-mt-20" />
            <Section bg="bg-[#F5F5F7]">
                <GoldLabel>MARIO RUNNER</GoldLabel>
                <H2>空が変わる。敵が変わる。翼が生える。</H2>

                <motion.p variants={f} className="text-xs text-[#D4AF37] tracking-widest font-bold mb-4 mt-8">SKY PHASES</motion.p>

                <motion.div variants={f} className="space-y-0 mb-8">
                    {[
                        { range: '0-10%', name: '紫の夜明け' },
                        { range: '10-30%', name: '青い朝' },
                        { range: '30-60%', name: '晴天' },
                        { range: '60-85%', name: '黄金の午後' },
                        { range: '85-100%', name: '紅の夕暮れ' },
                        { range: '100%+', name: '夜+オーロラ' },
                        { range: 'GOD', name: '本日の神' },
                    ].map((phase) => (
                        <div key={phase.range} className="flex items-baseline gap-3 py-2 border-b border-[#DAE2E8] last:border-0">
                            <span className="font-mono text-[#D4AF37] w-16 shrink-0 text-xs">{phase.range}</span>
                            <span className="text-sm font-bold">{phase.name}</span>
                        </div>
                    ))}
                </motion.div>

                <motion.p variants={f} className="text-xs text-gray-400 tracking-widest font-bold mb-4 mt-8">ENEMY TIERS</motion.p>

                <motion.div variants={f} className="space-y-0 mb-8">
                    {[
                        { name: 'Slime', color: '#4ADE80' },
                        { name: 'Wolf', color: '#60A5FA' },
                        { name: 'Dragon', color: '#F87171' },
                        { name: 'Demon', color: '#A78BFA' },
                    ].map((enemy) => (
                        <div key={enemy.name} className="flex items-center gap-3 py-2 border-b border-[#DAE2E8] last:border-0">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: enemy.color }} />
                            <span className="text-sm font-bold">{enemy.name}</span>
                        </div>
                    ))}
                </motion.div>

                <motion.p variants={f} className="text-xs text-gray-400 tracking-widest font-bold mb-4 mt-8">REACTION GACHA</motion.p>

                <motion.div variants={f} className="space-y-0 mb-8">
                    {[
                        { tier: 'Normal', prob: '55%' },
                        { tier: 'Rare', prob: '25%' },
                        { tier: 'Super', prob: '12%' },
                        { tier: 'Epic', prob: '6%' },
                        { tier: 'Legend', prob: '2%' },
                    ].map((r) => (
                        <div key={r.tier} className="flex items-baseline gap-3 py-1.5 border-b border-[#DAE2E8] last:border-0">
                            <span className="font-bold text-xs w-16 shrink-0">{r.tier}</span>
                            <span className="font-mono text-[#D4AF37] text-xs">{r.prob}</span>
                        </div>
                    ))}
                </motion.div>

                <P>GODモード: 全フレーズレビュー完了で発動。空が割れて神殿が出現。キャラが翼を広げて飛翔。パーティクル200個。15秒の演出。1日1回限定。</P>

                <Feature title="パララックスレイヤー" sub="PARALLAX LAYERS">
                    <P>全レイヤーSVG。背景の空、雲、山、地面、前景の草。それぞれ異なる速度でスクロール。キャラクターは固定位置で走り続ける。</P>
                </Feature>
            </Section>

            {/* ━━━ CHAIN / FEVER ━━━ */}
            <div id="chain" className="scroll-mt-20" />
            <Section>
                <Label>CHAIN / FEVER</Label>
                <H2>連荘。パチンコの魔法。</H2>

                <motion.div variants={f} className="space-y-0 mb-8 mt-6">
                    {[
                        { range: '0-2', name: '通常', color: '#78716C', mult: 'x1.0' },
                        { range: '3-4', name: '確変', color: '#D4AF37', mult: 'x1.5' },
                        { range: '5-9', name: '激熱', color: '#DC2626', mult: 'x2.0' },
                        { range: '10+', name: '神', color: '#7C3AED', mult: 'x3.0' },
                    ].map((mode) => (
                        <div key={mode.range} className="flex items-center gap-3 py-2 border-b border-[#DAE2E8] last:border-0">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: mode.color }} />
                            <span className="font-mono text-xs w-10 shrink-0">{mode.range}</span>
                            <span className="font-bold text-sm w-12 shrink-0">{mode.name}</span>
                            <span className="font-mono text-[#D4AF37] text-xs">{mode.mult}</span>
                        </div>
                    ))}
                </motion.div>

                <P>MISS即リセット。フィーバー中は専用ドローンBGM。確変突入で画面の色温度が変わる。激熱で画面が揺れる。神モードで背景が宇宙になる。</P>
            </Section>

            {/* ━━━ COLLECTION ━━━ */}
            <div id="collection" className="scroll-mt-20" />
            <Section bg="bg-[#F5F5F7]">
                <GoldLabel>COLLECTION</GoldLabel>
                <H2>ポケモン図鑑。3Dカード。ホログラフィック。</H2>

                <Feature title="3Dティルト" sub="CARD TILT">
                    <motion.div variants={f} className="space-y-0 mb-4">
                        {[
                            { rank: 'NORMAL', angle: '6deg' },
                            { rank: 'RARE', angle: '10deg' },
                            { rank: 'SUPER RARE', angle: '14deg' },
                            { rank: 'EPIC', angle: '18deg' },
                            { rank: 'LEGENDARY', angle: '22deg' },
                        ].map((t) => (
                            <div key={t.rank} className="flex items-baseline gap-3 py-1.5 border-b border-[#DAE2E8] last:border-0">
                                <span className="font-bold text-xs w-24 shrink-0">{t.rank}</span>
                                <span className="font-mono text-[#D4AF37] text-xs">{t.angle}</span>
                            </div>
                        ))}
                    </motion.div>
                    <P>マウスの位置に応じてカードが傾く。ランクが上がるほど最大傾斜角が大きくなる。</P>
                </Feature>

                <Feature title="ビジュアルエフェクト" sub="VISUAL FX PER RANK">
                    <P>NORMAL: なし。RARE: 光沢シフト。SUPER RARE: レインボーグラデーション。EPIC: パーティクル + グロー。LEGENDARY: ホログラフィック + フレア + 常時パーティクル。</P>
                </Feature>

                <Feature title="BST ティア" sub="BASE STAT TOTAL">
                    <motion.div variants={f} className="space-y-0 mb-4">
                        {[
                            { tier: 'S', range: '500+' },
                            { tier: 'A', range: '400-499' },
                            { tier: 'B', range: '300-399' },
                            { tier: 'C', range: '200-299' },
                            { tier: 'D', range: '100-199' },
                            { tier: 'F', range: '0-99' },
                        ].map((b) => (
                            <div key={b.tier} className="flex items-baseline gap-3 py-1.5 border-b border-[#DAE2E8] last:border-0">
                                <span className="font-black text-sm w-8 shrink-0">{b.tier}</span>
                                <span className="font-mono text-[#252423]/50 text-xs">{b.range}</span>
                            </div>
                        ))}
                    </motion.div>
                </Feature>
            </Section>

            {/* ━━━ ARENA ━━━ */}
            <div id="arena" className="scroll-mt-20" />
            <Section>
                <Label>ARENA</Label>
                <H2>制限時間内に答えろ。</H2>

                <P>10問出題。制限時間あり -- Easy 5秒、Normal 3.5秒、Hard 2.5秒。</P>
                <P>4問題タイプ: meaning(意味), reverse(逆引き), fill(穴埋め), listen(リスニング)。最後の1問はボス。</P>
                <P>5連続正解でフィーバー。フィーバー中は制限時間+1秒、スコア倍率x2。</P>
                <P>ランクS-F。全部WebAudioの合成音。UIサウンドは全てブラウザ内で生成。外部音声ファイルなし。</P>
            </Section>

            <Footer />
        </div>
    )
}
