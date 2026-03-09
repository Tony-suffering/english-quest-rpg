'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, Zap, Globe, Image as ImageIcon, ChevronRight, ChevronLeft, Play } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import WorldGenDemo from '@/components/website/WorldGenDemo'

const SHOWCASE_ITEMS = [
    {
        id: 'zen',
        title: 'Fantasy Zen Garden',
        category: 'Nature / Fantasy',
        image: '/images/showcase/zen-garden.png', // Using the generated image
        prompt: 'A surreal, ethereal Japanese Zen garden floating in the sky...'
    },
    {
        id: 'cyberpunk',
        title: 'Neo-Tokyo Cyberpunk',
        category: 'Sci-Fi / Urban',
        image: 'https://images.unsplash.com/photo-1577134588785-3d855060862d?q=80&w=2070&auto=format&fit=crop', // Placeholder
        prompt: 'Futuristic Cyberpunk Neo-Tokyo city at night, neon lights...'
    },
    {
        id: 'luxury',
        title: 'Modern Luxury Interior',
        category: 'Architecture / Interior',
        image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop', // Placeholder
        prompt: 'Hyper-realistic, ultra-modern luxury living room interior...'
    }
]

export default function WorldGeneratorPage() {
    const [activeSlide, setActiveSlide] = useState(0)
    const [showDemo, setShowDemo] = useState(false)

    const nextSlide = () => setActiveSlide((prev) => (prev + 1) % SHOWCASE_ITEMS.length)
    const prevSlide = () => setActiveSlide((prev) => (prev - 1 + SHOWCASE_ITEMS.length) % SHOWCASE_ITEMS.length)

    // Auto-advance slides
    useEffect(() => {
        if (showDemo) return
        const timer = setInterval(nextSlide, 5000)
        return () => clearInterval(timer)
    }, [showDemo])

    return (
        <div className="min-h-screen bg-black text-white selection:bg-amber-500/30 font-sans">
            
            {/* Background Elements */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-black to-black" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>

            {/* Navbar Placeholder (Assuming global layout handles this, but adding spacing) */}
            <div className="h-20" />

            {/* Hero Section with Visual Showcase */}
            <section className="relative z-10 pt-10 pb-20 px-4">
                <div className="container mx-auto max-w-7xl">
                    
                    {/* Text Content */}
                    <div className="text-center mb-16">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-mono mb-6 tracking-wider"
                        >
                            <Sparkles className="w-3 h-3" />
                            MARBLE AI ENGINE V1.0
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-8xl font-bold mb-8 tracking-tight leading-tight"
                        >
                            想像を、<br className="md:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700">創造へ。</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
                        >
                            言葉ひとつ、画像一枚から。<br />
                            AIが構築する、あなただけの「歩ける」3D世界。
                        </motion.p>
                    </div>

                    {/* Main Visual Showcase (Carousel) */}
                    <div className="relative max-w-6xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl group">
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={activeSlide}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.7 }}
                                className="absolute inset-0"
                            >
                                <Image 
                                    src={SHOWCASE_ITEMS[activeSlide].image} 
                                    alt={SHOWCASE_ITEMS[activeSlide].title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Slide Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row justify-between items-end gap-6">
                            <div>
                                <motion.div 
                                    key={`cat-${activeSlide}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-amber-500 text-xs font-mono mb-2"
                                >
                                    {SHOWCASE_ITEMS[activeSlide].category}
                                </motion.div>
                                <motion.h3 
                                    key={`title-${activeSlide}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-3xl md:text-5xl font-bold text-white mb-2"
                                >
                                    {SHOWCASE_ITEMS[activeSlide].title}
                                </motion.h3>
                                <motion.p 
                                    key={`prompt-${activeSlide}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-gray-400 text-sm max-w-lg line-clamp-2 font-mono"
                                >
                                    Prompt: "{SHOWCASE_ITEMS[activeSlide].prompt}"
                                </motion.p>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center gap-4">
                                <button onClick={prevSlide} className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors border border-white/10">
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button onClick={nextSlide} className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors border border-white/10">
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Try It Button */}
                    <div className="flex justify-center mt-12">
                        <button 
                            onClick={() => setShowDemo(!showDemo)}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all hover:scale-105"
                        >
                            <Play className="w-5 h-5 fill-current" />
                            {showDemo ? 'デモを閉じる' : 'インタラクティブデモを試す'}
                        </button>
                    </div>

                </div>
            </section>

            {/* Interactive Demo Section (Collapsible) */}
            <AnimatePresence>
                {showDemo && (
                    <motion.section 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-gray-900/50 border-y border-gray-800"
                    >
                        <div className="container mx-auto px-4 py-16">
                            <div className="max-w-5xl mx-auto">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold mb-2">Realtime Simulation</h2>
                                    <p className="text-gray-400 text-sm">ブラウザ上で簡易的な生成プロセスを体験できます。</p>
                                </div>
                                <WorldGenDemo />
                            </div>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Features Grid */}
            <section className="py-32 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Marble?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            従来の3Dモデリングの常識を覆す、AIによる革命的なワークフロー。
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {[
                            {
                                icon: ImageIcon,
                                title: "Image to World",
                                description: "1枚の2D写真をアップロードするだけ。AIが奥行き、照明、隠れた形状を推論し、完全な3Dシーンを構築します。"
                            },
                            {
                                icon: Globe,
                                title: "Walkable Spaces",
                                description: "従来の3Dモデルとは異なり、生成された世界は探索可能です。自由に移動し、あらゆる角度から空間を体験できます。"
                            },
                            {
                                icon: Zap,
                                title: "Instant Generation",
                                description: "最先端の生成モデルにより、複雑な環境も数日ではなく、数秒で構築されます。"
                            }
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 p-10 rounded-3xl hover:border-amber-500/30 transition-all hover:bg-gray-900/50 group"
                            >
                                <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-500/10 transition-colors group-hover:scale-110 duration-300">
                                    <feature.icon className="w-7 h-7 text-gray-400 group-hover:text-amber-500 transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 border-t border-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-900/5" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">未来を、実装しよう。</h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        Marble AIは現在クローズドベータ版です。<br />
                        先行アクセスに登録して、誰よりも早く体験してください。
                    </p>
                    <Link 
                        href="/contact"
                        className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                        早期アクセスに申し込む
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    )
}
