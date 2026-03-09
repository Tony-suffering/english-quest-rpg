'use client'

import { useState } from 'react'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import { Phone, Mail, MapPin, Send } from 'lucide-react'
import { toast } from 'sonner'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // バリデーション
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('必須項目を入力してください')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('お問い合わせを送信しました', {
          description: '担当者より2営業日以内にご連絡いたします。'
        })
        // フォームをリセット
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      } else {
        throw new Error(result.error || '送信に失敗しました')
      }
    } catch (error) {
      console.error('送信エラー:', error)
      const errorMessage = error instanceof Error ? error.message : '送信に失敗しました'
      toast.error('送信に失敗しました', {
        description: `エラー: ${errorMessage}\nお電話またはメールにて直接お問い合わせください。`
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ページヘッダー */}
      <section className="bg-[#252423] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-white border-b-2 border-[#D4AF37] pb-4 inline-block">
            お問い合わせ
          </h1>
          <p className="text-white/70 mt-4">
            内装工事のご相談・お見積りは無料です。お気軽にお問い合わせください。
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* 左側：お問い合わせフォーム */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* お名前 */}
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-[#252423] mb-2">
                  お名前 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#DAE2E8] focus:outline-none focus:border-[#10B981] transition-colors"
                  placeholder="山田 太郎"
                />
              </div>

              {/* 会社名 */}
              <div>
                <label htmlFor="company" className="block text-sm font-bold text-[#252423] mb-2">
                  会社名・団体名
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#DAE2E8] focus:outline-none focus:border-[#10B981] transition-colors"
                  placeholder="株式会社サンプル"
                />
              </div>

              {/* メールアドレス */}
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-[#252423] mb-2">
                  メールアドレス <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#DAE2E8] focus:outline-none focus:border-[#10B981] transition-colors"
                  placeholder="example@example.com"
                />
              </div>

              {/* 電話番号 */}
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-[#252423] mb-2">
                  電話番号
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#DAE2E8] focus:outline-none focus:border-[#10B981] transition-colors"
                  placeholder="03-1234-5678"
                />
              </div>

              {/* お問い合わせ内容の種類 */}
              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-[#252423] mb-2">
                  お問い合わせ内容 <span className="text-red-600">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#DAE2E8] focus:outline-none focus:border-[#10B981] transition-colors"
                >
                  <option value="">選択してください</option>
                  <option value="見積もり依頼">見積もり依頼</option>
                  <option value="内装工事相談">内装工事相談</option>
                  <option value="リフォーム相談">リフォーム相談</option>
                  <option value="バリアフリー相談">バリアフリー相談</option>
                  <option value="その他">その他</option>
                </select>
              </div>

              {/* お問い合わせ詳細 */}
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-[#252423] mb-2">
                  お問い合わせ詳細 <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#DAE2E8] focus:outline-none focus:border-[#10B981] transition-colors resize-none"
                  placeholder="お問い合わせ内容をご記入ください"
                />
              </div>

              {/* 送信ボタン */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#D4AF37] text-white px-8 py-4 font-bold hover:bg-[#C5A028] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? '送信中...' : '送信する'}
              </button>

              <div className="bg-gray-50 border border-[#DAE2E8] p-4">
                <p className="text-xs text-[#252423]/60">
                  ※ いただいた個人情報は、お問い合わせ対応のみに使用し、適切に管理いたします。
                  詳しくは<a href="/privacy" className="text-[#10B981] hover:underline">プライバシーポリシー</a>をご覧ください。
                </p>
              </div>
            </form>
          </div>

          {/* 右側：会社情報 */}
          <div className="space-y-6">
            {/* 電話でのお問い合わせ */}
            <div className="bg-white border border-[#DAE2E8] p-6">
              <div className="w-12 h-12 bg-[#D4AF37] flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#252423] mb-3">お電話でのお問い合わせ</h3>
              <div className="space-y-2 text-sm">
                <p className="text-[#252423]/70">受付時間: 平日 9:00～18:00</p>
                <p className="text-2xl font-bold text-[#252423]">03-5638-7402</p>
                <p className="text-xs text-[#252423]/60">FAX: 03-5638-7403</p>
              </div>
            </div>

            {/* メールでのお問い合わせ */}
            <div className="bg-white border border-[#DAE2E8] p-6">
              <div className="w-12 h-12 bg-[#D4AF37] flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#252423] mb-3">メールでのお問い合わせ</h3>
              <div className="space-y-2 text-sm">
                <p className="text-[#252423]/70">24時間受付</p>
                <a href="mailto:kaz@iwasaki-naisou.jp" className="text-[#10B981] hover:underline block break-all">
                  kaz@iwasaki-naisou.jp
                </a>
              </div>
            </div>

            {/* 所在地 */}
            <div className="bg-white border border-[#DAE2E8] p-6">
              <div className="w-12 h-12 bg-[#D4AF37] flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#252423] mb-3">所在地</h3>
              <div className="space-y-1 text-sm text-[#252423]/70">
                <p className="font-bold text-[#252423]">有限会社イワサキ内装</p>
                <p>〒130-0021</p>
                <p>東京都墨田区緑1丁目24-2</p>
                <p>タカミビル101</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
