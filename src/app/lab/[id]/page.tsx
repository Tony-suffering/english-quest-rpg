import { labEntries } from '@/data/lab'
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

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return labEntries.map((entry) => ({
    id: entry.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const entry = labEntries.find((e) => e.id === id)

  if (!entry) {
    return {
      title: '記事が見つかりません | IWASAKI LAB',
    }
  }

  return {
    title: `${entry.title} | IWASAKI LAB`,
    description: entry.summary,
  }
}

export default async function LabDetailPage({ params }: Props) {
  const { id } = await params
  const entry = labEntries.find((e) => e.id === id)

  if (!entry) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F7] to-[#F5F3F0]">
      <Header />

      {/* パンくずリスト */}
      <nav className="container mx-auto px-4 py-4 text-sm text-[#252423]/60" aria-label="パンくずリスト">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">
              ホーム
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/lab" className="hover:text-[#D4AF37] transition-colors">
              LAB
            </Link>
          </li>
          <li>/</li>
          <li className="text-[#252423] font-medium" aria-current="page">記事</li>
        </ol>
      </nav>

      {/* ヘッダー */}
      <section className="relative border-b border-[#DAE2E8] py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] uppercase tracking-[0.15em] text-red-500 font-bold px-2 py-1 bg-red-50 rounded-sm">
                Private
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#252423]/40">
                {entry.date}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif text-[#252423] mb-4">{entry.title}</h1>

            <div className="flex items-center gap-4 text-[#252423]/60 mb-6">
              <span>{entry.readTime}分で読めます</span>
            </div>

            <p className="text-lg text-[#252423]/70">{entry.summary}</p>
          </div>
        </div>
      </section>

      {/* English Conversation Player */}
      {entry.conversationData && (
        <section className="container mx-auto px-4 py-8 relative z-20">
          <div className="max-w-4xl mx-auto">
            <ConversationPlayer conversation={entry.conversationData.english} theme="light" />
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
                className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
            {entry.techTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#252423]/5 text-[#252423]/60 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Markdown本文 */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-serif font-bold mt-8 mb-4 text-[#252423]">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-[#252423] border-b-2 border-[#D4AF37] pb-2">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-serif font-bold mt-6 mb-3 text-[#252423]">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <div className="mb-4 leading-relaxed text-[#252423]/80">
                    {children}
                  </div>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#D4AF37] pl-4 italic my-6 text-[#252423]/70 bg-amber-50 py-2">
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 space-y-2 text-[#252423]/80">
                    {children}
                  </ul>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold text-[#252423]">{children}</strong>
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
                    <code className="bg-[#252423]/10 px-1.5 py-0.5 rounded text-sm font-mono text-[#D4AF37]">
                      {children}
                    </code>
                  )
                },
                hr: () => <hr className="my-8 border-[#DAE2E8]" />,
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6">
                    <table className="w-full border-collapse border border-[#DAE2E8]">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-[#DAE2E8] bg-amber-50 px-4 py-2 text-left font-bold text-[#252423]">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-[#DAE2E8] px-4 py-2 text-[#252423]/80">
                    {children}
                  </td>
                ),
              }}
            >
              {entry.content}
            </ReactMarkdown>
          </div>

          {/* フッター */}
          <div className="mt-12 pt-8 border-t border-[#DAE2E8]">
            <div className="bg-amber-50/50 border border-amber-200/50 p-4 text-xs text-[#252423]/60 leading-relaxed mb-8">
              <p className="font-semibold text-amber-800 mb-2">Private Content</p>
              <p>
                この記事は非公開コンテンツです。AIとの対話を元に生成されています。
              </p>
            </div>

            <Link
              href="/lab"
              className="inline-flex items-center text-[#D4AF37] hover:text-[#B8860B] font-semibold transition-colors"
            >
              ← LABに戻る
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
