import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import ProjectGallerySlider from '@/components/website/ProjectGallerySlider'
import Link from 'next/link'
import { Store, ArrowRight } from 'lucide-react'

export default function CommercialPage() {
  const projects = [
    {
      title: '渋谷カフェ「森の風」店舗デザイン・施工',
      location: '東京都渋谷区',
      date: '2025年8月',
      description: '自然素材にこだわった癒しのカフェ空間。無垢材カウンター、観葉植物、間接照明で温かみを演出。開店後SNSで話題となり月間来店3,000人達成。',
      specs: ['面積: 45㎡', '席数: 24席', '工期: 5週間', '工事費: 1,200万円'],
      tags: ['カフェ', '自然素材', 'SNS話題'],
      images: [
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1501492673258-f84fb06d3de3?w=600&auto=format&fit=crop'
      ]
    },
    {
      title: '新宿Bビル 7階オフィスリニューアル',
      location: '東京都新宿区',
      date: '2025年7月',
      description: 'IT企業向けフレキシブルオフィス。フリーアドレス、Web会議ブース、リフレッシュスペース配置。社員満足度15%向上、離職率低下に貢献。',
      specs: ['面積: 280㎡', '社員数: 60名', '工期: 2ヶ月', '工事費: 3,500万円'],
      tags: ['オフィス', 'IT企業', '働き方改革'],
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop'
      ]
    },
    {
      title: '目黒D美容室 リニューアル施工',
      location: '東京都目黒区',
      date: '2025年5月',
      description: 'モダンで洗練された美容室空間。大型ミラー、LEDダウンライト、高級感ある内装材で上質な雰囲気に。待合スペース快適化でリピート率20%向上。',
      specs: ['面積: 60㎡', '席数: 6席', '工期: 4週間', '工事費: 900万円'],
      tags: ['美容室', 'リニューアル', '高級感'],
      images: [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=600&auto=format&fit=crop'
      ]
    },
    {
      title: '銀座E小売店 什器製作・内装',
      location: '東京都中央区',
      date: '2025年3月',
      description: 'セレクトショップのブランドイメージに合わせたオリジナル什器を製作。商品が映える照明計画と、回遊性の高いレイアウトで売上15%増に貢献。',
      specs: ['面積: 35㎡', '什器: オーダーメイド', '工期: 4週間', '工事費: 800万円'],
      tags: ['小売店', 'オリジナル什器', 'ブランディング'],
      images: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop'
      ]
    },
    {
      title: '六本木F飲食店 カウンター新設工事',
      location: '東京都港区',
      date: '2025年2月',
      description: '和食レストランのカウンター席を増設。一枚板のカウンターと職人技の造作で、高級感ある空間に。カウンター席の予約率が50%向上。',
      specs: ['カウンター: 8m×1台', '席数追加: 10席', '工期: 3週間', '工事費: 600万円'],
      tags: ['飲食店', 'カウンター', '和食'],
      images: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&auto=format&fit=crop'
      ]
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-[#252423] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-black mb-2 border-b-2 border-[#D4AF37] pb-3 inline-block">店舗・オフィス</h1>
          <p className="text-sm text-white/70 mt-4">Commercial Projects</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div key={i} className="bg-white border border-[#DAE2E8] overflow-hidden hover:shadow-lg transition-shadow">
                <ProjectGallerySlider images={project.images} title={project.title} />
                <div className="p-6">
                  <Store className="w-10 h-10 text-[#10B981] mb-3" />
                  <h3 className="text-base font-bold text-[#252423] mb-2">{project.title}</h3>
                  <p className="text-sm text-[#252423]/70 mb-3 leading-relaxed">{project.description}</p>
                  <div className="space-y-1 mb-3">
                    <p className="text-xs text-[#252423]/70">{project.location} | {project.date}完成</p>
                  </div>
                  <div className="bg-[#F5F5F5] border border-[#DAE2E8] p-3 mb-3">
                    <ul className="space-y-1">
                      {project.specs.map((spec, idx) => (
                        <li key={idx} className="text-xs text-[#252423]/70">{spec}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-[#10B981]/10 text-[#10B981] text-xs border border-[#10B981]/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-[#10B981] font-bold text-sm">
              <ArrowRight className="w-4 h-4 rotate-180" /> すべての施工実績
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
