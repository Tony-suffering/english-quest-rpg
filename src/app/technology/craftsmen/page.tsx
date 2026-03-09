import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import { CheckCircle2, ArrowRight, Camera, MapPin, BarChart3, Clock, Users, Smartphone } from 'lucide-react'
import Link from 'next/link'

export default function MapLogPage() {
  const features = [
    {
      title: '現場写真の記録',
      description: 'ビフォー・アフター写真を撮影して保存。日報作成の手間を大幅削減。',
      detail: '写真2枚 + 簡単なコメントで完了'
    },
    {
      title: '位置情報の自動取得',
      description: 'GPS機能で現場の場所を自動記録。後から地図で確認可能。',
      detail: '手入力不要、ワンタップで記録'
    },
    {
      title: '施工履歴の可視化',
      description: '過去の施工実績を地図上で確認。営業資料としても活用可能。',
      detail: 'エリア別の実績が一目瞭然'
    },
    {
      title: '統計データの確認',
      description: '月間施工件数、エリア分布などを自動集計。実績の見える化。',
      detail: 'モチベーション向上につながる'
    },
  ]

  const howToUse = [
    {
      step: '1',
      title: '現場到着時',
      action: 'ビフォー写真を撮影',
      time: '10秒'
    },
    {
      step: '2',
      title: '施工完了時',
      action: 'アフター写真を撮影',
      time: '10秒'
    },
    {
      step: '3',
      title: '記録保存',
      action: 'コメント入力して保存',
      time: '10秒'
    },
  ]

  const benefits = [
    '日報作成の時間短縮（1日10分 → 30秒）',
    '営業活動に使える実績データの蓄積',
    '過去の施工内容を簡単に振り返り可能',
    '写真で施工品質を証明できる',
    'お客様への報告資料として活用',
    'エリア別の実績が営業ツールになる',
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white border-b border-[#DAE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-[#10B981]/10 text-[#10B981] px-4 py-2 text-sm font-bold mb-6 border border-[#10B981]">
              職人向け営業支援アプリ
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#252423] mb-6 leading-tight">
              マップログ
            </h1>
            <p className="text-lg sm:text-xl text-[#252423]/80 mb-8 leading-relaxed">
              現場写真を撮るだけで、営業資料が自動で貯まる。<br />
              職人のための、シンプルな記録アプリ。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#10B981] text-white font-bold px-8 py-4 hover:bg-[#0ea572] transition-all"
              >
                <MapPin className="w-5 h-5" />
                お問い合わせ
              </Link>
            </div>
            <p className="text-sm text-[#252423]/60 mt-4">
              マップログは現在開発中です
            </p>
          </div>
        </div>
      </section>

      {/* こんな悩みありませんか */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#252423] mb-8 text-center">
            こんな悩み、ありませんか？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              '日報作成が面倒で時間がかかる',
              '過去の施工実績をすぐに見せられない',
              '営業用の資料を作る時間がない',
              'どこで何の工事をしたか忘れてしまう',
              'お客様への報告資料作りが大変',
              '実績の見える化ができていない',
            ].map((pain, index) => (
              <div key={index} className="bg-gray-50 border border-[#DAE2E8] p-4 flex items-start gap-3">
                <div className="w-6 h-6 bg-[#252423] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-[#252423]/80">{pain}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-[#10B981]/10 border border-[#10B981] p-6 text-center">
            <p className="text-lg font-bold text-[#252423]">
              マップログが、これらの悩みを解決します
            </p>
          </div>
        </div>
      </section>

      {/* 主な機能 */}
      <section className="py-12 sm:py-16 bg-gray-50 border-t border-[#DAE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#252423] mb-4">
              主な機能
            </h2>
            <p className="text-base text-[#252423]/70 max-w-2xl mx-auto">
              職人の現場作業に特化した、シンプルで実用的な機能
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white border-2 border-[#DAE2E8] p-6 hover:border-[#10B981] transition-colors">
                <h3 className="text-lg font-bold text-[#252423] mb-3 pb-3 border-b border-[#DAE2E8]">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#252423]/80 mb-3 leading-relaxed">
                  {feature.description}
                </p>
                <div className="text-xs text-[#10B981] font-bold bg-[#10B981]/5 p-2 border-l-2 border-[#10B981]">
                  {feature.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使い方 */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#252423] mb-4">
              たった30秒の簡単記録
            </h2>
            <p className="text-base text-[#252423]/70 max-w-2xl mx-auto">
              複雑な操作は一切なし。写真を撮るだけで記録完了。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howToUse.map((step, index) => (
              <div key={index} className="bg-white border-2 border-[#DAE2E8] p-6 text-center">
                <div className="w-16 h-16 bg-[#10B981] text-white flex items-center justify-center text-3xl font-black mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-sm text-[#252423]/60 mb-2">{step.title}</h3>
                <p className="text-lg font-bold text-[#252423] mb-2">{step.action}</p>
                <div className="text-xs text-[#10B981] font-bold">所要時間: {step.time}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <div className="inline-block bg-[#10B981]/10 border border-[#10B981] px-6 py-3">
              <p className="text-lg font-bold text-[#252423]">
                合計30秒で日報作成完了
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 導入メリット */}
      <section className="py-12 sm:py-16 bg-gray-50 border-t border-[#DAE2E8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#252423] mb-4">
              導入するメリット
            </h2>
          </div>
          <div className="bg-white border-2 border-[#DAE2E8] p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <p className="text-[#252423]/80">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 対象ユーザー */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#252423] mb-4">
              こんな職人さんにおすすめ
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: '個人事業主',
                desc: '実績を簡単に記録して、営業活動に活用したい'
              },
              {
                title: 'ベテラン職人',
                desc: '長年の経験と実績を、形として残したい'
              },
              {
                title: '若手職人',
                desc: '自分の成長を記録して、モチベーションを上げたい'
              },
            ].map((user, index) => (
              <div key={index} className="bg-white border-2 border-[#DAE2E8] p-6 text-center hover:border-[#10B981] transition-colors">
                <div className="w-12 h-12 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-[#252423]" />
                </div>
                <h3 className="text-lg font-bold text-[#252423] mb-2">{user.title}</h3>
                <p className="text-sm text-[#252423]/70">{user.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* スマホ対応 */}
      <section className="py-12 sm:py-16 bg-gray-50 border-t border-[#DAE2E8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border-2 border-[#DAE2E8] p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-[#10B981]/10 text-[#10B981] px-3 py-1 text-xs font-bold mb-4 border border-[#10B981]">
                  スマホ完全対応
                </div>
                <h2 className="text-2xl font-black text-[#252423] mb-4">
                  現場で、すぐに使える
                </h2>
                <p className="text-sm text-[#252423]/80 mb-6 leading-relaxed">
                  スマホに最適化されたUI。現場でサッと開いて、写真を撮って、保存するだけ。
                  複雑な操作は一切ありません。
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#252423]/80">iOS・Android対応</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#252423]/80">オフラインでも一時保存可能</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[#252423]/80">大きなボタンで操作しやすい</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 border-2 border-[#DAE2E8] p-8 text-center">
                <Smartphone className="w-24 h-24 text-[#252423]/30 mx-auto mb-4" />
                <p className="text-sm text-[#252423]/60">スマホ画面イメージ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#DAE2E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-[#252423] mb-6">
            今すぐ始める
          </h2>
          <p className="text-base text-[#252423]/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            マップログで実績を記録して、AIタクミでLP作成アンケートに回答。<br />
            あなた専用の営業ツールが手に入ります。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#10B981] text-white font-bold px-10 py-5 hover:bg-[#0ea572] transition-all text-lg"
            >
              <MapPin className="w-6 h-6" />
              お問い合わせ
            </Link>
          </div>
          <div className="border-t border-[#DAE2E8] pt-8">
            <p className="text-base text-[#252423]/70 mb-4">
              導入方法、料金、詳しい機能説明など、お気軽にお問い合わせください。
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-[#252423] font-bold px-8 py-4 hover:bg-gray-200 transition-all"
            >
              お問い合わせフォームへ
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-[#252423]/50 mt-4">
              デモ画面の確認や、使い方の説明も可能です
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
