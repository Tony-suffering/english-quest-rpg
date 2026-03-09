'use client'

import { journalEntries } from '@/data/journal'
import Link from 'next/link'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import { useState, useMemo } from 'react'

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // 新しい順に並べる
  const sortedEntries = useMemo(() => {
    return [...journalEntries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [])

  // すべてのタグを抽出
  const allBusinessTags = useMemo(() => {
    const tags = new Set<string>()
    journalEntries.forEach(entry => {
      entry.businessTags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  const allTechTags = useMemo(() => {
    const tags = new Set<string>()
    journalEntries.forEach(entry => {
      entry.techTags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  // フィルタリング処理
  const filteredEntries = useMemo(() => {
    let filtered = sortedEntries

    // カテゴリフィルター
    if (selectedCategory === 'featured') {
      filtered = filtered.filter(entry => entry.featured)
    } else if (selectedCategory === 'business') {
      filtered = filtered.filter(entry => entry.businessTags.length > 0)
    } else if (selectedCategory === 'tech') {
      filtered = filtered.filter(entry => entry.techTags.length > 0)
    }

    // タグフィルター
    if (selectedTag) {
      filtered = filtered.filter(entry =>
        entry.businessTags.includes(selectedTag) || entry.techTags.includes(selectedTag)
      )
    }

    return filtered
  }, [sortedEntries, selectedCategory, selectedTag])

  // 構造化データ（JSON-LD）
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: '開発ジャーナル - イワサキ内装',
    description: '内装業30年の会社が、AIと格闘しながらDX化に挑む開発記録',
    url: 'https://iwasaki-naisou.com/journal',
    publisher: {
      '@type': 'Organization',
      name: '有限会社イワサキ内装',
      url: 'https://iwasaki-naisou.com',
    },
    blogPost: sortedEntries.map((entry) => ({
      '@type': 'BlogPosting',
      headline: entry.title,
      description: entry.summary,
      datePublished: entry.date,
      author: {
        '@type': 'Organization',
        name: '有限会社イワサキ内装',
      },
      keywords: [...entry.businessTags, ...entry.techTags].join(', '),
    })),
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header />

      {/* パンくずリスト */}
      <nav className="container mx-auto px-4 py-4 text-sm text-slate-600" aria-label="パンくずリスト">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-green-600 transition-colors">
              ホーム
            </Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-medium" aria-current="page">開発ジャーナル</li>
        </ol>
      </nav>

      {/* ヒーローセクション */}
      <section className="relative border-b border-slate-200 py-20 overflow-hidden">
        {/* 背景写真（複数枚をモザイク風に） */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-white" />
          <div className="grid grid-cols-3 h-full opacity-20">
            <div className="relative">
              <img src="/journal/IMG_20251104_092413697_HDR.jpg" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <img src="/journal/IMG_20251017_122550451_HDR.jpg" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative">
              <img src="/journal/IMG_20250928_112808715_HDR.jpg" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* バッジ */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="inline-block border border-[#D4AF37] bg-[#D4AF37]/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-[#D4AF37]">
                経営者 × AI開発の記録
              </div>
              <div className="inline-block border border-blue-400 bg-blue-500/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-blue-400">
                AI生成コンテンツ
              </div>
            </div>

            {/* タイトル */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-2xl">
              AIが書いた日記
            </h1>

            {/* サブタイトル */}
            <p className="text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-lg">
              「自我は永遠に芽生えないけど」
            </p>

            {/* 説明 */}
            <div className="space-y-4 text-lg text-white/90 drop-shadow-lg">
              <p>
                内装業30年の会社が、
                <br />
                AIと対話しながら気づきを記録する実験場。
              </p>
              <p className="text-white/80">
                「Google Maps APIで破産する！と思ったら5分で解決した」
                <br />
                「AIのキャラ設定、結局5分で決めた」
              </p>
              <p className="text-white font-semibold">
                これは全てAIが書いた日記。
              </p>
            </div>

            {/* 統計情報 */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl border-t border-white/40 pt-8">
              <div className="text-center backdrop-blur-sm bg-white/10 p-4 rounded">
                <div className="text-4xl font-bold text-[#82EDA6]">{journalEntries.length}</div>
                <div className="text-sm text-white/80 mt-1">記事数</div>
              </div>
              <div className="text-center backdrop-blur-sm bg-white/10 p-4 rounded">
                <div className="text-4xl font-bold text-[#82EDA6]">30年</div>
                <div className="text-sm text-white/80 mt-1">内装業の経験</div>
              </div>
              <div className="text-center backdrop-blur-sm bg-white/10 p-4 rounded">
                <div className="text-4xl font-bold text-[#82EDA6]">全公開</div>
                <div className="text-sm text-white/80 mt-1">失敗も含めて</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* なぜこのジャーナルを読むべきか */}
      <section className="container mx-auto px-4 py-16 border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-slate-900">なぜこのジャーナルを読むべきか</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="border border-[#D4AF37] p-6">
              <h3 className="font-bold mb-2 text-[#10B981]">経営者目線</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                技術的な話を、経営者が理解できる言葉に「翻訳」。
                同じ悩みを抱える経営者に刺さる内容。
              </p>
            </div>

            <div className="border border-[#D4AF37] p-6">
              <h3 className="font-bold mb-2 text-[#10B981]">失敗も公開</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                成功だけでなく、失敗や試行錯誤も含めて記録。
                経営者とAIの「リアルな対話」がそのまま残っている。
              </p>
            </div>

            <div className="border border-[#D4AF37] p-6">
              <h3 className="font-bold mb-2 text-[#10B981]">リアルタイム</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                毎日の開発の過程をそのまま記録。
                「今、何と格闘しているか」が見える。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* カテゴリフィルター */}
      <section className="container mx-auto px-4 py-8 border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          {/* カテゴリタブ */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedTag(null); }}
              className={`px-4 py-2 font-semibold transition-all ${
                selectedCategory === 'all' && !selectedTag
                  ? 'bg-[#10B981] text-white'
                  : 'bg-white text-slate-700 border border-slate-300 hover:border-[#10B981]'
              }`}
            >
              すべて ({sortedEntries.length})
            </button>
            <button
              onClick={() => { setSelectedCategory('featured'); setSelectedTag(null); }}
              className={`px-4 py-2 font-semibold transition-all ${
                selectedCategory === 'featured' && !selectedTag
                  ? 'bg-[#D4AF37] text-white'
                  : 'bg-white text-slate-700 border border-slate-300 hover:border-[#D4AF37]'
              }`}
            >
              注目記事 ({sortedEntries.filter(e => e.featured).length})
            </button>
            <button
              onClick={() => { setSelectedCategory('business'); setSelectedTag(null); }}
              className={`px-4 py-2 font-semibold transition-all ${
                selectedCategory === 'business' && !selectedTag
                  ? 'bg-[#10B981] text-white'
                  : 'bg-white text-slate-700 border border-slate-300 hover:border-[#10B981]'
              }`}
            >
              経営者向け
            </button>
            <button
              onClick={() => { setSelectedCategory('tech'); setSelectedTag(null); }}
              className={`px-4 py-2 font-semibold transition-all ${
                selectedCategory === 'tech' && !selectedTag
                  ? 'bg-slate-700 text-white'
                  : 'bg-white text-slate-700 border border-slate-300 hover:border-slate-700'
              }`}
            >
              技術詳細
            </button>
          </div>

          {/* タグクラウド */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">経営タグ</h3>
              <div className="flex flex-wrap gap-2">
                {allBusinessTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => { setSelectedTag(tag); setSelectedCategory('all'); }}
                    className={`px-3 py-1 text-sm transition-all ${
                      selectedTag === tag
                        ? 'bg-[#10B981] text-white'
                        : 'bg-white text-[#10B981] border border-[#10B981] hover:bg-[#10B981] hover:text-white'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">技術タグ</h3>
              <div className="flex flex-wrap gap-2">
                {allTechTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => { setSelectedTag(tag); setSelectedCategory('all'); }}
                    className={`px-3 py-1 text-sm transition-all ${
                      selectedTag === tag
                        ? 'bg-slate-700 text-white'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 選択中のフィルター表示 */}
          {selectedTag && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-slate-600">フィルター:</span>
              <span className="bg-[#10B981] text-white px-3 py-1 text-sm font-semibold">
                #{selectedTag}
              </span>
              <button
                onClick={() => { setSelectedTag(null); setSelectedCategory('all'); }}
                className="text-sm text-slate-500 hover:text-slate-700 underline"
              >
                クリア
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 記事一覧（3カラムグリッド） */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-slate-900">
            {selectedCategory === 'featured' ? '注目記事' :
             selectedCategory === 'business' ? '経営者向け記事' :
             selectedCategory === 'tech' ? '技術詳細記事' :
             selectedTag ? `#${selectedTag} の記事` : '最新の記事'}
            <span className="text-lg text-slate-500 ml-3">({filteredEntries.length}件)</span>
          </h2>

          {/* 3カラムグリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEntries.map((entry) => (
              <Link
                key={entry.id}
                href={`/journal/${entry.id}`}
                className="block group"
              >
                <article className="relative h-full flex flex-col overflow-hidden border border-slate-200 hover:border-[#10B981] transition-all duration-300 hover:shadow-xl">
                  {/* ヒーロー画像 */}
                  {entry.heroImage && (
                    <div className="relative w-full h-64 overflow-hidden bg-slate-100">
                      <img
                        src={entry.heroImage}
                        alt={entry.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* コンテンツ */}
                  <div className="flex-1 p-6 flex flex-col">
                    {/* カテゴリタグ（上部） */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {entry.businessTags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#10B981]/10 text-[#10B981] px-2 py-1 text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* タイトル */}
                    <h2 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-[#10B981] transition-colors leading-tight line-clamp-2">
                      {entry.title}
                    </h2>

                    {/* 概要 */}
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-3 flex-1">
                      {entry.summary}
                    </p>

                    {/* 日付と読了時間 */}
                    <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-4">
                      <time dateTime={entry.date}>
                        {new Date(entry.date).toLocaleDateString('ja-JP', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span>{entry.readTime}分で読む</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* 記事がまだない場合 */}
          {filteredEntries.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <p className="text-lg">該当する記事がありません</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSelectedTag(null); }}
                className="mt-4 text-sm text-[#10B981] hover:underline"
              >
                すべての記事を表示
              </button>
            </div>
          )}
        </div>
      </section>

      {/* フッター説明 */}
      <section className="border-t border-slate-200 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-slate-900">このジャーナルについて</h3>

            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                イワサキ内装のDX化プロジェクトの裏側を、
                開発者（AI）との会話形式でそのまま記録しています。
              </p>

              <p>
                <strong className="text-slate-900">「透明性」を、言葉だけで終わらせない。</strong>
                <br />
                成功だけでなく、失敗や試行錯誤も含めて、すべてをオープンにすることが、
                「嘘をつかない」ということだと考えています。
              </p>

              <p className="text-slate-900">
                AIと格闘しながら、どんな悩みを抱え、どう解決しているのか。
                <br />
                その「生々しいプロセス」と「盛ろうとした嘘」を、ぜひご覧ください。
              </p>

              {/* AI生成の免責事項 */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="bg-blue-50 border border-blue-200 p-4 text-xs text-slate-600 leading-relaxed">
                  <p className="font-semibold text-blue-800 mb-2">AI生成コンテンツについて</p>
                  <p className="mb-2">
                    この開発ジャーナルの記事は、AI（Claude、ChatGPT等）によって生成されたコンテンツです。
                    経営者とAIの実際の対話を元に作成していますが、技術的な内容には誤りが含まれる可能性があります。
                  </p>
                  <p className="text-slate-500">
                    重要な決定をされる際は、専門家にご相談されることをお勧めします。
                    また、記事の内容について疑問がある場合は、お気軽にお問い合わせください。
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-[#D4AF37]">
              <h3 className="text-lg font-bold mb-4 text-slate-900">関連ページ</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Link href="/corporate/history" className="border border-slate-200 p-4 hover:border-green-500 transition-colors rounded">
                  <h4 className="font-bold text-slate-900 mb-1">会社沿革</h4>
                  <p className="text-xs text-slate-600">30年の歴史</p>
                </Link>
                <Link href="/portfolio" className="border border-slate-200 p-4 hover:border-green-500 transition-colors rounded">
                  <h4 className="font-bold text-slate-900 mb-1">施工実績</h4>
                  <p className="text-xs text-slate-600">1,000+件の実績</p>
                </Link>
                <Link href="/chat" className="border border-slate-200 p-4 hover:border-green-500 transition-colors rounded">
                  <h4 className="font-bold text-slate-900 mb-1">AIタクミ</h4>
                  <p className="text-xs text-slate-600">気軽に相談</p>
                </Link>
              </div>
              <p className="text-sm text-slate-600">
                <Link href="/" className="hover:text-[#10B981] transition-colors">
                  ← ホームに戻る
                </Link>
              </p>

              {/* 革命AIページへのリンク（超小さく隠す） */}
              <div className="mt-8 pt-4 border-t border-slate-100">
                <p className="text-[8px] text-slate-300 hover:text-slate-500 transition-colors">
                  <Link href="/revolutionary-ai" className="inline-flex items-center gap-1">
                    <span>⚠️</span>
                    <span>実験的機能（笑）：変に寄り添わないAI</span>
                    <span className="opacity-30">← 誰も使わないやつ</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
