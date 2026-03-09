'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Header from '@/components/website/Header';
import Footer from '@/components/website/Footer';

const supabase = createClient(
  process.env.NEXT_PUBLIC_FINANCE_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_FINANCE_SUPABASE_ANON_KEY!
);

interface Wisdom {
  id: number;
  date: string;
  content: string;
  content_en?: string;
  source: string;
  image_url?: string;
}

export default function WisdomArchivePage() {
  const [wisdoms, setWisdoms] = useState<Wisdom[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWisdom, setSelectedWisdom] = useState<Wisdom | null>(null);

  useEffect(() => {
    async function fetchWisdoms() {
      const { data, error } = await supabase
        .from('wisdoms')
        .select('*')
        .not('image_url', 'is', null)
        .order('date', { ascending: false })
        .limit(100);

      if (data && !error) {
        setWisdoms(data);
      }
      setLoading(false);
    }

    fetchWisdoms();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      <Header />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
              WISDOM ARCHIVE
            </span>
            <h1 className="mt-4 text-3xl md:text-4xl font-serif text-stone-800 tracking-wide">
              Daily Wisdom Collection
            </h1>
            <p className="mt-3 text-stone-500 max-w-xl mx-auto">
              Every morning at 5:00 AM JST, AI generates a unique wisdom and zen art.
              Browse through our collection of philosophical insights.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Wisdom Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wisdoms.map((wisdom, index) => (
                <div
                  key={wisdom.id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer animate-fade-in-up border border-stone-100"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setSelectedWisdom(wisdom)}
                >
                  {/* Image */}
                  {wisdom.image_url && (
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={wisdom.image_url}
                        alt={wisdom.content}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-[10px] text-stone-400 tracking-wider mb-2">
                      {formatDate(wisdom.date)}
                    </p>
                    <p className="text-lg font-serif text-stone-800 leading-relaxed mb-2 line-clamp-2">
                      {wisdom.content}
                    </p>
                    {wisdom.content_en && (
                      <p className="text-sm text-stone-500 italic line-clamp-1">
                        {wisdom.content_en}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && wisdoms.length === 0 && (
            <div className="text-center py-20">
              <p className="text-stone-500">No wisdoms found yet. Check back tomorrow!</p>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedWisdom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedWisdom(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedWisdom(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            {selectedWisdom.image_url && (
              <img
                src={selectedWisdom.image_url}
                alt={selectedWisdom.content}
                className="w-full aspect-square object-cover"
              />
            )}

            {/* Content */}
            <div className="p-6 md:p-8">
              <p className="text-[10px] text-[#D4AF37] tracking-wider mb-3 font-bold">
                {formatDate(selectedWisdom.date)}
              </p>
              <p className="text-2xl md:text-3xl font-serif text-stone-800 leading-relaxed mb-3">
                " {selectedWisdom.content} "
              </p>
              {selectedWisdom.content_en && (
                <p className="text-lg text-stone-500 italic mb-4">
                  {selectedWisdom.content_en}
                </p>
              )}
              <p className="text-sm text-stone-400">
                ── {selectedWisdom.source}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-stone-100">
                <button
                  onClick={() => {
                    const text = `${selectedWisdom.content}${selectedWisdom.content_en ? `\n\n${selectedWisdom.content_en}` : ''}\n\n── ${selectedWisdom.source}`;
                    const url = 'https://iwasaki-naisou.com/wisdom-archive';
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm text-stone-600 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 rounded-full transition-all duration-200 border border-stone-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Share
                </button>

                {selectedWisdom.image_url && (
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = selectedWisdom.image_url!;
                      link.download = `wisdom-${selectedWisdom.date}.png`;
                      link.target = '_blank';
                      link.click();
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm text-stone-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all duration-200 border border-stone-200"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
