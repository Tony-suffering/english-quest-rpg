'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/lp/Header';
import Footer from '@/components/lp/Footer';

type Platform = 'ios' | 'android' | 'desktop';

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  return 'desktop';
}

function isStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches
    || ('standalone' in navigator && (navigator as Record<string, unknown>).standalone === true);
}

const f = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] } },
};

// ─── Step Card ─────────────────────────────────────────────

function StepCard({ number, title, description, visual, delay }: {
  number: number;
  title: string;
  description: string;
  visual: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      variants={f}
      className="border border-[#DAE2E8] bg-white group"
      style={{ transitionDelay: delay ? `${delay}s` : undefined }}
    >
      {/* Visual */}
      <div className="bg-[#F5F5F7] px-6 py-8 flex justify-center items-center min-h-[100px]">
        {visual}
      </div>
      {/* Text */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-7 h-7 rounded-full bg-[#D4AF37] text-white flex items-center justify-center text-xs font-black flex-shrink-0">
            {number}
          </div>
          <h3 className="text-base font-black text-[#252423]">{title}</h3>
        </div>
        <p className="text-xs text-[#252423]/50 leading-relaxed pl-10">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── iOS Visual Mocks ──────────────────────────────────────

function IosShareButtonMock() {
  return (
    <div className="flex items-center gap-3 bg-white px-6 py-3 border-2 border-[#007AFF] rounded-none shadow-sm">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
      <div>
        <div className="text-sm font-bold text-[#252423]">共有ボタン</div>
        <div className="text-[10px] text-[#252423]/40">画面下部の四角+矢印アイコン</div>
      </div>
    </div>
  );
}

function IosAddToHomeMock() {
  return (
    <div className="flex items-center gap-3 bg-white px-6 py-3 border-2 border-[#007AFF] rounded-none shadow-sm">
      <div className="w-7 h-7 bg-[#F5F5F7] flex items-center justify-center flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </div>
      <div className="text-sm font-bold text-[#252423]">ホーム画面に追加</div>
    </div>
  );
}

function HomeScreenMock() {
  return (
    <div className="flex items-end gap-5">
      <div className="w-12 h-12 rounded-xl bg-[#E5E7EB]" />
      <div className="w-12 h-12 rounded-xl bg-[#E5E7EB]" />
      <div className="flex flex-col items-center gap-1">
        <div className="w-12 h-12 rounded-xl bg-[#D4AF37] flex items-center justify-center shadow-lg border-2 border-[#D4AF37]">
          <span className="text-sm font-black text-white">英</span>
        </div>
        <span className="text-[10px] font-bold text-[#252423]/60">英語魂</span>
      </div>
      <div className="w-12 h-12 rounded-xl bg-[#E5E7EB]" />
    </div>
  );
}

// ─── Android Visual Mocks ──────────────────────────────────

function AndroidMenuMock() {
  return (
    <div className="flex items-center gap-3 bg-white px-6 py-3 border-2 border-[#4285F4] rounded-none shadow-sm">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#252423" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="19" r="1" />
      </svg>
      <div>
        <div className="text-sm font-bold text-[#252423]">メニューボタン</div>
        <div className="text-[10px] text-[#252423]/40">Chrome右上の3点アイコン</div>
      </div>
    </div>
  );
}

function AndroidInstallMock() {
  return (
    <div className="flex items-center gap-3 bg-white px-6 py-3 border-2 border-[#4285F4] rounded-none shadow-sm">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      <div className="text-sm font-bold text-[#252423]">アプリをインストール</div>
    </div>
  );
}

// ─── Desktop Visual Mocks ──────────────────────────────────

function DesktopAddressBarMock() {
  return (
    <div className="flex items-center gap-3 bg-white px-4 py-2 border border-[#DAE2E8] shadow-sm">
      <div className="flex-1 h-8 rounded-full bg-[#F5F5F7] flex items-center px-4 text-xs text-[#252423]/40">
        toniolab.com/english
      </div>
      <div className="w-8 h-8 border-2 border-[#4285F4] flex items-center justify-center flex-shrink-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </div>
    </div>
  );
}

// ─── Already Installed ─────────────────────────────────────

function AlreadyInstalled() {
  return (
    <div className="min-h-screen bg-white text-[#252423] flex flex-col items-center justify-center px-6">
      <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-6">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h1 className="text-2xl font-black mb-3">インストール済み</h1>
      <p className="text-sm text-[#252423]/50 leading-relaxed text-center mb-8">
        英語魂は既にホーム画面に追加されています。<br />このままアプリをお楽しみください。
      </p>
      <Link href="/english" className="inline-flex items-center gap-3 px-8 py-3 bg-[#252423] text-white text-sm font-bold tracking-wide hover:bg-[#D4AF37] transition-colors">
        アプリを開く <span className="text-xs opacity-50">--</span>
      </Link>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────

export default function InstallPage() {
  const [platform, setPlatform] = useState<Platform>('ios');
  const [installed, setInstalled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPlatform(detectPlatform());
    setInstalled(isStandalone());
  }, []);

  if (!mounted) return null;
  if (installed) return <AlreadyInstalled />;

  const tabs: { key: Platform; label: string }[] = [
    { key: 'ios', label: 'iPhone / iPad' },
    { key: 'android', label: 'Android' },
    { key: 'desktop', label: 'PC' },
  ];

  return (
    <div className="min-h-screen bg-white text-[#252423]">
      <Header />

      {/* ━━━ HERO ━━━ */}
      <section className="min-h-[60vh] flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-24 relative">
        <div className="absolute top-0 left-[10%] w-px h-full bg-[#252423]/[0.03]" />
        <div className="absolute top-0 right-[15%] w-px h-full bg-[#252423]/[0.03]" />
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.15 }} className="max-w-3xl">
          <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-gray-400 font-mono mb-8">
            INSTALL GUIDE
          </motion.p>
          <motion.h1 variants={f} className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.3] tracking-tight mb-6">
            <span className="text-[#D4AF37]">英語魂</span>を<br />ホーム画面に追加する。
          </motion.h1>
          <motion.p variants={f} className="text-base sm:text-lg text-[#252423]/60 leading-relaxed max-w-xl mb-12">
            App StoreやGoogle Playからのダウンロードは不要。<br />
            今開いてるこのブラウザから、3ステップでインストールできる。<br />
            容量はほぼゼロ。アプリと同じ体験。
          </motion.p>
          <motion.div variants={f} className="flex flex-wrap gap-4">
            <a href="#steps" className="inline-flex items-center gap-3 px-6 py-3 bg-[#252423] text-white text-sm font-bold tracking-wide hover:bg-[#D4AF37] transition-colors">
              インストール手順へ <span className="text-xs opacity-50">--</span>
            </a>
            <a href="#why" className="inline-flex items-center gap-2 px-6 py-3 border border-[#DAE2E8] text-sm font-bold text-[#252423]/60 hover:border-[#252423]/30 transition-colors">
              なぜアプリストアに出さないのか
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ━━━ WHAT YOU GET ━━━ */}
      <section className="px-6 sm:px-12 lg:px-24 py-16 bg-[#F5F5F7]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.08 }} className="max-w-3xl">
          <motion.div variants={f} className="border-l-[5px] border-[#D4AF37] pl-6 mb-6">
            <p className="text-lg sm:text-xl font-bold leading-relaxed">
              ホーム画面に追加すると、何が変わるか。
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              { title: 'ワンタップ起動', desc: 'ホーム画面のアイコンをタップするだけ。URLを打つ必要なし。' },
              { title: 'フルスクリーン', desc: 'ブラウザのバーが消えて、アプリと同じ画面サイズで使える。' },
              { title: '容量ほぼゼロ', desc: '普通のアプリは数百MB。英語魂はブラウザ上で動くので数MBで完結。' },
            ].map(item => (
              <motion.div key={item.title} variants={f} className="bg-white border border-[#DAE2E8] p-5">
                <p className="text-sm font-black mb-2">{item.title}</p>
                <p className="text-xs text-[#252423]/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ━━━ INSTALL STEPS ━━━ */}
      <section id="steps" className="px-6 sm:px-12 lg:px-24 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.1 }} className="max-w-3xl">
          <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-gray-400 font-mono mb-4">
            HOW TO INSTALL
          </motion.p>
          <motion.h2 variants={f} className="text-2xl sm:text-3xl font-black mb-10">
            インストール手順
          </motion.h2>

          {/* Platform tabs */}
          <motion.div variants={f} className="flex gap-0 mb-10 border border-[#DAE2E8]">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setPlatform(tab.key)}
                className="flex-1 py-3 text-xs font-bold tracking-wide transition-all"
                style={{
                  backgroundColor: platform === tab.key ? '#252423' : '#fff',
                  color: platform === tab.key ? '#fff' : '#252423',
                  opacity: platform === tab.key ? 1 : 0.4,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* iOS notice */}
          {platform === 'ios' && (
            <motion.div variants={f} className="border-l-[5px] border-[#F97316] pl-5 mb-8 py-2">
              <p className="text-sm font-bold text-[#9A3412] mb-1">Safari で開いてください</p>
              <p className="text-xs text-[#252423]/50 leading-relaxed">
                Chrome や LINE のアプリ内ブラウザではインストールできません。必ず Safari を使ってください。
              </p>
            </motion.div>
          )}

          {/* Android notice */}
          {platform === 'android' && (
            <motion.div variants={f} className="border-l-[5px] border-[#10B981] pl-5 mb-8 py-2">
              <p className="text-sm font-bold text-[#166534] mb-1">自動バナーが出る場合</p>
              <p className="text-xs text-[#252423]/50 leading-relaxed">
                Chrome でアクセスすると画面下部に「インストール」バナーが自動で表示されることがあります。その場合はそのままタップするだけでOK。
              </p>
            </motion.div>
          )}

          {/* Desktop notice */}
          {platform === 'desktop' && (
            <motion.div variants={f} className="border-l-[5px] border-[#8B5CF6] pl-5 mb-8 py-2">
              <p className="text-sm font-bold text-[#5B21B6] mb-1">PC での利用</p>
              <p className="text-xs text-[#252423]/50 leading-relaxed">
                英語魂はスマホに最適化していますが、PC でも使えます。Chrome を推奨。
              </p>
            </motion.div>
          )}

          {/* Steps */}
          <div className="grid grid-cols-1 gap-6">
            {platform === 'ios' && (
              <>
                <StepCard number={1} title="共有ボタンをタップ" description="画面下のバーにある四角に上矢印のアイコンをタップ。" visual={<IosShareButtonMock />} />
                <StepCard number={2} title="「ホーム画面に追加」を選択" description="メニューを下にスクロールすると見つかります。右上の「追加」をタップ。" visual={<IosAddToHomeMock />} delay={0.1} />
                <StepCard number={3} title="ホーム画面から起動" description="英語魂のアイコンが追加されます。タップするとフルスクリーンで起動。" visual={<HomeScreenMock />} delay={0.2} />
              </>
            )}
            {platform === 'android' && (
              <>
                <StepCard number={1} title="メニューを開く" description="Chrome の右上にある3つの点(メニューボタン)をタップ。" visual={<AndroidMenuMock />} />
                <StepCard number={2} title="「アプリをインストール」をタップ" description="メニュー内の「アプリをインストール」を選択。確認画面で「インストール」をタップ。" visual={<AndroidInstallMock />} delay={0.1} />
                <StepCard number={3} title="ホーム画面から起動" description="自動でアイコンが追加されます。普通のアプリと同じように使えます。" visual={<HomeScreenMock />} delay={0.2} />
              </>
            )}
            {platform === 'desktop' && (
              <>
                <StepCard number={1} title="Chrome でアクセス" description="アドレスバー右側にあるインストールアイコン(モニタに矢印のマーク)をクリック。" visual={<DesktopAddressBarMock />} />
                <StepCard number={2} title="「インストール」をクリック" description="確認ダイアログで「インストール」を選択。デスクトップに独立ウインドウとして起動するショートカットが作成されます。" visual={
                  <div className="bg-white border-2 border-[#4285F4] px-6 py-4 text-center shadow-sm">
                    <p className="text-sm font-bold text-[#252423] mb-3">「英語魂」をインストールしますか？</p>
                    <span className="inline-block px-6 py-2 bg-[#4285F4] text-white text-xs font-bold">インストール</span>
                  </div>
                } delay={0.1} />
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* ━━━ WHY NOT APP STORE ━━━ */}
      <section id="why" className="px-6 sm:px-12 lg:px-24 py-16 bg-[#F5F5F7]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} transition={{ staggerChildren: 0.08 }} className="max-w-3xl">
          <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-gray-400 font-mono mb-4">
            WHY NOT APP STORE?
          </motion.p>
          <motion.h2 variants={f} className="text-2xl sm:text-3xl font-black mb-10">
            なぜアプリストアに出さないのか
          </motion.h2>

          <div className="space-y-4">
            {[
              {
                title: '毎日更新してるから、審査を待てない',
                desc: 'App Storeの審査には数日〜数週間かかる。このアプリは毎日コンテンツが追加・修正される。ウェブなら更新が即座に反映される。',
              },
              {
                title: 'ストレージを食わない',
                desc: '普通のアプリは数百MB。英語魂はブラウザ上で動くから数MBで完結する。スマホの容量を圧迫しない。',
              },
              {
                title: 'アプリと同じ体験ができる',
                desc: 'ホーム画面から起動、フルスクリーン表示、オフライン対応。見た目も操作感もネイティブアプリと同じ。',
              },
              {
                title: '手数料30%がない',
                desc: 'Apple / Google はアプリ内売上の30%を手数料として取る。ウェブならその負担がない。将来的に課金する場合も、ユーザーの負担を抑えられる。',
              },
            ].map(item => (
              <motion.div key={item.title} variants={f} className="border border-[#DAE2E8] bg-white p-6 hover:border-[#D4AF37]/30 transition-all">
                <p className="text-sm font-black mb-2">{item.title}</p>
                <p className="text-xs text-[#252423]/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="px-6 sm:px-12 lg:px-24 py-20">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.15 }} className="max-w-3xl text-center mx-auto">
          <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-gray-400 font-mono mb-6">
            READY?
          </motion.p>
          <motion.h2 variants={f} className="text-2xl sm:text-3xl font-black mb-4">
            インストールできたら、あとは毎日開くだけ。
          </motion.h2>
          <motion.p variants={f} className="text-sm text-[#252423]/50 leading-relaxed mb-10">
            1日5分。フレーズをタップして、スロットを回して、<br />
            気づいたら英語が頭に残ってる。そういう設計。
          </motion.p>
          <motion.div variants={f} className="flex flex-wrap gap-4 justify-center">
            <Link href="/english" className="inline-flex items-center gap-3 px-8 py-3 bg-[#252423] text-white text-sm font-bold tracking-wide hover:bg-[#D4AF37] transition-colors">
              英語魂を開く <span className="text-xs opacity-50">--</span>
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border border-[#DAE2E8] text-sm font-bold text-[#252423]/60 hover:border-[#252423]/30 transition-colors">
              TONIO LAB トップへ
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
