'use client'

import { useState } from 'react'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import { Calendar, Tag } from 'lucide-react'
import { formatDate } from '@/lib/formatters'
import { newsData } from '@/data/news'
import Link from 'next/link'

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredNews = selectedCategory === 'all'
    ? newsData
    : newsData.filter((n) => n.category === selectedCategory)

  const categories = ['all', ...Array.from(new Set(newsData.map((n) => n.category)))]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'お知らせ': return 'bg-blue-100 text-blue-700'
      case '施工実績': return 'bg-green-100 text-green-700'
      case 'プレスリリース': return 'bg-purple-100 text-purple-700'
      case 'イベント': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-[#252423] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-black mb-2 border-b-2 border-[#D4AF37] pb-3 inline-block">
            お知らせ
          </h1>
          <p className="text-sm text-white/70 mt-4">News & Topics</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* カテゴリフィルター */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-3 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-sm transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#10B981] text-white'
                      : 'bg-white border border-[#DAE2E8] text-[#252423] hover:border-[#10B981]'
                  }`}
                >
                  {cat === 'all' ? 'すべて' : cat}
                </button>
              ))}
            </div>
          )}

          {/* お知らせ一覧 */}
          {filteredNews.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>該当するお知らせがありません。</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="block bg-white border border-[#DAE2E8] p-6 hover:shadow-lg hover:border-[#10B981] transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {item.thumbnail_url && (
                      <div className="md:w-32 h-24 flex-shrink-0 overflow-hidden">
                        <img
                          src={item.thumbnail_url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        {item.published_at && (
                          <div className="flex items-center gap-2 text-[#252423]/70">
                            <Calendar className="w-4 h-4" />
                            <time className="text-xs font-mono">
                              {formatDate(item.published_at)}
                            </time>
                          </div>
                        )}
                        <span className={`px-2 py-1 ${getCategoryColor(item.category)} text-xs font-bold flex items-center gap-1 border`}>
                          <Tag className="w-3 h-3" />
                          {item.category}
                        </span>
                      </div>

                      <h2 className="text-base font-bold text-[#252423] mb-2">
                        {item.title}
                      </h2>
                      {item.content && (
                        <p className="text-sm text-[#252423]/80 line-clamp-2">
                          {item.content}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
