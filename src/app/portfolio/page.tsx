'use client'

import { portfolioData } from '@/data/portfolio-real' // 実際の画像パスを使用
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import { MapPin, Calendar, Tag } from 'lucide-react'
import SocialShare from '@/components/website/SocialShare'

export default function PortfolioPage() {
  // 全件表示（26件）
  const recentPortfolio = portfolioData

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* ヒーローセクション */}
      <section className="bg-[#252423] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-black mb-3 border-b-2 border-[#D4AF37] pb-3 inline-block">
            最近の施工実績【抜粋】
          </h1>
          <p className="text-sm text-white/70 mt-4">Recent Portfolio - 最近の施工実績の中から26件をご紹介します</p>
        </div>
      </section>

      {/* 実績概要 */}
      <section className="py-8 bg-gray-50 border-b border-[#DAE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white border border-[#DAE2E8] p-6 text-center">
              <div className="text-3xl font-black text-[#10B981] mb-2">26件</div>
              <div className="text-sm text-[#252423]/70">最近の施工実績</div>
            </div>
            <div className="bg-white border border-[#DAE2E8] p-6 text-center">
              <div className="text-3xl font-black text-[#D4AF37] mb-2">2024-2025</div>
              <div className="text-sm text-[#252423]/70">施工年度</div>
            </div>
            <div className="bg-white border border-[#DAE2E8] p-6 text-center">
              <div className="text-3xl font-black text-[#82EDA6] mb-2">東京中心</div>
              <div className="text-sm text-[#252423]/70">施工エリア</div>
            </div>
            <div className="bg-white border border-[#DAE2E8] p-6 text-center">
              <div className="text-3xl font-black text-[#10B981] mb-2">内装工事</div>
              <div className="text-sm text-[#252423]/70">専門分野</div>
            </div>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 施工実績カウント */}
          <div className="mb-6">
            <p className="text-sm text-[#252423]/70">
              {recentPortfolio.length}件の施工実績
            </p>
          </div>

          {/* 施工実績一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPortfolio.map((project) => (
              <div key={project.id} className="group bg-white border border-[#DAE2E8] overflow-hidden hover:shadow-xl transition-all">
                {/* 画像 */}
                <div className="relative h-56 overflow-hidden border-b border-[#DAE2E8]">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {project.is_featured && (
                    <span className="absolute top-3 left-3 bg-[#D4AF37] text-white px-3 py-1 text-xs font-bold shadow-lg z-10">
                      注目実績
                    </span>
                  )}
                  {project.area && (
                    <span className="absolute top-3 right-3 bg-[#252423]/80 text-white px-3 py-1 text-xs font-bold z-10">
                      {project.area}
                    </span>
                  )}
                </div>

                {/* コンテンツ */}
                <div className="p-6">
                  {/* カテゴリバッジ */}
                  <div className="inline-block bg-[#10B981]/10 text-[#10B981] px-3 py-1 text-xs font-bold mb-3 border border-[#10B981]/30">
                    {project.category}
                  </div>

                  {/* タイトル */}
                  <h3 className="text-lg font-black text-[#252423] mb-2 group-hover:text-[#10B981] transition-colors">
                    {project.title}
                  </h3>

                  {/* 説明 */}
                  <p className="text-sm text-[#252423]/70 mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* メタ情報 */}
                  <div className="space-y-2 mb-4 pb-4 border-b border-[#DAE2E8]">
                    <div className="flex items-center gap-2 text-xs text-[#252423]/70">
                      <MapPin className="w-4 h-4 text-[#10B981]" />
                      <span className="font-bold">所在地:</span>
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#252423]/70">
                      <Calendar className="w-4 h-4 text-[#10B981]" />
                      <span className="font-bold">完成:</span>
                      <span>{new Date(project.completion_date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' })}</span>
                    </div>
                    {project.work_type && (
                      <div className="flex items-center gap-2 text-xs text-[#252423]/70">
                        <Tag className="w-4 h-4 text-[#10B981]" />
                        <span className="font-bold">工事内容:</span>
                        <span>{project.work_type}</span>
                      </div>
                    )}
                  </div>

                  {/* タグ */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-50 text-[#252423] text-xs border border-[#DAE2E8]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gray-50 border-t border-[#DAE2E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black text-[#252423] mb-4">
            まずはAI職人「タクミ」に<br />相談してみませんか？
          </h2>
          <p className="text-sm text-[#252423]/70 mb-8">
            見積もり相談、施工の疑問、工事の流れなど、<br />
            AIが即座にお答えします。24時間365日対応・無料です。
          </p>
          <div className="flex flex-col gap-4 justify-center items-center">
            <a
              href="/chat"
              className="bg-[#10B981] text-white px-10 py-5 font-bold text-lg hover:bg-[#0ea572] transition-all shadow-lg hover:shadow-xl rounded-full inline-flex items-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              AIタクミに相談する（無料）
            </a>
            <a
              href="/contact"
              className="text-sm text-[#252423]/70 hover:text-[#10B981] transition-colors underline"
            >
              正式なお問い合わせフォームはこちら
            </a>
          </div>
        </div>
      </section>

      {/* SNSシェア */}
      <section className="py-6 bg-white border-t border-[#DAE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#DAE2E8] p-4">
            <SocialShare
              title="施工実績 - イワサキ内装"
              description="マンション改修、店舗デザイン、住宅内装など、確かな技術と信頼で理想の空間を実現します。"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
