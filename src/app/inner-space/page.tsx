'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Moon, Sun, Wind, Eye, Heart, Home, ArrowRight, ChevronDown } from 'lucide-react'

// 内なる空間 - Inner Space
// 内装（外の空間）と内省（内の空間）の交差点

const SECTIONS = [
  {
    id: 'presence',
    icon: Eye,
    title: '気づきの空間',
    subtitle: 'The Space of Awareness',
    content: `部屋に入ったとき、何を感じるか。

光の入り方。空気の流れ。足元の感触。

これらは「インテリア」ではない。「体験」だ。

30年、空間を作ってきた。
同時に、1000時間以上、神経科学を聴いてきた。

気づいたことがある。

外の空間を整えることは、内の空間を整えることと同じだ。`,
    color: 'amber'
  },
  {
    id: 'light',
    icon: Sun,
    title: '光と覚醒',
    subtitle: 'Light and Awakening',
    content: `朝の光が目に入る。

それだけで、コルチゾールが健康的に上昇し、
14〜16時間後のメラトニン分泌のタイミングが決まる。

窓の位置、カーテンの選び方、照明の色温度。

これらは「おしゃれ」の問題ではない。
あなたの意識の質を決める要素だ。

東向きの窓がある寝室。
夜は2700K以下の暖色照明。
目線より下の間接照明。

空間が変われば、目覚めが変わる。`,
    color: 'yellow'
  },
  {
    id: 'stillness',
    icon: Moon,
    title: '静寂の設計',
    subtitle: 'Designing Stillness',
    content: `現代の部屋は、刺激に満ちている。

スマホの通知。常時オンのデバイス。
視界に入る無数のモノ。

ドーパミンは「新奇性」で放出される。
だが、過剰な刺激は基準値を下げる。

静寂を設計する。

仕事部屋には、一つだけ美しいものを置く。
デスクからスマホが見えない配置にする。
視覚的ノイズを、意図的に減らす。

すると、集中が戻ってくる。
本当に大切なものが、見えてくる。`,
    color: 'indigo'
  },
  {
    id: 'breath',
    icon: Wind,
    title: '呼吸する空間',
    subtitle: 'Spaces That Breathe',
    content: `CO2濃度が1000ppmを超えると、認知機能が低下する。

換気の悪い部屋で「頭がぼんやりする」のは、
気のせいではない。科学的事実だ。

窓の配置を対角線上にする。
24時間換気システムを導入する。
VOCの少ない建材を選ぶ。

空間が呼吸すれば、あなたも呼吸できる。

そして、呼吸に気づくことは、
今この瞬間に戻ることだ。`,
    color: 'cyan'
  },
  {
    id: 'home',
    icon: Home,
    title: '帰る場所',
    subtitle: 'Coming Home',
    content: `最終的に、内装とは何か。

壁紙を貼ること？
床を張ること？
照明を選ぶこと？

違う。

「帰る場所」を作ることだ。

外の世界で何があっても、
ここに帰れば大丈夫だと思える場所。

自分自身に帰れる場所。

それが、30年かけて理解した内装の本質だ。`,
    color: 'emerald'
  }
]

export default function InnerSpacePage() {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrolled / max)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-stone-950 text-white">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-stone-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-stone-950 to-black" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-3xl"
        >
          <p className="text-stone-500 text-sm tracking-[0.3em] uppercase mb-6">
            Interior Design × Neuroscience × Awareness
          </p>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            内なる空間
          </h1>

          <p className="text-xl md:text-2xl text-stone-400 mb-4">
            Inner Space
          </p>

          <p className="text-stone-500 leading-relaxed max-w-xl mx-auto mb-12">
            外の空間を整えることは、内の空間を整えること。
            <br />
            内装の30年と、神経科学の1000時間が、ここで交わる。
          </p>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-stone-600 mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* Sections */}
      {SECTIONS.map((section, index) => {
        const Icon = section.icon
        return (
          <section
            key={section.id}
            className="min-h-screen flex items-center py-24 px-4 relative"
          >
            <div className="max-w-4xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Section header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-xl bg-${section.color}-500/20 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${section.color}-400`} />
                  </div>
                  <div>
                    <p className="text-stone-500 text-sm tracking-wider">{section.subtitle}</p>
                    <h2 className="text-3xl font-bold">{section.title}</h2>
                  </div>
                </div>

                {/* Content */}
                <div className="max-w-2xl">
                  <div className="space-y-6">
                    {section.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="text-stone-300 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/20 to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center relative z-10"
        >
          <Heart className="w-12 h-12 text-amber-500/50 mx-auto mb-8" />

          <h2 className="text-3xl md:text-4xl font-black mb-6">
            空間を、一緒に作りませんか
          </h2>

          <p className="text-stone-400 mb-12 leading-relaxed">
            外の空間と、内の空間。
            <br />
            両方を大切にした住まいづくりを、お手伝いします。
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-bold hover:bg-stone-200 transition-colors"
          >
            相談する
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-stone-800">
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-stone-500 hover:text-white transition-colors">
            IWASAKI NAISOU
          </Link>
          <p className="text-stone-600 text-sm text-center">
            内装 30年 × 神経科学 1000時間 × 気づき ∞
          </p>
          <p className="text-stone-700 text-xs">
            generated at 3am, refined with compassion
          </p>
        </div>
      </footer>
    </div>
  )
}
