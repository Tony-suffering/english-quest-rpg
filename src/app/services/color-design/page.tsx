'use client'

import { useState, useRef, useEffect } from 'react'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowRight, ChevronDown, Play, Quote } from 'lucide-react'
import SocialShare from '@/components/website/SocialShare'

// Case Study Data
const caseStudies = [
  {
    id: 'executive-study',
    title: '集中と創造を両立させる書斎',
    subtitle: 'Executive Study Room',
    image: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/786b3a27-e17d-4528-1068-766053c74c00/public',
    challenge: 'リモートワークで長時間過ごす書斎。集中力を維持しながらも、クリエイティビティを阻害しない空間が必要でした。',
    solution: '彩度を抑えたティールブルーをベースに、照明のケルビン数（4000K）と壁紙の色温度を精密にマッチング。夕方の暖色光でも色味が破綻しないカラーサイエンスを適用。',
    result: '「8時間座っていても疲れない」とクライアント様から評価。生産性が体感30%向上したとのご報告。',
    colorPalette: ['#2D4356', '#435B66', '#A76F6F', '#EAB2A0'],
    tags: ['集中力向上', 'リモートワーク', 'カラーサイエンス']
  },
  {
    id: 'luxury-bedroom',
    title: '呼吸が深くなる寝室設計',
    subtitle: 'Therapeutic Bedroom',
    image: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/776e2c8d-1e10-4800-3d56-53186563e200/public',
    challenge: '不眠に悩むクライアント様。寝室の色彩が睡眠の質に影響しているのではないかとご相談。',
    solution: 'サーカディアンリズムを考慮し、夜間照明下で最もリラックス効果が高い「ミューテッド・ブラッシュ」を採用。天井は0.5トーン明るくし、圧迫感を排除。',
    result: '入眠時間が平均20分短縮。「部屋に入った瞬間、肩の力が抜ける」という体験を創出。',
    colorPalette: ['#D4A5A5', '#F5E6E0', '#9B7E6B', '#4A4A4A'],
    tags: ['睡眠改善', 'リラクゼーション', '心理効果']
  },
  {
    id: 'brand-cafe',
    title: 'ブランドを空間で語るカフェ',
    subtitle: 'Brand Identity Cafe',
    image: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/52a95043-9321-4719-23ca-0a3c851f5600/public',
    challenge: 'オーガニックコーヒーブランドの旗艦店。ブランドカラーのグリーンを「押しつけがましくなく、でも確実に記憶に残る」形で展開したい。',
    solution: 'メイン壁面にはブランドグリーンを25%の彩度で展開し、木材とブラスのアクセントで高級感を演出。照明には演色評価数（CRI）95以上を採用し、商品が最も美しく見える環境を構築。',
    result: 'SNS投稿数が前月比300%増加。「Instagramで見た色そのまま」という声多数。滞在時間も平均15分延長。',
    colorPalette: ['#4A6741', '#D4C5B9', '#8B7355', '#2C2C2C'],
    tags: ['ブランディング', '店舗設計', 'SNS効果']
  }
]

// Target Audience Benefits
const targetBenefits = [
  {
    target: '店舗オーナー様へ',
    headline: 'ブランドカラーを最も美しく見せる空間設計',
    description: '照明の演色性、壁紙の反射率、什器の色温度——すべてを計算し、商品とブランドが最も輝く色彩環境を構築します。',
    image: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/5b17c404-17e8-4070-2cea-44390e919100/public'
  },
  {
    target: '個人宅の方へ',
    headline: '24時間の光の変化を計算した壁紙選び',
    description: '朝日、昼光、夕暮れ、照明——時間帯によって壁の色は驚くほど変わります。どの時間帯でも美しく見える色彩を、科学的にご提案します。',
    image: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/f7eaaa50-e9cd-47b2-8a10-81b309a26300/public'
  },
  {
    target: 'オフィス設計ご担当者様へ',
    headline: '生産性と創造性を両立する色彩心理設計',
    description: '集中エリアには短波長、リフレッシュエリアには長波長——科学的根拠に基づいた色彩ゾーニングで、働く人のパフォーマンスを最大化します。',
    image: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/4e3ac1cc-1b71-47d7-2b77-11a7de4d7800/public'
  },
  {
    target: '医療・福祉施設様へ',
    headline: '患者様・利用者様の心理的負担を軽減する配色',
    description: '緊張を和らげ、安心感を与える色彩設計。エビデンスに基づいた「癒しの空間」を実現します。',
    image: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/b9ef4bbd-f462-4e6b-c63b-fc706664a600/public'
  }
]

