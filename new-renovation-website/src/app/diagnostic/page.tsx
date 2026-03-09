'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

// 質問データ - Ver.3.0: 性格×価値観診断
const questions = [
  {
    id: 1,
    dimension: '性格軸：革新 vs 安定',
    psychologyType: 'innovation',
    question: '内装を選ぶとき、どちらに惹かれますか？',
    questionVariations: [
      '内装デザインを選ぶとき、どちらのタイプに共感しますか？',
      '空間づくりで、あなたが大切にしたいのはどちらですか？',
      '正直なところ、どちらの考え方に近いですか？',
      'リフォームするとしたら、どっち派ですか？',
      'インテリア選びで、あなたの本音はどちらですか？',
      '内装の方向性、どちらがしっくりきますか？',
      '家の雰囲気を決めるとき、どちらを重視しますか？',
      'デザイン選びで、あなたの価値観はどちら寄りですか？',
      '空間コンセプトを決めるとき、どちらに共感しますか？',
      'もし今すぐ内装を変えるなら、どちらを選びますか？'
    ],
    freeTextPrompt: 'もちろん、この二択に当てはまらない場合は、ご自身のお考えを自由にお聞かせください',
    optionA: {
      label: '定番の安心デザイン',
      description: '長年支持されている定番デザインに安心感を感じる',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80'
    },
    optionB: {
      label: '新しい実験的デザイン',
      description: '新しい実験的なスタイルにワクワクする',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 2,
    dimension: '性格軸：内向 vs 外向',
    psychologyType: 'introvert_extrovert',
    question: '空間の使い方について、お伺いしたいんです。\n\nご自宅は、ご自身やご家族が『深くリラックスできる場所』として考えていますか？\n\nそれとも、お客様を招いて『交流が生まれる場所』として考えていますか？\n\nこれによって、空間設計の方向性が大きく変わってきます。',
    freeTextPrompt: '実際のご利用シーンをお聞かせください',
    optionA: {
      label: '静かに過ごすシェルター空間',
      description: 'ご自身やご家族が深くリラックスできる場所',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80'
    },
    optionB: {
      label: '交流が生まれるステージ空間',
      description: 'お客様を招いて交流が生まれる場所',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 3,
    dimension: '増減の軸',
    question: 'モノとの関係性について、どちらが心地よいですか？',
    optionA: {
      label: 'ミニマル空間',
      description: 'モノを厳選し、余白の美しさを楽しむ「ミニマルな空間」に心地よさを感じる',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80'
    },
    optionB: {
      label: 'マキシマル空間',
      description: '好きなモノや思い出の品に囲まれた「マキシマルな空間」に豊かさを感じる',
      image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 4,
    dimension: '感覚の軸',
    question: '五感の優先順位として、どちらを最優先しますか？',
    optionA: {
      label: '視覚優先',
      description: '空間全体の「視覚的」な美しさやデザインの調和を最優先する',
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80'
    },
    optionB: {
      label: '触覚優先',
      description: '素足で触れる床や、手が触れる壁紙の「触覚的」な質感や素材感を最優先する',
      image: 'https://images.unsplash.com/photo-1615875474908-f403116f5301?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 5,
    dimension: '機能の軸',
    question: '日常の優先順位として、どちらが最も重要ですか？',
    optionA: {
      label: 'メンテナンス性',
      description: '汚れにくさ、掃除のしやすさといった「メンテナンス性（効率）」が最も重要だ',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80'
    },
    optionB: {
      label: '美観重視',
      description: 'たとえ手入れに手間がかかっても、自分が納得できる「美観（雰囲気）」が最も重要だ',
      image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 6,
    dimension: '素材の軸',
    question: '質感の好みとして、どちらに惹かれますか？',
    optionA: {
      label: '人工素材',
      description: '最新の技術で作られた、シャープで均質な「人工素材（タイル、金属、高機能化学繊維）」を好む',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&auto=format&fit=crop&q=80'
    },
    optionB: {
      label: '自然素材',
      description: '経年変化も楽しめる、不均質で温かみのある「自然素材（無垢材、和紙、漆喰）」を好む',
      image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 7,
    dimension: '色彩の軸',
    question: '光と影の好みとして、どちらが落ち着きますか？',
    optionA: {
      label: '光の空間',
      description: '空間全体が明るく、清潔感と開放感のある「光」を基調とした空間が落ち着く',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80'
    },
    optionB: {
      label: '影の空間',
      description: '間接照明や陰影が活きる、没入感と安心感のある「影」を基調とした空間が落ち着く',
      image: 'https://images.unsplash.com/photo-1618221710640-c0eaaa2adb49?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 8,
    dimension: '可変の軸',
    question: '空間の柔軟性について、どちらを求めますか？',
    optionA: {
      label: '可変性重視',
      description: '将来のライフスタイルの変化に対応できる「可変性・柔軟性」のある間取りやデザインを求める',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop&q=80'
    },
    optionB: {
      label: '特化性重視',
      description: '今の目的（例：書斎、寝室）に最適化された「特化性・専用性」の高い空間を求める',
      image: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 9,
    dimension: '知覚の軸',
    question: '快適さの定義として、どちらを重視しますか？',
    optionA: {
      label: '視覚的静寂',
      description: 'モノが整理整頓され、「視覚的なノイズ」が排除された空間を快適だと感じる',
      image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop&q=80'
    },
    optionB: {
      label: '聴覚的静寂',
      description: '生活音や外の騒音が遮断され、「聴覚的なノイズ」が排除された空間を快適だと感じる',
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 10,
    dimension: '行動の軸',
    question: 'リスクへの態度として、どちらを重視しますか？',
    optionA: {
      label: '予防的設計',
      description: '傷や汚れ、破損を未然に防ぐ「予防的」な設計（高耐久素材、保護コーティング）を重視する',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80'
    },
    optionB: {
      label: '修復可能性',
      description: '問題が起きた時に「修復可能」であること（補修のしやすさ、パーツ交換）を重視する',
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&auto=format&fit=crop&q=80'
    }
  }
]

export default function DiagnosticPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({})
  const [isStarted, setIsStarted] = useState(false)

  const handleAnswer = (answer: 'A' | 'B') => {
    setAnswers(prev => ({ ...prev, [currentStep + 1]: answer }))

    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 400)
    } else {
      // 診断完了 → 結果ページへ
      setTimeout(() => {
        const queryParams = new URLSearchParams()
        Object.entries(answers).forEach(([key, value]) => {
          queryParams.append(`Q${key}`, value)
        })
        queryParams.append(`Q${currentStep + 1}`, answer)
        window.location.href = `/diagnostic/result?${queryParams.toString()}`
      }, 600)
    }
  }

  const progress = isStarted ? ((currentStep + 1) / questions.length) * 100 : 0
  const currentQuestion = questions[currentStep]

  // スタート画面
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 mt-8">
            あなただけの
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-yellow-600 bg-clip-text text-transparent">
              理想空間診断
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-4">
            10の質問に答えるだけで
          </p>
          <p className="text-2xl font-semibold text-gray-800 mb-12">
            1024通りの中から、あなたにピッタリの空間が見つかります
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsStarted(true)}
            className="bg-gradient-to-r from-emerald-600 to-yellow-600 text-white text-xl font-bold py-6 px-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            診断を始める
            <ChevronRight className="inline ml-2 w-6 h-6" />
          </motion.button>

          <p className="text-gray-500 mt-8">所要時間：約2分</p>
        </motion.div>
      </div>
    )
  }

  // 質問画面
  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      {/* プログレスバー */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 text-sm">
            質問 {currentStep + 1} / {questions.length}
          </span>
          <span className="text-gray-600 text-sm">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-500 to-yellow-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* 質問カード */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {/* ディメンション */}
            <div className="text-center mb-6">
              <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                {currentQuestion.dimension}
              </span>
            </div>

            {/* 質問文 */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
              {currentQuestion.question}
            </h2>

            {/* 選択肢 */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* 選択肢A */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer('A')}
                className="group relative bg-white border-2 border-emerald-200 hover:border-emerald-500 rounded-2xl overflow-hidden text-left transition-all duration-300 hover:shadow-lg shadow-sm"
              >
                {/* 画像 */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={currentQuestion.optionA.image}
                    alt={currentQuestion.optionA.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* グラデーションオーバーレイ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* テキストコンテンツ */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {currentQuestion.optionA.label}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {currentQuestion.optionA.description}
                  </p>
                </div>

                {/* ホバー時のインジケーター */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 rounded-full p-2">
                    <ChevronRight className="w-6 h-6 text-emerald-500" />
                  </div>
                </div>
              </motion.button>

              {/* 選択肢B */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer('B')}
                className="group relative bg-white border-2 border-yellow-200 hover:border-yellow-500 rounded-2xl overflow-hidden text-left transition-all duration-300 hover:shadow-lg shadow-sm"
              >
                {/* 画像 */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={currentQuestion.optionB.image}
                    alt={currentQuestion.optionB.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* グラデーションオーバーレイ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* テキストコンテンツ */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                    {currentQuestion.optionB.label}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {currentQuestion.optionB.description}
                  </p>
                </div>

                {/* ホバー時のインジケーター */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 rounded-full p-2">
                    <ChevronRight className="w-6 h-6 text-yellow-500" />
                  </div>
                </div>
              </motion.button>
            </div>

            {/* 戻るボタン */}
            {currentStep > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="mt-8 text-gray-500 hover:text-gray-900 transition-colors mx-auto block"
              >
                ← 前の質問に戻る
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
