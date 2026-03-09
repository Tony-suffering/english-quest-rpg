import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import ProjectGallerySlider from '@/components/website/ProjectGallerySlider'
import Link from 'next/link'
import { Home, ArrowRight } from 'lucide-react'

export default function ResidentialPage() {
  const projects = [
    {
      title: '港区Aマンション 全面改修工事',
      location: '東京都港区',
      date: '2025年9月',
      description: '築30年のマンション50戸を全面改修。クロス・床材を一新し、バリアフリー化も実施。居住しながらの工事で1戸10日間のスピード施工を実現。',
      specs: ['築年数: 30年', '戸数: 50戸', '工期: 6ヶ月', '工事費: 1.5億円'],
      tags: ['大規模改修', 'バリアフリー', 'マンション'],
      images: [
        'https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop'
      ]
    },
    {
      title: '世田谷C邸 新築注文住宅内装',
      location: '東京都世田谷区',
      date: '2025年6月',
      description: '4人家族のための機能的な住空間。子供の成長を見据えた可変性のある間取りと、充実した収納計画。自然光あふれる明るいLDKが特徴。',
      specs: ['延床面積: 120㎡', '間取り: 4LDK', '工期: 2ヶ月', '工事費: 800万円'],
      tags: ['新築', '注文住宅', 'ファミリー'],
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&auto=format&fit=crop'
      ]
    },
    {
      title: '品川Eマンション バリアフリー改修',
      location: '東京都品川区',
      date: '2025年4月',
      description: '高齢者世帯向けバリアフリーリフォーム。段差解消、手すり設置、引き戸化で車椅子でも快適に。介護保険制度活用で費用負担を軽減。',
      specs: ['面積: 70㎡', '工期: 3週間', '工事費: 280万円', '補助金: 18万円'],
      tags: ['バリアフリー', '高齢者対応', '介護保険'],
      images: [
        'https://images.unsplash.com/photo-1581858707460-6d87c99d6e97?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=600&auto=format&fit=crop'
      ]
    },
    {
      title: '中野F邸 水回り全面改修',
      location: '東京都中野区',
      date: '2025年3月',
      description: '築25年の戸建て住宅。キッチン・浴室・トイレを最新設備に交換。システムキッチンは対面式に変更し、家族のコミュニケーションが活発に。',
      specs: ['築年数: 25年', '工期: 4週間', '工事費: 450万円'],
      tags: ['水回り', 'リフォーム', 'システムキッチン'],
      images: [
        'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&auto=format&fit=crop'
      ]
    },
    {
      title: '杉並G邸 子供部屋間仕切り工事',
      location: '東京都杉並区',
      date: '2025年2月',
      description: '子供の成長に合わせて1部屋を2部屋に間仕切り。防音性と採光に配慮した設計で、それぞれのプライバシーを確保しつつ明るい空間を実現。',
      specs: ['面積: 12畳→6畳×2', '工期: 2週間', '工事費: 120万円'],
      tags: ['間仕切り', '子供部屋', '可変性'],
      images: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&auto=format&fit=crop'
      ]
    },
    {
      title: '大田区H邸 和室から洋室へリノベーション',
      location: '東京都大田区',
      date: '2025年1月',
      description: '使わなくなった和室を洋室にリノベーション。畳をフローリングに、押入れをクローゼットに変更。現代のライフスタイルに合った快適な空間に生まれ変わりました。',
      specs: ['面積: 8畳', '工期: 10日間', '工事費: 180万円'],
      tags: ['和室→洋室', 'リノベーション', 'フローリング'],
      images: [
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop'
      ]
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-[#252423] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-black mb-2 border-b-2 border-[#D4AF37] pb-3 inline-block">住宅・マンション</h1>
          <p className="text-sm text-white/70 mt-4">Residential Projects</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div key={i} className="bg-white border border-[#DAE2E8] overflow-hidden hover:shadow-lg transition-shadow">
                <ProjectGallerySlider images={project.images} title={project.title} />
                <div className="p-6">
                  <Home className="w-10 h-10 text-[#10B981] mb-3" />
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
