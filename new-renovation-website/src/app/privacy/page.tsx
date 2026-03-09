'use client'

import Link from 'next/link'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#10B981] hover:text-[#0D9668] transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            ホームに戻る
          </Link>
          <h1 className="text-4xl font-black text-[#252423] border-b-2 border-[#D4AF37] pb-4">
            プライバシーポリシー
          </h1>
        </div>

        <div className="space-y-8 text-[#252423]">
          <section>
            <p className="leading-relaxed text-[#252423]/80">
              有限会社イワサキ内装（以下「当社」といいます）は、お客様の個人情報の保護を重要な責務と認識し、以下のとおりプライバシーポリシーを定め、適切な取り扱いに努めます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">1. 個人情報の定義</h2>
            <p className="leading-relaxed text-[#252423]/80">
              本プライバシーポリシーにおける「個人情報」とは、個人情報の保護に関する法律に定める「個人情報」を指し、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含みます）をいいます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">2. 個人情報の収集</h2>
            <p className="leading-relaxed text-[#252423]/80 mb-4">
              当社は、以下の目的のために、適法かつ公正な手段によって個人情報を収集いたします。
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#252423]/80 ml-4">
              <li>お問い合わせ、ご相談への対応</li>
              <li>お見積もり、施工サービスの提供</li>
              <li>アフターフォロー、定期点検のご案内</li>
              <li>各種資料、カタログの送付</li>
              <li>イベント、セミナーのご案内</li>
              <li>サービス向上のためのアンケート実施</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">3. 個人情報の利用目的</h2>
            <p className="leading-relaxed text-[#252423]/80 mb-4">
              当社は、収集した個人情報を以下の目的で利用いたします。
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#252423]/80 ml-4">
              <li>内装工事、リフォームサービスの提供および契約履行</li>
              <li>お見積もり作成、施工計画の立案</li>
              <li>施工後のアフターサービス、メンテナンスのご案内</li>
              <li>お問い合わせ、ご相談への回答</li>
              <li>新サービス、キャンペーン情報のご案内（お客様の同意がある場合）</li>
              <li>サービス品質向上のための分析</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">4. 個人情報の第三者提供</h2>
            <p className="leading-relaxed text-[#252423]/80 mb-4">
              当社は、以下のいずれかに該当する場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#252423]/80 ml-4">
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難である場合</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
              <li>施工に必要な協力業者への情報提供（契約履行のために必要な範囲内）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">5. 個人情報の管理</h2>
            <p className="leading-relaxed text-[#252423]/80">
              当社は、個人情報の紛失、破壊、改ざんおよび漏洩などのリスクに対して、合理的な安全対策を講じ、個人情報の適切な管理に努めます。また、個人情報を取り扱う従業員に対して、個人情報保護に関する教育を実施し、適切な管理を徹底いたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">6. 個人情報の開示・訂正・削除</h2>
            <p className="leading-relaxed text-[#252423]/80">
              お客様は、当社が保有する自己の個人情報について、開示、訂正、利用停止、削除を求めることができます。ご請求の際は、下記お問い合わせ窓口までご連絡ください。本人確認の上、合理的な期間内に対応いたします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">7. Cookieの使用について</h2>
            <p className="leading-relaxed text-[#252423]/80">
              当社ウェブサイトでは、サービス向上のためCookie（クッキー）を使用する場合があります。Cookieは、お客様のブラウザを識別するための小さなデータファイルであり、個人を特定する情報は含まれません。お客様はブラウザの設定によりCookieの受け取りを拒否することができますが、一部サービスが正常に機能しない場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">8. プライバシーポリシーの変更</h2>
            <p className="leading-relaxed text-[#252423]/80">
              当社は、法令の変更や事業内容の変更等に伴い、本プライバシーポリシーを変更することがあります。変更した場合は、当社ウェブサイトに掲載することにより、お客様に通知いたします。
            </p>
          </section>

          <section className="bg-gray-50 border border-[#DAE2E8] p-6">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-[#D4AF37] pl-4">9. お問い合わせ窓口</h2>
            <p className="leading-relaxed text-[#252423]/80 mb-4">
              個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。
            </p>
            <div className="space-y-2 text-[#252423]/80">
              <p className="font-bold text-[#252423]">有限会社イワサキ内装</p>
              <p>〒130-0021 東京都墨田区緑1丁目24-2 タカミビル101</p>
              <p>TEL: 03-5638-7402 / FAX: 03-5638-7403</p>
              <p>E-mail: kaz@iwasaki-naisou.jp</p>
              <p>営業時間: 平日 9:00～18:00</p>
              <p className="mt-4 text-sm">代表取締役: 岩﨑 和男</p>
            </div>
          </section>

          <section className="text-right text-sm text-[#252423]/60 pt-8">
            <p>制定日: 2025年1月1日</p>
            <p>有限会社イワサキ内装</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
