'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { analyzeResults, type DiagnosticResult } from '@/lib/diagnostic-engine'
import { createClient } from '@/lib/supabase/client'

function ResultContent() {
  const searchParams = useSearchParams()
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    // URLパラメータから診断結果を取得
    const answers: DiagnosticResult = {
      Q1: (searchParams.get('Q1') as 'A' | 'B') || 'A',
      Q2: (searchParams.get('Q2') as 'A' | 'B') || 'A',
      Q3: (searchParams.get('Q3') as 'A' | 'B') || 'A',
      Q4: (searchParams.get('Q4') as 'A' | 'B') || 'A',
      Q5: (searchParams.get('Q5') as 'A' | 'B') || 'A',
      Q6: (searchParams.get('Q6') as 'A' | 'B') || 'A',
      Q7: (searchParams.get('Q7') as 'A' | 'B') || 'A',
      Q8: (searchParams.get('Q8') as 'A' | 'B') || 'A',
      Q9: (searchParams.get('Q9') as 'A' | 'B') || 'A',
      Q10: (searchParams.get('Q10') as 'A' | 'B') || 'A',
    }

    // 診断結果を分析
    const analyzed = analyzeResults(answers)
    setResult(analyzed)
  }, [searchParams])

  if (!result) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-900 text-xl">診断結果を分析中...</div>
      </div>
    )
  }

  const { bestMatch, alternatives, personalityProfile } = result

  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 mt-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            診断完了！
          </h1>
          <p className="text-xl text-gray-700">
            {personalityProfile}
          </p>
        </motion.div>

        {/* 最適商品 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              あなたに最適な空間
            </h2>
            <p className="text-gray-600">
              10問の診断から、あなたにピッタリの空間が見つかりました
            </p>
          </div>

          {/* ベストマッチカード */}
          <div className="bg-gradient-to-br from-emerald-50 to-yellow-50 border-2 border-emerald-200 rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="flex items-start justify-between mb-6">
              <div className="bg-gradient-to-r from-emerald-600 to-yellow-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                マッチ度 {Math.round((bestMatch.score / 100) * 100)}%
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {bestMatch.product.name}
            </h3>

            <p className="text-xl text-gray-700 mb-6">
              {bestMatch.product.description}
            </p>

            <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                なぜあなたに最適なのか？
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {bestMatch.product.whyPerfect}
              </p>
            </div>

            {/* 特徴 */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-gray-900 mb-4">特徴</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {bestMatch.product.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 価格と期間 */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-white rounded-xl px-6 py-4 shadow-sm">
                <div className="text-gray-600 text-sm mb-1">価格</div>
                <div className="text-2xl font-bold text-gray-900">
                  {bestMatch.product.price.display}
                </div>
              </div>
              <div className="bg-white rounded-xl px-6 py-4 shadow-sm">
                <div className="text-gray-600 text-sm mb-1">施工期間</div>
                <div className="text-2xl font-bold text-gray-900">
                  {bestMatch.product.duration}
                </div>
              </div>
            </div>

            {/* CTAボタン */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="flex-1 bg-gradient-to-r from-emerald-600 to-yellow-600 text-white text-center font-bold py-4 px-8 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                無料相談を予約する
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/chat"
                className="flex-1 bg-gray-200 text-gray-900 text-center font-bold py-4 px-8 rounded-xl hover:bg-gray-300 transition-all duration-300"
              >
                AIタクミに相談する
                <MessageCircle className="inline ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 他の候補 */}
        {alternatives.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              こちらもおすすめ
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {alternatives.map((alt: any, index: number) => (
                <motion.div
                  key={alt.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-emerald-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 pr-4">
                      {alt.product.name}
                    </h3>
                    <div className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full whitespace-nowrap">
                      {Math.round((alt.score / 100) * 100)}%
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    {alt.product.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold text-gray-900">
                      {alt.product.price.display}
                    </div>
                    <button className="text-emerald-600 hover:text-emerald-700 font-semibold">
                      詳しく見る →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 再診断ボタン */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 text-center"
        >
          <Link
            href="/diagnostic"
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← もう一度診断する
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-900 text-xl">読み込み中...</div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}
