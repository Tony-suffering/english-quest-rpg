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

export default function HomePage() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
        if (!localStorage.getItem('tl_welcome_seen')) {
            localStorage.setItem('tl_welcome_seen', 'true')
        }
    }, [])
    if (!mounted) return null

    return (
        <div className="min-h-screen bg-white text-[#252423]">
            <Header />

            {/* ━━━ HERO ━━━ */}
            <section className="min-h-[85vh] flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-24 relative">
                <div className="absolute top-0 left-[10%] w-px h-full bg-[#252423]/[0.03]" />
                <div className="absolute top-0 right-[15%] w-px h-full bg-[#252423]/[0.03]" />
                <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.15 }} className="max-w-3xl">
                    <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-gray-400 font-mono mb-8">TONIO LAB / とにおラボ</motion.p>
                    <motion.h1 variants={f} className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.3] tracking-tight mb-6">
                        TOEIC 900点を取った翌週、<br />ネイティブとの会話で<br /><span className="text-[#D4AF37]">3秒で詰んだ。</span>
                    </motion.h1>
                    <motion.p variants={f} className="text-base sm:text-lg text-[#252423]/60 leading-relaxed max-w-xl mb-4">
                        読める。聴ける。書ける。喋れない。
                    </motion.p>
                    <motion.p variants={f} className="text-sm text-[#252423]/40 leading-relaxed max-w-xl mb-12">
                        既存の英語アプリは全部試した。どれも「きれいな英語」しか教えてくれない。<br />
                        だから自分で作った。プログラミング経験ゼロから。武器はAIと根性だけ。
                    </motion.p>
                    <motion.div variants={f} className="flex items-center gap-6 text-xs text-[#252423]/30 font-mono tracking-wider">
                        <span>SCROLL</span>
                        <span className="w-12 h-px bg-[#252423]/20" />
                    </motion.div>
                </motion.div>
            </section>


            {/* ━━━ THE GAP ━━━ */}
            <section className="px-6 sm:px-12 lg:px-24 py-24 bg-[#1C1917] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37] opacity-[0.04] rounded-full blur-[120px]" />
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.1 }} className="max-w-3xl relative z-10">
                    <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-mono mb-8">THE GAP</motion.p>
                    <motion.h2 variants={f} className="text-2xl sm:text-3xl font-black leading-[1.4] mb-10">
                        教科書の英語を喋る人間は、<br />地球上に1人もいない。
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <motion.div variants={f}>
                            <p className="text-[10px] tracking-[0.2em] text-white/30 font-mono mb-4">TEXTBOOK</p>
                            <div className="border border-white/10 rounded-lg p-5 font-mono text-sm text-white/40 leading-relaxed space-y-3">
                                <p>&quot;I went to the store and bought some milk.&quot;</p>
                                <p>&quot;Could you please pass me the salt?&quot;</p>
                            </div>
                            <p className="text-xs text-white/20 mt-3">文法100点。テストでは満点。</p>
                        </motion.div>
                        <motion.div variants={f}>
                            <p className="text-[10px] tracking-[0.2em] text-[#D4AF37] font-mono mb-4">REAL</p>
                            <div className="border border-[#D4AF37]/30 rounded-lg p-5 font-mono text-sm text-white/90 leading-relaxed space-y-3 bg-[#D4AF37]/5">
                                <p>&quot;I mean, I literally just -- like, walked to the store and forgot my wallet. Classic me.&quot;</p>
                                <p>&quot;Nah I was kinda reluctant at first, but honestly? Best decision I ever made.&quot;</p>
                            </div>
                            <p className="text-xs text-[#D4AF37]/60 mt-3">hesitation, filler, reformulation, false start, g-dropping。</p>
                        </motion.div>
                    </div>

                    <motion.div variants={f} className="border-l-2 border-[#D4AF37]/40 pl-6">
                        <p className="text-[15px] text-white/60 leading-[1.9]">
                            ネイティブの発話の60%以上が「意味のない単語」。I mean, like, you know, right -- こういう接着剤で文が繋がってる。教科書はこれを全部取り除いた「きれいな英語」を教えてくる。だから喋れない。
                        </p>
                    </motion.div>

                    <motion.div variants={f} className="mt-10">
                        <Link href="/concept" className="text-sm font-bold text-[#D4AF37] hover:text-white transition-colors">
                            構造分析の全文を読む →
                        </Link>
                    </motion.div>
                </motion.div>
            </section>


            {/* ━━━ TWO APPS ━━━ */}
            <section className="px-6 sm:px-12 lg:px-24 py-24">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.12 }} className="max-w-5xl mx-auto">
                    <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-gray-400 font-mono mb-4">TWO APPS, ONE MISSION</motion.p>
                    <motion.h2 variants={f} className="text-2xl sm:text-3xl font-black leading-[1.4] mb-4">
                        だから2つのアプリを作った。
                    </motion.h2>
                    <motion.p variants={f} className="text-sm text-[#252423]/50 mb-12 max-w-xl">
                        目的が違う。アプローチが違う。どっちも無料。登録不要。
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 英会話マスター365 */}
                        <motion.div variants={f}>
                            <Link href="/english/izakaya-toeic/kaiwa/lp" className="block group">
                                <div className="rounded-2xl border border-[#E7E5E4] bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#D4AF37]/30">
                                    <div className="h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/40" />
                                    <div className="p-8">
                                        <p className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-mono mb-4">DAILY PHRASES</p>
                                        <h3 className="text-2xl font-black mb-3 group-hover:text-[#D4AF37] transition-colors">
                                            英会話マスター<span className="text-[#D4AF37]">365</span>
                                        </h3>
                                        <p className="text-sm text-[#252423]/50 leading-[1.9] mb-6">
                                            日本語1つに英語4つ。<br />
                                            「ビールください」にCORE、NATURAL、FLOW、EXPRESSの4段階。<br />
                                            毎日10フレーズ、365日。口から出すフレーズの在庫を作る。
                                        </p>

                                        <div className="bg-[#FAFAF9] rounded-lg p-4 mb-6 border border-[#E7E5E4]">
                                            <p className="text-[10px] text-[#A8A29E] mb-2">Example: ビールください</p>
                                            <div className="space-y-1.5">
                                                <div className="flex gap-3 items-baseline">
                                                    <span className="text-[9px] font-bold text-[#A8A29E] w-14 shrink-0">CORE</span>
                                                    <span className="text-xs text-[#57534E]">Beer, please.</span>
                                                </div>
                                                <div className="flex gap-3 items-baseline">
                                                    <span className="text-[9px] font-bold text-[#D4AF37] w-14 shrink-0">FLOW</span>
                                                    <span className="text-xs text-[#57534E]">Beer first. I need to unwind before I can even think about food.</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-8">
                                            <div><span className="text-2xl font-black text-[#D4AF37]">3,650</span><span className="text-[10px] text-[#A8A29E] ml-1">phrases</span></div>
                                            <div><span className="text-2xl font-black text-[#D4AF37]">365</span><span className="text-[10px] text-[#A8A29E] ml-1">days</span></div>
                                            <div><span className="text-2xl font-black text-[#D4AF37]">0</span><span className="text-[10px] text-[#A8A29E] ml-1">yen</span></div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* 居酒屋TOEIC */}
                        <motion.div variants={f}>
                            <Link href="/english/izakaya-toeic/lp" className="block group">
                                <div className="rounded-2xl border border-[#E7E5E4] bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#10B981]/30">
                                    <div className="h-1.5 bg-gradient-to-r from-[#10B981] to-[#10B981]/40" />
                                    <div className="p-8">
                                        <p className="text-[10px] tracking-[0.3em] text-[#10B981] font-mono mb-4">TOEIC DRAMA</p>
                                        <h3 className="text-2xl font-black mb-3 group-hover:text-[#10B981] transition-colors">
                                            居酒屋<span className="text-[#10B981]">TOEIC</span>
                                        </h3>
                                        <p className="text-sm text-[#252423]/50 leading-[1.9] mb-6">
                                            全30話の連続ドラマ。<br />
                                            6人のキャラクター。伏線。涙。<br />
                                            物語を読んでたらTOEICのスコアが上がってた。そういう設計。
                                        </p>

                                        <div className="bg-[#FAFAF9] rounded-lg p-4 mb-6 border border-[#E7E5E4]">
                                            <p className="text-[10px] text-[#A8A29E] mb-2">のれんの常連たち</p>
                                            <p className="text-xs text-[#57534E] leading-[1.8]">
                                                480点のおっさんが泣きながら勉強してる。860点の帰国子女がプライドを砕かれてる。全員どこかが壊れてる。
                                            </p>
                                        </div>

                                        <div className="flex gap-8">
                                            <div><span className="text-2xl font-black text-[#10B981]">30</span><span className="text-[10px] text-[#A8A29E] ml-1">episodes</span></div>
                                            <div><span className="text-2xl font-black text-[#10B981]">6</span><span className="text-[10px] text-[#A8A29E] ml-1">characters</span></div>
                                            <div><span className="text-2xl font-black text-[#10B981]">0</span><span className="text-[10px] text-[#A8A29E] ml-1">yen</span></div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </section>


            {/* ━━━ MOVIE HARVEST ━━━ */}
            <section className="px-6 sm:px-12 lg:px-24 py-20 bg-[#FAFAF9]">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.1 }} className="max-w-3xl mx-auto">
                    <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-mono mb-4">MOVIE HARVEST</motion.p>
                    <motion.h2 variants={f} className="text-2xl sm:text-3xl font-black leading-[1.4] mb-4">
                        映画1本、名台詞10個。毎日。
                    </motion.h2>
                    <motion.p variants={f} className="text-sm text-[#252423]/50 mb-8 leading-[1.8]">
                        The Big Lebowski、Good Will Hunting、Pulp Fiction -- 名作映画のセリフを構造ごと分解。なぜその言い方をするのか、日本人がどこでつまずくか、実生活でどう使うか。4月は30本。
                    </motion.p>

                    <motion.div variants={f} className="bg-white rounded-xl border border-[#E7E5E4] p-6 mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] font-bold text-[#991B1B] bg-[#FEE2E2] px-2.5 py-1 rounded">Crime</span>
                            <span className="text-xs text-[#A8A29E]">1994</span>
                        </div>
                        <h3 className="text-xl font-black mb-2">Pulp Fiction</h3>
                        <p className="text-sm text-[#57534E] italic leading-[1.7] mb-4">会話の密度が映画史上最高レベル。殺し屋がチーズバーガーの話をする映画は他にない。</p>
                        <div className="space-y-2">
                            {[
                                { rank: 'S', expr: 'Say "what" again. I dare you.', note: '脅迫の最高峰。dareの使い方がわかるだけで英語の幅が変わる。' },
                                { rank: 'A', expr: "That's a pretty good milkshake.", note: 'prettyは「かなり」。goodの前にprettyを挟む癖をつけろ。' },
                            ].map((item) => (
                                <div key={item.expr} className="flex gap-3 items-start py-2 border-t border-[#F5F5F4]">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${item.rank === 'S' ? 'bg-[#FEF3C7] text-[#92400E]' : 'bg-[#D1FAE5] text-[#065F46]'}`}>{item.rank}</span>
                                    <div>
                                        <p className="text-sm font-bold text-[#1C1917]">&ldquo;{item.expr}&rdquo;</p>
                                        <p className="text-xs text-[#78716C] mt-1">{item.note}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={f}>
                        <Link href="/english/harvest" className="inline-flex items-center gap-3 px-6 py-3 bg-[#252423] text-white text-sm font-bold tracking-wide hover:bg-[#D4AF37] transition-colors">
                            Movie Harvest を開く <span className="text-xs opacity-50">→</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>


            {/* ━━━ THE APPROACH ━━━ */}
            <section className="px-6 sm:px-12 lg:px-24 py-24">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.08 }} className="max-w-4xl mx-auto">
                    <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-gray-400 font-mono mb-4">THE APPROACH</motion.p>
                    <motion.h2 variants={f} className="text-2xl sm:text-3xl font-black leading-[1.4] mb-12">
                        ポッドキャストを何百時間も構造分解して、<br />7つのルールを見つけた。
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {[
                            {
                                step: '01',
                                title: '構造を知る',
                                desc: 'ネイティブの英語には7つの構造ルールと10の会話パターンがある。教科書はこの構造を無視してる。まずこれを知る。',
                                link: '/concept',
                            },
                            {
                                step: '02',
                                title: '在庫を増やす',
                                desc: '英会話マスター365で毎日10フレーズ。映画から10セリフ。俺語録で310の表現。口から出す「在庫」を物理的に増やす。',
                                link: '/english/izakaya-toeic/kaiwa/lp',
                            },
                            {
                                step: '03',
                                title: '使って定着させる',
                                desc: 'スロットマシンで復習。パズルバトルで実戦。アリーナで制限時間勝負。ゲームにしないと人間は続かない。',
                                link: '/training-guide',
                            },
                        ].map((item) => (
                            <motion.div key={item.step} variants={f}>
                                <Link href={item.link} className="block group">
                                    <div className="mb-4">
                                        <span className="text-4xl font-black text-[#252423]/[0.06]">{item.step}</span>
                                    </div>
                                    <h3 className="text-lg font-black mb-3 group-hover:text-[#D4AF37] transition-colors">{item.title}</h3>
                                    <p className="text-xs text-[#252423]/50 leading-[1.9]">{item.desc}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>


            {/* ━━━ NUMBERS ━━━ */}
            <section className="px-6 sm:px-12 lg:px-24 py-16 bg-[#1C1917] text-white">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.04 }} className="max-w-5xl mx-auto">
                    <div className="flex flex-wrap gap-x-16 gap-y-8 justify-center text-center">
                        {[
                            ['3,650', 'フレーズ'],
                            ['30', 'TOEICエピソード'],
                            ['30', '映画 / 月'],
                            ['310', '俺語録'],
                            ['7', '構造ルール'],
                            ['10', '会話パターン'],
                        ].map(([value, label]) => (
                            <motion.div key={label} variants={f}>
                                <p className="text-3xl sm:text-4xl font-black text-[#D4AF37]">{value}</p>
                                <p className="text-[10px] text-white/40 tracking-widest mt-1">{label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>


            {/* ━━━ WHO ━━━ */}
            <section className="px-6 sm:px-12 lg:px-24 py-24">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.1 }} className="max-w-3xl mx-auto">
                    <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-gray-400 font-mono mb-4">ABOUT</motion.p>
                    <motion.h2 variants={f} className="text-2xl sm:text-3xl font-black leading-[1.4] mb-6">
                        作ってる人間の話。
                    </motion.h2>
                    <motion.div variants={f} className="space-y-4 text-[15px] text-[#252423]/60 leading-[1.9]">
                        <p>
                            東京で内装工事の会社をやってる。プログラミング経験はゼロだった。2025年12月にClaude Codeと出会って、そこから毎日コードを書いてる。
                        </p>
                        <p>
                            TOEIC 900点は2025年11月に取った。でもネイティブと喋ると3秒で詰む。その悔しさがこのアプリの燃料になってる。
                        </p>
                        <p>
                            完成品じゃない。毎日何かが増える。毎日何かが壊れる。毎日何かが直る。そういうアプリ。
                        </p>
                    </motion.div>
                    <motion.div variants={f} className="mt-8 flex flex-wrap gap-4">
                        <a href="https://note.com/tonio_english" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#DAE2E8] text-sm text-[#252423]/60 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors rounded">
                            note.com で開発記録を読む
                        </a>
                        <Link href="/membership" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#DAE2E8] text-sm text-[#252423]/60 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors rounded">
                            メンバーシップ
                        </Link>
                    </motion.div>
                </motion.div>
            </section>


            {/* ━━━ FINAL CTA ━━━ */}
            <section className="px-6 sm:px-12 lg:px-24 py-20 bg-[#FAFAF9]">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.1 }} className="max-w-3xl mx-auto text-center">
                    <motion.h2 variants={f} className="text-2xl sm:text-3xl font-black leading-[1.4] mb-4">
                        登録不要。無料。今すぐ始められる。
                    </motion.h2>
                    <motion.p variants={f} className="text-sm text-[#252423]/50 mb-10">
                        ブラウザだけで動く。データは全部あなたの端末に保存される。サーバーには何も送らない。
                    </motion.p>
                    <motion.div variants={f} className="flex flex-wrap gap-4 justify-center">
                        <Link href="/english/izakaya-toeic/kaiwa/lp" className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-white text-sm font-bold tracking-wide hover:bg-[#252423] transition-colors">
                            英会話マスター365 を始める <span className="text-xs opacity-50">→</span>
                        </Link>
                        <Link href="/english/izakaya-toeic/lp" className="inline-flex items-center gap-3 px-8 py-4 bg-[#10B981] text-white text-sm font-bold tracking-wide hover:bg-[#252423] transition-colors">
                            居酒屋TOEIC を始める <span className="text-xs opacity-50">→</span>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>


            <Footer />
        </div>
    )
}