// Workflow Process
const processSteps = [
  {
    phase: 'ANALYSIS',
    title: '光環境分析',
    description: '窓の方角、時間帯による光の変化、照明器具のスペック——空間の「光のプロファイル」を徹底的に分析します。',
    image: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/91027c45-5842-4765-70c8-320e73de8e00/public'
  },
  {
    phase: 'DESIGN',
    title: 'カラースキーム設計',
    description: '色彩心理学と光学的特性を融合。「朝・昼・晩」すべての時間帯でシミュレーションした最適解をご提案。',
    image: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/ffe1ebf5-1ff4-4e61-5d09-fff595b77500/public'
  },
  {
    phase: 'PREVIEW',
    title: 'カラープレビュー',
    description: '実際の素材サンプルを、様々な照明条件下でご確認いただきます。「思っていた色と違う」を未然に防止。',
    image: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/59f39e84-e678-4010-9ac9-8701784a1e00/public'
  },
  {
    phase: 'EXECUTION',
    title: '精密施工',
    description: '30年の経験を持つ熟練職人が、デザインを1mmの狂いなく再現。色の繋がり、光の反射まで計算した仕上げ。',
    image: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/00c79d20-963d-4e5a-e867-d7bd6061a000/public'
  }
]

export default function ColorDesignPage() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] overflow-x-hidden">
      <Header />

      {/* ========== CINEMATIC HERO SECTION ========== */}
      <motion.section
        ref={heroRef}
        className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        {/* Background Image with Cinematic Grade */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ scale: heroScale }}
        >
          <img
            src="https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/64cf5a08-ebc3-4858-3ff5-6410ce5e2000/public"
            alt="Cinematic Interior"
            className="w-full h-full object-cover"
          />
          {/* Cinematic Color Grade Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-transparent to-teal-900/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          {/* Film Grain Texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          }} />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-block text-[10px] md:text-xs uppercase tracking-[0.4em] text-amber-400/80 font-light mb-4">
              Color Science × Interior Design
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 leading-tight tracking-tight"
          >
            <span className="block font-extralight">空間に、</span>
            <span className="block font-medium bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent">
              映画のような感情を。
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-base md:text-lg text-white/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            ハリウッド映画で使われるカラーグレーディング技術を、<br className="hidden md:block" />
            内装設計に応用。「壁紙を選ぶ」から<br className="hidden md:block" />
            「空間の感情（ムード）をデザインする」へ。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-amber-100 text-black px-8 py-4 font-medium text-sm tracking-wide hover:bg-white transition-all group"
            >
              無料カラーコンサルティング
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 font-medium text-sm tracking-wide hover:bg-white/20 transition-all border border-white/20"
            >
              <Play className="w-4 h-4" />
              施工事例を見る
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-widest text-white/40">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>

        {/* Cinematic Aspect Ratio Bars (Optional Decorative) */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
      </motion.section>

      {/* ========== PHILOSOPHY SECTION ========== */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/8be30eb4-47b2-4e09-950c-4f7aa96b2300/public"
                  alt="Color Grading Process"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Caption */}
              <div className="absolute -bottom-6 -right-6 bg-amber-100 px-6 py-4 max-w-xs">
                <p className="text-sm font-medium text-black">
                  「色は、空間に命を吹き込む」
                </p>
                <p className="text-xs text-black/60 mt-1">
                  カラーサイエンスに基づく設計
                </p>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400/80 font-light">Our Philosophy</span>
              <h2 className="text-3xl md:text-4xl font-light text-white mt-4 mb-6 leading-tight">
                なぜ、同じ色でも<br />
                <span className="font-medium">印象が全く違う</span>のか？
              </h2>
              <div className="space-y-4 text-white/60 font-light leading-relaxed">
                <p>
                  照明のケルビン数、窓からの光の角度、周囲の色との相互作用——
                  壁紙のカタログで見た色と、実際に貼った色が違って見えるのは、これらの要因が複雑に絡み合うからです。
                </p>
                <p>
                  私たちは、映画やCMの世界で使われる「カラーサイエンス（色彩科学）」を内装設計に導入。
                  朝・昼・晩、すべての時間帯で空間がどう見えるかをシミュレーションし、
                  <span className="text-white">「思っていた色と違った」というリスクを排除</span>します。
                </p>
                <p>
                  単なる壁紙選びではなく、<span className="text-amber-200">空間全体の「感情設計」</span>。
                  それが、次世代の色彩デザインです。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== CASE STUDIES SECTION ========== */}
      <section className="py-24 md:py-32 bg-[#111] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400/80 font-light">Case Studies</span>
            <h2 className="text-3xl md:text-5xl font-light text-white mt-4 mb-6">
              色で変わった、<span className="font-medium">空間の物語</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto font-light">
              「なぜその色にしたのか？」——科学とストーリーで語る、実際の施工事例。
            </p>
          </motion.div>

          {/* Case Study Navigation */}
          <div className="flex justify-center gap-4 mb-12">
            {caseStudies.map((study, index) => (
              <button
                key={study.id}
                onClick={() => setActiveCaseStudy(index)}
                className={`px-6 py-3 text-sm font-light transition-all ${activeCaseStudy === index
                  ? 'bg-amber-100 text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
              >
                {study.subtitle}
              </button>
            ))}
          </div>

          {/* Active Case Study */}
          <motion.div
            key={caseStudies[activeCaseStudy].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden group">
              <img
                src={caseStudies[activeCaseStudy].image}
                alt={caseStudies[activeCaseStudy].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Color Palette Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <span className="text-[10px] uppercase tracking-widest text-white/50 mb-3 block">Color Palette</span>
                <div className="flex gap-2">
                  {caseStudies[activeCaseStudy].colorPalette.map((color, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-sm shadow-lg"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-2 mb-6">
                {caseStudies[activeCaseStudy].tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-[10px] uppercase tracking-wider text-amber-400 border border-amber-400/30">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl md:text-3xl font-light text-white mb-6">
                {caseStudies[activeCaseStudy].title}
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-amber-400 text-sm font-medium mb-2">CHALLENGE</h4>
                  <p className="text-white/60 font-light leading-relaxed">
                    {caseStudies[activeCaseStudy].challenge}
                  </p>
                </div>
                <div>
                  <h4 className="text-amber-400 text-sm font-medium mb-2">SOLUTION</h4>
                  <p className="text-white/60 font-light leading-relaxed">
                    {caseStudies[activeCaseStudy].solution}
                  </p>
                </div>
                <div>
                  <h4 className="text-amber-400 text-sm font-medium mb-2">RESULT</h4>
                  <p className="text-white/60 font-light leading-relaxed">
                    {caseStudies[activeCaseStudy].result}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== TARGET BENEFITS SECTION ========== */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400/80 font-light">For You</span>
            <h2 className="text-3xl md:text-5xl font-light text-white mt-4 mb-6">
              あなたの課題を、<span className="font-medium">色で解決</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {targetBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.target}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={benefit.image}
                    alt={benefit.target}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
                </div>

                {/* Content */}
                <div className="relative p-8 md:p-10 min-h-[320px] flex flex-col justify-end">
                  <span className="text-amber-400 text-sm font-medium mb-2">{benefit.target}</span>
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-3">
                    {benefit.headline}
                  </h3>
                  <p className="text-white/60 font-light leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROCESS SECTION ========== */}
      <section className="py-24 md:py-32 bg-[#111] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400/80 font-light">Our Process</span>
            <h2 className="text-3xl md:text-5xl font-light text-white mt-4 mb-6">
              科学と職人技の<span className="font-medium">融合</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto font-light">
              デザインから施工まで一貫対応。「ズレのない」仕上がりを実現します。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] uppercase tracking-widest text-amber-400/80 font-medium">
                      {step.phase}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-4xl font-light text-white/20">0{index + 1}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== QUOTE SECTION ========== */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 50%, #D4AF37 0%, transparent 50%)',
          }} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Large Quote Mark */}
            <div className="text-[120px] md:text-[200px] font-serif text-amber-400/10 leading-none mb-[-40px] md:mb-[-80px]">
              "
            </div>
            <p className="text-2xl md:text-4xl font-light text-white leading-relaxed mb-8">
              色彩は、空間に命を吹き込む。<br />
              <span className="text-amber-200">私たちは、その魔法を30年間追求してきました。</span>
            </p>

            {/* AI Takumi Character */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <div className="relative">
                <img
                  src="https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/c3e01106-43b4-4d9c-b3af-f799f32e3300/public"
                  alt="AIタクミ"
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-400/50"
                />
                <div className="absolute -bottom-1 -right-1 bg-amber-400 text-black text-[8px] font-bold px-1.5 py-0.5 rounded">
                  AI
                </div>
              </div>
              <div className="text-left">
                <p className="text-white font-medium">AIタクミ</p>
                <p className="text-white/50 text-sm">IWASAKI AI クルー</p>
              </div>
            </div>

            <p className="text-white/30 text-xs mt-8 max-w-md mx-auto">
              ※ このページのコンセプトは、カラーサイエンスとAI技術を融合させた
              次世代の内装設計を目指すイワサキ内装のビジョンを表現しています。
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/34e50651-6449-49f5-36d9-4a8cc798f200/public"
            alt="Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400/80 font-light mb-4 block">
              Begin Your Transformation
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
              色彩で、暮らしを変えませんか？
            </h2>
            <p className="text-xl text-white/60 mb-10 font-light">
              無料カラーコンサルティング受付中
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-amber-100 text-black px-10 py-5 font-medium text-base tracking-wide hover:bg-white transition-all group"
              >
                今すぐ相談する
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-3 bg-transparent text-white px-10 py-5 font-medium text-base tracking-wide border border-white/30 hover:bg-white/10 transition-all"
              >
                施工事例を見る
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== SOCIAL SHARE ========== */}
      <section className="py-8 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <SocialShare
              title="空間に、映画のような感情を。| イワサキ内装"
              description="ハリウッド映画で使われるカラーグレーディング技術を内装設計に応用。プロのカラーサイエンスが創る、次世代の色彩設計。"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
