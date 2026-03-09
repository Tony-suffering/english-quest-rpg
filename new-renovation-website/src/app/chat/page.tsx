'use client'

import { useState } from 'react'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import DigitalHuman from '@/components/website/DigitalHuman'
import FloatingElements from '@/components/website/FloatingElements'
import { MessageCircle, Mic, Clock, Brain, Sparkles } from 'lucide-react'

export default function ChatPage() {
  const [isDigitalHumanOpen, setIsDigitalHumanOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <Header />

        <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 bg-gradient-to-br from-[#10B981] via-[#0ea572] to-[#059669] text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-bold">24時間365日対応・完全無料</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                AI職人タクミ
              </h1>

              <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-white/90 font-bold">
                音声でも、テキストでも。あなたの理想をカタチに。
              </p>

              <p className="text-base sm:text-lg text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                見積もり相談、施工の疑問、工事の流れ、素材選び、デザイン提案まで。50人超の職人ネットワークと最新AIが、即座にお答えします。
              </p>

              <button
                onClick={() => setIsDigitalHumanOpen(true)}
                className="relative inline-flex items-center gap-3 bg-white text-[#10B981] px-10 py-6 rounded-full text-2xl font-black shadow-2xl hover:scale-105 transition-all group"
              >
                <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span>タクミに相談する</span>
                <div className="absolute -top-2 -right-2 bg-[#D4AF37] text-white px-3 py-1 rounded-full text-xs font-bold">
                  無料
                </div>
              </button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-[#252423] mb-4">
                タクミができること
              </h2>
              <p className="text-lg text-[#252423]/70">
                30年の実績とAI技術の融合で、あらゆるご相談にお応えします
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 border border-[#DAE2E8] p-6 hover:shadow-lg transition-all group">
                <div className="mb-4 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-[#10B981]" />
                </div>
                <h3 className="text-xl font-bold text-[#252423] mb-2">即時回答</h3>
                <p className="text-sm text-[#252423]/70">質問から数秒で、専門的な回答をお届けします</p>
              </div>
              <div className="bg-gray-50 border border-[#DAE2E8] p-6 hover:shadow-lg transition-all group">
                <div className="mb-4 group-hover:scale-110 transition-transform">
                  <Mic className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold text-[#252423] mb-2">音声対応</h3>
                <p className="text-sm text-[#252423]/70">話すだけでOK。テキスト入力が苦手でも安心</p>
              </div>
              <div className="bg-gray-50 border border-[#DAE2E8] p-6 hover:shadow-lg transition-all group">
                <div className="mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-[#82EDA6]" />
                </div>
                <h3 className="text-xl font-bold text-[#252423] mb-2">24時間対応</h3>
                <p className="text-sm text-[#252423]/70">深夜でも早朝でも、いつでもご相談いただけます</p>
              </div>
              <div className="bg-gray-50 border border-[#DAE2E8] p-6 hover:shadow-lg transition-all group">
                <div className="mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8 text-[#10B981]" />
                </div>
                <h3 className="text-xl font-bold text-[#252423] mb-2">学習機能</h3>
                <p className="text-sm text-[#252423]/70">会話を重ねるほど、あなたに最適な提案が可能に</p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <FloatingElements />
      <DigitalHuman isOpen={isDigitalHumanOpen} onClose={() => setIsDigitalHumanOpen(false)} />
    </>
  )
}
