import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import Link from 'next/link'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'
import SocialShare from '@/components/website/SocialShare'
import { newsData } from '@/data/news'

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  // Find news item from data
  const newsItem = newsData.find(item => item.id === params.id)

  // Fallback to first item if not found
  const displayItem = newsItem || newsData[0]

  // Format date
  const formattedDate = new Date(displayItem.published_at).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '.')

  // Category color mapping
  const categoryColors: Record<string, string> = {
    '施工実績': 'bg-blue-100 text-blue-700',
    'お知らせ': 'bg-emerald-100 text-emerald-700',
    'プレスリリース': 'bg-purple-100 text-purple-700',
  }

  const categoryColor = categoryColors[displayItem.category] || 'bg-gray-100 text-gray-700'

  // Get other news for related section (excluding current)
  const relatedNews = newsData
    .filter(item => item.id !== displayItem.id)
    .slice(0, 2)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#252423] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            お知らせ一覧に戻る
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-white/70">
              <Calendar className="w-4 h-4" />
              <time className="text-xs font-mono">
                {formattedDate}
              </time>
            </div>
            <span className={`px-2 py-1 ${categoryColor} text-xs font-bold border flex items-center gap-1`}>
              <Tag className="w-3 h-3" />
              {displayItem.category}
            </span>
          </div>

          <h1 className="text-2xl font-black mb-2 border-b-2 border-[#D4AF37] pb-3 inline-block">
            {displayItem.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayItem.thumbnail_url && (
            <img
              src={displayItem.thumbnail_url}
              alt={displayItem.title}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
          )}

          <div className="prose prose-lg max-w-none text-[#252423]/80 leading-relaxed">
            <p className="text-base">{displayItem.content}</p>
          </div>

          {/* Share Buttons */}
          <div className="mt-12 pt-6 border-t border-[#DAE2E8]">
            <SocialShare
              title={displayItem.title}
              description={`${displayItem.category} | イワサキ内装のお知らせ`}
            />
          </div>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-[#252423] mb-6 border-b-2 border-[#D4AF37] pb-2 inline-block">関連記事</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedNews.map((item) => {
                  const itemDate = new Date(item.published_at).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  }).replace(/\//g, '.')

                  return (
                    <Link
                      key={item.id}
                      href={`/news/${item.id}`}
                      className="border border-[#DAE2E8] p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center gap-2 text-[#252423]/70 mb-2">
                        <Calendar className="w-4 h-4" />
                        <time className="text-xs font-mono">{itemDate}</time>
                      </div>
                      <h4 className="text-sm font-bold text-[#252423] mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#252423]/70 line-clamp-2">
                        {item.content}
                      </p>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Back to List */}
          <div className="mt-12 text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 bg-[#10B981] text-white px-6 py-3 text-sm font-bold border border-[#10B981] hover:bg-[#10B981]/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              お知らせ一覧に戻る
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
