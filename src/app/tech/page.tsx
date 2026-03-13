'use client'

import { motion } from 'framer-motion'
import { Section, Label, GoldLabel, H2, P, Accent, Code, Feature, Stat, f, PageHeader } from '@/components/lp/shared'
import Header from '@/components/lp/Header'
import Footer from '@/components/lp/Footer'

export default function TechPage() {
    return (
        <div className="min-h-screen bg-white text-[#252423]">
            <Header />
            <PageHeader label="TECHNOLOGY" title="サーバーレス。データベースレス。オフラインファースト。" />

            <Section bg="bg-[#F5F5F7]">
                <GoldLabel>ARCHITECTURE</GoldLabel>
                <H2>バックエンドはない。全部ブラウザの中。</H2>
                <P>バックエンドはない。データベースもない。全てのゲームデータはlocalStorage（ブラウザのローカルストレージ）に保存される。カードの進化レベル、GPの蓄積、プレイヤーレベル、レビュー記録、ボイスレコーディング、コンテキストリンク。全部クライアントサイド。</P>

                <motion.div variants={f} className="mb-8">
                    <p className="text-xs text-gray-400 tracking-widest font-bold mb-3">TECHNOLOGY STACK</p>
                    <div className="space-y-0">
                        {[
                            ['Framework', 'Next.js 15 (App Router)', 'React 19 + Turbopack'],
                            ['Styling', 'Tailwind CSS v4', 'Inline styles (CSS Modules zero)'],
                            ['Animation', 'framer-motion + CSS', '40+ custom animations'],
                            ['Map', 'D3-zoom + topoJSON', 'Natural Earth 50m, SVG rendering'],
                            ['Audio', 'Web Audio API', '16+ SFX functions, OscillatorNode'],
                            ['TTS', 'Web Speech API', '0.9x speed + Voice Lab analysis'],
                            ['Storage', 'localStorage', '230+ keys for game state'],
                            ['Deploy', 'Cloudflare Workers', '3MiB limit (current: 2,966KiB)'],
                            ['DB (Content)', 'Cloudflare D1', 'Goroku + phrase data (REST API)'],
                            ['Icons', 'Lucide React', 'Minimal external images'],
                        ].map(([cat, tech, note]) => (
                            <div key={cat} className="flex gap-3 py-2 border-b border-[#DAE2E8]">
                                <span className="text-xs font-bold w-24 shrink-0">{cat}</span>
                                <span className="text-xs text-[#252423]/70 w-44 shrink-0">{tech}</span>
                                <span className="text-[10px] text-[#252423]/40 flex-1">{note}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <Accent>Training page (page.tsx) alone is 7,081 lines. PuzzleBoard.tsx is 79KB. A single page has the complexity of an entire application.</Accent>
            </Section>

            <Section>
                <Label>WHY SERVERLESS</Label>
                <H2>月額0円。オフライン動作。プライバシー完全保護。</H2>
                <P>(1) Cloudflare Workersの無料枠（3MiB）に収まる。月額0円。(2) オフラインで動く。WiFiがなくてもレビューできる。(3) ユーザーデータが外に出ない。録音データもリンクも全部ブラウザの中。プライバシー完全保護。</P>
                <P>なぜインラインスタイルか。CSS Modulesを使わない理由は、コンポーネント内で動的にスタイルを計算する箇所が多すぎるから。カードのランクでボーダーカラーが変わる、チャクラレベルでグラデーションが変わる、天気でスカイカラーが変わる。変数が多すぎてCSSクラスでは管理できない。全てReact.CSSPropertiesで動的生成。</P>
            </Section>

            <Section bg="bg-[#F5F5F7]">
                <Label>DATA ARCHITECTURE</Label>
                <H2>230以上のlocalStorageキー。</H2>

                <Code>
                    <p><span className="text-[#252423]/80 font-bold">rpg_mastery</span>: Record&lt;phraseId, 0-6&gt; -- Chakra level per phrase</p>
                    <p><span className="text-[#252423]/80 font-bold">rpg_card_points</span>: Record&lt;phraseId, number&gt; -- GP per phrase</p>
                    <p><span className="text-[#252423]/80 font-bold">rpg_last_leveled</span>: Record&lt;phraseId, date&gt; -- Same-day gate</p>
                    <p><span className="text-[#252423]/80 font-bold">rpg_player_stats</span>: total_xp, sparks, pity_counter, legendary_count</p>
                    <p><span className="text-[#252423]/80 font-bold">rpg_review_counts</span>: Record&lt;date, ReviewEntry&gt; -- Daily review log</p>
                    <p><span className="text-[#252423]/80 font-bold">rpg_phrase_links</span>: Record&lt;phraseId, PhraseLink[]&gt; -- Context links</p>
                    <p><span className="text-[#252423]/80 font-bold">rpg_custom_phrases</span>: TrainingPhrase[] -- Custom phrases</p>
                    <p><span className="text-[#252423]/80 font-bold">player_playMode</span>: manual | auto | shuffle</p>
                </Code>

                <P>同日ゲート: lastLeveledマップで「同じ日に同じフレーズを2回レベルアップさせない」制御。1日1レベルまで。「毎日来る理由」を作るための設計。</P>
                <P>初回ボーナス: その日の最初のレベルアップだけXPが2倍。「今日最初の1回」を特別にすることで、毎日アプリを開く習慣を作る。</P>
            </Section>

            <Section>
                <Label>VOICE LAB</Label>
                <H2>自分の声とネイティブの声を、波形レベルで比較する。</H2>
                <P>7つの練習フレーズ（L/R区別、TH発音、V/B区別、母音の違い、文レベル）。TTS APIでネイティブ発音を生成し、WebAudio APIで自分の声を録音。両方の波形をFFT解析。</P>

                <Feature title="解析項目" sub="ANALYSIS METRICS">
                    <P>波形可視化（canvasレンダリング）。スペクトログラム解析（周波数 x 時間のヒートマップ）。ピッチ輪郭の抽出。類似度スコアリング: 波形類似度 | ピッチ類似度 | 総合スコア（0-100点）。</P>
                </Feature>

                <P>AudioContext → MediaRecorder → Blobチャンキング → AnalyserNode(FFT) → 比較アルゴリズム → フィードバック。ブラウザだけで完結。サーバーに音声データは送らない。</P>
            </Section>

            <Section bg="bg-[#F5F5F7]">
                <Label>NUMBERS</Label>
                <motion.div variants={f} className="flex flex-wrap gap-x-12 gap-y-6 mb-8">
                    <Stat value="15,000" label="UNIQUE WORDS" />
                    <Stat value="15,000" label="UNIQUE IDIOMS" />
                    <Stat value="1,500 DAYS" label="CONTENT (4 YEARS)" />
                    <Stat value="133+" label="JOURNAL ENTRIES" />
                    <Stat value="310" label="ORE GOROKU" />
                    <Stat value="7" label="SCENARIOS" />
                    <Stat value="40+" label="CHARACTERS" />
                    <Stat value="10" label="SPEECH PATTERNS" />
                    <Stat value="7" label="STRUCTURAL RULES" />
                    <Stat value="7" label="CARD EVOLUTION" />
                    <Stat value="6" label="CARD RANKS" />
                    <Stat value="9+3" label="GACHA TIERS" />
                    <Stat value="5" label="ELEMENTS" />
                    <Stat value="6" label="BASE STATS" />
                    <Stat value="100" label="MAX PLAYER LV" />
                    <Stat value="15" label="LESSON PLANS" />
                    <Stat value="125" label="QUEST WORDS" />
                    <Stat value="75/scenario" label="EXPRESSIONS" />
                    <Stat value="10" label="BOSS ROSTER" />
                    <Stat value="16+" label="WEB AUDIO SFX" />
                </motion.div>
            </Section>

            <Section>
                <Label>DEVELOPMENT STATUS</Label>
                <P>Complete is never. Every day something gets added. Every day something breaks. Every day something gets fixed.</P>
                <div className="space-y-1.5">
                    {[
                        { s: 'live', l: 'Training', d: 'Slot machine + Puzzle battle + Mario runner + Chain/Fever' },
                        { s: 'live', l: 'Slot Machine', d: '9 tiers + 3 ultra-rare, reach, chain fever' },
                        { s: 'live', l: 'Puzzle Battle', d: 'DQ-style, 10 bosses, element spells, synergy, grades' },
                        { s: 'live', l: 'Mario Runner', d: '8 milestones, 4 enemy types, GOD mode' },
                        { s: 'live', l: 'Memoria', d: '7 scenarios (35 days, 40+ characters)' },
                        { s: 'live', l: 'Requiem', d: '8 scenario word reviews (50 words/scenario)' },
                        { s: 'live', l: 'Ore Goroku', d: '310 expressions + calendar UI + TTS' },
                        { s: 'live', l: 'Pro', d: '133+ entries, track playback, speed control, bookmarks' },
                        { s: 'live', l: 'Eikaiwa Lab', d: '15 lessons, ChatGPT copy, Arsenal, session log' },
                        { s: 'live', l: 'Dashboard', d: 'XP chart, heatmap, pity counter, evolution distribution' },
                        { s: 'live', l: 'Speaking Guide', d: 'D3 visualization, structural analysis series' },
                        { s: 'live', l: 'Arena', d: '4 difficulties, 4 question types, boss, fever, ranking' },
                        { s: 'live', l: 'World Map', d: 'D3-zoom, 6 stages, badge collection' },
                        { s: 'live', l: 'Sound System', d: '16+ WebAudio SFX, BGM ducking, element spells' },
                        { s: 'live', l: 'Voice Lab', d: 'Waveform, spectrogram, pitch analysis, similarity scoring' },
                        { s: 'dev', l: 'Tonio Words', d: '10,000-word browser + Talk Mode (Phase 1: 500 words)' },
                        { s: 'dev', l: 'New Scenarios', d: 'Day 046+ (weekly additions)' },
                    ].map((item, i) => (
                        <motion.div key={i} variants={f} className="flex items-center gap-3 py-1.5 border-b border-[#DAE2E8] last:border-0">
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.s === 'live' ? 'bg-[#10B981]' : 'bg-[#D4AF37]'}`} />
                            <span className="text-sm font-bold text-[#252423] w-32 shrink-0">{item.l}</span>
                            <span className="text-xs text-[#252423]/40 flex-1">{item.d}</span>
                            <span className={`text-[9px] font-mono tracking-widest shrink-0 ${item.s === 'live' ? 'text-[#10B981]' : 'text-[#D4AF37]'}`}>
                                {item.s === 'live' ? 'LIVE' : 'DEV'}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section bg="bg-[#F5F5F7]">
                <Label>NOTE.COM</Label>
                <H2>過程を全部公開してる。</H2>
                <P>note.comで34本の記事。「最強の英会話アプリを作る男」。TOEIC 900、喋れない、毎日更新中。記事のスタイルはEntry #024（大坂なおみ回）がスタンダード -- 脳科学の裏付け + 感情に寄せる結論。短文畳みかけ。縦長に書く。ギャグが核。</P>
                <P>「とにおのバイブコーディング塾」連載コーナー。AIと一緒にコードを書く開発手法のコツを1つずつ紹介。#01 バイブコーディングって何 → #02 AIへの注文の出し方 → #03 見本を見せろ → #04 直し方の技術 → #05 画面のイメージを伝える方法。</P>
            </Section>

            <Footer />
        </div>
    )
}
