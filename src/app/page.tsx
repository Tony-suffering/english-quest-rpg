'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '@/components/lp/Header'
import Footer from '@/components/lp/Footer'

const f = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] } },
}

function NavCard({ href, label, title, desc, items }: {
    href: string; label: string; title: string; desc: string;
    items: { name: string; href: string }[]
}) {
    return (
        <motion.div variants={f} className="border border-[#DAE2E8] bg-white hover:border-[#D4AF37]/30 transition-all duration-300 group">
            <Link href={href} className="block p-6 sm:p-8">
                <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-mono mb-3">{label}</p>
                <h3 className="text-lg sm:text-xl font-black mb-2 group-hover:text-[#D4AF37] transition-colors">{title}</h3>
                <p className="text-xs text-[#252423]/50 leading-relaxed mb-5">{desc}</p>
                <div className="space-y-1.5">
                    {items.map((item) => (
                        <Link key={item.name} href={item.href} className="flex items-center gap-2 text-xs text-[#252423]/40 hover:text-[#D4AF37] transition-colors" onClick={(e) => e.stopPropagation()}>
                            <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                            {item.name}
                        </Link>
                    ))}
                </div>
            </Link>
            <div className="px-6 sm:px-8 pb-5">
                <Link href={href} className="text-[10px] font-mono tracking-widest text-[#252423]/30 group-hover:text-[#D4AF37] transition-colors">
                    READ MORE →
                </Link>
            </div>
        </motion.div>
    )
}

