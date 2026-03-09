import { getAllPostSlugs, getPostData } from '@/lib/posts';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Header from '@/components/website/Header';
import Footer from '@/components/website/Footer';
import BackgroundVideo from '@/components/website/BackgroundVideo';
import SumitsuboWrapper from '@/components/three/SumitsuboWrapper';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const paths = getAllPostSlugs();
    return paths.map((path) => ({
        slug: path.params.slug,
    }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const postData = await getPostData(slug);

    return {
        title: `${postData.title} | イワサキ内装 Insights`,
        description: postData.description,
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const postData = await getPostData(slug);
    const isGaro = slug.includes('pachinko');

    return (
        <div className={`min-h-screen ${isGaro ? 'bg-black' : 'bg-slate-50'}`}>
            <Header />

            {/* Breadcrumbs */}
            <nav className={`container mx-auto px-4 pt-20 pb-4 text-sm ${isGaro ? 'text-slate-400' : 'text-slate-600'}`} aria-label="Breadcrumbs">
                <ol className="flex items-center space-x-2">
                    <li>
                        <Link href="/" className="hover:text-green-600 transition-colors">ホーム</Link>
                    </li>
                    <li>/</li>
                    <li>
                        <Link href="/blog" className="hover:text-green-600 transition-colors">Insights</Link>
                    </li>
                    <li>/</li>
                    <li className={`${isGaro ? 'text-yellow-500' : 'text-slate-900'} font-medium truncate max-w-[200px] md:max-w-none`} aria-current="page">{postData.title}</li>
                </ol>
            </nav>

            {/* Hero Section */}
            <section className={`relative border-b ${isGaro ? 'border-yellow-900/30' : 'border-slate-200'} py-12 overflow-hidden ${isGaro ? 'bg-black' : 'bg-white'}`}>
                {/* Background Image when no video */}
                {!postData.youtube && !postData.cloudflareVideo && !postData.video && postData.image && (
                    <div className="absolute inset-0 z-0">
                        <div className={`absolute inset-0 bg-gradient-to-b ${isGaro ? 'from-black/80 via-black/60 to-black' : 'from-black/60 via-black/40 to-white'}`} />
                        <img src={postData.image} alt={postData.title} className="w-full h-full object-cover opacity-30" />
                    </div>
                )}

                <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex gap-2 mb-4 justify-center md:justify-start">
                            {postData.businessTags?.map((tag: string) => (
                                <span key={tag} className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-white/10 backdrop-blur px-2 py-1 rounded">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className={`text-2xl md:text-5xl font-serif font-bold mb-6 ${isGaro ? 'text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]' : (postData.youtube || postData.cloudflareVideo || postData.video ? 'text-slate-800' : 'text-slate-800 md:text-white drop-shadow-2xl')} leading-tight`}>
                            {postData.title}
                        </h1>

                        <div className={`flex items-center gap-4 mb-6 text-sm justify-center md:justify-start ${postData.youtube || postData.cloudflareVideo || postData.video ? 'text-slate-500' : 'text-slate-500 md:text-white/90 drop-shadow-lg'}`}>
                            <time dateTime={postData.date}>{postData.date}</time>
                            {postData.featured && (
                                <span className="border border-[#D4AF37] bg-[#D4AF37]/20 backdrop-blur-sm px-2 py-0.5 text-xs font-semibold text-[#D4AF37]">
                                    Featured
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Video Section - After Title */}
                {postData.youtube ? (
                    <div className="container mx-auto px-4 relative z-10 mt-8 max-w-5xl">
                        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-slate-200/20">
                            <iframe
                                width="100%"
                                height="100%"
                                src={postData.youtube}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    </div>
                ) : postData.cloudflareVideo ? (
                    <>
                        <div className="container mx-auto px-4 relative z-10 mt-8 max-w-5xl">
                            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-slate-200/20 bg-black">
                                <iframe
                                    src={`https://customer-g3tngdysgdne3fza.cloudflarestream.com/${postData.cloudflareVideo}/iframe`}
                                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                ></iframe>
                            </div>
                        </div>

                    </>
                ) : postData.video ? (
                    <div className="container mx-auto px-4 relative z-10 mt-8 max-w-5xl">
                        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-2xl border border-slate-200/20 bg-black">
                            <video controls className="w-full h-full">
                                <source src={postData.video} type="video/mp4" />
                                <source src={postData.video} type="video/quicktime" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                ) : null}
            </section>

            {/* Content */}
            <article className="container mx-auto px-4 py-16 relative z-10">
                <div className={`max-w-3xl mx-auto ${isGaro ? 'bg-black/80 border border-yellow-900/50 text-slate-300' : 'bg-white text-slate-700'} p-8 md:p-12 shadow-sm rounded-xl backdrop-blur-sm`}>

                    {/* Markdown Body */}
                    <div className={`prose prose-lg max-w-none ${isGaro ? 'prose-invert prose-p:text-slate-300 prose-headings:text-yellow-500 prose-strong:text-yellow-400' : 'prose-slate'}`}>
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                h1: ({ children }) => <h1 className="text-3xl font-serif font-bold mt-12 mb-6">{children}</h1>,
                                h2: ({ children }) => <h2 className={`text-2xl font-serif font-bold mt-10 mb-5 border-b ${isGaro ? 'border-yellow-500/50' : 'border-[#D4AF37]/30'} pb-2`}>{children}</h2>,
                                h3: ({ children }) => <h3 className="text-xl font-serif font-bold mt-8 mb-4">{children}</h3>,
                                p: ({ children }) => <p className="mb-6 leading-relaxed font-light text-[1.05rem]">{children}</p>,
                                ul: ({ children }) => <ul className={`list-disc list-inside mb-6 space-y-2 p-6 rounded-lg ${isGaro ? 'bg-yellow-900/10' : 'bg-slate-50'}`}>{children}</ul>,
                                code: ({ children, className }) => {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return match ? (
                                        <SyntaxHighlighter
                                            style={vscDarkPlus}
                                            language={match[1]}
                                            PreTag="div"
                                            className="rounded-lg my-4"
                                        >
                                            {String(children).replace(/\n$/, '')}
                                        </SyntaxHighlighter>
                                    ) : (
                                        <code className={`${isGaro ? 'bg-yellow-900/30 text-yellow-400' : 'bg-slate-100 text-[#10B981]'} px-1.5 py-0.5 rounded text-sm font-mono`}>
                                            {children}
                                        </code>
                                    )
                                },
                                hr: () => <hr className={`my-10 ${isGaro ? 'border-yellow-900/30' : 'border-slate-200'}`} />,
                                blockquote: ({ children }) => (
                                    <blockquote className={`border-l-4 ${isGaro ? 'border-yellow-500 bg-yellow-900/10 text-yellow-100' : 'border-[#10B981] bg-[#10B981]/5 text-slate-600'} pl-6 italic my-8 py-4 rounded-r-lg`}>
                                        {children}
                                    </blockquote>
                                )
                            }}
                        >
                            {postData.contentMarkdown || ''}
                        </ReactMarkdown>
                    </div>

                    {/* Footer Tags */}
                    <div className={`mt-12 pt-8 border-t ${isGaro ? 'border-yellow-900/30' : 'border-slate-100'}`}>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {postData.techTags?.map((tag: string) => (
                                <span key={tag} className={`px-3 py-1 rounded-full text-xs ${isGaro ? 'bg-yellow-900/20 text-yellow-500 border border-yellow-900/50' : 'bg-slate-100 text-slate-600'}`}>
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <Link href="/blog" className={`inline-flex items-center font-medium transition-colors group ${isGaro ? 'text-yellow-500 hover:text-yellow-400' : 'text-slate-500 hover:text-[#D4AF37]'}`}>
                            <span className="group-hover:-translate-x-1 transition-transform mr-2">←</span> Back to Insights
                        </Link>
                    </div>
                </div>
            </article>

            {/* Special Background for Pachinko Article */}
            {isGaro && (
                <div className="fixed inset-0 z-0 pointer-events-none">
                    {/* @ts-ignore */}
                    <BackgroundVideo variant="gold" />
                </div>
            )}

            <Footer />
        </div>
    );
}
