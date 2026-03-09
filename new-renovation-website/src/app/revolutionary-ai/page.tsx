'use client'

import { useState } from 'react'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import Link from 'next/link'
import { journalEntries } from '@/data/journal'

type Question = {
  text: string
  options: { label: string; value: string; description: string }[]
}

const QUESTIONS: Question[] = [
  {
    text: '「案件が減ってきた」という前提が誤解だな。',
    options: [
      { label: 'A', value: 'A', description: '自分の強みを活かした新しいサービスを提案' },
      { label: 'B', value: 'B', description: '現在のクライアントに追加の価値を提供する方法を考える' },
      { label: 'C', value: 'C', description: '同業者と協力し、共同受注を目指す' },
    ],
  },
  {
    text: '「元請け探し」は戦略的な選択だ。',
    options: [
      { label: 'A', value: 'A', description: '自分の実績をまとめてポートフォリオを作成' },
      { label: 'B', value: 'B', description: '地域の業者ネットワークに参加し、関係構築' },
      { label: 'C', value: 'C', description: 'SNSや業界イベントで直接アプローチする' },
    ],
  },
  {
    text: 'あとは「実行」と「検証」だけだ。',
    options: [
      { label: 'A', value: 'A', description: 'まず小さく試して反応を見る' },
      { label: 'B', value: 'B', description: '徹底的に準備してから動く' },
      { label: 'C', value: 'C', description: '今すぐ全力で動き出す' },
    ],
  },
]

function getDiagnosisResult(answers: string[]): string {
  const pattern = answers.join('')

  const results: Record<string, string> = {
    'AAA': '慎重な実験タイプ。新サービス×ポートフォリオ×小さく試す。リスクは低いが、スピード不足の可能性。',
    'AAB': '準備重視タイプ。新サービス×ポートフォリオ×徹底準備。完成度高いが、市場タイミング逃す可能性。',
    'AAC': '突破型タイプ。新サービス×ポートフォリオ×即行動。最速だが、方向性ブレる可能性。',
    'ABA': 'ネットワーク実験タイプ。新サービス×関係構築×小さく試す。人脈重視で安定志向。',
    'ABB': 'ネットワーク準備タイプ。新サービス×関係構築×徹底準備。信頼構築型、時間かかる。',
    'ABC': 'ネットワーク突破タイプ。新サービス×関係構築×即行動。人脈×行動力、バランス型。',
    'ACA': '発信実験タイプ。新サービス×直接アプローチ×小さく試す。SNS活用で反応見る。',
    'ACB': '発信準備タイプ。新サービス×直接アプローチ×徹底準備。コンテンツ重視、質優先。',
    'ACC': '発信突破タイプ。新サービス×直接アプローチ×即行動。SNS×即実行、最も攻撃的。',
    'BAA': '価値提供実験タイプ。既存客深掘り×ポートフォリオ×小さく試す。安全志向、既存基盤重視。',
    'BAB': '価値提供準備タイプ。既存客深掘り×ポートフォリオ×徹底準備。既存客満足度最優先。',
    'BAC': '価値提供突破タイプ。既存客深掘り×ポートフォリオ×即行動。既存客に即提案。',
    'BBA': '関係深化実験タイプ。既存客深掘り×関係構築×小さく試す。最も保守的、リスク回避。',
    'BBB': '関係深化準備タイプ。既存客深掘り×関係構築×徹底準備。超安定志向、成長遅い可能性。',
    'BBC': '関係深化突破タイプ。既存客深掘り×関係構築×即行動。既存基盤×人脈、堅実型。',
    'BCA': '既存客発信実験タイプ。既存客深掘り×直接アプローチ×小さく試す。既存客事例をSNS発信。',
    'BCB': '既存客発信準備タイプ。既存客深掘り×直接アプローチ×徹底準備。事例コンテンツ重視。',
    'BCC': '既存客発信突破タイプ。既存客深掘り×直接アプローチ×即行動。既存実績を即発信。',
    'CAA': '協力実験タイプ。同業協力×ポートフォリオ×小さく試す。協力関係を慎重に構築。',
    'CAB': '協力準備タイプ。同業協力×ポートフォリオ×徹底準備。共同体制を入念に準備。',
    'CAC': '協力突破タイプ。同業協力×ポートフォリオ×即行動。即座に協力提案。',
    'CBA': '協力ネットワーク実験タイプ。同業協力×関係構築×小さく試す。業界内で実験的協力。',
    'CBB': '協力ネットワーク準備タイプ。同業協力×関係構築×徹底準備。業界団体型、組織重視。',
    'CBC': '協力ネットワーク突破タイプ。同業協力×関係構築×即行動。業界内で即座に動く。',
    'CCA': '協力発信実験タイプ。同業協力×直接アプローチ×小さく試す。協力事例をSNS実験。',
    'CCB': '協力発信準備タイプ。同業協力×直接アプローチ×徹底準備。協力体制を発信準備。',
    'CCC': '協力発信突破タイプ。同業協力×直接アプローチ×即行動。最も協調的かつ攻撃的。',
  }

  return results[pattern] || '診断結果を生成できませんでした。'
}

