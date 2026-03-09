'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Box, Layers, Smartphone, Database, ShieldCheck, Sparkles, MessageSquare, Terminal, Command, Cpu, Network, Check, AlertTriangle } from 'lucide-react'
import RealDigitalTwinViewer from '@/components/website/RealDigitalTwinViewer'
import CyberBackground from '@/components/website/CyberBackground'
import GlitchText from '@/components/website/GlitchText'
import MatrixOverlay from '@/components/website/MatrixOverlay'

export default function DigitalTwinPage() {
    const [matrixMode, setMatrixMode] = useState(false)
    const [konamiCode, setKonamiCode] = useState<string[]>([])
    const [godMode, setGodMode] = useState(false)

    // Konami Code Listener
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const code = e.key
            setKonamiCode(prev => {
                const newCode = [...prev, code].slice(-10)
                const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

                if (JSON.stringify(newCode) === JSON.stringify(konami)) {
                    setGodMode(true)
                    alert('GOD MODE ENABLED: Infinite Budget & Zero Gravity')
                }
                return newCode
            })
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <div className={`min-h-screen bg-white ${godMode ? 'invert' : ''} transition-all duration-1000`}>
            {matrixMode && <MatrixOverlay />}

            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-black overflow-hidden min-h-[60vh] flex items-center">
                <CyberBackground />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-left"
                        >
                            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 text-[#10B981] px-4 py-1 rounded-full text-sm font-bold mb-6 border border-[#10B981]/30 font-mono backdrop-blur-md">
                                <Terminal className="w-4 h-4" />
                                Nano Banana Pro Interface v2.0
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#3B82F6]">AI</span> ×
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]"> 空間認識</span><br />
                                <GlitchText text="次世代プロンプト生成" />
                            </h1>
                            <p className="text-xl text-gray-400 max-w-xl leading-relaxed mb-8">
                                3Dスキャンされた空間データを解析し、
                                Nano Banana Proへの「最適な指示」を自動生成。
                                専門知識不要で、プロフェッショナルな空間デザインを実現します。
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button className="bg-[#10B981] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#059669] transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2 group">
                                    今すぐ体験する
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={() => setMatrixMode(!matrixMode)}
                                    className={`px-8 py-4 rounded-lg font-bold transition-all backdrop-blur-md border flex items-center gap-2 ${matrixMode ? 'bg-red-500 text-white border-red-500 animate-pulse' : 'bg-white/10 text-white border-white/10 hover:bg-red-500/20 hover:border-red-500 hover:text-red-500'}`}
                                >
                                    <AlertTriangle className="w-5 h-5" />
                                    {matrixMode ? 'SYSTEM CRITICAL' : 'DO NOT PRESS'}
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            {/* Abstract 3D Representation */}
                            <div className="relative w-full aspect-square max-w-md mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/20 to-[#3B82F6]/20 rounded-full blur-3xl animate-pulse" />
                                <div className="relative z-10 border border-white/10 bg-black/50 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
                                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                            <div className="w-3 h-3 rounded-full bg-green-500" />
                                        </div>
                                        <div className="text-xs text-gray-500 font-mono">system_status: {matrixMode ? <span className="text-red-500 font-bold animate-pulse">CRITICAL ERROR</span> : 'active'}</div>
                                    </div>
                                    <div className="space-y-3 font-mono text-sm">
                                        <div className="flex justify-between text-gray-400">
                                            <span>&gt; Initializing Lidar Scan...</span>
                                            <span className="text-[#10B981]">DONE</span>
                                        </div>
                                        <div className="flex justify-between text-gray-400">
                                            <span>&gt; Analyzing Geometry...</span>
                                            <span className="text-[#10B981]">DONE</span>
                                        </div>
                                        <div className="flex justify-between text-gray-400">
                                            <span>&gt; Generating Prompt...</span>
                                            <span className="text-[#3B82F6] animate-pulse">PROCESSING</span>
                                        </div>
                                        <div className="mt-4 p-3 bg-black/50 rounded border border-[#10B981]/30 text-[#10B981] text-xs">
                                            {matrixMode ?
                                                <span className="text-red-500 font-bold">
                                                    FATAL ERROR: REALITY_DISTORTION_DETECTED<br />
                                                    INITIATING EMERGENCY PROTOCOL...
                                                </span>
                                                :
                                                "/imagine prompt: modern living room, minimal design, natural light..."
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 bg-gray-50 relative">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    {/* Simulator Area */}
                    <div className="mb-20 -mt-20">
                        <RealDigitalTwinViewer />
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {[
                            {
                                icon: Command,
                                color: "#10B981",
                                title: "プロンプトエンジニアリング",
                                desc: "「北欧風」といった一言から、照明、素材、構図、レンダリング設定まで含んだ高度なプロンプトを自動生成します。"
                            },
                            {
                                icon: Box,
                                color: "#3B82F6",
                                title: "空間コンテキスト認識",
                                desc: "3Dモデルをコンテキストとして参照。部屋の構造や広さを考慮した上で、最適なリノベーション案を言語化します。"
                            },
                            {
                                icon: Sparkles,
                                color: "#8B5CF6",
                                title: "Nano Banana Pro連携",
                                desc: "生成されたコードをコピーして、Nano Banana Proに入力するだけ。誰でもプロフェッショナルなパース画像を作成可能です。"
                            }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all perspective-1000 group"
                            >
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors group-hover:scale-110 duration-300`} style={{ backgroundColor: `${feature.color}20` }}>
                                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#10B981] transition-colors">{feature.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Tech Specs / Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-black text-gray-900">
                                最先端の<span className="text-[#10B981]">LIDAR技術</span>と<br />
                                生成AIの融合
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                iPhone Pro等のLIDARセンサーで取得した点群データを、独自のアルゴリズムで解析。
                                壁、床、天井、家具をセマンティックに認識し、それらの関係性を理解した上で
                                画像生成AIへの指示出しを行います。
                            </p>

                            <div className="space-y-4">
                                {[
                                    "点群データの自動メッシュ化",
                                    "セマンティックセグメンテーション",
                                    "自然言語処理による意図理解",
                                    "リアルタイムプレビュー"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-[#10B981]" />
                                        </div>
                                        <span className="font-bold text-gray-800">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#10B981] to-[#3B82F6] rounded-2xl rotate-3 opacity-20 blur-lg" />
                            <div className="bg-gray-900 rounded-2xl p-6 relative text-white font-mono text-sm shadow-2xl border border-gray-800">
                                <div className="flex gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="space-y-2 opacity-80">
                                    <div className="text-[#10B981]">$ scanning_process --init</div>
                                    <div>&gt; Target: Living Room</div>
                                    <div>&gt; Points: 1,240,592 detected</div>
                                    <div>&gt; Surfaces: Wall(4), Floor(1), Ceiling(1)</div>
                                    <div className="text-[#3B82F6]">$ analyzing_context</div>
                                    <div>&gt; Style: Modern Minimalist</div>
                                    <div>&gt; Lighting: Natural + Ambient</div>
                                    <div className="text-[#8B5CF6]">$ generating_prompt</div>
                                    <div className="pl-4 border-l-2 border-[#8B5CF6] mt-2 italic text-gray-400">
                                        &quot;Ultra-realistic modern living room, sun-drenched, oak flooring, white matte walls, accent yellow wall...&quot;
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer / Humor */}
                    <div className="mt-20 border-t border-dashed border-gray-300 pt-12 text-center">
                        <div className="inline-block bg-gray-100 rounded-full px-6 py-2 text-sm text-gray-500 font-mono mb-4">
                            Experimental Feature / Concept Art
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed max-w-2xl mx-auto">
                            ※ 本ページで紹介している「Nano Banana Pro Interface」および「デジタルツイン連携機能」は、
                            イワサキ内装の未来への技術的野心と、ちょっとした遊び心を表現したコンセプトモデルです。<br />
                            実際の施工現場でレーザービームが出ることはありませんし、AIが勝手に壁の色を変えることも（今のところ）ありません。<br />
                            でも、いつか本当に実現するかもしれませんね。
                        </p>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    )
}
