import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '工務店様・リフォーム会社様へ | イワサキ内装',
  description: '内装仕上げのパートナーとして、御社の現場を支えます。',
}

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-white py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-[#c5963f] text-sm tracking-[0.3em] mb-8 font-light">FOR CONTRACTORS</p>

          <h1 className="text-4xl md:text-6xl font-bold text-[#2c3e50] mb-8 leading-tight">
            工務店様・リフォーム会社様へ
          </h1>

          <div className="w-20 h-[2px] bg-[#c5963f] mx-auto mb-12"></div>

          <p className="text-xl md:text-2xl text-[#2c3e50] mb-16 leading-relaxed font-light">
            内装仕上げを、まるごとお任せください。<br />
            クロス・床・原状回復まで、30年の信頼と実績。
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:0359326825"
              className="inline-block px-10 py-5 bg-[#c5963f] text-white font-medium hover:bg-[#ae987b] transition-colors"
            >
              03-5932-6825
            </a>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 border-2 border-[#c5963f] text-[#c5963f] font-medium hover:bg-[#c5963f]/5 transition-colors"
            >
              メールで相談
            </Link>
          </div>
        </div>
      </section>

      {/* 3つの約束 */}
      <section className="py-20 md:py-24 bg-[#f8f8f8]">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c3e50] text-center mb-4">3つの約束</h2>
          <div className="w-16 h-[2px] bg-[#c5963f] mx-auto mb-16"></div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-6xl font-bold text-[#c5963f] mb-6">01</div>
              <h3 className="text-xl font-bold text-[#2c3e50] mb-4">見積もり24時間以内</h3>
              <p className="text-[#2c3e50]/70 leading-relaxed">
                図面・写真から翌日回答。<br />急ぎの商談にも対応します。
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold text-[#c5963f] mb-6">02</div>
              <h3 className="text-xl font-bold text-[#2c3e50] mb-4">工期厳守</h3>
              <p className="text-[#2c3e50]/70 leading-relaxed">
                30年間、納期遅延ゼロ。<br />後工程を止めません。
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold text-[#c5963f] mb-6">03</div>
              <h3 className="text-xl font-bold text-[#2c3e50] mb-4">手直しほぼゼロ</h3>
              <p className="text-[#2c3e50]/70 leading-relaxed">
                ベテラン職人が直接施工。<br />高品質な仕上がりを追求。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 対応業務 */}
      <section className="py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c3e50] text-center mb-4">対応業務</h2>
          <div className="w-16 h-[2px] bg-[#c5963f] mx-auto mb-16"></div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-[#c5963f] pl-8 py-6">
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">クロス工事</h3>
              <ul className="space-y-2 text-[#2c3e50]/70">
                <li>・住宅・マンション張替え</li>
                <li>・水回りリフォーム後の仕上げ</li>
                <li>・原状回復</li>
                <li>・商業施設・オフィス</li>
              </ul>
            </div>

            <div className="border-l-4 border-[#c5963f] pl-8 py-6">
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">床工事</h3>
              <ul className="space-y-2 text-[#2c3e50]/70">
                <li>・フローリング張替え</li>
                <li>・CF（クッションフロア）</li>
                <li>・長尺シート</li>
                <li>・バリアフリー対応</li>
              </ul>
            </div>

            <div className="border-l-4 border-[#c5963f] pl-8 py-6">
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">原状回復</h3>
              <ul className="space-y-2 text-[#2c3e50]/70">
                <li>・賃貸退去後全面施工</li>
                <li>・クロス・床・建具一括</li>
                <li>・タイトな工期対応</li>
                <li>・管理会社直接取引可</li>
              </ul>
            </div>

            <div className="border-l-4 border-[#c5963f] pl-8 py-6">
              <h3 className="text-2xl font-bold text-[#2c3e50] mb-4">店舗・オフィス</h3>
              <ul className="space-y-2 text-[#2c3e50]/70">
                <li>・飲食店・美容室</li>
                <li>・オフィス移転時内装</li>
                <li>・深夜・早朝作業対応</li>
                <li>・設計図面施工可</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 対応エリア */}
      <section className="py-20 md:py-24 bg-[#f8f8f8]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2c3e50] mb-4">対応エリア</h2>
          <div className="w-16 h-[2px] bg-[#c5963f] mx-auto mb-12"></div>

          <p className="text-2xl text-[#2c3e50] mb-6">東京23区全域</p>
          <p className="text-[#2c3e50]/70">千葉・埼玉・神奈川も対応可能です</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-[#ae987b]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
            まずは、お気軽にご相談ください
          </h2>

          <div className="bg-white/10 backdrop-blur-sm p-10 mb-10">
            <p className="text-white/80 text-sm mb-4 tracking-widest">お電話でのお問い合わせ</p>
            <a href="tel:0359326825" className="text-5xl md:text-6xl font-bold text-white hover:text-white/90 transition-colors block">
              03-5932-6825
            </a>
            <p className="text-white/70 text-sm mt-6">平日 9:00〜18:00</p>
          </div>

          <Link
            href="/contact"
            className="inline-block px-12 py-5 bg-white text-[#ae987b] font-medium hover:bg-white/90 transition-colors"
          >
            メールで相談する
          </Link>
        </div>
      </section>

      {/* フッターメッセージ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-lg text-[#2c3e50]/70 leading-relaxed mb-6">
            「内装で困ったときは、イワサキに連絡すれば大丈夫」<br />
            そう思っていただける関係を目指しています。
          </p>
          <div className="w-12 h-[1px] bg-[#c5963f] mx-auto mb-6"></div>
          <p className="text-[#c5963f] font-medium tracking-wider">イワサキ内装</p>
        </div>
      </section>
    </div>
  )
}
