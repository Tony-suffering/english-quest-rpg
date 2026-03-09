'use client'

import Link from 'next/link'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import MapLogAppSection from '@/components/website/MapLogAppSection'

export default function WorkMapLPPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#10B981]/10 text-[#10B981] px-4 py-2 text-sm font-bold mb-6 border border-[#10B981]">
            職人の仕事を記録する
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#252423] mb-6 leading-tight">
            積み重ねてきた仕事を、<br />
            <span className="text-[#10B981]">地図に残しませんか？</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#252423]/70 mb-12 leading-relaxed max-w-2xl mx-auto">
            毎日の現場、一つひとつの仕事。<br />
            振り返ると、何件やったかも曖昧になっていませんか？<br className="hidden sm:block" />
            あなたの仕事を、記録として残しましょう。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/contact"
              className="bg-[#10B981] text-white px-8 py-4 font-bold text-lg hover:bg-[#0ea572] transition-all shadow-lg hover:shadow-xl rounded-lg"
            >
              無料で試してみる
            </Link>
            <a
              href="#how-it-works"
              className="bg-white text-[#252423] px-8 py-4 font-bold text-lg border-2 border-[#DAE2E8] hover:border-[#10B981] transition-all rounded-lg"
            >
              詳しく見る
            </a>
          </div>
        </div>
      </section>

      {/* 問題提起 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-[#252423] mb-12 text-center">
            こんなお悩み、ありませんか？
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '📝',
                title: '記録が残らない',
                desc: '何年も働いているのに、振り返ると何をしたか曖昧...'
              },
              {
                icon: '⏰',
                title: '時間がない',
                desc: '毎日現場に出ていて、記録する余裕がない'
              },
              {
                icon: '🤷',
                title: '実績を見せられない',
                desc: '元請けに実績を聞かれても、説明しづらい'
              }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 border-2 border-[#DAE2E8] p-6 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#252423] mb-2">{item.title}</h3>
                <p className="text-sm text-[#252423]/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 解決策 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#10B981]/10 text-[#10B981] px-4 py-2 text-sm font-bold mb-4 border border-[#10B981]">
              シンプルな解決策
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#252423] mb-6">
              必要なのは、たった3つだけ
            </h2>
          </div>

          <div className="bg-white border-2 border-[#10B981] p-8 sm:p-12 rounded-lg shadow-xl">
            <div className="space-y-8">
              {[
                {
                  number: '1',
                  title: 'いつ仕事したか',
                  example: '例: 2024年8月10日'
                },
                {
                  number: '2',
                  title: 'どこで仕事したか',
                  example: '例: 墨田区のビル'
                },
                {
                  number: '3',
                  title: '場所の住所',
                  example: '例: 東京都墨田区'
                }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#10B981] text-white flex items-center justify-center text-2xl font-black rounded-full flex-shrink-0">
                    {item.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#252423] mb-2">{item.title}</h3>
                    <p className="text-[#252423]/70">{item.example}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-[#10B981]/5 border border-[#10B981]/20 rounded-lg">
              <p className="text-center text-lg font-bold text-[#252423]">
                写真も、詳しいメモも必要ありません。<br />
                <span className="text-[#10B981]">日付と場所だけでOKです。</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* できること */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-[#252423] mb-12 text-center">
            これで、こんなことができます
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: '🗺️',
                title: '地図で見える',
                desc: 'あなたが仕事した場所に、印がつきます。「東京中、あちこち行ってたんだな」が一目でわかります。'
              },
              {
                icon: '📊',
                title: '件数がわかる',
                desc: '「何件仕事したか」が数字で見えます。「今年は38件」「累計153件」など、実績が明確に。'
              },
              {
                icon: '📅',
                title: '振り返れる',
                desc: '年別、月別で仕事を振り返れます。「去年は62件やってた」「最近多いな」がすぐわかる。'
              },
              {
                icon: '💼',
                title: '営業に使える',
                desc: '元請けに「実績ありますか？」と聞かれたら、地図を見せるだけ。圧倒的な説得力です。'
              }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 border border-[#DAE2E8] p-6 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#252423] mb-3">{item.title}</h3>
                <p className="text-[#252423]/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#10B981]/10 to-[#D4AF37]/10 border-2 border-[#10B981] p-8 rounded-lg">
            <h3 className="text-2xl font-black text-[#252423] mb-4 text-center">
              一番大切なこと
            </h3>
            <p className="text-lg text-[#252423]/80 text-center leading-relaxed">
              「俺、こんなに仕事してたんだ...」<br />
              積み重ねてきたものが、目に見える形になります。<br />
              <span className="text-[#10B981] font-bold">それが、一番の価値です。</span>
            </p>
          </div>
        </div>
      </section>

      {/* お客様の声（想定） */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-[#252423] mb-12 text-center">
            こんな風に感じていただきたい
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                text: '5年間、毎日現場に出てた。でも振り返ると、何件やったかも覚えてない。地図で見たら...こんなに仕事してたんだ。',
                author: 'クロス職人'
              },
              {
                text: '元請けに「実績ある？」って聞かれて、いつも言葉で説明してた。でもマップ見せたら「すごいね」って一発で信頼された。',
                author: '内装職人'
              },
              {
                text: '妻に仕事の話しても「ふーん」って感じだったけど、地図見せたら「え、こんなにやってたの！？」って驚いてくれた。',
                author: 'リフォーム職人'
              },
              {
                text: '自分でも「何やってたんだろう」って思ってたけど、数字で見たら「頑張ってたんだな」って実感できた。',
                author: '床材職人'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#DAE2E8] p-6">
                <p className="text-[#252423]/80 mb-4 leading-relaxed">
                  「{item.text}」
                </p>
                <p className="text-sm text-[#10B981] font-bold">
                  ー {item.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-[#252423] mb-6">
            あなたの仕事を、<br />
            記録として残しませんか？
          </h2>

          <p className="text-lg text-[#252423]/70 mb-8 leading-relaxed">
            お忙しいところ恐縮ですが、<br />
            過去の仕事データをお教えいただけませんか？<br />
            <span className="text-[#10B981] font-bold">日付と場所だけで構いません。</span>
          </p>

          <div className="space-y-4">
            <Link
              href="/contact"
              className="inline-block bg-[#10B981] text-white px-12 py-5 font-bold text-xl hover:bg-[#0ea572] transition-all shadow-2xl hover:shadow-[#10B981]/50 hover:scale-105 rounded-lg"
            >
              無料で相談してみる
            </Link>

            <p className="text-sm text-[#252423]/50">
              初期費用は一切かかりません。まずはお気軽にご相談ください。
            </p>
          </div>
        </div>
      </section>

      {/* よくある質問 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-[#252423] mb-12 text-center">
            よくあるご質問
          </h2>

          <div className="space-y-4">
            {[
              {
                q: '写真は必要ですか？',
                a: 'いいえ、必要ありません。日付と場所だけで大丈夫です。'
              },
              {
                q: '何件分のデータが必要ですか？',
                a: '過去3年分で、30〜50件くらいあれば十分です。もちろん、それ以上でも構いません。'
              },
              {
                q: '古いデータでも大丈夫ですか？',
                a: 'はい。手帳のメモや、記憶だけでも構いません。「この辺で仕事した」という情報だけでOKです。'
              },
              {
                q: '費用はかかりますか？',
                a: '初期費用は一切かかりません。まずはお試しいただいて、続けるかどうかご判断ください。'
              },
              {
                q: '時間はどれくらいかかりますか？',
                a: 'データをいただければ、こちらで地図を作成します。お手間は取らせません。'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#DAE2E8] p-6">
                <h3 className="font-bold text-[#252423] mb-2 text-lg">
                  Q. {item.q}
                </h3>
                <p className="text-[#252423]/70 leading-relaxed">
                  A. {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MapLogアプリセクション */}
      <MapLogAppSection />

      {/* 最後のCTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white border-2 border-[#10B981] p-8 sm:p-12 rounded-lg shadow-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-[#252423] mb-4">
              MapLog（マップログ）で、仕事を見える化
            </h2>

            <p className="text-lg text-[#252423]/80 mb-8 leading-relaxed">
              毎日、現場に出て、黙々と仕事をする。<br />
              それが職人です。<br /><br />

              でも振り返ると、「何やってたんだろう」って<br />
              曖昧になっていませんか？<br /><br />

              <span className="text-[#10B981] font-bold text-xl">
                あなたが積み重ねてきたものは、<br />
                誇れるものです。
              </span><br /><br />

              MapLogアプリなら、写真1枚で施工記録が地図に残ります。<br />
              それを、形に残しませんか？
            </p>

            <div className="space-y-4">
              <a
                href="https://maplog.iwasaki-naisou.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#10B981] text-white px-12 py-5 font-bold text-xl hover:bg-[#0ea572] transition-all shadow-lg hover:shadow-xl rounded-lg"
              >
                MapLogアプリを開く
              </a>

              <p className="text-sm text-[#252423]/50">
                完全無料・簡単登録（1分で完了）
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
