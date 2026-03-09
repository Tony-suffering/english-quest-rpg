'use client'

import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import Link from 'next/link'
import { InteriorIcon, ReformIcon, BarrierFreeIcon, ShopDesignIcon, CraftsmanIcon } from '@/components/website/ImprovedIcons'
import { ArrowRight, Images, Calendar, Mail, Users } from 'lucide-react'
import SocialShare from '@/components/website/SocialShare'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, scaleIn } from '@/utils/animations'

export default function ServicesPage() {
  const services = [
    {
      Icon: InteriorIcon,
      title: '内装工事',
      description: '新築・改修施工',
      href: '/services/interior',
      gradient: 'from-emerald-500 to-teal-600',
      bgImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&auto=format&fit=crop'
    },
    {
      Icon: ReformIcon,
      title: 'リフォーム',
      description: '暮らしに対応',
      href: '/services/reform',
      gradient: 'from-teal-500 to-cyan-600',
      bgImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop'
    },
    {
      Icon: BarrierFreeIcon,
      title: 'バリアフリー',
      description: '安心・安全',
      href: '/services/barrier-free',
      gradient: 'from-cyan-500 to-blue-600',
      bgImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&auto=format&fit=crop'
    },
    {
      Icon: ShopDesignIcon,
      title: '店舗デザイン',
      description: 'コンセプトを形に',
      href: '/services/shop-design',
      gradient: 'from-emerald-600 to-green-700',
      bgImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop'
    },
    {
      Icon: Images,
      title: '施工実績',
      description: 'これまでの実績',
      href: '/portfolio',
      gradient: 'from-blue-500 to-indigo-600',
      bgImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&auto=format&fit=crop'
    },
    {
      Icon: Calendar,
      title: 'スケジュール',
      description: '工程管理',
      href: '/projects',
      gradient: 'from-purple-500 to-pink-600',
      bgImage: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop'
    },
    {
      Icon: Mail,
      title: 'お問い合わせ',
      description: '無料相談',
      href: '/contact',
      gradient: 'from-orange-500 to-red-600',
      bgImage: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&auto=format&fit=crop'
    },
    {
      Icon: Users,
      title: '職人ネットワーク',
      description: '50名のプロ',
      href: '/technology/craftsmen',
      gradient: 'from-yellow-500 to-orange-600',
      bgImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop'
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-[#252423] text-white py-12 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-black mb-2">事業案内</h1>
            <p className="text-sm text-gray-300">Services</p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {services.map((service, index) => {
              const Icon = service.Icon
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link href={service.href} className="group h-full block">
                    <div className="relative bg-white border border-[#DAE2E8] p-4 sm:p-6 hover:shadow-lg hover:border-[#10B981] transition-all h-full overflow-hidden">
                      {/* 背景画像（薄く） */}
                      <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity">
                        <img
                          src={service.bgImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* コンテンツ */}
                      <div className="relative z-10">
                        <div className="flex flex-col items-center text-center gap-3">
                          <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-[#252423] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all shadow-md`}>
                            <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-[#252423] mb-1">{service.title}</h3>
                            <p className="text-[#252423]/70 text-xs sm:text-sm">{service.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* SNSシェア */}
      <section className="py-6 bg-[#F5F5F5] border-t border-[#DAE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#DAE2E8] p-4">
            <SocialShare
              title="事業案内 - イワサキ内装"
              description="内装工事・リフォーム・バリアフリー・店舗デザインなど、幅広い施工サービスをご提供しています。"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