export default function HomePage() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <div className="min-h-screen bg-white text-[#252423]">
            <Header />

            {/* ━━━ HERO ━━━ */}
            <section className="min-h-[80vh] flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-24 relative">
                <div className="absolute top-0 left-[10%] w-px h-full bg-[#252423]/[0.03]" />
                <div className="absolute top-0 right-[15%] w-px h-full bg-[#252423]/[0.03]" />
                <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.15 }} className="max-w-3xl">
                    <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-gray-400 font-mono mb-8">TONIO LAB / ENGLISH QUEST RPG</motion.p>
                    <motion.h1 variants={f} className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.3] tracking-tight mb-6">
                        TOEIC 900点。<br />4技能のうち3つクリア。<br /><span className="text-[#D4AF37]">最後の1つで永遠に死んでる。</span>
                    </motion.h1>
                    <motion.p variants={f} className="text-base sm:text-lg text-[#252423]/60 leading-relaxed max-w-xl mb-12">
                        読める。聴ける。書ける。喋れない。<br />既存のアプリでは足りなかったから、自分で全部作ってる。<br />英語フレーズをポケモンみたいに捕まえて、育てて、戦わせる。<br />そういうアプリ。
                    </motion.p>
                    <motion.div variants={f} className="flex flex-wrap gap-4">
                        <Link href="/english/training" className="inline-flex items-center gap-3 px-6 py-3 bg-[#252423] text-white text-sm font-bold tracking-wide hover:bg-[#D4AF37] transition-colors">
                            アプリを開く <span className="text-xs opacity-50">→</span>
                        </Link>
                        <a href="https://note.com/tonio_english" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-[#DAE2E8] text-sm font-bold text-[#252423]/60 hover:border-[#252423]/30 transition-colors">
                            note.com で読む
                        </a>
                    </motion.div>
                </motion.div>
            </section>


            {/* ━━━ OVERVIEW STATEMENT ━━━ */}
            <section className="px-6 sm:px-12 lg:px-24 py-16 bg-[#F5F5F7]">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.08 }} className="max-w-3xl">
                    <motion.div variants={f} className="border-l-[5px] border-[#D4AF37] pl-6 mb-6">
                        <p className="text-lg sm:text-xl font-bold leading-relaxed">テストの英語と、人が喋ってる英語は、構造がまるで違う。</p>
                    </motion.div>
                    <motion.p variants={f} className="text-[15px] text-[#252423]/60 leading-[1.9] mb-4">
                        ネイティブの発話の60%以上が「意味のない単語」。I mean, like, you know, right, so, basically -- こういう接着剤で文が繋がってる。教科書はこれを全部取り除いた「きれいな英語」を教えてくる。だから喋れない。
                    </motion.p>
                    <motion.p variants={f} className="text-[15px] text-[#252423]/60 leading-[1.9]">
                        ポッドキャストを何百時間も構造分解して、7つのルールと10の会話パターンを抽出した。このアプリの全コンテンツは、そのルールに従って書いてある。
                    </motion.p>
                </motion.div>
            </section>


            {/* ━━━ SITE NAVIGATION ━━━ */}
            <section className="px-6 sm:px-12 lg:px-24 py-20">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.1 }} className="max-w-5xl">
                    <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-gray-400 font-mono mb-10">SITE MAP</motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <NavCard
                            href="/concept"
                            label="01 / CONCEPT"
                            title="コンセプト"
                            desc="なぜこのアプリを作ったか。ネイティブの英語の構造解析から見つけた7つのルールと10の会話パターン。RPGにした設計思想。"
                            items={[
                                { name: '問題提起 -- TOEIC 900点、喋れない', href: '/concept#problem' },
                                { name: 'Textbook vs Real', href: '/concept#problem' },
                                { name: '7つの構造ルール', href: '/concept#rules' },
                                { name: '10の会話パターン (会話の骨格)', href: '/concept#patterns' },
                                { name: 'RPGの設計思想 -- ゼロは存在しない', href: '/concept#philosophy' },
                            ]}
                        />

                        <NavCard
                            href="/training-guide"
                            label="02 / TRAINING"
                            title="トレーニング"
                            desc="スロットマシン、パズルバトル、マリオランナー。全てのゲームメカニクスの詳細設計。確率テーブル、ボスAI、シナジー計算式。"
                            items={[
                                { name: 'スロットマシン -- 9+3ティア、天井、リーチ演出', href: '/training-guide#slot' },
                                { name: 'パズルバトル -- 10体のボス、12種のシナジー', href: '/training-guide#battle' },
                                { name: 'マリオランナー -- 空の7段階変化、GODモード', href: '/training-guide#runner' },
                                { name: 'チェーン / フィーバー -- 通常→確変→激熱→神', href: '/training-guide#chain' },
                                { name: 'カードコレクション -- 3Dティルト、ホログラフィック', href: '/training-guide#collection' },
                                { name: 'アリーナ -- 制限時間バトル、ランキング', href: '/training-guide#arena' },
                            ]}
                        />

                        <NavCard
                            href="/content-guide"
                            label="03 / CONTENT"
                            title="コンテンツ"
                            desc="7シナリオの会話リスニング、15,000単語のレビュー、310の日本語表現、133以上のジャーナル。全コンテンツの詳細。"
                            items={[
                                { name: 'Memoria -- 40人以上のキャラクター、7シナリオ', href: '/content-guide#memoria' },
                                { name: 'Requiem -- 15,000単語、15,000イディオム', href: '/content-guide#requiem' },
                                { name: '俺語録 -- 翻訳するな、人間を翻訳しろ', href: '/content-guide#goroku' },
                                { name: 'Pro -- 毎日の日記から表現を教える', href: '/content-guide#pro' },
                                { name: 'Quest -- 草むらでフレーズに出会う', href: '/content-guide#quest' },
                                { name: '英会話Lab -- DMM英会話 x ChatGPT', href: '/content-guide#lab' },
                            ]}
                        />

                        <NavCard
                            href="/system-guide"
                            label="04 / SYSTEM"
                            title="システム"
                            desc="カードの7段階進化、6ランク、5属性、日レベル、プレイヤーレベル。ゲームシステムの全仕様。"
                            items={[
                                { name: 'カード進化 -- SEED→MASTER、7段階チャクラ', href: '/system-guide#cards' },
                                { name: 'エレメント -- 火>風>地>雷>水>火', href: '/system-guide#elements' },
                                { name: '日レベル -- 寝起き→本日の神、9段階', href: '/system-guide#daily' },
                                { name: 'プレイヤーレベル -- Lv.1→100、ワールドマップ', href: '/system-guide#player' },
                                { name: 'サウンドシステム -- 16以上のWebAudio SFX', href: '/system-guide#sound' },
                            ]}
                        />

                    </div>

                    <motion.div variants={f} className="mt-6">
                        <Link href="/journal" className="block border border-[#DAE2E8] bg-white hover:border-[#D4AF37]/30 transition-all duration-300 group p-6 sm:p-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-mono mb-2">05 / JOURNAL</p>
                                    <h3 className="text-lg font-black group-hover:text-[#D4AF37] transition-colors">ジャーナル</h3>
                                    <p className="text-xs text-[#252423]/50 mt-1">開発と英語学習の全記録。133+エントリ。毎日更新中。カレンダーUIで日付ごとに読める。</p>
                                </div>
                                <span className="text-[10px] font-mono tracking-widest text-[#252423]/30 group-hover:text-[#D4AF37] transition-colors shrink-0 ml-6">READ MORE →</span>
                            </div>
                        </Link>
                    </motion.div>

                    <motion.div variants={f} className="mt-6">
                        <Link href="/tech" className="block border border-[#DAE2E8] bg-white hover:border-[#D4AF37]/30 transition-all duration-300 group p-6 sm:p-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-mono mb-2">06 / TECHNOLOGY</p>
                                    <h3 className="text-lg font-black group-hover:text-[#D4AF37] transition-colors">テクノロジー / 開発状況</h3>
                                    <p className="text-xs text-[#252423]/50 mt-1">Next.js 15, Tailwind v4, Web Audio API, D3-zoom, Cloudflare Workers. 月額0円。オフライン動作。全データlocalStorage。開発ステータス一覧。</p>
                                </div>
                                <span className="text-[10px] font-mono tracking-widest text-[#252423]/30 group-hover:text-[#D4AF37] transition-colors shrink-0 ml-6">READ MORE →</span>
                            </div>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>


            {/* ━━━ NUMBERS ━━━ */}
            <section className="px-6 sm:px-12 lg:px-24 py-16 bg-[#F5F5F7]">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.05 }} className="max-w-5xl">
                    <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-gray-400 font-mono mb-8">NUMBERS</motion.p>
                    <div className="flex flex-wrap gap-x-12 gap-y-6">
                        {[
                            ['15,000', 'UNIQUE WORDS'],
                            ['15,000', 'UNIQUE IDIOMS'],
                            ['1,500 DAYS', 'CONTENT'],
                            ['133+', 'JOURNAL ENTRIES'],
                            ['310', 'ORE GOROKU'],
                            ['7', 'SCENARIOS'],
                            ['40+', 'CHARACTERS'],
                            ['10', 'SPEECH PATTERNS'],
                            ['7', 'STRUCTURAL RULES'],
                            ['9+3', 'GACHA TIERS'],
                            ['10', 'BOSSES'],
                            ['16+', 'WEB AUDIO SFX'],
                        ].map(([value, label]) => (
                            <motion.div key={label} variants={f}>
                                <p className="text-2xl sm:text-3xl font-black text-[#252423]">{value}</p>
                                <p className="text-[10px] text-gray-400 tracking-widest mt-0.5">{label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>


            {/* ━━━ TEXTBOOK vs REAL (teaser) ━━━ */}
            <section className="px-6 sm:px-12 lg:px-24 py-20">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.08 }} className="max-w-3xl">
                    <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-gray-400 font-mono mb-6">TEXTBOOK vs REAL</motion.p>
                    <motion.div variants={f} className="mb-6">
                        <p className="text-xs text-gray-400 tracking-widest font-bold mb-3">TEXTBOOK</p>
                        <motion.div variants={f} className="bg-[#F5F5F7] border border-[#DAE2E8] p-5 font-mono text-xs text-[#252423]/60 leading-relaxed mb-2">
                            <p>&quot;I went to the store and bought some milk.&quot;</p>
                            <p className="mt-2">&quot;Could you please pass me the salt?&quot;</p>
                        </motion.div>
                        <p className="text-xs text-[#252423]/40">文法100点。テストでは満点。でもこれを喋る人間はいない。</p>
                    </motion.div>
                    <motion.div variants={f} className="mb-8">
                        <p className="text-xs text-[#D4AF37] tracking-widest font-bold mb-3">REAL</p>
                        <motion.div variants={f} className="bg-white border-l-[5px] border-[#D4AF37] p-5 font-mono text-sm text-[#252423] leading-relaxed shadow-sm mb-2">
                            <p>&quot;I mean, I literally just -- like, walked to the store and forgot my wallet. Classic me.&quot;</p>
                            <p className="mt-3">&quot;Nah I was kinda reluctant at first, but honestly? Best decision I ever made.&quot;</p>
                        </motion.div>
                        <p className="text-xs text-[#252423]/40">hesitation, filler, reformulation, false start, g-dropping。</p>
                    </motion.div>
                    <motion.div variants={f}>
                        <Link href="/concept" className="text-sm font-bold text-[#D4AF37] hover:text-[#252423] transition-colors">
                            コンセプトを詳しく読む →
                        </Link>
                    </motion.div>
                </motion.div>
            </section>


            {/* ━━━ FEATURES HIGHLIGHTS ━━━ */}
            <section className="px-6 sm:px-12 lg:px-24 py-20 bg-[#F5F5F7]">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.08 }} className="max-w-3xl">
                    <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-mono mb-6">HIGHLIGHTS</motion.p>
                    <motion.h2 variants={f} className="text-2xl sm:text-3xl font-black leading-[1.4] mb-10">できてるもの。</motion.h2>

                    <div className="space-y-8">
                        {[
                            {
                                title: 'Slot Machine',
                                desc: 'レビューするたびに3リールが回る。9段階+3ウルトラレア。PHANTOMの確率は1/8192（ポケモン色違い）。天井200回でLEGENDARY確定。',
                                link: '/training-guide#slot',
                            },
                            {
                                title: 'Puzzle Battle',
                                desc: '10体の日替わりボス（朱雀、玄武、白虎、青龍、麒麟、鬼、天狗、河童、龍王、大蛇）。12種のシナジー倍率。エレメント相性。',
                                link: '/training-guide#battle',
                            },
                            {
                                title: 'Memoria',
                                desc: '7シナリオ、35日分の会話、40人以上のキャラクター。全てネイティブの構造ルールに従って書いてある。',
                                link: '/content-guide#memoria',
                            },
                            {
                                title: '俺語録',
                                desc: '310の日本語表現を、態度ごとネイティブ英語に変換。「朝が存在しない」→ "I don\'t do mornings"。居酒屋で隣のやつに教えるテンション。',
                                link: '/content-guide#goroku',
                            },
                            {
                                title: 'Sound System',
                                desc: '16以上のSFX。全てWeb Audio APIで周波数から生成。外部音声ファイルはBGM1つだけ。Cloudflare 3MiB制限に収まる。',
                                link: '/system-guide#sound',
                            },
                        ].map((item) => (
                            <motion.div key={item.title} variants={f}>
                                <Link href={item.link} className="block group">
                                    <div className="flex items-baseline gap-3 mb-1">
                                        <h3 className="text-base font-black group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
                                        <span className="text-[10px] text-[#252423]/30 group-hover:text-[#D4AF37] transition-colors">→</span>
                                    </div>
                                    <p className="text-xs text-[#252423]/50 leading-relaxed">{item.desc}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>


            {/* ━━━ STATUS ━━━ */}
            <section className="px-6 sm:px-12 lg:px-24 py-16">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.04 }} className="max-w-3xl">
                    <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-gray-400 font-mono mb-6">DEVELOPMENT STATUS</motion.p>
                    <motion.p variants={f} className="text-[15px] text-[#252423]/60 leading-[1.9] mb-6">
                        完成品じゃない。毎日コードを書いて、毎日コンテンツを追加してる。壊れてることもある。直す。また壊れる。そういうアプリ。
                    </motion.p>
                    <div className="space-y-1.5 mb-8">
                        {[
                            { s: 'live', l: 'Training' },
                            { s: 'live', l: 'Slot Machine' },
                            { s: 'live', l: 'Puzzle Battle' },
                            { s: 'live', l: 'Mario Runner' },
                            { s: 'live', l: 'Memoria (7 scenarios)' },
                            { s: 'live', l: 'Requiem (8 scenarios)' },
                            { s: 'live', l: 'Ore Goroku (310)' },
                            { s: 'live', l: 'Pro (133+ entries)' },
                            { s: 'live', l: 'Eikaiwa Lab (15 lessons)' },
                            { s: 'live', l: 'Dashboard' },
                            { s: 'live', l: 'Arena' },
                            { s: 'live', l: 'World Map' },
                            { s: 'live', l: 'Sound System (16+ SFX)' },
                            { s: 'live', l: 'Voice Lab' },
                            { s: 'dev', l: 'Tonio Words (10,000)' },
                        ].map((item, i) => (
                            <motion.div key={i} variants={f} className="flex items-center gap-3 py-1">
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.s === 'live' ? 'bg-[#10B981]' : 'bg-[#D4AF37]'}`} />
                                <span className="text-xs text-[#252423]/60">{item.l}</span>
                                <span className={`text-[9px] font-mono tracking-widest ml-auto ${item.s === 'live' ? 'text-[#10B981]' : 'text-[#D4AF37]'}`}>
                                    {item.s === 'live' ? 'LIVE' : 'DEV'}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                    <motion.div variants={f}>
                        <Link href="/tech" className="text-sm font-bold text-[#D4AF37] hover:text-[#252423] transition-colors">
                            テクノロジーの詳細 →
                        </Link>
                    </motion.div>
                </motion.div>
            </section>


            <Footer />
        </div>
    )
}
