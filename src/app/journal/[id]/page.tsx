import { journalEntries } from '@/data/journal'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import ConversationPlayer from '@/components/memoria/ConversationPlayer';
import JapaneseConversation from '@/components/memoria/JapaneseConversation';

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return journalEntries.map((entry) => ({
    id: entry.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const entry = journalEntries.find((e) => e.id === id)

  if (!entry) {
    return {
      title: '記事が見つかりません | イワサキ内装',
    }
  }

  return {
    title: `${entry.title} | 開発ジャーナル | イワサキ内装`,
    description: entry.summary,
  }
}

export default async function JournalDetailPage({ params }: Props) {
  const { id } = await params
  const entry = journalEntries.find((e) => e.id === id)

  if (!entry) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
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
          <li>
            <Link href="/journal" className="hover:text-green-600 transition-colors">
              開発ジャーナル
            </Link>
          </li>
          <li>/</li>
          <li className="text-slate-900 font-medium" aria-current="page">記事詳細</li>
        </ol>
      </nav>

      {/* ヘッダー */}
      <section className="relative border-b border-slate-200 py-12 overflow-hidden">
        {/* ヒーロー動画または画像（記事ごとに異なる） */}
        {entry.videoId ? (
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white z-10" />
            <iframe
              src={`https://customer-g3tngdysgdne3fza.cloudflarestream.com/${entry.videoId}/iframe?muted=true&autoplay=true&loop=true&controls=false`}
              className="w-full h-full object-cover"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        ) : entry.heroImage && (
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-white" />
            <img
              src={entry.heroImage}
              alt={entry.title}
              className="w-full h-full object-cover opacity-30"
            />
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-2xl">{entry.title}</h1>

            <div className="flex items-center gap-4 text-white/90 mb-6 drop-shadow-lg">
              <time dateTime={entry.date}>
                {new Date(entry.date).toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{entry.readTime}分で読めます</span>
              {entry.featured && (
                <>
                  <span>•</span>
                  <span className="border border-[#D4AF37] bg-[#D4AF37]/20 backdrop-blur-sm px-2 py-1 text-xs font-semibold text-[#D4AF37]">
                    注目
                  </span>
                </>
              )}
            </div>

            <p className="text-lg text-white/90 drop-shadow-lg">{entry.summary}</p>
          </div>
        </div>
      </section>

      {/* Bilingual Conversation Players */}
      {entry.conversationData && (
        <section className="container mx-auto px-4 py-8 -mb-8 relative z-20">
          <div className="max-w-4xl mx-auto transform -translate-y-8 space-y-6">
            <ConversationPlayer conversation={entry.conversationData.english} theme="light" />
            <JapaneseConversation conversation={entry.conversationData.japanese} />
          </div>
        </section>
      )}

      {/* 本文 */}
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* タグ */}
          <div className="flex flex-wrap gap-2 mb-8">
            {entry.businessTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
            {entry.techTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* メトリクス表示 */}
          {entry.metrics && (
            <div className="mb-12 border border-slate-200 rounded-lg overflow-hidden">
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
                <h2 className="font-bold text-slate-900">測定結果</h2>
              </div>
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 text-slate-700 font-semibold">項目</th>
                      <th className="text-left py-2 text-slate-700 font-semibold">Before</th>
                      <th className="text-left py-2 text-slate-700 font-semibold">After</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.metrics.performanceBefore && (
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">パフォーマンス</td>
                        <td className="py-2 text-red-600 font-mono text-sm">{entry.metrics.performanceBefore}</td>
                        <td className="py-2 text-green-600 font-mono text-sm">{entry.metrics.performanceAfter}</td>
                      </tr>
                    )}
                    {entry.metrics.costBefore && (
                      <tr className="border-b border-slate-100">
                        <td className="py-2 text-slate-600">コスト</td>
                        <td className="py-2 text-red-600 font-mono text-sm">{entry.metrics.costBefore}</td>
                        <td className="py-2 text-green-600 font-mono text-sm">{entry.metrics.costAfter}</td>
                      </tr>
                    )}
                    {entry.metrics.timeSpent && (
                      <tr>
                        <td className="py-2 text-slate-600">所要時間</td>
                        <td className="py-2 text-slate-600 font-mono text-sm" colSpan={2}>{entry.metrics.timeSpent}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Markdown本文 */}
          <div className="prose prose-lg prose-slate max-w-none">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-8 mb-4 text-slate-900">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-800 border-b-2 border-[#D4AF37] pb-2">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold mt-6 mb-3 text-slate-700">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <div className="mb-4 leading-relaxed text-slate-700">
                    {children}
                  </div>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#10B981] pl-4 italic my-6 text-slate-600 bg-green-50 py-2">
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 space-y-2 text-slate-700">
                    {children}
                  </ul>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-slate-900">{children}</strong>
                ),
                code: ({ children, className }) => {
                  const match = /language-(\w+)/.exec(className || '')
                  const language = match ? match[1] : ''

                  return language ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={language}
                      PreTag="div"
                      className="rounded-lg my-4"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-[#10B981]">
                      {children}
                    </code>
                  )
                },
                hr: () => <hr className="my-8 border-slate-200" />,
                img: ({ src, alt }) => (
                  <figure className="my-8">
                    <img
                      src={src}
                      alt={alt}
                      className="w-full rounded-xl shadow-lg border border-slate-100"
                    />
                    {alt && (
                      <figcaption className="mt-3 text-center text-sm text-slate-500 font-medium italic">
                        {alt}
                      </figcaption>
                    )}
                  </figure>
                ),
              }}
            >
              {entry.conversation}
            </ReactMarkdown>
          </div>

          {/* コード例セクション */}
          {entry.codeExamples && entry.codeExamples.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-slate-900">コード例</h2>
              <div className="space-y-6">
                {entry.codeExamples.map((example, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{example.filename || `例 ${index + 1}`}</span>
                      <span className="text-sm text-slate-600">{example.language}</span>
                    </div>
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={example.language}
                      PreTag="div"
                      customStyle={{ margin: 0, borderRadius: 0 }}
                    >
                      {example.code}
                    </SyntaxHighlighter>
                    {example.explanation && (
                      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                        <p className="text-sm text-slate-700">{example.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 失敗した試み */}
          {entry.failedAttempts && entry.failedAttempts.length > 0 && (
            <div className="mt-12 border-l-4 border-red-400 pl-6 py-4 bg-red-50">
              <h3 className="text-xl font-bold mb-3 text-red-900">失敗した試み</h3>
              <ul className="space-y-2 text-slate-700">
                {entry.failedAttempts.map((attempt, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>{attempt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 未解決の課題 */}
          {entry.unsolvedIssues && entry.unsolvedIssues.length > 0 && (
            <div className="mt-12 border-l-4 border-yellow-400 pl-6 py-4 bg-yellow-50">
              <h3 className="text-xl font-bold mb-3 text-yellow-900">未解決の課題</h3>
              <ul className="space-y-2 text-slate-700">
                {entry.unsolvedIssues.map((issue, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-500 mr-2">⚠</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 外部リンク */}
          {entry.externalLinks && entry.externalLinks.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4 text-slate-900">参考リンク</h3>
              <ul className="space-y-2">
                {entry.externalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#10B981] hover:underline inline-flex items-center"
                    >
                      {link.title}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* AI生成の免責事項 */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="bg-blue-50 border border-blue-200 p-4 text-xs text-slate-600 leading-relaxed">
              <p className="font-semibold text-blue-800 mb-2">AI生成コンテンツについて</p>
              <p className="mb-2">
                この記事は、AI（Claude、ChatGPT等）によって生成されたコンテンツです。
                経営者とAIの実際の対話を元に作成していますが、技術的な内容には誤りが含まれる可能性があります。
              </p>
              <p className="text-slate-500">
                重要な決定をされる際は、専門家にご相談されることをお勧めします。
                また、記事の内容について疑問がある場合は、お気軽にお問い合わせください。
              </p>
            </div>
          </div>

          {/* フッター */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <Link
              href="/journal"
              className="inline-flex items-center text-[#10B981] hover:text-[#0EA472] font-semibold transition-colors"
            >
              ← ジャーナル一覧に戻る
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
