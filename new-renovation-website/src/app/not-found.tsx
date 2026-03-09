import Link from 'next/link'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404テキスト */}
          <div className="mb-8">
            <h1 className="text-9xl font-black text-[#D4AF37] mb-4">404</h1>
            <h2 className="text-3xl font-bold text-[#252423] mb-4">
              ページが見つかりません
            </h2>
            <p className="text-lg text-[#252423]/70 mb-8">
              お探しのページは存在しないか、移動した可能性があります。
            </p>
          </div>

          {/* アクションボタン */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="bg-[#D4AF37] text-white px-8 py-4 font-bold text-lg hover:bg-[#C5A028] transition-all shadow-lg hover:shadow-xl rounded-full"
            >
              トップページへ戻る
            </Link>
            <Link
              href="/contact"
              className="bg-white text-[#252423] px-8 py-4 font-bold text-lg border-2 border-[#DAE2E8] hover:border-[#10B981] transition-all rounded-full"
            >
              お問い合わせ
            </Link>
          </div>

          {/* よく閲覧されるページ */}
          <div className="bg-gray-50 border border-[#DAE2E8] p-8 text-left">
            <h3 className="text-xl font-bold text-[#252423] mb-4 border-b-2 border-[#D4AF37] pb-2 inline-block">
              よく閲覧されるページ
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/interior" className="text-[#10B981] hover:underline font-bold">
                  内装工事
                </Link>
                <span className="text-sm text-[#252423]/70 ml-2">- クロス張替え、床材施工</span>
              </li>
              <li>
                <Link href="/services/reform" className="text-[#10B981] hover:underline font-bold">
                  リフォーム
                </Link>
                <span className="text-sm text-[#252423]/70 ml-2">- 住宅・マンション改修</span>
              </li>
              <li>
                <Link href="/services/barrier-free" className="text-[#10B981] hover:underline font-bold">
                  バリアフリー改修
                </Link>
                <span className="text-sm text-[#252423]/70 ml-2">- 手すり設置、段差解消</span>
              </li>
              <li>
                <Link href="/portfolio" className="text-[#10B981] hover:underline font-bold">
                  施工実績
                </Link>
                <span className="text-sm text-[#252423]/70 ml-2">- これまでの施工事例</span>
              </li>
              <li>
                <Link href="/corporate/about" className="text-[#10B981] hover:underline font-bold">
                  会社概要
                </Link>
                <span className="text-sm text-[#252423]/70 ml-2">- イワサキ内装について</span>
              </li>
            </ul>
          </div>

          {/* お困りの場合 */}
          <div className="mt-8 bg-[#10B981]/10 border border-[#10B981]/20 p-6">
            <p className="text-sm text-[#252423]/80">
              お探しの情報が見つからない場合は、お気軽にお問い合わせください。
              <br />
              電話: <a href="tel:0356387402" className="text-[#10B981] font-bold hover:underline">03-5638-7402</a>
              （平日 9:00～18:00）
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