export default function RevolutionaryAIPage() {
  const [currentStep, setCurrentStep] = useState<'start' | 'question' | 'result'>('start')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [diagnosisResult, setDiagnosisResult] = useState('')

  const startDiagnosis = () => {
    setCurrentStep('question')
    setCurrentQuestionIndex(0)
    setAnswers([])
    setDiagnosisResult('')
  }

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      const result = getDiagnosisResult(newAnswers)
      setDiagnosisResult(result)
      setCurrentStep('result')
    }
  }

  const resetDiagnosis = () => {
    setCurrentStep('start')
    setCurrentQuestionIndex(0)
    setAnswers([])
    setDiagnosisResult('')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* パンくずリスト */}
      <nav className="container mx-auto px-4 py-4 text-sm text-slate-600" aria-label="パンくずリスト">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-green-600 transition-colors">
              ホーム
            </Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-medium" aria-current="page">革命型AI（実験）</li>
        </ol>
      </nav>

      {/* ヘッダー */}
      <section className="border-b border-slate-200 py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block border border-red-600 px-4 py-2 text-sm font-medium mb-6 text-red-600">
              ⚠️ 実験的機能
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">革命型AI</h1>
            <p className="text-lg text-slate-700 mb-6">
              悩み相談はしない。質問もしない。変に寄り添わない。<br />
              AI主導で選択肢を提示する。あなたは選ぶだけ。
            </p>

            {/* 特徴 */}
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="border border-slate-200 p-4 bg-white">
                <div className="font-bold text-red-600 mb-2">❌ やらないこと</div>
                <ul className="space-y-1 text-slate-600">
                  <li>・悩み相談</li>
                  <li>・質問攻め</li>
                  <li>・寄り添い</li>
                </ul>
              </div>
              <div className="border border-slate-200 p-4 bg-white">
                <div className="font-bold text-green-600 mb-2">✅ やること</div>
                <ul className="space-y-1 text-slate-600">
                  <li>・AI主導</li>
                  <li>・3つの選択肢提示</li>
                  <li>・あなたは選ぶだけ</li>
                </ul>
              </div>
              <div className="border border-slate-200 p-4 bg-white">
                <div className="font-bold text-[#D4AF37] mb-2">💡 哲学</div>
                <ul className="space-y-1 text-slate-600">
                  <li>・職人が主人</li>
                  <li>・二項対立ではない</li>
                  <li>・30年の思想</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 診断エリア */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* スタート画面 */}
          {currentStep === 'start' && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">3問診断</h2>
              <p className="text-slate-700 mb-8">
                3つの質問に答えるだけで、あなたの戦略タイプを診断します。<br />
                質問はしません。選択肢を提示します。あなたは選ぶだけです。
              </p>
              <button
                onClick={startDiagnosis}
                className="px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-bold text-lg"
              >
                診断を開始する
              </button>
            </div>
          )}

          {/* 質問画面 */}
          {currentStep === 'question' && (
            <div className="py-8">
              {/* 進捗表示 */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  {QUESTIONS.map((_, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index < currentQuestionIndex
                          ? 'bg-green-600 text-white'
                          : index === currentQuestionIndex
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
                <p className="text-center text-sm text-slate-600">
                  質問 {currentQuestionIndex + 1} / {QUESTIONS.length}
                </p>
              </div>

              {/* 質問文 */}
              <div className="bg-slate-900 text-white p-6 rounded-lg mb-6">
                <p className="text-xl font-bold">{QUESTIONS[currentQuestionIndex].text}</p>
              </div>

              {/* 選択肢 */}
              <div className="space-y-4">
                {QUESTIONS[currentQuestionIndex].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full text-left p-6 border-2 border-slate-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-100 group-hover:bg-green-600 flex items-center justify-center text-xl font-bold text-slate-900 group-hover:text-white transition-colors">
                        {option.label}
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-medium text-slate-900 group-hover:text-green-900">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 結果画面 */}
          {currentStep === 'result' && (
            <div className="py-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 text-slate-900">診断結果</h2>
                <p className="text-sm text-slate-600">
                  選択: {answers.join(' → ')}
                </p>
              </div>

              <div className="bg-slate-900 text-white p-8 rounded-lg mb-8">
                <p className="text-xl leading-relaxed">{diagnosisResult}</p>
              </div>

              <div className="text-center space-y-4">
                <button
                  onClick={resetDiagnosis}
                  className="px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-bold"
                >
                  もう一度診断する
                </button>
                <p className="text-sm text-slate-600">
                  ⚠️ この診断は実験的なものです。実際のビジネス判断の参考としてご利用ください。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 最新の記事セクション */}
      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-slate-900">最新の記事</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {journalEntries.slice(0, 3).map((entry) => (
                <Link
                  key={entry.id}
                  href={`/journal/${entry.id}`}
                  className="group block relative overflow-hidden rounded-lg border border-slate-200 bg-white hover:shadow-xl transition-all duration-300"
                >
                  {/* 透過背景画像 */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600" />
                  </div>

                  {/* コンテンツ */}
                  <div className="relative p-6">
                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <time className="text-slate-600">{entry.date}</time>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-600">{entry.readTime}分で読めます</span>
                    </div>

                    <h3 className="text-lg font-bold mb-3 text-slate-900 group-hover:text-green-600 transition-colors line-clamp-2">
                      {entry.title}
                    </h3>

                    <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                      {entry.summary}
                    </p>

                    {/* タグ */}
                    <div className="flex flex-wrap gap-2">
                      {entry.businessTags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* もっと見るボタン */}
            <div className="text-center mt-8">
              <Link
                href="/journal"
                className="inline-block px-6 py-3 border-2 border-slate-900 text-slate-900 rounded-lg hover:bg-slate-900 hover:text-white transition-colors font-bold"
              >
                記事一覧を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
