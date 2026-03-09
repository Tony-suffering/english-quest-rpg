'use client'

import { useState, useEffect, useLayoutEffect } from 'react'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import ThreeBackground from '@/components/website/ThreeBackground'
import FloatingElements from '@/components/website/FloatingElements'
import PhilosophyCarousel from '@/components/website/PhilosophyCarousel'
import { useDailyWisdom } from '@/hooks/useDailyWisdom'
import MatrixOverlay from '@/components/website/MatrixOverlay'

// New Components
import MindfulIntro from '@/components/website/MindfulIntro'
import FeaturedVideoSection from '@/components/website/FeaturedVideoSection'
import BackgroundVideo from '@/components/website/BackgroundVideo'
import HeroSection from '@/components/website/home/HeroSection'
import ServicesSection from '@/components/website/home/ServicesSection'
import PortfolioSection from '@/components/website/home/PortfolioSection'
import HistorySection from '@/components/website/home/HistorySection'
import StrengthsSection from '@/components/website/home/StrengthsSection'
import TopicsSection from '@/components/website/home/TopicsSection'
import AiDxSection from '@/components/website/home/AiDxSection'
import CtaSection from '@/components/website/home/CtaSection'
import InsightsPreviewSection from '@/components/website/home/InsightsPreviewSection'
import SpotlightTypography from "@/components/website/SpotlightTypography";
import SiteShowcase from "@/components/website/home/SiteShowcase";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false)
  const [glitchMode, setGlitchMode] = useState(false)
  const [horrorMode, setHorrorMode] = useState(false)
  const [garoMode, setGaroMode] = useState(false) // Secret Mode
  const [isFever, setIsFever] = useState(false) // Rainbow Jackpot Mode
  const [introFading, setIntroFading] = useState(false) // Fade-out started
  const [introHidden, setIntroHidden] = useState(false) // Fade-out complete, hide component
  const [isClient, setIsClient] = useState(false) // Track client-side mount
  const [corkQuote, setCorkQuote] = useState(0) // Cork Grandpa quote index
  const [hubermanPortal, setHubermanPortal] = useState(false) // 🧠 Secret Huberman Portal
  const { quote, dateString } = useDailyWisdom()

  // Cork Grandpa Wisdom
  const corkQuotes = [
    "「冷たい床は、心も冷やす。」",
    "「足裏が喜べば、脳も喜ぶ。」",
    "「ワインの栓を開けるとき、足元を見よ。」",
    "「コルクを知らぬ者は、床を知らぬ。」",
    "「タイルおじさんには負けん。」",
  ]

  // 🧠 Secret: Type "3時間" anywhere to open Huberman Portal
  useEffect(() => {
    let typed = ''
    const secretCodes = ['3時間', '1000時間', 'huberman', 'ヒューバーマン', 'dopamine']

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      typed += e.key.toLowerCase()
      // Keep only last 20 characters
      if (typed.length > 20) typed = typed.slice(-20)

      // Check if any secret code was typed
      for (const code of secretCodes) {
        if (typed.includes(code.toLowerCase())) {
          typed = ''
          setHubermanPortal(true)
          // Navigate after animation
          setTimeout(() => {
            window.location.href = '/listening-room'
          }, 3000)
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Check sessionStorage after mount to avoid hydration mismatch
  useLayoutEffect(() => {
    setIsClient(true)
    const introPlayed = sessionStorage.getItem('iwasaki-intro-played')
    if (introPlayed === 'true') {
      setIntroFading(true)
      setIntroHidden(true)
    }
  }, [])

  // Handle fade-out completion and mark intro as played
  useEffect(() => {
    if (introFading && !introHidden) {
      // Mark intro as played in sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('iwasaki-intro-played', 'true')
      }
      const timer = setTimeout(() => {
        setIntroHidden(true)
      }, 3500) // Slightly longer than transition duration (3000ms)
      return () => clearTimeout(timer)
    }
  }, [introFading, introHidden])

  useEffect(() => {
    // モバイル判定（初回のみ、SSR対応）
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
    }
  }, [])

  const handlePush = () => {
    setIsFever(true)
    // Delay navigation to let the user bask in the rainbow glory
    setTimeout(() => {
      window.location.href = "/blog/2025-12-13-the-pachinko-middle-way"
    }, 2500)
  }



  return (
    <>
      {/* GARO JOKE OVERLAY */}
      {garoMode && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black animate-in zoom-in-95 duration-300 overflow-hidden">
          {/* Background Video Layer */}
          <div className="absolute inset-0 z-0">
            {/* @ts-ignore */}
            <BackgroundVideo variant="gold" />
          </div>

          {/* Pachinko Frame Decoration */}
          <div className={`absolute inset-0 pointer-events-none z-[201] transition-opacity duration-200 ${isFever ? 'opacity-0' : 'opacity-100'}`}>
            <div className="absolute top-0 left-0 w-full h-16 md:h-24 bg-gradient-to-b from-yellow-600 to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-gradient-to-t from-yellow-600 to-transparent opacity-50" />
            <div className="absolute top-0 left-0 w-4 md:w-8 h-full bg-gradient-to-r from-yellow-600 to-transparent opacity-50" />
            <div className="absolute top-0 right-0 w-4 md:w-8 h-full bg-gradient-to-l from-yellow-600 to-transparent opacity-50" />

            {/* Flashing Lights */}
            <div className="absolute top-4 left-4 md:top-10 md:left-10 w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500 animate-ping" />
            <div className="absolute top-4 right-4 md:top-10 md:right-10 w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500 animate-ping delay-75" />
            <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10 w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500 animate-ping delay-150" />
            <div className="absolute bottom-4 right-4 md:bottom-10 md:right-10 w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500 animate-ping delay-300" />
          </div>

          {/* RAINBOW FEVER OVERLAY */}
          {isFever && (
            <div className="absolute inset-0 z-[300] bg-[conic-gradient(at_center,_red,_orange,_yellow,_green,_blue,_purple,_pink,_red)] animate-spin-slow flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-white/30 animate-pulse" />
              <div className="relative z-[310] flex flex-col items-center">
                <h2 className="text-6xl md:text-9xl font-black text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] animate-bounce italic transform -skew-x-12">
                  WIN
                </h2>
                <p className="text-4xl md:text-6xl font-black text-yellow-300 animate-ping mt-8 drop-shadow-lg">
                  KYUIN!!!!!
                </p>
                <p className="text-2xl md:text-4xl text-white font-bold mt-12 animate-pulse">
                  脳汁分泌中...
                </p>
              </div>
            </div>
          )}

          {/* Main Content Container - Flex Col to fit height */}
          <div className={`relative z-[210] w-full h-[100dvh] max-w-5xl flex flex-col items-center justify-center gap-4 md:gap-8 py-4 px-4 transition-all duration-500 ${isFever ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}>

            {/* Header Section: Logo (Flex Shrink OK) */}
            <div className="flex-shrink-0 text-center">
              <div className="inline-block relative group">
                <div className="absolute -inset-8 bg-yellow-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
                <h2 className="relative text-5xl md:text-8xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-800 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] transform -skew-x-12 leading-tight">
                  CR IWASAKI
                </h2>
                <div className="absolute -right-2 -top-2 md:-right-4 md:-top-4 bg-red-600 text-white text-[10px] md:text-base font-bold px-2 py-1 transform rotate-12 border-2 border-white shadow-lg animate-bounce">
                  P.F.O.G.搭載
                </div>
              </div>
            </div>

            {/* Middle Section: Text (Flex 1, allows shrinking) */}
            <div className="flex-shrink-1 min-h-0 w-full max-w-2xl flex flex-col items-center justify-center">
              <div className="bg-black/60 backdrop-blur-md border border-yellow-500/30 p-4 md:p-8 rounded-xl relative overflow-hidden w-full">
                {/* Danger Tape */}
                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500/50" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-yellow-500/50" />

                <div className="text-base md:text-2xl text-white font-serif mb-2 space-y-1 drop-shadow-md text-center">
                  <p>「すべては神の遊び（リーラ）である」</p>
                  <p className="text-yellow-400 font-bold text-xs md:text-lg leading-relaxed">
                    パチンコも、仕事も、瞑想も。<br className="hidden md:block" />
                    善も悪もない。ただ「歓喜」のみ。
                  </p>
                </div>
                <div className="text-center mt-2">
                  <p className="text-yellow-500/50 text-[10px] md:text-sm font-mono border border-yellow-500/30 inline-block px-3 py-1 rounded">
                    Life is just a game. Play it seriously.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Section: Buttons (Flex Shrink 0 - Always Visible) */}
            <div className="flex-shrink-0 w-full flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-center">
              <button
                onClick={() => window.location.href = "/blog/2025-12-13-eckhart-tolle-and-pachinko"}
                className="text-gray-400 hover:text-white text-[10px] md:text-xs tracking-widest border-b border-transparent hover:border-gray-400 transition-all font-mono order-2 md:order-1"
              >
                ▷ 静寂（Omega）へ (TO ENLIGHTENMENT)
              </button>

              <div
                className="group relative inline-flex items-center justify-center scale-90 hover:scale-100 transition-transform duration-200 cursor-pointer order-1 md:order-2"
                onClick={handlePush}
              >
                {/* Button Aura */}
                <div className="absolute inset-0 bg-red-500 blur-[50px] opacity-0 group-hover:opacity-50 transition-opacity duration-100" />

                {/* The Button - LINKAGE LEVER STYLE */}
                <button className="relative w-36 h-36 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-transparent to-red-900 flex items-center justify-center p-2 shadow-[0_0_0_4px_rgba(255,215,0,0.5),0_0_50px_rgba(255,0,0,0.3)] group-active:scale-95 transition-transform group-hover:animate-pulse pointer-events-none">
                  <div className="w-full h-full rounded-full bg-gradient-to-tl from-red-600 to-red-400 border-4 border-yellow-300/50 shadow-inner flex items-col flex-col justify-center items-center group-hover:brightness-110 transition-all">
                    <span className="text-2xl md:text-4xl font-black text-yellow-100 drop-shadow-lg transform -rotate-12 italic">PUSH</span>
                    <span className="text-[10px] md:text-xs text-red-900 font-bold bg-yellow-400 px-2 py-0.5 rounded mt-2">LINKAGE</span>
                  </div>
                </button>

                {/* Floating Text Effect */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-yellow-500 font-bold tracking-widest text-nowrap opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 group-hover:-translate-y-4 duration-300">
                  ▼ 押せ！ ▼
                </div>
              </div>
            </div>

            <p className="absolute bottom-2 md:bottom-4 text-yellow-500/20 text-[10px] font-mono">
              ※ 確変突入率 81% (当社比)
            </p>
          </div>
        </div>
      )}

      {/* 🧠 HUBERMAN BRAIN JUICE PORTAL */}
      {hubermanPortal && (
        <div className="fixed inset-0 z-[250] flex flex-col items-center justify-center bg-black animate-in zoom-in-95 duration-300 overflow-hidden">
          {/* Brain background with pulsing effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-black to-blue-900 animate-pulse" />

          {/* Neural network lines animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-[2px] animate-pulse"
                style={{
                  width: `${Math.random() * 200 + 100}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0.6
                }}
              />
            ))}
          </div>

          {/* Dopamine molecules floating */}
          <div className="absolute inset-0 pointer-events-none">
            {['🧠', '⚡', '💡', '🔬', '☀️', '❄️', '💪'].map((emoji, i) => (
              <div
                key={i}
                className="absolute text-4xl md:text-6xl animate-bounce opacity-70"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              >
                {emoji}
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center px-4">
            {/* Secret Code Revealed */}
            <div className="text-cyan-400 text-sm font-mono mb-4 animate-pulse">
              🔓 SECRET CODE ACTIVATED
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-4 animate-pulse">
              BRAIN JUICE
            </h2>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-8">
              ドーパミン<span className="text-cyan-400">250%</span>上昇中
            </h3>

            {/* Huberman Quote */}
            <div className="bg-white/10 backdrop-blur-md border border-cyan-500/50 rounded-xl p-6 md:p-8 max-w-2xl mx-auto mb-8">
              <p className="text-lg md:text-xl text-white font-serif italic mb-4">
                &quot;Get sunlight in your eyes within 30-60 minutes of waking.&quot;
              </p>
              <p className="text-cyan-400 text-sm">
                — Andrew Huberman, PhD
              </p>
            </div>

            {/* Portal destination */}
            <div className="space-y-2">
              <p className="text-white text-lg font-bold">
                Listening Room へ転送中...
              </p>
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom protocol tip */}
          <div className="absolute bottom-8 text-center">
            <p className="text-cyan-400/50 text-xs font-mono">
              PROTOCOL: COLD_EXPOSURE + SUNLIGHT + 1000_HOURS
            </p>
          </div>
        </div>
      )}

      {/* MATRIX OVERLAY (Existing) */}
      {glitchMode && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-1000">
          <MatrixOverlay />
          <div className="relative z-[70] text-center p-8 bg-black/80 border border-[#0F0] rounded-xl shadow-[0_0_50px_rgba(0,255,0,0.5)]">
            <h2 className="text-4xl font-black text-[#0F0] mb-4 font-mono tracking-widest glitch-text">SYSTEM HACKED</h2>
            <p className="text-[#0F0] font-mono mb-8 text-sm">※これはジョーク演出です。ご安心ください。</p>
            <button
              onClick={() => setGlitchMode(false)}
              className="px-8 py-4 bg-[#0F0] text-black font-bold font-mono rounded hover:bg-white hover:text-black transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(0,255,0,0.8)]"
            >
              RESTORE SYSTEM (戻る)
            </button>
          </div>
        </div>
      )}


      <div className={`min-h-screen flex flex-col bg-white overflow-x-hidden relative ${glitchMode ? 'grayscale invert transition-all duration-200' : ''} ${horrorMode ? 'invert hue-rotate-180 brightness-90 transition-all duration-1000' : 'transition-all duration-1000'}`}>

        {/* Intro Overlay System */}
        {!introHidden && (
          <div
            className={`fixed inset-0 z-[100] transition-opacity duration-[3000ms] ease-in-out ${introFading ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
          >
            <SpotlightTypography
              text="IWASAKI"
              subText="DIGITAL CRAFTSMANSHIP"
              cloudflareId="7f6b4d1e053d41d0dcd56aa789261692"
              initialRadius={250}
              className="h-[100dvh]"
              onEnded={() => setIntroFading(true)}
            />
          </div>
        )}

        {/* New Hero: Spotlight Typography with AI Video - USED AS HERO PLACEHOLDER UNDERNEATH IF NEEDED OR JUST GONE */}
        {/* We removed the static block here because we just want the Wim Hof section to appear after fade out */}


        {/* Hide Header only when Garo Mode is Active */}
        <div className={`transition-opacity duration-500 absolute top-0 w-full z-50 ${garoMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <Header />
        </div>

        {/* Mindful Intro (Wim Hof Section) - Following Hero immediately */}
        <MindfulIntro startAnimation={introFading} />

        {/* Featured Video Section - Independent section below MindfulIntro */}
        <FeaturedVideoSection />

        {/* Default Background for the rest of the page */}
        {/* @ts-ignore */}
        <BackgroundVideo variant="default" className="fixed inset-0 z-0 opacity-50 pointer-events-none" />

        {!isMobile && <ThreeBackground />}
        <FloatingElements glowTrigger={false} />

        {/* Hero Section with Chaos Mode Buttons */}
        <HeroSection
          onGlitchToggle={() => setGlitchMode(true)}
          onHorrorToggle={() => setHorrorMode(!horrorMode)}
        />

        {/* Daily Wisdom Section - with AI Generated Zen Art */}
        <section className="py-12 bg-gradient-to-b from-stone-50 to-stone-100 border-b border-[#DAE2E8]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] mb-6 font-bold animate-fade-in">
                TODAY'S WISDOM | {dateString}
              </span>

              {/* Zen Art + Wisdom Layout */}
              <div className="relative w-full max-w-lg group animate-fade-in-up">
                {/* Background glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-100 via-stone-100 to-amber-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />

                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-stone-200/50">
                  {/* Zen Art Image */}
                  {quote.image_url && (
                    <div className="mb-6 flex justify-center">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-amber-200/30 to-stone-200/30 rounded-xl blur-md" />
                        <img
                          src={quote.image_url}
                          alt="AI Generated Zen Art"
                          className="relative w-48 h-48 md:w-56 md:h-56 object-cover rounded-xl shadow-md border border-stone-200 cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => window.open(quote.image_url, '_blank')}
                          title="Click to view full size"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-[#D4AF37] text-white text-[8px] px-2 py-0.5 rounded-full font-bold tracking-wider shadow">
                          AI GENERATED
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Wisdom Quote */}
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-serif text-[#252423] tracking-widest leading-relaxed mb-2">
                      " {quote.content} "
                    </p>
                    {quote.content_en && (
                      <p className="text-sm text-stone-500 italic mb-3 font-light">
                        {quote.content_en}
                      </p>
                    )}
                    <p className="text-xs text-[#252423]/50 font-serif tracking-wide">
                      ── {quote.source}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {quote.image_url && (
                    <div className="flex justify-center gap-3 mt-5 pt-4 border-t border-stone-200/50">
                      {/* Share to X/Twitter */}
                      <button
                        onClick={() => {
                          const text = `${quote.content}${quote.content_en ? `\n\n${quote.content_en}` : ''}\n\n── ${quote.source}`;
                          const url = 'https://iwasaki-naisou.com';
                          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 rounded-full transition-all duration-200 border border-stone-200 hover:border-[#1DA1F2]/30"
                        title="Share on X"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        Share
                      </button>

                      {/* Download */}
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = quote.image_url!;
                          link.download = `wisdom-${dateString.replace(/\./g, '-')}.png`;
                          link.target = '_blank';
                          link.click();
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all duration-200 border border-stone-200 hover:border-emerald-200"
                        title="Download wallpaper"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </button>

                      {/* View Archive */}
                      <a
                        href="/wisdom-archive"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-[#D4AF37] hover:bg-amber-50 rounded-full transition-all duration-200 border border-stone-200 hover:border-amber-200"
                        title="View past wisdoms"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Archive
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Attribution */}
              {quote.image_url && (
                <p className="mt-4 text-[10px] text-stone-400 text-center animate-fade-in">
                  Every morning at 5:00 AM JST, AI generates a unique wisdom and zen art.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Featured Article Banner */}
        <section className="py-6 bg-gradient-to-r from-amber-900/10 via-amber-800/5 to-amber-900/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a
              href="/blog/2025-12-21-breathing-room-design"
              className="group flex flex-col md:flex-row items-center gap-6 md:gap-8 p-4 md:p-6 rounded-xl bg-white/80 backdrop-blur-sm border border-amber-200/50 shadow-sm hover:shadow-lg hover:border-amber-300/80 transition-all duration-500"
            >
              {/* Image */}
              <div className="w-full md:w-48 h-32 md:h-28 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src="https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/ee726d48-f5b4-4ab3-6abb-f7c2fa351f00/public"
                  alt="呼吸専用の寝室設計"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-amber-600 font-bold mb-2 px-2 py-1 bg-amber-100 rounded">
                  NEW INSIGHT
                </span>
                <h3 className="text-lg md:text-xl font-bold text-[#252423] mb-2 group-hover:text-amber-800 transition-colors">
                  【内装職人の実験】呼吸専用の寝室設計
                </h3>
                <p className="text-sm text-[#252423]/60 line-clamp-2">
                  コルク、最強説。幼稚園も採用する床材の秘密と、職人の自宅告白。
                </p>
              </div>

              {/* Cork Grandpa Avatar */}
              <div
                className="hidden md:block relative flex-shrink-0 group/jijii"
                onMouseEnter={() => setCorkQuote(Math.floor(Math.random() * corkQuotes.length))}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-300 shadow-lg group-hover/jijii:scale-110 transition-transform duration-300">
                  <img
                    src="https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/32c616ad-8c26-4945-1e8e-35040d65a100/public"
                    alt="コルクじじい"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full shadow whitespace-nowrap">
                  コルクじじい
                </span>
                {/* Speech Bubble */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 opacity-0 group-hover/jijii:opacity-100 transition-all duration-300 pointer-events-none scale-90 group-hover/jijii:scale-100">
                  <div className="bg-amber-800 text-white text-[10px] p-2 rounded-lg shadow-lg text-center leading-relaxed">
                    {corkQuotes[corkQuote]}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-amber-800" />
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 group-hover:bg-amber-200 transition-colors flex-shrink-0">
                <span className="text-amber-700 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          </div>
        </section>

        {/* Cork Grandpa Origin Story Banner */}
        <section className="py-4 bg-gradient-to-r from-stone-800 via-stone-900 to-stone-800 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a
              href="/blog/2025-12-21-cork-grandpa-origin"
              className="group flex items-center justify-between gap-4 p-3 rounded-lg border border-amber-500/30 hover:border-amber-400/60 transition-all duration-300 relative"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 flex-shrink-0 group-hover:animate-bounce">
                  <img
                    src="https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/32c616ad-8c26-4945-1e8e-35040d65a100/public"
                    alt="コルクじじい"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-amber-400/80 font-bold">LEGEND</span>
                  <h4 className="text-white font-bold group-hover:text-amber-300 transition-colors text-sm md:text-base">
                    【伝説】コルクじじいの起源物語
                  </h4>
                </div>
              </div>

              {/* Catchphrase - Desktop */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="relative">
                  <span className="text-amber-300 font-bold text-sm italic group-hover:scale-110 transition-transform inline-block">
                    「だって俺の床、コルクなんだもん！」
                  </span>
                  <div className="absolute -inset-1 bg-amber-400/20 blur-md rounded opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                </div>
              </div>

              <span className="text-amber-400 text-xl group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300">→</span>
            </a>

            {/* Mobile Catchphrase */}
            <div className="lg:hidden mt-2 text-center">
              <span className="text-amber-300/80 text-xs italic">「だって俺の床、コルクなんだもん！」</span>
            </div>
          </div>
        </section>

        {/* 🧠 Huberman Portal Banner */}
        <section className="py-6 bg-gradient-to-r from-purple-900/20 via-cyan-900/10 to-purple-900/20 border-y border-cyan-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 md:p-6 rounded-xl bg-gradient-to-r from-stone-900 to-stone-800 border border-cyan-500/30 shadow-lg relative overflow-hidden group">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-10 flex-1 text-center md:text-left">
                <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-cyan-400 font-bold mb-2 px-2 py-1 bg-cyan-500/10 rounded border border-cyan-500/30">
                  🔬 EXPERIMENTAL
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                  英語を<span className="text-cyan-400">1000時間</span>聴いた内装屋の記録
                </h3>
                <p className="text-sm text-stone-400 mb-4">
                  Andrew Huberman のポッドキャストを1000時間聞いた男の記録。英語を「学ぶ」んじゃない、「住む」んだ。
                </p>

                {/* Keyboard instruction */}
                <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
                  <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg border border-cyan-500/50">
                    <span className="text-cyan-300 text-sm">⌨️ キーボードで</span>
                    <code className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded font-mono text-sm font-bold">
                      huberman
                    </code>
                    <span className="text-cyan-300 text-sm">と打て</span>
                  </div>
                  <span className="text-stone-500 text-xs hidden sm:inline">or</span>
                  <a
                    href="/listening-room"
                    className="text-cyan-400 hover:text-cyan-300 text-sm underline underline-offset-2 transition-colors"
                  >
                    普通にクリック →
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="relative z-10 flex items-center gap-6 text-center">
                <div className="hidden md:block">
                  <div className="text-3xl font-black text-cyan-400">1000h</div>
                  <div className="text-[10px] text-stone-500 uppercase tracking-widest">TARGET</div>
                </div>
                <div className="hidden md:block">
                  <div className="text-3xl font-black text-purple-400">250%</div>
                  <div className="text-[10px] text-stone-500 uppercase tracking-widest">DOPAMINE</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IWASAKI CREW Section */}
        <section className="py-8 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <a href="/crew" className="group block">
              <div className="text-center mb-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400/80">MEET THE TEAM</span>
                <h3 className="text-xl md:text-2xl font-bold text-white mt-1">IWASAKI <span className="text-amber-400">CREW</span></h3>
              </div>

              {/* Character Avatars */}
              <div className="flex justify-center items-center gap-4 md:gap-8">
                {/* Takumi */}
                <div className="text-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-amber-400 mx-auto shadow-lg shadow-amber-500/20">
                    <img
                      src="https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/c3e01106-43b4-4d9c-b3af-f799f32e3300/public"
                      alt="AIタクミ"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-white text-xs mt-2 font-bold">AIタクミ</p>
                </div>

                {/* Anya */}
                <div className="text-center group-hover:scale-110 transition-transform duration-300 delay-75">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-amber-400 mx-auto shadow-lg shadow-amber-500/20">
                    <img
                      src="/images/anya-avatar.png"
                      alt="アーニャ"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-white text-xs mt-2 font-bold">アーニャ</p>
                </div>

                {/* Cork Jijii */}
                <div className="text-center group-hover:scale-110 transition-transform duration-300 delay-150">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-amber-400 mx-auto shadow-lg shadow-amber-500/20">
                    <img
                      src="https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/32c616ad-8c26-4945-1e8e-35040d65a100/public"
                      alt="コルクじじい"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-white text-xs mt-2 font-bold">コルクじじい</p>
                </div>
              </div>

              <p className="text-center text-stone-400 text-sm mt-6 group-hover:text-amber-300 transition-colors">
                クリックしてチームを見る →
              </p>
            </a>
          </div>
        </section>

        {/* Site Showcase - Multi-page Preview */}
        <SiteShowcase />

        {/* 企業理念カルーセル */}
        <PhilosophyCarousel />

        {/* Insights (Core of the Site) - Using Original Design as Requested */}
        <InsightsPreviewSection />

        {/* Services */}
        <ServicesSection />

        {/* 施工実績ギャラリー - DEMOTED */}
        <PortfolioSection />

        {/* 沿革 */}
        <HistorySection />

        {/* 実績・強み */}
        <StrengthsSection />

        {/* Topics */}
        <TopicsSection />

        {/* AI × DX × グローバル */}
        <AiDxSection />

        {/* CTA */}
        <CtaSection />

        <Footer />
      </div>
    </>
  )
}
