'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Phone, ArrowRight, Truck, Package, MessageCircle, ShieldCheck, Snowflake, Award, CheckCircle2, MapPin, Clock, Star, Heart, Zap, Users, Shield, ThumbsUp, Quote } from 'lucide-react'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import { NAGAHAMA_PARTNER } from '@/data/partners/nagahama-cloth'
import { motion } from 'framer-motion'

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
}

const fadeInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
}

const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
}

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
}

// アイコンマッピング
const reasonIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
    truck: Truck,
    package: Package,
    phone: MessageCircle,
    shield: ShieldCheck,
    snowflake: Snowflake,
    award: Award,
}

export default function NagahamaClothPage() {
    const data = NAGAHAMA_PARTNER
    const rec = data.recommendation

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            {/* Hero - 映画的なフルスクリーン */}
            <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
                {/* 背景画像 */}
                <div className="absolute inset-0">
                    <Image
                        src={data.images.hero}
                        alt="永浜クロス - 内装素材"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/98 via-[#0a0a0a]/85 to-[#0a0a0a]/50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                </div>

                {/* コンテンツ */}
                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-3xl"
                    >
                        {/* ラベル */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex items-center gap-4 mb-6"
                        >
                            <span className="inline-flex items-center gap-2 bg-[#D4AF37]/20 text-[#D4AF37] text-xs uppercase tracking-[0.2em] px-4 py-2 border border-[#D4AF37]/40 backdrop-blur-sm">
                                <Heart className="w-3 h-3" />
                                いい会社だから紹介したい
                            </span>
                        </motion.div>

                        {/* タイトル */}
                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-[0.95]"
                        >
                            {data.name.replace('株式会社', '')}
                            <span className="block text-lg md:text-xl font-normal text-white/40 mt-4 tracking-normal">株式会社</span>
                        </motion.h1>

                        {/* キャッチコピー */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-2xl md:text-4xl text-[#D4AF37] font-light mb-8 leading-tight"
                        >
                            {data.tagline}
                        </motion.p>

                        {/* メタ情報 */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-wrap items-center gap-6 text-white/60 text-sm mb-10"
                        >
                            <span className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#D4AF37]" />
                                {data.since}
                            </span>
                            <span className="w-px h-4 bg-white/20" />
                            <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                                {data.area}
                            </span>
                        </motion.div>

                        {/* カテゴリタグ */}
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
                            {data.categories.map((cat) => (
                                <span
                                    key={cat}
                                    className="bg-white/5 backdrop-blur-sm text-white/70 text-sm px-4 py-2 border border-white/10 hover:border-[#D4AF37]/50 transition-colors"
                                >
                                    {cat}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>

                {/* スクロールインジケーター */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                >
                    <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
                    <div className="w-px h-16 bg-gradient-to-b from-[#D4AF37] to-transparent" />
                </motion.div>
            </section>

            {/* 数字で見る永浜 */}
            <section className="py-0 bg-[#0a0a0a] relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {data.strengths.map((strength, index) => (
                            <motion.div
                                key={strength.label}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                                transition={{ delay: index * 0.15 }}
                                className="relative p-10 md:p-12 border-b md:border-b-0 md:border-r border-white/5 last:border-r-0 group hover:bg-white/5 transition-colors"
                            >
                                <div className="absolute top-10 left-10 text-6xl font-black text-white/5 select-none">
                                    0{index + 1}
                                </div>
                                <div className="relative">
                                    <p className="text-[#D4AF37] text-3xl md:text-4xl font-black mb-3">{strength.label}</p>
                                    <p className="text-white/60 text-sm leading-relaxed">{strength.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* イワサキの想い - エモーショナルセクション */}
            <section className="py-24 md:py-40 bg-[#0a0a0a] relative overflow-hidden">
                {/* 装飾 */}
                <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#D4AF37]/5 to-transparent" />
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px]" />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        transition={{ duration: 0.8 }}
                    >
                        {/* 引用符 */}
                        <Quote className="w-16 h-16 text-[#D4AF37]/30 mb-8" />

                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-12">
                            {rec.headline}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-12 items-end">
                            <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                                {rec.intro}
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-px bg-gradient-to-r from-[#D4AF37] to-transparent" />
                                <div>
                                    <p className="text-white/40 text-sm">岩崎内装</p>
                                    <p className="text-[#D4AF37] text-sm font-medium">代表 岩崎</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 推薦理由 - 圧倒的なカードデザイン */}
            <section className="py-24 md:py-32 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* セクションヘッダー */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <span className="inline-block text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-4">
                            Why We Recommend
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black text-[#0a0a0a] mb-6">
                            永浜を選ぶ6つの理由
                        </h2>
                        <p className="text-stone-600 max-w-2xl mx-auto">
                            長年の付き合いで実感した、永浜クロスの真価。<br />
                            これは営業トークではない。職人の本音だ。
                        </p>
                    </motion.div>

                    {/* カードグリッド */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {rec.reasons.map((reason, index) => {
                            const Icon = reasonIcons[reason.icon || 'package'] || Package
                            return (
                                <motion.div
                                    key={reason.title}
                                    variants={fadeInUp}
                                    className="group relative bg-gradient-to-br from-stone-50 to-white p-8 lg:p-10 hover:shadow-2xl transition-all duration-500 border border-stone-100 hover:border-[#D4AF37]/30 overflow-hidden"
                                >
                                    {/* 番号 */}
                                    <div className="absolute top-6 right-6 text-5xl font-black text-stone-100 group-hover:text-[#D4AF37]/20 transition-colors select-none">
                                        0{index + 1}
                                    </div>

                                    {/* ホバーライン */}
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-[#B8960C] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

                                    <div className="relative">
                                        {/* アイコン */}
                                        <div className="w-16 h-16 bg-[#0a0a0a] flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-300">
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>

                                        {/* タイトル */}
                                        <h3 className="text-xl font-bold text-[#0a0a0a] mb-4 group-hover:text-[#D4AF37] transition-colors">
                                            {reason.title}
                                        </h3>

                                        {/* 詳細 */}
                                        <p className="text-stone-600 leading-relaxed text-sm">
                                            {reason.detail}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </section>

            {/* 配送の信頼性 - シネマティック */}
            <section className="relative">
                <div className="grid lg:grid-cols-2">
                    <motion.div
                        className="relative h-[500px] lg:h-[700px]"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInLeft}
                    >
                        <Image
                            src={data.images.delivery}
                            alt="永浜クロス 配送サービス"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a] lg:block hidden" />
                    </motion.div>
                    <motion.div
                        className="bg-[#0a0a0a] text-white p-12 lg:p-20 flex items-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInRight}
                    >
                        <div className="max-w-lg">
                            <span className="inline-flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-6">
                                <Zap className="w-4 h-4" />
                                Reliable Delivery
                            </span>
                            <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                                「急ぎ」に強い<br />
                                <span className="text-[#D4AF37]">信頼の配送力</span>
                            </h3>
                            <p className="text-white/70 leading-relaxed mb-8 text-lg">
                                現場は予定通りにいかない。追加が出る、足りなくなる。<br />
                                そんな時、永浜は動いてくれる。
                            </p>
                            <p className="text-white/70 leading-relaxed mb-10 text-lg">
                                配送員の質が違う。壁紙も床材も、雑に扱われたら終わり。<br />
                                永浜の配送員は素材の扱いを分かっている。
                            </p>

                            <div className="flex items-center gap-4 p-6 bg-white/5 border-l-4 border-[#D4AF37]">
                                <CheckCircle2 className="w-8 h-8 text-[#D4AF37] flex-shrink-0" />
                                <p className="text-xl text-white font-medium">
                                    「明日届けます」が<span className="text-[#D4AF37]">本当に届く</span>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 職人の声 - 引用セクション */}
            <section className="py-32 md:py-48 bg-gradient-to-br from-stone-100 to-white relative overflow-hidden">
                {/* 装飾 */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent" />
                <div className="absolute -top-20 -left-20 text-[400px] font-serif leading-none text-[#0a0a0a]/[0.02] select-none pointer-events-none">
                    "
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center"
                    >
                        <blockquote className="relative z-10">
                            <p className="text-3xl md:text-5xl lg:text-6xl text-[#0a0a0a] font-bold leading-tight mb-16">
                                {rec.craftsmanNote}
                            </p>
                            <footer className="flex items-center justify-center gap-6">
                                <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#0a0a0a] rounded-full flex items-center justify-center">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-stone-400 text-sm block">
                                            岩崎内装
                                        </span>
                                        <span className="text-[#0a0a0a] font-bold">
                                            職人たちの声
                                        </span>
                                    </div>
                                </div>
                                <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
                            </footer>
                        </blockquote>
                    </motion.div>
                </div>
            </section>

            {/* NCブランド - 素材の質 */}
            <section className="relative">
                <div className="grid lg:grid-cols-2">
                    <motion.div
                        className="bg-stone-100 p-12 lg:p-20 flex items-center order-2 lg:order-1"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInLeft}
                    >
                        <div className="max-w-lg">
                            <span className="inline-flex items-center gap-2 text-[#D4AF37] text-xs uppercase tracking-[0.3em] mb-6">
                                <Award className="w-4 h-4" />
                                Quality Materials
                            </span>
                            <h3 className="text-4xl md:text-5xl font-black text-[#0a0a0a] mb-8 leading-tight">
                                NCブランド<br />
                                <span className="text-[#D4AF37]">品質と価格の両立</span>
                            </h3>
                            <p className="text-stone-600 leading-relaxed mb-8 text-lg">
                                オリジナルブランドの品質がいい。<br />
                                メーカー品と遜色ないのに価格が抑えられる。
                            </p>
                            <p className="text-stone-600 leading-relaxed mb-10 text-lg">
                                メーカーじゃなくて商社だから、<br />
                                自社製品を売りつける必要がない。
                            </p>

                            <div className="flex items-center gap-4 p-6 bg-white border-l-4 border-[#D4AF37]">
                                <ThumbsUp className="w-8 h-8 text-[#D4AF37] flex-shrink-0" />
                                <p className="text-xl text-[#0a0a0a] font-medium">
                                    お客さんに<span className="text-[#D4AF37]">良いものを安く</span>提案できる
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="relative h-[500px] lg:h-[700px] order-1 lg:order-2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInRight}
                    >
                        <Image
                            src={data.images.materials}
                            alt="永浜クロス 素材サンプル"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-stone-100 lg:block hidden" />
                    </motion.div>
                </div>
            </section>

            {/* 結論セクション */}
            <section className="py-32 md:py-40 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#B8960C] mx-auto mb-16" />
                        <p className="text-2xl md:text-4xl lg:text-5xl text-[#0a0a0a] leading-relaxed font-medium">
                            {rec.conclusion}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CTA - プレミアム */}
            <section className="py-32 bg-[#0a0a0a] relative overflow-hidden">
                {/* 背景装飾 */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D4AF37]/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-[#D4AF37]/10 to-transparent" />
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center"
                    >
                        <Star className="w-12 h-12 text-[#D4AF37] mx-auto mb-8" />
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            {data.cta.message}
                        </h2>
                        <p className="text-white/60 mb-16 text-lg max-w-2xl mx-auto">
                            {data.cta.note}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <a
                                href={data.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-4 px-12 py-6 bg-gradient-to-r from-[#D4AF37] to-[#B8960C] text-[#0a0a0a] font-bold text-lg hover:from-white hover:to-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            >
                                公式サイトを見る
                                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href={`tel:${data.tokyoStore.phone.replace(/-/g, '')}`}
                                className="group inline-flex items-center justify-center gap-4 px-12 py-6 border-2 border-white/30 text-white hover:bg-white hover:text-[#0a0a0a] transition-all duration-300 font-bold text-lg hover:-translate-y-1"
                            >
                                <Phone className="w-5 h-5" />
                                東京店 {data.tokyoStore.phone}
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* 免責事項 */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                    <p className="text-white/30 text-xs text-center leading-relaxed">
                        ※ 本ページは岩崎内装が個人的におすすめする会社の紹介です。<br />
                        正式なビジネス提携や契約関係を結んでいるわけではありません。<br />
                        良い会社だから、純粋に紹介したい。ただそれだけです。
                    </p>
                </div>
            </section>

            {/* Back Link */}
            <section className="py-12 bg-white border-t border-stone-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-4 text-stone-600 hover:text-[#D4AF37] transition-colors group"
                    >
                        <div className="w-12 h-12 rounded-full border border-stone-300 flex items-center justify-center group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-all">
                            <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        </div>
                        <span className="font-medium text-lg">事業案内に戻る</span>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
