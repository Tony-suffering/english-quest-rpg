import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import { MessageCircle, Clock, BookOpen, Globe, Sparkles, Zap, Code, Shield, TrendingUp, Users, CheckCircle2, ArrowRight } from 'lucide-react'
import SocialShare from '@/components/website/SocialShare'
import Link from 'next/link'

export default function AITechnologyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* バッジ */}
          <div className="text-center mb-6">
            <div className="inline-block bg-[#10B981]/10 text-[#10B981] px-4 py-2 text-sm font-bold mb-4 border border-[#10B981] rounded-full">
              技術 × 革新 × 英語
            </div>
          </div>

          {/* メインタイトル */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 text-center leading-tight text-[#252423]">
            AI × DX × 英語 で<br /><span className="text-[#10B981]">内装業界</span>を革新する
          </h1>

          <p className="text-base sm:text-lg text-[#252423]/70 max-w-3xl mx-auto text-center leading-relaxed mb-8">
            1994年創業の内装会社が、最先端AI技術の導入に挑戦。<br />
            伝統の職人技と、AI・グローバル対応を融合させた新しい形を追求しています。
          </p>

          {/* 特徴カード */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white border-2 border-[#10B981] p-4 rounded-lg text-center">
              <div className="text-3xl font-black text-[#10B981] mb-1">24/7</div>
              <div className="text-sm text-[#252423]/70">AI対応</div>
            </div>
            <div className="bg-white border-2 border-[#D4AF37] p-4 rounded-lg text-center">
              <div className="text-3xl font-black text-[#D4AF37] mb-1">日英</div>
              <div className="text-sm text-[#252423]/70">バイリンガル対応</div>
            </div>
            <div className="bg-white border-2 border-[#82EDA6] p-4 rounded-lg text-center">
              <div className="text-3xl font-black text-[#82EDA6] mb-1">30年</div>
              <div className="text-sm text-[#252423]/70">業界実績</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI職人タクミ - メインコンテンツ */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#252423] mb-4">
              AI職人「タクミ」
            </h2>
            <p className="text-base sm:text-lg text-[#252423]/70 max-w-2xl mx-auto">
              イワサキ内装の30年の知識と経験を学習したAIアシスタント。<br />
              いつでもお気軽にご相談いただけます。
            </p>
          </div>

          {/* タクミの機能カード */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* 基本相談機能 */}
            <div className="bg-gradient-to-br from-[#10B981]/5 to-white border-2 border-[#10B981]/20 p-8 rounded-xl hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-[#252423]">基本相談機能</h3>
              </div>
              <p className="text-[#252423]/70 mb-4 leading-relaxed">
                内装工事の基本的な疑問から、見積もりの目安、工事の流れまで、AIがお答えします。
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-1" />
                  <span>工事内容の詳細説明（クロス張替え、床材施工、ダイノックシートなど）</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-1" />
                  <span>おおよその費用感や工期の目安をご提示</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-1" />
                  <span>過去の施工事例のご紹介</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-1" />
                  <span>材料や工法の選び方のアドバイス</span>
                </li>
              </ul>
            </div>

            {/* いつでも相談可能 */}
            <div className="bg-gradient-to-br from-[#D4AF37]/5 to-white border-2 border-[#D4AF37]/20 p-8 rounded-xl hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-[#252423]">いつでも相談可能</h3>
              </div>
              <p className="text-[#252423]/70 mb-4 leading-relaxed">
                深夜でも休日でも、AIが即座に回答します。まずは気軽に話しかけてみてください。
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span>時間を気にせず相談可能</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span>休日・祝日も利用できます</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span>待ち時間ゼロ、すぐに回答</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span>必要に応じて人間のスタッフにスムーズに引き継ぎ</span>
                </li>
              </ul>
            </div>

            {/* 日英対応 */}
            <div className="bg-gradient-to-br from-[#82EDA6]/5 to-white border-2 border-[#82EDA6]/20 p-8 rounded-xl hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#82EDA6] rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-[#252423]">日本語・英語対応</h3>
              </div>
              <p className="text-[#252423]/70 mb-4 leading-relaxed">
                日本語だけでなく、英語でのご相談も可能です。海外のお客様もお気軽にどうぞ。
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#82EDA6] flex-shrink-0 mt-1" />
                  <span>日本語・英語の両方で自然な会話</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#82EDA6] flex-shrink-0 mt-1" />
                  <span>建築用語も正確に翻訳</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#82EDA6] flex-shrink-0 mt-1" />
                  <span>海外のお客様にも安心してご利用いただけます</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#82EDA6] flex-shrink-0 mt-1" />
                  <span>見積書・仕様書の英訳サポート</span>
                </li>
              </ul>
            </div>

            {/* 学習・進化 */}
            <div className="bg-gradient-to-br from-[#3B82F6]/5 to-white border-2 border-[#3B82F6]/20 p-8 rounded-xl hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#3B82F6] rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black text-[#252423]">継続的な学習と進化</h3>
              </div>
              <p className="text-[#252423]/70 mb-4 leading-relaxed">
                お客様との会話から学習し、日々進化しています。より良いサービス提供を目指します。
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-1" />
                  <span>最新の施工事例を随時学習</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-1" />
                  <span>よくある質問を蓄積してより的確な回答</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-1" />
                  <span>業界の最新トレンドを反映</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-1" />
                  <span>回答の精度が日々向上</span>
                </li>
              </ul>
            </div>
          </div>

          {/* タクミができること・できないこと */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-green-50 border-2 border-green-200 p-6 rounded-xl">
              <h3 className="text-lg font-black text-green-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                タクミができること
              </h3>
              <ul className="space-y-2 text-sm text-green-900">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>工事内容の説明・アドバイス</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>おおよその費用感・工期のご案内</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>施工事例のご紹介</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>材料・工法の選び方サポート</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>よくある質問への即答</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 p-6 rounded-xl">
              <h3 className="text-lg font-black text-amber-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                人間のスタッフにお任せください
              </h3>
              <ul className="space-y-2 text-sm text-amber-900">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">→</span>
                  <span>正式な見積もり作成（現地調査が必要）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">→</span>
                  <span>契約手続き・書類作成</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">→</span>
                  <span>複雑な現場状況の判断</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">→</span>
                  <span>緊急対応・トラブル対処</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">→</span>
                  <span>特殊な要望への対応</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 使用技術 */}
          <div className="bg-gray-50 border-2 border-[#DAE2E8] p-8 rounded-xl">
            <h3 className="text-2xl font-black text-[#252423] mb-6 text-center">使用技術</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg text-center border border-[#DAE2E8]">
                <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-[#252423] mb-2">Claude Sonnet 4.5</h4>
                <p className="text-sm text-[#252423]/70 mb-3">Anthropic社の最新AI言語モデル</p>
                <p className="text-xs text-[#252423]/60">高度な理解力と自然な会話を実現</p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center border border-[#DAE2E8]">
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-[#252423] mb-2">OpenAI GPT-4o mini</h4>
                <p className="text-sm text-[#252423]/70 mb-3">高速レスポンスで快適な会話</p>
                <p className="text-xs text-[#252423]/60">即座に回答、待ち時間ゼロ</p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center border border-[#DAE2E8]">
                <div className="w-16 h-16 bg-[#82EDA6] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-[#252423] mb-2">Next.js 15</h4>
                <p className="text-sm text-[#252423]/70 mb-3">モダンなWebフレームワーク</p>
                <p className="text-xs text-[#252423]/60">高速で安定したシステム</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI English Training */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 text-sm font-bold mb-4 border border-amber-300 rounded-full">
              企画中・開発予定
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#252423] mb-4">
              AI現場英語トレーニングシステム
            </h2>
            <p className="text-base sm:text-lg text-[#252423]/70 max-w-2xl mx-auto">
              現在企画中の英語学習システムです。<br />
              将来的には、建設現場で実際に使える英語力をAIで効率的に学習できる仕組みを構築予定です。
            </p>
          </div>

          {/* 学習カリキュラム（構想） */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border-2 border-[#DAE2E8] p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#10B981] rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h3 className="text-lg font-black text-[#252423]">現場英語</h3>
              </div>
              <p className="text-sm text-[#252423]/70 mb-4">
                作業指示、工具名、材料名など、建設現場で必要な英語表現を集中学習する構想です。
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981]">•</span>
                  <span>基本的な作業指示（切る、貼る、測る等）</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981]">•</span>
                  <span>工具・材料の英語名（ドライバー、クロス等）</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981]">•</span>
                  <span>寸法・数量の表現（3メートル、10枚等）</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981]">•</span>
                  <span>品質に関する用語（まっすぐ、丁寧に等）</span>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#DAE2E8] p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h3 className="text-lg font-black text-[#252423]">安全指示</h3>
              </div>
              <p className="text-sm text-[#252423]/70 mb-4">
                現場の安全確保に必要な警告・注意喚起の英語表現を学習する構想です。
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span>危険警告の表現（危ない、注意等）</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span>保護具の着用指示（ヘルメット、手袋等）</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span>緊急時の対応（逃げろ、助けて等）</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span>禁止事項の伝え方（触るな、入るな等）</span>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-[#DAE2E8] p-6 rounded-xl hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#82EDA6] rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h3 className="text-lg font-black text-[#252423]">実践会話</h3>
              </div>
              <p className="text-sm text-[#252423]/70 mb-4">
                外国人労働者とのコミュニケーションに必要な日常会話を練習する構想です。
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[#82EDA6]">•</span>
                  <span>挨拶・自己紹介（おはよう、私は〜等）</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#82EDA6]">•</span>
                  <span>進捗確認・報告（終わった、もうすぐ等）</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#82EDA6]">•</span>
                  <span>質問・確認の仕方（これでいい？等）</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#82EDA6]">•</span>
                  <span>感謝・謝罪の表現（ありがとう、ごめん等）</span>
                </div>
              </div>
            </div>
          </div>

          {/* 学習システムの構想 */}
          <div className="bg-white border-2 border-[#10B981] p-8 rounded-xl">
            <h3 className="text-xl font-black text-[#252423] mb-6 text-center">学習システムの構想（開発予定）</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-[#10B981] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#252423] mb-1">レベル別カリキュラム</h4>
                  <p className="text-sm text-[#252423]/70">初心者から上級者まで、レベルに合わせた学習プランを検討中</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-[#10B981] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#252423] mb-1">実践的なシチュエーション</h4>
                  <p className="text-sm text-[#252423]/70">実際の現場で使う表現を重点的に学習できるよう企画中</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-[#10B981] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#252423] mb-1">24時間いつでも学習</h4>
                  <p className="text-sm text-[#252423]/70">スキマ時間を活用して効率的に学習できる仕組みを構想中</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="w-6 h-6 text-[#10B981] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#252423] mb-1">AIとの会話練習</h4>
                  <p className="text-sm text-[#252423]/70">恥ずかしがらずに何度でも練習できる環境を目指しています</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DX推進の取り組み */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#252423] mb-4">
              DX推進への取り組み
            </h2>
            <p className="text-base sm:text-lg text-[#252423]/70 max-w-2xl mx-auto">
              伝統的な内装業に最先端技術を導入し、<br />
              業界全体のデジタルトランスフォーメーションに貢献します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-[#DAE2E8] p-6 rounded-xl">
              <h3 className="text-lg font-black text-[#252423] mb-3">デジタル施工管理</h3>
              <p className="text-sm text-[#252423]/70 mb-4">
                現場の進捗をリアルタイムで可視化。写真・図面・スケジュールを一元管理。
              </p>
              <ul className="space-y-1 text-xs text-[#252423]/60">
                <li>• 工程表のデジタル化</li>
                <li>• 写真による進捗記録</li>
                <li>• クラウド共有で情報連携</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-[#DAE2E8] p-6 rounded-xl">
              <h3 className="text-lg font-black text-[#252423] mb-3">Webお問い合わせ対応</h3>
              <p className="text-sm text-[#252423]/70 mb-4">
                Webサイトから24時間いつでもお問い合わせ可能。AIタクミが基本的なご質問にお答えします。
              </p>
              <ul className="space-y-1 text-xs text-[#252423]/60">
                <li>• 24時間受付可能</li>
                <li>• 工事内容のご相談</li>
                <li>• おおよその費用感をご案内</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-[#DAE2E8] p-6 rounded-xl">
              <h3 className="text-lg font-black text-[#252423] mb-3">職人ネットワーク</h3>
              <p className="text-sm text-[#252423]/70 mb-4">
                50名超の職人を効率的に管理。スキルマッチングで最適な人材配置を実現。
              </p>
              <ul className="space-y-1 text-xs text-[#252423]/60">
                <li>• スケジュール一元管理</li>
                <li>• スキルマッチング</li>
                <li>• 自動通知システム</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 経営理念 */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-[#DAE2E8] p-8 sm:p-12 rounded-xl">
            <h2 className="text-2xl sm:text-3xl font-black text-[#252423] mb-6 text-center">
              伝統と革新の融合
            </h2>
            <div className="space-y-4 text-[#252423]/80 leading-relaxed">
              <p>
                1994年の創業以来、確かな技術と誠実な対応で、お客様の信頼を積み重ねてきました。
              </p>
              <p>
                内装職人として培ってきた30年の経験と知識を、次の世代につなげたい。
                そんな想いから、最先端のAI技術の導入に挑戦しています。
              </p>
              <p>
                AI職人「タクミ」は、まだまだ発展途上です。完璧ではありませんが、
                お客様の疑問に答え、内装工事への理解を深めていただくお手伝いができればと考えています。
              </p>
              <p className="font-bold text-[#252423] pt-4 border-t-2 border-[#10B981]">
                伝統の技と最新技術を融合させ、より良いサービスをお届けする。<br />
                イワサキ内装の挑戦は、これからも続きます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#10B981] to-[#0ea572] text-white p-8 sm:p-12 text-center rounded-xl shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-black mb-4">
              まずはAI職人「タクミ」に<br className="sm:hidden" />相談してみませんか？
            </h3>
            <p className="text-base opacity-90 max-w-3xl mx-auto leading-relaxed mb-8">
              見積もり相談、施工の疑問、工事の流れなど、<br />
              AIが即座にお答えします。もちろん無料です。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-white text-[#10B981] px-8 py-4 text-base font-bold hover:bg-gray-100 transition-all rounded-full shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>AIタクミに相談する</span>
              </Link>
              <Link
                href="/contact"
                className="bg-[#10B981] text-white px-8 py-4 text-base font-bold border-2 border-white hover:bg-[#0ea572] transition-all rounded-full inline-flex items-center justify-center gap-2"
              >
                <span>お問い合わせフォーム</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SNSシェア */}
      <section className="py-8 bg-white border-t border-[#DAE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#DAE2E8] p-4">
            <SocialShare
              title="AI × DX × English で内装業界を革新 | イワサキ内装"
              description="AI職人タクミ、建設現場英語トレーニング。伝統の職人技と最先端技術の融合。24時間対応、日英バイリンガル対応。"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
