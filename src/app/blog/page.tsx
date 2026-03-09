import Link from 'next/link';
import Header from '@/components/website/Header';
import Footer from '@/components/website/Footer';
import { getSortedPostsData } from '@/lib/posts';

// Metadata
export const metadata = {
    title: 'Insights | イワサキ内装',
    description: '現場の未来と技術に関するインサイト',
};

export default function BlogIndexPage() {
    const allPostsData = getSortedPostsData();

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            {/* Hero Section */}
            <section className="relative border-b border-slate-200 py-32 overflow-hidden bg-white">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('/images/textures/concrete.jpg')] bg-cover bg-center mix-blend-overlay" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 border border-slate-300 text-slate-500 text-xs tracking-widest uppercase mb-6 rounded-full">
                        Iwasaki Insights
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-slate-900 tracking-tight">
                        Future of <br className="hidden md:block" />
                        <span className="italic text-[#D4AF37]">Craftsmanship</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
                        建築の未来、職人の哲学、そしてテクノロジーの融合。<br />
                        私たちが描く新しい「現場」の風景をお届けします。
                    </p>
                </div>
            </section>

            {/* Featured / Latest Post (Magazine Style) */}
            {allPostsData.length > 0 && (
                <section className="container mx-auto px-4 -mt-20 relative z-20 mb-24">
                    <Link href={`/blog/${allPostsData[0].slug}`} className="group block">
                        <div
                            className="max-w-6xl mx-auto bg-white drop-shadow-2xl grid md:grid-cols-2 min-h-[500px] relative"
                            style={{ clipPath: 'polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px)' }}
                        >
                            {/* Image Side */}
                            <div className="relative h-64 md:h-auto overflow-hidden">
                                {allPostsData[0].image ? (
                                    <img src={allPostsData[0].image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                                ) : (
                                    <div className="w-full h-full bg-slate-200" />
                                )}
                                {allPostsData[0].slug === '2025-12-08-20251208101132' && (
                                    <div className="absolute inset-0 border-4 border-[#D4AF37] z-20 pointer-events-none" />
                                )}
                                <div className={`absolute top-4 left-4 backdrop-blur px-3 py-1 text-xs font-bold tracking-widest uppercase shadow-sm z-30 ${allPostsData[0].slug === '2025-12-08-20251208101132'
                                    ? 'bg-[#D4AF37] text-black ring-2 ring-white/50'
                                    : 'bg-white/90 text-slate-900'
                                    }`}>
                                    {allPostsData[0].slug === '2025-12-08-20251208101132' ? 'The Eternal' : 'Latest Insight'}
                                </div>
                            </div>
                            {/* Content Side */}
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex gap-2 mb-4">
                                    {allPostsData[0].businessTags?.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">{tag}</span>
                                    ))}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6 group-hover:text-[#10B981] transition-colors leading-tight">
                                    {allPostsData[0].title}
                                </h2>
                                <p className="text-slate-500 leading-relaxed mb-8 line-clamp-3">
                                    {allPostsData[0].description}
                                </p>
                                <div className="flex items-center text-sm text-slate-400 font-medium mt-auto">
                                    <span className="border-b border-[#D4AF37] text-slate-900 pb-0.5 group-hover:border-[#10B981] transition-colors">Read Article</span>
                                    <span className="mx-4">•</span>
                                    <time>{allPostsData[0].date}</time>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* Post List (Grid) */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-12 border-b border-slate-200 pb-4">
                        <h3 className="text-2xl font-serif font-bold text-slate-900">Recent Articles</h3>
                    </div>

                    {allPostsData.length > 1 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                            {allPostsData.slice(1).map((post) => (
                                <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                                    <article className="flex flex-col h-full bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                        {/* Image */}
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            {post.image ? (
                                                <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full bg-slate-100" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col p-6">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {post.businessTags?.slice(0, 1).map(tag => (
                                                    <span key={tag} className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">{tag}</span>
                                                ))}
                                            </div>
                                            <h2 className="text-xl font-serif font-bold mb-3 text-slate-900 group-hover:text-[#10B981] transition-colors leading-tight">
                                                {post.title}
                                            </h2>

                                            <p className="text-sm text-slate-500 mb-4 leading-relaxed line-clamp-2">
                                                {post.description}
                                            </p>

                                            <div className="mt-auto pt-4 flex items-center text-xs text-slate-400 border-t border-slate-100">
                                                <time>{post.date}</time>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-slate-500 bg-white rounded-lg shadow-sm">
                            <p>その他の記事はまだありません。</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
