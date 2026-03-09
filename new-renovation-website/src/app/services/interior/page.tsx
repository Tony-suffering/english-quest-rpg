import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Home, Building2, Store, Hammer } from 'lucide-react'
import SocialShare from '@/components/website/SocialShare'

export default function InteriorServicePage() {
  const features = [
    '住宅・マンションの新築内装工事',
    '店舗・オフィスの内装デザイン施工',
    '公共施設の内装工事',
    '高品質な仕上げと細部へのこだわり',
    'お客様のご要望に応じた柔軟な対応',
    '熟練職人による確かな施工技術'
  ]

  const workTypes = [
    {
      icon: Home,
      title: '住宅内装工事',
      description: '新築住宅やマンションの内装工事を、お客様のライフスタイルに合わせてご提案します',
      details: ['クロス・壁紙施工', 'フローリング施工', '建具工事', '造作家具']
    },
    {
      icon: Store,
      title: '店舗内装工事',
      description: 'お店のコンセプトを形にする、魅力的な店舗空間をデザイン・施工します',
      details: ['店舗デザイン', '什器製作', 'サイン工事', '照明計画']
    },
    {
      icon: Building2,
      title: 'オフィス内装工事',
      description: '働きやすく生産性の高いオフィス空間を、最新のワークスタイルに合わせて実現します',
      details: ['パーテーション工事', 'OAフロア', '会議室・応接室', 'エントランス']
    },
    {
      icon: Hammer,
      title: 'リノベーション',
      description: '既存の建物に新しい価値を吹き込み、時代に合った空間へと生まれ変わらせます',
      details: ['フルリノベーション', '水回り改修', '間取り変更', 'バリアフリー化']
    },
  ]

  const workFlow = [
    { step: '01', title: 'お問い合わせ', description: 'お電話・メール・Webフォームからお気軽にご相談ください' },
    { step: '02', title: '現地調査', description: '現場を確認し、詳細なヒアリングを行います' },
    { step: '03', title: 'プラン提案', description: 'ご要望に基づいた最適なプランをご提案します' },
    { step: '04', title: 'お見積もり', description: '無料でお見積もりを作成いたします' },
    { step: '05', title: 'ご契約', description: 'お見積もり内容にご納得いただけましたらご契約となります' },
    { step: '06', title: '施工開始', description: '経験豊富な職人が丁寧に施工いたします' },
    { step: '07', title: '完成・お引き渡し', description: '完成検査を行い、お引き渡しいたします' },
    { step: '08', title: 'アフターフォロー', description: '施工後も安心のサポート体制でお客様をサポートします' }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section - Simple dark background */}
      <section className="bg-[#252423] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-black mb-2 border-b-2 border-[#D4AF37] pb-3 inline-block">内装工事</h1>
          <p className="text-sm text-white/70 mt-4">住宅からオフィスまで、あらゆる空間の内装工事に対応</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image and Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mb-12">
            <div>
              <h2 className="text-xl font-black text-[#252423] mb-4 border-b-2 border-[#D4AF37] pb-2 inline-block">確かな技術で、理想の空間を実現</h2>
              <div className="space-y-3 text-sm text-[#252423]/70">
                <p>イワサキ内装は、住宅・マンション・店舗・オフィスなど、あらゆる建物の内装工事を手がけています。</p>
                <p>新築からリフォームまで、お客様のご要望に合わせた最適な施工プランをご提案いたします。</p>
                <p>熟練の職人技術と最新の設備・工法により、高品質な仕上がりをお約束します。</p>
              </div>
            </div>
            <div className="relative h-64 md:h-80 overflow-hidden border border-[#DAE2E8]">
              <img
                src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&auto=format&fit=crop"
                alt="内装工事 - モダンなリビング施工例"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Work Types */}
          <div className="mb-12">
            <h2 className="text-xl font-black text-[#252423] mb-6 border-b-2 border-[#D4AF37] pb-2 inline-block">対応工事</h2>
            <p className="text-sm text-[#252423]/70 mb-6">多様なニーズにお応えする、幅広い施工実績</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workTypes.map((type, index) => {
                const Icon = type.icon
                return (
                  <div key={index} className="bg-white border border-[#DAE2E8] p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#10B981] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-[#252423] mb-2">{type.title}</h3>
                        <p className="text-sm text-[#252423]/70 mb-3">{type.description}</p>
                        <ul className="space-y-1">
                          {type.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-[#252423]/70">
                              <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-xl font-black text-[#252423] mb-6 border-b-2 border-[#D4AF37] pb-2 inline-block">サービスの特徴</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 bg-[#F5F5F5] border border-[#DAE2E8] p-4">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#252423]">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Work Flow */}
          <div className="bg-[#F5F5F5] border border-[#DAE2E8] p-6">
            <h2 className="text-xl font-black text-[#252423] mb-6 border-b-2 border-[#D4AF37] pb-2 inline-block">施工の流れ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workFlow.map((item) => (
                <div key={item.step} className="relative">
                  <div className="text-4xl font-black text-[#D4AF37]/20 mb-2">
                    {item.step}
                  </div>
                  <h3 className="text-base font-bold text-[#252423] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#252423]/70">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#252423] py-12 border-t border-[#DAE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-black text-white mb-2">お見積もり・ご相談は無料です</h2>
          <p className="text-sm text-white/70 mb-6">お気軽にお問い合わせください</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#10B981] text-white px-6 py-3 font-bold hover:bg-[#10B981]/90 transition-colors text-sm border border-[#10B981]"
          >
            お問い合わせ
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SNSシェア */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#DAE2E8] p-4">
            <SocialShare
              title="内装工事 - イワサキ内装"
              description="住宅・マンション・店舗・オフィスまで、あらゆる空間の内装工事に対応。熟練の職人技術で理想の空間を実現します。"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
