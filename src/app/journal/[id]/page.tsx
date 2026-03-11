import { journalEntries } from '@/data/journal'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

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
    return { title: 'Not Found | toniolab' }
  }

  return {
    title: `${entry.title} | toniolab`,
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
      {/* Header */}
      <header className="border-b border-stone-200 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/journal" className="text-lg font-bold text-stone-800 tracking-wider">
            tonio<span className="text-[#D4AF37]">lab</span>
            <span className="text-sm text-stone-400 ml-3 font-normal">Journal</span>
          </Link>
          <Link href="/journal" className="text-sm text-stone-500 hover:text-[#D4AF37] transition-colors">
            All Articles
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative border-b border-stone-200 py-12 overflow-hidden">
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
            <img src={entry.heroImage} alt={entry.title} className="w-full h-full object-cover opacity-30" />
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-2xl">
              {entry.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90 mb-6 drop-shadow-lg">
              <time dateTime={entry.date}>
                {new Date(entry.date).toLocaleDateString('ja-JP', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </time>
              <span>#{entry.id}</span>
              <span>{entry.readTime}min</span>
              {entry.featured && (
                <span className="border border-[#D4AF37] bg-[#D4AF37]/20 backdrop-blur-sm px-2 py-1 text-xs font-semibold text-[#D4AF37]">
                  Featured
                </span>
              )}
            </div>
            <p className="text-lg text-white/90 drop-shadow-lg">{entry.summary}</p>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {entry.businessTags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-medium">
                #{tag}
              </span>
            ))}
            {entry.techTags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* Metrics */}
          {entry.metrics && (
            <div className="mb-12 border border-stone-200 rounded-lg overflow-hidden">
              <div className="bg-stone-50 px-6 py-3 border-b border-stone-200">
                <h2 className="font-bold text-stone-900">Metrics</h2>
              </div>
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stone-200">
                      <th className="text-left py-2 text-stone-700 font-semibold">Item</th>
                      <th className="text-left py-2 text-stone-700 font-semibold">Before</th>
                      <th className="text-left py-2 text-stone-700 font-semibold">After</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.metrics.performanceBefore && (
                      <tr className="border-b border-stone-100">
                        <td className="py-2 text-stone-600">Performance</td>
                        <td className="py-2 text-red-600 font-mono text-sm">{entry.metrics.performanceBefore}</td>
                        <td className="py-2 text-green-600 font-mono text-sm">{entry.metrics.performanceAfter}</td>
                      </tr>
                    )}
                    {entry.metrics.costBefore && (
                      <tr className="border-b border-stone-100">
                        <td className="py-2 text-stone-600">Cost</td>
                        <td className="py-2 text-red-600 font-mono text-sm">{entry.metrics.costBefore}</td>
                        <td className="py-2 text-green-600 font-mono text-sm">{entry.metrics.costAfter}</td>
                      </tr>
                    )}
                    {entry.metrics.timeSpent && (
                      <tr>
                        <td className="py-2 text-stone-600">Time</td>
                        <td className="py-2 text-stone-600 font-mono text-sm" colSpan={2}>{entry.metrics.timeSpent}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Markdown Body */}
          <div className="prose prose-lg prose-stone max-w-none">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold mt-8 mb-4 text-stone-900">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold mt-8 mb-4 text-stone-800 border-b-2 border-[#D4AF37] pb-2">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-bold mt-6 mb-3 text-stone-700">{children}</h3>
                ),
                p: ({ children }) => (
                  <div className="mb-4 leading-relaxed text-stone-700">{children}</div>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#10B981] pl-4 italic my-6 text-stone-600 bg-green-50 py-2">
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 space-y-2 text-stone-700">{children}</ul>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-stone-900">{children}</strong>
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
                    <code className="bg-stone-100 px-1.5 py-0.5 rounded text-sm font-mono text-[#10B981]">
                      {children}
                    </code>
                  )
                },
                hr: () => <hr className="my-8 border-stone-200" />,
                img: ({ src, alt }) => (
                  <figure className="my-8">
                    <img src={src} alt={alt} className="w-full rounded-xl shadow-lg border border-stone-100" />
                    {alt && (
                      <figcaption className="mt-3 text-center text-sm text-stone-500 font-medium italic">{alt}</figcaption>
                    )}
                  </figure>
                ),
              }}
            >
              {entry.conversation}
            </ReactMarkdown>
          </div>

          {/* Code Examples */}
          {entry.codeExamples && entry.codeExamples.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-stone-900">Code</h2>
              <div className="space-y-6">
                {entry.codeExamples.map((example, index) => (
                  <div key={index} className="border border-stone-200 rounded-lg overflow-hidden">
                    <div className="bg-stone-50 px-6 py-3 border-b border-stone-200 flex items-center justify-between">
                      <span className="font-semibold text-stone-900">{example.filename || `Example ${index + 1}`}</span>
                      <span className="text-sm text-stone-600">{example.language}</span>
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
                      <div className="px-6 py-4 bg-stone-50 border-t border-stone-200">
                        <p className="text-sm text-stone-700">{example.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back */}
          <div className="mt-12 pt-8 border-t border-stone-200">
            <Link
              href="/journal"
              className="inline-flex items-center text-[#D4AF37] hover:text-[#B8962E] font-semibold transition-colors"
            >
              ← Back to Journal
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
