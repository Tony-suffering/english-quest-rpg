'use client'

import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import { motion } from 'framer-motion'
import { ArrowRight, Box, Layers, Smartphone, Database, ShieldCheck, Sparkles, MessageSquare, Terminal, Command } from 'lucide-react'
import RealDigitalTwinViewer from '@/components/website/RealDigitalTwinViewer'

export default function DigitalTwinPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-black overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10B981" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#10B981]/10 text-[#10B981] px-4 py-1 rounded-full text-sm font-bold mb-6 border border-[#10B981]/30 font-mono">
                            <Terminal className="w-4 h-4" />
                            Nano Banana Pro Interface
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                            AIプロンプト<br className="md:hidden" />ジェネレーター
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            あなたの抽象的なイメージを、Nano Banana Proへの<br />
                            「最適な指示（プロンプト）」に変換。<br />
                            プロフェッショナルな生成AI操作を、すべての人に。
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Simulator Area */}
                    <div className="mb-20">
                        <RealDigitalTwinViewer />
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mb-6">
                                <Command className="w-6 h-6 text-[#10B981]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">プロンプトエンジニアリング</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                「北欧風」といった一言から、照明、素材、構図、レンダリング設定まで含んだ
                                高度なプロンプトを自動生成します。
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-black/5 rounded-lg flex items-center justify-center mb-6">
                                <Box className="w-6 h-6 text-black" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">空間コンテキスト認識</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                3Dモデルをコンテキストとして参照。
                                部屋の構造や広さを考慮した上で、最適なリノベーション案を言語化します。
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center mb-6">
                                <Sparkles className="w-6 h-6 text-[#3B82F6]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Nano Banana Pro連携</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                生成されたコードをコピーして、Nano Banana Proに入力するだけ。
                                誰でもプロフェッショナルなパース画像を作成可能です。
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    )
}
