'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import { portfolioData } from '@/data/portfolio-real'
import DigitalHuman from '@/components/website/DigitalHuman'
import AnimatedCraftsman from '@/components/website/AnimatedCraftsman'

export default function ZehitomoLPPage() {
  // ゼヒトモ経由に適した実績を抽出（最新3件）
  const featuredProjects = portfolioData.slice(0, 3)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [isAITakumiOpen, setIsAITakumiOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* 背景画像 */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-white/95 to-white z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80"
            alt="内装工事"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-20">
          <div className="inline-block bg-green-500/10 text-green-600 px-6 py-2 text-sm font-bold mb-6 border-2 border-green-500 rounded-full">
            ゼヒトモをご利用の皆様へ
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            創業30年、都内施工実績<br />
            <span className="text-green-600">1,000+件の確かな技術</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
            大手企業のオフィスビルから<br />
            マンション・戸建てのリフォームまで、幅広い実績があります。<br />
            <span className="font-bold text-green-600">まずは無料見積もりからお気軽にご相談ください。</span>
          </p>

          {/* ゼヒトモ認定プロバッジ */}
          <div className="flex justify-center mb-12">
            <a
              href="https://www.zehitomo.com/profile/68f5b9930cef4f027670b288/pro?from=badge"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105 duration-200"
            >
              <img
                src="https://www.zehitomo.com/assets/_images/badge.png"
                alt="ゼヒトモ認定プロ"
                width="150"
                height="150"
                className="drop-shadow-xl"
              />
            </a>
            {/* ウィジェット版（本番環境で動作する可能性あり） */}
            <div id="zehitomo-pro-widget" className="ml-6"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="#zehitomo-difference"
              className="bg-green-500 text-white px-10 py-5 font-bold text-xl hover:bg-green-600 transition-all shadow-xl hover:shadow-2xl rounded-lg transform hover:scale-[1.02] hover:-translate-y-0.5 duration-200"
            >
              イワサキ内装の強みを見る
            </a>
            <a
              href="#contact-cta"
              className="bg-white text-gray-900 px-10 py-5 font-bold text-xl border-2 border-gray-300 hover:border-green-500 transition-all rounded-lg transform hover:scale-[1.02] duration-200"
            >
              ゼヒトモで相談する
            </a>
          </div>

          <p className="text-sm text-gray-500">
            見積もり無料 / 現地調査無料 / ゼヒトモ経由OK
          </p>
        </div>
      </section>

      {/* AI診断CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 relative overflow-hidden">
        {/* 背景装飾 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-green-600 text-white px-6 py-2 text-sm font-bold mb-6 rounded-full shadow-lg">
            まずは無料診断から
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
            あなたの理想の空間を<br />
            <span className="text-green-600">AIが診断します</span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
            簡単な質問に答えるだけで、あなたにピッタリの空間タイプを診断。<br />
            <span className="font-bold text-green-600">AI職人タクミ</span>が、音声でもチャットでも気軽に相談に乗ります。
          </p>

          {/* タクミ紹介カード */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl border-4 border-green-500 mb-8 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 relative">
                  <AnimatedCraftsman state="idle" />
                </div>
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">AI職人タクミと一緒に空間を考えましょう！</h3>
                <p className="text-gray-700 mb-4">
                  簡単な診断であなたにぴったりの空間タイプを見つけます。
                  音声でもチャットでも気軽に相談できますよ。
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
                  <p className="text-xs text-gray-600 mb-2">
                    <span className="font-bold text-yellow-700">⚠️ 現在β版（実験段階）です</span><br />
                    まだ開発途中のため、うまく動かないことがあります。エラーが出たらごめんなさい！
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-bold text-green-600">💬 気軽に試してみてください！</span><br />
                    診断結果を見て、興味があればご連絡いただければ嬉しいです。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setIsAITakumiOpen(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-6 font-bold text-2xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-2xl hover:shadow-green-500/50 rounded-xl transform hover:scale-105 hover:-translate-y-1 duration-300 animate-pulse"
            >
              💬 タクミと話してみる（無料）
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-6">
            約2分で完了 / スマホでもOK / 気軽にどうぞ
          </p>
        </div>
      </section>

      {/* 3つの安心 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white" id="three-points" data-animate>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-12 text-center opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]">
            イワサキ内装の<span className="text-green-600">3つの安心</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: '1,000+',
                title: '都内施工実績',
                desc: '1994年創業以来、都内を中心に1,000件以上の施工実績。大手企業のオフィスビルからマンション・戸建てまで幅広く対応。'
              },
              {
                number: '30年',
                title: '確かな技術と経験',
                desc: '経験豊富な職人が、下地処理から仕上げまで丁寧に施工。見えない部分こそ、仕上がりの差が出ます。'
              },
              {
                number: '無料',
                title: 'お会いしてから提案',
                desc: '現地で実際にお会いし、お客様のご要望を丁寧にヒアリング。最適なプランを一緒に考えます。見積もり・現地調査無料。'
              }
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 p-8 rounded-xl hover:border-green-500 hover:shadow-md transition-all duration-150 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-5xl font-black text-green-500 mb-3">{item.number}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ゼヒトモとの違い */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50" id="zehitomo-difference" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 p-8 rounded-xl text-center opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]">
            <p className="text-lg text-gray-800 font-bold mb-2">
              ゼヒトモなら安心してご依頼いただけます
            </p>
            <p className="text-gray-600">
              ゼヒトモを通じてご依頼いただくことで、万が一のトラブル時もサポートが受けられます。<br />
              お客様に安心してご利用いただけるよう、誠実な対応を心がけています。
            </p>
          </div>
        </div>
      </section>

      {/* なぜ選ばれるのか */}
      <section id="why-us" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" data-animate>
        {/* 背景装飾 */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
              なぜイワサキ内装が<br className="sm:hidden" />選ばれるのか
            </h2>
            <p className="text-lg text-gray-600">
              ゼヒトモでご依頼いただいた多くのお客様から、高い評価をいただいています。
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: '創業30年以上の実績と信頼',
                desc: '1994年の創業以来、都内を中心に1,000件以上の施工実績。経験豊富な職人が、確かな技術でお応えします。大手企業様からの継続依頼も多数いただいています。'
              },
              {
                title: '大手企業・オフィスビルの実績多数',
                desc: '大手企業のオフィスビル、商業施設など、厳しい品質基準をクリアした確かな施工品質。法人のお客様からも高い評価をいただいています。'
              },
              {
                title: '現地でのヒアリングを重視',
                desc: 'まずはお客様とお会いして、ご要望やお悩みを丁寧にお聞きします。実際の現場を見てから、最適なプランをご提案。納得いただけるまでご相談ください。'
              },
              {
                title: '下地処理からの徹底施工',
                desc: '表面だけでなく、下地処理から徹底的にこだわります。見えない部分こそ、仕上がりの差が出ます。長持ちする施工をお約束します。'
              },
              {
                title: 'マンション・オフィス・店舗すべて対応',
                desc: '住宅からオフィスビル、店舗まで幅広く対応。営業中の施工や夜間作業も柔軟に対応いたします。'
              },
              {
                title: '明朗会計・適正価格',
                desc: '見積もり内容を丁寧にご説明し、追加費用が発生する場合は事前にご相談。安心してお任せください。'
              },
              {
                title: 'アフターフォローも万全',
                desc: '施工後も長くお付き合いできる関係を大切にしています。定期メンテナンスのご案内や、次回のリフォーム時もお気軽にご相談いただけます。'
              }
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white border-l-4 border-green-500 p-6 shadow-md rounded-r-lg hover:shadow-lg hover:bg-green-50/30 transition-all duration-150 opacity-0 animate-[fadeInLeft_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 施工実績 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden" id="portfolio" data-animate>
        {/* 背景装飾 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
              施工実績
            </h2>
            <p className="text-lg text-gray-600">
              実際に施工した一部の案件をご紹介します
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredProjects.map((project, i) => (
              <div
                key={project.id}
                className="group bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-green-500 transition-all hover:shadow-md duration-150 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150"></div>
                </div>
                <div className="p-4">
                  <div className="text-xs text-green-600 font-bold mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]" style={{ animationDelay: '0.6s' }}>
            <Link
              href="/portfolio"
              className="inline-block bg-gray-900 text-white px-8 py-4 font-bold hover:bg-gray-800 transition-all rounded-lg transform hover:scale-[1.02] hover:shadow-xl duration-200"
            >
              すべての施工実績を見る
            </Link>
          </div>
        </div>
      </section>

      {/* 施工後もずっと安心 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
              施工後も、ずっと安心
            </h2>
            <p className="text-lg text-gray-600">
              イワサキ内装は「施工して終わり」ではありません。<br />
              施工後も長くお付き合いできる関係を大切にしています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="group bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 p-8 rounded-xl hover:shadow-md hover:border-blue-400 transition-all duration-150 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                施工後も、気になることがあればいつでも
              </h3>
              <p className="text-gray-600 leading-relaxed">
                「ちょっとここが気になる」「次はこうしたい」<br />
                そんなときは遠慮なくご連絡ください。もちろん見積もりは無料です。
              </p>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-white border-2 border-green-200 p-8 rounded-xl hover:shadow-md hover:border-green-400 transition-all duration-150 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                リピート・ご紹介のお客様多数
              </h3>
              <p className="text-gray-600 leading-relaxed">
                「前回もイワサキさんにお願いしたから」「知人に紹介されて」といったリピート・ご紹介のお客様が多いのも、私たちの誇りです。
              </p>
            </div>
          </div>

          <div className="bg-gray-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">
              施工記録アプリ「MapLog」で施工履歴を管理（オプション）
            </h3>
            <p className="text-gray-600 leading-relaxed">
              ご希望のお客様には、施工履歴をアプリで管理できるサービスもご用意。施工写真や使用材料、メンテナンス時期などを記録し、次回のリフォーム時にスムーズにご対応できます。
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-12 text-center">
            よくあるご質問
          </h2>

          <div className="space-y-6">
            {[
              {
                q: '見積もり後のキャンセルは可能ですか？',
                a: 'はい、可能です。見積もりをご確認いただき、ご納得いただけない場合はキャンセル料等は一切かかりません。'
              },
              {
                q: '工期はどのくらいかかりますか？',
                a: '施工内容により異なりますが、壁紙貼替（20帖程度）で2〜3日、床工事で3〜5日程度が目安です。現地調査時に正確な工期をお伝えします。'
              },
              {
                q: '支払い方法はどうなりますか？',
                a: '銀行振込、現金でのお支払いが可能です。大規模工事の場合は、着手金と完工後の2回払いにも対応いたします。'
              },
              {
                q: '土日や夜間の施工は可能ですか？',
                a: 'はい、可能です。オフィスや店舗の場合、営業時間外の施工も柔軟に対応いたします。ご相談ください。'
              },
              {
                q: 'マンションの管理組合への届出は必要ですか？',
                a: '多くのマンションでは事前届出が必要です。必要書類の準備や届出手続きもサポートいたしますので、ご安心ください。'
              },
              {
                q: '保証はありますか？',
                a: '施工後の不具合については、無償で対応いたします。具体的な保証内容は契約時にご説明いたします。'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-gray-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-start">
                  <span className="text-green-500 mr-3 flex-shrink-0">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-gray-700 ml-9 leading-relaxed">
                  <span className="text-green-500 font-bold mr-2">A.</span>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* お客様との長いお付き合い */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
            お客様との長いお付き合いを大切に
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
            イワサキ内装がゼヒトモ経由で初めてお会いするお客様でも、<br />
            <span className="font-bold text-green-600">「また次もお願いしたい」</span>と思っていただけるような、<br />
            誠実で丁寧な仕事を心がけています。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'リピート施工', desc: '「前回もお願いしたから」と何度もご依頼いただける信頼関係を築きます' },
              { title: 'ご紹介・口コミ', desc: '「知人に紹介されて」と、お客様からのご紹介も多数いただいています' },
              { title: '直接ご相談', desc: '次回以降は直接ご連絡いただいてももちろんOKです' }
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white border-2 border-gray-200 p-6 rounded-lg hover:border-green-500 hover:shadow-md transition-all duration-150 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg text-center">
            <p className="text-gray-800 font-bold mb-2">
              次回以降は直接ご連絡OK
            </p>
            <p className="text-gray-600 text-sm">
              ゼヒトモでご依頼いただいた後、2回目以降は直接ご連絡いただけます。<br />
              定期メンテナンスや追加工事の際も、遠慮なくお声がけください。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact-cta" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-500 to-green-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            まずはゼヒトモで<br />お気軽にご相談ください
          </h2>
          <p className="text-lg sm:text-xl mb-10 opacity-90 leading-relaxed">
            このページをご覧いただき、ありがとうございます。<br />
            ゼヒトモのメッセージ機能から、ご希望の工事内容や時期をお知らせください。<br />
            現地調査・お見積もりは完全無料です。
          </p>

          <div className="bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-xl p-8 mb-8">
            <p className="text-xl font-bold mb-4">
              イワサキ内装を選んでいただけた理由
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-black mb-2">1,000+</p>
                <p className="text-sm">都内施工実績（30年間）</p>
              </div>
              <div>
                <p className="text-3xl font-black mb-2">30年</p>
                <p className="text-sm">創業からの経験</p>
              </div>
              <div>
                <p className="text-3xl font-black mb-2">無料</p>
                <p className="text-sm">見積もり・現地調査</p>
              </div>
            </div>
          </div>

          <a
            href="https://www.zehitomo.com/profile/68f5b9930cef4f027670b288/pro"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-gray-900 px-10 py-5 rounded-lg inline-block font-bold text-xl mb-8 hover:bg-yellow-300 transition-colors duration-150 transform hover:scale-105"
          >
            ゼヒトモでメッセージを送る
          </a>

          <div className="mt-8 text-xs opacity-75 border-t border-white/30 pt-6">
            <p className="mb-3">ゼヒトモを通じてお問い合わせいただくと、安心・安全なやり取りが可能です。</p>
            <p className="text-[10px] opacity-60">※ 施工後のメンテナンス等は直接ご連絡いただくこともできます / 有限会社イワサキ内装 / Email: kaz@iwasaki-naisou.jp</p>
          </div>
        </div>
      </section>

      <Footer />

      {/* AIタクミ診断モーダル */}
      <DigitalHuman
        isOpen={isAITakumiOpen}
        onClose={() => setIsAITakumiOpen(false)}
      />

      {/* ゼヒトモウィジェットスクリプト */}
      <Script
        src="https://api.zehitomo.com/api/pro-widgets/68f5b9930cef4f027670b288/script?lang=ja"
        strategy="afterInteractive"
      />
    </div>
  )
}
