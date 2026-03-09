'use client'

import { useState } from 'react'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import CasualSurvey from '@/components/website/CasualSurvey'
import { CheckCircle, Sparkles } from 'lucide-react'

export default function SurveyPage() {
  const [isSurveyOpen, setIsSurveyOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <Header />

        {/* Hero Section */}
        <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 bg-gradient-to-br from-[#D4AF37] via-[#c09020] to-[#b08010] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-bold">イワサキ内装からのお願い</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                簡単アンケート
              </h1>

              <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-white/90 font-bold">
                ご協力いただけますと幸いです
              </p>

              <p className="text-base sm:text-lg text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                10問ほどの簡単な質問にお答えいただくだけです。<br />
                いただいたご意見はサービス向上に活用させていただきます。
              </p>

              <button
                onClick={() => setIsSurveyOpen(true)}
                className="relative inline-flex items-center gap-3 bg-white text-[#D4AF37] px-10 py-6 rounded-full text-2xl font-black shadow-2xl hover:scale-105 transition-all group"
              >
                <Sparkles className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span>アンケート開始</span>
                <div className="absolute -top-2 -right-2 bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-bold">
                  1〜2分
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* アンケートの特徴 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-[#252423] mb-4">
                アンケートの特徴
              </h2>
              <p className="text-lg text-[#252423]/70">
                簡単にお答えいただけます
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-[#DAE2E8] p-6 text-center hover:border-[#D4AF37] transition-colors">
                <div className="w-16 h-16 bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-3xl font-black mx-auto mb-4 rounded-full">
                  1
                </div>
                <h3 className="text-lg font-bold text-[#252423] mb-2">わずか1〜2分</h3>
                <p className="text-sm text-[#252423]/70">
                  10問だけの簡単なアンケートです
                </p>
              </div>

              <div className="bg-white border-2 border-[#DAE2E8] p-6 text-center hover:border-[#D4AF37] transition-colors">
                <div className="w-16 h-16 bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-3xl font-black mx-auto mb-4 rounded-full">
                  2
                </div>
                <h3 className="text-lg font-bold text-[#252423] mb-2">3択で簡単</h3>
                <p className="text-sm text-[#252423]/70">
                  選択肢から選ぶだけ。自由記入も可能です
                </p>
              </div>

              <div className="bg-white border-2 border-[#DAE2E8] p-6 text-center hover:border-[#D4AF37] transition-colors">
                <div className="w-16 h-16 bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-3xl font-black mx-auto mb-4 rounded-full">
                  3
                </div>
                <h3 className="text-lg font-bold text-[#252423] mb-2">サービス向上に</h3>
                <p className="text-sm text-[#252423]/70">
                  いただいたご意見を活かしてまいります
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-block bg-[#D4AF37]/10 border border-[#D4AF37] px-6 py-3">
                <p className="text-lg font-bold text-[#252423] flex items-center gap-2 justify-center">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  合計10問、1〜2分で完了
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-gray-50 border-t border-[#DAE2E8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-[#252423] mb-6">
              ご協力をお願いいたします
            </h2>
            <p className="text-base text-[#252423]/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              皆様の貴重なご意見をお聞かせください。<br />
              より良いサービス提供のために活用させていただきます。
            </p>
            <button
              onClick={() => setIsSurveyOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-white font-bold px-10 py-5 hover:bg-[#c09020] transition-all text-lg rounded-full shadow-lg"
            >
              <Sparkles className="w-6 h-6" />
              アンケートに回答する
            </button>
            <p className="text-sm text-[#252423]/50 mt-6">
              所要時間：約1〜2分
            </p>
          </div>
        </section>

        <Footer />
      </div>

      <CasualSurvey isOpen={isSurveyOpen} onClose={() => setIsSurveyOpen(false)} />
    </>
  )
}
