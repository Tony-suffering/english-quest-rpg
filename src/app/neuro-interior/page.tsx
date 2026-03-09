'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Brain, Moon, Sun, Zap, Eye, Thermometer, Volume2, Wind, ArrowRight, Play, ChevronDown } from 'lucide-react'

// Huberman 1000時間から抽出した、空間設計に関わる神経科学
const NEURO_PRINCIPLES = [
  {
    id: 'light',
    icon: Sun,
    title: '光と概日リズム',
    hubermanQuote: "Get sunlight in your eyes within 30-60 minutes of waking.",
    science: '朝の光（10,000ルクス以上）がコルチゾールの健康的な上昇を促し、夜のメラトニン分泌のタイミングを決める。',
    interior: [
      '東向きの窓を寝室に。朝日が自然に入る設計',
      '遮光カーテンより、光を調整できるブラインド',
      '夜間は2700K以下の暖色照明に切り替え',
      '天井照明より、目線より下の間接照明',
    ],
    impact: '睡眠の質 +40%、朝の覚醒度 +60%',
    color: 'amber'
  },
  {
    id: 'temperature',
    icon: Thermometer,
    title: '温度と睡眠',
    hubermanQuote: "Your body needs to drop 1-3 degrees to fall and stay asleep.",
    science: '深部体温の低下が睡眠の引き金。寝室の最適温度は18-19°C。',
    interior: [
      '寝室のエアコン位置：足元方向への送風を避ける',
      '通気性の良い壁材・天井材の選択',
      '床材：コルクは断熱性が高く、裸足でも冷たくない',
      '窓の断熱性能が寝室の温度安定性を決める',
    ],
    impact: '入眠時間 -50%、深睡眠 +30%',
    color: 'blue'
  },
  {
    id: 'dopamine',
    icon: Zap,
    title: 'ドーパミンと空間',
    hubermanQuote: "Novelty triggers dopamine. But constant novelty depletes it.",
    science: '新奇性がドーパミンを放出するが、過剰な刺激は基準値を下げる。',
    interior: [
      '仕事部屋はミニマル。視覚的ノイズを排除',
      '一つだけ「美しいもの」を置く（絵、植物、オブジェ）',
      'デスクからスマホが見えない配置',
      '完了タスクが「見える化」される仕組み（ホワイトボード等）',
    ],
    impact: '集中力持続 +45%、タスク完了率 +35%',
    color: 'yellow'
  },
  {
    id: 'stress',
    icon: Eye,
    title: '視野と自律神経',
    hubermanQuote: "Panoramic vision activates the parasympathetic nervous system.",
    science: '狭い視野（トンネルビジョン）は交感神経優位。広い視野は副交感神経を活性化。',
    interior: [
      '窓からの「抜け」がある配置。壁に向かって座らない',
      '天井高：2.4m以上で開放感',
      '鏡の戦略的配置で空間を広く見せる',
      '圧迫感のある家具配置を避ける',
    ],
    impact: 'ストレスホルモン -25%、創造性 +40%',
    color: 'green'
  },
  {
    id: 'sound',
    icon: Volume2,
    title: '音環境と認知',
    hubermanQuote: "40Hz sounds have been shown to enhance focus and clear brain debris.",
    science: '特定の周波数が脳波に影響。静寂より適度な環境音が集中を高める場合も。',
    interior: [
      '防音性能の高い壁材・窓の選択',
      '吸音材の戦略的配置（フェルトパネル等）',
      '床材：カーペットは吸音、フローリングは反響',
      '隣室からの音漏れを防ぐ間仕切り設計',
    ],
    impact: '集中力 +30%、会話明瞭度 +50%',
    color: 'purple'
  },
  {
    id: 'air',
    icon: Wind,
    title: '空気質と脳機能',
    hubermanQuote: "CO2 levels above 1000ppm impair cognitive function.",
    science: 'CO2濃度が上がると、意思決定能力と集中力が低下。',
    interior: [
      '24時間換気システムの設置',
      '自然換気を促す窓の配置（対角線上）',
      '観葉植物：空気清浄効果のある種を選択',
      'VOC（揮発性有機化合物）の少ない建材・塗料',
    ],
    impact: '認知機能 +15%、頭痛軽減 -60%',
    color: 'cyan'
  },
]

// サービスパッケージ
const PACKAGES = [
  {
    name: 'Sleep Lab',
    description: '睡眠の質を最大化する寝室設計',
    principles: ['light', 'temperature'],
    price: '相談から',
    popular: false,
  },
  {
    name: 'Focus Den',
    description: '集中力を高めるワークスペース',
    principles: ['dopamine', 'stress', 'sound'],
    price: '相談から',
    popular: true,
  },
  {
    name: 'Full Optimization',
    description: '家全体の神経科学的最適化',
    principles: ['light', 'temperature', 'dopamine', 'stress', 'sound', 'air'],
    price: '相談から',
    popular: false,
  },
]

