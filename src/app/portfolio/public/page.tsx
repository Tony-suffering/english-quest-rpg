import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import ProjectGallerySlider from '@/components/website/ProjectGallerySlider'
import Link from 'next/link'
import { Building2, ArrowRight } from 'lucide-react'

export default function PublicPage() {
  const projects = [
    {
      title: '中野さくらクリニック 内装工事',
      location: '東京都中野区',
      date: '2025年7月',
      description: '患者様が安心して過ごせる、明るく清潔な医療空間。待合室は木目調の内装で温かみを演出。診察室は防音性と清潔性を重視した設計。バリアフリー対応で車椅子の方も安心。',
      specs: ['面積: 120㎡', '診察室: 3室', '工期: 6週間', '工事費: 2,000万円'],
      tags: ['クリニック', 'バリアフリー', '医療施設'],
      images: [
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&auto=format&fit=crop'
      ]
    },
    {
      title: '杉並区立図書館 閲覧室改修',
      location: '東京都杉並区',
      date: '2025年5月',
      description: '地域図書館の閲覧室を全面改修。防音性の高い個人閲覧ブースと、明るく開放的なグループ学習エリアを新設。LED照明で目に優しく、利用者数が30%増加。',
      specs: ['面積: 200㎡', '座席数: 80席', '工期: 2ヶ月', '工事費: 1,800万円'],
      tags: ['図書館', '公共施設', 'LED照明'],
      images: [
        'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop'
      ]
    },
    {
      title: '世田谷区福祉センター 多目的ホール',
      location: '東京都世田谷区',
      date: '2025年3月',
      description: '高齢者・障がい者の方々が利用しやすい多目的ホール。段差ゼロ、車椅子対応トイレ、音響設備完備。イベント・健康体操・相談会など多目的に活用されています。',
      specs: ['面積: 150㎡', '収容人数: 100名', '工期: 2ヶ月', '工事費: 2,500万円'],
      tags: ['福祉施設', 'バリアフリー', '多目的ホール'],
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1577412647305-991150c7d163?w=600&auto=format&fit=crop'
      ]
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-[#252423] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-black mb-2 border-b-2 border-[#D4AF37] pb-3 inline-block">公共施設</h1>
          <p className="text-sm text-white/70 mt-4">Public Facilities</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div key={i} className="bg-white border border-[#DAE2E8] overflow-hidden hover:shadow-lg transition-shadow">
                <ProjectGallerySlider images={project.images} title={project.title} />
                <div className="p-6">
                  <Building2 className="w-10 h-10 text-[#10B981] mb-3" />
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
