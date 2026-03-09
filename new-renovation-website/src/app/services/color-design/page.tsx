import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Palette, Sparkles, Eye, Lightbulb, TrendingUp, Heart } from 'lucide-react'
import SocialShare from '@/components/website/SocialShare'

export default function ColorDesignPage() {
  const features = [
    '空間の目的に合わせた最適な色彩設計',
    'トレンドと普遍性を融合したデザイン提案',
    '心理効果を考慮した配色プランニング',
    '素材・照明との総合的なコーディネート',
    '施工まで一貫した品質管理',
    'アフターフォローによる長期サポート'
  ]

  const serviceTypes = [
    {
      icon: Palette,
      title: 'カラーコーディネート',
      description: '空間の用途や目的に合わせて、壁・床・天井・家具の色彩を総合的にプランニングします',
      details: ['住宅の色彩設計', 'オフィスの生産性向上配色', '店舗のブランドカラー展開', '医療・福祉施設の癒やしの配色']
    },
    {
      icon: Sparkles,
      title: 'トレンドデザイン提案',
      description: '最新のインテリアトレンドを取り入れながら、長く愛される空間をご提案します',
      details: ['トレンドカラーの分析', 'テーマ性のある空間演出', 'サステナブル素材の提案', '時代を超えるクラシックデザイン']
    },
    {
      icon: Eye,
      title: '視覚効果デザイン',
      description: '色彩の持つ視覚効果を活用し、空間を広く見せたり、印象を変えたりします',
      details: ['空間の広がり演出', '天井高の視覚調整', 'アクセントウォール', 'ゾーニング効果']
    },
    {
      icon: Heart,
      title: '心理効果コンサルティング',
      description: '色彩心理学に基づき、居心地の良さや集中力向上など目的に応じた配色をご提案',
      details: ['リラックス効果', '集中力向上', '購買意欲促進', 'コミュニケーション活性化']
    },
  ]

  const workFlow = [
    { step: '01', title: 'ヒアリング', description: '空間の目的、お好みの雰囲気、ライフスタイルをお伺いします' },
    { step: '02', title: '現地調査', description: '採光・既存の色味・周辺環境を確認し、最適な提案の基礎を作ります' },
    { step: '03', title: 'カラースキーム作成', description: '複数のカラーパレット案をご用意し、イメージを具体化します' },
    { step: '04', title: 'サンプル確認', description: '実際の素材サンプルで色味や質感をご確認いただきます' },
    { step: '05', title: 'プラン決定', description: 'お見積もりと最終プランをご承認いただきます' },
    { step: '06', title: '施工', description: '熟練職人が丁寧に施工。デザインを忠実に再現します' },
    { step: '07', title: '完成確認', description: '照明条件を変えながら、仕上がりを一緒に確認します' },
    { step: '08', title: 'アフターケア', description: 'メンテナンス方法のご案内と長期サポート' }
  ]

  const colorEffects = [
    { color: '#E8B4B8', name: '柔らかなピンク', effect: '安心感・優しさ・リラックス', usage: '寝室・リビング・待合室' },
    { color: '#A8D5BA', name: '爽やかなグリーン', effect: '癒やし・集中力・自然との調和', usage: 'オフィス・書斎・医療施設' },
    { color: '#B8C5E8', name: '静かなブルー', effect: '信頼感・冷静さ・広がり', usage: '会議室・浴室・エントランス' },
    { color: '#F5E6D3', name: '温かなベージュ', effect: '落ち着き・高級感・普遍性', usage: 'どんな空間にも馴染む万能色' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section - Color gradient accent */}
      <section className="bg-[#252423] text-white py-12 relative overflow-hidden">
        {/* カラフルなアクセントライン */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8B4B8] via-[#A8D5BA] to-[#B8C5E8]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-black border-b-2 border-[#D4AF37] pb-3 inline-block">色彩・デザイン提案</h1>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-[#E8B4B8]"></div>
              <div className="w-3 h-3 rounded-full bg-[#A8D5BA]"></div>
              <div className="w-3 h-3 rounded-full bg-[#B8C5E8]"></div>
            </div>
          </div>
          <p className="text-sm text-white/70 mt-4">「壁紙を貼る」から「空間をデザインする」へ</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image and Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mb-12">
            <div>
              <h2 className="text-xl font-black text-[#252423] mb-4 border-b-2 border-[#D4AF37] pb-2 inline-block">色彩の力で、空間の価値を最大化</h2>
              <div className="space-y-3 text-sm text-[#252423]/70">
                <p>色彩は、空間の印象を決定づける最も重要な要素の一つです。同じ間取りでも、色の選び方ひとつで「広く感じる」「落ち着く」「活気が出る」と、まったく違う空間になります。</p>
                <p>当社では、色彩設計の専門知識と30年の施工実績を組み合わせ、デザインから施工まで一貫してお任せいただけます。</p>
                <p>トレンドを取り入れながらも、10年後も愛される空間づくり。それが私たちの色彩・デザイン提案です。</p>
              </div>
            </div>
            <div className="relative h-64 md:h-80 overflow-hidden border border-[#DAE2E8] rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&auto=format&fit=crop"
                alt="色彩デザイン - インテリアカラーサンプル"
                className="w-full h-full object-cover"
              />
              {/* カラーオーバーレイ */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#E8B4B8] via-[#A8D5BA] to-[#B8C5E8]"></div>
            </div>
          </div>

          {/* Color Effects Section */}
          <div className="mb-12">
            <h2 className="text-xl font-black text-[#252423] mb-6 border-b-2 border-[#D4AF37] pb-2 inline-block">色が持つ力</h2>
            <p className="text-sm text-[#252423]/70 mb-6">色彩心理学に基づいた、目的に合わせたカラー提案</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {colorEffects.map((item, index) => (
                <div key={index} className="group bg-white border border-[#DAE2E8] rounded-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <div
                    className="w-full h-28 transition-all group-hover:h-32"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="p-4">
                    <h3 className="text-base font-bold text-[#252423] mb-2">{item.name}</h3>
                    <p className="text-sm text-[#252423]/70 mb-2">{item.effect}</p>
                  <p className="text-xs text-[#10B981]">{item.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Types */}
          <div className="mb-12">
            <h2 className="text-xl font-black text-[#252423] mb-6 border-b-2 border-[#D4AF37] pb-2 inline-block">サービス内容</h2>
            <p className="text-sm text-[#252423]/70 mb-6">色彩のプロフェッショナルが、空間の可能性を最大限に引き出します</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceTypes.map((type, index) => {
                const Icon = type.icon
                return (
                  <div key={index} className="bg-white border border-[#DAE2E8] p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E8B4B8] to-[#B8C5E8] flex items-center justify-center flex-shrink-0">
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
            <h2 className="text-xl font-black text-[#252423] mb-6 border-b-2 border-[#D4AF37] pb-2 inline-block">選ばれる理由</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 bg-[#F5F5F5] border border-[#DAE2E8] p-4">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#252423]">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Value Proposition */}
          <div className="mb-12 bg-gradient-to-r from-[#E8B4B8]/10 via-[#A8D5BA]/10 to-[#B8C5E8]/10 border border-[#DAE2E8] p-6">
            <h2 className="text-xl font-black text-[#252423] mb-4 border-b-2 border-[#D4AF37] pb-2 inline-block">デザインと施工、両方できる強み</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-[#E8B4B8] rounded-full flex items-center justify-center mb-3">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-[#252423] mb-2">提案力</h3>
                <p className="text-sm text-[#252423]/70">トレンドを熟知した専門家が、お客様の理想を形にします</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-[#A8D5BA] rounded-full flex items-center justify-center mb-3">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-[#252423] mb-2">実現力</h3>
                <p className="text-sm text-[#252423]/70">30年の施工実績で、デザインを忠実に再現します</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-[#B8C5E8] rounded-full flex items-center justify-center mb-3">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-[#252423] mb-2">満足力</h3>
                <p className="text-sm text-[#252423]/70">デザインから施工まで一貫対応で、ズレのない仕上がり</p>
              </div>
            </div>
          </div>

          {/* Work Flow */}
          <div className="bg-[#F5F5F5] border border-[#DAE2E8] p-6">
            <h2 className="text-xl font-black text-[#252423] mb-6 border-b-2 border-[#D4AF37] pb-2 inline-block">ご依頼の流れ</h2>
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
      <section className="bg-[#252423] py-12 border-t border-[#DAE2E8] relative overflow-hidden">
        {/* カラフルなアクセントライン */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8B4B8] via-[#A8D5BA] to-[#B8C5E8]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-black text-white mb-2">色彩で、暮らしを変えませんか？</h2>
          <p className="text-sm text-white/70 mb-6">お見積もり・カラー相談は無料です</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E8B4B8] via-[#A8D5BA] to-[#B8C5E8] text-[#252423] px-6 py-3 font-bold hover:opacity-90 transition-opacity text-sm"
          >
            無料カラー相談を予約
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SNSシェア */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#DAE2E8] p-4">
            <SocialShare
              title="色彩・デザイン提案 - イワサキ内装"
              description="色彩設計のプロフェッショナルが、空間の価値を最大化。「壁紙を貼る」から「空間をデザインする」へ。デザインから施工まで一貫対応。"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
