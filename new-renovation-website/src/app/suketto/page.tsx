'use client'

import { useState } from 'react'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import { Briefcase, Users, TrendingUp, MessageCircle, CheckCircle, Phone } from 'lucide-react'

export default function SukettoPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    name: '',
    phone: '',
    workType: '',
    area: '',
    experience: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // フォーム送信処理（ここでメール送信やデータベース保存）
    console.log('Form submitted:', formData)

    // 送信完了メッセージ表示
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* ヒーロー */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-[#10B981] to-[#059669] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
              <span className="text-sm font-bold">助太刀アプリから来られた方へ</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
              協力会社・職人さん募集
            </h1>

            <p className="text-xl sm:text-2xl mb-8 text-white/90">
              イワサキ内装では、一緒に働いてくださる<br />
              協力会社様を募集しています
            </p>

            <div className="inline-flex items-center gap-2 bg-white/20 px-6 py-3 rounded-lg">
              <Briefcase className="w-5 h-5" />
              <span className="font-bold">創業1994年 | 30年の実績 | 月間10件以上の案件</span>
            </div>
          </div>
        </div>
      </section>

      {/* イワサキ内装の特徴 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#252423] mb-4">
              イワサキ内装の特徴
            </h2>
            <p className="text-lg text-[#252423]/70">
              長期的なパートナーシップを大切にしています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#DAE2E8] p-6">
              <div className="mb-4">
                <TrendingUp className="w-10 h-10 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold text-[#252423] mb-2">安定した案件数</h3>
              <p className="text-sm text-[#252423]/70">
                月間10件以上のリフォーム・内装工事案件があります。
                継続的にお仕事をお願いできます。
              </p>
            </div>

            <div className="bg-white border border-[#DAE2E8] p-6">
              <div className="mb-4">
                <Users className="w-10 h-10 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-bold text-[#252423] mb-2">職人ネットワーク50名超</h3>
              <p className="text-sm text-[#252423]/70">
                すでに多くの協力会社様と良好な関係を築いています。
                横のつながりも生まれます。
              </p>
            </div>

            <div className="bg-white border border-[#DAE2E8] p-6">
              <div className="mb-4">
                <MessageCircle className="w-10 h-10 text-[#82EDA6]" />
              </div>
              <h3 className="text-xl font-bold text-[#252423] mb-2">LINEで簡単連絡</h3>
              <p className="text-sm text-[#252423]/70">
                案件の連絡はLINEでスムーズに。
                写真や図面の共有も簡単です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 募集職種 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#252423] mb-4">
              募集している職種
            </h2>
            <p className="text-lg text-[#252423]/70">
              以下の職種の協力会社様を募集中です
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: '内装仕上げ（クロス・CF・フローリング）', cases: '月5〜10件' },
              { title: '塗装工事（外壁・屋根）', cases: '月2〜3件' },
              { title: '大工工事', cases: '月3〜5件' },
              { title: '設備工事（電気・水道）', cases: '月2〜4件' },
              { title: 'バリアフリー工事（手すり・段差解消）', cases: '月3〜6件' },
              { title: 'その他（左官・タイル・建具など）', cases: '随時' },
            ].map((job, i) => (
              <div key={i} className="bg-gray-50 border border-[#DAE2E8] p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-[#252423] mb-1">{job.title}</p>
                    <p className="text-sm text-[#252423]/70">案件数：{job.cases}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 応募フォーム */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#252423] mb-4">
              お問い合わせフォーム
            </h2>
            <p className="text-lg text-[#252423]/70">
              まずは簡単にご連絡ください。LINEでお話ししましょう！
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-white border border-[#DAE2E8] p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#252423] mb-2">
                    会社名・屋号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#DAE2E8] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none"
                    placeholder="例：眞耀塗装興業"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#252423] mb-2">
                    担当者名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#DAE2E8] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none"
                    placeholder="例：水落"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#252423] mb-2">
                    電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#DAE2E8] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none"
                    placeholder="090-1234-5678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#252423] mb-2">
                    職種 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="workType"
                    required
                    value={formData.workType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#DAE2E8] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none"
                  >
                    <option value="">選択してください</option>
                    <option value="内装仕上げ">内装仕上げ（クロス・CF・フローリング）</option>
                    <option value="塗装">塗装工事</option>
                    <option value="大工">大工工事</option>
                    <option value="設備">設備工事（電気・水道）</option>
                    <option value="バリアフリー">バリアフリー工事</option>
                    <option value="その他">その他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#252423] mb-2">
                    対応可能エリア <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="area"
                    required
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#DAE2E8] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none"
                    placeholder="例：東京都、千葉県"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#252423] mb-2">
                    経験年数・体制
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#DAE2E8] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none"
                    placeholder="例：経験10年、2人体制"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#252423] mb-2">
                    メッセージ
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-[#DAE2E8] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] outline-none resize-none"
                    placeholder="ご希望の案件数や金額感など、ご自由にお書きください"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#10B981] text-white px-8 py-4 font-bold text-lg hover:bg-[#0ea572] transition-all shadow-lg hover:shadow-xl"
                >
                  送信する
                </button>

                <p className="text-xs text-[#252423]/60 text-center">
                  送信後、担当者よりLINEまたはお電話でご連絡させていただきます
                </p>
              </div>
            </form>
          ) : (
            <div className="bg-white border border-[#10B981] p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#10B981] text-white rounded-full mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-[#252423] mb-4">
                送信完了しました！
              </h3>
              <p className="text-lg text-[#252423]/70 mb-6">
                お問い合わせありがとうございます。<br />
                担当者より1営業日以内にご連絡させていただきます。
              </p>
              <div className="bg-gray-50 border border-[#DAE2E8] p-6">
                <p className="text-sm font-bold text-[#252423] mb-2">お急ぎの方は直接ご連絡ください</p>
                <a href="tel:0356387402" className="inline-flex items-center gap-2 text-[#10B981] font-bold hover:underline">
                  <Phone className="w-4 h-4" />
                  03-5638-7402
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