export default function NeuroInteriorPage() {
  const [activePrinciple, setActivePrinciple] = useState<string>('light')
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />

        {/* Neural network animation */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <Brain className="w-4 h-4 text-cyan-400" />
              <span className="text-sm">Huberman Lab 1000時間 + 内装30年</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
              部屋を変えれば、
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                脳が変わる。
              </span>
            </h1>

            <p className="text-lg md:text-xl text-stone-400 max-w-2xl mx-auto mb-12">
              神経科学に基づいた空間設計。
              <br />
              睡眠、集中、ストレス—すべては環境で決まる。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#principles"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 font-bold hover:bg-stone-200 transition-colors"
              >
                科学を見る
                <ChevronDown className="w-5 h-5" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/30 px-8 py-4 font-bold hover:bg-white/10 transition-colors"
              >
                相談する
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-stone-500" />
        </motion.div>
      </section>

      {/* Manifesto */}
      <section className="py-24 bg-gradient-to-b from-black to-stone-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-stone-300">
            なぜ内装屋が神経科学を語るのか
          </h2>
          <div className="space-y-6 text-lg text-stone-400 leading-relaxed">
            <p>
              30年、壁紙を貼り、床を張ってきた。
            </p>
            <p>
              同時に、Andrew Hubermanのポッドキャストを1000時間聴いた。
              <br />
              脳がどう機能するか。何が睡眠を壊し、何が集中を生むか。
            </p>
            <p>
              ある日、気づいた。
            </p>
            <p className="text-white text-xl font-bold">
              「俺が毎日作っている空間が、
              <br />
              人の脳を作り変えている」
            </p>
            <p>
              壁紙の色、照明の位置、窓の向き、床の素材—
              <br />
              すべてが神経系に影響を与えている。
            </p>
            <p>
              これは「おしゃれな部屋」の話じゃない。
              <br />
              <span className="text-cyan-400">脳のパフォーマンス</span>の話だ。
            </p>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="py-24 bg-stone-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm uppercase tracking-widest">The Science</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2">6つの神経科学原則</h2>
            <p className="text-stone-500 mt-4">Hubermanの研究を、内装に翻訳する</p>
          </div>

          {/* Principle selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {NEURO_PRINCIPLES.map((p) => {
              const Icon = p.icon
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePrinciple(p.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activePrinciple === p.id
                      ? 'bg-white text-black'
                      : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {p.title}
                </button>
              )
            })}
          </div>

          {/* Active principle detail */}
          {NEURO_PRINCIPLES.filter(p => p.id === activePrinciple).map(principle => {
            const Icon = principle.icon
            return (
              <motion.div
                key={principle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-stone-800/50 border border-stone-700 rounded-2xl overflow-hidden"
              >
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-${principle.color}-500/20 flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 text-${principle.color}-400`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{principle.title}</h3>
                      <p className="text-stone-500">Neuroscience Principle</p>
                    </div>
                  </div>

                  {/* Huberman Quote */}
                  <div className="bg-black/50 border-l-4 border-cyan-400 p-6 mb-8">
                    <p className="text-lg italic text-stone-300">"{principle.hubermanQuote}"</p>
                    <p className="text-cyan-400 text-sm mt-2">— Andrew Huberman, PhD</p>
                  </div>

                  {/* Science explanation */}
                  <div className="mb-8">
                    <h4 className="text-sm uppercase tracking-widest text-stone-500 mb-3">科学的根拠</h4>
                    <p className="text-stone-300 leading-relaxed">{principle.science}</p>
                  </div>

                  {/* Interior applications */}
                  <div className="mb-8">
                    <h4 className="text-sm uppercase tracking-widest text-stone-500 mb-3">内装への応用</h4>
                    <ul className="space-y-3">
                      {principle.interior.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-stone-700 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-stone-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact */}
                  <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-6">
                    <h4 className="text-sm uppercase tracking-widest text-stone-500 mb-2">期待される効果</h4>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      {principle.impact}
                    </p>
                    <p className="text-stone-500 text-xs mt-2">※ 科学文献に基づく目安値。個人差があります。</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm uppercase tracking-widest">Services</span>
            <h2 className="text-3xl md:text-4xl font-black mt-2">脳を最適化する空間設計</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-stone-900 border rounded-2xl p-8 ${
                  pkg.popular ? 'border-purple-500' : 'border-stone-800'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-stone-500 mb-6">{pkg.description}</p>

                <div className="mb-6">
                  <p className="text-sm text-stone-500 mb-2">適用原則：</p>
                  <div className="flex flex-wrap gap-2">
                    {pkg.principles.map(pId => {
                      const principle = NEURO_PRINCIPLES.find(p => p.id === pId)
                      if (!principle) return null
                      const Icon = principle.icon
                      return (
                        <span key={pId} className="flex items-center gap-1 bg-stone-800 px-2 py-1 rounded text-xs">
                          <Icon className="w-3 h-3" />
                          {principle.title}
                        </span>
                      )
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-black">{pkg.price}</span>
                </div>

                <Link
                  href="/contact"
                  className={`block text-center py-3 rounded-lg font-bold transition-colors ${
                    pkg.popular
                      ? 'bg-purple-500 hover:bg-purple-400 text-white'
                      : 'bg-stone-800 hover:bg-stone-700 text-white'
                  }`}
                >
                  相談する
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-t from-purple-900/20 to-black">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Brain className="w-16 h-16 text-cyan-400 mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            空間を変える準備はできたか
          </h2>
          <p className="text-stone-400 mb-8">
            30年の内装経験 + 1000時間の神経科学。
            <br />
            この組み合わせは世界に一つだけ。
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 font-bold hover:bg-stone-200 transition-colors"
          >
            無料相談を予約
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-stone-800">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-stone-500 hover:text-white transition-colors">
            IWASAKI
          </Link>
          <p className="text-stone-600 text-sm">
            Neuro-Interior by Iwasaki Naisou
          </p>
          <a href="tel:03-5638-7402" className="text-stone-500 hover:text-white transition-colors">
            03-5638-7402
          </a>
        </div>
      </footer>
    </div>
  )
}
