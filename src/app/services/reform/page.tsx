import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Hammer, Sparkles, TrendingUp, Clock } from 'lucide-react'
import SocialShare from '@/components/website/SocialShare'

export default function ReformServicePage() {
  const reformTypes = [
    {
      icon: Hammer,
      title: 'フルリフォーム',
      description: '間取り変更から内装全体まで、住まいを丸ごと新しく',
      price: '300万円〜',
      duration: '2〜3ヶ月',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&auto=format&fit=crop'
    },
    {
      icon: Sparkles,
      title: '水回りリフォーム',
      description: 'キッチン・浴室・トイレなど、水回り設備を最新に',
      price: '80万円〜',
      duration: '1〜2週間',
      image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&auto=format&fit=crop'
    },
    {
      icon: TrendingUp,
      title: '間取り変更',
      description: 'ライフスタイルの変化に合わせた、快適な間取りに',
      price: '150万円〜',
      duration: '1〜2ヶ月',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop'
    },
    {
      icon: Clock,
      title: '部分リフォーム',
      description: 'クロス張替えや床の張替えなど、気になる箇所だけ',
      price: '30万円〜',
      duration: '3日〜1週間',
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&auto=format&fit=crop'
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section - Simple dark background */}
      <section className="bg-[#252423] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-black mb-2 border-b-2 border-[#D4AF37] pb-3 inline-block">リフォーム</h1>
          <p className="text-sm text-white/70 mt-4">Reform & Renovation</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-xl font-black text-[#252423] mb-4 border-b-2 border-[#D4AF37] pb-2 inline-block">暮らしの変化に合わせた、理想の住まいへ</h2>
            <p className="text-sm text-[#252423]/70 max-w-3xl">
              ライフステージの変化や、家族構成の変化に合わせて、お住まいをより快適な空間に生まれ変わらせます
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reformTypes.map((type, index) => {
              const Icon = type.icon
              return (
                <div key={index} className="bg-white border border-[#DAE2E8] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden border-b border-[#DAE2E8]">
                    <img
                      src={type.image}
                      alt={type.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#10B981] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-[#252423] mb-2">{type.title}</h3>
                        <p className="text-sm text-[#252423]/70 mb-4">{type.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-[#252423]/70">目安費用:</span>
                            <span className="text-[#10B981] font-bold">{type.price}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#252423]/70">工期:</span>
                            <span className="text-[#10B981] font-bold">{type.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#252423] py-12 border-t border-[#DAE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-black text-white mb-4">無料相談・無料見積もり受付中</h2>
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
              title="リフォーム - イワサキ内装"
              description="ライフスタイルの変化に合わせた快適な住空間へ。水回りリフォームから全面改装まで対応します。"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
