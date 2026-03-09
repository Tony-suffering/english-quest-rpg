import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Store, Palette, Users, TrendingUp } from 'lucide-react'
import SocialShare from '@/components/website/SocialShare'

export default function ShopDesignPage() {
  const services = [
    {
      icon: Palette,
      title: 'コンセプト設計',
      description: 'お店の個性を最大限に引き出すデザインコンセプトを策定',
    },
    {
      icon: Store,
      title: '什器・家具製作',
      description: 'オリジナル什器や家具で、唯一無二の店舗空間を実現',
    },
    {
      icon: TrendingUp,
      title: '集客動線設計',
      description: 'お客様の回遊性を高める、戦略的なレイアウト設計',
    },
    {
      icon: Users,
      title: 'ブランディング',
      description: '店舗デザインを通じて、ブランド価値を向上させます',
    },
  ]

  const shopTypes = [
    '飲食店（カフェ・レストラン・居酒屋）',
    '物販店（アパレル・雑貨・食品）',
    'サービス業（美容室・サロン・クリニック）',
    'オフィス（事務所・ショールーム）',
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section - Simple dark background */}
      <section className="bg-[#252423] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-black mb-2 border-b-2 border-[#D4AF37] pb-3 inline-block">店舗デザイン・施工</h1>
          <p className="text-sm text-white/70 mt-4">Shop Design & Construction</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image Section - No rounded corners */}
          <div className="mb-12">
            <div className="relative h-64 md:h-80 overflow-hidden mb-6 border border-[#DAE2E8]">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop"
                alt="店舗デザイン - おしゃれなカフェやショップの内装"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-black text-[#252423] mb-2">お店のコンセプトを、空間で表現する</h2>
            <p className="text-sm text-[#252423]/70">集客力を高める魅力的な店舗空間を、デザインから施工まで一貫してサポートします</p>
          </div>

          {/* Services Grid - Square corners, thin borders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="bg-[#10B981]/5 border border-[#DAE2E8] p-4 hover:shadow-lg transition-shadow">
                  <div className="w-8 h-8 bg-[#10B981] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-[#252423] mb-2">{service.title}</h3>
                  <p className="text-sm text-[#252423]/70">{service.description}</p>
                </div>
              )
            })}
          </div>

          {/* Shop Types - Clean list style */}
          <div className="bg-[#F5F5F5] border border-[#DAE2E8] p-6">
            <h3 className="text-xl font-black text-[#252423] mb-4 border-b-2 border-[#D4AF37] pb-2 inline-block">対応店舗タイプ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              {shopTypes.map((type, index) => (
                <div key={index} className="flex items-center gap-3 bg-white border border-[#DAE2E8] p-3">
                  <div className="w-5 h-5 bg-[#10B981] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-[#252423]">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Dark with thin border */}
      <section className="bg-[#252423] py-12 border-t border-[#DAE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-black text-white mb-4">店舗デザインのご相談</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#10B981] text-white px-6 py-3 font-bold hover:bg-[#10B981]/90 transition-colors text-sm border border-[#10B981]">
            お問い合わせ <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SNSシェア */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#DAE2E8] p-4">
            <SocialShare
              title="店舗デザイン - イワサキ内装"
              description="お店のコンセプトを形にする魅力的な店舗空間。カフェ、飲食店、小売店など幅広く対応します。"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
