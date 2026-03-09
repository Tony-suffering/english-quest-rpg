'use client'

import { useState, useEffect, useRef } from 'react'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, Heart, Shield, Home, Accessibility, HandHeart, Waves, Circle } from 'lucide-react'
import SocialShare from '@/components/website/SocialShare'

export default function BarrierFreePage() {
  const [scrollY, setScrollY] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const features = [
    {
      icon: Shield,
      title: '段差の解消',
      description: 'つまずきやすい段差をなくし、安全な移動を実現',
      image: '/images/dansa.png',
      detail: '玄関、浴室、トイレなど、つまずきの原因となる段差を解消。スロープ設置や床レベル調整で安全な移動空間を実現します。'
    },
    {
      icon: Accessibility,
      title: '手すりの設置',
      description: '廊下・階段・浴室など、必要な場所に手すりを設置',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop',
      detail: '最適な高さと位置に手すりを設置。立ち上がりや移動をしっかりサポートし、転倒リスクを低減します。'
    },
    {
      icon: Home,
      title: '扉の変更',
      description: '開き戸を引き戸に変更し、車椅子でも通りやすく',
      image: '/images/tobira.png',
      detail: '力の弱い方でも開閉しやすい引き戸や自動ドアに変更。開口部を広げて車椅子でも余裕をもって通行できます。'
    },
    {
      icon: Heart,
      title: '浴室改修',
      description: '滑りにくい床材、またぎやすい浴槽で安心入浴',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop',
      detail: '滑りにくい床材、低めの浴槽、シャワーチェア設置で入浴時の安全を確保。温度調整機能付き水栓で快適な入浴を。'
    },
    {
      icon: Waves,
      title: 'トイレ改修',
      description: '広々とした空間、手すり付きで介護もしやすく',
      image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&h=400&fit=crop',
      detail: '車椅子対応の広いスペース、立ち座りを補助する手すり、自動洗浄機能で快適なトイレ空間を実現。'
    },
    {
      icon: HandHeart,
      title: '廊下・通路の拡張',
      description: '車椅子でもスムーズに移動できる幅を確保',
      image: '/images/roka.png',
      detail: '廊下幅を90cm以上に拡張。車椅子での方向転換や介護者との並行移動もスムーズに。'
    },
  ]

  const subsidies = [
    { title: '介護保険住宅改修費', amount: '最大20万円', coverage: '自己負担1〜3割', condition: '要支援・要介護認定者' },
    { title: '自治体助成金', amount: '地域により異なる', coverage: '工事費の一部', condition: '各自治体の条件による' },
    { title: '住宅ローン減税', amount: '工事費の一部', coverage: '所得税控除', condition: 'バリアフリー改修工事' },
  ]

  // 光のアクセントエフェクト（ゆっくり・シルバー追加）
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    type Light = {
      x: number
      y: number
      opacity: number
      fadeSpeed: number
      size: number
      color: 'gold' | 'silver' | 'white'
    }

    const lights: Light[] = []
    const colors: Array<'gold' | 'silver' | 'white'> = ['gold', 'silver', 'white', 'gold', 'silver', 'white', 'gold', 'silver']

    // 8個の光点（ゆっくり）
    for (let i = 0; i < 8; i++) {
      lights.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        opacity: 0,
        fadeSpeed: Math.random() * 0.003 + 0.001, // 速度を遅く
        size: Math.random() * 60 + 50,
        color: colors[i],
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      lights.forEach((light) => {
        light.opacity += light.fadeSpeed
        if (light.opacity >= 0.9 || light.opacity <= 0) {
          light.fadeSpeed *= -1
        }

        let innerColor, middleColor, outerColor

        if (light.color === 'gold') {
          innerColor = `rgba(255, 255, 255, ${light.opacity})`
          middleColor = `rgba(212, 175, 55, ${light.opacity * 0.7})`
          outerColor = `rgba(212, 175, 55, ${light.opacity * 0.2})`
        } else if (light.color === 'silver') {
          innerColor = `rgba(255, 255, 255, ${light.opacity})`
          middleColor = `rgba(192, 192, 192, ${light.opacity * 0.7})`
          outerColor = `rgba(192, 192, 192, ${light.opacity * 0.2})`
        } else {
          innerColor = `rgba(255, 255, 255, ${light.opacity})`
          middleColor = `rgba(230, 230, 230, ${light.opacity * 0.5})`
          outerColor = `rgba(255, 255, 255, ${light.opacity * 0.1})`
        }

        const gradient = ctx.createRadialGradient(light.x, light.y, 0, light.x, light.y, light.size)
        gradient.addColorStop(0, innerColor)
        gradient.addColorStop(0.4, middleColor)
        gradient.addColorStop(0.8, outerColor)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(light.x, light.y, light.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => window.removeEventListener('resize', updateCanvasSize)
  }, [])

  // 自動スライド
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-[#252423] text-white py-12 border-b border-[#DAE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-black mb-3 border-b-2 border-[#D4AF37] pb-3 inline-block">
            バリアフリーリフォーム
          </h1>
          <p className="text-sm text-white/70 mt-4">すべての世代が安心して暮らせる住まいづくり</p>
        </div>
      </section>

      {/* メインビジュアル */}
      <section className="py-12 bg-white border-b border-[#DAE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#DAE2E8]">
            <div className="relative h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&h=800&fit=crop&q=90"
                alt="バリアフリー手すり設置"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

              {/* 光のアクセント */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
              />

              <div className="absolute bottom-0 left-0 right-0 p-12">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-lg">
                  すべての人が安心して暮らせる住まいへ
                </h2>
                <p className="text-base text-white/95 drop-shadow-md">
                  経験豊富な経営者が考える、シニア世代に優しいリフォーム
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 施工内容スライドショー */}
      <section className="py-12 bg-white border-b border-[#DAE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#252423] mb-6 border-b-2 border-[#10B981] pb-3 inline-block">
            主な施工内容
          </h2>

          {/* メイン画像スライダー */}
          <div className="relative h-[500px] mb-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isActive = index === activeFeature

              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <div className="bg-white border border-[#DAE2E8] h-full flex flex-col md:flex-row overflow-hidden">
                    {/* 左：画像 */}
                    <div className="md:w-1/2 h-64 md:h-full relative overflow-hidden">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover transition-transform duration-1000"
                        style={{
                          transform: isActive ? 'scale(1)' : 'scale(1.1)',
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                    </div>

                    {/* 右：説明 */}
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                      <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 text-xs font-bold mb-4 self-start border border-[#D4AF37]">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <h3 className="text-2xl font-black text-[#252423] mb-3">{feature.title}</h3>
                      <p className="text-sm text-[#252423]/70 mb-4">{feature.description}</p>
                      <p className="text-sm text-[#252423]/60 leading-relaxed border-l-2 border-[#10B981] pl-4">
                        {feature.detail}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* サムネイル＋プログレスバー */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {features.map((feature, index) => (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`relative border-2 transition-all ${
                  index === activeFeature
                    ? 'border-[#10B981] shadow-lg'
                    : 'border-[#DAE2E8] opacity-60 hover:opacity-100'
                }`}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 text-center">
                  {feature.title}
                </div>
                {/* プログレスバー */}
                {index === activeFeature && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#DAE2E8]">
                    <div className="h-full bg-[#10B981] animate-progress"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 補助金制度 */}
      <section className="py-12 bg-[#F5F5F5] border-b border-[#DAE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#252423] mb-6 border-b-2 border-[#D4AF37] pb-3 inline-block">
            補助金制度のご案内
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {subsidies.map((subsidy, index) => (
              <div key={index} className="bg-white border border-[#DAE2E8] p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#10B981] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <h3 className="font-bold text-[#252423] text-sm">{subsidy.title}</h3>
                </div>
                <div className="space-y-2 text-xs text-[#252423]/70">
                  <p><span className="font-bold text-[#D4AF37]">支給額:</span> {subsidy.amount}</p>
                  <p><span className="font-bold text-[#D4AF37]">対象:</span> {subsidy.coverage}</p>
                  <p><span className="font-bold text-[#D4AF37]">条件:</span> {subsidy.condition}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-[#10B981]/20 p-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#10B981] flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-[#252423] mb-2">補助金申請サポート</h3>
                <p className="text-sm text-[#252423]/70 leading-relaxed">
                  複雑な申請手続きもお任せください。必要書類の準備から申請代行まで、経験豊富なスタッフが全面サポートいたします。
                  ケアマネージャーとの連携も対応可能です。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 施工の流れ（波型タイムライン） */}
      <section className="py-12 bg-white border-b border-[#DAE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#252423] mb-8 border-b-2 border-[#D4AF37] pb-3 inline-block">
            施工の流れ
          </h2>

          <div className="relative">
            {/* 波線 */}
            <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }}>
              <path
                d="M 0 100 Q 150 50, 300 100 T 600 100 T 900 100 T 1200 100"
                stroke="#10B981"
                strokeWidth="3"
                fill="none"
                opacity="0.3"
              />
            </svg>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
              {[
                { step: '01', title: 'ご相談', desc: '現地調査・ヒアリング' },
                { step: '02', title: 'プラン提案', desc: '補助金制度のご案内' },
                { step: '03', title: '施工', desc: '丁寧な工事・進捗報告' },
                { step: '04', title: '完成・点検', desc: 'アフターフォロー' },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-[#DAE2E8] p-6 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-[#10B981] flex items-center justify-center mb-4 mx-auto">
                    <span className="text-white font-black">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-[#252423] mb-2 text-center">{item.title}</h3>
                  <p className="text-xs text-[#252423]/70 text-center">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* シニア世代へのメッセージ */}
      <section className="py-12 bg-[#F5F5F5] border-b border-[#DAE2E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#DAE2E8] p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#252423] mb-2">経営者からのメッセージ</h2>
                <p className="text-sm text-[#252423]/70 leading-relaxed">
                  長年の経験から、日々の生活の中で「使いやすさ」「安全性」の大切さを実感しています。
                  シニア世代の方々が安心して暮らせる住環境を、豊富な経験と確かな技術でサポートいたします。
                </p>
              </div>
            </div>

            <div className="bg-[#10B981]/5 border border-[#10B981]/20 p-6">
              <h3 className="font-bold text-[#252423] mb-3 flex items-center gap-2">
                <Circle className="w-4 h-4 text-[#10B981]" />
                こんなお悩みありませんか？
              </h3>
              <ul className="space-y-2 text-sm text-[#252423]/70">
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] font-bold">•</span>
                  <span>玄関や浴室の段差でつまずきそうになる</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] font-bold">•</span>
                  <span>階段の上り下りが不安</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] font-bold">•</span>
                  <span>浴室が滑りやすく危険を感じる</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] font-bold">•</span>
                  <span>車椅子での移動が困難</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10B981] font-bold">•</span>
                  <span>将来のために今から準備したい</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white border-b border-[#DAE2E8]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white border border-[#DAE2E8] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-48 md:h-auto">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop"
                  alt="お問い合わせ"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 flex flex-col justify-center">
                <div className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 text-xs font-bold mb-4 self-start border border-[#D4AF37]">
                  無料相談受付中
                </div>

                <h2 className="text-2xl font-black text-[#252423] mb-3 leading-tight">
                  お見積もり・<br />ご相談は無料
                </h2>

                <p className="text-sm text-[#252423]/70 mb-6 leading-relaxed">
                  補助金申請のサポートも承ります。<br />
                  まずはお気軽にご相談ください。
                </p>

                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="block text-center bg-[#D4AF37] text-white px-6 py-3 text-sm font-bold hover:bg-[#C5A028] transition-colors border border-[#D4AF37]"
                  >
                    お問い合わせフォーム
                  </Link>

                  <a
                    href="tel:0356387402"
                    className="block text-center bg-white text-[#252423] px-6 py-3 text-sm font-bold border border-[#DAE2E8] hover:border-[#10B981] transition-colors"
                  >
                    03-5638-7402
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SNSシェア */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#DAE2E8] p-4">
            <SocialShare
              title="バリアフリーリフォーム - イワサキ内装"
              description="すべての人が安心して暮らせる優しい住空間づくり。段差解消、手すり設置など、補助金申請もサポートします。"
            />
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .animate-progress {
          animation: progress 4s linear;
        }
      `}</style>
    </div>
  )
}
