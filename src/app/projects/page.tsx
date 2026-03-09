'use client'

import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/utils/animations'
import { ClipboardCheck, Ruler, FileText, PenTool, HardHat, Home } from 'lucide-react'
import SocialShare from '@/components/website/SocialShare'

export default function ProjectsPage() {
    const steps = [
        {
            icon: ClipboardCheck,
            title: '01. お問い合わせ・ご相談',
            description: 'まずはお気軽にご連絡ください。お電話、メール、またはAIチャットボット「タクミ」にて承っております。現状のお悩みやご要望をお聞かせください。',
        },
        {
            icon: Ruler,
            title: '02. 現地調査',
            description: '専門スタッフが現地に伺い、採寸や状況確認を行います。建物の構造や設備の状態を詳細にチェックし、最適な施工方法を検討します。',
        },
        {
            icon: FileText,
            title: '03. プラン提案・お見積り',
            description: '現地調査の結果とご要望に基づき、具体的なプランと詳細なお見積りを作成します。分かりやすい資料で丁寧にご説明いたします。',
        },
        {
            icon: PenTool,
            title: '04. ご契約',
            description: 'プラン内容、工事金額、工期などにご納得いただけましたら、工事請負契約を締結いたします。着工に向けた最終的な打ち合わせを行います。',
        },
        {
            icon: HardHat,
            title: '05. 施工開始',
            description: '近隣の方々へのご挨拶を行い、安全第一で工事を進めます。経験豊富な職人が、確かな技術で丁寧に仕上げていきます。',
        },
        {
            icon: Home,
            title: '06. 完了検査・お引き渡し',
            description: '工事完了後、厳密な社内検査とお客様による立会い確認を行います。問題がなければお引き渡しとなり、アフターサポートが始まります。',
        },
    ]

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            {/* ヒーローセクション */}
            <section className="bg-[#252423] text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-black mb-3 border-b-2 border-[#D4AF37] pb-3 inline-block">
                            施工の流れ
                        </h1>
                        <p className="text-sm text-white/70 mt-4">Schedule - ご相談からお引き渡しまでのプロセス</p>
                    </motion.div>
                </div>
            </section>

            {/* メインコンテンツ */}
            <section className="py-12 md:py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        className="space-y-12"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                    >
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            return (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="relative flex gap-6 md:gap-10"
                                >
                                    {/* 左側のラインとアイコン */}
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-[#252423] rounded-full flex items-center justify-center shadow-lg z-10 border-4 border-white">
                                            <Icon className="w-6 h-6 md:w-8 md:h-8 text-[#D4AF37]" />
                                        </div>
                                        {index !== steps.length - 1 && (
                                            <div className="flex-1 w-0.5 bg-[#DAE2E8] my-2"></div>
                                        )}
                                    </div>

                                    {/* 右側のコンテンツ */}
                                    <div className="flex-1 pb-12">
                                        <div className="bg-white border border-[#DAE2E8] p-6 md:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow relative top-2">
                                            <h3 className="text-xl font-black text-[#252423] mb-3">
                                                {step.title}
                                            </h3>
                                            <p className="text-[#252423]/70 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-12 bg-gray-50 border-t border-[#DAE2E8]">
                <motion.div
                    className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <h2 className="text-2xl font-black text-[#252423] mb-4">
                        まずはAI職人「タクミ」に<br />相談してみませんか？
                    </h2>
                    <p className="text-sm text-[#252423]/70 mb-8">
                        施工の流れについてのご質問や、概算のお見積りなど、<br />
                        AIが即座にお答えします。24時間365日対応・無料です。
                    </p>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <motion.a
                            href="/chat"
                            className="bg-[#10B981] text-white px-10 py-5 font-bold text-lg hover:bg-[#0ea572] transition-all shadow-lg hover:shadow-xl rounded-full inline-flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            AIタクミに相談する（無料）
                        </motion.a>
                    </div>
                </motion.div>
            </section>

            {/* SNSシェア */}
            <section className="py-6 bg-white border-t border-[#DAE2E8]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white border border-[#DAE2E8] p-4">
                        <SocialShare
                            title="施工の流れ - イワサキ内装"
                            description="お問い合わせから現地調査、ご契約、施工、お引き渡しまでの流れをご案内します。"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
