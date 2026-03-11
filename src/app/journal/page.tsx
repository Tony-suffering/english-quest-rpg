import { journalEntries } from '@/data/journal'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Journal | toniolab',
  description: 'とにおの開発ジャーナル',
}

export default function JournalListPage() {
  const sorted = [...journalEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-stone-200 py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-stone-800 tracking-wider">
            tonio<span className="text-[#D4AF37]">lab</span>
          </Link>
          <span className="text-sm text-stone-500 tracking-wide">Journal</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">Journal</h1>
        <p className="text-stone-500 mb-10">開発・英語学習の記録</p>

        <div className="space-y-6 max-w-3xl">
          {sorted.map((entry) => (
            <Link
              key={entry.id}
              href={`/journal/${entry.id}`}
              className="block group border border-stone-200 rounded-xl p-6 hover:border-[#D4AF37]/50 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 text-sm text-stone-400 mb-2">
                <time dateTime={entry.date}>
                  {new Date(entry.date).toLocaleDateString('ja-JP', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </time>
                <span>{entry.readTime}min</span>
                {entry.featured && (
                  <span className="text-xs font-semibold text-[#D4AF37] border border-[#D4AF37] px-2 py-0.5 rounded">
                    Featured
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold text-stone-800 group-hover:text-[#D4AF37] transition-colors mb-1">
                #{entry.id} {entry.title}
              </h2>
              <p className="text-sm text-stone-500 line-clamp-2">{entry.summary}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {entry.businessTags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-stone-400">#{tag}</span>
                ))}
                {entry.techTags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-stone-400">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
