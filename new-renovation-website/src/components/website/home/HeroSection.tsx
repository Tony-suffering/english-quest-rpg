'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { heroImages } from '@/data/home-data'
import { heroText, fadeIn } from '@/utils/animations'

export default function HeroSection() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [showImage, setShowImage] = useState(false)

    useEffect(() => {
        // 動画終了前にフェードアウト→画像表示 (Simulation)
        const timer = setTimeout(() => {
            setShowImage(true)
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (!showImage) return

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
        }, 5000)

        return () => {
            clearInterval(interval)
        }
    }, [showImage])

    return (
        <section className="pt-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden rounded-3xl shadow-2xl">
                    {/* 背景画像レイヤー */}
                    <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden bg-gray-900">
                        <AnimatePresence mode="popLayout">
                            {showImage && (
                                <motion.div
                                    key={currentImageIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={heroImages[currentImageIndex]}
                                        alt={`イワサキ内装施工例 ${currentImageIndex + 1}`}
                                        className="w-full h-full object-cover"
                                        loading="eager"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* 進捗インジケーター */}
                        {showImage && (
                            <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2 px-4 z-30">
                                {heroImages.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-2 rounded-full transition-all duration-500 ${idx === currentImageIndex
                                            ? 'w-8 bg-[#D4AF37]'
                                            : 'w-2 bg-white/50'
                                            }`}
                                    ></div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* オーバーレイ */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#252423]/50 via-[#252423]/60 to-[#252423]/70 z-10 rounded-3xl"></div>

                    <div className="relative z-20 px-4 sm:px-6 lg:px-8 text-center">
                        {/* メインタイトル */}
                        <motion.h1
                            custom={0}
                            variants={heroText}
                            initial="hidden"
                            animate="visible"
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#FFFFFF] font-black leading-tight mb-8 drop-shadow-2xl"
                        >
                            <span className="text-[#E8B4B8]">色彩</span>×<span className="text-[#A8D5BA]">職人技</span>×<span className="text-[#B8C5E8]">AI</span>が、<br className="hidden sm:block" />暮らしを変える
                        </motion.h1>

                        <motion.p
                            custom={1}
                            variants={heroText}
                            initial="hidden"
                            animate="visible"
                            className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#FFFFFF]/90 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto drop-shadow-lg font-light tracking-wide"
                        >
                            色彩設計のプロと確かな施工技術。そして、その奥にある「意識」が、理想の空間を創造する。
                        </motion.p>

                        <motion.div
                            custom={2}
                            variants={heroText}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
                        >
                            {/* LINE友だち追加ボタン */}
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="https://lin.ee/T0J6Y7YD"
                                className="group bg-[#06C755] text-[#FFFFFF] px-6 py-3 sm:px-8 sm:py-3 font-bold text-sm sm:text-base hover:bg-[#05b04d] transition-colors shadow-lg rounded-full whitespace-nowrap flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                </svg>
                                <span>LINEで相談する</span>
                            </motion.a>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/contact" className="group bg-[#FFFFFF]/10 backdrop-blur-md text-[#FFFFFF] px-6 py-3 sm:px-8 sm:py-3 font-bold text-sm sm:text-base hover:bg-[#FFFFFF]/20 transition-all border border-[#FFFFFF]/30 hover:border-[#D4AF37] rounded-full whitespace-nowrap flex items-center justify-center">
                                    お問い合わせ
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Philosophical Tagline */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3, duration: 2 }}
                        className="absolute bottom-4 right-6 z-20 hidden sm:block"
                    >
                        <p className="text-[10px] sm:text-xs text-white/30 font-serif tracking-[0.2em] italic">
                            意識は現象に先立つ
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
