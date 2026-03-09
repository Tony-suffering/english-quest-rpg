'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer, scaleIn } from '@/utils/animations'

export default function AiDxSection() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)

    return (
        <section id="ai-dx-digital" className="py-12 sm:py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative overflow-visible"
                >
                    {/* ヘッダー */}
                    <motion.div variants={fadeInUp} className="text-center mb-8 sm:mb-12">
                        <div className="inline-block bg-[#10B981]/10 text-[#10B981] px-4 py-2 text-xs sm:text-sm font-bold mb-4 border border-[#10B981]">
                            技術 × 革新 × デジタルツイン
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-[#252423]">
                            AI × DX × <span className="text-[#10B981]">デジタルツイン</span>で<br className="hidden sm:block" />
                            空間の価値を再定義する
                        </h2>
                        <p className="text-base sm:text-lg text-[#252423]/70 max-w-3xl mx-auto leading-relaxed">
                            伝統の職人技と最先端テクノロジー、そして空間のデジタル化。<br />
                            「作って終わり」ではなく、施工後もデータとして生き続ける新しい内装の形を提案します。
                        </p>
                    </motion.div>

                    {/* メインコンテンツ */}
                    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 mb-8">
                        {/* 左: 主要機能カード */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-4 w-full"
                        >
                            {/* デジタル施工記録 */}
                            <motion.div variants={fadeInUp} className="bg-gray-50 border border-[#DAE2E8] p-6 hover:shadow-lg transition-all">
                                <h3 className="text-lg font-bold text-[#252423] mb-2">
                                    デジタル施工記録
                                </h3>
                                <p className="text-sm text-[#252423]/70 leading-relaxed mb-3">
                                    スマホで写真・位置情報・作業内容を記録。施工のプロセスを完全に可視化し、透明性の高い工事を実現します。
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-[#10B981]/10 text-[#10B981] px-3 py-1 text-xs font-bold border border-[#10B981]/30">完全可視化</span>
                                    <span className="bg-[#10B981]/10 text-[#10B981] px-3 py-1 text-xs font-bold border border-[#10B981]/30">信頼性向上</span>
                                </div>
                            </motion.div>

                            {/* AI職人タクミ */}
                            <motion.div variants={fadeInUp} className="bg-gray-50 border border-[#DAE2E8] p-6 hover:shadow-lg transition-all">
                                <h3 className="text-lg font-bold text-[#252423] mb-2">
                                    AI職人「タクミ」
                                </h3>
                                <p className="text-sm text-[#252423]/70 leading-relaxed mb-3">
                                    24時間対応のAIアシスタント。施工の疑問解決から見積もり相談まで、豊富な知識でサポート。
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 text-xs font-bold border border-[#D4AF37]/30">即時対応</span>
                                    <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 text-xs font-bold border border-[#D4AF37]/30">技術相談</span>
                                </div>
                            </motion.div>

                            {/* デジタルツイン (New Business) */}
                            <motion.div variants={fadeInUp} className="bg-white border-2 border-[#10B981] p-6 hover:shadow-xl transition-all relative overflow-hidden group">
                                <div className="absolute top-0 right-0 bg-[#10B981] text-white text-xs font-bold px-3 py-1">新着</div>
                                <h3 className="text-lg font-bold text-[#252423] mb-2 flex items-center gap-2">
                                    デジタルツイン納品
                                </h3>
                                <p className="text-sm text-[#252423]/70 leading-relaxed mb-3">
                                    施工した部屋の「3Dモデルデータ」も合わせて納品。
                                    家具の配置シミュレーションや、将来のリフォーム計画に活用できる「デジタルの双子」を提供します。
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-[#82EDA6]/10 text-[#82EDA6] px-3 py-1 text-xs font-bold border border-[#82EDA6]/30">3Dデータ納品</span>
                                    <span className="bg-[#82EDA6]/10 text-[#82EDA6] px-3 py-1 text-xs font-bold border border-[#82EDA6]/30">資産価値向上</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* 右: 動画エリアとCTA */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6 w-full"
                        >
                            {/* 動画説明 */}
                            <div className="bg-gray-50 border border-[#DAE2E8] p-4">
                                <p className="text-sm text-[#252423]/80 leading-relaxed">
                                    <span className="font-bold text-[#10B981]">AI×デジタルツイン</span>をテーマにした動画です。
                                    物理的な施工だけでなく、デジタル空間での価値提供にも取り組む姿勢をご紹介しています。
                                </p>
                            </div>

                            {/* YouTube動画エリア */}
                            <div className="relative bg-white border border-[#DAE2E8] overflow-hidden aspect-video">
                                {/* 未来都市画像（ポップアップエフェクト付き）- 最初に表示 */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{
                                        opacity: [0, 1, 1, 0],
                                        scale: [0.8, 1.1, 1, 0.2],
                                    }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 5,
                                        times: [0, 0.1, 0.9, 1],
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 z-20 pointer-events-none"
                                >
                                    <img
                                        src="/images/futuristic-city.jpg"
                                        alt="未来都市"
                                        className="w-full h-full object-cover"
                                        loading="eager"
                                    />
                                </motion.div>

                                {/* YouTube表示（画像が消えた後に表示） */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 4.5, duration: 1 }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    {!isVideoPlaying ? (
                                        // サムネイル画像 + 再生ボタン
                                        <div
                                            className="absolute inset-0 w-full h-full cursor-pointer group"
                                            onClick={() => setIsVideoPlaying(true)}
                                        >
                                            <img
                                                src="https://img.youtube.com/vi/fZdTYswuZjU/maxresdefault.jpg"
                                                alt="イワサキ内装 紹介動画"
                                                className="w-full h-full object-cover"
                                                loading="eager"
                                            />
                                            {/* 再生ボタンオーバーレイ */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-2xl"
                                                >
                                                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                                                </motion.div>
                                            </div>
                                        </div>
                                    ) : (
                                        // YouTube埋め込み
                                        <iframe
                                            className="absolute inset-0 w-full h-full"
                                            src="https://www.youtube.com/embed/fZdTYswuZjU?autoplay=1&cc_load_policy=1&cc_lang_pref=ja"
                                            title="イワサキ内装 紹介動画"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    )}
                                </motion.div>
                            </div>

                            {/* 詳細ボタン */}
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="/technology/digital-twin"
                                className="block bg-[#10B981] text-white text-center px-8 py-4 font-bold text-lg hover:bg-[#0ea572] transition-colors shadow-2xl"
                            >
                                デジタルツインの詳細を見る →
                            </motion.a>

                            {/* 統計情報 */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-gray-50 border border-[#DAE2E8] p-4 text-center">
                                    <div className="text-2xl sm:text-3xl font-black text-[#10B981] mb-1">AI</div>
                                    <div className="text-xs text-[#252423]/70">職人タクミ</div>
                                </div>
                                <div className="bg-gray-50 border border-[#DAE2E8] p-4 text-center">
                                    <div className="text-2xl sm:text-3xl font-black text-[#D4AF37] mb-1">DX</div>
                                    <div className="text-xs text-[#252423]/70">施工管理</div>
                                </div>
                                <div className="bg-gray-50 border border-[#DAE2E8] p-4 text-center">
                                    <div className="text-2xl sm:text-3xl font-black text-[#82EDA6] mb-1">ツイン</div>
                                    <div className="text-xs text-[#252423]/70">3D納品</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* 底部: 取り組み実績 */}
                    <div className="border-t border-[#DAE2E8] pt-8">
                        <h3 className="text-xl font-bold text-[#252423] mb-6 text-center">私たちの強み</h3>
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                        >
                            <motion.div variants={fadeInUp} className="bg-gray-50 border border-[#DAE2E8] p-4">
                                <div className="text-[#10B981] font-black text-3xl mb-2">AI</div>
                                <div className="text-sm text-[#252423] font-bold mb-1">施工管理</div>
                                <div className="text-xs text-[#252423]/70">デジタル工程管理</div>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="bg-gray-50 border border-[#DAE2E8] p-4">
                                <div className="text-[#D4AF37] font-black text-3xl mb-2">24/7</div>
                                <div className="text-sm text-[#252423] font-bold mb-1">AIアシスタント</div>
                                <div className="text-xs text-[#252423]/70">タクミによるサポート</div>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="bg-gray-50 border border-[#DAE2E8] p-4">
                                <div className="text-[#82EDA6] font-black text-3xl mb-2">ツイン</div>
                                <div className="text-sm text-[#252423] font-bold mb-1">デジタルツイン</div>
                                <div className="text-xs text-[#252423]/70">空間のデータ化</div>
                            </motion.div>
                            <motion.div variants={fadeInUp} className="bg-gray-50 border border-[#DAE2E8] p-4">
                                <div className="text-[#10B981] font-black text-3xl mb-2">30年</div>
                                <div className="text-sm text-[#252423] font-bold mb-1">確かな実績</div>
                                <div className="text-xs text-[#252423]/70">1994年創業の信頼</div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
