'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ChevronUp, BookOpen, AlertTriangle, Menu, X } from 'lucide-react';

export default function BookPage() {
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [showToc, setShowToc] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

    useEffect(() => {
        fetch('/api/unko')
            .then(res => res.text())
            .then(text => {
                setContent(text);
                setLoading(false);

                // Extract headings for TOC
                const headingMatches = text.match(/^#{1,2}\s+.+$/gm) || [];
                const extracted = headingMatches.map((h, i) => {
                    const level = h.startsWith('## ') ? 2 : 1;
                    const text = h.replace(/^#+\s+/, '');
                    return { id: `heading-${i}`, text, level };
                });
                setHeadings(extracted.slice(0, 50)); // Limit to first 50 for performance
            })
            .catch(err => {
                console.error('Failed to load book:', err);
                setLoading(false);
            });

        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-amber-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="text-amber-800 font-serif">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-stone-50 to-amber-50">
            {/* Warning Banner */}
            <div className="bg-red-900 text-red-100 py-2 px-4 text-center text-sm">
                <AlertTriangle className="inline w-4 h-4 mr-2" />
                <span className="font-bold">WARNING:</span> This book may be shit. Read at your own risk.
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-sm border-b border-amber-600/30 shadow-lg">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="text-amber-500 hover:text-amber-400 transition-colors text-sm">
                        &larr; Back to Site
                    </Link>
                    <div className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-amber-500" />
                        <span className="text-amber-100 font-serif font-bold tracking-wide">
                            The Book
                        </span>
                    </div>
                    <button
                        onClick={() => setShowToc(!showToc)}
                        className="text-amber-500 hover:text-amber-400 transition-colors p-2"
                    >
                        {showToc ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </header>

            {/* TOC Sidebar */}
            {showToc && (
                <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setShowToc(false)}>
                    <div
                        className="absolute right-0 top-0 h-full w-80 bg-stone-900 overflow-y-auto p-6"
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 className="text-amber-500 font-bold mb-4 text-lg">Contents</h3>
                        <div className="space-y-2">
                            {headings.map((h, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        const el = document.getElementById(h.id);
                                        if (el) {
                                            el.scrollIntoView({ behavior: 'smooth' });
                                            setShowToc(false);
                                        }
                                    }}
                                    className={`block text-left w-full text-sm hover:text-amber-400 transition-colors truncate ${
                                        h.level === 1 ? 'text-amber-300 font-bold' : 'text-stone-400 pl-4'
                                    }`}
                                >
                                    {h.text}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Book Content */}
            <main className="max-w-3xl mx-auto px-6 py-12">
                {/* Book Cover */}
                <div className="mb-16 text-center">
                    <div className="inline-block bg-gradient-to-br from-stone-800 via-stone-900 to-stone-800 p-8 rounded-lg shadow-2xl border border-amber-600/20 transform hover:scale-105 transition-transform duration-500">
                        <div className="border-2 border-amber-600/30 p-6 rounded">
                            <p className="text-amber-600/60 text-xs tracking-[0.3em] uppercase mb-4">A Philosophical Treatise</p>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-amber-500 mb-2">
                                うんこについての考察
                            </h1>
                            <p className="text-stone-400 text-sm italic mb-6">
                                A Study on Shit
                            </p>
                            <div className="w-16 h-0.5 bg-amber-600/50 mx-auto mb-6" />
                            <p className="text-stone-500 text-xs tracking-widest uppercase">
                                Iwasaki Mitsuo
                            </p>
                        </div>
                    </div>
                </div>

                {/* Markdown Content */}
                <article className="prose prose-stone prose-lg max-w-none
                    prose-headings:font-serif prose-headings:text-stone-800
                    prose-h1:text-3xl prose-h1:border-b-2 prose-h1:border-amber-600/30 prose-h1:pb-4 prose-h1:mb-8 prose-h1:mt-16
                    prose-h2:text-xl prose-h2:text-amber-800 prose-h2:mt-12 prose-h2:mb-4
                    prose-p:text-stone-700 prose-p:leading-relaxed prose-p:mb-4
                    prose-strong:text-stone-900 prose-strong:font-bold
                    prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:italic prose-blockquote:text-stone-600
                    prose-ul:list-disc prose-ul:pl-6
                    prose-li:text-stone-700 prose-li:my-1
                    prose-hr:border-amber-600/20 prose-hr:my-8
                    prose-a:text-amber-700 prose-a:underline hover:prose-a:text-amber-500
                ">
                    <ReactMarkdown
                        components={{
                            h1: ({ children, ...props }) => {
                                const text = String(children);
                                const id = `heading-${headings.findIndex(h => h.text === text)}`;
                                return <h1 id={id} {...props}>{children}</h1>;
                            },
                            h2: ({ children, ...props }) => {
                                const text = String(children);
                                const id = `heading-${headings.findIndex(h => h.text === text)}`;
                                return <h2 id={id} {...props}>{children}</h2>;
                            },
                            hr: () => (
                                <div className="flex items-center justify-center my-8">
                                    <div className="w-2 h-2 rounded-full bg-amber-600/40" />
                                    <div className="w-16 h-0.5 bg-amber-600/20 mx-2" />
                                    <div className="w-2 h-2 rounded-full bg-amber-600/40" />
                                    <div className="w-16 h-0.5 bg-amber-600/20 mx-2" />
                                    <div className="w-2 h-2 rounded-full bg-amber-600/40" />
                                </div>
                            ),
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </article>

                {/* Footer */}
                <footer className="mt-20 pt-8 border-t border-amber-600/20 text-center">
                    <p className="text-stone-500 text-sm mb-4">
                        You actually read this whole thing?
                    </p>
                    <p className="text-amber-700 font-serif text-lg mb-8">
                        Respect.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                    >
                        Need Wallpaper? Contact Me
                    </Link>
                </footer>
            </main>

            {/* Scroll to Top */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-stone-900 text-amber-500 p-3 rounded-full shadow-lg hover:bg-stone-800 transition-colors z-50"
                >
                    <ChevronUp className="w-6 h-6" />
                </button>
            )}
        </div>
    );
}
